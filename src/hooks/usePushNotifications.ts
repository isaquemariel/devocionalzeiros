import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// ============================================================================
// A CHAVE VAPID VEM DO SERVIDOR, NÃO DO BUILD.
//
// O navegador inscreve-se com uma chave pública e o servidor assina cada envio
// com a privada do mesmo par. Se as duas divergirem, o Google devolve 403 e a
// Apple devolve 400 em TODOS os envios — e foi isso que aconteceu: aqui a
// pública vinha de `VITE_VAPID_PUBLIC_KEY`, embutida no bundle em tempo de
// build, e lá a privada vinha dos segredos da edge function. Nada comparava as
// duas, e o app registava a falha e guardava as inscrições mortas.
//
// Agora há uma fonte só: `push-public-key` devolve a chave lida do MESMO
// ambiente de onde sai a privada. E, se a chave do servidor mudar, a inscrição
// antiga deste aparelho é refeita sozinha na primeira vez que o app abrir —
// senão o leitor ficaria calado para sempre, sem nada na tela a dizer porquê.
// A variável de build fica só como rede de segurança para o caso de o endpoint
// estar fora do ar.
// ============================================================================
const VAPID_FALLBACK = import.meta.env.VITE_VAPID_PUBLIC_KEY as string | undefined;

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

/** Base64url de um ArrayBuffer — para comparar a chave com que ESTE aparelho se
 *  inscreveu (`subscription.options.applicationServerKey`) com a do servidor. */
function bufToBase64Url(buf: ArrayBuffer): string {
  let s = "";
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return window.btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

const semPadding = (k: string) => k.replace(/=+$/, "");

let chaveEmCache: string | null | undefined;
/** A chave pública atual do servidor. Uma chamada por sessão. */
async function chaveDoServidor(): Promise<string | null> {
  if (chaveEmCache !== undefined) return chaveEmCache;
  try {
    const { data, error } = await supabase.functions.invoke("push-public-key");
    if (!error && data?.key) { chaveEmCache = semPadding(String(data.key)); return chaveEmCache; }
  } catch { /* endpoint fora do ar — cai no fallback abaixo */ }
  chaveEmCache = VAPID_FALLBACK ? semPadding(VAPID_FALLBACK) : null;
  return chaveEmCache;
}

export type PushPermission = "default" | "granted" | "denied" | "unsupported";

export function usePushNotifications() {
  const [permission, setPermission] = useState<PushPermission>("default");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isSupported =
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    "Notification" in window;

  /** Grava a inscrição no servidor, junto com a chave que a criou. */
  const guardar = async (sub: PushSubscription, chave: string) => {
    const json = sub.toJSON();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;
    const { error } = await supabase.functions.invoke("save-push-subscription", {
      body: { endpoint: json.endpoint, p256dh: json.keys?.p256dh, auth: json.keys?.auth, vapid_key: chave },
    });
    return !error;
  };

  const inscrever = async (chave: string) => {
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(chave).buffer as ArrayBuffer,
    });
    return sub;
  };

  useEffect(() => {
    if (!isSupported) {
      setPermission("unsupported");
      return;
    }
    setPermission(Notification.permission as PushPermission);
    let vivo = true;

    (async () => {
      try {
        const reg = await navigator.serviceWorker.ready;
        const sub = await reg.pushManager.getSubscription();
        if (!vivo) return;
        if (!sub) { setIsSubscribed(false); return; }

        // A inscrição existe — mas foi feita com a chave certa? Uma inscrição
        // assinada com uma chave que o servidor já não tem NUNCA vai receber
        // nada: o Google recusa com 403 e não há aviso nenhum para o leitor.
        const chave = await chaveDoServidor();
        const atual = sub.options?.applicationServerKey
          ? bufToBase64Url(sub.options.applicationServerKey as ArrayBuffer)
          : null;

        if (chave && atual && atual !== chave && Notification.permission === "granted") {
          // refaz em silêncio: a permissão já foi dada, não se pergunta de novo
          try {
            const endpointVelho = sub.endpoint;
            await sub.unsubscribe();
            const nova = await inscrever(chave);
            const ok = await guardar(nova, chave);
            const { data: { user } } = await supabase.auth.getUser();
            if (user && endpointVelho !== nova.endpoint) {
              await supabase.functions.invoke("save-push-subscription", {
                body: { endpoint: endpointVelho, unsubscribe: true },
              });
            }
            if (vivo) setIsSubscribed(ok);
            return;
          } catch (e) {
            console.error("Push: falhou refazer a inscrição com a chave nova", e);
          }
        }
        if (vivo) setIsSubscribed(true);
      } catch {
        // sem service worker pronto: nada a fazer
      }
    })();

    return () => { vivo = false; };
  }, [isSupported]);

  const subscribe = useCallback(async () => {
    if (!isSupported) {
      toast.error("Notificações push não são suportadas neste dispositivo.");
      return;
    }

    setIsLoading(true);
    try {
      const chave = await chaveDoServidor();
      if (!chave) {
        toast.error("Chave VAPID não configurada. Contate o suporte.");
        return;
      }

      const permResult = await Notification.requestPermission();
      setPermission(permResult as PushPermission);
      if (permResult !== "granted") {
        toast.error("Permissão para notificações negada.");
        return;
      }

      // Se já houver inscrição com OUTRA chave, ela tem de sair primeiro: o
      // navegador recusa `subscribe` com uma applicationServerKey diferente.
      const reg = await navigator.serviceWorker.ready;
      const antiga = await reg.pushManager.getSubscription();
      if (antiga) {
        const dela = antiga.options?.applicationServerKey
          ? bufToBase64Url(antiga.options.applicationServerKey as ArrayBuffer)
          : null;
        if (dela !== chave) await antiga.unsubscribe();
      }

      const sub = await inscrever(chave);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { toast.error("Usuário não autenticado."); return; }
      if (!(await guardar(sub, chave))) throw new Error("save-push-subscription falhou");

      setIsSubscribed(true);
      toast.success("🔔 Notificações ativadas com sucesso!");
    } catch (err) {
      console.error("Push subscribe error:", err);
      toast.error("Erro ao ativar notificações. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }, [isSupported]);

  const unsubscribe = useCallback(async () => {
    if (!isSupported) return;
    setIsLoading(true);
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        const endpoint = sub.endpoint;
        await sub.unsubscribe();

        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.functions.invoke("save-push-subscription", {
            body: { endpoint, unsubscribe: true },
          });
        }
      }
      setIsSubscribed(false);
      toast.success("Notificações desativadas.");
    } catch (err) {
      console.error("Push unsubscribe error:", err);
      toast.error("Erro ao desativar notificações.");
    } finally {
      setIsLoading(false);
    }
  }, [isSupported]);

  return { permission, isSubscribed, isLoading, isSupported, subscribe, unsubscribe };
}
