// ============================================================================
// APOCALIPSE — roteiro do modo CENA VIVA v2 (sets fixos), caps. 1–3 (piloto).
//
// Cada beat = 1 versículo. O texto vem da Bíblia em runtime. `by` = quem fala
// (balão); `q` = onde começa a citação no versículo. `set` = troca de cenário
// (fade). `cast`/`props` = marcas no palco (dx relativo ao CENTRO do set,
// dy = profundidade 0..1). O jogador anda livre; o versículo avança por botão.
// Ao mudar o beat, os atores ANDAM até as novas marcas.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// sete castiçais de ouro em arco, centrados
const LAMPS: StagePropSpec[] = [-96, -64, -34, 0, 34, 64, 96].map((dx, i) =>
  P("lampstand", dx, i === 3 ? 1.25 : 1, 1, i % 2 ? 0.18 : 0.3));

// a ilha de Patmos: palmeiras, rochas, arbustos e capim (paisagem cheia)
const ISLAND: StagePropSpec[] = [
  P("palm", -270, 1.3, undefined, 0.12),
  P("palm", -228, 0.95, undefined, 0.55),
  P("palm", -120, 0.75, undefined, 0.2),
  P("palm", 130, 0.7, undefined, 0.14),
  P("palm", 236, 1.2, undefined, 0.1),
  P("palm", 300, 1.0, undefined, 0.4),
  P("rock", -160, 1.1, undefined, 0.75),
  P("rock", 44, 0.6, undefined, 0.25),
  P("rock", 150, 0.8, undefined, 0.8),
  P("rock", 320, 1.3, undefined, 0.65),
  P("rock", -320, 0.9, undefined, 0.5),
  P("bush", -196, 1, undefined, 0.42),
  P("bush", 270, 0.9, undefined, 0.55),
  P("grass", -64, 1, undefined, 0.8),
  P("grass", 66, 1.1, undefined, 0.7),
  P("grass", 204, 1, undefined, 0.85),
  P("grass", -288, 1, undefined, 0.72),
  P("grass", -30, 0.9, undefined, 0.35),
];

// estação de carta às igrejas: Cristo dita, João escreve, o anjo da igreja ouve
const CHURCH = (angelGlow = 0.4): CastPlacement[] => [
  C("joao", -52, "write", { dy: 0.55 }),
  C("cristo", 0, "stand", { glow: 1, dy: 0.42 }),
  C("anjo", 52, "stand", { glow: angelGlow, dy: 0.55 }),
];
const CHURCH_PROPS = (extra: StagePropSpec[] = []): StagePropSpec[] => [
  P("church", 150, 1.15, undefined, 0.06),   // a igreja da cidade (construção detalhada)
  P("lampstand", 92, 1.1, 1, 0.25),
  P("tower", -210, 1, undefined, 0.1),
  P("palm", 250, 0.9, undefined, 0.35),
  // vida de cidade do 1º século: poço, mercado, ânforas, caixotes e verde
  P("well", -120, 1, undefined, 0.14),
  P("stall", -300, 1, undefined, 0.2),
  P("amphora", 108, 1, undefined, 0.5),
  P("amphora", -178, 0.85, undefined, 0.55),
  P("crate", -256, 1, undefined, 0.5),
  P("crate", -240, 0.8, undefined, 0.64),
  P("tree", -60, 0.85, undefined, 0.06),
  P("bush", 212, 1, undefined, 0.3),
  P("grass", -44, 1, undefined, 0.85),
  P("grass", 132, 1, undefined, 0.8),
  P("grass", 298, 0.9, undefined, 0.6),
  ...extra,
];

export const REVELATION_STAGE: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Ap 1
  1: {
    start: { terrain: "patmos", night: 0.55, glory: 0 },
    beats: [
      b(1, { cast: [C("joao", -20, "stand", { dy: 0.5 })], props: ISLAND }),        // Revelação de Jesus Cristo…
      b(2, { cast: [C("joao", -6, "stand", { dy: 0.45 })] }),                       // o qual testificou…
      b(3, { env: { glory: 0.12 } }),                                               // Bem-aventurado o que lê…
      b(4, { cast: [C("joao", -10, "write", { dy: 0.5 })] }),                       // João, às sete igrejas…
      b(5),                                                                          // e da parte de Jesus Cristo…
      b(6, { env: { glory: 0.2 } }),                                                 // e nos fez reis e sacerdotes…
      b(7, { env: { glory: 0.32 }, cast: [C("joao", 14, "raise", { dy: 0.45 })] }), // Eis que vem com as nuvens…
      b(8, { by: "cristo", env: { glory: 0.45 } }),                                  // (voz do céu) Eu sou o Alfa e o Ômega…
      // João em PRIMEIRA PESSOA (protagonista): fala em balão sobre ele.
      // Narração de acontecimentos continua na barra do narrador.
      b(9, { by: "joao", cast: [C("joao", -12, "stand", { dy: 0.5 })] }),            // "Eu, João…" (apresenta-se)
      b(10, { by: "joao", env: { night: 0.4, glory: 0.5 } }),                        // "Eu fui arrebatado no Espírito…"
      b(11, { by: "cristo", q: "Que dizia: " }),                                     // (voz) …escreve num livro
      b(12, { by: "joao", set: "visao", props: [...ISLAND, ...LAMPS], env: { glory: 0.68 }, cast: [C("joao", -110, "stand", { dy: 0.55 })] }), // "E virei-me para ver quem falava comigo…"
      b(13, { cast: [C("joao", -80, "stand", { dy: 0.55 }), C("cristo", 0, "stand", { glow: 1, dy: 0.35 })] }),     // no meio, o Filho do homem
      b(14, { env: { glory: 0.78 } }),                                               // cabeça e cabelos brancos…
      b(15, { env: { glory: 0.86 } }),                                               // pés como latão… muitas águas
      b(16, { env: { glory: 0.96 }, props: [...ISLAND, ...LAMPS, P("star", -16, 0.6, undefined, 0.1), P("star", 18, 0.7, undefined, 0.08), P("star", 0, 0.5, undefined, 0.16)] }), // estrelas… espada… sol
      b(17, { by: "cristo", q: "dizendo-me: ", cast: [C("joao", -22, "lie", { dy: 0.5 }), C("cristo", 0, "stand", { glow: 1, dy: 0.35 })] }), // "caí a seus pés como morto" → fala: Não temas
      b(18, { by: "cristo" }),                                                       // o que vivo e fui morto…
      b(19, { by: "cristo", cast: [C("joao", -26, "kneel", { dy: 0.5 }), C("cristo", 0, "stand", { glow: 1, dy: 0.35 })] }), // Escreve…
      b(20, { by: "cristo" }),                                                       // o mistério das sete estrelas…
    ],
  },

  // ------------------------------------------------------------------ Ap 2
  2: {
    start: { terrain: "city", night: 0.25, glory: 0.35 },
    beats: [
      // ÉFESO
      b(1, { by: "cristo", cast: CHURCH(), props: CHURCH_PROPS() }),
      b(2, { by: "cristo" }),
      b(3, { by: "cristo" }),
      b(4, { by: "cristo", env: { night: 0.38 } }),                                  // deixaste o teu primeiro amor
      b(5, { by: "cristo", env: { storm: 0.2 } }),
      b(6, { by: "cristo", env: { storm: 0 } }),
      b(7, { by: "cristo", env: { glory: 0.5 }, props: CHURCH_PROPS([P("tree", -120, 1.2, undefined, 0.2)]) }), // árvore da vida
      // ESMIRNA
      b(8, { by: "cristo", set: "esmirna", cast: CHURCH(0.5), env: { night: 0.5, glory: 0.3, storm: 0 }, props: CHURCH_PROPS() }),
      b(9, { by: "cristo" }),
      b(10, { by: "cristo", env: { night: 0.6 } }),                                  // sê fiel até a morte… coroa
      b(11, { by: "cristo", env: { glory: 0.45 } }),
      // PÉRGAMO
      b(12, { by: "cristo", set: "pergamo", cast: CHURCH(), env: { night: 0.3, storm: 0.15, glory: 0.3 }, props: CHURCH_PROPS([P("tower", -140, 1.3, undefined, 0.1)]) }),
      b(13, { by: "cristo" }),
      b(14, { by: "cristo", env: { storm: 0.3 } }),
      b(15, { by: "cristo" }),
      b(16, { by: "cristo", env: { storm: 0.45 } }),                                 // espada da minha boca
      b(17, { by: "cristo", env: { storm: 0, glory: 0.5 } }),                        // maná escondido… pedra branca
      // TIATIRA
      b(18, { by: "cristo", set: "tiatira", cast: CHURCH(), env: { night: 0.2, fire: 0.15, glory: 0.4, storm: 0 }, props: CHURCH_PROPS() }),
      b(19, { by: "cristo" }),
      b(20, { by: "cristo", env: { night: 0.35 } }),
      b(21, { by: "cristo" }),
      b(22, { by: "cristo", env: { storm: 0.25 } }),
      b(23, { by: "cristo", env: { storm: 0.4 } }),
      b(24, { by: "cristo", env: { storm: 0.1 } }),
      b(25, { by: "cristo", env: { storm: 0, glory: 0.5 } }),
      b(26, { by: "cristo" }),
      b(27, { by: "cristo" }),
      b(28, { by: "cristo", env: { glory: 0.6 }, props: CHURCH_PROPS([P("star", -110, 0.8, undefined, 0.1)]) }), // estrela da manhã
      b(29, { by: "cristo" }),
    ],
  },

  // ------------------------------------------------------------------ Ap 3
  3: {
    start: { terrain: "city", night: 0.55, glory: 0.2 },
    beats: [
      // SARDES (nome de que vive, e está morta — penumbra)
      b(1, { by: "cristo", cast: CHURCH(0.2), props: CHURCH_PROPS() }),
      b(2, { by: "cristo" }),
      b(3, { by: "cristo", env: { storm: 0.2 } }),                                   // virei como ladrão
      b(4, { by: "cristo", env: { storm: 0, glory: 0.35 } }),                        // andarão comigo de branco
      b(5, { by: "cristo", env: { glory: 0.5 } }),                                   // vestes brancas… livro da vida
      b(6, { by: "cristo" }),
      // FILADÉLFIA (a porta aberta — luz)
      b(7, { by: "cristo", set: "filadelfia", cast: CHURCH(0.6), env: { night: 0.2, glory: 0.55, storm: 0 }, props: CHURCH_PROPS([P("door", -130, 1.2, undefined, 0.25)]) }),
      b(8, { by: "cristo" }),                                                        // porta aberta diante de ti
      b(9, { by: "cristo" }),
      b(10, { by: "cristo" }),
      b(11, { by: "cristo", env: { glory: 0.7 } }),                                  // venho sem demora… coroa
      b(12, { by: "cristo", props: CHURCH_PROPS([P("door", -130, 1.2, undefined, 0.25), P("tower", -170, 1.5, undefined, 0.08)]) }), // coluna no templo… nova Jerusalém
      b(13, { by: "cristo" }),
      // LAODICÉIA (morna — entardecer; termina com a porta e a ceia)
      b(14, { by: "cristo", set: "laodiceia", cast: CHURCH(0.3), env: { night: 0.35, glory: 0.3 }, props: CHURCH_PROPS() }),
      b(15, { by: "cristo" }),
      b(16, { by: "cristo", env: { night: 0.45 } }),
      b(17, { by: "cristo" }),
      b(18, { by: "cristo", env: { glory: 0.4 } }),                                  // ouro provado no fogo…
      b(19, { by: "cristo" }),
      b(20, { by: "cristo", env: { glory: 0.55 }, cast: [C("joao", -52, "write", { dy: 0.55 }), C("anjo", 44, "stand", { glow: 0.3, dy: 0.55 }), C("cristo", 96, "point", { glow: 1, dy: 0.4, facing: 1 })], props: CHURCH_PROPS([P("door", 132, 1.25, undefined, 0.3)]) }), // estou à porta e bato
      b(21, { by: "cristo", env: { glory: 0.75 } }),                                 // assentar comigo no meu trono
      b(22, { by: "cristo" }),
    ],
  },
};

/** Capítulos de Apocalipse já disponíveis no modo cena viva. */
export const REVELATION_STAGE_CHAPTERS = Object.keys(REVELATION_STAGE).map(Number);
