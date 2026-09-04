// ============================================================================
// NÚMEROS 3–4 — CENA VIVA. A tribo de LEVI: dada a Deus, guarda do santuário.
//
// Nm 3 — LEVI NO LUGAR DOS PRIMOGÊNITOS: em vez dos primogênitos de Israel (que
// eram do Senhor desde a Páscoa), Deus toma a tribo de Levi para o serviço da
// tenda. Contados os levitas: Gérson (a oeste), Coate (ao sul), Merari (ao
// norte), e Moisés/Arão à frente, ao oriente — cercando o tabernáculo.
//
// Nm 4 — O SERVIÇO DE CARGA: os coatitas levam as COISAS SANTÍSSIMAS (a arca, a
// mesa, o candelabro, os altares), cobertas por Arão, sem lhes tocar, para que
// não morram; os gersonitas levam as cortinas; os meraritas, as tábuas e bases.
//
// A VOZ DE DEUS (regra do projeto): a ordem vem do alto (`by: "deus"`), sem
// figura; Arão e os levitas (`arao`/`servo`) ao redor do tabernáculo.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const dv = (v: number) => b(v, { by: "deus" });

const ARRAIAL: StagePropSpec[] = [
  { ...P("tent", 0, 1.5, undefined, 0.1), tag: "tabernaculo" },
  P("tent", -260, 1.0, undefined, 0.2),
  P("tent", 200, 1.0, undefined, 0.22),
  P("palm", -310, 1.05, undefined, 0.14),
  P("well", 320, 1.0, undefined, 0.5),
  P("grass", -40, 0.82, undefined, 0.82),
  P("grass", 80, 0.78, undefined, 0.74),
];
// O SERVIÇO DE CARGA (Nm 4): as coisas santas cobertas — a arca velada, levada
// aos ombros pelos coatitas.
const CARGA: StagePropSpec[] = [
  { ...P("tent", -30, 1.4, undefined, 0.1), tag: "tabernaculo" },
  { ...P("ark", 90, 0.85, undefined, 0.5), tag: "arca-testemunho" },
  P("crate", 180, 0.85, undefined, 0.56),
  P("palm", -300, 1.05, undefined, 0.14),
  P("grass", -40, 0.82, undefined, 0.82),
];
const levitas = (): CastPlacement[] => [
  C("arao", -30, "stand", { glow: 0.2, dy: 0.52, facing: 1 }),
  C("servo", 40, "stand", { dy: 0.5, facing: -1, id: "levita" }),
  C("servo", 100, "stand", { dy: 0.46, facing: -1, id: "levita2" }),
];
// O ROL DOS NOMES (Nm 3:15-22): Moisés conta os filhos de Levi de um mês para
// cima, família por família, e o número é escrito.
const ROL: StagePropSpec[] = [
  { ...P("tent", -40, 1.45, undefined, 0.1), tag: "tabernaculo" },
  { ...P("scroll", 150, 0.9, undefined, 0.56), tag: "rol-dos-levitas" },
  P("crate", 235, 0.85, undefined, 0.5),
  P("palm", -310, 1.05, undefined, 0.14),
  P("grass", -60, 0.82, undefined, 0.82),
];
// AS TRÊS CASAS DE LEVI (Nm 3:17-22): Gérson, Coate e Merari, cada casa com a
// sua tenda em torno do tabernáculo.
const CASAS_LEVI: StagePropSpec[] = [
  { ...P("tent", 0, 1.5, undefined, 0.1), tag: "tabernaculo" },
  P("tent", -230, 1.0, undefined, 0.24),
  P("tent", 210, 1.0, undefined, 0.26),
  P("tent", -120, 0.8, undefined, 0.4),
  P("palm", -320, 1.05, undefined, 0.14),
  P("grass", 70, 0.8, undefined, 0.8),
];
// OS PRIMOGÊNITOS DE ISRAEL (Nm 3:40-43): contados um a um, de um mês para
// cima, porque são do SENHOR desde a noite do Egito.
const PRIMOGENITOS: StagePropSpec[] = [
  { ...P("tent", -60, 1.45, undefined, 0.1), tag: "tabernaculo" },
  P("tent", 250, 1.0, undefined, 0.24),
  P("stall", 150, 0.9, undefined, 0.5),
  P("well", 320, 1.0, undefined, 0.46),
  P("palm", -320, 1.05, undefined, 0.14),
  P("grass", -40, 0.82, undefined, 0.82),
];
// O RESGATE EM PRATA (Nm 3:46-51): cinco siclos por cabeça pelos duzentos e
// setenta e três que excediam o número dos levitas.
const RESGATE: StagePropSpec[] = [
  { ...P("tent", -80, 1.4, undefined, 0.1), tag: "tabernaculo" },
  { ...P("altar", 60, 0.9, 0.4, 0.5), tag: "altar-holocausto" },
  P("bowl", 175, 0.85, undefined, 0.58),
  P("amphora", 245, 0.75, undefined, 0.5),
  P("crate", 300, 0.8, undefined, 0.44),
  P("grass", -40, 0.8, undefined, 0.82),
];
// O CARGO DE ELEAZAR (Nm 4:16): o azeite da luminária, o incenso aromático, a
// oferta contínua e o azeite da unção — tudo o que alimenta a luz e o cheiro
// suave do santuário.
const CARGO_ELEAZAR: StagePropSpec[] = [
  { ...P("tent", -70, 1.42, undefined, 0.1), tag: "tabernaculo" },
  { ...P("menorah", 60, 1.0, 0.55, 0.44), tag: "candelabro-ouro" },
  { ...P("censer", 175, 0.85, undefined, 0.58), tag: "incenso-santo" },
  P("amphora", 250, 0.8, undefined, 0.5),
  P("amphora", 300, 0.7, undefined, 0.44),
  P("grass", -40, 0.8, undefined, 0.82),
];
// OS COATITAS (Nm 4:17-20): levam as coisas SANTÍSSIMAS já cobertas por Arão —
// e "não entrarão a ver, quando cobrirem o santuário, para que não morram".
const COATITAS: StagePropSpec[] = [
  { ...P("tent", -100, 1.4, undefined, 0.1), tag: "tabernaculo" },
  { ...P("ark", 40, 0.95, undefined, 0.5), tag: "arca-testemunho" },
  { ...P("lampstand", 150, 0.9, 0.4, 0.54), tag: "candelabro-ouro" },
  { ...P("altar", 240, 0.75, undefined, 0.46), tag: "altar-incenso" },
  P("grass", -60, 0.8, undefined, 0.84),
];
// OS GERSONITAS (Nm 4:22-28): as cortinas do tabernáculo, as cobertas de peles,
// a cortina da porta e as cortinas do pátio, com as suas cordas.
const GERSONITAS: StagePropSpec[] = [
  { ...P("tent", -60, 1.5, undefined, 0.12), tag: "tenda-congregacao" },
  { ...P("tent", 140, 1.05, undefined, 0.34), tag: "patio-tabernaculo" },
  P("crate", 240, 0.9, undefined, 0.52),
  P("crate", 300, 0.8, undefined, 0.44),
  P("palm", -320, 1.05, undefined, 0.14),
  P("grass", 40, 0.8, undefined, 0.8),
];
// OS MERARITAS (Nm 4:29-33): as tábuas, os varais, as COLUNAS e as bases do
// tabernáculo, e as colunas do pátio em redor, contadas nome por nome.
const MERARITAS: StagePropSpec[] = [
  { ...P("tent", -140, 1.3, undefined, 0.12), tag: "tabernaculo" },
  P("column", -10, 1.0, undefined, 0.4),
  P("column", 70, 1.0, undefined, 0.44),
  P("column", 150, 0.95, undefined, 0.48),
  P("crate", 250, 0.9, undefined, 0.52),
  P("grass", -60, 0.8, undefined, 0.84),
];
// O CENSO DAS FAMÍLIAS (Nm 4:34-48): Moisés, Arão e os príncipes contam os de
// trinta a cinquenta anos, casa por casa, e escrevem o número.
// A CASA SACERDOTAL DE ARÃO (Nm 3:2-4): os quatro filhos ungidos, o altar do
// holocausto e o azeite da consagração — e o fogo ESTRANHO que matou os dois
// mais velhos diante do SENHOR.
const CASA_DE_ARAO: StagePropSpec[] = [
  { ...P("tent", -110, 1.42, undefined, 0.12), tag: "tenda-congregacao" },
  { ...P("altar", 45, 0.95, 0.5, 0.46), tag: "altar-holocausto" },
  { ...P("censer", 150, 0.85, undefined, 0.58), tag: "incenso-santo" },
  P("amphora", 235, 0.8, undefined, 0.5),
  P("palm", -315, 1.05, undefined, 0.14),
  P("grass", -50, 0.8, undefined, 0.84),
];
const FOGO_ESTRANHO: StagePropSpec[] = [
  { ...P("tent", -150, 1.35, undefined, 0.12), tag: "tenda-congregacao" },
  { ...P("altar", -20, 0.9, undefined, 0.44), tag: "altar-incenso" },
  { ...P("campfire", 95, 1.1, 1, 0.62), tag: "fogo-do-senhor" },
  { ...P("censer", 185, 0.8, undefined, 0.68), tag: "incenso-santo" },
  P("rock", 280, 0.7, undefined, 0.42),
  P("grass", -60, 0.8, undefined, 0.86),
];
// OS COATITAS AO SUL (Nm 3:29): as tendas da casa de Coate arrumadas do lado
// sul do tabernáculo — a frente do palco.
const COATE_AO_SUL: StagePropSpec[] = [
  { ...P("tent", 0, 1.3, undefined, 0.1), tag: "tabernaculo" },
  P("tent", -230, 1.15, undefined, 0.66),
  P("tent", -50, 1.2, undefined, 0.76),
  P("tent", 175, 1.14, undefined, 0.68),
  P("palm", 310, 1.0, undefined, 0.18),
  P("grass", 90, 0.8, undefined, 0.88),
];
// A GUARDA DOS COATITAS (Nm 3:31): a arca, a mesa, o candelabro, os altares,
// os utensílios do santuário e o véu — as coisas santíssimas, uma a uma.
const GUARDA_SANTISSIMA: StagePropSpec[] = [
  { ...P("ark", -230, 0.95, undefined, 0.42), tag: "arca-testemunho" },
  { ...P("stall", -120, 1.0, undefined, 0.5), tag: "mesa-proposicao" },
  { ...P("menorah", -10, 1.0, 0.5, 0.56), tag: "candelabro-ouro" },
  { ...P("altar", 105, 0.85, 0.4, 0.48), tag: "altar-incenso" },
  { ...P("bowl", 195, 0.8, undefined, 0.62), tag: "ofertas-santuario" },
  { ...P("door", 285, 1.0, undefined, 0.4), tag: "veu-santissimo" },
];
// AS COISAS SANTAS COBERTAS UMA A UMA (Nm 4:5-14). Cada versículo é um objeto
// diferente sendo embrulhado para a marcha: a arca, a mesa, o candelabro, o
// altar de ouro, os utensílios e o altar do holocausto. A tenda fica sempre ao
// fundo, à esquerda; o que muda é a peça que está sendo velada.
const EMBRULHO = (...itens: StagePropSpec[]): StagePropSpec[] => [
  { ...P("tent", -255, 1.25, undefined, 0.14), tag: "tenda-congregacao" },
  ...itens,
  P("grass", -300, 0.75, undefined, 0.9),
];
const CENSO_LEVI: StagePropSpec[] = [
  { ...P("tent", -50, 1.45, undefined, 0.1), tag: "tabernaculo" },
  { ...P("scroll", 140, 0.9, undefined, 0.56), tag: "rol-dos-levitas" },
  P("crate", 225, 0.85, undefined, 0.5),
  P("well", 320, 1.0, undefined, 0.46),
  P("palm", -320, 1.05, undefined, 0.14),
  P("grass", -70, 0.82, undefined, 0.82),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Nm 3
  3: {
    start: { terrain: "desert", night: 0.1, glory: 0.62, storm: 0, fire: 0, verdure: 0.2 },
    beats: [
      b(1, { by: "deus", props: ARRAIAL, env: { terrain: "desert", glory: 0.64, night: 0.1, verdure: 0.2 }, cast: [ // as gerações de Arão e Moisés no dia em que o Senhor falou
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }), C("arao", -100, "kneel", { glow: 0.2, dy: 0.5, facing: 1 }),
      ] }),
      b(2, { set: "casa-de-arao", props: CASA_DE_ARAO, env: { terrain: "desert", glory: 0.6, night: 0.1 }, cast: [ // os nomes dos filhos de Arão: Nadabe, Abiú, Eleazar e Itamar
        C("arao", -180, "stand", { glow: 0.24, dy: 0.52, facing: -1 }),
        C("servo", -90, "stand", { dy: 0.56, facing: 1, id: "nadabe" }),
        C("servo", -20, "stand", { scale: 0.96, dy: 0.52, facing: 1, id: "abiu" }),
        C("servo", 55, "stand", { scale: 0.94, dy: 0.48, facing: 1, id: "eleazar" }),
        C("servo", 125, "stand", { scale: 0.92, dy: 0.44, facing: 1, id: "itamar" }),
      ] }),
      b(3, { q: "cujas mãos foram consagradas para administrar o sacerdócio", env: { glory: 0.74 }, cast: [ // os sacerdotes UNGIDOS, com as mãos consagradas
        C("arao", -170, "raise", { glow: 0.32, dy: 0.5, facing: -1 }),
        C("servo", -60, "kneel", { dy: 0.56, facing: 1, id: "nadabe" }),
        C("servo", 10, "kneel", { scale: 0.96, dy: 0.52, facing: 1, id: "abiu" }),
        C("servo", 80, "kneel", { scale: 0.94, dy: 0.48, facing: 1, id: "eleazar" }),
        C("servo", 150, "kneel", { scale: 0.92, dy: 0.44, facing: 1, id: "itamar" }),
      ] }),
      b(4, { q: "quando ofereceram fogo estranho perante o Senhor", set: "fogo-estranho", props: FOGO_ESTRANHO, env: { terrain: "desert", glory: 0.34, night: 0.4, fire: 0.7 }, cast: [ // Nadabe e Abiú MORREM diante do Senhor
        C("servo", 55, "lie", { scale: 1.35, dy: 0.66, facing: 1, id: "nadabe" }),
        C("servo", 145, "lie", { scale: 1.3, dy: 0.6, facing: -1, id: "abiu" }),
        C("arao", -195, "bow", { dy: 0.5, facing: -1 }),
        C("servo", -105, "stand", { dy: 0.54, facing: 1, id: "eleazar" }),
        C("servo", -45, "stand", { scale: 0.95, dy: 0.5, facing: 1, id: "itamar" }),
      ] }),
      b(5, { set: "arraial-levi", props: ARRAIAL, env: { terrain: "desert", glory: 0.8, night: 0.1, fire: 0 }, cast: [ // e falou o Senhor a Moisés, dizendo
        C("moises", -110, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(6, { by: "deus", q: "põe-na diante de Arão, o sacerdote", env: { glory: 0.7 }, cast: [ // "faze chegar a tribo de Levi e põe-na diante de Arão"
        C("moises", -180, "point", { dy: 0.5, facing: -1 }),
        C("arao", -80, "stand", { glow: 0.26, dy: 0.52, facing: -1 }),
        C("servo", 40, "walk", { dy: 0.54, facing: 1, id: "levita" }),
        C("servo", 120, "walk", { scale: 0.94, dy: 0.5, facing: 1, id: "levita2" }),
      ] }),
      b(7, { by: "deus", set: "arraial-levi", props: ARRAIAL, cast: levitas() }), // os levitas servirão a Arão e à congregação diante da tenda
      dv(8), dv(9), dv(10), b(11, {}),
      b(12, { by: "deus", q: "tenho tomado os levitas", cast: levitas() }),      // "tomei os LEVITAS em lugar dos primogênitos"
      // v.13-22 — POR QUE Levi: o primogênito é do Senhor desde o Egito; e o rol
      // das três casas de Levi, contadas de um mês para cima.
      b(13, { by: "deus", q: "santifiquei para mim todo o primogênito", set: "primogenitos", props: PRIMOGENITOS, env: { terrain: "desert", glory: 0.7, night: 0.12 }, cast: [ // todo primogênito é meu, desde o ferir do Egito
        C("homem", 60, "stand", { dy: 0.54, facing: -1, id: "primogenito" }),
        C("mulherComum", 130, "stand", { dy: 0.5, facing: -1, id: "mae-de-israel" }),
        C("rebanho", 210, "stand", { scale: 0.85, dy: 0.4, id: "primicias-do-gado" }),
      ] }),
      b(14, { set: "rol", props: ROL, env: { terrain: "desert", glory: 0.64, night: 0.1 }, cast: [ // e falou o Senhor a Moisés no deserto de Sinai
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(15, { by: "deus", cast: [                  // "conta os filhos de Levi, de um mês para cima"
        C("moises", -140, "point", { dy: 0.5, facing: 1 }),
        C("servo", 50, "stand", { dy: 0.52, facing: -1, id: "levita" }),
        C("servo", 120, "stand", { dy: 0.46, facing: -1, id: "levita2" }),
      ] }),
      b(16, { env: { glory: 0.66 }, cast: [             // Moisés os contou conforme o mandado do Senhor
        C("moises", -100, "write", { dy: 0.52, facing: 1 }),
        C("servo", 90, "stand", { dy: 0.48, facing: -1, id: "levita" }),
      ] }),
      b(17, { set: "casas-levi", props: CASAS_LEVI, env: { terrain: "desert", glory: 0.66, night: 0.1 }, cast: [ // os filhos de Levi: Gérson, Coate e Merari
        C("servo", -110, "stand", { dy: 0.52, facing: -1, id: "gersonita" }),
        C("servo", 0, "stand", { dy: 0.5, facing: -1, id: "coate" }),
        C("servo", 110, "stand", { dy: 0.48, facing: -1, id: "merari" }),
      ] }),
      b(18, { cast: [                                                            // os filhos de GÉRSON: Libni e Simei
        C("servo", -60, "stand", { dy: 0.54, facing: -1, id: "gersonita" }),
        C("servo", 30, "stand", { scale: 0.92, dy: 0.5, facing: -1, id: "libni" }),
        C("servo", 110, "stand", { scale: 0.92, dy: 0.46, facing: -1, id: "simei" }),
      ] }),
      b(19, { cast: [                                                            // os filhos de COATE: Amrão, Izar, Hebrom e Uziel
        C("servo", -80, "stand", { dy: 0.54, facing: -1, id: "coate" }),
        C("servo", 0, "stand", { scale: 0.92, dy: 0.5, facing: -1, id: "anrao-levita" }),
        C("servo", 75, "stand", { scale: 0.9, dy: 0.47, facing: -1, id: "izar" }),
        C("servo", 150, "stand", { scale: 0.88, dy: 0.44, facing: -1, id: "uziel" }),
      ] }),
      b(20, { cast: [                                                            // os filhos de MERARI: Mali e Musi
        C("servo", -50, "stand", { dy: 0.54, facing: -1, id: "merari" }),
        C("servo", 40, "stand", { scale: 0.92, dy: 0.5, facing: -1, id: "mali" }),
        C("servo", 120, "stand", { scale: 0.9, dy: 0.46, facing: -1, id: "musi" }),
      ] }),
      b(21, { set: "rol", props: ROL, env: { glory: 0.64 }, cast: [              // de Gérson, os libnitas e os simeítas
        C("servo", 40, "stand", { dy: 0.52, facing: -1, id: "gersonita" }),
        C("servo", 115, "stand", { scale: 0.92, dy: 0.47, facing: -1, id: "libni" }),
      ] }),
      b(22, { cast: [                                // os contados dos gersonitas: sete mil e quinhentos
        C("moises", -110, "write", { dy: 0.52, facing: 1 }),
        C("servo", 70, "stand", { dy: 0.48, facing: -1, id: "gersonita" }),
      ] }),
      b(23, { by: "deus", set: "arraial-levi", props: ARRAIAL, env: { terrain: "desert", glory: 0.64, night: 0.1 }, cast: [ C("servo", 40, "stand", { dy: 0.5, facing: -1, id: "gersonita" }) ] }), // os gersonitas acampam atrás do tabernáculo, ao ocidente
      dv(24), dv(25), dv(26), dv(27),
      b(28, { by: "deus", q: "que tinham cuidado da guarda do santuário", set: "censo-levi", props: CENSO_LEVI, env: { terrain: "desert", glory: 0.66, night: 0.1 }, cast: [ // oito mil e seiscentos coatitas, guardas do santuário
        C("moises", -130, "write", { dy: 0.52, facing: 1 }),
        C("servo", 40, "stand", { dy: 0.5, facing: -1, id: "coate" }),
        C("servo", 110, "stand", { scale: 0.94, dy: 0.46, facing: -1, id: "coatita" }),
      ] }),
      b(29, { by: "deus", q: "ao lado do tabernáculo, do lado do sul", set: "coate-ao-sul", props: COATE_AO_SUL, env: { terrain: "desert", glory: 0.62, night: 0.1 }, cast: [ // as tendas de Coate ao SUL do tabernáculo
        C("servo", -110, "stand", { dy: 0.66, facing: -1, id: "coate" }),
        C("servo", 25, "stand", { scale: 0.96, dy: 0.72, facing: 1, id: "coatita" }),
      ] }),
      b(30, { by: "deus", q: "Elisafã, filho de Uziel", cast: [                   // o príncipe da casa paterna dos coatitas
        C("servo", -40, "stand", { dy: 0.7, facing: -1, id: "elisafa-principe-coatita" }),
        C("servo", 90, "bow", { scale: 0.94, dy: 0.64, facing: -1, id: "coatita" }),
      ] }),
      b(31, { by: "deus", q: "a arca, e a mesa, e o candelabro, e os altares", set: "guarda-santissima", props: GUARDA_SANTISSIMA, env: { terrain: "desert", glory: 0.82, night: 0.08 }, cast: [ // a guarda dos coatitas, peça por peça
        C("servo", 40, "bow", { dy: 0.74, facing: -1, id: "coatita" }),
      ] }),
      b(32, { by: "deus", q: "o príncipe dos príncipes de Levi será Eleazar", env: { glory: 0.76 }, cast: [ // Eleazar, filho de Arão, sobre os guardas do santuário
        C("arao", -280, "stand", { glow: 0.26, dy: 0.5, facing: -1 }),
        C("servo", -175, "point", { dy: 0.58, facing: -1, id: "eleazar" }),
        C("servo", 55, "bow", { scale: 0.94, dy: 0.7, facing: 1, id: "coatita" }),
      ] }),
      b(33, { by: "deus", q: "De Merari é a família dos malitas e a família dos musitas", set: "casas-levi", props: CASAS_LEVI, env: { terrain: "desert", glory: 0.62, night: 0.1 }, cast: [ // as duas famílias de Merari
        C("servo", -50, "stand", { dy: 0.54, facing: -1, id: "mali" }),
        C("servo", 45, "stand", { scale: 0.94, dy: 0.5, facing: -1, id: "musi" }),
      ] }),
      b(34, { by: "deus", q: "seis mil e duzentos", set: "censo-levi", props: CENSO_LEVI, env: { glory: 0.66 }, cast: [ // os contados de Merari: seis mil e duzentos
        C("moises", -130, "write", { dy: 0.52, facing: 1 }),
        C("servo", 40, "stand", { dy: 0.5, facing: -1, id: "merari" }),
      ] }),
      b(35, { by: "deus", q: "ao lado do tabernáculo, do lado do norte", set: "merari-ao-norte", props: [ // Zuriel e as tendas de Merari ao NORTE, ao fundo do arraial
        { ...P("tent", 0, 1.26, undefined, 0.46), tag: "tabernaculo" },
        P("tent", -285, 0.8, undefined, 0.07),
        P("tent", -100, 0.84, undefined, 0.05),
        P("tent", 110, 0.84, undefined, 0.06),
        P("tent", 292, 0.8, undefined, 0.08),
        P("rock", -180, 0.62, undefined, 0.78),
        P("grass", 150, 0.8, undefined, 0.84),
      ], env: { terrain: "desert", glory: 0.62, night: 0.1 }, cast: [
        C("servo", -60, "stand", { dy: 0.64, facing: -1, id: "zuriel-principe-merarita" }),
        C("servo", 70, "stand", { scale: 0.94, dy: 0.6, facing: -1, id: "merarita" }),
      ] }),
      b(36, { by: "deus", q: "as tábuas do tabernáculo, os seus varais, as suas colunas, as suas bases", set: "meraritas", props: MERARITAS, env: { terrain: "desert", glory: 0.66, night: 0.1 }, cast: [ // a carga de Merari: as tábuas, os varais, as colunas e as bases
        C("servo", -230, "stand", { dy: 0.6, facing: -1, id: "merarita" }),
        C("servo", 300, "stand", { scale: 0.92, dy: 0.56, facing: 1, id: "musi" }),
      ] }),
      b(37, { by: "deus", q: "as colunas do pátio em redor", props: [             // e as colunas do PÁTIO em redor, com as bases, estacas e cordas
        { ...P("tent", 0, 1.35, undefined, 0.14), tag: "tabernaculo" },
        { ...P("column", -250, 0.95, undefined, 0.5), tag: "patio-tabernaculo" },
        P("column", -150, 0.95, undefined, 0.56),
        P("column", 150, 0.95, undefined, 0.56),
        P("column", 250, 0.95, undefined, 0.5),
        P("crate", 40, 0.85, undefined, 0.72),
        P("grass", -60, 0.8, undefined, 0.86),
      ], env: { glory: 0.64 }, cast: [
        C("servo", -55, "stand", { dy: 0.66, facing: -1, id: "merarita" }),
      ] }),
      b(38, { by: "deus", q: "diante da tenda da congregação", cast: [           // Moisés e Arão acampam ao oriente, diante da tenda
        C("moises", -60, "stand", { dy: 0.5, facing: -1 }), C("arao", 0, "stand", { glow: 0.2, dy: 0.5, facing: -1 }),
      ] }),
      // v.39-51 — O RESGATE: contados os levitas (22.000) e os primogênitos de
      // Israel (22.273); os 273 que sobram são resgatados a cinco siclos.
      b(39, { set: "rol", props: ROL, env: { terrain: "desert", glory: 0.66, night: 0.1 }, cast: [ // todos os levitas contados: vinte e dois mil
        C("moises", -120, "write", { dy: 0.52, facing: 1 }),
        C("arao", -50, "stand", { glow: 0.22, dy: 0.5, facing: 1 }),
        C("servo", 90, "stand", { dy: 0.48, facing: -1, id: "levita" }),
      ] }),
      b(40, { by: "deus", q: "E disse o Senhor a Moisés:", set: "primogenitos", props: PRIMOGENITOS, env: { terrain: "desert", glory: 0.68, night: 0.1 }, cast: [ // "conta todo primogênito de Israel, de um mês para cima"
        C("moises", -140, "point", { dy: 0.5, facing: 1 }),
        C("homem", 60, "stand", { dy: 0.54, facing: -1, id: "primogenito" }),
        C("mulherComum", 135, "stand", { dy: 0.5, facing: -1, id: "mae-de-israel" }),
      ] }),
      b(41, { by: "deus", cast: [                       // "tomarás os levitas em lugar dos primogênitos, e os seus animais"
        C("servo", -40, "stand", { dy: 0.52, facing: -1, id: "levita" }),
        C("homem", 90, "stand", { dy: 0.5, facing: -1, id: "primogenito" }),
        C("rebanho", 200, "stand", { scale: 0.85, dy: 0.4, id: "primicias-do-gado" }),
      ] }),
      b(42, { cast: [                                      // e contou Moisés todo primogênito entre os filhos de Israel
        C("moises", -110, "write", { dy: 0.52, facing: 1 }),
        C("multidao", 140, "stand", { dy: 0.44 }),
      ] }),
      b(43, { env: { glory: 0.7 }, cast: [ // os primogênitos: vinte e dois mil duzentos e setenta e três
        C("homem", 20, "stand", { dy: 0.54, facing: -1, id: "primogenito" }),
        C("homem", 100, "stand", { scale: 0.92, dy: 0.48, facing: -1, id: "primogenito2" }),
        C("multidao", 200, "stand", { scale: 0.9, dy: 0.42 }),
      ] }),
      b(44, { set: "rol", props: ROL, env: { terrain: "desert", glory: 0.66, night: 0.1 }, cast: [ // e falou o Senhor a Moisés
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(45, { by: "deus", q: "os levitas serão meus", env: { glory: 0.72 }, cast: [ // "os levitas serão meus; eu sou o Senhor"
        C("servo", 30, "stand", { dy: 0.52, facing: -1, id: "levita" }),
        C("servo", 105, "stand", { dy: 0.48, facing: -1, id: "levita2" }),
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(46, { by: "deus", set: "resgate", props: RESGATE, env: { terrain: "desert", glory: 0.66, night: 0.1, fire: 0.35 }, cast: [ // os duzentos e setenta e três que excedem, a resgatar
        C("homem", 120, "stand", { dy: 0.52, facing: -1, id: "primogenito" }),
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
      ] }),
      b(47, { by: "deus", cast: [                             // "tomarás cinco siclos por cabeça, segundo o siclo do santuário"
        C("moises", -140, "stand", { dy: 0.5, facing: 1 }),
        C("homem", 100, "bow", { dy: 0.52, facing: -1, id: "primogenito" }),
      ] }),
      b(48, { by: "deus", cast: [          // "a Arão e a seus filhos darás o dinheiro dos resgatados"
        C("arao", -30, "stand", { glow: 0.28, dy: 0.52, facing: -1 }),
        C("servo", 60, "stand", { dy: 0.48, facing: -1, id: "filho-de-arao" }),
      ] }),
      b(49, { cast: [                        // Moisés tomou o dinheiro do resgate dos que excederam
        C("moises", -60, "point", { dy: 0.52, facing: -1 }),
        C("homem", 110, "bow", { dy: 0.5, facing: -1, id: "primogenito" }),
      ] }),
      b(50, { env: { glory: 0.7 }, cast: [ // mil trezentos e sessenta e cinco siclos, segundo o siclo do santuário
        C("moises", -80, "write", { dy: 0.52, facing: 1 }),
        C("servo", 70, "stand", { dy: 0.48, facing: -1, id: "levita" }),
      ] }),
      b(51, { env: { glory: 0.74 }, cast: [ // e Moisés deu o dinheiro a Arão e a seus filhos
        C("moises", -140, "stand", { dy: 0.5, facing: 1 }),
        C("arao", -50, "raise", { glow: 0.35, dy: 0.5, facing: 1 }),
        C("servo", 70, "stand", { dy: 0.48, facing: -1, id: "filho-de-arao" }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Nm 4
  4: {
    start: { terrain: "desert", night: 0.1, glory: 0.62, storm: 0, fire: 0, verdure: 0.2 },
    beats: [
      b(1, { props: ARRAIAL, env: { terrain: "desert", glory: 0.64, night: 0.1, verdure: 0.2 }, cast: [ // o Senhor fala a Moisés e a Arão
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }), C("arao", -100, "kneel", { glow: 0.2, dy: 0.5, facing: 1 }),
      ] }),
      dv(2), dv(3), dv(4),
      b(5, { by: "deus", set: "carga", props: CARGA, env: { terrain: "desert", glory: 0.7, night: 0.12 }, cast: [ // ao partir o arraial, Arão cobre a arca do testemunho com o véu
        C("arao", 40, "stand", { glow: 0.3, dy: 0.5, facing: -1 }),
      ] }),
      b(6, { by: "deus", q: "uma coberta de peles de texugos", props: EMBRULHO(  // a arca velada: peles de texugos, pano azul, e os VARAIS postos
        { ...P("ark", -20, 1.0, undefined, 0.48), tag: "arca-testemunho" },
        P("crate", 120, 0.85, undefined, 0.6),
        P("crate", 215, 0.75, undefined, 0.52),
      ), env: { glory: 0.72 }, cast: [
        C("arao", -130, "bow", { glow: 0.28, dy: 0.54, facing: -1 }),
        C("servo", 60, "bow", { dy: 0.62, facing: 1, id: "eleazar" }),
      ] }),
      b(7, { by: "deus", q: "sobre a mesa da proposição estenderão um pano azul", props: EMBRULHO( // a MESA da proposição, com os pratos, as taças e o pão contínuo
        { ...P("stall", -30, 1.1, undefined, 0.46), tag: "mesa-proposicao" },
        { ...P("bowl", 90, 0.85, undefined, 0.62), tag: "ofertas-santuario" },
        P("amphora", 175, 0.8, undefined, 0.54),
        P("amphora", 240, 0.7, undefined, 0.46),
      ), env: { glory: 0.7 }, cast: [
        C("arao", -140, "stand", { glow: 0.26, dy: 0.52, facing: -1 }),
        C("servo", 25, "bow", { dy: 0.66, facing: 1, id: "itamar" }),
      ] }),
      b(8, { by: "deus", q: "um pano de carmesim", props: EMBRULHO(               // sobre a mesa, o pano de CARMESIM, e depois as peles e os varais
        { ...P("stall", -60, 1.1, undefined, 0.5), tag: "mesa-proposicao" },
        P("crate", 65, 0.9, undefined, 0.64),
        P("crate", 165, 0.8, undefined, 0.56),
      ), env: { glory: 0.66 }, cast: [
        C("servo", -170, "stand", { dy: 0.56, facing: -1, id: "eleazar" }),
        C("servo", 255, "stand", { scale: 0.94, dy: 0.5, facing: 1, id: "itamar" }),
      ] }),
      b(9, { by: "deus", q: "cobrirão o candelabro da luminária", props: EMBRULHO( // o CANDELABRO, as lâmpadas, os espevitadores e os vasos de azeite
        { ...P("menorah", -20, 1.1, 0.55, 0.46), tag: "candelabro-ouro" },
        P("amphora", 110, 0.85, undefined, 0.62),
        P("amphora", 175, 0.75, undefined, 0.54),
        P("bowl", 250, 0.75, undefined, 0.46),
      ), env: { glory: 0.76 }, cast: [
        C("arao", -145, "raise", { glow: 0.3, dy: 0.54, facing: -1 }),
      ] }),
      b(10, { by: "deus", q: "o colocarão sobre os varais", props: EMBRULHO(      // o candelabro embrulhado e posto sobre os varais
        { ...P("menorah", -70, 1.0, undefined, 0.5), tag: "candelabro-ouro" },
        P("crate", 55, 0.95, undefined, 0.66),
        P("crate", 160, 0.85, undefined, 0.58),
        P("crate", 250, 0.75, undefined, 0.5),
      ), env: { glory: 0.62 }, cast: [
        C("servo", -160, "stand", { dy: 0.6, facing: -1, id: "coate" }),
        C("servo", 300, "stand", { scale: 0.94, dy: 0.54, facing: 1, id: "coatita" }),
      ] }),
      b(11, { by: "deus", q: "sobre o altar de ouro estenderão um pano azul", props: EMBRULHO( // o ALTAR DE OURO — o altar do incenso — coberto de azul
        { ...P("altar", -20, 1.0, undefined, 0.48), tag: "altar-incenso" },
        { ...P("censer", 110, 0.85, undefined, 0.64), tag: "incenso-santo" },
        P("crate", 215, 0.8, undefined, 0.54),
      ), env: { glory: 0.72 }, cast: [
        C("arao", -140, "bow", { glow: 0.28, dy: 0.54, facing: -1 }),
      ] }),
      b(12, { by: "deus", q: "todos os utensílios do ministério", props: EMBRULHO( // TODOS OS UTENSÍLIOS do ministério, num pano azul, sobre os varais
        { ...P("bowl", -60, 0.95, undefined, 0.5), tag: "ofertas-santuario" },
        P("bowl", 30, 0.85, undefined, 0.64),
        P("amphora", 120, 0.85, undefined, 0.56),
        P("crate", 210, 0.9, undefined, 0.48),
        P("crate", 300, 0.8, undefined, 0.62),
      ), env: { glory: 0.64 }, cast: [
        C("servo", -160, "bow", { dy: 0.7, facing: -1, id: "itamar" }),
      ] }),
      b(13, { by: "deus", q: "E tirarão as cinzas do altar", props: EMBRULHO(     // as CINZAS tiradas do altar do holocausto, e o pano de púrpura
        { ...P("altar", 20, 1.15, undefined, 0.46), tag: "altar-holocausto" },
        { ...P("bowl", 155, 0.9, undefined, 0.66), tag: "ofertas-santuario" },
        P("crate", 255, 0.8, undefined, 0.52),
      ), env: { glory: 0.6, fire: 0 }, cast: [
        C("servo", -150, "kneel", { dy: 0.7, facing: -1, id: "eleazar" }),
        C("servo", 300, "stand", { scale: 0.92, dy: 0.5, facing: 1, id: "coatita" }),
      ] }),
      b(14, { by: "deus", q: "os seus braseiros, os garfos e as pás, e as bacias", props: EMBRULHO( // os instrumentos do altar: braseiros, garfos, pás e bacias
        { ...P("altar", -55, 1.05, undefined, 0.44), tag: "altar-cobre" },
        { ...P("censer", 60, 0.9, undefined, 0.6), tag: "incenso-santo" },
        P("bowl", 150, 0.9, undefined, 0.7),
        P("bowl", 235, 0.8, undefined, 0.56),
        P("crate", 310, 0.85, undefined, 0.46),
      ), env: { glory: 0.66 }, cast: [
        C("arao", -160, "stand", { glow: 0.26, dy: 0.56, facing: -1 }),
      ] }),
      b(15, { by: "deus", q: "não tocarão para que não morram", set: "carga", props: CARGA, env: { terrain: "desert", glory: 0.7, night: 0.12 }, cast: [ // os coatitas as LEVAM, mas não TOCAM, para que não morram
        C("arao", -170, "point", { glow: 0.28, dy: 0.5, facing: -1 }),
        C("servo", 40, "walk", { dy: 0.56, facing: -1, id: "coate" }),
        C("servo", 115, "walk", { scale: 0.94, dy: 0.5, facing: -1, id: "coate2" }),
      ] }),
      // v.16 — o cargo de ELEAZAR: o azeite da luminária, o incenso, a oferta contínua
      b(16, { by: "deus", set: "cargo-eleazar", props: CARGO_ELEAZAR, env: { terrain: "desert", glory: 0.68, night: 0.1 }, cast: [
        C("servo", -30, "stand", { glow: 0.25, dy: 0.52, facing: 1, id: "eleazar" }),
        C("arao", -130, "stand", { glow: 0.2, dy: 0.5, facing: 1 }),
      ] }),
      // v.17-20 — OS COATITAS: as coisas santíssimas cobertas, levadas sem ver nem tocar
      b(17, { set: "coatitas", props: COATITAS, env: { terrain: "desert", glory: 0.66, night: 0.1 }, cast: [
        C("moises", -180, "kneel", { dy: 0.5, facing: 1 }),
        C("arao", -230, "kneel", { glow: 0.2, dy: 0.46, facing: 1 }),
      ] }),
      b(18, { by: "deus", cast: [                                                // "não deixareis extirpar a tribo das famílias dos coatitas"
        C("servo", -180, "stand", { dy: 0.52, facing: 1, id: "coate" }),
        C("servo", -110, "stand", { scale: 0.94, dy: 0.48, facing: 1, id: "coate2" }),
      ] }),
      b(19, { by: "deus", cast: [                                                // Arão e seus filhos designam a cada um o seu serviço e cargo
        C("arao", -200, "point", { glow: 0.25, dy: 0.5, facing: 1 }),
        C("servo", -130, "stand", { glow: 0.2, dy: 0.52, facing: 1, id: "eleazar" }),
        C("servo", 120, "bow", { dy: 0.5, facing: -1, id: "coate" }),
      ] }),
      b(20, { by: "deus", env: { glory: 0.58, night: 0.14 }, cast: [             // "não entrarão a VER, quando cobrirem o santuário, para que não morram"
        C("servo", 190, "bow", { dy: 0.48, facing: 1, id: "coate" }),
        C("servo", 250, "bow", { scale: 0.92, dy: 0.44, facing: 1, id: "coate2" }),
      ] }),
      // v.21-28 — OS GERSONITAS: as cortinas do tabernáculo e do pátio, sob a mão de Itamar
      b(21, { set: "gersonitas", props: GERSONITAS, env: { terrain: "desert", glory: 0.64, night: 0.1 }, cast: [
        C("moises", -180, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(22, { by: "deus", cast: [                                                // "fazei também a soma dos filhos de GÉRSON"
        C("moises", -180, "point", { dy: 0.5, facing: 1 }),
        C("servo", 0, "stand", { dy: 0.54, facing: -1, id: "gersonita" }),
        C("servo", 80, "stand", { scale: 0.94, dy: 0.5, facing: -1, id: "libni" }),
      ] }),
      b(23, { by: "deus", cast: [                                                // de trinta a cinquenta anos: os que entram a servir
        C("servo", -30, "stand", { dy: 0.54, facing: -1, id: "gersonita" }),
        C("servo", 50, "stand", { scale: 0.94, dy: 0.5, facing: -1, id: "libni" }),
        C("servo", 125, "stand", { scale: 0.9, dy: 0.46, facing: -1, id: "simei" }),
      ] }),
      b(24, { by: "deus", cast: [                                                // este será o ministério dos gersonitas: o serviço e o CARGO
        C("servo", 200, "walk", { dy: 0.5, facing: -1, id: "gersonita" }),
        C("servo", 275, "walk", { scale: 0.92, dy: 0.46, facing: -1, id: "libni" }),
      ] }),
      b(25, { by: "deus", cast: [                                                // levarão as cortinas do tabernáculo e a tenda da congregação
        C("servo", -140, "walk", { dy: 0.52, facing: 1, id: "gersonita" }),
        C("servo", -10, "walk", { scale: 0.94, dy: 0.48, facing: 1, id: "libni" }),
      ] }),
      b(26, { by: "deus", cast: [                                                // e as cortinas do PÁTIO, e a cortina da porta, e as suas cordas
        C("servo", 90, "walk", { dy: 0.52, facing: 1, id: "gersonita" }),
        C("servo", 170, "stand", { scale: 0.94, dy: 0.48, facing: -1, id: "simei" }),
      ] }),
      b(27, { by: "deus", cast: [                                                // todo o seu cargo será por ordem de Arão e de seus filhos
        C("arao", -170, "point", { glow: 0.25, dy: 0.5, facing: 1 }),
        C("servo", -90, "stand", { dy: 0.52, facing: 1, id: "itamar" }),
        C("servo", 110, "bow", { dy: 0.5, facing: -1, id: "gersonita" }),
      ] }),
      b(28, { by: "deus", cast: [                                                // a guarda deles sob a mão de ITAMAR, filho de Arão
        C("servo", -40, "point", { glow: 0.2, dy: 0.52, facing: 1, id: "itamar" }),
        C("servo", 90, "walk", { dy: 0.5, facing: 1, id: "gersonita" }),
        C("servo", 170, "walk", { scale: 0.92, dy: 0.46, facing: 1, id: "libni" }),
      ] }),
      // v.29-33 — OS MERARITAS: as tábuas, os varais, as colunas e as bases
      b(29, { by: "deus", set: "meraritas", props: MERARITAS, env: { terrain: "desert", glory: 0.64, night: 0.1 }, cast: [
        C("servo", -40, "stand", { dy: 0.54, facing: -1, id: "merari" }),
        C("servo", 45, "stand", { scale: 0.94, dy: 0.5, facing: -1, id: "mali" }),
      ] }),
      b(30, { by: "deus", cast: [                                                // de trinta a cinquenta anos: os contados para este serviço
        C("servo", -80, "stand", { dy: 0.54, facing: -1, id: "merari" }),
        C("servo", 0, "stand", { scale: 0.94, dy: 0.5, facing: -1, id: "mali" }),
        C("servo", 80, "stand", { scale: 0.9, dy: 0.46, facing: -1, id: "musi" }),
      ] }),
      b(31, { by: "deus", cast: [                                                // o seu cargo: as TÁBUAS do tabernáculo, os varais, as colunas e as bases
        C("servo", 210, "walk", { dy: 0.5, facing: -1, id: "merari" }),
        C("servo", 290, "walk", { scale: 0.92, dy: 0.46, facing: -1, id: "mali" }),
      ] }),
      b(32, { by: "deus", cast: [                                                // as colunas do pátio, as estacas e as cordas — contadas NOME POR NOME
        C("servo", -60, "write", { dy: 0.52, facing: 1, id: "itamar" }),
        C("servo", 100, "stand", { dy: 0.5, facing: -1, id: "merari" }),
      ] }),
      b(33, { by: "deus", cast: [                                                // o ministério dos meraritas, sob a mão de Itamar
        C("servo", -50, "point", { glow: 0.2, dy: 0.52, facing: 1, id: "itamar" }),
        C("servo", 80, "walk", { dy: 0.5, facing: 1, id: "merari" }),
        C("servo", 160, "walk", { scale: 0.92, dy: 0.46, facing: 1, id: "musi" }),
      ] }),
      // v.34-48 — O CENSO DAS TRÊS FAMÍLIAS: Moisés, Arão e os príncipes contam e escrevem
      b(34, { by: "deus", set: "censo-levi", props: CENSO_LEVI, env: { terrain: "desert", glory: 0.66, night: 0.1 }, cast: [
        C("moises", -150, "write", { dy: 0.52, facing: 1 }),
        C("arao", -80, "stand", { glow: 0.22, dy: 0.5, facing: 1 }),
        C("anciao", -220, "stand", { dy: 0.46, facing: 1, id: "principe-da-congregacao" }),
      ] }),
      b(35, { by: "deus", cast: [                                                // os coatitas de trinta a cinquenta anos passam diante deles
        C("servo", 60, "stand", { dy: 0.54, facing: -1, id: "coate" }),
        C("servo", 140, "stand", { scale: 0.94, dy: 0.5, facing: -1, id: "coate2" }),
      ] }),
      b(36, { by: "deus", cast: [                                                // os contados dos coatitas: dois mil setecentos e cinquenta
        C("moises", -120, "write", { dy: 0.52, facing: 1 }),
        C("servo", 70, "stand", { dy: 0.5, facing: -1, id: "coate" }),
      ] }),
      b(37, { by: "deus", env: { glory: 0.68 }, cast: [                          // estes são os que ministravam na tenda da congregação
        C("arao", -60, "raise", { glow: 0.3, dy: 0.52, facing: 1 }),
        C("servo", 90, "stand", { dy: 0.5, facing: -1, id: "coate" }),
      ] }),
      b(38, { by: "deus", env: { glory: 0.64 }, cast: [                          // semelhantemente os filhos de GÉRSON, pelas suas famílias
        C("servo", -70, "stand", { dy: 0.54, facing: -1, id: "gersonita" }),
        C("servo", 15, "stand", { scale: 0.94, dy: 0.5, facing: -1, id: "libni" }),
      ] }),
      b(39, { by: "deus", cast: [                                                // de trinta a cinquenta anos, os que entram no ministério
        C("servo", 40, "stand", { dy: 0.54, facing: -1, id: "gersonita" }),
        C("servo", 120, "stand", { scale: 0.92, dy: 0.5, facing: -1, id: "libni" }),
        C("servo", 195, "stand", { scale: 0.88, dy: 0.46, facing: -1, id: "simei" }),
      ] }),
      b(40, { by: "deus", cast: [                                                // os contados: dois mil seiscentos e trinta
        C("moises", -130, "write", { dy: 0.52, facing: 1 }),
        C("servo", 50, "stand", { dy: 0.5, facing: -1, id: "gersonita" }),
      ] }),
      b(41, { by: "deus", cast: [                                                // os gersonitas contados conforme o mandado do Senhor
        C("arao", -70, "raise", { glow: 0.28, dy: 0.52, facing: 1 }),
        C("servo", 80, "stand", { dy: 0.5, facing: -1, id: "gersonita" }),
        C("anciao", -200, "stand", { dy: 0.46, facing: 1, id: "principe-da-congregacao" }),
      ] }),
      b(42, { by: "deus", cast: [                                                // e os contados dos filhos de MERARI, pelas suas famílias
        C("servo", -50, "stand", { dy: 0.54, facing: -1, id: "merari" }),
        C("servo", 35, "stand", { scale: 0.94, dy: 0.5, facing: -1, id: "mali" }),
      ] }),
      b(43, { by: "deus", cast: [                                                // de trinta a cinquenta anos, para o ministério
        C("servo", 70, "stand", { dy: 0.54, facing: -1, id: "merari" }),
        C("servo", 150, "stand", { scale: 0.92, dy: 0.5, facing: -1, id: "mali" }),
        C("servo", 225, "stand", { scale: 0.88, dy: 0.46, facing: -1, id: "musi" }),
      ] }),
      b(44, { by: "deus", cast: [                                                // os contados: três mil e duzentos
        C("moises", -110, "write", { dy: 0.52, facing: 1 }),
        C("servo", 60, "stand", { dy: 0.5, facing: -1, id: "merari" }),
      ] }),
      b(45, { by: "deus", cast: [                                                // os meraritas, contados por Moisés e Arão
        C("moises", -140, "stand", { dy: 0.5, facing: 1 }),
        C("arao", -70, "stand", { glow: 0.25, dy: 0.5, facing: 1 }),
        C("servo", 90, "stand", { dy: 0.5, facing: -1, id: "merari" }),
      ] }),
      b(46, { by: "deus", env: { glory: 0.7 }, cast: [                           // TODOS os contados dos levitas, pelos príncipes de Israel
        C("moises", -170, "write", { dy: 0.5, facing: 1 }),
        C("arao", -100, "stand", { glow: 0.25, dy: 0.5, facing: 1 }),
        C("anciao", -240, "stand", { dy: 0.44, facing: 1, id: "principe-da-congregacao" }),
        C("servo", 60, "stand", { dy: 0.52, facing: -1, id: "coate" }),
        C("servo", 140, "stand", { scale: 0.94, dy: 0.48, facing: -1, id: "gersonita" }),
        C("servo", 215, "stand", { scale: 0.9, dy: 0.44, facing: -1, id: "merari" }),
      ] }),
      b(47, { by: "deus", cast: [                                                // todos os que entravam a executar o ministério e levar o CARGO
        C("servo", 30, "walk", { dy: 0.52, facing: 1, id: "coate" }),
        C("servo", 115, "walk", { scale: 0.94, dy: 0.48, facing: 1, id: "gersonita" }),
        C("servo", 195, "walk", { scale: 0.9, dy: 0.44, facing: 1, id: "merari" }),
      ] }),
      b(48, { by: "deus", env: { glory: 0.72 }, cast: [                          // oito mil quinhentos e oitenta — a soma das famílias de Levi
        C("moises", -130, "write", { dy: 0.52, facing: 1 }),
        C("arao", -60, "raise", { glow: 0.3, dy: 0.5, facing: 1 }),
      ] }),
      b(49, { q: "como o Senhor ordenara a Moisés", env: { glory: 0.68 }, cast: [ // contados conforme o Senhor ordenara pela mão de Moisés
        C("moises", -140, "stand", { dy: 0.5, facing: 1 }),
        C("servo", 60, "stand", { dy: 0.5, facing: -1, id: "levita" }),
      ] }),
    ],
  },
};
