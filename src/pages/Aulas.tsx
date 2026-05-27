import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCursos } from "@/hooks/useAulas";
import { useAulasSettings } from "@/hooks/useAulasSettings";
import { useAulasSession } from "@/hooks/useAulasSession";
import { AulasHeader } from "@/components/aulas/AulasHeader";
import { CourseCard } from "@/components/aulas/CourseCard";
import { WhatsAppFloatingButton } from "@/components/aulas/WhatsAppFloatingButton";
import { Button } from "@/components/ui/button";
import { PlayCircle, BookOpen, Lock } from "lucide-react";
import { SUPPORT_WHATSAPP_URL } from "@/lib/aulasAuth";

export default function Aulas() {
  const { session } = useAulasSession();
  const isAdmin = !!session?.is_admin;
  const { data: cursos, isLoading } = useCursos(isAdmin);
  const { data: settings } = useAulasSettings();

  useEffect(() => {
    document.title = "Aulas — Devocionalzeiros";
  }, []);

  const visible = (cursos ?? []).filter((c: any) => isAdmin || c.is_published);
  const allowed = new Set(session?.allowed_curso_ids ?? []);
  const isLocked = (id: string) => !isAdmin && !allowed.has(id);

  const bannerCurso = settings?.banner_enabled
    ? visible.find((c: any) => c.id === settings?.banner_curso_id) ?? visible[0]
    : null;

  return (
    <div className="min-h-screen bg-black text-white">
      <AulasHeader />

      {bannerCurso && (
        <section className="relative w-full overflow-hidden">
          <div className="relative aspect-[1920/800] w-full">
            {settings?.banner_image_url ? (
              <img src={settings.banner_image_url} alt="" className="absolute inset-0 h-full w-full object-cover" />
            ) : bannerCurso.cover_url ? (
              <img src={bannerCurso.cover_url} alt="" className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-amber-700 via-orange-900 to-black" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />

            <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-8 sm:px-6 sm:pb-12">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-400 sm:text-xs">Em destaque</p>
              <h1 className="mt-2 font-montserrat text-2xl font-black leading-tight text-white sm:text-4xl md:text-5xl md:max-w-2xl">
                {settings?.banner_title_override || bannerCurso.title}
              </h1>
              {(settings?.banner_subtitle_override || bannerCurso.description) && (
                <p className="mt-2 max-w-xl text-xs text-white/80 sm:text-base">
                  {settings?.banner_subtitle_override || bannerCurso.description}
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
                {isLocked(bannerCurso.id) ? (
                  <Button asChild size="lg" className="bg-amber-500 text-black hover:bg-amber-400">
                    <a href={(bannerCurso as any).purchase_url || SUPPORT_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                      <Lock className="mr-2 h-5 w-5" /> Adquirir acesso
                    </a>
                  </Button>
                ) : (
                  <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
                    <Link to={`/aulas/curso/${bannerCurso.slug}`}>
                      <PlayCircle className="mr-2 h-5 w-5" /> Assistir agora
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6">
        {visible.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <BookOpen className="mb-3 h-12 w-12 text-white/20" />
            <p className="text-white/60">{isLoading ? "Carregando…" : "Nenhum curso publicado."}</p>
          </div>
        ) : (
          <>
            <h2 className="mb-4 font-montserrat text-lg font-bold sm:text-xl">Todos os cursos</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
              {visible.map((c: any) => (
                <div key={c.id} className="w-full">
                  <CourseCard curso={c} locked={isLocked(c.id)} fullWidth />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <footer className="border-t border-white/5 py-8 text-center text-xs text-white/40">
        © Devocionalzeiros — Área de membros
      </footer>

      <WhatsAppFloatingButton />
    </div>
  );
}
