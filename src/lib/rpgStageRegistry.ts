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
import type { StageScript } from "@/lib/rpgStage";

export const STAGE_BOOKS: Record<string, Record<number, StageScript>> = {
  genesis: GENESIS_STAGE,
  exodus: EXODUS_STAGE,
  leviticus: LEVITICUS_STAGE,
  revelation: REVELATION_STAGE,
};

export function hasStageScript(bookId: string, chapter: number): boolean {
  return !!STAGE_BOOKS[bookId]?.[chapter];
}

export function getStageScript(bookId: string, chapter: number): StageScript | undefined {
  return STAGE_BOOKS[bookId]?.[chapter];
}
