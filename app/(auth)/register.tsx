import React from 'react'
import { View, Text } from 'react-native'

import { ProgressBar } from 'react-native-paper'

import useRegistrationStore from '@/hooks/auth/useRegistrationStore'

import Step1 from '@/components/auth/register-step1'
import Step2 from '@/components/auth/register-step2'

const RegisterScreen = () => {
  const { currentStep } = useRegistrationStore();

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />
      default:
        return <Step1 />;
    }
  };

  return (
    <View>
      <ProgressBar />
      {renderStep()}
    </View>
  )
  
}

export default RegisterScreen