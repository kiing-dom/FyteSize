import React, { useState } from 'react';
import { View, Alert, Text } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import useRegistrationStore from '@/hooks/auth/useRegistrationStore';
import { db, auth } from '../../firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import bcrypt from 'bcryptjs';
import { router } from 'expo-router';
import CryptoJS from 'crypto-js';


const Step5 = () => {
    const { formData, setCurrentStep, updateFormData } = useRegistrationStore();

    const [firstName, setFirstName] = useState(formData.firstName);
    const [isFirstNameValid, setIsFirstNameValid] = useState(false);
    const [firstNameError, setFirstNameError] = useState('');

    const [lastName, setLastName] = useState(formData.lastName);
    const [isLastNameValid, setIsLastNameValid] = useState(false);
    const [lastNameError, setLastNameError] = useState('');

    const [email, setEmail] = useState(formData.email);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [emailError, setEmailError] = useState('');

    const [password, setPassword] = useState(formData.password);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarColor, setSnackbarColor] = useState('green');

    const handleFirstNameInput = (value: string) => {
        setFirstName(value);
        setIsFirstNameValid(value.length > 0 || value !== '');
        setFirstNameError(value.trim().length > 0 ? '' : 'First Name is required!')
    };

    const handleLastNameInput = (value: string) => {
        setLastName(value);
        setIsLastNameValid(value.length > 0 || value !== '');
        setLastNameError(value.trim().length > 0 ? '' : 'Last Name is required!') 
    };

    const handleEmailInput = (value: string) => {
        setEmail(value);
        setIsEmailValid(validateEmail(value));
        setEmailError(validateEmail(value) ? '' : 'Invalid email format!');
    };

    const handlePasswordInput = (value: string) => {
        setPassword(value);
        setIsPasswordValid(validatePassword(value));
        setPasswordError(validatePassword(value) ? '' : 'Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character')
    };

    const validateEmail = (email: string) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const validatePassword = (password: string) => {
        // Regex for password: at least 8 characters, one uppercase letter, one lowercase letter, one number, one special character
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W\_])[0-9a-zA-Z\W\_]{8,}$/.test(password);
    };

    const handlePrevious = () => {
        setCurrentStep(4);
    }

    const handleAccountCreation = async () => {
        try {
            const hashedPassword = CryptoJS.SHA256(formData.password).toString();

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid;

            await setDoc(doc(db, 'users', userId), {
                userId,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: hashedPassword,
                boxingLevel: formData.boxingLevel,
                dateOfBirth: formData.dateOfBirth,
                age: formData.age,
                currentWeight: formData.currentWeight,
                height: formData.height,
                location: formData.location,
                weightGoal: formData.weightGoal,
                activityLevel: formData.activityLevel,
                bmr: formData.bmr,
                tdee: formData.tdee
            });

            router.push('/login')
            setSnackbarMessage('Registration Successful');
            setSnackbarColor('green');
            setSnackbarVisible(true);


        } catch (error) {
            console.error(error);
            setSnackbarMessage('Registration Failed: ' + error);
            setSnackbarColor('red');
            setSnackbarVisible(true);
        }
    }

    const handleAccountCreationPress = () => {
        handleAccountCreation().catch(error => {
            console.error('Error handling account creation: ', error);
        });
    };

    const handleRegistration = async () => {
        updateFormData({ firstName, lastName, email, password })
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
                },
                {
                    text: 'Confirm',
                    onPress: handleAccountCreationPress
                }
            ],
            { cancelable: true }
        );
    };

    return (
        <View className='flex-1 justify-center items-center min-h-[84vh] w-[90%]'>
            <TextInput
                className='w-[90%] mb-4'
                mode='outlined'
                label='First Name'
                value={firstName}
                onChangeText={handleFirstNameInput}
                activeOutlineColor='black'
                outlineColor='black'
                autoCapitalize="words"
                error={!isFirstNameValid}
            />
            {firstNameError ? <Text className='flex self-start text-red-500 ml-4 -mt-2 mb-4'>{firstNameError}</Text> : null}

            <TextInput
                className='w-[90%] mb-4'
                mode='outlined'
                label='Last Name'
                value={lastName}
                onChangeText={handleLastNameInput}
                activeOutlineColor='black'
                outlineColor='black'
                autoCapitalize="words"
                error={!isLastNameValid}
            />
            {lastNameError ? <Text className='flex self-start text-red-500 ml-4 -mt-2 mb-4'>{lastNameError}</Text> : null}

            <TextInput
                className='w-[90%] mb-4'
                mode='outlined'
                label='E-mail'
                value={email}
                onChangeText={handleEmailInput}
                activeOutlineColor='black'
                outlineColor='black'
                error={!isEmailValid}
            />
            {emailError ? <Text className='flex self-start text-red-500 ml-4 -mt-2 mb-4'>{emailError}</Text> : null}

            <TextInput
                className='w-[90%] mb-4'
                mode='outlined'
                label='Password'
                value={password}
                onChangeText={handlePasswordInput}
                secureTextEntry
                activeOutlineColor='black'
                outlineColor='black'
                error={!isPasswordValid}
            />
            {passwordError ? <Text className='flex self-start text-red-500 ml-4 -mt-2 mb-4'>{passwordError}</Text> : null}

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

            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={3000}
                style={{ backgroundColor: snackbarColor }}
            >
                {snackbarMessage}
            </Snackbar>

        </View>
    );
};

export default Step5;
