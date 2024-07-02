import { View, Text } from 'react-native'
import React from 'react'

import useRegistrationStore from '@/hooks/auth/useRegistrationStore';
import { Button } from 'react-native-paper';



const Step4 = () => {

const { formData, updateFormData, setCurrentStep } = useRegistrationStore();


const handlePrevious = () => {
    setCurrentStep(3);
}

  return (
    <View className='flex-1 justify-center items-center min-h-[84vh] w-[80%]'>
        <Text className='text-[24px]'>Step 4: Calorie Goal</Text>
        <Text className='text-[20px]'>
            {formData.tdee}
        </Text>

        <View className='flex-row mt-8'>
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

export default Step4;