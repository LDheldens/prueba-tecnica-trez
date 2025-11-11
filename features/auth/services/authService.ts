import { apiClient } from '@/services/api/client';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { LoginCredentials, LoginResponse, RegisterFormData, RegisterRequest } from '../types/auth.types';

export const authService = {
  
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      {
        username: credentials.email,
        password: credentials.password,
      }
    );
    
    console.log('Login response:', response); 
    return response;
  },

  register: async (
    formData: RegisterFormData,
    acceptedTerms: boolean,
    acceptedDataPolicy: boolean
  ): Promise<LoginResponse> => {

    const registerData: RegisterRequest = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      // birthDate: formatBirthDate(
      //   formData.birthDate.day,
      //   formData.birthDate.month,
      //   formData.birthDate.year
      // ),
      username: formData.username,
      password: formData.password,
      // favoriteTeamId: formData.favoriteTeamId,
      // acceptedTerms,
      // acceptedDataPolicy,
    };
    
    const response = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      registerData
    );
    
    console.log('Register response:', response); 
    return response;
  },

  logout: async (token: string): Promise<void> => {
    return apiClient.post<void>(API_ENDPOINTS.AUTH.LOGOUT, {}, token);
  },
};
