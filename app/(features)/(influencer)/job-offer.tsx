import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AlertNotification } from '../../../src/components/common';

// Job offer states
type JobOfferStatus = 'new' | 'pending' | 'started' | 'declined';

export default function JobOfferScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Get status from params or default to 'new'
  const initialStatus = (params.status as JobOfferStatus) || 'new';
  const [jobStatus, setJobStatus] = useState<JobOfferStatus>(initialStatus);
  const [showAlert, setShowAlert] = useState(true);

  // Mock job offer data
  const jobOffer = {
    title: params.title || 'Instagram Influencer',
    startDate: 'Nov 08, 2025',
    endDate: 'Nov 12, 2025',
    budget: params.budget || '$100',
    aboutJob: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget velit, sit amet feugiat lectus.`,
    attachment: {
      name: 'Doc.pdf',
      type: 'pdf',
    },
  };

  const handleAcceptOffer = () => {
    console.log('Offer accepted');
    setJobStatus('pending');
  };

  const handleDecline = () => {
    console.log('Offer declined');
    setJobStatus('declined');
  };

  const handleSubmitContent = () => {
    console.log('Submit content');
    // Navigate to content submission screen or show modal
  };

  const handleOpenAttachment = () => {
    console.log('Open attachment:', jobOffer.attachment.name);
    // Open PDF viewer or download
  };

  const renderBanner = () => {
    if (jobStatus === 'pending') {
      return (
        <AlertNotification
          type="warning"
          message='Please start the job once you get the payment "Confirmation Notification".'
          onClose={() => setShowAlert(false)}
          visible={showAlert}
        />
      );
    }

    if (jobStatus === 'started') {
      return (
        <AlertNotification
          type="success"
          message="Your contract has been started. Please submit the content."
          onClose={() => setShowAlert(false)}
          visible={showAlert}
        />
      );
    }

    return null;
  };

  const renderActionButtons = () => {
    if (jobStatus === 'new') {
      return (
        <View className="px-5 pb-8">
          {/* Note */}
          <View className="mb-6">
            <Text className="text-sm text-[#6C727F] leading-5">
              Note: Please start the job once you get the payment{' '}
              <Text className="font-semibold">"confirmation notification"</Text>.
            </Text>
          </View>
<View className='bg-white'>
          {/* Accept Offer Button */}
          <TouchableOpacity
            onPress={handleAcceptOffer}
            activeOpacity={0.8}
            className="rounded-2xl py-4 items-center mb-4"
            style={{ backgroundColor: '#5EBD3E' }}
          >
            <Text className="text-base font-semibold text-white">Accept Offer</Text>
          </TouchableOpacity>

          {/* Decline Button */}
          <TouchableOpacity onPress={handleDecline} activeOpacity={0.7} className="items-center">
            <Text className="text-base font-semibold" style={{ color: '#5EBD3E' }}>
              Decline
            </Text>
          </TouchableOpacity>
        </View>
        </View>
      );
    }

    if (jobStatus === 'pending') {
      return (
        <View className="px-5 pb-8">
          <TouchableOpacity
            disabled
            activeOpacity={0.8}
            className="rounded-lg py-4 items-center"
            style={{ backgroundColor: '#CCCCCC' }}
          >
            <Text className="text-base font-semibold text-[#999797">Submit Content</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (jobStatus === 'started') {
      return (
        <View className="px-5 pb-8">
          <TouchableOpacity
            onPress={handleSubmitContent}
            activeOpacity={0.8}
            className="rounded-2xl py-4 items-center"
            style={{ backgroundColor: '#5EBD3E' }}
          >
            <Text className="text-base font-semibold text-white">Submit Content</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (jobStatus === 'declined') {
      return (
        <View className="px-5 pb-8 items-center">
          <Text className="text-sm font-regular" style={{ color: '#FF383C' }}>
            This Job has been Declined
          </Text>
        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header */}
      <View className="px-5 py-4 border-b border-[#E5E5E5]">
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          className="flex-row items-center"
        >
          <MaterialCommunityIcons name="chevron-left" size={28} color="#000" />
          <Text className="text-lg font-semibold text-black ml-2">Job Offer</Text>
        </TouchableOpacity>
      </View>

      {/* Banner */}
      {renderBanner()}

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Job Title and Budget */}
        <View className="flex-row items-start justify-between px-5 pt-6 pb-2">
          <View className="flex-1">
            <Text className="text-lg font-semibold text-black mb-1">{jobOffer.title}</Text>
            <Text className="text-xs text-black">
              {jobOffer.startDate} - {jobOffer.endDate}
            </Text>
          </View>
          <View className="ml-4">
            <Text className="text-sm text-black mb-1 text-right">Budget</Text>
            <Text className="text-base font-bold text-black">{jobOffer.budget}</Text>
          </View>
        </View>

        {/* About Job Section */}
        <View className="px-5 pt-6">
          <Text className="text-sm font-semibold text-black mb-4">About Job</Text>
          <Text className="text-sm text-[#303030] leading-6" style={{ lineHeight: 22 }}>
            {jobOffer.aboutJob}
          </Text>
        </View>

        {/* Attachment */}
        <View className="px-5 mt-6 mb-6">
          <TouchableOpacity onPress={handleOpenAttachment} activeOpacity={0.7}>
            <View
              className="w-28 h-24 rounded-lg items-center justify-center"
              style={{ backgroundColor: '#F5F5F5' }}
            >
              {/* PDF Icon */}
              <View className="mb-2">
                <MaterialCommunityIcons name="file-pdf-box" size={48} color="#E53935" />
              </View>
              <Text className="text-xs text-black">{jobOffer.attachment.name}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      {renderActionButtons()}
    </SafeAreaView>
  );
}
