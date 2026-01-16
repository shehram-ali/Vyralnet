import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import { Frame1984077131Svg, InstagramSvg } from '../../../assets/images';
import FilterBottomSheet, {
  FilterState,
} from '../../../src/components/influencer/FilterBottomSheet';
import CategoryPickerBottomSheet from '../../../src/components/influencer/CategoryPickerBottomSheet';
import AddToListBottomSheet from '../../../src/components/influencer/AddToListBottomSheet';
import CreateListBottomSheet from '../../../src/components/influencer/CreateListBottomSheet';

interface Influencer {
  id: string;
  name: string;
  username: string;
  avatar?: any;
  followers: string;
  engagementRate: string;
  hasEmail: boolean;
  categories?: string[];
}

const mockInfluencers: Influencer[] = [
  {
    id: '1',
    name: 'Eten Hunt',
    username: '@eten_hunt_1235',
    avatar: Frame1984077131Svg,
    followers: '10K-50K',
    engagementRate: '3.6%',
    hasEmail: true,
    categories: ['Lifestyle'],
  },
  {
    id: '2',
    name: 'Eten Hunt',
    username: '@eten_hunt_1235',
    avatar: Frame1984077131Svg,
    followers: '10K-50K',
    engagementRate: '3.6%',
    hasEmail: true,
    categories: ['Lifestyle'],
  },
  {
    id: '3',
    name: 'Eten Hunt',
    username: '@eten_hunt_1235',
    avatar: Frame1984077131Svg,
    followers: '10K-50K',
    engagementRate: '3.6%',
    hasEmail: true,
    categories: ['Lifestyle'],
  },
  {
    id: '4',
    name: 'Eten Hunt',
    username: '@eten_hunt_1235',
    avatar: Frame1984077131Svg,
    followers: '10K-50K',
    engagementRate: '3.6%',
    hasEmail: true,
    categories: ['Lifestyle'],
  },
];

const influencerCategories = [
  'Comedy',
  'Lifestyle',
  'Technology',
  'Fashion',
  'Food',
  'Travel',
  'Fitness',
  'Beauty',
  'Gaming',
  'Sports',
];

export default function FindInfluencerScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showAddToListSheet, setShowAddToListSheet] = useState(false);
  const [showCreateListSheet, setShowCreateListSheet] = useState(false);
  const [selectedInfluencers, setSelectedInfluencers] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    platform: [],
    audienceLocation: [],
    ageBracket: [],
    gender: [],
    followers: [],
    er: [],
    category: [],
  });

  const filteredInfluencers = useMemo(() => {
    return mockInfluencers.filter((influencer) => {
      if (!influencer) return false;

      const matchesSearch =
        searchQuery === '' ||
        (influencer.categories &&
          influencer.categories.some((cat) =>
            cat.toLowerCase().includes(searchQuery.toLowerCase())
          ));

      const matchesCategory =
        !filters.category ||
        filters.category.length === 0 ||
        (influencer.categories &&
          influencer.categories.some((cat) => filters.category.includes(cat)));

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, filters]);

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

  const handleSelectCategories = (categories: string[]) => {
    setFilters({ ...filters, category: categories || [] });
  };

  const handleSaveToList = (listName: string) => {
    console.log('Saving to list:', listName, 'Influencers:', selectedInfluencers);
    // Here you would save to your backend or state management
    setShowAddToListSheet(false);
    setSelectedInfluencers([]);
  };

  const handleCreateList = (listName: string) => {
    console.log('Creating new list:', listName, 'with influencers:', selectedInfluencers);
    // Here you would create a new list and save influencers to it
    setShowCreateListSheet(false);
    setSelectedInfluencers([]);
  };

  const toggleSelectInfluencer = (id: string) => {
    setSelectedInfluencers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (!filteredInfluencers || filteredInfluencers.length === 0) return;

    if (selectedInfluencers.length === filteredInfluencers.length) {
      setSelectedInfluencers([]);
    } else {
      setSelectedInfluencers(filteredInfluencers.map((inf) => inf.id));
    }
  };

  const isAllSelected =
    filteredInfluencers &&
    filteredInfluencers.length > 0 &&
    selectedInfluencers.length === filteredInfluencers.length;

  const renderInfluencerCard = ({ item }: { item: Influencer }) => {
    const isSelected = selectedInfluencers.includes(item.id);

    return (
      <TouchableOpacity
        onPress={() => toggleSelectInfluencer(item.id)}
        activeOpacity={0.7}
        className="rounded-2xl p-4 mb-3 mx-5"
        style={{
          backgroundColor: isSelected ? '#F1FFE2' : '#FFFFFF',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        {/* Header - Profile Info with Checkbox */}
        <View className="flex-row items-start justify-between mb-3">
          <View className="flex-row items-start flex-1">
            <View style={{ width: 40, height: 40 }}>
              <Frame1984077131Svg width={40} height={40} />
            </View>
            <View className="ml-3 flex-1">
              <View className="flex-row items-center">
                <Text className="text-sm font-bold text-black mr-2">{item.name}</Text>
                <InstagramSvg width={20} height={20}/>
              </View>
              <Text className="text-xs text-#76767CCC">{item.username}</Text>
            </View>
          </View>
          <View
            className="w-5 h-5 rounded border-2 items-center justify-center"
            style={{
              borderColor: isSelected ? '#5EBD3E' : '#D1D5DB',
              backgroundColor: isSelected ? '#5EBD3E' : 'transparent',
            }}
          >
            {isSelected && (
              <MaterialCommunityIcons name="check" size={14} color="#FFF" />
            )}
          </View>
        </View>

        {/* Stats */}
        <View className="flex-row justify-between mb-3">
          <View className="flex-1">
            <Text className="text-xs text-[#6C727F] mb-1">Followers</Text>
            <Text className="text-sm font-semibold text-black">{item.followers}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-xs text-[#6C727F] mb-1">ER</Text>
            <Text className="text-sm font-semibold text-black">
              {item.engagementRate}
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-xs text-[#6C727F] mb-1">Email</Text>
            <Text className="text-sm font-semibold text-black">
              {item.hasEmail ? 'Yes' : 'No'}
            </Text>
          </View>
        </View>

        {/* Categories */}
        {item.categories && item.categories.length > 0 && (
          <View className="flex-row flex-wrap">
            {item.categories.map((category, index) => (
              <View
                key={index}
                className="px-3 py-2 rounded-md mr-2 mb-1"
                style={{ backgroundColor: '#E0F6C6' }}
              >
                <Text className="text-xs font-medium text-black" >
                  {category}
                </Text>
              </View>
            ))}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8FB]" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center justify-between pt-10 px-5 py-4 bg-[#F8F8FB]">
        <View className="flex-row items-center flex-1">
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
            <MaterialCommunityIcons name="chevron-left" size={28} color="#000" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-black ml-4">Find Influencer</Text>
        </View>
        <TouchableOpacity onPress={() => setShowFilterSheet(true)} activeOpacity={0.7}>
          <Feather name="filter" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* All Influencers Heading */}
      <View className="px-5 pt-3 pb-3 bg-[#F8F8F8]">
        <Text className="text-xl font-bold text-black">All Influencers</Text>
      </View>

      {/* Search Bar */}
      <View className="px-5 pb-3 bg-[#F8F8F8]">
        <View className="flex-row items-center bg-white rounded-xl px-4 py-3 shadow-sm">
          <MaterialCommunityIcons name="magnify" size={24} color="#999" />
          <TextInput
            className="flex-1 ml-2 text-base text-black"
            placeholder="Enter Category"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Select All */}
      <View className="px-5 pb-3 bg-[#F8F8F8] flex-row items-center justify-end">
        <Text className="text-sm text-gray-600 mr-2">Select All</Text>
        <TouchableOpacity
          onPress={toggleSelectAll}
          activeOpacity={0.7}
          className="w-4 h-4 rounded border-2 items-center justify-center"
          style={{
            borderColor: isAllSelected ? '#5EBD3E' : '#D1D5DB',
            backgroundColor: isAllSelected ? '#5EBD3E' : 'transparent',
          }}
        >
          {isAllSelected && (
            <MaterialCommunityIcons name="check" size={10} color="#FFF" />
          )}
        </TouchableOpacity>
      </View>

      {/* Influencers List */}
      <FlatList
        data={filteredInfluencers || []}
        renderItem={renderInfluencerCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: selectedInfluencers.length > 0 ? 180 : 100
        }}
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <MaterialCommunityIcons name="account-search" size={60} color="#CCC" />
            <Text className="text-gray-400 text-base mt-4">No influencers found</Text>
          </View>
        }
      />

      {/* Floating Action Button */}
     
        <TouchableOpacity
          onPress={() => setShowCreateListSheet(true)}
          activeOpacity={0.8}
          className="absolute  right-6"
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
            bottom: selectedInfluencers.length > 0 ? 120 : 24,
          }}
        >
          <MaterialCommunityIcons name="plus" size={32} color="#FFF" />
        </TouchableOpacity>
     

      {/* Bottom Selection Bar */}
      {selectedInfluencers.length > 0 && (
        <View
          className="absolute bottom-0 left-0 right-0 bg-white px-6 py-4"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 10,
          }}
        >
          <Text className="text-base font-semibold text-black mb-3">
            Selected: <Text style={{ color: '#5EBD3E' }}>{String(selectedInfluencers.length).padStart(2, '0')}</Text>
          </Text>
          <TouchableOpacity
            onPress={() => setShowAddToListSheet(true)}
            activeOpacity={0.8}
            className="rounded-2xl py-4 items-center"
            style={{ backgroundColor: '#5EBD3E' }}
          >
            <Text className="text-base font-semibold text-white">Add to my List</Text>
          </TouchableOpacity>
        </View>
      )}

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
        selectedCategories={filters.category || []}
        categories={influencerCategories}
        onClose={handleCloseCategoryPicker}
        onSelectCategories={handleSelectCategories}
      />

      {/* Add to List Bottom Sheet */}
      <AddToListBottomSheet
        visible={showAddToListSheet}
        onClose={() => setShowAddToListSheet(false)}
        onSave={handleSaveToList}
      />

      {/* Create List Bottom Sheet */}
      <CreateListBottomSheet
        visible={showCreateListSheet}
        onClose={() => setShowCreateListSheet(false)}
        onSave={handleCreateList}
      />
    </SafeAreaView>
  );
}
