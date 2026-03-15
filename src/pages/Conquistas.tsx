import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { AppHeader } from "@/components/shared/AppHeader";
import AchievementsGrid from "@/components/biblia/AchievementsGrid";


const Conquistas = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Carregando conquistas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden noise-overlay">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden bg-background">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground) / 0.03) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground) / 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] rounded-full blur-[200px] -translate-y-1/2" style={{ backgroundColor: 'hsl(var(--primary) / 0.03)' }} />
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] rounded-full blur-[180px] -translate-x-1/2" style={{ backgroundColor: 'hsl(var(--accent) / 0.02)' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-24">
        {/* Header */}
        <AppHeader 
          userId={user?.id}
          userEmail={user?.email || undefined}
          showBack={true}
        />

        {/* Page Title */}
        <motion.div
          className="mb-6 text-center relative"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Conquistas
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Complete desafios e resgate seus pontos
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <AchievementsGrid userId={user?.id} />
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-xs text-muted-foreground/50">
            CLUBE HD © {new Date().getFullYear()} • Todos os direitos reservados
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Conquistas;
