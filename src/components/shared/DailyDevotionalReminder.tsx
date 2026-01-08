import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface DailyDevotionalReminderProps {
  userId: string | undefined;
  userName?: string;
}

export const DailyDevotionalReminder = ({ userId, userName }: DailyDevotionalReminderProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const hasChecked = useRef(false);

  useEffect(() => {
    const checkAndShowReminder = async () => {
      // Prevent multiple checks in the same session
      if (!userId || hasChecked.current) return;
      hasChecked.current = true;

      const today = new Date().toISOString().split('T')[0];
      const storageKey = `devotional_reminder_shown_${today}`;
      
      // Check localStorage FIRST - if already shown today, exit immediately
      const alreadyShown = localStorage.getItem(storageKey);
      if (alreadyShown === 'true') return;

      // Mark as shown IMMEDIATELY to prevent any race conditions
      localStorage.setItem(storageKey, 'true');

      // Check if user already completed devotional today
      try {
        const { data: completions } = await supabase
          .from('devotional_completions')
          .select('id')
          .eq('user_id', userId)
          .eq('devotional_date', today)
          .maybeSingle();

        // If devotional already completed, don't show
        if (completions) return;

        // Show the floating button with a small delay
        setTimeout(() => {
          setIsVisible(true);
        }, 800);
      } catch (error) {
        console.error('Error checking devotional completion:', error);
      }
    };

    checkAndShowReminder();
  }, [userId]);

  const handleGoToDevotional = () => {
    setIsVisible(false);
    navigate("/devocional");
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const firstName = userName?.split(' ')[0] || 'Devocionalzeiro';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="fixed left-4 top-32 sm:top-36 z-50"
        >
          <div className="relative bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl shadow-xl shadow-amber-500/30 overflow-hidden">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 p-1 rounded-full bg-black/20 hover:bg-black/30 transition-colors z-10"
              aria-label="Fechar"
            >
              <X className="w-3.5 h-3.5 text-white" />
            </button>

            {/* Content - clickable area */}
            <button
              onClick={handleGoToDevotional}
              className="flex items-center gap-3 p-3 pr-8 text-left hover:bg-white/10 transition-colors"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-white" />
              </div>

              {/* Text */}
              <div className="min-w-0">
                <p className="text-white text-xs font-medium leading-tight">
                  Fala, {firstName}! 👋
                </p>
                <p className="text-white/90 text-[11px] leading-tight mt-0.5">
                  Já fez seu <span className="font-bold">Devocional</span> hoje?
                </p>
              </div>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};