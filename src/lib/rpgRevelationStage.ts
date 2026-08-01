// ============================================================================
// APOCALIPSE — roteiro do modo CENA VIVA (palco andável), caps. 1–3 (piloto).
//
// Cada beat = 1 versículo. O texto vem da Bíblia em runtime (nunca é digitado
// aqui). `by` diz quem fala (balão); `q` marca onde começa a citação dentro do
// versículo (o resto fica com o narrador). Sem `by` = narração pura, avança
// andando até o marcador. `step` = distância andada até o beat.
//
// Elenco: hero (jogador, testemunha) anda livre; João é NPC ao lado.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

// helpers compactos
const C = (role: CastPlacement["role"], dx: number, pose?: CastPlacement["pose"], extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number): StagePropSpec => ({ kind, dx, scale, ...(fire != null ? { fire } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// sete castiçais de ouro em arco
const lampstands = (dx0: number): StagePropSpec[] =>
  [0, 34, 66, 96, 126, 158, 192].map((off, i) => P("lampstand", dx0 + off, i === 3 ? 1.25 : 1, 1));

// estação de igreja (carta): castiçal da igreja + cidade; Cristo dita, João escreve, o anjo da igreja ouve
const church = (angelGlow = 0.4): CastPlacement[] => [
  C("joao", 6, "write"),
  C("cristo", 58, "stand", { glow: 1 }),
  C("anjo", 104, "stand", { glow: angelGlow }),
];

export const REVELATION_STAGE: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Ap 1
  1: {
    start: { terrain: "patmos", night: 0.55, glory: 0 },
    beats: [
      b(1, { cast: [C("joao", -34, "stand")] }),                                  // Revelação de Jesus Cristo…
      b(2),                                                                        // o qual testificou…
      b(3, { env: { glory: 0.12 } }),                                              // Bem-aventurado o que lê…
      b(4, { cast: [C("joao", -30, "write")] }),                                   // João, às sete igrejas…
      b(5),                                                                        // e da parte de Jesus Cristo…
      b(6, { env: { glory: 0.2 } }),                                               // e nos fez reis e sacerdotes…
      b(7, { env: { glory: 0.32 }, step: 100 }),                                   // Eis que vem com as nuvens…
      b(8, { by: "cristo", env: { glory: 0.45 } }),                                // (voz) Eu sou o Alfa e o Ômega…
      b(9, { cast: [C("joao", -30, "stand")] }),                                   // Eu, João… em Patmos
      b(10, { env: { night: 0.4, glory: 0.5 } }),                                  // arrebatado no Espírito… voz de trombeta
      b(11, { by: "cristo", q: "Que dizia: " }),                                   // (voz) Eu sou o Alfa… escreve num livro
      b(12, { step: 150, props: lampstands(-10), env: { glory: 0.68 }, cast: [C("joao", -48, "stand")] }), // vi sete castiçais
      b(13, { step: 44, cast: [C("joao", -48, "stand"), C("cristo", 86, "stand", { glow: 1 })] }),          // no meio, o Filho do homem
      b(14, { step: 26, env: { glory: 0.78 } }),                                   // cabeça e cabelos brancos…
      b(15, { step: 26, env: { glory: 0.86 } }),                                   // pés como latão… voz de muitas águas
      b(16, { step: 26, env: { glory: 0.96 }, props: [P("star", 96, 0.7), P("star", 116, 0.55), P("star", 78, 0.55)] }), // sete estrelas… espada… rosto como o sol
      b(17, { by: "cristo", q: "dizendo-me: ", cast: [C("joao", 52, "lie"), C("cristo", 86, "stand", { glow: 1 })] }),   // caí como morto… Não temas
      b(18, { by: "cristo" }),                                                     // o que vivo e fui morto…
      b(19, { by: "cristo", cast: [C("joao", 52, "kneel"), C("cristo", 86, "stand", { glow: 1 })] }),                    // Escreve as coisas que tens visto…
      b(20, { by: "cristo" }),                                                     // o mistério das sete estrelas…
    ],
  },

  // ------------------------------------------------------------------ Ap 2
  2: {
    start: { terrain: "city", night: 0.25, glory: 0.35 },
    beats: [
      // ÉFESO
      b(1, { by: "cristo", step: 0, cast: church(), props: [P("lampstand", 132, 1.1, 1), P("tower", 176, 1)] }),
      b(2, { by: "cristo" }),
      b(3, { by: "cristo" }),
      b(4, { by: "cristo", env: { night: 0.38 } }),                                // deixaste o teu primeiro amor
      b(5, { by: "cristo", env: { storm: 0.2 } }),
      b(6, { by: "cristo", env: { storm: 0 } }),
      b(7, { by: "cristo", env: { glory: 0.5 }, props: [P("tree", 210, 1.2)] }),   // árvore da vida
      // ESMIRNA
      b(8, { by: "cristo", step: 150, cast: church(0.5), env: { night: 0.5, glory: 0.3 }, props: [P("lampstand", 132, 1.1, 1)] }),
      b(9, { by: "cristo" }),
      b(10, { by: "cristo", env: { night: 0.6 } }),                                // sê fiel até a morte… coroa da vida
      b(11, { by: "cristo", env: { glory: 0.45 } }),
      // PÉRGAMO
      b(12, { by: "cristo", step: 150, cast: church(), env: { night: 0.3, storm: 0.15, glory: 0.3 }, props: [P("lampstand", 132, 1.1, 1), P("tower", 180, 1.2)] }),
      b(13, { by: "cristo" }),
      b(14, { by: "cristo", env: { storm: 0.3 } }),
      b(15, { by: "cristo" }),
      b(16, { by: "cristo", env: { storm: 0.45 } }),                               // batalharei com a espada da minha boca
      b(17, { by: "cristo", env: { storm: 0, glory: 0.5 } }),                      // maná escondido… pedra branca
      // TIATIRA
      b(18, { by: "cristo", step: 150, cast: church(), env: { night: 0.2, fire: 0.15, glory: 0.4 }, props: [P("lampstand", 132, 1.1, 1)] }),
      b(19, { by: "cristo" }),
      b(20, { by: "cristo", env: { night: 0.35 } }),
      b(21, { by: "cristo" }),
      b(22, { by: "cristo", env: { storm: 0.25 } }),
      b(23, { by: "cristo", env: { storm: 0.4 } }),
      b(24, { by: "cristo", env: { storm: 0.1 } }),
      b(25, { by: "cristo", env: { storm: 0, glory: 0.5 } }),
      b(26, { by: "cristo" }),
      b(27, { by: "cristo" }),
      b(28, { by: "cristo", env: { glory: 0.6 }, props: [P("lampstand", 132, 1.1, 1), P("star", 168, 0.8)] }), // estrela da manhã
      b(29, { by: "cristo" }),
    ],
  },

  // ------------------------------------------------------------------ Ap 3
  3: {
    start: { terrain: "city", night: 0.55, glory: 0.2 },
    beats: [
      // SARDES (igreja com "nome de que vive, e está morta" — penumbra)
      b(1, { by: "cristo", step: 0, cast: church(0.2), props: [P("lampstand", 132, 1.1, 0.3), P("tower", 176, 1)] }),
      b(2, { by: "cristo" }),
      b(3, { by: "cristo", env: { storm: 0.2 } }),                                 // virei como ladrão
      b(4, { by: "cristo", env: { storm: 0, glory: 0.35 } }),                      // andarão comigo de branco
      b(5, { by: "cristo", env: { glory: 0.5 } }),                                 // vestes brancas… livro da vida
      b(6, { by: "cristo" }),
      // FILADÉLFIA (a porta aberta — luz)
      b(7, { by: "cristo", step: 150, cast: church(0.6), env: { night: 0.2, glory: 0.55 }, props: [P("lampstand", 132, 1.1, 1), P("door", 186, 1.2)] }),
      b(8, { by: "cristo" }),                                                      // pus diante de ti uma porta aberta
      b(9, { by: "cristo" }),
      b(10, { by: "cristo" }),
      b(11, { by: "cristo", env: { glory: 0.7 } }),                                // venho sem demora… tua coroa
      b(12, { by: "cristo", props: [P("lampstand", 132, 1.1, 1), P("door", 186, 1.2), P("tower", 224, 1.4)] }), // coluna no templo… nova Jerusalém
      b(13, { by: "cristo" }),
      // LAODICÉIA (morna — entardecer; termina com a porta e a ceia)
      b(14, { by: "cristo", step: 150, cast: church(0.3), env: { night: 0.35, glory: 0.3 }, props: [P("lampstand", 132, 1.1, 0.6)] }),
      b(15, { by: "cristo" }),
      b(16, { by: "cristo", env: { night: 0.45 } }),
      b(17, { by: "cristo" }),
      b(18, { by: "cristo", env: { glory: 0.4 } }),                                // ouro provado no fogo… roupas brancas
      b(19, { by: "cristo" }),
      b(20, { by: "cristo", cast: [C("joao", 6, "write"), C("cristo", 150, "point", { glow: 1, facing: 1 }), C("anjo", 96, "stand", { glow: 0.3 })], props: [P("door", 186, 1.25)], env: { glory: 0.55 } }), // estou à porta e bato
      b(21, { by: "cristo", env: { glory: 0.75 } }),                               // assentar-se comigo no meu trono
      b(22, { by: "cristo" }),
    ],
  },
};

/** Capítulos de Apocalipse já disponíveis no modo cena viva. */
export const REVELATION_STAGE_CHAPTERS = Object.keys(REVELATION_STAGE).map(Number);
