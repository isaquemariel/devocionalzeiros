// Mounts native FCM/APNs registration once per session inside the Capacitor app.
// On the web this component renders nothing and the hook is a no-op.
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNativePushNotifications } from "@/hooks/useNativePushNotifications";

export const NativePushBootstrap = () => {
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUserId(data.session?.user.id);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user.id);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useNativePushNotifications(userId);
  return null;
};
