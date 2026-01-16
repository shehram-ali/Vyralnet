import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Frame1984077131Svg } from '../../assets/images';
import ChallengePickerBottomSheet from '../../src/components/leaderboard/ChallengePickerBottomSheet';

interface LeaderboardEntry {
  id: string;
  rank: number;
  influencerName: string;
  influencerUsername: string;
  views: number;
  trend: 'up' | 'down';
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

const challenges = [
  'Expert Influencer for my cosmetic products',
  'Reels Expert',
  'Cosmetic Content Creator',
  'Expert Influencer for my cosmetic products',
  'Reels Expert',
  'Cosmetic Content Creator',
];

export default function LeaderboardScreen() {
  const router = useRouter();
  const [selectedChallenge, setSelectedChallenge] = useState('Expert Influencer for my cosmetic products');
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
              <Text className="text-xs text-[#6C727F] mb-1">Challenge</Text>
              <Text className="text-base text-black font-medium">{selectedChallenge}</Text>
            </View>
            <MaterialCommunityIcons name="chevron-down" size={24} color="#000" />
          </View>
        </TouchableOpacity>

        {/* Gradient Card with Stats */}
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
