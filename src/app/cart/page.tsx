'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { NursePromiseBand } from '@/components/ui/NursePromiseBand';
import { useCart } from '@/contexts/CartContext';

const FREE_SHIPPING_THRESHOLD = 999;

export default function CartPage() {
  const { cart, isLoading, error, updateQuantity, removeFromCart } = useCart();

  // Per-item loading state — prevents rapid-click race conditions
  const [updatingItem, setUpdatingItem] = useState<number | null>(null);

  const updateQty = async (itemId: number, qty: number) => {
    if (qty < 1) return removeItem(itemId);
    if (updatingItem === itemId) return; // Block concurrent calls on same item
    setUpdatingItem(itemId);
    try {
      await updateQuantity(itemId, qty);
    } finally {
      setUpdatingItem(null);
    }
  };

  const removeItem = async (itemId: number) => {
    if (updatingItem === itemId) return;
    setUpdatingItem(itemId);
    try {
      await removeFromCart(itemId);
    } finally {
      setUpdatingItem(null);
    }
  };

  const items = cart?.items || [];
  const subtotal = cart?.subtotal || 0;
  const shipping = cart?.shipping || (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 99);
  const tax = cart?.tax || 0;
  const total = cart?.total || (subtotal + shipping + tax);
  const toFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const fmt = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(n);

  // Loading state
  if (isLoading && !cart) {
    return (
      <main className="max-w-[1920px] mx-auto px-6 md:px-20 py-24">
        <div className="space-y-6 animate-pulse">
          <div className="h-12 bg-surface-container rounded w-64" />
          <div className="h-32 bg-surface-container rounded" />
          <div className="h-32 bg-surface-container rounded" />
        </div>
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <main className="max-w-[1920px] mx-auto px-6 md:px-20 py-24 text-center space-y-6">
        <span className="material-symbols-outlined text-error mx-auto block" style={{ fontSize: '64px', fontVariationSettings: "'wght' 100" }}>
          error
        </span>
        <h1 className="font-headline text-4xl text-[#1c1c19]">Error Loading Cart</h1>
        <p className="text-on-surface-variant text-lg">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="honey-glow inline-block text-white font-label font-bold uppercase tracking-widest text-sm px-10 py-5 rounded-xl shadow-lg shadow-primary/10 hover:opacity-90 transition-opacity"
        >
          Retry
        </button>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="max-w-[1920px] mx-auto px-6 md:px-20 py-24 text-center space-y-6">
        <span className="material-symbols-outlined text-on-surface-variant mx-auto block" style={{ fontSize: '64px', fontVariationSettings: "'wght' 100" }}>
          shopping_bag
        </span>
        <h1 className="font-headline text-4xl text-[#1c1c19]">Your Basket is Empty</h1>
        <p className="text-on-surface-variant text-lg">You haven't added anything yet — let's change that.</p>
        <Link
          href="/products"
          className="honey-glow inline-block text-white font-label font-bold uppercase tracking-widest text-sm px-10 py-5 rounded-xl shadow-lg shadow-primary/10 hover:opacity-90 transition-opacity"
        >
          Shop the Collection
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-[1920px] mx-auto">
      <div className="px-6 md:px-20 py-12">

        {/* Header */}
        <div className="mb-10">
          <SectionLabel>Your Selection</SectionLabel>
          <h1 className="font-headline text-5xl text-[#1c1c19]">Atelier Basket</h1>
          <p className="text-on-surface-variant mt-2">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
        </div>

        {/* Free shipping progress */}
        {toFreeShipping > 0 && (
          <div className="mb-8 bg-secondary-container/40 rounded-xl p-5 flex items-center gap-4">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'wght' 200" }}>local_shipping</span>
            <div className="flex-1">
              <p className="text-sm text-[#1c1c19]">
                Add <span className="font-semibold text-primary">{fmt(toFreeShipping)}</span> more for free shipping
              </p>
              <div className="mt-2 h-1.5 bg-outline-variant rounded-full overflow-hidden">
                <div
                  className="h-full honey-glow rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {shipping === 0 && (
          <div className="mb-8 bg-secondary-container/40 rounded-xl p-5 flex items-center gap-3">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'wght' 200" }}>check_circle</span>
            <p className="text-sm text-[#1c1c19] font-semibold">You've unlocked free shipping!</p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-12">

          {/* Cart Items */}
          <div className="flex-1 space-y-5">
            {items.map(item => (
              <div key={item.id} className="bg-surface-container-lowest rounded-xl sunlight-shadow p-5 flex gap-5">
                {/* Image */}
                <Link href={`/products/${item.product_slug}`} className="flex-shrink-0 w-24 h-28 rounded-xl overflow-hidden">
                  <Image
                    src={item.product_image || 'https://images.unsplash.com/photo-1600857544200-b2f468e9b2b1?w=400&auto=format&fit=crop'}
                    alt={item.product_name}
                    width={96}
                    height={112}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <Link href={`/products/${item.product_slug}`}>
                    <h3 className="font-headline text-lg text-[#1c1c19] hover:text-primary transition-colors leading-tight">{item.product_name}</h3>
                  </Link>
                  <p className="label-caps text-on-surface-variant mt-1">SKU: {item.product_sku}</p>
                  <p className="font-semibold text-primary mt-2">{fmt(item.unit_price)}</p>
                </div>

                {/* Qty + Remove */}
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeItem(item.id)}
                    disabled={updatingItem === item.id || isLoading}
                    className="text-on-surface-variant hover:text-error transition-colors disabled:opacity-50"
                    aria-label="Remove item"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '20px', fontVariationSettings: "'wght' 200" }}>close</span>
                  </button>
                  {/* Qty stepper */}
                  <div className="flex items-center border border-outline-variant rounded-xl overflow-hidden">
                    <button
                      onClick={() => updateQty(item.id, item.quantity - 1)}
                      disabled={updatingItem === item.id || isLoading}
                      className="px-3 py-2 text-primary hover:bg-surface-container transition-colors disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'wght' 300" }}>remove</span>
                    </button>
                    <span className="px-4 py-2 text-sm font-label font-semibold text-[#1c1c19] border-x border-outline-variant min-w-[2.5rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      disabled={updatingItem === item.id || isLoading}
                      className="px-3 py-2 text-primary hover:bg-surface-container transition-colors disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'wght' 300" }}>add</span>
                    </button>
                  </div>
                  <p className="font-semibold text-sm text-[#1c1c19]">{fmt(item.total_price)}</p>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-primary font-label text-sm uppercase tracking-widest hover:gap-3 transition-all"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'wght' 300" }}>arrow_back</span>
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:w-96">
            <div className="bg-surface-container-lowest rounded-xl sunlight-shadow p-7 space-y-5 sticky top-32">
              <h2 className="font-headline text-2xl text-[#1c1c19]">Order Summary</h2>

              {/* Promo Code - Coming Soon */}
              {/* <div className="space-y-2">
                <label className="label-caps text-on-surface-variant">Promo Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coming soon..."
                    disabled
                    className="flex-1 bg-surface-container border border-outline-variant rounded-xl px-4 py-2.5 text-sm text-on-surface-variant/50 cursor-not-allowed"
                  />
                  <button
                    disabled
                    className="px-4 py-2.5 border border-outline-variant text-on-surface-variant/50 font-label text-xs uppercase tracking-widest rounded-xl cursor-not-allowed"
                  >
                    Apply
                  </button>
                </div>
              </div> */}

              {/* Totals */}
              <div className="space-y-3 pt-3 border-t border-outline-variant text-sm">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal</span><span>{fmt(subtotal)}</span>
                </div>
                {tax > 0 && (
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Tax</span><span>{fmt(tax)}</span>
                  </div>
                )}
                <div className="flex justify-between text-on-surface-variant">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : fmt(shipping)}</span>
                </div>
              </div>

              <div className="flex justify-between font-semibold text-lg text-[#1c1c19] pt-3 border-t border-outline-variant">
                <span className="font-headline">Total</span>
                <span className="text-primary">{fmt(total)}</span>
              </div>

              <Link
                href="/checkout"
                className="honey-glow w-full text-center block text-white font-label font-bold uppercase tracking-widest text-sm py-5 rounded-xl shadow-lg shadow-primary/10 hover:opacity-90 transition-opacity"
              >
                Proceed to Checkout
              </Link>

              {/* Trust signals */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                {[
                  { icon: 'lock', text: 'Secure' },
                  { icon: 'replay', text: 'Easy Returns' },
                  { icon: 'eco', text: 'Eco Packed' },
                ].map(s => (
                  <div key={s.text} className="text-center space-y-1">
                    <span className="material-symbols-outlined text-on-surface-variant mx-auto block" style={{ fontSize: '18px', fontVariationSettings: "'wght' 200" }}>{s.icon}</span>
                    <p className="label-caps text-on-surface-variant" style={{ fontSize: '9px' }}>{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom promise band */}
      <div className="mt-16">
        <NursePromiseBand
          quote="Every bar ships in compostable packaging. Because if we care about your skin, we care about the earth it lives on."
          attribution="Honey Bee Atelier — Shipping Promise"
          eyebrow="OUR COMMITMENT"
        />
      </div>
    </main>
  );
}
