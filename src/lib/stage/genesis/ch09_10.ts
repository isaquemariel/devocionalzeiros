// ============================================================================
// GÊNESIS — CENA VIVA, caps. 9 e 10.
//
// Gn 9 — A ALIANÇA DO ARCO: no Ararate (pós-dilúvio, a arca repousada ao
// fundo, o altar do sacrifício de Gn 8:20 ainda de pé), Deus abençoa Noé e
// os filhos e estabelece a aliança; o ARCO-ÍRIS entra no v.13 — o beat mais
// bonito do capítulo (glory 0.9). Depois a vinha: a queda de Noé tratada com
// DECORO TOTAL (Noé dentro da tenda, fora de cena; os filhos de costas com a
// capa), a profecia sobre os filhos e a morte de Noé ao entardecer.
// Deus NUNCA é desenhado: sua voz é narração, sua presença é glory.
//
// Gn 10 — AS NAÇÕES (memorial): a tábua dos povos como dramaturgia da
// DISPERSÃO — cada bloco (Jafé/ilhas, Cão/deserto e Sinar, Sem/montanha do
// oriente) troca figurantes e fundo; NINRODE ergue as primeiras cidades
// (torre maior); o v.32 fecha com a multidão espalhada — o mapa do mundo
// antigo. Ciclo dia→noite pelo env = a passagem das gerações.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// O ARARATE PÓS-DILÚVIO (Gn 9:1-19): a arca enorme repousada na encosta, o
// altar do sacrifício, rochas do monte e a vida rebrotando. O corredor de
// extras dx -100..-190 fica LIVRE — é a vaga do ARCO-ÍRIS no v.13.
const ARARATE: StagePropSpec[] = [
  P("arkship", 215, 1.55, undefined, 0.06),   // a arca repousada sobre o monte
  P("altar", -245, 1.05, undefined, 0.18),    // o altar de Gn 8:20
  P("tree", 110, 0.9, undefined, 0.06),       // a terra reverdece
  P("rock", -305, 0.95, undefined, 0.55),
  P("rock", 55, 0.6, undefined, 0.78),
  P("rock", 320, 1.0, undefined, 0.62),
  P("bush", -215, 0.9, undefined, 0.45),
  P("bush", 300, 0.85, undefined, 0.4),
  P("grass", -60, 1, undefined, 0.85),
  P("grass", 150, 1, undefined, 0.8),
  P("grass", -280, 0.95, undefined, 0.7),
];

// O ARCO DA ALIANÇA: o arco-íris entra na vaga dos extras, alto no céu.
const ARCO: StagePropSpec[] = [
  ...ARARATE,
  P("rainbow", -140, 1.8, undefined, 0.04),   // "o meu arco tenho posto nas nuvens"
];

// A VINHA (Gn 9:20-29): Noé lavrador — fileiras de vide, a tenda ao lado,
// a ânfora do vinho. Corredor -100..-190 livre.
const VINHA: StagePropSpec[] = [
  P("tent", 205, 1.25, undefined, 0.12),      // a tenda de Noé
  P("bush", -55, 0.9, undefined, 0.35),       // fileiras da vinha
  P("bush", 5, 0.85, undefined, 0.55),
  P("bush", 70, 0.9, undefined, 0.42),
  P("bush", -28, 0.85, undefined, 0.75),
  P("amphora", 262, 0.9, undefined, 0.5),     // o vinho
  P("crate", 290, 0.85, undefined, 0.62),
  P("tree", -300, 1.1, undefined, 0.08),
  P("rock", -240, 0.7, undefined, 0.6),
  P("grass", 130, 1, undefined, 0.85),
  P("grass", -80, 1, undefined, 0.88),
];

// A família de Noé no Ararate (mapa de papéis igual a Gn 6):
// homem = Sem, pastor = Cão, servo = Jafé, mulherComum = as mulheres da casa.
const FAMILIA = (pose: string): CastPlacement[] => [
  C("noe", -16, pose, { glow: 0.35, dy: 0.46 }),
  C("homem", 44, pose, { dy: 0.55 }),
  C("pastor", 88, pose, { dy: 0.55 }),
  C("servo", -64, pose, { dy: 0.55 }),
  C("mulherComum", 132, pose, { dy: 0.52 }),
];

// ---------------------------------------------------------------- sets Gn 10
// O ACAMPAMENTO DAS NAÇÕES (field): tendas patriarcais e a cidade ao longe
// (tower discreta) — o mundo que começa a se organizar. Corredor livre.
const NACOES: StagePropSpec[] = [
  P("tower", -270, 1.05, undefined, 0.04),    // a cidade ao longe
  P("tent", 195, 1.2, undefined, 0.12),
  P("tent", 272, 1.0, undefined, 0.34),
  P("tree", 108, 0.95, undefined, 0.06),
  P("bush", 318, 0.9, undefined, 0.52),
  P("bush", -220, 0.9, undefined, 0.4),
  P("rock", -38, 0.6, undefined, 0.78),
  P("campfire", 148, 0.85, 1, 0.6),
  P("grass", -70, 1, undefined, 0.85),
  P("grass", 235, 1, undefined, 0.72),
  P("grass", -295, 0.95, undefined, 0.6),
];

// AS ILHAS DOS GENTIOS (patmos, bloco de Jafé): beira-mar, palmeiras — o
// navio do v.5 entra na vaga de extras.
const ILHAS: StagePropSpec[] = [
  P("palm", -280, 1.1, undefined, 0.1),
  P("palm", 245, 1.0, undefined, 0.12),
  P("palm", 318, 0.9, undefined, 0.42),
  P("rock", -225, 0.85, undefined, 0.55),
  P("rock", 55, 0.55, undefined, 0.75),
  P("rock", 150, 0.7, undefined, 0.82),
  P("bush", -300, 0.9, undefined, 0.5),
  P("bush", 205, 0.9, undefined, 0.55),
  P("grass", -60, 1, undefined, 0.85),
  P("grass", 100, 1, undefined, 0.78),
];

// A TERRA DE CÃO (desert): tendas, poço e a cidade distante (Egito/Canaã).
const TERRA_DE_CAM: StagePropSpec[] = [
  P("tower", -262, 0.95, undefined, 0.05),    // cidade distante
  P("tent", 210, 1.2, undefined, 0.12),
  P("palm", 285, 1.0, undefined, 0.3),
  P("well", 120, 1, undefined, 0.14),
  P("rock", -35, 0.6, undefined, 0.75),
  P("rock", -310, 0.9, undefined, 0.55),
  P("bush", -218, 0.85, undefined, 0.45),
  P("grass", 40, 0.9, undefined, 0.85),
  P("grass", -75, 0.95, undefined, 0.8),
];

// SINAR (city, bloco de Ninrode): as PRIMEIRAS CIDADES — a torre maior
// (Babel) domina; vida urbana nascente. Corredor livre (as cidades novas
// do reino entram ali como extras).
const SINAR: StagePropSpec[] = [
  P("tower", -250, 1.5, undefined, 0.05),     // Babel — a torre maior
  P("tower", 235, 1.2, undefined, 0.08),
  P("stall", 290, 1, undefined, 0.3),
  P("well", 130, 1, undefined, 0.14),
  P("crate", -285, 0.9, undefined, 0.5),
  P("amphora", -312, 0.85, undefined, 0.62),
  P("amphora", 172, 0.85, undefined, 0.55),
  P("tree", -55, 0.85, undefined, 0.06),
  P("grass", 60, 0.95, undefined, 0.85),
  P("grass", -220, 0.9, undefined, 0.78),
];

// A MONTANHA DO ORIENTE (mountain, bloco de Sem): "indo para Sefar,
// montanha do oriente" — acampamento alto, fogueira das gerações.
const ORIENTE: StagePropSpec[] = [
  P("tent", 200, 1.2, undefined, 0.12),
  P("tent", 275, 1.0, undefined, 0.34),
  P("tree", -305, 1.05, undefined, 0.08),
  P("rock", -240, 0.9, undefined, 0.5),
  P("rock", 60, 0.6, undefined, 0.78),
  P("rock", 320, 0.95, undefined, 0.55),
  P("campfire", 130, 0.85, 1, 0.62),
  P("bush", -60, 0.85, undefined, 0.3),
  P("grass", -85, 1, undefined, 0.85),
  P("grass", 235, 0.95, undefined, 0.75),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Gn 9
  // A aliança do arco: bênção e mandato no Ararate, o arco-íris no v.13
  // (o clímax de luz), a vinha e a queda com decoro total, a profecia de
  // Noé sobre os filhos e a sua morte ao entardecer.
  9: {
    start: { terrain: "mountain", night: 0.05, glory: 0.5 },
    beats: [
      // BÊNÇÃO E MANDATO (v.1-7) — a voz de Deus é narração + glory
      b(1, { by: "deus", q: "disse-lhes: ", cast: FAMILIA("raise"), props: ARARATE, env: { glory: 0.6 } }),      // Frutificai e multiplicai-vos e enchei a terra
      b(2, { cast: [...FAMILIA("stand"), C("rebanho", 210, "walk", { dy: 0.48, facing: 1 })] }),                 // o temor de vós sobre todo animal
      b(3, { env: { glory: 0.55 } }),                                                                            // tudo o que se move: mantimento
      b(4, { env: { glory: 0.5, night: 0.12 } }),                                                                // a carne com seu sangue, não comereis
      b(5, { env: { night: 0.18, storm: 0.1 } }),                                                                // requererei o sangue das vossas vidas
      b(6, { env: { storm: 0.15 } }),                                                                            // quem derramar sangue: a imagem de Deus
      b(7, { cast: [...FAMILIA("raise"), C("rebanho", 210, "walk", { dy: 0.48, facing: 1 })], env: { storm: 0, night: 0.05, glory: 0.62 } }), // mas vós: frutificai, povoai a terra
      // A ALIANÇA (v.8-11)
      b(8, { env: { glory: 0.7 } }),                                                                             // e falou Deus a Noé e a seus filhos, dizendo
      b(9, { by: "deus", env: { glory: 0.75 } }),                                                                // eis que estabeleço a minha aliança convosco
      b(10, { cast: [...FAMILIA("stand"), C("rebanho", 172, "stand", { dy: 0.5 })] }),                           // com toda alma vivente da arca
      b(11, { by: "deus", env: { glory: 0.8, night: 0 } }),                                                      // não haverá mais dilúvio para destruir a terra
      // O ARCO-ÍRIS (v.12-17)
      b(12, { by: "deus", q: "E disse Deus: ", env: { glory: 0.82 } }),                                          // Este é o sinal da aliança que ponho entre mim e vós
      b(13, { by: "deus", props: ARCO, cast: FAMILIA("raise"), env: { glory: 0.9, night: 0, storm: 0 } }),        // O meu arco tenho posto nas nuvens!
      b(14, { env: { storm: 0.18, glory: 0.8 } }),                                                               // vindo nuvens, aparecerá o arco
      b(15, { env: { storm: 0.06, glory: 0.86 } }),                                                              // então me lembrarei da aliança
      b(16, { env: { glory: 0.88 } }),                                                                           // o arco: aliança eterna com toda carne
      b(17, { by: "deus", q: "E disse Deus a Noé: ", cast: FAMILIA("kneel"), env: { glory: 0.85 } }),            // Este é o sinal da aliança que tenho estabelecido
      // OS TRÊS FILHOS (v.18-19)
      b(18, { cast: [C("noe", -70, "stand", { glow: 0.3, dy: 0.48 }), C("homem", -8, "stand", { dy: 0.55 }), C("pastor", 44, "stand", { dy: 0.55 }), C("servo", 96, "stand", { dy: 0.55 })], env: { glory: 0.55, night: 0.08 } }), // da arca saíram Sem, Cão e Jafé
      b(19, { cast: [C("noe", -20, "stand", { glow: 0.3, dy: 0.48 }), C("homem", -140, "walk", { dy: 0.55, facing: -1 }), C("pastor", 90, "walk", { dy: 0.55, facing: 1 }), C("servo", 150, "walk", { dy: 0.52, facing: 1 })], env: { glory: 0.5 } }), // destes se povoou toda a terra
      // A VINHA E A QUEDA — decoro total (v.20-23)
      b(20, { set: "vinha", props: VINHA, cast: [C("noe", -30, "kneel", { dy: 0.5, facing: 1 })], env: { terrain: "field", night: 0, glory: 0.32, storm: 0 } }), // Noé lavrador planta uma vinha
      b(21, { cast: [], env: { night: 0.22, glory: 0.15 } }),                                                    // embebedou-se: dentro da tenda (fora de cena)
      b(22, { cast: [C("pastor", 118, "walk", { dy: 0.52, facing: -1 }), C("homem", -46, "stand", { dy: 0.55 }), C("servo", -86, "stand", { dy: 0.55 })], env: { night: 0.3 } }), // Cão vê e conta aos irmãos fora
      b(23, { cast: [C("homem", 128, "walk", { dy: 0.5, facing: -1 }), C("servo", 158, "walk", { dy: 0.57, facing: -1 }), C("pastor", -80, "stand", { dy: 0.55 })], env: { night: 0.34 } }), // de costas, cobrem o pai com a capa
      // A PROFECIA SOBRE OS FILHOS (v.24-27)
      b(24, { cast: [C("noe", 132, "stand", { dy: 0.5, facing: -1 }), C("homem", -34, "stand", { dy: 0.55 }), C("pastor", 24, "stand", { dy: 0.55 }), C("servo", -74, "stand", { dy: 0.55 })], env: { night: 0.15, glory: 0.2 } }), // Noé desperta e sabe o ocorrido
      b(25, { by: "noe", q: "disse: ", cast: [C("noe", 110, "point", { dy: 0.5, facing: -1 }), C("homem", -34, "stand", { dy: 0.55 }), C("pastor", 24, "bow", { dy: 0.55 }), C("servo", -74, "stand", { dy: 0.55 })], env: { storm: 0.18, night: 0.2 } }), // "Maldito seja Canaã…"
      b(26, { by: "noe", q: "disse: ", cast: [C("noe", 110, "raise", { dy: 0.5, facing: -1 }), C("homem", -34, "kneel", { dy: 0.55 }), C("pastor", 24, "bow", { dy: 0.55 }), C("servo", -74, "stand", { dy: 0.55 })], env: { storm: 0.05, glory: 0.42 } }), // "Bendito o Senhor Deus de Sem…"
      b(27, { by: "noe", cast: [C("noe", 110, "raise", { dy: 0.5, facing: -1 }), C("homem", -34, "kneel", { dy: 0.55 }), C("pastor", 24, "bow", { dy: 0.55 }), C("servo", -74, "kneel", { dy: 0.55 })], env: { storm: 0, glory: 0.48 } }), // "Alargue Deus a Jafé…"
      // A MORTE DE NOÉ (v.28-29) — entardecer, memorial
      b(28, { cast: [C("noe", 0, "stand", { glow: 0.25, dy: 0.48 }), C("homem", 60, "stand", { dy: 0.55 }), C("pastor", -56, "stand", { dy: 0.55 }), C("servo", 104, "stand", { dy: 0.55 })], env: { night: 0.4, glory: 0.3 } }), // viveu ainda trezentos e cinquenta anos
      b(29, { cast: [C("noe", 0, "lie", { dy: 0.48 }), C("homem", 58, "bow", { dy: 0.55 }), C("pastor", -52, "bow", { dy: 0.55 }), C("servo", 100, "kneel", { dy: 0.55 })], env: { night: 0.55, glory: 0.25 } }), // novecentos e cinquenta anos, e morreu
    ],
  },

  // ------------------------------------------------------------------ Gn 10
  // A tábua das nações (memorial): a cada bloco os figurantes trocam de
  // marca e o fundo muda — Jafé nas ilhas, Cão no deserto e em Sinar
  // (Ninrode e as primeiras cidades), Sem na montanha do oriente; o ciclo
  // dia→noite marca as gerações; v.32 = o mapa do mundo antigo.
  10: {
    start: { terrain: "field", night: 0.08, glory: 0.3 },
    beats: [
      // AS GERAÇÕES DOS FILHOS DE NOÉ (v.1)
      b(1, { cast: [C("patriarca", -48, "stand", { dy: 0.5 }), C("homem", 10, "stand", { dy: 0.55 }), C("mulherComum", 58, "stand", { dy: 0.52 })], props: NACOES }), // as gerações de Sem, Cão e Jafé
      // JAFÉ — AS ILHAS DOS GENTIOS (v.2-5)
      b(2, { set: "ilhas", props: ILHAS, cast: [C("patriarca", -36, "stand", { dy: 0.5 }), C("homem", 26, "stand", { dy: 0.55 }), C("mulherComum", 76, "stand", { dy: 0.52 })], env: { terrain: "patmos", night: 0, glory: 0.35 } }), // os filhos de Jafé: Gomer, Magogue…
      b(3, { cast: [C("patriarca", -66, "stand", { dy: 0.5 }), C("homem", 34, "walk", { dy: 0.55, facing: 1 }), C("mulherComum", 88, "stand", { dy: 0.52 })], env: { night: 0.12 } }), // os filhos de Gomer: Asquenaz…
      b(4, { cast: [C("patriarca", 52, "stand", { dy: 0.5 }), C("homem", -40, "stand", { dy: 0.55 }), C("mulherComum", 4, "walk", { dy: 0.52, facing: -1 })], env: { night: 0.22 } }), // os filhos de Javã: Társis, Quitim…
      b(5, { props: [...ILHAS, P("boat", -145, 1.05, undefined, 0.2)], cast: [C("patriarca", -70, "walk", { dy: 0.5, facing: -1 }), C("homem", 96, "walk", { dy: 0.55, facing: 1 }), C("mulherComum", 30, "point", { dy: 0.52, facing: -1 })], env: { glory: 0.42, night: 0.1 } }), // repartidas as ilhas dos gentios
      // CÃO — CUXE, MIZRAIM, PUTE E CANAÃ (v.6-7)
      b(6, { set: "cam", props: TERRA_DE_CAM, cast: [C("patriarca", 40, "stand", { dy: 0.5 }), C("homem", -28, "stand", { dy: 0.55 }), C("mulherComum", -72, "stand", { dy: 0.52 })], env: { terrain: "desert", night: 0.05, glory: 0.3, storm: 0 } }), // os filhos de Cão: Cuxe, Mizraim…
      b(7, { cast: [C("patriarca", -54, "stand", { dy: 0.5 }), C("homem", 30, "walk", { dy: 0.55, facing: 1 }), C("mulherComum", 78, "stand", { dy: 0.52 })], env: { night: 0.15 } }), // os filhos de Cuxe e de Raamá
      // NINRODE — AS PRIMEIRAS CIDADES (v.8-12)
      b(8, { set: "sinar", props: SINAR, cast: [C("homem", -8, "stand", { glow: 0.3, dy: 0.48 }), C("patriarca", -64, "stand", { dy: 0.52 }), C("multidao", 215, "stand", { dy: 0.28, id: "m1" })], env: { terrain: "city", night: 0.18, glory: 0.25 } }), // Cuxe gera Ninrode, poderoso na terra
      b(9, { cast: [C("homem", 14, "point", { glow: 0.3, dy: 0.48, facing: 1 }), C("patriarca", -64, "stand", { dy: 0.52 }), C("multidao", 215, "stand", { dy: 0.28, id: "m1" })], env: { glory: 0.3 } }), // poderoso caçador diante do SENHOR
      b(10, { props: [...SINAR, P("tower", -145, 1.35, undefined, 0.08)], env: { night: 0.22 } }),               // o reino: Babel, Ereque, Acade, Calné
      b(11, { props: [...SINAR, P("tower", -145, 1.35, undefined, 0.08), P("tower", 318, 1.3, undefined, 0.03)], cast: [C("homem", 62, "walk", { glow: 0.3, dy: 0.48, facing: 1 }), C("patriarca", -64, "stand", { dy: 0.52 }), C("multidao", 215, "stand", { dy: 0.28, id: "m1" })] }), // saiu à Assíria: edifica Nínive
      b(12, { cast: [C("homem", 62, "stand", { glow: 0.3, dy: 0.48 }), C("multidao", 215, "stand", { dy: 0.28, id: "m1" }), C("multidao", -235, "stand", { dy: 0.32, id: "m2" }), C("patriarca", -64, "stand", { dy: 0.52 })], env: { night: 0.28, glory: 0.28 } }), // Resen: esta é a grande cidade
      // MIZRAIM E CANAÃ (v.13-20)
      b(13, { cast: [C("patriarca", 36, "stand", { dy: 0.5 }), C("homem", -28, "stand", { dy: 0.55 }), C("mulherComum", 84, "stand", { dy: 0.52 })], env: { night: 0.05, glory: 0.32 } }),   // Mizraim gera Ludim, Anamim…
      b(14, { cast: [C("patriarca", 36, "stand", { dy: 0.5 }), C("homem", -60, "walk", { dy: 0.55, facing: -1 }), C("mulherComum", 12, "stand", { dy: 0.52 })], env: { night: 0.15 } }),     // Casluim: donde saíram os filisteus
      b(15, { set: "canaa", props: NACOES, cast: [C("patriarca", -22, "stand", { dy: 0.5 }), C("homem", 42, "stand", { dy: 0.55 }), C("mulherComum", -64, "stand", { dy: 0.52 })], env: { terrain: "field", night: 0.04, glory: 0.3 } }), // Canaã gera Sidom e Hete
      b(16, { cast: [C("patriarca", -22, "stand", { dy: 0.5 }), C("homem", 88, "walk", { dy: 0.55, facing: 1 }), C("mulherComum", -64, "stand", { dy: 0.52 })] }),                           // o jebuseu, o amorreu, o girgaseu
      b(17, { cast: [C("patriarca", 48, "stand", { dy: 0.5 }), C("homem", -36, "walk", { dy: 0.55, facing: -1 }), C("mulherComum", 0, "stand", { dy: 0.52 })], env: { night: 0.12 } }),      // o heveu, o arqueu, o sineu
      b(18, { cast: [C("patriarca", -78, "walk", { dy: 0.5, facing: -1 }), C("homem", 92, "walk", { dy: 0.55, facing: 1 }), C("mulherComum", 34, "walk", { dy: 0.52, facing: 1 })], env: { night: 0.18 } }), // espalham-se as famílias dos cananeus
      b(19, { cast: [C("patriarca", -140, "walk", { dy: 0.5, facing: -1 }), C("homem", 150, "walk", { dy: 0.55, facing: 1 }), C("mulherComum", 60, "walk", { dy: 0.52, facing: 1 })], env: { glory: 0.36, night: 0.1 } }), // o termo: de Sidom até Gaza
      b(20, { cast: [C("patriarca", -40, "stand", { dy: 0.5 }), C("homem", 16, "stand", { dy: 0.55 }), C("mulherComum", 66, "stand", { dy: 0.52 })], env: { night: 0.3, glory: 0.3 } }),     // os filhos de Cão: famílias e nações
      // SEM — A MONTANHA DO ORIENTE (v.21-31)
      b(21, { set: "oriente", props: ORIENTE, cast: [C("patriarca", -32, "stand", { dy: 0.5 }), C("homem", 28, "stand", { dy: 0.55 }), C("mulherComum", 78, "stand", { dy: 0.52 })], env: { terrain: "mountain", night: 0.04, glory: 0.36 } }), // a Sem, pai dos filhos de Éber
      b(22, { cast: [C("patriarca", -62, "stand", { dy: 0.5 }), C("homem", 40, "walk", { dy: 0.55, facing: 1 }), C("mulherComum", 90, "stand", { dy: 0.52 })] }),                            // os filhos de Sem: Elão, Assur…
      b(23, { cast: [C("patriarca", 54, "stand", { dy: 0.5 }), C("homem", -30, "stand", { dy: 0.55 }), C("mulherComum", 6, "walk", { dy: 0.52, facing: -1 })], env: { night: 0.14 } }),      // os filhos de Arã: Uz, Hul…
      b(24, { cast: [C("patriarca", -20, "walk", { dy: 0.5, facing: -1 }), C("homem", 46, "stand", { dy: 0.55 }), C("mulherComum", 94, "stand", { dy: 0.52 })], env: { night: 0.26 } }),     // Arfaxade gera Selá; Selá, Éber
      b(25, { cast: [C("homem", -78, "walk", { dy: 0.55, facing: -1 }), C("patriarca", 72, "walk", { dy: 0.5, facing: 1 }), C("mulherComum", 0, "stand", { dy: 0.52 })], env: { storm: 0.12, night: 0.3 } }), // Pelegue: repartiu-se a terra
      b(26, { cast: [C("patriarca", -46, "stand", { dy: 0.5 }), C("homem", 22, "stand", { dy: 0.55 }), C("mulherComum", 70, "stand", { dy: 0.52 })], env: { storm: 0, night: 0.38 } }),      // Joctã gera Almodá, Selefe…
      b(27, { cast: [C("patriarca", -46, "stand", { dy: 0.5 }), C("homem", 60, "walk", { dy: 0.55, facing: 1 }), C("mulherComum", 8, "stand", { dy: 0.52 })], env: { night: 0.46 } }),       // a Hadorão, a Usal, a Dicla
      b(28, { cast: [C("patriarca", 34, "stand", { dy: 0.5 }), C("homem", -42, "stand", { dy: 0.55 }), C("mulherComum", 86, "walk", { dy: 0.52, facing: 1 })], env: { night: 0.52 } }),      // a Obal, a Abimael, a Sebá
      b(29, { cast: [C("patriarca", -14, "stand", { dy: 0.5 }), C("homem", 44, "stand", { dy: 0.55 }), C("mulherComum", -60, "stand", { dy: 0.52 })], env: { night: 0.3, glory: 0.3 } }),    // Ofir, Havilá e Jobabe: filhos de Joctã
      b(30, { cast: [C("patriarca", 60, "walk", { dy: 0.5, facing: 1 }), C("homem", 110, "walk", { dy: 0.55, facing: 1 }), C("mulherComum", 20, "walk", { dy: 0.52, facing: 1 })], env: { night: 0.08, glory: 0.4 } }), // de Messa a Sefar, montanha do oriente
      b(31, { cast: [C("patriarca", -30, "stand", { dy: 0.5 }), C("homem", 26, "stand", { dy: 0.55 }), C("mulherComum", 74, "stand", { dy: 0.52 })], env: { glory: 0.35 } }),                // os filhos de Sem: línguas e nações
      // O MAPA DO MUNDO ANTIGO (v.32)
      b(32, { set: "mapa", props: NACOES, cast: [C("multidao", -185, "walk", { dy: 0.3, facing: -1, id: "m1" }), C("multidao", 185, "walk", { dy: 0.3, facing: 1, id: "m2" }), C("patriarca", 0, "raise", { dy: 0.5 })], env: { terrain: "field", glory: 0.4, night: 0.06, storm: 0 } }), // destes foram divididas as nações
    ],
  },
};
