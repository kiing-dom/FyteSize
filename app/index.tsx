import { Link, useRouter } from "expo-router";
import { styled } from "nativewind";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '@rneui/themed';



export default function OnboardingScreen() {

  const router = useRouter();


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

