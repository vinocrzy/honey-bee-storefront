/**
 * Honey Bee — Our Story Page (/our-story)
 * Stitch "Luminous Alchemist" — Founder's journey + process + promise
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { NursePromiseBand } from '@/components/ui/NursePromiseBand';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { FeatureStrip } from '@/components/ui/FeatureStrip';

export const metadata: Metadata = {
  title: 'Our Story | Honey Bee Atelier',
  description: 'From ICU nurse to artisan soap maker. How fifteen years of clinical practice inspired a gentler kind of skin care.',
  openGraph: {
    title: 'Our Story | Honey Bee Atelier',
    description: 'From ICU nurse to artisan soap maker.',
  },
};

const PROCESS_STEPS = [
  { icon: 'science', title: 'Formulation', description: 'Every recipe is clinically reviewed for pH balance and skin barrier compatibility before a single bar is poured.' },
  { icon: 'local_florist', title: 'Botanical Sourcing', description: 'We source directly from small organic farms — honey from local apiaries, botanicals from ethical cooperatives.' },
  { icon: 'thermostat', title: 'Cold Process', description: 'No heat shortcuts. Cold-process saponification preserves every nutrient and creates naturally glycerin-rich bars.' },
  { icon: 'calendar_month', title: 'Six-Week Cure', description: 'Each bar rests for six weeks in our atelier — hardening, mellowing, and developing a richer, longer-lasting lather.' },
];

export default function OurStoryPage() {
  return (
    <main className="max-w-[1920px] mx-auto">

      {/* ── Founder Hero ── */}
      <section className="px-6 md:px-20 pt-12 pb-24 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-6 z-10">
          <SectionLabel>From Clinical to Craft</SectionLabel>
          <h1 className="font-headline text-5xl md:text-7xl text-[#1c1c19] leading-tight mb-8">
            The Founder&apos;s<br />
            <span className="italic font-normal">Journey</span>
          </h1>
          <p className="text-lg text-on-surface-variant leading-relaxed mb-10 max-w-xl">
            For fifteen years, Sarah worked the night shift as a critical care nurse. In the sterile, high-stakes environment of the ICU, she found solace in the science of healing — but her own skin, ravaged by clinical detergents and stress, cried out for a gentler kind of care.
          </p>
          <div className="flex items-center gap-6 flex-wrap">
            <Link
              href="/products"
              className="honey-glow px-8 py-4 rounded-xl text-white font-label font-bold tracking-wider uppercase text-sm shadow-xl shadow-primary/10 hover:opacity-90 transition-opacity"
            >
              Shop the Collection
            </Link>
            <Link
              href="/process"
              className="text-primary font-label font-semibold uppercase tracking-widest text-sm hover:underline underline-offset-4"
            >
              Our Process →
            </Link>
          </div>
        </div>

        <div className="md:col-span-6 relative">
          <div className="aspect-[4/5] overflow-hidden rounded-xl">
            <Image
              src="https://images.unsplash.com/photo-1595274459742-4a41d35784b4?w=800&auto=format&fit=crop"
              alt="Sarah, founder of Honey Bee Atelier, in the soap atelier"
              width={800}
              height={1000}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          {/* Pull-quote overlay */}
          <div className="absolute bottom-8 left-8 right-8 bg-surface-container-lowest/90 backdrop-blur-sm p-6 rounded-xl">
            <p className="font-headline text-lg italic text-[#1c1c19] leading-relaxed">
              &ldquo;I wanted to make something that healed, not just cleaned.&rdquo;
            </p>
            <p className="label-caps text-primary mt-3">— Sarah J., Founder</p>
          </div>
        </div>
      </section>

      {/* ── Process Steps ── */}
      <section className="bg-secondary-container/30 px-6 md:px-20 py-24">
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
          <SectionLabel>The Method</SectionLabel>
          <h2 className="font-headline text-4xl md:text-5xl text-[#1c1c19]">
            How We Make Every Bar
          </h2>
          <p className="text-on-surface-variant leading-relaxed text-lg max-w-2xl mx-auto">
            No shortcuts. Every step is deliberate, every ingredient purposeful.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((step, i) => (
            <div key={step.title} className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontSize: '28px', fontVariationSettings: "'wght' 200" }}
                >
                  {step.icon}
                </span>
              </div>
              <p className="label-caps text-primary font-bold">Step {i + 1}</p>
              <h3 className="font-headline text-xl text-[#1c1c19]">{step.title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Radical Sourcing ── */}
      <section className="px-6 md:px-20 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="aspect-[4/3] overflow-hidden rounded-xl order-last md:order-first">
          <Image
            src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&auto=format&fit=crop"
            alt="Organic botanicals and honey sourced for Honey Bee soaps"
            width={800}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-6">
          <SectionLabel>Radical Transparency</SectionLabel>
          <h2 className="font-headline text-4xl text-[#1c1c19] leading-tight">
            We Know Every Farm,<br />
            <span className="italic font-normal">Every Apiary</span>
          </h2>
          <p className="text-on-surface-variant leading-relaxed text-lg">
            Our honey comes from a single family-run apiary fifteen miles from our atelier. Our botanicals are sourced from certified organic cooperatives with living wage policies. We believe radical transparency isn&apos;t a feature — it&apos;s the baseline.
          </p>
          <ul className="space-y-3">
            {['Certified Organic Ingredients', 'Direct Farm Relationships', 'Living Wage Suppliers', 'Zero Synthetic Fragrances'].map(item => (
              <li key={item} className="flex items-center gap-3 text-sm text-on-surface-variant">
                <span
                  className="material-symbols-outlined text-primary"
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

      {/* ── Nurse's Promise Band ── */}
      <NursePromiseBand
        quote="I spent fifteen years keeping people alive. Now I spend my days making products that help skin thrive. The science is the same. The love is deeper."
        attribution="Sarah J., RN — Founder & Lead Formulator"
        eyebrow="THE NURSE'S PROMISE"
      />

      {/* ── Feature Strip ── */}
      <FeatureStrip />

      {/* ── Shop CTA ── */}
      <section className="px-6 md:px-20 py-24 text-center space-y-6">
        <SectionLabel className="text-center">Ready to Begin?</SectionLabel>
        <h2 className="font-headline text-4xl md:text-5xl text-[#1c1c19]">
          Find Your Perfect Bar
        </h2>
        <p className="text-on-surface-variant text-lg max-w-xl mx-auto">
          Browse our full collection of cold-process soaps and discover the one made for your skin.
        </p>
        <Link
          href="/products"
          className="honey-glow inline-block text-white font-label font-bold uppercase tracking-widest text-sm px-10 py-5 rounded-xl shadow-lg shadow-primary/10 hover:opacity-90 transition-opacity mt-4"
        >
          Shop the Collection
        </Link>
      </section>

    </main>
  );
}
