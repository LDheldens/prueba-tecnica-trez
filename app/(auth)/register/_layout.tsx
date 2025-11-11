import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { theme } from '@/config/theme';
import { globalStyles } from '@/constants/globalStyles';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, usePathname, useRouter } from 'expo-router';
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';

export default function RegisterLayout() {
  const pathname = usePathname();
  const router = useRouter();
  
  const getCurrentStep = () => {
    if (pathname.includes('register-step1')) return 1;
    if (pathname.includes('register-step2')) return 2;
    if (pathname.includes('register-step3')) return 3;
    return 1;
  };

  const currentStep = getCurrentStep();
  const totalSteps = 3;

  const statusBarHeight = Constants.statusBarHeight;


  const getStepTexts = () => {
    switch (currentStep) {
      case 1:
        return {
          title: '¡Únete ahora!',
          subtitle: 'Regístrate y empieza a jugar',
        };
      case 2:
        return {
          title: 'Crea tu cuenta',
          subtitle: 'Paso 2 de 3: Personaliza tu cuenta',
        };
      case 3:
        return {
          title: 'Crea tu cuenta',
          subtitle: 'Paso 3 de 3: Elige tu equipo favorito',
        };
      default:
        return {
          title: '¡Únete ahora!',
          subtitle: 'Regístrate y empieza a jugar',
        };
    }
  };

  const { title, subtitle } = getStepTexts();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <LinearGradient
        colors={['#E91E63', '#9C27B0', '#673AB7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.statusBarGradient, { height: statusBarHeight }]}
      />
      
      <View style={styles.header}>
        <Text style={globalStyles.logo}>FFANTASY</Text>
        <Button
          title="Iniciar Sesión"
          onPress={() => router.push('/(auth)/login')}
        />
      </View>

      <View style={styles.progressContainer}>
        <Image 
          style={styles.imageBackgroud} 
          source={require('../../../assets/background/background.png')}
        />
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        <ProgressBar steps={totalSteps} currentStep={currentStep} />
        
        <Text style={styles.stepIndicator}>
          Paso {currentStep} de {totalSteps}
        </Text>
      </View>

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { 
            backgroundColor: theme.colors.background,
          },
          animation: 'slide_from_right',
          gestureEnabled: false,
        }}
      >
        <Stack.Screen 
          name="register-step1"
          options={{
            title: 'Paso 1',
          }}
        />
        <Stack.Screen 
          name="register-step2"
          options={{
            title: 'Paso 2',
          }}
        />
        <Stack.Screen 
          name="register-step3"
          options={{
            title: 'Paso 3',
          }}
        />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  statusBarGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  header: {
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    letterSpacing: 2,
  },
  progressContainer: {
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  imageBackgroud: {
    width: '100%',
    height: 180,
  },
  textContainer: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: theme.fontSize.xxl,
    color: theme.colors.text,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  stepIndicator: {
    textAlign: 'center',
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    color: theme.colors.text,
    fontSize: theme.fontSize.sm,
  },
});