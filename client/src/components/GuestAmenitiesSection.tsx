/* =============================================================
   GuestAmenitiesSection — What's Included (compact redesign)
   Two-column layout: icon highlights + tabbed category details
   ============================================================= */
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  UtensilsCrossed,
  Bath,
  Shirt,
  Wifi,
  Waves,
  Gamepad2,
  CheckCircle2,
  Car,
  Tv,
  ChevronDown,
} from "lucide-react";

export default function GuestAmenitiesSection() {
  const { t } = useTranslation();

  const categories = [
    {
      icon: UtensilsCrossed,
      title: t("kitchen"),
      color: "#c2800a",
      items: [
        t("fullyEquippedKitchenPotsPansUtensils"),
        t("dishwasherStoveRefrigeratorMicrowave"),
        t("teaKettleToasterBlenderCoffeeMaker"),
        t("coffeeAndCoffeeFilters"),
        t("sugarCreamerSweetenerSaltPepperOil"),
        t("dishSoapSpongePaperTowelsBinBags"),
      ],
    },
    {
      icon: Bath,
      title: t("bathroom"),
      color: "#2563eb",
      items: [
        t("twoRollsOfToiletPaperPerBathroom"),
        t("twoHandTowelsHandSoapPerBathroom"),
        t("conditioningShampooShowerGelHandLotion"),
        t("oneBathTowelWashClothPerGuest"),
        t("onePoolBeachTowelPerGuest"),
      ],
    },
    {
      icon: Waves,
      title: t("poolOutdoor"),
      color: "#0891b2",
      items: [
        t("privateScreenedInPoolWhenNotated"),
        t("outdoorPatioFurniture"),
        t("poolBeachTowelsProvided"),
        t("bbqGrillSelectHomes"),
      ],
    },
    {
      icon: Wifi,
      title: t("connectivity"),
      color: "#7c3aed",
      items: [
        t("highSpeedWiFiThroughout"),
        t("smartTVsInEveryBedroom"),
        t("streamingReadyNetflixDisneyPlusEtc"),
      ],
    },
    {
      icon: Shirt,
      title: t("laundry"),
      color: "#059669",
      items: [
        t("inUnitWasherDryer"),
        t("twoLaundryPodsProvided"),
        t("returnHomeWithCleanClothes"),
      ],
    },
    {
      icon: Gamepad2,
      title: t("entertainment"),
      color: "#dc2626",
      items: [
        t("themedGameRoomsSelectHomes"),
        t("boardGamesFamilyActivities"),
        t("smartTVWithStreamingApps"),
        t("outdoorRecreationAreaDependingOnLocation"),
      ],
    },
  ];

  const highlights = [
    { icon: UtensilsCrossed, label: t("fullyEquippedKitchen") },
    { icon: Waves, label: t("privatePool") },
    { icon: Wifi, label: t("highSpeedWiFi") },
    { icon: Car, label: t("freeParking") },
    { icon: Tv, label: t("smartTVs") },
    { icon: Shirt, label: t("washerDryer") },
  ];

  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggle = (title: string) =>
    setOpenCategory((prev) => (prev === title ? null : title));

  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-[oklch(0.18_0.012_55)] to-[oklch(0.22_0.015_50)] gradient-animated">
      <div className="container max-w-6xl mx-auto px-4">

        {/* ── Section Header ── */}
        <div className="text-center mb-10">
          <span className="section-label text-white">Every Home Stay Includes</span>
          <div className="gold-rule w-16 mx-auto my-4" />
          <h2 className="display-heading text-4xl md:text-5xl text-white mb-4">
            {t("everythingYouNeedReadyOnArrival")}
          </h2>
          <p
            className="text-white/80 text-base max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {t("everyHomeArrivesStocked")}
          </p>
        </div>

        {/* ── Main two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Left: highlight icons grid */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-5"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {t("includedInMostHomes")}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {highlights.map((h) => {
                const Icon = h.icon;
                return (
                  <div
                    key={h.label}
                    className="flex flex-col items-center gap-2 bg-white rounded-2xl border border-[oklch(0.92_0.015_75)] p-5 text-center shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                      <Icon size={20} className="text-amber-600" />
                    </div>
                    <span
                      className="text-[oklch(0.3_0.02_60)] text-xs font-semibold leading-tight"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {h.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Self-catering note */}
            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 flex items-start gap-3">
              <CheckCircle2 size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <p
                className="text-[oklch(0.4_0.02_60)] text-xs leading-relaxed"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                <strong className="text-[oklch(0.25_0.012_55)]">{t("selfCateringHomes")}</strong>{" "}
                {t("starterSuppliesAreComplimentary")}
              </p>
            </div>
          </div>

          {/* Right: accordion category details */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest text-[oklch(0.58_0.16_55)] mb-5"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {t("whatsStockedInEachArea")}
            </p>
            <div className="space-y-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isOpen = openCategory === cat.title;
                return (
                  <div
                    key={cat.title}
                    className="bg-white rounded-xl border border-[oklch(0.92_0.015_75)] overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => toggle(cat.title)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-stone-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: `${cat.color}18` }}
                        >
                          <Icon size={16} style={{ color: cat.color }} />
                        </div>
                        <span
                          className="font-semibold text-[oklch(0.18_0.012_55)] text-sm"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          {cat.title}
                        </span>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`text-stone-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 border-t border-stone-100">
                        <ul className="mt-3 space-y-1.5">
                          {cat.items.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <div
                                className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                                style={{ background: cat.color }}
                              />
                              <span
                                className="text-[oklch(0.45_0.02_60)] text-sm leading-relaxed"
                                style={{ fontFamily: "'Outfit', sans-serif" }}
                              >
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
