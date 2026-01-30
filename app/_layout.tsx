import '../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { AuthProvider } from '../src/context/AuthProvider';

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(features)" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </AuthProvider>
  );
}
