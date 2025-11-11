export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

export interface AuthState {
  user: LoginResponse['user'] | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}


// types para el formulario de registro
export interface RegisterStep1Data {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: {
    day: string;
    month: string;
    year: string;
  };
}

export interface RegisterStep2Data {
  username: string;
  documentType: 'DNI' | 'RUC';
  documentNumber: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterStep3Data {
  favoriteTeamId: number;
}

export interface RegisterFormData extends RegisterStep1Data, RegisterStep2Data, RegisterStep3Data {}

export interface Team {
  id: number;
  name: string;
  image: string | any;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email?: string;
  birthDate?: string; 
  username: string;
  documentType?: string;
  documentNumber?: string;
  password: string;
  favoriteTeamId?: number;
  acceptedTerms?: boolean;
  acceptedDataPolicy?: boolean;
}
