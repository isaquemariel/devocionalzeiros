// ============================================================================
// GÊNESIS — cena viva, caps. 25–26 (DUAS NAÇÕES e OS POÇOS).
//
// Cap. 25: a última primavera de Abraão (Quetura e os filhos do oriente), a
// sua MORTE "velho e farto de dias" — sepultado por Isaque e Ismael na cova
// de Macpela —, o memorial das gerações de Ismael, o ventre estéril de Rebeca
// aberto pela oração, o oráculo "duas nações há no teu ventre", o nascimento
// dos gêmeos e a VENDA DA PRIMOGENITURA junto à panela de lentilhas.
// Cap. 26: Isaque em Gerar — a fome, a promessa renovada ("não desças ao
// Egito"), a mentira sobre Rebeca descoberta pela janela do rei, a colheita
// de cem por um, a GUERRA DOS POÇOS (Eseque, Sitna, Reobote), a aparição
// noturna em Berseba, o pacto com Abimeleque e a amargura das noras hititas.
//
// DEUS NUNCA É DESENHADO: quando "o Senhor disse"/"apareceu-lhe o Senhor" o
// beat fica SEM `by` (narração pura) e a Sua presença é GLÓRIA no ambiente.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ============================================================================
// PADRÃO DE PALCO: o corredor dx -100..-190 fica LIVRE na decoração fixa —
// é a vaga do "extra do versículo" (a cova de Macpela, o poço em disputa, o
// feixe da colheita, o altar de Berseba). Um objeto por vaga.
// ============================================================================

// ------------------------------------------------------------- Gn 25: sets
// O ACAMPAMENTO do velho Abraão no Neguebe: tendas, palmeira, cacharia.
const ACAMPAMENTO: StagePropSpec[] = [
  P("tent", -40, 1.2, undefined, 0.12),
  P("tent", 120, 0.95, undefined, 0.3),
  P("palm", 250, 1.15, undefined, 0.15),
  P("rock", -280, 0.95, undefined, 0.35),
  P("crate", -232, 0.85, undefined, 0.52),
  P("amphora", 62, 0.85, undefined, 0.58),
  P("bush", 200, 0.9, undefined, 0.66),
  P("well", 320, 1.0, undefined, 0.2),
  P("grass", -66, 1.0, undefined, 0.8),
  P("grass", 296, 0.95, undefined, 0.74),
];

// MACPELA: a cova comprada aos filhos de Hete, "em frente de Manre" — a rocha
// grande do sepulcro entra destacada no corredor, sob os carvalhais.
const MACPELA: StagePropSpec[] = [
  { ...P("rock", -134, 1.45, undefined, 0.18), tag: "cova-macpela" },   // a cova de Macpela — o sepulcro
  P("tree", 62, 1.3, undefined, 0.1),       // os carvalhais de Manre
  P("tree", 232, 1.05, undefined, 0.36),
  P("rock", 300, 0.95, undefined, 0.5),
  P("rock", -292, 1.0, undefined, 0.3),
  P("bush", -44, 0.85, undefined, 0.66),
  P("grass", 130, 1.0, undefined, 0.82),
  P("grass", -234, 0.95, undefined, 0.72),
];

// O DESERTO DE ISMAEL: "de Havilá até Sur" — vilas e castelos como tendas
// espalhadas até o horizonte, e o poço que sustenta os doze príncipes.
const DESERTO_ISMAEL: StagePropSpec[] = [
  P("tent", -50, 1.1, undefined, 0.15),
  P("tent", 92, 0.9, undefined, 0.34),
  P("tent", 212, 0.8, undefined, 0.48),
  P("well", -132, 1.05, undefined, 0.22),   // o poço do deserto — vaga de extra
  P("palm", -262, 1.15, undefined, 0.2),
  P("palm", 292, 1.0, undefined, 0.3),
  P("rock", 150, 0.85, undefined, 0.62),
  P("bush", -300, 0.9, undefined, 0.56),
  P("grass", 20, 1.0, undefined, 0.78),
  P("grass", 252, 0.95, undefined, 0.68),
];

// BEER-LAAI-RÓI: a casa de Isaque — a tenda, o altar da oração e o poço
// "do Vivente que me vê", onde ele habitava depois da morte do pai.
const CASA_ISAQUE: StagePropSpec[] = [
  P("tent", -30, 1.25, undefined, 0.14),
  P("well", -140, 1.1, undefined, 0.2),     // o poço Beer-Laai-Rói
  P("altar", 112, 1.0, undefined, 0.3),
  P("tree", 222, 1.2, undefined, 0.12),
  P("palm", -272, 1.05, undefined, 0.26),
  P("crate", -228, 0.85, undefined, 0.52),
  P("rock", 292, 0.9, undefined, 0.5),
  P("bush", 58, 0.85, undefined, 0.64),
  P("grass", -70, 1.0, undefined, 0.82),
  P("grass", 172, 0.95, undefined, 0.76),
];

// O CAMPO DOS DOIS CAMINHOS: mato aberto para o caçador de um lado, a tenda
// do "homem simples" do outro — o palco já divide os irmãos antes do guisado.
const CAMPO_IRMAOS: StagePropSpec[] = [
  P("tree", -282, 1.25, undefined, 0.1),
  P("tree", 182, 1.15, undefined, 0.16),
  P("tree", 302, 1.0, undefined, 0.42),
  P("tent", 130, 1.05, undefined, 0.2),     // Jacó, habitando em tendas
  P("bush", -58, 0.9, undefined, 0.36),
  P("bush", 248, 0.9, undefined, 0.64),
  P("rock", 88, 0.85, undefined, 0.56),
  P("grass", -200, 1.05, undefined, 0.78),
  P("grass", 40, 1.0, undefined, 0.86),
  P("grass", 220, 0.95, undefined, 0.72),
];

// A FOGUEIRA DO GUISADO: a panela vermelha de lentilhas no meio do palco —
// é por ela que uma primogenitura vai ser trocada.
const FOGUEIRA: StagePropSpec[] = [
  P("campfire", -12, 1.15, 1, 0.42),        // o guisado vermelho ao fogo
  P("tent", -62, 1.2, undefined, 0.12),
  P("tent", 132, 0.95, undefined, 0.28),
  P("amphora", 72, 0.85, undefined, 0.56),
  P("crate", 38, 0.8, undefined, 0.68),
  P("rock", 212, 0.85, undefined, 0.52),
  P("palm", 282, 1.05, undefined, 0.2),
  P("bush", -252, 0.9, undefined, 0.5),
  P("crate", -218, 0.85, undefined, 0.64),
  P("grass", -32, 1.0, undefined, 0.84),
  P("grass", 172, 0.95, undefined, 0.76),
];

// ------------------------------------------------------------- Gn 26: sets
// A TERRA DA FOME: mesma paisagem dos patriarcas, mas seca — pedra à mostra,
// capim ralo, o poço no corredor esperando água que não vem.
const TERRA_SECA: StagePropSpec[] = [
  P("tent", -40, 1.15, undefined, 0.15),
  P("well", -140, 1.05, undefined, 0.22),   // o poço da seca — vaga de extra
  P("rock", -282, 1.0, undefined, 0.3),
  P("rock", 208, 0.9, undefined, 0.56),
  P("rock", 300, 0.85, undefined, 0.36),
  P("palm", 150, 1.0, undefined, 0.24),
  P("bush", 88, 0.8, undefined, 0.62),
  P("bush", -232, 0.85, undefined, 0.5),
  P("grass", 40, 0.9, undefined, 0.84),
  P("grass", 252, 0.85, undefined, 0.72),
];

// GERAR, cidade dos filisteus: a torre do palácio de Abimeleque, o mercado,
// o poço da praça. Corredor livre para a JANELA (v.8) e o feixe (v.12).
const GERAR: StagePropSpec[] = [
  P("tower", 192, 1.35, undefined, 0.08),   // o palácio de Abimeleque
  P("tower", 302, 1.05, undefined, 0.22),
  P("stall", -292, 1.0, undefined, 0.22),
  P("crate", -256, 0.85, undefined, 0.46),
  P("amphora", -224, 0.8, undefined, 0.62),
  P("amphora", 92, 0.85, undefined, 0.56),
  P("well", 252, 1.0, undefined, 0.42),
  P("tree", -62, 1.15, undefined, 0.1),
  P("palm", 42, 1.0, undefined, 0.12),
  P("bush", 132, 0.85, undefined, 0.68),
  P("grass", -30, 1.0, undefined, 0.86),
  P("grass", 152, 0.95, undefined, 0.8),
];

// A JANELA por onde o rei olha e vê Isaque brincando com Rebeca (v.8-11).
const GERAR_JANELA: StagePropSpec[] = [
  ...GERAR,
  P("door", -134, 1.2, undefined, 0.24),
];

// CEM POR UM: a colheita transborda — os feixes tomam a vaga dos extras.
const GERAR_FARTO: StagePropSpec[] = [
  ...GERAR,
  P("sheaf", -160, 1.2, undefined, 0.18),
  P("sheaf", -108, 1.0, undefined, 0.36),
];

// OS POÇOS ENTULHADOS: a inveja filisteia enche de terra o que Abraão cavou.
const GERAR_POCOS_ENTULHADOS: StagePropSpec[] = [
  ...GERAR,
  P("well", -136, 1.15, undefined, 0.24),
];

// VALE DE GERAR — 1º poço: ESEQUE. "Esta água é nossa" — a contenda.
const POCO_ESEQUE: StagePropSpec[] = [
  P("well", -132, 1.25, undefined, 0.2),    // o poço de águas vivas — disputado
  P("tent", 122, 1.05, undefined, 0.18),
  P("rock", -282, 1.0, undefined, 0.32),
  P("rock", 242, 0.9, undefined, 0.52),
  P("palm", 300, 1.05, undefined, 0.24),
  P("crate", -230, 0.85, undefined, 0.56),
  P("bush", -50, 0.85, undefined, 0.62),
  P("grass", 58, 1.0, undefined, 0.82),
  P("grass", 202, 0.95, undefined, 0.74),
];

// 2º poço: SITNA (inimizade) — o de Eseque fica para trás, ao fundo.
const POCO_SITNA: StagePropSpec[] = [
  P("well", -168, 1.25, undefined, 0.16),   // o novo poço — Sitna
  P("well", 34, 0.85, undefined, 0.44),     // Eseque, abandonado atrás
  P("tent", 148, 1.05, undefined, 0.2),
  P("rock", -286, 1.0, undefined, 0.34),
  P("rock", 248, 0.9, undefined, 0.56),
  P("palm", 302, 1.05, undefined, 0.26),
  P("crate", -236, 0.85, undefined, 0.58),
  P("bush", -62, 0.85, undefined, 0.64),
  P("grass", 96, 1.0, undefined, 0.84),
  P("grass", 208, 0.95, undefined, 0.74),
];

// 3º poço: REOBOTE — "porque agora nos alargou o Senhor". Palco ARREJADO:
// os dois poços velhos somem do quadro, sobra espaço e verde.
const POCO_REOBOTE: StagePropSpec[] = [
  P("well", -140, 1.3, undefined, 0.18),    // Reobote — largueza
  P("tree", 178, 1.25, undefined, 0.12),
  P("tree", 306, 1.05, undefined, 0.4),
  P("tent", 96, 1.1, undefined, 0.24),
  P("palm", -276, 1.15, undefined, 0.22),
  P("bush", -46, 0.9, undefined, 0.6),
  P("bush", 246, 0.9, undefined, 0.66),
  P("grass", -196, 1.05, undefined, 0.8),
  P("grass", 30, 1.0, undefined, 0.86),
  P("grass", 214, 0.95, undefined, 0.74),
];

// BERSEBA: o altar erguido de noite, a tenda armada, o poço recém-cavado —
// e as estrelas da promessa por cima.
const BERSEBA: StagePropSpec[] = [
  { ...P("altar", -122, 1.2, undefined, 0.22), tag: "altar-berseba" },   // o altar e a invocação do Nome
  P("tent", -28, 1.25, undefined, 0.14),
  P("well", 104, 1.05, undefined, 0.32),
  P("tree", 212, 1.25, undefined, 0.1),
  P("palm", -272, 1.1, undefined, 0.26),
  P("crate", -222, 0.85, undefined, 0.5),
  P("rock", 300, 0.9, undefined, 0.46),
  P("bush", 44, 0.85, undefined, 0.64),
  P("star", 8, 0.5, undefined, 0.02),
  P("star", 168, 0.4, undefined, 0.04),
  P("grass", -62, 1.0, undefined, 0.82),
  P("grass", 158, 0.95, undefined, 0.76),
];

// O BANQUETE DA ALIANÇA: fogo aceso diante do altar para o rei que veio jurar.
const BERSEBA_BANQUETE: StagePropSpec[] = [
  ...BERSEBA,
  P("campfire", -194, 1.1, 1, 0.32),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Gn 25
  // DUAS NAÇÕES. Arco de env: tarde dourada do velho Abraão → noite do luto
  // em Macpela → manhã da bênção de Isaque → ciclo de tempo no memorial de
  // Ismael → glória do oráculo no ventre → noite fria do desprezo de Esaú.
  25: {
    start: { terrain: "desert", night: 0.14, glory: 0.24 },
    beats: [
      b(1, {                                                                          // Abraão toma Quetura por mulher
        props: ACAMPAMENTO,
        cast: [
          C("abraao", -46, "stand", { dy: 0.5, facing: 1 }),
          C("mulherComum", 6, "stand", { dy: 0.52, facing: -1 }),
        ],
      }),
      b(2, {                                                                          // seis filhos: Zinrã, Jocsã, Midiã…
        env: { glory: 0.3 },
        cast: [
          C("abraao", -60, "stand", { dy: 0.5 }),
          C("mulherComum", -16, "stand", { dy: 0.52 }),
          C("multidao", 116, "stand", { dy: 0.4 }),
        ],
      }),
      b(3),                                                                            // Jocsã gerou Seba e Dedã
      b(4, { env: { glory: 0.36 } }),                                                  // os filhos de Midiã — casa de Quetura
      b(5, {                                                                           // Abraão deu TUDO o que tinha a Isaque
        env: { glory: 0.44 },
        cast: [
          C("abraao", -54, "point", { dy: 0.5, facing: 1 }),
          C("isaque", 4, "stand", { dy: 0.5, facing: -1 }),
          C("mulherComum", -110, "stand", { dy: 0.55 }),
          C("multidao", 150, "stand", { dy: 0.4 }),
        ],
      }),
      b(6, {                                                                           // presentes às concubinas; despedidos ao oriente
        env: { glory: 0.3 },
        cast: [
          C("abraao", -66, "raise", { dy: 0.5, facing: 1 }),
          C("isaque", -18, "stand", { dy: 0.52 }),
          C("multidao", 250, "walk", { dy: 0.36 }),
        ],
      }),
      b(7, {                                                                           // cento e setenta e cinco anos de vida
        env: { night: 0.26, glory: 0.24 },
        cast: [
          C("abraao", -20, "stand", { dy: 0.5 }),
          C("isaque", 44, "stand", { dy: 0.52 }),
        ],
      }),
      b(8, {                                                                           // expirou, velho e FARTO DE DIAS
        env: { night: 0.35, glory: 0.34 },
        cast: [
          C("abraao", -6, "lie", { dy: 0.5, glow: 0.25 }),
          C("isaque", -66, "kneel", { dy: 0.54, facing: 1 }),
        ],
      }),
      b(9, {                                                                           // Isaque e Ismael o sepultam em Macpela
        set: "macpela",
        props: MACPELA,
        env: { night: 0.35, glory: 0.28 },
        cast: [
          C("isaque", -56, "bow", { dy: 0.54, facing: 1 }),
          C("homem", 46, "bow", { dy: 0.54, facing: -1 }),
        ],
      }),
      b(10, {                                                                          // o campo comprado; ali Abraão e Sara
        env: { glory: 0.36 },
        cast: [
          C("isaque", -72, "kneel", { dy: 0.55, facing: 1 }),
          C("homem", 30, "stand", { dy: 0.52, facing: -1 }),
        ],
      }),
      b(11, {                                                                          // Deus abençoa Isaque; poço Beer-Laai-Rói
        set: "beerLaaiRoi",
        props: CASA_ISAQUE,
        env: { night: 0.1, glory: 0.58 },
        cast: [C("isaque", -30, "stand", { dy: 0.5, glow: 0.3 })],
      }),
      b(12, {                                                                          // MEMORIAL: as gerações de Ismael, filho de Agar
        set: "ismael",
        props: DESERTO_ISMAEL,
        env: { night: 0.16, glory: 0.28 },
        cast: [
          C("homem", -24, "stand", { dy: 0.5 }),
          C("mulherComum", 26, "stand", { dy: 0.52 }),
        ],
      }),
      b(13, {                                                                          // Nebaiote, Quedar, Adbeel, Mibsão
        cast: [
          C("homem", -70, "stand", { dy: 0.5 }),
          C("multidao", 96, "stand", { dy: 0.4 }),
        ],
      }),
      b(14, { env: { night: 0.05, glory: 0.34 } }),                                    // Misma, Dumá, Massá — o dia passa
      b(15, { env: { night: 0.24 } }),                                                 // Hadade, Tema, Jetur, Nafis, Quedemá
      b(16, {                                                                          // doze príncipes por suas famílias
        env: { night: 0.08, glory: 0.42 },
        cast: [
          C("homem", -78, "raise", { dy: 0.5 }),
          C("multidao", 110, "stand", { dy: 0.38 }),
        ],
      }),
      b(17, {                                                                          // cento e trinta e sete anos; expirou
        env: { night: 0.42, glory: 0.2 },
        cast: [C("homem", -10, "lie", { dy: 0.52 })],
      }),
      b(18, {                                                                          // habitaram de Havilá até Sur
        env: { night: 0.2, glory: 0.26 },
        cast: [
          C("rebanho", 120, "stand", { dy: 0.44 }),
          C("multidao", -60, "walk", { dy: 0.38 }),
        ],
      }),
      b(19, {                                                                          // as gerações de Isaque, filho de Abraão
        set: "isaqueRebeca",
        props: CASA_ISAQUE,
        env: { night: 0.12, glory: 0.32 },
        cast: [C("isaque", -34, "stand", { dy: 0.5 })],
      }),
      b(20, {                                                                          // aos quarenta anos toma Rebeca por mulher
        env: { glory: 0.4 },
        cast: [
          C("isaque", -40, "stand", { dy: 0.5, facing: 1 }),
          C("rebeca", 8, "stand", { dy: 0.5, facing: -1 }),
        ],
      }),
      b(21, {                                                                          // Rebeca ESTÉRIL; Isaque ora — e ela concebe
        env: { glory: 0.52 },
        cast: [
          C("isaque", 84, "kneel", { dy: 0.48, facing: 1 }),
          C("rebeca", -6, "stand", { dy: 0.54 }),
        ],
      }),
      b(22, {                                                                          // os filhos LUTAVAM dentro dela
        by: "rebeca",
        q: "então disse: ",
        env: { night: 0.22, glory: 0.4 },
        cast: [
          C("rebeca", -10, "kneel", { dy: 0.52 }),
          C("isaque", 74, "stand", { dy: 0.5, facing: -1 }),
        ],
      }),
      b(23, {                                                                          // Deus, o ORÁCULO: duas nações há no teu ventre
        by: "deus", q: "E o Senhor lhe disse: ",
        env: { night: 0.05, glory: 0.6 },
        cast: [
          C("rebeca", -10, "bow", { dy: 0.52, glow: 0.3 }),
          C("isaque", 74, "stand", { dy: 0.5, facing: -1 }),
        ],
      }),
      b(24, {                                                                          // cumpridos os dias: eis GÊMEOS no ventre
        env: { glory: 0.5, night: 0.1 },
        cast: [C("rebeca", -14, "stand", { dy: 0.52 })],
      }),
      b(25, {                                                                          // sai o primeiro, ruivo e peludo: ESAÚ
        env: { glory: 0.46 },
        cast: [
          C("rebeca", -60, "stand", { dy: 0.54 }),
          C("esau", 18, "stand", { dy: 0.48 }),
        ],
      }),
      b(26, {                                                                          // Jacó, agarrado ao calcanhar de Esaú
        env: { glory: 0.44 },
        cast: [
          C("rebeca", -86, "stand", { dy: 0.56 }),
          C("esau", 6, "stand", { dy: 0.48, facing: 1 }),
          C("jaco", 52, "kneel", { dy: 0.5, facing: -1 }),
          C("isaque", 116, "stand", { dy: 0.52, facing: -1 }),
        ],
      }),
      b(27, {                                                                          // Esaú, do campo; Jacó, das tendas
        set: "campoIrmaos",
        props: CAMPO_IRMAOS,
        env: { terrain: "field", night: 0.1, glory: 0.3 },
        cast: [
          C("esau", -70, "walk", { dy: 0.5, facing: -1 }),
          C("jaco", 88, "stand", { dy: 0.5, facing: -1 }),
        ],
      }),
      b(28, {                                                                          // Isaque amava Esaú; Rebeca amava Jacó
        cast: [
          C("esau", -96, "stand", { dy: 0.5, facing: 1 }),
          C("isaque", -46, "stand", { dy: 0.52, facing: -1 }),
          C("jaco", 62, "stand", { dy: 0.5, facing: 1 }),
          C("rebeca", 104, "stand", { dy: 0.52, facing: -1 }),
        ],
      }),
      b(29, {                                                                          // Jacó cozia o guisado; Esaú chega cansado
        set: "guisado",
        props: FOGUEIRA,
        env: { terrain: "desert", night: 0.2, fire: 0.2, glory: 0.2 },
        cast: [
          C("jaco", 40, "kneel", { dy: 0.5, facing: -1 }),
          C("esau", -104, "walk", { dy: 0.55, facing: 1 }),
        ],
      }),
      b(30, {                                                                          // "deixa-me comer desse guisado vermelho"
        by: "esau",
        q: "disse Esaú a Jacó: ",
        env: { night: 0.24 },
        cast: [
          C("jaco", 44, "stand", { dy: 0.48, facing: -1 }),
          C("esau", -58, "bow", { dy: 0.54, facing: 1 }),
        ],
      }),
      b(31, {                                                                          // "vende-me hoje a tua primogenitura"
        by: "jaco",
        q: "disse Jacó: ",
        cast: [
          C("jaco", 36, "point", { dy: 0.48, facing: -1 }),
          C("esau", -54, "bow", { dy: 0.54, facing: 1 }),
        ],
      }),
      b(32, {                                                                          // "estou a ponto de morrer; de que me serve?"
        by: "esau",
        q: "disse Esaú: ",
        env: { night: 0.28 },
        cast: [
          C("jaco", 36, "stand", { dy: 0.48, facing: -1 }),
          C("esau", -50, "kneel", { dy: 0.54, facing: 1 }),
        ],
      }),
      b(33, {                                                                          // "jura-me hoje" — e vendeu a primogenitura
        by: "jaco",
        q: "disse Jacó: ",
        env: { fire: 0.3 },
        cast: [
          C("jaco", 30, "raise", { dy: 0.48, facing: -1 }),
          C("esau", -44, "stand", { dy: 0.54, facing: 1 }),
        ],
      }),
      b(34, {                                                                          // comeu, bebeu e saiu: DESPREZOU-A
        env: { night: 0.3, fire: 0.12, glory: 0.08 },
        cast: [
          C("jaco", 22, "stand", { dy: 0.48, facing: -1 }),
          C("esau", -160, "walk", { dy: 0.58, facing: -1 }),
        ],
      }),
    ],
  },

  // ------------------------------------------------------------------ Gn 26
  // ISAQUE EM GERAR. Arco de env: seca e tempestade da fome → glória da
  // promessa renovada → dia de cidade → colheita dourada → noites de contenda
  // nos poços → largueza em Reobote → noite profunda com glória súbita em
  // Berseba → dia de aliança → crepúsculo amargo das noras hititas.
  26: {
    start: { terrain: "desert", night: 0.22, storm: 0.18, glory: 0 },
    beats: [
      b(1, {                                                                           // FOME na terra: Isaque vai a Gerar
        props: TERRA_SECA,
        env: { night: 0.26, storm: 0.26 },
        cast: [C("isaque", -34, "walk", { dy: 0.52, facing: 1 })],
      }),
      b(2, {                                                                           // Deus aparece: "não desças ao Egito"
        by: "deus", q: "E apareceu-lhe o Senhor, e disse: ",
        env: { night: 0.08, storm: 0.08, glory: 0.7 },
        cast: [C("isaque", -18, "kneel", { dy: 0.5, glow: 0.35 })],
      }),
      b(3, { by: "deus", env: { glory: 0.76, storm: 0 } }),                                        // Deus: peregrina; serei contigo — o juramento
      b(4, {                                                                           // Deus: descendência como as ESTRELAS dos céus
        by: "deus",
        env: { glory: 0.8, night: 0.14 },
        props: [
          ...TERRA_SECA,
          P("star", -172, 0.55, undefined, 0.04),
          P("star", -112, 0.45, undefined, 0.08),
          P("star", 186, 0.4, undefined, 0.06),
        ],
        cast: [C("isaque", -22, "raise", { dy: 0.5, glow: 0.4 })],
      }),
      b(5, { by: "deus", env: { glory: 0.6, night: 0.1 } }),                                       // Deus: porquanto Abraão obedeceu à minha voz
      b(6, {                                                                           // assim habitou Isaque em GERAR
        set: "gerar",
        props: GERAR,
        env: { terrain: "city", night: 0.14, glory: 0.24, storm: 0 },
        cast: [
          C("isaque", -34, "stand", { dy: 0.5, facing: 1 }),
          C("rebeca", 12, "stand", { dy: 0.5, facing: -1 }),
        ],
      }),
      b(7, {                                                                           // "É minha irmã" — o medo por causa dela
        by: "isaque",
        q: "disse: ",
        env: { night: 0.2 },
        cast: [
          C("isaque", -30, "stand", { dy: 0.5, facing: 1 }),
          C("rebeca", -84, "stand", { dy: 0.55, facing: 1 }),
          C("homem", 48, "stand", { dy: 0.52, facing: -1 }),
          C("homem", 92, "stand", { dy: 0.56, facing: -1 }),
        ],
      }),
      b(8, {                                                                           // Abimeleque olha pela JANELA e vê
        props: GERAR_JANELA,
        env: { night: 0.1, glory: 0.28 },
        cast: [
          C("rei", -130, "stand", { dy: 0.34, glow: 0.25, facing: 1 }),
          C("isaque", 22, "stand", { dy: 0.52, facing: 1 }),
          C("rebeca", 66, "stand", { dy: 0.52, facing: -1 }),
        ],
      }),
      b(9, {                                                                           // "na verdade é tua mulher" — o rei cobra
        by: "rei",
        q: "e disse: ",
        cast: [
          C("rei", -58, "point", { dy: 0.48, glow: 0.2, facing: 1 }),
          C("isaque", 12, "stand", { dy: 0.52, facing: -1 }),
          C("rebeca", 78, "stand", { dy: 0.56, facing: -1 }),
        ],
      }),
      b(10, {                                                                          // "que é isto que nos fizeste?" — o delito
        by: "rei",
        q: "E disse Abimeleque: ",
        env: { night: 0.24, storm: 0.12 },
        cast: [
          C("rei", -54, "raise", { dy: 0.48, glow: 0.2, facing: 1 }),
          C("isaque", 16, "bow", { dy: 0.52, facing: -1 }),
          C("rebeca", 80, "stand", { dy: 0.56, facing: -1 }),
        ],
      }),
      b(11, {                                                                          // o édito ao povo: quem tocar, morrerá
        by: "rei",
        q: "dizendo: ",
        env: { night: 0.14, storm: 0, glory: 0.3 },
        cast: [
          C("rei", -60, "point", { dy: 0.46, glow: 0.25, facing: 1 }),
          C("multidao", 120, "stand", { dy: 0.4 }),
          C("isaque", 4, "stand", { dy: 0.54, facing: 1 }),
        ],
      }),
      b(12, {                                                                          // semeou e colheu CEM POR UM — bênção
        props: GERAR_FARTO,
        env: { glory: 0.5, night: 0.06 },
        cast: [
          C("isaque", -46, "stand", { dy: 0.5, glow: 0.3 }),
          C("rebeca", 6, "stand", { dy: 0.52 }),
        ],
      }),
      b(13, {                                                                          // engrandeceu-se, até ficar mui poderoso
        env: { glory: 0.54 },
        cast: [
          C("isaque", -40, "raise", { dy: 0.48, glow: 0.3 }),
          C("rebeca", 14, "stand", { dy: 0.52 }),
          C("servo", 92, "stand", { dy: 0.5 }),
        ],
      }),
      b(14, {                                                                          // ovelhas, vacas, servos — e a INVEJA
        env: { night: 0.24, glory: 0.42 },
        cast: [
          C("isaque", -52, "stand", { dy: 0.5 }),
          C("rebanho", 128, "stand", { dy: 0.44 }),
          C("servo", 46, "stand", { dy: 0.52 }),
          C("multidao", 240, "stand", { dy: 0.38 }),
        ],
      }),
      b(15, {                                                                          // os filisteus ENTULHAM os poços de Abraão
        props: GERAR_POCOS_ENTULHADOS,
        env: { night: 0.32, storm: 0.2, glory: 0.2 },
        cast: [
          C("isaque", 22, "stand", { dy: 0.52, facing: -1 }),
          C("multidao", -70, "stand", { dy: 0.44 }),
        ],
      }),
      b(16, {                                                                          // "aparta-te de nós" — a expulsão cortês
        by: "rei",
        q: "Disse também Abimeleque a Isaque: ",
        env: { night: 0.3, storm: 0.1 },
        cast: [
          C("rei", -52, "point", { dy: 0.48, glow: 0.2, facing: 1 }),
          C("isaque", 26, "stand", { dy: 0.52, facing: -1 }),
        ],
      }),
      b(17, {                                                                          // acampa no VALE DE GERAR
        set: "valeEseque",
        props: POCO_ESEQUE,
        env: { terrain: "desert", night: 0.18, storm: 0, glory: 0.22 },
        cast: [
          C("isaque", -26, "walk", { dy: 0.52, facing: -1 }),
          C("servo", 46, "walk", { dy: 0.54, facing: -1 }),
        ],
      }),
      b(18, {                                                                          // recava os poços do pai e lhes dá os nomes
        env: { glory: 0.3 },
        cast: [
          C("isaque", -96, "point", { dy: 0.5, facing: -1 }),
          C("servo", -40, "kneel", { dy: 0.54 }),
        ],
      }),
      b(19, {                                                                          // acham no vale um poço de ÁGUAS VIVAS
        env: { glory: 0.44, night: 0.1 },
        cast: [
          C("isaque", -88, "raise", { dy: 0.5, facing: -1 }),
          C("servo", -44, "stand", { dy: 0.54, facing: -1 }),
        ],
      }),
      b(20, {                                                                          // "esta água é nossa": ESEQUE, a contenda
        by: "pastor",
        q: "dizendo: ",
        env: { night: 0.3, storm: 0.18, glory: 0.14 },
        cast: [
          C("pastor", -68, "point", { dy: 0.5, facing: 1 }),
          C("pastor", 18, "raise", { dy: 0.52, facing: -1, id: "pastorIsaque" }),
          C("isaque", 96, "stand", { dy: 0.54, facing: -1 }),
        ],
      }),
      b(21, {                                                                          // cavam outro e porfiam: SITNA, inimizade
        set: "valeSitna",
        props: POCO_SITNA,
        env: { night: 0.36, storm: 0.24, glory: 0.1 },
        cast: [
          C("pastor", -104, "point", { dy: 0.5, facing: 1 }),
          C("pastor", -34, "point", { dy: 0.52, facing: -1, id: "pastorIsaque" }),
          C("isaque", 74, "stand", { dy: 0.56, facing: -1 }),
        ],
      }),
      b(22, {                                                                          // REOBOTE: "agora nos alargou o Senhor"
        by: "isaque",
        q: "e disse: ",
        set: "valeReobote",
        props: POCO_REOBOTE,
        env: { night: 0.1, storm: 0, glory: 0.5 },
        cast: [
          C("isaque", -66, "raise", { dy: 0.5, glow: 0.3, facing: -1 }),
          C("servo", -14, "stand", { dy: 0.54 }),
          C("rebanho", 150, "stand", { dy: 0.44 }),
        ],
      }),
      b(23, {                                                                          // subiu dali a BERSEBA — cai a tarde
        set: "berseba",
        props: BERSEBA,
        env: { night: 0.5, glory: 0.3 },
        cast: [C("isaque", -20, "walk", { dy: 0.52, facing: 1 })],
      }),
      b(24, {                                                                          // NAQUELA NOITE Deus aparece: não temas
        by: "deus", q: "E apareceu-lhe o Senhor naquela mesma noite, e disse: ",
        env: { night: 0.6, glory: 0.8 },
        cast: [C("isaque", -30, "kneel", { dy: 0.5, glow: 0.45 })],
      }),
      b(25, {                                                                          // altar, invocação do Nome, tenda e poço
        env: { night: 0.5, glory: 0.62 },
        cast: [
          C("isaque", -96, "kneel", { dy: 0.48, glow: 0.3, facing: -1 }),
          C("servo", 84, "kneel", { dy: 0.54 }),
        ],
      }),
      b(26, {                                                                          // Abimeleque vem com Auzate e Ficol
        env: { night: 0.2, glory: 0.4 },
        cast: [
          C("isaque", -46, "stand", { dy: 0.5, facing: 1 }),
          C("rei", 40, "walk", { dy: 0.5, glow: 0.2, facing: -1 }),
          C("homem", 92, "walk", { dy: 0.54, facing: -1 }),
          C("homem", 136, "walk", { dy: 0.58, facing: -1 }),
        ],
      }),
      b(27, {                                                                          // "por que viestes, pois que me odiais?"
        by: "isaque",
        q: "E disse-lhes Isaque: ",
        env: { night: 0.24 },
        cast: [
          C("isaque", -50, "point", { dy: 0.5, facing: 1 }),
          C("rei", 26, "stand", { dy: 0.5, glow: 0.2, facing: -1 }),
          C("homem", 78, "stand", { dy: 0.54, facing: -1 }),
          C("homem", 120, "stand", { dy: 0.58, facing: -1 }),
        ],
      }),
      b(28, {                                                                          // "vimos que o Senhor é contigo": aliança
        by: "rei",
        q: "E eles disseram: ",
        env: { night: 0.16, glory: 0.5 },
        cast: [
          C("isaque", -46, "stand", { dy: 0.5, facing: 1 }),
          C("rei", 22, "raise", { dy: 0.5, glow: 0.25, facing: -1 }),
          C("homem", 74, "stand", { dy: 0.54, facing: -1 }),
          C("homem", 116, "stand", { dy: 0.58, facing: -1 }),
        ],
      }),
      b(29, { by: "rei", env: { glory: 0.56 } }),                                      // não nos faças mal: tu és o bendito do Senhor
      b(30, {                                                                          // fez-lhes um BANQUETE; comeram e beberam
        props: BERSEBA_BANQUETE,
        env: { night: 0.34, fire: 0.25, glory: 0.46 },
        cast: [
          C("isaque", -74, "stand", { dy: 0.52, facing: 1 }),
          C("rei", -14, "stand", { dy: 0.52, glow: 0.2, facing: -1 }),
          C("homem", 40, "stand", { dy: 0.56, facing: -1 }),
          C("homem", 84, "stand", { dy: 0.6, facing: -1 }),
          C("servo", 150, "stand", { dy: 0.5 }),
        ],
      }),
      b(31, {                                                                          // de madrugada juram e partem EM PAZ
        env: { night: 0.44, fire: 0.1, glory: 0.4 },
        cast: [
          C("isaque", -60, "raise", { dy: 0.52, facing: 1 }),
          C("rei", -6, "raise", { dy: 0.52, glow: 0.2, facing: -1 }),
          C("homem", 150, "walk", { dy: 0.56, facing: 1 }),
          C("homem", 196, "walk", { dy: 0.6, facing: 1 }),
        ],
      }),
      b(32, {                                                                          // os servos: "temos achado água"
        by: "servo",
        q: "e disseram-lhe: ",
        env: { night: 0.14, fire: 0, glory: 0.5 },
        cast: [
          C("isaque", -46, "stand", { dy: 0.5, facing: 1 }),
          C("servo", 30, "raise", { dy: 0.52, facing: -1 }),
          C("servo", 78, "stand", { dy: 0.56, facing: -1, id: "servo2" }),
        ],
      }),
      b(33, {                                                                          // chamou-o SEBA — daí Berseba, até hoje
        env: { glory: 0.58, night: 0.1 },
        cast: [
          C("isaque", 84, "raise", { dy: 0.48, glow: 0.3, facing: 1 }),
          C("servo", 20, "stand", { dy: 0.54 }),
        ],
      }),
      b(34, {                                                                          // Esaú, aos quarenta, toma Judite e Basemate
        set: "norasHititas",
        props: BERSEBA,
        env: { night: 0.3, glory: 0.16 },
        cast: [
          C("esau", -40, "stand", { dy: 0.5, facing: 1 }),
          C("mulherComum", 16, "stand", { dy: 0.52, facing: -1 }),
          C("mulherComum", 62, "stand", { dy: 0.56, facing: -1, id: "basemate" }),
        ],
      }),
      b(35, {                                                                          // AMARGURA DE ESPÍRITO para Isaque e Rebeca
        env: { night: 0.35, glory: 0.08 },
        cast: [
          C("isaque", -96, "bow", { dy: 0.54, facing: 1 }),
          C("rebeca", -48, "bow", { dy: 0.56, facing: 1 }),
          C("esau", 40, "stand", { dy: 0.48, facing: -1 }),
          C("mulherComum", 92, "stand", { dy: 0.5, facing: -1 }),
          C("mulherComum", 138, "stand", { dy: 0.54, facing: -1, id: "basemate" }),
        ],
      }),
    ],
  },
};
