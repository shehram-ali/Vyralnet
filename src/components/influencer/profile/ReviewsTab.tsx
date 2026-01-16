import React from 'react';
import { View, Text } from 'react-native';

import { ReviewStats } from '../../../data/mockInfluencers';
import { Goldstar } from 'assets/images';

interface ReviewsTabProps {
  reviewStats: ReviewStats;
}

export default function ReviewsTab({ reviewStats }: ReviewsTabProps) {
  return (
    <View className="bg-white px-5 pt-4 pb-6">
      {/* Reviews Header */}
      <Text className="text-lg font-bold text-black mb-2">Reviews & History</Text>
      <Text className="text-sm text-gray-500 mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>

      {/* Overall Stats Section */}
      <View className="rounded-2xl overflow-hidden mb-4">
        {/* Stats Header */}
        <View
          className="px-4 py-3"
          style={{ backgroundColor: '#4A7C30' }}
        >
          <Text className="text-lg font-bold text-white">Overall Stats</Text>
        </View>

        {/* Stats List */}
        <View className="bg-white border border-gray-200">
          {/* Completed Jobs */}
          <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-200">
            <Text className="text-base text-black">Completed Jobs</Text>
            <Text className="text-base font-semibold text-black">
              {reviewStats.completedJobs}
            </Text>
          </View>

          {/* In Progress */}
          <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-200">
            <Text className="text-base text-black">In Progress</Text>
            <Text className="text-base font-semibold text-black">
              {reviewStats.inProgress}
            </Text>
          </View>

          {/* Challenge Wins */}
          <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-200">
            <Text className="text-base text-black">Challenge Wins</Text>
            <Text className="text-base font-semibold text-black">
              {reviewStats.challengeWins}
            </Text>
          </View>

          {/* Rating */}
          <View className="flex-row items-center justify-between px-4 py-4">
            <Text className="text-base text-black">Rating</Text>
            <View className="flex-row items-center">
              <Goldstar  />
              <Text className="text-base font-semibold text-black ml-2">
                {reviewStats.rating.toFixed(1)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
