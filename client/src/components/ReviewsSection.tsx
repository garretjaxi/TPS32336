/*
   ReviewsSection — Interactive carousel of guest reviews with auto-rotation
   Golden Hour Luxury Design
   ============================================================= */
import { useState, useEffect } from "react";
import { Star, Quote, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Review {
  id: number;
  guestName: string;
  rating: number;
  title?: string;
  comment: string;
  verified?: boolean;
  createdAt: string;
  listingName?: string;
}

interface ReviewsSectionProps {
  reviews?: Review[];
  isLoading?: boolean;
  autoRotateInterval?: number;
}

export default function ReviewsSection({ 
  reviews = [], 
  isLoading = false,
  autoRotateInterval = 6000 
}: ReviewsSectionProps) {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  // Sample reviews if none provided
  const allReviews = reviews.length > 0 ? reviews : [
    {
      id: 1,
      guestName: "Sarah M.",
      rating: 5,
      title: "Perfect Family Getaway",
      comment: "The Power-Up Pad was absolutely perfect for our family vacation! The kids loved the game room, and the pool was amazing. We'll definitely be back!",
      verified: true,
      createdAt: "2026-03-15",
      listingName: "The Power-Up Pad",
    },
    {
      id: 2,
      guestName: "James T.",
      rating: 5,
      title: "Exceeded All Expectations",
      comment: "Stayed at The Castle Keep for our anniversary. The attention to detail, cleanliness, and amenities were outstanding. The theater room was a highlight!",
      verified: true,
      createdAt: "2026-03-10",
      listingName: "The Castle Keep",
    },
    {
      id: 3,
      guestName: "Emily R.",
      rating: 5,
      title: "Best Theme Park Vacation Ever",
      comment: "The location is unbeatable - 15 minutes from Disney! The house was spacious, clean, and had everything we needed. Much better than staying at a hotel.",
      verified: true,
      createdAt: "2026-03-05",
      listingName: "Disney Adventure Estate",
    },
    {
      id: 4,
      guestName: "Michael D.",
      rating: 5,
      title: "Incredible Value",
      comment: "For the price, this is an incredible value. We had 3 families staying together and everyone had their own space. Highly recommend!",
      verified: true,
      createdAt: "2026-02-28",
      listingName: "The Spacious Retreat",
    },
    {
      id: 5,
      guestName: "Jessica L.",
      rating: 5,
      title: "Luxury Without the Hotel Price Tag",
      comment: "This property felt like a luxury resort but at a fraction of the cost. The amenities were top-notch and the owner was very responsive.",
      verified: true,
      createdAt: "2026-02-20",
      listingName: "The Disney Retreat",
    },
    {
      id: 6,
      guestName: "David K.",
      rating: 5,
      title: "Home Away from Home",
      comment: "We've stayed at many vacation rentals, and this is by far the best. Everything was perfect from check-in to check-out.",
      verified: true,
      createdAt: "2026-02-15",
      listingName: "Modern Winter Garden Getaway",
    },
  ];

  // Auto-rotate carousel
  useEffect(() => {
    if (!isAutoRotating || allReviews.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allReviews.length);
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [isAutoRotating, allReviews.length, autoRotateInterval]);

  // Get 4 reviews starting from current index
  const getDisplayedReviews = () => {
    const displayed = [];
    for (let i = 0; i < 4; i++) {
      displayed.push(allReviews[(currentIndex + i) % allReviews.length]);
    }
    return displayed;
  };

  const displayedReviews = getDisplayedReviews();

  const handlePrevious = () => {
    setIsAutoRotating(false);
    setCurrentIndex((prev) => (prev - 1 + allReviews.length) % allReviews.length);
  };

  const handleNext = () => {
    setIsAutoRotating(false);
    setCurrentIndex((prev) => (prev + 1) % allReviews.length);
  };

  const handleDotClick = (index: number) => {
    setIsAutoRotating(false);
    setCurrentIndex(index);
  };

  // Resume auto-rotation after 8 seconds of inactivity
  useEffect(() => {
    if (isAutoRotating) return;

    const timeout = setTimeout(() => {
      setIsAutoRotating(true);
    }, 8000);

    return () => clearTimeout(timeout);
  }, [isAutoRotating]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? "fill-[oklch(0.58_0.16_55)] text-[oklch(0.58_0.16_55)]" : "text-[oklch(0.92_0.015_75)]"}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const ReviewCard = ({ review }: { review: Review }) => (
    <div className="bg-white rounded-lg p-3 border border-[oklch(0.92_0.015_75)] hover:shadow-md transition-all duration-300 flex flex-col">
      {/* Quote Icon */}
      <Quote className="text-[oklch(0.58_0.16_55)] mb-1.5 opacity-30" size={16} />

      {/* Rating */}
      <div className="mb-1.5">
        {renderStars(review.rating)}
      </div>

      {/* Title */}
      {review.title && (
        <h3 className="font-semibold text-[oklch(0.18_0.012_55)] mb-1 text-xs line-clamp-2">
          {review.title}
        </h3>
      )}

      {/* Comment */}
      <p className="text-[oklch(0.4_0.02_60)] text-xs leading-snug mb-2 flex-grow line-clamp-3">
        "{review.comment}"
      </p>

      {/* Guest Info */}
      <div className="border-t border-[oklch(0.92_0.015_75)] pt-1.5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-1 mb-0.5">
              <p className="font-semibold text-[oklch(0.18_0.012_55)] text-xs">
                {review.guestName}
              </p>
              {review.verified && (
                <CheckCircle size={11} className="text-green-600 flex-shrink-0" />
              )}
            </div>
            {review.listingName && (
              <p className="text-xs text-[oklch(0.5_0.02_60)] line-clamp-1">
                {review.listingName}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-8 md:py-10 bg-gradient-to-b from-[oklch(0.97_0.01_75)] to-[oklch(0.92_0.008_80)]">
      <div className="container max-w-7xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="display-heading text-2xl md:text-3xl text-[oklch(0.18_0.012_55)] mb-2">
            Loved by Our Guests
          </h2>
          <p className="text-[oklch(0.4_0.02_60)] text-sm max-w-2xl mx-auto">
            Real reviews from families who've experienced the magic
          </p>
        </div>

        {/* Carousel Container */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-[oklch(0.58_0.16_55)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="relative">
            {/* Desktop: Grid Layout with 4 columns */}
            <div className="hidden lg:grid grid-cols-4 gap-4 mb-4">
              {displayedReviews.map((review, idx) => (
                <div
                  key={`${review.id}-${currentIndex}-${idx}`}
                  className="animate-fadeIn"
                >
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>

            {/* Mobile: Horizontal Scrollable Container */}
            <div className="lg:hidden overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              <div className="flex gap-3 min-w-min">
                {allReviews.map((review) => (
                  <div
                    key={`${review.id}-mobile`}
                    className="flex-shrink-0 w-72"
                  >
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Controls - Desktop Only */}
            {allReviews.length > 4 && (
              <div className="hidden lg:flex items-center justify-between mt-3">
                {/* Previous Button */}
                <button
                  onClick={handlePrevious}
                  className="p-1.5 rounded-full bg-white border border-[oklch(0.92_0.015_75)] hover:bg-[oklch(0.58_0.16_55)] hover:text-white hover:border-[oklch(0.58_0.16_55)] transition-all duration-300 flex items-center justify-center"
                  aria-label="Previous reviews"
                >
                  <ChevronLeft size={16} />
                </button>

                {/* Dot Indicators */}
                <div className="flex gap-1.5">
                  {allReviews.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleDotClick(idx)}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentIndex
                          ? "bg-[oklch(0.58_0.16_55)] w-6"
                          : "bg-[oklch(0.92_0.015_75)] hover:bg-[oklch(0.75_0.01_75)]"
                      }`}
                      aria-label={`Go to review ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  className="p-1.5 rounded-full bg-white border border-[oklch(0.92_0.015_75)] hover:bg-[oklch(0.58_0.16_55)] hover:text-white hover:border-[oklch(0.58_0.16_55)] transition-all duration-300 flex items-center justify-center"
                  aria-label="Next reviews"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Stats Bar */}
        <div className="mt-4 bg-white rounded-lg p-3 border border-[oklch(0.92_0.015_75)]">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-xl font-bold text-[oklch(0.58_0.16_55)] mb-0.5">
                4.9★
              </div>
              <p className="text-[oklch(0.5_0.02_60)] text-xs">
                Avg Rating
              </p>
            </div>
            <div>
              <div className="text-xl font-bold text-[oklch(0.58_0.16_55)] mb-0.5">
                500+
              </div>
              <p className="text-[oklch(0.5_0.02_60)] text-xs">
                Reviews
              </p>
            </div>
            <div>
              <div className="text-xl font-bold text-[oklch(0.58_0.16_55)] mb-0.5">
                98%
              </div>
              <p className="text-[oklch(0.5_0.02_60)] text-xs">
                Recommend
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
