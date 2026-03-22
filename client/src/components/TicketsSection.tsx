/* =============================================================
   TicketsSection — Theme Park Ticket Purchasing
   Golden Hour Luxury Design
   Features all 4 major Orlando theme parks
   ============================================================= */
import { useEffect, useRef } from "react";
import { ExternalLink, Clock, Star, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const TICKETS_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663446287426/E83KvqYJ4TGqcmgXCyYT4P/tickets-bg-cZ9GU8ES2FkQycLnPUAxK9.webp";

const parks = [
  {
    id: "disney",
    name: "Walt Disney World",
    tagline: "The Most Magical Place on Earth",
    description: "Experience the magic of Cinderella Castle, thrilling rides, beloved characters, and unforgettable fireworks at the world's most iconic theme park resort.",
    highlights: ["Magic Kingdom", "EPCOT", "Hollywood Studios", "Animal Kingdom"],
    startingPrice: 109,
    hours: "9AM – 10PM",
    rating: 4.9,
    color: "from-blue-900 to-blue-700",
    accentColor: "#1a56db",
    emoji: "🏰",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/disney-world_4c070b8d.jpg",
    ticketUrl: "https://kgstix.com/themeparkstays/walt-disney-world/",
  },
  {
    id: "universal",
    name: "Universal Studios",
    tagline: "Ride the Movies",
    description: "Step into your favorite films and TV shows at Universal Studios and Islands of Adventure, home to The Wizarding World of Harry Potter and Epic Universe.",
    highlights: ["Wizarding World", "Islands of Adventure", "Epic Universe", "Volcano Bay"],
    startingPrice: 109,
    hours: "9AM – 9PM",
    rating: 4.8,
    color: "from-yellow-800 to-yellow-600",
    accentColor: "#b45309",
    emoji: "🎬",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/universal-studios_53dbe40a.webp",
    ticketUrl: "https://kgstix.com/themeparkstays/universal-orlando/",
  },
  {
    id: "seaworld",
    name: "SeaWorld Orlando",
    tagline: "Where Wonder Lives",
    description: "Encounter incredible marine life, soar on world-class roller coasters, and experience the thrill of Mako — one of Florida's tallest, fastest coasters.",
    highlights: ["Mako Coaster", "Dolphin Shows", "Manta Ray", "Antarctica"],
    startingPrice: 89,
    hours: "10AM – 9PM",
    rating: 4.7,
    color: "from-teal-900 to-teal-600",
    accentColor: "#0d9488",
    emoji: "🌊",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/seaworld_2fc5c31a.webp",
    ticketUrl: "https://kgstix.com/themeparkstays/seaworld-busch-gardens-aquatica-adventure-island-tickets/",
  },
  {
    id: "legoland",
    name: "LEGOLAND Florida",
    tagline: "Built for Kids. Loved by Families.",
    description: "A world built entirely of LEGO bricks! Perfect for families with children ages 2–12, featuring over 50 rides, shows, and interactive attractions.",
    highlights: ["LEGO City", "Ninjago World", "Water Park", "LEGO Movie World"],
    startingPrice: 79,
    hours: "10AM – 5PM",
    rating: 4.6,
    color: "from-red-800 to-red-600",
    accentColor: "#dc2626",
    emoji: "🧱",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/legoland_e6e6fc7e.jpg",
    ticketUrl: "https://kgstix.com/themeparkstays/legoland/",
  },
];

export default function TicketsSection() {
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

  const handleBuyTickets = (parkName: string) => {
    toast.info(`Redirecting to ${parkName} tickets...`, {
      description: "You'll be taken to our ticket partner for the best prices.",
    });
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
          <span className="section-label text-[oklch(0.68_0.15_65)]">Theme Park Tickets</span>
          <div className="gold-rule w-24 mx-auto my-4" />
          <h2 className="display-heading text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            Your Adventure<br />
            <span className="italic text-[oklch(0.82_0.14_70)]">Starts Here</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Purchase discounted theme park tickets directly through us and save time and money.
            We've partnered with all four major Orlando parks to bring you the best prices.
          </p>
        </div>

        {/* Park cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {parks.map((park, i) => (
            <div
              key={park.id}
              className="fade-up card-hover bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden group"
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
              <div className="p-5">
                <h3
                  className="text-xl font-bold text-white mb-1 leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {park.name}
                </h3>
                <p className="text-[oklch(0.68_0.15_65)] text-xs font-medium mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
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
                <div className="pt-4 border-t border-white/15">
                  <div className="text-white/60 text-xs mb-1">Starting from</div>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-2xl font-bold text-white"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      ${park.startingPrice}
                      <span className="text-sm font-normal text-white/50"> /person</span>
                    </span>
                  </div>
                  <button
                    onClick={() => handleBuyTickets(park.name)}
                    className="btn-amber w-full mt-3 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    Buy Tickets
                    <ExternalLink size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="text-center mt-10 fade-up">
          <p className="text-white/50 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
            All ticket purchases include our concierge planning service. We'll help you plan your perfect park day.
          </p>
        </div>
      </div>
    </section>
  );
}
