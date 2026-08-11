// ============================================================================
// GÊNESIS — cena viva, caps. 49–50 (AS BÊNÇÃOS DAS DOZE TRIBOS e O FECHO DO LIVRO).
//
// Cap. 49: o último poema do primeiro livro da Bíblia. O palco NÃO muda: é a
// tenda do patriarca, o leito, os candeeiros velando — e os DOZE em semicírculo
// ("Ajuntai-vos, e ouvi, filhos de Jacó"). O que muda é o QUADRO: a cada tribo,
// o filho da vez ADIANTA-SE ao pé da cama e o emblema do seu oráculo entra no
// corredor de extras (-100..-190) como visão dentro da fala do velho: a ÁGUA
// impetuosa de Rúben, a pedra do furor de Simeão e Levi, o cetro e a VIDE de
// Judá, o NAVIO de Zebulom, os DOIS FARDOS de Issacar, a SERPENTE de Dã, o
// PÃO GORDO de Aser, o RAMO JUNTO À FONTE de José, o despojo de Benjamim e,
// por fim, a COVA DE MACPELA. Praticamente todo o capítulo é fala de Jacó
// (`by: "jaco"`) — o palco é a boca de um moribundo profetizando.
// Dois ápices de luz: JUDÁ (v.8–12, glory 0.8 — o leãozinho, o cetro que não se
// arredará, Siló, os olhos vermelhos de vinho) e JOSÉ (v.22–26, glory 0.9 — as
// bênçãos dos altos céus e do abismo que está embaixo). Entre eles o poema
// desce e sobe: storm no furor dos irmãos, night na víbora de Dã, e o pico
// súbito de "A TUA SALVAÇÃO ESPERO, Ó SENHOR!" (v.18) — a única oração no meio
// da profecia. Fecha em night 0.5 sobre glory 0.5: "encolheu os pés na cama, e
// expirou" (v.33) — morte majestosa, luz que não apaga.
//
// Cap. 50: o FECHO DE GÊNESIS em sete movimentos, cada um com o seu palco.
// O choro sobre o rosto do pai (v.1) → o embalsamamento e os SETENTA DIAS de
// luto do Egito (v.2–3, city + multidão) → o pedido a Faraó (v.4–6, o trono) →
// A GRANDE PROCISSÃO FÚNEBRE atravessando o deserto, "carros como gente a
// cavalo… o cortejo foi grandíssimo" (v.7–9, desert, o beat mais épico do
// capítulo) → o PRANTO DE SETE DIAS na eira de Atade, que virou Abel-Mizraim
// (v.10–11, fogueiras de vigília) → o SEPULTAMENTO em Macpela, em frente de
// Manre (v.12–14, mountain, glory 0.4) → o MEDO DOS IRMÃOS e a queda diante
// dele: "Eis-nos aqui por teus servos" (v.15–18) → e o VERSO-CHAVE do livro:
// "Vós bem intentastes mal contra mim; porém Deus o intentou para bem… para
// conservar muita gente com vida" (v.19–21, glory 0.9). Termina em promessa
// suspensa: "Deus certamente vos visitará" e o juramento sobre os OSSOS
// (v.24–25, glory 0.7) — a porta do Êxodo — e o caixão no Egito (v.26, night
// 0.4 com glory 0.3 remanescente: o livro não fecha, ele espera).
//
// DEUS NUNCA É DESENHADO: "porventura estou eu em lugar de Deus?", "Deus o
// intentou para bem", "Deus certamente vos visitará" — a presença é LUZ no
// ambiente (glory subindo sobre a casa de José), jamais figura em cena.
//
// Elenco: `jaco` = Israel no leito (e o corpo morto em 50:1); `jose` com glow
// (o governador do Egito, e o filho separado de seus irmãos em 49:26);
// `homem` SEM id = o filho da vez no quadro de 49 e a voz dos irmãos em 50;
// `homem` com id ("irmaoA", "levi", "cananeu"…) = figurantes que não falam;
// `multidao` = os demais dos doze, o luto do Egito e o grande cortejo;
// `rebanho` = os bois arrebatados (49:6), a gazela solta (49:21) e as ovelhas
// que ficaram em Gósen; `serpente` (scale pequena) = o oráculo de Dã;
// `servo` = os médicos que embalsamam e o mensageiro dos irmãos (50:16–17);
// `farao` no trono (50:6); `patriarca` = os anciãos da casa de Faraó.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ------------------------------------------------------------------ Gn 49: sets
// A TENDA DO LEITO: a tenda grande do patriarca com a cama ao fundo, dois
// candeeiros velando o velho, a tamareira e a árvore da porta. O corredor
// dx -100..-190 fica LIVRE: por ali passam, um por vez, os EMBLEMAS dos doze
// oráculos (a água, a vide, o navio, os fardos, o ramo, a cova…).
const TENDA_LEITO: StagePropSpec[] = [
  P("tent", 0, 1.6, undefined, 0.04),           // a tenda do patriarca — o leito ao fundo
  P("lampstand", -76, 1.05, 1, 0.24),           // os candeeiros que velam o moribundo
  P("lampstand", 86, 1.0, 1, 0.3),
  P("tree", -300, 1.15, undefined, 0.1),
  P("palm", 272, 1.1, undefined, 0.14),
  P("bush", 214, 0.8, undefined, 0.5),
  P("amphora", -46, 0.85, undefined, 0.9),
  P("crate", 130, 0.85, undefined, 0.76),
  P("grass", -246, 0.9, undefined, 0.82),
  P("grass", 44, 0.95, undefined, 0.94),
  P("grass", 306, 0.9, undefined, 0.58),
];

// v.3–4 RÚBEN — "IMPETUOSO COMO A ÁGUA, não serás o mais excelente": a água
// corrente entra no corredor. O primogênito é comparado a uma enxurrada: força
// sem forma, que sobe onde não devia ("subiste ao leito de teu pai").
const Q_RUBEN: StagePropSpec[] = [
  ...TENDA_LEITO,
  P("river", -148, 1.15, undefined, 0.2),       // impetuoso como a água
];

// v.5–7 SIMEÃO E LEVI — "as suas espadas são instrumentos de violência… no seu
// furor mataram homens, e na sua teima arrebataram bois": a pedra nua do furor.
// Nenhum emblema fértil aqui — só pedra, e a tempestade no céu.
const Q_SIMEAO_LEVI: StagePropSpec[] = [
  ...TENDA_LEITO,
  P("rock", -152, 1.2, undefined, 0.22),        // o furor forte e a ira dura
];

// v.9 JUDÁ, O LEÃOZINHO — "encurva-se, e deita-se como um leão… quem o
// despertará?": o penhasco onde a fera repousa sobre a presa.
const Q_JUDA_LEAO: StagePropSpec[] = [
  ...TENDA_LEITO,
  P("rock", -144, 1.3, undefined, 0.18),        // o covil do leão velho
];

// v.10 O CETRO — "O cetro não se arredará de Judá, nem o legislador dentre seus
// pés, ATÉ QUE VENHA SILÓ; e a ele se congregarão os povos": o trono entra no
// corredor. É a primeira vez em Gênesis que a promessa vira REALEZA.
const Q_JUDA_CETRO: StagePropSpec[] = [
  ...TENDA_LEITO,
  P("throne", -146, 1.25, undefined, 0.16),     // o cetro e o legislador — até que venha Siló
];

// v.11–12 A VIDE — "amarrará o seu jumentinho à vide… lavará a sua roupa no
// vinho, e a sua capa em sangue de uvas; os olhos serão vermelhos de vinho":
// a cepa mais excelente e a ânfora transbordando. O ápice de fartura do poema.
const Q_JUDA_VIDE: StagePropSpec[] = [
  ...TENDA_LEITO,
  P("tree", -130, 1.4, undefined, 0.14),        // a vide, a cepa mais excelente
  P("amphora", -178, 1.05, undefined, 0.34),    // o vinho, o sangue de uvas
];

// v.13 ZEBULOM — "habitará no porto dos mares, e será como porto dos navios, e
// o seu termo será para Sidom": o navio e a água do porto. A tribo que não
// olha para dentro da terra, mas para fora — para o mar de Sidom.
const Q_ZEBULOM: StagePropSpec[] = [
  ...TENDA_LEITO,
  P("boat", -138, 1.25, undefined, 0.18),       // o porto dos navios
  P("river", -212, 1.0, undefined, 0.32),       // o porto dos mares, até Sidom
];

// v.14–15 ISSACAR — "é jumento de fortes ossos, DEITADO ENTRE DOIS FARDOS…
// abaixou seu ombro para acarretar, e serviu debaixo de tributo": os dois
// fardos, um de cada lado. A terra deliciosa custou-lhe a liberdade.
const Q_ISSACAR: StagePropSpec[] = [
  ...TENDA_LEITO,
  P("crate", -126, 1.1, undefined, 0.16),       // o primeiro fardo
  P("crate", -168, 1.0, undefined, 0.34),       // e o segundo fardo — o tributo
];

// v.16–18 DÃ — "será serpente junto ao caminho, uma VÍBORA JUNTO À VEREDA, que
// morde os calcanhares do cavalo": a pedra da vereda onde a emboscada espera.
// (A serpente entra no ELENCO, rastejando na frente do palco.)
const Q_DA: StagePropSpec[] = [
  ...TENDA_LEITO,
  P("rock", -156, 1.05, undefined, 0.24),       // a pedra junto ao caminho
];

// v.20 ASER — "o seu pão será gordo, e ele dará DELÍCIAS REAIS": o feixe da
// colheita farta e a banca das delícias que sobem à mesa dos reis.
const Q_ASER: StagePropSpec[] = [
  ...TENDA_LEITO,
  P("sheaf", -136, 1.15, undefined, 0.18),      // o pão gordo de Aser
  P("stall", -182, 1.0, undefined, 0.36),       // as delícias reais
];

// v.21 NAFTALI — "é uma GAZELA SOLTA; ele dá palavras formosas": o matagal
// aberto por onde o animal foge. Nada preso neste quadro: só campo e ligeireza.
const Q_NAFTALI: StagePropSpec[] = [
  ...TENDA_LEITO,
  P("bush", -150, 1.15, undefined, 0.2),        // o mato por onde a gazela salta
];

// v.22–23 JOSÉ — "é um ramo frutífero, RAMO FRUTÍFERO JUNTO À FONTE; seus ramos
// correm sobre o muro": a árvore carregada e a fonte que a sustenta. O quadro
// mais longo e mais luminoso depois de Judá.
const Q_JOSE: StagePropSpec[] = [
  ...TENDA_LEITO,
  P("tree", -124, 1.45, undefined, 0.12),       // o ramo frutífero
  P("well", -174, 1.05, undefined, 0.32),       // junto à fonte
];

// v.24 — "O SEU ARCO, PORÉM, SUSTEVE-SE NO FORTE… pelas mãos do Valente de Jacó
// (de onde é o pastor e A PEDRA DE ISRAEL)": a pedra entra atrás da árvore.
// Os flecheiros atiraram; a raiz não cedeu porque a rocha estava embaixo.
const Q_JOSE_PEDRA: StagePropSpec[] = [
  ...Q_JOSE,
  P("rock", -216, 1.1, undefined, 0.44),        // o pastor e a pedra de Israel
];

// v.25–26 — "bênçãos dos ALTOS CÉUS, com bênçãos do ABISMO QUE ESTÁ EMBAIXO…
// até à extremidade dos outeiros eternos": a luz alta no fundo do céu sobre a
// árvore e a fonte. Vertical completa: céu, terra e abismo abençoando um filho.
const Q_JOSE_BENCAOS: StagePropSpec[] = [
  ...Q_JOSE_PEDRA,
  P("star", 176, 0.6, undefined, 0.02),         // as bênçãos dos altos céus
];

// v.27 BENJAMIM — "é lobo que despedaça; pela manhã comerá a presa, e À TARDE
// REPARTIRÁ O DESPOJO": o despojo empilhado e a pedra da tocaia. O poema fecha
// as tribos com dentes, não com fruto.
const Q_BENJAMIM: StagePropSpec[] = [
  ...TENDA_LEITO,
  P("crate", -140, 1.1, undefined, 0.18),       // o despojo repartido à tarde
  P("rock", -186, 1.0, undefined, 0.36),        // a tocaia do lobo
];

// v.29–30 O ENCARGO — "sepultai-me com meus pais, na cova que está no campo de
// MACPELA, que está em frente de MANRE": a boca da caverna e os carvalhos de
// Manre entram no corredor. O velho troca profecia por endereço: ele quer
// voltar para Canaã mesmo morto.
const Q_MACPELA: StagePropSpec[] = [
  ...TENDA_LEITO,
  { ...P("rock", -134, 1.3, undefined, 0.18), tag: "cova-macpela" },        // a cova do campo de Macpela
  P("tree", -180, 1.2, undefined, 0.36),        // em frente de Manre
];

// v.31 OS SEPULTADOS — "ali sepultaram a Abraão e a Sara… a Isaque e a Rebeca…
// e ali eu sepultei a Lia": as pedras dos que já estão dentro da caverna.
// Cinco nomes; o sexto lugar é o dele.
const Q_SEPULTOS: StagePropSpec[] = [
  ...Q_MACPELA,
  P("rock", -222, 1.0, undefined, 0.5),         // Abraão e Sara, Isaque e Rebeca
  P("rock", -262, 0.9, undefined, 0.66),        // e Lia, que ele mesmo sepultou
];

// ----------------------------------------------------------- Gn 49: semicírculo
// O leito: Jacó assentado na cama (kneel) ao centro-fundo, voltado para os
// filhos. Nos beats de clímax ele LEVANTA as mãos (raise); no v.33 ele se
// deita (lie) e não se levanta mais.
const LEITO = (pose = "kneel", glow = 0.28): CastPlacement =>
  C("jaco", -8, pose, { glow, dy: 0.32, facing: 1 });

// O ARCO dos irmãos que não são o foco do quadro: dois nomeados nas pontas e o
// restante dos doze como multidão no fundo à direita.
const ARCO_IRMAOS: CastPlacement[] = [
  C("homem", -122, "stand", { id: "irmaoA", dy: 0.6, facing: 1 }),
  C("homem", 188, "stand", { id: "irmaoB", dy: 0.7, facing: -1 }),
  C("multidao", 262, "stand", { dy: 0.44 }),
];
// O arco completo inclui JOSÉ (ele é um dos doze e está ouvindo o poema).
const ARCO: CastPlacement[] = [
  ...ARCO_IRMAOS,
  C("jose", 136, "stand", { glow: 0.3, dy: 0.64, facing: -1 }),
];

// QUADRO da tribo: o filho da vez adianta-se ao pé da cama (dx 40) e recebe o
// oráculo; os outros ficam no arco. `homem` SEM id é sempre "o filho da vez" —
// por isso ele ANDA de um quadro para o outro em vez de teleportar.
const QUADRO = (
  pose = "stand",
  extra: Partial<CastPlacement> = {},
  leito: CastPlacement = LEITO(),
): CastPlacement[] => [leito, C("homem", 40, pose, { dy: 0.56, facing: -1, ...extra }), ...ARCO];

// ------------------------------------------------------------------ Gn 50: sets
// O EGITO EM LUTO (v.2–3): a rua da cidade sob os setenta dias de choro. Portas
// fechadas, banca coberta, candeeiro aceso de dia. O corredor fica LIVRE.
const EGITO_LUTO: StagePropSpec[] = [
  P("tower", 300, 1.4, undefined, 0.03),        // a cidade de Faraó ao fundo
  P("tower", -300, 1.2, undefined, 0.08),
  P("door", 238, 1.2, undefined, 0.14),         // a casa fechada do luto
  P("stall", -240, 1.0, undefined, 0.2),        // a banca coberta — a cidade parou
  P("lampstand", 96, 1.0, 1, 0.28),             // o candeeiro do velório
  P("well", 320, 1.0, undefined, 0.66),
  P("palm", 156, 1.05, undefined, 0.22),
  P("amphora", -58, 0.85, undefined, 0.9),
  P("crate", 64, 0.85, undefined, 0.86),
  P("bush", 104, 0.75, undefined, 0.6),
  P("grass", -22, 0.85, undefined, 0.96),
  P("grass", 204, 0.85, undefined, 0.78),
];

// A SALA DE FARAÓ (v.4–6): o trono, as torres do palácio, o portão pesado.
// José entra de luto para pedir licença de SAIR do Egito — e o rei concede.
const PALACIO: StagePropSpec[] = [
  P("throne", 100, 1.3, undefined, 0.08),       // o trono de Faraó
  P("tower", 300, 1.4, undefined, 0.03),
  P("tower", -300, 1.25, undefined, 0.06),
  P("door", 234, 1.2, undefined, 0.14),
  P("lampstand", -64, 1.05, 1, 0.22),
  P("lampstand", 38, 1.0, 1, 0.3),
  P("palm", 164, 1.1, undefined, 0.2),
  P("amphora", -264, 0.9, undefined, 0.52),
  P("crate", 256, 0.9, undefined, 0.58),
  P("grass", -26, 1.0, undefined, 0.92),
  P("grass", 290, 0.9, undefined, 0.46),
];

// O CAMINHO PARA CANAÃ (v.7–9): o deserto atravessado pelo cortejo. Pedras,
// tamareiras do oásis, o poço da estrada. Vazio de propósito: o palco precisa
// de espaço para o "cortejo grandíssimo" atravessar de ponta a ponta.
const CAMINHO_CANAA: StagePropSpec[] = [
  P("rock", -300, 1.25, undefined, 0.1),
  P("rock", 296, 1.15, undefined, 0.2),
  P("rock", 60, 0.7, undefined, 0.86),
  P("palm", 226, 1.15, undefined, 0.12),        // o oásis da estrada
  P("palm", -238, 1.05, undefined, 0.24),
  P("well", 320, 1.0, undefined, 0.6),          // o poço do caminho
  P("bush", 130, 0.8, undefined, 0.54),
  P("grass", -60, 0.9, undefined, 0.92),
  P("grass", 176, 0.9, undefined, 0.8),
];

// A EIRA DE ATADE, ALÉM DO JORDÃO (v.10–11): sete dias de lamentação. Duas
// fogueiras de vigília, a tenda do acampamento, o carvalho do lugar. Aqui os
// cananeus olham de fora e dão nome ao luto: ABEL-MIZRAIM.
const ATADE: StagePropSpec[] = [
  P("campfire", -134, 1.15, 1, 0.2),            // a vigília da primeira noite
  P("campfire", 118, 1.05, 1, 0.34),            // e o fogo dos sete dias
  P("tent", -282, 1.35, undefined, 0.14),       // o acampamento do cortejo
  P("tent", 246, 1.15, undefined, 0.2),
  P("tree", 40, 1.3, undefined, 0.06),          // o carvalho da eira
  P("rock", -320, 1.0, undefined, 0.44),
  P("bush", 190, 0.8, undefined, 0.56),
  P("crate", -60, 0.85, undefined, 0.9),
  P("grass", -212, 0.9, undefined, 0.84),
  P("grass", 300, 0.9, undefined, 0.62),
];

// MACPELA, EM FRENTE DE MANRE (v.12–14): os outeiros de Hebrom, a boca da
// caverna comprada por Abraão e os carvalhos de Manre. O sepulcro dos
// patriarcas recebe o quarto e último deles.
const MACPELA: StagePropSpec[] = [
  { ...P("rock", -30, 1.6, undefined, 0.1), tag: "cova-macpela" },          // a cova do campo de Macpela
  P("tree", -142, 1.3, undefined, 0.2),         // em frente de Manre
  P("rock", -300, 1.2, undefined, 0.3),
  P("rock", 300, 1.15, undefined, 0.24),
  P("rock", 96, 0.8, undefined, 0.72),          // as pedras dos que ali jazem
  P("palm", 224, 1.1, undefined, 0.16),
  P("bush", 152, 0.85, undefined, 0.52),
  P("grass", -80, 0.9, undefined, 0.9),
  P("grass", 250, 0.9, undefined, 0.68),
];

// A CASA DE JOSÉ NO EGITO (v.15–21): o pátio do governador. Portão largo,
// candeeiros, o celeiro que salvou o mundo, o poço. É aqui que o livro entrega
// a sua tese: "Deus o intentou para bem".
const CASA_JOSE: StagePropSpec[] = [
  P("door", 226, 1.25, undefined, 0.12),        // o portão da casa do governador
  P("tower", -300, 1.3, undefined, 0.06),
  P("tower", 302, 1.35, undefined, 0.04),
  P("lampstand", -70, 1.05, 1, 0.24),
  P("lampstand", 84, 1.0, 1, 0.3),
  P("crate", 264, 0.9, undefined, 0.56),        // o celeiro do Egito
  P("stall", -246, 1.0, undefined, 0.22),
  P("well", 320, 1.0, undefined, 0.64),
  P("palm", 160, 1.1, undefined, 0.2),
  P("amphora", -50, 0.85, undefined, 0.9),
  P("grass", 34, 0.95, undefined, 0.94),
  P("grass", 208, 0.9, undefined, 0.76),
];

// v.20 — "para conservar muita gente com vida": o feixe do mantimento entra no
// corredor sob a glória. A fome que era juízo virou celeiro do mundo.
const CASA_JOSE_VIDA: StagePropSpec[] = [
  ...CASA_JOSE,
  P("sheaf", -140, 1.2, undefined, 0.18),       // o pão que conservou muita gente com vida
  P("sheaf", -178, 1.05, undefined, 0.34),
];

// A CASA DE ISRAEL EM GÓSEN (v.22–25): cento e dez anos, filhos de Efraim até à
// terceira geração nascendo sobre os joelhos de José. Tendas, poço, sombra —
// e a promessa esperando: "Deus certamente vos visitará".
const TENDA_ISRAEL: StagePropSpec[] = [
  P("tent", -20, 1.5, undefined, 0.06),         // a tenda da casa de seu pai
  P("tent", 244, 1.2, undefined, 0.2),          // as tendas das famílias que crescem
  P("tent", 310, 1.0, undefined, 0.4),
  P("well", 318, 1.0, undefined, 0.66),
  P("tree", 92, 1.2, undefined, 0.08),
  P("palm", 168, 1.05, undefined, 0.22),
  P("lampstand", -84, 1.0, 1, 0.3),
  P("bush", -300, 0.85, undefined, 0.5),
  P("amphora", -52, 0.85, undefined, 0.9),
  P("grass", -230, 0.9, undefined, 0.84),
  P("grass", 46, 0.95, undefined, 0.94),
  P("grass", 288, 0.9, undefined, 0.6),
];

// v.24–25 O JURAMENTO SOBRE OS OSSOS — "fareis transportar os meus ossos
// daqui": a pedra do sepulcro que ele NÃO vai usar em Canaã, ainda. O emblema
// da esperança suspensa que abre o Êxodo.
const TENDA_JURAMENTO: StagePropSpec[] = [
  ...TENDA_ISRAEL,
  P("rock", -146, 1.15, undefined, 0.2),        // a terra que jurou a Abraão, a Isaque e a Jacó
];

// v.26 O CAIXÃO NO EGITO — "e o embalsamaram e o puseram num caixão no Egito":
// a última imagem de Gênesis. O caixão fica no corredor de extras, sob o
// candeeiro: um ataúde que é, na verdade, uma promessa guardada.
const TENDA_CAIXAO: StagePropSpec[] = [
  ...TENDA_ISRAEL,
  P("crate", -138, 1.25, undefined, 0.18),      // o caixão de José, à espera do Êxodo
  P("rock", -190, 1.1, undefined, 0.38),        // e a terra prometida, ainda longe
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Gn 49
  // Arco de env: a tenda do ajuntamento (night 0.32, glory 0.5) → RÚBEN, a
  // água que sobe onde não devia (night 0.44, glory 0.34) → SIMEÃO E LEVI, o
  // furor maldito (storm 0.25) → JUDÁ, primeiro ápice: o leãozinho, o cetro,
  // Siló e a vide (glory 0.6 → 0.8) → Zebulom no porto (0.55) e Issacar sob
  // tributo (0.42) → DÃ, a víbora na vereda (night 0.42, storm 0.15) →
  // "A TUA SALVAÇÃO ESPERO, Ó SENHOR!" (glory 0.55, storm 0) → Gade, Aser e
  // Naftali (0.5) → JOSÉ, o segundo e maior ápice: o ramo junto à fonte, o
  // arco que se susteve, as bênçãos do céu e do abismo (glory 0.7 → 0.9) →
  // Benjamim, o lobo (night 0.4, storm 0.18) → o encargo de MACPELA, solene
  // (glory 0.4, night 0.35) → e a MORTE (night 0.5 sobre glory 0.5).
  49: {
    start: { terrain: "field", night: 0.32, glory: 0.46, storm: 0, fire: 0 },
    beats: [
      b(1, { by: "jaco", q: "e disse: ", props: TENDA_LEITO, env: { glory: 0.5 }, cast: [   // "AJUNTAI-VOS, e anunciar-vos-ei o que vos há de acontecer"
        LEITO("kneel", 0.3),
        C("homem", 52, "walk", { dy: 0.58, facing: -1 }),
        C("homem", -122, "walk", { id: "irmaoA", dy: 0.6, facing: 1 }),
        C("homem", 196, "walk", { id: "irmaoB", dy: 0.7, facing: -1 }),
        C("jose", 142, "walk", { glow: 0.3, dy: 0.64, facing: -1 }),
        C("multidao", 268, "walk", { dy: 0.44, facing: -1 }),
      ] }),
      b(2, { by: "jaco", env: { glory: 0.52 }, cast: QUADRO("stand", { dx: 44 }) }),        // "ouvi, filhos de Jacó; e ouvi a Israel vosso pai" — o semicírculo
      // ---------------------------------------------------------------- RÚBEN
      b(3, { by: "jaco", props: Q_RUBEN, env: { glory: 0.48, night: 0.36 }, cast: QUADRO("stand", { glow: 0.15 }) }), // "meu primogênito, minha força e o princípio de meu vigor"
      b(4, { by: "jaco", env: { night: 0.44, glory: 0.34 }, cast: QUADRO("bow", { dx: 34 }) }), // IMPETUOSO COMO A ÁGUA: "subiste ao leito de teu pai"
      // -------------------------------------------------------- SIMEÃO E LEVI
      b(5, { by: "jaco", props: Q_SIMEAO_LEVI, env: { night: 0.4, storm: 0.18, glory: 0.3 }, cast: [ // "as suas espadas são INSTRUMENTOS DE VIOLÊNCIA"
        LEITO(),
        C("homem", 36, "stand", { dy: 0.56, facing: -1 }),
        C("homem", 86, "stand", { id: "levi", dy: 0.62, facing: -1 }),
        ...ARCO_IRMAOS,
        C("jose", 150, "stand", { glow: 0.3, dy: 0.66, facing: -1 }),
      ] }),
      b(6, { by: "jaco", env: { storm: 0.25 }, cast: [                                      // "no seu furor mataram homens… arrebataram bois"
        LEITO(),
        C("homem", 36, "stand", { dy: 0.56, facing: -1 }),
        C("homem", 86, "stand", { id: "levi", dy: 0.62, facing: -1 }),
        ...ARCO_IRMAOS,
        C("jose", 150, "stand", { glow: 0.3, dy: 0.66, facing: -1 }),
        C("rebanho", 316, "stand", { dy: 0.5 }),                                            // os bois arrebatados na sua teima
      ] }),
      b(7, { by: "jaco", env: { storm: 0.25, night: 0.42, glory: 0.26 }, cast: [             // "MALDITO SEJA O SEU FUROR… eu os dividirei em Jacó"
        LEITO("point"),
        C("homem", 24, "bow", { dy: 0.6, facing: -1 }),
        C("homem", 104, "bow", { id: "levi", dy: 0.66, facing: -1 }),
        ...ARCO_IRMAOS,
        C("jose", 150, "stand", { glow: 0.3, dy: 0.66, facing: -1 }),
      ] }),
      // ----------------------------------------------------------------- JUDÁ
      b(8, { by: "jaco", props: TENDA_LEITO, env: { storm: 0, night: 0.28, glory: 0.6 }, cast: [ // "a ti te louvarão os teus irmãos… a ti se inclinarão"
        LEITO(),
        C("homem", 40, "stand", { glow: 0.2, dy: 0.56, facing: -1 }),
        C("homem", -122, "bow", { id: "irmaoA", dy: 0.6, facing: 1 }),
        C("homem", 188, "bow", { id: "irmaoB", dy: 0.7, facing: -1 }),
        C("jose", 136, "bow", { glow: 0.3, dy: 0.64, facing: -1 }),
        C("multidao", 262, "bow", { dy: 0.44 }),
      ] }),
      b(9, { by: "jaco", props: Q_JUDA_LEAO, env: { glory: 0.68 }, cast: QUADRO("stand", { glow: 0.3 }) }), // JUDÁ É UM LEÃOZINHO: "quem o despertará?"
      b(10, { by: "jaco", props: Q_JUDA_CETRO, env: { glory: 0.78 }, cast: QUADRO("raise", { glow: 0.4 }, LEITO("point", 0.34)) }), // O CETRO NÃO SE ARREDARÁ — até que venha SILÓ
      b(11, { by: "jaco", props: Q_JUDA_VIDE, env: { glory: 0.8 }, cast: QUADRO("stand", { glow: 0.35 }) }), // o jumentinho à vide; a roupa lavada no vinho
      b(12, { by: "jaco", env: { glory: 0.8, night: 0.24 } }),                               // "os olhos serão vermelhos de vinho, e os dentes brancos de leite"
      // ------------------------------------------------------------- ZEBULOM
      b(13, { by: "jaco", props: Q_ZEBULOM, env: { glory: 0.55, night: 0.28 }, cast: QUADRO("point") }), // "habitará no PORTO DOS MARES… o seu termo será para Sidom"
      // -------------------------------------------------------------- ISSACAR
      b(14, { by: "jaco", props: Q_ISSACAR, env: { glory: 0.46 }, cast: QUADRO("stand") }),  // "jumento de fortes ossos, DEITADO ENTRE DOIS FARDOS"
      b(15, { by: "jaco", env: { glory: 0.42, night: 0.34 }, cast: QUADRO("bow", { dx: 36 }) }), // "abaixou seu ombro para acarretar, e serviu debaixo de tributo"
      // ------------------------------------------------------------------- DÃ
      b(16, { by: "jaco", props: Q_DA, env: { glory: 0.48, night: 0.3 }, cast: [              // "DÃ JULGARÁ O SEU POVO, como uma das tribos de Israel"
        LEITO(),
        C("homem", 40, "stand", { dy: 0.56, facing: -1 }),
        ...ARCO,
        C("serpente", 214, "stand", { dy: 0.88, scale: 0.7 }),                               // a serpente junto ao caminho
      ] }),
      b(17, { by: "jaco", env: { night: 0.42, storm: 0.15, glory: 0.34 }, cast: [             // "uma VÍBORA JUNTO À VEREDA, que morde os calcanhares do cavalo"
        LEITO(),
        C("homem", 40, "stand", { dy: 0.56, facing: -1 }),
        ...ARCO,
        C("serpente", 150, "lie", { dy: 0.92, scale: 0.72 }),                                // e faz cair o seu cavaleiro por detrás
      ] }),
      b(18, { by: "jaco", env: { storm: 0, night: 0.24, glory: 0.55 }, cast: [                // "A TUA SALVAÇÃO ESPERO, Ó SENHOR!" — a oração no meio da profecia
        LEITO("raise", 0.4),
        C("homem", 40, "kneel", { dy: 0.56, facing: -1 }),
        ...ARCO,
      ] }),
      // ------------------------------------------------------- GADE, ASER, NAFTALI
      b(19, { by: "jaco", props: TENDA_LEITO, env: { glory: 0.48, storm: 0.12 }, cast: [      // GADE: "uma tropa o acometerá; mas ele a acometerá POR FIM"
        LEITO(),
        C("homem", 40, "point", { dy: 0.56, facing: -1 }),
        ...ARCO,
        C("multidao", 316, "walk", { dy: 0.36, facing: -1 }),                                // o tropel que o acomete
      ] }),
      b(20, { by: "jaco", props: Q_ASER, env: { glory: 0.54, storm: 0 }, cast: QUADRO("stand") }), // ASER: "o seu pão será gordo, e ele dará DELÍCIAS REAIS"
      b(21, { by: "jaco", props: Q_NAFTALI, env: { glory: 0.56, night: 0.22 }, cast: [        // NAFTALI: "é uma GAZELA SOLTA; ele dá palavras formosas"
        LEITO(),
        C("homem", 40, "stand", { dy: 0.56, facing: -1 }),
        ...ARCO,
        C("rebanho", 306, "walk", { dy: 0.52, facing: 1 }),                                  // o animal solto pelos montes
      ] }),
      // ----------------------------------------------------------------- JOSÉ
      b(22, { by: "jaco", props: Q_JOSE, env: { glory: 0.7, night: 0.2 }, cast: [             // "JOSÉ É UM RAMO FRUTÍFERO JUNTO À FONTE; seus ramos correm sobre o muro"
        LEITO("point", 0.3),
        C("jose", 44, "stand", { glow: 0.5, dy: 0.56, facing: -1 }),
        ...ARCO_IRMAOS,
        C("homem", 96, "stand", { dy: 0.62, facing: -1 }),
      ] }),
      b(23, { by: "jaco", env: { night: 0.36, storm: 0.15, glory: 0.6 }, cast: [              // "OS FLECHEIROS lhe deram amargura, e o flecharam e odiaram"
        LEITO(),
        C("jose", 40, "bow", { glow: 0.35, dy: 0.58, facing: -1 }),
        ...ARCO_IRMAOS,
        C("homem", 96, "stand", { dy: 0.62, facing: -1 }),
      ] }),
      b(24, { by: "jaco", props: Q_JOSE_PEDRA, env: { storm: 0, night: 0.22, glory: 0.76 }, cast: [ // "O SEU ARCO, PORÉM, SUSTEVE-SE NO FORTE" — o pastor e a pedra de Israel
        LEITO("raise", 0.35),
        C("jose", 44, "stand", { glow: 0.55, dy: 0.56, facing: -1 }),
        ...ARCO_IRMAOS,
        C("homem", 96, "stand", { dy: 0.62, facing: -1 }),
      ] }),
      b(25, { by: "jaco", props: Q_JOSE_BENCAOS, env: { glory: 0.85, night: 0.16 } }),        // bênçãos dos ALTOS CÉUS e do ABISMO que está embaixo
      b(26, { by: "jaco", env: { glory: 0.9, night: 0.12 }, cast: [                           // ÁPICE: "sobre a cabeça do que foi SEPARADO DE SEUS IRMÃOS"
        LEITO("raise", 0.45),
        C("jose", 40, "kneel", { glow: 0.7, dy: 0.56, facing: -1 }),
        ...ARCO_IRMAOS,
        C("homem", 96, "bow", { dy: 0.62, facing: -1 }),
      ] }),
      // ------------------------------------------------------------- BENJAMIM
      b(27, { by: "jaco", props: Q_BENJAMIM, env: { night: 0.4, storm: 0.18, glory: 0.5 }, cast: [ // "BENJAMIM É LOBO QUE DESPEDAÇA… à tarde repartirá o despojo"
        LEITO(),
        C("homem", 40, "point", { dy: 0.56, facing: -1, scale: 0.92 }),
        ...ARCO,
      ] }),
      // ------------------------------------------ AS DOZE TRIBOS E O SEPULCRO
      b(28, { env: { storm: 0, night: 0.3, glory: 0.58 }, cast: [                             // TODAS ESTAS SÃO AS DOZE TRIBOS: a cada um segundo a sua bênção
        LEITO("raise", 0.4),
        C("homem", 44, "kneel", { dy: 0.58, facing: -1 }),
        C("homem", -126, "kneel", { id: "irmaoA", dy: 0.62, facing: 1 }),
        C("homem", 196, "kneel", { id: "irmaoB", dy: 0.72, facing: -1 }),
        C("jose", 132, "kneel", { glow: 0.4, dy: 0.66, facing: -1 }),
        C("multidao", 266, "bow", { dy: 0.44 }),
      ] }),
      b(29, { by: "jaco", q: "e disse-lhes: ", props: Q_MACPELA, env: { night: 0.35, glory: 0.42 }, cast: [ // "EU ME CONGREGO AO MEU POVO; sepultai-me com meus pais"
        LEITO("point", 0.32),
        C("homem", 44, "kneel", { dy: 0.58, facing: -1 }),
        C("jose", 110, "kneel", { glow: 0.4, dy: 0.62, facing: -1 }),
        ...ARCO_IRMAOS,
      ] }),
      b(30, { by: "jaco", env: { glory: 0.4 } }),                                             // a cova de MACPELA, em frente de Manre — comprada por Abraão
      b(31, { by: "jaco", props: Q_SEPULTOS, env: { glory: 0.44, night: 0.36 } }),            // Abraão e Sara, Isaque e Rebeca — "e ali eu sepultei a Lia"
      b(32, { by: "jaco", env: { glory: 0.4 } }),                                             // o campo e a cova comprados aos filhos de Hete
      b(33, { env: { night: 0.5, glory: 0.5 }, cast: [                                        // "ENCOLHEU OS PÉS NA CAMA, E EXPIROU, e foi congregado ao seu povo"
        LEITO("lie", 0.5),
        C("jose", 52, "bow", { glow: 0.4, dy: 0.6, facing: -1 }),
        C("homem", 108, "bow", { dy: 0.66, facing: -1 }),
        C("homem", -126, "bow", { id: "irmaoA", dy: 0.62, facing: 1 }),
        C("patriarca", 198, "bow", { dy: 0.5, facing: -1, id: "irmaoC" }),
        C("patriarca", 258, "bow", { scale: 0.9, dy: 0.44, facing: -1, id: "irmaoD" }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Gn 50
  // Arco de env: o leito do morto e o choro do filho (night 0.45, glory 0.24) →
  // o Egito em luto de setenta dias (city, night 0.4, storm 0.12) → a sala de
  // Faraó, luz de corte (night 0.2, glory 0.26) → A PROCISSÃO no deserto, poeira
  // e sol (storm 0.16, glory 0.34 — o beat épico) → ATADE, sete dias de pranto
  // à luz das fogueiras (night 0.44, fire 0.2) → MACPELA nos outeiros de Hebrom
  // (mountain, glory 0.42) → a volta ao Egito e O MEDO DOS IRMÃOS (city, night
  // 0.36, glory 0.18) → "PORÉM DEUS O INTENTOU PARA BEM", o verso-chave do livro
  // (glory 0.9) → a velhice de José, três gerações (glory 0.42) → "DEUS
  // CERTAMENTE VOS VISITARÁ" e o juramento sobre os ossos (glory 0.7) → e o
  // caixão no Egito: night 0.4 com glory 0.3 REMANESCENTE — o livro termina em
  // promessa suspensa, não em morte.
  50: {
    start: { terrain: "field", night: 0.45, glory: 0.24, storm: 0, fire: 0 },
    beats: [
      b(1, { props: TENDA_LEITO, cast: [                                                     // JOSÉ SE LANÇA SOBRE O ROSTO DO PAI, chora sobre ele e o beija
        C("jaco", -30, "lie", { glow: 0.3, dy: 0.36 }),
        C("jose", 16, "bow", { glow: 0.35, dy: 0.52, facing: -1 }),
        C("homem", 96, "bow", { dy: 0.62, facing: -1 }),
        C("anciao", 190, "bow", { dy: 0.48, facing: -1, id: "anciaoCasaJose" }),
        C("mulherComum", 248, "bow", { scale: 0.92, dy: 0.44, facing: -1, id: "enlutadaCasa" }),
      ] }),
      b(2, { set: "egitoLuto", props: EGITO_LUTO, env: { terrain: "city", night: 0.38, glory: 0.2, storm: 0.1 }, cast: [ // OS MÉDICOS EMBALSAMAM Israel, por ordem de José
        C("jose", -34, "point", { glow: 0.35, dy: 0.46, facing: 1 }),
        C("servo", 30, "kneel", { dy: 0.56, facing: -1 }),
        C("servo", 74, "bow", { id: "medico2", dy: 0.62, facing: -1 }),
        C("multidao", 200, "stand", { dy: 0.38 }),
      ] }),
      b(3, { env: { night: 0.42, storm: 0.12, glory: 0.16 }, cast: [                          // quarenta dias de embalsamamento; OS EGÍPCIOS O CHORARAM SETENTA DIAS
        C("jose", -50, "bow", { glow: 0.3, dy: 0.48, facing: 1 }),
        C("homem", 20, "bow", { dy: 0.58 }),
        C("multidao", 130, "bow", { dy: 0.4 }),
        C("multidao", 262, "stand", { id: "lutoFundo", dy: 0.26 }),
      ] }),
      b(4, { by: "jose", q: "dizendo: ", set: "palacio", props: PALACIO, env: { night: 0.2, glory: 0.26, storm: 0 }, cast: [ // "se tenho achado graça… falai aos ouvidos de FARAÓ"
        C("jose", -20, "stand", { glow: 0.35, dy: 0.48, facing: 1 }),
        C("patriarca", 44, "stand", { dy: 0.56, facing: -1 }),
        C("homem", 92, "stand", { dy: 0.6, facing: -1 }),
        C("servo", 148, "bow", { dy: 0.64, facing: -1 }),
      ] }),
      b(5, { by: "jose", env: { glory: 0.32 }, cast: [                                        // "MEU PAI ME FEZ JURAR… ali me sepultarás; então voltarei"
        C("jose", -16, "point", { glow: 0.4, dy: 0.48, facing: 1 }),
        C("patriarca", 48, "stand", { dy: 0.56, facing: -1 }),
        C("homem", 96, "bow", { dy: 0.6, facing: -1 }),
        C("servo", 152, "bow", { dy: 0.64, facing: -1 }),
      ] }),
      b(6, { by: "farao", q: "E Faraó disse: ", env: { glory: 0.36 }, cast: [                  // "SOBE, E SEPULTA A TEU PAI como ele te fez jurar"
        C("farao", 94, "point", { glow: 0.22, dy: 0.3, facing: -1 }),
        C("jose", -14, "bow", { glow: 0.4, dy: 0.48, facing: 1 }),
        C("patriarca", 44, "stand", { dy: 0.56, facing: -1 }),
        C("servo", 156, "bow", { dy: 0.64, facing: -1 }),
      ] }),
      // ------------------------------------------- A GRANDE PROCISSÃO FÚNEBRE
      b(7, { set: "caminho", props: CAMINHO_CANAA, env: { terrain: "desert", night: 0.18, glory: 0.3, storm: 0.12 }, cast: [ // JOSÉ SOBE, e com ele TODOS OS SERVOS DE FARAÓ e os anciãos do Egito
        C("jose", -80, "walk", { glow: 0.4, dy: 0.5, facing: 1 }),
        C("patriarca", -12, "walk", { dy: 0.56, facing: 1 }),
        C("patriarca", 44, "walk", { id: "anciao2", dy: 0.62, facing: 1 }),
        C("multidao", 150, "walk", { dy: 0.38, facing: 1 }),
      ] }),
      b(8, { env: { glory: 0.32 }, cast: [                                                    // toda a casa de José e seus irmãos — só os meninos e o gado ficaram em GÓSEN
        C("jose", -110, "walk", { glow: 0.4, dy: 0.5, facing: 1 }),
        C("homem", -44, "walk", { dy: 0.58, facing: 1 }),
        C("patriarca", 10, "walk", { dy: 0.54, facing: 1 }),
        C("multidao", 116, "walk", { dy: 0.4, facing: 1 }),
        C("rebanho", 292, "stand", { dy: 0.68 }),                                             // as ovelhas e as vacas que ficaram na terra
      ] }),
      b(9, { env: { storm: 0.18, glory: 0.34, night: 0.14 }, cast: [                           // CARROS COMO GENTE A CAVALO: "e o cortejo foi grandíssimo"
        C("jose", -150, "walk", { glow: 0.45, dy: 0.48, facing: 1 }),
        C("homem", -80, "walk", { dy: 0.6, facing: 1 }),
        C("patriarca", -20, "walk", { dy: 0.52, facing: 1 }),
        C("multidao", 60, "walk", { dy: 0.42, facing: 1 }),
        C("multidao", 250, "walk", { id: "cortejo2", dy: 0.24, facing: 1 }),
        C("rebanho", 170, "walk", { dy: 0.72, facing: 1 }),
      ] }),
      // ------------------------------------------------- O PRANTO EM ATADE
      b(10, { set: "atade", props: ATADE, env: { terrain: "field", night: 0.44, glory: 0.2, storm: 0, fire: 0.18 }, cast: [ // a eira de ATADE, além do Jordão: GRANDE E DOLORIDO PRANTO, sete dias
        C("jose", -34, "bow", { glow: 0.35, dy: 0.52 }),
        C("homem", 24, "bow", { dy: 0.6 }),
        C("patriarca", 76, "bow", { dy: 0.66 }),
        C("multidao", 176, "bow", { dy: 0.4 }),
      ] }),
      b(11, { by: "homem", q: "disseram: ", env: { night: 0.46, fire: 0.2 }, cast: [            // OS CANANEUS vendo o luto: "É este o pranto grande dos egípcios" — ABEL-MIZRAIM
        C("jose", -50, "kneel", { glow: 0.3, dy: 0.52 }),
        C("homem", 168, "point", { dy: 0.66, facing: -1 }),
        C("homem", 214, "stand", { id: "cananeu2", dy: 0.72, facing: -1 }),
        C("multidao", 60, "bow", { dy: 0.42 }),
      ] }),
      // ------------------------------------------------- O SEPULTAMENTO EM MACPELA
      b(12, { set: "macpela", props: MACPELA, env: { terrain: "mountain", night: 0.28, glory: 0.34, fire: 0 }, cast: [ // "E FIZERAM-LHE OS SEUS FILHOS assim como ele lhes ordenara"
        C("jose", 46, "walk", { glow: 0.35, dy: 0.54, facing: -1 }),
        C("homem", 106, "walk", { dy: 0.6, facing: -1 }),
        C("homem", 158, "walk", { id: "irmaoB", dy: 0.66, facing: -1 }),
        C("multidao", 248, "stand", { dy: 0.4 }),
      ] }),
      b(13, { env: { glory: 0.42, night: 0.24 }, cast: [                                        // SEPULTARAM-NO na cova do campo de Macpela, em frente de Manre
        C("jose", 8, "kneel", { glow: 0.4, dy: 0.56, facing: -1 }),
        C("homem", 66, "bow", { dy: 0.62, facing: -1 }),
        C("homem", 120, "bow", { id: "irmaoB", dy: 0.68, facing: -1 }),
        C("multidao", 216, "bow", { dy: 0.4 }),
      ] }),
      b(14, { env: { glory: 0.34, night: 0.26 }, cast: [                                        // depois de sepultar o pai, VOLTOU JOSÉ PARA O EGITO com todos
        C("jose", 96, "walk", { glow: 0.35, dy: 0.54, facing: 1 }),
        C("homem", 40, "walk", { dy: 0.6, facing: 1 }),
        C("homem", -20, "walk", { id: "irmaoB", dy: 0.66, facing: 1 }),
        C("multidao", 190, "walk", { dy: 0.4, facing: 1 }),
      ] }),
      // ------------------------------------------------------ O MEDO DOS IRMÃOS
      b(15, { by: "homem", q: "disseram: ", set: "casaJose", props: CASA_JOSE, env: { terrain: "city", night: 0.36, glory: 0.18 }, cast: [ // "PORVENTURA NOS ODIARÁ JOSÉ e nos retribuirá todo o mal?"
        C("homem", -30, "stand", { dy: 0.6, facing: 1 }),
        C("homem", 24, "bow", { id: "irmaoB", dy: 0.66, facing: 1 }),
        C("multidao", 176, "stand", { dy: 0.42 }),
      ] }),
      b(16, { by: "servo", q: "mandaram dizer a José: ", env: { night: 0.34 }, cast: [           // A MENSAGEM: "Teu pai ordenou, antes da sua morte, dizendo:"
        C("homem", -66, "point", { dy: 0.62, facing: 1 }),
        C("homem", -14, "stand", { id: "irmaoB", dy: 0.68, facing: 1 }),
        C("servo", 56, "walk", { dy: 0.58, facing: 1 }),
        C("jose", 130, "stand", { glow: 0.35, dy: 0.5, facing: -1 }),
        C("multidao", 226, "stand", { dy: 0.42 }),
      ] }),
      b(17, { by: "servo", q: "Assim direis a José: ", env: { night: 0.32, glory: 0.24 }, cast: [ // "PERDOA, ROGO-TE, a transgressão de teus irmãos" — E JOSÉ CHOROU
        C("servo", 40, "bow", { dy: 0.58, facing: 1 }),
        C("jose", 106, "bow", { glow: 0.35, dy: 0.5, facing: -1 }),
        C("homem", -66, "stand", { dy: 0.62, facing: 1 }),
        C("multidao", 226, "stand", { dy: 0.42 }),
      ] }),
      b(18, { by: "homem", q: "e disseram: ", env: { night: 0.3, glory: 0.3 }, cast: [            // OS IRMÃOS CAEM diante dele: "EIS-NOS AQUI POR TEUS SERVOS"
        C("jose", 84, "stand", { glow: 0.4, dy: 0.48, facing: -1 }),
        C("homem", 10, "lie", { dy: 0.6, facing: 1 }),
        C("homem", -46, "bow", { id: "irmaoB", dy: 0.66, facing: 1 }),
        C("multidao", 200, "bow", { dy: 0.42 }),
      ] }),
      // ------------------------------- "DEUS O INTENTOU PARA BEM" (o verso-chave)
      b(19, { by: "jose", q: "E José lhes disse: ", env: { night: 0.24, glory: 0.5 }, cast: [      // "NÃO TEMAIS; porventura estou eu em lugar de Deus?"
        C("jose", 70, "point", { glow: 0.5, dy: 0.48, facing: -1 }),
        C("homem", 6, "kneel", { dy: 0.6, facing: 1 }),
        C("homem", -46, "kneel", { id: "irmaoB", dy: 0.66, facing: 1 }),
        C("multidao", 200, "kneel", { dy: 0.42 }),
      ] }),
      b(20, { by: "jose", props: CASA_JOSE_VIDA, env: { night: 0.12, glory: 0.9 }, cast: [         // "VÓS BEM INTENTASTES MAL… PORÉM DEUS O INTENTOU PARA BEM"
        C("jose", 60, "raise", { glow: 0.75, dy: 0.48, facing: -1 }),
        C("homem", 0, "kneel", { dy: 0.6, facing: 1 }),
        C("homem", -52, "kneel", { id: "irmaoB", dy: 0.66, facing: 1 }),
        C("multidao", 196, "kneel", { dy: 0.42 }),
      ] }),
      b(21, { by: "jose", env: { glory: 0.8, night: 0.14 }, cast: [                                // "EU VOS SUSTENTAREI" — consolou-os e FALOU SEGUNDO O CORAÇÃO DELES
        C("jose", 34, "stand", { glow: 0.6, dy: 0.5, facing: -1 }),
        C("homem", -14, "stand", { dy: 0.56, facing: 1 }),
        C("homem", -66, "stand", { id: "irmaoB", dy: 0.62, facing: 1 }),
        C("multidao", 180, "stand", { dy: 0.42 }),
      ] }),
      // ------------------------------------------------------- A VELHICE DE JOSÉ
      b(22, { set: "casaIsrael", props: TENDA_ISRAEL, env: { terrain: "field", night: 0.2, glory: 0.42 }, cast: [ // José habitou no Egito com a casa de seu pai: CENTO E DEZ ANOS
        C("jose", 30, "stand", { glow: 0.4, dy: 0.5 }),
        C("homem", -60, "stand", { dy: 0.58 }),
        C("multidao", 190, "stand", { dy: 0.4 }),
        C("rebanho", 292, "stand", { dy: 0.6 }),
      ] }),
      b(23, { env: { glory: 0.46, night: 0.18 }, cast: [                                           // OS FILHOS DE EFRAIM, da TERCEIRA GERAÇÃO, sobre os joelhos de José
        C("jose", 20, "kneel", { glow: 0.45, dy: 0.52 }),
        C("pastor", 74, "stand", { id: "neto1", dy: 0.6, scale: 0.72, facing: -1 }),
        C("pastor", 112, "stand", { id: "neto2", dy: 0.66, scale: 0.68, facing: -1 }),
        C("homem", -66, "stand", { dy: 0.58 }),
        C("multidao", 214, "stand", { dy: 0.4 }),
      ] }),
      // --------------------------------------- "DEUS CERTAMENTE VOS VISITARÁ"
      b(24, { by: "jose", q: "E disse José a seus irmãos: ", props: TENDA_JURAMENTO, env: { glory: 0.66, night: 0.16 }, cast: [ // "EU MORRO; MAS DEUS CERTAMENTE VOS VISITARÁ… à terra que jurou"
        C("jose", 26, "point", { glow: 0.55, dy: 0.5, facing: -1 }),
        C("homem", -34, "stand", { dy: 0.58, facing: 1 }),
        C("homem", -88, "stand", { id: "irmaoB", dy: 0.64, facing: 1 }),
        C("multidao", 196, "stand", { dy: 0.4 }),
      ] }),
      b(25, { by: "jose", q: "dizendo: ", env: { glory: 0.7, night: 0.14 }, cast: [                 // O JURAMENTO: "FAREIS TRANSPORTAR OS MEUS OSSOS DAQUI"
        C("jose", 20, "raise", { glow: 0.6, dy: 0.5, facing: -1 }),
        C("homem", -34, "raise", { dy: 0.58, facing: 1 }),
        C("homem", -88, "kneel", { id: "irmaoB", dy: 0.64, facing: 1 }),
        C("multidao", 190, "raise", { dy: 0.4 }),
      ] }),
      b(26, { props: TENDA_CAIXAO, env: { night: 0.4, glory: 0.3 }, cast: [                          // MORREU JOSÉ de cento e dez anos — "e o puseram num CAIXÃO no Egito"
        C("homem", -44, "bow", { dy: 0.6 }),
        C("homem", 26, "bow", { id: "irmaoB", dy: 0.66 }),
        C("multidao", 172, "bow", { dy: 0.42 }),
        C("multidao", 268, "stand", { id: "israelFundo", dy: 0.24 }),
      ] }),
    ],
  },
};
