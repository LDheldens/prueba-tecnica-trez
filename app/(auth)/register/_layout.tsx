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

  // Altura del status bar
  const statusBarHeight = Constants.statusBarHeight;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Degradado solo en el StatusBar */}
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
            onPress={()=> router.push('/(auth)/login')}
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