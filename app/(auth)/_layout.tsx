import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='login' options={{
        headerTitle: 'Login'
      }} />
      <Stack.Screen name='register' />
    </Stack>
  )
}

export default AuthLayout