import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TransactionCard from '../../src/components/common/TransactionCard';
import { SearchBar } from '../../src/components/common';
import { EmptyTransactionSvg } from 'assets/images';

interface Transaction {
  id: string;
  influencerId: string;
  influencerName: string;
  influencerUsername: string;
  transactionId: string;
  amount: string;
  category: string;
  status: 'Paid' | 'Due';
  type: 'challenge' | 'job';
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    influencerId: '1',
    influencerName: 'Eten Hunt',
    influencerUsername: '@eten_hunt_1235',
    transactionId: 'R123456',
    amount: '$100',
    category: 'Lifestyle',
    status: 'Paid',
    type: 'challenge',
  },
  {
    id: '2',
    influencerId: '2',
    influencerName: 'Eten Hunt',
    influencerUsername: '@eten_hunt_1235',
    transactionId: 'R123456',
    amount: '$100',
    category: 'Lifestyle',
    status: 'Paid',
    type: 'challenge',
  },
  {
    id: '3',
    influencerId: '3',
    influencerName: 'Eten Hunt',
    influencerUsername: '@eten_hunt_1235',
    transactionId: 'R123456',
    amount: '$150',
    category: 'Lifestyle',
    status: 'Due',
    type: 'job',
  },
  {
    id: '4',
    influencerId: '4',
    influencerName: 'Eten Hunt',
    influencerUsername: '@eten_hunt_1235',
    transactionId: 'R123456',
    amount: '$200',
    category: 'Lifestyle',
    status: 'Paid',
    type: 'job',
  },
];

type TabType = 'challenge' | 'job';

export default function TransactionsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('challenge');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter((transaction) => {
      if (!transaction) return false;

      // Filter by search query (name)
      const matchesSearch =
        searchQuery === '' ||
        transaction.influencerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.influencerUsername.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter by tab
      const matchesTab = transaction.type === activeTab;

      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab]);

  // Calculate summary stats
  const summaryStats = useMemo(() => {
    const allTransactions = mockTransactions.filter((t) => t.type === activeTab);
    const totalSpend = allTransactions.reduce((sum, t) => {
      const amount = parseInt(t.amount.replace('$', ''));
      return sum + amount;
    }, 0);

    const hiredInfluencer = allTransactions.length;

    const paidAmount = allTransactions
      .filter((t) => t.status === 'Paid')
      .reduce((sum, t) => {
        const amount = parseInt(t.amount.replace('$', ''));
        return sum + amount;
      }, 0);

    const dueAmount = allTransactions
      .filter((t) => t.status === 'Due')
      .reduce((sum, t) => {
        const amount = parseInt(t.amount.replace('$', ''));
        return sum + amount;
      }, 0);

    return {
      totalSpend,
      hiredInfluencer,
      paidAmount,
      dueAmount,
    };
  }, [activeTab]);

  const handleViewInvoice = (_transactionId: string) => {
    router.push({
      pathname: '/(features)/(brand)/job-details',
      params: {
        jobTitle: 'Instagram Influencer',
        budget: '100',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget velit, sit amet feugiat lectus.',
      },
    });
  };

  const renderTab = (tab: TabType, label: string) => {
    const isActive = activeTab === tab;
    return (
      <TouchableOpacity
        onPress={() => setActiveTab(tab)}
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

  const renderTransactionCard = ({ item }: { item: Transaction }) => {
    return (
      <TransactionCard
        influencerName={item.influencerName}
        influencerUsername={item.influencerUsername}
        statusText={item.status}
        statusBgColor={item.status === 'Paid' ? '#BEF3D4' : '#FFE5E5'}
        transactionId={item.transactionId}
        amount={item.amount}
        category={item.category}
        categoryBadgeColor="#E0F6C6"
        onViewInvoice={() => handleViewInvoice(item.id)}
      />
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8FB]" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-5 py-4 bg-[#F8F8FB]" style={{ paddingTop: Platform.OS === 'ios' ? 0 : 40 }}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-md font-semibold text-black ml-4">Transactions</Text>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Summary Card */}
        <View className="mx-5 mt-4 mb-4 rounded-xl p-6" style={{ backgroundColor: '#E8F5E3' }}>
          {/* Total Spend */}
          <View className="items-center mb-6">
            <Text className="text-md font-regular text-[##1D1C1C] mb-2">Total Spend</Text>
            <Text className="text-[40px] font-semibold" style={{ color: '#5EBD3E' }}>
              ${summaryStats.totalSpend}
            </Text>
          </View>

          {/* Stats Row */}
          <View className="flex-row justify-between items-center">
            {/* Hired Influencer */}
            <View className="items-center flex-1">
              <Text className="text-xs font-medium text-[#1D1C1C] mb-1">Hired Influencer</Text>
              <Text className="text-lg font-semibold" style={{ color: '#5EBD3E' }}>
                {summaryStats.hiredInfluencer}
              </Text>
            </View>

            {/* Paid Amount */}
            <View className="items-center flex-1">
              <Text className="text-xs font-medium text-[#1D1C1C] mb-1">Paid Amount</Text>
              <Text className="text-lg font-semibold" style={{ color: '#5EBD3E' }}>
                ${summaryStats.paidAmount}
              </Text>
            </View>

            {/* Due Amount */}
            <View className="items-center flex-1">
              <Text className="text-xs font-medium text-[#1D1C1C] mb-1">Due Amount</Text>
              <Text className="text-lg font-semibold" style={{ color: '#5EBD3E' }}>
                ${summaryStats.dueAmount}
              </Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View className="flex-row px-5 mb-3">
          {renderTab('challenge', 'My Challenges')}
          {renderTab('job', 'Jobs')}
        </View>

        {/* Search Bar */}
        <View className="px-5 mb-3">
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            containerStyle={{ marginBottom: 0 }}
          />
        </View>

        {/* Transactions List */}
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((item) => (
            <View key={item.id}>{renderTransactionCard({ item })}</View>
          ))
        ) : (
         <View className="items-center justify-center py-20">
              <EmptyTransactionSvg width={240} height={220} />
              
            </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
