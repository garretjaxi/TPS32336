/* =============================================================
   AboutSection — Company intro with stats and park proximity
   Golden Hour Luxury Design
   ============================================================= */
import { useEffect, useRef } from "react";
import { MapPin, Clock, Shield, Heart } from "lucide-react";

const COLLAGE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663446287426/E83KvqYJ4TGqcmgXCyYT4P/hero-collage-5z4Huj4gy42cR322ox5qH9.webp";

const stats = [
  { value: "15+", label: "Premium Properties" },
  { value: "200+", label: "Happy Families" },
  { value: "5★", label: "Average Rating" },
  { value: "24/7", label: "Guest Support" },
];

const features = [
  {
    icon: MapPin,
    title: "Minutes from the Parks",
    desc: "All our properties are strategically located within 10–20 minutes of Disney World, Universal Studios, LEGOLAND, and SeaWorld.",
  },
  {
    icon: Clock,
    title: "Flexible Check-In",
    desc: "We offer flexible check-in and check-out times to accommodate your travel schedule and park plans.",
  },
  {
    icon: Shield,
    title: "Book Direct & Save",
    desc: "Skip the Airbnb fees. Booking directly with us saves you up to 15% and gives you direct access to our concierge team.",
  },
  {
    icon: Heart,
    title: "Locally Owned & Operated",
    desc: "We're Orlando locals who know the area inside and out. Our personal touch makes every stay exceptional.",
  },
];

export default function AboutSection() {
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 linen-bg">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16 fade-up">
          <span className="section-label">Welcome to Theme Park Stays</span>
          <div className="gold-rule w-24 mx-auto my-4" />
          <h2
            className="display-heading text-4xl md:text-5xl lg:text-6xl text-[oklch(0.18_0.012_55)] mt-4 mb-6"
          >
            Orlando's Premier<br />
            <span className="italic text-[oklch(0.58_0.16_55)]">Vacation Rental</span> Experience
          </h2>
          <p className="text-[oklch(0.4_0.02_60)] text-lg max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Nestled in the heart of the theme park capital of the world, Theme Park Stays offers handpicked
            luxury vacation homes and resort suites in Orlando, Florida. Whether you're planning a magical
            Disney adventure, exploring the wizarding world at Universal, discovering ocean wonders at SeaWorld,
            or building memories at LEGOLAND — we put you right in the middle of it all.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Image */}
          <div className="fade-up relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src={COLLAGE_IMG}
                alt="Family enjoying Orlando theme parks and vacation rental"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-4 md:-right-8 bg-[oklch(0.58_0.16_55)] text-white rounded-2xl px-6 py-4 shadow-xl">
              <div className="text-3xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>200+</div>
              <div className="text-xs uppercase tracking-wider opacity-90">Happy Families</div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <div key={f.title} className="fade-up" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-sm border border-[oklch(0.92_0.015_75)] hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-[oklch(0.93_0.025_75)] flex items-center justify-center flex-shrink-0">
                    <f.icon size={18} className="text-[oklch(0.58_0.16_55)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[oklch(0.18_0.012_55)] mb-1 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {f.title}
                    </h3>
                    <p className="text-[oklch(0.5_0.02_60)] text-xs leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div className="fade-up grid grid-cols-2 md:grid-cols-4 gap-6 bg-[oklch(0.18_0.012_55)] rounded-2xl p-8 md:p-10">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-4xl md:text-5xl font-bold text-[oklch(0.82_0.14_70)] mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {stat.value}
              </div>
              <div className="text-white/70 text-sm uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
