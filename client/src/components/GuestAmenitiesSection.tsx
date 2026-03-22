/* =============================================================
   GuestAmenitiesSection — What's Included (compact redesign)
   Two-column layout: icon highlights + tabbed category details
   ============================================================= */
import { useState } from "react";
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

const categories = [
  {
    icon: UtensilsCrossed,
    title: "Kitchen",
    color: "#c2800a",
    items: [
      "Fully equipped kitchen (pots, pans, utensils)",
      "Dishwasher, stove, refrigerator, microwave",
      "Tea kettle, toaster, blender & coffee maker",
      "Coffee and coffee filters",
      "Sugar, creamer, sweetener, salt, pepper & oil",
      "Dish soap, sponge, paper towels & bin bags",
    ],
  },
  {
    icon: Bath,
    title: "Bathroom",
    color: "#2563eb",
    items: [
      "2 rolls of toilet paper per bathroom",
      "2 hand towels & hand soap per bathroom",
      "Conditioning shampoo, shower gel & hand lotion",
      "1 bath towel & wash cloth per guest",
      "1 pool/beach towel per guest",
    ],
  },
  {
    icon: Waves,
    title: "Pool & Outdoor",
    color: "#0891b2",
    items: [
      "Private screened-in pool (when notated)",
      "Outdoor patio furniture",
      "Pool/beach towels provided",
      "BBQ grill (select homes)",
    ],
  },
  {
    icon: Wifi,
    title: "Connectivity",
    color: "#7c3aed",
    items: [
      "High-speed Wi-Fi throughout",
      "Smart TVs in every bedroom",
      "Streaming-ready (Netflix, Disney+, etc.)",
    ],
  },
  {
    icon: Shirt,
    title: "Laundry",
    color: "#059669",
    items: [
      "In-unit washer & dryer",
      "2 laundry pods provided",
      "Return home with clean clothes",
    ],
  },
  {
    icon: Gamepad2,
    title: "Entertainment",
    color: "#dc2626",
    items: [
      "Themed game rooms (select homes)",
      "Board games & family activities",
      "Smart TV with streaming apps",
      "Outdoor recreation area (depending on location)",
    ],
  },
];

const highlights = [
  { icon: UtensilsCrossed, label: "Fully Equipped Kitchen" },
  { icon: Waves, label: "Private Pool" },
  { icon: Wifi, label: "High-Speed Wi-Fi" },
  { icon: Car, label: "Free Parking" },
  { icon: Tv, label: "Smart TVs" },
  { icon: Shirt, label: "Washer & Dryer" },
];

export default function GuestAmenitiesSection() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggle = (title: string) =>
    setOpenCategory((prev) => (prev === title ? null : title));

  return (
    <section className="py-16 md:py-20 bg-[oklch(0.975_0.012_80)]">
      <div className="container max-w-6xl mx-auto px-4">

        {/* ── Section Header ── */}
        <div className="text-center mb-10">
          <span className="section-label">Every Stay Includes</span>
          <div className="gold-rule w-16 mx-auto my-4" />
          <h2 className="display-heading text-4xl md:text-5xl text-[oklch(0.18_0.012_55)] mb-4">
            Everything You Need,{" "}
            <span className="italic text-[oklch(0.58_0.16_55)]">Ready on Arrival</span>
          </h2>
          <p
            className="text-[oklch(0.45_0.02_60)] text-base max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Every home arrives stocked with complimentary starter supplies — so you can start
            your vacation the moment you walk through the door.
          </p>
        </div>

        {/* ── Main two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Left: highlight icons grid */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest text-[oklch(0.58_0.16_55)] mb-5"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Included in most homes
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
                <strong className="text-[oklch(0.25_0.012_55)]">Self-catering homes:</strong>{" "}
                Starter supplies are complimentary. Guests are responsible for additional
                groceries. Publix, Walmart & Winn-Dixie are all within minutes of every property.
              </p>
            </div>
          </div>

          {/* Right: accordion category details */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest text-[oklch(0.58_0.16_55)] mb-5"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              What's stocked in each area
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
