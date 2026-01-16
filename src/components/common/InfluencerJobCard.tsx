import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Frame1984077131Svg, UserBox } from '../../../assets/images';

interface CardButton {
  label: string;
  onPress: () => void;
}

interface InfluencerJobCardProps {
  influencerName: string;
  influencerUsername: string;
  influencerAvatar?: any;
  statusText: string;
  statusBgColor: string;
  details: Array<{
    label: string;
    value: string;
    isBadge?: boolean;
    badgeColor?: string;
  }>;
  buttons: [CardButton, CardButton];
}

export default function InfluencerJobCard({
  influencerName,
  influencerUsername,
  statusText,
  statusBgColor,
  details,
  buttons,
}: InfluencerJobCardProps) {
  return (
    <View
      className="rounded-2xl p-4 mb-3 mx-5 bg-white"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      {/* Header - Profile Info with Status Badge */}
      <View className="flex-row items-start justify-between mb-4">
        <View className="flex-row items-start flex-1">
          <View style={{ width: 40, height: 40 }}>
            <Frame1984077131Svg width={40} height={40} />
          </View>
          <View className="ml-3 flex-1">
            <View className="flex-row items-center">
              <Text className="text-base font-bold text-black mr-2">
                {influencerName}
              </Text>
              <UserBox width={20} height={20} />
            </View>
            <Text className="text-xs text-[#76767CCC]">{influencerUsername}</Text>
          </View>
        </View>
        <View
          className="px-3 py-2 rounded-full"
          style={{ backgroundColor: statusBgColor }}
        >
          <Text className="text-xs font-semibold text-black">{statusText}</Text>
        </View>
      </View>

      {/* Details */}
      <View className="mb-4">
        {details.map((detail, index) => (
          <View
            key={index}
            className="flex-row items-center justify-between py-3"
            style={{
              borderBottomWidth: index === details.length - 1 ? 0 : 1,
              borderBottomColor: '#E5E5E5',
            }}
          >
            <Text className="text-sm text-[#6C727F]">{detail.label}</Text>
            {detail.isBadge ? (
              <View
                className="px-3 py-1 rounded-full"
                style={{ backgroundColor: detail.badgeColor || '#E0F6C6', borderBottomWidth: 1,
              borderBottomColor: '#E5E5E5', }}
              >
                <Text className="text-xs font-semibold text-black">{detail.value}</Text>
              </View>
            ) : (
             
              <Text className="text-sm font-semibold text-black">{detail.value}</Text>
            )}
          </View>
        ))}
      </View>

      {/* Action Buttons */}
      <View className="flex-row gap-3">
        <TouchableOpacity
          onPress={buttons[0].onPress}
          activeOpacity={0.8}
          className="flex-1 rounded-2xl py-3 items-center border-2"
          style={{ borderColor: '#5EBD3E', backgroundColor: 'transparent' }}
        >
          <Text className="text-sm font-semibold" style={{ color: '#5EBD3E' }}>
            {buttons[0].label}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={buttons[1].onPress}
          activeOpacity={0.8}
          className="flex-1 rounded-2xl py-3 items-center border-2"
          style={{ borderColor: '#5EBD3E', backgroundColor: 'transparent' }}
        >
          <Text className="text-sm font-semibold" style={{ color: '#5EBD3E' }}>
            {buttons[1].label}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
