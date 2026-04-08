import Image from 'next/image';
import Link from 'next/link';

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

const collections = [
  { title: 'The Ritual Collection', subtitle: 'BESTSELLERS', image: '/images/collection-ritual.jpg', href: '/collections/ritual', span: 'col-span-2 row-span-2' },
  { title: 'Botanical Series', subtitle: 'NEW ARRIVALS', image: '/images/collection-botanical.jpg', href: '/collections/botanical', span: 'col-span-1' },
  { title: 'Therapeutic Range', subtitle: 'SENSITIVE SKIN', image: '/images/collection-therapeutic.jpg', href: '/collections/therapeutic', span: 'col-span-1' },
];

const favorites = [
  { name: 'Turmeric Glow Bar', fragrance: 'EARTHY · GOLDEN', price: '18', badge: 'BEST SELLER', image: '/images/product-turmeric.jpg', tags: ['Brightening', 'All Skin'] },
  { name: 'Rose Petal Serenity', fragrance: 'FLORAL · SOFT', price: '22', badge: null, image: '/images/product-rose.jpg', tags: ['Sensitive', 'Hydrating'] },
  { name: 'Neem & Charcoal Detox', fragrance: 'EARTHY · PURIFYING', price: '20', badge: 'LIMITED', image: '/images/product-neem.jpg', tags: ['Oily', 'Clarifying'] },
];

export default function HomePage() {
  return (
    <>
      {/* ── 1. HERO ───────────────────────────────────────────────────────── */}
      <section className="relative min-h-[850px] flex items-center px-6 md:px-20 overflow-hidden bg-[#fcf9f4]">
        {/* Background image (replace with real asset) */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#f0ede8]" />
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
              The Nurse&apos;s Story →
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {collections.map((col) => (
            <Link
              key={col.title}
              href={col.href}
              className={`group relative overflow-hidden rounded-xl bg-[#e5e2dd] min-h-[280px] flex flex-col justify-end p-6 ${col.span}`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c19]/60 via-[#1c1c19]/10 to-transparent" />
              <div className="relative z-10">
                <p className="label-caps text-[11px] text-white/70 mb-1">{col.subtitle}</p>
                <h3 className="font-headline text-2xl text-white tracking-tight group-hover:underline">{col.title}</h3>
              </div>
            </Link>
          ))}
        </div>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((p) => (
            <Link key={p.name} href={`/products/${p.name.toLowerCase().replace(/ /g, '-')}`} className="group">
              <div className="bg-white rounded-xl sunlight-shadow overflow-hidden">
                {/* Product image */}
                <div className="aspect-square bg-[#f0ede8] relative flex items-center justify-center">
                  <span className="material-symbols-outlined text-6xl text-[#d3c5ae]" style={{ fontVariationSettings: "'wght' 100" }}>
                    spa
                  </span>
                  {p.badge && (
                    <span className={`absolute top-4 left-4 label-caps text-[9px] text-white rounded-full px-3 py-1 ${p.badge === 'LIMITED' ? 'bg-[#944925]' : 'honey-glow'}`}>
                      {p.badge}
                    </span>
                  )}
                </div>
                {/* Card body */}
                <div className="p-5">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-headline text-lg text-[#1c1c19] group-hover:text-[#7b5800] transition-colors">{p.name}</h3>
                    <span className="font-body font-semibold text-[#7b5800]">${p.price}</span>
                  </div>
                  <p className="label-caps text-[10px] text-[#4f4634] mb-3">{p.fragrance}</p>
                  <div className="flex gap-2 flex-wrap">
                    {p.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-[#f0ede8] label-caps text-[9px] text-[#4f4634] px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 5. STORY TEASER ───────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-20 bg-[#fcf9f4]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Photo side */}
          <div className="relative aspect-[3/4] bg-[#e0e5cc] rounded-xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-8xl text-[#c4c9b1]" style={{ fontVariationSettings: "'wght' 100" }}>
                person
              </span>
            </div>
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


      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Products
            </h2>
            <p className="text-muted-foreground">
              Check out our handpicked selection of popular items
            </p>
          </div>

          {/* Product Grid - Placeholder */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">Product Image</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">Product {i}</h3>
                  <p className="text-muted-foreground text-sm mb-3">Product description goes here</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">$99.99</span>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products">
              <Button variant="outline" size="lg">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground">
              Find exactly what you're looking for
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Electronics', 'Fashion', 'Home & Garden', 'Sports'].map((category) => (
              <Link
                key={category}
                href={`/categories/${category.toLowerCase().replace(/ /g, '-')}`}
                className="group"
              >
                <div className="border border-border rounded-lg p-8 text-center hover:bg-primary hover:text-white hover:border-primary transition-all">
                  <div className="mb-4 text-4xl">📦</div>
                  <h3 className="font-semibold">{category}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Shopping?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of satisfied customers. Free shipping on orders over $50!
            </p>
            <Link href="/products">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Shop All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
