import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BriefCase, ReadInvitations, UnreadInvitations, UnreadSvg } from '../../../assets/images';

interface JobInvitationCardProps {
  title: string;
  description: string;
  timestamp: string;
  isNew: boolean;
  onPress: () => void;
}

export default function JobInvitationCard({
  title,
  description,
  timestamp,
  isNew,
  onPress,
}: JobInvitationCardProps) {
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
      <View className="flex-row">
        {/* Briefcase Icon */}
        <View
          className="items-center justify-center"
          style={{
            width: 40,
            height: 40,
            backgroundColor: '#F5F5F5',
            borderRadius: 20,
          }}
        >
           {isNew ?  (
          <UnreadInvitations width={40} height={40} />
           ):(<ReadInvitations width={24} height={40} />)}
        </View>

        {/* Content Section */}
        <View className="flex-1 ml-3">
          {/* Title */}
          <Text className="text-base font-semibold text-[#1D1C1C] mb-1">{title}</Text>

          {/* Description */}
          <Text
            className={`text-sm ${isNew ? 'text-[#1D1C1C]' : 'text-[#6C727F]'} `}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {description}
          </Text>
        </View>

        {/* Right Section - New Indicator & Timestamp */}
        <View className="ml-2" style={{ position: 'relative', width: 60 }}>
          {/* Green Dot - Top Right */}
          {isNew && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: '#5EBD3E',
              }}
            />
          )}

          {/* Timestamp - Bottom Right */}
         
        </View>
      </View>
      <View className=' flex-1  items-end justify-end'>
       <Text
            className="  text-[10px]  text-[#6C727F]"
           
          >
            {timestamp}
          </Text>
          </View>
    </TouchableOpacity>
  );
}
