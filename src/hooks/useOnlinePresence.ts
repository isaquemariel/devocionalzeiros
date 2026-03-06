// Online presence tracking removed to save Realtime costs.
// Kept as a stub so any remaining imports don't break.

interface OnlinePresenceResult {
  onlineCount: number;
  isConnected: boolean;
}

export const useOnlinePresence = (_userId: string | undefined): OnlinePresenceResult => {
  return { onlineCount: 0, isConnected: false };
};
