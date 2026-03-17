import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Lock, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { devotionals, AVAILABLE_DEVOTIONAL_DAYS } from "@/data/devotionals";
import { Button } from "@/components/ui/button";

const TOTAL_YEAR_DAYS = 365;

export const DevotionalsOverviewCard = () => {
  const [expanded, setExpanded] = useState(false);
  const [filter, setFilter] = useState<"all" | "available" | "locked">("all");

  const available = devotionals.length; // == AVAILABLE_DEVOTIONAL_DAYS
  const locked = TOTAL_YEAR_DAYS - available;

  const filtered = Array.from({ length: TOTAL_YEAR_DAYS }, (_, i) => {
    const day = i + 1;
    const devotional = devotionals[i];
    const isAvailable = day <= available;
    return { day, isAvailable, title: devotional?.title || null };
  }).filter((d) => {
    if (filter === "available") return d.isAvailable;
    if (filter === "locked") return !d.isAvailable;
    return true;
  });

  return (
    <Card className="mt-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <BookOpen className="w-5 h-5 text-primary" />
            Devocionais — Visão Geral
          </CardTitle>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="text-green-600 border-green-500/40 bg-green-500/10 gap-1">
              <CheckCircle className="w-3 h-3" />
              {available} disponíveis
            </Badge>
            <Badge variant="outline" className="text-muted-foreground gap-1">
              <Lock className="w-3 h-3" />
              {locked} bloqueados
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded((e) => !e)}
              className="h-7 px-2 text-xs"
            >
              {expanded ? (
                <><ChevronUp className="w-3.5 h-3.5 mr-1" />Recolher</>
              ) : (
                <><ChevronDown className="w-3.5 h-3.5 mr-1" />Ver todos</>
              )}
            </Button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>{available} de {TOTAL_YEAR_DAYS} dias cadastrados</span>
            <span>{Math.round((available / TOTAL_YEAR_DAYS) * 100)}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${(available / TOTAL_YEAR_DAYS) * 100}%` }}
            />
          </div>
        </div>
      </CardHeader>

      {expanded && (
        <CardContent className="pt-0">
          {/* Filter buttons */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {(["all", "available", "locked"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  filter === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {f === "all" ? "Todos" : f === "available" ? "✅ Disponíveis" : "🔒 Bloqueados"}
              </button>
            ))}
          </div>

          {/* Grid of days */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-[480px] overflow-y-auto pr-1">
            {filtered.map(({ day, isAvailable, title }) => (
              <div
                key={day}
                className={`rounded-lg border px-3 py-2 text-xs transition-all ${
                  isAvailable
                    ? "border-green-500/30 bg-green-500/5"
                    : "border-border/40 bg-muted/30 opacity-50"
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className={`font-bold text-sm ${isAvailable ? "text-green-500" : "text-muted-foreground"}`}>
                    #{day}
                  </span>
                  {isAvailable ? (
                    <CheckCircle className="w-3 h-3 text-green-500 shrink-0" />
                  ) : (
                    <Lock className="w-3 h-3 text-muted-foreground shrink-0" />
                  )}
                </div>
                <p className={`truncate leading-tight ${isAvailable ? "text-foreground" : "text-muted-foreground"}`}>
                  {title ?? "A cadastrar"}
                </p>
              </div>
            ))}
          </div>

          {filter === "locked" && locked > 0 && (
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Faltam <strong>{locked}</strong> devocionais para completar o ano.
            </p>
          )}
        </CardContent>
      )}
    </Card>
  );
};
