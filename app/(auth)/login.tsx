import useRegistrationStore from '@/hooks/auth/useRegistrationStore';
import { router } from 'expo-router';
import React, { useState } from 'react';

import { View, Text, SafeAreaView, ScrollView, Image, Alert } from 'react-native'
import { TextInput, Button, Snackbar } from 'react-native-paper';

import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';


const LoginScreen = () => {

  /**  Include State Management Here */
  const { setCurrentStep } = useRegistrationStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      setSnackbarMessage('Login Successful');
      setSnackbarVisible(true);

      setTimeout(() => {
        router.push('/home')
      }, 2000)

    } catch (error: any) {
      console.log("Login Error", error);

      let errorMessage = "An error occurred";
      if (error instanceof FirebaseError) {
        errorMessage = `${error.code}: ${error.message}`;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }


      Alert.alert(
        "Login Failed",
        errorMessage,
        [{ text: "CLOSE", style: "cancel" }],
        { cancelable: true }
      );
    }
  }

  const handleRegisterPress = () => {
    setCurrentStep(1);
    router.push('/register')
  };

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
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            activeOutlineColor='black'
            keyboardType='email-address'
          />
          <TextInput
            className='w-[80%] mb-4'
            mode='outlined'
            label="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            activeOutlineColor='black'
            secureTextEntry={true}
          />
          <Button
            mode='contained'
            className='w-[80%] mb-2 bg-black'
            labelStyle={{ fontSize: 20 }}
            onPress={handleLogin}
          >
            Login
          </Button>
          <Text className='text-[16px]'>
            Dont have an account? <Text onPress={handleRegisterPress} className='text-blue-500 font-bold'>Register</Text>
          </Text>


          <Snackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
            duration={2000}
          >
            {snackbarMessage}
          </Snackbar>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default LoginScreen;