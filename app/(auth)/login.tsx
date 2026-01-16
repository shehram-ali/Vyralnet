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
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ROUTES } from '@/constants';
import { useAuth } from '@/hooks/useAuth';
import { Vector1Svg, Vector2Svg, LogoLoginSvg } from '../../assets/images';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  const handleLogin = async () => {
    setEmailError('');

    if (!email) {
      setEmailError('Email is required');
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      return;
    }
    if (!password) {
      Alert.alert('Error', 'Password is required');
      return;
    }

    try {
      setIsLoading(true);
      await login(email, password);
      // Navigation will happen automatically when user state updates
      router.replace('/(tabs)/home');
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google login
    console.log('Google login');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8FB]" edges={['top']}>
      {/* Top Wave Decoration with Slide Down Animation */}
      <Animated.View
        className="absolute top-0 left-0 right-0"
        style={{
          transform: [{ translateY: topWaveAnim }],
        }}
      >
        <Vector1Svg width="100%" height={150} preserveAspectRatio="none" />
      </Animated.View>

      {/* Bottom Wave Decoration with Slide Up Animation */}
      <Animated.View
        className="absolute bottom-0 left-0 right-0"
        style={{
          transform: [{ translateY: bottomWaveAnim }],
        }}
      >
        <Vector2Svg width="100%" height={200} preserveAspectRatio="none" />
      </Animated.View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingTop: 140 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <View className="items-center mb-12">
            <View className="flex-row items-center">
              <LogoLoginSvg width={150} height={60} />
            </View>
          </View>

          {/* Welcome Text */}
          <View className="mb-8">
            <Text className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</Text>
            <Text className="text-sm text-gray-600">Login to continue using your account</Text>
          </View>

          {/* Email Input */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">Email</Text>
            <TextInput
              className="bg-white border border-gray-200 rounded-xl px-4 py-4 text-base text-gray-900"
              placeholder="john.doe@email.com"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setEmailError('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {emailError ? (
              <Text className="text-red-500 text-xs mt-1">{emailError}</Text>
            ) : null}
          </View>

          {/* Password Input */}
          <View className="mb-2">
            <Text className="text-sm font-medium text-gray-700 mb-2">Password</Text>
            <View className="relative">
              <TextInput
                className="bg-white border border-gray-200 rounded-xl px-4 py-4 text-base text-gray-900 pr-12"
                placeholder="••••••••••••"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4"
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity className="items-end mb-6" activeOpacity={0.7}>
            <Text className="text-sm text-gray-600">Forgot your password?</Text>
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
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="mx-4 text-gray-500 text-sm">Or</Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          {/* Google Sign In Button */}
          <TouchableOpacity
            onPress={handleGoogleLogin}
            className="bg-white border border-gray-200 rounded-xl py-4 flex-row items-center justify-center mb-6"
            activeOpacity={0.8}
          >
            <Image
              source={{ uri: 'https://www.google.com/favicon.ico' }}
              style={{ width: 20, height: 20, marginRight: 8 }}
            />
            <Text className="text-gray-900 text-base font-medium">Join with Google</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View className="flex-row justify-center mb-4">
            <Text className="text-gray-600 text-sm">Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.replace(ROUTES.ONBOARDING.SIGNUP_OPTIONS)} activeOpacity={0.7}>
              <Text className="text-primary text-sm font-semibold">Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Terms and Privacy */}
          <View className="items-center mb-8">
            <Text className="text-xs text-gray-500 text-center">
              By registering, you accept our{' '}
              <Text className="text-primary">Terms</Text>,{' '}
              <Text className="text-primary">Privacy Policy</Text> &{' '}
              <Text className="text-primary">Cookies Policy</Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
