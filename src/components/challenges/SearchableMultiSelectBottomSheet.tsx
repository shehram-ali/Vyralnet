import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BaseBottomSheet from '../common/BaseBottomSheet';
import { BOTTOM_SHEET_COLORS } from '@/constants/bottomSheet';

interface SearchableMultiSelectBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  items: string[];
  selectedItems: string[];
  onSelect: (items: string[]) => void;
}

export default function SearchableMultiSelectBottomSheet({
  visible,
  onClose,
  title,
  items,
  selectedItems,
  onSelect,
}: SearchableMultiSelectBottomSheetProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [tempSelectedItems, setTempSelectedItems] = useState<string[]>(selectedItems);

  // Reset when opening
  useEffect(() => {
    if (visible) {
      setTempSelectedItems(selectedItems);
      setSearchQuery('');
    }
  }, [visible, selectedItems]);

  // Filter items based on search query
  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggle = (item: string) => {
    setTempSelectedItems(prev => {
      if (prev.includes(item)) {
        return prev.filter(i => i !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleDone = () => {
    onSelect(tempSelectedItems);
    onClose();
  };

  return (
    <BaseBottomSheet
      visible={visible}
      onClose={onClose}
      title={title}
      maxHeight="80%"
    >
      {/* Search Bar */}
      <View className="px-5 pt-3 pb-2">
        <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
          <MaterialCommunityIcons name="magnify" size={20} color="#6C727F" />
          <TextInput
            className="flex-1 ml-2 text-base text-black"
            placeholder="Search"
            placeholderTextColor="#6C727F"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Items List */}
      <ScrollView
        className="px-5"
        showsVerticalScrollIndicator={false}
        style={{ maxHeight: 400 }}
      >
        {filteredItems.map((item, index) => {
          const isSelected = tempSelectedItems.includes(item);
          const isLast = index === filteredItems.length - 1;

          return (
            <TouchableOpacity
              key={item}
              onPress={() => handleToggle(item)}
              activeOpacity={0.7}
              className={`flex-row items-center justify-between py-4 ${!isLast ? 'border-b border-gray-100' : ''}`}
            >
              <Text
                className="text-base flex-1"
                style={{ color: BOTTOM_SHEET_COLORS.text }}
              >
                {item}
              </Text>

              {/* Checkmark Circle */}
              <View
                className="w-6 h-6 rounded-full items-center justify-center"
                style={{
                  backgroundColor: isSelected ? '#5EBD3E' : 'transparent',
                  borderWidth: isSelected ? 0 : 2,
                  borderColor: '#E5E5E5',
                }}
              >
                {isSelected && (
                  <MaterialCommunityIcons
                    name="check"
                    size={16}
                    color="white"
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        })}

        {/* No Results */}
        {filteredItems.length === 0 && (
          <View className="items-center justify-center py-10">
            <MaterialCommunityIcons name="magnify" size={48} color="#CCC" />
            <Text className="text-gray-400 text-base mt-3">No results found</Text>
          </View>
        )}
      </ScrollView>

      {/* Done Button */}
      <View className="px-5 py-4 border-t border-gray-100">
        <TouchableOpacity
          onPress={handleDone}
          activeOpacity={0.8}
          className="rounded-2xl py-4 items-center"
          style={{ backgroundColor: '#5EBD3E' }}
        >
          <Text className="text-base font-semibold text-white">Done</Text>
        </TouchableOpacity>
      </View>
    </BaseBottomSheet>
  );
}
