// Fichas por (capítulo → papel) de 1 SAMUEL — rede de segurança contextual para
// os figurantes anônimos (o `id` nomeado vence esta ficha; ver actorInfo).
// Agrega as cinco faixas autorais (1-6, 7-12, 13-18, 19-26, 27-31) num único
// CHAPTER_ACTORS.
import type { StageInfo } from "@/lib/rpgStageInfo";
import { CHAPTER_ACTORS_01_06 } from "@/lib/stageInfo/1samuel-01-06";
import { CHAPTER_ACTORS_07_12 } from "@/lib/stageInfo/1samuel-07-12";
import { CHAPTER_ACTORS_13_18 } from "@/lib/stageInfo/1samuel-13-18";
import { CHAPTER_ACTORS_19_26 } from "@/lib/stageInfo/1samuel-19-26";

export const CHAPTER_ACTORS: Record<number, Record<string, StageInfo>> = {
  ...CHAPTER_ACTORS_01_06,
  ...CHAPTER_ACTORS_07_12,
  ...CHAPTER_ACTORS_13_18,
  ...CHAPTER_ACTORS_19_26,
};
