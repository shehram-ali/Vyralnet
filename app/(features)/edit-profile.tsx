import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SuccessBottomSheet } from '../../src/components';

export default function EditProfileScreen() {
  const router = useRouter();
  const [brandName, setBrandName] = useState('John Doe');
  const [businessInfo, setBusinessInfo] = useState('');
  const [location, setLocation] = useState('San Francisco, CA');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleUpdateProfile = () => {
    // Handle profile update logic here
    console.log('Profile updated:', { brandName, businessInfo, location });
    setShowSuccessModal(true);
  };

  const handleContinue = () => {
    setShowSuccessModal(false);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8FB]" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-5 py-4 pt-10 bg-[#F8F8FB]">
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-black ml-2">Edit Profile</Text>
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 24, paddingBottom: 40 }}
        >
          {/* Brand Name Card */}
          <View
            className="bg-white rounded-2xl px-4 py-4 mb-4"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 2,
            }}
          >
            <Text className="text-sm font-medium text-black mb-2">Brand Name</Text>
            <TextInput
              className="text-base text-gray-600"
              placeholder="John Doe"
              placeholderTextColor="#999"
              value={brandName}
              onChangeText={setBrandName}
            />
          </View>

          {/* Business Info Card */}
          <View
            className="bg-white rounded-2xl px-4 py-4 mb-4"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 2,
            }}
          >
            <Text className="text-sm font-medium text-black mb-2">Business Info</Text>
            <TextInput
              className="text-base text-gray-600"
              placeholder="something about you..."
              placeholderTextColor="#999"
              value={businessInfo}
              onChangeText={setBusinessInfo}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              style={{ minHeight: 80 }}
            />
          </View>

          {/* Location Card */}
          <View
            className="bg-white rounded-2xl px-4 py-4 mb-4"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 2,
            }}
          >
            <View className="flex-row items-center justify-between">
              <TextInput
                className="flex-1 text-base text-gray-600"
                placeholder="San Francisco, CA"
                placeholderTextColor="#999"
                value={location}
                onChangeText={setLocation}
              />
              <TouchableOpacity activeOpacity={0.7}>
                <MaterialCommunityIcons name="map-marker-outline" size={24} color="#999" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Update Profile Button */}
        <View className="px-5 pb-6">
          <TouchableOpacity
            onPress={handleUpdateProfile}
            activeOpacity={0.8}
            className="rounded-2xl py-4 items-center"
            style={{ backgroundColor: '#5EBD3E' }}
          >
            <Text className="text-base font-semibold text-white">Update Profile</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Success Bottom Sheet */}
      <SuccessBottomSheet
        visible={showSuccessModal}
        title="Profile Updated!"
        message="Your profile has been updated successfully."
        buttonText="Continue"
        onButtonPress={handleContinue}
        onClose={handleContinue}
      />
    </SafeAreaView>
  );
}
