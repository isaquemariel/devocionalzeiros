// Agregador das fichas por (livro → capítulo → papel). Fonte para
// ACTOR_INFO_BY_CHAPTER em rpgStageInfo (resolvida ANTES da ficha genérica).
import type { StageInfo } from "@/lib/rpgStageInfo";
import { CHAPTER_ACTORS as genesis } from "@/lib/stageInfo/genesis";
import { CHAPTER_ACTORS as exodus } from "@/lib/stageInfo/exodus";
import { CHAPTER_ACTORS as leviticus } from "@/lib/stageInfo/leviticus";
import { CHAPTER_ACTORS as numbers } from "@/lib/stageInfo/numbers";
import { CHAPTER_ACTORS as deuteronomy } from "@/lib/stageInfo/deuteronomy";
import { CHAPTER_ACTORS as joshua } from "@/lib/stageInfo/joshua";
import { CHAPTER_ACTORS as judges } from "@/lib/stageInfo/judges";
import { CHAPTER_ACTORS as ruth } from "@/lib/stageInfo/ruth";
import { CHAPTER_ACTORS as firstSamuel } from "@/lib/stageInfo/1samuel";
import { CHAPTER_ACTORS as secondSamuel } from "@/lib/stageInfo/2samuel";
import { CHAPTER_ACTORS as firstKings } from "@/lib/stageInfo/1kings";
import { CHAPTER_ACTORS as secondKings } from "@/lib/stageInfo/2kings";
import { CHAPTER_ACTORS as firstChronicles } from "@/lib/stageInfo/1chronicles";
import { CHAPTER_ACTORS as secondChronicles } from "@/lib/stageInfo/2chronicles";
import { CHAPTER_ACTORS as ezra } from "@/lib/stageInfo/ezra";
import { CHAPTER_ACTORS as esther } from "@/lib/stageInfo/esther";
import { CHAPTER_ACTORS as job } from "@/lib/stageInfo/job";
import { CHAPTER_ACTORS as revelation } from "@/lib/stageInfo/revelation";

export const ACTOR_INFO_BY_CHAPTER: Record<string, Record<number, Record<string, StageInfo>>> = {
  genesis, exodus, leviticus, numbers, deuteronomy, joshua, judges, ruth,
  "1samuel": firstSamuel,
  "2samuel": secondSamuel,
  "1kings": firstKings,
  "2kings": secondKings,
  "1chronicles": firstChronicles,
  "2chronicles": secondChronicles,
  ezra,
  esther,
  job,
  revelation,
};
