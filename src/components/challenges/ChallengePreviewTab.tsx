import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UploadImage } from '../../../assets/images';

interface ChallengePreviewTabProps {
  businessName: string;
  website: string;
  logo: string | null;
  budget: string;
  description: string;
  category: string;
  contentLength: string;
  participants: string;
  startDate: Date | null;
  challengeRounds: string;
  location: string;
  followersRange: string;
  endDate: Date | null;
  challengeTitle: string;
  onContinue: () => void;
}

export default function ChallengePreviewTab({
  businessName,
  website,
  logo,
  budget,
  description,
  category,
  contentLength,
  participants,
  startDate,
  challengeRounds,
  location,
  followersRange,
  endDate,
  challengeTitle,
  onContinue,
}: ChallengePreviewTabProps) {
  return (
    <View className="bg-white">
      <Text className="text-sm text-gray-600 mb-4">
        Preview your Challenge details.
      </Text>

      {/* Company Info and Budget Section */}
      <View className="flex-row items-start justify-between mb-4">
        <View className="flex-row items-start flex-1">
          {logo ? (
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 24,
                backgroundColor: '#F0F0F0',
                overflow: 'hidden',
              }}
            >
              {/* Logo would be displayed here */}
            </View>
          ) : (
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 24,
                backgroundColor: '#006400',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image source={UploadImage} style={{ width: 40, height: 40 }} />
            </View>
          )}
          <View className="ml-3 flex-1">
            <Text className="text-base font-bold text-black mb-1">
              {businessName || 'Business Name'}
            </Text>
            {website && (
              <TouchableOpacity activeOpacity={0.7}>
                <Text className="text-sm font-medium" style={{ color: '#197DD5' }}>
                  Visit Website
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View className="items-end">
          <Text className="text-xs text-black mb-1">Budget</Text>
          <Text className="text-sm font-bold text-black">${budget || '0'}</Text>
        </View>
      </View>

      {/* Description and Details Combined */}
      <View className="bg-white rounded-2xl mb-6">
        {/* Description */}
        <Text className="text-sm font-semibold text-black mb-2">Description</Text>
        <Text className="text-sm text-[#303030] leading-5 mb-6">
          {description ||
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.'}
        </Text>
        <View className="h-0.5 w-full mb-6 bg-[#E3E3E3]"></View>

        {/* Two Column Details */}
        <View className="flex-row">
          {/* Left Column */}
          <View className="flex-1 pr-4">
            <View className="mb-5">
              <Text className="text-xs text-black mb-1">Category</Text>
              <Text className="text-sm font-medium text-black">
                {category || 'Lifestyle'}
              </Text>
            </View>

            <View className="mb-5">
              <Text className="text-xs text-black mb-1">Content Length</Text>
              <Text className="text-sm font-medium text-black">
                {contentLength || '20 sec'}
              </Text>
            </View>

            <View className="mb-5">
              <Text className="text-xs text-black mb-1">Participants to Start</Text>
              <Text className="text-sm font-medium text-black">
                {participants || '32'}
              </Text>
            </View>

            <View>
              <Text className="text-xs text-black mb-1">Start Date</Text>
              <Text className="text-sm font-medium text-black">
                {startDate ? startDate.toLocaleDateString('en-GB') : '15/11/2025'}
              </Text>
            </View>
          </View>

          {/* Right Column */}
          <View className="flex-1 pl-4">
            <View className="mb-5">
              <Text className="text-xs text-black mb-1">Platform</Text>
              <Text className="text-sm font-medium text-black">Instagram</Text>
            </View>

            <View className="mb-5">
              <Text className="text-xs text-black mb-1">Influencer Location</Text>
              <Text className="text-sm font-medium text-black">
                {location || 'New York, USA'}
              </Text>
            </View>

            <View className="mb-5">
              <Text className="text-xs text-black mb-1">Followers Range</Text>
              <Text className="text-sm font-medium text-black">
                {followersRange || '10k-50k'}
              </Text>
            </View>

            <View>
              <Text className="text-xs text-black mb-1">End Date</Text>
              <Text className="text-sm font-medium text-black">
                {endDate ? endDate.toLocaleDateString('en-GB') : '20/11/2025'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        onPress={onContinue}
        activeOpacity={0.8}
        className="rounded-2xl py-4 items-center"
        style={{ backgroundColor: '#5EBD3E' }}
      >
        <Text className="text-base font-semibold text-white">Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
