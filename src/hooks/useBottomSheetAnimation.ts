import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

/**
 * Options for configuring bottom sheet animation behavior
 */
interface UseBottomSheetAnimationOptions {
  /** Initial value for the animation (default: 600) */
  initialValue?: number;
  /** Spring animation tension (default: 65) */
  tension?: number;
  /** Spring animation friction (default: 11) */
  friction?: number;
  /** Timing animation duration in ms (default: 250) */
  duration?: number;
}

/**
 * Custom hook for bottom sheet slide-in/slide-out animation
 *
 * Provides consistent animation behavior across all bottom sheet components.
 * Uses spring animation for slide-in and timing animation for slide-out.
 *
 * @param visible - Whether the bottom sheet is visible
 * @param options - Optional animation configuration
 * @returns Animated value for translateY transform
 *
 * @example
 * ```tsx
 * const slideAnim = useBottomSheetAnimation(visible);
 *
 * return (
 *   <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
 *     {children}
 *   </Animated.View>
 * );
 * ```
 */
export function useBottomSheetAnimation(
  visible: boolean,
  options: UseBottomSheetAnimationOptions = {}
): Animated.Value {
  const {
    initialValue = 600,
    tension = 65,
    friction = 11,
    duration = 250,
  } = options;

  const slideAnim = useRef(new Animated.Value(initialValue)).current;

  useEffect(() => {
    if (visible) {
      // Slide in with spring animation for natural feel
      Animated.spring(slideAnim, {
        toValue: 0,
        tension,
        friction,
        useNativeDriver: true,
      }).start();
    } else {
      // Slide out with timing animation for quick dismissal
      Animated.timing(slideAnim, {
        toValue: initialValue,
        duration,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim, initialValue, tension, friction, duration]);

  return slideAnim;
}
