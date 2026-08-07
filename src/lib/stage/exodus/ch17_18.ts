// ============================================================================
// ÊXODO 17–18 — roteiro do modo CENA VIVA (força-tarefa AT, onda Êxodo).
//
// Êx 17 — ÁGUA DA ROCHA E AMALEQUE: em Refidim o povo contende por água; o
// Senhor está sobre a rocha em Horebe e dela sai água. Vem Amaleque à guerra:
// enquanto Moisés levanta as mãos no cume (Arão e Hur as sustentam), Josué
// prevalece. Moisés edifica o altar "O SENHOR É MINHA BANDEIRA".
//
// Êx 18 — O CONSELHO DE JETRO: o sogro de Moisés chega ao monte de Deus com
// Zípora e os filhos, alegra-se e oferece sacrifício; vendo Moisés julgar o povo
// sozinho o dia inteiro, aconselha nomear maiorais de mil, cem, cinqüenta e dez.
//
// A VOZ DE DEUS (regra do projeto): sem mediador visível, Deus fala do céu a
// Moisés — `by: "deus"`, glória no ambiente, SEM figura. Josué e Hur entram como
// `homem` (com id próprio), à maneira dos coadjuvantes; Jetro, `homem` id jetro.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------------------
// REFIDIM (deserto sem água) e a ROCHA de Horebe de onde saem as águas.
const REFIDIM: StagePropSpec[] = [
  P("tent", -240, 1.05, undefined, 0.14),
  P("tent", 240, 1, undefined, 0.16),
  P("rock", -300, 1.1, undefined, 0.46),
  P("rock", 300, 1, undefined, 0.5),
  P("bush", -130, 0.75, undefined, 0.42),
  P("grass", -30, 0.75, undefined, 0.8),
  P("palm", 180, 0.85, undefined, 0.18),
];
const ROCHA: StagePropSpec[] = [
  { ...P("rock", 40, 1.5, undefined, 0.34), tag: "rocha-horebe" },
  P("river", 44, 1.0, undefined, 0.5),          // as águas que saem da rocha ferida
  P("river", 20, 1.15, undefined, 0.7),         // e correm pelo deserto, e o povo bebe
  P("rock", -280, 1.05, undefined, 0.46),
  P("rock", 300, 0.95, undefined, 0.5),
  P("palm", -200, 0.9, undefined, 0.16),
  P("grass", -60, 0.8, undefined, 0.8),
  P("bush", 150, 0.75, undefined, 0.42),
];

// ---------------------------------------------------------------------------
// O OUTEIRO da batalha (o cume onde Moisés levanta as mãos) e o ALTAR da vitória.
const OUTEIRO: StagePropSpec[] = [
  { ...P("rock", 0, 1.6, undefined, 0.3), tag: "cume-outeiro" },
  P("rock", -300, 1.05, undefined, 0.5),
  P("rock", 300, 1, undefined, 0.52),
  P("bush", -140, 0.75, undefined, 0.44),
  P("bush", 160, 0.72, undefined, 0.42),
  P("grass", -40, 0.75, undefined, 0.82),
];
const ALTAR_BANDEIRA: StagePropSpec[] = [
  { ...P("altar", 0, 1.1, 0.5, 0.4), tag: "altar-bandeira" },
  P("rock", -280, 1.05, undefined, 0.46),
  P("rock", 290, 1, undefined, 0.5),
  P("palm", 190, 0.85, undefined, 0.18),
  P("grass", -50, 0.8, undefined, 0.8),
];

// ---------------------------------------------------------------------------
// O MONTE DE DEUS e a TENDA (Êx 18): onde Jetro chega e Moisés julga o povo.
const MONTE_TENDA: StagePropSpec[] = [
  { ...P("tent", 20, 1.15, undefined, 0.3), tag: "tenda-moises" },
  P("rock", -280, 1.1, undefined, 0.46),
  P("rock", 300, 1, undefined, 0.5),
  P("palm", -190, 0.95, undefined, 0.14),
  P("palm", 200, 0.9, undefined, 0.16),
  P("grass", -60, 0.8, undefined, 0.8),
  P("bush", 130, 0.75, undefined, 0.42),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Êx 17
  // A contenda por água em Refidim → a água da rocha em Horebe → a guerra de
  // Amaleque (as mãos sustentadas no cume) → e o altar "O Senhor é minha bandeira".
  17: {
    start: { terrain: "desert", night: 0.16, glory: 0.45, storm: 0, fire: 0, verdure: 0.2 },
    beats: [
      b(1, { set: "refidim", cast: [C("moises", -100, "stand", { dy: 0.5, facing: 1 }), C("multidao", 10, "stand", { dy: 0.48 }), C("multidao", 120, "stand", { scale: 0.9, dy: 0.52, id: "povo2" })], props: REFIDIM, env: { terrain: "desert", glory: 0.4, verdure: 0.15 } }), // partem para Refidim; não há ali água para o povo beber
      b(2, { by: "multidao", q: "e disse: ", cast: [C("multidao", -10, "point", { dy: 0.5 }), C("moises", -110, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.3, storm: 0.1 } }), // o povo contende: "Dá-nos água para beber"; Moisés: "Por que tentais ao Senhor?"
      b(3, { by: "multidao", q: "e disse: ", cast: [C("multidao", -10, "point", { dy: 0.5 }), C("multidao", 80, "stand", { scale: 0.9, dy: 0.54, id: "povo2" }), C("moises", -120, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.22, storm: 0.15 } }), // "Por que nos fizeste subir do Egito, para nos matares de sede?"
      b(4, { by: "moises", q: "dizendo: ", cast: [C("moises", -30, "kneel", { dy: 0.5, facing: 1 })], env: { glory: 0.45, storm: 0 } }), // Moisés clama: "Que farei a este povo? Daqui a pouco me apedrejará"
      b(5, { by: "deus", q: "Então disse o Senhor a Moisés: ", cast: [C("moises", -30, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.6 } }), // "Passa diante do povo, toma os anciãos e a tua vara, e vai"
      b(6, { by: "deus", set: "rocha", cast: [C("moises", -60, "raise", { dy: 0.5, facing: 1 }), C("anciao", -140, "stand", { dy: 0.5 }), C("multidao", 150, "kneel", { scale: 0.9, dy: 0.5 })], props: ROCHA, env: { terrain: "desert", glory: 0.7, water: 0.14, verdure: 0.3 } }), // "eu estarei sobre a rocha em Horebe; tu a ferirás e sairá água". Moisés assim o fez
      b(7, { by: "multidao", q: "dizendo: ", cast: [C("multidao", 100, "stand", { dy: 0.5 }), C("moises", -80, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.4, water: 0.12 } }), // Massá e Meribá: "Está o Senhor no meio de nós, ou não?"
      b(8, { set: "outeiro", cast: [C("homem", 40, "raise", { dy: 0.5, id: "amaleque", facing: -1 }), C("homem", 120, "stand", { dy: 0.52, id: "amaleque2", facing: -1 }), C("homem", -60, "raise", { dy: 0.5, id: "josue", facing: 1 })], props: OUTEIRO, env: { terrain: "mountain", storm: 0.3, glory: 0.3, water: 0, night: 0.18 } }), // vem Amaleque e peleja contra Israel em Refidim
      b(9, { by: "moises", q: "Por isso disse Moisés a Josué: ", cast: [C("moises", -110, "point", { dy: 0.5, facing: 1 }), C("homem", -40, "stand", { dy: 0.5, id: "josue", facing: -1 }), C("homem", 60, "raise", { dy: 0.5, id: "amaleque", facing: -1 })], env: { storm: 0.25 } }), // "Escolhe homens e peleja; amanhã estarei no cume com a vara de Deus na mão"
      b(10, { cast: [C("moises", 20, "raise", { dy: 0.36, facing: 1 }), C("arao", -40, "stand", { dy: 0.4, id: "arao", facing: 1 }), C("homem", 80, "stand", { dy: 0.4, id: "hur", facing: -1 }), C("homem", -160, "raise", { dy: 0.56, id: "josue", facing: 1 }), C("homem", -240, "raise", { dy: 0.58, id: "amaleque", facing: 1 })], env: { storm: 0.35, glory: 0.4 } }), // Josué peleja; Moisés, Arão e Hur sobem ao cume do outeiro
      b(11, { cast: [C("moises", 20, "raise", { dy: 0.36, facing: 1 }), C("arao", -40, "stand", { dy: 0.4, facing: 1 }), C("homem", 80, "stand", { dy: 0.4, id: "hur", facing: -1 }), C("homem", -160, "raise", { dy: 0.56, id: "josue", facing: 1 })], env: { storm: 0.3, glory: 0.6 } }), // enquanto Moisés levanta a mão, Israel prevalece; ao abaixá-la, Amaleque
      b(12, { cast: [C("moises", 20, "raise", { dy: 0.36, facing: 1 }), C("arao", -30, "raise", { dy: 0.4, facing: 1 }), C("homem", 74, "raise", { dy: 0.4, id: "hur", facing: -1 })], props: [...OUTEIRO, { ...P("rock", 20, 0.5, undefined, 0.5), tag: "pedra-assento" }], env: { storm: 0.2, glory: 0.65 } }), // as mãos de Moisés pesam; Arão e Hur as sustentam firmes até o pôr do sol
      b(13, { cast: [C("homem", -60, "raise", { dy: 0.5, id: "josue", facing: 1 }), C("homem", 60, "lie", { dy: 0.52, id: "amaleque" }), C("homem", 140, "lie", { scale: 0.9, dy: 0.56, id: "amaleque2" })], env: { storm: 0.1, glory: 0.7 } }), // Josué desfaz Amaleque e a seu povo ao fio da espada
      b(14, { by: "deus", q: "Então disse o Senhor a Moisés: ", cast: [C("moises", -20, "write", { dy: 0.5, facing: 1 })], env: { glory: 0.65 } }), // "Escreve isto para memória num livro; riscarei a memória de Amaleque"
      b(15, { set: "altar", cast: [C("moises", -20, "raise", { dy: 0.5, facing: 1 })], props: ALTAR_BANDEIRA, env: { terrain: "mountain", glory: 0.75, fire: 0.3, night: 0.12 } }), // Moisés edifica um altar: "O SENHOR É MINHA BANDEIRA"
      b(16, { by: "moises", q: "E disse: ", env: { glory: 0.7 } }), // "haverá guerra do Senhor contra Amaleque de geração em geração"
    ],
  },

  // ------------------------------------------------------------------ Êx 18
  // Jetro chega ao monte de Deus com a família → o relato e o sacrifício → e o
  // sábio conselho dos juízes (maiorais de mil, cem, cinqüenta e dez).
  18: {
    start: { terrain: "mountain", night: 0.14, glory: 0.5, storm: 0, fire: 0, verdure: 0.3 },
    beats: [
      b(1, { set: "monte-deus", cast: [C("homem", 60, "stand", { dy: 0.5, id: "jetro", facing: -1 })], props: MONTE_TENDA, env: { terrain: "mountain", glory: 0.55, night: 0.12 } }), // Jetro ouve tudo o que Deus fizera a Moisés e a Israel
      b(2, { cast: [C("homem", 60, "stand", { dy: 0.5, id: "jetro", facing: -1 }), C("mulherComum", 130, "stand", { dy: 0.52, id: "zipora", facing: -1 })] }), // Jetro toma consigo Zípora, a mulher de Moisés
      b(3, { cast: [C("homem", 60, "stand", { dy: 0.5, id: "jetro", facing: -1 }), C("mulherComum", 130, "stand", { dy: 0.52, id: "zipora", facing: -1 }), C("homem", 200, "stand", { scale: 0.55, dy: 0.6, id: "gerson", facing: -1 })] }), // e seus dois filhos: Gérson ("peregrino em terra estranha")
      b(4, { cast: [C("homem", 60, "stand", { dy: 0.5, id: "jetro", facing: -1 }), C("homem", 210, "stand", { scale: 0.5, dy: 0.62, id: "eliezer", facing: -1 })] }), // e Eliézer ("o Deus de meu pai me livrou da espada de Faraó")
      b(5, { cast: [C("homem", 90, "walk", { dy: 0.5, id: "jetro", facing: -1 }), C("mulherComum", 160, "walk", { dy: 0.52, id: "zipora", facing: -1 }), C("moises", -60, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.6 } }), // Jetro vem a Moisés no deserto, ao monte de Deus
      b(6, { by: "homem", q: "Disse a Moisés: ", cast: [C("homem", 70, "point", { dy: 0.5, id: "jetro", facing: -1 }), C("moises", -50, "stand", { dy: 0.5, facing: 1 })] }), // "Eu, teu sogro Jetro, venho a ti, com tua mulher e teus dois filhos"
      b(7, { cast: [C("moises", -50, "bow", { dy: 0.5, facing: 1 }), C("homem", 40, "stand", { dy: 0.5, id: "jetro", facing: -1 })], env: { glory: 0.55 } }), // Moisés sai ao encontro, inclina-se, beija-o, e entram na tenda
      b(8, { cast: [C("moises", -40, "point", { dy: 0.5, facing: 1 }), C("homem", 40, "stand", { dy: 0.5, id: "jetro", facing: -1 })] }), // Moisés conta tudo o que o Senhor fizera por amor de Israel
      b(9, { cast: [C("homem", 30, "raise", { dy: 0.5, id: "jetro", facing: 1 }), C("moises", -50, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.6 } }), // Jetro alegra-se de todo o bem que o Senhor fizera a Israel
      b(10, { by: "homem", q: "E Jetro disse: ", cast: [C("homem", 30, "raise", { dy: 0.5, id: "jetro", facing: 1 }), C("moises", -50, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.65 } }), // "Bendito seja o Senhor, que vos livrou das mãos dos egípcios"
      b(11, { by: "homem" }), // "agora sei que o Senhor é maior que todos os deuses"
      b(12, { cast: [C("homem", -20, "stand", { dy: 0.5, id: "jetro", facing: 1 }), C("arao", 50, "stand", { dy: 0.5, facing: -1 }), C("anciao", 130, "stand", { dy: 0.52, facing: -1 })], props: [...MONTE_TENDA, { ...P("altar", -90, 1, 0.4, 0.42), tag: "altar-jetro" }], env: { glory: 0.6, fire: 0.2 } }), // Jetro oferece holocausto; Arão e os anciãos comem pão diante de Deus
      b(13, { set: "julgamento", cast: [C("moises", -90, "stand", { dy: 0.5, facing: 1 }), C("multidao", 20, "stand", { dy: 0.48 }), C("multidao", 130, "stand", { scale: 0.9, dy: 0.52, id: "povo2" })], props: MONTE_TENDA, env: { terrain: "mountain", glory: 0.45, night: 0.1 } }), // Moisés assenta-se para julgar; o povo em pé desde a manhã até à tarde
      b(14, { by: "homem", q: "disse: ", cast: [C("homem", -30, "point", { dy: 0.5, id: "jetro", facing: 1 }), C("moises", -110, "stand", { dy: 0.5, facing: 1 }), C("multidao", 60, "stand", { dy: 0.5 })] }), // Jetro: "Por que te assentas só, e todo o povo está em pé diante de ti?"
      b(15, { by: "moises", q: "Então disse Moisés a seu sogro: ", cast: [C("moises", -60, "point", { dy: 0.5, facing: 1 }), C("homem", 20, "stand", { dy: 0.5, id: "jetro", facing: 1 })] }), // "este povo vem a mim para consultar a Deus"
      b(16, { by: "moises" }), // "eu julgo entre um e outro e lhes declaro os estatutos de Deus"
      b(17, { by: "homem", q: "lhe disse: ", cast: [C("homem", 20, "point", { dy: 0.5, id: "jetro", facing: 1 }), C("moises", -60, "stand", { dy: 0.5, facing: 1 })] }), // o sogro: "Não é bom o que fazes"
      b(18, { by: "homem" }), // "desfalecerás; este negócio é mui difícil para ti; tu só não o podes fazer"
      b(19, { by: "homem" }), // "ouve minha voz: sê tu pelo povo diante de Deus, e leva as causas a Deus"
      b(20, { by: "homem" }), // "declara-lhes os estatutos e o caminho em que devem andar"
      b(21, { by: "homem" }), // "procura homens capazes, tementes a Deus... maiorais de mil, cem, cinqüenta e dez"
      b(22, { by: "homem" }), // "que julguem o povo; o negócio grave tragam a ti; assim te aliviarás da carga"
      b(23, { by: "homem" }), // "se isto fizeres, e Deus to mandar, poderás subsistir, e o povo irá em paz"
      b(24, { cast: [C("moises", -40, "stand", { dy: 0.5, facing: 1 }), C("homem", 30, "stand", { dy: 0.5, id: "jetro", facing: -1 })], env: { glory: 0.55 } }), // Moisés dá ouvidos à voz do sogro e faz tudo quanto dissera
      b(25, { cast: [C("moises", -90, "point", { dy: 0.5, facing: 1 }), C("homem", 0, "stand", { dy: 0.5, id: "chefe1", facing: -1 }), C("homem", 70, "stand", { dy: 0.52, id: "chefe2", facing: -1 }), C("multidao", 160, "stand", { scale: 0.9, dy: 0.5, id: "povo2" })], env: { glory: 0.5 } }), // Moisés escolhe homens capazes e os põe por cabeças sobre o povo
      b(26, { cast: [C("homem", -20, "stand", { dy: 0.5, id: "chefe1", facing: 1 }), C("multidao", 60, "stand", { dy: 0.5 }), C("moises", -110, "stand", { dy: 0.5, facing: 1 })] }), // eles julgam o povo; o negócio árduo trazem a Moisés
      b(27, { cast: [C("homem", 90, "walk", { dy: 0.5, id: "jetro", facing: -1 }), C("moises", -40, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.5, night: 0.14 } }), // Moisés despede o sogro, que se vai à sua terra
    ],
  },
};
