/* =============================================================
   TestimonialsSection — Guest Reviews
   Golden Hour Luxury Design
   ============================================================= */
import { useEffect, useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah & Mike Thompson",
    location: "Chicago, IL",
    property: "The Magic Kingdom Villa",
    rating: 5,
    text: "Absolutely incredible experience! The house was stunning, the pool was perfect, and we were at Disney's gates in 8 minutes. The team helped us plan our entire park itinerary. We're already planning our return trip!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
    date: "March 2025",
  },
  {
    id: 2,
    name: "The Rodriguez Family",
    location: "Houston, TX",
    property: "Universal Adventure Estate",
    rating: 5,
    text: "This was our 3rd time staying with Theme Park Stays and it gets better every visit. The game room kept the kids entertained on our rest day, and the team got us discounted Universal tickets. Highly recommend!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    date: "February 2025",
  },
  {
    id: 3,
    name: "Jennifer Walsh",
    location: "New York, NY",
    property: "The Castle Suite",
    rating: 5,
    text: "Booked the Castle Suite for my daughter's birthday and she was absolutely blown away. The themed decor was magical, the location was perfect, and the booking process was so much easier than Airbnb. Will definitely be back!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
    date: "January 2025",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-up").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-white">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-14 fade-up">
          <span className="section-label">Guest Reviews</span>
          <div className="gold-rule w-24 mx-auto my-4" />
          <h2 className="display-heading text-4xl md:text-5xl text-[oklch(0.18_0.012_55)]">
            What Our Guests<br />
            <span className="italic text-[oklch(0.58_0.16_55)]">Are Saying</span>
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className="fade-up bg-[oklch(0.975_0.012_80)] rounded-2xl p-7 border border-[oklch(0.92_0.015_75)] relative"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 text-[oklch(0.88_0.025_70)]">
                <Quote size={32} />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={14} className="text-[oklch(0.68_0.15_65)] fill-[oklch(0.68_0.15_65)]" />
                ))}
              </div>

              {/* Review text */}
              <p
                className="text-[oklch(0.3_0.015_55)] leading-relaxed mb-6 text-sm"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                "{t.text}"
              </p>

              {/* Property badge */}
              <div className="text-xs text-[oklch(0.58_0.16_55)] font-medium mb-4 bg-[oklch(0.93_0.025_75)] inline-block px-3 py-1 rounded-full">
                {t.property}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-[oklch(0.92_0.015_75)]">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-[oklch(0.18_0.012_55)] text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {t.name}
                  </div>
                  <div className="text-[oklch(0.5_0.02_60)] text-xs">{t.location} · {t.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
