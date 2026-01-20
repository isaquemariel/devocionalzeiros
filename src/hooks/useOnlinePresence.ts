import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { RealtimeChannel } from "@supabase/supabase-js";

// Global channel name - all users share this
const PRESENCE_CHANNEL = 'app-online-users';

interface OnlinePresenceResult {
  onlineCount: number;
  isConnected: boolean;
}

/**
 * Hook to track user online presence using Supabase Realtime Presence.
 * All users join the same channel but with their unique userId as the presence key.
 */
export const useOnlinePresence = (userId: string | undefined): OnlinePresenceResult => {
  const [onlineCount, setOnlineCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const hasTrackedRef = useRef(false);
  const userIdRef = useRef(userId);

  // Update ref when userId changes
  useEffect(() => {
    userIdRef.current = userId;
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    // Clean up any existing channel first
    if (channelRef.current) {
      channelRef.current.untrack();
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
      hasTrackedRef.current = false;
    }

    // Create channel with this user's presence key
    const channel = supabase.channel(PRESENCE_CHANNEL, {
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
        const uniqueUsers = Object.keys(state).length;
        console.log('[Presence] Sync - online:', uniqueUsers, 'keys:', Object.keys(state));
        setOnlineCount(uniqueUsers);
      })
      .subscribe(async (status) => {
        console.log('[Presence] Status:', status);
        
        if (status === 'SUBSCRIBED') {
          setIsConnected(true);
          
          if (!hasTrackedRef.current && userIdRef.current) {
            hasTrackedRef.current = true;
            await channel.track({
              user_id: userIdRef.current,
              online_at: new Date().toISOString(),
            });
            console.log('[Presence] Tracked user:', userIdRef.current);
          }
        } else if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
          setIsConnected(false);
          hasTrackedRef.current = false;
        }
      });

    // Heartbeat to maintain presence
    const heartbeat = setInterval(async () => {
      if (channelRef.current && hasTrackedRef.current && userIdRef.current) {
        try {
          await channelRef.current.track({
            user_id: userIdRef.current,
            online_at: new Date().toISOString(),
          });
        } catch (e) {
          console.log('[Presence] Heartbeat error:', e);
        }
      }
    }, 25000);

    return () => {
      clearInterval(heartbeat);
      hasTrackedRef.current = false;
      if (channelRef.current) {
        channelRef.current.untrack();
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [userId]);

  return { onlineCount, isConnected };
};
