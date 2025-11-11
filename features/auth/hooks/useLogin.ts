import { useAuthStore } from '@/store/slices/authSlice';
import { useState } from 'react';
import { LoginCredentials } from '../types/auth.types';
import { validateLoginForm, ValidationError } from '../utils/validation';

export const useLogin = () => {
  const { login, isLoading, error, clearError } = useAuthStore();
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

  const handleLogin = async (credentials: LoginCredentials) => {
   
    clearError();
    setValidationErrors([]);

    
    const errors = validateLoginForm(credentials.username, credentials.password);
    
    if (errors.length > 0) {
      setValidationErrors(errors);
      return { success: false, errors };
    }

    try {
      await login(credentials);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const getFieldError = (fieldName: string): string | undefined => {
    return validationErrors.find(e => e.field === fieldName)?.message;
  };

  const clearValidationErrors = () => {
    setValidationErrors([]);
  };

  return {
    handleLogin,
    isLoading,
    error,
    validationErrors,
    getFieldError,
    clearValidationErrors,
  };
};