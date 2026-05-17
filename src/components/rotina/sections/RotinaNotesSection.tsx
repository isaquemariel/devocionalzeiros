import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, Star, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRotinaResource } from "@/hooks/useRotinaData";
import { NOTE_CATEGORIES } from "@/components/rotina/constants";
import type { RotinaNote } from "@/components/rotina/types";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

export const RotinaNotesSection = ({ userId }: { userId: string }) => {
  const navigate = useNavigate();
  const { data: notes, update, remove } = useRotinaResource<RotinaNote>("rotina_notes", userId, {
    orderBy: "updated_at", ascending: false,
  });
  const [search, setSearch] = useState("");

  const filtered = notes.filter((n) =>
    !search ||
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase()) ||
    (n.location || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Notas & Estudos</h1>
          <p className="text-sm text-muted-foreground">Capture o que Deus está falando.</p>
        </div>
        <Button onClick={() => navigate("/rotina/notas/nova")} size="sm">
          <Plus className="w-4 h-4 mr-1" /> Nota
        </Button>
      </div>

      <Input placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} />

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground text-sm">
          {notes.length === 0 ? "Sua primeira nota está esperando." : "Nada encontrado."}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {filtered.map((n) => {
            const noteDate = (n as any).note_date || n.updated_at;
            return (
              <div key={n.id} className="p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between mb-2 gap-2">
                  <button onClick={() => navigate(`/rotina/notas/${n.id}`)} className="flex-1 text-left min-w-0">
                    <div className="flex items-center gap-2">
                      {n.is_favorite && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />}
                      <span className="font-semibold text-sm truncate">{n.title}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5 truncate">
                      {NOTE_CATEGORIES.find((c) => c.value === n.category)?.label} ·{" "}
                      {format(parseISO(noteDate), "dd MMM yyyy", { locale: ptBR })}
                    </div>
                    {n.location && (
                      <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 shrink-0" /> {n.location}
                      </div>
                    )}
                  </button>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => update(n.id, { is_favorite: !n.is_favorite } as any)} className="p-1 hover:bg-muted/30 rounded">
                      <Star className={cn("w-3.5 h-3.5", n.is_favorite ? "text-amber-400 fill-amber-400" : "text-muted-foreground")} />
                    </button>
                    <button onClick={() => remove(n.id)} className="p-1 hover:bg-destructive/20 rounded">
                      <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-3 whitespace-pre-line">{n.content}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
