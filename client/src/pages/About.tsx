import { useEffect } from "react";
import { useLocation } from "wouter";
import AboutSection from "@/components/AboutSection";
import GuestAmenitiesSection from "@/components/GuestAmenitiesSection";
import SEO from "@/components/SEO";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";

export default function About() {
  const { t } = useTranslation();
  const [, navigate] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen bg-[oklch(0.98_0.008_80)]">
      <SEO 
        title="About Us & Guest Amenities"
        description="Learn more about Theme Park Stays, our prime location in Kissimmee, and the premium amenities we provide for every guest."
      />
      
      {/* Simple Header */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[oklch(0.92_0.015_75)] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm font-semibold text-[oklch(0.18_0.012_55)] hover:text-[oklch(0.58_0.16_55)] transition-colors"
          >
            <ArrowLeft size={18} /> {t("backToHome")}
          </button>
          <div className="text-lg font-bold tracking-tight text-[oklch(0.18_0.012_55)]">
            🏠 {t("themeParkStays")}
          </div>
          <div className="w-24" /> {/* Spacer */}
        </div>
      </nav>

      <main>
        <div className="py-12 bg-[oklch(0.98_0.005_75)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="display-heading text-5xl md:text-6xl text-[oklch(0.18_0.012_55)] mb-4">
              {t("aboutUs")}
            </h1>
            <p className="text-[oklch(0.4_0.02_60)] text-lg max-w-2xl mx-auto">
              Your home base for the magic. Discover why families choose Theme Park Stays for their Orlando vacation.
            </p>
          </div>
        </div>
        
        <AboutSection />
        <GuestAmenitiesSection />
      </main>
    </div>
  );
}
