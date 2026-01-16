import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Frame1984077131Svg, UserBox } from '../../../assets/images';

interface TransactionCardProps {
  influencerName: string;
  influencerUsername: string;
  statusText: string;
  statusBgColor: string;
  transactionId: string;
  amount: string;
  category: string;
  categoryBadgeColor: string;
  onViewInvoice: () => void;
}

export default function TransactionCard({
  influencerName,
  influencerUsername,
  statusText,
  statusBgColor,
  transactionId,
  amount,
  category,
  categoryBadgeColor,
  onViewInvoice,
}: TransactionCardProps) {
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
      {/* Header - Profile Info with Status Badge */}
      <View className="flex-row items-start justify-between mb-4">
        <View className="flex-row items-start flex-1">
          <View style={{ width: 40, height: 40 }}>
            <Frame1984077131Svg width={40} height={40} />
          </View>
          <View className="ml-3 flex-1">
            <View className="flex-row items-center">
              <Text className="text-base font-bold text-black mr-2">
                {influencerName}
              </Text>
              <UserBox width={20} height={20} />
            </View>
            <Text className="text-xs text-[#76767CCC]">{influencerUsername}</Text>
          </View>
        </View>
        <View
          className="px-3 py-2 rounded-full"
          style={{ backgroundColor: statusBgColor }}
        >
          <Text className="text-xs font-semibold text-black">{statusText}</Text>
        </View>
      </View>

      {/* Transaction Details */}
      <View className="mb-4">
        {/* ID */}
        <View
          className="flex-row items-center justify-between py-3"
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#E5E5E5',
          }}
        >
          <Text className="text-sm text-[#6C727F]">ID</Text>
          <Text className="text-sm font-semibold text-black">{transactionId}</Text>
        </View>

        {/* Amount */}
        <View
          className="flex-row items-center justify-between py-3"
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#E5E5E5',
          }}
        >
          <Text className="text-sm text-[#6C727F]">Amount</Text>
          <Text className="text-sm font-semibold text-black">{amount}</Text>
        </View>

        {/* Category */}
        <View className="flex-row items-center justify-between py-3">
          <Text className="text-sm text-[#6C727F]">Category</Text>
          <View
            className="px-3 py-1 rounded-full"
            style={{ backgroundColor: categoryBadgeColor }}
          >
            <Text className="text-xs font-semibold text-black">{category}</Text>
          </View>
        </View>
      </View>

      {/* View Invoice Button */}
      <TouchableOpacity
        onPress={onViewInvoice}
        activeOpacity={0.8}
        className="rounded-2xl py-3 items-center border-2"
        style={{ borderColor: '#5EBD3E', backgroundColor: 'transparent' }}
      >
        <Text className="text-sm font-semibold" style={{ color: '#5EBD3E' }}>
          View Invoice
        </Text>
      </TouchableOpacity>
    </View>
  );
}
