/**
 * Honey Bee — The Process Page (/process)
 * Stitch "Luminous Alchemist" — cold-process soap making method
 * Static brand content — no API needed
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { NursePromiseBand } from '@/components/ui/NursePromiseBand';

export const metadata: Metadata = {
  title: 'The Process | Honey Bee Atelier',
  description:
    'Learn how every Honey Bee bar is made — cold-process saponification, six-week cure, and botanical sourcing from farm to atelier.',
  openGraph: {
    title: 'The Process | Honey Bee Atelier',
    description: 'Cold-process craftsmanship from botanical sourcing to six-week cure.',
  },
};

const PROCESS_STEPS = [
  {
    step: '01',
    icon: 'science',
    title: 'Formulation',
    heading: 'Every recipe starts in the lab',
    body: 'Before a single bar is poured, each formula is clinically reviewed for pH balance, skin barrier compatibility, and ingredient synergy. Sarah draws on fifteen years of clinical practice to ensure every bar is as effective as it is beautiful.',
    image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&auto=format&fit=crop',
    imageAlt: 'Soap formulation notes and botanical samples',
  },
  {
    step: '02',
    icon: 'local_florist',
    title: 'Botanical Sourcing',
    heading: 'We know every farm, every apiary',
    body: 'Our honey comes from a single family-run apiary fifteen miles from our atelier. Botanicals are sourced from certified organic cooperatives with living wage policies. Zero synthetic fragrances — ever. If we can\'t trace it, it doesn\'t go in the bar.',
    image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&auto=format&fit=crop',
    imageAlt: 'Organic botanicals and raw honey laid out for sourcing',
  },
  {
    step: '03',
    icon: 'thermostat',
    title: 'Cold Process',
    heading: 'No heat shortcuts',
    body: 'Cold-process saponification combines plant oils and lye at room temperature — never heated. This slow reaction preserves every nutrient, locks in natural glycerin, and creates a bar with far greater skin benefits than any commercial alternative. It takes more time. It\'s worth it.',
    image: 'https://images.unsplash.com/photo-1601612628452-9e99ced43524?w=800&auto=format&fit=crop',
    imageAlt: 'Artisan soap being poured into wooden molds',
  },
  {
    step: '04',
    icon: 'calendar_month',
    title: 'Six-Week Cure',
    heading: 'Patience is the final ingredient',
    body: 'After pouring, every bar rests for six weeks in our atelier — hardening, mellowing, and developing a richer, longer-lasting lather. We test each batch before release. There is no rushing the cure. This is the part no machine can replicate.',
    image: 'https://images.unsplash.com/photo-1600857544200-b2f468e9b2b1?w=800&auto=format&fit=crop',
    imageAlt: 'Rows of curing soap bars on wooden shelves',
  },
];

const CERTIFICATIONS = [
  { icon: 'eco', label: 'Certified Organic Ingredients' },
  { icon: 'spa', label: 'Cruelty-Free & Vegan' },
  { icon: 'recycling', label: 'Plastic-Free Packaging' },
  { icon: 'verified', label: 'Zero Synthetic Fragrances' },
  { icon: 'science', label: 'Clinically pH-Reviewed' },
  { icon: 'volunteer_activism', label: 'Living Wage Suppliers' },
];

export default function ProcessPage() {
  return (
    <main className="max-w-[1920px] mx-auto">

      <div className="px-6 md:px-20 pt-12">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Our Story', href: '/our-story' },
            { label: 'The Process' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="px-6 md:px-20 pt-8 pb-20">
        <div className="max-w-3xl">
          <SectionLabel>Craftsmanship</SectionLabel>
          <h1 className="font-headline text-6xl md:text-7xl text-[#1c1c19] leading-tight mb-8">
            The <span className="italic font-normal text-[#7b5800]">Process</span>
          </h1>
          <p className="text-on-surface-variant text-xl leading-relaxed max-w-2xl">
            Four stages. Six weeks minimum. Zero shortcuts. This is what it takes to make soap
            that actually does what it promises.
          </p>
        </div>
      </section>

      {/* Process steps — alternating layout */}
      {PROCESS_STEPS.map((step, i) => (
        <section
          key={step.step}
          className={`px-6 md:px-20 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center ${
            i % 2 === 0 ? '' : 'bg-[#f0ede8]'
          }`}
        >
          {/* Image — alternates side */}
          <div className={`aspect-[4/3] overflow-hidden rounded-xl ${i % 2 !== 0 ? 'order-last md:order-first' : ''}`}>
            <Image
              src={step.image}
              alt={step.imageAlt}
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="font-headline text-6xl text-[#7b5800]/20 leading-none">{step.step}</span>
              <div className="w-12 h-12 rounded-full bg-[#e0e5cc] flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-[#7b5800]"
                  style={{ fontSize: '22px', fontVariationSettings: "'wght' 200" }}
                >
                  {step.icon}
                </span>
              </div>
            </div>
            <div>
              <SectionLabel>{step.title}</SectionLabel>
              <h2 className="font-headline text-4xl text-[#1c1c19] leading-tight mb-5">
                {step.heading}
              </h2>
              <p className="text-on-surface-variant text-lg leading-relaxed">{step.body}</p>
            </div>
          </div>
        </section>
      ))}

      {/* Certifications strip */}
      <section className="bg-[#e0e5cc] px-6 md:px-20 py-20">
        <div className="text-center mb-14">
          <SectionLabel>Our Standards</SectionLabel>
          <h2 className="font-headline text-4xl text-[#1c1c19]">
            What We Commit <span className="italic font-normal">To</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-5xl mx-auto">
          {CERTIFICATIONS.map((cert) => (
            <div key={cert.label} className="text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-white/60 flex items-center justify-center mx-auto">
                <span
                  className="material-symbols-outlined text-[#7b5800]"
                  style={{ fontSize: '24px', fontVariationSettings: "'wght' 200" }}
                >
                  {cert.icon}
                </span>
              </div>
              <p className="text-xs text-[#4f4634] font-medium leading-tight text-center">{cert.label}</p>
            </div>
          ))}
        </div>
      </section>

      <NursePromiseBand
        quote="I spent fifteen years keeping people alive. Now I spend my days making products that help skin thrive. The science is the same. The love is deeper."
        attribution="Sarah J., RN — Founder & Lead Formulator"
      />

      {/* CTA */}
      <section className="px-6 md:px-20 py-20 text-center space-y-6">
        <SectionLabel className="text-center">See the results</SectionLabel>
        <h2 className="font-headline text-4xl text-[#1c1c19]">
          Ready to experience it for <span className="italic font-normal text-[#7b5800]">yourself?</span>
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="honey-glow text-white font-label font-bold uppercase tracking-widest text-sm px-10 py-4 rounded-xl shadow-lg shadow-primary/10 hover:opacity-90 transition-opacity"
          >
            Shop the Collection
          </Link>
          <Link
            href="/our-story"
            className="border border-[#7b5800] text-[#7b5800] font-label font-bold uppercase tracking-widest text-sm px-10 py-4 rounded-xl hover:bg-[#7b5800] hover:text-white transition-all"
          >
            Our Story →
          </Link>
        </div>
      </section>

    </main>
  );
}
