/* =============================================================
   RoomsSection — Rooms & Suites Listings
   Golden Hour Luxury Design
   ============================================================= */
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Bed, Users, Star, ExternalLink, Wifi, Coffee, Tv } from "lucide-react";
import { trpc } from "@/lib/trpc";


export default function RoomsSection({ hideHeader = false }: { hideHeader?: boolean }) {
  const { t } = useTranslation();

  const staticRooms = [
    {
      id: 1,
      name: t("theCastleSuite"),
      tagline: t("disneyInspiredKingSuite"),
      location: `Kissimmee Resort · 8 ${t("minToDisney")}`,
      beds: 1,
      guests: 2,
      price: 149,
      rating: 4.98,
      reviews: 87,
      amenities: [t("kingBed"), t("enSuiteBath"), t("balcony"), t("smartTV")],
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
      airbnbUrl: "#",
      featured: true,
    },
    {
      id: 2,
      name: t("theWizardsLoft"),
      tagline: t("harryPotterThemedStudioSuite"),
      location: `Orlando Resort · 10 ${t("minToUniversal")}`,
      beds: 1,
      guests: 2,
      price: 129,
      rating: 4.96,
      reviews: 54,
      amenities: [t("queenBed"), t("kitchenette"), t("themedDecor"), t("smartTV")],
      image: "https://images.unsplash.com/photo-1631049421450-348ccd7f8949?w=800&q=80",
      airbnbUrl: "#",
      featured: false,
    },
    {
      id: 3,
      name: t("theOceanExplorerRoom"),
      tagline: t("seaWorldInspiredFamilyRoom"),
      location: `Orlando Resort · 5 ${t("minToSeaWorld")}`,
      beds: 2,
      guests: 4,
      price: 179,
      rating: 4.94,
      reviews: 41,
      amenities: [t("twoQueenBeds"), t("oceanMural"), t("miniFridge"), t("poolAccess")],
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
      airbnbUrl: "#",
      featured: false,
    },
    {
      id: 4,
      name: t("theLEGOMasterSuite"),
      tagline: t("legoThemedKidsSuite"),
      location: `Winter Haven · 5 ${t("minToLegoland")}`,
      beds: 2,
      guests: 4,
      price: 159,
      rating: 4.97,
      reviews: 63,
      amenities: [t("bunkBeds"), t("legoPlayArea"), t("kidsBath"), t("poolAccess")],
      image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80",
      airbnbUrl: "#",
      featured: false,
    },
    {
      id: 5,
      name: t("thePenthouseEscape"),
      tagline: t("luxuryPenthouseWithParkViews"),
      location: `Orlando Downtown · ${t("centralLocation")}`,
      beds: 2,
      guests: 4,
      price: 249,
      rating: 4.99,
      reviews: 28,
      amenities: [t("twoKingBeds"), t("cityViews"), t("rooftopPool"), t("concierge")],
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      airbnbUrl: "#",
      featured: true,
    },
    {
      id: 6,
      name: t("theTropicalBungalowSuite"),
      tagline: t("floridaInspiredGardenSuite"),
      location: `Celebration, FL · 10 ${t("minToDisney")}`,
      beds: 1,
      guests: 2,
      price: 119,
      rating: 4.93,
      reviews: 72,
      amenities: [t("kingBed"), t("privatePatio"), t("gardenView"), t("poolAccess")],
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
      airbnbUrl: "#",
      featured: false,
    },
    {
      id: 7,
      name: t("theEnchantedGardenRoom"),
      tagline: t("fairyTaleThemedDeluxeRoom"),
      location: `Davenport, FL · 9 ${t("minToDisney")}`,
      beds: 1,
      guests: 2,
      price: 139,
      rating: 4.95,
      reviews: 58,
      amenities: [t("queenBed"), t("enchantedDecor"), t("spaBath"), t("balcony")],
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      airbnbUrl: "#",
      featured: false,
    },
    {
      id: 8,
      name: t("theAdventureLodge"),
      tagline: t("jungleThemedFamilySuite"),
      location: `Orlando Resort · 8 ${t("minToUniversal")}`,
      beds: 2,
      guests: 4,
      price: 189,
      rating: 4.91,
      reviews: 45,
      amenities: [t("twoQueenBeds"), t("jungleMurals"), t("gameConsole"), t("poolAccess")],
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
      airbnbUrl: "#",
      featured: false,
    },
    {
      id: 9,
      name: t("theRoyalChambers"),
      tagline: t("palaceInspiredLuxurySuite"),
      location: `Kissimmee Resort · 7 ${t("minToDisney")}`,
      beds: 2,
      guests: 4,
      price: 229,
      rating: 4.98,
      reviews: 76,
      amenities: [t("twoKingBeds"), t("royalDecor"), t("marbleBath"), t("concierge")],
      image: "https://images.unsplash.com/photo-1631049421450-348ccd7f8949?w=800&q=80",
      airbnbUrl: "#",
      featured: true,
      comingSoon: true,
    },
    {
      id: 10,
      name: t("theCosmicSuite"),
      tagline: t("spaceThemedAdventureRoom"),
      location: `Winter Haven · 6 ${t("minToLegoland")}`,
      beds: 1,
      guests: 2,
      price: 134,
      rating: 4.92,
      reviews: 51,
      amenities: [t("queenBed"), t("glowInDarkDecor"), t("smartLighting"), t("poolAccess")],
      image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80",
      airbnbUrl: "#",
      featured: false,
      comingSoon: true,
    },
    {
      id: 11,
      name: t("theSunsetTerrace"),
      tagline: t("modernMinimalistSuite"),
      location: `Orlando Downtown · ${t("centralLocation")}`,
      beds: 1,
      guests: 2,
      price: 169,
      rating: 4.94,
      reviews: 63,
      amenities: [t("kingBed"), t("sunsetViews"), t("soakingTub"), t("rooftopAccess")],
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
      airbnbUrl: "#",
      featured: false,
      comingSoon: true,
    },
    {
      id: 12,
      name: t("theGrandBallroomSuite"),
      tagline: t("elegantBallroomInspiredLuxury"),
      location: `Celebration, FL · 11 ${t("minToDisney")}`,
      beds: 2,
      guests: 4,
      price: 269,
      rating: 4.97,
      reviews: 82,
      amenities: [t("twoKingBeds"), t("chandelierLighting"), t("marbleBath"), t("champagneService")],
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
      airbnbUrl: "#",
      featured: true,
      comingSoon: true,
    },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const { data: dbRooms = [] } = trpc.listings.getActiveRooms.useQuery();

  // Map DB rooms to the shape the card renderer expects
  const rooms = dbRooms.length > 0 ? dbRooms.map((r) => ({
    id: r.id,
    name: r.name,
    tagline: r.tagline,
    location: r.location,
    beds: r.beds,
    guests: r.guests,
    price: r.price,
    rating: parseFloat(r.rating),
    reviews: r.reviews,
    amenities: Array.isArray(r.tags) ? r.tags : JSON.parse(r.tags as unknown as string || "[]"),
    image: r.image,
    airbnbUrl: r.houfy_url || "#",
    featured: Boolean(r.featured),
    comingSoon: Boolean((r as any).coming_soon),
  })) : staticRooms;


  // Re-animate cards whenever data loads or section becomes visible
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const cards = sectionRef.current?.querySelectorAll(".fade-up");
      cards?.forEach((el, i) => {
        setTimeout(() => el.classList.add("visible"), i * 50);
      });
    }, 100);
    
    return () => clearTimeout(timer);
  }, [hideHeader, rooms.length]);

  return (
    <section id="rooms" ref={sectionRef} className={`py-20 md:py-28 bg-gradient-to-r from-[oklch(0.18_0.012_55)] to-[oklch(0.22_0.015_50)] gradient-animated ${hideHeader ? "pt-0" : ""}`}>
      <div className="container">
        {/* Header */}
        {!hideHeader && (
          <div className="mb-14 fade-up">
            <span className="section-label text-[oklch(0.68_0.15_65)]">{t("roomsAndSuites")}</span>
            <div className="gold-rule w-16 my-4" />
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h2 className="display-heading text-4xl md:text-5xl text-white">
                {t("themedRooms")}<br />
                <span className="italic text-[oklch(0.82_0.14_70)]">{t("resortSuites")}</span>
              </h2>
              <p className="text-white/60 max-w-md leading-relaxed text-sm md:text-base" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {t("roomsDescription")}
              </p>
            </div>
          </div>
        )}

        {/* Rooms — mobile snap-scroll carousel, desktop 4-col grid */}

        {/* Mobile carousel */}
        <div className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4" style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" as any }}>
          {rooms.map((room, i) => (
            <a
              key={room.id}
              href={(room as any).comingSoon ? undefined : (room.airbnbUrl || "#")}
              target={!(room as any).comingSoon ? "_blank" : undefined}
              rel={!(room as any).comingSoon ? "noopener noreferrer" : undefined}
              onClick={(room as any).comingSoon ? (e) => e.preventDefault() : undefined}
              className={`fade-up bg-[oklch(0.24_0.01_55)] rounded-2xl overflow-hidden border border-white/10 group flex flex-col flex-shrink-0 snap-start ${
                (room as any).comingSoon ? "cursor-default opacity-80" : "card-hover cursor-pointer"
              }`}
              style={{ width: "72vw", minWidth: "260px", maxWidth: "320px", transitionDelay: `${i * 80}ms` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={room.image} alt={room.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                {(room as any).comingSoon && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                    <span className="bg-[oklch(0.58_0.16_55)] text-white text-sm font-bold px-5 py-2 rounded-full uppercase tracking-widest shadow-lg">{t("comingSoon")}</span>
                  </div>
                )}
                {room.featured && !((room as any).comingSoon) && (
                  <div className="absolute top-3 left-3 bg-[oklch(0.68_0.15_65)] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{t("topPick")}</div>
                )}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                  <Star size={12} className="text-[oklch(0.82_0.14_70)] fill-[oklch(0.82_0.14_70)]" />
                  <span className="text-xs font-bold text-white">{room.rating}</span>
                  <span className="text-xs text-white/60">({room.reviews})</span>
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="text-xs text-[oklch(0.68_0.15_65)] font-medium mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>{room.location}</div>
                <h3 className="text-lg font-bold text-white mb-1 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{room.name}</h3>
                <p className="text-white/60 text-xs mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>{room.tagline}</p>
                <div className="flex items-center gap-3 text-xs text-white/50 mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
                   <span className="flex items-center gap-1"><Bed size={12} />{room.beds} {t("beds")}</span>
                  <span className="flex items-center gap-1"><Users size={12} />{t("upTo")} {room.guests} {t("guests")}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3 flex-1 content-start">
                  {room.amenities.slice(0, 3).map((a: string) => (
                    <span key={a} className="text-xs bg-white/10 text-white/70 px-2 py-0.5 rounded-full" style={{ fontFamily: "'Outfit', sans-serif" }}>{a}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-auto">
                  <div>
                    <span className="text-xl font-bold text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>${room.price}</span>
                    <span className="text-xs text-white/50"> / night</span>
                  </div>
                  <span className="btn-amber flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold">View Now <ExternalLink size={11} /></span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {rooms.map((room, i) => (
            <a
              key={room.id}
              href={(room as any).comingSoon ? undefined : (room.airbnbUrl || "#")}
              target={!(room as any).comingSoon ? "_blank" : undefined}
              rel={!(room as any).comingSoon ? "noopener noreferrer" : undefined}
              onClick={(room as any).comingSoon ? (e) => e.preventDefault() : undefined}
              className={`fade-up bg-[oklch(0.24_0.01_55)] rounded-2xl overflow-hidden border border-white/10 group flex flex-col ${
                (room as any).comingSoon ? "cursor-default opacity-80" : "card-hover cursor-pointer"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {(room as any).comingSoon && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                    <span className="bg-[oklch(0.58_0.16_55)] text-white text-sm font-bold px-5 py-2 rounded-full uppercase tracking-widest shadow-lg">
                      Coming Soon
                    </span>
                  </div>
                )}
                {room.featured && !((room as any).comingSoon) && (
                  <div className="absolute top-3 left-3 bg-[oklch(0.68_0.15_65)] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Top Pick
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                  <Star size={12} className="text-[oklch(0.82_0.14_70)] fill-[oklch(0.82_0.14_70)]" />
                  <span className="text-xs font-bold text-white">{room.rating}</span>
                  <span className="text-xs text-white/60">({room.reviews})</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="text-xs text-[oklch(0.68_0.15_65)] font-medium mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {room.location}
                </div>
                <h3
                  className="text-xl font-bold text-white mb-1 leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {room.name}
                </h3>
                <p className="text-white/60 text-sm mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {room.tagline}
                </p>

                {/* Specs */}
                <div className="flex items-center gap-4 text-sm text-white/50 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  <span className="flex items-center gap-1.5"><Bed size={14} />{room.beds === 1 ? "1 Bed" : `${room.beds} Beds`}</span>
                  <span className="flex items-center gap-1.5"><Users size={14} />Up to {room.guests}</span>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-5 flex-1 content-start">
                  {room.amenities.map((a: string) => (
                    <span
                      key={a}
                      className="text-xs bg-white/10 text-white/70 px-2.5 py-1 rounded-full"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {a}
                    </span>
                  ))}
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                  <div>
                    <span
                      className="text-2xl font-bold text-white"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      ${room.price}
                    </span>
                    <span className="text-sm text-white/50"> / night</span>
                  </div>
                  <span className="btn-amber flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold">
                                        {t("viewDetails")} <ExternalLink size={11} />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
