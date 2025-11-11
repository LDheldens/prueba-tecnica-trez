import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { theme } from '@/config/theme';
import { globalStyles } from '@/constants/globalStyles';
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

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      <View style={styles.header}>
        <Text style={globalStyles.logo}>FFANTASY</Text>
        <Button
            title="Iniciar Sesión"
            onPress={()=> router.push('/(auth)/login')}
            // isLoading={isLoading}
        />
      </View>

      

      <View style={styles.progressContainer}>
        <Image style={styles.imageBackgroud} source={require('../../../assets/background/background.png')}/>

        <ProgressBar steps={totalSteps} currentStep={currentStep} />
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
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
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
  imageBackgroud:{
    width: '100%',
    height: 180,
  }
});