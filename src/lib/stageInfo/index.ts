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
import { CHAPTER_ACTORS as revelation } from "@/lib/stageInfo/revelation";

export const ACTOR_INFO_BY_CHAPTER: Record<string, Record<number, Record<string, StageInfo>>> = {
  genesis, exodus, leviticus, numbers, deuteronomy, joshua, judges, ruth, revelation,
};
