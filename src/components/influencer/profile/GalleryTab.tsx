import React from 'react';
import { View, Text, FlatList, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const imageWidth = (width - 60) / 3; // 3 columns with padding

interface GalleryTabProps {
  gallery: string[];
}

export default function GalleryTab({ gallery }: GalleryTabProps) {
  return (
    <View className="bg-white px-5 pt-4 pb-6">
      <Text className="text-lg font-bold text-black mb-2">Check Gallery</Text>
      <Text className="text-sm text-gray-500 mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>

      {/* Gallery Grid */}
      <FlatList
        data={gallery}
        renderItem={({ item }) => (
          <View
            style={{
              width: imageWidth,
              height: imageWidth * 1.2,
              padding: 4,
            }}
          >
            <Image
              source={{ uri: item }}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 12,
              }}
              resizeMode="cover"
            />
          </View>
        )}
        keyExtractor={(item, index) => `${item}-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
