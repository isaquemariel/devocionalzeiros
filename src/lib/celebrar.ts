/**
 * CELEBRAR — no lugar do confete, o Devocionalzeiro aparece e comemora.
 *
 * O app soltava confete (`canvas-confetti`) a cada capítulo lido, devocional
 * feito ou conquista resgatada: papel picado genérico, igual ao de qualquer
 * site, e sem nada do app nele. Agora quem comemora é o personagem: ele sobe
 * da borda da tela, pula, a chama da cabeça cresce, diz uma frase curta e vai
 * embora — como os personagens dos jogos que a pessoa conhece.
 *
 * Quem chama só diz o MOTIVO; a cena (tamanho, gesto, fala) mora em
 * `components/devocionalzeiro/Comemoracao`, que o `App` monta uma vez.
 */

export type MotivoCelebracao =
  | "capitulo"
  | "leitura-do-dia"
  | "plano-criado"
  | "devocional"
  | "conquista";

export interface PedidoCelebracao {
  motivo: MotivoCelebracao;
  /** troca a fala padrão do motivo */
  fala?: string;
}

export const EVENTO_CELEBRAR = "dz:celebrar";

export function celebrar(motivo: MotivoCelebracao, fala?: string): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<PedidoCelebracao>(EVENTO_CELEBRAR, { detail: { motivo, fala } }));
}
