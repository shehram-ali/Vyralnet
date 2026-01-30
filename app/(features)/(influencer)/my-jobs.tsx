import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  JobCard,
  SearchBar,
  FilterBottomSheet,
  PickerBottomSheet,
} from '../../../src/components/common';
import { EmptyJobsSvg } from 'assets/images';

interface Job {
  id: string;
  companyName: string;
  companyLogo?: any;
  timestamp: string;
  title: string;
  description: string;
  categories: string[];
  budget: string;
  location: string;
}

// Mock data
const mockJobs: Job[] = [
  {
    id: '1',
    companyName: 'Apple Inc.',
    timestamp: '4 hrs ago',
    title: 'Expert Influencer Required',
    description: 'One of the most important steps in becoming an influencer is finding your niche.',
    categories: ['Comedy', 'Lifestyle'],
    budget: '$100',
    location: 'New York, USA',
  },
  {
    id: '2',
    companyName: 'Apple Inc.',
    timestamp: '4 hrs ago',
    title: 'Expert Influencer Required',
    description: 'One of the most important steps in becoming an influencer is finding your niche.',
    categories: ['Comedy', 'Lifestyle'],
    budget: '$100',
    location: 'New York, USA',
  },
  {
    id: '3',
    companyName: 'Apple Inc.',
    timestamp: '4 hrs ago',
    title: 'Expert Influencer Required',
    description: 'One of the most important steps in becoming an influencer is finding your niche.',
    categories: ['Comedy', 'Lifestyle'],
    budget: '$100',
    location: 'New York, USA',
  },
];

export default function MyJobsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter states
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState<'from' | 'to'>('from');

  const [filters, setFilters] = useState({
    category: 'Today',
    fromDate: null as Date | null,
    toDate: null as Date | null,
  });

  const categoryOptions = ['Today', 'Comedy', 'Lifestyle', 'Tech', 'Food', 'Travel'];

  const handleJobPress = (jobId: string) => {
    // Navigate to job details
    router.push({
      pathname: '/(features)/(influencer)/job-details',
      params: { id: jobId },
    } as any);
  };

  const handleFilter = () => {
    setShowFilterSheet(true);
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (selectedDate) {
      if (datePickerMode === 'from') {
        setFilters({ ...filters, fromDate: selectedDate });
      } else {
        setFilters({ ...filters, toDate: selectedDate });
      }
    }

    if (Platform.OS === 'ios' && event.type === 'dismissed') {
      setShowDatePicker(false);
    }
  };

  const handleOpenDatePicker = (mode: 'from' | 'to') => {
    setDatePickerMode(mode);
    setShowDatePicker(true);
  };

  const handleApplyFilters = () => {
    // Apply filter logic here
    console.log('Filters applied:', filters);
    setShowFilterSheet(false);
  };

  const handleResetFilters = () => {
    setFilters({
      category: 'Today',
      fromDate: null,
      toDate: null,
    });
  };

  const filteredJobs = mockJobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8FB]" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-4" style={{ paddingTop: Platform.OS === 'ios' ? 0 : 40 }}>
        <View className="flex-row items-center flex-1">
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
            <MaterialCommunityIcons name="chevron-left" size={28} color="#000" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-black ml-2">My Jobs</Text>
        </View>
        <TouchableOpacity onPress={handleFilter} activeOpacity={0.7}>
          <MaterialCommunityIcons name="filter-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Section Title */}
      <View className="px-5 pt-4 pb-3">
        <Text className="text-xl font-semibold text-black">Your Jobs</Text>
      </View>

      {/* Search Bar */}
      <View className="px-5 mb-4">
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          containerStyle={{ marginBottom: 0 }}
        />
      </View>

      {/* Jobs List */}
      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <JobCard
            companyName={item.companyName}
            timestamp={item.timestamp}
            title={item.title}
            description={item.description}
            categories={item.categories}
            budget={item.budget}
            location={item.location}
            onPress={() => handleJobPress(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <View className="items-center justify-center py-10">
            <EmptyJobsSvg width={240} height={220} />
          </View>
        }
      />

      {/* Filter Bottom Sheet */}
      <FilterBottomSheet
        visible={showFilterSheet}
        onClose={() => setShowFilterSheet(false)}
        title="Refine your Search"
        fields={[
          {
            type: 'picker',
            label: 'Category',
            value: filters.category,
            onPress: () => setShowCategoryPicker(true),
            placeholder: 'Today',
            icon: 'chevron-down',
          },
          {
            type: 'date',
            label: 'From Date',
            value: filters.fromDate ? formatDate(filters.fromDate) : null,
            onPress: () => handleOpenDatePicker('from'),
            placeholder: 'From Date',
          },
          {
            type: 'date',
            label: 'To Date',
            value: filters.toDate ? formatDate(filters.toDate) : null,
            onPress: () => handleOpenDatePicker('to'),
            placeholder: 'To Date',
          },
        ]}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
        applyButtonLabel="Apply"
      />

      {/* Category Picker */}
      <PickerBottomSheet
        visible={showCategoryPicker}
        onClose={() => setShowCategoryPicker(false)}
        title="Select Category"
        items={categoryOptions}
        selectedItem={filters.category}
        onSelect={(category) => {
          setFilters({ ...filters, category });
          setShowCategoryPicker(false);
        }}
      />

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={
            datePickerMode === 'from'
              ? filters.fromDate || new Date()
              : filters.toDate || new Date()
          }
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}
    </SafeAreaView>
  );
}
