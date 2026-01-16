import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  icon?: React.ReactNode;
}

export default function Button({
  title,
  variant = 'primary',
  loading = false,
  disabled,
  icon,
  className,
  ...props
}: ButtonProps) {
  const baseClasses = 'py-3 px-6 rounded-lg flex-row items-center justify-center';

  const variantClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    outline: 'border-2 border-primary bg-transparent',
  };

  const textClasses = {
    primary: 'text-white font-semibold text-base',
    secondary: 'text-white font-semibold text-base',
    outline: 'text-primary font-semibold text-base',
  };

  const disabledClasses = 'opacity-50';

  return (
    <TouchableOpacity
      className={`${baseClasses} ${variantClasses[variant]} ${disabled || loading ? disabledClasses : ''} ${className || ''}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#6200EE' : '#FFFFFF'} />
      ) : (
        <>
          {icon && icon}
          <Text className={`${textClasses[variant]} ${icon ? 'ml-2' : ''}`}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}
