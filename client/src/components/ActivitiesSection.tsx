/* =============================================================
   ActivitiesSection — Other Orlando Activities Carousel
   Golden Hour Luxury Design
   ============================================================= */
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const activities = [
  {
    id: 1,
    name: "Medieval Times Dinner & Tournament",
    category: "Dinner Show",
    description: "Cheer on your knight while feasting on a four-course meal at this legendary dinner tournament show.",
    price: 67,
    duration: "2.5 hours",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&q=80",
    emoji: "⚔️",
  },
  {
    id: 2,
    name: "Wild Florida Airboat Tours",
    category: "Nature Adventure",
    description: "Glide through the Florida Everglades on a thrilling airboat tour and spot alligators in their natural habitat.",
    price: 45,
    duration: "1 hour",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
    emoji: "🐊",
  },
  {
    id: 3,
    name: "Pirate's Cove Mini Golf",
    category: "Family Fun",
    description: "Navigate 36 holes of adventure golf across two challenging courses with waterfalls, caves, and pirate ships.",
    price: 16,
    duration: "1-2 hours",
    image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=600&q=80",
    emoji: "⛳",
  },
  {
    id: 4,
    name: "Boggy Creek Airboat Adventures",
    category: "Nature Adventure",
    description: "Experience the thrill of Florida's wetlands on a high-speed airboat adventure through pristine nature preserves.",
    price: 35,
    duration: "30 min",
    image: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=600&q=80",
    emoji: "🌿",
  },
  {
    id: 5,
    name: "Discovery Cove",
    category: "Water Park",
    description: "Swim with dolphins, snorkel with tropical fish, and relax on pristine beaches at this all-inclusive tropical paradise.",
    price: 199,
    duration: "Full Day",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
    emoji: "🐬",
  },
  {
    id: 6,
    name: "Gatorland",
    category: "Wildlife Park",
    description: "The Alligator Capital of the World! See thousands of alligators and crocodiles, zip-line over gators, and more.",
    price: 30,
    duration: "3-4 hours",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
    emoji: "🦎",
  },
  {
    id: 7,
    name: "Fun Spot America",
    category: "Amusement Park",
    description: "Orlando's hometown amusement park featuring roller coasters, go-karts, arcade games, and family-friendly rides.",
    price: 42,
    duration: "3-5 hours",
    image: "https://images.unsplash.com/photo-1563299796-17596ed6b017?w=600&q=80",
    emoji: "🎡",
  },
  {
    id: 8,
    name: "Andretti Indoor Karting",
    category: "Racing",
    description: "Race on multi-level indoor go-kart tracks, play laser tag, and enjoy bowling at this premier entertainment complex.",
    price: 55,
    duration: "2-3 hours",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80",
    emoji: "🏎️",
  },
];

export default function ActivitiesSection() {
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
    toast.info(`Getting tickets for ${name}`, {
      description: "We'll connect you with the best available prices.",
    });
  };

  return (
    <section id="activities" ref={sectionRef} className="py-20 md:py-28 linen-bg overflow-hidden">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 fade-up">
          <div>
            <span className="section-label">Beyond the Parks</span>
            <div className="gold-rule w-16 my-4" />
            <h2 className="display-heading text-4xl md:text-5xl text-[oklch(0.18_0.012_55)]">
              More Orlando<br />
              <span className="italic text-[oklch(0.58_0.16_55)]">Adventures</span>
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
              className="fade-up card-hover flex-shrink-0 w-72 md:w-80 bg-white rounded-2xl overflow-hidden shadow-md border border-[oklch(0.92_0.015_75)] snap-start group"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={activity.image}
                  alt={activity.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-3 left-3 text-2xl">{activity.emoji}</div>
                <div className="absolute bottom-3 left-3">
                  <span className="bg-white/90 text-[oklch(0.58_0.16_55)] text-xs font-bold px-2.5 py-1 rounded-full">
                    {activity.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3
                  className="text-lg font-bold text-[oklch(0.18_0.012_55)] mb-2 leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {activity.name}
                </h3>
                <p className="text-[oklch(0.5_0.02_60)] text-xs leading-relaxed mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {activity.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-[oklch(0.92_0.015_75)]">
                  <div>
                    <span className="text-xl font-bold text-[oklch(0.18_0.012_55)]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      ${activity.price}
                    </span>
                    <span className="text-xs text-[oklch(0.5_0.02_60)]"> · {activity.duration}</span>
                  </div>
                  <button
                    onClick={() => handleGetTickets(activity.name)}
                    className="btn-amber flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold"
                  >
                    Get Tickets
                    <ExternalLink size={11} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
