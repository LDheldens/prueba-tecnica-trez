import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { theme } from '@/config/theme';
import { PasswordStrengthIndicator } from '@/features/auth/components/PasswordStrengthIndicator';
import { RegisterStep2Data } from '@/features/auth/types/auth.types';
import { validateRegisterStep2 } from '@/features/auth/utils/validation';
import { useRegistrationStore } from '@/store/slices/registrationSlice';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterStep2() {
  const router = useRouter();
  const {
    step2Data,
    setStep2Data,
    nextStep,
    previousStep,
    acceptedTerms,
    acceptedDataPolicy,
    setAcceptedTerms,
    setAcceptedDataPolicy,
  } = useRegistrationStore();

  const [formData, setFormData] = useState<RegisterStep2Data>({
    username: step2Data?.username || '',
    documentType: step2Data?.documentType || 'DNI',
    documentNumber: step2Data?.documentNumber || '',
    password: step2Data?.password || '',
    confirmPassword: step2Data?.confirmPassword || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [declaration, setDeclaration] = useState(false);

  const handleChange = (field: keyof RegisterStep2Data, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleNext = () => {
    setIsLoading(true);

    if (!declaration || !acceptedTerms || !acceptedDataPolicy) {
      setErrors({ general: 'Debes aceptar todos los términos y condiciones' });
      setIsLoading(false);
      return;
    }

    const validationErrors = validateRegisterStep2(formData);

    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {};
      validationErrors.forEach((error) => {
        errorMap[error.field] = error.message;
      });
      setErrors(errorMap);
      setIsLoading(false);
      return;
    }

    setStep2Data(formData);
    nextStep();
    setIsLoading(false);
    router.push('/(auth)/register/register-step3');
  };

  const handleBack = () => {
    setStep2Data(formData);
    previousStep();
    router.back();
  };

  const documentTypeOptions = [
    { label: 'DNI', value: 'DNI' },
    { label: 'RUC', value: 'RUC' },
  ];

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
          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Crea tu cuenta</Text>
            <Text style={styles.subtitle}>
              Configura tus credenciales de acceso
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="Username"
              placeholder="Crea tu username"
              value={formData.username}
              onChangeText={(value) => handleChange('username', value)}
              error={errors.username}
              autoCapitalize="none"
            />

            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <Select
                  label="Documento de identidad"
                  value={formData.documentType}
                  options={documentTypeOptions}
                  onSelect={(value) => handleChange('documentType', value as 'DNI' | 'RUC')}
                />
              </View>
              <View style={styles.halfWidth}>
                <Input
                  placeholder={formData.documentType === 'DNI' ? '000 000 000 0' : '00000000000'}
                  value={formData.documentNumber}
                  onChangeText={(value) => handleChange('documentNumber', value)}
                  error={errors.documentNumber}
                  keyboardType="numeric"
                  maxLength={formData.documentType === 'DNI' ? 8 : 11}
                />
              </View>
            </View>

            <Input
              label="Contraseña"
              placeholder="Crea una contraseña"
              value={formData.password}
              onChangeText={(value) => handleChange('password', value)}
              error={errors.password}
              secureTextEntry={!showPassword}
              rightIcon={showPassword ? 'eye-off' : 'eye'}
              onRightIconPress={() => setShowPassword(!showPassword)}
              autoCapitalize="none"
            />

            <PasswordStrengthIndicator password={formData.password} />

            <Input
              label="Confirmar Contraseña"
              placeholder="Confirma tu contraseña"
              value={formData.confirmPassword}
              onChangeText={(value) => handleChange('confirmPassword', value)}
              error={errors.confirmPassword}
              secureTextEntry={!showConfirmPassword}
              rightIcon={showConfirmPassword ? 'eye-off' : 'eye'}
              onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
              autoCapitalize="none"
            />

            <View style={styles.checkboxes}>
              <Checkbox checked={declaration} onToggle={() => setDeclaration(!declaration)}>
                <Text style={styles.checkboxText}>Declaración</Text>
              </Checkbox>

              <Checkbox
                checked={acceptedDataPolicy}
                onToggle={() => setAcceptedDataPolicy(!acceptedDataPolicy)}
              >
                <Text style={styles.checkboxText}>
                  Acepto recibir{' '}
                  <Text style={styles.link}>Información y Datos</Text>
                </Text>
              </Checkbox>

              <Checkbox checked={acceptedTerms} onToggle={() => setAcceptedTerms(!acceptedTerms)}>
                <Text style={styles.checkboxText}>
                  Al hacer clic en siguiente acepta los{' '}
                  <Text style={styles.link}>Términos y Condiciones</Text>
                </Text>
              </Checkbox>
            </View>

            {errors.general && <Text style={styles.errorText}>{errors.general}</Text>}

            <View style={styles.buttons}>
              <Button
                title="Volver"
                onPress={handleBack}
                variant="secondary"
                style={styles.halfButton}
              />
              <Button
                title="Siguiente"
                onPress={handleNext}
                isLoading={isLoading}
                style={styles.halfButton}
              />
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
  row: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  halfWidth: {
    flex: 1,
  },
  checkboxes: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  checkboxText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.sm,
    lineHeight: 20,
  },
  link: {
    color: theme.colors.primary,
    textDecorationLine: 'underline',
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.fontSize.sm,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  buttons: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  halfButton: {
    flex: 1,
  },
});