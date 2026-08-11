// ============================================================================
// RUTE — modo CENA VIVA. Um beat por versículo, fiel ao texto ARC.
//
// "Nos dias em que os juízes julgavam": a fome, Moabe e a viuvez; a fidelidade
// de Rute ("o teu povo é o meu povo"); a colheita no campo de Boaz; a eira; o
// remidor à porta da cidade — e a linhagem que desemboca em Davi (Rt 4:22).
// Os capítulos vivem em src/lib/stage/ruth/chXX_YY.ts. Rute 1–4.
//
// Validação obrigatória antes de qualquer merge:
//   node scripts/validate-stage.mjs && node scripts/checkup-stage.mjs
// ============================================================================

import type { StageScript } from "@/lib/rpgStage";
import { CHAPTERS as CH01_04 } from "@/lib/stage/ruth/ch01_04";

export const RUTH_STAGE: Record<number, StageScript> = { ...CH01_04 };
