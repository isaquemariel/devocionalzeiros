import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useCursoCompleto } from "@/hooks/useAulas";
import { AulasHeader } from "@/components/aulas/AulasHeader";
import { LessonCard } from "@/components/aulas/LessonCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function AulasCurso() {
  const { slug = "" } = useParams();
  const { data, isLoading } = useCursoCompleto(slug);

  useEffect(() => {
    if (data?.curso) document.title = `${data.curso.title} — Aulas`;
  }, [data]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <AulasHeader />
        <div className="p-10 text-center text-white/50">Carregando…</div>
      </div>
    );
  }

  if (!data?.curso) {
    return (
      <div className="min-h-screen bg-black text-white">
        <AulasHeader />
        <div className="flex flex-col items-center justify-center p-10 text-center">
          <p className="text-white/70">Curso não encontrado.</p>
          <Button asChild variant="ghost" className="mt-4 text-white">
            <Link to="/aulas">Voltar</Link>
          </Button>
        </div>
      </div>
    );
  }

  const { curso, modulos, aulas } = data;

  return (
    <div className="min-h-screen bg-black text-white">
      <AulasHeader />

      {/* Capa do curso */}
      <section className="relative h-[42vh] min-h-[300px] w-full overflow-hidden">
        {curso.cover_url ? (
          <img src={curso.cover_url} alt={curso.title} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-amber-700 via-orange-900 to-black" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />

        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col justify-end px-4 pb-8 sm:px-6">
          <Link to="/aulas" className="mb-3 inline-flex w-fit items-center gap-1 text-sm text-white/70 hover:text-white">
            <ChevronLeft className="h-4 w-4" /> Voltar
          </Link>
          <h1 className="font-montserrat text-3xl font-black sm:text-5xl">{curso.title}</h1>
          {curso.description && <p className="mt-2 max-w-2xl text-white/80">{curso.description}</p>}
        </div>
      </section>

      {/* Módulos */}
      <div className="mx-auto max-w-5xl space-y-10 px-4 py-10 pb-24 sm:px-6">
        {modulos.length === 0 && (
          <div className="rounded-xl border border-white/5 bg-white/[0.03] p-8 text-center text-white/50">
            Nenhum módulo cadastrado ainda.
          </div>
        )}

        {modulos.map((mod) => {
          const aulasDoMod = aulas.filter((a) => a.modulo_id === mod.id && a.is_published);
          return (
            <section key={mod.id} className="space-y-4">
              <header>
                <h2 className="font-montserrat text-xl font-bold sm:text-2xl">{mod.title}</h2>
                {mod.description && <p className="mt-1 text-sm text-white/60">{mod.description}</p>}
              </header>

              {aulasDoMod.length === 0 ? (
                <p className="text-sm text-white/40">Sem aulas publicadas neste módulo.</p>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {aulasDoMod.map((aula, i) => (
                    <LessonCard key={aula.id} aula={aula} index={i} />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
