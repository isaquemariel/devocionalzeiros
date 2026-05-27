import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCursos } from "@/hooks/useAulas";
import { AulasHeader } from "@/components/aulas/AulasHeader";
import { CourseRow } from "@/components/aulas/CourseRow";
import { Button } from "@/components/ui/button";
import { PlayCircle, BookOpen } from "lucide-react";

export default function Aulas() {
  const { data: cursos, isLoading } = useCursos();

  useEffect(() => {
    document.title = "Aulas — Devocionalzeiros";
  }, []);

  const published = (cursos ?? []).filter((c) => c.is_published);
  const featured = published[0];

  return (
    <div className="min-h-screen bg-black text-white">
      <AulasHeader />

      {/* Hero */}
      {featured ? (
        <section className="relative h-[55vh] min-h-[420px] w-full overflow-hidden">
          {featured.cover_url ? (
            <img src={featured.cover_url} alt={featured.title} className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-amber-700 via-orange-900 to-black" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />

          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-12 sm:px-6 sm:pb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">Em destaque</p>
            <h1 className="mt-2 font-montserrat text-3xl font-black leading-tight text-white sm:text-5xl md:text-6xl md:max-w-2xl">
              {featured.title}
            </h1>
            {featured.description && (
              <p className="mt-3 max-w-xl text-sm text-white/80 sm:text-base">{featured.description}</p>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
                <Link to={`/aulas/curso/${featured.slug}`}>
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Assistir agora
                </Link>
              </Button>
            </div>
          </div>
        </section>
      ) : (
        <section className="flex h-[50vh] flex-col items-center justify-center px-6 text-center">
          <BookOpen className="mb-4 h-16 w-16 text-white/20" />
          <h1 className="font-montserrat text-3xl font-bold">Área de Membros</h1>
          <p className="mt-2 max-w-md text-white/60">
            {isLoading ? "Carregando aulas…" : "Nenhum curso publicado ainda."}
          </p>
        </section>
      )}

      {/* Linhas de cursos */}
      <div className="relative z-10 -mt-12 space-y-10 pb-24 sm:-mt-16 sm:space-y-12">
        {published.length > 0 && <CourseRow title="Todos os cursos" cursos={published} />}
      </div>

      <footer className="border-t border-white/5 py-8 text-center text-xs text-white/40">
        © Devocionalzeiros — Área de membros
      </footer>
    </div>
  );
}
