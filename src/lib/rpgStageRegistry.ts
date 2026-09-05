// ============================================================================
// Registro do modo CENA VIVA (palco andável). Livros/capítulos listados aqui
// usam o RPGStageScene no lugar do RPGReadingScene. Rollout: Apocalipse
// completo; demais livros entram por ondas (Gênesis em diante).
// `STAGE_BOOKS` é a fonte única — o validador (scripts/validate-stage.mjs)
// confere cada capítulo contra o texto ARC antes de qualquer merge.
// ============================================================================

import { REVELATION_STAGE } from "@/lib/rpgRevelationStage";
import { GENESIS_STAGE } from "@/lib/rpgGenesisStage";
import { EXODUS_STAGE } from "@/lib/rpgExodusStage";
import { LEVITICUS_STAGE } from "@/lib/rpgLeviticusStage";
import { NUMBERS_STAGE } from "@/lib/rpgNumbersStage";
import { DEUTERONOMY_STAGE } from "@/lib/rpgDeuteronomyStage";
import { JOSHUA_STAGE } from "@/lib/rpgJoshuaStage";
import { JUDGES_STAGE } from "@/lib/rpgJudgesStage";
import { RUTH_STAGE } from "@/lib/rpgRuthStage";
import { FIRST_SAMUEL_STAGE } from "@/lib/rpg1SamuelStage";
import { SECOND_SAMUEL_STAGE } from "@/lib/rpg2SamuelStage";
import { FIRST_KINGS_STAGE } from "@/lib/rpg1KingsStage";
import { SECOND_KINGS_STAGE } from "@/lib/rpg2KingsStage";
import { FIRST_CHRONICLES_STAGE } from "@/lib/rpg1ChroniclesStage";
import { SECOND_CHRONICLES_STAGE } from "@/lib/rpg2ChroniclesStage";
import { EZRA_STAGE } from "@/lib/rpgEzraStage";
import { ESTHER_STAGE } from "@/lib/rpgEstherStage";
import { JOB_STAGE } from "@/lib/rpgJobStage";
import type { StageScript } from "@/lib/rpgStage";

export const STAGE_BOOKS: Record<string, Record<number, StageScript>> = {
  genesis: GENESIS_STAGE,
  exodus: EXODUS_STAGE,
  leviticus: LEVITICUS_STAGE,
  numbers: NUMBERS_STAGE,
  deuteronomy: DEUTERONOMY_STAGE,
  joshua: JOSHUA_STAGE,
  judges: JUDGES_STAGE,
  ruth: RUTH_STAGE,
  "1samuel": FIRST_SAMUEL_STAGE,
  "2samuel": SECOND_SAMUEL_STAGE,
  "1kings": FIRST_KINGS_STAGE,
  "2kings": SECOND_KINGS_STAGE,
  "1chronicles": FIRST_CHRONICLES_STAGE,
  "2chronicles": SECOND_CHRONICLES_STAGE,
  ezra: EZRA_STAGE,
  esther: ESTHER_STAGE,
  job: JOB_STAGE,
  revelation: REVELATION_STAGE,
};

export function hasStageScript(bookId: string, chapter: number): boolean {
  return !!STAGE_BOOKS[bookId]?.[chapter];
}

export function getStageScript(bookId: string, chapter: number): StageScript | undefined {
  return STAGE_BOOKS[bookId]?.[chapter];
}
