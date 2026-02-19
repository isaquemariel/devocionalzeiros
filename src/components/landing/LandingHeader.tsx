import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mascot3D } from "@/components/shared/Mascot3D";

const LandingHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container px-4 sm:px-6">
        <div className="flex items-center justify-between h-12 sm:h-16">
          {/* Left - Animated Mascot (idle, no particles) with speech bubble */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex-shrink-0"
              >
                <Mascot3D mood="idle" size="xs" />
              </motion.div>
              {/* Speech bubble above mascot - amber style like RPG/home */}
              <div className="absolute -top-7 sm:-top-8 left-1/2 -translate-x-1/2 z-10">
                <div className="relative rounded-full px-3 py-1 bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-[0_4px_20px_rgba(245,158,11,0.4)] whitespace-nowrap">
                  <span className="text-[10px] sm:text-xs font-bold">Vamos juntos? 🙏</span>
                  {/* Tail pointing down to mascot */}
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-[6px] w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[7px] border-t-orange-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Right - Login button */}
          <div className="flex items-center">
            <Link to="/auth">
              <Button variant="default" size="sm" className="gap-1.5 px-3">
                <LogIn className="w-4 h-4" />
                <span className="text-sm">Entrar</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
