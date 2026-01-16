import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockInfluencers, Influencer, availableCategories } from '../../../src/data/mockInfluencers';
import InfluencerCard from '../../../src/components/influencer/InfluencerCard';
import FilterBottomSheet, { FilterState } from '../../../src/components/influencer/FilterBottomSheet';
import CategoryPickerBottomSheet from '../../../src/components/influencer/CategoryPickerBottomSheet';
import { ROUTES } from '../../../src/constants';
import Feather from '@expo/vector-icons/Feather';
export default function FavoriteInfluencersScreen() {
  const router = useRouter();
  const [influencers, setInfluencers] = useState<Influencer[]>(mockInfluencers);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    platforms: [],
    locations: [],
    followerRange: null,
  });

  // Toggle favorite status
  const handleToggleFavorite = (id: string) => {
    setInfluencers((prev) =>
      prev.map((influencer) =>
        influencer.id === id
          ? { ...influencer, isFavorite: !influencer.isFavorite }
          : influencer
      )
    );
  };

  // Navigate to profile details
  const handleCardPress = (id: string) => {
    router.push({
      pathname: ROUTES.BRAND.INFLUENCER_PROFILE,
      params: { influencerId: id },
    });
  };

  // Filter influencers based on search and filters
  const filteredInfluencers = useMemo(() => {
    return influencers.filter((influencer) => {
      // Safety check
      if (!influencer) return false;

      // Only show favorites
      if (!influencer.isFavorite) return false;

      // Search filter
      const matchesSearch =
        searchQuery === '' ||
        (influencer.name && influencer.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (influencer.username && influencer.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (influencer.categories && influencer.categories.some((cat) =>
          cat.toLowerCase().includes(searchQuery.toLowerCase())
        ));

      // Category filter
      const matchesCategory =
        filters.categories.length === 0 ||
        (influencer.categories && influencer.categories.some((cat) => filters.categories.includes(cat)));

      return matchesSearch && matchesCategory;
    });
  }, [influencers, searchQuery, filters]);

  const handleApplyFilters = (newFilters: FilterState) => {
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

  const handleCategorySelection = (categories: string[]) => {
    setFilters((prev) => ({ ...prev, categories }));
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center mt-10 justify-between px-5 py-4 bg-white">
        <View className="flex-row items-center flex-1">
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            className="mr-3"
          >
            <MaterialCommunityIcons name="chevron-left" size={28} color="#000" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-black">Favorite Influencers</Text>
        </View>
        <TouchableOpacity
          onPress={() => setShowFilterSheet(true)}
          activeOpacity={0.7}
        >
          <Feather name="filter" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Content */}
     <View className='px-5 pt-4 bg-[#F8F8F8]'>
        {/* Section Heading */}
        <Text className="text-2xl font-bold text-black mb-4">All Influencers</Text>

        {/* Search Bar */}
        <View className="flex-row items-center bg-white rounded-xl px-4 py-3 mb-6 shadow-sm">
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
      {/* Influencer List */}
      <FlatList
        data={filteredInfluencers}
        renderItem={({ item }) => (
          <InfluencerCard
            influencer={item}
            onPress={handleCardPress}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 }}
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <MaterialCommunityIcons name="account-search" size={64} color="#CCC" />
            <Text className="text-gray-500 text-base mt-4">No influencers found</Text>
            <Text className="text-gray-400 text-sm mt-2">
              Try adjusting your search or filters
            </Text>
          </View>
        }
      />

      {/* Filter Bottom Sheet */}
      <FilterBottomSheet
        visible={showFilterSheet}
        onClose={() => setShowFilterSheet(false)}
        currentFilters={filters}
        onApplyFilters={handleApplyFilters}
        onOpenCategoryPicker={handleOpenCategoryPicker}
      />

      {/* Category Picker Bottom Sheet */}
      <CategoryPickerBottomSheet
        visible={showCategoryPicker}
        onClose={handleCloseCategoryPicker}
        selectedCategories={filters.categories}
        onSelectCategories={handleCategorySelection}
        categories={availableCategories}
      />
    </SafeAreaView>
  );
}
