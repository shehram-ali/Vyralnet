import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import { Frame1984077131Svg } from '../../assets/images';
import ChallengeFilterBottomSheet, {
  ChallengeFilterState,
} from '../../src/components/challenges/ChallengeFilterBottomSheet';
import ChallengeCategoryPickerBottomSheet from '../../src/components/challenges/ChallengeCategoryPickerBottomSheet';
import { ROUTES } from '../../src/constants';

interface Challenge {
  id: string;
  company: {
    name: string;
  };
  title: string;
  description: string;
  categories: string[];
  budget: number;
  location: string;
  postedAt: string;
}

const challengeCategories = [
  
  'Comedy',
  'Lifestyle',
  'Technology',
  'Fashion',
  'Food',
  'Travel',
  'Fitness',
];

const mockChallenges: Challenge[] = [
  {
    id: '1',
    company: {
      name: 'Apple Inc.',
    },
    title: 'Expert Influencer Required',
    description: 'One of the most important steps in becoming an influencer is finding your niche.',
    categories: ['Comedy', 'Lifestyle'],
    budget: 100,
    location: 'New York, USA',
    postedAt: '4 hrs ago',
  },
  {
    id: '2',
    company: {
      name: 'Apple Inc.',
    },
    title: 'Expert Influencer Required',
    description: 'One of the most important steps in becoming an influencer is finding your niche.',
    categories: ['Comedy', 'Lifestyle'],
    budget: 100,
    location: 'New York, USA',
    postedAt: '4 hrs ago',
  },
  {
    id: '3',
    company: {
      name: 'Apple Inc.',
    },
    title: 'Expert Influencer Required',
    description: 'One of the most important steps in becoming an influencer is finding your niche.',
    categories: ['Comedy', 'Lifestyle'],
    budget: 100,
    location: 'New York, USA',
    postedAt: '4 hrs ago',
  },
];

export default function ChallengesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [filters, setFilters] = useState<ChallengeFilterState>({
    category: 'Today',
    fromDate: null,
    toDate: null,
  });

  const filteredChallenges = useMemo(() => {
    return mockChallenges.filter((challenge) => {
      // Search filter
      const matchesSearch =
        searchQuery === '' ||
        challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.company.name.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter (if not default)
      const matchesCategory =
        filters.category === 'Today' ||
        filters.category === 'This Week' ||
        filters.category === 'This Month' ||
        (challenge.categories &&
          challenge.categories.some((cat) => cat === filters.category));

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, filters]);

  const handleApplyFilters = (newFilters: ChallengeFilterState) => {
    setFilters(newFilters);
  };

  const handleOpenCategoryPicker = () => {
    setShowFilterSheet(false);
    setTimeout(() => {
      setShowCategoryPicker(true);
    }, 300);
  };

  const handleCloseCategoryPicker = () => {
    setShowCategoryPicker(false);
    setTimeout(() => {
      setShowFilterSheet(true);
    }, 300);
  };

  const handleSelectCategory = (category: string) => {
    setFilters({ ...filters, category });
  };

  const renderChallengeCard = ({ item }: { item: Challenge }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      className="bg-white rounded-2xl p-4 mb-3 mx-5"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      {/* Header - Company Info */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center flex-1">
          <View style={{ width: 32, height: 32 }}>
            <Frame1984077131Svg width={32} height={32} />
          </View>
          <Text className="text-md font-semibold text-black ml-3">
            {item.company.name}
          </Text>
        </View>
        <Text className="text-sm text-black">{item.postedAt}</Text>
      </View>

      {/* Challenge Title */}
      <Text className="text-lg font-bold text-black mb-2">{item.title}</Text>

      {/* Description */}
      <Text className="text-xs text-[#4A4A4A] leading-5 mb-4">
        {item.description}
      </Text>

      {/* Footer - Categories, Budget, Location */}
      <View className="flex-row items-center justify-between">
        {/* Categories */}
        <View className="flex-row flex-wrap flex-1">
          {item.categories && item.categories.map((category, index) => (
            <View
              key={index}
              className="px-3 py-1.5 rounded-xl mr-2 mb-1"
              style={{ backgroundColor: '#F1FFE2' }}
            >
              <Text className="text-xs font-medium" style={{ color: '#006400' }}>
                {category}
              </Text>
            </View>
          ))}
        </View>

        {/* Budget & Location */}
        <View className="items-end">
          <Text className="text-md font-bold text-black">${item.budget}</Text>
          <Text className="text-xs text-[#4A4A4A]">{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1  bg-[#F8F8FB]" edges={['top']}>
      {/* Header */}
      <View className="flex-row pt-10 items-center justify-between px-5 py-4 bg-[#F8F8FB">
        <View className="flex-row items-center flex-1">
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
            <MaterialCommunityIcons name="chevron-left" size={28} color="#000" />
          </TouchableOpacity>
          <Text className="text-md font-bold text-black ml-4">Challenges</Text>
        </View>
        <TouchableOpacity onPress={() => setShowFilterSheet(true)} activeOpacity={0.7}>
          <Feather name="filter" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Your Posted Challenges Heading */}
      <View className="px-5 pt-5 pb-3 bg-[#F8F8F8]">
        <Text className="text-xl font-bold text-black">Your Posted Challenges</Text>
      </View>

      {/* Search Bar */}
      <View className="px-5 pb-3 bg-[#F8F8F8]">
        <View className="flex-row items-center bg-white rounded-xl px-4 py-3 shadow-sm">
          <MaterialCommunityIcons name="magnify" size={20} color="#999" />
          <TextInput
            className="flex-1 ml-2 text-base text-black"
            placeholder="Search"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Challenges List */}
      <FlatList
        data={filteredChallenges}
        renderItem={renderChallengeCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <MaterialCommunityIcons name="trophy-outline" size={60} color="#CCC" />
            <Text className="text-gray-400 text-base mt-4">No challenges found</Text>
          </View>
        }
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        onPress={() => router.push(ROUTES.BRAND.NEW_CHALLENGE)}
        activeOpacity={0.8}
        className="absolute bottom-6 right-6"
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: '#5EBD3E',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 6,
          elevation: 8,
        }}
      >
        <MaterialCommunityIcons name="plus" size={32} color="#FFF" />
      </TouchableOpacity>

      {/* Filter Bottom Sheet */}
      <ChallengeFilterBottomSheet
        visible={showFilterSheet}
        currentFilters={filters}
        onClose={() => setShowFilterSheet(false)}
        onApplyFilters={handleApplyFilters}
        onOpenCategoryPicker={handleOpenCategoryPicker}
      />

      {/* Category Picker Bottom Sheet */}
      <ChallengeCategoryPickerBottomSheet
        visible={showCategoryPicker}
        selectedCategory={filters.category}
        categories={challengeCategories}
        onClose={handleCloseCategoryPicker}
        onSelectCategory={handleSelectCategory}
      />
    </SafeAreaView>
  );
}
