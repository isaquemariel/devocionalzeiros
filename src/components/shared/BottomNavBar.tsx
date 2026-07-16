import { useNavigate, useLocation } from "react-router-dom";
import { BookOpen, ShoppingBag, Users, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { getBrasiliaDayOfYear } from "@/lib/brasiliaDate";

const ChristianCross = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="5" y1="8" x2="19" y2="8" />
  </svg>
);

const navItems = [
  { id: "inicio", label: "Início", icon: Home, route: "/home" },
  { id: "biblia", label: "Bíblia", icon: BookOpen, route: "/biblia-estudo" },
  { id: "devocional", label: "Devocional", icon: ChristianCross, route: "/devocional", queryToday: true },
  { id: "loja", label: "Loja", icon: ShoppingBag, route: "/loja" },
  { id: "comunidade", label: "Comunidade", icon: Users, route: "/comunidade" },
];

function getTodayDayOfYear() {
  return getBrasiliaDayOfYear();
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
    <nav className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none safe-area-bottom">
      <div className="px-3 pb-3 pt-2 flex justify-center">
        <div
          className="pointer-events-auto relative flex items-center justify-between gap-1 px-2 py-2 rounded-full border border-white/10 bg-background/40 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_8px_32px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] w-full max-w-md"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, hsl(var(--background) / 0.55), hsl(var(--background) / 0.35))",
          }}
        >
          {/* glass sheen */}
          <div className="pointer-events-none absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          {navItems.map((item) => {
            const isActive =
              item.route === "/biblia-estudo"
                ? location.pathname === "/biblia-estudo" || location.pathname === "/biblia"
                : location.pathname === item.route ||
                  location.pathname.startsWith(item.route + "/") ||
                  (item.route === "/home" &&
                    ["/quiz", "/sermao", "/ranking"].includes(location.pathname));
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item)}
                className={cn(
                  "relative flex-1 flex flex-col items-center justify-center gap-0.5 px-1 py-1.5 rounded-full transition-all duration-300",
                  isActive
                    ? "text-primary bg-primary/10 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_4px_16px_hsl(var(--primary)/0.25)]"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon
                  className={cn("transition-transform", isActive && "scale-110")}
                  style={{ width: "clamp(20px, 5.5vw, 24px)", height: "clamp(20px, 5.5vw, 24px)" }}
                />
                <span
                  className={cn("font-medium leading-none", isActive && "font-semibold")}
                  style={{ fontSize: "clamp(9px, 2.4vw, 11px)" }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
