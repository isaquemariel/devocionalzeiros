// Fichas por (capítulo → papel) de JOSUÉ — rede de segurança contextual para os
// figurantes anônimos (o `id` nomeado vence esta ficha; ver actorInfo). Agrega as
// quatro faixas autorais (1-6, 7-12, 13-18, 19-24) num único CHAPTER_ACTORS.
import type { StageInfo } from "@/lib/rpgStageInfo";
import { CHAPTER_ACTORS_1_6 } from "@/lib/stageInfo/joshua-1-6";
import { CHAPTER_ACTORS_7_12 } from "@/lib/stageInfo/joshua-7-12";
import { CHAPTER_ACTORS_13_18 } from "@/lib/stageInfo/joshua-13-18";
import { CHAPTER_ACTORS_19_24 } from "@/lib/stageInfo/joshua-19-24";

export const CHAPTER_ACTORS: Record<number, Record<string, StageInfo>> = {
  ...CHAPTER_ACTORS_1_6,
  ...CHAPTER_ACTORS_7_12,
  ...CHAPTER_ACTORS_13_18,
  ...CHAPTER_ACTORS_19_24,
};
