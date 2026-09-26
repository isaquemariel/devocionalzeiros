// Native push notifications via Capacitor + FCM (Android) / APNs (iOS).
// Safe no-op when running on the web — only initializes inside a native app.
import { useEffect } from "react";
import { Capacitor, type PluginListenerHandle } from "@capacitor/core";
import { supabase } from "@/integrations/supabase/client";
import { irPara, toast } from "@/lib/avisos";
import { guardarTokenNativo } from "@/lib/pushDoAparelho";

/** só caminhos do próprio app (nunca "//outro-site" nem "https://…") */
const caminhoDoApp = (u: unknown): string | null =>
  typeof u === "string" && u.startsWith("/") && !u.startsWith("//") && !u.includes("\\") ? u : null;

/**
 * Registers the device with FCM/APNs and saves the token to Supabase.
 * Should be mounted once (e.g. inside <App />) when a user is authenticated.
 */
export function useNativePushNotifications(userId: string | undefined) {
  useEffect(() => {
    if (!userId) return;
    if (!Capacitor.isNativePlatform()) return;

    let mounted = true;
    const ouvintes: PluginListenerHandle[] = [];

    (async () => {
      try {
        // Lazy import — package is not used on web bundle.
        const { PushNotifications } = await import("@capacitor/push-notifications");
        if (!mounted) return;

        const perm = await PushNotifications.checkPermissions();
        let status = perm.receive;
        if (status === "prompt" || status === "prompt-with-rationale") {
          const req = await PushNotifications.requestPermissions();
          status = req.receive;
        }
        if (!mounted) return;
        if (status !== "granted") {
          console.warn("[native-push] permission not granted:", status);
          return;
        }

        await PushNotifications.removeAllListeners();
        if (!mounted) return;

        ouvintes.push(await PushNotifications.addListener("registration", async (token) => {
          if (!mounted) return;
          const platform = Capacitor.getPlatform() as "ios" | "android";
          guardarTokenNativo(token.value);
          // O token passa para a conta que está logada AGORA (aparelho
          // compartilhado): o upsert direto esbarrava no RLS da linha da conta
          // anterior e falhava calado, e o erro nem era olhado.
          const { error } = await supabase.rpc("registrar_token_nativo" as never, { p_token: token.value, p_platform: platform } as never);
          if (error) {
            // banco ainda sem a função: o caminho antigo (vale para token novo)
            const { error: e2 } = await supabase.from("native_push_tokens").upsert(
              { user_id: userId, token: token.value, platform, last_seen_at: new Date().toISOString() },
              { onConflict: "token" },
            );
            if (e2) console.error("[native-push] failed to save token", e2.message);
          }
        }));

        ouvintes.push(await PushNotifications.addListener("registrationError", (err) => {
          console.error("[native-push] registration error", err);
        }));

        // Chegou com o app ABERTO: não é hora de bandeja do sistema (o
        // capacitor.config só mostra o selo em primeiro plano). Quem avisa é
        // o Devocionalzeiro, com o botão que leva ao lugar.
        ouvintes.push(await PushNotifications.addListener("pushNotificationReceived", (n) => {
          const dados = (n.data ?? {}) as { url?: string; tipo?: string };
          // a conquista ele já avisou por conta própria (GlobalAchievementUnlockWatcher)
          if (!n.title || dados.tipo === "achievement") return;
          const url = caminhoDoApp(dados.url);
          toast.info(n.title, { description: n.body || undefined, action: url ? { label: "Ver", onClick: () => irPara(url) } : undefined });
        }));

        ouvintes.push(await PushNotifications.addListener("pushNotificationActionPerformed", (action) => {
          const url = caminhoDoApp((action.notification.data as { url?: string } | undefined)?.url);
          if (url) irPara(url);
        }));

        if (!mounted) return;
        await PushNotifications.register();
      } catch (e) {
        console.error("[native-push] init error", e);
      }
    })();

    return () => {
      mounted = false;
      // saiu da conta (ou trocou): nada de avisos da conta anterior
      ouvintes.forEach((o) => { void o.remove(); });
    };
  }, [userId]);
}
