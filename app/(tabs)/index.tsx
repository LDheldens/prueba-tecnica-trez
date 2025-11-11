import { Button } from '@/components/ui/Button';

import { ThemedText } from '@/components/common/themed-text';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {

  const router = useRouter();

  return (
    <SafeAreaView>
      <ThemedText>Text</ThemedText>
      <Button title='Ir a Login' onPress={() => router.push('/(auth)/login')} >

      </Button>
    </SafeAreaView>
  );
}

