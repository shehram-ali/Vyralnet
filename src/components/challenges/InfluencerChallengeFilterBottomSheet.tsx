import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BaseBottomSheet from '../common/BaseBottomSheet';
import PickerBottomSheet from '../common/PickerBottomSheet';
import SearchableMultiSelectBottomSheet from './SearchableMultiSelectBottomSheet';
import { BOTTOM_SHEET_COLORS } from '@/constants/bottomSheet';

export interface InfluencerChallengeFilterState {
  industries: string[];
  platform: string | null;
  location: string | null;
  priceRange: [number, number];
}

interface InfluencerChallengeFilterBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  currentFilters: InfluencerChallengeFilterState;
  onApplyFilters: (filters: InfluencerChallengeFilterState) => void;
}

const INDUSTRIES = [
  'Fashion',
  'Beauty',
  'Health & Wellness',
  'Consumer Goods',
  'Technology',
  'Food & Beverage',
  'Travel',
  'Fitness',
  'Lifestyle',
  'Entertainment',
];

const PLATFORMS = [
  'Instagram',
  'TikTok',
  'YouTube',
  'Facebook',
  'Twitter',
  'LinkedIn',
];

const LOCATIONS = [
  'New York, USA',
  'Los Angeles, USA',
  'London, UK',
  'Paris, France',
  'Tokyo, Japan',
  'Sydney, Australia',
  'Dubai, UAE',
];

const MIN_PRICE = 200;
const MAX_PRICE = 900;

export default function InfluencerChallengeFilterBottomSheet({
  visible,
  onClose,
  currentFilters,
  onApplyFilters,
}: InfluencerChallengeFilterBottomSheetProps) {
  const [tempFilters, setTempFilters] = useState<InfluencerChallengeFilterState>(currentFilters);
  const [showIndustryPicker, setShowIndustryPicker] = useState(false);
  const [showPlatformPicker, setShowPlatformPicker] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);

  // Reset temp filters when opening
  useEffect(() => {
    if (visible) {
      setTempFilters(currentFilters);
    }
  }, [visible, currentFilters]);

  const handleReset = () => {
    const resetFilters: InfluencerChallengeFilterState = {
      industries: [],
      platform: null,
      location: null,
      priceRange: [MIN_PRICE, MAX_PRICE],
    };
    setTempFilters(resetFilters);
  };

  const handleApply = () => {
    onApplyFilters(tempFilters);
    onClose();
  };

  const handleIndustrySelect = (industries: string[]) => {
    setTempFilters({ ...tempFilters, industries });
  };

  const handlePlatformSelect = (platform: string) => {
    setTempFilters({ ...tempFilters, platform });
  };

  const handleLocationSelect = (location: string) => {
    setTempFilters({ ...tempFilters, location });
  };

  const handlePriceRangeChange = (index: 0 | 1, value: number) => {
    const newRange: [number, number] = [...tempFilters.priceRange];
    newRange[index] = Math.round(value);

    // Ensure min doesn't exceed max and vice versa
    if (index === 0 && newRange[0] > newRange[1]) {
      newRange[1] = newRange[0];
    } else if (index === 1 && newRange[1] < newRange[0]) {
      newRange[0] = newRange[1];
    }

    setTempFilters({ ...tempFilters, priceRange: newRange });
  };

  const getIndustryDisplayText = () => {
    if (tempFilters.industries.length === 0) return 'Industry';
    if (tempFilters.industries.length === 1) return tempFilters.industries[0];
    return `${tempFilters.industries.length} selected`;
  };

  return (
    <>
      <BaseBottomSheet
        visible={visible}
        onClose={onClose}
        title="Refine your Search"
        maxHeight="75%"
      >
        <View className="px-5 py-4">
          {/* Industry Dropdown */}
          <TouchableOpacity
            onPress={() => setShowIndustryPicker(true)}
            activeOpacity={0.7}
            className="flex-row items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-4 mb-4"
          >
            <Text className="text-base text-gray-600">
              {getIndustryDisplayText()}
            </Text>
            <MaterialCommunityIcons name="chevron-down" size={24} color="#666" />
          </TouchableOpacity>

          {/* Platform Dropdown */}
          <TouchableOpacity
            onPress={() => setShowPlatformPicker(true)}
            activeOpacity={0.7}
            className="flex-row items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-4 mb-4"
          >
            <Text className="text-base text-gray-600">
              {tempFilters.platform || 'Platform'}
            </Text>
            <MaterialCommunityIcons name="chevron-down" size={24} color="#666" />
          </TouchableOpacity>

          {/* Location Dropdown */}
          <TouchableOpacity
            onPress={() => setShowLocationPicker(true)}
            activeOpacity={0.7}
            className="flex-row items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-4 mb-6"
          >
            <Text className="text-base text-gray-600">
              {tempFilters.location || 'Location'}
            </Text>
            <MaterialCommunityIcons name="chevron-down" size={24} color="#666" />
          </TouchableOpacity>

          {/* Price Range */}
          <View className="mb-6">
            <Text className="text-base font-medium text-gray-800 mb-3">Price Range</Text>

            {/* Price Display */}
            <View className="flex-row justify-between mb-2">
              <Text className="text-xl font-bold text-gray-800">
                ${tempFilters.priceRange[0]}
              </Text>
              <Text className="text-xl font-bold text-gray-800">
                ${tempFilters.priceRange[1]}
              </Text>
            </View>

            {/* Dual Slider Effect - Using two separate sliders */}
            <View className="relative h-10 justify-center">
              {/* Track */}
              <View className="absolute w-full h-1 bg-gray-200 rounded-full" />

              {/* Active Track */}
              <View
                className="absolute h-1 rounded-full"
                style={{
                  backgroundColor: '#5EBD3E',
                  left: `${((tempFilters.priceRange[0] - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%`,
                  right: `${100 - ((tempFilters.priceRange[1] - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%`,
                }}
              />

              {/* Min Slider */}
              <Slider
                style={{ width: '100%', height: 40, position: 'absolute' }}
                minimumValue={MIN_PRICE}
                maximumValue={MAX_PRICE}
                step={10}
                value={tempFilters.priceRange[0]}
                onValueChange={(value) => handlePriceRangeChange(0, value)}
                minimumTrackTintColor="transparent"
                maximumTrackTintColor="transparent"
                thumbTintColor="#5EBD3E"
              />

              {/* Max Slider */}
              <Slider
                style={{ width: '100%', height: 40, position: 'absolute' }}
                minimumValue={MIN_PRICE}
                maximumValue={MAX_PRICE}
                step={10}
                value={tempFilters.priceRange[1]}
                onValueChange={(value) => handlePriceRangeChange(1, value)}
                minimumTrackTintColor="transparent"
                maximumTrackTintColor="transparent"
                thumbTintColor="#5EBD3E"
              />
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row gap-3 mt-2">
            <TouchableOpacity
              onPress={handleReset}
              activeOpacity={0.7}
              className="flex-1 bg-gray-200 rounded-xl py-4 items-center"
            >
              <Text className="text-base font-semibold text-gray-700">Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleApply}
              activeOpacity={0.7}
              className="flex-1 rounded-xl py-4 items-center"
              style={{ backgroundColor: '#5EBD3E' }}
            >
              <Text className="text-base font-semibold text-white">Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BaseBottomSheet>

      {/* Industry Picker with Search */}
      <SearchableMultiSelectBottomSheet
        visible={showIndustryPicker}
        onClose={() => setShowIndustryPicker(false)}
        title="Select Industry"
        items={INDUSTRIES}
        selectedItems={tempFilters.industries}
        onSelect={handleIndustrySelect}
      />

      {/* Platform Picker */}
      <PickerBottomSheet
        visible={showPlatformPicker}
        onClose={() => setShowPlatformPicker(false)}
        title="Select Platform"
        items={PLATFORMS}
        selectedItem={tempFilters.platform}
        onSelect={handlePlatformSelect}
      />

      {/* Location Picker */}
      <PickerBottomSheet
        visible={showLocationPicker}
        onClose={() => setShowLocationPicker(false)}
        title="Select Location"
        items={LOCATIONS}
        selectedItem={tempFilters.location}
        onSelect={handleLocationSelect}
      />
    </>
  );
}
