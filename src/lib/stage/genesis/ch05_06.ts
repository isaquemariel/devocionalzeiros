// ============================================================================
// GÊNESIS — CENA VIVA, caps. 5 e 6.
//
// Gn 5 — O LIVRO DAS GERAÇÕES (memorial): acampamento patriarcal (tendas e
// altar) onde os patriarcas se sucedem em marcas diferentes enquanto o env
// oscila dia→noite→dia — a dramaturgia é a PASSAGEM DOS SÉCULOS. Enoque
// "andou com Deus" (glow crescente) e no v.24 SOME em glória: Deus o tomou.
// Deus NUNCA é desenhado: sua presença é luz (glory), sua voz é narração.
//
// Gn 6 — A CORRUPÇÃO E A GRAÇA: a noite cresce sobre o campo com a maldade
// dos homens; Noé acha graça (glow/glory sobre ele); a cena vira ESTALEIRO
// com a arca (arkship) tomando o palco nas instruções, e o "assim fez Noé"
// fecha em dignidade.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// O MEMORIAL DAS GERAÇÕES (Gn 5): duas tendas, o altar da família, árvores e
// fogueira — o mesmo acampamento atravessando séculos. O corredor de extras
// dx -100..-190 fica LIVRE (a estrela do v.24 entra ali).
const MEMORIAL: StagePropSpec[] = [
  P("tent", 185, 1.25, undefined, 0.1),
  P("tent", 265, 1.05, undefined, 0.32),
  P("altar", -240, 1, undefined, 0.18),
  P("tree", -305, 1.15, undefined, 0.08),
  P("tree", 105, 0.95, undefined, 0.06),
  P("bush", -206, 0.9, undefined, 0.52),
  P("bush", 315, 0.9, undefined, 0.55),
  P("rock", -35, 0.6, undefined, 0.78),
  P("campfire", 142, 0.85, 1, 0.6),
  P("grass", -70, 1, undefined, 0.85),
  P("grass", 60, 1, undefined, 0.8),
  P("grass", 230, 1, undefined, 0.75),
  P("grass", -272, 1, undefined, 0.7),
];

// O CAMPO QUE SE CORROMPE (Gn 6:1-13): mesmo mundo, outra lavoura — tendas,
// altar esquecido, fogueira. Corredor -100..-190 livre.
const CAMPO: StagePropSpec[] = [
  P("tent", 200, 1.2, undefined, 0.12),
  P("tent", 278, 1.0, undefined, 0.35),
  P("altar", -245, 1, undefined, 0.2),
  P("tree", -302, 1.1, undefined, 0.08),
  P("tree", 120, 0.9, undefined, 0.06),
  P("bush", 320, 0.9, undefined, 0.5),
  P("bush", -60, 0.85, undefined, 0.2),
  P("rock", 42, 0.55, undefined, 0.8),
  P("campfire", -210, 0.8, 1, 0.62),
  P("grass", -80, 1, undefined, 0.85),
  P("grass", 90, 1, undefined, 0.78),
  P("grass", 252, 1, undefined, 0.7),
  P("grass", -280, 0.95, undefined, 0.72),
];

// O ESTALEIRO (Gn 6:14-22): a ARCA enorme domina o palco; caixotes e ânfora
// de betume, fogueira do betume fervendo. Corredor -100..-190 livre (os
// mantimentos do v.21 entram ali).
const ESTALEIRO: StagePropSpec[] = [
  P("arkship", 100, 1.7, undefined, 0.06),
  P("crate", -230, 1, undefined, 0.45),
  P("crate", -212, 0.8, undefined, 0.62),
  P("amphora", -262, 0.9, undefined, 0.52),
  P("campfire", -300, 0.85, 1, 0.4),
  P("tent", 280, 1.0, undefined, 0.3),
  P("tree", -320, 1.05, undefined, 0.08),
  P("rock", -30, 0.55, undefined, 0.65),
  P("grass", -62, 1, undefined, 0.85),
  P("grass", 40, 1, undefined, 0.78),
  P("grass", 222, 0.95, undefined, 0.8),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Gn 5
  // O livro das gerações de Adão: cada patriarca ocupa uma marca nova do
  // acampamento com a família (homem/mulherComum) ao redor; o dia amanhece
  // a cada geração e anoitece a cada "e morreu" — os séculos passando.
  5: {
    start: { terrain: "field", night: 0, glory: 0.25 },
    beats: [
      // ADÃO (v.1-5)
      b(1, { cast: [C("adao", -24, "stand", { dy: 0.5 }), C("eva", 28, "stand", { dy: 0.52 })], props: MEMORIAL, env: { glory: 0.35 } }), // o livro das gerações de Adão
      b(2, { cast: [C("adao", -16, "raise", { dy: 0.5 }), C("eva", 20, "raise", { dy: 0.52 })], env: { glory: 0.45 } }),                  // homem e mulher; e os abençoou
      b(3, { cast: [C("adao", -50, "stand", { dy: 0.5 }), C("eva", 4, "stand", { dy: 0.52 }), C("homem", 52, "stand", { dy: 0.55 })], env: { glory: 0.25, night: 0.05 } }), // Adão gera Sete, à sua imagem
      b(4, { cast: [C("adao", -64, "stand", { dy: 0.5 }), C("eva", -16, "stand", { dy: 0.52 }), C("homem", 44, "stand", { dy: 0.55 }), C("mulherComum", 92, "stand", { dy: 0.55 })], env: { night: 0.3 } }), // oitocentos anos; filhos e filhas
      b(5, { cast: [C("adao", -24, "lie", { dy: 0.5 }), C("homem", 32, "bow", { dy: 0.55 }), C("mulherComum", 74, "kneel", { dy: 0.55 })], env: { night: 0.55 } }), // novecentos e trinta anos, e morreu
      // SETE (v.6-8) — amanhece de novo
      b(6, { cast: [C("patriarca", -60, "stand", { dy: 0.5 }), C("homem", 8, "stand", { dy: 0.55 }), C("mulherComum", 56, "stand", { dy: 0.52 })], env: { night: 0.05, glory: 0.2 } }), // Sete gera Enos
      b(7, { cast: [C("patriarca", -44, "stand", { dy: 0.5 }), C("homem", 22, "walk", { dy: 0.55 }), C("mulherComum", 68, "stand", { dy: 0.52 })], env: { night: 0.35 } }), // a família de Sete cresce
      b(8, { cast: [C("patriarca", -18, "lie", { dy: 0.5 }), C("homem", 38, "bow", { dy: 0.55 }), C("mulherComum", 80, "kneel", { dy: 0.55 })], env: { night: 0.6 } }), // novecentos e doze anos, e morreu
      // ENOS (v.9-11) — outra marca, outro dia
      b(9, { cast: [C("patriarca", 40, "stand", { dy: 0.5 }), C("homem", -30, "stand", { dy: 0.55 }), C("mulherComum", 90, "stand", { dy: 0.52 })], env: { night: 0.04 } }), // Enos gera Cainã
      b(10, { env: { night: 0.35 } }),                                                                                                     // filhos e filhas de Enos
      b(11, { cast: [C("patriarca", 8, "lie", { dy: 0.5 }), C("homem", -44, "bow", { dy: 0.55 }), C("mulherComum", 62, "kneel", { dy: 0.55 })], env: { night: 0.62 } }), // novecentos e cinco anos, e morreu
      // CAINÃ (v.12-14)
      b(12, { cast: [C("patriarca", -8, "stand", { dy: 0.5 }), C("homem", 48, "stand", { dy: 0.55 }), C("mulherComum", -58, "stand", { dy: 0.52 })], env: { night: 0.03 } }), // Cainã gera Maalaleel
      b(13, { env: { night: 0.4 } }),                                                                                                      // oitocentos e quarenta anos de dias
      b(14, { cast: [C("patriarca", -8, "lie", { dy: 0.5 }), C("homem", 42, "bow", { dy: 0.55 }), C("mulherComum", -52, "kneel", { dy: 0.55 })], env: { night: 0.65 } }), // novecentos e dez anos, e morreu
      // MAALALEEL (v.15-17)
      b(15, { cast: [C("patriarca", 56, "stand", { dy: 0.5 }), C("homem", -20, "stand", { dy: 0.55 }), C("mulherComum", 18, "stand", { dy: 0.52 })], env: { night: 0.05 } }), // Maalaleel gera Jerede
      b(16, { env: { night: 0.35 } }),                                                                                                     // a casa de Maalaleel cresce
      b(17, { cast: [C("patriarca", 30, "lie", { dy: 0.5 }), C("homem", -32, "bow", { dy: 0.55 }), C("mulherComum", 76, "kneel", { dy: 0.55 })], env: { night: 0.6 } }), // oitocentos e noventa e cinco, e morreu
      // JEREDE (v.18-20)
      b(18, { cast: [C("patriarca", -36, "stand", { dy: 0.5 }), C("homem", 24, "stand", { dy: 0.55 }), C("mulherComum", 72, "stand", { dy: 0.52 })], env: { night: 0.04 } }), // Jerede gera Enoque
      b(19, { env: { night: 0.3 } }),                                                                                                      // filhos e filhas de Jerede
      b(20, { cast: [C("patriarca", -12, "lie", { dy: 0.5 }), C("homem", 40, "bow", { dy: 0.55 }), C("mulherComum", 84, "kneel", { dy: 0.55 })], env: { night: 0.62 } }), // novecentos e sessenta e dois, e morreu
      // ENOQUE (v.21-24) — o que andou com Deus e não morreu
      b(21, { cast: [C("patriarca", 0, "stand", { glow: 0.4, dy: 0.5 }), C("homem", 52, "stand", { dy: 0.55 }), C("mulherComum", -48, "stand", { dy: 0.52 })], env: { night: 0.06, glory: 0.3 } }), // Enoque gera Matusalém
      b(22, { cast: [C("patriarca", 24, "walk", { glow: 0.55, dy: 0.48 }), C("homem", 72, "stand", { dy: 0.55 }), C("mulherComum", -40, "stand", { dy: 0.52 })], env: { glory: 0.45, night: 0.02 } }), // andou Enoque com Deus, trezentos anos
      b(23, { cast: [C("patriarca", 8, "raise", { glow: 0.7, dy: 0.46 }), C("homem", 60, "stand", { dy: 0.55 }), C("mulherComum", -44, "stand", { dy: 0.52 })], env: { glory: 0.6 } }), // trezentos e sessenta e cinco anos
      b(24, { cast: [C("homem", 44, "point", { dy: 0.55, facing: -1 }), C("mulherComum", -40, "kneel", { dy: 0.55 })], props: [...MEMORIAL, P("star", -140, 0.7, undefined, 0.12)], env: { glory: 0.9, night: 0 } }), // não apareceu mais: Deus o tomou!
      // MATUSALÉM (v.25-27) — o mais longevo dos homens
      b(25, { cast: [C("patriarca", -64, "stand", { dy: 0.5 }), C("homem", 0, "stand", { dy: 0.55 }), C("mulherComum", 48, "stand", { dy: 0.52 })], props: MEMORIAL, env: { glory: 0.22, night: 0.1 } }), // Matusalém gera Lameque
      b(26, { env: { night: 0.4 } }),                                                                                                      // setecentos e oitenta e dois anos mais
      b(27, { cast: [C("patriarca", -28, "lie", { dy: 0.5 }), C("homem", 30, "bow", { dy: 0.55 }), C("mulherComum", 74, "kneel", { dy: 0.55 })], env: { night: 0.68 } }), // novecentos e sessenta e nove, e morreu
      // LAMEQUE (v.28-31) — a profecia sobre Noé
      b(28, { cast: [C("patriarca", 16, "stand", { dy: 0.5 }), C("mulherComum", 64, "stand", { dy: 0.52 }), C("homem", -48, "stand", { dy: 0.58 })], env: { night: 0.06, glory: 0.2 } }), // Lameque gerou um filho
      b(29, { by: "patriarca", q: "dizendo: ", cast: [C("patriarca", 16, "raise", { dy: 0.5 }), C("mulherComum", 64, "stand", { dy: 0.52 }), C("homem", -48, "stand", { dy: 0.58 })], env: { glory: 0.35 } }), // "Este nos consolará…" — chama-o Noé
      b(30, { env: { night: 0.38, glory: 0.2 } }),                                                                                         // quinhentos e noventa e cinco anos mais
      b(31, { cast: [C("patriarca", -8, "lie", { dy: 0.5 }), C("homem", 44, "bow", { dy: 0.55 }), C("mulherComum", 86, "kneel", { dy: 0.55 })], env: { night: 0.6 } }), // setecentos e setenta e sete, e morreu
      // NOÉ (v.32) — amanhece sobre a nova geração
      b(32, { cast: [C("noe", -16, "stand", { glow: 0.35, dy: 0.48 }), C("homem", 40, "stand", { dy: 0.55 }), C("pastor", 84, "stand", { dy: 0.55 }), C("servo", 128, "stand", { dy: 0.55 })], env: { night: 0.04, glory: 0.4 } }), // Noé gera Sem, Cão e Jafé
    ],
  },

  // ------------------------------------------------------------------ Gn 6
  // A corrupção e a graça: a noite e a tempestade crescem com a maldade;
  // Noé acha graça (luz sobre ele); a cena vira estaleiro com a arca nas
  // instruções de Deus (voz de Deus = narração + glory, NUNCA figura).
  6: {
    start: { terrain: "field", night: 0.25, glory: 0.15 },
    beats: [
      // A TERRA SE CORROMPE (v.1-7)
      b(1, { cast: [C("homem", -64, "stand", { dy: 0.5 }), C("mulherComum", -12, "stand", { dy: 0.52 }), C("multidao", 150, "stand", { dy: 0.25 })], props: CAMPO, env: { night: 0.3 } }), // os homens se multiplicam na terra
      b(2, { cast: [C("homem", -24, "walk", { dy: 0.5, facing: 1 }), C("mulherComum", 16, "stand", { dy: 0.52 }), C("multidao", 150, "stand", { dy: 0.25 })], env: { night: 0.4 } }), // tomaram mulheres de todas que escolheram
      b(3, { by: "deus", q: "Então disse o Senhor: ", env: { night: 0.45, glory: 0.32 } }),   // Não contenderá o meu Espírito para sempre… cento e vinte anos
      b(4, { env: { night: 0.5, glory: 0.15 } }),                                              // gigantes na terra, os homens de fama
      b(5, { env: { night: 0.58, storm: 0.2, glory: 0.05 } }),                                 // toda a imaginação só má continuamente
      b(6, { env: { night: 0.62, storm: 0.35, glory: 0.1 } }),                                 // arrependeu-se o SENHOR; pesou-lhe no coração
      b(7, { by: "deus", q: "E disse o Senhor: ", env: { night: 0.7, storm: 0.45, glory: 0.24 } }), // Destruirei o homem que criei de sobre a face da terra
      // NOÉ ACHA GRAÇA (v.8-10)
      b(8, { cast: [C("noe", -8, "stand", { glow: 0.4, dy: 0.46 })], env: { night: 0.55, storm: 0.25, glory: 0.4 } }), // Noé, porém, achou graça
      b(9, { cast: [C("noe", 6, "walk", { glow: 0.5, dy: 0.46 })], env: { glory: 0.45, night: 0.5 } }),               // justo e perfeito; andava com Deus
      b(10, { cast: [C("noe", -40, "stand", { glow: 0.5, dy: 0.48 }), C("homem", 12, "stand", { dy: 0.55 }), C("pastor", 56, "stand", { dy: 0.55 }), C("servo", 100, "stand", { dy: 0.55 })] }), // três filhos: Sem, Cão e Jafé
      // CHEIA DE VIOLÊNCIA (v.11-13)
      b(11, { cast: [C("noe", -40, "stand", { glow: 0.45, dy: 0.48 }), C("homem", 12, "stand", { dy: 0.55 }), C("pastor", 56, "stand", { dy: 0.55 }), C("servo", 100, "stand", { dy: 0.55 }), C("multidao", 230, "stand", { dy: 0.25 })], env: { night: 0.7, glory: 0.15, storm: 0.3 } }), // a terra encheu-se de violência
      b(12, { env: { night: 0.72, storm: 0.4 } }),                                             // viu Deus: toda a carne corrompida
      b(13, { by: "deus", q: "Então disse Deus a Noé: ", cast: [C("noe", -8, "kneel", { glow: 0.5, dy: 0.48 }), C("homem", 44, "bow", { dy: 0.55 }), C("pastor", 84, "bow", { dy: 0.55 }), C("servo", -60, "bow", { dy: 0.55 })], env: { glory: 0.4, storm: 0.3, night: 0.62 } }), // O fim de toda a carne é vindo perante a minha face
      // AS INSTRUÇÕES DA ARCA (v.14-16) — o estaleiro
      b(14, { by: "deus", set: "estaleiro", props: ESTALEIRO, cast: [C("noe", -36, "point", { glow: 0.4, dy: 0.5, facing: 1 }), C("homem", 20, "stand", { dy: 0.55 }), C("pastor", 64, "stand", { dy: 0.55 }), C("servo", -80, "stand", { dy: 0.55 })], env: { night: 0.45, storm: 0.15, glory: 0.32 } }), // Faze para ti uma arca da madeira de gofer
      b(15, { cast: [C("noe", -24, "write", { glow: 0.4, dy: 0.52 }), C("homem", 28, "point", { dy: 0.55, facing: 1 }), C("pastor", 64, "stand", { dy: 0.55 }), C("servo", -80, "walk", { dy: 0.55, facing: 1 })] }), // trezentos côvados: Noé mede e risca
      b(16, { cast: [C("noe", -30, "point", { glow: 0.4, dy: 0.5, facing: 1 }), C("homem", 28, "stand", { dy: 0.55 }), C("pastor", 64, "point", { dy: 0.55, facing: 1 }), C("servo", -80, "stand", { dy: 0.55 })] }), // janela, porta ao lado, três andares
      // O DILÚVIO ANUNCIADO E A ALIANÇA (v.17-21)
      b(17, { by: "deus", env: { storm: 0.5, night: 0.6, glory: 0.28 } }),                     // Porque eis que eu trago um dilúvio de águas sobre a terra
      b(18, { by: "deus", env: { glory: 0.5, storm: 0.3, night: 0.5 } }),                      // Mas contigo estabelecerei a minha aliança; e entrarás na arca
      b(19, { cast: [C("noe", -30, "point", { glow: 0.45, dy: 0.5, facing: 1 }), C("homem", 28, "stand", { dy: 0.55 }), C("pastor", 64, "stand", { dy: 0.55 }), C("servo", -80, "stand", { dy: 0.55 }), C("rebanho", 190, "walk", { dy: 0.5, facing: -1 })] }), // dois de cada espécie, macho e fêmea
      b(20, { cast: [C("noe", -30, "stand", { glow: 0.45, dy: 0.5 }), C("homem", 28, "stand", { dy: 0.55 }), C("pastor", 64, "stand", { dy: 0.55 }), C("servo", -80, "stand", { dy: 0.55 }), C("rebanho", 140, "walk", { dy: 0.52, facing: -1 })], env: { glory: 0.45 } }), // aves e animais virão a ti
      b(21, { props: [...ESTALEIRO, P("crate", -130, 1, undefined, 0.25), P("amphora", -164, 0.9, undefined, 0.5)] }), // ajunta toda a comida: mantimento
      // A OBEDIÊNCIA (v.22)
      b(22, { cast: [C("noe", -12, "raise", { glow: 0.5, dy: 0.48 }), C("homem", 36, "raise", { dy: 0.55 }), C("pastor", 78, "stand", { dy: 0.55 }), C("servo", -64, "stand", { dy: 0.55 })], env: { glory: 0.5, storm: 0.15, night: 0.4 } }), // assim fez Noé, conforme tudo
    ],
  },
};
