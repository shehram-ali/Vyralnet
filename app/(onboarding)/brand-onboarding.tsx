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
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { ROUTES } from '../../src/constants';
import { LoadingSpinner, SuccessModal } from '../../src/components';
import { useAuth } from '../../src/hooks/useAuth';
import { UploadImage, LocationIconSvg } from '../../assets/images';

export default function BrandOnboardingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { signup } = useAuth();
  const email = params.email as string;
  const password = params.password as string;

  const [brandLogo, setBrandLogo] = useState<string | null>(null);
  const [brandName, setBrandName] = useState('');
  const [businessInfo, setBusinessInfo] = useState('');
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState({ brandName: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to upload your brand logo!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setBrandLogo(result.assets[0].uri);
    }
  };

  const handleContinue = async () => {
    if (!brandName.trim()) {
      setErrors({ brandName: 'Brand name is required' });
      return;
    }
    if (brandName.trim().length < 2) {
      setErrors({ brandName: 'Brand name must be at least 2 characters' });
      return;
    }

    try {
      // Show loading spinner
      setIsLoading(true);

      // Save user data to AsyncStorage via auth context
      await signup({
        email,
        userType: 'brand',
        name: brandName,
        brandName,
        businessInfo,
        location,
        logo: brandLogo || undefined,
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
              Empower Your Brand with Creators
            </Text>
            <Text style={{ fontSize: 14, color: '#999', marginBottom: 40 }}>
              Let's setup your profile first....
            </Text>

            {/* Logo Upload with Badge */}
            <View style={{ alignItems: 'center', marginBottom: 50 }}>
              <View style={{ position: 'relative' }}>
                <TouchableOpacity
                  onPress={pickImage}
                  style={{
                    width: 104,
                    height: 104,
                    borderRadius: 60,
                    backgroundColor: '#1E1B4B',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  activeOpacity={0.8}
                >
               
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                
                       <Image source={UploadImage} style={{ width: 104, height: 104 }} resizeMode="contain" />
                   
                    </View>
                 
                </TouchableOpacity>

                {/* Green Edit Badge */}
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: '#4CAF50',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 3,
                    borderColor: '#F8F8F8',
                  }}
                >
                  <MaterialCommunityIcons name="pencil" size={18} color="white" />
                </View>
              </View>
              <Text style={{ fontSize: 14, color: '#999', marginTop: 12 }}>
                Upload Brand logo
              </Text>
            </View>

            {/* Brand Name Card */}
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
                Brand Name
              </Text>
              <TextInput
                style={{ fontSize: 16, color: '#999', padding: 0 }}
                placeholder="John Doe"
                placeholderTextColor="#999"
                value={brandName}
                onChangeText={(text) => {
                  setBrandName(text);
                  setErrors({ brandName: '' });
                }}
              />
              {errors.brandName ? (
                <Text style={{ fontSize: 12, color: '#F44336', marginTop: 8 }}>
                  {errors.brandName}
                </Text>
              ) : null}
            </View>

            {/* Business Info Card */}
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
                Business Info
              </Text>
              <TextInput
                style={{ fontSize: 16, color: '#999', padding: 0, minHeight: 80 }}
                placeholder="something about you..."
                placeholderTextColor="#999"
                value={businessInfo}
                onChangeText={setBusinessInfo}
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

        {/* Loading Spinner */}
        <LoadingSpinner visible={isLoading} />

        {/* Success Modal */}
        <SuccessModal
          visible={showSuccessModal}
          onClose={handleSuccessModalClose}
          title="Thanks for completing your profile!"
          description="Your brand details have been saved successfully. You can now explore creators, post challenges, and start collaborating."
          buttonText="Continue"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
