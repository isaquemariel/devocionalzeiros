// ============================================================================
// 1 REIS — modo CENA VIVA. Um beat por versículo, fiel ao texto ARC.
//
// O livro da CASA e da RUÍNA: Salomão ungido sobre a mula de Davi, o sonho de
// Gibeão, o juízo das duas mulheres, e o templo levantado em silêncio — "nem
// martelo, nem machado, nem nenhum outro instrumento de ferro se ouviu na casa
// quando a edificavam". Depois a nuvem que enche a casa e a oração de joelhos:
// "habitaria Deus na terra?". E então a queda: as mulheres estrangeiras, a capa
// de Aías rasgada em doze pedaços, o reino partido em Siquém, os dois bezerros
// de ouro. Fecha na era de Elias — os corvos, a botija de azeite, o fogo do
// Carmelo, a voz mansa e delicada em Horebe, a vinha de Nabote e os cães
// lambendo o sangue no tanque de Samaria.
// Os capítulos vivem em src/lib/stage/1kings/chXX_YY.ts.
//
// Validação obrigatória antes de qualquer merge:
//   node scripts/validate-stage.mjs && node scripts/checkup-stage.mjs
//   node scripts/qa-stage.mjs 1kings
// ============================================================================

import type { StageScript } from "@/lib/rpgStage";
import { CHAPTERS as CH03_04 } from "@/lib/stage/1kings/ch03_04";
import { CHAPTERS as CH05_06 } from "@/lib/stage/1kings/ch05_06";
import { CHAPTERS as CH07 } from "@/lib/stage/1kings/ch07";
import { CHAPTERS as CH08 } from "@/lib/stage/1kings/ch08";
import { CHAPTERS as CH09_10 } from "@/lib/stage/1kings/ch09_10";
import { CHAPTERS as CH11_12 } from "@/lib/stage/1kings/ch11_12";
import { CHAPTERS as CH13_14 } from "@/lib/stage/1kings/ch13_14";
import { CHAPTERS as CH15_16 } from "@/lib/stage/1kings/ch15_16";
import { CHAPTERS as CH17_18 } from "@/lib/stage/1kings/ch17_18";
import { CHAPTERS as CH21_22 } from "@/lib/stage/1kings/ch21_22";

export const FIRST_KINGS_STAGE: Record<number, StageScript> = {
  ...CH03_04,
  ...CH05_06,
  ...CH07,
  ...CH08,
  ...CH09_10,
  ...CH11_12,
  ...CH13_14,
  ...CH15_16,
  ...CH17_18,
  ...CH21_22,
};
