/* =============================================================
   ActivitiesSection — Other Orlando Activities Carousel
   Golden Hour Luxury Design
   ============================================================= */
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export default function ActivitiesSection() {
  const { t } = useTranslation();

  const activities = [
    {
      id: 1,
      name: t("medievalTimesDinnerTournament"),
      category: t("dinnerShow"),
      description: t("medievalTimesDescription"),
      price: 67,
      duration: t("twoPointFiveHours"),
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408712/RyzLQxSB3n3EenkWRBno5W/medieval-times-dinner_b0cb3673.jpg",
      emoji: "⚔️",
      ticketUrl: "https://kgstix.com/themeparkstays/dinner-shows/details/293847/medieval-times-dinner-tournament/",
    },
    {
      id: 2,
      name: t("wildFloridaAirboatTours"),
      category: t("natureAdventure"),
      description: t("wildFloridaDescription"),
      price: 45,
      duration: t("oneHour"),
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408712/RyzLQxSB3n3EenkWRBno5W/wild-florida-airboat_6d83e6ef.jpg",
      emoji: "🐊",
      ticketUrl: "https://kgstix.com/themeparkstays/outdoor-adventure/details/293501/wild-florida-gator-park/",
    },
    {
      id: 3,
      name: t("kennedySpaceCenter"),
      category: t("spaceScience"),    description: t("kennedySpaceCenterDescription"),
      price: 75,
      duration: t("fullDay"),
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408712/RyzLQxSB3n3EenkWRBno5W/kennedy-space-center_d38ecf0b.jpg",
      emoji: "🚀",
      ticketUrl: "https://kgstix.com/themeparkstays/outdoor-adventure/details/293490/kennedy-space-center-complex/",
    },
    {
      id: 4,
      name: t("iconPark"),
      category: t("entertainmentComplex"),    description: t("iconParkDescription"),
      price: 35,
      duration: t("twoToFourHours"),
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408712/RyzLQxSB3n3EenkWRBno5W/icon-park_e5c5e36a.webp",
      emoji: "🎉",
      ticketUrl: "https://kgstix.com/themeparkstays/indoor-adventure/details/293597/icon-park/",
    },
    {
      id: 5,
      name: t("dinosaurWorldFlorida"),
      category: t("familyFun"),
      description: t("dinosaurWorldDescription"),
      price: 17,
      duration: t("twoToThreeHours"),
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408712/RyzLQxSB3n3EenkWRBno5W/dinosaur-world_aa62ce3d.jpg",
      emoji: "🦕",
      ticketUrl: "https://www.dinosaurworld.com/florida",
    },
    {
      id: 6,
      name: t("gatorland"),
      category: t("wildlifePark"),
      description: t("gatorlandDescription"),
      price: 30,
      duration: t("threeToFourHours"),
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408712/RyzLQxSB3n3EenkWRBno5W/gatorland_98b699fd.jpg",
      emoji: "🦎",
      ticketUrl: "https://kgstix.com/themeparkstays/outdoor-adventure/details/293314/gatorland/",
    },
    {
      id: 7,
      name: t("funSpotAmerica"),
      category: t("amusementPark"),
      description: t("funSpotAmericaDescription"),    price: 42,
      duration: t("threeToFiveHours"),
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408712/RyzLQxSB3n3EenkWRBno5W/fun-spot-america_fb7c9cd6.jpg",
      emoji: "🎡",
      ticketUrl: "https://kgstix.com/themeparkstays/outdoor-adventure/details/293604/fun-spot-america/",
    },
    {
      id: 8,
      name: t("wonderWorksOrlando"),
      category: t("indoorAdventure"),
      description: t("wonderWorksOrlandoDescription"),
      price: 35,
      duration: t("twoToThreeHours"),
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408694/WLK9HrnjKwqDRXug8CJMYa/wonderworks-orlando_21413ecf.jpg",
      emoji: "🏛️",
      ticketUrl: "https://kgstix.com/themeparkstays/indoor-adventure/details/293331/wonderworks-orlando/",
    },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-up").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 80);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const checkScroll = () => {
    if (carouselRef.current) {
      setCanScrollLeft(carouselRef.current.scrollLeft > 0);
      setCanScrollRight(
        carouselRef.current.scrollLeft <
          carouselRef.current.scrollWidth - carouselRef.current.clientWidth - 10
      );
    }
  };

  const scroll = (dir: "left" | "right") => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
    }
  };

  const handleGetTickets = (name: string) => {
    toast.info(`${t("gettingTicketsFor")}${name}`, {
      description: t("connectYouWithBestPrices"),
    });
  };

  return (
    <section id="activities" ref={sectionRef} className="py-12 md:py-16 linen-bg overflow-hidden">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 fade-up">
          <div>
            <span className="section-label">{t("beyondTheParks")}</span>
            <div className="gold-rule w-16 my-4" />
            <h2 className="display-heading text-3xl md:text-4xl text-[oklch(0.18_0.012_55)]">
              {t("moreOrlando")}<br />
              <span className="italic text-[oklch(0.58_0.16_55)]">{t("adventures")}</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all ${
                canScrollLeft
                  ? "border-[oklch(0.58_0.16_55)] text-[oklch(0.58_0.16_55)] hover:bg-[oklch(0.58_0.16_55)] hover:text-white"
                  : "border-[oklch(0.88_0.02_75)] text-[oklch(0.75_0.02_60)] cursor-not-allowed"
              }`}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all ${
                canScrollRight
                  ? "border-[oklch(0.58_0.16_55)] text-[oklch(0.58_0.16_55)] hover:bg-[oklch(0.58_0.16_55)] hover:text-white"
                  : "border-[oklch(0.88_0.02_75)] text-[oklch(0.75_0.02_60)] cursor-not-allowed"
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={carouselRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {activities.map((activity, i) => (
            <div
              key={activity.id}
              className="fade-up card-hover flex-shrink-0 w-52 md:w-60 bg-white rounded-xl overflow-hidden shadow-md border border-[oklch(0.92_0.015_75)] snap-start group flex flex-col"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={activity.image}
                  alt={activity.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-2 left-2 text-lg">{activity.emoji}</div>
                <div className="absolute bottom-2 left-2">
                  <span className="bg-white/90 text-[oklch(0.58_0.16_55)] text-xs font-bold px-2 py-0.5 rounded-full">
                    {activity.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-3 flex flex-col flex-1">
                <h3
                  className="text-base font-bold text-[oklch(0.18_0.012_55)] mb-1 leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {activity.name}
                </h3>
                <p className="text-[oklch(0.5_0.02_60)] text-xs leading-relaxed mb-3 flex-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {activity.description}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-[oklch(0.92_0.015_75)]">
                  <div>
                    <span className="text-base font-bold text-[oklch(0.18_0.012_55)]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      ${activity.price}
                    </span>
                    <span className="text-xs text-[oklch(0.5_0.02_60)]"> {t("separator")} {activity.duration}</span>
                  </div>
                  {(activity as any).ticketUrl ? (
                    <a
                      href={(activity as any).ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-amber flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold"
                    >
                      {t("getTickets")}
                      <ExternalLink size={11} />
                    </a>
                  ) : (
                    <button
                      onClick={() => handleGetTickets(activity.name)}
                      className="btn-amber flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold"
                    >
                      {t("getTickets")}
                      <ExternalLink size={11} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
