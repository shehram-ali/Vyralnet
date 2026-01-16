import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface LocationPickerBottomSheetProps {
  visible: boolean;
  selectedLocation: string;
  onClose: () => void;
  onSelect: (location: string) => void;
}

const locationOptions = [
  'New York, USA',
  'Los Angeles, USA',
  'Chicago, USA',
  'London, UK',
  'Paris, France',
  'Tokyo, Japan',
  'Dubai, UAE',
  'Singapore',
  'Sydney, Australia',
  'Toronto, Canada',
];

export default function LocationPickerBottomSheet({
  visible,
  selectedLocation,
  onClose,
  onSelect,
}: LocationPickerBottomSheetProps) {
  const handleSelect = (location: string) => {
    onSelect(location);
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
            <Text className="text-xl font-bold text-black">Select Location</Text>
            <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
              <MaterialCommunityIcons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Options List */}
          <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 400 }}>
            {locationOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelect(option)}
                activeOpacity={0.7}
                className="flex-row items-center justify-between py-4 border-b border-gray-100"
              >
                <Text
                  className={`text-base ${
                    selectedLocation === option
                      ? 'font-semibold text-[#5EBD3E]'
                      : 'text-gray-700'
                  }`}
                >
                  {option}
                </Text>
                {selectedLocation === option && (
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
