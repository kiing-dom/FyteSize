import { View, Text } from 'react-native'
import React from 'react';
import useRegistrationStore from '@/hooks/auth/useRegistrationStore';
import { Button } from 'react-native-paper';



const Step3 = () => {

    const { formData, updateFormData, setCurrentStep } = useRegistrationStore();


    const handlePrevious = () => {
        setCurrentStep(1);
    }

    return (
        <View className='flex-1 justify-center items-center min-h-[84vh] w-[80%]'>
            <Text className='text-[20px]'>
                Step 3: Goals
            </Text>

            <View className='flex-row'>
            <Button
                    mode='contained'
                    buttonColor='gray'
                    onPress={handlePrevious}
                >
                    Previous
                </Button>
            </View>


        </View>
    )
};

export default Step3;