import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { planoDeLeitura, MINUTOS_POR_CAPITULO } from "@/lib/jornada/plano";
import { COR, FONTE } from "./tema";

// ─── revelação do plano ─────────────────────────────────────────────────────

/**
 * O "seu plano": três cartões que entram um de cada vez. É a recompensa por
 * ter respondido — a pessoa vê o destino antes de criar a conta. A nota de
 * rodapé diz de onde sai a conta, porque é estimativa e se apresenta como tal.
 */
export function PlanoRevelado({ metaMin }: { metaMin: number }) {
  const reduzir = useReducedMotion();
  const p = useMemo(() => planoDeLeitura(metaMin), [metaMin]);
  const ritmo = p.capitulosPorDia.toLocaleString("pt-BR", { maximumFractionDigits: 1 });

  const cartoes = [
    { icone: "📖", titulo: "A Bíblia inteira", valor: p.biblia, cor: COR.azul },
    { icone: "✝️", titulo: "O Novo Testamento", valor: p.novoTestamento, cor: COR.verde },
    { icone: "🔥", titulo: "Seu ritmo", valor: `${ritmo} capítulos por dia`, cor: COR.ouroFundo },
  ];

  return (
    <div className="space-y-3" style={{ fontFamily: FONTE }}>
      {cartoes.map((c, i) => (
        <motion.div
          key={c.titulo}
          initial={reduzir ? false : { opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: reduzir ? 0 : 0.35 + i * 0.28, type: "spring", stiffness: 260, damping: 20 }}
          className="flex items-center gap-4 rounded-2xl border-2 px-4 py-4"
          style={{ background: COR.superficie, borderColor: COR.borda, borderBottomWidth: 4, borderBottomColor: COR.bordaFunda }}
        >
          <span className="text-[32px] leading-none" aria-hidden="true">{c.icone}</span>
          <span className="min-w-0 flex-1">
            <span className="block text-[13px] font-extrabold uppercase tracking-wide" style={{ color: COR.texto2 }}>{c.titulo}</span>
            <span className="block text-[20px] font-black leading-tight" style={{ color: c.cor }}>{c.valor}</span>
          </span>
        </motion.div>
      ))}
      <p className="px-1 pt-1 text-center text-[12px] font-semibold" style={{ color: COR.texto2 }}>
        Com {metaMin} minutos por dia, a uns {MINUTOS_POR_CAPITULO.toLocaleString("pt-BR")} min por capítulo.
      </p>
    </div>
  );
}

// ─── confete ────────────────────────────────────────────────────────────────

const CORES_CONFETE = [COR.azul, COR.ouro, COR.verde, "#FF6FAE", "#9B6BFF"];

/** Chuva de confete da celebração. Some para quem pediu menos movimento. */
export function Confete() {
  const reduzir = useReducedMotion();
  // posições estáveis por montagem — random a cada render faria o confete tremer
  const pedacos = useMemo(
    () =>
      Array.from({ length: 42 }, (_, i) => ({
        x: Math.random() * 100,
        atraso: Math.random() * 0.5,
        duracao: 2.2 + Math.random() * 1.6,
        giro: (Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 360),
        deriva: (Math.random() - 0.5) * 120,
        cor: CORES_CONFETE[i % CORES_CONFETE.length],
        largura: 7 + Math.random() * 6,
        redondo: i % 3 === 0,
      })),
    [],
  );
  if (reduzir) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">
      {pedacos.map((c, i) => (
        <motion.span
          key={i}
          className="absolute top-[-4%]"
          style={{
            left: `${c.x}%`,
            width: c.largura,
            height: c.redondo ? c.largura : c.largura * 1.6,
            background: c.cor,
            borderRadius: c.redondo ? "50%" : 2,
          }}
          initial={{ y: 0, x: 0, rotate: 0, opacity: 1 }}
          animate={{ y: "110vh", x: c.deriva, rotate: c.giro, opacity: [1, 1, 0.9, 0] }}
          transition={{ delay: c.atraso, duration: c.duracao, ease: [0.2, 0.6, 0.4, 1] }}
        />
      ))}
    </div>
  );
}

// ─── logo do Google ─────────────────────────────────────────────────────────

/** O "G" nas quatro cores oficiais, como pedem as diretrizes do botão. */
export function LogoGoogle({ tamanho = 20 }: { tamanho?: number }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}
