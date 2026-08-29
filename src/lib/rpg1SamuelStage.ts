// ============================================================================
// 1 SAMUEL — modo CENA VIVA. Um beat por versículo, fiel ao texto ARC.
//
// O livro da DOBRADIÇA: começa com uma mulher estéril orando sem voz no umbral
// de Siló e termina com um rei suicida no monte Gilboa. Entre os dois extremos
// cabe a última geração dos juízes (Eli e Samuel), a arca capturada e devolvida
// pelas mãos dos próprios filisteus, o povo pedindo "um rei como o têm todas as
// nações", a ascensão e a ruína de Saul, e a longa formação de Davi — do
// rebanho de Belém ao vale do carvalho, das cavernas de Adulão e En-Gedi à
// noite de Ziclague. Os capítulos vivem em src/lib/stage/1samuel/chXX_YY.ts.
//
// Validação obrigatória antes de qualquer merge:
//   node scripts/validate-stage.mjs && node scripts/checkup-stage.mjs
// ============================================================================

import type { StageScript } from "@/lib/rpgStage";
import { CHAPTERS as CH01_03 } from "@/lib/stage/1samuel/ch01_03";
import { CHAPTERS as CH04_06 } from "@/lib/stage/1samuel/ch04_06";
import { CHAPTERS as CH07_09 } from "@/lib/stage/1samuel/ch07_09";
import { CHAPTERS as CH10_12 } from "@/lib/stage/1samuel/ch10_12";
import { CHAPTERS as CH13_14 } from "@/lib/stage/1samuel/ch13_14";
import { CHAPTERS as CH15_16 } from "@/lib/stage/1samuel/ch15_16";
import { CHAPTERS as CH17_18 } from "@/lib/stage/1samuel/ch17_18";
import { CHAPTERS as CH19_21 } from "@/lib/stage/1samuel/ch19_21";
import { CHAPTERS as CH22_24 } from "@/lib/stage/1samuel/ch22_24";
import { CHAPTERS as CH25_26 } from "@/lib/stage/1samuel/ch25_26";

export const FIRST_SAMUEL_STAGE: Record<number, StageScript> = {
  ...CH01_03,
  ...CH04_06,
  ...CH07_09,
  ...CH10_12,
  ...CH13_14,
  ...CH15_16,
  ...CH17_18,
  ...CH19_21,
  ...CH22_24,
  ...CH25_26,
};
