// Fichas por (capítulo → papel) de ESDRAS — rede de segurança contextual para
// os figurantes anônimos (o `id` nomeado vence esta ficha; ver actorInfo).
// Agrega as faixas autorais do livro.
//
// São dez capítulos em que o povo quase nunca é "o povo": é o chefe da casa de
// Parós na eira, o homem de Anatote no campo do sacerdote, o cantor dos filhos
// de Asafe com o címbalo na mão, o porteiro dos filhos de Salum guardando uma
// soleira que ainda não existe, o netinim que carrega a água do ribeiro, o
// filho dos servos de Salomão na bancada herdada de um rei morto havia quatro
// séculos, o que subiu de Tel-Melá e não pôde mostrar a casa de seus pais, o
// velho que viu a primeira casa e chorou em altas vozes enquanto os outros
// jubilavam, e o escrivão persa que, sem saber, escreveu a favor da obra.
import type { StageInfo } from "@/lib/rpgStageInfo";
import { CHAPTER_ACTORS_01_06 } from "@/lib/stageInfo/ezra-01-06";
import { CHAPTER_ACTORS_07_10 } from "@/lib/stageInfo/ezra-07-10";

export const CHAPTER_ACTORS: Record<number, Record<string, StageInfo>> = {
  ...CHAPTER_ACTORS_01_06,
  ...CHAPTER_ACTORS_07_10,
};
