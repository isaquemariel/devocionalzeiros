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
// A CASA DO SACERDOTE (Lev 21:1-4,7,10-14): a porta da sua habitação no
// arraial, onde a lei o alcança no luto dos seus mortos e no seu casamento —
// fora do átrio, mas ainda debaixo da santidade do altar.
const CASA_SACERDOTE: StagePropSpec[] = [
  P("door", 20, 1.15, undefined, 0.4),
  P("tent", -180, 1.1, undefined, 0.2),
  P("tent", 220, 1.0, undefined, 0.24),
  P("palm", -300, 1.0, undefined, 0.14),
  P("amphora", -80, 0.8, undefined, 0.64),
  P("grass", -40, 0.8, undefined, 0.84),
];
// O PÃO DO SEU DEUS (Lev 21:6,8,17,21-22): as ofertas queimadas e o pão santo
// que só a mão do sacerdote leva ao altar.
const PAO_SANTO: StagePropSpec[] = [
  ...ATRIO,
  { ...P("sheaf", -90, 1.0, undefined, 0.5), tag: "coisas-santas" },
  P("bowl", -40, 0.85, undefined, 0.6),
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
      b(1, { by: "deus", q: "Depois disse o SENHOR a Moisés:", props: ATRIO, env: { terrain: "desert", glory: 0.68, fire: 0.5, night: 0.1 }, cast: [ // "Fala aos sacerdotes, filhos de Arão"
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }), ...priests(),
      ] }),
      b(2, { by: "deus", q: "Salvo por seu parente mais chegado", set: "casa", props: CASA_SACERDOTE, env: { terrain: "desert", night: 0.34, glory: 0.58, fire: 0 }, cast: [ // só pelo PARENTE MAIS CHEGADO: mãe, pai, filho, filha, irmão
        C("servo", -40, "bow", { dy: 0.58, facing: 1, id: "sacerdote-luto" }),
        C("arao", 130, "stand", { glow: 0.2, dy: 0.52, facing: -1 }),
      ] }),
      b(3, { by: "deus", q: "por ela também se contaminará", env: { night: 0.4, glory: 0.55 }, cast: [ // e por sua IRMÃ VIRGEM, que ainda não teve marido
        C("servo", 30, "kneel", { dy: 0.6, facing: 1, id: "sacerdote-luto" }),
      ] }),
      b(4, { by: "deus", q: "não se contaminará, pois que se profanaria", set: "atrio", props: ATRIO, env: { terrain: "desert", night: 0.12, glory: 0.7, fire: 0.5 }, cast: [ // sendo PRINCIPAL entre o seu povo, não se contaminará
        C("arao", 30, "stand", { glow: 0.25, dy: 0.52, facing: -1 }),
        C("servo", -180, "walk", { dy: 0.54, facing: 1, id: "sacerdote-luto" }),
      ] }),
      b(5, { by: "deus", q: "Não farão calva na sua cabeça", env: { glory: 0.66 }, cast: [ // não farão CALVA na cabeça, nem raparão a barba, nem golpes na carne
        C("arao", -20, "stand", { glow: 0.2, dy: 0.56, scale: 1.12, facing: 1 }),
        C("servo", 70, "stand", { dy: 0.54, scale: 1.05, facing: 1, id: "sacerdote2" }),
      ] }),
      b(6, { by: "deus", q: "e o pão do seu Deus; portanto serão santos", props: PAO_SANTO, env: { glory: 0.84, fire: 0.62 }, cast: [ // SANTOS SERÃO, porque oferecem as ofertas queimadas e o pão do seu Deus
        C("arao", 40, "raise", { glow: 0.3, dy: 0.52, facing: -1 }),
        C("servo", -140, "kneel", { dy: 0.54, facing: 1, id: "sacerdote2" }),
      ] }),
      b(7, { by: "deus", q: "pois santo é a seu Deus", set: "casa", props: CASA_SACERDOTE, env: { terrain: "desert", night: 0.24, glory: 0.62, fire: 0 }, cast: [ // não tomarão mulher prostituta, desonrada nem repudiada
        C("arao", -60, "stand", { glow: 0.2, dy: 0.54, facing: 1 }),
        C("servo", 120, "stand", { dy: 0.52, facing: -1, id: "sacerdote2" }),
      ] }),
      b(8, { by: "deus", q: "santo será para ti", set: "atrio", props: ATRIO, env: { terrain: "desert", night: 0.1, glory: 0.82, fire: 0.5 }, cast: [    // "o santificarás, porque oferece o pão do teu Deus; santo será"
        C("arao", 20, "stand", { glow: 0.35, dy: 0.52, facing: 1 }), C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(9, { by: "deus", q: "com fogo será queimada", props: [...ATRIO, P("campfire", -200, 1.05, 1, 0.6)], env: { night: 0.42, glory: 0.55, fire: 0.8 }, cast: [ // a filha do sacerdote que se prostituir profana o pai: com fogo queimada
        C("arao", 30, "bow", { dy: 0.54, facing: -1 }),
      ] }),
      b(10, { by: "deus", q: "sobre cuja cabeça foi derramado o azeite da unção", props: [...ATRIO, P("amphora", -110, 0.9, undefined, 0.6)], env: { night: 0.1, glory: 0.88, fire: 0.55 }, cast: [ // o SUMO SACERDOTE, ungido: não descobrirá a cabeça nem rasgará as vestes
        C("arao", 0, "stand", { glow: 0.45, dy: 0.52, facing: 1 }),
      ] }),
      b(11, { by: "deus", q: "não se chegará a cadáver algum", props: [...ATRIO, P("door", -230, 1.0, undefined, 0.3)], env: { night: 0.3, glory: 0.66 }, cast: [ // não se chegará a CADÁVER algum, nem por pai nem por mãe
        C("arao", 40, "stand", { glow: 0.3, dy: 0.52, facing: -1 }),
      ] }),
      b(12, { by: "deus", q: "Nem sairá do santuário", props: ATRIO, env: { night: 0.1, glory: 0.92 }, cast: [ // NEM SAIRÁ DO SANTUÁRIO: a coroa do azeite da unção está sobre ele
        C("arao", -20, "stand", { glow: 0.5, dy: 0.5, facing: 1 }),
      ] }),
      b(13, { by: "deus", q: "tomará por esposa uma mulher na sua virgindade", set: "casa", props: CASA_SACERDOTE, env: { terrain: "desert", night: 0.14, glory: 0.72, fire: 0 }, cast: [ // tomará por esposa uma VIRGEM do seu povo
        C("arao", -60, "stand", { glow: 0.3, dy: 0.54, facing: 1 }),
      ] }),
      b(14, { by: "deus", q: "mas virgem do seu povo tomará por mulher", env: { night: 0.26, glory: 0.62 }, cast: [ // viúva, repudiada, desonrada ou prostituta, essas não tomará
        C("arao", 90, "stand", { glow: 0.25, dy: 0.52, facing: -1 }),
      ] }),
      b(15, { by: "deus", q: "porque eu sou o Senhor que o santifico", set: "atrio", props: ATRIO, env: { terrain: "desert", night: 0.1, glory: 0.86, fire: 0.5 }, cast: [ // não profanará a sua descendência: eu sou o Senhor que o santifico
        C("arao", 20, "stand", { glow: 0.4, dy: 0.52, facing: -1 }),
        C("servo", 90, "stand", { dy: 0.5, facing: -1, id: "sacerdote2" }),
        C("servo", 150, "stand", { dy: 0.46, scale: 0.92, facing: -1, id: "sacerdote3" }),
      ] }),
      b(16, { props: ATRIO, env: { glory: 0.7, night: 0.1 }, cast: [ C("moises", -150, "kneel", { dy: 0.5, facing: 1 }), ...priests() ] }), // falou mais o Senhor a Moisés
      b(17, { by: "deus", q: "se chegará a oferecer o pão do seu Deus", props: PAO_SANTO, env: { glory: 0.72 }, cast: [ // nenhum da tua descendência com defeito se chegará a oferecer o pão
        C("arao", 40, "point", { glow: 0.25, dy: 0.52, facing: -1 }),
        C("servo", -210, "stand", { dy: 0.54, facing: 1, id: "sacerdote-defeito" }),
      ] }),
      b(18, { by: "deus", q: "como homem cego, ou coxo", env: { night: 0.22, glory: 0.64 }, cast: [ // o CEGO, o COXO, o de nariz chato, o de membros compridos
        C("servo", -160, "walk", { dy: 0.56, facing: 1, id: "sacerdote-defeito" }),
        C("arao", 40, "stand", { glow: 0.25, dy: 0.52, facing: -1 }),
      ] }),
      b(19, { by: "deus", q: "que tiver quebrado o pé, ou a mão quebrada", env: { night: 0.26, glory: 0.62 }, cast: [ // o que tem o PÉ QUEBRADO ou a MÃO QUEBRADA
        C("servo", -120, "kneel", { dy: 0.6, facing: 1, id: "sacerdote-defeito" }),
      ] }),
      b(20, { by: "deus", q: "Ou corcunda, ou anão", env: { night: 0.28, glory: 0.6 }, cast: [ // o CORCUNDA, o ANÃO, o que tem defeito no olho, sarna ou impigem
        C("servo", -100, "bow", { dy: 0.62, scale: 0.75, facing: 1, id: "sacerdote-defeito" }),
      ] }),
      b(21, { by: "deus", q: "não se chegará para oferecer o pão do seu Deus", env: { night: 0.14, glory: 0.74, fire: 0.6 }, cast: [ // com deformidade, não se chegará para oferecer as ofertas queimadas
        C("arao", 50, "raise", { glow: 0.3, dy: 0.5, facing: -1 }),
        C("servo", -230, "stand", { dy: 0.54, facing: 1, id: "sacerdote-defeito" }),
      ] }),
      b(22, { by: "deus", q: "o pão do seu Deus", env: { glory: 0.78, night: 0.1 }, cast: [ // mas COMERÁ do pão do seu Deus, tanto do santíssimo como do santo
        C("servo", -110, "kneel", { dy: 0.56, facing: -1, id: "sacerdote-defeito" }),
        C("arao", 40, "stand", { glow: 0.25, dy: 0.52, facing: -1 }),
      ] }),
      b(23, { by: "deus", q: "Porém até ao véu não entrará", props: ATRIO, env: { glory: 0.7, night: 0.16 }, cast: [ // porém até ao VÉU não entrará, nem se chegará ao altar
        C("arao", 60, "stand", { glow: 0.3, dy: 0.5, facing: -1 }),
        C("servo", -200, "bow", { dy: 0.56, facing: 1, id: "sacerdote-defeito" }),
      ] }),
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
      b(1, { props: ATRIO, env: { terrain: "desert", glory: 0.68, fire: 0.5, night: 0.1 }, cast: [ // falou mais o Senhor a Moisés
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
      b(17, { props: EXAME, env: { glory: 0.68, night: 0.1 }, cast: [ C("moises", -150, "kneel", { dy: 0.5, facing: 1 }), ...priests() ] }), // falou mais o Senhor a Moisés
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
      b(26, { props: EXAME, env: { glory: 0.68 }, cast: [              // falou mais o Senhor a Moisés
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
