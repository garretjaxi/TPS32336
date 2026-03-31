/* =============================================================
   TicketsSection — Theme Park Ticket Purchasing
   Golden Hour Luxury Design
   Features all 4 major Orlando theme parks
   ============================================================= */
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink, Clock, Star, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const TICKETS_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663446287426/E83KvqYJ4TGqcmgXCyYT4P/tickets-bg-cZ9GU8ES2FkQycLnPUAxK9.webp";


export default function TicketsSection() {
  const { t } = useTranslation();

  const parks = [
    {
      id: "disney",
      name: t("waltDisneyWorld"),
      tagline: t("theMostMagicalPlaceOnEarth"),
      description: t("disneyWorldDescription"),    highlights: [t("magicKingdom"), t("epcot"), t("hollywoodStudios"), t("animalKingdom")],
      startingPrice: 65,
      promo: t("discoverDisneyPass"),
      hours: t("disneyHours"),
      rating: 4.9,
      color: "from-blue-900 to-blue-700",
      accentColor: "#1a56db",
      emoji: "🏰",
      imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/disney-world_4c070b8d.jpg",
      ticketUrl: "https://kgstix.com/themeparkstays/walt-disney-world/",
    },
    {
      id: "universal",
      name: t("universalStudios"),
      tagline: t("rideTheMovies"),
      description: t("universalStudiosDescription"),
      highlights: [t("wizardingWorld"), t("islandsOfAdventure"), t("epicUniverse"), t("volcanoBay")],
      startingPrice: 69.99,
      promo: t("sevenDayPromo"),
      hours: t("universalHours"),
      rating: 4.8,
      color: "from-yellow-800 to-yellow-600",
      accentColor: "#b45309",
      emoji: "🎬",
      imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/universal-studios_53dbe40a.webp",
      ticketUrl: "https://kgstix.com/themeparkstays/universal-orlando/",
    },
    {
      id: "seaworld",
      name: t("seaWorldOrlando"),
      tagline: t("whereWonderLives"),
      description: t("seaWorldOrlandoDescription"),    highlights: [t("makoCoaster"), t("dolphinShows"), t("mantaRay"), t("antarctica")],
      startingPrice: 47,
      promo: t("threeParkPass"),
      hours: t("seaWorldHours"),
      rating: 4.7,
      color: "from-teal-900 to-teal-600",
      accentColor: "#0d9488",
      emoji: "🌊",
      imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/seaworld_2fc5c31a.webp",
      ticketUrl: "https://kgstix.com/themeparkstays/seaworld-busch-gardens-aquatica-adventure-island-tickets/",
    },
    {
      id: "legoland",
      name: t("legolandFlorida"),
      tagline: t("builtForKidsLovedByFamilies"),
      description: t("legolandFloridaDescription"),
      highlights: [t("legoCity"), t("ninjagoWorld"), t("waterPark"), t("legoMovieWorld")],
      startingPrice: 33,
      promo: t("threeDayAnytimePass"),
      hours: t("legolandHours"),
      rating: 4.6,
      color: "from-red-800 to-red-600",
      accentColor: "#dc2626",
      emoji: "🧱",
      imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/legoland_e6e6fc7e.jpg",
      ticketUrl: "https://kgstix.com/themeparkstays/legoland/details/293495/legoland-florida/",
    },
  ];
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-up").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 120);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleBuyTickets = (park: typeof parks[0]) => {
    toast.info(`${t("redirectingToTickets")}${park.name} ${t("tickets")}`, {
      description: t("youllBeTakenToTicketPartner"),
    });
    window.open(park.ticketUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="tickets" ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${TICKETS_BG})` }}
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 container">
        {/* Header */}
        <div className="text-center mb-16 fade-up">
          <span className="section-label text-[oklch(0.68_0.15_65)]">{t("themeParkTickets")}</span>
          <div className="gold-rule w-24 mx-auto my-4" />
          <h2 className="display-heading text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            {t("yourAdventure")}<br />
            <span className="italic text-[oklch(0.82_0.14_70)]">{t("startsHere")}</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {t("purchaseDiscountedTickets")}          </p>
        </div>

        {/* Park cards */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto md:overflow-x-visible pb-6 md:pb-0 snap-x snap-mandatory" style={{ scrollbarWidth: 'auto', scrollbarColor: 'rgba(255,215,0,0.5) rgba(255,255,255,0.1)' }}>
          {parks.map((park, i) => (
            <div
              key={park.id}
              className="fade-up card-hover bg-white/20 backdrop-blur-md border border-white/40 rounded-2xl overflow-hidden group flex-shrink-0 w-80 md:w-auto snap-center md:snap-none flex flex-col shadow-lg"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Park image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={park.imageUrl}
                  alt={park.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 text-3xl">{park.emoji}</div>
                <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 rounded-full px-2 py-1">
                  <Star size={11} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-xs font-bold">{park.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <h3
                  className="text-xl font-bold text-white mb-1 leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {park.name}
                </h3>                <p className="text-[oklch(0.68_0.15_65)] text-xs font-medium mb-3" style={{ fontFamily: "\'Outfit\', sans-serif" }}>
                  {park.tagline}
                </p>
            <p className="text-white/60 text-xs leading-relaxed mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {park.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {park.highlights.map((h) => (
                    <span key={h} className="text-xs bg-white/10 text-white/70 px-2 py-0.5 rounded-full">
                      {h}
                    </span>
                  ))}
                </div>

                {/* Hours */}
                <div className="flex items-center gap-1.5 text-white/50 text-xs mb-4">
                  <Clock size={12} />
                  <span>{park.hours}</span>
                </div>

                {/* Price + CTA */}
                <div className="pt-4 border-t border-white/15 mt-auto">
                  <div className="text-white/60 text-xs mb-1">{t("startingFrom")}</div>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-2xl font-bold text-white"
                      style={{ fontFamily: "\'Cormorant Garamond\', serif" }}
                    >
                      ${park.startingPrice}
                      <span className="text-sm font-normal text-white/50">{t("perDay")}</span>
                    </span>
                  </div>
                  {park.promo && (
                    <div className="mt-1 text-xs font-semibold text-[oklch(0.82_0.14_70)] tracking-wide" style={{ fontFamily: "\'Outfit\', sans-serif" }}>
                      🏷 {park.promo}
                    </div>
                  )}
                  <button
                    onClick={() => handleBuyTickets(park)}
                    className="btn-amber w-full mt-3 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    {t("buyTickets")}
                    <ExternalLink size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <style>{`
          .md\:overflow-x-visible::-webkit-scrollbar {
            height: 8px;
          }
          .md\:overflow-x-visible::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
          }
          .md\:overflow-x-visible::-webkit-scrollbar-thumb {
            background: rgba(255, 215, 0, 0.5);
            border-radius: 4px;
          }
          .md\:overflow-x-visible::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 215, 0, 0.7);
          }
        `}</style>

        {/* Bottom note */}
        <div className="text-center mt-12 fade-up">
          <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-8 py-6">            <p className="text-[oklch(0.82_0.14_70)] text-sm font-semibold uppercase tracking-widest mb-2" style={{ fontFamily: "\'Outfit\', sans-serif" }}>
              {t("kgstixIsAvailable")}
            </p>
            <p className="text-white text-xl font-bold mb-1" style={{ fontFamily: "\'Cormorant Garamond\', serif" }}>
              {t("haveQuestionsCallUs")}
            </p>
            <a
              href="tel:3219392057"
              className="text-[oklch(0.82_0.14_70)] text-2xl font-bold tracking-wide hover:text-white transition-colors"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              321-939-2057
            </a>
            <p className="text-white/70 text-sm font-semibold mt-3 uppercase tracking-widest" style={{ fontFamily: "\'Outfit\', sans-serif" }}>
              {t("attractionTickets")}
            </p>
            <p className="text-white/50 text-sm mt-1" style={{ fontFamily: "\'Outfit\', sans-serif" }}>
              {t("officeHours")}
            </p>
            <p className="text-white/40 text-xs mt-0.5" style={{ fontFamily: "\'Outfit\', sans-serif" }}>
              {t("closedSaturdaySunday")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
