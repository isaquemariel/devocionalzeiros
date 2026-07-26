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

// PWA auto-update: enabled on production web + Capacitor webview.
// Local Vite dev and Lovable preview are excluded to avoid stale SW/cache blank screens.
const isLocalDev = window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1';
const isLovablePreview = window.location.hostname.startsWith('id-preview--') &&
  window.location.hostname.endsWith('.lovable.app');

if ('serviceWorker' in navigator && isLovablePreview) {
  navigator.serviceWorker.getRegistrations()
    .then(registrations => Promise.all(registrations.map(reg => reg.unregister())))
    .catch(() => undefined);
  if ('caches' in window) {
    caches.keys()
      .then(keys => Promise.all(keys.map(key => caches.delete(key))))
      .catch(() => undefined);
  }
}

if ('serviceWorker' in navigator && !isLocalDev && !isLovablePreview) {
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
