// ============================================================================
// Registro do modo CENA VIVA (palco andável). Livros/capítulos listados aqui
// usam o RPGStageScene no lugar do RPGReadingScene. Rollout gradual: começa
// por Apocalipse (piloto caps. 1–3) sem tocar nos demais livros.
// ============================================================================

import { REVELATION_STAGE } from "@/lib/rpgRevelationStage";
import type { StageScript } from "@/lib/rpgStage";

const STAGE_REGISTRY: Record<string, Record<number, StageScript>> = {
  revelation: REVELATION_STAGE,
};

export function hasStageScript(bookId: string, chapter: number): boolean {
  return !!STAGE_REGISTRY[bookId]?.[chapter];
}

export function getStageScript(bookId: string, chapter: number): StageScript | undefined {
  return STAGE_REGISTRY[bookId]?.[chapter];
}
