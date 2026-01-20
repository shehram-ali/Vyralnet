import React, { ReactNode, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BaseBottomSheet from './BaseBottomSheet';
import { BOTTOM_SHEET_COLORS } from '@/constants/bottomSheet';

/**
 * Props for MultiSelectBottomSheet component
 */
export interface MultiSelectBottomSheetProps<T = string> {
  /** Controls visibility of the bottom sheet */
  visible: boolean;

  /** Callback when bottom sheet should close */
  onClose: () => void;

  /** Title displayed in the header */
  title: string;

  /** Array of items to choose from */
  items: T[];

  /** Currently selected items */
  selectedItems: T[];

  /** Callback when selections are applied */
  onSelect: (items: T[]) => void;

  /** Whether to show the apply button (default: true) */
  showApplyButton?: boolean;

  /** Custom label for apply button (default: "Apply") */
  applyButtonLabel?: string;

  /** Optional custom renderer for each item */
  renderItem?: (item: T, isSelected: boolean, onToggle: () => void) => ReactNode;

  /** Optional function to extract display label from item (default: String(item)) */
  getItemLabel?: (item: T) => string;

  /** Optional function to extract unique key from item (default: String(item)) */
  keyExtractor?: (item: T) => string;
}

/**
 * Multi-Select Bottom Sheet Component
 *
 * A reusable bottom sheet for multiple-item selection from a list.
 * Displays items with checkboxes and an Apply button.
 *
 * Replaces:
 * - CategoryPickerBottomSheet (multi-select variant)
 * - MyListPickerBottomSheet
 *
 * @example
 * ```tsx
 * <MultiSelectBottomSheet
 *   visible={showPicker}
 *   onClose={() => setShowPicker(false)}
 *   title="Select Categories"
 *   items={['Tech', 'Food', 'Travel', 'Fashion']}
 *   selectedItems={selectedCategories}
 *   onSelect={setSelectedCategories}
 * />
 * ```
 *
 * @example With custom objects
 * ```tsx
 * <MultiSelectBottomSheet
 *   visible={showPicker}
 *   onClose={() => setShowPicker(false)}
 *   title="Select Lists"
 *   items={lists}
 *   selectedItems={selectedLists}
 *   onSelect={setSelectedLists}
 *   getItemLabel={(list) => list.name}
 *   keyExtractor={(list) => list.id}
 * />
 * ```
 */
export default function MultiSelectBottomSheet<T = string>({
  visible,
  onClose,
  title,
  items,
  selectedItems,
  onSelect,
  showApplyButton = true,
  applyButtonLabel = 'Apply',
  renderItem,
  getItemLabel = (item) => String(item),
  keyExtractor = (item) => String(item),
}: MultiSelectBottomSheetProps<T>) {
  // Track temporary selections (before applying)
  const [tempSelectedItems, setTempSelectedItems] = useState<T[]>(selectedItems);

  // Reset temporary selections when opening
  React.useEffect(() => {
    if (visible) {
      setTempSelectedItems(selectedItems);
    }
  }, [visible, selectedItems]);

  const handleToggle = (item: T) => {
    setTempSelectedItems((prev) => {
      const isCurrentlySelected = prev.some(
        (selected) => keyExtractor(selected) === keyExtractor(item)
      );

      if (isCurrentlySelected) {
        return prev.filter(
          (selected) => keyExtractor(selected) !== keyExtractor(item)
        );
      } else {
        return [...prev, item];
      }
    });
  };

  const handleApply = () => {
    onSelect(tempSelectedItems);
    onClose();
  };

  const isItemSelected = (item: T) => {
    return tempSelectedItems.some(
      (selected) => keyExtractor(selected) === keyExtractor(item)
    );
  };

  return (
    <BaseBottomSheet visible={visible} onClose={onClose} title={title}>
      <ScrollView className="px-5 py-2" showsVerticalScrollIndicator={false}>
        {items.map((item) => {
          const isSelected = isItemSelected(item);
          const key = keyExtractor(item);

          // Use custom renderer if provided
          if (renderItem) {
            return (
              <View key={key}>
                {renderItem(item, isSelected, () => handleToggle(item))}
              </View>
            );
          }

          // Default renderer
          return (
            <TouchableOpacity
              key={key}
              onPress={() => handleToggle(item)}
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
              <View
                className="w-6 h-6 rounded border-2 items-center justify-center"
                style={{
                  borderColor: isSelected
                    ? BOTTOM_SHEET_COLORS.primary
                    : BOTTOM_SHEET_COLORS.borderAlt,
                  backgroundColor: isSelected
                    ? BOTTOM_SHEET_COLORS.primary
                    : 'transparent',
                }}
              >
                {isSelected && (
                  <MaterialCommunityIcons
                    name="check"
                    size={16}
                    color="white"
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Apply Button */}
      {showApplyButton && (
        <View className="px-5 py-4">
          <TouchableOpacity
            onPress={handleApply}
            activeOpacity={0.8}
            className="rounded-2xl py-4 items-center"
            style={{ backgroundColor: BOTTOM_SHEET_COLORS.primary }}
          >
            <Text className="text-base font-semibold text-white">
              {applyButtonLabel}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </BaseBottomSheet>
  );
}
