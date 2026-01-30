import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ConfirmationBottomSheet } from '../../src/components';

export default function DeleteAccountScreen() {
  const router = useRouter();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleDeleteAccount = () => {
    if (isConfirmed) {
      setShowConfirmationModal(true);
    }
  };

  const handleContinueDelete = () => {
    setShowConfirmationModal(false);
    // TODO: Perform actual account deletion
    console.log('Account deleted');
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8FB]" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-5 py-4 bg-[#F8F8FB]" style={{ paddingTop: Platform.OS === 'ios' ? 0 : 40 }}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-black ml-2">Delete Account</Text>
      </View>

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 24, paddingBottom: 40 }}
      >
        {/* Lorem Ipsum Text 1 */}
        <Text className="text-sm text-gray-700 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
          molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
          accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.
          Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti
          sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
          Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec
          ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel
          bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in
          elementum tellus.
        </Text>

        {/* Lorem Ipsum Text 2 */}
        <Text className="text-sm text-gray-700 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
          molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
          accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.
          Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti
          sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
          Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec
          ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel
          bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in
          elementum tellus.
        </Text>

        {/* Lorem Ipsum Text 3 */}
        <Text className="text-sm text-gray-700 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
          molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
          accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.
        </Text>

        {/* Confirmation Checkbox */}
        <TouchableOpacity
          onPress={() => setIsConfirmed(!isConfirmed)}
          activeOpacity={0.7}
          className="flex-row items-center mb-6"
        >
          <View
            className="w-6 h-6 rounded mr-3 items-center justify-center"
            style={{
              backgroundColor: isConfirmed ? '#5EBD3E' : 'transparent',
              borderWidth: isConfirmed ? 0 : 2,
              borderColor: '#999',
            }}
          >
            {isConfirmed && (
              <MaterialCommunityIcons name="check" size={18} color="#FFF" />
            )}
          </View>
          <Text className="text-base text-gray-800 flex-1">
            I confirm that i want to delete my account
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Delete Account Button */}
      <View className="px-5 pb-6">
        <TouchableOpacity
          onPress={handleDeleteAccount}
          activeOpacity={0.8}
          disabled={!isConfirmed}
          className="rounded-2xl py-4 items-center"
          style={{
            backgroundColor: isConfirmed ? '#5EBD3E' : '#D3D3D3',
          }}
        >
          <Text className="text-base font-semibold text-white">Delete Account</Text>
        </TouchableOpacity>
      </View>

      {/* Confirmation Bottom Sheet */}
      <ConfirmationBottomSheet
        visible={showConfirmationModal}
        title="Delete Account"
        message="Once deleted, your account and data can't be recovered. Are you sure you want to continue?"
        buttonText="Continue"
        onButtonPress={handleContinueDelete}
        onClose={() => setShowConfirmationModal(false)}
      />
    </SafeAreaView>
  );
}
