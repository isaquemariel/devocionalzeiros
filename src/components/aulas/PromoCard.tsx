import { ExternalLink } from "lucide-react";
import promoImg from "@/assets/aulas-promo-devocionalzeiros.png";

interface Props {
  fullWidth?: boolean;
}

export function PromoCard({ fullWidth }: Props) {
  const base = fullWidth
    ? "group relative block aspect-[4/5] w-full overflow-hidden rounded-xl bg-black ring-1 ring-amber-400/30 transition-all duration-300 hover:-translate-y-0.5 hover:ring-amber-400/60 hover:shadow-[0_10px_30px_-10px_rgba(245,158,11,0.5)]"
    : "group relative block aspect-[4/5] w-[170px] flex-shrink-0 overflow-hidden rounded-xl bg-black ring-1 ring-amber-400/30 transition-all duration-300 hover:-translate-y-0.5 hover:ring-amber-400/60 hover:shadow-[0_10px_30px_-10px_rgba(245,158,11,0.5)] sm:w-[190px] md:w-[210px]";

  return (
    <a
      href="https://devocionalzeiros.com.br"
      target="_blank"
      rel="noopener noreferrer"
      className={base}
      aria-label="Conheça a plataforma Devocionalzeiros"
    >
      <img
        src={promoImg}
        alt="Plataforma Devocionalzeiros"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      <span className="absolute left-2 top-2 inline-flex h-6 items-center rounded-full bg-amber-500/95 px-2 text-[9px] font-bold uppercase tracking-wider text-black shadow-md">
        Recomendado
      </span>

      <span className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-amber-300 opacity-0 ring-1 ring-amber-300/30 backdrop-blur-md transition-opacity group-hover:opacity-100">
        <ExternalLink className="h-3.5 w-3.5" />
      </span>

      <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3">
        <p className="text-center text-[10px] font-semibold uppercase tracking-wider text-amber-300 sm:text-xs">
          Conheça também
        </p>
        <p className="mt-0.5 text-center font-montserrat text-xs font-black leading-tight text-white sm:text-sm">
          Plataforma Devocionalzeiros
        </p>
      </div>
    </a>
  );
}
