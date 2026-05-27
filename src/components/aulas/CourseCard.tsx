import { Link } from "react-router-dom";
import type { Curso } from "@/hooks/useAulas";
import { Lock, Play } from "lucide-react";
import { SUPPORT_WHATSAPP_URL } from "@/lib/aulasAuth";

interface Props {
  curso: Curso & { kiwify_product_id?: string | null; purchase_url?: string | null };
  locked?: boolean;
  fullWidth?: boolean;
}

export function CourseCard({ curso, locked, fullWidth }: Props) {
  const purchaseHref = (curso as any).purchase_url || SUPPORT_WHATSAPP_URL;

  const prefetch = () => {
    if (locked) return;
    if (curso.slug === "os-segredos-do-livro-de-enoque") {
      import("@/pages/AulasEnoque").catch(() => {});
    } else {
      import("@/pages/AulasCurso").catch(() => {});
    }
  };

  const base = fullWidth
    ? "group relative block aspect-[4/5] w-full overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:ring-amber-400/40 hover:shadow-[0_10px_30px_-10px_rgba(245,158,11,0.35)]"
    : "group relative block aspect-[4/5] w-[170px] flex-shrink-0 overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:ring-amber-400/40 hover:shadow-[0_10px_30px_-10px_rgba(245,158,11,0.35)] sm:w-[190px] md:w-[210px]";

  const inner = (
    <>
      {/* Cover */}
      {curso.cover_url ? (
        <img
          src={curso.cover_url}
          alt={curso.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/40 via-orange-700/30 to-black" />
      )}

      {/* Bottom gradient for legibility */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/70 to-transparent" />

      {locked ? (
        <>
          {/* Subtle lock chip — no aggressive overlay, no title (capa já tem) */}
          <span className="absolute right-2 top-2 inline-flex h-7 items-center gap-1 rounded-full bg-black/70 px-2 text-[10px] font-semibold uppercase tracking-wider text-amber-300 ring-1 ring-white/15 backdrop-blur-md">
            <Lock className="h-3 w-3" /> Bloqueado
          </span>
        </>
      ) : (
        <>
          {/* Play badge — appears on hover only */}
          <span className="absolute right-2 top-2 hidden h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 ring-1 ring-white/20 backdrop-blur-md transition-opacity group-hover:opacity-100 sm:inline-flex">
            <Play className="h-3.5 w-3.5 translate-x-[1px] fill-current" />
          </span>
        </>
      )}
    </>
  );

  if (locked) {
    return (
      <a href={purchaseHref} target="_blank" rel="noopener noreferrer" className={base}>
        {inner}
      </a>
    );
  }
  const targetPath = curso.slug === "os-segredos-do-livro-de-enoque"
    ? "/aulas/enoque"
    : `/aulas/curso/${curso.slug}`;
  return (
    <Link to={targetPath} className={base} onMouseEnter={prefetch} onTouchStart={prefetch}>
      {inner}
    </Link>
  );
}
