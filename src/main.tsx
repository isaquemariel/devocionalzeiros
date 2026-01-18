import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Preload critical assets immediately
import { preloadImagesInBackground } from "./hooks/useImagePreloader";

// Critical images for landing page
const criticalImages = [
  "/src/assets/logo-white.png",
  "/src/assets/logo-header.png",
];

// Start preloading immediately
preloadImagesInBackground(criticalImages);

createRoot(document.getElementById("root")!).render(<App />);
