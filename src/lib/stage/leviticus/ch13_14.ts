// ============================================================================
// LEVÍTICO 13–14 — CENA VIVA. A praga da lepra e a purificação do leproso.
//
// Lev 13 — O DIAGNÓSTICO: o sacerdote examina a praga na pele, na roupa, no
// couro; declara limpo ou imundo. O leproso, imundo, anda de vestes rasgadas
// clamando "Imundo, imundo!", e habita SÓ, fora do arraial (v.45-46) — imagem
// viva do que o pecado faz: separa.
//
// Lev 14 — A PURIFICAÇÃO: o sacerdote sai FORA do arraial ao encontro do curado
// (a graça vai buscar o excluído). O rito das DUAS AVES: uma degolada sobre
// águas vivas, a outra molhada no sangue e SOLTA viva sobre o campo — o preço
// pago e a vida libertada. Depois, lavado e rapado, o purificado volta; ao
// oitavo dia, as ofertas o restauram. Até a lepra da CASA é tratada.
//
// A VOZ DE DEUS (regra do projeto): a lei vem do alto (`by: "deus"`), sem
// figura. O sacerdote é `arao`; o afligido/curado é `homem`; a ave solta é o
// prop `birds`, subindo livre ao céu.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// A PORTA DO ARRAIAL: onde o sacerdote examina a praga — as tendas atrás, o
// deserto à frente, o exame à luz do dia.
const PORTA: StagePropSpec[] = [
  P("tent", -260, 1.1, undefined, 0.16),
  P("tent", -180, 0.9, undefined, 0.28),
  { ...P("tent", 40, 1.25, undefined, 0.12), tag: "tabernaculo" },
  P("palm", 250, 1.0, undefined, 0.16),
  P("rock", 300, 0.95, undefined, 0.5),
  P("amphora", 150, 0.8, undefined, 0.6),
  P("grass", -60, 0.8, undefined, 0.8),
];
// FORA DO ARRAIAL: onde o leproso habita só e onde o sacerdote vai ao seu
// encontro na purificação — a solidão do deserto, uma tenda ao longe.
const FORA: StagePropSpec[] = [
  P("tent", 260, 0.85, undefined, 0.14),
  P("rock", -280, 1.1, undefined, 0.44),
  P("rock", 300, 1.0, undefined, 0.52),
  P("palm", -200, 0.9, undefined, 0.16),
  P("bush", 120, 0.75, undefined, 0.4),
  P("grass", -40, 0.78, undefined, 0.8),
];
// A PURIFICAÇÃO (Lev 14:4-7): as águas vivas, e a AVE VIVA solta ao céu.
const PURIFICACAO: StagePropSpec[] = [
  ...FORA,
  P("river", 60, 1.0, undefined, 0.56),
  { kind: "birds", dx: 20, scale: 1, dy: 0.7, sky: true },
];

const dv = (v: number) => b(v, { by: "deus" });   // versículo de instrução (voz do céu)

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Lev 13
  13: {
    start: { terrain: "desert", night: 0.1, glory: 0.55, storm: 0, fire: 0, verdure: 0.2 },
    beats: [
      b(1, { by: "deus", props: PORTA, env: { terrain: "desert", glory: 0.58, night: 0.1, verdure: 0.2 }, cast: [ // o Senhor fala a Moisés e a Arão
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
        C("arao", -100, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(2, { by: "deus", q: "será levado a Arão", cast: [                          // a praga na pele: será levado ao sacerdote
        C("arao", 30, "stand", { dy: 0.52, facing: -1 }),
        C("homem", -40, "stand", { dy: 0.54, facing: 1, id: "afligido" }),
      ] }),
      b(3, { by: "deus", q: "o declarará por imundo", cast: [                      // o sacerdote examina; se for lepra, declara imundo
        C("arao", 20, "point", { dy: 0.52, facing: -1 }),
        C("homem", -40, "stand", { dy: 0.54, facing: 1, id: "afligido" }),
      ] }),
      dv(4), dv(5), dv(6), dv(7), dv(8), dv(9), dv(10), dv(11), dv(12), dv(13),    // o exame e o encerramento por sete dias, e o reexame
      dv(14), dv(15), dv(16), dv(17), dv(18), dv(19), dv(20), dv(21), dv(22), dv(23),
      dv(24), dv(25), dv(26), dv(27), dv(28), dv(29), dv(30), dv(31), dv(32), dv(33),
      dv(34), dv(35), dv(36), dv(37), dv(38), dv(39), dv(40), dv(41), dv(42), dv(43), dv(44),
      // v.45-46 — O LEPROSO ISOLADO: vestes rasgadas, "Imundo, imundo!", só.
      b(45, { by: "deus", q: "Imundo, imundo", env: { glory: 0.4, night: 0.18 }, cast: [ // o leproso de vestes rasgadas clama: "Imundo, imundo!"
        C("homem", 20, "bow", { dy: 0.54, id: "leproso" }),
      ] }),
      b(46, { by: "deus", q: "a sua habitação será fora do arraial", set: "fora", props: FORA, env: { terrain: "desert", night: 0.22, glory: 0.35 }, cast: [ // habitará SÓ; a sua habitação será fora do arraial
        C("homem", 0, "stand", { dy: 0.54, id: "leproso" }),
      ] }),
      // v.47-59 — a lepra nas VESTES: examinada, lavada, ou queimada no fogo.
      b(47, { by: "deus", set: "porta", props: [...PORTA, P("crate", -20, 0.85, undefined, 0.6)], env: { terrain: "desert", night: 0.1, glory: 0.55 }, cast: [ // a praga da lepra na veste de lã ou de linho
        C("arao", 30, "point", { dy: 0.52, facing: -1 }),
      ] }),
      dv(48), dv(49), dv(50), dv(51),
      b(52, { by: "deus", env: { fire: 0.5 } }),                                   // a veste com lepra maligna: queimada no fogo
      dv(53), dv(54), dv(55),
      b(56, { by: "deus" }), b(57, { by: "deus", env: { fire: 0.4 } }),            // reexame; se reincide, queimada
      b(58, { by: "deus" }),
      b(59, { by: "deus", q: "Esta é a lei da praga da lepra", env: { glory: 0.6 } }), // a lei da lepra na roupa: declarar limpa ou imunda
    ],
  },

  // ------------------------------------------------------------------ Lev 14
  // A purificação do leproso — a graça que vai fora do arraial buscar o
  // excluído, o rito das duas aves (uma morta, uma solta viva), a restauração.
  14: {
    start: { terrain: "desert", night: 0.14, glory: 0.5, storm: 0, fire: 0, verdure: 0.2 },
    beats: [
      b(1, { by: "deus", set: "fora", props: FORA, env: { terrain: "desert", glory: 0.55, night: 0.14, verdure: 0.2 }, cast: [ // o Senhor fala a Moisés
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(2, { by: "deus", q: "Esta será a lei do leproso no dia da sua purificação", cast: [ // a lei do leproso no dia da purificação
        C("homem", 40, "stand", { dy: 0.54, id: "curado" }),
      ] }),
      b(3, { by: "deus", q: "o sacerdote sairá fora do arraial", cast: [           // o sacerdote SAI fora do arraial e o examina
        C("arao", -20, "walk", { dy: 0.5, facing: 1 }),
        C("homem", 60, "stand", { dy: 0.54, id: "curado" }),
      ] }),
      b(4, { by: "deus", q: "duas aves vivas e limpas", props: [...FORA, { kind: "birds", dx: 30, scale: 0.9, dy: 0.5, sky: true }], cast: [ // duas aves vivas, pau de cedro, carmesim e hissopo
        C("arao", -20, "point", { dy: 0.5, facing: 1 }),
        C("homem", 60, "stand", { dy: 0.54, id: "curado" }),
      ] }),
      b(5, { by: "deus", props: [...FORA, P("river", 60, 1.0, undefined, 0.56)], cast: [ // uma ave degolada num vaso sobre águas vivas
        C("arao", 30, "kneel", { dy: 0.5, facing: -1 }),
      ] }),
      b(6, { by: "deus" }),                                                        // a ave viva e os ramos molhados no sangue
      b(7, { by: "deus", q: "soltará a ave viva sobre a face do campo", set: "purificacao", props: PURIFICACAO, env: { glory: 0.75 }, cast: [ // asperge sete vezes; declara limpo e SOLTA a ave viva
        C("arao", -30, "raise", { dy: 0.5, facing: 1 }),
        C("homem", 40, "raise", { dy: 0.54, id: "curado" }),
      ] }),
      b(8, { by: "deus", set: "fora", props: FORA, env: { glory: 0.6 }, cast: [    // lava as vestes, rapa o pêlo, lava-se: entra no arraial
        C("homem", 20, "stand", { dy: 0.54, id: "curado" }),
      ] }),
      dv(9),
      b(10, { by: "deus", set: "porta", props: PORTA, env: { terrain: "desert", night: 0.1, glory: 0.6 }, cast: [ // ao oitavo dia: dois cordeiros e uma cordeira sem defeito
        C("homem", -40, "stand", { dy: 0.54, id: "curado" }),
        C("cordeiro", 120, "stand", { dy: 0.46, scale: 0.66, id: "cordeiro-of" }),
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      dv(11), dv(12), dv(13),
      b(14, { by: "deus", q: "sobre a ponta da orelha direita", cast: [            // o sangue na orelha, no polegar da mão e do pé do purificado
        C("arao", 20, "point", { dy: 0.5, facing: -1 }),
        C("homem", -30, "stand", { dy: 0.54, id: "curado" }),
      ] }),
      dv(15), dv(16), dv(17), dv(18), dv(19),
      b(20, { by: "deus", q: "assim o sacerdote fará expiação por ele, e será limpo", env: { fire: 0.6, glory: 0.75 }, cast: [ // o holocausto e a oferta no altar: expiação, e será limpo
        C("arao", 46, "raise", { dy: 0.5, facing: -1 }),
        C("homem", -40, "bow", { dy: 0.54, id: "curado" }),
      ] }),
      dv(21), dv(22), dv(23), dv(24), dv(25), dv(26), dv(27), dv(28), dv(29), dv(30), dv(31), dv(32),
      // v.33-53 — A LEPRA NA CASA: examinada, as pedras arrancadas, ou a casa
      // derribada; e a mesma purificação das duas aves para a casa limpa.
      b(33, { by: "deus", set: "casa", props: [{ ...P("door", 0, 1.3, undefined, 0.34), tag: "casa-lepra" }, P("tower", -260, 1.1, undefined, 0.1), P("palm", 240, 1.0, undefined, 0.14), P("rock", 300, 0.9, undefined, 0.5), P("grass", -60, 0.8, undefined, 0.8)], env: { terrain: "city", night: 0.12, glory: 0.5 }, cast: [ // o Senhor fala a Moisés e a Arão sobre a lepra da casa
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
        C("arao", -100, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      dv(34), dv(35),
      b(36, { by: "deus", cast: [ C("arao", -30, "point", { dy: 0.5, facing: 1 }) ] }), // manda desocupar a casa antes do exame
      dv(37), dv(38), dv(39), dv(40), dv(41), dv(42), dv(43), dv(44),
      b(45, { by: "deus", q: "derribará a casa", env: { storm: 0.15 } }),           // a casa com lepra maligna: DERRIBADA para fora da cidade
      dv(46), dv(47), dv(48),
      b(49, { by: "deus", props: [{ ...P("door", 0, 1.3, undefined, 0.34), tag: "casa-lepra" }, { kind: "birds", dx: 60, scale: 0.9, dy: 0.6, sky: true }, P("tower", -260, 1.1, undefined, 0.1), P("palm", 240, 1.0, undefined, 0.14), P("grass", -60, 0.8, undefined, 0.8)], cast: [ // para expiar a casa: duas aves, cedro, carmesim e hissopo
        C("arao", 30, "point", { dy: 0.5, facing: -1 }),
      ] }),
      dv(50), dv(51),
      b(52, { by: "deus", q: "Assim expiará aquela casa", env: { glory: 0.65 } }),   // e assim expiará aquela casa com o sangue da ave
      b(53, { by: "deus", q: "e será limpa", env: { glory: 0.7 }, cast: [           // solta a ave viva fora da cidade: a casa será limpa
        C("arao", -20, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      // v.54-57 — o resumo da lei de toda a lepra.
      b(54, { by: "deus", set: "porta", props: PORTA, env: { terrain: "desert", night: 0.1, glory: 0.6 } }),
      dv(55), dv(56),
      b(57, { by: "deus", q: "Esta é a lei da lepra", env: { glory: 0.68 }, cast: [ // esta é a lei da lepra, para ensinar quando é limpo ou imundo
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
        C("arao", -100, "stand", { dy: 0.5, facing: 1 }),
      ] }),
    ],
  },
};
