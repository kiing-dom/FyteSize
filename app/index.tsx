import { useRouter, router } from "expo-router";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@rneui/themed';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";


export default function OnboardingScreen() {

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsLoading(false); 
      if (user) {
        router.replace("/home"); 
      }
    });

    return unsubscribe;
  }, [router]);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="black" />
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

