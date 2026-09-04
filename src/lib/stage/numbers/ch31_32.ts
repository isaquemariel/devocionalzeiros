// ============================================================================
// NÚMEROS 31–32 — CENA VIVA. A GUERRA contra MIDIÃ; e as tribos ao lado de cá.
//
// Nm 31 — A VINGANÇA DE MIDIÃ (pelo caso de Baal-Peor): mil de cada tribo, com
// FINÉIAS levando os vasos do santuário e as trombetas do alarido, saem à guerra.
// Vencem; os cinco reis caem, e BALAÃO é morto à espada. Queimam as cidades,
// tomam o despojo. Moisés indigna-se, e vem a purificação pelo fogo e pela água.
// Então se REPARTE a presa: metade aos guerreiros, metade à congregação, e o
// tributo do Senhor. Por fim, o ouro dos chefes é levado por memorial à tenda.
//
// Nm 32 — RÚBEN E GADE (muito gado) pedem a terra de Jazer e Gileade, ao lado de
// cá do Jordão, para não atravessar. Moisés repreende ("não desanimeis os irmãos
// como fizeram os espias!"), mas eles se comprometem a passar ARMADOS à frente na
// guerra até Israel possuir a terra, e só depois voltar. Recebem Gileade, com a
// meia tribo de Manassés.
//
// A VOZ DE DEUS (regra do projeto): a ordem de vingança vem do alto (`by: "deus"`)
// com glória; Moisés e Eleazar (o sacerdote = `servo` id:"eleazar") são os
// mediadores visíveis; a ira do Senhor no discurso de Moisés é falada por ELE
// (`by: "moises"`), não pela voz do céu.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const dv = (v: number) => b(v, { by: "deus" });

// O arraial nas campinas de Moabe, junto ao Jordão, na altura de Jericó.
const MOABE: StagePropSpec[] = [
  { ...P("tent", -30, 1.45, undefined, 0.1), tag: "tabernaculo" },
  P("tent", -260, 1.0, undefined, 0.2),
  P("tent", 220, 1.0, undefined, 0.22),
  P("river", 320, 1.1, undefined, 0.6),
  P("palm", -310, 1.05, undefined, 0.14),
  P("grass", -60, 0.82, undefined, 0.82),
  P("grass", 60, 0.78, undefined, 0.74),
];
// A frente de batalha: fogo consumidor sobre as cidades de Midiã, nuvem escura de
// juízo, e as trombetas do alarido na mão dos que saem à peleja.
const BATALHA: StagePropSpec[] = [
  { ...P("campfire", 40, 1.3, 0.9, 0.42), tag: "fogo" },
  P("tent", 210, 0.95, undefined, 0.24),
  { ...P("clouds", -120, 1.2, undefined, 0.86), sky: true },
  { ...P("clouds", 160, 1.0, undefined, 0.8), sky: true },
  { ...P("trumpet", -150, 0.9, undefined, 0.5), tag: "trombetas" },
  P("rock", 300, 0.9, undefined, 0.6),
];
// A repartição do despojo: os fardos e os currais da presa tomada.
const DESPOJO: StagePropSpec[] = [
  { ...P("tent", -30, 1.4, undefined, 0.1), tag: "tabernaculo" },
  P("crate", 120, 0.9, undefined, 0.54),
  P("crate", 200, 0.85, undefined, 0.58),
  P("stall", -180, 1.0, undefined, 0.5),
  P("palm", -310, 1.05, undefined, 0.14),
  P("grass", 60, 0.78, undefined, 0.78),
];

// ------------------------------------------------------- A SOMA DA PRESA (v32-47)
// A presa é CONTADA e REPARTIDA peça por peça: os currais do gado miúdo e do
// gado grande, os fardos dos bens, as cativas, e o tributo alçado ao Senhor.

// O CURRAL da presa: os apriscos onde as seiscentas e setenta e cinco mil
// ovelhas e os bois são contados.
const CURRAL: StagePropSpec[] = [
  P("stall", -170, 1.1, undefined, 0.5),
  P("stall", 60, 1.0, undefined, 0.62),
  P("crate", 210, 0.85, undefined, 0.56),
  P("palm", -320, 1.05, undefined, 0.14),
  P("grass", -40, 0.85, undefined, 0.82),
];
// OS FARDOS: os bens de Midiã amontoados — jarras, caixas e taças da conta.
const FARDOS: StagePropSpec[] = [
  P("crate", -150, 1.0, undefined, 0.52),
  P("crate", -60, 0.9, undefined, 0.66),
  P("amphora", 90, 0.9, undefined, 0.6),
  P("amphora", 160, 0.85, undefined, 0.7),
  { ...P("bowl", 250, 0.85, undefined, 0.56), tag: "soma-da-presa" },
  P("palm", -320, 1.05, undefined, 0.14),
];
// AS CATIVAS: as tendas onde ficaram as almas trazidas de Midiã.
const CATIVAS: StagePropSpec[] = [
  P("tent", -190, 1.1, undefined, 0.24),
  P("tent", 60, 1.0, undefined, 0.3),
  P("tent", 250, 0.9, undefined, 0.36),
  P("crate", -60, 0.8, undefined, 0.68),
  P("grass", 150, 0.8, undefined, 0.8),
];
// O TRIBUTO DO SENHOR: o altar da oferta alçada diante da tenda, com a taça e o
// incensário do que é separado para Deus.
const TRIBUTO: StagePropSpec[] = [
  { ...P("tent", -240, 1.35, undefined, 0.12), tag: "tabernaculo" },
  { ...P("altar", 20, 1.05, undefined, 0.44), tag: "oferta-alcada" },
  { ...P("bowl", 150, 0.85, undefined, 0.6), tag: "soma-da-presa" },
  P("censer", -110, 0.8, 0.5, 0.62),
  P("stall", 260, 0.95, undefined, 0.5),
  P("grass", 80, 0.8, undefined, 0.82),
];

// As pastagens de Jazer e Gileade — lugar de gado, verde e farto.
const PASTAGEM: StagePropSpec[] = [
  P("stall", -180, 1.05, undefined, 0.5),
  P("tent", 200, 1.0, undefined, 0.22),
  P("well", 300, 1.0, undefined, 0.56),
  P("palm", -320, 1.05, undefined, 0.14),
  P("grass", -60, 0.9, undefined, 0.84),
  P("grass", 80, 0.86, undefined, 0.76),
  P("rock", 260, 0.85, undefined, 0.64),
];
// As cidades fortes edificadas para as crianças e os currais para as ovelhas.
const CIDADES: StagePropSpec[] = [
  { ...P("tower", -40, 1.2, undefined, 0.24), tag: "cidade" },
  P("tent", 180, 1.0, undefined, 0.24),
  P("stall", -200, 1.0, undefined, 0.52),
  P("palm", -320, 1.05, undefined, 0.14),
  P("grass", 80, 0.86, undefined, 0.78),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Nm 31
  31: {
    start: { terrain: "desert", night: 0.1, glory: 0.62, storm: 0, fire: 0, verdure: 0.2 },
    beats: [
      b(1, { props: MOABE, env: { terrain: "desert", glory: 0.66, night: 0.1, verdure: 0.2 }, cast: [ // o Senhor fala a Moisés
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(2, { by: "deus", q: "Vinga os filhos de Israel dos midianitas", env: { glory: 0.7 } }), // "VINGA os filhos de Israel dos midianitas"
      b(3, { by: "moises", q: "Armem-se alguns de vós para a guerra", cast: [                   // Moisés ao povo: "Armem-se para a guerra"
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
      b(4, { by: "moises", q: "Mil de cada tribo" }),                                            // mil de cada tribo à guerra
      b(5, { q: "doze mil armados para a peleja", cast: [                                        // doze mil armados para a peleja
        C("cavaleiro", -60, "stand", { dy: 0.5, facing: -1, id: "guerreiro" }),
        C("cavaleiro", 40, "stand", { dy: 0.46, facing: -1, id: "guerreiro2" }),
      ] }),
      b(6, { set: "batalha", props: BATALHA, q: "com eles Finéias", env: { terrain: "desert", glory: 0.14, night: 0.4, fire: 0.7 }, cast: [ // FINÉIAS com os vasos do santuário e as trombetas
        C("servo", -150, "raise", { glow: 0.3, dy: 0.5, facing: 1, id: "fineias" }),
        C("cavaleiro", 20, "walk", { dy: 0.5, facing: 1, id: "guerreiro" }),
        C("cavaleiro", 110, "walk", { dy: 0.46, facing: 1, id: "guerreiro2" }),
      ] }),
      b(7, { q: "mataram a todos os homens", env: { glory: 0.12, night: 0.42, fire: 0.75 }, cast: [ // pelejaram e mataram a todos os homens
        C("cavaleiro", -40, "raise", { dy: 0.5, facing: 1, id: "guerreiro" }),
        C("cavaleiro", 60, "stand", { dy: 0.46, facing: 1, id: "guerreiro2" }),
      ] }),
      b(8, { q: "mataram à espada", env: { glory: 0.12, night: 0.44, fire: 0.72 }, cast: [        // os cinco reis caem; BALAÃO morto à espada
        C("cavaleiro", -50, "raise", { dy: 0.5, facing: 1, id: "guerreiro" }),
        C("homem", 60, "lie", { dy: 0.54, facing: 1, id: "balaao" }),
        C("rei", 150, "lie", { dy: 0.5, facing: 1, id: "rei-midia" }),
      ] }),
      b(9, {}),                                                                                  // levaram presas as mulheres e todo o gado
      b(10, { q: "queimaram a fogo todas as suas cidades", env: { glory: 0.1, night: 0.48, fire: 0.95 } }), // queimaram a fogo todas as cidades
      b(11, { q: "todo o despojo" }),                                                            // tomaram todo o despojo e a presa
      b(12, { set: "arraial", props: MOABE, env: { terrain: "desert", glory: 0.5, night: 0.14, verdure: 0.2 }, cast: [ // trouxeram tudo ao arraial nas campinas de Moabe
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
        C("servo", -90, "stand", { glow: 0.15, dy: 0.5, facing: 1, id: "eleazar" }),
        C("cavaleiro", 120, "walk", { dy: 0.46, facing: -1, id: "guerreiro" }),
      ] }),
      b(13, { cast: [                                                                            // Moisés e Eleazar saem a recebê-los fora do arraial
        C("moises", -150, "walk", { dy: 0.5, facing: 1 }),
        C("servo", -80, "walk", { glow: 0.15, dy: 0.5, facing: 1, id: "eleazar" }),
      ] }),
      b(14, { q: "indignou-se Moisés grandemente", env: { glory: 0.4, night: 0.16 }, cast: [     // Moisés se indigna contra os oficiais
        C("moises", -120, "point", { dy: 0.5, facing: 1 }),
        C("homem", 80, "stand", { dy: 0.5, facing: -1, id: "oficial" }),
      ] }),
      b(15, { by: "moises", q: "Deixastes viver todas as mulheres?" }),                          // "Deixastes viver todas as mulheres?"
      b(16, { by: "moises", q: "no caso de Peor" }),                                             // foi por conselho de Balaão, no caso de Peor
      b(17, { by: "moises" }),
      b(18, { by: "moises" }),
      b(19, { by: "moises", q: "vos purificareis", env: { fire: 0.3 }, cast: [                   // sete dias fora; ao terceiro e sétimo vos purificareis
        C("moises", -120, "point", { dy: 0.5, facing: 1 }),
        C("cavaleiro", 90, "kneel", { dy: 0.5, facing: -1, id: "guerreiro" }),
      ] }),
      b(20, { by: "moises" }),
      b(21, { by: "servo", q: "Este é o estatuto da lei", cast: [                                // Eleazar, o sacerdote: "Este é o estatuto da lei"
        C("servo", -60, "raise", { glow: 0.2, dy: 0.5, facing: 1, id: "eleazar" }),
        C("cavaleiro", 90, "stand", { dy: 0.5, facing: -1, id: "guerreiro" }),
      ] }),
      b(22, { by: "servo" }),
      b(23, { by: "servo", q: "fareis passar pelo fogo", env: { fire: 0.5 } }),                  // o que resiste ao fogo passa pelo fogo; o resto, pela água
      b(24, { by: "servo" }),
      b(25, { env: { glory: 0.66, night: 0.1, fire: 0 } }),                          // o Senhor fala a Moisés (soma da presa)
      dv(26),
      b(27, { by: "deus", set: "despojo", props: DESPOJO, q: "divide a presa em duas metades", env: { glory: 0.62, verdure: 0.2 } }), // divide a presa em duas metades
      b(28, { by: "deus", q: "para o Senhor tomarás o tributo" }),                               // o tributo do Senhor: de cada quinhentos, uma alma
      dv(29), dv(30),
      b(31, { q: "como o Senhor ordenara a Moisés", cast: [                                      // Moisés e Eleazar fazem como o Senhor ordenara
        C("moises", -120, "stand", { dy: 0.5, facing: 1 }),
        C("servo", -50, "stand", { glow: 0.15, dy: 0.5, facing: 1, id: "eleazar" }),
      ] }),
      // v.32-47 — A SOMA e a REPARTIÇÃO: cada versículo conta uma parcela da presa.
      b(32, { set: "curral", props: CURRAL, env: { terrain: "field", glory: 0.6, night: 0.1, verdure: 0.4 }, cast: [ // seiscentas e setenta e cinco mil OVELHAS
        C("servo", -250, "write", { glow: 0.15, dy: 0.5, facing: 1, id: "eleazar" }),
        C("rebanho", 90, "stand", { dy: 0.56, id: "ovelhas-da-presa" }),
        C("rebanho", 200, "stand", { scale: 0.9, dy: 0.46, id: "ovelhas-da-presa2" }),
      ] }),
      b(33, { cast: [                                                                            // e setenta e dois mil BOIS
        C("servo", -250, "write", { glow: 0.15, dy: 0.5, facing: 1, id: "eleazar" }),
        C("rebanho", -30, "stand", { scale: 1.15, dy: 0.62, id: "bois-da-presa" }),
        C("pastor", 150, "stand", { dy: 0.5, facing: -1, id: "contador-do-gado" }),
      ] }),
      b(34, { set: "fardos", props: FARDOS, env: { verdure: 0.28, glory: 0.58 }, cast: [         // e sessenta e um mil JUMENTOS
        C("rebanho", 20, "walk", { dy: 0.58, id: "jumentos-da-presa" }),
        C("pastor", -230, "walk", { dy: 0.48, facing: 1, id: "contador-do-gado" }),
      ] }),
      b(35, { set: "cativas", props: CATIVAS, env: { glory: 0.44, night: 0.18, verdure: 0.24 }, cast: [ // e das mulheres, trinta e duas mil almas
        C("mulherComum", -30, "stand", { dy: 0.54, facing: -1, id: "cativa-de-midia" }),
        C("mulherComum", 60, "kneel", { scale: 0.95, dy: 0.5, facing: -1, id: "cativa-de-midia2" }),
        C("mulherComum", 145, "stand", { scale: 0.9, dy: 0.46, facing: -1, id: "cativa-de-midia3" }),
      ] }),
      b(36, { set: "metade-guerra", props: CURRAL, env: { glory: 0.56, night: 0.12, verdure: 0.36 }, cast: [ // a METADE dos que saíram à guerra: 337.500 ovelhas
        C("cavaleiro", -230, "stand", { dy: 0.5, facing: 1, id: "guerreiro" }),
        C("cavaleiro", -150, "stand", { scale: 0.94, dy: 0.46, facing: 1, id: "guerreiro2" }),
        C("rebanho", 110, "stand", { dy: 0.56, id: "ovelhas-da-presa" }),
      ] }),
      b(37, { set: "tributo", props: TRIBUTO, env: { glory: 0.7, night: 0.08, verdure: 0.3, fire: 0.25 }, cast: [ // o TRIBUTO do Senhor: das ovelhas, seiscentas e setenta e cinco
        C("servo", -180, "raise", { glow: 0.25, dy: 0.5, facing: -1, id: "eleazar" }),
        C("rebanho", 190, "stand", { scale: 0.85, dy: 0.62, id: "ovelhas-do-tributo" }),
      ] }),
      b(38, { cast: [                                                                            // trinta e seis mil bois; setenta e dois de tributo
        C("servo", -180, "stand", { glow: 0.25, dy: 0.5, facing: -1, id: "eleazar" }),
        C("rebanho", 190, "stand", { scale: 1.05, dy: 0.66, id: "bois-do-tributo" }),
        C("cavaleiro", 100, "bow", { dy: 0.48, facing: -1, id: "guerreiro" }),
      ] }),
      b(39, { props: [...TRIBUTO, P("crate", 300, 0.85, undefined, 0.66)], cast: [               // trinta mil e quinhentos jumentos; sessenta e um de tributo
        C("servo", -180, "stand", { glow: 0.25, dy: 0.5, facing: -1, id: "eleazar" }),
        C("rebanho", 200, "walk", { dy: 0.58, id: "jumentos-do-tributo" }),
      ] }),
      b(40, { props: TRIBUTO, cast: [                                                            // dezesseis mil pessoas; trinta e duas ao Senhor
        C("servo", -180, "stand", { glow: 0.25, dy: 0.5, facing: -1, id: "eleazar" }),
        C("mulherComum", 120, "stand", { dy: 0.54, facing: -1, id: "cativa-de-midia" }),
        C("mulherComum", 210, "stand", { scale: 0.92, dy: 0.48, facing: -1, id: "cativa-de-midia2" }),
      ] }),
      b(41, { env: { glory: 0.74 }, cast: [           // Moisés ENTREGA a Eleazar o tributo da oferta alçada
        C("moises", -260, "point", { dy: 0.5, facing: 1 }),
        C("servo", -120, "raise", { glow: 0.3, dy: 0.5, facing: -1, id: "eleazar" }),
        C("rebanho", 170, "stand", { scale: 0.85, dy: 0.6, id: "ovelhas-do-tributo" }),
      ] }),
      b(42, { set: "metade-povo", props: CURRAL, env: { glory: 0.6, night: 0.1, verdure: 0.4, fire: 0 }, cast: [ // a METADE dos filhos de Israel, separada da dos que pelejaram
        C("moises", -250, "stand", { dy: 0.5, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.44 }),
      ] }),
      b(43, { cast: [                                                                            // (da congregação: 337.500 ovelhas)
        C("rebanho", -40, "stand", { dy: 0.58, id: "ovelhas-da-congregacao" }),
        C("multidao", 180, "stand", { dy: 0.44 }),
      ] }),
      b(44, { cast: [                                                                            // e dos bois trinta e seis mil
        C("rebanho", 40, "stand", { scale: 1.15, dy: 0.64, id: "bois-da-congregacao" }),
        C("pastor", -190, "stand", { dy: 0.5, facing: 1, id: "contador-do-gado" }),
      ] }),
      b(45, { set: "fardos-povo", props: FARDOS, env: { verdure: 0.28 }, cast: [                 // e dos jumentos trinta mil e quinhentos
        C("rebanho", 30, "walk", { dy: 0.58, id: "jumentos-da-congregacao" }),
        C("pastor", 220, "point", { dy: 0.46, facing: -1, id: "contador-do-gado" }),
      ] }),
      b(46, { set: "cativas-povo", props: CATIVAS, env: { glory: 0.46, night: 0.16, verdure: 0.24 }, cast: [ // e das pessoas, dezesseis mil
        C("mulherComum", -20, "stand", { dy: 0.54, facing: -1, id: "cativa-de-midia" }),
        C("mulherComum", 90, "stand", { scale: 0.94, dy: 0.48, facing: -1, id: "cativa-de-midia2" }),
        C("moises", -250, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(47, { set: "levitas", props: TRIBUTO, env: { glory: 0.68, night: 0.1, verdure: 0.3 }, cast: [ // um de cada cinquenta, dado aos LEVITAS da guarda do tabernáculo
        C("moises", -300, "point", { dy: 0.5, facing: 1 }),
        C("servo", -170, "stand", { glow: 0.2, dy: 0.5, facing: -1, id: "levita-da-guarda" }),
        C("servo", -95, "stand", { scale: 0.94, dy: 0.46, facing: -1, id: "levita-da-guarda2" }),
        C("rebanho", 200, "stand", { scale: 0.85, dy: 0.62, id: "ovelhas-dos-levitas" }),
      ] }),
      b(48, { set: "oficiais", props: DESPOJO, env: { glory: 0.62, night: 0.1, verdure: 0.2 }, cast: [                                                                            // chegam os oficiais dos milhares e das centenas
        C("moises", -120, "stand", { dy: 0.5, facing: 1 }),
        C("homem", 70, "bow", { dy: 0.5, facing: -1, id: "oficial" }),
        C("homem", 150, "stand", { dy: 0.46, facing: -1, id: "oficial2" }),
      ] }),
      b(49, { by: "homem", q: "não falta nenhum de nós" }),                                      // "não falta nenhum de nós"
      b(50, { by: "homem", q: "para fazer expiação pelas nossas almas" }),                       // ofertam o ouro para expiação
      b(51, { q: "receberam deles o ouro", cast: [                                              // Moisés e Eleazar recebem o ouro
        C("moises", -120, "stand", { dy: 0.5, facing: 1 }),
        C("servo", -50, "stand", { glow: 0.2, dy: 0.5, facing: 1, id: "eleazar" }),
      ] }),
      b(52), b(53),
      b(54, { set: "memorial", props: MOABE, q: "por memorial para os filhos de Israel", env: { glory: 0.7, night: 0.1 }, cast: [ // o ouro à tenda, por memorial perante o Senhor
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
        C("servo", -80, "raise", { glow: 0.25, dy: 0.5, facing: 1, id: "eleazar" }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Nm 32
  32: {
    start: { terrain: "field", night: 0.1, glory: 0.6, storm: 0, fire: 0, verdure: 0.78 },
    beats: [
      b(1, { props: PASTAGEM, q: "gado em grande quantidade", env: { terrain: "field", glory: 0.62, night: 0.1, verdure: 0.82 }, cast: [ // Rúben e Gade: gado em grande quantidade em Jazer e Gileade
        C("homem", -140, "stand", { dy: 0.5, facing: 1, id: "gade" }),
        C("homem", -70, "stand", { dy: 0.48, facing: 1, id: "ruben" }),
        C("rebanho", 120, "stand", { dy: 0.56, id: "gado" }),
      ] }),
      b(2, { cast: [                                                                             // falam a Moisés e a Eleazar e aos chefes
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
        C("servo", -90, "stand", { glow: 0.15, dy: 0.5, facing: 1, id: "eleazar" }),
        C("homem", 90, "stand", { dy: 0.5, facing: -1, id: "gade" }),
      ] }),
      b(3),                                                                                      // Atarote, Dibom, Jazer, Nebo, Beom...
      b(4, { q: "é terra para gado", cast: [                                                    // "é terra para gado, e os teus servos têm gado"
        C("homem", -60, "point", { dy: 0.5, facing: -1, id: "gade" }),
        C("rebanho", 120, "stand", { dy: 0.56, id: "gado" }),
      ] }),
      b(5, { by: "homem", q: "não nos faças passar o Jordão", cast: [                            // "não nos faças passar o Jordão"
        C("homem", -60, "kneel", { dy: 0.5, facing: 1, id: "gade" }),
        C("homem", 10, "kneel", { dy: 0.48, facing: 1, id: "ruben" }),
        C("moises", -160, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(6, { by: "moises", q: "Irão vossos irmãos à peleja, e ficareis vós aqui?", cast: [       // Moisés repreende: "Irão vossos irmãos à peleja, e ficareis vós aqui?"
        C("moises", -120, "point", { dy: 0.5, facing: 1 }),
        C("homem", 80, "stand", { dy: 0.5, facing: -1, id: "gade" }),
      ] }),
      b(7, { by: "moises", q: "desencorajais o coração dos filhos de Israel" }),                 // "por que desencorajais o coração dos filhos de Israel?"
      b(8, { by: "moises" }),                                                                    // assim fizeram vossos pais em Cades-Barnéia
      b(9, { by: "moises", q: "vale de Escol" }),                                                // no vale de Escol desanimaram o povo
      b(10, { by: "moises" }),
      b(11, { by: "moises" }),
      b(12, { by: "moises" }),                                                                   // exceto Calebe e Josué
      b(13, { by: "moises", q: "quarenta anos" }),                                               // errantes pelo deserto quarenta anos
      b(14, { by: "moises" }),
      b(15, { by: "moises" }),                                                                   // "destruireis a todo este povo"
      b(16, { by: "homem", q: "Edificaremos currais aqui para o nosso gado", cast: [             // eles: "Edificaremos currais para o gado e cidades para as crianças"
        C("homem", -60, "stand", { dy: 0.5, facing: 1, id: "gade" }),
        C("rebanho", 130, "stand", { dy: 0.56, id: "gado" }),
      ] }),
      b(17, { by: "homem", q: "nós nos armaremos", cast: [                                       // "nós nos armaremos, adiante dos de Israel"
        C("cavaleiro", -60, "stand", { dy: 0.5, facing: 1, id: "gade-armado" }),
        C("cavaleiro", 20, "stand", { dy: 0.46, facing: 1, id: "ruben-armado" }),
      ] }),
      b(18, { by: "homem", q: "Não voltaremos para nossas casas" }),                             // "Não voltaremos até Israel possuir a herança"
      b(19, { by: "homem" }),
      b(20, { by: "moises", q: "se vos armardes à guerra perante o Senhor", cast: [              // Moisés: "se vos armardes à guerra perante o Senhor"
        C("moises", -120, "point", { dy: 0.5, facing: 1 }),
        C("homem", 80, "stand", { dy: 0.5, facing: -1, id: "gade" }),
      ] }),
      b(21, { by: "moises" }),
      b(22, { by: "moises" }),                                                                   // então voltareis inculpáveis, e a terra vos será possessão
      b(23, { by: "moises", q: "o vosso pecado vos há de achar" }),                              // "sabei que o vosso pecado vos há de achar"
      b(24, { by: "moises", cast: [                                                              // "edificai cidades e currais; fazei o que saiu da vossa boca"
        C("moises", -120, "stand", { dy: 0.5, facing: 1 }),
        C("homem", 80, "stand", { dy: 0.5, facing: -1, id: "gade" }),
      ] }),
      b(25, { by: "homem", q: "assim farão teus servos" }),                                      // "como ordena meu senhor, assim farão teus servos"
      b(26, { by: "homem", cast: [                                                               // crianças, mulheres e gado ficarão nas cidades de Gileade
        C("homem", -60, "stand", { dy: 0.5, facing: 1, id: "gade" }),
        C("rebanho", 130, "stand", { dy: 0.56, id: "gado" }),
      ] }),
      b(27, { by: "homem", q: "cada um armado para a guerra", cast: [                            // "os teus servos passarão armados para a guerra"
        C("cavaleiro", -60, "stand", { dy: 0.5, facing: 1, id: "gade-armado" }),
        C("cavaleiro", 20, "stand", { dy: 0.46, facing: 1, id: "ruben-armado" }),
      ] }),
      b(28, { cast: [                                                                            // Moisés dá ordem a Eleazar, a Josué e aos cabeças
        C("moises", -140, "point", { dy: 0.5, facing: 1 }),
        C("servo", -70, "stand", { glow: 0.15, dy: 0.5, facing: 1, id: "eleazar" }),
        C("servo", 10, "stand", { dy: 0.5, facing: 1, id: "josue" }),
      ] }),
      b(29, { q: "E disse-lhes Moisés:", by: "moises" }),
      b(30, { by: "moises" }),
      b(31, { by: "homem", q: "isso faremos" }),                                                 // "o que o Senhor falou a teus servos, isso faremos"
      b(32, { by: "homem" }),                                                                    // "nós passaremos armados perante o Senhor"
      b(33, { set: "cidades", props: CIDADES, q: "à meia tribo de Manassés", env: { terrain: "field", glory: 0.6, verdure: 0.8 }, cast: [ // Moisés dá a terra a Gade, Rúben e à meia tribo de Manassés
        C("moises", -140, "stand", { dy: 0.5, facing: 1 }),
        C("homem", 80, "stand", { dy: 0.5, facing: -1, id: "gade" }),
        C("homem", 150, "stand", { dy: 0.46, facing: -1, id: "manasses" }),
      ] }),
      b(34, { cast: [                                                                            // os filhos de Gade edificam Dibom, Atarote, Aroer
        C("homem", -40, "stand", { dy: 0.5, facing: -1, id: "gade" }),
      ] }),
      b(35), b(36),                                                                              // cidades fortes e currais de ovelhas
      b(37, { cast: [                                                                            // os filhos de Rúben edificam Hesbom, Eleale, Quiriataim
        C("homem", -40, "stand", { dy: 0.5, facing: -1, id: "ruben" }),
      ] }),
      b(38),
      b(39, { q: "expulsaram os amorreus", cast: [                                              // Maquir vai a Gileade e a toma
        C("homem", -40, "walk", { dy: 0.5, facing: 1, id: "maquir" }),
      ] }),
      b(40),                                                                                     // Moisés dá Gileade a Maquir
      b(41),                                                                                     // Jair toma as aldeias, Havote-Jair
      b(42),                                                                                     // Nobá toma Quenate
    ],
  },
};
