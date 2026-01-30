import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../src/hooks/useAuth';
import { EditBlack, GreenInstaSvg, WizardBadge1Svg } from '../../assets/images';
import { ROUTES } from '../../src/constants';

export default function PublicProfileScreen() {
  const router = useRouter();
  const { user } = useAuth();

  // Mock data for influencer profile - can be replaced with actual user data
  const influencerData = {
    avatar: user?.avatar || 'https://i.pravatar.cc/150?img=8',
    name: user?.name || 'James Doe',
    username: '@james_doe11',
    location: user?.location || 'San Francisco, CA',
    stats: {
      followers: '47.2K',
      engagementRate: '2.5%',
      xpScore: 460,
      maxXP: 500,
      tier: 'TOP PRO',
    },
    categories: ['Lifestyle', 'Music', 'Comedy'],
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan.',
    packages: [
      {
        id: '1',
        title: 'Instagram Story + Swipe Up',
        price: 250,
        deliveryDays: 15,
        revisions: 2,
        features: [
          "I'll share your content",
          'You ship me your Product',
          'Brand Mention',
        ],
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.',
      },
      {
        id: '2',
        title: 'Instagram Story + Swipe Up',
        price: 250,
        deliveryDays: 15,
        revisions: 2,
        features: [
          "I'll share your content",
          'Brand Mention',
        ],
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.',
      },
    ],
  };

  const progressPercentage = Math.min(
    (influencerData.stats.xpScore / influencerData.stats.maxXP) * 100,
    100
  );

  const renderPackageCard = (packageItem: typeof influencerData.packages[0]) => (
    <View
      key={packageItem.id}
      className="mb-4 rounded-2xl overflow-hidden"
      style={{
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      {/* Package Header */}
      <View
        className="flex-row items-center justify-between px-4 py-3"
        style={{ backgroundColor: '#EEFBE9' }}
      >
        <View className="flex-row items-center flex-1">
          <View
            className="mr-3 items-center justify-center"
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: '#006400',
            }}
          >
            <Text className="text-white  text-sm">01</Text>
          </View>
          <Text className="text-base font-semibold text-black flex-1">
            {packageItem.title}
          </Text>
        </View>
        <Text className="text-lg font-bold text-black">
          ${packageItem.price}
        </Text>
      </View>

      {/* Package Content */}
      <View className="px-4 py-3">
        {/* Delivery & Revisions */}
        <View className="flex-row items-center mb-4">
          <View className="flex-row items-center mr-4">
            <MaterialCommunityIcons
              name="calendar-blank-outline"
              size={16}
              color="#666"
            />
            <Text className="text-xs text-gray-600 ml-1">
              {packageItem.deliveryDays} Days Delivery
            </Text>
          </View>
          <View className="flex-row items-center">
            <MaterialCommunityIcons name="refresh" size={16} color="#666" />
            <Text className="text-xs text-gray-600 ml-1">
              {packageItem.revisions} Revisions
            </Text>
          </View>
        </View>

        {/* Features */}
        <View className="mb-4">
          <Text className="text-base font-semibold text-black mb-2">
            Features
          </Text>
          <View className="flex-row flex-wrap">
            {packageItem.features.map((feature, idx) => (
              <View
                key={idx}
                className="flex-row items-center mb-2"
                style={{ width: '50%' }}
              >
                <MaterialCommunityIcons
                  name="check"
                  size={16}
                  color="#5EBD3E"
                />
                <Text className="text-sm text-gray-700 ml-2 flex-1">
                  {feature}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Description */}
        <Text className="text-sm text-gray-600 leading-5">
          {packageItem.description}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8FB]" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-4 bg-[#F8F8FB]" style={{ paddingTop: Platform.OS === 'ios' ? 0 : 40 }}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <MaterialCommunityIcons name="chevron-left" size={28} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-black flex-1 ml-3">
          Public Profile
        </Text>
        <View className="flex-row items-center">
          <TouchableOpacity activeOpacity={0.7} className="mr-3">
            <View
              className="items-center justify-center"
              style={{
                backgroundColor: '#ffff',
                borderRadius: 20,
                width: 36,
                height: 36,
              }}
            >
              <GreenInstaSvg />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push(ROUTES.FEATURES.EDIT_PROFILE)}
          >
            <View
              className="items-center justify-center"
              style={{
                backgroundColor: '#ffff',
                borderRadius: 20,
                width: 36,
                height: 36,
              }}
            >
              <EditBlack  />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <View className=" px-5 pt-6 pb-4 mb-4">
          {/* Profile Info Row */}
          <View className="flex-row mb-4">
            {/* Left: Avatar */}
            <View className="mr-4">
              <Image
                source={{ uri: influencerData.avatar }}
                style={{ width: 90, height: 90, borderRadius: 45 }}
                resizeMode="cover"
              />
            </View>

            {/* Right: Name, Username, Location, Stats */}
            <View className="flex-1">
              <View className="flex-row items-start justify-between mb-2">
                <View className="flex-1">
                  <Text className="text-base font-semibold text-black mb-1">
                    {influencerData.name}
                  </Text>
                  <Text className="text-xs text-gray-500 mb-1">
                    {influencerData.username}
                  </Text>
                  <View className="flex-row items-center">
                    <MaterialCommunityIcons
                      name="map-marker"
                      size={14}
                      color="#666"
                    />
                    <Text className="text-xs text-gray-600 ml-1">
                      {influencerData.location}
                    </Text>
                  </View>
                </View>

                {/* Stats on Right */}
                <View className="flex-row">
                  <View className="mr-4 items-center">
                    <Text className="text-xs text-gray-500 mb-1">Followers</Text>
                    <Text className="text-base font-bold text-black">
                      {influencerData.stats.followers}
                    </Text>
                  </View>
                  <View className="items-center">
                    <Text className="text-xs text-gray-500 mb-1">E.R</Text>
                    <Text className="text-base font-bold text-black">
                      {influencerData.stats.engagementRate}
                    </Text>
                  </View>
                </View>
              </View>

              {/* XP Score Section */}
              <View className="flex-row bg-white p-2 mb-3 rounded-xl items-center justify-between">
                <View className="flex-1 mr-3">
                  <Text className="text-sm font-bold text-black mb-1">
                    {influencerData.stats.xpScore}/{influencerData.stats.maxXP}
                  </Text>
                  <View
                    style={{
                      height: 6,
                      backgroundColor: '#E5E5E5',
                      borderRadius: 3,
                      overflow: 'hidden',
                    }}
                  >
                    <LinearGradient
                      colors={['#8B5CF6', '#EAB308']}
                      start={[0, 0]}
                      end={[1, 0]}
                      style={{
                        width: `${progressPercentage}%`,
                        height: '100%',
                      }}
                    />
                  </View>
                </View>
                <View className="items-center">
                  <Text className="text-xs font-semibold text-purple-600 mb-1">
                    {influencerData.stats.tier}
                  </Text>
                  <WizardBadge1Svg width={32} height={32} />
                </View>
              </View>
               <View className="flex-row flex-wrap">
            {influencerData.categories.map((category, index) => (
              <View
                key={index}
                className="px-4 py-2 rounded-full mr-2 mb-2"
                style={{ backgroundColor: '#F0F0F0' }}
              >
                <Text className="text-sm font-medium text-black">
                  {category}
                </Text>
              </View>
            ))}
          </View>
            </View>
          </View>

          {/* Category Pills */}
         

          {/* Bio */}
          <Text className="text-sm text-gray-600 leading-5">
            {influencerData.bio}
          </Text>
        </View>

        {/* Your Packages Section */}
        <View className="px-5">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold text-black">Your Packages</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push(ROUTES.FEATURES.EDIT_PACKAGES)}
              className="flex-row items-center"
            >
              <MaterialCommunityIcons name="pencil" size={16} color="#5EBD3E" />
              <Text className="text-sm font-semibold text-[#5EBD3E] ml-1">
                Edit
              </Text>
            </TouchableOpacity>
          </View>

          {/* Package Cards */}
          {influencerData.packages.map((packageItem) =>
            renderPackageCard(packageItem)
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
