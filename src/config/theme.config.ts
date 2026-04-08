/**
 * Honey Bee Store - Theme Configuration
 * Natural, organic theme for handmade soaps and oils
 */

import type { ThemeConfig } from '@/types/theme';

export const defaultTheme: ThemeConfig = {
  colors: {
    // Primary brand colors - Honey Gold
    primary: '#F59E0B', // Amber-500 (Honey Gold)
    primaryHover: '#D97706', // Amber-600 (Deep Amber)
    secondary: '#10B981', // Emerald-500 (Natural Green)
    secondaryHover: '#059669', // Emerald-600 (Deep Green)
    accent: '#FCD34D', // Amber-300 (Light Honey)

    // Base colors - Warm, Natural
    background: '#FFFBEB', // Amber-50 (Warm Cream)
    foreground: '#78350F', // Amber-950 (Natural Brown)
    muted: '#FEF3C7', // Amber-100 (Soft Beige)
    mutedForeground: '#92400E', // Amber-800 (Muted Brown)

    // UI colors
    border: '#FDE68A', // Amber-200 (Soft Honey Border)
    input: '#FEF3C7', // Amber-100
    ring: '#F59E0B', // Honey Gold

    // Status colors
    success: '#10B981', // Green-500 (Natural Growth)
    warning: '#F59E0B', // Amber-500 (Honey Alert)
    error: '#DC2626', // Red-600 (Natural Red)
    info: '#06B6D4', // Cyan-500 (Fresh Info)
  },

  typography: {
    fontFamily: {
      sans: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      serif: '"Playfair Display", Georgia, Cambria, "Times New Roman", Times, serif',
      mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
    fontSize: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
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
    altText: 'Honey Bee - Natural Handmade Soaps & Oils',
    width: 180,
    height: 60,
  },

  borderRadius: {
    sm: '0.25rem',  // 4px
    md: '0.375rem', // 6px
    lg: '0.5rem',   // 8px
    xl: '0.75rem',  // 12px
    full: '9999px',
  },

  spacing: {
    xs: '0.5rem',  // 8px
    sm: '1rem',    // 16px
    md: '1.5rem',  // 24px
    lg: '2rem',    // 32px
    xl: '3rem',    // 48px
  },
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
