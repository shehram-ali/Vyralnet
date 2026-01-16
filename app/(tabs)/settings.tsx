import React from 'react';
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
} from '../../assets/images';
import { ROUTES } from '../../src/constants';

interface SettingsMenuItem {
  id: string;
  title: string;
  icon: React.FC<SvgProps>;
  color?: string;
  onPress: () => void;
}

export default function SettingsScreen() {
  const router = useRouter();

  const handleLogout = () => {
    router.replace(ROUTES.AUTH.LOGIN);
  };

  const menuItems: SettingsMenuItem[] = [
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

  const renderMenuItem = (item: SettingsMenuItem) => {
    const IconComponent = item.icon;
    return (
      <TouchableOpacity
        key={item.id}
        onPress={item.onPress}
        activeOpacity={0.7}
        className="flex-row items-center justify-between px-5 py-4 bg-white mx-5 mb-3 rounded-2xl"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        <View className="flex-row items-center flex-1">
          <IconComponent width={24} height={24} />
          <Text
            className="text-md font-medium ml-4"
            style={{ color: item.color || '#000000' }}
          >
            {item.title}
          </Text>
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color={item.color || '#999999'}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 pt-10 bg-[#F8F8FB]" edges={['top']}>
      {/* Header */}
      <View className="px-5 pt-6 pb-4 bg-[#F8F8FB]">
        <Text className="text-2xl font-bold text-black">Settings</Text>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Profile Card */}
        <View className="items-center py-6 mb-4">
          {/* Avatar with Verified Badge */}
          <View className="relative mb-3">
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=8' }}
              style={{
                width: 104,
                height: 104,
                borderRadius: 50,
              }}
            />
            {/* Verified Badge */}
            <View
              className="absolute bottom-0 right-0 items-center justify-center"
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                backgroundColor: '#5EBD3E',
                borderWidth: 3,
                borderColor: '#F8F8FB',
              }}
            >
              <EditPen  />
            </View>
          </View>

          {/* Name and Location */}
          <Text className="text-xl font-medum text-black mb-1">Microsoft Inc.</Text>
          <Text className="text-xs text-black ">San Francisco, CA</Text>
        </View>

        {/* Menu Items */}
        <View className="mb-4">
          {menuItems.map((item) => renderMenuItem(item))}
        </View>

        {/* Log Out Button */}
        <TouchableOpacity
          onPress={handleLogout}
          activeOpacity={0.7}
          className="flex-row items-center justify-between px-5 py-4 bg-white mx-5 mb-3 rounded-2xl"
          style={{
            shadowColor: '#00000014',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
          <View className="flex-row items-center flex-1">
            <SLogoutSvg width={24} height={24} />
            <Text className="text-base font-medium ml-4 text-[#FF0000]">Log Out</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#FF0000" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
