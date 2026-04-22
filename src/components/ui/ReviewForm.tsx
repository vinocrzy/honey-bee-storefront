/**
 * ReviewForm — Submit a product review (authenticated customers only)
 * Clickable star selector, optional title, required body.
 * Stitch "Luminous Alchemist" design system.
 */

'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { submitReview } from '@/services/reviews';
import Link from 'next/link';

interface ReviewFormProps {
  slug: string;
  onReviewSubmitted?: () => void;
}

export function ReviewForm({ slug, onReviewSubmitted }: ReviewFormProps) {
  const { isAuthenticated } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="bg-surface-container rounded-xl p-8 text-center space-y-4">
        <span
          className="material-symbols-outlined text-[#7b5800]/40 block mx-auto"
          style={{ fontSize: '40px', fontVariationSettings: "'wght' 100" }}
        >
          rate_review
        </span>
        <h3 className="font-headline text-xl text-[#1c1c19]">Share Your Experience</h3>
        <p className="text-sm text-on-surface-variant">Sign in to write a review for this product.</p>
        <Link
          href="/login"
          className="honey-glow inline-block text-white font-label font-bold uppercase tracking-widest text-xs px-8 py-3 rounded-xl hover:opacity-90 transition-opacity"
        >
          Sign In
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center space-y-3">
        <span
          className="material-symbols-outlined text-green-600 block mx-auto"
          style={{ fontSize: '40px', fontVariationSettings: "'wght' 300" }}
        >
          check_circle
        </span>
        <h3 className="font-headline text-xl text-[#1c1c19]">Thank You!</h3>
        <p className="text-sm text-on-surface-variant">Your review has been submitted for approval.</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (rating < 1) {
      setError('Please select a star rating.');
      return;
    }
    if (body.trim().length < 20) {
      setError('Review must be at least 20 characters long.');
      return;
    }

    setSubmitting(true);
    try {
      await submitReview(slug, {
        rating,
        title: title.trim() || undefined,
        body: body.trim(),
      });
      setSuccess(true);
      onReviewSubmitted?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const displayRating = hoveredRating || rating;

  return (
    <form onSubmit={handleSubmit} className="bg-surface-container-lowest rounded-xl sunlight-shadow p-7 space-y-6" id="review-form">
      <h3 className="font-headline text-2xl text-[#1c1c19]">Write a Review</h3>

      {/* Star Selector */}
      <div>
        <label className="label-caps text-on-surface-variant mb-3 block">Your Rating *</label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="p-0.5 transition-transform hover:scale-110"
              aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
            >
              <span
                className={`material-symbols-outlined ${
                  star <= displayRating ? 'text-[#d59f2b]' : 'text-outline-variant'
                }`}
                style={{
                  fontSize: '28px',
                  fontVariationSettings: star <= displayRating
                    ? "'FILL' 1, 'wght' 400"
                    : "'FILL' 0, 'wght' 200",
                }}
              >
                star
              </span>
            </button>
          ))}
          {rating > 0 && (
            <span className="text-sm text-on-surface-variant ml-2">
              {rating === 1 ? 'Poor' : rating === 2 ? 'Fair' : rating === 3 ? 'Good' : rating === 4 ? 'Very Good' : 'Excellent'}
            </span>
          )}
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="label-caps text-on-surface-variant mb-2 block">Review Title (Optional)</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
          placeholder="Summarise your experience"
          className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 text-sm text-[#1c1c19] focus:outline-none focus:border-primary transition-colors placeholder:text-on-surface-variant/50"
          disabled={submitting}
        />
      </div>

      {/* Body */}
      <div>
        <label className="label-caps text-on-surface-variant mb-2 block">Your Review *</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={2000}
          rows={4}
          placeholder="Tell others what you loved about this product (min 20 characters)"
          className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 text-sm text-[#1c1c19] focus:outline-none focus:border-primary transition-colors placeholder:text-on-surface-variant/50 resize-none"
          disabled={submitting}
        />
        <p className="text-xs text-on-surface-variant mt-1 text-right">{body.length}/2000</p>
      </div>

      {error && (
        <p className="text-error text-xs flex items-center gap-1">
          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'wght' 300" }}>error</span>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="honey-glow text-white font-label font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {submitting ? 'Submitting…' : 'Submit Review'}
      </button>
    </form>
  );
}
