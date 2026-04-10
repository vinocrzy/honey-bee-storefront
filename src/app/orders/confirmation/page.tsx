'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { SectionLabel } from '@/components/ui/SectionLabel';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order');

  return (
    <main className="max-w-[1920px] mx-auto px-6 md:px-20 py-24">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Success Icon */}
        <div className="w-24 h-24 rounded-full bg-secondary-container flex items-center justify-center mx-auto">
          <span 
            className="material-symbols-outlined text-primary" 
            style={{ fontSize: '48px', fontVariationSettings: "'FILL' 1, 'wght' 300" }}
          >
            check_circle
          </span>
        </div>

        {/* Header */}
        <div className="space-y-4">
          <SectionLabel className="text-center">Order Confirmed</SectionLabel>
          <h1 className="font-headline text-5xl text-[#1c1c19]">
            Thank You for Your Order!
          </h1>
          {orderNumber && (
            <p className="text-on-surface-variant text-lg">
              Order Number: <span className="font-semibold text-primary">{orderNumber}</span>
            </p>
          )}
        </div>

        {/* Message */}
        <div className="bg-surface-container rounded-xl p-8 space-y-4">
          <p className="text-on-surface-variant leading-relaxed">
            Your order is being prepared with care in our atelier. We craft each bar by hand using the 
            traditional cold-process method, ensuring the highest quality and purity.
          </p>
          <p className="text-on-surface-variant leading-relaxed">
            You'll receive a confirmation email shortly with your order details and tracking information 
            once your package ships.
          </p>
        </div>

        {/* What's Next */}
        <div className="bg-surface-container-lowest rounded-xl sunlight-shadow p-8 space-y-6">
          <h2 className="font-headline text-2xl text-[#1c1c19]">What Happens Next?</h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span 
                  className="material-symbols-outlined text-primary" 
                  style={{ fontSize: '24px', fontVariationSettings: "'wght' 200" }}
                >
                  mail
                </span>
                <h3 className="font-label font-bold text-sm uppercase tracking-widest text-[#1c1c19]">
                  Step 1
                </h3>
              </div>
              <p className="text-sm text-on-surface-variant">
                Check your email for order confirmation
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span 
                  className="material-symbols-outlined text-primary" 
                  style={{ fontSize: '24px', fontVariationSettings: "'wght' 200" }}
                >
                  package
                </span>
                <h3 className="font-label font-bold text-sm uppercase tracking-widest text-[#1c1c19]">
                  Step 2
                </h3>
              </div>
              <p className="text-sm text-on-surface-variant">
                We hand-pack your order with eco-friendly materials
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span 
                  className="material-symbols-outlined text-primary" 
                  style={{ fontSize: '24px', fontVariationSettings: "'wght' 200" }}
                >
                  local_shipping
                </span>
                <h3 className="font-label font-bold text-sm uppercase tracking-widest text-[#1c1c19]">
                  Step 3
                </h3>
              </div>
              <p className="text-sm text-on-surface-variant">
                Receive tracking info when your order ships
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/products"
            className="honey-glow inline-block text-white font-label font-bold uppercase tracking-widest text-sm px-10 py-5 rounded-xl shadow-lg shadow-primary/10 hover:opacity-90 transition-opacity"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="inline-block border border-outline-variant text-on-surface-variant font-label font-bold uppercase tracking-widest text-sm px-10 py-5 rounded-xl hover:border-primary hover:text-primary transition-all"
          >
            Return Home
          </Link>
        </div>

        {/* Bottom Note */}
        <div className="pt-8 border-t border-outline-variant">
          <p className="text-sm text-on-surface-variant italic">
            "Every bar is a meditation in botanical alchemy. Thank you for supporting slow, sustainable skincare."
          </p>
          <p className="label-caps text-primary font-bold mt-2">
            — The Honey Bee Atelier Team
          </p>
        </div>
      </div>
    </main>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <main className="max-w-[1920px] mx-auto px-6 md:px-20 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="animate-pulse space-y-6">
            <div className="w-24 h-24 bg-surface-container rounded-full mx-auto" />
            <div className="h-12 bg-surface-container rounded w-3/4 mx-auto" />
            <div className="h-6 bg-surface-container rounded w-1/2 mx-auto" />
          </div>
        </div>
      </main>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
