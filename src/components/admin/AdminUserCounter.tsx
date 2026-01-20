import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, TrendingUp, Wifi } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminCheck } from "@/hooks/useAdminCheck";

interface AdminMetrics {
  totalUsers: number;
  onlineNow: number;
}

export const AdminUserCounter = () => {
  const { isAdmin, loading: adminLoading } = useAdminCheck();
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [displayCount, setDisplayCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(0);

  const fetchMetrics = async () => {
    try {
      const { data, error } = await supabase.rpc('admin_get_metrics');
      
      if (error) {
        console.error("Error fetching admin metrics:", error);
        return;
      }
      
      if (data && data.length > 0) {
        const newTotal = data[0].total_users || 0;
        
        // Only animate if value changed
        if (metrics && newTotal !== metrics.totalUsers) {
          setIsAnimating(true);
          setTimeout(() => setIsAnimating(false), 500);
        }
        
        setMetrics({
          totalUsers: newTotal,
          onlineNow: onlineUsers,
        });
      }
    } catch (err) {
      console.error("Error in fetchMetrics:", err);
    }
  };

  // Animate counter
  useEffect(() => {
    if (!metrics) return;
    
    const target = metrics.totalUsers;
    const duration = 1500; // ms
    const steps = 60;
    const stepTime = duration / steps;
    const increment = target / steps;
    
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setDisplayCount(target);
        clearInterval(timer);
      } else {
        setDisplayCount(Math.floor(current));
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [metrics?.totalUsers]);

  // Initial fetch and realtime subscription
  useEffect(() => {
    if (!isAdmin || adminLoading) return;

    fetchMetrics();

    // Poll every 30 seconds for updates
    const pollInterval = setInterval(fetchMetrics, 30000);

    // Subscribe to profiles table changes for realtime updates
    const profilesChannel = supabase
      .channel('admin-user-counter')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
        },
        () => {
          fetchMetrics();
        }
      )
      .subscribe();

    // Presence channel to track online users - listen to the same channel
    const PRESENCE_CHANNEL = 'app-online-users';
    let presenceChannel: ReturnType<typeof supabase.channel> | null = null;

    presenceChannel = supabase.channel(PRESENCE_CHANNEL);

    presenceChannel
      .on('presence', { event: 'sync' }, () => {
        const state = presenceChannel!.presenceState();
        const count = Object.keys(state).length;
        console.log('[Admin] Presence sync - online:', count, 'keys:', Object.keys(state));
        setOnlineUsers(count);
      })
      .subscribe((status) => {
        console.log('[Admin] Presence channel status:', status);
      });

    return () => {
      clearInterval(pollInterval);
      supabase.removeChannel(profilesChannel);
      if (presenceChannel) {
        supabase.removeChannel(presenceChannel);
      }
    };
  }, [isAdmin, adminLoading]);

  // Don't render if not admin or still loading
  if (adminLoading || !isAdmin || !metrics) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.3 
      }}
      className="mb-6"
    >
      <div className="relative max-w-md mx-auto">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 rounded-2xl blur-xl" />
        
        <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-6 overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: '20px 20px'
            }} />
          </div>
          
          {/* Pulse effect on update */}
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
          
          <div className="relative flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Icon container with pulse */}
              <motion.div 
                className="relative"
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/30">
                  <Users className="w-7 h-7 text-white" />
                </div>
                {/* Live indicator */}
                <motion.div
                  className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full border-2 border-black"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
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
                    ao vivo
                  </span>
                </motion.div>
              </div>
            </div>
            
            {/* Online now badge */}
            <div className="text-right">
              <p className="text-xs text-white/40 uppercase tracking-wider mb-1 flex items-center justify-end gap-1">
                <Wifi className="w-3 h-3" />
                Online agora
              </p>
              <motion.div 
                className="flex items-center justify-end gap-2"
                key={onlineUsers}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-500"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.6, 1]
                  }}
                  transition={{ 
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <span className="text-2xl font-bold text-green-400">
                  {onlineUsers.toLocaleString('pt-BR')}
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
