/**
 * Honey Bee — Product Detail Page
 * Dynamic route: /products/[slug]
 * Dynamic rendering (fetches on demand)
 * Luminous Alchemist design system
 */

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { getProductBySlug, getProducts } from '@/services/products';
import { ProductDetailClient } from './ProductDetailClient';
import { ProductReviews } from './ProductReviews';
import { SectionLabel } from '@/components/ui/SectionLabel';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

// Force dynamic rendering (no static generation)
export const dynamic = 'force-dynamic';

// Generate metadata for SEO (still works with dynamic pages)
export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    
    return {
      title: product.meta_title || `${product.name} | Honey Bee`,
      description: product.meta_description || product.short_description || product.description || '',
      keywords: product.meta_keywords || undefined,
      openGraph: {
        title: product.meta_title || product.name,
        description: product.meta_description || product.short_description || '',
        images: product.primary_image?.url 
          ? [{ url: product.primary_image.url, alt: product.primary_image.alt_text || product.name }]
          : [],
      },
    };
  } catch (error) {
    return {
      title: 'Product Not Found | Honey Bee',
    };
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  let product;
  
  try {
    product = await getProductBySlug(slug);
  } catch (error) {
    notFound();
  }

  // Get related products from same category (if category exists)
  let relatedProducts: any[] = [];
  if (product.categories && product.categories.length > 0) {
    try {
      const categoryId = product.categories[0].id;
      const response = await getProducts({ 
        category_id: categoryId, 
        per_page: 4 
      });
      // Filter out current product
      relatedProducts = response.data.filter((p) => p.id !== product.id).slice(0, 4);
    } catch (error) {
      console.error('Failed to fetch related products:', error);
    }
  }

  const categoryName = product.categories?.[0]?.name || 'Products';
  const categorySlug = product.categories?.[0]?.slug || '';

  // ✅ SEO: Generate Product Schema.org structured data
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "description": product.description || product.short_description || '',
    "image": product.images?.map(img => img.url) || [],
    "sku": product.sku,
    "brand": {
      "@type": "Brand",
      "name": "Honey Bee"
    },
    "offers": {
      "@type": "Offer",
      "price": product.price.toString(),
      "priceCurrency": "INR",
      "availability": product.stock_quantity > 0 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      "url": `https://honeybee.net.in/products/${product.slug}`
    },
    ...(product.compare_at_price && product.compare_at_price > product.price && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "reviewCount": "1"
      }
    }),
    ...(product.avg_rating && product.review_count && product.review_count > 0 && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": product.avg_rating.toString(),
        "reviewCount": product.review_count.toString(),
        "bestRating": "5",
        "worstRating": "1"
      }
    })
  };

  return (
    <main className="bg-[#fcf9f4] min-h-screen">
      {/* ✅ SEO: Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <nav className="px-6 md:px-20 py-8 border-b border-[#e0e5cc]/40">
        <div className="flex items-center gap-2 label-caps text-[#5c614d]">
          <Link href="/" className="hover:text-[#7b5800] transition-colors">
            HOME
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#7b5800] transition-colors">
            SHOP
          </Link>
          <span>/</span>
          {categorySlug && (
            <>
              <Link 
                href={`/products?category=${categorySlug}`}
                className="hover:text-[#7b5800] transition-colors"
              >
                {categoryName.toUpperCase()}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-[#7b5800]">{product.name.toUpperCase()}</span>
        </div>
      </nav>

      {/* Main Product Grid: Images (60%) + Details (40%) */}
      <div className="px-6 md:px-20 py-12 lg:py-20">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          
          {/* Image Gallery - Left Side (3 cols on desktop) */}
          <div className="lg:col-span-3">
            <ProductDetailClient product={product} />
          </div>

          {/* Product Details - Right Side (2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Badge */}
            {product.is_featured && (
              <span className="honey-glow text-white label-caps rounded-full px-4 py-1.5 inline-block">
                FEATURED
              </span>
            )}
            
            {/* Title + Category */}
            <div>
              <h1 className="font-headline text-4xl lg:text-5xl text-[#1c1c19] leading-[1.05] mb-4">
                {product.name}
              </h1>
              {product.short_description && (
                <p className="label-caps text-[#5c614d] mb-6">{product.short_description}</p>
              )}
              <div className="text-3xl font-semibold text-[#7b5800]">
                ${Number(product.price).toFixed(2)}
                {product.compare_at_price && Number(product.compare_at_price) > Number(product.price) && (
                  <span className="ml-3 text-xl text-[#9e9e90] line-through font-normal">
                    ${Number(product.compare_at_price).toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="prose prose-sm max-w-none">
                <p className="text-[#5c614d] leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Stock Status */}
            <div>
              {product.stock_quantity > 0 ? (
                <>
                  <p className="label-caps text-green-700 mb-2">IN STOCK</p>
                  {product.stock_quantity <= 5 && (
                    <p className="label-caps text-[#d59f2b]">
                      ONLY {product.stock_quantity} LEFT
                    </p>
                  )}
                </>
              ) : (
                <p className="label-caps text-red-600">OUT OF STOCK</p>
              )}
            </div>

            {/* Add to Cart Section - Client Component handles this */}
            <div className="pt-6 border-t border-[#e0e5cc]">
              <ProductDetailClient product={product} showOnlyCartButton />
            </div>

            {/* Product Meta Info */}
            <div className="pt-8 border-t border-[#e0e5cc] space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="label-caps text-[#5c614d]">SKU</span>
                <span className="text-[#1c1c19]">{product.sku}</span>
              </div>
              {product.categories && product.categories.length > 0 && (
                <div className="flex justify-between">
                  <span className="label-caps text-[#5c614d]">CATEGORY</span>
                  <span className="text-[#1c1c19]">{product.categories.map(c => c.name).join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="px-6 md:px-20 py-20 bg-[#f0ede8]">
          <SectionLabel>YOU MIGHT ALSO LOVE</SectionLabel>
          <h2 className="font-headline text-3xl lg:text-4xl text-[#1c1c19] mb-10">
            More from {categoryName}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/products/${relatedProduct.slug}`}
                className="bg-white rounded-xl sunlight-shadow overflow-hidden group"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <Image
                    src={relatedProduct.primary_image?.url || '/placeholder.png'}
                    alt={relatedProduct.primary_image?.alt_text || relatedProduct.name}
                    width={400}
                    height={500}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-headline text-xl text-[#1c1c19]">{relatedProduct.name}</h3>
                    <span className="font-semibold text-[#7b5800]">${Number(relatedProduct.price).toFixed(2)}</span>
                  </div>
                  {relatedProduct.short_description && (
                    <p className="label-caps text-[#5c614d] mt-2">{relatedProduct.short_description}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Reviews Section */}
      <section className="px-6 md:px-20 py-16 bg-surface-container">
        <SectionLabel>Customer Reviews</SectionLabel>
        <h2 className="font-headline text-3xl lg:text-4xl text-[#1c1c19] mb-10">
          What Our Customers Say
        </h2>
        <ProductReviews slug={slug} />
      </section>
    </main>
  );
}
