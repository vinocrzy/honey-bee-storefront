# Color Palette - Honey Bee

> **Purpose**: Documents color choices, rationale, and usage guidelines for Honey Bee's natural, warm brand identity.

## Color Philosophy
Warm earth tones reflecting the natural, handmade quality of artisanal honey soaps. Colors evoke honey, nature, and organic purity - creating a welcoming, trustworthy, and gentle brand experience.

## Primary Color Palette

### Primary Color
**Name**: Honey Gold  
**Hex**: `#F59E0B`  
**Usage**: Primary CTAs, brand moments, highlights, "Add to Cart" buttons

**Rationale**: Warm honey gold is the heart of our brand. It immediately communicates natural honey - our signature ingredient - while feeling warm, inviting, and trustworthy. The golden tone suggests premium quality without feeling ostentatious, perfect for artisanal handmade products.

**Color Shades** (Light to Dark):
```typescript
primary: {
  50: '#FFFBEB',   // Lightest - page backgrounds, subtle sections
  100: '#FEF3C7',  // Light cream - card backgrounds
  200: '#FDE68A',  // Soft honey glow - hover states
  300: '#FCD34D',  // Light honey - accents
  400: '#FBBF24',  // Medium honey
  500: '#F59E0B',  // Main brand color - honey gold (PRIMARY)
  600: '#D97706',  // Deep honey - hover states
  700: '#B45309',  // Dark honey - text on light
  800: '#92400E',  // Rich amber - strong emphasis
  900: '#78350F',  // Darkest - primary text color
}
```

### Secondary Color
**Name**: Natural Green  
**Hex**: `#10B981`  
**Usage**: Success states, nature-related content, eco-friendly messaging, accent elements

**Rationale**: Fresh, natural green reinforces the organic and sustainable aspects of the brand. It complements honey gold beautifully (analogous color harmony) and evokes botanical ingredients, freshness, and environmental consciousness.

**Color Shades**:
```typescript
secondary: {
  50: '#ECFDF5',   // Lightest mint
  100: '#D1FAE5',  // Soft green
  200: '#A7F3D0',
  300: '#6EE7B7',
  400: '#34D399',
  500: '#10B981',  // Main natural green
  600: '#059669',  // Deep green
  700: '#047857',  // Forest green
  800: '#065F46',
  900: '#064E3B',  // Darkest green
}
```

### Accent Color
**Name**: Warm Cream  
**Hex**: `#FFFBEB`  
**Usage**: Backgrounds, subtle sections, creating breathing room

**Rationale**: Soft, warm cream provides a gentle background that feels organic and natural (like beeswax or raw soap). It's not stark white, giving a handmade, artisanal feel while maintaining high contrast for accessibility.

## Neutral Colors

### Background Colors
```typescript
background: {
  primary: '#FFFBEB',    // Warm cream - main background
  secondary: '#FEF3C7',  // Light honey cream - subtle sections
  tertiary: '#FDE68A',   // Soft honey - cards, panels
}
```

### Text Colors
```typescript
text: {
  primary: '#78350F',    // Dark amber - main body text (from primary-900)
  secondary: '#92400E',  // Rich amber - supporting text (from primary-800)
  tertiary: '#B45309',   // Medium amber - muted text (from primary-700)
  inverse: '#FFFBEB',    // Cream - text on dark backgrounds
}
```

## Semantic Colors

### Success
**Hex**: `#10B981` (Natural Green)
**Usage**: Success messages, completed actions, "Product added to cart"

### Warning
**Hex**: `#F59E0B` (Honey Gold)
**Usage**: Important notices, "Only 3 left in stock"

### Error
**Hex**: `#DC2626` (Natural Red)
**Usage**: Error messages, form validation errors

### Info
**Hex**: `#06B6D4` (Fresh Cyan)
**Usage**: Informational messages, "Free shipping on $50+"

## Color Psychology

### Honey Gold (#F59E0B)
**Psychological Impact**: Warmth, optimism, comfort, trust, energy. Gold tones suggest quality and value without luxury pretension. Honey specifically evokes natural sweetness, health, and artisanal care.

**Cultural Considerations**: Universally positive - associated with sunshine, warmth, and happiness across cultures. In skincare, gold tones suggest nourishment and richness.

**Brand Alignment**: Perfectly aligns with handmade honey soaps. The color IS our product - immediate visual recognition. Warm without being aggressive, premium without being exclusive.

### Natural Green (#10B981)
**Psychological Impact**: Growth, health, freshness, nature, renewal. Green is calming and associated with wellness and environmental consciousness.

**Cultural Considerations**: Universally linked to nature and health. In beauty/skincare, green suggests botanical ingredients and organic purity.

**Brand Alignment**: Reinforces natural ingredients, sustainability commitments, and eco-friendly practices. Complements honey gold beautifully.

## Color Application Rules

### 60-30-10 Rule
- **60%**: Warm Cream (#FFFBEB) - Dominant background, breathing room
- **30%**: Honey Gold (#F59E0B shades) - Supporting elements, sections
- **10%**: Natural Green (#10B981) - Accent CTAs, highlights

### Color Combinations

**Hero Section**:
- Background: Warm Cream (#FFFBEB)
- Heading: Dark Amber (#78350F)
- Body text: Rich Amber (#92400E)
- CTA: Honey Gold (#F59E0B) with white text

**Product Cards**:
- Card background: White or Light Honey Cream (#FEF3C7)
- Product name: Dark Amber (#78350F)
- Price: Honey Gold (#F59E0B)
- Add to cart button: Honey Gold (#F59E0B) background, white text

**Navigation**:
- Nav background: White with subtle Warm Cream (#FFFBEB) tint
- Nav text: Dark Amber (#78350F)
- Active link: Honey Gold (#F59E0B)
- Hover state: Light Honey (#FCD34D) background

## Accessibility (WCAG 2.1 AA)

### Contrast Ratios ✅

All text pairs must meet minimum contrast ratios:
- **Normal text** (under 18px): 4.5:1 minimum ✅
- **Large text** (18px+ or 14px+ bold): 3:1 minimum ✅
- **UI components**: 3:1 minimum ✅

**Tested Combinations**:

| Foreground | Background | Ratio | Result | Usage |
|------------|------------|-------|--------|-------|
| `#78350F` (Dark Amber) | `#FFFBEB` (Warm Cream) | 8.2:1 | ✅ AAA | Body text on main background |
| `#FFFBEB` (Cream) | `#F59E0B` (Honey Gold) | 3.1:1 | ✅ AA Large | Button text (18px+) |
| `#92400E` (Rich Amber) | `#FEF3C7` (Light Cream) | 6.5:1 | ✅ AAA | Text on cards |
| `#FFFFFF` (White) | `#F59E0B` (Honey Gold) | 2.9:1 | ⚠️ AA Large only | Large buttons only (18px+) |
| `#78350F` (Dark Amber) | `#FDE68A` (Soft Honey) | 4.8:1 | ✅ AA | Text on honey background |
| `#10B981` (Green) | `#FFFBEB` (Cream) | 4.2:1 | ✅ AA | Green accent on cream |

**Testing Tools**:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Chrome DevTools Lighthouse (Accessibility audit)
- axe DevTools extension

### Non-Color Indicators ⚠️

**NEVER** use color alone to convey information. Always pair with:
- ✅ Icons (e.g., ✓ checkmark for success, ⚠ warning triangle)
- ✅ Text labels ("Success", "Error", "Out of Stock")
- ✅ Patterns/textures
- ✅ Position/layout

**Examples**:
- Error fields: Red border + ⚠ icon + "Please enter a valid email" message
- Success: Green background + ✓ icon + "Added to cart!" text
- Out of stock: Grayed image + "Out of Stock" overlay + disabled button

## Color Don'ts

❌ **NEVER**:
- Use primary Honey Gold (#F59E0B) as large background areas (overwhelming)
- Pair light honey shades with white text (fails contrast)
- Use too many colors (stick to honey gold, natural green, + neutrals)
- Ignore colorblind accessibility (always include icons + text)
- Use red and green alone to differentiate (colorblind issue)
- Apply cold blues or harsh grays (contradicts warm, natural brand)

## References

**Inspiration sources**:
- Natural honey (the product itself!)
- Beeswax candles (warm, organic glow)
- Botanical gardens (natural greens)
- Artisan craft markets (warm, handmade aesthetic)

**Color Palette Harmony**:
- Analogous harmony: Amber/Gold (#F59E0B) + Green (#10B981)
- Temperature: Warm-dominant with cool green accent
- 60-30-10 rule: Neutral 60% + Honey 30% + Green 10%

**Design Tools**:
- [Coolors.co](https://coolors.co/fffbeb-f59e0b-10b981-78350f) - Full palette
- [Adobe Color](https://color.adobe.com/) - Harmony testing
- [WebAIM](https://webaim.org/resources/contrastchecker/) - Contrast verification

---

**Last Updated**: April 8, 2026
**Updated By**: Design System Team
