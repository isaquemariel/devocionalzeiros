import { ReactNode } from "react";
import { OnlinePresenceProvider } from "@/contexts/OnlinePresenceContext";
import { useAuth } from "@/hooks/useAuth";
import { useAdminCheck } from "@/hooks/useAdminCheck";

/**
 * Only connects to the Realtime Presence channel for admins.
 * Regular users have no benefit from the online counter, so we skip
 * the WebSocket channel entirely to save Realtime costs.
 */
export const AppPresenceWrapper = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const { isAdmin } = useAdminCheck();

  // Pass userId only for admins — non-admins get undefined so no channel is opened
  const presenceUserId = isAdmin ? user?.id : undefined;

  return (
    <OnlinePresenceProvider userId={presenceUserId}>
      {children}
    </OnlinePresenceProvider>
  );
};
