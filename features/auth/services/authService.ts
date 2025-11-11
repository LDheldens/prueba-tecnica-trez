import { apiClient } from '@/services/api/client';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { LoginCredentials, LoginResponse, RegisterFormData, RegisterRequest } from '../types/auth.types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await apiClient.post<LoginResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        {
          username: credentials.email,
          password: credentials.password,
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  register: async (
    formData: RegisterFormData,
    acceptedTerms: boolean,
    acceptedDataPolicy: boolean
  ): Promise<LoginResponse> => {
    try {
      const registerData: RegisterRequest = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        password: formData.password,
      };

      const response = await apiClient.post<LoginResponse>(
        API_ENDPOINTS.AUTH.REGISTER,
        registerData
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  logout: async (token: string): Promise<void> => {
    try {
      return await apiClient.post<void>(API_ENDPOINTS.AUTH.LOGOUT, {}, token);
    } catch (error) {
      throw error;
    }
  },
};
