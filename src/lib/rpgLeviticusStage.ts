// ============================================================================
// LEVÍTICO — modo CENA VIVA. Um beat por versículo, fiel ao texto ARC (o texto
// exibido vem da Bíblia em runtime; aqui só a DIREÇÃO DE CENA).
//
// Os capítulos vivem em src/lib/stage/leviticus/chXX_YY.ts (dois capítulos por
// arquivo) e são agregados aqui. Rollout incremental: capítulo sem roteiro cai
// automaticamente na leitura clássica (hasStageScript decide por capítulo).
//
// Validação obrigatória antes de qualquer merge:
//   node scripts/validate-stage.mjs
// ============================================================================

import type { StageScript } from "@/lib/rpgStage";
import { CHAPTERS as CH01_02 } from "@/lib/stage/leviticus/ch01_02";
import { CHAPTERS as CH03_04 } from "@/lib/stage/leviticus/ch03_04";
import { CHAPTERS as CH05_06 } from "@/lib/stage/leviticus/ch05_06";
import { CHAPTERS as CH07_08 } from "@/lib/stage/leviticus/ch07_08";
import { CHAPTERS as CH09_10 } from "@/lib/stage/leviticus/ch09_10";
import { CHAPTERS as CH11_12 } from "@/lib/stage/leviticus/ch11_12";

export const LEVITICUS_STAGE: Record<number, StageScript> = {
  ...CH01_02,
  ...CH03_04,
  ...CH05_06,
  ...CH07_08,
  ...CH09_10,
  ...CH11_12,
};
