/**
 * Honey Bee — Shipping Information Page (/shipping)
 * Static brand content — no API needed
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { FeatureStrip } from '@/components/ui/FeatureStrip';

export const metadata: Metadata = {
  title: 'Shipping Information | Honey Bee Atelier',
  description:
    'Shipping rates, delivery timelines, and free shipping details for Honey Bee Atelier orders across India.',
};

const SHIPPING_OPTIONS = [
  {
    icon: 'local_shipping',
    name: 'Standard Shipping',
    timeline: '3–5 business days',
    cost: '₹99',
    note: 'Most orders arrive within 4 days',
  },
  {
    icon: 'rocket_launch',
    name: 'Express Shipping',
    timeline: '2 business days',
    cost: '₹199',
    note: 'Order by 12pm IST for same-day dispatch',
  },
  {
    icon: 'flight',
    name: 'Priority Shipping',
    timeline: 'Next business day',
    cost: '₹349',
    note: 'Available Mon–Fri only',
  },
  {
    icon: 'eco',
    name: 'Free Standard Shipping',
    timeline: '3–5 business days',
    cost: 'Free',
    note: 'On all orders over ₹999',
    highlight: true,
  },
];

const FAQS = [
  {
    q: 'When will my order ship?',
    a: 'We dispatch all orders within 1–2 business days. You\'ll receive a confirmation email with tracking details once your package leaves our atelier.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Currently we ship within India only. International shipping is on our roadmap — sign up to our newsletter to be the first to know when it launches.',
  },
  {
    q: 'Can I change my shipping address after ordering?',
    a: 'Address changes are possible within 2 hours of placing your order. Contact us immediately at hello@honeybee-atelier.com with your order number and the updated address.',
  },
  {
    q: 'What if my order arrives damaged?',
    a: 'We pack every order with care, but if something arrives damaged please email us within 48 hours with a photo and your order number. We\'ll send a replacement at no charge.',
  },
  {
    q: 'Do you ship to PO Boxes?',
    a: 'Yes — standard shipping is available to PO Boxes. Express and Overnight are not available for PO Box addresses.',
  },
  {
    q: 'How do I track my order?',
    a: 'You\'ll receive a tracking link by email once your order ships. You can also check your order status using the link in your confirmation email.',
  },
];

export default function ShippingPage() {
  return (
    <main className="max-w-[1920px] mx-auto">

      <div className="px-6 md:px-20 pt-12">
        <Breadcrumb
          items={[{ label: 'Home', href: '/' }, { label: 'Shipping' }]}
        />
      </div>

      {/* Header */}
      <section className="px-6 md:px-20 pt-8 pb-16">
        <SectionLabel>Delivery</SectionLabel>
        <h1 className="font-headline text-6xl md:text-7xl text-[#1c1c19] leading-tight mb-6">
          Shipping <span className="italic font-normal text-[#7b5800]">Information</span>
        </h1>
        <p className="text-on-surface-variant text-xl leading-relaxed max-w-2xl">
          We ship across India. Free standard shipping on all orders over ₹999.
          Every order is hand-packed in our Chennai atelier.
        </p>
      </section>

      {/* Free shipping banner */}
      <section className="mx-6 md:mx-20 mb-16 bg-[#e0e5cc] rounded-xl p-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-[#7b5800]/10 flex items-center justify-center flex-shrink-0">
          <span
            className="material-symbols-outlined text-[#7b5800]"
            style={{ fontSize: '32px', fontVariationSettings: "'wght' 100" }}
          >
            eco
          </span>
        </div>
        <div>
          <h2 className="font-headline text-2xl text-[#1c1c19] mb-1">
            Free shipping on orders over ₹999
          </h2>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            Add a few bars to your order and we'll cover standard shipping — no code needed,
            applied automatically at checkout.
          </p>
        </div>
        <Link
          href="/products"
          className="honey-glow text-white font-label font-bold uppercase tracking-widest text-sm px-8 py-3 rounded-xl shadow-lg shadow-primary/10 hover:opacity-90 transition-opacity whitespace-nowrap flex-shrink-0"
        >
          Shop Now
        </Link>
      </section>

      {/* Shipping options */}
      <section className="px-6 md:px-20 pb-20">
        <SectionLabel>Rates & Timelines</SectionLabel>
        <h2 className="font-headline text-3xl text-[#1c1c19] mb-10">Shipping Options</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SHIPPING_OPTIONS.map((opt) => (
            <div
              key={opt.name}
              className={`rounded-xl p-6 space-y-4 ${
                opt.highlight
                  ? 'border-2 border-[#7b5800] bg-surface-container-lowest sunlight-shadow'
                  : 'bg-surface-container-lowest sunlight-shadow'
              }`}
            >
              {opt.highlight && (
                <span className="honey-glow text-white label-caps rounded-full px-3 py-1 inline-block mb-1">
                  Most Popular
                </span>
              )}
              <div className="w-12 h-12 rounded-full bg-[#e0e5cc] flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-[#7b5800]"
                  style={{ fontSize: '22px', fontVariationSettings: "'wght' 200" }}
                >
                  {opt.icon}
                </span>
              </div>
              <div>
                <h3 className="font-headline text-lg text-[#1c1c19] mb-1">{opt.name}</h3>
                <p className="label-caps text-[#7b5800] font-bold text-base">{opt.cost}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1c1c19]">{opt.timeline}</p>
                <p className="text-xs text-on-surface-variant mt-1">{opt.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Processing note */}
      <section className="bg-[#f0ede8] px-6 md:px-20 py-16">
        <div className="max-w-3xl">
          <SectionLabel>Processing Time</SectionLabel>
          <h2 className="font-headline text-3xl text-[#1c1c19] mb-6">
            Hand-packed, not mass-distributed
          </h2>
          <p className="text-on-surface-variant leading-relaxed text-lg mb-6">
            Every Honey Bee order is individually packed in our Portland atelier with tissue,
            a handwritten care note, and compostable packaging. Orders placed before <strong className="text-[#1c1c19]">12pm PT Monday–Friday</strong> typically
            ship the same day. Orders placed after 12pm or on weekends ship the next business day.
          </p>
          <ul className="space-y-3">
            {[
              'Orders before 12pm PT → same-day dispatch',
              'Orders after 12pm PT → next business day dispatch',
              'Weekend orders → dispatch Monday',
              'Tracking email sent on dispatch',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-on-surface-variant">
                <span
                  className="material-symbols-outlined text-[#7b5800] flex-shrink-0"
                  style={{ fontSize: '16px', fontVariationSettings: "'wght' 300" }}
                >
                  check_circle
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FeatureStrip />

      {/* FAQ */}
      <section className="px-6 md:px-20 py-20">
        <div className="max-w-3xl mx-auto">
          <SectionLabel>Common Questions</SectionLabel>
          <h2 className="font-headline text-3xl text-[#1c1c19] mb-10">Shipping FAQs</h2>
          <div className="space-y-6">
            {FAQS.map((faq) => (
              <div key={faq.q} className="bg-surface-container-lowest rounded-xl sunlight-shadow p-6">
                <h3 className="font-semibold text-sm text-[#1c1c19] mb-3">{faq.q}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-[#f0ede8] px-6 md:px-20 py-16 text-center space-y-4">
        <SectionLabel className="text-center">Still have questions?</SectionLabel>
        <h2 className="font-headline text-3xl text-[#1c1c19]">
          We're here to <span className="italic font-normal text-[#7b5800]">help</span>
        </h2>
        <p className="text-on-surface-variant max-w-sm mx-auto text-sm leading-relaxed">
          Our team responds within one business day.
        </p>
        <Link
          href="/contact"
          className="inline-block honey-glow text-white font-label font-bold uppercase tracking-widest text-sm px-10 py-4 rounded-xl shadow-lg shadow-primary/10 hover:opacity-90 transition-opacity"
        >
          Contact Us
        </Link>
      </section>

    </main>
  );
}
