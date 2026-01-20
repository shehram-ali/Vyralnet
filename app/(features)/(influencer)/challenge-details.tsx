import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AlertNotification } from '../../../src/components/common';

interface ChallengeDetails {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  budget: string;
  location: string;
  followersRequired: string;
  participants: number;
  categories: string[];
  description: string;
  attachments?: Array<{
    name: string;
    type: 'pdf' | 'doc' | 'image';
    url: string;
  }>;
  status: 'won' | 'lost' | 'in-progress';
}

// Mock data - replace with actual API call
const mockChallengeDetails: ChallengeDetails = {
  id: '1',
  title: 'Instagram Influencer',
  company: 'Apple Inc.',
  startDate: 'Nov 15, 2025',
  endDate: 'Nov 20, 2025',
  budget: '$100',
  location: 'New York, USA',
  followersRequired: '10k-50k',
  participants: 12,
  categories: ['Comedy', 'Lifestyle'],
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan.',
  attachments: [
    {
      name: 'Doc.pdf',
      type: 'pdf',
      url: '',
    },
  ],
  status: 'lost',
};

export default function ChallengeDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [showAlert, setShowAlert] = useState(true);

  // In real app, fetch challenge details using params.id
  const challenge = mockChallengeDetails;

  const handleViewContent = () => {
    router.push({
      pathname: '/(features)/(brand)/content-details',
      params: { id: challenge.id },
    } as any);
  };

  const handleDownloadAttachment = (attachment: any) => {
    // Handle file download
    console.log('Download:', attachment.name);
  };

  const getAlertConfig = () => {
    switch (challenge.status) {
      case 'lost':
        return {
          type: 'error' as const,
          message: 'You lost the challenge. Better luck next time.',
        };
      case 'won':
        return {
          type: 'success' as const,
          message: 'Congratulations! You won the challenge.',
        };
      default:
        return null;
    }
  };

  const alertConfig = getAlertConfig();

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8FB]" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-4 bg-white">
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <MaterialCommunityIcons name="chevron-left" size={28} color="#000" />
        </TouchableOpacity>
        <Text className="text-base font-semibold text-black">Challenge Details</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Status Alert */}
        {alertConfig && (
          <AlertNotification
            type={alertConfig.type}
            message={alertConfig.message}
            onClose={() => setShowAlert(false)}
            visible={showAlert}
          />
        )}

        {/* Challenge Info Card */}
        <View className="mx-5 mt-4 bg-white border-[#E3E3E3] border-[1px] rounded-xl p-4">
          {/* Title and Budget */}
          <View className="flex-row items-start justify-between mb-3">
            <View className="flex-1">
              <Text className="text-lg font-semibold text-black">{challenge.title}</Text>
              <Text className="text-sm text-black mt-1">
                {challenge.startDate} - {challenge.endDate}
              </Text>
            </View>
            <View className="ml-3">
              <Text className="text-sm text-black">Budget</Text>
              <Text className="text-base font-medium text-black">{challenge.budget}</Text>
            </View>
          </View>

          {/* Divider */}
          <View className="h-px bg-[#CCCCCC] my-3" />

          {/* Location and Followers */}
          <View className="flex-row items-start justify-between mb-3">
            <View className="flex-1">
              <Text className="text-xs text-black mb-1">Location</Text>
              <Text className="text-base font-medium text-black">
                {challenge.location}
              </Text>
            </View>
            <View className="ml-3 items-end">
              <Text className="text-sm text-black mb-1">Followers Required</Text>
              <Text className="text-base font-medium text-black">
                {challenge.followersRequired}
              </Text>
            </View>
          </View>

          {/* Participants and Categories */}
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-xs text-black mb-1">Participants</Text>
              <Text className="text-base font-semibold text-black">
                {challenge.participants} Joined
              </Text>
            </View>
            <View className="flex-row gap-2">
              {challenge.categories.map((category, index) => (
                <View
                  key={index}
                  className="px-3 py-1 rounded-full"
                  style={{ backgroundColor: '#E0F6C6' }}
                >
                  <Text className="text-xs font-medium text-[#006400]">{category}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* About Challenge */}
        <View className="mx-5 mt-5">
          <Text className="text-sm font-semibold text-black mb-3">About Challenge</Text>
          <Text className="text-sm text-[#303030] leading-6">
            {challenge.description}
          </Text>
        </View>

        {/* Attachments */}
        {challenge.attachments && challenge.attachments.length > 0 && (
          <View className="mx-5 mt-5 mb-6">
            {challenge.attachments.map((attachment, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleDownloadAttachment(attachment)}
                activeOpacity={0.7}
                className="w-28 mb-3"
              >
                <View className="bg-white rounded-xl p-4 items-center justify-center border border-gray-200">
                  <MaterialCommunityIcons
                    name="file-pdf-box"
                    size={48}
                    color="#DC2626"
                  />
                </View>
                <Text
                  className="text-sm text-gray-700 mt-2 text-center"
                  numberOfLines={1}
                >
                  {attachment.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Bottom Spacing */}
        <View className="h-24" />
      </ScrollView>

      {/* View Content Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-white px-5 py-4 border-t border-gray-100">
        <TouchableOpacity
          onPress={handleViewContent}
          activeOpacity={0.8}
          className="rounded-2xl py-4 items-center"
          style={{ backgroundColor: '#5EBD3E' }}
        >
          <Text className="text-base font-semibold text-white">View Content</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
