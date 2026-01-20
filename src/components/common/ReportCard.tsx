import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Frame1984077131Svg } from '../../../assets/images';

type ReportStatus = 'in-progress' | 'completed' | 'pending';
type ContentStatus = 'pending' | 'submitted';

interface ReportCardProps {
  companyName: string;
  companyLogo?: any;
  status: ReportStatus;
  title: string;
  budget: string;
  type: 'challenge' | 'job';
  category?: string;
  contentStatus?: ContentStatus;
  onViewContent: () => void;
  onViewDetails: () => void;
}

const statusStyles = {
  'in-progress': {
    backgroundColor: '#FEFCB6',
    textColor: '#977A05',
    label: 'In-progress',
  },
  completed: {
    backgroundColor: '#BEF3D4',
    textColor: '#000000',
    label: 'Completed',
  },
  pending: {
    backgroundColor: '#FFF5E6',
    textColor: '#FF9800',
    label: 'Pending',
  },
};

const contentStatusStyles = {
  pending: {
    backgroundColor: '#FEE6B6',
    textColor: '#895B05',
    label: 'Pending',
  },
  submitted: {
    backgroundColor: '#5EBD3E',
    textColor: '#FFFFFF',
    label: 'Submitted',
  },
};

export default function ReportCard({
  companyName,
  companyLogo,
  status,
  title,
  budget,
  type,
  category,
  contentStatus,
  onViewContent,
  onViewDetails,
}: ReportCardProps) {
  const statusStyle = statusStyles[status];
  const contentStyle = contentStatus ? contentStatusStyles[contentStatus] : null;

  return (
    <View
      className="rounded-2xl p-4 mb-3 mx-5 bg-white"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      {/* Header - Company Info with Status Badge */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center flex-1">
          <View style={{ width: 40, height: 40 }}>
            {companyLogo ? (
              <Image source={companyLogo} style={{ width: 40, height: 40, borderRadius: 20 }} />
            ) : (
              <Frame1984077131Svg width={40} height={40} />
            )}
          </View>
          <Text className="text-base font-semibold text-black ml-3">{companyName}</Text>
        </View>
        <View
          className="px-3 py-2 rounded-full"
          style={{ backgroundColor: statusStyle.backgroundColor }}
        >
          <Text className="text-xs font-medium" style={{ color: statusStyle.textColor }}>
            {statusStyle.label}
          </Text>
        </View>
      </View>

      {/* Report Details */}
      <View className="mb-4">
        {/* Title */}
        <View
          className="flex-row items-center justify-between py-3"
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#E5E5E5',
          }}
        >
          <Text className="text-sm text-[#6C727F]">Title</Text>
          <Text
            className="text-sm font-medium text-black flex-1 text-right ml-4"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
        </View>

        {/* Budget */}
        <View
          className="flex-row items-center justify-between py-3"
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#E5E5E5',
          }}
        >
          <Text className="text-sm text-[#6C727F]">Budget</Text>
          <Text className="text-sm font-semibold text-black">{budget}</Text>
        </View>

        {/* Category (for challenges) or Content Status (for jobs) */}
        {type === 'challenge' ? (
          <View className="flex-row items-center justify-between py-3">
            <Text className="text-sm text-[#6C727F]">Category</Text>
            <View className="px-3 py-1 rounded-full" style={{ backgroundColor: '#E0F6C6' }}>
              <Text className="text-xs font-medium text-black">
                {category}
              </Text>
            </View>
          </View>
        ) : (
          <View className="flex-row items-center justify-between py-3">
            <Text className="text-sm text-[#6C727F]">Content</Text>
            {contentStyle && (
              <View
                className="px-3 py-2 rounded-full"
                style={{ backgroundColor: contentStyle.backgroundColor }}
              >
                <Text
                  className="text-xs font-regular"
                  style={{ color: contentStyle.textColor }}
                >
                  {contentStyle.label}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>

      {/* Action Buttons */}
      <View className="flex-row gap-3">
        <TouchableOpacity
          onPress={onViewContent}
          activeOpacity={0.8}
          className="flex-1 rounded-xl py-3 items-center border"
          style={{ borderColor: '#5EBD3E', backgroundColor: 'transparent' }}
        >
          <Text className="text-sm font-semibold" style={{ color: '#5EBD3E' }}>
            View Content
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onViewDetails}
          activeOpacity={0.8}
          className="flex-1 rounded-xl py-3 items-center border"
          style={{ borderColor: '#5EBD3E', backgroundColor: 'transparent' }}
        >
          <Text className="text-sm font-semibold" style={{ color: '#5EBD3E' }}>
            View Details
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
