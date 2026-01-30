import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions, StatusBar, Platform } from 'react-native';
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
        pathname: ROUTES.AUTH.SIGNUP,
        params: { accountType: type }
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F8FB' }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.replace(ROUTES.AUTH.LOGIN)}
        style={{
          position: 'absolute',
          top: Platform.OS === 'ios' ? 60 : 60,
          left: 10,
          zIndex: 10,
          padding: 8,
        }}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons name="chevron-left" size={30} color="#000" />
      </TouchableOpacity>

      {/* Top Section with Gradient and Hero Image */}
      <LinearGradient
        colors={['rgba(193, 151, 186, 0.3)', 'rgba(193, 151, 186, 0.3)', 'rgba(193, 151, 186, 0.3)', 'rgba(252, 193, 132, 0.3)']}
        locations={[0, 0.2, 0.49, 0.99]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={{
          width: '100%',
          height: height * 0.6,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          source={SignupHero}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      </LinearGradient>

      {/* Bottom Content - Absolutely Positioned */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#F8F8FB',
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          paddingHorizontal: 24,
          paddingTop: 32,
          paddingBottom: 56,
          minHeight: height * 0.48,
        }}
      >
        {/* Heading */}
        <Text style={{ fontSize: 24, fontWeight: '600', color: '#1D1C1C', marginBottom: 8 }}>
          Let's Get Started
        </Text>

        {/* Subtitle */}
        <Text style={{ fontSize: 16, fontWeight: '400', color: '#6C727F', marginBottom: 32 }}>
          What type of account you would like to create?
        </Text>

          {/* Account Type Cards */}
          <View className="gap-4 ">
            
            {/* Brand Card */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleSelectAccountType('brand')}
              className={`bg-white rounded-2xl p-5 flex-row items-start shadow-sm border-2 ${
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
                <Text className="text-xl font-semibold text-[#1D1C1C] mb-1">
                  Brand
                </Text>
                <Text className="text-xs font-normal text-[#6C727F] leading-5">
I want to turn my products into social media competitions everyone talks about.                </Text>
              </View>
            </TouchableOpacity>

            {/* Influencer Card */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleSelectAccountType('influencer')}
              className={`bg-white rounded-2xl p-4 flex-row items-start shadow-sm border-2 ${
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
                <Text className="text-xl font-semibold text-[#1D1C1C] mb-1">
                  Influencer
                </Text>
                <Text className="text-xs font-normal text-[#6C727F] leading-5">
                  I want to compete in brand-sponsored Instagram tournaments — and get paid to win.
                </Text>
              </View>
            </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}

