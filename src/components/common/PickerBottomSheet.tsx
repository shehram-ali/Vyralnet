import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BaseBottomSheet from './BaseBottomSheet';
import { BOTTOM_SHEET_COLORS } from '@/constants/bottomSheet';

/**
 * Props for PickerBottomSheet component
 */
export interface PickerBottomSheetProps<T = string> {
  /** Controls visibility of the bottom sheet */
  visible: boolean;

  /** Callback when bottom sheet should close */
  onClose: () => void;

  /** Title displayed in the header */
  title: string;

  /** Array of items to choose from */
  items: T[];

  /** Currently selected item */
  selectedItem: T | null;

  /** Callback when an item is selected */
  onSelect: (item: T) => void;

  /** Optional custom renderer for each item */
  renderItem?: (item: T, isSelected: boolean) => ReactNode;

  /** Optional function to extract display label from item (default: String(item)) */
  getItemLabel?: (item: T) => string;

  /** Optional function to extract unique key from item (default: String(item)) */
  keyExtractor?: (item: T) => string;

  /** Whether to close the bottom sheet after selection (default: true) */
  closeOnSelect?: boolean;
}

/**
 * Picker Bottom Sheet Component
 *
 * A reusable bottom sheet for single-item selection from a list.
 * Displays items with checkmarks for the selected item.
 *
 * Replaces:
 * - ChallengeCategoryPickerBottomSheet
 * - ParticipantsPickerBottomSheet
 * - FollowersRangePickerBottomSheet
 * - LocationPickerBottomSheet
 * - StatusPickerBottomSheet
 * - ContractStatusPickerBottomSheet
 * - ChallengeTypePickerBottomSheet
 * - ChallengePickerBottomSheet
 *
 * @example
 * ```tsx
 * <PickerBottomSheet
 *   visible={showPicker}
 *   onClose={() => setShowPicker(false)}
 *   title="Select Category"
 *   items={['Tech', 'Food', 'Travel']}
 *   selectedItem={category}
 *   onSelect={setCategory}
 * />
 * ```
 *
 * @example With custom objects
 * ```tsx
 * <PickerBottomSheet
 *   visible={showPicker}
 *   onClose={() => setShowPicker(false)}
 *   title="Select User"
 *   items={users}
 *   selectedItem={selectedUser}
 *   onSelect={setSelectedUser}
 *   getItemLabel={(user) => user.name}
 *   keyExtractor={(user) => user.id}
 * />
 * ```
 */
export default function PickerBottomSheet<T = string>({
  visible,
  onClose,
  title,
  items,
  selectedItem,
  onSelect,
  renderItem,
  getItemLabel = (item) => String(item),
  keyExtractor = (item) => String(item),
  closeOnSelect = true,
}: PickerBottomSheetProps<T>) {
  const handleSelect = (item: T) => {
    onSelect(item);
    if (closeOnSelect) {
      onClose();
    }
  };

  return (
    <BaseBottomSheet visible={visible} onClose={onClose} title={title}>
      <ScrollView className="px-5 py-2" showsVerticalScrollIndicator={false}>
        {items.map((item) => {
          const isSelected = selectedItem === item;
          const key = keyExtractor(item);

          // Use custom renderer if provided
          if (renderItem) {
            return (
              <TouchableOpacity
                key={key}
                onPress={() => handleSelect(item)}
                activeOpacity={0.7}
              >
                {renderItem(item, isSelected)}
              </TouchableOpacity>
            );
          }

          // Default renderer
          return (
            <TouchableOpacity
              key={key}
              onPress={() => handleSelect(item)}
              activeOpacity={0.7}
              className="flex-row items-center justify-between py-4 border-b"
              style={{ borderBottomColor: BOTTOM_SHEET_COLORS.border }}
            >
              <Text
                className={`text-base ${
                  isSelected ? 'font-semibold' : 'font-normal'
                }`}
                style={{
                  color: isSelected
                    ? BOTTOM_SHEET_COLORS.primary
                    : BOTTOM_SHEET_COLORS.text,
                }}
              >
                {getItemLabel(item)}
              </Text>
              {isSelected && (
                <MaterialCommunityIcons
                  name="check"
                  size={24}
                  color={BOTTOM_SHEET_COLORS.primary}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </BaseBottomSheet>
  );
}
