// ============================================================================
// 1 CRÔNICAS — modo CENA VIVA. Um beat por versículo, fiel ao texto ARC.
//
// O livro que conta a mesma história de Samuel e Reis outra vez, mas de outro
// lugar: começa em Adão e desce nove capítulos de genealogia antes de chegar a
// Gilboa. Esses 407 versículos de nomes eram o material mais perigoso do
// projeto — feitos como homens enfileirados num campo, seriam a pior cena morta
// de tudo. A regra foi outra: **a genealogia do Cronista é um mapa de OFÍCIOS,
// LUGARES e FEITOS**, e é isso que o palco mostra. Ninrode caçando, a terra
// fendida nos dias de Pelegue, os oito reis de Edom em oito cidades, o vale dos
// artífices com as forjas acesas, o tear do linho fino de Asbeia, o forno dos
// oleiros que habitavam com o rei na sua obra, o pasto fértil e bom de Gedor,
// Jabez sozinho e grande de joelhos, Seerá edificando Bete-Horom a baixa e a
// alta, as quatro portas da casa de Deus com o seu porteiro, a vigília noturna,
// as assadeiras de Matitias, e as vinte e oito paisagens das cidades levíticas,
// uma por versículo.
//
// Depois a história: Gilboa e a casa de Dagom, a água do poço de Belém
// derramada ao SENHOR, Benaia na cova no tempo da neve, os que atiravam com a
// mão direita e com a esquerda, a arca no carro novo e Uzá morto na eira, Mical
// à janela, o cântico diante da arca, a palavra que vem a Natã de noite, o anjo
// de pé entre a terra e o céu com a espada estendida sobre Jerusalém, a eira de
// Ornã comprada pelo seu valor integral, as turmas do reino, e a oração do fim:
// "como a sombra são os nossos dias sobre a terra, e não há outra esperança".
//
// Os capítulos vivem em src/lib/stage/1chronicles/chXX_YY.ts.
//
// Validação obrigatória antes de qualquer merge:
//   node scripts/validate-stage.mjs && node scripts/checkup-stage.mjs
//   node scripts/qa-stage.mjs 1chronicles
// ============================================================================

import type { StageScript } from "@/lib/rpgStage";
import { CHAPTERS as CH01_02 } from "@/lib/stage/1chronicles/ch01_02";
import { CHAPTERS as CH03_05 } from "@/lib/stage/1chronicles/ch03_05";
import { CHAPTERS as CH06 } from "@/lib/stage/1chronicles/ch06";
import { CHAPTERS as CH07_09 } from "@/lib/stage/1chronicles/ch07_09";
import { CHAPTERS as CH10_12 } from "@/lib/stage/1chronicles/ch10_12";
import { CHAPTERS as CH13_16 } from "@/lib/stage/1chronicles/ch13_16";
import { CHAPTERS as CH17_20 } from "@/lib/stage/1chronicles/ch17_20";
import { CHAPTERS as CH21_23 } from "@/lib/stage/1chronicles/ch21_23";
import { CHAPTERS as CH24_27 } from "@/lib/stage/1chronicles/ch24_27";
import { CHAPTERS as CH28_29 } from "@/lib/stage/1chronicles/ch28_29";

export const FIRST_CHRONICLES_STAGE: Record<number, StageScript> = {
  ...CH01_02,
  ...CH03_05,
  ...CH06,
  ...CH07_09,
  ...CH10_12,
  ...CH13_16,
  ...CH17_20,
  ...CH21_23,
  ...CH24_27,
  ...CH28_29,
};
