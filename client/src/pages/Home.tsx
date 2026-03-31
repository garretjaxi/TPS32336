/* =============================================================
   Home — Orlando Theme Park Stays
   Main landing page with hero, listings, and shop sections
   ============================================================= */
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import HeroSection from "@/components/HeroSection";
import { VIPSignupModal } from "@/components/VIPSignupModal";
import { hasVIPModalBeenShown, markVIPModalAsShown } from "@/lib/vipCookie";
import StayWithUsSection from "@/components/StayWithUsSection";
import ManagementTeaser from "@/components/ManagementTeaser";
import DesignTeaser from "@/components/DesignTeaser";
import AboutSection from "@/components/AboutSection";
import GuestAmenitiesSection from "@/components/GuestAmenitiesSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import TicketsSection from "@/components/TicketsSection";
import ShopSection from "@/components/ShopSection";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut } from "lucide-react";
import { getLoginUrl } from "@/const";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import SEO from "@/components/SEO";
import SchemaMarkup from "@/components/SchemaMarkup";

export default function Home() {
  const { user, logout, loading } = useAuth();
  const [, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [vipModalOpen, setVipModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    // Check if VIP modal has already been shown to this user
    if (!hasVIPModalBeenShown()) {
      // Show modal after 3 seconds
      const timer = setTimeout(() => {
        setVipModalOpen(true);
        markVIPModalAsShown();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[oklch(0.98_0.008_80)] via-[oklch(0.96_0.01_70)] to-[oklch(0.94_0.012_60)] text-[oklch(0.18_0.012_55)]">
      <SEO 
        title="Orlando Vacation Rentals Near Disney World"
        description="Premium vacation rentals in Orlando, FL — minutes from Disney World, Universal Studios, LEGOLAND, and SeaWorld. Book direct and save."
        keywords="Orlando vacation rentals, Disney World vacation homes, Universal Studios rental, Orlando theme park stays, Orlando family vacation, short term rental Orlando, book direct Orlando, LEGOLAND vacation rental, SeaWorld Orlando rental, Orlando villa rental"
        author="Theme Park Stays"
        robots="index, follow"
        twitterHandle="@themeparkstays"
        ogLocale="en_US"
        ogImage="https://d2xsxph8kpxj0f.cloudfront.net/310419663028408712/RyzLQxSB3n3EenkWRBno5W/hero-banner-v2_35fef47f.png"
      />
      <SchemaMarkup 
        type="LocalBusiness"
        data={{
          "name": "Theme Park Stays",
          "image": "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408712/RyzLQxSB3n3EenkWRBno5W/hero-banner-v2_35fef47f.png",
          "@id": "https://3000-i8zyf1kicwdqj7uwtx8l4-1afcc478.sg1.manus.computer",
          "url": "https://3000-i8zyf1kicwdqj7uwtx8l4-1afcc478.sg1.manus.computer",
          "telephone": "+1-321-939-2057",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Four Corners",
            "addressLocality": "Kissimmee",
            "addressRegion": "FL",
            "postalCode": "34747",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 28.3415,
            "longitude": -81.6375
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday"
            ],
            "opens": "08:00",
            "closes": "14:00"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "5000"
          }
        }}
      />
      <SchemaMarkup 
        type="VacationRental"
        data={{
          "name": "Theme Park Stays Vacation Homes",
          "description": "Premium vacation rentals in Orlando, FL — minutes from Disney World, Universal Studios, LEGOLAND, and SeaWorld.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Kissimmee",
            "addressRegion": "FL",
            "addressCountry": "US"
          }
        }}
      />
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[oklch(0.92_0.015_75)] shadow-sm" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/")}
              className="text-xl font-bold tracking-tight text-[oklch(0.18_0.012_55)] hover:text-[oklch(0.58_0.16_55)] transition-colors"
            >
              🏠 Theme Park Stays
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-6">
            <LanguageSwitcher />
            <button
              onClick={() => document.getElementById("stay")?.scrollIntoView({ behavior: "smooth" })}
              className="text-sm text-[oklch(0.4_0.015_55)] hover:text-[oklch(0.18_0.012_55)] transition-colors"
            >
              Stay With Us
            </button>
            <button
              onClick={() => navigate("/theme-park-tickets")}
              className="text-sm text-[oklch(0.4_0.015_55)] hover:text-[oklch(0.18_0.012_55)] transition-colors"
            >
              Theme Park Tickets
            </button>
            <button
              onClick={() => document.getElementById("management")?.scrollIntoView({ behavior: "smooth" })}
              className="text-sm text-[oklch(0.4_0.015_55)] hover:text-[oklch(0.18_0.012_55)] transition-colors"
            >
              Management
            </button>
            <button
              onClick={() => document.getElementById("design")?.scrollIntoView({ behavior: "smooth" })}
              className="text-sm text-[oklch(0.4_0.015_55)] hover:text-[oklch(0.18_0.012_55)] transition-colors"
            >
              Design
            </button>
            <button
              onClick={() => navigate("/admin")}
              className="text-sm text-[oklch(0.4_0.015_55)] hover:text-[oklch(0.18_0.012_55)] transition-colors"
            >
              Admin
            </button>
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-[oklch(0.4_0.015_55)]">{user.name || user.email}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <LogOut size={14} /> Logout
                </button>
              </div>
            ) : (
              <a
                href={getLoginUrl()}
                className="px-4 py-2 rounded-full text-sm font-semibold bg-[oklch(0.18_0.012_55)] text-white hover:bg-[oklch(0.28_0.012_55)] transition-colors"
              >
                Login
              </a>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[oklch(0.18_0.012_55)]"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[oklch(0.92_0.015_75)] bg-white p-4 space-y-3">
            <button
              onClick={() => {
                document.getElementById("stay")?.scrollIntoView({ behavior: "smooth" });
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-sm text-[oklch(0.4_0.015_55)] hover:text-[oklch(0.18_0.012_55)] py-2"
            >
              Stay With Us
            </button>
            <button
              onClick={() => {
                navigate("/theme-park-tickets");
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-sm text-[oklch(0.4_0.015_55)] hover:text-[oklch(0.18_0.012_55)] py-2"
            >
              Explore
            </button>
            <button
              onClick={() => {
                document.getElementById("management")?.scrollIntoView({ behavior: "smooth" });
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-sm text-[oklch(0.4_0.015_55)] hover:text-[oklch(0.18_0.012_55)] py-2"
            >
              Management
            </button>
            <button
              onClick={() => {
                document.getElementById("design")?.scrollIntoView({ behavior: "smooth" });
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-sm text-[oklch(0.4_0.015_55)] hover:text-[oklch(0.18_0.012_55)] py-2"
            >
              Design
            </button>
            <button
              onClick={() => {
                navigate("/admin");
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-sm text-[oklch(0.4_0.015_55)] hover:text-[oklch(0.18_0.012_55)] py-2"
            >
              Admin
            </button>
            {user ? (
              <button
                onClick={handleLogout}
                className="block w-full text-left text-sm text-red-600 py-2"
              >
                Logout
              </button>
            ) : (
              <a
                href={getLoginUrl()}
                className="block w-full text-center px-4 py-2 rounded-full text-sm font-semibold bg-[oklch(0.18_0.012_55)] text-white"
              >
                Login
              </a>
            )}
          </div>
        )}
      </nav>

      {/* Main content */}
      <main role="main">
        <HeroSection />
        
        {/* About Us Section */}
        <AboutSection />
        <GuestAmenitiesSection />

        <StayWithUsSection />

        {/* Theme Park Tickets Section */}
        <TicketsSection />
        <ActivitiesSection />
        <ShopSection />

        <ManagementTeaser />
        <DesignTeaser />

        {/* Community Teaser */}
        <section className="py-16 bg-gradient-to-r from-[oklch(0.98_0.005_75)] to-[oklch(0.95_0.008_70)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="display-heading text-4xl md:text-5xl text-[oklch(0.18_0.012_55)] mb-6">
              Our Community
            </h2>
            <p className="text-[oklch(0.4_0.02_60)] text-lg max-w-2xl mx-auto mb-8">
              See what our guests are saying and stay up to date with the latest Orlando news.
            </p>
            <Button 
              onClick={() => navigate("/community")}
              className="rounded-full px-8 py-6 text-lg bg-[oklch(0.18_0.012_55)] hover:bg-[oklch(0.28_0.012_55)]"
            >
              View Reviews & Blog <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[oklch(0.18_0.012_55)] to-[oklch(0.22_0.015_50)] text-white py-12" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">Theme Park Stays</h3>
              <p className="text-white/70 text-sm">Your Home Base for the Magic</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><button onClick={() => navigate("/about")} className="hover:text-white">About Us</button></li>
                <li><button onClick={() => navigate("/theme-park-tickets")} className="hover:text-white">Theme Park Tickets</button></li>
                <li><button onClick={() => navigate("/community")} className="hover:text-white">Community</button></li>
                <li><button onClick={() => navigate("/property-management")} className="hover:text-white">Management</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="/contact-us" className="hover:text-white">Contact Us</a></li>
                <li><a href="/faq" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="/privacy-policy" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="/terms-of-service" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-white/50">
            <p>&copy; 2026 Theme Park Stays. All rights reserved</p>
          </div>
        </div>
      </footer>

      {/* VIP Signup Modal */}
      <VIPSignupModal 
        isOpen={vipModalOpen} 
        onClose={() => setVipModalOpen(false)} 
      />
    </div>
  );
}
