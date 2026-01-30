import React from 'react';
import { View, TextInput, ViewStyle, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  containerStyle?: ViewStyle;
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search',
  containerStyle,
}: SearchBarProps) {
  return (
    <View
      className="flex-row items-center bg-white px-4 mb-6"
      style={[
        {
          paddingVertical: Platform.OS === 'ios' ? 16 : 5,
          borderRadius: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 3,
          elevation: 3,
        },
        containerStyle,
      ]}
    >
      <View className="mr-2">
        <MaterialCommunityIcons name="magnify" size={20} color="#6C727F" />
      </View>
      <TextInput
        className="flex-1 text-base text-black"
        placeholder={placeholder}
        placeholderTextColor="#6C727F"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}
