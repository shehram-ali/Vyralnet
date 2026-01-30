import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Animated,
  StyleSheet,
  Dimensions,
  StatusBar,
  Keyboard,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ROUTES } from '../../src/constants';
import { Vector1Svg, Vector2Svg, LogoLoginSvg } from '../../assets/images';
import AlertNotification from '../../src/components/common/AlertNotification';

export default function CommonSignupScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const accountType = params.accountType as 'brand' | 'influencer';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [alert, setAlert] = useState<{
    visible: boolean;
    type: 'success' | 'warning' | 'error';
    message: string;
  }>({
    visible: false,
    type: 'error',
    message: '',
  });

  // Animation values
  const topWaveAnim = useRef(new Animated.Value(-150)).current;
  const bottomWaveAnim = useRef(new Animated.Value(200)).current;

  useEffect(() => {
    // Animate top wave sliding down
    Animated.timing(topWaveAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Animate bottom wave sliding up
    Animated.timing(bottomWaveAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Keyboard listeners
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      isValid: minLength && hasNumber && hasSpecialChar,
      minLength,
      hasNumber,
      hasSpecialChar,
    };
  };

  const showAlert = (type: 'success' | 'warning' | 'error', message: string) => {
    setAlert({ visible: true, type, message });
    // Auto-hide after 5 seconds
    setTimeout(() => {
      setAlert((prev) => ({ ...prev, visible: false }));
    }, 5000);
  };

  const handleCreateAccount = () => {
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Email is required');
      showAlert('error', 'Email is required');
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      showAlert('error', 'Please enter a valid email address');
      return;
    }
    if (!password) {
      setPasswordError('Password is required');
      showAlert('error', 'Password is required');
      return;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      if (!passwordValidation.minLength) {
        setPasswordError('Password must be at least 8 characters');
        showAlert('error', 'Password must be at least 8 characters');
      } else if (!passwordValidation.hasNumber) {
        setPasswordError('Password must contain at least one number');
        showAlert('error', 'Password must contain at least one number');
      } else if (!passwordValidation.hasSpecialChar) {
        setPasswordError('Password must contain at least one special character');
        showAlert('error', 'Password must contain at least one special character');
      }
      return;
    }

    // Show success message before navigation
    showAlert('success', 'Account details validated! Proceeding to onboarding...');

    // Navigate based on account type (with small delay for user to see success message)
    setTimeout(() => {
      if (accountType === 'brand') {
        router.push({
          pathname: ROUTES.ONBOARDING.BRAND_ONBOARDING,
          params: { email, password }
        });
      } else if (accountType === 'influencer') {
        router.push({
          pathname: ROUTES.ONBOARDING.INFLUENCER_ONBOARDING,
          params: { email, password }
        });
      }
    }, 1000);
  };

  const handleGoogleSignup = () => {
    // TODO: Implement Google signup
    console.log('Google signup');
  };

  const screenHeight = Dimensions.get('window').height;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F8FB' }} edges={[]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* Toast Notification */}
      {alert.visible && (
        <View className="absolute top-16 left-4 right-4 z-50">
          <AlertNotification
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert((prev) => ({ ...prev, visible: false }))}
            visible={alert.visible}
          />
        </View>
      )}

      {/* Top Wave Decoration with Animation */}
      <Animated.View
        className="absolute -top-1 -left-1 right-0"
        style={{
          transform: [{ translateY: topWaveAnim }],
          zIndex: -1,
        }}
      >
        <Vector1Svg width="100%" height={125} preserveAspectRatio="none" />
      </Animated.View>

      <View style={{ flex: 1 }}>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
        {/* Back Button - Hidden when keyboard is visible */}
        {!isKeyboardVisible && (
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-[60px] left-2 z-10 p-2"
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="chevron-left" size={30} color="#000" />
          </TouchableOpacity>
        )}

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 16,
            paddingTop: 100,
            paddingBottom: 40,
          }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <View className="items-center mt-14 mb-24">
            <LogoLoginSvg width={150} height={60} />
          </View>

          {/* Welcome Text */}
          <View className="mb-8">
            <Text className="text-2xl font-semibold text-gray-900 mb-2">Let's Create your Account</Text>
            <Text className="text-sm text-[#6C727F]">Enter these details to create your account.</Text>
          </View>

          {/* Email Input */}
          <View className="mb-4">
            <View style={inputStyles.container}>
              <Text style={inputStyles.label}>Email</Text>
              <TextInput
                style={inputStyles.input}
                placeholder="john.doe@email.com"
                placeholderTextColor="#6C727F"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setEmailError('');
                }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            {emailError ? (
              <Text className="text-red-500 text-xs mt-1">{emailError}</Text>
            ) : null}
          </View>

          {/* Password Input */}
          <View className="mb-2  ">
            <View style={inputStyles.container}>
              <Text style={inputStyles.label}>Password</Text>
              <View style={inputStyles.passwordWrapper}>
                <TextInput
                  style={[inputStyles.input, inputStyles.passwordInput]}
                  placeholder="**********"
                  placeholderTextColor="#6C727F"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setPasswordError('');
                  }}
                  secureTextEntry={!showPassword}
                />
               
              </View>
               <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={inputStyles.eyeIcon}
                  activeOpacity={0.7}
                >
                  <Feather name={showPassword ? 'eye-off' : 'eye'} size={20} color="black" className='mr-4' />
                </TouchableOpacity>
            </View>

            {/* Password Requirements */}
            {password.length > 0 && (
              <View className="mt-2 space-y-1">
                <View className="flex-row items-center">
                  <MaterialCommunityIcons
                    name={password.length >= 8 ? 'check-circle' : 'circle-outline'}
                    size={16}
                    color={password.length >= 8 ? '#10B981' : '#9CA3AF'}
                  />
                  <Text className={`ml-2 text-xs ${password.length >= 8 ? 'text-green-600' : 'text-gray-500'}`}>
                    At least 8 characters
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <MaterialCommunityIcons
                    name={/\d/.test(password) ? 'check-circle' : 'circle-outline'}
                    size={16}
                    color={/\d/.test(password) ? '#10B981' : '#9CA3AF'}
                  />
                  <Text className={`ml-2 text-xs ${/\d/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                    Contains a number
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <MaterialCommunityIcons
                    name={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'check-circle' : 'circle-outline'}
                    size={16}
                    color={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? '#10B981' : '#9CA3AF'}
                  />
                  <Text className={`ml-2 text-xs ${/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                    Contains a special character
                  </Text>
                </View>
              </View>
            )}

            {passwordError ? (
              <Text className="text-red-500 text-xs mt-1">{passwordError}</Text>
            ) : null}
          </View>

          {/* Forgot Password */}
          {/* <TouchableOpacity className="items-end mb-6" activeOpacity={0.7}>
            <Text className="text-sm text-gray-600">Forgot your password?</Text>
          </TouchableOpacity> */}

          {/* Create Account Button */}
          <TouchableOpacity
            onPress={handleCreateAccount}
            className="bg-primary rounded-xl mt-10 py-4 items-center mb-6"
            activeOpacity={0.8}
          >
            <Text className="text-white text-base font-semibold">Create Account</Text>
          </TouchableOpacity>

          {/* Or Divider */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-[#CCCCCC]" />
            <Text className="mx-4 text-[#999797] font-normal text-sm">Or</Text>
            <View className="flex-1 h-px bg-[#CCCCCC]" />
          </View>

          {/* Google Sign In Button */}
          <TouchableOpacity
            onPress={handleGoogleSignup}
            style={inputStyles.googleButton}
            activeOpacity={0.8}
          >
            <Image
              source={{ uri: 'https://www.google.com/favicon.ico' }}
              style={{ width: 20, height: 20, marginRight: 8 }}
            />
            <Text className="text-black text-sm font-medium">Join with Google</Text>
          </TouchableOpacity>

          {/* Log In Link */}
          <View className="flex-row justify-center mb-4">
            <Text className="text-[] text-sm">Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push(ROUTES.AUTH.LOGIN)} activeOpacity={0.7}>
              <Text className="text-primary text-sm font-semibold underline">Log In</Text>
            </TouchableOpacity>
          </View>

          {/* Terms and Privacy */}
          <View className="items-center mb-8">
            <Text className="text-xs text-[#6C727F] text-center">
              By registering, you accept our{'\n'}
              <Text className="text-primary underline">Terms, Privacy Policy & Cookies Policy</Text>{' '}
            
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom Wave Decoration with Animation - Fixed to screen bottom */}
      <Animated.View
        pointerEvents="none"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          transform: [{ translateY: bottomWaveAnim }],
        }}
      >
        <Vector2Svg height={220} preserveAspectRatio="none" />
      </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const inputStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  input: {
    fontSize: 15,
    color: '#111827',
    padding: 0,
    margin: 0,
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    paddingRight: 40,
  },
  eyeIcon: {
    position: 'absolute',
    right: 0,
    padding: 4,
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 24,
  },
});
