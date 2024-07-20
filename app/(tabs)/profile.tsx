import { View, Text, SafeAreaView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, List } from 'react-native-paper';
import useUserStore from '@/hooks/users/useUserStore';
import { getAuth, signOut } from 'firebase/auth';
import { router } from 'expo-router';


const ProfileScreen = () => {
  const { userData, fetchUserData, clearUserData, loading, error } = useUserStore();
  const auth = getAuth();
  const [timeoutReached, setTimeoutReached] = useState(false);

  useEffect(() => {

    fetchUserData();
    const timer = setTimeout(() => {
      setTimeoutReached(true);
    }, 1000);

    return () => clearTimeout(timer);

  }, [fetchUserData])

  if (loading || !timeoutReached) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="black" />
      </SafeAreaView>
    );
  }

  const handleSignOut = async () => {
    Alert.alert(
      "Sign Out", "Are you sure you want to sign out?",
      [{
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Sign Out",
        onPress: async () => {
          try {
            await signOut(auth);
            clearUserData();
            router.push('/')
          } catch (error) {
            console.log("Error at sign-out", error);
          }
        }
      }
      ]
    )
  }


  return (
    <View className='flex-1 justify-center items-center bg-white'>
      <View className='mb-4 items-center'>
        <Text className='text-3xl'> Welcome,
          <Text className='font-semibold italic'> {userData?.firstName}
          </Text>
        </Text>

        <Text className='text-base text-neutral-500'>{userData?.email}</Text>

      </View>


      <View className='w-[50%] items-center options-list'>

        <List.Item
          title="Edit Profile"
          left={props => <List.Icon {...props} icon="pencil" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />

        <List.Item
          title="Sign Out"
          left={props => <List.Icon {...props} icon="logout" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={handleSignOut}
        />
      </View>
    </View>
  )
}

export default ProfileScreen;