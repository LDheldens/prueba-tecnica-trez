import { theme } from '@/config/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { validatePasswordStrength } from '../utils/validation';

interface PasswordStrengthIndicatorProps {
  password: string;
}

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  password,
}) => {
  if (!password) return null;

  const { isValid, errors } = validatePasswordStrength(password);
  
  const requirements = [
    { text: 'Al menos 8 caracteres', met: password.length >= 8 },
    { text: 'Al menos 1 número', met: /\d/.test(password) },
    { text: 'Al menos 1 letra minúscula', met: /[a-z]/.test(password) },
    { text: 'Al menos 1 letra mayúscula', met: /[A-Z]/.test(password) },
    { text: 'Al menos 1 carácter especial (!@#$%^&*)', met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Introduce una contraseña. Debe contener:</Text>
      {requirements.map((req, index) => (
        <View key={index} style={styles.requirement}>
          <Ionicons
            name={req.met ? 'checkmark-circle' : 'close-circle'}
            size={16}
            color={req.met ? theme.colors.textSecondary : theme.colors.error}
          />
          <Text style={[styles.requirementText, req.met && styles.requirementMet]}>
            {req.text}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  requirement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  requirementText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.error,
    marginLeft: theme.spacing.xs,
  },
  requirementMet: {
    color: theme.colors.textSecondary,
  },
});