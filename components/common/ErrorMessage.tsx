import { theme } from '@/config/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ErrorMessageProps {
  message: string;
  style?: any;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, style }) => {
  if (!message) return null;

  return (
    <View style={[styles.container, style]}>
      <Ionicons name="alert-circle" size={20} color={theme.colors.error} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 82, 82, 0.1)',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.error,
  },
  text: {
    color: theme.colors.error,
    fontSize: theme.fontSize.sm,
    marginLeft: theme.spacing.sm,
    flex: 1,
  },
});