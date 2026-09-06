// ============================================================================
// APOCALIPSE 6–7 — roteiro do modo CENA VIVA (sets fixos).
//
// Ap 6 — OS SEIS PRIMEIROS SELOS: a sala do trono persiste (trono, Cordeiro
// com o livro, lâmpadas); a cada selo um ser vivente brada "Vem, e vê" e um
// CAVALEIRO cruza o palco (branco → vermelho → preto → amarelo, com trevas e
// tempestade crescendo). O 5º selo revela as almas sob o altar; o 6º selo é
// o terremoto cósmico — sol negro, lua sangue, estrelas caindo, todos fugindo.
// Ap 7 — OS SELADOS E A GRANDE MULTIDÃO: calmaria na terra (quatro anjos
// retêm os ventos), o anjo do oriente sela os 144 mil, e a visão sobe de
// volta ao trono: a multidão incontável de vestes brancas, com palmas,
// até o consolo final — as fontes vivas das águas e toda lágrima enxuta.
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
// A SALA DO TRONO — mesma geografia dos caps. 4–5 (continuidade da visão).
// (corredor de extras dx -100..-190 fica LIVRE na decoração fixa)
const THRONE_CORE: StagePropSpec[] = [
  P("throneOfGod", 0, 1.35, undefined, 0.1),      // o trono posto no céu (centro)
  P("star", -285, 0.7, undefined, 0.05),     // firmamento à esquerda
  P("star", 285, 0.75, undefined, 0.07),     // firmamento à direita
];

// as sete lâmpadas de fogo diante do trono (desde Ap 4:5) — arco raso
const SEVEN_LAMPS: StagePropSpec[] = [
  P("lampstand", -90, 0.85, 1, 0.3),
  P("lampstand", -60, 0.85, 1, 0.38),
  P("lampstand", -30, 0.85, 1, 0.34),
  P("lampstand", 0, 0.9, 1, 0.3),
  P("lampstand", 30, 0.85, 1, 0.34),
  P("lampstand", 60, 0.85, 1, 0.38),
  P("lampstand", 90, 0.85, 1, 0.3),
];

// o livro dos sete selos, na mão do Cordeiro (tomado em Ap 5:7)
const SCROLL_AT_LAMB = P("scroll", 30, 0.7, undefined, 0.5);

// palco-base do capítulo 6: trono + lâmpadas + livro do Cordeiro
const SEALS_STAGE: StagePropSpec[] = [...THRONE_CORE, ...SEVEN_LAMPS, SCROLL_AT_LAMB];

// o altar do 5º selo, na vaga dos extras (corredor -100..-190)
const ALTAR = P("altar", -140, 1.1, undefined, 0.22);

// estrelas do céu caindo sobre a terra (Ap 6:13)
const FALLING_STARS: StagePropSpec[] = [
  P("star", -178, 0.7, undefined, 0.15),
  P("star", 200, 0.6, undefined, 0.35),
  P("star", -300, 0.55, undefined, 0.45),
  P("star", 120, 0.5, undefined, 0.55),
];

// o céu que se retira "como um livro que se enrola" (Ap 6:14) — no corredor
const SKY_SCROLL = P("scroll", -140, 1.25, undefined, 0.1);

// cavernas e rochas das montanhas onde os reis se escondem (Ap 6:15)
const HIDING_ROCKS: StagePropSpec[] = [
  P("rock", -265, 1.15, undefined, 0.6),
  P("rock", 235, 1.05, undefined, 0.62),
  P("rock", 305, 0.9, undefined, 0.45),
];

// ------------------------------------------------------------------- elenco
// João, testemunha lateral (dy 0.62), sempre presente na visão.
const JOAO = (pose = "stand", dx = -75): CastPlacement =>
  C("joao", dx, pose, { dy: 0.62 });

// Os vinte e quatro anciãos (6 atores) em arco — id "anciao" é o porta-voz.
const ELDERS = (pose = "stand"): CastPlacement[] => [
  C("anciao", -235, pose, { dy: 0.42 }),
  C("anciao", -178, pose, { dy: 0.5, id: "anciao2" }),
  C("anciao", -120, pose, { dy: 0.56, id: "anciao3" }),
  C("anciao", 120, pose, { dy: 0.56, id: "anciao4" }),
  C("anciao", 178, pose, { dy: 0.5, id: "anciao5" }),
  C("anciao", 235, pose, { dy: 0.42, id: "anciao6" }),
];

// Os quatro seres viventes ao redor do trono — id "servivente" é o que brada.
const LIVING_ONES = (pose = "flyIdle", glow = 0.5): CastPlacement[] => [
  C("servivente", -55, pose, { dy: 0.26, glow }),
  C("servivente", -22, pose, { dy: 0.2, glow, id: "ser2" }),
  C("servivente", 22, pose, { dy: 0.2, glow, id: "ser3" }),
  C("servivente", 55, pose, { dy: 0.26, glow, id: "ser4" }),
];

// O Cordeiro no meio do trono, com o livro (glow máximo).
const LAMB = (dx = 0): CastPlacement =>
  C("cordeiro", dx, "stand", { dy: 0.4, glow: 1 });

// elenco-base da corte celestial no capítulo 6
const COURT = (): CastPlacement[] => [JOAO(), ...ELDERS(), ...LIVING_ONES(), LAMB()];

// O CAVALEIRO de cada selo cruza a frente do palco (dy 0.66, andando).
const RIDER = (palette: string, dx: number): CastPlacement =>
  C("cavaleiro", dx, "walk", { dy: 0.66, palette, facing: 1 });

// As almas sob o altar (5º selo) — id "homem" é a voz do clamor.
const SOULS = (pose1: string, pose2: string, pose3: string, glow = 0.45): CastPlacement[] => [
  C("homem", -140, pose1, { dy: 0.56, glow }),                  // porta-voz do clamor
  C("homem", -178, pose2, { dy: 0.5, glow, id: "alma2" }),
  C("homem", -102, pose3, { dy: 0.52, glow, id: "alma3" }),
];

// Os reis e grandes da terra escondendo-se nas rochas (6º selo).
const HIDING_KINGS: CastPlacement[] = [
  C("homem", -252, "bow", { dy: 0.52 }),                        // porta-voz: "Caí sobre nós"
  C("homem", 222, "bow", { dy: 0.56, id: "rei2" }),
  C("homem", 288, "kneel", { dy: 0.44, id: "rei3" }),
];

// ---------------------------------------------------------------- Ap 7: terra
// Os quatro cantos da terra: campo com árvores e o mar ao longe (v.1).
const EARTH: StagePropSpec[] = [
  P("tree", -285, 1.15, undefined, 0.1),
  P("tree", 262, 1.05, undefined, 0.12),
  P("tree", 60, 0.9, undefined, 0.06),
  P("river", 320, 1.1, undefined, 0.3),      // o mar ("nem sobre o mar")
  P("rock", -230, 0.75, undefined, 0.6),
  P("bush", 150, 0.9, undefined, 0.42),
  P("bush", -320, 0.9, undefined, 0.5),
  P("grass", -40, 1, undefined, 0.82),
  P("grass", 200, 1, undefined, 0.85),
  P("grass", -260, 0.9, undefined, 0.72),
];

// Quatro anjos nos quatro cantos (fundo-esq, fundo-dir, frente-esq, frente-dir).
const FOUR_WINDS = (pose = "flyIdle"): CastPlacement[] => [
  C("anjo", -300, pose, { dy: 0.2, glow: 0.45, id: "anjoNO" }),
  C("anjo", 300, pose, { dy: 0.2, glow: 0.45, id: "anjoNE" }),
  C("anjo", -255, pose, { dy: 0.7, glow: 0.45, id: "anjoSO" }),
  C("anjo", 255, pose, { dy: 0.7, glow: 0.45, id: "anjoSE" }),
];

// A sala do trono da GRANDE MULTIDÃO: trono + palmas (v.9) — a palma do
// versículo entra na vaga dos extras (corredor -100..-190).
const MULTITUDE_STAGE: StagePropSpec[] = [
  ...THRONE_CORE,
  P("palm", -252, 1.05, undefined, 0.3),
  P("palm", 252, 1.05, undefined, 0.32),
  P("palm", -140, 0.95, undefined, 0.2),     // a palma nas mãos (extra do verso)
];

// as fontes vivas das águas (Ap 7:17) — o rio diante do trono
const LIVING_WATERS = P("river", 0, 1.2, undefined, 0.55);

// A grande multidão em duas camadas, de vestes brancas (glow).
const MULTITUDE = (pose = "stand", glow = 0.5): CastPlacement[] => [
  C("multidao", -30, pose, { dy: 0.42, glow }),                 // porta-voz do clamor
  C("multidao", 42, pose, { dy: 0.54, glow, id: "multidao2" }),
];

// Anjos, ancião e ser vivente ao redor do trono na adoração (7:11-12).
const WORSHIP_RING = (pose = "bow"): CastPlacement[] => [
  C("anjo", -150, pose, { dy: 0.4, glow: 0.5 }),                // porta-voz do "Amém"
  C("anjo", 150, pose, { dy: 0.4, glow: 0.5, id: "anjo2" }),
  C("anciao", 210, pose, { dy: 0.45, id: "anciao2" }),
  C("servivente", 90, "flyIdle", { dy: 0.24, glow: 0.5 }),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Ap 6
  // OS SELOS: da glória da corte (Ap 5) às trevas do grande dia da ira —
  // arco de env: glória alta → tempestade e noite crescem selo a selo.
  6: {
    start: { terrain: "throne", night: 0.05, glory: 0.8 },
    beats: [
      // o Cordeiro abre o 1º selo; um dos quatro animais brada como trovão
      b(1, {
        by: "servivente", q: "voz de trovão: ",
        cast: COURT(),
        props: SEALS_STAGE,
        env: { glory: 0.7 },
      }),                                                                        // 1º selo; "Vem, e vê" como trovão
      // o CAVALO BRANCO cruza o palco: arco, coroa, vencedor
      b(2, { cast: [...COURT(), RIDER("branco", -230)], env: { glory: 0.6 } }),  // cavalo branco — arco, coroa, vencedor
      // 2º selo: o segundo ser vivente chama; o palco se esvazia do cavaleiro
      b(3, { by: "servivente", q: "dizendo: ", cast: COURT(), env: { storm: 0.12, glory: 0.5 } }), // 2º selo; segundo animal chama
      // o CAVALO VERMELHO tira a paz da terra — a tempestade sobe
      b(4, { cast: [...COURT(), RIDER("vermelho", -230)], env: { storm: 0.3 } }), // cavalo vermelho — grande espada
      // 3º selo: chamado e CAVALO PRETO no mesmo verso; a noite começa a subir
      b(5, {
        by: "servivente", q: "o terceiro animal: ",
        cast: [...COURT(), RIDER("preto", -230)],
        env: { night: 0.3 },
      }),                                                                        // 3º selo; cavalo preto com balança
      // a voz do meio dos quatro animais tabela a fome; o preto cruza o palco
      b(6, { by: "servivente", q: "que dizia: ", cast: [...COURT(), RIDER("preto", 150)], env: { night: 0.4 } }), // voz: trigo por um dinheiro
      // 4º selo: o quarto ser vivente chama; trevas e tempestade acumulam
      b(7, { by: "servivente", q: "que dizia: ", cast: COURT(), env: { storm: 0.35, night: 0.45 } }), // 4º selo; quarto animal chama
      // o CAVALO AMARELO: Morte, e o inferno o segue
      b(8, { cast: [...COURT(), RIDER("amarelo", -230)], env: { night: 0.5, storm: 0.4 } }), // cavalo amarelo — Morte e inferno
      // 5º SELO: o altar entra na vaga dos extras; as almas jazem debaixo dele
      b(9, {
        cast: [...COURT(), ...SOULS("kneel", "lie", "lie")],
        props: [...SEALS_STAGE, ALTAR],
        env: { storm: 0.15, night: 0.35, glory: 0.45 },
      }),                                                                        // 5º selo — almas sob o altar
      // o clamor das almas: "Até quando…?"
      b(10, { by: "homem", q: "dizendo: ", cast: [...COURT(), ...SOULS("raise", "kneel", "kneel")] }), // clamor: "Até quando não vingas?"
      // compridas vestes brancas (glow pleno); repousem ainda um pouco
      b(11, { cast: [...COURT(), ...SOULS("stand", "stand", "kneel", 1)], env: { glory: 0.55 } }), // vestes brancas; repousai um pouco
      // 6º SELO: TERREMOTO — sol negro como cilício, lua como sangue
      b(12, {
        cast: [JOAO("kneel"), ...ELDERS(), ...LIVING_ONES("flyIdle", 0.4), LAMB()],
        props: SEALS_STAGE,
        env: { storm: 0.8, night: 0.8, fire: 0.3, glory: 0.15 },
      }),                                                                        // terremoto; sol negro, lua sangue
      // as estrelas do céu caem como figos verdes
      b(13, { props: [...SEALS_STAGE, ...FALLING_STARS], env: { storm: 0.85, night: 0.82 } }), // estrelas caem como figos verdes
      // o céu retira-se como um livro que se enrola; montes e ilhas removidos
      b(14, { props: [...SEALS_STAGE, ...FALLING_STARS, SKY_SCROLL], env: { night: 0.85 } }), // o céu enrola-se como livro
      // a corte sai de cena: reis e grandes escondem-se nas cavernas e rochas
      b(15, {
        cast: [JOAO("stand"), LAMB(), ...HIDING_KINGS],
        props: [...SEALS_STAGE, SKY_SCROLL, ...HIDING_ROCKS],
        env: { storm: 0.85 },
      }),                                                                        // reis escondem-se nas cavernas
      // o grito aos montes: "Caí sobre nós…" — da ira do Cordeiro
      b(16, { by: "homem", q: "aos rochedos: ", env: { fire: 0.35 } }),          // "Caí sobre nós; escondei-nos"
      // clímax sombrio: o grande dia da sua ira — quem poderá subsistir?
      b(17, { env: { night: 0.9, storm: 0.9, glory: 0.05 } }),                   // o grande dia da ira; quem subsistirá?
    ],
  },

  // ------------------------------------------------------------------ Ap 7
  // OS SELADOS E A GRANDE MULTIDÃO: calmaria na terra (storm 0), selamento
  // dos 144 mil, e a glória sobe até o consolo pleno diante do trono.
  7: {
    start: { terrain: "field", night: 0.2, glory: 0.3, storm: 0 },
    beats: [
      // quatro anjos nos quatro cantos da terra, retendo os quatro ventos
      b(1, { cast: [JOAO("stand", -40), ...FOUR_WINDS()], props: EARTH }),       // quatro anjos retêm os ventos
      // outro anjo sobe do lado do sol nascente, com o selo do Deus vivo
      b(2, {
        cast: [JOAO("stand", -40), ...FOUR_WINDS(), C("anjo", 205, "flyIdle", { dy: 0.35, glow: 1 })],
        env: { glory: 0.45 },
      }),                                                                        // o anjo do oriente com o selo
      // a ordem do anjo: não danifiqueis, até selarmos os servos de Deus
      b(3, {
        by: "anjo", q: "Dizendo: ",
        cast: [JOAO("stand", -40), ...FOUR_WINDS(), C("anjo", 90, "raise", { dy: 0.4, glow: 1 })],
      }),                                                                        // "Não danifiqueis… até selarmos"
      // os 144 mil selados: a multidão de Israel surge ao fundo
      b(4, {
        cast: [JOAO("stand", -40), ...FOUR_WINDS(), C("anjo", 90, "point", { dy: 0.4, glow: 0.8 }), C("multidao", -20, "stand", { dy: 0.12, glow: 0.35 })],
        env: { glory: 0.5 },
      }),                                                                        // 144 mil selados de Israel
      b(5),                                                                      // Judá, Rúben, Gade — doze mil
      b(6, { env: { glory: 0.55 } }),                                            // Aser, Naftali, Manassés
      b(7),                                                                      // Simeão, Levi, Issacar
      b(8, { env: { glory: 0.6 } }),                                             // Zebulom, José, Benjamim
      // A GRANDE MULTIDÃO: fade para o trono; vestes brancas e palmas
      b(9, {
        set: "granDeMultidao",
        env: { terrain: "throne", glory: 0.8, night: 0, storm: 0 },
        cast: [JOAO(), LAMB(28), ...MULTITUDE()],
        props: MULTITUDE_STAGE,
      }),                                                                        // multidão incontável, com palmas
      // o clamor da multidão: "Salvação ao nosso Deus… e ao Cordeiro"
      b(10, { by: "multidao", q: "dizendo: ", cast: [JOAO("raise"), LAMB(28), ...MULTITUDE("raise", 0.7)], env: { glory: 0.85 } }), // "Salvação ao nosso Deus"
      // todos os anjos, anciãos e animais prostram-se sobre seus rostos
      b(11, { cast: [JOAO("kneel"), LAMB(28), ...MULTITUDE("stand", 0.7), ...WORSHIP_RING("bow"), C("anciao", -210, "bow", { dy: 0.45 })] }), // anjos e anciãos prostrados
      // o louvor sétuplo dos anjos: "Amém. Louvor, e glória…"
      b(12, { by: "anjo", q: "Dizendo: ", env: { glory: 0.9 } }),                // "Amém. Louvor, glória… Amém"
      // um dos anciãos deixa o arco e vem perguntar a João
      b(13, {
        by: "anciao", q: "dizendo: ",
        cast: [JOAO("stand"), LAMB(28), ...MULTITUDE("stand", 0.7), ...WORSHIP_RING("stand"), C("anciao", -120, "point", { dy: 0.58 })],
      }),                                                                        // o ancião: "quem são estes?"
      // João devolve a pergunta; o ancião revela: vieram da grande tribulação
      b(14, { by: "anciao", q: "E ele disse-me: " }),                            // "vieram da grande tribulação"
      // por isso estão diante do trono e o servem dia e noite
      b(15, { by: "anciao", env: { glory: 0.92 } }),                             // servem dia e noite no templo
      // nunca mais fome, nem sede, nem sol
      b(16, { by: "anciao" }),                                                   // nunca mais fome, sede, nem calma
      // consolo final: o Cordeiro os apascenta; as fontes vivas das águas
      b(17, {
        by: "anciao",
        env: { glory: 1 },
        cast: [JOAO("stand"), LAMB(0), ...MULTITUDE("raise", 0.8), ...WORSHIP_RING("stand"), C("anciao", -120, "stand", { dy: 0.58 })],
        props: [...MULTITUDE_STAGE, LIVING_WATERS],
      }),                                                                        // fontes vivas; toda lágrima enxuta
    ],
  },
};
