/* =============================================================
   Admin Home — Theme Park Stays
   Main admin landing page with navigation to all admin sections
   ============================================================= */
import { useLocation } from "wouter";
import AdminLayout from "@/components/AdminLayout";
import {
  LayoutList,
  Package,
  ShoppingCart,
  BarChart3,
  ArrowRight,
  Home,
  MessageSquare,
} from "lucide-react";

const adminSections = [
  {
    title: "Listings",
    description: "Add, edit, delete, and manage all vacation home and room listings. Toggle active status, update pricing, and reorder properties.",
    icon: LayoutList,
    href: "/admin/listings",
    color: "from-amber-500 to-orange-500",
    bgLight: "bg-amber-50",
    iconColor: "text-amber-600",
    stats: "Manage Properties",
  },
  {
    title: "Inventory",
    description: "Manage shop products, services, and add-ons. Update prices, toggle availability, and create new product listings.",
    icon: Package,
    href: "/admin/inventory",
    color: "from-emerald-500 to-teal-500",
    bgLight: "bg-emerald-50",
    iconColor: "text-emerald-600",
    stats: "Manage Products",
  },
  {
    title: "Orders",
    description: "View all customer orders, track payment status, and monitor revenue. Filter by order status and review transaction history.",
    icon: ShoppingCart,
    href: "/admin/orders",
    color: "from-blue-500 to-indigo-500",
    bgLight: "bg-blue-50",
    iconColor: "text-blue-600",
    stats: "View Orders",
  },
  {
    title: "Analytics",
    description: "Review revenue summaries, completion rates, and order analytics. Get an overview of your business performance.",
    icon: BarChart3,
    href: "/admin/analytics",
    color: "from-purple-500 to-pink-500",
    bgLight: "bg-purple-50",
    iconColor: "text-purple-600",
    stats: "View Reports",
  },
  {
    title: "Inquiries",
    description: "View and manage booking inquiries, design requests, and property management estimates from potential guests.",
    icon: MessageSquare,
    href: "/admin/inquiries",
    color: "from-rose-500 to-orange-500",
    bgLight: "bg-rose-50",
    iconColor: "text-rose-600",
    stats: "View Inquiries",
  },
];

export default function AdminHome() {
  const [, navigate] = useLocation();

  return (
    <AdminLayout title="Owner Dashboard">
    <div className="bg-stone-50">
      <main className="max-w-6xl mx-auto w-full px-4 py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sm text-stone-500 mb-3">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1 hover:text-amber-600 transition-colors"
            >
              <Home size={14} />
              Home
            </button>
            <span>/</span>
            <span className="text-stone-800 font-medium">Admin</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-stone-900 mb-3">
            Owner Dashboard
          </h1>
          <p className="text-stone-500 text-lg">
            Manage your Theme Park Stays business from one place.
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminSections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.title}
                onClick={() => navigate(section.href)}
                className="group text-left bg-white rounded-2xl border border-stone-200 p-8 hover:border-amber-300 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-xl ${section.bgLight} flex items-center justify-center`}>
                    <Icon size={28} className={section.iconColor} />
                  </div>
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${section.color} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity`}>
                    <ArrowRight size={16} className="text-white" />
                  </div>
                </div>

                <h2 className="text-2xl font-serif font-bold text-stone-900 mb-2 group-hover:text-amber-700 transition-colors">
                  {section.title}
                </h2>
                <p className="text-stone-500 text-sm leading-relaxed mb-6">
                  {section.description}
                </p>

                <div className={`inline-flex items-center gap-2 text-sm font-medium bg-gradient-to-r ${section.color} bg-clip-text text-transparent`}>
                  {section.stats}
                  <ArrowRight size={14} className={section.iconColor} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Quick Links */}
        <div className="mt-10 p-6 bg-white rounded-2xl border border-stone-200">
          <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-4">Quick Links</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/admin/listings")}
              className="px-4 py-2 text-sm bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors font-medium"
            >
              + Add New Listing
            </button>
            <button
              onClick={() => navigate("/admin/inventory")}
              className="px-4 py-2 text-sm bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors font-medium"
            >
              + Add New Product
            </button>
            <button
              onClick={() => navigate("/admin/orders")}
              className="px-4 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium"
            >
              View Recent Orders
            </button>
            <button
              onClick={() => navigate("/admin/inquiries")}
              className="px-4 py-2 text-sm bg-rose-50 text-rose-700 rounded-lg hover:bg-rose-100 transition-colors font-medium"
            >
              View Inquiries
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 text-sm bg-stone-100 text-stone-600 rounded-lg hover:bg-stone-200 transition-colors font-medium"
            >
              ← Back to Site
            </button>
          </div>
        </div>
      </main>
    </div>
    </AdminLayout>
  );
}
