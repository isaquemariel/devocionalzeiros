import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface SoundContextType {
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

const SOUND_STORAGE_KEY = "clubehd_sound_enabled";

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const [soundEnabled, setSoundEnabledState] = useState(() => {
    const stored = localStorage.getItem(SOUND_STORAGE_KEY);
    return stored === null ? true : stored === "true";
  });

  const setSoundEnabled = (enabled: boolean) => {
    setSoundEnabledState(enabled);
    localStorage.setItem(SOUND_STORAGE_KEY, String(enabled));
  };

  return (
    <SoundContext.Provider value={{ soundEnabled, setSoundEnabled }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSoundContext = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSoundContext must be used within a SoundProvider");
  }
  return context;
};
