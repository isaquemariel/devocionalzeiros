// ============================================================================
// NÚMEROS — modo CENA VIVA. Um beat por versículo, fiel ao texto ARC (o texto
// exibido vem da Bíblia em runtime; aqui só a DIREÇÃO DE CENA).
//
// Os capítulos vivem em src/lib/stage/numbers/chXX_YY.ts (dois capítulos por
// arquivo) e são agregados aqui. Números 1–36 completo.
//
// Validação obrigatória antes de qualquer merge:
//   node scripts/validate-stage.mjs
// ============================================================================

import type { StageScript } from "@/lib/rpgStage";
import { CHAPTERS as CH01_02 } from "@/lib/stage/numbers/ch01_02";
import { CHAPTERS as CH03_04 } from "@/lib/stage/numbers/ch03_04";
import { CHAPTERS as CH05_06 } from "@/lib/stage/numbers/ch05_06";
import { CHAPTERS as CH07_08 } from "@/lib/stage/numbers/ch07_08";
import { CHAPTERS as CH09_10 } from "@/lib/stage/numbers/ch09_10";
import { CHAPTERS as CH11_12 } from "@/lib/stage/numbers/ch11_12";
import { CHAPTERS as CH13_14 } from "@/lib/stage/numbers/ch13_14";
import { CHAPTERS as CH15_16 } from "@/lib/stage/numbers/ch15_16";
import { CHAPTERS as CH17_18 } from "@/lib/stage/numbers/ch17_18";
import { CHAPTERS as CH19_20 } from "@/lib/stage/numbers/ch19_20";
import { CHAPTERS as CH21_22 } from "@/lib/stage/numbers/ch21_22";
import { CHAPTERS as CH23_24 } from "@/lib/stage/numbers/ch23_24";
import { CHAPTERS as CH25_26 } from "@/lib/stage/numbers/ch25_26";
import { CHAPTERS as CH27_28 } from "@/lib/stage/numbers/ch27_28";
import { CHAPTERS as CH29_30 } from "@/lib/stage/numbers/ch29_30";
import { CHAPTERS as CH31_32 } from "@/lib/stage/numbers/ch31_32";
import { CHAPTERS as CH33_34 } from "@/lib/stage/numbers/ch33_34";
import { CHAPTERS as CH35_36 } from "@/lib/stage/numbers/ch35_36";

export const NUMBERS_STAGE: Record<number, StageScript> = {
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
  ...CH27_28,
  ...CH29_30,
  ...CH31_32,
  ...CH33_34,
  ...CH35_36,
};
