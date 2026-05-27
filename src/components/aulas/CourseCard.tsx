import { Link } from "react-router-dom";
import type { Curso } from "@/hooks/useAulas";
import { PlayCircle } from "lucide-react";

interface Props {
  curso: Curso;
}

export function CourseCard({ curso }: Props) {
  return (
    <Link
      to={`/aulas/curso/${curso.slug}`}
      className="group relative aspect-[16/9] w-[280px] flex-shrink-0 overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10 transition-all duration-300 hover:scale-[1.04] hover:ring-white/30 sm:w-[320px] md:w-[360px]"
    >
      {curso.cover_url ? (
        <img
          src={curso.cover_url}
          alt={curso.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/30 via-orange-700/20 to-black" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-montserrat text-base font-bold text-white sm:text-lg">{curso.title}</h3>
          {curso.description && (
            <p className="mt-1 line-clamp-2 text-xs text-white/70">{curso.description}</p>
          )}
        </div>
        <PlayCircle className="h-9 w-9 flex-shrink-0 text-white/90 opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
    </Link>
  );
}
