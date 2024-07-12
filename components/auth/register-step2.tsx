import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'

import useRegistrationStore from '@/hooks/auth/useRegistrationStore';

import { Button, TextInput } from 'react-native-paper';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';

import { format, differenceInYears } from 'date-fns';
import axios from 'axios'

const apiKey = process.env.EXPO_PUBLIC_COUNTRY_API_KEY;
const apiUrl = process.env.EXPO_PUBLIC_COUNTRY_URL;


const Step2 = () => {
    /**  Include State Management Here */
    const { formData, updateFormData, setCurrentStep } = useRegistrationStore();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [age, setAge] = useState(formData.age);

    const [currentWeight, setCurrentWeight] = useState(formData.currentWeight);

    const [height, setHeight] = useState(formData.height);

    const [location, setLocation] = useState(formData.location);
    
    const [isDisabled, setIsDisabled] = useState(true);

    const handlePrevious = () => {
        setCurrentStep(1);
    }

    const handleNext = () => {
        setCurrentStep(3);
        updateFormData({ currentWeight, height, location, age })
    }

    const handleDateSelect = (e: DateTimePickerEvent, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || formData.dateOfBirth;
        setShowDatePicker(false);
        updateFormData({ dateOfBirth: currentDate });

        if(currentDate) {
           const calculatedAge = differenceInYears(new Date(), new Date(currentDate));
           setAge(calculatedAge); 
        }
    }

    const handleCurrentWeightChange = (value: string) => {
        setCurrentWeight(value);
    }

    const handleHeightChange = (value: string) => {
        setHeight(value);
    }

    const handleLocationSelection = (value: string) => {
        setLocation(value);
    }

    useEffect(() => {
        setIsDisabled(!formData.dateOfBirth || !currentWeight || !height || !location);

        //dynamically update age on component mount or when age changes
        if(formData.dateOfBirth) {
            const calculatedAge = differenceInYears(new Date(), new Date(formData.dateOfBirth));
            setAge(calculatedAge);
        }
    },  [currentWeight, height, location]);

    const [countryData, setCountryData] = useState<{ value: any; label: any; }[]>([]);;
    useEffect(() => {
        const config = {
            method: 'get',
            url: apiUrl,
            headers: {
                'X-CSCAPI-KEY': apiKey
            }
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                let count = Object.keys(response.data).length;
                let countryArray: { value: any; label: any; }[] = [];
                for (let idx = 0; idx < count; idx++) {
                    countryArray.push({
                        value: response.data[idx].iso2,
                        label: response.data[idx].name,
                    });
                }
                setCountryData(countryArray);
            })
            .catch(function (error: string) {
                console.log(error)
            });
    }, []);


    return (
        <View className='flex-1 justify-center items-center min-h-[84vh] w-[80%]'>
            <Text className='text-[20px]'>
                Step 2: Personal Information
            </Text>

            {/* Date of Birth Input */}
            <Text className='text-neutral-500'>Date of Birth</Text>
            <Text className='font-bold'>Age: {age} </Text>
            <Button
                textColor='black'
                mode='outlined'
                style={{ marginTop: 10, marginBottom: 20, width: '100%' }}
                onPress={() => setShowDatePicker(true)} // Show modal with calendar when pressed
            >
                {formData.dateOfBirth ? format(formData.dateOfBirth, 'dd/MM/yyyy') : 'Select Date of Birth'}
            </Button>
            

            {/* Current Weight Input */}
            <Text className='text-neutral-500'>Weight</Text>
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

            {/* Height Input */}
            <Text className='text-neutral-500'>Height</Text>
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
            {/* Location Input */}
            <Text className='text-neutral-500'>Location</Text>
            <View className='mt-2 w-full'>
                <RNPickerSelect
                    style={{ placeholder: {
                        color: "gray"
                    }}}
                    placeholder={{ label: "Select your Location...", value: null}}
                    items={countryData}
                    onValueChange={handleLocationSelection}
                    value={location}
                />
            </View>

            {/** Previous and Next Buttons */}
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
                    disabled={isDisabled}
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