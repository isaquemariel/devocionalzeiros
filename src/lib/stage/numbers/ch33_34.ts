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
      b(17),                                                                      // a Hazerote
      b(18),                                                                      // a Ritmá
      b(19),                                                                      // a Rimom-Perez
      b(20),                                                                      // a Libna
      b(21),                                                                      // a Rissa
      b(22),                                                                      // a Queelata
      b(23),                                                                      // ao monte de Séfer
      b(24),                                                                      // a Harada
      b(25),                                                                      // a Maquelote
      b(26),                                                                      // a Taate
      b(27),                                                                      // a Tara
      b(28),                                                                      // a Mitca
      b(29),                                                                      // a Hasmona
      b(30),                                                                      // a Moserote
      b(31),                                                                      // a Bene-Jaacã
      b(32),                                                                      // a Hor-Hagidgade
      b(33),                                                                      // a Jotbatá
      b(34),                                                                      // a Abrona
      b(35),                                                                      // a Ezion-Geber
      b(36),                                                                      // ao deserto de Zim, que é Cades
      b(37, { q: "monte Hor", props: HOR, env: { terrain: "mountain", glory: 0.5, night: 0.14, verdure: 0.1 } }), // ao monte Hor, no fim de Edom
      b(38, { q: "morreu ali", env: { terrain: "mountain", glory: 0.42, night: 0.2, verdure: 0.08 }, cast: [ // Arão sobe ao monte Hor e MORRE ali
        C("arao", -20, "lie", { glow: 0.15, dy: 0.4, facing: 1 }),
        C("moises", -160, "bow", { dy: 0.52, facing: 1 }),
      ] }),
      b(39),                                                                      // Arão de cento e vinte e três anos, ao morrer
      b(40, { q: "rei de Harade", props: TRAVEL, env: { terrain: "desert", glory: 0.58, night: 0.1, verdure: 0.2 } }), // o cananeu, rei de Harade, ouve que Israel chega
      b(41),                                                                      // do monte Hor a Zalmona
      b(42),                                                                      // a Punom
      b(43),                                                                      // a Obote
      b(44),                                                                      // a Ije-Abarim, no termo de Moabe
      b(45),                                                                      // a Dibom-Gade
      b(46),                                                                      // a Almom-Diblataim
      b(47),                                                                      // aos montes de Abarim, defronte de Nebo
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
      b(1, { by: "deus", props: FRONTEIRAS, env: { terrain: "field", glory: 0.66, night: 0.1, verdure: 0.4 }, cast: [ // o Senhor fala a Moisés
        C("moises", -160, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(2, { by: "deus", q: "a terra de Canaã", cast: [                           // "quando entrardes na terra de Canaã, esta é a herança"
        C("moises", -160, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(3, { by: "deus", q: "O lado do sul" }),                                   // LIMITE SUL: deserto de Zim, Edom, Mar Salgado
      dv(4),                                                                      // o limite rodeia por Acrabim até Cades-Barnéia
      dv(5),                                                                      // rodeia de Azmom até o rio do Egito, ao mar
      b(6, { by: "deus", q: "o Mar Grande vos será por limite" }),                // LIMITE OCIDENTE: o Mar Grande
      b(7, { by: "deus", q: "o termo do norte" }),                                // LIMITE NORTE: do Mar Grande até o monte Hor
      dv(8),                                                                      // do monte Hor até a entrada de Hamate, a Zedade
      dv(9),                                                                      // até Zifrom, saídas em Hazar-Enã: termo do norte
      b(10, { by: "deus", q: "do lado do oriente" }),                             // LIMITE ORIENTE: de Hazar-Enã até Sefã
      dv(11),                                                                     // desce a Ribla, à borda do mar de Quinerete
      b(12, { by: "deus", q: "ao longo do Jordão" }),                             // desce pelo Jordão até o Mar Salgado
      b(13, { q: "Esta é a terra que herdareis por sorte", env: { glory: 0.68 }, cast: [ // Moisés dá ordem: a terra por sorte às nove tribos e meia
        C("moises", -140, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
      b(14),                                                                      // rubenitas, gaditas e meia Manassés já receberam
      b(15),                                                                      // duas tribos e meia herdaram aquém do Jordão
      b(16, { by: "deus", cast: [                                                 // o Senhor fala a Moisés
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
      b(20),                                                                      // Samuel, de Simeão
      b(21),                                                                      // Elidade, de Benjamim
      b(22),                                                                      // Buqui, de Dã
      b(23),                                                                      // Haniel, de Manassés
      b(24),                                                                      // Quemuel, de Efraim
      b(25),                                                                      // Elizafã, de Zebulom
      b(26),                                                                      // Paltiel, de Issacar
      b(27),                                                                      // Aiúde, de Aser
      b(28),                                                                      // Pedael, de Naftali
      b(29, { q: "repartissem as heranças", env: { glory: 0.68 }, cast: [         // estes repartirão as heranças a Israel em Canaã
        C("servo", -60, "stand", { glow: 0.25, dy: 0.52, facing: -1, id: "eleazar" }),
        C("servo", 10, "stand", { dy: 0.5, facing: -1, id: "josue" }),
        C("homem", 110, "stand", { dy: 0.48, facing: -1, id: "principe" }),
      ] }),
    ],
  },
};
