// ============================================================================
// JÓ — modo CENA VIVA. Um beat por versículo, fiel ao texto ARC.
//
// Dos 1070 versículos deste livro, cerca de 900 são DISCURSO: quatro homens
// sentados na cinza, falando. Mostrar isso novecentas vezes seria a pior cena
// morta que este projeto já produziu. A regra que resolveu Jó é outra:
//
//   **O PALCO MOSTRA O QUE A FALA VÊ, NÃO OS HOMENS SENTADOS.**
//
// A poesia de Jó é a mais visual da Bíblia, e quase todo versículo traz uma
// imagem concreta — é ela que vira o quadro. O jumento montês que zomba do
// alarido da cidade, o mineiro pendurado no poço que cortou longe dos homens,
// a árvore que ao cheiro das águas torna a brotar, as águas que gastam as
// pedras, a lançadeira do tecelão, o ribeiro que seca e as caravanas de Temá
// envergonhadas, a casa da traça, o avestruz que se esquece do pé que lhe pode
// esmagar os ovos, o cavalo que entre as trombetas diz "eia!", o céu firme
// como espelho fundido. O falante fica na BORDA do quadro, para o balão ter
// dono; a imagem ocupa o centro. É a mesma solução das genealogias de
// 1 Crônicas: a lista é um mapa, e o discurso é uma paisagem.
//
// Duas decisões de direção que são interpretativas e ficam registradas aqui:
//
// • **Satanás é `anjo` de veste escura** (id `satanas-o-adversario`) — ele vem
//   ENTRE os filhos de Deus, é da corte celestial, e não é o dragão do
//   Apocalipse. Foi para esta cena que a `palette` passou a apagar a auréola.
//   As asas ficam, e ali cabem; para o terror personificado de Jó 18, que não
//   é do céu, o papel certo é `homem` com paleta escura.
// • **O redemoinho de 38:1 e 40:6 é `by: "deus"`** — voz do céu sem figura,
//   com a tempestade dominando o ambiente. O redemoinho é o MODO da voz, não
//   um mensageiro: não há mediador em cena e não há nada a desenhar. É a mesma
//   leitura que resolveu a sarça ardente de Êxodo 3.
//
// `by` é sempre pelo `id`, nunca pelo papel: Jó e os três amigos são todos
// `patriarca`, e o motor daria a fala ao primeiro do elenco.
//
// Os capítulos vivem em src/lib/stage/job/chXX_YY.ts.
//
// Validação obrigatória antes de qualquer merge:
//   node scripts/validate-stage.mjs && node scripts/checkup-stage.mjs
//   node scripts/qa-stage.mjs job
// ============================================================================

import type { StageScript } from "@/lib/rpgStage";
import { CHAPTERS as CH01_03 } from "@/lib/stage/job/ch01_03";
import { CHAPTERS as CH04_10 } from "@/lib/stage/job/ch04_10";
import { CHAPTERS as CH11_17 } from "@/lib/stage/job/ch11_17";
import { CHAPTERS as CH18_24 } from "@/lib/stage/job/ch18_24";
import { CHAPTERS as CH25_31 } from "@/lib/stage/job/ch25_31";
import { CHAPTERS as CH32_37 } from "@/lib/stage/job/ch32_37";
import { CHAPTERS as CH38_42 } from "@/lib/stage/job/ch38_42";

export const JOB_STAGE: Record<number, StageScript> = {
  ...CH01_03,
  ...CH04_10,
  ...CH11_17,
  ...CH18_24,
  ...CH25_31,
  ...CH32_37,
  ...CH38_42,
};
