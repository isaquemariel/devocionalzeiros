import { Link } from "react-router-dom";
import { MessageCircle, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoHeader from "@/assets/logo-header.png";

const LandingHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logoHeader} alt="Devocionalzeiros" className="h-8 md:h-10" />
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="https://wa.me/5584999488698"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-destructive/10 hover:bg-destructive/20 text-destructive transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">Suporte</span>
            </a>
            <Link to="/auth">
              <Button variant="default" size="sm" className="gap-1.5 px-2.5 sm:px-3">
                <LogIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">Entrar</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
