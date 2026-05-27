import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings, LifeBuoy, LogOut } from "lucide-react";
import { useAulasSession } from "@/hooks/useAulasSession";
import { SUPPORT_WHATSAPP_URL } from "@/lib/aulasAuth";
import logoOfficial from "@/assets/logo-icon.png";

export function AulasHeader() {
  const { session, signOut } = useAulasSession();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/aulas" className="flex items-center gap-2">
          <img src={logoOfficial} alt="Devocionalzeiros" className="h-9 w-9 rounded-lg object-contain" />
          <div className="flex flex-col leading-none">
            <span className="font-montserrat text-base font-bold tracking-tight text-white">Devocionalzeiros</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">Área de membros</span>
          </div>
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href={SUPPORT_WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-white/80 hover:bg-white/5 hover:text-white sm:text-sm"
            title="Suporte via WhatsApp"
          >
            <LifeBuoy className="h-4 w-4" />
            <span className="hidden sm:inline">Suporte</span>
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
