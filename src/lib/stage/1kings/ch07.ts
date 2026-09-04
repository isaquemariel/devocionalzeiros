// ============================================================================
// 1 REIS 7 — CENA VIVA. O capítulo do INVENTÁRIO: treze anos de casa real, a
// CASA DO BOSQUE DO LÍBANO sobre quatro ordens de colunas de cedro, o PÓRTICO
// DO JUÍZO, e depois o homem de Tiro que sabia fundir cobre — JAQUIM e BOAZ, o
// MAR sobre DOZE BOIS, as DEZ BASES com rodas de obra de carro, e o ouro do
// interior da casa.
//
// 1Rs 7 — Sete anos levou o templo (6:38); a casa do próprio rei leva TREZE, e
// o texto põe os dois números lado a lado sem comentar — o leitor é que conta.
// Salomão edifica a CASA DO BOSQUE DO LÍBANO, cem côvados por cinqüenta por
// trinta, sobre QUATRO ORDENS DE COLUNAS DE CEDRO com vigas de cedro por cima,
// quarenta e cinco colunas, quinze em cada ordem, e TRÊS ORDENS DE JANELAS uma
// defronte da outra; o PÓRTICO DAS COLUNAS de cinqüenta por trinta; o PÓRTICO
// PARA O TRONO ONDE JULGAVA — o pórtico do juízo —, revestido de cedro de
// soalho a soalho; a casa em que morava, noutro pátio por dentro do pórtico, e
// uma casa semelhante para a FILHA DE FARAÓ. Tudo de pedras de grande valor,
// cortadas à medida, SERRADAS À SERRA por dentro e por fora, desde o fundamento
// até às beiras do teto e por fora até ao grande pátio: pedras de dez côvados e
// pedras de oito, três ordens de pedras lavradas com uma ordem de vigas de
// cedro. Então o rei manda um mensageiro a TIRO buscar HIRÃO — não o rei, o
// ARTÍFICE: filho de uma mulher viúva da tribo de Naftali, e o pai um homem de
// Tiro que trabalhava em cobre; "cheio de sabedoria, e de entendimento, e de
// ciência para fazer toda a obra de cobre". Ele funde DUAS COLUNAS de dezoito
// côvados, cingidas por um fio de doze; dois CAPITÉIS de cinco côvados, cobertos
// de redes de malhas e ligas de obra de cadeia, sete para cada capitel, com duas
// fileiras de ROMÃS em redor — duzentas em cada — e obra de lírios de quatro
// côvados no alto. E levanta as colunas no pórtico do templo: a direita chama-se
// JAQUIM, a esquerda BOAZ. Depois o MAR DE FUNDIÇÃO: dez côvados de uma borda à
// outra, perfeitamente redondo, cinco de alto, um cordão de trinta em redor, os
// botões fundidos com ele em duas ordens, a grossura de um palmo, a borda como
// a de um copo, como flor de lírios, dois mil batos de água — e tudo isso
// FIRMADO SOBRE DOZE BOIS, três para o norte, três para o ocidente, três para o
// sul, três para o oriente, com as partes posteriores para dentro. Depois as DEZ
// BASES de cobre, de quatro por quatro por três côvados, com cintas entre as
// molduras onde estão lavrados LEÕES, BOIS E QUERUBINS; quatro rodas de metal
// por base, com eixos, cambas, cubos e raios "como a obra da roda de carro"; e
// sobre elas as DEZ PIAS de quarenta batos, cinco à direita da casa e cinco à
// esquerda, e o mar posto ao lado direito, para o oriente, da parte do sul. Os
// caldeirões, as pás e as bacias, tudo de COBRE POLIDO, fundido na planície do
// Jordão em TERRA BARRENTA, entre SUCOTE E ZARETÃ, e em tanta quantidade que o
// rei deixou de pesar: "nem se averiguou o peso do cobre". Por fim o OURO — o
// altar, a mesa dos pães da proposição, os cinco castiçais à direita e cinco à
// esquerda diante do oráculo, as flores, as lâmpadas, os espevitadores, os
// vasos, os apagadores, as bacias, as colheres, os perfumadores, e até as
// DOBRADIÇAS das portas do lugar santíssimo. E o fecho, que é a única frase com
// gente dentro: acabada a obra, Salomão traz o que DAVI SEU PAI havia consagrado
// — a prata, o ouro e os objetos — e põe entre os tesouros da casa do SENHOR. O
// filho termina o que o pai só pôde guardar.
//
// A VOZ DE DEUS — neste capítulo o SENHOR NÃO FALA, e ninguém fala. É o único
// capítulo do livro sem uma linha de discurso direto: da primeira à última
// palavra é o escrivão da obra medindo, contando e nomeando. Por isso não há um
// único `by` aqui — nem `by:"deus"` (não há oráculo, sonho nem teofania), nem
// balão de personagem (o texto não dá fala a Salomão nem a Hirão; até o nome das
// colunas vem em narração, "pôs-lhe o nome de Jaquim"). Tudo corre na barra do
// narrador, e a presença de Deus é encenada só onde o texto a encena: a luz que
// sobe quando as colunas se levantam no pórtico do templo (vv.21-22), quando o
// cobre polido brilha (v.45), quando o ouro do oráculo acende o interior
// (vv.48-50) e quando o que era de Davi entra no tesouro (v.51). O risco deste
// capítulo não é teológico, é cênico: é o quadro congelado. Por isso cada peça
// tem o seu enquadramento — a pedreira, o porto de Tiro, a oficina do fundidor,
// o pórtico das colunas, a roda de carro, a campina do Jordão com os moldes de
// barro — e a câmera nunca fica no mesmo lugar por dois versículos seguidos sem
// mudar de altura, de luz ou de gente.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
// (sem `dv` aqui: em 1Rs 7 não há discurso direto nenhum — nem de Deus, nem de
//  homem. Ver o parágrafo "A VOZ DE DEUS" no cabeçalho.)

// ------------------------------------------------------------------ SETS 1Rs 7

// O PÁTIO DA CASA DO REI — treze anos de canteiro de obras vistos do lado de
// fora: a casa real já de pé com a torre da guarda, o portão do pátio, os fardos
// de material que ainda não saíram do chão e a palmeira que viu a obra inteira.
const PATIO_DO_PALACIO: StagePropSpec[] = [
  { ...P("church", -90, 1.35, undefined, 0.22), tag: "casa-de-salomao" },
  P("tower", 150, 1.25, undefined, 0.26),
  P("door", 20, 1.0, undefined, 0.4),
  P("crate", -230, 0.9, undefined, 0.62),
  P("crate", 250, 0.85, undefined, 0.58),
  P("palm", 320, 1.15, undefined, 0.16),
  P("grass", -310, 0.78, undefined, 0.74),
];

// A CASA DO BOSQUE DO LÍBANO — cem côvados de comprimento por dentro: quatro
// ordens de COLUNAS DE CEDRO enfileiradas para o fundo do quadro, as vigas por
// cima, e o cedro ainda em pé lá fora, na ponta direita, para lembrar de onde
// veio a floresta que deu nome à casa.
const CASA_DO_BOSQUE: StagePropSpec[] = [
  { ...P("church", -320, 1.2, undefined, 0.18), tag: "casa-do-bosque-do-libano" },
  P("column", -215, 1.4, undefined, 0.26),
  P("column", -95, 1.35, undefined, 0.3),
  P("column", 25, 1.3, undefined, 0.34),
  P("column", 145, 1.25, undefined, 0.38),
  P("tree", 280, 1.3, undefined, 0.16),
  P("crate", 60, 0.85, undefined, 0.66),
];

// O PÓRTICO DAS COLUNAS — cinqüenta côvados por trinta, e o pórtico defronte
// delas: uma fileira frontal de colunas com as grossas vigas por cima, o portão
// grande à esquerda e a torre do palácio ao fundo. Palco largo, quase vazio de
// gente: aqui o que interessa é o vão.
const PORTICO_DAS_COLUNAS: StagePropSpec[] = [
  { ...P("column", -180, 1.45, undefined, 0.32), tag: "portico-das-colunas" },
  P("column", -60, 1.45, undefined, 0.32),
  P("column", 60, 1.45, undefined, 0.32),
  P("column", 180, 1.45, undefined, 0.32),
  P("door", -320, 1.05, undefined, 0.42),
  P("tower", 300, 1.2, undefined, 0.2),
  P("grass", 240, 0.76, undefined, 0.76),
];

// O PÓRTICO DO JUÍZO — o pórtico para o trono ONDE JULGAVA, revestido de cedro
// de soalho a soalho: o trono no centro, as duas colunas do vão, o rolo dos
// autos, o candelabro aceso do lado de dentro e a porta por onde entra quem tem
// causa. É o cômodo mais escuro de madeira e o mais claro de intenção do
// capítulo.
const PORTICO_DO_JUIZO: StagePropSpec[] = [
  { ...P("throne", 0, 1.15, undefined, 0.34), tag: "trono-do-juizo" },
  P("column", -195, 1.3, undefined, 0.3),
  P("column", 195, 1.3, undefined, 0.3),
  P("door", 305, 1.0, undefined, 0.42),
  P("scroll", -105, 0.8, undefined, 0.58),
  P("lampstand", 110, 0.85, undefined, 0.54),
  P("amphora", -300, 0.8, undefined, 0.64),
];

// O OUTRO PÁTIO, POR DENTRO DO PÓRTICO — a casa em que o rei morava e, ao lado,
// a casa que ele fez para a FILHA DE FARAÓ: duas casas de obra semelhante, o
// poço do pátio entre elas, a figueira do quintal e a palmeira do Egito plantada
// deste lado do mar.
const OUTRO_PATIO: StagePropSpec[] = [
  P("church", -170, 1.25, undefined, 0.24),
  { ...P("church", 130, 1.2, undefined, 0.26), tag: "casa-da-filha-de-farao" },
  P("well", -20, 1.0, undefined, 0.5),
  P("tree", 265, 1.2, undefined, 0.18),
  P("palm", -320, 1.15, undefined, 0.16),
  P("bush", 60, 0.9, undefined, 0.62),
  P("grass", 310, 0.76, undefined, 0.76),
];

// A PEDREIRA E O GRANDE PÁTIO — onde as pedras de grande valor são cortadas à
// medida e SERRADAS À SERRA por dentro e por fora: os blocos de dez e de oito
// côvados ainda no chão, o cavalete de serrar, o cesto de cunhas e a estrada que
// sobe para o grande pátio.
const PEDREIRA: StagePropSpec[] = [
  P("rock", -250, 1.4, undefined, 0.48),
  P("rock", -60, 1.3, undefined, 0.62),
  P("rock", 130, 1.15, undefined, 0.7),
  P("crate", 250, 0.9, undefined, 0.6),
  P("stall", 300, 1.0, undefined, 0.34),
  P("bush", -320, 0.9, undefined, 0.56),
  P("grass", 40, 0.78, undefined, 0.78),
];

// O PORTO DE TIRO — a cidade do outro rei Hirão, no mar: o navio encostado, o
// casario de pedra da ilha, a torre do quebra-mar, as talhas de mercadoria na
// pedra molhada. É daqui que sai, a pé, o homem que sabe fundir cobre.
const PORTO_DE_TIRO: StagePropSpec[] = [
  { ...P("boat", 130, 1.25, undefined, 0.6), tag: "navio-de-tiro" },
  P("tower", -230, 1.3, undefined, 0.22),
  P("church", -60, 1.15, undefined, 0.26),
  P("rock", 290, 1.1, undefined, 0.66),
  P("amphora", 30, 0.85, undefined, 0.7),
  P("crate", -140, 0.9, undefined, 0.66),
  P("palm", 320, 1.1, undefined, 0.16),
];

// A OFICINA DE HIRÃO — a fundição do cobre em Jerusalém: o forno aceso à
// esquerda, o cadinho e as bacias do vazamento, os fardos de moldes, e as duas
// colunas ainda deitadas no chão da oficina, esperando a hora de subir.
const OFICINA_DE_HIRAO: StagePropSpec[] = [
  P("campfire", -175, 1.2, 0.95, 0.56),
  P("column", 30, 1.35, undefined, 0.3),
  P("column", 165, 1.35, undefined, 0.3),
  P("bowl", -40, 0.9, undefined, 0.66),
  P("crate", -290, 0.9, undefined, 0.62),
  P("amphora", 265, 0.85, undefined, 0.66),
  P("rock", 320, 1.0, undefined, 0.7),
];

// O PÓRTICO DO TEMPLO — a frente da casa do SENHOR no dia em que as colunas
// sobem: o templo ao fundo, JAQUIM à direita e BOAZ à esquerda diante dele, o
// altar do pátio de lado e a palmeira do adro. Este é o quadro para onde o
// capítulo inteiro estava andando.
const PORTICO_DO_TEMPLO: StagePropSpec[] = [
  P("church", 0, 1.45, undefined, 0.18),
  { ...P("column", -140, 1.5, undefined, 0.36), tag: "coluna-boaz" },
  { ...P("column", 140, 1.5, undefined, 0.36), tag: "coluna-jaquim" },
  P("altar", -285, 1.05, undefined, 0.48),
  P("door", 270, 1.0, undefined, 0.44),
  P("palm", 325, 1.15, undefined, 0.16),
  P("grass", 40, 0.78, undefined, 0.78),
];

// O MAR DE FUNDIÇÃO — dez côvados de uma borda à outra, no pátio da casa: o MAR
// no centro do quadro, a casa atrás, o altar de lado, e o chão livre em volta
// porque é ali que os doze bois vão ficar de pé.
const MAR_DE_FUNDICAO: StagePropSpec[] = [
  { ...P("pool", 0, 1.35, undefined, 0.5), tag: "mar-de-fundicao" },
  P("church", -235, 1.2, undefined, 0.2),
  P("altar", 235, 1.05, undefined, 0.44),
  P("amphora", -305, 0.85, undefined, 0.68),
  P("rock", 315, 1.0, undefined, 0.7),
  P("bush", 130, 0.85, undefined, 0.72),
  P("grass", -120, 0.78, undefined, 0.78),
];

// A OFICINA DAS BASES — o outro canto da fundição, onde se faz o carrinho de
// cobre: a RODA DE OBRA DE CARRO no cavalete, os caixotes de moldes das cintas e
// das molduras, o forno menor da liga, o querubim entalhado esperando ser
// aplicado, e o cesto dos raios e dos cubos.
const OFICINA_DAS_BASES: StagePropSpec[] = [
  { ...P("chariot", 195, 1.1, undefined, 0.5), tag: "obra-de-roda-de-carro" },
  P("campfire", -60, 1.0, 0.75, 0.62),
  { ...P("cherub", 300, 1.05, undefined, 0.34), tag: "querubins-das-bases" },
  P("crate", -260, 0.95, undefined, 0.6),
  P("crate", -150, 0.9, undefined, 0.66),
  P("bowl", 60, 0.85, undefined, 0.7),
  P("column", -325, 1.25, undefined, 0.26),
];

// O PÁTIO DAS DEZ PIAS — a casa vista de frente com o resultado montado: CINCO
// PIAS à esquerda, CINCO à direita, cada uma sobre a sua base, e o MAR posto ao
// lado direito da casa, para o oriente, da parte do sul. O pátio inteiro é o
// prop deste beat.
const PATIO_DAS_PIAS: StagePropSpec[] = [
  P("church", 0, 1.3, undefined, 0.16),
  { ...P("pool", -300, 0.7, undefined, 0.58), tag: "pia-de-cobre" },
  P("pool", -225, 0.7, undefined, 0.58),
  P("pool", -150, 0.7, undefined, 0.58),
  P("pool", -75, 0.7, undefined, 0.58),
  P("pool", 75, 0.7, undefined, 0.58),
  P("pool", 150, 0.7, undefined, 0.58),
  P("pool", 225, 0.7, undefined, 0.58),
  { ...P("pool", 315, 1.0, undefined, 0.74), tag: "mar-de-fundicao" },
  P("grass", 0, 0.78, undefined, 0.86),
];

// A CAMPINA DO JORDÃO, ENTRE SUCOTE E ZARETÃ — a fundição a céu aberto: o rio
// atrás, a TERRA BARRENTA aberta em covas de molde, os fornos acesos na campina,
// as pilhas de cobre já solidificado e a palmeira do vau. Aqui não se pesou nada.
const CAMPINA_DO_JORDAO: StagePropSpec[] = [
  P("river", 20, 1.25, undefined, 0.2),
  { ...P("campfire", -190, 1.2, 1, 0.56), tag: "fundicao-da-campina-do-jordao" },
  P("campfire", -40, 1.0, 0.8, 0.66),
  P("crate", 120, 0.95, undefined, 0.62),
  P("crate", 235, 0.9, undefined, 0.68),
  P("palm", -320, 1.15, undefined, 0.16),
  P("grass", 300, 0.78, undefined, 0.78),
];

// O INTERIOR DOURADO DA CASA — o santo, diante do oráculo: as PORTAS do lugar
// santíssimo ao fundo, o ALTAR DE OURO diante delas, a MESA com os pães da
// proposição, o perfumador e a bacia de ouro finíssimo. A luz aqui não vem de
// fora: vem do metal.
const INTERIOR_DOURADO: StagePropSpec[] = [
  { ...P("door", 0, 1.25, undefined, 0.24), tag: "portas-do-lugar-santissimo" },
  { ...P("altar", -105, 1.05, undefined, 0.5), tag: "altar-de-ouro" },
  P("sheaf", 95, 0.85, undefined, 0.56),
  P("censer", 215, 0.8, undefined, 0.62),
  P("bowl", -235, 0.85, undefined, 0.64),
  P("menorah", 300, 1.0, undefined, 0.48),
  P("column", -320, 1.25, undefined, 0.28),
];

// OS TESOUROS DA CASA DO SENHOR — a câmara do tesouro no dia em que a obra
// acabou: a porta forrada, os cofres da prata e do ouro que Davi consagrou, o
// candelabro do corredor e a bacia dos objetos sagrados. O último quadro do
// capítulo, e o único com o nome de um morto dentro.
const TESOUROS_DA_CASA: StagePropSpec[] = [
  P("church", -160, 1.25, undefined, 0.2),
  P("door", 55, 1.1, undefined, 0.34),
  { ...P("crate", -35, 1.0, undefined, 0.6), tag: "tesouros-consagrados-por-davi" },
  P("crate", 175, 0.95, undefined, 0.64),
  P("bowl", 265, 0.85, undefined, 0.66),
  P("amphora", -265, 0.85, undefined, 0.64),
  P("lampstand", 320, 0.9, undefined, 0.52),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ 1Rs 7
  7: {
    start: { terrain: "city", night: 0.18, glory: 0.34, storm: 0.06, fire: 0.08, verdure: 0.3 },
    beats: [
      // v.1 — TREZE ANOS. O templo levou sete (6:38); a casa do rei leva quase o
      // dobro, e o texto não comenta — só conta. O rei de pé no pátio diante da
      // casa acabada, o mestre de obra ainda com a régua na mão.
      b(1, { q: "Porém a sua casa edificou Salomão em treze anos",
        set: "patio-do-palacio", props: PATIO_DO_PALACIO,
        env: { terrain: "city", night: 0.16, glory: 0.4, storm: 0.04, fire: 0.06, verdure: 0.32 }, cast: [
        C("rei", -20, "stand", { dy: 0.52, facing: 1, id: "salomao" }),
        C("homem", 105, "point", { dy: 0.56, facing: -1, id: "mestre-de-obra-do-palacio" }),
        C("servo", 215, "walk", { dy: 0.62, facing: -1, id: "pedreiro-do-palacio1" }),
      ] }),
      // v.2 — a CASA DO BOSQUE DO LÍBANO por dentro: cem côvados de fundo, e a
      // razão do nome logo à vista — quatro ordens de colunas de cedro com vigas
      // de cedro por cima. Parece uma floresta com telhado.
      b(2, { q: "Também edificou a casa do bosque do Líbano de cem côvados de comprimento",
        set: "casa-do-bosque", props: CASA_DO_BOSQUE,
        env: { terrain: "city", night: 0.3, glory: 0.3, storm: 0.04, fire: 0.06, verdure: 0.44 }, cast: [
        C("rei", -150, "walk", { dy: 0.6, facing: 1, id: "salomao" }),
        C("servo", 90, "stand", { dy: 0.5, facing: -1, id: "carpinteiro-de-cedro1" }),
      ] }),
      // v.3 — a contagem exata do escrivão: QUARENTA E CINCO colunas, QUINZE em
      // cada ordem. A câmera sobe para o teto de cedro e o escriba conta com o
      // dedo no ar, a fileira inteira atrás dele.
      b(3, { q: "que estavam sobre quarenta e cinco colunas, quinze em cada ordem",
        env: { terrain: "city", night: 0.34, glory: 0.26, verdure: 0.4 }, cast: [
        C("homem", -60, "write", { dy: 0.68, facing: 1, id: "escriba-da-obra" }),
        C("servo", 120, "point", { dy: 0.44, facing: -1, id: "carpinteiro-de-cedro1" }),
        C("servo", 235, "stand", { dy: 0.38, facing: -1, id: "carpinteiro-de-cedro2" }),
      ] }),
      // v.4 — TRÊS ORDENS DE JANELAS, uma defronte da outra: a luz entra em três
      // faixas pelo vão das colunas e corta o cedro. O sol alto no céu (com
      // sky:true, senão cai no chão) e os dois obreiros olhando para cima.
      b(4, { q: "E havia três ordens de janelas; e uma janela estava defronte da outra janela, em três ordens.",
        props: [
          P("column", -230, 1.4, undefined, 0.26),
          P("column", -80, 1.35, undefined, 0.3),
          P("column", 70, 1.3, undefined, 0.34),
          P("column", 220, 1.25, undefined, 0.38),
          P("tree", 320, 1.25, undefined, 0.16),
          P("crate", -300, 0.85, undefined, 0.66),
          { ...P("sun", 40, 1.15, undefined, 0.62), sky: true },
        ],
        env: { terrain: "city", night: 0.1, glory: 0.52, storm: 0.02, verdure: 0.42 }, cast: [
        C("servo", -150, "raise", { dy: 0.64, facing: 1, id: "carpinteiro-de-cedro2" }),
        C("homem", 10, "point", { dy: 0.58, facing: -1, id: "escriba-da-obra" }),
      ] }),
      // v.5 — as PORTAS e as OMBREIRAS QUADRADAS, todas de uma mesma vista: três
      // vãos idênticos em fila, um defronte do outro. O quadro é a repetição —
      // três portas iguais e um homem pequeno entre elas para dar a medida.
      b(5, { q: "Também todas as portas e ombreiras quadradas eram de uma mesma vista",
        props: [
          P("door", -215, 1.15, undefined, 0.3),
          P("door", -20, 1.15, undefined, 0.38),
          P("door", 175, 1.15, undefined, 0.46),
          P("column", -320, 1.3, undefined, 0.28),
          P("column", 305, 1.2, undefined, 0.4),
          P("amphora", 80, 0.8, undefined, 0.7),
          P("crate", -120, 0.85, undefined, 0.68),
        ],
        env: { terrain: "city", night: 0.24, glory: 0.36, verdure: 0.34 }, cast: [
        C("servo", -110, "walk", { dy: 0.6, facing: 1, id: "pedreiro-do-palacio2" }),
        C("homem", 90, "stand", { dy: 0.52, facing: -1, id: "mestre-de-obra-do-palacio" }),
      ] }),
      // v.6 — o PÓRTICO DAS COLUNAS: cinqüenta côvados por trinta, e o pórtico
      // defronte delas com as grossas vigas por cima. Palco largo e quase sem
      // gente — o assunto aqui é o vão, não quem passa por ele.
      b(6, { q: "Depois fez um pórtico de colunas de cinqüenta côvados de comprimento",
        set: "portico-das-colunas", props: PORTICO_DAS_COLUNAS,
        env: { terrain: "city", night: 0.14, glory: 0.44, storm: 0.04, verdure: 0.3 }, cast: [
        C("rei", -280, "walk", { dy: 0.66, facing: 1, id: "salomao" }),
        C("servo", 250, "stand", { dy: 0.5, facing: -1, id: "pedreiro-do-palacio1" }),
      ] }),
      // v.7 — o PÓRTICO PARA O TRONO ONDE JULGAVA, revestido de cedro de soalho a
      // soalho: o rei sentado, os dois litigantes de Israel diante dele e o
      // porteiro segurando a porta. A sala do juízo, montada e em uso.
      b(7, { q: "Também fez o pórtico para o trono onde julgava, isto é, o pórtico do juízo",
        set: "portico-do-juizo", props: PORTICO_DO_JUIZO,
        env: { terrain: "throne", night: 0.28, glory: 0.5, storm: 0.04, verdure: 0.18 }, cast: [
        C("rei", 0, "stand", { dy: 0.46, facing: -1, id: "salomao" }),
        C("homem", -120, "bow", { dy: 0.62, facing: 1, id: "litigante-de-israel1" }),
        C("mulherComum", -215, "kneel", { dy: 0.58, facing: 1, id: "litigante-de-israel2" }),
        C("servo", 260, "stand", { dy: 0.56, facing: -1, id: "porteiro-do-tribunal" }),
      ] }),
      // v.8 — o OUTRO PÁTIO, por dentro do pórtico: a casa em que o rei morava e,
      // do lado, a casa de obra semelhante que ele fez para a FILHA DE FARAÓ, que
      // tomara por mulher. Duas casas gêmeas e o poço do pátio no meio.
      b(8, { q: "também para a filha de Faraó, que Salomão tomara por mulher, fez uma casa semelhante àquele pórtico",
        set: "outro-patio", props: OUTRO_PATIO,
        env: { terrain: "city", night: 0.2, glory: 0.42, storm: 0.02, verdure: 0.46 }, cast: [
        C("rei", -105, "point", { dy: 0.56, facing: 1, id: "salomao" }),
        C("mulherComum", 90, "stand", { dy: 0.6, facing: -1, id: "filha-de-farao" }),
        C("servo", 215, "walk", { dy: 0.66, facing: -1, id: "servo-do-outro-patio" }),
      ] }),
      // v.9 — de onde vem tudo isso: a PEDREIRA. Pedras de grande valor cortadas
      // à medida e SERRADAS À SERRA por dentro e por fora — dois serradores
      // curvados sobre o bloco, a poeira branca no ar.
      b(9, { q: "eram de pedras de grande valor, cortadas à medida, serradas à serra por dentro e por fora",
        set: "pedreira", props: PEDREIRA,
        env: { terrain: "field", night: 0.16, glory: 0.3, storm: 0.08, fire: 0.04, verdure: 0.24 }, cast: [
        C("servo", -140, "kneel", { dy: 0.66, facing: 1, id: "serrador-de-pedra1" }),
        C("servo", 30, "bow", { dy: 0.72, facing: -1, id: "serrador-de-pedra2" }),
        C("homem", 205, "stand", { dy: 0.56, facing: -1, id: "mestre-de-obra-do-palacio" }),
      ] }),
      // v.10 — a medida do fundamento: pedras de DEZ côvados e pedras de OITO. O
      // bloco maior tomba para a frente do quadro e três homens o empurram com a
      // alavanca; o escriba anota o tamanho.
      b(10, { q: "sobre pedras de dez côvados e pedras de oito côvados",
        env: { terrain: "field", night: 0.2, glory: 0.26, storm: 0.12, verdure: 0.22 }, cast: [
        C("servo", -215, "bow", { dy: 0.62, facing: 1, id: "serrador-de-pedra1" }),
        C("servo", -85, "bow", { dy: 0.7, facing: 1, id: "serrador-de-pedra2" }),
        C("servo", 60, "kneel", { dy: 0.76, facing: -1, id: "pedreiro-do-palacio2" }),
        C("homem", 235, "write", { dy: 0.6, facing: -1, id: "escriba-da-obra" }),
      ] }),
      // v.11 — e por cima do fundamento, pedras lavradas segundo as medidas E
      // MADEIRA DE CEDRO: o carregador chega com a viga no ombro, o cedro entra
      // na pedreira, os dois materiais da casa juntos no mesmo quadro.
      b(11, { q: "E em cima delas pedras de grande valor, lavradas segundo as medidas, e madeira de cedro",
        props: [
          P("rock", -230, 1.35, undefined, 0.5),
          P("rock", -70, 1.2, undefined, 0.64),
          P("tree", 150, 1.3, undefined, 0.18),
          P("tree", 275, 1.2, undefined, 0.22),
          P("crate", 60, 0.9, undefined, 0.7),
          P("stall", 320, 1.0, undefined, 0.36),
          P("grass", -310, 0.78, undefined, 0.78),
        ],
        env: { terrain: "field", night: 0.18, glory: 0.32, storm: 0.06, verdure: 0.38 }, cast: [
        C("servo", -20, "walk", { dy: 0.68, facing: 1, id: "carregador-de-cedro" }),
        C("servo", -180, "stand", { dy: 0.58, facing: 1, id: "serrador-de-pedra1" }),
        C("homem", 205, "point", { dy: 0.52, facing: -1, id: "mestre-de-obra-do-palacio" }),
      ] }),
      // v.12 — a receita do muro, e a nota que liga o palácio ao templo: TRÊS
      // ORDENS DE PEDRAS LAVRADAS com UMA ORDEM DE VIGAS DE CEDRO — assim era
      // também o pátio interior da casa do SENHOR. A câmera sai da pedreira e
      // mostra o muro do templo com as três fiadas contadas.
      b(12, { q: "Havia três ordens de pedras lavradas, com uma ordem de vigas de cedro",
        props: [
          P("church", 60, 1.4, undefined, 0.18),
          P("rock", -190, 1.25, undefined, 0.56),
          P("rock", -60, 1.15, undefined, 0.66),
          P("tree", -310, 1.25, undefined, 0.16),
          P("door", 250, 1.05, undefined, 0.42),
          P("crate", 155, 0.9, undefined, 0.68),
          P("grass", 320, 0.78, undefined, 0.78),
        ],
        env: { terrain: "city", night: 0.14, glory: 0.46, storm: 0.02, verdure: 0.34 }, cast: [
        C("rei", -120, "stand", { dy: 0.62, facing: 1, id: "salomao" }),
        C("homem", 20, "point", { dy: 0.56, facing: -1, id: "escriba-da-obra" }),
      ] }),
      // v.13 — o rei manda um mensageiro e MANDA TRAZER A HIRÃO DE TIRO — não o
      // rei de Tiro, o artífice. O mensageiro chega ao porto da ilha, o navio
      // encostado atrás, o cheiro de sal e de cobre.
      b(13, { q: "E enviou o rei Salomão um mensageiro e mandou trazer a Hirão de Tiro.",
        set: "porto-de-tiro", props: PORTO_DE_TIRO,
        env: { terrain: "city", night: 0.26, glory: 0.3, storm: 0.14, water: 0.62, verdure: 0.16 }, cast: [
        C("servo", -110, "walk", { dy: 0.66, facing: 1, id: "mensageiro-de-salomao" }),
        C("homem", 60, "stand", { dy: 0.6, facing: -1, id: "marinheiro-de-tiro" }),
      ] }),
      // v.14 — ⭐ a ficha do artífice: FILHO DE UMA MULHER VIÚVA da tribo de
      // NAFTALI, e o pai um homem de Tiro que trabalhava em cobre — "cheio de
      // sabedoria, e de entendimento, e de ciência para fazer toda a obra de
      // cobre". Israel pela mãe, Tiro pelo ofício. A viúva fica na porta; ele
      // atravessa o quadro para o lado do mensageiro.
      b(14, { q: "e era cheio de sabedoria, e de entendimento, e de ciência para fazer toda a obra de cobre",
        env: { terrain: "city", night: 0.2, glory: 0.5, storm: 0.08, water: 0.5, verdure: 0.18 }, cast: [
        C("homem", -30, "walk", { dy: 0.64, facing: 1, id: "hirao-artifice", glow: 0.2 }),
        C("mulherComum", -195, "stand", { dy: 0.56, facing: 1, id: "viuva-de-naftali" }),
        C("servo", 140, "point", { dy: 0.6, facing: -1, id: "mensageiro-de-salomao" }),
      ] }),
      // v.15 — o primeiro trabalho, na oficina: DUAS COLUNAS DE COBRE de dezoito
      // côvados cada, e um fio de doze côvados para medir a volta de cada uma. As
      // colunas em pé no fundo, o fundidor esticando o cordão em torno.
      b(15, { q: "E formou duas colunas de cobre; a altura de cada coluna era de dezoito côvados",
        set: "oficina-de-hirao", props: OFICINA_DE_HIRAO,
        env: { terrain: "city", night: 0.42, glory: 0.28, storm: 0.06, fire: 0.6, verdure: 0.1 }, cast: [
        C("homem", -105, "point", { dy: 0.62, facing: 1, id: "hirao-artifice" }),
        C("servo", 95, "kneel", { dy: 0.66, facing: -1, id: "fundidor-de-cobre1" }),
      ] }),
      // v.16 — os DOIS CAPITÉIS DE FUNDIÇÃO, de cinco côvados cada, para pôr
      // sobre as cabeças das colunas. O cadinho vai ao forno: Hirão de costas
      // para nós diante do fogo, o aprendiz soprando o fole, a luz vindo de baixo.
      b(16, { q: "Também fez dois capitéis de fundição de cobre para pôr sobre as cabeças das colunas",
        env: { terrain: "city", night: 0.5, glory: 0.24, storm: 0.04, fire: 0.85, verdure: 0.08 }, cast: [
        C("homem", -215, "stand", { dy: 0.66, facing: -1, id: "hirao-artifice" }),
        C("servo", -110, "kneel", { dy: 0.72, facing: 1, id: "aprendiz-de-hirao" }),
        C("servo", 130, "stand", { dy: 0.56, facing: -1, id: "fundidor-de-cobre2" }),
      ] }),
      // v.17 — as REDES DE MALHAS e as LIGAS DE OBRA DE CADEIA: sete redes para
      // um capitel e sete para o outro. Trabalho de dedo, não de martelo — dois
      // homens sentados baixo, trançando o cobre fio a fio.
      b(17, { q: "sete para um capitel e sete para o outro capitel",
        env: { terrain: "city", night: 0.44, glory: 0.3, fire: 0.5, verdure: 0.08 }, cast: [
        C("servo", -60, "kneel", { dy: 0.76, facing: 1, id: "fundidor-de-cobre1" }),
        C("servo", 80, "kneel", { dy: 0.72, facing: -1, id: "fundidor-de-cobre2" }),
        C("homem", 245, "stand", { dy: 0.58, facing: -1, id: "hirao-artifice" }),
      ] }),
      // v.18 — as DUAS FILEIRAS em redor sobre a rede, para cobrir os capitéis: as
      // romãs entram em volta da cabeça da coluna. Hirão em cima do andaime, com o
      // capitel na altura do peito; o aprendiz passa as peças de baixo.
      b(18, { q: "juntamente com duas fileiras em redor sobre uma rede, para cobrir os capitéis",
        props: [
          P("column", -60, 1.5, undefined, 0.22),
          P("column", 90, 1.5, undefined, 0.22),
          P("campfire", -240, 1.05, 0.7, 0.6),
          P("crate", 220, 0.9, undefined, 0.66),
          P("bowl", -150, 0.85, undefined, 0.72),
          P("amphora", 300, 0.85, undefined, 0.68),
          P("rock", -320, 1.0, undefined, 0.72),
        ],
        env: { terrain: "city", night: 0.4, glory: 0.34, fire: 0.45, verdure: 0.08 }, cast: [
        C("homem", 20, "raise", { dy: 0.38, facing: 1, id: "hirao-artifice" }),
        C("servo", 150, "point", { dy: 0.7, facing: -1, id: "aprendiz-de-hirao" }),
      ] }),
      // v.19 — e no alto de tudo, OBRA DE LÍRIOS de quatro côvados, para o
      // pórtico: a peça mais delicada da fundição inteira sai do molde. Os dois
      // fundidores levantam o capitel acabado; a luz do forno cai baixa.
      b(19, { q: "eram de obra de lírios no pórtico, de quatro côvados",
        env: { terrain: "city", night: 0.34, glory: 0.44, fire: 0.35, verdure: 0.12 }, cast: [
        C("servo", -130, "raise", { dy: 0.66, facing: 1, id: "fundidor-de-cobre1" }),
        C("servo", 10, "raise", { dy: 0.68, facing: -1, id: "fundidor-de-cobre2" }),
        C("homem", 215, "stand", { dy: 0.6, facing: -1, id: "hirao-artifice" }),
      ] }),
      // v.20 — a conta das romãs: DUZENTAS em fileiras em redor, sobre a parte
      // globular junto à rede, num capitel e no outro. O escriba conta em voz
      // baixa com o dedo; Hirão espera, de braços caídos, que ele termine.
      b(20, { q: "e duzentas romãs, em fileiras em redor, estavam também sobre o outro capitel",
        env: { terrain: "city", night: 0.36, glory: 0.36, fire: 0.3, verdure: 0.1 }, cast: [
        C("homem", -190, "write", { dy: 0.64, facing: 1, id: "escriba-da-obra" }),
        C("homem", -50, "stand", { dy: 0.7, facing: -1, id: "hirao-artifice" }),
        C("servo", 175, "stand", { dy: 0.6, facing: -1, id: "aprendiz-de-hirao" }),
      ] }),
      // v.21 — ⭐ JAQUIM E BOAZ. As colunas sobem no PÓRTICO DO TEMPLO, e cada
      // uma recebe um nome: a direita JAQUIM ("Ele firmará"), a esquerda BOAZ
      // ("nEle há força"). Os obreiros nos cabos, o rei com o braço erguido, a
      // glória subindo sobre a fachada da casa.
      b(21, { q: "e levantando a coluna direita, pôs-lhe o nome de Jaquim",
        set: "portico-do-templo", props: PORTICO_DO_TEMPLO,
        env: { terrain: "city", night: 0.1, glory: 0.72, storm: 0.02, fire: 0.06, verdure: 0.3 }, cast: [
        C("rei", -35, "raise", { dy: 0.66, facing: 1, id: "salomao", glow: 0.22 }),
        C("homem", 95, "raise", { dy: 0.6, facing: -1, id: "hirao-artifice" }),
        C("servo", 215, "raise", { dy: 0.7, facing: -1, id: "fundidor-de-cobre1" }),
        C("servo", -180, "raise", { dy: 0.7, facing: 1, id: "aprendiz-de-hirao" }),
      ] }),
      // v.22 — e sobre a cabeça das colunas a OBRA DE LÍRIOS: "assim se acabou a
      // obra das colunas". A câmera abre, os obreiros dão um passo atrás, o povo
      // do adro comemora — a única multidão do capítulo, e ela é de alegria.
      b(22, { q: "e assim se acabou a obra das colunas",
        env: { terrain: "city", night: 0.08, glory: 0.8, storm: 0, fire: 0.04, verdure: 0.34 }, cast: [
        C("multidao", 230, "raise", { dy: 0.74, facing: -1, id: "povo-do-adro-do-templo" }),
        C("homem", -60, "stand", { dy: 0.68, facing: 1, id: "hirao-artifice", glow: 0.18 }),
        C("rei", -215, "stand", { dy: 0.64, facing: 1, id: "salomao" }),
      ] }),
      // v.23 — o MAR DE FUNDIÇÃO: dez côvados de uma borda à outra, PERFEITAMENTE
      // REDONDO, cinco côvados de alto, e um cordão de trinta côvados cingindo-o
      // em redor. O tanque de cobre no centro do pátio, e um homem esticando o
      // cordão para provar a medida.
      b(23, { q: "Fez mais o mar de fundição, de dez côvados de uma borda até à outra borda",
        set: "mar-de-fundicao", props: MAR_DE_FUNDICAO,
        env: { terrain: "city", night: 0.14, glory: 0.5, storm: 0.02, water: 0.3, verdure: 0.3 }, cast: [
        C("homem", -125, "point", { dy: 0.7, facing: 1, id: "hirao-artifice" }),
        C("servo", 130, "stand", { dy: 0.72, facing: -1, id: "fundidor-de-cobre2" }),
      ] }),
      // v.24 — perto da borda: os BOTÕES que cingiam o mar por baixo dela, DUAS
      // ORDENS deles, e nem foram pregados — foram FUNDIDOS QUANDO O MAR FOI
      // FUNDIDO, nascidos no mesmo derramamento. Dois homens de joelhos passando
      // a mão na volta do cobre.
      b(24, { q: "duas ordens destes botões foram fundidas quando o mar foi fundido",
        env: { terrain: "city", night: 0.18, glory: 0.42, water: 0.26, verdure: 0.26 }, cast: [
        C("servo", -75, "kneel", { dy: 0.78, facing: 1, id: "fundidor-de-cobre1" }),
        C("servo", 70, "kneel", { dy: 0.76, facing: -1, id: "aprendiz-de-hirao" }),
        C("homem", 240, "stand", { dy: 0.64, facing: -1, id: "hirao-artifice" }),
      ] }),
      // v.25 — ⭐ os DOZE BOIS: três olhando para o norte, três para o ocidente,
      // três para o sul, três para o oriente, e todas as partes posteriores para
      // o lado de dentro. O mar em cima deles; o círculo de bois em volta,
      // encarando os quatro cantos do mundo.
      b(25, { q: "E firmava-se sobre doze bois, três que olhavam para o norte",
        env: { terrain: "city", night: 0.12, glory: 0.6, storm: 0, water: 0.34, verdure: 0.3 }, cast: [
        C("rebanho", -330, "stand", { dy: 0.6, facing: -1, id: "boi-do-ocidente1" }),
        C("rebanho", -270, "stand", { dy: 0.72, facing: -1, id: "boi-do-ocidente2" }),
        C("rebanho", -210, "stand", { dy: 0.5, facing: -1, id: "boi-do-ocidente3" }),
        C("rebanho", -140, "stand", { dy: 0.78, facing: 1, id: "boi-do-sul1" }),
        C("rebanho", -70, "stand", { dy: 0.82, facing: 1, id: "boi-do-sul2" }),
        C("rebanho", 0, "stand", { dy: 0.8, facing: -1, id: "boi-do-sul3" }),
        C("rebanho", 70, "stand", { dy: 0.72, facing: 1, id: "boi-do-oriente1" }),
        C("rebanho", 140, "stand", { dy: 0.6, facing: 1, id: "boi-do-oriente2" }),
        C("rebanho", 210, "stand", { dy: 0.5, facing: 1, id: "boi-do-oriente3" }),
        C("rebanho", 265, "stand", { dy: 0.38, facing: -1, id: "boi-do-norte1" }),
        C("rebanho", 305, "stand", { dy: 0.3, facing: -1, id: "boi-do-norte2" }),
        C("rebanho", 335, "stand", { dy: 0.44, facing: -1, id: "boi-do-norte3" }),
      ] }),
      // v.26 — a grossura de UM PALMO, a borda como a de um COPO, como FLOR DE
      // LÍRIOS — e dois mil batos de água dentro. O mar é enchido pela primeira
      // vez: os servos despejam as talhas, e a água sobe até à borda lavrada.
      b(26, { q: "e a sua borda era como a de um copo, como de flor de lírios; ele levava dois mil batos",
        props: [
          { ...P("pool", 0, 1.4, undefined, 0.52), tag: "mar-de-fundicao" },
          P("church", -250, 1.15, undefined, 0.2),
          P("well", 235, 1.0, undefined, 0.44),
          P("amphora", -110, 0.9, undefined, 0.78),
          P("amphora", 120, 0.85, undefined, 0.76),
          P("bowl", 300, 0.8, undefined, 0.68),
          P("grass", -310, 0.78, undefined, 0.8),
        ],
        env: { terrain: "city", night: 0.14, glory: 0.55, water: 0.7, verdure: 0.3 }, cast: [
        C("servo", -145, "raise", { dy: 0.74, facing: 1, id: "fundidor-de-cobre1" }),
        C("servo", 155, "raise", { dy: 0.72, facing: -1, id: "aprendiz-de-hirao" }),
      ] }),
      // v.27 — as DEZ BASES DE COBRE: quatro côvados de comprimento, quatro de
      // largura, três de altura. De volta à oficina, no canto do carrinho — a
      // roda no cavalete, o forno menor da liga, os moldes das cintas nos
      // caixotes.
      b(27, { q: "Fez também as dez bases de cobre; o comprimento de uma base de quatro côvados",
        set: "oficina-das-bases", props: OFICINA_DAS_BASES,
        env: { terrain: "city", night: 0.4, glory: 0.28, storm: 0.04, fire: 0.55, verdure: 0.08 }, cast: [
        C("homem", -110, "point", { dy: 0.7, facing: 1, id: "hirao-artifice" }),
        C("servo", 95, "kneel", { dy: 0.74, facing: -1, id: "fundidor-de-cobre2" }),
      ] }),
      // v.28 — a anatomia da peça: a base TINHA CINTAS, e as cintas estavam ENTRE
      // AS MOLDURAS. Hirão de joelhos com as mãos na armação, mostrando ao
      // aprendiz onde uma coisa encaixa na outra.
      b(28, { q: "tinham cintas, e as cintas estavam entre as molduras",
        env: { terrain: "city", night: 0.38, glory: 0.3, fire: 0.45, verdure: 0.08 }, cast: [
        C("homem", -40, "kneel", { dy: 0.78, facing: 1, id: "hirao-artifice" }),
        C("servo", 105, "bow", { dy: 0.74, facing: -1, id: "aprendiz-de-hirao" }),
      ] }),
      // v.29 — e sobre as cintas, entre as molduras: LEÕES, BOIS E QUERUBINS, com
      // junturas de obra estendida por baixo. O entalhador levanta o querubim de
      // cobre contra a luz do forno para ver se a asa ficou limpa.
      b(29, { q: "havia leões, bois, e querubins",
        env: { terrain: "city", night: 0.34, glory: 0.42, fire: 0.5, verdure: 0.08 }, cast: [
        C("homem", 165, "raise", { dy: 0.62, facing: -1, id: "entalhador-dos-querubins" }),
        C("homem", -70, "stand", { dy: 0.72, facing: 1, id: "hirao-artifice" }),
        C("servo", -230, "kneel", { dy: 0.76, facing: 1, id: "fundidor-de-cobre1" }),
      ] }),
      // v.30 — a base anda: QUATRO RODAS DE METAL e lâminas de cobre, com
      // suportes fundidos nos quatro cantos, por baixo da pia. O rodeiro deita a
      // peça no chão e experimenta o giro da roda com a palma da mão.
      b(30, { q: "E uma base tinha quatro rodas de metal, e lâminas de cobre",
        props: [
          { ...P("chariot", -30, 1.25, undefined, 0.58), tag: "obra-de-roda-de-carro" },
          P("campfire", -250, 1.0, 0.6, 0.6),
          P("crate", 140, 0.95, undefined, 0.66),
          P("bowl", 245, 0.85, undefined, 0.7),
          P("column", 320, 1.2, undefined, 0.26),
          P("rock", -330, 1.0, undefined, 0.72),
          P("amphora", 60, 0.8, undefined, 0.74),
        ],
        env: { terrain: "city", night: 0.36, glory: 0.32, fire: 0.4, verdure: 0.08 }, cast: [
        C("homem", -140, "kneel", { dy: 0.76, facing: 1, id: "rodeiro-das-bases" }),
        C("homem", 95, "stand", { dy: 0.68, facing: -1, id: "hirao-artifice" }),
      ] }),
      // v.31 — a BOCA DA PIA, dentro da coroa da base e um côvado acima dela:
      // redonda de côvado e meio, com entalhes na boca — e as cintas QUADRADAS,
      // NÃO REDONDAS. O redondo em cima do quadrado, e o aprendiz medindo a boca
      // com o vão dos dedos.
      b(31, { q: "e as suas cintas eram quadradas, não redondas",
        props: [
          P("pool", -20, 0.9, undefined, 0.56),
          P("crate", -25, 1.05, undefined, 0.76),
          P("campfire", -260, 0.95, 0.5, 0.62),
          P("bowl", 175, 0.85, undefined, 0.7),
          P("cherub", 290, 1.0, undefined, 0.36),
          P("column", -330, 1.2, undefined, 0.26),
          P("amphora", 100, 0.8, undefined, 0.74),
        ],
        env: { terrain: "city", night: 0.34, glory: 0.34, fire: 0.35, verdure: 0.08 }, cast: [
        C("servo", 90, "point", { dy: 0.78, facing: 1, id: "aprendiz-de-hirao" }),
        C("homem", -160, "stand", { dy: 0.7, facing: 1, id: "hirao-artifice" }),
      ] }),
      // v.32 — as QUATRO RODAS por baixo das cintas, os EIXOS presos na base, e a
      // altura de cada roda: CÔVADO E MEIO. O escriba de pé com a vara de medir
      // encostada na roda; o rodeiro segura a peça no lugar.
      b(32, { q: "e era a altura de cada roda de côvado e meio",
        env: { terrain: "city", night: 0.32, glory: 0.36, fire: 0.3, verdure: 0.08 }, cast: [
        C("homem", -85, "write", { dy: 0.72, facing: 1, id: "escriba-da-obra" }),
        C("homem", 60, "kneel", { dy: 0.78, facing: -1, id: "rodeiro-das-bases" }),
        C("servo", 230, "stand", { dy: 0.64, facing: -1, id: "fundidor-de-cobre2" }),
      ] }),
      // v.33 — a comparação que o próprio texto faz: a obra das rodas era COMO A
      // OBRA DA RODA DE CARRO — eixos, cambas, cubos e raios, todos fundidos. O
      // carro de verdade entra no quadro, ao lado da roda pequena, para o leitor
      // ver de onde saiu o desenho.
      b(33, { q: "E era a obra das rodas como a obra da roda de carro",
        props: [
          { ...P("chariot", 145, 1.35, undefined, 0.44), tag: "obra-de-roda-de-carro" },
          P("crate", -60, 1.0, undefined, 0.7),
          P("campfire", -235, 1.0, 0.55, 0.6),
          P("bowl", -140, 0.8, undefined, 0.76),
          P("cherub", 305, 1.0, undefined, 0.3),
          P("column", -325, 1.2, undefined, 0.26),
          P("rock", 40, 0.95, undefined, 0.8),
        ],
        env: { terrain: "city", night: 0.3, glory: 0.4, fire: 0.32, verdure: 0.1 }, cast: [
        C("homem", 20, "point", { dy: 0.66, facing: 1, id: "rodeiro-das-bases" }),
        C("homem", -180, "stand", { dy: 0.72, facing: 1, id: "hirao-artifice" }),
      ] }),
      // v.34 — QUATRO SUPORTES aos quatro cantos de cada base, e os suportes
      // SAÍAM DA BASE: não são apliques, são osso da mesma peça. Dois homens
      // erguem a base pelos cantos para provar que aguenta.
      b(34, { q: "E havia quatro suportes aos quatro cantos de cada base",
        env: { terrain: "city", night: 0.32, glory: 0.34, fire: 0.3, verdure: 0.08 }, cast: [
        C("servo", -100, "raise", { dy: 0.74, facing: 1, id: "fundidor-de-cobre1" }),
        C("servo", 55, "raise", { dy: 0.74, facing: -1, id: "fundidor-de-cobre2" }),
        C("homem", 240, "stand", { dy: 0.62, facing: -1, id: "hirao-artifice" }),
      ] }),
      // v.35 — no ALTO de cada base, uma PEÇA REDONDA de meio côvado de altura, e
      // dali saem as asas e as cintas. A câmera olha a base de cima: o disco de
      // cobre na mão de Hirão, ainda morno.
      b(35, { q: "E no alto de cada base havia uma peça redonda de meio côvado de altura",
        env: { terrain: "city", night: 0.28, glory: 0.44, fire: 0.28, verdure: 0.08 }, cast: [
        C("homem", -30, "raise", { dy: 0.7, facing: 1, id: "hirao-artifice", glow: 0.16 }),
        C("servo", 140, "stand", { dy: 0.74, facing: -1, id: "aprendiz-de-hirao" }),
      ] }),
      // v.36 — e nas placas dos esteios e nas cintas, ele LAVROU QUERUBINS, LEÕES
      // E PALMAS, cada um segundo o espaço que tinha, com adornos em redor. O
      // entalhador debruçado sobre a placa, o querubim de cobre já pronto atrás.
      b(36, { q: "lavrou querubins, leões, e palmas",
        props: [
          { ...P("cherub", 60, 1.2, undefined, 0.42), tag: "querubins-das-bases" },
          P("palm", -300, 1.2, undefined, 0.16),
          P("crate", -110, 1.0, undefined, 0.7),
          P("campfire", -230, 0.95, 0.45, 0.62),
          P("bowl", 195, 0.85, undefined, 0.72),
          P("column", 320, 1.2, undefined, 0.26),
          P("rock", 0, 0.95, undefined, 0.82),
        ],
        env: { terrain: "city", night: 0.26, glory: 0.46, fire: 0.26, verdure: 0.14 }, cast: [
        C("homem", -35, "bow", { dy: 0.76, facing: 1, id: "entalhador-dos-querubins" }),
        C("homem", 235, "stand", { dy: 0.64, facing: -1, id: "hirao-artifice" }),
      ] }),
      // v.37 — e então DEZ VEZES a mesma coisa: uma mesma fundição, uma mesma
      // medida, um mesmo entalhe. A oficina cheia de bases idênticas em fila, e
      // os dois homens andando entre elas conferindo uma por uma.
      b(37, { q: "Conforme a esta fez as dez bases; todas tinham uma mesma fundição",
        props: [
          P("crate", -300, 0.95, undefined, 0.56),
          P("crate", -180, 0.95, undefined, 0.62),
          P("crate", -60, 0.95, undefined, 0.68),
          P("crate", 60, 0.95, undefined, 0.74),
          P("crate", 190, 0.95, undefined, 0.8),
          { ...P("chariot", 285, 1.05, undefined, 0.42), tag: "obra-de-roda-de-carro" },
          P("campfire", -320, 1.0, 0.4, 0.34),
        ],
        env: { terrain: "city", night: 0.24, glory: 0.5, fire: 0.24, verdure: 0.08 }, cast: [
        C("homem", -240, "walk", { dy: 0.72, facing: 1, id: "hirao-artifice" }),
        C("servo", -20, "stand", { dy: 0.5, facing: -1, id: "fundidor-de-cobre1" }),
      ] }),
      // v.38 — as DEZ PIAS DE COBRE, de quarenta batos e quatro côvados cada, uma
      // sobre cada base — e o pátio da casa amanhece com elas montadas. O quadro
      // do inventário virando arquitetura.
      b(38, { q: "Também fez dez pias de cobre; em cada pia cabiam quarenta batos",
        set: "patio-das-pias", props: PATIO_DAS_PIAS,
        env: { terrain: "city", night: 0.12, glory: 0.54, storm: 0.02, water: 0.3, verdure: 0.28 }, cast: [
        C("homem", -35, "point", { dy: 0.7, facing: 1, id: "hirao-artifice" }),
        C("servo", 120, "stand", { dy: 0.74, facing: -1, id: "aprendiz-de-hirao" }),
      ] }),
      // v.39 — a planta baixa dita em voz alta: CINCO BASES à direita da casa e
      // CINCO à esquerda; o MAR, esse, ao lado direito, para o oriente, da parte
      // do SUL. O rei atravessa o pátio conferindo os dois lados.
      b(39, { q: "E pôs cinco bases à direita da casa, e cinco à esquerda da casa",
        env: { terrain: "city", night: 0.1, glory: 0.6, water: 0.34, verdure: 0.3 }, cast: [
        C("rei", -170, "walk", { dy: 0.78, facing: 1, id: "salomao" }),
        C("homem", 40, "point", { dy: 0.76, facing: -1, id: "hirao-artifice" }),
        C("servo", 240, "stand", { dy: 0.68, facing: -1, id: "fundidor-de-cobre2" }),
      ] }),
      // v.40 — o miúdo que faltava: as PIAS, as PÁS e as BACIAS — e com isso
      // "acabou Hirão de fazer toda a obra". As peças pequenas alinhadas no chão
      // da oficina, e o artífice de pé no meio delas pela última vez.
      b(40, { q: "Depois fez Hirão as pias, e as pás, e as bacias",
        props: [
          P("bowl", -230, 0.9, undefined, 0.66),
          P("bowl", -95, 0.85, undefined, 0.72),
          P("bowl", 45, 0.85, undefined, 0.78),
          P("censer", 185, 0.8, undefined, 0.7),
          P("amphora", 290, 0.85, undefined, 0.66),
          P("campfire", -320, 1.0, 0.3, 0.5),
          P("column", 330, 1.2, undefined, 0.26),
        ],
        env: { terrain: "city", night: 0.2, glory: 0.56, fire: 0.18, verdure: 0.1 }, cast: [
        C("homem", -20, "stand", { dy: 0.58, facing: 1, id: "hirao-artifice", glow: 0.2 }),
        C("servo", 120, "kneel", { dy: 0.62, facing: -1, id: "aprendiz-de-hirao" }),
      ] }),
      // v.41 — começa a lista de conferência, e ela volta ao pórtico: AS DUAS
      // COLUNAS, os globos dos capitéis sobre as cabeças delas, e as duas redes
      // que cobrem os globos. Jaquim e Boaz de pé, e o escriba lendo o rol.
      b(41, { q: "as duas colunas, e os globos dos capitéis que estavam sobre a cabeça das duas colunas",
        set: "portico-do-templo", props: PORTICO_DO_TEMPLO,
        env: { terrain: "city", night: 0.12, glory: 0.66, storm: 0, verdure: 0.3 }, cast: [
        C("homem", -30, "write", { dy: 0.72, facing: 1, id: "escriba-da-obra" }),
        C("rei", 200, "stand", { dy: 0.66, facing: -1, id: "salomao" }),
      ] }),
      // v.42 — e as QUATROCENTAS ROMÃS para as duas redes, duas carreiras em cada
      // uma, cobrindo os globos dos capitéis. A câmera sobe pela coluna até o alto
      // e o escriba conta de cabeça erguida.
      b(42, { q: "E as quatrocentas romãs para as duas redes",
        env: { terrain: "city", night: 0.1, glory: 0.7, verdure: 0.32 }, cast: [
        C("homem", -105, "point", { dy: 0.78, facing: 1, id: "escriba-da-obra" }),
        C("servo", 105, "raise", { dy: 0.8, facing: -1, id: "aprendiz-de-hirao" }),
      ] }),
      // v.43 — item seguinte do rol: as DEZ BASES e as DEZ PIAS sobre as bases. A
      // conferência muda de lugar com a lista — de volta ao pátio, com os dois
      // conjuntos de cinco à vista.
      b(43, { q: "Juntamente com as dez bases, e as dez pias sobre as bases;",
        set: "patio-das-pias", props: PATIO_DAS_PIAS,
        env: { terrain: "city", night: 0.12, glory: 0.6, water: 0.28, verdure: 0.28 }, cast: [
        C("homem", -215, "write", { dy: 0.74, facing: 1, id: "escriba-da-obra" }),
        C("servo", 30, "walk", { dy: 0.78, facing: 1, id: "fundidor-de-cobre1" }),
      ] }),
      // v.44 — e o item maior da lista, dito em cinco palavras: UM MAR, e OS DOZE
      // BOIS DEBAIXO DAQUELE MAR. O círculo de bois outra vez, agora visto de
      // longe e por trás, como quem passa os olhos e segue anotando.
      b(44, { q: "Como também um mar, e os doze bois debaixo daquele mar;",
        set: "mar-de-fundicao", props: MAR_DE_FUNDICAO,
        env: { terrain: "city", night: 0.14, glory: 0.58, water: 0.32, verdure: 0.3 }, cast: [
        C("rebanho", -290, "stand", { dy: 0.66, facing: -1, id: "boi-do-ocidente1" }),
        C("rebanho", -215, "stand", { dy: 0.56, facing: -1, id: "boi-do-ocidente2" }),
        C("rebanho", -125, "stand", { dy: 0.76, facing: 1, id: "boi-do-sul1" }),
        C("rebanho", -30, "stand", { dy: 0.8, facing: 1, id: "boi-do-sul2" }),
        C("rebanho", 70, "stand", { dy: 0.74, facing: 1, id: "boi-do-oriente1" }),
        C("rebanho", 160, "stand", { dy: 0.62, facing: 1, id: "boi-do-oriente2" }),
        C("rebanho", 250, "stand", { dy: 0.5, facing: -1, id: "boi-do-norte1" }),
        C("homem", 320, "write", { dy: 0.72, facing: -1, id: "escriba-da-obra" }),
      ] }),
      // v.45 — os CALDEIRÕES, as PÁS, as BACIAS e todos os objetos que Hirão fez
      // para o rei: TODOS ERAM DE COBRE POLIDO. Tudo estendido ao sol do pátio,
      // brunido, devolvendo a luz — o beat mais claro do meio do capítulo.
      b(45, { q: "todos eram de cobre polido",
        props: [
          P("bowl", -255, 0.95, undefined, 0.6),
          P("bowl", -125, 0.9, undefined, 0.68),
          P("bowl", 5, 0.9, undefined, 0.76),
          P("censer", 135, 0.85, undefined, 0.66),
          P("amphora", 245, 0.9, undefined, 0.72),
          P("church", 60, 1.25, undefined, 0.16),
          { ...P("sun", -60, 1.15, undefined, 0.64), sky: true },
        ],
        env: { terrain: "city", night: 0.04, glory: 0.82, storm: 0, fire: 0.06, verdure: 0.26 }, cast: [
        C("homem", -190, "raise", { dy: 0.8, facing: 1, id: "hirao-artifice", glow: 0.24 }),
        C("servo", 200, "stand", { dy: 0.82, facing: -1, id: "fundidor-de-cobre2" }),
      ] }),
      // v.46 — e o texto conta ONDE tudo isso foi fundido: NA PLANÍCIE DO JORDÃO,
      // em TERRA BARRENTA, entre SUCOTE E ZARETÃ. Nem oficina nem cidade: covas
      // de molde abertas no barro da campina, os fornos acesos junto ao rio.
      b(46, { q: "Na planície do Jordão, o rei os fundiu em terra barrenta; entre Sucote e Zaretã.",
        set: "campina-do-jordao", props: CAMPINA_DO_JORDAO,
        env: { terrain: "field", night: 0.34, glory: 0.32, storm: 0.1, fire: 0.75, water: 0.4, verdure: 0.3 }, cast: [
        C("servo", -105, "bow", { dy: 0.74, facing: 1, id: "moldador-de-barro" }),
        C("servo", 55, "kneel", { dy: 0.8, facing: -1, id: "fundidor-de-cobre1" }),
        C("homem", 215, "stand", { dy: 0.66, facing: -1, id: "hirao-artifice" }),
      ] }),
      // v.47 — e aí o escriba baixa a vara: Salomão DEIXOU DE PESAR os objetos
      // pelo excessivo número — "nem se averiguou o peso do cobre". O rei chega à
      // campina, olha as pilhas e manda parar a conta; a balança fica de lado.
      b(47, { q: "nem se averiguou o peso do cobre",
        props: [
          P("crate", -215, 1.05, undefined, 0.6),
          P("crate", -95, 1.0, undefined, 0.68),
          P("crate", 30, 1.0, undefined, 0.76),
          P("crate", 165, 0.95, undefined, 0.82),
          { ...P("campfire", -320, 1.1, 0.85, 0.5), tag: "fundicao-da-campina-do-jordao" },
          P("river", 120, 1.2, undefined, 0.18),
          P("palm", 320, 1.15, undefined, 0.16),
        ],
        env: { terrain: "field", night: 0.26, glory: 0.5, storm: 0.06, fire: 0.5, water: 0.34, verdure: 0.32 }, cast: [
        C("rei", -20, "raise", { dy: 0.7, facing: 1, id: "salomao" }),
        C("homem", 235, "stand", { dy: 0.66, facing: -1, id: "escriba-da-obra" }),
        C("homem", 130, "bow", { dy: 0.6, facing: -1, id: "hirao-artifice" }),
      ] }),
      // v.48 — acaba o cobre e começa o OURO. Dentro da casa, diante do oráculo:
      // o ALTAR DE OURO e a MESA DE OURO com os PÃES DA PROPOSIÇÃO sobre ela. A
      // luz aqui não entra pela janela — sai do metal.
      b(48, { q: "o altar de ouro, e a mesa de ouro, sobre a qual estavam os pães da proposição",
        set: "interior-dourado", props: INTERIOR_DOURADO,
        env: { terrain: "glory", night: 0.3, glory: 0.72, storm: 0, fire: 0.1, verdure: 0.04 }, cast: [
        C("rei", -25, "stand", { dy: 0.7, facing: 1, id: "salomao" }),
        C("anciao", 175, "bow", { dy: 0.74, facing: -1, id: "levita-do-tesouro" }),
      ] }),
      // v.49 — os CASTIÇAIS: CINCO À DIREITA e CINCO À ESQUERDA, diante do
      // oráculo, de ouro finíssimo, com as flores, as lâmpadas e os espevitadores
      // também de ouro. As dez luzes acesas em duas alas, e a porta do oráculo
      // fechada no meio delas.
      b(49, { q: "E os castiçais, cinco à direita e cinco à esquerda, diante do oráculo",
        props: [
          { ...P("door", 0, 1.25, undefined, 0.22), tag: "portas-do-lugar-santissimo" },
          P("menorah", -300, 1.0, undefined, 0.46),
          P("lampstand", -235, 0.9, undefined, 0.54),
          P("lampstand", -170, 0.9, undefined, 0.62),
          P("lampstand", -105, 0.9, undefined, 0.7),
          P("lampstand", -45, 0.9, undefined, 0.78),
          P("menorah", 300, 1.0, undefined, 0.46),
          P("lampstand", 235, 0.9, undefined, 0.54),
          P("lampstand", 170, 0.9, undefined, 0.62),
          P("lampstand", 105, 0.9, undefined, 0.7),
          P("lampstand", 45, 0.9, undefined, 0.78),
        ],
        env: { terrain: "glory", night: 0.38, glory: 0.85, storm: 0, fire: 0.18, verdure: 0.02 }, cast: [
        C("anciao", -140, "stand", { dy: 0.86, facing: 1, id: "levita-do-tesouro" }),
        C("servo", 150, "kneel", { dy: 0.86, facing: -1, id: "servo-das-lampadas" }),
      ] }),
      // v.50 — e desce até ao detalhe que ninguém veria: os vasos, os apagadores,
      // as bacias, as colheres, os perfumadores — e as DOBRADIÇAS DAS PORTAS do
      // lugar santíssimo, também de ouro. Até o gonzo que range é de ouro.
      b(50, { q: "e as dobradiças para as portas da casa interior para o lugar santíssimo",
        props: [
          { ...P("door", -60, 1.35, undefined, 0.3), tag: "portas-do-lugar-santissimo" },
          P("censer", 110, 0.85, undefined, 0.62),
          P("bowl", 215, 0.85, undefined, 0.7),
          P("bowl", -235, 0.8, undefined, 0.68),
          P("menorah", 310, 1.0, undefined, 0.44),
          P("lampstand", -310, 0.9, undefined, 0.5),
          P("column", 30, 1.25, undefined, 0.24),
        ],
        env: { terrain: "glory", night: 0.34, glory: 0.8, storm: 0, fire: 0.14, verdure: 0.02 }, cast: [
        C("servo", -150, "kneel", { dy: 0.78, facing: 1, id: "ourives-das-dobradicas" }),
        C("rei", 60, "stand", { dy: 0.8, facing: -1, id: "salomao" }),
      ] }),
      // v.51 — ⭐ o fecho, e a única frase do capítulo com gente dentro: acabada
      // TODA A OBRA, Salomão traz o que DAVI SEU PAI HAVIA CONSAGRADO — a prata, o
      // ouro e os objetos — e põe entre os TESOUROS DA CASA DO SENHOR. O filho
      // termina o que o pai só pôde guardar; os cofres entram pela porta e o povo
      // acompanha do corredor.
      b(51, { q: "então trouxe Salomão as coisas que seu pai Davi havia consagrado",
        set: "tesouros-da-casa", props: TESOUROS_DA_CASA,
        env: { terrain: "glory", night: 0.16, glory: 0.92, storm: 0, fire: 0.08, verdure: 0.06 }, cast: [
        C("rei", -110, "raise", { dy: 0.72, facing: 1, id: "salomao", glow: 0.3 }),
        C("anciao", 25, "bow", { dy: 0.76, facing: -1, id: "levita-do-tesouro" }),
        C("servo", 145, "walk", { dy: 0.8, facing: -1, id: "carregador-do-tesouro" }),
        C("multidao", 285, "raise", { dy: 0.68, facing: -1, id: "povo-do-adro-do-templo" }),
      ] }),
    ],
  },
};
