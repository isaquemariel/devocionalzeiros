/**
 * O "SEU PLANO" DA JORNADA: da meta diária até a Bíblia inteira.
 *
 * É o momento que faz a pessoa querer terminar o cadastro — ela para de ver um
 * formulário e passa a ver um lugar aonde chegar. Por isso a conta tem de ser
 * honesta: número inflado aqui vira decepção no segundo mês.
 *
 * Premissas:
 * - Cânon protestante, o da ARC: 1.189 capítulos (929 no AT, 260 no NT).
 * - ~3,5 minutos por capítulo. Medido no `public/bible/arc.json` deste repo:
 *   798.802 palavras em 1.189 capítulos, 672 por capítulo; a ~190 palavras
 *   por minuto de leitura silenciosa atenta, dá 3,54 min. É média: Salmo 117
 *   é um minuto, Salmo 119 é meia hora.
 *
 * O texto diz sempre "cerca de" — é estimativa, e se apresenta como tal.
 */

export const CAPITULOS_BIBLIA = 1189;
export const CAPITULOS_NT = 260;
export const MINUTOS_POR_CAPITULO = 3.5;

export interface Plano {
  capitulosPorDia: number;
  diasBiblia: number;
  diasNT: number;
  /** "cerca de 14 meses" */
  biblia: string;
  /** "cerca de 3 meses" */
  novoTestamento: string;
}

/** Duração legível: semanas até ~2 meses, depois meses, depois anos. */
export function duracao(dias: number): string {
  if (dias <= 10) return `${dias} dias`;
  if (dias < 60) {
    const s = Math.round(dias / 7);
    return `${s} semana${s > 1 ? "s" : ""}`;
  }
  const meses = Math.round(dias / 30.44);
  if (meses < 24) return `${meses} meses`;
  const anos = Math.round((dias / 365.25) * 2) / 2; // de meio em meio ano
  const inteiro = Math.floor(anos);
  return anos === inteiro ? `${inteiro} anos` : `${inteiro} anos e meio`;
}

export function planoDeLeitura(metaMin: number): Plano {
  const meta = Math.max(1, metaMin);
  const capitulosPorDia = meta / MINUTOS_POR_CAPITULO;
  const diasBiblia = Math.ceil(CAPITULOS_BIBLIA / capitulosPorDia);
  const diasNT = Math.ceil(CAPITULOS_NT / capitulosPorDia);
  return {
    capitulosPorDia,
    diasBiblia,
    diasNT,
    biblia: `cerca de ${duracao(diasBiblia)}`,
    novoTestamento: `cerca de ${duracao(diasNT)}`,
  };
}
