import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown, Lock } from "lucide-react";
import type { Opcao } from "@/lib/jornada/tipos";
import { PRECOS, RECURSOS, economiaAnual, formatBRL, lerValor, type ChavePlano, type Recurso } from "@/lib/planos";
import { tocar } from "./Controles";
import { COR, FONTE } from "./tema";

export type Periodo = "monthly" | "annual";

/** a cor de cada plano — as mesmas do RPG (verde, ouro, roxo) */
const COR_PLANO: Record<ChavePlano, string> = { free: COR.verde, gold: COR.ouroClaro, premium: "#c084fc" };
/** quantos itens aparecem antes do "ver tudo" */
const DESTAQUES = 5;

interface Props {
  planos: Opcao[];
  plano: ChavePlano;
  periodo: Periodo;
  onPlano: (p: ChavePlano) => void;
  onPeriodo: (p: Periodo) => void;
  /** tocou num item: ele explica */
  onExplicar: (r: Recurso) => void;
}

/**
 * AS PORTAS DA CIDADE: a escolha do plano dentro da jornada.
 *
 * Três abas (Grátis, Gold, Premium) e, embaixo, o que o plano marcado libera.
 * Cada item é tocável — o Devocionalzeiro explica o que é, no balão. Nos
 * pagos, a pessoa escolhe mensal ou anual e vê quanto o anual economiza.
 *
 * Primeiro vem o que o plano TEM; o que fica de fora aparece depois, com
 * cadeado. Assim o Grátis não abre com uma parede de "bloqueado".
 */
export function Portas({ planos, plano, periodo, onPlano, onPeriodo, onExplicar }: Props) {
  const reduzir = useReducedMotion();
  const [tudo, setTudo] = useState(false);
  const cor = COR_PLANO[plano];
  const itens = RECURSOS.map((r) => ({ r, ...lerValor(r[plano]) })).sort((a, b) => Number(b.tem) - Number(a.tem));
  const visiveis = tudo ? itens : itens.slice(0, DESTAQUES);
  const preco = plano === "free" ? null : PRECOS[plano];
  const eco = preco ? economiaAnual(preco) : null;

  return (
    <div style={{ fontFamily: FONTE }}>
      {/* as três portas */}
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
              className="flex flex-col items-center rounded-[10px] px-1 py-2 transition-transform active:scale-[0.97]"
              style={{
                background: marcado ? COR.painelFundo : COR.campo,
                boxShadow: `inset 0 0 0 2px ${marcado ? COR_PLANO[k] : COR.borda}`,
              }}
            >
              <span className="text-[13px] font-extrabold uppercase tracking-[0.08em]" style={{ color: marcado ? COR_PLANO[k] : COR.texto2 }}>{o.rotulo}</span>
              <span className="mt-0.5 text-[10.5px] font-bold" style={{ color: COR.texto3 }}>
                {k === "free" ? "R$ 0" : PRECOS[k].monthlyPrice + "/mês"}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={plano}
          initial={reduzir ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
          transition={{ duration: 0.22 }}
          className="mt-3"
        >
          {/* preço */}
          <div className="flex items-end justify-between gap-2">
            <div>
              <p className="text-[10.5px] font-bold uppercase tracking-[0.2em]" style={{ color: cor }}>
                {plano === "free" ? "Para sempre" : preco!.highlight}
              </p>
              <p className="mt-0.5 flex items-baseline gap-1.5">
                <span className="text-[26px] font-extrabold leading-none" style={{ color: COR.texto }}>
                  {plano === "free" ? "R$ 0" : periodo === "annual" ? preco!.annualPrice : preco!.monthlyPrice}
                </span>
                <span className="text-[12px] font-bold" style={{ color: COR.texto3 }}>
                  {plano === "free" ? "sem cartão" : periodo === "annual" ? "/ano" : "/mês"}
                </span>
              </p>
              {preco && periodo === "annual" && (
                <p className="mt-1 text-[11px] font-bold" style={{ color: COR.verde }}>
                  equivale a {formatBRL(eco!.porMes)}/mês · economia de {formatBRL(eco!.valor)}
                </p>
              )}
            </div>
            {preco && (
              <div className="flex shrink-0 rounded-full p-0.5" style={{ background: COR.campo, boxShadow: `inset 0 0 0 2px ${COR.borda}` }} role="radiogroup" aria-label="Período">
                {(["monthly", "annual"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    role="radio"
                    aria-checked={periodo === p}
                    onClick={() => { tocar(8); onPeriodo(p); }}
                    className="relative rounded-full px-2.5 py-1.5 text-[11px] font-extrabold uppercase"
                    style={periodo === p ? { background: COR.ouro, color: COR.sobreOuro } : { color: COR.texto2 }}
                  >
                    {p === "monthly" ? "Mensal" : "Anual"}
                    {p === "annual" && (
                      <span className="absolute -right-1 -top-2.5 rounded-full px-1.5 text-[9px] font-extrabold" style={{ background: COR.verde, color: "#0d2109" }}>
                        -{eco!.pct}%
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* o que o plano libera — cada item, tocado, ele explica */}
          <ul className="mt-3 space-y-1">
            {visiveis.map(({ r, tem, texto }) => (
              <li key={r.name}>
                <button
                  type="button"
                  onClick={() => { tocar(6); onExplicar(r); }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left active:bg-black/20"
                  style={{ opacity: tem ? 1 : 0.5 }}
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: tem ? cor : COR.campo, boxShadow: tem ? "none" : `inset 0 0 0 1.5px ${COR.borda}` }}>
                    {tem ? <Check className="h-3 w-3" strokeWidth={3.5} style={{ color: COR.tintaEscura }} /> : <Lock className="h-2.5 w-2.5" style={{ color: COR.texto3 }} />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[12.5px] font-bold leading-tight" style={{ color: COR.texto }}>{r.name}</span>
                    <span className="block text-[11px] leading-tight" style={{ color: COR.texto3 }}>{tem ? texto : "Não incluso"}</span>
                  </span>
                  <span className="text-[13px] font-extrabold" style={{ color: COR.texto3 }} aria-hidden="true">?</span>
                </button>
              </li>
            ))}
          </ul>
          {itens.length > DESTAQUES && (
            <button
              type="button"
              onClick={() => setTudo((v) => !v)}
              className="mt-1 flex w-full items-center justify-center gap-1 py-1.5 text-[11.5px] font-extrabold uppercase tracking-[0.1em]"
              style={{ color: COR.ouroClaro }}
              aria-expanded={tudo}
            >
              {tudo ? "Mostrar menos" : `Ver tudo (${itens.length})`}
              <ChevronDown className="h-3.5 w-3.5 transition-transform" style={{ transform: tudo ? "rotate(180deg)" : "none" }} />
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
