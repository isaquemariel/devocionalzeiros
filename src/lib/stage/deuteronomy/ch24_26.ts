// ============================================================================
// DEUTERONÔMIO 24–26 — CENA VIVA. Leis de misericórdia; a justa medida;
// AMALEQUE; e as PRIMÍCIAS no cesto com a confissão do "arameu errante".
//
// Campinas de Moabe, além do Jordão, fim dos 40 anos. MOISÉS (120 anos) prega
// a Lei a todo o Israel (`by: "moises"`, o mediador visível). Aqui as leis do
// convívio justo culminam no grande rito de gratidão do cap. 26.
//
// Dt 24 — MISERICÓRDIA COTIDIANA: a carta de repúdio; o recém-casado livre um
// ano "para alegrar a mulher"; não penhorar a mó (a vida do pobre); pagar ao
// jornaleiro no mesmo dia; e a bela RESPIGA — o molho esquecido no campo, as
// azeitonas e as uvas deixadas para o estrangeiro, o órfão e a viúva.
//
// Dt 25 — A JUSTA MEDIDA: os açoites contados (até 40, não mais); "não atarás
// a boca ao boi que trilha"; o levirato e a sandália tirada; PESOS e efa justos;
// e o mandado de APAGAR a memória de AMALEQUE, que feriu os fracos na retaguarda
// (flashback do ataque no deserto).
//
// Dt 26 — AS PRIMÍCIAS E A CONFISSÃO: o cesto dos primeiros frutos levado ao
// lugar do Nome e posto diante do altar; a confissão histórica do adorador —
// "Arameu, prestes a perecer, foi meu pai" — recontando a descida ao Egito, a
// servidão, o clamor e a saída com mão forte para a terra que mana leite e mel;
// o dízimo do terceiro ano ao levita/estrangeiro/órfão/viúva; e o selo da
// aliança: "hoje... serás povo seu".
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const mv = (v: number, q?: string) => b(v, { by: "moises", ...(q ? { q } : {}) }); // Moisés prega
const hv = (v: number, q?: string) => b(v, { by: "homem", ...(q ? { q } : {}) });   // o adorador confessa

// Cenário base: campinas de Moabe, o Jordão ao fundo, o arraial e o monte Nebo.
const MOABE: StagePropSpec[] = [
  P("river", 0, 1.4, undefined, 0.86),
  P("tent", -230, 1.1, undefined, 0.2),
  P("tent", 210, 1.05, undefined, 0.24),
  P("palm", -320, 1.05, undefined, 0.14),
  P("grass", -70, 0.8, undefined, 0.82),
  P("grass", 90, 0.78, undefined, 0.72),
];
// O CAMPO DA COLHEITA — a respiga deixada aos pobres (Dt 24:19-22).
const RESPIGA: StagePropSpec[] = [
  { ...P("sheaf", -140, 1.2, undefined, 0.6), tag: "molho-esquecido" },
  P("sheaf", 40, 1.0, undefined, 0.7),
  P("grapes", 190, 1.1, undefined, 0.56),
  P("tree", -290, 1.15, undefined, 0.28),
  P("grass", -40, 0.82, undefined, 0.82),
  P("grass", 110, 0.78, undefined, 0.7),
];
// O DESERTO DO ATAQUE DE AMALEQUE — a retaguarda ferida (Dt 25:17-18).
const AMALEQUE: StagePropSpec[] = [
  P("rock", -150, 1.2, undefined, 0.34),
  P("rock", 260, 1.1, undefined, 0.3),
  P("palm", -310, 1.0, undefined, 0.14),
  P("grass", -40, 0.7, undefined, 0.6),
];
// O ALTAR COM O CESTO DAS PRIMÍCIAS — o rito de gratidão (Dt 26).
const PRIMICIAS: StagePropSpec[] = [
  { ...P("altar", -20, 1.35, undefined, 0.32), tag: "altar-do-nome" },
  { ...P("crate", 60, 1.0, undefined, 0.64), tag: "cesto-primicias" },
  P("sheaf", 150, 0.95, undefined, 0.66),
  P("grapes", 220, 1.0, undefined, 0.58),
  P("tent", 300, 0.95, undefined, 0.24),
];
// A DESCIDA AO EGITO — o arameu errante com pouca gente (Dt 26:5).
const EGITO: StagePropSpec[] = [
  P("tent", -180, 1.0, undefined, 0.3),
  P("ziggurat", 180, 1.2, undefined, 0.3),
  P("palm", -320, 1.05, undefined, 0.14),
  P("grass", 40, 0.7, undefined, 0.6),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Dt 24
  24: {
    start: { terrain: "field", night: 0.1, glory: 0.6, storm: 0, fire: 0, verdure: 0.4 },
    beats: [
      b(1, { by: "moises", q: "far-lhe-á uma carta de repúdio", props: MOABE, env: { terrain: "field", glory: 0.6, night: 0.1, verdure: 0.4 }, cast: [ // a carta de repúdio
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("homem", 40, "stand", { dy: 0.52, facing: -1, id: "marido" }),
        C("mulherComum", 130, "stand", { dy: 0.5, facing: -1, id: "esposa" }),
      ] }),
      mv(2, "for e se casar com outro homem"),
      mv(3, "vier a morrer"),
      mv(4, "não poderá tornar a tomá-la"),
      b(5, { by: "moises", q: "para alegrar a mulher", env: { glory: 0.68 }, cast: [ // o recém-casado livre um ano
        C("homem", -30, "stand", { dy: 0.52, facing: 1, id: "noivo" }),
        C("mulher", 60, "stand", { dy: 0.5 }),
      ] }),
      b(6, { by: "moises", q: "Não se tomará em penhor ambas as mós", cast: [ // não penhorar a mó — a vida do pobre
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
      ] }),
      mv(7, "esse ladrão morrerá"),
      mv(8, "Guarda-te da praga da lepra"),
      b(9, { by: "moises", q: "Lembra-te do que o Senhor teu Deus fez a Miriã", cast: [ // lembra-te de Miriã
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      mv(10, "não entrarás em sua casa, para lhe tirar o penhor"),
      mv(11, "Fora ficarás"),
      mv(12, "não te deitarás com o seu penhor"),
      b(13, { by: "moises", q: "Em se pondo o sol, sem falta lhe restituirás o penhor", cast: [ // restituir a roupa ao pôr do sol
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("homem", 120, "stand", { dy: 0.5, facing: -1, id: "pobre" }),
      ] }),
      b(14, { by: "moises", q: "Não oprimirás o diarista pobre e necessitado", cast: [ // não oprimir o jornaleiro pobre
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("homem", 110, "kneel", { dy: 0.5, facing: -1, id: "jornaleiro" }),
      ] }),
      mv(15, "No seu dia lhe pagarás a sua diária"),
      mv(16, "cada um morrerá pelo seu pecado"),
      mv(17, "nem tomarás em penhor a roupa da viúva"),
      mv(18, "lembrar-te-ás de que foste servo no Egito"),
      // v.19-22 — A RESPIGA: o quadro de misericórdia no campo.
      b(19, { by: "moises", q: "esqueceres um molho no campo", props: RESPIGA, env: { terrain: "field", glory: 0.72, night: 0.08, verdure: 0.7 }, cast: [ // o molho esquecido fica para o pobre
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("mulherComum", 120, "kneel", { dy: 0.6, facing: -1, id: "viuva" }),
        C("servo", 200, "kneel", { dy: 0.56, facing: -1, id: "orfao" }),
      ] }),
      b(20, { by: "moises", q: "Quando sacudires a tua oliveira", cast: [ // as azeitonas deixadas nos ramos
        C("moises", -160, "raise", { dy: 0.5, facing: 1 }),
        C("homem", 150, "stand", { dy: 0.52, facing: -1, id: "estrangeiro" }),
      ] }),
      b(21, { by: "moises", q: "Quando vindimares a tua vinha", cast: [ // as uvas rebuscadas deixadas
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("mulherComum", 140, "kneel", { dy: 0.58, facing: -1, id: "viuva" }),
      ] }),
      mv(22, "lembrar-te-ás de que foste servo na terra do Egito"),
    ],
  },

  // ------------------------------------------------------------------ Dt 25
  25: {
    start: { terrain: "field", night: 0.1, glory: 0.58, storm: 0, fire: 0, verdure: 0.35 },
    beats: [
      b(1, { by: "moises", q: "ao justo justificarão, e ao injusto condenarão", props: MOABE, env: { terrain: "field", glory: 0.58, night: 0.1, verdure: 0.35 }, cast: [ // o juízo justo
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      mv(2, "se o injusto merecer açoites"),
      b(3, { by: "moises", q: "Quarenta açoites lhe fará dar, não mais", cast: [ // até 40 açoites, não mais — a medida da justiça
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("homem", 120, "lie", { dy: 0.6, facing: 1, id: "reo" }),
      ] }),
      b(4, { by: "moises", q: "Não atarás a boca ao boi, quando trilhar", props: [ // o boi que trilha come do grão
        P("stall", 120, 1.0, undefined, 0.56),
        P("sheaf", 210, 1.0, undefined, 0.64),
        P("sheaf", 40, 0.9, undefined, 0.7),
        P("palm", -320, 1.0, undefined, 0.14),
        P("grass", -60, 0.8, undefined, 0.8),
      ], cast: [
        C("moises", -170, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      b(5, { by: "moises", q: "seu cunhado estará com ela", cast: [ // o levirato — o dever do cunhado
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("homem", 60, "stand", { dy: 0.52, facing: -1, id: "cunhado" }),
        C("mulherComum", 150, "stand", { dy: 0.5, facing: -1, id: "viuva" }),
      ] }),
      mv(6, "para que o seu nome não se apague em Israel"),
      b(7, { by: "moises", q: "esta subirá à porta dos anciãos", cast: [ // a viúva à porta dos anciãos
        C("mulherComum", -40, "stand", { dy: 0.5, facing: 1, id: "viuva" }),
        C("anciao", 130, "stand", { dy: 0.5, facing: -1 }),
        C("anciao", 210, "stand", { dy: 0.48, facing: -1, id: "anc2" }),
      ] }),
      mv(8, "os anciãos da sua cidade o chamarão"),
      b(9, { by: "moises", q: "lhe descalçará o sapato do pé", cast: [ // a sandália tirada, o protesto
        C("mulherComum", -40, "raise", { dy: 0.5, facing: 1, id: "viuva" }),
        C("homem", 90, "stand", { dy: 0.52, facing: -1, id: "cunhado" }),
        C("anciao", 190, "stand", { dy: 0.48, facing: -1 }),
      ] }),
      mv(10, "A casa do descalçado"),
      mv(11, "Quando pelejarem dois homens"),
      mv(12, "cortar-lhe-ás a mão"),
      // v.13-16 — PESOS E MEDIDAS JUSTOS.
      b(13, { by: "moises", q: "Na tua bolsa não terás pesos diversos", env: { glory: 0.6 }, cast: [ // nada de pesos falsos
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      mv(14, "não terás dois tipos de efa"),
      b(15, { by: "moises", q: "Peso inteiro e justo terás", props: [ // peso inteiro e justo — a bênção da longevidade
        P("amphora", 130, 1.0, undefined, 0.56),
        P("amphora", 210, 0.85, undefined, 0.6),
        P("tent", -240, 1.05, undefined, 0.22),
        P("grass", -60, 0.8, undefined, 0.8),
      ], env: { glory: 0.72 }, cast: [
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
      ] }),
      mv(16, "todo aquele que fizer injustiça"),
      // v.17-19 — AMALEQUE: flashback do ataque à retaguarda.
      b(17, { by: "moises", q: "Lembra-te do que te fez Amaleque no caminho", props: AMALEQUE, env: { terrain: "desert", glory: 0.2, night: 0.4, storm: 0.2, verdure: 0.08 }, cast: [ // lembra-te de Amaleque
        C("moises", -170, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      b(18, { by: "moises", q: "feriu na tua retaguarda todos os fracos", env: { glory: 0.15, night: 0.45, storm: 0.25 }, cast: [ // os fracos feridos na retaguarda
        C("homem", -40, "lie", { dy: 0.64, facing: 1, id: "fraco1" }),
        C("mulherComum", 80, "kneel", { dy: 0.6, facing: -1, id: "cansada" }),
        C("servo", 190, "lie", { dy: 0.62, facing: 1, id: "fraco2" }),
      ] }),
      b(19, { by: "moises", q: "apagarás a memória de Amaleque de debaixo do céu", env: { glory: 0.25, night: 0.35 }, cast: [ // apagar a memória de Amaleque
        C("moises", -160, "raise", { dy: 0.5, facing: 1 }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Dt 26
  26: {
    start: { terrain: "field", night: 0.08, glory: 0.66, storm: 0, fire: 0, verdure: 0.5 },
    beats: [
      b(1, { by: "moises", q: "quando entrares na terra", props: MOABE, env: { terrain: "field", glory: 0.66, night: 0.08, verdure: 0.5 }, cast: [ // ao entrar e possuir a terra
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      b(2, { by: "moises", q: "as porás num cesto", props: PRIMICIAS, env: { terrain: "field", glory: 0.78, night: 0.06, verdure: 0.6 }, cast: [ // as primícias postas no cesto
        C("homem", -150, "stand", { dy: 0.52, facing: 1, id: "adorador" }),
      ] }),
      b(3, { by: "homem", q: "Hoje declaro perante o Senhor teu Deus", cast: [ // a declaração ao sacerdote
        C("homem", -130, "stand", { dy: 0.52, facing: 1, id: "adorador" }),
        C("servo", 60, "stand", { dy: 0.52, facing: -1, glow: 0.25, id: "sacerdote-israel" }),
      ] }),
      b(4, { by: "moises", q: "o sacerdote tomará o cesto da tua mão", env: { glory: 0.82 }, cast: [ // o cesto posto diante do altar
        C("homem", -130, "bow", { dy: 0.54, facing: 1, id: "adorador" }),
        C("servo", 40, "raise", { dy: 0.52, facing: -1, glow: 0.3, id: "sacerdote-israel" }),
      ] }),
      // v.5-10 — A CONFISSÃO DO "ARAMEU ERRANTE": o adorador reconta a história.
      b(5, { by: "homem", q: "Arameu, prestes a perecer, foi meu pai", props: EGITO, env: { terrain: "desert", glory: 0.4, night: 0.2, verdure: 0.15 }, cast: [ // a descida ao Egito com pouca gente
        C("patriarca", -140, "walk", { dy: 0.54, facing: 1 }),
        C("mulherComum", -50, "walk", { dy: 0.52, facing: 1, id: "familia" }),
        C("servo", 40, "walk", { dy: 0.5, facing: 1, id: "filho" }),
      ] }),
      b(6, { by: "homem", q: "os egípcios nos maltrataram e nos afligiram", env: { glory: 0.15, night: 0.4, storm: 0.15 }, cast: [ // a dura servidão
        C("servo", -60, "kneel", { dy: 0.58, facing: 1, id: "escravo1" }),
        C("homem", 70, "bow", { dy: 0.56, facing: -1, id: "escravo2" }),
        C("mulherComum", 180, "kneel", { dy: 0.6, facing: 1, id: "escrava" }),
      ] }),
      b(7, { by: "homem", q: "clamamos ao Senhor Deus de nossos pais", env: { glory: 0.3, night: 0.3 }, cast: [ // o clamor ouvido
        C("homem", -40, "raise", { dy: 0.54, facing: 1, id: "clamor1" }),
        C("mulherComum", 90, "kneel", { dy: 0.58, facing: -1, id: "clamor2" }),
      ] }),
      b(8, { by: "homem", q: "nos tirou do Egito com mão forte", env: { terrain: "desert", glory: 0.7, night: 0.1, verdure: 0.15 }, cast: [ // a saída com mão forte
        C("moises", -120, "raise", { dy: 0.5, facing: 1, glow: 0.3 }),
        C("multidao", 120, "walk", { dy: 0.46 }),
      ] }),
      b(9, { by: "homem", q: "terra que mana leite e mel", env: { terrain: "field", glory: 0.82, night: 0.06, verdure: 0.7 }, cast: [ // a boa terra
        C("multidao", 120, "walk", { dy: 0.46 }),
      ] }),
      b(10, { by: "homem", q: "eu trouxe as primícias dos frutos da terra", props: PRIMICIAS, env: { terrain: "field", glory: 0.85, night: 0.05, verdure: 0.6 }, cast: [ // o cesto posto e a adoração
        C("homem", -120, "bow", { dy: 0.54, facing: 1, id: "adorador" }),
        C("servo", 40, "stand", { dy: 0.52, facing: -1, glow: 0.3, id: "sacerdote-israel" }),
      ] }),
      b(11, { by: "moises", q: "te alegrarás por todo o bem", env: { glory: 0.88 }, cast: [ // a alegria com o levita e o estrangeiro
        C("homem", -110, "raise", { dy: 0.52, facing: 1, id: "adorador" }),
        C("multidao", 130, "stand", { dy: 0.46 }),
      ] }),
      // v.12-15 — O DÍZIMO DO TERCEIRO ANO e a oração.
      b(12, { by: "moises", q: "no ano terceiro, que é o ano dos dízimos", props: PRIMICIAS, env: { terrain: "field", glory: 0.72, night: 0.08, verdure: 0.55 }, cast: [ // o dízimo ao levita, estrangeiro, órfão e viúva
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("servo", 60, "stand", { dy: 0.52, facing: -1, id: "levita" }),
        C("mulherComum", 160, "stand", { dy: 0.5, facing: -1, id: "viuva" }),
      ] }),
      b(13, { by: "homem", q: "as dei também ao levita", cast: [ // a confissão do dízimo
        C("homem", -120, "raise", { dy: 0.52, facing: 1, id: "adorador" }),
        C("servo", 100, "stand", { dy: 0.52, facing: -1, id: "levita" }),
      ] }),
      hv(14, "obedeci à voz do Senhor meu Deus"),
      b(15, { by: "homem", q: "abençoa o teu povo, a Israel", env: { glory: 0.85 }, cast: [ // a oração pela bênção do alto
        C("homem", -60, "raise", { dy: 0.52, facing: 1, id: "adorador" }),
        C("multidao", 120, "stand", { dy: 0.46 }),
      ] }),
      // v.16-19 — O SELO DA ALIANÇA.
      b(16, { by: "moises", q: "com todo o teu coração e com toda a tua alma", props: MOABE, env: { terrain: "field", glory: 0.7, night: 0.08, verdure: 0.5 }, cast: [ // cumprir de todo o coração
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.46 }),
      ] }),
      b(17, { by: "moises", q: "Hoje declaraste ao Senhor", env: { glory: 0.8 }, cast: [ // hoje declaraste que Ele é teu Deus
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.46 }),
      ] }),
      b(18, { by: "moises", q: "tu lhe serás por seu próprio povo", env: { glory: 0.9 }, cast: [ // e o Senhor te declarou povo seu
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.46 }),
      ] }),
      b(19, { by: "moises", q: "sejas um povo santo ao Senhor teu Deus", env: { glory: 0.98 }, cast: [ // povo santo, exaltado sobre as nações
        C("moises", -150, "raise", { dy: 0.5, facing: 1, glow: 0.3 }),
        C("multidao", 120, "stand", { dy: 0.46 }),
        C("multidao", 210, "stand", { scale: 0.9, dy: 0.42, id: "povo2" }),
      ] }),
    ],
  },
};
