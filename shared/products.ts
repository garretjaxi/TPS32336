/**
 * Product definitions for Theme Park Stays ecommerce shop
 * These products are available for guests to purchase as add-ons
 */

export interface ShopProduct {
  id: string;
  name: string;
  category: "services" | "welcome" | "activities";
  description: string;
  price: number; // in cents for Stripe
  icon: string;
  image: string;
}

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: "early-checkin",
    name: "Early Check-In",
    category: "services",
    description: "Check in before 3 PM and start your vacation early",
    price: 4900, // $49.00
    icon: "🔑",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80",
  },
  {
    id: "late-checkout",
    name: "Late Check-Out",
    category: "services",
    description: "Extend your checkout time until 7 PM",
    price: 4900, // $49.00
    icon: "⏰",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&q=80",
  },
  {
    id: "water-case",
    name: "Case of Water",
    category: "welcome",
    description: "24-pack of bottled water in your home",
    price: 1500, // $15.00
    icon: "💧",
    image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&q=80",
  },
  {
    id: "flowers",
    name: "Fresh Flowers",
    category: "welcome",
    description: "Beautiful fresh flower arrangement for your arrival",
    price: 3500, // $35.00
    icon: "🌸",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&q=80",
  },
  {
    id: "welcome-basket",
    name: "Welcome Basket",
    category: "welcome",
    description: "Snacks, treats, and local goodies to welcome you",
    price: 5500, // $55.00
    icon: "🧺",
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd0b988?w=400&q=80",
  },
  {
    id: "grocery-stock",
    name: "Grocery Pre-Stocking",
    category: "services",
    description: "We'll stock your fridge with essentials before arrival",
    price: 7500, // $75.00
    icon: "🛒",
    image: "https://images.unsplash.com/photo-1488459716781-6f3ee1e28e54?w=400&q=80",
  },
  {
    id: "cleaning",
    name: "Mid-Stay Cleaning",
    category: "services",
    description: "Professional cleaning service during your stay",
    price: 9900, // $99.00
    icon: "🧹",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80",
  },
  {
    id: "parking-pass",
    name: "Parking Pass",
    category: "activities",
    description: "Secure parking pass for theme park visits",
    price: 2500, // $25.00
    icon: "🅿️",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  },
  {
    id: "transportation",
    name: "Theme Park Transportation",
    category: "activities",
    description: "Round-trip shuttle service to major theme parks",
    price: 8900, // $89.00
    icon: "🚐",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=80",
  },
];

export function getProductById(id: string): ShopProduct | undefined {
  return SHOP_PRODUCTS.find(p => p.id === id);
}

export function getProductsByCategory(category: ShopProduct["category"]): ShopProduct[] {
  return SHOP_PRODUCTS.filter(p => p.category === category);
}
