import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, TextInputProps } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
  isPassword?: boolean;
}

export default function Input({
  label,
  error,
  containerClassName,
  isPassword = false,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={containerClassName}>
      {label && (
        <Text className="text-gray-700 font-medium mb-2">{label}</Text>
      )}

      <View className="relative">
        <TextInput
          className={`border rounded-lg px-4 py-3 text-base ${
            error ? 'border-error' : 'border-gray-300'
          } bg-white`}
          placeholderTextColor="#999"
          secureTextEntry={isPassword && !showPassword}
          {...props}
        />

        {isPassword && (
          <TouchableOpacity
            className="absolute right-3 top-3"
            onPress={() => setShowPassword(!showPassword)}
          >
            <MaterialCommunityIcons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text className="text-error text-sm mt-1">{error}</Text>
      )}
    </View>
  );
}
