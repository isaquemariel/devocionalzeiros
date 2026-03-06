import { createContext, useContext, useEffect, useState, useRef, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { RealtimeChannel } from "@supabase/supabase-js";

// Single global channel — all users join this
const PRESENCE_CHANNEL = 'app-online-users-v2';

interface OnlinePresenceContextValue {
  onlineCount: number;
  isConnected: boolean;
}

const OnlinePresenceContext = createContext<OnlinePresenceContextValue>({
  onlineCount: 0,
  isConnected: false,
});

export const useOnlinePresenceContext = () => useContext(OnlinePresenceContext);

interface Props {
  userId: string | undefined;
  children: ReactNode;
}

/**
 * Provider singleton — mounts ONE channel per app session.
 * Use this at the top of the app tree (e.g., Home.tsx) so all
 * consumers (AdminUserCounter, etc.) share the same state.
 */
export const OnlinePresenceProvider = ({ userId, children }: Props) => {
  const [onlineCount, setOnlineCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const hasTrackedRef = useRef(false);
  const userIdRef = useRef(userId);

  useEffect(() => {
    userIdRef.current = userId;
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    // Clean up existing channel
    if (channelRef.current) {
      channelRef.current.untrack();
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
      hasTrackedRef.current = false;
    }

    // Each user gets a unique session key so multiple tabs/devices count separately
    const sessionKey = `${userId}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    const channel = supabase.channel(PRESENCE_CHANNEL, {
      config: {
        presence: {
          key: sessionKey,
        },
      },
    });

    channelRef.current = channel;

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        // Count unique user IDs (not sessions) to avoid counting same user multiple times
        const uniqueUserIds = new Set<string>();
        Object.values(state).forEach((presences: any[]) => {
          presences.forEach((p: any) => {
            if (p.user_id) uniqueUserIds.add(p.user_id);
          });
        });
        const count = uniqueUserIds.size;
        console.log('[Presence] Sync - unique users online:', count);
        setOnlineCount(count);
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

    // Heartbeat to keep presence alive (60s to reduce Realtime messages)
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
    }, 60000);

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

  return (
    <OnlinePresenceContext.Provider value={{ onlineCount, isConnected }}>
      {children}
    </OnlinePresenceContext.Provider>
  );
};
