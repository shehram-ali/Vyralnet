import { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import { View, Image, Animated, Dimensions, StatusBar } from 'react-native';
import { ROUTES } from '../src/constants';
import { SplashLogoSvg, SplashBigLogo } from '../assets/images';
import { useAuth } from '../src/hooks/useAuth';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  // Animation values
  const firstLogoY = useRef(new Animated.Value(-height)).current;
  const firstLogoX = useRef(new Animated.Value(0)).current;
  const secondLogoX = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    // Wait for auth to load
    if (isLoading) return;

    // Sequence of animations
    const startAnimations = async () => {
      // Step 1: First logo comes from top to center
      await new Promise((resolve) => {
        Animated.spring(firstLogoY, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }).start(resolve);
      });

      // Wait at center
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Step 2: First logo moves left and hides
      await new Promise((resolve) => {
        Animated.timing(firstLogoX, {
          toValue: -width,
          duration: 500,
          useNativeDriver: true,
        }).start(resolve);
      });

      // Step 3: Second logo appears from right to center
      await new Promise((resolve) => {
        Animated.spring(secondLogoX, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }).start(resolve);
      });

      // Wait at center
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Navigate based on authentication status
      if (isAuthenticated) {
        router.replace(ROUTES.ONBOARDING.INDEX);
      } else {
        router.replace(ROUTES.AUTH.LOGIN);
      }
    };

    startAnimations();
  }, [isLoading, isAuthenticated]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" translucent={false} />
      {/* First Logo - Circular Icon */}
      <Animated.View
        style={{
          position: 'absolute',
          transform: [
            { translateY: firstLogoY },
            { translateX: firstLogoX },
          ],
        }}
      >
        <SplashLogoSvg width={100} height={100} />
      </Animated.View>

      {/* Second Logo - Logo with Text */}
      <Animated.View
        style={{
          position: 'absolute',
          transform: [{ translateX: secondLogoX }],
        }}
      >
        <Image
          source={SplashBigLogo}
          style={{ width: 250, height: 80 }}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}
