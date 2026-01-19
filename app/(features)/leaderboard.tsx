import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Frame1984077131Svg, GreenCrown, HourglassGreen, VSContainer } from '../../assets/images';
import ChallengePickerBottomSheet from '../../src/components/leaderboard/ChallengePickerBottomSheet';
import { useAuth } from '../../src/hooks/useAuth';

interface LeaderboardEntry {
  id: string;
  rank: number;
  influencerName: string;
  influencerUsername: string;
  views: number;
  trend: 'up' | 'down';
}

interface Match {
  id: string;
  round: number;
  player1: {
    name: string;
    username: string;
    views: number;
    avatar: string;
    isWinner: boolean;
  };
  player2: {
    name: string;
    username: string;
    views: number;
    avatar: string;
    isWinner: boolean;
  };
  gradientColors: readonly [string, string, ...string[]];
  timeLeft?: string;
  winnerMessage?: string;
}

const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: '1',
    rank: 1,
    influencerName: 'Eten Hunt',
    influencerUsername: '@ethen_h1',
    views: 1807,
    trend: 'up',
  },
  {
    id: '2',
    rank: 2,
    influencerName: 'Eten Hunt',
    influencerUsername: '@ethen_h1',
    views: 1800,
    trend: 'up',
  },
  {
    id: '3',
    rank: 3,
    influencerName: 'Eten Hunt',
    influencerUsername: '@ethen_h1',
    views: 1507,
    trend: 'down',
  },
  {
    id: '4',
    rank: 4,
    influencerName: 'Eten Hunt',
    influencerUsername: '@ethen_h1',
    views: 1407,
    trend: 'up',
  },
  {
    id: '5',
    rank: 5,
    influencerName: 'Eten Hunt',
    influencerUsername: '@ethen_h1',
    views: 1307,
    trend: 'down',
  },
  {
    id: '6',
    rank: 6,
    influencerName: 'Eten Hunt',
    influencerUsername: '@ethen_h1',
    views: 1207,
    trend: 'down',
  },
];

const mockMatches: Match[] = [
  {
    id: '1',
    round: 2,
    player1: {
      name: 'Ethen Hunt',
      username: '@Ethen_1',
      views: 2430,
      avatar: 'https://i.pravatar.cc/100?img=12',
      isWinner: false,
    },
    player2: {
      name: 'John Doe',
      username: '@john.doe1',
      views: 2000,
      avatar: 'https://i.pravatar.cc/100?img=13',
      isWinner: false,
    },
    gradientColors: ['#6B7CF5', '#E056B7'] as const,
    timeLeft: '12:20:00',
  },
  {
    id: '2',
    round: 1,
    player1: {
      name: 'Ethen Hunt',
      username: '@Ethen_1',
      views: 4330,
      avatar: 'https://i.pravatar.cc/100?img=12',
      isWinner: true,
    },
    player2: {
      name: 'John Doe',
      username: '@john.doe1',
      views: 3000,
      avatar: 'https://i.pravatar.cc/100?img=13',
      isWinner: false,
    },
    gradientColors: ['#6B7CF5', '#E056B7'] as const,
    winnerMessage: 'Congratulations! Ethen Hunt won the round.',
  },
];

const challenges = [
  'Expert Influencer',
  'Death Destroyer',
  'Reels Expert',
  'Cosmetic Content Creator',
];

export default function LeaderboardScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const isInfluencer = user?.userType === 'influencer';
  const [selectedChallenge, setSelectedChallenge] = useState(isInfluencer ? 'Expert Influencer' : 'Expert Influencer for my cosmetic products');
  const [showChallengePicker, setShowChallengePicker] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 48,
    minutes: 1,
    seconds: 30,
  });

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (value: number) => {
    return value.toString().padStart(2, '0');
  };

  const handleChallengePress = () => {
    setShowChallengePicker(true);
  };

  const handleSelectChallenge = (challenge: string) => {
    setSelectedChallenge(challenge);
  };

  const handleUserPress = (item: LeaderboardEntry) => {
    router.push({
      pathname: '/(features)/(brand)/content-details',
      params: {
        influencerName: item.influencerName,
        title: 'Expert Influencer Required for My Cosmetic Products',
      },
    });
  };

  const renderLeaderboardItem = ({ item }: { item: LeaderboardEntry }) => {
    return (
      <TouchableOpacity
        onPress={() => handleUserPress(item)}
        activeOpacity={0.7}
        className="flex-row items-center px-5 py-4 mb-2 mx-5 bg-white rounded-2xl"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        {/* Rank */}
        <View
          className="items-center justify-center mr-4"
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: '#F8F8F8',
          }}
        >
          <Text className="text-sm font-semibold text-black">{item.rank}</Text>
        </View>

        {/* Avatar and Info */}
        <View style={{ width: 40, height: 40, marginRight: 12 }}>
          <Frame1984077131Svg width={40} height={40} />
        </View>
        <View className="flex-1">
          <Text className="text-base font-semibold text-black">{item.influencerName}</Text>
          <Text className="text-xs text-[#76767CCC]">{item.influencerUsername}</Text>
        </View>

        {/* Views with Trend */}
        <View className="flex-row items-center">
          <MaterialCommunityIcons
            name={item.trend === 'up' ? 'menu-up' : 'menu-down'}
            size={24}
            color={item.trend === 'up' ? '#5EBD3E' : '#E53E3E'}
          />
          <Text
            className="text-sm font-semibold "
            style={{ color:'#000000' }}
          >
            {item.views} Views
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderMatchCard = (match: Match) => {
    return (
      <View
        key={match.id}
        className="mx-5 mb-4"
      >
        <LinearGradient
          colors={match.gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            borderRadius: 12,
            padding: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 42,
            elevation: 5,
          }}
        >
          {/* Round Badge */}
          <View className="absolute right-[45%] items-center mb-6">
            <View className="flex-row bg-black px-4 items-center justify-center py-1 rounded-b-md">
              <Text className="text-white text-sm font-bold">ROUND </Text>
              <Text className="text-white text-xl font-bold">{match.round}</Text>
            </View>
          </View>

          {/* Match Content */}
          <View className="flex-row pt-10 pb-8 items-start justify-between">
            {/* Player 1 */}
            <View className="items-center flex-1">
              <View className="relative mb-3">
                {/* Green Trophy Badge */}
                {/* <View
                  className="absolute bottom-0 left-0 bg-[#5EBD3E] rounded-full items-center justify-center"
                  style={{ width: 28, height: 28, zIndex: 10 }}
                >
                  <MaterialCommunityIcons name="trophy-variant" size={16} color="#FFF" />
                </View> */}

                {/* Winner Crown */}
                {match.player1.isWinner && (
                  <View
                    className="absolute -top-9 left-7"
                    style={{ zIndex: 20 }}
                  >
                    <GreenCrown/>
                  </View>
                )}

                {/* Avatar */}
                <Image
                  source={{ uri: match.player1.avatar }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    borderWidth: 4,
                    borderColor: '#FFFFFF',
                  }}
                />
              </View>
              <Text className="text-white font-bold text-base mb-0.5">{match.player1.name}</Text>
              <Text className="text-white text-xs opacity-90 mb-1">{match.player1.username}</Text>
              <Text className="text-[#5EF6FF] text-sm font-semibold">{match.player1.views} Views</Text>
            </View>

            {/* VS */}
            <View className=" px-5 py-2.5 rounded-lg mx-3 mt-8">
              <VSContainer/>
              <Text className="absolute left-10 top-6 text-white text-lg font-medium">VS</Text>
            </View>

            {/* Player 2 */}
            <View className="items-center flex-1">
              <View className="relative mb-3">
                {/* Winner Crown */}
                {match.player2.isWinner && (
                  <View
                    className="absolute -top-1 -left-1"
                    style={{ zIndex: 20 }}
                  >
                    <GreenCrown/>
                  </View>
                )}

                {/* Avatar */}
                <Image
                  source={{ uri: match.player2.avatar }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    borderWidth: 4,
                    borderColor: '#FFFFFF',
                  }}
                />
              </View>
              <Text className="text-white font-bold text-base mb-0.5">{match.player2.name}</Text>
              <Text className="text-white text-xs opacity-90 mb-1">{match.player2.username}</Text>
              <Text className="text-white text-sm font-semibold">{match.player2.views} Views</Text>
            </View>
          </View>

          {/* Bottom Section */}
          {match.timeLeft && (
            <View className="flex-row items-center justify-center mt-4">
             <HourglassGreen/>
              <Text className="text-white text-xl font-bold ml-2">{match.timeLeft}</Text>
            </View>
          )}
          <Text className="text-white text-center text-xs mt-2 opacity-90">
            {match.winnerMessage || 'time left until we announce the winner.'}
          </Text>
        </LinearGradient>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8FB]" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-5 py-4 pt-10 bg-[#F8F8FB]">
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-md font-semibold text-black ml-4">Leaderboard</Text>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Challenge Selector */}
        <TouchableOpacity
          onPress={handleChallengePress}
          activeOpacity={0.7}
          className="mx-5 mt-4 mb-4 bg-white rounded-2xl px-3 py-3"
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-sm text-black mb-1">Challenge</Text>
              <Text className="text-sm text-[#6C727F] font-regular">{selectedChallenge}</Text>
            </View>
            <MaterialCommunityIcons name="chevron-down" size={24} color="#000" />
          </View>
        </TouchableOpacity>

        {/* Conditional Content Based on User Type */}
        {isInfluencer ? (
          <>
            {/* Influencer Stats */}
            <View className="flex-row mx-5 mb-6">
              <View className="flex-1 bg-white rounded-2xl py-4 px-4 mr-2 items-center"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 2,
                  elevation: 2,
                }}
              >
                <View className="bg-[#E8F5E9] rounded-md p-2 mb-2">
                  <MaterialCommunityIcons name="account-group" size={24} color="#5EBD3E" />
                </View>
                <Text className="text-sm text-gray-600 mb-1">Active Participants</Text>
                <Text className="text-2xl font-bold text-black">32</Text>
              </View>
              <View className="flex-1 bg-white rounded-2xl py-4 px-4 ml-2 items-center"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 2,
                  elevation: 2,
                }}
              >
                <View className="bg-[#E8F5E9] rounded-md p-2 mb-2">
                  <MaterialCommunityIcons name="clock-outline" size={24} color="#5EBD3E" />
                </View>
                <Text className="text-sm text-gray-600 mb-1">Challenge Round</Text>
                <Text className="text-2xl font-bold text-black">2/5</Text>
              </View>
            </View>

            {/* Your Matches Section */}
            <View className="px-5 mb-3">
              <Text className="text-base font-medium text-[#0D0D0D">Your Matches</Text>
            </View>

            {/* Match Cards */}
            {mockMatches.map((match) => renderMatchCard(match))}
          </>
        ) : (
          <>
            {/* Brand Stats - Gradient Card */}
            <View className="mx-5 mb-4">
              <LinearGradient
                colors={['#6984F1', '#80A7FB', '#C17FFD', '#F373B7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  borderRadius: 12,
                  padding: 16,
                }}
              >
                {/* Countdown Timer */}
                <View className="items-center mb-6">
                  <Text className="text-white text-xs font-medium mb-2">Challenge ends in</Text>
                  <Text className="text-white text-3xl font-bold">
                    {formatTime(timeLeft.hours)} : {formatTime(timeLeft.minutes)} : {formatTime(timeLeft.seconds)}
                  </Text>
                </View>

                {/* Stats Cards */}
                <View className="flex-row justify-between">
                  {/* Participants */}
                  <View
                    className="flex-1 bg-white rounded-2xl py-4 px-1 items-center mr-2"
                    style={{ minHeight: 101 , width:116}}
                  >
                    <MaterialCommunityIcons name="account-group" size={24} color="#000" />
                    <Text className="text-xs text-black font-medium mt-2">Participants</Text>
                    <Text className="text-xl font-bold text-black mt-1">32</Text>
                  </View>

                  {/* Round */}
                  <View
                    className="flex-1 bg-white rounded-2xl p-4 items-center mx-1"
                    style={{ minHeight: 90 }}
                  >
                    <MaterialCommunityIcons name="clock-outline" size={24} color="#000" />
                    <Text className="text-xs text-black font-medium mt-2">Round</Text>
                    <Text className="text-2xl font-bold text-black mt-1">3/4</Text>
                  </View>

                  {/* Time Left */}
                  <View
                    className="flex-1 bg-white rounded-2xl py-4 items-center ml-2"
                    style={{ minHeight: 90 }}
                  >
                    <MaterialCommunityIcons name="timer-outline" size={24} color="#000" />
                    <Text className="text-xs text-black font-medium mt-2">Time Left</Text>
                    <Text className="text-xl font-bold text-black mt-1 ">
                      {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </View>

            {/* Leaderboard List */}
            <View className="mt-2">
              {mockLeaderboard.map((item) => (
                <View key={item.id}>{renderLeaderboardItem({ item })}</View>
              ))}
            </View>
          </>
        )}
      </ScrollView>

      {/* Challenge Picker Bottom Sheet */}
      <ChallengePickerBottomSheet
        visible={showChallengePicker}
        selectedChallenge={selectedChallenge}
        challenges={challenges}
        onClose={() => setShowChallengePicker(false)}
        onSelectChallenge={handleSelectChallenge}
      />
    </SafeAreaView>
  );
}
