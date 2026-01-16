import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface FollowersRangePickerBottomSheetProps {
  visible: boolean;
  selectedRange: string;
  onClose: () => void;
  onSelect: (range: string) => void;
}

const followersRangeOptions = [
  '1k-5k',
  '5k-10k',
  '10k-50k',
  '50k-100k',
  '100k-500k',
  '500k-1M',
  '1M+',
];

export default function FollowersRangePickerBottomSheet({
  visible,
  selectedRange,
  onClose,
  onSelect,
}: FollowersRangePickerBottomSheetProps) {
  const handleSelect = (range: string) => {
    onSelect(range);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-3xl px-5 pb-8 pt-4">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-xl font-bold text-black">Select Followers Range</Text>
            <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
              <MaterialCommunityIcons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Options List */}
          <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 400 }}>
            {followersRangeOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelect(option)}
                activeOpacity={0.7}
                className="flex-row items-center justify-between py-4 border-b border-gray-100"
              >
                <Text
                  className={`text-base ${
                    selectedRange === option
                      ? 'font-semibold text-[#5EBD3E]'
                      : 'text-gray-700'
                  }`}
                >
                  {option} followers
                </Text>
                {selectedRange === option && (
                  <MaterialCommunityIcons name="check" size={24} color="#5EBD3E" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
