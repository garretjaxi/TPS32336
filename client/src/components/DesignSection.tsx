/* =============================================================
   DesignSection — Interior Design & Remodeling Services
   Golden Hour Luxury Design
   ============================================================= */
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Sparkles, Home, ArrowRight, CheckCircle } from "lucide-react";
import { useLocation } from "wouter";

const DESIGN_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663446287426/E83KvqYJ4TGqcmgXCyYT4P/design-services-bg-U8bKUjVNMTXkb7M4YMswgH.webp";

export default function DesignSection() {
  const { t } = useTranslation();

  const designStyles = [
    {
      icon: Sparkles,
      title: t("themedTransformations"),
      tagline: t("goAllOutWithATheme"),
      desc: t("themedTransformationsDesc"),
      features: [
        t("customWallMurals"),
        t("themedFurniture"),
        t("immersiveLighting"),
        t("characterInspiredDecor"),
        t("uniquePhotoOpportunities"),
      ],
      color: "from-blue-900/80 to-purple-900/80",
      accentColor: "text-blue-300",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663446287426/E83KvqYJ4TGqcmgXCyYT4P/design-services-bg-U8bKUjVNMTXkb7M4YMswgH.webp",
    },
    {
      icon: Home,
      title: t("elegantLuxuryDesign"),
      tagline: t("sophisticatedTimeless"),
      desc: t("elegantLuxuryDesignDesc"),
      features: [
        t("premiumMaterialSourcing"),
        t("customFurnitureSelection"),
        t("artCurationInstallation"),
        t("lightingAmbianceDesign"),
        t("professionalStagingPhotography"),
      ],
      color: "from-amber-900/80 to-stone-900/80",
      accentColor: "text-amber-300",
      image: "/elegant-luxury-design.jpg",
    },
  ];

  const process = [
    { step: "01", title: t("freeConsultation"), desc: t("freeConsultationDesc") },
    { step: "02", title: t("designProposal"), desc: t("designProposalDesc") },
    { step: "03", title: t("transformation"), desc: t("transformationDesc") },
    { step: "04", title: t("launchList"), desc: t("launchListDesc") }
  ];

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
    navigate("/design-services");
  };

  return (
    <section id="design" ref={sectionRef} className="py-20 md:py-28 bg-gradient-to-r from-[oklch(0.975_0.012_80)] via-[oklch(0.92_0.15_65)] to-[oklch(0.85_0.18_50)] gradient-animated">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16 fade-up">
          <span className="section-label">{t("designServices")}</span>
          <div className="gold-rule w-24 mx-auto my-4" />
          <h2 className="display-heading text-4xl md:text-5xl lg:text-6xl text-[oklch(0.18_0.012_55)] mb-6">
            {t("thinkingAboutARemodel")}<br />
            <span className="italic text-[oklch(0.58_0.16_55)]">{t("remodel")}</span>
          </h2>
          <p className="text-[oklch(0.4_0.02_60)] text-lg max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {t("designDescription")}
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
        <div className="fade-up bg-gradient-to-r from-[oklch(0.18_0.012_55)] to-[oklch(0.22_0.015_50)] rounded-2xl p-8 md:p-12 mb-12">
          <h3
            className="text-2xl md:text-3xl font-bold text-white text-center mb-10"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {t("ourSimple4StepProcess")}
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
            {t("readyToTransform")}
          </p>
          <button
            onClick={handleViewDesign}
            className="btn-amber inline-flex items-center gap-2 px-10 py-4 rounded-full text-base font-semibold"
          >
            {t("viewDesignServices")}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
