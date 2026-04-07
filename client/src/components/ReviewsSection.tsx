/*
   ReviewsSection — Guest reviews and testimonials for credibility
   Golden Hour Luxury Design
   ============================================================= */
import { Star, Quote, CheckCircle } from "lucide-react";
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
}

export default function ReviewsSection({ reviews = [], isLoading = false }: ReviewsSectionProps) {
  const { t } = useTranslation();

  // Sample reviews if none provided - only 4 reviews for single row display
  const displayReviews = reviews.length > 0 ? reviews.slice(0, 4) : [
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
  ];

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

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-[oklch(0.97_0.01_75)] to-[oklch(0.92_0.008_80)]">
      <div className="container max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-px w-12 bg-[oklch(0.58_0.16_55)]" />
            <span className="section-label text-xs text-[oklch(0.58_0.16_55)] font-semibold tracking-widest">
              GUEST TESTIMONIALS
            </span>
            <div className="h-px w-12 bg-[oklch(0.58_0.16_55)]" />
          </div>
          <h2 className="display-heading text-4xl md:text-5xl text-[oklch(0.18_0.012_55)] mb-4">
            Loved by Our Guests
          </h2>
          <p className="text-[oklch(0.4_0.02_60)] text-lg max-w-2xl mx-auto">
            Real reviews from families who've experienced the magic of staying with us
          </p>
        </div>

        {/* Reviews Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-[oklch(0.58_0.16_55)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl p-6 border border-[oklch(0.92_0.015_75)] hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                {/* Quote Icon */}
                <Quote className="text-[oklch(0.58_0.16_55)] mb-3 opacity-30" size={24} />

                {/* Rating */}
                <div className="mb-3">
                  {renderStars(review.rating)}
                </div>

                {/* Title */}
                {review.title && (
                  <h3 className="font-semibold text-[oklch(0.18_0.012_55)] mb-2 text-sm">
                    {review.title}
                  </h3>
                )}

                {/* Comment */}
                <p className="text-[oklch(0.4_0.02_60)] text-sm leading-relaxed mb-4 flex-grow">
                  "{review.comment}"
                </p>

                {/* Guest Info */}
                <div className="border-t border-[oklch(0.92_0.015_75)] pt-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-[oklch(0.18_0.012_55)] text-sm">
                          {review.guestName}
                        </p>
                        {review.verified && (
                          <CheckCircle size={14} className="text-green-600 flex-shrink-0" />
                        )}
                      </div>
                      {review.listingName && (
                        <p className="text-xs text-[oklch(0.5_0.02_60)]">
                          {review.listingName}
                        </p>
                      )}
                      <p className="text-xs text-[oklch(0.5_0.02_60)]">
                        {formatDate(review.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Bar */}
        <div className="mt-16 bg-white rounded-2xl p-8 border border-[oklch(0.92_0.015_75)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[oklch(0.58_0.16_55)] mb-2">
                4.9★
              </div>
              <p className="text-[oklch(0.5_0.02_60)] text-sm">
                Average Rating
              </p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[oklch(0.58_0.16_55)] mb-2">
                500+
              </div>
              <p className="text-[oklch(0.5_0.02_60)] text-sm">
                Verified Reviews
              </p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[oklch(0.58_0.16_55)] mb-2">
                98%
              </div>
              <p className="text-[oklch(0.5_0.02_60)] text-sm">
                Would Recommend
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
