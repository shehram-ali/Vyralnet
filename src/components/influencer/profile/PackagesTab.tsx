import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Package } from '../../../data/mockInfluencers';

interface PackagesTabProps {
  packages: Package[];
}

export default function PackagesTab({ packages }: PackagesTabProps) {
  if (packages.length === 0) {
    return (
      <View className="bg-white px-5 py-20 items-center">
        <MaterialCommunityIcons name="package-variant" size={64} color="#CCC" />
        <Text className="text-gray-500 text-base mt-4">No packages available</Text>
      </View>
    );
  }

  return (
    <View className="bg-white px-5 pt-4 pb-6">
      <Text className="text-lg font-bold text-black mb-2">Check Deals</Text>
      <Text className="text-sm text-gray-500 mb-4">
        This specific deliverables available from this Seller. Choose one
      </Text>

      {/* Package List */}
      <FlatList
        data={packages}
        renderItem={({ item, index }) => (
          <View
            key={item.id}
            className="mb-4 rounded-2xl overflow-hidden"
            style={{ backgroundColor: 'white', borderWidth: 1, borderColor: '#E5E5E5' }}
          >
            {/* Package Header with Color */}
            <View
              className="flex-row items-center justify-between px-4 py-3"
              style={{ backgroundColor: '#EEFBE9' }}
            >
              <View className="flex-row items-center flex-1">
                {/* Number Badge */}
                <View
                  className="mr-3 items-center justify-center"
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: '#006400',
                  }}
                >
                  <Text className="text-white font-bold text-xs">
                    {String(index + 1).padStart(2, '0')}
                  </Text>
                </View>
                {/* Title */}
                <Text className="text-base font-bold text-black flex-1">
                  {item.title}
                </Text>
              </View>
              {/* Price */}
              <Text className="text-lg font-bold text-black">
                ${item.price}
              </Text>
            </View>

            {/* Package Content */}
            <View className="px-4 py-3">
              {/* Delivery & Revisions */}
              <View className="flex-row items-center mb-4">
                <View className="flex-row items-center mr-4">
                  <MaterialCommunityIcons
                    name="calendar-blank"
                    size={16}
                    color="#666"
                  />
                  <Text className="text-xs text-gray-600 ml-1">
                    {item.deliveryDays} Days Delivery
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <MaterialCommunityIcons
                    name="refresh"
                    size={16}
                    color="#666"
                  />
                  <Text className="text-xs text-gray-600 ml-1">
                    {item.revisions} Revisions
                  </Text>
                </View>
              </View>

              {/* Features */}
              <View className="mb-4">
                <Text className="text-base font-bold text-black mb-2">
                  Features
                </Text>
                <View className="flex-row flex-wrap">
                  {item.features.map((feature, idx) => (
                    <View
                      key={idx}
                      className="flex-row items-center mb-2"
                      style={{ width: '50%' }}
                    >
                      <MaterialCommunityIcons
                        name="check"
                        size={16}
                        color="#5EBD3E"
                      />
                      <Text className="text-sm text-gray-700 ml-2 flex-1">
                        {feature}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Description */}
              <Text className="text-sm text-gray-600 leading-5">
                {item.description}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </View>
  );
}
