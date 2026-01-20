import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type AlertType = 'success' | 'warning' | 'error';

interface AlertNotificationProps {
  type: AlertType;
  message: string;
  onClose: () => void;
  visible?: boolean;
}

const alertStyles = {
  success: {
    backgroundColor: '#F0FFEB',
    borderColor: '#5EBD3E',
    textColor: '#5EBD3E',
    iconColor: '#5EBD3E',
    iconName: 'information-outline' as const,
  },
  warning: {
    backgroundColor: '#FEF1CD',
    borderColor: '#F5B22D',
    textColor: '#956300',
    iconColor: '#956300',
    iconName: 'information-outline' as const,
  },
  error: {
    backgroundColor: '#FEE1E1',
    borderColor: '#FFB4B6',
    textColor: '#FF383C',
    iconColor: '#FF383C',
    iconName: 'information-outline' as const,
  },
};

export default function AlertNotification({
  type,
  message,
  onClose,
  visible = true,
}: AlertNotificationProps) {
  if (!visible) return null;

  const style = alertStyles[type];

  return (
    <View
      className="mx-5 mt-4 p-4 rounded-lg flex-row items-center gap-3"
      style={{
        backgroundColor: style.backgroundColor,
        borderWidth: 1,
        borderColor: style.borderColor,
      }}
    >
      {/* Icon */}
      <MaterialCommunityIcons name={style.iconName} size={20} color={style.iconColor} />

      {/* Message */}
      <Text
        className="flex-1 text-sm leading-5"
        style={{ color: style.textColor }}
      >
        {message}
      </Text>

      {/* Close Button */}
      <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
        <MaterialCommunityIcons name="close" size={20} color={style.textColor} />
      </TouchableOpacity>
    </View>
  );
}
