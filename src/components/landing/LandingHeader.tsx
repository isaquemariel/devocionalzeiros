import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoOfficial from "@/assets/logo-icon.png";

const LandingHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left - Logo */}
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-amber-800/70 to-amber-950 flex items-center justify-center border border-amber-500/30 shadow-lg shadow-amber-900/20">
              <img src={logoOfficial} alt="Devocionalzeiros" style={{ width: 24, height: 24 }} className="object-contain drop-shadow-lg" />
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
