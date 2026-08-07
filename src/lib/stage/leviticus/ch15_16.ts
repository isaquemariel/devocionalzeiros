// ============================================================================
// LEVÍTICO 15–16 — CENA VIVA. Os fluxos que contaminam; O DIA DA EXPIAÇÃO.
//
// Lev 15 — FLUXOS E IMUNDÍCIAS DO CORPO: com DECORO, o texto só se lê; a cena é
// o arraial e a água que lava. O fecho é o coração de tudo: "separareis os
// filhos de Israel das suas imundícias, para que não morram" — a santidade
// guardada no meio do povo.
//
// Lev 16 — O DIA DA EXPIAÇÃO (Yom Kippur), o dia mais santo do ano. Uma só vez
// no ano o sumo sacerdote, de linho branco, entra ATRÁS DO VÉU com a nuvem do
// incenso e o sangue, e o asperge SETE VEZES sobre o propiciatório. E os DOIS
// BODES: um morto pelo Senhor; sobre o outro — o BODE EMISSÁRIO — Arão confessa
// todos os pecados do povo e o envia VIVO ao deserto, "levando sobre si todas
// as iniquidades à terra solitária". O sangue e o que é levado para longe:
// duas metades de uma só redenção (Hb 9:7-12).
//
// A VOZ DE DEUS: em 15 e nos preceitos de 16, a lei vem do alto (`by: "deus"`).
// No rito de 16, Arão é o mediador VISÍVEL (ação/narração); Deus "aparece na
// nuvem sobre o propiciatório" — nuvem e glória, nunca figura.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const dv = (v: number) => b(v, { by: "deus" });

const ARRAIAL: StagePropSpec[] = [
  { ...P("tent", -40, 1.35, undefined, 0.1), tag: "tabernaculo" },
  P("tent", -260, 1.0, undefined, 0.2),
  P("tent", 250, 1.05, undefined, 0.18),
  P("well", 300, 1.0, undefined, 0.5),
  P("amphora", 150, 0.85, undefined, 0.6),
  P("palm", -300, 1.05, undefined, 0.14),
  P("grass", -60, 0.82, undefined, 0.82),
];
const ATRIO: StagePropSpec[] = [
  { ...P("tent", -30, 1.45, undefined, 0.08), tag: "tabernaculo" },
  { ...P("altar", 70, 1.25, 0.75, 0.44), tag: "altar-holocausto" },
  { ...P("bowl", 158, 0.85, undefined, 0.56), tag: "pia-cobre" },
  P("tower", -300, 1.15, undefined, 0.06),
  P("palm", -250, 1.0, undefined, 0.16),
  P("crate", -140, 0.8, undefined, 0.62),
  P("grass", -60, 0.8, undefined, 0.82),
];
// O LUGAR SANTÍSSIMO (Lev 16:12-15): atrás do véu, a ARCA e os querubins, e a
// NUVEM DO INCENSO cobrindo o propiciatório — a presença aparece na nuvem.
const SANTISSIMO: StagePropSpec[] = [
  { kind: "clouds", dx: 0, dy: 0.5, scale: 1.5, sky: true },        // a nuvem do incenso / a glória
  { ...P("ark", 0, 1.2, undefined, 0.42), tag: "arca-testemunho" },
  P("cherub", -64, 0.8, undefined, 0.34),
  P("cherub", 64, 0.8, undefined, 0.34),
  P("censer", -120, 0.9, 0.8, 0.6),
  P("lampstand", 200, 1.0, 1, 0.4),
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1.05, undefined, 0.52),
];
// O DESERTO DO BODE EMISSÁRIO (Lev 16:21-22): a terra solitária para onde o
// bode é enviado, levando sobre si os pecados.
const DESERTO_BODE: StagePropSpec[] = [
  P("rock", -280, 1.1, undefined, 0.42),
  P("rock", 300, 1.0, undefined, 0.5),
  P("rock", 60, 0.7, undefined, 0.72),
  P("palm", -200, 0.85, undefined, 0.14),
  P("bush", 150, 0.7, undefined, 0.4),
  P("grass", -40, 0.75, undefined, 0.8),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Lev 15
  15: {
    start: { terrain: "field", night: 0.1, glory: 0.58, storm: 0, fire: 0, verdure: 0.35 },
    beats: [
      b(1, { by: "deus", props: ARRAIAL, env: { terrain: "field", glory: 0.6, night: 0.1, verdure: 0.35 }, cast: [ // o Senhor fala a Moisés e a Arão
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
        C("arao", -100, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      dv(2), dv(3), dv(4), dv(5), dv(6), dv(7), dv(8), dv(9), dv(10),              // os fluxos do homem e o que se torna imundo
      dv(11), dv(12), dv(13), dv(14), dv(15), dv(16), dv(17), dv(18),             // o lavar-se com águas vivas; a purificação
      dv(19), dv(20), dv(21), dv(22), dv(23), dv(24), dv(25), dv(26), dv(27),     // os fluxos da mulher e a separação
      dv(28), dv(29), dv(30),                                                     // os dias da purificação e a oferta
      b(31, { by: "deus", q: "das suas imundícias", env: { glory: 0.72 }, cast: [ // "separareis os filhos de Israel das suas imundícias"
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("arao", -100, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      dv(32),
      b(33, { by: "deus", env: { glory: 0.66 } }),                                // e da mulher, e de todo o que padece do seu fluxo
    ],
  },

  // ------------------------------------------------------------------ Lev 16
  // O DIA DA EXPIAÇÃO. Arco de env: a solenidade (glória alta, night contido) →
  // a nuvem do incenso atrás do véu (glory 0.95) → o bode emissário na terra
  // solitária (desert, night maior, glória baixa) → o descanso final (glória
  // serena da purificação).
  16: {
    start: { terrain: "desert", night: 0.12, glory: 0.7, storm: 0, fire: 0.5, verdure: 0.15 },
    beats: [
      b(1, { by: "deus", props: ATRIO, env: { terrain: "desert", glory: 0.7, fire: 0.5, night: 0.14 }, cast: [ // o Senhor fala a Moisés, depois da morte dos filhos de Arão
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
        C("arao", -90, "kneel", { glow: 0.3, dy: 0.5, facing: 1 }),
      ] }),
      b(2, { by: "deus", q: "diante do propiciatório que está sobre a arca", env: { glory: 0.78 } }), // "não entre no santuário em todo o tempo… eu apareço na nuvem"
      b(3, { by: "deus", cast: [                                                  // com um novilho e um carneiro Arão entrará no santuário
        C("arao", -20, "stand", { glow: 0.35, dy: 0.52, facing: 1 }),
        C("rebanho", 150, "stand", { dy: 0.4, id: "novilho" }),
      ] }),
      b(4, { by: "deus", q: "vestes santas", cast: [                              // veste-se de linho santo, banhado na água
        C("arao", 0, "stand", { glow: 0.45, dy: 0.52, facing: 1 }),
      ] }),
      b(5, { by: "deus", cast: [                                                  // da congregação: DOIS BODES e um carneiro
        C("arao", -30, "stand", { glow: 0.45, dy: 0.52, facing: 1 }),
        C("cordeiro", 120, "stand", { dy: 0.46, scale: 0.72, id: "bode1" }),
        C("cordeiro", 170, "stand", { dy: 0.42, scale: 0.72, id: "bode2" }),
      ] }),
      b(6, { by: "deus", cast: [                                                  // Arão oferece o novilho: expiação por si e sua casa
        C("arao", -20, "point", { glow: 0.45, dy: 0.52, facing: 1 }),
        C("rebanho", 150, "stand", { dy: 0.4, id: "novilho" }),
      ] }),
      b(7, { cast: [                                                              // põe ambos os bodes perante o Senhor, à porta da tenda
        C("arao", -20, "stand", { glow: 0.45, dy: 0.52, facing: -1 }),
        C("cordeiro", 90, "stand", { dy: 0.5, scale: 0.72, id: "bode1" }),
        C("cordeiro", 140, "stand", { dy: 0.46, scale: 0.72, id: "bode2" }),
      ] }),
      b(8, { q: "uma pelo Senhor, e a outra pelo bode emissário", env: { glory: 0.8 }, cast: [ // Arão lança SORTES: uma pelo Senhor, outra pelo emissário
        C("arao", 0, "raise", { glow: 0.5, dy: 0.5, facing: -1 }),
        C("cordeiro", 90, "stand", { dy: 0.5, scale: 0.72, id: "bode1" }),
        C("cordeiro", 140, "stand", { dy: 0.46, scale: 0.72, id: "bode2" }),
      ] }),
      b(9, { cast: [                                                              // o bode da sorte do Senhor: oferecido por expiação
        C("arao", -10, "point", { glow: 0.5, dy: 0.5, facing: -1 }),
        C("cordeiro", 90, "stand", { dy: 0.5, scale: 0.72, id: "bode1" }),
      ] }),
      b(10, { q: "bode emissário", cast: [                                        // o bode emissário: apresentado vivo, para ser enviado ao deserto
        C("arao", -10, "point", { glow: 0.5, dy: 0.5, facing: 1 }),
        C("cordeiro", 130, "stand", { dy: 0.48, scale: 0.72, id: "bode2" }),
      ] }),
      b(11, { env: { fire: 0.6, storm: 0.06 }, cast: [                            // degola o novilho da sua expiação
        C("arao", 40, "kneel", { glow: 0.5, dy: 0.5, facing: -1 }),
        C("rebanho", 150, "stand", { dy: 0.4, id: "novilho" }),
      ] }),
      b(12, { set: "santissimo", props: SANTISSIMO, env: { terrain: "desert", night: 0.28, glory: 0.85, fire: 0.4 }, cast: [ // toma o incensário de brasas e o incenso, e entra no VÉU
        C("arao", -140, "walk", { glow: 0.55, dy: 0.5, facing: 1 }),
      ] }),
      b(13, { q: "a nuvem do incenso cobrirá o propiciatório", env: { glory: 0.95 }, cast: [ // a NUVEM DO INCENSO cobre o propiciatório, para que não morra
        C("arao", -70, "raise", { glow: 0.6, dy: 0.5, facing: 1 }),
      ] }),
      b(14, { q: "espargirá sete vezes do sangue com o seu dedo", env: { glory: 0.92 }, cast: [ // asperge o sangue do novilho SETE VEZES sobre o propiciatório
        C("arao", -50, "raise", { glow: 0.6, dy: 0.5, facing: 1 }),
      ] }),
      b(15, { q: "para dentro do véu", env: { glory: 0.9, storm: 0.05 }, cast: [   // degola o bode do povo e leva o sangue para dentro do véu
        C("arao", -50, "raise", { glow: 0.6, dy: 0.5, facing: 1 }),
      ] }),
      b(16, { q: "fará expiação pelo santuário", env: { glory: 0.88 }, cast: [     // faz expiação pelo santuário por causa das imundícias do povo
        C("arao", -40, "kneel", { glow: 0.6, dy: 0.5, facing: 1 }),
      ] }),
      b(17, { q: "nenhum homem estará na tenda", env: { glory: 0.85 } }),          // nenhum homem na tenda enquanto ele faz expiação
      b(18, { set: "atrio", props: ATRIO, env: { terrain: "desert", night: 0.14, glory: 0.82, fire: 0.6 }, cast: [ // sai ao altar e faz expiação por ele, com o sangue
        C("arao", 40, "kneel", { glow: 0.55, dy: 0.5, facing: -1 }),
      ] }),
      b(19, { q: "sete vezes", env: { glory: 0.85 }, cast: [                        // asperge o sangue sete vezes: purifica e santifica o altar
        C("arao", 46, "raise", { glow: 0.55, dy: 0.5, facing: -1 }),
      ] }),
      // v.20-22 — O BODE EMISSÁRIO enviado ao deserto com os pecados.
      b(20, { env: { glory: 0.8 }, cast: [                                         // acabada a expiação, faz chegar o bode VIVO
        C("arao", -20, "point", { glow: 0.55, dy: 0.5, facing: 1 }),
        C("cordeiro", 90, "stand", { dy: 0.5, scale: 0.74, id: "bode2" }),
      ] }),
      b(21, { q: "confessará todas as iniqüidades dos filhos de Israel", env: { glory: 0.78, night: 0.2 }, cast: [ // Arão põe as mãos e CONFESSA sobre ele todos os pecados
        C("arao", -30, "raise", { glow: 0.55, dy: 0.5, facing: 1 }),
        C("cordeiro", 40, "stand", { dy: 0.52, scale: 0.76, id: "bode2" }),
        C("homem", 110, "stand", { dy: 0.5, facing: -1, id: "designado" }),
      ] }),
      b(22, { q: "levará sobre si todas as iniqüidades deles", set: "deserto", props: DESERTO_BODE, env: { terrain: "desert", night: 0.34, glory: 0.35, verdure: 0.05 }, cast: [ // o bode LEVA os pecados à terra solitária, longe
        C("cordeiro", 120, "walk", { dy: 0.4, scale: 0.72, facing: 1, id: "bode2" }),
        C("homem", 60, "walk", { dy: 0.5, facing: 1, id: "designado" }),
      ] }),
      b(23, { set: "atrio", props: ATRIO, env: { terrain: "desert", night: 0.14, glory: 0.78, fire: 0.55 }, cast: [ // Arão volta à tenda e despe as vestes de linho
        C("arao", -20, "stand", { glow: 0.5, dy: 0.52, facing: 1 }),
      ] }),
      b(24, { q: "fará expiação por si e pelo povo", env: { fire: 0.7, glory: 0.82 }, cast: [ // banha-se, veste-se e oferece os holocaustos por si e pelo povo
        C("arao", 40, "raise", { glow: 0.5, dy: 0.5, facing: -1 }),
      ] }),
      b(25, { by: "deus", env: { fire: 0.72 } }),                                  // queima a gordura da expiação sobre o altar
      b(26, { by: "deus" }),                                                       // quem levou o bode emissário lava-se e entra no arraial
      b(27, { set: "fora", props: [P("campfire", 10, 1.6, 1, 0.5), P("rock", -260, 1, undefined, 0.44), P("palm", -180, 0.9, undefined, 0.16)], env: { terrain: "desert", night: 0.4, glory: 0.3, fire: 0.8 }, cast: [ // o novilho e o bode queimados FORA do arraial
        C("homem", -30, "stand", { dy: 0.5, facing: 1, id: "designado" }),
      ] }),
      b(28, { by: "deus" }),                                                       // quem os queimou lava-se e depois entra no arraial
      b(29, { by: "deus", set: "atrio", props: ATRIO, q: "afligireis as vossas almas", env: { terrain: "desert", night: 0.16, glory: 0.72, fire: 0.4 }, cast: [ // estatuto perpétuo: no sétimo mês, aos dez, afligireis as almas
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
        C("arao", -90, "stand", { glow: 0.4, dy: 0.5, facing: 1 }),
      ] }),
      b(30, { by: "deus", q: "sereis purificados de todos os vossos pecados", env: { glory: 0.9 } }), // naquele dia se faz expiação: sereis PURIFICADOS de todos os pecados
      b(31, { by: "deus", q: "sábado de descanso" }),                              // é um sábado de descanso; afligireis as vossas almas
      b(32, { by: "deus" }),                                                       // o sacerdote ungido fará a expiação, de vestes de linho
      b(33, { by: "deus", q: "fará expiação" }),                                   // expiação pelo santuário, pela tenda, pelo altar e por todos
      b(34, { by: "deus", q: "uma vez no ano", env: { glory: 0.85 }, cast: [       // estatuto perpétuo: expiação uma VEZ NO ANO; e Arão o fez
        C("arao", -20, "bow", { glow: 0.45, dy: 0.5, facing: 1 }),
        C("moises", -110, "stand", { dy: 0.5, facing: 1 }),
      ] }),
    ],
  },
};
