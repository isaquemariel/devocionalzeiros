import { useEffect } from "react";
import { Sun, ListChecks, Calendar, HandHeart, Pencil, Target, BookOpenCheck, X, Lock, Hexagon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RotinaSection } from "@/pages/Rotina";

interface Props {
  open: boolean;
  onClose: () => void;
  activeSection: RotinaSection;
  onChange: (s: RotinaSection) => void;
  freeSections: RotinaSection[];
  canAccessAll: boolean;
}

const NAV: { id: RotinaSection; label: string; icon: any; desc: string }[] = [
  { id: "today", label: "Hoje", icon: Sun, desc: "Painel do dia" },
  { id: "tasks", label: "Tarefas", icon: ListChecks, desc: "Sua lista" },
  { id: "prayers", label: "Oração", icon: HandHeart, desc: "Pedidos & testemunhos" },
  { id: "calendar", label: "Calendário", icon: Calendar, desc: "Eventos & compromissos" },
  { id: "habits", label: "Hábitos", icon: Hexagon, desc: "Rituais espirituais" },
  { id: "notes", label: "Notas", icon: Pencil, desc: "Estudos & sermões" },
  { id: "goals", label: "Metas", icon: Target, desc: "Roda da vida cristã" },
  { id: "review", label: "Reflexão", icon: BookOpenCheck, desc: "Revisão semanal" },
];

export const RotinaSidebar = ({ open, onClose, activeSection, onChange, freeSections, canAccessAll }: Props) => {
  useEffect(() => {
    if (typeof window === "undefined" || !open || window.innerWidth >= 1024) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [open]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[80] lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!open}
      >
        <button
          type="button"
          onClick={onClose}
          className={cn(
            "absolute inset-0 bg-background/95 backdrop-blur-md transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0"
          )}
          aria-label="Fechar menu da rotina"
        />

        <aside
          className={cn(
            "absolute inset-y-0 left-0 z-10 h-dvh w-full bg-card border-r border-border transform transition-transform duration-300 overflow-y-auto shadow-2xl",
            open ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="px-5 py-5 border-b border-border flex items-center justify-between">
            <div>
              <div className="font-display font-bold text-xl text-foreground tracking-tight">
                Devocionalzeiros
              </div>
              <div className="text-primary font-display font-bold text-2xl tracking-tight -mt-1">
                Rotina
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-muted/20 rounded-lg" aria-label="Fechar menu">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="p-3 space-y-1">
            {NAV.map((item) => {
              const Icon = item.icon;
              const isLocked = !canAccessAll && !freeSections.includes(item.id);
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left",
                    isActive ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-muted/20 hover:text-foreground"
                  )}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium flex items-center gap-2">
                      {item.label}
                      {isLocked && <Lock className="w-3 h-3 text-amber-400" />}
                    </div>
                    <div className="text-xs text-muted-foreground/70 truncate">{item.desc}</div>
                  </div>
                </button>
              );
            })}
          </nav>

          {!canAccessAll && (
            <div className="m-3 p-3 rounded-lg bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20">
              <div className="text-xs font-semibold text-amber-400 mb-1">Plano Free</div>
              <div className="text-xs text-muted-foreground">
                Calendário, Hábitos, Notas, Metas e Reflexão são exclusivos do Gold.
              </div>
            </div>
          )}
        </aside>
      </div>

      <aside className="hidden lg:flex lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:flex-col lg:bg-card lg:border-r lg:border-border lg:overflow-y-auto">
        <div className="px-5 py-5 border-b border-border flex items-center justify-between">
          <div>
            <div className="font-display font-bold text-xl text-foreground tracking-tight">
              Devocionalzeiros
            </div>
            <div className="text-primary font-display font-bold text-2xl tracking-tight -mt-1">
              Rotina
            </div>
          </div>
        </div>

        <nav className="p-3 space-y-1">
          {NAV.map((item) => {
            const Icon = item.icon;
            const isLocked = !canAccessAll && !freeSections.includes(item.id);
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left",
                  isActive ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-muted/20 hover:text-foreground"
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium flex items-center gap-2">
                    {item.label}
                    {isLocked && <Lock className="w-3 h-3 text-amber-400" />}
                  </div>
                  <div className="text-xs text-muted-foreground/70 truncate">{item.desc}</div>
                </div>
              </button>
            );
          })}
        </nav>

        {!canAccessAll && (
          <div className="m-3 p-3 rounded-lg bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20">
            <div className="text-xs font-semibold text-amber-400 mb-1">Plano Free</div>
            <div className="text-xs text-muted-foreground">
              Calendário, Hábitos, Notas, Metas e Reflexão são exclusivos do Gold.
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
