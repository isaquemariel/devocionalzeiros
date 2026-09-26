import { forwardRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import type { Opcao } from "@/lib/jornada/tipos";
import { COR, FONTE } from "./tema";

/** vibração curtinha ao escolher — Android sente, iOS ignora sem erro */
export const tocar = () => { try { navigator.vibrate?.(8); } catch { /* ok */ } };

// ─── cartão de opção ────────────────────────────────────────────────────────

interface OpcaoProps {
  opcao: Opcao;
  marcada: boolean;
  multipla?: boolean;
  onEscolher: () => void;
}

/**
 * Cartão de escolha com espessura: a borda de baixo é mais grossa e afunda ao
 * toque. Marcado, ele fica azul — da cor da chama —, e a marca de múltipla
 * escolha vira um quadradinho preenchido.
 */
export function CartaoOpcao({ opcao, marcada, multipla, onEscolher }: OpcaoProps) {
  const borda = marcada ? COR.azulBorda : COR.borda;
  const fundoBorda = marcada ? COR.azul : COR.bordaFunda;
  return (
    <button
      type="button"
      role={multipla ? "checkbox" : "radio"}
      aria-checked={marcada}
      onClick={() => { tocar(); onEscolher(); }}
      className="group flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-left transition-[transform,background-color,border-color] duration-100 active:translate-y-[2px]"
      style={{
        background: marcada ? COR.azulClaro : COR.superficie,
        borderColor: borda,
        borderBottomColor: fundoBorda,
        borderBottomWidth: 4,
        fontFamily: FONTE,
      }}
    >
      {opcao.icone && <span className="shrink-0 text-[26px] leading-none" aria-hidden="true">{opcao.icone}</span>}
      {opcao.nivel !== undefined && <Barrinhas nivel={opcao.nivel} marcada={marcada} />}
      <span className="min-w-0 flex-1 text-[16px] font-extrabold leading-tight" style={{ color: marcada ? COR.azul : COR.texto }}>
        {opcao.rotulo}
      </span>
      {opcao.detalhe && (
        <span className="shrink-0 text-[14px] font-bold" style={{ color: marcada ? COR.azul : COR.texto2 }}>{opcao.detalhe}</span>
      )}
      {multipla && (
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 transition-colors"
          style={{ borderColor: marcada ? COR.azul : COR.borda, background: marcada ? COR.azul : "transparent" }}
          aria-hidden="true"
        >
          {marcada && <Check className="h-4 w-4 text-white" strokeWidth={4} />}
        </span>
      )}
    </button>
  );
}

/** Quatro barrinhas de sinal: quantas acendem diz o nível. */
function Barrinhas({ nivel, marcada }: { nivel: number; marcada: boolean }) {
  return (
    <span className="flex shrink-0 items-end gap-[3px]" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="w-[6px] rounded-sm"
          style={{
            height: 9 + i * 5,
            background: i < nivel ? (marcada ? COR.azul : "#5A9BF0") : (marcada ? "#BFD8FF" : "#DCE8F7"),
          }}
        />
      ))}
    </span>
  );
}

// ─── botão principal ────────────────────────────────────────────────────────

type Variante = "azul" | "ouro" | "branco";

const ESTILO: Record<Variante, { fundo: string; baixo: string; texto: string; borda?: string }> = {
  azul: { fundo: COR.azul, baixo: COR.azulFundo, texto: "#FFFFFF" },
  ouro: { fundo: COR.ouro, baixo: COR.ouroFundo, texto: "#3A2600" },
  branco: { fundo: COR.superficie, baixo: COR.bordaFunda, texto: COR.texto, borda: COR.borda },
};

interface BotaoProps {
  children: ReactNode;
  onClick?: () => void;
  desabilitado?: boolean;
  /**
   * Trabalhando (criando a conta, falando com o Google). Mantém a cor e só
   * bloqueia o toque: carregando não é "desativado" — cinza diria "falta algo
   * seu", quando na verdade é o app que está trabalhando.
   */
  carregando?: boolean;
  variante?: Variante;
  tipo?: "button" | "submit";
  icone?: ReactNode;
}

/**
 * Botão grande com espessura. Desabilitado ele fica chapado e cinza — sem a
 * borda funda —, e é isso que diz "ainda falta escolher", sem precisar de
 * mensagem de erro.
 */
export function Botao({ children, onClick, desabilitado, carregando, variante = "azul", tipo = "button", icone }: BotaoProps) {
  const e = ESTILO[variante];
  return (
    <button
      type={tipo}
      onClick={carregando ? undefined : onClick}
      disabled={desabilitado}
      aria-busy={carregando || undefined}
      className="flex w-full items-center justify-center gap-2.5 rounded-2xl px-5 py-[15px] text-[16px] font-black uppercase tracking-wide transition-[transform,box-shadow] duration-100 active:translate-y-[3px] disabled:active:translate-y-0"
      style={{
        fontFamily: FONTE,
        background: desabilitado ? "#E7E3DA" : e.fundo,
        color: desabilitado ? "#AFA895" : e.texto,
        boxShadow: desabilitado ? "none" : `0 4px 0 ${e.baixo}`,
        cursor: carregando ? "progress" : undefined,
        opacity: carregando ? 0.92 : 1,
        border: e.borda && !desabilitado ? `2px solid ${e.borda}` : "2px solid transparent",
      }}
    >
      {icone}
      {children}
    </button>
  );
}

// ─── barra de progresso ─────────────────────────────────────────────────────

/** Barra que enche com mola, com o brilho claro por dentro. */
export function BarraProgresso({ valor }: { valor: number }) {
  const reduzir = useReducedMotion();
  const pct = Math.round(Math.max(0, Math.min(1, valor)) * 100);
  return (
    <div
      className="relative h-4 flex-1 overflow-hidden rounded-full"
      style={{ background: "#EDE6D8" }}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      aria-label="Progresso da jornada"
    >
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{ background: COR.azul }}
        initial={false}
        animate={{ width: `${Math.max(pct, 6)}%` }}
        transition={reduzir ? { duration: 0 } : { type: "spring", stiffness: 140, damping: 20 }}
      >
        <span className="absolute left-2 right-2 top-[3px] h-[4px] rounded-full bg-white/35" />
      </motion.div>
    </div>
  );
}

// ─── campo de texto ─────────────────────────────────────────────────────────

interface CampoProps extends React.InputHTMLAttributes<HTMLInputElement> {
  erro?: string | null;
  esquerda?: ReactNode;
  direita?: ReactNode;
}

/**
 * Campo grande e arredondado. 17px de fonte não é estética: abaixo de 16px o
 * iOS dá zoom no campo ao focar e a tela inteira pula.
 */
export const Campo = forwardRef<HTMLInputElement, CampoProps>(function Campo({ erro, esquerda, direita, ...resto }, ref) {
  return (
    <div>
      <div
        className="flex items-center rounded-2xl border-2 transition-colors focus-within:border-[#7DB4FF]"
        style={{ background: erro ? COR.erroClaro : COR.superficie, borderColor: erro ? COR.erro : COR.borda }}
      >
        {esquerda}
        <input
          ref={ref}
          {...resto}
          className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-[17px] font-bold outline-none placeholder:font-semibold placeholder:text-[#B5AE9E]"
          style={{ color: COR.texto, fontFamily: FONTE }}
          aria-invalid={!!erro}
        />
        {direita}
      </div>
      {erro && (
        <p className="mt-2 px-1 text-[14px] font-bold" style={{ color: COR.erro, fontFamily: FONTE }} role="alert">
          {erro}
        </p>
      )}
    </div>
  );
});
