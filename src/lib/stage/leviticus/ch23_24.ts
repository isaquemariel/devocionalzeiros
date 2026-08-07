// ============================================================================
// LEVÍTICO 23–24 — CENA VIVA. As solenidades do Senhor; a luz e o pão; o
// blasfemo.
//
// Lev 23 — O CALENDÁRIO SAGRADO: o SÁBADO semanal; a PÁSCOA e os pães asmos; o
// MOLHO DAS PRIMÍCIAS movido; a festa das SEMANAS (Pentecoste) com dois pães; a
// festa das TROMBETAS; o DIA DA EXPIAÇÃO; e a festa dos TABERNÁCULOS, quando o
// povo habita em cabanas por sete dias com ramos de palmeiras e se alegra
// diante do Senhor — o ritmo do ano marcado pela graça.
//
// Lev 24 — A LUZ E O PÃO: o azeite puro para o CANDELABRO arder continuamente,
// e os DOZE PÃES da proposição sobre a mesa de ouro, "aliança perpétua". E o
// caso do BLASFEMO, apedrejado fora do arraial — a santidade do Nome defendida.
//
// A VOZ DE DEUS (regra do projeto): tudo é instrução do alto (`by: "deus"`),
// sem figura. Arão cuida do candelabro e da mesa; o povo celebra as festas.
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
  { ...P("altar", 70, 1.2, 0.65, 0.44), tag: "altar-holocausto" },
  P("tower", -300, 1.15, undefined, 0.06),
  P("palm", -250, 1.0, undefined, 0.16),
  P("crate", -140, 0.8, undefined, 0.62),
  P("grass", -60, 0.8, undefined, 0.82),
];
const PRIMICIAS: StagePropSpec[] = [...ATRIO, { ...P("sheaf", -110, 1.15, undefined, 0.36), tag: "primicias" }, P("sheaf", 150, 1.0, undefined, 0.44)];
const TROMBETAS: StagePropSpec[] = [...ATRIO, P("trumpet", -110, 1.1, undefined, 0.4)];
// A festa dos TABERNÁCULOS: o arraial em cabanas de ramos, o povo alegre.
const TABERNACULOS: StagePropSpec[] = [
  P("tent", -260, 1.1, undefined, 0.16),
  P("tent", -170, 0.95, undefined, 0.26),
  P("tent", 200, 1.05, undefined, 0.18),
  P("tent", 290, 0.9, undefined, 0.3),
  P("palm", -40, 1.15, undefined, 0.1),
  P("palm", 120, 1.0, undefined, 0.16),
  P("palm", 60, 0.85, undefined, 0.28),
  P("bush", -120, 0.85, undefined, 0.4),
  P("grass", -60, 0.82, undefined, 0.82),
  P("grass", 40, 0.8, undefined, 0.74),
];
// A LUZ E O PÃO (Lev 24): o candelabro de sete braços aceso e a mesa dos doze
// pães da proposição, dentro do santuário.
const LUZ_PAO: StagePropSpec[] = [
  { ...P("tent", -20, 1.5, undefined, 0.06), tag: "tabernaculo" },
  { ...P("menorah", -120, 1.15, undefined, 0.44), tag: "candelabro-ouro" },
  { ...P("stall", 120, 1.05, undefined, 0.46), tag: "mesa-proposicao" },
  P("tower", -300, 1.15, undefined, 0.06),
  P("palm", 260, 1.0, undefined, 0.16),
  P("grass", -60, 0.8, undefined, 0.82),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Lev 23
  23: {
    start: { terrain: "desert", night: 0.1, glory: 0.68, storm: 0, fire: 0.5, verdure: 0.2 },
    beats: [
      b(1, { by: "deus", props: ATRIO, env: { terrain: "desert", glory: 0.7, fire: 0.5, night: 0.1 }, cast: [ // falou o Senhor a Moisés
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(2, { by: "deus", q: "As solenidades do Senhor" }),                        // as solenidades do Senhor, santas convocações
      b(3, { by: "deus", q: "o sábado do descanso", env: { glory: 0.8 }, cast: [  // o SÁBADO do descanso, santa convocação
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      b(4, { by: "deus" }),                                                       // estas são as solenidades, cada uma a seu tempo
      b(5, { by: "deus", q: "é a páscoa do Senhor", env: { glory: 0.78 } }),      // aos catorze do primeiro mês: a PÁSCOA do Senhor
      dv(6), dv(7), dv(8),                                                        // os pães asmos por sete dias
      b(9, { by: "deus", set: "primicias", props: PRIMICIAS, env: { terrain: "desert", glory: 0.72, verdure: 0.4, fire: 0.4 }, cast: [ // falou o Senhor a Moisés
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }), C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(10, { by: "deus", q: "um molho das primícias", cast: [                     // o MOLHO DAS PRIMÍCIAS trazido ao sacerdote
        C("arao", 40, "raise", { dy: 0.5, facing: -1 }),
        C("homem", -60, "stand", { dy: 0.54, facing: 1, id: "ceifeiro" }),
      ] }),
      dv(11), dv(12), dv(13), dv(14),                                            // o molho movido, o cordeiro, e a lei perpétua
      b(15, { by: "deus", q: "contareis desde o dia seguinte ao sábado" }),       // contareis sete semanas desde o molho movido
      dv(16), dv(17), dv(18), dv(19), dv(20),                                    // a festa das SEMANAS: dois pães, as ofertas
      b(21, { by: "deus", q: "santa convocação" }),                              // santa convocação; estatuto perpétuo
      b(22, { by: "deus", q: "para o pobre e para o estrangeiro as deixarás" }),                          // a respiga da colheita deixada ao pobre e ao estrangeiro
      b(23, { by: "deus", set: "trombetas", props: TROMBETAS, env: { terrain: "desert", glory: 0.75, fire: 0.4 }, cast: [ // falou o Senhor a Moisés
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }), C("arao", 40, "raise", { dy: 0.52, facing: -1 }),
      ] }),
      b(24, { by: "deus", q: "memorial com sonido de trombetas", env: { glory: 0.82 }, cast: [ // a festa das TROMBETAS: memorial com sonido de trombetas
        C("arao", 40, "raise", { dy: 0.52, facing: -1 }),
        C("multidao", 130, "stand", { dy: 0.46 }),
      ] }),
      b(25, { by: "deus" }),                                                      // santa convocação; oferta queimada ao Senhor
      b(26, { by: "deus", set: "atrio", props: ATRIO, env: { terrain: "desert", glory: 0.68, night: 0.14, fire: 0.45 }, cast: [ C("moises", -150, "kneel", { dy: 0.5, facing: 1 }) ] }), // falou o Senhor a Moisés
      b(27, { by: "deus", q: "o dia da expiação", env: { glory: 0.7, night: 0.2 } }), // aos dez do sétimo mês: o DIA DA EXPIAÇÃO; afligireis as almas
      dv(28), dv(29), dv(30), dv(31), dv(32),
      b(33, { by: "deus", set: "tabernaculos", props: TABERNACULOS, env: { terrain: "field", glory: 0.72, night: 0.1, verdure: 0.6, fire: 0 }, cast: [ // falou o Senhor a Moisés
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(34, { by: "deus", q: "a festa dos tabernáculos", env: { glory: 0.78 }, cast: [ // aos quinze do sétimo mês: a festa dos TABERNÁCULOS
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.46 }),
      ] }),
      dv(35), dv(36), dv(37), dv(38), dv(39),
      b(40, { by: "deus", q: "ramos de palmeiras", env: { glory: 0.82, verdure: 0.7 }, cast: [ // tomareis ramos de palmeiras e vos alegrareis
        C("multidao", 100, "raise", { dy: 0.46 }),
        C("homem", -40, "raise", { dy: 0.54, facing: 1, id: "festeiro" }),
      ] }),
      b(41, { by: "deus" }),                                                      // celebrareis esta festa sete dias, estatuto perpétuo
      b(42, { by: "deus", q: "habitareis em tendas", cast: [                      // sete dias HABITAREIS EM CABANAS
        C("multidao", 110, "stand", { dy: 0.46 }),
      ] }),
      b(43, { by: "deus", q: "fiz habitar os filhos de Israel em tendas" }),                       // para que saibam que vos fiz habitar em tendas no deserto
      b(44, { by: "deus", q: "as solenidades do Senhor", env: { glory: 0.76 } }),  // assim Moisés declarou as solenidades do Senhor
    ],
  },

  // ------------------------------------------------------------------ Lev 24
  // A luz do candelabro e os doze pães; e o blasfemo apedrejado — a santidade
  // do Nome. Env: a luz do santuário (fire no candelabro) → o juízo sóbrio.
  24: {
    start: { terrain: "desert", night: 0.14, glory: 0.7, storm: 0, fire: 0.6, verdure: 0.15 },
    beats: [
      b(1, { by: "deus", set: "luzPao", props: LUZ_PAO, env: { terrain: "desert", glory: 0.72, fire: 0.6, night: 0.16 }, cast: [ // falou o Senhor a Moisés
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }), C("arao", 40, "stand", { glow: 0.2, dy: 0.52, facing: -1 }),
      ] }),
      b(2, { by: "deus", q: "azeite de oliveira" }),                              // azeite puro de oliveira para a luz arder continuamente
      b(3, { by: "deus", env: { fire: 0.7 } }),                                   // Arão a porá em ordem perante o Senhor continuamente
      b(4, { by: "deus", q: "candelabro", env: { fire: 0.8, glory: 0.8 }, cast: [ // as lâmpadas sobre o CANDELABRO de ouro puro, sempre
        C("arao", -110, "raise", { glow: 0.25, dy: 0.5, facing: 1 }),
      ] }),
      b(5, { by: "deus", q: "doze pães" }),                                      // cozerás DOZE bolos da flor de farinha
      b(6, { by: "deus", cast: [                                                  // os pões em duas fileiras sobre a mesa de ouro puro
        C("arao", 120, "point", { dy: 0.5, facing: -1 }),
      ] }),
      b(7, { by: "deus" }),                                                       // porás incenso puro sobre cada fileira: por memorial
      b(8, { by: "deus", q: "aliança perpétua", env: { glory: 0.82 } }),          // cada sábado se porá em ordem: aliança perpétua
      b(9, { by: "deus", q: "coisa santíssima" }),                               // será de Arão e seus filhos: coisa santíssima
      // v.10-23 — o BLASFEMO: julgado e apedrejado fora do arraial.
      b(10, { set: "arraial", props: [P("tent", -60, 1.2, undefined, 0.14), P("tent", 200, 1.0, undefined, 0.2), P("palm", -280, 1.0, undefined, 0.16), P("rock", 300, 0.9, undefined, 0.5), P("grass", -40, 0.8, undefined, 0.8)], env: { terrain: "desert", night: 0.24, glory: 0.4, storm: 0.12, fire: 0 }, cast: [ // rixa no arraial; o filho da israelita BLASFEMA o Nome
        C("homem", -20, "point", { dy: 0.54, facing: 1, id: "blasfemo" }),
        C("homem", 60, "stand", { dy: 0.5, facing: -1, id: "israelita" }),
        C("multidao", 160, "stand", { dy: 0.44 }),
      ] }),
      b(11, { q: "blasfemou o nome do Senhor, e o amaldiçoou", env: { storm: 0.2, night: 0.3 }, cast: [ // blasfemou o NOME; trazido a Moisés, posto em guarda
        C("homem", -10, "bow", { dy: 0.54, id: "blasfemo" }),
        C("moises", -120, "stand", { dy: 0.5, facing: 1 }),
        C("multidao", 140, "stand", { dy: 0.44 }),
      ] }),
      b(12, { cast: [ C("moises", -60, "kneel", { dy: 0.5, facing: 1 }) ] }),      // puseram-no à guarda até a decisão da boca do Senhor
      b(13, { by: "deus", env: { glory: 0.6 } }),                                 // e falou o Senhor a Moisés
      b(14, { by: "deus", q: "toda a congregação o apedrejará", cast: [               // levem o que blasfemou para fora, e a congregação o apedreje
        C("moises", -60, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "stand", { dy: 0.46 }),
      ] }),
      b(15, { by: "deus" }),                                                      // quem amaldiçoar a seu Deus levará o seu pecado
      b(16, { by: "deus", q: "certamente morrerá", env: { storm: 0.15 } }),        // quem blasfemar o Nome certamente morrerá
      b(17, { by: "deus" }),                                                      // quem matar a alguém certamente morrerá
      b(18, { by: "deus" }),                                                      // quem matar animal o restituirá: vida por vida
      b(19, { by: "deus" }),                                                      // como fez, assim se lhe fará
      b(20, { by: "deus", q: "olho por olho" }),                                  // quebradura por quebradura, olho por olho, dente por dente
      dv(21),
      b(22, { by: "deus", q: "Uma mesma lei tereis" }),                                  // uma mesma lei para o estrangeiro e para o natural
      b(23, { set: "fora", props: [P("rock", -40, 1.1, undefined, 0.4), P("rock", 40, 1.0, undefined, 0.5), P("rock", 120, 0.9, undefined, 0.44), P("palm", -200, 0.9, undefined, 0.16), P("grass", -80, 0.78, undefined, 0.8)], env: { terrain: "desert", night: 0.34, glory: 0.35, storm: 0.15 }, cast: [ // levaram-no fora do arraial e o apedrejaram, como o Senhor ordenou
        C("multidao", 60, "stand", { dy: 0.48 }),
        C("moises", -120, "stand", { dy: 0.5, facing: 1 }),
      ] }),
    ],
  },
};
