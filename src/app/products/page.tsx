/**
 * Honey Bee — Shop Page (/products)
 * Stitch "Luminous Alchemist" — editorial gallery layout
 * Left: FilterSidebar | Right: Product grid
 * Server Component with client filter shell
 */

import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { PageHero } from '@/components/ui/PageHero';
import { ShopClientShell } from './ShopClientShell';

export const metadata: Metadata = {
  title: 'Shop All Soaps | Honey Bee Atelier',
  description: 'Explore our full collection of cold-process artisan soaps. Handcrafted in small batches using organic botanicals and traditional Ayurvedic wisdom.',
  openGraph: {
    title: 'Shop All Soaps | Honey Bee Atelier',
    description: 'Cold-process artisan soaps made with organic botanicals.',
  },
};

// Static product data — replace with API call when backend is wired
const PRODUCTS = [
  {
    id: 1,
    slug: 'wildflower-honey-bar',
    name: 'Wildflower & Honey Bar',
    price: 22,
    imageUrl: 'https://images.unsplash.com/photo-1600857544200-b2f468e9b2b1?w=800&auto=format&fit=crop',
    fragrance: 'Floral · Sweet',
    badge: 'Bestseller' as string | undefined,
    tags: ['Sensitive Skin', 'Cold Process'],
  },
  {
    id: 2,
    slug: 'lavender-oat-cleanse',
    name: 'Lavender & Oat Cleanse',
    price: 19,
    imageUrl: 'https://images.unsplash.com/photo-1607006479523-5d6fff45ddc7?w=800&auto=format&fit=crop',
    fragrance: 'Floral · Herbal',
    badge: undefined as string | undefined,
    tags: ['Dry Skin', 'Sensitive'],
  },
  {
    id: 3,
    slug: 'charcoal-cedar-detox',
    name: 'Charcoal & Cedar Detox',
    price: 24,
    imageUrl: 'https://images.unsplash.com/photo-1601612628452-9e99ced43524?w=800&auto=format&fit=crop',
    fragrance: 'Woody · Earthy',
    badge: 'New' as string | undefined,
    tags: ['Oily Skin', 'Deep Cleanse'],
  },
  {
    id: 4,
    slug: 'rose-geranium-glow',
    name: 'Rose Geranium Glow',
    price: 21,
    imageUrl: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&auto=format&fit=crop',
    fragrance: 'Floral · Citrus',
    badge: undefined as string | undefined,
    tags: ['Normal Skin', 'Brightening'],
  },
  {
    id: 5,
    slug: 'turmeric-neem-clarity',
    name: 'Turmeric & Neem Clarity',
    price: 23,
    imageUrl: 'https://images.unsplash.com/photo-1578897367670-5f5a4e7fd03f?w=800&auto=format&fit=crop',
    fragrance: 'Earthy · Herbal',
    badge: undefined as string | undefined,
    tags: ['Oily Skin', 'Ayurvedic'],
  },
  {
    id: 6,
    slug: 'shea-vanilla-dream',
    name: 'Shea & Vanilla Dream',
    price: 20,
    imageUrl: 'https://images.unsplash.com/photo-1600857544200-b2f468e9b2b1?w=800&auto=format&fit=crop',
    fragrance: 'Sweet · Warm',
    badge: undefined as string | undefined,
    tags: ['Dry Skin', 'Moisturising'],
  },
  {
    id: 7,
    slug: 'peppermint-eucalyptus-revival',
    name: 'Peppermint Revival',
    price: 21,
    imageUrl: 'https://images.unsplash.com/photo-1607006479523-5d6fff45ddc7?w=800&auto=format&fit=crop',
    fragrance: 'Citrus · Herbal',
    badge: undefined as string | undefined,
    tags: ['All Skin Types', 'Energising'],
  },
  {
    id: 8,
    slug: 'honey-oat-nourish',
    name: 'Honey Oat Nourish',
    price: 18,
    imageUrl: 'https://images.unsplash.com/photo-1601612628452-9e99ced43524?w=800&auto=format&fit=crop',
    fragrance: 'Sweet · Milky',
    badge: undefined as string | undefined,
    tags: ['Sensitive Skin', 'Baby-Safe'],
  },
];

export default function ShopPage() {

  return (
    <main className="max-w-[1920px] mx-auto px-6 md:px-20 py-12">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Shop All' }]} />

      {/* Page Hero */}
      <PageHero
        title="The Soap"
        titleItalic="Gallery"
        description="Every bar is a slow meditation — cold-pressed, six-week cured, and infused with botanical intention."
      />

      {/* Main layout: sidebar + grid (now with API integration) */}
      <Suspense fallback={
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mt-12">
          <div className="lg:col-span-1">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-surface-container rounded" />
              <div className="h-32 bg-surface-container rounded" />
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-surface-container rounded-xl mb-4" />
                  <div className="h-4 bg-surface-container rounded w-3/4 mb-2" />
                  <div className="h-4 bg-surface-container rounded w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      }>
        <ShopClientShell />
      </Suspense>
    </main>
  );
}
