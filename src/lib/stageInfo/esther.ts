// Fichas por (capítulo → papel) de ESTER — rede de segurança contextual para os
// figurantes anônimos (o `id` nomeado vence esta ficha; ver actorInfo).
//
// Num livro em que Deus não é nomeado, as fichas não "consertam" o silêncio:
// apontam a coincidência e registram que o texto cala. O rolo anotado e
// esquecido (2:23), a noite sem sono (6:1), a sorte lançada em Nisã que caiu em
// Adar e deu onze meses de prazo, a forca pronta antes da hora. A leitura
// teológica entra só por citação de outro texto — Pv 16:33 sobre o pur, 1Sm 15
// contra o "ao despojo não estenderam a sua mão" —, e 4:14 é sempre tratada
// como o que é: uma pergunta que o livro não responde.
import type { StageInfo } from "@/lib/rpgStageInfo";
import { CHAPTER_ACTORS_01_05 } from "@/lib/stageInfo/esther-01-05";
import { CHAPTER_ACTORS_06_10 } from "@/lib/stageInfo/esther-06-10";

export const CHAPTER_ACTORS: Record<number, Record<string, StageInfo>> = {
  ...CHAPTER_ACTORS_01_05,
  ...CHAPTER_ACTORS_06_10,
};
