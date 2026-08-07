// ============================================================================
// LEVÍTICO 11–12 — CENA VIVA. O limpo e o imundo; a purificação do parto.
//
// Lev 11 — ANIMAIS LIMPOS E IMUNDOS: o que rumina e tem unha fendida; os peixes
// com barbatanas e escamas; as aves e os répteis proibidos. Não é higiene, é
// SANTIDADE: "santificai-vos, e sereis santos, porque eu sou santo" (v.44-45).
// O povo aprende a distinguir o santo do profano até à mesa.
//
// Lev 12 — A PURIFICAÇÃO DA MÃE: depois do parto, os dias da purificação e a
// circuncisão do menino ao oitavo dia; e a oferta — um cordeiro, ou, para a
// pobre, duas rolas ou pombinhos (a oferta que Maria daria, Lc 2:24).
//
// A VOZ DE DEUS (regra do projeto): tudo é instrução do alto (`by: "deus"`),
// sem figura. O povo é `multidao`; os animais, `rebanho` e o prop `birds`; a
// mãe é `mulherComum`; Arão/`arao` recebe a oferta ao pé da tenda.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// O ARRAIAL de Israel: as tendas, o poço, o pasto do gado — a vida diária do
// povo, onde a lei do limpo e do imundo se vive à mesa e no campo.
const ARRAIAL: StagePropSpec[] = [
  { ...P("tent", -40, 1.35, undefined, 0.1), tag: "tabernaculo" },
  P("tent", -260, 1.0, undefined, 0.2),
  P("tent", 250, 1.05, undefined, 0.18),
  P("well", 300, 1.0, undefined, 0.5),
  P("palm", -300, 1.05, undefined, 0.14),
  P("amphora", 150, 0.8, undefined, 0.6),
  P("bush", 120, 0.8, undefined, 0.36),
  P("grass", -60, 0.82, undefined, 0.82),
  P("grass", 60, 0.78, undefined, 0.74),
];
const ARRAIAL_AVES: StagePropSpec[] = [...ARRAIAL, { kind: "birds", dx: 60, scale: 1, dy: 0.6, sky: true }, { kind: "birds", dx: -140, scale: 0.8, dy: 0.72, sky: true }];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Lev 11
  11: {
    start: { terrain: "field", night: 0.1, glory: 0.6, storm: 0, fire: 0, verdure: 0.4 },
    beats: [
      b(1, { by: "deus", props: ARRAIAL, env: { terrain: "field", glory: 0.62, night: 0.1, verdure: 0.4 }, cast: [ // o Senhor fala a Moisés e a Arão
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
        C("arao", -100, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(2, { by: "deus", q: "Estes são os animais, que comereis", cast: [          // "Estes são os animais que comereis"
        C("multidao", 120, "stand", { dy: 0.46 }),
        C("rebanho", 200, "stand", { dy: 0.38, id: "gado" }),
      ] }),
      b(3, { by: "deus", cast: [                                                  // os que ruminam e têm unha fendida, esses comereis
        C("rebanho", 160, "stand", { dy: 0.4, id: "gado" }),
        C("rebanho", 220, "stand", { dy: 0.36, scale: 0.85, id: "gado2" }),
      ] }),
      b(4, { by: "deus" }),                                                       // o camelo, que rumina mas não tem unha fendida: imundo
      b(5, { by: "deus" }),                                                       // o coelho: imundo
      b(6, { by: "deus" }),                                                       // a lebre: imunda
      b(7, { by: "deus" }),                                                       // o porco: imundo
      b(8, { by: "deus" }),                                                       // da carne não comereis, nem tocareis nos cadáveres
      b(9, { by: "deus", props: [...ARRAIAL, P("river", 60, 1.2, undefined, 0.32)], cast: [ // nas águas: os que têm barbatanas e escamas, comereis
        C("multidao", 140, "stand", { dy: 0.46 }),
      ] }),
      b(10, { by: "deus" }),                                                      // sem barbatanas nem escamas: abominação
      b(11, { by: "deus" }),                                                      // por abominação; não comereis, abominareis o cadáver
      b(12, { by: "deus" }),                                                      // todo o que não tem barbatanas ou escamas: abominação
      b(13, { by: "deus", props: ARRAIAL_AVES, cast: [                            // das aves, estas abominareis: a águia, o abutre…
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.46 }),
      ] }),
      b(14, { by: "deus" }),                                                      // o milhano e o abutre segundo a sua espécie
      b(15, { by: "deus" }),                                                      // todo o corvo segundo a sua espécie
      b(16, { by: "deus" }),                                                      // o avestruz, o mocho, a gaivota, o gavião
      b(17, { by: "deus" }),                                                      // o bufo, o corvo marinho, a coruja
      b(18, { by: "deus" }),                                                      // a gralha, o cisne, o pelicano
      b(19, { by: "deus" }),                                                      // a cegonha, a garça, a poupa, o morcego
      b(20, { by: "deus", props: ARRAIAL }),                                      // todo inseto que voa e anda a quatro pés: abominação
      b(21, { by: "deus" }),                                                      // salvo os que têm pernas para saltar sobre a terra
      b(22, { by: "deus" }),                                                      // a locusta, o gafanhoto, o grilo, cada um por espécie
      b(23, { by: "deus" }),                                                      // os demais insetos voadores de quatro pés: abominação
      b(24, { by: "deus" }),                                                      // por estes sereis imundos até à tarde
      b(25, { by: "deus" }),                                                      // quem levar os cadáveres lavará as vestes
      b(26, { by: "deus" }),                                                      // unha não bem fendida e não ruminante: imundo
      b(27, { by: "deus" }),                                                      // os que andam sobre patas a quatro pés: imundos
      b(28, { by: "deus" }),                                                      // quem levar os cadáveres será imundo até à tarde
      b(29, { by: "deus" }),                                                      // répteis imundos: a doninha, o rato, a tartaruga
      b(30, { by: "deus" }),                                                      // o ouriço, o lagarto, a lagartixa, a lesma, a toupeira
      b(31, { by: "deus" }),                                                      // quem os tocar mortos será imundo até à tarde
      b(32, { by: "deus" }),                                                      // o objeto sobre o que caírem: lavado na água, imundo até à tarde
      b(33, { by: "deus" }),                                                      // o vaso de barro em que caírem será quebrado
      b(34, { by: "deus" }),                                                      // o alimento e a bebida molhados por tal água: imundos
      b(35, { by: "deus" }),                                                      // o forno e o vaso serão quebrados; imundos são
      b(36, { by: "deus" }),                                                      // a fonte ou cisterna fica limpa; mas o que tocar o cadáver, imundo
      b(37, { by: "deus" }),                                                      // caindo sobre semente seca: fica limpa
      b(38, { by: "deus" }),                                                      // mas se molhada e depois contaminada: imunda
      b(39, { by: "deus" }),                                                      // morto um animal de mantimento, quem o tocar é imundo
      b(40, { by: "deus" }),                                                      // quem dele comer ou o levar lavará as vestes
      b(41, { by: "deus" }),                                                      // todo réptil que se arrasta: abominação, não se comerá
      b(42, { by: "deus" }),                                                      // o que anda sobre o ventre ou muitos pés: não comereis
      b(43, { by: "deus" }),                                                      // não vos façais abomináveis nem vos contamineis
      b(44, { by: "deus", q: "sereis santos, porque eu sou santo", env: { glory: 0.85 }, cast: [ // "santificai-vos, e sereis santos, porque eu sou santo"
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 130, "bow", { dy: 0.46 }),
      ] }),
      b(45, { by: "deus", q: "porque eu sou santo", env: { glory: 0.9 }, cast: [   // "eu sou o Senhor que vos fez subir do Egito… porque eu sou santo"
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 130, "bow", { dy: 0.46 }),
      ] }),
      b(46, { by: "deus", q: "Esta é a lei dos animais" }),                        // esta é a lei dos animais, das aves e das criaturas
      b(47, { by: "deus", q: "entre o imundo e o limpo", env: { glory: 0.78 } }),  // para fazer diferença entre o imundo e o limpo
    ],
  },

  // ------------------------------------------------------------------ Lev 12
  12: {
    start: { terrain: "field", night: 0.1, glory: 0.6, storm: 0, fire: 0, verdure: 0.35 },
    beats: [
      b(1, { by: "deus", props: ARRAIAL, env: { terrain: "field", glory: 0.62, night: 0.1, verdure: 0.35 }, cast: [ // falou mais o Senhor a Moisés
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(2, { by: "deus", q: "será imunda sete dias", cast: [                       // se conceber e der à luz um menino: imunda sete dias
        C("mulherComum", 40, "kneel", { dy: 0.54, id: "mae" }),
      ] }),
      b(3, { by: "deus", q: "se circuncidará ao menino" }),                        // ao oitavo dia, circuncida-se o menino
      b(4, { by: "deus", cast: [                                                   // trinta e três dias no sangue da purificação
        C("mulherComum", 40, "stand", { dy: 0.54, id: "mae" }),
      ] }),
      b(5, { by: "deus" }),                                                        // se for menina, o dobro dos dias de purificação
      b(6, { by: "deus", props: [...ARRAIAL, { kind: "birds", dx: 100, scale: 0.9, dy: 0.6, sky: true }], cast: [ // cumpridos os dias, traz um cordeiro e um pombinho
        C("mulherComum", -20, "stand", { dy: 0.54, id: "mae" }),
        C("cordeiro", 90, "stand", { dy: 0.5, scale: 0.66, id: "cordeiro-of" }),
        C("arao", 60, "stand", { dy: 0.5, facing: -1 }),
      ] }),
      b(7, { by: "deus", q: "será limpa do fluxo do seu sangue", env: { glory: 0.7 }, cast: [ // o sacerdote faz propiciação: e será limpa
        C("arao", 46, "raise", { dy: 0.5, facing: -1 }),
        C("mulherComum", -30, "bow", { dy: 0.54, id: "mae" }),
      ] }),
      b(8, { by: "deus", q: "será limpa", props: [...ARRAIAL, { kind: "birds", dx: 90, scale: 0.9, dy: 0.62, sky: true }], cast: [ // para a pobre: duas rolas ou pombinhos; e será limpa
        C("mulherComum", -20, "bow", { dy: 0.54, id: "mae" }),
        C("arao", 46, "raise", { dy: 0.5, facing: -1 }),
      ] }),
    ],
  },
};
