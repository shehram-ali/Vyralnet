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
import { ROUTES } from '../../src/constants';
import { InfluencerSlide1, InfluencerSlide2, InfluencerSlide3 } from '../../assets/images';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    img: InfluencerSlide1,
    title: 'Social media stardom —\ncheaper. Do just figure.',
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
    title: '32 Creators. 4 Rounds. Only 16 Survive.',
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
    showNext: false,
    showSkip: false,
    showGetStarted: true,
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(slideIndex);
  };

  // Auto-scroll to next slide every 2 seconds
  useEffect(() => {
    if (currentIndex < slides.length - 1) {
      const timer = setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          x: (currentIndex + 1) * width,
          animated: false,
        });
        setCurrentIndex(currentIndex + 1);
      }, 2000); // 2 seconds

      return () => clearTimeout(timer);
    }

  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < 2) {
      scrollViewRef.current?.scrollTo({
        x: (currentIndex + 1) * width,
        animated: true,
      });
    } else {
      router.replace(ROUTES.ONBOARDING.SIGNUP_OPTIONS);
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
    <View style={styles.container}>
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
            <View style={styles.imageContainer}>
              <Image
                source={slide.img}
                style={styles.slideImage}
                resizeMode="cover"
              />
            </View>
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
                  <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
              )}

              {slide.showSkip && (
                <TouchableOpacity onPress={handleSkip} style={styles.skipLink}>
                  <Text style={styles.skipLinkText}>Skip</Text>
                </TouchableOpacity>
              )}

              {slide.showGetStarted && (
                <TouchableOpacity style={styles.getStartedButton} onPress={handleNext} activeOpacity={0.8}>
                  <Text style={styles.getStartedButtonText}>Get Started</Text>
                </TouchableOpacity>
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
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: width,
    height: height * 0.55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImage: {
    width: width,
    height: '100%',
  },
  contentContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 60,
    minHeight: height * 0.45,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 32,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 4,
  },
  dotActive: {
    width: 24,
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
    fontWeight: '500',
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
