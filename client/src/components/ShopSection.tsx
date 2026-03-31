/* =============================================================
   ShopSection — Guest Add-ons Ecommerce Shop
   Golden Hour Luxury Design
   ============================================================= */
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ShoppingCart, Plus, Minus, X, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  category: "services" | "welcome" | "activities";
  description: string;
  price: number;
  icon: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function ShopSection() {
  const { t } = useTranslation();

  const { data: productsData, isLoading } = trpc.shop.getProducts.useQuery();
  
  // Convert cents to dollars for display
  const products: Product[] = (productsData || []).map((p: any) => ({
    ...p,
    price: p.price / 100
  }));

  const sectionRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<"all" | "services" | "welcome" | "activities">("all");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const createCheckoutMutation = trpc.shop.createCheckoutSession.useMutation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-up").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredProducts = (selectedCategory === "all"
    ? products
    : products.filter(p => p.category === selectedCategory)).filter((p: any) => p.active !== false);

  const handleCategoryChange = (cat: "all" | "services" | "welcome" | "activities") => {
    setSelectedCategory(cat);
    setAnimKey(k => k + 1);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name}${t("addedToCart")}`);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.id !== productId));
    } else {
      setCart(prev =>
        prev.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in to proceed with checkout");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsCheckingOut(true);
    try {
      const result = await createCheckoutMutation.mutateAsync({
        items: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        successUrl: `${window.location.origin}/shop/success`,
        cancelUrl: window.location.href,
      });

      if (result.url) {
        toast.success("Redirecting to checkout...");
        window.location.href = result.url;
        setCart([]);
        setShowCart(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to create checkout session. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <section ref={sectionRef} id="shop" className="py-20 md:py-28 bg-gradient-to-r from-[oklch(0.94_0.008_80)] via-[oklch(0.92_0.008_80)] to-[oklch(0.85_0.008_80)] gradient-animated">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-14 fade-up">
          <span className="section-label text-[oklch(0.18_0.012_55)]">Guest Add-Ons</span>
          <div className="gold-rule w-24 mx-auto my-4" />
          <h2 className="display-heading text-4xl md:text-5xl text-[oklch(0.18_0.012_55)]">
            Enhance Your<br />
            <span className="italic text-[oklch(0.58_0.16_55)]">Theme Park Stay</span>
          </h2>
          <p className="text-[oklch(0.4_0.02_60)] text-lg max-w-3xl mx-auto leading-relaxed mt-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Add special services, welcome amenities, and activities to make your vacation unforgettable. Book these add-ons before or after your reservation.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 fade-up">
          {["all", "services", "welcome", "activities"].map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat as any)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-[oklch(0.58_0.16_55)] text-white shadow-md"
                  : "bg-[oklch(0.93_0.025_75)] text-[oklch(0.18_0.012_55)] hover:bg-[oklch(0.88_0.02_75)]"
              }`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {cat === "all" && "All Items"}
              {cat === "services" && "Services"}
              {cat === "welcome" && "Welcome Items"}
              {cat === "activities" && "Activities"}
            </button>
          ))}
        </div>

        {/* Products grid - horizontal scroll on mobile, normal grid on desktop */}
        <div className="mb-12">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[oklch(0.58_0.16_55)]" />
            </div>
          ) : (
            <div className="flex md:grid md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 overflow-x-auto md:overflow-x-visible pb-6 md:pb-0 snap-x snap-mandatory px-4 md:px-0" style={{ scrollbarWidth: 'auto', scrollbarColor: 'rgba(88, 88, 200, 0.5) rgba(240, 240, 240, 0.1)' }}>
            {filteredProducts.map((product, i) => (
            <div
              key={`${animKey}-${product.id}`}
              className="shop-card-enter bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden border border-white/40 hover:shadow-lg transition-all flex flex-col flex-shrink-0 w-72 md:w-auto md:scale-100 snap-center md:snap-none"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {/* Product image */}
              <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-3 right-3 text-3xl">{product.icon}</div>
              </div>

              {/* Product info */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-[oklch(0.18_0.012_55)] text-base mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {product.name}
                </h3>
                <p className="text-[oklch(0.5_0.02_60)] text-xs leading-relaxed flex-1">
                  {product.description}
                </p>

                {/* Price and button — pinned to bottom */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-[oklch(0.93_0.015_75)]">
                  <div className="text-lg font-bold text-[oklch(0.58_0.16_55)]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    ${product.price}
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="btn-amber px-3 py-1.5 rounded-lg flex items-center gap-1 text-xs"
                  >
                    <Plus size={14} />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>
          )}
        </div>

        {/* Shopping cart button */}
        <div className="flex justify-center fade-up">
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative btn-amber px-6 py-3 rounded-full flex items-center gap-2 text-base font-semibold shadow-lg"
          >
            <ShoppingCart size={20} />
            View Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Shopping cart modal */}
        {showCart && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end md:items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              {/* Cart header */}
              <div className="sticky top-0 bg-white border-b border-[oklch(0.92_0.015_75)] p-6 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-[oklch(0.18_0.012_55)]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Shopping Cart
                </h3>
                <button
                  onClick={() => setShowCart(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} className="text-[oklch(0.18_0.012_55)]" />
                </button>
              </div>

              {/* Cart items */}
              <div className="p-6">
                {cart.length === 0 ? (
                  <p className="text-center text-[oklch(0.5_0.02_60)] py-8">
                    Your cart is empty. Add items to get started!
                  </p>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cart.map(item => (
                        <div key={item.id} className="flex gap-4 pb-4 border-b border-[oklch(0.92_0.015_75)]">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-[oklch(0.18_0.012_55)] text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                              {item.name}
                            </h4>
                            <p className="text-[oklch(0.58_0.16_55)] font-semibold text-sm mt-1">
                              ${item.price}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                              >
                                <Plus size={14} />
                              </button>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="ml-auto p-1 hover:bg-red-100 rounded transition-colors"
                              >
                                <X size={14} className="text-red-600" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Cart summary */}
                    <div className="space-y-3 border-t border-[oklch(0.92_0.015_75)] pt-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-[oklch(0.5_0.02_60)]">Subtotal</span>
                        <span className="font-medium text-[oklch(0.18_0.012_55)]">${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[oklch(0.5_0.02_60)]">Items</span>
                        <span className="font-medium text-[oklch(0.18_0.012_55)]">{cartCount}</span>
                      </div>
                      <div className="border-t border-[oklch(0.92_0.015_75)] pt-3 flex justify-between">
                        <span className="font-semibold text-[oklch(0.18_0.012_55)]">{t("total")}</span>
                        <span className="text-2xl font-bold text-[oklch(0.58_0.16_55)]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                          ${cartTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Checkout button */}
                    <button
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                      className="btn-amber w-full py-3 rounded-lg mt-6 font-semibold text-center flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isCheckingOut && <Loader2 size={16} className="animate-spin" />}
                     {isCheckingOut ? t("processing") : t("checkout")}
                    </button>
                    <button
                      onClick={() => setShowCart(false)}
                      className="w-full py-2 mt-2 rounded-lg border border-[oklch(0.92_0.015_75)] text-[oklch(0.18_0.012_55)] font-medium hover:bg-gray-50 transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
