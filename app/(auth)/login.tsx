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
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ROUTES } from '@/constants';
import { useAuth } from '@/hooks/useAuth';
import { Vector1Svg, Vector2Svg, LogoLoginSvg } from '../../assets/images';
import AlertNotification from '../../src/components/common/AlertNotification';
import Feather from '@expo/vector-icons/Feather';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
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
    // Animate top wave sliding down (from top to bottom)
    Animated.timing(topWaveAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Animate bottom wave sliding up (from bottom to top)
    Animated.timing(bottomWaveAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const showAlert = (type: 'success' | 'warning' | 'error', message: string) => {
    setAlert({ visible: true, type, message });
    // Auto-hide after 5 seconds
    setTimeout(() => {
      setAlert((prev) => ({ ...prev, visible: false }));
    }, 5000);
  };

  const handleLogin = async () => {
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

    try {
      await login(email, password);
      showAlert('success', 'Login successful! Welcome back.');
      // Navigation will happen automatically when user state updates
      setTimeout(() => {
        router.replace('/(tabs)/home');
      }, 1000);
    } catch (error) {
      showAlert('error', 'Invalid email or password. Please try again.');
    }
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google login
    console.log('Google login');
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
        <ScrollView
  contentContainerStyle={{
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 120,
    paddingBottom: 40,
  }}
  keyboardShouldPersistTaps="handled" // <<< this is important
  keyboardDismissMode="interactive"  // <<< use interactive or none
  showsVerticalScrollIndicator={false}
>

          {/* Logo */}
          <View className="items-center mt-10 mb-24">
            <View className="flex-row items-center">
              <LogoLoginSvg width={150} height={60} />
            </View>
          </View>

          {/* Welcome Text */}
          <View className="mb-8">
            <Text className="text-xl font-semibold  text-[#262626] mb-1">Welcome Back!</Text>
            <Text className="text-sm font-normal text-[#6C727F]">Login to continue using your account</Text>
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
          <View className="mb-2">
            <View style={inputStyles.container}>
              <Text style={inputStyles.label}>Password</Text>
              <View style={inputStyles.passwordWrapper}>
                <TextInput
                  style={[inputStyles.input, inputStyles.passwordInput]}
                  placeholder="************"
                  placeholderTextColor="#9CA3AF"
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
                  <Feather name={showPassword ? 'eye-off' : 'eye'} size={20} color="#1E1E1E" className='mr-4' />
                </TouchableOpacity>
            </View>
            {passwordError ? (
              <Text className="text-red-500 text-xs mt-1">{passwordError}</Text>
            ) : null}
          </View>

          {/* Forgot Password */}
          <TouchableOpacity className="items-end mb-6" activeOpacity={0.7}>
            <Text className="text-xs font-medium text-[#6C727F]">Forgot your password?</Text>
          </TouchableOpacity>

          {/* Log In Button */}
          <TouchableOpacity
            onPress={handleLogin}
            className="bg-primary rounded-xl py-4 items-center mb-6"
            activeOpacity={0.8}
          >
            <Text className="text-white text-base font-semibold">Log In</Text>
          </TouchableOpacity>

          {/* Or Divider */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-[#CCCCCC]" />
            <Text className="mx-4 text-[#999797] font-normal text-sm">Or</Text>
            <View className="flex-1 h-px bg-[#CCCCCC]" />
          </View>

          {/* Google Sign In Button */}
          <TouchableOpacity
            onPress={handleGoogleLogin}
            style={inputStyles.googleButton}
            activeOpacity={0.8}
          >
            <Image
              source={{ uri: 'https://www.google.com/favicon.ico' }}
              style={{ width: 20, height: 20, marginRight: 8 }}
            />
            <Text className="text-black text-sm font-medium">Join with Google</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View className="flex-row justify-center mb-4">
            <Text className="text-[#6C727F] text-sm font-normal">Don't have an  account? </Text>
            <TouchableOpacity onPress={() => router.replace(ROUTES.ONBOARDING.SIGNUP_OPTIONS)} activeOpacity={0.7}>
              <Text className="text-primary text-sm font-semibold underline">Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Terms and Privacy */}
          <View className="items-center mb-8">
            <Text className="text-xs text-[#979797] font-medium text-center">
              By registering, you accept our{`\n `}
              <Text className="text-primary underline font-medium">Terms, Privacy Policy & Cookies Policy</Text>
           
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
        <Vector2Svg height={200} preserveAspectRatio="none" />
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
    fontWeight: '500',
    color: '#1D1C1C',
    marginBottom: 4,
  },
  input: {
    fontSize: 14,
    color: '#000000',
    padding: 0,
    margin: 0,
    fontWeight:'400',
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
