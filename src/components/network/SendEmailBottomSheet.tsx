import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SendSvg, AttachmentSvg } from '../../../assets/images/index';

interface SendEmailBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  recipientEmail: string;
  recipientName: string;
  isReply?: boolean;
  originalSubject?: string;
}

export default function SendEmailBottomSheet({
  visible,
  onClose,
  recipientEmail,
  recipientName,
  isReply = false,
  originalSubject = '',
}: SendEmailBottomSheetProps) {
  const slideAnim = useRef(new Animated.Value(1000)).current;
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (visible) {
      // Set default subject when opening
      if (isReply && originalSubject) {
        // Add "Re: " prefix for replies if not already present
        const replySubject = originalSubject.startsWith('Re: ')
          ? originalSubject
          : `Re: ${originalSubject}`;
        setSubject(replySubject);
      } else {
        setSubject(`Appreciation Letter - ${recipientName}`);
      }
      setBody('');

      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 65,
        friction: 11,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 1000,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, isReply, originalSubject]);

  const handleSend = () => {
    console.log('Send email:', { recipientEmail, subject, body });
    // Here you would handle sending the email
    onClose();
  };

  const handleAttachment = () => {
    console.log('Open attachment picker');
    // Handle attachment logic
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: 'white',
          transform: [{ translateY: slideAnim }],
        }}
      >
        <SafeAreaView className="flex-1" edges={['top']}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
          >
            {/* Drag Handle */}
            <View className="items-center pt-3 pb-2">
              <View
                style={{
                  width: 40,
                  height: 4,
                  backgroundColor: '#E5E5E5',
                  borderRadius: 2,
                }}
              />
            </View>

            {/* Header */}
            <View className="flex-row items-center justify-between px-6 py-4">
              <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
                <Text className="text-md font-medium" style={{ color: '#5EBD3E' }}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <View className="flex-row items-center">
                {/* Attachment Button */}
                <TouchableOpacity
                  onPress={handleAttachment}
                  activeOpacity={0.7}
                  className="w-12 h-12 rounded-full bg-white  items-center justify-center mr-3"
                >
                  <AttachmentSvg width={24} height={24} />
                </TouchableOpacity>

                {/* Send Button */}
                <TouchableOpacity
                  onPress={handleSend}
                  activeOpacity={0.8}
                  className="w-12 h-12 rounded-full items-center justify-center"
                  style={{ backgroundColor: '#5EBD3E' }}
                >
                  <SendSvg width={24} height={24} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Email Form */}
            <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
              {/* Title */}
              <Text className="text-xl font-bold text-[#1D1C1C] mb-6">New Email</Text>

              {/* To Field */}
              <View className="mb-4">
                <View className="flex-row items-center">
                  <Text className="text-base text-[#999] mr-2">To:</Text>
                  <View
                    className="flex-row items-center px-3 py-2 rounded-full"
                    style={{ backgroundColor: '#F2F5F8' }}
                  >
                    <Text className="text-base text-black mr-2">{recipientEmail}</Text>
                    <TouchableOpacity onPress={onClose} activeOpacity={0.7} className='bg-white w-4 h-4 rounded-full'>
                      <MaterialCommunityIcons name="close" size={14} color="#000" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Divider */}
              <View className="h-px bg-[#E5E5E5] mb-4" />

              {/* From Field */}
              <View className="mb-4">
                <Text className="text-base text-[#999]">
                  From: erenhunt@email.com
                </Text>
              </View>

              {/* Divider */}
              <View className="h-px bg-[#E5E5E5] mb-4" />

              {/* Subject Field */}
              <View className="mb-4">
                <View className="flex-row items-center">
                  <Text className="text-base text-[#999] mr-2">Subject:</Text>
                  <TextInput
                    className="flex-1 text-base text-black"
                    value={subject}
                    onChangeText={setSubject}
                    placeholder="Enter subject"
                    placeholderTextColor="#999"
                  />
                </View>
              </View>

              {/* Divider */}
              <View className="h-px bg-[#E5E5E5] mb-4" />

              {/* Body Field */}
              <TextInput
                className="flex-1 text-base text-black"
                value={body}
                onChangeText={setBody}
                placeholder="Compose email..."
                placeholderTextColor="#999"
                multiline
                textAlignVertical="top"
                style={{ minHeight: 200 }}
              />
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Animated.View>
    </Modal>
  );
}
