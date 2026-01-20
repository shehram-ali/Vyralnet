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
import { Frame1984077131Svg, InstagramSvg } from '../../../assets/images';
import NetworkFilterBottomSheet, {
  NetworkFilterState,
} from '../../../src/components/network/NetworkFilterBottomSheet';
import { PickerBottomSheet } from '../../../src/components/common';
import SendEmailBottomSheet from '../../../src/components/network/SendEmailBottomSheet';

interface NetworkInfluencer {
  id: string;
  name: string;
  username: string;
  avatar?: any;
  followers: string;
  engagementRate: string;
  hasEmail: boolean;
  status: 'prospects' | 'outreached';
  categories?: string[];
}

const mockNetworkInfluencers: NetworkInfluencer[] = [
  {
    id: '1',
    name: 'Eten Hunt',
    username: '@eten_hunt_1235',
    avatar: Frame1984077131Svg,
    followers: '10K-50K',
    engagementRate: '3.6%',
    hasEmail: true,
    status: 'prospects',
    categories: ['Lifestyle'],
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    username: '@sarah_johnson_99',
    avatar: Frame1984077131Svg,
    followers: '50K-100K',
    engagementRate: '4.2%',
    hasEmail: true,
    status: 'outreached',
    categories: ['Lifestyle', 'Fashion'],
  },
  {
    id: '3',
    name: 'Mike Davis',
    username: '@mike_davis_pro',
    avatar: Frame1984077131Svg,
    followers: '20K-50K',
    engagementRate: '3.8%',
    hasEmail: true,
    status: 'prospects',
    categories: ['Technology'],
  },
  {
    id: '4',
    name: 'Emma Wilson',
    username: '@emma_wilson_fit',
    avatar: Frame1984077131Svg,
    followers: '100K-500K',
    engagementRate: '5.1%',
    hasEmail: true,
    status: 'outreached',
    categories: ['Fitness', 'Lifestyle'],
  },
];

const myLists = [
  'Expert Influencer',
  'Fashion Bloggers',
  'Tech Reviewers',
  'Fitness Coaches',
  'Food Enthusiasts',
  'Travel Adventurers',
];

const statuses = [
  'All',
  'Prospects',
  'Outreached',
];

type TabType = 'all' | 'prospects' | 'outreached';

export default function MyNetworkScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [showMyListPicker, setShowMyListPicker] = useState(false);
  const [showStatusPicker, setShowStatusPicker] = useState(false);
  const [showSendEmailSheet, setShowSendEmailSheet] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState({ email: '', name: '' });
  const [selectedInfluencers, setSelectedInfluencers] = useState<string[]>([]);
  const [filters, setFilters] = useState<NetworkFilterState>({
    myList: 'Expert Influencer',
    status: '',
  });

  const filteredInfluencers = useMemo(() => {
    return mockNetworkInfluencers.filter((influencer) => {
      if (!influencer) return false;

      // Filter by search query (name)
      const matchesSearch =
        searchQuery === '' ||
        influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        influencer.username.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter by tab
      const matchesTab =
        activeTab === 'all' || influencer.status === activeTab;

      // Filter by status from filter sheet
      const matchesStatus =
        !filters.status ||
        filters.status === '' ||
        filters.status === 'All' ||
        influencer.status === filters.status.toLowerCase();

      return matchesSearch && matchesTab && matchesStatus;
    });
  }, [searchQuery, activeTab, filters]);

  const handleApplyFilters = (newFilters: NetworkFilterState) => {
    setFilters(newFilters);
  };

  const handleOpenMyListPicker = () => {
    setShowFilterSheet(false);
    setTimeout(() => {
      setShowMyListPicker(true);
    }, 300);
  };

  const handleCloseMyListPicker = () => {
    setShowMyListPicker(false);
    setTimeout(() => {
      setShowFilterSheet(true);
    }, 300);
  };

  const handleSelectMyList = (list: string) => {
    setFilters({ ...filters, myList: list });
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

  const toggleSelectInfluencer = (id: string) => {
    setSelectedInfluencers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const prospectsInfluencers = filteredInfluencers.filter(
      (inf) => inf.status === 'prospects'
    );

    if (!prospectsInfluencers || prospectsInfluencers.length === 0) return;

    if (selectedInfluencers.length === prospectsInfluencers.length) {
      setSelectedInfluencers([]);
    } else {
      setSelectedInfluencers(prospectsInfluencers.map((inf) => inf.id));
    }
  };

  const isAllSelected =
    activeTab === 'prospects' &&
    filteredInfluencers.filter((inf) => inf.status === 'prospects').length > 0 &&
    selectedInfluencers.length ===
      filteredInfluencers.filter((inf) => inf.status === 'prospects').length;

  const handleSendEmailBulk = () => {
    if (selectedInfluencers.length > 0) {
      // For bulk email, use the first selected influencer's details
      const firstInfluencer = mockNetworkInfluencers.find(
        (inf) => inf.id === selectedInfluencers[0]
      );
      if (firstInfluencer) {
        setEmailRecipient({
          email: 'Etenhunt@email.com', // Mock email
          name: firstInfluencer.name,
        });
        setShowSendEmailSheet(true);
      }
    }
  };

  const handleSendEmail = (influencerId: string) => {
    const influencer = mockNetworkInfluencers.find((inf) => inf.id === influencerId);
    if (influencer) {
      setEmailRecipient({
        email: 'Etenhunt@email.com', // Mock email
        name: influencer.name,
      });
      setShowSendEmailSheet(true);
    }
  };

  const handleViewEmail = (influencerId: string) => {
    const influencer = mockNetworkInfluencers.find((inf) => inf.id === influencerId);
    if (influencer) {
      router.push({
        pathname: '/(features)/(brand)/view-email',
        params: {
          senderName: influencer.name,
          senderEmail: 'Etenhunt@email.com', // Mock email
        },
      });
    }
  };

  const renderTab = (tab: TabType, label: string) => {
    const isActive = activeTab === tab;
    return (
      <TouchableOpacity
        onPress={() => {
          setActiveTab(tab);
          setSelectedInfluencers([]); // Clear selection when switching tabs
        }}
        activeOpacity={0.7}
        className="px-4 py-3 rounded-full mr-3"
        style={{
          backgroundColor: isActive ? '#5EBD3E' : '#00000014',
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

  const renderInfluencerCard = ({ item }: { item: NetworkInfluencer }) => {
    const statusConfig = {
      prospects: {
        label: 'Prospects',
        bgColor: '#C1C4F5',
        textColor: '#000000',
        buttonText: 'Send Email',
        onPress: () => handleSendEmail(item.id),
      },
      outreached: {
        label: 'Outreached',
        bgColor: '#F3DEBA',
        textColor: '#000',
        buttonText: 'View Email',
        onPress: () => handleViewEmail(item.id),
      },
    };

    const config = statusConfig[item.status];
    const isProspects = activeTab === 'prospects';
    const isSelected = selectedInfluencers.includes(item.id);

    const CardWrapper = isProspects ? TouchableOpacity : View;
    const cardProps = isProspects
      ? {
          onPress: () => toggleSelectInfluencer(item.id),
          activeOpacity: 0.7,
        }
      : {};

    return (
      <CardWrapper
        {...cardProps}
        className="rounded-2xl p-4 mb-3 mx-5 bg-white"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        {/* Header - Profile Info with Status Badge/Checkbox */}
        <View className="flex-row items-start justify-between mb-3">
          <View className="flex-row items-start flex-1">
            <View style={{ width: 40, height: 40 }}>
              <Frame1984077131Svg width={40} height={40} />
            </View>
            <View className="ml-3 flex-1">
              <View className="flex-row items-center">
                <Text className="text-sm font-bold text-black mr-2">{item.name}</Text>
                <InstagramSvg width={20} height={20}/>
              </View>
              <Text className="text-xs text-#76767CCC">{item.username}</Text>
            </View>
          </View>
          {isProspects ? (
            <View
              className="w-5 h-5 rounded border-2 items-center justify-center"
              style={{
                borderColor: isSelected ? '#5EBD3E' : '#D1D5DB',
                backgroundColor: isSelected ? '#5EBD3E' : 'transparent',
              }}
            >
              {isSelected && (
                <MaterialCommunityIcons name="check" size={14} color="#FFF" />
              )}
            </View>
          ) : (
            <View
              className="px-3 py-2 rounded-full"
              style={{ backgroundColor: config.bgColor }}
            >
              <Text
                className="text-xs font-semibold"
                style={{ color: config.textColor }}
              >
                {config.label}
              </Text>
            </View>
          )}
        </View>

        {/* Stats */}
        <View className="flex-row justify-between mb-3">
          <View className="flex-1">
            <Text className="text-xs text-[#6C727F] mb-1">Followers</Text>
            <Text className="text-sm font-semibold text-black">{item.followers}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-xs text-[#6C727F] mb-1">ER</Text>
            <Text className="text-sm font-semibold text-black">
              {item.engagementRate}
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-xs text-[#6C727F] mb-1">Email</Text>
            <Text className="text-sm font-semibold text-black">
              {item.hasEmail ? 'Yes' : 'No'}
            </Text>
          </View>
        </View>
<View className='w-full h-0.5 bg-[#E1E1E1] mb-3'></View>
        {/* Categories and Action Button */}
        <View className="flex-row items-center justify-between">
          {/* Categories */}
          {item.categories && item.categories.length > 0 && (
            <View className="flex-row flex-wrap flex-1 mr-3">
              {item.categories.map((category, index) => (
                <View
                  key={index}
                  className="px-3 py-2 rounded-full mr-2 mb-1"
                  style={{ backgroundColor: '#E0F6C6' }}
                >
                  <Text className="text-xs font-medium text-black" >
                    {category}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Action Button - Hide in prospects tab */}
          {!isProspects && (
            <TouchableOpacity
              onPress={config.onPress}
              activeOpacity={0.8}
              className="px-2 py-2 rounded-lg"
              style={{ backgroundColor: '#5EBD3E' }}
            >
              <Text className="text-xs font-semibold text-white">
                {config.buttonText}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </CardWrapper>
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
          <Text className="text-lg font-bold text-black ml-4">My Network</Text>
        </View>
        <TouchableOpacity onPress={() => setShowFilterSheet(true)} activeOpacity={0.7}>
          <Feather name="filter" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View className="flex-row px-5 py-3 bg-[#F8F8FB]">
        {renderTab('all', 'All')}
        {renderTab('prospects', 'Prospects')}
        {renderTab('outreached', 'Outreached')}
      </View>

      {/* Search Bar */}
      <View className="px-5 py-3 bg-[#F8F8F8]">
        <View className="flex-row items-center bg-white rounded-xl px-4 py-3 shadow-sm">
          <MaterialCommunityIcons name="magnify" size={24} color="#999" />
          <TextInput
            className="flex-1 ml-2 text-base text-black"
            placeholder="Search by Name"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Select All - Only visible in Prospects tab */}
      {activeTab === 'prospects' && (
        <View className="px-5 pb-3 bg-[#F8F8F8] flex-row items-center justify-end">
          <Text className="text-sm text-gray-600 mr-2">Select All</Text>
          <TouchableOpacity
            onPress={toggleSelectAll}
            activeOpacity={0.7}
            className="w-4 h-4 rounded border-2 items-center justify-center"
            style={{
              borderColor: isAllSelected ? '#5EBD3E' : '#D1D5DB',
              backgroundColor: isAllSelected ? '#5EBD3E' : 'transparent',
            }}
          >
            {isAllSelected && (
              <MaterialCommunityIcons name="check" size={10} color="#FFF" />
            )}
          </TouchableOpacity>
        </View>
      )}

      {/* Influencers List */}
      <FlatList
        data={filteredInfluencers || []}
        renderItem={renderInfluencerCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom:
            activeTab === 'prospects' && selectedInfluencers.length > 0 ? 180 : 100,
        }}
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <MaterialCommunityIcons name="account-search" size={60} color="#CCC" />
            <Text className="text-gray-400 text-base mt-4">No influencers found</Text>
          </View>
        }
      />

      {/* Bottom Selection Bar - Only in Prospects tab */}
      {activeTab === 'prospects' && selectedInfluencers.length > 0 && (
        <View
          className="absolute bottom-0 left-0 right-0 bg-white px-6 py-4"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 10,
          }}
        >
          <Text className="text-base font-semibold text-black mb-3">
            Selected:{' '}
            <Text style={{ color: '#5EBD3E' }}>
              {String(selectedInfluencers.length).padStart(2, '0')}
            </Text>
          </Text>
          <TouchableOpacity
            onPress={handleSendEmailBulk}
            activeOpacity={0.8}
            className="rounded-2xl py-4 items-center"
            style={{ backgroundColor: '#5EBD3E' }}
          >
            <Text className="text-base font-semibold text-white">Send Email</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Floating Action Button */}
      <TouchableOpacity
        onPress={() => {
          console.log('Add new connection');
          // Navigate to add connection screen or show bottom sheet
        }}
        activeOpacity={0.8}
        className="absolute right-6"
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: '#5EBD3E',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 6,
          elevation: 8,
          bottom:
            activeTab === 'prospects' && selectedInfluencers.length > 0 ? 120 : 24,
        }}
      >
        <MaterialCommunityIcons name="plus" size={32} color="#FFF" />
      </TouchableOpacity>

      {/* Filter Bottom Sheet */}
      <NetworkFilterBottomSheet
        visible={showFilterSheet}
        currentFilters={filters}
        onClose={() => setShowFilterSheet(false)}
        onApplyFilters={handleApplyFilters}
        onOpenMyListPicker={handleOpenMyListPicker}
        onOpenStatusPicker={handleOpenStatusPicker}
      />

      {/* My List Picker Bottom Sheet */}
      <PickerBottomSheet
        visible={showMyListPicker}
        onClose={handleCloseMyListPicker}
        title="My List"
        items={myLists}
        selectedItem={filters.myList}
        onSelect={handleSelectMyList}
      />

      {/* Status Picker Bottom Sheet */}
      <PickerBottomSheet
        visible={showStatusPicker}
        onClose={handleCloseStatusPicker}
        title="Select Status"
        items={statuses}
        selectedItem={filters.status}
        onSelect={handleSelectStatus}
      />

      {/* Send Email Bottom Sheet */}
      <SendEmailBottomSheet
        visible={showSendEmailSheet}
        onClose={() => {
          setShowSendEmailSheet(false);
          setSelectedInfluencers([]); // Clear selection after closing email sheet
        }}
        recipientEmail={emailRecipient.email}
        recipientName={emailRecipient.name}
      />
    </SafeAreaView>
  );
}
