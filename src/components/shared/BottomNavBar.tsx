import { useNavigate, useLocation } from "react-router-dom";
import { BookOpen, ShoppingBag, MessageCircle, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { differenceInDays, startOfYear } from "date-fns";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { toast } from "sonner";

const ChristianCross = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="5" y1="8" x2="19" y2="8" />
  </svg>
);

const navItems = [
  { id: "biblia", label: "Bíblia", icon: BookOpen, route: "/biblia-estudo" },
  { id: "devocional", label: "Devocional", icon: ChristianCross, route: "/devocional", queryToday: true },
  { id: "loja", label: "Loja", icon: ShoppingBag, route: "/loja", locked: true },
  { id: "ia", label: "IA", icon: MessageCircle, route: "/chat" },
];

function getTodayDayOfYear() {
  const now = new Date();
  return differenceInDays(now, startOfYear(now)) + 1;
}

export function BottomNavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin } = useAdminCheck();

  const handleNavigate = (item: typeof navItems[0]) => {
    if (item.locked && !isAdmin) {
      toast("Em breve! 🛍️", {
        description: "A Loja Devocionalzeiros está chegando. Fique ligado!",
      });
      return;
    }
    if (item.queryToday) {
      navigate(`${item.route}?dia=${getTodayDayOfYear()}`);
    } else {
      navigate(item.route);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/20 bg-background/80 backdrop-blur-xl safe-area-bottom">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.route;
          const isLocked = item.locked && !isAdmin;
          return (
            <button
              key={item.id}
              onClick={() => handleNavigate(item)}
              className={cn(
                "relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all min-w-[60px]",
                isLocked
                  ? "text-muted-foreground/40"
                  : isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="relative">
                <item.icon className={cn("w-5 h-5", isActive && !isLocked && "text-primary")} />
                {isLocked && (
                  <Lock className="absolute -top-1 -right-1.5 w-2.5 h-2.5 text-muted-foreground/60" />
                )}
              </div>
              <span className={cn(
                "text-[10px] font-medium",
                isLocked
                  ? "text-muted-foreground/40"
                  : isActive && "font-bold text-primary"
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
