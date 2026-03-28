import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { adminProcedure, router } from "../_core/trpc";
import {
  getAllOrders,
  getOrdersWithAnalytics,
  getProductInventory,
  updateProductInventory,
  createProductInventory,
  getAllBookingInquiries,
  getAllUsers,
  setUserRole,
  deleteUserById,
  inviteAdminByEmail,
} from "../db";

export const adminRouter = router({
  /**
   * Get order analytics overview
   */
  getOrdersAnalytics: adminProcedure.query(async () => {
    try {
      return await getOrdersWithAnalytics();
    } catch (error) {
      console.error("[Admin] Failed to get analytics:", error);
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to fetch analytics" });
    }
  }),

  /**
   * Get all orders with pagination and filtering
   */
  getAllOrders: adminProcedure
    .input(
      z.object({
        page: z.number().int().positive().default(1),
        limit: z.number().int().positive().max(100).default(20),
        status: z.enum(["all", "pending", "completed", "failed", "cancelled"]).default("all"),
      })
    )
    .query(async ({ input }) => {
      try {
        const allOrders = await getAllOrders();
        const filtered =
          input.status === "all" ? allOrders : allOrders.filter((o) => o.status === input.status);
        const start = (input.page - 1) * input.limit;
        const paginatedOrders = filtered.slice(start, start + input.limit);
        return {
          orders: paginatedOrders,
          total: filtered.length,
          page: input.page,
          limit: input.limit,
          pages: Math.ceil(filtered.length / input.limit),
        };
      } catch (error) {
        console.error("[Admin] Failed to get all orders:", error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to fetch orders" });
      }
    }),

  /**
   * Get product inventory
   */
  getProductInventory: adminProcedure.query(async () => {
    try {
      return await getProductInventory();
    } catch (error) {
      console.error("[Admin] Failed to get product inventory:", error);
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to fetch product inventory" });
    }
  }),

  /**
   * Update a product
   */
  updateProduct: adminProcedure
    .input(
      z.object({
        productId: z.string(),
        name: z.string().optional(),
        price: z.number().optional(),
        isActive: z.number().optional(),
        maxQuantityPerOrder: z.number().optional(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { productId, ...updates } = input;
        const cleanUpdates = Object.fromEntries(
          Object.entries(updates).filter(([_, v]) => v !== undefined)
        );
        if (Object.keys(cleanUpdates).length === 0) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "No updates provided" });
        }
        await updateProductInventory(productId, cleanUpdates);
        return { success: true, message: "Product updated successfully" };
      } catch (error) {
        console.error("[Admin] Failed to update product:", error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to update product" });
      }
    }),

  /**
   * Create a new product
   */
  createProduct: adminProcedure
    .input(
      z.object({
        productId: z.string(),
        name: z.string(),
        category: z.enum(["services", "welcome", "activities"]),
        price: z.number().positive(),
        isActive: z.number().default(1),
        maxQuantityPerOrder: z.number().default(10),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const product = await createProductInventory(input);
        return { success: true, product, message: "Product created successfully" };
      } catch (error) {
        console.error("[Admin] Failed to create product:", error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create product" });
      }
    }),

  /**
   * Get revenue summary
   */
  getRevenueSummary: adminProcedure
    .input(
      z.object({
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      })
    )
    .query(async ({ input }) => {
      try {
        const allOrders = await getAllOrders();
        let filtered = allOrders.filter((o) => o.status === "completed");
        if (input.startDate) filtered = filtered.filter((o) => new Date(o.createdAt) >= input.startDate!);
        if (input.endDate) filtered = filtered.filter((o) => new Date(o.createdAt) <= input.endDate!);

        const totalRevenue = filtered.reduce((sum, o) => sum + parseFloat(o.amount as string), 0);
        const avgOrderValue = filtered.length > 0 ? totalRevenue / filtered.length : 0;

        const productRevenue: Record<string, { count: number; revenue: number }> = {};
        filtered.forEach((order) => {
          (order.items as any[]).forEach((item) => {
            if (!productRevenue[item.productId]) productRevenue[item.productId] = { count: 0, revenue: 0 };
            productRevenue[item.productId].count += item.quantity;
            productRevenue[item.productId].revenue += item.price * item.quantity;
          });
        });

        return {
          totalRevenue: totalRevenue.toFixed(2),
          avgOrderValue: avgOrderValue.toFixed(2),
          orderCount: filtered.length,
          productRevenue,
        };
      } catch (error) {
        console.error("[Admin] Failed to get revenue summary:", error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to fetch revenue summary" });
      }
    }),

  /**
   * Get all booking inquiries
   */
  getBookingInquiries: adminProcedure.query(async () => {
    try {
      return await getAllBookingInquiries();
    } catch (error) {
      console.error("[Admin] Failed to get booking inquiries:", error);
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to fetch booking inquiries" });
    }
  }),

  // ─── User Management ────────────────────────────────────────────────────────

  /**
   * List all users
   */
  getAllUsers: adminProcedure.query(async () => {
    try {
      return await getAllUsers();
    } catch (error) {
      console.error("[Admin] Failed to get users:", error);
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to fetch users" });
    }
  }),

  /**
   * Promote or demote a user's role
   */
  setUserRole: adminProcedure
    .input(z.object({ userId: z.number().int().positive(), role: z.enum(["admin", "user"]) }))
    .mutation(async ({ input, ctx }) => {
      try {
        // Prevent the owner from being demoted
        const targetUser = (await getAllUsers()).find(u => u.id === input.userId);
        if (!targetUser) throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
        await setUserRole(input.userId, input.role);
        return { success: true };
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        console.error("[Admin] Failed to set user role:", error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to update role" });
      }
    }),

  /**
   * Remove a user record entirely
   */
  deleteUser: adminProcedure
    .input(z.object({ userId: z.number().int().positive() }))
    .mutation(async ({ input }) => {
      try {
        await deleteUserById(input.userId);
        return { success: true };
      } catch (error) {
        console.error("[Admin] Failed to delete user:", error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to delete user" });
      }
    }),

  /**
   * Pre-authorize an email address as admin
   */
  inviteAdmin: adminProcedure
    .input(z.object({ email: z.string().email(), name: z.string().optional().default("") }))
    .mutation(async ({ input }) => {
      try {
        await inviteAdminByEmail(input.email, input.name);
        return { success: true };
      } catch (error) {
        console.error("[Admin] Failed to invite admin:", error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to invite admin" });
      }
    }),
});
