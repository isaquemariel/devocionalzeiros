// ============================================================================
// APOCALIPSE 20–21 — roteiro do modo CENA VIVA (sets fixos).
//
// Ap 20 — O MILÊNIO E O JUÍZO: um anjo desce do céu com a chave do abismo e
// uma grande cadeia; o DRAGÃO é preso e selado por mil anos (a terra respira —
// a noite recua). TRONOS: os degolados pelo testemunho de Jesus vivem e
// reinam com Cristo — a primeira ressurreição. Findos os mil anos, Satanás é
// solto e engana Gogue e Magogue, "como a areia do mar"; cercam o arraial dos
// santos e a cidade amada — e de Deus desce FOGO do céu que os devora. O
// diabo é lançado no lago de fogo. Então O GRANDE TRONO BRANCO: céu e terra
// fogem, os LIVROS se abrem, os mortos são julgados segundo as suas obras; a
// morte e o inferno vão para o lago de fogo — a segunda morte.
// Ap 21 — NOVO CÉU E NOVA TERRA: o mar já não existe; a santa cidade desce
// "adereçada como uma esposa"; a grande voz anuncia o tabernáculo de Deus com
// os homens e Deus enxuga toda lágrima. Do trono: "Eis que faço novas todas
// as coisas… Eu sou o Alfa e o Ômega". Um dos anjos das taças leva João a um
// alto monte e mostra a NOIVA: a glória como jaspe cristalino, o muro com
// doze portas, os doze fundamentos, a MEDIÇÃO com a cana de ouro, ouro puro
// como vidro, portas de pérola. Nela não há templo — Deus e o Cordeiro são o
// templo e a lâmpada; as portas nunca se fecham; só entram os inscritos no
// livro da vida do Cordeiro.
//
// Cada beat = 1 versículo (texto ARC em runtime). `by` = quem fala;
// `q` = onde começa a citação; `cast`/`props` SUBSTITUEM os anteriores.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------- decoração
// Verde do campo do milênio (paisagem base — corredor -100..-190 LIVRE).
const FIELD_GREEN: StagePropSpec[] = [
  P("tree", -270, 1.1, undefined, 0.12),
  P("tree", 250, 1.0, undefined, 0.1),
  P("rock", -220, 0.85, undefined, 0.6),
  P("rock", 160, 0.75, undefined, 0.75),
  P("rock", 320, 0.9, undefined, 0.5),
  P("bush", -300, 1, undefined, 0.35),
  P("bush", 205, 0.9, undefined, 0.4),
  P("grass", -60, 1, undefined, 0.8),
  P("grass", 95, 1.05, undefined, 0.7),
  P("grass", 285, 1, undefined, 0.85),
  P("grass", -285, 0.9, undefined, 0.72),
];

// A BOCA DO ABISMO (20:1-3 e 20:7): o poço selado entra na vaga dos extras.
const ABYSS_FIELD: StagePropSpec[] = [
  P("well", -140, 1.15, undefined, 0.22),      // o abismo — a prisão de mil anos
  ...FIELD_GREEN,
];

// O REINADO DE MIL ANOS (20:4-6): tronos menores em fila para os que reinam.
const MILLENNIUM: StagePropSpec[] = [
  P("throne", -60, 0.9, undefined, 0.26),
  P("throne", 0, 0.95, undefined, 0.32),
  P("throne", 60, 0.9, undefined, 0.26),
  ...FIELD_GREEN,
];

// O ARRAIAL DOS SANTOS E A CIDADE AMADA (20:9): tenda na vaga dos extras,
// a cidade ao fundo — cercados pelas nações.
const SAINTS_CAMP: StagePropSpec[] = [
  P("tent", -140, 1.15, undefined, 0.22),      // o arraial dos santos
  P("tower", 250, 1.35, undefined, 0.08),      // a cidade amada
  P("tree", -270, 1.1, undefined, 0.12),
  P("rock", -220, 0.85, undefined, 0.6),
  P("rock", 160, 0.75, undefined, 0.75),
  P("bush", -300, 1, undefined, 0.35),
  P("bush", 205, 0.9, undefined, 0.4),
  P("grass", -60, 1, undefined, 0.8),
  P("grass", 95, 1.05, undefined, 0.7),
  P("grass", -285, 0.9, undefined, 0.72),
];

// O GRANDE TRONO BRANCO (20:11): céu e terra fugiram — só o trono, imenso,
// e a luz. Palco despojado de propósito (não se achou lugar para eles).
const WHITE_THRONE: StagePropSpec[] = [
  P("throne", 0, 1.7, undefined, 0.08),        // o grande trono branco
  P("star", -70, 0.5, undefined, 0.02),
  P("star", 80, 0.55, undefined, 0.04),
];

// Os LIVROS do juízo (20:12-15): abertos na vaga dos extras — e o outro
// livro, que é o da vida.
const JUDGMENT_BOOKS: StagePropSpec[] = [
  ...WHITE_THRONE,
  P("scroll", -140, 0.95, undefined, 0.2),     // os livros das obras
  P("scroll", -175, 0.8, undefined, 0.42),     // o livro da vida
];

// O LAGO DE FOGO na borda do palco (20:14-15).
const LAKE_OF_FIRE = P("campfire", 290, 1.3, 1, 0.5);

// ---------------------------------------------------------------- Ap 21
// A NOVA CRIAÇÃO (21:1): nuvens de glória, a fonte da água da vida no centro
// (o mar já não existe), verde novo — corredor -100..-190 livre.
const NEW_CREATION: StagePropSpec[] = [
  P("river", 0, 1.1, undefined, 0.22),         // água da vida — o mar já não existe
  P("tree", -240, 1.05, undefined, 0.12),
  P("tree", 210, 1.0, undefined, 0.14),
  P("star", -290, 0.5, undefined, 0.03),
  P("star", 250, 0.55, undefined, 0.05),
  P("bush", -280, 0.95, undefined, 0.5),
  P("bush", 300, 0.85, undefined, 0.55),
  P("grass", -70, 1, undefined, 0.8),
  P("grass", 120, 1, undefined, 0.75),
];

// A CIDADE DESCENDO (21:2-9): torre dourada ao longe e a porta na vaga dos
// extras — a nova Jerusalém adereçada como esposa.
const DESCENDING_CITY: StagePropSpec[] = [
  ...NEW_CREATION,
  P("tower", 150, 1.5, undefined, 0.06),       // a santa cidade que desce
  P("door", -140, 1.1, undefined, 0.2),        // adereçada como uma esposa
];

// A SANTA JERUSALÉM vista do monte (21:10+): muro alto, torres de ouro,
// portas espaçadas (três de cada lado), encostas do grande e alto monte.
const CITY_BASE: StagePropSpec[] = [
  P("rock", -310, 1.05, undefined, 0.6),       // a encosta do alto monte
  P("rock", 315, 0.9, undefined, 0.62),
  P("tower", -40, 1.7, undefined, 0.05),       // a cidade de ouro puro
  P("tower", 120, 1.25, undefined, 0.12),
  P("door", -260, 0.95, undefined, 0.12),      // portas do poente
  P("door", 40, 1.15, undefined, 0.3),         // portas do sul
  P("door", 260, 0.95, undefined, 0.12),       // portas do levante
  P("grass", -70, 1, undefined, 0.82),
  P("grass", 180, 1, undefined, 0.78),
  P("bush", -230, 0.9, undefined, 0.45),
  P("bush", 220, 0.85, undefined, 0.4),
];

// a luz como jaspe cristalino (21:11) — entra na vaga dos extras
const JASPER_LIGHT = P("star", -140, 0.7, undefined, 0.15);
const CITY_GLORY: StagePropSpec[] = [...CITY_BASE, JASPER_LIGHT];

// as doze portas eram doze pérolas (21:21): portas em destaque
const CITY_PEARLS: StagePropSpec[] = [
  ...CITY_BASE.map(p => (p.kind === "door" ? { ...p, scale: (p.scale ?? 1) + 0.15 } : p)),
  JASPER_LIGHT,
];

// e nela não vi templo (21:22): sai a torre central — Deus e o Cordeiro são o templo
const CITY_NO_TEMPLE: StagePropSpec[] = CITY_PEARLS.filter(p => !(p.kind === "tower" && p.dx === -40));

// só os inscritos no livro da vida do Cordeiro (21:27)
const CITY_FINAL: StagePropSpec[] = [...CITY_NO_TEMPLE, P("scroll", -170, 0.9, undefined, 0.5)];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Ap 20
  20: {
    start: { terrain: "field", night: 0.4, glory: 0.05, storm: 0, fire: 0 },
    beats: [
      b(1, { cast: [C("joao", -70, "stand", { dy: 0.55 }), C("anjo", 20, "flyIdle", { glow: 0.8, dy: 0.3 })], props: ABYSS_FIELD }), // anjo desce com chave e cadeia
      b(2, { cast: [C("joao", -70, "stand", { dy: 0.55 }), C("anjo", 60, "point", { glow: 0.7, dy: 0.4, facing: -1 }), C("dragao", -20, "lie", { dy: 0.5 })], env: { night: 0.3 } }), // prende o dragão por mil anos
      b(3, { cast: [C("joao", -70, "stand", { dy: 0.55 }), C("anjo", -95, "point", { glow: 0.7, dy: 0.42, facing: -1 })], env: { night: 0.2, glory: 0.2 } }), // selado no abismo — paz na terra
      b(4, { set: "milenio", props: MILLENNIUM, env: { night: 0.1, glory: 0.6 }, cast: [C("joao", -95, "stand", { dy: 0.55 }), C("homem", -55, "stand", { glow: 0.7, dy: 0.46 }), C("mulherComum", 8, "stand", { glow: 0.7, dy: 0.5 })] }), // tronos: reinam com Cristo mil anos
      b(5, { env: { glory: 0.55 } }),                                                // os outros mortos não reviveram — primeira ressurreição
      b(6, { env: { glory: 0.7 }, cast: [C("joao", -95, "stand", { dy: 0.55 }), C("homem", -55, "raise", { glow: 0.85, dy: 0.46 }), C("mulherComum", 8, "raise", { glow: 0.85, dy: 0.5 })] }), // sacerdotes de Deus e de Cristo
      b(7, { props: ABYSS_FIELD, env: { night: 0.45, glory: 0.2, storm: 0.3 }, cast: [C("joao", -95, "stand", { dy: 0.55 }), C("dragao", 40, "stand", { dy: 0.42 })] }), // Satanás solto da sua prisão
      b(8, { env: { night: 0.55, storm: 0.6 }, cast: [C("joao", -95, "stand", { dy: 0.55 }), C("dragao", 60, "point", { dy: 0.4, facing: 1 }), C("multidao", 160, "walk", { dy: 0.45 })] }), // engana Gogue e Magogue — areia do mar
      b(9, { props: SAINTS_CAMP, env: { storm: 0.7, fire: 0.9 }, cast: [C("joao", -95, "stand", { dy: 0.55 }), C("dragao", 40, "stand", { dy: 0.4 }), C("multidao", 130, "walk", { dy: 0.5 })] }), // cercam o arraial — fogo do céu os devora
      b(10, { env: { fire: 1, storm: 0.5, night: 0.6 }, cast: [C("joao", -95, "stand", { dy: 0.55 })] }),                             // o diabo no lago de fogo e enxofre
      b(11, { set: "tronoBranco", props: WHITE_THRONE, env: { terrain: "throne", night: 0, storm: 0, fire: 0, glory: 1 }, cast: [C("joao", -110, "stand", { dy: 0.58 }), C("cristo", 0, "stand", { glow: 1, dy: 0.3 })] }), // o grande trono branco — céu e terra fogem
      b(12, { props: JUDGMENT_BOOKS, cast: [C("joao", -110, "stand", { dy: 0.58 }), C("cristo", 0, "stand", { glow: 1, dy: 0.3 }), C("multidao", 120, "stand", { dy: 0.5 })] }), // abrem-se os livros — e o da vida
      b(13, { env: { storm: 0.15 }, cast: [C("joao", -110, "stand", { dy: 0.58 }), C("cristo", 0, "stand", { glow: 1, dy: 0.3 }), C("multidao", 90, "bow", { dy: 0.55 })] }), // o mar, a morte e o inferno entregam os mortos
      b(14, { props: [...JUDGMENT_BOOKS, LAKE_OF_FIRE], env: { storm: 0, fire: 0.45, glory: 0.85 } }),                                // morte e inferno no lago — a segunda morte
      b(15, { env: { fire: 0.5, glory: 0.8 }, cast: [C("joao", -110, "kneel", { dy: 0.58 }), C("cristo", 0, "stand", { glow: 1, dy: 0.3 }), C("multidao", 90, "bow", { dy: 0.55 })] }), // quem não está no livro da vida
    ],
  },

  // ------------------------------------------------------------------ Ap 21
  21: {
    start: { terrain: "glory", night: 0, glory: 0.9, storm: 0, fire: 0 },
    beats: [
      b(1, { cast: [C("joao", -30, "stand", { dy: 0.55 })], props: NEW_CREATION }),  // novo céu, nova terra — o mar já não existe
      b(2, { by: "joao", props: DESCENDING_CITY, env: { glory: 1 } }),               // "eu, João, vi a santa cidade" descer
      b(3, { by: "anjo", q: "que dizia: " }),                                        // (voz do céu) o tabernáculo de Deus com os homens
      b(4, { env: { glory: 1, night: 0 } }),                                         // enxugará toda lágrima — não haverá mais morte
      b(5, { by: "cristo", q: "disse: ", env: { glory: 1 } }),                       // (do trono) Faço novas todas as coisas
      b(6, { by: "cristo", q: "disse-me mais: " }),                                  // Está cumprido — Alfa e Ômega, água da vida
      b(7, { by: "cristo" }),                                                        // quem vencer herdará todas as coisas
      b(8, { by: "cristo", env: { fire: 0.12, night: 0.05 } }),                      // mas os incrédulos — a segunda morte
      b(9, { by: "anjo", q: "dizendo: ", env: { fire: 0, night: 0 }, cast: [C("joao", -20, "stand", { dy: 0.55 }), C("anjo", -80, "point", { glow: 0.7, dy: 0.5, facing: 1 })], props: [...DESCENDING_CITY, P("bowl", -170, 0.8, 1, 0.5)] }), // um dos anjos das taças: "Vem, mostrar-te-ei a esposa"
      b(10, { set: "monte", props: CITY_BASE, env: { glory: 1, night: 0 }, cast: [C("anjo", -85, "point", { glow: 0.7, dy: 0.5, facing: 1 }), C("joao", -25, "stand", { dy: 0.55 })] }), // do alto monte, a santa Jerusalém desce
      b(11, { props: CITY_GLORY, env: { glory: 1 } }),                               // a glória de Deus — jaspe cristalino
      b(12, { cast: [C("anjo", -115, "point", { glow: 0.7, dy: 0.5, facing: -1 }), C("joao", -55, "stand", { dy: 0.55 })] }), // grande muro, doze portas, doze anjos
      b(13),                                                                          // três portas de cada lado
      b(14),                                                                          // doze fundamentos — os doze apóstolos
      b(15, { cast: [C("anjo", -85, "point", { glow: 0.7, dy: 0.5, facing: 1 }), C("joao", -25, "stand", { dy: 0.55 })] }), // a cana de ouro para medir
      b(16, { cast: [C("anjo", 100, "walk", { glow: 0.7, dy: 0.45, facing: 1 }), C("joao", -25, "stand", { dy: 0.55 })] }), // mede a cidade — doze mil estádios
      b(17, { cast: [C("anjo", -85, "stand", { glow: 0.7, dy: 0.5 }), C("joao", -25, "stand", { dy: 0.55 })] }),            // o muro: cento e quarenta e quatro côvados
      b(18, { env: { glory: 1 } }),                                                  // muro de jaspe, cidade de ouro puro
      b(19),                                                                          // fundamentos adornados de pedras preciosas
      b(20),                                                                          // sardônica, topázio, ametista…
      b(21, { props: CITY_PEARLS }),                                                 // as doze portas eram doze pérolas
      b(22, { props: CITY_NO_TEMPLE, cast: [C("anjo", -85, "stand", { glow: 0.7, dy: 0.5 }), C("joao", -25, "stand", { dy: 0.55 }), C("cordeiro", 45, "stand", { glow: 1, dy: 0.42 })] }), // não vi templo — Deus e o Cordeiro o são
      b(23, { env: { glory: 1, night: 0 } }),                                        // nem sol nem lua — o Cordeiro é a lâmpada
      b(24, { cast: [C("anjo", -85, "stand", { glow: 0.7, dy: 0.5 }), C("joao", -25, "stand", { dy: 0.55 }), C("cordeiro", 45, "stand", { glow: 1, dy: 0.42 }), C("multidao", 160, "walk", { dy: 0.5, facing: -1 })] }), // as nações dos salvos andarão à sua luz
      b(25, { env: { night: 0 } }),                                                  // as portas nunca se fecham — ali não há noite
      b(26, { cast: [C("anjo", -85, "stand", { glow: 0.7, dy: 0.5 }), C("joao", -25, "stand", { dy: 0.55 }), C("cordeiro", 45, "stand", { glow: 1, dy: 0.42 }), C("multidao", -210, "walk", { dy: 0.45, facing: -1 })] }), // trarão a glória e honra das nações
      b(27, { props: CITY_FINAL, env: { glory: 1, night: 0 }, cast: [C("anjo", -85, "stand", { glow: 0.7, dy: 0.5 }), C("joao", -25, "stand", { dy: 0.55 }), C("cordeiro", 45, "raise", { glow: 1, dy: 0.42 })] }), // só os inscritos no livro da vida do Cordeiro
    ],
  },
};
