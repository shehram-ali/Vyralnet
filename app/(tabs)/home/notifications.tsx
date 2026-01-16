import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ReadSvg, UnreadSvg } from '../../../assets/images';

interface Notification {
  id: string;
  type: 'challenge_accepted' | 'content_submitted';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'challenge_accepted',
    title: 'Challenge Accepted',
    message: 'Susan Adams has accepted your challenge. Please review the pitch submitted by Susan Adams.',
    timestamp: '15 mins ago',
    isRead: false,
  },
  {
    id: '2',
    type: 'content_submitted',
    title: 'Content Submitted',
    message: 'Susan Adams has submitted content for the challenge. Please review the submission and provide feedback...',
    timestamp: '1 day ago',
    isRead: false,
  },
  {
    id: '3',
    type: 'challenge_accepted',
    title: 'Challenge Accepted',
    message: 'Susan Adams has accepted your challenge. Please review the pitch submitted by Susan Adams.',
    timestamp: '2 days ago',
    isRead: true,
  },
  {
    id: '4',
    type: 'content_submitted',
    title: 'Content Submitted',
    message: 'Susan Adams has submitted content for the challenge. Please review the submission and provide feedback...',
    timestamp: '2 days ago',
    isRead: true,
  },
  {
    id: '5',
    type: 'challenge_accepted',
    title: 'Challenge Accepted',
    message: 'Susan Adams has accepted your challenge. Please review the pitch submitted by Susan Adams.',
    timestamp: '3 days ago',
    isRead: true,
  },
  {
    id: '6',
    type: 'content_submitted',
    title: 'Content Submitted',
    message: 'Susan Adams has submitted content for the challenge. Please review the submission and provide feedback...',
    timestamp: '3 days ago',
    isRead: true,
  },
];

type FilterType = 'all' | 'unread';

export default function NotificationsScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredNotifications = mockNotifications.filter((notification) => {
    if (activeFilter === 'unread') {
      return !notification.isRead;
    }
    return true;
  });

  const renderNotificationCard = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      className="bg-white rounded-2xl p-4 mb-3 mx-5"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      <View className="flex-row">
        {/* Notification Icon */}
        <View className="mr-3 pt-1">
          {item.isRead ? <ReadSvg width={24} height={24} /> : <UnreadSvg width={24} height={24} />}
        </View>

        {/* Content */}
        <View className="flex-1">
          {/* Title */}
          <Text className="text-base font-bold text-black mb-1">{item.title}</Text>

          {/* Message */}
          <Text className="text-sm text-gray-600 leading-5 mb-2">{item.message}</Text>

          {/* Timestamp */}
          <Text className="text-xs text-gray-400 text-right">{item.timestamp}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 pt-10 bg-[#F8F8F8]" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-5 py-4 bg-[#F8F8F8]">
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-md font-bold text-black ml-4">Notifications</Text>
      </View>

      {/* Filter Tabs */}
      <View className="flex-row px-5 pt-2 pb-4">
        <TouchableOpacity
          onPress={() => setActiveFilter('all')}
          activeOpacity={0.7}
          className="mr-3"
        >
          <View
            className="px-6 py-2 rounded-full"
            style={{
              backgroundColor: activeFilter === 'all' ? '#5EBD3E' : '#F0F0F0',
            }}
          >
            <Text
              className="text-sm font-semibold"
              style={{
                color: activeFilter === 'all' ? '#FFF' : '#666',
              }}
            >
              All
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveFilter('unread')}
          activeOpacity={0.7}
        >
          <View
            className="px-6 py-2 rounded-full"
            style={{
              backgroundColor: activeFilter === 'unread' ? '#5EBD3E' : '#F0F0F0',
            }}
          >
            <Text
              className="text-sm font-semibold"
              style={{
                color: activeFilter === 'unread' ? '#FFF' : '#666',
              }}
            >
              Unread
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <FlatList
        data={filteredNotifications}
        renderItem={renderNotificationCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <MaterialCommunityIcons name="bell-outline" size={60} color="#CCC" />
            <Text className="text-gray-400 text-base mt-4">No notifications</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
