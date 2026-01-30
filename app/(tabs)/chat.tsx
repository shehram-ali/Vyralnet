import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../src/hooks/useAuth';
import { SearchBar } from '../../src/components/common';
import { Frame1984077131Svg, EmptyChatSvg, Person1, Person2, Person3 } from '../../assets/images';

interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
  timeAgo: string;
  avatar?: any;
  unread?: boolean;
  image?:any;
}

interface EmailItem {
  id: string;
  senderName: string;
  senderInitials: string;
  subject: string;
  preview: string;
  date: string;
  isRead?: boolean;
}

const mockChats: ChatItem[] = [
  {
    id: '1',
    name: 'Eten Hunt',
    lastMessage: "Thank you very much. I'm glad ...",
    timeAgo: '4 m Ago',
    image:Person1,
    unread: true,
  },
  {
    id: '2',
    name: 'Jakob Saris',
    lastMessage: 'You : Sure! let me tell you about w...',
    timeAgo: '4 m Ago',
    image:Person2,
    unread: false,
  },
  {
    id: '3',
    name: 'Jeremy Zucker',
    lastMessage: 'You : Sure! let me teach you about ...',
    timeAgo: '4 m Ago',
    image:Person3,
    unread: true,
  },
  {
    id: '4',
    name: 'Nadia Lauren',
    lastMessage: 'Is there anything I can help? Just ...',
    timeAgo: '5 m Ago',
    image:Person1,
    unread: false,
  },
  {
    id: '5',
    name: 'Jeremy Zucker',
    lastMessage: 'You : Sure! let me teach you about ...',
    timeAgo: '4 m Ago',
    image:Person2,
    unread: false,
  },
  {
    id: '6',
    name: 'Jeremy Zucker',
    lastMessage: 'You : Sure! let me teach you about ...',
    timeAgo: '4 m Ago',
    image:Person3,
    unread: true,
  },
  {
    id: '7',
    name: 'Jeremy Zucker',
    lastMessage: 'You : Sure! let me teach you about ...',
    timeAgo: '4 m Ago',
    image:Person1,
    unread: false,
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
    isRead: false,
  },
  {
    id: '2',
    senderName: 'Eten Hunt',
    senderInitials: 'EH',
    subject: 'Appreciation Letter',
    preview: "Thank you very much. I'm glad ...",
    date: '05/11/2025',
    isRead: true,
  },
  {
    id: '3',
    senderName: 'Eten Hunt',
    senderInitials: 'EH',
    subject: 'Appreciation Letter',
    preview: "Thank you very much. I'm glad ...",
    date: '05/11/2025',
    isRead: true,
  },
  {
    id: '4',
    senderName: 'Eten Hunt',
    senderInitials: 'EH',
    subject: 'Appreciation Letter',
    preview: "Thank you very much. I'm glad ...",
    date: '05/11/2025',
    isRead: true,
  },
  {
    id: '5',
    senderName: 'Eten Hunt',
    senderInitials: 'EH',
    subject: 'Appreciation Letter',
    preview: "Thank you very much. I'm glad ...",
    date: '05/11/2025',
    isRead: true,
  },
  {
    id: '6',
    senderName: 'Eten Hunt',
    senderInitials: 'EH',
    subject: 'Appreciation Letter',
    preview: "Thank you very much. I'm glad ...",
    date: '05/11/2025',
    isRead: true,
  },
];

type TabType = 'messages' | 'email';

export default function ChatScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('messages');
  const [searchQuery, setSearchQuery] = useState('');

  const { user } = useAuth();
  const isBrand = user?.userType === 'brand';

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
          backgroundColor: isActive ? '#5EBD3E' : '#EDEDED',
        }}
      >
        <Text
          className="text-[13px] font-medium"
          style={{
            color: isActive ? '#FFFFFF' : '#6C727F',
          }}
        >
          {label}
        </Text>
        {badgeCount && badgeCount > 0 && (
          <View
            className="ml-2 rounded-full items-center justify-center"
            style={{
              backgroundColor: isActive ? '#E53E3E' : '#E53E3E',
              minWidth: 20,
              height: 20,
              paddingHorizontal: 6,
            }}
          >
            <Text
              className="text-xs font-semibold"
              style={{
                color: isActive ? '#FFFFFF' : '#FFFFFF',
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
    const isUnread = item.unread;

    return (
      <TouchableOpacity
        onPress={() => handleChatPress(item)}
        activeOpacity={0.7}
        className="flex-row items-center px-3 py-3 bg-white mx-5 mb-3 rounded-2xl"
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
          <Image source={item.image} style={{ width: 52, height: 52, borderRadius: 26 }} />
        </View>

        {/* Chat Info */}
        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-sm font-semibold text-[#000929]">{item.name}</Text>
            <Text className="text-xs font-normal text-[#76767CCC]">{item.timeAgo}</Text>
          </View>
          <Text
            className={`text-xs  ${isUnread ? 'text-[#000000] font-semibold' : 'text-[#76767CCC] font-medium'}`}
            numberOfLines={1}
          >
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
    const isUnread = !item.isRead;

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
            width: 52,
            height: 52,
            borderRadius: 30,
            backgroundColor: '#D9D9D9',
          }}
        >
          <Text className={`text-xl font-medium  ${isUnread ? 'font-medium text-[#1D1C1C]' : 'font-medium text-[#6C727F]'}`}>{item.senderInitials}</Text>
        </View>

        {/* Email Info */}
        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-1">
            <Text
              className={`text-base font-medium text-'[#1D1C1C]'  `}
            >
              {item.senderName}
            </Text>
            <View className="flex-row items-center">
              <Text className={`text-xs ${isUnread ? 'font-normal text-[#1D1C1C]' : 'font-medium text-[#6C727F]'} mr-1`}>{item.date}</Text>
              <MaterialCommunityIcons name="chevron-right" size={20} color={`${isUnread ? '#1D1C1C' : '#6C727F'}`} />
            </View>
          </View>
          <Text
            className={`text-base mb-1 ${isUnread ? 'font-medium text-[#1D1C1C]' : 'font-medium text-[#6C727F]'}`}
          >
            {item.subject}
          </Text>
          <Text className="text-xs font-medium text-[#6C727F]" numberOfLines={1}>
            {item.preview}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8FB]" edges={['top']} style={{ paddingTop: Platform.OS === 'ios' ? 0 : 20 }}>
      {/* Header */}
      <View className="px-5 pt-6 pb-6 bg-[#F8F8FB]">
        <Text className="text-2xl font-bold text-black">
          {isBrand ? (activeTab === 'messages' ? 'Chat' : 'Email') : 'Chat'}
        </Text>
      </View>

      {/* Tabs - Only show for brands */}
      {isBrand && (
        <View className="flex-row px-5 pb-10 bg-[#F8F8FB]">
          {renderTab('messages', 'Messages')}
          {renderTab('email', 'Email', 3)}
        </View>
      )}
{activeTab === 'messages' && (
  <>
    {/* Search Bar */}
    <View className="px-5 pb-4 bg-[#F8F8FB]">
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        containerStyle={{ marginBottom: 0 }}
      />
    </View>
  </>
)}


      {/* Content */}
      {(!isBrand || activeTab === 'messages') ? (
        // Show chat list for influencers OR when brand has messages tab active
        <FlatList
          data={filteredChats}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 100 }}
          ListEmptyComponent={
            <View className="items-center justify-center py-20">
              <EmptyChatSvg width={200} height={200} />
              <Text className="text-gray-400 text-base mt-4">No messages yet</Text>
            </View>
          }
        />
      ) : (
        // Show email list only for brands when email tab is active
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
