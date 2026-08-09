// ============================================================================
// DEUTERONÔMIO — modo CENA VIVA. Um beat por versículo, fiel ao texto ARC (o
// texto exibido vem da Bíblia em runtime; aqui só a DIREÇÃO DE CENA).
//
// O livro dos discursos de Moisés nas campinas de Moabe: ele RELEMBRA a jornada
// (encenada em flashback vivo) e REPETE a Lei antes de morrer no Nebo. Os
// capítulos vivem em src/lib/stage/deuteronomy/chXX_YY.ts e são agregados aqui.
// Deuteronômio 1–34 completo — o fecho do Pentateuco.
//
// Validação obrigatória antes de qualquer merge:
//   node scripts/validate-stage.mjs
// ============================================================================

import type { StageScript } from "@/lib/rpgStage";
import { CHAPTERS as CH01_03 } from "@/lib/stage/deuteronomy/ch01_03";
import { CHAPTERS as CH04_05 } from "@/lib/stage/deuteronomy/ch04_05";
import { CHAPTERS as CH06_07 } from "@/lib/stage/deuteronomy/ch06_07";
import { CHAPTERS as CH08_09 } from "@/lib/stage/deuteronomy/ch08_09";
import { CHAPTERS as CH10_11 } from "@/lib/stage/deuteronomy/ch10_11";
import { CHAPTERS as CH12_14 } from "@/lib/stage/deuteronomy/ch12_14";
import { CHAPTERS as CH15_17 } from "@/lib/stage/deuteronomy/ch15_17";
import { CHAPTERS as CH18_20 } from "@/lib/stage/deuteronomy/ch18_20";
import { CHAPTERS as CH21_23 } from "@/lib/stage/deuteronomy/ch21_23";
import { CHAPTERS as CH24_26 } from "@/lib/stage/deuteronomy/ch24_26";
import { CHAPTERS as CH27_28 } from "@/lib/stage/deuteronomy/ch27_28";
import { CHAPTERS as CH29_30 } from "@/lib/stage/deuteronomy/ch29_30";
import { CHAPTERS as CH31_32 } from "@/lib/stage/deuteronomy/ch31_32";
import { CHAPTERS as CH33_34 } from "@/lib/stage/deuteronomy/ch33_34";

export const DEUTERONOMY_STAGE: Record<number, StageScript> = {
  ...CH01_03,
  ...CH04_05,
  ...CH06_07,
  ...CH08_09,
  ...CH10_11,
  ...CH12_14,
  ...CH15_17,
  ...CH18_20,
  ...CH21_23,
  ...CH24_26,
  ...CH27_28,
  ...CH29_30,
  ...CH31_32,
  ...CH33_34,
};
