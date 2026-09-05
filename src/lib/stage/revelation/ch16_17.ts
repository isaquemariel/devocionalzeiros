// ============================================================================
// APOCALIPSE 16–17 — roteiro do modo CENA VIVA (sets fixos).
//
// Ap 16 — AS SETE TAÇAS DA IRA: a grande voz sai do templo e ordena; taça a
// taça o mundo é ferido — chagas na terra, o mar em sangue, os rios em sangue
// (o anjo das águas e o altar proclamam a justiça de Deus), o sol abrasador,
// o trono da besta em trevas, o Eufrates seco, os três espíritos imundos que
// congregam os reis, o lampejo de graça ("Eis que venho como ladrão"),
// ARMAGEDOM — e a sétima taça no ar: "Está feito", o maior terremoto da
// história, Babilônia fendida em três partes e a grande saraiva.
// Ap 17 — A GRANDE PROSTITUTA: um dos anjos das taças conduz João ao deserto;
// a mulher vestida de púrpura e escarlata, montada na besta ESCARLATE de sete
// cabeças, embriagada do sangue dos santos. João se admira; o anjo explica o
// MISTÉRIO (a besta que era e já não é, os sete montes, os sete reis, os dez
// chifres) — o Cordeiro os vencerá — e anuncia a ruína da mulher: os próprios
// chifres a odeiam, a devoram e a queimam. Ela é a grande cidade.
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
// O TEMPLO DO CÉU (16:1): de onde sai a ordem — trono, castiçais, altar e as
// taças da ira enfileiradas (a da vaga dos extras é a que o verso destaca).
const TEMPLE: StagePropSpec[] = [
  P("throne", 0, 1.2, undefined, 0.05),
  P("lampstand", -70, 1, 1, 0.25),
  P("lampstand", 70, 1, 1, 0.25),
  P("censer", 150, 0.9, 1, 0.4),
  P("altar", 220, 1, 1, 0.15),
  P("bowl", -140, 0.95, 1, 0.3),     // as taças da ira — vaga dos extras
  P("bowl", -40, 0.85, 1, 0.55),
  P("bowl", 40, 0.85, 1, 0.55),
];

// a taça derramada — entra na vaga dos extras em CADA beat de taça
const POURED_BOWL = P("bowl", -140, 1, 1, 0.25);

// A TERRA ferida (16:2): campo chamuscado, árvores em brasa.
const SCORCHED: StagePropSpec[] = [
  P("tree", -280, 1.1, 0.4, 0.1),
  P("tree", 260, 1.0, 0.5, 0.12),
  P("rock", -230, 0.85, undefined, 0.55),
  P("rock", 180, 0.8, undefined, 0.7),
  P("bush", 90, 0.9, undefined, 0.3),
  P("grass", -50, 1, undefined, 0.82),
  P("grass", 210, 1, undefined, 0.85),
  P("grass", -300, 0.9, undefined, 0.72),
];

// O MAR de sangue (16:3): beira de Patmos, barco parado — nada vive no mar.
const BLOOD_SEA: StagePropSpec[] = [
  P("palm", -270, 1.1, undefined, 0.12),
  P("palm", 250, 1.0, undefined, 0.1),
  P("rock", -230, 0.85, undefined, 0.55),
  P("rock", 300, 0.9, undefined, 0.4),
  P("boat", 150, 0.9, undefined, 0.7),       // barco à deriva no mar morto
  P("grass", -40, 1, undefined, 0.8),
  P("grass", 200, 0.95, undefined, 0.78),
];

// OS RIOS E AS FONTES (16:4-7): rio ao centro, poço = as fontes das águas.
const RIVERS: StagePropSpec[] = [
  P("river", 40, 1.25, undefined, 0.6),
  P("tree", -270, 1.1, undefined, 0.1),
  P("tree", 265, 1.0, undefined, 0.12),
  P("rock", -230, 0.8, undefined, 0.55),
  P("bush", 170, 0.9, undefined, 0.3),
  P("well", 300, 1, undefined, 0.14),        // as fontes das águas
  P("grass", -50, 1, undefined, 0.82),
  P("grass", 210, 1, undefined, 0.85),
];

// O SOL escaldante (16:8-9): o astro em brasa domina o alto do palco.
const SUN_FIELD: StagePropSpec[] = [
  P("star", 0, 1.6, 1, 0.02),                // o sol a que foi dado abrasar
  P("tree", -280, 1.05, 0.6, 0.12),
  P("tree", 255, 1.0, 0.5, 0.1),
  P("rock", -235, 0.85, undefined, 0.55),
  P("rock", 190, 0.8, undefined, 0.72),
  P("grass", -50, 1, undefined, 0.82),
  P("grass", 210, 1, undefined, 0.8),
];

// O TRONO DA BESTA (16:10-11): cidade do reino tenebroso.
const BEAST_THRONE: StagePropSpec[] = [
  P("throne", 60, 1.15, undefined, 0.08),
  P("tower", -260, 1.2, undefined, 0.1),
  P("tower", 280, 1.1, undefined, 0.12),
  P("crate", 180, 0.9, undefined, 0.6),
  P("amphora", -220, 0.85, undefined, 0.58),
  P("grass", -40, 0.9, undefined, 0.85),
];

// O EUFRATES SECO (16:12-15): o leito exposto — pedras onde corria o rio.
const DRY_EUPHRATES: StagePropSpec[] = [
  P("rock", -40, 0.7, undefined, 0.62),      // pedras do leito seco
  P("rock", 60, 0.6, undefined, 0.72),
  P("palm", -280, 1.05, undefined, 0.12),
  P("palm", 260, 1.0, undefined, 0.1),
  P("bush", 170, 0.85, undefined, 0.35),
  P("grass", -240, 0.9, undefined, 0.75),
  P("grass", 210, 0.9, undefined, 0.8),
];

// ARMAGEDOM (16:16-18): acampamento de guerra — tendas e fogueiras dos reis.
const ARMAGEDDON: StagePropSpec[] = [
  P("tent", -280, 1.1, undefined, 0.2),
  P("tent", 265, 1.05, undefined, 0.18),
  P("campfire", -220, 0.9, 1, 0.6),
  P("campfire", 200, 0.9, 1, 0.62),
  P("rock", 310, 0.85, undefined, 0.45),
  P("grass", -40, 0.95, undefined, 0.82),
  P("grass", 120, 0.9, undefined, 0.78),
];

// BABILÔNIA PARTIDA (16:19-21): torres em chamas, comércio arruinado,
// e o cálice do vinho da indignação na vaga dos extras.
const SPLIT_BABYLON: StagePropSpec[] = [
  P("tower", -80, 1.35, 0.7, 0.08),
  P("tower", 100, 1.2, 0.6, 0.12),
  P("tower", 280, 1.1, 0.5, 0.1),
  P("crate", 190, 0.9, undefined, 0.6),
  P("amphora", -230, 0.85, undefined, 0.58),
  P("stall", -300, 1, undefined, 0.2),
  P("bowl", -140, 1, 1, 0.25),       // o cálice do vinho da ira
];

// O ENCONTRO (17:1-2): o anjo das taças vem falar com João (taça na vaga).
const MEETING: StagePropSpec[] = [
  P("palm", -290, 1.05, undefined, 0.12),
  P("rock", -240, 0.9, undefined, 0.5),
  P("rock", 290, 0.8, undefined, 0.55),
  P("bush", 180, 0.9, undefined, 0.35),
  P("grass", -50, 1, undefined, 0.82),
  P("grass", 210, 0.95, undefined, 0.8),
  P("bowl", -140, 0.9, 1, 0.3),      // uma das sete taças
];

// O DESERTO da visão (17:3s): lugar árido onde a mulher se assenta.
const DESERT: StagePropSpec[] = [
  P("palm", -290, 1.0, undefined, 0.12),
  P("palm", 270, 0.95, undefined, 0.1),
  P("rock", -235, 0.9, undefined, 0.55),
  P("rock", 310, 0.8, undefined, 0.4),
  P("bush", 180, 0.85, undefined, 0.35),
  P("grass", -50, 0.95, undefined, 0.82),
  P("grass", 215, 0.9, undefined, 0.8),
];

// os SETE MONTES sobre os quais a mulher está assentada (17:9) — horizonte.
const SEVEN_HILLS: StagePropSpec[] = [
  P("rock", -250, 1.3, undefined, 0.05),
  P("rock", -160, 1.2, undefined, 0.07),
  P("rock", -60, 1.25, undefined, 0.04),
  P("rock", 40, 1.15, undefined, 0.08),
  P("rock", 130, 1.2, undefined, 0.05),
  P("rock", 220, 1.3, undefined, 0.06),
  P("rock", 320, 1.15, undefined, 0.03),
];

// a GRANDE CIDADE no horizonte (17:18) — a mulher que viste É a cidade.
const GREAT_CITY: StagePropSpec[] = [
  P("tower", -150, 1.35, undefined, 0.06),
  P("tower", 60, 1.25, undefined, 0.05),
  P("tower", 230, 1.2, undefined, 0.08),
];

// ------------------------------------------------------------------- elenco
// João, testemunha lateral das visões (sempre em cena).
const JOAO = (pose = "stand", dx = -250, dy = 0.6): CastPlacement =>
  C("joao", dx, pose, { dy });

// o anjo que derrama a taça (1 anjo + prop bowl em todo beat de taça)
const POURER = (dx = -50, pose = "raise", extra: Partial<CastPlacement> = {}): CastPlacement =>
  C("anjo", dx, pose, { dy: 0.38, glow: 0.7, ...extra });

// Ap 17 — o anjo-guia da visão da prostituta
const GUIDE = (dx = -120, pose = "stand", glow = 0.7): CastPlacement =>
  C("anjo", dx, pose, { dy: 0.5, glow });

// a grande prostituta MONTADA na besta escarlate: mesmo dx, dy menor
// (os pés dela ficam mais altos — assentada sobre o dorso da besta).
const HARLOT = (extra: Partial<CastPlacement> = {}): CastPlacement =>
  C("mulherComum", 85, "stand", { dy: 0.36, scale: 1.15, glow: 0.5, ...extra });
const SCARLET_BEAST = (extra: Partial<CastPlacement> = {}): CastPlacement =>
  C("besta", 85, "stand", { dy: 0.46, palette: "escarlate", ...extra });

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Ap 16
  // AS SETE TAÇAS — arco de env: a glória severa do templo → fogo, sangue e
  // trevas crescendo taça a taça → o lampejo do "venho como ladrão" →
  // Armagedom e a sétima taça: tempestade total, fogo, granizo.
  16: {
    start: { terrain: "throne", night: 0.1, glory: 0.55, storm: 0.15 },
    beats: [
      // a grande voz do templo ordena aos sete anjos: Ide, e derramai
      b(1, {
        by: "cristo", q: "que dizia aos sete anjos: ",
        cast: [JOAO("stand", -240, 0.6),
               C("anjo", -60, "stand", { dy: 0.4, glow: 0.7 }),
               C("anjo", 60, "stand", { dy: 0.42, glow: 0.7, id: "anjo2" })],
        props: TEMPLE,
      }),                                                                     // a voz do templo ordena as taças
      // 1ª TAÇA sobre a terra: chaga má e maligna nos homens da marca
      b(2, {
        set: "terra",
        env: { terrain: "field", fire: 0.3, night: 0.25, glory: 0.1, storm: 0 },
        cast: [JOAO(), POURER(), C("homem", 120, "kneel", { dy: 0.58 }),
               C("mulherComum", 190, "lie", { dy: 0.62 })],
        props: [...SCORCHED, POURED_BOWL],
      }),                                                                     // 1ª taça: chagas nos homens
      // 2ª TAÇA no mar: sangue como de um morto — morre toda alma vivente
      b(3, {
        set: "mar",
        env: { terrain: "patmos", night: 0.4, storm: 0.3, fire: 0.1, glory: 0.05 },
        cast: [JOAO("stand", -240, 0.62), C("anjo", -40, "flyIdle", { dy: 0.25, glow: 0.7 })],
        props: [...BLOOD_SEA, POURED_BOWL],
      }),                                                                     // 2ª taça: o mar vira sangue
      // 3ª TAÇA nos rios e nas fontes das águas: tornaram-se em sangue
      b(4, {
        set: "rios",
        env: { terrain: "field", night: 0.35, storm: 0.25, fire: 0 },
        cast: [JOAO(), POURER(-50)],
        props: [...RIVERS, POURED_BOWL],
      }),                                                                     // 3ª taça: rios em sangue
      // o anjo das águas proclama: Justo és tu, ó Senhor
      b(5, {
        by: "anjo", q: "que dizia: ",
        cast: [JOAO(), C("anjo", -30, "stand", { dy: 0.45, glow: 0.85 })],
        env: { glory: 0.25 },
      }),                                                                     // o anjo das águas: Justo és tu
      // derramaram o sangue dos santos — sangue lhes deste a beber
      b(6, { by: "anjo", env: { night: 0.4 } }),                              // deste-lhes sangue a beber
      // o ALTAR responde (voz off): verdadeiros e justos são os teus juízos
      b(7, {
        by: "servivente", q: "que dizia: ",
        props: [...RIVERS, P("altar", -140, 1, 1, 0.22), P("bowl", -190, 0.85, 1, 0.42)],
        env: { glory: 0.35 },
      }),                                                                     // o altar: juízos verdadeiros e justos
      // 4ª TAÇA sobre o sol: foi-lhe permitido abrasar os homens com fogo
      b(8, {
        set: "sol",
        env: { terrain: "field", fire: 0.7, glory: 0.4, night: 0.1, storm: 0 },
        cast: [JOAO(), C("anjo", -40, "flyIdle", { dy: 0.2, glow: 0.8 })],
        props: [...SUN_FIELD, POURED_BOWL],
      }),                                                                     // 4ª taça sobre o sol
      // abrasados com grandes calores — blasfemam e não se arrependem
      b(9, {
        cast: [JOAO(), C("anjo", -40, "flyIdle", { dy: 0.2, glow: 0.8 }),
               C("homem", 130, "lie", { dy: 0.6 }), C("mulherComum", 200, "kneel", { dy: 0.55 })],
        env: { fire: 0.85, glory: 0.45, night: 0.15 },
      }),                                                                     // abrasados; blasfemam sem arrependimento
      // 5ª TAÇA sobre o trono da besta: o reino se fez tenebroso
      b(10, {
        set: "tronoDaBesta",
        env: { terrain: "city", night: 0.85, fire: 0.15, glory: 0, storm: 0.2 },
        cast: [JOAO("stand", -250, 0.62), POURER(-40),
               C("besta", 90, "stand", { dy: 0.3, palette: "mar" }),
               C("multidao", 220, "kneel", { dy: 0.55 })],
        props: [...BEAST_THRONE, POURED_BOWL],
      }),                                                                     // 5ª taça: reino em trevas
      // mordem as línguas de dor — e blasfemam do Deus do céu
      b(11, { env: { night: 0.9, storm: 0.3 } }),                             // dores e chagas; não se arrependem
      // 6ª TAÇA sobre o Eufrates: a água secou — caminho dos reis do oriente
      b(12, {
        set: "eufrates",
        env: { terrain: "field", night: 0.5, storm: 0.35, fire: 0.05, glory: 0.05 },
        cast: [JOAO(), POURER(-50), C("multidao", 290, "walk", { dy: 0.5, facing: -1 })],
        props: [...DRY_EUPHRATES, POURED_BOWL],
      }),                                                                     // 6ª taça: o Eufrates seca
      // das bocas do dragão, da besta e do falso profeta: três espíritos imundos
      b(13, {
        cast: [JOAO(), C("dragao", -30, "flyIdle", { dy: 0.15 }),
               C("besta", 100, "stand", { dy: 0.3, palette: "mar" }),
               C("besta", 220, "stand", { dy: 0.32, palette: "terra", id: "falsoProfeta" })],
        env: { storm: 0.6, night: 0.55 },
      }),                                                                     // três espíritos imundos como rãs
      // espíritos de demônios congregam os reis para a batalha do grande dia
      b(14, {
        cast: [JOAO(), C("dragao", -30, "flyIdle", { dy: 0.15 }),
               C("besta", 100, "stand", { dy: 0.3, palette: "mar" }),
               C("besta", 220, "stand", { dy: 0.32, palette: "terra", id: "falsoProfeta" }),
               C("multidao", -210, "walk", { dy: 0.52 }),
               C("multidao", 300, "walk", { dy: 0.5, facing: -1, id: "multidao2" })],
        env: { storm: 0.65, night: 0.6 },
      }),                                                                     // demônios congregam os reis
      // lampejo de graça no meio do juízo (voz off): venho como ladrão
      b(15, { by: "cristo", env: { glory: 0.5, storm: 0.4 } }),               // Eis que venho como ladrão
      // ARMAGEDOM: os exércitos congregados — tendas, fogueiras, guerra iminente
      b(16, {
        set: "armagedom",
        env: { terrain: "field", storm: 0.8, night: 0.7, glory: 0.1, fire: 0.2 },
        cast: [JOAO("stand", -250, 0.62),
               C("multidao", -90, "stand", { dy: 0.5 }),
               C("multidao", 120, "stand", { dy: 0.48, id: "multidao2" }),
               C("cavaleiro", 240, "stand", { dy: 0.42, palette: "vermelho" })],
        props: ARMAGEDDON,
      }),                                                                     // congregados em Armagedom
      // 7ª TAÇA no ar — a grande voz do trono: ESTÁ FEITO
      b(17, {
        by: "cristo", q: "dizendo: ",
        cast: [JOAO("stand", -250, 0.62),
               C("anjo", -40, "flyIdle", { dy: 0.12, glow: 0.9 }),
               C("multidao", -90, "stand", { dy: 0.5 }),
               C("multidao", 120, "stand", { dy: 0.48, id: "multidao2" }),
               C("cavaleiro", 240, "stand", { dy: 0.42, palette: "vermelho" })],
        props: [...ARMAGEDDON, POURED_BOWL],
        env: { glory: 0.6, storm: 0.85 },
      }),                                                                     // 7ª taça no ar: Está feito
      // vozes, trovões, relâmpagos — o maior terremoto desde que há homens
      b(18, {
        cast: [JOAO("kneel", -250, 0.62),
               C("multidao", -90, "kneel", { dy: 0.5 }),
               C("multidao", 120, "kneel", { dy: 0.48, id: "multidao2" }),
               C("cavaleiro", 240, "stand", { dy: 0.42, palette: "vermelho" })],
        env: { storm: 1, night: 0.6, glory: 0.25 },
      }),                                                                     // o maior terremoto da história
      // a grande cidade fendida em três partes — o cálice da ira para Babilônia
      b(19, {
        set: "babilonia",
        env: { terrain: "city", storm: 1, fire: 0.6, night: 0.65, glory: 0.1 },
        cast: [JOAO("stand", -250, 0.62),
               C("homem", 160, "walk", { id: "morador-de-babilonia-em-fuga", dy: 0.55, facing: 1 }),
               C("mulherComum", 214, "walk", { id: "moradora-de-babilonia-em-fuga", dy: 0.52, facing: 1, scale: 0.92 }),
               C("homem", -60, "lie", { id: "soterrado-na-cidade-fendida", dy: 0.6 })],
        props: SPLIT_BABYLON,
      }),                                                                     // Babilônia fendida em três partes
      // toda ilha fugiu; os montes não se acharam — o palco se esvazia
      b(20, {
        cast: [JOAO("stand", -250, 0.62)],
        env: { storm: 1, night: 0.7, fire: 0.5 },
      }),                                                                     // ilhas fogem; montes desaparecem
      // a grande saraiva, pedras de um talento — e ainda blasfemam
      b(21, {
        cast: [JOAO(), C("homem", 80, "lie", { id: "ferido-pela-saraiva", dy: 0.6 }),
               C("homem", 190, "point", { id: "homem-que-blasfema-do-ceu", dy: 0.52, facing: -1 }),
               C("homem", 244, "bow", { id: "homem-esmagado-pela-pedra", dy: 0.48, scale: 0.9 })],
        env: { storm: 1, night: 0.75, fire: 0.55, glory: 0.05 },
      }),                                                                     // grande saraiva; homens blasfemam
    ],
  },

  // ------------------------------------------------------------------ Ap 17
  // A GRANDE PROSTITUTA — arco de env: penumbra do deserto → noite crescendo
  // com a embriaguez de sangue → sobriedade grave da explicação do mistério →
  // clarão do Cordeiro vencedor (v.14) → fogo da ruína da mulher → a cidade.
  17: {
    start: { terrain: "field", night: 0.5, glory: 0.1, storm: 0 },
    beats: [
      // um dos anjos das taças convida João: Vem, mostrar-te-ei a condenação
      b(1, {
        by: "anjo", q: "dizendo-me: ",
        cast: [C("joao", -40, "stand", { dy: 0.55 }),
               C("anjo", 40, "point", { dy: 0.5, glow: 0.7, facing: -1 })],
        props: MEETING,
      }),                                                                     // o anjo convida: vem, mostrarei
      // com ela fornicaram os reis; a terra embriagada do seu vinho
      b(2, { by: "anjo", env: { night: 0.55 } }),                             // reis e terra embriagados
      // levado em espírito ao deserto: a mulher sobre a besta escarlate
      b(3, {
        set: "deserto",
        env: { terrain: "field", night: 0.5, storm: 0.1 },
        cast: [JOAO("stand", -220, 0.6), GUIDE(-120, "point"), SCARLET_BEAST(), HARLOT()],
        props: DESERT,
      }),                                                                     // a mulher sobre a besta escarlate
      // púrpura, escarlata, ouro, pérolas — e o cálice de ouro das abominações
      b(4, {
        cast: [JOAO("stand", -220, 0.6), GUIDE(-120), SCARLET_BEAST(), HARLOT({ glow: 0.7 })],
        props: [...DESERT, P("bowl", -140, 0.9, 1, 0.28)],
        env: { night: 0.55 },
      }),                                                                     // púrpura, ouro e o cálice
      // na testa o nome escrito: Mistério, a grande Babilônia
      b(5, { env: { night: 0.6 } }),                                          // na testa: Mistério, Babilônia
      // embriagada do sangue dos santos — João se maravilha
      b(6, {
        cast: [JOAO("point", -200, 0.58), GUIDE(-110), SCARLET_BEAST(), HARLOT({ glow: 0.7 })],
        env: { night: 0.62 },
      }),                                                                     // embriagada do sangue dos santos
      // o anjo: Por que te admiras? Eu te direi o mistério
      b(7, {
        by: "anjo", q: "me disse: ",
        cast: [C("joao", -60, "stand", { dy: 0.55 }),
               C("anjo", 20, "stand", { dy: 0.52, glow: 0.8, facing: -1 }),
               SCARLET_BEAST(), HARLOT({ glow: 0.5 })],
        env: { night: 0.55, glory: 0.15 },
      }),                                                                     // Por que te admiras? o mistério
      // a explicação começa: a besta que era e já não é — só anjo e João,
      // a besta recuada ao fundo (env sóbrio)
      b(8, {
        by: "anjo",
        cast: [C("joao", -60, "stand", { dy: 0.55 }),
               C("anjo", 30, "stand", { dy: 0.52, glow: 0.7, facing: -1 }),
               C("besta", 210, "stand", { dy: 0.18, scale: 0.9, palette: "escarlate" })],
        env: { night: 0.45, storm: 0.2, glory: 0.1 },
      }),                                                                     // a besta que era e já não é
      // aqui o sentido: as sete cabeças são sete montes — o horizonte se abre
      b(9, {
        by: "anjo",
        props: [...DESERT, ...SEVEN_HILLS],
        env: { night: 0.4 },
      }),                                                                     // sete cabeças, sete montes
      // são também sete reis: cinco caíram, um existe, outro virá
      b(10, { by: "anjo" }),                                                  // sete reis; cinco já caíram
      // a besta é ela também o oitavo — e vai à perdição
      b(11, { by: "anjo", env: { night: 0.5 } }),                             // a besta, o oitavo rei
      // os dez chifres são dez reis: poder por uma hora com a besta
      b(12, {
        by: "anjo",
        cast: [C("joao", -60, "stand", { dy: 0.55 }),
               C("anjo", 30, "stand", { dy: 0.52, glow: 0.7, facing: -1 }),
               C("besta", 210, "stand", { dy: 0.18, scale: 0.9, palette: "escarlate" }),
               C("multidao", 300, "stand", { dy: 0.24, glow: 0.1 })],
        env: { storm: 0.3 },
      }),                                                                     // dez chifres: dez reis
      // um mesmo intento: entregam poder e autoridade à besta
      b(13, { by: "anjo", env: { night: 0.55, storm: 0.35 } }),               // entregam o poder à besta
      // combaterão contra o Cordeiro — E O CORDEIRO OS VENCERÁ
      b(14, {
        by: "anjo",
        cast: [C("joao", -60, "stand", { dy: 0.55 }),
               C("anjo", 30, "point", { dy: 0.52, glow: 0.8 }),
               C("besta", 210, "stand", { dy: 0.18, scale: 0.9, palette: "escarlate" }),
               C("multidao", 300, "stand", { dy: 0.24, glow: 0.1 }),
               C("cordeiro", -140, "stand", { dy: 0.2, glow: 1 })],
        env: { glory: 0.6, storm: 0.2, night: 0.4 },
      }),                                                                     // o Cordeiro os vencerá
      // as águas onde ela se assenta: povos, multidões, nações e línguas
      b(15, {
        by: "anjo", q: "disse-me: ",
        cast: [C("joao", -60, "stand", { dy: 0.55 }),
               C("anjo", 30, "stand", { dy: 0.52, glow: 0.7, facing: -1 }),
               C("besta", 210, "stand", { dy: 0.18, scale: 0.9, palette: "escarlate" }),
               C("multidao", 300, "stand", { dy: 0.24, glow: 0.1 }),
               C("multidao", -260, "stand", { dy: 0.5, id: "povos" })],
        props: [...DESERT, ...SEVEN_HILLS, P("river", -10, 1.2, undefined, 0.68)],
        env: { storm: 0.5, glory: 0.3 },
      }),                                                                     // as águas são povos e nações
      // os dez chifres odeiam a prostituta: desolada, devorada, queimada
      b(16, {
        cast: [C("joao", -230, "stand", { dy: 0.6 }),
               C("anjo", -150, "stand", { dy: 0.52, glow: 0.7 }),
               C("besta", 170, "walk", { dy: 0.45, palette: "escarlate", facing: -1 }),
               C("mulherComum", 60, "lie", { dy: 0.58, scale: 1.05 }),
               C("homem", 300, "stand", { id: "rei-dos-dez-chifres", dy: 0.24, glow: 0.1, facing: -1 }),
               C("homem", -280, "stand", { id: "homem-dos-povos-que-veem", dy: 0.5 }),
               C("mulherComum", -320, "bow", { id: "mulher-dos-povos-que-veem", dy: 0.46, scale: 0.9 })],
        props: [...DESERT, ...SEVEN_HILLS, P("river", -10, 1.2, undefined, 0.68),
                P("campfire", 120, 1, 1, 0.62)],
        env: { fire: 0.4, storm: 0.5, night: 0.65, glory: 0.1 },
      }),                                                                     // odeiam e queimam a prostituta
      // Deus pôs em seus corações que cumpram o seu intento
      b(17, { by: "anjo", env: { fire: 0.2, storm: 0.35 } }),                 // Deus pôs em seus corações
      // a mulher que viste é a GRANDE CIDADE que reina sobre os reis
      b(18, {
        by: "anjo",
        cast: [C("joao", -230, "point", { dy: 0.6 }),
               C("anjo", -150, "point", { dy: 0.52, glow: 0.7 }),
               C("besta", 280, "stand", { dy: 0.2, scale: 0.9, palette: "escarlate" })],
        props: [...DESERT, ...GREAT_CITY],
        env: { night: 0.6, glory: 0.1, storm: 0.25, fire: 0.05 },
      }),                                                                     // a mulher é a grande cidade
    ],
  },
};
