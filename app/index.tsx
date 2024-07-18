import { Link, useRouter } from "expo-router";
import { styled } from "nativewind";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'

import { router } from "expo-router";

import { Button } from '@rneui/themed';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";


export default function OnboardingScreen() {

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true); // State to track loading state

  useEffect(() => {
    const auth = getAuth(); // Initialize auth from Firebase Modular SDK

    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsLoading(false); // Set loading to false when auth state is determined
      if (user) {
        router.replace("/home"); // Redirect to home if user is authenticated
      }
      // No need for an else case, as the component will render the onboarding UI until redirected
    });

    return unsubscribe; // Cleanup function to unsubscribe from onAuthStateChanged
  }, [router]);

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </SafeAreaView>
    );
  }



  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView contentContainerStyle={{ height: "100%" }}>

        <View className="flex-1 justify-center items-center w-full">
          <Text className="text-3xl">Welcome to FyteSize</Text>
          <Button 
            onPress={() => {
              router.push("/login")
            }} 
            title="Continue"
            size="lg"
            raised
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

