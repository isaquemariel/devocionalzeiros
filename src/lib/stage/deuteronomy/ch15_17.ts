// ============================================================================
// DEUTERONÔMIO 15–17 — CENA VIVA. Nas campinas de Moabe, Moisés prega a Lei a
// todo o Israel, o Jordão ao fundo, antes de morrer sem entrar na terra.
//
// Dt 15 — O ANO DA REMISSÃO: de sete em sete anos perdoam-se as dívidas; a
// generosidade ao pobre ("livremente abrirás a tua mão"); a ALFORRIA do servo
// hebreu no sétimo ano — e o que quer ficar tem a orelha furada à porta com a
// SOVELA; os primogênitos do gado consagrados ao Senhor.
//
// Dt 16 — AS TRÊS FESTAS: a PÁSCOA (mês de Abibe, de noite, o cordeiro no altar,
// a saída do Egito); a festa das SEMANAS (a foice na seara, os feixes, a alegria
// da colheita); a festa dos TABERNÁCULOS (sete dias em cabanas, ramos, júbilo).
// "Três vezes no ano todo o homem aparecerá perante o Senhor." Juízes às portas;
// "A JUSTIÇA, somente a justiça seguirás."
//
// Dt 17 — JUÍZO entre sangue e sangue; a TESTEMUNHA (por duas ou três, não por
// uma); e o REI que o Senhor escolher — que não multiplique cavalos, mulheres
// nem prata, e ESCREVA para si num livro um traslado da Lei, e nele leia todos
// os dias da sua vida.
//
// VOZ: MOISÉS, o mediador visível pregando (`by: "moises"`). O flashback do
// Egito e as festas ganham cena própria — nunca cabeça falante repetida.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const mv = (v: number, q?: string) => b(v, { by: "moises", ...(q ? { q } : {}) }); // Moisés prega

// Campinas de Moabe — o Jordão ao fundo, o monte, as tendas do arraial.
const MOABE: StagePropSpec[] = [
  P("river", 0, 1.3, undefined, 0.16),
  P("rock", -330, 1.0, undefined, 0.2),
  P("tent", -270, 1.0, undefined, 0.2),
  P("tent", 250, 1.0, undefined, 0.22),
  P("palm", 320, 1.05, undefined, 0.14),
  P("grass", -60, 0.82, undefined, 0.82),
  P("grass", 60, 0.78, undefined, 0.74),
];

const PREGA: CastPlacement[] = [
  C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
  C("multidao", 140, "stand", { dy: 0.46 }),
];

// A Páscoa — o mês de Abibe, de noite, o cordeiro sobre o altar em chama.
const PASCOA: StagePropSpec[] = [
  { ...P("altar", 0, 1.25, 0.85, 0.4), tag: "pascoa" },
  P("tent", -260, 1.0, undefined, 0.2),
  P("tent", 240, 1.0, undefined, 0.22),
  P("campfire", 210, 0.9, 0.8, 0.52),
];

// A festa das Semanas — a foice na seara, os feixes da colheita, o verdor alto.
const SEMANAS: StagePropSpec[] = [
  { ...P("sheaf", -40, 1.15, undefined, 0.6), tag: "feixes" },
  P("sheaf", 70, 1.0, undefined, 0.55),
  P("sheaf", 190, 0.95, undefined, 0.5),
  P("altar", -190, 1.0, undefined, 0.35),
  P("grass", 110, 0.82, undefined, 0.8),
];

// A festa dos Tabernáculos — sete dias em cabanas, ramos de palma, júbilo.
const TABERNACULOS: StagePropSpec[] = [
  { ...P("tent", 0, 1.25, undefined, 0.28), tag: "cabana" },
  P("tent", -220, 1.15, undefined, 0.3),
  P("tent", 210, 1.1, undefined, 0.32),
  P("palm", -320, 1.1, undefined, 0.14),
  P("palm", 320, 1.1, undefined, 0.16),
  P("grass", -80, 0.8, undefined, 0.82),
];

// O trono do rei que o Senhor escolher, entre as suas cidades.
const REI: StagePropSpec[] = [
  { ...P("throne", 50, 1.2, undefined, 0.3), tag: "trono" },
  P("tower", -300, 0.95, undefined, 0.12),
  P("tower", 300, 0.9, undefined, 0.14),
  P("grass", -80, 0.78, undefined, 0.82),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Dt 15
  15: {
    start: { terrain: "field", night: 0.1, glory: 0.62, storm: 0, fire: 0, verdure: 0.45 },
    beats: [
      b(1, { by: "moises", q: "farás remissão", props: MOABE,
        env: { terrain: "field", glory: 0.62, night: 0.1, verdure: 0.45 }, cast: PREGA }),
      mv(2, "a remissão do Senhor é apregoada"),
      mv(3, "a tua mão o remitirá"),
      mv(4, "não houver entre ti pobre algum"),
      mv(5, "ouvires diligentemente a voz do Senhor"),
      mv(6, "emprestarás a muitas nações"),
      // v.7-11 — a GENEROSIDADE ao pobre: a mão aberta de par em par.
      b(7, { by: "moises", q: "não endurecerás o teu coração", env: { glory: 0.6 }, cast: [
        C("moises", -140, "point", { dy: 0.5, facing: 1 }),
        C("homem", 60, "kneel", { dy: 0.52, facing: -1, id: "pobre" }),
      ] }),
      b(8, { by: "moises", q: "lhe abrirás de todo a tua mão", cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1 }),
        C("homem", 60, "kneel", { dy: 0.52, facing: -1, id: "pobre" }),
      ] }),
      mv(9, "o ano da remissão"),
      mv(10, "Livremente lhe darás"),
      b(11, { by: "moises", q: "Livremente abrirás a tua mão", env: { glory: 0.66 }, cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1 }),
        C("homem", 60, "bow", { dy: 0.52, facing: -1, id: "pobre" }),
      ] }),
      // v.12-18 — a ALFORRIA do servo hebreu no sétimo ano.
      b(12, { by: "moises", q: "seis anos te servirá", cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("servo", 60, "stand", { dy: 0.52, facing: -1, id: "servo-hebreu" }),
      ] }),
      mv(13, "não o despedirás vazio"),
      b(14, { by: "moises", q: "Liberalmente o fornecerás do teu rebanho", cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("servo", 40, "walk", { dy: 0.52, facing: -1, id: "servo-hebreu" }),
        C("rebanho", 200, "walk", { dy: 0.46 }),
      ] }),
      mv(15, "foste servo na terra do Egito"),
      mv(16, "Não sairei de ti"),
      // v.17 — a SOVELA: a orelha furada à porta, servo para sempre.
      b(17, { by: "moises", q: "lhe furarás a orelha à porta", props: [
        { ...P("door", 50, 1.3, undefined, 0.4), tag: "porta" },
        P("tent", -260, 1.0, undefined, 0.2),
        P("tent", 240, 1.0, undefined, 0.22),
        P("grass", -60, 0.82, undefined, 0.82),
      ], env: { terrain: "field", glory: 0.55, night: 0.12, verdure: 0.4 }, cast: [
        C("servo", 10, "kneel", { dy: 0.56, facing: 1, id: "servo-hebreu" }),
        C("homem", -120, "stand", { dy: 0.5, facing: 1, id: "senhor" }),
      ] }),
      mv(18, "assim o Senhor teu Deus te abençoará"),
      // v.19-23 — os primogênitos do gado consagrados.
      b(19, { by: "moises", q: "o macho santificarás ao Senhor", props: [
        { ...P("altar", 0, 1.2, 0.3, 0.4), tag: "altar" },
        P("stall", 180, 1.0, undefined, 0.45),
        P("tent", -270, 1.0, undefined, 0.2),
        P("grass", -60, 0.82, undefined, 0.82),
      ], env: { terrain: "field", glory: 0.6, night: 0.1, verdure: 0.42 }, cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("cordeiro", 90, "stand", { dy: 0.5 }),
      ] }),
      mv(20, "Perante o Senhor teu Deus os comerás"),
      mv(21, "havendo nele algum defeito"),
      mv(22, "Nas tuas portas o comerás"),
      mv(23, "Somente o seu sangue não comerás"),
    ],
  },

  // ------------------------------------------------------------------ Dt 16
  16: {
    start: { terrain: "field", night: 0.7, glory: 0.15, storm: 0, fire: 0.6, verdure: 0.3 },
    beats: [
      // v.1-8 — a PÁSCOA: mês de Abibe, de noite, o cordeiro, a saída do Egito.
      b(1, { by: "moises", q: "celebra a páscoa ao SENHOR", props: PASCOA,
        env: { terrain: "field", glory: 0.12, night: 0.72, fire: 0.6, verdure: 0.28 }, cast: [
          C("moises", -160, "raise", { dy: 0.5, facing: 1 }),
          C("cordeiro", 30, "stand", { dy: 0.5 }),
          C("multidao", 170, "stand", { dy: 0.46 }),
        ] }),
      b(2, { by: "moises", q: "sacrificarás a páscoa ao Senhor", cast: [
        C("moises", -160, "raise", { dy: 0.5, facing: 1 }),
        C("cordeiro", 40, "stand", { dy: 0.5 }),
      ] }),
      mv(3, "pão de aflição"),
      mv(4, "Levedado não aparecerá contigo"),
      mv(5, "Não poderás sacrificar a páscoa"),
      mv(6, "ao pôr do sol"),
      mv(7, "irás às tuas tendas"),
      mv(8, "nenhum trabalho farás"),
      // v.9-12 — a festa das SEMANAS: a foice na seara, os feixes, a alegria.
      b(9, { by: "moises", q: "a foice começar na seara", props: SEMANAS,
        env: { terrain: "field", glory: 0.72, night: 0.08, fire: 0, verdure: 0.85 }, cast: [
          C("moises", -160, "raise", { dy: 0.5, facing: 1 }),
          C("homem", 40, "stand", { dy: 0.52, facing: -1, id: "ceifeiro" }),
        ] }),
      b(10, { by: "moises", q: "celebrarás a festa das semanas", cast: [
        C("moises", -160, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
      b(11, { by: "moises", q: "te alegrarás perante o Senhor", env: { glory: 0.8 }, cast: [
        C("moises", -160, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.46 }),
        C("multidao", 220, "stand", { scale: 0.9, dy: 0.42, id: "povo2" }),
      ] }),
      mv(12, "foste servo no Egito"),
      // v.13-15 — a festa dos TABERNÁCULOS: sete dias em cabanas, ramos, júbilo.
      b(13, { by: "moises", q: "A festa dos tabernáculos celebrarás sete dias", props: TABERNACULOS,
        env: { terrain: "field", glory: 0.75, night: 0.08, fire: 0, verdure: 0.7 }, cast: [
          C("moises", -160, "raise", { dy: 0.5, facing: 1 }),
          C("multidao", 150, "stand", { dy: 0.46 }),
        ] }),
      b(14, { by: "moises", q: "na tua festa, alegrar-te-ás", env: { glory: 0.82 }, cast: [
        C("moises", -160, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 140, "stand", { dy: 0.46 }),
      ] }),
      b(15, { by: "moises", q: "certamente te alegrarás", env: { glory: 0.86 }, cast: [
        C("multidao", 0, "stand", { dy: 0.48 }),
        C("multidao", 180, "stand", { scale: 0.9, dy: 0.44, id: "povo2" }),
      ] }),
      // v.16-17 — três vezes no ano diante do Senhor.
      b(16, { by: "moises", q: "Três vezes no ano", props: MOABE,
        env: { terrain: "field", glory: 0.66, night: 0.1, fire: 0, verdure: 0.45 }, cast: PREGA }),
      mv(17, "conforme ao dom da sua mão"),
      // v.18-20 — JUÍZES às portas; A JUSTIÇA, somente a justiça.
      b(18, { by: "moises", q: "Juízes e oficiais porás", props: [
        { ...P("door", 40, 1.3, undefined, 0.4), tag: "portas" },
        P("tower", -300, 0.95, undefined, 0.12),
        P("tower", 300, 0.9, undefined, 0.14),
        P("grass", -70, 0.8, undefined, 0.82),
      ], env: { terrain: "field", glory: 0.58, night: 0.12, verdure: 0.4 }, cast: [
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("homem", 90, "stand", { dy: 0.52, facing: -1, id: "juiz" }),
      ] }),
      mv(19, "nem receberás peitas"),
      b(20, { by: "moises", q: "A justiça, somente a justiça seguirás", env: { glory: 0.7 }, cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 140, "stand", { dy: 0.46 }),
      ] }),
      // v.21-22 — nada de árvore junto ao altar, nada de imagem.
      b(21, { by: "moises", q: "Não plantarás nenhuma árvore junto ao altar", props: [
        { ...P("altar", 40, 1.2, 0.2, 0.4), tag: "altar" },
        P("tree", 200, 1.1, undefined, 0.35),
        P("tent", -270, 1.0, undefined, 0.2),
        P("grass", -60, 0.82, undefined, 0.82),
      ], env: { terrain: "field", glory: 0.55, night: 0.12, verdure: 0.42 }, cast: [
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
      ] }),
      mv(22, "Nem levantarás imagem"),
    ],
  },

  // ------------------------------------------------------------------ Dt 17
  17: {
    start: { terrain: "field", night: 0.12, glory: 0.55, storm: 0, fire: 0, verdure: 0.42 },
    beats: [
      b(1, { by: "moises", q: "boi ou gado miúdo em que haja defeito", props: [
        { ...P("altar", 0, 1.2, 0.3, 0.4), tag: "altar" },
        P("stall", 190, 1.0, undefined, 0.45),
        P("tent", -270, 1.0, undefined, 0.2),
        P("grass", -60, 0.82, undefined, 0.82),
      ], env: { terrain: "field", glory: 0.55, night: 0.12, verdure: 0.42 }, cast: [
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
      ] }),
      mv(2, "fizer mal aos olhos do Senhor"),
      // v.3 — a idolatria: encurvar-se ao sol, à lua, ao exército do céu.
      b(3, { by: "moises", q: "ao sol, ou à lua", props: [
        { ...P("sun", 240, 1.3, undefined, 0.78), sky: true },
        P("moon", 140, 1.2, undefined, 0.24),
        P("starfield", 0, 1.5, undefined, 0.2),
        P("grass", -60, 0.8, undefined, 0.82),
      ], env: { terrain: "field", glory: 0.2, night: 0.55, verdure: 0.35 }, cast: [
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("homem", 70, "bow", { dy: 0.52, facing: 1, id: "idolatra" }),
      ] }),
      mv(4, "bem o inquirirás"),
      // v.5-7 — o juízo sóbrio: às portas, por testemunhas.
      b(5, { by: "moises", q: "apedrejarás o tal homem ou mulher", props: [
        { ...P("door", 40, 1.3, undefined, 0.4), tag: "portas" },
        P("rock", 200, 1.0, undefined, 0.42),
        P("tower", -300, 0.9, undefined, 0.12),
      ], env: { terrain: "field", glory: 0.25, night: 0.45, verdure: 0.35 }, cast: [
        C("moises", -160, "stand", { dy: 0.5, facing: 1 }),
        C("homem", 80, "lie", { dy: 0.58, facing: 1, id: "reo" }),
      ] }),
      b(6, { by: "moises", q: "por boca de uma só testemunha não morrerá", cast: [
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("homem", 40, "stand", { dy: 0.52, facing: -1, id: "test1" }),
        C("homem", 140, "stand", { dy: 0.5, facing: -1, id: "test2" }),
        C("homem", 230, "stand", { scale: 0.9, dy: 0.48, facing: -1, id: "test3" }),
      ] }),
      mv(7, "As mãos das testemunhas serão primeiro"),
      // v.8-13 — a causa difícil sobe ao lugar: sacerdotes levitas e o juiz.
      b(8, { by: "moises", q: "entre sangue e sangue", props: [
        P("rock", 0, 1.4, undefined, 0.2),
        { ...P("altar", 60, 1.0, undefined, 0.4), tag: "lugar" },
        P("river", -20, 1.2, undefined, 0.14),
        P("tent", -280, 1.0, undefined, 0.22),
      ], env: { terrain: "mountain", glory: 0.35, night: 0.15, verdure: 0.3 }, cast: [
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "walk", { dy: 0.46 }),
      ] }),
      b(9, { by: "moises", q: "virás aos sacerdotes levitas", cast: [
        C("arao", -40, "stand", { glow: 0.3, dy: 0.5, facing: 1 }),
        C("servo", 80, "stand", { dy: 0.52, facing: -1, id: "levita" }),
        C("homem", 180, "bow", { dy: 0.5, facing: -1, id: "demandante" }),
      ] }),
      mv(10, "farás conforme ao mandado da palavra"),
      mv(11, "nem para a direita nem para a esquerda"),
      mv(12, "esse homem morrerá"),
      mv(13, "todo o povo o ouça, e tema"),
      // v.14-20 — o REI que o Senhor escolher; e a CÓPIA da Lei.
      b(14, { by: "moises", q: "Porei sobre mim um rei", props: REI,
        env: { terrain: "field", glory: 0.6, night: 0.1, verdure: 0.42 }, cast: [
          C("moises", -160, "raise", { dy: 0.5, facing: 1 }),
          C("multidao", 160, "stand", { dy: 0.46 }),
        ] }),
      b(15, { by: "moises", q: "dentre teus irmãos porás rei", cast: [
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("rei", 60, "stand", { dy: 0.5, facing: -1 }),
      ] }),
      b(16, { by: "moises", q: "não multiplicará para si cavalos", props: [
        P("stall", 200, 1.0, undefined, 0.45),
        P("tower", -300, 0.9, undefined, 0.12),
        P("grass", -70, 0.8, undefined, 0.82),
      ], env: { terrain: "field", glory: 0.58, night: 0.1, verdure: 0.4 }, cast: [
        C("rei", 40, "stand", { dy: 0.5, facing: -1 }),
      ] }),
      mv(17, "Tampouco para si multiplicará mulheres"),
      // v.18 — o rei ESCREVE para si num livro um traslado da Lei.
      b(18, { by: "moises", q: "escreverá para si num livro", props: [
        { ...P("throne", 40, 1.2, undefined, 0.3), tag: "trono" },
        { ...P("scroll", -20, 1.15, undefined, 0.52), tag: "traslado-da-lei" },
        P("tower", -300, 0.9, undefined, 0.12),
        P("tower", 300, 0.9, undefined, 0.14),
      ], env: { terrain: "field", glory: 0.64, night: 0.1, verdure: 0.4 }, cast: [
        C("rei", 20, "write", { dy: 0.52, facing: 1 }),
        C("servo", 150, "stand", { dy: 0.5, facing: -1, id: "levita" }),
      ] }),
      b(19, { by: "moises", q: "nele lerá todos os dias da sua vida", env: { glory: 0.68 }, cast: [
        C("rei", 20, "stand", { dy: 0.5, facing: 1 }),
        C("multidao", 170, "stand", { dy: 0.46 }),
      ] }),
      mv(20, "prolongue os seus dias no seu reino"),
    ],
  },
};
