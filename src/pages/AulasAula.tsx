import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAula } from "@/hooks/useAulas";
import { AulasHeader } from "@/components/aulas/AulasHeader";
import { YouTubePlayer } from "@/components/aulas/YouTubePlayer";
import { PdfAttachmentList } from "@/components/aulas/PdfAttachmentList";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";

export default function AulasAula() {
  const { id = "" } = useParams();
  const { data, isLoading } = useAula(id);

  useEffect(() => {
    if (data?.aula) document.title = `${data.aula.title} — Aula`;
  }, [data]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <AulasHeader />
        <div className="p-10 text-center text-white/50">Carregando…</div>
      </div>
    );
  }

  if (!data?.aula) {
    return (
      <div className="min-h-screen bg-black text-white">
        <AulasHeader />
        <div className="flex flex-col items-center justify-center p-10 text-center">
          <p className="text-white/70">Aula não encontrada.</p>
          <Button asChild variant="ghost" className="mt-4 text-white">
            <Link to="/aulas">Voltar</Link>
          </Button>
        </div>
      </div>
    );
  }

  const { aula, arquivos, modulo, siblings } = data;
  const idx = siblings.findIndex((s) => s.id === aula.id);
  const prev = idx > 0 ? siblings[idx - 1] : null;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null;
  const cursoSlug = modulo?.curso?.slug as string | undefined;

  return (
    <div className="min-h-screen bg-black text-white">
      <AulasHeader />

      <main className="mx-auto max-w-5xl px-4 py-6 pb-24 sm:px-6 sm:py-8">
        {cursoSlug && (
          <Link
            to={`/aulas/curso/${cursoSlug}`}
            className="mb-4 inline-flex items-center gap-1 text-sm text-white/60 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {modulo?.curso?.title ?? "Voltar ao curso"}
          </Link>
        )}

        {aula.youtube_url ? (
          <YouTubePlayer url={aula.youtube_url} title={aula.title} />
        ) : (
          <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-white/5 text-white/50">
            Sem vídeo cadastrado
          </div>
        )}

        <div className="mt-6 space-y-2">
          {modulo?.title && (
            <p className="text-xs uppercase tracking-[0.25em] text-amber-400">{modulo.title}</p>
          )}
          <h1 className="font-montserrat text-2xl font-bold sm:text-3xl">{aula.title}</h1>
          {aula.description && (
            <p className="whitespace-pre-line leading-relaxed text-white/75">{aula.description}</p>
          )}
        </div>

        {/* Anexos */}
        <section className="mt-8 space-y-3">
          <h2 className="font-montserrat text-lg font-bold">Materiais da aula</h2>
          <PdfAttachmentList arquivos={arquivos} />
        </section>

        {/* Navegação */}
        <nav className="mt-10 flex items-center justify-between gap-3">
          {prev ? (
            <Button asChild variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              <Link to={`/aulas/aula/${prev.id}`}>
                <ChevronLeft className="mr-1.5 h-4 w-4" />
                <span className="max-w-[140px] truncate sm:max-w-[220px]">{prev.title}</span>
              </Link>
            </Button>
          ) : <span />}
          {next ? (
            <Button asChild className="bg-amber-500 text-black hover:bg-amber-400">
              <Link to={`/aulas/aula/${next.id}`}>
                <span className="max-w-[140px] truncate sm:max-w-[220px]">{next.title}</span>
                <ChevronRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          ) : <span />}
        </nav>
      </main>
    </div>
  );
}
