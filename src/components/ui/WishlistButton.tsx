/**
 * WishlistButton — Heart icon toggle for wishlisting products
 * Uses Material Symbols `favorite` with fill toggling.
 * Animated scale bounce on toggle.
 */

'use client';

import { useState } from 'react';
import { useWishlist } from '@/contexts/WishlistContext';

interface WishlistButtonProps {
  productId: number;
  size?: 'sm' | 'md';
  className?: string;
}

export function WishlistButton({ productId, size = 'sm', className = '' }: WishlistButtonProps) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [animating, setAnimating] = useState(false);

  const wishlisted = isWishlisted(productId);
  const iconSize = size === 'sm' ? '20px' : '24px';

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAnimating(true);
    await toggleWishlist(productId);
    setTimeout(() => setAnimating(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      className={`inline-flex items-center justify-center transition-transform duration-300 ${
        animating ? 'scale-125' : 'scale-100'
      } ${className}`}
    >
      <span
        className={`material-symbols-outlined transition-colors duration-200 ${
          wishlisted ? 'text-[#7b5800]' : 'text-on-surface-variant'
        }`}
        style={{
          fontSize: iconSize,
          fontVariationSettings: wishlisted
            ? "'FILL' 1, 'wght' 400"
            : "'FILL' 0, 'wght' 200",
        }}
      >
        favorite
      </span>
    </button>
  );
}
