import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings, Home } from "lucide-react";
import { useAdminCheck } from "@/hooks/useAdminCheck";

export function AulasHeader() {
  const { isAdmin } = useAdminCheck();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/aulas" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 font-black text-black">
            D
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-montserrat text-base font-bold tracking-tight text-white">Devocionalzeiros</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">Área de membros</span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {isAdmin && (
            <Button asChild variant="ghost" size="sm" className="text-white/80 hover:text-white">
              <Link to="/aulas/admin">
                <Settings className="mr-1.5 h-4 w-4" />
                Admin
              </Link>
            </Button>
          )}
          <Button asChild variant="outline" size="sm" className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white">
            <Link to="/home">
              <Home className="mr-1.5 h-4 w-4" />
              App
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
