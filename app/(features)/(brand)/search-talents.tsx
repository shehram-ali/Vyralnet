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

export default function SearchTalentsScreen() {
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

  const handleSelectCategories = (selectedCategories: string[]) => {
    setFilters({ ...filters, categories: selectedCategories });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8F8]" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center justify-between pt-10 px-5 py-4 bg-white">
        <View className="flex-row items-center flex-1">
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
            <MaterialCommunityIcons name="chevron-left" size={28} color="#000" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-black ml-4">Search Talents</Text>
        </View>
        <TouchableOpacity onPress={() => setShowFilterSheet(true)} activeOpacity={0.7}>
          <Feather name="filter" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* All Talents Heading */}
      <View className="px-5 pt-5 pb-3 bg-[#F8F8F8]">
        <Text className="text-2xl font-bold text-black">All Talents</Text>
      </View>

      {/* Search Bar */}
      <View className="px-5 pb-4 bg-[#F8F8F8]">
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

      {/* Influencers List */}
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
            <MaterialCommunityIcons name="account-search" size={60} color="#CCC" />
            <Text className="text-gray-400 text-base mt-4">No influencers found</Text>
          </View>
        }
      />

      {/* Filter Bottom Sheet */}
      <FilterBottomSheet
        visible={showFilterSheet}
        currentFilters={filters}
        onClose={() => setShowFilterSheet(false)}
        onApplyFilters={handleApplyFilters}
        onOpenCategoryPicker={handleOpenCategoryPicker}
      />

      {/* Category Picker Bottom Sheet */}
      <CategoryPickerBottomSheet
        visible={showCategoryPicker}
        selectedCategories={filters.categories}
        categories={availableCategories}
        onClose={handleCloseCategoryPicker}
        onSelectCategories={handleSelectCategories}
      />
    </SafeAreaView>
  );
}
