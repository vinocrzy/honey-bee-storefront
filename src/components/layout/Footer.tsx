/**
 * Honey Bee — Footer
 * Stitch "Luminous Alchemist" — surface-container background, 4-column layout,
 * newsletter signup, Material Symbols social icons
 */

'use client';

import Link from 'next/link';
import { useState } from 'react';

const shopLinks = [
  { href: '/products', label: 'All Soaps' },
  { href: '/collections', label: 'Collections' },
  { href: '/rituals', label: 'Rituals' },
  { href: '/ingredients', label: 'Ingredients' },
];

const infoLinks = [
  { href: '/our-story', label: 'Our Story' },
  { href: '/process', label: 'The Process' },
  { href: '/journal', label: 'Journal' },
  { href: '/contact', label: 'Contact' },
];

const serviceLinks = [
  { href: '/account', label: 'My Account' },
  { href: '/orders', label: 'Order Tracking' },
  { href: '/shipping', label: 'Shipping' },
  { href: '/returns', label: 'Returns' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-[#f0ede8]">
      {/* Main footer grid */}
      <div className="px-6 md:px-20 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Column 1 — Brand */}
          <div>
            <p className="font-headline text-xl text-[#7b5800] tracking-tight mb-3">Honey Bee</p>
            <p className="font-body text-sm text-[#4f4634] leading-relaxed mb-6">
              Slow-made artisan soaps crafted with Ayurvedic wisdom. Handcrafted in small batches for skin that deserves intention.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-4">
              {['language', 'camera_alt', 'alternate_email'].map((icon) => (
                <button
                  key={icon}
                  aria-label={icon}
                  className="text-[#5c614d] hover:text-[#7b5800] transition-colors"
                >
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'wght' 200" }}>
                    {icon}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Column 2 — Shop */}
          <div>
            <h4 className="label-caps text-[#7b5800] mb-5">Shop</h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-body text-sm text-[#4f4634] hover:text-[#7b5800] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Learn */}
          <div>
            <h4 className="label-caps text-[#7b5800] mb-5">Learn</h4>
            <ul className="space-y-3">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-body text-sm text-[#4f4634] hover:text-[#7b5800] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Newsletter */}
          <div>
            <h4 className="label-caps text-[#7b5800] mb-5">The Ritual Letter</h4>
            <p className="font-body text-sm text-[#4f4634] leading-relaxed mb-5">
              Slow beauty notes, ingredient stories, and new arrivals.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-stretch gap-0"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-transparent border-b border-[#d3c5ae] font-body text-sm text-[#1c1c19] placeholder:text-[#4f4634]/50 py-2 focus:outline-none focus:border-[#7b5800] transition-colors"
              />
              <button
                type="submit"
                className="ml-3 label-caps text-[10px] text-white honey-glow rounded-full px-5 py-2 hover:opacity-90 transition-opacity flex-shrink-0"
              >
                Join
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar — no visible divider, just tonal shift */}
      <div className="bg-[#ebe8e3] px-6 md:px-20 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="font-body text-xs text-[#4f4634]">
          © {currentYear} Honey Bee. All rights reserved. Handcrafted with intention.
        </p>
        <div className="flex gap-6">
          <Link href="/privacy" className="font-body text-xs text-[#4f4634] hover:text-[#7b5800] transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="font-body text-xs text-[#4f4634] hover:text-[#7b5800] transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">
              <StoreName />
            </h3>
            <p className="text-sm text-muted-foreground">
              Your trusted online store for quality products.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-primary transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/account" className="text-muted-foreground hover:text-primary transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-muted-foreground hover:text-primary transition-colors">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-primary transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-primary transition-colors">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: support@store.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Hours: Mon-Fri 9AM-5PM</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>
            © {currentYear} <StoreName />. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
