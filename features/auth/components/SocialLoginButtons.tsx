import { theme } from '@/config/theme';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const SocialLoginButtons: React.FC = () => {
  const handleGoogleLogin = () => {
    // Implementar lógica de Google OAuth
    console.log('Google Login');
  };

  const handleFacebookLogin = () => {
    // Implementar lógica de Facebook OAuth
    console.log('Facebook Login');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
        <Image
          source={{ uri: 'https://www.google.com/favicon.ico' }}
          style={styles.icon}
        />
        <Text style={styles.socialText}>Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.socialButton, styles.facebookButton]}
        onPress={handleFacebookLogin}
      >
        <Image
          source={{ uri: 'https://www.facebook.com/favicon.ico' }}
          style={styles.icon}
        />
        <Text style={styles.socialText}>Facebook</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginVertical: theme.spacing.lg,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.sm,
  },
  facebookButton: {
    backgroundColor: '#1877F2',
  },
  icon: {
    width: 20,
    height: 20,
  },
  socialText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.md,
    fontWeight: '600',
  },
});