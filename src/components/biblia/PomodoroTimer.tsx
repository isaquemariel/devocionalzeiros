import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Timer, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PomodoroTimerProps {
  onTimeUpdate?: (minutes: number) => void;
  onSessionComplete?: (minutes: number) => void;
}

const POMODORO_MINUTES = 25;
const SHORT_BREAK_MINUTES = 5;

const PomodoroTimer = ({ onTimeUpdate, onSessionComplete }: PomodoroTimerProps) => {
  const [mode, setMode] = useState<"focus" | "break">("focus");
  const [timeLeft, setTimeLeft] = useState(POMODORO_MINUTES * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [totalReadingTime, setTotalReadingTime] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const startTimeRef = useRef<number | null>(null);
  const accumulatedTimeRef = useRef(0);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const playNotificationSound = useCallback(() => {
    if (!soundEnabled) return;
    
    // Create a simple beep sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = "sine";
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  }, [soundEnabled]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        
        if (mode === "focus") {
          setTotalReadingTime((prev) => {
            const newTotal = prev + 1;
            onTimeUpdate?.(Math.floor(newTotal / 60));
            return newTotal;
          });
        }
      }, 1000);
    } else if (timeLeft === 0) {
      playNotificationSound();
      
      if (mode === "focus") {
        const sessionMinutes = POMODORO_MINUTES;
        onSessionComplete?.(sessionMinutes);
        setMode("break");
        setTimeLeft(SHORT_BREAK_MINUTES * 60);
      } else {
        setMode("focus");
        setTimeLeft(POMODORO_MINUTES * 60);
      }
      setIsRunning(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, mode, onTimeUpdate, onSessionComplete, playNotificationSound]);

  const toggleTimer = () => {
    if (!isRunning) {
      startTimeRef.current = Date.now();
    } else {
      if (startTimeRef.current) {
        accumulatedTimeRef.current += Date.now() - startTimeRef.current;
      }
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === "focus" ? POMODORO_MINUTES * 60 : SHORT_BREAK_MINUTES * 60);
    startTimeRef.current = null;
    accumulatedTimeRef.current = 0;
  };

  const switchMode = (newMode: "focus" | "break") => {
    setMode(newMode);
    setTimeLeft(newMode === "focus" ? POMODORO_MINUTES * 60 : SHORT_BREAK_MINUTES * 60);
    setIsRunning(false);
  };

  const progress = mode === "focus" 
    ? ((POMODORO_MINUTES * 60 - timeLeft) / (POMODORO_MINUTES * 60)) * 100
    : ((SHORT_BREAK_MINUTES * 60 - timeLeft) / (SHORT_BREAK_MINUTES * 60)) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Timer className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Pomodoro</h3>
            <p className="text-xs text-muted-foreground">
              {totalReadingTime > 0 
                ? `${Math.floor(totalReadingTime / 60)}min lidos`
                : "Cronômetro de leitura"
              }
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setSoundEnabled(!soundEnabled)}
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4" />
          ) : (
            <VolumeX className="w-4 h-4 text-muted-foreground" />
          )}
        </Button>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => switchMode("focus")}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors ${
            mode === "focus"
              ? "bg-primary text-primary-foreground"
              : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
          }`}
        >
          Foco
        </button>
        <button
          onClick={() => switchMode("break")}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors ${
            mode === "break"
              ? "bg-accent text-accent-foreground"
              : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
          }`}
        >
          Pausa
        </button>
      </div>

      {/* Timer Display */}
      <div className="relative flex items-center justify-center mb-4">
        <svg className="w-32 h-32 transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
            className="text-muted/20"
          />
          <motion.circle
            cx="64"
            cy="64"
            r="56"
            stroke={mode === "focus" ? "hsl(var(--primary))" : "hsl(var(--accent))"}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 56}
            initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 56 * (1 - progress / 100) }}
            transition={{ duration: 0.5 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={timeLeft}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-3xl font-bold font-mono"
            >
              {formatTime(timeLeft)}
            </motion.span>
          </AnimatePresence>
          <span className="text-xs text-muted-foreground">
            {mode === "focus" ? "Leitura" : "Intervalo"}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full"
          onClick={resetTimer}
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          className={`h-14 w-14 rounded-full ${
            mode === "focus" 
              ? "bg-primary hover:bg-primary/90" 
              : "bg-accent hover:bg-accent/90"
          }`}
          onClick={toggleTimer}
        >
          {isRunning ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-0.5" />
          )}
        </Button>
        <div className="w-10" /> {/* Spacer for alignment */}
      </div>

      {/* Session info */}
      {totalReadingTime > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 pt-4 border-t border-border/50 text-center"
        >
          <p className="text-xs text-muted-foreground">
            Tempo total de leitura hoje
          </p>
          <p className="text-lg font-semibold text-primary">
            {Math.floor(totalReadingTime / 60)} min {totalReadingTime % 60} seg
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PomodoroTimer;
