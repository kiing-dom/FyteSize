import { Link } from "expo-router";
import { styled } from "nativewind";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'



export default function OnboardingScreen() {

  const StyledScrollView = styled(ScrollView);

  return (
    <SafeAreaView className="h-full bg-white">
      <StyledScrollView contentContainerStyle={{ height: "100%" }}>

        <View className="flex-1 justify-center items-center w-full">
          <Text className="text-3xl">Welcome to FyteSize</Text>
          <Link href="/home" className="text-blue-500">
            Go To Home
          </Link>
        </View>

      </StyledScrollView>
    </SafeAreaView>
  );
}

