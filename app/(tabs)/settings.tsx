import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgProps } from 'react-native-svg';
import * as ImagePicker from 'expo-image-picker';
import {
  EditPen,
  SPersonSvg,
  SBellSvg,
  SLockSvg,
  SCardSvg,
  SQuestionSvg,
  SBinSvg,
  SLogoutSvg,
  PaperPen,
} from '../../assets/images';
import { ROUTES } from '../../src/constants';
import { useAuth } from '../../src/hooks/useAuth';
import { ProfilePictureBottomSheet } from '../../src/components';

interface SettingsMenuItem {
  id: string;
  title: string;
  icon: React.FC<SvgProps>;
  color?: string;
  onPress: () => void;
}

export default function SettingsScreen() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [isSwitching, setIsSwitching] = React.useState(false);
  const [showProfilePictureSheet, setShowProfilePictureSheet] = useState(false);

  const handleLogout = () => {
    router.replace(ROUTES.AUTH.LOGIN);
  };

  const handleUploadPhoto = async () => {
    try {
      // Request permission
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert('Permission Required', 'Permission to access camera roll is required!');
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        // Update user avatar
        await updateUser({ avatar: result.assets[0].uri });
        console.log('Photo uploaded successfully');
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      Alert.alert('Error', 'Failed to upload photo. Please try again.');
    }
  };

  const handleTakePhoto = async () => {
    try {
      // Request permission
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert('Permission Required', 'Permission to access camera is required!');
        return;
      }

      // Launch camera
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        // Update user avatar
        await updateUser({ avatar: result.assets[0].uri });
        console.log('Photo taken successfully');
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  const handleDeletePhoto = async () => {
    try {
      Alert.alert(
        'Delete Photo',
        'Are you sure you want to delete your profile photo?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              // Reset to default avatar
              await updateUser({ avatar: '' });
              console.log('Photo deleted successfully');
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error deleting photo:', error);
      Alert.alert('Error', 'Failed to delete photo. Please try again.');
    }
  };

  const handleSwitchUserType = async () => {
    if (!user || isSwitching) return;

    try {
      setIsSwitching(true);
      const newUserType = user.userType === 'brand' ? 'influencer' : 'brand';
      await updateUser({ userType: newUserType });

      // Show alert or toast (for now, just log)
      console.log(`Switched to ${newUserType} mode`);
    } catch (error) {
      console.error('Error switching user type:', error);
    } finally {
      // Add a small delay before allowing another switch
      setTimeout(() => {
        setIsSwitching(false);
      }, 500);
    }
  };

  const isBrand = user?.userType === 'brand';

  const influencerMenuItems: SettingsMenuItem[] = [
    {
      id: 'public-profile',
      title: 'Public Profile',
      icon: SPersonSvg,
      onPress: () => router.push(ROUTES.FEATURES.PUBLIC_PROFILE),
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: SBellSvg,
      onPress: () => router.push(ROUTES.FEATURES.NOTIFICATIONS),
    },
    {
      id: 'change-password',
      title: 'Change Password',
      icon: SLockSvg,
      onPress: () => router.push(ROUTES.FEATURES.CHANGE_PASSWORD),
    },
    {
      id: 'membership',
      title: 'Membership',
      icon: PaperPen,
      onPress: () => router.push(ROUTES.FEATURES.MEMBERSHIP),
    },
    {
      id: 'payment-methods',
      title: 'Payment Methods',
      icon: SCardSvg,
      onPress: () => router.push(ROUTES.FEATURES.PAYMENT_METHODS),
    },
    {
      id: 'help-support',
      title: 'Help & Support',
      icon: SQuestionSvg,
      onPress: () => router.push(ROUTES.FEATURES.HELP_SUPPORT),
    },
    {
      id: 'delete-account',
      title: 'Delete Account',
      icon: SBinSvg,
      onPress: () => router.push(ROUTES.FEATURES.DELETE_ACCOUNT),
    },
  ];

  const brandMenuItems: SettingsMenuItem[] = [
    {
      id: 'edit-profile',
      title: 'Edit Profile',
      icon: SPersonSvg,
      onPress: () => router.push(ROUTES.FEATURES.EDIT_PROFILE),
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: SBellSvg,
      onPress: () => router.push(ROUTES.FEATURES.NOTIFICATIONS),
    },
    {
      id: 'change-password',
      title: 'Change Password',
      icon: SLockSvg,
      onPress: () => router.push(ROUTES.FEATURES.CHANGE_PASSWORD),
    },
    {
      id: 'payment-methods',
      title: 'Payment Methods',
      icon: SCardSvg,
      onPress: () => router.push(ROUTES.FEATURES.PAYMENT_METHODS),
    },
    {
      id: 'help-support',
      title: 'Help & Support',
      icon: SQuestionSvg,
      onPress: () => router.push(ROUTES.FEATURES.HELP_SUPPORT),
    },
    {
      id: 'delete-account',
      title: 'Delete Account',
      icon: SBinSvg,
      onPress: () => router.push(ROUTES.FEATURES.DELETE_ACCOUNT),
    },
  ];

  const menuItems = isBrand ? brandMenuItems : influencerMenuItems;

  const renderMenuItem = (item: SettingsMenuItem) => {
    const IconComponent = item.icon;
    return (
      <TouchableOpacity
        key={item.id}
        onPress={item.onPress}
        activeOpacity={0.7}
        className="flex-row items-center justify-between px-4 py-4 bg-white mx-5 mb-3 rounded-2xl"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <View className="flex-row items-center flex-1">
          <IconComponent width={24} height={24} />
          <Text
            className="text-base font-normal ml-4"
            style={{ color: item.color || '#000000' }}
          >
            {item.title}
          </Text>
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          size={20}
          color="#000000"
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8FB]" edges={['top']}>
      {/* Header */}
      <View className="px-5 pt-4 pb-6 bg-[#F8F8FB] " style={{ paddingTop: Platform.OS === 'ios' ? 0 : 40 }}>
        <Text className="text-2xl font-[800px] text-[#1D1C1C]">Settings</Text>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Profile Card */}
        <View className="items-center py-6 mb-6">
          {/* Avatar with Edit/Verified Badge */}
          <TouchableOpacity
            onPress={() => setShowProfilePictureSheet(true)}
            activeOpacity={0.7}
          >
            <View className="relative mb-4">
              <Image
                source={{ uri: user?.avatar || 'https://i.pravatar.cc/150?img=8' }}
                style={{
                  width: 104,
                  height: 104,
                  borderRadius: 81,
                }}
              />
              {/* Edit/Verified Badge */}
              <View
                className="absolute bottom-0 right-1 items-center justify-center"
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 6,
                  backgroundColor: '#5EBD3E',
                  // borderWidth: 3,
                  // borderColor: '#F8F8FB',
                }}
              >
                <EditPen width={12} height={12} />
              </View>
            </View>
          </TouchableOpacity>

          {/* Name and Email/Location */}
          <Text className="text-xl font-medium text-black mb-1">
            {isBrand ? ( user?.name || 'Microsoft Inc.') : (user?.name || 'James Doe')}
          
          </Text>
          {/* <Text className="text-xl font-medium text-black mb-1">
            {isBrand ? ( user?.name || 'Microsoft Inc.') : (user?.name || 'James Doe')}
          
          </Text> */}
        
          <Text className="text-sm font-normal text-black ">
            {isBrand ? ( 'San Francisco, CA') : (user?.email || 'james_doe@email.com')}
          </Text>
          {/* <Text className="text-sm font-normal text-black ">
            {isBrand ? ( 'San Francisco, CA') : (user?.email || 'james_doe@email.com')}
          </Text> */}
        </View>

        {/* Development Testing Section */}
        <View className="px-5 mb-4">
          <Text className="text-sm font-semibold text-[#5EBD3E] mb-3">
            TESTING MODE
          </Text>
          <TouchableOpacity
            onPress={handleSwitchUserType}
            disabled={isSwitching}
            activeOpacity={0.7}
            className="flex-row items-center justify-between px-5 py-4 bg-white rounded-2xl"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 2,
              borderWidth: 2,
              borderColor: '#5EBD3E',
              opacity: isSwitching ? 0.5 : 1,
            }}
          >
            <View className="flex-1">
              <Text className="text-base font-semibold text-black mb-1">
                Switch User Type
              </Text>
              <Text className="text-sm text-gray-600">
                {isSwitching ? 'Switching...' : `Current: ${user?.userType?.toUpperCase() || 'Unknown'}`}
              </Text>
            </View>
            <MaterialCommunityIcons
              name={isSwitching ? "loading" : "swap-horizontal"}
              size={24}
              color="#5EBD3E"
            />
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View className="mb-4">
          {menuItems.map((item) => renderMenuItem(item))}
        </View>

        {/* Log Out Button */}
        <TouchableOpacity
          onPress={handleLogout}
          activeOpacity={0.7}
          className="flex-row items-center justify-between px-5 py-5 bg-white mx-5 mb-3 rounded-2xl"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <View className="flex-row items-center flex-1">
            <SLogoutSvg width={22} height={22} />
            <Text className="text-base font-normal ml-4 text-[#FF3B30]">Log Out</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#FF3B30" />
        </TouchableOpacity>
      </ScrollView>

      {/* Profile Picture Bottom Sheet */}
      <ProfilePictureBottomSheet
        visible={showProfilePictureSheet}
        onClose={() => setShowProfilePictureSheet(false)}
        onUploadPhoto={handleUploadPhoto}
        onTakePhoto={handleTakePhoto}
        onDeletePhoto={handleDeletePhoto}
      />
    </SafeAreaView>
  );
}
