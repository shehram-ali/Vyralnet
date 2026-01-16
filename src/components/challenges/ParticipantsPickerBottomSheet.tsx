import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ParticipantsPickerBottomSheetProps {
  visible: boolean;
  selectedParticipants: string;
  onClose: () => void;
  onSelect: (participants: string) => void;
}

const participantsOptions = ['10', '20', '32', '50', '100', '200', '500'];

export default function ParticipantsPickerBottomSheet({
  visible,
  selectedParticipants,
  onClose,
  onSelect,
}: ParticipantsPickerBottomSheetProps) {
  const handleSelect = (participants: string) => {
    onSelect(participants);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-3xl px-5 pb-8 pt-4">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-xl font-bold text-black">Select Participants</Text>
            <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
              <MaterialCommunityIcons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Options List */}
          <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 400 }}>
            {participantsOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelect(option)}
                activeOpacity={0.7}
                className="flex-row items-center justify-between py-4 border-b border-gray-100"
              >
                <Text
                  className={`text-base ${
                    selectedParticipants === option
                      ? 'font-semibold text-[#5EBD3E]'
                      : 'text-gray-700'
                  }`}
                >
                  {option} participants
                </Text>
                {selectedParticipants === option && (
                  <MaterialCommunityIcons name="check" size={24} color="#5EBD3E" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
