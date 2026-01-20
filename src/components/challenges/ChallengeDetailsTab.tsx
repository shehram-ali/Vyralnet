import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { PickerBottomSheet } from '@/components/common';

interface ChallengeDetailsTabProps {
  challengeTitle: string;
  setChallengeTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  participants: string;
  setParticipants: (value: string) => void;
  followersRange: string;
  setFollowersRange: (value: string) => void;
  challengeRounds: string;
  setChallengeRounds: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  budget: string;
  setBudget: (value: string) => void;
  startDate: Date | null;
  setStartDate: (value: Date | null) => void;
  endDate: Date | null;
  setEndDate: (value: Date | null) => void;
  contentLength: string;
  setContentLength: (value: string) => void;
  businessName: string;
  setBusinessName: (value: string) => void;
  website: string;
  setWebsite: (value: string) => void;
  logo: string | null;
  setLogo: (value: string | null) => void;
  onContinue: () => void;
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

const participantsOptions = ['10', '20', '32', '50', '100', '200', '500'];
const followersRangeOptions = ['1k-10k', '10k-50k', '50k-100k', '100k-500k', '500k-1M', '1M+'];
const locationOptions = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Other'];

export default function ChallengeDetailsTab({
  challengeTitle,
  setChallengeTitle,
  description,
  setDescription,
  participants,
  setParticipants,
  followersRange,
  setFollowersRange,
  challengeRounds,
  setChallengeRounds,
  category,
  setCategory,
  location,
  setLocation,
  budget,
  setBudget,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  contentLength,
  setContentLength,
  businessName,
  setBusinessName,
  website,
  setWebsite,
  logo,
  setLogo,
  onContinue,
}: ChallengeDetailsTabProps) {
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showParticipantsPicker, setShowParticipantsPicker] = useState(false);
  const [showFollowersRangePicker, setShowFollowersRangePicker] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);

  const handleImageUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setLogo(result.assets[0].uri);
    }
  };

  return (
    <>
      <Text className="text-sm text-gray-500 mb-6">
        Enter these details to upload your challenge.
      </Text>

      {/* Challenge Title */}
      <View className="bg-white rounded-xl px-4 py-3 mb-4">
        <Text className="text-xs text-gray-500 mb-2">Challenge Title</Text>
        <TextInput
          className="text-sm text-black"
          placeholder="Instagram Influencer"
          placeholderTextColor="#999"
          value={challengeTitle}
          onChangeText={setChallengeTitle}
        />
      </View>

      {/* Description */}
      <View className="bg-white rounded-xl px-4 py-3 mb-4">
        <Text className="text-xs text-gray-500 mb-2">Description</Text>
        <TextInput
          className="text-sm text-black"
          placeholder="something about you..."
          placeholderTextColor="#999"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>

      {/* Select participants */}
      <TouchableOpacity
        onPress={() => setShowParticipantsPicker(true)}
        activeOpacity={0.7}
        className="bg-white rounded-xl px-4 py-4 mb-4 flex-row items-center justify-between"
      >
        <Text className={`text-sm ${participants ? 'text-black' : 'text-gray-500'}`}>
          {participants ? `${participants} participants` : 'Select participants to start'}
        </Text>
        <MaterialCommunityIcons name="chevron-down" size={24} color="#666" />
      </TouchableOpacity>

      {/* Select followers range */}
      <TouchableOpacity
        onPress={() => setShowFollowersRangePicker(true)}
        activeOpacity={0.7}
        className="bg-white rounded-xl px-4 py-4 mb-4 flex-row items-center justify-between"
      >
        <Text className={`text-sm ${followersRange ? 'text-black' : 'text-gray-500'}`}>
          {followersRange ? `${followersRange} followers` : 'Select followers range'}
        </Text>
        <MaterialCommunityIcons name="chevron-down" size={24} color="#666" />
      </TouchableOpacity>

      {/* Challenge Rounds */}
      <View className="bg-white rounded-xl px-4 py-3 mb-4">
        <Text className="text-xs text-gray-500 mb-2">Challenge Rounds</Text>
        <TextInput
          className="text-sm text-black"
          placeholder="0"
          placeholderTextColor="#999"
          value={challengeRounds}
          onChangeText={setChallengeRounds}
          keyboardType="numeric"
        />
      </View>

      {/* Category */}
      <TouchableOpacity
        onPress={() => setShowCategoryPicker(true)}
        activeOpacity={0.7}
        className="bg-white rounded-xl px-4 py-4 mb-4 flex-row items-center justify-between"
      >
        <Text className={`text-sm ${category ? 'text-black' : 'text-gray-500'}`}>
          {category || 'Category'}
        </Text>
        <MaterialCommunityIcons name="chevron-down" size={24} color="#666" />
      </TouchableOpacity>

      {/* Influencer Location */}
      <TouchableOpacity
        onPress={() => setShowLocationPicker(true)}
        activeOpacity={0.7}
        className="bg-white rounded-xl px-4 py-4 mb-4 flex-row items-center justify-between"
      >
        <Text className={`text-sm ${location ? 'text-black' : 'text-gray-500'}`}>
          {location || 'Influencer Location'}
        </Text>
        <MaterialCommunityIcons name="map-marker" size={24} color="#666" />
      </TouchableOpacity>

      {/* Budget */}
      <View className="bg-white rounded-xl px-4 py-4 mb-4 flex-row items-center justify-between">
        <TextInput
          className="text-sm flex-1"
          placeholder="Budget"
          placeholderTextColor="#999"
          value={budget}
          onChangeText={setBudget}
          keyboardType="numeric"
        />
        <MaterialCommunityIcons name="currency-usd" size={24} color="#666" />
      </View>

      {/* Start Date */}
      <TouchableOpacity
        onPress={() => setShowStartDatePicker(true)}
        activeOpacity={0.7}
        className="bg-white rounded-xl px-4 py-4 mb-4 flex-row items-center justify-between"
      >
        <Text className="text-sm text-gray-500">
          {startDate ? startDate.toLocaleDateString() : 'Start Date'}
        </Text>
        <MaterialCommunityIcons name="calendar" size={24} color="#666" />
      </TouchableOpacity>

      {showStartDatePicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_event, selectedDate) => {
            setShowStartDatePicker(false);
            if (selectedDate) setStartDate(selectedDate);
          }}
        />
      )}

      {/* End Date */}
      <TouchableOpacity
        onPress={() => setShowEndDatePicker(true)}
        activeOpacity={0.7}
        className="bg-white rounded-xl px-4 py-4 mb-4 flex-row items-center justify-between"
      >
        <Text className="text-sm text-gray-500">
          {endDate ? endDate.toLocaleDateString() : 'End Date'}
        </Text>
        <MaterialCommunityIcons name="calendar" size={24} color="#666" />
      </TouchableOpacity>

      {showEndDatePicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_event, selectedDate) => {
            setShowEndDatePicker(false);
            if (selectedDate) setEndDate(selectedDate);
          }}
        />
      )}

      {/* Content Length */}
      <View className="bg-white rounded-xl px-4 py-3 mb-4">
        <Text className="text-xs text-gray-500 mb-2">Content Length (Optional)</Text>
        <TextInput
          className="text-sm text-black"
          placeholder=""
          placeholderTextColor="#999"
          value={contentLength}
          onChangeText={setContentLength}
        />
      </View>

      {/* Business Name */}
      <View className="bg-white rounded-xl px-4 py-3 mb-4">
        <Text className="text-xs text-gray-500 mb-2">Business Name</Text>
        <TextInput
          className="text-sm text-black"
          placeholder="Apple Inc."
          placeholderTextColor="#999"
          value={businessName}
          onChangeText={setBusinessName}
        />
      </View>

      {/* Website */}
      <View className="bg-white rounded-xl px-4 py-3 mb-4">
        <Text className="text-xs text-gray-500 mb-2">Website</Text>
        <TextInput
          className="text-sm text-black"
          placeholder=""
          placeholderTextColor="#999"
          value={website}
          onChangeText={setWebsite}
        />
      </View>

      {/* Upload Logo */}
      <TouchableOpacity
        onPress={handleImageUpload}
        activeOpacity={0.7}
        className="flex-row items-center bg-white rounded-xl px-4 py-4 mb-6"
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#006400',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
          }}
        >
          <MaterialCommunityIcons name="plus" size={24} color="#FFF" />
        </View>
        <View>
          <Text className="text-sm font-semibold text-black">
            {logo ? 'Logo uploaded' : 'Upload a logo'}
          </Text>
          <Text className="text-xs text-gray-500">JPG, PNG - Max 5mb</Text>
        </View>
      </TouchableOpacity>

      {/* Continue Button */}
      <TouchableOpacity
        onPress={onContinue}
        activeOpacity={0.8}
        className="rounded-xl py-4 items-center"
        style={{ backgroundColor: '#5EBD3E' }}
      >
        <Text className="text-base font-semibold text-white">Continue</Text>
      </TouchableOpacity>

      {/* Pickers */}
      <PickerBottomSheet
        visible={showParticipantsPicker}
        onClose={() => setShowParticipantsPicker(false)}
        title="Select Participants"
        items={participantsOptions}
        selectedItem={participants}
        onSelect={setParticipants}
        getItemLabel={(item) => `${item} participants`}
      />

      <PickerBottomSheet
        visible={showFollowersRangePicker}
        onClose={() => setShowFollowersRangePicker(false)}
        title="Select Followers Range"
        items={followersRangeOptions}
        selectedItem={followersRange}
        onSelect={setFollowersRange}
        getItemLabel={(item) => `${item} followers`}
      />

      <PickerBottomSheet
        visible={showCategoryPicker}
        onClose={() => setShowCategoryPicker(false)}
        title="Select Category"
        items={challengeCategories}
        selectedItem={category}
        onSelect={setCategory}
      />

      <PickerBottomSheet
        visible={showLocationPicker}
        onClose={() => setShowLocationPicker(false)}
        title="Influencer Location"
        items={locationOptions}
        selectedItem={location}
        onSelect={setLocation}
      />
    </>
  );
}
