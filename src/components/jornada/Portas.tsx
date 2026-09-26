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
/** os planos acima de cada um, do mais perto ao mais longe */
const ACIMA: Record<ChavePlano, ChavePlano[]> = { free: ["gold", "premium"], gold: ["premium"], premium: [] };
/** três fileiras de três selos */
const LUGARES = 9;
/** título (16 + 6) + três fileiras de 38 com 5 de vão */
const ALTURA_MIOLO = 22 + 3 * 38 + 2 * 5;
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
 *   Grátis, e mais…"; o Premium, "tudo do Gold, e mais…". Selos em três
 *   colunas, numa grade de ALTURA FIXA; cada um, tocado, o Devocionalzeiro
 *   explica;
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
  const rotulo = (k: ChavePlano) => planos.find((o) => o.valor === k)?.rotulo ?? k;
  // As três fileiras sempre cheias: o Grátis tem 6 selos e o Gold e o Premium
  // têm 1 + 8. O que sobra de lugar mostra, trancado, o que vem no plano de
  // cima — o Grátis ganha o gostinho do Gold, e a grade nunca fica banguela.
  const provas: { r: Recurso; em: ChavePlano }[] = [];
  for (const acima of ACIMA[plano]) {
    for (const r of diferencas(plano, acima)) {
      if (provas.length >= LUGARES - selos.length - (pai ? 1 : 0)) break;
      if (!lerValor(r[plano]).tem && !provas.some((p) => p.r.name === r.name)) provas.push({ r, em: acima });
    }
  }

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

      {/* ── miolo: só o que muda; "ver tudo" rola aqui dentro ──────────────
          ALTURA FIXA, a mesma em toda aba e no "ver tudo": o painel não muda
          de tamanho, então a cena e o Devocionalzeiro também não. Antes o
          Grátis (6 selos) deixava o painel uma fileira mais baixo que o Gold
          e o Premium (8), o mundo subia e descia a cada toque, e num celular
          baixo o boneco encolhia de 129 px para 76 px. */}
      <div className="jz-rolagem mt-2.5 min-h-[96px] overflow-y-auto overscroll-contain" style={{ flex: `0 1 ${ALTURA_MIOLO}px` }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={plano + (tudo ? "-tudo" : "")}
            initial={reduzir ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.08 } }}
            transition={{ duration: 0.2 }}
          >
            <p className="mb-1.5 h-4 truncate text-[10.5px] font-bold uppercase leading-4 tracking-[0.16em]" style={{ color: cor }}>
              {tudo ? `Tudo o que o ${rotulo(plano)} inclui` : TITULO[plano]}
            </p>
            {!tudo ? (
              <div className="grid grid-cols-3 gap-[5px]">
                {pai && (
                  // o que ele herda, num selo só — tocado, abre a lista inteira
                  <Selo
                    nome={`Tudo do ${rotulo(pai)}`}
                    valor="já incluso"
                    cor={COR_PLANO[pai]}
                    destaque
                    onClick={() => { tocar(6); setTudo(true); }}
                  />
                )}
                {selos.map((r) => (
                  <Selo key={r.name} nome={r.curto} valor={resumo(r[plano])} cor={cor} onClick={() => { tocar(6); onExplicar(r); }} />
                ))}
                {provas.map((p) => (
                  // o que o plano de cima tem e este não: o cadeado leva à aba dele
                  <Selo
                    key={p.r.name}
                    nome={p.r.curto}
                    valor={`no ${rotulo(p.em)}`}
                    cor={COR.texto3}
                    trancado
                    onClick={() => { tocar(8); setTudo(false); onPlano(p.em); }}
                  />
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

/** um selo da grade: o nome curto e, embaixo, o valor na cor do plano */
function Selo({ nome, valor, cor, destaque, trancado, onClick }: {
  nome: string; valor: string; cor: string; destaque?: boolean; trancado?: boolean; onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[38px] min-w-0 flex-col justify-center rounded-[9px] px-1.5 text-left active:scale-[0.97]"
      style={{
        background: destaque ? COR.painelFundo : COR.campo,
        boxShadow: `inset 0 0 0 1.5px ${destaque ? cor : COR.borda}`,
        opacity: trancado ? 0.6 : 1,
      }}
    >
      <span className="block truncate font-extrabold leading-tight" style={{ color: trancado ? COR.texto2 : COR.texto, fontSize: "clamp(10px, 2.9vw, 11.5px)" }}>{nome}</span>
      <span className="flex min-w-0 items-center gap-1 leading-tight" style={{ color: cor, fontSize: "clamp(9.5px, 2.6vw, 10.5px)" }}>
        {trancado && <Lock className="h-2.5 w-2.5 shrink-0" />}
        <span className="truncate">{valor}</span>
      </span>
    </button>
  );
}
