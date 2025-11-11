import { Button } from 'react-native';

import { ThemedText } from '@/components/common/themed-text';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {

  const router = useRouter();

  return (
    <SafeAreaView>
      <ThemedText>Text</ThemedText>
      <Button title="Ir al login" onPress={() => router.push('/(auth)/login')} />
    </SafeAreaView>
  );
}

