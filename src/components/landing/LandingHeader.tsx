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
          {/* Left - Animated Mascot with speech bubble (same style as /home) */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex-shrink-0"
              >
                <Mascot3D mood="idle" size="xs" />
              </motion.div>
              {/* Speech bubble above mascot - blue style matching /home */}
              <div
                className="absolute pointer-events-none"
                style={{ bottom: "calc(100% - 4px)", left: "50%", width: "max-content", maxWidth: "180px" }}
              >
                <div className="relative rounded-2xl px-3 py-1.5 text-xs leading-relaxed font-medium bg-gradient-to-br from-[#1A2E50] to-[#243B63] text-blue-100 shadow-[0_4px_20px_rgba(59,130,246,0.3)] border border-blue-400/30">
                  <span className="text-xs font-semibold whitespace-nowrap">Vamos juntos? 🙏</span>
                  {/* Tail pointing down to mascot */}
                  <div className="absolute -bottom-2 left-3">
                    <div className="w-0 h-0 border-l-[8px] border-r-[4px] border-t-[10px] border-l-transparent border-r-transparent border-t-[#243B63]" style={{ transform: "rotate(-15deg)" }} />
                  </div>
                  <div className="absolute -bottom-3.5 left-1.5 w-2 h-2 rounded-full bg-[#243B63]" />
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
