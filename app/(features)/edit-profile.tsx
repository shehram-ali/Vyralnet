import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SuccessBottomSheet, InstagramUpdateBottomSheet } from '../../src/components';
import { useAuth } from '../../src/hooks/useAuth';
import { InstagramSvg } from '../../assets/images';

export default function EditProfileScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const isBrand = user?.userType === 'brand';

  // Brand states
  const [brandName, setBrandName] = useState(user?.brandName || 'John Doe');
  const [businessInfo, setBusinessInfo] = useState(user?.businessInfo || '');

  // Influencer states
  const [fullName, setFullName] = useState(user?.name || 'John Doe');
  const [bio, setBio] = useState(user?.bio || "I'm Instagram influencer, etc...");
  const [category, setCategory] = useState('Fashion, Beauty, Health & Wellness');
  const [advertisingPrice, setAdvertisingPrice] = useState('$100');
  const [instagramHandle, setInstagramHandle] = useState(user?.instagramUsername || '@John_Doe01');

  // Common states
  const [location, setLocation] = useState(user?.location || 'Staten Island, New York, NY, 10001');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showInstagramSheet, setShowInstagramSheet] = useState(false);

  const handleUpdateProfile = () => {
    // Handle profile update logic here
    if (isBrand) {
      console.log('Brand profile updated:', { brandName, businessInfo, location });
    } else {
      console.log('Influencer profile updated:', {
        fullName,
        bio,
        location,
        category,
        advertisingPrice,
        instagramHandle,
      });
    }
    setShowSuccessModal(true);
  };

  const handleContinue = () => {
    setShowSuccessModal(false);
    router.back();
  };

  const handleUpdateInstagram = () => {
    // TODO: Implement Instagram account update logic
    console.log('Update Instagram account');
  };

  const handleRemoveInstagram = () => {
    // TODO: Implement Instagram account removal logic
    console.log('Remove Instagram account');
  };

  const renderBrandFields = () => (
    <>
      {/* Brand Name Card */}
      <View
        className="bg-white rounded-2xl px-4 py-4 mb-4"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        <Text className="text-sm font-medium text-black mb-2">Brand Name</Text>
        <TextInput
          className="text-base text-gray-600"
          placeholder="John Doe"
          placeholderTextColor="#999"
          value={brandName}
          onChangeText={setBrandName}
        />
      </View>

      {/* Business Info Card */}
      <View
        className="bg-white rounded-2xl px-4 py-4 mb-4"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        <Text className="text-sm font-medium text-black mb-2">Business Info</Text>
        <TextInput
          className="text-base text-gray-600"
          placeholder="something about you..."
          placeholderTextColor="#999"
          value={businessInfo}
          onChangeText={setBusinessInfo}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          style={{ minHeight: 80 }}
        />
      </View>
    </>
  );

  const renderInfluencerFields = () => (
    <>
      {/* Full Name Card */}
      <View
        className="bg-white rounded-2xl px-4 py-2 mb-4"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        <Text className="text-sm font-medium  text-black ">Full Name</Text>
        <TextInput
          className="text-base text-black"
          placeholder="John Doe"
          placeholderTextColor="#6C727F"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      {/* Bio Card */}
      <View
        className="bg-white rounded-2xl px-4 py-3 mb-4"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        <Text className="text-sm font-medium text-black mb-2">Bio</Text>
        <TextInput
          className="text-base text-black"
          placeholder="I'm Instagram influencer, etc..."
          placeholderTextColor="#6C727F"
          value={bio}
          onChangeText={setBio}
          multiline
          numberOfLines={2}
          textAlignVertical="top"
          style={{ minHeight: 60 }}
        />
      </View>

      {/* Location Card */}
      <View
        className="bg-white rounded-2xl px-4 py-2 mb-4"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        <Text className="text-sm font-medium text-black ">Location</Text>
        <View className="flex-row items-center justify-between">
          <TextInput
            className="flex-1 text-base text-black"
            placeholder="Staten Island, New York, NY, 10001"
            placeholderTextColor="#6C727F"
            value={location}
            onChangeText={setLocation}
          />
          <TouchableOpacity activeOpacity={0.7}>
            <MaterialCommunityIcons name="map-marker-outline" size={20} color="#999" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Category Card */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setShowCategoryPicker(true)}
      >
        <View
          className="bg-white rounded-2xl px-4 py-2 mb-4"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
          <Text className="text-sm font-medium text-black ">Category</Text>
          <View className="flex-row items-center justify-between">
            <Text className="flex-1 text-base text-black">{category}</Text>
            <MaterialCommunityIcons name="chevron-down" size={20} color="#6C727F" />
          </View>
        </View>
      </TouchableOpacity>

      {/* Advertising Price Card */}
      <View
        className="bg-white rounded-2xl px-4 py-2 mb-4"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        <Text className="text-sm font-medium text-black ">Advertising Price</Text>
        <TextInput
          className="text-base text-black"
          placeholder="$100"
          placeholderTextColor="#6C727F"
          value={advertisingPrice}
          onChangeText={setAdvertisingPrice}
          keyboardType="numeric"
        />
      </View>

      {/* Instagram Handle Card */}
      <View
        className="bg-white rounded-2xl px-4 py-4 mb-4"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            <Image
              source={{ uri: user?.avatar || 'https://i.pravatar.cc/40?img=8' }}
              style={{ width: 32, height: 32, borderRadius: 16, marginRight: 12 }}
            />
            <TextInput
              className="flex-1 text-base text-black"
              placeholder="@John_Doe01"
              placeholderTextColor="#999"
              value={instagramHandle}
              onChangeText={setInstagramHandle}
            />
          </View>
          <TouchableOpacity
            onPress={() => setShowInstagramSheet(true)}
            activeOpacity={0.7}
          >
            <InstagramSvg width={24} height={24} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8FB]" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-5 py-4 bg-[#F8F8FB]" style={{ paddingTop: Platform.OS === 'ios' ? 0 : 40 }}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-black ml-2">Edit Profile</Text>
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 24, paddingBottom: 40 }}
        >
          {isBrand ? renderBrandFields() : renderInfluencerFields()}

          {/* Location Card for Brand */}
          {isBrand && (
            <View
              className="bg-white rounded-2xl px-4 py-4 mb-4"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <View className="flex-row items-center justify-between">
                <TextInput
                  className="flex-1 text-base text-gray-600"
                  placeholder="San Francisco, CA"
                  placeholderTextColor="#999"
                  value={location}
                  onChangeText={setLocation}
                />
                <TouchableOpacity activeOpacity={0.7}>
                  <MaterialCommunityIcons name="map-marker-outline" size={24} color="#999" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Update Profile Button */}
        <View className="px-5 pb-6">
          <TouchableOpacity
            onPress={handleUpdateProfile}
            activeOpacity={0.8}
            className="rounded-2xl py-4 items-center"
            style={{ backgroundColor: '#5EBD3E' }}
          >
            <Text className="text-base font-semibold text-white">Update Profile</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Success Bottom Sheet */}
      <SuccessBottomSheet
        visible={showSuccessModal}
        title="Profile Updated!"
        message="Your profile has been updated successfully."
        buttonText="Continue"
        onButtonPress={handleContinue}
        onClose={handleContinue}
      />

      {/* Instagram Update Bottom Sheet */}
      <InstagramUpdateBottomSheet
        visible={showInstagramSheet}
        onClose={() => setShowInstagramSheet(false)}
        onUpdateAccount={handleUpdateInstagram}
        onRemoveAccount={handleRemoveInstagram}
      />
    </SafeAreaView>
  );
}
