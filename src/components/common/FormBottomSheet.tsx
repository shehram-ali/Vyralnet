import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import BaseBottomSheet from './BaseBottomSheet';
import { BOTTOM_SHEET_COLORS } from '@/constants/bottomSheet';

/**
 * Represents a single form field
 */
export interface FormField {
  /** Unique key for the field */
  key: string;

  /** Label for the field */
  label: string;

  /** Placeholder text */
  placeholder?: string;

  /** Current value */
  value: string;

  /** Callback when text changes */
  onChangeText: (text: string) => void;

  /** Whether the field is multiline */
  multiline?: boolean;

  /** Number of lines for multiline fields */
  numberOfLines?: number;

  /** Keyboard type */
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';

  /** Whether the field is required */
  required?: boolean;

  /** Max length of input */
  maxLength?: number;
}

/**
 * Props for FormBottomSheet component
 */
export interface FormBottomSheetProps {
  /** Controls visibility of the bottom sheet */
  visible: boolean;

  /** Callback when bottom sheet should close */
  onClose: () => void;

  /** Title displayed in the header */
  title: string;

  /** Array of form fields */
  fields: FormField[];

  /** Callback when form is submitted */
  onSubmit: () => void;

  /** Custom label for submit button (default: "Submit") */
  submitButtonLabel?: string;

  /** Whether the submit button is disabled */
  submitDisabled?: boolean;
}

/**
 * Form Bottom Sheet Component
 *
 * A reusable bottom sheet for forms with text input fields.
 * Includes keyboard handling and a submit button.
 *
 * Replaces:
 * - AddToListBottomSheet
 * - CreateListBottomSheet
 *
 * @example
 * ```tsx
 * <FormBottomSheet
 *   visible={showForm}
 *   onClose={() => setShowForm(false)}
 *   title="Create List"
 *   fields={[
 *     {
 *       key: 'name',
 *       label: 'List Name',
 *       placeholder: 'Enter list name',
 *       value: listName,
 *       onChangeText: setListName,
 *       required: true,
 *     },
 *     {
 *       key: 'description',
 *       label: 'Description',
 *       placeholder: 'Enter description (optional)',
 *       value: description,
 *       onChangeText: setDescription,
 *       multiline: true,
 *       numberOfLines: 3,
 *     },
 *   ]}
 *   onSubmit={handleCreateList}
 *   submitButtonLabel="Create"
 * />
 * ```
 */
export default function FormBottomSheet({
  visible,
  onClose,
  title,
  fields,
  onSubmit,
  submitButtonLabel = 'Submit',
  submitDisabled = false,
}: FormBottomSheetProps) {
  const handleSubmit = () => {
    onSubmit();
    onClose();
  };

  return (
    <BaseBottomSheet visible={visible} onClose={onClose} title={title}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* Form Fields */}
        <ScrollView className="px-6 py-4" showsVerticalScrollIndicator={false}>
          {fields.map((field) => (
            <View key={field.key} className="mb-4">
              {/* Label */}
              <Text
                className="text-sm font-medium mb-2"
                style={{ color: BOTTOM_SHEET_COLORS.text }}
              >
                {field.label}
                {field.required && (
                  <Text style={{ color: BOTTOM_SHEET_COLORS.destructive }}>
                    {' '}*
                  </Text>
                )}
              </Text>

              {/* Input Field */}
              <TextInput
                value={field.value}
                onChangeText={field.onChangeText}
                placeholder={field.placeholder}
                placeholderTextColor={BOTTOM_SHEET_COLORS.textSecondary}
                keyboardType={field.keyboardType || 'default'}
                multiline={field.multiline}
                numberOfLines={field.numberOfLines}
                maxLength={field.maxLength}
                className="bg-white border rounded-2xl px-4 py-3 text-base"
                style={{
                  borderColor: BOTTOM_SHEET_COLORS.borderAlt,
                  color: BOTTOM_SHEET_COLORS.text,
                  minHeight: field.multiline ? 80 : 48,
                  textAlignVertical: field.multiline ? 'top' : 'center',
                }}
              />

              {/* Character Count (if maxLength is set) */}
              {field.maxLength && (
                <Text
                  className="text-xs mt-1 text-right"
                  style={{ color: BOTTOM_SHEET_COLORS.textSecondary }}
                >
                  {field.value.length}/{field.maxLength}
                </Text>
              )}
            </View>
          ))}
        </ScrollView>

        {/* Submit Button */}
        <View
          className="px-6 py-4 border-t"
          style={{ borderTopColor: BOTTOM_SHEET_COLORS.border }}
        >
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={submitDisabled}
            activeOpacity={0.8}
            className="rounded-2xl py-4 items-center"
            style={{
              backgroundColor: submitDisabled
                ? BOTTOM_SHEET_COLORS.borderAlt
                : BOTTOM_SHEET_COLORS.primary,
            }}
          >
            <Text className="text-base font-semibold text-white">
              {submitButtonLabel}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </BaseBottomSheet>
  );
}
