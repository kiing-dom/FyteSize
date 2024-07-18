import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();

    console.log('useEffect - onAuthStateChanged: Setting up listener');

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log('onAuthStateChanged: User state changed', firebaseUser);
      setUser(firebaseUser);
    });

    console.log('useEffect - onAuthStateChanged: Listener set up');

    return () => {
      console.log('useEffect cleanup: Cleaning up listener');
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {user ? (
          <Stack.Screen name='(tabs)' options={{ headerShown: true }} />
        ) : (
          <Stack.Screen name='(auth)' options={{ headerShown: false }} />
        )}
        <Stack.Screen name='+not-found' />
      </Stack>
    </ThemeProvider>
  );
}
