import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import { Frame1984077131Svg } from '../../assets/images';
import ChallengeFilterBottomSheet, {
  ChallengeFilterState,
} from '../../src/components/challenges/ChallengeFilterBottomSheet';
import InfluencerChallengeFilterBottomSheet, {
  InfluencerChallengeFilterState,
} from '../../src/components/challenges/InfluencerChallengeFilterBottomSheet';
import { PickerBottomSheet, SearchBar } from '../../src/components/common';
import { ROUTES } from '../../src/constants';
import { useAuth } from '../../src/hooks/useAuth';

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
    budget: 250,
    location: 'New York, USA',
    postedAt: '4 hrs ago',
  },
  {
    id: '2',
    company: {
      name: 'Nike',
    },
    title: 'Fitness Challenge - Showcase Our New Shoes',
    description: 'Looking for fitness influencers to promote our latest running shoes. Create engaging content showing workouts.',
    categories: ['Fitness', 'Lifestyle'],
    budget: 500,
    location: 'Los Angeles, USA',
    postedAt: '6 hrs ago',
  },
  {
    id: '3',
    company: {
      name: 'Sephora',
    },
    title: 'Beauty Product Review Campaign',
    description: 'Review our new makeup line and share your honest opinion with your followers.',
    categories: ['Fashion', 'Lifestyle'],
    budget: 350,
    location: 'Paris, France',
    postedAt: '8 hrs ago',
  },
  {
    id: '4',
    company: {
      name: 'Samsung',
    },
    title: 'Tech Review - New Galaxy Phone',
    description: 'Create unboxing and review content for our latest smartphone. Must have tech-savvy audience.',
    categories: ['Technology'],
    budget: 600,
    location: 'Tokyo, Japan',
    postedAt: '1 day ago',
  },
  {
    id: '5',
    company: {
      name: 'Starbucks',
    },
    title: 'Coffee Lifestyle Content Creator',
    description: 'Share your daily coffee moments and promote our seasonal drinks in an authentic way.',
    categories: ['Food', 'Lifestyle'],
    budget: 300,
    location: 'New York, USA',
    postedAt: '2 days ago',
  },
  {
    id: '6',
    company: {
      name: 'Airbnb',
    },
    title: 'Travel Vlog - Hidden Gems',
    description: 'Document your stay at unique Airbnb properties and showcase local experiences.',
    categories: ['Travel', 'Lifestyle'],
    budget: 800,
    location: 'Sydney, Australia',
    postedAt: '3 days ago',
  },
  {
    id: '7',
    company: {
      name: 'GoPro',
    },
    title: 'Adventure Sports Challenge',
    description: 'Capture extreme sports and outdoor adventures using our latest GoPro cameras.',
    categories: ['Fitness', 'Travel'],
    budget: 700,
    location: 'Dubai, UAE',
    postedAt: '4 days ago',
  },
  {
    id: '8',
    company: {
      name: 'HelloFresh',
    },
    title: 'Cooking Content Series',
    description: 'Create weekly cooking videos featuring our meal kits. Perfect for food influencers.',
    categories: ['Food', 'Lifestyle'],
    budget: 400,
    location: 'London, UK',
    postedAt: '5 days ago',
  },
  {
    id: '9',
    company: {
      name: 'Tesla',
    },
    title: 'Electric Vehicle Lifestyle Promotion',
    description: 'Showcase sustainable living and document your experience with our electric vehicles.',
    categories: ['Technology', 'Lifestyle'],
    budget: 900,
    location: 'Los Angeles, USA',
    postedAt: '1 week ago',
  },
  {
    id: '10',
    company: {
      name: 'Zara',
    },
    title: 'Fashion Week Street Style',
    description: 'Create fashion-forward content featuring our latest collection during fashion week.',
    categories: ['Fashion'],
    budget: 550,
    location: 'Paris, France',
    postedAt: '1 week ago',
  },
  {
    id: '11',
    company: {
      name: 'Peloton',
    },
    title: 'Home Fitness Transformation',
    description: 'Share your fitness journey and daily workout routines using our equipment.',
    categories: ['Fitness'],
    budget: 450,
    location: 'New York, USA',
    postedAt: '1 week ago',
  },
  {
    id: '12',
    company: {
      name: 'Adobe',
    },
    title: 'Creative Design Tutorial Series',
    description: 'Create educational content showing design tips and tricks using our creative suite.',
    categories: ['Technology'],
    budget: 650,
    location: 'New York, USA',
    postedAt: '2 weeks ago',
  },
];

export default function ChallengesScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  const isBrand = user?.userType === 'brand';

  // Brand filters (existing)
  const [brandFilters, setBrandFilters] = useState<ChallengeFilterState>({
    category: 'Today',
    fromDate: null,
    toDate: null,
  });

  // Influencer filters (new comprehensive filters)
  const [influencerFilters, setInfluencerFilters] = useState<InfluencerChallengeFilterState>({
    industries: [],
    platform: null,
    location: null,
    priceRange: [200, 900],
  });

  const filteredChallenges = useMemo(() => {
    return mockChallenges.filter((challenge) => {
      // Search filter
      const matchesSearch =
        searchQuery === '' ||
        challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.company.name.toLowerCase().includes(searchQuery.toLowerCase());

      if (isBrand) {
        // Brand filters
        const matchesCategory =
          brandFilters.category === 'Today' ||
          brandFilters.category === 'This Week' ||
          brandFilters.category === 'This Month' ||
          (challenge.categories &&
            challenge.categories.some((cat) => cat === brandFilters.category));

        return matchesSearch && matchesCategory;
      } else {
        // Influencer filters
        const matchesIndustry =
          influencerFilters.industries.length === 0 ||
          (challenge.categories &&
            challenge.categories.some((cat) => influencerFilters.industries.includes(cat)));

        const matchesPriceRange =
          challenge.budget >= influencerFilters.priceRange[0] &&
          challenge.budget <= influencerFilters.priceRange[1];

        const matchesLocation =
          !influencerFilters.location || challenge.location === influencerFilters.location;

        return matchesSearch && matchesIndustry && matchesPriceRange && matchesLocation;
      }
    });
  }, [searchQuery, brandFilters, influencerFilters, isBrand]);

  const handleApplyBrandFilters = (newFilters: ChallengeFilterState) => {
    setBrandFilters(newFilters);
  };

  const handleApplyInfluencerFilters = (newFilters: InfluencerChallengeFilterState) => {
    setInfluencerFilters(newFilters);
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
    setBrandFilters({ ...brandFilters, category });
  };

  const renderChallengeCard = ({ item }: { item: Challenge }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        if (!isBrand) {
          // Navigate to challenge details for influencers with 'browse' source
          router.push(`/(features)/(influencer)/challenge-details?id=${item.id}&source=browse` as any);
        }
      }}
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
      <View className="flex-row items-center justify-between px-5 py-4 bg-[#F8F8FB" style={{ paddingTop: Platform.OS === 'ios' ? 0 : 40 }}>
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

      {/* Heading */}
      <View className="px-5 pt-5 pb-3 bg-[#F8F8F8]">
        <Text className="text-xl font-bold text-black">
          {isBrand ? 'Your Posted Challenges' : 'Most Recent'}
        </Text>
      </View>

      {/* Search Bar */}
      <View className="px-5 pb-3 bg-[#F8F8F8]">
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          containerStyle={{ marginBottom: 0 }}
        />
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

      {/* Floating Action Button - Only for Brands */}
      {isBrand && (
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
      )}

      {/* Filter Bottom Sheets - Conditional based on user type */}
      {isBrand ? (
        <>
          {/* Brand Filter Bottom Sheet */}
          <ChallengeFilterBottomSheet
            visible={showFilterSheet}
            currentFilters={brandFilters}
            onClose={() => setShowFilterSheet(false)}
            onApplyFilters={handleApplyBrandFilters}
            onOpenCategoryPicker={handleOpenCategoryPicker}
          />

          {/* Category Picker Bottom Sheet */}
          <PickerBottomSheet
            visible={showCategoryPicker}
            onClose={handleCloseCategoryPicker}
            title="Select Category"
            items={challengeCategories}
            selectedItem={brandFilters.category}
            onSelect={handleSelectCategory}
          />
        </>
      ) : (
        <>
          {/* Influencer Filter Bottom Sheet */}
          <InfluencerChallengeFilterBottomSheet
            visible={showFilterSheet}
            currentFilters={influencerFilters}
            onClose={() => setShowFilterSheet(false)}
            onApplyFilters={handleApplyInfluencerFilters}
          />
        </>
      )}
    </SafeAreaView>
  );
}
