/**
 * Honey Bee — Journal Page (/journal)
 * "The Ritual Letter" — coming soon / signup state
 * Static — newsletter signup, no blog backend yet
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { NursePromiseBand } from '@/components/ui/NursePromiseBand';
import { NewsletterForm } from '@/components/ui/NewsletterForm';

export const metadata: Metadata = {
  title: 'The Journal | Honey Bee Atelier',
  description:
    'Slow beauty notes, ingredient stories, and ritual guides from the Honey Bee Atelier. Sign up to The Ritual Letter.',
  openGraph: {
    title: 'The Journal | Honey Bee Atelier',
    description: 'Slow beauty notes and ingredient stories from the Honey Bee atelier.',
  },
};

const COMING_TOPICS = [
  {
    icon: 'science',
    title: 'The Chemistry of Cold Process',
    teaser:
      'Why saponification at room temperature produces better glycerin — and why most commercial soaps wash it out.',
  },
  {
    icon: 'local_florist',
    title: 'Botanicals We Swear By',
    teaser:
      'A deep dive into the five plants that appear in more than half our range, and the clinical science behind each one.',
  },
  {
    icon: 'spa',
    title: 'Building a Morning Ritual',
    teaser:
      'How a 6-minute routine rooted in Ayurvedic cleansing philosophy can shift the tone of your entire day.',
  },
  {
    icon: 'eco',
    title: 'What "Natural" Really Means',
    teaser:
      "The label has no legal definition. Here's what we look for when sourcing ingredients and what questions to ask any brand.",
  },
  {
    icon: 'volunteer_activism',
    title: 'The Apiary Relationship',
    teaser:
      'A visit to the family-run apiary fifteen miles from our atelier that supplies every drop of honey in our range.',
  },
];

export default function JournalPage() {
  return (
    <main className="max-w-[1920px] mx-auto">

      <div className="px-6 md:px-20 pt-12">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Journal' }]} />
      </div>

      {/* Hero */}
      <section className="px-6 md:px-20 pt-8 pb-20">
        <SectionLabel>Slow Beauty</SectionLabel>
        <h1 className="font-headline text-6xl md:text-7xl text-[#1c1c19] leading-tight mb-6">
          The <span className="italic font-normal text-[#7b5800]">Journal</span>
        </h1>
        <p className="text-on-surface-variant text-xl leading-relaxed max-w-2xl">
          Ingredient stories, ritual guides, and the clinical science behind skincare that
          actually works. Written by Sarah — nurse, formulator, and deeply slow-beauty convert.
        </p>
      </section>

      {/* Newsletter signup — the main CTA */}
      <section className="bg-[#e0e5cc] px-6 md:px-20 py-20">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div>
            <SectionLabel className="text-center">Subscribe Free</SectionLabel>
            <h2 className="font-headline text-4xl md:text-5xl text-[#1c1c19] mt-2 leading-tight">
              The Ritual <span className="italic font-normal text-[#7b5800]">Letter</span>
            </h2>
            <p className="text-on-surface-variant text-lg leading-relaxed mt-4 max-w-lg mx-auto">
              A slow monthly letter — no noise, no filler. Just ingredient stories, new arrivals
              before they go public, and one ritual guide per issue.
            </p>
          </div>

          <NewsletterForm />

          <p className="text-xs text-on-surface-variant">
            Monthly only. Unsubscribe any time. We respect your inbox.
          </p>
        </div>
      </section>

      {/* Coming soon articles */}
      <section className="px-6 md:px-20 py-20">
        <div className="mb-12">
          <SectionLabel>Coming Soon</SectionLabel>
          <h2 className="font-headline text-4xl text-[#1c1c19]">
            First issues in <span className="italic font-normal text-[#7b5800]">production</span>
          </h2>
          <p className="text-on-surface-variant text-lg mt-4 max-w-xl leading-relaxed">
            Our first five journal entries are being written. Subscribe to The Ritual Letter
            and you'll get each one the moment it's published.
          </p>
        </div>

        <div className="space-y-5">
          {COMING_TOPICS.map((topic, i) => (
            <div
              key={topic.title}
              className="bg-surface-container-lowest rounded-xl sunlight-shadow p-6 flex items-start gap-5"
            >
              {/* Index + icon */}
              <div className="flex-shrink-0 flex flex-col items-center gap-2">
                <span className="font-headline text-3xl text-[#7b5800]/20 leading-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="w-10 h-10 rounded-full bg-[#e0e5cc] flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-[#7b5800]"
                    style={{ fontSize: '18px', fontVariationSettings: "'wght' 200" }}
                  >
                    {topic.icon}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="font-headline text-xl text-[#1c1c19]">{topic.title}</h3>
                  <span className="label-caps bg-surface-container text-on-surface-variant px-3 py-1 rounded-full">
                    Coming Soon
                  </span>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">{topic.teaser}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <NursePromiseBand
        quote="I write the same way I formulate — slowly, with intention, and only when I have something worth saying."
        attribution="Sarah J., Founder & ICU Nurse"
        eyebrow="The Writer's Note"
      />

      {/* Footer CTA */}
      <section className="px-6 md:px-20 py-20 text-center space-y-6">
        <SectionLabel className="text-center">While you wait</SectionLabel>
        <h2 className="font-headline text-3xl text-[#1c1c19]">
          Explore the <span className="italic font-normal text-[#7b5800]">collection</span>
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="honey-glow text-white font-label font-bold uppercase tracking-widest text-sm px-10 py-4 rounded-xl shadow-lg shadow-primary/10 hover:opacity-90 transition-opacity"
          >
            Shop All Soaps
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
