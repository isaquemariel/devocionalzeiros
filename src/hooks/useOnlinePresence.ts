import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { RealtimeChannel } from "@supabase/supabase-js";

/**
 * Hook to track user online presence using Supabase Realtime Presence.
 * This allows admins to see how many users are currently online.
 */
export const useOnlinePresence = (userId: string | undefined) => {
  const channelRef = useRef<RealtimeChannel | null>(null);
  const isSubscribedRef = useRef(false);

  useEffect(() => {
    if (!userId) return;

    // Avoid duplicate subscriptions
    if (isSubscribedRef.current && channelRef.current) {
      return;
    }

    const channel = supabase.channel('online-users', {
      config: {
        presence: {
          key: userId,
        },
      },
    });

    channelRef.current = channel;

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        console.log('[Presence] Sync:', Object.keys(state).length, 'users online');
      })
      .subscribe(async (status) => {
        console.log('[Presence] Status:', status);
        if (status === 'SUBSCRIBED') {
          isSubscribedRef.current = true;
          await channel.track({
            user_id: userId,
            online_at: new Date().toISOString(),
          });
        }
      });

    // Heartbeat every 30 seconds to maintain presence
    const heartbeat = setInterval(async () => {
      if (channelRef.current && isSubscribedRef.current) {
        await channelRef.current.track({
          user_id: userId,
          online_at: new Date().toISOString(),
        });
      }
    }, 30000);

    // Handle visibility change - retrack when tab becomes visible
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible' && channelRef.current && isSubscribedRef.current) {
        await channelRef.current.track({
          user_id: userId,
          online_at: new Date().toISOString(),
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(heartbeat);
      isSubscribedRef.current = false;
      if (channelRef.current) {
        channelRef.current.untrack();
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [userId]);
};
