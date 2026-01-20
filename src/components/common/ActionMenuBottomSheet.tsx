import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BaseBottomSheet from './BaseBottomSheet';
import { BOTTOM_SHEET_COLORS } from '@/constants/bottomSheet';

/**
 * Represents a single action item
 */
export interface ActionItem {
  /** MaterialCommunityIcons name */
  icon: string;

  /** Label text for the action */
  label: string;

  /** Callback when the action is pressed */
  onPress: () => void;

  /** Optional custom icon color */
  iconColor?: string;

  /** Optional custom label color */
  labelColor?: string;

  /** Whether this is a destructive action (shows in red) */
  destructive?: boolean;
}

/**
 * Props for ActionMenuBottomSheet component
 */
export interface ActionMenuBottomSheetProps {
  /** Controls visibility of the bottom sheet */
  visible: boolean;

  /** Callback when bottom sheet should close */
  onClose: () => void;

  /** Title displayed in the header */
  title: string;

  /** Array of action items */
  actions: ActionItem[];

  /** Whether to close the bottom sheet after action (default: true) */
  closeOnAction?: boolean;
}

/**
 * Action Menu Bottom Sheet Component
 *
 * A reusable bottom sheet for displaying a menu of actionable items with icons.
 * Useful for profile picture options, settings menus, etc.
 *
 * Replaces:
 * - ProfilePictureBottomSheet
 * - InstagramUpdateBottomSheet
 * - SuccessBottomSheet (can be adapted)
 * - ConfirmationBottomSheet (can be adapted)
 *
 * @example
 * ```tsx
 * <ActionMenuBottomSheet
 *   visible={showMenu}
 *   onClose={() => setShowMenu(false)}
 *   title="Profile Picture"
 *   actions={[
 *     {
 *       icon: 'camera',
 *       label: 'Take Photo',
 *       onPress: handleTakePhoto,
 *     },
 *     {
 *       icon: 'image',
 *       label: 'Choose from Gallery',
 *       onPress: handleChooseFromGallery,
 *     },
 *     {
 *       icon: 'delete',
 *       label: 'Remove Photo',
 *       onPress: handleRemovePhoto,
 *       destructive: true,
 *     },
 *   ]}
 * />
 * ```
 */
export default function ActionMenuBottomSheet({
  visible,
  onClose,
  title,
  actions,
  closeOnAction = true,
}: ActionMenuBottomSheetProps) {
  const handleActionPress = (action: ActionItem) => {
    action.onPress();
    if (closeOnAction) {
      onClose();
    }
  };

  return (
    <BaseBottomSheet visible={visible} onClose={onClose} title={title}>
      <ScrollView className="px-5 py-2" showsVerticalScrollIndicator={false}>
        {actions.map((action, index) => {
          const iconColor = action.destructive
            ? BOTTOM_SHEET_COLORS.destructive
            : action.iconColor || BOTTOM_SHEET_COLORS.text;

          const labelColor = action.destructive
            ? BOTTOM_SHEET_COLORS.destructive
            : action.labelColor || BOTTOM_SHEET_COLORS.text;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleActionPress(action)}
              activeOpacity={0.7}
              className="flex-row items-center py-4 border-b"
              style={{ borderBottomColor: BOTTOM_SHEET_COLORS.border }}
            >
              <View className="w-10 h-10 rounded-full items-center justify-center mr-4" style={{ backgroundColor: '#F5F5F5' }}>
                <MaterialCommunityIcons
                  name={action.icon as any}
                  size={24}
                  color={iconColor}
                />
              </View>
              <Text
                className="text-base font-medium flex-1"
                style={{ color: labelColor }}
              >
                {action.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </BaseBottomSheet>
  );
}
