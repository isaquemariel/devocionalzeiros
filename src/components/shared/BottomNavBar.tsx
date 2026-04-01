import { useNavigate, useLocation } from "react-router-dom";
import { BookOpen, ShoppingBag, MessageCircle, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { differenceInDays, startOfYear } from "date-fns";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { toast } from "sonner";

const ChristianCross = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
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
        <div className="max-w-lg mx-auto flex items-center justify-around py-2.5 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.route;
          const isLocked = item.locked && !isAdmin;
          return (
            <button
              key={item.id}
              onClick={() => handleNavigate(item)}
              className={cn(
                "relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all border",
                isLocked
                  ? "text-muted-foreground/40 border-border/20 bg-muted/5"
                  : isActive
                    ? "text-primary border-primary/30 bg-primary/8"
                    : "text-muted-foreground border-border/30 bg-muted/8 hover:text-foreground hover:border-border/40 hover:bg-muted/15"
              )}
              style={{ minWidth: "clamp(60px, 16vw, 80px)" }}
            >
              <div className="relative">
                <item.icon
                  className={cn(isActive && !isLocked && "text-primary")}
                  style={{ width: "clamp(22px, 6vw, 28px)", height: "clamp(22px, 6vw, 28px)" }}
                />
                {isLocked && (
                  <Lock className="absolute -top-1 -right-2 text-muted-foreground/60" style={{ width: "clamp(10px, 2.8vw, 14px)", height: "clamp(10px, 2.8vw, 14px)" }} />
                )}
              </div>
              <span className={cn(
                "font-medium",
                isLocked
                  ? "text-muted-foreground/40"
                  : isActive && "font-bold text-primary"
              )} style={{ fontSize: "clamp(10px, 2.8vw, 13px)" }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
