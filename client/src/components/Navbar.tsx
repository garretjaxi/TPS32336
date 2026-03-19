/* =============================================================
   Navbar — Golden Hour Luxury Design
   Sticky transparent-to-solid nav with amber accent
   ============================================================= */
import { useState, useEffect } from "react";
import { Menu, X, Phone, MapPin } from "lucide-react";

const navLinks = [
  { label: "Homes", href: "#homes" },
  { label: "Rooms & Suites", href: "#rooms" },
  { label: "Theme Park Tickets", href: "#tickets" },
  { label: "Activities", href: "#activities" },
  { label: "Property Management", href: "#management" },
  { label: "Design Services", href: "#design" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Top bar - only shown when not scrolled */}
      <div className={`fixed top-0 left-0 right-0 z-40 bg-[oklch(0.18_0.012_55)] text-[oklch(0.88_0.02_75)] text-xs py-2 hidden md:block transition-all duration-300 ${scrolled ? 'opacity-0 pointer-events-none -translate-y-full' : 'opacity-100'}`}>
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin size={12} className="text-[oklch(0.68_0.15_65)]" />
              Orlando, Florida — Theme Park Capital of the World
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="tel:+14075550100" className="flex items-center gap-1.5 hover:text-[oklch(0.68_0.15_65)] transition-colors">
              <Phone size={12} />
              (407) 555-0100
            </a>
            <span className="text-[oklch(0.68_0.15_65)]">Book Direct & Save — No Airbnb Fees</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-[oklch(0.88_0.02_75)]"
            : "bg-transparent"
        }`}
        style={{ top: scrolled ? 0 : '2rem' }}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[oklch(0.68_0.15_65)] to-[oklch(0.55_0.18_50)] flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm" style={{ fontFamily: "'Cormorant Garamond', serif" }}>TPS</span>
            </div>
            <div className="hidden sm:block">
              <div
                className={`font-bold text-lg leading-tight transition-colors duration-300 ${scrolled ? "text-[oklch(0.18_0.012_55)]" : "text-white"}`}
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Theme Park Stays
              </div>
              <div className={`text-xs tracking-widest uppercase transition-colors duration-300 ${scrolled ? "text-[oklch(0.58_0.16_55)]" : "text-white/80"}`}>
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
              onClick={() => handleNavClick("#homes")}
              className="hidden md:flex btn-amber px-5 py-2.5 rounded-full text-sm font-semibold shadow-md"
            >
              Book Now
            </button>
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
          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={() => handleNavClick("#homes")}
              className="btn-amber py-3 rounded-full text-base font-semibold text-center"
            >
              Book Now
            </button>
            <a href="tel:+14075550100" className="text-center text-white/70 text-sm">
              (407) 555-0100
            </a>
          </div>
        </div>
      )}
    </>
  );
}
