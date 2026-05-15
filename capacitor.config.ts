import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.47f659ebc9de44fca5b8a2b28fcc8773',
  appName: 'devocionalzeiros',
  webDir: 'dist',
  server: {
    url: 'https://devocionalzeiros.com.br',
    cleartext: true,
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
};

export default config;
