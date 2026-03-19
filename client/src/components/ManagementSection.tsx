/* =============================================================
   ManagementSection — Property Management for Homeowners
   Golden Hour Luxury Design
   ============================================================= */
import { useEffect, useRef } from "react";
import { TrendingUp, DollarSign, MapPin, Handshake, Star, BarChart3, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const MGMT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663446287426/E83KvqYJ4TGqcmgXCyYT4P/property-mgmt-bg-8zHASx5W8qjwj6V648Mv23.webp";

const benefits = [
  {
    icon: DollarSign,
    title: "Earn More, Pay Less",
    desc: "Our commission rate is significantly lower than the national average — meaning more money stays in your pocket every single month.",
    highlight: "Lower Commission",
  },
  {
    icon: BarChart3,
    title: "Dynamic Pricing",
    desc: "Our AI-powered pricing engine adjusts your rates in real-time based on local events, park calendars, and demand patterns to maximize your revenue.",
    highlight: "Smart Pricing",
  },
  {
    icon: MapPin,
    title: "Locally Owned & Operated",
    desc: "We're Orlando locals — not a faceless corporation. We know the market, the neighborhoods, and what guests truly want from an Orlando vacation.",
    highlight: "Local Expertise",
  },
  {
    icon: Handshake,
    title: "Completely Hands-Off",
    desc: "From guest communication and check-ins to cleaning and maintenance — we handle everything so you can sit back and collect your income.",
    highlight: "Full Service",
  },
  {
    icon: Star,
    title: "5-Star Guest Service",
    desc: "Our concierge team delivers exceptional guest experiences, resulting in glowing 5-star reviews that boost your property's visibility and bookings.",
    highlight: "5-Star Rated",
  },
  {
    icon: TrendingUp,
    title: "Transparent Reporting",
    desc: "Access real-time dashboards showing your occupancy rates, revenue, and guest reviews. No surprises — just clear, honest performance data.",
    highlight: "Full Transparency",
  },
];

const stats = [
  { value: "18%", label: "Avg. Commission Rate", sub: "vs. 25-30% industry average" },
  { value: "87%", label: "Average Occupancy", sub: "across our managed properties" },
  { value: "$4,200", label: "Avg. Monthly Revenue", sub: "per managed property" },
  { value: "4.9★", label: "Owner Satisfaction", sub: "based on owner reviews" },
];

export default function ManagementSection() {
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

  const handleViewPage = () => {
    toast.info("Property Management Page", {
      description: "Our full management services page is coming soon. Call us at (407) 555-0100.",
    });
  };

  return (
    <section id="management" ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${MGMT_BG})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.12_0.01_55)]/95 via-[oklch(0.12_0.01_55)]/85 to-[oklch(0.12_0.01_55)]/60" />

      <div className="relative z-10 container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Content */}
          <div>
            <div className="fade-up mb-12">
              <span className="section-label text-[oklch(0.68_0.15_65)]">For Property Owners</span>
              <div className="gold-rule w-16 my-4" />
              <h2 className="display-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
                Earn More with<br />
                <span className="italic text-[oklch(0.82_0.14_70)]">Orlando's Best</span><br />
                Property Manager
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Are you a homeowner in the Orlando area looking for a better way to manage your vacation rental?
                Theme Park Stays offers a full-service property management solution that earns you more while doing
                less. As a locally owned company, we bring a personal touch that national chains simply can't match.
              </p>
              <button
                onClick={handleViewPage}
                className="btn-amber flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold"
              >
                View Management Services
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Stats */}
            <div className="fade-up grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-5">
                  <div
                    className="text-3xl font-bold text-[oklch(0.82_0.14_70)] mb-1"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-white text-sm font-medium mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {stat.label}
                  </div>
                  <div className="text-white/50 text-xs">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((benefit, i) => (
              <div
                key={benefit.title}
                className="fade-up bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-5 hover:bg-white/15 transition-colors"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-[oklch(0.58_0.16_55)]/30 flex items-center justify-center">
                    <benefit.icon size={16} className="text-[oklch(0.82_0.14_70)]" />
                  </div>
                  <span className="text-[oklch(0.68_0.15_65)] text-xs font-bold uppercase tracking-wider">
                    {benefit.highlight}
                  </span>
                </div>
                <h3
                  className="text-base font-bold text-white mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {benefit.title}
                </h3>
                <p className="text-white/60 text-xs leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
