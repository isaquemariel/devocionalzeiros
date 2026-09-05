// ============================================================================
// ESDRAS — modo CENA VIVA. Um beat por versículo, fiel ao texto ARC.
//
// O livro começa exatamente onde 2 Crônicas termina — no decreto de Ciro — e
// conta a volta em duas levas separadas por cinquenta e oito anos: a de
// Zorobabel e Jesua, que levanta o altar sobre as suas bases e lança os
// fundamentos da casa, e a de Esdras, o escriba hábil na lei, "porque tinha
// preparado o seu coração para buscar a lei do SENHOR, e para a cumprir, e para
// ensinar em Israel os seus estatutos e os seus juízos" (7:10).
//
// Dois capítulos eram o perigo do livro: o arrolamento de Esdras 2 (setenta
// versículos de casas, cidades e ofícios) e a lista final de Esdras 10. A regra
// foi a mesma das genealogias de 1 Crônicas — a lista é um MAPA de casas, de
// cidades e de ofícios, e é isso que o palco mostra: a eira, o lagar, o poço, o
// arraial de noite, Belém e Netofá e Anatote, o adro dos sacerdotes, o coro de
// Asafe, o posto dos porteiros, o ribeiro dos netinins, a oficina dos servos de
// Salomão, o portão dos que não puderam mostrar a casa de seus pais.
//
// Deus não fala por voz do céu em nenhum dos dez capítulos. Em 5:1-2 a palavra
// vem por AGEU e por ZACARIAS, filho de Ido, em cena e com glória; em 1:1 Ele
// desperta o espírito de Ciro em silêncio, e o quadro é o rei com o pregão na
// mão. Os outros mediadores são de PAPEL — o pregão de Ciro, a carta de Reum e
// Sinsai, a resposta de Artaxerxes, a carta de Tatenai e o rolo achado em
// Acmeta —, e o balão sai sempre de quem lê, com o rolo dominando o quadro.
//
// Os capítulos vivem em src/lib/stage/ezra/chXX_YY.ts.
//
// Validação obrigatória antes de qualquer merge:
//   node scripts/validate-stage.mjs && node scripts/checkup-stage.mjs
//   node scripts/qa-stage.mjs ezra
// ============================================================================

import type { StageScript } from "@/lib/rpgStage";
import { CHAPTERS as CH01_06 } from "@/lib/stage/ezra/ch01_06";
import { CHAPTERS as CH07_10 } from "@/lib/stage/ezra/ch07_10";

export const EZRA_STAGE: Record<number, StageScript> = {
  ...CH01_06,
  ...CH07_10,
};
