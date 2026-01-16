import React, { useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext, User } from './AuthContext';

const STORAGE_KEYS = {
  USER: '@vyralnet:user',
  AUTH_TOKEN: '@vyralnet:auth_token',
};

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data from AsyncStorage on mount
  useEffect(() => {
    loadUserFromStorage();
  }, []);

  const loadUserFromStorage = async () => {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user from storage:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: Partial<User>) => {
    try {
      setIsLoading(true);

      // Generate a mock user ID
      const newUser: User = {
        id: `user_${Date.now()}`,
        email: userData.email || '',
        userType: userData.userType || 'influencer',
        name: userData.name || '',
        avatar: userData.avatar,
        // Brand fields
        brandName: userData.brandName,
        businessInfo: userData.businessInfo,
        logo: userData.logo,
        // Influencer fields
        bio: userData.bio,
        location: userData.location,
        categories: userData.categories,
        instagramUsername: userData.instagramUsername,
        advertisingPrice: userData.advertisingPrice,
      };

      // Generate a mock auth token
      const mockToken = `token_${Date.now()}`;

      // Save to AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, mockToken);

      // Update state
      setUser(newUser);
    } catch (error) {
      console.error('Error during signup:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      // Mock authentication - in a real app, this would call an API
      // For now, we'll just check if a user exists in AsyncStorage
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER);

      if (userData) {
        const existingUser = JSON.parse(userData);

        // Simple mock check - just verify email matches
        if (existingUser.email === email) {
          setUser(existingUser);
          return;
        }
      }

      // If no user found or email doesn't match, throw error
      throw new Error('Invalid credentials');
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);

      // Clear AsyncStorage
      await AsyncStorage.multiRemove([STORAGE_KEYS.USER, STORAGE_KEYS.AUTH_TOKEN]);

      // Clear state
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      if (!user) return;

      const updatedUser = {
        ...user,
        ...userData,
      };

      // Save to AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));

      // Update state
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
