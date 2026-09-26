import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown, Lock } from "lucide-react";
import type { Opcao } from "@/lib/jornada/tipos";
import {
  PRECOS, RECURSOS, diferencas, economiaAnual, formatBRL, incluidos, lerValor, resumo,
  type ChavePlano, type Recurso,
} from "@/lib/planos";
import { tocar } from "./Controles";
import { COR, FONTE } from "./tema";

export type Periodo = "monthly" | "annual";

/** a cor de cada plano — as mesmas do RPG (verde, ouro, roxo) */
const COR_PLANO: Record<ChavePlano, string> = { free: COR.verde, gold: COR.ouroClaro, premium: "#c084fc" };
/** de quem cada plano herda — o que ele mostra é só a diferença */
const HERDA: Record<ChavePlano, ChavePlano | null> = { free: null, gold: "free", premium: "gold" };
const TITULO: Record<ChavePlano, string> = { free: "O que já vem de graça", gold: "Tudo do Grátis, e mais:", premium: "Tudo do Gold, e mais:" };

interface Props {
  planos: Opcao[];
  /** o plano que a pessoa já tem (página de planos) — a aba ganha o selo */
  atual?: ChavePlano | null;
  plano: ChavePlano;
  periodo: Periodo;
  onPlano: (p: ChavePlano) => void;
  onPeriodo: (p: Periodo) => void;
  /** tocou num item: ele explica */
  onExplicar: (r: Recurso) => void;
  /** o botão de assinar/começar — fica PRESO embaixo, fora da rolagem */
  rodape: ReactNode;
}

/**
 * AS PORTAS DA CIDADE: a escolha do plano dentro da jornada.
 *
 * Feita para caber na tela sem rolar, com o botão sempre à vista:
 * - em cima, as três abas e o preço (começa no MENSAL — o valor anual,
 *   maior, assustava de cara; o anual fica a um toque, com a economia);
 * - no meio, SÓ O QUE MUDA: o Grátis mostra o que já vem; o Gold, "tudo do
 *   Grátis, e mais…"; o Premium, "tudo do Gold, e mais…". Selos em duas
 *   colunas; cada um, tocado, o Devocionalzeiro explica;
 * - "Ver tudo" abre a tabela completa do plano, rolando POR DENTRO deste
 *   miolo — o topo e o botão não se mexem;
 * - embaixo, o botão, fora da rolagem.
 */
export function Portas({ planos, atual = null, plano, periodo, onPlano, onPeriodo, onExplicar, rodape }: Props) {
  const reduzir = useReducedMotion();
  const [tudo, setTudo] = useState(false);
  const cor = COR_PLANO[plano];
  const preco = plano === "free" ? null : PRECOS[plano];
  const eco = preco ? economiaAnual(preco) : null;
  const pai = HERDA[plano];
  const selos = pai ? diferencas(pai, plano) : incluidos(plano);

  return (
    <div className="flex min-h-0 flex-1 flex-col" style={{ fontFamily: FONTE }}>
      {/* ── topo fixo: abas e preço ─────────────────────────────────────── */}
      <div className="shrink-0">
        <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Planos">
          {planos.map((o) => {
            const k = o.valor as ChavePlano;
            const marcado = k === plano;
            return (
              <button
                key={k}
                type="button"
                role="radio"
                aria-checked={marcado}
                onClick={() => { if (!marcado) { tocar(12); setTudo(false); onPlano(k); } }}
                className="relative flex flex-col items-center rounded-[10px] px-1 py-1.5 transition-transform active:scale-[0.97]"
                style={{ background: marcado ? COR.painelFundo : COR.campo, boxShadow: `inset 0 0 0 2px ${marcado ? COR_PLANO[k] : COR.borda}` }}
              >
                <span className="text-[12.5px] font-extrabold uppercase tracking-[0.08em]" style={{ color: marcado ? COR_PLANO[k] : COR.texto2 }}>{o.rotulo}</span>
                <span className="text-[10px] font-bold" style={{ color: COR.texto3 }}>{k === "free" ? "R$ 0" : `${PRECOS[k].monthlyPrice}/mês`}</span>
                {atual === k && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-1.5 text-[8.5px] font-extrabold uppercase tracking-[0.08em]" style={{ background: COR_PLANO[k], color: COR.tintaEscura }}>
                    Seu plano
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-2.5 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="flex items-baseline gap-1.5">
              <span className="text-[24px] font-extrabold leading-none" style={{ color: COR.texto }}>
                {!preco ? "R$ 0" : periodo === "annual" ? preco.annualPrice : preco.monthlyPrice}
              </span>
              <span className="text-[11.5px] font-bold" style={{ color: COR.texto3 }}>
                {!preco ? "para sempre" : periodo === "annual" ? "/ano" : "/mês"}
              </span>
            </p>
            <p className="mt-0.5 truncate text-[10.5px] font-bold" style={{ color: preco && periodo === "annual" ? COR.verde : COR.texto3 }}>
              {!preco ? "sem cartão de crédito"
                : periodo === "annual" ? `sai por ${formatBRL(eco!.porMes)}/mês (−${eco!.pct}%)`
                : `ou ${preco.annualPrice}/ano (−${eco!.pct}%)`}
            </p>
          </div>
          {preco && (
            <div className="flex shrink-0 rounded-full p-0.5" style={{ background: COR.campo, boxShadow: `inset 0 0 0 2px ${COR.borda}` }} role="radiogroup" aria-label="Período">
              {(["monthly", "annual"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  role="radio"
                  aria-checked={periodo === p}
                  onClick={() => { if (periodo !== p) { tocar(8); onPeriodo(p); } }}
                  className="rounded-full px-2.5 py-1.5 text-[10.5px] font-extrabold uppercase"
                  style={periodo === p ? { background: COR.ouro, color: COR.sobreOuro } : { color: COR.texto2 }}
                >
                  {p === "monthly" ? "Mensal" : "Anual"}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── miolo: só o que muda; "ver tudo" rola aqui dentro ──────────── */}
      <div className="jz-rolagem mt-2.5 min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={plano + (tudo ? "-tudo" : "")}
            initial={reduzir ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.08 } }}
            transition={{ duration: 0.2 }}
          >
            <p className="mb-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em]" style={{ color: cor }}>
              {tudo ? `Tudo o que o ${planos.find((o) => o.valor === plano)?.rotulo} inclui` : TITULO[plano]}
            </p>
            {!tudo ? (
              <div className="grid grid-cols-2 gap-1.5">
                {selos.map((r) => (
                  <button
                    key={r.name}
                    type="button"
                    onClick={() => { tocar(6); onExplicar(r); }}
                    className="flex items-center gap-2 rounded-[9px] px-2 py-1.5 text-left active:scale-[0.98]"
                    style={{ background: COR.campo, boxShadow: `inset 0 0 0 1.5px ${COR.borda}` }}
                  >
                    <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full" style={{ background: cor }}>
                      <Check className="h-2.5 w-2.5" strokeWidth={4} style={{ color: COR.tintaEscura }} />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[11.5px] font-extrabold leading-tight" style={{ color: COR.texto }}>{r.curto}</span>
                      <span className="block truncate text-[10px] leading-tight" style={{ color: COR.texto3 }}>{resumo(r[plano])}</span>
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <ul className="space-y-0.5">
                {RECURSOS.map((r) => {
                  const v = lerValor(r[plano]);
                  return (
                    <li key={r.name}>
                      <button
                        type="button"
                        onClick={() => { tocar(6); onExplicar(r); }}
                        className="flex w-full items-center gap-2 rounded-lg px-1.5 py-1 text-left active:bg-black/20"
                        style={{ opacity: v.tem ? 1 : 0.45 }}
                      >
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full" style={{ background: v.tem ? cor : COR.campo, boxShadow: v.tem ? "none" : `inset 0 0 0 1.5px ${COR.borda}` }}>
                          {v.tem ? <Check className="h-2.5 w-2.5" strokeWidth={4} style={{ color: COR.tintaEscura }} /> : <Lock className="h-2 w-2" style={{ color: COR.texto3 }} />}
                        </span>
                        <span className="min-w-0 flex-1 truncate text-[11.5px] font-bold" style={{ color: COR.texto }}>{r.curto}</span>
                        <span className="shrink-0 text-[10.5px]" style={{ color: COR.texto3 }}>{v.tem ? resumo(r[plano]) : "—"}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={() => setTudo((v) => !v)}
        className="flex shrink-0 items-center justify-center gap-1 py-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.12em]"
        style={{ color: COR.ouroClaro }}
        aria-expanded={tudo}
      >
        {tudo ? "Ver só o que muda" : "Ver tudo"}
        <ChevronDown className="h-3 w-3 transition-transform" style={{ transform: tudo ? "rotate(180deg)" : "none" }} />
      </button>

      {/* ── o botão, preso embaixo ──────────────────────────────────────── */}
      <div className="shrink-0 pt-1">{rodape}</div>
    </div>
  );
}
