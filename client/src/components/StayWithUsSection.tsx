import { useState } from "react";
import { useTranslation } from "react-i18next";
import HomesSection from "./HomesSection";
import RoomsSection from "./RoomsSection";
import { Home, Bed } from "lucide-react";

export default function StayWithUsSection() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"homes" | "rooms">("homes");

  return (
    <section id="stay" className="py-20 md:py-28 bg-gradient-to-r from-[oklch(0.94_0.008_80)] via-[oklch(0.85_0.12_65)] to-[oklch(0.75_0.15_240)] gradient-animated">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="section-label">{t("stayWithUs")}</span>
          <div className="gold-rule w-24 mx-auto my-4" />
          <h2 className="display-heading text-4xl md:text-5xl lg:text-6xl text-[oklch(0.18_0.012_55)] mb-6">
            Find Your Perfect<br />
            <span className="italic text-[oklch(0.58_0.16_55)]">Orlando Escape</span>
          </h2>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-[oklch(0.95_0.01_75)] rounded-full shadow-inner">
            <button
              onClick={() => setActiveTab("homes")}
              className={`flex items-center gap-2 px-10 py-4 rounded-full text-base font-bold transition-all duration-300 ${
                activeTab === "homes"
                  ? "bg-[oklch(0.58_0.16_55)] text-white shadow-lg"
                  : "bg-white text-[oklch(0.58_0.16_55)] hover:bg-[oklch(0.62_0.18_55)] hover:text-white"
              }`}
            >
              <Home size={20} />
              {t("vacationHomes")}
            </button>
            <button
              onClick={() => setActiveTab("rooms")}
              className={`flex items-center gap-2 px-10 py-4 rounded-full text-base font-bold transition-all duration-300 ${
                activeTab === "rooms"
                  ? "bg-[oklch(0.58_0.16_55)] text-white shadow-lg"
                  : "bg-white text-[oklch(0.58_0.16_55)] hover:bg-[oklch(0.62_0.18_55)] hover:text-white"
              }`}
            >
              <Bed size={20} />
              {t("roomsAndSuites")}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="transition-all duration-500">
          {activeTab === "homes" ? (
            <HomesSection hideHeader={true} />
          ) : (
            <RoomsSection hideHeader={true} />
          )}
        </div>
      </div>
    </section>
  );
}
