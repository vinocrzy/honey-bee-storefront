/**
 * Honey Bee â€” Button Component Variants
 * Stitch "Luminous Alchemist" button system
 *
 * Primary  â†’ honey-glow gradient (amber 135Â°), rounded-xl, white label-caps
 * Ghost    â†’ no bg, no border, primary text + underline that fades on hover
 * Outline  â†’ rounded-full pill, outline-variant border
 * Link     â†’ text only, primary underline
 */

import { typography } from '../tokens/typography';
import { spacing, semanticTransitions } from '../tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

/* â”€â”€ Stitch MD3 color constants â”€â”€ */
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
 * Button Size Variants â€” generous Stitch padding scale
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
  /** PRIMARY â€” honey-glow gradient, rounded-xl */
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

  /** SECONDARY â€” botanical green, same shape as primary */
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

  /** OUTLINE â€” rounded-full pill, subtle outline-variant border */
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

  /** GHOST â€” no bg/border, primary text + underline that fades on hover */
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

  /** LINK â€” text-only, same as ghost without explicit underline */
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


