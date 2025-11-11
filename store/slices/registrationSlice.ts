import {
    RegisterFormData,
    RegisterStep1Data,
    RegisterStep2Data,
    RegisterStep3Data,
} from '@/features/auth/types/auth.types';
import { create } from 'zustand';

interface RegistrationState {
  currentStep: 1 | 2 | 3;
  step1Data: RegisterStep1Data | null;
  step2Data: RegisterStep2Data | null;
  step3Data: RegisterStep3Data | null;
  acceptedTerms: boolean;
  acceptedDataPolicy: boolean;
}

interface RegistrationStore extends RegistrationState {
  setStep: (step: 1 | 2 | 3) => void;
  setStep1Data: (data: RegisterStep1Data) => void;
  setStep2Data: (data: RegisterStep2Data) => void;
  setStep3Data: (data: RegisterStep3Data) => void;
  setAcceptedTerms: (accepted: boolean) => void;
  setAcceptedDataPolicy: (accepted: boolean) => void;
  getCompleteFormData: () => RegisterFormData | null;
  resetRegistration: () => void;
  nextStep: () => void;
  previousStep: () => void;
}

const initialState: RegistrationState = {
  currentStep: 1,
  step1Data: null,
  step2Data: null,
  step3Data: null,
  acceptedTerms: false,
  acceptedDataPolicy: false,
};

export const useRegistrationStore = create<RegistrationStore>((set, get) => ({
  ...initialState,

  setStep: (step) => set({ currentStep: step }),

  setStep1Data: (data) => set({ step1Data: data }),

  setStep2Data: (data) => set({ step2Data: data }),

  setStep3Data: (data) => set({ step3Data: data }),

  setAcceptedTerms: (accepted) => set({ acceptedTerms: accepted }),

  setAcceptedDataPolicy: (accepted) => set({ acceptedDataPolicy: accepted }),

  getCompleteFormData: () => {
    const state = get();
    
    if (!state.step1Data || !state.step2Data || !state.step3Data) {
      return null;
    }
    
    return {
      ...state.step1Data,
      ...state.step2Data,
      ...state.step3Data,
    };
  },

  nextStep: () => {
    const currentStep = get().currentStep;
    if (currentStep < 3) {
      set({ currentStep: (currentStep + 1) as 1 | 2 | 3 });
    }
  },

  previousStep: () => {
    const currentStep = get().currentStep;
    if (currentStep > 1) {
      set({ currentStep: (currentStep - 1) as 1 | 2 | 3 });
    }
  },

  resetRegistration: () => set(initialState),
}));
