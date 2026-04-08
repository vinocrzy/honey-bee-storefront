---
name: honey-bee-storefront-design
description: >
  Implement Honey Bee storefront UI components and pages using the Stitch "Luminous Alchemist" design system.
  Use when: building any page, component, or layout for this storefront — navigation, hero, product cards,
  product detail, shop listing, our story page, buttons, inputs, typography, or any custom section.
argument-hint: 'Specify target: "homepage", "shop", "product-detail", "our-story", "navigation", "card", "button", "footer", or "layout"'
---

# Honey Bee Storefront — Local Design Skill

> This skill is scoped to the `client-honey-bee` repository.  
> Platform-level skill: `../.github/skills/honey-bee-storefront-design/SKILL.md`

## Full Design Reference (READ FIRST)

```
src/design-system/HONEY-BEE-DESIGN-SYSTEM.md        ← Complete design documentation
src/design-system/design-reference/stitch/           ← HTML prototypes + screenshots
src/design-system/tokens/colors.ts                   ← Color token definitions
src/design-system/tokens/typography.ts               ← Typography tokens
src/design-system/components/button.variants.ts      ← Button variants
src/design-system/components/card.variants.ts        ← Card variants
```

**Always view `screen.png` in the relevant design-reference folder before coding a page.**

---

## Project Stack

```json
{
  "framework": "Next.js 14+",
  "styling": "Tailwind CSS v4 (@theme block in globals.css — NO tailwind.config.ts)",
  "fonts": "next/font/google (Noto Serif + Manrope)",
  "icons": "Material Symbols Outlined (NOT Heroicons)",
  "images": "next/image",
  "rendering": "SSG (generateStaticParams) + Server Components"
}
```

---

## CRITICAL: Tailwind v4 — No Config File

**This repo does NOT have `tailwind.config.ts`.** All theme tokens live in `src/app/globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-primary: #7b5800;
  --color-background: #fcf9f4;
  --color-on-background: #1c1c19;
  /* ... all tokens defined here */
  --font-headline: 'Noto Serif', serif;
  --font-body: 'Manrope', sans-serif;
  --font-label: 'Manrope', sans-serif;
}

@layer utilities {
  .honey-glow { background: linear-gradient(135deg, #7b5800 0%, #d59f2b 100%); }
  .botanical-glass { background: rgba(252,249,244,0.8); backdrop-filter: blur(20px); }
  .sunlight-shadow { box-shadow: 0 12px 40px rgba(28,28,25,0.05); }
  .hero-overlay { background: linear-gradient(to right, rgba(252,249,244,0.9), rgba(252,249,244,0.4) 50%, transparent); }
  .label-caps { font-size: 0.6875rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; }
}
```

The `@theme` block exposes tokens as both Tailwind utilities (`text-primary`) **and** CSS variables (`var(--color-primary)`). In component code, prefer the hardcoded hex values (`text-[#7b5800]`) as they are explicit and don't depend on Tailwind JIT scanning.

---

## Component Cheatsheet

### Navigation
```tsx
<nav className="botanical-glass sticky top-0 z-50 flex justify-between items-center px-8 md:px-20 py-6 max-w-[1920px] mx-auto">
  <span className="font-headline text-2xl text-primary tracking-tight">Honey Bee</span>
  {/* Nav links: font-label text-xs uppercase tracking-widest */}
  {/* Active: border-b border-primary */}
  {/* Icons: Material Symbols wght 100 */}
</nav>
```

### Primary CTA Button
```tsx
<button className="honey-glow text-white font-label text-xs uppercase tracking-[0.05em] rounded-xl px-8 py-4 hover:opacity-90 transition-opacity">
  EXPLORE SHOP
</button>
```

### Ghost Button
```tsx
<button className="text-primary font-label text-xs uppercase tracking-widest underline hover:no-underline transition-all">
  VIEW RITUALS
</button>
```

### Product Card
```tsx
<article className="bg-surface-container-lowest rounded-xl sunlight-shadow overflow-hidden group">
  <div className="relative overflow-hidden aspect-square">
    <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
    {product.badge && (
      <span className="absolute top-3 left-3 honey-glow text-white font-label text-[10px] uppercase tracking-widest rounded-full px-3 py-1">
        {product.badge}
      </span>
    )}
  </div>
  <div className="p-5">
    <div className="flex justify-between items-baseline mb-1">
      <h3 className="font-headline text-xl text-on-background">{product.name}</h3>
      <span className="font-body text-sm font-semibold text-primary">${product.price}</span>
    </div>
    <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-3">{product.fragrance}</p>
    <div className="flex gap-2 flex-wrap">
      {product.tags.map(t => (
        <span key={t} className="rounded-full bg-surface-container font-label text-[10px] uppercase tracking-widest px-3 py-1 text-on-surface-variant">
          {t}
        </span>
      ))}
    </div>
  </div>
</article>
```

### Input Field (Minimalist Bottom-Stroke)
```tsx
<div className="relative">
  <label className="block font-label text-xs text-on-surface-variant mb-1 uppercase tracking-widest">
    {label}
  </label>
  <input
    className="w-full bg-transparent border-0 border-b border-outline-variant/40 pb-2 font-body text-sm text-on-surface focus:border-primary focus:border-b-2 focus:outline-none transition-all"
    {...props}
  />
</div>
```

### Section Header
```tsx
<header className="mb-10 md:mb-14">
  {eyebrow && (
    <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">{eyebrow}</p>
  )}
  <h2 className="font-headline text-4xl text-on-background tracking-tight">{title}</h2>
  {subtitle && (
    <p className="font-body text-sm text-on-surface-variant leading-relaxed mt-3 max-w-md">{subtitle}</p>
  )}
</header>
```

---

## Page Structure

### `/` — Homepage
```
botanical-glass Nav
→ Hero (full-bleed image + hero-overlay + editorial CTA)
→ 4-col feature row (icon + label + caption) [bg-surface-container-low]
→ Collections grid (asymmetric: 2:1 ratio, image overlay tiles)
→ "Current Favorites" 3-col product grid [bg-surface-container]
→ Brand story teaser (2-col: photo + text + floating pull-quote)
→ Category promo (text + 2 photos)
→ Footer
```

### `/shop` — Shop Listing
```
Nav
→ Breadcrumb + editorial title "The Soap / Gallery" (serif + italic mix)
→ 2-col layout:
   Left (sidebar): Category radio filters, Skin Type chips, Fragrance list + Promise card
   Right (2-col grid): Artisan product cards with badges
→ "Discover More" outline-pill CTA
→ Footer + Newsletter
```

### `/shop/[slug]` — Product Detail
```
Nav
→ 12-col grid:
   col-span-7: Main image (rounded-xl) + 2 thumbnails below
   col-span-5: Collection eyebrow, product name (serif), price, description, 
               "ADD TO ATELIER BASKET" (honey-glow full-width), trust badges
→ "The Nurse's Note" section [bg-surface-container-low, italic quote + benefits list]
→ "Pure Alchemy of Ingredients" [bg-secondary-container cards]
→ Cold Process explanation (image + overlapping text card)
→ Usage Ritual (numbered steps)
→ "Community Whispers" testimonials (3-col)
→ "Complete the Ritual" related products (4-col)
→ Footer
```

### `/our-story` — Our Story
```
Nav
→ Hero: text left + founder photo right + floating quote bubble
→ "Our Process" 3-col asymmetric image grid
→ "Radical Sourcing" photo grid + content list
→ "The Nurse's Promise" dark honey band (bg-primary, white serif quote)
→ "Experience the Alchemy" CTA row
→ Footer
```

---

## Non-Negotiable Rules

| Rule | Value |
|------|-------|
| Page background | `#fcf9f4` (never white) |
| All dark text | `#1c1c19` (never `#000000`) |
| Headline font | Noto Serif via `font-headline` class |
| Label/tag text | `label-caps` utility (11px / 500 / 0.1em / uppercase) |
| Card radius | `rounded-xl` / 1.5rem (never `rounded-md` or `rounded-lg`) |
| Card border | NONE visible |
| Section dividers | NONE (use bg color shift) |
| Primary button | `.honey-glow` gradient (never flat color) |
| Nav background | `.botanical-glass` frosted (never solid) |
| Shadows | `.sunlight-shadow` only — never grey/black |
| Desktop padding | min `px-6 md:px-20` (80px) |
| Hero layout | `items-end pb-24` — copy sits bottom-left, `min-h-[850px]` |
| Icons | Material Symbols Outlined (NEVER `@heroicons/react`) |
| Tailwind config | NO `tailwind.config.ts` — `@theme {}` in `globals.css` only |
| Rendering | SSG / Server Components (never client-only for content) |

---

## File Locations in This Project

```
src/
├── app/
│   ├── layout.tsx              ← Font setup (Noto Serif + Manrope)
│   ├── globals.css             ← honey-glow, botanical-glass, sunlight-shadow
│   ├── page.tsx                ← Homepage
│   ├── shop/
│   │   ├── page.tsx            ← Shop listing
│   │   └── [slug]/page.tsx     ← Product detail
│   └── our-story/
│       └── page.tsx            ← Our Story
├── components/                 ← Shared components
├── design-system/
│   ├── HONEY-BEE-DESIGN-SYSTEM.md   ← Full design documentation
│   ├── design-reference/stitch/     ← Prototypes + screenshots
│   ├── tokens/                      ← Color, typography, spacing tokens
│   └── components/                  ← Button, card variants
├── services/                   ← API client, product fetching
└── types/                      ← TypeScript types
```
