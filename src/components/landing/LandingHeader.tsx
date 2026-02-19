import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoHeader from "@/assets/logo-new.png";
import mascotHappy from "@/assets/mascot-happy.png";

const LandingHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left - Mascot with speech bubble */}
          <div className="flex items-center gap-2">
            <img src={mascotHappy} alt="Mascote" className="h-10 w-10 rounded-full object-cover" />
            <div className="relative bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
              <span className="text-xs font-semibold text-primary whitespace-nowrap">Vamos juntos? 🙏</span>
              {/* Arrow pointing to mascot */}
              <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[6px] border-r-primary/20" />
            </div>
          </div>

          {/* Center - Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <img src={logoHeader} alt="Devocionalzeiros" className="h-8 md:h-10" />
          </Link>

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
