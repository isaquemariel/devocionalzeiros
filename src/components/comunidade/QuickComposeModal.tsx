import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { HandHeart, Sparkles, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { createCommunityPost, PostType } from "@/hooks/useCommunity";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
  userId: string;
  defaultType?: PostType;
  onPosted?: (type: PostType) => void;
  onLimitReached?: (info: { featureName: string; type: PostType }) => void;
}

export function QuickComposeModal({ open, onClose, userId, defaultType = "prayer", onPosted, onLimitReached }: Props) {
  const [type, setType] = useState<PostType>(defaultType);
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!content.trim()) return;
    setSending(true);
    const res = await createCommunityPost(userId, type, content);
    setSending(false);
    if (!res.success) {
      if (res.limitReached || res.blocked) {
        onClose();
        onLimitReached?.({
          featureName: type === "prayer" ? "Pedido de oração" : "Agradecimento",
          type,
        });
        return;
      }
      toast.error(res.error || "Erro ao publicar");
      return;
    }
    toast.success(type === "prayer" ? "Pedido publicado 🙏" : "Gratidão compartilhada ✨");
    setContent("");
    onPosted?.(type);
    onClose();
  };


  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Nova publicação</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setType("prayer")}
            className={cn(
              "flex items-center justify-center gap-2 rounded-xl border p-3 text-sm font-semibold transition-colors",
              type === "prayer"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border/60 text-muted-foreground hover:border-primary/40"
            )}
          >
            <HandHeart className="w-4 h-4" /> Pedido
          </button>
          <button
            type="button"
            onClick={() => setType("thanks")}
            className={cn(
              "flex items-center justify-center gap-2 rounded-xl border p-3 text-sm font-semibold transition-colors",
              type === "thanks"
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                : "border-border/60 text-muted-foreground hover:border-emerald-500/40"
            )}
          >
            <Sparkles className="w-4 h-4" /> Gratidão
          </button>
        </div>

        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value.slice(0, 500))}
          placeholder={
            type === "prayer"
              ? "Compartilhe seu pedido de oração..."
              : "Compartilhe uma gratidão, uma vitória..."
          }
          rows={5}
          className="resize-none mt-2"
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{content.length}/500</span>
          <Button onClick={handleSend} disabled={sending || !content.trim()} className="gap-2">
            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Publicar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
