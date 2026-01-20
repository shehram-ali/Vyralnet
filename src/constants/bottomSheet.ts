/**
 * Bottom Sheet Design System Constants
 *
 * Centralizes all styling values for bottom sheet components
 * to ensure consistency across the application.
 */

/**
 * Color palette for bottom sheet components
 */
export const BOTTOM_SHEET_COLORS = {
  /** Primary highlight color (green) - used for selected items, buttons */
  primary: '#5EBD3E',

  /** Modal backdrop overlay color */
  backdrop: 'rgba(0, 0, 0, 0.5)',

  /** Drag handle color */
  dragHandle: '#E5E5E5',

  /** Primary border color */
  border: '#F3F3F3',

  /** Alternative border color */
  borderAlt: '#E5E5E5',

  /** Primary text color */
  text: '#000000',

  /** Secondary text color (placeholders, hints) */
  textSecondary: '#6C727F',

  /** Destructive action color (delete, remove) */
  destructive: '#FF3B30',

  /** Background color for bottom sheet */
  background: '#FFFFFF',

  /** Reset button background */
  resetBackground: '#E8E8E8',
} as const;

/**
 * Dimensions and sizing for bottom sheet elements
 */
export const BOTTOM_SHEET_DIMENSIONS = {
  /** Drag handle dimensions */
  dragHandle: {
    width: 48,
    height: 4,
  },

  /** Border radius for bottom sheet container */
  borderRadius: 24,

  /** Maximum height of bottom sheet (percentage of screen) */
  maxHeight: '70%',

  /** Padding values */
  padding: {
    horizontal: 20,
    vertical: 12,
  },
} as const;

/**
 * Animation configuration for bottom sheet transitions
 */
export const BOTTOM_SHEET_ANIMATION = {
  /** Spring animation config (for slide-in) */
  spring: {
    tension: 65,
    friction: 11,
  },

  /** Timing animation config (for slide-out) */
  timing: {
    duration: 250,
  },

  /** Initial translateY value (off-screen) */
  initialValue: 600,
} as const;
