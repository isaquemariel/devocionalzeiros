// Estado do push NATIVO (Capacitor/FCM) para a tela de configurações.
// No app nativo, o push não usa Web Push/VAPID — usa o plugin do Capacitor e o
// token FCM. Este hook expõe se está ativo e permite ligar/desligar, pra o
// toggle refletir a realidade em vez de "não suportado".
import { useState, useEffect, useCallback } from "react";
import { Capacitor } from "@capacitor/core";
import { supabase } from "@/integrations/supabase/client";

export function useNativePushStatus() {
  const isNative = Capacitor.isNativePlatform();
  const [subscribed, setSubscribed] = useState(false);
  const [denied, setDenied] = useState(false);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!isNative) return;
    try {
      const { PushNotifications } = await import("@capacitor/push-notifications");
      const perm = await PushNotifications.checkPermissions();
      setDenied(perm.receive === "denied");
      const { data: { user } } = await supabase.auth.getUser();
      if (perm.receive === "granted" && user) {
        const { count } = await supabase
          .from("native_push_tokens")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id);
        setSubscribed((count ?? 0) > 0);
      } else {
        setSubscribed(false);
      }
    } catch { /* noop */ }
  }, [isNative]);

  useEffect(() => { refresh(); }, [refresh]);

  const enable = useCallback(async () => {
    if (!isNative) return;
    setLoading(true);
    try {
      const { PushNotifications } = await import("@capacitor/push-notifications");
      let perm = await PushNotifications.checkPermissions();
      if (perm.receive === "prompt" || perm.receive === "prompt-with-rationale") {
        perm = await PushNotifications.requestPermissions();
      }
      if (perm.receive === "granted") {
        await PushNotifications.register(); // dispara o listener que salva o token
        setDenied(false);
        setSubscribed(true); // otimista; refresh confirma depois
        setTimeout(refresh, 1500);
      } else {
        setDenied(perm.receive === "denied");
      }
    } catch { /* noop */ } finally {
      setLoading(false);
    }
  }, [isNative, refresh]);

  const disable = useCallback(async () => {
    if (!isNative) return;
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) await supabase.from("native_push_tokens").delete().eq("user_id", user.id);
      setSubscribed(false);
    } catch { /* noop */ } finally {
      setLoading(false);
    }
  }, [isNative]);

  return { isNative, subscribed, denied, loading, enable, disable, refresh };
}
