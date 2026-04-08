/**
 * Honey Bee — Card Component Variants
 * Stitch "Luminous Alchemist" artisan card system
 *
 * Default (artisan): no border, rounded-xl, sunlight-shadow — the pebble-like feel
 * Flat: no shadow, used inside surface-container sections
 * Featured: used in editorial grid tiles (full-bleed image + text overlay)
 */

import { spacing, semanticTransitions } from '../tokens';

export type CardElevation = 'flat' | 'low' | 'artisan' | 'featured';
export type CardImageRatio = 'square' | 'portrait' | 'landscape';

/* ── Stitch MD3 constants ── */
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
  square:    '1 / 1',   // Honey Bee soaps — default
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
   * SHARP / MODERN — clean right angles (for generic storefronts)
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
   * MINIMAL / ELEGANT — invisible until hover
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
 * Product Image Styles — object-cover with organic hover zoom
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


export type CardElevation = 'flat' | 'low' | 'medium' | 'high';
export type CardImageRatio = 'square' | 'portrait' | 'landscape';

/**
 * Card Base Styles
 */
const cardBase = {
  backgroundColor: colors.background.primary,
  border: `1px solid ${colors.border.default}`,
  overflow: 'hidden' as const,
  transition: semanticTransitions.base,
};

/**
 * Card Elevation Variants
 */
export const cardElevations = {
  flat: {
    boxShadow: 'none',
  },
  low: {
    boxShadow: shadows.sm,
  },
  medium: {
    boxShadow: shadows.md,
  },
  high: {
    boxShadow: shadows.lg,
  },
};

/**
 * Product Card Image Aspect Ratios
 */
export const cardImageRatios = {
  square: '1 / 1',      // 1:1 - Good for most products
  portrait: '3 / 4',    // 3:4 - Good for fashion, apparel
  landscape: '4 / 3',   // 4:3 - Good for electronics, gadgets
};

/**
 * Product Card Variants
 * 
 * Customize these to match your brand personality:
 * - Organic/soft: Rounded corners, lift on hover
 * - Modern/sharp: Sharp corners, shadow on hover
 * - Minimal/elegant: No borders, subtle hover
 */
export const productCardVariants = {
  /**
   * DEFAULT PRODUCT CARD
   * Standard e-commerce product card
   */
  default: {
    default: {
      ...cardBase,
      borderRadius: borderRadius.lg,
      boxShadow: shadows.sm,
    },
    hover: {
      boxShadow: shadows.lg,
      transform: 'translateY(-4px)',
      borderColor: colors.border.hover,
    },
  },
  
  /**
   * SOFT & ORGANIC VARIANT
   * Rounded corners, gentle lift (e.g., Honey Bee)
   */
  soft: {
    default: {
      ...cardBase,
      borderRadius: borderRadius.xl,  // More rounded
      boxShadow: shadows.md,
      border: 'none',
    },
    hover: {
      boxShadow: shadows.lg,
      transform: 'translateY(-6px)',
    },
  },
  
  /**
   * SHARP & MODERN VARIANT
   * Clean lines, bold shadows (e.g., Tech Store)
   */
  sharp: {
    default: {
      ...cardBase,
      borderRadius: borderRadius.sm,  // Minimal rounding
      boxShadow: shadows.sm,
      border: `1px solid ${colors.gray[200]}`,
    },
    hover: {
      boxShadow: shadows.xl,
      borderColor: colors.primary[300],
    },
  },
  
  /**
   * MINIMAL & ELEGANT VARIANT
   * Subtle, refined (e.g., Luxury Fashion)
   */
  minimal: {
    default: {
      ...cardBase,
      borderRadius: borderRadius.DEFAULT,
      boxShadow: 'none',
      border: `1px solid ${colors.gray[100]}`,
    },
    hover: {
      boxShadow: 'none',
      borderColor: colors.gray[900],
    },
  },
  
  /**
   * OUTLINED VARIANT
   * Border emphasis, no shadow
   */
  outlined: {
    default: {
      ...cardBase,
      borderRadius: borderRadius.lg,
      boxShadow: 'none',
      border: `2px solid ${colors.border.default}`,
    },
    hover: {
      borderColor: colors.primary[500],
    },
  },
};

/**
 * Product Card Image Container Styles
 */
export const productImageStyles = {
  container: {
    position: 'relative' as const,
    overflow: 'hidden' as const,
    backgroundColor: colors.gray[50],
  },
  
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    transition: semanticTransitions.medium,
  },
  
  imageHover: {
    transform: 'scale(1.05)',  // Subtle zoom on hover
  },
  
  // Badge positioning (sale, new, etc.)
  badge: {
    position: 'absolute' as const,
    top: spacing[3],
    right: spacing[3],
    padding: `${spacing[1]} ${spacing[3]}`,
    borderRadius: borderRadius.full,
    fontSize: '0.75rem',
    fontWeight: 600,
    backgroundColor: colors.primary[500],
    color: colors.text.inverse,
  },
};

/**
 * Product Card Content Styles
 */
export const productContentStyles = {
  container: {
    padding: spacing[4],
  },
  
  productName: {
    fontSize: '1rem',
    fontWeight: 600,
    color: colors.text.primary,
    marginBottom: spacing[2],
    lineHeight: '1.4',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical' as const,
    overflow: 'hidden',
  },
  
  price: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: colors.primary[600],
    marginTop: spacing[2],
  },
  
  originalPrice: {
    fontSize: '1rem',
    fontWeight: 400,
    color: colors.text.tertiary,
    textDecoration: 'line-through',
    marginRight: spacing[2],
  },
  
  rating: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[1],
    marginTop: spacing[2],
    fontSize: '0.875rem',
    color: colors.text.secondary,
  },
};

/**
 * Add to Cart Button Styles (Card-specific)
 */
export const addToCartStyles = {
  // Quick add button (appears on hover)
  quickAdd: {
    position: 'absolute' as const,
    bottom: spacing[4],
    left: spacing[4],
    right: spacing[4],
    opacity: 0,
    transform: 'translateY(10px)',
    transition: semanticTransitions.base,
  },
  
  quickAddHover: {
    opacity: 1,
    transform: 'translateY(0)',
  },
  
  // Standard add button at bottom
  standard: {
    width: '100%',
    marginTop: spacing[3],
  },
};

/**
 * Category Card Variants
 */
export const categoryCardVariants = {
  default: {
    ...cardBase,
    borderRadius: borderRadius.xl,
    minHeight: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
    overflow: 'hidden' as const,
  },
  
  overlay: {
    position: 'absolute' as const,
    inset: 0,
    background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 100%)',
    display: 'flex',
    alignItems: 'flex-end',
    padding: spacing[6],
  },
  
  title: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: colors.text.inverse,
  },
};

/**
 * Featured Product Card (Hero)
 */
export const featuredCardVariants = {
  container: {
    ...cardBase,
    borderRadius: borderRadius['2xl'],
    boxShadow: shadows.xl,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    minHeight: '400px',
  },
  
  imageContainer: {
    position: 'relative' as const,
    overflow: 'hidden' as const,
  },
  
  contentContainer: {
    padding: spacing[8],
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
  },
};

/**
 * Usage Example:
 * 
 * import { productCardVariants, productImageStyles, productContentStyles } from '@/design-system/components/card.variants';
 * 
 * // Product Card Component
 * <div style={productCardVariants.default.default}>
 *   <div style={{
 *     ...productImageStyles.container,
 *     aspectRatio: cardImageRatios.square,
 *   }}>
 *     <img 
 *       src={product.image} 
 *       alt={product.name}
 *       style={productImageStyles.image}
 *     />
 *   </div>
 *   
 *   <div style={productContentStyles.container}>
 *     <h3 style={productContentStyles.productName}>
 *       {product.name}
 *     </h3>
 *     <div>
 *       {product.onSale && (
 *         <span style={productContentStyles.originalPrice}>
 *           ${product.originalPrice}
 *         </span>
 *       )}
 *       <span style={productContentStyles.price}>
 *         ${product.price}
 *       </span>
 *     </div>
 *   </div>
 * </div>
 */
