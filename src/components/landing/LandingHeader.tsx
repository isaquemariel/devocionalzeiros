import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mascot3D } from "@/components/shared/Mascot3D";

const LandingHeader = () => {
  return (
    <header className="relative top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left - Animated Mascot (idle, no particles) with speech bubble */}
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex-shrink-0"
            >
              <Mascot3D mood="idle" size="xs" />
            </motion.div>
            <div className="relative rounded-2xl px-3 py-1.5 bg-gradient-to-br from-[#1A2E50] to-[#243B63] text-blue-100 shadow-[0_4px_20px_rgba(59,130,246,0.3)] border border-blue-400/30">
              <span className="text-xs font-semibold whitespace-nowrap">Vamos juntos? 🙏</span>
              {/* Tail pointing to mascot */}
              <div className="absolute left-[-7px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[7px] border-r-[#1A2E50]" />
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
