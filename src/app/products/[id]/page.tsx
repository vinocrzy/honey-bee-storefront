/**
 * Honey Bee — Product Detail Page (/products/[slug])
 * Stitch "Luminous Alchemist" — 12-col editorial gallery layout
 * Left: image gallery mosaic | Right: sticky product info + CTA
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { AddToCartButton } from '@/components/ui/AddToCartButton';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import { NursePromiseBand } from '@/components/ui/NursePromiseBand';
import { IngredientCard } from '@/components/ui/IngredientCard';
import { TestimonialCard } from '@/components/ui/TestimonialCard';
import { ProductCard } from '@/components/ui/ProductCard';
import { SectionLabel } from '@/components/ui/SectionLabel';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

interface Ingredient { name: string; description: string; icon: string; }
interface Attribute  { icon: string; label: string; }
interface Testimonial { quote: string; author: string; location?: string; rating: number; }
interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  collection: string;
  description: string;
  benefits: string[];
  attributes: Attribute[];
  ingredients: Ingredient[];
  testimonials: Testimonial[];
  images: string[];
}

// Static product data — replace with API fetch when backend is wired
const PRODUCTS: Record<string, Product> = {
  'wildflower-honey-bar': {
    id: 1,
    slug: 'wildflower-honey-bar',
    name: 'Wildflower & Honey Bar',
    price: 22,
    collection: 'Wildflower Collection',
    description: 'A botanical masterpiece forged through the slow, cold-process tradition. This bar captures the essence of a sun-drenched meadow, blending raw local honey with hand-picked wildflowers to soothe and nourish delicate skin.',
    benefits: [
      'Anti-inflammatory properties from raw wildflower pollen',
      'Deep hydration via natural glycerin retention',
      'Silky texture that calms redness and irritation',
    ],
    attributes: [
      { icon: 'eco', label: '100% Biodegradable & Plastic-Free' },
      { icon: 'history_toggle_off', label: 'Cured for 6 weeks for maximum longevity' },
      { icon: 'spa', label: 'pH-balanced for sensitive skin' },
    ],
    ingredients: [
      { name: 'Raw Wildflower Honey', description: "Nature's humectant — locks in moisture and soothes inflammation.", icon: 'local_florist' },
      { name: 'Cold-Pressed Olive Oil', description: 'Rich in oleic acid for deep nourishment and skin barrier support.', icon: 'opacity' },
      { name: 'Shea Butter', description: 'Vitamins A & E for lasting softness and gentle tone-evening.', icon: 'spa' },
    ],
    testimonials: [
      { quote: "My skin has never felt so soft. The wildflower scent is intoxicating.", author: 'Emily R.', location: 'Portland, OR', rating: 5 },
      { quote: "Finally a soap that doesn't strip my sensitive skin.", author: 'Marcus T.', location: 'Austin, TX', rating: 5 },
    ],
    images: [
      'https://images.unsplash.com/photo-1600857544200-b2f468e9b2b1?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1607006479523-5d6fff45ddc7?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1601612628452-9e99ced43524?w=800&auto=format&fit=crop',
    ],
  },
};

// Fallback product for any unrecognised slug
function getProduct(id: string): Product {
  return PRODUCTS[id] ?? {
    id: 0,
    slug: id,
    name: 'Artisan Soap Bar',
    price: 22,
    collection: 'Signature Collection',
    description: 'One of our hand-crafted cold-process soaps, made in small batches with organic botanicals.',
    benefits: ['Natural ingredients', 'pH balanced', 'Cold-process'],
    attributes: [
      { icon: 'eco', label: '100% Biodegradable & Plastic-Free' },
      { icon: 'history_toggle_off', label: 'Cured for 6 weeks' },
    ],
    ingredients: [
      { name: 'Coconut Oil', description: 'Rich lather and deep cleanse.', icon: 'spa' },
      { name: 'Shea Butter', description: 'Nourishing and moisturising.', icon: 'opacity' },
    ],
    testimonials: [],
    images: [
      'https://images.unsplash.com/photo-1600857544200-b2f468e9b2b1?w=800&auto=format&fit=crop',
    ],
  };
}

export async function generateStaticParams() {
  return Object.keys(PRODUCTS).map(slug => ({ id: slug }));
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  return {
    title: `${product.name} | Honey Bee Atelier`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images[0] ? [{ url: product.images[0] }] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = getProduct(id);
  const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price);

  // Related products (all others)
  const related = Object.values(PRODUCTS)
    .filter(p => p.slug !== product.slug)
    .slice(0, 3);

  return (
    <>
      <main className="max-w-[1920px] mx-auto">

        {/* ── Hero Gallery + Product Info ── */}
        <section className="px-6 md:px-20 py-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

          {/* Image mosaic — left 7 cols */}
          <div className="md:col-span-7 grid grid-cols-2 gap-4">
            {/* Breadcrumb above images */}
            <div className="col-span-2 mb-2">
              <Breadcrumb items={[
                { label: 'Home', href: '/' },
                { label: 'Shop', href: '/products' },
                { label: product.name },
              ]} />
            </div>
            {/* Large hero image */}
            <div className="col-span-2 aspect-[4/5] overflow-hidden rounded-xl">
              <Image
                src={product.images[0]}
                alt={product.name}
                width={800}
                height={1000}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            {/* Secondary images */}
            {product.images.slice(1, 3).map((src, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-xl">
                <Image
                  src={src}
                  alt={`${product.name} detail ${i + 2}`}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Product info — right 5 cols, sticky */}
          <div className="md:col-span-5 md:sticky md:top-32 space-y-8">
            {/* Collection + Name + Price */}
            <div className="space-y-3">
              <p className="label-caps text-primary">{product.collection}</p>
              <h1 className="font-headline text-5xl text-[#1c1c19] leading-tight tracking-tight">
                {product.name}
              </h1>
              <p className="font-headline text-2xl text-primary">{formatted}</p>
            </div>

            {/* Description */}
            <p className="text-lg text-on-surface-variant leading-relaxed">
              {product.description}
            </p>

            {/* Quantity + Add to Cart */}
            <div className="space-y-4">
              <QuantitySelector min={1} max={10} defaultValue={1} />
              <AddToCartButton productId={product.id} productName={product.name} price={product.price} />
              <button className="w-full text-primary py-4 font-label uppercase tracking-widest text-xs font-semibold hover:underline decoration-outline-variant underline-offset-8 transition-all">
                Find in a Boutique Near You
              </button>
            </div>

            {/* Attributes */}
            <div className="space-y-4 pt-4 border-t border-outline-variant">
              {product.attributes.map((attr) => (
                <div key={attr.label} className="flex items-center gap-4 text-on-surface-variant">
                  <span
                    className="material-symbols-outlined text-secondary"
                    style={{ fontVariationSettings: "'wght' 300" }}
                  >
                    {attr.icon}
                  </span>
                  <p className="text-sm">{attr.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Nurse's Note ── */}
        <section className="bg-surface-container py-24 px-6 md:px-20 mt-12">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="font-headline text-3xl italic text-[#1c1c19]">The Nurse&apos;s Note</h2>
              <div className="h-px w-24 bg-primary/20 mx-auto" />
            </div>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <p className="font-headline text-xl leading-relaxed text-[#1c1c19]">
                  &ldquo;Honey is nature&apos;s humectant. In this formulation, we&apos;ve focused on pH balance and lipid restoration, ensuring that even the most sensitive barriers feel protected, not stripped.&rdquo;
                </p>
                <p className="label-caps text-primary font-bold">— Sarah J., Founder & Lead Formulator</p>
              </div>
              <div className="bg-surface-container-lowest p-8 rounded-xl space-y-5">
                <h3 className="label-caps text-secondary font-bold">Key Benefits</h3>
                <ul className="space-y-4">
                  {product.benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-4 items-start">
                      <span
                        className="material-symbols-outlined text-primary text-sm mt-0.5"
                        style={{ fontVariationSettings: "'wght' 300" }}
                      >
                        check_circle
                      </span>
                      <p className="text-sm text-on-surface-variant">{benefit}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Ingredients Bento Grid ── */}
        <section className="px-6 md:px-20 py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="md:col-span-1 flex flex-col justify-center space-y-5">
              <SectionLabel>Pure Alchemy</SectionLabel>
              <h2 className="font-headline text-4xl text-[#1c1c19] leading-tight">
                The Ingredients
              </h2>
              <p className="text-on-surface-variant leading-relaxed">
                No synthetics. No fillers. Only the slow-moving essence of the botanical world.
              </p>
              <Link
                href="/ingredients"
                className="text-primary font-bold text-sm uppercase tracking-widest inline-flex items-center gap-2 group"
              >
                View Full Transparency List
                <span
                  className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform"
                  style={{ fontVariationSettings: "'wght' 300" }}
                >
                  arrow_forward
                </span>
              </Link>
            </div>
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {product.ingredients.map((ing) => (
                <IngredientCard key={ing.name} {...ing} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Nurse's Promise Band ── */}
        <NursePromiseBand
          quote="We never compromise on what touches your skin. Every ingredient is chosen with the precision of a clinician and the love of a craftsperson."
          attribution="Sarah J., RN — Founder"
        />

        {/* ── Testimonials ── */}
        {product.testimonials.length > 0 && (
          <section className="px-6 md:px-20 py-24">
            <div className="text-center mb-12 space-y-3">
              <SectionLabel className="text-center">From Our Community</SectionLabel>
              <h2 className="font-headline text-4xl text-[#1c1c19]">What They&apos;re Saying</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.testimonials.map((t) => (
                <TestimonialCard key={t.author} {...t} />
              ))}
            </div>
          </section>
        )}

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <section className="bg-surface-container px-6 md:px-20 py-24">
            <div className="mb-10 space-y-3">
              <SectionLabel>Complete the Ritual</SectionLabel>
              <h2 className="font-headline text-3xl text-[#1c1c19]">You May Also Love</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} id={p.id} slug={p.slug} name={p.name} price={p.price} imageUrl={p.images[0]} />
              ))}
            </div>
          </section>
        )}

      </main>
    </>
  );
}
