import { Link } from "react-router-dom";
import type { Curso } from "@/hooks/useAulas";
import { PlayCircle, Lock } from "lucide-react";
import { SUPPORT_WHATSAPP_URL } from "@/lib/aulasAuth";

interface Props {
  curso: Curso & { kiwify_product_id?: string | null; purchase_url?: string | null };
  locked?: boolean;
  fullWidth?: boolean;
}

export function CourseCard({ curso, locked, fullWidth }: Props) {
  const purchaseHref = (curso as any).purchase_url || SUPPORT_WHATSAPP_URL;

  const inner = (
    <>
      {curso.cover_url ? (
        <img
          src={curso.cover_url} alt={curso.title} loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/40 via-orange-700/30 to-black" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {locked && (
        <>
          <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />
          <div className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 ring-1 ring-white/20">
            <Lock className="h-4 w-4 text-amber-400" />
          </div>
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-3">
            <h3 className="line-clamp-2 font-montserrat text-sm font-bold text-white">{curso.title}</h3>
            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-bold uppercase text-black">
              Adquirir
            </span>
          </div>
        </>
      )}

      {!locked && (
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3">
          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-2 font-montserrat text-sm font-bold text-white sm:text-base">{curso.title}</h3>
          </div>
          <PlayCircle className="h-7 w-7 flex-shrink-0 text-white/90 opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      )}
    </>
  );

  const base = fullWidth
    ? "group relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10 transition-all duration-300 hover:scale-[1.03] hover:ring-white/30"
    : "group relative aspect-[4/5] w-[170px] flex-shrink-0 overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10 transition-all duration-300 hover:scale-[1.03] hover:ring-white/30 sm:w-[190px] md:w-[210px]";

  if (locked) {
    return (
      <a href={purchaseHref} target="_blank" rel="noopener noreferrer" className={base}>
        {inner}
      </a>
    );
  }
  return (
    <Link to={`/aulas/curso/${curso.slug}`} className={base}>{inner}</Link>
  );
}
