/**
 * Honey Bee — Navigation Header
 * Botanical-glass frosted sticky nav with Stitch "Luminous Alchemist" styling
 * Layout: Brand mark (left) | Nav links (centre) | Icons (right)
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useWishlist } from '@/contexts/WishlistContext';

const navLinks = [
  { href: '/products', label: 'Shop' },
  { href: '/collections', label: 'Collections' },
  { href: '/our-story', label: 'Our Story' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { wishlistCount } = useWishlist();

  return (
    <header className="botanical-glass sticky top-0 z-50 w-full">
      {/* Main nav row */}
      <div className="flex justify-between items-center px-6 md:px-20 py-5">
        {/* Brand mark */}
        <Link
          href="/"
          className="font-headline text-2xl text-[#7b5800] tracking-tight hover:opacity-80 transition-opacity flex-shrink-0"
        >
          Honey Bee
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`label-caps text-[#4f4634] hover:text-[#7b5800] transition-colors pb-0.5 ${
                pathname === link.href
                  ? 'border-b border-[#7b5800] text-[#7b5800]'
                  : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions — search, account, cart, mobile menu */}
        <div className="flex items-center gap-5">
          {/* Search icon */}
          <Link
            href="/search"
            aria-label="Search products"
            className="hidden md:block text-[#4f4634] hover:text-[#7b5800] transition-colors"
          >
            <span className="material-symbols-outlined" aria-hidden="true" style={{ fontVariationSettings: "'wght' 200" }}>
              search
            </span>
          </Link>

          {/* Account - conditional based on auth state */}
          {!authLoading && (
            <Link
              href={isAuthenticated ? '/account' : '/login'}
              aria-label={isAuthenticated ? 'My Account' : 'Login to your account'}
              className="hidden md:block text-[#4f4634] hover:text-[#7b5800] transition-colors"
              title={isAuthenticated ? 'My Account' : 'Login'}
            >
              <span className="material-symbols-outlined" aria-hidden="true" style={{ fontVariationSettings: "'wght' 200" }}>
                {isAuthenticated ? 'person' : 'login'}
              </span>
            </Link>
          )}

          {/* Wishlist */}
          {!authLoading && isAuthenticated && (
            <Link
              href="/account?tab=wishlist"
              aria-label="Wishlist"
              className="hidden md:block text-[#4f4634] hover:text-[#7b5800] transition-colors relative"
            >
              <span className="material-symbols-outlined" aria-hidden="true" style={{ fontVariationSettings: "'wght' 200" }}>
                favorite
              </span>
              {wishlistCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 honey-glow text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-label"
                  aria-hidden="true"
                >
                  {wishlistCount}
                </span>
              )}
            </Link>
          )}

          {/* Cart */}
          <Link
            href="/cart"
            aria-label={`Shopping cart with${itemCount > 0 ? ` ${itemCount} item${itemCount > 1 ? 's' : ''}` : ' 0 items'}`}
            className="relative text-[#4f4634] hover:text-[#7b5800] transition-colors"
          >
            <span className="material-symbols-outlined" aria-hidden="true" style={{ fontVariationSettings: "'wght' 200" }}>
              shopping_bag
            </span>
            {itemCount > 0 && (
              <span 
                className="absolute -top-1.5 -right-1.5 honey-glow text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-label"
                aria-hidden="true"
              >
                {itemCount}
              </span>
            )}
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#4f4634] hover:text-[#7b5800] transition-colors"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'wght' 200" }}>
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile overlay menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#fcf9f4] px-6 pb-8">
          <ul className="space-y-0">
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-[#d3c5ae]/40 last:border-0">
                <Link
                  href={link.href}
                  className="block py-4 label-caps text-[#4f4634] hover:text-[#7b5800] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {!authLoading && (
              <li className="border-b border-[#d3c5ae]/40">
                <Link
                  href={isAuthenticated ? '/account' : '/login'}
                  className="block py-4 label-caps text-[#4f4634] hover:text-[#7b5800] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {isAuthenticated ? 'ACCOUNT' : 'LOGIN'}
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
