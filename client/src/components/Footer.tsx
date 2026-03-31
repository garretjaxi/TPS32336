/* =============================================================
   Footer — Golden Hour Luxury Design
   ============================================================= */
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import { useLocation } from "wouter";

const footerLinks = {
  "Rentals": [
    { label: "Vacation Homes", href: "#homes" },
    { label: "Rooms & Suites", href: "#rooms" },
    { label: "Pool Homes", href: "#homes" },
    { label: "Pet Friendly", href: "#homes" },
    { label: "Resort Stays", href: "#rooms" },
  ],
  "Services": [
    { label: "Theme Park Tickets", href: "#tickets" },
    { label: "Activities & Excursions", href: "#activities" },
    { label: "Property Management", href: "/property-management" },
    { label: "Design Services", href: "/design-services" },
    { label: "Concierge Service", href: "#" },
  ],
  "Company": [
    { label: "About Us", href: "#" },
    { label: "Blog", href: "#blog" },
    { label: "Reviews", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "Owner Portal", href: "#" },
  ],
};

export default function Footer() {
  const [, navigate] = useLocation();

  const handleNavClick = (href: string) => {
    if (href === "#") return;
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(href);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gradient-to-r from-[oklch(0.12_0.01_55)] via-[oklch(0.18_0.012_55)] to-[oklch(0.25_0.012_55)] text-white gradient-animated">
      {/* Main footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[oklch(0.68_0.15_65)] to-[oklch(0.55_0.18_50)] flex items-center justify-center">
                <span className="text-white font-bold text-sm" style={{ fontFamily: "'Cormorant Garamond', serif" }}>TPS</span>
              </div>
              <div>
                <div className="font-bold text-lg" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Theme Park Stays
                </div>
                <div className="text-xs text-white/50 tracking-widest uppercase">Orlando, Florida</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Premium vacation rentals in the heart of Orlando's theme park district. Book direct and experience the magic.
            </p>
            <div className="flex flex-col gap-3 text-sm text-white/60 mb-6">
              <a href="tel:+14078013030" className="flex items-center gap-2 hover:text-[oklch(0.68_0.15_65)] transition-colors">
                <Phone size={14} className="text-[oklch(0.68_0.15_65)]" />
                (407) 801-3030
              </a>
              <a href="mailto:admin@themeparkstays.com" className="flex items-center gap-2 hover:text-[oklch(0.68_0.15_65)] transition-colors">
                <Mail size={14} className="text-[oklch(0.68_0.15_65)]" />
                admin@themeparkstays.com
              </a>
              <span className="flex items-center gap-2">
                <MapPin size={14} className="text-[oklch(0.68_0.15_65)]" />
                Kissimmee & Orlando, FL
              </span>
            </div>
            {/* Social */}
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Facebook, label: "Facebook" },
                { icon: Youtube, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  onClick={() => {}}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[oklch(0.58_0.16_55)] transition-colors"
                  aria-label={label}
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[oklch(0.68_0.15_65)] text-xs font-bold uppercase tracking-widest mb-4">
                {category}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-white/60 text-sm hover:text-white transition-colors text-left"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs" style={{ fontFamily: "'Outfit', sans-serif" }}>
            © 2025 Theme Park Stays. All rights reserved. Orlando, Florida.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/40">
            <button onClick={() => handleNavClick('/privacy-policy')} className="hover:text-white/70 transition-colors">Privacy Policy</button>
            <button onClick={() => handleNavClick('/terms-of-service')} className="hover:text-white/70 transition-colors">Terms of Service</button>
            <button className="hover:text-white/70 transition-colors">Sitemap</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
