import { forwardRef, type ReactNode } from "react";
import { Chaminha } from "./Icones";
import { COR, FONTE } from "./tema";

/** vibração curtinha ao escolher — Android sente, iOS ignora sem erro */
export const tocar = (ms = 8) => { try { navigator.vibrate?.(ms); } catch { /* ok */ } };

// ─── botão ──────────────────────────────────────────────────────────────────

type Variante = "tinta" | "ouro" | "papel";

interface BotaoProps {
  children: ReactNode;
  onClick?: () => void;
  desabilitado?: boolean;
  /**
   * Trabalhando (criando a conta, falando com o Google). Mantém a cor e só
   * bloqueia o toque: carregando não é "desativado" — apagado diria "falta
   * algo seu", quando na verdade é o app que está trabalhando.
   */
  carregando?: boolean;
  variante?: Variante;
  /** ícone à esquerda; o padrão do botão de tinta é a chaminha */
  icone?: ReactNode;
}

/**
 * O botão da jornada: uma pílula da cor do corpo do Devocionalzeiro, com a
 * chaminha dele acesa do lado. Letra normal, não caixa-alta — ele está
 * convidando, não dando ordem.
 */
export function Botao({ children, onClick, desabilitado, carregando, variante = "tinta", icone }: BotaoProps) {
  const estilo =
    variante === "ouro"
      ? { background: `linear-gradient(180deg, #FFC545, ${COR.ouro})`, color: "#3A2600", boxShadow: `0 3px 0 ${COR.ouroFundo}, 0 10px 22px -10px rgba(201,131,0,.7)` }
      : variante === "papel"
        ? { background: "#FFFFFF", color: COR.tinta, boxShadow: `inset 0 0 0 2px ${COR.papelBorda}, 0 2px 0 ${COR.papelBorda}` }
        : { background: `linear-gradient(180deg, #25326A, ${COR.tinta})`, color: "#FFFFFF", boxShadow: "0 3px 0 #0C1331, 0 12px 24px -12px rgba(27,37,80,.8)" };
  return (
    <button
      type="button"
      onClick={carregando ? undefined : onClick}
      disabled={desabilitado}
      aria-busy={carregando || undefined}
      className="flex min-h-[54px] w-full items-center justify-center gap-2.5 rounded-full px-6 text-[17px] font-extrabold transition-[transform,opacity] duration-100 active:translate-y-[2px] active:scale-[0.985] disabled:active:translate-y-0 disabled:active:scale-100"
      style={{
        fontFamily: FONTE,
        ...(desabilitado ? { background: "#ECE4D3", color: "#ABA18B", boxShadow: "none" } : estilo),
        cursor: carregando ? "progress" : undefined,
      }}
    >
      {icone ?? (variante === "tinta" && <Chaminha tamanho={20} acesa={!desabilitado} />)}
      {children}
    </button>
  );
}

/** Ação secundária: só texto, sublinhado ao tocar. */
export function Link({ children, onClick, cor = COR.chama }: { children: ReactNode; onClick: () => void; cor?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg px-2 py-2 text-[15px] font-extrabold underline-offset-4 active:underline"
      style={{ color: cor, fontFamily: FONTE }}
    >
      {children}
    </button>
  );
}

// ─── campo de texto ─────────────────────────────────────────────────────────

interface CampoProps extends React.InputHTMLAttributes<HTMLInputElement> {
  erro?: string | null;
  esquerda?: ReactNode;
  direita?: ReactNode;
}

/**
 * Campo grande. 17px de fonte não é estética: abaixo de 16px o iOS dá zoom no
 * campo ao focar e a tela inteira pula.
 */
export const Campo = forwardRef<HTMLInputElement, CampoProps>(function Campo({ erro, esquerda, direita, ...resto }, ref) {
  return (
    <div>
      <div
        className="jz-caixa flex items-center rounded-[18px] transition-shadow"
        style={{
          background: erro ? COR.erroClaro : "#FFFFFF",
          boxShadow: `inset 0 0 0 2px ${erro ? COR.erro : "#DCCBA8"}`,
        }}
      >
        {esquerda}
        <input
          ref={ref}
          {...resto}
          className="jz-campo min-w-0 flex-1 rounded-[18px] bg-transparent px-4 py-[15px] text-[17px] font-bold outline-none placeholder:font-semibold"
          // fundo explícito: o CSS global do app pinta os inputs, e o fundo
          // dele cobria o anel de foco desenhado na caixa
          style={{ color: COR.tinta, fontFamily: FONTE, background: "transparent", border: 0, boxShadow: "none" }}
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
