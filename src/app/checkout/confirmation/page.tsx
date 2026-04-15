/**
 * Honey Bee — Order Confirmation Page
 * Success page after completing checkout
 * Luminous Alchemist design system
 */

'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { SectionLabel } from '@/components/ui/SectionLabel';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('order');

  useEffect(() => {
    // If no order ID, redirect to products
    if (!orderId) {
      router.push('/products');
    }
  }, [orderId, router]);

  if (!orderId) {
    return null;
  }

  return (
    <main className="bg-[#fcf9f4] min-h-screen py-20">
      <div className="px-6 md:px-20 max-w-3xl mx-auto">
        {/* Success Icon */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full honey-glow flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'wght' 300" }}>
              check
            </span>
          </div>
          
          <h1 className="font-headline text-4xl lg:text-5xl text-[#1c1c19] mb-4">
            Order Confirmed!
          </h1>
          <p className="text-[#5c614d] mb-2 text-lg">
            Thank you for your purchase.
          </p>
          <p className="label-caps text-[#7b5800]">
            ORDER #{orderId}
          </p>
        </div>

        {/* What's Next Section */}
        <div className="bg-white rounded-xl sunlight-shadow p-8 mb-8">
          <SectionLabel className="mb-6">WHAT'S NEXT?</SectionLabel>
          
          <div className="space-y-6">
            {/* Email Confirmation */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-[#f0ede8] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#7b5800]" style={{ fontVariationSettings: "'wght' 300" }}>
                    mail
                  </span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-[#1c1c19] mb-1">Order Confirmation Email</h3>
                <p className="text-sm text-[#5c614d] leading-relaxed">
                  We've sent a confirmation to your email with all the order details you need.
                </p>
              </div>
            </div>

            {/* Processing & Shipping */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-[#f0ede8] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#7b5800]" style={{ fontVariationSettings: "'wght' 300" }}>
                    local_shipping
                  </span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-[#1c1c19] mb-1">Processing & Shipping</h3>
                <p className="text-sm text-[#5c614d] leading-relaxed">
                  Your order will be lovingly prepared and processed within 1-2 business days. 
                  Estimated delivery: 5-7 business days.
                </p>
              </div>
            </div>

            {/* Support */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-[#f0ede8] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#7b5800]" style={{ fontVariationSettings: "'wght' 300" }}>
                    support_agent
                  </span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-[#1c1c19] mb-1">Questions?</h3>
                <p className="text-sm text-[#5c614d] leading-relaxed">
                  Contact us at{' '}
                  <a href="mailto:hello@honeybee.com" className="text-[#7b5800] underline underline-offset-2">
                    hello@honeybee.com
                  </a>
                  {' '}or check your order status in{' '}
                  <Link href="/account" className="text-[#7b5800] underline underline-offset-2">
                    your account
                  </Link>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link 
            href="/products"
            className="honey-glow inline-block text-white font-label tracking-wider rounded-xl px-8 py-4 text-center"
          >
            CONTINUE SHOPPING
          </Link>
          <Link
            href="/account"
            className="text-[#1c1c19] underline underline-offset-4 font-label tracking-wider hover:text-[#7b5800] transition-colors px-8 py-4"
          >
            VIEW MY ACCOUNT
          </Link>
        </div>

        {/* Care Message */}
        <div className="mt-16 text-center">
          <p className="text-[#5c614d] italic leading-relaxed">
            "Each jar is crafted with intention and care. We hope these products bring you joy and wellness."
          </p>
          <p className="label-caps text-[#7b5800] mt-4">— THE HONEY BEE TEAM</p>
        </div>
      </div>
    </main>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-4 border-[#e0e5cc] border-t-[#7b5800] rounded-full animate-spin" />
          <p className="label-caps text-[#5c614d]">LOADING...</p>
        </div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
