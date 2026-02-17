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

// Robust PWA auto-update: detect new versions and reload cleanly
if ('serviceWorker' in navigator) {
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });

  // Periodically check for updates (every 60s when tab is visible)
  const checkForUpdates = () => {
    navigator.serviceWorker.getRegistration().then(reg => {
      if (reg) reg.update();
    });
  };
  
  // Check on visibility change (user returns to tab)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') checkForUpdates();
  });

  // Check periodically
  setInterval(checkForUpdates, 60 * 1000);

  // On page load, if there's a waiting SW, activate it immediately
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
              // New version available — activate immediately
              newWorker.postMessage({ type: 'SKIP_WAITING' });
            }
          });
        }
      });
    }
  });
}

createRoot(document.getElementById("root")!).render(<App />);
