import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export interface InfluencerReportFilterState {
  date: Date | null;
}

interface InfluencerReportFilterBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  currentFilters: InfluencerReportFilterState;
  onApplyFilters: (filters: InfluencerReportFilterState) => void;
}

export default function InfluencerReportFilterBottomSheet({
  visible,
  onClose,
  currentFilters,
  onApplyFilters,
}: InfluencerReportFilterBottomSheetProps) {
  const slideAnim = useRef(new Animated.Value(600)).current;
  const [tempFilters, setTempFilters] = useState<InfluencerReportFilterState>(currentFilters);
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setTempFilters({ ...tempFilters, date: selectedDate });
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
              <View></View>
              <Text className="text-lg font-bold text-black">Refine your Search</Text>
              <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
                <MaterialCommunityIcons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Filter Options */}
            <View className="px-6 py-2">
              {/* Date Picker */}
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                activeOpacity={0.7}
                className="bg-white border border-gray-200 rounded-2xl px-4 py-4 mb-3"
              >
                <View className="flex-row items-center justify-between">
                  <Text className="text-base text-[#6C727F]">
                    {tempFilters.date ? formatDate(tempFilters.date) : 'Date'}
                  </Text>
                  <MaterialCommunityIcons name="calendar" size={24} color="#000" />
                </View>
              </TouchableOpacity>
            </View>

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

            {/* Date Picker Modal */}
            {showDatePicker && (
              <DateTimePicker
                value={tempFilters.date || new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </Animated.View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
