import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import LottieView from 'lottie-react-native';

interface SuccessBottomSheetProps {
  visible: boolean;
  title: string;
  message: string;
  buttonText: string;
  onButtonPress: () => void;
  onClose: () => void;
  onAnimationComplete?: () => void;
}

const { height } = Dimensions.get('window');

export default function SuccessBottomSheet({
  visible,
  title,
  message,
  buttonText,
  onButtonPress,
  onClose,
  onAnimationComplete,
}: SuccessBottomSheetProps) {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const lottieRef = useRef<LottieView>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (visible) {
      // OPEN ANIMATION
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 65,
          friction: 11,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start(() => {
        playLottie();
      });

      // REPLAY EVERY 3 SECONDS
      intervalRef.current = setInterval(() => {
        playLottie();
      }, 3000);
    } else {
      // CLOSE ANIMATION
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
        onAnimationComplete?.();
      });
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [visible]);

  const playLottie = () => {
    if (!lottieRef.current) return;

    // 🔥 THIS IS THE KEY FIX
    lottieRef.current.reset();
    lottieRef.current.play();
  };

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
            backgroundColor: 'rgba(0,0,0,0.5)',
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
                backgroundColor: '#FFF',
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                paddingTop: 12,
                paddingBottom: 40,
                paddingHorizontal: 20,
                transform: [{ translateY: slideAnim }],
              }}
            >
              {/* Handle */}
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

              {/* Animation */}
              <View className="items-center mb-6">
                <LottieView
                  ref={lottieRef}
                  source={require('../../../assets/animations/green-tick.json')}
                  autoPlay={false}
                  loop={false}
                  speed={1.0} // Slower animation pace
                  resizeMode="cover"
                  hardwareAccelerationAndroid={true}
                  style={{ width: 180, height: 180 }}
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
