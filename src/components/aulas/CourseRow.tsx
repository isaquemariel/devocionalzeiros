import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Curso } from "@/hooks/useAulas";
import { CourseCard } from "./CourseCard";

interface Props {
  title: string;
  cursos: Curso[];
}

export function CourseRow({ title, cursos }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!ref.current) return;
    const offset = ref.current.clientWidth * 0.8;
    ref.current.scrollBy({ left: dir === "left" ? -offset : offset, behavior: "smooth" });
  };

  if (cursos.length === 0) return null;

  return (
    <section className="group/row relative space-y-3">
      <h2 className="px-4 font-montserrat text-xl font-bold text-white sm:px-6 md:text-2xl">{title}</h2>

      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-r-lg bg-black/60 p-2 text-white opacity-0 backdrop-blur transition-opacity group-hover/row:opacity-100 md:flex"
          aria-label="Anterior"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <div
          ref={ref}
          className="flex gap-3 overflow-x-auto px-4 pb-2 sm:px-6"
          style={{ scrollbarWidth: "none" }}
        >
          {cursos.map((c) => (
            <CourseCard key={c.id} curso={c} />
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-l-lg bg-black/60 p-2 text-white opacity-0 backdrop-blur transition-opacity group-hover/row:opacity-100 md:flex"
          aria-label="Próximo"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}
