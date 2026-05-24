import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createCommunityPost, PostType } from "@/hooks/useCommunity";

interface Props {
  userId: string;
  type: PostType;
}

const PROMPTS: Record<PostType, { placeholder: string; cta: string }> = {
  prayer: {
    placeholder: "Compartilhe seu pedido de oração com a comunidade...",
    cta: "Pedir oração",
  },
  thanks: {
    placeholder: "Compartilhe um agradecimento, uma vitória, uma resposta de Deus...",
    cta: "Compartilhar gratidão",
  },
};

export function CommunityComposer({ userId, type }: Props) {
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const prompt = PROMPTS[type];

  const handleSend = async () => {
    if (!content.trim()) return;
    setSending(true);
    const res = await createCommunityPost(userId, type, content);
    setSending(false);
    if (!res.success) {
      if (res.error?.includes("Daily limit")) {
        toast.error(
          type === "prayer"
            ? "Você já fez seu pedido de oração de hoje. Faça upgrade para postar sem limites."
            : "Você já compartilhou seu agradecimento de hoje. Faça upgrade para postar sem limites."
        );
      } else if (res.error?.includes("Feature blocked")) {
        toast.error("Recurso bloqueado para seu plano atual.");
      } else {
        toast.error(res.error || "Erro ao publicar");
      }
      return;
    }
    setContent("");
    toast.success(
      type === "prayer" ? "Pedido publicado. A comunidade orará por você 🙏" : "Gratidão compartilhada! +5 pontos ✨"
    );
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-4 mb-4"
    >
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value.slice(0, 2000))}
        placeholder={prompt.placeholder}
        rows={3}
        className="resize-none bg-background/50 border-border/40 focus-visible:ring-primary/40"
      />
      <div className="flex items-center justify-between mt-3">
        <span className="text-xs text-muted-foreground">
          {content.length}/2000
        </span>
        <Button onClick={handleSend} disabled={sending || !content.trim()} className="gap-2">
          {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          {prompt.cta}
        </Button>
      </div>
    </motion.div>
  );
}
