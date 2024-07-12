import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import useRegistrationStore from '@/hooks/auth/useRegistrationStore';
import { Button } from 'react-native-paper';
import { ButtonGroup } from '@rneui/themed';

const weightGoals = [
    { label: "Lose Weight", value: -500 },
    { label: "Maintain Weight", value: 0 },
    { label: "Gain Weight", value: 500 },
];

const activityLevels = [
    { label: "Sedentary (Little or No Exercise)", value: "Sedentary" },
    { label: "Lightly Active (1-3 Days of Weekly Exercise)", value: "Lightly Active" },
    { label: "Moderately Active (3-5 Days of Weekly Exercise)", value: "Moderately Active" },
    { label: "Very Active (6-7 Days of Weekly Exercise)", value: "Very Active" },
    { label: "Extremely Active (2x Daily Exercise/Physical Job)", value: "Extremely Active" }
];

const Step3 = () => {
    const { formData, updateFormData, setCurrentStep } = useRegistrationStore();

    const [bmr, setBmr] = useState(formData.bmr || 0);
    const [tdee, setTdee] = useState(formData.tdee || 0);

    const [weightGoal, setWeightGoal] = useState(formData.weightGoal);
    const [isWeightGoalSelected, setIsWeightGoalSelected] = useState(false);

    const [activityLevel, setActivityLevel] = useState(formData.activityLevel);
    const [isActivityLevelSelected, setIsActivityLevelSelected] = useState(false);

    const handleWeightGoalSelection = (idx: number) => {
        const selectedGoal = weightGoals[idx]?.label;
        setWeightGoal(selectedGoal);
        setIsWeightGoalSelected(idx !== -1);
        updateFormData({ weightGoal: selectedGoal });
    };

    const handleActivityLevelSelection = (idx: number) => {
        const selectedLevel = activityLevels[idx]?.value;
        setActivityLevel(selectedLevel);
        setIsActivityLevelSelected(idx !== -1);
        updateFormData({ activityLevel: selectedLevel });
    };

    const handlePrevious = () => {
        setCurrentStep(2);
    };

    const handleNext = () => {
        updateFormData({ weightGoal, activityLevel, bmr, tdee });
        setCurrentStep(4);
        console.log(formData);
    };

    useEffect(() => {
        if (activityLevel && weightGoal) {
            calculateBMR();
        }
    }, [activityLevel, weightGoal]);

    useEffect(() => {
        if (bmr && activityLevel && weightGoal) {
            calculateTdee();
        }
    }, [bmr, activityLevel, weightGoal]);

    const calculateBMR = () => {
        if (formData.gender === "male") {
            setBmr(Math.floor(10 * parseInt(formData.currentWeight) + 6.25 * parseInt(formData.height) - 5 * formData.age + 5));
        } else {
            setBmr(Math.floor(10 * parseInt(formData.currentWeight) + 6.25 * parseInt(formData.height) - 5 * formData.age - 161));
        }
    };

    const calculateTdee = () => {
        const activityMultipliers: Record<string, number> = {
            "Sedentary": 1.2,
            "Lightly Active": 1.375,
            "Moderately Active": 1.55,
            "Very Active": 1.725,
            "Extremely Active": 1.9
        };

        const goalMultiplier = weightGoals.find((goal) => goal.label === weightGoal)?.value ?? 0;

        setTdee(Math.floor(bmr * activityMultipliers[activityLevel] + goalMultiplier));
    };

    return (
        <View className='flex-1 justify-center items-center min-h-[84vh] w-[80%]'>
            <Text className='text-[20px] mb-4'>Step 3: Goals</Text>

            <View className='w-full'>
                <Text>Weight Goals</Text>
                <ButtonGroup
                    buttonContainerStyle={{ height: 52 }}
                    containerStyle={{ borderRadius: 16, borderColor: "black" }}
                    buttons={weightGoals.map((goals) => goals.label)}
                    selectedIndex={weightGoals.findIndex((goal) => goal.label === weightGoal)}
                    onPress={handleWeightGoalSelection}
                    vertical
                    selectedButtonStyle={{backgroundColor: "black"}}
                />
            </View>

            <View className='w-full'>
                <Text>Activity Level</Text>
                <ButtonGroup
                    buttonContainerStyle={{ height: 52 }}
                    containerStyle={{ borderRadius: 16, borderColor: "black" }}
                    textStyle={{ textAlign: 'center' }}
                    buttons={activityLevels.map((level) => level.label)}
                    selectedIndex={activityLevels.findIndex((level) => level.value === activityLevel)}
                    onPress={handleActivityLevelSelection}
                    vertical
                    selectedButtonStyle={{backgroundColor: "black"}}
                />
            </View>

            <View className='flex-row mt-8'>
                <Button mode='contained' buttonColor='gray' onPress={handlePrevious}>Previous</Button>
                <Button mode='contained' buttonColor='black' onPress={handleNext}>Next</Button>
            </View>
        </View>
    );
};

export default Step3;
