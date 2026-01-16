import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Animated, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export interface ChallengeFilterState {
  category: string;
  fromDate: Date | null;
  toDate: Date | null;
}

interface ChallengeFilterBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  currentFilters: ChallengeFilterState;
  onApplyFilters: (filters: ChallengeFilterState) => void;
  onOpenCategoryPicker: () => void;
}

export default function ChallengeFilterBottomSheet({
  visible,
  onClose,
  currentFilters,
  onApplyFilters,
  onOpenCategoryPicker,
}: ChallengeFilterBottomSheetProps) {
  const slideAnim = useRef(new Animated.Value(600)).current;
  const [tempFilters, setTempFilters] = useState<ChallengeFilterState>(currentFilters);
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);

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
    const resetFilters: ChallengeFilterState = {
      category: 'category',
      fromDate: null,
      toDate: null,
    };
    setTempFilters(resetFilters);
  };

  const handleApply = () => {
    onApplyFilters(tempFilters);
    onClose();
  };

  const handleFromDateChange = (_event: any, selectedDate?: Date) => {
    setShowFromDatePicker(false);
    if (selectedDate) {
      setTempFilters({ ...tempFilters, fromDate: selectedDate });
    }
  };

  const handleToDateChange = (_event: any, selectedDate?: Date) => {
    setShowToDatePicker(false);
    if (selectedDate) {
      setTempFilters({ ...tempFilters, toDate: selectedDate });
    }
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
              <Text className="text-lg font-bold text-black">Refine your Search</Text>
              <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
                <MaterialCommunityIcons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Content */}
            <View className="px-5 py-6">
              {/* Category Dropdown */}
              <TouchableOpacity
                onPress={onOpenCategoryPicker}
                activeOpacity={0.7}
                className="flex-row items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-4 mb-4"
              >
                <Text className="text-base text-gray-600">
                  {tempFilters.category}
                </Text>
                <MaterialCommunityIcons name="chevron-down" size={24} color="#666" />
              </TouchableOpacity>

              {/* From Date */}
              <TouchableOpacity
                onPress={() => setShowFromDatePicker(true)}
                activeOpacity={0.7}
                className="flex-row items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-4 mb-4"
              >
                <Text className="text-base text-gray-600">
                  {tempFilters.fromDate
                    ? tempFilters.fromDate.toLocaleDateString()
                    : 'From Date'}
                </Text>
                <MaterialCommunityIcons name="calendar" size={24} color="#666" />
              </TouchableOpacity>

              {showFromDatePicker && (
                <DateTimePicker
                  value={tempFilters.fromDate || new Date()}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleFromDateChange}
                />
              )}

              {/* To Date */}
              <TouchableOpacity
                onPress={() => setShowToDatePicker(true)}
                activeOpacity={0.7}
                className="flex-row items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-4 mb-6"
              >
                <Text className="text-base text-gray-600">
                  {tempFilters.toDate
                    ? tempFilters.toDate.toLocaleDateString()
                    : 'To Date'}
                </Text>
                <MaterialCommunityIcons name="calendar" size={24} color="#666" />
              </TouchableOpacity>

              {showToDatePicker && (
                <DateTimePicker
                  value={tempFilters.toDate || new Date()}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleToDateChange}
                />
              )}

              {/* Action Buttons */}
              <View className="flex-row gap-3">
                <TouchableOpacity
                  onPress={handleReset}
                  activeOpacity={0.7}
                  className="flex-1 bg-gray-200 rounded-xl py-4 items-center"
                >
                  <Text className="text-base font-semibold text-gray-700">Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleApply}
                  activeOpacity={0.7}
                  className="flex-1 rounded-xl py-4 items-center"
                  style={{ backgroundColor: '#5EBD3E' }}
                >
                  <Text className="text-base font-semibold text-white">Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
}
