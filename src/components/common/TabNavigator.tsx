import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export interface Tab {
  key: string;
  label: string;
  disabled?: boolean;
}

interface TabNavigatorProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabKey: string) => void;
  title?: string;
}

export default function TabNavigator({
  tabs,
  activeTab,
  onTabChange,
  title,
}: TabNavigatorProps) {
  return (
    <View className="bg-white px-5 py-3">
      {title && (
        <Text className="text-xl font-bold text-black mb-4">{title}</Text>
      )}
      <View className="flex-row border-b border-gray-200">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const isDisabled = tab.disabled || false;

          if (isDisabled) {
            return (
              <View key={tab.key} className="flex-1 pb-3">
                <Text
                  className={`text-sm font-semibold text-center ${
                    isActive ? 'text-black' : 'text-gray-400'
                  }`}
                >
                  {tab.label}
                </Text>
                {isActive && (
                  <View className="absolute bottom-0 left-0 right-0 rounded-lg h-2 bg-[#5EBD3E]" />
                )}
              </View>
            );
          }

          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => onTabChange(tab.key)}
              className="flex-1 pb-3"
              activeOpacity={0.7}
            >
              <Text
                className={`text-sm font-semibold text-center ${
                  isActive ? 'text-black' : 'text-gray-400'
                }`}
              >
                {tab.label}
              </Text>
              {isActive && (
                <View className="absolute bottom-0 left-0 right-0 rounded-lg h-2 bg-[#5EBD3E]" />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
