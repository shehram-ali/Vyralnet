import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ChallengePaymentTabProps {
  cardNumber: string;
  setCardNumber: (value: string) => void;
  expiryDate: string;
  setExpiryDate: (value: string) => void;
  cvv: string;
  setCvv: (value: string) => void;
  startDate: Date | null;
  challengeTitle: string;
  budget: string;
  onContinue: () => void;
}

export default function ChallengePaymentTab({
  cardNumber,
  setCardNumber,
  expiryDate,
  setExpiryDate,
  cvv,
  setCvv,
  startDate,
  challengeTitle,
  budget,
  onContinue,
}: ChallengePaymentTabProps) {
  return (
    <>
      <Text className="text-sm text-[#6C727F] mb-6">Enter your payment details</Text>

      {/* Card Number */}
      <View className="bg-white border border-gray-200 rounded-xl px-3 py-3 mb-4">
        <TextInput
          className="text-base text-black"
          placeholder="Card Number"
          placeholderTextColor="#999"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="numeric"
          maxLength={16}
        />
      </View>

      {/* Expiry Date */}
      <View className="bg-white border border-gray-200 rounded-xl px-4 py-3 mb-4 flex-row items-center justify-between">
        <TextInput
          className="text-base text-black flex-1"
          placeholder="Expiry Date"
          placeholderTextColor="#999"
          value={expiryDate}
          onChangeText={setExpiryDate}
          keyboardType="numeric"
          maxLength={5}
        />
        <MaterialCommunityIcons name="calendar" size={24} color="#999" />
      </View>

      {/* CVV */}
      <View className="bg-white border border-gray-200 rounded-xl px-4 py-3 mb-6">
        <TextInput
          className="text-base text-black"
          placeholder="CVV"
          placeholderTextColor="#999"
          value={cvv}
          onChangeText={setCvv}
          keyboardType="numeric"
          maxLength={3}
          secureTextEntry
        />
      </View>

      {/* Review Amount */}
      <Text className="text-md font-semibold text-black mb-4">Review Amount</Text>
      <View className="rounded-xl p-5 mb-6" style={{ backgroundColor: '#EEFBE9' }}>
        <View className="flex-row justify-between mb-3">
          <Text className="text-xs text-black">Date</Text>
          <Text className="text-sm font-medium text-black">
            {startDate ? startDate.toLocaleDateString('en-GB') : '15/11/2025'}
          </Text>
        </View>

        <View className="flex-row justify-between mb-3">
          <Text className="text-xs text-black">Challenge ID</Text>
          <Text className="text-sm font-medium text-black">C1234689</Text>
        </View>

        <View className="flex-row justify-between mb-3">
          <Text className="text-xs text-black">Challenge Title</Text>
          <Text className="text-sm font-medium text-black">
            {challengeTitle || 'Expert Influencer Required'}
          </Text>
        </View>

        <View className="flex-row justify-between mb-3">
          <Text className="text-xs text-black">Challenge Budget</Text>
          <Text className="text-sm font-medium text-black">${budget || '100'}</Text>
        </View>

        <View className="flex-row justify-between mb-3">
          <Text className="text-xs text-black">Tax</Text>
          <Text className="text-sm font-medium text-black">$2.5</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-xs text-black">Platform Fee</Text>
          <Text className="text-sm font-medium text-black">Free</Text>
        </View>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        onPress={onContinue}
        activeOpacity={0.8}
        className="rounded-2xl py-4 items-center"
        style={{ backgroundColor: '#5EBD3E' }}
      >
        <Text className="text-base font-semibold text-white">Continue</Text>
      </TouchableOpacity>
    </>
  );
}
