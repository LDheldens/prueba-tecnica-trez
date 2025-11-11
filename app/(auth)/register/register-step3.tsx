import { Button } from '@/components/ui/Button';
import { theme } from '@/config/theme';
import { TeamCard } from '@/features/auth/components/TeamCard';
import { TEAMS } from '@/features/auth/data/teams';
import { authService } from '@/features/auth/services/authService';
import { Team } from '@/features/auth/types/auth.types';
import { useRegistrationStore } from '@/store/slices/registrationSlice';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';

export const RegisterStep3Screen: React.FC = () => {
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

  // const { setUser, setToken } = useAuthStore();

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
      // Save team selection
      setStep3Data({ favoriteTeamId: selectedTeamId });

      // Get complete form data
      const completeData = getCompleteFormData();

      if (!completeData) {
        Alert.alert('Error', 'Datos del formulario incompletos');
        setIsLoading(false);
        return;
      }

      // Call register API
      const response = await authService.register(
        completeData,
        acceptedTerms,
        acceptedDataPolicy
      );

      // Save user data and token
      // setUser(response.user);
      // setToken(response.token);

      // Reset registration state
      resetRegistration();

      // Navigate to home
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
    <View style={styles.container}>
        <FlatList
          data={TEAMS}
          renderItem={renderTeam}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: theme.spacing.xl,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  buttons: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  halfButton: {
    flex: 1,
  },
});