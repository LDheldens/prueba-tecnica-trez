import { Button } from '@/components/ui/Button';

import { ThemedText } from '@/components/common/themed-text';
import { useAuthStore } from '@/store/slices/authSlice';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {

  const router = useRouter();
  const {logout} = useAuthStore();

  return (
    <SafeAreaView>
      <ThemedText>Text</ThemedText>
      <Button title='Logout' onPress={logout} >

      </Button>
    </SafeAreaView>
  );
}

