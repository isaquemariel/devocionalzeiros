// ============================================================================
// ÊXODO 15–16 — roteiro do modo CENA VIVA (força-tarefa AT, onda Êxodo).
//
// Êx 15 — O CÂNTICO DO MAR: Moisés e Israel cantam o triunfo do SENHOR ("homem
// de guerra") que lançou no mar o cavalo e o cavaleiro; Miriã responde com
// tamboril e danças. Depois, três dias sem água até Mara (amarga → doce por uma
// árvore) e o descanso de Elim (doze fontes, setenta palmeiras).
//
// Êx 16 — O MANÁ E AS CODORNIZES: no deserto de Sim o povo murmura com fome;
// Deus faz chover "pão dos céus" — o maná, um ômer por cabeça —, manda codornizes
// à tarde, e ensina o descanso do sábado (nada ao sétimo dia). Um ômer de maná é
// guardado por memória.
//
// A VOZ DE DEUS (regra do projeto): sem mediador visível, Deus fala do céu a
// Moisés — `by: "deus"`, glória no ambiente, SEM figura. O maná desce pela
// GLÓRIA; as codornizes chegam como `birds` no céu. O povo que murmura é
// `multidao`; Miriã, `mulherComum`.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------------------
// A PRAIA DO MAR (Êx 15:1-21): a beira do Mar Vermelho de onde sobe o cântico do
// triunfo, com os rochedos e as palmeiras.
const PRAIA: StagePropSpec[] = [
  { ...P("river", 0, 1.7, undefined, 0.2), tag: "mar-vermelho" },
  P("palm", -270, 1.05, undefined, 0.12),
  P("palm", 260, 1, undefined, 0.14),
  P("rock", -320, 0.95, undefined, 0.5),
  P("rock", 320, 0.9, undefined, 0.52),
  P("grass", -80, 0.85, undefined, 0.78),
  P("bush", 150, 0.8, undefined, 0.42),
];

// ---------------------------------------------------------------------------
// O DESERTO DE SUR e MARA (Êx 15:22-25): o ermo sem água e o poço amargo de Mara,
// adoçado pela árvore que Moisés lança nas águas.
const DESERTO: StagePropSpec[] = [
  P("rock", -280, 1.1, undefined, 0.45),
  P("rock", 296, 1, undefined, 0.52),
  P("palm", 210, 0.9, undefined, 0.16),
  P("bush", -150, 0.8, undefined, 0.4),
  P("bush", 120, 0.78, undefined, 0.44),
  P("grass", -30, 0.8, undefined, 0.82),
  P("grass", 60, 0.75, undefined, 0.74),
];
const MARA: StagePropSpec[] = [
  { ...P("well", 0, 1.15, undefined, 0.34), tag: "aguas-mara" },
  P("rock", -280, 1.05, undefined, 0.46),
  P("rock", 290, 1, undefined, 0.5),
  P("palm", 200, 0.85, undefined, 0.18),
  P("bush", -140, 0.8, undefined, 0.42),
  P("grass", -50, 0.8, undefined, 0.8),
];
// a árvore que adoça as águas de Mara (Êx 15:25)
const MARA_ARVORE: StagePropSpec[] = [...MARA, { ...P("tree", 90, 0.95, undefined, 0.36), tag: "arvore-mara" }];

// ---------------------------------------------------------------------------
// ELIM (Êx 15:27): o oásis — doze fontes de água e setenta palmeiras.
const ELIM: StagePropSpec[] = [
  { ...P("well", -40, 1.1, undefined, 0.34), tag: "fontes-elim" },
  P("palm", -260, 1.15, undefined, 0.1),
  P("palm", 250, 1.1, undefined, 0.12),
  P("palm", 180, 0.9, undefined, 0.24),
  P("palm", -180, 0.95, undefined, 0.2),
  P("grass", 40, 0.9, undefined, 0.8),
  P("amphora", 120, 0.8, undefined, 0.6),
];

// ---------------------------------------------------------------------------
// O ARRAIAL no deserto de Sim (Êx 16): as tendas do acampamento onde desce o maná.
const ARRAIAL: StagePropSpec[] = [
  P("tent", -240, 1.1, undefined, 0.14),
  P("tent", -160, 0.95, undefined, 0.24),
  P("tent", 180, 1.05, undefined, 0.16),
  P("tent", 260, 0.9, undefined, 0.3),
  P("palm", 60, 0.9, undefined, 0.12),
  P("rock", -320, 0.9, undefined, 0.5),
  P("grass", -40, 0.85, undefined, 0.8),
];
// as codornizes que chegam à tarde (Êx 16:13): aves no céu do arraial
const ARRAIAL_AVES: StagePropSpec[] = [...ARRAIAL, { kind: "birds", dx: 40, scale: 1, dy: 0.5, sky: true }];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Êx 15
  // O cântico do triunfo à beira-mar (glória alta) → Miriã e as mulheres com
  // tamboris → três dias sem água → Mara amarga adoçada pela árvore → e o
  // descanso de Elim (o oásis verde).
  15: {
    start: { terrain: "desert", night: 0.14, glory: 0.75, storm: 0, fire: 0, water: 0.4, verdure: 0.3 },
    beats: [
      b(1, { by: "moises", q: "e falaram, dizendo: ", set: "praia", cast: [C("moises", -60, "raise", { dy: 0.5, facing: 1 }), C("multidao", 40, "raise", { dy: 0.48 }), C("multidao", 140, "stand", { scale: 0.9, dy: 0.52, id: "povo2" })], props: PRAIA, env: { terrain: "desert", glory: 0.85, night: 0.12, water: 0.45 } }), // "Cantarei ao SENHOR, porque gloriosamente triunfou; lançou no mar o cavalo e o cavaleiro"
      b(2, { by: "moises", env: { glory: 0.88 } }), // "O Senhor é a minha força e o meu cântico; ele me foi por salvação"
      b(3, { by: "moises", env: { glory: 0.9 } }), // "O Senhor é homem de guerra; o Senhor é o seu nome"
      b(4, { by: "moises" }), // "lançou no mar os carros de Faraó; seus príncipes afogaram-se no Mar Vermelho"
      b(5, { by: "moises" }), // "os abismos os cobriram; desceram às profundezas como pedra"
      b(6, { by: "moises", env: { glory: 0.92 } }), // "a tua destra, ó Senhor, tem despedaçado o inimigo"
      b(7, { by: "moises" }), // "com a grandeza da tua excelência derrubaste os que se levantaram contra ti"
      b(8, { by: "moises" }), // "com o sopro de tuas narinas amontoaram-se as águas"
      b(9, { by: "moises" }), // "o inimigo dizia: Perseguirei, alcançarei, repartirei os despojos"
      b(10, { by: "moises" }), // "sopraste com o teu vento, o mar os cobriu"
      b(11, { by: "moises", env: { glory: 0.95 } }), // "quem é como tu entre os deuses, ó Senhor? glorificado em santidade"
      b(12, { by: "moises" }), // "estendeste a tua mão direita; a terra os tragou"
      b(13, { by: "moises" }), // "com a tua beneficência guiaste este povo que salvaste"
      b(14, { by: "moises" }), // "os povos o ouviram e estremeceram"
      b(15, { by: "moises" }), // "os príncipes de Edom se pasmaram; derreteram-se os de Canaã"
      b(16, { by: "moises" }), // "espanto e pavor caiu sobre eles, até que o teu povo passou"
      b(17, { by: "moises", env: { glory: 0.95 } }), // "tu os plantarás no monte da tua herança, no santuário que estabeleceste"
      b(18, { by: "moises", env: { glory: 1 } }), // "O Senhor reinará eterna e perpetuamente"
      b(19, { cast: [C("moises", -60, "stand", { dy: 0.5, facing: 1 }), C("multidao", 40, "stand", { dy: 0.48 })], env: { glory: 0.8, water: 0.4 } }), // porque os cavalos de Faraó entraram no mar, mas Israel passou em seco
      b(20, { cast: [C("mulherComum", -30, "raise", { dy: 0.5, id: "miria", facing: 1 }), C("mulherComum", 60, "raise", { dy: 0.52, id: "mulher2", facing: -1 }), C("multidao", 150, "stand", { scale: 0.9, dy: 0.5, id: "mulheres" })], env: { glory: 0.85 } }), // Miriã, a profetisa, toma o tamboril, e as mulheres saem com danças
      b(21, { by: "mulherComum", q: "E Miriã lhes respondia: ", cast: [C("mulherComum", -30, "point", { dy: 0.5, id: "miria", facing: 1 }), C("mulherComum", 70, "raise", { dy: 0.52, id: "mulher2", facing: -1 })], env: { glory: 0.9 } }), // "Cantai ao Senhor, porque gloriosamente triunfou; lançou no mar o cavalo e o cavaleiro"
      b(22, { set: "sur", cast: [C("moises", -100, "walk", { dy: 0.5, facing: 1 }), C("multidao", 10, "walk", { dy: 0.48 }), C("multidao", 120, "walk", { scale: 0.9, dy: 0.52, id: "povo2" })], props: DESERTO, env: { terrain: "desert", glory: 0.45, water: 0, night: 0.18, verdure: 0.15 } }), // Moisés faz partir Israel ao deserto de Sur; três dias sem água
      b(23, { set: "mara", cast: [C("multidao", -20, "kneel", { dy: 0.52 }), C("moises", -110, "stand", { dy: 0.5, facing: 1 })], props: MARA, env: { terrain: "desert", glory: 0.3, verdure: 0.12, night: 0.2 } }), // chegam a Mara, mas as águas eram amargas; por isso o nome Mara
      b(24, { by: "multidao", q: "dizendo: ", cast: [C("multidao", -20, "point", { dy: 0.52 }), C("moises", -110, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.25 } }), // o povo murmura contra Moisés: "Que havemos de beber?"
      b(25, { cast: [C("moises", -40, "raise", { dy: 0.5, facing: 1 }), C("multidao", 60, "stand", { dy: 0.5 })], props: MARA_ARVORE, env: { glory: 0.55, verdure: 0.3 } }), // Moisés clama; o Senhor mostra uma árvore, e as águas se tornam doces
      b(26, { by: "deus", q: "E disse: ", env: { glory: 0.65 } }), // "se ouvires a voz do Senhor teu Deus... eu sou o Senhor que te sara"
      b(27, { set: "elim", cast: [C("multidao", 20, "stand", { dy: 0.48 }), C("multidao", 130, "stand", { scale: 0.9, dy: 0.52, id: "povo2" }), C("moises", -100, "stand", { dy: 0.5, facing: 1 })], props: ELIM, env: { terrain: "desert", glory: 0.6, verdure: 0.7, night: 0.1, water: 0.35 } }), // vêm a Elim: doze fontes de água e setenta palmeiras, e ali acampam
    ],
  },

  // ------------------------------------------------------------------ Êx 16
  // A murmuração por fome → a promessa do pão dos céus → a glória na nuvem → as
  // codornizes e o maná → a lição do sábado → e o ômer de maná guardado.
  16: {
    start: { terrain: "desert", night: 0.16, glory: 0.5, storm: 0, fire: 0, verdure: 0.25 },
    beats: [
      b(1, { set: "deserto-sim", cast: [C("multidao", 0, "walk", { dy: 0.48 }), C("multidao", 120, "walk", { scale: 0.9, dy: 0.52, id: "povo2" }), C("moises", -110, "stand", { dy: 0.5, facing: 1 })], props: ARRAIAL, env: { terrain: "desert", glory: 0.45, verdure: 0.2 } }), // partindo de Elim, vêm ao deserto de Sim, entre Elim e Sinai
      b(2, { cast: [C("multidao", -20, "point", { dy: 0.5 }), C("multidao", 70, "stand", { scale: 0.9, dy: 0.54, id: "povo2" }), C("moises", -120, "stand", { dy: 0.5, facing: 1 }), C("arao", -70, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.3, night: 0.22 } }), // toda a congregação murmura contra Moisés e Arão no deserto
      b(3, { by: "multidao", q: "E os filhos de Israel disseram-lhes: ", cast: [C("multidao", -20, "point", { dy: 0.5 }), C("moises", -120, "stand", { dy: 0.5, facing: 1 }), C("arao", -70, "stand", { dy: 0.5, facing: 1 })] }), // "quem dera morrêssemos no Egito junto às panelas de carne... para matar de fome esta multidão"
      b(4, { by: "deus", q: "Então disse o Senhor a Moisés: ", cast: [C("moises", -60, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.65 } }), // "vos farei chover pão dos céus; colherá cada dia a porção, para que eu o prove"
      b(5, { by: "deus" }), // "no sexto dia prepararão o dobro do que colhem cada dia"
      b(6, { by: "moises", q: "a todos os filhos de Israel: ", cast: [C("moises", -70, "point", { dy: 0.5, facing: 1 }), C("arao", -20, "stand", { dy: 0.5, facing: 1 }), C("multidao", 80, "stand", { dy: 0.5 })], env: { glory: 0.5 } }), // "À tarde sabereis que o Senhor vos tirou da terra do Egito"
      b(7, { by: "moises", env: { glory: 0.6 } }), // "amanhã vereis a glória do Senhor, porquanto ouviu as vossas murmurações"
      b(8, { by: "moises", q: "Disse mais Moisés: " }), // "o Senhor à tarde vos dará carne e pela manhã pão... contra ele murmurais"
      b(9, { by: "moises", q: "Depois disse Moisés a Arão: Dize a toda a congregação dos filhos de Israel: ", cast: [C("arao", -20, "raise", { dy: 0.5, facing: 1 }), C("moises", -80, "stand", { dy: 0.5, facing: 1 }), C("multidao", 90, "stand", { dy: 0.5 })] }), // "Chegai-vos à presença do Senhor, porque ouviu as vossas murmurações"
      b(10, { cast: [C("arao", -20, "raise", { dy: 0.5, facing: 1 }), C("multidao", 90, "bow", { dy: 0.5 }), C("multidao", 180, "bow", { scale: 0.9, dy: 0.46, id: "povo2" })], env: { glory: 0.85, night: 0.08 } }), // quando Arão fala, a glória do Senhor aparece na nuvem
      b(11, { cast: [C("moises", -30, "kneel", { dy: 0.5, facing: 1 })], env: { glory: 0.8 } }), // o Senhor fala a Moisés
      b(12, { by: "deus", q: "Fala-lhes, dizendo: ", env: { glory: 0.82 } }), // "entre as duas tardes comereis carne, e pela manhã vos fartareis de pão"
      b(13, { set: "arraial-aves", cast: [C("multidao", 20, "stand", { dy: 0.5 }), C("multidao", 120, "stand", { scale: 0.9, dy: 0.54, id: "povo2" })], props: ARRAIAL_AVES, env: { terrain: "desert", glory: 0.55, night: 0.4 } }), // à tarde sobem codornizes e cobrem o arraial; pela manhã, o orvalho
      b(14, { cast: [C("multidao", 20, "kneel", { dy: 0.52 }), C("multidao", 120, "kneel", { scale: 0.9, dy: 0.56, id: "povo2" })], props: ARRAIAL, env: { glory: 0.7, night: 0.1 } }), // levantado o orvalho, há sobre o deserto uma coisa miúda, como geada
      b(15, { by: "moises", q: "Disse-lhes pois Moisés: ", cast: [C("moises", -60, "point", { dy: 0.5, facing: 1 }), C("multidao", 40, "kneel", { dy: 0.52 }), C("multidao", 130, "kneel", { scale: 0.9, dy: 0.56, id: "povo2" })], env: { glory: 0.72 } }), // "Que é isto?"; Moisés: "Este é o pão que o Senhor vos deu para comer"
      b(16, { by: "moises", q: "Esta é a palavra que o Senhor tem mandado: " }), // "colhei um ômer por cabeça, segundo o número das vossas almas"
      b(17, { cast: [C("multidao", 20, "kneel", { dy: 0.52 }), C("multidao", 110, "kneel", { scale: 0.9, dy: 0.56, id: "povo2" }), C("multidao", 190, "kneel", { scale: 0.8, dy: 0.6, id: "povo3" })] }), // os filhos de Israel colhem, uns mais e outros menos
      b(18, { env: { glory: 0.75 } }), // medindo com o ômer, não sobeja nem falta a ninguém
      b(19, { by: "moises", q: "E disse-lhes Moisés: ", cast: [C("moises", -50, "point", { dy: 0.5, facing: 1 }), C("multidao", 50, "stand", { dy: 0.5 })] }), // "Ninguém deixe dele para amanhã"
      b(20, { cast: [C("moises", -50, "point", { dy: 0.5, facing: 1 }), C("multidao", 50, "bow", { dy: 0.52 })], env: { glory: 0.4, night: 0.2 } }), // alguns deixam para o dia seguinte; cria bichos e cheira mal; Moisés indigna-se
      b(21, { cast: [C("multidao", 20, "kneel", { dy: 0.52 }), C("multidao", 110, "kneel", { scale: 0.9, dy: 0.56, id: "povo2" })], env: { glory: 0.6, night: 0.08 } }), // colhem-no cada manhã; aquecendo o sol, derrete-se
      b(22, { cast: [C("anciao", -30, "stand", { dy: 0.5 }), C("anciao", 40, "stand", { dy: 0.52, id: "principe2", facing: -1 }), C("moises", -110, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.6 } }), // ao sexto dia colhem em dobro; os príncipes o contam a Moisés
      b(23, { by: "moises", q: "E ele disse-lhes: Isto é o que o Senhor tem dito: ", cast: [C("moises", -80, "point", { dy: 0.5, facing: 1 }), C("anciao", 20, "stand", { dy: 0.5 })] }), // "Amanhã é repouso, o santo sábado do Senhor; guardai o que sobejar"
      b(24, { env: { glory: 0.7 } }), // guardam até o dia seguinte, e não cheira mal nem cria bicho
      b(25, { by: "moises", q: "Então disse Moisés: ", cast: [C("moises", -50, "stand", { dy: 0.5, facing: 1 }), C("multidao", 50, "stand", { dy: 0.5 })], env: { glory: 0.72 } }), // "Comei-o hoje, porque hoje é o sábado do Senhor; hoje não o achareis no campo"
      b(26, { by: "moises" }), // "seis dias o colhereis, mas o sétimo dia é o sábado; nele não haverá"
      b(27, { cast: [C("multidao", 30, "walk", { dy: 0.5 }), C("multidao", 120, "stand", { scale: 0.9, dy: 0.54, id: "povo2" })], env: { glory: 0.45, night: 0.12 } }), // ao sétimo dia alguns saem para colher, mas não acham
      b(28, { by: "deus", q: "Então disse o Senhor a Moisés: ", cast: [C("moises", -40, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.6 } }), // "até quando recusareis guardar os meus mandamentos e as minhas leis?"
      b(29, { by: "deus" }), // "o Senhor vos deu o sábado; no sexto dia vos dá pão para dois dias"
      b(30, { cast: [C("multidao", 20, "stand", { dy: 0.5 }), C("multidao", 110, "stand", { scale: 0.9, dy: 0.54, id: "povo2" })], env: { glory: 0.7, night: 0.14 } }), // assim repousa o povo no sétimo dia
      b(31, { cast: [C("multidao", 40, "kneel", { dy: 0.52 }), C("moises", -80, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.6 } }), // a casa de Israel chama o seu nome maná; como semente de coentro, sabor de mel
      b(32, { by: "moises", q: "E disse Moisés: Esta é a palavra que o Senhor tem mandado: " }), // "enchei um ômer de maná e guardai para as vossas gerações"
      b(33, { by: "moises", q: "Disse também Moisés a Arão: ", cast: [C("moises", -60, "point", { dy: 0.5, facing: 1 }), C("arao", 10, "stand", { dy: 0.5, facing: -1 })], props: [...ARRAIAL, { ...P("amphora", -20, 0.85, undefined, 0.55), tag: "vaso-mana" }], env: { glory: 0.65 } }), // "Toma um vaso, põe nele um ômer de maná, e coloca-o diante do Senhor"
      b(34, { cast: [C("arao", -10, "bow", { dy: 0.5 }), C("moises", -80, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.72 } }), // Arão põe o maná diante do Testemunho, para ser guardado
      b(35, { cast: [C("multidao", 30, "stand", { dy: 0.5 }), C("multidao", 130, "stand", { scale: 0.9, dy: 0.54, id: "povo2" })], env: { glory: 0.7, verdure: 0.3 } }), // comeram maná quarenta anos, até chegarem aos termos de Canaã
      b(36, { env: { glory: 0.65 } }), // e um ômer é a décima parte do efa
    ],
  },
};
