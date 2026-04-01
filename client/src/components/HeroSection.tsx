/* =============================================================
   HeroSection — Golden Hour Luxury Design
   Full-bleed hero with parallax overlay and park badges
   ============================================================= */
import { Star, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450455662/9cFYW7E3ZSgdzZcVUYn2yx/Gemini_Generated_Image_s2tuyws2tuyws2tu_a135c3ba.webp";

export default function HeroSection() {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex flex-col items-center justify-end overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${HERO_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/40" />

      {/* Content — bottom-aligned, with enough bottom padding to clear the scroll indicator */}
      <div className="relative z-10 container flex flex-col items-center text-center pt-0 pb-24 md:pb-28">

        {/* Main heading */}
        <h1
          className="text-white text-[2.5rem] md:text-[3.675rem] lg:text-[4.2rem] font-bold leading-[1.05] mb-6 max-w-5xl"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {t("heroTitlePart1")}{" "}
          <span
            className="block italic font-extrabold text-[3.675rem] md:text-[4.725rem] lg:text-[9.25rem] leading-none drop-shadow-[0_4px_24px_rgba(255,200,60,0.55)]"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#FFD700",
              WebkitTextStroke: "1px rgba(255,160,0,0.6)",
            }}
          >
            {t("heroTitlePart2")}
          </span>
        </h1>

        <p className="text-white/85 text-lg md:text-xl max-w-2xl mb-4 leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
          {t("heroSubtitle")}
        </p>

        {/* Star rating + trust line */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="text-[oklch(0.82_0.14_70)] fill-[oklch(0.82_0.14_70)]" />
              ))}
            </div>
            <span className="text-white text-base font-semibold" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {t("fiveStarRated")} · {t("happyFamilies")}
            </span>
          </div>
          <span className="text-white/65 text-sm tracking-wide" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {t("noBookingFees")} · {t("instantConfirmation")} · {t("cancelAnytime")}
          </span>
        </div>
      </div>

      {/* Scroll indicator — absolutely positioned at the very bottom, below the content padding */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 animate-bounce">
        <span
          className="text-white/80 text-base font-semibold tracking-widest uppercase"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {t("scroll")}
        </span>
        <ChevronDown size={36} className="text-white/80" />
      </div>
    </section>
  );
}
