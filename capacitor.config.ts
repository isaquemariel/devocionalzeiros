import type { CapacitorConfig } from '@capacitor/cli';

// Alternância automática entre dev (sandbox Lovable com hot-reload) e produção (domínio publicado).
// Defina CAP_ENV=dev no shell antes de `npx cap sync` para usar o sandbox.
// Por padrão (CAP_ENV ausente ou !== 'dev'), aponta para produção — evita app nativo travar em sandbox.
const isDev = process.env.CAP_ENV === 'dev';

const DEV_URL = 'https://47f659eb-c9de-44fc-a5b8-a2b28fcc8773.lovableproject.com?forceHideBadge=true';
const PROD_URL = process.env.CAP_PROD_URL ?? 'https://devocionalzeiros.com.br';

const serverUrl = isDev ? DEV_URL : PROD_URL;

const config: CapacitorConfig = {
  appId: 'com.clubehd.app',
  appName: 'devocionalzeiros',
  webDir: 'dist',
  server: {
    url: serverUrl,
    cleartext: true,
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
};

// Log útil ao rodar `npx cap sync` para confirmar qual ambiente está ativo.
// eslint-disable-next-line no-console
console.log(`[capacitor] ${isDev ? 'DEV (sandbox)' : 'PROD'} → ${serverUrl}`);

export default config;
