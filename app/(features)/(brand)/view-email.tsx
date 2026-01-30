import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SendEmailBottomSheet from '../../../src/components/network/SendEmailBottomSheet';

export default function ViewEmailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [showReplySheet, setShowReplySheet] = useState(false);

  // Extract params and ensure they're strings
  const senderName = Array.isArray(params.senderName)
    ? params.senderName[0]
    : params.senderName || 'Eten Hunt';
  const senderEmail = Array.isArray(params.senderEmail)
    ? params.senderEmail[0]
    : params.senderEmail || 'Etenhunt@email.com';

  // Mock email data - in real app, this would come from params or API
  const emailData = {
    senderName,
    senderEmail,
    recipientEmail: 'youremail@gmail.com',
    subject: `Appreciation Letter - ${senderName}`,
    date: 'Today',
    body: `Hi John,

I hope you're doing great! My name is Sarah Mitchell, and I'm reaching out on behalf of GlowUp Skincare, a brand dedicated to clean, effective, and inclusive skincare solutions. We absolutely love your content, especially how you connect with followers around self-care and skincare routines!

We'd be thrilled to collaborate with you to showcase some of our top products and introduce them to your audience. If you're open to it, we'd love to discuss possible partnership ideas, creative directions, and compensation options.

Please let me know if you'd be interested in a quick chat to explore this opportunity. Feel free to reach out if you have any questions or suggestions as well.

Looking forward to hearing from you!

Warm regards,
Sarah Mitchell

Influencer Relations Coordinator
GlowUp Skincare
sarah.m@glowup.com`,
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header */}
      <View className="px-5 py-4 " style={{ paddingTop: Platform.OS === 'ios' ? 0 : 40 }}>
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          className="flex-row items-center"
        >
          <MaterialCommunityIcons name="chevron-left" size={30} color="#000" />
          <Text className="text-base font-medium text-black ml-2">Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 pb-20" showsVerticalScrollIndicator={false} >
        {/* Email Header */}
        <View className="px-5 py-4 border-b border-gray-200">
          <View className="flex-row items-start">
            {/* Avatar with Initials */}
            <View
              className="w-14 h-14 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: '#D9D9D9' }}
            >
              <Text className="text-xl font-medium text-[#6C727F]">
                {getInitials(emailData.senderName)}
              </Text>
            </View>

            {/* Sender Info */}
            <View className="flex-1">
              <View className="flex-row items-center justify-between mb-1">
                <Text className="text-base font-medium text-[#000929]">
                  {emailData.senderName}
                </Text>
                <Text className="text-xs text-[#999797]">{emailData.date}</Text>
              </View>
              <Text className="text-sm text-[#6C727F]">
                To: {emailData.recipientEmail}
              </Text>
            </View>
          </View>
        </View>

        {/* Email Subject */}
        <View className="px-5 pt-6 pb-4">
          <Text className="text-lg font-medium text-black">{emailData.subject}</Text>
        </View>

        {/* Email Body */}
        <View className="px-5 pb-6">
          <Text className="text-sm text-regular leading-6" style={{ lineHeight: 24 }}>
            {emailData.body}
          </Text>
        </View>
         {/* Reply Button */}
         <View className="px-4 py-3">
        <TouchableOpacity
          onPress={() => setShowReplySheet(true)}
          activeOpacity={0.8}
          className="w-32 mb-20  rounded-xl px-3 py-2 justify-center items-center"
          style={{ backgroundColor: '#5A5A5A' }}
        >
          <Text className="text-base  text-white">Reply</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>

     
     

      {/* Send Email Bottom Sheet */}
      <SendEmailBottomSheet
        visible={showReplySheet}
        onClose={() => setShowReplySheet(false)}
        recipientEmail={emailData.senderEmail}
        recipientName={emailData.senderName}
        isReply={true}
        originalSubject={emailData.subject}
        originalBody={emailData.body}
        originalDate={emailData.date}
        senderEmail={emailData.recipientEmail}
      />
    </SafeAreaView>
  );
}
