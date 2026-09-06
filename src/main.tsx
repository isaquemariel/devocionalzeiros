import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initAutoUpdate } from "./lib/appUpdate";

// Preload critical assets immediately
import { preloadImagesInBackground } from "./hooks/useImagePreloader";

// Critical images for landing page
const criticalImages = [
  "/src/assets/logo-white.png",
];

// Start preloading immediately
preloadImagesInBackground(criticalImages);

// Armazenamento persistente: pede ao SO para NÃO despejar o storage do app
// instalado/nativo. Isso preserva a sessão do usuário (fica em localStorage) e o
// cache do service worker quando o aparelho está com pouco espaço — a causa do
// "reabri o app e tava deslogado". Só solicitamos no contexto instalado/nativo
// (Capacitor ou display-mode standalone) para não incomodar visitantes web.
try {
  const w = window as unknown as { Capacitor?: unknown };
  const isInstalledApp =
    !!w.Capacitor ||
    window.matchMedia?.("(display-mode: standalone)")?.matches === true ||
    (navigator as unknown as { standalone?: boolean }).standalone === true;
  if (isInstalledApp && navigator.storage?.persist) {
    navigator.storage.persisted()
      .then((already) => { if (!already) return navigator.storage.persist(); })
      .catch(() => undefined);
  }
} catch { /* ambiente sem storage API — ignora */ }

// App nativo (Capacitor): marca o <html> para o CSS aplicar o recuo da barra de
// status (ver index.css). O Capacitor 8 injeta --safe-area-inset-* com os valores
// REAIS das barras do sistema — o env(safe-area-inset-*) do WebView Android
// retorna 0 e não serve. Assim o conteúdo começa abaixo do relógio (padrão dos
// apps), enquanto overlays fixed (estágios/desafios do RPG) seguem em tela cheia.
try {
  const w = window as unknown as { Capacitor?: { isNativePlatform?: () => boolean } };
  if (w.Capacitor?.isNativePlatform?.()) {
    document.documentElement.classList.add("cap-native");
  }
} catch { /* noop */ }

// Atualização automática (SW + farol de versão) — ver src/lib/appUpdate.ts:
// garante que navegador, PWA instalado e app nativo peguem a versão nova
// sozinhos, sem o usuário limpar cookies/dados.
initAutoUpdate();

createRoot(document.getElementById("root")!).render(<App />);
