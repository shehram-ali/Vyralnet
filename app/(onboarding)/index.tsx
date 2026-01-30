import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ROUTES } from '../../src/constants';
import { InfluencerSlide1, InfluencerSlide2, InfluencerSlide3 } from '../../assets/images';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    img: InfluencerSlide1,
    title: 'Social media, gamified — \n Compete. Get paid. Repeat.',
    description: "You vs one creator. One battle. One payout. For once, the algorithm doesn't decide who wins.",
    showSignUp: false,
    showLogin: false,
    showNext: true,
    showSkip: true,
    showGetStarted: false,
  },
  {
    id: 2,
    img: InfluencerSlide2,
    title: '32 Creators. 4 Rounds. Only \n 16 Survive.',
    description: 'Your real goes one-on-one — vote for view. Win the matchup. Advance. Get paid more each round.',
    showSignUp: false,
    showLogin: false,
    showNext: true,
    showSkip: true,
    showGetStarted: false,
  },
  {
    id: 3,
    img: InfluencerSlide3,
    title: 'Go Vyral. Get Paid.\nNo Catch.',
    description: 'Free to play. Real reviews. Brand-sponsored tournaments. Win up to $5,000 in 4 days.',
    showSignUp: false,
    showLogin: false,
    showNext: true,
    showSkip: false,
    showGetStarted: false,
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(slideIndex);
  };

  // Auto-scroll to next slide every 2 seconds (only when not paused)
  useEffect(() => {
    if (currentIndex < slides.length - 1 && !isPaused) {
      const timer = setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          x: (currentIndex + 1) * width,
          animated: false,
        });
        setCurrentIndex(currentIndex + 1);
      }, 2000); // 2 seconds

      return () => clearTimeout(timer);
    }

  }, [currentIndex, isPaused]);

  const handleNext = () => {
    if (currentIndex < 2) {
      scrollViewRef.current?.scrollTo({
        x: (currentIndex + 1) * width,
        animated: true,
      });
    } else {
      router.replace(ROUTES.AUTH.LOGIN);
    }
  };

  const handleSkip = () => {
    router.replace(ROUTES.AUTH.LOGIN);
  };

  const handleSignUp = () => {
    router.replace(ROUTES.ONBOARDING.SIGNUP_OPTIONS);
  };

  const handleLogin = () => {
    router.replace(ROUTES.AUTH.LOGIN);
  };

  return (
    <View
      style={styles.container}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
       <StatusBar translucent backgroundColor="transparent" />

      {/* Slides */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        scrollEnabled={true}
      >
        {slides.map((slide, index) => (
          <View key={slide.id} style={[styles.slide, { width }]}>
            {index === 0 ? (
              <LinearGradient
                colors={['#DDA15E', '#9B7EDB']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.imageContainer}
              >
                <Image
                  source={slide.img}
                  style={styles.slideImage}
                  resizeMode="cover"
                />
              </LinearGradient>
            ) : (
              <View style={[styles.imageContainer, { backgroundColor: index === 1 ? '#6CBEEF' : '#F5B22D' }]}>
                <Image
                  source={slide.img}
                  style={styles.slideImage}
                  resizeMode="contain"
                />
              </View>
            )}
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{slide.title}</Text>
              {slide.description ? <Text style={styles.description}>{slide.description}</Text> : null}

              <View style={styles.dotsContainer}>
                {slides.map((_, dotIndex) => (
                  <View
                    key={dotIndex}
                    style={[styles.dot, index === dotIndex && styles.dotActive]}
                  />
                ))}
              </View>

              {slide.showSignUp && (
                <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp} activeOpacity={0.8}>
                  <Text style={styles.signUpButtonText}>Sign Up</Text>
                </TouchableOpacity>
              )}

              {slide.showLogin && (
                <TouchableOpacity onPress={handleLogin} style={styles.loginLink}>
                  <Text style={styles.loginLinkText}>Log in</Text>
                </TouchableOpacity>
              )}

              {slide.showNext && (
                <TouchableOpacity style={styles.nextButton} onPress={handleNext} activeOpacity={0.8}>
                  <Text style={styles.nextButtonText}>
                    {index === 2 ? 'Get Started' : 'Next'}
                  </Text>
                </TouchableOpacity>
              )}

              {slide.showSkip ? (
                <TouchableOpacity onPress={handleSkip} style={styles.skipLink}>
                  <Text style={styles.skipLinkText}>Skip</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.skipPlaceholder} />
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  slide: {
    flex: 1,
    position: 'relative',
  },
  imageContainer: {
    width: width,
    height: height * 0.70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImage: {
    width: width,
    height: '100%',
  },
  contentContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 60,
    minHeight: height * 0.43,
    overflow: 'hidden',
  },
  title: {
    fontSize: 20,
    // fontWeight: 'semibold',
    fontWeight:'600',
    color: '#000',
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 10,
    lineHeight: 26,
  },
  description: {
    fontSize: 14,
    color: '#999797',
    fontWeight:'400',
    textAlign: 'center',
    marginBottom: 34,
    lineHeight: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    paddingTop:24,
    
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,

    backgroundColor: '#D1EDC8',
    marginHorizontal: 4,
  },
  dotActive: {
    width: 32,
    backgroundColor: '#4CAF50',
  },
  signUpButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 16,
  },
  signUpButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loginLink: {
    alignItems: 'center',
  },
  loginLinkText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 16,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  skipLink: {
    alignItems: 'center',
  },
  skipLinkText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
  skipPlaceholder: {
    height: 22,
    alignItems: 'center',
  },
  getStartedButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
  },
  getStartedButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
