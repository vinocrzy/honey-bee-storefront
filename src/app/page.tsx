import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedProducts, getCategories } from '@/services/products';
import type { Product, Category } from '@/types';

/* ─────────────────────────────────────────────────────────────────────────────
 * Honey Bee — Homepage
 * Stitch "Luminous Alchemist" layout
 * Sections: Hero → Features → Collections → Favorites → Story Teaser → Dark CTA Band
 * ───────────────────────────────────────────────────────────────────────────── */

const features = [
  { icon: 'eco', label: 'Cold Process', caption: 'Traditional method that preserves every nutrient' },
  { icon: 'spa', label: 'Ayurvedic', caption: 'Rooted in 5,000 years of botanical wisdom' },
  { icon: 'science', label: 'Small Batch', caption: 'Never mass-produced. Every bar is intentional' },
  { icon: 'verified', label: 'Skin-Safe', caption: 'No synthetic fragrance. No harsh surfactants' },
];

export default async function HomePage() {
  // Fetch real data from API
  let favorites: Product[] = [];
  let collections: Category[] = [];
  let fetchError: string | null = null;

  try {
    // Fetch featured products (top 3)
    favorites = await getFeaturedProducts(3);
    
    // Fetch categories (top 3 for collections)
    const allCategories = await getCategories();
    collections = allCategories.slice(0, 3);
  } catch (error) {
    console.error('Failed to fetch homepage data:', error);
    fetchError = 'Failed to load products. Please try again later.';
  }
  return (
    <>
      {/* ── 1. HERO ───────────────────────────────────────────────────────── */}
      <section className="relative min-h-[850px] flex items-center px-6 md:px-20 overflow-hidden bg-[#fcf9f4]">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-main.webp"
            alt="Artisan handcrafted natural soap bars"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl py-24">
          <p className="label-caps text-[#4f4634] mb-5">Handcrafted Intention</p>
          <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl text-[#1c1c19] tracking-tight leading-none mb-6">
            Slow-Made<br />
            <span className="italic text-[#7b5800]">Artisan</span>{' '}
            Soaps
          </h1>
          <p className="font-body text-base text-[#4f4634] leading-relaxed max-w-md mb-10">
            Each bar is cold-processed in small batches using traditional Ayurvedic wisdom and ethically-sourced botanicals.
          </p>
          <div className="flex items-center gap-6 flex-wrap">
            <Link
              href="/products"
              className="honey-glow text-white label-caps text-[11px] rounded-xl px-8 py-4 hover:opacity-90 transition-opacity inline-block"
            >
              Explore the Shop
            </Link>
            <Link
              href="/our-story"
              className="label-caps text-[11px] text-[#7b5800] underline hover:no-underline transition-all"
            >
              Priyaanga&apos;s Story →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. FEATURES ROW ───────────────────────────────────────────────── */}
      <section className="bg-[#f0ede8] py-14 px-6 md:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((f) => (
            <div key={f.label} className="flex flex-col items-start gap-2">
              <span className="material-symbols-outlined text-[#5c614d] text-3xl" style={{ fontVariationSettings: "'wght' 200" }}>
                {f.icon}
              </span>
              <p className="font-headline text-base text-[#1c1c19]">{f.label}</p>
              <p className="font-body text-xs text-[#4f4634] leading-relaxed">{f.caption}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. COLLECTIONS EDITORIAL GRID ─────────────────────────────────── */}
      <section className="py-20 px-6 md:px-20 bg-[#fcf9f4]">
        <div className="mb-10">
          <p className="label-caps text-[#4f4634] mb-2">Our Heritage</p>
          <h2 className="font-headline text-4xl text-[#1c1c19] tracking-tight">The Collections</h2>
        </div>
        
        {fetchError && collections.length === 0 ? (
          <div className="text-center py-12 text-[#4f4634]">
            <p>{fetchError}</p>
          </div>
        ) : collections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {collections.map((col, index) => (
              <Link
                key={col.id}
                href={`/products?category=${col.slug}`}
                className={`group relative overflow-hidden rounded-xl bg-[#e5e2dd] min-h-[280px] flex flex-col justify-end p-6 ${
                  index === 0 ? 'col-span-2 row-span-2' : 'col-span-1'
                }`}
              >
                {col.image_url && (
                  <Image
                    src={col.image_url}
                    alt={col.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c19]/60 via-[#1c1c19]/10 to-transparent" />
                <div className="relative z-10">
                  <p className="label-caps text-[11px] text-white/70 mb-1">
                    {index === 0 ? 'BESTSELLERS' : index === 1 ? 'NEW ARRIVALS' : 'FEATURED'}
                  </p>
                  <h3 className="font-headline text-2xl text-white tracking-tight group-hover:underline">{col.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        ) :null}
      </section>

      {/* ── 4. CURRENT FAVORITES ──────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-20 bg-[#f6f3ee]">
        <div className="flex justify-between items-end mb-10 flex-wrap gap-4">
          <div>
            <p className="label-caps text-[#4f4634] mb-2">Handpicked for You</p>
            <h2 className="font-headline text-4xl text-[#1c1c19] tracking-tight">Current Favourites</h2>
          </div>
          <Link href="/products" className="label-caps text-[11px] text-[#7b5800] underline hover:no-underline">
            View All
          </Link>
        </div>

        {fetchError && favorites.length === 0 ? (
          <div className="text-center py-12 text-[#4f4634]">
            <p>{fetchError}</p>
            <Link href="/products" className="honey-glow inline-block text-white label-caps text-[11px] rounded-xl px-8 py-4 mt-6 hover:opacity-90 transition-opacity">
              Browse All Products
            </Link>
          </div>
        ) : favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favorites.map((p) => (
              <Link key={p.id} href={`/products/${p.slug}`} className="group">
                <div className="bg-white rounded-xl sunlight-shadow overflow-hidden">
                  {/* Product image */}
                  <div className="aspect-square bg-[#f0ede8] relative overflow-hidden">
                    <Image
                      src={p.primary_image?.url || p.images?.[0]?.url || '/images/placeholder-product.webp'}
                      alt={p.primary_image?.alt_text || p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {p.is_featured && (
                      <span className="absolute top-4 left-4 label-caps text-[9px] text-white rounded-full px-3 py-1 honey-glow">
                        BEST SELLER
                      </span>
                    )}
                  </div>
                  {/* Card body */}
                  <div className="p-5">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-headline text-lg text-[#1c1c19] group-hover:text-[#7b5800] transition-colors">{p.name}</h3>
                      <span className="font-body font-semibold text-[#7b5800]">${Number(p.price).toFixed(2)}</span>
                    </div>
                    {p.short_description && (
                      <p className="label-caps text-[10px] text-[#4f4634] mb-3 line-clamp-1">{p.short_description}</p>
                    )}
                    {p.categories && p.categories.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {p.categories.slice(0, 2).map((cat) => (
                          <span key={cat.id} className="rounded-full bg-[#f0ede8] label-caps text-[9px] text-[#4f4634] px-3 py-1">
                            {cat.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </section>

      {/* ── 5. STORY TEASER ───────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-20 bg-[#fcf9f4]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Photo side */}
          <div className="relative aspect-[3/4] bg-[#e0e5cc] rounded-xl overflow-hidden">
            <Image
              src="/images/founder.webp"
              alt="Honey Bee founder, Registered Nurse and artisan soap maker"
              fill
              className="object-cover object-top"
            />
            {/* Floating pull-quote card */}
            <div className="absolute bottom-8 right-[-24px] bg-white rounded-xl sunlight-shadow p-6 max-w-[220px]">
              <p className="font-headline text-sm italic text-[#1c1c19] leading-relaxed">
                &ldquo;Every bar is a letter to your skin.&rdquo;
              </p>
              <p className="label-caps text-[9px] text-[#4f4634] mt-2">— Founder, RN</p>
            </div>
          </div>

          {/* Text side */}
          <div className="max-w-lg">
            <p className="label-caps text-[#4f4634] mb-4">The Origin</p>
            <h2 className="font-headline text-4xl md:text-5xl text-[#1c1c19] tracking-tight leading-tight mb-6">
              A nurse who chose<br />
              <span className="italic text-[#7b5800]">slower</span> care
            </h2>
            <p className="font-body text-base text-[#4f4634] leading-relaxed mb-4">
              After years in clinical care, our founder saw a pattern: skin stripped by harsh products and healed with even harsher ones. Honey Bee began as a kitchen experiment — one nurse&apos;s attempt to craft something that nourished rather than depleted.
            </p>
            <p className="font-body text-base text-[#4f4634] leading-relaxed mb-8">
              Today, every formulation is guided by the same clinical precision and the same Ayurvedic respect for whole ingredients.
            </p>
            <Link
              href="/our-story"
              className="label-caps text-[11px] text-[#7b5800] underline hover:no-underline transition-all"
            >
              Read the full story →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. DARK CTA BAND ──────────────────────────────────────────────── */}
      <section className="bg-[#7b5800] py-20 px-6 md:px-20 text-center">
        <p className="label-caps text-white/60 text-[10px] mb-5">The Nurse&apos;s Promise</p>
        <blockquote className="font-headline text-2xl md:text-3xl italic text-white max-w-3xl mx-auto leading-relaxed mb-8">
          &ldquo;I will never put a single ingredient on your skin that I wouldn&apos;t put on a patient under my care.&rdquo;
        </blockquote>
        <cite className="label-caps text-[10px] text-white/70 not-italic mb-10 block">
          — Founder, Registered Nurse
        </cite>
        <Link
          href="/products"
          className="inline-block bg-white text-[#7b5800] label-caps text-[11px] rounded-xl px-10 py-4 hover:bg-[#fcf9f4] transition-colors"
        >
          Experience the Alchemy
        </Link>
      </section>
    </>
  );
}
