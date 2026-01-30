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

interface ChallengeJoinConfirmationSheetProps {
  visible: boolean;
  onConfirm: () => void;
  onClose: () => void;
  onAnimationComplete?: () => void;
}

const { height } = Dimensions.get('window');

export default function ChallengeJoinConfirmationSheet({
  visible,
  onConfirm,
  onClose,
  onAnimationComplete,
}: ChallengeJoinConfirmationSheetProps) {
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
      ]).start(() => {
        // Call callback after closing animation completes
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      });
    }
  }, [visible, onAnimationComplete]);

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
                paddingTop: 12,
                paddingBottom: 40,
                paddingHorizontal: 20,
                transform: [{ translateY: slideAnim }],
              }}
            >
              {/* Handle Bar */}
              <View className="items-center mb-4">
                <View
                  style={{
                    width: 48,
                    height: 4,
                    backgroundColor: '#E5E5E5',
                    borderRadius: 2,
                  }}
                />
              </View>

              {/* Close Button */}
              <TouchableOpacity
                onPress={onClose}
                activeOpacity={0.7}
                className="absolute top-5 right-5 z-10"
              >
                <MaterialCommunityIcons name="close" size={24} color="#000" />
              </TouchableOpacity>

              {/* Title */}
              <Text className="text-xl font-bold text-black text-center mb-6 mt-4">
                Challenge Confirmation
              </Text>

              {/* Alert Icon - Green Warning */}
              <View className="items-center justify-center mb-6">
                {/* Outer Layer - Light Green */}
                <View
                  className="items-center justify-center rounded-full"
                  style={{
                    width: 96,
                    height: 96,
                    backgroundColor: '#F2FFED',
                  }}
                >
                  {/* Inner Circle - Green */}
                 
                    <MaterialCommunityIcons
                      name="alert-outline"
                      size={48}
                      color="#5EBD3E"
                    />
                  </View>
             
              </View>

              {/* Main Message */}
              <Text className="text-xl font-bold text-black text-center mb-3">
                Ready to join the Challenge?
              </Text>

              {/* Warning Message */}
              <Text className="text-base text-[#6C727F] text-center mb-8 px-4">
                Once you join the challenge, you won't be able to leave or withdraw.
              </Text>

              {/* Confirm Button */}
              <TouchableOpacity
                onPress={onConfirm}
                activeOpacity={0.8}
                className="rounded-2xl py-4 items-center"
                style={{ backgroundColor: '#5EBD3E' }}
              >
                <Text className="text-base font-medium text-white">
                  Yes, Join
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
