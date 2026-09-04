// Fichas por (capítulo → papel) de 1 REIS — rede de segurança contextual para
// os figurantes anônimos (o `id` nomeado vence esta ficha; ver actorInfo).
// Agrega as três faixas autorais (1-6, 7-14, 15-22) num único CHAPTER_ACTORS.
import type { StageInfo } from "@/lib/rpgStageInfo";
import { CHAPTER_ACTORS_01_06 } from "@/lib/stageInfo/1kings-01-06";
import { CHAPTER_ACTORS_07_14 } from "@/lib/stageInfo/1kings-07-14";
import { CHAPTER_ACTORS_15_22 } from "@/lib/stageInfo/1kings-15-22";

export const CHAPTER_ACTORS: Record<number, Record<string, StageInfo>> = {
  ...CHAPTER_ACTORS_01_06,
  ...CHAPTER_ACTORS_07_14,
  ...CHAPTER_ACTORS_15_22,
};
