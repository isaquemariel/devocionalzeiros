// ============================================================================
// ÊXODO — modo CENA VIVA. Um beat por versículo, fiel ao texto ARC (o texto
// exibido vem da Bíblia em runtime; aqui só a DIREÇÃO DE CENA).
//
// Os capítulos vivem em src/lib/stage/exodus/chXX_YY.ts (dois capítulos por
// arquivo) e são agregados aqui. Rollout incremental: capítulo sem roteiro cai
// automaticamente na leitura clássica (hasStageScript decide por capítulo).
//
// Validação obrigatória antes de qualquer merge:
//   node scripts/validate-stage.mjs   (versículos, falas, whitelists, palco)
// ============================================================================

import type { StageScript } from "@/lib/rpgStage";
import { CHAPTERS as CH01_02 } from "@/lib/stage/exodus/ch01_02";
import { CHAPTERS as CH03_04 } from "@/lib/stage/exodus/ch03_04";
import { CHAPTERS as CH05_06 } from "@/lib/stage/exodus/ch05_06";
import { CHAPTERS as CH07_08 } from "@/lib/stage/exodus/ch07_08";
import { CHAPTERS as CH09_10 } from "@/lib/stage/exodus/ch09_10";
import { CHAPTERS as CH11_12 } from "@/lib/stage/exodus/ch11_12";
import { CHAPTERS as CH13_14 } from "@/lib/stage/exodus/ch13_14";
import { CHAPTERS as CH15_16 } from "@/lib/stage/exodus/ch15_16";
import { CHAPTERS as CH17_18 } from "@/lib/stage/exodus/ch17_18";
import { CHAPTERS as CH19_20 } from "@/lib/stage/exodus/ch19_20";

export const EXODUS_STAGE: Record<number, StageScript> = {
  ...CH01_02, ...CH03_04, ...CH05_06, ...CH07_08, ...CH09_10, ...CH11_12,
  ...CH13_14, ...CH15_16, ...CH17_18, ...CH19_20,
};

/** Capítulos de Êxodo já disponíveis no modo cena viva. */
export const EXODUS_STAGE_CHAPTERS = Object.keys(EXODUS_STAGE).map(Number).sort((a, b) => a - b);
