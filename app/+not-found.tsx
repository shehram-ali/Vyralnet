import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ROUTES } from '../src/constants';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-100 justify-center items-center p-5">
      <View className="bg-white rounded-2xl p-8 items-center max-w-md w-full shadow-lg">
        <MaterialCommunityIcons
          name="alert-circle-outline"
          size={120}
          color="#6200EE"
          className="mb-4"
        />

        <Text className="text-6xl font-bold text-purple-600 mb-2">
          404
        </Text>

        <Text className="text-2xl font-semibold text-gray-800 mb-3">
          Page Not Found
        </Text>

        <Text className="text-base text-center text-gray-600 mb-8 leading-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </Text>

        <View className="w-full gap-3">
          <TouchableOpacity
            className="bg-purple-600 rounded-lg py-4 px-6 w-full flex-row items-center justify-center"
            onPress={() => router.replace(ROUTES.TABS.HOME)}
          >
            <MaterialCommunityIcons name="home" size={20} color="white" />
            <Text className="text-white font-semibold ml-2 text-base">
              Go to Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="border-2 border-purple-600 rounded-lg py-4 px-6 w-full flex-row items-center justify-center"
            onPress={() => router.back()}
          >
            <MaterialCommunityIcons name="arrow-left" size={20} color="#6200EE" />
            <Text className="text-purple-600 font-semibold ml-2 text-base">
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
