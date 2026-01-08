import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface DailyDevotionalReminderProps {
  userId: string | undefined;
  userName?: string;
}

export const DailyDevotionalReminder = ({ userId, userName }: DailyDevotionalReminderProps) => {
  const [isOpen, setIsOpen] = useState(false);
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

        // If devotional already completed, don't show popup
        if (completions) return;

        // Show the reminder with a small delay for better UX
        setTimeout(() => {
          setIsOpen(true);
        }, 800);
      } catch (error) {
        console.error('Error checking devotional completion:', error);
      }
    };

    checkAndShowReminder();
  }, [userId]);

  const handleGoToDevotional = () => {
    setIsOpen(false);
    navigate("/devocional");
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const firstName = userName?.split(' ')[0] || 'Devocionalzeiro';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="relative w-full max-w-sm bg-gradient-to-b from-slate-900 to-black border border-white/10 rounded-2xl p-6 shadow-2xl">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-white/50" />
              </button>

              {/* Decorative glow */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/30 rounded-full blur-[80px] pointer-events-none" />

              {/* Content */}
              <div className="relative text-center">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2, duration: 0.5 }}
                  className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-5 shadow-lg shadow-amber-500/30"
                >
                  <BookOpen className="w-10 h-10 text-white" />
                  <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-yellow-300 animate-pulse" />
                </motion.div>

                {/* Greeting */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-2xl font-black text-white mb-2">
                    Fala, {firstName}! 👋
                  </h2>
                  <p className="text-white/70 text-base mb-6">
                    Já fez seu <span className="text-amber-400 font-semibold">Devocional</span> hoje?
                  </p>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-3"
                >
                  <Button
                    onClick={handleGoToDevotional}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-6 text-base rounded-xl shadow-lg shadow-amber-500/30 transition-all hover:scale-[1.02]"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Ir para o Devocional
                  </Button>
                  
                  <button
                    onClick={handleClose}
                    className="text-sm text-white/40 hover:text-white/60 transition-colors"
                  >
                    Depois eu leio
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
