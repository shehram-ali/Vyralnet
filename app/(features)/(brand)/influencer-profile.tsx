import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { mockInfluencers } from '../../../src/data/mockInfluencers';
import { GreenInstaSvg, NoobieBadgeSvg, RisingTalentBadgeSvg, RookieBadgeSvg, TopProBadgeSvg, WizardBadge1Svg, WizardBadge2Svg } from '../../../assets/images';
import { GalleryTab, PackagesTab, ReviewsTab } from '../../../src/components/influencer';
import { ROUTES } from '../../../src/constants';
import { Header } from '../../../src/components/common';

type TabType = 'gallery' | 'packages' | 'reviews';

export default function InfluencerProfileScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const influencerId = params.influencerId as string;

  const [activeTab, setActiveTab] = useState<TabType>('gallery');
  const [isFavorite, setIsFavorite] = useState(false);

  // Find influencer by ID
  const influencer = useMemo(() => {
    return mockInfluencers.find((inf) => inf.id === influencerId);
  }, [influencerId]);

  if (!influencer) {
    return (
      <SafeAreaView className="flex-1 bg-[#F8F8F8]" edges={['top']}>
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500">Influencer not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Calculate progress percentage
  const maxScore = 1000;
  const progressPercentage = Math.min((influencer.stats.xpScore / maxScore) * 100, 100);

  // Choose badge based on tier
  const getBadgeIcon = () => {
    switch (influencer.stats.tier) {
      case 'Top Pro':
        return <TopProBadgeSvg width={ 32} height={ 31} />;
      case 'Rising Talent':
        return <RisingTalentBadgeSvg width={ 32} height={ 32} />;
      case 'Rookie':
        return <RookieBadgeSvg width={ 32} height={ 32} />;
      case 'Noobie':
        return <NoobieBadgeSvg width={ 32} height={ 32} />;
      default:
        return <RookieBadgeSvg width={ 32} height={ 32} />;
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleHireInfluencer = () => {
    router.push({
      pathname: ROUTES.BRAND.JOB_OFFER,
      params: { influencerName: influencer.name },
    });
  };

  const handleSendMessage = () => {
    router.push({
      pathname: ROUTES.BRAND.CHAT,
      params: {
        influencerId: influencer.id,
      },
    });
  };

  const BadgeIcon = influencer.stats.badge === 'purple' ? WizardBadge1Svg : WizardBadge2Svg;

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8F8]" edges={['top']}>
      <Header
        title="Profile Details"
        titleClassName="text-base font-bold text-black"
        backIconSize={24}
        rightComponent={
          <View className="flex-row items-center">
            <TouchableOpacity activeOpacity={0.7} className="mr-3">
              <View
                  style={{
                         backgroundColor: 'white',
                         borderRadius: 20,
                         width: 24,
                         height: 24,
                         alignItems: 'center',
                         justifyContent: 'center',
                         shadowColor: '#000',
                         shadowOffset: { width: 0, height: 2 },
                         shadowOpacity: 0.15,
                         shadowRadius: 4,
                         elevation: 3,
                       }}
              >
                <GreenInstaSvg  width={19} height={19}  />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
                       onPress={handleToggleFavorite}
                       activeOpacity={0.7}
                       style={{
                         backgroundColor: 'white',
                         borderRadius: 20,
                         width: 24,
                         height: 24,
                         alignItems: 'center',
                         justifyContent: 'center',
                         shadowColor: '#000',
                         shadowOffset: { width: 0, height: 2 },
                         shadowOpacity: 0.15,
                         shadowRadius: 4,
                         elevation: 3,
                       }}
                     >
                       <MaterialCommunityIcons
                         name={influencer.isFavorite ? 'heart' : 'heart-outline'}
                         size={16}
                         color={influencer.isFavorite ? '#FF0000' : '#666'}
                       />
                     </TouchableOpacity>
          </View>
        }
      />

      {/* Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <View className=" px-5 pt-6 pb-4">
          {/* Profile Info Row */}
          <View className="flex-row mb-4">
            {/* Left: Large Avatar */}
            <View className="mr-4">
              <Image
                source={influencer.avatar}
                style={{ width: 94, height: 94, borderRadius: 50 }}
                resizeMode="cover"
              />
            </View>

            {/* Right: Name, Username, Location, Stats */}
            <View className="flex-1">
              {/* Top Row: Name + Verified, Stats */}
              <View className="flex-row items-start justify-between mb-1">
                <View className="flex-1">
                  <View className="flex-row items-center mb-1">
                    <Text className="text-base font-semibold text-black mr-2">
                      {influencer.name}
                    </Text>

                  </View>

                  {/* Username */}
                  <Text className="text-xs text-[#6C727F] mb-1">
                    {influencer.username}
                  </Text>

                  {/* Location */}
                  <View className="flex-row items-center">
                    <MaterialCommunityIcons name="map-marker" size={14} color="#666" />
                    <Text className="text-[8px] text-black ml-1">
                      {influencer.location.city}-{influencer.location.country}
                    </Text>
                  </View>
                </View>

                {/* Stats on Right */}
                <View className="flex-row">
                  <View className="mr-4 items-center">
                    <Text className="text-xs text-[#6C727F] mb-1">Followers</Text>
                    <Text className="text-base font-semibold text-black">
                      {influencer.stats.followers}
                    </Text>
                  </View>
                  <View className="items-center">
                    <Text className="text-xs text-[#6C727F] mb-1">E.R</Text>
                    <Text className="text-base font-semibold text-black">
                      {influencer.stats.engagementRate}
                    </Text>
                  </View>
                </View>
              </View>
                 {/* XP Score Section */}
                 
               <View className="flex-row items-center mb-3 justify-between rounded-lg bg-white px-3 py-2">
                      {/* Left Side: Score and Progress */}
                      <View className="flex-1 mr-2">
                        {/* Score */}
                        <View className='flex-row items-center'>
                        <Text className="text-xs font-semibold text-black">
                          {influencer.stats.xpScore}
                        </Text>
                        <Text className="text-[8px] font-semibold text-[#6C727F]">
                          /{maxScore}
                        </Text>
                        </View>
                        <Text className="text-[6px] text-[#1D1C1C] mb-1">XP ON ACCOUNT</Text>

                        {/* Progress Bar */}
                        <View
                          style={{
                            height: 12,
                            backgroundColor: '#E5E5E5',
                            borderRadius: 40,
                            overflow: 'hidden',
                            width: '100%',
                            justifyContent:'center',
                          }}
                        >
                          <LinearGradient
                            colors={['#9B7EDB', '#DDA15E']}
                            start={[0, 0]}
                            end={[1, 0]}
                            style={{
                              height: 8,
                              width: `${progressPercentage}%`,
                              borderRadius: 40,
                            }}
                          />
                        </View>
                      </View>

                      {/* Right Side: Badge and Tier */}
                      <View className="items-end">
                        <Text className="text-[8px] font-semibold text-[#1D1C1C] mb-1">
                          {influencer.stats.tier.toUpperCase()}
                        </Text>
                        {getBadgeIcon()}
                      </View>
                    </View>



          {/* Category Pills */}
          <View className="flex-row flex-wrap ">
            {influencer.categories.slice(0, 3).map((category, index) => (
              <View
                key={index}
                className="px-4 py-2 rounded-full mr-2 mb-2"
                style={{ backgroundColor: '#EDEDED' }}
              >
                <Text className="text-sm font-regular text-[#1D1C1C]">
                  {category}
                </Text>
              </View>
            ))}
          </View>
            </View>
          </View>





          {/* Bio */}
          <Text className="text-sm text-[#303030] leading-5 mb-6">
            {influencer.bio}
          </Text>

          {/* Action Buttons */}
          <View className="flex-row gap-3 mb-4">
            <TouchableOpacity
              onPress={handleHireInfluencer}
              activeOpacity={0.7}
              className="flex-1 border-[1px] border-[#5EBD3E] rounded-xl p-3 items-center"
            >
              <Text className="text-base font-semibold text-[#5EBD3E]">
                Hire Influencer
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSendMessage}
              activeOpacity={0.7}
              className="flex-1 border-[1px] border-[#5EBD3E] rounded-xl p-3 items-center"
            >
              <Text className="text-base font-semibold text-[#5EBD3E]">
                Send Message
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View className="flex-row mt-2 px-5 pt-2">
          <TouchableOpacity
            onPress={() => setActiveTab('gallery')}
            activeOpacity={0.7}
            className="mr-4 pb-3"

          >
            <View
              className="px-3 py-2 rounded-full"
              style={{
                backgroundColor: activeTab === 'gallery' ? '#5EBD3E' : '#F0F0F0',
              }}
            >
              <Text
                className="text-sm font-semibold"
                style={{
                  color: activeTab === 'gallery' ? '#FFF' : '#666',
                }}
              >
                Gallery
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('packages')}
            activeOpacity={0.7}
            className="mr-4 pb-3"

          >
            <View
              className="px-3 py-2 rounded-full"
              style={{
                backgroundColor: activeTab === 'packages' ? '#5EBD3E' : '#F0F0F0',
              }}
            >
              <Text
                className="text-sm font-semibold"
                style={{
                  color: activeTab === 'packages' ? '#FFF' : '#666',
                }}
              >
                Packages
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('reviews')}
            activeOpacity={0.7}
            className="pb-3"

          >
            <View
              className="px-3 py-2 rounded-full"
              style={{
                backgroundColor: activeTab === 'reviews' ? '#5EBD3E' : '#F0F0F0',
              }}
            >
              <Text
                className="text-sm font-semibold"
                style={{
                  color: activeTab === 'reviews' ? '#FFF' : '#666',
                }}
              >
                Reviews
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === 'gallery' && <GalleryTab gallery={influencer.gallery} />}

        {activeTab === 'packages' && <PackagesTab packages={influencer.packages} />}

        {activeTab === 'reviews' && <ReviewsTab reviewStats={influencer.reviewStats} />}
      </ScrollView>
    </SafeAreaView>
  );
}
