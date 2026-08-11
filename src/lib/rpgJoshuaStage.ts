// ============================================================================
// JOSUÉ — modo CENA VIVA. Um beat por versículo, fiel ao texto ARC (o texto
// exibido vem da Bíblia em runtime; aqui só a DIREÇÃO DE CENA).
//
// A conquista de Canaã a oeste do Jordão, depois da morte de Moisés: a
// travessia a seco, a queda de Jericó, as campanhas do sul e do norte, a
// repartição da terra por sortes e a aliança final em Siquém. Os capítulos
// vivem em src/lib/stage/joshua/chXX_YY.ts e são agregados aqui. Josué 1–24.
//
// Validação obrigatória antes de qualquer merge:
//   node scripts/validate-stage.mjs
// ============================================================================

import type { StageScript } from "@/lib/rpgStage";
import { CHAPTERS as CH01_02 } from "@/lib/stage/joshua/ch01_02";
import { CHAPTERS as CH03_04 } from "@/lib/stage/joshua/ch03_04";
import { CHAPTERS as CH05_06 } from "@/lib/stage/joshua/ch05_06";
import { CHAPTERS as CH07_08 } from "@/lib/stage/joshua/ch07_08";
import { CHAPTERS as CH09_10 } from "@/lib/stage/joshua/ch09_10";
import { CHAPTERS as CH11_12 } from "@/lib/stage/joshua/ch11_12";
import { CHAPTERS as CH13_14 } from "@/lib/stage/joshua/ch13_14";
import { CHAPTERS as CH15_16 } from "@/lib/stage/joshua/ch15_16";
import { CHAPTERS as CH17_18 } from "@/lib/stage/joshua/ch17_18";
import { CHAPTERS as CH19_20 } from "@/lib/stage/joshua/ch19_20";
import { CHAPTERS as CH21_22 } from "@/lib/stage/joshua/ch21_22";
import { CHAPTERS as CH23_24 } from "@/lib/stage/joshua/ch23_24";

export const JOSHUA_STAGE: Record<number, StageScript> = {
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
};
