import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import JobInvitationCard from '../../../src/components/common/JobInvitationCard';
import { EmptyJobSvg, EmptyNotificationSvg } from '../../../assets/images';

interface JobInvitation {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  status: 'new' | 'pending' | 'read';
}

// Mock data with varied statuses and timestamps
const mockJobInvitations: JobInvitation[] = [
  {
    id: '1',
    title: 'Instagram Influencer',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan.',
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 mins ago
    status: 'new',
  },
  {
    id: '2',
    title: 'Instagram Influencer',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus.',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    status: 'new',
  },
  {
    id: '3',
    title: 'Instagram Influencer',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, sollicitudin lacus.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    status: 'pending',
  },
  {
    id: '4',
    title: 'Instagram Influencer',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, mattis tellus.',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    status: 'pending',
  },
  {
    id: '5',
    title: 'Instagram Influencer',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan.',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    status: 'read',
  },
  {
    id: '6',
    title: 'Instagram Influencer',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus.',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    status: 'read',
  },
  {
    id: '7',
    title: 'Instagram Influencer',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    status: 'pending',
  },
  {
    id: '8',
    title: 'Instagram Influencer',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, mattis tellus. Sed dignissim, metus nec fringilla accumsan.',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    status: 'read',
  },
];

type TabType = 'all' | 'new' | 'pending';

// Time formatting utility
const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 60) return `${diffMins} mins ago`;
  if (diffMins < 1440) {
    const hours = Math.floor(diffMins / 60);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }
  const days = Math.floor(diffMins / 1440);
  return `${days} ${days === 1 ? 'day' : 'days'} ago`;
};

export default function JobInvitationScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('all');

  // Filter invitations based on active tab
  const filteredInvitations = useMemo(() => {
    if (activeTab === 'all') return mockJobInvitations;
    if (activeTab === 'new') return mockJobInvitations.filter((inv) => inv.status === 'new');
    if (activeTab === 'pending')
      return mockJobInvitations.filter((inv) => inv.status === 'pending');
    return mockJobInvitations;
  }, [activeTab]);

  const handleJobPress = (invitation: JobInvitation) => {
    // Map invitation status to job offer status
    let jobOfferStatus: 'new' | 'pending' | 'started' = 'new';

    if (invitation.status === 'new') {
      jobOfferStatus = 'new';
    } else if (invitation.status === 'pending') {
      jobOfferStatus = 'pending';
    } else if (invitation.status === 'read') {
      jobOfferStatus = 'started';
    }

    router.push({
      pathname: '/(features)/(influencer)/job-offer',
      params: {
        jobId: invitation.id,
        title: invitation.title,
        budget: '$100',
        status: jobOfferStatus,
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

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8FB]" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-5 py-4 pt-10 bg-[#F8F8FB]">
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-md font-semibold text-black ml-4">Job Invitations</Text>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Filter Tabs */}
        <View className="flex-row px-5 mb-4 mt-4">
          {renderTab('all', 'All')}
          {renderTab('new', 'New')}
          {renderTab('pending', 'Pending')}
        </View>

        {/* Job Invitations List */}
        {filteredInvitations.length > 0 ? (
          filteredInvitations.map((invitation) => (
            <JobInvitationCard
              key={invitation.id}
              title={invitation.title}
              description={invitation.description}
              timestamp={formatRelativeTime(invitation.timestamp)}
              isNew={invitation.status === 'new'}
              onPress={() => handleJobPress(invitation)}
            />
          ))
        ) : (
          <View className="items-center justify-center py-20">
            <EmptyJobSvg width={240} height={220} />
            {/* <Text className="text-sm text-[#999797] mt-4">No job invitations found</Text> */}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
