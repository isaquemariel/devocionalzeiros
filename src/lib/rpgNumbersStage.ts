// ============================================================================
// NÚMEROS — modo CENA VIVA. Um beat por versículo, fiel ao texto ARC (o texto
// exibido vem da Bíblia em runtime; aqui só a DIREÇÃO DE CENA).
//
// Os capítulos vivem em src/lib/stage/numbers/chXX_YY.ts (dois capítulos por
// arquivo) e são agregados aqui. Rollout incremental: capítulo sem roteiro cai
// automaticamente na leitura clássica (hasStageScript decide por capítulo).
//
// Validação obrigatória antes de qualquer merge:
//   node scripts/validate-stage.mjs
// ============================================================================

import type { StageScript } from "@/lib/rpgStage";
import { CHAPTERS as CH01_02 } from "@/lib/stage/numbers/ch01_02";
import { CHAPTERS as CH03_04 } from "@/lib/stage/numbers/ch03_04";
import { CHAPTERS as CH05_06 } from "@/lib/stage/numbers/ch05_06";

export const NUMBERS_STAGE: Record<number, StageScript> = {
  ...CH01_02,
  ...CH03_04,
  ...CH05_06,
};
