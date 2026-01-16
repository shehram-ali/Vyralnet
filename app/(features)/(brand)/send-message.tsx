import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Frame1984077131Svg } from '../../../assets/images';

export default function SendMessageScreen() {
  const router = useRouter();
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    console.log('Send message:', message);
    // Send message logic
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-200">
          <View className="flex-row items-center flex-1">
            <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
              <MaterialCommunityIcons name="chevron-left" size={28} color="#000" />
            </TouchableOpacity>
            <Text className="text-lg font-medium text-black ml-2">Send Message</Text>
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Influencer Info */}
          <View className="px-5 pt-6 pb-4">
            <View className="flex-row items-center">
              <View style={{ width: 60, height: 60 }}>
                <Frame1984077131Svg width={60} height={60} />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-lg font-bold text-black">Eten Hunt</Text>
                <Text className="text-sm text-[#6C727F]">@eten_hunt_1235</Text>
              </View>
            </View>
          </View>

          {/* Message Input */}
          <View className="px-5 pt-4">
            <Text className="text-base font-semibold text-black mb-3">Message</Text>
            <View
              className="bg-white border border-gray-200 rounded-2xl p-4"
              style={{ minHeight: 200 }}
            >
              <TextInput
                className="text-base text-black"
                placeholder="Type your message here..."
                placeholderTextColor="#999"
                value={message}
                onChangeText={setMessage}
                multiline
                textAlignVertical="top"
                style={{ minHeight: 160 }}
              />
            </View>
          </View>
        </ScrollView>

        {/* Send Button */}
        <View className="px-5 py-4 border-t border-gray-200">
          <TouchableOpacity
            onPress={handleSendMessage}
            activeOpacity={0.8}
            className="rounded-2xl py-4 items-center"
            style={{ backgroundColor: '#5EBD3E' }}
          >
            <Text className="text-base font-semibold text-white">Send Message</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
