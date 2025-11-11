import { RegisterStep1Data, RegisterStep2Data } from "../types/auth.types";

export interface ValidationError {
  field: string;
  message: string;
}

export const validateEmail = (email: string): string | null => {
  if (!email.trim()) {
    return 'El correo electrónico es requerido';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // if (!emailRegex.test(email)) {
  //   return 'Por favor ingresa un correo electrónico válido';
  // }
  
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



// Validaciones para el formulario de registro
export const validateName = (name: string, fieldName: string): string | null => {
  if (!name.trim()) {
    return `${fieldName} es requerido`;
  }
  
  if (name.trim().length < 2) {
    return `${fieldName} debe tener al menos 2 caracteres`;
  }
  
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  if (!nameRegex.test(name)) {
    return `${fieldName} solo puede contener letras`;
  }
  
  return null;
};

export const validateBirthDate = (day: string, month: string, year: string): string | null => {
  if (!day || !month || !year) {
    return 'La fecha de nacimiento es requerida';
  }
  
  const dayNum = parseInt(day);
  const monthNum = parseInt(month);
  const yearNum = parseInt(year);
  
  if (dayNum < 1 || dayNum > 31) {
    return 'Día inválido';
  }
  
  if (monthNum < 1 || monthNum > 12) {
    return 'Mes inválido';
  }
  
  const currentYear = new Date().getFullYear();
  if (yearNum < 1900 || yearNum > currentYear) {
    return 'Año inválido';
  }
  
  // Validar que sea mayor de 18 años
  const birthDate = new Date(yearNum, monthNum - 1, dayNum);
  const age = currentYear - yearNum;
  
  if (age < 18) {
    return 'Debes ser mayor de 18 años';
  }
  
  return null;
};

export const validateUsername = (username: string): string | null => {
  if (!username.trim()) {
    return 'El nombre de usuario es requerido';
  }
  
  if (username.length < 4) {
    return 'El nombre de usuario debe tener al menos 4 caracteres';
  }
  
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(username)) {
    return 'El nombre de usuario solo puede contener letras, números y guiones bajos';
  }
  
  return null;
};

export const validateDocumentNumber = (
  documentNumber: string,
  documentType: 'DNI' | 'RUC'
): string | null => {
  if (!documentNumber.trim()) {
    return 'El número de documento es requerido';
  }
  
  if (documentType === 'DNI') {
    if (documentNumber.length !== 8) {
      return 'El DNI debe tener 8 dígitos';
    }
  } else if (documentType === 'RUC') {
    if (documentNumber.length !== 11) {
      return 'El RUC debe tener 11 dígitos';
    }
  }
  
  if (!/^\d+$/.test(documentNumber)) {
    return 'El documento solo puede contener números';
  }
  
  return null;
};

export const validatePasswordStrength = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Al menos 8 caracteres');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Al menos 1 número');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Al menos 1 letra minúscula');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Al menos 1 letra mayúscula');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Al menos 1 carácter especial (!@#$%^&*)');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | null => {
  if (!confirmPassword) {
    return 'Confirma tu contraseña';
  }
  
  if (password !== confirmPassword) {
    return 'Las contraseñas no coinciden';
  }
  
  return null;
};

export const validateRegisterStep1 = (data: RegisterStep1Data): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  const firstNameError = validateName(data.firstName, 'El nombre');
  if (firstNameError) errors.push({ field: 'firstName', message: firstNameError });
  
  const lastNameError = validateName(data.lastName, 'El apellido');
  if (lastNameError) errors.push({ field: 'lastName', message: lastNameError });
  
  const emailError = validateEmail(data.email);
  if (emailError) errors.push({ field: 'email', message: emailError });
  
  const birthDateError = validateBirthDate(
    data.birthDate.day,
    data.birthDate.month,
    data.birthDate.year
  );
  if (birthDateError) errors.push({ field: 'birthDate', message: birthDateError });
  
  return errors;
};

export const validateRegisterStep2 = (data: RegisterStep2Data): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  const usernameError = validateUsername(data.username);
  if (usernameError) errors.push({ field: 'username', message: usernameError });
  
  const documentError = validateDocumentNumber(data.documentNumber, data.documentType);
  if (documentError) errors.push({ field: 'documentNumber', message: documentError });
  
  const passwordValidation = validatePasswordStrength(data.password);
  if (!passwordValidation.isValid) {
    errors.push({ field: 'password', message: 'La contraseña no cumple los requisitos' });
  }
  
  const confirmPasswordError = validateConfirmPassword(data.password, data.confirmPassword);
  if (confirmPasswordError) {
    errors.push({ field: 'confirmPassword', message: confirmPasswordError });
  }
  
  return errors;
};