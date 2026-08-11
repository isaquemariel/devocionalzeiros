// ============================================================================
// JUÍZES — modo CENA VIVA. Um beat por versículo, fiel ao texto ARC (o texto
// exibido vem da Bíblia em runtime; aqui só a DIREÇÃO DE CENA).
//
// Depois de Josué, o CICLO que se repete e se agrava: Israel serve aos baalins,
// Deus o entrega ao opressor, o povo clama, Deus levanta um juiz, a terra
// descansa — e tudo recomeça. Débora sob a palmeira, o velo e as tochas de
// Gideão, a parábola de Jotão, o voto de Jefté, Sansão e a casa de Dagom, até o
// fecho: "cada um fazia o que parecia reto aos seus olhos" (Jz 21:25).
// Os capítulos vivem em src/lib/stage/judges/chXX_YY.ts. Juízes 1–21.
//
// Validação obrigatória antes de qualquer merge:
//   node scripts/validate-stage.mjs && node scripts/checkup-stage.mjs
// ============================================================================

import type { StageScript } from "@/lib/rpgStage";
import { CHAPTERS as CH01_03 } from "@/lib/stage/judges/ch01_03";
import { CHAPTERS as CH04_05 } from "@/lib/stage/judges/ch04_05";
import { CHAPTERS as CH06_07 } from "@/lib/stage/judges/ch06_07";
import { CHAPTERS as CH08_09 } from "@/lib/stage/judges/ch08_09";
import { CHAPTERS as CH10_12 } from "@/lib/stage/judges/ch10_12";
import { CHAPTERS as CH13_14 } from "@/lib/stage/judges/ch13_14";
import { CHAPTERS as CH15_16 } from "@/lib/stage/judges/ch15_16";
import { CHAPTERS as CH17_19 } from "@/lib/stage/judges/ch17_19";
import { CHAPTERS as CH20_21 } from "@/lib/stage/judges/ch20_21";

export const JUDGES_STAGE: Record<number, StageScript> = {
  ...CH01_03, ...CH04_05, ...CH06_07, ...CH08_09, ...CH10_12,
  ...CH13_14, ...CH15_16, ...CH17_19, ...CH20_21,
};
