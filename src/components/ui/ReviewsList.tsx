/**
 * ReviewsList — Displays review summary + individual reviews for a product
 * Rating distribution bars, verified purchase badges, admin responses.
 * Stitch "Luminous Alchemist" design system.
 */

'use client';

import { RatingStars } from '@/components/ui/RatingStars';
import type { Review, ReviewSummary } from '@/services/reviews';

interface ReviewsListProps {
  reviews: Review[];
  summary: ReviewSummary;
  hasMore: boolean;
  loadingMore: boolean;
  onLoadMore: () => void;
  onWriteReview: () => void;
}

const fmtDate = (iso: string) =>
  new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(iso));

export function ReviewsList({
  reviews,
  summary,
  hasMore,
  loadingMore,
  onLoadMore,
  onWriteReview,
}: ReviewsListProps) {
  const avgRating = summary.avg_rating ?? 0;
  const totalReviews = summary.review_count;
  const distribution = summary.distribution || {};

  return (
    <div className="space-y-10">
      {/* Rating Summary */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
        {/* Overall score */}
        <div className="text-center md:text-left">
          <p className="font-headline text-6xl text-[#1c1c19] leading-none">{avgRating.toFixed(1)}</p>
          <RatingStars rating={avgRating} size="md" />
          <p className="text-sm text-on-surface-variant mt-2">
            Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}
          </p>
          <button
            onClick={onWriteReview}
            className="mt-4 honey-glow text-white font-label font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            Write a Review
          </button>
        </div>

        {/* Distribution bars */}
        <div className="flex-1 w-full space-y-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = distribution[star] ?? 0;
            const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-3 text-sm">
                <span className="w-4 text-right text-on-surface-variant">{star}</span>
                <span
                  className="material-symbols-outlined text-[#d59f2b]"
                  style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                >
                  star
                </span>
                <div className="flex-1 h-2 bg-outline-variant/30 rounded-full overflow-hidden">
                  <div
                    className="h-full honey-glow rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-8 text-xs text-on-surface-variant text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* No reviews */}
      {reviews.length === 0 && (
        <div className="text-center py-12 space-y-3">
          <span
            className="material-symbols-outlined text-on-surface-variant/30 block mx-auto"
            style={{ fontSize: '48px', fontVariationSettings: "'wght' 100" }}
          >
            chat_bubble_outline
          </span>
          <p className="text-on-surface-variant">No reviews yet. Be the first to share your experience!</p>
        </div>
      )}

      {/* Individual reviews */}
      {reviews.length > 0 && (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-surface-container-lowest rounded-xl sunlight-shadow p-6 space-y-3"
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-[#e0e5cc] flex items-center justify-center flex-shrink-0">
                    <span
                      className="material-symbols-outlined text-[#7b5800]"
                      style={{ fontSize: '16px', fontVariationSettings: "'wght' 200" }}
                    >
                      person
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1c1c19]">{review.customer_name}</p>
                    <p className="text-xs text-on-surface-variant">{fmtDate(review.created_at)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {review.is_verified_purchase && (
                    <span className="label-caps bg-[#e0e5cc] text-[#7b5800] px-2.5 py-1 rounded-full flex items-center gap-1">
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: '12px', fontVariationSettings: "'wght' 300" }}
                      >
                        verified
                      </span>
                      Verified Purchase
                    </span>
                  )}
                </div>
              </div>

              {/* Stars + title */}
              <RatingStars rating={review.rating} size="sm" />
              {review.title && (
                <p className="font-semibold text-[#1c1c19]">{review.title}</p>
              )}
              <p className="text-sm text-on-surface-variant leading-relaxed">{review.body}</p>

              {/* Admin response */}
              {review.admin_response && (
                <div className="bg-surface-container rounded-xl p-4 mt-3 border-l-2 border-[#7b5800]">
                  <p className="label-caps text-[#7b5800] mb-1">Response from Honey Bee</p>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{review.admin_response}</p>
                  {review.admin_responded_at && (
                    <p className="text-xs text-on-surface-variant mt-2">{fmtDate(review.admin_responded_at)}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Load more */}
      {hasMore && (
        <div className="text-center">
          <button
            onClick={onLoadMore}
            disabled={loadingMore}
            className="border border-[#7b5800] text-[#7b5800] font-label font-bold uppercase tracking-widest text-xs px-8 py-3 rounded-xl hover:bg-[#7b5800] hover:text-white transition-all disabled:opacity-50"
          >
            {loadingMore ? 'Loading…' : 'Load More Reviews'}
          </button>
        </div>
      )}
    </div>
  );
}
