import React from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LineChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../src/hooks/useAuth';
import { HomeHeader } from '../../src/components';
import { ROUTES } from '../../src/constants';
import Svg, { Text as SvgText, Rect } from 'react-native-svg';
import { WizardBadge1Svg, WizardBadge2Svg } from '../../assets/images';

const { width: screenWidth } = Dimensions.get('window');

interface MetricItemProps {
  title: string;
  value: string;
  showDivider?: boolean;
}

function MetricItem({ title, value, showDivider }: MetricItemProps) {
  return (
    <View className="flex-1 items-center py-3 relative">
      <Text className="text-xs text-gray-500 mb-4">{title}</Text>
      <Text className="text-5xl font-bold text-[#5EBD3E]">{value}</Text>
      {showDivider && (
        <View className="absolute right-0 top-0 bottom-0 w-[1px] bg-gray-200" />
      )}
    </View>
  );
}

export default function StatsScreen() {
  const { user } = useAuth();
  const router = useRouter();

  // Early return if user is not available
  if (!user) {
    return null;
  }

  const isBrand = user.userType === 'brand';

  // Safe navigation handlers
  const handleFavoritePress = () => {
    try {
      router.push(ROUTES.BRAND.FAVORITE_INFLUENCERS);
    } catch (error) {
      console.log('Navigation error:', error);
    }
  };

  const handleNotificationPress = () => {
    try {
      router.push(ROUTES.HOME.NOTIFICATIONS);
    } catch (error) {
      console.log('Navigation error:', error);
    }
  };

  // Mock data for brand stats
  const totalSpending = '$3,000.00';
  const totalJobs = '50';
  const totalChallenges = '80';
  const totalContracts = '32';

  // Influencer stats mock data
  const influencerStats = {
    currentBadge: {
      name: 'TOP PRO',
      icon: 'purple' as const,
    },
    nextBadge: {
      name: 'RAISING TALENT',
      icon: 'gold' as const,
    },
    xp: {
      current: 460,
      max: 500,
    },
    jobsInProgress: 8,
    totalJobs: 15,
    challengeParticipate: 50,
    challengeWon: 40,
    totalEarning: 1250.00,
    xpHistory: [
      {
        id: '1',
        title: 'Expert Influencer Required',
        startDate: '20 Nov, 2025',
        endDate: '25, Nov, 2025',
        xpEarned: 200,
      },
      {
        id: '2',
        title: 'Social Media Campaign',
        startDate: '10 Nov, 2025',
        endDate: '15, Nov, 2025',
        xpEarned: 150,
      },
      {
        id: '3',
        title: 'Product Review Challenge',
        startDate: '05 Nov, 2025',
        endDate: '08, Nov, 2025',
        xpEarned: 110,
      },
    ],
  };

  // Chart data - monthly spending trends
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const chartData = {
    labels: ['', '', '', '', '', '', ''], // Empty labels - we'll render custom ones
    datasets: [
      {
        data: [8000, 12000, 15000, 20000, 16000, 23000, 30000],
      },
    ],
  };

  // Decorator function to add custom tooltip
  const chartDecorator = () => {
    return (data: any) => {
      // Check if data exists and has the expected structure
      if (!data || !Array.isArray(data) || data.length === 0) {
        return null;
      }

      // Show tooltip on Apr (index 3) data point at value 20000
      const aprIndex = 3;

      // Ensure the index exists in the data array
      if (!data[aprIndex] || typeof data[aprIndex].x === 'undefined' || typeof data[aprIndex].y === 'undefined') {
        return null;
      }

      const aprValue = chartData.datasets[0].data[aprIndex];
      const xPosition = data[aprIndex].x;
      const yPosition = data[aprIndex].y;

      return (
        <Svg>
          {/* Tooltip background */}
          <Rect
            x={xPosition - 40}
            y={yPosition - 35}
            width={80}
            height={28}
            rx={6}
            fill="#5EBD3E"
          />
          {/* Tooltip text */}
          <SvgText
            x={xPosition}
            y={yPosition - 15}
            fill="white"
            fontSize="14"
            fontWeight="600"
            textAnchor="middle"
          >
            ${aprValue.toLocaleString()}
          </SvgText>
        </Svg>
      );
    };
  };

  // Chart configuration
  const chartConfig = {
    backgroundColor: '#F8F8FB',
    backgroundGradientFrom: '#F8F8FB',
    backgroundGradientTo: '#F8F8FB',
    decimalPlaces: 0,
    color: () => '#5EBD3E', // Green line #5EBD3E
    labelColor: (opacity = 1) => `rgba(153, 153, 153, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#5EBD3E',
      fill: '#5EBD3E',
    },
    propsForBackgroundLines: {
      strokeDasharray: '5,5', // Dotted lines
      stroke: '#E8E8E8',
      strokeWidth: 1,
    },
  };

  // Render function for influencer XP history cards
  const renderXPHistoryCard = (item: typeof influencerStats.xpHistory[0]) => {
    return (
      <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm">
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text className="text-base font-semibold text-black mb-2">{item.title}</Text>
            <Text className="text-xs text-gray-500 mb-2">
              {item.startDate} - {item.endDate}
            </Text>
            {/* Green progress line */}
            {/* <View className="h-[3px] bg-[#5EBD3E] rounded-full" style={{ width: 40 }} /> */}
          </View>
          <View className="items-end ml-4">
            <Text className="text-4xl font-bold text-[#FF9500]">{item.xpEarned}</Text>
            <Text className="text-xs text-gray-400 mt-1">XP Earned</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderInfluencerStats = () => (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Overview Section */}
      <Text className="text-xl font-semibold  text-black mb-3">Overview</Text>
 <View className="bg-white rounded-2xl shadow-sm shadow-black mb-4">
      {/* Badge Cards Row */}
      <View className="flex-row bg-white  shadow-sm mb-4 overflow-hidden">
        {/* Current Badge */}
        <View className="flex-1 p-4 items-center justify-center">
          <Text className="text-xs text-black mb-3">Current Badge</Text>
          <WizardBadge1Svg width={64} height={64} />
          <Text className="text-sm font-semibold text-black mt-3">TOP PRO</Text>
        </View>

        {/* Vertical Divider */}
        <View className="w-[1px] bg-gray-200" />

        {/* Next Badge */}
        <View className="flex-1 p-4 items-center justify-center">
          <Text className="text-xs text-black mb-3">Next Badge</Text>
          <WizardBadge2Svg width={64} height={64} />
          <Text className="text-sm font-semibold text-black mt-3">RAISING TALENT</Text>
        </View>
      </View>

      {/* XP Progress Section */}
      <View className=" p-4 mb-6 ">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-base font-medium text-black">XP on Account</Text>
          <View className="flex-row items-center">
            <Text className="text-lg font-bold text-black">
              {influencerStats.xp.current}
            </Text>
            <Text className="text-lg text-gray-400">
              {' '}/ {influencerStats.xp.max}
            </Text>
          </View>
        </View>
        {/* Gradient Progress Bar */}
        <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <LinearGradient
            colors={['#8B5CF6', '#EAB308']} // Purple to Gold gradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              height: '100%',
              width: `${(influencerStats.xp.current / influencerStats.xp.max) * 100}%`,
              borderRadius: 9999,
            }}
          />
        </View>
      </View>

      {/* Stats Metrics - Combined Card */}
     
        {/* Jobs In-progress */}
        <View className="flex-row justify-between items-center px-4 py-5">
          <Text className="text-sm text-black">Jobs In-progress</Text>
          <Text className="text-xl font-semibold text-black">{influencerStats.jobsInProgress}</Text>
        </View>
        <View className="h-[1px] bg-gray-100" />

        {/* Total Jobs */}
        <View className="flex-row justify-between items-center px-4 py-5">
          <Text className="text-sm text-black">Total Jobs</Text>
          <Text className="text-xl font-semibold text-black">{influencerStats.totalJobs}</Text>
        </View>
        <View className="h-[1px] bg-gray-100" />

        {/* Challenge Participate */}
        <View className="flex-row justify-between items-center px-4 py-5">
          <Text className="text-sm text-black">Challenge Participate</Text>
          <Text className="text-xl font-semibold text-black">{influencerStats.challengeParticipate}</Text>
        </View>
        <View className="h-[1px] bg-gray-100" />

        {/* Challenge Won */}
        <View className="flex-row justify-between items-center px-4 py-5">
          <Text className="text-sm text-black">Challenge Won</Text>
          <Text className="text-xl font-semibold text-black">{influencerStats.challengeWon}</Text>
        </View>
        <View className="h-[1px] bg-gray-100" />

        {/* Total Earning */}
        <View className="flex-row justify-between items-center px-4 py-5">
          <Text className="text-sm text-black">Total Earning</Text>
          <Text className="text-xl font-semibold text-black">${influencerStats.totalEarning.toFixed(2)}</Text>
        </View>
      </View>

      {/* Your XP Earned Section */}
      <View className="flex-row justify-between items-center mt-2 mb-3">
        <Text className="text-base font-medium text-black">Your XP Earned</Text>
        <TouchableOpacity className="flex-row items-center">
          <Text className="text-sm font-medium text-[#5EBD3E]">View All </Text>
          <Text className="text-sm font-medium text-[#5EBD3E]">→</Text>
        </TouchableOpacity>
      </View>

      {/* XP History Cards */}
      {influencerStats.xpHistory.map(item => (
        <View key={item.id}>
          {renderXPHistoryCard(item)}
        </View>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8FB]" edges={['top']}>
      {/* Header */}
      <HomeHeader
        userName={user.brandName || user.name || 'User'}
        userAvatar={user.logo || user.avatar}
        showFavoriteIcon={isBrand}
        onFavoritePress={handleFavoritePress}
        onNotificationPress={handleNotificationPress}
      />

      {/* Conditional Content Based on User Type */}
      {isBrand ? (
        // BRAND CONTENT
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Overview Section */}
          <Text className="text-xl font-semibold text-black mb-3">Overview</Text>

          {/* Total Spending Card */}
          <View className="bg-white rounded-2xl p-5 mb-5 shadow-sm flex-row justify-between items-center">
            <Text className="text-md text-[#1D1C1C] font-medium">Total Spending</Text>
            <Text className="text-2xl font-bold text-[#5EBD3E]">{totalSpending}</Text>
          </View>

          {/* Metrics Cards Row */}
          <View className="bg-white rounded-2xl p-4 mb-6 shadow-sm flex-row">
            <MetricItem title="Total Jobs" value={totalJobs} showDivider={true} />
            <MetricItem title="Total Challenges" value={totalChallenges} showDivider={true} />
            <MetricItem title="Total Contracts" value={totalContracts} showDivider={false} />
          </View>

          {/* Your Stats Section */}
          <Text className="text-xl font-semibold text-black mb-3">Your Stats</Text>

          {/* Chart Card */}

            <LineChart
              data={chartData}
              width={screenWidth - 70}
              height={240}
              chartConfig={chartConfig}
              bezier
              style={{
                marginLeft: -10,
              }}
              withInnerLines={true}
              withOuterLines={false}
              withVerticalLines={false}
              withHorizontalLines={true}
              withDots={true}
              withShadow={false}
              yAxisLabel=""
              yAxisSuffix=""
              segments={4}
              decorator={chartDecorator()}
              formatYLabel={(value) => {
                const num = parseFloat(value);
                if (num === 0) return '0';
                if (num >= 1000) {
                  return `${(num / 1000).toFixed(0)}k`;
                }
                return value;
              }}
            />

            {/* Custom month labels with Apr highlighted in green */}
            <View className="flex-row justify-between px-2 mt-1">
              {monthLabels.map((label, index) => (
                <Text
                  key={index}
                  style={{
                    fontSize: 12,
                    color: label === 'Apr' ? '#5EBD3E' : '#999999',
                    fontWeight: label === 'Apr' ? '600' : '400',
                    width: (screenWidth - 110) / 7,
                    textAlign: 'center',
                  }}
                >
                  {label}
                </Text>
              ))}
            </View>

        </ScrollView>
      ) : (
        // INFLUENCER CONTENT
        renderInfluencerStats()
      )}
    </SafeAreaView>
  );
}
