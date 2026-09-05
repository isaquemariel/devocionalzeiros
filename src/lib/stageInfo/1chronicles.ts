// Fichas por (capítulo → papel) de 1 CRÔNICAS — rede de segurança contextual
// para os figurantes anônimos (o `id` nomeado vence esta ficha; ver actorInfo).
// Agrega as quatro faixas autorais (1-6, 7-12, 13-21, 22-29).
//
// Este livro é o que mais precisa desta camada: nove capítulos de genealogia
// põem em cena oleiros, tecelões de linho fino, ferreiros do vale dos
// artífices, porteiros das quatro bandas e cantores das câmaras — gente que,
// sem ficha de capítulo, cairia toda no "Homem · personagem da cena".
import type { StageInfo } from "@/lib/rpgStageInfo";
import { CHAPTER_ACTORS_01_06 } from "@/lib/stageInfo/1chronicles-01-06";
import { CHAPTER_ACTORS_07_12 } from "@/lib/stageInfo/1chronicles-07-12";
import { CHAPTER_ACTORS_13_21 } from "@/lib/stageInfo/1chronicles-13-21";
import { CHAPTER_ACTORS_22_29 } from "@/lib/stageInfo/1chronicles-22-29";

export const CHAPTER_ACTORS: Record<number, Record<string, StageInfo>> = {
  ...CHAPTER_ACTORS_01_06,
  ...CHAPTER_ACTORS_07_12,
  ...CHAPTER_ACTORS_13_21,
  ...CHAPTER_ACTORS_22_29,
};
