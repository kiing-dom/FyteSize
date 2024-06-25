import { Link } from 'expo-router';
import React, { useState } from 'react';

import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import { TextInput, Button } from 'react-native-paper';


const LoginScreen = () => {

  const [form, setForm] = useState({
    email: '',
    username: '',
    password: ''
  })

  return (
    <SafeAreaView className='h-full bg-white'>
      <ScrollView style={{ height: "100%" }}>
        <View className='flex-1 justify-center items-center min-h-[84vh]'>
          <Image
            source={require("../../assets/images/adaptive-icon.png")}
            className='w-[400px] h-[400px]'
            resizeMode='contain'
          />
          <TextInput
            className='w-[80%] -mt-8 mb-2'
            mode='outlined'
            label="Email/Username"
            value={form.email || form.username}
            activeOutlineColor='black'
            keyboardType='email-address'
          />
          <TextInput
            className='w-[80%] mb-4'
            mode='outlined'
            label="Password"
            value={form.password}
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
          <Text className='text-[16px]'>
            Dont have an account? <Link href="/register" className='text-blue-500 font-bold'>Register</Link>
          </Text>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default LoginScreen