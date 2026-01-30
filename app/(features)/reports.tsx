import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../src/hooks/useAuth';
import InfluencerJobCard from '../../src/components/common/InfluencerJobCard';
import ReportCard from '../../src/components/common/ReportCard';
import { SearchBar, Header } from '../../src/components/common';
import ReportFilterBottomSheet, {
  ReportFilterState,
} from '../../src/components/reports/ReportFilterBottomSheet';
import { PickerBottomSheet } from '../../src/components/common';
import InfluencerReportFilterBottomSheet, {
  InfluencerReportFilterState,
} from '../../src/components/reports/InfluencerReportFilterBottomSheet';

// Type definitions for unified reports
interface BaseReport {
  id: string;
  type: 'challenge' | 'job';
  category: string;
}

interface BrandReport extends BaseReport {
  userType: 'brand';
  influencerId: string;
  influencerName: string;
  influencerUsername: string;
  reportId: string;
  followers: string;
  status: 'Content Submitted';
}

interface InfluencerReport extends BaseReport {
  userType: 'influencer';
  companyName: string;
  companyLogo?: any;
  status: 'in-progress' | 'completed' | 'pending';
  title: string;
  budget: string;
  contentStatus?: 'pending' | 'submitted';
}

type Report = BrandReport | InfluencerReport;

// Mock data for brand users
const mockBrandReports: BrandReport[] = [
  {
    id: '1',
    userType: 'brand',
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
    userType: 'brand',
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
    userType: 'brand',
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
    userType: 'brand',
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

// Mock data for influencer users
const mockInfluencerReports: InfluencerReport[] = [
  {
    id: '1',
    userType: 'influencer',
    companyName: 'Apple Inc.',
    status: 'in-progress',
    title: 'Expert Influencer Required...',
    budget: '$500',
    category: 'Lifestyle',
    type: 'challenge',
    contentStatus: 'pending',
  },
  {
    id: '2',
    userType: 'influencer',
    companyName: 'Apple Inc.',
    status: 'completed',
    title: 'Expert Influencer Required...',
    budget: '$300',
    category: 'Lifestyle',
    type: 'challenge',
    contentStatus: 'submitted',
  },
  {
    id: '3',
    userType: 'influencer',
    companyName: 'Apple Inc.',
    status: 'in-progress',
    title: 'Cosmetic Videography',
    budget: '$100',
    category: 'Beauty',
    type: 'job',
    contentStatus: 'pending',
  },
  {
    id: '4',
    userType: 'influencer',
    companyName: 'Apple Inc.',
    status: 'completed',
    title: 'Cosmetic Videography',
    budget: '$100',
    category: 'Beauty',
    type: 'job',
    contentStatus: 'submitted',
  },
  {
    id: '5',
    userType: 'influencer',
    companyName: 'Samsung',
    status: 'pending',
    title: 'Product Launch Campaign',
    budget: '$450',
    category: 'Technology',
    type: 'challenge',
    contentStatus: 'pending',
  },
];

const challengeTypes = ['All', 'Expert Influencer', 'Beauty Expert', 'Tech Specialist', 'Food Blogger', 'Travel Vlogger'];

type TabType = 'challenge' | 'job';

export default function ReportsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const isBrand = user?.userType === 'brand';

  // Select appropriate data based on user type
  const reportsData: Report[] = isBrand ? mockBrandReports : mockInfluencerReports;

  const [activeTab, setActiveTab] = useState<TabType>('challenge');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [showChallengeTypePicker, setShowChallengeTypePicker] = useState(false);

  // Brand filter state
  const [filters, setFilters] = useState<ReportFilterState>({
    challengeType: 'Expert Influencer',
    date: null,
  });

  // Influencer filter state
  const [influencerFilters, setInfluencerFilters] = useState<InfluencerReportFilterState>({
    date: null,
  });

  const filteredReports = useMemo(() => {
    return reportsData.filter((report) => {
      if (!report) return false;

      // Filter by tab
      const matchesTab = report.type === activeTab;

      // User-type-aware search logic
      const matchesSearch = searchQuery === '' || (() => {
        if (isBrand) {
          const brandReport = report as BrandReport;
          return (
            brandReport.influencerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            brandReport.influencerUsername.toLowerCase().includes(searchQuery.toLowerCase())
          );
        } else {
          const influencerReport = report as InfluencerReport;
          return (
            influencerReport.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            influencerReport.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            influencerReport.category.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
      })();

      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab, reportsData, isBrand]);

  const handleViewContent = (reportId: string) => {
    router.push({
      pathname: '/(features)/(brand)/content-details',
      params: { id: reportId },
    } as any);
  };

  const handleViewDetails = (reportId: string) => {
    if (isBrand) {
      router.push({
        pathname: '/(features)/(brand)/job-details',
        params: { reportId },
      } as any);
    } else {
      // Find the report to determine if it's a challenge or job
      const report = reportsData.find(r => r.id === reportId) as InfluencerReport;
      if (report?.type === 'challenge') {
        router.push({
          pathname: '/(features)/(influencer)/challenge-details',
          params: { id: reportId },
        } as any);
      } else {
        router.push({
          pathname: '/(features)/(influencer)/job-details',
          params: { id: reportId },
        } as any);
      }
    }
  };

  const handleFilter = () => {
    setShowFilterSheet(true);
  };

  const handleApplyFilters = (newFilters: ReportFilterState) => {
    setFilters(newFilters);
  };

  const handleApplyInfluencerFilters = (newFilters: InfluencerReportFilterState) => {
    setInfluencerFilters(newFilters);
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
    if (isBrand) {
      const brandReport = item as BrandReport;
      return (
        <InfluencerJobCard
          influencerName={brandReport.influencerName}
          influencerUsername={brandReport.influencerUsername}
          statusText={brandReport.status}
          statusBgColor="#BEF3D4"
          details={[
            { label: 'ID', value: brandReport.reportId },
            { label: 'Followers', value: brandReport.followers },
            {
              label: 'Category',
              value: brandReport.category,
              isBadge: true,
              badgeColor: '#D4EDD4',
            },
          ]}
          buttons={[
            {
              label: 'View Content',
              onPress: () => handleViewContent(brandReport.id),
            },
            {
              label: 'View Details',
              onPress: () => handleViewDetails(brandReport.id),
            },
          ]}
        />
      );
    } else {
      const influencerReport = item as InfluencerReport;
      return (
        <ReportCard
          companyName={influencerReport.companyName}
          status={influencerReport.status}
          title={influencerReport.title}
          budget={influencerReport.budget}
          type={influencerReport.type}
          category={influencerReport.category}
          contentStatus={influencerReport.contentStatus}
          onViewContent={() => handleViewContent(influencerReport.id)}
          onViewDetails={() => handleViewDetails(influencerReport.id)}
        />
      );
    }
  };

  // Dynamic labels based on user type
  const tabLabels = isBrand
    ? { challenge: 'My Challenges', job: 'Jobs' }
    : { challenge: 'Challenges', job: 'Jobs' };

  const searchPlaceholder = isBrand
    ? 'Search by influencer name'
    : 'Search ';

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8FB]" edges={['top']}>
      <Header
        title="Reports"
        titleClassName="text-lg font-bold text-black"
        backIconSize={28}
        rightIcons={[
          { type: 'filter', onPress: handleFilter, size: 18 }
        ]}
      />

      {/* Tabs */}
      <View className="flex-row px-5 py-3 bg-[#F8F8FB]">
        {renderTab('challenge', tabLabels.challenge)}
        {renderTab('job', tabLabels.job)}
      </View>

      {/* Search Bar */}
      <View className="px-5 py-3 bg-[#F8F8F8]">
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={searchPlaceholder}
          containerStyle={{ marginBottom: 0 }}
        />
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

      {/* Filter Bottom Sheets */}
      {isBrand ? (
        <>
          {/* Brand Filter Bottom Sheet */}
          <ReportFilterBottomSheet
            visible={showFilterSheet}
            currentFilters={filters}
            onClose={() => setShowFilterSheet(false)}
            onApplyFilters={handleApplyFilters}
            onOpenChallengeTypePicker={handleOpenChallengeTypePicker}
          />

          {/* Challenge Type Picker Bottom Sheet */}
          <PickerBottomSheet
            visible={showChallengeTypePicker}
            onClose={handleCloseChallengeTypePicker}
            title="Select Challenge Type"
            items={challengeTypes}
            selectedItem={filters.challengeType}
            onSelect={handleSelectChallengeType}
          />
        </>
      ) : (
        /* Influencer Filter Bottom Sheet */
        <InfluencerReportFilterBottomSheet
          visible={showFilterSheet}
          currentFilters={influencerFilters}
          onClose={() => setShowFilterSheet(false)}
          onApplyFilters={handleApplyInfluencerFilters}
        />
      )}
    </SafeAreaView>
  );
}
