import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function JobDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // In a real app, you'd fetch job details based on jobId
  const jobDetails = {
    title: params.jobTitle || 'Instagram Influencer',
    startDate: 'Nov 08, 2025',
    endDate: 'Nov 12, 2025',
    budget: params.budget || '100',
    description: params.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget velit, sit amet feugiat lectus.',
    attachments: [
      { name: 'Doc.pdf', type: 'pdf' }
    ],
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8F8]" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-5 py-4 pt-10 bg-white">
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <MaterialCommunityIcons name="chevron-left" size={28} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-black ml-4">Job Details</Text>
      </View>

      {/* Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Job Title and Budget */}
        <View className="flex-row items-start justify-between mb-2">
          <View className="flex-1 mr-4">
            <Text className="text-2xl font-bold text-black mb-2">
              {jobDetails.title}
            </Text>
            <Text className="text-base text-gray-600">
              {jobDetails.startDate} - {jobDetails.endDate}
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-sm text-gray-600 mb-1">Budget</Text>
            <Text className="text-2xl font-bold text-black">
              ${jobDetails.budget}
            </Text>
          </View>
        </View>

        {/* About Job Section */}
        <View className="mt-6">
          <Text className="text-xl font-bold text-black mb-4">About Job</Text>
          <Text className="text-base text-gray-700 leading-6">
            {jobDetails.description}
          </Text>
        </View>

        {/* Attachments Section */}
        {jobDetails.attachments && jobDetails.attachments.length > 0 && (
          <View className="mt-6">
            {jobDetails.attachments.map((attachment, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                className="bg-white rounded-2xl p-4 flex-row items-center"
                style={{ width: 140 }}
              >
                <View className="items-center flex-1">
                  {/* PDF Icon */}
                  <View
                    className="items-center justify-center mb-2"
                    style={{
                      width: 60,
                      height: 60,
                      backgroundColor: '#FFF5F5',
                      borderRadius: 8,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="file-pdf-box"
                      size={40}
                      color="#E53E3E"
                    />
                  </View>
                  <Text className="text-sm font-medium text-black text-center">
                    {attachment.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
