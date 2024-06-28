import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper';
import useRegistrationStore from '@/hooks/auth/useRegistrationStore';
import { format } from 'date-fns'

import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'

const Step2 = () => {
    /**  Include State Management Here */
    const { formData, updateFormData, setCurrentStep } = useRegistrationStore();
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [currentWeight, setCurrentWeight] = useState(formData.currentWeight);

    const [height, setHeight] = useState(formData.height);

    const handlePrevious = () => {
        setCurrentStep(1);
    }

    const handleNext = () => {
        setCurrentStep(3);
        updateFormData({ currentWeight, height})
    }

    const handleDateSelect = (e: DateTimePickerEvent, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || formData.dateOfBirth;
        setShowDatePicker(false);
        updateFormData({ dateOfBirth: currentDate})
    }

    const handleCurrentWeightChange = (value: string) => {
        setCurrentWeight(value);
    }
    
    const handleHeightChange = (value: string) => {
        setHeight(value);
    }

    return (
        <View className='flex-1 justify-center items-center min-h-[84vh] w-[80%]'>
            <Text className='text-[20px]'>
                Step 2: Personal Information
            </Text>
            <Text className='text-gray-500'>Date of Birth</Text>
            <Button
                textColor='black'
                mode='outlined'
                style={{ marginTop: 10, marginBottom: 20, width: '100%' }}
                onPress={() => setShowDatePicker(true)} // Show modal with calendar when pressed
            >
                {formData.dateOfBirth ? format(formData.dateOfBirth, 'dd/MM/yyyy') : 'Select Date of Birth'}
            </Button>

            <View className='flex-row items-center mt-2'>
            <TextInput 
                label="Current Weight (kg)"
                mode='outlined'
                activeOutlineColor='black'
                className='h-12 mr-4 mb-4 w-[90%]'
                keyboardType='numeric'
                value={currentWeight}
                onChangeText={handleCurrentWeightChange}
            />

            </View>

            {/* Current Height Input */}
            <View className='flex-row items-center mt-2'>
            <TextInput
                label="Height (cm)"
                mode='outlined'
                activeOutlineColor='black'
                className='h-12 mr-4 mb-4 w-[90%]'
                keyboardType='numeric'
                value={height}
                onChangeText={handleHeightChange}
            />
            </View>

            <View className='flex-row '>

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
            

            {/** Modal for Date of Birth */}
            {showDatePicker && (
                <DateTimePicker
                    value={formData.dateOfBirth ? new Date(formData.dateOfBirth) : new Date()}
                    mode="date"
                    display="default"
                    onChange={handleDateSelect}
                    
                />
            )}
        </View>



    )
};

export default Step2;