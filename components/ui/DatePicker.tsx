import { theme } from '@/config/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Select } from './Select';

interface DatePickerProps {
  label?: string;
  day: string;
  month: string;
  year: string;
  onDayChange: (day: string) => void;
  onMonthChange: (month: string) => void;
  onYearChange: (year: string) => void;
  error?: string;
}

const generateDays = (): { label: string; value: string }[] => {
  return Array.from({ length: 31 }, (_, i) => ({
    label: String(i + 1).padStart(2, '0'),
    value: String(i + 1),
  }));
};

const generateMonths = (): { label: string; value: string }[] => {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  return months.map((month, i) => ({
    label: month,
    value: String(i + 1),
  }));
};

const generateYears = (): { label: string; value: string }[] => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear; i >= 1900; i--) {
    years.push({ label: String(i), value: String(i) });
  }
  return years;
};

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  day,
  month,
  year,
  onDayChange,
  onMonthChange,
  onYearChange,
  error,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={styles.selectsContainer}>
        <View style={styles.selectWrapper}>
          <Select
            placeholder="DD"
            value={day}
            options={generateDays()}
            onSelect={onDayChange}
          />
        </View>
        
        <View style={styles.selectWrapper}>
          <Select
            placeholder="MM"
            value={month}
            options={generateMonths()}
            onSelect={onMonthChange}
          />
        </View>
        
        <View style={styles.selectWrapper}>
          <Select
            placeholder="AAAA"
            value={year}
            options={generateYears()}
            onSelect={onYearChange}
          />
        </View>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    fontWeight: '500',
  },
  selectsContainer: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  selectWrapper: {
    flex: 1,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.fontSize.xs,
    marginTop: theme.spacing.xs,
    marginLeft: theme.spacing.xs,
  },
});