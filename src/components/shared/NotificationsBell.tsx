import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, CheckCheck, Trash2, Megaphone, MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNotifications } from "@/hooks/useNotifications";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface Props {
  userId?: string;
}

/** Quantas cabem na janela sem rolar. O resto vem na rolagem. */
const VISIVEIS = 3;

export function NotificationsBell({ userId }: Props) {
  const navigate = useNavigate();
  const [aberto, setAberto] = useState(false);
  const { items, unreadCount, markAsRead, markAllAsRead, remove } = useNotifications(userId);

  // a janela mostra EXATAMENTE três notificações; as outras ficam na rolagem.
  // A altura vem das três primeiras medidas de verdade — o texto de cada uma
  // tem tamanho diferente, então um valor fixo cortaria umas e sobraria noutras.
  // ref de CALLBACK: o conteúdo do diálogo entra por portal, num commit
  // posterior ao clique — com `useRef` a medição rodava com a lista ainda nula
  // e nunca mais era refeita.
  const [lista, setLista] = useState<HTMLUListElement | null>(null);
  const [teto, setTeto] = useState<number>();
  useLayoutEffect(() => {
    if (!lista) { setTeto(undefined); return; }
    const medir = () => {
      const filhos = Array.from(lista.children) as HTMLElement[];
      if (filhos.length <= VISIVEIS) { setTeto(undefined); return; }
      setTeto(filhos.slice(0, VISIVEIS).reduce((soma, li) => soma + li.offsetHeight, 0));
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(lista);
    return () => ro.disconnect();
  }, [lista, items]);

  const handleClick = async (n: typeof items[number]) => {
    if (!n.is_read) await markAsRead(n.id);
    if (n.link) { setAberto(false); navigate(n.link); }
  };

  const iconFor = (type: string) => {
    if (type === "admin_broadcast") return <Megaphone className="w-4 h-4 text-amber-500" />;
    if (type === "community_reply") return <MessageCircle className="w-4 h-4 text-emerald-500" />;
    return <Bell className="w-4 h-4 text-primary" />;
  };

  return (
    <Dialog open={aberto} onOpenChange={setAberto}>
      <DialogTrigger asChild>
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
      </DialogTrigger>

      {/* painel CENTRALIZADO na tela — antes o popover abria colado no sino e
          tomava a tela inteira no celular. */}
      <DialogContent aria-describedby={undefined} className="top-1/2 -translate-y-1/2 w-[min(92vw,26rem)] max-w-none p-0 gap-0 overflow-hidden rounded-2xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
          <div className="flex min-w-0 items-center gap-2">
            <Bell className="w-4 h-4 shrink-0 text-primary" />
            <DialogTitle className="shrink-0 font-semibold text-sm">Notificações</DialogTitle>
            {unreadCount > 0 && (
              <span
                title={`${unreadCount} não lidas`}
                className="shrink-0 rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary"
              >
                {unreadCount}
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 shrink-0 gap-1 px-2 text-[11px] mr-6"
              onClick={markAllAsRead}
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Ler todas
            </Button>
          )}
        </div>

        <div className="overflow-y-auto overscroll-contain" style={teto ? { maxHeight: teto } : undefined}>
          {items.length === 0 ? (
            <div className="py-10 px-6 text-center text-sm text-muted-foreground">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-30" />
              Você ainda não tem notificações
            </div>
          ) : (
            <ul ref={setLista} className="divide-y divide-border/40">
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
                      <p className={cn("text-sm leading-snug pr-1", !n.is_read && "font-semibold")}>
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
                    <div className="flex flex-col items-center gap-1.5 shrink-0">
                      {/* lixeira SEMPRE visível (no celular não existe hover) */}
                      <button
                        onClick={(e) => { e.stopPropagation(); remove(n.id); }}
                        className="p-1.5 rounded-lg bg-muted/15 border border-border/40 text-muted-foreground hover:text-destructive hover:bg-destructive/10 hover:border-destructive/40 active:scale-90 transition-all"
                        title="Apagar notificação"
                        aria-label="Apagar notificação"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      {!n.is_read && (
                        <span className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > VISIVEIS && (
          <div className="px-4 py-1.5 text-center text-[10px] text-muted-foreground/70 border-t border-border/40">
            role para ver as outras
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
