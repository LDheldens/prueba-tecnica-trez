import { Button } from '@/components/ui/Button';
import { DatePicker } from '@/components/ui/DatePicker';
import { Input } from '@/components/ui/Input';
import { theme } from '@/config/theme';
import { RegisterStep1Data } from '@/features/auth/types/auth.types';
import { validateRegisterStep1 } from '@/features/auth/utils/validation';
import { useRegistrationStore } from '@/store/slices/registrationSlice';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterStep1() {
  const router = useRouter();
  const { step1Data, setStep1Data, nextStep } = useRegistrationStore();

  const [formData, setFormData] = useState<RegisterStep1Data>({
    firstName: step1Data?.firstName || '',
    lastName: step1Data?.lastName || '',
    email: step1Data?.email || '',
    birthDate: step1Data?.birthDate || {
      day: '',
      month: '',
      year: '',
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: keyof RegisterStep1Data, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleDateChange = (field: 'day' | 'month' | 'year', value: string) => {
    setFormData((prev) => ({
      ...prev,
      birthDate: { ...prev.birthDate, [field]: value },
    }));
    if (errors.birthDate) {
      setErrors((prev) => ({ ...prev, birthDate: '' }));
    }
  };

  const handleNext = () => {
    setIsLoading(true);
    
    const validationErrors = validateRegisterStep1(formData);
    
    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {};
      validationErrors.forEach((error) => {
        errorMap[error.field] = error.message;
      });
      setErrors(errorMap);
      setIsLoading(false);
      return;
    }

    setStep1Data(formData);
    nextStep();
    setIsLoading(false);
    router.push('/(auth)/register/register-step2');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >

          <View style={styles.titleSection}>
            <Text style={styles.title}>Información Personal</Text>
            <Text style={styles.subtitle}>
              Cuéntanos un poco sobre ti
            </Text>
          </View>

   
          <View style={styles.form}>
            <Input
              label="Nombres"
              placeholder="Ingresa tus nombres"
              value={formData.firstName}
              onChangeText={(value) => handleChange('firstName', value)}
              error={errors.firstName}
              autoCapitalize="words"
            />

            <Input
              label="Apellidos"
              placeholder="Ingresa tus apellidos"
              value={formData.lastName}
              onChangeText={(value) => handleChange('lastName', value)}
              error={errors.lastName}
              autoCapitalize="words"
            />

            <Input
              label="Correo electrónico"
              placeholder="Ingresa tu correo electrónico"
              value={formData.email}
              onChangeText={(value) => handleChange('email', value)}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <DatePicker
              label="Fecha de nacimiento"
              day={formData.birthDate.day}
              month={formData.birthDate.month}
              year={formData.birthDate.year}
              onDayChange={(value) => handleDateChange('day', value)}
              onMonthChange={(value) => handleDateChange('month', value)}
              onYearChange={(value) => handleDateChange('year', value)}
              error={errors.birthDate}
            />

            <Button
              title="Siguiente"
              onPress={handleNext}
              isLoading={isLoading}
              style={styles.button}
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>¿Ya tienes una cuenta? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                <Text style={styles.footerLink}>Inicia sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  titleSection: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
  },
  form: {
    flex: 1,
  },
  button: {
    marginTop: theme.spacing.lg,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  footerText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
  },
  footerLink: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
  },
});