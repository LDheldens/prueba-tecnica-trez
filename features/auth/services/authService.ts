import { apiClient } from '@/services/api/client';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { formatBirthDate } from '@/utils/herpers';
import { LoginCredentials, LoginResponse, RegisterFormData, RegisterRequest } from '../types/auth.types';

export const authService = {
  
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    return apiClient.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
  },

  register: async (formData: RegisterFormData, acceptedTerms: boolean, acceptedDataPolicy: boolean): Promise<LoginResponse> => {
    const registerData: RegisterRequest = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      // email: formData.email,
      birthDate: formatBirthDate(
        formData.birthDate.day,
        formData.birthDate.month,
        formData.birthDate.year
      ),
      username: formData.username,
      // documentType: formData.documentType,
      // documentNumber: formData.documentNumber,
      password: formData.password,
      // favoriteTeamId: formData.favoriteTeamId,
      // acceptedTerms,
      // acceptedDataPolicy,
    };
    
    return apiClient.post<LoginResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      registerData
    );
  },

  logout: async (token: string): Promise<void> => {
    return apiClient.post<void>(API_ENDPOINTS.AUTH.LOGOUT, {}, token);
  },
};
