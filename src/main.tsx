import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Preload critical assets immediately
import { preloadImagesInBackground } from "./hooks/useImagePreloader";

// Critical images for landing page
const criticalImages = [
  "/src/assets/logo-white.png",
];

// Start preloading immediately
preloadImagesInBackground(criticalImages);

// PWA auto-update: enabled on all non-local hosts (production web + Capacitor webview).
// Local vite dev is excluded to avoid reload loops.
const isLocalDev = window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1';

if ('serviceWorker' in navigator && !isLocalDev) {
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

  // Check more frequently: every 15s
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') checkForUpdates();
  });
  setInterval(checkForUpdates, 15 * 1000);

  // Also check on page navigation/focus
  window.addEventListener('focus', checkForUpdates);
  window.addEventListener('online', checkForUpdates);
  window.addEventListener('pageshow', checkForUpdates);

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
