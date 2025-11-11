import { ErrorMessage } from '@/components/common/ErrorMessage';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { theme } from '@/config/theme';
import { globalStyles } from '@/constants/globalStyles';
import { SocialLoginButtons } from '@/features/auth/components/SocialLoginButtons';
import { useLogin } from '@/features/auth/hooks/useLogin';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const { handleLogin, isLoading, error, getFieldError } = useLogin();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async () => {
    const result = await handleLogin({ email, password });
    
    if (result.success) {
      router.replace('/');
    }
  };

  const navigateToRegister = () => {
    router.push('/(auth)/register/register-step1');
  };

  const navigateToForgotPassword = () => {
    console.log('Forgot password');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        <View style={globalStyles.headerForms}>
            <Text style={globalStyles.logo}>FFANTASY</Text>
            <Button
                title="Crear Cuenta"
                onPress={navigateToRegister}
                // isLoading={isLoading}
            />
        </View>


        <View style={styles.heroSection}>
          <Image
            source={require('../../assets/background/background.png')}
            style={styles.heroImage}
          />
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.title}>¡Hey, ya estás aquí!</Text>
          <Text style={styles.subtitle}>Conéctate y arma tu liga ganadora</Text>
        </View>

       
        <SocialLoginButtons />

        
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>O</Text>
          <View style={styles.dividerLine} />
        </View>

        
        {error && <ErrorMessage message={error} />}

        
        <View style={styles.form}>
          <Input
            label="Username o Correo electrónico"
            placeholder="Username o correo electrónico"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            error={getFieldError('email')}
          />

          <Input
            label="Contraseña"
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            isPassword
            error={getFieldError('password')}
          />

          <TouchableOpacity onPress={navigateToForgotPassword}>
            <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>

        
        <Button
          title="Iniciar Sesión"
          onPress={onLogin}
          isLoading={isLoading}
          fullWidth
          style={styles.loginButton}
        />

        
        <View style={styles.registerSection}>
          <Text style={styles.registerText}>¿Primera vez por aquí? </Text>
          <TouchableOpacity onPress={navigateToRegister}>
            <Text style={styles.registerLink}>Crea una cuenta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: theme.spacing.lg,
    marginTop:theme.spacing.lg
  },
  
  createAccountButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  createAccountText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
  },
  heroSection: {
    position: 'relative',
    height: 200,
    marginBottom: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    borderRadius: theme.borderRadius.lg,
  },
  logoOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -25 }],
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  logoOverlayText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.xl,
    fontWeight: 'bold',
  },
  titleSection: {
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: theme.fontSize.xxl,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
  },
  dividerText: {
    color: theme.colors.textSecondary,
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.fontSize.sm,
  },
  form: {
    marginBottom: theme.spacing.lg,
  },
  forgotPassword: {
    color: theme.colors.text,
    fontSize: theme.fontSize.sm,
    textAlign: 'right',
    marginTop: theme.spacing.sm,
  },
  loginButton: {
    marginBottom: theme.spacing.lg,
  },
  registerSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
  },
  registerLink: {
    color: theme.colors.text,
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
  },
});