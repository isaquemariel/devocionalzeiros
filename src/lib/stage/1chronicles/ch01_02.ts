// ============================================================================
// 1 CRÔNICAS 1–2 — CENA VIVA. O Cronista começa a história de Israel no
// primeiro homem — "ADÃO, SETE, ENOS" — e desce dali até a casa de Davi sem
// contar uma única batalha. São 109 versículos de nomes; mas nomes, aqui, são
// LUGARES, OFÍCIOS e FEITOS. Quem lê depressa vê uma lista. Quem lê devagar vê
// o mundo inteiro sendo repartido entre famílias, e no meio dele um caçador,
// uma terra que se fende, oito reis que reinaram em Edom antes de haver rei em
// Israel, um primogênito que Deus mata, um servo egípcio que vira genro do
// senhor, e um ourives que fará o candelabro do tabernáculo.
//
// 1Cr 1 — DA CRIAÇÃO A EDOM. Dez nomes atravessam o mundo antigo até NOÉ, e de
// Noé saem três povos: JAFÉ vai para as ilhas e para as estepes do norte (os
// cavaleiros de Togarma, os navios de Társis); CÃO desce para o Nilo, para
// Cuxe e para Canaã — e de Cuxe nasce NINRODE, "QUE COMEÇOU A SER PODEROSO NA
// TERRA", o primeiro homem da Escritura de quem se diz que se fez grande; SEM
// fica no oriente, e na sua linha nasce PELEGUE, "PORQUANTO NOS SEUS DIAS SE
// REPARTIU A TERRA" — um nome que é uma rachadura no chão do mundo. A conta
// então se estreita: Sem, Arfaxade, Selá, Éber, Pelegue, Reú, Serugue, Naor,
// Terá — e para tudo numa frase de quatro palavras, "ABRÃO, QUE É ABRAÃO".
// Dele saem Isaque e Ismael, os doze príncipes do deserto, os filhos de
// Quetura, e depois Esaú, e os filhos de Seir o horeu que moravam nas cavernas
// do monte. O capítulo fecha com o que talvez seja a lista mais estranha da
// Bíblia: OS OITO REIS QUE REINARAM NA TERRA DE EDOM "ANTES QUE REINASSE REI
// SOBRE OS FILHOS DE ISRAEL". Nenhum deles herda do pai — cada um "morreu, e
// reinou em seu lugar" outro, vindo de outra cidade: Dinabá, Bozra, a terra
// dos temanitas, Avite (de Hadade, "este feriu os midianitas no campo de
// Moabe"), Masreca, Reobote junto ao rio, e Paí, onde um rei de Edom teve
// mulher com nome guardado — Meetabel, filha de Matrede, filha de Me-Zaabe.
// Depois nem reis: príncipes, um por um, até o último, Irã, e acabou Edom.
//
// 1Cr 2 — OS FILHOS DE ISRAEL, E JUDÁ EM PRIMEIRO LUGAR. Doze nomes, e o
// Cronista larga onze deles para abrir Judá. E o primeiro que aparece na casa
// escolhida é ER, "O PRIMOGÊNITO DE JUDÁ, FOI MAU AOS OLHOS DO SENHOR, PELO
// QUE O MATOU" — a genealogia do Messias começa com um filho morto por Deus.
// Quem continua a linha é TAMAR, a nora, com Perez e Zerá; de Zerá saem os
// cinco sábios (Etã, Hemã, Calcol, Dara), e de Carmi sai ACAR, "O PERTURBADOR
// DE ISRAEL, QUE PECOU NO ANÁTEMA". De Perez a estrada é reta e conhecida:
// Hezrom, Rão, Aminadabe, NAASSOM "PRÍNCIPE DOS FILHOS DE JUDÁ", Salma, BOAZ,
// OBEDE, JESSÉ — e sete filhos, dos quais "DAVI, O SÉTIMO". Vêm as duas irmãs
// que o texto nomeia, ZERUIA e ABIGAIL, e com elas os três sobrinhos que farão
// e desfarão o reinado: Abisai, Joabe e Asael. O resto do capítulo é a casa de
// CALEBE, filho de Hezrom, e a de JERAMEEL: Azuba que morre e Efrate que a
// substitui; Hur, Uri e BEZALEEL, o ourives do tabernáculo; Hezrom que aos
// sessenta anos toma a filha de Maquir e ganha Gileade; Jair com as suas vinte
// e três cidades, tomadas depois por Gesur e Arã; dois homens que "morreram sem
// filhos" e cujo ramo seca ali mesmo; e SESÃ, que "NÃO TEVE FILHOS, MAS
// FILHAS", e deu a filha por mulher a JARÁ, O SEU SERVO EGÍPCIO — casamento de
// que sai uma linhagem inteira de treze gerações. O fim é um mapa de aldeias:
// Zife, Maom, Bete-Zur, Madmana, Quiriate-Jearim com os seus bosques, Belém e
// os netofatitas, Zorá e Estaol — e, por último, "AS FAMÍLIAS DOS ESCRIBAS QUE
// HABITAVAM EM JABEZ", tiratitas, simeatitas e sucatitas, "ESTES SÃO OS
// QUENEUS", a gente da casa de Recabe que morava em tenda e sabia escrever.
//
// A VOZ DE DEUS — nestes dois capítulos Deus não abre a boca uma única vez, e
// por isso NÃO HÁ NENHUM `by` em todo o arquivo: nenhuma voz do céu, nenhum
// anjo, nenhum profeta. É proposital e é fiel ao texto — a genealogia não
// discursa. Deus aparece aqui uma vez só, e em ATO, não em fala: em 2:3, "Er,
// o primogênito de Judá, foi mau aos olhos do Senhor, PELO QUE O MATOU". Esse
// beat é o único do arquivo com noite quase cheia, glória em zero e uma figura
// em `lie` no primeiro plano, sem multidão em volta — o juízo é mudo. O mesmo
// silêncio pesa sobre Acar em 2:7, no vale do anátema, e sobre os dois homens
// que "morreram sem filhos" (2:30 e 2:32), onde a cena se apaga sem ninguém
// dizer nada. Onde há luz alta neste arquivo, ela nunca é uma teofania: é
// Enoque andando com Deus (1:3), o arco-íris do Ararate (1:4), o nome novo de
// Abraão em Manre (1:27), o ouro de Bezaleel (2:20) e as bodas do servo
// egípcio (2:35) — a glória de Deus trabalhando dentro de uma família comum.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ========================================================== SETS 1Cr 1

// A PRIMEIRA LAVOURA — o mundo fora do jardim, onde o pão passou a sair do
// suor: a leira aberta na terra nua, o feixe da primeira colheita, o poço que
// alguém teve de cavar e a tenda que virou casa. Nenhuma cidade ainda; o
// horizonte é só campo e as duas árvores que sobraram da mata.
const A_PRIMEIRA_LAVOURA: StagePropSpec[] = [
  P("tent", -262, 1.1, undefined, 0.34),
  P("tree", -68, 1.05, undefined, 0.2),
  P("tree", 118, 0.95, undefined, 0.24),
  P("well", 232, 1.0, undefined, 0.46),
  P("sheaf", 25, 0.9, undefined, 0.62),
  P("grass", -140, 0.72, undefined, 0.78),
  P("rock", -318, 1.0, undefined, 0.52),
  P("bush", 305, 0.85, undefined, 0.5),
  { ...P("sun", 60, 1.1, undefined, 0.6), sky: true },
];

// A VEREDA DE ENOQUE — a subida por onde andou com Deus trezentos anos e de
// onde não voltou: o carreiro entre as duas lajes, o freixo do alto, a névoa
// da manhã ainda no chão e as aves saindo do vale. Não há tenda nem cerca —
// esta paisagem é uma saída.
const A_VEREDA_DE_ENOQUE: StagePropSpec[] = [
  P("rock", -240, 1.3, undefined, 0.46),
  P("rock", 228, 1.2, undefined, 0.5),
  P("tree", 96, 1.0, undefined, 0.18),
  P("bush", -95, 0.85, undefined, 0.52),
  P("grass", 10, 0.68, undefined, 0.8),
  P("palm", -330, 0.9, undefined, 0.16),
  { ...P("sun", 150, 1.2, undefined, 0.66), sky: true },
  { ...P("birds", -60, 1.0, undefined, 0.5), sky: true },
];

// O ARARATE DEPOIS DO DILÚVIO — o casco encalhado no alto do monte, o altar de
// pedra ainda fumegando do holocausto e O ARCO NA NUVEM, o primeiro sinal de
// aliança do mundo novo. Embaixo, a terra lavada, sem mato e sem gente.
const O_ARARATE_DEPOIS_DO_DILUVIO: StagePropSpec[] = [
  { ...P("arkship", -178, 1.25, undefined, 0.28), tag: "arca-de-noe-no-ararate" },
  { ...P("altar", 92, 1.0, 0.5, 0.5), tag: "altar-de-noe" },
  { ...P("rainbow", 30, 1.35, undefined, 0.2), tag: "arco-da-alianca-de-noe" },
  P("rock", -318, 1.15, undefined, 0.52),
  P("rock", 268, 1.1, undefined, 0.56),
  P("grass", 175, 0.6, undefined, 0.8),
  { ...P("clouds", 240, 1.0, undefined, 0.72), sky: true },
];

// AS ILHAS DOS GENTIOS — a praia de onde os filhos de Jafé se espalharam pelo
// mar: dois cascos puxados para a areia, o mar tomando meio quadro, a rocha do
// quebra-mar e o bando de aves marinhas por cima. Terra pouca, água muita.
const AS_ILHAS_DOS_GENTIOS: StagePropSpec[] = [
  P("boat", -170, 1.2, undefined, 0.44),
  P("boat", 88, 1.05, undefined, 0.34),
  P("rock", 288, 1.15, undefined, 0.5),
  P("rock", -318, 1.0, undefined, 0.56),
  P("crate", 6, 0.85, undefined, 0.66),
  P("grass", 210, 0.6, undefined, 0.8),
  { ...P("sun", -70, 1.05, undefined, 0.58), sky: true },
  { ...P("birds", 180, 1.0, undefined, 0.52), sky: true },
];

// A ESTEPE DE TOGARMA — o norte de Gomer, a terra que vendia cavalos e mulos
// nas feiras de Tiro: o pasto alto varrido de vento, o cavalo à solta, a torre
// de vigia de barro no fim da planície e o céu carregado de nuvem baixa.
const A_ESTEPE_DE_TOGARMA: StagePropSpec[] = [
  P("horse", -108, 1.15, undefined, 0.52),
  P("tower", 205, 1.2, undefined, 0.22),
  P("rock", -300, 1.05, undefined, 0.5),
  P("bush", 60, 0.9, undefined, 0.54),
  P("grass", -20, 0.8, undefined, 0.78),
  P("grass", 288, 0.7, undefined, 0.72),
  { ...P("clouds", -150, 1.15, undefined, 0.7), sky: true },
];

// O PORTO DE TÁRSIS — a doca dos filhos de Javã, de onde vinham a prata e o
// estanho: o navio atracado, as ânforas e os caixotes do carregamento em fila
// na pedra do cais, o farol da ponta e o mar batendo por baixo de tudo.
const O_PORTO_DE_TARSIS: StagePropSpec[] = [
  P("boat", -128, 1.3, undefined, 0.4),
  P("tower", 235, 1.25, undefined, 0.2),
  P("amphora", 40, 0.85, undefined, 0.64),
  P("amphora", 85, 0.8, undefined, 0.68),
  P("crate", 138, 0.9, undefined, 0.62),
  P("crate", 8, 0.85, undefined, 0.7),
  P("rock", -318, 1.1, undefined, 0.54),
  { ...P("sun", 130, 1.05, undefined, 0.54), sky: true },
];

// O RIO DE MIZRAIM — a beira do Nilo dos filhos de Cão: o rio atravessando o
// quadro, os tamareiros da margem, o casario de tijolo da cidade baixa e a
// torre do templo ao fundo. O verde é só a faixa da água; atrás dela é areia.
const O_RIO_DE_MIZRAIM: StagePropSpec[] = [
  { ...P("river", -40, 1.3, undefined, 0.68), tag: "rio-de-mizraim" },
  P("church", 150, 1.15, undefined, 0.26),
  P("tower", 285, 1.2, undefined, 0.2),
  P("palm", -320, 1.05, undefined, 0.16),
  P("palm", 318, 0.95, undefined, 0.18),
  P("bush", -175, 0.85, undefined, 0.52),
  P("grass", 70, 0.75, undefined, 0.8),
  { ...P("sun", -110, 1.1, undefined, 0.62), sky: true },
];

// A CARAVANA DE SEBÁ E DEDÃ — a rota das especiarias dos filhos de Cuxe, que
// atravessava a Arábia com ouro, incenso e pedra preciosa: os jumentos de
// carga parados, os fardos no chão, o turíbulo aberto de amostra e a duna alta
// cortando o horizonte.
const A_CARAVANA_DE_SEBA_E_DEDA: StagePropSpec[] = [
  P("donkey", -145, 1.1, undefined, 0.5),
  P("donkey", 92, 1.05, undefined, 0.56),
  { ...P("censer", -10, 0.95, undefined, 0.66), tag: "incenso-de-seba" },
  P("crate", 190, 0.9, undefined, 0.6),
  P("crate", 240, 0.85, undefined, 0.66),
  P("rock", -312, 1.1, undefined, 0.52),
  P("palm", 320, 0.9, undefined, 0.16),
];

// A CAÇADA DE NINRODE — o campo onde "começou a ser poderoso na terra": o arco
// e a lança largados na pedra da tocaia, o mato pisado, as aves levantando voo
// do vale e, muito ao longe, o zigurate da primeira cidade — o começo do reino
// que ele fundou. A paisagem inteira é uma ameaça de tarde.
const A_CACADA_DE_NINRODE: StagePropSpec[] = [
  P("bow", -60, 1.15, undefined, 0.6),
  P("spear", 22, 1.1, undefined, 0.64),
  P("ziggurat", 258, 1.15, undefined, 0.2),
  P("rock", -235, 1.25, undefined, 0.48),
  P("tree", 110, 1.0, undefined, 0.2),
  P("bush", -318, 0.9, undefined, 0.54),
  P("grass", 165, 0.72, undefined, 0.78),
  { ...P("birds", -140, 1.1, undefined, 0.54), sky: true },
];

// AS OFICINAS DO BAIXO EGITO — os ofícios dos filhos de Mizraim: o forno do
// oleiro aceso ao ar livre, as talhas cruas secando em fila, os caixotes do
// depósito e o poço da vila. É trabalho de gente miúda, não de rei.
const AS_OFICINAS_DO_BAIXO_EGITO: StagePropSpec[] = [
  { ...P("campfire", -108, 1.15, 0.85, 0.56), tag: "forno-dos-oleiros-de-mizraim" },
  P("amphora", -22, 0.9, undefined, 0.64),
  P("amphora", 24, 0.85, undefined, 0.7),
  P("amphora", 70, 0.8, undefined, 0.6),
  P("crate", 160, 0.9, undefined, 0.66),
  P("well", 262, 1.0, undefined, 0.44),
  P("church", 40, 1.05, undefined, 0.26),
  P("palm", -322, 0.95, undefined, 0.16),
];

// A COSTA DOS CAFTORIM — a praia por onde saíram os filisteus: o casco
// encalhado de través, as armas fincadas na areia molhada, o paredão de pedra
// da enseada e o temporal ainda em cima da água. Um desembarque, não um porto.
const A_COSTA_DOS_CAFTORIM: StagePropSpec[] = [
  P("boat", -155, 1.25, undefined, 0.42),
  P("sword", 55, 1.05, undefined, 0.62),
  P("spear", 100, 1.1, undefined, 0.58),
  P("rock", 262, 1.2, undefined, 0.5),
  P("rock", -320, 1.05, undefined, 0.56),
  P("grass", 180, 0.6, undefined, 0.8),
  { ...P("clouds", 20, 1.2, undefined, 0.72), sky: true },
];

// O PORTO DE SIDOM — a cidade do primogênito de Canaã, a mais velha da costa:
// o molhe de pedra, o barco de pesca amarrado, as ânforas de púrpura na
// calçada, a muralha baixa e a torre do farol. Cheira a sal e a tinta.
const O_PORTO_DE_SIDOM: StagePropSpec[] = [
  P("boat", 118, 1.15, undefined, 0.46),
  P("tower", -212, 1.3, undefined, 0.2),
  P("church", -60, 1.15, undefined, 0.26),
  P("amphora", 12, 0.9, undefined, 0.66),
  P("amphora", 55, 0.85, undefined, 0.7),
  P("crate", 240, 0.9, undefined, 0.62),
  P("rock", -320, 1.05, undefined, 0.54),
  { ...P("sun", 290, 1.0, undefined, 0.5), sky: true },
];

// A FORTALEZA DE JEBUS — o rochedo dos jebuseus, com os amorreus nas alturas
// em volta: a muralha em cima da pedra viva, a porta estreita da subida, a
// torre do canto e o barranco que ninguém escala. A cidade que só cairá séculos
// depois, e para Davi.
const A_FORTALEZA_DE_JEBUS: StagePropSpec[] = [
  P("tower", -95, 1.35, undefined, 0.18),
  P("door", 45, 1.1, undefined, 0.36),
  P("church", 205, 1.1, undefined, 0.26),
  P("rock", -300, 1.3, undefined, 0.48),
  P("rock", 300, 1.15, undefined, 0.54),
  P("bush", 130, 0.85, undefined, 0.58),
  P("grass", -190, 0.65, undefined, 0.76),
];

// OS CARVALHOS DOS HEVEUS — a serra fresca do norte, onde moravam os heveus,
// os arqueus e os sineus: três carvalhos grandes, a fonte cavada ao pé do
// maior, a relva alta do inverno e nenhuma muralha. A terra boa de Canaã antes
// de Israel.
const OS_CARVALHOS_DOS_HEVEUS: StagePropSpec[] = [
  P("tree", -195, 1.25, undefined, 0.18),
  P("tree", -30, 1.15, undefined, 0.22),
  P("tree", 165, 1.05, undefined, 0.2),
  P("well", 262, 1.05, undefined, 0.46),
  P("grass", 40, 0.85, undefined, 0.78),
  P("grass", -120, 0.8, undefined, 0.72),
  P("bush", 315, 0.9, undefined, 0.56),
  { ...P("sun", 90, 1.05, undefined, 0.56), sky: true },
];

// ARVADE E HAMATE — a ilha dos arvadeus na frente e a cidade dos hamateus rio
// acima: o Orontes cortando o quadro em diagonal, o casario da margem, a torre
// da ilha e a barca do estreito. Duas cidades num só horizonte de água.
const ARVADE_E_HAMATE: StagePropSpec[] = [
  { ...P("river", 55, 1.3, undefined, 0.66), tag: "rio-de-hamate" },
  P("tower", -215, 1.3, undefined, 0.2),
  P("church", 178, 1.15, undefined, 0.28),
  P("boat", -80, 1.05, undefined, 0.46),
  P("rock", -320, 1.05, undefined, 0.54),
  P("palm", 320, 0.9, undefined, 0.16),
  P("grass", 265, 0.65, undefined, 0.78),
];

// A PLANÍCIE DE ELÃO E ASSUR — o oriente dos filhos de Sem: o zigurate de
// tijolo cozido no meio do descampado, o canal de irrigação aberto a enxada, a
// torre do posto de fronteira e a tamareira do canal. Império antes de haver
// império.
const A_PLANICIE_DE_ELAO_E_ASSUR: StagePropSpec[] = [
  P("ziggurat", -122, 1.3, undefined, 0.2),
  { ...P("river", 130, 1.15, undefined, 0.64), tag: "canal-da-planicie-de-sem" },
  P("tower", 268, 1.15, undefined, 0.24),
  P("palm", 40, 1.0, undefined, 0.18),
  P("crate", -240, 0.9, undefined, 0.64),
  P("grass", -30, 0.7, undefined, 0.78),
  P("rock", 318, 1.0, undefined, 0.52),
  { ...P("sun", -280, 1.1, undefined, 0.6), sky: true },
];

// A TENDA DE ARFAXADE — a casa de pastor onde nascem Selá e Éber: a tenda de
// pelo de cabra, o muro de pedra solta do redil, o rebanho recolhido e a
// figueira do quintal. Uma família e um ofício, e nada mais no horizonte.
const A_TENDA_DE_ARFAXADE: StagePropSpec[] = [
  P("tent", -142, 1.2, undefined, 0.34),
  P("rock", 78, 1.05, undefined, 0.58),
  P("tree", 235, 1.0, undefined, 0.2),
  P("bush", -262, 0.9, undefined, 0.54),
  P("grass", -20, 0.8, undefined, 0.78),
  P("rock", 315, 1.05, undefined, 0.52),
  { ...P("sun", 175, 1.05, undefined, 0.58), sky: true },
];

// A TERRA REPARTIDA DE PELEGUE — o nome que é um acontecimento: a fenda do
// chão abrindo o quadro ao meio, as duas metades do rio correndo para lados
// opostos, e de cada banda uma tenda armada por gente que já não é a mesma
// gente. O céu carregado do dia em que o mundo deixou de ser um só.
const A_TERRA_REPARTIDA_DE_PELEGUE: StagePropSpec[] = [
  { ...P("riverFork", 0, 1.35, undefined, 0.6), tag: "terra-repartida-nos-dias-de-pelegue" },
  P("tent", -252, 1.15, undefined, 0.34),
  P("tent", 252, 1.1, undefined, 0.36),
  P("rock", -128, 1.2, undefined, 0.5),
  P("rock", 132, 1.15, undefined, 0.52),
  P("bush", -320, 0.85, undefined, 0.56),
  P("grass", 318, 0.7, undefined, 0.78),
  { ...P("clouds", 70, 1.2, undefined, 0.74), sky: true },
];

// OS UADIS DE JOCTÃ — o sul da Arábia dos treze filhos: o leito seco do uádi
// entre paredões, a cisterna cavada na rocha onde a água do inverno fica, o
// espinheiro e a pedra escaldando. Vida onde não devia haver.
const OS_UADIS_DE_JOCTA: StagePropSpec[] = [
  P("well", -95, 1.05, undefined, 0.5),
  P("rock", -258, 1.35, undefined, 0.44),
  P("rock", 92, 1.25, undefined, 0.48),
  P("rock", 285, 1.15, undefined, 0.54),
  P("bush", 12, 0.85, undefined, 0.62),
  P("bush", 195, 0.8, undefined, 0.58),
  P("grass", -170, 0.55, undefined, 0.8),
];

// O PALMAR DE DICLA — o oásis cujo nome quer dizer palmeira: quatro tamareiras
// carregadas em volta do tanque, as talhas de tâmara secando na esteira e a
// muralha de barro da aldeia atrás. O verde mais fechado deste capítulo.
const O_PALMAR_DE_DICLA: StagePropSpec[] = [
  P("palm", -280, 1.2, undefined, 0.16),
  P("palm", -150, 1.15, undefined, 0.2),
  P("palm", 152, 1.1, undefined, 0.18),
  P("palm", 288, 1.05, undefined, 0.22),
  { ...P("pool", 10, 1.2, undefined, 0.6), tag: "tanque-do-palmar-de-dicla" },
  P("amphora", -70, 0.85, undefined, 0.68),
  P("church", 80, 1.0, undefined, 0.28),
  P("grass", 215, 0.75, undefined, 0.76),
];

// A ROTA DO INCENSO — o alto da serra por onde subia a mirra de Sebá: a fila
// de fardos amarrados na beira do caminho, o turíbulo de prova aberto na
// pedra, o jumento de carga descansando e o vale de neblina lá embaixo.
const A_ROTA_DO_INCENSO: StagePropSpec[] = [
  { ...P("censer", -48, 1.05, undefined, 0.6), tag: "incenso-da-rota-de-jocta" },
  P("donkey", 130, 1.1, undefined, 0.54),
  P("crate", -180, 0.95, undefined, 0.64),
  P("crate", -130, 0.9, undefined, 0.7),
  P("rock", -300, 1.25, undefined, 0.46),
  P("rock", 262, 1.2, undefined, 0.5),
  P("bush", 40, 0.85, undefined, 0.66),
  { ...P("clouds", 190, 1.05, undefined, 0.68), sky: true },
];

// O OURO DE OFIR — o ribeiro de onde saía o ouro que séculos depois forraria o
// templo: a bateia de lavagem cheia na beira, o caixote do apuro, a água
// corrente rasa sobre o cascalho e o barranco lavrado a pá. Sol a pino.
const O_OURO_DE_OFIR: StagePropSpec[] = [
  { ...P("river", -70, 1.25, undefined, 0.62), tag: "ribeiro-do-ouro-de-ofir" },
  { ...P("bowl", 108, 1.05, undefined, 0.68), tag: "ouro-de-ofir" },
  P("crate", 205, 0.95, undefined, 0.62),
  P("rock", -300, 1.2, undefined, 0.48),
  P("rock", 272, 1.15, undefined, 0.52),
  P("bush", 20, 0.8, undefined, 0.76),
  P("palm", 322, 0.95, undefined, 0.16),
  { ...P("sun", -180, 1.15, undefined, 0.68), sky: true },
];

// A CASA VELHA DO ORIENTE — a soleira onde a conta recomeça, agora só pela
// linha de Sem: a porta de tijolo cru da casa de família, o candeeiro ainda
// aceso da noite, a talha da água ao lado e, muito atrás, o zigurate da cidade
// grande. Amanhecendo.
const A_CASA_VELHA_DO_ORIENTE: StagePropSpec[] = [
  P("door", -58, 1.15, undefined, 0.38),
  P("ziggurat", 248, 1.1, undefined, 0.18),
  P("lampstand", 30, 0.9, undefined, 0.58),
  P("amphora", 95, 0.85, undefined, 0.66),
  P("crate", -175, 0.9, undefined, 0.62),
  P("palm", -320, 0.95, undefined, 0.16),
  P("grass", 165, 0.65, undefined, 0.78),
];

// A ESTRADA DO OCIDENTE — o caminho de terra batida pelo qual a família vai
// descendo o Eufrates: o marco de pedra da légua, o jumento de carga, a
// figueira brava da curva e a poeira do meio-dia. Ninguém está chegando: estão
// todos passando.
const A_ESTRADA_DO_OCIDENTE: StagePropSpec[] = [
  P("donkey", -120, 1.15, undefined, 0.54),
  P("tree", 140, 1.05, undefined, 0.2),
  P("rock", 15, 1.15, undefined, 0.58),
  P("rock", -290, 1.1, undefined, 0.5),
  P("crate", 218, 0.9, undefined, 0.64),
  P("bush", 300, 0.85, undefined, 0.56),
  P("grass", -200, 0.7, undefined, 0.78),
  { ...P("sun", 65, 1.15, undefined, 0.7), sky: true },
];

// O ARRAIAL DE TERÁ — a última noite antes de Ur ficar para trás: as duas
// tendas armadas de costas para a cidade, a fogueira do arraial, os fardos
// da mudança e a lua já alta sobre o zigurate que ninguém vai olhar de novo.
const O_ARRAIAL_DE_TERA: StagePropSpec[] = [
  P("tent", -195, 1.2, undefined, 0.36),
  P("tent", -55, 1.1, undefined, 0.32),
  { ...P("campfire", 75, 1.1, 0.7, 0.6), tag: "fogueira-do-arraial-de-tera" },
  P("crate", 205, 0.95, undefined, 0.62),
  P("ziggurat", 300, 1.05, undefined, 0.18),
  P("rock", -318, 1.05, undefined, 0.54),
  { ...P("moon", 150, 1.05, undefined, 0.66), sky: true },
  { ...P("starfield", -120, 1.1, undefined, 0.82), sky: true },
];

// OS CARVALHOS DE MANRE — o lugar do nome novo: o altar de pedra bruta que
// Abraão levantou, o carvalhal em roda, a tenda aberta para o sul e o céu
// cheio de estrelas que ele foi mandado contar. É o único cenário deste
// capítulo com glória alta.
const OS_CARVALHOS_DE_MANRE: StagePropSpec[] = [
  { ...P("altar", 30, 1.1, undefined, 0.52), tag: "altar-de-abraao-em-manre" },
  P("tree", -180, 1.25, undefined, 0.18),
  P("tree", 175, 1.15, undefined, 0.2),
  P("tent", -290, 1.1, undefined, 0.34),
  P("bush", 108, 0.85, undefined, 0.6),
  P("grass", -75, 0.75, undefined, 0.78),
  P("rock", 300, 1.05, undefined, 0.54),
  { ...P("starfield", 60, 1.25, undefined, 0.84), sky: true },
];

// O POÇO DE BERSEBA — o poço do juramento, onde a casa de Abraão se divide em
// duas: de um lado a tenda e o rebanho do filho da promessa, do outro o arco
// encostado na pedra do filho que vai morar no deserto.
const O_POCO_DE_BERSEBA: StagePropSpec[] = [
  { ...P("well", -25, 1.15, undefined, 0.5), tag: "poco-do-juramento-de-berseba" },
  P("tent", -230, 1.15, undefined, 0.34),
  P("rock", 175, 1.1, undefined, 0.58),
  P("bow", 90, 1.05, undefined, 0.66),
  P("palm", 305, 1.0, undefined, 0.16),
  P("bush", -318, 0.85, undefined, 0.56),
  P("grass", 45, 0.7, undefined, 0.8),
  { ...P("sun", -130, 1.1, undefined, 0.6), sky: true },
];

// AS TENDAS NEGRAS DE QUEDAR — o acampamento dos filhos de Ismael no fim da
// tarde: as tendas escuras de pelo, o cercado de pedra com o rebanho de
// Nebaiote recolhido, a fogueira baixa e o deserto ficando roxo.
const AS_TENDAS_NEGRAS_DE_QUEDAR: StagePropSpec[] = [
  P("tent", -215, 1.2, undefined, 0.34),
  P("tent", -75, 1.1, undefined, 0.3),
  P("rock", 120, 1.15, undefined, 0.58),
  { ...P("campfire", 20, 1.0, 0.6, 0.62), tag: "fogueira-das-tendas-de-quedar" },
  P("rock", 288, 1.15, undefined, 0.5),
  P("bush", -318, 0.85, undefined, 0.58),
  P("grass", 215, 0.6, undefined, 0.78),
];

// O POÇO DE TEMÁ — o oásis que dava água aos sedentos da estrada: o poço de
// boca larga, o bebedouro de pedra, os jumentos da caravana em roda e as duas
// palmeiras que fazem toda a sombra do lugar. Meio-dia sem uma nuvem.
const O_POCO_DE_TEMA: StagePropSpec[] = [
  { ...P("well", 12, 1.2, undefined, 0.5), tag: "poco-de-tema" },
  P("donkey", -160, 1.1, undefined, 0.56),
  P("donkey", 178, 1.05, undefined, 0.6),
  P("palm", -300, 1.1, undefined, 0.16),
  P("palm", 300, 1.05, undefined, 0.2),
  P("amphora", -70, 0.85, undefined, 0.68),
  P("crate", 90, 0.9, undefined, 0.64),
  { ...P("sun", 110, 1.2, undefined, 0.72), sky: true },
];

// A ORLA DO ORIENTE — o limite do deserto dos doze príncipes, já de noite: o
// cavalo selado da ronda, a fogueira do posto, o penhasco da fronteira e o
// campo de estrelas inteiro por cima. Daqui para lá não há mais Israel nenhum.
const A_ORLA_DO_ORIENTE: StagePropSpec[] = [
  P("horse", -128, 1.15, undefined, 0.52),
  { ...P("campfire", 95, 1.05, 0.65, 0.6), tag: "fogueira-dos-doze-principes" },
  P("rock", 250, 1.3, undefined, 0.46),
  P("rock", -298, 1.15, undefined, 0.52),
  P("spear", 8, 1.05, undefined, 0.66),
  P("bush", 180, 0.8, undefined, 0.68),
  { ...P("starfield", 40, 1.3, undefined, 0.84), sky: true },
  { ...P("moon", -215, 1.0, undefined, 0.64), sky: true },
];

// A TENDA DE QUETURA — a segunda casa de Abraão, a que recebeu presentes e foi
// mandada para o oriente: a tenda de lona clara aberta, o berço de vime, o
// fardo do dote pronto ao lado da porta e a acácia do pátio.
const A_TENDA_DE_QUETURA: StagePropSpec[] = [
  P("tent", -100, 1.25, undefined, 0.36),
  P("tree", 148, 1.05, undefined, 0.2),
  P("crate", 55, 0.95, undefined, 0.64),
  P("crate", 105, 0.9, undefined, 0.7),
  P("amphora", -215, 0.85, undefined, 0.66),
  P("bush", 275, 0.85, undefined, 0.56),
  P("grass", -20, 0.75, undefined, 0.78),
  { ...P("sun", 250, 1.05, undefined, 0.56), sky: true },
];

// O ACAMPAMENTO DE MIDIÃ — a gente que ficou com o oriente: as tendas na borda
// do descampado, o rebanho de Efá pastando solto, a fogueira do jantar e a
// estrada de caravana passando reta pelo fundo do quadro.
const O_ACAMPAMENTO_DE_MIDIA: StagePropSpec[] = [
  P("tent", -240, 1.15, undefined, 0.34),
  { ...P("campfire", -60, 1.05, 0.6, 0.6), tag: "fogueira-do-acampamento-de-midia" },
  P("rock", 190, 1.1, undefined, 0.56),
  P("rock", 300, 1.1, undefined, 0.54),
  P("bush", 60, 0.85, undefined, 0.62),
  P("grass", -155, 0.7, undefined, 0.78),
  P("palm", -320, 0.9, undefined, 0.16),
];

// O POÇO DE ISAQUE — o quintal onde os dois netos crescem: o poço reaberto do
// pai, a cerca de espinho do gado, a tenda do herdeiro e a moita do caçador.
// Uma casa só, e dois mundos dentro dela.
const O_POCO_DE_ISAQUE: StagePropSpec[] = [
  { ...P("well", 60, 1.15, undefined, 0.5), tag: "poco-reaberto-de-isaque" },
  P("tent", -215, 1.2, undefined, 0.34),
  P("bush", -60, 0.95, undefined, 0.58),
  P("bow", 175, 1.0, undefined, 0.64),
  P("tree", 262, 1.05, undefined, 0.2),
  P("bush", 120, 0.9, undefined, 0.6),
  P("grass", -130, 0.75, undefined, 0.78),
  { ...P("sun", 300, 1.05, undefined, 0.58), sky: true },
];

// AS SERRAS VERMELHAS DE EDOM — a herança de Esaú: paredões de arenito
// rachados de sol, o caminho estreito por dentro da garganta, o espinheiro
// agarrado à parede e nem um fio de água à vista.
const AS_SERRAS_VERMELHAS_DE_EDOM: StagePropSpec[] = [
  P("rock", -235, 1.4, undefined, 0.42),
  P("rock", 118, 1.35, undefined, 0.46),
  P("rock", 300, 1.2, undefined, 0.52),
  P("tower", -60, 1.15, undefined, 0.2),
  P("bush", 25, 0.85, undefined, 0.64),
  P("bush", -318, 0.8, undefined, 0.58),
  P("grass", 200, 0.55, undefined, 0.8),
];

// O CAMPO QUEIMADO DE AMALEQUE — o rastro do neto de Esaú que atacou os
// cansados na retaguarda: a seara ardendo baixo, a espada largada, a carroça
// de saque virada e o céu de fumaça. O único cenário de crime deste capítulo.
const O_CAMPO_QUEIMADO_DE_AMALEQUE: StagePropSpec[] = [
  { ...P("campfire", 118, 1.3, 1, 0.56), tag: "seara-queimada-por-amaleque" },
  { ...P("campfire", 232, 1.15, 0.9, 0.5), tag: "seara-queimada-por-amaleque" },
  P("sword", -35, 1.1, undefined, 0.64),
  P("crate", 30, 0.95, undefined, 0.7),
  P("rock", -282, 1.2, undefined, 0.48),
  P("sheaf", -145, 0.85, undefined, 0.66),
  { ...P("clouds", -60, 1.25, undefined, 0.76), sky: true },
];

// AS PASTAGENS DE REUEL — a outra metade de Edom, a que criava gado: o alto do
// planalto verde de inverno, o muro de pedra do redil, o rebanho espalhado e a
// árvore solitária que serve de marco a quilômetros.
const AS_PASTAGENS_DE_REUEL: StagePropSpec[] = [
  P("rock", -128, 1.15, undefined, 0.56),
  P("tree", 130, 1.1, undefined, 0.2),
  P("well", 258, 1.0, undefined, 0.46),
  P("rock", -300, 1.1, undefined, 0.52),
  P("grass", -20, 0.85, undefined, 0.78),
  P("grass", 300, 0.75, undefined, 0.72),
  P("bush", 45, 0.85, undefined, 0.6),
  { ...P("sun", 200, 1.05, undefined, 0.58), sky: true },
];

// AS CAVERNAS DE SEIR — a casa dos horeus, que quer dizer justamente os que
// moram em buracos: a boca de caverna aberta na rocha, a fogueira acesa dentro
// dela, os degraus lavrados na pedra e o monte inteiro fechando o céu.
const AS_CAVERNAS_DE_SEIR: StagePropSpec[] = [
  P("door", -105, 1.2, undefined, 0.4),
  { ...P("campfire", 55, 1.0, 0.75, 0.6), tag: "fogueira-das-cavernas-de-seir" },
  P("rock", -262, 1.4, undefined, 0.44),
  P("rock", 178, 1.35, undefined, 0.48),
  P("rock", 315, 1.15, undefined, 0.56),
  P("crate", -30, 0.9, undefined, 0.7),
  P("bush", 260, 0.8, undefined, 0.62),
];

// A FONTE DE TIMNA — o filete de água entre as lajes do monte, onde a irmã de
// Lotã vem encher: a poça funda de pedra, a talha apoiada na borda, a figueira
// que nasceu na fenda e a sombra fria do meio da manhã.
const A_FONTE_DE_TIMNA: StagePropSpec[] = [
  { ...P("pool", -20, 1.15, undefined, 0.58), tag: "fonte-de-timna-no-monte-seir" },
  P("amphora", 68, 0.9, undefined, 0.66),
  P("tree", 175, 1.0, undefined, 0.22),
  P("rock", -232, 1.35, undefined, 0.44),
  P("rock", 268, 1.2, undefined, 0.5),
  P("bush", -120, 0.85, undefined, 0.62),
  P("grass", 118, 0.65, undefined, 0.78),
  { ...P("sun", -300, 1.05, undefined, 0.56), sky: true },
];

// A PASTAGEM DOS JUMENTOS — o descampado alto onde os filhos de Zibeão
// apascentavam as jumentas do pai: dois animais soltos no capim ralo, o
// bebedouro cavado no chão, a pedra do descanso e o horizonte vazio.
const A_PASTAGEM_DOS_JUMENTOS: StagePropSpec[] = [
  P("donkey", -140, 1.15, undefined, 0.52),
  P("donkey", 105, 1.1, undefined, 0.58),
  { ...P("pool", 258, 1.05, undefined, 0.62), tag: "bebedouro-das-jumentas-de-zibeao" },
  P("rock", -290, 1.15, undefined, 0.48),
  P("bush", 15, 0.85, undefined, 0.66),
  P("grass", 190, 0.75, undefined, 0.78),
  P("grass", -40, 0.7, undefined, 0.72),
  { ...P("clouds", 60, 1.0, undefined, 0.7), sky: true },
];

// A PEDREIRA DE DISOM — o corte de pedra dos horeus, o ofício que a montanha
// impõe a quem mora nela: o bloco meio serrado na bancada, as cunhas e o
// caixote das ferramentas, a parede de rocha esquadrejada e o pó branco em
// tudo.
const A_PEDREIRA_DE_DISOM: StagePropSpec[] = [
  P("rock", -60, 1.45, undefined, 0.5),
  P("rock", -250, 1.3, undefined, 0.44),
  P("rock", 205, 1.25, undefined, 0.54),
  P("crate", 45, 0.95, undefined, 0.66),
  P("crate", 100, 0.9, undefined, 0.72),
  P("column", 300, 1.1, undefined, 0.3),
  P("bush", 145, 0.8, undefined, 0.6),
  { ...P("sun", -160, 1.1, undefined, 0.64), sky: true },
];

// O ARRAIAL NOTURNO DE ESER E DISÃ — o fim da linha dos horeus, acampada na
// borda do deserto de Uz: a fogueira única, a tenda baixa, o penhasco de
// guarda e o céu inteiro de estrelas sobre um povo que vai desaparecer da
// história.
const O_ARRAIAL_NOTURNO_DOS_HOREUS: StagePropSpec[] = [
  { ...P("campfire", -40, 1.1, 0.7, 0.6), tag: "fogueira-do-arraial-dos-horeus" },
  P("tent", -215, 1.15, undefined, 0.36),
  P("rock", 152, 1.3, undefined, 0.48),
  P("rock", 300, 1.15, undefined, 0.54),
  P("bush", 60, 0.8, undefined, 0.68),
  { ...P("starfield", 90, 1.3, undefined, 0.85), sky: true },
  { ...P("moon", -140, 1.0, undefined, 0.62), sky: true },
];

// DINABÁ, A PRIMEIRA CIDADE REAL DE EDOM — a corte de Bela, filho de Beor: o
// trono posto na praça diante da porta, a coroa em cima do coxim, a muralha
// nova e a torre do canto. Edom tem rei enquanto Israel ainda é família.
const DINABA_A_PRIMEIRA_CIDADE_REAL: StagePropSpec[] = [
  P("throne", -30, 1.2, undefined, 0.42),
  P("crown", 62, 0.95, undefined, 0.6),
  P("door", -180, 1.15, undefined, 0.36),
  P("tower", -300, 1.25, undefined, 0.2),
  P("church", 145, 1.15, undefined, 0.26),
  P("column", 275, 1.1, undefined, 0.32),
  P("grass", 40, 0.6, undefined, 0.8),
  { ...P("sun", 215, 1.05, undefined, 0.58), sky: true },
];

// BOZRA DOS APRISCOS — a cidade de Jobabe, cujo nome quer dizer curral: os
// muros de pedra dos currais escalonados na encosta, os fardos de lã, as tinas
// de tinta à porta e a muralha por cima de tudo.
const BOZRA_DOS_APRISCOS: StagePropSpec[] = [
  P("rock", -145, 1.2, undefined, 0.56),
  P("crate", 40, 0.95, undefined, 0.68),
  P("church", 195, 1.15, undefined, 0.26),
  P("tower", 312, 1.2, undefined, 0.2),
  P("amphora", -35, 0.9, undefined, 0.7),
  P("amphora", -252, 0.85, undefined, 0.66),
  P("rock", -318, 1.05, undefined, 0.54),
  P("grass", 118, 0.7, undefined, 0.76),
];

// A TERRA DOS TEMANITAS — o país de Husão, famoso pelos seus sábios: o banco
// de pedra à sombra da porta da cidade, o rolo aberto no colo de quem julga, a
// oliveira do adro e a rua subindo por trás. Aqui se resolve por palavra.
const A_TERRA_DOS_TEMANITAS: StagePropSpec[] = [
  P("door", -125, 1.2, undefined, 0.38),
  { ...P("scroll", 45, 1.0, undefined, 0.62), tag: "sabedoria-dos-temanitas" },
  P("tree", 175, 1.1, undefined, 0.2),
  P("church", -285, 1.1, undefined, 0.28),
  P("column", 288, 1.1, undefined, 0.32),
  P("rock", 118, 1.0, undefined, 0.72),
  P("grass", -35, 0.65, undefined, 0.8),
  { ...P("sun", -200, 1.05, undefined, 0.6), sky: true },
];

// O CAMPO DE MOABE — o único combate deste capítulo: o descampado a leste do
// mar Salgado onde Hadade feriu os midianitas. As armas caídas no chão pisado,
// a tempestade fechando por cima e, muito ao fundo, a torre de Avite, a cidade
// para onde o vencedor voltou.
const O_CAMPO_DE_MOABE: StagePropSpec[] = [
  P("sword", -95, 1.15, undefined, 0.62),
  P("spear", -30, 1.15, undefined, 0.68),
  P("spear", 165, 1.1, undefined, 0.58),
  P("tower", 280, 1.2, undefined, 0.2),
  P("rock", -290, 1.15, undefined, 0.5),
  P("bush", 75, 0.8, undefined, 0.72),
  P("grass", 230, 0.6, undefined, 0.78),
  { ...P("clouds", 40, 1.3, undefined, 0.76), sky: true },
];

// AS VINHAS DE MASRECA — o nome da cidade de Samlá quer dizer vinhedo: os
// bacelos armados em terraço na encosta, os cachos maduros, o tanque de pedra
// da rega e o muro solto que segura a terra. A vindima de Edom.
const AS_VINHAS_DE_MASRECA: StagePropSpec[] = [
  P("grapes", -150, 1.15, undefined, 0.6),
  P("grapes", 30, 1.1, undefined, 0.66),
  P("grapes", 190, 1.05, undefined, 0.56),
  P("amphora", -55, 0.9, undefined, 0.72),
  { ...P("pool", 262, 1.1, undefined, 0.64), tag: "tanque-das-vinhas-de-masreca" },
  P("rock", -300, 1.1, undefined, 0.5),
  P("tree", 108, 1.0, undefined, 0.2),
  { ...P("sun", -230, 1.05, undefined, 0.56), sky: true },
];

// REOBOTE JUNTO AO RIO — a cidade de Saul de Edom, a única da lista cuja
// referência é uma água: o rio largo passando rente às casas, o embarcadouro,
// o poço da praça e os tamareiros das duas margens. Riqueza de ribeirinho.
const REOBOTE_JUNTO_AO_RIO: StagePropSpec[] = [
  { ...P("river", -20, 1.35, undefined, 0.66), tag: "rio-de-reobote" },
  P("boat", 148, 1.1, undefined, 0.48),
  P("well", -175, 1.05, undefined, 0.46),
  P("church", 60, 1.15, undefined, 0.26),
  P("palm", -318, 1.05, undefined, 0.16),
  P("palm", 318, 1.0, undefined, 0.2),
  P("grass", 245, 0.75, undefined, 0.78),
];

// A CASA DE ACBOR — o reinado sem feito nenhum de Baal-Hanã: o pátio interno
// da casa real, o trono debaixo do alpendre, as duas colunas do vão, o
// candeeiro aceso de tarde e a porta fechada. Um reino que só passa.
const A_CASA_DE_ACBOR: StagePropSpec[] = [
  P("throne", 25, 1.15, undefined, 0.44),
  P("column", -110, 1.25, undefined, 0.3),
  P("column", 168, 1.25, undefined, 0.3),
  P("door", -262, 1.1, undefined, 0.38),
  P("lampstand", -35, 0.9, undefined, 0.62),
  P("amphora", 258, 0.85, undefined, 0.66),
  P("crate", 305, 0.9, undefined, 0.6),
];

// PAÍ E A RAINHA MEETABEL — a última corte de Edom, e a única em que o Cronista
// guarda o nome de uma mulher e o da sua mãe e o da sua avó: o trono com dois
// assentos, a coroa, o candelabro aceso, o portal de pedra lavrada e a cidade
// dourada de fim de tarde.
const PAI_E_A_RAINHA_MEETABEL: StagePropSpec[] = [
  P("throne", -55, 1.2, undefined, 0.42),
  P("crown", 40, 0.95, undefined, 0.6),
  P("menorah", 118, 1.0, undefined, 0.56),
  P("door", -230, 1.15, undefined, 0.38),
  P("column", 205, 1.2, undefined, 0.3),
  P("church", 300, 1.1, undefined, 0.26),
  P("grass", -140, 0.6, undefined, 0.8),
  { ...P("sun", 90, 1.15, undefined, 0.62), sky: true },
];

// O TRONO VAZIO DE EDOM — morto Hadade, acabaram os reis: o assento
// abandonado no meio do salão, a coroa caída ao pé dele, a coluna partida, a
// porta batendo e a luz do fim do dia entrando de lado. Daqui em diante só
// príncipes.
const O_TRONO_VAZIO_DE_EDOM: StagePropSpec[] = [
  P("throne", 0, 1.15, undefined, 0.44),
  P("crown", 68, 0.9, undefined, 0.68),
  P("column", -175, 1.2, undefined, 0.3),
  P("column", 195, 1.15, undefined, 0.32),
  P("door", -300, 1.1, undefined, 0.38),
  P("rock", 288, 1.0, undefined, 0.6),
  P("crate", 118, 0.85, undefined, 0.72),
];

// AS MINAS DE PINOM — o cobre de Edom, o ofício que sustentava os príncipes:
// as fornalhas acesas no fundo do vale, o minério empilhado em caixotes, a
// escória e o paredão furado de galerias. Fumaça de dia inteiro.
const AS_MINAS_DE_PINOM: StagePropSpec[] = [
  { ...P("campfire", -128, 1.25, 0.95, 0.54), tag: "fornalhas-de-cobre-de-pinom" },
  { ...P("campfire", 22, 1.1, 0.85, 0.62), tag: "fornalhas-de-cobre-de-pinom" },
  P("crate", 118, 0.95, undefined, 0.66),
  P("crate", 168, 0.9, undefined, 0.72),
  P("rock", -282, 1.35, undefined, 0.44),
  P("rock", 262, 1.25, undefined, 0.5),
  P("bowl", 75, 0.85, undefined, 0.74),
  { ...P("clouds", 200, 1.15, undefined, 0.74), sky: true },
];

// A FORTALEZA DE MIBZAR — o nome do príncipe quer dizer praça-forte: a torre
// de guarda na crista, a porta reforçada, as lanças encostadas no muro e o
// caminho de ronda subindo por fora. Edom já não tem rei, tem guarnição.
const A_FORTALEZA_DE_MIBZAR: StagePropSpec[] = [
  P("tower", -85, 1.4, undefined, 0.18),
  P("door", 78, 1.15, undefined, 0.36),
  P("spear", 8, 1.1, undefined, 0.62),
  P("spear", 165, 1.05, undefined, 0.66),
  P("column", 250, 1.1, undefined, 0.32),
  P("rock", -290, 1.25, undefined, 0.48),
  P("rock", 315, 1.1, undefined, 0.56),
  P("grass", -180, 0.6, undefined, 0.8),
];

// EDOM AO CAIR DA NOITE — o último quadro do capítulo: as cristas de Seir
// enfileiradas até o horizonte, uma torre em cada cabeço, a estrada vazia por
// baixo e a lua nascendo. Onze príncipes, e nem um deles vira história.
const EDOM_AO_CAIR_DA_NOITE: StagePropSpec[] = [
  P("tower", -235, 1.2, undefined, 0.2),
  P("tower", 15, 1.1, undefined, 0.24),
  P("tower", 245, 1.0, undefined, 0.28),
  P("rock", -318, 1.3, undefined, 0.46),
  P("rock", 128, 1.2, undefined, 0.52),
  P("bush", -110, 0.8, undefined, 0.64),
  P("grass", 305, 0.6, undefined, 0.8),
  { ...P("moon", 90, 1.1, undefined, 0.66), sky: true },
  { ...P("starfield", -160, 1.15, undefined, 0.84), sky: true },
];

// ========================================================== SETS 1Cr 2

// O ARRAIAL DAS DOZE TRIBOS — o acampamento de Israel visto de dentro: as
// tendas das famílias em fileira, os fardos da provisão comum, a trombeta do
// ajuntamento pousada na pedra e o poço do arraial. Um povo que ainda cabe num
// campo.
const O_ARRAIAL_DAS_DOZE_TRIBOS: StagePropSpec[] = [
  P("tent", -262, 1.2, undefined, 0.32),
  P("tent", -128, 1.15, undefined, 0.36),
  P("tent", 92, 1.1, undefined, 0.3),
  P("crate", 218, 0.95, undefined, 0.58),
  { ...P("trumpet", -20, 0.95, undefined, 0.66), tag: "trombeta-do-ajuntamento-de-israel" },
  P("well", 315, 1.0, undefined, 0.46),
  P("grass", 30, 0.8, undefined, 0.78),
  { ...P("sun", 160, 1.05, undefined, 0.6), sky: true },
];

// A NOITE DE QUEZIBE — a casa de Judá na terra dos cananeus, onde o
// primogênito é achado mau e morre. A porta escura, o candeeiro quase
// apagando, a esteira estendida no chão e mais nada: o juízo desta cena não
// tem palavra nem testemunha.
const A_NOITE_DE_QUEZIBE: StagePropSpec[] = [
  P("door", -168, 1.15, undefined, 0.38),
  P("lampstand", 108, 0.85, undefined, 0.58),
  P("amphora", 218, 0.8, undefined, 0.66),
  P("crate", -262, 0.85, undefined, 0.62),
  P("column", 300, 1.15, undefined, 0.3),
  P("rock", -262, 0.9, undefined, 0.74),
  { ...P("moon", -60, 0.85, undefined, 0.6), sky: true },
];

// A PORTA DE ENAIM AO AMANHECER — o cruzamento da estrada de Timnate, onde
// Tamar se assentou e de onde saiu com o penhor do sogro: o marco do caminho,
// a acácia da encruzilhada, o rebanho da tosquia passando ao longe e a
// primeira luz batendo de raspão no chão.
const A_PORTA_DE_ENAIM_AO_AMANHECER: StagePropSpec[] = [
  P("tree", -105, 1.15, undefined, 0.2),
  P("rock", 45, 1.1, undefined, 0.6),
  P("bush", 232, 0.95, undefined, 0.58),
  P("well", -285, 1.0, undefined, 0.46),
  P("bush", 132, 0.85, undefined, 0.62),
  P("grass", -30, 0.75, undefined, 0.78),
  P("palm", 320, 0.95, undefined, 0.16),
  { ...P("sun", 300, 1.15, undefined, 0.44), sky: true },
];

// A EIRA DA CASA DE PEREZ — o terreiro batido onde a família nova malha o
// trigo: os feixes empilhados, a talha do grão, os caixotes da eira e a
// oliveira que dá sombra ao meio-dia. A linha que continuará até Davi começa
// numa eira.
const A_EIRA_DA_CASA_DE_PEREZ: StagePropSpec[] = [
  P("sheaf", -85, 1.05, undefined, 0.62),
  P("sheaf", -25, 1.0, undefined, 0.7),
  P("amphora", 60, 0.9, undefined, 0.66),
  P("crate", 200, 0.95, undefined, 0.56),
  P("tree", -230, 1.1, undefined, 0.2),
  P("crate", 130, 0.9, undefined, 0.72),
  P("grass", 300, 0.7, undefined, 0.78),
  { ...P("sun", 95, 1.1, undefined, 0.68), sky: true },
];

// A CASA DOS SÁBIOS DE ZERÁ — Etã, Hemã, Calcol e Dara, os quatro nomes com
// que se mediria depois a sabedoria de Salomão: a sala de estudo à noite, o
// rolo aberto na mesa baixa, a harpa encostada na parede, o candelabro de sete
// braços aceso e as talhas de tinta no canto.
const A_CASA_DOS_SABIOS_DE_ZERA: StagePropSpec[] = [
  { ...P("scroll", -40, 1.05, undefined, 0.6), tag: "rolos-dos-sabios-de-zera" },
  P("harp", 78, 1.05, undefined, 0.64),
  P("menorah", -160, 1.0, undefined, 0.54),
  P("column", -290, 1.2, undefined, 0.3),
  P("column", 235, 1.2, undefined, 0.3),
  P("crate", 155, 0.85, undefined, 0.7),
  P("amphora", 300, 0.8, undefined, 0.66),
  P("lampstand", 25, 0.85, undefined, 0.72),
];

// O VALE DE ACOR — o lugar do anátema: o montão de pedras levantado sobre o
// que se escondeu debaixo da tenda, o resto da fogueira em que tudo foi
// queimado, o barranco fechando os dois lados e a tempestade parada por cima.
// Nem uma folha verde neste quadro.
const O_VALE_DE_ACOR: StagePropSpec[] = [
  { ...P("rock", 35, 1.5, undefined, 0.54), tag: "montao-de-pedras-do-vale-de-acor" },
  { ...P("campfire", 178, 1.1, 0.8, 0.6), tag: "fogueira-do-anatema-de-acar" },
  P("rock", -250, 1.35, undefined, 0.46),
  P("rock", 292, 1.2, undefined, 0.5),
  P("crate", -100, 0.9, undefined, 0.72),
  P("bush", 118, 0.7, undefined, 0.78),
  { ...P("clouds", -40, 1.3, undefined, 0.78), sky: true },
];

// O PÁTIO DO ESCRIBA DE AZARIAS — a manhã seguinte da casa de Etã: a banca
// baixa junto à janela, o rolo novo, o tinteiro, a talha de água e a
// romãzeira do pátio. O ofício do pai passou inteiro para o filho.
const O_PATIO_DO_ESCRIBA_DE_AZARIAS: StagePropSpec[] = [
  { ...P("scroll", 62, 1.05, undefined, 0.64), tag: "rolo-novo-de-azarias" },
  P("tree", -145, 1.1, undefined, 0.2),
  P("door", 208, 1.1, undefined, 0.38),
  P("column", -300, 1.2, undefined, 0.32),
  P("amphora", -35, 0.85, undefined, 0.7),
  P("crate", 300, 0.85, undefined, 0.64),
  P("grass", 130, 0.7, undefined, 0.78),
  { ...P("sun", -215, 1.1, undefined, 0.52), sky: true },
];

// O NEGUEBE DE JERAMEEL — o sul seco onde ficou o primogênito de Hezrom: a
// cisterna de inverno tapada com pedra, o muro de pedra do redil, o rebanho
// magro e o descampado amarelo até onde a vista alcança.
const O_NEGUEBE_DE_JERAMEEL: StagePropSpec[] = [
  P("well", -122, 1.1, undefined, 0.48),
  P("rock", 105, 1.15, undefined, 0.58),
  P("rock", -290, 1.15, undefined, 0.5),
  P("rock", 268, 1.1, undefined, 0.56),
  P("bush", 15, 0.85, undefined, 0.66),
  P("bush", 195, 0.8, undefined, 0.6),
  P("grass", -35, 0.6, undefined, 0.8),
  { ...P("sun", 60, 1.1, undefined, 0.64), sky: true },
];

// O ESTANDARTE DE JUDÁ NO DESERTO — Naassom, príncipe dos filhos de Judá, é o
// que marchava à frente de todo o arraial: a trombeta da partida, a lança do
// porta-estandarte, a tenda da tribo já desarmada e a coluna de poeira da
// caminhada no fim do quadro.
const O_ESTANDARTE_DE_JUDA_NO_DESERTO: StagePropSpec[] = [
  { ...P("trumpet", -60, 1.05, undefined, 0.62), tag: "trombeta-da-partida-de-juda" },
  P("spear", 25, 1.15, undefined, 0.58),
  P("tent", -240, 1.1, undefined, 0.34),
  P("crate", 190, 0.95, undefined, 0.58),
  P("rock", 300, 1.1, undefined, 0.5),
  P("bush", 110, 0.8, undefined, 0.66),
  P("grass", -140, 0.6, undefined, 0.8),
  { ...P("sun", 90, 1.15, undefined, 0.66), sky: true },
];

// A SEARA DE BOAZ EM BELÉM — o campo de cevada na tarde da colheita: os feixes
// atados de pé em fileira, a talha da água dos moços, a eira ao fundo e a
// oliveira do lindeiro. É este campo que faz de Boaz um nome nesta lista.
const A_SEARA_DE_BOAZ_EM_BELEM: StagePropSpec[] = [
  P("sheaf", -180, 1.1, undefined, 0.58),
  P("sheaf", -105, 1.05, undefined, 0.66),
  P("sheaf", 20, 1.0, undefined, 0.72),
  P("amphora", 95, 0.85, undefined, 0.68),
  P("tree", 200, 1.1, undefined, 0.2),
  P("well", 300, 1.0, undefined, 0.46),
  P("grass", -292, 0.75, undefined, 0.78),
  { ...P("sun", 130, 1.05, undefined, 0.5), sky: true },
];

// A CASA DE JESSÉ EM BELÉM — o quintal da casa que dará um rei: o forno de
// barro aceso para a ceia, a porta baixa, o muro de pedra do redil, a talha da
// água e a videira por cima do alpendre. Cai a tarde.
const A_CASA_DE_JESSE_EM_BELEM: StagePropSpec[] = [
  { ...P("campfire", -95, 1.05, 0.7, 0.6), tag: "forno-da-casa-de-jesse" },
  P("door", 60, 1.15, undefined, 0.38),
  P("rock", 218, 1.1, undefined, 0.58),
  P("grapes", 150, 0.95, undefined, 0.58),
  P("amphora", -20, 0.85, undefined, 0.7),
  P("church", -252, 1.1, undefined, 0.28),
  P("grass", 300, 0.7, undefined, 0.78),
];

// A PORTA DE BELÉM AO MEIO-DIA — a rua estreita onde os filhos de Jessé param
// a conversar: o arco da porta, o banco de pedra, o poço da praça, a parreira
// no muro e o sol batendo direto na calçada. Nada de campo: aqui é vila.
const A_PORTA_DE_BELEM_AO_MEIO_DIA: StagePropSpec[] = [
  P("door", -35, 1.2, undefined, 0.4),
  P("well", 178, 1.05, undefined, 0.48),
  P("church", -230, 1.15, undefined, 0.28),
  P("column", 285, 1.15, undefined, 0.32),
  P("grapes", 75, 0.9, undefined, 0.62),
  P("crate", -120, 0.85, undefined, 0.7),
  P("grass", 300, 0.6, undefined, 0.8),
  { ...P("sun", 118, 1.2, undefined, 0.74), sky: true },
];

// O PASTO DO SÉTIMO FILHO — o descampado atrás de Belém onde o caçula fica com
// as ovelhas enquanto os outros seis estão em casa: o rebanho espalhado, a
// harpa pousada na pedra, o cajado, as pedras do redil e a primeira estrela.
// O quadro mais quieto do capítulo, e o mais importante.
const O_PASTO_DO_SETIMO_FILHO: StagePropSpec[] = [
  { ...P("harp", 55, 1.1, undefined, 0.66), tag: "harpa-do-pastor-de-belem" },
  P("rock", 205, 1.15, undefined, 0.56),
  P("rock", -60, 1.2, undefined, 0.58),
  P("tree", -215, 1.1, undefined, 0.2),
  P("bush", 128, 0.85, undefined, 0.6),
  P("grass", -300, 0.8, undefined, 0.78),
  { ...P("sun", 285, 1.05, undefined, 0.46), sky: true },
];

// O TERREIRO DAS DUAS IRMÃS — a casa das filhas de Jessé, de onde sairão três
// capitães: o pátio de pedra, a espada e a lança já encostadas na parede sem
// que ninguém tenha decidido nada, o tear, o forno e a porta aberta para a
// rua.
const O_TERREIRO_DAS_DUAS_IRMAS: StagePropSpec[] = [
  P("sword", -138, 1.05, undefined, 0.64),
  P("spear", -85, 1.1, undefined, 0.6),
  P("door", 82, 1.15, undefined, 0.38),
  { ...P("campfire", 208, 1.0, 0.6, 0.62), tag: "forno-do-terreiro-de-zeruia" },
  P("crate", -10, 0.9, undefined, 0.72),
  P("column", 300, 1.15, undefined, 0.32),
  P("amphora", 140, 0.8, undefined, 0.68),
  P("grass", -285, 0.65, undefined, 0.8),
];

// AS TENDAS DE JETER, O ISMAELITA — o casamento que atravessa a fronteira: a
// tenda escura de pelo de cabra armada na borda do Neguebe, o camelo de dote
// substituído pelo jumento de carga, a fogueira do noivado e o deserto
// avermelhando atrás.
const AS_TENDAS_DE_JETER_O_ISMAELITA: StagePropSpec[] = [
  P("tent", -160, 1.25, undefined, 0.34),
  P("donkey", 88, 1.1, undefined, 0.54),
  { ...P("campfire", -30, 1.05, 0.65, 0.62), tag: "fogueira-das-bodas-de-jeter" },
  P("crate", 205, 0.9, undefined, 0.66),
  P("rock", 300, 1.1, undefined, 0.52),
  P("bush", -300, 0.85, undefined, 0.58),
  P("grass", 128, 0.6, undefined, 0.8),
];

// A CASA DE CALEBE COM AZUBA — o pátio cheio de uma família em pé: a porta
// aberta de par em par, o tear armado à sombra, os potes de provisão, a
// figueira do quintal e a manhã inteira pela frente. Ainda não morreu ninguém.
const A_CASA_DE_CALEBE_COM_AZUBA: StagePropSpec[] = [
  P("door", -155, 1.2, undefined, 0.38),
  P("tree", 118, 1.1, undefined, 0.2),
  P("amphora", -45, 0.9, undefined, 0.68),
  P("amphora", 0, 0.85, undefined, 0.72),
  P("crate", 205, 0.9, undefined, 0.64),
  P("well", 292, 1.0, undefined, 0.48),
  P("grass", 60, 0.75, undefined, 0.78),
  { ...P("sun", -262, 1.1, undefined, 0.56), sky: true },
];

// A SEPULTURA DE AZUBA E A VINDA DE EFRATE — o mesmo terreno visto do outro
// lado, no fim da tarde: o montão de pedras da cova recém-fechada de um lado
// do quadro, e do outro a tenda nova armada e o berço. Um luto e um começo no
// mesmo enquadramento.
const A_SEPULTURA_DE_AZUBA: StagePropSpec[] = [
  { ...P("rock", -175, 1.35, undefined, 0.56), tag: "sepultura-de-azuba" },
  P("tent", 128, 1.2, undefined, 0.34),
  P("tree", -60, 1.05, undefined, 0.22),
  P("crate", 35, 0.9, undefined, 0.72),
  P("bush", 262, 0.85, undefined, 0.6),
  P("rock", 315, 1.05, undefined, 0.5),
  P("grass", -300, 0.65, undefined, 0.8),
  { ...P("clouds", 200, 1.0, undefined, 0.7), sky: true },
];

// A OFICINA DE BEZALEEL — o neto de Hur, o primeiro artífice que a Escritura
// diz cheio do Espírito de Deus: a forja acesa, o candelabro de sete braços
// meio lavrado na bancada, as bacias de ouro batido, o turíbulo e o caixote das
// ferramentas. Aqui se está fazendo o mobiliário do tabernáculo.
const A_OFICINA_DE_BEZALEEL: StagePropSpec[] = [
  { ...P("menorah", 45, 1.2, undefined, 0.56), tag: "candelabro-lavrado-por-bezaleel" },
  { ...P("campfire", -145, 1.15, 0.9, 0.58), tag: "forja-de-bezaleel" },
  P("bowl", -50, 0.9, undefined, 0.7),
  P("censer", 148, 1.0, undefined, 0.64),
  P("crate", 235, 0.9, undefined, 0.7),
  P("column", -300, 1.2, undefined, 0.3),
  P("column", 300, 1.2, undefined, 0.3),
  P("amphora", 100, 0.8, undefined, 0.74),
];

// OS CARVALHAIS DE GILEADE — a terra que Hezrom ganhou casando aos sessenta
// anos com a filha de Maquir: o carvalhal fechado do outro lado do Jordão, o
// gado gordo no pasto alto, o muro de pedra do redil e o riacho da encosta. A
// melhor pastagem de Israel.
const OS_CARVALHAIS_DE_GILEADE: StagePropSpec[] = [
  P("tree", -205, 1.3, undefined, 0.18),
  P("tree", -50, 1.2, undefined, 0.22),
  P("rock", 128, 1.15, undefined, 0.58),
  { ...P("river", 268, 1.1, undefined, 0.62), tag: "riacho-de-gileade" },
  P("grass", 30, 0.85, undefined, 0.78),
  P("grass", -300, 0.8, undefined, 0.72),
  P("bush", 200, 0.85, undefined, 0.58),
  { ...P("sun", 90, 1.05, undefined, 0.58), sky: true },
];

// AS CIDADES DE JAIR — as vinte e três aldeias do neto de Hezrom espalhadas
// pelos cabeços de Gileade: três povoados visíveis de uma só vez, cada um no
// seu morro, com a estrada de terra ligando um ao outro e o vale verde entre
// eles. Uma herança que se conta a cavalo.
const AS_CIDADES_DE_JAIR: StagePropSpec[] = [
  P("church", -238, 1.15, undefined, 0.24),
  P("church", 15, 1.1, undefined, 0.28),
  P("church", 258, 1.05, undefined, 0.22),
  P("tower", -105, 1.15, undefined, 0.2),
  P("horse", 138, 1.05, undefined, 0.56),
  P("tree", -320, 1.05, undefined, 0.2),
  P("grass", 60, 0.8, undefined, 0.78),
  { ...P("sun", 200, 1.05, undefined, 0.6), sky: true },
];

// AS ALDEIAS TOMADAS POR GESUR E ARÃ — as mesmas cidades de Jair depois do
// assalto: a porta arrombada, a lança fincada no chão da praça, o carro de
// guerra parado onde não devia estar e a fumaça baixa sobre os telhados.
// Sessenta cidades trocaram de dono numa linha de genealogia.
const AS_ALDEIAS_TOMADAS_POR_GESUR: StagePropSpec[] = [
  P("door", -95, 1.15, undefined, 0.4),
  P("chariot", 118, 1.2, undefined, 0.52),
  P("spear", 20, 1.1, undefined, 0.66),
  { ...P("campfire", 258, 1.1, 0.85, 0.56), tag: "aldeias-de-jair-tomadas-por-gesur" },
  P("church", -252, 1.1, undefined, 0.26),
  P("rock", 305, 1.05, undefined, 0.62),
  P("sword", -35, 1.0, undefined, 0.72),
  { ...P("clouds", 60, 1.2, undefined, 0.76), sky: true },
];

// OS ALTOS DE TECOA — a terra de Asur, o filho que nasceu depois da morte do
// pai: o planalto de pedra a sudeste de Belém, o sicômoro solitário que dá o
// figo bravo, as pedras do redil dos pastores de Tecoa e o deserto atrás.
const OS_ALTOS_DE_TECOA: StagePropSpec[] = [
  P("tree", -128, 1.2, undefined, 0.2),
  P("rock", 88, 1.1, undefined, 0.58),
  P("rock", -282, 1.25, undefined, 0.46),
  P("rock", 262, 1.15, undefined, 0.52),
  P("well", 215, 1.0, undefined, 0.68),
  P("bush", 10, 0.85, undefined, 0.64),
  P("grass", -35, 0.7, undefined, 0.78),
  { ...P("sun", 150, 1.05, undefined, 0.62), sky: true },
];

// A CISTERNA DE JERAMEEL AO ENTARDECER — o mesmo sul seco do v.9, agora com a
// luz virando: a cisterna aberta com a corda no roldana, o bebedouro cheio, a
// pedra da tampa encostada e as sombras compridas dos cinco filhos que ainda
// não têm história.
const A_CISTERNA_DE_JERAMEEL_AO_ENTARDECER: StagePropSpec[] = [
  P("well", 78, 1.15, undefined, 0.5),
  { ...P("pool", -95, 1.1, undefined, 0.64), tag: "bebedouro-da-cisterna-de-jerameel" },
  P("rock", -262, 1.2, undefined, 0.46),
  P("rock", 245, 1.1, undefined, 0.56),
  P("bush", 165, 0.85, undefined, 0.62),
  P("amphora", 10, 0.85, undefined, 0.72),
  P("grass", -160, 0.6, undefined, 0.8),
  { ...P("sun", 300, 1.1, undefined, 0.42), sky: true },
];

// A TENDA DE ATARA — a segunda mulher de Jerameel e a sua casa própria: a
// tenda clara armada à parte, o tear de pé com a peça começada, o berço, a
// talha e a acácia que separa este pátio do outro.
const A_TENDA_DE_ATARA: StagePropSpec[] = [
  P("tent", 40, 1.25, undefined, 0.36),
  P("tree", -138, 1.1, undefined, 0.2),
  P("crate", -35, 0.9, undefined, 0.7),
  P("amphora", 175, 0.85, undefined, 0.68),
  P("well", -262, 1.0, undefined, 0.48),
  P("bush", 285, 0.85, undefined, 0.58),
  P("grass", 118, 0.75, undefined, 0.78),
  { ...P("sun", -200, 1.05, undefined, 0.58), sky: true },
];

// A ROÇA DOS FILHOS DE RÃO — o pedaço de terra que coube aos três: o campo
// arado de fresco com a leira ainda escura, o feixe do primeiro corte, a
// enxada largada, o muro de pedra do lindeiro e a nuvem de chuva chegando.
const A_ROCA_DOS_FILHOS_DE_RAO: StagePropSpec[] = [
  P("sheaf", -75, 1.05, undefined, 0.64),
  P("rock", 45, 1.0, undefined, 0.74),
  P("rock", -272, 1.15, undefined, 0.5),
  P("tree", 205, 1.05, undefined, 0.2),
  P("crate", 118, 0.85, undefined, 0.68),
  P("grass", -180, 0.8, undefined, 0.78),
  P("bush", 300, 0.85, undefined, 0.6),
  { ...P("clouds", -20, 1.1, undefined, 0.72), sky: true },
];

// O CURRAL DE SAMAI — a casa que vive de gado miúdo: o muro de pedra solta do
// redil, o espinheiro da porteira, o rebanho recolhido, o cocho de pedra e a
// colina pelada por trás. Duas gerações e um único ofício.
const O_CURRAL_DE_SAMAI: StagePropSpec[] = [
  P("rock", -60, 1.3, undefined, 0.56),
  { ...P("pool", 165, 1.05, undefined, 0.66), tag: "cocho-do-curral-de-samai" },
  P("rock", -282, 1.2, undefined, 0.46),
  P("rock", 288, 1.1, undefined, 0.54),
  P("bush", 75, 0.85, undefined, 0.6),
  P("grass", -170, 0.8, undefined, 0.78),
  { ...P("sun", 40, 1.05, undefined, 0.6), sky: true },
];

// O PÁTIO DE ABIAIL — a casa da mulher de Abisur, a terceira mãe nomeada
// seguidas nesta página: o pátio varrido, os dois berços de vime lado a lado,
// a talha da água, a romãzeira e a parede caiada pegando sol da manhã.
const O_PATIO_DE_ABIAIL: StagePropSpec[] = [
  P("door", 92, 1.2, undefined, 0.38),
  P("tree", -152, 1.1, undefined, 0.2),
  P("crate", -55, 0.9, undefined, 0.7),
  P("crate", -5, 0.85, undefined, 0.74),
  P("amphora", 215, 0.85, undefined, 0.66),
  P("column", -300, 1.15, undefined, 0.32),
  P("grass", 292, 0.7, undefined, 0.78),
  { ...P("sun", -230, 1.15, undefined, 0.5), sky: true },
];

// A CASA VAZIA DE SELEDE — "e Selede morreu sem filhos": a soleira sem
// ninguém, o candeeiro apagado, o pote virado no chão, a porta encostada e a
// noite entrando pelo vão. É um ramo da árvore que seca na página.
const A_CASA_VAZIA_DE_SELEDE: StagePropSpec[] = [
  P("door", -70, 1.2, undefined, 0.4),
  P("lampstand", 68, 0.85, undefined, 0.62),
  P("amphora", 150, 0.8, undefined, 0.7),
  P("column", -262, 1.2, undefined, 0.3),
  P("column", 262, 1.2, undefined, 0.32),
  P("crate", 12, 0.85, undefined, 0.74),
  { ...P("moon", 200, 0.9, undefined, 0.6), sky: true },
];

// A CASA DE SESÃ EM ISI — a herdade que atravessa três gerações até chegar a
// um homem sem filho varão: a casa de pedra com o alpendre, o celeiro cheio, o
// jumento de carga do serviço, a figueira do quintal e a tarde comprida.
const A_CASA_DE_SESA_EM_ISI: StagePropSpec[] = [
  P("church", -170, 1.2, undefined, 0.26),
  P("door", -35, 1.15, undefined, 0.4),
  P("crate", 78, 0.95, undefined, 0.66),
  P("donkey", 205, 1.1, undefined, 0.54),
  P("tree", 300, 1.05, undefined, 0.2),
  P("sheaf", 25, 0.9, undefined, 0.74),
  P("grass", -262, 0.75, undefined, 0.78),
  { ...P("sun", 130, 1.05, undefined, 0.52), sky: true },
];

// O OLIVAL DE JETER — o outro ramo que morre sem filhos: as oliveiras velhas
// em fileira, o tanque de pedra da rega parado, a talha de azeite tapada e o
// vento virando as folhas do avesso. Uma herdade boa, e ninguém para receber.
const O_OLIVAL_DE_JETER: StagePropSpec[] = [
  P("tree", -215, 1.2, undefined, 0.18),
  P("tree", -60, 1.15, undefined, 0.22),
  P("tree", 108, 1.05, undefined, 0.2),
  { ...P("pool", 235, 1.05, undefined, 0.62), tag: "tanque-do-olival-de-jeter" },
  P("amphora", 20, 0.9, undefined, 0.7),
  P("rock", -305, 1.1, undefined, 0.52),
  P("grass", 300, 0.65, undefined, 0.8),
  { ...P("clouds", 60, 1.05, undefined, 0.7), sky: true },
];

// A VEREDA DOS FILHOS DE JÔNATAS — o caminho de volta ao Neguebe de Jerameel
// com os dois últimos nomes da casa: a trilha entre moitas, a pedra do
// descanso, o poço tapado ao longe e o entardecer alaranjado. A linha de
// Jerameel acaba aqui e o texto vira para Sesã.
const A_VEREDA_DOS_FILHOS_DE_JONATAS: StagePropSpec[] = [
  P("rock", -35, 1.2, undefined, 0.6),
  P("well", 215, 1.0, undefined, 0.46),
  P("bush", -180, 0.9, undefined, 0.6),
  P("bush", 92, 0.85, undefined, 0.66),
  P("rock", -300, 1.15, undefined, 0.48),
  P("tree", 300, 1.0, undefined, 0.22),
  P("grass", 130, 0.7, undefined, 0.78),
  { ...P("sun", 40, 1.1, undefined, 0.4), sky: true },
];

// O TERREIRO DE SESÃ SEM HERDEIRO — a casa cheia de filhas e sem filho varão:
// o tear, os potes, a roupa estendida e, no fundo do pátio, o servo egípcio
// carregando a carga do dia. A herdade inteira depende de uma decisão que
// ainda não foi tomada.
const O_TERREIRO_DE_SESA_SEM_HERDEIRO: StagePropSpec[] = [
  P("door", -195, 1.15, undefined, 0.4),
  P("crate", 88, 0.95, undefined, 0.66),
  P("crate", 138, 0.9, undefined, 0.72),
  P("amphora", -70, 0.9, undefined, 0.7),
  P("well", 235, 1.05, undefined, 0.48),
  P("tree", -20, 1.05, undefined, 0.2),
  P("column", 305, 1.15, undefined, 0.32),
  P("grass", 200, 0.7, undefined, 0.78),
];

// AS BODAS DE JARÁ, O SERVO EGÍPCIO — o pátio do mesmo terreiro, agora à
// noite e em festa: a fogueira do casamento, o candelabro aceso, as talhas do
// vinho, a porta enfeitada e as estrelas. Um escravo estrangeiro acaba de
// virar o herdeiro da casa.
const AS_BODAS_DE_JARA: StagePropSpec[] = [
  { ...P("campfire", -105, 1.2, 0.8, 0.58), tag: "fogueira-das-bodas-de-jara" },
  P("menorah", 68, 1.05, undefined, 0.56),
  P("door", 205, 1.15, undefined, 0.4),
  P("amphora", -20, 0.9, undefined, 0.7),
  P("amphora", 25, 0.85, undefined, 0.74),
  P("tree", -252, 1.05, undefined, 0.2),
  P("column", 305, 1.15, undefined, 0.32),
  { ...P("starfield", 130, 1.2, undefined, 0.84), sky: true },
];

// A SEMEADURA DA CASA DE ATAI — a primeira geração nascida daquele casamento,
// abrindo terra na chuva de outubro: a leira aberta, o saco da semente, o poço
// da roça e o céu carregado da primeira água. Manhã fria.
const A_SEMEADURA_DA_CASA_DE_ATAI: StagePropSpec[] = [
  P("sheaf", -95, 1.0, undefined, 0.66),
  P("crate", -35, 0.9, undefined, 0.72),
  P("well", 145, 1.05, undefined, 0.48),
  P("tree", -252, 1.1, undefined, 0.2),
  P("rock", 285, 1.1, undefined, 0.54),
  P("grass", 45, 0.8, undefined, 0.78),
  P("bush", 215, 0.85, undefined, 0.6),
  { ...P("clouds", -150, 1.15, undefined, 0.72), sky: true },
];

// A VINHA DE EFLAL — a geração seguinte na mesma herdade, na vindima: os
// cachos maduros nos bacelos, o cesto cheio, o tanque de pedra da rega e o sol
// a pino de agosto. A casa já não é nova.
const A_VINHA_DE_EFLAL: StagePropSpec[] = [
  P("grapes", -145, 1.15, undefined, 0.6),
  P("grapes", 15, 1.1, undefined, 0.66),
  P("grapes", 178, 1.05, undefined, 0.56),
  P("crate", -60, 0.9, undefined, 0.72),
  { ...P("pool", 262, 1.1, undefined, 0.62), tag: "tanque-da-vinha-de-eflal" },
  P("rock", -300, 1.1, undefined, 0.5),
  P("tree", 92, 1.0, undefined, 0.2),
  { ...P("sun", -215, 1.2, undefined, 0.74), sky: true },
];

// O TANQUE DO OLIVAL DE OBEDE — outra geração, outro trabalho: o tanque de
// pedra da rega, as talhas de azeite enfileiradas na sombra, o caixote das
// azeitonas e o alpendre de esteira. Fim de tarde de novembro.
const O_TANQUE_DO_OLIVAL_DE_OBEDE: StagePropSpec[] = [
  { ...P("pool", -110, 1.15, undefined, 0.6), tag: "tanque-do-olival-de-obede" },
  P("amphora", 25, 0.95, undefined, 0.68),
  P("amphora", 70, 0.9, undefined, 0.72),
  P("amphora", 115, 0.85, undefined, 0.64),
  P("crate", -30, 0.9, undefined, 0.76),
  P("column", 232, 1.15, undefined, 0.32),
  P("tree", -290, 1.1, undefined, 0.2),
  P("door", 305, 1.1, undefined, 0.4),
];

// O APRISCO DE HELEZ AO CREPÚSCULO — a mesma família agora criando gado no
// alto: o muro de pedra solta do redil, o rebanho recolhido, o cajado
// encostado e o vale escurecendo lá embaixo. O dia acabou.
const O_APRISCO_DE_HELEZ: StagePropSpec[] = [
  P("rock", -85, 1.3, undefined, 0.56),
  P("rock", 118, 1.2, undefined, 0.58),
  P("rock", -285, 1.15, undefined, 0.46),
  P("tree", 232, 1.05, undefined, 0.2),
  P("bush", 35, 0.85, undefined, 0.66),
  P("grass", -190, 0.75, undefined, 0.78),
  P("grass", 300, 0.65, undefined, 0.72),
  { ...P("sun", 295, 1.1, undefined, 0.38), sky: true },
];

// A GUARDA DA NOITE DE SISMAI — a vigia do campo na época da colheita: a
// fogueira do guarda, a cabana de ramos, os feixes empilhados que se está
// guardando e o céu inteiro de estrelas. A herdade nunca fica sozinha.
const A_GUARDA_DA_NOITE_DE_SISMAI: StagePropSpec[] = [
  { ...P("campfire", -60, 1.15, 0.75, 0.6), tag: "fogueira-da-guarda-de-sismai" },
  P("tent", 150, 1.15, undefined, 0.36),
  P("sheaf", 45, 1.0, undefined, 0.7),
  P("sheaf", 92, 0.95, undefined, 0.74),
  P("rock", -262, 1.15, undefined, 0.5),
  P("bush", 268, 0.85, undefined, 0.62),
  { ...P("starfield", -140, 1.3, undefined, 0.85), sky: true },
  { ...P("moon", 245, 1.0, undefined, 0.64), sky: true },
];

// A PORTA DA HERDADE DE ELISAMA — a manhã seguinte, e o último nome da longa
// descendência do servo egípcio: a porta da casa aberta para o campo lavrado,
// a talha da água no batente, a videira sobre o alpendre e o sol nascendo por
// cima da terra que a família não perdeu.
const A_PORTA_DA_HERDADE_DE_ELISAMA: StagePropSpec[] = [
  P("door", -60, 1.25, undefined, 0.4),
  P("church", -235, 1.15, undefined, 0.26),
  P("grapes", 45, 0.95, undefined, 0.62),
  P("well", 190, 1.05, undefined, 0.48),
  P("amphora", 0, 0.85, undefined, 0.72),
  P("sheaf", 118, 0.95, undefined, 0.68),
  P("grass", 300, 0.75, undefined, 0.78),
  { ...P("sun", 285, 1.15, undefined, 0.46), sky: true },
];

// A PORTA DE HEBROM — a cidade dos carvalhos, a mais antiga de Judá: o portal
// duplo da muralha, a árvore de Manre ao lado, a praça de pedra, o poço e o
// casario subindo o morro. Aqui Davi será feito rei.
const A_PORTA_DE_HEBROM: StagePropSpec[] = [
  P("door", -105, 1.25, undefined, 0.38),
  P("tree", 68, 1.2, undefined, 0.18),
  P("church", 232, 1.15, undefined, 0.26),
  P("tower", -280, 1.25, undefined, 0.2),
  P("well", 148, 1.0, undefined, 0.5),
  P("column", 315, 1.15, undefined, 0.32),
  P("grass", -20, 0.65, undefined, 0.8),
  { ...P("sun", 25, 1.05, undefined, 0.58), sky: true },
];

// AS FONTES DE TÁPUA — o nome do filho de Hebrom é o de um lugar de água: o
// olho-d'água brotando no pé do barranco, o tanque de pedra, os pomares em
// volta e a relva alta que só cresce onde há nascente.
const AS_FONTES_DE_TAPUA: StagePropSpec[] = [
  { ...P("pool", -70, 1.2, undefined, 0.6), tag: "fontes-de-tapua" },
  { ...P("river", 165, 1.15, undefined, 0.68), tag: "ribeiro-de-tapua" },
  P("tree", -215, 1.2, undefined, 0.18),
  P("tree", 55, 1.1, undefined, 0.22),
  P("grass", -140, 0.85, undefined, 0.78),
  P("bush", 268, 0.9, undefined, 0.56),
  P("rock", 315, 1.05, undefined, 0.5),
  { ...P("sun", 235, 1.05, undefined, 0.58), sky: true },
];

// A ESTRADA DE JORQUEÃO — a vereda de terra que liga as aldeias da montanha de
// Judá: a fila de pedras que marca o limite das herdades, a figueira do
// cruzamento, o jumento de carga do recado e o vale de terraços atrás.
const A_ESTRADA_DE_JORQUEAO: StagePropSpec[] = [
  P("donkey", -112, 1.15, undefined, 0.54),
  P("tree", 92, 1.1, undefined, 0.2),
  P("rock", 15, 1.05, undefined, 0.72),
  P("rock", -272, 1.15, undefined, 0.48),
  P("church", 248, 1.1, undefined, 0.26),
  P("bush", 175, 0.85, undefined, 0.62),
  P("grass", -180, 0.75, undefined, 0.78),
  { ...P("clouds", 55, 1.0, undefined, 0.7), sky: true },
];

// BETE-ZUR, A CASA DE ROCHA — a praça-forte de Maom no alto da estrada de
// Hebrom: a torre em cima da laje, a muralha assentada direto na pedra viva, a
// cisterna talhada e o espinheiro do talude. Nome que descreve o lugar.
const BETE_ZUR_A_CASA_DE_ROCHA: StagePropSpec[] = [
  P("tower", -60, 1.4, undefined, 0.18),
  P("rock", -252, 1.4, undefined, 0.46),
  P("rock", 128, 1.35, undefined, 0.5),
  P("well", 232, 1.0, undefined, 0.6),
  P("door", 62, 1.1, undefined, 0.4),
  P("bush", 300, 0.85, undefined, 0.6),
  P("grass", -160, 0.6, undefined, 0.8),
];

// A TENDA DE EFÁ, A CONCUBINA — a casa de fora da herdade de Calebe: a tenda
// armada longe do casario, o tear, a fogueira baixa do preparo, o cesto do
// pão e a acácia que faz toda a sombra do lugar. Uma família à margem.
const A_TENDA_DE_EFA_A_CONCUBINA: StagePropSpec[] = [
  P("tent", -70, 1.25, undefined, 0.36),
  { ...P("campfire", 105, 1.0, 0.6, 0.62), tag: "fogueira-da-tenda-de-efa" },
  P("tree", 235, 1.05, undefined, 0.2),
  P("crate", 30, 0.9, undefined, 0.72),
  P("amphora", -195, 0.85, undefined, 0.66),
  P("rock", -300, 1.1, undefined, 0.5),
  P("grass", 300, 0.7, undefined, 0.78),
  { ...P("sun", 165, 1.05, undefined, 0.56), sky: true },
];

// A HERDADE DE JADAI — o campo dos seis irmãos repartido em faixas: os muros
// de pedra dividindo a encosta em terraços, a árvore no canto de cada lote, o
// celeiro do meio e a serra de Judá fechando o fundo.
const A_HERDADE_DE_JADAI: StagePropSpec[] = [
  P("crate", -60, 1.0, undefined, 0.66),
  P("tree", -215, 1.15, undefined, 0.2),
  P("tree", 62, 1.05, undefined, 0.22),
  P("tree", 252, 1.0, undefined, 0.18),
  P("rock", -300, 1.15, undefined, 0.5),
  P("rock", 150, 1.05, undefined, 0.72),
  P("grass", 15, 0.8, undefined, 0.78),
  { ...P("sun", -130, 1.05, undefined, 0.6), sky: true },
];

// O PÁTIO DE MAACA — a outra casa de fora, do lado oposto da herdade: a porta
// de tábua, o forno de pão, os dois potes grandes na sombra e a parreira do
// muro. Nem tenda de deserto nem casa de senhor: meio-termo.
const O_PATIO_DE_MAACA: StagePropSpec[] = [
  P("door", 88, 1.2, undefined, 0.4),
  { ...P("campfire", -128, 1.0, 0.55, 0.6), tag: "forno-do-patio-de-maaca" },
  P("amphora", -35, 0.9, undefined, 0.7),
  P("amphora", 10, 0.85, undefined, 0.74),
  P("grapes", 205, 0.95, undefined, 0.6),
  P("column", -290, 1.15, undefined, 0.32),
  P("tree", 300, 1.05, undefined, 0.2),
  P("grass", 130, 0.7, undefined, 0.78),
];

// AS FONTES SUPERIORES E INFERIORES DE ACSA — a herdade seca do Neguebe que
// Calebe deu à filha, e a água que ela pediu por cima: a fonte de cima
// jorrando no barranco, o riacho de baixo correndo pelo campo, o jumento de
// que ela se apeou e a terra que começa a reverdecer.
const AS_FONTES_DE_ACSA: StagePropSpec[] = [
  { ...P("pool", -145, 1.15, undefined, 0.54), tag: "fonte-superior-de-acsa" },
  { ...P("river", 92, 1.2, undefined, 0.68), tag: "fonte-inferior-de-acsa" },
  P("donkey", -20, 1.1, undefined, 0.52),
  P("rock", -292, 1.25, undefined, 0.44),
  P("tree", 232, 1.1, undefined, 0.2),
  P("grass", 40, 0.85, undefined, 0.78),
  P("bush", 305, 0.85, undefined, 0.58),
  { ...P("sun", 160, 1.1, undefined, 0.62), sky: true },
];

// OS BOSQUES DE QUIRIATE-JEARIM — a cidade cujo nome é cidade dos bosques: o
// pinheiral fechado subindo o morro, a casa de pedra na clareira, o caminho de
// lenha e a névoa presa entre os troncos. É aqui que a arca ficará vinte anos.
const OS_BOSQUES_DE_QUIRIATE_JEARIM: StagePropSpec[] = [
  P("tree", -262, 1.3, undefined, 0.16),
  P("tree", -118, 1.25, undefined, 0.2),
  P("tree", 88, 1.2, undefined, 0.18),
  P("tree", 245, 1.15, undefined, 0.22),
  P("church", -25, 1.1, undefined, 0.28),
  P("bush", 165, 0.9, undefined, 0.6),
  P("grass", 35, 0.85, undefined, 0.78),
  P("rock", 318, 1.05, undefined, 0.52),
];

// AS EIRAS DE BELÉM — a cidade do pão vista do lado dos campos: as eiras de
// pedra no alto, os feixes de trigo, o casario amarelo da vila e o vale dos
// pastores caindo para o oriente. O nome Salma vira aqui um lugar.
const AS_EIRAS_DE_BELEM: StagePropSpec[] = [
  P("sheaf", -160, 1.1, undefined, 0.6),
  P("sheaf", -95, 1.05, undefined, 0.68),
  P("church", 78, 1.2, undefined, 0.26),
  P("tower", 265, 1.15, undefined, 0.2),
  P("well", -285, 1.0, undefined, 0.48),
  P("crate", 15, 0.9, undefined, 0.72),
  P("tree", 175, 1.05, undefined, 0.2),
  { ...P("sun", 120, 1.1, undefined, 0.6), sky: true },
];

// A CLAREIRA DOS LENHADORES — a outra face de Quiriate-Jearim, ao entardecer:
// a mata aberta a machado, as toras empilhadas, o carro de bois carregado, o
// fogo dos lenhadores e a serra escurecendo. A cidade dos bosques trabalha
// madeira.
const A_CLAREIRA_DOS_LENHADORES: StagePropSpec[] = [
  P("crate", -95, 1.0, undefined, 0.68),
  P("crate", -45, 0.95, undefined, 0.74),
  { ...P("campfire", 62, 1.1, 0.7, 0.6), tag: "fogueira-dos-lenhadores-de-quiriate-jearim" },
  P("tree", -252, 1.25, undefined, 0.18),
  P("tree", 195, 1.2, undefined, 0.2),
  P("chariot", 288, 1.05, undefined, 0.5),
  P("bush", 130, 0.85, undefined, 0.66),
  { ...P("clouds", -150, 1.1, undefined, 0.72), sky: true },
];

// O VALE ENTRE ZORÁ E ESTAOL — a fronteira de Judá com Dã, onde as famílias de
// Quiriate-Jearim se espalharam: os dois cabeços com uma aldeia em cada um, o
// campo de trigo do vale entre eles, o carvalho do meio e a estrada da
// planície filisteia se abrindo ao poente.
const O_VALE_ENTRE_ZORA_E_ESTAOL: StagePropSpec[] = [
  P("church", -215, 1.15, undefined, 0.24),
  P("church", 175, 1.1, undefined, 0.26),
  P("tree", -30, 1.2, undefined, 0.2),
  P("sheaf", 78, 1.0, undefined, 0.66),
  P("rock", -318, 1.1, undefined, 0.5),
  P("grass", 25, 0.85, undefined, 0.78),
  P("bush", 288, 0.85, undefined, 0.6),
  { ...P("sun", 100, 1.05, undefined, 0.5), sky: true },
];

// AS ALDEIAS DOS NETOFATITAS — os povoados dos cantores em volta de Belém,
// entre Atarote e Bete-Joabe: as casas baixas de pedra encostadas umas nas
// outras, o adro da aldeia, a harpa do que ensaia à porta e os terraços de
// oliveira descendo o morro.
const AS_ALDEIAS_DOS_NETOFATITAS: StagePropSpec[] = [
  P("church", -195, 1.15, undefined, 0.26),
  P("church", 20, 1.1, undefined, 0.3),
  P("harp", 130, 1.05, undefined, 0.64),
  P("door", -55, 1.1, undefined, 0.4),
  P("tree", 240, 1.1, undefined, 0.2),
  P("well", 300, 1.0, undefined, 0.48),
  P("amphora", 75, 0.85, undefined, 0.72),
  P("grass", -300, 0.7, undefined, 0.78),
];

// O PÁTIO DOS ESCRIBAS DE JABEZ — o último quadro do capítulo, e um dos mais
// raros da Escritura: uma povoação inteira que vive de ESCREVER. As bancas
// baixas com os rolos abertos, os tinteiros, o candelabro aceso de tarde, os
// caixotes dos arquivos — e, atrás do muro, as TENDAS DOS QUENEUS, a gente da
// casa de Recabe, que sabia ler e nunca quis morar em casa.
const O_PATIO_DOS_ESCRIBAS_DE_JABEZ: StagePropSpec[] = [
  { ...P("scroll", -78, 1.1, undefined, 0.62), tag: "rolos-dos-escribas-de-jabez" },
  { ...P("scroll", 55, 1.05, undefined, 0.68), tag: "rolos-dos-escribas-de-jabez" },
  P("tent", 205, 1.15, undefined, 0.34),
  P("tent", 305, 1.05, undefined, 0.3),
  P("menorah", -195, 1.0, undefined, 0.54),
  P("column", -300, 1.2, undefined, 0.3),
  P("crate", 130, 0.9, undefined, 0.72),
  P("amphora", 0, 0.8, undefined, 0.76),
];

// ============================================================================

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ 1Cr 1
  1: {
    start: { terrain: "field", night: 0.2, glory: 0.3, storm: 0.12, fire: 0.08, water: 0.1, verdure: 0.4 },
    beats: [
      // v.1 — o livro começa no primeiro homem, e o primeiro homem está de
      // enxada: a terra que lhe foi amaldiçoada é a mesma que ele agora lavra.
      // Sete ao lado, e Enos ainda menino — o neto em cujos dias "se começou a
      // invocar o nome do Senhor".
      b(1, { set: "a-primeira-lavoura", props: A_PRIMEIRA_LAVOURA,
        env: { terrain: "field", night: 0.16, glory: 0.32, storm: 0.1, fire: 0.06, water: 0.04, verdure: 0.46 }, cast: [
        C("adao", -95, "point", { dy: 0.6, facing: 1, id: "adao" }),
        C("homem", 40, "stand", { dy: 0.56, facing: -1, id: "sete-filho-de-adao" }),
        C("servo", 148, "walk", { dy: 0.5, facing: -1, id: "enos-filho-de-sete" }),
      ] }),
      // v.2 — três gerações depois, no mesmo campo e no fim da tarde: Cainã
      // tira água, Maalaleel carrega e Jerede, o mais velho, já só olha. A
      // paisagem não mudou; mudaram as mãos que a trabalham.
      b(2, {
        env: { terrain: "field", night: 0.3, glory: 0.28, storm: 0.1, fire: 0.06, water: 0.04, verdure: 0.44 }, cast: [
        C("homem", 200, "kneel", { dy: 0.52, facing: -1, id: "caina-filho-de-enos" }),
        C("homem", 95, "walk", { dy: 0.62, facing: -1, id: "maalaleel-filho-de-caina" }),
        C("patriarca", -55, "stand", { dy: 0.58, facing: 1, id: "jerede-filho-de-maalaleel" }),
      ] }),
      // v.3 — ⭐ ENOQUE. O nome que a lista não consegue esconder: "andou com
      // Deus, e não apareceu mais, porquanto Deus o tomou". A vereda sobe, a
      // luz é alta demais para a hora, e ele vai andando. Matusalém e Lameque
      // ficam parados vendo o pai subir.
      b(3, { set: "a-vereda-de-enoque", props: A_VEREDA_DE_ENOQUE,
        env: { terrain: "field", night: 0.08, glory: 0.82, storm: 0.06, fire: 0.05, water: 0.04, verdure: 0.38 }, cast: [
        C("patriarca", 40, "walk", { dy: 0.4, facing: 1, id: "enoque", glow: 0.85 }),
        C("homem", -110, "stand", { dy: 0.58, facing: 1, id: "matusalem" }),
        C("homem", -215, "raise", { dy: 0.64, facing: 1, id: "lameque-pai-de-noe" }),
      ] }),
      // v.4 — o mundo recomeça de quatro pessoas num monte: Noé de braços
      // abertos diante do altar que acabou de acender, o arco novo na nuvem, e
      // os três filhos de quem sairão todas as nações desta página.
      b(4, { set: "o-ararate-depois-do-diluvio", props: O_ARARATE_DEPOIS_DO_DILUVIO,
        env: { terrain: "mountain", night: 0.18, glory: 0.7, storm: 0.2, fire: 0.34, water: 0.3, verdure: 0.14 }, cast: [
        C("noe", 20, "raise", { dy: 0.6, facing: 1, id: "noe", glow: 0.5 }),
        C("homem", -100, "bow", { dy: 0.66, facing: 1, id: "sem-filho-de-noe" }),
        C("homem", 175, "stand", { dy: 0.58, facing: -1, id: "cao-filho-de-noe" }),
        C("homem", 262, "stand", { dy: 0.68, facing: -1, id: "jafe-filho-de-noe" }),
      ] }),
      // v.5 — os sete filhos de Jafé são o mapa das ilhas: Javã é a Grécia,
      // Tubal e Meseque o mar Negro, Madai a Média. O quadro é uma praia de
      // embarque — o pai apontando o mar, dois filhos empurrando o casco e as
      // aves marinhas por cima.
      b(5, { set: "as-ilhas-dos-gentios", props: AS_ILHAS_DOS_GENTIOS,
        env: { terrain: "field", night: 0.18, glory: 0.3, storm: 0.24, fire: 0.05, water: 0.44, verdure: 0.18 }, cast: [
        C("patriarca", -258, "point", { dy: 0.62, facing: 1, id: "jafe-filho-de-noe" }),
        C("homem", -75, "walk", { dy: 0.66, facing: 1, id: "java-filho-de-jafe" }),
        C("homem", 150, "raise", { dy: 0.56, facing: -1, id: "tubal-filho-de-jafe" }),
        C("homem", 240, "stand", { dy: 0.62, facing: -1, id: "meseque-filho-de-jafe" }),
      ] }),
      // v.6 — os filhos de Gomer são a estepe do norte: Togarma é a casa que
      // vendia cavalos e mulos nas feiras de Tiro. Por isso o quadro troca o
      // mar pelo pasto alto e põe um cavaleiro no meio dele.
      b(6, { set: "a-estepe-de-togarma", props: A_ESTEPE_DE_TOGARMA,
        env: { terrain: "field", night: 0.28, glory: 0.2, storm: 0.4, fire: 0.05, water: 0.04, verdure: 0.5 }, cast: [
        C("cavaleiro", -108, "stand", { dy: 0.52, facing: 1, id: "togarma-filho-de-gomer" }),
        C("homem", 105, "point", { dy: 0.6, facing: -1, id: "asquenaz-filho-de-gomer" }),
        C("pastor", 262, "walk", { dy: 0.56, facing: -1, id: "rifate-filho-de-gomer" }),
        C("rebanho", 20, "stand", { dy: 0.7, facing: 1, id: "manada-de-togarma" }),
      ] }),
      // v.7 — Elisá, Társis, Quitim e Dodanim são portos, não pessoas: o cais
      // de onde vinham a prata batida e o estanho. Os quatro filhos de Javã
      // aparecem como o que a sua descendência seria — homens de doca,
      // conferindo carga.
      b(7, { set: "o-porto-de-tarsis", props: O_PORTO_DE_TARSIS,
        env: { terrain: "city", night: 0.22, glory: 0.28, storm: 0.16, fire: 0.06, water: 0.36, verdure: 0.12 }, cast: [
        C("homem", -60, "point", { dy: 0.6, facing: 1, id: "tarsis-filho-de-java" }),
        C("servo", 105, "kneel", { dy: 0.66, facing: -1, id: "quitim-filho-de-java" }),
        C("homem", 195, "walk", { dy: 0.58, facing: -1, id: "elisa-filho-de-java" }),
        C("servo", 285, "stand", { dy: 0.7, facing: -1, id: "dodanim-filho-de-java" }),
      ] }),
      // v.8 — a linha de Cão desce para o sul e para o rio: Cuxe é a Etiópia,
      // Mizraim é o Egito, Pute é a Líbia, Canaã é a terra que um dia será
      // prometida a outro. Quatro filhos, quatro países, e o Nilo passando no
      // meio do quadro.
      b(8, { set: "o-rio-de-mizraim", props: O_RIO_DE_MIZRAIM,
        env: { terrain: "desert", night: 0.16, glory: 0.34, storm: 0.08, fire: 0.06, water: 0.3, verdure: 0.3 }, cast: [
        C("patriarca", -218, "stand", { dy: 0.58, facing: 1, id: "cao-filho-de-noe" }),
        C("homem", -95, "point", { dy: 0.64, facing: 1, id: "mizraim-filho-de-cao" }),
        C("homem", 90, "walk", { dy: 0.56, facing: -1, id: "cuxe-filho-de-cao" }),
        C("homem", 235, "stand", { dy: 0.62, facing: -1, id: "canaa-filho-de-cao" }),
      ] }),
      // v.9 — os filhos de Cuxe são a Arábia do incenso: Sebá e Dedã ficariam
      // conhecidos por atravessar o deserto com ouro e especiaria. A caravana
      // parada ao sol, os fardos no chão e o turíbulo aberto para o comprador
      // cheirar.
      b(9, { set: "a-caravana-de-seba-e-deda", props: A_CARAVANA_DE_SEBA_E_DEDA,
        env: { terrain: "desert", night: 0.12, glory: 0.32, storm: 0.06, fire: 0.08, water: 0.04, verdure: 0.06 }, cast: [
        C("homem", -60, "kneel", { dy: 0.68, facing: 1, id: "seba-filho-de-raama" }),
        C("homem", 45, "point", { dy: 0.62, facing: -1, id: "deda-filho-de-raama" }),
        C("patriarca", -235, "stand", { dy: 0.56, facing: 1, id: "raama-filho-de-cuxe" }),
        C("servo", 265, "walk", { dy: 0.7, facing: -1, id: "havila-filho-de-cuxe" }),
      ] }),
      // v.10 — ⭐ NINRODE, o primeiro homem da Escritura de quem se diz que
      // COMEÇOU A SER PODEROSO NA TERRA. Não é um nome numa lista: é um
      // caçador de tarde, com o arco na pedra, as aves fugindo do vale e, lá
      // no fundo, o zigurate da cidade que ele fundou.
      b(10, { set: "a-cacada-de-ninrode", props: A_CACADA_DE_NINRODE,
        env: { terrain: "field", night: 0.34, glory: 0.16, storm: 0.3, fire: 0.12, water: 0.04, verdure: 0.3 }, cast: [
        C("homem", -108, "raise", { dy: 0.58, facing: 1, id: "ninrode" }),
        C("homem", 92, "point", { dy: 0.68, facing: -1, id: "cacador-de-ninrode" }),
        C("servo", 205, "walk", { dy: 0.62, facing: -1, id: "servo-da-cacada-de-ninrode" }),
      ] }),
      // v.11 — os filhos de Mizraim não são reis: são ofícios. Ludim, Anamim,
      // Leabim e Naftuim viram o forno do oleiro aceso ao ar livre, as talhas
      // cruas secando em fila e o poço da vila. O Egito visto de baixo.
      b(11, { set: "as-oficinas-do-baixo-egito", props: AS_OFICINAS_DO_BAIXO_EGITO,
        env: { terrain: "desert", night: 0.2, glory: 0.26, storm: 0.06, fire: 0.4, water: 0.04, verdure: 0.16 }, cast: [
        C("servo", -160, "kneel", { dy: 0.62, facing: 1, id: "ludim-filho-de-mizraim" }),
        C("servo", 105, "write", { dy: 0.7, facing: -1, id: "anamim-filho-de-mizraim" }),
        C("homem", 215, "walk", { dy: 0.56, facing: -1, id: "naftuim-filho-de-mizraim" }),
        C("servo", 300, "stand", { dy: 0.66, facing: -1, id: "leabim-filho-de-mizraim" }),
      ] }),
      // v.12 — e no meio da lista o Cronista abre um parêntese que vale um
      // livro inteiro: "DOS QUAIS PROCEDEM OS FILISTEUS". O quadro sai da
      // olaria e vai para a praia do desembarque — o casco de través, as armas
      // fincadas na areia molhada e a tempestade ainda por cima da água.
      b(12, { set: "a-costa-dos-caftorim", props: A_COSTA_DOS_CAFTORIM,
        env: { terrain: "field", night: 0.4, glory: 0.12, storm: 0.68, fire: 0.06, water: 0.42, verdure: 0.08 }, cast: [
        C("homem", -55, "point", { dy: 0.64, facing: 1, id: "casluim-pai-dos-filisteus" }),
        C("homem", 138, "raise", { dy: 0.6, facing: -1, id: "primeiro-filisteu" }),
        C("homem", 218, "walk", { dy: 0.7, facing: -1, id: "caftorim-filho-de-mizraim" }),
      ] }),
      // v.13 — Canaã gera primeiro Sidom, a cidade mais velha da costa, e
      // depois Hete, pai dos heteus. Um porto de púrpura e um povo da
      // montanha, na mesma frase: o quadro põe o pescador no molhe e o heteu
      // parado na calçada, sem nada em comum.
      b(13, { set: "o-porto-de-sidom", props: O_PORTO_DE_SIDOM,
        env: { terrain: "city", night: 0.26, glory: 0.26, storm: 0.14, fire: 0.08, water: 0.32, verdure: 0.14 }, cast: [
        C("homem", 60, "point", { dy: 0.62, facing: -1, id: "sidom-primogenito-de-canaa" }),
        C("homem", -128, "stand", { dy: 0.58, facing: 1, id: "hete-filho-de-canaa" }),
        C("servo", 195, "kneel", { dy: 0.7, facing: -1, id: "pescador-de-sidom" }),
      ] }),
      // v.14 — jebuseus, amorreus e girgaseus: a lista vira mapa de fortalezas.
      // O rochedo de Jebus, com a muralha em cima da pedra viva e a porta
      // estreita da subida, é a cidade que resistirá a todo o mundo até Davi.
      b(14, { set: "a-fortaleza-de-jebus", props: A_FORTALEZA_DE_JEBUS,
        env: { terrain: "mountain", night: 0.46, glory: 0.14, storm: 0.2, fire: 0.1, water: 0.04, verdure: 0.2 }, cast: [
        C("homem", -20, "stand", { dy: 0.56, facing: 1, id: "jebuseu-da-fortaleza" }),
        C("homem", 118, "point", { dy: 0.64, facing: -1, id: "amorreu-das-alturas" }),
        C("homem", 258, "walk", { dy: 0.7, facing: -1, id: "girgaseu-do-vale" }),
      ] }),
      // v.15 — heveus, arqueus e sineus moravam na serra fresca do norte, onde
      // há carvalho e fonte. Depois de dois quadros de pedra e guerra, aqui é
      // sombra, relva alta e um poço: a terra boa de Canaã antes de Israel
      // pisar nela.
      b(15, { set: "os-carvalhos-dos-heveus", props: OS_CARVALHOS_DOS_HEVEUS,
        env: { terrain: "field", night: 0.14, glory: 0.36, storm: 0.06, fire: 0.05, water: 0.04, verdure: 0.85 }, cast: [
        C("pastor", -110, "walk", { dy: 0.6, facing: 1, id: "heveu-de-siquem" }),
        C("homem", 60, "kneel", { dy: 0.68, facing: -1, id: "arqueu-do-libano" }),
        C("homem", 205, "stand", { dy: 0.58, facing: -1, id: "sineu-da-serra" }),
        C("rebanho", 300, "stand", { dy: 0.72, facing: -1, id: "rebanho-dos-heveus" }),
      ] }),
      // v.16 — arvadeus, zemareus e hamateus fecham Canaã pelo norte: a ilha de
      // Arvade na frente e Hamate rio acima. O Orontes corta o quadro em
      // diagonal e as duas cidades cabem no mesmo horizonte de água.
      b(16, { set: "arvade-e-hamate", props: ARVADE_E_HAMATE,
        env: { terrain: "city", night: 0.2, glory: 0.3, storm: 0.12, fire: 0.06, water: 0.32, verdure: 0.34 }, cast: [
        C("homem", -128, "stand", { dy: 0.6, facing: 1, id: "arvadeu-da-ilha" }),
        C("servo", -25, "walk", { dy: 0.7, facing: 1, id: "zemareu-da-costa" }),
        C("anciao", 235, "point", { dy: 0.58, facing: -1, id: "hamateu-do-orontes" }),
      ] }),
      // v.17 — a conta volta ao oriente com os filhos de Sem: Elão e Assur são
      // os dois impérios que um dia levarão Israel cativo, e aqui são só dois
      // nomes de irmãos. O zigurate ao fundo e o canal de irrigação aberto a
      // enxada dizem que país é este.
      b(17, { set: "a-planicie-de-elao-e-assur", props: A_PLANICIE_DE_ELAO_E_ASSUR,
        env: { terrain: "desert", night: 0.18, glory: 0.3, storm: 0.08, fire: 0.06, water: 0.22, verdure: 0.26 }, cast: [
        C("patriarca", -215, "stand", { dy: 0.58, facing: 1, id: "sem-filho-de-noe" }),
        C("homem", -30, "point", { dy: 0.66, facing: 1, id: "elao-filho-de-sem" }),
        C("homem", 92, "stand", { dy: 0.6, facing: -1, id: "assur-filho-de-sem" }),
        C("servo", 235, "kneel", { dy: 0.7, facing: -1, id: "arfaxade-filho-de-sem" }),
      ] }),
      // v.18 — Arfaxade, Selá, Éber: três gerações de pastor numa tenda só. O
      // pai entrega o cajado, o filho já está com o rebanho no curral e o neto
      // ainda engatinha à porta — a maneira mais simples de contar o que a
      // genealogia está de fato dizendo.
      b(18, { set: "a-tenda-de-arfaxade", props: A_TENDA_DE_ARFAXADE,
        env: { terrain: "field", night: 0.16, glory: 0.34, storm: 0.06, fire: 0.06, water: 0.04, verdure: 0.52 }, cast: [
        C("patriarca", -60, "point", { dy: 0.6, facing: 1, id: "arfaxade-filho-de-sem" }),
        C("pastor", 130, "walk", { dy: 0.66, facing: -1, id: "sela-filho-de-arfaxade" }),
        C("servo", 262, "stand", { dy: 0.72, facing: -1, id: "eber-filho-de-sela" }),
        C("rebanho", 55, "stand", { dy: 0.76, facing: 1, id: "rebanho-de-arfaxade" }),
      ] }),
      // v.19 — ⭐ PELEGUE, "PORQUANTO NOS SEUS DIAS SE REPARTIU A TERRA". O
      // nome é o acontecimento: o chão se abre no meio do quadro, a água corre
      // para lados opostos, e de cada banda uma tenda de gente que a partir de
      // hoje não fala mais a mesma língua. Joctã olha para o outro lado.
      b(19, { set: "a-terra-repartida-de-pelegue", props: A_TERRA_REPARTIDA_DE_PELEGUE,
        env: { terrain: "field", night: 0.34, glory: 0.2, storm: 0.62, fire: 0.08, water: 0.26, verdure: 0.24 }, cast: [
        C("homem", -180, "raise", { dy: 0.6, facing: 1, id: "pelegue" }),
        C("homem", 180, "point", { dy: 0.62, facing: -1, id: "jocta-irmao-de-pelegue" }),
        C("mulherComum", -285, "walk", { dy: 0.7, facing: -1, id: "mulher-da-casa-de-pelegue" }),
        C("servo", 288, "walk", { dy: 0.72, facing: 1, id: "servo-da-casa-de-jocta" }),
      ] }),
      // v.20 — os treze filhos de Joctã são o sul da Arábia. Almodá, Selefe,
      // Hazarmavé e Jerá começam a lista no fundo de um uádi: a cisterna
      // cavada na rocha onde a água do inverno fica é a razão de haver gente
      // aqui.
      b(20, { set: "os-uadis-de-jocta", props: OS_UADIS_DE_JOCTA,
        env: { terrain: "desert", night: 0.14, glory: 0.28, storm: 0.06, fire: 0.06, water: 0.04, verdure: 0.08 }, cast: [
        C("homem", -95, "kneel", { dy: 0.62, facing: 1, id: "almoda-filho-de-jocta" }),
        C("servo", 45, "walk", { dy: 0.7, facing: -1, id: "selefe-filho-de-jocta" }),
        C("homem", 175, "stand", { dy: 0.58, facing: -1, id: "hazarmave-filho-de-jocta" }),
        C("servo", 262, "stand", { dy: 0.72, facing: -1, id: "jera-filho-de-jocta" }),
      ] }),
      // v.21 — Hadorão, Usal e Dicla: Dicla quer dizer palmeira, e o quadro
      // muda de uádi seco para o oásis mais fechado do capítulo — quatro
      // tamareiras em volta do tanque e a aldeia de barro por trás.
      b(21, { set: "o-palmar-de-dicla", props: O_PALMAR_DE_DICLA,
        env: { terrain: "desert", night: 0.16, glory: 0.34, storm: 0.05, fire: 0.06, water: 0.3, verdure: 0.66 }, cast: [
        C("homem", -215, "point", { dy: 0.62, facing: 1, id: "hadorao-filho-de-jocta" }),
        C("servo", -40, "kneel", { dy: 0.72, facing: 1, id: "usal-filho-de-jocta" }),
        C("homem", 215, "stand", { dy: 0.66, facing: -1, id: "dicla-filho-de-jocta" }),
      ] }),
      // v.22 — Obal, Abimael e Sebá são a rota do incenso: o alto da serra por
      // onde subia a mirra, com os fardos amarrados na beira do caminho, o
      // turíbulo de prova aberto na pedra e o vale de neblina lá embaixo.
      b(22, { set: "a-rota-do-incenso", props: A_ROTA_DO_INCENSO,
        env: { terrain: "mountain", night: 0.24, glory: 0.26, storm: 0.22, fire: 0.1, water: 0.04, verdure: 0.3 }, cast: [
        C("homem", -110, "kneel", { dy: 0.66, facing: 1, id: "obal-filho-de-jocta" }),
        C("servo", 35, "walk", { dy: 0.72, facing: -1, id: "abimael-filho-de-jocta" }),
        C("homem", 218, "point", { dy: 0.6, facing: -1, id: "seba-filho-de-jocta" }),
      ] }),
      // v.23 — e a lista de Joctã acaba em OFIR, o nome que séculos depois
      // significará ouro na boca de Salomão. Aqui ainda é só um ribeiro raso,
      // uma bateia de lavagem e um homem de joelhos no cascalho, ao sol de
      // meio-dia.
      b(23, { set: "o-ouro-de-ofir", props: O_OURO_DE_OFIR,
        env: { terrain: "field", night: 0.1, glory: 0.5, storm: 0.05, fire: 0.06, water: 0.26, verdure: 0.2 }, cast: [
        C("homem", 108, "kneel", { dy: 0.68, facing: -1, id: "ofir-filho-de-jocta" }),
        C("servo", -10, "walk", { dy: 0.74, facing: 1, id: "havila-filho-de-jocta" }),
        C("homem", 235, "raise", { dy: 0.58, facing: -1, id: "jobabe-filho-de-jocta" }),
      ] }),
      // v.24 — o Cronista larga os treze e recomeça a conta pela linha
      // estreita: Sem, Arfaxade, Selá. Amanhecendo na soleira da casa velha do
      // oriente, com o candeeiro da noite ainda aceso e o zigurate da cidade
      // grande lá atrás.
      b(24, { set: "a-casa-velha-do-oriente", props: A_CASA_VELHA_DO_ORIENTE,
        env: { terrain: "city", night: 0.42, glory: 0.24, storm: 0.08, fire: 0.16, water: 0.04, verdure: 0.16 }, cast: [
        C("patriarca", -130, "stand", { dy: 0.58, facing: 1, id: "sem-filho-de-noe" }),
        C("homem", 5, "walk", { dy: 0.66, facing: -1, id: "arfaxade-filho-de-sem" }),
        C("servo", 150, "stand", { dy: 0.72, facing: -1, id: "sela-filho-de-arfaxade" }),
      ] }),
      // v.25 — Éber, Pelegue, Reú: a família já está na estrada, descendo o
      // Eufrates com o jumento de carga e a poeira do meio-dia. Ninguém está
      // chegando a lugar nenhum — estão todos passando, e é isso que a lista
      // quer dizer.
      b(25, { set: "a-estrada-do-ocidente", props: A_ESTRADA_DO_OCIDENTE,
        env: { terrain: "desert", night: 0.1, glory: 0.3, storm: 0.06, fire: 0.06, water: 0.05, verdure: 0.14 }, cast: [
        C("patriarca", -215, "walk", { dy: 0.6, facing: 1, id: "eber-filho-de-sela" }),
        C("homem", -45, "walk", { dy: 0.68, facing: 1, id: "pelegue" }),
        C("servo", 95, "walk", { dy: 0.74, facing: 1, id: "reu-filho-de-pelegue" }),
      ] }),
      // v.26 — Serugue, Naor, Terá: a última noite antes de Ur ficar para trás.
      // As tendas armadas de costas para a cidade, a fogueira do arraial e a
      // lua já alta sobre o zigurate que nenhum deles vai olhar de novo.
      b(26, { set: "o-arraial-de-tera", props: O_ARRAIAL_DE_TERA,
        env: { terrain: "desert", night: 0.72, glory: 0.18, storm: 0.1, fire: 0.42, water: 0.05, verdure: 0.1 }, cast: [
        C("anciao", -262, "stand", { dy: 0.6, facing: 1, id: "serugue-filho-de-reu" }),
        C("homem", -120, "kneel", { dy: 0.68, facing: 1, id: "naor-filho-de-serugue" }),
        C("patriarca", 150, "point", { dy: 0.64, facing: -1, id: "tera-pai-de-abraao" }),
      ] }),
      // v.27 — ⭐ e a lista para de repente em quatro palavras: "ABRÃO, QUE É
      // ABRAÃO". Um nome trocado, e a genealogia do mundo inteiro passa a
      // caber numa família. Manre, o altar de pedra bruta, o carvalhal e o céu
      // cheio de estrelas que ele foi mandado contar.
      b(27, { set: "os-carvalhos-de-manre", props: OS_CARVALHOS_DE_MANRE,
        env: { terrain: "field", night: 0.74, glory: 0.86, storm: 0.06, fire: 0.24, water: 0.04, verdure: 0.4 }, cast: [
        C("abraao", -25, "raise", { dy: 0.62, facing: 1, id: "abraao", glow: 0.6 }),
      ] }),
      // v.28 — dois filhos, duas heranças: o poço do juramento no meio, a tenda
      // e o rebanho de um lado, o arco encostado na pedra do outro. Isaque
      // fica na terra, Ismael vai para o deserto — e o texto os põe lado a
      // lado sem uma palavra de julgamento.
      b(28, { set: "o-poco-de-berseba", props: O_POCO_DE_BERSEBA,
        env: { terrain: "desert", night: 0.14, glory: 0.42, storm: 0.06, fire: 0.06, water: 0.04, verdure: 0.16 }, cast: [
        C("abraao", -150, "stand", { dy: 0.58, facing: 1, id: "abraao" }),
        C("isaque", -30, "stand", { dy: 0.66, facing: 1, id: "isaque" }),
        C("homem", 128, "raise", { dy: 0.7, facing: -1, id: "ismael" }),
      ] }),
      // v.29 — os doze príncipes de Ismael começam por Nebaiote, cujos
      // carneiros o profeta ainda citaria (Is 60:7), e por Quedar, cujas
      // tendas negras viraram provérbio. Fim de tarde no acampamento, o
      // rebanho recolhido e a fogueira baixa.
      b(29, { set: "as-tendas-negras-de-quedar", props: AS_TENDAS_NEGRAS_DE_QUEDAR,
        env: { terrain: "desert", night: 0.52, glory: 0.2, storm: 0.1, fire: 0.4, water: 0.05, verdure: 0.12 }, cast: [
        C("pastor", -140, "stand", { dy: 0.6, facing: 1, id: "nebaiote-primogenito-de-ismael" }),
        C("homem", 62, "kneel", { dy: 0.7, facing: -1, id: "quedar-filho-de-ismael" }),
        C("servo", 205, "walk", { dy: 0.64, facing: -1, id: "adbeel-filho-de-ismael" }),
        C("rebanho", 275, "stand", { dy: 0.74, facing: -1, id: "rebanho-de-nebaiote" }),
      ] }),
      // v.30 — Misma, Dumá, Massá, Hadade e Temá: Temá é o oásis que dava água
      // aos sedentos da estrada. Meio-dia sem uma nuvem, o poço de boca larga,
      // os jumentos da caravana em roda e duas palmeiras fazendo toda a sombra
      // do lugar.
      b(30, { set: "o-poco-de-tema", props: O_POCO_DE_TEMA,
        env: { terrain: "desert", night: 0.08, glory: 0.36, storm: 0.04, fire: 0.06, water: 0.04, verdure: 0.16 }, cast: [
        C("homem", -60, "kneel", { dy: 0.68, facing: 1, id: "tema-filho-de-ismael" }),
        C("servo", 62, "walk", { dy: 0.74, facing: -1, id: "duma-filho-de-ismael" }),
        C("homem", 235, "point", { dy: 0.62, facing: -1, id: "massa-filho-de-ismael" }),
        C("servo", 300, "stand", { dy: 0.7, facing: -1, id: "misma-filho-de-ismael" }),
      ] }),
      // v.31 — Jetur, Nafis e Quedemá fecham os doze, e o quadro vai para a
      // orla do oriente à noite: o cavalo selado da ronda, a fogueira do posto
      // e o campo de estrelas inteiro. Daqui para lá não há Israel nenhum.
      b(31, { set: "a-orla-do-oriente", props: A_ORLA_DO_ORIENTE,
        env: { terrain: "desert", night: 0.8, glory: 0.18, storm: 0.1, fire: 0.36, water: 0.04, verdure: 0.08 }, cast: [
        C("cavaleiro", -128, "stand", { dy: 0.52, facing: 1, id: "jetur-filho-de-ismael" }),
        C("homem", 45, "raise", { dy: 0.68, facing: -1, id: "nafis-filho-de-ismael" }),
        C("homem", 195, "stand", { dy: 0.62, facing: -1, id: "quedema-filho-de-ismael" }),
      ] }),
      // v.32 — Quetura, a segunda casa de Abraão, e os seis filhos que
      // receberam presentes e foram mandados para o oriente. A tenda clara
      // aberta, o berço de vime, o fardo do dote já pronto ao lado da porta:
      // esta família está de partida desde que nasceu.
      b(32, { set: "a-tenda-de-quetura", props: A_TENDA_DE_QUETURA,
        env: { terrain: "field", night: 0.18, glory: 0.36, storm: 0.06, fire: 0.08, water: 0.04, verdure: 0.42 }, cast: [
        C("mulherComum", -40, "stand", { dy: 0.62, facing: 1, id: "quetura-concubina-de-abraao" }),
        C("homem", 118, "point", { dy: 0.68, facing: -1, id: "jocsa-filho-de-quetura" }),
        C("servo", 218, "walk", { dy: 0.74, facing: -1, id: "zinra-filho-de-quetura" }),
        C("homem", 300, "stand", { dy: 0.6, facing: -1, id: "meda-filho-de-quetura" }),
      ] }),
      // v.33 — os cinco filhos de Midiã são a gente com quem Moisés viveria
      // quarenta anos e contra quem Israel pelejaria depois. Aqui são só
      // tendas na borda do descampado, o rebanho de Efá solto e a estrada de
      // caravana passando reta pelo fundo.
      b(33, { set: "o-acampamento-de-midia", props: O_ACAMPAMENTO_DE_MIDIA,
        env: { terrain: "desert", night: 0.44, glory: 0.22, storm: 0.12, fire: 0.38, water: 0.04, verdure: 0.16 }, cast: [
        C("pastor", -155, "walk", { dy: 0.62, facing: 1, id: "efa-filho-de-midia" }),
        C("homem", 25, "stand", { dy: 0.7, facing: -1, id: "efer-filho-de-midia" }),
        C("homem", 130, "kneel", { dy: 0.66, facing: -1, id: "enoque-filho-de-midia" }),
        C("rebanho", 262, "stand", { dy: 0.74, facing: -1, id: "rebanho-de-efa" }),
      ] }),
      // v.34 — a conta se estreita outra vez: de Abraão fica Isaque, e de
      // Isaque ficam dois. O quintal com o poço reaberto do pai, a cerca, a
      // tenda do herdeiro — e o caçador saindo da moita com o arco. Uma casa
      // só, e dois mundos dentro dela.
      b(34, { set: "o-poco-de-isaque", props: O_POCO_DE_ISAQUE,
        env: { terrain: "field", night: 0.16, glory: 0.4, storm: 0.06, fire: 0.06, water: 0.04, verdure: 0.44 }, cast: [
        C("isaque", -140, "stand", { dy: 0.6, facing: 1, id: "isaque" }),
        C("esau", 205, "walk", { dy: 0.68, facing: -1, id: "esau" }),
        C("jaco", -15, "stand", { dy: 0.72, facing: -1, id: "jaco" }),
      ] }),
      // v.35 — Esaú e os seus cinco: a herança dele é pedra vermelha rachada de
      // sol, garganta estreita e nem um fio de água. Elifaz na frente, os
      // outros subindo o caminho — Edom começa a existir como lugar, não como
      // nome.
      b(35, { set: "as-serras-vermelhas-de-edom", props: AS_SERRAS_VERMELHAS_DE_EDOM,
        env: { terrain: "desert", night: 0.2, glory: 0.24, storm: 0.14, fire: 0.1, water: 0.03, verdure: 0.08 }, cast: [
        C("esau", -140, "point", { dy: 0.6, facing: 1, id: "esau" }),
        C("homem", 42, "stand", { dy: 0.68, facing: -1, id: "elifaz-filho-de-esau" }),
        C("homem", 175, "walk", { dy: 0.62, facing: -1, id: "reuel-filho-de-esau" }),
        C("servo", 262, "stand", { dy: 0.74, facing: -1, id: "core-filho-de-esau" }),
      ] }),
      // v.36 — no fim da lista dos filhos de Elifaz está AMALEQUE, e com ele o
      // primeiro crime deste capítulo: o povo que atacaria os cansados na
      // retaguarda de Israel. A seara ardendo baixo, a espada largada e a
      // carroça de saque virada. Temã, o irmão, é o oposto — dele virão os
      // sábios.
      b(36, { set: "o-campo-queimado-de-amaleque", props: O_CAMPO_QUEIMADO_DE_AMALEQUE,
        env: { terrain: "field", night: 0.56, glory: 0.06, storm: 0.6, fire: 0.86, water: 0.04, verdure: 0.1 }, cast: [
        C("homem", -175, "raise", { dy: 0.6, facing: 1, id: "amaleque" }),
        C("homem", -60, "lie", { dy: 0.76, facing: 1, scale: 1.3, id: "cansado-da-retaguarda" }),
        C("homem", 285, "stand", { dy: 0.64, facing: -1, id: "tema-filho-de-elifaz" }),
      ] }),
      // v.37 — a outra metade de Edom cria gado: Naate, Zerá, Samá e Mizá no
      // alto do planalto verde de inverno, com o muro de pedra do redil e o
      // rebanho espalhado. Depois do campo queimado, o texto respira.
      b(37, { set: "as-pastagens-de-reuel", props: AS_PASTAGENS_DE_REUEL,
        env: { terrain: "field", night: 0.14, glory: 0.36, storm: 0.08, fire: 0.05, water: 0.04, verdure: 0.7 }, cast: [
        C("pastor", -60, "walk", { dy: 0.62, facing: 1, id: "naate-filho-de-reuel" }),
        C("homem", 60, "stand", { dy: 0.7, facing: -1, id: "zera-filho-de-reuel" }),
        C("homem", 195, "point", { dy: 0.58, facing: -1, id: "sama-filho-de-reuel" }),
        C("rebanho", 300, "stand", { dy: 0.74, facing: -1, id: "rebanho-de-reuel" }),
      ] }),
      // v.38 — o Cronista abre um parêntese sobre quem já morava ali: os filhos
      // de SEIR, o horeu — e horeu quer dizer o que mora em buraco. A boca de
      // caverna aberta na rocha, a fogueira acesa dentro dela e o monte inteiro
      // fechando o céu.
      b(38, { set: "as-cavernas-de-seir", props: AS_CAVERNAS_DE_SEIR,
        env: { terrain: "mountain", night: 0.58, glory: 0.12, storm: 0.16, fire: 0.46, water: 0.05, verdure: 0.12 }, cast: [
        C("patriarca", -180, "stand", { dy: 0.6, facing: 1, id: "seir-o-horeu" }),
        C("homem", -25, "kneel", { dy: 0.7, facing: 1, id: "lota-filho-de-seir" }),
        C("homem", 118, "stand", { dy: 0.64, facing: -1, id: "sobal-filho-de-seir" }),
        C("homem", 245, "walk", { dy: 0.74, facing: -1, id: "zibeao-filho-de-seir" }),
      ] }),
      // v.39 — e no meio dos horeus o texto para para dizer o nome de uma
      // mulher: "E A IRMÃ DE LOTÃ FOI TIMNA". O quadro sai da caverna para a
      // fonte do monte, com a talha apoiada na borda da poça e a sombra fria
      // do meio da manhã.
      b(39, { set: "a-fonte-de-timna", props: A_FONTE_DE_TIMNA,
        env: { terrain: "mountain", night: 0.24, glory: 0.34, storm: 0.08, fire: 0.06, water: 0.26, verdure: 0.3 }, cast: [
        C("mulherComum", 20, "kneel", { dy: 0.64, facing: -1, id: "timna-irma-de-lota" }),
        C("homem", -140, "stand", { dy: 0.6, facing: 1, id: "hori-filho-de-lota" }),
        C("servo", 205, "walk", { dy: 0.72, facing: -1, id: "homa-filho-de-lota" }),
      ] }),
      // v.40 — os filhos de Sobal e os de Zibeão apascentavam as jumentas do
      // pai no descampado alto: dois animais soltos no capim ralo, o bebedouro
      // cavado no chão e o horizonte vazio. É o ofício, não o nome, que faz o
      // quadro.
      b(40, { set: "a-pastagem-dos-jumentos", props: A_PASTAGEM_DOS_JUMENTOS,
        env: { terrain: "field", night: 0.2, glory: 0.26, storm: 0.28, fire: 0.05, water: 0.04, verdure: 0.44 }, cast: [
        C("pastor", -215, "walk", { dy: 0.6, facing: 1, id: "alva-filho-de-sobal" }),
        C("homem", 30, "point", { dy: 0.7, facing: -1, id: "ana-filho-de-zibeao" }),
        C("servo", 178, "stand", { dy: 0.66, facing: -1, id: "aia-filho-de-zibeao" }),
      ] }),
      // v.41 — Disom e os seus quatro trabalham a pedra, que é o que a montanha
      // impõe a quem mora nela: o bloco meio serrado na bancada, as cunhas, o
      // caixote das ferramentas e o pó branco em tudo.
      b(41, { set: "a-pedreira-de-disom", props: A_PEDREIRA_DE_DISOM,
        env: { terrain: "mountain", night: 0.18, glory: 0.26, storm: 0.1, fire: 0.08, water: 0.05, verdure: 0.1 }, cast: [
        C("homem", -160, "point", { dy: 0.62, facing: 1, id: "disom-filho-de-ana" }),
        C("servo", -25, "kneel", { dy: 0.74, facing: 1, id: "hanrao-filho-de-disom" }),
        C("servo", 118, "write", { dy: 0.68, facing: -1, id: "esba-filho-de-disom" }),
        C("homem", 262, "stand", { dy: 0.6, facing: -1, id: "itra-filho-de-disom" }),
      ] }),
      // v.42 — os últimos horeus, acampados na borda do deserto de Uz: uma
      // fogueira, uma tenda baixa e o céu inteiro de estrelas sobre um povo que
      // daqui a pouco some da história para sempre.
      b(42, { set: "o-arraial-noturno-dos-horeus", props: O_ARRAIAL_NOTURNO_DOS_HOREUS,
        env: { terrain: "desert", night: 0.82, glory: 0.14, storm: 0.1, fire: 0.4, water: 0.04, verdure: 0.08 }, cast: [
        C("homem", -128, "kneel", { dy: 0.68, facing: 1, id: "bila-filho-de-eser" }),
        C("homem", 62, "stand", { dy: 0.62, facing: -1, id: "zaava-filho-de-eser" }),
        C("servo", 205, "walk", { dy: 0.72, facing: -1, id: "uz-filho-de-disa" }),
      ] }),
      // v.43 — ⭐ e agora a frase mais estranha do capítulo: estes reinaram em
      // Edom "ANTES QUE REINASSE REI SOBRE OS FILHOS DE ISRAEL". Bela, filho
      // de Beor, na praça de DINABÁ, com o trono posto diante da porta e a
      // coroa em cima do coxim. Edom tem corte enquanto Israel ainda é família.
      b(43, { set: "dinaba-a-primeira-cidade-real", props: DINABA_A_PRIMEIRA_CIDADE_REAL,
        env: { terrain: "city", night: 0.2, glory: 0.34, storm: 0.08, fire: 0.1, water: 0.04, verdure: 0.18 }, cast: [
        C("rei", -30, "stand", { dy: 0.58, facing: 1, id: "bela-filho-de-beor" }),
        C("anciao", 130, "bow", { dy: 0.66, facing: -1, id: "anciao-de-dinaba" }),
        C("servo", 235, "stand", { dy: 0.72, facing: -1, id: "servo-da-corte-de-dinaba" }),
      ] }),
      // v.44 — morto Bela, quem reina é Jobabe, e a coroa muda de cidade: BOZRA,
      // cujo nome quer dizer curral. Os muros de pedra escalonados na encosta, o
      // rebanho recolhido e as tinas de tinta da lã à porta — riqueza de
      // criador, não de conquistador.
      b(44, { set: "bozra-dos-apriscos", props: BOZRA_DOS_APRISCOS,
        env: { terrain: "city", night: 0.24, glory: 0.3, storm: 0.1, fire: 0.08, water: 0.04, verdure: 0.36 }, cast: [
        C("rei", -35, "point", { dy: 0.6, facing: 1, id: "jobabe-filho-de-zera" }),
        C("pastor", 138, "walk", { dy: 0.7, facing: -1, id: "pastor-de-bozra" }),
        C("rebanho", 262, "stand", { dy: 0.76, facing: -1, id: "rebanho-de-bozra" }),
      ] }),
      // v.45 — Husão vem "da terra dos temanitas", o país famoso pelos seus
      // sábios. Aqui a coroa se assenta num banco de pedra à sombra da porta,
      // com o rolo aberto no colo: neste reinado se resolve por palavra, não
      // por espada.
      b(45, { set: "a-terra-dos-temanitas", props: A_TERRA_DOS_TEMANITAS,
        env: { terrain: "city", night: 0.18, glory: 0.4, storm: 0.06, fire: 0.08, water: 0.04, verdure: 0.3 }, cast: [
        C("rei", -35, "write", { dy: 0.64, facing: 1, id: "husao-da-terra-dos-temanitas" }),
        C("anciao", 118, "stand", { dy: 0.6, facing: -1, id: "sabio-de-tema" }),
        C("anciao", 218, "bow", { dy: 0.7, facing: -1, id: "juiz-da-porta-de-tema" }),
      ] }),
      // v.46 — ⭐ o único feito de armas de toda a lista: Hadade, filho de
      // Bedade, "ESTE FERIU OS MIDIANITAS NO CAMPO DE MOABE". Descampado a
      // leste do mar Salgado, as armas caídas no chão pisado, os vencidos por
      // terra e, muito ao fundo, a torre de AVITE, a cidade para onde ele
      // voltou.
      b(46, { set: "o-campo-de-moabe", props: O_CAMPO_DE_MOABE,
        env: { terrain: "field", night: 0.48, glory: 0.1, storm: 0.72, fire: 0.14, water: 0.04, verdure: 0.16 }, cast: [
        C("rei", -150, "raise", { dy: 0.6, facing: 1, id: "hadade-filho-de-bedade" }),
        C("homem", 30, "lie", { dy: 0.76, facing: -1, scale: 1.3, id: "midianita-ferido-em-moabe" }),
        C("homem", 128, "lie", { dy: 0.68, facing: 1, scale: 1.2, id: "segundo-midianita-ferido" }),
        C("homem", 235, "walk", { dy: 0.62, facing: -1, id: "soldado-de-avite" }),
      ] }),
      // v.47 — Samlá vem de MASRECA, e o nome da cidade quer dizer vinhedo. A
      // coroa passa da guerra para a vindima: bacelos em terraço, cachos
      // maduros, a talha do lagar e o muro de pedra solta que segura a terra.
      b(47, { set: "as-vinhas-de-masreca", props: AS_VINHAS_DE_MASRECA,
        env: { terrain: "field", night: 0.16, glory: 0.4, storm: 0.06, fire: 0.06, water: 0.04, verdure: 0.78 }, cast: [
        C("rei", -230, "stand", { dy: 0.6, facing: 1, id: "samla-de-masreca" }),
        C("servo", -95, "kneel", { dy: 0.74, facing: 1, id: "vindimador-de-masreca" }),
        C("homem", 118, "walk", { dy: 0.7, facing: -1, id: "lagareiro-de-masreca" }),
      ] }),
      // v.48 — o rei seguinte também se chama Saul, e é o único da lista cuja
      // cidade se descreve por uma água: REOBOTE, JUNTO AO RIO. O rio largo
      // rente às casas, o embarcadouro, o poço da praça e os tamareiros das
      // duas margens.
      b(48, { set: "reobote-junto-ao-rio", props: REOBOTE_JUNTO_AO_RIO,
        env: { terrain: "city", night: 0.2, glory: 0.34, storm: 0.06, fire: 0.06, water: 0.38, verdure: 0.5 }, cast: [
        C("rei", -95, "point", { dy: 0.6, facing: 1, id: "saul-de-reobote" }),
        C("servo", 92, "walk", { dy: 0.72, facing: -1, id: "barqueiro-de-reobote" }),
        C("mulherComum", 235, "stand", { dy: 0.66, facing: -1, id: "mulher-do-poco-de-reobote" }),
      ] }),
      // v.49 — Baal-Hanã, filho de Acbor, é o reinado sem feito nenhum: nem
      // guerra, nem cidade descrita, nem mulher nomeada. O pátio interno, o
      // trono debaixo do alpendre, o candeeiro aceso de tarde e a porta
      // fechada. Um reino que só passa.
      b(49, { set: "a-casa-de-acbor", props: A_CASA_DE_ACBOR,
        env: { terrain: "city", night: 0.44, glory: 0.18, storm: 0.08, fire: 0.2, water: 0.05, verdure: 0.1 }, cast: [
        C("rei", 25, "stand", { dy: 0.6, facing: -1, id: "baal-hana-filho-de-acbor" }),
        C("servo", -160, "bow", { dy: 0.7, facing: 1, id: "servo-da-casa-de-acbor" }),
      ] }),
      // v.50 — ⭐ o oitavo e último rei, Hadade, da cidade de PAÍ — e aqui o
      // Cronista faz uma coisa que não fez com nenhum israelita desta página:
      // guarda o nome da mulher, o da mãe dela e o da avó. MEETABEL, FILHA DE
      // MATREDE, FILHA DE ME-ZAABE. Duas cadeiras no trono, e a luz mais
      // dourada de Edom.
      b(50, { set: "pai-e-a-rainha-meetabel", props: PAI_E_A_RAINHA_MEETABEL,
        env: { terrain: "city", night: 0.22, glory: 0.56, storm: 0.05, fire: 0.16, water: 0.04, verdure: 0.2 }, cast: [
        C("rei", -95, "stand", { dy: 0.6, facing: 1, id: "hadade-de-pai" }),
        C("mulherComum", -20, "stand", { dy: 0.64, facing: -1, id: "meetabel-mulher-de-hadade" }),
        C("mulherComum", 175, "walk", { dy: 0.72, facing: -1, id: "matrede-mae-de-meetabel" }),
      ] }),
      // v.51 — "E, MORRENDO HADADE, FORAM PRÍNCIPES EM EDOM". Acabaram os reis:
      // o assento fica abandonado no meio do salão, a coroa caída ao pé dele, e
      // três chefes de clã de pé, sem ninguém para se curvar. Timna, Alva e
      // Jetete abrem a última lista do capítulo.
      b(51, { set: "o-trono-vazio-de-edom", props: O_TRONO_VAZIO_DE_EDOM,
        env: { terrain: "city", night: 0.52, glory: 0.1, storm: 0.24, fire: 0.1, water: 0.04, verdure: 0.08 }, cast: [
        C("anciao", -145, "stand", { dy: 0.6, facing: 1, id: "principe-timna-de-edom" }),
        C("homem", 128, "stand", { dy: 0.66, facing: -1, id: "principe-alva-de-edom" }),
        C("homem", 232, "point", { dy: 0.58, facing: -1, id: "principe-jetete-de-edom" }),
      ] }),
      // v.52 — Oolibama, Elá e Pinom: Pinom é o cobre de Edom, o ofício que
      // sustentava estes príncipes quando já não havia coroa. As fornalhas
      // acesas no fundo do vale, o minério empilhado, a escória e o paredão
      // furado de galerias.
      b(52, { set: "as-minas-de-pinom", props: AS_MINAS_DE_PINOM,
        env: { terrain: "mountain", night: 0.5, glory: 0.14, storm: 0.24, fire: 0.9, water: 0.05, verdure: 0.08 }, cast: [
        C("homem", -212, "point", { dy: 0.6, facing: 1, id: "principe-oolibama-de-edom" }),
        C("servo", -60, "kneel", { dy: 0.74, facing: 1, id: "fundidor-de-pinom" }),
        C("homem", 205, "stand", { dy: 0.62, facing: -1, id: "principe-ela-de-edom" }),
        C("servo", 300, "walk", { dy: 0.7, facing: -1, id: "principe-pinom-de-edom" }),
      ] }),
      // v.53 — Quenaz, Temã e Mibzar: Mibzar quer dizer praça-forte, e o quadro
      // é exatamente isso — a torre de guarda na crista, a porta reforçada e as
      // lanças encostadas no muro. Edom já não tem rei; tem guarnição.
      b(53, { set: "a-fortaleza-de-mibzar", props: A_FORTALEZA_DE_MIBZAR,
        env: { terrain: "mountain", night: 0.38, glory: 0.16, storm: 0.3, fire: 0.1, water: 0.05, verdure: 0.14 }, cast: [
        C("homem", -215, "stand", { dy: 0.6, facing: 1, id: "principe-quenaz-de-edom" }),
        C("anciao", -25, "point", { dy: 0.68, facing: 1, id: "principe-tema-de-edom" }),
        C("homem", 205, "stand", { dy: 0.62, facing: -1, id: "principe-mibzar-de-edom" }),
      ] }),
      // v.54 — Magdiel e Irã, e acabou. O capítulo que começou em Adão termina
      // com dois nomes que ninguém mais cita: as cristas de Seir enfileiradas
      // até o horizonte, uma torre em cada cabeço, a estrada vazia por baixo e
      // a lua nascendo sobre um povo que já deu tudo o que tinha para dar.
      b(54, { set: "edom-ao-cair-da-noite", props: EDOM_AO_CAIR_DA_NOITE,
        env: { terrain: "mountain", night: 0.78, glory: 0.12, storm: 0.14, fire: 0.06, water: 0.05, verdure: 0.12 }, cast: [
        C("homem", -128, "stand", { dy: 0.62, facing: 1, id: "principe-magdiel-de-edom" }),
        C("anciao", 45, "walk", { dy: 0.7, facing: -1, id: "principe-ira-de-edom" }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ 1Cr 2
  2: {
    start: { terrain: "field", night: 0.18, glory: 0.32, storm: 0.1, fire: 0.1, water: 0.12, verdure: 0.46 },
    beats: [
      // v.1 — depois de setenta nações, a conta chega em casa: doze nomes, e
      // um povo que ainda cabe num campo. O arraial visto de dentro, com as
      // tendas das famílias em fileira e a trombeta do ajuntamento pousada na
      // pedra. Rúben é o primogênito, mas quem o texto vai seguir é Judá.
      b(1, { set: "o-arraial-das-doze-tribos", props: O_ARRAIAL_DAS_DOZE_TRIBOS,
        env: { terrain: "field", night: 0.14, glory: 0.4, storm: 0.06, fire: 0.12, water: 0.04, verdure: 0.56 }, cast: [
        C("patriarca", -195, "stand", { dy: 0.58, facing: 1, id: "ruben-filho-de-israel" }),
        C("homem", -55, "point", { dy: 0.66, facing: 1, id: "juda" }),
        C("homem", 92, "stand", { dy: 0.62, facing: -1, id: "levi-filho-de-israel" }),
        C("servo", 245, "walk", { dy: 0.72, facing: -1, id: "zebulom-filho-de-israel" }),
      ] }),
      // v.2 — a outra banda do arraial, no fim da tarde: Dã, José, Benjamim,
      // Naftali, Gade e Aser. Mesmo lugar, outra hora e outras caras — a lista
      // que fecha os doze é a única deste capítulo que o Cronista não vai
      // desdobrar em ofício nenhum.
      b(2, {
        env: { terrain: "field", night: 0.4, glory: 0.28, storm: 0.08, fire: 0.3, water: 0.04, verdure: 0.5 }, cast: [
        C("homem", 205, "stand", { dy: 0.6, facing: -1, id: "da-filho-de-israel" }),
        C("homem", 60, "raise", { dy: 0.7, facing: -1, id: "jose-filho-de-israel" }),
        C("servo", -95, "walk", { dy: 0.64, facing: 1, id: "benjamim-filho-de-israel" }),
        C("pastor", -262, "stand", { dy: 0.72, facing: 1, id: "aser-filho-de-israel" }),
      ] }),
      // v.3 — ⭐ e a casa escolhida começa com um filho morto por Deus: "ER, O
      // PRIMOGÊNITO DE JUDÁ, FOI MAU AOS OLHOS DO SENHOR, PELO QUE O MATOU". É
      // o único ato divino de todo o arquivo, e é MUDO: nenhuma voz, nenhum
      // profeta, nenhuma glória. Só a esteira no chão, o candeeiro apagando e
      // o pai curvado ao lado da cananeia, mãe dos três.
      b(3, { set: "a-noite-de-quezibe", props: A_NOITE_DE_QUEZIBE,
        env: { terrain: "city", night: 0.9, glory: 0.02, storm: 0.34, fire: 0.1, water: 0.03, verdure: 0.04 }, cast: [
        C("homem", 15, "lie", { dy: 0.78, facing: 1, scale: 1.35, id: "er-primogenito-de-juda" }),
        C("homem", -108, "bow", { dy: 0.66, facing: -1, id: "juda" }),
        C("mulherComum", 138, "kneel", { dy: 0.62, facing: -1, id: "filha-de-sua-a-cananeia" }),
        C("servo", 258, "stand", { dy: 0.7, facing: -1, id: "sela-filho-de-juda" }),
      ] }),
      // v.4 — quem salva a linhagem não é um filho, é a nora: "PORÉM TAMAR, SUA
      // NORA, LHE DEU À LUZ PEREZ E ZERÁ". A noite de Quezibe vira o amanhecer
      // da encruzilhada de Enaim, com o rebanho da tosquia passando ao longe e
      // a primeira luz batendo de raspão no chão.
      b(4, { set: "a-porta-de-enaim-ao-amanhecer", props: A_PORTA_DE_ENAIM_AO_AMANHECER,
        env: { terrain: "field", night: 0.42, glory: 0.5, storm: 0.06, fire: 0.06, water: 0.04, verdure: 0.44 }, cast: [
        C("mulherComum", -40, "stand", { dy: 0.62, facing: 1, id: "tamar", glow: 0.35 }),
        C("servo", 108, "stand", { dy: 0.72, facing: -1, id: "perez-filho-de-juda" }),
        C("servo", 178, "walk", { dy: 0.66, facing: -1, id: "zera-filho-de-juda" }),
      ] }),
      // v.5 — Hezrom e Hamul, os dois filhos de Perez, herdam uma eira: o
      // terreiro batido, os feixes empilhados, a talha do grão e o gado de
      // trilha na eira. A linha que chegará a Davi começa num lugar de
      // trabalho, não num palácio.
      b(5, { set: "a-eira-da-casa-de-perez", props: A_EIRA_DA_CASA_DE_PEREZ,
        env: { terrain: "field", night: 0.1, glory: 0.4, storm: 0.05, fire: 0.06, water: 0.04, verdure: 0.6 }, cast: [
        C("homem", -150, "kneel", { dy: 0.66, facing: 1, id: "hezrom-filho-de-perez" }),
        C("homem", 118, "walk", { dy: 0.74, facing: -1, id: "hamul-filho-de-perez" }),
        C("rebanho", 262, "stand", { dy: 0.6, facing: -1, id: "gado-de-trilha-da-casa-de-perez" }),
      ] }),
      // v.6 — os filhos de Zerá não são lavradores: Etã, Hemã, Calcol e Dara
      // são os quatro nomes com que, séculos depois, se mediria a sabedoria de
      // Salomão (1Rs 4:31). A sala de estudo à noite, o rolo aberto na mesa
      // baixa, a harpa na parede e o candelabro de sete braços aceso.
      b(6, { set: "a-casa-dos-sabios-de-zera", props: A_CASA_DOS_SABIOS_DE_ZERA,
        env: { terrain: "city", night: 0.66, glory: 0.4, storm: 0.04, fire: 0.34, water: 0.04, verdure: 0.06 }, cast: [
        C("anciao", -105, "write", { dy: 0.68, facing: 1, id: "eta-filho-de-zera" }),
        C("homem", 118, "stand", { dy: 0.6, facing: -1, id: "hema-filho-de-zera" }),
        C("homem", 205, "point", { dy: 0.72, facing: -1, id: "calcol-filho-de-zera" }),
        C("servo", 285, "stand", { dy: 0.64, facing: -1, id: "dara-filho-de-zera" }),
      ] }),
      // v.7 — ⭐ e no meio dos sábios entra o contrário deles: ACAR, "O
      // PERTURBADOR DE ISRAEL, QUE PECOU NO ANÁTEMA". O vale de Acor, o montão
      // de pedras levantado sobre o que ele escondeu debaixo da tenda, o resto
      // da fogueira em que tudo foi queimado — e nem uma folha verde no quadro.
      // Nenhum brilho sobre o amaldiçoado.
      b(7, { set: "o-vale-de-acor", props: O_VALE_DE_ACOR,
        env: { terrain: "mountain", night: 0.72, glory: 0.04, storm: 0.72, fire: 0.42, water: 0.03, verdure: 0.03 }, cast: [
        C("homem", -160, "lie", { dy: 0.76, facing: 1, scale: 1.35, id: "acar-perturbador" }),
        C("homem", 108, "point", { dy: 0.64, facing: -1, id: "homem-do-anatema-de-acor" }),
        C("homem", 248, "stand", { dy: 0.7, facing: -1, id: "carmi-pai-de-acar" }),
      ] }),
      // v.8 — uma linha só, e é de alívio: "E O FILHO DE ETÃ FOI AZARIAS". Do
      // vale do anátema o texto salta para o pátio de um escriba na manhã
      // seguinte — a banca junto à janela, o rolo novo, o tinteiro. O ofício do
      // pai passou inteiro para o filho.
      b(8, { set: "o-patio-do-escriba-de-azarias", props: O_PATIO_DO_ESCRIBA_DE_AZARIAS,
        env: { terrain: "city", night: 0.24, glory: 0.44, storm: 0.05, fire: 0.1, water: 0.04, verdure: 0.4 }, cast: [
        C("homem", 62, "write", { dy: 0.7, facing: -1, id: "azarias-filho-de-eta" }),
        C("anciao", -95, "stand", { dy: 0.62, facing: 1, id: "eta-filho-de-zera" }),
      ] }),
      // v.9 — Jerameel, Rão e Quelubai são os três ramos que o resto do
      // capítulo vai percorrer. A terra deles é o sul seco: a cisterna de
      // inverno tapada com pedra, o muro de pedra do redil e o descampado amarelo
      // até onde a vista alcança.
      b(9, { set: "o-neguebe-de-jerameel", props: O_NEGUEBE_DE_JERAMEEL,
        env: { terrain: "desert", night: 0.12, glory: 0.3, storm: 0.06, fire: 0.06, water: 0.04, verdure: 0.14 }, cast: [
        C("homem", -215, "stand", { dy: 0.6, facing: 1, id: "jerameel-primogenito-de-hezrom" }),
        C("homem", -35, "walk", { dy: 0.7, facing: 1, id: "rao-filho-de-hezrom" }),
        C("pastor", 178, "point", { dy: 0.64, facing: -1, id: "quelubai-filho-de-hezrom" }),
        C("rebanho", 285, "stand", { dy: 0.74, facing: -1, id: "rebanho-de-jerameel" }),
      ] }),
      // v.10 — NAASSOM, "PRÍNCIPE DOS FILHOS DE JUDÁ": não é um nome de
      // passagem, é o homem que marchava à frente de todo o arraial no deserto
      // (Nm 10:14). Por isso o quadro é a partida — a trombeta da tribo, a
      // lança do porta-estandarte e a tenda já desarmada.
      b(10, { set: "o-estandarte-de-juda-no-deserto", props: O_ESTANDARTE_DE_JUDA_NO_DESERTO,
        env: { terrain: "desert", night: 0.1, glory: 0.46, storm: 0.05, fire: 0.06, water: 0.04, verdure: 0.12 }, cast: [
        C("homem", -60, "raise", { dy: 0.6, facing: 1, id: "naassom" }),
        C("homem", 118, "walk", { dy: 0.7, facing: 1, id: "aminadabe-pai-de-naassom" }),
        C("servo", 262, "stand", { dy: 0.66, facing: -1, id: "porta-estandarte-de-juda" }),
      ] }),
      // v.11 — de Salma sai BOAZ, e Boaz é um campo de cevada na tarde da
      // colheita: os feixes atados de pé em fileira, a talha da água dos moços
      // e a eira ao fundo. É esta seara que faz dele um nome nesta lista.
      b(11, { set: "a-seara-de-boaz-em-belem", props: A_SEARA_DE_BOAZ_EM_BELEM,
        env: { terrain: "field", night: 0.2, glory: 0.44, storm: 0.05, fire: 0.06, water: 0.04, verdure: 0.66 }, cast: [
        C("homem", -35, "point", { dy: 0.62, facing: -1, id: "boaz" }),
        C("servo", 138, "kneel", { dy: 0.72, facing: -1, id: "ceifeiro-da-seara-de-boaz" }),
        C("homem", 258, "stand", { dy: 0.58, facing: -1, id: "salma-pai-de-boaz" }),
      ] }),
      // v.12 — Obede e Jessé: o quintal da casa que dará um rei, com o forno de
      // barro aceso para a ceia, o muro do redil encostado na casa e a videira por
      // cima do alpendre. A tarde caindo sobre a família mais comum de Belém.
      b(12, { set: "a-casa-de-jesse-em-belem", props: A_CASA_DE_JESSE_EM_BELEM,
        env: { terrain: "city", night: 0.46, glory: 0.32, storm: 0.06, fire: 0.4, water: 0.04, verdure: 0.42 }, cast: [
        C("anciao", -215, "stand", { dy: 0.62, facing: 1, id: "obede-filho-de-boaz" }),
        C("homem", -20, "walk", { dy: 0.72, facing: 1, id: "jesse" }),
        C("rebanho", 258, "stand", { dy: 0.66, facing: -1, id: "rebanho-da-casa-de-jesse" }),
      ] }),
      // v.13 — os três mais velhos de Jessé são homens de guerra: Eliabe,
      // Abinadabe e Siméia seguiriam Saul ao vale de Elá. A rua de Belém ao
      // meio-dia, o arco da porta, o banco de pedra — e três irmãos altos que
      // um profeta ainda olharia e recusaria.
      b(13, { set: "a-porta-de-belem-ao-meio-dia", props: A_PORTA_DE_BELEM_AO_MEIO_DIA,
        env: { terrain: "city", night: 0.08, glory: 0.36, storm: 0.05, fire: 0.06, water: 0.04, verdure: 0.3 }, cast: [
        C("homem", -125, "stand", { dy: 0.6, facing: 1, id: "eliabe-irmao-de-davi" }),
        C("homem", 30, "point", { dy: 0.7, facing: -1, id: "abinadabe-filho-de-jesse" }),
        C("homem", 128, "stand", { dy: 0.64, facing: -1, id: "simeia-filho-de-jesse" }),
      ] }),
      // v.14 — Natanael, o quarto, e Radai, o quinto: a mesma rua no fim da
      // tarde, com a luz de lado e a vila esvaziando. Dois nomes que a
      // Escritura não volta a citar — e é justamente por isso que o Cronista os
      // conta.
      b(14, {
        env: { terrain: "city", night: 0.34, glory: 0.34, storm: 0.06, fire: 0.14, water: 0.04, verdure: 0.3 }, cast: [
        C("homem", 175, "walk", { dy: 0.66, facing: -1, id: "natanael-filho-de-jesse" }),
        C("servo", 45, "stand", { dy: 0.74, facing: -1, id: "radai-filho-de-jesse" }),
      ] }),
      // v.15 — ⭐ "OZÉM, O SEXTO, DAVI, O SÉTIMO". O caçula não está na rua com
      // os irmãos: está no pasto atrás de Belém, com o rebanho, a harpa pousada
      // na pedra e a primeira estrela saindo. O quadro mais quieto do capítulo,
      // e aquele para o qual toda a genealogia estava andando.
      b(15, { set: "o-pasto-do-setimo-filho", props: O_PASTO_DO_SETIMO_FILHO,
        env: { terrain: "field", night: 0.4, glory: 0.6, storm: 0.05, fire: 0.08, water: 0.04, verdure: 0.56 }, cast: [
        C("pastor", 15, "stand", { dy: 0.66, facing: -1, id: "davi", glow: 0.42 }),
        C("homem", -155, "walk", { dy: 0.6, facing: 1, id: "ozem-filho-de-jesse" }),
        C("rebanho", 262, "stand", { dy: 0.74, facing: -1, id: "rebanho-de-davi-em-belem" }),
      ] }),
      // v.16 — e o texto nomeia as duas irmãs, coisa rara: ZERUIA e ABIGAIL. Do
      // terreiro delas sairão Abisai, Joabe e Asael — os três capitães que
      // farão e desfarão o reinado do tio. A espada e a lança já estão
      // encostadas na parede sem que ninguém tenha decidido nada.
      b(16, { set: "o-terreiro-das-duas-irmas", props: O_TERREIRO_DAS_DUAS_IRMAS,
        env: { terrain: "city", night: 0.3, glory: 0.3, storm: 0.14, fire: 0.3, water: 0.04, verdure: 0.2 }, cast: [
        C("mulherComum", -185, "stand", { dy: 0.6, facing: 1, id: "zeruia-irma-de-davi" }),
        C("mulherComum", -105, "stand", { dy: 0.68, facing: 1, id: "abigail-irma-de-davi" }),
        C("homem", 30, "stand", { dy: 0.64, facing: -1, id: "joabe" }),
        C("homem", 130, "point", { dy: 0.72, facing: -1, id: "abisai" }),
        C("servo", 248, "walk", { dy: 0.58, facing: -1, id: "asael" }),
      ] }),
      // v.17 — Abigail casa fora de Israel: "o pai de Amasa foi Jeter, O
      // ISMAELITA". A tenda escura de pelo de cabra na borda do Neguebe, o
      // jumento do dote e a fogueira do noivado — a casa de Davi tem sangue do
      // deserto, e o Cronista escreve isso sem constrangimento.
      b(17, { set: "as-tendas-de-jeter-o-ismaelita", props: AS_TENDAS_DE_JETER_O_ISMAELITA,
        env: { terrain: "desert", night: 0.5, glory: 0.28, storm: 0.08, fire: 0.42, water: 0.04, verdure: 0.1 }, cast: [
        C("homem", -60, "stand", { dy: 0.62, facing: 1, id: "jeter-o-ismaelita" }),
        C("mulherComum", 40, "stand", { dy: 0.68, facing: -1, id: "abigail-irma-de-davi" }),
        C("servo", 235, "stand", { dy: 0.72, facing: -1, id: "amasa" }),
      ] }),
      // v.18 — o texto vira para a outra casa: Calebe, filho de Hezrom, com
      // Azuba, sua mulher, e três filhos. O pátio cheio, a porta aberta de par
      // em par, o tear armado à sombra e a manhã inteira pela frente. Ainda não
      // morreu ninguém nesta família.
      b(18, { set: "a-casa-de-calebe-com-azuba", props: A_CASA_DE_CALEBE_COM_AZUBA,
        env: { terrain: "city", night: 0.14, glory: 0.42, storm: 0.05, fire: 0.1, water: 0.04, verdure: 0.46 }, cast: [
        C("homem", -95, "point", { dy: 0.62, facing: 1, id: "calebe-filho-de-hezrom" }),
        C("mulherComum", 35, "stand", { dy: 0.66, facing: -1, id: "azuba-mulher-de-calebe" }),
        C("servo", 148, "walk", { dy: 0.74, facing: -1, id: "jeser-filho-de-calebe" }),
        C("servo", 245, "stand", { dy: 0.6, facing: -1, id: "sobabe-filho-de-calebe" }),
      ] }),
      // v.19 — "E MORREU AZUBA; E CALEBE TOMOU PARA SI A EFRATE". O mesmo
      // terreno visto do outro lado, no fim da tarde: de um lado o montão de
      // pedras da cova recém-fechada, do outro a tenda nova e o berço de Hur.
      // Um luto e um começo no mesmo enquadramento.
      b(19, { set: "a-sepultura-de-azuba", props: A_SEPULTURA_DE_AZUBA,
        env: { terrain: "field", night: 0.5, glory: 0.24, storm: 0.3, fire: 0.06, water: 0.04, verdure: 0.34 }, cast: [
        C("homem", -95, "bow", { dy: 0.66, facing: -1, id: "calebe-filho-de-hezrom" }),
        C("mulherComum", 205, "stand", { dy: 0.62, facing: -1, id: "efrate-mulher-de-calebe" }),
        C("servo", 285, "stand", { dy: 0.72, facing: -1, id: "hur-filho-de-efrate" }),
      ] }),
      // v.20 — ⭐ e três nomes depois aparece o primeiro artista da Bíblia:
      // "URI GEROU A BEZALEEL", aquele de quem se diz que Deus o encheu do seu
      // Espírito "em sabedoria, e em entendimento, e em ciência, e em todo o
      // lavor" (Êx 31:3). A forja acesa, as bacias de ouro batido e o
      // candelabro de sete braços meio lavrado na bancada.
      b(20, { set: "a-oficina-de-bezaleel", props: A_OFICINA_DE_BEZALEEL,
        env: { terrain: "city", night: 0.44, glory: 0.66, storm: 0.04, fire: 0.72, water: 0.05, verdure: 0.06 }, cast: [
        C("homem", -35, "kneel", { dy: 0.72, facing: 1, id: "bezaleel-filho-de-uri", glow: 0.45 }),
        C("homem", 108, "stand", { dy: 0.62, facing: -1, id: "uri-filho-de-hur" }),
        C("anciao", 235, "point", { dy: 0.58, facing: -1, id: "hur-filho-de-efrate" }),
      ] }),
      // v.21 — o Cronista larga a idade do noivo por escrito: Hezrom coabitou
      // com a filha de Maquir "SENDO ELE DE SESSENTA ANOS". O que veio junto
      // foi Gileade: carvalhal fechado do outro lado do Jordão, gado gordo no
      // pasto alto e o riacho da encosta. A melhor pastagem de Israel entrou na
      // família por um casamento tardio.
      b(21, { set: "os-carvalhais-de-gileade", props: OS_CARVALHAIS_DE_GILEADE,
        env: { terrain: "field", night: 0.16, glory: 0.4, storm: 0.06, fire: 0.06, water: 0.24, verdure: 0.9 }, cast: [
        C("patriarca", -128, "stand", { dy: 0.62, facing: 1, id: "hezrom-filho-de-perez" }),
        C("mulherComum", -30, "stand", { dy: 0.68, facing: -1, id: "filha-de-maquir" }),
        C("servo", 205, "walk", { dy: 0.74, facing: -1, id: "segube-filho-de-hezrom" }),
        C("rebanho", 92, "stand", { dy: 0.58, facing: -1, id: "gado-de-gileade" }),
      ] }),
      // v.22 — Jair "TINHA VINTE E TRÊS CIDADES NA TERRA DE GILEADE": uma
      // herança que não se anda a pé. Três povoados visíveis de uma só vez,
      // cada um no seu cabeço, a estrada de terra ligando um ao outro e o
      // cavalo do dono no meio do quadro.
      b(22, { set: "as-cidades-de-jair", props: AS_CIDADES_DE_JAIR,
        env: { terrain: "field", night: 0.12, glory: 0.44, storm: 0.05, fire: 0.06, water: 0.04, verdure: 0.66 }, cast: [
        C("homem", -55, "point", { dy: 0.64, facing: 1, id: "jair-filho-de-segube" }),
        C("servo", 205, "walk", { dy: 0.72, facing: -1, id: "morador-das-cidades-de-jair" }),
      ] }),
      // v.23 — e uma linha depois tudo se perde: "E GESUR E ARÃ TOMARAM DELES
      // AS ALDEIAS DE JAIR, E QUENATE, E SEUS LUGARES, SESSENTA CIDADES". A
      // porta arrombada, a lança fincada na praça, o carro de guerra parado
      // onde não devia estar e a fumaça baixa nos telhados. Sessenta cidades
      // trocam de dono dentro de uma genealogia.
      b(23, { set: "as-aldeias-tomadas-por-gesur", props: AS_ALDEIAS_TOMADAS_POR_GESUR,
        env: { terrain: "city", night: 0.58, glory: 0.06, storm: 0.76, fire: 0.6, water: 0.04, verdure: 0.16 }, cast: [
        C("homem", -195, "raise", { dy: 0.62, facing: 1, id: "guerreiro-de-gesur" }),
        C("homem", -60, "lie", { dy: 0.78, facing: -1, scale: 1.3, id: "morador-de-quenate-ferido" }),
        C("homem", 205, "stand", { dy: 0.66, facing: -1, id: "guerreiro-de-ara" }),
      ] }),
      // v.24 — Asur nasce depois do pai morrer, e o filho póstumo vira "PAI DE
      // TECOA" — a vila dos pastores e dos sicômoros no deserto de Judá, de
      // onde sairiam Amós e a sábia que enganou Davi. O planalto de pedra, o
      // sicômoro solitário e o aprisco.
      b(24, { set: "os-altos-de-tecoa", props: OS_ALTOS_DE_TECOA,
        env: { terrain: "desert", night: 0.2, glory: 0.36, storm: 0.08, fire: 0.06, water: 0.04, verdure: 0.24 }, cast: [
        C("mulherComum", -215, "stand", { dy: 0.62, facing: 1, id: "abia-mulher-de-hezrom" }),
        C("homem", -35, "point", { dy: 0.7, facing: 1, id: "asur-pai-de-tecoa" }),
        C("pastor", 178, "walk", { dy: 0.66, facing: -1, id: "pastor-de-tecoa" }),
        C("rebanho", 285, "stand", { dy: 0.74, facing: -1, id: "rebanho-de-tecoa" }),
      ] }),
      // v.25 — a conta volta ao ramo mais velho, o de Jerameel, e ao mesmo sul
      // seco — agora com a luz virando: a cisterna aberta com a corda na
      // roldana, o bebedouro cheio e as sombras compridas de cinco filhos que
      // ainda não têm história nenhuma.
      b(25, { set: "a-cisterna-de-jerameel-ao-entardecer", props: A_CISTERNA_DE_JERAMEEL_AO_ENTARDECER,
        env: { terrain: "desert", night: 0.34, glory: 0.34, storm: 0.06, fire: 0.08, water: 0.04, verdure: 0.16 }, cast: [
        C("patriarca", -215, "stand", { dy: 0.6, facing: 1, id: "jerameel-primogenito-de-hezrom" }),
        C("homem", -35, "kneel", { dy: 0.72, facing: 1, id: "rao-primogenito-de-jerameel" }),
        C("homem", 148, "walk", { dy: 0.66, facing: -1, id: "buna-filho-de-jerameel" }),
        C("servo", 262, "stand", { dy: 0.6, facing: -1, id: "ozem-filho-de-jerameel" }),
      ] }),
      // v.26 — "TEVE TAMBÉM JERAMEEL AINDA OUTRA MULHER CUJO NOME ERA ATARA":
      // uma casa própria, armada à parte, com o tear de pé e o berço. O
      // Cronista guarda o nome dela porque a linha de Onã passa por ali, e não
      // pela primeira mulher.
      b(26, { set: "a-tenda-de-atara", props: A_TENDA_DE_ATARA,
        env: { terrain: "field", night: 0.16, glory: 0.4, storm: 0.05, fire: 0.08, water: 0.04, verdure: 0.44 }, cast: [
        C("mulherComum", -60, "stand", { dy: 0.64, facing: 1, id: "atara-mulher-de-jerameel" }),
        C("servo", 130, "stand", { dy: 0.74, facing: -1, id: "ona-filho-de-atara" }),
      ] }),
      // v.27 — Maaz, Jamim e Equer herdam um pedaço de terra e nada mais: o
      // campo arado de fresco com a leira ainda escura, o feixe do primeiro
      // corte, a enxada largada e a nuvem de chuva chegando por cima do muro do
      // lindeiro.
      b(27, { set: "a-roca-dos-filhos-de-rao", props: A_ROCA_DOS_FILHOS_DE_RAO,
        env: { terrain: "field", night: 0.26, glory: 0.24, storm: 0.44, fire: 0.05, water: 0.04, verdure: 0.56 }, cast: [
        C("homem", -145, "kneel", { dy: 0.68, facing: 1, id: "maaz-filho-de-rao" }),
        C("servo", 15, "walk", { dy: 0.76, facing: -1, id: "jamim-filho-de-rao" }),
        C("homem", 160, "stand", { dy: 0.62, facing: -1, id: "equer-filho-de-rao" }),
      ] }),
      // v.28 — Samai e Jada, e os filhos de Samai: uma casa que vive de gado
      // miúdo. O muro de pedra solta do redil, o espinheiro da porteira, o cocho e a
      // colina pelada por trás. Duas gerações e um único ofício.
      b(28, { set: "o-curral-de-samai", props: O_CURRAL_DE_SAMAI,
        env: { terrain: "field", night: 0.14, glory: 0.34, storm: 0.06, fire: 0.06, water: 0.04, verdure: 0.44 }, cast: [
        C("pastor", -195, "point", { dy: 0.62, facing: 1, id: "samai-filho-de-ona" }),
        C("homem", 45, "stand", { dy: 0.7, facing: -1, id: "nadabe-filho-de-samai" }),
        C("servo", 235, "walk", { dy: 0.74, facing: -1, id: "abisur-filho-de-samai" }),
        C("rebanho", 120, "stand", { dy: 0.56, facing: -1, id: "rebanho-do-curral-de-samai" }),
      ] }),
      // v.29 — a terceira mãe nomeada em poucas páginas: "E O NOME DA MULHER DE
      // ABISUR ERA ABIAIL". O pátio varrido, os dois berços de vime lado a
      // lado, a romãzeira e a parede caiada pegando o sol da manhã.
      b(29, { set: "o-patio-de-abiail", props: O_PATIO_DE_ABIAIL,
        env: { terrain: "city", night: 0.12, glory: 0.44, storm: 0.04, fire: 0.08, water: 0.04, verdure: 0.38 }, cast: [
        C("mulherComum", -95, "stand", { dy: 0.64, facing: 1, id: "abiail-mulher-de-abisur" }),
        C("servo", 45, "stand", { dy: 0.74, facing: -1, id: "aba-filho-de-abisur" }),
        C("servo", 160, "walk", { dy: 0.68, facing: -1, id: "molide-filho-de-abisur" }),
      ] }),
      // v.30 — "E SELEDE MORREU SEM FILHOS": quatro palavras, e um ramo da
      // árvore seca na página. A soleira sem ninguém, o candeeiro apagado, o
      // pote virado no chão e a noite entrando pelo vão da porta encostada.
      b(30, { set: "a-casa-vazia-de-selede", props: A_CASA_VAZIA_DE_SELEDE,
        env: { terrain: "city", night: 0.84, glory: 0.04, storm: 0.2, fire: 0.05, water: 0.03, verdure: 0.05 }, cast: [
        C("homem", 150, "stand", { dy: 0.72, facing: -1, id: "apaim-filho-de-nadabe" }),
      ] }),
      // v.31 — Isi, Sesã e Alai: a herdade atravessa três gerações e chega a um
      // homem sem filho varão. A casa de pedra com o alpendre, o celeiro cheio,
      // o jumento do serviço e a tarde comprida — tudo em ordem, e nenhum
      // herdeiro à vista.
      b(31, { set: "a-casa-de-sesa-em-isi", props: A_CASA_DE_SESA_EM_ISI,
        env: { terrain: "city", night: 0.3, glory: 0.36, storm: 0.06, fire: 0.1, water: 0.04, verdure: 0.4 }, cast: [
        C("anciao", -128, "stand", { dy: 0.62, facing: 1, id: "isi-filho-de-apaim" }),
        C("homem", 25, "stand", { dy: 0.7, facing: -1, id: "sesa-filho-de-isi" }),
        C("servo", 262, "walk", { dy: 0.74, facing: -1, id: "alai-filho-de-sesa" }),
      ] }),
      // v.32 — e o outro ramo seca do mesmo jeito: "E JETER MORREU SEM FILHOS".
      // Um olival velho em fileira, a prensa de pedra parada, a talha de azeite
      // tapada e o vento virando as folhas do avesso. Uma herdade boa, e
      // ninguém para receber.
      b(32, { set: "o-olival-de-jeter", props: O_OLIVAL_DE_JETER,
        env: { terrain: "field", night: 0.36, glory: 0.18, storm: 0.4, fire: 0.05, water: 0.04, verdure: 0.5 }, cast: [
        C("homem", 62, "stand", { dy: 0.66, facing: -1, id: "jonatas-filho-de-jada" }),
        C("anciao", -140, "bow", { dy: 0.72, facing: 1, id: "jada-irmao-de-samai" }),
      ] }),
      // v.33 — Pelete e Zaza fecham a casa de Jerameel numa vereda de volta ao
      // Neguebe: a trilha entre moitas, a pedra do descanso, o poço tapado ao
      // longe e o entardecer alaranjado. O texto vai virar agora para Sesã.
      b(33, { set: "a-vereda-dos-filhos-de-jonatas", props: A_VEREDA_DOS_FILHOS_DE_JONATAS,
        env: { terrain: "desert", night: 0.38, glory: 0.34, storm: 0.06, fire: 0.06, water: 0.04, verdure: 0.18 }, cast: [
        C("homem", -128, "walk", { dy: 0.66, facing: 1, id: "pelete-filho-de-jonatas" }),
        C("servo", 92, "stand", { dy: 0.72, facing: -1, id: "zaza-filho-de-jonatas" }),
      ] }),
      // v.34 — ⭐ "E SESÃ NÃO TEVE FILHOS, MAS FILHAS; E TINHA SESÃ UM SERVO
      // EGÍPCIO, CUJO NOME ERA JARÁ". O terreiro cheio de mulheres e sem filho
      // varão, e no fundo do pátio o estrangeiro carregando a carga do dia. A
      // herdade inteira depende de uma decisão que ainda não foi tomada.
      b(34, { set: "o-terreiro-de-sesa-sem-herdeiro", props: O_TERREIRO_DE_SESA_SEM_HERDEIRO,
        env: { terrain: "city", night: 0.24, glory: 0.28, storm: 0.14, fire: 0.1, water: 0.04, verdure: 0.34 }, cast: [
        C("anciao", -110, "point", { dy: 0.62, facing: 1, id: "sesa-filho-de-isi" }),
        C("mulherComum", 15, "stand", { dy: 0.68, facing: -1, id: "filha-de-sesa" }),
        C("mulherComum", 88, "stand", { dy: 0.6, facing: -1, id: "segunda-filha-de-sesa" }),
        C("servo", 248, "kneel", { dy: 0.74, facing: -1, id: "jara-servo-egipcio-de-sesa" }),
      ] }),
      // v.35 — ⭐ e a decisão é tomada: "DEU, POIS, SESÃ SUA FILHA POR MULHER A
      // JARÁ, SEU SERVO". Um escravo estrangeiro vira o herdeiro da casa — e
      // dele sairão treze gerações que o Cronista faz questão de contar
      // inteiras. Fogueira de casamento, candelabro aceso e estrelas.
      b(35, { set: "as-bodas-de-jara", props: AS_BODAS_DE_JARA,
        env: { terrain: "city", night: 0.6, glory: 0.62, storm: 0.04, fire: 0.6, water: 0.04, verdure: 0.24 }, cast: [
        C("servo", -35, "stand", { dy: 0.66, facing: 1, id: "jara-servo-egipcio-de-sesa", glow: 0.3 }),
        C("mulherComum", 42, "stand", { dy: 0.7, facing: -1, id: "filha-de-sesa" }),
        C("anciao", -215, "raise", { dy: 0.6, facing: 1, id: "sesa-filho-de-isi" }),
      ] }),
      // v.36 — a primeira geração daquele casamento abre terra na chuva de
      // outubro: a leira aberta, o saco da semente, o poço da roça e o céu
      // carregado da primeira água. Atai, Natã e Zabade são um começo, e o
      // quadro é o começo do ano agrícola.
      b(36, { set: "a-semeadura-da-casa-de-atai", props: A_SEMEADURA_DA_CASA_DE_ATAI,
        env: { terrain: "field", night: 0.3, glory: 0.22, storm: 0.46, fire: 0.05, water: 0.04, verdure: 0.4 }, cast: [
        C("homem", -150, "kneel", { dy: 0.7, facing: 1, id: "atai-filho-de-jara" }),
        C("homem", 25, "walk", { dy: 0.76, facing: -1, id: "nata-filho-de-atai" }),
        C("servo", 218, "stand", { dy: 0.62, facing: -1, id: "zabade-filho-de-nata" }),
      ] }),
      // v.37 — a geração seguinte, na mesma herdade e em agosto: os cachos
      // maduros nos bacelos, o cesto cheio, o lagar cavado na rocha e o sol a
      // pino. Eflal e Obede não têm feito nenhum — têm uma vindima, e é isso
      // que a lista está guardando.
      b(37, { set: "a-vinha-de-eflal", props: A_VINHA_DE_EFLAL,
        env: { terrain: "field", night: 0.06, glory: 0.46, storm: 0.04, fire: 0.06, water: 0.04, verdure: 0.8 }, cast: [
        C("homem", -215, "point", { dy: 0.62, facing: 1, id: "eflal-filho-de-zabade" }),
        C("servo", -60, "kneel", { dy: 0.74, facing: 1, id: "vindimador-da-casa-de-eflal" }),
        C("homem", 130, "walk", { dy: 0.7, facing: -1, id: "obede-filho-de-eflal" }),
      ] }),
      // v.38 — novembro, e o trabalho muda: o tanque de pedra da rega, as
      // talhas de azeite enfileiradas na sombra e o alpendre de esteira. Jeú e
      // Azarias herdam o olival do pai no fim de uma tarde fresca.
      b(38, { set: "o-tanque-do-olival-de-obede", props: O_TANQUE_DO_OLIVAL_DE_OBEDE,
        env: { terrain: "city", night: 0.34, glory: 0.32, storm: 0.08, fire: 0.14, water: 0.04, verdure: 0.4 }, cast: [
        C("homem", -110, "kneel", { dy: 0.68, facing: 1, id: "jeu-filho-de-obede" }),
        C("homem", 152, "stand", { dy: 0.74, facing: -1, id: "azarias-filho-de-jeu" }),
        C("servo", 262, "walk", { dy: 0.6, facing: -1, id: "servo-do-lagar-de-obede" }),
      ] }),
      // v.39 — a mesma família agora criando gado no alto: o muro de pedra do redil
      // com a porteira fechada, o rebanho recolhido, o cajado encostado e o
      // vale escurecendo lá embaixo. Helez e Eleasá acabam o dia.
      b(39, { set: "o-aprisco-de-helez", props: O_APRISCO_DE_HELEZ,
        env: { terrain: "field", night: 0.48, glory: 0.3, storm: 0.08, fire: 0.08, water: 0.04, verdure: 0.5 }, cast: [
        C("pastor", -195, "stand", { dy: 0.62, facing: 1, id: "helez-filho-de-azarias" }),
        C("homem", 62, "walk", { dy: 0.72, facing: -1, id: "eleasa-filho-de-helez" }),
        C("rebanho", 235, "stand", { dy: 0.66, facing: -1, id: "rebanho-do-aprisco-de-helez" }),
      ] }),
      // v.40 — noite de colheita, e alguém tem de ficar de guarda: a fogueira
      // do vigia, a cabana de ramos, os feixes empilhados que se está guardando
      // e o céu inteiro de estrelas. Sismai e Salum tomam o turno. A herdade
      // nunca fica sozinha.
      b(40, { set: "a-guarda-da-noite-de-sismai", props: A_GUARDA_DA_NOITE_DE_SISMAI,
        env: { terrain: "field", night: 0.86, glory: 0.16, storm: 0.06, fire: 0.5, water: 0.04, verdure: 0.4 }, cast: [
        C("homem", -140, "stand", { dy: 0.66, facing: 1, id: "sismai-filho-de-eleasa" }),
        C("servo", 105, "kneel", { dy: 0.74, facing: -1, id: "salum-filho-de-sismai" }),
      ] }),
      // v.41 — a manhã seguinte fecha a descendência do servo egípcio no
      // décimo terceiro nome: Jecamias e ELISAMA. A porta da casa aberta para o
      // campo lavrado, a videira sobre o alpendre e o sol nascendo por cima da
      // terra que a família não perdeu.
      b(41, { set: "a-porta-da-herdade-de-elisama", props: A_PORTA_DA_HERDADE_DE_ELISAMA,
        env: { terrain: "city", night: 0.2, glory: 0.52, storm: 0.04, fire: 0.08, water: 0.04, verdure: 0.52 }, cast: [
        C("homem", -130, "stand", { dy: 0.62, facing: 1, id: "jecamias-filho-de-salum" }),
        C("homem", 95, "raise", { dy: 0.72, facing: -1, id: "elisama-filho-de-jecamias" }),
      ] }),
      // v.42 — o texto volta a Calebe, irmão de Jerameel, e a genealogia vira
      // atlas: Messa é "PAI DE ZIFE" e Maressa é "PAI DE HEBROM". A porta dupla
      // da cidade mais antiga de Judá, o carvalho de Manre ao lado e o casario
      // subindo o morro.
      b(42, { set: "a-porta-de-hebrom", props: A_PORTA_DE_HEBROM,
        env: { terrain: "city", night: 0.14, glory: 0.42, storm: 0.05, fire: 0.08, water: 0.04, verdure: 0.42 }, cast: [
        C("homem", -195, "walk", { dy: 0.62, facing: 1, id: "messa-primogenito-de-calebe" }),
        C("anciao", 40, "point", { dy: 0.7, facing: -1, id: "maressa-pai-de-hebrom" }),
        C("servo", 258, "stand", { dy: 0.64, facing: -1, id: "morador-da-porta-de-hebrom" }),
      ] }),
      // v.43 — Coré, Tápua, Requém e Sema são quatro lugares antes de serem
      // quatro filhos, e Tápua é justamente um nome de água. O olho-d'água
      // brotando no pé do barranco, o tanque de pedra e a relva alta que só
      // cresce onde há nascente.
      b(43, { set: "as-fontes-de-tapua", props: AS_FONTES_DE_TAPUA,
        env: { terrain: "field", night: 0.12, glory: 0.4, storm: 0.04, fire: 0.05, water: 0.32, verdure: 0.88 }, cast: [
        C("homem", -128, "kneel", { dy: 0.7, facing: 1, id: "tapua-filho-de-hebrom" }),
        C("homem", 62, "stand", { dy: 0.62, facing: -1, id: "core-filho-de-hebrom" }),
        C("servo", 235, "walk", { dy: 0.74, facing: -1, id: "requem-filho-de-hebrom" }),
      ] }),
      // v.44 — Raão, pai de Jorqueão, e Samai: a vereda de terra que liga as
      // aldeias da montanha de Judá, com a fila de pedras marcando o limite das
      // herdades, a figueira do cruzamento e o jumento de carga do recado.
      b(44, { set: "a-estrada-de-jorqueao", props: A_ESTRADA_DE_JORQUEAO,
        env: { terrain: "field", night: 0.24, glory: 0.28, storm: 0.32, fire: 0.06, water: 0.04, verdure: 0.5 }, cast: [
        C("homem", -215, "walk", { dy: 0.64, facing: 1, id: "sema-filho-de-hebrom" }),
        C("homem", -35, "point", { dy: 0.72, facing: 1, id: "raao-pai-de-jorqueao" }),
        C("servo", 175, "stand", { dy: 0.66, facing: -1, id: "samai-filho-de-requem" }),
      ] }),
      // v.45 — Maom é "PAI DE BETE-ZUR", e Bete-Zur quer dizer casa de rocha: a
      // praça-forte no alto da estrada de Hebrom, com a muralha assentada
      // direto na pedra viva, a cisterna talhada e a torre em cima da laje. O
      // nome descreve o lugar.
      b(45, { set: "bete-zur-a-casa-de-rocha", props: BETE_ZUR_A_CASA_DE_ROCHA,
        env: { terrain: "mountain", night: 0.3, glory: 0.24, storm: 0.16, fire: 0.08, water: 0.04, verdure: 0.2 }, cast: [
        C("homem", -180, "stand", { dy: 0.6, facing: 1, id: "maom-pai-de-bete-zur" }),
        C("servo", 140, "walk", { dy: 0.7, facing: -1, id: "guarda-de-bete-zur" }),
      ] }),
      // v.46 — Efá, a concubina de Calebe, tem casa de fora: a tenda armada
      // longe do casario, o tear, a fogueira baixa do preparo e a acácia que
      // faz toda a sombra do lugar. Uma família à margem da herdade principal —
      // e o Cronista conta os três filhos dela pelo nome.
      b(46, { set: "a-tenda-de-efa-a-concubina", props: A_TENDA_DE_EFA_A_CONCUBINA,
        env: { terrain: "field", night: 0.22, glory: 0.32, storm: 0.08, fire: 0.34, water: 0.04, verdure: 0.36 }, cast: [
        C("mulherComum", -70, "stand", { dy: 0.66, facing: 1, id: "efa-concubina-de-calebe" }),
        C("servo", 45, "kneel", { dy: 0.74, facing: -1, id: "hara-filho-de-efa" }),
        C("servo", 178, "walk", { dy: 0.68, facing: -1, id: "mosa-filho-de-efa" }),
        C("homem", 288, "stand", { dy: 0.6, facing: -1, id: "gazez-filho-de-hara" }),
      ] }),
      // v.47 — os seis filhos de Jadai repartem a encosta em faixas: os muros
      // de pedra dividindo o morro em terraços, uma árvore no canto de cada
      // lote e o celeiro no meio. Seis nomes, seis lotes — a genealogia é um
      // registro de terras.
      b(47, { set: "a-herdade-de-jadai", props: A_HERDADE_DE_JADAI,
        env: { terrain: "field", night: 0.12, glory: 0.38, storm: 0.05, fire: 0.06, water: 0.04, verdure: 0.62 }, cast: [
        C("anciao", -128, "point", { dy: 0.62, facing: 1, id: "jadai-da-herdade" }),
        C("homem", 25, "walk", { dy: 0.72, facing: -1, id: "regem-filho-de-jadai" }),
        C("homem", 148, "stand", { dy: 0.66, facing: -1, id: "jotao-filho-de-jadai" }),
        C("servo", 262, "kneel", { dy: 0.74, facing: -1, id: "saafe-filho-de-jadai" }),
      ] }),
      // v.48 — a segunda casa de fora, do lado oposto da herdade: a porta de
      // tábua, o forno de pão, os dois potes grandes na sombra e a parreira do
      // muro. Maaca não é senhora da casa grande nem mulher de tenda — é o
      // meio-termo, e tem dois filhos nomeados.
      b(48, { set: "o-patio-de-maaca", props: O_PATIO_DE_MAACA,
        env: { terrain: "city", night: 0.26, glory: 0.32, storm: 0.06, fire: 0.32, water: 0.04, verdure: 0.42 }, cast: [
        C("mulherComum", -35, "stand", { dy: 0.66, facing: 1, id: "maaca-concubina-de-calebe" }),
        C("servo", 130, "stand", { dy: 0.74, facing: -1, id: "seber-filho-de-maaca" }),
        C("servo", 245, "walk", { dy: 0.68, facing: -1, id: "tirana-filho-de-maaca" }),
      ] }),
      // v.49 — e o versículo termina em quatro palavras que valem um capítulo
      // de Josué: "E FOI A FILHA DE CALEBE, ACSA". A herdade seca do Neguebe
      // que o pai lhe deu, e a água que ela pediu por cima: a fonte de cima
      // jorrando no barranco, o riacho de baixo correndo pelo campo e o jumento
      // de que ela se apeou para pedir.
      b(49, { set: "as-fontes-de-acsa", props: AS_FONTES_DE_ACSA,
        env: { terrain: "field", night: 0.12, glory: 0.56, storm: 0.04, fire: 0.05, water: 0.34, verdure: 0.72 }, cast: [
        C("mulherComum", -215, "stand", { dy: 0.64, facing: 1, id: "acsa", glow: 0.28 }),
        C("homem", 35, "point", { dy: 0.72, facing: -1, id: "seva-pai-de-macbena" }),
        C("servo", 285, "walk", { dy: 0.66, facing: -1, id: "morador-de-madmana" }),
      ] }),
      // v.50 — a última seção do capítulo é um mapa de aldeias, e a primeira é
      // QUIRIATE-JEARIM, que quer dizer cidade dos bosques: o pinheiral fechado
      // subindo o morro, a casa de pedra na clareira e a névoa presa entre os
      // troncos. É aqui que a arca ficará vinte anos.
      b(50, { set: "os-bosques-de-quiriate-jearim", props: OS_BOSQUES_DE_QUIRIATE_JEARIM,
        env: { terrain: "field", night: 0.3, glory: 0.3, storm: 0.1, fire: 0.06, water: 0.04, verdure: 0.9 }, cast: [
        C("homem", -60, "walk", { dy: 0.66, facing: 1, id: "sobal-pai-de-quiriate-jearim" }),
        C("servo", 148, "stand", { dy: 0.74, facing: -1, id: "lenhador-de-quiriate-jearim" }),
      ] }),
      // v.51 — "E SALMA, PAI DOS BELEMITAS": o nome vira Belém, a cidade do
      // pão. As eiras de pedra no alto, os feixes de trigo, o casario amarelo
      // da vila e o vale dos pastores caindo para o oriente. Harefe fica com
      // Bete-Gader, do outro lado da serra.
      b(51, { set: "as-eiras-de-belem", props: AS_EIRAS_DE_BELEM,
        env: { terrain: "city", night: 0.14, glory: 0.46, storm: 0.05, fire: 0.08, water: 0.04, verdure: 0.58 }, cast: [
        C("homem", -125, "kneel", { dy: 0.68, facing: 1, id: "salma-pai-dos-belemitas" }),
        C("homem", 130, "stand", { dy: 0.62, facing: -1, id: "harefe-pai-de-bete-gader" }),
        C("servo", 235, "walk", { dy: 0.74, facing: -1, id: "malhador-das-eiras-de-belem" }),
      ] }),
      // v.52 — Haroé e a metade dos menuítas trabalham a outra face de
      // Quiriate-Jearim: a mata aberta a machado, as toras empilhadas, o carro
      // de bois carregado e o fogo dos lenhadores no fim da tarde. A cidade dos
      // bosques vive de madeira.
      b(52, { set: "a-clareira-dos-lenhadores", props: A_CLAREIRA_DOS_LENHADORES,
        env: { terrain: "field", night: 0.46, glory: 0.2, storm: 0.34, fire: 0.5, water: 0.04, verdure: 0.66 }, cast: [
        C("homem", -195, "point", { dy: 0.64, facing: 1, id: "haroe-filho-de-sobal" }),
        C("servo", -20, "kneel", { dy: 0.76, facing: 1, id: "menuita-lenhador" }),
        C("homem", 178, "walk", { dy: 0.68, facing: -1, id: "carreiro-de-quiriate-jearim" }),
      ] }),
      // v.53 — as famílias de Quiriate-Jearim se espalham, e "DESTES SAÍRAM OS
      // ZORATEUS E OS ESTAOLEUS" — Zorá e Estaol, os dois cabeços entre os
      // quais o Espírito do SENHOR começaria a mover Sansão. O campo de trigo
      // no vale entre eles e a planície filisteia abrindo ao poente.
      b(53, { set: "o-vale-entre-zora-e-estaol", props: O_VALE_ENTRE_ZORA_E_ESTAOL,
        env: { terrain: "field", night: 0.2, glory: 0.44, storm: 0.08, fire: 0.06, water: 0.04, verdure: 0.7 }, cast: [
        C("homem", -128, "stand", { dy: 0.64, facing: 1, id: "zorateu-de-quiriate-jearim" }),
        C("homem", 60, "point", { dy: 0.72, facing: -1, id: "estaoleu-de-quiriate-jearim" }),
        C("servo", 262, "walk", { dy: 0.66, facing: -1, id: "jitreu-de-quiriate-jearim" }),
      ] }),
      // v.54 — Belém outra vez, e com ela os NETOFATITAS, cujos povoados
      // dariam os cantores do templo (Ne 12:28). As casas baixas encostadas
      // umas nas outras, o adro da aldeia, a harpa do que ensaia à porta e os
      // terraços de oliveira descendo o morro.
      b(54, { set: "as-aldeias-dos-netofatitas", props: AS_ALDEIAS_DOS_NETOFATITAS,
        env: { terrain: "city", night: 0.36, glory: 0.42, storm: 0.05, fire: 0.14, water: 0.04, verdure: 0.54 }, cast: [
        C("homem", 92, "stand", { dy: 0.68, facing: -1, id: "cantor-netofatita" }),
        C("anciao", -160, "walk", { dy: 0.62, facing: 1, id: "atarote-morador-de-bete-joabe" }),
        C("servo", 258, "stand", { dy: 0.74, facing: -1, id: "manaatita-de-belem" }),
      ] }),
      // v.55 — ⭐ e o capítulo acaba na coisa mais rara desta página: uma
      // povoação inteira que vive de ESCREVER. "AS FAMÍLIAS DOS ESCRIBAS QUE
      // HABITAVAM EM JABEZ" — tiratitas, simeatitas e sucatitas —, "ESTES SÃO
      // OS QUENEUS", a gente da casa de RECABE, que sabia ler e nunca quis
      // morar em casa. As bancas com os rolos abertos, o candelabro aceso de
      // tarde, e atrás do muro as tendas de quem escreveu tudo isto.
      b(55, { set: "o-patio-dos-escribas-de-jabez", props: O_PATIO_DOS_ESCRIBAS_DE_JABEZ,
        env: { terrain: "city", night: 0.5, glory: 0.6, storm: 0.04, fire: 0.28, water: 0.04, verdure: 0.22 }, cast: [
        C("anciao", -78, "write", { dy: 0.7, facing: 1, id: "escriba-tiratita-de-jabez", glow: 0.3 }),
        C("homem", 55, "write", { dy: 0.76, facing: -1, id: "escriba-simeatita-de-jabez" }),
        C("homem", 148, "stand", { dy: 0.62, facing: -1, id: "escriba-sucatita-de-jabez" }),
        C("servo", 262, "stand", { dy: 0.66, facing: -1, id: "queneu-da-casa-de-recabe" }),
      ] }),
    ],
  },
};
