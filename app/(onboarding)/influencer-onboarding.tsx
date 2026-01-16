import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CategorySelector, LoadingSpinner, SuccessModal } from '../../src/components';
import { ROUTES } from '../../src/constants';
import { useAuth } from '../../src/hooks/useAuth';
import { LocationIconSvg, IconsPlusSvg } from '../../assets/images';

export default function InfluencerOnboardingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { signup } = useAuth();
  const email = params.email as string;
  const password = params.password as string;

  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [advertisingPrice, setAdvertisingPrice] = useState('');
  const [instagramConnected, setInstagramConnected] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [errors, setErrors] = useState({ fullName: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleConnectInstagram = () => {
    // TODO: Implement Instagram OAuth
    setInstagramConnected(true);
    console.log('Connect Instagram');
  };

  const handleContinue = async () => {
    if (!fullName.trim()) {
      setErrors({ fullName: 'Full name is required' });
      return;
    }
    if (fullName.trim().length < 2) {
      setErrors({ fullName: 'Full name must be at least 2 characters' });
      return;
    }

    try {
      // Show loading spinner
      setIsLoading(true);

      // Save user data to AsyncStorage via auth context
      await signup({
        email,
        userType: 'influencer',
        name: fullName,
        bio,
        location,
        categories: selectedCategories,
        advertisingPrice,
        instagramUsername: instagramConnected ? 'connected' : undefined,
      });

      // Hide loading and show success modal
      setIsLoading(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error during signup:', error);
      setIsLoading(false);
      alert('An error occurred. Please try again.');
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    router.replace(ROUTES.TABS.HOME);
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#F8F8F8' }} edges={['top']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className="flex-1">
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 40, paddingBottom: 140 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#000', marginBottom: 8 }}>
              Join Our Influencer Community
            </Text>
            <Text style={{ fontSize: 14, color: '#999', marginBottom: 40 }}>
              Let's setup your profile first....
            </Text>

            {/* Full Name Card */}
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 16,
                padding: 12,
                marginBottom: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#000', marginBottom: 12 }}>
                Full Name
              </Text>
              <TextInput
                style={{ fontSize: 16, color: '#999', padding: 0 }}
                placeholder="John Doe"
                placeholderTextColor="#999"
                value={fullName}
                onChangeText={(text) => {
                  setFullName(text);
                  setErrors({ fullName: '' });
                }}
              />
              {errors.fullName ? (
                <Text style={{ fontSize: 12, color: '#F44336', marginTop: 8 }}>
                  {errors.fullName}
                </Text>
              ) : null}
            </View>

            {/* Bio Card */}
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 16,
                padding: 12,
                marginBottom: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
                minHeight: 150,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#000', marginBottom: 12 }}>
                Bio
              </Text>
              <TextInput
                style={{ fontSize: 16, color: '#999', padding: 0, minHeight: 80 }}
                placeholder="something about you..."
                placeholderTextColor="#999"
                value={bio}
                onChangeText={setBio}
                multiline
                textAlignVertical="top"
              />
            </View>

            {/* Location Card */}
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 16,
                paddingHorizontal: 12,
                paddingVertical: 12,
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <TextInput
                style={{ flex: 1, fontSize: 16, color: '#999', padding: 0 }}
                placeholder="Location"
                placeholderTextColor="#999"
                value={location}
                onChangeText={setLocation}
              />
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <LocationIconSvg width={20} height={20} />
              </View>
            </View>

            {/* Category Card */}
            <TouchableOpacity
              onPress={() => setShowCategoryModal(true)}
              style={{
                backgroundColor: 'white',
                borderRadius: 16,
                paddingHorizontal: 12,
                paddingVertical: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}
              activeOpacity={0.7}
            >
              <Text style={{ fontSize: 16, color: selectedCategories.length > 0 ? '#000' : '#999' }}>
                {selectedCategories.length > 0
                  ? selectedCategories.join(', ')
                  : 'Category'}
              </Text>
              <MaterialCommunityIcons name="chevron-down" size={20} color="#999" />
            </TouchableOpacity>

            {/* Advertising Price Card */}
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 16,
                padding: 12,
                marginBottom: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <TextInput
                style={{ fontSize: 16, color: '#999', padding: 0 }}
                placeholder="Advertising Price"
                placeholderTextColor="#999"
                value={advertisingPrice}
                onChangeText={setAdvertisingPrice}
                keyboardType="numeric"
              />
            </View>

            {/* Connect Instagram Card */}
            <TouchableOpacity
              onPress={handleConnectInstagram}
              style={{
                backgroundColor: 'white',
                borderRadius: 16,
                paddingHorizontal: 12,
                paddingVertical: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}
              activeOpacity={0.7}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    backgroundColor: '#E1306C',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                    IG
                  </Text>
                </View>
                <Text style={{ fontSize: 16, color: '#000' }}>
                  {instagramConnected ? 'Instagram Connected' : 'Connect Instagram'}
                </Text>
              </View>
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: instagramConnected ? '#4CAF50' : '#E5E5E5',
                  backgroundColor: instagramConnected ? '#4CAF50' : 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {instagramConnected ? (
                  <Text style={{ color: 'white', fontSize: 16 }}>✓</Text>
                ) : (
                  <IconsPlusSvg width={12} height={12} />
                )}
              </View>
            </TouchableOpacity>
          </ScrollView>

          {/* Continue Button - Fixed at bottom */}
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              paddingHorizontal: 20,
              paddingVertical: 20,
              backgroundColor: '#F8F8F8',
            }}
          >
            <TouchableOpacity
              onPress={handleContinue}
              style={{
                backgroundColor: '#4CAF50',
                borderRadius: 16,
                paddingVertical: 18,
                alignItems: 'center',
              }}
              activeOpacity={0.8}
            >
              <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Category Selector Modal */}
        <CategorySelector
          visible={showCategoryModal}
          onClose={() => setShowCategoryModal(false)}
          selectedCategories={selectedCategories}
          onSelectCategories={setSelectedCategories}
        />

        {/* Loading Spinner */}
        <LoadingSpinner visible={isLoading} />

        {/* Success Modal */}
        <SuccessModal
          visible={showSuccessModal}
          onClose={handleSuccessModalClose}
          title="Thanks for completing your profile!"
          description="Your influencer profile has been successfully created. Start exploring brands and joining tournaments!"
          buttonText="Continue"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
