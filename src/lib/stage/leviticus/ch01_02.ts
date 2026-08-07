// ============================================================================
// LEVÍTICO 1–2 — roteiro do modo CENA VIVA (força-tarefa AT, onda Levítico).
//
// O livro do CULTO. Terminado o tabernáculo (fim de Êxodo) e cheia a tenda da
// glória, o SENHOR chama Moisés "da tenda da congregação" e ensina como o povo
// pode aproximar-se do Deus santo. Tudo gira em torno do ALTAR DO HOLOCAUSTO,
// no átrio, diante da porta da tenda — e a fala vem do céu, sem figura.
//
// Lev 1 — O HOLOCAUSTO ("aquilo que sobe"): o adorador põe a mão sobre a cabeça
// do animal (a substituição), degola-o, e o sacerdote queima tudo — "cheiro
// suave ao Senhor". Três graus, conforme a posse: gado vacum (v.3-9), gado
// miúdo (v.10-13) e aves, para o pobre (v.14-17).
//
// Lev 2 — A OFERTA DE ALIMENTOS (manjares): flor de farinha, azeite e incenso;
// o sacerdote queima um "memorial" e o resto é dos sacerdotes. Sem fermento e
// sem mel, mas SEMPRE com o SAL DA ALIANÇA. A oferta do trabalho e do pão.
//
// A VOZ DE DEUS (regra do projeto): teofania sem figura — a instrução vem do
// alto (`by: "deus"`) com glória alta, saindo da tenda; Moisés a recebe de
// joelhos. Arão e seus filhos (os sacerdotes = `arao`/`servo`) ministram ao
// altar; o povo que traz a oferta é `homem`/`multidao`; o animal é `rebanho`
// (vacum), `cordeiro` (miúdo) e o prop `birds` (as aves do pobre).
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------------------
// O ÁTRIO DO TABERNÁCULO: a tenda da congregação ao fundo, o ALTAR do
// holocausto aceso diante da porta, a pia de cobre, e o pátio da oferta. É
// daqui, da tenda, que a voz do Senhor fala a Moisés.
const ATRIO: StagePropSpec[] = [
  { ...P("tent", -30, 1.45, undefined, 0.08), tag: "tabernaculo" },
  { ...P("altar", 70, 1.25, 0.75, 0.44), tag: "altar-holocausto" },
  { ...P("bowl", 158, 0.85, undefined, 0.56), tag: "pia-cobre" },
  P("tower", -300, 1.15, undefined, 0.06),
  P("palm", -250, 1.0, undefined, 0.16),
  P("amphora", 210, 0.85, undefined, 0.64),
  P("crate", -140, 0.8, undefined, 0.62),
  P("rock", 306, 0.95, undefined, 0.5),
  P("grass", -60, 0.8, undefined, 0.82),
  P("grass", 120, 0.78, undefined, 0.74),
];

// A OFERTA DE ALIMENTOS (Lev 2): a flor de farinha em molhos/feixe, o azeite e
// o incenso do memorial sobre o altar.
const ATRIO_MANJARES: StagePropSpec[] = [
  ...ATRIO,
  { ...P("sheaf", -108, 1.0, undefined, 0.5), tag: "oferta-alimentos" },
  P("censer", 130, 0.8, 0.6, 0.6),
  P("amphora", -150, 0.75, undefined, 0.7),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Lev 1
  // Arco de env: a glória que enche a tenda (glory 0.7) e o FOGO do altar que
  // nunca se apaga, subindo mais alto a cada "cheiro suave" (v.9,13,17).
  1: {
    start: { terrain: "desert", night: 0.1, glory: 0.7, storm: 0, fire: 0.6, verdure: 0.15 },
    beats: [
      b(1, { by: "deus", props: ATRIO, env: { terrain: "desert", glory: 0.82, fire: 0.6, night: 0.08 }, cast: [ // o Senhor CHAMA Moisés da tenda da congregação
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
        C("arao", 30, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(2, { by: "deus", q: "e dize-lhes: " }),                                    // "Quando algum de vós oferecer oferta ao Senhor… de gado"
      b(3, { by: "deus", cast: [                                                   // holocausto de gado: macho sem defeito, à porta da tenda
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
        C("homem", -70, "stand", { dy: 0.54, facing: 1, id: "ofertante" }),
        C("rebanho", 150, "stand", { dy: 0.4, id: "novilho" }),
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(4, { by: "deus", q: "E porá a sua mão sobre a cabeça do holocausto", cast: [ // a MÃO sobre a cabeça: a expiação, a substituição
        C("homem", 90, "point", { dy: 0.46, facing: 1, id: "ofertante" }),
        C("rebanho", 150, "stand", { dy: 0.4, id: "novilho" }),
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(5, { by: "deus", env: { storm: 0.1 }, cast: [                              // degola o bezerro; os sacerdotes espargem o sangue no altar
        C("arao", 44, "kneel", { dy: 0.5, facing: -1 }),
        C("servo", 110, "stand", { dy: 0.48, facing: -1, id: "sacerdote2" }),
        C("homem", -60, "bow", { dy: 0.54, facing: 1, id: "ofertante" }),
      ] }),
      b(6, { by: "deus" }),                                                        // esfolará o holocausto e o partirá nos seus pedaços
      b(7, { by: "deus", env: { fire: 0.75 }, cast: [                              // os sacerdotes põem FOGO e lenha em ordem sobre o altar
        C("arao", 46, "kneel", { dy: 0.5, facing: -1 }),
        C("servo", 112, "stand", { dy: 0.48, facing: -1, id: "sacerdote2" }),
      ] }),
      b(8, { by: "deus" }),                                                        // põem em ordem os pedaços, a cabeça e o redenho sobre a lenha
      b(9, { by: "deus", q: "de cheiro suave ao Senhor", env: { fire: 0.9, glory: 0.85 }, cast: [ // tudo queimado: holocausto, cheiro suave ao Senhor
        C("arao", 46, "raise", { dy: 0.5, facing: -1 }),
        C("homem", -60, "bow", { dy: 0.54, facing: 1, id: "ofertante" }),
      ] }),
      b(10, { by: "deus", env: { fire: 0.7 }, cast: [                              // se a oferta for de gado miúdo: ovelhas ou cabras
        C("homem", -60, "stand", { dy: 0.54, facing: 1, id: "ofertante" }),
        C("cordeiro", 140, "stand", { dy: 0.44, scale: 0.7, id: "cordeiro-of" }),
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(11, { by: "deus", env: { storm: 0.1 }, cast: [                             // degola ao lado norte; espargem o sangue no altar
        C("arao", 44, "kneel", { dy: 0.5, facing: -1 }),
        C("cordeiro", 120, "stand", { dy: 0.44, scale: 0.7, id: "cordeiro-of" }),
      ] }),
      b(12, { by: "deus" }),                                                       // partido em pedaços, posto em ordem sobre a lenha no fogo
      b(13, { by: "deus", q: "de cheiro suave ao Senhor", env: { fire: 0.88, glory: 0.85 }, cast: [ // tudo queimado: holocausto de cheiro suave
        C("arao", 46, "raise", { dy: 0.5, facing: -1 }),
      ] }),
      b(14, { by: "deus", env: { fire: 0.65 }, props: [...ATRIO, { kind: "birds", dx: 120, scale: 1, dy: 0.4, sky: true }], cast: [ // a oferta do POBRE: rolas ou pombinhos
        C("homem", -70, "stand", { dy: 0.54, facing: 1, id: "ofertante" }),
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(15, { by: "deus", env: { storm: 0.08 }, cast: [                            // o sacerdote a oferece: tira a cabeça, o sangue na parede do altar
        C("arao", 46, "kneel", { dy: 0.5, facing: -1 }),
      ] }),
      b(16, { by: "deus" }),                                                       // o papo e as penas lançados junto ao altar, no lugar da cinza
      b(17, { by: "deus", q: "de cheiro suave ao Senhor", env: { fire: 0.85, glory: 0.82 }, cast: [ // fendida pelas asas e queimada: cheiro suave ao Senhor
        C("arao", 46, "raise", { dy: 0.5, facing: -1 }),
        C("homem", -60, "bow", { dy: 0.54, facing: 1, id: "ofertante" }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Lev 2
  // A oferta de alimentos: flor de farinha, azeite e incenso; o memorial que
  // sobe, o resto dos sacerdotes; sem fermento, com o SAL da aliança.
  2: {
    start: { terrain: "desert", night: 0.1, glory: 0.7, storm: 0, fire: 0.55, verdure: 0.15 },
    beats: [
      b(1, { by: "deus", set: "manjares", props: ATRIO_MANJARES, env: { terrain: "desert", glory: 0.75, fire: 0.55, night: 0.08 }, cast: [ // oferta de alimentos: flor de farinha, azeite e incenso
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
        C("homem", -60, "kneel", { dy: 0.54, facing: 1, id: "ofertante" }),
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(2, { by: "deus", q: "queimará como memorial sobre o altar", env: { fire: 0.72, glory: 0.8 }, cast: [ // um punhado + azeite + incenso: o MEMORIAL queimado
        C("arao", 46, "raise", { dy: 0.5, facing: -1 }),
        C("homem", -60, "stand", { dy: 0.54, facing: 1, id: "ofertante" }),
      ] }),
      b(3, { by: "deus", q: "coisa santíssima é", cast: [                          // o que sobeja é de Arão e seus filhos: santíssima
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
        C("servo", 110, "stand", { dy: 0.48, facing: -1, id: "sacerdote2" }),
      ] }),
      b(4, { by: "deus" }),                                                        // cozida no forno: bolos ázimos amassados com azeite
      b(5, { by: "deus" }),                                                        // cozida na caçoula: flor de farinha sem fermento com azeite
      b(6, { by: "deus", q: "Em pedaços a partirás" }),                            // "Em pedaços a partirás, e sobre ela deitarás azeite"
      b(7, { by: "deus" }),                                                        // de frigideira: flor de farinha com azeite
      b(8, { by: "deus", cast: [                                                   // trazida ao sacerdote, que a leva ao altar
        C("homem", -60, "walk", { dy: 0.54, facing: 1, id: "ofertante" }),
        C("arao", 46, "stand", { dy: 0.5, facing: -1 }),
      ] }),
      b(9, { by: "deus", q: "de cheiro suave ao Senhor", env: { fire: 0.72, glory: 0.8 }, cast: [ // o memorial queimado: cheiro suave ao Senhor
        C("arao", 46, "raise", { dy: 0.5, facing: -1 }),
      ] }),
      b(10, { by: "deus", q: "coisa santíssima é" }),                              // o que sobeja é de Arão e seus filhos: santíssima
      b(11, { by: "deus", q: "se fará com fermento" }),                            // nenhuma oferta com fermento nem mel
      b(12, { by: "deus" }),                                                       // primícias sim, mas não sobem por cheiro suave
      b(13, { by: "deus", q: "o sal da aliança do teu Deus", env: { glory: 0.85 }, cast: [ // o SAL da aliança em todas as ofertas
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(14, { by: "deus" }),                                                       // primícias: espigas verdes tostadas ao fogo, grão trilhado
      b(15, { by: "deus" }),                                                       // sobre ela azeite e incenso: oferta de alimentos
      b(16, { by: "deus", q: "oferta queimada é ao Senhor", env: { fire: 0.7, glory: 0.8 }, cast: [ // o memorial queimado ao Senhor
        C("arao", 46, "raise", { dy: 0.5, facing: -1 }),
      ] }),
    ],
  },
};
