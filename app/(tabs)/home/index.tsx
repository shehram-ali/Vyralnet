import React from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../../src/hooks/useAuth';
import { FeatureCard, HomeHeader } from '../../../src/components';
import { ROUTES } from '../../../src/constants';
import {
  ChallengeSvg,
  AddFriendSvg,
  FindInfluencerSvg,
  UserSvg,
  BusinessContractSvg,
  CreateFileSvg,
  ChecklistSvg,
  MoneyBagSvg,
  BriefCase,
} from '../../../assets/images';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const isBrand = user.userType === 'brand';

  // Brand features
  const brandFeatures = [
    {
      title: 'Challenges',
      icon: <ChallengeSvg width={56} height={56} />,
      gradientColors: ['rgba(250, 206, 156, 0.28)', 'rgba(227, 127, 14, 0.28)'] as [string, string],
      route: ROUTES.FEATURES.CHALLENGES,
    },
    {
      title: 'Search Talents',
      icon: <AddFriendSvg width={56} height={56} />,
      gradientColors: ['rgba(157, 200, 243, 0.28)', 'rgba(99, 166, 241, 0.28)'] as [string, string],
      route: ROUTES.BRAND.SEARCH_TALENTS,
    },
    {
      title: 'Find Influencer',
      icon: <FindInfluencerSvg width={56} height={56} />,
      gradientColors: ['rgba(246, 187, 203, 0.28)', 'rgba(220, 107, 131, 0.28)'] as [string, string],
      route: ROUTES.BRAND.FIND_INFLUENCER,
    },
    {
      title: 'My Network',
      icon: <UserSvg width={56} height={56} />,
      gradientColors: ['rgba(175, 158, 247, 0.28)', 'rgba(88, 51, 201, 0.28)'] as [string, string],
      route: ROUTES.BRAND.MY_NETWORK,
    },
    {
      title: 'Your Contracts',
      icon: <BusinessContractSvg width={56} height={56} />,
      gradientColors: ['rgba(159, 226, 173, 0.28)', 'rgba(60, 169, 100, 0.28)'] as [string, string],
      route: ROUTES.BRAND.CONTRACTS,
    },
    {
      title: 'Leaderboard',
      icon: <CreateFileSvg width={56} height={56} />,
      gradientColors: ['rgba(251, 213, 196, 0.28)', 'rgba(236, 147, 104, 0.28)'] as [string, string],
      route: ROUTES.FEATURES.LEADERBOARD,
    },
    {
      title: 'Reports',
      icon: <ChecklistSvg width={56} height={56} />,
      gradientColors: ['rgba(253, 209, 117, 0.28)', 'rgba(177, 120, 2, 0.28)'] as [string, string],
      route: ROUTES.FEATURES.REPORTS,
    },
    {
      title: 'Transactions',
      icon: <MoneyBagSvg width={56} height={56} />,
      gradientColors: ['rgba(163, 226, 221, 0.28)', 'rgba(70, 182, 175, 0.28)'] as [string, string],
      route: ROUTES.FEATURES.TRANSACTIONS,
    },
  ];

  // Influencer features
  const influencerFeatures = [
    {
      title: 'Challenges',
      icon: <ChallengeSvg width={56} height={56} />,
      gradientColors: ['rgba(250, 206, 156, 0.28)', 'rgba(227, 127, 14, 0.28)'] as [string, string],
      route: ROUTES.FEATURES.CHALLENGES,
    },
    {
      title: 'Job Invitation',
      icon: <AddFriendSvg width={56} height={56} />,
      gradientColors: ['rgba(157, 200, 243, 0.28)', 'rgba(99, 166, 241, 0.28)'] as [string, string],
      route: ROUTES.INFLUENCER.JOB_INVITATION,
    },
    {
      title: 'Leaderboard',
      icon: <CreateFileSvg width={56} height={56} />,
      gradientColors: ['rgba(246, 187, 203, 0.28)', 'rgba(220, 107, 131, 0.28)'] as [string, string],
      route: ROUTES.FEATURES.LEADERBOARD,
    },
    {
      title: 'My Jobs',
      icon: <BriefCase width={56} height={56} />,
      gradientColors: ['rgba(175, 158, 247, 0.28)', 'rgba(88, 51, 201, 0.28)'] as [string, string],
      route: ROUTES.INFLUENCER.MY_JOBS,
    },
    {
      title: 'Reports',
      icon: <ChecklistSvg width={56} height={56} />,
      gradientColors: ['rgba(253, 209, 117, 0.28)', 'rgba(177, 120, 2, 0.28)'] as [string, string],
      route: ROUTES.FEATURES.REPORTS,
    },
    {
      title: 'Transactions',
      icon: <MoneyBagSvg width={56} height={56} />,
      gradientColors: ['rgba(163, 226, 221, 0.28)', 'rgba(70, 182, 175, 0.28)'] as [string, string],
      route: ROUTES.FEATURES.TRANSACTIONS,
    },
  ];

  const features = isBrand ? brandFeatures : influencerFeatures;

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8F8]" edges={['top']}>
      {/* Header */}
      <HomeHeader
        userName={user.brandName || user.name || 'User'}
        userAvatar={user.logo || user.avatar}
        showFavoriteIcon={isBrand}
        onFavoritePress={() => router.push(ROUTES.BRAND.FAVORITE_INFLUENCERS)}
        onNotificationPress={() => router.push(ROUTES.HOME.NOTIFICATIONS)}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text className="text-2xl font-bold text-black mb-5">Discover the Features</Text>

        {/* Search Bar */}
        <View className="flex-row items-center bg-white rounded-xl px-4 py-3 mb-6 shadow-md">
          <View className="mr-2">
            <MaterialCommunityIcons name="magnify" size={20} color="#999" />
          </View>
          <TextInput
            className="flex-1 text-base text-black"
            placeholder="Search"
            placeholderTextColor="#999"
          />
        </View>

        {/* Feature Cards Grid */}
        <View className="flex-row flex-wrap -mx-1.5">
          {features.map((feature, index) => (
            <View key={index} className="w-1/2 px-1.5 mb-3">
              <FeatureCard
                title={feature.title}
                icon={feature.icon}
                gradientColors={feature.gradientColors}
                onPress={() => router.push(feature.route as any)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
