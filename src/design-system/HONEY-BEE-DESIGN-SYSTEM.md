# Honey Bee Storefront — Design System Documentation

> **Source**: Stitch UI/UX design reference (`src/design-system/design-reference/stitch/`)  
> **Creative Direction**: "The Luminous Alchemist" — a digital atelier for Ayurvedic luxury artisan soaps  
> **Design Reference Files**: Screenshots and HTML prototypes in `design-reference/stitch/`

---

## 1. Creative North Star

This storefront is a **digital atelier**, not a template. The design rejects boxy, rigid e-commerce conventions in favour of **Spatial Rhythm** and **Tonal Depth**. Every screen is treated like a curated editorial spread — warm, breathable, and deeply organic.

**Atmosphere**: Slow-made, Ayurvedic luxury. Handcrafted intention.  
**Feeling**: Warm natural honey tones, botanical greens, soft cream surfaces, generous whitespace.

---

## 2. Color Tokens

All colors are derived from the Material Design 3 colour palette defined in the Stitch HTML prototypes. Use these **exact** values.

### Core Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `background` | `#fcf9f4` | Page canvas (warm parchment) |
| `surface` | `#fcf9f4` | Base surface |
| `surface-bright` | `#fcf9f4` | Same as background |
| `surface-container-lowest` | `#ffffff` | Floating cards, elevated elements |
| `surface-container-low` | `#f6f3ee` | Lightly grouped backgrounds |
| `surface-container` | `#f0ede8` | Standard grouped sections |
| `surface-container-high` | `#ebe8e3` | Higher-contrast groupings |
| `surface-container-highest` | `#e5e2dd` | Headers, strong surface emphasis |
| `surface-dim` | `#dcdad5` | Muted surface areas |
| `surface-variant` | `#e5e2dd` | Variant surface |

### Brand Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#7b5800` | CTAs, active nav, accents (deep honey) |
| `primary-container` | `#d59f2b` | Gradient endpoint, highlights |
| `primary-fixed` | `#ffdea6` | Pale amber tint backgrounds |
| `primary-fixed-dim` | `#f7bd48` | Inverse primary, mid amber |
| `on-primary` | `#ffffff` | Text on primary buttons |
| `on-primary-container` | `#513900` | Text on primary containers |
| `on-primary-fixed` | `#271900` | Dark text on fixed primary |
| `on-primary-fixed-variant` | `#5d4200` | Variant text on fixed primary |

### Secondary / Botanical

| Token | Hex | Usage |
|-------|-----|-------|
| `secondary` | `#5c614d` | Icons (ultra-fine), secondary accents |
| `secondary-container` | `#e0e5cc` | Botanical ingredient section backgrounds |
| `secondary-fixed` | `#e0e5cc` | Fixed secondary containers |
| `secondary-fixed-dim` | `#c4c9b1` | Dimmed secondary |
| `on-secondary` | `#ffffff` | Text on secondary |
| `on-secondary-container` | `#626753` | Text on secondary containers |

### Tertiary / Warm Earth

| Token | Hex | Usage |
|-------|-----|-------|
| `tertiary` | `#944925` | Warm terracotta accent |
| `tertiary-container` | `#ee9066` | Warm accent containers |
| `tertiary-fixed` | `#ffdbcd` | Pale terracotta tint |
| `tertiary-fixed-dim` | `#ffb596` | Mid terracotta |

### Text Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `on-background` | `#1c1c19` | **ALL "black" text** — NEVER use `#000000` |
| `on-surface` | `#1c1c19` | Body text on surfaces |
| `on-surface-variant` | `#4f4634` | Labels, helper text, captions |
| `inverse-on-surface` | `#f3f0eb` | Text on dark/inverse surfaces |

### Structural Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `outline` | `#817662` | Visible dividers (use sparingly) |
| `outline-variant` | `#d3c5ae` | Ghost borders on inputs (at 40% opacity) |
| `inverse-surface` | `#31302d` | Dark sections (e.g. "Nurse's Promise" band) |
| `inverse-primary` | `#f7bd48` | Amber on dark backgrounds |
| `surface-tint` | `#7b5800` | Tint overlay color |

### Error / Feedback

| Token | Hex | Usage |
|-------|-----|-------|
| `error` | `#ba1a1a` | Error state (use sparingly) |
| `error-container` | `#ffdad6` | Error container background |
| `on-error` | `#ffffff` | Text on error |

---

## 3. Typography

### Font Families

| Role | Font | Purpose |
|------|------|---------|
| `font-headline` | **Noto Serif** (400, 700, italic) | Display, headlines, brand marks |
| `font-body` | **Manrope** (300–700) | Body text, labels, UI elements |
| `font-label` | **Manrope** | Navigation, tags, captions |

**Google Fonts import**:
```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
```

### Type Scale

| Level | Element | Font | Size | Weight | Spacing | Notes |
|-------|---------|------|------|--------|---------|-------|
| `display-lg` | Hero headline | Noto Serif | 3.5rem (56px) | 700 | -0.02em | Auth editorial presence |
| `headline-lg` | Section title | Noto Serif | 2.25–3rem | 400/700 | tight | Brand mark |
| `headline-md` | Product title | Noto Serif | 1.75–2rem | 400/700 | — | |
| `label-md` | Nav, tags, CTA text | Manrope | 0.75–0.875rem | 600–700 | 0.05–0.1em | UPPERCASE |
| `body-lg` | Body content | Manrope | 1rem | 400 | — | line-height 1.6–1.8 |
| `body-sm` | Caption, metadata | Manrope | 0.75–0.875rem | 400–500 | — | |

### Typography Rules

- **Headlines**: Always `font-headline` (Noto Serif) with `tracking-tight` (`-0.02em`)
- **Body**: Always `font-body` (Manrope) with `leading-relaxed` (1.6–1.8)
- **Labels / Nav**: `font-label`, `uppercase`, `tracking-widest`
- If a screen feels "busy" → increase whitespace around serif headings, never shrink the size
- Always maintain a significant scale jump between heading levels

---

## 4. Surface Hierarchy (The "No-Line" Rule)

**CRITICAL**: Never use 1px solid borders for sectioning. Boundaries are created through background colour shifts only.

### Layer System

```
Layer 0 (Canvas)  : background (#fcf9f4)        — Wide open page canvas
Layer 1 (Mid)     : surface-container (#f0ede8)  — Grouped content blocks
Layer 2 (Floating): surface-container-lowest (#ffffff) — Cards, interactive elements
```

Think of it as **stacked sheets of handmade vellum** — each layer slightly whiter.

### Section Background Usage

| Section Type | Background |
|-------------|-----------|
| Page canvas | `bg-background` (`#fcf9f4`) |
| Feature callouts, "promise" sections | `bg-surface-container` (`#f0ede8`) |
| Cards, product tiles | `bg-surface-container-lowest` (`#ffffff`) |
| Botanical / ingredient sections | `bg-secondary-container` (`#e0e5cc`) |
| Dark quote / testimonial band | `bg-[#7b5800]` or `bg-inverse-surface` (`#31302d`) |

---

## 5. Special Effects

### Honey Glow (Primary Gradient)
```css
.honey-glow {
  background: linear-gradient(135deg, #7b5800 0%, #d59f2b 100%);
}
```
Use for: Primary CTA buttons, hero background overlays, section accent bands.

### Botanical Glass (Frosted Navigation)
```css
.botanical-glass {
  background: rgba(252, 249, 244, 0.8);
  backdrop-filter: blur(20px);
}
```
Use for: Sticky navigation bar, over-image overlays, floating UI panels.

### Sunlight Shadow (Floating Elements)
```css
box-shadow: 0 12px 40px rgba(28, 28, 25, 0.05);
```
Use for: Floating CTAs, modals, elevated cards. NEVER grey or black shadows.

### Hero Overlay Gradient
```css
background: linear-gradient(to right, rgba(252,249,244,0.90) 0%, rgba(252,249,244,0.40) 50%, transparent 100%);
```
Used in hero sections to fade background images into the page canvas.

---

## 6. Border Radius

```javascript
borderRadius: {
  DEFAULT: "0.25rem",     // 4px  — subtle rounding
  lg:      "0.5rem",      // 8px  — standard cards (v1 screens)
  xl:      "1.5rem",      // 24px — artisan cards (v2 screens), primary buttons
  full:    "9999px",      // pill — badges, "Limited Edition" tags, filter chips
}
```

**Artisan Cards** always use `xl` (1.5rem) radius — the organic, pebble-like feel.

---

## 7. Components

### 7.1 Navigation Bar

```
Position   : sticky top-0, z-50
Background : bg-[#fcf9f4]/80 with backdrop-blur-md (botanical-glass)
Brand mark : "Honey Bee" — Noto Serif, text-[#7b5800], text-2xl
Nav links  : Manrope, uppercase, tracking-widest, text-xs/sm
Active link: border-b border-[#7b5800]
Icons      : Material Symbols Outlined (wght 100–300, fine line style)
Cart badge : bg-primary text-on-primary, 10px font, rounded-full
Mobile     : hamburger menu icon, full-screen overlay
```

**Tailwind snippet**:
```html
<nav class="bg-[#fcf9f4]/80 backdrop-blur-md sticky top-0 z-50 flex justify-between items-center px-8 md:px-20 py-6">
  <div class="text-2xl font-headline text-[#7b5800] tracking-tight">Honey Bee</div>
  <!-- links: text-xs uppercase tracking-widest font-semibold -->
</nav>
```

### 7.2 Hero Section

```
Min-height : ~750–920px
Image      : absolute full-bleed background, object-cover
Overlay    : gradient from-background/90 via-background/40 to-transparent
Content    : left-aligned, max-w-2xl
Eyebrow    : label-md, on-surface-variant, uppercase, tracking-widest (e.g. "HANDCRAFTED INTENTION")
Headline   : Noto Serif, display-lg, on-background
Body text  : Manrope body-lg, max-w-md, on-surface-variant
CTA primary: honey-glow gradient, rounded-xl, text-on-primary, uppercase tracking-widest
CTA ghost  : no background, no border, primary text with underline animation
```

### 7.3 Product Cards (Artisan Cards)

```
Background  : bg-surface-container-lowest (#ffffff)
Border      : NONE (no visible border)
Radius      : rounded-xl (1.5rem)
Shadow      : sunlight shadow (40px blur, #1c1c19 at 5%)
Image       : square or portrait aspect, object-cover, rounded-xl
Product name: Noto Serif, headline-md
Price       : Manrope, primary color, font-semibold
Tags        : rounded-full chips, bg-surface-container, label-sm uppercase
Badges      : rounded-full, e.g. "BEST SELLER" in honey-glow, "LIMITED EDITION" in tertiary
Stars       : primary color (#7b5800), text-xs spacing
Dividers    : NONE — use 16–24px vertical white space only
```

### 7.4 Buttons

**Primary Button** (Honey Glow):
```html
<button class="honey-glow text-white font-label text-xs uppercase tracking-widest rounded-xl px-8 py-4 hover:opacity-90 transition-opacity">
  EXPLORE SHOP
</button>
```
- Gradient: `135deg, #7b5800 → #d59f2b`
- Text: `on-primary` (#ffffff), `label-md`, UPPERCASE, 0.05em tracking
- Radius: `rounded-xl` (1.5rem)

**Ghost / Secondary Button**:
```html
<button class="bg-transparent text-primary font-label text-xs uppercase tracking-widest underline hover:no-underline transition-all">
  VIEW RITUALS
</button>
```
- No background, no border
- `primary` (#7b5800) text, underline that fades on hover

**Outline Button** (for "Discover More"):
```html
<button class="border border-outline-variant rounded-full text-on-surface-variant font-label text-xs uppercase tracking-widest px-10 py-3">
  DISCOVER MORE
</button>
```

### 7.5 Input Fields

```css
/* Bottom stroke only */
border: none;
border-bottom: 1px solid rgba(211, 197, 174, 0.4); /* outline-variant at 40% */
background: transparent;
padding: 8px 0;

/* Focus state */
:focus {
  border-bottom: 2px solid #7b5800;  /* primary */
  outline: none;
}

/* Label */
font: Manrope label-md in on-surface-variant (#4f4634);
```

### 7.6 Filter / Tag Chips

```html
<span class="rounded-full border border-outline-variant text-on-surface font-label text-xs px-4 py-1.5">
  Sensitive
</span>
```
- Organic pill shape (`rounded-full`)
- No fill by default, subtle border
- Active state: `bg-primary text-on-primary`

### 7.7 Breadcrumb

```html
<span class="text-on-surface-variant font-label text-xs uppercase tracking-widest">
  HOME / <span class="text-on-surface">SHOP ALL</span>
</span>
```

### 7.8 Section Titles

```html
<!-- With eyebrow label -->
<p class="font-label text-xs text-on-surface-variant uppercase tracking-widest mb-2">OUR HERITAGE</p>
<h2 class="font-headline text-4xl text-on-background tracking-tight">From Care to Craft</h2>
```

### 7.9 Collection Tiles (Editorial Grid)

- Full-bleed image tiles with text overlay at bottom-left
- Text: Noto Serif, white on dark photographic background
- Subtle dark scrim gradient at bottom for legibility
- Organic aspect ratios (portrait dominant, wide secondary)

### 7.10 Social Proof / Testimonials ("Community Whispers")

```
Layout     : 3-column quote grid
Stars      : primary (#7b5800), text-xs
Quote text : Manrope, italic or light weight, on-surface
Attribution: label-sm, on-surface-variant, uppercase
Background : bg-surface (same as canvas — zero visual noise)
Dividers   : NONE
```

### 7.11 Ingredient / Feature Cards

```
Background  : bg-secondary-container (#e0e5cc) ← botanical green tint
Radius      : rounded-xl
Icon        : Material Symbol, secondary color, ultra-fine weight (wght 100–200)
Title       : Manrope font-semibold, on-background
Description : Manrope body-sm, on-surface-variant
```

### 7.12 Dark Band (Brand Statement)

```
Background   : bg-[#7b5800] or bg-inverse-surface (#31302d)
Text color   : text-on-primary (#ffffff) or text-inverse-primary (#f7bd48)
Headline     : Noto Serif, display-lg, text-white
Sub-label    : Manrope, label-md, uppercase tracking-widest, text-white/70
Quote        : italic, Noto Serif, large body-lg
Attribution  : uppercase, tracking-widest, Manrope label-sm
```

### 7.13 Footer

```
Background    : bg-surface-container (#f0ede8) or bg-surface-container-low
Brand mark    : Noto Serif, primary (#7b5800)
Tagline       : Manrope, body-sm, on-surface-variant
Column heads  : Manrope, label-md, uppercase, tracking-widest, primary
Links         : Manrope, body-sm, on-surface-variant, hover:primary
Newsletter    : Manrope input with bottom-stroke style + rounded-full "JOIN" button
Social icons  : Material Symbols, secondary color, ultra-fine
```

---

## 8. Layout & Spacing

### Container Padding

| Breakpoint | Padding |
|-----------|---------|
| Mobile | `px-4` — `px-6` (16–24px) |
| Tablet | `px-8` (32px) |
| Desktop | `px-8 md:px-20` (80px) — **minimum global desktop margin** |

**Rule**: Luxury is defined by the space you *don't* use. Never crowd the edges.

### Section Vertical Rhythm

```
Hero section           : min-h-[750px] to min-h-[920px]
Feature row (4 icons)  : py-12 (48px) to py-16 (64px)
Content section gap    : space-y-16 to space-y-24 (64–96px)
Card grids             : gap-4 to gap-6 (16–24px)
Between heading & body : mt-4 to mt-6 (16–24px)
List item spacing      : gap-y-4 to gap-y-6 (16–24px, NO dividers)
```

### Grid Layouts

| Page | Grid |
|------|------|
| Homepage — Collections | `grid-cols-3` (2:1 ratio, large tile left) |
| Homepage — Favorites | `grid-cols-3` equal |
| Shop listing | Sidebar `1fr` + main `2fr` (2-col product grid) |
| Product detail | `grid-cols-12` (`lg:col-span-7` gallery + `col-span-5` info) |
| Our Story — Process | Asymmetric 3-col (small + large + small) |
| Ingredients | `grid-cols-3` equal cards |

---

## 9. Page Templates

### 9.1 Homepage
```
1. Botanical Glass Nav (sticky)
2. Hero — full-bleed image + left-aligned editorial headline + dual CTAs
3. Feature row — 4 value props (icon + label + caption)
4. Collections — editorial asymmetric grid with image + text overlay
5. Current Favorites — 3-col product card grid
6. Brand story teaser — 2-col (photo left + text right) with floating pull-quote card
7. Product category promo — text left + dual images right
8. Footer
```

### 9.2 Shop / Product Listing
```
1. Nav
2. Page header — oversized title "The Soap / Gallery" (serif + italic mix)
3. 2-column layout:
   - Left: Category filters, skin type chips, fragrance filters + "Promise" card
   - Right: 2-col product grid with artisan cards
4. Load more (outline pill button)
5. Footer with newsletter
```

### 9.3 Product Detail
```
1. Nav
2. 2-col layout:
   - Left (7/12): Main image (large) + 2-col thumbnail strip below
   - Right (5/12): Collection eyebrow + product name (serif) + price + description + Add to Basket (honey-glow) + trust badges
3. "The Nurse's Note" — cream background with quote + key benefits list
4. Ingredients section — dark left title + 3-col ingredient cards (botanical-green background)
5. Cold Process explanation — image with overlapping text card
6. Usage Ritual — numbered steps, right-aligned image
7. Community Whispers — 3-col testimonial grid
8. "Complete the Ritual" — 4-col related products
9. Footer
```

### 9.4 Our Story
```
1. Nav
2. Hero — text left + portrait photo right + floating quote bubble
3. "Our Process" — 3-col asymmetric process image grid
4. Radical Sourcing — 3-col photo grid left + text list right
5. "The Nurse's Promise" — dark honey band with large quote
6. "Experience the Alchemy" — CTA row with product link
7. Footer
```

### 9.5 Mobile Navigation
```
Bottom tab bar (mobile only):
- Home | Shop | Favourites | Cart | Menu
- Active: honey-glow filled icon
- Inactive: outline icon, on-surface-variant
```

---

## 10. Tailwind Configuration

Add this to `tailwind.config.ts` for the Honey Bee design system:

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Surfaces
        'background': '#fcf9f4',
        'surface': '#fcf9f4',
        'surface-bright': '#fcf9f4',
        'surface-dim': '#dcdad5',
        'surface-variant': '#e5e2dd',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f6f3ee',
        'surface-container': '#f0ede8',
        'surface-container-high': '#ebe8e3',
        'surface-container-highest': '#e5e2dd',
        // Primary (Honey Amber)
        'primary': '#7b5800',
        'primary-container': '#d59f2b',
        'primary-fixed': '#ffdea6',
        'primary-fixed-dim': '#f7bd48',
        'on-primary': '#ffffff',
        'on-primary-container': '#513900',
        'on-primary-fixed': '#271900',
        'on-primary-fixed-variant': '#5d4200',
        'inverse-primary': '#f7bd48',
        'surface-tint': '#7b5800',
        // Secondary (Botanical)
        'secondary': '#5c614d',
        'secondary-container': '#e0e5cc',
        'secondary-fixed': '#e0e5cc',
        'secondary-fixed-dim': '#c4c9b1',
        'on-secondary': '#ffffff',
        'on-secondary-container': '#626753',
        'on-secondary-fixed': '#191d0e',
        'on-secondary-fixed-variant': '#444937',
        // Tertiary (Warm Earth)
        'tertiary': '#944925',
        'tertiary-container': '#ee9066',
        'tertiary-fixed': '#ffdbcd',
        'tertiary-fixed-dim': '#ffb596',
        'on-tertiary': '#ffffff',
        'on-tertiary-container': '#6a2906',
        'on-tertiary-fixed': '#360f00',
        'on-tertiary-fixed-variant': '#76320f',
        // Text
        'on-background': '#1c1c19',
        'on-surface': '#1c1c19',
        'on-surface-variant': '#4f4634',
        'inverse-on-surface': '#f3f0eb',
        'inverse-surface': '#31302d',
        // Structure
        'outline': '#817662',
        'outline-variant': '#d3c5ae',
        // Error
        'error': '#ba1a1a',
        'error-container': '#ffdad6',
        'on-error': '#ffffff',
        'on-error-container': '#93000a',
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '1.5rem',
        full: '9999px',
      },
      fontFamily: {
        headline: ['Noto Serif', 'Georgia', 'serif'],
        body: ['Manrope', 'system-ui', 'sans-serif'],
        label: ['Manrope', 'system-ui', 'sans-serif'],
      },
    },
  },
};

export default config;
```

### CSS Custom Classes

Add to `globals.css`:

```css
@layer utilities {
  .honey-glow {
    background: linear-gradient(135deg, #7b5800 0%, #d59f2b 100%);
  }

  .botanical-glass {
    background: rgba(252, 249, 244, 0.8);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  .sunlight-shadow {
    box-shadow: 0 12px 40px rgba(28, 28, 25, 0.05);
  }

  .hero-overlay {
    background: linear-gradient(
      to right,
      rgba(252, 249, 244, 0.9) 0%,
      rgba(252, 249, 244, 0.4) 50%,
      transparent 100%
    );
  }
}
```

---

## 11. Design Rules (Do's and Don'ts)

### ✅ Do

- **No #000000** — Always use `on-background` (#1c1c19) for darkest text
- **No visible borders for sections** — Use background colour shifts only
- **No dividers between list items** — Use 16–24px vertical white space
- **Embrace asymmetry** — Left-align text, place images slightly off-centre right
- **Generous leading** — `body-lg` uses `leading-relaxed` (1.6–1.8)
- **Tone-on-tone backgrounds** — `secondary-container` for botanical sections
- **Organic shapes** — `rounded-full` for badges, chips, filter tags
- **Artisan cards** — Always `rounded-xl`, no border, `surface-container-lowest` background
- **Navigation** — Always botanical-glass frosted effect when sticky
- **Global Desktop margin** — Minimum `px-20` (80px) on desktop
- **Mobile margin** — Minimum `px-4` (16px) on mobile, `px-8` (32px) on tablet

### ❌ Don't

- **Never** use `#000000` for text — breaks the warm palette
- **Never** add 1px borders between sections — kills the premium vibe
- **Never** use HR dividers between list items
- **Never** use standard grey or black shadows — use the sunlight-shadow style only
- **Never** crowd edges — whitespace is the luxury
- **Never** use flat color for primary CTAs — always the honey-glow gradient
- **Never** render storefronts client-side only — use Next.js SSG/SSR for SEO
- **Never** use `font-sans` for headlines — always `font-headline` (Noto Serif)
- **Never** shrink font sizes to reduce visual noise — increase whitespace instead
- **Never** use raw `alert()` / standard browser UI components — maintain the design language

---

## 12. Material Symbols Icon Style

```css
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 100, 'GRAD' 0, 'opsz' 24;
}
```

Icons are **ultra-fine** (wght 100–300, stroke style). The thin line weight matches the luxury / artisan aesthetic. Never use filled or bold icon variants unless explicitly for a badge or active state.

---

## 13. Page-Specific Design Notes

### Homepage Hero
- Background image bleeds full width with overlay gradient
- Eyebrow text: `uppercase tracking-widest text-xs font-semibold text-on-surface-variant`
- Headline: `font-headline text-5xl md:text-6xl tracking-tight text-on-background`
- Dual CTA: honey-glow primary + ghost secondary side by side

### Shop — Page Title Treatment
```html
<h1 class="font-headline text-5xl md:text-6xl text-on-background tracking-tight">
  The Soap
  <span class="italic text-primary">Gallery</span>
</h1>
```
Title uses mixed weight + italic serif for editorial magazine feel.

### Product Detail — Gallery Layout
- Main image: `col-span-2`, tall portrait `aspect-[4/5]`, `rounded-xl`
- Thumbnail strip: 2 side-by-side `aspect-square` images below main image

### Our Story — Quote Bubble
- Floating card over the founder photo
- `bg-secondary-container rounded-xl p-4 shadow-sm`
- Italic Manrope text on `on-secondary-container`

### Dark "Nurse's Promise" Band
```html
<section class="bg-[#7b5800] py-20 px-8 md:px-20 text-center">
  <p class="font-label text-xs text-white/60 uppercase tracking-widest mb-6">THE NURSE'S PROMISE</p>
  <blockquote class="font-headline text-2xl md:text-3xl italic text-white max-w-3xl mx-auto leading-relaxed">
    "..."
  </blockquote>
  <cite class="font-label text-xs text-white/70 uppercase tracking-widest mt-6 block">SARAH HENDERSON, RN</cite>
</section>
```

---

## 14. Reference Files

All Stitch prototype screens and HTML code are in:

```
src/design-system/design-reference/stitch/
├── artisan_nectar/DESIGN.md                         ← Core design philosophy
├── homepage_honey_bee_artisan_soaps_1/              ← Homepage v1 (narrower layout)
│   ├── screen.png
│   └── code.html
├── homepage_honey_bee_artisan_soaps_2/              ← Homepage v2 (full-width)
├── homepage_mobile_with_nav/                        ← Mobile homepage
├── shop_soaps_honey_bee_product_listing_1/          ← Shop listing v1
├── shop_soaps_honey_bee_product_listing_2/          ← Shop listing v2
├── shop_mobile_with_nav/                            ← Mobile shop + bottom nav
├── product_detail_honey_bee_artisan_soaps_1/        ← PDP v1
├── product_detail_honey_bee_artisan_soaps_2/        ← PDP v2 (editorial gallery)
├── product_detail_mobile_with_nav/                  ← Mobile PDP
├── our_story_honey_bee_heritage_1/                  ← Our Story v1
├── our_story_honey_bee_heritage_2/                  ← Our Story v2
└── our_story_mobile_with_nav/                       ← Mobile Our Story
```

Each folder contains `screen.png` (visual reference) and `code.html` (Tailwind prototype code). Always **view the screen.png** to verify design intent before implementing.
