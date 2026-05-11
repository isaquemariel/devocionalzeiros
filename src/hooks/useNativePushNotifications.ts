// Native push notifications via Capacitor + FCM (Android) / APNs (iOS).
// Safe no-op when running on the web — only initializes inside a native app.
import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { supabase } from "@/integrations/supabase/client";

/**
 * Registers the device with FCM/APNs and saves the token to Supabase.
 * Should be mounted once (e.g. inside <App />) when a user is authenticated.
 */
export function useNativePushNotifications(userId: string | undefined) {
  useEffect(() => {
    if (!userId) return;
    if (!Capacitor.isNativePlatform()) return;

    let mounted = true;

    (async () => {
      try {
        // Lazy import — package is not used on web bundle.
        const { PushNotifications } = await import("@capacitor/push-notifications");

        const perm = await PushNotifications.checkPermissions();
        let status = perm.receive;
        if (status === "prompt" || status === "prompt-with-rationale") {
          const req = await PushNotifications.requestPermissions();
          status = req.receive;
        }
        if (status !== "granted") {
          console.warn("[native-push] permission not granted:", status);
          return;
        }

        await PushNotifications.removeAllListeners();

        await PushNotifications.addListener("registration", async (token) => {
          if (!mounted) return;
          const platform = Capacitor.getPlatform() as "ios" | "android";
          try {
            await supabase
              .from("native_push_tokens")
              .upsert(
                {
                  user_id: userId,
                  token: token.value,
                  platform,
                  last_seen_at: new Date().toISOString(),
                },
                { onConflict: "token" },
              );
            console.log("[native-push] token registered");
          } catch (e) {
            console.error("[native-push] failed to save token", e);
          }
        });

        await PushNotifications.addListener("registrationError", (err) => {
          console.error("[native-push] registration error", err);
        });

        await PushNotifications.addListener("pushNotificationReceived", (n) => {
          console.log("[native-push] received in foreground", n);
        });

        await PushNotifications.addListener("pushNotificationActionPerformed", (action) => {
          const url = (action.notification.data as any)?.url;
          if (url && typeof window !== "undefined") {
            window.location.href = url;
          }
        });

        await PushNotifications.register();
      } catch (e) {
        console.error("[native-push] init error", e);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [userId]);
}
