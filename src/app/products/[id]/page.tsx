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
  'lavender-oat-cleanse': {
    id: 2,
    slug: 'lavender-oat-cleanse',
    name: 'Lavender & Oat Cleanse',
    price: 19,
    collection: 'Botanical Series',
    description: 'A gentle, skin-calming bar crafted with organic colloidal oats and pure lavender essential oil. Perfect for sensitive and dry skin types craving a soothing daily cleanse.',
    benefits: [
      'Colloidal oats reduce redness and calm irritation',
      'Lavender essential oil promotes relaxation and sleep',
      'Gentle enough for daily use on sensitive skin',
    ],
    attributes: [
      { icon: 'eco', label: '100% Biodegradable & Plastic-Free' },
      { icon: 'history_toggle_off', label: 'Cured for 6 weeks for maximum longevity' },
      { icon: 'spa', label: 'Ideal for dry and sensitive skin' },
    ],
    ingredients: [
      { name: 'Colloidal Oat Flour', description: 'Clinically proven to soothe and protect sensitive skin.', icon: 'spa' },
      { name: 'Lavender Essential Oil', description: 'Calming aromatherapy and natural antiseptic properties.', icon: 'local_florist' },
      { name: 'Castor Oil', description: 'Creates a rich, conditioning lather.', icon: 'opacity' },
    ],
    testimonials: [
      { quote: "The most calming shower experience I've ever had.", author: 'Sarah K.', location: 'Seattle, WA', rating: 5 },
    ],
    images: [
      'https://images.unsplash.com/photo-1607006479523-5d6fff45ddc7?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600857544200-b2f468e9b2b1?w=800&auto=format&fit=crop',
    ],
  },
  'charcoal-cedar-detox': {
    id: 3,
    slug: 'charcoal-cedar-detox',
    name: 'Charcoal & Cedar Detox',
    price: 24,
    collection: 'Therapeutic Range',
    description: 'A deep-cleansing detox bar formulated with activated bamboo charcoal and cedarwood essential oil. Draws out impurities while leaving skin balanced and refreshed.',
    benefits: [
      'Activated charcoal draws out toxins and excess oil',
      'Cedarwood essential oil tones and tightens pores',
      'Natural antibacterial properties fight breakouts',
    ],
    attributes: [
      { icon: 'eco', label: '100% Biodegradable & Plastic-Free' },
      { icon: 'history_toggle_off', label: 'Cured for 6 weeks for maximum longevity' },
      { icon: 'spa', label: 'Ideal for oily and combination skin' },
    ],
    ingredients: [
      { name: 'Activated Bamboo Charcoal', description: 'Acts like a magnet to draw out impurities from pores.', icon: 'spa' },
      { name: 'Cedarwood Essential Oil', description: 'Natural astringent that tightens and tones skin.', icon: 'local_florist' },
      { name: 'Hemp Seed Oil', description: 'Balances sebum production without clogging pores.', icon: 'opacity' },
    ],
    testimonials: [
      { quote: "Best soap for oily skin. My pores look so much smaller!", author: 'James P.', location: 'NYC', rating: 5 },
    ],
    images: [
      'https://images.unsplash.com/photo-1601612628452-9e99ced43524?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600857544200-b2f468e9b2b1?w=800&auto=format&fit=crop',
    ],
  },
  'rose-geranium-glow': {
    id: 4,
    slug: 'rose-geranium-glow',
    name: 'Rose Geranium Glow',
    price: 21,
    collection: 'Botanical Series',
    description: 'A brightening botanical bar infused with rose hip oil and geranium essential oil. This luxurious soap balances tone, brightens dull skin and leaves a delicate floral fragrance.',
    benefits: [
      'Rose hip oil packed with vitamin C for natural brightening',
      'Geranium balances oil production and evens skin tone',
      'Luxurious floral scent that lingers throughout the day',
    ],
    attributes: [
      { icon: 'eco', label: '100% Biodegradable & Plastic-Free' },
      { icon: 'history_toggle_off', label: 'Cured for 6 weeks for maximum longevity' },
      { icon: 'spa', label: 'Ideal for normal and combination skin' },
    ],
    ingredients: [
      { name: 'Rose Hip Seed Oil', description: 'Rich in vitamin C and essential fatty acids for radiant skin.', icon: 'local_florist' },
      { name: 'Geranium Essential Oil', description: 'Natural skin balancer with a beautiful floral aroma.', icon: 'spa' },
      { name: 'Sweet Almond Oil', description: 'Lightweight emollient that softens and smooths skin.', icon: 'opacity' },
    ],
    testimonials: [
      { quote: "My skin literally glows after using this. The scent is divine.", author: 'Priya M.', location: 'London, UK', rating: 5 },
    ],
    images: [
      'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1607006479523-5d6fff45ddc7?w=800&auto=format&fit=crop',
    ],
  },
  'turmeric-neem-clarity': {
    id: 5,
    slug: 'turmeric-neem-clarity',
    name: 'Turmeric & Neem Clarity',
    price: 23,
    collection: 'Therapeutic Range',
    description: 'An Ayurvedic-inspired clarity bar combining the ancient healing powers of turmeric and neem. Clears blemishes, fights bacteria, and leaves skin with a healthy, even glow.',
    benefits: [
      "Turmeric's curcumin fights inflammation and brightens",
      'Neem is a powerful natural antibacterial agent',
      'Traditional Ayurvedic formula for clear, radiant skin',
    ],
    attributes: [
      { icon: 'eco', label: '100% Biodegradable & Plastic-Free' },
      { icon: 'history_toggle_off', label: 'Cured for 6 weeks for maximum longevity' },
      { icon: 'spa', label: 'Ideal for oily, acne-prone skin' },
    ],
    ingredients: [
      { name: 'Organic Turmeric Powder', description: "Anti-inflammatory and brightening — Ayurveda's golden healer.", icon: 'local_florist' },
      { name: 'Neem Leaf Extract', description: 'Powerful natural antibacterial to combat blemishes.', icon: 'spa' },
      { name: 'Black Seed Oil', description: 'Rich in thymoquinone for potent skin-clearing properties.', icon: 'opacity' },
    ],
    testimonials: [
      { quote: "My breakouts are gone. This is magic in a bar.", author: 'Aisha T.', location: 'Dubai, UAE', rating: 5 },
    ],
    images: [
      'https://images.unsplash.com/photo-1578897367670-5f5a4e7fd03f?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1601612628452-9e99ced43524?w=800&auto=format&fit=crop',
    ],
  },
  'shea-vanilla-dream': {
    id: 6,
    slug: 'shea-vanilla-dream',
    name: 'Shea & Vanilla Dream',
    price: 20,
    collection: 'Ritual Collection',
    description: 'An ultra-moisturising luxury bar for dry skin, packed with raw shea butter and warm vanilla bean extract. This bar leaves skin silky-smooth and enveloped in a comforting, sweet scent.',
    benefits: [
      'Raw shea butter provides intense hydration for 24 hours',
      'Vanilla bean extract rich in antioxidants',
      'Deeply conditioning formula for very dry skin',
    ],
    attributes: [
      { icon: 'eco', label: '100% Biodegradable & Plastic-Free' },
      { icon: 'history_toggle_off', label: 'Cured for 6 weeks for maximum longevity' },
      { icon: 'spa', label: 'Ideal for dry and very dry skin' },
    ],
    ingredients: [
      { name: 'Raw Shea Butter', description: 'Intensely moisturising with vitamins A, E and F.', icon: 'spa' },
      { name: 'Vanilla Bean Extract', description: 'Antioxidant-rich with a warm, comforting scent.', icon: 'local_florist' },
      { name: 'Cocoa Butter', description: 'Creates a protective barrier to lock in moisture.', icon: 'opacity' },
    ],
    testimonials: [
      { quote: "My skin has never been this soft. Worth every penny.", author: 'Claire B.', location: 'Paris, FR', rating: 5 },
    ],
    images: [
      'https://images.unsplash.com/photo-1600857544200-b2f468e9b2b1?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1607006479523-5d6fff45ddc7?w=800&auto=format&fit=crop',
    ],
  },
  'peppermint-eucalyptus-revival': {
    id: 7,
    slug: 'peppermint-eucalyptus-revival',
    name: 'Peppermint Revival',
    price: 21,
    collection: 'Ritual Collection',
    description: 'An invigorating cold-shower bar with pure peppermint and eucalyptus essential oils. The perfect morning wake-up, this bar energises the senses and refreshes the body from head to toe.',
    benefits: [
      'Peppermint creates a lasting cooling sensation',
      'Eucalyptus opens airways for a spa-like experience',
      'Energising formula to kick-start your morning',
    ],
    attributes: [
      { icon: 'eco', label: '100% Biodegradable & Plastic-Free' },
      { icon: 'history_toggle_off', label: 'Cured for 6 weeks for maximum longevity' },
      { icon: 'spa', label: 'All skin types — especially energising' },
    ],
    ingredients: [
      { name: 'Peppermint Essential Oil', description: 'Creates a cooling, tingling sensation on the skin.', icon: 'spa' },
      { name: 'Eucalyptus Essential Oil', description: 'Opens the airways for a refreshing spa experience.', icon: 'local_florist' },
      { name: 'Avocado Oil', description: 'Nourishes while the mint refreshes.', icon: 'opacity' },
    ],
    testimonials: [
      { quote: "I use this every morning — it's like a cold plunge in a bar!", author: 'Tom H.', location: 'Melbourne, AU', rating: 5 },
    ],
    images: [
      'https://images.unsplash.com/photo-1607006479523-5d6fff45ddc7?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600857544200-b2f468e9b2b1?w=800&auto=format&fit=crop',
    ],
  },
  'honey-oat-nourish': {
    id: 8,
    slug: 'honey-oat-nourish',
    name: 'Honey Oat Nourish',
    price: 18,
    collection: 'Wildflower Collection',
    description: 'A gentle, creamy nourishing bar for the most sensitive skin — including babies. Formulated with raw honey and colloidal oats, this bar cleanses without stripping and soothes with every use.',
    benefits: [
      'Ultra-gentle formula safe for baby and sensitive skin',
      'Honey is a natural humectant that locks in moisture',
      'Colloidal oats build and protect the skin barrier',
    ],
    attributes: [
      { icon: 'eco', label: '100% Biodegradable & Plastic-Free' },
      { icon: 'history_toggle_off', label: 'Cured for 6 weeks for maximum longevity' },
      { icon: 'spa', label: 'Baby-safe — sensitive skin approved' },
    ],
    ingredients: [
      { name: 'Raw Honey', description: "Nature's gentlest humectant for soft, supple skin.", icon: 'local_florist' },
      { name: 'Colloidal Oatmeal', description: 'Clinically proven to soothe eczema and sensitive skin.', icon: 'spa' },
      { name: 'Sunflower Oil', description: 'Lightweight and rich in vitamin E for barrier support.', icon: 'opacity' },
    ],
    testimonials: [
      { quote: "I use this on my baby and myself. Absolutely love it.", author: 'Lisa N.', location: 'Toronto, CA', rating: 5 },
    ],
    images: [
      'https://images.unsplash.com/photo-1601612628452-9e99ced43524?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600857544200-b2f468e9b2b1?w=800&auto=format&fit=crop',
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
