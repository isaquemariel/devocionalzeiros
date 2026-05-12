import { useEffect, useState } from "react";
import { BookOpenCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRotinaResource } from "@/hooks/useRotinaData";
import type { RotinaWeeklyReview } from "@/components/rotina/types";
import { format, startOfWeek, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

const QUESTIONS: { key: keyof RotinaWeeklyReview; label: string; placeholder: string }[] = [
  { key: "gratitude", label: "1. O que Deus fez essa semana?", placeholder: "Liste 3 coisas pelas quais é grato..." },
  { key: "confessions", label: "2. Onde falhei?", placeholder: "Confesse e entregue ao Pai..." },
  { key: "learnings", label: "3. O que aprendi?", placeholder: "Lições que Deus te mostrou..." },
  { key: "next_focus", label: "4. Foco da próxima semana", placeholder: "Onde quer crescer..." },
  { key: "week_verse", label: "5. Versículo da semana", placeholder: "Ex: Filipenses 4:13" },
];

export const RotinaWeeklyReviewSection = ({ userId }: { userId: string }) => {
  const { data: reviews, create, update } = useRotinaResource<RotinaWeeklyReview>("rotina_weekly_reviews", userId, {
    orderBy: "week_start", ascending: false,
  });
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Partial<RotinaWeeklyReview>>({});

  const weekStart = format(startOfWeek(new Date(), { weekStartsOn: 0 }), "yyyy-MM-dd");
  const currentReview = reviews.find((r) => r.week_start === weekStart);

  useEffect(() => {
    if (currentReview) {
      setForm(currentReview);
    }
  }, [currentReview]);

  const handleSave = async () => {
    if (currentReview) {
      await update(currentReview.id, form);
    } else {
      await create({ ...form, week_start: weekStart } as any);
    }
    toast.success("Reflexão salva 🙏");
  };

  const q = QUESTIONS[step];
  const isLast = step === QUESTIONS.length - 1;

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="text-center">
        <BookOpenCheck className="w-10 h-10 text-primary mx-auto mb-2" />
        <h1 className="text-2xl font-display font-bold text-foreground">Reflexão Semanal</h1>
        <p className="text-sm text-muted-foreground">
          Semana de {format(parseISO(weekStart), "dd 'de' MMMM", { locale: ptBR })}
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-5">
        <div className="text-xs text-muted-foreground mb-2">Pergunta {step + 1} de {QUESTIONS.length}</div>
        <div className="font-semibold text-foreground mb-3">{q.label}</div>
        {q.key === "week_verse" ? (
          <Input
            placeholder={q.placeholder}
            value={(form[q.key] as string) || ""}
            onChange={(e) => setForm({ ...form, [q.key]: e.target.value })}
            maxLength={50}
          />
        ) : (
          <Textarea
            placeholder={q.placeholder}
            value={(form[q.key] as string) || ""}
            onChange={(e) => setForm({ ...form, [q.key]: e.target.value })}
            rows={5}
            maxLength={2000}
          />
        )}

        <div className="flex justify-between mt-4">
          <Button variant="ghost" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
            <ChevronLeft className="w-4 h-4 mr-1" /> Voltar
          </Button>
          {isLast ? (
            <Button onClick={handleSave}>Salvar reflexão</Button>
          ) : (
            <Button onClick={() => setStep(step + 1)}>
              Próxima <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </div>

      {reviews.filter((r) => r.week_start !== weekStart).length > 0 && (
        <div>
          <h2 className="text-sm font-semibold mb-2 text-foreground">Reflexões anteriores</h2>
          <div className="space-y-2">
            {reviews
              .filter((r) => r.week_start !== weekStart)
              .slice(0, 5)
              .map((r) => (
                <div key={r.id} className="p-3 rounded-lg bg-card border border-border text-sm">
                  <div className="font-medium">
                    Semana de {format(parseISO(r.week_start), "dd 'de' MMMM yyyy", { locale: ptBR })}
                  </div>
                  {r.week_verse && <div className="text-xs text-primary mt-1">{r.week_verse}</div>}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
