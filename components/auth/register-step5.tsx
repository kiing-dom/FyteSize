import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import useRegistrationStore from '@/hooks/auth/useRegistrationStore';


const Step5 = () => {
    const { formData, setCurrentStep, updateFormData } = useRegistrationStore();

    const [firstName, setFirstName] = useState(formData.firstName);
    const [isFirstNameValid, setIsFirstNameValid] = useState(false);

    const [lastName, setLastName] = useState(formData.lastName);
    const [isLastNameValid, setIsLastNameValid] = useState(false);

    const [email, setEmail] = useState(formData.email);
    const [isEmailValid, setIsEmailValid] = useState(false);

    const [password, setPassword] = useState(formData.password);
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const handleFirstNameInput = (value: string) => {
        setFirstName(value);

        setIsFirstNameValid(value.length > 0 || value !== '');
    };

    const handleLastNameInput = (value: string) => {
        setLastName(value);
        
        setIsLastNameValid(value.length > 0 || value !== '');
    };

    const handleEmailInput = (value: string) => {
        setEmail(value);
        // Validate the email here if needed
        setIsEmailValid(validateEmail(value)); 
    };

    const handlePasswordInput = (value: string) => {
        setPassword(value);
        setIsPasswordValid(value.length >= 8);
    };

    const validateEmail = (email: string) => {
        // Basic email validation
        return /\S+@\S+\.\S+/.test(email);
    };

    const handlePrevious = () => {
        setCurrentStep(4);
    }

    const handleRegistration = async () => {
        updateFormData({firstName, lastName, email, password})
        Alert.alert(
            "Confirm Registration",
            `
                Please confirm your details:
                \n\nBoxing Level: ${formData.boxingLevel}
                \nGender: ${formData.gender}
                \nWeight Class: ${formData.weightClass}

                \n\nDate of Birth: ${formData.dateOfBirth?.toLocaleDateString()} (age: ${formData.age})
                \nCurrent Weight: ${formData.currentWeight}kg
                \nHeight: ${formData.height}cm
                \nLocation: ${formData.location}

                \n\nWeight Goal: ${formData.weightGoal}
                \nActivity Level: ${formData.activityLevel}
                
                \n\nCalorie Goal: ${formData.tdee}

                \n\nFirst Name: ${formData.firstName}
                \nLast Name: ${formData.lastName}
                \nEmail: ${formData.email}
                \nPassword: ${password[0] + '*'.repeat(formData.password.length - 1)}
            `,
            [
                {
                    text: 'Close',
                    style: 'cancel'
                }
            ],
            { cancelable: true }
        );
    };

    return (
        <View className='flex-1 justify-center items-center min-h-[84vh] w-[80%]'>
            <TextInput
                className='w-[90%] mb-4'
                mode='outlined'
                label='First Name'
                value={firstName}
                onChangeText={handleFirstNameInput}
                activeOutlineColor='black'
                outlineColor='black'
            />
            <TextInput
                className='w-[90%] mb-4'
                mode='outlined'
                label='Last Name'
                value={lastName}
                onChangeText={handleLastNameInput}
                activeOutlineColor='black'
                outlineColor='black'
            />
            <TextInput
                className='w-[90%] mb-4'
                mode='outlined'
                label='E-mail'
                value={email}
                onChangeText={handleEmailInput}
                activeOutlineColor='black'
                outlineColor='black'
            />
            <TextInput
                className='w-[90%] mb-4'
                mode='outlined'
                label='Password'
                value={password}
                onChangeText={handlePasswordInput}
                secureTextEntry
                activeOutlineColor='black'
                outlineColor='black'
            />

            <View className='flex-row mt-8'>
            <Button
                    mode='contained'
                    onPress={handlePrevious}
                    buttonColor='black'
                >
                    Previous
                </Button>

                <Button
                    mode='contained'
                    onPress={handleRegistration}
                    buttonColor='blue'
                    disabled={!isFirstNameValid || !isLastNameValid || !isEmailValid || !isPasswordValid}
                >
                    Create Account
                </Button>
            </View>

        </View>
    );
};

export default Step5;
