import { apiClient } from '@/services/api/client';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { LoginCredentials, LoginResponse } from '../types/auth.types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    return apiClient.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
  },

  // Para futuras implementaciones
  register: async (data: any): Promise<LoginResponse> => {
    return apiClient.post<LoginResponse>(API_ENDPOINTS.AUTH.REGISTER, data);
  },

  logout: async (token: string): Promise<void> => {
    return apiClient.post<void>(API_ENDPOINTS.AUTH.LOGOUT, {}, token);
  },
};
