import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgProps } from 'react-native-svg';
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

  const handleUploadPhoto = () => {
    // TODO: Implement photo upload functionality
    console.log('Upload photo');
  };

  const handleDeletePhoto = () => {
    // TODO: Implement photo delete functionality
    console.log('Delete photo');
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
          <IconComponent width={22} height={22} />
          <Text
            className="text-base font-normal ml-4"
            style={{ color: item.color || '#000000' }}
          >
            {item.title}
          </Text>
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color="#9CA3AF"
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8FB]" edges={['top']}>
      {/* Header */}
      <View className="px-5 pt-4 pb-6 bg-[#F8F8FB]">
        <Text className="text-2xl font-bold text-black">Settings</Text>
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
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                }}
              />
              {/* Edit/Verified Badge */}
              <View
                className="absolute bottom-0 right-0 items-center justify-center"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: '#5EBD3E',
                  borderWidth: 3,
                  borderColor: '#F8F8FB',
                }}
              >
                <EditPen  />
              </View>
            </View>
          </TouchableOpacity>

          {/* Name and Email/Location */}
          <Text className="text-xl font-semibold text-black mb-1">
            {isBrand ? (user?.brandName || 'Brand Name') : (user?.name || 'James Doe')}
          </Text>
          <Text className="text-sm text-gray-600">
            {isBrand ? (user?.location || 'San Francisco, CA') : (user?.email || 'james_doe@email.com')}
          </Text>
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
        onDeletePhoto={handleDeletePhoto}
      />
    </SafeAreaView>
  );
}
