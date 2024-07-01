import { View, Text } from 'react-native'
import React from 'react';
import useRegistrationStore from '@/hooks/auth/useRegistrationStore';
import { Button } from 'react-native-paper';
import { ButtonGroup } from '@rneui/themed';


const weightGoals = [
    {label: "Lose Weight", value: -500},
    {label: "Maintain Weight", value: 0},
    {label: "Gain Weight", value: 500},
];

const activityLevels = [
    {label: "Sedentary (Little or No Exercise)", value: "Sedentary"},
    {label: "Lightly Active (1-3 Days of Weekly Exercise)", value: "Lightly Active"},
    {label: "Moderately Active (3-5 Days of Weekly Exercise)", value: "Moderately Active"},
    {label: "Very Active (6-7 Days of Weekly Exercise)", value: "Very Active"},
    {label: "Extremely Active (2x Daily Exercise/Physical Job)", value: "Extremely Active"}
]


const Step3 = () => {

    const { formData, updateFormData, setCurrentStep } = useRegistrationStore();


    const handlePrevious = () => {
        setCurrentStep(1);
    }

    const handleNext = () => {

    }

    return (
        <View className='flex-1 justify-center items-center min-h-[84vh] w-[80%]'>
            <Text className='text-[20px] mb-4'>
                Step 3: Goals
            </Text>


            <View className='w-[90%]'>
                <Text>Weight Goals</Text>
                <ButtonGroup
                    buttons={weightGoals.map((goals) => goals.label)}
                    vertical
                />
            </View>

            <View className='w-[90%]'>
                <Text>Activity Level</Text>
                <ButtonGroup
                    textStyle={{textAlign: 'center'}}
                    buttons={activityLevels.map((activityLevel) => activityLevel.label)}
                    vertical
                />
            </View>

            <View className='flex-row mt-8'>
            <Button
                    mode='contained'
                    buttonColor='gray'
                    onPress={handlePrevious}
                >
                    Previous
                </Button>

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

export default Step3;