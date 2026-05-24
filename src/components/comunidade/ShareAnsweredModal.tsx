import { useState } from "react";
import { Loader2, Award } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createCommunityPost } from "@/hooks/useCommunity";

interface Props {
  open: boolean;
  onClose: () => void;
  prayerId: string;
  prayerContent: string;
  userId: string;
  onShared?: () => void;
}

export function ShareAnsweredModal({ open, onClose, prayerId, prayerContent, userId, onShared }: Props) {
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);

  const handleShare = async () => {
    if (!content.trim()) {
      toast.error("Escreva uma mensagem de gratidão.");
      return;
    }
    setSending(true);
    const res = await createCommunityPost(userId, "thanks", content, prayerId);
    setSending(false);
    if (!res.success) {
      toast.error(res.error || "Erro ao compartilhar.");
      return;
    }
    setContent("");
    onShared?.();
    toast.success("Vitória compartilhada com a comunidade! 🙌");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-5 h-5 text-emerald-400" />
            <DialogTitle>Compartilhar a vitória</DialogTitle>
          </div>
          <DialogDescription>
            Conte como Deus respondeu seu pedido. Seu agradecimento ficará vinculado ao pedido original para inspirar a comunidade.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-xl border border-border/60 bg-muted/40 p-3 text-xs">
          <p className="font-semibold text-muted-foreground mb-1">Pedido original:</p>
          <p className="text-foreground/80 line-clamp-3">{prayerContent}</p>
        </div>

        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value.slice(0, 500))}
          placeholder="Como Deus respondeu seu pedido? Compartilhe sua gratidão..."
          rows={4}
          className="resize-none"
        />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{content.length}/500</span>
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="ghost" onClick={onClose}>Agora não</Button>
          <Button onClick={handleShare} disabled={sending} className="gap-2">
            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Award className="w-4 h-4" />}
            Compartilhar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
