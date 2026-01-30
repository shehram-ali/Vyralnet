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
  originalBody?: string;
  originalDate?: string;
  senderEmail?: string;
}

export default function SendEmailBottomSheet({
  visible,
  onClose,
  recipientEmail,
  recipientName,
  isReply = false,
  originalSubject = '',
  originalBody = '',
  originalDate = '',
  senderEmail = 'erenhunt@email.com',
}: SendEmailBottomSheetProps) {
  const slideAnim = useRef(new Animated.Value(1000)).current;
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [recipients, setRecipients] = useState<string[]>([]);

  useEffect(() => {
    if (visible) {
      // Set recipients
      setRecipients([recipientEmail]);

      // Set default subject when opening
      if (isReply && originalSubject) {
        // Add "Re: " prefix for replies if not already present
        const replySubject = originalSubject.startsWith('Re: ')
          ? originalSubject
          : `Re: ${originalSubject}`;
        setSubject(replySubject);
      } else {
        setSubject('');
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
  }, [visible, isReply, originalSubject, recipientEmail]);

  const handleSend = () => {
    console.log('Send email:', { recipients, subject, body });
    // Here you would handle sending the email
    onClose();
  };

  const handleAttachment = () => {
    console.log('Open attachment picker');
    // Handle attachment logic
  };

  const removeRecipient = (email: string) => {
    setRecipients(recipients.filter((r) => r !== email));
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: 'white',
          transform: [{ translateY: slideAnim }],
          marginTop: 50,
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
            <View className="flex-row items-center mb-6 justify-between px-6 pb-4">
              <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
                <Text className="text-base font-semibold" style={{ color: '#5EBD3E' }}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <View className="flex-row items-center">
                {/* Attachment Button */}
                <TouchableOpacity
                  onPress={handleAttachment}
                  activeOpacity={0.7}
                  className="w-10 h-10 rounded-full border-[1px] border-[#E3E3E3] bg-white  items-center justify-center mr-3"
                >
                  <AttachmentSvg width={19} height={19} />
                </TouchableOpacity>

                {/* Send Button */}
                <TouchableOpacity
                  onPress={handleSend}
                  activeOpacity={0.8}
                  className="w-10 h-10 rounded-full items-center justify-center"
                  style={{ backgroundColor: '#5EBD3E' }}
                >
                  <SendSvg width={19} height={19} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Email Form */}
            <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
              {/* Title */}
              <Text className="text-xl font-semibold text-[#1D1C1C] mb-6">
                {isReply ? subject : 'New Email'}
              </Text>

              {/* To Field */}
              <View className="mb-2">
                <View className="flex-row items-center flex-wrap">
                  <Text className="text-base text-gray-500 mr-2">To:</Text>
                  {recipients.map((email, index) => (
                    <View
                      key={index}
                      className="flex-row items-center px-3 py-2 rounded-full mr-2 mb-2"
                      style={{ backgroundColor: '#F2F5F8' }}
                    >
                      <Text className="text-sm text-[#4A4A4A] mr-2">{email}</Text>
                      <TouchableOpacity
                        onPress={() => removeRecipient(email)}
                        activeOpacity={0.7}
                        className="bg-white w-4 h-4 rounded-full items-center justify-center"
                      >
                        <MaterialCommunityIcons name="close" size={12} color="#000" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>

              {/* Divider */}
              <View className="h-px bg-[#E5E5E5] mb-4" />

              {/* From Field */}
              <View className="mb-3">
                <Text className="text-sm text-gray-500">
                  From: {senderEmail}
                </Text>
              </View>

              {/* Divider */}
              <View className="h-px bg-[#E5E5E5] mb-2" />

              {/* Subject Field */}
              <View className="mb-3">
  <View className="flex-row items-center">
    <Text className="text-base text-gray-500 mr-2">Subject:</Text>
    <TextInput
      className="flex-1  text-base text-black py-0"
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
                className="text-base text-black"
                value={body}
                onChangeText={setBody}
                placeholder=""
                placeholderTextColor="#000"
                multiline
                textAlignVertical="top"
                style={{ minHeight: isReply ?100 : 200 }}
              />

              {/* Original Email Content (for reply mode) */}
              {isReply && originalBody && (
                <View >
                  {originalDate && (
                    <Text className="text-base font-medium mb-4" style={{ color: '#5EBD3E' }}>
                      {originalDate}
                    </Text>
                  )}
                  <Text className="text-base font-medium text-black" style={{ lineHeight: 20 }}>
                    {originalBody}
                  </Text>
                </View>
              )}
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Animated.View>
    </Modal>
  );
}
