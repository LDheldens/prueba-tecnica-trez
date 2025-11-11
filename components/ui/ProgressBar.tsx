import { theme } from '@/config/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ProgressBarProps {
  steps: number;
  currentStep: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStep }) => {
  const progress = (currentStep / steps) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <View style={[styles.progress, { width: `${progress}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.md,
  },
  background: {
    height: 4,
    backgroundColor: theme.colors.border,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: theme.colors.success,
    borderRadius: theme.borderRadius.full,
  },
});
