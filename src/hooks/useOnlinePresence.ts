import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Hook to track user online presence using Supabase Realtime Presence.
 * This allows admins to see how many users are currently online.
 */
export const useOnlinePresence = (userId: string | undefined) => {
  useEffect(() => {
    if (!userId) return;

    console.log('[Presence] Initializing for user:', userId);

    const channel = supabase.channel('online-users', {
      config: {
        presence: {
          key: userId,
        },
      },
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        console.log('[Presence] Sync - current state:', Object.keys(state).length, 'users');
      })
      .subscribe(async (status) => {
        console.log('[Presence] Channel status:', status);
        if (status === 'SUBSCRIBED') {
          const trackResult = await channel.track({
            user_id: userId,
            online_at: new Date().toISOString(),
          });
          console.log('[Presence] Track result:', trackResult);
        }
      });

    // Handle visibility change to update presence
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible') {
        console.log('[Presence] Tab visible, re-tracking');
        await channel.track({
          user_id: userId,
          online_at: new Date().toISOString(),
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Heartbeat to keep presence alive
    const heartbeat = setInterval(async () => {
      await channel.track({
        user_id: userId,
        online_at: new Date().toISOString(),
      });
    }, 30000); // Every 30 seconds

    return () => {
      console.log('[Presence] Cleanup for user:', userId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(heartbeat);
      channel.untrack();
      supabase.removeChannel(channel);
    };
  }, [userId]);
};
