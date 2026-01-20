import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BaseBottomSheet from './BaseBottomSheet';
import { BOTTOM_SHEET_COLORS } from '@/constants/bottomSheet';

/**
 * Represents a single filter field
 */
export interface FilterField {
  /** Type of the filter field */
  type: 'picker' | 'date' | 'text' | 'custom';

  /** Label for the field */
  label: string;

  /** Current value of the field */
  value: any;

  /** Callback when a picker or date field is pressed */
  onPress?: () => void;

  /** Callback when text field value changes */
  onChange?: (value: any) => void;

  /** Placeholder text for the field */
  placeholder?: string;

  /** MaterialCommunityIcons name for the field */
  icon?: string;

  /** Custom renderer for 'custom' type fields */
  renderCustom?: () => ReactNode;
}

/**
 * Props for FilterBottomSheet component
 */
export interface FilterBottomSheetProps {
  /** Controls visibility of the bottom sheet */
  visible: boolean;

  /** Callback when bottom sheet should close */
  onClose: () => void;

  /** Title displayed in the header */
  title: string;

  /** Array of filter fields to render */
  fields: FilterField[];

  /** Callback when filters are applied */
  onApply: () => void;

  /** Optional callback to reset filters */
  onReset?: () => void;

  /** Whether to show the reset button (default: true) */
  showResetButton?: boolean;

  /** Custom label for apply button (default: "Done") */
  applyButtonLabel?: string;

  /** Custom label for reset button (default: "Reset") */
  resetButtonLabel?: string;
}

/**
 * Filter Bottom Sheet Component
 *
 * A reusable bottom sheet for filter forms with multiple input types.
 * Supports picker fields, date fields, text fields, and custom fields.
 *
 * Replaces:
 * - ChallengeFilterBottomSheet
 * - FilterBottomSheet (influencer)
 * - NetworkFilterBottomSheet
 * - ContractFilterBottomSheet
 * - ReportFilterBottomSheet
 * - InfluencerReportFilterBottomSheet
 *
 * @example
 * ```tsx
 * <FilterBottomSheet
 *   visible={showFilter}
 *   onClose={() => setShowFilter(false)}
 *   title="Refine your Search"
 *   fields={[
 *     {
 *       type: 'picker',
 *       label: 'Category',
 *       value: filters.category,
 *       onPress: () => setShowCategoryPicker(true),
 *       icon: 'chevron-down',
 *       placeholder: 'Select category',
 *     },
 *     {
 *       type: 'date',
 *       label: 'Date',
 *       value: filters.date ? formatDate(filters.date) : null,
 *       onPress: () => setShowDatePicker(true),
 *     },
 *     {
 *       type: 'text',
 *       label: 'Search',
 *       value: filters.search,
 *       onChange: (text) => setFilters({ ...filters, search: text }),
 *       placeholder: 'Enter search term',
 *     },
 *   ]}
 *   onApply={() => applyFilters(filters)}
 *   onReset={resetFilters}
 * />
 * ```
 */
export default function FilterBottomSheet({
  visible,
  onClose,
  title,
  fields,
  onApply,
  onReset,
  showResetButton = true,
  applyButtonLabel = 'Done',
  resetButtonLabel = 'Reset',
}: FilterBottomSheetProps) {
  const handleApply = () => {
    onApply();
    onClose();
  };

  const handleReset = () => {
    if (onReset) {
      onReset();
    }
  };

  const renderField = (field: FilterField, index: number) => {
    const key = `field-${index}`;

    switch (field.type) {
      case 'picker':
      case 'date':
        return (
          <View key={key} className="mb-3">
            <TouchableOpacity
              onPress={field.onPress}
              activeOpacity={0.7}
              className="bg-white border rounded-2xl px-4 py-4"
              style={{ borderColor: BOTTOM_SHEET_COLORS.borderAlt }}
            >
              <View className="flex-row items-center justify-between">
                <Text
                  className="text-base"
                  style={{
                    color: field.value
                      ? BOTTOM_SHEET_COLORS.text
                      : BOTTOM_SHEET_COLORS.textSecondary,
                  }}
                >
                  {field.value || field.placeholder || field.label}
                </Text>
                <MaterialCommunityIcons
                  name={field.icon || (field.type === 'date' ? 'calendar' : 'chevron-down')}
                  size={24}
                  color={BOTTOM_SHEET_COLORS.text}
                />
              </View>
            </TouchableOpacity>
          </View>
        );

      case 'text':
        return (
          <View key={key} className="mb-3">
            <TextInput
              value={field.value}
              onChangeText={field.onChange}
              placeholder={field.placeholder || field.label}
              placeholderTextColor={BOTTOM_SHEET_COLORS.textSecondary}
              className="bg-white border rounded-2xl px-4 py-4 text-base"
              style={{
                borderColor: BOTTOM_SHEET_COLORS.borderAlt,
                color: BOTTOM_SHEET_COLORS.text,
              }}
            />
          </View>
        );

      case 'custom':
        return (
          <View key={key} className="mb-3">
            {field.renderCustom && field.renderCustom()}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <BaseBottomSheet visible={visible} onClose={onClose} title={title}>
      {/* Filter Fields */}
      <ScrollView className="px-6 py-4" showsVerticalScrollIndicator={false}>
        {fields.map((field, index) => renderField(field, index))}
      </ScrollView>

      {/* Action Buttons */}
      <View
        className="flex-row px-6 py-4 gap-3 border-t"
        style={{ borderTopColor: BOTTOM_SHEET_COLORS.border }}
      >
        {/* Reset Button */}
        {showResetButton && onReset && (
          <TouchableOpacity
            onPress={handleReset}
            activeOpacity={0.8}
            className="flex-1 rounded-2xl py-4 items-center"
            style={{ backgroundColor: BOTTOM_SHEET_COLORS.resetBackground }}
          >
            <Text
              className="text-base font-semibold"
              style={{ color: BOTTOM_SHEET_COLORS.text }}
            >
              {resetButtonLabel}
            </Text>
          </TouchableOpacity>
        )}

        {/* Apply Button */}
        <TouchableOpacity
          onPress={handleApply}
          activeOpacity={0.8}
          className="flex-1 rounded-2xl py-4 items-center"
          style={{ backgroundColor: BOTTOM_SHEET_COLORS.primary }}
        >
          <Text className="text-base font-semibold text-white">
            {applyButtonLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </BaseBottomSheet>
  );
}
