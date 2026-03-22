/* =============================================================
   AboutSection — Four Corners / Kissimmee Location Section
   Golden Hour Luxury Design
   ============================================================= */
import { useEffect, useRef } from "react";
import { MapPin, Car } from "lucide-react";

const COLLAGE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663446287426/E83KvqYJ4TGqcmgXCyYT4P/hero-collage-5z4Huj4gy42cR322ox5qH9.webp";

const distances = [
  { place: "Walt Disney World", detail: "15 minutes" },
  { place: "Universal Studios", detail: "25 minutes" },
  { place: "LEGOLAND Florida", detail: "35 minutes" },
  { place: "SeaWorld Orlando", detail: "30 minutes" },
  { place: "Orlando International Airport", detail: "35 minutes" },
  { place: "Orlando Premium Outlets", detail: "15 minutes" },
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
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="fade-up relative order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src={COLLAGE_IMG}
                alt="Four Corners area near Disney World Orlando"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-4 md:-right-8 bg-[oklch(0.58_0.16_55)] text-white rounded-2xl px-6 py-4 shadow-xl">
              <div className="text-3xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>98%</div>
              <div className="text-xs uppercase tracking-wider opacity-90">5-Star Reviews</div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="fade-up mb-8">
              <span className="section-label">Four Corners / Kissimmee</span>
              <div className="gold-rule w-24 my-4" />
              <h2
                className="display-heading text-4xl md:text-5xl text-[oklch(0.18_0.012_55)] mb-5"
              >
                Your Basecamp<br />
                <span className="italic text-[oklch(0.58_0.16_55)]">for Magic.</span>
              </h2>
              <p className="text-[oklch(0.4_0.02_60)] text-base leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Located in the heart of Kissimmee, our homes are designed for families who refuse to choose between luxury and fun. The Four Corners area puts you seconds from Disney — some of the closest non-resort accommodation to the parks.
              </p>
            </div>

            {/* Distance list */}
            <div className="fade-up grid grid-cols-1 sm:grid-cols-2 gap-3">
              {distances.map((d, i) => (
                <div
                  key={d.place}
                  className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-[oklch(0.92_0.015_75)] hover:shadow-md transition-shadow"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="w-8 h-8 rounded-full bg-[oklch(0.93_0.025_75)] flex items-center justify-center flex-shrink-0">
                    <Car size={14} className="text-[oklch(0.58_0.16_55)]" />
                  </div>
                  <div>
                    <div className="text-[oklch(0.18_0.012_55)] text-sm font-semibold leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {d.place}
                    </div>
                    <div className="text-[oklch(0.58_0.16_55)] text-xs font-medium">{d.detail}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[oklch(0.55_0.015_60)] text-xs italic leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
              * Travel times are approximate and will vary depending on the time of year, local events, and traffic conditions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
