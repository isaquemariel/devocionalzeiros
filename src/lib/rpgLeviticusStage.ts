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
import { CHAPTERS as CH13_14 } from "@/lib/stage/leviticus/ch13_14";
import { CHAPTERS as CH15_16 } from "@/lib/stage/leviticus/ch15_16";
import { CHAPTERS as CH17_18 } from "@/lib/stage/leviticus/ch17_18";
import { CHAPTERS as CH19_20 } from "@/lib/stage/leviticus/ch19_20";
import { CHAPTERS as CH21_22 } from "@/lib/stage/leviticus/ch21_22";
import { CHAPTERS as CH23_24 } from "@/lib/stage/leviticus/ch23_24";
import { CHAPTERS as CH25_26 } from "@/lib/stage/leviticus/ch25_26";
import { CHAPTERS as CH27 } from "@/lib/stage/leviticus/ch27";

export const LEVITICUS_STAGE: Record<number, StageScript> = {
  ...CH01_02,
  ...CH03_04,
  ...CH05_06,
  ...CH07_08,
  ...CH09_10,
  ...CH11_12,
  ...CH13_14,
  ...CH15_16,
  ...CH17_18,
  ...CH19_20,
  ...CH21_22,
  ...CH23_24,
  ...CH25_26,
  ...CH27,
};
