import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  MessageCircle,
  Send,
  Loader2,
  Trash2,
  Sparkles,
  ShieldAlert,
  HandHeart,
  Pencil,
  X,
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
  updateCommunityPost,
  useCommunityReplies,
} from "@/hooks/useCommunity";
import { cn } from "@/lib/utils";
import { ShareAnsweredModal } from "./ShareAnsweredModal";

interface Props {
  post: CommunityPost;
  currentUserId: string;
  isAdmin?: boolean;
  onAdminModerate?: (target: { kind: "post" | "reply"; id: string; preview: string }) => void;
  onSwitchToThanks?: () => void;
  onLimitReached?: (info: { featureName: string }) => void;
}

const BRT_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

function formatBrasilia(iso: string): string {
  return BRT_FORMATTER.format(new Date(iso)).replace(",", " ·");
}

function minutesSince(iso: string): number {
  return (Date.now() - new Date(iso).getTime()) / 60000;
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

export function CommunityPostCard({ post, currentUserId, isAdmin, onAdminModerate, onSwitchToThanks, onLimitReached }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(post.content);
  const [savingEdit, setSavingEdit] = useState(false);
  const { replies, loading } = useCommunityReplies(expanded ? post.id : null);

  const isOwner = post.user_id === currentUserId;
  const isPrayer = post.post_type === "prayer";
  const canEdit = isOwner && minutesSince(post.created_at) < 5 && !post.is_answered;

  const handleSaveEdit = async () => {
    if (!editText.trim()) return;
    setSavingEdit(true);
    const res = await updateCommunityPost(post.id, editText);
    setSavingEdit(false);
    if (!res.success) {
      toast.error(res.error || "Erro ao editar");
      return;
    }
    toast.success("Publicação atualizada.");
    setEditing(false);
  };

  const handleSendReply = async () => {
    if (!replyText.trim()) return;
    setSending(true);
    const res = await createCommunityReply(currentUserId, post.id, replyText);
    setSending(false);
    if (!res.success) {
      if (res.limitReached || res.blocked) {
        onLimitReached?.({ featureName: "Resposta na comunidade" });
        return;
      }
      toast.error(res.error || "Erro ao enviar resposta");
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
    toast.success("Pedido marcado como respondido! +1 ponto 🙌");
    setShareOpen(true);
  };

  const handleDelete = async () => {
    if (!confirm("Excluir este post?")) return;
    const res = await deleteCommunityPost(post.id);
    if (!res.success) toast.error("Erro ao excluir.");
    else toast.success("Post excluído.");
  };

  return (
    <>
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
            <span className="text-[11px] text-muted-foreground">· {formatBrasilia(post.created_at)}</span>
          </div>
          {editing ? (
            <div className="mt-2 space-y-2">
              <Textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value.slice(0, 500))}
                rows={3}
                className="resize-none text-sm bg-background/50"
              />
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">{editText.length}/500</span>
                <div className="flex gap-1.5">
                  <Button size="sm" variant="ghost" onClick={() => { setEditing(false); setEditText(post.content); }} className="h-7 px-2 text-xs">
                    <X className="w-3 h-3" /> Cancelar
                  </Button>
                  <Button size="sm" onClick={handleSaveEdit} disabled={savingEdit || !editText.trim()} className="h-7 px-2 text-xs">
                    {savingEdit ? <Loader2 className="w-3 h-3 animate-spin" /> : "Salvar"}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-2 text-sm leading-relaxed whitespace-pre-wrap break-words">
              {post.content}
            </p>
          )}

          {post.linked_prayer_id && post.linked_prayer_content && (
            <div className="mt-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <HandHeart className="w-3 h-3 text-emerald-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Resposta ao pedido de {post.linked_prayer_author || "um irmão"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-3 italic">
                "{post.linked_prayer_content}"
              </p>
            </div>
          )}
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

        <div className="ml-auto flex items-center gap-1">
          {isAdmin && !isOwner && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                onAdminModerate?.({ kind: "post", id: post.id, preview: post.content })
              }
              className="h-8 px-2 text-xs gap-1.5 text-destructive/80 hover:text-destructive"
              title="Moderar"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
            </Button>
          )}
          {canEdit && !editing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditing(true)}
              className="h-8 px-2 text-xs gap-1.5 text-muted-foreground hover:text-foreground"
              title="Editar (até 5min)"
            >
              <Pencil className="w-3.5 h-3.5" />
            </Button>
          )}
          {isOwner && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="h-8 px-2 text-xs gap-1.5 text-destructive/80 hover:text-destructive"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
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
                          · {formatBrasilia(r.created_at)}
                        </span>
                        <div className="ml-auto flex items-center gap-1">
                          {isAdmin && r.user_id !== currentUserId && (
                            <button
                              onClick={() =>
                                onAdminModerate?.({ kind: "reply", id: r.id, preview: r.content })
                              }
                              className="text-muted-foreground/60 hover:text-destructive"
                              title="Moderar"
                            >
                              <ShieldAlert className="w-3 h-3" />
                            </button>
                          )}
                          {r.user_id === currentUserId && (
                            <button
                              onClick={async () => {
                                const res = await deleteCommunityReply(r.id);
                                if (!res.success) toast.error("Erro ao excluir.");
                              }}
                              className="text-muted-foreground/60 hover:text-destructive"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-sm whitespace-pre-wrap break-words">{r.content}</p>
                    </div>
                  </div>
                ))
              )}

              <div className="flex items-end gap-2">
                <Textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value.slice(0, 500))}
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
              <p className="text-[10px] text-muted-foreground text-right">{replyText.length}/500</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>

    {isPrayer && (
      <ShareAnsweredModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        prayerId={post.id}
        prayerContent={post.content}
        userId={currentUserId}
        onShared={() => onSwitchToThanks?.()}
      />
    )}
    </>
  );
}
