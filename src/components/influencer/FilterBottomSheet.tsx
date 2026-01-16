import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export interface FilterState {
  platform: string[];
  audienceLocation: string[];
  ageBracket: string[];
  gender: string[];
  followers: string[];
  er: string[];
  category: string[];
  // Keeping old props for backward compatibility
  categories?: string[];
  platforms?: string[];
  locations?: string[];
  followerRange?: {
    min: number;
    max: number;
  } | null;
}

interface FilterBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  currentFilters: FilterState;
  onApplyFilters: (filters: FilterState) => void;
  onOpenCategoryPicker: () => void;
}

export default function FilterBottomSheet({
  visible,
  onClose,
  currentFilters,
  onApplyFilters,
  onOpenCategoryPicker,
}: FilterBottomSheetProps) {
  const slideAnim = useRef(new Animated.Value(600)).current;
  const [tempFilters, setTempFilters] = useState<FilterState>(currentFilters);

  useEffect(() => {
    if (visible) {
      setTempFilters(currentFilters);
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
  }, [visible, currentFilters]);

  const handleReset = () => {
    const resetFilters: FilterState = {
      platform: [],
      audienceLocation: [],
      ageBracket: [],
      gender: [],
      followers: [],
      er: [],
      category: [],
    };
    setTempFilters(resetFilters);
  };

  const handleApply = () => {
    onApplyFilters(tempFilters);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'flex-end',
        }}
      >
        <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
          <Animated.View
            style={{
              backgroundColor: 'white',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              paddingBottom: 40,
              transform: [{ translateY: slideAnim }],
            }}
          >
            {/* Drag Handle */}
            <View className="items-center pt-3 pb-2">
              <View
                style={{
                  width: 40,
                  height: 4,
                  backgroundColor: '#E5E5E5',
                  borderRadius: 2,
                }}
              />
            </View>

            {/* Header */}
            <View className="flex-row items-center justify-between px-6 py-4">
              <Text className="text-xl font-bold text-black">Refine your Search</Text>
              <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
                <MaterialCommunityIcons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Filter Options */}
            <ScrollView
              style={{ maxHeight: 450 }}
              contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 10, paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
            >
              {/* Platform Filter */}
              <TouchableOpacity
                activeOpacity={0.7}
                className="bg-white border border-gray-200 rounded-xl px-4 py-4 mb-3"
              >
                <View className="flex-row items-center justify-between">
                  <Text className="text-base text-[#6C727F]">Platform</Text>
                  <MaterialCommunityIcons name="chevron-down" size={24} color="#000" />
                </View>
              </TouchableOpacity>

              {/* Audience Location Filter */}
              <TouchableOpacity
                activeOpacity={0.7}
                className="bg-white border border-gray-200 rounded-xl px-4 py-4 mb-3"
              >
                <View className="flex-row items-center justify-between">
                  <Text className="text-base text-[#6C727F]">Audience Location</Text>
                  <MaterialCommunityIcons name="chevron-down" size={24} color="#000" />
                </View>
              </TouchableOpacity>

              {/* Age Bracket Filter */}
              <TouchableOpacity
                activeOpacity={0.7}
                className="bg-white border border-gray-200 rounded-xl px-4 py-4 mb-3"
              >
                <View className="flex-row items-center justify-between">
                  <Text className="text-base text-[#6C727F]">Age Bracket</Text>
                  <MaterialCommunityIcons name="chevron-down" size={24} color="#000" />
                </View>
              </TouchableOpacity>

              {/* Gender Filter */}
              <TouchableOpacity
                activeOpacity={0.7}
                className="bg-white border border-gray-200 rounded-xl px-4 py-4 mb-3"
              >
                <View className="flex-row items-center justify-between">
                  <Text className="text-base text-[#6C727F]">Gender</Text>
                  <MaterialCommunityIcons name="chevron-down" size={24} color="#000" />
                </View>
              </TouchableOpacity>

              {/* Followers Filter */}
              <TouchableOpacity
                activeOpacity={0.7}
                className="bg-white border border-gray-200 rounded-xl px-4 py-4 mb-3"
              >
                <View className="flex-row items-center justify-between">
                  <Text className="text-base text-[#6C727F]">Followers</Text>
                  <MaterialCommunityIcons name="chevron-down" size={24} color="#000" />
                </View>
              </TouchableOpacity>

              {/* ER Filter */}
              <TouchableOpacity
                activeOpacity={0.7}
                className="bg-white border border-gray-200 rounded-xl px-4 py-4 mb-3"
              >
                <View className="flex-row items-center justify-between">
                  <Text className="text-base text-[#6C727F]">ER</Text>
                  <MaterialCommunityIcons name="chevron-down" size={24} color="#000" />
                </View>
              </TouchableOpacity>

              {/* Category Filter */}
              <TouchableOpacity
                onPress={onOpenCategoryPicker}
                activeOpacity={0.7}
                className="bg-white border border-gray-200 rounded-xl px-4 py-4 mb-3"
              >
                <View className="flex-row items-center justify-between">
                  <Text className="text-base text-[#6C727F]">Category</Text>
                  <MaterialCommunityIcons name="chevron-down" size={24} color="#000" />
                </View>
              </TouchableOpacity>
            </ScrollView>

            {/* Action Buttons */}
            <View className="flex-row px-6 pt-4 pb-6 gap-3">
              {/* Reset Button */}
              <TouchableOpacity
                onPress={handleReset}
                activeOpacity={0.7}
                className="flex-1 rounded-2xl py-4 items-center"
                style={{ backgroundColor: '#E8E8E8' }}
              >
                <Text className="text-base font-semibold text-black">Reset</Text>
              </TouchableOpacity>

              {/* Apply Button */}
              <TouchableOpacity
                onPress={handleApply}
                activeOpacity={0.7}
                className="flex-1 rounded-2xl py-4 items-center"
                style={{ backgroundColor: '#5EBD3E' }}
              >
                <Text className="text-base font-semibold text-white">Apply</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
