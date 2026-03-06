import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminCheck } from "@/hooks/useAdminCheck";

export const AdminUserCounter = () => {
  const { isAdmin, loading: adminLoading } = useAdminCheck();
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [displayCount, setDisplayCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const fetchMetrics = async () => {
    try {
      const { data, error } = await supabase.rpc('admin_get_metrics');
      if (error) { console.error("Error fetching admin metrics:", error); return; }
      if (data && data.length > 0) {
        const newTotal = data[0].total_users || 0;
        setTotalUsers(prev => {
          if (prev !== null && newTotal !== prev) setIsAnimating(true);
          return newTotal;
        });
        setTimeout(() => setIsAnimating(false), 500);
      }
    } catch (err) {
      console.error("Error in fetchMetrics:", err);
    }
  };

  // Animate counter
  useEffect(() => {
    if (totalUsers === null) return;
    const target = totalUsers;
    const duration = 1500;
    const steps = 60;
    const stepTime = duration / steps;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setDisplayCount(target); clearInterval(timer); }
      else setDisplayCount(Math.floor(current));
    }, stepTime);
    return () => clearInterval(timer);
  }, [totalUsers]);

  // Fetch on mount + poll every 60s (no Realtime)
  useEffect(() => {
    if (!isAdmin || adminLoading) return;
    fetchMetrics();
    const pollInterval = setInterval(fetchMetrics, 60000);
    return () => clearInterval(pollInterval);
  }, [isAdmin, adminLoading]);

  if (adminLoading || !isAdmin || totalUsers === null) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
      className="mb-6"
    >
      <div className="relative max-w-xs mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 rounded-2xl blur-xl" />
        <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-6 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: '20px 20px'
            }} />
          </div>
          <AnimatePresence>
            {isAnimating && (
              <motion.div
                initial={{ opacity: 0.5, scale: 1 }}
                animate={{ opacity: 0, scale: 1.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-primary/30 rounded-2xl"
              />
            )}
          </AnimatePresence>
          <div className="relative flex items-center gap-4">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/30">
                <Users className="w-7 h-7 text-white" />
              </div>
            </motion.div>
            <div>
              <p className="text-xs text-white/50 uppercase tracking-wider font-medium mb-1">
                Total de Usuários
              </p>
              <motion.div
                key={displayCount}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-baseline gap-2"
              >
                <span className="text-4xl font-black text-white tabular-nums">
                  {displayCount.toLocaleString('pt-BR')}
                </span>
                <span className="text-primary text-sm font-semibold flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  cadastrados
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
