import { create } from 'zustand';

interface FormData {
    // Step 1: Boxing Information
    boxingLevel: string;
    gender: string;
    weightClass: Record<string, string> | null;

    // Step 2: Personal Information
    dateOfBirth: Date | null;
    age: number;
    height: string;
    currentWeight: string;
    location: string;

    // Step 3: Goal Setting
    weightGoal: string;
    activityLevel: string;

    // Step 4:: Daily Calorie Goal Calculations
    bmr: number;
    tdee: number;

    //Step: 5 Registration
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

interface RegistrationState {
    currentStep: number;
    formData: FormData;
    setCurrentStep: (step: number) => void;
    updateFormData: (data: Partial<FormData>) => void
}

const useRegistrationStore = create<RegistrationState>((set) => ({
    currentStep: 1,
    formData: {
        boxingLevel: '',
        gender: '',
        weightClass: {},
        dateOfBirth: null,
        age: 0,
        height: "",
        currentWeight: "",
        location: '',
        weightGoal: '',
        activityLevel: '',
        bmr: 0,
        tdee: 0,
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    },
    setCurrentStep: (step) => set({ currentStep: step}),
    updateFormData: (data) =>
        set((state) => ({
            formData: {...state.formData, ...data}
        })),
}));

export default useRegistrationStore;