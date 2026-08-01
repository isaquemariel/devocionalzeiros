// ============================================================================
// ATUALIZAÇÃO AUTOMÁTICA do app (navegador, PWA instalado e app nativo/webview)
// — sem o usuário precisar limpar cookies/dados. Duas camadas:
//
// 1) SERVICE WORKER (rápida): checagem periódica do sw.js + SKIP_WAITING +
//    reload no controllerchange (troca atômica de versão).
// 2) FAROL DE VERSÃO (garantida): o build embute um id (__APP_BUILD__) e o
//    servidor publica /version.json (fora de qualquer cache). Se o id do
//    servidor for mais novo e o SW não conseguir trocar sozinho em alguns
//    segundos (SW emperrado, cache intermediário etc.), o app APAGA os caches
//    e recarrega — recuperação forçada, com trava anti-loop.
// ============================================================================

declare const __APP_BUILD__: string;

const BEACON_MS = 3 * 60 * 1000;   // consulta o version.json a cada 3 min
const SW_CHECK_MS = 15 * 1000;     // checagem do SW (comportamento já validado)
const FORCE_AFTER_MS = 10 * 1000;  // prazo pro SW trocar sozinho antes da forçada

export function initAutoUpdate(): void {
  if (!("serviceWorker" in navigator)) return;

  const host = window.location.hostname;
  const isLocalDev = host === "localhost" || host === "127.0.0.1";
  const isLovablePreview = host.startsWith("id-preview--") && host.endsWith(".lovable.app");

  // Preview do Lovable: sem SW (evita cache velho em cima de builds de preview)
  if (isLovablePreview) {
    navigator.serviceWorker.getRegistrations()
      .then((rs) => Promise.all(rs.map((r) => r.unregister())))
      .catch(() => undefined);
    if ("caches" in window) {
      caches.keys().then((ks) => Promise.all(ks.map((k) => caches.delete(k)))).catch(() => undefined);
    }
    return;
  }
  if (isLocalDev) return;

  // ---------- camada 1: service worker ----------
  let refreshing = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });

  const forceActivateWaiting = (reg: ServiceWorkerRegistration | undefined) => {
    reg?.waiting?.postMessage({ type: "SKIP_WAITING" });
  };

  const checkForUpdates = () => {
    navigator.serviceWorker.getRegistration().then((reg) => {
      if (reg) {
        reg.update().catch(() => undefined);
        forceActivateWaiting(reg);
      }
    }).catch(() => undefined);
  };

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") { checkForUpdates(); checkBeacon(); }
  });
  window.addEventListener("focus", checkForUpdates);
  window.addEventListener("online", () => { checkForUpdates(); checkBeacon(); });
  window.addEventListener("pageshow", checkForUpdates);
  setInterval(checkForUpdates, SW_CHECK_MS);

  navigator.serviceWorker.getRegistration().then((reg) => {
    forceActivateWaiting(reg ?? undefined);
    reg?.addEventListener("updatefound", () => {
      const nw = reg.installing;
      nw?.addEventListener("statechange", () => {
        if (nw.state === "installed" && navigator.serviceWorker.controller) {
          nw.postMessage({ type: "SKIP_WAITING" });
        }
      });
    });
  }).catch(() => undefined);

  // ---------- camada 2: farol de versão ----------
  let forcing = false;
  const checkBeacon = async () => {
    if (forcing || refreshing) return;
    try {
      const res = await fetch(`/version.json?t=${Date.now()}`, { cache: "no-store" });
      if (!res.ok) return;
      const { build } = await res.json() as { build?: string };
      if (!build || build === __APP_BUILD__) return;
      // servidor tem versão mais nova → dá a chance do SW trocar sozinho…
      forcing = true;
      checkForUpdates();
      window.setTimeout(async () => {
        if (refreshing) return; // o SW já trocou e recarregou
        // …não trocou: RECUPERAÇÃO FORÇADA (trava anti-loop por build)
        try {
          const forced = sessionStorage.getItem("dz_forced_build");
          if (forced === build) { forcing = false; return; } // já tentamos p/ este build
          sessionStorage.setItem("dz_forced_build", build);
        } catch { /* sem sessionStorage — segue mesmo assim */ }
        try {
          if ("caches" in window) {
            const ks = await caches.keys();
            await Promise.all(ks.map((k) => caches.delete(k)));
          }
          const reg = await navigator.serviceWorker.getRegistration();
          await reg?.update().catch(() => undefined);
        } catch { /* melhor esforço */ }
        window.location.reload();
      }, FORCE_AFTER_MS);
    } catch { /* offline etc. — tenta de novo no próximo ciclo */ }
  };
  setInterval(checkBeacon, BEACON_MS);

  // primeiro ciclo
  checkForUpdates();
  checkBeacon();
}
