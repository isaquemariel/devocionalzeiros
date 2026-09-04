// ============================================================================
// LEVÍTICO 3–4 — CENA VIVA. O sacrifício pacífico e a oferta pela expiação.
//
// Lev 3 — O SACRIFÍCIO PACÍFICO (de comunhão): macho ou fêmea sem defeito; a
// gordura e os rins queimados ao Senhor, "alimento da oferta queimada de
// cheiro suave". É a oferta da paz com Deus — e daí o estatuto perpétuo:
// "nenhuma gordura nem sangue algum comereis" (v.17).
//
// Lev 4 — A OFERTA PELO PECADO (expiação por ignorância): conforme quem peca —
// o sacerdote ungido (v.3-12), toda a congregação (v.13-21), um príncipe
// (v.22-26), a pessoa do povo (v.27-35). O sangue é levado à tenda e aspergido
// SETE VEZES diante do véu; o corpo do novilho é queimado FORA DO ARRAIAL. E a
// promessa que se repete: "e lhe será perdoado o pecado".
//
// A VOZ DE DEUS (regra do projeto): a instrução vem do alto (`by: "deus"`),
// da tenda, sem figura. Arão e seus filhos (`arao`/`servo`) ministram; quem
// traz a oferta é `homem` (o povo), `anciao` (a congregação) ou `rei` (o
// príncipe); o animal é `rebanho` (vacum) e `cordeiro` (miúdo/cabras).
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// O átrio do tabernáculo (mesmo palco de Lv 1-2): a tenda, o altar aceso, a pia.
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
];
// FORA DO ARRAIAL (Lev 4:12,21): o lugar limpo onde se lança a cinza e se
// queima o corpo do novilho — longe da tenda, uma fogueira solitária.
const FORA_ARRAIAL: StagePropSpec[] = [
  P("campfire", 20, 1.7, 1, 0.5),
  P("crate", 90, 0.8, undefined, 0.6),
  P("rock", -260, 1.05, undefined, 0.44),
  P("rock", 280, 1.0, undefined, 0.5),
  P("palm", -180, 0.9, undefined, 0.16),
  P("grass", -40, 0.78, undefined, 0.8),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Lev 3
  3: {
    start: { terrain: "desert", night: 0.1, glory: 0.7, storm: 0, fire: 0.6, verdure: 0.15 },
    beats: [
      b(1, { by: "deus", props: ATRIO, env: { terrain: "desert", glory: 0.78, fire: 0.6, night: 0.08 }, cast: [ // sacrifício pacífico: gado macho ou fêmea sem defeito
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
        C("homem", -60, "stand", { dy: 0.54, facing: 1, id: "ofertante" }),
        C("rebanho", 150, "stand", { dy: 0.4, id: "vacum" }),
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(2, { by: "deus", q: "E porá a sua mão sobre a cabeça da sua oferta", cast: [ // a mão sobre a cabeça; o sangue no altar em redor
        C("homem", 92, "point", { dy: 0.46, facing: 1, id: "ofertante" }),
        C("rebanho", 150, "stand", { dy: 0.4, id: "vacum" }),
        C("arao", 44, "kneel", { dy: 0.5, facing: -1 }),
      ] }),
      b(3, { by: "deus" }),                                                        // a gordura que cobre a fressura, queimada ao Senhor
      b(4, { by: "deus" }),                                                        // os rins, a gordura junto aos lombos e o redenho do fígado
      b(5, { by: "deus", q: "de cheiro suave ao Senhor", env: { fire: 0.85, glory: 0.82 }, cast: [ // queimado sobre o holocausto: cheiro suave ao Senhor
        C("arao", 46, "raise", { dy: 0.5, facing: -1 }),
      ] }),
      b(6, { by: "deus", env: { fire: 0.65 }, cast: [                              // gado miúdo por pacífico: macho ou fêmea sem defeito
        C("homem", -60, "stand", { dy: 0.54, facing: 1, id: "ofertante" }),
        C("cordeiro", 140, "stand", { dy: 0.44, scale: 0.7, id: "cordeiro-of" }),
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(7, { by: "deus" }),                                                        // se oferecer um cordeiro, perante o Senhor
      b(8, { by: "deus", q: "E porá a sua mão sobre a cabeça da sua oferta", cast: [ // a mão sobre a cabeça; o sangue no altar em redor
        C("homem", 92, "point", { dy: 0.46, facing: 1, id: "ofertante" }),
        C("cordeiro", 140, "stand", { dy: 0.44, scale: 0.7, id: "cordeiro-of" }),
        C("arao", 44, "kneel", { dy: 0.5, facing: -1 }),
      ] }),
      b(9, { by: "deus" }),                                                        // a gordura e a cauda toda, tirada do espinhaço
      b(10, { by: "deus" }),                                                       // ambos os rins e a gordura junto aos lombos
      b(11, { by: "deus", q: "alimento é da oferta queimada ao Senhor", env: { fire: 0.82 }, cast: [ // o sacerdote o queima: alimento da oferta ao Senhor
        C("arao", 46, "raise", { dy: 0.5, facing: -1 }),
      ] }),
      b(12, { by: "deus", cast: [                                                  // se a oferta for uma cabra, perante o Senhor
        C("homem", -60, "stand", { dy: 0.54, facing: 1, id: "ofertante" }),
        C("cordeiro", 140, "stand", { dy: 0.44, scale: 0.72, id: "cabra" }),
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(13, { by: "deus" }),                                                       // a mão sobre a cabeça; o sangue no altar em redor
      b(14, { by: "deus" }),                                                       // a gordura que cobre a fressura, por oferta queimada
      b(15, { by: "deus" }),                                                       // os rins e o redenho do fígado, tirados
      b(16, { by: "deus", q: "Toda a gordura será do Senhor", env: { fire: 0.82, glory: 0.82 }, cast: [ // queimado: toda a gordura é do Senhor
        C("arao", 46, "raise", { dy: 0.5, facing: -1 }),
      ] }),
      b(17, { by: "deus", q: "Estatuto perpétuo é", env: { glory: 0.85 }, cast: [  // estatuto perpétuo: nenhuma gordura nem sangue comereis
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Lev 4
  // A expiação pelo pecado por ignorância, do sacerdote ao povo — o sangue
  // aspergido sete vezes diante do véu, o corpo queimado fora do arraial, e o
  // perdão. Env: a glória constante; a queima fora do arraial em night maior.
  4: {
    start: { terrain: "desert", night: 0.12, glory: 0.68, storm: 0, fire: 0.55, verdure: 0.15 },
    beats: [
      b(1, { by: "deus", props: ATRIO, env: { terrain: "desert", glory: 0.72, fire: 0.55, night: 0.1 }, cast: [ // falou mais o Senhor a Moisés
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(2, { by: "deus", q: "Quando uma alma pecar, por ignorância" }),            // quando uma alma pecar por ignorância
      b(3, { by: "deus", cast: [                                                   // o SACERDOTE ungido que peca: um novilho por expiação
        C("arao", 20, "stand", { glow: 0.2, dy: 0.52, facing: 1 }),
        C("rebanho", 150, "stand", { dy: 0.4, id: "novilho" }),
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(4, { by: "deus", cast: [                                                   // o novilho à porta; a mão sobre a cabeça; degolado
        C("arao", 60, "point", { glow: 0.2, dy: 0.5, facing: -1 }),
        C("rebanho", 150, "stand", { dy: 0.4, id: "novilho" }),
      ] }),
      b(5, { by: "deus", cast: [                                                   // o sacerdote toma do sangue e o leva à tenda
        C("arao", -20, "walk", { glow: 0.2, dy: 0.5, facing: 1 }),
      ] }),
      b(6, { by: "deus", q: "espargirá sete vezes perante o Senhor", env: { glory: 0.8 }, cast: [ // molha o dedo e asperge SETE VEZES diante do véu
        C("arao", -40, "raise", { glow: 0.25, dy: 0.5, facing: 1 }),
      ] }),
      b(7, { by: "deus", env: { fire: 0.5 } }),                                    // sangue nas pontas do altar do incenso; o resto à base do altar
      b(8, { by: "deus" }),                                                        // tira toda a gordura do novilho da expiação
      b(9, { by: "deus" }),                                                        // os dois rins e o redenho do fígado
      b(10, { by: "deus", env: { fire: 0.7 }, cast: [                              // queimados sobre o altar do holocausto
        C("arao", 46, "kneel", { dy: 0.5, facing: -1 }),
      ] }),
      b(11, { by: "deus" }),                                                       // o couro, a carne, a cabeça, as pernas e as entranhas
      b(12, { by: "deus", set: "fora", props: FORA_ARRAIAL, env: { terrain: "desert", night: 0.4, glory: 0.62, fire: 0.8, storm: 0.1 }, cast: [ // o novilho todo levado FORA do arraial e queimado
        C("arao", -30, "stand", { dy: 0.5, facing: 1 }),
        C("servo", 60, "kneel", { dy: 0.52, facing: -1, id: "sacerdote2" }),
      ] }),
      b(13, { by: "deus", set: "atrio", props: ATRIO, env: { terrain: "desert", night: 0.12, glory: 0.7, fire: 0.55 }, cast: [ // se TODA a congregação pecar por ignorância
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "stand", { dy: 0.44 }),
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(14, { by: "deus", cast: [                                                  // conhecido o pecado: a congregação traz um novilho
        C("multidao", 120, "stand", { dy: 0.44 }),
        C("rebanho", 180, "stand", { dy: 0.38, id: "novilho2" }),
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(15, { by: "deus", cast: [                                                  // os ANCIÃOS põem as mãos sobre a cabeça do novilho
        C("anciao", 70, "point", { dy: 0.5, facing: -1 }),
        C("anciao", 120, "bow", { dy: 0.46, facing: -1, id: "anciao2" }),
        C("rebanho", 180, "stand", { dy: 0.38, id: "novilho2" }),
      ] }),
      b(16, { by: "deus", cast: [ C("arao", -20, "walk", { glow: 0.2, dy: 0.5, facing: 1 }) ] }), // o sacerdote leva do sangue à tenda
      b(17, { by: "deus", q: "o espargirá sete vezes perante o Senhor", env: { glory: 0.8 }, cast: [ // asperge sete vezes diante do véu
        C("arao", -40, "raise", { glow: 0.25, dy: 0.5, facing: 1 }),
      ] }),
      b(18, { by: "deus", env: { fire: 0.5 } }),                                   // sangue nas pontas do altar; o resto à base do holocausto
      b(19, { by: "deus", env: { fire: 0.7 } }),                                   // tira toda a gordura e a queima sobre o altar
      b(20, { by: "deus", q: "e lhes será perdoado o pecado", env: { glory: 0.85 }, cast: [ // faz propiciação: e lhes será PERDOADO o pecado
        C("arao", 46, "raise", { dy: 0.5, facing: -1 }),
        C("multidao", 120, "bow", { dy: 0.44 }),
      ] }),
      b(21, { by: "deus", set: "fora", props: FORA_ARRAIAL, env: { terrain: "desert", night: 0.4, glory: 0.62, fire: 0.8 }, cast: [ // o novilho queimado fora do arraial: expiação da congregação
        C("arao", -30, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(22, { by: "deus", set: "atrio", props: ATRIO, env: { terrain: "desert", night: 0.12, glory: 0.7, fire: 0.55 }, cast: [ // quando um PRÍNCIPE pecar por ignorância
        C("rei", -60, "stand", { dy: 0.54, facing: 1, id: "principe" }),
        C("cordeiro", 150, "stand", { dy: 0.42, scale: 0.75, id: "bode" }),
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(23, { by: "deus" }),                                                       // notificado o pecado, traz um bode macho sem defeito
      b(24, { by: "deus", q: "expiação do pecado é", cast: [                       // a mão sobre a cabeça do bode; degolado: expiação
        C("rei", -20, "point", { dy: 0.52, facing: 1, id: "principe" }),
        C("cordeiro", 130, "stand", { dy: 0.42, scale: 0.75, id: "bode" }),
        C("arao", 44, "kneel", { dy: 0.5, facing: -1 }),
      ] }),
      b(25, { by: "deus", env: { fire: 0.6 } }),                                   // o sangue nas pontas do altar; o resto à base
      b(26, { by: "deus", q: "e lhe será perdoado", env: { fire: 0.75, glory: 0.82 }, cast: [ // a gordura queimada; expiação: e lhe será perdoado
        C("arao", 46, "raise", { dy: 0.5, facing: -1 }),
        C("rei", -40, "bow", { dy: 0.54, facing: 1, id: "principe" }),
      ] }),
      b(27, { by: "deus", cast: [                                                  // se qualquer PESSOA do povo pecar por ignorância
        C("homem", -60, "stand", { dy: 0.54, facing: 1, id: "ofertante" }),
        C("cordeiro", 150, "stand", { dy: 0.42, scale: 0.7, id: "cabra" }),
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(28, { by: "deus" }),                                                       // notificado o pecado, traz uma cabra sem defeito
      b(29, { by: "deus", cast: [                                                  // a mão sobre a cabeça da oferta; degolada no lugar do holocausto
        C("homem", -20, "point", { dy: 0.54, facing: 1, id: "ofertante" }),
        C("cordeiro", 130, "stand", { dy: 0.42, scale: 0.7, id: "cabra" }),
        C("arao", 44, "kneel", { dy: 0.5, facing: -1 }),
      ] }),
      b(30, { by: "deus", env: { fire: 0.6 } }),                                   // o sangue nas pontas do altar; o resto à base
      b(31, { by: "deus", q: "e ser-lhe-á perdoado o pecado", env: { fire: 0.75, glory: 0.82 }, cast: [ // a gordura queimada, cheiro suave: perdoado o pecado
        C("arao", 46, "raise", { dy: 0.5, facing: -1 }),
        C("homem", -40, "bow", { dy: 0.54, facing: 1, id: "ofertante" }),
      ] }),
      b(32, { by: "deus", cast: [                                                  // se trouxer uma cordeira para expiação, sem defeito
        C("homem", -60, "stand", { dy: 0.54, facing: 1, id: "ofertante" }),
        C("cordeiro", 150, "stand", { dy: 0.42, scale: 0.68, id: "cordeira" }),
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(33, { by: "deus", cast: [                                                  // a mão sobre a cabeça; degolada por oferta pelo pecado
        C("homem", -20, "point", { dy: 0.54, facing: 1, id: "ofertante" }),
        C("cordeiro", 130, "stand", { dy: 0.42, scale: 0.68, id: "cordeira" }),
        C("arao", 44, "kneel", { dy: 0.5, facing: -1 }),
      ] }),
      b(34, { by: "deus", env: { fire: 0.6 } }),                                   // o sangue nas pontas do altar; o resto à base
      b(35, { by: "deus", q: "e ele será perdoado", env: { fire: 0.78, glory: 0.85 }, cast: [ // queimada sobre as ofertas: expiação, e ele será perdoado
        C("arao", 46, "raise", { dy: 0.5, facing: -1 }),
        C("homem", -40, "bow", { dy: 0.54, facing: 1, id: "ofertante" }),
      ] }),
    ],
  },
};
