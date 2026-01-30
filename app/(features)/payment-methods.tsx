import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AtmCardSvg } from '../../assets/images';
import { ROUTES } from '../../src/constants';

interface PaymentCard {
  id: string;
  type: 'visa' | 'mastercard';
  last4: string;
  cardHolder: string;
  expiryDate: string;
}

export default function PaymentMethodsScreen() {
  const router = useRouter();
  const [cards, setCards] = useState<PaymentCard[]>([
    {
      id: '1',
      type: 'visa',
      last4: '8014',
      cardHolder: 'Apple Inc',
      expiryDate: '08/27',
    },
  ]);

  const handleAddCard = () => {
    router.push(ROUTES.FEATURES.ADD_PAYMENT_METHOD);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8FB]" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-5 py-4 bg-[#F8F8FB]" style={{ paddingTop: Platform.OS === 'ios' ? 0 : 40 }}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-black ml-2">Payment Methods</Text>
      </View>

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 24, paddingBottom: 100 }}
      >
        {/* Payment Cards */}
        {cards.map((card) => (
          <View
            key={card.id}
            className="mb-4 relative"
            
          >
            {/* ATM Card SVG */}
            <AtmCardSvg width="100%" height={234} />

            {/* Action Buttons Overlay */}
            {/* <View className="absolute top-3 right-3 flex-row items-center">
              <TouchableOpacity
                className="mr-2"
                activeOpacity={0.7}
                onPress={() => console.log('Edit card')}
              >
                <MaterialCommunityIcons name="pencil-circle" size={28} color="#FFF" />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => console.log('Delete card')}
              >
                <MaterialCommunityIcons name="information" size={28} color="#FFF" />
              </TouchableOpacity>
            </View> */}
          </View>
        ))}
      </ScrollView>

      {/* Add Card Button */}
      <View className="absolute bottom-8 right-5">
        <TouchableOpacity
          onPress={handleAddCard}
          activeOpacity={0.8}
          className="w-14 h-14 rounded-full items-center justify-center"
          style={{
            backgroundColor: '#5EBD3E',
            shadowColor: '#5EBD3E',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          <MaterialCommunityIcons name="plus" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
