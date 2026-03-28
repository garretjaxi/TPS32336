import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { SHOP_PRODUCTS } from "../../shared/products";
import { createOrder, getOrderByStripeSession, getProductInventory, getUserOrders, updateUserStripeCustomerId } from "../db";
import { nanoid } from "nanoid";

// Lazy-load Stripe to avoid errors when key is not set
function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Stripe not configured" });
  const Stripe = require("stripe");
  return new Stripe(key, { apiVersion: "2024-06-20" });
}

export const shopRouter = router({
  /**
   * Get all active products
   */
  getProducts: publicProcedure.query(async () => {
    const dbProducts = await getProductInventory();
    
    // Fallback to SHOP_PRODUCTS if DB is empty or fails
    if (!dbProducts || dbProducts.length === 0) {
      return SHOP_PRODUCTS;
    }

    // Map DB schema to ShopProduct interface expected by frontend
    return dbProducts.map(p => ({
      id: p.productId,
      name: p.name,
      category: p.category,
      description: p.description,
      price: p.price, // Database stores cents
      icon: p.icon || "📦",
      image: p.image || "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80",
      active: p.isActive === 1
    }));
  }),

  /**
   * Create a Stripe Checkout session for the cart
   */
  createCheckoutSession: protectedProcedure
    .input(
      z.object({
        items: z.array(
          z.object({
            productId: z.string(),
            quantity: z.number().int().positive(),
          })
        ),
        successUrl: z.string().url(),
        cancelUrl: z.string().url(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const stripe = getStripe();
      const dbProducts = await getProductInventory();

      // Validate and build line items
      const lineItems = input.items.map((item) => {
        // Search in DB products first, then fallback to SHOP_PRODUCTS
        const product = dbProducts.find(p => p.productId === item.productId) || 
                        SHOP_PRODUCTS.find((p) => p.id === item.productId);
        if (!product) {
          throw new TRPCError({ code: "BAD_REQUEST", message: `Product not found: ${item.productId}` });
        }
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              description: product.description,
              images: [product.image],
            },
            unit_amount: product.price, // already in cents
          },
          quantity: item.quantity,
        };
      });

      // Get or create Stripe customer
      let customerId = ctx.user.stripeCustomerId;
      if (!customerId && ctx.user.email) {
        const customer = await stripe.customers.create({
          email: ctx.user.email,
          name: ctx.user.name || undefined,
          metadata: { userId: String(ctx.user.id) },
        });
        customerId = customer.id;
        await updateUserStripeCustomerId(ctx.user.id, customerId!);
      }

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer: customerId || undefined,
        customer_email: !customerId ? (ctx.user.email || undefined) : undefined,
        line_items: lineItems,
        success_url: `${input.successUrl}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: input.cancelUrl,
        metadata: {
          userId: String(ctx.user.id),
          userEmail: ctx.user.email || "",
        },
      });

      return { sessionId: session.id, url: session.url };
    }),

  /**
   * Get the current user's orders
   */
  getMyOrders: protectedProcedure.query(async ({ ctx }) => {
    return await getUserOrders(ctx.user.id);
  }),

  /**
   * Verify a completed checkout session and return order details
   */
  verifySession: protectedProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input, ctx }) => {
      const stripe = getStripe();

      // Check if order already exists
      const existingOrder = await getOrderByStripeSession(input.sessionId);
      if (existingOrder) return existingOrder;

      // Retrieve session from Stripe
      const session = await stripe.checkout.sessions.retrieve(input.sessionId, {
        expand: ["line_items", "payment_intent"],
      });

      if (session.payment_status !== "paid") {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Payment not completed" });
      }

      // Build order items from line items
      const items = (session.line_items?.data || []).map((item: any) => {
        const product = SHOP_PRODUCTS.find((p) => p.name === item.description);
        return {
          productId: product?.id || item.id,
          name: item.description || "Unknown",
          price: (item.amount_total || 0) / 100,
          quantity: item.quantity || 1,
        };
      });

      const paymentIntentId =
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : session.payment_intent?.id || "";

      const order = await createOrder({
        orderId: nanoid(),
        userId: ctx.user.id,
        guestEmail: ctx.user.email || session.customer_email || "",
        guestName: ctx.user.name || "",
        stripeSessionId: input.sessionId,
        stripePaymentIntentId: paymentIntentId,
        amount: ((session.amount_total || 0) / 100).toFixed(2),
        currency: (session.currency || "usd").toUpperCase(),
        status: "completed",
        items,
      });

      return order;
    }),
});
