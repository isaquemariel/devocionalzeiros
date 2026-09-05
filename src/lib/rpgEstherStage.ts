// ============================================================================
// ESTER — modo CENA VIVA. Um beat por versículo, fiel ao texto ARC.
//
// O único livro da Bíblia em que Deus não é nomeado uma vez sequer. Não há
// profeta, não há altar, não há templo, não há oração dita em voz alta — e o
// palco respeita isso: **não há uma única voz do céu em Ester**, e a `glory`
// aqui nunca é teofania, é luz de palácio (ouro, mármore, lâmpadas). Ela sobe
// nos banquetes e desce no decreto, no saco e na cinza.
//
// A providência deste livro é escondida, e o que vira a história são
// coincidências que ninguém atribui a ninguém: o feito de Mardoqueu escrito no
// livro das crônicas e esquecido (2:23), o rei que não consegue dormir e manda
// trazer justamente esse livro (6:1), e a forca de cinquenta côvados já pronta
// no quintal de quem seria enforcado nela. O quadro mostra o objeto e o acaso;
// não põe luz do céu por cima.
//
// Três objetos que o motor não tem e que não ganharam etiqueta mentirosa: o
// ANEL do rei e o CETRO DE OURO, contados pelo gesto (o rei em `point`, quem se
// aproxima em `bow`), e a FORCA, contada por uma coluna alta, pela pose de quem
// a manda levantar e pelo corpo ao pé dela. Uma tag num prop errado é pior do
// que nenhuma tag.
//
// Os capítulos vivem em src/lib/stage/esther/chXX_YY.ts.
//
// Validação obrigatória antes de qualquer merge:
//   node scripts/validate-stage.mjs && node scripts/checkup-stage.mjs
//   node scripts/qa-stage.mjs esther
// ============================================================================

import type { StageScript } from "@/lib/rpgStage";
import { CHAPTERS as CH01_05 } from "@/lib/stage/esther/ch01_05";
import { CHAPTERS as CH06_10 } from "@/lib/stage/esther/ch06_10";

export const ESTHER_STAGE: Record<number, StageScript> = {
  ...CH01_05,
  ...CH06_10,
};
