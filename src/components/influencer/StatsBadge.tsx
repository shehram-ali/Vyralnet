import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  NoobieBadgeSvg,
  RisingTalentBadgeSvg,
  RookieBadgeSvg,
  TopProBadgeSvg,
} from '../../../assets/images';

interface StatsBadgeProps {
  score: number;
  tier: 'Top Pro' | 'Rising Talent' | 'Pro' | 'Rookie' | 'Noobie';
  badge?: 'purple' | 'gold';
  showProgressBar?: boolean;
  size?: 'small' | 'large';
  maxScore?: number;
}

export default function StatsBadge({
  score,
  tier,
  showProgressBar = true,
  size = 'small',
  maxScore = 1000,
}: StatsBadgeProps) {
  const isSmall = size === 'small';

  // Calculate progress percentage
  const progressPercentage = Math.min((score / maxScore) * 100, 100);

  // Choose badge based on tier
  const getBadgeIcon = () => {
    switch (tier) {
      case 'Top Pro':
        return <TopProBadgeSvg width={ 26} height={ 31} />;
      case 'Rising Talent':
        return <RisingTalentBadgeSvg width={ 26} height={ 31} />;
      case 'Rookie':
        return <RookieBadgeSvg width={ 26} height={ 31} />;
      case 'Noobie':
        return <NoobieBadgeSvg width={ 26} height={ 31} />;
      default:
        return <RookieBadgeSvg width={ 26} height={ 31} />;
    }
  };

  return (
    <View style={{ width: '100%', padding: 4, borderRadius: 8, backgroundColor: '#F8F8FB' }}>
      <View className="flex-row items-center justify-between">
        {/* Left Side: Score and Progress */}
        <View className="flex-1 mr-2">
          {/* Score */}
          <View className='flex-row items-center'>
          <Text className="text-xs font-semibold text-black">
            {score}
          </Text>
          <Text className="text-[8px] font-semibold text-[#6C727F]">
            /{maxScore}
          </Text>
          </View>
          <Text className="text-[6px] text-[#1D1C1C] mb-1">XP ON ACCOUNT</Text>

          {/* Progress Bar */}
          {showProgressBar && (
            <View
              style={{
                height: 12,
                backgroundColor: '#E5E5E5',
                borderRadius: 40,
                overflow: 'hidden',
                width: '100%',
                justifyContent:'center',
                // alignItems: 'center'
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
          )}
        </View>

        {/* Right Side: Badge and Tier */}
        <View className="items-end">
          <Text className="text-[8px] font-semibold text-[#1D1C1C] mb-1">
            {tier.toUpperCase()}
          </Text>
          {getBadgeIcon()}
        </View>
      </View>
    </View>
  );
}
