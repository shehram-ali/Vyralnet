import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { LoadingAnimation } from '../../../assets/animations';

interface LoadingSpinnerProps {
  visible: boolean;
  size?: number;
}

export default function LoadingSpinner({ visible, size = 120 }: LoadingSpinnerProps) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <LottieView
        source={LoadingAnimation}
        autoPlay
        loop
        style={{
          width: size,
          height: size,
        }}
        colorFilters={[
          {
            keypath: '*',
            color: '#4CAF50', // Green color
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});
