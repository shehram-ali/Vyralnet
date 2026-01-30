import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
};

export default function JoinedChallengeDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Check if content has been submitted
  const hasSubmittedContent = params.submitted === 'true';

  // In real app, fetch challenge details using params.id
  const challenge = mockChallengeDetails;

  const handleSubmitContent = () => {
    // Navigate to submit content screen
    console.log('Submit content for challenge:', challenge.id);
    router.push(`/(features)/(influencer)/submit-content?challengeId=${challenge.id}` as any);
  };

  const handleViewContent = () => {
    // Navigate to view content screen
    console.log('View content for challenge:', challenge.id);
    // In real app, navigate to content view/list screen
    // For now, just log
  };

  const handleLeaderboard = () => {
    // Navigate to leaderboard screen
    router.push(`/(features)/leaderboard?challengeId=${challenge.id}` as any);
  };

  const handleDownloadAttachment = (attachment: any) => {
    // Handle file download
    console.log('Download:', attachment.name);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8FB]" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-4" style={{ paddingTop: Platform.OS === 'ios' ? 0 : 20 }}>
        <View className="flex-row items-center flex-1">
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} className="mr-3">
            <MaterialCommunityIcons name="chevron-left" size={28} color="#000" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-black">Challenge Detail</Text>
        </View>

        {/* Leaderboard Button */}
        <TouchableOpacity
          onPress={handleLeaderboard}
          activeOpacity={0.7}
          className="px-4 py-2 rounded-xl border-2"
          style={{ borderColor: '#5EBD3E' }}
        >
          <Text className="text-sm font-medium" style={{ color: '#5EBD3E' }}>
            Leaderboard
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Challenge Info Card */}
        <View className="mx-5 mt-4 bg-white rounded-2xl p-5 shadow-sm">
          {/* Title and Budget */}
          <View className="flex-row items-start justify-between mb-2">
            <View className="flex-1">
              <Text className="text-xl font-semibold text-black">
                {challenge.title}
              </Text>
            </View>
            <View className="ml-3 items-end">
              <Text className="text-sm text-gray-600 mb-1">
                Budget
              </Text>
              <Text className="text-xl font-semibold text-black">
                {challenge.budget}
              </Text>
            </View>
          </View>

          {/* Date Range */}
          <Text className="text-sm text-gray-600 mb-4">
            {challenge.startDate} - {challenge.endDate}
          </Text>

          {/* Divider */}
          <View className="h-px bg-gray-200 mb-4" />

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
              <Text className="text-xs text-black mb-1">Participants Joined</Text>
              <Text className="text-base font-semibold text-black">
                {challenge.participants}
              </Text>
            </View>
            <View className="flex-row gap-2">
              {challenge.categories.map((category, index) => (
                <View
                  key={index}
                  className="px-3 py-1 rounded-full"
                  style={{ backgroundColor: '#E0F6C6' }}
                >
                  <Text className="text-xs font-medium text-black">{category}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* About Challenge */}
        <View className="mx-5 mt-5">
          <Text className="text-lg font-bold text-black mb-3">About Challenge</Text>
          <Text className="text-sm text-gray-700 leading-6">
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

      {/* Action Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-white px-5 py-4 border-t border-gray-100">
        <TouchableOpacity
          onPress={hasSubmittedContent ? handleViewContent : handleSubmitContent}
          activeOpacity={0.8}
          className="rounded-2xl py-4 items-center"
          style={{ backgroundColor: '#5EBD3E' }}
        >
          <Text className="text-lg font-semibold text-white">
            {hasSubmittedContent ? 'View Content' : 'Submit Content'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
