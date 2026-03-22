/* =============================================================
   Order Confirmation Page — Theme Park Stays
   Golden Hour Luxury Design
   Displays order details after successful purchase
   ============================================================= */
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { CheckCircle, Package, Calendar, DollarSign, ArrowRight, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function OrderConfirmation() {
  const [location] = useLocation();
  const { isAuthenticated } = useAuth();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Extract session_id from URL query params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("session_id");
    setSessionId(id);
  }, []);

  // Fetch order details
  const { data: orders, isLoading: ordersLoading } = trpc.shop.getMyOrders.useQuery(undefined, {
    enabled: isAuthenticated && !!sessionId,
  });

  useEffect(() => {
    if (!ordersLoading && orders) {
      setIsLoading(false);
    }
  }, [ordersLoading, orders]);

  // Get the most recent order (should be the one just completed)
  const latestOrder = orders?.[0];
  const confirmationNumber = latestOrder?.id.toString().padStart(6, "0") || "PENDING";

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="text-center max-w-md">
            <h1 className="text-3xl font-bold text-[oklch(0.18_0.012_55)] mb-4">
              Please Log In
            </h1>
            <p className="text-[oklch(0.5_0.02_60)] mb-6">
              You need to be logged in to view your order confirmation.
            </p>
            <a
              href="/"
              className="btn-amber px-6 py-3 rounded-lg inline-block"
            >
              Return to Home
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-[oklch(0.58_0.16_55)] mx-auto mb-4" />
            <p className="text-[oklch(0.5_0.02_60)]">Loading your order details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Main content */}
      <div className="flex-1 py-16 md:py-24 px-4">
        <div className="container max-w-3xl">
          {/* Success header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-[oklch(0.58_0.16_55)] rounded-full blur-xl opacity-20" />
                <CheckCircle
                  size={80}
                  className="text-[oklch(0.58_0.16_55)] relative"
                  strokeWidth={1.5}
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[oklch(0.18_0.012_55)] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Order Confirmed!
            </h1>
            <p className="text-lg text-[oklch(0.5_0.02_60)] mb-2">
              Thank you for your purchase
            </p>
            <p className="text-[oklch(0.4_0.02_60)]">
              A confirmation email has been sent to your email address
            </p>
          </div>

          {/* Confirmation number card */}
          <div className="bg-gradient-to-br from-[oklch(0.93_0.025_75)] to-[oklch(0.88_0.02_75)] rounded-2xl p-8 md:p-10 mb-12 border border-[oklch(0.92_0.015_75)]">
            <p className="text-[oklch(0.5_0.02_60)] text-sm font-medium mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
              CONFIRMATION NUMBER
            </p>
            <p className="text-4xl md:text-5xl font-bold text-[oklch(0.58_0.16_55)] tracking-wider" style={{ fontFamily: "'Outfit', sans-serif" }}>
              #{confirmationNumber}
            </p>
          </div>

          {/* Order details */}
          {latestOrder && (
            <div className="space-y-6 mb-12">
              {/* Order summary */}
              <div className="bg-white rounded-2xl border border-[oklch(0.92_0.015_75)] overflow-hidden">
                <div className="bg-[oklch(0.93_0.025_75)] px-6 md:px-8 py-4 border-b border-[oklch(0.92_0.015_75)]">
                  <h2 className="text-lg font-semibold text-[oklch(0.18_0.012_55)]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Order Summary
                  </h2>
                </div>
                <div className="p-6 md:p-8">
                  {/* Items */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-[oklch(0.18_0.012_55)] mb-4 uppercase tracking-wide" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Items Purchased
                    </h3>
                    <div className="space-y-3">
                      {latestOrder.items.map((item: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between py-3 border-b border-[oklch(0.92_0.015_75)] last:border-0">
                          <div className="flex items-center gap-3">
                            <Package size={18} className="text-[oklch(0.58_0.16_55)]" />
                            <div>
                              <p className="font-medium text-[oklch(0.18_0.012_55)]">
                                {item.name}
                              </p>
                              <p className="text-sm text-[oklch(0.5_0.02_60)]">
                                Qty: {item.quantity}
                              </p>
                            </div>
                          </div>
                          <p className="font-semibold text-[oklch(0.18_0.012_55)]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order totals */}
                  <div className="space-y-2 pt-4 border-t border-[oklch(0.92_0.015_75)]">
                    <div className="flex justify-between text-[oklch(0.5_0.02_60)]">
                      <span>Subtotal</span>
                      <span>${latestOrder.amount}</span>
                    </div>
                    <div className="flex justify-between text-[oklch(0.5_0.02_60)]">
                      <span>Tax</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-[oklch(0.18_0.012_55)] pt-2 border-t border-[oklch(0.92_0.015_75)]">
                      <span>Total</span>
                      <span className="text-[oklch(0.58_0.16_55)]">${latestOrder.amount}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order details grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Order date */}
                <div className="bg-white rounded-2xl border border-[oklch(0.92_0.015_75)] p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[oklch(0.93_0.025_75)] rounded-lg">
                      <Calendar size={20} className="text-[oklch(0.58_0.16_55)]" />
                    </div>
                    <div>
                      <p className="text-sm text-[oklch(0.5_0.02_60)] font-medium mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        ORDER DATE
                      </p>
                      <p className="font-semibold text-[oklch(0.18_0.012_55)]">
                        {new Date(latestOrder.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-sm text-[oklch(0.5_0.02_60)] mt-1">
                        {new Date(latestOrder.createdAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order status */}
                <div className="bg-white rounded-2xl border border-[oklch(0.92_0.015_75)] p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[oklch(0.93_0.025_75)] rounded-lg">
                      <DollarSign size={20} className="text-[oklch(0.58_0.16_55)]" />
                    </div>
                    <div>
                      <p className="text-sm text-[oklch(0.5_0.02_60)] font-medium mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        PAYMENT STATUS
                      </p>
                      <p className="font-semibold text-[oklch(0.18_0.012_55)] capitalize">
                        {latestOrder.status}
                      </p>
                      <p className="text-sm text-[oklch(0.5_0.02_60)] mt-1">
                        {latestOrder.currency} {latestOrder.amount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Next steps */}
          <div className="bg-[oklch(0.93_0.025_75)] rounded-2xl p-8 border border-[oklch(0.92_0.015_75)] mb-12">
            <h2 className="text-xl font-bold text-[oklch(0.18_0.012_55)] mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
              What's Next?
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[oklch(0.58_0.16_55)] text-white flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <p className="font-semibold text-[oklch(0.18_0.012_55)] mb-1">
                    Check Your Email
                  </p>
                  <p className="text-[oklch(0.5_0.02_60)]">
                    You'll receive an order confirmation email with all the details and next steps for your add-ons.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[oklch(0.58_0.16_55)] text-white flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <p className="font-semibold text-[oklch(0.18_0.012_55)] mb-1">
                    Confirm Your Reservation
                  </p>
                  <p className="text-[oklch(0.5_0.02_60)]">
                    Make sure your Airbnb reservation is booked. Your add-ons will be applied to your check-in date.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[oklch(0.58_0.16_55)] text-white flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <p className="font-semibold text-[oklch(0.18_0.012_55)] mb-1">
                    We'll Take Care of the Rest
                  </p>
                  <p className="text-[oklch(0.5_0.02_60)]">
                    Our team will coordinate with you to ensure all your add-ons are ready for your arrival.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="btn-amber px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 text-center"
            >
              Return to Home
              <ArrowRight size={18} />
            </a>
            <a
              href="/#shop"
              className="px-8 py-3 rounded-lg font-semibold border border-[oklch(0.92_0.015_75)] text-[oklch(0.18_0.012_55)] hover:bg-[oklch(0.93_0.025_75)] transition-colors text-center"
            >
              Browse More Add-Ons
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
