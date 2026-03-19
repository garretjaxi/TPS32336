/* =============================================================
   HomesSection — Vacation Home Listings
   Golden Hour Luxury Design
   ============================================================= */
import { useEffect, useRef } from "react";
import { Bed, Bath, Users, Waves, Gamepad2, PawPrint, Star, ExternalLink } from "lucide-react";

const homes = [
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
    tags: ["pool", "gameroom"],
    badges: ["Pool", "Game Room"],
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
    airbnbUrl: "https://houfy.com/h/thepoweruppad",
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
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663446287426/E83KvqYJ4TGqcmgXCyYT4P/Gemini_Generated_Image_pfw289pfw289pfw2_d2f76e1b.webp",
    airbnbUrl: "https://www.houfy.com/330128",
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
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
    airbnbUrl: "https://www.houfy.com/330121",
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
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    airbnbUrl: "https://www.houfy.com/330115",
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
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    airbnbUrl: "https://www.houfy.com/330133",
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
    tags: ["pool"],
    badges: ["Nearby Lakes", "Fenced Yard"],
    image: "https://images.unsplash.com/photo-1512535541113-14be7a253e1d?w=800&q=80",
    airbnbUrl: "https://www.houfy.com/330116",
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
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    airbnbUrl: "https://www.houfy.com/330117",
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
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    airbnbUrl: "https://www.houfy.com/330118",
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
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    airbnbUrl: "https://www.houfy.com/330119",
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
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    airbnbUrl: "https://www.houfy.com/330120",
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
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    airbnbUrl: "https://www.houfy.com/330121",
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
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    airbnbUrl: "https://www.houfy.com/330122",
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
    image: "https://images.unsplash.com/photo-1512535541113-14be7a253e1d?w=800&q=80",
    airbnbUrl: "https://www.houfy.com/330123",
    featured: false,
  },
];

const tagIcons: Record<string, React.ReactNode> = {
  pool: <Waves size={12} />,
  gameroom: <Gamepad2 size={12} />,
  pets: <PawPrint size={12} />,
  resort: <Star size={12} />,
};

interface HomesSectionProps {
  activeFilter: string;
}

export default function HomesSection({ activeFilter }: HomesSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-up").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filtered = activeFilter === "all"
    ? homes
    : homes.filter((h) => h.tags.includes(activeFilter));

  return (
    <section id="homes" ref={sectionRef} className="py-20 md:py-28 bg-[oklch(0.975_0.012_80)]">
      <div className="container">
        {/* Header */}
        <div className="mb-14 fade-up">
          <span className="section-label">Vacation Homes</span>
          <div className="gold-rule w-16 my-4" />
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="display-heading text-4xl md:text-5xl text-[oklch(0.18_0.012_55)]">
              Luxury Homes<br />
              <span className="italic text-[oklch(0.58_0.16_55)]">Built for Families</span>
            </h2>
            <p className="text-[oklch(0.5_0.02_60)] max-w-md leading-relaxed text-sm md:text-base" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Spacious, fully-equipped vacation homes with private pools, game rooms, and themed bedrooms — all minutes from Orlando's world-famous theme parks.
            </p>
          </div>
        </div>

        {/* Property grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-[oklch(0.5_0.02_60)]">
            <p className="text-lg">No homes match this filter. Try a different category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((home, i) => (
              <div
                key={home.id}
                className="fade-up card-hover bg-white rounded-2xl overflow-hidden shadow-md border border-[oklch(0.92_0.015_75)] group"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={home.image}
                    alt={home.name}
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
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="text-xs text-[oklch(0.58_0.16_55)] font-medium mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
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
                    <span className="flex items-center gap-1.5"><Bed size={14} />{home.beds} Beds</span>
                    <span className="flex items-center gap-1.5"><Bath size={14} />{home.baths} Baths</span>
                    <span className="flex items-center gap-1.5"><Users size={14} />Up to {home.guests}</span>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {home.badges.map((badge) => (
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
                  <div className="flex items-center justify-between pt-4 border-t border-[oklch(0.92_0.015_75)]">
                    <div>
                      <span
                        className="text-2xl font-bold text-[oklch(0.18_0.012_55)]"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        ${home.price}
                      </span>
                      <span className="text-sm text-[oklch(0.5_0.02_60)]"> / night</span>
                    </div>
                    <a
                      href={home.airbnbUrl}
                      className="btn-amber flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold"
                    >
                      Book Now
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
