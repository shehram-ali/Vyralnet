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

export default function AddPaymentMethodScreen() {
  const router = useRouter();
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [showCvv, setShowCvv] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const formatCardNumber = (text: string) => {
    // Remove all non-digits
    const cleaned = text.replace(/\D/g, '');
    // Add space every 4 digits
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.substring(0, 19); // Max 16 digits + 3 spaces
  };

  const formatExpiry = (text: string) => {
    // Remove all non-digits
    const cleaned = text.replace(/\D/g, '');
    // Add slash after 2 digits
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const handleCardNumberChange = (text: string) => {
    setCardNumber(formatCardNumber(text));
  };

  const handleExpiryChange = (text: string) => {
    setExpiry(formatExpiry(text));
  };

  const handleSaveDetails = () => {
    // TODO: Validate and save card details
    console.log('Saving card details:', { cardholderName, cardNumber, expiry, cvv });
    setShowSuccessModal(true);
  };

  const handleContinue = () => {
    setShowSuccessModal(false);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8FB]" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-5 py-4 bg-[#F8F8FB]" style={{ paddingTop: Platform.OS === 'ios' ? 0 : 40 }}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-black ml-2">New Payment Method</Text>
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
          {/* Title */}
          <Text className="text-base font-medium text-black mb-6">Add new card details</Text>

          {/* Cardholder Name */}
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
            <Text className="text-xs font-medium text-black mb-2">Cardholder Name</Text>
            <TextInput
              className="text-sm text-gray-600"
              placeholder="John Doe"
              placeholderTextColor="#999"
              value={cardholderName}
              onChangeText={setCardholderName}
              autoCapitalize="words"
            />
          </View>

          {/* Card Number */}
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
            <Text className="text-xs font-medium text-black mb-2">Card Number</Text>
            <TextInput
              className="text-sm text-gray-600"
              placeholder="1234 5678 9012 1234"
              placeholderTextColor="#999"
              value={cardNumber}
              onChangeText={handleCardNumberChange}
              keyboardType="numeric"
              maxLength={19}
            />
          </View>

          {/* Expiry */}
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
            <Text className="text-xs font-medium text-black mb-2">Expiry</Text>
            <View className="flex-row items-center">
              <TextInput
                className="flex-1 text-sm text-gray-600"
                placeholder="08/27"
                placeholderTextColor="#999"
                value={expiry}
                onChangeText={handleExpiryChange}
                keyboardType="numeric"
                maxLength={5}
              />
              <MaterialCommunityIcons name="calendar-blank" size={20} color="#999" />
            </View>
          </View>

          {/* CVV */}
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
            <Text className="text-xs font-medium text-black mb-2">CVV</Text>
            <View className="flex-row items-center">
              <TextInput
                className="flex-1 text-sm text-gray-600"
                placeholder="***"
                placeholderTextColor="#999"
                value={cvv}
                onChangeText={setCvv}
                secureTextEntry={!showCvv}
                keyboardType="numeric"
                maxLength={4}
              />
              <TouchableOpacity
                onPress={() => setShowCvv(!showCvv)}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons
                  name={showCvv ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Save Details Button */}
        <View className="px-5 pb-6">
          <TouchableOpacity
            onPress={handleSaveDetails}
            activeOpacity={0.8}
            className="rounded-2xl py-4 items-center"
            style={{ backgroundColor: '#5EBD3E' }}
          >
            <Text className="text-base font-semibold text-white">Save Details</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Success Bottom Sheet */}
      <SuccessBottomSheet
        visible={showSuccessModal}
        title="Card Added!"
        message="Your payment method has been added successfully."
        buttonText="Continue"
        onButtonPress={handleContinue}
        onClose={handleContinue}
      />
    </SafeAreaView>
  );
}
