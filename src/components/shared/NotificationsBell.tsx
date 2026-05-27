import { useNavigate } from "react-router-dom";
import { Bell, Check, CheckCheck, Trash2, Megaphone, MessageCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNotifications } from "@/hooks/useNotifications";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface Props {
  userId?: string;
}

export function NotificationsBell({ userId }: Props) {
  const navigate = useNavigate();
  const { items, unreadCount, markAsRead, markAllAsRead, remove } = useNotifications(userId);

  const handleClick = async (n: typeof items[number]) => {
    if (!n.is_read) await markAsRead(n.id);
    if (n.link) navigate(n.link);
  };

  const iconFor = (type: string) => {
    if (type === "admin_broadcast") return <Megaphone className="w-4 h-4 text-amber-500" />;
    if (type === "community_reply") return <MessageCircle className="w-4 h-4 text-emerald-500" />;
    return <Bell className="w-4 h-4 text-primary" />;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="relative p-2.5 rounded-xl bg-muted/10 hover:bg-muted/20 border border-border/30 hover:border-border/50 transition-all"
          title="Notificações"
        >
          <Bell className="w-5 h-5 text-muted-foreground" />
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow-lg"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </motion.span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[92vw] sm:w-96 p-0 max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">Notificações</h3>
            {unreadCount > 0 && (
              <span className="text-xs text-muted-foreground">({unreadCount} novas)</span>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs gap-1"
              onClick={markAllAsRead}
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Marcar todas
            </Button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="py-10 px-6 text-center text-sm text-muted-foreground">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-30" />
              Você ainda não tem notificações
            </div>
          ) : (
            <ul className="divide-y divide-border/40">
              {items.map((n) => (
                <li
                  key={n.id}
                  className={cn(
                    "group relative px-4 py-3 hover:bg-muted/10 cursor-pointer transition-colors",
                    !n.is_read && "bg-primary/5"
                  )}
                  onClick={() => handleClick(n)}
                >
                  <div className="flex gap-3">
                    <div className="mt-0.5 shrink-0">{iconFor(n.type)}</div>
                    <div className="min-w-0 flex-1">
                      <p className={cn("text-sm leading-snug", !n.is_read && "font-semibold")}>
                        {n.title}
                      </p>
                      {n.body && (
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                          {n.body}
                        </p>
                      )}
                      <p className="text-[10px] text-muted-foreground/70 mt-1">
                        {formatDistanceToNow(new Date(n.created_at), { addSuffix: true, locale: ptBR })}
                      </p>
                    </div>
                    {!n.is_read && (
                      <span className="mt-1 w-2 h-2 rounded-full bg-primary shrink-0" />
                    )}
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); remove(n.id); }}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
                    title="Apagar"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
