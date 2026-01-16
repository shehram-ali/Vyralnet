import React, { useEffect, useRef } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ChallengeTypePickerBottomSheetProps {
  visible: boolean;
  selectedType: string;
  types: string[];
  onClose: () => void;
  onSelectType: (type: string) => void;
}

export default function ChallengeTypePickerBottomSheet({
  visible,
  selectedType,
  types,
  onClose,
  onSelectType,
}: ChallengeTypePickerBottomSheetProps) {
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

  const handleSelectType = (type: string) => {
    onSelectType(type);
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
            <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-200">
              <Text className="text-xl font-bold text-black">Select Challenge Type</Text>
              <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
                <MaterialCommunityIcons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Type List */}
            <ScrollView
              style={{ maxHeight: 400 }}
              contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 10, paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
            >
              {types.map((type, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSelectType(type)}
                  activeOpacity={0.7}
                  className="flex-row items-center justify-between py-4 border-b border-gray-100"
                >
                  <Text
                    className="text-base"
                    style={{
                      color: selectedType === type ? '#5EBD3E' : '#000',
                      fontWeight: selectedType === type ? '600' : '400',
                    }}
                  >
                    {type}
                  </Text>
                  {selectedType === type && (
                    <MaterialCommunityIcons name="check" size={24} color="#5EBD3E" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
