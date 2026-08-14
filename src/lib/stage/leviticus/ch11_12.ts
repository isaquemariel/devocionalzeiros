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
// O CAMPO DOS QUE SALTAM (Lev 11:21-23): entre os insetos que voam, só os que
// têm pernas para saltar sobre a terra — a locusta, o grilo, o gafanhoto.
const CAMPO_SALTA: StagePropSpec[] = [
  P("locusts", 50, 1.15, undefined, 0.52),
  P("locusts", -170, 0.85, undefined, 0.68),
  P("tent", -290, 1.0, undefined, 0.16),
  P("tree", 250, 1.05, undefined, 0.18),
  P("bush", 160, 0.85, undefined, 0.38),
  P("grass", -60, 0.82, undefined, 0.84),
];
// O CURRAL (Lev 11:26-28,39): o gado de casa passado pelo crivo da unha fendida
// e do ruminar — e o animal de mantimento que morre e contamina quem o toca.
const CURRAL: StagePropSpec[] = [
  P("stall", 40, 1.2, undefined, 0.34),
  P("tent", -270, 1.0, undefined, 0.18),
  P("well", 280, 1.0, undefined, 0.5),
  P("bush", 150, 0.8, undefined, 0.38),
  P("palm", -190, 0.95, undefined, 0.14),
  P("grass", -60, 0.82, undefined, 0.82),
];
// OS RÉPTEIS QUE SE ARRASTAM (Lev 11:29-31,41-42): as pedras e as moitas onde
// se escondem os que andam sobre o ventre e sobre muitos pés.
const REPTEIS: StagePropSpec[] = [
  P("serpent", 40, 1.0, undefined, 0.62),
  P("serpent", -150, 0.8, undefined, 0.76),
  P("rock", 240, 1.05, undefined, 0.46),
  P("rock", -280, 1.0, undefined, 0.5),
  P("tree", -60, 1.0, undefined, 0.2),
  P("bush", 130, 0.85, undefined, 0.36),
  P("grass", 90, 0.8, undefined, 0.86),
];
// OS VASOS (Lev 11:32-34,36): o vaso de barro que se quebra, o de madeira que
// se põe na água, e a fonte ou cisterna que fica limpa.
const VASOS: StagePropSpec[] = [
  P("amphora", -30, 1.0, undefined, 0.6),
  P("crate", -150, 0.9, undefined, 0.68),
  P("bowl", 90, 0.85, undefined, 0.64),
  P("well", 240, 1.05, undefined, 0.48),
  P("tent", -280, 1.0, undefined, 0.16),
  P("palm", 300, 1.0, undefined, 0.14),
  P("grass", -60, 0.8, undefined, 0.84),
];
// O FORNO E O VASO QUEBRADOS (Lev 11:35).
const VASOS_FORNO: StagePropSpec[] = [...VASOS, P("campfire", 155, 1.1, 1, 0.56)];
// A SEMENTE DA SEMEADURA (Lev 11:37-38): a semente seca que fica limpa, e a que,
// molhada de água, se contamina.
const SEMENTE: StagePropSpec[] = [
  P("sheaf", 40, 1.1, undefined, 0.52),
  P("crate", -120, 0.9, undefined, 0.66),
  P("tree", -260, 1.1, undefined, 0.18),
  P("bush", 220, 0.85, undefined, 0.36),
  P("grass", -40, 0.85, undefined, 0.86),
  P("grass", 140, 0.8, undefined, 0.76),
];

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
      // ---- v.21-23 — OS QUE SALTAM: os únicos comíveis entre os que voam.
      b(21, { by: "deus", q: "para saltar com elas sobre a terra", set: "campo-salta", props: CAMPO_SALTA, env: { terrain: "field", night: 0.1, glory: 0.62, verdure: 0.45 }, cast: [ // salvo os que têm pernas para saltar sobre a terra
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 140, "stand", { dy: 0.46 }),
      ] }),
      b(22, { by: "deus", q: "a locusta segundo a sua espécie", props: [...CAMPO_SALTA, P("locusts", 180, 0.9, undefined, 0.44)], cast: [ // a locusta, o gafanhoto devorador, o grilo, cada um por espécie
        C("homem", 60, "point", { dy: 0.56, facing: -1, id: "israelita-mesa" }),
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(23, { by: "deus", q: "serão para vós uma abominação", env: { glory: 0.42, night: 0.16 }, cast: [ // os demais insetos voadores de quatro pés: abominação
        C("homem", 30, "bow", { dy: 0.58, id: "israelita-mesa" }),
      ] }),
      // ---- v.24-25 — O CONTATO COM OS CADÁVERES: imundo ATÉ À TARDE.
      b(24, { by: "deus", q: "imundo será até à tarde", env: { glory: 0.32, night: 0.3 }, cast: [ // por estes sereis imundos: quem tocar nos seus cadáveres
        C("homem", 0, "kneel", { dy: 0.58, id: "israelita-mesa" }),
      ] }),
      b(25, { by: "deus", q: "lavará as suas vestes", props: [...CAMPO_SALTA, P("river", 200, 1.0, undefined, 0.36), P("crate", -120, 0.85, undefined, 0.66)], env: { glory: 0.42, night: 0.24 }, cast: [ // quem levar os cadáveres lavará as vestes
        C("homem", 60, "kneel", { dy: 0.6, facing: -1, id: "israelita-mesa" }),
      ] }),
      // ---- v.26-28 — O GADO: a unha que não se divide, as patas de quatro pés.
      b(26, { by: "deus", q: "vos será por imundo", set: "curral", props: CURRAL, env: { terrain: "field", night: 0.14, glory: 0.46, verdure: 0.4 }, cast: [ // unha não bem fendida e não ruminante: imundo
        C("rebanho", 120, "stand", { dy: 0.44, id: "gado-imundo" }),
        C("homem", -70, "point", { dy: 0.56, facing: 1, id: "israelita-mesa" }),
      ] }),
      b(27, { by: "deus", q: "todo o animal que anda a quatro pés", env: { glory: 0.4 }, cast: [ // os que andam sobre as suas patas, a quatro pés: imundos
        C("rebanho", 170, "stand", { dy: 0.38, id: "gado-imundo" }),
        C("rebanho", 70, "stand", { dy: 0.52, scale: 0.82, id: "gado-imundo2" }),
      ] }),
      b(28, { by: "deus", q: "e será imundo até à tarde", env: { glory: 0.3, night: 0.3 }, cast: [ // quem levar os cadáveres lavará as vestes: imundo até à tarde
        C("homem", 20, "kneel", { dy: 0.58, id: "israelita-mesa" }),
      ] }),
      // ---- v.29-31 — OS RÉPTEIS que se arrastam sobre a terra.
      b(29, { by: "deus", q: "a doninha, e o rato, e a tartaruga", set: "repteis", props: REPTEIS, env: { terrain: "field", night: 0.2, glory: 0.38, verdure: 0.35 }, cast: [ // répteis imundos: a doninha, o rato, a tartaruga
        C("homem", -90, "point", { dy: 0.56, facing: 1, id: "israelita-mesa" }),
      ] }),
      b(30, { by: "deus", q: "e o lagarto, e a lagartixa", props: [...REPTEIS, P("serpent", 200, 0.75, undefined, 0.7), P("bush", -220, 0.8, undefined, 0.42)], cast: [ // o ouriço, o lagarto, a lagartixa, a lesma, a toupeira
        C("homem", -110, "stand", { dy: 0.56, facing: 1, id: "israelita-mesa" }),
      ] }),
      b(31, { by: "deus", q: "estando eles mortos, será imundo até à tarde", env: { glory: 0.26, night: 0.34 }, cast: [ // quem os tocar mortos será imundo até à tarde
        C("homem", 30, "kneel", { dy: 0.58, id: "israelita-mesa" }),
      ] }),
      // ---- v.32-36 — OS VASOS: o de madeira posto na água, o de barro
      // quebrado, o forno desfeito — e a fonte que, essa, permanece limpa.
      b(32, { by: "deus", q: "será posto na água", set: "vasos", props: VASOS, env: { terrain: "field", night: 0.18, glory: 0.44, verdure: 0.3 }, cast: [ // o objeto sobre o que caírem: posto na água, imundo até à tarde
        C("homem", 30, "kneel", { dy: 0.58, facing: -1, id: "israelita-mesa" }),
      ] }),
      b(33, { by: "deus", q: "e o vaso quebrareis", env: { glory: 0.32, night: 0.24 }, cast: [ // o vaso de barro em que caírem será quebrado
        C("homem", -60, "kneel", { dy: 0.62, facing: 1, id: "israelita-mesa" }),
      ] }),
      b(34, { by: "deus", q: "será imunda", props: [...VASOS, P("bowl", -230, 0.8, undefined, 0.66)], env: { glory: 0.3 }, cast: [ // o alimento e a bebida desses vasos: imundos
        C("homem", -170, "stand", { dy: 0.58, facing: -1, id: "israelita-mesa" }),
      ] }),
      b(35, { by: "deus", q: "o forno e o vaso de barro serão quebrados", set: "forno", props: VASOS_FORNO, env: { glory: 0.28, night: 0.26, fire: 0.5 }, cast: [ // o forno e o vaso de barro serão quebrados; imundos são
        C("homem", 30, "bow", { dy: 0.6, facing: -1, id: "israelita-mesa" }),
      ] }),
      b(36, { by: "deus", q: "em que se recolhem águas, será limpa", set: "vasos", props: VASOS, env: { glory: 0.6, night: 0.12, fire: 0 }, cast: [ // a fonte ou cisterna fica LIMPA; mas quem tocar o cadáver, imundo
        C("homem", 180, "stand", { dy: 0.54, facing: -1, id: "israelita-mesa" }),
      ] }),
      // ---- v.37-38 — A SEMENTE: seca fica limpa; molhada, contamina-se.
      b(37, { by: "deus", q: "será limpa", set: "semente", props: SEMENTE, env: { terrain: "field", night: 0.1, glory: 0.64, verdure: 0.55 }, cast: [ // caindo sobre semente seca de semeadura: fica limpa
        C("homem", -40, "stand", { dy: 0.56, facing: 1, id: "israelita-mesa" }),
      ] }),
      b(38, { by: "deus", q: "vos será por imunda", props: [...SEMENTE, P("river", 210, 1.0, undefined, 0.34)], env: { glory: 0.34, night: 0.2 }, cast: [ // mas se for deitada água sobre a semente: imunda
        C("homem", 20, "kneel", { dy: 0.6, facing: -1, id: "israelita-mesa" }),
      ] }),
      // ---- v.39-40 — O ANIMAL DE MANTIMENTO que morre no curral.
      b(39, { by: "deus", q: "quem tocar no seu cadáver será imundo até à tarde", set: "curral", props: CURRAL, env: { terrain: "field", night: 0.26, glory: 0.3, verdure: 0.35 }, cast: [ // morto um animal de mantimento, quem o tocar é imundo
        C("rebanho", 140, "lie", { dy: 0.46, id: "gado-morto" }),
        C("homem", -50, "bow", { dy: 0.58, facing: 1, id: "israelita-mesa" }),
      ] }),
      b(40, { by: "deus", q: "lavará as suas vestes", env: { glory: 0.34, night: 0.24 }, cast: [ // quem dele comer ou o levar lavará as vestes
        C("homem", 40, "walk", { dy: 0.58, facing: -1, id: "israelita-mesa" }),
      ] }),
      // ---- v.41-43 — O QUE SE ARRASTA: abominação; não vos contamineis.
      b(41, { by: "deus", q: "será abominação; não se comerá", set: "repteis", props: REPTEIS, env: { terrain: "field", night: 0.22, glory: 0.3, verdure: 0.35 }, cast: [ // todo réptil que se arrasta: abominação, não se comerá
        C("homem", -80, "point", { dy: 0.56, facing: 1, id: "israelita-mesa" }),
      ] }),
      b(42, { by: "deus", q: "Tudo o que anda sobre o ventre", props: [...REPTEIS, P("serpent", 190, 0.85, undefined, 0.68), P("serpent", -230, 0.7, undefined, 0.58)], env: { glory: 0.26, night: 0.26 }, cast: [ // o que anda sobre o ventre ou sobre muitos pés: não comereis
        C("homem", -90, "bow", { dy: 0.58, facing: 1, id: "israelita-mesa" }),
      ] }),
      b(43, { by: "deus", q: "Não vos façais abomináveis", set: "arraial", props: ARRAIAL, env: { terrain: "field", night: 0.12, glory: 0.55, verdure: 0.4 }, cast: [ // não vos façais abomináveis nem vos contamineis
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.46 }),
      ] }),
      b(44, { by: "deus", q: "sereis santos, porque eu sou santo", env: { glory: 0.85 }, cast: [ // "santificai-vos, e sereis santos, porque eu sou santo"
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 130, "bow", { dy: 0.46 }),
      ] }),
      b(45, { by: "deus", q: "porque eu sou santo", env: { glory: 0.9 }, cast: [   // "eu sou o Senhor que vos fez subir do Egito… porque eu sou santo"
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 130, "bow", { dy: 0.46 }),
      ] }),
      b(46, { by: "deus", q: "Esta é a lei dos animais", props: ARRAIAL_AVES, env: { glory: 0.7, night: 0.1 } }), // esta é a lei dos animais, das aves e das criaturas
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
