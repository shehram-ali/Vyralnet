import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ROUTES } from '../../src/constants';
import { SignupHero, DocumentSvg, MegaphoneSvg } from '../../assets/images';

type AccountType = 'brand' | 'influencer' | null;

const { height } = Dimensions.get('window');

export default function SignupOptionsScreen() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<AccountType>(null);

  const handleSelectAccountType = (type: AccountType) => {
    setSelectedType(type);

    // Navigate to common signup with account type
    if (type) {
      router.push({
        pathname: ROUTES.ONBOARDING.COMMON_SIGNUP,
        params: { accountType: type }
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8FB]" edges={['top']}>
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
   
      >
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-4 left-4 z-10 bg-white/80 rounded-full p-2"
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="chevron-left" size={28} color="#000" />
        </TouchableOpacity>

        {/* Hero Image Section - 50% Screen Height */}
        <View style={{ height: height * 0.5 }}>
          <Image
            source={SignupHero}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        </View>

        {/* Bottom Content Section - Minimum 50% Screen Height */}
        <View
          style={{ minHeight: height * 0.5 }}
          className="bg-[#F8F8FB] pb-14 rounded-t-3xl -mt-6 px-6 pt-8 "
        >
          {/* Heading */}
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            Let's Get Started
          </Text>

          {/* Subtitle */}
          <Text className="text-base text-gray-600 mb-8">
            What type of account you would like to create?
          </Text>

          {/* Account Type Cards */}
          <View className="gap-4 ">
            
            {/* Brand Card */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleSelectAccountType('brand')}
              className={`bg-white rounded-2xl p-5 flex-row items-start shadow-md border-2 ${
                selectedType === 'brand' ? 'border-purple-600' : 'border-transparent'
              }`}
            >
              <LinearGradient
                colors={['#D0C0E8', '#5412B6']}
                start={[0, 0]}
                end={[0, 1]}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16,
                }}
              >
                <DocumentSvg width={32} height={32} />
              </LinearGradient>

              <View className="flex-1">
                <Text className="text-xl font-semibold text-gray-900 mb-1">
                  Brand
                </Text>
                <Text className="text-sm text-gray-600 leading-5">
                  I want to turn my products into social media conversations everyone talks about.
                </Text>
              </View>
            </TouchableOpacity>

            {/* Influencer Card */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleSelectAccountType('influencer')}
              className={`bg-white rounded-2xl p-5 flex-row items-start shadow-md border-2 ${
                selectedType === 'influencer' ? 'border-orange-500' : 'border-transparent'
              }`}
            >
              <LinearGradient
                colors={['#EFD2B9', '#D76F0E']}
                start={[0, 0]}
                end={[0, 1]}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16,
                }}
              >
                <MegaphoneSvg width={32} height={32} />
              </LinearGradient>

              <View className="flex-1">
                <Text className="text-xl font-semibold text-gray-900 mb-1">
                  Influencer
                </Text>
                <Text className="text-sm text-gray-600 leading-5">
                  I want to compete in brand-sponsored Instagram tournaments — and get paid to win.
                </Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

