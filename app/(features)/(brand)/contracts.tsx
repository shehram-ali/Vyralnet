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
import InfluencerJobCard from '../../../src/components/common/InfluencerJobCard';
import ContractFilterBottomSheet, {
  ContractFilterState,
} from '../../../src/components/contracts/ContractFilterBottomSheet';
import ContractStatusPickerBottomSheet from '../../../src/components/contracts/ContractStatusPickerBottomSheet';

interface Contract {
  id: string;
  influencerId: string;
  influencerName: string;
  influencerUsername: string;
  contractId: string;
  startDate: string;
  amount: string;
  status: 'Accepted';
  type: 'hired' | 'contract';
}

const mockContracts: Contract[] = [
  {
    id: '1',
    influencerId: '1',
    influencerName: 'Eten Hunt',
    influencerUsername: '@eten_hunt_1235',
    contractId: 'R123456',
    startDate: '08 Nov, 2025',
    amount: '$100',
    status: 'Accepted',
    type: 'hired',
  },
  {
    id: '2',
    influencerId: '2',
    influencerName: 'Eten Hunt',
    influencerUsername: '@eten_hunt_1235',
    contractId: 'R123456',
    startDate: '08 Nov, 2025',
    amount: '$100',
    status: 'Accepted',
    type: 'hired',
  },
  {
    id: '3',
    influencerId: '3',
    influencerName: 'Eten Hunt',
    influencerUsername: '@eten_hunt_1235',
    contractId: 'R123456',
    startDate: '08 Nov, 2025',
    amount: '$100',
    status: 'Accepted',
    type: 'contract',
  },
  {
    id: '4',
    influencerId: '4',
    influencerName: 'Eten Hunt',
    influencerUsername: '@eten_hunt_1235',
    contractId: 'R123456',
    startDate: '08 Nov, 2025',
    amount: '$100',
    status: 'Accepted',
    type: 'contract',
  },
];

const contractStatuses = ['All', 'Accepted', 'Pending', 'Rejected', 'Completed'];

type TabType = 'hired' | 'contract';

export default function ContractsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('hired');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [showStatusPicker, setShowStatusPicker] = useState(false);
  const [filters, setFilters] = useState<ContractFilterState>({
    status: 'All',
    fromDate: null,
    toDate: null,
  });

  const filteredContracts = useMemo(() => {
    return mockContracts.filter((contract) => {
      if (!contract) return false;

      // Filter by search query (name)
      const matchesSearch =
        searchQuery === '' ||
        contract.influencerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contract.influencerUsername.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter by tab
      const matchesTab = contract.type === activeTab;

      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab]);

  const handleViewOffer = (_contractId: string) => {
    router.push('/(features)/(brand)/view-job-offer');
  };

  const handlePayNow = (contractId: string) => {
    console.log('Pay now for contract:', contractId);
    // Navigate to payment screen
  };

  const handleViewContent = (_contractId: string) => {
    router.push('/(features)/(brand)/content-details');
  };

  const handleReleasePayment = (contractId: string) => {
    console.log('Release payment for contract:', contractId);
    // Navigate to payment release screen
  };

  const handleApplyFilters = (newFilters: ContractFilterState) => {
    setFilters(newFilters);
  };

  const handleOpenStatusPicker = () => {
    setShowFilterSheet(false);
    setTimeout(() => {
      setShowStatusPicker(true);
    }, 300);
  };

  const handleCloseStatusPicker = () => {
    setShowStatusPicker(false);
    setTimeout(() => {
      setShowFilterSheet(true);
    }, 300);
  };

  const handleSelectStatus = (status: string) => {
    setFilters({ ...filters, status });
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

  const renderContractCard = ({ item }: { item: Contract }) => {
    const isHired = activeTab === 'hired';

    return (
      <InfluencerJobCard
        influencerName={item.influencerName}
        influencerUsername={item.influencerUsername}
        statusText={item.status}
        statusBgColor="#BEF3D4"
        details={[
          { label: 'ID', value: item.contractId },
          { label: 'Started', value: item.startDate },
          { label: 'Amount', value: item.amount },
        ]}
        buttons={[
          {
            label: isHired ? 'View Offer' : 'View Content',
            onPress: () => isHired ? handleViewOffer(item.id) : handleViewContent(item.id),
          },
          {
            label: isHired ? 'Pay Now' : 'Release Payment',
            onPress: () => isHired ? handlePayNow(item.id) : handleReleasePayment(item.id),
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
          <Text className="text-lg font-bold text-black ml-4">Your Contracts</Text>
        </View>
        <TouchableOpacity onPress={() => setShowFilterSheet(true)} activeOpacity={0.7}>
          <Feather name="filter" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View className="flex-row px-5 py-3 bg-[#F8F8FB]">
        {renderTab('hired', 'Hired Influencers')}
        {renderTab('contract', 'Contracts')}
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

      {/* Contracts List */}
      <FlatList
        data={filteredContracts || []}
        renderItem={renderContractCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <MaterialCommunityIcons name="file-document-outline" size={60} color="#CCC" />
            <Text className="text-gray-400 text-base mt-4">No contracts found</Text>
          </View>
        }
      />

      {/* Filter Bottom Sheet */}
      <ContractFilterBottomSheet
        visible={showFilterSheet}
        currentFilters={filters}
        onClose={() => setShowFilterSheet(false)}
        onApplyFilters={handleApplyFilters}
        onOpenStatusPicker={handleOpenStatusPicker}
      />

      {/* Status Picker Bottom Sheet */}
      <ContractStatusPickerBottomSheet
        visible={showStatusPicker}
        selectedStatus={filters.status}
        statuses={contractStatuses}
        onClose={handleCloseStatusPicker}
        onSelectStatus={handleSelectStatus}
      />
    </SafeAreaView>
  );
}
