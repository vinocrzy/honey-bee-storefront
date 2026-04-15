'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  id: number | string;
  slug: string;
  name: string;
  price: number;
  imageUrl: string;
  fragrance?: string;
  badge?: string;
  tags?: string[];
  currency?: string;
}

export function ProductCard({ id, slug, name, price, imageUrl, fragrance, badge, tags = [], currency = 'INR' }: ProductCardProps) {
  const formatted = new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(price);
  const { addToCart, isLoading } = useCart();
  const [added, setAdded] = useState(false);

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to product page
    try {
      await addToCart({
        product_id: Number(id),
        quantity: 1,
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  return (
    <div className="group block bg-surface-container-lowest rounded-xl sunlight-shadow overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
      <Link href={`/products/${slug}`}>
        <div className="aspect-[4/5] overflow-hidden relative">
          <Image
            src={imageUrl}
            alt={name}
            width={400}
            height={500}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Quick add button on hover */}
          <button
            onClick={handleQuickAdd}
            disabled={isLoading}
            className="absolute bottom-4 left-4 right-4 honey-glow text-white label-caps text-[11px] rounded-xl px-6 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-50 hover:opacity-90"
          >
            {added ? (
              <span className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'wght' 300" }}>check</span>
                Added
              </span>
            ) : (
              'Quick Add'
            )}
          </button>
        </div>
        <div className="p-5">
          {badge && (
            <span className="honey-glow text-white label-caps rounded-full px-3 py-1 mb-3 inline-block">
              {badge}
            </span>
          )}
          <div className="flex justify-between items-baseline mb-1">
            <h3 className="font-headline text-xl text-[#1c1c19]">{name}</h3>
            <span className="font-semibold text-primary">{formatted}</span>
          </div>
          {fragrance && (
            <p className="label-caps text-on-surface-variant mb-3">{fragrance}</p>
          )}
          {tags.length > 0 && (
            <div className="flex gap-2 flex-wrap mt-3">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full bg-surface-container label-caps px-3 py-1 text-on-surface-variant">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
