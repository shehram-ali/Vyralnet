import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Frame1984077131Svg } from '../../assets/images';

interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
  timeAgo: string;
  avatar?: any;
  unread?: boolean;
}

interface EmailItem {
  id: string;
  senderName: string;
  senderInitials: string;
  subject: string;
  preview: string;
  date: string;
}

const mockChats: ChatItem[] = [
  {
    id: '1',
    name: 'Eten Hunt',
    lastMessage: "Thank you very much. I'm glad ...",
    timeAgo: '4 m Ago',
  },
  {
    id: '2',
    name: 'Jakob Saris',
    lastMessage: 'You : Sure! let me tell you about w...',
    timeAgo: '4 m Ago',
  },
  {
    id: '3',
    name: 'Jeremy Zucker',
    lastMessage: 'You : Sure! let me teach you about ...',
    timeAgo: '4 m Ago',
  },
  {
    id: '4',
    name: 'Nadia Lauren',
    lastMessage: 'Is there anything I can help? Just ...',
    timeAgo: '5 m Ago',
  },
  {
    id: '5',
    name: 'Jeremy Zucker',
    lastMessage: 'You : Sure! let me teach you about ...',
    timeAgo: '4 m Ago',
  },
  {
    id: '6',
    name: 'Jeremy Zucker',
    lastMessage: 'You : Sure! let me teach you about ...',
    timeAgo: '4 m Ago',
  },
  {
    id: '7',
    name: 'Jeremy Zucker',
    lastMessage: 'You : Sure! let me teach you about ...',
    timeAgo: '4 m Ago',
  },
];

const mockEmails: EmailItem[] = [
  {
    id: '1',
    senderName: 'Eten Hunt',
    senderInitials: 'EH',
    subject: 'Appreciation Letter',
    preview: "Thank you very much. I'm glad ...",
    date: 'Today',
  },
  {
    id: '2',
    senderName: 'Eten Hunt',
    senderInitials: 'EH',
    subject: 'Appreciation Letter',
    preview: "Thank you very much. I'm glad ...",
    date: '05/11/2025',
  },
  {
    id: '3',
    senderName: 'Eten Hunt',
    senderInitials: 'EH',
    subject: 'Appreciation Letter',
    preview: "Thank you very much. I'm glad ...",
    date: '05/11/2025',
  },
  {
    id: '4',
    senderName: 'Eten Hunt',
    senderInitials: 'EH',
    subject: 'Appreciation Letter',
    preview: "Thank you very much. I'm glad ...",
    date: '05/11/2025',
  },
  {
    id: '5',
    senderName: 'Eten Hunt',
    senderInitials: 'EH',
    subject: 'Appreciation Letter',
    preview: "Thank you very much. I'm glad ...",
    date: '05/11/2025',
  },
  {
    id: '6',
    senderName: 'Eten Hunt',
    senderInitials: 'EH',
    subject: 'Appreciation Letter',
    preview: "Thank you very much. I'm glad ...",
    date: '05/11/2025',
  },
];

type TabType = 'messages' | 'email';

export default function ChatScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('messages');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = mockChats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChatPress = (chat: ChatItem) => {
    router.push({
      pathname: '/(features)/(brand)/chat',
      params: {
        influencerId: chat.id,
        influencerName: chat.name,
      },
    });
  };

  const renderTab = (tab: TabType, label: string, badgeCount?: number) => {
    const isActive = activeTab === tab;
    return (
      <TouchableOpacity
        onPress={() => setActiveTab(tab)}
        activeOpacity={0.7}
        className="px-4 py-3 rounded-full mr-3 flex-row items-center"
        style={{
          backgroundColor: isActive ? '#5EBD3E' : '#00000014',
        }}
      >
        <Text
          className="text-sm font-medium"
          style={{
            color: isActive ? '#FFFFFF' : '#999797',
          }}
        >
          {label}
        </Text>
        {badgeCount && badgeCount > 0 && (
          <View
            className="ml-2 rounded-full items-center justify-center"
            style={{
              backgroundColor: isActive ? '#FFFFFF' : '#E53E3E',
              minWidth: 20,
              height: 20,
              paddingHorizontal: 6,
            }}
          >
            <Text
              className="text-xs font-semibold"
              style={{
                color: isActive ? '#5EBD3E' : '#FFFFFF',
              }}
            >
              {badgeCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderChatItem = ({ item }: { item: ChatItem }) => {
    return (
      <TouchableOpacity
        onPress={() => handleChatPress(item)}
        activeOpacity={0.7}
        className="flex-row items-center px-2 py-3 bg-white mx-5 mb-3 rounded-2xl"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        {/* Avatar */}
        <View style={{ width: 52, height: 52, marginRight: 12 }}>
          <Frame1984077131Svg width={52} height={52} />
        </View>

        {/* Chat Info */}
        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-base font-semibold text-black">{item.name}</Text>
            <Text className="text-xs text-[#999999]">{item.timeAgo}</Text>
          </View>
          <Text className="text-sm text-[#666666]" numberOfLines={1}>
            {item.lastMessage}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleEmailPress = (email: EmailItem) => {
    router.push({
      pathname: '/(features)/(brand)/view-email',
      params: {
        senderName: email.senderName,
        senderEmail: 'etenhunt@email.com',
      },
    });
  };

  const renderEmailItem = ({ item }: { item: EmailItem }) => {
    return (
      <TouchableOpacity
        onPress={() => handleEmailPress(item)}
        activeOpacity={0.7}
        className="flex-row items-center px-5 py-4 bg-white mb-3 mx-5 rounded-2xl"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        {/* Avatar with Initials */}
        <View
          className="items-center justify-center mr-4"
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: '#D1D5DB',
          }}
        >
          <Text className="text-xl font-semibold text-[#6B7280]">{item.senderInitials}</Text>
        </View>

        {/* Email Info */}
        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-base font-semibold text-black">{item.senderName}</Text>
            <View className="flex-row items-center">
              <Text className="text-sm text-[#999999] mr-1">{item.date}</Text>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#999999" />
            </View>
          </View>
          <Text className="text-base font-medium text-black mb-1">{item.subject}</Text>
          <Text className="text-sm text-[#666666]" numberOfLines={1}>
            {item.preview}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 pt-10 bg-[#F8F8FB]" edges={['top']}>
      {/* Header */}
      <View className="px-5 pt-6 pb-4 bg-[#F8F8FB]">
        <Text className="text-3xl font-bold text-black">
          {activeTab === 'messages' ? 'Chat' : 'Email'}
        </Text>
      </View>

      {/* Tabs */}
      <View className="flex-row px-5 pb-4 bg-[#F8F8FB]">
        {renderTab('messages', 'Messages')}
        {renderTab('email', 'Email', 3)}
      </View>

      {/* Search Bar */}
      <View className="px-5 pb-4 bg-[#F8F8FB]">
        <View className="flex-row items-center bg-white rounded-3xl px-4 py-3 shadow-sm">
          <MaterialCommunityIcons name="magnify" size={24} color="#999" />
          <TextInput
            className="flex-1 ml-2 text-base text-black"
            placeholder="Search"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Chat List */}
      {activeTab === 'messages' ? (
        <FlatList
          data={filteredChats}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 100 }}
          ListEmptyComponent={
            <View className="items-center justify-center py-20">
              <MaterialCommunityIcons name="message-text-outline" size={60} color="#CCC" />
              <Text className="text-gray-400 text-base mt-4">No messages yet</Text>
            </View>
          }
        />
      ) : (
        <FlatList
          data={mockEmails}
          renderItem={renderEmailItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 100 }}
          ListEmptyComponent={
            <View className="items-center justify-center py-20">
              <MaterialCommunityIcons name="email-outline" size={60} color="#CCC" />
              <Text className="text-gray-400 text-base mt-4">No emails yet</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
