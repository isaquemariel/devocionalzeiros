import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Hook to track user online presence using Supabase Realtime Presence.
 * This allows admins to see how many users are currently online.
 */
export const useOnlinePresence = (userId: string | undefined) => {
  useEffect(() => {
    if (!userId) return;

    const channel = supabase.channel('online-users', {
      config: {
        presence: {
          key: userId,
        },
      },
    });

    channel
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            user_id: userId,
            online_at: new Date().toISOString(),
          });
        }
      });

    // Handle visibility change to update presence
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible') {
        await channel.track({
          user_id: userId,
          online_at: new Date().toISOString(),
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      channel.untrack();
      supabase.removeChannel(channel);
    };
  }, [userId]);
};
