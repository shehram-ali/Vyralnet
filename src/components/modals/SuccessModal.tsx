import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import LottieView from 'lottie-react-native';

const { height } = Dimensions.get('window');

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  buttonText?: string;
}

export default function SuccessModal({
  visible,
  onClose,
  title = 'Thanks for completing your profile!',
  description = 'Your brand details have been saved successfully. You can now explore creators, post challenges, and start collaborating.',
  buttonText = 'Continue',
}: SuccessModalProps) {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const lottieRef = useRef<LottieView>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (visible) {
      // Reset animation
      slideAnim.setValue(height);

      // Slide up from bottom
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 65,
        friction: 11,
        useNativeDriver: true,
      }).start(() => {
        playLottie();
      });

      // REPLAY EVERY 3 SECONDS
      intervalRef.current = setInterval(() => {
        playLottie();
      }, 3000);
    } else {
      // Clear interval when modal closes
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
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
    lottieRef.current.reset();
    lottieRef.current.play();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.bottomSheet,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Bottom Sheet Handle */}
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>

          {/* Content Container */}
          <View style={styles.contentContainer}>
            {/* Lottie Checkmark Animation */}
            <View style={styles.checkmarkContainer}>
              <LottieView
                ref={lottieRef}
                source={require('../../../assets/animations/green-tick.json')}
                autoPlay={false}
                loop={false}
                speed={0.5}
                resizeMode="cover"
                hardwareAccelerationAndroid={true}
                style={styles.lottieAnimation}
              />
            </View>

            {/* Title */}
            <Text style={styles.title}>{title}</Text>

            {/* Description */}
            <Text style={styles.description}>{description}</Text>

            {/* Continue Button */}
            <TouchableOpacity
              onPress={onClose}
              style={styles.button}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
  },
  handleContainer: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 20,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  contentContainer: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  checkmarkContainer: {
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  lottieAnimation: {
    width: 180,
    height: 180,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1D1C1C',
    textAlign: 'center',
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#6C727F',
    textAlign: 'center',
    marginBottom: 32,
    // lineHeight: 22,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 16,
    paddingVertical: 18,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});
