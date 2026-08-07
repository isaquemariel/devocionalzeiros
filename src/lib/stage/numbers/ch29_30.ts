// ============================================================================
// NÚMEROS 29–30 — CENA VIVA. As FESTAS do sétimo mês; a lei dos VOTOS.
//
// Nm 29 — O CALENDÁRIO DO SÉTIMO MÊS: a festa das TROMBETAS (dia 1, sonido de
// trombetas de prata); o dia da EXPIAÇÃO (dia 10, jejum — "afligireis as vossas
// almas" — sem alegria, o altar sóbrio); e a festa dos TABERNÁCULOS (dia 15,
// sete dias de festa ao Senhor), com o famoso DECRESCER dos novilhos: treze,
// doze, onze, dez, nove, oito, sete — e o oitavo dia de santa solenidade.
//
// Nm 30 — A LEI DOS VOTOS: o voto do homem é firme ("não violará a sua palavra");
// o voto da mulher solteira (na casa do pai) ou casada (sob o marido) pode ser
// confirmado pelo silêncio ou anulado no dia em que o pai/marido o ouve.
//
// A VOZ DE DEUS (regra do projeto): a lei litúrgica e a lei dos votos vêm do alto
// (`by: "deus"`), sem figura; Arão junto ao altar e o povo em cena ilustram.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const dv = (v: number) => b(v, { by: "deus" });

// Cenário base do arraial no deserto: o tabernáculo, o altar com fogo, e a
// vegetação do oásis. Para as festas do sétimo mês, junta-se a TROMBETA de prata.
const ARRAIAL: StagePropSpec[] = [
  { ...P("tent", -30, 1.45, undefined, 0.1), tag: "tabernaculo" },
  { ...P("altar", 120, 0.95, 0.5, 0.5), tag: "altar" },
  P("palm", -310, 1.05, undefined, 0.14),
  P("grass", -60, 0.82, undefined, 0.82),
  P("grass", 60, 0.78, undefined, 0.74),
];

// A festa: o mesmo arraial, com a trombeta e um número variável de novilhos ao
// altar — para encenar o DECRESCER dos novilhos ao longo dos sete dias.
const festa = (novilhos: number): StagePropSpec[] => {
  const calves: StagePropSpec[] = [];
  const n = Math.min(novilhos, 6);
  for (let i = 0; i < n; i++) calves.push(P("calf", 180 + i * 46, 0.6, undefined, 0.62 + (i % 2) * 0.04));
  return [
    { ...P("tent", -60, 1.45, undefined, 0.1), tag: "tabernaculo" },
    { ...P("altar", 60, 0.95, 0.6, 0.5), tag: "altar" },
    P("trumpet", -170, 0.85, undefined, 0.4),
    P("palm", -320, 1.05, undefined, 0.14),
    P("grass", -70, 0.8, undefined, 0.82),
    ...calves,
  ];
};

const araoAltar = (pose = "stand", glow = 0.35): CastPlacement =>
  C("arao", 10, pose, { glow, dy: 0.5, facing: 1 });

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Nm 29
  29: {
    start: { terrain: "desert", night: 0.1, glory: 0.66, storm: 0, fire: 0.3, verdure: 0.2 },
    beats: [
      // DIA 1 — a festa das TROMBETAS: sonido de trombetas de prata sobre o arraial.
      b(1, { by: "deus", q: "dia de sonido de trombetas", props: festa(1),
        env: { terrain: "desert", glory: 0.74, night: 0.08, fire: 0.4, verdure: 0.2 }, cast: [
        araoAltar("raise", 0.45),
        C("multidao", 210, "raise", { dy: 0.44 }),
      ] }),
      dv(2), dv(3), dv(4),
      b(5, { by: "deus", q: "para fazer expiação por vós", cast: [ araoAltar("stand", 0.35) ] }), // o bode para a expiação do pecado
      dv(6),
      // DIA 10 — o dia da EXPIAÇÃO: jejum e aflição da alma; o altar sóbrio, sem festa.
      b(7, { by: "deus", q: "afligireis as vossas almas", props: ARRAIAL,
        env: { terrain: "desert", glory: 0.4, night: 0.22, fire: 0.35, verdure: 0.16 }, cast: [
        araoAltar("kneel", 0.28),
        C("multidao", 210, "bow", { dy: 0.44 }),
      ] }),
      dv(8), dv(9), dv(10),
      b(11, { by: "deus", q: "além da expiação do pecado pelas propiciações", cast: [ araoAltar("kneel", 0.28) ] }), // a propiciação do grande dia
      // DIA 15 — a festa dos TABERNÁCULOS: sete dias de festa ao Senhor; começa o
      // decrescer dos novilhos — treze no primeiro dia.
      b(12, { by: "deus", q: "sete dias celebrareis festa ao Senhor", props: festa(6),
        env: { terrain: "desert", glory: 0.72, night: 0.08, fire: 0.5, verdure: 0.24 }, cast: [
        araoAltar("raise", 0.42),
        C("multidao", 240, "raise", { dy: 0.44 }),
      ] }),
      b(13, { by: "deus", q: "oferecereis treze novilhos", props: festa(6), cast: [ araoAltar("stand", 0.4) ] }), // dia 1 dos tabernáculos: treze novilhos
      dv(14), dv(15), dv(16),
      b(17, { by: "deus", q: "doze novilhos", props: festa(5), cast: [ araoAltar("stand", 0.4) ] }),   // dia 2: doze
      dv(18), dv(19),
      b(20, { by: "deus", q: "onze novilhos", props: festa(5), cast: [ araoAltar("stand", 0.38) ] }),  // dia 3: onze
      dv(21), dv(22),
      b(23, { by: "deus", q: "dez novilhos", props: festa(4), cast: [ araoAltar("stand", 0.38) ] }),    // dia 4: dez
      dv(24), dv(25),
      b(26, { by: "deus", q: "nove novilhos", props: festa(3), cast: [ araoAltar("stand", 0.36) ] }),   // dia 5: nove
      dv(27), dv(28),
      b(29, { by: "deus", q: "oito novilhos", props: festa(3), cast: [ araoAltar("stand", 0.36) ] }),   // dia 6: oito
      dv(30), dv(31),
      b(32, { by: "deus", q: "sete novilhos", props: festa(2), cast: [ araoAltar("stand", 0.34) ] }),   // dia 7: sete — o menor número
      dv(33), dv(34),
      // DIA 8 — a santa solenidade que fecha o ciclo.
      b(35, { by: "deus", q: "No oitavo dia tereis dia de solenidade", props: festa(1),
        env: { terrain: "desert", glory: 0.76, night: 0.06, fire: 0.5, verdure: 0.24 }, cast: [
        araoAltar("raise", 0.45),
        C("multidao", 240, "raise", { dy: 0.44 }),
      ] }),
      dv(36), dv(37), dv(38),
      b(39, { by: "deus", q: "nas vossas solenidades" }),                          // estas coisas fareis nas vossas solenidades
      b(40, { by: "moises", q: "E falou Moisés aos filhos de Israel", props: ARRAIAL,
        env: { terrain: "desert", glory: 0.66, night: 0.1, fire: 0.3, verdure: 0.2 }, cast: [ // Moisés transmite ao povo tudo o que o Senhor ordenara
        C("moises", -120, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 160, "stand", { dy: 0.44 }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Nm 30
  30: {
    start: { terrain: "desert", night: 0.12, glory: 0.55, storm: 0, fire: 0.25, verdure: 0.2 },
    beats: [
      // Moisés fala aos CABEÇAS das tribos: a palavra que o Senhor ordenou.
      b(1, { by: "moises", q: "Esta é a palavra que o SENHOR tem ordenado", props: ARRAIAL,
        env: { terrain: "desert", glory: 0.56, night: 0.12, fire: 0.25, verdure: 0.2 }, cast: [
        C("moises", -120, "point", { dy: 0.5, facing: 1 }),
        C("patriarca", 80, "stand", { dy: 0.5, facing: -1, id: "cabeca1" }),
        C("patriarca", 170, "stand", { dy: 0.46, facing: -1, id: "cabeca2" }),
      ] }),
      // O VOTO DO HOMEM: firme e inviolável — cumprirá tudo o que saiu de sua boca.
      b(2, { by: "deus", q: "não violará a sua palavra", env: { glory: 0.58 }, cast: [
        C("homem", -20, "raise", { dy: 0.52, facing: 1, id: "votante" }),
      ] }),
      // O VOTO DA MULHER SOLTEIRA, sob a casa do pai.
      b(3, { by: "deus", q: "estando ainda na casa de seu pai", cast: [
        C("patriarca", -80, "stand", { dy: 0.5, facing: 1, id: "pai" }),
        C("mulher", 20, "stand", { dy: 0.52, facing: -1, id: "moca" }),
      ] }),
      b(4, { by: "deus", q: "todos os seus votos serão válidos", cast: [           // o pai se cala → o voto vale
        C("patriarca", -80, "stand", { dy: 0.5, facing: 1, id: "pai" }),
        C("mulher", 20, "raise", { dy: 0.52, facing: -1, id: "moca" }),
      ] }),
      b(5, { by: "deus", q: "seu pai lhos tolheu", env: { glory: 0.5 }, cast: [    // o pai o tolhe → o voto se anula, e o Senhor perdoa
        C("patriarca", -80, "point", { dy: 0.5, facing: 1, id: "pai" }),
        C("mulher", 20, "bow", { dy: 0.52, facing: -1, id: "moca" }),
      ] }),
      // O VOTO DA MULHER CASADA, sob o marido (o casal em cena).
      b(6, { by: "deus", q: "E se ela for casada", cast: [
        C("homem", -30, "stand", { dy: 0.5, facing: 1, id: "marido" }),
        C("mulher", 30, "stand", { dy: 0.52, facing: -1, id: "esposa" }),
      ] }),
      b(7, { by: "deus", q: "os seus votos serão válidos", cast: [                 // o marido se cala → o voto vale
        C("homem", -30, "stand", { dy: 0.5, facing: 1, id: "marido" }),
        C("mulher", 30, "raise", { dy: 0.52, facing: -1, id: "esposa" }),
      ] }),
      b(8, { by: "deus", q: "anular o seu voto", env: { glory: 0.5 }, cast: [      // o marido o tolhe → anula o voto, e o Senhor perdoa
        C("homem", -30, "point", { dy: 0.5, facing: 1, id: "marido" }),
        C("mulher", 30, "bow", { dy: 0.52, facing: -1, id: "esposa" }),
      ] }),
      // A VIÚVA e a REPUDIADA: seu voto é firme sobre ela.
      b(9, { by: "deus", q: "voto da viúva, ou da repudiada", cast: [
        C("mulher", 0, "stand", { dy: 0.52, facing: 1, id: "viuva" }),
      ] }),
      dv(10), dv(11), dv(12),
      // A REGRA-CHAVE: o marido confirma ou anula.
      b(13, { by: "deus", q: "seu marido o confirmará, ou anulará", cast: [
        C("homem", -30, "raise", { dy: 0.5, facing: 1, id: "marido" }),
        C("mulher", 30, "stand", { dy: 0.52, facing: -1, id: "esposa" }),
      ] }),
      dv(14), dv(15),
      b(16, { by: "deus", q: "Estes são os estatutos que o Senhor ordenou a Moisés", env: { glory: 0.6 }, cast: [ // o resumo da lei entre marido e mulher, pai e filha
        C("moises", -120, "stand", { dy: 0.5, facing: 1 }),
        C("homem", 20, "stand", { dy: 0.5, facing: -1, id: "marido" }),
        C("mulher", 70, "stand", { dy: 0.48, facing: -1, id: "esposa" }),
      ] }),
    ],
  },
};
