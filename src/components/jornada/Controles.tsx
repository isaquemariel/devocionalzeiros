import { forwardRef, type ReactNode } from "react";
import { COR, FONTE } from "./tema";

/** vibração curtinha ao escolher — Android sente, iOS ignora sem erro */
export const tocar = (ms = 8) => { try { navigator.vibrate?.(ms); } catch { /* ok */ } };

// ─── botão ──────────────────────────────────────────────────────────────────

/** `ouro` é o `.rpg-btn`; `escuro` é o `.rpg-btn-ghost` do RPG */
type Variante = "ouro" | "escuro";

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
  icone?: ReactNode;
}

/**
 * O botão da jornada é o botão do RPG: ouro com pressão 3D (`.rpg-btn`) para
 * a ação principal, escuro de borda para a secundária (`.rpg-btn-ghost`). As
 * classes vêm do `index.css`, então um ajuste no RPG vale aqui também.
 */
export function Botao({ children, onClick, desabilitado, carregando, variante = "ouro", icone }: BotaoProps) {
  return (
    <button
      type="button"
      onClick={carregando ? undefined : onClick}
      disabled={desabilitado}
      aria-busy={carregando || undefined}
      className={`${variante === "ouro" ? "rpg-btn" : "rpg-btn-ghost"} flex min-h-[52px] w-full items-center justify-center gap-2.5 px-5 text-[15px] uppercase tracking-[0.06em]`}
      style={{ cursor: carregando ? "progress" : undefined, ...(variante === "escuro" ? { color: COR.texto } : {}) }}
    >
      {icone}
      {children}
    </button>
  );
}

/** Ação secundária: só texto dourado. */
export function Link({ children, onClick, cor = COR.ouroClaro }: { children: ReactNode; onClick: () => void; cor?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg px-2 py-2 text-[13.5px] font-bold underline-offset-4 active:underline"
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
 * Campo escuro de borda, como os do RPG; o foco acende a borda de ouro.
 * 16px de fonte não é estética: abaixo disso o iOS dá zoom no campo ao focar
 * e a tela inteira pula.
 */
export const Campo = forwardRef<HTMLInputElement, CampoProps>(function Campo({ erro, esquerda, direita, ...resto }, ref) {
  return (
    <div>
      <div
        className="jz-caixa flex items-center rounded-[10px] transition-shadow"
        style={{
          background: erro ? COR.erroFundo : COR.campo,
          boxShadow: `inset 0 0 0 2px ${erro ? COR.erro : COR.borda}`,
        }}
      >
        {esquerda}
        <input
          ref={ref}
          {...resto}
          className="jz-campo min-w-0 flex-1 rounded-[10px] px-4 py-[14px] text-[16px] font-bold outline-none"
          // fundo explícito: o CSS global do app pinta os inputs, e o fundo
          // dele cobria o anel de foco desenhado na caixa
          style={{ color: COR.texto, fontFamily: FONTE, background: "transparent", border: 0, boxShadow: "none" }}
          aria-invalid={!!erro}
        />
        {direita}
      </div>
      {erro && (
        <p className="mt-2 px-1 text-[13px] font-bold" style={{ color: COR.erro, fontFamily: FONTE }} role="alert">
          {erro}
        </p>
      )}
    </div>
  );
});
