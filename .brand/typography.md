# Typography System - Honey Bee

> **Source**: Stitch Design Reference  
> **Font Families**: Noto Serif (editorial headlines) + Manrope (body & UI)  
> **Philosophy**: Editorial elegance meets clean readability — serif for brand moments, sans-serif for clarity

---

## Typography Philosophy

**"Editorial Atelier"** — Typography treated like a curated magazine spread, not a template. Large serif headlines carry visual weight like photography. Clean sans-serif body ensures effortless reading. Strategic contrast between display and utility creates **intentional hierarchy**.

**Goal**: Feel like a slow-living wellness magazine, not a mass-market e-commerce site.

---

## Font Families

### Heading Font: **Noto Serif**

**Category**: Transitional Serif (Google Fonts)  
**Weights Used**: 400 (Regular), 700 (Bold), 400 Italic  
**Source**: [Google Fonts — Noto Serif](https://fonts.google.com/noto/specimen/Noto+Serif)

**Rationale**: Noto Serif brings **editorial sophistication** without pretension. Its organic, slightly warm serifs feel artisan and handcrafted, never corporate or cold. The transitional style (between old-style and modern serifs) bridges tradition and contemporary — perfect for Ayurvedic heritage meeting modern wellness.

**Character**: Elegant, timeless, authoritative yet approachable, organic  
**Similar to**: Georgia, Freight Text, Crimson Pro (but more refined)

**Best for**:
- ✅ Page titles (h1) — "Honey Bee Artisan Soaps"
- ✅ Section headings (h2, h3) — "From Care to Craft"
- ✅ Hero headlines — "Slow-Made Alchemy"
- ✅ Product names — "Lavender Fields · 4oz Bar"
- ✅ Brand mark — "Honey Bee" wordmark
- ✅ Pull quotes — Italic variant for editorial feel

### Body Font: **Manrope**

**Category**: Geometric Sans-Serif (Google Fonts)  
**Weights Used**: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold), 800 (Extrabold)  
**Source**: [Google Fonts — Manrope](https://fonts.google.com/specimen/Manrope)

**Rationale**: Manrope is a **modern geometric sans** with open apertures and generous x-height, ensuring maximum readability on screens. Its slight warmth (rounded terminals) harmonizes with Noto Serif without competing. Clean, professional, yet friendly.

**Character**: Clean, modern, readable, friendly, versatile  
**Similar to**: Inter, Work Sans, DM Sans

**Best for**:
- ✅ Body copy — Product descriptions, about us text
- ✅ Navigation — All caps nav links with wide tracking
- ✅ Labels & tags — "BEST SELLER", "LIMITED EDITION"
- ✅ UI elements — Buttons, form inputs, captions
- ✅ Helper text — Tooltips, metadata, breadcrumbs

### Font Pairing Strategy

**Contrast Principle**: Classic **serif + sans-serif** pairing provides visual hierarchy through form contrast.

**Harmony Elements**:
- Similar x-height ensures balanced line rhythm
- Shared warmth (Noto's organic serifs + Manrope's rounded terminals)
- Both optimized for digital screens (high legibility)

**Hierarchy Formula**:
```
LARGE SERIF HEADLINE (Noto Serif, 56px, bold)
  ↓
Medium Serif Subheading (Noto Serif, 32px)
  ↓
Clean Sans Body (Manrope, 16px, regular)
  ↓
SMALL CAPS LABEL (Manrope, 12px, 600 weight, uppercase)
```

---

## Type Scale

### Modular Scale Ratio: **1.333** (Perfect Fourth)

**Base Size**: 16px (1rem) — Body text optimized for reading comfort

**Why Perfect Fourth?** Creates noticeable size jumps for clear hierarchy without jumps too extreme (awkward whitespace at larger scales).

### Scale Values

```typescript
fontSize: {
  xs: '0.75rem',      // 12px   — Fine print, metadata, tiny labels
  sm: '0.875rem',     // 14px   — Captions, secondary labels, helper text
  base: '1rem',       // 16px   — BASE BODY TEXT (most common)
  lg: '1.125rem',     // 18px   — Large body, small headings, button text
  xl: '1.5rem',       // 24px   — h4, card titles
  '2xl': '2rem',      // 32px   — h3, section headings
  '3xl': '2.75rem',   // 44px   — h2, page titles
  '4xl': '3.5rem',    // 56px   — h1, hero headlines (desktop)
}
```

**Mobile Scaling**: Reduce display sizes by ~25% on mobile (56px → 42px) to prevent overwhelming small screens.

### Visual Scale Representation

```
4xl ████████████████████████████████████ Hero Headline (Noto Serif, 56px)
3xl █████████████████████████████ Page Title (Noto Serif, 44px)
2xl ████████████████████ Section Heading (Noto Serif, 32px)
xl █████████████ h4, Card Title (Noto Serif, 24px)
lg ████████████ Large Body, Button (Manrope, 18px)
base ██████████ Body Text — MOST USED (Manrope, 16px)
sm ████████ Caption, Secondary (Manrope, 14px)
xs ██████ Fine Print, Tags (Manrope, 12px - uppercase)
```

---

## Typography Hierarchy

### H1 — Hero Headline
```typescript
font: 'Noto Serif', serif
size: 3.5rem (56px desktop) / 2.625rem (42px mobile)
weight: 700 (Bold)
lineHeight: 1.1 (tight for impact)
letterSpacing: -0.02em (tracking-tight)
color: on-background (#1c1c19)
```

**Usage**: Page heroes ("Slow-Made Alchemy for Modern Skin"), rare moments of maximum impact  
**Example**: Homepage hero, About Us hero

### H2 — Section Heading
```typescript
font: 'Noto Serif', serif
size: 2rem (32px) / 2.25rem (36px desktop)
weight: 400 (Regular) or 700 (Bold) — context-dependent
lineHeight: 1.2
letterSpacing: -0.01em
color: on-background (#1c1c19)
```

**Usage**: Major section dividers ("Our Heritage", "Current Favorites", "The Ritual")  
**Example**: Homepage section titles, product detail sections

### H3 — Subsection Heading
```typescript
font: 'Noto Serif', serif
size: 1.75rem (28px)
weight: 400 or 700
lineHeight: 1.3
color: on-background (#1c1c19)
```

**Usage**: Content groupings within sections ("The Cold Process Method", "Ingredient Provenance")

### H4 — Card Title / Small Heading
```typescript
font: 'Noto Serif', serif
size: 1.5rem (24px) / 1.25rem (20px mobile)
weight: 400
lineHeight: 1.4
color: on-background (#1c1c19)
```

**Usage**: Product card names, feature card titles, modal headings

### Body Large
```typescript
font: 'Manrope', sans-serif
size: 1.125rem (18px)
weight: 400
lineHeight: 1.6 (comfortable reading)
color: on-surface (#1c1c19)
```

**Usage**: Intro paragraphs, emphasized body text, hero subheadlines

### Body Base (Primary Body Text)
```typescript
font: 'Manrope', sans-serif
size: 1rem (16px) — MINIMUM READABLE SIZE
weight: 400
lineHeight: 1.75 (relaxed, easy reading)
color: on-surface (#1c1c19)
```

**Usage**: All product descriptions, about text, blog posts, long-form content  
**WCAG**: 16px minimum for body text ensures accessibility

### Body Small / Caption
```typescript
font: 'Manrope', sans-serif
size: 0.875rem (14px)
weight: 400 or 500
lineHeight: 1.5
color: on-surface-variant (#4f4634) — muted
```

**Usage**: Image captions, metadata ("Posted April 9, 2026"), secondary info

### Label / Navigation / Tags
```typescript
font: 'Manrope', sans-serif
size: 0.75rem (12px) — 0.875rem (14px)
weight: 600 or 700 (Semibold/Bold)
lineHeight: 1.0 - 1.4 (compact UI)
letterSpacing: 0.05em - 0.1em (tracking-widest) — UPPERCASE ALWAYS
textTransform: uppercase
color: on-surface-variant (#4f4634) or primary (#7b5800)
```

**Usage**: Navigation links, filter chips, "BEST SELLER" badges, eyebrow labels ("OUR HERITAGE"), breadcrumbs  
**Example**: `<span className="font-label text-xs uppercase tracking-widest">HANDCRAFTED INTENTION</span>`

---

## Special Typography Styles

### Pull Quotes (Editorial)
```typescript
font: 'Noto Serif', serif
size: 1.75rem - 2.25rem (28-36px)
weight: 400
style: italic
lineHeight: 1.5
color: on-background (#1c1c19)
```

**Usage**: Testimonials, founder stories, brand philosophy moments  
**Example**: _"It began with a nurse's hands — worn from hospital soaps..."_

### Brand Mark / Wordmark
```typescript
font: 'Noto Serif', serif
size: 1.5rem - 2rem (24-32px navigation)
weight: 400 or 700
letterSpacing: -0.02em (tight)
color: primary (#7b5800)
```

**Usage**: Navigation logo, footer brand mark  
**Example**: "Honey Bee" in nav bar

### Eyebrow Labels (Section Intros)
```typescript
font: 'Manrope', sans-serif
size: 0.75rem (12px)
weight: 600
letterSpacing: 0.1em (tracking-widest)
textTransform: uppercase
color: on-surface-variant (#4f4634)
marginBottom: 0.5rem (8px)
```

**Usage**: Small intro label above major headings  
**Example**: "OUR HERITAGE" above "From Care to Craft" heading

---

## Google Fonts Import

Add to `<head>` or CSS:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

**CSS Variables**:
```css
:root {
  --font-headline: 'Noto Serif', Georgia, serif;
  --font-body: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-label: 'Manrope', sans-serif;
}
```

**Tailwind Config**:
```typescript
fontFamily: {
  headline: ['Noto Serif', 'Georgia', 'serif'],
  body: ['Manrope', 'system-ui', 'sans-serif'],
  label: ['Manrope', 'system-ui', 'sans-serif'],
},
```

---

## Line Height Guidelines

**Critical for readability and WCAG compliance**:

| Type | Line Height | Rationale |
|------|-------------|-----------|
| **Display (h1, h2)** | 1.1 - 1.3 | Tight for visual impact, headlines don't need breathing room |
| **Headings (h3, h4)** | 1.3 - 1.4 | Slightly more room for multi-line headings |
| **Body text (16px+)** | 1.6 - 1.8 | **WCAG requires 1.5 minimum** — Comfort reading for long text |
| **UI elements (buttons, nav)** | 1.0 - 1.4 | Compact for interface efficiency |
| **Captions, metadata** | 1.5 | Balanced between tight UI and readable small text |

**WCAG 2.1 Requirement**: Line-height minimum **1.5 for body text** (paragraph elements).

---

## Letter Spacing (Tracking)

| Use Case | Value | CSS Class | Purpose |
|----------|-------|-----------|---------|
| **Headlines (serif)** | -0.02em | `tracking-tight` | Pull letters together for visual cohesion |
| **Body text** | 0 (default) | — | Natural spacing, no adjustment |
| **Labels, nav (uppercase)** | 0.05em - 0.1em | `tracking-wide` / `tracking-widest` | Open up uppercase for legibility |

**Rule**: Uppercase sans-serif ALWAYS gets wide tracking (`tracking-widest`). Never stack uppercase letters tightly.

---

## Accessibility Guidelines

### WCAG 2.1 AA Compliance

✅ **Minimum 16px for body text** (1rem base)  
✅ **Line-height minimum 1.5** for paragraphs  
✅ **Don't use all caps for long text** (slows reading by ~10%)  
✅ **Text resizable up to 200%** without loss of function  
✅ **Adequate contrast**: All text tested against backgrounds (see color-palette.md)  

### Touch Targets (Mobile)

✅ **Minimum 44x44px for interactive text** (buttons, nav links)  
✅ Spacing between links to avoid accidental taps  

### Font Loading Performance

Use `font-display: swap` to prevent invisible text flash:

```css
@font-face {
  font-family: 'Noto Serif';
  font-display: swap; /* Show fallback immediately, swap when loaded */
}
```

---

## Typography Rules (Do's & Don'ts)

### ✅ DO

- ✅ Use Noto Serif for **all brand moments, headlines, product names**
- ✅ Use Manrope for **all body text, navigation, UI elements**
- ✅ Apply `tracking-tight` to large serif headlines (visual cohesion)
- ✅ Apply `tracking-widest` to uppercase labels (legibility)
- ✅ Maintain clear size jumps between heading levels (1.333 scale)
- ✅ Use line-height 1.6-1.8 for body text (comfortable reading)
- ✅ Test all text sizes on mobile (reduce display by ~25%)

### ❌ DON'T

- ❌ NEVER use more than 2 font families (serif + sans is enough)
- ❌ NEVER use Noto Serif for long body paragraphs (readability suffers)
- ❌ NEVER use all caps for body copy (hurts comprehension)
- ❌ NEVER skip heading levels (h1 → h3, breaking semantic structure)
- ❌ NEVER use font sizes below 14px (except metadata at 12px)
- ❌ NEVER ignore line-height (body text needs 1.5+ minimum)
- ❌ NEVER add extra fonts "because they look cool" (consistency matters)

---

## Example Compositions

### Product Card Typography
```html
<!-- Product Name -->
<h3 class="font-headline text-xl text-on-background">
  Lavender Fields
</h3>

<!-- Price -->
<p class="font-body text-lg font-semibold text-primary">
  $18.00
</p>

<!-- Description -->
<p class="font-body text-sm text-on-surface-variant leading-relaxed">
  Calming lavender from Oregon farms, raw honey, olive oil. Cold-pressed, 60-day cure.
</p>

<!-- Badge -->
<span class="font-label text-xs uppercase tracking-widest bg-primary text-on-primary px-3 py-1 rounded-full">
  BEST SELLER
</span>
```

### Hero Section Typography
```html
<!-- Eyebrow -->
<p class="font-label text-xs text-on-surface-variant uppercase tracking-widest mb-2">
  HANDCRAFTED INTENTION
</p>

<!-- Headline -->
<h1 class="font-headline text-4xl md:text-5xl font-bold text-on-background tracking-tight leading-tight">
  Slow-Made Alchemy for Modern Skin
</h1>

<!-- Body -->
<p class="font-body text-lg text-on-surface-variant leading-relaxed max-w-md">
  Ayurvedic luxury soaps handcrafted in micro-batches. Cold-pressed. Cured 60 days. Rooted in 5,000 years of botanical wisdom.
</p>
```

---

**Version**: 1.0 (Stitch Design System)  
**Last Updated**: April 9, 2026  
**Fonts**: Noto Serif (headlines) + Manrope (body/UI)  
**Scale**: 1.333 Perfect Fourth, 16px base
