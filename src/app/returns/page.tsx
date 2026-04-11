/**
 * Honey Bee — Returns Policy Page (/returns)
 * Static brand content — no API needed
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SectionLabel } from '@/components/ui/SectionLabel';

export const metadata: Metadata = {
  title: 'Returns & Exchanges | Honey Bee Atelier',
  description:
    'Our 30-day return policy, exchange process, and guidance for damaged or defective orders at Honey Bee Atelier.',
};

const STEPS = [
  {
    step: '01',
    icon: 'mail',
    title: 'Contact Us',
    description:
      'Email hello@honeybee-atelier.com within 30 days of delivery with your order number and reason for return.',
  },
  {
    step: '02',
    icon: 'inventory_2',
    title: 'We Send a Label',
    description:
      'We\'ll email you a prepaid return shipping label. No printing hassle — just pack the item and drop it off.',
  },
  {
    step: '03',
    icon: 'local_shipping',
    title: 'Ship it Back',
    description:
      'Pack the item securely in its original packaging if possible. Drop off at any India Post or courier location.',
  },
  {
    step: '04',
    icon: 'account_balance_wallet',
    title: 'Refund Issued',
    description:
      'Once we receive and inspect the item, your refund is issued within 3–5 business days to your original payment method.',
  },
];

const FAQS = [
  {
    q: 'What can I return?',
    a: 'Unopened, unused soap bars in original packaging within 30 days of delivery. For hygiene reasons, opened or used bars cannot be returned unless defective or damaged.',
  },
  {
    q: 'What if I received a damaged item?',
    a: 'We\'re so sorry — please email us within 48 hours of delivery with a photo of the damage and your order number. We\'ll send a replacement at no cost to you, no return required.',
  },
  {
    q: 'Can I exchange for a different product?',
    a: 'Absolutely. Email us with the item you\'d like to exchange and what you\'d prefer instead. We process exchanges as a return + new order to get the replacement to you as quickly as possible.',
  },
  {
    q: 'I received the wrong item — what do I do?',
    a: 'We apologise for the mix-up. Email us within 7 days of delivery and we\'ll ship the correct item immediately with express shipping, on us.',
  },
  {
    q: 'How long until I receive my refund?',
    a: 'Refunds are issued within 3–5 business days of us receiving your return. Your bank or card provider may take an additional 2–5 days to post the credit to your account.',
  },
  {
    q: 'Are gift returns handled differently?',
    a: 'Yes — if you received a Honey Bee product as a gift and need to return it, we\'ll issue store credit rather than refunding the original payment method. Contact us and we\'ll take care of you.',
  },
];

export default function ReturnsPage() {
  return (
    <main className="max-w-[1920px] mx-auto">

      <div className="px-6 md:px-20 pt-12">
        <Breadcrumb
          items={[{ label: 'Home', href: '/' }, { label: 'Returns & Exchanges' }]}
        />
      </div>

      {/* Header */}
      <section className="px-6 md:px-20 pt-8 pb-16">
        <SectionLabel>Customer Care</SectionLabel>
        <h1 className="font-headline text-6xl md:text-7xl text-[#1c1c19] leading-tight mb-6">
          Returns &<br />
          <span className="italic font-normal text-[#7b5800]">Exchanges</span>
        </h1>
        <p className="text-on-surface-variant text-xl leading-relaxed max-w-2xl">
          We stand behind every bar we make. If something isn't right, we'll make it right —
          simple, human, no hoops.
        </p>
      </section>

      {/* Policy summary banner */}
      <section className="mx-6 md:mx-20 mb-16 bg-[#e0e5cc] rounded-xl p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        {[
          { icon: 'calendar_month', title: '30-Day Returns', desc: 'Return unused items within 30 days of delivery' },
          { icon: 'sync', title: 'Easy Exchanges', desc: 'Swap for any product in the range at no extra cost' },
          { icon: 'local_shipping', title: 'Free Return Label', desc: 'We cover return shipping for all eligible returns' },
        ].map((item) => (
          <div key={item.title} className="space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#7b5800]/10 flex items-center justify-center mx-auto">
              <span
                className="material-symbols-outlined text-[#7b5800]"
                style={{ fontSize: '24px', fontVariationSettings: "'wght' 200" }}
              >
                {item.icon}
              </span>
            </div>
            <h3 className="font-headline text-lg text-[#1c1c19]">{item.title}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* How it works */}
      <section className="px-6 md:px-20 pb-20">
        <SectionLabel>How It Works</SectionLabel>
        <h2 className="font-headline text-4xl text-[#1c1c19] mb-12">
          Four steps to a <span className="italic font-normal text-[#7b5800]">full refund</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step) => (
            <div key={step.step} className="bg-surface-container-lowest rounded-xl sunlight-shadow p-6 space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-headline text-4xl text-[#7b5800]/20">{step.step}</span>
                <div className="w-10 h-10 rounded-full bg-[#e0e5cc] flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-[#7b5800]"
                    style={{ fontSize: '18px', fontVariationSettings: "'wght' 200" }}
                  >
                    {step.icon}
                  </span>
                </div>
              </div>
              <h3 className="font-headline text-xl text-[#1c1c19]">{step.title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Non-returnable note */}
      <section className="bg-[#f0ede8] px-6 md:px-20 py-16">
        <div className="max-w-3xl">
          <SectionLabel>Please Note</SectionLabel>
          <h2 className="font-headline text-3xl text-[#1c1c19] mb-6">
            Items we can't accept back
          </h2>
          <ul className="space-y-3">
            {[
              'Opened or used soap bars (for hygiene reasons)',
              'Items returned after 30 days of delivery date',
              'Products not purchased from honeybee-atelier.com',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-on-surface-variant">
                <span
                  className="material-symbols-outlined text-error flex-shrink-0"
                  style={{ fontSize: '16px', fontVariationSettings: "'wght' 300" }}
                >
                  cancel
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm text-on-surface-variant mt-6 leading-relaxed">
            <strong className="text-[#1c1c19]">Exception:</strong> If your bar arrived damaged,
            defective, or incorrect, we'll replace it regardless of whether it's been opened —
            just contact us within 48 hours with a photo.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-20 py-20">
        <div className="max-w-3xl mx-auto">
          <SectionLabel>Common Questions</SectionLabel>
          <h2 className="font-headline text-3xl text-[#1c1c19] mb-10">Returns FAQs</h2>
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
        <SectionLabel className="text-center">Ready to start a return?</SectionLabel>
        <h2 className="font-headline text-3xl text-[#1c1c19]">
          We'll make it <span className="italic font-normal text-[#7b5800]">easy</span>
        </h2>
        <p className="text-on-surface-variant max-w-sm mx-auto text-sm leading-relaxed">
          Email us at hello@honeybee-atelier.com or use the contact form — our team responds
          within one business day.
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
