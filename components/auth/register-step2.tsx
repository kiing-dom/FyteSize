import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';
import useRegistrationStore from '@/hooks/auth/useRegistrationStore';

const Step2 = () => {
    /**  Include State Management Here */
    const { formData, updateFormData, setCurrentStep } = useRegistrationStore();

    const handlePrevious = () => {
        setCurrentStep(1);
    }



    return (
        <View className='flex-1 justify-center items-center min-h-[84vh]'>
            <Text className='text-[20px]'>
                Step 2: Personal Information
            </Text>
            <Button
                mode='contained'
                buttonColor='gray'
                onPress={handlePrevious}
            >
                Previous
            </Button>
        </View>

    )
};

export default Step2;