// ============================================================================
// NÚMEROS 13–14 — CENA VIVA. OS DOZE ESPIAS e A GRANDE INCREDULIDADE.
//
// Nm 13 — OS ESPIAS EM CANAÃ: de cada tribo um príncipe é enviado a espiar a
// terra prometida. Sobem à montanha, chegam ao vale de ESCOL e cortam um CACHO
// de uvas tão grande que dois homens o carregam pendurado numa VARA — sinal de
// uma terra que "mana leite e mel". Mas o relatório se divide: a terra é boa,
// porém há GIGANTES (os filhos de Anaque) e cidades fortificadas. Só CALEBE faz
// calar o povo: "subiremos e a possuiremos em herança".
//
// Nm 14 — A REBELIÃO E OS QUARENTA ANOS: o povo chora, murmura e quer voltar ao
// Egito e apedrejar Josué e Calebe (que rasgam as vestes). A GLÓRIA do SENHOR
// aparece na tenda; Moisés INTERCEDE ("perdoa a iniquidade deste povo") e o
// Senhor perdoa — mas sentencia QUARENTA ANOS no deserto: os incrédulos cairão,
// os espias morrem de praga, e os que teimam em subir são DESBARATADOS pelos
// amalequitas até Hormá.
//
// A VOZ DE DEUS (regra do projeto): a ordem e a sentença vêm do alto
// (`by: "deus"`), sem figura, com glória; Moisés (`moises`) e o povo
// (`multidao`) em cena. No juízo/praga a glória baixa e entram nuvem e noite.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const dv = (v: number) => b(v, { by: "deus" });

// O ARRAIAL em Parã/Cades — a tenda no meio, o deserto ao redor.
const ARRAIAL: StagePropSpec[] = [
  { ...P("tent", -30, 1.45, undefined, 0.1), tag: "tabernaculo" },
  P("tent", -260, 1.0, undefined, 0.2),
  P("tent", 240, 1.0, undefined, 0.22),
  P("palm", -320, 1.05, undefined, 0.14),
  P("well", 320, 1.0, undefined, 0.5),
  P("grass", -60, 0.82, undefined, 0.82),
  P("grass", 70, 0.78, undefined, 0.74),
];
// A TERRA PROMETIDA — montanha verdejante, árvores e as cidades fortificadas.
const CANAA: StagePropSpec[] = [
  P("tree", -280, 1.2, undefined, 0.16),
  P("palm", 300, 1.15, undefined, 0.14),
  { ...P("tower", 210, 1.1, undefined, 0.22), tag: "cidade-forte" },
  P("tower", -150, 0.85, undefined, 0.28),
  P("grass", -40, 0.9, undefined, 0.84),
  P("grass", 90, 0.86, undefined, 0.78),
  P("tree", 40, 1.0, undefined, 0.5),
];
// O VALE DE ESCOL — o cacho pendurado na vara, entre árvores carregadas.
const ESCOL: StagePropSpec[] = [
  { ...P("grapes", 0, 1.35, undefined, 0.46), tag: "cachos-escol" },
  P("tree", -270, 1.2, undefined, 0.16),
  P("tree", 280, 1.15, undefined, 0.18),
  P("palm", -330, 1.05, undefined, 0.13),
  P("grass", -110, 0.9, undefined, 0.84),
  P("grass", 130, 0.86, undefined, 0.8),
];
// O ARRAIAL com o fruto trazido — o cacho de Escol mostrado ao povo.
const RELATORIO: StagePropSpec[] = [
  { ...P("tent", -40, 1.45, undefined, 0.1), tag: "tabernaculo" },
  { ...P("grapes", 150, 1.15, undefined, 0.52), tag: "cachos-escol" },
  P("tent", -270, 1.0, undefined, 0.2),
  P("palm", -330, 1.05, undefined, 0.14),
  P("well", 330, 1.0, undefined, 0.5),
  P("grass", -80, 0.82, undefined, 0.82),
];
// O ARRAIAL SOB JUÍZO — a nuvem escura da murmuração e do juízo sobre a tenda.
const JUIZO: StagePropSpec[] = [
  { ...P("tent", -30, 1.45, undefined, 0.1), tag: "tabernaculo" },
  { ...P("clouds", -20, 1.5, undefined, 0.82), sky: true },
  { ...P("clouds", 180, 1.2, undefined, 0.7), sky: true },
  P("tent", -270, 1.0, undefined, 0.2),
  P("tent", 250, 1.0, undefined, 0.22),
  P("palm", -330, 1.0, undefined, 0.14),
  P("grass", -60, 0.8, undefined, 0.82),
];
// A GLÓRIA NA TENDA — a coluna sobre o tabernáculo, presença que julga e perdoa.
const GLORIA_TENDA: StagePropSpec[] = [
  { ...P("tent", -20, 1.5, undefined, 0.1), tag: "tabernaculo" },
  { ...P("pillar", -20, 1.7, undefined, 0.16), tag: "coluna-nuvem" },
  P("tent", -280, 1.0, undefined, 0.2),
  P("tent", 260, 1.0, undefined, 0.22),
  P("palm", -330, 1.0, undefined, 0.14),
  P("grass", 80, 0.8, undefined, 0.8),
];
// O CUME DO MONTE — a subida temerária e o desbarato pelos amalequitas.
const MONTE: StagePropSpec[] = [
  { ...P("tower", 200, 1.15, undefined, 0.2), tag: "cidade-forte" },
  P("tower", -180, 0.9, undefined, 0.26),
  { ...P("clouds", 20, 1.5, undefined, 0.8), sky: true },
  P("rock", -260, 1.1, undefined, 0.4),
  P("rock", 260, 1.0, undefined, 0.46),
  P("grass", -40, 0.7, undefined, 0.82),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Nm 13
  13: {
    start: { terrain: "desert", night: 0.1, glory: 0.62, storm: 0, fire: 0, verdure: 0.2 },
    beats: [
      b(1, { by: "deus", props: ARRAIAL, env: { terrain: "desert", glory: 0.64, night: 0.1, verdure: 0.2 }, cast: [ // o Senhor fala a Moisés
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(2, { by: "deus", q: "Envia homens que espiem a terra de Canaã", cast: [    // "Envia homens que ESPIEM a terra de Canaã"
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.46 }),
      ] }),
      b(3, { q: "todos aqueles homens eram cabeças", cast: [                       // Moisés os envia, cabeças dos filhos de Israel
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 130, "walk", { dy: 0.46 }),
      ] }),
      b(4), b(5),
      b(6, { q: "Calebe, filho de Jefoné", cast: [                                 // CALEBE, da tribo de Judá
        C("servo", 40, "stand", { dy: 0.5, facing: -1, id: "calebe", glow: 0.18 }),
      ] }),
      b(7), b(8), b(9), b(10), b(11), b(12), b(13), b(14), b(15),
      b(16, { q: "Moisés chamou Josué", cast: [                                    // a Oséias, Moisés chamou JOSUÉ
        C("servo", 40, "stand", { dy: 0.5, facing: -1, id: "josue" }),
        C("servo", 100, "stand", { dy: 0.48, facing: -1, id: "calebe", glow: 0.18 }),
      ] }),
      b(17, { q: "Subi por aqui para o lado do sul", set: "canaa", props: CANAA,   // subi à montanha, espiar a terra
        env: { terrain: "mountain", glory: 0.66, night: 0.08, verdure: 0.62 }, cast: [
        C("moises", -220, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "walk", { dy: 0.46 }),
      ] }),
      b(18), b(19),
      b(20, { q: "tomai do fruto da terra", cast: [                                // nos dias das primícias das uvas, tomai do fruto
        C("multidao", 60, "walk", { dy: 0.5 }),
      ] }),
      b(21),
      b(22, { q: "filhos de Anaque", env: { verdure: 0.6 }, cast: [               // em Hebrom, os filhos de ANAQUE (gigantes)
        C("homem", 150, "stand", { dy: 0.5, facing: -1, scale: 2.1, id: "anaque" }),
        C("multidao", -80, "stand", { dy: 0.46 }),
      ] }),
      b(23, { q: "um cacho de uvas", set: "escol", props: ESCOL,                   // no vale de ESCOL, o CACHO na vara entre dois homens
        env: { terrain: "field", glory: 0.72, night: 0.06, verdure: 0.85 }, cast: [
        C("servo", -40, "walk", { dy: 0.54, facing: 1, id: "josue" }),
        C("servo", 40, "walk", { dy: 0.54, facing: -1, id: "espia" }),
      ] }),
      b(24, { q: "o vale de Escol" }),                                             // o lugar chamado vale de Escol, por causa do cacho
      b(25, { q: "ao fim de quarenta dias", cast: [                                // voltaram ao fim de quarenta dias
        C("multidao", 40, "walk", { dy: 0.5 }),
      ] }),
      b(26, { q: "mostraram-lhes o fruto da terra", set: "relatorio", props: RELATORIO, // trazem o fruto a Moisés, a Arão e à congregação
        env: { terrain: "desert", glory: 0.62, night: 0.1, verdure: 0.22 }, cast: [
        C("moises", -180, "stand", { dy: 0.5, facing: 1 }),
        C("arao", -120, "stand", { glow: 0.2, dy: 0.5, facing: 1 }),
        C("multidao", 120, "stand", { dy: 0.46 }),
      ] }),
      b(27, { q: "mana leite e mel" }),                                            // "verdadeiramente MANA LEITE E MEL"
      b(28, { q: "os filhos de Anaque", env: { glory: 0.42, night: 0.28 }, cast: [ // "PORÉM o povo é poderoso… vimos os filhos de Anaque"
        C("multidao", 90, "stand", { dy: 0.46 }),
      ] }),
      b(29),
      b(30, { q: "subiremos e a possuiremos em herança", env: { glory: 0.6 }, cast: [ // CALEBE faz calar o povo: "subiremos e possuiremos"
        C("servo", -40, "raise", { dy: 0.52, facing: 1, id: "calebe", glow: 0.3 }),
        C("moises", -180, "stand", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "stand", { dy: 0.46 }),
      ] }),
      b(31, { q: "Não poderemos subir contra aquele povo", env: { glory: 0.4, night: 0.3 }, cast: [ // os outros: "não poderemos subir"
        C("multidao", 90, "stand", { dy: 0.46 }),
      ] }),
      b(32, { q: "terra que consome os seus moradores", set: "juizo", props: JUIZO, // infamam a terra sob nuvem escura
        env: { glory: 0.22, night: 0.42, verdure: 0.18 }, cast: [
        C("multidao", 60, "stand", { dy: 0.46 }),
      ] }),
      b(33, { q: "vimos ali gigantes, filhos de Anaque", env: { glory: 0.18, night: 0.46 }, cast: [ // GIGANTES; "éramos como gafanhotos"
        C("homem", 170, "stand", { dy: 0.5, facing: -1, scale: 2.15, id: "anaque" }),
        C("homem", -80, "bow", { dy: 0.5 }),
        C("homem", -140, "kneel", { dy: 0.46, scale: 0.85 }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Nm 14
  14: {
    start: { terrain: "desert", night: 0.4, glory: 0.2, storm: 0, fire: 0, verdure: 0.2 },
    beats: [
      b(1, { props: JUIZO, env: { terrain: "desert", night: 0.55, glory: 0.15, verdure: 0.18 }, cast: [ // o povo CHORA naquela noite
        C("multidao", 60, "bow", { dy: 0.48 }),
      ], q: "o povo chorou naquela noite" }),
      b(2, { q: "murmuraram contra Moisés", cast: [                                // MURMURAM contra Moisés e Arão: "quem dera morrêssemos"
        C("moises", -170, "stand", { dy: 0.5, facing: 1 }),
        C("arao", -110, "stand", { glow: 0.15, dy: 0.5, facing: 1 }),
        C("multidao", 120, "stand", { dy: 0.46 }),
      ] }),
      b(3, { q: "voltarmos ao Egito", cast: [                                      // "não nos seria melhor voltarmos ao Egito?"
        C("multidao", 90, "stand", { dy: 0.46 }),
      ] }),
      b(4, { q: "voltemos ao Egito" }),                                            // "constituamos um líder, e voltemos ao Egito"
      b(5, { q: "caíram sobre os seus rostos", cast: [                             // Moisés e Arão CAEM sobre os rostos
        C("moises", -60, "bow", { dy: 0.52, facing: 1 }),
        C("arao", 10, "bow", { glow: 0.2, dy: 0.5, facing: -1 }),
        C("multidao", 150, "stand", { dy: 0.44 }),
      ] }),
      b(6, { q: "rasgaram as suas vestes", cast: [                                 // JOSUÉ e CALEBE rasgam as vestes
        C("servo", -40, "raise", { dy: 0.52, facing: 1, id: "josue", glow: 0.15 }),
        C("servo", 30, "raise", { dy: 0.52, facing: -1, id: "calebe", glow: 0.15 }),
        C("multidao", 150, "stand", { dy: 0.44 }),
      ] }),
      b(7, { q: "é terra muito boa" }),                                            // "a terra é MUITO BOA"
      b(8, { q: "terra que mana leite e mel" }),                                   // "terra que mana leite e mel"
      b(9, { q: "o Senhor é conosco", cast: [                                      // "não sejais rebeldes… o SENHOR é conosco"
        C("servo", -30, "point", { dy: 0.52, facing: 1, id: "josue", glow: 0.18 }),
        C("multidao", 130, "stand", { dy: 0.46 }),
      ] }),
      b(10, { q: "a glória do Senhor apareceu na tenda", set: "gloria", props: GLORIA_TENDA, // querem apedrejá-los; a GLÓRIA aparece na tenda
        env: { terrain: "desert", glory: 0.85, night: 0.15, verdure: 0.2 }, cast: [
        C("moises", -170, "kneel", { dy: 0.5, facing: 1 }),
        C("arao", -110, "kneel", { glow: 0.25, dy: 0.5, facing: 1 }),
        C("multidao", 150, "bow", { dy: 0.44 }),
      ] }),
      b(11, { by: "deus", q: "Até quando me provocará este povo", env: { glory: 0.9 } }), // "ATÉ QUANDO me provocará este povo?"
      b(12, { by: "deus", q: "Com pestilência o ferirei" }),                       // "com pestilência o ferirei"
      b(13, { q: "Assim os egípcios o ouvirão", env: { glory: 0.82 }, cast: [      // Moisés intercede: "os egípcios o ouvirão"
        C("moises", -60, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      b(14, { q: "numa coluna de fogo de noite", cast: [                           // "tua nuvem sobre ele… coluna de fogo de noite"
        C("moises", -60, "point", { dy: 0.5, facing: 1 }),
      ] }),
      b(15), b(16),
      b(17, { q: "a força do meu Senhor se engrandeça", cast: [                    // "que a FORÇA do meu Senhor se engrandeça"
        C("moises", -60, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      b(18, { q: "longânimo, e grande em misericórdia" }),                         // "o Senhor é longânimo e grande em misericórdia"
      b(19, { q: "Perdoa, pois, a iniqüidade deste povo", env: { glory: 0.92 }, cast: [ // A INTERCESSÃO: "PERDOA a iniquidade deste povo"
        C("moises", -50, "kneel", { dy: 0.52, facing: 1 }),
      ] }),
      b(20, { by: "deus", q: "Conforme à tua palavra lhe perdoei", env: { glory: 0.95 } }), // "conforme à tua palavra, PERDOEI"
      b(21, { by: "deus", q: "a glória do Senhor encherá toda a terra" }),         // "a glória do Senhor encherá toda a terra"
      b(22, { by: "deus", q: "me tentaram estas dez vezes" }),                     // "me tentaram estas DEZ VEZES"
      b(23, { by: "deus", q: "Não verão a terra" }),                               // "NÃO VERÃO a terra que jurei a seus pais"
      b(24, { by: "deus", q: "o meu servo Calebe", env: { glory: 0.9 }, cast: [    // "o meu servo CALEBE… a possuirá em herança"
        C("servo", 20, "stand", { dy: 0.52, facing: 1, id: "calebe", glow: 0.28 }),
      ] }),
      b(25, { by: "deus", q: "caminhai para o deserto pelo caminho do Mar Vermelho" }), // tornai ao deserto pelo Mar Vermelho
      b(26, { by: "deus", cast: [                                                  // o Senhor fala a Moisés e a Arão
        C("moises", -170, "kneel", { dy: 0.5, facing: 1 }),
        C("arao", -110, "kneel", { glow: 0.22, dy: 0.5, facing: 1 }),
      ] }),
      b(27, { by: "deus", q: "esta má congregação, que murmura contra mim" }),     // "até quando sofrerei esta má congregação?"
      b(28, { by: "deus", q: "Vivo eu, diz o Senhor" }),                           // "VIVO EU, diz o Senhor, assim farei"
      b(29, { by: "deus", q: "Neste deserto cairão os vossos cadáveres",           // A SENTENÇA: "neste deserto CAIRÃO os vossos cadáveres"
        env: { glory: 0.5, night: 0.35 } }),
      b(30, { by: "deus", q: "salvo Calebe, filho de Jefoné, e Josué, filho de Num", cast: [ // só CALEBE e JOSUÉ entrarão
        C("servo", -20, "stand", { dy: 0.52, facing: 1, id: "calebe", glow: 0.25 }),
        C("servo", 40, "stand", { dy: 0.5, facing: -1, id: "josue", glow: 0.2 }),
      ] }),
      b(31),
      b(32, { by: "deus", q: "cadáveres cairão neste deserto", env: { glory: 0.62, night: 0.4 } }), // "os vossos cadáveres cairão neste deserto"
      b(33, { env: { glory: 0.62, night: 0.4 }, by: "deus", q: "pastorearão neste deserto quarenta anos" }),         // os filhos pastorearão QUARENTA ANOS
      b(34, { env: { glory: 0.62, night: 0.4 }, by: "deus", q: "quarenta dias, cada dia representando um ano" }),     // um ano por cada dia dos QUARENTA DIAS
      b(35, { env: { glory: 0.62, night: 0.4 }, by: "deus", q: "Eu, o Senhor, falei" }),                             // "EU, O SENHOR, FALEI; assim farei"
      b(36, { set: "juizo", props: JUIZO, env: { terrain: "desert", glory: 0.15, night: 0.6, verdure: 0.16 }, cast: [ // os espias que fizeram murmurar
        C("multidao", 60, "stand", { dy: 0.46 }),
      ] }),
      b(37, { q: "morreram de praga perante o Senhor", env: { glory: 0.1, night: 0.7, storm: 0.3 }, cast: [ // os espias MORREM DE PRAGA
        C("homem", 40, "lie", { dy: 0.52 }),
        C("homem", 130, "lie", { dy: 0.48 }),
        C("mulherComum", 200, "bow", { dy: 0.44 }),
      ] }),
      b(38, { q: "ficaram com vida", env: { glory: 0.4, night: 0.4 }, cast: [      // só JOSUÉ e CALEBE ficaram com vida
        C("servo", -30, "stand", { dy: 0.52, facing: 1, id: "josue", glow: 0.2 }),
        C("servo", 30, "stand", { dy: 0.52, facing: -1, id: "calebe", glow: 0.22 }),
      ] }),
      b(39, { cast: [                                                              // o povo se contrista muito
        C("moises", -170, "stand", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "bow", { dy: 0.46 }),
      ] }),
      b(40, { q: "subiram ao cume do monte", set: "monte", props: MONTE,           // de madrugada SOBEM ao cume do monte
        env: { terrain: "mountain", glory: 0.35, night: 0.35, verdure: 0.3 }, cast: [
        C("multidao", 40, "walk", { dy: 0.5 }),
      ] }),
      b(41, { q: "Por que transgredis o mandado do Senhor", cast: [                // Moisés: "por que TRANSGREDIS o mandado do Senhor?"
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "walk", { dy: 0.46 }),
      ] }),
      b(42, { q: "o Senhor não estará no meio de vós" }),                          // "não subais, o Senhor não estará convosco"
      b(43),
      b(44, { q: "a arca da aliança do Senhor", props: [                           // temerários sobem; a ARCA e Moisés ficam no arraial
        ...MONTE,
        { ...P("ark", -120, 0.85, undefined, 0.6), tag: "arca-alianca" },
      ], cast: [
        C("moises", -170, "stand", { dy: 0.52, facing: 1 }),
        C("multidao", 90, "walk", { dy: 0.44 }),
      ] }),
      b(45, { q: "derrotando-os até Hormá", env: { glory: 0.1, night: 0.55, storm: 0.45 }, cast: [ // amalequitas os DESBARATAM até Hormá
        C("homem", 170, "point", { dy: 0.5, facing: -1, scale: 1.5, id: "amaleque" }),
        C("homem", -60, "lie", { dy: 0.5 }),
        C("mulherComum", 20, "bow", { dy: 0.46 }),
      ] }),
    ],
  },
};
