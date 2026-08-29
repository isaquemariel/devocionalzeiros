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

export const SECOND_SAMUEL_STAGE: Record<number, StageScript> = {
  ...CH04_06,
};
