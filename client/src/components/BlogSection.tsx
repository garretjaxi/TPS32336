/* =============================================================
   BlogSection — Blog Posts Carousel
   Golden Hour Luxury Design
   ============================================================= */
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Clock, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const posts = [
  {
    id: 1,
    title: "The Ultimate Guide to Disney World in 2025",
    excerpt: "Everything you need to know about planning the perfect Disney World vacation — from Lightning Lane strategies to the best character dining experiences.",
    category: "Disney World",
    readTime: "8 min read",
    date: "Mar 10, 2025",
    image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=600&q=80",
    emoji: "🏰",
    color: "bg-blue-600",
  },
  {
    id: 2,
    title: "Universal's Epic Universe: What to Expect",
    excerpt: "Universal's newest park is opening in 2025. Here's your complete guide to the five new worlds, must-do rides, and how to plan your visit.",
    category: "Universal Studios",
    readTime: "6 min read",
    date: "Feb 28, 2025",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80",
    emoji: "🎬",
    color: "bg-yellow-600",
  },
  {
    id: 3,
    title: "Best Orlando Vacation Rentals vs. Hotels: The Real Cost",
    excerpt: "We break down the true cost comparison between vacation homes and hotel stays in Orlando — and why families consistently save more with a rental.",
    category: "Travel Tips",
    readTime: "5 min read",
    date: "Feb 15, 2025",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    emoji: "🏠",
    color: "bg-amber-600",
  },
  {
    id: 4,
    title: "SeaWorld Orlando: Hidden Gems You Can't Miss",
    excerpt: "Beyond the roller coasters and dolphin shows, SeaWorld has incredible experiences most visitors never discover. Here are our top hidden gems.",
    category: "SeaWorld",
    readTime: "4 min read",
    date: "Jan 30, 2025",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
    emoji: "🌊",
    color: "bg-teal-600",
  },
  {
    id: 5,
    title: "LEGOLAND Florida: The Perfect Family Day Trip",
    excerpt: "Is LEGOLAND worth it? We give you the honest truth about what to expect, the best rides for different ages, and how to make the most of your visit.",
    category: "LEGOLAND",
    readTime: "5 min read",
    date: "Jan 18, 2025",
    image: "https://images.unsplash.com/photo-1563299796-17596ed6b017?w=600&q=80",
    emoji: "🧱",
    color: "bg-red-600",
  },
  {
    id: 6,
    title: "10 Orlando Restaurants That Locals Actually Love",
    excerpt: "Skip the tourist traps. These are the Orlando restaurants that locals keep to themselves — from hidden Cuban gems to farm-to-table masterpieces.",
    category: "Food & Dining",
    readTime: "6 min read",
    date: "Jan 5, 2025",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
    emoji: "🍽️",
    color: "bg-orange-600",
  },
  {
    id: 7,
    title: "How to Pack for an Orlando Theme Park Trip",
    excerpt: "The definitive packing list for an Orlando theme park vacation — what to bring, what to leave home, and the gear that will save your trip.",
    category: "Travel Tips",
    readTime: "7 min read",
    date: "Dec 20, 2024",
    image: "https://images.unsplash.com/photo-1581553673739-c4906b5d0de8?w=600&q=80",
    emoji: "🎒",
    color: "bg-green-600",
  },
];

export default function BlogSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-up").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 80);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const checkScroll = () => {
    if (carouselRef.current) {
      setCanScrollLeft(carouselRef.current.scrollLeft > 0);
      setCanScrollRight(
        carouselRef.current.scrollLeft <
          carouselRef.current.scrollWidth - carouselRef.current.clientWidth - 10
      );
    }
  };

  const scroll = (dir: "left" | "right") => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
    }
  };

  const handleReadMore = (title: string) => {
    toast.info("Blog coming soon!", {
      description: `"${title}" will be available on our blog shortly.`,
    });
  };

  return (
    <section id="blog" ref={sectionRef} className="py-20 md:py-28 bg-[oklch(0.18_0.012_55)] overflow-hidden">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 fade-up">
          <div>
            <span className="section-label text-[oklch(0.68_0.15_65)]">From the Blog</span>
            <div className="gold-rule w-16 my-4" />
            <h2 className="display-heading text-4xl md:text-5xl text-white">
              Orlando Travel<br />
              <span className="italic text-[oklch(0.82_0.14_70)]">Guides & Tips</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all ${
                canScrollLeft
                  ? "border-[oklch(0.68_0.15_65)] text-[oklch(0.68_0.15_65)] hover:bg-[oklch(0.68_0.15_65)] hover:text-white"
                  : "border-white/20 text-white/30 cursor-not-allowed"
              }`}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all ${
                canScrollRight
                  ? "border-[oklch(0.68_0.15_65)] text-[oklch(0.68_0.15_65)] hover:bg-[oklch(0.68_0.15_65)] hover:text-white"
                  : "border-white/20 text-white/30 cursor-not-allowed"
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={carouselRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {posts.map((post, i) => (
            <div
              key={post.id}
              className="fade-up card-hover flex-shrink-0 w-72 md:w-80 bg-[oklch(0.24_0.01_55)] rounded-2xl overflow-hidden border border-white/10 snap-start group"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className={`${post.color} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-3 text-white/40 text-xs mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  <span>{post.date}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {post.readTime}
                  </span>
                </div>
                <h3
                  className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-[oklch(0.82_0.14_70)] transition-colors"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {post.title}
                </h3>
                <p className="text-white/50 text-xs leading-relaxed mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {post.excerpt}
                </p>
                <button
                  onClick={() => handleReadMore(post.title)}
                  className="flex items-center gap-1.5 text-[oklch(0.68_0.15_65)] text-sm font-semibold hover:gap-2.5 transition-all"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Read More
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
