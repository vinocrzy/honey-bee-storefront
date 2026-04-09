/**
 * Honey Bee â€” Card Component Variants
 * Stitch "Luminous Alchemist" artisan card system
 *
 * Default (artisan): no border, rounded-xl, sunlight-shadow â€” the pebble-like feel
 * Flat: no shadow, used inside surface-container sections
 * Featured: used in editorial grid tiles (full-bleed image + text overlay)
 */

import { spacing, semanticTransitions } from '../tokens';

export type CardElevation = 'flat' | 'low' | 'artisan' | 'featured';
export type CardImageRatio = 'square' | 'portrait' | 'landscape';

/* â”€â”€ Stitch MD3 constants â”€â”€ */
const C = {
  cardBg:      '#ffffff',   // surface-container-lowest
  sectionBg:   '#f0ede8',   // surface-container
  shadow:      '0 12px 40px rgba(28, 28, 25, 0.05)',   // sunlight-shadow
  shadowFocus: '0 20px 56px rgba(28, 28, 25, 0.09)',   // hover state
  onBackground:'#1c1c19',
} as const;

/**
 * Card Base
 */
const cardBase = {
  overflow: 'hidden' as const,
  transition: semanticTransitions.base,
};

/**
 * Card Elevation Variants
 */
export const cardElevations = {
  flat: { boxShadow: 'none' },
  low:  { boxShadow: '0 2px 8px rgba(28, 28, 25, 0.04)' },
  artisan: { boxShadow: C.shadow },
  featured: { boxShadow: 'none' },
};

/**
 * Product Card Image Aspect Ratios
 */
export const cardImageRatios = {
  square:    '1 / 1',   // Honey Bee soaps â€” default
  portrait:  '3 / 4',  // Full-bar portrait
  landscape: '4 / 3',  // Lifestyle / editorial
};

/**
 * Product Card Variants
 */
export const productCardVariants = {
  /**
   * ARTISAN CARD (default for Honey Bee)
   * No border, rounded-xl pebble shape, sunlight shadow
   */
  default: {
    default: {
      ...cardBase,
      backgroundColor: C.cardBg,
      border: 'none',
      borderRadius: '1.5rem',   // rounded-xl = artisan pebble
      boxShadow: C.shadow,
    },
    hover: {
      boxShadow: C.shadowFocus,
      transform: 'translateY(-4px)',
    },
  },

  /**
   * SOFT / ORGANIC (alias of default for external consumers)
   */
  soft: {
    default: {
      ...cardBase,
      backgroundColor: C.cardBg,
      border: 'none',
      borderRadius: '1.5rem',
      boxShadow: C.shadow,
    },
    hover: {
      boxShadow: C.shadowFocus,
      transform: 'translateY(-4px)',
    },
  },

  /**
   * SHARP / MODERN â€” clean right angles (for generic storefronts)
   */
  sharp: {
    default: {
      ...cardBase,
      backgroundColor: C.cardBg,
      border: '1px solid #e5e2dd',
      borderRadius: '0.5rem',
      boxShadow: 'none',
    },
    hover: {
      boxShadow: C.shadow,
      borderColor: '#d3c5ae',
    },
  },

  /**
   * MINIMAL / ELEGANT â€” invisible until hover
   */
  minimal: {
    default: {
      ...cardBase,
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '1.5rem',
      boxShadow: 'none',
    },
    hover: {
      backgroundColor: C.cardBg,
      boxShadow: C.shadow,
    },
  },
};

/**
 * Product Image Styles â€” object-cover with organic hover zoom
 */
export const productImageStyles = {
  container: {
    position: 'relative' as const,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    transition: 'transform 500ms ease',
  },
  imageHover: {
    transform: 'scale(1.05)',
  },
};

/**
 * Product Card Content Styles
 */
export const productContentStyles = {
  container: {
    padding: spacing[5],
  },
  productName: {
    fontFamily: '"Noto Serif", Georgia, serif',
    fontSize: '1.125rem',
    color: C.onBackground,
    lineHeight: '1.3',
    marginBottom: spacing[1],
  },
  price: {
    fontFamily: '"Manrope", system-ui, sans-serif',
    fontWeight: '600',
    color: '#7b5800',
    fontSize: '1rem',
  },
  fragrance: {
    fontFamily: '"Manrope", system-ui, sans-serif',
    fontSize: '0.6875rem',
    fontWeight: '600',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    color: '#4f4634',
    marginBottom: spacing[3],
  },
};

/**
 * Add to Cart Button Styles (card-level CTA)
 */
export const addToCartStyles = {
  default: {
    background: 'linear-gradient(135deg, #7b5800 0%, #d59f2b 100%)',
    color: '#ffffff',
    fontFamily: '"Manrope", system-ui, sans-serif',
    fontSize: '0.6875rem',
    fontWeight: '600',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    borderRadius: '1.5rem',
    padding: `${spacing[2]} ${spacing[5]}`,
    border: 'none',
    cursor: 'pointer',
    transition: 'opacity 200ms ease',
  },
  hover: { opacity: 0.9 },
};

/**
 * Category Card Variants (editorial grid tile)
 */
export const categoryCardVariants = {
  default: {
    ...cardBase,
    position: 'relative' as const,
    borderRadius: '1.5rem',
    overflow: 'hidden',
    backgroundColor: '#e5e2dd',
    minHeight: '280px',
  },
};

/**
 * Featured / Hero Card Variants
 */
export const featuredCardVariants = {
  default: {
    ...cardBase,
    backgroundColor: C.cardBg,
    border: 'none',
    borderRadius: '1.5rem',
    boxShadow: C.shadow,
  },
};


