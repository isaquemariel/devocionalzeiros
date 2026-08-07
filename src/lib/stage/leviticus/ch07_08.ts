// ============================================================================
// LEVÍTICO 7–8 — CENA VIVA. As últimas leis das ofertas; a CONSAGRAÇÃO dos
// sacerdotes.
//
// Lev 7 — leis da expiação da culpa e do sacrifício PACÍFICO (ação de graças,
// voto, oferta voluntária); as porções dos sacerdotes (o peito movido e a
// espádua alçada); e a proibição perpétua da gordura e do sangue. Fecha com o
// resumo: "Esta é a lei do holocausto…" que o Senhor deu "no monte Sinai".
//
// Lev 8 — A CONSAGRAÇÃO (narrativa!): à porta da tenda, diante de toda a
// congregação, Moisés LAVA, VESTE e UNGE Arão e seus filhos; asperge o azeite
// sete vezes sobre o altar; oferece o novilho da expiação, o carneiro do
// holocausto e o CARNEIRO DA CONSAGRAÇÃO, cujo sangue vai à orelha, ao polegar
// da mão e ao do pé — homem consagrado a ouvir, agir e andar para Deus. Sete
// dias à porta da tenda. Aqui Moisés É O MEDIADOR VISÍVEL: as ações são dele
// (narração / `by: "moises"`), não voz do céu.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

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
// A CONSAGRAÇÃO (Lev 8): o átrio com o CESTO dos pães ázimos e o azeite da
// unção diante da tenda — o dia em que o sacerdócio é inaugurado.
const CONSAGRACAO: StagePropSpec[] = [
  { ...P("tent", -30, 1.45, undefined, 0.08), tag: "tabernaculo" },
  { ...P("altar", 80, 1.25, 0.7, 0.44), tag: "altar-holocausto" },
  { ...P("bowl", 170, 0.85, undefined, 0.56), tag: "pia-cobre" },
  { ...P("crate", -120, 0.85, undefined, 0.6), tag: "cesto-consagracao" },
  P("amphora", -150, 0.8, undefined, 0.7),
  P("tower", -300, 1.15, undefined, 0.06),
  P("palm", -250, 1.0, undefined, 0.16),
  P("grass", -60, 0.8, undefined, 0.82),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Lev 7
  7: {
    start: { terrain: "desert", night: 0.1, glory: 0.68, storm: 0, fire: 0.6, verdure: 0.15 },
    beats: [
      b(1, { by: "deus", q: "coisa santíssima é", props: ATRIO, env: { terrain: "desert", glory: 0.7, fire: 0.6, night: 0.1 }, cast: [ // a lei da expiação da culpa: coisa santíssima
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(2, { by: "deus", env: { fire: 0.62 } }),                                   // no lugar do holocausto; o sangue no altar em redor
      b(3, { by: "deus" }),                                                        // a gordura e a cauda oferecidas
      b(4, { by: "deus" }),                                                        // os rins e o redenho do fígado tirados
      b(5, { by: "deus", q: "expiação da culpa é", env: { fire: 0.75 }, cast: [    // o sacerdote os queima: expiação da culpa
        C("arao", 46, "raise", { dy: 0.5, facing: -1 }),
      ] }),
      b(6, { by: "deus", q: "coisa santíssima é" }),                               // todo varão dos sacerdotes a come no lugar santo
      b(7, { by: "deus" }),                                                        // uma mesma lei para a expiação do pecado e da culpa
      b(8, { by: "deus" }),                                                        // o couro do holocausto é do sacerdote que o oferece
      b(9, { by: "deus" }),                                                        // a oferta cozida é do sacerdote que a oferece
      b(10, { by: "deus", cast: [                                                  // as ofertas de farinha, de todos os filhos de Arão
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
        C("servo", 100, "stand", { dy: 0.48, facing: -1, id: "sacerdote2" }),
      ] }),
      b(11, { by: "deus" }),                                                       // e esta é a lei do sacrifício pacífico
      b(12, { by: "deus", props: [...ATRIO, { ...P("sheaf", -108, 0.95, undefined, 0.52), tag: "oferta-alimentos" }] }), // ação de graças: bolos ázimos amassados com azeite
      b(13, { by: "deus" }),                                                       // com pão levedado, na oferta de ação de graças
      b(14, { by: "deus" }),                                                       // uma parte por oferta alçada, do sacerdote que asperge
      b(15, { by: "deus", q: "nada se deixará dela até à manhã" }),                // a carne comida no mesmo dia; nada até à manhã
      b(16, { by: "deus" }),                                                       // voto ou oferta voluntária: come-se também no dia seguinte
      b(17, { by: "deus", env: { fire: 0.7 } }),                                   // o que ficar ao terceiro dia será queimado no fogo
      b(18, { by: "deus" }),                                                       // comido ao terceiro dia: não aceito, coisa abominável
      b(19, { by: "deus", env: { fire: 0.68 } }),                                  // a carne que tocar coisa imunda, queimada no fogo
      b(20, { by: "deus" }),                                                       // quem comer imundo será extirpado do seu povo
      b(21, { by: "deus" }),                                                       // tocar imundícia e comer: extirpado do seu povo
      b(22, { by: "deus", props: ATRIO, cast: [ C("moises", -150, "kneel", { dy: 0.5, facing: 1 }) ] }), // falou o Senhor a Moisés
      b(23, { by: "deus", q: "Nenhuma gordura" }),                                 // nenhuma gordura de boi, carneiro ou cabra comereis
      b(24, { by: "deus" }),                                                       // a gordura de corpo morto para uso, não para comer
      b(25, { by: "deus" }),                                                       // quem comer a gordura da oferta: extirpado
      b(26, { by: "deus", q: "nenhum sangue comereis" }),                          // nenhum sangue comereis, de aves nem de gado
      b(27, { by: "deus" }),                                                       // toda pessoa que comer sangue: extirpada
      b(28, { by: "deus", cast: [ C("moises", -150, "kneel", { dy: 0.5, facing: 1 }), C("arao", 40, "stand", { dy: 0.52, facing: -1 }) ] }), // falou mais o Senhor a Moisés
      b(29, { by: "deus", cast: [                                                  // quem oferecer pacífico trará a sua oferta ao Senhor
        C("homem", -60, "stand", { dy: 0.54, facing: 1, id: "ofertante" }),
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(30, { by: "deus", q: "por oferta movida perante o Senhor", cast: [         // as próprias mãos trazem a gordura e o peito movido
        C("homem", -30, "raise", { dy: 0.54, facing: 1, id: "ofertante" }),
        C("arao", 46, "stand", { dy: 0.5, facing: -1 }),
      ] }),
      b(31, { by: "deus", env: { fire: 0.72 } }),                                  // a gordura queimada; o peito é de Arão e seus filhos
      b(32, { by: "deus" }),                                                       // a espádua direita dada ao sacerdote por oferta alçada
      b(33, { by: "deus" }),                                                       // ao que oferece o sangue e a gordura, a espádua direita
      b(34, { by: "deus", q: "por estatuto perpétuo", cast: [                      // o peito e a espádua dados a Arão por estatuto perpétuo
        C("arao", 40, "stand", { glow: 0.15, dy: 0.52, facing: -1 }),
        C("servo", 100, "stand", { dy: 0.48, facing: -1, id: "sacerdote2" }),
      ] }),
      b(35, { by: "deus" }),                                                       // a porção de Arão e seus filhos, desde a sua apresentação
      b(36, { by: "deus", q: "estatuto perpétuo é" }),                             // o que o Senhor ordenou no dia em que os ungiu
      b(37, { by: "deus", q: "Esta é a lei do holocausto", env: { glory: 0.78 } }), // o resumo: a lei do holocausto e de todas as ofertas
      b(38, { by: "deus", q: "no monte Sinai", env: { glory: 0.82 }, cast: [       // que o Senhor ordenou a Moisés no monte Sinai
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Lev 8
  // A CONSAGRAÇÃO DO SACERDÓCIO — narrativa. Moisés é o mediador VISÍVEL; a
  // glória sobe conforme Arão é ungido e o sacerdócio inaugurado. Arão ganha
  // glow crescente (o ungido do Senhor).
  8: {
    start: { terrain: "desert", night: 0.1, glory: 0.68, storm: 0, fire: 0.55, verdure: 0.15 },
    beats: [
      b(1, { by: "deus", props: CONSAGRACAO, env: { terrain: "desert", glory: 0.72, fire: 0.55, night: 0.1 }, cast: [ // falou mais o Senhor a Moisés
        C("moises", -140, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(2, { by: "deus", cast: [                                                   // "Toma Arão e seus filhos, as vestes, o azeite, o novilho…"
        C("moises", -120, "point", { dy: 0.5, facing: 1 }),
        C("arao", -20, "stand", { dy: 0.52, facing: 1 }),
        C("servo", 40, "stand", { dy: 0.5, facing: 1, id: "filho1" }),
      ] }),
      b(3, { by: "deus", q: "reúne toda a congregação" }),                         // "reúne toda a congregação à porta da tenda"
      b(4, { cast: [                                                               // Moisés faz assim; a congregação se reúne à porta
        C("moises", -120, "stand", { dy: 0.5, facing: 1 }),
        C("multidao", 140, "stand", { dy: 0.44 }),
        C("multidao", 220, "stand", { scale: 0.9, dy: 0.4, id: "povo2" }),
        C("arao", -30, "stand", { dy: 0.52, facing: 1 }),
      ] }),
      b(5, { by: "moises", q: "Isto é o que o Senhor ordenou", cast: [             // Moisés: "Isto é o que o Senhor ordenou que se fizesse"
        C("moises", -110, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.44 }),
        C("arao", -20, "stand", { dy: 0.52, facing: 1 }),
      ] }),
      b(6, { env: { glory: 0.74 }, cast: [                                         // Moisés faz chegar Arão e seus filhos e os LAVA com água
        C("moises", -60, "point", { dy: 0.5, facing: 1 }),
        C("arao", 20, "kneel", { dy: 0.52, facing: 1 }),
        C("servo", 70, "kneel", { dy: 0.5, facing: 1, id: "filho1" }),
      ] }),
      b(7, { cast: [                                                               // veste a túnica, o cinto, o manto, o éfode
        C("moises", -50, "stand", { dy: 0.5, facing: 1 }),
        C("arao", 20, "stand", { glow: 0.2, dy: 0.52, facing: -1 }),
      ] }),
      b(8, { cast: [                                                               // o peitoral com o Urim e o Tumim
        C("moises", -50, "point", { dy: 0.5, facing: 1 }),
        C("arao", 20, "stand", { glow: 0.25, dy: 0.52, facing: -1 }),
      ] }),
      b(9, { env: { glory: 0.8 }, cast: [                                          // a mitra, e a lâmina de ouro: a coroa da santidade
        C("moises", -50, "raise", { dy: 0.5, facing: 1 }),
        C("arao", 20, "stand", { glow: 0.35, dy: 0.52, facing: -1 }),
      ] }),
      b(10, { env: { glory: 0.82 }, cast: [                                        // Moisés unge o tabernáculo e tudo o que há nele
        C("moises", -60, "raise", { dy: 0.5, facing: 1 }),
        C("arao", 30, "stand", { glow: 0.35, dy: 0.52, facing: -1 }),
      ] }),
      b(11, { q: "espargiu sete vezes sobre o altar", env: { glory: 0.85, fire: 0.6 }, cast: [ // asperge o azeite SETE VEZES sobre o altar
        C("moises", 40, "raise", { dy: 0.5, facing: -1 }),
      ] }),
      b(12, { env: { glory: 0.9 }, cast: [                                         // derrama o azeite sobre a cabeça de Arão: unção
        C("moises", -40, "raise", { dy: 0.5, facing: 1 }),
        C("arao", 20, "kneel", { glow: 0.55, dy: 0.52, facing: -1 }),
      ] }),
      b(13, { env: { glory: 0.8 }, cast: [                                         // veste os filhos de Arão: túnicas, cintos, tiaras
        C("moises", -60, "point", { dy: 0.5, facing: 1 }),
        C("servo", 20, "stand", { glow: 0.2, dy: 0.5, facing: -1, id: "filho1" }),
        C("servo", 70, "stand", { glow: 0.2, dy: 0.48, facing: -1, id: "filho2" }),
        C("arao", -30, "stand", { glow: 0.5, dy: 0.52, facing: -1 }),
      ] }),
      b(14, { env: { glory: 0.75 }, cast: [                                        // o novilho da expiação: as mãos sobre a cabeça
        C("arao", -10, "point", { glow: 0.5, dy: 0.52, facing: 1 }),
        C("rebanho", 150, "stand", { dy: 0.4, id: "novilho" }),
        C("moises", -80, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(15, { q: "purificou o altar", env: { fire: 0.65, storm: 0.08 }, cast: [    // Moisés põe o sangue nas pontas do altar: PURIFICOU o altar
        C("moises", 46, "kneel", { dy: 0.5, facing: -1 }),
      ] }),
      b(16, { env: { fire: 0.75 }, cast: [ C("moises", 46, "raise", { dy: 0.5, facing: -1 }) ] }), // a gordura e os rins queimados sobre o altar
      b(17, { set: "fora", props: [P("campfire", 10, 1.6, 1, 0.5), P("rock", -260, 1, undefined, 0.44), P("rock", 280, 1, undefined, 0.5), P("palm", -180, 0.9, undefined, 0.16)], env: { terrain: "desert", night: 0.4, glory: 0.3, fire: 0.8 }, cast: [ // o novilho queimado FORA do arraial
        C("moises", -40, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(18, { set: "consagracao", props: CONSAGRACAO, env: { terrain: "desert", night: 0.1, glory: 0.78, fire: 0.6 }, cast: [ // o carneiro do holocausto: as mãos sobre a cabeça
        C("arao", -10, "point", { glow: 0.5, dy: 0.52, facing: 1 }),
        C("rebanho", 150, "stand", { dy: 0.4, scale: 0.9, id: "carneiro1" }),
        C("moises", -80, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(19, { env: { fire: 0.7, storm: 0.06 }, cast: [ C("moises", 46, "kneel", { dy: 0.5, facing: -1 }) ] }), // Moisés asperge o sangue sobre o altar em redor
      b(20, { env: { fire: 0.8 }, cast: [ C("moises", 46, "raise", { dy: 0.5, facing: -1 }) ] }), // parte o carneiro; queima a cabeça, os pedaços e a gordura
      b(21, { q: "holocausto de cheiro suave", env: { fire: 0.88, glory: 0.85 }, cast: [ // todo o carneiro queimado: holocausto de cheiro suave
        C("moises", 46, "raise", { dy: 0.5, facing: -1 }),
      ] }),
      b(22, { env: { glory: 0.8, fire: 0.6 }, cast: [                              // o CARNEIRO DA CONSAGRAÇÃO: as mãos sobre a cabeça
        C("arao", -10, "point", { glow: 0.5, dy: 0.52, facing: 1 }),
        C("servo", 40, "point", { glow: 0.2, dy: 0.5, facing: 1, id: "filho1" }),
        C("rebanho", 150, "stand", { dy: 0.4, scale: 0.9, id: "carneiro2" }),
        C("moises", -80, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(23, { q: "sobre a ponta da orelha direita", env: { glory: 0.85 }, cast: [  // o sangue na orelha, no polegar da mão e do pé de Arão
        C("moises", -30, "point", { dy: 0.5, facing: 1 }),
        C("arao", 20, "stand", { glow: 0.55, dy: 0.52, facing: -1 }),
      ] }),
      b(24, { env: { glory: 0.82 }, cast: [                                        // o mesmo sangue sobre os filhos; o resto no altar
        C("moises", -30, "point", { dy: 0.5, facing: 1 }),
        C("servo", 20, "stand", { glow: 0.25, dy: 0.5, facing: -1, id: "filho1" }),
        C("servo", 70, "stand", { glow: 0.25, dy: 0.48, facing: -1, id: "filho2" }),
      ] }),
      b(25, { cast: [ C("moises", 40, "kneel", { dy: 0.5, facing: -1 }) ] }),      // toma a gordura, a cauda, os rins e a espádua direita
      b(26, { props: [...CONSAGRACAO], cast: [                                     // do cesto: um bolo ázimo, um pão azeitado e um coscorão
        C("moises", -60, "point", { dy: 0.5, facing: 1 }),
        C("arao", 10, "stand", { glow: 0.5, dy: 0.52, facing: -1 }),
      ] }),
      b(27, { q: "por oferta movida perante o Senhor", env: { glory: 0.85 }, cast: [ // tudo nas mãos de Arão e dos filhos: oferta movida
        C("arao", 0, "raise", { glow: 0.55, dy: 0.52 }),
        C("servo", 50, "raise", { glow: 0.25, dy: 0.5, id: "filho1" }),
        C("moises", -80, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(28, { q: "por cheiro suave", env: { fire: 0.85, glory: 0.85 }, cast: [     // Moisés os queima sobre o altar: consagração, cheiro suave
        C("moises", 46, "raise", { dy: 0.5, facing: -1 }),
      ] }),
      b(29, { env: { glory: 0.82 }, cast: [                                        // Moisés move o peito: a sua porção do carneiro
        C("moises", -20, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      b(30, { q: "santificou a Arão e as suas vestes", env: { glory: 0.92 }, cast: [ // asperge o azeite e o sangue: santifica Arão e os filhos
        C("moises", -50, "raise", { dy: 0.5, facing: 1 }),
        C("arao", 10, "kneel", { glow: 0.6, dy: 0.52, facing: -1 }),
        C("servo", 60, "kneel", { glow: 0.3, dy: 0.5, facing: -1, id: "filho1" }),
      ] }),
      b(31, { by: "moises", q: "Cozei a carne", cast: [                            // Moisés: "Cozei a carne à porta e comei-a com o pão"
        C("moises", -50, "point", { dy: 0.5, facing: 1 }),
        C("arao", 10, "stand", { glow: 0.55, dy: 0.52, facing: -1 }),
        C("servo", 60, "stand", { glow: 0.3, dy: 0.5, facing: -1, id: "filho1" }),
      ] }),
      b(32, { by: "moises", env: { fire: 0.6 } }),                                 // o que sobejar da carne e do pão, queimareis com fogo
      b(33, { by: "moises", q: "por sete dias", cast: [                            // não saireis da porta por SETE DIAS da consagração
        C("moises", -50, "point", { dy: 0.5, facing: 1 }),
        C("arao", 10, "stand", { glow: 0.55, dy: 0.52, facing: -1 }),
      ] }),
      b(34, { by: "moises" }),                                                     // como se fez hoje, o Senhor ordenou, para expiação
      b(35, { by: "moises", q: "por sete dias", env: { glory: 0.85 }, cast: [      // ficareis dia e noite sete dias, para que não morrais
        C("moises", -60, "raise", { dy: 0.5, facing: 1 }),
        C("arao", 10, "stand", { glow: 0.55, dy: 0.52, facing: -1 }),
        C("servo", 60, "stand", { glow: 0.3, dy: 0.5, facing: -1, id: "filho1" }),
      ] }),
      b(36, { env: { glory: 0.88 }, cast: [                                        // Arão e seus filhos fizeram tudo o que o Senhor ordenou
        C("arao", 0, "stand", { glow: 0.6, dy: 0.52, facing: 1 }),
        C("servo", 50, "stand", { glow: 0.3, dy: 0.5, facing: 1, id: "filho1" }),
        C("servo", 96, "stand", { glow: 0.3, dy: 0.48, facing: 1, id: "filho2" }),
        C("moises", -100, "stand", { dy: 0.5, facing: 1 }),
      ] }),
    ],
  },
};
