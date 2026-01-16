import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { InstagramFillSvg, InstagramSvg } from '../../../assets/images';
import StatsBadge from './StatsBadge';
import { Influencer } from '../../data/mockInfluencers';

interface InfluencerCardProps {
  influencer: Influencer;
  onPress: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export default function InfluencerCard({
  influencer,
  onPress,
  onToggleFavorite,
}: InfluencerCardProps) {
  return (
    <TouchableOpacity
      onPress={() => onPress(influencer.id)}
      activeOpacity={0.7}
      className="bg-white rounded-2xl p-0 mb-3 overflow-hidden shadow-sm"
    >
      <View className="flex-row">
        {/* Left Side - Avatar with Heart Overlay */}
        <View className="relative" style={{ width: 140, height: 140 }}>
          <Image
            source={influencer.avatar}
            style={{ width: 140, height: 140, borderTopLeftRadius: 16, borderBottomLeftRadius: 16 }}
            resizeMode="cover"
          />
          {/* Heart Icon Overlay */}
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              onToggleFavorite(influencer.id);
            }}
            activeOpacity={0.7}
            style={{
              position: 'absolute',
              bottom: 12,
              left: 55,
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

          {/* Instagram Icon - Top Right of Image */}
          {/* <View
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              backgroundColor: 'white',
              borderRadius: 20,
              width: 36,
              height: 36,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
           
          </View> */}
        </View>

        {/* Right Side - Info */}
        <View className="flex-1 px-1 py-3 justify-between">
          
          {/* Name + Verified */}
          <View >
            <View className="flex-row justify-between mb-1">
              <View className="flex-row items-center flex-1">
              <Text className="text-lg font-bold text-black mr-1" numberOfLines={1}>
                {influencer.name}
              </Text>
              {influencer.verified && (
                <MaterialCommunityIcons name="check-decagram" size={18} color="#2196F3" />
              )}
              </View>
              <TouchableOpacity activeOpacity={0.7}>
              <InstagramFillSvg width={18} height={18} />
            </TouchableOpacity>
            </View>

            {/* Username */}
            <Text className="text-sm text-gray-500 mb-3">{influencer.username}</Text>
             
          </View>

          {/* Stats Badge */}
          {influencer.stats && (
            <View className='mb-2 overflow-hidden bg-background  rounded-lg'>
              <StatsBadge
                score={influencer.stats.xpScore}
                tier={influencer.stats.tier}
                badge={influencer.stats.badge}
                showProgressBar={true}
                size="small"
              />
            </View>
          )}

          {/* Category Pills */}
          <View className="flex-row flex-wrap overflow-hidden px-2">
            {influencer.categories && influencer.categories.slice(0, 2).map((category, index) => (
              <View
                key={index}
                className="px-3 py-1.5 rounded-md mr-2 mb-1"
                style={{ backgroundColor: '#E8F5E9' }}
              >
                <Text
                  className="text-xs font-medium"
                  style={{ color: '#4CAF50' }}
                >
                  {category}
                </Text>
              </View>
            ))}

          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
