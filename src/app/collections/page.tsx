/**
 * Honey Bee — Collections Index (/collections)
 * Stitch "Luminous Alchemist" — editorial collection gallery
 * Server Component: fetches all active top-level categories from API
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { NursePromiseBand } from '@/components/ui/NursePromiseBand';
import { getCategories } from '@/services/products';
import type { Category } from '@/types';

export const metadata: Metadata = {
  title: 'Collections | Honey Bee Atelier',
  description: 'Explore our curated soap collections — from everyday ritual bars to therapeutic botanicals and Ayurvedic formulas.',
  openGraph: {
    title: 'Collections | Honey Bee Atelier',
    description: 'Curated artisan soap collections from Honey Bee Atelier.',
  },
};

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1600857544200-b2f468e9b2b1?w=800&auto=format&fit=crop';

export default async function CollectionsPage() {
  let categories: Category[] = [];
  let fetchError: string | null = null;

  try {
    const all = await getCategories();
    categories = all.filter((c) => c.is_active && c.parent_id === null);
  } catch {
    fetchError = 'Could not load collections right now. Please try again shortly.';
  }

  return (
    <main className="max-w-[1920px] mx-auto">

      {/* Breadcrumb */}
      <div className="px-6 md:px-20 pt-12">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Collections' }]} />
      </div>

      {/* Page Header */}
      <section className="px-6 md:px-20 pt-8 pb-16">
        <SectionLabel>Artisan Range</SectionLabel>
        <h1 className="font-headline text-6xl md:text-7xl text-[#1c1c19] tracking-tight leading-tight mb-6">
          Our<br />
          <span className="italic font-normal text-[#7b5800]">Collections</span>
        </h1>
        <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed">
          Each collection tells a story — rooted in Ayurvedic tradition, guided by clinical
          knowledge, and crafted with the botanicals that matter most to your skin.
        </p>
      </section>

      {/* Error state */}
      {fetchError && (
        <section className="px-6 md:px-20 py-20 text-center space-y-6">
          <span
            className="material-symbols-outlined text-on-surface-variant mx-auto block"
            style={{ fontSize: '56px', fontVariationSettings: "'wght' 100" }}
          >
            cloud_off
          </span>
          <p className="text-on-surface-variant">{fetchError}</p>
          <Link
            href="/products"
            className="honey-glow inline-block text-white font-label font-bold uppercase tracking-widest text-sm px-10 py-4 rounded-xl shadow-lg shadow-primary/10 hover:opacity-90 transition-opacity"
          >
            Browse All Soaps
          </Link>
        </section>
      )}

      {/* Empty state */}
      {!fetchError && categories.length === 0 && (
        <section className="px-6 md:px-20 py-20 text-center space-y-6">
          <span
            className="material-symbols-outlined text-on-surface-variant mx-auto block"
            style={{ fontSize: '56px', fontVariationSettings: "'wght' 100" }}
          >
            local_florist
          </span>
          <h2 className="font-headline text-3xl text-[#1c1c19]">Collections Coming Soon</h2>
          <p className="text-on-surface-variant max-w-sm mx-auto">
            We're curating our collections. In the meantime, explore everything in our shop.
          </p>
          <Link
            href="/products"
            className="honey-glow inline-block text-white font-label font-bold uppercase tracking-widest text-sm px-10 py-4 rounded-xl shadow-lg shadow-primary/10 hover:opacity-90 transition-opacity"
          >
            Shop All Soaps
          </Link>
        </section>
      )}

      {/* Collections Grid */}
      {!fetchError && categories.length > 0 && (
        <section className="px-6 md:px-20 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/collections/${category.slug}`}
                className="group relative block rounded-xl overflow-hidden sunlight-shadow"
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <Image
                    src={category.image_url ?? FALLBACK_IMAGE}
                    alt={category.name}
                    width={600}
                    height={450}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c19]/65 via-[#1c1c19]/10 to-transparent" />
                </div>

                {/* Text overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  {category.products_count !== undefined && category.products_count > 0 && (
                    <p className="label-caps text-white/60 mb-2">
                      {category.products_count} product{category.products_count !== 1 ? 's' : ''}
                    </p>
                  )}
                  <h2 className="font-headline text-2xl text-white mb-2 leading-tight">
                    {category.name}
                  </h2>
                  {category.description && (
                    <p className="text-sm text-white/75 leading-relaxed line-clamp-2 mb-4">
                      {category.description}
                    </p>
                  )}
                  <span className="label-caps text-white/80 inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-200">
                    Explore Collection
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: '16px', fontVariationSettings: "'wght' 200" }}
                    >
                      arrow_forward
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA band */}
      <NursePromiseBand
        quote="I didn't make soaps to sell — I made them because my own skin needed them. Everything here was formulated for skin that has been through something."
        attribution="Sarah, Founder & ICU Nurse"
      />

      {/* Shop all link */}
      <section className="px-6 md:px-20 py-16 text-center space-y-5">
        <SectionLabel className="text-center">Can't decide?</SectionLabel>
        <h2 className="font-headline text-3xl text-[#1c1c19]">
          Browse the full <span className="italic font-normal text-[#7b5800]">range</span>
        </h2>
        <Link
          href="/products"
          className="honey-glow inline-block text-white font-label font-bold uppercase tracking-widest text-sm px-10 py-4 rounded-xl shadow-lg shadow-primary/10 hover:opacity-90 transition-opacity"
        >
          Shop All Soaps
        </Link>
      </section>

    </main>
  );
}
