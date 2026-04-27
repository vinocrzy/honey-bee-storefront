'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProductRecommendations, getCartRecommendations } from '@/services/commerce';
import type { Product } from '@/types';

interface ProductRecommendationsProps {
  productId?: number;
  cartProductIds?: number[];
  title?: string;
  subtitle?: string;
}

export function ProductRecommendations({
  productId,
  cartProductIds,
  title = 'You May Also Love',
  subtitle,
}: ProductRecommendationsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        let results: Product[] = [];
        if (productId) {
          results = await getProductRecommendations(productId, 'similar');
        } else if (cartProductIds && cartProductIds.length > 0) {
          results = await getCartRecommendations(cartProductIds);
        }
        setProducts(results.slice(0, 4));
      } catch {
        // silently fail — recommendations are non-critical
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [productId, cartProductIds?.join(',')]);

  if (loading || products.length === 0) return null;

  return (
    <section className="px-6 md:px-20 py-16 bg-[#fcf9f4]">
      <div className="mb-8">
        <p className="label-caps text-[#7b5800] mb-2">HANDPICKED FOR YOU</p>
        <h2 className="font-headline text-3xl text-[#1c1c19]">{title}</h2>
        {subtitle && <p className="text-[#5c614d] text-sm mt-2">{subtitle}</p>}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group bg-white rounded-2xl overflow-hidden sunlight-shadow hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <Image
                src={product.primary_image?.url || '/placeholder.png'}
                alt={product.primary_image?.alt_text || product.name}
                width={400}
                height={500}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <p className="text-[#1c1c19] font-medium text-sm line-clamp-2 mb-1">{product.name}</p>
              <p className="text-[#7b5800] font-semibold text-sm">
                ₹{Number(product.price).toLocaleString('en-IN', { minimumFractionDigits: 0 })}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
