import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Gallery2, NoFeedbackSvg } from '../../../assets/images';
import { useAuth } from '../../../src/hooks/useAuth';

export default function ContentDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { user } = useAuth();
  const isBrand = user?.userType === 'brand';

  // Mock content data
  const content = {
    title: params.title || 'Expert Influencer Required for My Cosmetic Products',
    influencerName: params.influencerName || 'Eten Hunt',
    totalViews: '250k',
    likesReaction: '150k',
    instagramUrl: 'https://instagram.com',
    // Set to null or empty array to show "No Feedback Yet"
    feedback: params.hasFeedback === 'true' ? [
      { label: 'Skills', rating: 5 },
      { label: 'Quality of Work', rating: 4 },
      { label: 'Quality of Work', rating: 5 },
      { label: 'Quality of Work', rating: 4 },
      { label: 'Quality of Work', rating: 4 },
    ] : null,
  };

  // Calculate total score
  const calculateTotalScore = () => {
    if (!content.feedback || content.feedback.length === 0) return 0;
    const total = content.feedback.reduce((acc, item) => acc + item.rating, 0);
    return (total / content.feedback.length).toFixed(1);
  };

  const renderStars = (rating: number) => {
    return (
      <View className="flex-row mr-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <MaterialCommunityIcons
            key={star}
            name={'star'}
            size={20}
            color={star <= rating ? '#DEB50F' : '#9A9A9A'}
            style={{ marginRight: 8 }}
          />
        ))}
      </View>
    );
  };

  const handleSendMessage = () => {
    // Navigate to chat screen with influencer ID
    router.push({
      pathname: '/(features)/(brand)/chat',
      params: { influencerId: '1' }, // Mock influencer ID
    });
  };

  const handleViewOnInstagram = () => {
    console.log('Open Instagram:', content.instagramUrl);
    // Open Instagram link
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-4">
        <View className="flex-row items-center flex-1">
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
            <MaterialCommunityIcons name="chevron-left" size={28} color="#000" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-black ml-2">
            {isBrand ? content.influencerName : 'Review Content'}
          </Text>
        </View>
        {isBrand && (
          <TouchableOpacity
            onPress={handleSendMessage}
            activeOpacity={0.8}
            className="px-4 py-2 rounded-lg"
            style={{ backgroundColor: '#5EBD3E' }}
          >
            <Text className="text-sm font-semibold text-white">Send Message</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Title */}
        <View className="px-5 pt-6 pb-4">
          <Text className="text-xl font-semibold text-black leading-7">
            {content.title}
          </Text>
        </View>

        {/* Video Thumbnail */}
        <View className="px-5 pb-4">
          <View
            className="rounded-2xl overflow-hidden items-center justify-center"
            style={{ height: 210, backgroundColor: '#D0D0D0' }}
          >
            {/* Gallery Image */}
            <Image
              source={Gallery2}
              className="w-full h-full"
              resizeMode="cover"
            />
            {/* Play Button Overlay */}
            <View
              className="absolute inset-0 items-center justify-center"
              style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
            >
              <View
                className="items-center justify-center"
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  backgroundColor: 'rgba(255,255,255,0.9)',
                }}
              >
                <MaterialCommunityIcons name="play" size={40} color="#5EBD3E" />
              </View>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View className="flex-row px-5 pb-4 gap-3">
          {/* Total Views */}
          <View
            className="flex-1 rounded-2xl p-4 border border-gray-200"
            style={{ backgroundColor: '#FAFAFA' }}
          >
            <Text className="text-sm font-semibold text-[#5EBD3E] mb-1">Total Views</Text>
            <Text className="text-2xl font-semibold text-black">{content.totalViews}</Text>
          </View>

          {/* Likes/Reaction */}
          <View
            className="flex-1 rounded-2xl p-4 border border-gray-200"
            style={{ backgroundColor: '#FAFAFA' }}
          >
            <Text className="text-sm font-semibold text-[#5EBD3E] mb-1">Likes/Reaction</Text>
            <Text className="text-2xl font-bold text-black">{content.likesReaction}</Text>
          </View>
        </View>

        {/* View on Instagram Button */}
        <View className="px-5 pb-6">
          <TouchableOpacity
            onPress={handleViewOnInstagram}
            activeOpacity={0.8}
            className="rounded-2xl py-4 items-center border-2"
            style={{ borderColor: '#5EBD3E', backgroundColor: 'transparent' }}
          >
            <Text className="text-base font-semibold" style={{ color: '#5EBD3E' }}>
              View on Instagram
            </Text>
          </TouchableOpacity>
        </View>

        {/* Feedback Section */}
        <View className="px-5 pb-8">
          <Text className="text-lg font-semibold text-black mb-4">
            Content Feedback
          </Text>

          {content.feedback && content.feedback.length > 0 ? (
            <>
              {content.feedback.map((item, index) => (
                <View key={index} className="flex-row items-center mb-3">
                  {renderStars(item.rating)}
                  <Text className="text-sm text-black">{item.label}</Text>
                </View>
              ))}

              {/* Total Score */}
              <View className="mt-4">
                <Text className="text-base font-semibold text-black">
                  Total Score: {calculateTotalScore()}
                </Text>
              </View>
            </>
          ) : (
            <View className="items-center justify-center py-8">
              <NoFeedbackSvg width={80} height={80} />
              <Text className="text-sm text-[#6C727F] mt-4">
                No Feedback Yet
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
