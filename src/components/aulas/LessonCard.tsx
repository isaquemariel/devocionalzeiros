import { Link } from "react-router-dom";
import { PlayCircle, Clock } from "lucide-react";
import type { Aula } from "@/hooks/useAulas";
import { getYouTubeThumb } from "@/lib/youtubeUtils";

interface Props {
  aula: Aula;
  index?: number;
}

export function LessonCard({ aula, index }: Props) {
  const thumb = aula.cover_url ?? (aula.youtube_url ? getYouTubeThumb(aula.youtube_url) : null);

  return (
    <Link
      to={`/aulas/aula/${aula.id}`}
      className="group flex gap-3 overflow-hidden rounded-xl border border-white/5 bg-white/[0.03] p-3 transition-all hover:border-white/15 hover:bg-white/[0.07]"
    >
      <div className="relative aspect-video h-20 flex-shrink-0 overflow-hidden rounded-lg bg-black sm:h-24">
        {thumb ? (
          <img src={thumb} alt={aula.title} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-amber-600/30 to-black" />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
          <PlayCircle className="h-8 w-8 text-white" />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <p className="text-[11px] uppercase tracking-wider text-white/40">
          Aula {typeof index === "number" ? String(index + 1).padStart(2, "0") : ""}
        </p>
        <h4 className="line-clamp-2 font-medium text-white">{aula.title}</h4>
        {aula.duration_minutes && (
          <p className="mt-1 flex items-center gap-1 text-xs text-white/50">
            <Clock className="h-3 w-3" />
            {aula.duration_minutes} min
          </p>
        )}
      </div>
    </Link>
  );
}
