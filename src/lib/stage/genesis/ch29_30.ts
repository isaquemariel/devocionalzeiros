// ============================================================================
// GÊNESIS 29–30 — roteiro do modo CENA VIVA (força-tarefa AT, onda 2).
//
// Gn 29 — RAQUEL NO POÇO: o forasteiro chega ao oriente e encontra o poço de
// Harã fechado por uma GRANDE PEDRA — três rebanhos deitados esperando. Jacó
// pergunta, os pastores respondem, e então ELA aparece com as ovelhas. O beat
// da pedra revolvida (v.10) e do beijo com choro (v.11) é o coração do
// capítulo: glória 0.4, o homem que fugiu de casa achando parentela. Depois o
// contrato dos SETE ANOS que "lhe pareceram como poucos dias" (v.20, glória
// 0.5, o beat mais terno), a NOITE DA TROCA (banquete, night 0.85 — o texto é
// tratado com decoro total: Labão conduz, o palco escurece, e a manhã revela
// Lia), mais sete anos, e os quatro primeiros filhos — a dor da preterida
// virando louvor em JUDÁ ("Esta vez louvarei ao SENHOR", glória 0.5).
//
// Gn 30 — A GUERRA DAS ESPOSAS E O REBANHO: a inveja de Raquel abre o capítulo
// em storm; Bila e Zilpa dão filhos; as MANDRÁGORAS na ceifa do trigo são a
// barganha mais humana da Bíblia. Então o giro: "E lembrou-se Deus de Raquel"
// — JOSÉ nasce e o palco chega ao seu ponto mais luminoso (glória 0.8). A
// segunda metade é economia e astúcia: o acordo dos salpicados e malhados, os
// três dias de caminho, as VARAS DESCASCADAS nos bebedouros, e o rebanho que
// se multiplica até "cresceu o homem em grande maneira".
//
// DEUS NUNCA É DESENHADO: "o SENHOR viu que Lia era desprezada" (29:31) e
// "lembrou-se Deus de Raquel" (30:22) são GLÓRIA subindo sobre quem foi
// lembrado — narração pura, sem `by`, sem figura.
//
// CONVENÇÃO DE ELENCO (o motor casa o balão por `id ?? role`):
// Raquel e Lia são ambas `mulherComum`. Em cada beat, QUEM FALA fica sem `id`
// (vira o alvo de `by: "mulherComum"`) e a outra recebe `id` ("lia"/"raquel").
// Servas: `id` "bila"/"zilpa"; os filhos crescendo: `homem` em escala menor.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------------------
// O CAMINHO DO ORIENTE (Gn 29:1) — estrada seca de Padã-Arã: pedras grandes,
// palmeiras raras, mato queimado de sol. Corredor -100..-190 LIVRE.
const CAMINHO: StagePropSpec[] = [
  P("rock", -250, 1.0, undefined, 0.24),
  P("rock", 210, 0.9, undefined, 0.35),
  P("rock", 310, 1.1, undefined, 0.6),
  P("palm", -300, 1.05, undefined, 0.1),
  P("palm", 90, 0.9, undefined, 0.06),
  P("bush", -60, 0.9, undefined, 0.5),
  P("bush", 250, 0.85, undefined, 0.7),
  P("grass", -210, 1, undefined, 0.8),
  P("grass", 30, 0.95, undefined, 0.85),
  P("grass", 160, 1, undefined, 0.75),
];

// ---------------------------------------------------------------------------
// O POÇO NO CAMPO DE HARÃ (Gn 29:2-12) — o poço é o CENTRO absoluto do palco
// (dx 0): tudo converge para ele. A vaga -100..-190 fica livre porque é para
// ali que a GRANDE PEDRA vai rolar quando Jacó a revolver (v.10).
const POCO_BASE: StagePropSpec[] = [
  { ...P("well", 0, 1.3, undefined, 0.18), tag: "poco-jaco" },        // o poço — "eis um poço no campo"
  P("tree", 150, 1.15, undefined, 0.05),
  P("tree", -70, 1.0, undefined, 0.03),
  P("palm", 300, 1.0, undefined, 0.1),
  P("bush", -300, 0.95, undefined, 0.42),
  P("bush", 235, 0.9, undefined, 0.62),
  P("rock", -245, 0.9, undefined, 0.56),
  P("rock", 320, 0.85, undefined, 0.72),
  P("amphora", -58, 0.8, undefined, 0.66),   // as talhas de dar de beber
  P("grass", -215, 1, undefined, 0.8),
  P("grass", 65, 1, undefined, 0.86),
  P("grass", 195, 0.95, undefined, 0.78),
  P("grass", 275, 0.9, undefined, 0.64),
];
// a GRANDE PEDRA ainda sobre a boca do poço (v.2-9): tampando, pesada
const POCO_FECHADO: StagePropSpec[] = [...POCO_BASE, P("rock", 30, 0.78, undefined, 0.26)];
// v.10: a pedra REVOLVIDA — sai de cima da boca e vai para a vaga de extras,
// grande e visível: o feito de força que abre o capítulo do amor.
const POCO_ABERTO: StagePropSpec[] = [...POCO_BASE, P("rock", -140, 1.05, undefined, 0.22)];

// ---------------------------------------------------------------------------
// O ACAMPAMENTO DE LABÃO (Gn 29:13-21 e 26-30) — a casa que acolhe e explora:
// a tenda grande do sogro, o poço da casa, o fogo, os fardos do serviço.
const CASA_LABAO: StagePropSpec[] = [
  P("tent", 170, 1.3, undefined, 0.1),       // a tenda de Labão
  P("tent", 262, 1.0, undefined, 0.32),      // as tendas da casa
  P("well", 320, 1.0, undefined, 0.12),
  P("campfire", 60, 1, 1, 0.6),
  P("amphora", 212, 0.85, undefined, 0.55),
  P("crate", -282, 0.9, undefined, 0.48),
  P("crate", -240, 0.8, undefined, 0.62),
  P("rock", -60, 0.6, undefined, 0.26),
  P("rock", 292, 0.85, undefined, 0.74),
  P("bush", -310, 0.9, undefined, 0.36),
  P("bush", 120, 0.85, undefined, 0.7),
  P("tree", -40, 1.05, undefined, 0.04),
  P("grass", -200, 1, undefined, 0.82),
  P("grass", 20, 1, undefined, 0.85),
  P("grass", 240, 0.95, undefined, 0.8),
];

// O BANQUETE DAS BODAS (Gn 29:22-25) — noite fechada, a fogueira grande na
// vaga de extras, as taças do banquete, as estrelas. É a escuridão que engana.
const BANQUETE: StagePropSpec[] = [
  ...CASA_LABAO,
  P("campfire", -130, 1.3, 1, 0.28),         // a fogueira da festa
  P("bowl", -102, 0.9, undefined, 0.72),     // "fez um banquete"
  { kind: "starfield", dx: -20, dy: 0.8, scale: 1.25, sky: true },
  { kind: "starfield", dx: 180, dy: 0.66, scale: 1.0, sky: true },
];

// ---------------------------------------------------------------------------
// AS TENDAS DAS ESPOSAS (Gn 29:31-35 e Gn 30:1-13, 17-24) — o palco doméstico
// onde nasce Israel: duas tendas lado a lado, o fogo do meio, o poço da casa.
// Duas tendas = duas casas rivais; o corredor -100..-190 fica livre.
const TENDAS: StagePropSpec[] = [
  P("tent", 160, 1.3, undefined, 0.1),       // a tenda de Lia
  P("tent", 250, 1.05, undefined, 0.3),      // a tenda de Raquel
  P("campfire", 40, 1, 1, 0.62),
  P("well", 315, 0.95, undefined, 0.14),
  P("amphora", 200, 0.85, undefined, 0.58),
  P("crate", -270, 0.9, undefined, 0.5),
  P("bush", -300, 0.9, undefined, 0.34),
  P("bush", 110, 0.85, undefined, 0.72),
  P("tree", -50, 1.05, undefined, 0.04),
  P("rock", -230, 0.85, undefined, 0.64),
  P("rock", 300, 0.8, undefined, 0.76),
  P("grass", -190, 1, undefined, 0.84),
  P("grass", 10, 1, undefined, 0.86),
  P("grass", 230, 0.95, undefined, 0.82),
];

// ---------------------------------------------------------------------------
// A CEIFA DO TRIGO (Gn 30:14-16) — o campo dourado, os feixes cortados, e AS
// MANDRÁGORAS que Rúben achou (o arbusto destacado na vaga de extras).
const CEIFA: StagePropSpec[] = [
  P("sheaf", 120, 1.15, undefined, 0.2),
  P("sheaf", 210, 1.0, undefined, 0.42),
  P("sheaf", -40, 0.95, undefined, 0.1),
  P("sheaf", 290, 1.05, undefined, 0.62),
  P("bush", -140, 1.15, undefined, 0.24),    // AS MANDRÁGORAS do campo
  P("tree", 60, 1.1, undefined, 0.03),
  P("rock", -250, 0.85, undefined, 0.5),
  P("bush", -300, 0.9, undefined, 0.66),
  P("grass", -210, 1, undefined, 0.82),
  P("grass", 20, 1, undefined, 0.86),
  P("grass", 250, 0.95, undefined, 0.78),
];

// ---------------------------------------------------------------------------
// OS PASTOS DE LABÃO (Gn 30:25-36) — a negociação acontece no meio do gado:
// currais, fardos, a tenda ao longe. Palco aberto para o rebanho grande.
const PASTOS: StagePropSpec[] = [
  P("tent", 230, 1.2, undefined, 0.12),
  P("crate", -270, 0.9, undefined, 0.46),
  P("crate", -232, 0.8, undefined, 0.6),
  P("rock", -60, 0.6, undefined, 0.28),
  P("rock", 300, 0.9, undefined, 0.7),
  P("tree", 90, 1.1, undefined, 0.03),
  P("tree", -20, 0.9, undefined, 0.06),
  P("palm", 320, 1.0, undefined, 0.24),
  P("bush", -310, 0.95, undefined, 0.38),
  P("bush", 150, 0.9, undefined, 0.66),
  P("grass", -200, 1, undefined, 0.84),
  P("grass", 40, 1, undefined, 0.86),
  P("grass", 260, 0.95, undefined, 0.8),
];

// OS BEBEDOUROS (Gn 30:37-43) — o poço, os canos de água correndo (river) e as
// VARAS DESCASCADAS: o feixe apoiado no caixote e na pedra, na vaga de extras,
// "em frente aos rebanhos", exatamente onde eles vêm beber.
const BEBEDOUROS: StagePropSpec[] = [
  P("well", 0, 1.3, undefined, 0.18),        // o poço de onde se enchem os canos
  P("river", 60, 1.0, undefined, 0.34),      // "nos canos e nos bebedouros de água"
  P("crate", -140, 1.0, undefined, 0.24),    // as varas descascadas, apoiadas
  P("rock", -172, 0.72, undefined, 0.4),     // a pedra que escora o feixe de varas
  P("tree", 160, 1.15, undefined, 0.04),
  P("tent", 262, 1.15, undefined, 0.12),
  P("amphora", 210, 0.85, undefined, 0.56),
  P("bush", -300, 0.9, undefined, 0.4),
  P("bush", 120, 0.85, undefined, 0.7),
  P("rock", -250, 0.9, undefined, 0.6),
  P("rock", 310, 0.85, undefined, 0.74),
  P("grass", -212, 1, undefined, 0.82),
  P("grass", 30, 1, undefined, 0.86),
  P("grass", 240, 0.95, undefined, 0.78),
];
// v.43 — "cresceu o homem em grande maneira": mais tendas, mais fardos.
const RIQUEZA: StagePropSpec[] = [
  ...BEBEDOUROS,
  P("tent", -62, 1.1, undefined, 0.06),      // as tendas da casa que cresceu
  P("crate", -104, 0.9, undefined, 0.68),
  P("crate", 88, 0.85, undefined, 0.62),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Gn 29
  // RAQUEL NO POÇO. Arco de env: estrada seca (night 0.12) → pleno dia no poço
  // (night 0.02) → a glória do encontro (0.4) → a ternura dos sete anos (0.5)
  // → a NOITE DA TROCA (night 0.85) → a manhã do engano (storm 0.3) → a luz
  // mansa sobre a preterida, fechando em louvor (glory 0.55).
  29: {
    start: { terrain: "desert", night: 0.12, glory: 0.1, storm: 0, fire: 0 },
    beats: [
      // ---- ATO 1: o poço fechado pela grande pedra (v.1-8)
      b(1, { props: CAMINHO, cast: [
        C("jaco", -50, "walk", { dy: 0.5, facing: 1 }),
      ] }),                                                                         // Jacó pôs-se a caminho, à terra do oriente
      b(2, { set: "poco", props: POCO_FECHADO, env: { terrain: "field", night: 0.02, glory: 0.18 }, cast: [
        C("jaco", -92, "stand", { dy: 0.52, facing: 1 }),
        C("rebanho", 155, "lie", { dy: 0.38 }),
        C("rebanho", 248, "lie", { dy: 0.58, id: "rebanho2" }),
        C("pastor", 66, "stand", { dy: 0.5, facing: -1 }),
        C("pastor", 112, "stand", { dy: 0.6, id: "pastor2", facing: -1 }),
      ] }),                                                                         // o poço, três rebanhos deitados, a grande pedra
      b(3, { cast: [
        C("jaco", -92, "stand", { dy: 0.52, facing: 1 }),
        C("rebanho", 150, "lie", { dy: 0.38 }),
        C("rebanho", 240, "stand", { dy: 0.58, id: "rebanho2" }),
        C("pastor", 44, "point", { dy: 0.48, facing: -1 }),
        C("pastor", 104, "stand", { dy: 0.6, id: "pastor2", facing: -1 }),
      ] }),                                                                         // o costume: ajuntar, remover a pedra, tornar a pô-la
      b(4, { by: "jaco", q: "E disse-lhes Jacó: ", cast: [
        C("jaco", -46, "stand", { dy: 0.5, facing: 1 }),
        C("rebanho", 150, "lie", { dy: 0.38 }),
        C("rebanho", 240, "stand", { dy: 0.58, id: "rebanho2" }),
        C("pastor", 40, "stand", { dy: 0.5, facing: -1 }),
        C("pastor", 96, "stand", { dy: 0.6, id: "pastor2", facing: -1 }),
      ] }),                                                                         // "Meus irmãos, donde sois?" — Somos de Harã
      b(5, { by: "jaco", q: "E ele lhes disse: " }),                                // conheceis a Labão, filho de Naor?
      b(6, { by: "jaco", q: "Disse-lhes mais: ", env: { glory: 0.24 } }),           // eis aqui Raquel sua filha, que vem com as ovelhas
      b(7, { by: "jaco", q: "E ele disse: ", cast: [
        C("jaco", -20, "point", { dy: 0.48, facing: 1 }),
        C("rebanho", 150, "lie", { dy: 0.38 }),
        C("rebanho", 240, "stand", { dy: 0.58, id: "rebanho2" }),
        C("pastor", 46, "stand", { dy: 0.5, facing: -1 }),
        C("pastor", 100, "stand", { dy: 0.6, id: "pastor2", facing: -1 }),
      ] }),                                                                         // "ainda é pleno dia" — dai de beber e apascentai
      b(8, { by: "pastor", q: "E disseram: ", cast: [
        C("jaco", -34, "stand", { dy: 0.5, facing: 1 }),
        C("rebanho", 150, "lie", { dy: 0.38 }),
        C("rebanho", 240, "stand", { dy: 0.58, id: "rebanho2" }),
        C("pastor", 44, "point", { dy: 0.5, facing: 1 }),
        C("pastor", 98, "stand", { dy: 0.6, id: "pastor2", facing: -1 }),
      ] }),                                                                         // não podemos, até removerem a pedra

      // ---- ATO 2: Raquel chega, a pedra rola, o beijo e o choro (v.9-12)
      b(9, { env: { glory: 0.3 }, cast: [
        C("jaco", -34, "stand", { dy: 0.5, facing: 1 }),
        C("mulherComum", 130, "walk", { dy: 0.46, facing: -1 }),
        C("rebanho", 236, "walk", { dy: 0.4 }),
        C("rebanho", 300, "walk", { dy: 0.6, id: "rebanho2" }),
        C("pastor", 66, "stand", { dy: 0.6, facing: 1 }),
      ] }),                                                                         // veio Raquel com as ovelhas: ela era pastora
      b(10, { props: POCO_ABERTO, env: { glory: 0.4 }, cast: [
        C("jaco", 8, "raise", { dy: 0.42, facing: 1 }),
        C("mulherComum", -54, "stand", { dy: 0.5, facing: 1 }),
        C("rebanho", 118, "stand", { dy: 0.5 }),
        C("rebanho", 210, "stand", { dy: 0.66, id: "rebanho2" }),
        C("pastor", 268, "stand", { dy: 0.62, facing: -1 }),
      ] }),                                                                         // JACÓ REVOLVE A PEDRA e dá de beber às ovelhas
      b(11, { env: { glory: 0.4 }, cast: [
        C("jaco", -18, "kneel", { dy: 0.5, facing: 1 }),
        C("mulherComum", 22, "stand", { dy: 0.5, glow: 0.25, facing: -1 }),
        C("rebanho", 150, "stand", { dy: 0.5 }),
        C("rebanho", 236, "stand", { dy: 0.68, id: "rebanho2" }),
      ] }),                                                                         // beijou a Raquel, levantou a voz e CHOROU
      b(12, { env: { glory: 0.34 }, cast: [
        C("jaco", -24, "stand", { dy: 0.5, facing: 1 }),
        C("mulherComum", 150, "walk", { dy: 0.44, facing: 1 }),
        C("rebanho", 60, "stand", { dy: 0.6 }),
      ] }),                                                                         // anunciou o parentesco; ela correu a contar ao pai

      // ---- ATO 3: Labão acolhe e propõe o salário (v.13-20)
      b(13, { set: "casa-labao", props: CASA_LABAO, env: { night: 0.06, glory: 0.35 }, cast: [
        C("patriarca", -48, "raise", { dy: 0.5, facing: 1 }),
        C("jaco", -2, "stand", { dy: 0.5, facing: -1 }),
        C("mulherComum", 66, "stand", { dy: 0.58, facing: -1 }),
      ] }),                                                                         // Labão corre, abraça, beija e leva-o à sua casa
      b(14, { by: "patriarca", q: "Então Labão disse-lhe: ", cast: [
        C("patriarca", -30, "stand", { dy: 0.5, facing: 1 }),
        C("jaco", 12, "stand", { dy: 0.5, facing: -1 }),
        C("mulherComum", 78, "stand", { dy: 0.58, facing: -1 }),
      ] }),                                                                         // "és tu o meu osso e a minha carne" — um mês inteiro
      b(15, { by: "patriarca", q: "Depois disse Labão a Jacó: ", env: { glory: 0.25 }, cast: [
        C("patriarca", -34, "point", { dy: 0.5, facing: 1 }),
        C("jaco", 16, "stand", { dy: 0.52, facing: -1 }),
        C("rebanho", 190, "stand", { dy: 0.42 }),
      ] }),                                                                         // hás de servir-me de graça? declara o teu salário
      b(16, { cast: [
        C("patriarca", -72, "stand", { dy: 0.5, facing: 1 }),
        C("jaco", -26, "stand", { dy: 0.54, facing: 1 }),
        C("mulherComum", 34, "stand", { dy: 0.5, id: "lia" }),
        C("mulherComum", 84, "stand", { dy: 0.5 }),
      ] }),                                                                         // as duas filhas: Lia a mais velha, Raquel a menor
      b(17, { env: { glory: 0.32 }, cast: [
        C("patriarca", -84, "stand", { dy: 0.52, facing: 1 }),
        C("jaco", -30, "stand", { dy: 0.56, facing: 1 }),
        C("mulherComum", 30, "stand", { dy: 0.52, id: "lia" }),
        C("mulherComum", 88, "stand", { dy: 0.48, glow: 0.3 }),
      ] }),                                                                         // Lia de olhos tenros; Raquel formosa à vista
      b(18, { by: "jaco", q: "e disse: ", cast: [
        C("patriarca", -66, "stand", { dy: 0.52, facing: 1 }),
        C("jaco", -14, "point", { dy: 0.5, facing: 1 }),
        C("mulherComum", 34, "stand", { dy: 0.54, id: "lia" }),
        C("mulherComum", 92, "stand", { dy: 0.48, glow: 0.3 }),
      ] }),                                                                         // "Sete anos te servirei por Raquel, tua filha menor"
      b(19, { by: "patriarca", q: "Então disse Labão: ", cast: [
        C("patriarca", -52, "raise", { dy: 0.5, facing: 1 }),
        C("jaco", 4, "stand", { dy: 0.52, facing: -1 }),
        C("mulherComum", 92, "stand", { dy: 0.48, glow: 0.3 }),
      ] }),                                                                         // melhor é que eu a dê a ti — fica comigo
      b(20, { env: { night: 0, glory: 0.5 }, cast: [
        C("jaco", -46, "walk", { dy: 0.52, facing: 1 }),
        C("mulherComum", 74, "stand", { dy: 0.46, glow: 0.35 }),
        C("rebanho", 186, "stand", { dy: 0.4 }),
        C("rebanho", 262, "stand", { dy: 0.62, id: "rebanho2" }),
      ] }),                                                                         // sete anos que lhe pareceram POUCOS DIAS, de tanto amar

      // ---- ATO 4: a noite da troca (v.21-25) — decoro total, o palco escurece
      b(21, { by: "jaco", q: "E disse Jacó a Labão: ", env: { glory: 0.42 }, cast: [
        C("jaco", -30, "raise", { dy: 0.5, facing: 1 }),
        C("patriarca", 24, "stand", { dy: 0.52, facing: -1 }),
        C("mulherComum", 96, "stand", { dy: 0.48, glow: 0.3 }),
      ] }),                                                                         // "Dá-me minha mulher, meus dias são cumpridos"
      b(22, { set: "banquete", props: BANQUETE, env: { night: 0.72, glory: 0.28 }, cast: [
        C("patriarca", -58, "raise", { dy: 0.5, facing: 1 }),
        C("jaco", -6, "stand", { dy: 0.52, facing: -1 }),
        C("multidao", 200, "stand", { dy: 0.3, id: "convidados" }),
      ] }),                                                                         // Labão reúne os homens do lugar e faz um banquete
      b(23, { env: { night: 0.85, glory: 0.1 }, cast: [
        C("patriarca", -70, "point", { dy: 0.52, facing: 1 }),
        C("mulherComum", -18, "walk", { dy: 0.5, id: "lia", facing: 1 }),
        C("jaco", 62, "stand", { dy: 0.54, facing: -1 }),
        C("multidao", 214, "stand", { dy: 0.3, id: "convidados" }),
      ] }),                                                                         // à tarde, Labão trouxe Lia a Jacó — o palco escurece
      b(24, { env: { night: 0.88 }, cast: [
        C("patriarca", -76, "stand", { dy: 0.52, facing: 1 }),
        C("mulherComum", -20, "stand", { dy: 0.5, id: "lia" }),
        C("mulherComum", 26, "stand", { dy: 0.6, id: "zilpa" }),
        C("jaco", 84, "stand", { dy: 0.54, facing: -1 }),
      ] }),                                                                         // Labão deu Zilpa, sua serva, a Lia por serva
      b(25, { by: "jaco", q: "pelo que disse a Labão: ", env: { night: 0.12, storm: 0.3, glory: 0.05 }, cast: [
        C("jaco", -44, "point", { dy: 0.5, facing: 1 }),
        C("patriarca", 22, "stand", { dy: 0.52, facing: -1 }),
        C("mulherComum", 96, "bow", { dy: 0.58, id: "lia" }),
      ] }),                                                                         // PELA MANHÃ, eis que era Lia! "Por que me fizeste isso?"

      // ---- ATO 5: mais sete anos (v.26-30)
      b(26, { by: "patriarca", q: "E disse Labão: ", env: { storm: 0.18 }, cast: [
        C("patriarca", -20, "stand", { dy: 0.5, facing: 1 }),
        C("jaco", 34, "stand", { dy: 0.52, facing: -1 }),
        C("mulherComum", 100, "stand", { dy: 0.58, id: "lia" }),
      ] }),                                                                         // não se faz assim: a menor antes da primogênita
      b(27, { by: "patriarca", env: { storm: 0.05 } }),                             // cumpre a semana desta; serve outros sete anos
      b(28, { set: "casa-labao", props: CASA_LABAO, env: { night: 0.05, storm: 0, glory: 0.42 }, cast: [
        C("patriarca", -76, "stand", { dy: 0.5, facing: 1 }),
        C("jaco", -18, "stand", { dy: 0.52, facing: 1 }),
        C("mulherComum", 34, "stand", { dy: 0.48, glow: 0.3 }),
        C("mulherComum", 96, "stand", { dy: 0.6, id: "lia" }),
      ] }),                                                                         // cumprida a semana de Lia, deu-lhe Raquel por mulher
      b(29, { cast: [
        C("patriarca", -80, "point", { dy: 0.5, facing: 1 }),
        C("jaco", -22, "stand", { dy: 0.52, facing: 1 }),
        C("mulherComum", 30, "stand", { dy: 0.48, glow: 0.3 }),
        C("mulherComum", 76, "stand", { dy: 0.6, id: "bila" }),
        C("mulherComum", 118, "stand", { dy: 0.66, id: "lia" }),
      ] }),                                                                         // Labão deu Bila, sua serva, a Raquel por serva
      b(30, { env: { night: 0.12, glory: 0.3 }, cast: [
        C("jaco", -26, "stand", { dy: 0.5, facing: 1 }),
        C("mulherComum", 18, "stand", { dy: 0.48, glow: 0.35, facing: -1 }),
        C("mulherComum", 150, "stand", { dy: 0.66, id: "lia", facing: 1 }),
        C("rebanho", 250, "stand", { dy: 0.34 }),
      ] }),                                                                         // amou mais a Raquel; e serviu outros sete anos

      // ---- ATO 6: os filhos de Lia (v.31-35) — a dor da preterida, com ternura
      b(31, { set: "tendas", props: TENDAS, env: { night: 0.04, glory: 0.45 }, cast: [
        C("mulherComum", -18, "stand", { dy: 0.5, glow: 0.4 }),
        C("mulherComum", 128, "stand", { dy: 0.62, id: "raquel", facing: -1 }),
        C("jaco", 62, "stand", { dy: 0.56, facing: 1 }),
      ] }),                                                                         // o SENHOR viu que Lia era desprezada (luz, nunca figura)
      b(32, { by: "mulherComum", q: "pois disse: ", env: { glory: 0.4 }, cast: [
        C("mulherComum", -22, "kneel", { dy: 0.5, glow: 0.25 }),
        C("homem", 24, "stand", { dy: 0.6, id: "ruben", scale: 0.62 }),
        C("mulherComum", 138, "stand", { dy: 0.64, id: "raquel", facing: -1 }),
      ] }),                                                                         // RÚBEN — "o SENHOR atendeu à minha aflição"
      b(33, { by: "mulherComum", q: "dizendo: ", env: { glory: 0.42 }, cast: [
        C("mulherComum", -30, "stand", { dy: 0.5, glow: 0.25 }),
        C("homem", 16, "stand", { dy: 0.6, id: "ruben", scale: 0.66 }),
        C("homem", 52, "stand", { dy: 0.62, id: "simeao", scale: 0.6 }),
        C("mulherComum", 146, "stand", { dy: 0.66, id: "raquel", facing: -1 }),
      ] }),                                                                         // SIMEÃO — "o SENHOR ouviu que eu era desprezada"
      b(34, { by: "mulherComum", q: "dizendo: ", env: { glory: 0.45 }, cast: [
        C("mulherComum", -36, "stand", { dy: 0.5, glow: 0.3 }),
        C("homem", 6, "stand", { dy: 0.58, id: "ruben", scale: 0.7 }),
        C("homem", 42, "stand", { dy: 0.62, id: "simeao", scale: 0.64 }),
        C("homem", 78, "stand", { dy: 0.66, id: "levi", scale: 0.6 }),
        C("jaco", 150, "stand", { dy: 0.5, facing: -1 }),
      ] }),                                                                         // LEVI — "agora esta vez se unirá meu marido a mim"
      b(35, { by: "mulherComum", q: "dizendo: ", env: { glory: 0.55, night: 0 }, cast: [
        C("mulherComum", -40, "raise", { dy: 0.5, glow: 0.5 }),
        C("homem", -2, "stand", { dy: 0.58, id: "ruben", scale: 0.7 }),
        C("homem", 34, "stand", { dy: 0.62, id: "simeao", scale: 0.66 }),
        C("homem", 70, "stand", { dy: 0.66, id: "levi", scale: 0.62 }),
        C("homem", 106, "stand", { dy: 0.7, id: "juda", scale: 0.58 }),
      ] }),                                                                         // JUDÁ — "Esta vez louvarei ao SENHOR" (o louvor rompe)
    ],
  },

  // ------------------------------------------------------------------ Gn 30
  // A GUERRA DAS ESPOSAS E O REBANHO. Arco de env: a inveja acende storm (0.3)
  // → tréguas e nascimentos em glória morna (0.35) → a ceifa dourada das
  // mandrágoras e o entardecer da barganha (night 0.45) → o CLARÃO de JOSÉ
  // (glory 0.8) → o pragmatismo dos pastos (glory 0.2) → a prosperidade que
  // fecha o capítulo (glory 0.4, sem noite).
  30: {
    start: { terrain: "field", night: 0.05, glory: 0.25, storm: 0, fire: 0 },
    beats: [
      // ---- ATO 1: a inveja de Raquel e os filhos de Bila (v.1-8)
      b(1, { by: "mulherComum", q: "e disse a Jacó: ", props: TENDAS, env: { storm: 0.18 }, cast: [
        C("mulherComum", -34, "raise", { dy: 0.5 }),
        C("jaco", 20, "stand", { dy: 0.52, facing: -1 }),
        C("mulherComum", 150, "stand", { dy: 0.64, id: "lia", facing: -1 }),
        C("homem", 196, "stand", { dy: 0.7, id: "ruben", scale: 0.68 }),
      ] }),                                                                         // "Dá-me filhos, se não morro" — a inveja da irmã
      b(2, { by: "jaco", q: "e disse: ", env: { storm: 0.32, fire: 0.12 }, cast: [
        C("mulherComum", -46, "bow", { dy: 0.52 }),
        C("jaco", 8, "point", { dy: 0.5, facing: -1 }),
        C("mulherComum", 156, "stand", { dy: 0.64, id: "lia", facing: -1 }),
      ] }),                                                                         // a ira de Jacó: "Estou eu no lugar de Deus?"
      b(3, { by: "mulherComum", q: "E ela disse: ", env: { storm: 0.15, fire: 0 }, cast: [
        C("mulherComum", -40, "point", { dy: 0.5, facing: 1 }),
        C("mulherComum", 6, "stand", { dy: 0.6, id: "bila" }),
        C("jaco", 60, "stand", { dy: 0.52, facing: -1 }),
      ] }),                                                                         // "Eis aqui minha serva Bila… receba filhos por ela"
      b(4, { env: { storm: 0 }, cast: [
        C("mulherComum", -56, "stand", { dy: 0.52 }),
        C("mulherComum", -8, "stand", { dy: 0.56, id: "bila" }),
        C("jaco", 44, "stand", { dy: 0.5, facing: -1 }),
      ] }),                                                                         // deu-lhe Bila, sua serva, por mulher
      b(5, { env: { glory: 0.3 }, cast: [
        C("mulherComum", -50, "stand", { dy: 0.52 }),
        C("mulherComum", -6, "kneel", { dy: 0.58, id: "bila" }),
        C("jaco", 96, "stand", { dy: 0.5, facing: -1 }),
      ] }),                                                                         // concebeu Bila e deu a Jacó um filho
      b(6, { by: "mulherComum", q: "Então disse Raquel: ", env: { glory: 0.38 }, cast: [
        C("mulherComum", -34, "raise", { dy: 0.5, glow: 0.3 }),
        C("mulherComum", 14, "stand", { dy: 0.6, id: "bila" }),
        C("homem", 58, "stand", { dy: 0.66, id: "da", scale: 0.58 }),
      ] }),                                                                         // DÃ — "Julgou-me Deus… e me deu um filho"
      b(7, { env: { glory: 0.3 }, cast: [
        C("mulherComum", -40, "stand", { dy: 0.5 }),
        C("mulherComum", 4, "kneel", { dy: 0.58, id: "bila" }),
        C("homem", 52, "stand", { dy: 0.66, id: "da", scale: 0.6 }),
      ] }),                                                                         // Bila concebeu outra vez: o segundo filho
      b(8, { by: "mulherComum", q: "Então disse Raquel: ", env: { storm: 0.2, glory: 0.34 }, cast: [
        C("mulherComum", -38, "raise", { dy: 0.5, glow: 0.3 }),
        C("homem", 12, "stand", { dy: 0.64, id: "da", scale: 0.6 }),
        C("homem", 50, "stand", { dy: 0.68, id: "naftali", scale: 0.56 }),
        C("mulherComum", 168, "stand", { dy: 0.62, id: "lia", facing: -1 }),
      ] }),                                                                         // NAFTALI — "com grandes lutas tenho lutado… também venci"

      // ---- ATO 2: a resposta de Lia — Zilpa dá Gade e Aser (v.9-13)
      b(9, { env: { storm: 0.08 }, cast: [
        C("mulherComum", -26, "point", { dy: 0.5, facing: 1 }),
        C("mulherComum", 20, "stand", { dy: 0.58, id: "zilpa" }),
        C("jaco", 74, "stand", { dy: 0.52, facing: -1 }),
      ] }),                                                                         // Lia, que cessara de ter filhos, dá Zilpa a Jacó
      b(10, { env: { storm: 0, glory: 0.3 }, cast: [
        C("mulherComum", -32, "stand", { dy: 0.5 }),
        C("mulherComum", 10, "kneel", { dy: 0.58, id: "zilpa" }),
      ] }),                                                                         // Zilpa deu um filho a Jacó
      b(11, { by: "mulherComum", q: "Então disse Lia: ", env: { glory: 0.36 }, cast: [
        C("mulherComum", -30, "raise", { dy: 0.5, glow: 0.28 }),
        C("mulherComum", 12, "stand", { dy: 0.58, id: "zilpa" }),
        C("homem", 56, "stand", { dy: 0.66, id: "gade", scale: 0.56 }),
      ] }),                                                                         // GADE — "Afortunada!"
      b(12, { cast: [
        C("mulherComum", -34, "stand", { dy: 0.5 }),
        C("mulherComum", 6, "kneel", { dy: 0.58, id: "zilpa" }),
        C("homem", 52, "stand", { dy: 0.66, id: "gade", scale: 0.58 }),
      ] }),                                                                         // Zilpa deu a Jacó um segundo filho
      b(13, { by: "mulherComum", q: "Então disse Lia: ", env: { glory: 0.4 }, cast: [
        C("mulherComum", -36, "raise", { dy: 0.5, glow: 0.3 }),
        C("homem", 8, "stand", { dy: 0.64, id: "gade", scale: 0.58 }),
        C("homem", 46, "stand", { dy: 0.68, id: "aser", scale: 0.54 }),
      ] }),                                                                         // ASER — "as filhas me terão por bem-aventurada"

      // ---- ATO 3: as mandrágoras (v.14-21) — a ceifa do trigo e a barganha
      b(14, { by: "mulherComum", q: "Então disse Raquel a Lia: ", set: "ceifa", props: CEIFA, env: { night: 0, glory: 0.32, storm: 0 }, cast: [
        C("homem", -78, "walk", { dy: 0.56, id: "ruben", scale: 0.7, facing: 1 }),
        C("mulherComum", -14, "stand", { dy: 0.54, id: "lia" }),
        C("mulherComum", 44, "point", { dy: 0.48, facing: -1 }),
      ] }),                                                                         // Rúben acha mandrágoras; Raquel: "Ora dá-me das mandrágoras"
      b(15, { by: "mulherComum", q: "Então disse Raquel: ", env: { storm: 0.14 }, cast: [
        C("mulherComum", -26, "point", { dy: 0.52, id: "lia", facing: 1 }),
        C("mulherComum", 26, "stand", { dy: 0.5, facing: -1 }),
        C("homem", -120, "stand", { dy: 0.64, id: "ruben", scale: 0.68 }),
      ] }),                                                                         // a troca: "ele se deitará contigo esta noite"
      b(16, { by: "mulherComum", q: "e disse: ", env: { night: 0.45, storm: 0, glory: 0.2 }, cast: [
        C("jaco", 96, "walk", { dy: 0.5, facing: -1 }),
        C("mulherComum", 6, "walk", { dy: 0.52, facing: 1 }),
      ] }),                                                                         // à tarde, Lia sai ao encontro: "certamente te aluguei"
      b(17, { set: "tendas", props: TENDAS, env: { night: 0.06, glory: 0.45 }, cast: [
        C("mulherComum", -24, "kneel", { dy: 0.5, glow: 0.35 }),
        C("jaco", 74, "stand", { dy: 0.54, facing: -1 }),
      ] }),                                                                         // Deus ouviu a Lia: concebeu e deu à luz o quinto filho
      b(18, { by: "mulherComum", q: "Então disse Lia: ", env: { glory: 0.48 }, cast: [
        C("mulherComum", -30, "raise", { dy: 0.5, glow: 0.35 }),
        C("homem", 14, "stand", { dy: 0.64, id: "issacar", scale: 0.56 }),
        C("homem", 52, "stand", { dy: 0.68, id: "levi", scale: 0.66 }),
      ] }),                                                                         // ISSACAR — "Deus me tem dado o meu galardão"
      b(19, { env: { glory: 0.42 }, cast: [
        C("mulherComum", -34, "kneel", { dy: 0.5, glow: 0.3 }),
        C("homem", 10, "stand", { dy: 0.64, id: "issacar", scale: 0.58 }),
      ] }),                                                                         // Lia concebeu outra vez: o sexto filho
      b(20, { by: "mulherComum", q: "E disse Lia: ", env: { glory: 0.5 }, cast: [
        C("mulherComum", -38, "raise", { dy: 0.5, glow: 0.35 }),
        C("homem", 0, "stand", { dy: 0.62, id: "issacar", scale: 0.58 }),
        C("homem", 40, "stand", { dy: 0.66, id: "zebulom", scale: 0.54 }),
        C("jaco", 130, "stand", { dy: 0.52, facing: -1 }),
      ] }),                                                                         // ZEBULOM — "Deus me deu uma boa dádiva"
      b(21, { env: { glory: 0.44 }, cast: [
        C("mulherComum", -34, "stand", { dy: 0.5, glow: 0.3 }),
        C("mulherComum", 6, "stand", { dy: 0.66, id: "dina", scale: 0.56 }),
        C("homem", 46, "stand", { dy: 0.7, id: "zebulom", scale: 0.56 }),
      ] }),                                                                         // e depois teve uma filha: DINÁ

      // ---- ATO 4: Deus lembra-se de Raquel — JOSÉ (v.22-24), o clarão
      b(22, { env: { glory: 0.62, night: 0 }, cast: [
        C("mulherComum", -12, "kneel", { dy: 0.5, glow: 0.5 }),
        C("mulherComum", 150, "stand", { dy: 0.64, id: "lia", facing: -1 }),
      ] }),                                                                         // "E lembrou-se Deus de Raquel" — a luz desce sobre ela
      b(23, { by: "mulherComum", q: "e disse: ", env: { glory: 0.72 }, cast: [
        C("mulherComum", -8, "stand", { dy: 0.5, glow: 0.6 }),
        C("mulherComum", 146, "stand", { dy: 0.64, id: "lia", facing: -1 }),
      ] }),                                                                         // "Tirou-me Deus a minha vergonha"
      b(24, { by: "mulherComum", q: "dizendo: ", env: { glory: 0.8 }, cast: [
        C("mulherComum", -6, "raise", { dy: 0.48, glow: 0.75 }),
        C("jaco", 56, "stand", { dy: 0.52, facing: -1 }),
        C("mulherComum", 150, "stand", { dy: 0.64, id: "lia", facing: -1 }),
      ] }),                                                                         // JOSÉ — "O SENHOR me acrescente outro filho" (ápice)

      // ---- ATO 5: o acordo dos rebanhos (v.25-36)
      b(25, { by: "jaco", q: "disse Jacó a Labão: ", set: "pastos", props: PASTOS, env: { terrain: "field", glory: 0.45, night: 0.04 }, cast: [
        C("jaco", -34, "point", { dy: 0.5, facing: 1 }),
        C("patriarca", 26, "stand", { dy: 0.52, facing: -1 }),
        C("rebanho", 180, "stand", { dy: 0.36 }),
      ] }),                                                                         // "Deixa-me ir… ao meu lugar e à minha terra"
      b(26, { by: "jaco", env: { glory: 0.4 } }),                                   // dá-me as minhas mulheres e os meus filhos
      b(27, { by: "patriarca", q: "Então lhe disse Labão: ", env: { glory: 0.35 }, cast: [
        C("jaco", -28, "stand", { dy: 0.5, facing: 1 }),
        C("patriarca", 20, "raise", { dy: 0.52, facing: -1 }),
        C("rebanho", 180, "stand", { dy: 0.36 }),
      ] }),                                                                         // "o SENHOR me abençoou por amor de ti"
      b(28, { by: "patriarca", q: "E disse mais: " }),                              // determina-me o teu salário, que to darei
      b(29, { by: "jaco", q: "Então lhe disse: ", env: { glory: 0.3 }, cast: [
        C("jaco", -22, "point", { dy: 0.5, facing: 1 }),
        C("patriarca", 30, "stand", { dy: 0.52, facing: -1 }),
        C("rebanho", 176, "stand", { dy: 0.36 }),
        C("rebanho", 268, "stand", { dy: 0.6, id: "rebanho2" }),
      ] }),                                                                         // tu sabes como te tenho servido e como passou o teu gado
      b(30, { by: "jaco", env: { glory: 0.26 } }),                                  // o pouco aumentou em grande número — e a minha casa?
      b(31, { by: "jaco", q: "Então disse Jacó: ", env: { glory: 0.24 }, cast: [
        C("jaco", -18, "stand", { dy: 0.5, facing: 1 }),
        C("patriarca", 34, "point", { dy: 0.52, facing: -1 }),
        C("rebanho", 170, "stand", { dy: 0.34 }),
        C("rebanho", 262, "stand", { dy: 0.58, id: "rebanho2" }),
      ] }),                                                                         // "Nada me darás" — tornarei a apascentar o teu rebanho
      b(32, { by: "jaco", cast: [
        C("jaco", 12, "walk", { dy: 0.44, facing: 1 }),
        C("patriarca", -52, "stand", { dy: 0.54, facing: 1 }),
        C("rebanho", 150, "stand", { dy: 0.32 }),
        C("rebanho", 246, "stand", { dy: 0.56, id: "rebanho2" }),
      ] }),                                                                         // separar os salpicados, malhados e morenos: o salário
      b(33, { by: "jaco" }),                                                        // a minha justiça testificará por mim amanhã
      b(34, { by: "patriarca", q: "Então disse Labão: ", env: { glory: 0.28 }, cast: [
        C("jaco", -20, "stand", { dy: 0.5, facing: 1 }),
        C("patriarca", 30, "raise", { dy: 0.52, facing: -1 }),
        C("rebanho", 170, "stand", { dy: 0.34 }),
      ] }),                                                                         // "Quem dera seja conforme a tua palavra"
      b(35, { env: { night: 0.18, glory: 0.2 }, cast: [
        C("patriarca", -40, "point", { dy: 0.5, facing: 1 }),
        C("homem", 24, "walk", { dy: 0.56, id: "filhoLabao1", facing: 1 }),
        C("homem", 78, "walk", { dy: 0.64, id: "filhoLabao2", facing: 1 }),
        C("rebanho", 200, "walk", { dy: 0.34 }),
        C("rebanho", 292, "walk", { dy: 0.58, id: "rebanho2" }),
      ] }),                                                                         // separou os listrados e malhados nas mãos dos seus filhos
      b(36, { env: { night: 0.3, glory: 0.15 }, cast: [
        C("patriarca", 300, "walk", { dy: 0.28, facing: 1 }),
        C("jaco", -40, "stand", { dy: 0.52, facing: 1 }),
        C("rebanho", 120, "stand", { dy: 0.42 }),
        C("rebanho", 214, "stand", { dy: 0.64, id: "rebanho2" }),
      ] }),                                                                         // três dias de caminho entre eles; Jacó apascenta o resto

      // ---- ATO 6: as varas nos bebedouros e a prosperidade (v.37-43)
      b(37, { set: "bebedouros", props: BEBEDOUROS, env: { night: 0.06, glory: 0.25 }, cast: [
        C("jaco", -78, "kneel", { dy: 0.5, facing: 1 }),
        C("rebanho", 170, "stand", { dy: 0.44 }),
      ] }),                                                                         // Jacó descasca riscas brancas nas varas verdes
      b(38, { env: { glory: 0.3 }, cast: [
        C("jaco", -46, "point", { dy: 0.46, facing: -1 }),
        C("rebanho", 110, "walk", { dy: 0.42 }),
        C("rebanho", 216, "walk", { dy: 0.62, id: "rebanho2" }),
      ] }),                                                                         // pôs as varas nos canos e bebedouros, diante dos rebanhos
      b(39, { env: { glory: 0.34 }, cast: [
        C("jaco", -60, "stand", { dy: 0.5, facing: 1 }),
        C("rebanho", 84, "stand", { dy: 0.4 }),
        C("rebanho", 200, "stand", { dy: 0.62, id: "rebanho2" }),
        C("rebanho", 292, "stand", { dy: 0.3, id: "rebanho3" }),
      ] }),                                                                         // conceberam diante das varas: crias listradas e malhadas
      b(40, { env: { glory: 0.3 }, cast: [
        C("jaco", 10, "point", { dy: 0.46, facing: 1 }),
        C("rebanho", -70, "stand", { dy: 0.4 }),
        C("rebanho", 180, "stand", { dy: 0.6, id: "rebanho2" }),
        C("rebanho", 286, "stand", { dy: 0.28, id: "rebanho3" }),
      ] }),                                                                         // separou o seu rebanho à parte, longe do de Labão
      b(41, { env: { glory: 0.34 }, cast: [
        C("jaco", -50, "point", { dy: 0.48, facing: -1 }),
        C("rebanho", 96, "stand", { dy: 0.42 }),
        C("rebanho", 200, "stand", { dy: 0.64, id: "rebanho2" }),
        C("rebanho", 300, "stand", { dy: 0.3, id: "rebanho3" }),
      ] }),                                                                         // nas ovelhas fortes, punha as varas nos canos
      b(42, { env: { night: 0.14, glory: 0.28 }, cast: [
        C("jaco", -56, "stand", { dy: 0.5, facing: 1 }),
        C("rebanho", 76, "stand", { dy: 0.4 }),
        C("rebanho", 260, "lie", { dy: 0.68, id: "rebanho2" }),
      ] }),                                                                         // nas fracas não as punha: as fortes ficaram de Jacó
      b(43, { props: RIQUEZA, env: { night: 0, glory: 0.4 }, cast: [
        C("jaco", -30, "raise", { dy: 0.48, glow: 0.3, facing: 1 }),
        C("servo", 42, "stand", { dy: 0.58, facing: -1 }),
        C("mulherComum", 86, "stand", { dy: 0.64, id: "serva" }),
        C("rebanho", 170, "stand", { dy: 0.36 }),
        C("rebanho", 286, "stand", { dy: 0.62, id: "rebanho2" }),
      ] }),                                                                         // "cresceu o homem em grande maneira" — rebanhos, servos, servas
    ],
  },
};
