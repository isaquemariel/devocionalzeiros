// ============================================================================
// APOCALIPSE 4–5 — roteiro do modo CENA VIVA (sets fixos).
//
// Ap 4 — A SALA DO TRONO: a porta aberta no céu, o trono, o arco celeste,
// os vinte e quatro anciãos, as sete lâmpadas, o mar de vidro e os quatro
// seres viventes — culminando na adoração "Digno és, Senhor".
// Ap 5 — O LIVRO E O CORDEIRO: o livro selado, o anjo forte, o choro de
// João, o consolo do ancião e a aparição do Cordeiro — o momento central
// do livro — até toda criatura adorar.
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
// O TRONO no centro-fundo, estrelas do firmamento nas bordas.
// (corredor de extras dx -100..-190 fica LIVRE na decoração fixa)
const THRONE_CORE: StagePropSpec[] = [
  P("throne", 0, 1.35, undefined, 0.1),      // o trono posto no céu (centro)
  P("star", -285, 0.7, undefined, 0.05),     // firmamento à esquerda
  P("star", 285, 0.75, undefined, 0.07),     // firmamento à direita
];

// as sete lâmpadas de fogo diante do trono (Ap 4:5) — arco raso
const SEVEN_LAMPS: StagePropSpec[] = [
  P("lampstand", -90, 0.85, 1, 0.3),
  P("lampstand", -60, 0.85, 1, 0.38),
  P("lampstand", -30, 0.85, 1, 0.34),
  P("lampstand", 0, 0.9, 1, 0.3),
  P("lampstand", 30, 0.85, 1, 0.34),
  P("lampstand", 60, 0.85, 1, 0.38),
  P("lampstand", 90, 0.85, 1, 0.3),
];

// o mar de vidro, semelhante ao cristal, diante do trono (Ap 4:6)
const GLASS_SEA = P("river", 0, 1.4, undefined, 0.6);

// o livro selado com sete selos, na destra do que está no trono (Ap 5:1)
const SCROLL_AT_THRONE = P("scroll", 45, 0.8, undefined, 0.16);
// o livro já na mão do Cordeiro (Ap 5:7 em diante)
const SCROLL_AT_LAMB = P("scroll", 30, 0.7, undefined, 0.5);

// salvas de ouro cheias de incenso — as orações dos santos (Ap 5:8)
const INCENSE_BOWLS: StagePropSpec[] = [
  P("bowl", -150, 0.7, undefined, 0.52),
  P("bowl", 150, 0.7, undefined, 0.52),
];

// ------------------------------------------------------------------- elenco
// João, testemunha lateral (dy 0.6), sempre presente na visão.
const JOAO = (pose = "stand", dx = -75): CastPlacement =>
  C("joao", dx, pose, { dy: 0.62 });

// Os vinte e quatro anciãos (representados por 6 atores) em arco ao redor
// do trono. O primeiro guarda o id "anciao" para os balões (Ap 4:11; 5:5).
const ELDERS = (pose = "stand"): CastPlacement[] => [
  C("anciao", -235, pose, { dy: 0.42 }),                    // id default "anciao" — porta-voz
  C("anciao", -178, pose, { dy: 0.5, id: "anciao2" }),
  C("anciao", -120, pose, { dy: 0.56, id: "anciao3" }),
  C("anciao", 120, pose, { dy: 0.56, id: "anciao4" }),
  C("anciao", 178, pose, { dy: 0.5, id: "anciao5" }),
  C("anciao", 235, pose, { dy: 0.42, id: "anciao6" }),
];

// Os quatro seres viventes (leão, bezerro, homem, águia), cheios de olhos,
// flutuando no meio e ao redor do trono. O primeiro guarda o id "servivente".
// O papel `servivente` NÃO lê pose: pedir-lhe "bow" em Ap 5:8-10 ("prostraram-se
// diante do Cordeiro") prometia um gesto que o desenho nunca fez. Quem carrega a
// prostração no quadro são os ANCIÃOS, que são figuras humanas e se curvam de
// verdade; os viventes ficam no seu voo, que é como o texto os mostra.
const LIVING_ONES = (pose = "flyIdle", glow = 0.5): CastPlacement[] => [
  C("servivente", -55, pose, { dy: 0.26, glow }),           // id default "servivente" — porta-voz
  C("servivente", -22, pose, { dy: 0.2, glow, id: "ser2" }),
  C("servivente", 22, pose, { dy: 0.2, glow, id: "ser3" }),
  C("servivente", 55, pose, { dy: 0.26, glow, id: "ser4" }),
];

// O Cordeiro, como havendo sido morto, no meio do trono (Ap 5:6) —
// o momento central do livro: dx 0, glow máximo.
const LAMB = (pose = "stand"): CastPlacement =>
  C("cordeiro", 0, pose, { dy: 0.4, glow: 1 });

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Ap 4
  // A SALA DO TRONO: da porta aberta (mistério) à glória plena (adoração).
  4: {
    start: { terrain: "throne", night: 0.15, glory: 0.5 },
    beats: [
      // a porta aberta no céu, na vaga dos extras; a voz como de trombeta chama
      b(1, {
        by: "cristo", q: "disse: ",
        cast: [JOAO("stand", -30)],
        props: [...THRONE_CORE.slice(1), P("door", -140, 1.2, undefined, 0.2)],
      }),                                                                         // porta aberta no céu; "Sobe aqui"
      // arrebatado em espírito: fade para a sala do trono; o trono aparece
      b(2, {
        set: "salaDoTrono",
        env: { night: 0, glory: 0.65 },
        cast: [JOAO("stand", -75)],
        props: THRONE_CORE,
      }),                                                                         // o trono posto no céu
      b(3, { env: { glory: 0.75 } }),                                             // jaspe, sardônica e o arco celeste
      // os vinte e quatro anciãos, de vestes brancas, em arco ao redor
      b(4, { cast: [JOAO(), ...ELDERS()] }),                                      // vinte e quatro anciãos com coroas
      // relâmpagos, trovões e vozes; as sete lâmpadas de fogo ardem
      b(5, { env: { storm: 0.4 }, props: [...THRONE_CORE, ...SEVEN_LAMPS] }),     // relâmpagos, trovões; sete lâmpadas
      // o mar de vidro à frente; os quatro seres viventes ao redor do trono
      b(6, {
        env: { storm: 0.15 },
        cast: [JOAO(), ...ELDERS(), ...LIVING_ONES()],
        props: [...THRONE_CORE, ...SEVEN_LAMPS, GLASS_SEA],
      }),                                                                         // mar de vidro; quatro animais
      b(7, { env: { glory: 0.8 } }),                                              // leão, bezerro, homem, águia
      // não descansam dia e noite: "Santo, Santo, Santo"
      b(8, { by: "servivente", q: "dizendo: ", env: { glory: 0.85, storm: 0 } }), // seis asas; Santo, Santo, Santo
      // os seres dão glória ao que vive para todo o sempre
      b(9, { env: { glory: 0.9 }, cast: [JOAO(), ...ELDERS(), ...LIVING_ONES("flyIdle", 0.7)] }), // glória, honra e ações de graças
      // os anciãos se prostram e lançam suas coroas diante do trono
      b(10, { cast: [JOAO("kneel"), ...ELDERS("bow"), ...LIVING_ONES("flyIdle", 0.7)] }),         // anciãos prostrados lançam coroas
      // o cântico dos anciãos — glória plena
      b(11, { by: "anciao", env: { glory: 1 } }),                                 // "Digno és, Senhor" — tu criaste tudo
    ],
  },

  // ------------------------------------------------------------------ Ap 5
  // O LIVRO E O CORDEIRO: do impasse (ninguém é digno) e do choro de João
  // à aparição do Cordeiro e à adoração de toda criatura.
  5: {
    start: { terrain: "throne", night: 0, glory: 0.85 },
    beats: [
      // o livro selado com sete selos, na destra do que está no trono
      b(1, {
        cast: [JOAO(), ...ELDERS(), ...LIVING_ONES()],
        props: [...THRONE_CORE, ...SEVEN_LAMPS, GLASS_SEA, SCROLL_AT_THRONE],
      }),                                                                         // livro selado com sete selos
      // o anjo forte brada a pergunta que ninguém responde
      b(2, {
        by: "anjo", q: "bradando com grande voz: ",
        cast: [JOAO(), ...ELDERS(), ...LIVING_ONES(), C("anjo", 85, "raise", { dy: 0.32, glow: 0.7 })],
      }),                                                                         // anjo forte: quem é digno?
      // silêncio no céu e na terra — a luz esmorece
      b(3, { env: { glory: 0.6, night: 0.12 } }),                                 // ninguém podia abrir o livro
      // João chora muito — primeira pessoa, balão do protagonista
      b(4, {
        by: "joao",
        env: { glory: 0.5, night: 0.18 },
        cast: [JOAO("kneel"), ...ELDERS(), ...LIVING_ONES(), C("anjo", 85, "stand", { dy: 0.32, glow: 0.5 })],
      }),                                                                         // "E eu chorava muito"
      // um dos anciãos deixa o arco e vem consolar João
      b(5, {
        by: "anciao", q: "disse-me um dos anciãos: ",
        env: { glory: 0.7, night: 0 },
        cast: [
          JOAO("kneel"),
          C("anciao", -125, "point", { dy: 0.58 }),                               // o ancião junto de João
          ...ELDERS().slice(1),
          ...LIVING_ONES(),
          C("anjo", 85, "stand", { dy: 0.32, glow: 0.5 }),
        ],
      }),                                                                         // "Não chores; eis o Leão de Judá"
      // O CORDEIRO aparece no meio do trono — momento central do livro
      b(6, {
        env: { glory: 0.95 },
        cast: [JOAO("stand"), ...ELDERS(), ...LIVING_ONES("flyIdle", 0.7), LAMB(), C("anjo", 85, "stand", { dy: 0.32, glow: 0.5 })],
      }),                                                                         // o Cordeiro, como havendo sido morto
      // o Cordeiro toma o livro da destra do que está no trono
      b(7, { props: [...THRONE_CORE, ...SEVEN_LAMPS, GLASS_SEA, SCROLL_AT_LAMB] }), // tomou o livro da destra
      // seres e anciãos se prostram diante do Cordeiro, com as salvas de incenso
      b(8, {
        cast: [JOAO("kneel"), ...ELDERS("bow"), ...LIVING_ONES(undefined, 0.7), LAMB(), C("anjo", 85, "stand", { dy: 0.32, glow: 0.5 })],
        props: [...THRONE_CORE, ...SEVEN_LAMPS, GLASS_SEA, SCROLL_AT_LAMB, ...INCENSE_BOWLS],
      }),                                                                         // prostrados; harpas e salvas de incenso
      // o cântico novo dos remidos
      b(9, { by: "anciao", q: "dizendo: ", env: { glory: 0.9 } }),                // cântico novo: "Digno és de tomar o livro"
      b(10, { by: "anciao" }),                                                    // "nos fizeste reis e sacerdotes"
      // milhões de milhões de anjos ao redor do trono
      b(11, {
        env: { glory: 0.95 },
        cast: [
          JOAO("stand"), ...ELDERS("kneel"), ...LIVING_ONES("flyIdle", 0.7), LAMB(),
          C("anjo", 85, "flyIdle", { dy: 0.32, glow: 0.6 }),
          C("multidao", -260, "stand", { dy: 0.12, glow: 0.3 }),
          C("multidao", 260, "stand", { dy: 0.12, glow: 0.3, id: "multidao2" }),
        ],
      }),                                                                         // milhões de milhões de anjos
      b(12, { by: "multidao", q: "diziam: " }),                                   // "Digno é o Cordeiro que foi morto"
      // toda criatura no céu, na terra e no mar adora — glória total
      b(13, { by: "multidao", q: "dizer: ", env: { glory: 1 } }),                 // toda criatura dá louvor
      // amém dos seres; anciãos prostrados adoram para sempre
      b(14, { cast: [JOAO("kneel"), ...ELDERS("bow"), ...LIVING_ONES("flyIdle", 0.8), LAMB(), C("anjo", 85, "flyIdle", { dy: 0.32, glow: 0.6 }), C("multidao", -260, "raise", { dy: 0.12, glow: 0.4 }), C("multidao", 260, "raise", { dy: 0.12, glow: 0.4, id: "multidao2" })] }), // Amém; anciãos adoram para sempre
    ],
  },
};
