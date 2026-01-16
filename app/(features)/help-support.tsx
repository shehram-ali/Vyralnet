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
import * as DocumentPicker from 'expo-document-picker';
import { SuccessBottomSheet } from '../../src/components';

export default function HelpSupportScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [uploadedFile, setUploadedFile] = useState<any>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleUploadFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/jpeg', 'image/png', 'application/pdf'],
        copyToCacheDirectory: true,
      });

      if (result.canceled === false && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        // Check file size (5MB max)
        if (file.size && file.size <= 5 * 1024 * 1024) {
          setUploadedFile(file);
        } else {
          console.log('File too large. Max 5MB');
        }
      }
    } catch (error) {
      console.log('Error picking document:', error);
    }
  };

  const handleSubmitRequest = () => {
    // TODO: Submit support request
    console.log('Submitting request:', { name, email, subject, message, uploadedFile });
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
        <Text className="text-lg font-semibold text-black ml-2">Help & Support</Text>
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
          {/* Title and Description */}
          <Text className="text-xl font-bold text-black mb-2">
            Let's talk any suggestions & complaints
          </Text>
          <Text className="text-sm text-gray-500 mb-6">
            Have an idea or issue to report? Tell us what's working and what's not.
            Your voice shapes our continuous improvement.
          </Text>

          {/* Name Input */}
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
            <Text className="text-xs font-medium text-black mb-2">Name</Text>
            <TextInput
              className="text-sm text-gray-600"
              placeholder="John Doe"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Email Input */}
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
            <Text className="text-xs font-medium text-black mb-2">Email</Text>
            <TextInput
              className="text-sm text-gray-600"
              placeholder="John Doe"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Subject Input */}
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
            <Text className="text-xs font-medium text-black mb-2">Subject</Text>
            <TextInput
              className="text-sm text-gray-600"
              placeholder="John Doe"
              placeholderTextColor="#999"
              value={subject}
              onChangeText={setSubject}
            />
          </View>

          {/* Message Input */}
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
            <Text className="text-xs font-medium text-black mb-2">Your Message</Text>
            <TextInput
              className="text-sm text-gray-600"
              placeholder="Type your message here.."
              placeholderTextColor="#999"
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              style={{ minHeight: 120 }}
            />
          </View>

          {/* Upload File Section */}
          <Text className="text-xs font-medium text-gray-400 mb-3">Upload File</Text>
          <TouchableOpacity
            onPress={handleUploadFile}
            activeOpacity={0.8}
            className="bg-white rounded-2xl px-4 py-4 mb-4 flex-row items-center"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 2,
            }}
          >
            <View
              className="w-12 h-12 rounded-full items-center justify-center mr-4"
              style={{ backgroundColor: '#5EBD3E' }}
            >
              <MaterialCommunityIcons name="plus" size={24} color="#FFF" />
            </View>
            <View className="flex-1">
              {uploadedFile ? (
                <>
                  <Text className="text-base font-semibold text-black">
                    {uploadedFile.name}
                  </Text>
                  <Text className="text-xs text-gray-500">
                    {(uploadedFile.size / 1024).toFixed(2)} KB
                  </Text>
                </>
              ) : (
                <>
                  <Text className="text-base font-semibold text-black">Upload a file</Text>
                  <Text className="text-xs text-gray-500">JPG, PDF, PNG - Max 5mb</Text>
                </>
              )}
            </View>
          </TouchableOpacity>
        </ScrollView>

        {/* Submit Button */}
        <View className="px-5 pb-6">
          <TouchableOpacity
            onPress={handleSubmitRequest}
            activeOpacity={0.8}
            className="rounded-2xl py-4 items-center"
            style={{ backgroundColor: '#5EBD3E' }}
          >
            <Text className="text-base font-semibold text-white">Submit Request</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Success Bottom Sheet */}
      <SuccessBottomSheet
        visible={showSuccessModal}
        title="Request Submitted!"
        message="Your support request has been submitted successfully. We'll get back to you soon."
        buttonText="Continue"
        onButtonPress={handleContinue}
        onClose={handleContinue}
      />
    </SafeAreaView>
  );
}
