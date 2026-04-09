'use client';

import { useState } from 'react';

interface AddToCartButtonProps {
  productId: number | string;
  productName: string;
  price: number;
}

export function AddToCartButton({ productId, productName, price }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    // TODO: wire to cart service
    await new Promise<void>((r) => setTimeout(r, 600));
    setAdded(true);
    setLoading(false);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className="honey-glow text-white w-full py-5 rounded-xl font-label uppercase tracking-widest text-sm font-bold shadow-lg shadow-primary/10 transition-all active:scale-95 disabled:opacity-70"
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Adding...
        </span>
      ) : added ? (
        <span className="flex items-center justify-center gap-2">
          <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'wght' 300" }}>check</span>
          Added to Basket
        </span>
      ) : (
        'Add to Atelier Basket'
      )}
    </button>
  );
}
