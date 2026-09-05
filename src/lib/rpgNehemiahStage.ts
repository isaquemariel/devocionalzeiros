// ============================================================================
// NEEMIAS — modo CENA VIVA. Um beat por versículo, fiel ao texto ARC.
//
// O último livro histórico do Antigo Testamento, e o que mais se passa numa
// obra: o copeiro que fica triste diante do rei pela primeira vez, a ronda
// noturna sozinho até onde o animal já não passava, e o muro acabado em
// cinquenta e dois dias, com cada um trabalhando com a obra numa das mãos e a
// arma na outra, desde a subida da alva até ao sair das estrelas.
//
// Dois capítulos eram o risco do livro, e foram contados por ângulos que os
// diferenciam do que já existe no projeto:
//
// • **Neemias 3** não é lista de nomes: é um MAPA DE OFÍCIOS dando a volta à
//   cidade, porta a porta — os ourives, os perfumistas, Salum e SUAS FILHAS,
//   os netineus de Ofel, os mercadores. E o muro CRESCE ao longo dos 32
//   quadros: no versículo 1 há escombros, no fim há torres e portas com os
//   seus ferrolhos.
// • **Neemias 7** repete quase palavra por palavra o rol de Esdras 2. A
//   diferença é decisiva e é ela que dá a cena: em Esdras a lista é de quem
//   estava a CHEGAR; aqui é um rolo ACHADO numa cidade vazia, lido para saber
//   quem a vai povoar. Por isso 7:4 — "a cidade era larga de espaço, e grande,
//   porém pouco povo havia dentro dela; e ainda as casas não estavam
//   edificadas" — é `field`, com uma torre isolada: com `city` o motor
//   desenharia o casario cheio no versículo que diz que ele não existe.
//
// **Deus não fala uma vez em todo o livro: zero `by: "deus"` nos 406 beats.**
// As orações são balões de Neemias em cena, e a providência aparece na frase
// que ele repete — "segundo a boa mão do meu Deus sobre mim" —, que é narração
// com a glória subindo no ambiente e nunca sobre ele. Em Neemias 8 o mediador é
// o LIVRO: Esdras em pé sobre o púlpito de madeira, acima de todo o povo, e o
// balão sai dele. Em Neemias 9 a história inteira de Israel é recitada pelos
// levitas do lugar alto, e o palco mostra o que eles recitam — o mar fendido,
// as duas colunas, o pão do céu, a penha da água —, com o levita na borda.
// A coluna de nuvem e de fogo de 9:12,19 é o único lugar do livro em que o prop
// `pillar` é legítimo.
//
// Os capítulos vivem em src/lib/stage/nehemiah/chXX_YY.ts.
//
// Validação obrigatória antes de qualquer merge:
//   node scripts/validate-stage.mjs && node scripts/checkup-stage.mjs
//   node scripts/qa-stage.mjs nehemiah
// ============================================================================

import type { StageScript } from "@/lib/rpgStage";
import { CHAPTERS as CH01_04 } from "@/lib/stage/nehemiah/ch01_04";
import { CHAPTERS as CH05_08 } from "@/lib/stage/nehemiah/ch05_08";
import { CHAPTERS as CH09_13 } from "@/lib/stage/nehemiah/ch09_13";

export const NEHEMIAH_STAGE: Record<number, StageScript> = {
  ...CH01_04,
  ...CH05_08,
  ...CH09_13,
};
