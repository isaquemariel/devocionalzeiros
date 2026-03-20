import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY as string | undefined;

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

  useEffect(() => {
    if (!isSupported) {
      setPermission("unsupported");
      return;
    }
    setPermission(Notification.permission as PushPermission);
    checkExistingSubscription();
  }, [isSupported]);

  const checkExistingSubscription = async () => {
    if (!isSupported) return;
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      setIsSubscribed(!!sub);
    } catch {
      // silently fail
    }
  };

  const subscribe = useCallback(async () => {
    if (!isSupported) {
      toast.error("Notificações push não são suportadas neste dispositivo.");
      return;
    }

    if (!VAPID_PUBLIC_KEY) {
      toast.error("Chave VAPID não configurada. Contate o suporte.");
      return;
    }

    setIsLoading(true);
    try {
      const permResult = await Notification.requestPermission();
      setPermission(permResult as PushPermission);

      if (permResult !== "granted") {
        toast.error("Permissão para notificações negada.");
        return;
      }

      const reg = await navigator.serviceWorker.ready;
      const applicationServerKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);

      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      });

      const subJson = subscription.toJSON();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { toast.error("Usuário não autenticado."); return; }

      const { error } = await supabase.functions.invoke("save-push-subscription", {
        body: {
          endpoint: subJson.endpoint,
          p256dh: subJson.keys?.p256dh,
          auth: subJson.keys?.auth,
        },
      });

      if (error) throw error;

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
