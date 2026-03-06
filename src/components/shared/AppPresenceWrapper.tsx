import { ReactNode } from "react";

/**
 * Presence tracking removed to save Realtime costs.
 * Kept as a passthrough wrapper to avoid breaking imports.
 */
export const AppPresenceWrapper = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};
