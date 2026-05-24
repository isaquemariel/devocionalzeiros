import { useState } from "react";
import { Loader2, ShieldAlert } from "lucide-react";
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
import { adminDeleteCommunityPost, adminDeleteCommunityReply } from "@/hooks/useCommunity";

interface Props {
  open: boolean;
  onClose: () => void;
  target: { kind: "post" | "reply"; id: string; preview: string } | null;
}

const PRESET_HOURS = [
  { label: "Só excluir", value: 0 },
  { label: "1 hora", value: 1 },
  { label: "24 horas", value: 24 },
  { label: "3 dias", value: 72 },
  { label: "7 dias", value: 168 },
];

export function AdminModerationModal({ open, onClose, target }: Props) {
  const [reason, setReason] = useState("");
  const [hours, setHours] = useState(0);
  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    if (!target) return;
    if (!reason.trim()) {
      toast.error("Informe o motivo.");
      return;
    }
    setSending(true);
    const res =
      target.kind === "post"
        ? await adminDeleteCommunityPost(target.id, reason.trim(), hours)
        : await adminDeleteCommunityReply(target.id, reason.trim(), hours);
    setSending(false);
    if (!res.success) {
      toast.error(res.error || "Erro ao moderar.");
      return;
    }
    toast.success(hours > 0 ? "Removido e usuário bloqueado." : "Removido e usuário notificado.");
    setReason("");
    setHours(0);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <ShieldAlert className="w-5 h-5 text-destructive" />
            <DialogTitle>Moderar conteúdo</DialogTitle>
          </div>
          <DialogDescription>
            O usuário será notificado com o motivo abaixo. Opcionalmente, escolha um tempo de bloqueio na comunidade.
          </DialogDescription>
        </DialogHeader>

        {target && (
          <div className="rounded-xl border border-border/60 bg-muted/40 p-3 text-xs max-h-24 overflow-y-auto">
            <p className="font-semibold text-muted-foreground mb-1">
              {target.kind === "post" ? "Post" : "Resposta"}:
            </p>
            <p className="text-foreground/80 whitespace-pre-wrap">{target.preview}</p>
          </div>
        )}

        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Motivo (visível ao usuário)</label>
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value.slice(0, 300))}
            placeholder="Ex.: Conteúdo fora do propósito da comunidade."
            rows={3}
            className="resize-none"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Bloqueio</label>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_HOURS.map((p) => (
              <button
                key={p.value}
                onClick={() => setHours(p.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                  hours === p.value
                    ? "bg-destructive/20 border-destructive/50 text-destructive"
                    : "bg-card/40 border-border/60 text-muted-foreground hover:border-border"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button variant="destructive" onClick={handleSubmit} disabled={sending} className="gap-2">
            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldAlert className="w-4 h-4" />}
            Confirmar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
