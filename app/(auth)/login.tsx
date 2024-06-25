import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React from 'react';


const LoginScreen = () => {
  return (
    <SafeAreaView className='h-full bg-white'>
      <ScrollView style={{ height: "100%" }}>
        <View className='flex-1 justify-center items-center'>
          <Image
            source={require("../../assets/images/adaptive-icon.png")}
            className = 'w-[512px] h-[512px]'
            resizeMode='contain'
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default LoginScreen