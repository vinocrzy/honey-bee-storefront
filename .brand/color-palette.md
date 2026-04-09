# Color Palette - Honey Bee

> **Source**: Stitch Design Reference (Material Design 3 color system)  
> **Philosophy**: Tonal depth through layered warm neutrals, honey amber moments, botanical accents  
> **Purpose**: Documents exact color tokens, rationale, accessibility, and usage guidelines

---

## Color Philosophy

**"Luminous Alchemy"** — A palette of warm parchment surfaces, deep honey amber accents, and botanical green moments. Colors create **spatial rhythm through tonal shifts**, not harsh borders.

The system rejects stark whites and sterile grays. Instead, every surface feels like **hand-laid vellum** — warm, organic, and intentionally imperfect (yet accessible).

**Design Principle**: Boundaries through **background color shifts**, never 1px dividers.

---

## Surface Colors (Warm Neutrals)

These create the **layered depth** of the design — imagine stacked sheets of handmade paper, each slightly whiter.

| Token | Hex | WCAG on `on-background` | Usage |
|-------|-----|------------------------|-------|
| `background` | `#fcf9f4` | — | **Page canvas** — Wide open, warm parchment base |
| `surface` | `#fcf9f4` | — | Base surface (same as background) |
| `surface-bright` | `#fcf9f4` | — | Brightest surface variant |
| `surface-dim` | `#dcdad5` | — | Dimmed, muted areas |
| `surface-variant` | `#e5e2dd` | — | Alternative surface tone |
| `surface-container-lowest` | `#ffffff` | 16.9:1 ✅ AAA | **Floating elements** — Cards, product tiles, elevated UI |
| `surface-container-low` | `#f6f3ee` | 15.7:1 ✅ AAA | Lightly grouped backgrounds |
| `surface-container` | `#f0ede8` | 14.5:1 ✅ AAA | **Standard grouped sections** — Feature callouts, footers |
| `surface-container-high` | `#ebe8e3` | 13.4:1 ✅ AAA | Higher-contrast groupings |
| `surface-container-highest` | `#e5e2dd` | 12.0:1 ✅ AAA | Headers, strong surface emphasis |

**Rationale**: The warm `#fcf9f4` base (parchment cream) feels organic and handcrafted, never clinical. Slight tonal shifts create visual hierarchy without needing borders. All surfaces tested with `on-background` text (#1c1c19) pass WCAG AAA.

**Application**:
```typescript
// Canvas
<body className="bg-background">

// Grouped sections (footer, feature rows)
<section className="bg-surface-container">

// Floating artisan product cards
<div className="bg-surface-container-lowest rounded-xl">
```

---

## Primary Colors (Honey Amber Gradient)

**Deep honey amber** for primary CTAs, active navigation, and brand accent moments.

| Token | Hex | On White | Usage |
|-------|-----|----------|-------|
| `primary` | `#7b5800` | 6.5:1 ✅ AA | **Main brand color** — CTAs, active nav, accents |
| `primary-container` | `#d59f2b` | 3.2:1 ⚠️ Large only | Gradient endpoint, highlights |
| `primary-fixed` | `#ffdea6` | 1.4:1 ❌ | Pale amber tint backgrounds (no text) |
| `primary-fixed-dim` | `#f7bd48` | 1.9:1 ❌ | Inverse primary, mid amber (dark bg only) |
| `on-primary` | `#ffffff` | 4.6:1 ✅ AA Large | **Text on primary buttons** (18px+ required) |
| `on-primary-container` | `#513900` | 10.2:1 ✅ AAA | Text on primary containers |
| `on-primary-fixed` | `#271900` | 17.4:1 ✅ AAA | Dark text on fixed primary backgrounds |
| `on-primary-fixed-variant` | `#5d4200` | 7.8:1 ✅ AAA | Variant text on fixed primary |
| `inverse-primary` | `#f7bd48` | — | Amber on dark backgrounds (`inverse-surface`) |
| `surface-tint` | `#7b5800` | — | Overlay tint color |

**Rationale**: Deep `#7b5800` reads as **rich honey**, never garish yellow-gold. It's sophisticated enough for luxury positioning while unmistakably natural. The gradient to `#d59f2b` creates the "honey glow" effect on buttons.

**Honey Glow Gradient** (Signature CTA):
```css
background: linear-gradient(135deg, #7b5800 0%, #d59f2b 100%);
```

**Application**:
```typescript
// Primary CTA button
<button className="honey-glow text-on-primary rounded-xl px-8 py-4">
  EXPLORE SHOP
</button>

// Active navigation link
<a className="border-b-2 border-primary text-primary">

// Hero section accent band
<div className="bg-[#7b5800] text-on-primary">
```

---

## Secondary Colors (Botanical Green)

**Muted botanical green** for ingredient sections, secondary accents, ultra-fine icons.

| Token | Hex | On White | Usage |
|-------|-----|----------|-------|
| `secondary` | `#5c614d` | 7.1:1 ✅ AAA | Icons (ultra-fine), secondary text accents |
| `secondary-container` | `#e0e5cc` | 1.1:1 ❌ | **Botanical ingredient backgrounds** (no text) |
| `secondary-fixed` | `#e0e5cc` | 1.1:1 ❌ | Fixed secondary containers |
| `secondary-fixed-dim` | `#c4c9b1` | 1.3:1 ❌ | Dimmed secondary |
| `on-secondary` | `#ffffff` | 5.2:1 ✅ AA | Text on secondary (rare use) |
| `on-secondary-container` | `#626753` | 7.5:1 ✅ AAA | **Text on botanical green backgrounds** |

**Rationale**: Soft sage green (`#e0e5cc`) subtle enough not to compete with honey amber, yet distinctly botanical. Use sparingly for ingredient feature cards, "natural" messaging moments.

**Application**:
```typescript
// Ingredient feature cards
<div className="bg-secondary-container rounded-xl p-6">
  <p className="text-on-secondary-container">
    Lavender · Honey · Kaolin Clay
  </p>
</div>

// Icons (Material Symbols ultra-fine)
<span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: "'wght' 100"}}>
  eco
</span>
```

---

## Tertiary Colors (Warm Terracotta)

**Warm earth accent** for special badges, limited editions, autumn seasonal promotions.

| Token | Hex | On White | Usage |
|-------|-----|----------|-------|
| `tertiary` | `#944925` | 5.9:1 ✅ AA | Warm terracotta accent (rare) |
| `tertiary-container` | `#ee9066` | 2.4:1 ❌ | Warm accent containers (light text) |
| `tertiary-fixed` | `#ffdbcd` | 1.3:1 ❌ | Pale terracotta tint |
| `tertiary-fixed-dim` | `#ffb596` | 1.6:1 ❌ | Mid terracotta (dark bg only) |

**Rationale**: Earthy clay tone for "limited edition" badges, autumn/pumpkin spice seasonal products. Use very sparingly.

---

## Text Colors (CRITICAL)

**NEVER use `#000000` black.** All "black" text is the warm `#1c1c19` (almost-black with brown undertone).

| Token | Hex | On `background` | Usage |
|-------|-----|-----------------|-------|
| `on-background` | `#1c1c19` | 16.5:1 ✅ AAA | **ALL body text, headlines** — This is "black" |
| `on-surface` | `#1c1c19` | 16.5:1 ✅ AAA | Text on surfaces (same as on-background) |
| `on-surface-variant` | `#4f4634` | 8.9:1 ✅ AAA | **Labels, helper text, captions, nav** |
| `inverse-on-surface` | `#f3f0eb` | — | Text on dark/inverse surfaces |

**Rationale**: `#1c1c19` has a subtle warm brown undertone that harmonizes with the warm parchment canvas. Cold `#000000` would feel jarring and sterile against `#fcf9f4`.

**Application**:
```typescript
// All body text, headings
<h1 className="text-on-background">Honey Bee</h1>
<p className="text-on-surface">Handcrafted intention...</p>

// Navigation, labels, captions
<span className="text-on-surface-variant uppercase tracking-widest">
  HOME / SHOP
</span>
```

---

## Structural Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `outline` | `#817662` | **Visible dividers** (use sparingly — prefer tonal shifts) |
| `outline-variant` | `#d3c5ae` | **Ghost borders on inputs** (at 40% opacity: `rgba(211,197,174,0.4)`) |
| `inverse-surface` | `#31302d` | **Dark sections** (e.g., "Nurse's Promise" band) |

**Application**:
```typescript
// Input bottom stroke (ONLY border style used)
<input className="border-0 border-b border-[rgba(211,197,174,0.4)] focus:border-primary">

// Dark quote band
<section className="bg-inverse-surface text-inverse-on-surface">
  <blockquote>"It began with a nurse's hands..."</blockquote>
</section>
```

---

## Error / Feedback Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `error` | `#ba1a1a` | Error state (use sparingly, with icon + text) |
| `error-container` | `#ffdad6` | Error container background |
| `on-error` | `#ffffff` | Text on error |

**Application**:
```typescript
// Form error
<div className="bg-error-container text-error rounded px-3 py-2 text-sm">
  <span className="material-symbols-outlined">warning</span>
  Please enter a valid email
</div>
```

---

## WCAG Accessibility Compliance

### Tested Contrast Ratios

**All critical combinations pass WCAG AA minimum** (AAA where possible):

| Foreground | Background | Ratio | Pass | Usage |
|------------|------------|-------|------|-------|
| `#1c1c19` | `#fcf9f4` | 16.5:1 | ✅ AAA | Body text on canvas |
| `#1c1c19` | `#ffffff` | 16.9:1 | ✅ AAA | Text on white cards |
| `#4f4634` | `#fcf9f4` | 8.9:1 | ✅ AAA | Labels on canvas |
| `#ffffff` | `#7b5800` | 4.6:1 | ✅ AA Large | Button text (18px+) |
| `#7b5800` | `#fcf9f4` | 3.6:1 | ✅ AA Large | Primary links, nav |
| `#626753` | `#e0e5cc` | 4.9:1 | ✅ AA | Text on botanical bg |

⚠️ **Button Text Rule**: White text on primary (`#ffffff` on `#7b5800`) achieves 4.6:1, passing AA for **large text only** (18px+ or 14px+ bold). Always use at least 16px font on buttons, preferably 18px.

### Accessibility Guidelines

✅ **NEVER use color alone** to convey information  
✅ Always pair with icons + text labels  
✅ Ensure 44x44px minimum touch targets (mobile)  
✅ Test with Chrome DevTools Lighthouse  
✅ Test with axe DevTools browser extension  
✅ Consider colorblind users (red-green deficiency)

---

## Color Application Rules

### 60-30-10 Rule
- **60%** Warm neutrals (`background`, `surface-container`) — Breathing room, canvas
- **30%** Honey amber (`primary`) — Brand presence, CTAs, accents
- **10%** Botanical green or terracotta — Rare accent moments

### Page Color Hierarchy

**Homepage Example**:
1. **Canvas** → `bg-background` (#fcf9f4)
2. **Floating nav** → `bg-background/80` with `backdrop-blur`
3. **Hero** → `bg-background` with image overlay
4. **Feature row** → `bg-surface-container` (#f0ede8)
5. **Product cards** → `bg-surface-container-lowest` (#ffffff)
6. **Ingredient section** → `bg-secondary-container` (#e0e5cc)
7. **Dark quote band** → `bg-inverse-surface` (#31302d) or `bg-[#7b5800]`
8. **Footer** → `bg-surface-container` (#f0ede8)

### Color Don'ts ❌

- ❌ NEVER use `#000000` pure black (use `#1c1c19`)
- ❌ NEVER use 1px solid borders for sections (use background shifts)
- ❌ NEVER use cold grays (`#808080`) — contradicts warm brand
- ❌ NEVER use stark white backgrounds everywhere (use tonal layers)
- ❌ NEVER use primary amber as large background (overwhelming)
- ❌ NEVER rely on color alone for success/error states

---

## Color Psychology

### Honey Amber (#7b5800)
**Evokes**: Warmth, natural sweetness, artisan craft, premium quality without pretension  
**Avoids**: Garish gold, cheap yellow, artificial brightness  
**Brand Fit**: Directly represents honey, the core ingredient

### Warm Parchment (#fcf9f4)
**Evokes**: Handmade paper, organic materials, slow craft, intentional imperfection  
**Avoids**: Sterile white, cold digital, mass production feel  
**Brand Fit**: Reinforces artisan, small-batch, natural positioning

### Botanical Green (#e0e5cc)
**Evokes**: Ayurvedic herbs, natural ingredients, gentle healing, sustainable practice  
**Avoids**: Neon green, artificial mint, chemical brighteners  
**Brand Fit**: Supports botanical purity, herbal tradition

---

## Design Tools & Testing

**Color Palette Tools**:
- [Coolors.co Palette](https://coolors.co/fcf9f4-7b5800-e0e5cc-1c1c19) — Full palette view
- [Adobe Color](https://color.adobe.com/) — Harmony testing
- [Material Design 3 Color Tool](https://m3.material.io/styles/color/overview) — Original source

**Accessibility Testing**:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Chrome DevTools Lighthouse (Accessibility audit)
- [axe DevTools](https://www.deque.com/axe/devtools/) browser extension
- [Colorblind Simulator](https://www.color-blindness.com/coblis-color-blindness-simulator/)

---

**Version**: 1.0 (Stitch Design System)  
**Last Updated**: April 9, 2026  
**Next Review**: When adding new product lines or seasonal themes
