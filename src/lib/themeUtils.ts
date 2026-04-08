/**
 * Theme Utilities
 * Helper functions for working with theme in components
 */

import { type ThemeColors } from '@/types/theme';

/**
 * Get CSS variable reference for a theme color
 * Usage: style={{ backgroundColor: getThemeColor('primary') }}
 */
export const getThemeColor = (colorName: keyof ThemeColors): string => {
  const colorMap: Record<keyof ThemeColors, string> = {
    primary: 'var(--color-primary)',
    primaryHover: 'var(--color-primary-hover)',
    secondary: 'var(--color-secondary)',
    secondaryHover: 'var(--color-secondary-hover)',
    accent: 'var(--color-accent)',
    background: 'var(--color-background)',
    foreground: 'var(--color-foreground)',
    muted: 'var(--color-muted)',
    mutedForeground: 'var(--color-muted-foreground)',
    border: 'var(--color-border)',
    input: 'var(--color-input)',
    ring: 'var(--color-ring)',
    success: 'var(--color-success)',
    warning: 'var(--color-warning)',
    error: 'var(--color-error)',
    info: 'var(--color-info)',
  };

  return colorMap[colorName];
};

/**
 * Get Tailwind classes for button variants based on Honey Bee design system
 * Primary → honey-glow gradient, rounded-xl
 * Ghost   → underline + primary color
 * Outline → rounded-full pill, outline-variant border
 */
export const getButtonClasses = (variant: 'primary' | 'secondary' | 'outline' | 'ghost' = 'primary'): string => {
  const baseClasses = 'inline-flex items-center justify-center font-label text-xs uppercase tracking-widest transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  const variantClasses = {
    primary: 'honey-glow text-white rounded-xl hover:opacity-90 focus:ring-[#7b5800]',
    secondary: 'bg-[#5c614d] text-white rounded-xl hover:bg-[#444937] focus:ring-[#5c614d]',
    outline: 'border border-[#d3c5ae] text-[#1c1c19] rounded-full hover:border-[#7b5800] hover:text-[#7b5800] focus:ring-[#7b5800]',
    ghost: 'text-[#7b5800] underline hover:no-underline focus:ring-[#7b5800] rounded-none',
  };

  return `${baseClasses} ${variantClasses[variant]}`;
};

/**
 * Get Tailwind classes for button sizes
 * Honey Bee artisan sizing: generous padding, Stitch scale
 */
export const getButtonSizeClasses = (size: 'sm' | 'md' | 'lg' = 'md'): string => {
  const sizeClasses = {
    sm: 'px-5 py-2.5',
    md: 'px-8 py-3',
    lg: 'px-10 py-4',
  };

  return sizeClasses[size];
};

/**
 * Get Tailwind classes for status badges
 */
export const getStatusBadgeClasses = (status: 'success' | 'warning' | 'error' | 'info' | 'default' = 'default'): string => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';

  const statusClasses = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    default: 'bg-muted text-muted-foreground',
  };

  return `${baseClasses} ${statusClasses[status]}`;
};

/**
 * Convert hex color to RGB values for Tailwind
 */
export const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0, 0, 0';
  
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  
  return `${r}, ${g}, ${b}`;
};

/**
 * Lighten a hex color by a percentage
 */
export const lightenColor = (hex: string, percent: number): string => {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  
  return '#' + (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1);
};

/**
 * Darken a hex color by a percentage
 */
export const darkenColor = (hex: string, percent: number): string => {
  return lightenColor(hex, -percent);
};
