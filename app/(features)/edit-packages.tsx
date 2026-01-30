import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SuccessBottomSheet } from '../../src/components';

interface PackageData {
  id: string;
  title: string;
  price: string;
  deliveryDays: string;
  revisions: string;
  sponsored: string;
  features: string[];
  description: string;
  isExpanded: boolean;
}

export default function EditPackagesScreen() {
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [packages, setPackages] = useState<PackageData[]>([
    {
      id: '1',
      title: 'Instagram Story',
      price: '250',
      deliveryDays: '15',
      revisions: '2',
      sponsored: '',
      features: ["I'll share your content", 'Brand Mention'],
      description: '',
      isExpanded: true,
    },
    {
      id: '2',
      title: 'Instagram Story + Swipe Up',
      price: '250',
      deliveryDays: '15',
      revisions: '2',
      sponsored: '',
      features: [],
      description: '',
      isExpanded: false,
    },
  ]);

  const [expandedFeatures, setExpandedFeatures] = useState<{ [key: string]: boolean }>({});

  const togglePackageExpansion = (packageId: string) => {
    setPackages(
      packages.map((pkg) =>
        pkg.id === packageId ? { ...pkg, isExpanded: !pkg.isExpanded } : pkg
      )
    );
  };

  const toggleFeaturesExpansion = (packageId: string) => {
    setExpandedFeatures((prev) => ({
      ...prev,
      [packageId]: !prev[packageId],
    }));
  };

  const updatePackageField = (
    packageId: string,
    field: keyof PackageData,
    value: any
  ) => {
    setPackages(
      packages.map((pkg) => (pkg.id === packageId ? { ...pkg, [field]: value } : pkg))
    );
  };

  const handleUpdatePackages = () => {
    console.log('Packages updated:', packages);
    setShowSuccessModal(true);
  };

  const handleContinue = () => {
    setShowSuccessModal(false);
    router.back();
  };

  const renderPackageSection = (packageData: PackageData) => (
    <View
      key={packageData.id}
      className="bg-[#F8F8FB] rounded-3xl border-2 border-[#E5E7EB] px-5 py-4 mb-4"
    >
      {/* Package Header */}
      <TouchableOpacity
        onPress={() => togglePackageExpansion(packageData.id)}
        activeOpacity={0.7}
        className="flex-row items-center justify-between mb-6"
      >
        <Text className="text-lg font-semibold text-black">
          Package {packageData.id}
        </Text>
        <MaterialCommunityIcons
          name={packageData.isExpanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          color="#9CA3AF"
        />
      </TouchableOpacity>

      {/* Expanded Content */}
      {packageData.isExpanded && (
        <>
          {/* Title */}
          <View className="bg-white rounded-2xl px-4 py-2 mb-3">
            <Text className="text-sm text-gray-500 ">Title</Text>
            <TextInput
              className="text-base text-gray-600"
              placeholder="Instagram Story"
              placeholderTextColor="#9CA3AF"
              value={packageData.title}
              onChangeText={(text) =>
                updatePackageField(packageData.id, 'title', text)
              }
            />
          </View>

          {/* Price */}
          <View className="bg-white rounded-2xl px-4 py-2 mb-3">
            <TextInput
              className="text-base text-gray-500"
              placeholder="Price"
              placeholderTextColor="#9CA3AF"
              value={packageData.price}
              onChangeText={(text) =>
                updatePackageField(packageData.id, 'price', text)
              }
              keyboardType="numeric"
            />
          </View>

          {/* Delivery Days */}
          <View className="bg-white rounded-2xl px-4 py-2 mb-3">
            <TextInput
              className="text-base text-gray-500"
              placeholder="Delivery Days"
              placeholderTextColor="#9CA3AF"
              value={packageData.deliveryDays}
              onChangeText={(text) =>
                updatePackageField(packageData.id, 'deliveryDays', text)
              }
              keyboardType="numeric"
            />
          </View>

          {/* Revision */}
          <View className="bg-white rounded-2xl px-4 py-2 mb-3">
            <TextInput
              className="text-base text-gray-500"
              placeholder="Revision"
              placeholderTextColor="#9CA3AF"
              value={packageData.revisions}
              onChangeText={(text) =>
                updatePackageField(packageData.id, 'revisions', text)
              }
              keyboardType="numeric"
            />
          </View>

          {/* Content will be sponsored? */}
          <View className="bg-white rounded-2xl px-4 py-2 mb-3">
            <TextInput
              className="text-base text-gray-500"
              placeholder="Content will be sponsored?"
              placeholderTextColor="#9CA3AF"
              value={packageData.sponsored}
              onChangeText={(text) =>
                updatePackageField(packageData.id, 'sponsored', text)
              }
            />
          </View>

          {/* Features Dropdown */}
          <TouchableOpacity
            onPress={() => toggleFeaturesExpansion(packageData.id)}
            activeOpacity={0.7}
            className="mb-3"
          >
            <View className="bg-white rounded-2xl px-4 py-4 flex-row items-center justify-between">
              <Text className="text-base text-gray-500">Features</Text>
              <MaterialCommunityIcons
                name={
                  expandedFeatures[packageData.id]
                    ? 'chevron-up'
                    : 'chevron-down'
                }
                size={20}
                color="#000"
              />
            </View>
          </TouchableOpacity>

          {/* Features List (when expanded) */}
          {expandedFeatures[packageData.id] && (
            <View className="mb-6 pl-4">
              {packageData.features.map((feature, idx) => (
                <View key={idx} className="flex-row items-center mb-2">
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={16}
                    color="#5EBD3E"
                  />
                  <Text className="text-sm text-gray-700 ml-2">{feature}</Text>
                </View>
              ))}
              <TouchableOpacity className="mt-2">
                <Text className="text-sm text-[#5EBD3E]">+ Add Feature</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Add your Description */}
          <View className="bg-white rounded-2xl px-4 py-3">
            <TextInput
              className="text-base text-gray-500"
              placeholder="Add your Description"
              placeholderTextColor="#9CA3AF"
              value={packageData.description}
              onChangeText={(text) =>
                updatePackageField(packageData.id, 'description', text)
              }
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              style={{ minHeight: 80 }}
            />
          </View>
        </>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8FB]" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-5 py-4 bg-[#F8F8FB]" style={{ paddingTop: Platform.OS === 'ios' ? 0 : 40 }}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <MaterialCommunityIcons name="chevron-left" size={28} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-black ml-3">
          Edit Packages
        </Text>
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 20, paddingBottom: 40 }}
        >
          {packages.map((pkg) => renderPackageSection(pkg))}
        </ScrollView>

        {/* Update Packages Button */}
        <View className="px-5 pb-6">
          <TouchableOpacity
            onPress={handleUpdatePackages}
            activeOpacity={0.8}
            className="rounded-2xl py-4 items-center"
            style={{ backgroundColor: '#5EBD3E' }}
          >
            <Text className="text-base font-semibold text-white">
              Update Packages
            </Text>
          </TouchableOpacity>
        </View>
        
      </KeyboardAvoidingView>

      {/* Success Bottom Sheet */}
      <SuccessBottomSheet
        visible={showSuccessModal}
        title="Packages Updated!"
        message="Your packages have been updated successfully."
        buttonText="Continue"
        onButtonPress={handleContinue}
        onClose={handleContinue}
      />
    </SafeAreaView>
  );
}
