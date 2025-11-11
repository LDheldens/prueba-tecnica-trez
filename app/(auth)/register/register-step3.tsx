import { Button } from '@/components/ui/Button';
import { theme } from '@/config/theme';
import { TeamCard } from '@/features/auth/components/TeamCard';
import { TEAMS } from '@/features/auth/data/teams';
import { authService } from '@/features/auth/services/authService';
import { Team } from '@/features/auth/types/auth.types';
import { useRegistrationStore } from '@/store/slices/registrationSlice';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterStep3() {
  const router = useRouter();
  const {
    step3Data,
    setStep3Data,
    previousStep,
    getCompleteFormData,
    resetRegistration,
    acceptedTerms,
    acceptedDataPolicy,
  } = useRegistrationStore();

  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(
    step3Data?.favoriteTeamId || null
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleTeamSelect = (teamId: number) => {
    setSelectedTeamId(teamId);
  };

  const handleBack = () => {
    if (selectedTeamId) {
      setStep3Data({ favoriteTeamId: selectedTeamId });
    }
    previousStep();
    router.back();
  };

  const handleConfirm = async () => {
    if (!selectedTeamId) {
      Alert.alert('Error', 'Por favor selecciona tu equipo favorito');
      return;
    }

    setIsLoading(true);

    try {
      setStep3Data({ favoriteTeamId: selectedTeamId });

      const completeData = getCompleteFormData();

      if (!completeData) {
        Alert.alert('Error', 'Datos del formulario incompletos');
        setIsLoading(false);
        return;
      }

      const response = await authService.register(
        completeData,
        acceptedTerms,
        acceptedDataPolicy
      );

      // Descomentar cuando tengas el store de auth listo
      // setUser(response.user);
      // setToken(response.token);

      resetRegistration();

      Alert.alert('¡Registro exitoso!', 'Bienvenido a FFANTASY', [
        {
          text: 'Continuar',
          onPress: () => router.replace('/(tabs)'),
        },
      ]);
    } catch (error: any) {
      Alert.alert(
        'Error al registrar',
        error.message || 'Ocurrió un error durante el registro. Intenta nuevamente.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderTeam = ({ item }: { item: Team }) => (
    <TeamCard
      team={item}
      isSelected={item.id === selectedTeamId}
      onSelect={() => handleTeamSelect(item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={styles.container}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Elige tu equipo</Text>
          <Text style={styles.subtitle}>
            Selecciona tu equipo favorito de fútbol
          </Text>
        </View>

        {/* Teams Grid */}
        <FlatList
          data={TEAMS}
        
          renderItem={renderTeam}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          style={styles.list}
        />

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <View style={styles.buttons}>
            <Button
              title="Volver"
              onPress={handleBack}
              variant="secondary"
              style={styles.halfButton}
              disabled={isLoading}
            />
            <Button
              title="Confirmar"
              onPress={handleConfirm}
              isLoading={isLoading}
              style={styles.halfButton}
              disabled={!selectedTeamId}
            />
          </View>
        </View>
      </View>
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
  list: {
    flex: 1,
    padding:10
  },
  listContent: {
    paddingBottom: theme.spacing.md,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  buttonsContainer: {
    paddingVertical: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border || 'rgba(255,255,255,0.1)',
  },
  buttons: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  halfButton: {
    flex: 1,
  },
});