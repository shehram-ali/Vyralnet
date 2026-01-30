import React, { useState } from 'react';
import { View, Text, Switch, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../src/components/common';

interface NotificationSetting {
  id: string;
  title: string;
  enabled: boolean;
}

export default function NotificationsScreen() {
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
      <Header
        title="Notifications"
        titleClassName="text-md font-medium text-black"
        backIconSize={24}
      />

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
