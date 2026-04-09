/* =============================================================
   HeroCarousel — Auto-rotating hero with multiple theme park images
   Smooth transitions between Disney, Universal, and SeaWorld
   ============================================================= */
import { Star, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const CAROUSEL_IMAGES = [
  {
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663450455662/9cFYW7E3ZSgdzZcVUYn2yx/carousel-disney-world-V3qdLFMaXSAhmx2CUNjZzu.webp",
    title: "Disney World",
  },
  {
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663450455662/9cFYW7E3ZSgdzZcVUYn2yx/carousel-universal-studios-W7SJJVdLGLoDavsxnxfKhw.webp",
    title: "Universal Studios",
  },
  {
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663450455662/9cFYW7E3ZSgdzZcVUYn2yx/carousel-seaworld-iURz9bUAr2vPkXbYJKtxXP.webp",
    title: "SeaWorld",
  },
];

export default function HeroCarousel() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-rotate carousel
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 6000); // Change image every 6 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
    // Resume auto-play after 8 seconds of inactivity
    setTimeout(() => setIsAutoPlay(true), 8000);
  };

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % CAROUSEL_IMAGES.length);
  };

  const prevSlide = () => {
    goToSlide((currentIndex - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
  };

  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex flex-col items-center justify-end overflow-hidden group">
      {/* Carousel background images with smooth fade transition */}
      {CAROUSEL_IMAGES.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${image.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        />
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/40" />

      {/* Content — bottom-aligned */}
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

      {/* Scroll indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 animate-bounce">
        <span
          className="text-white/80 text-base font-semibold tracking-widest uppercase"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {t("scroll")}
        </span>
        <ChevronDown size={36} className="text-white/80" />
      </div>

      {/* Previous button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Next button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight size={28} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {CAROUSEL_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? "bg-white w-3 h-3"
                : "bg-white/50 hover:bg-white/75 w-2 h-2"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
