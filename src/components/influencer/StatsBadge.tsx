import React from 'react';
import { View, Text } from 'react-native';
import { WizardBadge1Svg, WizardBadge2Svg } from '../../../assets/images';

interface StatsBadgeProps {
  score: number;
  tier: 'Top Pro' | 'Rising Talent' | 'Pro';
  badge: 'purple' | 'gold';
  showProgressBar?: boolean;
  size?: 'small' | 'large';
}

export default function StatsBadge({
  score,
  tier,
  badge,
  showProgressBar = true,
  size = 'small',
}: StatsBadgeProps) {
  const isSmall = size === 'small';

  // Calculate progress percentage (assuming max score is 500)
  const progressPercentage = Math.min((score / 500) * 100, 100);
  const totalDots = 20; // Total number of dots in progress bar
  const filledDots = Math.round((progressPercentage / 100) * totalDots);

  // Choose badge based on tier
  const BadgeIcon = badge === 'purple' ? WizardBadge1Svg : WizardBadge2Svg;

  return (
    <View style={{ width: '100%' }}>
      {/* Badge + Score + Tier Row */}
      <View className="flex-row items-center justify-between mb-1">
        {/* Left Side: Badge + Score */}
        <View className="flex-row items-center">
          {/* Badge Icon */}
          <View >
            <BadgeIcon width={isSmall ? 32 : 40} height={isSmall ? 32 : 40} />
          </View>

          {/* Score */}
          <View>
          <Text
            className="font-bold"
            style={{ fontSize:  14 , color: '#000' }}
          >
            {score}
          </Text>
          <Text
        className="text-gray-500"
        style={{ fontSize: 6, marginBottom: 6 }}
      >
        XP ON ACCOUNT
      </Text>
       {/* Dotted Progress Bar */}
        {showProgressBar && (
          <View className="flex-row items-center pr-2" style={{ gap: 2 }}>
            {Array.from({ length: totalDots }).map((_, index) => (
              <View
                key={index}
                style={{
                  width: 5,
                  height: 6,
                  borderRadius: 1,

                  backgroundColor: index < filledDots ? '#4CAF50' : '#E5E5E5',
                }}
              />
            ))}
          </View>
        )}
      </View>
      
        </View>

        {/* Right Side: Tier Badge */}
        <View
          className="px-2 py-1"
          style={{
            backgroundColor: 'transparent',
          }}
        >
          <Text
            className="font-semibold"
            style={{
              fontSize: 10,
              color: '#000',
              letterSpacing: 0.5,
            }}
          >
            {tier.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* XP Label */}
      

     
    </View>
  );
}
