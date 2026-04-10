/**
 * Honey Bee — Collection Page (/collections/[slug])
 * Stitch "Luminous Alchemist" — filtered product gallery per collection
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { PageHero } from '@/components/ui/PageHero';
import { ProductCard } from '@/components/ui/ProductCard';

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

interface CollectionProduct {
  id: number;
  slug: string;
  name: string;
  price: number;
  imageUrl: string;
  fragrance: string;
  badge?: string;
  tags: string[];
}

interface CollectionData {
  title: string;
  titleItalic: string;
  description: string;
  products: CollectionProduct[];
}

const COLLECTIONS: Record<string, CollectionData> = {
  ritual: {
    title: 'The Ritual',
    titleItalic: 'Collection',
    description: 'Our bestselling bars — chosen by thousands of customers as their daily ritual. Rich, long-lasting, and deeply nourishing.',
    products: [
      {
        id: 6,
        slug: 'shea-vanilla-dream',
        name: 'Shea & Vanilla Dream',
        price: 20,
        imageUrl: 'https://images.unsplash.com/photo-1600857544200-b2f468e9b2b1?w=800&auto=format&fit=crop',
        fragrance: 'Sweet · Warm',
        badge: 'Bestseller',
        tags: ['Dry Skin', 'Moisturising'],
      },
      {
        id: 7,
        slug: 'peppermint-eucalyptus-revival',
        name: 'Peppermint Revival',
        price: 21,
        imageUrl: 'https://images.unsplash.com/photo-1607006479523-5d6fff45ddc7?w=800&auto=format&fit=crop',
        fragrance: 'Citrus · Herbal',
        tags: ['All Skin Types', 'Energising'],
      },
      {
        id: 1,
        slug: 'wildflower-honey-bar',
        name: 'Wildflower & Honey Bar',
        price: 22,
        imageUrl: 'https://images.unsplash.com/photo-1600857544200-b2f468e9b2b1?w=800&auto=format&fit=crop',
        fragrance: 'Floral · Sweet',
        badge: 'Fan Favourite',
        tags: ['Sensitive Skin', 'Cold Process'],
      },
    ],
  },
  botanical: {
    title: 'Botanical',
    titleItalic: 'Series',
    description: 'New arrivals inspired by the botanical garden. Plant-powered formulas celebrating nature\'s most potent botanicals.',
    products: [
      {
        id: 2,
        slug: 'lavender-oat-cleanse',
        name: 'Lavender & Oat Cleanse',
        price: 19,
        imageUrl: 'https://images.unsplash.com/photo-1607006479523-5d6fff45ddc7?w=800&auto=format&fit=crop',
        fragrance: 'Floral · Herbal',
        badge: 'New',
        tags: ['Dry Skin', 'Sensitive'],
      },
      {
        id: 4,
        slug: 'rose-geranium-glow',
        name: 'Rose Geranium Glow',
        price: 21,
        imageUrl: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&auto=format&fit=crop',
        fragrance: 'Floral · Citrus',
        badge: 'New',
        tags: ['Normal Skin', 'Brightening'],
      },
      {
        id: 8,
        slug: 'honey-oat-nourish',
        name: 'Honey Oat Nourish',
        price: 18,
        imageUrl: 'https://images.unsplash.com/photo-1601612628452-9e99ced43524?w=800&auto=format&fit=crop',
        fragrance: 'Sweet · Milky',
        tags: ['Sensitive Skin', 'Baby-Safe'],
      },
    ],
  },
  therapeutic: {
    title: 'Therapeutic',
    titleItalic: 'Range',
    description: 'Formulated for sensitive skin and specific skin concerns. Every bar in this range is dermatologist-informed and clinically gentle.',
    products: [
      {
        id: 3,
        slug: 'charcoal-cedar-detox',
        name: 'Charcoal & Cedar Detox',
        price: 24,
        imageUrl: 'https://images.unsplash.com/photo-1601612628452-9e99ced43524?w=800&auto=format&fit=crop',
        fragrance: 'Woody · Earthy',
        tags: ['Oily Skin', 'Deep Cleanse'],
      },
      {
        id: 5,
        slug: 'turmeric-neem-clarity',
        name: 'Turmeric & Neem Clarity',
        price: 23,
        imageUrl: 'https://images.unsplash.com/photo-1578897367670-5f5a4e7fd03f?w=800&auto=format&fit=crop',
        fragrance: 'Earthy · Herbal',
        tags: ['Oily Skin', 'Ayurvedic'],
      },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(COLLECTIONS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = COLLECTIONS[slug];
  if (!collection) return {};
  return {
    title: `${collection.title} ${collection.titleItalic} | Honey Bee Atelier`,
    description: collection.description,
    openGraph: {
      title: `${collection.title} ${collection.titleItalic} | Honey Bee Atelier`,
      description: collection.description,
    },
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = COLLECTIONS[slug];

  if (!collection) {
    notFound();
  }

  return (
    <main className="max-w-[1920px] mx-auto px-6 md:px-20 py-12">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Shop', href: '/products' },
          { label: `${collection.title} ${collection.titleItalic}` },
        ]}
      />

      {/* Page Hero */}
      <PageHero
        title={collection.title}
        titleItalic={collection.titleItalic}
        description={collection.description}
      />

      {/* Product Grid */}
      <section className="mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {collection.products.map((product) => (
            <ProductCard
              key={product.slug}
              id={product.id}
              slug={product.slug}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
              fragrance={product.fragrance}
              badge={product.badge}
              tags={product.tags}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
