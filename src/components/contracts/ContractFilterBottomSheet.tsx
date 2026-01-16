import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export interface ContractFilterState {
  status: string;
  fromDate: Date | null;
  toDate: Date | null;
}

interface ContractFilterBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  currentFilters: ContractFilterState;
  onApplyFilters: (filters: ContractFilterState) => void;
  onOpenStatusPicker: () => void;
}

export default function ContractFilterBottomSheet({
  visible,
  onClose,
  currentFilters,
  onApplyFilters,
  onOpenStatusPicker,
}: ContractFilterBottomSheetProps) {
  const slideAnim = useRef(new Animated.Value(600)).current;
  const [tempFilters, setTempFilters] = useState<ContractFilterState>(currentFilters);
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

  const handleDone = () => {
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

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
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
              {/* Status Filter */}
              <TouchableOpacity
                onPress={onOpenStatusPicker}
                activeOpacity={0.7}
                className="bg-white border border-gray-200 rounded-2xl px-3 py-3 mb-3"
              >
                <View className='flex-row items-center justify-between'>
                  
                  <View className="">
                    <Text className="text-xs text-[#6C727F] ">Status</Text>
                    <Text className="text-base text-black font-medium">
                      {tempFilters.status || 'All'}
                    </Text>
                    
                  </View>
                  <MaterialCommunityIcons name="chevron-down" size={24} color="#000" />
                </View>
              </TouchableOpacity>

              {/* From Date Picker */}
              <TouchableOpacity
                onPress={() => setShowFromDatePicker(true)}
                activeOpacity={0.7}
                className="bg-white border border-gray-200 rounded-xl px-4 py-4 mb-3"
              >
                <View className="flex-row items-center justify-between">
                  <Text className="text-base text-[#6C727F]">
                    {tempFilters.fromDate ? formatDate(tempFilters.fromDate) : 'From Date'}
                  </Text>
                  <MaterialCommunityIcons name="calendar" size={24} color="#000" />
                </View>
              </TouchableOpacity>

              {/* To Date Picker */}
              <TouchableOpacity
                onPress={() => setShowToDatePicker(true)}
                activeOpacity={0.7}
                className="bg-white border border-gray-200 rounded-xl px-4 py-4 mb-3"
              >
                <View className="flex-row items-center justify-between">
                  <Text className="text-base text-[#6C727F]">
                    {tempFilters.toDate ? formatDate(tempFilters.toDate) : 'To Date'}
                  </Text>
                  <MaterialCommunityIcons name="calendar" size={24} color="#000" />
                </View>
              </TouchableOpacity>
            </ScrollView>

            {/* Done Button */}
            <View className="px-6 pt-4">
              <TouchableOpacity
                onPress={handleDone}
                activeOpacity={0.7}
                className="rounded-2xl p-4 items-center"
                style={{ backgroundColor: '#5EBD3E' }}
              >
                <Text className="text-base font-semibold text-white">Done</Text>
              </TouchableOpacity>
            </View>

            {/* Date Pickers */}
            {showFromDatePicker && (
              <DateTimePicker
                value={tempFilters.fromDate || new Date()}
                mode="date"
                display="default"
                onChange={handleFromDateChange}
              />
            )}

            {showToDatePicker && (
              <DateTimePicker
                value={tempFilters.toDate || new Date()}
                mode="date"
                display="default"
                onChange={handleToDateChange}
              />
            )}
          </Animated.View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
