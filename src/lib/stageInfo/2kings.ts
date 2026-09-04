// Fichas por (capítulo → papel) de 2 REIS — rede de segurança contextual para
// os figurantes anônimos (o `id` nomeado vence esta ficha; ver actorInfo).
// Agrega as três faixas autorais (1-8, 9-17, 18-25) num único CHAPTER_ACTORS.
import type { StageInfo } from "@/lib/rpgStageInfo";
import { CHAPTER_ACTORS_01_08 } from "@/lib/stageInfo/2kings-01-08";
import { CHAPTER_ACTORS_09_17 } from "@/lib/stageInfo/2kings-09-17";
import { CHAPTER_ACTORS_18_25 } from "@/lib/stageInfo/2kings-18-25";

export const CHAPTER_ACTORS: Record<number, Record<string, StageInfo>> = {
  ...CHAPTER_ACTORS_01_08,
  ...CHAPTER_ACTORS_09_17,
  ...CHAPTER_ACTORS_18_25,
};
