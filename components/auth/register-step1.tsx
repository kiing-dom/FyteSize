import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import useRegistrationStore from '@/hooks/auth/useRegistrationStore';

const Step1 = () => {

    const router = useRouter();

    const { formData, updateFormData, setCurrentStep } = useRegistrationStore();

    const [boxingLevel, setBoxingLevel] = useState(formData.boxingLevel);
    const [gender, setGender] = useState(formData.gender);
    const [weightClass, setWeightClass] = useState(formData.weightClass);

    const handleNext = () => {
        updateFormData({ boxingLevel, gender, weightClass});
        setCurrentStep(2);
    }

  return (
    <SafeAreaView className='h-full bg-white'>
        <ScrollView>
            <View className='flex-1 justify-center items-center min-h-[84vh]'>
                <Text>Step 1: Boxing Information</Text>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default Step1