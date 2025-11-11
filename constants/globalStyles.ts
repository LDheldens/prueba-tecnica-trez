import { theme } from "@/config/theme";
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  headerForms: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  logo: {
    fontSize: theme.fontSize.xl,
    fontWeight: '700',
    color: theme.colors.text,
  },
  
});