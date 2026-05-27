import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings, LogOut, HelpCircle, ChevronLeft } from "lucide-react";

import { useAulasSession } from "@/hooks/useAulasSession";
import { SUPPORT_WHATSAPP_URL } from "@/lib/aulasAuth";
import logoOfficial from "@/assets/logo-icon.png";

export function AulasHeader() {
  const { session, signOut } = useAulasSession();
  const navigate = useNavigate();
  const location = useLocation();
  const isRoot = location.pathname === "/aulas" || location.pathname === "/aulas/";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-6">
        <div className="flex items-center gap-1">
          {!isRoot && (
            <button
              onClick={() => navigate(-1)}
              aria-label="Voltar"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/80 hover:bg-white/5 hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          <Link to="/aulas" className="flex items-center" aria-label="Início">
            <img src={logoOfficial} alt="Devocionalzeiros" className="h-10 w-10 rounded-lg object-contain" />
          </Link>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href={SUPPORT_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-white/80 hover:bg-white/5 hover:text-white sm:text-sm"
            title="Suporte via WhatsApp"
          >
            <HelpCircle className="h-4 w-4" />
            <span>Suporte</span>
          </a>

          {session?.is_admin && (
            <Button asChild variant="ghost" size="sm" className="text-white/80 hover:text-white">
              <Link to="/aulas/admin"><Settings className="mr-1.5 h-4 w-4" />Admin</Link>
            </Button>
          )}

          {session && (
            <Button
              size="sm" variant="ghost"
              onClick={() => { signOut(); navigate("/aulas/login"); }}
              className="text-white/60 hover:text-white"
              title="Sair"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
