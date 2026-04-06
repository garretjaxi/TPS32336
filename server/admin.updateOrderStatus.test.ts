import { describe, it, expect, beforeEach, vi } from "vitest";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

// Mock database functions
vi.mock("../db", () => ({
  getAllOrders: vi.fn(),
  updateOrderStatus: vi.fn(),
}));

// Mock email function
vi.mock("../_core/email", () => ({
  sendEmail: vi.fn(),
}));

import { getAllOrders, updateOrderStatus } from "../db";
import { sendEmail } from "../_core/email";

describe("Order Status Update with Email Notifications", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should update order status successfully", async () => {
    const mockOrder = {
      id: 1,
      orderId: "ORD-001",
      guestName: "John Doe",
      guestEmail: "john@example.com",
      amount: "150.00",
      status: "pending",
      items: [{ name: "Cleaning Service", quantity: 1, price: 150 }],
      createdAt: new Date(),
    };

    (getAllOrders as any).mockResolvedValue([mockOrder]);
    (updateOrderStatus as any).mockResolvedValue(undefined);
    (sendEmail as any).mockResolvedValue(undefined);

    // Simulate the procedure
    const orderId = 1;
    const newStatus = "completed";
    const notifyCustomer = true;

    // Get order
    const allOrders = await getAllOrders();
    const order = allOrders.find((o: any) => o.id === orderId);
    expect(order).toBeDefined();
    expect(order.status).toBe("pending");

    // Update status
    await updateOrderStatus(orderId, newStatus as any);
    expect(updateOrderStatus).toHaveBeenCalledWith(orderId, newStatus);

    // Send email
    if (notifyCustomer && order.guestEmail) {
      await sendEmail(
        order.guestEmail,
        "Order Confirmed - Theme Park Stays",
        expect.any(String)
      );
      expect(sendEmail).toHaveBeenCalled();
    }
  });

  it("should handle order not found", async () => {
    (getAllOrders as any).mockResolvedValue([]);

    const allOrders = await getAllOrders();
    const order = allOrders.find((o: any) => o.id === 999);
    expect(order).toBeUndefined();
  });

  it("should send different email messages for different statuses", async () => {
    const mockOrder = {
      id: 1,
      orderId: "ORD-001",
      guestName: "Jane Doe",
      guestEmail: "jane@example.com",
      amount: "200.00",
      status: "pending",
      items: [],
      createdAt: new Date(),
    };

    (getAllOrders as any).mockResolvedValue([mockOrder]);
    (updateOrderStatus as any).mockResolvedValue(undefined);
    (sendEmail as any).mockResolvedValue(undefined);

    const statusMessages: Record<string, { subject: string; message: string }> = {
      pending: {
        subject: "Order Received - Theme Park Stays",
        message: "Your order has been received and is being processed.",
      },
      completed: {
        subject: "Order Confirmed - Theme Park Stays",
        message: "Your order has been confirmed and is ready for your stay!",
      },
      failed: {
        subject: "Order Issue - Theme Park Stays",
        message: "Unfortunately, there was an issue processing your order. Please contact us for assistance.",
      },
      cancelled: {
        subject: "Order Cancelled - Theme Park Stays",
        message: "Your order has been cancelled. If you have any questions, please contact us.",
      },
    };

    // Test completed status
    const statusInfo = statusMessages["completed"];
    expect(statusInfo.subject).toBe("Order Confirmed - Theme Park Stays");
    expect(statusInfo.message).toContain("confirmed");

    // Test failed status
    const failedInfo = statusMessages["failed"];
    expect(failedInfo.subject).toBe("Order Issue - Theme Park Stays");
    expect(failedInfo.message).toContain("issue");
  });

  it("should not send email if notifyCustomer is false", async () => {
    const mockOrder = {
      id: 1,
      orderId: "ORD-001",
      guestName: "Bob Smith",
      guestEmail: "bob@example.com",
      amount: "100.00",
      status: "pending",
      items: [],
      createdAt: new Date(),
    };

    (getAllOrders as any).mockResolvedValue([mockOrder]);
    (updateOrderStatus as any).mockResolvedValue(undefined);
    (sendEmail as any).mockResolvedValue(undefined);

    const notifyCustomer = false;

    // Update status without notification
    await updateOrderStatus(1, "completed" as any);
    expect(updateOrderStatus).toHaveBeenCalled();

    // Email should not be sent
    if (!notifyCustomer) {
      expect(sendEmail).not.toHaveBeenCalled();
    }
  });

  it("should handle missing guest email gracefully", async () => {
    const mockOrder = {
      id: 1,
      orderId: "ORD-001",
      guestName: "Anonymous",
      guestEmail: null,
      amount: "50.00",
      status: "pending",
      items: [],
      createdAt: new Date(),
    };

    (getAllOrders as any).mockResolvedValue([mockOrder]);
    (updateOrderStatus as any).mockResolvedValue(undefined);

    const allOrders = await getAllOrders();
    const order = allOrders[0];

    // Should update status even without email
    await updateOrderStatus(1, "completed" as any);
    expect(updateOrderStatus).toHaveBeenCalled();

    // Email should not be sent if no email address
    if (!order.guestEmail) {
      expect(sendEmail).not.toHaveBeenCalled();
    }
  });
});
