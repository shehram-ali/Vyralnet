import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SuccessBottomSheet } from '../../../src/components/common';

export default function SubmitContentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [contentTitle, setContentTitle] = useState('');
  const [contentUrl, setContentUrl] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showSuccessSheet, setShowSuccessSheet] = useState(false);

  const handleConfirm = () => {
    if (!contentTitle || !contentUrl || !agreedToTerms) {
      // Show error - all fields required
      return;
    }

    // Submit content logic here
    console.log('Content submitted:', { contentTitle, contentUrl });

    // Show success bottom sheet
    setShowSuccessSheet(true);
  };

  const handleViewFeedback = () => {
    setShowSuccessSheet(false);
    // Navigate to content details screen with no feedback
    router.push({
      pathname: '/(features)/(brand)/content-details',
      params: {
        id: params.id,
        hasFeedback: 'false',
      },
    } as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8FB]" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center pt-10 px-5 py-4 bg-[#F8F8FB]">
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-base font-semibold text-black ml-2">
          Submit Content
        </Text>
      </View>

      <View className="flex-1 px-5">
        {/* Subtitle */}
        <Text className="text-sm text-[#6C727F] mt-4 mb-6">
          Enter these details to upload your content.
        </Text>

        {/* Content Title */}
        <View
          className="bg-white rounded-2xl px-4 py-2 mb-5"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 1,
          }}
        >
          <Text className="text-xs font-medium text-black">
            Content Title
          </Text>
          <TextInput
            value={contentTitle}
            onChangeText={setContentTitle}
            placeholder="Instagram Influencer"
            placeholderTextColor="#6C727F"
            style={{ color: '#000000' }}
            className="text-sm"
          />
        </View>

        {/* Content URL */}
        <View
          className="bg-white rounded-2xl px-4 py-2 mb-6"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 1,
          }}
        >
          <Text className="text-xs font-medium text-black ">
            Content URL
          </Text>
          <TextInput
            value={contentUrl}
            onChangeText={setContentUrl}
            placeholder="e.g. instagram.com/video"
            placeholderTextColor="#6C727F"
            style={{ color: '#000000' }}
            keyboardType="url"
            autoCapitalize="none"
            className="text-sm"
          />
        </View>

        <View className="flex-1" />

        {/* Terms and Conditions Checkbox */}
        <TouchableOpacity
          onPress={() => setAgreedToTerms(!agreedToTerms)}
          activeOpacity={0.7}
          className="flex-row items-start mb-6"
        >
          <View
            className="w-5 h-5 rounded items-center justify-center mr-3 mt-0.5"
            style={{
              backgroundColor: agreedToTerms ? '#5EBD3E' : 'white',
              borderWidth: agreedToTerms ? 0 : 1,
              borderColor: '#D1D5DB',
            }}
          >
            {agreedToTerms && (
              <MaterialCommunityIcons name="check" size={16} color="white" />
            )}
          </View>
          <Text className="flex-1 text-xs text-[#6C727F] leading-5">
            by ticking, your are confirming that you read, understood and agree to Vyralnet{' '}
            <Text className="text-[#5EBD3E]">Challenges terms & conditions.</Text>
          </Text>
        </TouchableOpacity>
</View>
        {/* Confirm Button */}
        <View className="py-6 px-3 bg-white border-t border-[#EDEDED]">
          <TouchableOpacity
            onPress={handleConfirm}
            activeOpacity={0.8}
            disabled={!contentTitle || !contentUrl || !agreedToTerms}
            className="rounded-3xl py-4 items-center"
            style={{
              backgroundColor:
                contentTitle && contentUrl && agreedToTerms ? '#5EBD3E' : '#A0A0A0',
            }}
          >
            <Text className="text-base font-semibold text-white">Confirm</Text>
          </TouchableOpacity>
        </View>

      {/* Success Bottom Sheet */}
      <SuccessBottomSheet
        visible={showSuccessSheet}
        title="Congratulations!"
        message="Your content is submitted! The client will review it within 1-3 days, and Once client give you feedback your amount will be released. Thank You"
        buttonText="View Feedback"
        onButtonPress={handleViewFeedback}
        onClose={() => setShowSuccessSheet(false)}
      />
    </SafeAreaView>
  );
}
