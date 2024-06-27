import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput, Modal, ToggleButton } from 'react-native-paper';
import useRegistrationStore, { Measurement } from '@/hooks/auth/useRegistrationStore';
import { Calendar } from 'react-native-calendars';
import { format, parseISO } from 'date-fns'

import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'

const Step2 = () => {
    /**  Include State Management Here */
    const { formData, updateFormData, setCurrentStep } = useRegistrationStore();
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [currentWeight, setCurrentWeight] = useState<Measurement>(formData.currentWeight);
    const [unit, setUnit] = useState<'kg' | 'lbs'>('kg');


    const handlePrevious = () => {
        setCurrentStep(1);
    }

    const handleDateSelect = (e: DateTimePickerEvent, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || formData.dateOfBirth;
        setShowDatePicker(false);
        updateFormData({ dateOfBirth: currentDate})
    }

    const handleCurrentWeightChange = (value: string ) => {
        setCurrentWeight({ ...currentWeight, value });
    }

    const convertWeight = (value: string, fromUnit: string, toUnit: string) => {
        if(fromUnit === toUnit) return value;
        if(fromUnit === 'kg' && toUnit === 'lbs') return (Number(value) * 2.20462).toFixed(2).toString();
        if(fromUnit === 'lbs' && toUnit === 'kg') return (Number(value) / 2.20462).toFixed(2).toString();
    }
    
    const handleWeightUnitToggle = (value: string) => {
        if(value === 'kg' || value === 'lbs'){
            const weightValue = currentWeight.value ?? '0'
            setUnit(value);
            const convertedWeight = convertWeight(weightValue, unit, value)
            setCurrentWeight({ value: convertedWeight, unit: value })};
    };

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

            <Text className='text-gray-500'>Current Weight</Text>
            <View className='flex-row items-center mt-5'>
            <TextInput 
                mode='outlined'
                activeOutlineColor='black'
                className='h-12 mr-4 mb-4 w-[70%]'
                keyboardType='numeric'
                value={currentWeight.value}
                onChangeText={handleCurrentWeightChange}
            />
            <ToggleButton.Row style={{ height: 56}} onValueChange={handleWeightUnitToggle} value={unit}>
                <ToggleButton icon="weight-kilogram" value='kg' />
                <ToggleButton icon="weight-pound" value='lbs' />
            </ToggleButton.Row>

            </View>

            <Button
                mode='contained'
                buttonColor='gray'
                onPress={handlePrevious}
            >
                Previous
            </Button>

            {/** Modal for Date of Birth */}
            {showDatePicker && (
                <DateTimePicker
                    value={formData.dateOfBirth || new Date()}
                    mode="date"
                    display="default"
                    onChange={handleDateSelect}
                    
                />
            )}
        </View>



    )
};

export default Step2;