import { useTranslation } from "react-i18next";
import { ArrowRight, Sparkles, Home, CheckCircle } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

const DESIGN_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663446287426/E83KvqYJ4TGqcmgXCyYT4P/design-services-bg-U8bKUjVNMTXkb7M4YMswgH.webp";

export default function DesignTeaser() {
  const { t } = useTranslation();
  const [, navigate] = useLocation();

  const designStyles = [
    {
      icon: Sparkles,
      title: t("themedTransformations"),
      tagline: t("goAllOutWithATheme"),
      color: "from-blue-900/80 to-purple-900/80",
      accentColor: "text-blue-300",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663446287426/E83KvqYJ4TGqcmgXCyYT4P/design-services-bg-U8bKUjVNMTXkb7M4YMswgH.webp",
    },
    {
      icon: Home,
      title: t("elegantLuxuryDesign"),
      tagline: t("sophisticatedTimeless"),
      color: "from-amber-900/80 to-stone-900/80",
      accentColor: "text-amber-300",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    },
  ];

  return (
    <section id="design" className="py-20 bg-[oklch(0.975_0.012_80)]">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-label">{t("designServices")}</span>
          <div className="gold-rule w-24 mx-auto my-4" />
          <h2 className="display-heading text-4xl md:text-5xl text-[oklch(0.18_0.012_55)] mb-6">
            Thinking About A <span className="italic text-[oklch(0.58_0.16_55)]">Remodel?</span>
          </h2>
          <p className="text-[oklch(0.4_0.02_60)] text-lg max-w-2xl mx-auto mb-10">
            We specialize in creating immersive themed environments and elegant luxury spaces that drive bookings and delight guests.
          </p>
        </div>

        {/* Design style cards - Condensed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {designStyles.map((style, i) => (
            <div
              key={style.title}
              className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-xl group cursor-pointer"
              onClick={() => navigate("/design-services")}
            >
              <img
                src={style.image}
                alt={style.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${style.color}`} />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <style.icon size={14} className="text-white" />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${style.accentColor}`}>
                    {style.tagline}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white font-serif">
                  {style.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            onClick={() => navigate("/design-services")}
            className="rounded-full px-10 py-6 text-lg bg-[oklch(0.18_0.012_55)] text-white hover:bg-[oklch(0.28_0.012_55)]"
          >
            {t("viewDesignServices")} <ArrowRight className="ml-2" size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
}
