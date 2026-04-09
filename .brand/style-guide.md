# Visual Style Guide - Honey Bee

> **Creative Direction**: "The Luminous Alchemist" — A digital atelier for Ayurvedic luxury artisan soaps  
> **Design Reference**: Stitch UI/UX Design System  
> **Purpose**: Comprehensive visual guidelines for maintaining brand consistency across all touchpoints

---

## Brand Overview

**Brand Name**: Honey Bee Artisan Soaps  
**Industry**: Ayurvedic luxury skincare (natural soaps, face oils)  
**Target Market**: Wellness-conscious consumers, ages 28-48, $75K-$150K+ income  
**Style Keywords**: Editorial · Warm · Intentional · Organic · Luxurious

**Visual North Star**: Think curated wellness magazine meets artisan apothecary. Not a template — a digital atelier.

---

## Design Philosophy: The "No-Line" Rule

**CRITICAL PRINCIPLE**: Boundaries created through **background color shifts**, never 1px solid borders.

Think of the design as **stacked sheets of handmade vellum**:
- Layer 0 (Canvas): `#fcf9f4` warm parchment
- Layer 1 (Grouped): `#f0ede8` slightly darker cream
- Layer 2 (Floating): `#ffffff` white cards

**Visual hierarchy through tonal depth**, not lines.

---

## Logo & Brand Mark

### Brand Wordmark: "Honey Bee"

**Typography**:
- Font: Noto Serif, 24-32px
- Weight: 400 (Regular) or 700 (Bold) — context-dependent
- Color: `primary` (#7b5800) — deep honey amber
- Tracking: -0.02em (tight)

**Placement**:
- Navigation: 24px, regular weight
- Hero moments: 32px+, bold weight
- Footer: 20px, regular weight

**Minimum Size**: 80px width to maintain legibility  
**Clear Space**: Minimum padding equal to height of text

**Variants**:
```html
<!-- Navigation variant -->
<div class="text-2xl font-headline text-primary tracking-tight">
  Honey Bee
</div>

<!-- Hero variant -->
<h1 class="text-4xl font-headline font-bold text-primary tracking-tight">
  Honey Bee Artisan Soaps
</h1>
```

### Logo Usage Rules

✅ **DO**:
- Use Noto Serif font (never substitute)
- Maintain primary color (#7b5800) on light backgrounds
- Use white or inverse-primary (#f7bd48) on dark backgrounds
- Ensure adequate breathing room (no tight cropping)

❌ **DON'T**:
- Use generic serif fonts (Times New Roman, Georgia)
- Add effects (drop shadows, gradients, outlines)
- Place on busy photographic backgrounds without overlay
- Use cold grays or blacks for text color
- Stretch or condense text

---

## Color System

**See [color-palette.md](./color-palette.md) for complete documentation.**

### Surface Layering (Critical)

```
background (#fcf9f4) ← Page canvas
  ↓
surface-container (#f0ede8) ← Feature sections, footer
  ↓
surface-container-lowest (#ffffff) ← Floating cards, product tiles
```

**Application Example**:
```typescript
// Page structure
<body className="bg-background"> <!-- #fcf9f4 -->
  <section className="bg-surface-container"> <!-- #f0ede8 -->
    <div className="bg-surface-container-lowest rounded-xl"> <!-- #ffffff card -->
```

### Primary Color Usage

**Honey Amber (#7b5800)**:
- ✅ Primary CTAs (with gradient `honey-glow`)
- ✅ Active navigation links  
- ✅ Brand wordmark
- ✅ Accent moments (price, badges)
- ❌ **NEVER** large background areas (overwhelming)

**Honey Glow Gradient** (Signature Effect):
```css
.honey-glow {
  background: linear-gradient(135deg, #7b5800 0%, #d59f2b 100%);
}
```

### Secondary Color (Botanical Green)

**Use Cases**:
- Ingredient feature cards (`bg-secondary-container` #e0e5cc)
- Ultra-fine icons (`text-secondary` #5c614d)
- "Natural Ingredients" messaging sections

### Text Color (NEVER Pure Black)

All "black" text uses **`#1c1c19`** (warm near-black):
```typescript
<p className="text-on-background"> <!-- #1c1c19 -->
<p className="text-on-surface-variant"> <!-- #4f4634 for labels -->
```

---

## Typography

**See [typography.md](./typography.md) for complete system.**

### Font Hierarchy

| Element | Font | Size | Weight | Usage |
|---------|------|------|--------|-------|
| Hero Headline | Noto Serif | 56px | 700 | `font-headline text-4xl font-bold` |
| Section Heading | Noto Serif | 32-36px | 400/700 | `font-headline text-2xl` |
| Product Name | Noto Serif | 20-24px | 400 | `font-headline text-xl` |
| Body Text | Manrope | 16px | 400 | `font-body text-base` |
| Button/CTA | Manrope | 12-14px | 600 | `font-label text-xs uppercase tracking-widest` |
| Navigation | Manrope | 12px | 600 | `font-label uppercase tracking-widest` |

### Typography Rules

✅ **Headlines**: Always `font-headline` (Noto Serif) with `tracking-tight`  
✅ **Body**: Always `font-body` (Manrope) with `leading-relaxed` (1.6-1.8)  
✅ **Labels/Nav**: `font-label`, `uppercase`, `tracking-widest`  
❌ **NEVER**: Use serif for long body paragraphs (hurts readability)  
❌ **NEVER**: Use tight tracking on uppercase (illegible)

---

## Border Radius

**Organic softness** — rounded corners create artisan, handcrafted feel.

```typescript
borderRadius: {
  DEFAULT: '0.25rem',   // 4px  — Subtle rounding
  lg: '0.5rem',         // 8px  — Standard cards (v1 screens)
  xl: '1.5rem',         // 24px — Artisan cards (v2 screens), primary buttons
  full: '9999px',       // Pill — Badges, tags, filter chips
}
```

**Artisan Cards** (product tiles): Always use `rounded-xl` (1.5rem)  
**Primary Buttons**: `rounded-xl` (1.5rem) — organic pebble feel  
**Badges/Tags**: `rounded-full` — pill shape  
**Inputs**: `rounded` (0.25rem) — subtle corners

**Application**:
```html
<div className="rounded-xl bg-surface-container-lowest"> <!-- Product card -->
<button className="honey-glow rounded-xl px-8 py-4"> <!-- CTA button -->
<span className="rounded-full bg-primary text-on-primary px-4 py-1.5"> <!-- Badge -->
```

---

## Shadows & Elevation

### Sunlight Shadow (Floating Elements)

**Purpose**: Subtle depth for cards, modals, elevated UI  
**Color**: Warm undertone (#1c1c19 at 5% opacity)  
**NEVER**: Gray or black shadows (contradicts warm brand)

```css
.sunlight-shadow {
  box-shadow: 0 12px 40px rgba(28, 28, 25, 0.05);
}
```

**Usage**:
- Product cards
- Modals / dialogs
- Floating CTAs
- Sticky navigation (optional)

---

## Component Patterns

### 1. Navigation Bar

**Structure**: Sticky top, botanical glass effect (frosted)

```html
<nav class="sticky top-0 z-50 bg-[#fcf9f4]/80 backdrop-blur-md flex justify-between items-center px-8 md:px-20 py-6">
  <!-- Brand mark -->
  <div class="text-2xl font-headline text-primary tracking-tight">
    Honey Bee
  </div>
  
  <!-- Nav links -->
  <div class="flex gap-8 font-label text-xs uppercase tracking-widest text-on-surface-variant">
    <a href="/shop" class="border-b-2 border-primary text-primary">SHOP</a>
    <a href="/our-story">OUR STORY</a>
    <a href="/rituals">RITUALS</a>
  </div>
  
  <!-- Cart icon -->
  <div class="relative">
    <span class="material-symbols-outlined" style="font-variation-settings: 'wght' 200">
      shopping_bag
    </span>
    <span class="absolute -top-1 -right-1 bg-primary text-on-primary rounded-full w-5 h-5 text-xs flex items-center justify-center">
      3
    </span>
  </div>
</nav>
```

**Key Details**:
- **Background**: `bg-[#fcf9f4]/80` with `backdrop-blur-md` (botanical-glass effect)
- **Active link**: `border-b-2 border-primary`
- **Icons**: Material Symbols Outlined, ultra-fine weight (100-300)

---

### 2. Hero Section

**Structure**: Full-bleed background image + left-aligned content + gradient overlay

```html
<section class="relative min-h-[750px] md:min-h-[920px]">
  <!-- Background image -->
  <img src="/hero-lavender.jpg" class="absolute inset-0 w-full h-full object-cover -z-10" />
  
  <!-- Gradient overlay (left to right fade) -->
  <div class="absolute inset-0 -z-5 hero-overlay"></div>
  
  <!-- Content -->
  <div class="px-8 md:px-20 py-24 md:py-32 max-w-2xl">
    <!-- Eyebrow -->
    <p class="font-label text-xs text-on-surface-variant uppercase tracking-widest mb-2">
      HANDCRAFTED INTENTION
    </p>
    
    <!-- Headline -->
    <h1 class="font-headline text-4xl md:text-5xl font-bold text-on-background tracking-tight leading-tight mb-6">
      Slow-Made Alchemy for Modern Skin
    </h1>
    
    <!-- Body -->
    <p class="font-body text-lg text-on-surface-variant leading-relaxed max-w-md mb-8">
      Ayurvedic luxury soaps handcrafted in micro-batches. Cold-pressed. Cured 60 days. Rooted in 5,000 years of botanical wisdom.
    </p>
    
    <!-- CTAs -->
    <div class="flex gap-4">
      <button class="honey-glow text-on-primary font-label text-xs uppercase tracking-widest rounded-xl px-8 py-4">
        EXPLORE SHOP
      </button>
      <button class="bg-transparent border-b border-primary text-primary font-label text-xs uppercase tracking-widest">
        VIEW RITUALS
      </button>
    </div>
  </div>
</section>
```

**CSS Custom Class**:
```css
.hero-overlay {
  background: linear-gradient(
    to right,
    rgba(252,249,244,0.9) 0%,
    rgba(252,249,244,0.4) 50%,
    transparent 100%
  );
}
```

---

### 3. Product Card (Artisan Card)

**Structure**: Floating white card, rounded corners, sunlight shadow

```html
<div class="bg-surface-container-lowest rounded-xl sunlight-shadow overflow-hidden">
  <!-- Image -->
  <img src="/lavender-bar.jpg" class="w-full aspect-square object-cover" />
  
  <!-- Content -->
  <div class="p-6">
    <!-- Badges -->
    <span class="inline-block rounded-full bg-primary text-on-primary font-label text-xs uppercase tracking-widest px-3 py-1 mb-3">
      BEST SELLER
    </span>
    
    <!-- Product name -->
    <h3 class="font-headline text-xl text-on-background mb-2">
      Lavender Fields
    </h3>
    
    <!-- Price -->
    <p class="font-body text-lg font-semibold text-primary mb-3">
      $18.00
    </p>
    
    <!-- Description -->
    <p class="font-body text-sm text-on-surface-variant leading-relaxed mb-4">
      Calming lavender from Oregon farms, raw honey, olive oil. Cold-pressed, 60-day cure.
    </p>
    
    <!-- Rating -->
    <div class="flex items-center gap-1 text-primary text-xs">
      <span>★★★★★</span>
      <span class="text-on-surface-variant ml-2">(127)</span>
    </div>
  </div>
</div>
```

**Key Details**:
- **NO visible borders** — only `sunlight-shadow` for depth
- **Rounded corners**: `rounded-xl` (1.5rem) — artisan pebble feel
- **White background**: `bg-surface-container-lowest`
- **Badges**: Pill-shaped (`rounded-full`), honey-glow gradient optional

---

### 4. Buttons

#### Primary CTA (Honey Glow)
```html
<button class="honey-glow text-on-primary font-label text-xs uppercase tracking-widest rounded-xl px-8 py-4 hover:opacity-90 transition-opacity">
  ADD TO BASKET
</button>
```

#### Ghost / Secondary Button
```html
<button class="bg-transparent text-primary font-label text-xs uppercase tracking-widest underline hover:no-underline transition-all">
  VIEW RITUALS
</button>
```

#### Outline Button
```html
<button class="border border-outline-variant rounded-full text-on-surface-variant font-label text-xs uppercase tracking-widest px-10 py-3 hover:border-primary hover:text-primary transition-colors">
  DISCOVER MORE
</button>
```

**Rules**:
- **Text**: Always `uppercase`, `tracking-widest`, 12-14px
- **Padding**: Generous (minimum 44x44px for mobile taps)
- **Border radius**: `rounded-xl` for primary, `rounded-full` for outline
- **Hover**: Subtle opacity or underline transitions, never jarring

---

### 5. Input Fields (Bottom Stroke Only)

**Structure**: Transparent background, bottom border only, no box outline

```html
<input 
  type="text" 
  placeholder="Enter your email"
  class="w-full bg-transparent border-0 border-b border-[rgba(211,197,174,0.4)] focus:border-primary focus:border-b-2 focus:outline-none py-2 font-body text-base text-on-surface placeholder:text-on-surface-variant transition-colors"
/>
```

**Focus State**:
- Border changes to `primary` (#7b5800)
- Border thickness increases to 2px
- **NO** glowing outline rings

**Label Style**:
```html
<label class="block font-label text-xs text-on-surface-variant uppercase tracking-widest mb-2">
  EMAIL ADDRESS
</label>
```

---

### 6. Filter / Tag Chips

**Usage**: Product filters, skin type tags, ingredient tags

```html
<!-- Default state -->
<span class="inline-block rounded-full border border-outline-variant text-on-surface font-label text-xs px-4 py-1.5 hover:border-primary transition-colors cursor-pointer">
  Sensitive
</span>

<!-- Active state -->
<span class="inline-block rounded-full bg-primary text-on-primary font-label text-xs px-4 py-1.5">
  Lavender
</span>
```

**Key Details**:
- **Shape**: `rounded-full` (pill)
- **Default**: Subtle border, no fill
- **Active**: Honey amber fill, white text

---

### 7. Section Titles with Eyebrow

**Pattern**: Small caps label above serif heading

```html
<div>
  <!-- Eyebrow -->
  <p class="font-label text-xs text-on-surface-variant uppercase tracking-widest mb-2">
    OUR HERITAGE
  </p>
  
  <!-- Heading -->
  <h2 class="font-headline text-3xl md:text-4xl text-on-background tracking-tight">
    From Care to Craft
  </h2>
</div>
```

---

### 8. Ingredient Feature Cards

**Background**: Botanical green tint (`secondary-container`)

```html
<div class="bg-secondary-container rounded-xl p-6">
  <!-- Icon -->
  <span class="material-symbols-outlined text-secondary text-5xl mb-4" style="font-variation-settings: 'wght' 100">
    eco
  </span>
  
  <!-- Title -->
  <h3 class="font-body font-semibold text-lg text-on-background mb-2">
    Organic Lavender
  </h3>
  
  <!-- Description -->
  <p class="font-body text-sm text-on-surface-variant leading-relaxed">
    Grown in Oregon without pesticides. Calms skin, promotes restful sleep.
  </p>
</div>
```

**Key**: Soft botanical green background (#e0e5cc) signifies natural ingredients.

---

### 9. Dark Quote Band ("The Nurse's Promise")

**Usage**: Impactful brand philosophy or testimonial moments

```html
<section class="bg-[#7b5800] py-16 md:py-24 px-8 md:px-20">
  <div class="max-w-3xl mx-auto text-center">
    <!-- Quote -->
    <blockquote class="font-headline text-2xl md:text-3xl italic text-white leading-relaxed mb-4">
      "It began with a nurse's hands — worn from hospital-grade soaps. Every bar answers the question: what if skincare actually cared?"
    </blockquote>
    
    <!-- Attribution -->
    <p class="font-label text-xs text-white/70 uppercase tracking-widest">
      — FOUNDER'S PROMISE
    </p>
  </div>
</section>
```

**Variants**:
- `bg-[#7b5800]` — Honey amber (warm)
- `bg-inverse-surface` (#31302d) — Dark charcoal (dramatic)

---

## Spacing System

### Container Padding (Horizontal)

| Breakpoint | Padding | Tailwind Class |
|-----------|----------|----------------|
| Mobile | 16-24px | `px-4` to `px-6` |
| Tablet | 32px | `px-8` |
| Desktop | **80px** | `px-8 md:px-20` |

**Rule**: Luxury is defined by the space you don't use. Never crowd the edges.

### Vertical Rhythm

| Element | Spacing | Tailwind Class |
|---------|---------|----------------|
| Hero section height | 750-920px | `min-h-[750px]` |
| Section padding (Y) | 48-64px | `py-12` to `py-16` |
| Between sections | 64-96px | `space-y-16` to `space-y-24` |
| Card grids gap | 16-24px | `gap-4` to `gap-6` |
| Heading → body | 16-24px | `mt-4` to `mt-6` |

---

## Icons

**Library**: [Material Symbols Outlined](https://fonts.google.com/icons)

**Weight**: Ultra-fine (100-300) for organic, delicate feel

```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">

<span class="material-symbols-outlined text-secondary" style="font-variation-settings: 'wght' 200, 'FILL' 0">
  eco
</span>
```

**Common Icons**:
- `eco` — Natural/botanical
- `favorite` — Wishlist
- `shopping_bag` — Cart
- `local_shipping` — Shipping
- `spa` — Wellness/skincare
- `verified` — Trust badges

---

## Photography Direction

### Product Photography
- **Style**: Top-down flat lays, natural light, raw ingredients visible
- **Composition**: Soap + honey jar + botanical sprigs (lavender, eucalyptus)
- **Surface**: Raw wood, linen, marble (organic textures)
- **Color grading**: Warm, desaturated slightly, golden hour feel

### Lifestyle Photography
- **Moments**: Hands in ritual use, lather close-ups, bathroom shelf styling
- **Aesthetic**: Minimal, curated, slow-living vibe
- **Models**: Natural beauty, diverse skin tones, authentic moments

### Ingredient Photography
- **Focus**: Macro botanical details (honey drips, lavender buds, clay texture)
- **Lighting**: Soft natural light, side-lit for dimension

### Do's and Don'ts

✅ **DO**:
- Show raw ingredients alongside finished product
- Use natural light (avoid harsh flash)
- Maintain warm color tones
- Include hands, textures, honest moments

❌ **DON'T**:
- Over-style or overly staged setups
- Use cold/blue color grading
- Show cluttered backgrounds
- Over-edit (maintain natural imperfection)

---

## Accessibility (WCAG 2.1 AA)

### Color Contrast
✅ All text passes minimum 4.5:1 (normal) or 3:1 (large 18px+)  
✅ UI components pass 3:1 minimum  
✅ Never use color alone to convey information (add icons + text)

### Touch Targets
✅ Minimum 44x44px for all interactive elements (mobile)  
✅ Adequate spacing between tap targets

### Keyboard Navigation
✅ Logical tab order  
✅ Visible focus indicators (2px outline, primary color)  
✅ All actions keyboard accessible

### Semantic HTML
✅ Proper heading hierarchy (h1 → h2 → h3)  
✅ Landmarks (nav, main, aside, footer)  
✅ Alt text on all images  
✅ ARIA labels on icon-only buttons

---

## Brand Guardian Checklist

Before approving any design, ask:

- [ ] Does this feel **intentional**, not rushed or template-based?
- [ ] Are boundaries created through **tonal shifts**, not 1px borders?
- [ ] Is typography **clear hierarchy** (serif headlines, sans body)?
- [ ] Does it use **generous whitespace** (not crowded)?
- [ ] Are colors from the **approved palette** (no random hex codes)?
- [ ] Does it feel **warm and organic**, not cold or sterile?
- [ ] Is accessibility maintained (contrast, touch targets, semantics)?
- [ ] Would our primary audience (Conscious Curator) feel this reflects their values?

---

**Version**: 1.0 (Stitch Design System)  
**Last Updated**: April 9, 2026  
**Next Review**: When launching new product lines or seasonal campaigns
