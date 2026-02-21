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

  const forceActivateWaiting = (reg: ServiceWorkerRegistration) => {
    if (reg?.waiting) {
      reg.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  };

  const checkForUpdates = () => {
    navigator.serviceWorker.getRegistration().then(reg => {
      if (reg) {
        reg.update();
        forceActivateWaiting(reg);
      }
    });
  };

  // Check more frequently: every 30s
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') checkForUpdates();
  });
  setInterval(checkForUpdates, 30 * 1000);

  // Also check on page navigation/focus
  window.addEventListener('focus', checkForUpdates);
  window.addEventListener('online', checkForUpdates);

  navigator.serviceWorker.getRegistration().then(reg => {
    forceActivateWaiting(reg!);
    if (reg) {
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // Immediately activate - don't wait
              newWorker.postMessage({ type: 'SKIP_WAITING' });
            }
          });
        }
      });
    }
  });

  // Check immediately on load
  checkForUpdates();
}

createRoot(document.getElementById("root")!).render(<App />);
