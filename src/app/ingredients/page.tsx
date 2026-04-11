/**
 * Honey Bee — Ingredients Page (/ingredients)
 * Glossary of hero botanicals used across the soap range
 * Static content — no API required.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { NursePromiseBand } from '@/components/ui/NursePromiseBand';
import { FeatureStrip } from '@/components/ui/FeatureStrip';

export const metadata: Metadata = {
  title: 'Ingredients | Honey Bee Atelier',
  description:
    'The hero botanicals behind every Honey Bee bar. Raw wildflower honey, shea butter, activated charcoal, turmeric, lavender — each chosen for clinical skin benefit.',
  openGraph: {
    title: 'Ingredients | Honey Bee Atelier',
    description: 'The botanicals behind every Honey Bee bar. Sourced with purpose, never by convenience.',
  },
};

const INGREDIENT_CATEGORIES = [
  {
    id: 'humectants',
    label: 'Humectants & Occlusives',
    icon: 'water_drop',
    description: 'Draw moisture in and lock it there. The foundation of every Honey Bee formula.',
  },
  {
    id: 'actives',
    label: 'Botanical Actives',
    icon: 'spa',
    description: 'Clinically-relevant botanicals chosen for targeted skin benefit — not fragrance.',
  },
  {
    id: 'cleansers',
    label: 'Base Oils & Saponified Fats',
    icon: 'science',
    description: 'The chemistry of cold-process soap: oils saponified at low temperature to preserve their natural fatty acid profile.',
  },
];

const INGREDIENTS = [
  {
    category: 'humectants',
    icon: 'emoji_nature',
    name: 'Raw Wildflower Honey',
    source: 'Oregon Willamette Valley',
    skin: 'All skin types',
    tag: 'Humectant',
    description:
      'Never refined or heat-treated. Raw honey retains its full enzymatic content — gluconic acid gently resurfaces while hydrogen peroxide provides mild antibacterial action. The humectant capacity of raw honey exceeds that of refined honey by 3×.',
    benefit: 'Resurfacing · Antibacterial · Moisture-binding',
    color: '#f0c040',
  },
  {
    category: 'humectants',
    icon: 'grass',
    name: 'Shea Butter',
    source: 'Unrefined, Ghana',
    skin: 'Dry, sensitive',
    tag: 'Occlusive',
    description:
      'Grade A unrefined shea — not the white, odourless version common in commercial soap. The natural nutty note you sometimes detect in our bars is the triterpene compounds that clinical research links to anti-inflammatory activity.',
    benefit: 'Anti-inflammatory · Deep occlusion · Barrier repair',
    color: '#e8d5a3',
  },
  {
    category: 'actives',
    icon: 'local_florist',
    name: 'Lavender',
    source: 'Certified Organic, Provence',
    skin: 'Sensitive, reactive',
    tag: 'Active',
    description:
      'Not all lavender is equal. We use Lavandula angustifolia — the high-altitude narrow-leaved species — which contains significantly less camphor than the hybrid lavandin common in fragrance-focused products. Linalool + linalyl acetate at therapeutic concentrations.',
    benefit: 'Calming · Antimicrobial · Light sedative effect',
    color: '#9b8fcc',
  },
  {
    category: 'actives',
    icon: 'opacity',
    name: 'Activated Charcoal',
    source: 'Coconut shell-derived, food-grade',
    skin: 'Oily, combination, congested',
    tag: 'Active',
    description:
      'Food-grade activated coconut charcoal offers a surface area of roughly 1,000 m²/g — meaning a teaspoon of charcoal has the absorption surface of a football field. At the correct concentration in a cold-process bar, it draws pore contents without dehydrating.',
    benefit: 'Pore-clearing · Sebum-balancing · Detoxifying',
    color: '#2d2d2d',
  },
  {
    category: 'actives',
    icon: 'sunny',
    name: 'Turmeric',
    source: 'Heirloom Kasturi, South India',
    skin: 'Uneven tone, post-inflammatory',
    tag: 'Active',
    description:
      'We source Kasturi turmeric (Curcuma aromatica), which is lower in the curcumin compound responsible for skin staining and higher in the volatile oils that give it its unique anti-inflammatory profile. Gentle brightening without the yellow tint.',
    benefit: 'Brightening · Anti-inflammatory · Antioxidant',
    color: '#f59e0b',
  },
  {
    category: 'actives',
    icon: 'eco',
    name: 'Neem',
    source: 'Cold-pressed, Tamil Nadu',
    skin: 'Acne-prone, oily',
    tag: 'Active',
    description:
      'Neem oil is among the most clinically documented botanical antibacterials in Ayurvedic pharmacology. Its fatty acid profile — high in linoleic and oleic acid — also makes it a useful emollient for inflamed skin. We use it with restraint — enough to be effective, not enough to dominate the bar.',
    benefit: 'Antibacterial · Anti-fungal · Anti-acne',
    color: '#84cc16',
  },
  {
    category: 'actives',
    icon: 'local_florist',
    name: 'Rose Geranium',
    source: 'Steam-distilled, Réunion Island',
    skin: 'Mature, dehydrated',
    tag: 'Active',
    description:
      'Pelargonium graveolens is one of the few essential oils with clinically documented skin-tightening properties. Its effect on skin geraniol receptors is gentle and cumulative — you notice it over weeks, not immediately. Also considered one of the most emotionally balancing aromatics in botanical practice.',
    benefit: 'Toning · Balancing · Gently astringent',
    color: '#ec4899',
  },
  {
    category: 'actives',
    icon: 'stars',
    name: 'Colloidal Oat',
    source: 'Certified Organic, Pacific NW',
    skin: 'Eczema, psoriasis, highly reactive',
    tag: 'Active',
    description:
      'Oatmeal is one of only a handful of botanicals the FDA classifies as an effective skin protectant. The avenanthramides in colloidal oat are among the strongest plant-derived anti-itch compounds known. We mill to colloidal fineness in-house — the particle size matters for barrier function.',
    benefit: 'Anti-itch · Barrier-protective · Anti-inflammatory',
    color: '#d4a574',
  },
  {
    category: 'cleansers',
    icon: 'water',
    name: 'Cold-Pressed Olive Oil',
    source: 'Extra Virgin, Greece',
    skin: 'All, especially mature',
    tag: 'Base Oil',
    description:
      'Saponified olive oil (sodium olivate) creates a soap with some of the closest skin-affinity of any natural cleanser. At high concentrations it creates a translucent, conditioning bar with slow lather — exactly the profile we want for facial soaps. We use no refined pomace olive oil, only cold-pressed extra virgin.',
    benefit: 'Conditioning · High oleic · Skin-affine cleansing',
    color: '#8fb339',
  },
  {
    category: 'cleansers',
    icon: 'water',
    name: 'Coconut Oil',
    source: 'Organic, Virgin, Philippines',
    skin: 'Normal, oily',
    tag: 'Base Oil',
    description:
      'Saponified coconut (sodium cocoate) creates the lather that olive oil lacks. The ratio of coconut to olive oil in a cold-process formula directly determines lather richness vs. skin-conditioning balance. We adjust this ratio for each bar — never a one-size-fits-all formula.',
    benefit: 'Rich lather · Cleansing · Antifungal profile',
    color: '#f5f0e0',
  },
  {
    category: 'actives',
    icon: 'air',
    name: 'Peppermint',
    source: 'Organic, Willamette Valley',
    skin: 'Normal, oily',
    tag: 'Active',
    description:
      'Menthol activates the TRPM8 cold receptor in the skin, producing a cooling and mildly vasoconstrictive effect. This translates to reduced redness and a visible tightening of pores — without any actual temperature change. Most effective in morning bars when skin is sluggish.',
    benefit: 'Cooling · Pore-tightening · Energising',
    color: '#10b981',
  },
  {
    category: 'actives',
    icon: 'forest',
    name: 'Eucalyptus',
    source: 'Steam-distilled, Eucalyptus globulus',
    skin: 'Congested, oily',
    tag: 'Active',
    description:
      '1,8-cineole — the dominant compound in eucalyptus — is a recognised expectorant and antimicrobial. On skin, it works as an accelerant: driving other active botanicals deeper into the epidermis while providing its own mild antibacterial and decongesting benefit.',
    benefit: 'Antimicrobial · Penetration-enhancing · Clearing',
    color: '#059669',
  },
];

const TAG_COLORS: Record<string, string> = {
  Humectant: 'bg-[#fef3c7] text-[#92400e]',
  Occlusive: 'bg-[#ede9fe] text-[#5b21b6]',
  Active: 'bg-[#dcfce7] text-[#166534]',
  'Base Oil': 'bg-[#dbeafe] text-[#1e40af]',
};

export default function IngredientsPage() {
  const grouped = INGREDIENT_CATEGORIES.map((cat) => ({
    ...cat,
    items: INGREDIENTS.filter((i) => i.category === cat.id),
  }));

  return (
    <main className="max-w-[1920px] mx-auto">

      <div className="px-6 md:px-20 pt-12">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Ingredients' }]} />
      </div>

      {/* Hero */}
      <section className="px-6 md:px-20 pt-8 pb-20">
        <SectionLabel>Sourced with purpose</SectionLabel>
        <h1 className="font-headline text-6xl md:text-7xl text-[#1c1c19] leading-tight mb-6">
          The <span className="italic font-normal text-[#7b5800]">Botanicals</span>
        </h1>
        <p className="text-on-surface-variant text-xl leading-relaxed max-w-2xl">
          Every ingredient in a Honey Bee bar is here for a reason. No filler synthetics.
          No fragrance compounds dressed up as actives. This is the full glossary.
        </p>
      </section>

      {/* Stats band */}
      <section className="bg-[#e0e5cc] px-6 md:px-20 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl">
          {[
            { num: '100%', label: 'Natural origin' },
            { num: '0', label: 'Synthetic fragrance compounds' },
            { num: '12', label: 'Hero botanicals' },
            { num: '7+', label: 'Certified organic ingredients' },
          ].map((s) => (
            <div key={s.label} className="space-y-1">
              <p className="font-headline text-4xl text-[#7b5800]">{s.num}</p>
              <p className="label-caps text-on-surface-variant">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Grouped ingredient sections */}
      {grouped.map((group) => (
        <section key={group.id} className="px-6 md:px-20 py-20">
          {/* Group header */}
          <div className="flex items-start gap-5 mb-12">
            <div className="w-12 h-12 rounded-full bg-[#e0e5cc] flex items-center justify-center flex-shrink-0 mt-1">
              <span
                className="material-symbols-outlined text-[#7b5800]"
                style={{ fontSize: '22px', fontVariationSettings: "'wght' 200" }}
              >
                {group.icon}
              </span>
            </div>
            <div>
              <SectionLabel>{group.label}</SectionLabel>
              <p className="text-on-surface-variant text-base leading-relaxed max-w-xl mt-1">
                {group.description}
              </p>
            </div>
          </div>

          {/* Ingredient cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {group.items.map((ingredient) => (
              <article
                key={ingredient.name}
                className="rounded-xl sunlight-shadow bg-white p-6 space-y-4 flex flex-col"
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* Colour swatch instead of image */}
                    <div
                      className="w-10 h-10 rounded-full flex-shrink-0 border border-black/5"
                      style={{ backgroundColor: ingredient.color }}
                    />
                    <div>
                      <h3 className="font-headline text-xl text-[#1c1c19] leading-tight">
                        {ingredient.name}
                      </h3>
                      <p className="text-xs text-on-surface-variant mt-0.5">{ingredient.source}</p>
                    </div>
                  </div>
                  <span
                    className={`label-caps px-2.5 py-1 rounded-full flex-shrink-0 text-[10px] ${
                      TAG_COLORS[ingredient.tag] ?? 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {ingredient.tag}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-on-surface-variant leading-relaxed flex-1">
                  {ingredient.description}
                </p>

                {/* Bottom meta */}
                <div className="pt-3 border-t border-[#f0ede8] space-y-2">
                  <div className="flex items-start gap-2">
                    <span
                      className="material-symbols-outlined text-[#7b5800]"
                      style={{ fontSize: '16px', fontVariationSettings: "'wght' 200" }}
                    >
                      check_circle
                    </span>
                    <p className="text-xs text-[#1c1c19] font-medium leading-snug">
                      {ingredient.benefit}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="material-symbols-outlined text-on-surface-variant"
                      style={{ fontSize: '14px', fontVariationSettings: "'wght' 200" }}
                    >
                      person
                    </span>
                    <p className="text-xs text-on-surface-variant">Best for: {ingredient.skin}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      <NursePromiseBand
        quote="I don't use an ingredient unless I can explain exactly what it does, and why it belongs in that formula. Vague 'natural' is not good enough."
        attribution="Sarah J., Founder & Formulator"
        eyebrow="The Formulator's Note"
      />

      <FeatureStrip />

      {/* CTA */}
      <section className="px-6 md:px-20 py-20 bg-[#f0ede8]">
        <div className="max-w-xl">
          <SectionLabel>See the ingredients in action</SectionLabel>
          <h2 className="font-headline text-4xl text-[#1c1c19] mt-3 mb-4">
            Find your <span className="italic font-normal text-[#7b5800]">perfect bar</span>
          </h2>
          <p className="text-on-surface-variant leading-relaxed mb-8">
            Each bar lists its key botanicals. Use the shop to filter by ingredient, skin concern, or ritual.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/products"
              className="honey-glow text-white font-label font-bold uppercase tracking-widest text-sm px-10 py-4 rounded-xl shadow-lg shadow-primary/10 hover:opacity-90 transition-opacity"
            >
              Shop All Soaps
            </Link>
            <Link
              href="/rituals"
              className="text-[#7b5800] border border-[#7b5800] font-label font-bold uppercase tracking-widest text-sm px-10 py-4 rounded-xl hover:bg-[#7b5800]/5 transition-colors"
            >
              See Rituals
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
