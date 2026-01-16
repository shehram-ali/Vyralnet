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

export default function ChangePasswordScreen() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChangePassword = () => {
    // Validate passwords match
    if (newPassword !== confirmPassword) {
      console.log('Passwords do not match');
      return;
    }
    // Handle password change logic here
    console.log('Password changed successfully');
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
        <Text className="text-md font-semibold text-black ml-2">Change Password</Text>
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
          {/* Current Password Card */}
          <View
            className="bg-white rounded-2xl px-3 py-3 mb-4"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 2,
            }}
          >
            <Text className="text-xs font-medium text-black mb-2">Current Password</Text>
            <View className="flex-row items-center">
              <TextInput
                className="flex-1 text-sm text-gray-400"
                placeholder="************"
                placeholderTextColor="#999797"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry={!showCurrentPassword}
              />
              <TouchableOpacity
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons
                  name={showCurrentPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={24}
                  color="#000000"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* New Password Card */}
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
            <Text className="text-xs font-medium text-black mb-2">New Password</Text>
            <View className="flex-row items-center">
              <TextInput
                className="flex-1 text-sm text-gray-400"
                placeholder="************"
                placeholderTextColor="#999797"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNewPassword}
              />
              <TouchableOpacity
                onPress={() => setShowNewPassword(!showNewPassword)}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons
                  name={showNewPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={24}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password Card */}
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
            <Text className="text-xs font-medium text-black mb-2">Confirm Password</Text>
            <View className="flex-row items-center">
              <TextInput
                className="flex-1 text-sm text-gray-400"
                placeholder="************"
                placeholderTextColor="#999797"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons
                  name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={24}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Change Password Button */}
        <View className="px-5 pb-6">
          <TouchableOpacity
            onPress={handleChangePassword}
            activeOpacity={0.8}
            className="rounded-2xl py-4 items-center"
            style={{ backgroundColor: '#5EBD3E' }}
          >
            <Text className="text-base font-semibold text-white">Change Password</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Success Bottom Sheet */}
      <SuccessBottomSheet
        visible={showSuccessModal}
        title="Password Changed!"
        message="Your password has been changed successfully."
        buttonText="Continue"
        onButtonPress={handleContinue}
        onClose={handleContinue}
      />
    </SafeAreaView>
  );
}
