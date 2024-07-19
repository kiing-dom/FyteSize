import { View, Text, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';
import { ActivityIndicator, List } from 'react-native-paper';
import useUserStore from '@/hooks/users/useUserStore';


const ProfileScreen = () => {
  const { userData, fetchUserData, clearUserData, loading, error} = useUserStore();

  useEffect(() => {
       
    setTimeout(() => {
      fetchUserData();
    }, 1000)
      
    console.log("User Data: ", userData);
  }, [fetchUserData]) 

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="black" />
      </SafeAreaView>
    );
  }


  return (
    <View className='flex-1 justify-center items-center'>
      <Text> Welcome, {userData?.firstName} </Text>

      <View>

      </View>
    </View>
  )
}

export default ProfileScreen;