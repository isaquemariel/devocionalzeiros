// ============================================================================
// GÊNESIS — cena viva, caps. 41–42 (DO CÁRCERE AO TRONO; OS IRMÃOS DESCEM).
//
// Cap. 41 é A VIRADA de todo o livro, e o ambiente conta isso sozinho: começa
// em night 0.6 — a noite dos sonhos de Faraó, imagens que ninguém sabe ler —
// e termina em glória plena de colheita. O gráfico do env é o testemunho:
// noite onírica (v.1–7) → manhã perturbada e magos mudos (storm, v.8) → a
// lembrança do copeiro (v.9–13) → José tirado da cova, barbeado, de roupas
// novas (v.14: o corte visual mais forte do capítulo) → "NÃO ESTÁ ISSO EM MIM;
// DEUS DARÁ RESPOSTA" (v.16, glory 0.5: a humildade é que abre a porta) →
// interpretação (glory 0.6) → conselho e celeiros → A EXALTAÇÃO, com o ápice
// de glória do capítulo no v.43, quando clamam "Ajoelhai" → sete anos de
// fartura "como a areia do mar" → e a fome, que apaga a luz outra vez
// (night 0.3 + desert) sem apagar o pão do Egito.
//
// Cap. 42 é o REENCONTRO ÀS CEGAS. Os sonhos do menino de Gn 37 se cumprem
// literalmente no v.6 — os irmãos se inclinam com o rosto em terra diante do
// governador que venderam — e o palco marca isso com glory 0.5: a única luz
// de um capítulo duro. Depois é aspereza (o teste), remorso (v.21–22, dito na
// cara de quem entende cada palavra sem que eles saibam), e o beat que
// desarma o capítulo: JOSÉ SE VIRA E CHORA (v.24). Fecha pesado, em Canaã, na
// recusa de Jacó: "Todas estas coisas vieram sobre mim." (night 0.5)
//
// DEUS NUNCA É DESENHADO: "Deus dará resposta de paz", "o que Deus há de
// fazer", "que é isto que Deus nos tem feito?" — tudo isso é glória no
// ambiente e glow em quem fala, nunca figura em cena.
// Elenco: `farao` = Faraó; `jose` = José (glow em todo o arco — o Senhor está
// com ele); o copeiro-mor e os dez irmãos = `homem` (ids distintos, cada um
// com sua voz); os adivinhadores/sábios, o povo e as nações = `multidao`;
// Azenate = `mulherComum`; `jaco` = Israel; as VACAS dos sonhos = `rebanho`
// (dois rebanhos com ids e escalas opostas: um viçoso, um esquálido).
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ------------------------------------------------------------------ Gn 41: sets
// O NILO, aos pés do palácio: o rio atravessa o palco (é dele que sobem as
// vacas), a torre do palácio ao fundo, o portão, tamareiras, a despensa real.
// O corredor dx -100..-190 fica LIVRE: é a vaga dos extras do versículo (as
// espigas dos sonhos entram ali).
const NILO: StagePropSpec[] = [
  P("river", 0, 1.2, undefined, 0.16),         // o rio de que Faraó sonha estar à margem
  P("tower", -300, 1.3, undefined, 0.05),      // o palácio de Faraó ao fundo
  P("door", 218, 1.15, undefined, 0.1),        // o portão do pátio real
  P("palm", -244, 1.15, undefined, 0.3),
  P("palm", 120, 1.0, undefined, 0.12),
  P("palm", 300, 1.05, undefined, 0.42),
  P("stall", -300, 1.0, undefined, 0.55),      // a banca da despensa
  P("rock", 240, 0.85, undefined, 0.6),
  P("amphora", 60, 0.85, undefined, 0.8),
  P("crate", -60, 0.9, undefined, 0.84),
  P("bush", 176, 0.9, undefined, 0.34),
  P("grass", -20, 1.0, undefined, 0.92),
  P("grass", 200, 0.95, undefined, 0.72),
  P("grass", 290, 0.9, undefined, 0.66),
];

// O SEGUNDO SONHO (v.5–7): as espigas brotando "de um mesmo pé". Duas na vaga
// de extras — a cheia e boa, grande e viva; a miúda, queimada do vento
// oriental, murcha atrás dela.
const NILO_ESPIGAS: StagePropSpec[] = [
  ...NILO,
  P("sheaf", -124, 1.3, undefined, 0.14),      // sete espigas cheias e boas
  P("sheaf", -176, 0.7, undefined, 0.32),      // sete espigas miúdas e queimadas
];

// A SALA DO TRONO (v.14–45): aqui o cárcere vira governo. Trono ao centro,
// torres, candeeiros acesos, o portão por onde José entra barbeado e de
// roupas novas. Corredor de extras livre para os celeiros do conselho.
const TRONO: StagePropSpec[] = [
  P("throne", 0, 1.25, undefined, 0.06),       // o trono de Faraó
  P("tower", -300, 1.3, undefined, 0.04),
  P("tower", 300, 1.2, undefined, 0.08),
  P("door", 214, 1.15, undefined, 0.14),       // a porta por onde José foi trazido
  P("lampstand", -246, 1.0, 1, 0.3),
  P("lampstand", 246, 1.0, 1, 0.32),
  P("palm", -60, 1.1, undefined, 0.05),
  P("palm", 150, 1.05, undefined, 0.2),
  P("bush", 110, 0.85, undefined, 0.42),
  P("amphora", 70, 0.85, undefined, 0.82),
  P("crate", -70, 0.85, undefined, 0.86),
  P("grass", -20, 1.0, undefined, 0.92),
  P("grass", 190, 0.95, undefined, 0.7),
  P("grass", 290, 0.9, undefined, 0.56),
];

// Faraó RECONTA o sonho no trono (v.22–24): as espigas voltam ao palco como
// lembrança viva, na vaga de extras — o texto as nomeia, o palco as mostra.
const TRONO_ESPIGAS: StagePropSpec[] = [
  ...TRONO,
  P("sheaf", -124, 1.3, undefined, 0.14),      // as espigas cheias do sonho
  P("sheaf", -178, 0.7, undefined, 0.34),      // as secas, queimadas do vento oriental
];

// O CONSELHO SÁBIO (v.33–36): "ajuntem toda a comida… amontoem o trigo… e o
// guardem" — três celeiros nascem no palco enquanto José fala.
const TRONO_CELEIROS: StagePropSpec[] = [
  ...TRONO,
  P("crate", -118, 1.2, undefined, 0.16),      // a quinta parte recolhida
  P("crate", -160, 1.05, undefined, 0.36),     // mantimento nas cidades
  P("crate", -190, 0.95, undefined, 0.58),     // e o guardem
];

// OS SETE ANOS DE FARTURA (v.46–49): o Egito inteiro produzindo. Feixes em
// abundância na vaga de extras, celeiros dos dois lados, o armazém ao fundo —
// "muitíssimo trigo, como a areia do mar, até que cessou de contar".
const FARTURA: StagePropSpec[] = [
  P("sheaf", -130, 1.3, undefined, 0.14),
  P("sheaf", -176, 1.15, undefined, 0.34),
  P("sheaf", -86, 1.0, undefined, 0.52),
  P("tower", 60, 1.3, undefined, 0.04),        // o celeiro real ao fundo
  P("door", 200, 1.1, undefined, 0.12),
  P("crate", -260, 1.1, undefined, 0.3),
  P("crate", -300, 1.0, undefined, 0.52),
  P("crate", 250, 1.1, undefined, 0.34),
  P("crate", 300, 1.0, undefined, 0.56),
  P("stall", 140, 1.0, undefined, 0.46),
  P("palm", -30, 1.15, undefined, 0.08),
  P("palm", 190, 1.0, undefined, 0.66),
  P("well", 320, 1.0, undefined, 0.74),
  P("bush", -220, 0.95, undefined, 0.68),
  P("grass", 20, 1.0, undefined, 0.9),
  P("grass", 100, 1.0, undefined, 0.8),
  P("grass", 230, 0.95, undefined, 0.86),
];

// A CASA DE JOSÉ (v.50–52): o único set caseiro do capítulo. Tenda, fogo
// aceso, árvore no pátio — Manassés e Efraim nascem aqui, e o homem que
// perdeu a casa do pai ganha casa própria "na terra da minha aflição".
const CASA_JOSE: StagePropSpec[] = [
  P("tent", -140, 1.2, undefined, 0.18),       // a casa de José no Egito
  P("tree", 60, 1.15, undefined, 0.06),
  P("palm", 210, 1.05, undefined, 0.16),
  P("door", 280, 1.1, undefined, 0.3),
  P("campfire", 240, 0.85, 1, 0.52),           // o lar aceso — ternura
  P("well", -300, 1.0, undefined, 0.4),
  P("amphora", -240, 0.9, undefined, 0.6),
  P("crate", 120, 0.9, undefined, 0.7),
  P("bush", 30, 0.9, undefined, 0.5),
  P("grass", -60, 1.0, undefined, 0.88),
  P("grass", 170, 1.0, undefined, 0.82),
  P("grass", 300, 0.95, undefined, 0.66),
];

// A FOME (v.53–57): mesmo Egito, terra seca. Tamareira murcha, capim ralo,
// pedra exposta — e os armazéns ABERTOS no corredor de extras, porque aqui
// (e só aqui) ainda há pão.
const FOME: StagePropSpec[] = [
  P("crate", -140, 1.15, undefined, 0.2),      // "abriu José tudo em que havia mantimento"
  P("crate", -180, 1.0, undefined, 0.42),
  P("tower", 40, 1.25, undefined, 0.05),       // os celeiros do Egito
  P("door", 180, 1.15, undefined, 0.12),       // as portas abertas do armazém
  P("stall", 240, 1.0, undefined, 0.3),        // a venda aos egípcios
  P("rock", -300, 1.1, undefined, 0.3),
  P("rock", 280, 1.0, undefined, 0.52),
  P("well", 310, 1.0, undefined, 0.7),
  P("amphora", -50, 0.85, undefined, 0.8),
  P("palm", 120, 0.9, undefined, 0.6),         // tamareira seca
  P("bush", 200, 0.8, undefined, 0.72),
  P("grass", -240, 0.8, undefined, 0.84),
  P("grass", 90, 0.75, undefined, 0.9),
];

// ------------------------------------------------------------------ Gn 42: sets
// CANAÃ com fome: as tendas de Israel, o poço, o fogo do acampamento. É a
// casa que fica olhando "uns para os outros" sem mantimento. Corredor de
// extras livre para os sacos do v.35.
const CANAA: StagePropSpec[] = [
  P("tent", -270, 1.25, undefined, 0.2),       // a tenda de Jacó
  P("tent", 230, 1.1, undefined, 0.28),        // as tendas dos filhos
  P("tree", -40, 1.2, undefined, 0.06),
  P("tree", 100, 1.05, undefined, 0.12),
  P("well", 300, 1.05, undefined, 0.44),
  P("campfire", -60, 0.85, 1, 0.62),
  P("rock", 60, 0.7, undefined, 0.7),
  P("amphora", 190, 0.85, undefined, 0.66),
  P("bush", 280, 0.9, undefined, 0.66),
  P("grass", -220, 0.9, undefined, 0.86),
  P("grass", 20, 0.95, undefined, 0.9),
  P("grass", 160, 0.9, undefined, 0.8),
  P("grass", 320, 0.85, undefined, 0.6),
];

// v.35 — "despejando eles os seus sacos, eis que CADA UM tinha o pacote com
// seu dinheiro": os sacos despejados no meio do palco, à vista do pai.
const CANAA_SACOS: StagePropSpec[] = [
  ...CANAA,
  P("crate", -130, 1.15, undefined, 0.2),
  P("crate", -172, 1.0, undefined, 0.38),
  P("crate", -108, 0.9, undefined, 0.56),
];

// O EGITO DO GOVERNADOR (v.6–16, 18–25): o pátio onde José "vendia a todo o
// povo da terra". Torre do celeiro, portão, a banca da venda, ânforas —
// poder egípcio, e no meio dele um hebreu que ninguém reconhece.
const EGITO_GOV: StagePropSpec[] = [
  P("tower", -300, 1.3, undefined, 0.04),      // o celeiro/palácio do governador
  P("tower", 300, 1.15, undefined, 0.1),
  P("door", 220, 1.15, undefined, 0.16),
  P("stall", -60, 1.1, undefined, 0.3),        // a banca da venda do trigo
  P("crate", -250, 1.05, undefined, 0.42),
  P("crate", 250, 1.0, undefined, 0.5),
  P("amphora", -290, 0.9, undefined, 0.66),
  P("amphora", 60, 0.85, undefined, 0.84),
  P("palm", 20, 1.15, undefined, 0.04),
  P("palm", 140, 1.05, undefined, 0.12),
  P("well", 320, 1.0, undefined, 0.72),
  P("bush", 180, 0.85, undefined, 0.44),
  P("grass", -40, 1.0, undefined, 0.92),
  P("grass", 200, 0.95, undefined, 0.74),
  P("grass", 290, 0.9, undefined, 0.58),
];

// v.25 — "que enchessem os seus sacos de trigo, e que lhes restituíssem o seu
// dinheiro a cada um no seu saco": os sacos carregados, em destaque.
const EGITO_SACOS: StagePropSpec[] = [
  ...EGITO_GOV,
  P("crate", -134, 1.15, undefined, 0.2),
  P("crate", -176, 1.0, undefined, 0.38),
];

// A PRISÃO DO EGITO (v.17): o MESMO cárcere de Gn 39–40 — a porta pesada, a
// torre da guarda, cenografia mínima. Ironia do palco: José põe os irmãos
// exatamente onde ele passou anos.
const PRISAO: StagePropSpec[] = [
  P("door", -140, 1.35, undefined, 0.16),      // a porta pesada da casa do cárcere
  P("tower", 300, 1.3, undefined, 0.04),
  P("tent", 180, 1.0, undefined, 0.22),        // o posto dos guardas
  P("rock", -290, 1.0, undefined, 0.34),
  P("rock", 236, 0.9, undefined, 0.5),
  P("crate", -46, 0.8, undefined, 0.72),
  P("amphora", 66, 0.75, undefined, 0.78),
  P("bush", 120, 0.8, undefined, 0.66),
  P("grass", -210, 0.85, undefined, 0.84),
  P("grass", 280, 0.85, undefined, 0.74),
];

// O CAMINHO DE VOLTA (v.26–28): a estalagem no deserto, à noite. O saco
// aberto para dar pasto ao jumento — e o dinheiro na boca do saco.
const CAMINHO: StagePropSpec[] = [
  P("crate", -136, 1.15, undefined, 0.2),      // o saco aberto na estalagem
  P("crate", -180, 1.0, undefined, 0.42),
  P("tent", 150, 1.15, undefined, 0.2),        // a estalagem
  P("campfire", 60, 0.9, 1, 0.58),
  P("rock", -280, 1.1, undefined, 0.28),
  P("rock", 260, 1.0, undefined, 0.5),
  P("palm", -40, 1.0, undefined, 0.1),
  P("well", 300, 1.0, undefined, 0.66),
  P("amphora", 210, 0.85, undefined, 0.66),
  P("bush", -230, 0.85, undefined, 0.7),
  P("grass", 20, 0.8, undefined, 0.88),
  P("grass", 120, 0.8, undefined, 0.8),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Gn 41
  // Arco de env: noite onírica 0.6 (v.1–7) → manhã com storm 0.2 dos magos
  // mudos (v.8) → luz do dia no trono (v.14) → glory 0.5 na humildade de José
  // (v.16) → 0.6 na interpretação (v.25–32) → ÁPICE glory 0.85 na exaltação
  // (v.43) → fartura dourada no campo (v.46–49) → e a fome apagando tudo:
  // desert, night 0.3, storm 0.25 (v.53–57).
  41: {
    start: { terrain: "city", night: 0.6, glory: 0.08, storm: 0, fire: 0 },
    beats: [
      b(1, { props: NILO, cast: [                                                   // ao fim de dois anos: Faraó sonha junto ao rio
        C("farao", -10, "lie", { dy: 0.66 }),
      ] }),
      b(2, { cast: [                                                                // sobem do rio SETE VACAS gordas — pastam no prado
        C("farao", -10, "lie", { dy: 0.66 }),
        C("rebanho", 50, "stand", { dy: 0.34, scale: 1.15, id: "vacasGordas" }),
      ] }),
      b(3, { env: { night: 0.66 }, cast: [                                          // sobem outras SETE, feias e magras, na praia
        C("farao", -10, "lie", { dy: 0.66 }),
        C("rebanho", 40, "stand", { dy: 0.34, scale: 1.15, id: "vacasGordas" }),
        C("rebanho", 186, "stand", { dy: 0.3, scale: 0.72, id: "vacasMagras" }),
      ] }),
      b(4, { env: { storm: 0.18 }, cast: [                                          // as magras COMEM as gordas — e Faraó acorda
        C("farao", -16, "stand", { dy: 0.62 }),
        C("rebanho", 46, "stand", { dy: 0.34, scale: 1.15, id: "vacasGordas" }),
        C("rebanho", 104, "walk", { dy: 0.3, scale: 0.72, id: "vacasMagras" }),
      ] }),
      b(5, { props: NILO_ESPIGAS, env: { storm: 0, night: 0.62 }, cast: [            // dormiu outra vez: sete espigas cheias e boas
        C("farao", -10, "lie", { dy: 0.66 }),
      ] }),
      b(6, { env: { night: 0.66, storm: 0.14 } }),                                  // sete espigas miúdas, queimadas do vento oriental
      b(7, { env: { storm: 0.2 }, cast: [                                           // as miúdas devoram as cheias — "era um sonho"
        C("farao", -16, "stand", { dy: 0.62 }),
      ] }),
      b(8, { props: NILO, env: { night: 0.35, storm: 0.2, glory: 0.05 }, cast: [     // o espírito PERTURBOU-SE: magos e sábios, ninguém interpreta
        C("farao", -30, "stand", { dy: 0.5 }),
        C("multidao", 140, "stand", { dy: 0.38 }),
      ] }),
      b(9, { by: "homem", q: "a Faraó, dizendo: ", env: { storm: 0.1, night: 0.3 }, cast: [  // o COPEIRO-MOR: "Das minhas ofensas me lembro hoje"
        C("farao", -46, "stand", { dy: 0.48 }),
        C("homem", 40, "bow", { dy: 0.52, facing: -1, id: "copeiro" }),
        C("multidao", 170, "stand", { dy: 0.36 }),
      ] }),
      b(10, { by: "homem", env: { night: 0.34 }, cast: [                             // "pondo-me sob prisão… a mim e ao padeiro-mor"
        C("farao", -46, "stand", { dy: 0.48 }),
        C("homem", 34, "stand", { dy: 0.52, facing: -1, id: "copeiro" }),
        C("multidao", 170, "stand", { dy: 0.36 }),
      ] }),
      b(11, { by: "homem" }),                                                        // "tivemos um sonho na mesma noite, eu e ele"
      b(12, { by: "homem", env: { glory: 0.2, storm: 0 }, cast: [                     // "estava ali conosco um JOVEM HEBREU… e ele no-los interpretou"
        C("farao", -46, "point", { dy: 0.48 }),
        C("homem", 30, "point", { dy: 0.52, facing: -1, id: "copeiro" }),
        C("multidao", 170, "stand", { dy: 0.36 }),
      ] }),
      b(13, { by: "homem", env: { glory: 0.25 } }),                                   // "como ele nos interpretou, assim aconteceu"
      // v.14 — O CORTE VISUAL DO CAPÍTULO: o cárcere solta, a navalha e as
      // roupas novas mudam o homem, e o palco muda com ele: a cova sai, o
      // TRONO entra. A noite cai para 0.25 — é dia no Egito de José.
      b(14, { set: "trono", props: TRONO, env: { night: 0.25, glory: 0.3, storm: 0 }, cast: [  // tirado do cárcere: barbeou-se, mudou as roupas, apresentou-se
        C("farao", 0, "stand", { dy: 0.4 }),
        C("jose", -86, "walk", { glow: 0.35, dy: 0.54 }),
        C("multidao", 200, "stand", { dy: 0.34 }),
      ] }),
      b(15, { by: "farao", q: "disse a José: ", cast: [                               // "Eu tive um sonho, e ninguém há que o interprete"
        C("farao", 0, "point", { dy: 0.4, facing: -1 }),
        C("jose", -60, "stand", { glow: 0.35, dy: 0.5, facing: 1 }),
        C("multidao", 200, "stand", { dy: 0.34 }),
      ] }),
      // v.16 — A CHAVE DO CAPÍTULO: ele podia ter dito "sim, eu interpreto".
      // Disse "Isso NÃO ESTÁ EM MIM". A glória sobe sobre a humildade.
      b(16, { by: "jose", q: "dizendo: ", env: { glory: 0.5 }, cast: [                 // "Deus dará resposta de paz a Faraó"
        C("farao", 6, "stand", { dy: 0.4, facing: -1 }),
        C("jose", -52, "raise", { glow: 0.55, dy: 0.5, facing: 1 }),
        C("multidao", 200, "bow", { dy: 0.34 }),
      ] }),
      b(17, { by: "farao", q: "disse Faraó a José: ", env: { night: 0.32, glory: 0.28 }, cast: [  // RECONTA: "estava eu em pé na margem do rio"
        C("farao", 0, "point", { dy: 0.4, facing: -1 }),
        C("jose", -58, "stand", { glow: 0.35, dy: 0.5, facing: 1 }),
      ] }),
      b(18, { by: "farao", cast: [                                                    // as sete vacas gordas e formosas, pastando no prado
        C("farao", 0, "point", { dy: 0.4, facing: -1 }),
        C("jose", -58, "stand", { glow: 0.35, dy: 0.5, facing: 1 }),
        C("rebanho", 118, "stand", { dy: 0.32, scale: 1.15, id: "vacasGordas" }),
      ] }),
      b(19, { by: "farao", env: { night: 0.38, storm: 0.15 }, cast: [                  // "não tenho visto outras tais, quanto à fealdade"
        C("farao", 0, "point", { dy: 0.4, facing: -1 }),
        C("jose", -58, "stand", { glow: 0.35, dy: 0.5, facing: 1 }),
        C("rebanho", 108, "stand", { dy: 0.32, scale: 1.15, id: "vacasGordas" }),
        C("rebanho", 236, "walk", { dy: 0.28, scale: 0.72, id: "vacasMagras" }),
      ] }),
      b(20, { by: "farao", env: { storm: 0.22 }, cast: [                               // as magras comiam as primeiras sete gordas
        C("farao", 0, "stand", { dy: 0.4, facing: -1 }),
        C("jose", -58, "stand", { glow: 0.35, dy: 0.5, facing: 1 }),
        C("rebanho", 112, "stand", { dy: 0.32, scale: 1.15, id: "vacasGordas" }),
        C("rebanho", 152, "walk", { dy: 0.28, scale: 0.72, id: "vacasMagras" }),
      ] }),
      b(21, { by: "farao", env: { storm: 0.28 }, cast: [                               // "o seu parecer era feio como no princípio. Então acordei."
        C("farao", 0, "stand", { dy: 0.4, facing: -1 }),
        C("jose", -58, "stand", { glow: 0.35, dy: 0.5, facing: 1 }),
        C("rebanho", 130, "stand", { dy: 0.3, scale: 0.72, id: "vacasMagras" }),
      ] }),
      b(22, { by: "farao", props: TRONO_ESPIGAS, env: { storm: 0.12 }, cast: [         // "de um mesmo pé subiam sete espigas cheias e boas"
        C("farao", 0, "point", { dy: 0.4, facing: -1 }),
        C("jose", -58, "stand", { glow: 0.35, dy: 0.5, facing: 1 }),
      ] }),
      b(23, { by: "farao", env: { storm: 0.24, night: 0.42 } }),                        // sete espigas secas, queimadas do vento oriental
      b(24, { by: "farao", env: { storm: 0.3 }, cast: [                                // "contei isso aos magos, mas ninguém houve que mo interpretasse"
        C("farao", 0, "stand", { dy: 0.4, facing: -1 }),
        C("jose", -58, "stand", { glow: 0.35, dy: 0.5, facing: 1 }),
        C("multidao", 200, "stand", { dy: 0.34 }),
      ] }),
      // v.25–32 — A INTERPRETAÇÃO. As imagens do sonho saem do palco: agora
      // quem ocupa a cena é a PALAVRA. Storm zerado, glória subindo.
      b(25, { by: "jose", q: "disse José a Faraó: ", props: TRONO, env: { night: 0.18, glory: 0.5, storm: 0 }, cast: [  // "o que Deus há de fazer, mostrou-o a Faraó"
        C("farao", 10, "stand", { dy: 0.4, facing: -1 }),
        C("jose", -50, "raise", { glow: 0.5, dy: 0.5, facing: 1 }),
      ] }),
      b(26, { by: "jose", env: { glory: 0.55 }, cast: [                                // sete vacas e sete espigas formosas = SETE ANOS
        C("farao", 10, "stand", { dy: 0.4, facing: -1 }),
        C("jose", -44, "point", { glow: 0.5, dy: 0.5, facing: 1 }),
      ] }),
      b(27, { by: "jose", env: { storm: 0.2, glory: 0.45 } }),                          // as magras e queimadas = sete anos de FOME
      b(28, { by: "jose", env: { storm: 0, glory: 0.6 } }),                             // "o que Deus há de fazer, mostrou-o a Faraó"
      b(29, { by: "jose", env: { glory: 0.62 } }),                                      // vêm sete anos de GRANDE FARTURA no Egito
      b(30, { by: "jose", env: { night: 0.3, glory: 0.3, storm: 0.22 } }),               // depois, sete de fome: a fartura será esquecida
      b(31, { by: "jose", env: { storm: 0.32, glory: 0.22 } }),                          // "porquanto será gravíssima"
      b(32, { by: "jose", env: { night: 0.16, storm: 0, glory: 0.6 }, cast: [            // o sonho repetido DUAS VEZES: Deus se apressa em fazê-lo
        C("farao", 10, "stand", { dy: 0.4, facing: -1 }),
        C("jose", -40, "raise", { glow: 0.55, dy: 0.5, facing: 1 }),
      ] }),
      // v.33–36 — O CONSELHO: ele não pede a própria soltura, pede um plano.
      // Os celeiros nascem no palco à medida que ele fala.
      b(33, { by: "jose", props: TRONO_CELEIROS, env: { glory: 0.55 }, cast: [           // "previna-se de um homem entendido e sábio"
        C("farao", 14, "stand", { dy: 0.4, facing: -1 }),
        C("jose", -46, "point", { glow: 0.5, dy: 0.5, facing: 1 }),
      ] }),
      b(34, { by: "jose" }),                                                            // governadores sobre a terra; A QUINTA PARTE
      b(35, { by: "jose", env: { glory: 0.58 } }),                                       // ajuntem a comida, amontoem o trigo, e o guardem
      b(36, { by: "jose", env: { glory: 0.6 } }),                                        // "para que a terra não pereça de fome"
      b(37, { env: { glory: 0.62 }, cast: [                                              // a palavra foi BOA aos olhos de Faraó e de seus servos
        C("farao", 14, "stand", { dy: 0.4, facing: -1 }),
        C("jose", -46, "stand", { glow: 0.5, dy: 0.5, facing: 1 }),
        C("multidao", 200, "stand", { dy: 0.34 }),
      ] }),
      b(38, { by: "farao", q: "a seus servos: ", env: { glory: 0.66 }, cast: [           // "em quem haja o espírito de Deus?"
        C("farao", 20, "point", { dy: 0.4, facing: -1 }),
        C("jose", -40, "stand", { glow: 0.55, dy: 0.5, facing: 1 }),
        C("multidao", 200, "stand", { dy: 0.34 }),
      ] }),
      b(39, { by: "farao", q: "disse Faraó a José: ", env: { glory: 0.7 }, cast: [       // "ninguém há tão entendido e sábio como tu"
        C("farao", 20, "stand", { dy: 0.4, facing: -1 }),
        C("jose", -30, "stand", { glow: 0.6, dy: 0.48, facing: 1 }),
        C("multidao", 200, "bow", { dy: 0.34 }),
      ] }),
      b(40, { by: "farao", env: { glory: 0.72 } }),                                      // "somente no trono eu serei maior que tu"
      b(41, { by: "farao", q: "Disse mais Faraó a José: ", env: { glory: 0.75 }, cast: [  // "te tenho posto sobre TODA a terra do Egito"
        C("farao", 24, "point", { dy: 0.4, facing: -1 }),
        C("jose", -14, "stand", { glow: 0.65, dy: 0.46, facing: 1 }),
        C("multidao", 200, "bow", { dy: 0.34 }),
      ] }),
      // v.42 — O ANEL sai da mão de Faraó e entra na mão do escravo: linho
      // fino no lugar do trapo do cárcere, colar de ouro no lugar do ferro.
      b(42, { env: { glory: 0.8 }, cast: [                                               // o anel, as roupas de linho fino, o colar de ouro
        C("farao", 30, "point", { dy: 0.4, facing: -1 }),
        C("jose", 0, "stand", { glow: 0.75, dy: 0.44, facing: 1 }),
        C("multidao", 200, "bow", { dy: 0.34 }),
      ] }),
      // v.43 — O PONTO MAIS ALTO: o segundo carro de Faraó, e a cidade
      // clamando "Ajoelhai" diante do homem que dois versículos atrás estava
      // numa cova. Glória no máximo do capítulo.
      b(43, { by: "multidao", q: "clamavam diante dele: ", env: { glory: 0.85, night: 0.08 }, cast: [  // "Ajoelhai" — assim o pôs sobre toda a terra
        C("jose", -6, "raise", { glow: 0.85, dy: 0.4 }),
        C("farao", 90, "stand", { dy: 0.42, facing: -1 }),
        C("multidao", -170, "bow", { dy: 0.6 }),
      ] }),
      b(44, { by: "farao", q: "disse Faraó a José: ", env: { glory: 0.8 }, cast: [        // "Eu sou Faraó; porém sem ti ninguém levantará a mão"
        C("jose", -20, "stand", { glow: 0.7, dy: 0.44 }),
        C("farao", 60, "point", { dy: 0.42, facing: -1 }),
        C("multidao", -170, "bow", { dy: 0.6 }),
      ] }),
      b(45, { env: { glory: 0.75 }, cast: [                                              // ZAFENATE-PANÉIA; e AZENATE lhe é dada por mulher
        C("jose", -30, "stand", { glow: 0.65, dy: 0.46 }),
        C("mulherComum", 26, "stand", { id: "azenate", dy: 0.48, facing: -1 }),
        C("farao", 110, "stand", { dy: 0.4, facing: -1 }),
      ] }),
      // v.46–49 — OS SETE ANOS DE FARTURA: sai o trono, entra a terra. José
      // de trinta anos passando por todo o Egito, e o trigo virando areia.
      b(46, { set: "fartura", props: FARTURA, env: { terrain: "field", night: 0.1, glory: 0.5, storm: 0 }, cast: [  // trinta anos: saiu e passou por toda a terra do Egito
        C("jose", -40, "walk", { glow: 0.5, dy: 0.52 }),
      ] }),
      b(47, { env: { glory: 0.55 }, cast: [                                              // nos sete anos a terra produziu ABUNDANTEMENTE
        C("jose", -10, "stand", { glow: 0.5, dy: 0.5 }),
        C("multidao", 170, "stand", { dy: 0.36 }),
      ] }),
      b(48, { env: { glory: 0.58 }, cast: [                                              // ajuntou o mantimento e o guardou nas cidades
        C("jose", 10, "point", { glow: 0.5, dy: 0.48 }),
        C("multidao", 190, "stand", { dy: 0.36 }),
      ] }),
      b(49, { env: { glory: 0.62 } }),                                                   // trigo COMO A AREIA DO MAR — cessou de contar
      b(50, { set: "casa", props: CASA_JOSE, env: { terrain: "city", night: 0.14, glory: 0.5 }, cast: [  // dois filhos lhe nascem, antes da fome
        C("jose", -40, "stand", { glow: 0.4, dy: 0.5, facing: 1 }),
        C("mulherComum", 20, "stand", { id: "azenate", dy: 0.52, facing: -1 }),
      ] }),
      b(51, { by: "jose", q: "porque disse: ", env: { glory: 0.55 }, cast: [              // MANASSÉS: "Deus me fez esquecer de todo o meu trabalho"
        C("jose", -30, "raise", { glow: 0.45, dy: 0.5, facing: 1 }),
        C("mulherComum", 24, "stand", { id: "azenate", dy: 0.52, facing: -1 }),
      ] }),
      b(52, { by: "jose", q: "porque disse: ", env: { glory: 0.6 } }),                    // EFRAIM: "Deus me fez crescer na terra da minha aflição"
      // v.53–57 — A FOME CHEGA. A luz cai, a terra seca, e o mundo inteiro
      // começa a andar em direção ao Egito.
      b(53, { set: "fome", props: FOME, env: { terrain: "desert", night: 0.3, glory: 0.2, storm: 0.15 }, cast: [  // acabaram-se os sete anos de fartura
        C("jose", -30, "stand", { glow: 0.4, dy: 0.5 }),
      ] }),
      b(54, { env: { storm: 0.25 }, cast: [                                              // fome em todas as terras; MAS NO EGITO HAVIA PÃO
        C("jose", -20, "stand", { glow: 0.45, dy: 0.5 }),
        C("multidao", 170, "stand", { dy: 0.38 }),
      ] }),
      b(55, { by: "farao", q: "a todos os egípcios: ", env: { storm: 0.3 }, cast: [       // o povo clama por pão: "Ide a José; o que ele vos disser, fazei"
        C("farao", 60, "point", { dy: 0.42, facing: -1 }),
        C("jose", -60, "stand", { glow: 0.45, dy: 0.5, facing: 1 }),
        C("multidao", 190, "stand", { dy: 0.4 }),
      ] }),
      b(56, { env: { storm: 0.28, glory: 0.3 }, cast: [                                   // abriu José os celeiros e vendeu aos egípcios
        C("jose", -10, "point", { glow: 0.45, dy: 0.48 }),
        C("multidao", 150, "bow", { dy: 0.42 }),
      ] }),
      b(57, { env: { night: 0.34, storm: 0.3, glory: 0.35 }, cast: [                      // DE TODAS AS TERRAS vinham ao Egito comprar de José
        C("jose", -4, "stand", { glow: 0.5, dy: 0.46 }),
        C("multidao", 140, "walk", { dy: 0.44, id: "egipcios" }),
        C("multidao", -190, "walk", { dy: 0.62, id: "nacoes" }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Gn 42
  // Arco de env: Canaã seca e apagada (night 0.3, storm 0.15) → o Egito claro
  // do governador (night 0.15) com o ÚNICO clarão do capítulo no v.6, quando
  // os sonhos de Gn 37 se cumprem (glory 0.5) → aspereza e cárcere (night
  // 0.55) → o remorso e o choro escondido (glory 0.4, v.24) → o susto no
  // caminho (night 0.35) → o medo em casa (storm 0.2, v.35) → e o fecho
  // pesado de Jacó (night 0.5).
  42: {
    start: { terrain: "field", night: 0.3, glory: 0.1, storm: 0.15, fire: 0 },
    beats: [
      b(1, { by: "jaco", q: "disse a seus filhos: ", props: CANAA, cast: [               // "Por que estais olhando uns para os outros?"
        C("jaco", -50, "point", { dy: 0.5, facing: 1 }),
        C("homem", 20, "stand", { dy: 0.54, facing: -1, id: "irmao1" }),
        C("homem", 76, "stand", { dy: 0.48, facing: -1, id: "irmao2" }),
        C("homem", 130, "stand", { dy: 0.56, facing: -1, id: "irmao3" }),
      ] }),
      b(2, { by: "jaco", q: "Disse mais: ", cast: [                                       // "descei para lá, e comprai-nos dali, para que vivamos"
        C("jaco", -56, "raise", { dy: 0.5, facing: 1 }),
        C("homem", 16, "stand", { dy: 0.54, facing: -1, id: "irmao1" }),
        C("homem", 72, "bow", { dy: 0.48, facing: -1, id: "irmao2" }),
        C("homem", 126, "stand", { dy: 0.56, facing: -1, id: "irmao3" }),
      ] }),
      b(3, { env: { night: 0.26 }, cast: [                                                // então DESCERAM OS DEZ irmãos de José
        C("jaco", -30, "stand", { dy: 0.48, facing: 1 }),
        C("homem", 90, "walk", { dy: 0.54, facing: 1, id: "irmao1" }),
        C("homem", 150, "walk", { dy: 0.46, facing: 1, id: "irmao2" }),
        C("homem", 210, "walk", { dy: 0.6, facing: 1, id: "irmao3" }),
      ] }),
      // v.4 — BENJAMIM FICA. O pai que já perdeu um filho não arrisca o
      // segundo: ele fica sozinho no palco, olhando os dez partirem.
      b(4, { by: "jaco", q: "porque dizia: ", env: { night: 0.34, glory: 0.06 }, cast: [   // "Para que lhe não suceda… algum desastre"
        C("jaco", -60, "stand", { dy: 0.5, facing: 1 }),
        C("homem", 230, "walk", { dy: 0.5, facing: 1, id: "irmao1" }),
      ] }),
      b(5, { env: { storm: 0.22 }, cast: [                                                // foram entre os que iam: HAVIA FOME NA TERRA DE CANAÃ
        C("jaco", -100, "stand", { dy: 0.52, facing: 1 }),
        C("multidao", 130, "walk", { dy: 0.44 }),
      ] }),
      // v.6 — OS SONHOS SE CUMPREM. Vinte anos depois, o feixe que se
      // inclinava (37:7) tem rosto: os irmãos, com o rosto em terra, diante
      // do governador. É a única glória deste capítulo — e eles não a veem.
      b(6, { set: "egito", props: EGITO_GOV, env: { terrain: "city", night: 0.15, glory: 0.5, storm: 0 }, cast: [  // o governador da terra — e os irmãos SE INCLINAM
        C("jose", 0, "stand", { glow: 0.6, dy: 0.36 }),
        C("homem", -80, "bow", { dy: 0.54, facing: 1, id: "irmao1" }),
        C("homem", -140, "bow", { dy: 0.62, facing: 1, id: "irmao2" }),
        C("homem", -40, "bow", { dy: 0.7, facing: 1, id: "irmao3" }),
      ] }),
      b(7, { by: "jose", q: "e disse-lhes: ", env: { glory: 0.3, night: 0.2 }, cast: [     // conheceu-os, mostrou-se estranho: "De onde vindes?"
        C("jose", 10, "point", { glow: 0.5, dy: 0.38, facing: -1 }),
        C("homem", -76, "bow", { dy: 0.54, facing: 1, id: "irmao1" }),
        C("homem", -136, "stand", { dy: 0.62, facing: 1, id: "irmao2" }),
        C("homem", -36, "bow", { dy: 0.7, facing: 1, id: "irmao3" }),
      ] }),
      b(8, { env: { glory: 0.4 } }),                                                       // ELE os conheceu; eles NÃO o conheceram
      b(9, { by: "jose", q: "e disse-lhes: ", env: { glory: 0.45, storm: 0.15 }, cast: [    // lembrou-se dos SONHOS: "Vós sois espias"
        C("jose", 16, "point", { glow: 0.55, dy: 0.38, facing: -1 }),
        C("homem", -70, "stand", { dy: 0.54, facing: 1, id: "irmao1" }),
        C("homem", -130, "stand", { dy: 0.62, facing: 1, id: "irmao2" }),
        C("homem", -30, "bow", { dy: 0.7, facing: 1, id: "irmao3" }),
      ] }),
      b(10, { by: "homem", q: "lhe disseram: ", env: { glory: 0.3, storm: 0.2 }, cast: [    // "Não, senhor meu; teus servos vieram comprar mantimento"
        C("jose", 24, "stand", { glow: 0.5, dy: 0.38, facing: -1 }),
        C("homem", -66, "bow", { dy: 0.54, facing: 1, id: "irmao1" }),
        C("homem", -126, "stand", { dy: 0.62, facing: 1, id: "irmao2" }),
        C("homem", -26, "bow", { dy: 0.7, facing: 1, id: "irmao3" }),
      ] }),
      b(11, { by: "homem" }),                                                              // "somos homens de retidão; teus servos não são espias"
      b(12, { by: "jose", q: "lhes disse: ", env: { storm: 0.3, glory: 0.22 }, cast: [      // "Não; antes viestes para ver a nudez da terra"
        C("jose", 20, "point", { glow: 0.5, dy: 0.38, facing: -1 }),
        C("homem", -70, "stand", { dy: 0.54, facing: 1, id: "irmao1" }),
        C("homem", -130, "bow", { dy: 0.62, facing: 1, id: "irmao2" }),
        C("homem", -30, "stand", { dy: 0.7, facing: 1, id: "irmao3" }),
      ] }),
      // v.13 — sem saber, eles resumem a vida de quem os ouve: "doze irmãos…
      // o mais novo está com nosso pai… MAS UM JÁ NÃO EXISTE".
      b(13, { by: "homem", q: "eles disseram: ", env: { glory: 0.3 }, cast: [               // "somos doze irmãos… mas um já não existe"
        C("jose", 26, "stand", { glow: 0.55, dy: 0.38, facing: -1 }),
        C("homem", -64, "point", { dy: 0.54, facing: 1, id: "irmao1" }),
        C("homem", -124, "stand", { dy: 0.62, facing: 1, id: "irmao2" }),
        C("homem", -24, "bow", { dy: 0.7, facing: 1, id: "irmao3" }),
      ] }),
      b(14, { by: "jose", q: "lhes disse José: ", env: { storm: 0.35, glory: 0.2, night: 0.28 }, cast: [  // "Isso é o que vos tenho dito, sois espias"
        C("jose", 14, "point", { glow: 0.45, dy: 0.38, facing: -1 }),
        C("homem", -72, "bow", { dy: 0.54, facing: 1, id: "irmao1" }),
        C("homem", -132, "bow", { dy: 0.62, facing: 1, id: "irmao2" }),
        C("homem", -32, "bow", { dy: 0.7, facing: 1, id: "irmao3" }),
      ] }),
      b(15, { by: "jose", env: { storm: 0.4 } }),                                           // "pela vida de Faraó… senão quando vosso irmão vier"
      b(16, { by: "jose", env: { storm: 0.45, night: 0.34 } }),                              // enviai um; vós ficareis presos; sejam PROVADAS
      b(17, { set: "prisao", props: PRISAO, env: { night: 0.55, glory: 0.12, storm: 0.15 }, cast: [  // pô-los juntos em prisão, TRÊS DIAS
        C("homem", -60, "stand", { dy: 0.56, id: "irmao1" }),
        C("homem", 0, "kneel", { dy: 0.48, id: "irmao2" }),
        C("homem", 54, "stand", { dy: 0.62, id: "irmao3" }),
      ] }),
      b(18, { by: "jose", q: "disse-lhes José: ", set: "egito", props: EGITO_GOV, env: { night: 0.2, glory: 0.42, storm: 0 }, cast: [  // ao terceiro dia: "Fazei isso, e vivereis; PORQUE EU TEMO A DEUS"
        C("jose", 10, "stand", { glow: 0.55, dy: 0.38, facing: -1 }),
        C("homem", -70, "stand", { dy: 0.54, facing: 1, id: "irmao1" }),
        C("homem", -130, "stand", { dy: 0.62, facing: 1, id: "irmao2" }),
        C("homem", -30, "stand", { dy: 0.7, facing: 1, id: "irmao3" }),
      ] }),
      b(19, { by: "jose", env: { glory: 0.35 } }),                                           // fique um preso; ide, levai mantimento à vossa casa
      b(20, { by: "jose", env: { glory: 0.4 }, cast: [                                        // "trazei-me o vosso irmão mais novo" — e eles assim fizeram
        C("jose", 16, "point", { glow: 0.5, dy: 0.38, facing: -1 }),
        C("homem", -66, "bow", { dy: 0.54, facing: 1, id: "irmao1" }),
        C("homem", -126, "bow", { dy: 0.62, facing: 1, id: "irmao2" }),
        C("homem", -26, "bow", { dy: 0.7, facing: 1, id: "irmao3" }),
      ] }),
      // v.21–22 — O REMORSO. Vinte anos depois, o pecado da cova volta pela
      // boca deles mesmos — e eles o confessam de costas para o homem que
      // entende cada palavra. O palco os junta num círculo; José fica de
      // lado, ouvindo.
      b(21, { by: "homem", q: "uns aos outros: ", env: { night: 0.34, glory: 0.24, storm: 0.18 }, cast: [  // "somos culpados acerca de nosso irmão"
        C("homem", -110, "stand", { dy: 0.56, facing: 1, id: "irmao1" }),
        C("homem", -50, "kneel", { dy: 0.64, facing: -1, id: "irmao2" }),
        C("homem", -80, "bow", { dy: 0.44, id: "irmao3" }),
        C("jose", 60, "stand", { glow: 0.4, dy: 0.4, facing: -1 }),
      ] }),
      b(22, { by: "homem", q: "respondeu-lhes, dizendo: ", env: { storm: 0.26 }, cast: [       // RÚBEN: "não pequeis contra o menino… o seu sangue é requerido"
        C("homem", -110, "point", { dy: 0.56, facing: 1, id: "irmao1" }),
        C("homem", -50, "stand", { dy: 0.64, facing: -1, id: "irmao2" }),
        C("homem", -80, "kneel", { dy: 0.44, id: "irmao3" }),
        C("jose", 60, "stand", { glow: 0.4, dy: 0.4, facing: -1 }),
      ] }),
      b(23, { env: { storm: 0.1, glory: 0.3 }, cast: [                                         // NÃO SABIAM que José os entendia — havia intérprete
        C("homem", -110, "stand", { dy: 0.56, facing: 1, id: "irmao1" }),
        C("homem", -50, "stand", { dy: 0.64, facing: -1, id: "irmao2" }),
        C("homem", -80, "stand", { dy: 0.44, id: "irmao3" }),
        C("jose", 50, "stand", { glow: 0.45, dy: 0.4, facing: -1 }),
      ] }),
      // v.24 — O BEAT QUE DESARMA O CAPÍTULO: ele RETIROU-SE deles e chorou.
      // José caminha para o canto do palco, de costas (facing 1), longe das
      // marcas dos irmãos — o governador de ferro chorando escondido. Depois
      // volta, e Simeão é amarrado perante os olhos deles.
      b(24, { env: { glory: 0.4, night: 0.3, storm: 0 }, cast: [                              // retirou-se e CHOROU; depois amarrou a Simeão
        C("jose", 180, "kneel", { glow: 0.5, dy: 0.3, facing: 1 }),
        C("homem", -110, "stand", { dy: 0.56, facing: 1, id: "irmao1" }),
        C("homem", -40, "bow", { dy: 0.64, facing: 1, id: "irmao2" }),
        C("homem", -80, "stand", { dy: 0.44, id: "irmao3" }),
      ] }),
      // v.25 — A MISERICÓRDIA ESCONDIDA: ele cobra o preço e devolve o
      // dinheiro no saco. A bondade que eles vão confundir com armadilha.
      b(25, { props: EGITO_SACOS, env: { glory: 0.45, night: 0.24 }, cast: [                   // enchei os sacos; devolvei o dinheiro; dai-lhes comida
        C("jose", 30, "point", { glow: 0.5, dy: 0.38, facing: -1 }),
        C("homem", -70, "stand", { dy: 0.56, facing: 1, id: "irmao1" }),
        C("homem", -46, "bow", { dy: 0.72, facing: 1, id: "irmao3" }),
      ] }),
      b(26, { set: "caminho", props: CAMINHO, env: { terrain: "desert", night: 0.3, glory: 0.2, storm: 0.12 }, cast: [  // carregaram o trigo nos jumentos e partiram
        C("homem", -30, "walk", { dy: 0.52, facing: -1, id: "irmao1" }),
        C("homem", 40, "walk", { dy: 0.46, facing: -1, id: "irmao2" }),
        C("homem", 100, "walk", { dy: 0.6, facing: -1, id: "irmao3" }),
      ] }),
      b(27, { env: { night: 0.35, glory: 0.14 }, cast: [                                       // abre o saco na estalagem e VÊ O SEU DINHEIRO
        C("homem", -120, "kneel", { dy: 0.5, facing: 1, id: "irmao1" }),
        C("homem", -20, "stand", { dy: 0.58, facing: -1, id: "irmao2" }),
        C("homem", 70, "stand", { dy: 0.46, facing: -1, id: "irmao3" }),
      ] }),
      // v.28 — a pergunta que atravessa o capítulo inteiro sem resposta:
      // "QUE É ISTO QUE DEUS NOS TEM FEITO?" Eles chamam de desgraça o que é
      // graça — e o palco lhes dá a noite, não a luz.
      b(28, { by: "homem", q: "dizendo um ao outro: ", env: { night: 0.4, storm: 0.22 }, cast: [  // desfaleceu-lhes o coração: "Que é isto que Deus nos tem feito?"
        C("homem", -120, "raise", { dy: 0.5, facing: 1, id: "irmao1" }),
        C("homem", -56, "stand", { dy: 0.6, facing: 1, id: "irmao2" }),
        C("homem", 30, "bow", { dy: 0.44, facing: -1, id: "irmao3" }),
      ] }),
      b(29, { set: "canaa", props: CANAA, env: { terrain: "field", night: 0.32, glory: 0.14, storm: 0.15 }, cast: [  // vieram a Jacó, na terra de Canaã, e contaram tudo
        C("jaco", -60, "stand", { dy: 0.5, facing: 1 }),
        C("homem", 20, "walk", { dy: 0.54, facing: -1, id: "irmao1" }),
        C("homem", 80, "stand", { dy: 0.46, facing: -1, id: "irmao2" }),
        C("homem", 136, "stand", { dy: 0.6, facing: -1, id: "irmao3" }),
      ] }),
      b(30, { by: "homem", env: { storm: 0.22 }, cast: [                                       // "o senhor da terra falou conosco ASPERAMENTE"
        C("jaco", -64, "stand", { dy: 0.5, facing: 1 }),
        C("homem", 16, "point", { dy: 0.54, facing: -1, id: "irmao1" }),
        C("homem", 76, "stand", { dy: 0.46, facing: -1, id: "irmao2" }),
        C("homem", 132, "stand", { dy: 0.6, facing: -1, id: "irmao3" }),
      ] }),
      b(31, { by: "homem" }),                                                                  // "dissemos-lhe: somos homens de retidão; não somos espias"
      b(32, { by: "homem", env: { night: 0.36 }, cast: [                                       // "um não mais existe, e o mais novo está com nosso pai"
        C("jaco", -70, "bow", { dy: 0.5, facing: 1 }),
        C("homem", 10, "stand", { dy: 0.54, facing: -1, id: "irmao1" }),
        C("homem", 70, "stand", { dy: 0.46, facing: -1, id: "irmao2" }),
        C("homem", 126, "bow", { dy: 0.6, facing: -1, id: "irmao3" }),
      ] }),
      b(33, { by: "homem", env: { storm: 0.18 } }),                                            // "deixai comigo um de vossos irmãos, e parti"
      b(34, { by: "homem", env: { glory: 0.2 } }),                                             // "trazei-me vosso irmão mais novo… e negociareis na terra"
      // v.35 — O SUSTO EM CASA: não era um saco, era CADA UM. O medo entra
      // pela porta com o dinheiro devolvido.
      b(35, { props: CANAA_SACOS, env: { storm: 0.2, night: 0.4, glory: 0.1 }, cast: [          // cada um tinha o seu pacote de dinheiro no saco — E TEMERAM
        C("jaco", -70, "raise", { dy: 0.5, facing: 1 }),
        C("homem", 14, "kneel", { dy: 0.56, facing: -1, id: "irmao1" }),
        C("homem", 74, "stand", { dy: 0.46, facing: -1, id: "irmao2" }),
        C("homem", 130, "stand", { dy: 0.62, facing: -1, id: "irmao3" }),
      ] }),
      // v.36–38 — O FECHO PESADO. O pai conta as perdas ("José já não
      // existe… Simeão não está aqui") e recusa entregar Benjamim. A noite
      // sobe e o capítulo termina na sepultura das cãs de Jacó — o leitor
      // sabe o que ele não sabe: José está vivo, a dois versículos de casa.
      b(36, { by: "jaco", q: "seu pai, disse-lhes: ", env: { night: 0.45, storm: 0.24, glory: 0.06 }, cast: [  // "TODAS ESTAS COISAS VIERAM SOBRE MIM"
        C("jaco", -54, "raise", { dy: 0.5, facing: 1 }),
        C("homem", 24, "bow", { dy: 0.56, facing: -1, id: "irmao1" }),
        C("homem", 84, "stand", { dy: 0.46, facing: -1, id: "irmao2" }),
        C("homem", 140, "bow", { dy: 0.62, facing: -1, id: "irmao3" }),
      ] }),
      b(37, { by: "homem", q: "dizendo: ", env: { storm: 0.2 }, cast: [                        // RÚBEN: "entrega-o em minha mão, e tornarei a trazê-lo"
        C("jaco", -60, "stand", { dy: 0.5, facing: 1 }),
        C("homem", 20, "kneel", { dy: 0.56, facing: -1, id: "irmao1" }),
        C("homem", 90, "stand", { dy: 0.46, facing: -1, id: "irmao2" }),
        C("homem", 146, "stand", { dy: 0.62, facing: -1, id: "irmao3" }),
      ] }),
      b(38, { by: "jaco", q: "Ele porém disse: ", env: { night: 0.5, storm: 0.15, glory: 0.04 }, cast: [  // "Não descerá meu filho convosco" — as cãs com tristeza
        C("jaco", -86, "stand", { dy: 0.52, facing: -1 }),
        C("homem", 30, "bow", { dy: 0.56, facing: -1, id: "irmao1" }),
        C("homem", 96, "bow", { dy: 0.46, facing: -1, id: "irmao2" }),
        C("homem", 152, "stand", { dy: 0.62, facing: -1, id: "irmao3" }),
      ] }),
    ],
  },
};
