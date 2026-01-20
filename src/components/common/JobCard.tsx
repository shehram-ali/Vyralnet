import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Frame1984077131Svg } from '../../../assets/images';

interface JobCardProps {
  companyName: string;
  companyLogo?: any;
  timestamp: string;
  title: string;
  description: string;
  categories: string[];
  budget: string;
  location: string;
  onPress: () => void;
}

export default function JobCard({
  companyName,
  companyLogo,
  timestamp,
  title,
  description,
  categories,
  budget,
  location,
  onPress,
}: JobCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="rounded-2xl p-4 mb-3 mx-5 bg-white"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      {/* Header - Company and Timestamp */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center flex-1">
          <View style={{ width: 32, height: 32 }}>
            {companyLogo ? (
              companyLogo
            ) : (
              <Frame1984077131Svg width={32} height={32} />
            )}
          </View>
          <Text className="text-sm font-semibold text-black ml-2">{companyName}</Text>
        </View>
        <Text className="text-xs text-[#6C727F]">{timestamp}</Text>
      </View>

      {/* Title */}
      <Text className="text-base font-bold text-black mb-2">{title}</Text>

      {/* Description */}
      <Text
        className="text-sm text-[#6C727F]   mb-3"
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {description}
      </Text>
      <View className="h-px bg-[#E3E3E3] my-3" />

      {/* Categories and Budget/Location */}
      <View className="flex-row items-center justify-between">
        {/* Categories */}
        <View className="flex-row gap-2 flex-1">
          {categories.map((category, index) => (
            <View
              key={index}
              className="px-3 py-1 rounded-full"
              style={{ backgroundColor: '#E0F6C6' }}
            >
              <Text className="text-xs font-medium text-[#006400]">{category}</Text>
            </View>
          ))}
        </View>

        {/* Budget and Location */}
        <View className="items-end ml-3">
          <Text className="text-base font-bold text-black">{budget}</Text>
          <Text className="text-xs text-[#6C727F]">{location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
