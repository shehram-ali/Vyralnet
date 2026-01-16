import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SuccessBottomSheet } from '../../../src/components/common';
import ChallengeDetailsTab from '../../../src/components/challenges/ChallengeDetailsTab';
import ChallengePreviewTab from '../../../src/components/challenges/ChallengePreviewTab';
import ChallengePaymentTab from '../../../src/components/challenges/ChallengePaymentTab';

export default function NewChallengeScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'details' | 'preview' | 'payment'>('details');

  // Form state
  const [challengeTitle, setChallengeTitle] = useState('');
  const [description, setDescription] = useState('');
  const [participants, setParticipants] = useState('');
  const [followersRange, setFollowersRange] = useState('');
  const [challengeRounds, setChallengeRounds] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [contentLength, setContentLength] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [website, setWebsite] = useState('');
  const [logo, setLogo] = useState<string | null>(null);

  // Payment state
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const [showSuccessSheet, setShowSuccessSheet] = useState(false);

  const handleDetailsContinue = () => {
    setActiveTab('preview');
  };

  const handlePreviewContinue = () => {
    setActiveTab('payment');
  };

  const handlePaymentContinue = () => {
    setShowSuccessSheet(true);
  };

  const handleViewChallenge = () => {
    setShowSuccessSheet(false);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F5]" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center pt-12 px-5 py-4 bg-white">
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <MaterialCommunityIcons name="chevron-left" size={28} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-black ml-4">New Challenge</Text>
      </View>

      {/* Tab Navigation */}
      <View className="bg-white px-5 py-3">
        <Text className="text-xl font-bold text-black mb-4">Tell Us About Your Challenge</Text>
        <View className="flex-row border-b-8  border-gray-200">
          <View
            // onPress={() => setActiveTab('details')}
            className="flex-1 pb-3"
          >
            <Text
              className={`text-sm font-semibold text-center ${
                activeTab === 'details' ? 'text-black' : 'text-gray-400'
              }`}
            >
              Challenge Details
            </Text>
            {activeTab === 'details' && (
              <View className="absolute -bottom-2 left-0 right-0 rounded-lg h-2 bg-[#5EBD3E]" />
            )}
          </View>
          <View
            // onPress={() => setActiveTab('preview')}
            className="flex-1 pb-3"
          >
            <Text
              className={`text-sm font-semibold text-center ${
                activeTab === 'preview' ? 'text-black' : 'text-gray-400'
              }`}
            >
              Preview
            </Text>
            {activeTab === 'preview' && (
              <View className="absolute -bottom-2 left-0 right-0 rounded-lg h-2 bg-[#5EBD3E]" />
            )}
          </View>
          <View
            // onPress={() => setActiveTab('payment')}
            className="flex-1 pb-3"
          >
            <Text
              className={`text-sm font-semibold text-center ${
                activeTab === 'payment' ? 'text-black' : 'text-gray-400'
              }`}
            >
              Payment
            </Text>
            {activeTab === 'payment' && (
              <View className="absolute -bottom-2 left-0 right-0 rounded-lg h-2 bg-[#5EBD3E]" />
            )}
          </View>
        </View>
      </View>

      {/* Form Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'details' && (
          <ChallengeDetailsTab
            challengeTitle={challengeTitle}
            setChallengeTitle={setChallengeTitle}
            description={description}
            setDescription={setDescription}
            participants={participants}
            setParticipants={setParticipants}
            followersRange={followersRange}
            setFollowersRange={setFollowersRange}
            challengeRounds={challengeRounds}
            setChallengeRounds={setChallengeRounds}
            category={category}
            setCategory={setCategory}
            location={location}
            setLocation={setLocation}
            budget={budget}
            setBudget={setBudget}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            contentLength={contentLength}
            setContentLength={setContentLength}
            businessName={businessName}
            setBusinessName={setBusinessName}
            website={website}
            setWebsite={setWebsite}
            logo={logo}
            setLogo={setLogo}
            onContinue={handleDetailsContinue}
          />
        )}

        {activeTab === 'preview' && (
          <ChallengePreviewTab
            businessName={businessName}
            website={website}
            logo={logo}
            budget={budget}
            description={description}
            category={category}
            contentLength={contentLength}
            participants={participants}
            startDate={startDate}
            challengeRounds={challengeRounds}
            location={location}
            followersRange={followersRange}
            endDate={endDate}
            challengeTitle={challengeTitle}
            onContinue={handlePreviewContinue}
          />
        )}

        {activeTab === 'payment' && (
          <ChallengePaymentTab
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
            expiryDate={expiryDate}
            setExpiryDate={setExpiryDate}
            cvv={cvv}
            setCvv={setCvv}
            startDate={startDate}
            challengeTitle={challengeTitle}
            budget={budget}
            onContinue={handlePaymentContinue}
          />
        )}
      </ScrollView>

      {/* Success Bottom Sheet */}
      <SuccessBottomSheet
        visible={showSuccessSheet}
        onClose={() => setShowSuccessSheet(false)}
        title="Congratulations!"
        message="Your challenge has been created successfully."
        buttonText="View Challenge"
        onButtonPress={handleViewChallenge}
      />
    </SafeAreaView>
  );
}
