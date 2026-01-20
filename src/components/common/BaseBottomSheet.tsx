import React, { ReactNode } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useBottomSheetAnimation } from '@/hooks/useBottomSheetAnimation';
import {
  BOTTOM_SHEET_COLORS,
  BOTTOM_SHEET_DIMENSIONS,
  BOTTOM_SHEET_ANIMATION,
} from '@/constants/bottomSheet';

/**
 * Props for BaseBottomSheet component
 */
export interface BaseBottomSheetProps {
  /** Controls visibility of the bottom sheet */
  visible: boolean;

  /** Callback when bottom sheet should close */
  onClose: () => void;

  /** Title displayed in the header */
  title: string;

  /** Content to render inside the bottom sheet */
  children: ReactNode;

  /** Optional element to render on the left side of header (e.g., back button) */
  headerLeft?: ReactNode;

  /** Optional element to render on the right side of header (replaces close button) */
  headerRight?: ReactNode;

  /** Whether to show the drag handle (default: true) */
  showDragHandle?: boolean;

  /** Maximum height of the bottom sheet (default: '70%') */
  maxHeight?: number | string;

  /** Background color of the bottom sheet (default: white) */
  backgroundColor?: string;

  /** Custom animation configuration */
  animationConfig?: {
    tension?: number;
    friction?: number;
    duration?: number;
  };
}

/**
 * Base Bottom Sheet Component
 *
 * Provides the foundation for all bottom sheet variants in the app.
 * Handles animation, modal wrapper, backdrop, drag handle, and header.
 *
 * This component should be used as a building block for specialized
 * bottom sheets like PickerBottomSheet, FilterBottomSheet, etc.
 *
 * @example
 * ```tsx
 * <BaseBottomSheet
 *   visible={isVisible}
 *   onClose={() => setIsVisible(false)}
 *   title="My Bottom Sheet"
 * >
 *   <View>
 *     <Text>Custom content here</Text>
 *   </View>
 * </BaseBottomSheet>
 * ```
 */
export default function BaseBottomSheet({
  visible,
  onClose,
  title,
  children,
  headerLeft,
  headerRight,
  showDragHandle = true,
  maxHeight = BOTTOM_SHEET_DIMENSIONS.maxHeight,
  backgroundColor = BOTTOM_SHEET_COLORS.background,
  animationConfig,
}: BaseBottomSheetProps) {
  // Setup animation with custom config if provided
  const slideAnim = useBottomSheetAnimation(visible, {
    ...BOTTOM_SHEET_ANIMATION.spring,
    duration: BOTTOM_SHEET_ANIMATION.timing.duration,
    initialValue: BOTTOM_SHEET_ANIMATION.initialValue,
    ...animationConfig,
  });

  return (
    <Modal visible={visible} transparent animationType="none" statusBarTranslucent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={{
            flex: 1,
            backgroundColor: BOTTOM_SHEET_COLORS.backdrop,
            justifyContent: 'flex-end',
          }}
        >
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <Animated.View
              style={{
                transform: [{ translateY: slideAnim }],
                backgroundColor,
                borderTopLeftRadius: BOTTOM_SHEET_DIMENSIONS.borderRadius,
                borderTopRightRadius: BOTTOM_SHEET_DIMENSIONS.borderRadius,
                maxHeight,
                overflow: 'hidden',
              }}
            >
              {/* Drag Handle */}
              {showDragHandle && (
                <View className="items-center py-3">
                  <View
                    style={{
                      width: BOTTOM_SHEET_DIMENSIONS.dragHandle.width,
                      height: BOTTOM_SHEET_DIMENSIONS.dragHandle.height,
                      backgroundColor: BOTTOM_SHEET_COLORS.dragHandle,
                      borderRadius: 2,
                    }}
                  />
                </View>
              )}

              {/* Header */}
              <View className="flex-row items-center justify-between px-5 py-3 border-b border-gray-100">
                {/* Left element or empty space */}
                <View className="w-8">
                  {headerLeft}
                </View>

                {/* Title */}
                <Text className="text-lg font-bold text-center flex-1" style={{ color: BOTTOM_SHEET_COLORS.text }}>
                  {title}
                </Text>

                {/* Right element or close button */}
                <View className="w-8 items-end">
                  {headerRight || (
                    <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
                      <MaterialCommunityIcons
                        name="close"
                        size={24}
                        color={BOTTOM_SHEET_COLORS.text}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {/* Content */}
              {children}
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
