import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DiscoverScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View className="flex-1 bg-surface">
      {/* Header */}
      <View className="bg-white px-4 pt-12 pb-4 border-b border-gray-200">
        <Text className="text-2xl font-bold">Discover</Text>
      </View>

      {/* Search Bar */}
      <View className="p-4 bg-white">
        <View className="flex-row items-center bg-surface rounded-lg px-4 py-3">
          <MaterialCommunityIcons name="magnify" size={20} color="#666" />
          <TextInput
            className="flex-1 ml-2 text-base"
            placeholder="Search Vyralnet"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Placeholder Content */}
        <View className="items-center justify-center p-10 mt-20">
          <View className="w-20 h-20 rounded-full bg-gray-300 items-center justify-center mb-4">
            <MaterialCommunityIcons name="compass" size={40} color="#666" />
          </View>
          <Text className="text-xl font-bold text-gray-800 mb-2">
            Discover New Content
          </Text>
          <Text className="text-base text-gray-600 text-center">
            Trending posts and popular creators will appear here
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
