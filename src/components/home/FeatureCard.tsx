import React from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface FeatureCardProps {
  title: string;
  image?: any;
  icon?: React.ReactNode;
  gradientColors: [string, string];
  onPress: () => void;
}

export default function FeatureCard({ title, image, icon, gradientColors, onPress }: FeatureCardProps) {
  return (
    <TouchableOpacity
      className="rounded-2xl overflow-hidden"
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.container}
    >
      <LinearGradient
        colors={gradientColors}
        start={[0, 0]}
        end={[0, 1]}
        style={styles.gradient}
      >
        <View style={styles.iconContainer}>
          {image ? (
            <Image
              source={image}
              style={{ width: 70, height: 70 }}
              resizeMode="contain"
            />
          ) : (
            <View style={{ width: 70, height: 70, alignItems: 'center', justifyContent: 'center' }}>
              {icon}
            </View>
          )}
        </View>
        <View style={styles.textContainer}>
          <Text className="text-base font-semibold text-[#1D1C1C]">{title}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
  },
  gradient: {
    minHeight: 120,
    padding: 16,
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
  },
});
