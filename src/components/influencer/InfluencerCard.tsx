import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { InstagramFillSvg } from '../../../assets/images';
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
  // Category colors
  const getCategoryColor = (index: number) => {
    const colors = [
      { bg: '#F1FFE2', text: '#006400' }, // Green
      { bg: '#EDEDED', text: '#6C727F' }, // Gray
    ];
    return colors[index % colors.length];
  };

  return (
    <TouchableOpacity
      onPress={() => onPress(influencer.id)}
      activeOpacity={0.7}
      className="bg-white rounded-2xl mb-3 overflow-hidden"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <View className="flex-row">
        {/* Left Side - Avatar with Heart Overlay */}
        <View className="relative justify-center items-center mx-2" >
          <Image
            source={influencer.avatar}
            style={{
              width: 140,
              height: 140,
              borderTopLeftRadius: 16,
              borderBottomLeftRadius: 16,
            }}
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
              bottom: 16,
              left: '50%',
              marginLeft: -18,
              backgroundColor: 'white',
              borderRadius: 18,
              width: 36,
              height: 36,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 4,
            }}
          >
            <MaterialCommunityIcons
              name={influencer.isFavorite ? 'heart' : 'heart-outline'}
              size={20}
              color={influencer.isFavorite ? '#FF0000' : '#666'}
            />
          </TouchableOpacity>
        </View>

        {/* Right Side - Info */}
        <View className="flex-1 py-3 pr-3 pl-2">
          {/* Name + Verified + Instagram */}
          <View className="flex-row items-start justify-between mb-1">
             <View>
            <View className="flex-row items-center flex-1">
             
              <Text
                className="text-base font-bold text-black mr-1"
                numberOfLines={1}
                style={{ fontSize: 16 }}
              >
                {influencer.name}
              </Text>
              {influencer.verified && (
                <MaterialCommunityIcons name="check-decagram" size={12} color="#000" />
              )}
            </View>
            <Text className="text-xs text-gray-500 mb-2">{influencer.username}</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                backgroundColor: 'white',
                borderRadius: 12,
                width: 24,
                height: 24,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: '#E5E5E5',
                
              }}
            >
              <InstagramFillSvg width={16} height={20} />
            </TouchableOpacity>
          </View>

          {/* Username */}
          

          {/* Stats Badge */}
          {influencer.stats && (
            <View className="mb-3">
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
          <View className="flex-row flex-wrap">
            {influencer.categories &&
              influencer.categories.slice(0, 2).map((category, index) => {
                const colors = getCategoryColor(index);
                return (
                  <View
                    key={index}
                    className="px-3 py-2 rounded-xl mr-2 mb-1"
                    style={{ backgroundColor: colors.bg }}
                  >
                    <Text
                      className="text-xs font-medium"
                      style={{ color: colors.text }}
                    >
                      {category}
                    </Text>
                  </View>
                );
              })}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
