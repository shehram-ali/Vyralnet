/**
 * App color constants
 * Centralized color definitions for consistency across the app
 */

export const COLORS = {
  // Primary brand colors
  primary: '#6200EE',
  primaryContainer: '#BB86FC',

  // Secondary colors
  secondary: '#03DAC6',
  secondaryContainer: '#018786',

  // Accent colors
  tertiary: '#FF6F00',

  // Status colors
  error: '#B00020',
  errorContainer: '#F9DEDC',
  success: '#4CAF50',
  warning: '#FF9800',
  info: '#2196F3',

  // Neutral colors
  background: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceVariant: '#F5F5F5',

  // Text colors
  onPrimary: '#FFFFFF',
  onSecondary: '#000000',
  onBackground: '#000000',
  onSurface: '#000000',
  textPrimary: '#000000',
  textSecondary: '#666666',
  textDisabled: '#999999',

  // Border colors
  border: '#E0E0E0',
  outline: '#CCCCCC',

  // Transparent
  transparent: 'transparent',
} as const;

export type ColorKey = keyof typeof COLORS;
