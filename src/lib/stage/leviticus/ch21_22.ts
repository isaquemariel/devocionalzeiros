// ============================================================================
// LEVÍTICO 21–22 — CENA VIVA. A santidade dos sacerdotes e das coisas santas.
//
// Lev 21 — OS SACERDOTES: quem serve ao altar guarda santidade maior — não se
// contamina com mortos senão dos parentes chegados, não se casa profanamente, e
// o que tem defeito corporal não se aproxima do véu, mas come do pão santo.
// "O santificarás, porquanto oferece o pão do teu Deus" (v.8).
//
// Lev 22 — AS COISAS SANTAS: os sacerdotes imundos não comem das ofertas; só
// come da porção santa quem é da casa sacerdotal; os animais oferecidos são
// sem defeito. O selo do livro: "não profanareis o meu santo nome, para que eu
// seja santificado no meio dos filhos de Israel" (v.32).
//
// A VOZ DE DEUS (regra do projeto): tudo é instrução do alto (`by: "deus"`),
// da tenda, sem figura; Arão e seus filhos (`arao`/`servo`) diante do altar.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const dv = (v: number) => b(v, { by: "deus" });

const ATRIO: StagePropSpec[] = [
  { ...P("tent", -30, 1.45, undefined, 0.08), tag: "tabernaculo" },
  { ...P("altar", 70, 1.25, 0.7, 0.44), tag: "altar-holocausto" },
  { ...P("bowl", 158, 0.85, undefined, 0.56), tag: "pia-cobre" },
  P("tower", -300, 1.15, undefined, 0.06),
  P("palm", -250, 1.0, undefined, 0.16),
  P("crate", -140, 0.8, undefined, 0.62),
  P("grass", -60, 0.8, undefined, 0.82),
];
const priests = (): CastPlacement[] => [
  C("arao", 30, "stand", { glow: 0.2, dy: 0.52, facing: -1 }),
  C("servo", 100, "stand", { dy: 0.48, facing: -1, id: "sacerdote2" }),
];
// A MESA DAS COISAS SANTAS (Lev 22:2-16): as porções santas dos filhos de
// Israel — o pão dos sacerdotes — postas diante da tenda.
const MESA: StagePropSpec[] = [
  ...ATRIO,
  { ...P("bowl", -90, 0.9, undefined, 0.6), tag: "coisas-santas" },
  P("sheaf", -200, 0.95, undefined, 0.5),
  P("amphora", -40, 0.85, undefined, 0.56),
];
// A mesa ao pôr-do-sol (Lev 22:7): "havendo-se o sol já posto, então será
// limpo, e depois comerá das coisas santas".
const MESA_TARDE: StagePropSpec[] = [
  ...MESA,
  { kind: "moon", dx: -170, scale: 1, dy: 0.62, sky: true },
  { kind: "starfield", dx: 90, scale: 1, dy: 0.8, sky: true },
];
// O EXAME DO ANIMAL (Lev 22:17-30): o curral de onde vêm as reses do voto, e o
// altar que só recebe o SEM DEFEITO.
const EXAME: StagePropSpec[] = [
  ...ATRIO,
  P("stall", -270, 1.0, undefined, 0.36),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Lev 21
  21: {
    start: { terrain: "desert", night: 0.1, glory: 0.66, storm: 0, fire: 0.5, verdure: 0.15 },
    beats: [
      b(1, { by: "deus", props: ATRIO, env: { terrain: "desert", glory: 0.68, fire: 0.5, night: 0.1 }, cast: [ // "Fala aos sacerdotes, filhos de Arão"
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }), ...priests(),
      ] }),
      dv(2), dv(3), dv(4), dv(5), dv(6), dv(7),
      b(8, { by: "deus", q: "santo será para ti", env: { glory: 0.82 }, cast: [    // "o santificarás, porque oferece o pão do teu Deus; santo será"
        C("arao", 20, "stand", { glow: 0.35, dy: 0.52, facing: 1 }), C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      dv(9), dv(10), dv(11), dv(12), dv(13), dv(14), dv(15),
      b(16, { by: "deus", cast: [ C("moises", -150, "kneel", { dy: 0.5, facing: 1 }), ...priests() ] }), // falou mais o Senhor a Moisés
      dv(17), dv(18), dv(19), dv(20), dv(21),
      b(22, { by: "deus", q: "o pão do seu Deus" }),                              // o que tem defeito come do pão do seu Deus (santíssimo)
      dv(23),
      b(24, { env: { glory: 0.78 }, cast: [                                       // e Moisés falou isto a Arão, aos seus filhos e a todo o Israel
        C("moises", -60, "point", { dy: 0.5, facing: 1 }),
        C("arao", 20, "stand", { glow: 0.3, dy: 0.52, facing: 1 }),
        C("servo", 70, "stand", { dy: 0.5, facing: 1, id: "sacerdote2" }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Lev 22
  22: {
    start: { terrain: "desert", night: 0.1, glory: 0.66, storm: 0, fire: 0.5, verdure: 0.15 },
    beats: [
      b(1, { by: "deus", props: ATRIO, env: { terrain: "desert", glory: 0.68, fire: 0.5, night: 0.1 }, cast: [ // falou mais o Senhor a Moisés
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }), ...priests(),
      ] }),
      // v.2-16 — as COISAS SANTAS: a mesa do pão dos sacerdotes, o imundo
      // apartado até a tarde, o estranho que não come, a filha viúva que volta.
      b(2, { by: "deus", props: MESA, env: { glory: 0.72 }, cast: [               // apartem-se das coisas santas, para não profanarem o Nome
        C("moises", -260, "kneel", { dy: 0.5, facing: 1 }), ...priests(),
      ] }),
      b(3, { by: "deus", env: { glory: 0.55, night: 0.16 }, cast: [               // quem se chegar tendo imundícia: extirpado de diante da face
        C("servo", -230, "walk", { dy: 0.52, facing: -1, id: "apartado" }),
        C("arao", 40, "stand", { glow: 0.2, dy: 0.52, facing: -1 }),
      ] }),
      b(4, { by: "deus", env: { night: 0.18 }, cast: [                            // o leproso ou o de fluxo não comerá até que seja limpo
        C("servo", -190, "stand", { dy: 0.56, facing: 1, id: "apartado" }),
        C("arao", 40, "stand", { glow: 0.2, dy: 0.52, facing: -1 }),
      ] }),
      b(5, { by: "deus", props: [...MESA, P("serpent", -240, 0.85, undefined, 0.7)], cast: [ // quem tocar réptil ou homem imundo
        C("servo", -180, "kneel", { dy: 0.54, facing: 1, id: "apartado" }),
        C("arao", 40, "point", { dy: 0.52, facing: -1 }),
      ] }),
      b(6, { by: "deus", props: MESA, env: { night: 0.3, glory: 0.5 }, cast: [    // imundo até à tarde: banhará a sua carne em água
        C("servo", 210, "kneel", { dy: 0.56, facing: -1, id: "apartado" }),
        C("arao", 20, "stand", { glow: 0.2, dy: 0.52, facing: 1 }),
      ] }),
      b(7, { by: "deus", props: MESA_TARDE, env: { night: 0.45, glory: 0.62 }, cast: [ // posto o sol, será limpo e comerá: "porque este é o seu pão"
        C("servo", 70, "walk", { dy: 0.52, facing: -1, id: "apartado" }),
        C("arao", -10, "stand", { glow: 0.25, dy: 0.52, facing: 1 }),
      ] }),
      b(8, { by: "deus", props: MESA, env: { night: 0.12, glory: 0.65 }, cast: [  // o corpo morto e o dilacerado não comerá
        C("arao", 30, "point", { dy: 0.52, facing: -1 }),
        C("servo", 100, "stand", { dy: 0.48, facing: -1, id: "sacerdote2" }),
      ] }),
      b(9, { by: "deus", env: { glory: 0.8 }, cast: [                             // "Eu sou o Senhor que os santifico"
        C("arao", 30, "raise", { glow: 0.3, dy: 0.52, facing: -1 }),
        C("servo", 100, "bow", { dy: 0.48, facing: -1, id: "sacerdote2" }),
        C("moises", -260, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(10, { by: "deus", env: { glory: 0.62 }, cast: [                           // nenhum estranho, hóspede ou diarista comerá das coisas santas
        C("homem", -180, "stand", { dy: 0.54, facing: 1, id: "estranho" }),
        C("arao", 20, "raise", { dy: 0.52, facing: -1 }),
        C("servo", 100, "stand", { dy: 0.48, facing: -1, id: "sacerdote2" }),
      ] }),
      b(11, { by: "deus", cast: [                                                 // o comprado com dinheiro e o nascido na casa comerão do pão
        C("homem", -90, "walk", { dy: 0.52, facing: 1, id: "da-casa" }),
        C("arao", 20, "stand", { glow: 0.2, dy: 0.52, facing: -1 }),
      ] }),
      b(12, { by: "deus", env: { glory: 0.58 }, cast: [                           // a filha do sacerdote casada com estranho não comerá
        C("mulherComum", -150, "walk", { dy: 0.52, facing: -1, id: "filha-do-sacerdote" }),
        C("homem", -230, "walk", { dy: 0.54, facing: -1, id: "estranho" }),
        C("arao", 30, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(13, { by: "deus", env: { glory: 0.75 }, cast: [                           // a filha viúva que volta à casa do pai: do pão do pai comerá
        C("mulherComum", -130, "walk", { dy: 0.52, facing: 1, id: "filha-do-sacerdote" }),
        C("arao", 20, "stand", { glow: 0.25, dy: 0.52, facing: -1 }),
      ] }),
      b(14, { by: "deus", cast: [                                                 // quem por erro comer: restitui e acrescenta a quinta parte
        C("homem", -70, "kneel", { dy: 0.54, facing: 1, id: "que-errou" }),
        C("arao", 30, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(15, { by: "deus", env: { glory: 0.72 }, cast: [                           // assim não profanarão as coisas santas dos filhos de Israel
        C("arao", 20, "raise", { glow: 0.3, dy: 0.52, facing: -1 }),
        C("servo", 90, "raise", { dy: 0.48, facing: -1, id: "sacerdote2" }),
      ] }),
      b(16, { by: "deus", env: { glory: 0.8 }, cast: [                            // "eu sou o Senhor que as santifico"
        C("moises", -260, "stand", { dy: 0.5, facing: 1 }),
        C("arao", 20, "stand", { glow: 0.3, dy: 0.52, facing: -1 }),
        C("servo", 90, "bow", { dy: 0.48, facing: -1, id: "sacerdote2" }),
      ] }),
      b(17, { by: "deus", props: EXAME, env: { glory: 0.68, night: 0.1 }, cast: [ C("moises", -150, "kneel", { dy: 0.5, facing: 1 }), ...priests() ] }), // falou mais o Senhor a Moisés
      dv(18),
      b(19, { by: "deus", q: "macho sem defeito", cast: [                          // a oferta será macho SEM DEFEITO, para ser aceita
        C("arao", 40, "stand", { glow: 0.2, dy: 0.52, facing: -1 }),
        C("rebanho", 150, "stand", { dy: 0.4, id: "oferta" }),
      ] }),
      // v.20-31 — o EXAME do animal: o com defeito é rejeitado e sai; o
      // perfeito vai ao altar com fogo. O sacerdote examina, o ofertante espera.
      b(20, { by: "deus", env: { glory: 0.6 }, cast: [                             // nenhuma coisa em que haja defeito oferecereis
        C("arao", 30, "point", { dy: 0.52, facing: 1 }),
        C("rebanho", -120, "stand", { dy: 0.44, id: "com-defeito" }),
        C("homem", -200, "stand", { dy: 0.52, facing: 1, id: "ofertante" }),
      ] }),
      b(21, { by: "deus", env: { glory: 0.7 }, cast: [                             // voto ou oferta voluntária: sem defeito será, para ser aceito
        C("homem", -190, "walk", { dy: 0.52, facing: 1, id: "ofertante" }),
        C("rebanho", -100, "walk", { dy: 0.44, facing: 1, id: "oferta" }),
        C("arao", 40, "stand", { glow: 0.2, dy: 0.52, facing: -1 }),
      ] }),
      b(22, { by: "deus", env: { glory: 0.5, night: 0.16 }, cast: [                // o cego, o quebrado, o aleijado: não poreis sobre o altar
        C("rebanho", -140, "stand", { dy: 0.44, scale: 0.9, id: "com-defeito" }),
        C("arao", 20, "point", { dy: 0.52, facing: -1 }),
        C("homem", -220, "bow", { dy: 0.52, facing: 1, id: "ofertante" }),
      ] }),
      b(23, { by: "deus", env: { glory: 0.6 }, cast: [                             // comprido ou curto: por voluntária sim, por voto não
        C("rebanho", -80, "stand", { dy: 0.42, scale: 1.1, id: "desigual" }),
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(24, { by: "deus", env: { glory: 0.55 }, cast: [                            // o machucado ou cortado não oferecereis: o rejeitado sai
        C("homem", -200, "walk", { dy: 0.52, facing: -1, id: "ofertante" }),
        C("rebanho", -120, "walk", { dy: 0.44, facing: -1, id: "com-defeito" }),
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(25, { by: "deus", props: [...EXAME, P("amphora", -210, 0.8, undefined, 0.6)], env: { glory: 0.5 }, cast: [ // nem da mão do estrangeiro: a corrupção está nelas
        C("homem", -170, "stand", { dy: 0.52, facing: 1, id: "estrangeiro" }),
        C("arao", 30, "raise", { dy: 0.52, facing: -1 }),
      ] }),
      b(26, { by: "deus", props: EXAME, env: { glory: 0.68 }, cast: [              // falou mais o Senhor a Moisés
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
        C("arao", 30, "stand", { glow: 0.2, dy: 0.52, facing: -1 }),
      ] }),
      b(27, { by: "deus", env: { glory: 0.72, verdure: 0.3 }, cast: [              // o recém-nascido: sete dias debaixo da mãe; do oitavo, aceito
        C("rebanho", -110, "stand", { dy: 0.42, id: "mae-res" }),
        C("rebanho", -65, "stand", { dy: 0.46, scale: 0.6, id: "cria" }),
      ] }),
      b(28, { by: "deus", cast: [                                                  // a ele e a seu filho não degolareis no mesmo dia
        C("rebanho", -130, "walk", { dy: 0.42, facing: -1, id: "mae-res" }),
        C("rebanho", -85, "walk", { dy: 0.46, scale: 0.6, facing: -1, id: "cria" }),
        C("arao", 30, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(29, { by: "deus", env: { glory: 0.78, fire: 0.65 }, cast: [                // o sacrifício de louvores, da vossa vontade: o aceito, ao altar
        C("homem", -170, "raise", { dy: 0.52, facing: 1, id: "ofertante" }),
        C("rebanho", -90, "walk", { dy: 0.44, facing: 1, id: "oferta" }),
        C("arao", 30, "raise", { glow: 0.25, dy: 0.52, facing: -1 }),
      ] }),
      b(30, { by: "deus", props: [...EXAME, P("campfire", -190, 0.9, 0.8, 0.62)], env: { night: 0.35, glory: 0.6 }, cast: [ // no mesmo dia se comerá: nada fica até pela manhã
        C("homem", -130, "kneel", { dy: 0.56, facing: -1, id: "ofertante" }),
        C("arao", 30, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(31, { by: "deus", q: "Eu sou o Senhor", props: EXAME, env: { night: 0.12, glory: 0.78 }, cast: [ // guardareis os meus mandamentos; Eu sou o Senhor
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }), ...priests(),
      ] }),
      b(32, { by: "deus", q: "para que eu seja santificado no meio dos filhos de Israel", env: { glory: 0.85 }, cast: [ // não profanareis o meu santo nome; serei santificado
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }), ...priests(),
      ] }),
      b(33, { by: "deus", q: "para ser o vosso Deus", env: { glory: 0.82 } }),     // que vos tirei do Egito, para ser o vosso Deus
    ],
  },
};
