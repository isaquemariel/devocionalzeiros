import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// Identificador único deste build — vira o "farol de versão": o app compara o
// seu build embutido com /version.json (rede, sem cache) e força a atualização
// quando o servidor tem uma versão mais nova. Independe do service worker.
const BUILD_ID = String(Date.now());

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  define: {
    // VAPID public key is safe to expose in frontend code
    'import.meta.env.VITE_VAPID_PUBLIC_KEY': JSON.stringify(
      process.env.VITE_VAPID_PUBLIC_KEY ?? 'BK0dRcSm_UQuXAdh0Yp96Eq0-64wb0I8YixrV75QZ2xKMm2PFLzOCFf3xZLLazLlLzZTmJRCsCAPxaaMFP_Se3o'
    ),
    __APP_BUILD__: JSON.stringify(BUILD_ID),
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/react-router-dom/')) {
            return 'vendor';
          }
          if (id.includes('node_modules/framer-motion/')) return 'motion';
          if (id.includes('node_modules/@tanstack/')) return 'query';
          if (id.includes('node_modules/@supabase/')) return 'supabase';
          if (id.includes('node_modules/@radix-ui/')) return 'radix';
          if (id.includes('node_modules/lucide-react/')) return 'icons';
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // gera dist/version.json com o id deste build (lido pelo farol de versão;
    // fica FORA do pré-cache do SW — sempre vem da rede)
    {
      name: "emit-version-json",
      apply: "build" as const,
      generateBundle() {
        this.emitFile({ type: "asset", fileName: "version.json", source: JSON.stringify({ build: BUILD_ID }) });
      },
    },
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon-180x180.png", "pwa-192x192.png", "pwa-512x512.png", "pwa-maskable-512x512.png"],
      manifest: {
        name: "Devocionalzeiros",
        short_name: "Devocionalzeiros",
        lang: "pt-BR",
        description: "App de Leitura Bíblica com Gamificação - Saia da estatística dos 70% que nunca leram a Bíblia toda",
        theme_color: "#1a1a2e",
        background_color: "#1a1a2e",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/home",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        // Pré-cache SÓ o esqueleto do app (JS/CSS/HTML/fonte). Imagens, SVGs e os
        // JSONs da Bíblia ficam em cache sob demanda (runtimeCaching abaixo), o que
        // deixa a instalação do service worker pequena e confiável — evita instalações
        // de dezenas de MB que travam em rede móvel e atrasam as atualizações, e reduz
        // muito o despejo de armazenamento pelo SO (que apagava a sessão do usuário).
        globPatterns: ["**/*.{js,css,html,woff2,ico}"],
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
        // A casca (index.html) é servida do pré-cache — sempre um conjunto consistente
        // de HTML + chunks, então nunca sobra um index.html velho apontando para um JS
        // que já foi removido (era isso que dava tela branca / "app desligado"). A
        // versão nova chega pela troca atômica do SW (checagem a cada 15s no main.tsx).
        navigateFallback: "index.html",
        navigateFallbackDenylist: [/^\/api/, /^\/~oauth/],
        skipWaiting: true,
        clientsClaim: true,
        importScripts: ["/sw-push.js"],
        cleanupOutdatedCaches: true,
        navigationPreload: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts-cache",
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "images-cache",
              expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 7 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /\.(?:mp4|webm)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "video-cache",
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 7 },
              cacheableResponse: { statuses: [0, 200] },
              rangeRequests: true,
            },
          },
          {
            urlPattern: /\/bible\/.*\.json$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "bible-offline-cache",
              expiration: { maxEntries: 4, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/.*supabase\.co\/.*/i,
            handler: "NetworkOnly",
          },
          {
            urlPattern: /^https:\/\/.*myshopify\.com\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "shopify-api-cache",
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 2 },
              cacheableResponse: { statuses: [0, 200] },
              networkTimeoutSeconds: 8,
            },
          },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
