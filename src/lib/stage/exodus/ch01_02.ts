// ============================================================================
// ÊXODO 1–2 — roteiro do modo CENA VIVA (força-tarefa AT, onda Êxodo).
//
// Êx 1 — A SERVIDÃO: a casa de Jacó cresce até encher o Egito; sobe "um novo
// rei que não conhecera a José", e o temor vira opressão — feitores, tijolos e
// barro, e por fim a ordem monstruosa aos meninos hebreus. No meio da noite,
// duas parteiras (Sifrá e Puá) temem a Deus mais que a Faraó, e a vida vence.
//
// Êx 2 — O LIBERTADOR NASCE: a arca de juncos no Nilo, a filha de Faraó, a irmã
// vigiando de longe; Moisés criado no palácio, a ira pelo egípcio, a fuga a
// Midiã e o poço onde defende as filhas de Jetro. Fecha com o gemido do povo
// que "subiu a Deus" — e Deus OUVE, LEMBRA e VÊ (a glória cresce, sem figura).
//
// DEUS NUNCA É DESENHADO: onde Ele age sem mediador (Êx 2:24-25) é narração
// pura com glória no ambiente. Faraó fala com `by: "farao"`.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------------------
// O EGITO (cidade): as cidades-armazéns Pitom e Ramessés ao fundo, as tendas
// dos hebreus, palmeiras do Nilo e as pilhas de tijolos do cativeiro.
const EGITO: StagePropSpec[] = [
  P("tower", 300, 1.35, undefined, 0.05),   // cidade-armazém (Pitom/Ramessés)
  P("tower", 232, 1, undefined, 0.24),
  P("tent", -206, 1.05, undefined, 0.14),    // tendas dos filhos de Israel
  P("tent", -288, 0.85, undefined, 0.32),
  P("palm", 250, 1.1, undefined, 0.1),
  P("palm", 190, 0.85, undefined, 0.28),
  P("well", -150, 1, undefined, 0.2),
  P("grass", -60, 0.9, undefined, 0.8),
  P("grass", 60, 0.85, undefined, 0.76),
  P("rock", 332, 0.8, undefined, 0.52),
];
// a dura servidão em barro e tijolos (Êx 1:11-14): as pilhas de tijolos
const EGITO_OBRA: StagePropSpec[] = [
  ...EGITO,
  P("crate", 150, 0.9, undefined, 0.5),
  P("crate", 96, 0.8, undefined, 0.62),
  P("crate", -110, 0.85, undefined, 0.56),
  P("crate", 24, 0.75, undefined, 0.68),
];

// ---------------------------------------------------------------------------
// O NILO (Êx 2:3-10): o grande rio, os juncos da margem e a arca de juncos
// (o cesto do menino) boiando entre as canas.
const NILO: StagePropSpec[] = [
  P("river", 0, 1.5, undefined, 0.22),       // o rio
  P("palm", -256, 1.1, undefined, 0.12),
  P("palm", 244, 1.05, undefined, 0.12),
  P("grass", -120, 1.05, undefined, 0.68),   // juncos
  P("grass", 120, 1, undefined, 0.72),
  P("grass", -34, 0.95, undefined, 0.82),
  P("bush", 200, 0.8, undefined, 0.4),
];
// a arca de juncos posta nos juncos à margem (v.3)
const NILO_CESTO: StagePropSpec[] = [...NILO, { ...P("boat", 36, 0.5, undefined, 0.6), tag: "cesto-moises" }];

// ---------------------------------------------------------------------------
// MIDIÃ (Êx 2:15-22): terra do deserto, o poço onde Moisés se assenta e os
// bebedouros do rebanho.
const MIDIA: StagePropSpec[] = [
  { ...P("well", -16, 1.2, undefined, 0.3), tag: "poco-midia" },
  P("palm", -260, 1.1, undefined, 0.12),
  P("palm", 246, 1, undefined, 0.14),
  P("rock", 306, 0.95, undefined, 0.55),
  P("rock", -304, 0.9, undefined, 0.5),
  P("bush", 184, 0.8, undefined, 0.4),
  P("grass", 84, 0.85, undefined, 0.8),
  P("amphora", -84, 0.8, undefined, 0.6),    // os bebedouros
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Êx 1
  // A casa de Jacó vira povo (glória) → um novo rei e o medo (a noite sobe) →
  // a servidão dura (tempestade sobre os tijolos) → o decreto contra os meninos
  // → e as parteiras que temem a Deus (a glória resiste na noite).
  1: {
    start: { terrain: "city", night: 0.08, glory: 0.3, storm: 0, fire: 0, verdure: 0.5 },
    beats: [
      b(1, { cast: [C("multidao", 40, "walk", { dy: 0.42 }), C("patriarca", -70, "walk", { dy: 0.5, id: "jaco" })], props: EGITO, env: { glory: 0.5 } }), // os filhos de Israel que entraram no Egito com Jacó
      b(2, { cast: [C("multidao", 40, "stand", { dy: 0.42 }), C("patriarca", -70, "stand", { dy: 0.5, id: "jaco" })] }), // Rúben, Simeão, Levi e Judá
      b(3), // Issacar, Zebulom e Benjamim
      b(4), // Dã e Naftali, Gade e Aser
      b(5, { cast: [C("multidao", 40, "stand", { dy: 0.42 }), C("jose", 130, "stand", { dy: 0.5 }), C("patriarca", -70, "stand", { dy: 0.5, id: "jaco" })], env: { glory: 0.6 } }), // setenta almas; José estava no Egito
      b(6, { cast: [C("multidao", 40, "stand", { dy: 0.42 })], env: { night: 0.28, glory: 0.15 } }), // faleceu José e toda aquela geração
      b(7, { cast: [C("multidao", -30, "stand", { dy: 0.4 }), C("multidao", 120, "stand", { scale: 0.9, dy: 0.5, id: "povo2" })], env: { night: 0.12, glory: 0.55, verdure: 0.7 } }), // frutificaram e a terra se encheu deles
      b(8, { by: "farao", q: "novo rei sobre o Egito, ", cast: [C("farao", 60, "stand", { dy: 0.44 }), C("multidao", -150, "stand", { scale: 0.85, dy: 0.52 })], env: { night: 0.2, glory: 0.25 } }), // levantou-se um novo rei que não conhecera a José
      b(9, { by: "farao", q: "disse ao seu povo: ", cast: [C("farao", 60, "point", { dy: 0.44, facing: -1 }), C("homem", 150, "stand", { dy: 0.5, id: "cortesao", facing: -1 }), C("multidao", -160, "stand", { scale: 0.85, dy: 0.52 })] }), // "o povo dos filhos de Israel é muito, e mais poderoso do que nós"
      b(10, { by: "farao", cast: [C("farao", 60, "raise", { dy: 0.44, facing: -1 }), C("homem", 150, "stand", { dy: 0.5, id: "cortesao", facing: -1 }), C("multidao", -160, "stand", { scale: 0.85, dy: 0.52 })], env: { storm: 0.15 } }), // "usemos de sabedoria para com eles"
      b(11, { cast: [C("homem", 120, "point", { dy: 0.46, id: "feitor", facing: -1 }), C("multidao", -40, "bow", { dy: 0.5 }), C("multidao", -170, "kneel", { scale: 0.85, dy: 0.56, id: "povo2" })], props: EGITO_OBRA, env: { storm: 0.3, night: 0.22, verdure: 0.35 } }), // maiorais de tributos: Pitom e Ramessés
      b(12, { cast: [C("multidao", -40, "stand", { dy: 0.5 }), C("multidao", 60, "stand", { scale: 0.9, dy: 0.44, id: "povo2" }), C("homem", 150, "stand", { dy: 0.46, id: "feitor", facing: -1 })], env: { glory: 0.5, verdure: 0.55 } }), // quanto mais os afligiam, mais se multiplicavam
      b(13, { cast: [C("homem", 90, "point", { dy: 0.46, id: "feitor", facing: -1 }), C("multidao", -60, "bow", { dy: 0.52 })], env: { glory: 0.2, storm: 0.35, night: 0.25, verdure: 0.35 } }), // os egípcios os faziam servir com dureza
      b(14, { cast: [C("homem", 90, "stand", { dy: 0.46, id: "feitor", facing: -1 }), C("multidao", -60, "kneel", { dy: 0.54 }), C("multidao", 30, "kneel", { scale: 0.85, dy: 0.6, id: "povo2" })], env: { storm: 0.4, night: 0.3 } }), // vida amargada: barro, tijolos e o trabalho no campo
      b(15, { cast: [C("farao", -40, "stand", { dy: 0.46 }), C("mulherComum", 40, "stand", { dy: 0.5, id: "sifra", facing: -1 }), C("mulherComum", 96, "stand", { dy: 0.54, id: "pua", facing: -1 })], props: EGITO, env: { storm: 0.1, night: 0.35 } }), // o rei fala às parteiras Sifrá e Puá
      b(16, { by: "farao", q: "E disse: ", cast: [C("farao", -40, "point", { dy: 0.46, facing: 1 }), C("mulherComum", 40, "stand", { dy: 0.5, id: "sifra", facing: -1 }), C("mulherComum", 96, "stand", { dy: 0.54, id: "pua", facing: -1 })] }), // "se for filho, matai-o; mas se for filha, então viva"
      b(17, { cast: [C("mulherComum", 40, "bow", { dy: 0.5, id: "sifra" }), C("mulherComum", 96, "bow", { dy: 0.54, id: "pua" })], env: { glory: 0.7, night: 0.2, storm: 0 } }), // as parteiras temeram a Deus: conservavam os meninos
      b(18, { by: "farao", q: "disse-lhes: ", cast: [C("farao", -40, "point", { dy: 0.46, facing: 1 }), C("mulherComum", 40, "stand", { dy: 0.5, id: "sifra", facing: -1 }), C("mulherComum", 96, "stand", { dy: 0.54, id: "pua", facing: -1 })], env: { glory: 0.35, storm: 0.15 } }), // "Por que fizestes isto, deixando os meninos com vida?"
      b(19, { by: "mulherComum", q: "disseram a Faraó: ", cast: [C("mulherComum", 40, "stand", { dy: 0.5, id: "sifra", facing: 1 }), C("mulherComum", 96, "stand", { dy: 0.54, id: "pua" }), C("farao", -40, "stand", { dy: 0.46 })] }), // "as mulheres hebréias não são como as egípcias"
      b(20, { cast: [C("mulherComum", 40, "stand", { dy: 0.5, id: "sifra" }), C("mulherComum", 96, "stand", { dy: 0.54, id: "pua" })], env: { glory: 0.75, night: 0.12 } }), // Deus fez bem às parteiras; o povo se aumentou
      b(21, { cast: [C("mulherComum", 40, "stand", { dy: 0.5, id: "sifra" }), C("mulherComum", 96, "stand", { dy: 0.54, id: "pua" })], env: { glory: 0.85 } }), // porque temeram a Deus, estabeleceu-lhes casas
      b(22, { by: "farao", q: "dizendo: ", cast: [C("farao", -30, "raise", { dy: 0.46, facing: 1 }), C("multidao", 150, "stand", { scale: 0.85, dy: 0.5 })], props: [...EGITO, P("river", 130, 1.2, undefined, 0.36)], env: { storm: 0.4, night: 0.4, glory: 0.1, water: 0.25 } }), // "A todos os filhos que nascerem lançareis no rio"
    ],
  },

  // ------------------------------------------------------------------ Êx 2
  // O NILO e a arca de juncos → o palácio → a ira e a fuga → o poço de Midiã →
  // e o gemido do povo que sobe a Deus: Ele OUVE, LEMBRA e VÊ (glória sem figura).
  2: {
    start: { terrain: "city", night: 0.12, glory: 0.25, storm: 0, fire: 0, water: 0.35, verdure: 0.55 },
    beats: [
      b(1, { cast: [C("homem", -30, "stand", { dy: 0.5, id: "anrao" }), C("mulherComum", 30, "stand", { dy: 0.52, id: "joquebede", facing: -1 })], props: NILO, env: { glory: 0.4 } }), // um homem da casa de Levi casou com uma filha de Levi
      b(2, { cast: [C("mulherComum", 0, "kneel", { dy: 0.54, id: "joquebede" })], env: { glory: 0.55, night: 0.18 } }), // deu à luz um filho formoso; escondeu-o três meses
      b(3, { cast: [C("mulherComum", -20, "kneel", { dy: 0.56, id: "joquebede", facing: 1 })], props: NILO_CESTO, env: { glory: 0.3, water: 0.4 } }), // a arca de juncos, com barro e betume, posta nos juncos
      b(4, { cast: [C("mulherComum", 200, "stand", { scale: 0.7, dy: 0.4, id: "miria", facing: -1 })], env: { glory: 0.25 } }), // a irmã postou-se de longe para ver
      b(5, { cast: [C("mulherComum", -40, "stand", { dy: 0.5, id: "filhaFarao", facing: 1 }), C("multidao", -150, "stand", { scale: 0.8, dy: 0.44, id: "donzelas" }), C("mulherComum", 200, "stand", { scale: 0.7, dy: 0.4, id: "miria", facing: -1 })], env: { glory: 0.5, night: 0.08 } }), // a filha de Faraó desce ao rio e vê a arca
      b(6, { by: "mulherComum", q: "e disse: ", cast: [C("mulherComum", -40, "kneel", { dy: 0.5, id: "filhaFarao", facing: 1 }), C("multidao", -150, "stand", { scale: 0.8, dy: 0.44, id: "donzelas" }), C("mulherComum", 200, "stand", { scale: 0.7, dy: 0.4, id: "miria", facing: -1 })], env: { glory: 0.6 } }), // compaixão: "Dos meninos dos hebreus é este"
      b(7, { by: "mulherComum", q: "à filha de Faraó: ", cast: [C("mulherComum", 150, "point", { scale: 0.72, dy: 0.44, id: "miria", facing: -1 }), C("mulherComum", -40, "stand", { dy: 0.5, id: "filhaFarao" })] }), // a irmã: "Irei chamar uma ama das hebréias?"
      b(8, { cast: [C("mulherComum", 150, "walk", { scale: 0.72, dy: 0.44, id: "miria" }), C("mulherComum", -40, "stand", { dy: 0.5, id: "filhaFarao" }), C("mulherComum", 60, "walk", { dy: 0.52, id: "joquebede", facing: -1 })], env: { glory: 0.5 } }), // "Vai"; a moça chama a mãe do menino
      b(9, { cast: [C("mulherComum", -40, "point", { dy: 0.5, id: "filhaFarao", facing: 1 }), C("mulherComum", 30, "bow", { dy: 0.52, id: "joquebede", facing: -1 })], env: { glory: 0.55 } }), // "Leva este menino, e cria-mo; eu te darei teu salário"
      b(10, { set: "palacio", cast: [C("mulherComum", -30, "stand", { dy: 0.5, id: "filhaFarao", facing: 1 })], props: [...EGITO, P("tower", -20, 1.2, undefined, 0.16)], env: { terrain: "city", glory: 0.5, water: 0, night: 0.05, verdure: 0.5 } }), // o menino é adotado e chamado Moisés
      b(11, { cast: [C("moises", -20, "stand", { dy: 0.5, facing: 1 }), C("homem", 120, "point", { dy: 0.48, id: "egipcio", facing: -1 }), C("multidao", 210, "kneel", { scale: 0.85, dy: 0.56 })], props: EGITO_OBRA, env: { storm: 0.28, night: 0.2, glory: 0.15 } }), // Moisés vê um egípcio ferir um hebreu
      b(12, { cast: [C("moises", 40, "raise", { dy: 0.5, facing: -1 }), C("homem", 110, "lie", { dy: 0.4, id: "egipcio" })], env: { storm: 0.35, night: 0.28 } }), // matou o egípcio e o escondeu na areia
      b(13, { by: "moises", q: "e disse ao injusto: ", cast: [C("moises", -30, "point", { dy: 0.5, facing: 1 }), C("homem", 60, "stand", { dy: 0.5, id: "hebreu1", facing: -1 }), C("homem", 120, "stand", { dy: 0.52, id: "hebreu2", facing: -1 })], env: { storm: 0.2 } }), // dois hebreus contendiam: "Por que feres a teu próximo?"
      b(14, { by: "moises", q: "Então temeu Moisés, e disse: ", cast: [C("moises", -30, "bow", { dy: 0.5 }), C("homem", 60, "point", { dy: 0.5, id: "hebreu1", facing: 1 })], env: { storm: 0.15, night: 0.35, glory: 0.1 } }), // "Certamente este negócio foi descoberto"
      b(15, { set: "midia", cast: [C("moises", -20, "kneel", { dy: 0.5, facing: 1 })], props: MIDIA, env: { terrain: "desert", storm: 0, night: 0.15, glory: 0.3, verdure: 0.25 } }), // fugiu para Midiã e assentou-se junto a um poço
      b(16, { cast: [C("moises", -20, "stand", { dy: 0.5 }), C("multidao", 120, "stand", { scale: 0.8, dy: 0.46, id: "filhas" }), C("rebanho", 210, "stand", { dy: 0.42 })], env: { glory: 0.35 } }), // as sete filhas do sacerdote vêm tirar água
      b(17, { cast: [C("pastor", 170, "point", { dy: 0.48, id: "pastor1", facing: -1 }), C("multidao", 90, "stand", { scale: 0.8, dy: 0.5, id: "filhas" }), C("moises", -10, "raise", { dy: 0.5, facing: 1 }), C("rebanho", 230, "stand", { dy: 0.42 })], env: { storm: 0.15, glory: 0.4 } }), // os pastores as expulsam; Moisés as defende e dá de beber
      b(18, { by: "homem", q: "ele disse: ", set: "casa-jetro", cast: [C("homem", -40, "stand", { dy: 0.5, id: "jetro", facing: 1 }), C("multidao", 60, "stand", { scale: 0.8, dy: 0.52, id: "filhas", facing: -1 })], props: MIDIA, env: { storm: 0, glory: 0.45, night: 0.18 } }), // Reuel (Jetro): "Por que hoje tornastes tão depressa?"
      b(19, { by: "mulherComum", q: "E elas disseram: ", cast: [C("mulherComum", 40, "stand", { dy: 0.5, id: "filha1", facing: -1 }), C("homem", -40, "stand", { dy: 0.5, id: "jetro" })] }), // "Um homem egípcio nos livrou da mão dos pastores"
      b(20, { by: "homem", q: "E disse a suas filhas: ", cast: [C("homem", -40, "point", { dy: 0.5, id: "jetro", facing: 1 }), C("mulherComum", 40, "stand", { dy: 0.5, id: "filha1", facing: -1 })] }), // "E onde está ele? Chamai-o para que coma pão"
      b(21, { cast: [C("moises", -20, "stand", { dy: 0.5 }), C("homem", -90, "stand", { dy: 0.5, id: "jetro", facing: 1 }), C("mulherComum", 40, "stand", { dy: 0.52, id: "zipora", facing: -1 })], env: { glory: 0.55, night: 0.1 } }), // Moisés mora ali; recebe Zípora por mulher
      b(22, { by: "moises", q: "porque disse: ", cast: [C("moises", -20, "raise", { dy: 0.5 }), C("mulherComum", 40, "stand", { dy: 0.52, id: "zipora", facing: -1 })], env: { glory: 0.5 } }), // nasce Gérson: "Peregrino fui em terra estranha"
      b(23, { set: "egito-clamor", cast: [C("multidao", -20, "kneel", { dy: 0.52 }), C("multidao", 90, "bow", { scale: 0.9, dy: 0.46, id: "povo2" })], props: EGITO_OBRA, env: { terrain: "city", night: 0.5, glory: 0.15, storm: 0.2, verdure: 0.3 } }), // morre o rei; o clamor da servidão sobe a Deus
      b(24, { cast: [C("multidao", -20, "kneel", { dy: 0.52 }), C("multidao", 90, "kneel", { scale: 0.9, dy: 0.46, id: "povo2" })], env: { glory: 0.6, night: 0.35, storm: 0 } }), // Deus ouviu o gemido e LEMBROU-SE da aliança
      b(25, { cast: [C("multidao", -20, "stand", { dy: 0.52 }), C("multidao", 90, "stand", { scale: 0.9, dy: 0.46, id: "povo2" })], env: { glory: 0.85, night: 0.2 } }), // Deus viu os filhos de Israel e atentou para eles
    ],
  },
};
