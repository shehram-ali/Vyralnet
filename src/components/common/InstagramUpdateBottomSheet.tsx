import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface InstagramUpdateBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onUpdateAccount: () => void;
  onRemoveAccount: () => void;
}

const { height } = Dimensions.get('window');

export default function InstagramUpdateBottomSheet({
  visible,
  onClose,
  onUpdateAccount,
  onRemoveAccount,
}: InstagramUpdateBottomSheetProps) {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 65,
          friction: 11,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            opacity: fadeAnim,
          }}
        >
          <TouchableWithoutFeedback>
            <Animated.View
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: '#FFFFFF',
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                paddingTop: 20,
                paddingBottom: 40,
                paddingHorizontal: 20,
                transform: [{ translateY: slideAnim }],
              }}
            >
              {/* Handle Bar */}
              <View className="items-center mb-6">
                <View
                  style={{
                    width: 48,
                    height: 4,
                    backgroundColor: '#E5E5E5',
                    borderRadius: 2,
                  }}
                />
              </View>

              {/* Header */}
              <View className="flex-row items-center justify-between mb-6">
                <Text className="text-lg font-semibold text-black flex-1 text-center">
                  Update Instagram
                </Text>
                <TouchableOpacity
                  onPress={onClose}
                  activeOpacity={0.7}
                  className="absolute right-0"
                >
                  <MaterialCommunityIcons name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>

              {/* Update Account Option */}
              <TouchableOpacity
                onPress={() => {
                  onUpdateAccount();
                  onClose();
                }}
                activeOpacity={0.7}
                className="flex-row items-center py-4 border-b border-gray-200"
              >
                <MaterialCommunityIcons
                  name="sync"
                  size={24}
                  color="#000"
                  style={{ marginRight: 16 }}
                />
                <Text className="text-base text-black">Update Account</Text>
              </TouchableOpacity>

              {/* Remove Account Option */}
              <TouchableOpacity
                onPress={() => {
                  onRemoveAccount();
                  onClose();
                }}
                activeOpacity={0.7}
                className="flex-row items-center py-4"
              >
                <MaterialCommunityIcons
                  name="close-circle-outline"
                  size={24}
                  color="#000"
                  style={{ marginRight: 16 }}
                />
                <Text className="text-base text-black">Remove Account</Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
