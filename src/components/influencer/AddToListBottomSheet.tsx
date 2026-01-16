import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface AddToListBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onSave: (listName: string) => void;
}

export default function AddToListBottomSheet({
  visible,
  onClose,
  onSave,
}: AddToListBottomSheetProps) {
  const slideAnim = useRef(new Animated.Value(600)).current;
  const [newListName, setNewListName] = useState('');
  const [selectedList, setSelectedList] = useState('');

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

  const handleSave = () => {
    const listToUse = newListName || selectedList;
    if (listToUse) {
      onSave(listToUse);
      setNewListName('');
      setSelectedList('');
    }
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
              <Text className="text-xl font-bold text-black">
                Add Influencer to your List
              </Text>
              <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
                <MaterialCommunityIcons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Content */}
            <View className="px-6 pt-4">
              {/* New List Input */}
              <View className="mb-4">
                <Text className="text-sm font-medium text-black mb-2">New List</Text>
                <TextInput
                  className="bg-white border border-gray-200 rounded-xl px-4 py-4 text-base"
                  placeholder="e.g. Music"
                  placeholderTextColor="#999"
                  value={newListName}
                  onChangeText={setNewListName}
                />
              </View>

              {/* Select List Dropdown */}
              <TouchableOpacity
                activeOpacity={0.7}
                className="bg-white border border-gray-200 rounded-xl px-4 py-4 mb-6"
              >
                <View className="flex-row items-center justify-between">
                  <Text className="text-base text-[#6C727F]">Select List</Text>
                  <MaterialCommunityIcons name="chevron-down" size={24} color="#000" />
                </View>
              </TouchableOpacity>

              {/* Save Button */}
              <TouchableOpacity
                onPress={handleSave}
                activeOpacity={0.8}
                className="rounded-2xl py-4 items-center"
                style={{ backgroundColor: '#5EBD3E' }}
              >
                <Text className="text-base font-semibold text-white">Save Influencer</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
