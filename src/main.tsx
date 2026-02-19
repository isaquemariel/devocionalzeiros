import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Preload critical assets immediately
import { preloadImagesInBackground } from "./hooks/useImagePreloader";

// Critical images for landing page
const criticalImages = [
  "/src/assets/logo-white.png",
  "/src/assets/logo-new.png",
];

// Start preloading immediately
preloadImagesInBackground(criticalImages);

// PWA auto-update: only in production to avoid reload loops in preview/dev
const isProduction = window.location.hostname === 'clubehd.lovable.app';

if ('serviceWorker' in navigator && isProduction) {
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });

  const checkForUpdates = () => {
    navigator.serviceWorker.getRegistration().then(reg => {
      if (reg) reg.update();
    });
  };

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') checkForUpdates();
  });

  setInterval(checkForUpdates, 60 * 1000);

  navigator.serviceWorker.getRegistration().then(reg => {
    if (reg?.waiting) {
      reg.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
    if (reg) {
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              newWorker.postMessage({ type: 'SKIP_WAITING' });
            }
          });
        }
      });
    }
  });
}

createRoot(document.getElementById("root")!).render(<App />);
