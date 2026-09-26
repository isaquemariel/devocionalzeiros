import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Respostas } from "@/lib/jornada/tipos";
import { planoDeLeitura } from "@/lib/jornada/plano";
import { FAMILIARIDADE, MOTIVOS } from "@/lib/jornada/roteiro";
import { Icone } from "./Icones";
import { COR, FONTE, MAO } from "./tema";

// ─── o sono ─────────────────────────────────────────────────────────────────

/** Os "z" que sobem da cabeça dele enquanto dorme — cada um de um tamanho. */
export function Zzz() {
  const reduzir = useReducedMotion();
  if (reduzir) return <span className="absolute -top-2 right-0 text-[22px]" style={{ fontFamily: MAO, color: "#FFFFFF" }}>z z</span>;
  return (
    <span className="pointer-events-none absolute inset-0" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute"
          style={{ right: "4%", top: "8%", fontFamily: MAO, fontWeight: 700, fontSize: 18 + i * 7, color: "#FFFFFF", textShadow: "0 2px 6px rgba(80,60,160,.35)" }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ opacity: [0, 1, 1, 0], x: [0, 10, 22, 30], y: [0, -18, -36, -54] }}
          transition={{ duration: 2.6, delay: i * 0.85, repeat: Infinity, ease: "easeOut" }}
        >
          z
        </motion.span>
      ))}
    </span>
  );
}

// ─── celebração ─────────────────────────────────────────────────────────────

const CORES_FESTA = ["#3E8BFF", "#9ED8FF", "#FFB21E", "#FFE08A", "#FF8FB1", "#FFFFFF"];

/**
 * A festa do fim: fagulhas azuis e douradas que explodem da chama dele e caem
 * devagar, como brasa de fogueira — não confete de aniversário.
 * `origem` é o ponto da chama, em px na tela.
 */
export function Festa({ origem }: { origem: { x: number; y: number } }) {
  const reduzir = useReducedMotion();
  const pedacos = useMemo(
    () =>
      Array.from({ length: 46 }, (_, i) => {
        const ang = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.25;
        const forca = 120 + Math.random() * 220;
        return {
          dx: Math.cos(ang) * forca,
          dy: Math.sin(ang) * forca,
          queda: 180 + Math.random() * 260,
          cor: CORES_FESTA[i % CORES_FESTA.length],
          r: 3 + Math.random() * 4,
          atraso: Math.random() * 0.25 + (i > 30 ? 0.7 : 0),
          dur: 1.8 + Math.random() * 1.2,
          estrela: i % 4 === 0,
        };
      }),
    [],
  );
  if (reduzir) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden="true">
      {pedacos.map((c, i) => (
        <motion.span
          key={i}
          className="absolute"
          style={{ left: origem.x, top: origem.y, width: c.r * 2, height: c.r * 2, marginLeft: -c.r, marginTop: -c.r }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
          animate={{ x: [0, c.dx, c.dx * 1.15], y: [0, c.dy, c.dy + c.queda], opacity: [0, 1, 0], scale: [0.4, 1, 0.6], rotate: c.estrela ? 200 : 0 }}
          transition={{ duration: c.dur, delay: c.atraso, ease: [0.15, 0.7, 0.4, 1], times: [0, 0.35, 1] }}
        >
          {c.estrela ? (
            <svg viewBox="0 0 10 10" className="h-full w-full"><path d="M5 0 6.2 3.8 10 5 6.2 6.2 5 10 3.8 6.2 0 5 3.8 3.8Z" fill={c.cor} /></svg>
          ) : (
            <span className="block h-full w-full rounded-full" style={{ background: c.cor, boxShadow: `0 0 8px ${c.cor}` }} />
          )}
        </motion.span>
      ))}
    </div>
  );
}

// ─── o diário ───────────────────────────────────────────────────────────────

/**
 * A página do diário de trilha: o que ele anotou no caminho, com a letra dele.
 * É o que a pessoa leva da jornada — e o compromisso que acabou de assumir,
 * dito de volta.
 */
export function Diario({ r }: { r: Respostas }) {
  const reduzir = useReducedMotion();
  const plano = r.meta_min ? planoDeLeitura(r.meta_min) : null;
  const fam = FAMILIARIDADE.find((o) => o.valor === r.familiaridade);
  const motivos = MOTIVOS.filter((m) => r.motivos?.includes(m.valor));
  const linhas = [
    plano && { rotulo: "o ritmo", valor: `${r.meta_min} min por dia` },
    plano && { rotulo: "a Bíblia inteira", valor: plano.biblia },
    fam && { rotulo: "a raiz", valor: fam.detalhe ?? fam.rotulo },
  ].filter(Boolean) as { rotulo: string; valor: string }[];

  return (
    <motion.div
      initial={reduzir ? false : { opacity: 0, y: 16, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: -1 }}
      transition={{ delay: reduzir ? 0 : 0.5, type: "spring", stiffness: 180, damping: 18 }}
      className="relative rounded-[6px] px-4 pb-3 pt-3"
      style={{
        background: `repeating-linear-gradient(180deg, transparent 0 25px, rgba(47,123,255,.12) 25px 26px), #FFFFFF`,
        boxShadow: `0 0 0 1px ${COR.papelBorda}, 2px 3px 0 ${COR.papelSombra}`,
        fontFamily: FONTE,
      }}
    >
      {/* fita adesiva segurando a página */}
      <span className="absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 rotate-[3deg] rounded-[2px]" style={{ background: "rgba(255,210,120,.65)" }} />
      <p className="text-[28px] leading-[26px]" style={{ fontFamily: MAO, fontWeight: 700, color: COR.tinta }}>
        Diário de {r.apelido?.trim().split(/\s+/)[0] ?? "trilha"}
      </p>
      <div className="mt-1">
        {linhas.map((l) => (
          <p key={l.rotulo} className="flex items-baseline justify-between gap-3 leading-[26px]">
            <span className="text-[20px]" style={{ fontFamily: MAO, color: COR.lapis }}>{l.rotulo}</span>
            <span className="text-[15px] font-extrabold" style={{ color: COR.tinta }}>{l.valor}</span>
          </p>
        ))}
        {motivos.length > 0 && (
          <p className="flex items-center justify-between gap-3 leading-[26px]">
            <span className="text-[20px]" style={{ fontFamily: MAO, color: COR.lapis }}>as lanternas</span>
            <span className="flex gap-1" style={{ color: "#D9781E" }}>
              {motivos.map((m) => <Icone key={m.valor} id={m.icone ?? "estrela"} tamanho={19} />)}
            </span>
          </p>
        )}
      </div>
    </motion.div>
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
