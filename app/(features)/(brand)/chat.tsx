import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ROUTES } from '../../../src/constants';
import { mockInfluencers } from '../../../src/data/mockInfluencers';

interface Message {
  id: string;
  sender: 'user' | 'influencer';
  text: string;
  timestamp: string;
  senderName: string;
}

export default function ChatScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const influencerId = params.influencerId as string;
  const passedInfluencerName = params.influencerName as string;

  // Find influencer by ID
  const influencer = useMemo(() => {
    return mockInfluencers.find((inf) => inf.id === influencerId);
  }, [influencerId]);

  const influencerName = passedInfluencerName || influencer?.name || 'Influencer';
  const influencerAvatar = influencer?.avatar;

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'influencer',
      text: 'Good question. How about just discussing it?',
      timestamp: '11:55',
      senderName: influencerName,
    },
    {
      id: '2',
      sender: 'user',
      text: 'Of course. Thank you so much for taking your time.',
      timestamp: '11:56',
      senderName: 'James Doe',
    },
    {
      id: '3',
      sender: 'influencer',
      text: 'Good question. How about just discussing it?',
      timestamp: '11:55',
      senderName: influencerName,
    },
    {
      id: '4',
      sender: 'user',
      text: 'Of course. Thank you so much for taking your time.',
      timestamp: '11:56',
      senderName: 'James Doe',
    },
    {
      id: '5',
      sender: 'influencer',
      text: 'Good question. How about just discussing it?',
      timestamp: '11:55',
      senderName: influencerName,
    },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'user',
        text: message,
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
        senderName: 'James Doe',
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleHireInfluencer = () => {
    router.push({
      pathname: ROUTES.BRAND.JOB_OFFER,
      params: { influencerName },
    });
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.sender === 'user';

    return (
      <View
        style={{
          flexDirection: isUser ? 'row-reverse' : 'row',
          marginBottom: 16,
          
          paddingHorizontal: 16,
          alignItems: 'flex-end',
        }}
      >
        {/* Avatar */}
        {!isUser && influencerAvatar ? (
          <Image
            source={
              typeof influencerAvatar === 'string'
                ? { uri: influencerAvatar }
                : influencerAvatar
            }
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              marginRight: 8,
            }}
          />
        ) : (
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: isUser ? '#5EBD3E' : '#E0E0E0',
              marginLeft: isUser ? 8 : 0,
              marginRight: isUser ? 0 : 8,
            }}
          />
        )}

        {/* Message Bubble */}
        <View style={{ maxWidth: '70%' }}>
          {/* Sender Name
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#000',
              marginBottom: 4,
              textAlign: isUser ? 'right' : 'left',
            }}
          >
            {item.senderName}
          </Text> */}

          {/* Message Text */}
          <View
            style={{
              backgroundColor: isUser ? '#5EBD3E' : '#F0F0F0',
              borderRadius: 16,
              padding: 12,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: isUser ? '#FFF' : '#000',
                lineHeight: 20,
              }}
            >
              {item.text}
            </Text>
          </View>

          {/* Timestamp and Status */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 4,
              justifyContent: isUser ? 'flex-end' : 'flex-start',
            }}
          >
            {isUser && (
              <MaterialCommunityIcons
                name="check"
                size={14}
                color="#5EBD3E"
                style={{ marginRight: 4 }}
              />
            )}
            <Text style={{ fontSize: 12, color: '#999' }}>{item.timestamp}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center justify-between mt-10 px-4 py-3 bg-white">
        <View className="flex-row items-center flex-1">
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
            <MaterialCommunityIcons name="chevron-left" size={28} color="#000" />
          </TouchableOpacity>

          {/* User Info */}
          <View className="flex-row items-center ml-2">
            {influencerAvatar ? (
              <Image
                source={
                  typeof influencerAvatar === 'string'
                    ? { uri: influencerAvatar }
                    : influencerAvatar
                }
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  marginRight: 12,
                }}
              />
            ) : (
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: '#E0E0E0',
                  marginRight: 12,
                }}
              />
            )}
            <View>
              <Text className="text-base font-bold text-black">
                {influencerName}
              </Text>
              <View className="flex-row items-center">
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: '#5EBD3E',
                    marginRight: 6,
                  }}
                />
                <Text className="text-sm text-gray-500">Online</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Hire Influencer Button */}
        <TouchableOpacity
          onPress={handleHireInfluencer}
          activeOpacity={0.8}
          className="rounded-lg px-4 py-2"
          style={{ backgroundColor: '#5EBD3E' }}
        >
          <Text className="text-sm font-semibold text-white">
            Hire Influencer
          </Text>
        </TouchableOpacity>
      </View>

      {/* Date Separator */}
      <View className="items-center py-4">
        <View className="bg-white px-4 py-2 rounded-full">
          <Text className="text-sm text-gray-600">Today</Text>
        </View>
      </View>

      {/* Messages List */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Message Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <View
          className="flex-row items-center px-4 py-3 bg-white"
          style={{
            borderTopWidth: 1,
            borderTopColor: '#E0E0E0',
          }}
        >
          {/* Attachment Button */}
          <TouchableOpacity activeOpacity={0.7} className="mr-3">
            <MaterialCommunityIcons name="paperclip" size={24} color="#999" />
          </TouchableOpacity>

          {/* Text Input */}
          <TextInput
            className="flex-1 bg-[#F5F5F5] rounded-full px-4 py-2 text-base"
            placeholder="Write a message..."
            placeholderTextColor="#999"
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={500}
          />

          {/* Send Button */}
          <TouchableOpacity
            onPress={handleSendMessage}
            activeOpacity={0.8}
            className="ml-3 items-center justify-center"
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: '#5EBD3E',
            }}
          >
            <MaterialCommunityIcons name="send" size={22} color="#FFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
