import { ReactNode } from "react";
import { OnlinePresenceProvider } from "@/contexts/OnlinePresenceContext";
import { useAuth } from "@/hooks/useAuth";

/**
 * Wraps the entire app with OnlinePresenceProvider so users are tracked
 * across ALL pages, not just Home.
 */
export const AppPresenceWrapper = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  return (
    <OnlinePresenceProvider userId={user?.id}>
      {children}
    </OnlinePresenceProvider>
  );
};
