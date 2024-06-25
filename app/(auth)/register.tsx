import { View, Text } from 'react-native'
import React from 'react'
import Step1 from '@/components/auth/register-step1'
import useRegistrationStore from '@/hooks/auth/useRegistrationStore'

const RegisterScreen = () => {
  const { currentStep } = useRegistrationStore();

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return <Step1 />;
      default:
        return <Step1 />;
    }
  };

  return (
    <View>
      {renderStep()}
    </View>
  )
  
}

export default RegisterScreen