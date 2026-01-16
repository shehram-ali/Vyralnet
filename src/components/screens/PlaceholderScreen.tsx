import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

interface PlaceholderScreenProps {
  title: string;
  icon?: string;
}

export default function PlaceholderScreen({ title, icon = 'alert-circle-outline' }: PlaceholderScreenProps) {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8F8]" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-4 bg-white border-b border-[#F0F0F0]">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center"
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-black">{title}</Text>
        <View className="w-10" />
      </View>

      {/* Content */}
      <View className="flex-1 items-center justify-center px-10">
        <MaterialCommunityIcons name={icon as any} size={80} color="#E5E5E5" />
        <Text className="text-2xl font-bold text-black mt-6 mb-3 text-center">{title}</Text>
        <Text className="text-base text-[#666] text-center leading-6">
          This feature is coming soon. We're working hard to bring you the best experience.
        </Text>
      </View>
    </SafeAreaView>
  );
}
