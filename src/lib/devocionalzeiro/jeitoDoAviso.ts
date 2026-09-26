import type { Expressao, Gesto } from "@/lib/jornada/tipos";
import type { TipoAviso } from "@/lib/avisos";

/**
 * A cara e o gesto dele em cada tipo de aviso — os mesmos no palco central
 * (`Comemoracao`) e no boneco da tela que o tem em cena (login, tela inicial):
 * sorri e vibra no sucesso, coça a cabeça no erro, aponta na dica, se espanta
 * no alerta.
 */
export const JEITO: Record<TipoAviso, { expressao: Expressao; gesto: Gesto; depois: Gesto; chama: number }> = {
  sucesso: { expressao: "feliz", gesto: "vitoria", depois: "parado", chama: 0.6 },
  erro: { expressao: "pensativo", gesto: "cocar", depois: "parado", chama: 0.22 },
  info: { expressao: "feliz", gesto: "apontar", depois: "parado", chama: 0.4 },
  alerta: { expressao: "surpreso", gesto: "parado", depois: "parado", chama: 0.4 },
};

/** quanto tempo o aviso fica: dá para ler com calma, sem ficar para sempre */
export const tempoDeLeitura = (texto: string, detalhe?: string, acao?: boolean) =>
  Math.max(acao ? 6500 : 3000, Math.min(8000, 2400 + (texto.length + (detalhe?.length ?? 0)) * 48));
