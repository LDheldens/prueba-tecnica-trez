import { Button, StyleSheet } from 'react-native';

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

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
