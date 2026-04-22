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
