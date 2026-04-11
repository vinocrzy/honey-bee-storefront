/**
 * Honey Bee — Collection Detail Page (/collections/[slug])
 * Stitch "Luminous Alchemist" — product gallery filtered by collection
 * Server Component: fetches category + products from API
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { PageHero } from '@/components/ui/PageHero';
import { ProductCard } from '@/components/ui/ProductCard';
import { getCategoryBySlug, getProductsByCategory } from '@/services/products';
import type { Product } from '@/types';

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1600857544200-b2f468e9b2b1?w=800&auto=format&fit=crop';

function getProductImage(product: Product): string {
  return product.primary_image?.url ?? product.images?.[0]?.url ?? PLACEHOLDER_IMAGE;
}

// Dynamic — no pre-built paths, rendered on request
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const category = await getCategoryBySlug(slug);
    const title = category.meta_title ?? `${category.name} | Honey Bee Atelier`;
    const description = category.meta_description ?? category.description ?? undefined;
    return {
      title,
      description,
      openGraph: { title, description },
    };
  } catch {
    return {};
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;

  let category;
  try {
    category = await getCategoryBySlug(slug);
  } catch {
    notFound();
  }

  let products: Product[] = [];
  let fetchError: string | null = null;
  try {
    const result = await getProductsByCategory(category.id, { per_page: 24 });
    products = result.data;
  } catch {
    fetchError = 'Could not load products for this collection.';
  }

  return (
    <main className="max-w-[1920px] mx-auto px-6 md:px-20 py-12">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Collections', href: '/collections' },
          { label: category.name },
        ]}
      />

      <PageHero
        title={category.name}
        titleItalic="Collection"
        description={category.description ?? undefined}
      />

      {fetchError ? (
        <div className="py-20 text-center space-y-6">
          <span
            className="material-symbols-outlined text-on-surface-variant mx-auto block"
            style={{ fontSize: '64px', fontVariationSettings: "'wght' 100" }}
          >
            error_outline
          </span>
          <p className="text-on-surface-variant">{fetchError}</p>
          <Link
            href="/products"
            className="honey-glow inline-block text-white font-label font-bold uppercase tracking-widest text-sm px-10 py-4 rounded-xl shadow-lg shadow-primary/10 hover:opacity-90 transition-opacity"
          >
            Browse All Soaps
          </Link>
        </div>
      ) : products.length === 0 ? (
        <div className="py-20 text-center space-y-6">
          <span
            className="material-symbols-outlined text-on-surface-variant mx-auto block"
            style={{ fontSize: '64px', fontVariationSettings: "'wght' 100" }}
          >
            local_florist
          </span>
          <h2 className="font-headline text-3xl text-[#1c1c19]">No products yet</h2>
          <p className="text-on-surface-variant">
            This collection is being curated. Check back soon.
          </p>
          <Link
            href="/products"
            className="honey-glow inline-block text-white font-label font-bold uppercase tracking-widest text-sm px-10 py-4 rounded-xl shadow-lg shadow-primary/10 hover:opacity-90 transition-opacity"
          >
            Shop All Soaps
          </Link>
        </div>
      ) : (
        <section className="mt-4">
          <p className="label-caps text-on-surface-variant mb-8">
            {products.length} product{products.length !== 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.slug}
                id={product.id}
                slug={product.slug}
                name={product.name}
                price={product.price}
                imageUrl={getProductImage(product)}
                fragrance={product.short_description ?? undefined}
                badge={product.is_featured ? 'Featured' : undefined}
                tags={product.categories?.map((c) => c.name) ?? []}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
