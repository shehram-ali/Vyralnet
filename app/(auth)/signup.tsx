import React, { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, Input, Card } from '../../src/components';

export default function SignupScreen() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = () => {
    // Reset errors
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    // Validate
    let hasError = false;

    if (!username || username.length < 3) {
      setUsernameError('Username must be at least 3 characters');
      hasError = true;
    }

    if (!email) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      hasError = true;
    }

    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      hasError = true;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      hasError = true;
    }

    if (!agreedToTerms) {
      hasError = true;
    }

    if (hasError) return;

    // Navigate to tabs (no backend authentication)
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-surface"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="items-center mb-8">
          <Text className="text-5xl font-bold text-primary mb-2">Join Vyralnet</Text>
          <Text className="text-lg text-gray-600">Create your account to get started</Text>
        </View>

        <Card elevation="md" className="p-6">
          <Input
            label="Username"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              setUsernameError('');
            }}
            autoCapitalize="none"
            error={usernameError}
            containerClassName="mb-4"
          />

          <Input
            label="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError('');
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            error={emailError}
            containerClassName="mb-4"
          />

          <Input
            label="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError('');
            }}
            isPassword
            error={passwordError}
            containerClassName="mb-4"
          />

          <Input
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setConfirmPasswordError('');
            }}
            isPassword
            error={confirmPasswordError}
            containerClassName="mb-4"
          />

          <TouchableOpacity
            className="flex-row items-center mb-6"
            onPress={() => setAgreedToTerms(!agreedToTerms)}
          >
            <View className={`w-6 h-6 rounded border-2 items-center justify-center mr-3 ${agreedToTerms ? 'bg-primary border-primary' : 'border-gray-400'}`}>
              {agreedToTerms && (
                <MaterialCommunityIcons name="check" size={16} color="#FFFFFF" />
              )}
            </View>
            <Text className="text-gray-700 flex-1">
              I agree to the Terms & Conditions
            </Text>
          </TouchableOpacity>

          <Button
            title="Sign Up"
            onPress={handleSignup}
            disabled={!agreedToTerms}
            className="mb-3"
          />

          <TouchableOpacity
            onPress={() => router.push('/(auth)/login')}
            className="items-center py-2"
          >
            <Text className="text-primary font-medium">
              Already have an account? Login
            </Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
