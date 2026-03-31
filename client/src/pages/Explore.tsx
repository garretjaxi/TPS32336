import { useEffect } from "react";
import { useLocation } from "wouter";
import ActivitiesSection from "@/components/ActivitiesSection";
import ShopSection from "@/components/ShopSection";
import TicketsSection from "@/components/TicketsSection";
import SEO from "@/components/SEO";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import { Breadcrumbs, BREADCRUMB_CONFIGS } from "@/components/Breadcrumbs";

export default function ThemeParkTickets() {
  const { t } = useTranslation();
  const [, navigate] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen bg-[oklch(0.98_0.008_80)]">
      <SEO 
        title="Theme Park Tickets & Orlando Activities"
        description="Book theme park tickets for Disney World, Universal Studios, LEGOLAND, and SeaWorld. Shop exclusive vacation gear and discover the best activities in Orlando."
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={BREADCRUMB_CONFIGS.themeParks} />
            <div className="text-center">
              <h1 className="display-heading text-5xl md:text-6xl text-[oklch(0.18_0.012_55)] mb-4">
                Theme Park Tickets
              </h1>
              <p className="text-[oklch(0.4_0.02_60)] text-lg max-w-2xl mx-auto">
                Book tickets for Disney World, Universal Studios, LEGOLAND, and SeaWorld. Shop exclusive vacation gear and discover the best activities in Orlando.
              </p>
            </div>
          </div>
        </div>

        <TicketsSection />
        <ActivitiesSection />
        <ShopSection />
      </main>
    </div>
  );
}
