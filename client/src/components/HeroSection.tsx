/* =============================================================
   HeroSection — Golden Hour Luxury Design
   Full-bleed hero with parallax overlay, search bar, park badges
   ============================================================= */
import { useState } from "react";
import { Search, Star, ChevronDown } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663446287426/E83KvqYJ4TGqcmgXCyYT4P/hero-banner-Jc4ftC5qx34wsafuU3ys7g.webp";

const parkBadges = [
  { name: "Disney World", emoji: "🏰", color: "bg-blue-600" },
  { name: "Universal Studios", emoji: "🎬", color: "bg-yellow-600" },
  { name: "SeaWorld", emoji: "🌊", color: "bg-teal-600" },
  { name: "LEGOLAND", emoji: "🧱", color: "bg-red-600" },
];

export default function HeroSection() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2 Guests");

  const scrollToHomes = () => {
    document.querySelector("#homes")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_IMG})` }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 container flex flex-col items-center text-center pt-32 pb-20">
        {/* Section label */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-px w-12 bg-[oklch(0.68_0.15_65)]" />
          <span className="text-[oklch(0.68_0.15_65)] text-xs font-semibold tracking-[0.25em] uppercase">
            Orlando, Florida
          </span>
          <div className="h-px w-12 bg-[oklch(0.68_0.15_65)]" />
        </div>

        {/* Main heading */}
        <h1
          className="text-white text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6 max-w-5xl"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Your Home Base for the{" "}
          <span className="italic text-[oklch(0.82_0.14_70)]">Magic</span>
        </h1>

        <p className="text-white/85 text-lg md:text-xl max-w-2xl mb-4 leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Premium vacation rentals minutes from Disney World, Universal Studios, LEGOLAND & SeaWorld.
          Book direct — no Airbnb fees, no surprises.
        </p>

        {/* Star rating */}
        <div className="flex items-center gap-2 mb-10">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="text-[oklch(0.82_0.14_70)] fill-[oklch(0.82_0.14_70)]" />
            ))}
          </div>
          <span className="text-white/80 text-sm">5-Star Rated · 200+ Happy Families</span>
        </div>

        {/* Search bar */}
        <div className="w-full max-w-3xl bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-2 md:p-3 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <div className="flex flex-col px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Check In</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="text-sm font-medium text-gray-800 bg-transparent outline-none"
              />
            </div>
            <div className="flex flex-col px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Check Out</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="text-sm font-medium text-gray-800 bg-transparent outline-none"
              />
            </div>
            <div className="flex flex-col px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Guests</label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="text-sm font-medium text-gray-800 bg-transparent outline-none"
              >
                {["1 Guest", "2 Guests", "3 Guests", "4 Guests", "5 Guests", "6+ Guests"].map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <button
              onClick={scrollToHomes}
              className="btn-amber flex items-center justify-center gap-2 rounded-xl py-3 px-6 text-sm font-semibold"
            >
              <Search size={16} />
              Search
            </button>
          </div>
        </div>

        {/* Park badges */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {parkBadges.map((park) => (
            <div
              key={park.name}
              className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-2 text-white text-sm font-medium"
            >
              <span>{park.emoji}</span>
              <span>{park.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToHomes}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors animate-bounce"
      >
        <span className="text-xs tracking-widest uppercase">Explore</span>
        <ChevronDown size={20} />
      </button>
    </section>
  );
}
