// ============================================================================
// 2 CRÔNICAS — modo CENA VIVA. Um beat por versículo, fiel ao texto ARC.
//
// O livro que conta a história de Judá do templo até o cativeiro, e conta-a de
// dentro da casa: as medidas, o mar de fundição sobre os doze bois, o véu de
// azul, púrpura e carmesim, e a nuvem que enche a casa de tal modo que os
// sacerdotes não podem ficar em pé para ministrar. Depois o púlpito de bronze e
// os sete casos da oração de Salomão, o fogo que desce, e a frase que o livro
// inteiro vai cobrar de vinte reis: "se o meu povo, que se chama pelo meu nome,
// se humilhar" (7:14).
//
// Do capítulo 10 em diante é o desfile dos reis de Judá, e o risco era o mesmo
// trono e o mesmo escriba de ponta a ponta. A regra foi dar a cada rei o seu
// objeto e o seu lugar: os escudos de ouro trocados por escudos de bronze,
// Abias em pé no monte Zemaraim, Asa tirando a própria mãe de rainha, os
// cantores saindo ADIANTE do exército em En-Gedi, a carta que chega escrita de
// Elias, o menino escondido seis anos na casa de Deus, a arca furada à porta,
// Zacarias apedrejado no átrio, o incensário na mão de Uzias e a lepra na
// testa, os correios da páscoa de Ezequias escarnecidos até Zebulom, Manassés
// preso com ganchos e ouvido quando ora, o livro achado nas mãos de Hilquias, a
// páscoa dos trinta mil cordeiros, e o vale de Megido.
//
// Deus quase nunca fala aqui sem mediador: este é o livro que mais multiplica
// profetas nomeados — Semaías, Azarias filho de Odede, Hanani, Micaías filho de
// Inlá, Jeú filho de Hanani, Jaaziel, Eliézer, Zacarias filho de Joiada, Odede,
// Hulda, Jeremias. A voz do céu (`by: "deus"`) ficou só onde o texto não põe
// boca nenhuma entre Deus e quem ouve: as duas aparições noturnas a Salomão, em
// Gibeom (1:7-12) e depois do fogo (7:12-22). Em 35:21 a palavra "que saiu da
// boca de Deus" sai pela boca de Necó, rei do Egito, e o balão é dele.
//
// Os capítulos vivem em src/lib/stage/2chronicles/chXX_YY.ts.
//
// Validação obrigatória antes de qualquer merge:
//   node scripts/validate-stage.mjs && node scripts/checkup-stage.mjs
//   node scripts/qa-stage.mjs 2chronicles
// ============================================================================

import type { StageScript } from "@/lib/rpgStage";
import { CHAPTERS as CH01_04 } from "@/lib/stage/2chronicles/ch01_04";
import { CHAPTERS as CH05_09 } from "@/lib/stage/2chronicles/ch05_09";
import { CHAPTERS as CH10_14 } from "@/lib/stage/2chronicles/ch10_14";
import { CHAPTERS as CH15_20 } from "@/lib/stage/2chronicles/ch15_20";
import { CHAPTERS as CH21_26 } from "@/lib/stage/2chronicles/ch21_26";
import { CHAPTERS as CH27_31 } from "@/lib/stage/2chronicles/ch27_31";
import { CHAPTERS as CH32_36 } from "@/lib/stage/2chronicles/ch32_36";

export const SECOND_CHRONICLES_STAGE: Record<number, StageScript> = {
  ...CH01_04,
  ...CH05_09,
  ...CH10_14,
  ...CH15_20,
  ...CH21_26,
  ...CH27_31,
  ...CH32_36,
};
