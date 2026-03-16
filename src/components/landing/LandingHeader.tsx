import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mascot3D } from "@/components/shared/Mascot3D";

const LandingHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left - Animated Mascot with speech bubble (same style as /home) */}
          <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex-shrink-0"
              >
                <Mascot3D mood="idle" size="sm" />
              </motion.div>
              {/* Speech bubble to the right of mascot */}
              <div className="relative pointer-events-none">
                <div className="relative rounded-2xl px-3 py-1.5 text-xs leading-relaxed font-medium bg-gradient-to-br from-[#1A2E50] to-[#243B63] text-blue-100 shadow-[0_4px_20px_rgba(59,130,246,0.3)] border border-blue-400/30">
                  <span className="text-xs font-semibold whitespace-nowrap">Vamos juntos? 🙏</span>
                  {/* Tail pointing left to mascot */}
                  <div className="absolute top-1/2 -left-2 -translate-y-1/2">
                    <div className="w-0 h-0 border-t-[5px] border-b-[5px] border-r-[8px] border-t-transparent border-b-transparent border-r-[#1A2E50]" />
                  </div>
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
