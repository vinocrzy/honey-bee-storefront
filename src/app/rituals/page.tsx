/**
 * Honey Bee — Rituals Page (/rituals)
 * Curated ritual bundles + step-by-step daily ritual guide
 * Static content — no API. Links to real products.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { NursePromiseBand } from '@/components/ui/NursePromiseBand';
import { FeatureStrip } from '@/components/ui/FeatureStrip';

export const metadata: Metadata = {
  title: 'Rituals | Honey Bee Atelier',
  description:
    'Curated Ayurvedic cleansing rituals using Honey Bee artisan soaps. Morning, evening, and weekly deep-cleanse routines.',
  openGraph: {
    title: 'Rituals | Honey Bee Atelier',
    description: 'Ayurvedic cleansing rituals using Honey Bee artisan soaps.',
  },
};

const RITUALS = [
  {
    id: 'morning',
    icon: 'wb_sunny',
    label: 'Morning',
    title: 'The Awakening Ritual',
    duration: '6 minutes',
    mood: 'Energising · Grounding',
    description:
      'Begin with cool water to close pores and awaken circulation. A cold-process bar rich in citrus botanicals clears the night — without stripping the skin barrier.',
    steps: [
      'Splash face with cool water for 30 seconds',
      'Lather with your Honey Bee morning bar for 60 seconds',
      'Rinse thoroughly, leaving no residue',
      'Pat — never rub — dry with a clean towel',
      'Allow skin to rest for 2 minutes before applying anything else',
    ],
    recommended: 'Peppermint & Eucalyptus Revival',
    recommendedSlug: 'peppermint-eucalyptus-revival',
    image:
      'https://images.unsplash.com/photo-1607006479523-5d6fff45ddc7?w=800&auto=format&fit=crop',
    imageAlt: 'Morning soap ritual with botanical bar',
    bg: '',
  },
  {
    id: 'evening',
    icon: 'nightlight',
    label: 'Evening',
    title: 'The Restoration Ritual',
    duration: '8 minutes',
    mood: 'Calming · Nourishing',
    description:
      'The evening is when your skin repairs itself. A rich, honey-based bar removes the day while depositing natural glycerin that works overnight. No rinsing off what your skin needs.',
    steps: [
      'Begin with warm (not hot) water to open pores gently',
      'Lather twice — first pass removes surface grime, second pass nourishes',
      'Leave the second lather on for 90 seconds before rinsing',
      'Rinse with progressively cooler water to close pores',
      'Finish with a single drop of face oil while skin is still slightly damp',
    ],
    recommended: 'Wildflower & Honey Bar',
    recommendedSlug: 'wildflower-honey-bar',
    image:
      'https://images.unsplash.com/photo-1600857544200-b2f468e9b2b1?w=800&auto=format&fit=crop',
    imageAlt: 'Evening restoration ritual with honey bar',
    bg: 'bg-[#f0ede8]',
  },
  {
    id: 'weekly',
    icon: 'spa',
    label: 'Weekly',
    title: 'The Deep Cleanse Ritual',
    duration: '15 minutes',
    mood: 'Purifying · Renewing',
    description:
      'Once a week, go deeper. A charcoal or turmeric-based bar draws out accumulated impurities while exfoliating botanicals resurface the skin. The Ayurvedic weekly cleanse is the cornerstone of the atelier\'s philosophy.',
    steps: [
      'Steam face for 3 minutes with a warm, damp cloth',
      'Apply the Honey Bee detox bar to damp skin in slow circular motions',
      'Leave the lather on for 3 minutes as a mask',
      'Rinse slowly with warm water, using fingertips to gently exfoliate',
      'Final rinse with cold water — hold for 30 seconds',
      'Rest skin for 5 minutes before applying any product',
    ],
    recommended: 'Charcoal & Cedar Detox',
    recommendedSlug: 'charcoal-cedar-detox',
    image:
      'https://images.unsplash.com/photo-1601612628452-9e99ced43524?w=800&auto=format&fit=crop',
    imageAlt: 'Weekly deep cleanse ritual with detox bar',
    bg: '',
  },
];

export default function RitualsPage() {
  return (
    <main className="max-w-[1920px] mx-auto">

      <div className="px-6 md:px-20 pt-12">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Rituals' }]} />
      </div>

      {/* Hero */}
      <section className="px-6 md:px-20 pt-8 pb-20">
        <SectionLabel>Daily Practice</SectionLabel>
        <h1 className="font-headline text-6xl md:text-7xl text-[#1c1c19] leading-tight mb-6">
          Cleansing <span className="italic font-normal text-[#7b5800]">Rituals</span>
        </h1>
        <p className="text-on-surface-variant text-xl leading-relaxed max-w-2xl">
          A bar of soap is not a product — it is the foundation of a ritual. Rooted in
          5,000 years of Ayurvedic practice, refined by fifteen years of clinical skincare
          knowledge.
        </p>
      </section>

      {/* Philosophy band */}
      <section className="bg-[#e0e5cc] px-6 md:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl">
          {[
            { icon: 'water_drop', title: 'Temperature Matters', desc: 'Warm water opens pores and softens the skin barrier. Cold water closes and tones. Most rituals use both intentionally.' },
            { icon: 'timer', title: 'Time is the Ingredient', desc: 'Most people rinse off soap in under 10 seconds. Our rituals allow the botanical actives 60–90 seconds of skin contact.' },
            { icon: 'science', title: 'Double Cleanse', desc: 'The first lather removes surface impurities. The second lather delivers actives to clean skin. One lather is not enough.' },
          ].map((item) => (
            <div key={item.title} className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#7b5800]/10 flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-[#7b5800]"
                  style={{ fontSize: '22px', fontVariationSettings: "'wght' 200" }}
                >
                  {item.icon}
                </span>
              </div>
              <h3 className="font-headline text-xl text-[#1c1c19]">{item.title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ritual cards — alternating */}
      {RITUALS.map((ritual) => (
        <section key={ritual.id} className={`px-6 md:px-20 py-20 ${ritual.bg}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Image */}
            <div className="aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src={ritual.image}
                alt={ritual.imageAlt}
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#e0e5cc] flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-[#7b5800]"
                    style={{ fontSize: '18px', fontVariationSettings: "'wght' 200" }}
                  >
                    {ritual.icon}
                  </span>
                </div>
                <SectionLabel>{ritual.label} Ritual</SectionLabel>
              </div>

              <div>
                <div className="flex items-center gap-4 mb-3">
                  <h2 className="font-headline text-4xl text-[#1c1c19]">{ritual.title}</h2>
                </div>
                <div className="flex items-center gap-4 mb-5">
                  <span className="label-caps text-[#7b5800] bg-[#e0e5cc] px-3 py-1 rounded-full">
                    {ritual.duration}
                  </span>
                  <span className="label-caps text-on-surface-variant">{ritual.mood}</span>
                </div>
                <p className="text-on-surface-variant leading-relaxed text-lg">{ritual.description}</p>
              </div>

              {/* Steps */}
              <div>
                <p className="label-caps text-[#7b5800] mb-4 font-bold">The Steps</p>
                <ol className="space-y-3">
                  {ritual.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-on-surface-variant">
                      <span className="font-headline text-[#7b5800]/40 text-lg leading-tight flex-shrink-0 w-5">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Recommended product */}
              <div className="bg-surface-container-lowest rounded-xl sunlight-shadow p-5 flex items-center gap-4">
                <span
                  className="material-symbols-outlined text-[#7b5800]"
                  style={{ fontSize: '24px', fontVariationSettings: "'wght' 200" }}
                >
                  recommend
                </span>
                <div className="flex-1">
                  <p className="label-caps text-on-surface-variant mb-1">Recommended for this ritual</p>
                  <p className="font-semibold text-sm text-[#1c1c19]">{ritual.recommended}</p>
                </div>
                <Link
                  href={`/products/${ritual.recommendedSlug}`}
                  className="honey-glow text-white font-label font-bold uppercase tracking-widest text-xs px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity flex-shrink-0"
                >
                  Shop
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      <NursePromiseBand
        quote="A ritual is not about how much time you have — it's about how present you are in the time you give."
        attribution="Sarah J., Founder"
        eyebrow="The Practice"
      />

      <FeatureStrip />

      {/* Shop CTA */}
      <section className="px-6 md:px-20 py-20 text-center space-y-6">
        <SectionLabel className="text-center">Build your ritual</SectionLabel>
        <h2 className="font-headline text-4xl text-[#1c1c19]">
          Find the right <span className="italic font-normal text-[#7b5800]">bar for you</span>
        </h2>
        <Link
          href="/products"
          className="honey-glow inline-block text-white font-label font-bold uppercase tracking-widest text-sm px-10 py-4 rounded-xl shadow-lg shadow-primary/10 hover:opacity-90 transition-opacity"
        >
          Shop All Soaps
        </Link>
      </section>

    </main>
  );
}
