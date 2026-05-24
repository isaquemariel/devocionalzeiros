import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  MessageCircle,
  Send,
  Loader2,
  Trash2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  CommunityPost,
  createCommunityReply,
  deleteCommunityPost,
  deleteCommunityReply,
  markPostAnswered,
  useCommunityReplies,
} from "@/hooks/useCommunity";
import { cn } from "@/lib/utils";

interface Props {
  post: CommunityPost;
  currentUserId: string;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "agora";
  if (m < 60) return `${m}min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d`;
  return new Date(iso).toLocaleDateString("pt-BR");
}

function Avatar({ url, name }: { url: string | null; name: string }) {
  if (url) {
    return (
      <img
        src={url}
        alt={name}
        className="w-10 h-10 rounded-full object-cover border border-border"
      />
    );
  }
  const initial = (name || "?").trim().charAt(0).toUpperCase();
  return (
    <div className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold border border-primary/20">
      {initial}
    </div>
  );
}

export function CommunityPostCard({ post, currentUserId }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const { replies, loading } = useCommunityReplies(expanded ? post.id : null);

  const isOwner = post.user_id === currentUserId;
  const isPrayer = post.post_type === "prayer";

  const handleSendReply = async () => {
    if (!replyText.trim()) return;
    setSending(true);
    const res = await createCommunityReply(currentUserId, post.id, replyText);
    setSending(false);
    if (!res.success) {
      if (res.error?.includes("Daily limit")) {
        toast.error("Você atingiu o limite diário de respostas. Faça upgrade para responder à vontade.");
      } else if (res.error?.includes("Feature blocked")) {
        toast.error("Recurso bloqueado para seu plano atual.");
      } else {
        toast.error(res.error || "Erro ao enviar resposta");
      }
      return;
    }
    setReplyText("");
    toast.success("Resposta enviada!");
  };

  const handleMarkAnswered = async () => {
    const res = await markPostAnswered(post.id);
    if (!res.success) {
      toast.error("Não foi possível marcar como respondido.");
      return;
    }
    toast.success("Pedido marcado como respondido! +5 pontos 🙌");
  };

  const handleDelete = async () => {
    if (!confirm("Excluir este post?")) return;
    const res = await deleteCommunityPost(post.id);
    if (!res.success) toast.error("Erro ao excluir.");
    else toast.success("Post excluído.");
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative rounded-2xl border bg-card/60 backdrop-blur-sm p-4 sm:p-5",
        post.is_answered
          ? "border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.12)]"
          : "border-border/60 hover:border-primary/30 transition-colors"
      )}
    >
      {post.is_answered && (
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
          <CheckCircle2 className="w-3 h-3" /> Respondido
        </div>
      )}

      <div className="flex items-start gap-3">
        <Avatar url={post.author_avatar} name={post.author_name} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-sm truncate">{post.author_name}</p>
            <span className="text-xs text-muted-foreground">· {timeAgo(post.created_at)}</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed whitespace-pre-wrap break-words">
            {post.content}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border/40 flex-wrap">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded((v) => !v)}
          className="h-8 px-2 text-xs gap-1.5"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          {post.reply_count} {post.reply_count === 1 ? "resposta" : "respostas"}
        </Button>

        {isPrayer && isOwner && !post.is_answered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleMarkAnswered}
            className="h-8 px-2 text-xs gap-1.5 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Marcar como respondido
          </Button>
        )}

        {isOwner && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="h-8 px-2 text-xs gap-1.5 text-destructive/80 hover:text-destructive ml-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 pt-3 border-t border-border/40 space-y-3">
              {loading ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                </div>
              ) : replies.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-2">
                  Seja o primeiro a {isPrayer ? "orar por essa pessoa" : "celebrar junto"}.
                </p>
              ) : (
                replies.map((r) => (
                  <div key={r.id} className="flex items-start gap-2.5 pl-1">
                    <Avatar url={r.author_avatar} name={r.author_name} />
                    <div className="flex-1 rounded-xl bg-muted/40 px-3 py-2">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-xs font-semibold truncate">{r.author_name}</p>
                        <span className="text-[10px] text-muted-foreground">
                          · {timeAgo(r.created_at)}
                        </span>
                        {r.user_id === currentUserId && (
                          <button
                            onClick={async () => {
                              const res = await deleteCommunityReply(r.id);
                              if (!res.success) toast.error("Erro ao excluir.");
                            }}
                            className="ml-auto text-muted-foreground/60 hover:text-destructive"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                      <p className="text-sm whitespace-pre-wrap break-words">{r.content}</p>
                    </div>
                  </div>
                ))
              )}

              <div className="flex items-end gap-2">
                <Textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value.slice(0, 1000))}
                  placeholder={isPrayer ? "Escreva uma palavra de oração..." : "Celebre junto..."}
                  rows={2}
                  className="resize-none text-sm bg-background/50"
                />
                <Button
                  size="icon"
                  onClick={handleSendReply}
                  disabled={sending || !replyText.trim()}
                  className="shrink-0"
                >
                  {sending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
