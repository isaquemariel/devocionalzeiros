import { useCallback, useRef } from "react";
import { useSoundContext } from "@/contexts/SoundContext";

// Audio context for generating game sounds
let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

// Different sound types for various game events
export type SoundType = 
  | "complete" 
  | "achievement" 
  | "streak" 
  | "click" 
  | "success" 
  | "levelUp"
  | "correct"
  | "wrong"
  | "chapterComplete"
  | "rankUp"
  | "rankDown";

const soundConfigs: Record<SoundType, { frequencies: number[]; durations: number[]; type: OscillatorType }> = {
  complete: {
    frequencies: [523.25, 659.25, 783.99], // C5, E5, G5 - upward arpeggio
    durations: [0.1, 0.1, 0.15],
    type: "sine",
  },
  achievement: {
    frequencies: [392, 523.25, 659.25, 783.99, 1046.5], // G4 to C6 fanfare
    durations: [0.08, 0.08, 0.08, 0.08, 0.25],
    type: "sine",
  },
  streak: {
    frequencies: [440, 554.37, 659.25, 880], // A4 to A5
    durations: [0.06, 0.06, 0.06, 0.2],
    type: "triangle",
  },
  click: {
    frequencies: [800],
    durations: [0.05],
    type: "sine",
  },
  success: {
    frequencies: [523.25, 783.99], // C5, G5
    durations: [0.1, 0.2],
    type: "sine",
  },
  levelUp: {
    frequencies: [261.63, 329.63, 392, 523.25, 659.25, 783.99, 1046.5],
    durations: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.3],
    type: "sine",
  },
  correct: {
    frequencies: [523.25, 659.25, 783.99, 1046.5], // C5, E5, G5, C6 - triumphant chord
    durations: [0.08, 0.08, 0.08, 0.2],
    type: "sine",
  },
  wrong: {
    frequencies: [311.13, 293.66], // Eb4, D4 - descending minor
    durations: [0.15, 0.25],
    type: "sawtooth",
  },
  chapterComplete: {
    frequencies: [392, 493.88, 587.33, 783.99], // G4, B4, D5, G5 - major chord rise
    durations: [0.1, 0.1, 0.1, 0.3],
    type: "sine",
  },
  rankUp: {
    frequencies: [523.25, 659.25, 783.99, 1046.5, 1318.5], // C5 to E6 - triumphant fanfare
    durations: [0.08, 0.08, 0.08, 0.1, 0.3],
    type: "sine",
  },
  rankDown: {
    frequencies: [440, 392, 349.23, 311.13], // A4 descending to Eb4 - warning sound
    durations: [0.12, 0.12, 0.12, 0.2],
    type: "triangle",
  },
};

export const useGameSounds = () => {
  const isPlayingRef = useRef(false);
  const { soundEnabled } = useSoundContext();

  const playSound = useCallback((type: SoundType, volume: number = 0.3) => {
    // Check if sound is enabled
    if (!soundEnabled) return;
    
    // Prevent sound overlap
    if (isPlayingRef.current) return;
    
    try {
      const ctx = getAudioContext();
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const config = soundConfigs[type];
      let startTime = ctx.currentTime;

      isPlayingRef.current = true;

      config.frequencies.forEach((freq, index) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.type = config.type;
        oscillator.frequency.setValueAtTime(freq, startTime);

        // Envelope for smooth sound
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + config.durations[index]);

        oscillator.start(startTime);
        oscillator.stop(startTime + config.durations[index] + 0.05);

        startTime += config.durations[index] * 0.8; // Slight overlap for smoother sound
      });

      // Reset playing state after total duration
      const totalDuration = config.durations.reduce((a, b) => a + b, 0);
      setTimeout(() => {
        isPlayingRef.current = false;
      }, totalDuration * 1000);
    } catch (error) {
      console.warn("Audio playback failed:", error);
      isPlayingRef.current = false;
    }
  }, [soundEnabled]);

  return { playSound };
};

export default useGameSounds;
