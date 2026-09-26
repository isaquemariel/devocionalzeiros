import { useId } from "react";
import {
  Award, Book, BookOpen, Brain, Calendar, CheckCircle2, Crown, Flame, Gem, Heart, Lock, Medal, Star, Target, Trophy, Zap,
} from "lucide-react";
import { RARIDADES, type IconeConquista, type Raridade } from "@/lib/conquistas";

const ICONES: Record<IconeConquista, React.ElementType> = {
  Award, Book, BookOpen, Brain, Calendar, CheckCircle2, Crown, Flame, Gem, Heart, Medal, Star, Target, Trophy, Zap,
};

/**
 * A MEDALHA de uma conquista — de metal, com fita, na cor da raridade (bronze,
 * azul, púrpura, ouro), no traço do RPG. Bloqueada, fica apagada e com
 * cadeado; pronta para resgate, brilha e pulsa; resgatada, ganha o selo.
 */
export function Medalha({
  icone, raridade, estado, tamanho = 64,
}: {
  icone: IconeConquista;
  raridade: Raridade;
  estado: "bloqueada" | "resgatavel" | "resgatada";
  tamanho?: number;
}) {
  const uid = useId().replace(/:/g, "");
  const r = RARIDADES[raridade];
  const Icone = ICONES[icone] ?? Award;
  const apagada = estado === "bloqueada";
  return (
    <div className="relative shrink-0" style={{ width: tamanho, height: tamanho * 1.18 }}>
      {estado === "resgatavel" && (
        <span
          className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full motion-safe:animate-pulse"
          style={{ width: tamanho * 1.25, height: tamanho * 1.25, background: `radial-gradient(circle, ${r.brilho} 0%, transparent 70%)` }}
        />
      )}
      <svg viewBox="0 0 64 76" width={tamanho} height={tamanho * 1.18} className="relative" style={{ filter: apagada ? "grayscale(0.85) brightness(0.55)" : undefined }} aria-hidden="true">
        <defs>
          <linearGradient id={`aro-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff6d8" />
            <stop offset="35%" stopColor={r.cor} />
            <stop offset="100%" stopColor="#3a2410" />
          </linearGradient>
          <radialGradient id={`disco-${uid}`} cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor={r.fundo} />
            <stop offset="100%" stopColor="#0b0805" />
          </radialGradient>
        </defs>
        {/* a fita */}
        <path d="M22 44 L14 74 L22 68 L27 75 L32 50 Z" fill={r.cor} opacity="0.85" />
        <path d="M42 44 L50 74 L42 68 L37 75 L32 50 Z" fill={r.cor} opacity="0.65" />
        {/* o metal */}
        <circle cx="32" cy="30" r="27" fill={`url(#aro-${uid})`} stroke="#0b0805" strokeWidth="2" />
        <circle cx="32" cy="30" r="20.5" fill={`url(#disco-${uid})`} stroke="#0b0805" strokeOpacity="0.6" strokeWidth="1.2" />
        <path d="M13 22 Q20 9 34 7" fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ top: tamanho * 1.18 * (30 / 76), color: apagada ? "#6b5a44" : r.cor }}>
        <Icone style={{ width: tamanho * 0.32, height: tamanho * 0.32 }} strokeWidth={2.4} />
      </span>
      {apagada && (
        <span className="absolute -bottom-0.5 -right-0.5 flex items-center justify-center rounded-full" style={{ width: tamanho * 0.34, height: tamanho * 0.34, background: "#20180d", boxShadow: "inset 0 0 0 1.5px #3a2c18" }}>
          <Lock style={{ width: tamanho * 0.17, height: tamanho * 0.17, color: "#9c8b68" }} strokeWidth={2.6} />
        </span>
      )}
      {estado === "resgatada" && (
        <span className="absolute -bottom-0.5 -right-0.5 flex items-center justify-center rounded-full" style={{ width: tamanho * 0.36, height: tamanho * 0.36, background: "#93d453", boxShadow: "0 0 0 2px #0b0805" }}>
          <CheckCircle2 style={{ width: tamanho * 0.24, height: tamanho * 0.24, color: "#0b0805" }} strokeWidth={3} />
        </span>
      )}
    </div>
  );
}
