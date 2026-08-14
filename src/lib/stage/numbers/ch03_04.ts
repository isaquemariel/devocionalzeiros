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
  P("pillar", -10, 1.0, undefined, 0.4),
  P("pillar", 70, 1.0, undefined, 0.44),
  P("pillar", 150, 0.95, undefined, 0.48),
  P("crate", 250, 0.9, undefined, 0.52),
  P("grass", -60, 0.8, undefined, 0.84),
];
// O CENSO DAS FAMÍLIAS (Nm 4:34-48): Moisés, Arão e os príncipes contam os de
// trinta a cinquenta anos, casa por casa, e escrevem o número.
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
      dv(2), dv(3), dv(4), dv(5), dv(6),
      b(7, { by: "deus", cast: levitas() }),                                     // os levitas servirão a Arão e à congregação diante da tenda
      dv(8), dv(9), dv(10), dv(11),
      b(12, { by: "deus", q: "tenho tomado os levitas", cast: levitas() }),      // "tomei os LEVITAS em lugar dos primogênitos"
      // v.13-22 — POR QUE Levi: o primogênito é do Senhor desde o Egito; e o rol
      // das três casas de Levi, contadas de um mês para cima.
      b(13, { by: "deus", q: "santifiquei para mim todo o primogênito", set: "primogenitos", props: PRIMOGENITOS, env: { terrain: "desert", glory: 0.7, night: 0.12 }, cast: [ // todo primogênito é meu, desde o ferir do Egito
        C("homem", 60, "stand", { dy: 0.54, facing: -1, id: "primogenito" }),
        C("mulherComum", 130, "stand", { dy: 0.5, facing: -1, id: "mae-de-israel" }),
        C("rebanho", 210, "stand", { scale: 0.85, dy: 0.4, id: "primicias-do-gado" }),
      ] }),
      b(14, { by: "deus", set: "rol", props: ROL, env: { terrain: "desert", glory: 0.64, night: 0.1 }, cast: [ // e falou o Senhor a Moisés no deserto de Sinai
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
      b(28, { by: "deus", cast: [ C("servo", 40, "stand", { dy: 0.5, facing: -1, id: "coate" }) ] }), // os coatitas ao sul, guardas do santuário
      dv(29), dv(30), dv(31), dv(32), dv(33),
      b(34, { by: "deus", cast: [ C("servo", 40, "stand", { dy: 0.5, facing: -1, id: "merari" }) ] }), // os meraritas ao norte
      dv(35), dv(36), dv(37),
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
      b(40, { by: "deus", set: "primogenitos", props: PRIMOGENITOS, env: { terrain: "desert", glory: 0.68, night: 0.1 }, cast: [ // "conta todo primogênito de Israel, de um mês para cima"
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
      b(44, { by: "deus", set: "rol", props: ROL, env: { terrain: "desert", glory: 0.66, night: 0.1 }, cast: [ // e falou o Senhor a Moisés
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
      b(1, { by: "deus", props: ARRAIAL, env: { terrain: "desert", glory: 0.64, night: 0.1, verdure: 0.2 }, cast: [ // o Senhor fala a Moisés e a Arão
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }), C("arao", -100, "kneel", { glow: 0.2, dy: 0.5, facing: 1 }),
      ] }),
      dv(2), dv(3), dv(4),
      b(5, { by: "deus", set: "carga", props: CARGA, env: { terrain: "desert", glory: 0.7, night: 0.12 }, cast: [ // ao partir o arraial, Arão cobre a arca do testemunho com o véu
        C("arao", 40, "stand", { glow: 0.3, dy: 0.5, facing: -1 }),
      ] }),
      dv(6), dv(7), dv(8), dv(9), dv(10), dv(11), dv(12), dv(13), dv(14),         // as coisas santas cobertas para o transporte
      b(15, { by: "deus", q: "não tocarão para que não morram", cast: [                  // os coatitas as LEVAM, mas não TOCAM, para que não morram
        C("servo", 40, "stand", { dy: 0.52, facing: -1, id: "coate" }),
        C("servo", 100, "stand", { dy: 0.48, facing: -1, id: "coate2" }),
      ] }),
      dv(16), dv(17), dv(18), dv(19), dv(20), dv(21), dv(22), dv(23), dv(24), dv(25),
      dv(26), dv(27), dv(28), dv(29), dv(30), dv(31), dv(32), dv(33), dv(34), dv(35),
      dv(36), dv(37), dv(38), dv(39), dv(40), dv(41), dv(42), dv(43), dv(44), dv(45),
      dv(46), dv(47), dv(48),
      b(49, { q: "como o Senhor ordenara a Moisés", env: { glory: 0.68 }, cast: [ // contados conforme o Senhor ordenara pela mão de Moisés
        C("moises", -140, "stand", { dy: 0.5, facing: 1 }),
        C("servo", 60, "stand", { dy: 0.5, facing: -1, id: "levita" }),
      ] }),
    ],
  },
};
