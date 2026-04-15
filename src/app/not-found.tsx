/**
 * Honey Bee — 404 Not Found Page
 * Custom error page for broken links
 * Stitch "Luminous Alchemist" design system
 */

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="bg-[#fcf9f4] min-h-screen flex items-center justify-center py-20">
      <div className="px-6 text-center max-w-2xl">
        
        {/* Icon */}
        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-[#f0ede8] flex items-center justify-center">
          <span
            className="material-symbols-outlined text-[#7b5800] text-6xl"
            style={{ fontVariationSettings: "'wght' 200" }}
          >
            search_off
          </span>
        </div>

        {/* Error Code */}
        <h1 className="font-headline text-6xl md:text-7xl text-[#1c1c19] mb-4">404</h1>

        {/* Message */}
        <h2 className="font-headline text-2xl md:text-3xl text-[#5c614d] mb-6">
          Page Not Found
        </h2>
        <p className="text-[#5c614d] leading-relaxed mb-10 max-w-md mx-auto text-lg">
          We couldn't find the page you're looking for. It may have been moved or no longer exists.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="honey-glow text-white font-label tracking-wider rounded-xl px-8 py-4 inline-block hover:opacity-90 transition-opacity"
          >
            BACK TO HOME
          </Link>
          <Link
            href="/products"
            className="text-[#1c1c19] border border-[#e0e5cc] rounded-xl px-8 py-4 font-label tracking-wider hover:bg-[#f0ede8] transition-colors inline-block"
          >
            EXPLORE SHOP
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-16 pt-8 border-t border-[#e0e5cc]">
          <p className="label-caps text-[#5c614d] mb-4">NEED HELP?</p>
          <div className="flex justify-center gap-6">
            <Link
              href="/contact"
              className="text-[#7b5800] hover:underline underline-offset-4 text-sm"
            >
              Contact Us
            </Link>
            <Link
              href="/our-story"
              className="text-[#7b5800] hover:underline underline-offset-4 text-sm"
            >
              Our Story
            </Link>
            <Link
              href="/account"
              className="text-[#7b5800] hover:underline underline-offset-4 text-sm"
            >
              My Account
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
