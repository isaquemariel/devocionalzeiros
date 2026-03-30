import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX, Crown } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

interface VSLModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlocked: () => void;
}

const YOUTUBE_VIDEO_ID = "wMg-IPtPpGY";
const UNLOCK_SECONDS = 60;
const VSL_UNLOCKED_KEY = "vsl_unlocked";

export const VSLModal = ({ isOpen, onClose, onUnlocked }: VSLModalProps) => {
  const [secondsWatched, setSecondsWatched] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Check if user has already unlocked VSL before
  const alreadyUnlocked = localStorage.getItem(VSL_UNLOCKED_KEY) === "true";
  const isUnlocked = alreadyUnlocked || secondsWatched >= UNLOCK_SECONDS;
  const progress = alreadyUnlocked ? 100 : Math.min((secondsWatched / UNLOCK_SECONDS) * 100, 100);

  // Hide mascots when VSL is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('vsl-open');
    } else {
      document.body.classList.remove('vsl-open');
    }
    return () => document.body.classList.remove('vsl-open');
  }, [isOpen]);

  // Start timer when modal opens
  useEffect(() => {
    if (!isOpen) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setSecondsWatched(0);
      setIsMuted(true);
      return;
    }

    // Start counting immediately (video autoplays)
    timerRef.current = setInterval(() => {
      setSecondsWatched((prev) => {
        if (prev >= UNLOCK_SECONDS) {
          if (timerRef.current) clearInterval(timerRef.current);
          return UNLOCK_SECONDS;
        }
        return prev + 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isOpen]);

  const toggleMute = useCallback(() => {
    if (!iframeRef.current) return;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    
    // Post message to YouTube iframe
    iframeRef.current.contentWindow?.postMessage(
      JSON.stringify({
        event: "command",
        func: newMuted ? "mute" : "unMute",
        args: [],
      }),
      "*"
    );
  }, [isMuted]);

  const handleCTA = () => {
    if (!isUnlocked) return;
    localStorage.setItem(VSL_UNLOCKED_KEY, "true");
    onUnlocked();
  };

  const handleClose = () => {
    onClose();
  };

  const remainingSeconds = Math.max(UNLOCK_SECONDS - secondsWatched, 0);
  const minutes = Math.floor(remainingSeconds / 60);
  const secs = remainingSeconds % 60;

  // YouTube embed URL - clean, fast loading
  const embedUrl = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&fs=0&playsinline=1&enablejsapi=1&disablekb=1&iv_load_policy=3&cc_load_policy=0&widget_referrer=1&origin=${encodeURIComponent(window.location.origin)}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[70]"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6"
          >
            <div
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glowing border */}
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-amber-500 via-pink-500 to-purple-600 p-[2px]">
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-zinc-950" />
              </div>

              {/* Ambient glow */}
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-amber-500/15 via-pink-500/10 to-purple-500/15 blur-3xl -z-10" />

              <div className="relative">
                {/* Close */}
                <button
                  onClick={handleClose}
                  className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full bg-black/60 hover:bg-black/80 transition-colors z-20 border border-white/10"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-white/70" />
                </button>

                {/* Video container */}
                <div className="relative aspect-video bg-black">
                  <iframe
                    ref={iframeRef}
                    src={embedUrl}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    frameBorder="0"
                  />

                  {/* Clickable overlay to prevent YouTube interactions */}
                  <div
                    className="absolute inset-0 z-10"
                    onClick={(e) => e.stopPropagation()}
                  />

                  {/* Mute/Unmute overlay button - moves up after unmuting */}
                  <motion.button
                    onClick={toggleMute}
                    className="absolute left-3 sm:left-5 z-20 flex items-center gap-2 sm:gap-3 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-black/80 border-2 border-amber-400/50 hover:bg-black/90 transition-all"
                    initial={false}
                    animate={isMuted ? {
                      top: "12px",
                      scale: [1, 1.12, 1],
                      boxShadow: [
                        "0 0 12px rgba(251,191,36,0.5)",
                        "0 0 30px rgba(251,191,36,0.9)",
                        "0 0 12px rgba(251,191,36,0.5)",
                      ],
                    } : {
                      top: "-52px",
                      scale: 1,
                      boxShadow: "0 0 0px rgba(0,0,0,0)",
                    }}
                    transition={isMuted ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" } : { duration: 0.4, ease: "easeOut" }}
                  >
                    {isMuted ? (
                      <>
                        <VolumeX className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400" />
                        <span className="text-amber-400 text-sm sm:text-base font-extrabold">Ativar Áudio 🔊</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-6 h-6 sm:w-7 sm:h-7 text-green-400" />
                        <span className="text-green-400 text-sm sm:text-base font-bold">Áudio Ativo ✓</span>
                      </>
                    )}
                  </motion.button>

                  {/* Timer badge */}
                  {!isUnlocked && (
                    <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 z-20 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/70 border border-white/20">
                      <span className="text-white/80 text-xs sm:text-sm font-mono">
                        {minutes}:{secs.toString().padStart(2, "0")}
                      </span>
                    </div>
                  )}
                </div>

                {/* Bottom section */}
                <div className="p-4 sm:p-6 bg-zinc-950">
                  {/* Progress bar */}
                  <div className="relative w-full h-1.5 sm:h-2 rounded-full bg-zinc-800 mb-4 sm:mb-5 overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber-500 via-pink-500 to-purple-500"
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                    {isUnlocked && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/30 via-pink-400/30 to-purple-400/30"
                        animate={{ opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    onClick={handleCTA}
                    disabled={!isUnlocked}
                    className={`w-full flex items-center justify-center gap-2 sm:gap-3 h-12 sm:h-14 rounded-xl sm:rounded-2xl font-extrabold text-sm sm:text-base uppercase tracking-wider transition-all ${
                      isUnlocked
                        ? "bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 text-white cursor-pointer hover:from-amber-400 hover:via-pink-400 hover:to-purple-500"
                        : "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700"
                    }`}
                    animate={isUnlocked ? {
                      scale: [1, 1.03, 1],
                      boxShadow: [
                        "0 0 15px rgba(251,191,36,0.3)",
                        "0 0 35px rgba(236,72,153,0.6)",
                        "0 0 15px rgba(251,191,36,0.3)",
                      ],
                    } : {}}
                    transition={isUnlocked ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}
                  >
                    <Crown className={`w-5 h-5 sm:w-6 sm:h-6 ${isUnlocked ? "text-white" : "text-zinc-600"}`} />
                    {isUnlocked ? "SEJA UM PATROCINADOR" : `Aguarde ${minutes}:${secs.toString().padStart(2, "0")} para desbloquear`}
                  </motion.button>

                  {!isUnlocked && (
                    <p className="text-center text-zinc-500 text-[10px] sm:text-xs mt-2 sm:mt-3">
                      Assista o vídeo para desbloquear o acesso
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
