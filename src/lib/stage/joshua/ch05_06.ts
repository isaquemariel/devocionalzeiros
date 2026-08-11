// ============================================================================
// JOSUÉ 5–6 — CENA VIVA. GILGAL, a PÁSCOA e o PRÍNCIPE do exército; JERICÓ.
//
// Js 5 — À ENTRADA DA TERRA: secado o Jordão, os reis dos amorreus e cananeus
// perdem o ânimo. Em GILGAL, Josué CIRCUNCIDA a nova geração com FACAS DE PEDRA
// no "monte dos prepúcios" (o opróbrio do Egito é tirado). Celebram a PÁSCOA nas
// campinas de Jericó; comem do FRUTO DA TERRA e, no dia seguinte, CESSA O MANÁ —
// nunca mais o tiveram. E então a TEOFANIA: o PRÍNCIPE do exército do SENHOR,
// com a ESPADA NUA na mão; Josué se prostra e DESCALÇA os sapatos, porque o
// lugar é santo.
//
// Js 6 — JERICÓ: cidade fechada. Por seis dias, SETE SACERDOTES com SETE BUZINAS
// de chifre de carneiro e a ARCA rodeiam a cidade uma vez; no sétimo dia, sete
// voltas. Ao GRANDE BRADO do povo, o MURO CAI. A cidade é ANÁTEMA, queimada a
// fogo; só a prata e o ouro ao tesouro. RAABE e a sua casa (o cordão de
// escarlata) são poupadas. E Josué esconjura quem reedificar Jericó.
//
// A VOZ DE DEUS (regra do projeto): quando o SENHOR fala a Josué sem mediador
// visível (a ordem, o oráculo), `by: "deus"` com glória, sem figura. Quando fala
// pelo PRÍNCIPE do exército — a teofania VISÍVEL —, o mediador está em cena:
// `by: "anjo"`, a figura luminosa com a espada (`flamingSword`) e glória. Josué,
// protagonista, fala como `by: "servo"`, sendo o PRIMEIRO servo do cast (id "josue").
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const dv = (v: number, q?: string, extra: Partial<StageBeat> = {}) => b(v, { by: "deus", ...(q ? { q } : {}), ...extra });

// GILGAL — o arraial de Israel na campina, o Jordão recém-atravessado ao fundo.
const GILGAL: StagePropSpec[] = [
  P("river", 0, 1.4, undefined, 0.86),
  P("tent", -230, 1.1, undefined, 0.2),
  P("tent", 220, 1.05, undefined, 0.24),
  P("palm", -330, 1.0, undefined, 0.14),
  P("grass", 90, 0.78, undefined, 0.68),
];
// O OUTEIRO DOS PREPÚCIOS — as facas de pedra, o monte da circuncisão em Gilgal.
const CIRC: StagePropSpec[] = [
  P("rock", 0, 1.3, undefined, 0.42),
  P("rock", -240, 1.0, undefined, 0.5),
  P("rock", 250, 1.0, undefined, 0.46),
  P("grass", -90, 0.8, undefined, 0.72),
  P("grass", 110, 0.76, undefined, 0.66),
  P("tent", 320, 1.0, undefined, 0.24),
];
// A PÁSCOA nas campinas de Jericó — o cordeiro assado ao fogo, à tarde.
const PASCOA: StagePropSpec[] = [
  P("campfire", 0, 1.2, undefined, 0.5),
  P("tent", -220, 1.1, undefined, 0.22),
  P("tent", 210, 1.05, undefined, 0.26),
  P("palm", -330, 1.0, undefined, 0.14),
  P("grass", 100, 0.78, undefined, 0.68),
];
// O FRUTO DA TERRA — pães ázimos, espigas tostadas, o gosto de Canaã.
const FRUTOS: StagePropSpec[] = [
  P("sheaf", -60, 1.0, undefined, 0.6),
  P("grapes", 200, 1.0, undefined, 0.3),
  P("grapes", -260, 1.0, undefined, 0.28),
  P("palm", 320, 1.0, undefined, 0.14),
  P("grass", 80, 0.76, undefined, 0.72),
];
// O MANÁ QUE CESSA — o pouco maná já sumindo, o fruto da terra tomando o seu lugar.
const MANA: StagePropSpec[] = [
  P("manna", -140, 0.5, undefined, 0.72),
  P("grapes", 140, 1.0, undefined, 0.36),
  P("sheaf", -280, 0.9, undefined, 0.6),
  P("grass", 40, 0.78, undefined, 0.7),
  P("palm", 320, 1.0, undefined, 0.14),
];
// A TEOFANIA — o PRÍNCIPE do exército do SENHOR, a ESPADA NUA, Jericó ao longe.
const TEOFANIA: StagePropSpec[] = [
  P("flamingSword", 150, 0.9, undefined, 0.42),
  P("tower", 300, 1.0, undefined, 0.3),
  P("rock", -300, 1.1, undefined, 0.34),
  P("grass", -80, 0.78, undefined, 0.72),
  P("palm", -330, 1.0, undefined, 0.14),
];

// JERICÓ FECHADA — a muralha, a cidade cerrada por causa de Israel.
const JERICO: StagePropSpec[] = [
  P("tower", 0, 1.5, undefined, 0.3),
  P("church", -190, 1.0, undefined, 0.36),
  P("rock", 250, 1.05, undefined, 0.5),
  P("palm", -330, 1.0, undefined, 0.14),
  P("grass", 120, 0.76, undefined, 0.7),
];
// A PROCISSÃO — a ARCA e as SETE BUZINAS rodeando a cidade (torre ao lado).
const MARCHA: StagePropSpec[] = [
  P("tower", 240, 1.3, undefined, 0.3),
  P("ark", -120, 1.0, undefined, 0.5),
  P("trumpet", -30, 0.8, undefined, 0.54),
  P("trumpet", 50, 0.8, undefined, 0.5),
  P("rock", 320, 1.0, undefined, 0.34),
  P("grass", 130, 0.76, undefined, 0.7),
];
// A NOITE no arraial — descansando entre as voltas, a lua sobre as tendas.
const NOITE: StagePropSpec[] = [
  P("tent", -200, 1.1, undefined, 0.22),
  P("tent", 200, 1.05, undefined, 0.26),
  P("tower", 320, 1.1, undefined, 0.3),
  { ...P("moon", -40, 1.6, undefined, 0.78), sky: true },
  P("grass", 60, 0.76, undefined, 0.68),
];
// A QUEDA — o muro desabado, o entulho de pedra ao pé da torre.
const QUEDA: StagePropSpec[] = [
  P("tower", 210, 1.15, undefined, 0.3),
  P("rock", 150, 1.3, undefined, 0.6),
  P("rock", 260, 1.15, undefined, 0.64),
  P("rock", 90, 1.0, undefined, 0.7),
  P("rock", 320, 1.0, undefined, 0.36),
  P("grass", -80, 0.76, undefined, 0.72),
];
// A CIDADE QUEIMADA — o fogo do anátema sobre as ruínas de Jericó.
const QUEIMA: StagePropSpec[] = [
  P("campfire", 160, 1.2, undefined, 0.5),
  P("tower", 60, 1.0, undefined, 0.32),
  P("rock", 260, 1.15, undefined, 0.6),
  P("rock", -40, 1.0, undefined, 0.68),
  P("rock", 330, 1.0, undefined, 0.4),
  P("grass", -140, 0.76, undefined, 0.72),
];
// A CASA DE RAABE na muralha — o cordão de escarlata, a família poupada.
const RAABE: StagePropSpec[] = [
  P("tower", 120, 1.4, undefined, 0.3),
  P("church", -160, 1.0, undefined, 0.36),
  P("rock", 300, 1.05, undefined, 0.5),
  P("palm", -330, 1.0, undefined, 0.14),
  P("grass", -40, 0.76, undefined, 0.7),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Js 5
  5: {
    start: { terrain: "field", night: 0.1, glory: 0.62, storm: 0, fire: 0, verdure: 0.35 },
    beats: [
      // v.1 — os reis dos amorreus e cananeus perdem o ânimo (o Jordão secado).
      b(1, { q: "desfaleceu-se-lhes o coração", set: "gilgal", props: GILGAL,
        env: { terrain: "field", glory: 0.5, night: 0.18, verdure: 0.32 }, cast: [
        C("rei", 210, "bow", { dy: 0.44, facing: -1, id: "amorreu" }),
        C("rei", 120, "bow", { dy: 0.4, facing: -1, id: "cananeu" }),
        C("servo", -160, "stand", { dy: 0.5, facing: 1, id: "josue" }),
      ] }),
      // v.2 — o SENHOR ordena: faze facas de pedra, torna a circuncidar. Voz do céu.
      dv(2, "Faze facas de pedra", { env: { glory: 0.6, night: 0.12 }, cast: [
        C("servo", 0, "kneel", { dy: 0.52, facing: 1, id: "josue" }),
      ] }),
      // v.3 — Josué circuncida no monte dos prepúcios: as facas de pedra.
      b(3, { q: "no monte dos prepúcios", set: "circuncisao", props: CIRC,
        env: { terrain: "field", glory: 0.55, night: 0.12, verdure: 0.3 }, cast: [
        C("servo", -120, "kneel", { dy: 0.52, facing: 1, id: "josue" }),
        C("homem", 120, "bow", { dy: 0.56, facing: -1, id: "jovem1" }),
        C("homem", 220, "stand", { dy: 0.5, facing: -1, id: "jovem2" }),
      ] }),
      // v.4 — a causa: os homens de guerra do Egito morreram no deserto.
      b(4, { q: "todos os homens de guerra, já haviam morrido no deserto",
        env: { glory: 0.4, night: 0.22, verdure: 0.2 }, cast: [
        C("multidao", 0, "walk", { dy: 0.5 }),
      ] }),
      // v.5 — os nascidos no deserto não tinham sido circuncidados.
      b(5, { q: "a nenhum dos que nasceram no deserto", cast: [
        C("servo", -100, "stand", { dy: 0.5, facing: 1, id: "josue" }),
        C("multidao", 120, "stand", { dy: 0.5 }),
      ] }),
      // v.6 — quarenta anos até se acabar a geração; a terra que mana leite e mel.
      b(6, { q: "terra que mana leite e mel", env: { glory: 0.52, verdure: 0.42 } }),
      // v.7 — a estes filhos Josué circuncidou.
      b(7, { q: "a estes Josué circuncidou", cast: [
        C("servo", -120, "kneel", { dy: 0.52, facing: 1, id: "josue" }),
        C("homem", 120, "bow", { dy: 0.56, facing: -1, id: "jovem1" }),
      ] }),
      // v.8 — ficaram no arraial até sararem.
      b(8, { q: "ficaram no seu lugar no arraial, até que sararam", set: "gilgal", props: GILGAL,
        env: { terrain: "field", glory: 0.5, night: 0.15, verdure: 0.35 }, cast: [
        C("homem", -120, "lie", { dy: 0.56, id: "ferido1" }),
        C("homem", 100, "bow", { dy: 0.54, facing: -1, id: "ferido2" }),
        C("mulherComum", 220, "kneel", { dy: 0.5, facing: -1, id: "cuidadora" }),
      ] }),
      // v.9 — o SENHOR: hoje retirei o opróbrio do Egito; o lugar chama-se Gilgal.
      dv(9, "o opróbrio do Egito", { env: { glory: 0.66, night: 0.1 }, cast: [
        C("servo", 0, "kneel", { dy: 0.52, facing: 1, id: "josue" }),
      ] }),
      // v.10 — a PÁSCOA nas campinas de Jericó, à tarde.
      b(10, { q: "celebraram a páscoa", set: "pascoa", props: PASCOA,
        env: { terrain: "field", glory: 0.55, night: 0.35, fire: 0.3, verdure: 0.35 }, cast: [
        C("multidao", -120, "stand", { dy: 0.5 }),
        C("servo", 120, "stand", { dy: 0.5, facing: -1, id: "josue" }),
      ] }),
      // v.11 — comem do fruto da terra: pães ázimos e espigas tostadas.
      b(11, { q: "do fruto da terra, pães ázimos e espigas tostadas", set: "frutos", props: FRUTOS,
        env: { terrain: "field", glory: 0.58, night: 0.12, verdure: 0.5 }, cast: [
        C("multidao", -100, "raise", { dy: 0.5 }),
        C("homem", 140, "stand", { dy: 0.52, facing: -1, id: "colheita" }),
      ] }),
      // v.12 — CESSA O MANÁ no dia seguinte; nunca mais o tiveram.
      b(12, { q: "cessou o maná no dia seguinte", set: "mana", props: MANA,
        env: { terrain: "field", glory: 0.6, night: 0.1, verdure: 0.55 }, cast: [
        C("multidao", 0, "stand", { dy: 0.5 }),
        C("homem", 170, "point", { dy: 0.52, facing: -1, id: "observador" }),
      ] }),
      // v.13 — TEOFANIA: o homem com a espada nua; Josué pergunta. (Josué fala)
      b(13, { by: "servo", q: "És tu dos nossos, ou dos nossos inimigos", set: "teofania", props: TEOFANIA,
        env: { terrain: "field", glory: 0.7, night: 0.12, fire: 0.06, verdure: 0.3 }, cast: [
        C("servo", -60, "stand", { dy: 0.52, facing: 1, id: "josue" }),
        C("anjo", 190, "stand", { dy: 0.4, facing: -1, glow: 0.9 }),
      ] }),
      // v.14 — o PRÍNCIPE do exército do SENHOR; Josué se prostra. (mediador: anjo)
      b(14, { by: "anjo", q: "como príncipe do exército do SENHOR", env: { glory: 0.8, fire: 0.06 }, cast: [
        C("anjo", 190, "raise", { dy: 0.4, facing: -1, glow: 1 }),
        C("servo", -40, "bow", { dy: 0.58, facing: 1, id: "josue" }),
      ] }),
      // v.15 — descalça os sapatos: o lugar é santo. (mediador: anjo)
      b(15, { by: "anjo", q: "o lugar em que estás é santo", env: { glory: 0.85, fire: 0.06 }, cast: [
        C("anjo", 190, "raise", { dy: 0.4, facing: -1, glow: 1 }),
        C("servo", -40, "kneel", { dy: 0.58, facing: 1, id: "josue" }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Js 6
  6: {
    start: { terrain: "field", night: 0.12, glory: 0.55, storm: 0, fire: 0, verdure: 0.2 },
    beats: [
      // v.1 — Jericó rigorosamente fechada; ninguém saía nem entrava.
      b(1, { q: "ninguém saía nem entrava", set: "jerico", props: JERICO,
        env: { terrain: "city", glory: 0.4, night: 0.2, verdure: 0.15 }, cast: [
        C("rei", 40, "stand", { dy: 0.36, facing: 1, id: "reijerico" }),
      ] }),
      // v.2 — o SENHOR: tenho dado na tua mão a Jericó. Voz do céu.
      dv(2, "tenho dado na tua mão a Jericó", { env: { glory: 0.62, night: 0.15 }, cast: [
        C("servo", -160, "kneel", { dy: 0.52, facing: 1, id: "josue" }),
      ] }),
      // v.3 — rodeareis a cidade seis dias.
      dv(3, "rodeareis a cidade", { env: { glory: 0.6 } }),
      // v.4 — sete sacerdotes, sete buzinas, a arca; no sétimo dia, sete voltas.
      dv(4, "sete sacerdotes levarão sete buzinas de chifres de carneiros", {
        set: "marcha", props: MARCHA, env: { terrain: "field", glory: 0.6, night: 0.12, verdure: 0.2 }, cast: [
        C("servo", -40, "stand", { dy: 0.5, facing: -1, id: "sac1" }),
        C("servo", 40, "stand", { dy: 0.5, facing: -1, id: "sac2" }),
      ] }),
      // v.5 — ao grande brado, o muro cairá abaixo.
      dv(5, "o muro da cidade cairá abaixo", { env: { glory: 0.6 } }),
      // v.6 — Josué: levai a arca da aliança e as sete buzinas. (Josué fala)
      b(6, { by: "servo", q: "Levai a arca da aliança", cast: [
        C("servo", -120, "point", { dy: 0.5, facing: -1, id: "josue" }),
        C("servo", 60, "stand", { dy: 0.5, facing: 1, id: "sac1" }),
        C("servo", 140, "stand", { dy: 0.5, facing: 1, id: "sac2" }),
      ] }),
      // v.7 — Josué ao povo: passai e rodeai a cidade. (Josué fala)
      b(7, { by: "servo", q: "Passai e rodeai a cidade", cast: [
        C("servo", -120, "raise", { dy: 0.5, facing: -1, id: "josue" }),
        C("multidao", 100, "walk", { dy: 0.5 }),
      ] }),
      // v.8 — os sete sacerdotes tocam as buzinas; a arca os segue.
      b(8, { q: "levando as sete buzinas de carneiros", env: { glory: 0.55 }, cast: [
        C("servo", -40, "walk", { dy: 0.5, facing: 1, id: "sac1" }),
        C("servo", 40, "walk", { dy: 0.5, facing: 1, id: "sac2" }),
        C("servo", 120, "walk", { dy: 0.5, facing: 1, id: "sac3" }),
      ] }),
      // v.9 — os armados adiante, a retaguarda após a arca, tocando as buzinas.
      b(9, { q: "andando e tocando as buzinas iam os sacerdotes", cast: [
        C("multidao", -120, "walk", { dy: 0.5, facing: 1 }),
        C("servo", 40, "walk", { dy: 0.5, facing: 1, id: "sac1" }),
        C("servo", 120, "walk", { dy: 0.5, facing: 1, id: "sac2" }),
      ] }),
      // v.10 — Josué ordena silêncio até o dia do brado. (Josué fala)
      b(10, { by: "servo", q: "nem sairá palavra alguma da vossa boca", cast: [
        C("servo", -120, "point", { dy: 0.5, facing: -1, id: "josue" }),
        C("multidao", 100, "stand", { dy: 0.5 }),
      ] }),
      // v.11 — a arca rodeou uma vez; passaram a noite no arraial.
      b(11, { q: "ali passaram a noite", set: "noite", props: NOITE,
        env: { terrain: "field", glory: 0.3, night: 0.7, verdure: 0.18 }, cast: [
        C("homem", -100, "lie", { dy: 0.56, id: "dorme1" }),
        C("homem", 80, "lie", { dy: 0.54, id: "dorme2" }),
      ] }),
      // v.12 — Josué se levantou de madrugada; os sacerdotes levam a arca.
      b(12, { q: "Josué se levantou de madrugada", set: "marcha", props: MARCHA,
        env: { terrain: "field", glory: 0.5, night: 0.3, verdure: 0.2 }, cast: [
        C("servo", -120, "stand", { dy: 0.5, facing: -1, id: "josue" }),
        C("servo", 40, "stand", { dy: 0.5, facing: 1, id: "sac1" }),
      ] }),
      // v.13 — os sacerdotes iam andando e tocando as buzinas.
      b(13, { q: "os sacerdotes iam andando e tocando as buzinas", env: { glory: 0.55, night: 0.14 }, cast: [
        C("servo", -40, "walk", { dy: 0.5, facing: 1, id: "sac1" }),
        C("servo", 40, "walk", { dy: 0.5, facing: 1, id: "sac2" }),
        C("multidao", 140, "walk", { dy: 0.5, facing: 1 }),
      ] }),
      // v.14 — rodearam a cidade no segundo dia; e assim seis dias.
      b(14, { q: "e assim fizeram seis dias", cast: [
        C("multidao", 0, "walk", { dy: 0.5, facing: 1 }),
        C("servo", 120, "walk", { dy: 0.5, facing: 1, id: "sac1" }),
      ] }),
      // v.15 — no sétimo dia, de madrugada, rodearam a cidade sete vezes.
      b(15, { q: "rodearam a cidade sete vezes", env: { glory: 0.6 }, cast: [
        C("servo", -40, "walk", { dy: 0.5, facing: 1, id: "sac1" }),
        C("servo", 40, "walk", { dy: 0.5, facing: 1, id: "sac2" }),
        C("multidao", 140, "walk", { dy: 0.5, facing: 1 }),
      ] }),
      // v.16 — Josué: Gritai, porque o SENHOR vos deu a cidade. (Josué fala)
      b(16, { by: "servo", q: "Gritai, porque o Senhor vos tem dado a cidade", env: { glory: 0.66 }, cast: [
        C("servo", -120, "raise", { dy: 0.5, facing: -1, id: "josue" }),
        C("multidao", 100, "raise", { dy: 0.5 }),
      ] }),
      // v.17 — a cidade é anátema; só Raabe viverá (escondeu os mensageiros). (Josué fala)
      b(17, { by: "servo", q: "somente a prostituta Raabe viverá", set: "raabe", props: RAABE,
        env: { terrain: "city", glory: 0.5, night: 0.15, verdure: 0.15 }, cast: [
        C("servo", -140, "point", { dy: 0.5, facing: -1, id: "josue" }),
        C("mulherComum", 120, "stand", { dy: 0.4, facing: -1, id: "raabe" }),
      ] }),
      // v.18 — guardai-vos do anátema, para não perturbar o arraial. (Josué fala)
      b(18, { by: "servo", q: "guardai-vos do anátema", cast: [
        C("servo", -120, "raise", { dy: 0.5, facing: -1, id: "josue" }),
        C("multidao", 100, "stand", { dy: 0.5 }),
      ] }),
      // v.19 — a prata e o ouro consagrados: irão ao tesouro do SENHOR. (Josué fala)
      b(19, { by: "servo", q: "irão ao tesouro do Senhor", env: { glory: 0.55 }, cast: [
        C("servo", -120, "point", { dy: 0.5, facing: -1, id: "josue" }),
        C("multidao", 100, "stand", { dy: 0.5 }),
      ] }),
      // v.20 — o GRANDE BRADO; o MURO CAI abaixo, o povo sobe à cidade.
      b(20, { q: "o muro caiu abaixo", set: "queda", props: QUEDA,
        env: { terrain: "city", glory: 0.6, night: 0.2, storm: 0.18, verdure: 0.12 }, cast: [
        C("multidao", -120, "raise", { dy: 0.5 }),
        C("servo", 120, "raise", { dy: 0.5, facing: -1, id: "josue" }),
      ] }),
      // v.21 — destruíram tudo ao fio da espada (juízo: individuais, sem festa).
      b(21, { q: "destruíram totalmente ao fio da espada",
        env: { terrain: "city", glory: 0.25, night: 0.45, storm: 0.1, verdure: 0.1 }, cast: [
        C("homem", -120, "lie", { dy: 0.56, id: "morto1" }),
        C("mulherComum", -20, "bow", { dy: 0.52, id: "morta2" }),
        C("homem", 180, "lie", { dy: 0.54, id: "morto3" }),
      ] }),
      // v.22 — Josué envia os dois espias à casa de Raabe. (Josué fala)
      b(22, { by: "servo", q: "Entrai na casa da mulher prostituta", set: "raabe", props: RAABE,
        env: { terrain: "city", glory: 0.4, night: 0.35, verdure: 0.12 }, cast: [
        C("servo", -140, "point", { dy: 0.5, facing: -1, id: "josue" }),
        C("homem", 40, "walk", { dy: 0.52, facing: -1, id: "espia1" }),
        C("homem", 120, "walk", { dy: 0.5, facing: -1, id: "espia2" }),
      ] }),
      // v.23 — os espias tiram Raabe, seus pais e toda a parentela.
      b(23, { q: "tiraram a Raabe", env: { glory: 0.45, night: 0.3 }, cast: [
        C("homem", -80, "walk", { dy: 0.52, facing: 1, id: "espia1" }),
        C("mulherComum", 40, "walk", { dy: 0.52, facing: 1, id: "raabe" }),
        C("mulherComum", 130, "walk", { dy: 0.5, facing: 1, id: "mae" }),
        C("homem", 210, "walk", { dy: 0.5, facing: 1, id: "pai" }),
      ] }),
      // v.24 — a cidade queimada a fogo; a prata e o ouro ao tesouro do SENHOR.
      b(24, { q: "queimaram a fogo", set: "queima", props: QUEIMA,
        env: { terrain: "city", glory: 0.35, night: 0.5, fire: 0.5, storm: 0.1, verdure: 0.1 }, cast: [
        C("multidao", -140, "stand", { dy: 0.5, facing: 1 }),
        C("servo", 140, "stand", { dy: 0.5, facing: -1, id: "josue" }),
      ] }),
      // v.25 — Josué deu vida a Raabe; habitou no meio de Israel.
      b(25, { q: "deu Josué vida à prostituta Raabe", set: "marcha", props: MARCHA,
        env: { terrain: "field", glory: 0.6, night: 0.14, verdure: 0.35 }, cast: [
        C("servo", -120, "stand", { dy: 0.5, facing: -1, id: "josue" }),
        C("mulherComum", 60, "stand", { dy: 0.52, facing: -1, id: "raabe" }),
        C("multidao", 180, "stand", { dy: 0.5 }),
      ] }),
      // v.26 — Josué esconjura: maldito quem reedificar Jericó. (Josué fala)
      b(26, { by: "servo", q: "reedificar esta cidade de Jericó", set: "queima", props: QUEIMA,
        env: { terrain: "city", glory: 0.3, night: 0.5, fire: 0.2, verdure: 0.08 }, cast: [
        C("servo", -120, "raise", { dy: 0.5, facing: -1, id: "josue" }),
      ] }),
      // v.27 — o SENHOR era com Josué; a sua fama corria por toda a terra.
      b(27, { q: "corria a sua fama por toda a terra", set: "marcha", props: MARCHA,
        env: { terrain: "field", glory: 0.72, night: 0.1, verdure: 0.4 }, cast: [
        C("servo", 0, "stand", { dy: 0.5, facing: 1, id: "josue" }),
        C("multidao", 160, "stand", { dy: 0.5 }),
      ] }),
    ],
  },
};
