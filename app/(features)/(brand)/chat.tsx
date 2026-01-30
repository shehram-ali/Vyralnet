import React, { useState, useMemo, useRef } from 'react';
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
import { Send2Svg } from 'assets/images';

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

  const flatListRef = useRef<FlatList>(null);
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

      // Scroll to bottom after sending message
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
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
              width: 24,
              height: 24,
              borderRadius: 16,
              marginRight: 8,
            }}
          />
        ) : (
         <Image
            source={
              typeof influencerAvatar === 'string'
                ? { uri: influencerAvatar }
                : influencerAvatar
            }
            style={{
              width: 24,
              height: 24,
              borderRadius: 16,
              marginLeft: 8,
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
              borderRadius: 10,
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
                color="#3469F9"
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
      <View className="flex-row items-center justify-between  px-4 py-3 bg-white" style={{paddingTop:Platform.OS === 'ios' ? 0 : 40}}>
        <View className="flex-row items-center flex-1">
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
            <MaterialCommunityIcons name="chevron-left" size={30} color="#000" />
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
              <Text className="text-base font-bold text-[#000929]">
                {influencerName}
              </Text>
              <View className="flex-row items-center">
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 4,
                    backgroundColor: '#5EBD3E',
                    marginRight: 4,
                  }}
                />
                <Text className="text-xs font-medium text-[#BABABA]">Online</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Hire Influencer Button */}
        <TouchableOpacity
          onPress={handleHireInfluencer}
          activeOpacity={0.8}
          className="rounded-lg px-3 py-2 "
          style={{ backgroundColor: '#5EBD3E' }}
        >
          <Text className="text-sm font-medium text-white">
            Hire Influencer
          </Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Messages Container */}
        <View className="flex-1 bg-[#F8F8FB]">
          {/* Date Separator */}
          <View className="items-center py-4">
            <View className="bg-[#F8F8FB] px-4 py-2 rounded-full">
              <Text className="text-sm text-gray-600">Today</Text>
            </View>
          </View>

          {/* Messages List */}
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />
        </View>

        {/* Message Input Container */}
        <View className="bg-white px-4 py-3">
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // borderWidth: 1,
              // borderColor: '#D1D5DB',
              borderRadius: 24,
              paddingHorizontal: 12,
              paddingVertical: 8,
              backgroundColor: '#FFFFFF',
              paddingBottom:30,
            }}
          >
            {/* Attachment Button */}
            <TouchableOpacity activeOpacity={0.7} style={{ marginRight: 8 }}>
              <MaterialCommunityIcons name="paperclip" size={22} color="#9CA3AF" />
            </TouchableOpacity>

            {/* Text Input */}
            <TextInput
              className="flex-1 text-base"
              placeholder="Write a message..."
              placeholderTextColor="#D1D5DB"
              value={message}
              onChangeText={setMessage}
              multiline
              maxLength={500}
              style={{
                maxHeight: 80,
                paddingVertical: 0,
                color: '#000',
              }}
            />

            {/* Send Button */}
            <TouchableOpacity
              onPress={handleSendMessage}
              activeOpacity={0.8}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: '#5EBD3E',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 8,
              }}
            >
              <Send2Svg width={18} height={18} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
