/* =============================================================
   Navbar — Theme Park Stays
   Golden Hour Luxury Design
   ============================================================= */
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "wouter";

const navLinks = [
  { label: "Homes", href: "#homes" },
  { label: "Rooms", href: "#rooms" },
  { label: "Tickets", href: "#tickets" },
  { label: "Activities", href: "#activities" },
  { label: "Shop", href: "#shop" },
  { label: "Management", href: "#management" },
  { label: "Design", href: "/design" },
  { label: "Blog", href: "#blog" },
];

export default function Navbar() {
  const [, navigate] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(href);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[oklch(0.92_0.015_75)]"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-3"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/logo_270d47fd.PNG"
              alt="Theme Park Stays logo"
              className="w-10 h-10 object-contain"
            />
            <div>
              <div
                className={`text-sm font-bold leading-tight transition-colors ${scrolled ? "text-[oklch(0.18_0.012_55)]" : "text-white"}`}
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Theme Park Stays
              </div>
              <div className={`text-xs transition-colors ${scrolled ? "text-[oklch(0.5_0.02_60)]" : "text-white/70"}`}>
                Orlando, Florida
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:text-[oklch(0.58_0.16_55)] ${
                  scrolled ? "text-[oklch(0.3_0.015_55)]" : "text-white/90"
                }`}
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA + Mobile menu */}
          <div className="flex items-center gap-3">

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden p-2 rounded-md transition-colors ${scrolled ? "text-[oklch(0.18_0.012_55)]" : "text-white"}`}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[oklch(0.18_0.012_55)]/95 backdrop-blur-md flex flex-col pt-24 px-6 pb-8 lg:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left text-white text-xl py-3 border-b border-white/10 hover:text-[oklch(0.68_0.15_65)] transition-colors"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {link.label}
              </button>
            ))}
          </div>

        </div>
      )}
    </>
  );
}
