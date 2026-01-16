import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface HomeHeaderProps {
  userName: string;
  userAvatar?: string;
  showFavoriteIcon?: boolean;
  onFavoritePress?: () => void;
  onNotificationPress?: () => void;
}

export default function HomeHeader({ userName, userAvatar, showFavoriteIcon = false, onFavoritePress, onNotificationPress }: HomeHeaderProps) {
  return (
    <View className="flex-row items-center justify-between px-5 py-4 bg-[#F8F8FB]">
      {/* Left side - Avatar and Name */}
      <View className="flex-row items-center flex-1">
        {userAvatar ? (
          <Image
            source={{ uri: userAvatar }}
            className="w-12 h-12 rounded-full mr-3"
            resizeMode="cover"
          />
        ) : (
          <View className="w-12 h-12 rounded-full mr-3 bg-[#E1306C] items-center justify-center">
            <Text className="text-white text-xl font-bold">
              {userName.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
        <Text className="text-lg font-semibold text-black flex-1" numberOfLines={1}>
          {userName}
        </Text>
      </View>

      {/* Right side - Icons */}
      <View className="flex-row items-center">
        {showFavoriteIcon && (
          <TouchableOpacity className="ml-4" activeOpacity={0.7} onPress={onFavoritePress}>
            <MaterialCommunityIcons name="heart-outline" size={24} color="#000" />
          </TouchableOpacity>
        )}
        <TouchableOpacity className="ml-4" activeOpacity={0.7} onPress={onNotificationPress}>
          <MaterialCommunityIcons name="bell-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
