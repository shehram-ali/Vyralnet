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
import AlertNotification from '../../src/components/common/AlertNotification';

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
  const [errors, setErrors] = useState({
    fullName: '',
    bio: '',
    location: '',
    categories: '',
    advertisingPrice: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [alert, setAlert] = useState<{
    visible: boolean;
    type: 'success' | 'warning' | 'error';
    message: string;
  }>({
    visible: false,
    type: 'error',
    message: '',
  });

  const showAlert = (type: 'success' | 'warning' | 'error', message: string) => {
    setAlert({ visible: true, type, message });
    setTimeout(() => {
      setAlert((prev) => ({ ...prev, visible: false }));
    }, 5000);
  };

  const handleConnectInstagram = () => {
    // TODO: Implement Instagram OAuth
    setInstagramConnected(true);
    showAlert('success', 'Instagram connected successfully!');
    console.log('Connect Instagram');
  };

  const handleContinue = async () => {
    // Reset errors
    setErrors({ fullName: '', bio: '', location: '', categories: '', advertisingPrice: '' });

    // Validate Full Name
    if (!fullName.trim()) {
      setErrors((prev) => ({ ...prev, fullName: 'Full name is required' }));
      showAlert('error', 'Full name is required');
      return;
    }
    if (fullName.trim().length < 2) {
      setErrors((prev) => ({ ...prev, fullName: 'Full name must be at least 2 characters' }));
      showAlert('error', 'Full name must be at least 2 characters');
      return;
    }
    if (fullName.trim().length > 50) {
      setErrors((prev) => ({ ...prev, fullName: 'Full name must not exceed 50 characters' }));
      showAlert('error', 'Full name must not exceed 50 characters');
      return;
    }

    // Validate Bio
    if (!bio.trim()) {
      setErrors((prev) => ({ ...prev, bio: 'Bio is required' }));
      showAlert('error', 'Please provide a bio');
      return;
    }
    if (bio.trim().length < 10) {
      setErrors((prev) => ({ ...prev, bio: 'Bio must be at least 10 characters' }));
      showAlert('error', 'Bio should be at least 10 characters');
      return;
    }
    if (bio.trim().length > 500) {
      setErrors((prev) => ({ ...prev, bio: 'Bio must not exceed 500 characters' }));
      showAlert('error', 'Bio is too long (max 500 characters)');
      return;
    }

    // Validate Location
    if (!location.trim()) {
      setErrors((prev) => ({ ...prev, location: 'Location is required' }));
      showAlert('error', 'Location is required');
      return;
    }
    if (location.trim().length < 2) {
      setErrors((prev) => ({ ...prev, location: 'Please enter a valid location' }));
      showAlert('error', 'Please enter a valid location');
      return;
    }

    // Validate Categories
    if (selectedCategories.length === 0) {
      setErrors((prev) => ({ ...prev, categories: 'Please select at least one category' }));
      showAlert('error', 'Please select at least one category');
      return;
    }

    // Validate Advertising Price
    if (!advertisingPrice.trim()) {
      setErrors((prev) => ({ ...prev, advertisingPrice: 'Advertising price is required' }));
      showAlert('error', 'Advertising price is required');
      return;
    }
    const priceNum = parseFloat(advertisingPrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      setErrors((prev) => ({ ...prev, advertisingPrice: 'Please enter a valid price' }));
      showAlert('error', 'Please enter a valid price greater than 0');
      return;
    }
    if (priceNum > 1000000) {
      setErrors((prev) => ({ ...prev, advertisingPrice: 'Price seems unreasonably high' }));
      showAlert('error', 'Price seems unreasonably high');
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
      showAlert('success', 'Profile completed successfully!');
      setTimeout(() => {
        setShowSuccessModal(true);
      }, 1000);
    } catch (error) {
      console.error('Error during signup:', error);
      setIsLoading(false);
      showAlert('error', 'An error occurred. Please try again.');
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    router.replace(ROUTES.TABS.HOME);
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#F8F8F8' }} edges={['top']}>
      {/* Alert Notification */}
      {alert.visible && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50 }}>
          <AlertNotification
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert((prev) => ({ ...prev, visible: false }))}
            visible={alert.visible}
          />
        </View>
      )}

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className="flex-1">
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 40, paddingBottom: 140 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginBottom: 8 }}>
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
                  setErrors((prev) => ({ ...prev, fullName: '' }));
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
                onChangeText={(text) => {
                  setBio(text);
                  setErrors((prev) => ({ ...prev, bio: '' }));
                }}
                multiline
                textAlignVertical="top"
              />
              {errors.bio ? (
                <Text style={{ fontSize: 12, color: '#F44336', marginTop: 8 }}>
                  {errors.bio}
                </Text>
              ) : null}
            </View>

            {/* Location Card */}
            <View style={{ marginBottom: 16 }}>
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 16,
                  paddingHorizontal: 12,
                  paddingVertical: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
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
                  onChangeText={(text) => {
                    setLocation(text);
                    setErrors((prev) => ({ ...prev, location: '' }));
                  }}
                />
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <LocationIconSvg width={20} height={20} />
                </View>
              </View>
              {errors.location ? (
                <Text style={{ fontSize: 12, color: '#F44336', marginTop: 8, marginLeft: 12 }}>
                  {errors.location}
                </Text>
              ) : null}
            </View>

            {/* Category Card */}
            <View style={{ marginBottom: 16 }}>
              <TouchableOpacity
                onPress={() => {
                  setShowCategoryModal(true);
                  setErrors((prev) => ({ ...prev, categories: '' }));
                }}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 16,
                  paddingHorizontal: 12,
                  paddingVertical: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
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
              {errors.categories ? (
                <Text style={{ fontSize: 12, color: '#F44336', marginTop: 8, marginLeft: 12 }}>
                  {errors.categories}
                </Text>
              ) : null}
            </View>

            {/* Advertising Price Card */}
            <View style={{ marginBottom: 16 }}>
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 16,
                  padding: 12,
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
                  onChangeText={(text) => {
                    setAdvertisingPrice(text);
                    setErrors((prev) => ({ ...prev, advertisingPrice: '' }));
                  }}
                  keyboardType="numeric"
                />
              </View>
              {errors.advertisingPrice ? (
                <Text style={{ fontSize: 12, color: '#F44336', marginTop: 8, marginLeft: 12 }}>
                  {errors.advertisingPrice}
                </Text>
              ) : null}
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
