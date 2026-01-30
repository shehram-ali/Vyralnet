import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  StatusBar,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { ROUTES } from '../../src/constants';
import { LoadingSpinner, SuccessModal } from '../../src/components';
import { useAuth } from '../../src/hooks/useAuth';
import { UploadImage, LocationIconSvg, EditPen } from '../../assets/images';
import AlertNotification from '../../src/components/common/AlertNotification';

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
  const [errors, setErrors] = useState({
    brandName: '',
    businessInfo: '',
    location: '',
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

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      showAlert('error', 'Camera roll permissions are required to upload your brand logo!');
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
      showAlert('success', 'Brand logo uploaded successfully!');
    }
  };

  const handleContinue = async () => {
    // Reset errors
    setErrors({ brandName: '', businessInfo: '', location: '' });

    // Validate Brand Name
    if (!brandName.trim()) {
      setErrors((prev) => ({ ...prev, brandName: 'Brand name is required' }));
      showAlert('error', 'Brand name is required');
      return;
    }
    if (brandName.trim().length < 2) {
      setErrors((prev) => ({ ...prev, brandName: 'Brand name must be at least 2 characters' }));
      showAlert('error', 'Brand name must be at least 2 characters');
      return;
    }
    if (brandName.trim().length > 50) {
      setErrors((prev) => ({ ...prev, brandName: 'Brand name must not exceed 50 characters' }));
      showAlert('error', 'Brand name must not exceed 50 characters');
      return;
    }

    // Validate Business Info
    if (!businessInfo.trim()) {
      setErrors((prev) => ({ ...prev, businessInfo: 'Business info is required' }));
      showAlert('error', 'Please provide your business information');
      return;
    }
    if (businessInfo.trim().length < 10) {
      setErrors((prev) => ({ ...prev, businessInfo: 'Business info must be at least 10 characters' }));
      showAlert('error', 'Business info should be at least 10 characters');
      return;
    }
    if (businessInfo.trim().length > 500) {
      setErrors((prev) => ({ ...prev, businessInfo: 'Business info must not exceed 500 characters' }));
      showAlert('error', 'Business info is too long (max 500 characters)');
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
    <View style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: '#F8F8F8' }} />
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      {/* Alert Notification */}
      {alert.visible && (
        <View style={{ position: 'absolute', top: 40, left: 0, right: 0, zIndex: 50 }}>
          <AlertNotification
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert((prev) => ({ ...prev, visible: false }))}
            visible={alert.visible}
          />
        </View>
      )}

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
        
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: 15,
            paddingTop: Platform.OS === 'ios' ? 40 : 80,
            paddingBottom: 100,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Text style={{ fontSize: 20, fontWeight: '600', color: '#1D1C1C', marginBottom: 8 }}>
            Empower Your Brand with Creators
          </Text>
          <Text style={{ fontSize: 14, fontWeight: '400', color: '#6C727F', marginBottom: 40 }}>
            Let's setup your profile first....
          </Text>

          {/* Logo Upload with Badge */}
          <View style={{ alignItems: 'center', marginBottom: 50 }}>
            <View style={{ position: 'relative' }}>
              <TouchableOpacity
                // onPress={pickImage}
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
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  backgroundColor: '#4CAF50',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // borderWidth: 3,
                  // borderColor: '#F8F8F8',
                }}
              >
                <EditPen width={11} height={11}/>
              </View>
            </View>
            <Text style={{ fontSize: 12, color: '#6C727F', marginTop: 12 }}>
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
            <Text style={{ fontSize: 12, fontWeight: '500', color: '#1D1C1C', marginBottom: 12 }}>
              Brand Name
            </Text>
            <TextInput
              style={{ fontSize: 14,fontWeight: '400', color: '#6C727F', padding: 0 }}
              placeholder="John Doe"
              placeholderTextColor="#6C727F"
              value={brandName}
              onChangeText={(text) => {
                setBrandName(text);
                setErrors((prev) => ({ ...prev, brandName: '' }));
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
            <Text style={{ fontSize: 12, fontWeight: '500', color: '#1D1C1C', marginBottom: 12 }}>
              Business Info
            </Text>
            <TextInput
              style={{ fontSize: 14, color: '#6C727F', padding: 0, minHeight: 80 }}
              placeholder="something about you..."
              placeholderTextColor="#6C727F"
              value={businessInfo}
              onChangeText={(text) => {
                setBusinessInfo(text);
                setErrors((prev) => ({ ...prev, businessInfo: '' }));
              }}
              multiline
              textAlignVertical="top"
            />
            {errors.businessInfo ? (
              <Text style={{ fontSize: 12, color: '#F44336', marginTop: 8 }}>
                {errors.businessInfo}
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
                style={{ flex: 1, fontSize: 14, color: '#6C727F', padding: 0 }}
                placeholder="Location"
                placeholderTextColor="#6C727F"
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
        </ScrollView>
     

      {/* Bottom Part - Continue Button - Absolutely positioned at bottom */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#F8F8F8',
        }}
      >
        <SafeAreaView edges={['bottom']}>
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 10,
              paddingBottom: 40,
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
              <Text style={{ color: 'white', fontSize: 16, fontWeight: '500' }}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
       </KeyboardAvoidingView>

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
    </View>
  );
}
