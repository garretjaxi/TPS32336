/* =============================================================
   FilterSection — Property category filter tabs
   Golden Hour Luxury Design
   ============================================================= */
import { useState } from "react";
import { Waves, Gamepad2, PawPrint, Building2 } from "lucide-react";

const filters = [
  { id: "all", label: "All Properties", icon: Building2 },
  { id: "pool", label: "Homes with Pool", icon: Waves },
  { id: "gameroom", label: "Game Room", icon: Gamepad2 },
  { id: "pets", label: "Pet Friendly", icon: PawPrint },
  { id: "resort", label: "Resort Stay", icon: Building2 },
];

interface FilterSectionProps {
  activeFilter: string;
  onFilterChange: (id: string) => void;
}

export default function FilterSection({ activeFilter, onFilterChange }: FilterSectionProps) {
  return (
    <section className="py-8 bg-white border-b border-[oklch(0.88_0.02_75)] shadow-sm">
      <div className="container">
        <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => onFilterChange(f.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                activeFilter === f.id
                  ? "bg-[oklch(0.58_0.16_55)] text-white shadow-md"
                  : "bg-[oklch(0.94_0.015_75)] text-[oklch(0.35_0.015_55)] hover:bg-[oklch(0.88_0.025_70)] hover:text-[oklch(0.18_0.012_55)]"
              }`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <f.icon size={15} />
              {f.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
