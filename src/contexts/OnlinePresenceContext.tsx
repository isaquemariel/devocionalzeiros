import { createContext, useContext, ReactNode } from "react";

// Online presence tracking removed to save Realtime costs.

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
  userId?: string | undefined;
  children: ReactNode;
}

export const OnlinePresenceProvider = ({ children }: Props) => (
  <OnlinePresenceContext.Provider value={{ onlineCount: 0, isConnected: false }}>
    {children}
  </OnlinePresenceContext.Provider>
);
