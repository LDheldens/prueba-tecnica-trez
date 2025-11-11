export interface ValidationError {
  field: string;
  message: string;
}

export const validateEmail = (email: string): string | null => {
  if (!email.trim()) {
    return 'El correo electrónico es requerido';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Por favor ingresa un correo electrónico válido';
  }
  
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password.trim()) {
    return 'La contraseña es requerida';
  }
  
  if (password.length < 6) {
    return 'La contraseña debe tener al menos 6 caracteres';
  }
  
  return null;
};

export const validateLoginForm = (
  email: string,
  password: string
): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  const emailError = validateEmail(email);
  if (emailError) {
    errors.push({ field: 'email', message: emailError });
  }
  
  const passwordError = validatePassword(password);
  if (passwordError) {
    errors.push({ field: 'password', message: passwordError });
  }
  
  return errors;
};