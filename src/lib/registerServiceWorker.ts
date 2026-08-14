import { registerSW } from "virtual:pwa-register";

const APP_SW_PATH = "/sw.js";

const isPreviewHost = (hostname: string) =>
  hostname.startsWith("id-preview--") ||
  hostname.startsWith("preview--") ||
  hostname === "lovableproject.com" ||
  hostname.endsWith(".lovableproject.com") ||
  hostname === "lovableproject-dev.com" ||
  hostname.endsWith(".lovableproject-dev.com") ||
  hostname === "beta.lovable.dev" ||
  hostname.endsWith(".beta.lovable.dev") ||
  hostname.endsWith(".lovable.app") && hostname.includes("preview--");

const unregisterAppWorker = async () => {
  if (!("serviceWorker" in navigator)) return;

  const registrations = await navigator.serviceWorker.getRegistrations();
  await Promise.all(
    registrations.map((registration) => {
      const worker = registration.active ?? registration.waiting ?? registration.installing;
      if (!worker) return Promise.resolve(false);

      try {
        return new URL(worker.scriptURL).pathname === APP_SW_PATH
          ? registration.unregister()
          : Promise.resolve(false);
      } catch {
        return Promise.resolve(false);
      }
    }),
  );
};

export async function registerAppServiceWorker(): Promise<boolean> {
  if (!("serviceWorker" in navigator)) return false;

  const disabled = new URLSearchParams(window.location.search).get("sw") === "off";
  const insideIframe = window.top !== window.self;
  const refused = !import.meta.env.PROD || insideIframe || isPreviewHost(window.location.hostname) || disabled;

  if (refused) {
    await unregisterAppWorker().catch(() => undefined);
    return false;
  }

  registerSW({ immediate: true });
  return true;
}