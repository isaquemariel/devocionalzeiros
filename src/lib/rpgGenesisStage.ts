// ============================================================================
// GÊNESIS — modo CENA VIVA. Um beat por versículo, fiel ao texto ARC (o texto
// exibido vem da Bíblia em runtime; aqui só a DIREÇÃO DE CENA).
//
// Os capítulos vivem em src/lib/stage/genesis/chXX_YY.ts (dois capítulos por
// arquivo) e são agregados aqui. Rollout incremental: capítulo sem roteiro cai
// automaticamente na leitura clássica (hasStageScript decide por capítulo).
//
// Validação obrigatória antes de qualquer merge:
//   node scripts/validate-stage.mjs   (versículos, falas, whitelists, palco)
//   node scripts/smoke-beings.mjs     (render de seres/props/terrenos)
// ============================================================================

import type { StageScript } from "@/lib/rpgStage";
import { CHAPTERS as CH01_02 } from "@/lib/stage/genesis/ch01_02";
import { CHAPTERS as CH03_04 } from "@/lib/stage/genesis/ch03_04";
import { CHAPTERS as CH05_06 } from "@/lib/stage/genesis/ch05_06";
import { CHAPTERS as CH07_08 } from "@/lib/stage/genesis/ch07_08";
import { CHAPTERS as CH09_10 } from "@/lib/stage/genesis/ch09_10";
import { CHAPTERS as CH11_12 } from "@/lib/stage/genesis/ch11_12";
import { CHAPTERS as CH13_14 } from "@/lib/stage/genesis/ch13_14";
import { CHAPTERS as CH15_16 } from "@/lib/stage/genesis/ch15_16";
import { CHAPTERS as CH17_18 } from "@/lib/stage/genesis/ch17_18";
import { CHAPTERS as CH19_20 } from "@/lib/stage/genesis/ch19_20";
import { CHAPTERS as CH21_22 } from "@/lib/stage/genesis/ch21_22";
import { CHAPTERS as CH23_24 } from "@/lib/stage/genesis/ch23_24";
import { CHAPTERS as CH25_26 } from "@/lib/stage/genesis/ch25_26";
import { CHAPTERS as CH27_28 } from "@/lib/stage/genesis/ch27_28";
import { CHAPTERS as CH29_30 } from "@/lib/stage/genesis/ch29_30";
import { CHAPTERS as CH31_32 } from "@/lib/stage/genesis/ch31_32";
import { CHAPTERS as CH33_34 } from "@/lib/stage/genesis/ch33_34";
import { CHAPTERS as CH35_36 } from "@/lib/stage/genesis/ch35_36";
import { CHAPTERS as CH37_38 } from "@/lib/stage/genesis/ch37_38";
import { CHAPTERS as CH39_40 } from "@/lib/stage/genesis/ch39_40";
import { CHAPTERS as CH41_42 } from "@/lib/stage/genesis/ch41_42";
import { CHAPTERS as CH43_44 } from "@/lib/stage/genesis/ch43_44";
import { CHAPTERS as CH45_46 } from "@/lib/stage/genesis/ch45_46";
import { CHAPTERS as CH47_48 } from "@/lib/stage/genesis/ch47_48";
import { CHAPTERS as CH49_50 } from "@/lib/stage/genesis/ch49_50";

export const GENESIS_STAGE: Record<number, StageScript> = {
  ...CH01_02, ...CH03_04, ...CH05_06, ...CH07_08, ...CH09_10, ...CH11_12,
  ...CH13_14, ...CH15_16, ...CH17_18, ...CH19_20, ...CH21_22, ...CH23_24,
  ...CH25_26, ...CH27_28, ...CH29_30, ...CH31_32, ...CH33_34, ...CH35_36,
  ...CH37_38, ...CH39_40, ...CH41_42, ...CH43_44, ...CH45_46, ...CH47_48,
  ...CH49_50,
};

/** Capítulos de Gênesis já disponíveis no modo cena viva. */
export const GENESIS_STAGE_CHAPTERS = Object.keys(GENESIS_STAGE).map(Number).sort((a, b) => a - b);
