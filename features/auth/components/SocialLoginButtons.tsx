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
        style={[styles.socialButton]}
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
    backgroundColor: '#1A1A1A',
    paddingVertical: 16,
    borderTopLeftRadius: 16, 
    borderBottomLeftRadius: 6,
    borderTopRightRadius:6, 
    borderBottomRightRadius: 16,
    gap: theme.spacing.sm,
    borderWidth: 1,
    borderColor: '#333333',
  },
  facebookButton: {
    backgroundColor: '#1877F2',
    borderColor: '#1877F2',
  },
  icon: {
    width: 24,
    height: 24,
  },
  socialText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});