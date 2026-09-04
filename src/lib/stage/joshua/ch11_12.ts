// ============================================================================
// JOSUÉ 11–12 — CENA VIVA. A CAMPANHA DO NORTE e a LISTA DOS REIS VENCIDOS.
//
// Js 11 — A COLIGAÇÃO DO NORTE: Jabim, rei de HAZOR, convoca todos os reis do
// norte — Madom, Sinrom, Acsafe e os cananeus, amorreus, heteus, perizeus,
// jebuseus e heveus. Ajuntam-se junto às ÁGUAS DE MEROM, exército numeroso
// "como a areia que está na praia do mar", com CAVALOS e CARROS. O Senhor
// anima Josué: "Não temas". Israel os fere; Josué JARRETA os cavalos e QUEIMA
// os carros a fogo. HAZOR, cabeça dos reinos, é QUEIMADA A FOGO (campfire). Os
// ANAQUINS (gigantes) são extirpados dos montes. "Josué tomou toda esta
// terra… e a terra descansou da guerra."
//
// Js 12 — A LISTA/ESTELA DOS REIS VENCIDOS: primeiro Siom e Ogue, a LESTE do
// Jordão, feridos por Moisés; depois os 31 reis a OESTE, feridos por Josué. Um
// beat por versículo mesmo na lista — cena de memória (scroll) com os reis
// derrotados desfilando, variando o enquadramento a cada verso.
//
// A VOZ DE DEUS (regra do projeto): o Senhor fala DIRETO a Josué (Js 11:6),
// sem mediador visível → `by:"deus"`, voz do céu, glória alta, SEM figura.
// FOGO só é desenhado por `campfire` — Hazor e os carros queimados exigem-no.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const jv = (v: number, q?: string) => b(v, { by: "servo", ...(q ? { q } : {}) }); // Josué fala
const dv = (v: number, q?: string, extra: Partial<StageBeat> = {}) => b(v, { by: "deus", ...(q ? { q } : {}), ...extra });   // voz do céu

// HAZOR e as cidades do norte — as torres da coligação sobre seus outeiros.
const HAZOR: StagePropSpec[] = [
  P("tower", -140, 1.3, undefined, 0.24),
  P("tower", 150, 1.22, undefined, 0.3),
  P("church", 20, 1.1, undefined, 0.34),
  P("rock", 305, 1.1, undefined, 0.3),
  P("grass", -60, 0.78, undefined, 0.8),
];
// AS ÁGUAS DE MEROM — o exército do norte acampado junto às águas, cavalos e carros.
const MEROM: StagePropSpec[] = [
  P("river", 0, 1.4, undefined, 0.84),
  P("stall", -200, 1.0, undefined, 0.2),   // os cavalos do exército do norte
  P("stall", 210, 1.0, undefined, 0.24),
  P("tent", -300, 1.0, undefined, 0.16),
  P("palm", 320, 1.05, undefined, 0.14),
  P("grass", 70, 0.78, undefined, 0.7),
];
// HAZOR EM CHAMAS — a cidade cabeça dos reinos queimada a fogo (campfire!).
const HAZOR_FOGO: StagePropSpec[] = [
  P("tower", -130, 1.28, undefined, 0.24),
  P("church", 30, 1.1, undefined, 0.34),
  { ...P("campfire", 40, 1.55, 1, 0.5), tag: "hazor-queimada" },
  P("campfire", -110, 1.15, 0.9, 0.42),
  P("rock", 300, 1.1, undefined, 0.3),
];
// OS CARROS QUEIMADOS — Josué jarreta os cavalos e queima os carros a fogo.
const CARROS: StagePropSpec[] = [
  { ...P("campfire", 60, 1.4, 1, 0.52), tag: "carros-queimados" },
  P("stall", -190, 1.0, undefined, 0.22),  // os cavalos jarretados
  P("stall", 200, 0.95, undefined, 0.26),
  P("rock", 300, 1.1, undefined, 0.3),
  P("grass", -60, 0.76, undefined, 0.78),
];
// OS MONTES DE JUDÁ — Hebrom, Debir, Anabe: os altos de onde os anaquins são cortados.
const MONTES: StagePropSpec[] = [
  P("rock", 0, 1.5, undefined, 0.42),
  P("rock", 215, 1.2, undefined, 0.54),
  P("tower", -150, 1.15, undefined, 0.28),
  P("grass", -70, 0.76, undefined, 0.8),
];
// A TERRA EM DESCANSO — Canaã tomada, repartida, o rio ao fundo, o arraial em paz.
const DESCANSO: StagePropSpec[] = [
  P("river", 0, 1.4, undefined, 0.86),
  P("tent", -230, 1.05, undefined, 0.2),
  P("tent", 220, 1.0, undefined, 0.24),
  P("palm", -320, 1.05, undefined, 0.14),
  P("tree", 300, 1.05, undefined, 0.26),
  P("grass", 80, 0.78, undefined, 0.68),
];
// A ESTELA DA MEMÓRIA — o rolo dos reis vencidos, a leste do Jordão (Siom e Ogue).
const ESTELA_LESTE: StagePropSpec[] = [
  { ...P("scroll", -30, 1.2, undefined, 0.5), tag: "lista-dos-reis" },
  P("river", 200, 1.3, undefined, 0.82),
  P("rock", -260, 1.1, undefined, 0.32),
  P("grass", 90, 0.76, undefined, 0.7),
];
// A ESTELA DA MEMÓRIA — o rolo dos 31 reis vencidos a oeste do Jordão (Josué).
const ESTELA_OESTE: StagePropSpec[] = [
  { ...P("scroll", 0, 1.25, undefined, 0.5), tag: "lista-dos-31" },
  P("tower", -230, 1.1, undefined, 0.26),
  P("tower", 240, 1.05, undefined, 0.3),
  P("grass", -70, 0.76, undefined, 0.78),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Js 11
  11: {
    start: { terrain: "city", night: 0.14, glory: 0.5, storm: 0, fire: 0, verdure: 0.32 },
    beats: [
      // v.1 — JABIM, rei de HAZOR, convoca os reis do norte: mensageiros correm.
      b(1, { q: "ouvindo-o Jabim, rei de Hazor", props: HAZOR,
        env: { terrain: "city", glory: 0.48, night: 0.16, verdure: 0.3 }, cast: [
        C("rei", 150, "point", { dy: 0.48, facing: -1, id: "jabim" }),
        C("homem", -130, "walk", { dy: 0.5, facing: 1, id: "mensageiro" }),
      ] }),
      // v.2 — os reis QUE ESTAVAM AO NORTE, nas montanhas e planícies.
      b(2, { q: "reis, que estavam ao norte", env: { glory: 0.46, night: 0.18 }, cast: [
        C("rei", 150, "stand", { dy: 0.48, facing: -1, id: "jobabe" }),
        C("rei", 60, "stand", { dy: 0.5, facing: -1, id: "sinrom" }),
        C("rei", -60, "stand", { dy: 0.5, facing: 1, id: "acsafe" }),
      ] }),
      // v.3 — os povos convocados: cananeu, amorreu, heteu, perizeu, jebuseu, heveu.
      b(3, { q: "e ao amorreu, e ao heteu, e ao perizeu", env: { glory: 0.44, night: 0.2 }, cast: [
        C("homem", -120, "stand", { dy: 0.5, facing: 1, id: "cananeu" }),
        C("homem", 20, "stand", { dy: 0.52, facing: -1, id: "amorreu" }),
        C("homem", 150, "stand", { dy: 0.48, facing: -1, id: "heteu" }),
      ] }),
      // v.4 — o EXÉRCITO como a AREIA do mar, muitíssimos CAVALOS e CARROS.
      b(4, { q: "em multidão como a areia que está na praia do mar", set: "merom", props: MEROM,
        env: { terrain: "field", glory: 0.42, night: 0.2, storm: 0.08, verdure: 0.28 }, cast: [
        C("multidao", 120, "stand", { dy: 0.62 }),
        C("rei", -150, "stand", { dy: 0.5, facing: 1, id: "jabim" }),
      ] }),
      // v.5 — todos os reis se ACAMPAM junto às ÁGUAS DE MEROM para pelejar.
      b(5, { q: "junto às águas de Merom", env: { glory: 0.4, night: 0.22, storm: 0.1 }, cast: [
        C("rei", -160, "stand", { dy: 0.5, facing: 1, id: "jabim" }),
        C("multidao", 130, "stand", { dy: 0.6 }),
      ] }),
      // v.6 — a VOZ DO CÉU a Josué: "Não temas"; jarretarás os cavalos, queimarás os carros.
      dv(6, "Não temas diante deles", { env: { glory: 0.62, night: 0.3 } }),
      // v.7 — Josué e os homens de guerra ATACAM DE REPENTE às águas de Merom.
      b(7, { q: "atacou-os de repente", env: { glory: 0.5, night: 0.16, storm: 0.06 }, cast: [
        C("servo", -140, "walk", { dy: 0.5, facing: 1, id: "josue", glow: 0.18 }),
        C("multidao", 40, "walk", { dy: 0.52, facing: 1 }),
        C("rei", 180, "stand", { dy: 0.5, facing: -1, id: "jabim" }),
      ] }),
      // v.8 — o SENHOR os DÁ nas mãos de Israel; perseguidos até não deixarem nenhum.
      b(8, { q: "o Senhor os deu nas mãos de Israel", env: { glory: 0.56, night: 0.14 }, cast: [
        C("servo", -140, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.22 }),
        C("rei", 150, "lie", { dy: 0.62, id: "jabim" }),
        C("homem", 60, "bow", { dy: 0.56, facing: 1, id: "inimigo" }),
      ] }),
      // v.9 — Josué JARRETA os cavalos e QUEIMA os carros A FOGO (campfire!). ÍCONE.
      b(9, { q: "os seus carros queimou a fogo", set: "carros", props: CARROS,
        env: { terrain: "field", glory: 0.5, night: 0.2, fire: 0.4, verdure: 0.18 }, cast: [
        C("servo", -150, "point", { dy: 0.5, facing: 1, id: "josue", glow: 0.2 }),
        C("multidao", 150, "stand", { dy: 0.62 }),
      ] }),
      // v.10 — Josué volta, TOMA HAZOR e fere à espada o seu rei (cabeça dos reinos).
      b(10, { q: "tomou a Hazor, e feriu à espada ao seu rei", set: "hazor", props: HAZOR,
        env: { terrain: "city", glory: 0.46, night: 0.2, verdure: 0.24 }, cast: [
        C("servo", -140, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.2 }),
        C("rei", 150, "lie", { dy: 0.6, id: "jabim" }),
      ] }),
      // v.11 — HAZOR QUEIMADA A FOGO (campfire!). Nada restou do que tinha fôlego. ÍCONE.
      b(11, { q: "a Hazor queimou a fogo", set: "hazor-fogo", props: HAZOR_FOGO,
        env: { terrain: "city", glory: 0.3, night: 0.4, fire: 0.55, storm: 0.1, verdure: 0.12 }, cast: [
        C("servo", -170, "stand", { dy: 0.5, facing: 1, id: "josue" }),
        C("homem", 150, "lie", { dy: 0.64, id: "morto" }),
      ] }),
      // v.12 — Josué TOMA TODAS as cidades destes reis, como ordenara Moisés.
      b(12, { q: "tomou todas as cidades destes reis", set: "hazor", props: HAZOR,
        env: { terrain: "city", glory: 0.44, night: 0.2, verdure: 0.24 }, cast: [
        C("servo", -140, "point", { dy: 0.5, facing: 1, id: "josue", glow: 0.18 }),
        C("rei", 90, "bow", { dy: 0.56, facing: -1, id: "vencido1" }),
        C("rei", 180, "lie", { dy: 0.6, id: "vencido2" }),
      ] }),
      // v.13 — só as cidades sobre os outeiros não foram queimadas — A NÃO SER HAZOR.
      b(13, { q: "a não ser Hazor, a qual Josué queimou", env: { glory: 0.4, night: 0.24, fire: 0.12 }, cast: [
        C("servo", -150, "stand", { dy: 0.5, facing: 1, id: "josue" }),
        C("multidao", 140, "stand", { dy: 0.62 }),
      ] }),
      // v.14 — os DESPOJOS e o GADO tomados; os homens feridos ao fio da espada.
      b(14, { q: "todos os despojos destas cidades, e o gado", set: "merom", props: MEROM,
        env: { terrain: "field", glory: 0.46, night: 0.16, verdure: 0.3 }, cast: [
        C("multidao", 130, "stand", { dy: 0.6 }),
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.18 }),
      ] }),
      // v.15 — Josué OBEDECE: nem uma só palavra tirou do que o Senhor ordenara.
      b(15, { q: "nem uma só palavra tirou", env: { glory: 0.58, night: 0.12, verdure: 0.34 }, cast: [
        C("servo", -140, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.26 }),
        C("multidao", 140, "stand", { dy: 0.6 }),
      ] }),
      // v.16 — Josué TOMA TODA AQUELA TERRA: montanhas, sul, Gósen, planícies.
      b(16, { q: "Josué tomou toda aquela terra", set: "montes", props: MONTES,
        env: { terrain: "mountain", glory: 0.44, night: 0.18, verdure: 0.2 }, cast: [
        C("servo", -140, "point", { dy: 0.44, facing: 1, id: "josue", glow: 0.2 }),
        C("multidao", 150, "stand", { dy: 0.66 }),
      ] }),
      // v.17 — desde o monte Halaque até Baal-Gade, AO PÉ DO MONTE DE HERMOM.
      b(17, { q: "ao pé do monte de Hermom", env: { terrain: "mountain", glory: 0.42, night: 0.2 }, cast: [
        C("servo", -130, "stand", { dy: 0.44, facing: 1, id: "josue" }),
        C("rei", 150, "lie", { dy: 0.62, id: "rei-vencido" }),
      ] }),
      // v.18 — POR MUITO TEMPO Josué fez guerra contra todos estes reis.
      b(18, { q: "Josué fez guerra contra todos estes reis", env: { terrain: "field", glory: 0.44, night: 0.18, storm: 0.06, verdure: 0.22 }, cast: [
        C("servo", -140, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.18 }),
        C("multidao", 130, "walk", { dy: 0.6, facing: -1 }),
      ] }),
      // v.19 — nenhuma cidade fez PAZ, senão os heveus, MORADORES DE GIBEOM.
      b(19, { q: "moradores de Gibeom", env: { glory: 0.5, night: 0.15, verdure: 0.28 }, cast: [
        C("homem", 140, "bow", { dy: 0.54, facing: -1, id: "gibeom" }),
        C("servo", -140, "stand", { dy: 0.5, facing: 1, id: "josue" }),
      ] }),
      // v.20 — do SENHOR vinha o ENDURECIMENTO dos corações, para a destruição.
      b(20, { q: "vinha o endurecimento de seus corações", env: { glory: 0.34, night: 0.3, storm: 0.12 }, cast: [
        C("rei", 140, "bow", { dy: 0.56, facing: -1, id: "endurecido" }),
        C("homem", 30, "lie", { dy: 0.6, id: "caido" }),
      ] }),
      // v.21 — Josué EXTIRPA os ANAQUINS (gigantes) das montanhas de Hebrom. ÍCONE.
      b(21, { q: "extirpou os anaquins das montanhas de Hebrom", set: "montes", props: MONTES,
        env: { terrain: "mountain", glory: 0.4, night: 0.24, storm: 0.1, verdure: 0.16 }, cast: [
        C("homem", 150, "lie", { dy: 0.64, id: "anaquim1", scale: 2.2 }),
        C("homem", 60, "bow", { dy: 0.58, facing: -1, id: "anaquim2", scale: 2.0 }),
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.2 }),
      ] }),
      // v.22 — NENHUM anaquim ficou; só alguns em Gaza, Gate e Asdode.
      b(22, { q: "Nenhum dos anaquins foi deixado", env: { terrain: "field", glory: 0.44, night: 0.18, verdure: 0.24 }, cast: [
        C("servo", -140, "stand", { dy: 0.5, facing: 1, id: "josue" }),
        C("homem", 160, "stand", { dy: 0.56, facing: -1, id: "resto-anaquim", scale: 2.0 }),
      ] }),
      // v.23 — Josué tomou TODA ESTA TERRA e a repartiu; A TERRA DESCANSOU DA GUERRA.
      b(23, { q: "a terra descansou da guerra", set: "descanso", props: DESCANSO,
        env: { terrain: "field", glory: 0.66, night: 0.08, storm: 0, fire: 0, verdure: 0.5 }, cast: [
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.28 }),
        C("multidao", 140, "stand", { dy: 0.6 }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Js 12
  12: {
    start: { terrain: "field", night: 0.12, glory: 0.52, storm: 0, fire: 0, verdure: 0.3 },
    beats: [
      // v.1 — ESTES SÃO OS REIS DA TERRA feridos: o memorial se abre (leste do Jordão).
      b(1, { q: "são os reis da terra", set: "estela-leste", props: ESTELA_LESTE,
        env: { terrain: "field", glory: 0.5, night: 0.14, verdure: 0.28 }, cast: [
        C("rei", 140, "bow", { dy: 0.56, facing: -1, id: "rei-leste1" }),
        C("rei", 220, "lie", { dy: 0.62, id: "rei-leste2" }),
      ] }),
      // v.2 — SIOM, rei dos amorreus, que habitava em Hesbom (a leste do Jordão).
      b(2, { q: "Siom, rei dos amorreus", env: { glory: 0.46, night: 0.18 }, cast: [
        C("rei", 120, "lie", { dy: 0.62, id: "siom" }),
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
      ] }),
      // v.3 — o seu domínio: da campina até o MAR SALGADO para o oriente.
      b(3, { q: "o Mar Salgado para o oriente", env: { glory: 0.44, night: 0.18, verdure: 0.24 }, cast: [
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
        C("rei", 130, "lie", { dy: 0.62, id: "siom" }),
      ] }),
      // v.4 — OGUE, rei de Basã, DO RESTANTE DOS GIGANTES (escala grande). ÍCONE.
      b(4, { q: "Ogue, rei de Basã", env: { glory: 0.42, night: 0.2, storm: 0.06 }, cast: [
        C("rei", 130, "lie", { dy: 0.66, id: "ogue", scale: 2.4 }),
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
      ] }),
      // v.5 — Ogue DOMINAVA NO MONTE HERMOM, em Salcá e em toda a Basã.
      b(5, { q: "E dominava no monte Hermom", set: "estela-leste", props: ESTELA_LESTE,
        env: { terrain: "mountain", glory: 0.4, night: 0.22, verdure: 0.16 }, cast: [
        C("rei", 130, "lie", { dy: 0.66, id: "ogue", scale: 2.2 }),
        C("moises", -160, "stand", { dy: 0.46, facing: 1 }),
      ] }),
      // v.6 — MOISÉS, servo do Senhor, feriu-os e DEU esta terra a Rúben, Gade e Manassés.
      b(6, { q: "Moisés, servo do Senhor, deu esta terra em possessão",
        env: { terrain: "field", glory: 0.56, night: 0.12, verdure: 0.32 }, cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1, glow: 0.2 }),
        C("multidao", 140, "stand", { dy: 0.6 }),
      ] }),
      // v.7 — E ESTES OS REIS que JOSUÉ feriu aquém do Jordão, para o ocidente.
      b(7, { q: "Josué e os filhos de Israel feriram", set: "estela-oeste", props: ESTELA_OESTE,
        env: { terrain: "field", glory: 0.5, night: 0.14, verdure: 0.28 }, cast: [
        C("servo", -150, "point", { dy: 0.5, facing: 1, id: "josue", glow: 0.2 }),
        C("multidao", 150, "stand", { dy: 0.6 }),
      ] }),
      // v.8 — a terra e os povos: o HETEU, o AMORREU e o cananeu.
      b(8, { q: "o heteu, o amorreu, e o cananeu", env: { glory: 0.44, night: 0.18 }, cast: [
        C("servo", -150, "stand", { dy: 0.5, facing: 1, id: "josue" }),
        C("homem", 60, "bow", { dy: 0.56, facing: -1, id: "heteu" }),
        C("homem", 160, "bow", { dy: 0.54, facing: -1, id: "amorreu" }),
      ] }),
      // v.9 — o REI DE JERICÓ, um; o rei de Ai, outro. Começa o desfile dos vencidos.
      b(9, { q: "O rei de Jericó, um", env: { glory: 0.46, night: 0.16 }, cast: [
        C("rei", 110, "lie", { dy: 0.6, id: "jerico" }),
        C("rei", 210, "bow", { dy: 0.56, facing: -1, id: "ai" }),
        C("servo", -160, "point", { dy: 0.5, facing: 1, id: "josue" }),
      ] }),
      // v.10 — o rei de JERUSALÉM, outro; o rei de Hebrom, outro.
      b(10, { q: "O rei de Jerusalém, outro", env: { glory: 0.44 }, cast: [
        C("rei", -110, "lie", { dy: 0.6, id: "jerusalem" }),
        C("rei", 90, "bow", { dy: 0.56, facing: -1, id: "hebrom" }),
      ] }),
      // v.11 — o rei de JARMUTE, outro; o rei de Laquis, outro.
      b(11, { q: "O rei de Jarmute, outro", env: { glory: 0.46, night: 0.15 }, cast: [
        C("rei", 130, "bow", { dy: 0.56, facing: -1, id: "jarmute" }),
        C("rei", 30, "lie", { dy: 0.6, id: "laquis" }),
        C("servo", -160, "stand", { dy: 0.5, facing: 1, id: "josue" }),
      ] }),
      // v.12 — o rei de EGLOM, outro; o rei de Geser, outro.
      b(12, { q: "O rei de Eglom, outro", env: { glory: 0.44 }, cast: [
        C("rei", -90, "bow", { dy: 0.56, facing: 1, id: "eglom" }),
        C("rei", 120, "lie", { dy: 0.6, id: "geser" }),
      ] }),
      // v.13 — o rei de DEBIR, outro; o rei de Geder, outro.
      b(13, { q: "O rei de Debir, outro", set: "estela-oeste", props: ESTELA_OESTE,
        env: { terrain: "field", glory: 0.46, night: 0.16, verdure: 0.26 }, cast: [
        C("rei", 110, "lie", { dy: 0.6, id: "debir" }),
        C("rei", 210, "bow", { dy: 0.56, facing: -1, id: "geder" }),
        C("servo", -160, "point", { dy: 0.5, facing: 1, id: "josue" }),
      ] }),
      // v.14 — o rei de HORMÁ, outro; o rei de Harade, outro.
      b(14, { q: "O rei de Hormá, outro", env: { glory: 0.44 }, cast: [
        C("rei", 90, "bow", { dy: 0.56, facing: -1, id: "horma" }),
        C("rei", -60, "lie", { dy: 0.6, id: "harade" }),
      ] }),
      // v.15 — o rei de LIBNA, outro; o rei de Adulão, outro.
      b(15, { q: "O rei de Libna, outro", env: { glory: 0.46, night: 0.15 }, cast: [
        C("rei", 130, "lie", { dy: 0.6, id: "libna" }),
        C("rei", 40, "bow", { dy: 0.56, facing: -1, id: "adulao" }),
        C("servo", -160, "stand", { dy: 0.5, facing: 1, id: "josue" }),
      ] }),
      // v.16 — o rei de MAQUEDÁ, outro; o rei de Betel, outro.
      b(16, { q: "O rei de Maquedá, outro", env: { glory: 0.44 }, cast: [
        C("rei", -90, "lie", { dy: 0.6, id: "maqueda" }),
        C("rei", 110, "bow", { dy: 0.56, facing: -1, id: "betel" }),
      ] }),
      // v.17 — o rei de TAPUA, outro; o rei de Hefer, outro.
      b(17, { q: "O rei de Tapua, outro", env: { glory: 0.46, night: 0.16 }, cast: [
        C("rei", 120, "bow", { dy: 0.56, facing: -1, id: "tapua" }),
        C("rei", 20, "lie", { dy: 0.6, id: "hefer" }),
        C("servo", -160, "point", { dy: 0.5, facing: 1, id: "josue" }),
      ] }),
      // v.18 — o rei de AFEQUE, outro; o rei de Lassarom, outro.
      b(18, { q: "O rei de Afeque, outro", set: "estela-oeste", props: ESTELA_OESTE,
        env: { terrain: "field", glory: 0.44, night: 0.16, verdure: 0.26 }, cast: [
        C("rei", 100, "lie", { dy: 0.6, id: "afeque" }),
        C("rei", 200, "bow", { dy: 0.56, facing: -1, id: "lassarom" }),
      ] }),
      // v.19 — o rei de MADOM, outro; o rei de HAZOR, outro (os reis do norte).
      b(19, { q: "O rei de Madom, outro", env: { glory: 0.46, night: 0.15 }, cast: [
        C("rei", 120, "bow", { dy: 0.56, facing: -1, id: "madom" }),
        C("rei", 30, "lie", { dy: 0.6, id: "hazor" }),
        C("servo", -160, "stand", { dy: 0.5, facing: 1, id: "josue" }),
      ] }),
      // v.20 — o rei de SINROM-MEROM, outro; o rei de Acsafe, outro.
      b(20, { q: "O rei de Sinrom-Meron, outro", env: { glory: 0.44 }, cast: [
        C("rei", -90, "lie", { dy: 0.6, id: "sinrom" }),
        C("rei", 110, "bow", { dy: 0.56, facing: -1, id: "acsafe" }),
      ] }),
      // v.21 — o rei de TAANAQUE, outro; o rei de Megido, outro.
      b(21, { q: "O rei de Taanaque, outro", env: { glory: 0.46, night: 0.16 }, cast: [
        C("rei", 120, "bow", { dy: 0.56, facing: -1, id: "taanaque" }),
        C("rei", 20, "lie", { dy: 0.6, id: "megido" }),
        C("servo", -160, "point", { dy: 0.5, facing: 1, id: "josue" }),
      ] }),
      // v.22 — o rei de QUEDES, outro; o rei de Jocneão do Carmelo, outro.
      b(22, { q: "O rei de Quedes, outro", env: { glory: 0.44 }, cast: [
        C("rei", -90, "bow", { dy: 0.56, facing: 1, id: "quedes" }),
        C("rei", 110, "lie", { dy: 0.6, id: "jocneao" }),
      ] }),
      // v.23 — o rei de DOR no outeiro de Dor, outro; o rei de Goim em Gilgal, outro.
      b(23, { q: "O rei de Dor no outeiro de Dor, outro", set: "estela-oeste", props: ESTELA_OESTE,
        env: { terrain: "field", glory: 0.46, night: 0.15, verdure: 0.26 }, cast: [
        C("rei", 110, "lie", { dy: 0.6, id: "dor" }),
        C("rei", 210, "bow", { dy: 0.56, facing: -1, id: "goim" }),
        C("servo", -160, "point", { dy: 0.5, facing: 1, id: "josue" }),
      ] }),
      // v.24 — o rei de TIRZA, outro; TRINTA E UM REIS AO TODO. O memorial completo. ÍCONE.
      b(24, { q: "trinta e um reis ao todo", env: { terrain: "field", glory: 0.58, night: 0.12, verdure: 0.3 }, cast: [
        C("servo", -160, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.26 }),
        C("rei", 60, "bow", { dy: 0.56, facing: -1, id: "tirza" }),
        C("rei", 150, "lie", { dy: 0.6, id: "rei-final" }),
        C("multidao", 240, "stand", { dy: 0.66 }),
      ] }),
    ],
  },
};
