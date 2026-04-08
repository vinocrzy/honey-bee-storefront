/**
 * Honey Bee Store — Theme Configuration
 * Stitch "Luminous Alchemist" — Material Design 3 colour palette
 * Exact values from the Stitch HTML prototypes in src/design-system/design-reference/stitch/
 */

import type { ThemeConfig } from '@/types/theme';

export const defaultTheme: ThemeConfig = {
  colors: {
    // Primary — Deep Honey Amber (Stitch MD3 exact)
    primary: '#7b5800',
    primaryHover: '#513900',
    secondary: '#5c614d',       // Botanical green icon tint
    secondaryHover: '#444937',
    accent: '#f7bd48',          // inverse-primary — amber on dark

    // Base surfaces — Warm parchment canvas
    background: '#fcf9f4',      // Page canvas
    foreground: '#1c1c19',      // on-background (NEVER #000000)
    muted: '#f0ede8',           // surface-container
    mutedForeground: '#4f4634', // on-surface-variant (labels, captions)

    // UI structure
    border: '#d3c5ae',          // outline-variant
    input: '#f6f3ee',           // surface-container-low
    ring: '#7b5800',            // primary

    // Status
    success: '#10b981',
    warning: '#f7bd48',
    error: '#ba1a1a',
    info: '#5c614d',
  },

  typography: {
    fontFamily: {
      sans: '"Manrope", system-ui, -apple-system, sans-serif',
      serif: '"Noto Serif", Georgia, Cambria, serif',
      mono: 'Menlo, Monaco, Consolas, "Courier New", monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },

  logo: {
    url: '/images/honey-bee-logo.png',
    altText: 'Honey Bee — Artisan Soaps & Oils',
    width: 180,
    height: 60,
  },

  borderRadius: {
    sm: '0.25rem',   // 4px  — subtle rounding
    md: '0.5rem',    // 8px  — standard
    lg: '0.5rem',    // 8px  — (kept at lg for compatibility)
    xl: '1.5rem',    // 24px — artisan cards / primary buttons
    full: '9999px',  // pill — badges, chips
  },

  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
  },
};

/**
 * Convert theme config to CSS variables
 * NOTE: The @theme block in globals.css is the source of truth for Tailwind utility classes.
 * This function syncs runtime JS overrides (e.g. ThemeProvider) with the same variable names.
 */
export const themeToCSSVariables = (theme: ThemeConfig): Record<string, string> => {
  return {
    '--color-primary': theme.colors.primary,
    '--color-primary-hover': theme.colors.primaryHover,
    '--color-secondary': theme.colors.secondary,
    '--color-secondary-hover': theme.colors.secondaryHover,
    '--color-accent': theme.colors.accent,
    '--color-background': theme.colors.background,
    '--color-foreground': theme.colors.foreground,
    '--color-muted': theme.colors.muted,
    '--color-muted-foreground': theme.colors.mutedForeground,
    '--color-border': theme.colors.border,
    '--color-input': theme.colors.input,
    '--color-ring': theme.colors.ring,
    '--color-success': theme.colors.success,
    '--color-warning': theme.colors.warning,
    '--color-error': theme.colors.error,
    '--color-info': theme.colors.info,
    '--font-family-sans': theme.typography.fontFamily.sans,
    '--font-family-serif': theme.typography.fontFamily.serif,
    '--font-family-mono': theme.typography.fontFamily.mono,
    '--radius-sm': theme.borderRadius.sm,
    '--radius-md': theme.borderRadius.md,
    '--radius-lg': theme.borderRadius.lg,
    '--radius-xl': theme.borderRadius.xl,
    '--radius-full': theme.borderRadius.full,
    '--spacing-xs': theme.spacing.xs,
    '--spacing-sm': theme.spacing.sm,
    '--spacing-md': theme.spacing.md,
    '--spacing-lg': theme.spacing.lg,
    '--spacing-xl': theme.spacing.xl,
  };
};


/**
 * Convert theme config to CSS variables
 */
export const themeToCSSVariables = (theme: ThemeConfig): Record<string, string> => {
  return {
    // Colors
    '--color-primary': theme.colors.primary,
    '--color-primary-hover': theme.colors.primaryHover,
    '--color-secondary': theme.colors.secondary,
    '--color-secondary-hover': theme.colors.secondaryHover,
    '--color-accent': theme.colors.accent,
    '--color-background': theme.colors.background,
    '--color-foreground': theme.colors.foreground,
    '--color-muted': theme.colors.muted,
    '--color-muted-foreground': theme.colors.mutedForeground,
    '--color-border': theme.colors.border,
    '--color-input': theme.colors.input,
    '--color-ring': theme.colors.ring,
    '--color-success': theme.colors.success,
    '--color-warning': theme.colors.warning,
    '--color-error': theme.colors.error,
    '--color-info': theme.colors.info,

    // Typography
    '--font-family-sans': theme.typography.fontFamily.sans,
    '--font-family-serif': theme.typography.fontFamily.serif,
    '--font-family-mono': theme.typography.fontFamily.mono,
    
    // Border Radius
    '--radius-sm': theme.borderRadius.sm,
    '--radius-md': theme.borderRadius.md,
    '--radius-lg': theme.borderRadius.lg,
    '--radius-xl': theme.borderRadius.xl,
    '--radius-full': theme.borderRadius.full,

    // Spacing
    '--spacing-xs': theme.spacing.xs,
    '--spacing-sm': theme.spacing.sm,
    '--spacing-md': theme.spacing.md,
    '--spacing-lg': theme.spacing.lg,
    '--spacing-xl': theme.spacing.xl,
  };
};
