// ============================================================================
// NÚMEROS 33–34 — CENA VIVA. O ROTEIRO das jornadas; os LIMITES da terra.
//
// Nm 33 — AS JORNADAS DE ISRAEL: do Egito às campinas de Moabe, etapa por etapa.
// Moisés ESCREVE as saídas (v2). Partem de Ramessés (v3), passam pelo meio do
// mar (v8), acham em Elim doze fontes e setenta palmeiras (v9), acampam junto ao
// Mar Vermelho (v10), chegam ao deserto do Sinai (v15). Arão morre no monte Hor
// (v38). Ao fim, junto ao Jordão, a ordem: LANÇAR FORA os moradores, destruir os
// ídolos e os altos, e repartir a terra por sortes (v50-56).
//
// Nm 34 — OS LIMITES DE CANAÃ: sul (deserto de Zim / Mar Salgado), ocidente (o
// Mar Grande), norte (até o monte Hor) e oriente (o Jordão). E os homens que
// REPARTIRÃO a terra por herança: Eleazar, Josué e um príncipe de cada tribo.
//
// A VOZ DE DEUS (regra do projeto): a ordem vem do alto (`by: "deus"`), sem
// figura; a coluna (`pillar`) guia as jornadas; Moisés escreve e conduz.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const dv = (v: number) => b(v, { by: "deus" });

// A CARAVANA em marcha: a coluna de nuvem/fogo guiando à frente, as tendas de
// acampamento, palmeira e poço do oásis.
const TRAVEL: StagePropSpec[] = [
  { ...P("pillar", 0, 1.5, 0.3, 0.12), tag: "coluna" },
  P("tent", -240, 1.0, undefined, 0.2),
  P("tent", 220, 0.95, undefined, 0.22),
  P("palm", -310, 1.05, undefined, 0.14),
  P("well", 300, 1.0, undefined, 0.5),
  P("grass", -40, 0.82, undefined, 0.82),
  P("grass", 80, 0.78, undefined, 0.74),
];
// ELIM: doze fontes de águas e setenta palmeiras — o oásis, capricho de água.
const ELIM: StagePropSpec[] = [
  P("palm", -300, 1.1, undefined, 0.14),
  P("palm", -170, 1.0, undefined, 0.2),
  P("palm", 180, 1.05, undefined, 0.18),
  P("palm", 300, 1.1, undefined, 0.14),
  P("well", -70, 0.9, undefined, 0.56),
  P("well", 70, 0.95, undefined, 0.5),
  P("well", 160, 0.85, undefined, 0.62),
  P("grass", -20, 0.85, undefined, 0.82),
  P("grass", 100, 0.8, undefined, 0.74),
];
// SINAI: o monte da Lei, a coluna de fogo, rochas.
const SINAI: StagePropSpec[] = [
  { ...P("pillar", 0, 1.6, 0.5, 0.1), tag: "coluna-fogo" },
  P("rock", -220, 1.2, undefined, 0.3),
  P("rock", 240, 1.1, undefined, 0.32),
  P("tent", 300, 0.9, undefined, 0.24),
  P("grass", -60, 0.8, undefined, 0.82),
];
// MONTE HOR: a morte de Arão — sóbrio, rochoso.
const HOR: StagePropSpec[] = [
  P("rock", -40, 1.6, undefined, 0.2),
  P("rock", 200, 1.2, undefined, 0.34),
  P("rock", -260, 1.1, undefined, 0.36),
];
// CAMPINAS DE MOABE, junto ao Jordão: o rio, as tendas do último acampamento.
const MOAB: StagePropSpec[] = [
  { ...P("river", 0, 1.4, undefined, 0.4), tag: "jordao" },
  P("tent", -260, 1.0, undefined, 0.2),
  P("tent", 240, 0.95, undefined, 0.22),
  P("palm", -320, 1.05, undefined, 0.14),
  P("grass", -40, 0.82, undefined, 0.82),
  P("grass", 90, 0.78, undefined, 0.74),
];
// ---------------------------------------------------------------- ETAPAS (v16-36)
// Cada versículo do roteiro é UM LUGAR. Os cenários abaixo revezam-se etapa a
// etapa para que a cena VIAJE: acampamento, pedregal, arbustos do deserto,
// fenda de rocha, poços, ribeiros, porto e montes.

// ACAMPAMENTO de etapa: as tendas armadas e a fogueira da noite (Hazerote,
// Queelata, Maquelote, Moserote).
const ACAMPA: StagePropSpec[] = [
  P("tent", -230, 1.05, undefined, 0.2),
  P("tent", -60, 1.0, undefined, 0.26),
  P("tent", 190, 0.95, undefined, 0.24),
  P("campfire", 60, 0.85, 0.6, 0.62),
  P("rock", 300, 0.9, undefined, 0.36),
  P("grass", -130, 0.8, undefined, 0.8),
];
// PEDREGAL: etapa de rocha nua, sem água nem verdura (Rissa, Taate, Hasmona).
const PEDREGAL: StagePropSpec[] = [
  P("rock", -180, 1.35, undefined, 0.28),
  P("rock", 60, 1.1, undefined, 0.5),
  P("rock", 250, 0.95, undefined, 0.34),
  P("rock", -305, 0.8, undefined, 0.62),
];
// RETAMA: os arbustos do deserto — Ritmá tem o nome da giesta (1Rs 19:4).
const RETAMA: StagePropSpec[] = [
  P("bush", -200, 1.1, undefined, 0.36),
  P("bush", 120, 1.0, undefined, 0.56),
  P("bush", 255, 0.9, undefined, 0.4),
  P("grass", -60, 0.85, undefined, 0.8),
  P("rock", 305, 0.85, undefined, 0.3),
];
// FENDA: a brecha entre as rochas, com a árvore que resiste (Rimom-Perez).
const FENDA: StagePropSpec[] = [
  P("rock", -120, 1.5, undefined, 0.24),
  P("rock", 145, 1.4, undefined, 0.26),
  P("tree", 20, 1.0, undefined, 0.54),
  P("grass", -245, 0.8, undefined, 0.7),
];
// POÇOS: as cisternas de Bene-Jaacã (Dt 10:6) e as águas doces de Mitca.
const POCOS: StagePropSpec[] = [
  P("well", -140, 1.0, undefined, 0.52),
  P("well", 115, 0.95, undefined, 0.62),
  P("palm", -285, 1.05, undefined, 0.16),
  P("palm", 265, 1.0, undefined, 0.18),
  P("grass", -20, 0.85, undefined, 0.8),
  P("grass", 195, 0.8, undefined, 0.72),
];
// RIBEIROS: Jotbatá, "terra de ribeiros de águas" (Dt 10:7).
const RIBEIROS: StagePropSpec[] = [
  P("river", -20, 1.35, undefined, 0.46),
  P("palm", -300, 1.05, undefined, 0.14),
  P("palm", 285, 1.0, undefined, 0.16),
  P("tree", 190, 0.95, undefined, 0.28),
  P("grass", -150, 0.9, undefined, 0.82),
  P("grass", 120, 0.88, undefined, 0.76),
];
// PORTO: Ezion-Geber, à beira do mar, onde depois ancorariam as naus de Salomão
// (1Rs 9:26).
const PORTO: StagePropSpec[] = [
  P("river", 0, 1.5, undefined, 0.6),
  P("boat", -150, 1.05, undefined, 0.38),
  P("rock", 225, 1.0, undefined, 0.34),
  P("palm", -310, 1.0, undefined, 0.14),
];
// MONTES: a subida áspera do monte de Séfer e de Hor-Hagidgade.
const MONTES: StagePropSpec[] = [
  P("rock", -60, 1.7, undefined, 0.18),
  P("rock", 195, 1.3, undefined, 0.3),
  P("rock", -270, 1.15, undefined, 0.34),
  P("grass", 90, 0.75, undefined, 0.78),
];

// A CARAVANA numa etapa: Moisés à frente, o povo atrás. `dx` desloca todo o
// grupo para que dois acampamentos seguidos nunca tenham o mesmo enquadramento.
const marcha = (dx: number, pose = "walk"): CastPlacement[] => [
  C("moises", dx - 110, pose, { dy: 0.5, facing: 1 }),
  C("multidao", dx + 70, pose, { dy: 0.46 }),
];

// FRONTEIRAS DE CANAÃ (Nm 34): terra de herança, o Jordão a oriente, torres nas
// cidades limítrofes.
const FRONTEIRAS: StagePropSpec[] = [
  { ...P("river", 150, 1.4, undefined, 0.4), tag: "jordao" },
  P("tower", -250, 1.1, undefined, 0.24),
  P("tower", 270, 1.0, undefined, 0.26),
  P("tent", -60, 0.9, undefined, 0.32),
  P("grass", -40, 0.82, undefined, 0.82),
  P("grass", 90, 0.78, undefined, 0.74),
];
// --------------------------------------------------------- OS MARCOS (Nm 34:3-12)
// Cada versículo do limite é UM MARCO GEOGRÁFICO. A cena percorre a fronteira:
// do Mar Salgado ao sul, pelo rio do Egito ao Mar Grande, sobe ao monte Hor e às
// cidades do norte, e desce pelo Quinerete até o Jordão.

// SUL: o deserto de Zim e os termos de Edom, à extremidade do Mar Salgado.
const LIM_SUL: StagePropSpec[] = [
  { ...P("river", 130, 1.45, undefined, 0.58), tag: "mar-salgado" },
  P("rock", -170, 1.35, undefined, 0.28),
  P("rock", -310, 1.0, undefined, 0.42),
  P("grass", -40, 0.7, undefined, 0.82),
];
// ACRABIM e CADES-BARNÉIA: a subida dos escorpiões e a fonte do julgamento.
const LIM_ACRABIM: StagePropSpec[] = [
  P("rock", -90, 1.55, undefined, 0.22),
  P("rock", 120, 1.25, undefined, 0.34),
  P("well", 20, 0.95, undefined, 0.64),
  P("palm", 270, 1.0, undefined, 0.16),
  P("bush", -260, 0.95, undefined, 0.46),
];
// RIO DO EGITO: o uádi que desce ao mar, marco extremo do sudoeste.
const LIM_RIO: StagePropSpec[] = [
  P("river", -60, 1.4, undefined, 0.5),
  P("palm", -300, 1.05, undefined, 0.14),
  P("palm", 210, 1.0, undefined, 0.2),
  P("bush", 120, 0.9, undefined, 0.66),
  P("grass", 20, 0.8, undefined, 0.8),
];
// MAR GRANDE: o limite do ocidente, aberto até o horizonte.
const LIM_MAR: StagePropSpec[] = [
  P("river", 20, 1.7, undefined, 0.62),
  P("boat", 200, 0.95, undefined, 0.38),
  P("rock", -230, 1.05, undefined, 0.3),
  { ...P("birds", -60, 1.0, undefined, 0.55), sky: true },
  { ...P("birds", 140, 0.85, undefined, 0.68), sky: true },
];
// NORTE: do Mar Grande ao monte Hor — a serra que fecha a herança em cima.
const LIM_NORTE: StagePropSpec[] = [
  P("rock", -30, 1.8, undefined, 0.16),
  P("rock", 200, 1.35, undefined, 0.3),
  P("rock", -260, 1.2, undefined, 0.36),
  P("grass", 90, 0.75, undefined, 0.8),
];
// HAMATE e ZEDADE: as cidades muradas da entrada do norte.
const LIM_CIDADES: StagePropSpec[] = [
  { ...P("tower", -70, 1.3, undefined, 0.22), tag: "entrada-hamate" },
  P("tower", 190, 1.05, undefined, 0.3),
  P("rock", 300, 0.95, undefined, 0.4),
  P("grass", 40, 0.78, undefined, 0.8),
];
// HAZAR-ENÃ: "a aldeia das fontes", onde as saídas do termo do norte param.
const LIM_FONTES: StagePropSpec[] = [
  P("well", -110, 1.05, undefined, 0.54),
  P("well", 130, 0.95, undefined, 0.64),
  P("palm", -290, 1.05, undefined, 0.16),
  P("palm", 250, 1.0, undefined, 0.18),
  P("tent", 20, 0.9, undefined, 0.3),
  P("grass", -30, 0.8, undefined, 0.82),
];
// ORIENTE: de Hazar-Enã a Sefã, o descampado alto de onde o limite desce.
const LIM_ORIENTE: StagePropSpec[] = [
  P("rock", -140, 1.3, undefined, 0.26),
  P("tent", 90, 1.0, undefined, 0.3),
  P("rock", 280, 1.0, undefined, 0.4),
  P("bush", -20, 0.9, undefined, 0.64),
  P("grass", 180, 0.8, undefined, 0.78),
];
// QUINERETE: a borda do mar da Galileia, verde e farta.
const LIM_QUINERETE: StagePropSpec[] = [
  { ...P("river", 40, 1.55, undefined, 0.52), tag: "mar-de-quinerete" },
  P("palm", -300, 1.05, undefined, 0.14),
  P("tree", -140, 1.0, undefined, 0.28),
  P("grass", -30, 0.9, undefined, 0.82),
  P("grass", 160, 0.85, undefined, 0.74),
];
// JORDÃO: o rio que desce até o Mar Salgado e fecha a fronteira ao redor.
const LIM_JORDAO: StagePropSpec[] = [
  { ...P("river", -30, 1.5, undefined, 0.44), tag: "jordao" },
  { ...P("river", 210, 1.2, undefined, 0.7), tag: "mar-salgado" },
  P("palm", -310, 1.05, undefined, 0.14),
  P("rock", 300, 0.95, undefined, 0.34),
  P("grass", 60, 0.8, undefined, 0.82),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Nm 33
  33: {
    start: { terrain: "desert", night: 0.1, glory: 0.58, storm: 0, fire: 0, verdure: 0.2 },
    beats: [
      b(1, { q: "jornadas dos filhos de Israel", props: TRAVEL, env: { terrain: "desert", glory: 0.6, night: 0.1, verdure: 0.2 }, cast: [ // as jornadas de Israel, saídos do Egito, sob Moisés e Arão
        C("moises", -140, "walk", { dy: 0.5, facing: 1 }),
        C("arao", -80, "walk", { glow: 0.2, dy: 0.5, facing: 1 }),
        C("multidao", 150, "walk", { dy: 0.44 }),
      ] }),
      b(2, { q: "escreveu Moisés as suas saídas", props: [ ...TRAVEL, { ...P("scroll", -180, 0.85, undefined, 0.56), tag: "rol" } ], cast: [ // Moisés ESCREVE as saídas conforme o mandado do Senhor
        C("moises", -160, "write", { dy: 0.52, facing: 1 }),
      ] }),
      b(3, { q: "de Ramessés", cast: [                                            // partem de Ramessés, no dia seguinte à páscoa, por alta mão
        C("moises", -150, "walk", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "walk", { dy: 0.46 }),
        C("multidao", 210, "walk", { scale: 0.9, dy: 0.42, id: "povo2" }),
      ] }),
      b(4, { q: "executado juízos também contra os seus deuses", env: { glory: 0.28, night: 0.32 }, props: [ // os egípcios enterram seus primogênitos; juízo contra seus deuses
        { ...P("clouds", -160, 1.2, undefined, 0.7), sky: true } as StagePropSpec,
        { ...P("clouds", 120, 1.1, undefined, 0.62), sky: true } as StagePropSpec,
        P("rock", -220, 1.1, undefined, 0.3),
        P("grass", -40, 0.7, undefined, 0.82),
      ] }),
      b(5, { props: TRAVEL, env: { terrain: "desert", glory: 0.58, night: 0.1, verdure: 0.2 } }), // de Ramessés a Sucote
      b(6),                                                                       // de Sucote a Etã, no fim do deserto
      b(7),                                                                       // a Pi-Hairote, defronte de Baal-Zefom
      b(8, { q: "passaram pelo meio do mar" }),                                   // passaram pelo meio do mar, três dias no deserto de Etã, a Mara
      b(9, { q: "doze fontes de águas e setenta palmeiras", props: ELIM, env: { terrain: "desert", glory: 0.66, night: 0.08, verdure: 0.4 }, cast: [ // ELIM: doze fontes e setenta palmeiras
        C("multidao", -20, "stand", { dy: 0.5 }),
        C("multidao", 120, "kneel", { dy: 0.46, id: "povo2" }),
      ] }),
      b(10, { q: "junto ao Mar Vermelho", props: TRAVEL, env: { terrain: "desert", glory: 0.58, night: 0.1, verdure: 0.2 } }), // acampam junto ao Mar Vermelho
      b(11),                                                                      // do Mar Vermelho ao deserto de Sim
      b(12),                                                                      // a Dofca
      b(13),                                                                      // a Alus
      b(14, { q: "não havia ali água" }),                                         // a Refidim: não havia ali água
      b(15, { q: "deserto de Sinai", props: SINAI, env: { terrain: "mountain", glory: 0.62, night: 0.1, fire: 0.15, verdure: 0.14 }, cast: [ // ao deserto do SINAI
        C("moises", -120, "stand", { dy: 0.5, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.46 }),
      ] }),
      b(16, { props: TRAVEL, env: { terrain: "desert", glory: 0.58, night: 0.1, verdure: 0.2 } }), // a Quibrote-Taavá
      b(17, { set: "hazerote", props: ACAMPA, env: { terrain: "desert", glory: 0.5, night: 0.26, verdure: 0.16 }, cast: marcha(-40, "stand") }), // a Hazerote, onde Miriã ficou fora do arraial (Nm 12:15)
      b(18, { set: "ritma", props: RETAMA, env: { glory: 0.56, night: 0.12, verdure: 0.26 }, cast: marcha(70) }),   // a Ritmá, a giesta do deserto
      b(19, { set: "rimom", props: FENDA, env: { glory: 0.52, night: 0.14, verdure: 0.18 }, cast: marcha(-90) }), // a Rimom-Perez, a brecha na rocha
      b(20, { set: "libna", props: RETAMA, env: { glory: 0.6, night: 0.1, verdure: 0.32 }, cast: marcha(110) }),    // a Libna
      b(21, { set: "rissa", props: PEDREGAL, env: { terrain: "desert", glory: 0.5, night: 0.12, verdure: 0.06 }, cast: marcha(-70) }), // a Rissa, pedregal sem água
      b(22, { set: "queelata", props: ACAMPA, env: { glory: 0.55, night: 0.22, verdure: 0.18 }, cast: marcha(40, "stand") }), // a Queelata, "a assembleia"
      b(23, { set: "sefer", props: MONTES, env: { terrain: "mountain", glory: 0.5, night: 0.16, verdure: 0.1 }, cast: marcha(-100) }), // ao monte de Séfer
      b(24, { set: "harada", props: PEDREGAL, env: { terrain: "mountain", glory: 0.36, night: 0.3, verdure: 0.06 }, cast: marcha(90) }), // a Harada, "o tremor"
      b(25, { set: "maquelote", props: ACAMPA, env: { terrain: "desert", glory: 0.55, night: 0.2, verdure: 0.18 }, cast: marcha(-30, "stand") }), // a Maquelote
      b(26, { set: "taate", props: PEDREGAL, env: { glory: 0.5, night: 0.12, verdure: 0.06 }, cast: marcha(120) }), // a Taate
      b(27, { set: "tara", props: RETAMA, env: { glory: 0.54, verdure: 0.22 }, cast: marcha(-80) }),                 // a Tara
      b(28, { set: "mitca", props: POCOS, env: { glory: 0.64, night: 0.08, verdure: 0.4 }, cast: marcha(30, "kneel") }), // a Mitca, "a doçura" — o povo se abaixa às águas
      b(29, { set: "hasmona", props: PEDREGAL, env: { glory: 0.5, night: 0.14, verdure: 0.08 }, cast: marcha(-110) }), // a Hasmona
      b(30, { set: "moserote", props: ACAMPA, env: { glory: 0.52, night: 0.24, verdure: 0.16 }, cast: marcha(80, "stand") }), // a Moserote
      b(31, { set: "bene-jaaca", props: POCOS, env: { glory: 0.6, night: 0.1, verdure: 0.36 }, cast: marcha(-50, "stand") }), // a Bene-Jaacã, dos poços (Dt 10:6)
      b(32, { set: "hor-hagidgade", props: MONTES, env: { terrain: "mountain", glory: 0.46, night: 0.18, verdure: 0.1 }, cast: marcha(100) }), // a Hor-Hagidgade
      b(33, { set: "jotbata", props: RIBEIROS, env: { terrain: "field", glory: 0.66, night: 0.08, verdure: 0.6 }, cast: marcha(-60, "stand") }), // a Jotbatá, terra de ribeiros de águas (Dt 10:7)
      b(34, { set: "abrona", props: RETAMA, env: { terrain: "desert", glory: 0.56, night: 0.12, verdure: 0.24 }, cast: marcha(60) }), // a Abrona
      b(35, { set: "ezion-geber", props: PORTO, env: { glory: 0.6, night: 0.1, verdure: 0.14, water: 0.55 }, cast: marcha(-100, "stand") }), // a Ezion-Geber, o porto do mar
      b(36, { set: "cades", props: [...PEDREGAL, P("tent", 305, 0.9, undefined, 0.22)], env: { terrain: "desert", glory: 0.5, night: 0.14, verdure: 0.08, water: 0 }, cast: marcha(40, "stand") }), // ao deserto de Zim, que é Cades
      b(37, { q: "monte Hor", props: HOR, env: { terrain: "mountain", glory: 0.5, night: 0.14, verdure: 0.1 } }), // ao monte Hor, no fim de Edom
      b(38, { q: "morreu ali", env: { terrain: "mountain", glory: 0.42, night: 0.2, verdure: 0.08 }, cast: [ // Arão sobe ao monte Hor e MORRE ali
        C("arao", -20, "lie", { glow: 0.15, dy: 0.4, facing: 1 }),
        C("moises", -160, "bow", { dy: 0.52, facing: 1 }),
      ] }),
      b(39),                                                                      // Arão de cento e vinte e três anos, ao morrer
      b(40, { q: "rei de Harade", props: TRAVEL, env: { terrain: "desert", glory: 0.58, night: 0.1, verdure: 0.2 } }), // o cananeu, rei de Harade, ouve que Israel chega
      b(41, { set: "zalmona", props: PEDREGAL, env: { terrain: "desert", glory: 0.46, night: 0.24, verdure: 0.05 }, cast: marcha(-90) }), // a Zalmona, "a sombria"
      b(42, { set: "punom", props: [                                              // a Punom, entre as escavações de cobre de Edom
        P("rock", -215, 1.45, undefined, 0.22),
        P("rock", 30, 1.2, undefined, 0.42),
        P("crate", 175, 0.9, undefined, 0.6),
        P("campfire", 275, 0.85, 0.6, 0.46),
      ], env: { terrain: "desert", glory: 0.42, night: 0.3, fire: 0.4, verdure: 0.04 }, cast: marcha(60) }),
      b(43, { set: "obote", props: POCOS, env: { terrain: "desert", glory: 0.6, night: 0.12, fire: 0, verdure: 0.34 }, cast: marcha(-40, "kneel") }), // a Obote, "os odres" — o povo se abaixa às cisternas
      b(44, { set: "ije-abarim", props: [                                          // a Ije-Abarim, já no TERMO de Moabe
        P("tent", -190, 1.1, undefined, 0.26),
        P("tent", 205, 1.0, undefined, 0.3),
        P("rock", 30, 1.3, undefined, 0.22),
        P("rock", 310, 0.9, undefined, 0.5),
        P("grass", -70, 0.8, undefined, 0.82),
      ], env: { terrain: "desert", glory: 0.52, night: 0.2, verdure: 0.18 }, cast: marcha(110, "stand") }),
      b(45, { set: "dibom-gade", props: [                                          // a Dibom-Gade, a cidade murada da planície
        { ...P("tower", -30, 1.3, undefined, 0.24), tag: "cidade" },
        P("tower", 175, 1.05, undefined, 0.32),
        P("well", 300, 1.0, undefined, 0.46),
        P("palm", -320, 1.05, undefined, 0.16),
        P("grass", 90, 0.8, undefined, 0.8),
      ], env: { terrain: "city", glory: 0.56, night: 0.12, verdure: 0.36 }, cast: marcha(-120, "stand") }),
      b(46, { set: "almom-diblataim", props: RIBEIROS, env: { terrain: "field", glory: 0.64, night: 0.08, verdure: 0.62 }, cast: marcha(70) }), // a Almom-Diblataim, "os dois bolos de figo" — terra de fruto
      b(47, { q: "nos montes de Abarim, defronte de Nebo", set: "abarim", props: MONTES, env: { terrain: "mountain", glory: 0.44, night: 0.22, verdure: 0.14 }, cast: marcha(-60, "stand") }), // aos montes de ABARIM, defronte de Nebo
      b(48, { q: "campinas de Moabe, junto ao Jordão", props: MOAB, env: { terrain: "field", glory: 0.6, night: 0.1, verdure: 0.35 }, cast: [ // às campinas de Moabe, junto ao Jordão, defronte de Jericó
        C("multidao", 140, "stand", { dy: 0.46 }),
      ] }),
      b(49),                                                                      // acampam desde Bete-Jesimote até Abel-Sitim
      b(50, { by: "deus", env: { terrain: "field", glory: 0.66, night: 0.1, verdure: 0.35 }, cast: [ // o Senhor fala a Moisés nas campinas de Moabe
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(51, { by: "deus", q: "passado o Jordão" }),                               // "quando houverdes passado o Jordão para Canaã"
      b(52, { by: "deus", q: "Lançareis fora todos os moradores da terra", cast: [ // LANÇAR FORA os moradores, destruir imagens e altos
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 140, "stand", { dy: 0.46 }),
      ] }),
      dv(53),                                                                     // tomareis a terra em possessão, pois vo-la tenho dado
      b(54, { by: "deus", q: "por sortes herdareis a terra" }),                   // "por SORTES herdareis a terra, segundo as famílias"
      b(55, { by: "deus", q: "espinhos nos vossos olhos" }),                      // se não os lançardes: serão espinhos nos vossos olhos
      dv(56),                                                                     // "farei a vós como pensei fazer-lhes a eles"
    ],
  },

  // ------------------------------------------------------------------ Nm 34
  34: {
    start: { terrain: "field", night: 0.1, glory: 0.62, storm: 0, fire: 0, verdure: 0.4 },
    beats: [
      b(1, { props: FRONTEIRAS, env: { terrain: "field", glory: 0.66, night: 0.1, verdure: 0.4 }, cast: [ // o Senhor fala a Moisés
        C("moises", -160, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(2, { by: "deus", q: "a terra de Canaã", cast: [                           // "quando entrardes na terra de Canaã, esta é a herança"
        C("moises", -160, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(3, { by: "deus", q: "O lado do sul", set: "sul", props: LIM_SUL, env: { terrain: "desert", glory: 0.6, night: 0.12, verdure: 0.12 }, cast: [ // LIMITE SUL: deserto de Zim, Edom, Mar Salgado
        C("moises", -230, "point", { dy: 0.5, facing: 1 }),
        C("homem", -60, "stand", { dy: 0.52, facing: -1, id: "demarcador" }),
      ] }),
      b(4, { by: "deus", set: "acrabim", props: LIM_ACRABIM, env: { glory: 0.56, night: 0.14, verdure: 0.16 }, cast: [ // o limite rodeia por Acrabim até Cades-Barnéia
        C("homem", -220, "walk", { dy: 0.5, facing: 1, id: "demarcador" }),
        C("homem", 190, "stand", { scale: 0.94, dy: 0.44, facing: -1, id: "demarcador2" }),
      ] }),
      b(5, { by: "deus", set: "rio-do-egito", props: LIM_RIO, env: { glory: 0.6, night: 0.1, verdure: 0.26, water: 0.35 }, cast: [ // rodeia de Azmom até o rio do Egito, ao mar
        C("homem", 200, "point", { dy: 0.48, facing: -1, id: "demarcador" }),
      ] }),
      b(6, { by: "deus", q: "o Mar Grande vos será por limite", set: "mar-grande", props: LIM_MAR, env: { terrain: "field", glory: 0.66, night: 0.08, verdure: 0.3, water: 0.6 }, cast: [ // LIMITE OCIDENTE: o Mar Grande
        C("moises", -240, "stand", { dy: 0.5, facing: 1 }),
        C("multidao", -110, "stand", { dy: 0.44 }),
      ] }),
      b(7, { by: "deus", q: "o termo do norte", set: "norte", props: LIM_NORTE, env: { terrain: "mountain", glory: 0.5, night: 0.16, verdure: 0.14, water: 0 }, cast: [ // LIMITE NORTE: do Mar Grande até o monte Hor
        C("homem", -190, "walk", { dy: 0.5, facing: 1, id: "demarcador" }),
      ] }),
      b(8, { by: "deus", set: "hamate", props: LIM_CIDADES, env: { terrain: "field", glory: 0.54, night: 0.14, verdure: 0.3 }, cast: [ // do monte Hor até a entrada de Hamate, a Zedade
        C("homem", 100, "stand", { dy: 0.5, facing: -1, id: "demarcador" }),
        C("homem", 250, "stand", { scale: 0.92, dy: 0.42, facing: -1, id: "demarcador2" }),
      ] }),
      b(9, { by: "deus", set: "hazar-ena", props: LIM_FONTES, env: { glory: 0.6, night: 0.1, verdure: 0.42 }, cast: [ // até Zifrom, saídas em Hazar-Enã: termo do norte
        C("homem", -200, "stand", { dy: 0.5, facing: 1, id: "demarcador" }),
        C("multidao", 200, "stand", { dy: 0.44 }),
      ] }),
      b(10, { by: "deus", q: "do lado do oriente", set: "oriente", props: LIM_ORIENTE, env: { terrain: "desert", glory: 0.56, night: 0.12, verdure: 0.2 }, cast: [ // LIMITE ORIENTE: de Hazar-Enã até Sefã
        C("homem", -230, "point", { dy: 0.5, facing: 1, id: "demarcador" }),
      ] }),
      b(11, { by: "deus", set: "quinerete", props: LIM_QUINERETE, env: { terrain: "field", glory: 0.64, night: 0.08, verdure: 0.6, water: 0.45 }, cast: [ // desce a Ribla, à borda do mar de Quinerete
        C("homem", 230, "walk", { dy: 0.48, facing: -1, id: "demarcador" }),
        C("multidao", -180, "stand", { dy: 0.44 }),
      ] }),
      b(12, { by: "deus", q: "ao longo do Jordão", set: "jordao", props: LIM_JORDAO, env: { glory: 0.66, night: 0.08, verdure: 0.45, water: 0.4 }, cast: [ // desce pelo Jordão até o Mar Salgado
        C("moises", -230, "stand", { dy: 0.5, facing: 1 }),
        C("homem", 110, "point", { dy: 0.5, facing: -1, id: "demarcador" }),
      ] }),
      b(13, { q: "Esta é a terra que herdareis por sorte", set: "canaa", props: FRONTEIRAS, env: { terrain: "field", glory: 0.68, night: 0.1, verdure: 0.4, water: 0 }, cast: [ // Moisés dá ordem: a terra por sorte às nove tribos e meia
        C("moises", -140, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
      b(14),                                                                      // rubenitas, gaditas e meia Manassés já receberam
      b(15),                                                                      // duas tribos e meia herdaram aquém do Jordão
      b(16, { cast: [                                                 // o Senhor fala a Moisés
        C("moises", -160, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(17, { by: "deus", q: "Eleazar, o sacerdote, e Josué", cast: [             // os que repartirão a terra: ELEAZAR e JOSUÉ
        C("moises", -170, "stand", { dy: 0.5, facing: 1 }),
        C("servo", -40, "stand", { glow: 0.25, dy: 0.52, facing: -1, id: "eleazar" }),
        C("servo", 60, "stand", { dy: 0.5, facing: -1, id: "josue" }),
      ] }),
      b(18, { by: "deus", q: "cada tribo um príncipe", cast: [                    // e um PRÍNCIPE de cada tribo, para repartir a herança
        C("servo", -60, "stand", { glow: 0.25, dy: 0.52, facing: -1, id: "eleazar" }),
        C("servo", 10, "stand", { dy: 0.5, facing: -1, id: "josue" }),
        C("homem", 110, "stand", { dy: 0.48, facing: -1, id: "principe" }),
        C("homem", 190, "stand", { scale: 0.92, dy: 0.44, facing: -1, id: "principe2" }),
      ] }),
      b(19, { cast: [                                                             // Calebe, de Judá
        C("homem", 40, "stand", { dy: 0.5, facing: -1, id: "calebe" }),
      ] }),
      // OS DEZ PRÍNCIPES (v.20-28). Cada nome é um homem e uma tribo, e cada
      // tribo é um pedaço diferente da terra: o sul seco de Simeão, a serra de
      // Benjamim, a costa de Dã, o planalto de Manassés, o Mar Grande de Aser,
      // o Quinerete de Naftali. O quadro anda com o mapa.
      b(20, { set: "sul", props: LIM_SUL, env: { terrain: "desert", glory: 0.58, night: 0.12, verdure: 0.12, water: 0 }, cast: [ // SIMEÃO, no sul seco — Samuel, filho de Amiúde
        C("homem", -80, "stand", { dy: 0.56, facing: -1, id: "samuel-principe-de-simeao" }),
      ] }),
      b(21, { set: "serra-de-benjamim", props: LIM_NORTE, env: { terrain: "mountain", glory: 0.5, night: 0.16, verdure: 0.18 }, cast: [ // BENJAMIM, na serra — Elidade, filho de Quislom
        C("homem", 100, "stand", { dy: 0.6, facing: -1, id: "elidade-principe-de-benjamim" }),
        C("homem", -170, "stand", { scale: 0.9, dy: 0.48, facing: 1, id: "samuel-principe-de-simeao" }),
      ] }),
      b(22, { set: "costa-de-da", props: LIM_MAR, env: { terrain: "field", glory: 0.64, night: 0.08, verdure: 0.3, water: 0.6 }, cast: [ // DÃ, junto ao mar — o príncipe Buqui, filho de Jogli
        C("homem", -150, "point", { dy: 0.56, facing: -1, id: "buqui-principe-de-da" }),
      ] }),
      b(23, { set: "planalto-de-manasses", props: FRONTEIRAS, env: { terrain: "field", glory: 0.62, night: 0.1, verdure: 0.45, water: 0 }, cast: [ // MANASSÉS, filho de José — o príncipe Haniel, filho de Éfode
        C("homem", 60, "stand", { dy: 0.58, facing: -1, id: "haniel-principe-de-manasses" }),
        C("multidao", 230, "stand", { scale: 0.86, dy: 0.44 }),
      ] }),
      b(24, { env: { glory: 0.68, verdure: 0.55 }, cast: [                         // EFRAIM — o príncipe Quemuel, filho de Siftã
        C("homem", -60, "stand", { dy: 0.6, facing: -1, id: "quemuel-principe-de-efraim" }),
        C("homem", 60, "stand", { scale: 0.94, dy: 0.52, facing: -1, id: "haniel-principe-de-manasses" }),
      ] }),
      b(25, { set: "quinerete", props: LIM_QUINERETE, env: { terrain: "field", glory: 0.62, night: 0.08, verdure: 0.62, water: 0.4 }, cast: [ // ZEBULOM, para os lados do mar — Elizafã, filho de Parnaque
        C("homem", 175, "stand", { dy: 0.58, facing: -1, id: "elizafa-principe-de-zebulom" }),
      ] }),
      b(26, { set: "vale-de-issacar", props: LIM_FONTES, env: { terrain: "field", glory: 0.6, night: 0.1, verdure: 0.5, water: 0 }, cast: [ // ISSACAR, entre as fontes — Paltiel, filho de Azã
        C("homem", -40, "stand", { dy: 0.62, facing: -1, id: "paltiel-principe-de-issacar" }),
        C("homem", 230, "stand", { scale: 0.9, dy: 0.5, facing: -1, id: "elizafa-principe-de-zebulom" }),
      ] }),
      b(27, { set: "costa-de-aser", props: LIM_MAR, env: { terrain: "field", glory: 0.66, night: 0.08, verdure: 0.34, water: 0.62 }, cast: [ // ASER, na costa do Mar Grande — Aiúde, filho de Selomi
        C("homem", -190, "stand", { dy: 0.58, facing: -1, id: "aiude-principe-de-aser" }),
      ] }),
      b(28, { set: "quinerete", props: LIM_QUINERETE, env: { terrain: "field", glory: 0.64, night: 0.08, verdure: 0.66, water: 0.45 }, cast: [ // NAFTALI, o último dos dez — Pedael, filho de Amiúde
        C("homem", 120, "stand", { dy: 0.62, facing: -1, id: "pedael-principe-de-naftali" }),
        C("homem", -180, "stand", { scale: 0.92, dy: 0.5, facing: 1, id: "aiude-principe-de-aser" }),
      ] }),
      b(29, { q: "repartissem as heranças", env: { glory: 0.68 }, cast: [         // estes repartirão as heranças a Israel em Canaã
        C("servo", -60, "stand", { glow: 0.25, dy: 0.52, facing: -1, id: "eleazar" }),
        C("servo", 10, "stand", { dy: 0.5, facing: -1, id: "josue" }),
        C("homem", 110, "stand", { dy: 0.48, facing: -1, id: "principe" }),
      ] }),
    ],
  },
};
