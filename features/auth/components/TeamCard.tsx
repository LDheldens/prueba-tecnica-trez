import { theme } from '@/config/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Team } from '../types/auth.types';

interface TeamCardProps {
  team: Team;
  isSelected: boolean;
  onSelect: () => void;
}

export const TeamCard: React.FC<TeamCardProps> = ({ team, isSelected, onSelect }) => {
  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.containerSelected]}
      onPress={onSelect}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: team.image }} style={styles.image} resizeMode="contain" />
        {isSelected && (
          <View style={styles.heartContainer}>
            <Ionicons name="heart" size={20} color={theme.colors.primary} />
          </View>
        )}
      </View>
      <Text style={styles.name} numberOfLines={2}>
        {team.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  containerSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: 'rgba(233, 30, 99, 0.1)',
  },
  imageContainer: {
    width: 60,
    height: 60,
    marginBottom: theme.spacing.sm,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  heartContainer: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.full,
    padding: 4,
  },
  name: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text,
    textAlign: 'center',
    fontWeight: '600',
  },
});