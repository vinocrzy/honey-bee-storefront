'use client';

/**
 * Global Error Boundary — src/app/error.tsx
 *
 * Next.js App Router built-in error boundary.
 * Catches unhandled errors from any route segment and prevents a full white screen.
 * Styled with the Stitch "Luminous Alchemist" design system.
 *
 * Props injected automatically by Next.js:
 *   error  — the thrown Error (includes digest for server errors)
 *   reset  — call to re-render the segment (retry)
 */

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log to external error tracker here (e.g. Sentry) once integrated
    // For now, keep console.error only in this one intentional place
    console.error('[GlobalError]', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-8">

        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto">
          <span
            className="material-symbols-outlined text-red-500"
            style={{ fontSize: '36px', fontVariationSettings: "'wght' 200" }}
          >
            error_outline
          </span>
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <p className="label-caps text-on-surface-variant tracking-widest">
            Something went wrong
          </p>
          <h1 className="font-headline text-4xl text-[#1c1c19] leading-tight">
            An Unexpected{' '}
            <span className="italic font-normal text-[#7b5800]">Error</span>
          </h1>
          <p className="text-sm text-on-surface-variant">
            {error.message
              ? error.message
              : 'An unexpected error occurred. Please try again or return to the shop.'}
          </p>
          {error.digest && (
            <p className="text-xs text-on-surface-variant/60 font-mono">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="honey-glow text-white font-label font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl shadow-lg shadow-primary/10 hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-[#d8d0c4] text-[#1c1c19] font-label font-semibold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:bg-surface-container transition-colors"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: '16px', fontVariationSettings: "'wght' 300" }}
            >
              home
            </span>
            Back to Home
          </Link>
        </div>

        {/* Quick links */}
        <div className="flex justify-center gap-6 pt-2">
          <Link href="/products" className="text-xs text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest font-label">
            Shop
          </Link>
          <Link href="/contact" className="text-xs text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest font-label">
            Contact Us
          </Link>
        </div>

      </div>
    </div>
  );
}
