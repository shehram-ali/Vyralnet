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
import InfluencerJobCard from '../../src/components/common/InfluencerJobCard';
import ReportFilterBottomSheet, {
  ReportFilterState,
} from '../../src/components/reports/ReportFilterBottomSheet';
import ChallengeTypePickerBottomSheet from '../../src/components/reports/ChallengeTypePickerBottomSheet';

interface Report {
  id: string;
  influencerId: string;
  influencerName: string;
  influencerUsername: string;
  reportId: string;
  followers: string;
  category: string;
  status: 'Content Submitted';
  type: 'challenge' | 'job';
}

const mockReports: Report[] = [
  {
    id: '1',
    influencerId: '1',
    influencerName: 'Eten Hunt',
    influencerUsername: '@eten_hunt_1235',
    reportId: 'R123456',
    followers: '10K-50K',
    category: 'Lifestyle',
    status: 'Content Submitted',
    type: 'challenge',
  },
  {
    id: '2',
    influencerId: '2',
    influencerName: 'Eten Hunt',
    influencerUsername: '@eten_hunt_1235',
    reportId: 'R123456',
    followers: '10K-50K',
    category: 'Lifestyle',
    status: 'Content Submitted',
    type: 'challenge',
  },
  {
    id: '3',
    influencerId: '3',
    influencerName: 'Eten Hunt',
    influencerUsername: '@eten_hunt_1235',
    reportId: 'R123456',
    followers: '10K-50K',
    category: 'Lifestyle',
    status: 'Content Submitted',
    type: 'job',
  },
  {
    id: '4',
    influencerId: '4',
    influencerName: 'Eten Hunt',
    influencerUsername: '@eten_hunt_1235',
    reportId: 'R123456',
    followers: '10K-50K',
    category: 'Lifestyle',
    status: 'Content Submitted',
    type: 'job',
  },
];

const challengeTypes = ['All', 'Expert Influencer', 'Beauty Expert', 'Tech Specialist', 'Food Blogger', 'Travel Vlogger'];

type TabType = 'challenge' | 'job';

export default function ReportsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('challenge');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [showChallengeTypePicker, setShowChallengeTypePicker] = useState(false);
  const [filters, setFilters] = useState<ReportFilterState>({
    challengeType: 'Expert Influencer',
    date: null,
  });

  const filteredReports = useMemo(() => {
    return mockReports.filter((report) => {
      if (!report) return false;

      // Filter by search query (name)
      const matchesSearch =
        searchQuery === '' ||
        report.influencerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.influencerUsername.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter by tab
      const matchesTab = report.type === activeTab;

      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab]);

  const handleViewContent = (_reportId: string) => {
    router.push('/(features)/(brand)/content-details');
  };

  const handleViewDetails = (reportId: string) => {
    console.log('View details for report:', reportId);
    // Navigate to details screen
  };

  const handleFilter = () => {
    setShowFilterSheet(true);
  };

  const handleApplyFilters = (newFilters: ReportFilterState) => {
    setFilters(newFilters);
  };

  const handleOpenChallengeTypePicker = () => {
    setShowFilterSheet(false);
    setTimeout(() => {
      setShowChallengeTypePicker(true);
    }, 300);
  };

  const handleCloseChallengeTypePicker = () => {
    setShowChallengeTypePicker(false);
    setTimeout(() => {
      setShowFilterSheet(true);
    }, 300);
  };

  const handleSelectChallengeType = (type: string) => {
    setFilters({ ...filters, challengeType: type });
  };

  const renderTab = (tab: TabType, label: string) => {
    const isActive = activeTab === tab;
    return (
      <TouchableOpacity
        onPress={() => setActiveTab(tab)}
        activeOpacity={0.7}
        className="px-6 py-3 rounded-full mr-3"
        style={{
          backgroundColor: isActive ? '#5EBD3E' : '#EDEDED',
        }}
      >
        <Text
          className="text-sm font-medium"
          style={{
            color: isActive ? '#FFFFFF' : '#999797',
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderReportCard = ({ item }: { item: Report }) => {
    return (
      <InfluencerJobCard
        influencerName={item.influencerName}
        influencerUsername={item.influencerUsername}
        statusText={item.status}
        statusBgColor="#BEF3D4"
        details={[
          { label: 'ID', value: item.reportId },
          { label: 'Followers', value: item.followers },
          {
            label: 'Category',
            value: item.category,
            isBadge: true,
            badgeColor: '#D4EDD4',
          },
        ]}
        buttons={[
          {
            label: 'View Content',
            onPress: () => handleViewContent(item.id),
          },
          {
            label: 'View Details',
            onPress: () => handleViewDetails(item.id),
          },
        ]}
      />
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
          <Text className="text-lg font-bold text-black ml-4">Reports</Text>
        </View>
        <TouchableOpacity onPress={handleFilter} activeOpacity={0.7}>
          <Feather name="filter" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View className="flex-row px-5 py-3 bg-[#F8F8FB]">
        {renderTab('challenge', 'My Challenges')}
        {renderTab('job', 'Jobs')}
      </View>

      {/* Search Bar */}
      <View className="px-5 py-3 bg-[#F8F8F8]">
        <View className="flex-row items-center bg-white rounded-2xl px-3 py-3 shadow-sm">
          <MaterialCommunityIcons name="magnify" size={24} color="#999" />
          <TextInput
            className="flex-1 ml-2 text-base text-black"
            placeholder="Search"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Reports List */}
      <FlatList
        data={filteredReports || []}
        renderItem={renderReportCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 8,
          paddingBottom: 100,
        }}
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <MaterialCommunityIcons name="file-document-outline" size={60} color="#CCC" />
            <Text className="text-gray-400 text-base mt-4">No reports found</Text>
          </View>
        }
      />

      {/* Filter Bottom Sheet */}
      <ReportFilterBottomSheet
        visible={showFilterSheet}
        currentFilters={filters}
        onClose={() => setShowFilterSheet(false)}
        onApplyFilters={handleApplyFilters}
        onOpenChallengeTypePicker={handleOpenChallengeTypePicker}
      />

      {/* Challenge Type Picker Bottom Sheet */}
      <ChallengeTypePickerBottomSheet
        visible={showChallengeTypePicker}
        selectedType={filters.challengeType}
        types={challengeTypes}
        onClose={handleCloseChallengeTypePicker}
        onSelectType={handleSelectChallengeType}
      />
    </SafeAreaView>
  );
}
