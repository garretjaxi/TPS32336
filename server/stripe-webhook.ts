import { Request, Response } from "express";
import { SHOP_PRODUCTS } from "../shared/products";
import { createOrder, getOrderByStripeSession, updateOrderStatus } from "./db";
import { nanoid } from "nanoid";

export async function handleStripeWebhook(req: Request, res: Response) {
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeKey || !webhookSecret || !sig) {
    console.error("[Webhook] Missing Stripe configuration");
    return res.status(400).json({ error: "Stripe not configured" });
  }

  const Stripe = require("stripe");
  const stripe = new Stripe(stripeKey, { apiVersion: "2024-06-20" });

  let event: any;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error("[Webhook] Signature verification failed:", err);
    return res.status(400).send(`Webhook Error: ${err}`);
  }

  // Handle test events
  if (event.id.startsWith("evt_test_")) {
    console.log("[Webhook] Test event detected, returning verification response");
    return res.json({ verified: true });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        console.log("[Webhook] Checkout session completed:", session.id);

        // Check if order already exists
        const existingOrder = await getOrderByStripeSession(session.id);
        if (existingOrder) {
          console.log("[Webhook] Order already exists:", existingOrder.id);
          break;
        }

        const paymentIntentId =
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id || "";

        const userId = parseInt(session.metadata?.userId || session.metadata?.user_id || "0");
        const guestEmail = session.metadata?.customer_email || session.customer_email || "";
        const guestName = session.metadata?.customer_name || "";

        // Get line items
        const lineItemsResponse = await stripe.checkout.sessions.listLineItems(session.id);
        const items = lineItemsResponse.data.map((item: any) => {
          const product = SHOP_PRODUCTS.find((p) => p.name === item.description);
          return {
            productId: product?.id || item.id,
            name: item.description || "Unknown",
            price: (item.amount_total || 0) / 100,
            quantity: item.quantity || 1,
          };
        });

        await createOrder({
          orderId: nanoid(),
          userId: userId || undefined,
          guestEmail,
          guestName,
          stripeSessionId: session.id,
          stripePaymentIntentId: paymentIntentId,
          amount: ((session.amount_total || 0) / 100).toFixed(2),
          currency: (session.currency || "usd").toUpperCase(),
          status: "completed",
          items,
        });

        console.log("[Webhook] Order created for session:", session.id);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;
        console.log("[Webhook] Payment failed:", paymentIntent.id);
        const order = await getOrderByStripeSession(paymentIntent.id);
        if (order) {
          await updateOrderStatus(order.id, "failed");
        }
        break;
      }

      default:
        console.log("[Webhook] Unhandled event type:", event.type);
    }

    res.json({ received: true });
  } catch (error) {
    console.error("[Webhook] Error processing event:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
}
