// ============================================================================
// JOSUÉ 3–4 — CENA VIVA. A TRAVESSIA DO JORDÃO e as DOZE PEDRAS memoriais.
//
// Js 3 — A TRAVESSIA: os sacerdotes levam a ARCA da aliança à frente do povo.
// Ao porem os pés na beira do Jordão — que transbordava as ribanceiras nos dias
// da ceifa — as águas de cima param e se levantam NUM MONTÃO, mui longe, e as
// que desciam ao Mar Salgado são de todo separadas. Israel passa A SECO, em
// frente de Jericó, enquanto os sacerdotes firmam a arca no meio do leito. Ali
// o Senhor começa a engrandecer Josué "perante os olhos de todo o Israel".
//
// Js 4 — AS DOZE PEDRAS: doze homens, um de cada tribo, tiram doze pedras do
// meio do Jordão — do lugar onde firmaram os pés os sacerdotes — e Josué as
// ergue em GILGAL por MEMORIAL: "quando vossos filhos no futuro perguntarem:
// Que significam estas pedras?". Outras doze ficam no meio do rio. Os
// sacerdotes sobem, e as águas do Jordão voltam ao seu lugar, transbordando
// como antes — "para que todos os povos da terra conheçam a mão do Senhor".
//
// A VOZ DE DEUS (regra do projeto): o Senhor fala DIRETO a Josué, sem mediador
// visível (oráculo), `by: "deus"` — voz do céu, glória alta, sem figura. Josué
// fala como `by: "servo"`, sempre o PRIMEIRO servo do elenco (id "josue"), para
// que o balão o nomeie. Os oficiais e a procissão dos sacerdotes ficam como
// narração encenada (sem balão de fala).
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// A RIBEIRA de Sitim, junto ao Jordão — o arraial antes de passar (Js 3:1-5).
const RIBEIRA: StagePropSpec[] = [
  P("river", 0, 1.5, undefined, 0.68),
  P("tent", -270, 1.05, undefined, 0.18),
  P("tent", 250, 1.0, undefined, 0.22),
  P("palm", -330, 1.05, undefined, 0.14),
  P("grass", -80, 0.8, undefined, 0.8),
  P("grass", 100, 0.76, undefined, 0.72),
];
// A ARCA DA ALIANÇA levada adiante do povo, o Jordão ao fundo (Js 3:6-13).
const ARCA: StagePropSpec[] = [
  P("river", 0, 1.5, undefined, 0.66),
  P("ark", 40, 1.05, undefined, 0.42),
  P("tent", -280, 1.0, undefined, 0.18),
  P("palm", -335, 1.0, undefined, 0.13),
  P("grass", -90, 0.78, undefined, 0.8),
  P("grass", 140, 0.74, undefined, 0.7),
];
// A PROCISSÃO ENTRA no rio cheio: o Jordão transbordava a ceifa (Js 3:14-15).
const TRAVESSIA: StagePropSpec[] = [
  P("river", 0, 1.6, undefined, 0.5),
  P("ark", 30, 1.0, undefined, 0.44),
  P("tent", -290, 1.0, undefined, 0.16),
  P("palm", -340, 1.0, undefined, 0.12),
  P("grass", -90, 0.78, undefined, 0.82),
  P("grass", 130, 0.74, undefined, 0.72),
];
// O MONTÃO: as águas de cima paradas mui longe; leito SECO; Jericó em frente;
// a arca firme no meio do Jordão (Js 3:16-17; 4:1-13).
const MONTAO: StagePropSpec[] = [
  P("river", -30, 1.4, undefined, 0.12),   // as águas que vinham de cima, paradas num montão bem longe
  P("rock", -330, 1.7, undefined, 0.16),   // o MONTÃO — as águas amontoadas
  P("rock", 320, 1.4, undefined, 0.2),
  P("ark", 0, 1.2, undefined, 0.5),        // a arca, em seco, no meio do Jordão
  P("tower", 250, 0.95, undefined, 0.26),  // Jericó, em frente
  P("grass", -90, 0.72, undefined, 0.9),   // o leito seco
  P("grass", 120, 0.7, undefined, 0.82),
];
// AS ÁGUAS VOLTAM ao seu lugar, transbordando as ribanceiras (Js 4:18).
const RIO_CHEIO: StagePropSpec[] = [
  P("river", 0, 1.7, undefined, 0.55),
  P("ark", -30, 1.0, undefined, 0.28),     // a arca já subida à margem
  P("tower", 250, 0.9, undefined, 0.24),   // Jericó
  P("palm", -330, 1.0, undefined, 0.12),
  P("grass", 90, 0.74, undefined, 0.78),
];
// GILGAL: o arraial ao oriente de Jericó e as DOZE PEDRAS por memorial (Js 4:19-24).
const GILGAL: StagePropSpec[] = [
  P("rock", -40, 1.0, undefined, 0.52),    // as doze pedras memoriais
  P("rock", 0, 0.85, undefined, 0.58),
  P("rock", -70, 0.8, undefined, 0.6),
  P("rock", 30, 0.75, undefined, 0.64),
  P("tent", -290, 1.05, undefined, 0.16),
  P("tent", 270, 1.0, undefined, 0.2),
  P("palm", -340, 1.0, undefined, 0.12),
  P("river", 0, 1.2, undefined, 0.1),      // o Jordão ao fundo
  P("grass", 130, 0.74, undefined, 0.76),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Js 3
  3: {
    start: { terrain: "field", night: 0.1, glory: 0.6, storm: 0, fire: 0, water: 0, verdure: 0.4 },
    beats: [
      // v.1 — de madrugada partem de Sitim e chegam ao Jordão.
      b(1, { set: "ribeira", props: RIBEIRA, env: { terrain: "field", glory: 0.58, night: 0.12, verdure: 0.4 }, cast: [
        C("servo", -40, "walk", { dy: 0.5, facing: 1, id: "josue" }),
        C("multidao", 150, "walk", { dy: 0.56 }),
      ] }),
      // v.2 — ao fim de três dias, os oficiais passam pelo meio do arraial.
      b(2, { cast: [
        C("servo", -150, "walk", { dy: 0.5, facing: 1, id: "oficial1" }),
        C("servo", -80, "walk", { dy: 0.55, facing: 1, id: "oficial2" }),
        C("multidao", 160, "stand", { dy: 0.6 }),
      ] }),
      // v.3 — "Quando virdes a arca da aliança... e os sacerdotes a levam, segui-a."
      b(3, { set: "arca", props: ARCA, q: "Quando virdes a arca da aliança do Senhor", cast: [
        C("servo", -140, "point", { dy: 0.5, facing: 1, id: "oficial1" }),
        C("servo", 130, "stand", { dy: 0.5, facing: -1, id: "sacerdote1" }),
        C("multidao", 210, "stand", { dy: 0.62 }),
      ] }),
      // v.4 — haja dois mil côvados entre o povo e a arca, para saber o caminho.
      b(4, { q: "uma distância de dois mil côvados", cast: [
        C("servo", 120, "stand", { dy: 0.44, facing: -1, id: "sacerdote1" }),
        C("multidao", -140, "stand", { dy: 0.6 }),
      ] }),
      // v.5 — Josué: "Santificai-vos, porque amanhã fará o Senhor maravilhas."
      b(5, { by: "servo", q: "Santificai-vos", cast: [
        C("servo", -40, "raise", { dy: 0.5, facing: 1, id: "josue" }),
        C("multidao", 150, "stand", { dy: 0.56 }),
      ] }),
      // v.6 — Josué aos sacerdotes: "Levantai a arca e passai adiante do povo."
      b(6, { by: "servo", q: "Levantai a arca da aliança, e passai adiante deste povo", cast: [
        C("servo", -110, "point", { dy: 0.48, facing: 1, id: "josue" }),
        C("servo", 90, "walk", { dy: 0.5, facing: 1, id: "sacerdote1" }),
        C("servo", 160, "walk", { dy: 0.54, facing: 1, id: "sacerdote2" }),
      ] }),
      // v.7 — VOZ DO CÉU: "Hoje começarei a engrandecer-te perante os olhos de todo o Israel."
      b(7, { by: "deus", q: "Hoje começarei a engrandecer-te perante os olhos de todo o Israel",
        env: { glory: 0.85, night: 0.08 }, cast: [
        C("servo", -20, "kneel", { dy: 0.52, facing: 1, id: "josue", glow: 0.25 }),
        C("servo", 150, "stand", { dy: 0.42, facing: -1, id: "sacerdote1" }),
      ] }),
      // v.8 — VOZ DO CÉU: ordena aos sacerdotes pararem à beira das águas do Jordão.
      b(8, { by: "deus", q: "Quando chegardes à beira das águas do Jordão, parareis aí",
        env: { glory: 0.8 }, cast: [
        C("servo", -20, "stand", { dy: 0.52, facing: 1, id: "josue", glow: 0.2 }),
      ] }),
      // v.9 — Josué: "Chegai-vos para cá, e ouvi as palavras do Senhor."
      b(9, { by: "servo", q: "Chegai-vos para cá, e ouvi as palavras do Senhor", env: { glory: 0.66 }, cast: [
        C("servo", -40, "raise", { dy: 0.5, facing: 1, id: "josue" }),
        C("multidao", 150, "stand", { dy: 0.56 }),
      ] }),
      // v.10 — Josué: "o Deus vivo está no meio de vós."
      b(10, { by: "servo", q: "o Deus vivo está no meio de vós", cast: [
        C("servo", -40, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("multidao", 150, "stand", { dy: 0.56 }),
      ] }),
      // v.11 — Josué: "a arca da aliança do Senhor de toda a terra passa o Jordão diante de vós."
      b(11, { by: "servo", q: "a arca da aliança do Senhor de toda a terra passa o Jordão diante de vós", cast: [
        C("servo", -60, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("servo", 120, "stand", { dy: 0.46, facing: -1, id: "sacerdote1" }),
        C("multidao", 200, "stand", { dy: 0.62 }),
      ] }),
      // v.12 — "Tomai, pois, agora doze homens das tribos de Israel."
      b(12, { by: "servo", q: "Tomai, pois, agora doze homens", cast: [
        C("servo", -60, "raise", { dy: 0.5, facing: 1, id: "josue" }),
        C("homem", 90, "stand", { dy: 0.52, facing: -1, id: "tribo1" }),
        C("homem", 160, "stand", { dy: 0.58, facing: -1, id: "tribo2" }),
        C("homem", 220, "stand", { dy: 0.64, facing: -1, id: "tribo3" }),
      ] }),
      // v.13 — a promessa: "as águas, que vêm de cima, pararão amontoadas."
      b(13, { by: "servo", q: "as águas, que vêm de cima, pararão amontoadas", env: { glory: 0.7 }, cast: [
        C("servo", -60, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("multidao", 160, "stand", { dy: 0.58 }),
      ] }),
      // v.14 — parte o povo das tendas; os sacerdotes levam a arca adiante.
      b(14, { set: "travessia", props: TRAVESSIA, env: { terrain: "field", glory: 0.62, night: 0.1, water: 0.3, verdure: 0.35 }, cast: [
        C("servo", 20, "walk", { dy: 0.46, facing: 1, id: "sacerdote1" }),
        C("servo", 90, "walk", { dy: 0.5, facing: 1, id: "sacerdote2" }),
        C("multidao", -160, "walk", { dy: 0.58, facing: 1 }),
      ] }),
      // v.15 — os pés dos sacerdotes molham-se; o Jordão transbordava a ceifa.
      b(15, { q: "o Jordão transbordava sobre todas as suas ribanceiras", env: { water: 0.4 }, cast: [
        C("servo", 20, "stand", { dy: 0.5, facing: 1, id: "sacerdote1" }),
        C("servo", 90, "stand", { dy: 0.54, facing: 1, id: "sacerdote2" }),
        C("multidao", -170, "walk", { dy: 0.6, facing: 1 }),
      ] }),
      // v.16 — ÍCONE: as águas se levantam NUM MONTÃO; o povo passa em frente de Jericó.
      b(16, { set: "montao", props: MONTAO, q: "levantaram-se num montão",
        env: { terrain: "field", glory: 0.82, night: 0.06, water: 0, verdure: 0.28 }, cast: [
        C("servo", 0, "stand", { dy: 0.5, facing: -1, id: "sacerdote1", glow: 0.15 }),
        C("servo", 70, "stand", { dy: 0.54, facing: -1, id: "sacerdote2" }),
        C("multidao", -150, "walk", { dy: 0.66, facing: 1 }),
        C("multidao", 170, "walk", { dy: 0.6, facing: 1 }),
      ] }),
      // v.17 — os sacerdotes firmam a arca em seco no meio; todo o Israel passa a seco.
      b(17, { q: "pararam firmes, em seco, no meio do Jordão", env: { glory: 0.8 }, cast: [
        C("servo", 0, "stand", { dy: 0.5, facing: -1, id: "sacerdote1", glow: 0.15 }),
        C("servo", 70, "stand", { dy: 0.54, facing: -1, id: "sacerdote2" }),
        C("multidao", -160, "walk", { dy: 0.68, facing: 1 }),
        C("multidao", 190, "walk", { dy: 0.62, facing: 1 }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Js 4
  4: {
    start: { terrain: "field", night: 0.1, glory: 0.66, storm: 0, fire: 0, water: 0, verdure: 0.3 },
    beats: [
      // v.1 — acabando o povo de passar, VOZ DO CÉU fala a Josué.
      b(1, { set: "montao", props: MONTAO, by: "deus", q: "falou o SENHOR a Josué",
        env: { terrain: "field", glory: 0.82, night: 0.06, verdure: 0.28 }, cast: [
        C("servo", -40, "kneel", { dy: 0.52, facing: 1, id: "josue", glow: 0.2 }),
        C("servo", 0, "stand", { dy: 0.5, facing: -1, id: "sacerdote1" }),
      ] }),
      // v.2 — VOZ DO CÉU: "Tomai do povo doze homens, de cada tribo um homem."
      b(2, { by: "deus", q: "Tomai do povo doze homens, de cada tribo um homem", env: { glory: 0.8 }, cast: [
        C("servo", -40, "stand", { dy: 0.52, facing: 1, id: "josue", glow: 0.18 }),
      ] }),
      // v.3 — VOZ DO CÉU: tirai doze pedras do lugar onde firmaram os pés os sacerdotes.
      b(3, { by: "deus", q: "do lugar onde estavam firmes os pés dos sacerdotes", env: { glory: 0.78 }, cast: [
        C("servo", -40, "stand", { dy: 0.52, facing: 1, id: "josue", glow: 0.15 }),
        C("servo", 0, "stand", { dy: 0.5, facing: -1, id: "sacerdote1" }),
      ] }),
      // v.4 — Josué chama os doze homens que escolhera, um de cada tribo.
      b(4, { q: "Chamou, pois, Josué os doze homens", cast: [
        C("servo", -60, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("homem", 60, "stand", { dy: 0.52, facing: -1, id: "tribo1" }),
        C("homem", 130, "stand", { dy: 0.58, facing: -1, id: "tribo2" }),
        C("homem", 190, "stand", { dy: 0.64, facing: -1, id: "tribo3" }),
      ] }),
      // v.5 — Josué: "cada um levante uma pedra sobre o ombro, segundo as tribos."
      b(5, { by: "servo", q: "cada um levante uma pedra sobre o ombro", cast: [
        C("servo", -70, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("homem", 40, "raise", { dy: 0.54, facing: -1, id: "tribo1" }),
        C("homem", 120, "raise", { dy: 0.6, facing: -1, id: "tribo2" }),
        C("homem", 190, "kneel", { dy: 0.66, facing: -1, id: "tribo3" }),
      ] }),
      // v.6 — "para que isto seja por sinal; e quando vossos filhos perguntarem..."
      b(6, { by: "servo", q: "quando vossos filhos no futuro perguntarem", cast: [
        C("servo", -70, "raise", { dy: 0.5, facing: 1, id: "josue" }),
        C("homem", 80, "stand", { dy: 0.56, facing: -1, id: "tribo1" }),
        C("multidao", 200, "stand", { dy: 0.64 }),
      ] }),
      // v.7 — "estas pedras serão para sempre por memorial aos filhos de Israel."
      b(7, { by: "servo", q: "estas pedras serão para sempre por memorial aos filhos de Israel", env: { glory: 0.7 }, cast: [
        C("servo", -70, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("homem", 80, "kneel", { dy: 0.58, facing: -1, id: "tribo1" }),
        C("multidao", 200, "stand", { dy: 0.64 }),
      ] }),
      // v.8 — os filhos de Israel levantam doze pedras do meio do Jordão.
      b(8, { q: "levantaram doze pedras do meio do Jordão", cast: [
        C("homem", -20, "raise", { dy: 0.56, facing: 1, id: "tribo1" }),
        C("homem", 60, "raise", { dy: 0.6, facing: 1, id: "tribo2" }),
        C("homem", 140, "kneel", { dy: 0.66, facing: 1, id: "tribo3" }),
        C("servo", -130, "stand", { dy: 0.5, facing: 1, id: "josue" }),
      ] }),
      // v.9 — Josué levanta OUTRAS doze pedras no meio do Jordão; ali estão até hoje.
      b(9, { q: "doze pedras no meio do Jordão", cast: [
        C("servo", 0, "kneel", { dy: 0.56, facing: -1, id: "josue" }),
        C("servo", 90, "stand", { dy: 0.5, facing: -1, id: "sacerdote1" }),
      ] }),
      // v.10 — os sacerdotes ficam de pé no meio do Jordão até tudo se cumprir; o povo apressa-se.
      b(10, { q: "Pararam, pois, os sacerdotes, que levavam a arca, no meio do Jordão", cast: [
        C("servo", 0, "stand", { dy: 0.5, facing: -1, id: "sacerdote1", glow: 0.12 }),
        C("servo", 70, "stand", { dy: 0.54, facing: -1, id: "sacerdote2" }),
        C("multidao", -160, "walk", { dy: 0.66, facing: 1 }),
      ] }),
      // v.11 — passado todo o povo, sobe a arca do Senhor, e os sacerdotes, à vista do povo.
      b(11, { q: "então passou a arca do Senhor, e os sacerdotes, à vista do povo", env: { glory: 0.72 }, cast: [
        C("servo", -20, "walk", { dy: 0.44, facing: 1, id: "sacerdote1", glow: 0.12 }),
        C("servo", 50, "walk", { dy: 0.48, facing: 1, id: "sacerdote2" }),
        C("multidao", 190, "stand", { dy: 0.64 }),
      ] }),
      // v.12 — Rúben, Gade e a meia tribo de Manassés passam armados à frente.
      b(12, { q: "armados na frente dos filhos de Israel", cast: [
        C("homem", -40, "walk", { dy: 0.52, facing: 1, id: "ruben" }),
        C("homem", 40, "walk", { dy: 0.56, facing: 1, id: "gade" }),
        C("homem", 120, "walk", { dy: 0.6, facing: 1, id: "manasses" }),
      ] }),
      // v.13 — uns quarenta mil armados passam para a batalha, às campinas de Jericó.
      b(13, { q: "quarenta mil homens de guerra", cast: [
        C("multidao", -120, "walk", { dy: 0.58, facing: 1 }),
        C("multidao", 60, "walk", { dy: 0.62, facing: 1 }),
      ] }),
      // v.14 — ÍCONE: o Senhor engrandeceu a Josué diante de todo o Israel; temeram-no.
      b(14, { q: "o Senhor engrandeceu a Josué diante dos olhos de todo o Israel",
        env: { glory: 0.86, night: 0.06 }, cast: [
        C("servo", -30, "raise", { dy: 0.5, facing: -1, id: "josue", glow: 0.45 }),
        C("multidao", 160, "bow", { dy: 0.64 }),
      ] }),
      // v.15 — VOZ DO CÉU fala a Josué.
      b(15, { by: "deus", q: "Falou, pois, o Senhor a Josué", env: { glory: 0.78 }, cast: [
        C("servo", -20, "stand", { dy: 0.52, facing: 1, id: "josue", glow: 0.18 }),
      ] }),
      // v.16 — VOZ DO CÉU: "Dá ordem aos sacerdotes... que subam do Jordão."
      b(16, { by: "deus", q: "que subam do Jordão", env: { glory: 0.76 }, cast: [
        C("servo", -20, "stand", { dy: 0.52, facing: 1, id: "josue", glow: 0.15 }),
      ] }),
      // v.17 — Josué aos sacerdotes: "Subi do Jordão."
      b(17, { by: "servo", q: "Subi do Jordão", cast: [
        C("servo", -60, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("servo", 60, "walk", { dy: 0.48, facing: 1, id: "sacerdote1" }),
        C("servo", 130, "walk", { dy: 0.52, facing: 1, id: "sacerdote2" }),
      ] }),
      // v.18 — ÍCONE: subidos os sacerdotes, as ÁGUAS DO JORDÃO voltam ao seu lugar.
      b(18, { set: "riocheio", props: RIO_CHEIO, q: "as águas do Jordão se tornaram ao seu lugar",
        env: { terrain: "field", glory: 0.68, night: 0.1, water: 0.5, verdure: 0.4 }, cast: [
        C("servo", -40, "stand", { dy: 0.4, facing: -1, id: "sacerdote1", glow: 0.12 }),
        C("servo", 20, "stand", { dy: 0.44, facing: -1, id: "sacerdote2" }),
        C("multidao", 180, "stand", { dy: 0.62 }),
      ] }),
      // v.19 — o povo sobe do Jordão no dia dez e aloja-se em Gilgal, ao oriente de Jericó.
      b(19, { set: "gilgal", props: GILGAL, q: "alojaram-se em Gilgal",
        env: { terrain: "field", glory: 0.62, night: 0.12, water: 0, verdure: 0.42 }, cast: [
        C("servo", -120, "stand", { dy: 0.48, facing: -1, id: "josue" }),
        C("multidao", 150, "stand", { dy: 0.6 }),
      ] }),
      // v.20 — ÍCONE: Josué ergue em Gilgal as doze pedras tiradas do Jordão.
      b(20, { q: "levantou-as Josué em Gilgal", env: { glory: 0.7 }, cast: [
        C("servo", -30, "raise", { dy: 0.54, facing: -1, id: "josue", glow: 0.15 }),
        C("multidao", 170, "stand", { dy: 0.62 }),
      ] }),
      // v.21 — Josué: "Quando no futuro vossos filhos perguntarem a seus pais..."
      b(21, { by: "servo", q: "Quando no futuro vossos filhos perguntarem a seus pais", cast: [
        C("servo", -60, "point", { dy: 0.52, facing: -1, id: "josue" }),
        C("homem", 60, "stand", { dy: 0.56, facing: 1, id: "tribo1" }),
        C("multidao", 190, "stand", { dy: 0.64 }),
      ] }),
      // v.22 — "Fareis saber a vossos filhos: Israel passou em seco este Jordão."
      b(22, { by: "servo", q: "Israel passou em seco este Jordão", cast: [
        C("servo", -60, "raise", { dy: 0.52, facing: -1, id: "josue" }),
        C("multidao", 170, "stand", { dy: 0.62 }),
      ] }),
      // v.23 — "o Senhor vosso Deus fez secar as águas do Jordão, como fez ao Mar Vermelho."
      b(23, { by: "servo", q: "fez secar as águas do Jordão diante de vós", env: { glory: 0.72 }, cast: [
        C("servo", -60, "point", { dy: 0.52, facing: -1, id: "josue" }),
        C("multidao", 170, "stand", { dy: 0.62 }),
      ] }),
      // v.24 — "para que todos os povos da terra conheçam a mão do Senhor, que é forte."
      b(24, { by: "servo", q: "conheçam a mão do Senhor, que é forte", env: { glory: 0.8, night: 0.06 }, cast: [
        C("servo", -50, "raise", { dy: 0.52, facing: -1, id: "josue", glow: 0.2 }),
        C("multidao", 170, "raise", { dy: 0.62 }),
      ] }),
    ],
  },
};
