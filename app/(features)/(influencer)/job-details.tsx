import React from 'react';
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

interface JobDetails {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  budget: string;
  description: string;
  attachments?: Array<{
    name: string;
    type: 'pdf' | 'doc' | 'image';
    url: string;
  }>;
}

// Mock data - replace with actual API call
const mockJobDetails: JobDetails = {
  id: '3',
  title: 'Instagram Influencer',
  company: 'Apple Inc.',
  startDate: 'Nov 08, 2025',
  endDate: 'Nov 12, 2025',
  budget: '$100',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget velit, sit amet feugiat lectus.',
  attachments: [
    {
      name: 'Doc.pdf',
      type: 'pdf',
      url: '',
    },
  ],
};

export default function JobDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // In real app, fetch job details using params.id
  const job = mockJobDetails;

  const handleSubmitContent = () => {
    router.push({
      pathname: '/(features)/(influencer)/submit-content',
      params: { id: job.id },
    } as any);
  };

  const handleDownloadAttachment = (attachment: any) => {
    // Handle file download
    console.log('Download:', attachment.name);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8FB]" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center gap-4 px-5 py-4" style={{ paddingTop: Platform.OS === 'ios' ? 0 : 40 }}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-base font-semibold text-black">Job Offer</Text>
      
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Job Info Card */}
        <View className="mx-5 mt-4 rounded-2xl ">
          {/* Title and Budget */}
          <View className="flex-row items-start justify-between mb-3">
            <View className="flex-1">
              <Text className="text-lg font-semibold text-black">{job.title}</Text>
              <Text className="text-xs text-black mt-1">
                {job.startDate} - {job.endDate}
              </Text>
            </View>
            <View className="ml-3 items-end">
              <Text className="text-sm text-black mb-1">Budget</Text>
              <Text className="text-base font-medium text-black">{job.budget}</Text>
            </View>
          </View>
        </View>

        {/* About Job */}
        <View className="mx-5 mt-5">
          <Text className="text-sm font-semibold text-black mb-3">About Job</Text>
          <Text className="text-sm text-[#303030] leading-6">{job.description}</Text>
        </View>

        {/* Attachments */}
        {job.attachments && job.attachments.length > 0 && (
          <View className="mx-5 mt-5 mb-6">
            {job.attachments.map((attachment, index) => (
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

      {/* Submit Content Button */}
      <View className="absolute bottom-0 left-0 right-0  px-5 py-4  ">
        <TouchableOpacity
          onPress={handleSubmitContent}
          activeOpacity={0.8}
          className="rounded-2xl py-4 items-center"
          style={{ backgroundColor: '#5EBD3E' }}
        >
          <Text className="text-base font-semibold text-white">Submit Content</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
