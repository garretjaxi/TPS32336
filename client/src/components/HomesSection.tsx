/* =============================================================
   HomesSection — Vacation Home Listings
   Golden Hour Luxury Design
   ============================================================= */
import { useState, useEffect, useRef, useMemo } from "react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { Bed, Bath, Users, Waves, Gamepad2, PawPrint, Star, ExternalLink, Sparkles, ChevronDown } from "lucide-react";
import { trpc } from "@/lib/trpc";
import OptimizedImage from "./OptimizedImage";
import { THEME_PARKS, ParkKey, getClosestPark, calculateDrivingTime } from "@/lib/distanceCalculator";

// Legacy static homes array removed — data now comes from the database
const _homes_unused = [
  {
    id: 1,
    name: "The Power-Up Pad",
    tagline: "5BR Luxury Home · Private Pool",
    location: "Kissimmee, FL — 8 mi to Disney",
    beds: 5,
    baths: 4,
    guests: 12,
    price: 300,
    rating: 5,
    reviews: 15,
    tags: ["pool", "gameroom", "pets"],
    badges: ["Pool", "Game Room", "Pet Friendly"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/power-up-pad_b70cee08.jpg",
    airbnbUrl: "https://www.houfy.com/330116?guests=1&adults=1&children=0",
    featured: true,
  },
  {
    id: 2,
    name: "The Enchanted Storybook",
    tagline: "9BR Disney-Themed Mega Home · Heated Pool & Spa",
    location: "Kissimmee, FL — 8 mi to Disney",
    beds: 13,
    baths: 6.5,
    guests: 24,
    price: 349,
    rating: 5,
    reviews: 2,
    tags: ["pool", "resort"],
    badges: ["Pool", "Resort Stay", "Themed Rooms"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/Gemini_Generated_Image_pfw289pfw289pfw2_4e800aea.webp",
    airbnbUrl: "https://www.houfy.com/330128?guests=1&adults=1&children=0",
    featured: false,
  },
  {
    id: 3,
    name: "Disney Adventure Estate",
    tagline: "9BR Mega Home · Game Room & Pool",
    location: "Kissimmee, FL — 8 mi to Disney",
    beds: 13,
    baths: 6.5,
    guests: 24,
    price: 300,
    rating: 4.7,
    reviews: 43,
    tags: ["pool", "gameroom"],
    badges: ["Pool", "Game Room"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/disney-adventure-estate_dc5c92e3.png",
    airbnbUrl: "https://www.houfy.com/330121?guests=1&adults=1&children=0",
    featured: false,
  },
  {
    id: 4,
    name: "The Disney Retreat",
    tagline: "3BR Hot Tub · Resort Pool",
    location: "Davenport, FL — 7 mi to Disney",
    beds: 4,
    baths: 2.5,
    guests: 6,
    price: 149,
    rating: 4.88,
    reviews: 51,
    tags: ["pool", "resort"],
    badges: ["Hot Tub", "Resort"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/disney-retreat_df72dd9a.webp",
    airbnbUrl: "https://www.houfy.com/330115?guests=1&adults=1&children=0",
    featured: false,
  },
  {
    id: 5,
    name: "Modern Winter Garden Get away",
    tagline: "2BR Apt · Close to Downtown",
    location: "Winter Garden, FL — 5 min to Downtown",
    beds: 3,
    baths: 2,
    guests: 6,
    price: 150,
    rating: 4.85,
    reviews: 62,
    tags: ["pool"],
    badges: ["Pool", "Firepit"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/modern-winter-garden_639e7bde.png",
    airbnbUrl: "https://www.houfy.com/330133?guests=1&adults=1&children=0",
    featured: true,
  },
  {
    id: 6,
    name: "Peaceful Retreat",
    tagline: "3BR Family Home · Fenced Yard",
    location: "Clermont, FL — 5 mi to Downtown",
    beds: 3,
    baths: 2,
    guests: 6,
    price: 169,
    rating: 4.88,
    reviews: 19,
    tags: ["pool", "pets"],
    badges: ["Nearby Lakes", "Fenced Yard", "Pet Friendly"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/peaceful-retreat_859f06e7.webp",
    airbnbUrl: "https://www.houfy.com/330116?guests=1&adults=1&children=0",
    featured: false,
  },
  {
    id: 7,
    name: "The Sunset Villa",
    tagline: "4BR Luxury Home · Ocean View",
    location: "Davenport, FL — 10 mi to Disney",
    beds: 4,
    baths: 3,
    guests: 10,
    price: 279,
    rating: 4.92,
    reviews: 38,
    tags: ["pool"],
    badges: ["Pool", "Ocean View"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/sunset-villa-pool_90568b2e.webp",
    airbnbUrl: "https://www.houfy.com/330132?guests=1&adults=1&children=0",
    featured: false,
  },
  {
    id: 8,
    name: "The Royal Palace",
    tagline: "8BR Grand Estate · Theater & Pool",
    location: "Kissimmee, FL — 9 mi to Disney",
    beds: 8,
    baths: 5,
    guests: 18,
    price: 399,
    rating: 4.96,
    reviews: 56,
    tags: ["pool", "gameroom"],
    badges: ["Pool", "Theater", "Game Room"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/royal-palace_1190a580.jpg",
    airbnbUrl: "https://www.houfy.com/330124?guests=1&adults=1&children=0",
    featured: true,
  },
  {
    id: 9,
    name: "The Tropical Oasis",
    tagline: "6BR Resort Home · Spa & Pool",
    location: "Orlando, FL — 6 mi to Universal",
    beds: 6,
    baths: 4,
    guests: 14,
    price: 329,
    rating: 4.89,
    reviews: 47,
    tags: ["pool", "resort"],
    badges: ["Pool", "Spa", "Resort Stay"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/tropical-oasis_a2f52cf6.webp",
    airbnbUrl: "https://www.houfy.com/330123?guests=1&adults=1&children=0",
    featured: false,
  },
  {
    id: 10,
    name: "The Modern Escape",
    tagline: "5BR Contemporary Home · Smart Home",
    location: "Winter Park, FL — 12 mi to Disney",
    beds: 5,
    baths: 3,
    guests: 12,
    price: 289,
    rating: 4.94,
    reviews: 33,
    tags: ["pool"],
    badges: ["Smart Home", "Pool"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/modern-escape_8b81a0c4.png",
    airbnbUrl: "https://www.houfy.com/330122?guests=1&adults=1&children=0",
    featured: false,
  },
  {
    id: 11,
    name: "The Lakeside Manor",
    tagline: "7BR Waterfront Home · Private Dock",
    location: "Windermere, FL — 11 mi to Disney",
    beds: 7,
    baths: 4,
    guests: 16,
    price: 359,
    rating: 4.91,
    reviews: 52,
    tags: ["pool"],
    badges: ["Waterfront", "Private Dock"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/lakeside-manor_3e7aa102.avif",
    airbnbUrl: "https://www.houfy.com/330127?guests=1&adults=1&children=0",
    featured: false,
  },
  {
    id: 12,
    name: "The Castle Keep",
    tagline: "10BR Mega Estate · Game Room & Theater",
    location: "Kissimmee, FL — 7 mi to Disney",
    beds: 10,
    baths: 6,
    guests: 22,
    price: 449,
    rating: 4.97,
    reviews: 68,
    tags: ["pool", "gameroom", "resort"],
    badges: ["Pool", "Game Room", "Theater", "Resort Stay"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/castle-keep_a07d58ba.jpg",
    airbnbUrl: "https://www.houfy.com/330129?guests=1&adults=1&children=0",
    featured: true,
  },
  {
    id: 13,
    name: "The Serenity Springs",
    tagline: "4BR Cozy Home · Hot Tub & Garden",
    location: "Clermont, FL — 8 mi to Downtown",
    beds: 4,
    baths: 2,
    guests: 8,
    price: 199,
    rating: 4.86,
    reviews: 41,
    tags: [],
    badges: ["Hot Tub", "Garden"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/serenity-springs_4018ec2a.jpg",
    airbnbUrl: "https://www.houfy.com/330120?guests=1&adults=1&children=0",
    featured: false,
  },
  {
    id: 14,
    name: "The Hidden Gem",
    tagline: "3BR Disney-Themed Home · Minutes to Magic Kingdom",
    location: "Kissimmee, FL — 4 mi to Disney",
    beds: 3,
    baths: 2,
    guests: 6,
    price: 179,
    rating: 4.93,
    reviews: 37,
    tags: ["themed", "pets"],
    badges: ["Disney Themed", "Pool", "Pet Friendly"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/hidden-gem_5c4d4b6d.jpg",
    airbnbUrl: "https://www.houfy.com/330135?guests=1&adults=1&children=0",
    featured: false,
  },
  {
    id: 15,
    name: "The Spacious Retreat",
    tagline: "7BR Luxury Estate · Emerald Island Resort · Pets Welcome",
    location: "Kissimmee, FL — 6 mi to Disney",
    beds: 7,
    baths: 6,
    guests: 16,
    price: 389,
    rating: 4.95,
    reviews: 29,
    tags: ["gameroom", "pets", "resort"],
    badges: ["Game Room", "Pet Friendly", "Resort Stay", "Pool"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/spacious-retreat_45247f47.avif",
    airbnbUrl: "https://www.houfy.com/330126?guests=1&adults=1&children=0",
    featured: true,
  },
];


const tagIcons: Record<string, React.ReactNode> = {
  pool: <Waves size={12} />,
  gameroom: <Gamepad2 size={12} />,
  pets: <PawPrint size={12} />,
  themed: <Sparkles size={12} />,
  resort: <Star size={12} />,
};

export default function HomesSection({ hideHeader = false }: { hideHeader?: boolean }) {
  const { t } = useTranslation();
  const [, navigate] = useLocation();
  const [selectedParkByHome, setSelectedParkByHome] = useState<Record<number, ParkKey>>({});

  const handleViewProperty = (url: string, name: string) => {
    const params = new URLSearchParams({
      url,
      name,
    });
    navigate(`/property-view?${params.toString()}`);
  };

  const filterOptions = [
    {
      id: "all",
      label: t("allHomes"),
      icon: null,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
    },
    {
      id: "pool",
      label: t("poolHomes"),
      icon: <Waves size={20} />,
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/4238_Lana_Ave_Final-55_7ddf9ac1.jpg",
    },
    {
      id: "gameroom",
      label: t("gameRooms"),
      icon: <Gamepad2 size={20} />,
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/game-room-new_5b58befe.webp",
    },
    {
      id: "pets",
      label: t("petFriendly"),
      icon: <PawPrint size={20} />,
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80",
    },
    {
      id: "themed",
      label: t("themedRooms"),
      icon: <Sparkles size={20} />,
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/themed-rooms-new_12889edf.webp",
    },
    {
      id: "resort",
      label: t("resortStay"),
      icon: <Star size={20} />,
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/windsor_island_waterpark_aerial_317276259a_c6627b9b.webp",
    },
  ];
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const { data: dbListings = [], isLoading } = trpc.listings.getActiveHomes.useQuery();

  // Map DB listings to the shape the card renderer expects
  const homes = dbListings.map((l: any) => ({
    id: l.id,
    name: l.name,
    tagline: l.tagline,
    location: l.location,
    beds: l.beds,
    baths: parseFloat(l.baths),
    guests: l.guests,
    price: l.price,
    rating: parseFloat(l.rating),
    reviews: l.reviews,
    tags: Array.isArray(l.tags) ? l.tags : JSON.parse(l.tags as unknown as string || "[]"),
    badges: Array.isArray(l.badges) ? l.badges : JSON.parse(l.badges as unknown as string || "[]"),
    image: l.image,
    airbnbUrl: l.houfy_url,
    featured: Boolean(l.featured),
    distanceMagicKingdom: l.distanceMagicKingdom,
    distanceUniversal: l.distanceUniversal,
    distanceSeaworld: l.distanceSeaworld,
    distanceLEGOLAND: l.distanceLEGOLAND,
    distanceAirport: l.distanceAirport,
  }));

  const filtered = useMemo(() => {
    return activeFilter === "all"
      ? homes
      : homes.filter((home) => home.tags.includes(activeFilter) || (activeFilter === "resort" && home.badges.some((b: string) => b === "Resort Stay")) || (activeFilter === "themed" && home.badges.some((b: string) => b === "Themed Rooms")));
  }, [activeFilter, homes]);

  // Initialize default parks for each home
  useEffect(() => {
    const defaults: Record<number, ParkKey> = {};
    filtered.forEach((home: any) => {
      const closest = getClosestPark(home.location);
      if (closest) {
        defaults[home.id] = closest;
      }
    });
    setSelectedParkByHome(defaults);
  }, [activeFilter, homes.length]);

  // Re-animate cards whenever the filter changes or data loads
  useEffect(() => {
    if (!sectionRef.current || isLoading) return;
    
    // Small delay to ensure DOM is ready after loading state changes
    const timer = setTimeout(() => {
      const cards = sectionRef.current?.querySelectorAll(".fade-up");
      cards?.forEach((el, i) => {
        setTimeout(() => el.classList.add("visible"), i * 50);
      });
    }, 100);
    
    return () => clearTimeout(timer);
  }, [activeFilter, isLoading, hideHeader, homes.length]);

  return (
    <section id="homes" ref={sectionRef} className={`py-20 md:py-28 bg-gradient-to-r from-[oklch(0.14_0.012_55)] via-[oklch(0.18_0.012_55)] to-[oklch(0.25_0.012_55)] gradient-animated ${hideHeader ? "pt-0" : ""}`}>
      <div className="container">
        {/* Header */}
        {!hideHeader && (
          <div className="mb-14 fade-up">
            <span className="text-[oklch(0.68_0.15_65)] text-xs font-bold uppercase tracking-[0.2em]">Vacation Homes</span>
            <div className="w-16 h-px bg-[oklch(0.68_0.15_65)] my-4" />
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h2 className="display-heading text-4xl md:text-5xl text-white">
                {t("luxuryHomesBuiltForFamilies")}
              </h2>
              <p className="text-white/60 max-w-md leading-relaxed text-sm md:text-base" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {t("homesDescription")}
              </p>
            </div>
          </div>
        )}

        {/* Filter Section */}
        <div className="mb-16 fade-up">
          <p className="text-center text-white/60 font-medium mb-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {t("findYourFavoriteVacationHome")}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setActiveFilter(option.id)}
                className={`group transition-all duration-300 transform hover:scale-105 ${
                  activeFilter === option.id ? "ring-2 ring-[oklch(0.58_0.16_55)]" : ""
                }`}
              >
                {/* Filter Card */}
                <div className="relative overflow-hidden rounded-xl h-28 sm:h-32 mb-2">
                  <img
                    src={option.image}
                    alt={option.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 transition-all duration-300 ${
                    activeFilter === option.id
                      ? "bg-[oklch(0.58_0.16_55)]/30"
                      : "bg-black/0 group-hover:bg-black/10"
                  }`} />
                </div>
                {/* Label */}
                <div className={`text-center py-2 px-1 rounded-lg transition-all duration-300 text-xs sm:text-sm ${
                  activeFilter === option.id
                    ? "bg-[oklch(0.58_0.16_55)] text-white font-semibold"
                    : "bg-white/10 text-white/80 group-hover:bg-white/20"
                }`}
                style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  <div className="flex items-center justify-center gap-1 flex-wrap">
                    {option.icon && <span className="hidden sm:inline">{option.icon}</span>}
                    <span className="line-clamp-2">{option.label}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Property grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white/10 rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-white/20" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-white/20 rounded w-1/2" />
                  <div className="h-5 bg-white/20 rounded w-3/4" />
                  <div className="h-3 bg-white/20 rounded w-full" />
                  <div className="h-8 bg-white/20 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-white/60">
            <p className="text-lg">No homes match this filter. Try a different category.</p>
          </div>
        ) : (
          <>
          {/* Mobile: horizontal snap-scroll carousel. Desktop: 4-col grid */}
          <div className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4" style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" as any }}>
            {filtered.map((home, i) => (
              <div
                key={home.id}
                className="home-card fade-up card-hover bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg border border-white/40 group flex flex-col cursor-pointer flex-shrink-0 snap-start"
                style={{ width: "72vw", minWidth: "260px", maxWidth: "320px" }}
              >
                {/* Image */}
                <a
                  href={home.airbnbUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-[4/3] overflow-hidden block"
                >
                  <OptimizedImage
                    src={home.image}
                    alt={`${home.name} - ${home.beds} bedroom vacation rental in ${home.location}`}
                    width={400}
                    height={300}
                    priority={false}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {home.featured && (
                    <div className="absolute top-3 left-3 bg-[oklch(0.58_0.16_55)] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Featured
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Star size={12} className="text-[oklch(0.68_0.15_65)] fill-[oklch(0.68_0.15_65)]" />
                    <span className="text-xs font-bold text-[oklch(0.18_0.012_55)]">{home.rating}</span>
                    <span className="text-xs text-gray-500">({home.reviews})</span>
                  </div>
                </a>
                <div className="p-4 flex flex-col flex-1">
                  {/* Park Distance Selector */}
                  <div className="mb-2 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <div className="relative inline-block">
                      <select
                        value={selectedParkByHome[home.id] || "magicKingdom"}
                        onChange={(e) => setSelectedParkByHome(prev => ({ ...prev, [home.id]: e.target.value as ParkKey }))}
                        className="appearance-none bg-[oklch(0.94_0.015_75)] text-[oklch(0.18_0.012_55)] text-xs font-medium px-2 py-1 rounded-lg pr-6 cursor-pointer hover:bg-[oklch(0.90_0.015_75)] transition-colors"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        <option value="magicKingdom">{THEME_PARKS.magicKingdom.icon} Magic Kingdom</option>
                        <option value="universal">{THEME_PARKS.universal.icon} Universal</option>
                        <option value="seaworld">{THEME_PARKS.seaworld.icon} SeaWorld</option>
                        <option value="legoland">{THEME_PARKS.legoland.icon} LEGOLAND</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-1.5 top-1.5 text-[oklch(0.58_0.16_55)] pointer-events-none" />
                    </div>
                    <div className="text-xs font-semibold text-[oklch(0.58_0.16_55)]">
                      {(() => {
                        const selectedPark = selectedParkByHome[home.id] || "magicKingdom";
                        const distanceKey = `distance${selectedPark === 'magicKingdom' ? 'MagicKingdom' : selectedPark === 'universal' ? 'Universal' : selectedPark === 'seaworld' ? 'Seaworld' : 'LEGOLAND'}`;
                        const distanceData = (home as any)[distanceKey];
                        if (distanceData && typeof distanceData === 'object' && 'minutes' in distanceData) {
                          return `${distanceData.minutes} mins`;
                        }
                        return "Distance TBD";
                      })()}
                    </div>
                  </div>
                  <div className="text-xs text-[oklch(0.5_0.02_60)] font-medium mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {home.location}
                  </div>
                  <h3 className="text-lg font-bold text-[oklch(0.18_0.012_55)] mb-1 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {home.name}
                  </h3>
                  <p className="text-[oklch(0.5_0.02_60)] text-xs mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {home.tagline}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-[oklch(0.4_0.02_60)] mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    <span className="flex items-center gap-1"><Bed size={12} />{home.beds} {t("beds")}</span>
                    <span className="flex items-center gap-1"><Bath size={12} />{home.baths} {t("baths")}</span>
                    <span className="flex items-center gap-1"><Users size={12} />Up to {home.guests} {t("guests")}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3 flex-1 content-start">
                    {home.badges.slice(0, 3).map((badge: string) => (
                      <span key={badge} className="text-xs bg-[oklch(0.94_0.015_75)] text-[oklch(0.4_0.02_60)] px-2 py-0.5 rounded-full" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {badge}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[oklch(0.92_0.015_75)] mt-auto">
                    <div>
                      <span className="text-xl font-bold text-[oklch(0.18_0.012_55)]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>${home.price}</span>
                      <span className="text-xs text-[oklch(0.5_0.02_60)]"> / night</span>
                    </div>
                    <span className="btn-amber flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold">
                      {t("viewDetails")} <ExternalLink size={11} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop grid — hidden on mobile */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filtered.map((home, i) => (
              <div
                key={home.id}
                className="home-card fade-up card-hover bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg border border-white/40 group flex flex-col cursor-pointer"
              >
                {/* Image */}
                <a
                  href={home.airbnbUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-[4/3] overflow-hidden block"
                >
                  <OptimizedImage
                    src={home.image}
                    alt={`${home.name} - ${home.beds} bedroom vacation rental in ${home.location}`}
                    width={400}
                    height={300}
                    priority={false}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {home.featured && (
                    <div className="absolute top-3 left-3 bg-[oklch(0.58_0.16_55)] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Featured
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Star size={12} className="text-[oklch(0.68_0.15_65)] fill-[oklch(0.68_0.15_65)]" />
                    <span className="text-xs font-bold text-[oklch(0.18_0.012_55)]">{home.rating}</span>
                    <span className="text-xs text-gray-500">({home.reviews})</span>
                  </div>
                </a>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Park Distance Selector */}
                  <div className="mb-2 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <div className="relative inline-block">
                      <select
                        value={selectedParkByHome[home.id] || "magicKingdom"}
                        onChange={(e) => setSelectedParkByHome(prev => ({ ...prev, [home.id]: e.target.value as ParkKey }))}
                        className="appearance-none bg-[oklch(0.94_0.015_75)] text-[oklch(0.18_0.012_55)] text-xs font-medium px-2 py-1 rounded-lg pr-6 cursor-pointer hover:bg-[oklch(0.90_0.015_75)] transition-colors"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        <option value="magicKingdom">{THEME_PARKS.magicKingdom.icon} Magic Kingdom</option>
                        <option value="universal">{THEME_PARKS.universal.icon} Universal</option>
                        <option value="seaworld">{THEME_PARKS.seaworld.icon} SeaWorld</option>
                        <option value="legoland">{THEME_PARKS.legoland.icon} LEGOLAND</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-1.5 top-1.5 text-[oklch(0.58_0.16_55)] pointer-events-none" />
                    </div>
                    <div className="text-xs font-semibold text-[oklch(0.58_0.16_55)]">
                      {(() => {
                        const selectedPark = selectedParkByHome[home.id] || "magicKingdom";
                        const distanceKey = `distance${selectedPark === 'magicKingdom' ? 'MagicKingdom' : selectedPark === 'universal' ? 'Universal' : selectedPark === 'seaworld' ? 'Seaworld' : 'LEGOLAND'}`;
                        const distanceData = (home as any)[distanceKey];
                        if (distanceData && typeof distanceData === 'object' && 'minutes' in distanceData) {
                          return `${distanceData.minutes} mins`;
                        }
                        return "Distance TBD";
                      })()}
                    </div>
                  </div>
                  <div className="text-xs text-[oklch(0.5_0.02_60)] font-medium mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {home.location}
                  </div>
                  <h3
                    className="text-xl font-bold text-[oklch(0.18_0.012_55)] mb-1 leading-tight"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {home.name}
                  </h3>
                  <p className="text-[oklch(0.5_0.02_60)] text-sm mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {home.tagline}
                  </p>

                  {/* Specs */}
                  <div className="flex items-center gap-4 text-sm text-[oklch(0.4_0.02_60)] mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    <span className="flex items-center gap-1"><Bed size={12} />{home.beds} {t("beds")}</span>
                    <span className="flex items-center gap-1"><Bath size={12} />{home.baths} {t("baths")}</span>
                    <span className="flex items-center gap-1"><Users size={12} />{t("upTo")} {home.guests} {t("guests")}</span>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-5 flex-1 content-start">
                    {home.badges.map((badge: string) => (
                      <span
                        key={badge}
                        className="text-xs bg-[oklch(0.94_0.015_75)] text-[oklch(0.4_0.02_60)] px-2.5 py-1 rounded-full"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-[oklch(0.92_0.015_75)] mt-auto">
                    <div>
                      <span
                        className="text-2xl font-bold text-[oklch(0.18_0.012_55)]"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        ${home.price}
                      </span>
                      <span className="text-sm text-[oklch(0.5_0.02_60)]"> / night</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (home.airbnbUrl) {
                          handleViewProperty(home.airbnbUrl, home.name);
                        }
                      }}
                      className="btn-amber flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold hover:opacity-80 transition-opacity cursor-pointer"
                    >
                      View Now
                      <ExternalLink size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </>
        )}
      </div>
    </section>
  );
}
