import React from 'react';

import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import { TextInput, Button } from 'react-native-paper';


const LoginScreen = () => {
  return (
    <SafeAreaView className='h-full bg-white'>
      <ScrollView style={{ height: "100%" }}>
        <View className='flex-1 justify-center items-center'>
          <Image
            source={require("../../assets/images/adaptive-icon.png")}
            className = 'w-[400px] h-[400px]'
            resizeMode='contain'
          />
          <TextInput
            className='w-[80%] -mt-8 mb-2'
            mode='outlined'
            label="Email/Username"
            activeOutlineColor='black'
          />
          <TextInput
            className='w-[80%] mb-4'
            mode='outlined'
            label="Password"
            activeOutlineColor='black'
            secureTextEntry={true}
          />
          <Button
            mode='contained'
            className='w-[80%] mb-2 bg-black'
            labelStyle={{ fontSize: 20 }}
          >
            Login
          </Button>
          <Button
            mode='outlined'
            className='w-[80%] mb-2 bg-white'
            textColor='black'
            labelStyle={{ fontSize: 20 }}
          >
            Register
          </Button>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default LoginScreen