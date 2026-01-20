import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { RealtimeChannel } from "@supabase/supabase-js";

/**
 * Hook to track user online presence using Supabase Realtime Presence.
 * This allows admins to see how many users are currently online.
 */
export const useOnlinePresence = (userId: string | undefined) => {
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!userId) return;

    const setupChannel = () => {
      // Remove existing channel if any
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
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
            await channel.track({
              user_id: userId,
              online_at: new Date().toISOString(),
            });
          } else if (status === 'TIMED_OUT' || status === 'CLOSED') {
            // Reconnect after a short delay
            console.log('[Presence] Reconnecting...');
            setTimeout(setupChannel, 2000);
          }
        });
    };

    setupChannel();

    // Handle visibility change
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible' && channelRef.current) {
        const state = channelRef.current.state;
        if (state === 'joined') {
          await channelRef.current.track({
            user_id: userId,
            online_at: new Date().toISOString(),
          });
        } else {
          // Reconnect if not joined
          setupChannel();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Heartbeat every 20 seconds
    const heartbeat = setInterval(async () => {
      if (channelRef.current?.state === 'joined') {
        await channelRef.current.track({
          user_id: userId,
          online_at: new Date().toISOString(),
        });
      }
    }, 20000);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(heartbeat);
      if (channelRef.current) {
        channelRef.current.untrack();
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [userId]);
};
