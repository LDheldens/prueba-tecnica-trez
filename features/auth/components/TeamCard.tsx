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
    <View style={{maxWidth: 100,marginHorizontal:'auto'}}>
      <TouchableOpacity
        style={[styles.container, isSelected && styles.containerSelected]}
        onPress={onSelect}
        activeOpacity={0.7}
      >
        {isSelected && (
            <View style={styles.checkContainer}>
              <Ionicons name="checkmark-circle" size={24} color={theme.colors.primary} />
            </View>
          )}
        <View style={styles.imageContainer}>
          <Image source={team.image} style={styles.image} resizeMode="contain" />
          
        </View>
        
      </TouchableOpacity>
      <Text style={styles.name} numberOfLines={2}>
          {team.name}
        </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12, 
    padding: theme.spacing.md,
    borderTopLeftRadius: 20, 
    borderBottomLeftRadius: 6,
    borderTopRightRadius:6, 
    borderBottomRightRadius: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    maxWidth: 100, 
    position: 'relative',
    // margin: 4, 
  },
  containerSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: 'rgba(233, 30, 99, 0.1)',
  },
  imageContainer: {
    width: 60,
    height: 60,
    marginBottom: theme.spacing.sm,
    
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%', 
    height: '80%',
    maxWidth: 50, 
    maxHeight: 50,
  },
  checkContainer: {
    position: 'absolute',
    top: -13,
    right: -13,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.full,
  },
  name: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 4,
  },
});