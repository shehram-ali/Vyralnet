import React, { useEffect, useRef } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ChallengePickerBottomSheetProps {
  visible: boolean;
  selectedChallenge: string;
  challenges: string[];
  onClose: () => void;
  onSelectChallenge: (challenge: string) => void;
}

export default function ChallengePickerBottomSheet({
  visible,
  selectedChallenge,
  challenges,
  onClose,
  onSelectChallenge,
}: ChallengePickerBottomSheetProps) {
  const slideAnim = useRef(new Animated.Value(600)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 65,
        friction: 11,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 600,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleSelectChallenge = (challenge: string) => {
    onSelectChallenge(challenge);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'flex-end',
        }}
      >
        <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
          <Animated.View
            style={{
              backgroundColor: 'white',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              paddingBottom: 40,
              transform: [{ translateY: slideAnim }],
            }}
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
            <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-100">
              <View style={{ width: 24 }} />
              <Text className="text-lg font-bold text-black">Challenges</Text>
              <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
                <MaterialCommunityIcons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Challenge List */}
            <ScrollView
              style={{ maxHeight: 400 }}
              contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
            >
              {challenges.map((challenge, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSelectChallenge(challenge)}
                  activeOpacity={0.7}
                  className="py-4"
                  style={{
                    borderBottomWidth: index === challenges.length - 1 ? 0 : 1,
                    borderBottomColor: '#F0F0F0',
                  }}
                >
                  <Text
                    className="text-base"
                    style={{
                      color: selectedChallenge === challenge ? '#5EBD3E' : '#000',
                      fontWeight: selectedChallenge === challenge ? '600' : '400',
                    }}
                  >
                    {challenge}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
