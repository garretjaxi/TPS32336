/* =============================================================
   DesignSection — Interior Design & Remodeling Services
   Golden Hour Luxury Design
   ============================================================= */
import { useEffect, useRef } from "react";
import { Sparkles, Home, ArrowRight, CheckCircle } from "lucide-react";
import { useLocation } from "wouter";

const DESIGN_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663446287426/E83KvqYJ4TGqcmgXCyYT4P/design-services-bg-U8bKUjVNMTXkb7M4YMswgH.webp";

const designStyles = [
  {
    icon: Sparkles,
    title: "Themed Transformations",
    tagline: "Go All Out with a Theme",
    desc: "Transform your property into an immersive themed experience — Disney magic, Harry Potter wizardry, Star Wars adventure, or any world your guests can dream of. Our design team creates jaw-dropping, Instagram-worthy spaces that command premium nightly rates.",
    features: [
      "Custom wall murals & 3D installations",
      "Themed furniture & bedding",
      "Immersive lighting design",
      "Character-inspired decor",
      "Unique photo opportunities",
    ],
    color: "from-blue-900/80 to-purple-900/80",
    accentColor: "text-blue-300",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663446287426/E83KvqYJ4TGqcmgXCyYT4P/design-services-bg-U8bKUjVNMTXkb7M4YMswgH.webp",
  },
  {
    icon: Home,
    title: "Elegant Luxury Design",
    tagline: "Sophisticated & Timeless",
    desc: "Prefer a more refined, upscale aesthetic? Our luxury design service creates sophisticated spaces with premium materials, curated art, and timeless elegance that appeals to discerning travelers seeking a high-end resort experience.",
    features: [
      "Premium material sourcing",
      "Custom furniture selection",
      "Art curation & installation",
      "Lighting & ambiance design",
      "Professional staging & photography",
    ],
    color: "from-amber-900/80 to-stone-900/80",
    accentColor: "text-amber-300",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80",
  },
];

const process = [
  { step: "01", title: "Free Consultation", desc: "We visit your property and discuss your vision, budget, and goals." },
  { step: "02", title: "Design Proposal", desc: "Our team creates a detailed design plan with mood boards and cost estimates." },
  { step: "03", title: "Transformation", desc: "Our skilled contractors and designers bring the vision to life." },
  { step: "04", title: "Launch & List", desc: "Professional photography and listing optimization to maximize bookings." },
];

export default function DesignSection() {
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

  const [, navigate] = useLocation();

  const handleViewDesign = () => {
    navigate("/design");
  };

  return (
    <section id="design" ref={sectionRef} className="py-20 md:py-28 bg-[oklch(0.975_0.012_80)]">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16 fade-up">
          <span className="section-label">Design Services</span>
          <div className="gold-rule w-24 mx-auto my-4" />
          <h2 className="display-heading text-4xl md:text-5xl lg:text-6xl text-[oklch(0.18_0.012_55)] mb-6">
            Thinking About a<br />
            <span className="italic text-[oklch(0.58_0.16_55)]">Remodel?</span>
          </h2>
          <p className="text-[oklch(0.4_0.02_60)] text-lg max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Whether you want to go all out with an immersive theme or create a sleek, elegant retreat —
            our in-house design team specializes in vacation rental transformations that dramatically
            increase your property's appeal and nightly rates.
          </p>
        </div>

        {/* Design style cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {designStyles.map((style, i) => (
            <div
              key={style.title}
              className="fade-up card-hover rounded-2xl overflow-hidden shadow-xl group"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Image with overlay */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={style.image}
                  alt={style.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${style.color}`} />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <style.icon size={18} className="text-white" />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-widest ${style.accentColor}`}>
                      {style.tagline}
                    </span>
                  </div>
                  <h3
                    className="text-2xl md:text-3xl font-bold text-white mb-3"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {style.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {style.desc}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="bg-[oklch(0.18_0.012_55)] p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {style.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-[oklch(0.68_0.15_65)] flex-shrink-0" />
                      <span className="text-white/70 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="fade-up bg-[oklch(0.18_0.012_55)] rounded-2xl p-8 md:p-12 mb-12">
          <h3
            className="text-2xl md:text-3xl font-bold text-white text-center mb-10"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Our Simple 4-Step Process
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, i) => (
              <div key={step.step} className="text-center">
                <div
                  className="text-5xl font-bold text-[oklch(0.58_0.16_55)]/40 mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {step.step}
                </div>
                <h4 className="text-white font-semibold mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {step.title}
                </h4>
                <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="fade-up text-center">
          <p className="text-[oklch(0.4_0.02_60)] mb-6 text-lg" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Ready to transform your property and maximize your rental income?
          </p>
          <button
            onClick={handleViewDesign}
            className="btn-amber inline-flex items-center gap-2 px-10 py-4 rounded-full text-base font-semibold"
          >
            View Design Services
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
