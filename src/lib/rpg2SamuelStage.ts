// ============================================================================
// 2 SAMUEL — modo CENA VIVA. Um beat por versículo, fiel ao texto ARC.
//
// O livro do REI: a subida a Hebrom e a Jerusalém, a arca entrando na cidade
// com júbilo, e a ALIANÇA do capítulo 7 — a casa que Davi queria construir e a
// casa que Deus promete construir para ele, "para sempre". Do alto, a queda:
// o terraço, a carta que mata Urias, o "tu és o homem" de Natã, e a espada que
// nunca mais se aparta daquela casa — Amnom, Tamar, Absalão, o carvalho, a
// fuga descalça pelo Olival e o choro na sala da porta. Fecha em dois cânticos
// e na eira de Araúna, chão do futuro templo.
// Os capítulos vivem em src/lib/stage/2samuel/chXX_YY.ts.
//
// Validação obrigatória antes de qualquer merge:
//   node scripts/validate-stage.mjs && node scripts/checkup-stage.mjs
// ============================================================================

import type { StageScript } from "@/lib/rpgStage";
import { CHAPTERS as CH04_06 } from "@/lib/stage/2samuel/ch04_06";
import { CHAPTERS as CH01_03 } from "@/lib/stage/2samuel/ch01_03";
import { CHAPTERS as CH10_12 } from "@/lib/stage/2samuel/ch10_12";
import { CHAPTERS as CH13_14 } from "@/lib/stage/2samuel/ch13_14";
import { CHAPTERS as CH15_16 } from "@/lib/stage/2samuel/ch15_16";
import { CHAPTERS as CH17_18 } from "@/lib/stage/2samuel/ch17_18";
import { CHAPTERS as CH19_20 } from "@/lib/stage/2samuel/ch19_20";
import { CHAPTERS as CH23_24 } from "@/lib/stage/2samuel/ch23_24";
import { CHAPTERS as CH13_14 } from "@/lib/stage/2samuel/ch13_14";
import { CHAPTERS as CH15_16 } from "@/lib/stage/2samuel/ch15_16";
import { CHAPTERS as CH17_18 } from "@/lib/stage/2samuel/ch17_18";

export const SECOND_SAMUEL_STAGE: Record<number, StageScript> = {
  ...CH04_06,
  ...CH01_03,
  ...CH10_12,
  ...CH13_14,
  ...CH15_16,
  ...CH17_18,
  ...CH19_20,
  ...CH23_24,
  ...CH13_14,
  ...CH15_16,
  ...CH17_18,
};
