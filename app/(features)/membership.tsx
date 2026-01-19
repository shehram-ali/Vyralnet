import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MembershipScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8FB]" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-5 pt-10 py-4 bg-[#F8F8FB]">
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-black ml-2">Membership</Text>
      </View>

      {/* Content */}
      <View className="flex-1 items-center justify-center px-5">
        <Text className="text-base text-[#6C6C6C] mb-2">Total Per Year</Text>
        <Text className="text-6xl font-medium text-[#006400] mb-4">$0.00</Text>
        <Text className="text-sm text-gray-500 mb-1">Your Plan Valid Upto</Text>
        <Text className="text-lg  text-black">Free</Text>
      </View>
    </SafeAreaView>
  );
}
