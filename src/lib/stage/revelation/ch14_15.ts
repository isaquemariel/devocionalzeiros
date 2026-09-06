// ============================================================================
// APOCALIPSE 14–15 — roteiro do modo CENA VIVA (1 beat = 1 versículo, ARC).
//
// Ap 14 — O CORDEIRO NO MONTE SIÃO: contraste total com o cap. 13. Glória alta,
// o Cordeiro e os 144 mil cantando o cântico novo; três anjos cruzam o céu
// anunciando (evangelho eterno, queda de Babilônia, juízo da marca); a voz do
// céu consola os que morrem no Senhor; a CEIFA da terra (o Filho do homem na
// nuvem branca) e a VINDIMA do lagar da ira fecham o capítulo em tom pesado.
//
// Ap 15 — PRELÚDIO DAS TAÇAS: de volta ao céu. Sete anjos em fileira, o mar
// de vidro misturado com fogo, o cântico de Moisés e do Cordeiro, o templo do
// tabernáculo se abre, as sete taças de ouro são entregues — e o templo se
// enche da fumaça da glória: ninguém pode entrar. Fim em suspense.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ----------------------------------------------------------------------------
// SETS FIXOS
// ----------------------------------------------------------------------------

// O MONTE SIÃO na glória: o monte ao centro (rochas), estrelas no alto e
// vegetação nas bordas. O corredor -100..-190 fica livre para os extras.
const SIAO: StagePropSpec[] = [
  P("rock", 0, 1.4, undefined, 0.2),        // o monte Sião (rocha central, grande)
  P("rock", -54, 1.0, undefined, 0.34),
  P("rock", 52, 1.05, undefined, 0.32),
  P("rock", 118, 0.8, undefined, 0.5),
  P("star", 0, 0.55, undefined, 0.02),      // luz sobre o monte
  P("star", -245, 0.7, undefined, 0.06),
  P("star", 232, 0.6, undefined, 0.05),
  P("bush", -262, 1.0, undefined, 0.45),
  P("bush", 268, 0.95, undefined, 0.52),
  P("grass", -60, 1, undefined, 0.8),
  P("grass", 152, 1, undefined, 0.78),
  P("grass", 300, 0.9, undefined, 0.6),
  P("grass", -290, 1, undefined, 0.7),
];

// O CÉU DA CEIFA: o templo celestial (tenda do tabernáculo) ao fundo à direita;
// o Filho do homem senta "sobre a nuvem" (dy baixo no terreno glory).
const CEU_CEIFA: StagePropSpec[] = [
  P("tent", 205, 1.15, undefined, 0.08),    // o templo que está no céu
  P("star", -240, 0.65, undefined, 0.05),
  P("star", 250, 0.6, undefined, 0.04),
  P("rock", 300, 0.8, undefined, 0.6),
  P("rock", -292, 0.75, undefined, 0.55),
  P("bush", -258, 0.9, undefined, 0.48),
  P("grass", -60, 1, undefined, 0.82),
  P("grass", 148, 1, undefined, 0.8),
];

// A SEARA MADURA (terra, campo dourado): capim alto por toda parte.
const SEARA: StagePropSpec[] = [
  P("tree", -230, 1.05, undefined, 0.1),
  P("tree", 260, 1.1, undefined, 0.12),
  P("rock", 130, 0.7, undefined, 0.3),
  P("grass", -300, 1.2, undefined, 0.7),
  P("grass", -240, 1.15, undefined, 0.5),
  P("grass", -60, 1.2, undefined, 0.8),
  P("grass", 0, 1.1, undefined, 0.6),
  P("grass", 70, 1.2, undefined, 0.75),
  P("grass", 150, 1.15, undefined, 0.55),
  P("grass", 230, 1.2, undefined, 0.7),
  P("grass", 305, 1.1, undefined, 0.6),
];
const TEMPLO_AO_LONGE = P("tent", 205, 1.0, undefined, 0.04); // o templo, no céu, ao fundo

// A SALA DO TRONO (Ap 15): trono ao fundo, luzes e incenso.
const TRONO: StagePropSpec[] = [
  P("throneOfGod", 0, 1.35, undefined, 0.08),
  P("star", -250, 0.7, undefined, 0.05),
  P("star", 248, 0.65, undefined, 0.06),
  P("lampstand", -215, 0.95, 1, 0.3),
  P("lampstand", 218, 0.95, 1, 0.32),
  P("censer", 298, 0.85, 0.4, 0.5),
];
// o mar de vidro misturado com fogo (rio vítreo com brasas)
const MAR_DE_VIDRO = P("river", 0, 1.25, 0.25, 0.6);
// o templo do tabernáculo do testemunho (corredor de extras)
const TABERNACULO = P("tent", -150, 1.3, undefined, 0.1);
// as sete taças de ouro em fileira, à frente
const TACAS: StagePropSpec[] = [-90, -60, -30, 0, 30, 60, 90].map((dx) =>
  P("bowl", dx, 0.75, 1, 0.78));

// os sete anjos das sete pragas em fileira (ids fixos para tween)
const SETE_ANJOS = (dxs: number[], pose: string, dy: number, glow = 0.5, facing?: 1 | -1): CastPlacement[] =>
  dxs.map((dx, i) => C("anjo", dx, pose, { dy, glow, ...(facing ? { facing } : {}), ...(i > 0 ? { id: `anjo${i + 1}` } : {}) }));

// ----------------------------------------------------------------------------

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Ap 14
  14: {
    start: { terrain: "glory", night: 0, glory: 0.85, storm: 0, fire: 0 },
    beats: [
      // O CORDEIRO E OS 144 MIL (v.1-5) — glória plena, contraste com o cap. 13
      b(1, { cast: [
        C("joao", -84, "stand", { dy: 0.58 }),
        C("cordeiro", 4, "stand", { glow: 1, dy: 0.3 }),
        C("multidao", 92, "stand", { dy: 0.5 }),
        C("multidao", -46, "stand", { dy: 0.56, id: "multidao2" }),
      ], props: SIAO }),                                                             // o Cordeiro no monte Sião com os 144 mil
      b(2, { env: { glory: 0.92 }, cast: [
        C("joao", -84, "stand", { dy: 0.58 }),
        C("cordeiro", 4, "stand", { glow: 1, dy: 0.3 }),
        C("multidao", 92, "raise", { dy: 0.5 }),
        C("multidao", -46, "raise", { dy: 0.56, id: "multidao2" }),
      ] }),                                                                          // voz de muitas águas e de harpistas
      b(3, { props: [...SIAO, P("throneOfGod", -145, 1.05, undefined, 0.12)], cast: [
        C("joao", -84, "stand", { dy: 0.58 }),
        C("cordeiro", 4, "stand", { glow: 1, dy: 0.3 }),
        C("multidao", 92, "raise", { dy: 0.5 }),
        C("multidao", -46, "raise", { dy: 0.56, id: "multidao2" }),
        C("anciao", -118, "stand", { glow: 0.4, dy: 0.44 }),
      ] }),                                                                          // cântico novo diante do trono e dos anciãos
      b(4, { cast: [
        C("joao", -84, "stand", { dy: 0.58 }),
        C("cordeiro", 40, "walk", { glow: 1, dy: 0.32 }),
        C("multidao", 74, "walk", { dy: 0.5 }),
        C("multidao", -18, "walk", { dy: 0.56, id: "multidao2" }),
        C("anciao", -118, "stand", { glow: 0.4, dy: 0.44 }),
      ] }),                                                                          // seguem o Cordeiro aonde quer que vá
      b(5, { env: { glory: 1 }, cast: [
        C("joao", -84, "stand", { dy: 0.58 }),
        C("cordeiro", 40, "stand", { glow: 1, dy: 0.32 }),
        C("multidao", 78, "stand", { dy: 0.5 }),
        C("multidao", -18, "stand", { dy: 0.56, id: "multidao2" }),
        C("anciao", -118, "stand", { glow: 0.4, dy: 0.44 }),
      ] }),                                                                          // irrepreensíveis diante do trono de Deus

      // OS TRÊS ANJOS (v.6-11) — cruzam o céu anunciando, um por beat
      b(6, { props: [...SIAO, P("scroll", -150, 0.85, undefined, 0.18)], cast: [
        C("joao", -84, "stand", { dy: 0.58 }),
        C("cordeiro", 40, "stand", { glow: 1, dy: 0.32 }),
        C("multidao", 78, "stand", { dy: 0.5 }),
        C("multidao", -18, "stand", { dy: 0.56, id: "multidao2" }),
        C("anjo", -220, "flyIdle", { dy: 0.15, glow: 0.7 }),
      ] }),                                                                          // outro anjo voando com o evangelho eterno
      b(7, { by: "anjo", q: "com grande voz: ", cast: [
        C("joao", -84, "stand", { dy: 0.58 }),
        C("cordeiro", 40, "stand", { glow: 1, dy: 0.32 }),
        C("multidao", 78, "stand", { dy: 0.5 }),
        C("multidao", -18, "stand", { dy: 0.56, id: "multidao2" }),
        C("anjo", -30, "flyIdle", { dy: 0.12, glow: 0.8 }),
      ] }),                                                                          // Temei a Deus e dai-lhe glória
      b(8, { by: "anjo", q: "dizendo: ", env: { night: 0.12, storm: 0.15 }, cast: [
        C("joao", -84, "stand", { dy: 0.58 }),
        C("cordeiro", 40, "stand", { glow: 1, dy: 0.32 }),
        C("multidao", 78, "stand", { dy: 0.5 }),
        C("multidao", -18, "stand", { dy: 0.56, id: "multidao2" }),
        C("anjo", -30, "flyIdle", { dy: 0.12, glow: 0.8 }),          // o segundo anjo, agora falando
        C("anjo", 130, "flyIdle", { dy: 0.09, glow: 0.55, id: "anjoA" }), // o primeiro seguiu adiante
      ] }),                                                                          // Caiu, caiu Babilônia, a grande cidade
      b(9, { by: "anjo", q: "com grande voz: ", env: { storm: 0.2 }, cast: [
        C("joao", -84, "stand", { dy: 0.58 }),
        C("cordeiro", 40, "stand", { glow: 1, dy: 0.32 }),
        C("multidao", 78, "stand", { dy: 0.5 }),
        C("multidao", -18, "stand", { dy: 0.56, id: "multidao2" }),
        C("anjo", -30, "flyIdle", { dy: 0.12, glow: 0.8 }),          // o terceiro anjo assume a proclamação
        C("anjo", 130, "flyIdle", { dy: 0.09, glow: 0.55, id: "anjoA" }),
        C("anjo", 240, "flyIdle", { dy: 0.07, glow: 0.5, id: "anjoB" }),
      ] }),                                                                          // se alguém adorar a besta e sua imagem
      b(10, { by: "anjo", env: { fire: 0.3, storm: 0.25, glory: 0.7 } }),            // o vinho da ira, fogo e enxofre
      b(11, { by: "anjo", env: { fire: 0.3, night: 0.2 } }),                         // a fumaça do tormento sobe para sempre

      // CONSOLO (v.12-13) — os anjos seguem; a cena serena
      b(12, { env: { fire: 0, storm: 0, night: 0.05, glory: 0.85 }, cast: [
        C("joao", -84, "stand", { dy: 0.58 }),
        C("cordeiro", 40, "stand", { glow: 1, dy: 0.32 }),
        C("multidao", 78, "stand", { dy: 0.5 }),
        C("multidao", -18, "kneel", { dy: 0.56, id: "multidao2" }),
      ] }),                                                                          // a paciência dos santos
      b(13, { by: "anjo", q: "que me dizia: ", env: { glory: 0.7, night: 0 }, cast: [
        C("joao", -50, "write", { dy: 0.56 }),
        C("cordeiro", 40, "stand", { glow: 1, dy: 0.32 }),
        C("multidao", 92, "stand", { dy: 0.5 }),
      ] }),                                                                          // (voz do céu) bem-aventurados os mortos no Senhor

      // A CEIFA (v.14-16) — o Filho do homem sobre a nuvem branca
      b(14, { set: "ceifa", env: { glory: 0.9, storm: 0, fire: 0 }, props: CEU_CEIFA, cast: [
        C("joao", -80, "stand", { dy: 0.58 }),
        C("cristo", 10, "stand", { glow: 1, dy: 0.2 }),
      ] }),                                                                          // nuvem branca, coroa de ouro, foice aguda
      b(15, { by: "anjo", q: "sobre a nuvem: ", cast: [
        C("joao", -80, "stand", { dy: 0.58 }),
        C("cristo", 10, "stand", { glow: 1, dy: 0.2 }),
        C("anjo", 150, "flyIdle", { dy: 0.3, glow: 0.6 }),
      ] }),                                                                          // anjo do templo clama: lança a tua foice
      b(16, { set: "seara", env: { terrain: "field", glory: 0.75, night: 0.1 }, props: SEARA, cast: [
        C("joao", -84, "stand", { dy: 0.58 }),
        C("cristo", 10, "stand", { glow: 1, dy: 0.18 }),
        C("anjo", 130, "flyIdle", { dy: 0.25, glow: 0.5 }),
      ] }),                                                                          // a foice à terra: a terra foi segada

      // A VINDIMA (v.17-20) — o lagar da ira, encerramento pesado
      b(17, { env: { night: 0.15, storm: 0.1 }, props: [...SEARA, TEMPLO_AO_LONGE], cast: [
        C("joao", -84, "stand", { dy: 0.58 }),
        C("anjo", 40, "flyIdle", { dy: 0.2, glow: 0.7, id: "anjoFoice" }),
      ] }),                                                                          // outro anjo do templo, com foice aguda
      b(18, { by: "anjo", q: "dizendo: ", env: { fire: 0.35, storm: 0.2 },
        props: [...SEARA, TEMPLO_AO_LONGE, P("altar", -150, 1.0, 0.9, 0.2)], cast: [
        C("joao", -84, "stand", { dy: 0.58 }),
        C("anjo", 40, "flyIdle", { dy: 0.2, glow: 0.7, id: "anjoFoice" }),
        C("anjo", -108, "flyIdle", { dy: 0.3, glow: 0.7 }),          // o anjo do altar, com poder sobre o fogo
      ] }),                                                                          // vindima os cachos da vinha da terra
      b(19, { env: { fire: 0.5, storm: 0.3, night: 0.3, glory: 0.3 },
        props: [...SEARA, TEMPLO_AO_LONGE, P("well", -145, 1.15, undefined, 0.22),
          P("bush", 100, 0.9, undefined, 0.42), P("bush", 180, 0.85, undefined, 0.5)], cast: [
        C("joao", -84, "stand", { dy: 0.58 }),
        C("anjo", 10, "flyIdle", { dy: 0.3, glow: 0.7, id: "anjoFoice" }),
        C("anjo", -108, "flyIdle", { dy: 0.3, glow: 0.6 }),
      ] }),                                                                          // as uvas no grande lagar da ira
      b(20, { env: { fire: 0.6, storm: 0.4, night: 0.45, glory: 0.15 },
        props: [...SEARA, P("well", -145, 1.15, 0.6, 0.22)], cast: [
        C("joao", -60, "stand", { dy: 0.6 }),
      ] }),                                                                          // o lagar pisado: sangue até aos freios
    ],
  },

  // ------------------------------------------------------------------ Ap 15
  15: {
    start: { terrain: "throne", night: 0.05, glory: 0.7, storm: 0, fire: 0 },
    beats: [
      b(1, { props: TRONO, cast: [
        C("joao", -115, "stand", { dy: 0.58 }),
        ...SETE_ANJOS([-78, -52, -26, 0, 26, 52, 78], "flyIdle", 0.35, 0.5),
      ], env: { glory: 0.75 } }),                                                    // sinal grande: sete anjos, sete pragas
      b(2, { props: [...TRONO, MAR_DE_VIDRO], env: { glory: 0.8, fire: 0.25 }, cast: [
        C("joao", -115, "stand", { dy: 0.58 }),
        ...SETE_ANJOS([-78, -52, -26, 0, 26, 52, 78], "flyIdle", 0.24, 0.45),
        C("multidao", -40, "raise", { dy: 0.62 }),
        C("multidao", 70, "raise", { dy: 0.6, id: "multidao2" }),
      ] }),                                                                          // mar de vidro com fogo; vencedores com harpas
      b(3, { by: "multidao", q: "dizendo: ", env: { glory: 1 }, cast: [
        C("joao", -115, "stand", { dy: 0.58 }),
        ...SETE_ANJOS([-78, -52, -26, 0, 26, 52, 78], "flyIdle", 0.24, 0.45),
        C("multidao", -40, "raise", { dy: 0.62 }),
        C("multidao", 70, "raise", { dy: 0.6, id: "multidao2" }),
        C("cordeiro", 15, "stand", { glow: 1, dy: 0.45 }),
      ] }),                                                                          // cântico de Moisés e do Cordeiro
      b(4, { by: "multidao", env: { glory: 1, fire: 0.2 } }),                        // todas as nações virão e adorarão
      b(5, { props: [...TRONO, MAR_DE_VIDRO, TABERNACULO], env: { glory: 0.9 }, cast: [
        C("joao", -115, "point", { dy: 0.58, facing: -1 }),
        C("multidao", -40, "stand", { dy: 0.62 }),
        C("multidao", 70, "stand", { dy: 0.6, id: "multidao2" }),
        C("cordeiro", 15, "stand", { glow: 1, dy: 0.45 }),
      ] }),                                                                          // o templo do tabernáculo se abre no céu
      b(6, { env: { glory: 0.85 }, cast: [
        C("joao", -115, "stand", { dy: 0.58 }),
        C("cordeiro", 95, "stand", { glow: 1, dy: 0.42 }),
        ...SETE_ANJOS([-95, -68, -41, -14, 13, 40, 67], "walk", 0.48, 0.6, 1),
      ] }),                                                                          // sete anjos saem, vestidos de linho puro
      b(7, { props: [...TRONO, MAR_DE_VIDRO, TABERNACULO, ...TACAS], cast: [
        C("joao", -115, "stand", { dy: 0.58 }),
        ...SETE_ANJOS([-95, -68, -41, -14, 13, 40, 67], "raise", 0.48, 0.6),
        C("servivente", 100, "flyIdle", { glow: 0.7, dy: 0.42 }),
      ] }),                                                                          // um dos animais entrega as sete taças
      b(8, { env: { glory: 0.9, night: 0.3 },
        props: [...TRONO, MAR_DE_VIDRO, TABERNACULO, ...TACAS, P("censer", -108, 0.9, 0.9, 0.42)], cast: [
        C("joao", -115, "stand", { dy: 0.58 }),
        ...SETE_ANJOS([-95, -68, -41, -14, 13, 40, 67], "stand", 0.48, 0.55),
      ] }),                                                                          // o templo encheu-se de fumaça: ninguém entra
    ],
  },
};
