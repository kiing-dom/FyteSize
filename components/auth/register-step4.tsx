import { View, Text } from 'react-native'
import React from 'react'

import useRegistrationStore from '@/hooks/auth/useRegistrationStore';
import { Button } from 'react-native-paper';



const Step4 = () => {

const { formData, updateFormData, setCurrentStep } = useRegistrationStore();


const handlePrevious = () => {
    setCurrentStep(3);
}

const handleNext = () => {
    setCurrentStep(5);
}

  return (
    <View className='flex-1 justify-center items-center min-h-[84vh] w-[80%]'>
        <Text className='text-[24px]'>Congratulations!</Text>
        <Text className='text-neutral-500 text-center mb-4'> Based on the information you provided,{"\n"}
            we were able to calculate your calorie goal
        </Text>
        <Text className='text-[24px]'>
            Your Daily Calorie Goal is:
        </Text>
        <Text className='text-center text-[32px] font-extrabold mb-8'>
            {formData.tdee} 
            {"\n"}
            <Text className='text-[20px] font-light text-neutral-500'>kcal</Text>
        </Text>

        <Text className='text-neutral-500 text-center mb-2'>If you're not happy with the results, feel free to return to the previous steps to make adjustments</Text>
        <Text className='text-neutral-600 text-center'> Otherwise press <Text className='font-semibold'>'Next'</Text> to proceed to the final step</Text>

        <View className='flex-row mt-8'>
                <Button
                    mode='contained'
                    buttonColor='gray'
                    onPress={handlePrevious}
                >
                    Previous
                </Button>
        </View>

        <View className='flex-row mt-8'>
                <Button
                    mode='contained'
                    buttonColor='black'
                    onPress={handleNext}
                >
                    Next
                </Button>
        </View>
        
    </View>
  )
};

export default Step4;