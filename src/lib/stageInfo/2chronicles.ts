// Fichas por (capítulo → papel) de 2 CRÔNICAS — rede de segurança contextual
// para os figurantes anônimos (o `id` nomeado vence esta ficha; ver actorInfo).
// Agrega as faixas autorais do livro.
//
// São trinta e seis capítulos em que o povo quase nunca é "o povo": é o que
// talhava na montanha e o que carregava as cargas, o jangadeiro de Jope, o
// fundidor da terra argilosa entre Sucote e Zeredá, o cantor de Asafe que saiu
// adiante do exército, o guarda da porta dos cavalos, o correio escarnecido na
// estrada de Zebulom, o lavrador de Uzias no Carmelo, o levita que largou a
// carga dos ombros quando a arca finalmente pousou.
import type { StageInfo } from "@/lib/rpgStageInfo";
import { CHAPTER_ACTORS_01_04 } from "@/lib/stageInfo/2chronicles-01-04";
import { CHAPTER_ACTORS_05_09 } from "@/lib/stageInfo/2chronicles-05-09";
import { CHAPTER_ACTORS_10_14 } from "@/lib/stageInfo/2chronicles-10-14";
import { CHAPTER_ACTORS_15_20 } from "@/lib/stageInfo/2chronicles-15-20";
import { CHAPTER_ACTORS_21_26 } from "@/lib/stageInfo/2chronicles-21-26";
import { CHAPTER_ACTORS_27_31 } from "@/lib/stageInfo/2chronicles-27-31";

export const CHAPTER_ACTORS: Record<number, Record<string, StageInfo>> = {
  ...CHAPTER_ACTORS_01_04,
  ...CHAPTER_ACTORS_05_09,
  ...CHAPTER_ACTORS_10_14,
  ...CHAPTER_ACTORS_15_20,
  ...CHAPTER_ACTORS_21_26,
  ...CHAPTER_ACTORS_27_31,
};
