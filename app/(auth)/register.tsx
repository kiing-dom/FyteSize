import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import useRegistrationStore from '@/hooks/auth/useRegistrationStore';
import Step1 from '@/components/auth/register-step1';
import Step2 from '@/components/auth/register-step2';

const RegisterScreen = () => {
  const { currentStep } = useRegistrationStore();

  const totalSteps = 2;
  const progress = currentStep / totalSteps;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      default:
        return <Step1 />;
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <View className="w-full p-4">
        <ProgressBar progress={progress} className="mt-10 h-4 bg-neutral-300 rounded-md" color="blue" />
      </View>
      <ScrollView className=''>
        <View className="flex justify-center items-center min-h-[84vh]">
          {renderStep()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
