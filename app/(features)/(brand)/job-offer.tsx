import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import SuccessBottomSheet from '../../../src/components/common/SuccessBottomSheet';
import { ROUTES } from '../../../src/constants';

export default function JobOfferScreen() {
  const router = useRouter();

  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showSuccessSheet, setShowSuccessSheet] = useState(false);

  const handleImageUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setUploadedImage(result.assets[0].uri);
    }
  };

  const handleSendOffer = () => {
    // Validate form here if needed
    setShowSuccessSheet(true);
  };

  const handleViewJob = () => {
    setShowSuccessSheet(false);
    router.push({
      pathname: ROUTES.BRAND.JOB_DETAILS,
      params: {
        jobTitle: jobTitle || 'Instagram Influencer',
        budget: budget || '100',
        description: description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        startDate: startDate?.toLocaleDateString() || '',
        endDate: endDate?.toLocaleDateString() || '',
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8F8]" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-5 py-4 bg-white">
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-xs font-bold text-black ml-4">Job Offer</Text>
      </View>

      {/* Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <Text className="text-xl font-bold text-black mb-2">
          Create your Job Offer
        </Text>
        <Text className="text-sm text-[#6C727F] mb-6">
          Enter these details to send the job offer.
        </Text>

        {/* Job Title Input */}
        <View className="bg-white rounded-lg px-4 py-4 mb-4">
          <Text className="text-sm font-semibold text-black mb-2">Job Title</Text>
          <TextInput
            className="text-base text-gray-600"
            placeholder="Instagram Influencer"
            placeholderTextColor="#999"
            value={jobTitle}
            onChangeText={setJobTitle}
          />
        </View>

        {/* Description Input */}
        <View className="bg-white rounded-lg px-4 py-4 mb-4">
          <Text className="text-sm font-semibold text-black mb-2">Description</Text>
          <TextInput
            className="text-base text-gray-600"
            placeholder="something about you..."
            placeholderTextColor="#999"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            style={{ minHeight: 120 }}
          />
        </View>

        {/* Budget Input */}
        <View className="bg-white rounded-lg px-4 py-4 mb-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-sm font-semibold text-gray-600">Budget</Text>
            <View className="flex-row items-center">
              <TextInput
                className="text-base text-gray-600 mr-2 text-right"
                placeholder="0"
                placeholderTextColor="#999"
                value={budget}
                onChangeText={setBudget}
                keyboardType="numeric"
                style={{ minWidth: 100 }}
              />
              <MaterialCommunityIcons name="currency-usd" size={20} color="#666" />
            </View>
          </View>
        </View>

        {/* Start Date Picker */}
        <TouchableOpacity
          onPress={() => setShowStartDatePicker(true)}
          activeOpacity={0.7}
          className="bg-white rounded-lg px-4 py-4 mb-4"
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-sm font-semibold text-gray-600">
              {startDate ? startDate.toLocaleDateString() : 'Start Date'}
            </Text>
            <MaterialCommunityIcons name="calendar" size={20} color="#666" />
          </View>
        </TouchableOpacity>

        {showStartDatePicker && (
          <DateTimePicker
            value={startDate || new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(_event, selectedDate) => {
              setShowStartDatePicker(false);
              if (selectedDate) {
                setStartDate(selectedDate);
              }
            }}
          />
        )}

        {/* End Date Picker */}
        <TouchableOpacity
          onPress={() => setShowEndDatePicker(true)}
          activeOpacity={0.7}
          className="bg-white rounded-lg px-4 py-4 mb-4"
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-sm font-semibold text-gray-600">
              {endDate ? endDate.toLocaleDateString() : 'End Date'}
            </Text>
            <MaterialCommunityIcons name="calendar" size={20} color="#666" />
          </View>
        </TouchableOpacity>

        {showEndDatePicker && (
          <DateTimePicker
            value={endDate || new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(_event, selectedDate) => {
              setShowEndDatePicker(false);
              if (selectedDate) {
                setEndDate(selectedDate);
              }
            }}
          />
        )}

        {/* Upload Image */}
        <TouchableOpacity
          onPress={handleImageUpload}
          activeOpacity={0.7}
         className= "flex-row bg-white rounded-lg px-4 py-4 mb-4"
        >
          <View
            className="items-center justify-center mr-4"
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              backgroundColor: '#006400',
            }}
          >
            <MaterialCommunityIcons name="plus" size={30} color="#FFF" />
          </View>
          <View>
            <Text className="text-md font-semibold text-black mb-1">
              Upload Image
            </Text>
            <Text className="text-sm text-gray-500">
              {uploadedImage ? 'Image uploaded' : 'JPG, PNG - Max 5mb'}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Send Offer Button */}
        <TouchableOpacity
          onPress={handleSendOffer}
          activeOpacity={0.8}
          className="rounded-xl py-4 items-center"
          style={{ backgroundColor: '#5EBD3E' }}
        >
          <Text className="text-lg font-semibold text-white">Send Offer</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Success Bottom Sheet */}
      <SuccessBottomSheet
        visible={showSuccessSheet}
        title="Congratulations!"
        message="Your job invitation has been sent successfully."
        buttonText="View Job"
        onButtonPress={handleViewJob}
        onClose={() => setShowSuccessSheet(false)}
      />
    </SafeAreaView>
  );
}
