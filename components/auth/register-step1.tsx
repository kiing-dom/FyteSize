import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'


import useRegistrationStore from '@/hooks/auth/useRegistrationStore';

import RNPickerSelect from 'react-native-picker-select';

import { Button } from 'react-native-paper';

import boxingData from '../../assets/boxingData.json';

type BoxingLevel = 'Amateur' | 'Professional';
type Gender = 'male' | 'female';

const Step1 = () => {

    const { formData, updateFormData, setCurrentStep } = useRegistrationStore();
    const { boxingLevels, weightClasses } = boxingData;

    const [boxingLevel, setBoxingLevel] = useState<BoxingLevel>(formData.boxingLevel as BoxingLevel);
    const [gender, setGender] = useState<Gender>(formData.gender as Gender | 'male');
    const [weightClass, setWeightClass] = useState(formData.weightClass);

    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        setIsDisabled(!boxingLevel || !gender || !weightClass);
    }, [boxingLevel, gender, weightClass]);

    const handleNext = () => {
        updateFormData({ boxingLevel, gender, weightClass });
        setCurrentStep(2);
    }

    const handleBoxingLevelChange = (value: BoxingLevel) => {
        setBoxingLevel(value);
        setWeightClass(null);
    }

    const handleGenderChange = (value: Gender) => {
        setGender(value);
        setWeightClass(null);
    }

    const weightClassChange = (value: Record<string, string>) => {
        setWeightClass(value);
    }


    /* Creating Options to use in the Pickers */


    /** Get Weight Class Options based on boxing level and gender */
    const availableWeightClasses = weightClasses[gender]?.[boxingLevel] || [];
    const weightClassOptions = availableWeightClasses.map(({ name, weight }) => ({
        label: `${name} (${weight} kg)`,
        value: name
    }));


    return (

        <View className='flex-1 justify-center items-center min-h-[84vh] w-[80%]'>
            <Text className='text-[20px]'>Step 1: Boxing Information</Text>

            {/** Boxing Level Picker */}
            <RNPickerSelect
                placeholder={{ label: 'Select Boxing Level', value: null }}
                items={boxingLevels.map(level => ({ label: level, value: level }))}
                onValueChange={handleBoxingLevelChange}
                value={boxingLevel}
            />

            {/** Gender Picker */}
            <RNPickerSelect
                placeholder={{ label: 'Select Gender', value: null }}
                items={[
                    { label: 'Male', value: 'male' },
                    { label: 'Female', value: 'female' }
                ]}
                onValueChange={handleGenderChange}
                value={gender}
            />

            {/** Weight Class Picker */}
            <RNPickerSelect
                placeholder={{ label: 'Select Weight Class', value: null }}
                items={weightClassOptions}
                onValueChange={weightClassChange}
                value={weightClass}
            />

            {/** Next Button */}
            <Button
                mode='contained'
                onPress={handleNext}
                buttonColor='black'
                disabled={isDisabled}
            >
                Next
            </Button>


        </View>
    )
}

export default Step1