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
import LottieView from 'lottie-react-native';
import { GreenTickAnimation } from '../../../assets/animations';

interface SuccessBottomSheetProps {
  visible: boolean;
  title: string;
  message: string;
  buttonText: string;
  onButtonPress: () => void;
  onClose: () => void;
}

const { height } = Dimensions.get('window');

export default function SuccessBottomSheet({
  visible,
  title,
  message,
  buttonText,
  onButtonPress,
  onClose,
}: SuccessBottomSheetProps) {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const lottieRef = useRef<LottieView>(null);

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
      ]).start(() => {
        // Play Lottie animation after sheet appears
        setTimeout(() => {
          lottieRef.current?.play();
        }, 100);
      });
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
                paddingTop: 12,
                paddingBottom: 40,
                paddingHorizontal: 20,
                transform: [{ translateY: slideAnim }],
              }}
            >
              {/* Handle Bar */}
              <View className="items-center mb-8">
                <View
                  style={{
                    width: 48,
                    height: 4,
                    backgroundColor: '#E5E5E5',
                    borderRadius: 2,
                  }}
                />
              </View>

              {/* Success Animation */}
              <View className="items-center mb-6">
                <LottieView
                  ref={lottieRef}
                  source={GreenTickAnimation}
                  loop={false}
                  style={{
                    width: 200,
                    height: 200,
                  }}
                />
              </View>

              {/* Title */}
              <Text className="text-2xl font-bold text-black text-center mb-3">
                {title}
              </Text>

              {/* Message */}
              <Text className="text-base text-gray-600 text-center mb-8">
                {message}
              </Text>

              {/* Button */}
              <TouchableOpacity
                onPress={onButtonPress}
                activeOpacity={0.8}
                className="rounded-2xl py-4 items-center"
                style={{ backgroundColor: '#5EBD3E' }}
              >
                <Text className="text-base font-semibold text-white">
                  {buttonText}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
