import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface FeatureCardProps {
  title: string;
  image?: any;
  icon?: React.ReactNode;
  gradientColors: [string, string];
  onPress: () => void;
}

export default function FeatureCard({ title, image, icon, gradientColors, onPress }: FeatureCardProps) {
  return (
    <TouchableOpacity
      className="rounded-2xl -md overflow-hidden"
      onPress={onPress}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={gradientColors}
        start={[0, 0]}
        end={[0, 1]}
        className="p-4 min-h-[140px] justify-between"
      >
        <View className="items-end">
          {image ? (
            <Image
              source={image}
              style={{ width: 56, height: 56 }}
              resizeMode="contain"
            />
          ) : (
            icon
          )}
        </View>
        <Text className="text-base font-semibold text-black">{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
