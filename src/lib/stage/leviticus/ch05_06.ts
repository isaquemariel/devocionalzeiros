// ============================================================================
// LEVÍTICO 5–6 — CENA VIVA. A oferta pela culpa e as leis das ofertas.
//
// Lev 5 — A OFERTA PELA CULPA: a culpa por silêncio, por contato imundo, por
// juramento temerário; a graça de Deus escalona a oferta à posse — cordeira,
// duas aves, ou a décima de um efa de farinha —, para que ninguém fique sem
// expiação. "Confessará aquilo em que pecou" (v.5), "e ele será perdoado".
//
// Lev 6 — RESTITUIÇÃO E AS LEIS DAS OFERTAS: quem lesa o próximo restitui e
// acrescenta o quinto; e vêm as leis do serviço — sobretudo O FOGO PERPÉTUO:
// "O fogo arderá continuamente sobre o altar; não se apagará" (v.13). Os
// sacerdotes comem a porção santa no pátio, "coisa santíssima".
//
// A VOZ DE DEUS (regra do projeto): tudo é instrução do alto (`by: "deus"`),
// da tenda, sem figura. Arão e seus filhos (`arao`/`servo`) ministram e comem
// a porção santa; o culpado que traz a oferta é `homem`.
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

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Lev 5
  5: {
    start: { terrain: "desert", night: 0.1, glory: 0.68, storm: 0, fire: 0.55, verdure: 0.15 },
    beats: [
      b(1, { by: "deus", props: ATRIO, env: { terrain: "desert", glory: 0.7, fire: 0.55, night: 0.1 }, cast: [ // culpa por calar o que se viu ou soube
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
        C("homem", -50, "stand", { dy: 0.54, facing: 1, id: "culpado" }),
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(2, { by: "deus" }),                                                        // tocar coisa imunda: será imundo e culpado
      b(3, { by: "deus" }),                                                        // tocar a imundícia de um homem, e depois sabê-lo
      b(4, { by: "deus" }),                                                        // jurar temerariamente com os lábios: culpado
      b(5, { by: "deus", q: "confessará aquilo em que pecou", cast: [              // culpado, CONFESSARÁ aquilo em que pecou
        C("homem", -30, "bow", { dy: 0.54, facing: 1, id: "culpado" }),
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(6, { by: "deus", cast: [                                                   // traz a expiação: uma cordeira ou cabrinha
        C("homem", -50, "stand", { dy: 0.54, facing: 1, id: "culpado" }),
        C("cordeiro", 150, "stand", { dy: 0.42, scale: 0.68, id: "cordeira" }),
        C("arao", 44, "kneel", { dy: 0.5, facing: -1 }),
      ] }),
      b(7, { by: "deus", props: [...ATRIO, { kind: "birds", dx: 120, scale: 1, dy: 0.4, sky: true }], cast: [ // se não puder o gado miúdo: duas rolas ou pombinhos
        C("homem", -50, "stand", { dy: 0.54, facing: 1, id: "culpado" }),
        C("arao", 44, "stand", { dy: 0.5, facing: -1 }),
      ] }),
      b(8, { by: "deus" }),                                                        // uma ave para expiação, a outra para holocausto
      b(9, { by: "deus", env: { fire: 0.6 } }),                                    // o sangue na parede do altar; o resto à base
      b(10, { by: "deus", q: "e ele será perdoado", env: { fire: 0.72, glory: 0.8 }, cast: [ // holocausto da outra ave; expiação: e ele será perdoado
        C("arao", 46, "raise", { dy: 0.5, facing: -1 }),
        C("homem", -40, "bow", { dy: 0.54, facing: 1, id: "culpado" }),
      ] }),
      b(11, { by: "deus", props: [...ATRIO, { ...P("sheaf", -108, 0.95, undefined, 0.52), tag: "oferta-alimentos" }], cast: [ // se nem as aves: a décima de um efa de flor de farinha
        C("homem", -50, "kneel", { dy: 0.54, facing: 1, id: "culpado" }),
        C("arao", 44, "stand", { dy: 0.5, facing: -1 }),
      ] }),
      b(12, { by: "deus", env: { fire: 0.68 }, cast: [                             // o punhado do memorial queimado sobre o altar
        C("arao", 46, "raise", { dy: 0.5, facing: -1 }),
      ] }),
      b(13, { by: "deus", q: "e lhe será perdoado", env: { glory: 0.8 } }),        // expiação: e lhe será perdoado; o resto é do sacerdote
      b(14, { by: "deus", props: ATRIO, env: { fire: 0.55 } }),                    // falou o Senhor a Moisés
      b(15, { by: "deus", cast: [                                                  // transgressão nas coisas sagradas: um carneiro sem defeito
        C("homem", -50, "stand", { dy: 0.54, facing: 1, id: "culpado" }),
        C("rebanho", 150, "stand", { dy: 0.4, scale: 0.9, id: "carneiro" }),
        C("arao", 44, "stand", { dy: 0.5, facing: -1 }),
      ] }),
      b(16, { by: "deus", q: "ser-lhe-á perdoado o pecado", env: { glory: 0.8 } }), // restitui e acrescenta o quinto; e será perdoado
      b(17, { by: "deus" }),                                                       // pecar sem saber: ainda assim culpada, leva a iniquidade
      b(18, { by: "deus", cast: [                                                  // traz um carneiro sem defeito para expiação da culpa
        C("homem", -40, "bow", { dy: 0.54, facing: 1, id: "culpado" }),
        C("arao", 46, "raise", { dy: 0.5, facing: -1 }),
      ] }),
      b(19, { by: "deus", q: "Expiação de culpa é", env: { glory: 0.8 } }),        // expiação de culpa é: fez-se culpado diante do Senhor
    ],
  },

  // ------------------------------------------------------------------ Lev 6
  // A restituição ao próximo → as leis das ofertas → e O FOGO PERPÉTUO sobre o
  // altar, que arde de noite e de manhã e nunca se apaga. Env: o fogo do altar
  // como fio condutor, subindo alto nos versos do fogo contínuo (v.9-13).
  6: {
    start: { terrain: "desert", night: 0.1, glory: 0.68, storm: 0, fire: 0.6, verdure: 0.15 },
    beats: [
      b(1, { by: "deus", props: ATRIO, env: { terrain: "desert", glory: 0.7, fire: 0.6, night: 0.1 }, cast: [ // falou mais o Senhor a Moisés
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(2, { by: "deus", cast: [                                                   // pecar contra o próximo: negar o depósito, o roubo
        C("homem", -60, "stand", { dy: 0.54, facing: 1, id: "culpado" }),
        C("homem", 10, "stand", { dy: 0.5, facing: -1, id: "proximo" }),
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(3, { by: "deus" }),                                                        // achar o perdido e negar com falso juramento
      b(4, { by: "deus", q: "restituirá o que roubou" }),                          // culpado, RESTITUIRÁ o que roubou ou reteve
      b(5, { by: "deus", cast: [                                                   // restitui o todo e acrescenta o quinto, no dia da expiação
        C("homem", -40, "point", { dy: 0.54, facing: 1, id: "culpado" }),
        C("homem", 20, "stand", { dy: 0.5, facing: -1, id: "proximo" }),
      ] }),
      b(6, { by: "deus", cast: [                                                   // traz um carneiro sem defeito para expiação da culpa
        C("homem", -50, "bow", { dy: 0.54, facing: 1, id: "culpado" }),
        C("rebanho", 150, "stand", { dy: 0.4, scale: 0.9, id: "carneiro" }),
        C("arao", 44, "stand", { dy: 0.5, facing: -1 }),
      ] }),
      b(7, { by: "deus", q: "será perdoada", env: { glory: 0.8 } }),               // o sacerdote faz expiação: e será perdoada
      // v.8-13 — AS LEIS DO HOLOCAUSTO e o FOGO PERPÉTUO.
      b(8, { by: "deus", cast: [ C("moises", -150, "kneel", { dy: 0.5, facing: 1 }), C("arao", 40, "stand", { dy: 0.52, facing: -1 }) ] }), // falou mais o Senhor a Moisés
      b(9, { by: "deus", q: "o fogo do altar arderá nele", env: { fire: 0.7, night: 0.5, glory: 0.7 }, cast: [ // a lei do holocausto: arde toda a noite; o fogo arde nele
        C("arao", 46, "stand", { dy: 0.5, facing: -1 }),
      ] }),
      b(10, { by: "deus", env: { night: 0.35 }, cast: [                            // o sacerdote de linho levanta a cinza junto ao altar
        C("arao", 60, "kneel", { dy: 0.5, facing: -1 }),
      ] }),
      b(11, { by: "deus" }),                                                       // troca as vestes e leva a cinza fora do arraial
      b(12, { by: "deus", q: "não se apagará", env: { fire: 0.85, night: 0.2, glory: 0.78 }, cast: [ // acende lenha cada manhã; o fogo não se apaga
        C("arao", 46, "raise", { dy: 0.5, facing: -1 }),
      ] }),
      b(13, { by: "deus", q: "O fogo arderá continuamente sobre o altar", env: { fire: 0.95, glory: 0.85, night: 0.08 }, cast: [ // O FOGO ARDERÁ CONTINUAMENTE; não se apagará
        C("arao", 46, "raise", { dy: 0.5, facing: -1 }),
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      // v.14-18 — a lei da oferta de alimentos.
      b(14, { by: "deus", props: [...ATRIO, { ...P("sheaf", -108, 0.95, undefined, 0.52), tag: "oferta-alimentos" }], env: { fire: 0.6 }, cast: [ // a lei da oferta de alimentos, diante do altar
        C("arao", 46, "stand", { dy: 0.5, facing: -1 }),
        C("servo", 110, "stand", { dy: 0.48, facing: -1, id: "sacerdote2" }),
      ] }),
      b(15, { by: "deus", q: "por ser memorial ao Senhor", env: { fire: 0.7 } }),  // o punhado do memorial aceso, cheiro suave
      b(16, { by: "deus", cast: [                                                  // Arão e seus filhos comem o restante, ázimo, no lugar santo
        C("arao", 30, "stand", { dy: 0.5, facing: -1 }),
        C("servo", 90, "kneel", { dy: 0.5, facing: -1, id: "sacerdote2" }),
      ] }),
      b(17, { by: "deus", q: "coisa santíssima é" }),                              // não levedado; coisa santíssima, como as expiações
      b(18, { by: "deus", q: "todo o que as tocar será santo", env: { glory: 0.82 } }), // estatuto perpétuo; todo o que as tocar será santo
      // v.19-23 — a oferta de Arão no dia da sua unção.
      b(19, { by: "deus", props: ATRIO, env: { fire: 0.6 }, cast: [ C("arao", 20, "stand", { glow: 0.2, dy: 0.52, facing: 1 }), C("moises", -150, "kneel", { dy: 0.5, facing: 1 }) ] }), // falou mais o Senhor a Moisés
      b(20, { by: "deus", cast: [                                                  // a oferta de Arão no dia da unção: a décima de um efa
        C("arao", 20, "stand", { glow: 0.2, dy: 0.52, facing: 1 }),
      ] }),
      b(21, { by: "deus", q: "em cheiro suave ao Senhor", env: { fire: 0.72 } }),  // cozida na caçoula com azeite; cheiro suave ao Senhor
      b(22, { by: "deus" }),                                                       // o sacerdote ungido em seu lugar fará o mesmo, por estatuto
      b(23, { by: "deus", q: "não se comerá", env: { fire: 0.75 } }),              // a oferta do sacerdote toda queimada; não se comerá
      // v.24-30 — a lei da expiação do pecado.
      b(24, { by: "deus", cast: [ C("arao", 30, "stand", { dy: 0.5, facing: -1 }), C("moises", -150, "kneel", { dy: 0.5, facing: 1 }) ] }), // falou mais o Senhor a Moisés
      b(25, { by: "deus", q: "coisa santíssima é", cast: [                         // a lei da expiação do pecado: no lugar do holocausto; santíssima
        C("arao", 46, "kneel", { dy: 0.5, facing: -1 }),
      ] }),
      b(26, { by: "deus" }),                                                       // o sacerdote que a oferece a come no lugar santo
      b(27, { by: "deus", q: "será santo" }),                                      // o que tocar a carne será santo; lavar-se-á o sangue
      b(28, { by: "deus" }),                                                       // o vaso de barro quebrado; o de cobre esfregado e lavado
      b(29, { by: "deus", q: "coisa santíssima é" }),                              // todo sacerdote a come; coisa santíssima
      b(30, { by: "deus", q: "no fogo será queimada", env: { fire: 0.82 }, cast: [ // a oferta cujo sangue entra no santuário: no fogo será queimada
        C("arao", 46, "raise", { dy: 0.5, facing: -1 }),
      ] }),
    ],
  },
};
