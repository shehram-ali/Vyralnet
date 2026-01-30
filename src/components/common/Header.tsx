import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

type RightIconType = 'filter' | 'search' | 'settings' | 'more' | 'add' | 'bell' | 'share' | 'edit';

interface RightIcon {
  type: RightIconType;
  onPress: () => void;
  size?: number;
  color?: string;
}

interface HeaderProps {
  title: string;
  onBack?: () => void;
  rightComponent?: React.ReactNode;
  rightIcons?: RightIcon[];
  backgroundColor?: string;
  titleClassName?: string;
  showBackButton?: boolean;
  backIconSize?: number;
  backIconColor?: string;
}

export default function Header({
  title,
  onBack,
  rightComponent,
  rightIcons,
  backgroundColor = '#F8F8FB',
  titleClassName = 'text-base font-semibold text-[#1D1C1C]',
  showBackButton = true,
  backIconSize = 30,
  backIconColor = '#000',
}: HeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const renderIcon = (icon: RightIcon, index: number) => {
    const iconSize =  30;
    const iconColor = icon.color || '#000';
    const isLast = index === (rightIcons?.length || 0) - 1;

    let IconComponent;
    let iconName: any;

    switch (icon.type) {
      case 'filter':
        IconComponent = Feather;
        iconName = 'filter';
        break;
      case 'search':
        IconComponent = Feather;
        iconName = 'search';
        break;
      case 'settings':
        IconComponent = Feather;
        iconName = 'settings';
        break;
      case 'more':
        IconComponent = Feather;
        iconName = 'more-vertical';
        break;
      case 'add':
        IconComponent = Feather;
        iconName = 'plus';
        break;
      case 'bell':
        IconComponent = Feather;
        iconName = 'bell';
        break;
      case 'share':
        IconComponent = Feather;
        iconName = 'share-2';
        break;
      case 'edit':
        IconComponent = Feather;
        iconName = 'edit-2';
        break;
      default:
        IconComponent = Feather;
        iconName = 'circle';
    }

    return (
      <TouchableOpacity
        key={index}
        onPress={icon.onPress}
        activeOpacity={0.7}
        className={!isLast ? 'mr-4' : ''}
      >
        <IconComponent name={iconName} size={iconSize} color={iconColor} />
      </TouchableOpacity>
    );
  };

  const hasRightContent = rightComponent || (rightIcons && rightIcons.length > 0);

  return (
    <View
      className={`flex-row items-center ${hasRightContent ? 'justify-between' : ''} px-5 py-4`}
      style={{
        backgroundColor,
        paddingTop: Platform.OS === 'ios' ? 0 : 40,
      }}
    >
      <View className="flex-row items-center flex-1">
        {showBackButton && (
          <TouchableOpacity onPress={handleBack} activeOpacity={0.7}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={backIconSize}
              color={backIconColor}
            />
          </TouchableOpacity>
        )}
        <Text className={`${titleClassName} ml-4`}>{title}</Text>
      </View>
      {rightIcons && rightIcons.length > 0 && (
        <View className="flex-row items-center">
          {rightIcons.map((icon, index) => renderIcon(icon, index))}
        </View>
      )}
      {rightComponent && rightComponent}
    </View>
  );
}
