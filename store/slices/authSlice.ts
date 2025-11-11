import { authService } from '@/features/auth/services/authService';
import { AuthState, LoginCredentials } from '@/features/auth/types/auth.types';
import { ApiError } from '@/types/api.types';
import { create } from 'zustand';

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await authService.login(credentials);
      
      set({
        user: response.user,
        token: response.access_token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      
      // Aquí podrías guardar el token en AsyncStorage/SecureStore
      // await secureStorage.setToken(response.access_token);
      
    } catch (error) {
      const apiError = error as ApiError;
      set({
        error: apiError.message || 'Error al iniciar sesión',
        isLoading: false,
        isAuthenticated: false,
      });
      throw error;
    }
  },

  logout: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },

  clearError: () => set({ error: null }),
  
  setLoading: (isLoading: boolean) => set({ isLoading }),
}));