import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the db module
vi.mock("./db", () => ({
  getUserOrders: vi.fn(async () => [
    {
      id: 1,
      orderId: "test-order-1",
      userId: 1,
      guestEmail: "test@example.com",
      guestName: "Test User",
      stripeSessionId: "cs_test123",
      stripePaymentIntentId: "pi_test123",
      amount: "125.00",
      currency: "USD",
      status: "completed",
      items: [
        { productId: "early-checkin", name: "Early Check-In", price: 49, quantity: 1 },
        { productId: "flowers", name: "Fresh Flowers", price: 35, quantity: 1 },
      ],
      createdAt: new Date("2025-01-01"),
      updatedAt: new Date("2025-01-01"),
    },
  ]),
  updateUserStripeCustomerId: vi.fn(async () => {}),
  createOrder: vi.fn(async (order: any) => ({ ...order, id: 1 })),
  getOrderByStripeSession: vi.fn(async () => undefined),
  upsertUser: vi.fn(async () => {}),
  getUserByOpenId: vi.fn(async () => undefined),
  getAllOrders: vi.fn(async () => []),
  getOrdersWithAnalytics: vi.fn(async () => ({
    totalOrders: 0,
    totalRevenue: "0.00",
    completedOrders: 0,
    failedOrders: 0,
    orders: [],
  })),
  getProductInventory: vi.fn(async () => []),
  updateProductInventory: vi.fn(async () => {}),
  createProductInventory: vi.fn(async (p: any) => p),
  getAllBookingInquiries: vi.fn(async () => []),
  createBookingInquiry: vi.fn(async (i: any) => ({ ...i, id: 1 })),
  updateOrderStatus: vi.fn(async () => {}),
  getOrderByPaymentIntentId: vi.fn(async () => undefined),
}));

function createAuthContext(role: "user" | "admin" = "user"): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "test-user",
      email: "test@example.com",
      name: "Test User",
      loginMethod: "manus",
      role,
      stripeCustomerId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("shop.getProducts", () => {
  it("returns all products", async () => {
    const ctx = { user: null, req: { protocol: "https", headers: {} } as any, res: {} as any };
    const caller = appRouter.createCaller(ctx);
    const products = await caller.shop.getProducts();
    expect(products).toBeInstanceOf(Array);
    expect(products.length).toBeGreaterThan(0);
    expect(products[0]).toHaveProperty("id");
    expect(products[0]).toHaveProperty("name");
    expect(products[0]).toHaveProperty("price");
  });
});

describe("shop.getMyOrders", () => {
  it("returns orders for authenticated user", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    const orders = await caller.shop.getMyOrders();
    expect(orders).toBeInstanceOf(Array);
    expect(orders.length).toBe(1);
    expect(orders[0].status).toBe("completed");
  });
});

describe("admin.getOrdersAnalytics", () => {
  it("returns analytics for admin user", async () => {
    const ctx = createAuthContext("admin");
    const caller = appRouter.createCaller(ctx);
    const analytics = await caller.admin.getOrdersAnalytics();
    expect(analytics).toHaveProperty("totalOrders");
    expect(analytics).toHaveProperty("totalRevenue");
    expect(analytics).toHaveProperty("completedOrders");
  });

  it("throws FORBIDDEN for non-admin user", async () => {
    const ctx = createAuthContext("user");
    const caller = appRouter.createCaller(ctx);
    await expect(caller.admin.getOrdersAnalytics()).rejects.toThrow();
  });
});

describe("booking.submitInquiry", () => {
  it("creates a booking inquiry", async () => {
    const ctx = { user: null, req: { protocol: "https", headers: {} } as any, res: {} as any };
    const caller = appRouter.createCaller(ctx);
    const result = await caller.booking.submitInquiry({
      guestName: "John Doe",
      guestEmail: "john@example.com",
      propertyName: "The Power-Up Pad",
      checkIn: "2025-06-01",
      checkOut: "2025-06-07",
      guests: 4,
    });
    expect(result.success).toBe(true);
    expect(result.inquiryId).toBeDefined();
  });
});
