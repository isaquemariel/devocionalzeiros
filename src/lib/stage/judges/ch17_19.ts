// ============================================================================
// JUÍZES 17–19 — CENA VIVA. O APÊNDICE SOMBRIO DO LIVRO: o que acontece quando
// "não havia rei em Israel; cada um fazia o que parecia bem aos seus olhos".
//
// Jz 17 — MICA, da montanha de Efraim, confessa à mãe a prata FURTADA (mil e
// cem moedas). A mãe o abençoa "do Senhor" e dedica o dinheiro… para fundir um
// ÍDOLO. Duzentas moedas vão ao ourives, e nasce a "casa de deuses": imagem de
// escultura, imagem de fundição, ÉFODE caseiro e terafins, com um filho
// consagrado por sacerdote. Depois chega um LEVITA peregrino de Belém, e Mica
// o ALUGA por dez moedas de prata por ano, roupa e sustento — "agora sei que o
// SENHOR me fará bem; porquanto tenho um levita por sacerdote" (17:13): a fé
// virada superstição, o culto virado propriedade particular. O refrão do
// capítulo (17:6) é o diagnóstico do livro inteiro.
//
// Jz 18 — A APOSTASIA SE INSTITUCIONALIZA. Dã, sem herança, envia cinco espias;
// eles dormem na casa de Mica, consultam o oráculo caseiro e recebem um "ide em
// paz" barato. Espiam LAÍS — povo quieto, confiado, sem defensor — e voltam
// chamando os seus. SEISCENTOS homens munidos de armas de guerra sobem, param à
// entrada da porta de Mica e ROUBAM o ídolo, o éfode, os terafins e o próprio
// sacerdote ("é melhor ser sacerdote de uma tribo do que de um só homem"). Mica
// corre atrás e volta calado, porque eram mais fortes. Laís é ferida ao fio da
// espada e queimada; sobre as ruínas erguem a cidade de Dã — e ali levantam a
// imagem, com sacerdócio hereditário, "por todos os dias em que a casa de Deus
// esteve em Siló". Um santuário de mentira ao lado do santuário verdadeiro.
//
// Jz 19 — HORROR E LUTO. Um levita de Efraim, a concubina que o deixa, a volta
// a Belém, a hospitalidade insistente do sogro; a recusa de Jebus, e Gibeá de
// Benjamim, onde NINGUÉM os recolhe — só um velho de Efraim, forasteiro como
// eles. Os filhos de Belial cercam a casa; a maldade de Gibeá; a mulher deixada
// à alva, caída à PORTA, as mãos sobre o limiar. Os doze pedaços enviados por
// todos os termos de Israel, e o clamor: "Nunca tal se fez, nem se viu desde o
// dia em que os filhos de Israel subiram da terra do Egito".
//
// DIREÇÃO DO CAPÍTULO 19 (obrigatória): night ALTO, glória BAIXÍSSIMA, NENHUM
// `glow`, NUNCA `multidao` festiva — só figuras INDIVIDUAIS (`homem`,
// `mulherComum`, `servo`) em `lie`/`bow`/`kneel`. Gravidade e reverência; a
// violência fica FORA de cena (os agressores ao longe, de costas), e o palco
// guarda o que a Escritura guarda: a porta, o limiar, o silêncio.
//
// A VOZ DE DEUS: Deus NÃO fala em 17–19. O "oráculo" de 18:6 sai da boca do
// sacerdote alugado (`by: "servo"`) — é precisamente esse o escândalo. Nenhum
// beat usa `by: "deus"`.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------- Jz 17 sets
// A MONTANHA DE EFRAIM — o alto pedregoso onde mora Mica.
const EFRAIM: StagePropSpec[] = [
  P("rock", 255, 1.2, undefined, 0.3),
  P("tree", -235, 1.3, undefined, 0.22),
  P("palm", -330, 1.0, undefined, 0.14),
  P("bush", 115, 0.9, undefined, 0.62),
  P("grass", -60, 0.78, undefined, 0.72),
];
// A CASA DE MICA — a porta, os fardos, o pátio de uma casa qualquer de Israel.
const CASA_MICA: StagePropSpec[] = [
  { ...P("church", 165, 1.25, undefined, 0.26), tag: "casa-de-mica" },
  P("door", 55, 0.95, undefined, 0.42),
  P("crate", -230, 0.9, undefined, 0.5),
  P("amphora", 250, 0.85, undefined, 0.58),
  P("tree", -320, 1.15, undefined, 0.18),
  P("grass", -110, 0.76, undefined, 0.72),
];
// A PRATA RESTITUÍDA — as mil e cem moedas de volta às mãos da mãe.
const PRATA: StagePropSpec[] = [
  { ...P("crate", -20, 1.05, undefined, 0.6), tag: "mil-e-cem-moedas-de-prata" },
  P("church", 175, 1.2, undefined, 0.26),
  P("amphora", -235, 0.85, undefined, 0.54),
  P("tree", -330, 1.1, undefined, 0.18),
  P("grass", 120, 0.76, undefined, 0.72),
];
// A OFICINA DO OURIVES — a forja acesa e a IMAGEM DE FUNDIÇÃO tomando forma.
const FORJA: StagePropSpec[] = [
  { ...P("campfire", -150, 1.05, 0.9, 0.52), tag: "forja-do-ourives" },
  { ...P("calf", 60, 1.1, undefined, 0.5), tag: "imagem-de-fundicao" },
  P("church", 210, 1.15, undefined, 0.26),
  P("crate", -255, 0.9, undefined, 0.58),
  P("grass", 130, 0.76, undefined, 0.74),
];
// A CASA DE DEUSES — o santuário particular de Mica: o ídolo, o éfode caseiro
// e os terafins, com luz mesquinha (nada de glória: isto NÃO é o Senhor).
const CASA_DEUSES: StagePropSpec[] = [
  { ...P("calf", -20, 1.28, undefined, 0.52), tag: "idolo-de-mica" },
  { ...P("altar", 135, 1.0, undefined, 0.42), tag: "efode-e-terafins-de-mica" },
  P("church", 245, 1.2, undefined, 0.24),
  P("lampstand", -175, 0.9, undefined, 0.5),
  P("door", -295, 0.9, undefined, 0.32),
  P("grass", 70, 0.74, undefined, 0.78),
];
// NÃO HAVIA REI — a cidade sem justiça: portas abertas, cada um por si.
const SEM_REI: StagePropSpec[] = [
  P("door", -150, 0.95, undefined, 0.44),
  P("church", 190, 1.15, undefined, 0.28),
  P("tower", -265, 1.1, undefined, 0.3),
  P("bush", 60, 0.85, undefined, 0.64),
  P("rock", 300, 1.05, undefined, 0.36),
  P("grass", -40, 0.74, undefined, 0.76),
];
// A ESTRADA DO LEVITA — o moço de Belém peregrinando "onde quer que achasse".
const ESTRADA: StagePropSpec[] = [
  P("palm", 300, 1.05, undefined, 0.16),
  P("rock", -280, 1.1, undefined, 0.3),
  P("tree", 175, 1.2, undefined, 0.22),
  P("bush", -120, 0.85, undefined, 0.6),
  P("grass", 40, 0.76, undefined, 0.72),
];

// ---------------------------------------------------------------- Jz 18 sets
// ZORÁ E ESTAOL — as tendas de Dã, a tribo que ainda buscava herança.
const ZORA: StagePropSpec[] = [
  P("tent", -220, 1.1, undefined, 0.22),
  P("tent", 215, 1.05, undefined, 0.26),
  P("rock", 310, 1.1, undefined, 0.34),
  P("tree", -320, 1.15, undefined, 0.18),
  P("grass", 40, 0.76, undefined, 0.72),
];
// LAÍS — o povo quieto e confiado, sem muros e sem defensor: o poço, o gado,
// a vinha. Um lugar em paz, visto pelos olhos de quem já veio para tomá-lo.
const LAIS: StagePropSpec[] = [
  { ...P("church", 160, 1.25, undefined, 0.26), tag: "lais-quieta-e-confiada" },
  P("well", -140, 0.95, undefined, 0.5),
  P("stall", 265, 1.0, undefined, 0.48),
  P("palm", -320, 1.05, undefined, 0.14),
  P("grapes", 40, 0.85, undefined, 0.66),
  P("grass", -45, 0.76, undefined, 0.74),
];
// A MARCHA DOS SEISCENTOS — a estrada do alto, poeira e armas.
const MARCHA: StagePropSpec[] = [
  P("rock", 300, 1.1, undefined, 0.32),
  P("tree", -280, 1.2, undefined, 0.2),
  P("tent", 150, 1.0, undefined, 0.22),
  P("bush", -120, 0.85, undefined, 0.64),
  P("grass", 60, 0.76, undefined, 0.74),
];
// MAANÉ-DÃ — o arraial de Dã por detrás de Quiriate-Jearim, a fogueira à noite.
const MAANE_DA: StagePropSpec[] = [
  P("tent", -185, 1.1, undefined, 0.24),
  P("tent", 155, 1.05, undefined, 0.28),
  { ...P("campfire", -20, 1.0, 0.8, 0.54), tag: "maane-da" },
  P("rock", 300, 1.05, undefined, 0.34),
  { ...P("moon", 80, 1.2, undefined, 0.74), sky: true },
  P("grass", 95, 0.74, undefined, 0.76),
];
// LAÍS FERIDA E QUEIMADA — a cidade pacífica em ruínas e fogo.
const LAIS_QUEIMADA: StagePropSpec[] = [
  { ...P("campfire", 120, 1.35, 1, 0.46), tag: "lais-queimada-a-fogo" },
  P("rock", 15, 1.15, undefined, 0.62),
  P("rock", 240, 1.1, undefined, 0.56),
  P("church", -175, 1.1, undefined, 0.3),
  P("rock", 320, 1.0, undefined, 0.36),
  P("grass", -60, 0.74, undefined, 0.8),
];
// DÃ — a cidade reedificada sobre Laís, com o nome do pai da tribo.
const DA_CIDADE: StagePropSpec[] = [
  { ...P("church", 150, 1.25, undefined, 0.26), tag: "da-que-antes-era-lais" },
  P("tower", -165, 1.15, undefined, 0.3),
  P("well", 40, 0.9, undefined, 0.52),
  P("stall", 265, 1.0, undefined, 0.48),
  P("palm", -320, 1.0, undefined, 0.14),
  P("grass", -60, 0.74, undefined, 0.76),
];
// O SANTUÁRIO DE DÃ — a imagem roubada, levantada como culto de uma TRIBO.
const DA_SANTUARIO: StagePropSpec[] = [
  { ...P("calf", 0, 1.35, undefined, 0.5), tag: "imagem-de-escultura-em-da" },
  { ...P("altar", 155, 1.05, undefined, 0.42), tag: "santuario-de-da" },
  P("church", 255, 1.15, undefined, 0.24),
  P("lampstand", -165, 0.9, undefined, 0.48),
  P("grass", 70, 0.74, undefined, 0.78),
];
// SILÓ — a CASA DE DEUS verdadeira, de pé o tempo todo, poucos quilômetros ao
// sul: o contraste silencioso com o ídolo de Dã.
const SILO: StagePropSpec[] = [
  { ...P("tent", 0, 1.4, undefined, 0.3), tag: "casa-de-deus-em-silo" },
  { ...P("ark", 145, 0.95, undefined, 0.52), tag: "arca-em-silo" },
  P("altar", -165, 1.0, undefined, 0.44),
  P("palm", 310, 1.0, undefined, 0.16),
  P("grass", -60, 0.74, undefined, 0.76),
];

// ---------------------------------------------------------------- Jz 19 sets
// OS LADOS DA MONTANHA DE EFRAIM — o levita e a sua concubina, ao anoitecer.
const EFRAIM19: StagePropSpec[] = [
  P("rock", 260, 1.15, undefined, 0.3),
  P("tree", -240, 1.25, undefined, 0.22),
  P("bush", 110, 0.85, undefined, 0.62),
  P("palm", -330, 1.0, undefined, 0.14),
  P("grass", -60, 0.76, undefined, 0.72),
];
// A CASA DO PAI DA MOÇA, em Belém de Judá — o pátio, o par de jumentos, o pão
// e o vinho dos cinco dias de hospitalidade insistente.
const CASA_PAI: StagePropSpec[] = [
  { ...P("church", 200, 1.2, undefined, 0.26), tag: "casa-do-pai-da-moca" },
  P("door", 105, 0.95, undefined, 0.42),
  P("stall", -250, 1.0, undefined, 0.5),
  P("amphora", -60, 0.85, undefined, 0.62),
  P("grapes", 25, 0.8, undefined, 0.68),
  P("grass", -150, 0.76, undefined, 0.74),
];
// A ESTRADA DE JEBUS — a torre da cidade estranha e o sol já declinando.
const ESTRADA19: StagePropSpec[] = [
  { ...P("tower", 250, 1.25, undefined, 0.26), tag: "jebus-que-e-jerusalem" },
  P("stall", -230, 1.0, undefined, 0.52),
  P("rock", 130, 1.1, undefined, 0.4),
  { ...P("sun", -80, 1.15, undefined, 0.16), sky: true },
  P("bush", -125, 0.85, undefined, 0.66),
  P("grass", 20, 0.76, undefined, 0.74),
];
// GIBEÁ DE BENJAMIM — o sol posto sobre a cidade que não abre porta.
const GIBEA: StagePropSpec[] = [
  { ...P("tower", 170, 1.2, undefined, 0.28), tag: "gibea-de-benjamim" },
  P("church", -180, 1.1, undefined, 0.3),
  P("door", 40, 0.95, undefined, 0.44),
  { ...P("moon", 60, 1.3, undefined, 0.72), sky: true },
  P("rock", 300, 1.05, undefined, 0.38),
  P("grass", -80, 0.74, undefined, 0.76),
];
// A PRAÇA DE GIBEÁ — o viajante assentado ao relento, porque ninguém o recolhe.
const PRACA: StagePropSpec[] = [
  { ...P("church", 215, 1.2, undefined, 0.26), tag: "praca-de-gibea" },
  P("tower", -215, 1.15, undefined, 0.3),
  P("well", 120, 0.9, undefined, 0.5),
  P("door", -80, 0.9, undefined, 0.42),
  { ...P("moon", -40, 1.25, undefined, 0.74), sky: true },
  P("grass", 20, 0.74, undefined, 0.78),
];
// O VELHO QUE VEM DO CAMPO — o único de Efraim, forasteiro na própria terra.
const VELHO_DO_CAMPO: StagePropSpec[] = [
  P("sheaf", 150, 0.9, undefined, 0.6),
  { ...P("church", 220, 1.2, undefined, 0.26), tag: "praca-de-gibea" },
  P("tower", -215, 1.15, undefined, 0.3),
  P("door", -80, 0.9, undefined, 0.42),
  { ...P("moon", -40, 1.25, undefined, 0.74), sky: true },
  P("grass", 30, 0.74, undefined, 0.78),
];
// A CASA DO VELHO — e A PORTA, que este capítulo nunca mais deixa esquecer.
const CASA_VELHO: StagePropSpec[] = [
  { ...P("door", 0, 1.15, undefined, 0.5), tag: "porta-da-casa-em-gibea" },
  { ...P("church", 180, 1.25, undefined, 0.26), tag: "casa-do-velho-de-gibea" },
  P("stall", -235, 1.0, undefined, 0.5),
  P("amphora", 110, 0.8, undefined, 0.66),
  { ...P("moon", -120, 1.2, undefined, 0.78), sky: true },
  P("grass", -90, 0.74, undefined, 0.8),
];
// A CASA DO LEVITA em Efraim — o fim da viagem, e o silêncio.
const CASA_LEVITA: StagePropSpec[] = [
  { ...P("church", -170, 1.2, undefined, 0.28), tag: "casa-do-levita-em-efraim" },
  P("door", -40, 0.95, undefined, 0.46),
  P("stall", 220, 1.0, undefined, 0.5),
  P("tree", 100, 1.15, undefined, 0.2),
  P("rock", 310, 1.05, undefined, 0.36),
  P("grass", 40, 0.74, undefined, 0.8),
];
// TODOS OS TERMOS DE ISRAEL — as tendas e as cidades que recebem os pedaços.
const ISRAEL_TODO: StagePropSpec[] = [
  P("tent", -250, 1.05, undefined, 0.22),
  P("tent", 250, 1.0, undefined, 0.26),
  P("tower", 65, 1.1, undefined, 0.24),
  P("church", -35, 1.0, undefined, 0.32),
  P("rock", -140, 1.05, undefined, 0.4),
  P("grass", 135, 0.74, undefined, 0.78),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Jz 17
  17: {
    start: { terrain: "mountain", night: 0.34, glory: 0.14, storm: 0, fire: 0, verdure: 0.34 },
    beats: [
      // v.1 — um homem da montanha de Efraim: MICA. Nome que diz "quem é como o
      // Senhor?" — e a vida inteira dele vai negar a pergunta.
      b(1, { q: "cujo nome era Mica", set: "efraim", props: EFRAIM,
        env: { terrain: "mountain", night: 0.34, glory: 0.14, verdure: 0.34 }, cast: [
        C("homem", 0, "stand", { dy: 0.52, facing: 1, id: "mica" }),
      ] }),
      // v.2 — a CONFISSÃO do furto: as mil e cem moedas estavam com o filho, e
      // a mãe, que já lançara maldições sobre o ladrão, agora o abençoa.
      b(2, { by: "homem", q: "O qual disse à sua mãe:", set: "casa-mica", props: CASA_MICA,
        env: { terrain: "city", night: 0.36, glory: 0.12 }, cast: [
        C("homem", -80, "bow", { dy: 0.54, facing: 1, id: "mica" }),
        C("mulherComum", 90, "stand", { dy: 0.5, facing: -1, id: "mae-de-mica" }),
      ] }),
      // v.3 — a mãe "dedica ao Senhor" o dinheiro… para fazer uma imagem de
      // escultura e uma de fundição. Nome santo, obra proibida.
      b(3, { by: "mulherComum", q: "porém sua mãe disse:", props: PRATA, cast: [
        C("mulherComum", 75, "raise", { dy: 0.5, facing: -1, id: "mae-de-mica" }),
        C("homem", -100, "stand", { dy: 0.54, facing: 1, id: "mica" }),
      ] }),
      // v.4 — das mil e cem, só duzentas chegam ao ourives; a forja acesa e o
      // ídolo ganhando corpo dentro da casa de Mica.
      b(4, { q: "e sua mãe tomou duzentas moedas de prata", set: "forja", props: FORJA,
        env: { terrain: "city", night: 0.4, glory: 0.1, fire: 0.35 }, cast: [
        C("homem", -95, "kneel", { dy: 0.56, facing: 1, id: "ourives" }),
        C("mulherComum", 150, "stand", { dy: 0.48, facing: -1, id: "mae-de-mica" }),
        C("homem", 235, "stand", { dy: 0.44, facing: -1, id: "mica" }),
      ] }),
      // v.5 — a CASA DE DEUSES: éfode caseiro, terafins, e um filho consagrado
      // por sacerdote. Cada peça do culto do Senhor, copiada e falsificada.
      b(5, { q: "e fez um éfode e terafins", set: "casa-deuses", props: CASA_DEUSES,
        env: { terrain: "city", night: 0.42, glory: 0.08, fire: 0.12 }, cast: [
        C("homem", -125, "raise", { dy: 0.56, facing: 1, id: "mica" }),
        C("servo", 60, "stand", { dy: 0.5, facing: -1, id: "filho-sacerdote" }),
      ] }),
      // v.6 — O REFRÃO DO LIVRO. Sem rei, sem juízo, sem norte: cada um o que
      // parecia bem AOS SEUS OLHOS. Figuras soltas, cada uma para o seu lado.
      b(6, { q: "Naqueles dias não havia rei em Israel", set: "sem-rei", props: SEM_REI,
        env: { terrain: "city", night: 0.46, glory: 0.06, verdure: 0.3 }, cast: [
        C("homem", -215, "walk", { dy: 0.5, facing: -1, id: "um-de-israel" }),
        C("mulherComum", 205, "walk", { dy: 0.56, facing: 1, id: "outra-de-israel" }),
        C("servo", 20, "walk", { dy: 0.62, facing: -1, id: "mais-um-de-israel" }),
      ] }),
      // v.7 — um MOÇO de Belém de Judá, levita, peregrinando: um sacerdote sem
      // lugar num Israel que já não sustenta o sacerdócio.
      b(7, { q: "que era levita, e peregrinava ali", set: "estrada", props: ESTRADA,
        env: { terrain: "field", night: 0.34, glory: 0.16, verdure: 0.36 }, cast: [
        C("servo", -20, "walk", { dy: 0.54, facing: 1, id: "levita" }),
      ] }),
      // v.8 — sai de Belém "para peregrinar onde quer que achasse conveniente"
      // e o caminho o leva justamente à porta de Mica.
      b(8, { q: "Chegando ele, pois, à montanha de Efraim", set: "casa-mica", props: CASA_MICA,
        env: { terrain: "city", night: 0.36, glory: 0.14 }, cast: [
        C("servo", -160, "walk", { dy: 0.54, facing: 1, id: "levita" }),
        C("homem", 100, "stand", { dy: 0.48, facing: -1, id: "mica" }),
      ] }),
      // v.9 — "Donde vens?" O levita se apresenta: de Belém, sem destino certo.
      b(9, { by: "homem", q: "Disse-lhe Mica:", cast: [
        C("homem", -95, "point", { dy: 0.5, facing: 1, id: "mica" }),
        C("servo", 90, "stand", { dy: 0.54, facing: -1, id: "levita" }),
      ] }),
      // v.10 — O CONTRATO: dez moedas de prata POR ANO, vestuário e sustento —
      // e um "pai e sacerdote" comprado como se compra um servo. "E o levita
      // entrou": entrou na casa, e entrou no negócio.
      b(10, { by: "homem", q: "Então lhe disse Mica:", cast: [
        C("homem", -95, "raise", { dy: 0.5, facing: 1, id: "mica" }),
        C("servo", 85, "stand", { dy: 0.54, facing: -1, id: "levita" }),
        C("mulherComum", 215, "stand", { dy: 0.44, facing: -1, id: "mae-de-mica" }),
      ] }),
      // v.11 — o moço consente e passa a ser "como um dos filhos" da casa: o
      // sacerdócio virou assunto de família.
      b(11, { q: "e o moço lhe foi como um de seus filhos", cast: [
        C("homem", -85, "stand", { dy: 0.5, facing: 1, id: "mica" }),
        C("servo", 65, "stand", { dy: 0.54, facing: -1, id: "levita" }),
        C("servo", 190, "stand", { dy: 0.44, facing: -1, id: "filho-sacerdote" }),
      ] }),
      // v.12 — MICA consagra o levita. Um homem qualquer ordenando sacerdote,
      // diante de um ídolo, na sua própria sala.
      b(12, { q: "E Mica consagrou o levita", set: "casa-deuses", props: CASA_DEUSES,
        env: { terrain: "city", night: 0.42, glory: 0.08, fire: 0.12 }, cast: [
        C("homem", -135, "raise", { dy: 0.54, facing: 1, id: "mica" }),
        C("servo", 55, "kneel", { dy: 0.58, facing: -1, id: "levita" }),
      ] }),
      // v.13 — o CLÍMAX DA SUPERSTIÇÃO: "agora sei que o SENHOR me fará bem;
      // porquanto tenho um levita por sacerdote". Contabilidade religiosa —
      // o Nome usado como amuleto. A glória do palco NÃO sobe: Deus não está
      // nesta casa por causa do levita.
      b(13, { by: "homem", q: "Então disse Mica:", env: { night: 0.44, glory: 0.07 }, cast: [
        C("homem", -80, "raise", { dy: 0.54, facing: 1, id: "mica" }),
        C("servo", 95, "stand", { dy: 0.5, facing: -1, id: "levita" }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Jz 18
  18: {
    start: { terrain: "mountain", night: 0.36, glory: 0.13, storm: 0, fire: 0, verdure: 0.34 },
    beats: [
      // v.1 — de novo o refrão: sem rei. E Dã, sem herança tomada, procurando
      // por conta própria o que devia ter recebido pela fé.
      b(1, { q: "Naqueles dias não havia rei em Israel", set: "zora", props: ZORA,
        env: { terrain: "mountain", night: 0.36, glory: 0.13, verdure: 0.34 }, cast: [
        C("homem", -70, "stand", { dy: 0.52, facing: 1, id: "danita" }),
        C("homem", 75, "stand", { dy: 0.48, facing: -1, id: "danita2" }),
        C("multidao", 215, "stand", { dy: 0.2, scale: 0.9, id: "tribo-de-da" }),
      ] }),
      // v.2 — CINCO homens valorosos de Zorá e Estaol são enviados a espiar; a
      // primeira parada é a casa de Mica, onde passam a noite.
      b(2, { q: "cinco homens dentre eles, homens valorosos, de Zorá e de Estaol", cast: [
        C("homem", -175, "walk", { dy: 0.5, facing: 1, id: "espia1" }),
        C("homem", -85, "walk", { dy: 0.54, facing: 1, id: "espia2" }),
        C("homem", 5, "walk", { dy: 0.58, facing: 1, id: "espia3" }),
        C("homem", 95, "walk", { dy: 0.5, facing: 1, id: "espia4" }),
        C("homem", 185, "walk", { dy: 0.46, facing: 1, id: "espia5" }),
      ] }),
      // v.3 — reconhecem a VOZ do moço levita (sotaque de Belém no alto de
      // Efraim) e o interrogam: quem te trouxe? que fazes? que tens aqui?
      b(3, { by: "homem", q: "lhe disseram:", set: "casa-mica", props: CASA_MICA,
        env: { terrain: "city", night: 0.5, glory: 0.09 }, cast: [
        C("homem", -125, "point", { dy: 0.54, facing: 1, id: "espia1" }),
        C("homem", -215, "stand", { dy: 0.48, facing: 1, id: "espia2" }),
        C("servo", 85, "stand", { dy: 0.52, facing: -1, id: "levita" }),
      ] }),
      // v.4 — a resposta desarmada: "me tem contratado, e eu lhe sirvo de
      // sacerdote". Um ministério com preço de tabela.
      b(4, { by: "servo", q: "E ele lhes disse:", cast: [
        C("servo", 70, "stand", { dy: 0.54, facing: -1, id: "levita" }),
        C("homem", -120, "stand", { dy: 0.52, facing: 1, id: "espia1" }),
        C("homem", -215, "stand", { dy: 0.46, facing: 1, id: "espia2" }),
      ] }),
      // v.5 — "Consulta a Deus": querem o carimbo do céu para um plano já
      // decidido, e vão pedi-lo a um oráculo de fundição.
      b(5, { by: "homem", q: "Então lhe disseram:", set: "casa-deuses", props: CASA_DEUSES,
        env: { terrain: "city", night: 0.5, glory: 0.07, fire: 0.12 }, cast: [
        C("homem", -145, "point", { dy: 0.54, facing: 1, id: "espia1" }),
        C("homem", -235, "stand", { dy: 0.48, facing: 1, id: "espia2" }),
        C("servo", 90, "stand", { dy: 0.5, facing: -1, id: "levita" }),
      ] }),
      // v.6 — "Ide em paz; o caminho que seguis está perante o Senhor". O
      // sacerdote alugado fala em nome de Deus SEM Deus ter falado: a bênção
      // barata que absolve a violência que vem aí.
      b(6, { by: "servo", q: "E disse-lhes o sacerdote:", cast: [
        C("servo", 85, "raise", { dy: 0.5, facing: -1, id: "levita" }),
        C("homem", -140, "stand", { dy: 0.54, facing: 1, id: "espia1" }),
        C("homem", -230, "stand", { dy: 0.48, facing: 1, id: "espia2" }),
      ] }),
      // v.7 — LAÍS: povo seguro, quieto e confiado, longe dos sidônios, sem
      // relação com ninguém — isto é, sem ninguém que os socorra.
      b(7, { q: "e viram que o povo que havia no meio dela estava seguro", set: "lais", props: LAIS,
        env: { terrain: "field", night: 0.24, glory: 0.3, verdure: 0.62, fire: 0 }, cast: [
        C("mulherComum", 60, "stand", { dy: 0.5, facing: -1, id: "mulher-de-lais" }),
        C("homem", 165, "stand", { dy: 0.56, facing: -1, id: "homem-de-lais" }),
        C("homem", -215, "stand", { dy: 0.44, facing: 1, id: "espia1" }),
        C("homem", -290, "stand", { dy: 0.4, facing: 1, id: "espia2" }),
      ] }),
      // v.8 — de volta a Zorá e Estaol: "Que dizeis vós?" — a tribo inteira à
      // espera do relatório.
      b(8, { by: "homem", q: "os quais lhes disseram:", set: "zora", props: ZORA,
        env: { terrain: "mountain", night: 0.34, glory: 0.14, verdure: 0.34 }, cast: [
        C("homem", 90, "point", { dy: 0.5, facing: -1, id: "irmao-danita" }),
        C("homem", -95, "stand", { dy: 0.54, facing: 1, id: "espia1" }),
        C("homem", -185, "stand", { dy: 0.48, facing: 1, id: "espia2" }),
        C("multidao", 230, "stand", { dy: 0.2, scale: 0.9, id: "tribo-de-da" }),
      ] }),
      // v.9 — "Levantai-vos, e subamos contra eles… não sejais preguiçosos":
      // a terra é boa e o povo é fraco — o cálculo, não o mandamento.
      b(9, { by: "homem", q: "E eles disseram:", cast: [
        C("homem", -110, "raise", { dy: 0.54, facing: 1, id: "espia1" }),
        C("homem", -205, "stand", { dy: 0.48, facing: 1, id: "espia2" }),
        C("homem", 105, "stand", { dy: 0.5, facing: -1, id: "irmao-danita" }),
        C("multidao", 235, "stand", { dy: 0.2, scale: 0.9, id: "tribo-de-da" }),
      ] }),
      // v.10 — "Deus vo-la entregou nas mãos": o nome de Deus outra vez posto
      // sobre uma decisão que ninguém consultou de verdade.
      b(10, { by: "homem", q: "Quando lá chegardes", cast: [
        C("homem", -110, "point", { dy: 0.54, facing: 1, id: "espia1" }),
        C("homem", -205, "raise", { dy: 0.48, facing: 1, id: "espia2" }),
        C("homem", 110, "stand", { dy: 0.5, facing: -1, id: "irmao-danita" }),
        C("multidao", 240, "stand", { dy: 0.2, scale: 0.9, id: "tribo-de-da" }),
      ] }),
      // v.11 — SEISCENTOS homens munidos de armas de guerra põem-se a caminho.
      // Não é mais um homem com um ídolo: é uma tribo em marcha.
      b(11, { q: "seiscentos homens munidos de armas de guerra", set: "marcha", props: MARCHA,
        env: { terrain: "mountain", night: 0.4, glory: 0.1, verdure: 0.3 }, cast: [
        C("homem", -180, "walk", { dy: 0.56, facing: 1, id: "danita-armado1" }),
        C("homem", -60, "walk", { dy: 0.6, facing: 1, id: "danita-armado2" }),
        C("homem", 60, "walk", { dy: 0.54, facing: 1, id: "danita-armado3" }),
        C("multidao", 200, "stand", { dy: 0.18, scale: 0.95, id: "seiscentos-de-da" }),
      ] }),
      // v.12 — acampam em Quiriate-Jearim, em Judá; o lugar ganha o nome de
      // MAANÉ-DÃ, "o arraial de Dã" — o rastro fica no mapa até hoje.
      b(12, { q: "então chamaram a este lugar Maané-Dã", set: "maane-da", props: MAANE_DA,
        env: { terrain: "field", night: 0.6, glory: 0.08, fire: 0.3, verdure: 0.32 }, cast: [
        C("homem", -95, "stand", { dy: 0.58, facing: 1, id: "danita-armado1" }),
        C("homem", 65, "kneel", { dy: 0.62, facing: -1, id: "danita-armado2" }),
        C("multidao", 235, "stand", { dy: 0.2, scale: 0.9, id: "seiscentos-de-da" }),
      ] }),
      // v.13 — dali passam à montanha de Efraim e chegam OUTRA VEZ à casa de
      // Mica — agora com seiscentas espadas atrás.
      b(13, { q: "e chegaram até a casa de Mica", set: "casa-mica", props: CASA_MICA,
        env: { terrain: "city", night: 0.44, glory: 0.09, fire: 0 }, cast: [
        C("homem", -195, "walk", { dy: 0.56, facing: 1, id: "danita-armado1" }),
        C("homem", -85, "walk", { dy: 0.6, facing: 1, id: "danita-armado2" }),
        C("multidao", 215, "stand", { dy: 0.18, scale: 0.9, id: "seiscentos-de-da" }),
      ] }),
      // v.14 — os cinco lembram aos irmãos o que viram: "há um éfode, e
      // terafins, e uma imagem de escultura e uma de fundição… vede agora o que
      // haveis de fazer". O convite ao roubo, dito em voz de conselho.
      b(14, { by: "homem", q: "e disseram a seus irmãos:", cast: [
        C("homem", -140, "point", { dy: 0.56, facing: 1, id: "espia1" }),
        C("homem", -230, "stand", { dy: 0.5, facing: 1, id: "espia2" }),
        C("homem", 60, "stand", { dy: 0.6, facing: -1, id: "danita-armado1" }),
        C("multidao", 230, "stand", { dy: 0.18, scale: 0.9, id: "seiscentos-de-da" }),
      ] }),
      // v.15 — sobem à casa do moço levita e o SAÚDAM: cortesia na porta,
      // enquanto os seiscentos tomam posição.
      b(15, { q: "e chegaram à casa do moço, o levita", set: "casa-deuses", props: CASA_DEUSES,
        env: { terrain: "city", night: 0.46, glory: 0.07, fire: 0.12 }, cast: [
        C("servo", 95, "stand", { dy: 0.52, facing: -1, id: "levita" }),
        C("homem", -130, "stand", { dy: 0.56, facing: 1, id: "espia1" }),
        C("homem", -225, "stand", { dy: 0.5, facing: 1, id: "espia2" }),
      ] }),
      // v.16 — os SEISCENTOS armados param à entrada da porta: o roubo tem
      // escolta, e a escolta tem armas.
      b(16, { q: "ficaram à entrada da porta", cast: [
        C("homem", -175, "stand", { dy: 0.62, facing: 1, id: "danita-armado1" }),
        C("homem", -85, "stand", { dy: 0.58, facing: 1, id: "danita-armado2" }),
        C("servo", 105, "stand", { dy: 0.5, facing: -1, id: "levita" }),
        C("multidao", 250, "stand", { dy: 0.16, scale: 0.9, id: "seiscentos-de-da" }),
      ] }),
      // v.17 — O ROUBO: os cinco entram e tomam a imagem de escultura, o éfode,
      // os terafins e a imagem de fundição — e o sacerdote fica EM PÉ à porta,
      // olhando. O guardião do santuário não move um dedo.
      b(17, { q: "e tomaram a imagem de escultura, o éfode, e os terafins, e a imagem de fundição", cast: [
        C("homem", -55, "raise", { dy: 0.6, facing: -1, id: "espia1" }),
        C("homem", -150, "walk", { dy: 0.56, facing: 1, id: "espia2" }),
        C("homem", -240, "walk", { dy: 0.5, facing: 1, id: "espia3" }),
        C("servo", 120, "stand", { dy: 0.5, facing: -1, id: "levita" }),
      ] }),
      // v.18 — o sacerdote enfim reage, e a pergunta é quase cômica de tão
      // tardia: "Que estais fazendo?"
      b(18, { by: "servo", q: "disse-lhes o sacerdote:", cast: [
        C("servo", 120, "point", { dy: 0.5, facing: -1, id: "levita" }),
        C("homem", -55, "raise", { dy: 0.6, facing: -1, id: "espia1" }),
        C("homem", -155, "walk", { dy: 0.56, facing: 1, id: "espia2" }),
      ] }),
      // v.19 — "Cala-te, põe a mão na boca, e vem conosco": promoção de carreira
      // no meio de um assalto. Sacerdote de UMA TRIBO vale mais que de um homem.
      b(19, { by: "homem", q: "E eles lhe disseram:", cast: [
        C("homem", -60, "point", { dy: 0.6, facing: -1, id: "danita-armado1" }),
        C("homem", -165, "stand", { dy: 0.56, facing: 1, id: "espia1" }),
        C("servo", 125, "stand", { dy: 0.5, facing: -1, id: "levita" }),
      ] }),
      // v.20 — "alegrou-se o coração do sacerdote": ele mesmo pega o éfode, os
      // terafins e a imagem, e entra no meio do povo. Traiu o patrão e o Senhor
      // pelo mesmo motivo — vantagem.
      b(20, { q: "Então alegrou-se o coração do sacerdote", cast: [
        C("servo", 20, "walk", { dy: 0.58, facing: 1, id: "levita" }),
        C("homem", -140, "walk", { dy: 0.56, facing: 1, id: "espia1" }),
        C("homem", -240, "walk", { dy: 0.5, facing: 1, id: "espia2" }),
        C("multidao", 240, "stand", { dy: 0.18, scale: 0.9, id: "seiscentos-de-da" }),
      ] }),
      // v.21 — partem com os meninos, o gado e a bagagem DIANTE de si: os mais
      // frágeis protegidos à frente, a retaguarda armada — sabiam o que fizeram.
      b(21, { q: "e os meninos, e o gado, e a bagagem puseram diante de si", set: "marcha", props: MARCHA,
        env: { terrain: "mountain", night: 0.42, glory: 0.09, verdure: 0.3 }, cast: [
        C("homem", 150, "walk", { dy: 0.6, facing: 1, id: "danita-armado1" }),
        C("mulherComum", 45, "walk", { dy: 0.64, facing: 1, id: "mulher-danita" }),
        C("servo", -70, "walk", { dy: 0.56, facing: 1, id: "levita" }),
        C("multidao", -230, "stand", { dy: 0.18, scale: 0.9, id: "seiscentos-de-da" }),
      ] }),
      // v.22 — já longe, os vizinhos de Mica se reúnem e ALCANÇAM os filhos de
      // Dã: a corrida desesperada de um homem atrás dos seus deuses.
      b(22, { q: "reuniram-se, e alcançaram os filhos de Dã", cast: [
        C("homem", -215, "walk", { dy: 0.62, facing: 1, id: "mica" }),
        C("homem", -300, "walk", { dy: 0.56, facing: 1, id: "vizinho1" }),
        C("homem", 105, "stand", { dy: 0.6, facing: -1, id: "danita-armado1" }),
        C("multidao", 245, "stand", { dy: 0.18, scale: 0.9, id: "seiscentos-de-da" }),
      ] }),
      // v.23 — os danitas viram o rosto: "Que tens, que tanta gente
      // convocaste?" — o ladrão perguntando à vítima por que faz barulho.
      b(23, { by: "homem", q: "e disseram a Mica:", cast: [
        C("homem", 95, "point", { dy: 0.6, facing: -1, id: "danita-armado1" }),
        C("homem", 195, "stand", { dy: 0.54, facing: -1, id: "danita-armado2" }),
        C("homem", -150, "stand", { dy: 0.62, facing: 1, id: "mica" }),
      ] }),
      // v.24 — a frase que resume o capítulo 17 inteiro: "OS MEUS DEUSES, QUE
      // EU FIZ, me tomastes… que mais me resta agora?" Deuses que se fazem
      // podem ser carregados embora por quem tiver mais espadas.
      b(24, { by: "homem", q: "Então ele disse:", cast: [
        C("homem", -150, "raise", { dy: 0.62, facing: 1, id: "mica" }),
        C("homem", 95, "stand", { dy: 0.6, facing: -1, id: "danita-armado1" }),
        C("homem", 195, "stand", { dy: 0.54, facing: -1, id: "danita-armado2" }),
      ] }),
      // v.25 — a resposta é uma AMEAÇA: cala a voz, ou homens de ânimo mau se
      // lançarão sobre ti e sobre a tua casa.
      b(25, { by: "homem", q: "Porém os filhos de Dã lhe disseram:", env: { night: 0.48, glory: 0.07 }, cast: [
        C("homem", 90, "point", { dy: 0.6, facing: -1, id: "danita-armado1" }),
        C("homem", 190, "stand", { dy: 0.54, facing: -1, id: "danita-armado2" }),
        C("homem", -155, "bow", { dy: 0.62, facing: 1, id: "mica" }),
      ] }),
      // v.26 — Mica vê que eram mais fortes, VIRA-SE e volta para casa. Fim da
      // religião que ele fabricou: a casa de deuses, vazia.
      b(26, { q: "e Mica, vendo que eram mais fortes do que ele", set: "casa-deuses", props: CASA_DEUSES,
        env: { terrain: "city", night: 0.52, glory: 0.05, fire: 0.06 }, cast: [
        C("homem", -55, "bow", { dy: 0.6, facing: -1, id: "mica" }),
      ] }),
      // v.27 — LAÍS: povo quieto e confiado, ferido ao fio da espada, a cidade
      // queimada a fogo. Juízo sem juiz, guerra sem mandato. Figuras
      // INDIVIDUAIS em luto — nenhuma multidão aqui.
      b(27, { q: "e chegaram a Laís, a um povo quieto e confiado", set: "lais-queimada", props: LAIS_QUEIMADA,
        env: { terrain: "city", night: 0.62, glory: 0.04, fire: 0.75, storm: 0.15, verdure: 0.16 }, cast: [
        C("mulherComum", -85, "lie", { dy: 0.72, facing: -1, id: "de-lais1" }),
        C("homem", 55, "lie", { dy: 0.78, facing: 1, id: "de-lais2" }),
        C("homem", 210, "bow", { dy: 0.66, facing: -1, id: "de-lais3" }),
      ] }),
      // v.28 — "ninguém houve que os livrasse": estavam longe de Sidom e não
      // tinham relação com ninguém. Sobre o vale de Bete-Reobe, reedificam.
      b(28, { q: "depois reedificaram a cidade e habitaram nela", set: "da-cidade", props: DA_CIDADE,
        env: { terrain: "city", night: 0.44, glory: 0.12, fire: 0.08, storm: 0, verdure: 0.4 }, cast: [
        C("homem", -75, "stand", { dy: 0.56, facing: 1, id: "danita-armado1" }),
        C("homem", 80, "stand", { dy: 0.5, facing: -1, id: "danita-armado2" }),
      ] }),
      // v.29 — o nome novo: DÃ, pelo pai da tribo — mas debaixo do nome novo
      // continua Laís, e o sangue dos que ali dormiam seguros.
      b(29, { q: "era, porém, antes o nome desta cidade Laís", cast: [
        C("homem", -70, "raise", { dy: 0.56, facing: 1, id: "danita-armado1" }),
        C("homem", 85, "stand", { dy: 0.5, facing: -1, id: "danita-armado2" }),
        C("multidao", 245, "stand", { dy: 0.18, scale: 0.9, id: "tribo-de-da" }),
      ] }),
      // v.30 — A APOSTASIA INSTITUCIONALIZADA: a imagem LEVANTADA como culto
      // oficial, e um sacerdócio hereditário (Jônatas e seus filhos) que dura
      // "até ao dia do cativeiro da terra". O erro de uma casa virou o erro de
      // uma tribo, e depois a ruína de uma nação.
      b(30, { q: "E os filhos de Dã levantaram para si aquela imagem de escultura",
        set: "da-santuario", props: DA_SANTUARIO,
        env: { terrain: "city", night: 0.5, glory: 0.06, fire: 0.14, verdure: 0.3 }, cast: [
        C("servo", -140, "raise", { dy: 0.56, facing: 1, id: "jonatas" }),
        C("homem", 90, "bow", { dy: 0.62, facing: -1, id: "danita-armado1" }),
        C("homem", 210, "bow", { dy: 0.54, facing: -1, id: "danita-armado2" }),
      ] }),
      // v.31 — O CONTRASTE FINAL: enquanto o ídolo de Mica ficava de pé em Dã,
      // A CASA DE DEUS estava em SILÓ — o tabernáculo verdadeiro, a arca, o
      // altar. Havia onde adorar; escolheram o que era mais perto e mais fácil.
      b(31, { q: "por todos os dias em que a casa de Deus esteve em Siló", set: "silo", props: SILO,
        env: { terrain: "field", night: 0.38, glory: 0.26, fire: 0.06, verdure: 0.45 }, cast: [
        C("servo", -235, "kneel", { dy: 0.6, facing: 1, id: "adorador-em-silo" }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Jz 19
  19: {
    // HORROR E LUTO: night alto do começo ao fim, glória quase apagada, sem
    // nenhum `glow`, sem multidão festiva. O palco só acompanha e cala.
    start: { terrain: "mountain", night: 0.55, glory: 0.06, storm: 0.08, fire: 0, verdure: 0.26 },
    beats: [
      // v.1 — "naqueles dias, em que não havia rei em Israel": um levita dos
      // lados da montanha de Efraim toma para si uma concubina de Belém.
      b(1, { q: "que houve um homem levita", set: "efraim-19", props: EFRAIM19,
        env: { terrain: "mountain", night: 0.55, glory: 0.06, verdure: 0.26 }, cast: [
        C("homem", -60, "stand", { dy: 0.54, facing: 1, id: "levita" }),
        C("mulherComum", 70, "stand", { dy: 0.5, facing: -1, id: "concubina" }),
      ] }),
      // v.2 — ela o deixa e volta à casa de seu pai, em Belém de Judá; ali fica
      // quatro meses. Uma casa desfeita antes de qualquer viagem.
      b(2, { q: "Porém a sua concubina adulterou contra ele", set: "belem", props: CASA_PAI,
        env: { terrain: "city", night: 0.5, glory: 0.1, verdure: 0.3 }, cast: [
        C("mulherComum", -40, "walk", { dy: 0.58, facing: 1, id: "concubina" }),
        C("homem", 160, "stand", { dy: 0.48, facing: -1, id: "sogro" }),
      ] }),
      // v.3 — o marido se levanta e vai atrás dela "PARA LHE FALAR CONFORME AO
      // SEU CORAÇÃO" — com o moço e um par de jumentos. O sogro se alegra.
      b(3, { q: "para lhe falar conforme ao seu coração", cast: [
        C("homem", -120, "walk", { dy: 0.56, facing: 1, id: "levita" }),
        C("servo", -230, "walk", { dy: 0.5, facing: 1, id: "moco" }),
        C("mulherComum", 55, "stand", { dy: 0.54, facing: -1, id: "concubina" }),
        C("homem", 165, "stand", { dy: 0.48, facing: -1, id: "sogro" }),
      ] }),
      // v.4 — três dias de comida, bebida e noites na casa do sogro: a última
      // hospitalidade boa que este capítulo vai conhecer.
      b(4, { q: "e ficou com ele três dias", cast: [
        C("homem", -110, "stand", { dy: 0.58, facing: 1, id: "levita" }),
        C("homem", 90, "stand", { dy: 0.54, facing: -1, id: "sogro" }),
        C("mulherComum", 200, "stand", { dy: 0.48, facing: -1, id: "concubina" }),
      ] }),
      // v.5 — ao quarto dia, de madrugada, ele quer partir; o sogro: "Fortalece
      // o teu coração com um bocado de pão, e depois partireis".
      b(5, { by: "homem", q: "então o pai da moça disse a seu genro:", cast: [
        C("homem", 85, "point", { dy: 0.54, facing: -1, id: "sogro" }),
        C("homem", -105, "stand", { dy: 0.58, facing: 1, id: "levita" }),
        C("mulherComum", 205, "stand", { dy: 0.48, facing: -1, id: "concubina" }),
      ] }),
      // v.6 — comem e bebem juntos, e o sogro insiste: passa mais esta noite,
      // "e alegre-se o teu coração". Cada demora empurra a viagem para a noite.
      b(6, { by: "homem", q: "e disse o pai da moça ao homem:", cast: [
        C("homem", 85, "raise", { dy: 0.54, facing: -1, id: "sogro" }),
        C("homem", -105, "stand", { dy: 0.58, facing: 1, id: "levita" }),
      ] }),
      // v.7 — o homem se levanta para ir, mas o sogro o constrange, e ele fica
      // outra noite.
      b(7, { q: "mas seu sogro o constrangeu a tornar a passar ali a noite",
        env: { night: 0.6, glory: 0.08 }, cast: [
        C("homem", -95, "stand", { dy: 0.58, facing: 1, id: "levita" }),
        C("homem", 95, "stand", { dy: 0.54, facing: -1, id: "sogro" }),
      ] }),
      // v.8 — quinto dia, de madrugada: "Ora, conforta o teu coração" — e o dia
      // declina outra vez enquanto comem.
      b(8, { by: "homem", q: "disse o pai da moça:", env: { night: 0.46, glory: 0.12 }, cast: [
        C("homem", 90, "point", { dy: 0.54, facing: -1, id: "sogro" }),
        C("homem", -100, "stand", { dy: 0.58, facing: 1, id: "levita" }),
      ] }),
      // v.9 — a última tentativa: "eis que já o dia declina e a tarde já vem
      // chegando… passa aqui a noite". Era o conselho certo; foi recusado.
      b(9, { by: "homem", q: "e disse-lhe seu sogro, o pai da moça:",
        env: { night: 0.54, glory: 0.09 }, cast: [
        C("homem", 90, "raise", { dy: 0.54, facing: -1, id: "sogro" }),
        C("homem", -100, "stand", { dy: 0.58, facing: 1, id: "levita" }),
        C("mulherComum", 200, "stand", { dy: 0.48, facing: -1, id: "concubina" }),
        C("servo", -235, "stand", { dy: 0.5, facing: 1, id: "moco" }),
      ] }),
      // v.10 — não quis: parte à tarde e chega defronte de JEBUS, que é
      // Jerusalém, com o par de jumentos albardados e a concubina.
      b(10, { q: "e chegou até defronte de Jebus", set: "estrada-jebus", props: ESTRADA19,
        env: { terrain: "field", night: 0.5, glory: 0.12, verdure: 0.28 }, cast: [
        C("homem", -110, "walk", { dy: 0.58, facing: 1, id: "levita" }),
        C("mulherComum", -20, "walk", { dy: 0.62, facing: 1, id: "concubina" }),
        C("servo", -195, "walk", { dy: 0.54, facing: 1, id: "moco" }),
      ] }),
      // v.11 — o moço, prático: já é tarde, retiremo-nos a esta cidade dos
      // jebuseus e passemos ali a noite.
      b(11, { by: "servo", q: "disse o moço a seu senhor:", env: { night: 0.58, glory: 0.09 }, cast: [
        C("servo", -180, "point", { dy: 0.56, facing: 1, id: "moco" }),
        C("homem", -60, "stand", { dy: 0.6, facing: -1, id: "levita" }),
        C("mulherComum", 60, "stand", { dy: 0.56, facing: -1, id: "concubina" }),
      ] }),
      // v.12 — a IRONIA TRÁGICA do capítulo: "não nos retiraremos a nenhuma
      // cidade estranha, que não seja dos filhos de Israel; mas iremos até
      // Gibeá". Preferiu os seus — e foram os seus que fizeram o mal.
      b(12, { by: "homem", q: "Porém disse-lhe seu senhor:", cast: [
        C("homem", -60, "point", { dy: 0.6, facing: 1, id: "levita" }),
        C("servo", -180, "stand", { dy: 0.56, facing: -1, id: "moco" }),
        C("mulherComum", 65, "stand", { dy: 0.56, facing: -1, id: "concubina" }),
      ] }),
      // v.13 — "cheguemos a um daqueles lugares, e passemos a noite em Gibeá ou
      // em Ramá". Ainda dava para escolher Ramá.
      b(13, { by: "homem", q: "Disse mais a seu moço:", env: { night: 0.62, glory: 0.08 }, cast: [
        C("homem", -55, "raise", { dy: 0.6, facing: 1, id: "levita" }),
        C("servo", -180, "stand", { dy: 0.56, facing: -1, id: "moco" }),
        C("mulherComum", 70, "stand", { dy: 0.56, facing: -1, id: "concubina" }),
      ] }),
      // v.14 — caminham, e O SOL SE LHES PÕE junto a Gibeá, cidade de Benjamim.
      // A luz acaba exatamente onde a viagem devia parar.
      b(14, { q: "e o sol se lhes pôs junto a Gibeá", set: "gibea", props: GIBEA,
        env: { terrain: "city", night: 0.68, glory: 0.05, verdure: 0.22 }, cast: [
        C("homem", -110, "walk", { dy: 0.58, facing: 1, id: "levita" }),
        C("mulherComum", -20, "walk", { dy: 0.62, facing: 1, id: "concubina" }),
        C("servo", -200, "walk", { dy: 0.54, facing: 1, id: "moco" }),
      ] }),
      // v.15 — entram e se assentam NA PRAÇA, "porque não houve quem os
      // recolhesse em casa": em Israel, ninguém abriu a porta. A falência da
      // hospitalidade é o primeiro crime de Gibeá.
      b(15, { q: "porque não houve quem os recolhesse em casa", set: "praca", props: PRACA,
        env: { terrain: "city", night: 0.72, glory: 0.04, verdure: 0.2 }, cast: [
        C("homem", -40, "kneel", { dy: 0.66, facing: 1, id: "levita" }),
        C("mulherComum", 45, "kneel", { dy: 0.7, facing: -1, id: "concubina" }),
        C("servo", -145, "stand", { dy: 0.6, facing: 1, id: "moco" }),
      ] }),
      // v.16 — ao cair da tarde chega um VELHO do seu trabalho no campo: também
      // ele da montanha de Efraim, também ele peregrino em Gibeá. Os homens
      // daquele lugar eram filhos de Benjamim.
      b(16, { q: "E eis que um velho homem vinha à tarde do seu trabalho do campo",
        set: "velho-do-campo", props: VELHO_DO_CAMPO, env: { night: 0.7, glory: 0.05 }, cast: [
        C("homem", 175, "walk", { dy: 0.58, facing: -1, id: "velho" }),
        C("homem", -50, "kneel", { dy: 0.66, facing: 1, id: "levita" }),
        C("mulherComum", 35, "kneel", { dy: 0.7, facing: -1, id: "concubina" }),
      ] }),
      // v.17 — ele levanta os olhos, vê o viajante na praça e pergunta: "Para
      // onde vais, e donde vens?" A primeira voz humana da cidade.
      b(17, { by: "homem", q: "e disse o ancião:", cast: [
        C("homem", 130, "point", { dy: 0.6, facing: -1, id: "velho" }),
        C("homem", -55, "stand", { dy: 0.64, facing: 1, id: "levita" }),
        C("mulherComum", 30, "kneel", { dy: 0.7, facing: -1, id: "concubina" }),
        C("servo", -175, "stand", { dy: 0.58, facing: 1, id: "moco" }),
      ] }),
      // v.18 — a resposta doída: "vou à casa do Senhor; e NINGUÉM HÁ QUE ME
      // RECOLHA EM CASA". Um levita a caminho do santuário, sem teto em Israel.
      b(18, { by: "homem", q: "E ele lhe disse:", cast: [
        C("homem", -55, "raise", { dy: 0.64, facing: 1, id: "levita" }),
        C("homem", 130, "stand", { dy: 0.6, facing: -1, id: "velho" }),
        C("mulherComum", 30, "kneel", { dy: 0.7, facing: -1, id: "concubina" }),
      ] }),
      // v.19 — e ainda explica que nada lhes falta: palha e pasto, pão e vinho.
      // Não pediam sustento; pediam abrigo.
      b(19, { by: "homem", q: "Todavia temos palha e pasto para os nossos jumentos", cast: [
        C("homem", -55, "point", { dy: 0.64, facing: 1, id: "levita" }),
        C("homem", 130, "stand", { dy: 0.6, facing: -1, id: "velho" }),
        C("servo", -180, "stand", { dy: 0.58, facing: 1, id: "moco" }),
      ] }),
      // v.20 — "PAZ SEJA CONTIGO… tão-somente não passes a noite na praça". O
      // velho sabia o que a praça de Gibeá fazia de noite.
      b(20, { by: "homem", q: "Então disse o ancião:", cast: [
        C("homem", 125, "raise", { dy: 0.6, facing: -1, id: "velho" }),
        C("homem", -60, "stand", { dy: 0.64, facing: 1, id: "levita" }),
        C("mulherComum", 25, "kneel", { dy: 0.7, facing: -1, id: "concubina" }),
      ] }),
      // v.21 — leva-os para casa, dá pasto aos jumentos; lavam os pés, comem e
      // bebem. O último momento de descanso do capítulo.
      b(21, { q: "e deu pasto aos jumentos", set: "casa-do-velho", props: CASA_VELHO,
        env: { terrain: "city", night: 0.7, glory: 0.06, verdure: 0.2 }, cast: [
        C("homem", 105, "stand", { dy: 0.6, facing: -1, id: "velho" }),
        C("homem", -75, "stand", { dy: 0.64, facing: 1, id: "levita" }),
        C("mulherComum", 15, "stand", { dy: 0.68, facing: -1, id: "concubina" }),
        C("servo", -180, "stand", { dy: 0.56, facing: 1, id: "moco" }),
      ] }),
      // v.22 — os filhos de Belial CERCAM A CASA e batem à porta. A cena fica
      // do lado de dentro: os agressores ao longe, na borda escura do palco.
      b(22, { q: "cercaram a casa, batendo à porta",
        env: { night: 0.8, glory: 0.03, storm: 0.16 }, cast: [
        C("homem", 60, "bow", { dy: 0.6, facing: -1, id: "velho" }),
        C("homem", -80, "bow", { dy: 0.66, facing: 1, id: "levita" }),
        C("mulherComum", -170, "kneel", { dy: 0.7, facing: 1, id: "concubina" }),
        C("homem", 265, "stand", { dy: 0.34, facing: -1, id: "belial1" }),
        C("homem", 320, "stand", { dy: 0.28, facing: -1, id: "belial2" }),
      ] }),
      // v.23 — o dono da casa sai a eles: "Não, irmãos meus, ora não façais
      // semelhante mal… não façais tal loucura". A voz sozinha da decência,
      // gritando contra uma cidade inteira.
      b(23, { by: "homem", q: "e disse-lhes:", cast: [
        C("homem", 95, "raise", { dy: 0.62, facing: -1, id: "velho" }),
        C("homem", -95, "bow", { dy: 0.66, facing: 1, id: "levita" }),
        C("mulherComum", -180, "kneel", { dy: 0.7, facing: 1, id: "concubina" }),
        C("homem", 275, "stand", { dy: 0.34, facing: -1, id: "belial1" }),
      ] }),
      // v.24 — e então a proposta do velho — porque nesta noite até quem quer
      // fazer o bem já perdeu a medida do que é o bem. A Escritura registra
      // sem aprovar; a cena registra sem enfeitar. O `q` ancora no FIM do
      // versículo ("porém a este homem…"), de modo que o balão mostra o
      // versículo inteiro em vez de destacar a parte mais brutal.
      b(24, { by: "homem", q: "porém a este homem não façais essa loucura",
        env: { night: 0.82, glory: 0.03 }, cast: [
        C("homem", 95, "point", { dy: 0.62, facing: -1, id: "velho" }),
        C("homem", -95, "bow", { dy: 0.66, facing: 1, id: "levita" }),
        C("mulherComum", -185, "kneel", { dy: 0.72, facing: 1, id: "concubina" }),
        C("homem", 285, "stand", { dy: 0.32, facing: -1, id: "belial1" }),
      ] }),
      // v.25 — a NOITE INTEIRA de Gibeá. O palco não mostra o mal: mostra a
      // porta fechada, a escuridão e as figuras separadas. "Subindo a alva, a
      // deixaram" — e é a alva que nos devolve a cena.
      b(25, { q: "Porém aqueles homens não o quiseram ouvir",
        env: { night: 0.88, glory: 0.02, storm: 0.2, verdure: 0.16 }, cast: [
        C("mulherComum", -195, "kneel", { dy: 0.74, facing: 1, id: "concubina" }),
        C("homem", -60, "bow", { dy: 0.66, facing: 1, id: "levita" }),
        C("homem", 300, "stand", { dy: 0.26, facing: -1, id: "belial1" }),
      ] }),
      // v.26 — ao romper da manhã ela volta e CAI À PORTA da casa onde estava o
      // seu senhor, e ali fica até que se fez claro. A porta que se abriu tarde
      // demais é o centro do palco.
      b(26, { q: "e caiu à porta da casa daquele homem",
        env: { night: 0.72, glory: 0.05, storm: 0.14 }, cast: [
        C("mulherComum", -15, "lie", { dy: 0.72, facing: 1, id: "concubina" }),
      ] }),
      // v.27 — o senhor se levanta, abre as portas para seguir o seu caminho —
      // e ali está ela, jazendo à porta, COM AS MÃOS SOBRE O LIMIAR. A imagem
      // mais silenciosa e mais terrível do livro dos Juízes.
      b(27, { q: "eis que a mulher, sua concubina, jazia à porta da casa",
        env: { night: 0.66, glory: 0.05, storm: 0.12 }, cast: [
        C("mulherComum", -15, "lie", { dy: 0.72, facing: 1, id: "concubina" }),
        C("homem", 120, "stand", { dy: 0.6, facing: -1, id: "levita" }),
      ] }),
      // v.28 — "Levanta-te, e vamo-nos" — porém ela não respondeu. Ele a põe
      // sobre o jumento e vai para o seu lugar, no silêncio da estrada.
      // SEM `by`: "porém ela não respondeu" é do narrador — o silêncio dela não
      // pode ser dito pelo levita.
      b(28, { q: "E ele lhe disse:",
        env: { night: 0.64, glory: 0.05 }, cast: [
        C("homem", 95, "kneel", { dy: 0.68, facing: -1, id: "levita" }),
        C("mulherComum", -15, "lie", { dy: 0.72, facing: 1, id: "concubina" }),
      ] }),
      // v.29 — chegando à sua casa, o cutelo e os DOZE PEDAÇOS enviados por
      // todos os termos de Israel. A cena guarda o horror fora do quadro: só a
      // casa, a porta fechada e um homem curvado sozinho.
      b(29, { q: "e a despedaçou com os seus ossos em doze partes", set: "casa-do-levita",
        props: CASA_LEVITA, env: { terrain: "city", night: 0.8, glory: 0.03, storm: 0.2, verdure: 0.18 }, cast: [
        C("homem", 20, "bow", { dy: 0.7, facing: 1, id: "levita" }),
      ] }),
      // v.30 — e cada um que via aquilo dizia: "NUNCA TAL SE FEZ, NEM SE VIU
      // desde o dia em que os filhos de Israel subiram da terra do Egito…
      // ponderai isto, considerai, e falai". Israel inteiro emudecido diante do
      // que a sua própria liberdade sem Deus produziu — testemunhas uma a uma,
      // curvadas, e nenhuma festa.
      b(30, { by: "homem", q: "cada um que via aquilo dizia:", set: "israel-todo",
        props: ISRAEL_TODO, env: { terrain: "city", night: 0.75, glory: 0.04, storm: 0.22, verdure: 0.2 }, cast: [
        C("homem", -60, "bow", { dy: 0.66, facing: 1, id: "israelita1" }),
        C("homem", 90, "kneel", { dy: 0.7, facing: -1, id: "israelita2" }),
        C("mulherComum", 205, "bow", { dy: 0.6, facing: -1, id: "israelita3" }),
        C("servo", -215, "kneel", { dy: 0.58, facing: 1, id: "israelita4" }),
      ] }),
    ],
  },
};
