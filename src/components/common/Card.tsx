import React from 'react';
import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  elevation?: 'sm' | 'md' | 'lg';
}

export default function Card({
  children,
  elevation = 'md',
  className,
  ...props
}: CardProps) {
  const elevationClasses = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };

  return (
    <View
      className={`bg-white rounded-lg p-4 ${elevationClasses[elevation]} ${className || ''}`}
      {...props}
    >
      {children}
    </View>
  );
}
