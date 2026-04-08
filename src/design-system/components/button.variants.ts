/**
 * Honey Bee — Button Component Variants
 * Stitch "Luminous Alchemist" button system
 *
 * Primary  → honey-glow gradient (amber 135°), rounded-xl, white label-caps
 * Ghost    → no bg, no border, primary text + underline that fades on hover
 * Outline  → rounded-full pill, outline-variant border
 * Link     → text only, primary underline
 */

import { typography } from '../tokens/typography';
import { spacing, semanticTransitions } from '../tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

/* ── Stitch MD3 color constants ── */
const C = {
  primary:         '#7b5800',
  primaryEnd:      '#d59f2b',
  primaryHover:    '#513900',
  onPrimary:       '#ffffff',
  secondary:       '#5c614d',
  secondaryHover:  '#444937',
  outlineVariant:  '#d3c5ae',
  onBackground:    '#1c1c19',
  surfaceContainer:'#f0ede8',
} as const;

/**
 * Button Base
 */
const buttonBase = {
  fontFamily:    typography.fontFamily.body,
  fontWeight:    '600',
  fontSize:      '0.75rem',
  lineHeight:    '1',
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  textAlign:     'center' as const,
  cursor:        'pointer',
  border:        'none',
  outline:       'none',
  textDecoration:'none',
  display:       'inline-flex',
  alignItems:    'center',
  justifyContent:'center',
  gap:           spacing[2],
  transition:    semanticTransitions.button,
  '&:disabled': { opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' },
  '&:focus-visible': { outline: `2px solid ${C.primary}`, outlineOffset: '2px' },
};

/**
 * Button Size Variants — generous Stitch padding scale
 */
export const buttonSizes = {
  sm: {
    padding:   `${spacing[2]} ${spacing[5]}`,
    minHeight: '36px',
    borderRadius: '1.5rem', // rounded-xl
  },
  md: {
    padding:   `${spacing[3]} ${spacing[8]}`,
    minHeight: '44px',
    borderRadius: '1.5rem',
  },
  lg: {
    padding:   `${spacing[4]} ${spacing[10]}`,
    minHeight: '52px',
    borderRadius: '1.5rem',
  },
};

/**
 * Button Style Variants
 */
export const buttonVariants = {
  /** PRIMARY — honey-glow gradient, rounded-xl */
  primary: {
    default: {
      ...buttonBase,
      background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryEnd} 100%)`,
      color: C.onPrimary,
      borderRadius: '1.5rem',
      boxShadow: 'none',
    },
    hover:  { opacity: 0.9 },
    active: { opacity: 0.8 },
  },

  /** SECONDARY — botanical green, same shape as primary */
  secondary: {
    default: {
      ...buttonBase,
      backgroundColor: C.secondary,
      color: C.onPrimary,
      borderRadius: '1.5rem',
    },
    hover:  { backgroundColor: C.secondaryHover },
    active: { backgroundColor: '#363b2b' },
  },

  /** OUTLINE — rounded-full pill, subtle outline-variant border */
  outline: {
    default: {
      ...buttonBase,
      backgroundColor: 'transparent',
      color: C.onBackground,
      border: `1px solid ${C.outlineVariant}`,
      borderRadius: '9999px',
      boxShadow: 'none',
    },
    hover:  { borderColor: C.primary, color: C.primary },
    active: { backgroundColor: C.surfaceContainer },
  },

  /** GHOST — no bg/border, primary text + underline that fades on hover */
  ghost: {
    default: {
      ...buttonBase,
      backgroundColor: 'transparent',
      color: C.primary,
      textDecoration: 'underline',
      boxShadow: 'none',
      borderRadius: '0',
    },
    hover:  { textDecoration: 'none' },
    active: { opacity: 0.7 },
  },

  /** LINK — text-only, same as ghost without explicit underline */
  link: {
    default: {
      ...buttonBase,
      backgroundColor: 'transparent',
      color: C.primary,
      boxShadow: 'none',
      padding: '0',
      borderRadius: '0',
    },
    hover:  { textDecoration: 'underline' },
    active: { color: C.primaryHover },
  },
};

/**
 * Preset named variants (convenience aliases)
 */
export const softButtonVariant    = buttonVariants.primary;
export const sharpButtonVariant   = buttonVariants.outline;
export const elegantButtonVariant = buttonVariants.ghost;

/**
 * Button Icon Sizes
 */
export const buttonIcons = {
  sm: { width: '14px', height: '14px' },
  md: { width: '16px', height: '16px' },
  lg: { width: '18px', height: '18px' },
};


export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Button Base Styles
 */
const buttonBase = {
  fontFamily: typography.fontFamily.body,
  fontWeight: typography.fontWeight.semibold,
  lineHeight: '1',
  textAlign: 'center' as const,
  cursor: 'pointer',
  border: 'none',
  outline: 'none',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing[2],
  transition: semanticTransitions.button,
  
  // Interactive states
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
  
  '&:focus-visible': {
    outline: `2px solid ${colors.primary[500]}`,
    outlineOffset: '2px',
  },
};

/**
 * Button Size Variants
 */
export const buttonSizes = {
  sm: {
    fontSize: typography.fontSize.sm,
    padding: `${spacing[2]} ${spacing[4]}`,
    borderRadius: borderRadius.md,
    minHeight: '36px',
  },
  md: {
    fontSize: typography.fontSize.base,
    padding: `${spacing[3]} ${spacing[6]}`,
    borderRadius: borderRadius.lg,
    minHeight: '44px',  // Minimum touch target
  },
  lg: {
    fontSize: typography.fontSize.lg,
    padding: `${spacing[4]} ${spacing[8]}`,
    borderRadius: borderRadius.xl,
    minHeight: '52px',
  },
};

/**
 * Button Style Variants
 * 
 * Customize these to match your brand personality:
 * - Soft/rounded: Use borderRadius.full for pill-shaped buttons
 * - Sharp/modern: Use borderRadius.sm or borderRadius.DEFAULT
 * - Elevated: Add shadows.md to default state
 * - Flat: Remove shadows entirely
 */
export const buttonVariants = {
  /**
   * PRIMARY BUTTON
   * Main call-to-action button
   */
  primary: {
    default: {
      ...buttonBase,
      backgroundColor: colors.primary[500],
      color: colors.text.inverse,
      boxShadow: shadows.sm,
    },
    hover: {
      backgroundColor: colors.primary[600],
      boxShadow: shadows.md,
      transform: 'translateY(-1px)',
    },
    active: {
      backgroundColor: colors.primary[700],
      boxShadow: shadows.sm,
      transform: 'translateY(0)',
    },
  },
  
  /**
   * SECONDARY BUTTON
   * Secondary actions
   */
  secondary: {
    default: {
      ...buttonBase,
      backgroundColor: colors.secondary[500],
      color: colors.text.inverse,
      boxShadow: shadows.sm,
    },
    hover: {
      backgroundColor: colors.secondary[600],
      boxShadow: shadows.md,
      transform: 'translateY(-1px)',
    },
    active: {
      backgroundColor: colors.secondary[700],
      boxShadow: shadows.sm,
      transform: 'translateY(0)',
    },
  },
  
  /**
   * OUTLINE BUTTON
   * Less prominent actions
   */
  outline: {
    default: {
      ...buttonBase,
      backgroundColor: 'transparent',
      color: colors.primary[600],
      border: `2px solid ${colors.primary[500]}`,
      boxShadow: 'none',
    },
    hover: {
      backgroundColor: colors.primary[50],
      borderColor: colors.primary[600],
    },
    active: {
      backgroundColor: colors.primary[100],
    },
  },
  
  /**
   * GHOST BUTTON
   * Subtle, minimalist actions
   */
  ghost: {
    default: {
      ...buttonBase,
      backgroundColor: 'transparent',
      color: colors.text.primary,
      boxShadow: 'none',
    },
    hover: {
      backgroundColor: colors.gray[100],
    },
    active: {
      backgroundColor: colors.gray[200],
    },
  },
  
  /**
   * LINK BUTTON
   * Text-only, link-style button
   */
  link: {
    default: {
      ...buttonBase,
      backgroundColor: 'transparent',
      color: colors.text.link,
      boxShadow: 'none',
      padding: '0',
    },
    hover: {
      color: colors.text.linkHover,
      textDecoration: 'underline',
    },
    active: {
      color: colors.primary[700],
    },
  },
};

/**
 * Button Icon Styles
 */
export const buttonIcons = {
  sm: {
    width: '16px',
    height: '16px',
  },
  md: {
    width: '20px',
    height: '20px',
  },
  lg: {
    width: '24px',
    height: '24px',
  },
};

/**
 * Brand-Specific Button Customizations
 * 
 * Examples of how to customize buttons per brand personality:
 */

/**
 * SOFT & ORGANIC BRAND (e.g., Honey Bee)
 * Rounded corners, gentle shadows, warm feel
 */
export const softButtonVariant = {
  primary: {
    ...buttonVariants.primary.default,
    borderRadius: borderRadius.full,  // Pill-shaped
    boxShadow: shadows.md,
  },
};

/**
 * SHARP & MODERN BRAND (e.g., Tech Store)
 * Sharp corners, bold shadows, clean
 */
export const sharpButtonVariant = {
  primary: {
    ...buttonVariants.primary.default,
    borderRadius: borderRadius.sm,  // Minimal rounding
    boxShadow: shadows.lg,
  },
};

/**
 * ELEGANT & LUXURY BRAND (e.g., Fashion Store)
 * Subtle, minimal, refined
 */
export const elegantButtonVariant = {
  primary: {
    ...buttonVariants.primary.default,
    borderRadius: borderRadius.DEFAULT,
    boxShadow: 'none',
    border: `1px solid ${colors.gray[900]}`,
    backgroundColor: colors.gray[900],
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },
};

/**
 * Usage Example:
 * 
 * import { buttonVariants, buttonSizes } from '@/design-system/components/button.variants';
 * 
 * <button style={{
 *   ...buttonVariants.primary.default,
 *   ...buttonSizes.md,
 * }}>
 *   Add to Cart
 * </button>
 * 
 * // Or with hover (in styled-components)
 * const Button = styled.button<{ variant: ButtonVariant; size: ButtonSize }>`
 *   ${(props) => buttonVariants[props.variant].default}
 *   ${(props) => buttonSizes[props.size]}
 *   
 *   &:hover {
 *     ${(props) => buttonVariants[props.variant].hover}
 *   }
 *   
 *   &:active {
 *     ${(props) => buttonVariants[props.variant].active}
 *   }
 * `;
 */
