/* =============================================================
   AdminLayout — Persistent sidebar layout for all admin pages
   ============================================================= */
import { useState } from "react";
import { useLocation } from "wouter";
import {
  LayoutList,
  Package,
  ShoppingCart,
  BarChart3,
  Users,
  Home,
  ChevronLeft,
  Menu,
  X,
  MessageSquare,
} from "lucide-react";

const navItems = [
  {
    label: "Listings",
    href: "/admin/listings",
    icon: LayoutList,
    color: "text-amber-500",
    activeBg: "bg-amber-50 text-amber-700 border-l-2 border-amber-500",
  },
  {
    label: "Inventory",
    href: "/admin/inventory",
    icon: Package,
    color: "text-emerald-500",
    activeBg: "bg-emerald-50 text-emerald-700 border-l-2 border-emerald-500",
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
    color: "text-blue-500",
    activeBg: "bg-blue-50 text-blue-700 border-l-2 border-blue-500",
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    color: "text-purple-500",
    activeBg: "bg-purple-50 text-purple-700 border-l-2 border-purple-500",
  },
  {
    label: "Inquiries",
    href: "/admin/inquiries",
    icon: MessageSquare,
    color: "text-rose-500",
    activeBg: "bg-rose-50 text-rose-700 border-l-2 border-rose-500",
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
    color: "text-rose-500",
    activeBg: "bg-rose-50 text-rose-700 border-l-2 border-rose-500",
  },
];

export default function AdminLayout({ children, title }: { children: React.ReactNode; title: string }) {
  const [location, navigate] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`flex flex-col h-full ${mobile ? "w-64" : "w-56"}`}>
      {/* Logo / Brand */}
      <div className="px-4 py-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
            <Home className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-white text-sm font-semibold leading-tight">Theme Park</p>
            <p className="text-white/50 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        <p className="text-white/30 text-xs font-semibold uppercase tracking-wider px-2 mb-2">Management</p>
        {navItems.map(({ label, href, icon: Icon, color, activeBg }) => {
          const isActive = location === href || location.startsWith(href);
          return (
            <button
              key={href}
              onClick={() => { navigate(href); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? activeBg
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "" : color}`} />
              {label}
            </button>
          );
        })}
      </nav>

      {/* Back to site */}
      <div className="px-2 py-4 border-t border-white/10">
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition-all"
        >
          <ChevronLeft className="w-4 h-4 flex-shrink-0" />
          Back to Site
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col bg-[#1a1a2e] flex-shrink-0 w-56">
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="bg-[#1a1a2e] flex flex-col">
            <Sidebar mobile />
          </div>
          <div
            className="flex-1 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar (mobile only) */}
        <div className="md:hidden bg-[#1a1a2e] text-white px-4 py-3 flex items-center justify-between">
          <button onClick={() => setMobileOpen(true)} className="text-white/80 hover:text-white">
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-sm font-semibold">{title}</span>
          <div className="w-5" />
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
