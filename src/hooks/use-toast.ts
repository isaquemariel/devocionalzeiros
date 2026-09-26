import type { ReactNode } from "react";
import { avisar } from "@/lib/avisos";

/**
 * Compatibilidade com o toast do shadcn: `toast({ title, description,
 * variant })` agora é o Devocionalzeiro falando (ver `lib/avisos`). Não há
 * mais caixinha no topo da tela — `toasts` fica sempre vazio.
 */
interface ToastInput {
  title?: ReactNode;
  description?: ReactNode;
  variant?: "default" | "destructive" | null;
  duration?: number;
}

const texto = (n: ReactNode) => (typeof n === "string" || typeof n === "number" ? String(n) : "");

function toast({ title, description, variant, duration }: ToastInput) {
  const t = texto(title), d = texto(description);
  const erro = variant === "destructive";
  avisar(erro ? "erro" : /parab|conseg|correto|salv|sucesso|pronto|entrou/i.test(t) ? "sucesso" : "info", t || d, {
    description: t ? d || undefined : undefined,
    duration,
  });
  return { id: "", dismiss: () => {}, update: () => {} };
}

function useToast() {
  return { toasts: [] as never[], toast, dismiss: (_id?: string) => {} };
}

export { useToast, toast };
