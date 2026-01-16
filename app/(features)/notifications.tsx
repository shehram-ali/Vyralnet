import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

interface NotificationSetting {
  id: string;
  title: string;
  enabled: boolean;
}

export default function NotificationsScreen() {
  const router = useRouter();

  const [pushNotifications, setPushNotifications] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [inAppNotifications, setInAppNotifications] = useState(true);

  const notificationSettings = [
    {
      id: 'push',
      title: 'Push Notifications',
      enabled: pushNotifications,
      onToggle: setPushNotifications,
    },
    {
      id: 'email',
      title: 'Email Notifications',
      enabled: emailNotifications,
      onToggle: setEmailNotifications,
    },
    {
      id: 'in-app',
      title: 'In-App Notifications',
      enabled: inAppNotifications,
      onToggle: setInAppNotifications,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8FB]" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-5 py-4 pt-10 bg-[#F8F8FB]">
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-md font-medium text-black ml-2">Notifications</Text>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 40 }}
      >
        {notificationSettings.map((setting, index) => (
          <View
            key={setting.id}
            className="flex-row items-center justify-between px-4 py-4 bg-white mx-5 mb-3 rounded-2xl"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 2,
            }}
          >
            <Text className="text-md text-black">{setting.title}</Text>
            <Switch
              value={setting.enabled}
              onValueChange={setting.onToggle}
              trackColor={{ false: '#D1D5DB', true: '#5EBD3E' }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#D1D5DB"
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
