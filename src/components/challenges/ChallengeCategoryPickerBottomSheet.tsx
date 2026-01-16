import React, { useEffect, useRef } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ChallengeCategoryPickerBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categories: string[];
}

export default function ChallengeCategoryPickerBottomSheet({
  visible,
  onClose,
  selectedCategory,
  onSelectCategory,
  categories,
}: ChallengeCategoryPickerBottomSheetProps) {
  const slideAnim = useRef(new Animated.Value(600)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 65,
        friction: 11,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 600,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleSelectCategory = (category: string) => {
    onSelectCategory(category);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        className="flex-1 bg-black/50 justify-end"
      >
        <Animated.View
          style={{
            transform: [{ translateY: slideAnim }],
            maxHeight: '70%',
          }}
          className="bg-white rounded-t-3xl"
        >
          <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
            {/* Handle Bar */}
            <View className="items-center py-3">
              <View className="w-12 h-1 bg-gray-300 rounded-full" />
            </View>

            {/* Header */}
            <View className="flex-row items-center justify-between px-5 py-3 border-b border-gray-100">
              <Text className="text-lg font-bold text-black">Select Category</Text>
              <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
                <MaterialCommunityIcons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Categories List */}
            <ScrollView className="px-5 py-4" showsVerticalScrollIndicator={false}>
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSelectCategory(category)}
                  activeOpacity={0.7}
                  className="flex-row items-center justify-between py-4 border-b border-gray-100"
                >
                  <Text
                    className={`text-base ${
                      selectedCategory === category
                        ? 'font-semibold text-[#5EBD3E]'
                        : 'text-gray-700'
                    }`}
                  >
                    {category}
                  </Text>
                  {selectedCategory === category && (
                    <MaterialCommunityIcons name="check" size={24} color="#5EBD3E" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
}
