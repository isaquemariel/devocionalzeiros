import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { AppHeader } from "@/components/shared/AppHeader";
import { PainelConquistas } from "@/components/conquistas/PainelConquistas";
import { BottomNavBar } from "@/components/shared/BottomNavBar";
import { MascotLoader } from "@/components/shared/FloatingMascot";


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
    return <MascotLoader label="Carregando conquistas..." />;
  }

  return (
    // a página inteira no padrão do RPG: fundo de tinta e ouro, letra do jogo
    <div className="rpg-root min-h-screen overflow-x-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-8 pb-24">
        {/* Header */}
        <AppHeader 
          userId={user?.id}
          userEmail={user?.email || undefined}
          showBack={true}
        />

        <PainelConquistas userId={user?.id} />

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
      <BottomNavBar />
    </div>
  );
};

export default Conquistas;
