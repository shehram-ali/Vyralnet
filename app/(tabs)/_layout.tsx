import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  ActiveHomeTabSvg,
  HomeTabSvg,
  ActiveStatTabSvg,
  StatTabSvg,
  ActiveChatTabSvg,
  ChatTabSvg,
  ActiveSettingTabSvg,
  SettingTabSvg,
} from '../../assets/images';

const tabIcons = {
  Home: {
    active: ActiveHomeTabSvg,
    inactive: HomeTabSvg,
  },
  Stat: {
    active: ActiveStatTabSvg,
    inactive: StatTabSvg,
  },
  Chat: {
    active: ActiveChatTabSvg,
    inactive: ChatTabSvg,
  },
  Setting: {
    active: ActiveSettingTabSvg,
    inactive: SettingTabSvg,
  },
};

// Tab icon with top indicator
const getTabIcon = (tabName: keyof typeof tabIcons, focused: boolean) => {
  const IconComponent = focused ? tabIcons[tabName].active : tabIcons[tabName].inactive;

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        position: 'relative',
      }}
    >
      {/* Top green indicator line for active tab - positioned at border */}
      <View
        style={{
          position: 'absolute',
          top: -19,
          width: 50,
          height: 3,
          backgroundColor: focused ? '#4CAF50' : 'transparent',
          borderRadius: 1.5,
        }}
      />
      <IconComponent width={24} height={24} />
    </View>
  );
};


export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          paddingBottom: 10,
          paddingTop: 12,
          height: 70,
          borderTopRightRadius: 24,
          borderTopLeftRadius: 24,
          // shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => getTabIcon('Home', focused),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Stats',
          tabBarIcon: ({ focused }) => getTabIcon('Stat', focused),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ focused }) => getTabIcon('Chat', focused),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => getTabIcon('Setting', focused),
        }}
      />
    </Tabs>
  );
}
