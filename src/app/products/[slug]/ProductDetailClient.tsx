/**
 * Product Detail Client Component
 * Handles interactive features: image gallery, quantity selector, add to cart
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { WishlistButton } from '@/components/ui/WishlistButton';
import type { Product } from '@/types';

interface ProductDetailClientProps {
  product: Product;
  showOnlyCartButton?: boolean;
}

export function ProductDetailClient({ product, showOnlyCartButton = false }: ProductDetailClientProps) {
  const { addToCart, isLoading: cartLoading } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Get all product images, prioritize primary image first
  const allImages = product.images || [];
  const sortedImages = [...allImages].sort((a, b) => {
    if (a.is_primary) return -1;
    if (b.is_primary) return 1;
    return a.sort_order - b.sort_order;
  });

  const selectedImage = sortedImages[selectedImageIndex] || product.primary_image;

  const handleAddToCart = async () => {
    if (product.stock_quantity < 1) return;
    
    setAdding(true);
    setSuccessMessage('');
    
    try {
      await addToCart({
        product_id: product.id,
        quantity,
      });
      setSuccessMessage('Added to cart!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      setSuccessMessage('Failed to add to cart');
    } finally {
      setAdding(false);
    }
  };

  // If showOnlyCartButton, only render the cart button (used in right column)
  if (showOnlyCartButton) {
    return (
      <div className="space-y-4">
        {/* Quantity Selector */}
        <div className="flex items-center gap-4">
          <label className="label-caps text-[#5c614d]">QUANTITY</label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-lg border border-[#e0e5cc] flex items-center justify-center hover:bg-[#f0ede8] transition-colors"
              disabled={quantity <= 1}
            >
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'wght' 300" }}>
                remove
              </span>
            </button>
            <span className="w-12 text-center font-semibold text-[#1c1c19]">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(10, quantity + 1))}
              className="w-10 h-10 rounded-lg border border-[#e0e5cc] flex items-center justify-center hover:bg-[#f0ede8] transition-colors"
              disabled={quantity >= 10}
            >
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'wght' 300" }}>
                add
              </span>
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="flex gap-3">
          <button
            onClick={handleAddToCart}
            disabled={adding || cartLoading || product.stock_quantity < 1}
            className="honey-glow flex-1 text-white font-label tracking-wider rounded-xl px-8 py-4 disabled:opacity-50 transition-opacity"
          >
            {adding ? 'ADDING...' : product.stock_quantity < 1 ? 'OUT OF STOCK' : 'ADD TO CART'}
          </button>
          <WishlistButton
            productId={product.id}
            size="md"
            className="w-14 h-14 rounded-xl border border-outline-variant hover:bg-surface-container transition-colors flex-shrink-0"
          />
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className={`text-center label-caps ${
            successMessage.includes('Failed') ? 'text-red-600' : 'text-green-700'
          }`}>
            {successMessage}
          </div>
        )}
      </div>
    );
  }

  // Full image gallery view (used in left column)
  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square overflow-hidden rounded-xl sunlight-shadow bg-white">
        {selectedImage ? (
          <Image
            src={selectedImage.url}
            alt={selectedImage.alt_text || product.name}
            width={800}
            height={800}
            className="w-full h-full object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#f0ede8]">
            <span className="label-caps text-[#9e9e90]">NO IMAGE</span>
          </div>
        )}
      </div>

      {/* Thumbnail Grid */}
      {sortedImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {sortedImages.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setSelectedImageIndex(idx)}
              className={`aspect-square rounded-lg overflow-hidden transition-all ${
                selectedImageIndex === idx 
                  ? 'ring-2 ring-[#7b5800]' 
                  : 'ring-1 ring-[#e0e5cc] hover:ring-[#7b5800]/50'
              }`}
            >
              <Image
                src={img.url}
                alt={img.alt_text || `${product.name} - Image ${idx + 1}`}
                width={150}
                height={150}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
