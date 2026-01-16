import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ViewJobOfferScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Mock job offer data
  const jobOffer = {
    title: 'Instagram Influencer',
    startDate: 'Nov 08, 2025',
    endDate: 'Nov 12, 2025',
    budget: '$100',
    aboutJob: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget velit, sit amet feugiat lectus.`,
    attachment: {
      name: 'Doc.pdf',
      type: 'pdf',
    },
  };

  const handleOpenAttachment = () => {
    console.log('Open attachment:', jobOffer.attachment.name);
    // Open PDF viewer or download
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header */}
      <View className="px-5 py-4 border-b border-gray-200">
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          className="flex-row items-center"
        >
          <MaterialCommunityIcons name="chevron-left" size={28} color="#000" />
          <Text className="text-lg font-medium text-black ml-2">Job Offer</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* Job Title and Budget */}
        <View className="flex-row items-start justify-between pt-6 pb-2">
          <View className="flex-1">
            <Text className="text-xl font-bold text-black mb-1">
              {jobOffer.title}
            </Text>
            <Text className="text-sm text-[#6C727F]">
              {jobOffer.startDate} - {jobOffer.endDate}
            </Text>
          </View>
          <View className="ml-4">
            <Text className="text-xs text-[#6C727F] mb-1">Budget</Text>
            <Text className="text-xl font-bold text-black">{jobOffer.budget}</Text>
          </View>
        </View>

        {/* About Job Section */}
        <View className="pt-6">
          <Text className="text-base font-bold text-black mb-4">About Job</Text>
          <Text className="text-sm text-black leading-6" style={{ lineHeight: 22 }}>
            {jobOffer.aboutJob}
          </Text>
        </View>

        {/* Attachment */}
        <TouchableOpacity
          onPress={handleOpenAttachment}
          activeOpacity={0.7}
          className="mt-6 mb-8"
        >
          <View
            className="w-28 h-32 rounded-lg items-center justify-center"
            style={{ backgroundColor: '#F5F5F5' }}
          >
            {/* PDF Icon */}
            <View className="mb-2">
              <MaterialCommunityIcons name="file-pdf-box" size={48} color="#E53935" />
            </View>
            <Text className="text-xs text-black">{jobOffer.attachment.name}</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
