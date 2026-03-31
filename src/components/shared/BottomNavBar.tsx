import { useNavigate, useLocation } from "react-router-dom";
import { BookOpen, Cross, ShoppingBag, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { differenceInDays, startOfYear } from "date-fns";

const navItems = [
  { id: "biblia", label: "Bíblia", icon: BookOpen, route: "/biblia-estudo" },
  { id: "devocional", label: "Devocional", icon: Cross, route: "/devocional", queryToday: true },
  { id: "loja", label: "Loja", icon: ShoppingBag, route: "/loja" },
  { id: "ia", label: "IA", icon: MessageCircle, route: "/chat" },
];

function getTodayDayOfYear() {
  const now = new Date();
  return differenceInDays(now, startOfYear(now)) + 1;
}

export function BottomNavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (item: typeof navItems[0]) => {
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
          return (
            <button
              key={item.id}
              onClick={() => handleNavigate(item)}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all min-w-[60px]",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive && "text-primary")} />
              <span className={cn("text-[10px] font-medium", isActive && "font-bold text-primary")}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
