// ============================================================================
// 1 REIS 5–6 — CENA VIVA. Os CEDROS DO LÍBANO descendo a serra, as JANGADAS
// amarradas no mar de Tiro, as PEDRAS GRANDES lavradas na pedreira — e uma
// casa inteira levantada SEM QUE SE OUVISSE UM MARTELO.
//
// 1Rs 5 — A obra começa por uma amizade herdada. HIRÃO, rei de Tiro, ouve que
// ungiram Salomão rei em lugar de seu pai e manda os seus servos, "porquanto
// Hirão sempre tinha amado a Davi" — o afeto por um homem morto vira o
// primeiro contrato do templo. Salomão manda dizer-lhe a razão de a casa não
// ter sido edificada antes: "Davi, meu pai, não pôde edificar uma casa ao nome
// do Senhor seu Deus, por causa da guerra com que o cercaram, até que o Senhor
// pôs seus inimigos debaixo das plantas dos seus pés". A guerra acabou:
// "porém agora o Senhor meu Deus me tem dado descanso de todos os lados;
// adversário não há, nem algum mau encontro" — e é o descanso, não a vitória,
// que abre espaço para construir. O pedido é técnico e humilde ao mesmo tempo:
// "Dá ordem, pois, agora, que do Líbano me cortem cedros", com os servos de
// Salomão junto aos de Hirão, "porque bem sabes tu que entre nós ninguém há que
// saiba cortar a madeira como os sidônios". Hirão se alegra muito e bendiz ao
// SENHOR "que deu a Davi um filho sábio sobre este tão grande povo"; promete o
// cedro e o cipreste e desenha a logística inteira em um versículo: a madeira
// desce do Líbano até ao mar e vai "em jangadas pelo mar até ao lugar que me
// designares", onde será desamarrada. Em troca, vinte mil coros de trigo e
// vinte coros de AZEITE BATIDO por ano para a casa de Hirão. "Houve paz entre
// Hirão e Salomão, e ambos fizeram acordo." Depois vem a LEVA: trinta mil
// homens de todo o Israel, dez mil por mês em turnos — um mês no Líbano, dois
// em casa —, ADONIRÃO sobre a leva; setenta mil que levavam as cargas, oitenta
// mil que talhavam pedras nas montanhas, e três mil e trezentos oficiais dando
// as ordens. E o rei manda trazer PEDRAS GRANDES, pedras valiosas, pedras
// lavradas, para fundar a casa — lavradas pelos edificadores de Hirão e pelos
// GIBLITAS, os pedreiros de Gebal.
//
// 1Rs 6 — A data é solene como poucas na Escritura: no ano quatrocentos e
// oitenta depois de saírem os filhos de Israel do Egito, no ano quarto de
// Salomão, no mês de ZIVE, "começou a edificar a casa do SENHOR". Sessenta
// côvados de comprimento, vinte de largura, trinta de altura; o pórtico de
// vinte por dez; janelas de gelósias fixas; câmaras laterais em três andares
// em redor — cinco côvados, seis, sete —, cada andar mais largo, porque as
// paredes iam se estreitando por fora em encostos, "para que as vigas não se
// apoiassem nas paredes da casa". E no meio das medidas o texto para tudo para
// registrar a coisa mais bonita da obra: "edificava-se a casa com pedras
// preparadas, como as traziam se edificava; de maneira que nem martelo, nem
// machado, nem nenhum outro instrumento de ferro se ouviu na casa quando a
// edificavam" — um templo levantado EM SILÊNCIO, todo o barulho deixado lá
// atrás, na pedreira. A porta da câmara do meio ficava ao lado direito, e por
// caracóis se subia de andar em andar. Então, com a obra em pé, VEM A PALAVRA
// DO SENHOR: "quanto a esta casa que tu edificas, se andares nos meus
// estatutos... confirmarei para contigo a minha palavra, a qual falei a Davi,
// teu pai; e habitarei no meio dos filhos de Israel, e não desampararei o meu
// povo de Israel" — a casa não vale pelas medidas, vale pela promessa. Vem o
// revestimento: tábuas de cedro do soalho ao teto, "tudo era cedro, pedra
// nenhuma se via"; botões e flores abertas lavrados na madeira; o ORÁCULO
// preparado na parte mais interior "para pôr ali a arca da aliança do Senhor",
// de vinte por vinte por vinte, revestido de OURO PURO, com cadeias de ouro e
// uma cortina diante dele. No oráculo, DOIS QUERUBINS de madeira de oliveira,
// de dez côvados de altura, cada asa de cinco côvados: postos no meio da casa
// de dentro, a asa de um toca uma parede, a asa do outro toca a outra, e as
// asas de dentro se tocam uma na outra no meio da casa. As paredes todas
// lavradas de querubins, palmas e flores abertas; o soalho coberto de ouro; as
// portas do oráculo de oliveira e as do templo de cipreste, dobradiças,
// entalhadas e revestidas de ouro; e o pátio interior de três ordens de pedras
// lavradas e uma ordem de vigas de cedro. O fundamento foi posto no ano quarto,
// no mês de Zive; a casa se acabou no ano undécimo, no mês de BUL — "e a
// edificou em sete anos".
//
// A VOZ DE DEUS — em 1Rs 5 o SENHOR não fala uma única vez: é citado por
// Salomão (a guerra de Davi, o descanso, a promessa do filho que edificaria a
// casa) e bendito por Hirão, um rei pagão, mas não abre a boca. A Sua única
// aparição no par de capítulos é 6:11-13, e é VOZ DIRETA SEM MEDIADOR: "veio a
// palavra do Senhor a Salomão" — não há profeta na frase, não há anjo, não há
// sonho relatado; por isso `by: "deus"`, balão dourado e centralizado, glória
// no auge e NENHUMA figura de Deus em cena. O que o quadro mostra é o canteiro
// de obras interrompido: o rei e os obreiros de joelhos no meio da casa
// inacabada, e a luz caindo sobre pedra que ainda não tem teto. Fora desses
// três versículos, tudo em 1Rs 5–6 é narração, medida e material — e o único
// "milagre" registrado é acústico: o silêncio de 6:7.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
// voz do céu — em 1Rs 5–6 só existe em 6:11-13 (ver "A VOZ DE DEUS" no cabeçalho).
const dv = (v: number, extra: Partial<StageBeat> = {}): StageBeat => b(v, { by: "deus", ...extra });

// --------------------------------------------------------------- SETS 1Rs 5

// A CORTE DE TIRO — o palácio do rei fenício na cidade-porto: a torre do
// quebra-mar, o casario de pedra encostado no mar, o assento de Hirão de lado,
// a porta por onde entram e saem as embaixadas e a palmeira do pátio. É daqui
// que sai a madeira do templo de Israel.
const CORTE_DE_TIRO: StagePropSpec[] = [
  P("tower", -260, 1.3, undefined, 0.2),
  P("church", -120, 1.15, undefined, 0.26),
  P("throne", 60, 1.05, undefined, 0.38),
  P("door", 210, 0.95, undefined, 0.34),
  P("crate", -30, 0.85, undefined, 0.62),
  P("amphora", 300, 0.8, undefined, 0.6),
  P("palm", 320, 1.1, undefined, 0.16),
];

// O SALÃO DE SALOMÃO EM JERUSALÉM — a sala do trono do rei novo, ainda sem
// templo nenhum diante da janela: o trono deslocado à esquerda, duas colunas do
// salão, o candelabro aceso, o incensário e o ROLO onde o escrivão do reino
// toma o recado que vai para Tiro.
const SALAO_DE_SALOMAO: StagePropSpec[] = [
  P("throne", -20, 1.05, undefined, 0.32),
  P("column", -230, 1.25, undefined, 0.28),
  P("column", 150, 1.25, undefined, 0.28),
  P("lampstand", 60, 0.9, undefined, 0.5),
  P("scroll", 240, 0.85, undefined, 0.56),
  P("censer", -120, 0.8, undefined, 0.58),
  P("door", 320, 0.95, undefined, 0.36),
];

// O LÍBANO — a serra dos cedros: quatro troncos enormes subindo fora do quadro,
// a rocha nua da encosta, a moita da meia-encosta e o capim curto de altitude.
// A madeira mais cara do Levante, cortada por quem sabe cortá-la.
const LIBANO_CEDROS: StagePropSpec[] = [
  { ...P("tree", -260, 1.4, undefined, 0.14), tag: "cedros-do-libano-para-o-templo" },
  P("tree", -110, 1.25, undefined, 0.2),
  P("tree", 90, 1.3, undefined, 0.16),
  P("tree", 270, 1.2, undefined, 0.22),
  P("rock", -30, 1.0, undefined, 0.58),
  P("bush", 180, 0.9, undefined, 0.5),
  P("grass", 20, 0.8, undefined, 0.76),
];

// O MAR DE TIRO — a beira onde a madeira entra na água: três JANGADAS de
// troncos amarrados esperando a maré, a rocha do molhe, a palmeira do cais e as
// nuvens do largo. Daqui a floresta viaja deitada sobre o próprio mar.
const MAR_DE_TIRO: StagePropSpec[] = [
  { ...P("boat", -180, 1.2, undefined, 0.42), tag: "jangadas-de-hirao" },
  P("boat", 40, 1.1, undefined, 0.5),
  P("boat", 250, 1.0, undefined, 0.36),
  P("rock", -320, 1.0, undefined, 0.6),
  P("palm", 310, 1.05, undefined, 0.16),
  P("grass", -60, 0.74, undefined, 0.78),
  { ...P("clouds", 120, 1.1, undefined, 0.7), sky: true },
];

// A ERA DO TRIBUTO — o pagamento anual que sobe para Tiro: o FEIXE do trigo
// novo, as talhas do azeite batido, os fardos prontos para a estrada e o
// curral do lado. Vinte mil coros de trigo e vinte de azeite, ano após ano.
const TRIGO_E_AZEITE: StagePropSpec[] = [
  { ...P("sheaf", -150, 1.1, undefined, 0.5), tag: "trigo-e-azeite-para-a-casa-de-hirao" },
  P("stall", -280, 1.1, undefined, 0.34),
  P("crate", -20, 0.95, undefined, 0.6),
  P("crate", 130, 0.9, undefined, 0.56),
  P("amphora", 240, 0.9, undefined, 0.6),
  P("amphora", 300, 0.85, undefined, 0.64),
  P("grass", 40, 0.78, undefined, 0.78),
];

// A PRAÇA DA LEVA — o portão de Jerusalém no dia do alistamento: a torre da
// cidade de Davi, o portão escancarado, o casario e os fardos já separados
// para a marcha. Trinta mil homens de todo o Israel passam por aqui.
const PRACA_DA_LEVA: StagePropSpec[] = [
  P("tower", -230, 1.3, undefined, 0.22),
  P("door", -60, 1.1, undefined, 0.32),
  P("church", 110, 1.15, undefined, 0.26),
  P("crate", 240, 0.9, undefined, 0.6),
  P("rock", -320, 1.0, undefined, 0.56),
  P("palm", 320, 1.05, undefined, 0.16),
  P("grass", 20, 0.78, undefined, 0.76),
];

// O ARRAIAL DA LEVA NO CAMINHO DO LÍBANO — o acampamento do turno do mês: duas
// tendas, a fogueira do rancho, os fardos da jornada e o primeiro cedro à
// vista da estrada. Um mês aqui, dois meses em casa.
const ARRAIAL_DA_LEVA: StagePropSpec[] = [
  P("tent", -230, 1.25, undefined, 0.26),
  P("tent", -60, 1.1, undefined, 0.34),
  P("campfire", 120, 1.0, undefined, 0.58),
  P("tree", 300, 1.15, undefined, 0.18),
  P("crate", 240, 0.9, undefined, 0.62),
  P("rock", -320, 1.0, undefined, 0.56),
  P("grass", 30, 0.78, undefined, 0.76),
];

// A PEDREIRA NAS MONTANHAS — onde oitenta mil homens talham pedra: a frente de
// corte em três bancadas de rocha, os fardos das cargas, a torre de Jerusalém
// pequena ao longe e a moita do barranco. É o lugar de todo o barulho da obra.
const PEDREIRA: StagePropSpec[] = [
  P("rock", -240, 1.35, undefined, 0.3),
  P("rock", -60, 1.2, undefined, 0.5),
  P("rock", 130, 1.15, undefined, 0.36),
  P("tower", 300, 1.15, undefined, 0.22),
  P("crate", 250, 0.9, undefined, 0.6),
  P("bush", -320, 0.9, undefined, 0.5),
  P("grass", 40, 0.78, undefined, 0.76),
];

// AS PEDRAS GRANDES — a mesma pedreira, mas de perto e no bloco que interessa:
// a PEDRA DE PREÇO já solta da bancada, ocupando meio quadro, com as outras
// atrás dela e os fardos ao lado. Pedras lavradas para FUNDAR a casa.
const PEDRAS_GRANDES: StagePropSpec[] = [
  { ...P("rock", -120, 1.45, undefined, 0.42), tag: "pedras-grandes-para-fundar-a-casa" },
  P("rock", 140, 1.2, undefined, 0.5),
  P("rock", 290, 1.1, undefined, 0.34),
  P("tower", 250, 1.15, undefined, 0.2),
  P("crate", -270, 0.9, undefined, 0.6),
  P("bush", -320, 0.9, undefined, 0.5),
  P("grass", 30, 0.78, undefined, 0.78),
];

// O CANTEIRO DE JERUSALÉM — o chão da obra antes de haver casa: a tenda dos
// edificadores de Tiro, os fardos de madeira e pedra empilhados, o bloco de
// cantaria no centro e a torre da cidade de Davi ao fundo. Nada em pé ainda.
const CANTEIRO_DE_JERUSALEM: StagePropSpec[] = [
  P("tent", -300, 1.15, undefined, 0.3),
  P("tower", 240, 1.25, undefined, 0.2),
  P("rock", 60, 1.2, undefined, 0.5),
  P("crate", -140, 0.95, undefined, 0.6),
  P("crate", 150, 0.9, undefined, 0.64),
  P("amphora", -20, 0.8, undefined, 0.68),
  P("grass", 300, 0.76, undefined, 0.78),
];

// --------------------------------------------------------------- SETS 1Rs 6

// O MONTE MORIÁ NO MÊS DE ZIVE — o dia do fundamento: o ALTAR da eira que Davi
// comprou ainda de pé à esquerda, as duas primeiras pedras assentadas, a torre
// da cidade ao fundo, a palmeira da encosta e o sol da primavera do segundo mês.
const MORIA_FUNDACAO: StagePropSpec[] = [
  P("altar", -280, 1.0, undefined, 0.42),
  P("rock", -150, 1.3, undefined, 0.48),
  P("rock", 60, 1.2, undefined, 0.56),
  P("tower", 250, 1.2, undefined, 0.2),
  P("crate", 160, 0.9, undefined, 0.62),
  P("palm", 320, 1.05, undefined, 0.16),
  { ...P("sun", -60, 1.1, undefined, 0.6), sky: true },
];

// A CASA ERGUENDO-SE — o corpo do templo já em pé no canteiro: as paredes altas
// ao centro, as duas colunas do andaime dos lados, os fardos do dia e a pedra
// que ainda espera vez. Sessenta côvados por vinte por trinta.
const A_CASA_ERGUENDO_SE: StagePropSpec[] = [
  { ...P("church", 0, 1.4, undefined, 0.22), tag: "casa-do-senhor-de-salomao" },
  P("column", -230, 1.3, undefined, 0.3),
  P("column", 210, 1.3, undefined, 0.3),
  P("crate", -110, 0.9, undefined, 0.62),
  P("crate", 120, 0.85, undefined, 0.58),
  P("rock", 290, 1.0, undefined, 0.54),
  P("grass", -300, 0.76, undefined, 0.76),
];

// O PÓRTICO DIANTE DO TEMPLO — a frente da casa: vinte côvados de largura por
// dez de fundo, as duas colunas do alpendre, a porta grande de entrada e o
// bloco de cantaria encostado. Daqui para dentro tudo é medida sagrada.
const O_PORTICO: StagePropSpec[] = [
  { ...P("church", -80, 1.35, undefined, 0.22), tag: "casa-do-senhor-de-salomao" },
  P("column", -180, 1.3, undefined, 0.34),
  P("column", 40, 1.3, undefined, 0.34),
  P("door", 170, 1.1, undefined, 0.34),
  P("rock", -300, 1.05, undefined, 0.54),
  P("crate", 280, 0.9, undefined, 0.6),
  P("grass", 110, 0.78, undefined, 0.76),
];

// AS CÂMARAS LATERAIS — o cinturão de três andares em redor do muro da casa: o
// corpo do templo à esquerda, a torre do CARACOL por onde se sobe de andar em
// andar, a porta da câmara do meio ao lado direito e os fardos do andaime.
const CAMARAS_LATERAIS: StagePropSpec[] = [
  P("church", -110, 1.35, undefined, 0.22),
  P("tower", 130, 1.2, undefined, 0.26),
  P("door", 260, 1.0, undefined, 0.36),
  P("column", -300, 1.3, undefined, 0.3),
  P("crate", 20, 0.9, undefined, 0.6),
  P("rock", 200, 1.05, undefined, 0.56),
  P("grass", -200, 0.76, undefined, 0.76),
];

// A CASA EM SILÊNCIO — o quadro de 6:7: as PEDRAS JÁ PREPARADAS chegando
// prontas da pedreira, a casa subindo atrás delas, e nenhum ferro no ar. Sem
// fogueira, sem poeira, sem tempestade — o único cenário deste roteiro montado
// para ser OUVIDO, e o que se ouve é nada.
const A_CASA_EM_SILENCIO: StagePropSpec[] = [
  { ...P("rock", -190, 1.25, undefined, 0.5), tag: "pedras-preparadas-na-pedreira" },
  P("church", 20, 1.4, undefined, 0.22),
  P("rock", -40, 1.1, undefined, 0.62),
  P("rock", 180, 1.15, undefined, 0.46),
  P("column", -320, 1.3, undefined, 0.3),
  P("crate", 290, 0.85, undefined, 0.6),
  P("grass", 110, 0.76, undefined, 0.78),
];

// O INTERIOR DE CEDRO — por dentro, depois do revestimento: as tábuas de cedro
// do soalho ao teto entre as duas colunas do fundo, dois candelabros acesos, o
// incensário no meio e a porta da nave. "Pedra nenhuma se via."
const INTERIOR_DE_CEDRO: StagePropSpec[] = [
  P("column", -250, 1.3, undefined, 0.28),
  P("column", 240, 1.3, undefined, 0.28),
  P("lampstand", -90, 0.95, undefined, 0.5),
  P("lampstand", 100, 0.95, undefined, 0.5),
  P("censer", 30, 0.8, undefined, 0.6),
  P("door", 300, 1.0, undefined, 0.36),
  P("crate", -170, 0.85, undefined, 0.62),
];

// O TEMPLO ANTERIOR, DE QUARENTA CÔVADOS — a nave vista no comprimento: quatro
// colunas enfileiradas fugindo para o fundo, um candelabro de cada lado e o
// incensário no eixo. O palco mais longo do capítulo, para caber a medida.
const O_TEMPLO_ANTERIOR: StagePropSpec[] = [
  P("column", -300, 1.3, undefined, 0.3),
  P("column", -100, 1.3, undefined, 0.3),
  P("column", 100, 1.3, undefined, 0.3),
  P("column", 300, 1.3, undefined, 0.3),
  P("lampstand", -200, 0.95, undefined, 0.52),
  P("lampstand", 200, 0.95, undefined, 0.52),
  P("censer", 0, 0.85, undefined, 0.62),
];

// O ORÁCULO — o Santo dos Santos com os dois QUERUBINS já postos no meio da
// casa de dentro e a ARCA DA ALIANÇA no lugar para o qual o cômodo inteiro foi
// feito, entre os dois candelabros, com o altar de cedro à direita.
const O_ORACULO: StagePropSpec[] = [
  { ...P("cherub", -110, 1.3, undefined, 0.34), tag: "querubins-de-madeira-de-oliveira" },
  P("cherub", 110, 1.3, undefined, 0.34),
  { ...P("ark", 0, 1.0, undefined, 0.56), tag: "arca-da-alianca-no-oraculo" },
  P("lampstand", -250, 0.95, undefined, 0.5),
  P("lampstand", 250, 0.95, undefined, 0.5),
  P("altar", 170, 0.9, undefined, 0.7),
  P("column", 320, 1.25, undefined, 0.28),
];

// O ORÁCULO REVESTIDO DE OURO PURO — o mesmo cômodo enquanto o ouro é batido
// nas paredes: o altar de cedro revestido no centro, os dois candelabros
// abertos, a taça do ouro derretido e o incensário. Vinte por vinte por vinte.
const O_ORACULO_DE_OURO: StagePropSpec[] = [
  P("altar", -30, 1.1, undefined, 0.46),
  P("lampstand", -230, 1.0, undefined, 0.5),
  P("lampstand", 230, 1.0, undefined, 0.5),
  P("censer", 150, 0.85, undefined, 0.62),
  P("bowl", -160, 0.85, undefined, 0.66),
  P("column", -320, 1.3, undefined, 0.28),
  P("column", 320, 1.3, undefined, 0.28),
];

// A OFICINA DOS QUERUBINS — os dois querubins de MADEIRA DE OLIVEIRA ainda em
// talha, de dez côvados cada um, com a oliveira de onde saiu a madeira à
// direita, os candelabros do trabalho noturno e o cepo do entalhador.
const OS_QUERUBINS: StagePropSpec[] = [
  { ...P("cherub", -130, 1.35, undefined, 0.32), tag: "querubins-de-madeira-de-oliveira" },
  P("cherub", 130, 1.35, undefined, 0.32),
  P("tree", 300, 1.15, undefined, 0.18),
  P("lampstand", -260, 0.95, undefined, 0.5),
  P("lampstand", 260, 0.95, undefined, 0.5),
  P("crate", -20, 0.9, undefined, 0.66),
  P("column", -330, 1.3, undefined, 0.28),
];

// AS PAREDES LAVRADAS — o lavor que corre por toda a casa em redor: querubins e
// PALMAS alternados na madeira, por dentro e por fora, com a coluna do meio e os
// dois candelabros que iluminam o entalhe.
const AS_PAREDES_LAVRADAS: StagePropSpec[] = [
  P("palm", -270, 1.15, undefined, 0.2),
  P("palm", 270, 1.15, undefined, 0.2),
  P("cherub", -100, 1.15, undefined, 0.3),
  P("cherub", 100, 1.15, undefined, 0.3),
  P("column", 0, 1.3, undefined, 0.26),
  P("lampstand", -190, 0.9, undefined, 0.52),
  P("lampstand", 190, 0.9, undefined, 0.52),
];

// AS PORTAS DO ORÁCULO — as duas folhas de MADEIRA DE OLIVEIRA à entrada do
// Santo dos Santos, uma de cada lado do eixo, com a oliveira ao fundo, o
// candelabro entre elas e o incensário do umbral.
const AS_PORTAS_DE_OLIVEIRA: StagePropSpec[] = [
  { ...P("door", -120, 1.2, undefined, 0.34), tag: "portas-de-oliveira-do-oraculo" },
  P("door", 120, 1.2, undefined, 0.34),
  P("censer", 210, 0.8, undefined, 0.6),
  P("tree", 290, 1.15, undefined, 0.18),
  P("lampstand", -20, 0.9, undefined, 0.52),
  P("crate", -270, 0.85, undefined, 0.6),
  P("column", -320, 1.25, undefined, 0.28),
];

// A PORTA DO TEMPLO — a entrada da nave, vista do pórtico: as duas folhas
// DOBRADIÇAS de cipreste no centro, as ombreiras de oliveira dos lados, o corpo
// da casa à esquerda e a oliveira do pátio à direita.
const A_PORTA_DO_TEMPLO: StagePropSpec[] = [
  { ...P("door", 0, 1.3, undefined, 0.3), tag: "porta-do-templo-de-cipreste" },
  P("column", -170, 1.35, undefined, 0.32),
  P("column", 170, 1.35, undefined, 0.32),
  P("church", -300, 1.2, undefined, 0.22),
  P("tree", 300, 1.15, undefined, 0.18),
  P("crate", -80, 0.9, undefined, 0.64),
  P("grass", 120, 0.78, undefined, 0.78),
];

// O PÁTIO INTERIOR — três ordens de pedras lavradas e uma ordem de vigas de
// cedro fechando o recinto: a casa ao fundo à esquerda, o altar do pátio à
// direita, o bloco assentado no centro e as colunas do muro.
const PATIO_INTERIOR: StagePropSpec[] = [
  P("church", -60, 1.3, undefined, 0.24),
  P("altar", 250, 1.05, undefined, 0.44),
  P("column", -280, 1.3, undefined, 0.3),
  P("column", 200, 1.3, undefined, 0.3),
  P("rock", 90, 1.1, undefined, 0.54),
  P("crate", -170, 0.85, undefined, 0.6),
  P("grass", 320, 0.76, undefined, 0.76),
];

// A CASA ACABADA, NO MÊS DE BUL — sete anos depois: a casa inteira no centro do
// quadro, as duas colunas da frente, as palmeiras do pátio dos dois lados, o
// capim já crescido no chão que foi canteiro e o sol cheio em cima dela.
const A_CASA_ACABADA: StagePropSpec[] = [
  { ...P("church", 0, 1.45, undefined, 0.2), tag: "casa-do-senhor-de-salomao" },
  P("column", -170, 1.3, undefined, 0.32),
  P("column", 170, 1.3, undefined, 0.32),
  P("palm", -320, 1.1, undefined, 0.16),
  P("palm", 320, 1.1, undefined, 0.16),
  P("grass", 60, 0.78, undefined, 0.76),
  { ...P("sun", -80, 1.15, undefined, 0.6), sky: true },
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ 1Rs 5
  5: {
    start: { terrain: "city", night: 0.26, glory: 0.4, storm: 0.06, fire: 0, water: 0.2, verdure: 0.32 },
    beats: [
      // v.1 — Tiro. Hirão ouve que ungiram Salomão e despacha os seus servos
      // sem que ninguém lhe peça: o motivo está na última linha do versículo, e
      // é afeto por um homem que já morreu — "sempre tinha amado a Davi".
      b(1, { q: "porquanto Hirão sempre tinha amado a Davi.",
        set: "corte-de-tiro", props: CORTE_DE_TIRO,
        env: { terrain: "city", night: 0.3, glory: 0.36, storm: 0.05, water: 0.3, verdure: 0.3 }, cast: [
        C("rei", 60, "stand", { dy: 0.44, facing: -1, id: "hirao" }),
        C("servo", -60, "walk", { dy: 0.56, facing: -1, id: "servo-de-hirao1" }),
        C("servo", -170, "walk", { dy: 0.52, facing: -1, id: "servo-de-hirao2" }),
      ] }),
      // v.2 — Jerusalém responde. Os servos de Tiro estão no salão, o escrivão
      // do reino já com o rolo aberto, e o rei começa a ditar a carta que vai
      // abrir a obra do templo.
      b(2, { q: "Então Salomão mandou dizer a Hirão",
        set: "salao-de-salomao", props: SALAO_DE_SALOMAO,
        env: { terrain: "city", night: 0.22, glory: 0.5, storm: 0.04, water: 0.06, verdure: 0.28 }, cast: [
        C("rei", -20, "stand", { dy: 0.42, facing: 1, id: "salomao" }),
        C("anciao", -190, "write", { dy: 0.5, facing: 1, id: "escriba-de-salomao" }),
        C("servo", 140, "bow", { dy: 0.56, facing: -1, id: "servo-de-hirao1" }),
        C("servo", 240, "stand", { dy: 0.52, facing: -1, id: "servo-de-hirao2" }),
      ] }),
      // v.3 — a explicação que o filho dá pelo pai: Davi NÃO PÔDE edificar, e a
      // razão não foi indignidade, foi guerra. A luz do salão cai e a
      // tempestade sobe enquanto o rei fala das batalhas que cercaram Davi.
      b(3, { by: "rei", q: "por causa da guerra com que o cercaram, até que o Senhor pôs seus inimigos debaixo das plantas dos seus pés.",
        env: { night: 0.4, glory: 0.24, storm: 0.22, verdure: 0.22 }, cast: [
        C("rei", -40, "point", { dy: 0.46, facing: 1, id: "salomao" }),
        C("anciao", -210, "stand", { dy: 0.5, facing: 1, id: "escriba-de-salomao" }),
        C("servo", 150, "stand", { dy: 0.56, facing: -1, id: "servo-de-hirao1" }),
      ] }),
      // v.4 — e o que mudou: DESCANSO de todos os lados, sem adversário e sem
      // mau encontro. A tempestade some do salão, a glória sobe, o rei abre os
      // braços — é o clima de paz que autoriza a construção.
      b(4, { by: "rei", q: "o Senhor meu Deus me tem dado descanso de todos os lados; adversário não há, nem algum mau encontro.",
        env: { night: 0.2, glory: 0.58, storm: 0.03, verdure: 0.3 }, cast: [
        C("rei", -40, "raise", { dy: 0.46, facing: 1, id: "salomao" }),
        C("servo", 150, "bow", { dy: 0.56, facing: -1, id: "servo-de-hirao1" }),
        C("servo", 250, "stand", { dy: 0.5, facing: -1, id: "servo-de-hirao2" }),
      ] }),
      // v.5 — a decisão, e a autoridade dela: "como falou o Senhor a Davi, meu
      // pai". O rei aponta o lugar onde a casa vai subir e o escrivão escreve;
      // o servo de Tiro se ajoelha diante do que está sendo dito.
      b(5, { by: "rei", q: "E eis que eu intento edificar uma casa ao nome do Senhor meu Deus",
        env: { night: 0.16, glory: 0.7, storm: 0.02 }, cast: [
        C("rei", -10, "point", { dy: 0.4, facing: 1, id: "salomao", glow: 0.22 }),
        C("anciao", -200, "write", { dy: 0.52, facing: 1, id: "escriba-de-salomao" }),
        C("servo", 170, "kneel", { dy: 0.56, facing: -1, id: "servo-de-hirao1" }),
      ] }),
      // v.6 — o recado chega a Tiro pela boca do mensageiro: cedros do Líbano,
      // os servos de Salomão junto aos de Hirão, e o elogio que é também
      // confissão — ninguém em Israel sabe cortar madeira como os SIDÔNIOS. O
      // lenhador de Tiro está ali no salão, ouvindo o próprio ofício ser pedido.
      b(6, { by: "servo", q: "Dá ordem, pois, agora, que do Líbano me cortem cedros",
        set: "corte-de-tiro", props: CORTE_DE_TIRO,
        env: { terrain: "city", night: 0.26, glory: 0.46, storm: 0.05, water: 0.3, verdure: 0.3 }, cast: [
        C("servo", -90, "point", { dy: 0.54, facing: 1, id: "mensageiro-de-salomao1" }),
        C("servo", -200, "stand", { dy: 0.5, facing: 1, id: "mensageiro-de-salomao2" }),
        C("rei", 60, "stand", { dy: 0.44, facing: -1, id: "hirao" }),
        C("homem", 200, "stand", { dy: 0.52, facing: -1, id: "lenhador-sidonio1" }),
      ] }),
      // v.7 — a alegria de um rei pagão: Hirão se levanta e bendiz ao SENHOR
      // pelo filho sábio que Ele deu a Davi. A glória sobe no palácio de Tiro —
      // a única bênção do capítulo sai da boca de um fenício.
      b(7, { by: "rei", q: "muito se alegrou, e disse:",
        env: { night: 0.18, glory: 0.66, storm: 0.02 }, cast: [
        C("rei", 60, "raise", { dy: 0.44, facing: -1, id: "hirao" }),
        C("servo", -90, "bow", { dy: 0.54, facing: 1, id: "mensageiro-de-salomao1" }),
        C("servo", -200, "stand", { dy: 0.5, facing: 1, id: "mensageiro-de-salomao2" }),
      ] }),
      // v.8 — a resposta formal, ponto por ponto: "ouvi o que me mandaste
      // dizer" — cedro E cipreste, toda a vontade do rei de Israel. Hirão
      // aponta para o lenhador, que é quem vai executar a ordem.
      b(8, { by: "rei", q: "E enviou Hirão a Salomão, dizendo:",
        env: { night: 0.2, glory: 0.6, storm: 0.03 }, cast: [
        C("rei", 40, "point", { dy: 0.46, facing: -1, id: "hirao" }),
        C("servo", -110, "stand", { dy: 0.56, facing: 1, id: "mensageiro-de-salomao1" }),
        C("homem", 210, "stand", { dy: 0.5, facing: -1, id: "lenhador-sidonio1" }),
      ] }),
      // v.9 — ⭐ a logística inteira num versículo, encenada no cais: a madeira
      // desce do Líbano até ao mar e viaja em JANGADAS de troncos amarrados até
      // o lugar combinado, onde será desamarrada. Hirão aponta o largo; os
      // jangadeiros esperam a maré.
      b(9, { by: "rei", q: "eu as farei conduzir em jangadas pelo mar até ao lugar que me designares",
        set: "mar-de-tiro", props: MAR_DE_TIRO,
        env: { terrain: "field", night: 0.2, glory: 0.54, storm: 0.08, water: 0.72, verdure: 0.16 }, cast: [
        C("rei", -150, "point", { dy: 0.74, facing: 1, id: "hirao" }),
        C("servo", 30, "stand", { dy: 0.74, facing: -1, id: "jangadeiro-de-tiro1" }),
        C("servo", 190, "stand", { dy: 0.74, facing: -1, id: "jangadeiro-de-tiro2" }),
        C("servo", -260, "walk", { dy: 0.74, facing: 1, id: "mensageiro-de-salomao1" }),
      ] }),
      // v.10 — o corte no Líbano: os sidônios derrubando os cedros na encosta,
      // com os servos de Salomão trabalhando ao lado deles, como fora pedido.
      // A serra fica verde e escura — é floresta de altitude, não glória.
      b(10, { q: "Assim deu Hirão a Salomão madeira de cedro e madeira de cipreste",
        set: "libano-cedros", props: LIBANO_CEDROS,
        env: { terrain: "mountain", night: 0.28, glory: 0.3, storm: 0.1, water: 0.06, verdure: 0.62 }, cast: [
        C("homem", -140, "stand", { dy: 0.56, facing: 1, id: "lenhador-sidonio1" }),
        C("homem", -10, "raise", { dy: 0.62, facing: 1, id: "lenhador-sidonio2" }),
        C("servo", 160, "stand", { dy: 0.58, facing: -1, id: "servo-de-salomao-no-libano" }),
        C("servo", 270, "walk", { dy: 0.52, facing: -1, id: "servo-de-hirao1" }),
      ] }),
      // v.11 — o outro lado do acordo: vinte mil coros de trigo e vinte coros de
      // AZEITE BATIDO por ano para a casa de Hirão. O feixe novo, as talhas
      // cheias e os fardos prontos para subir a estrada da costa.
      b(11, { q: "E Salomão deu a Hirão vinte mil coros de trigo, para sustento da sua casa, e vinte coros de azeite batido",
        set: "trigo-e-azeite", props: TRIGO_E_AZEITE,
        env: { terrain: "field", night: 0.2, glory: 0.5, storm: 0.04, water: 0.1, verdure: 0.5 }, cast: [
        C("rei", -90, "point", { dy: 0.48, facing: 1, id: "salomao" }),
        C("servo", 70, "stand", { dy: 0.6, facing: -1, id: "servo-do-tributo1" }),
        C("servo", 200, "walk", { dy: 0.56, facing: -1, id: "servo-de-hirao2" }),
      ] }),
      // v.12 — o fecho da negociação, e o crédito de tudo: o SENHOR deu a
      // Salomão SABEDORIA, como lhe tinha falado. Os dois reis e o acordo
      // escrito entre eles, com o salão no auge da luz.
      b(12, { q: "e houve paz entre Hirão e Salomão, e ambos fizeram acordo.",
        set: "salao-de-salomao", props: SALAO_DE_SALOMAO,
        env: { terrain: "city", night: 0.14, glory: 0.78, storm: 0.02, water: 0.05, verdure: 0.3 }, cast: [
        C("rei", -70, "raise", { dy: 0.46, facing: 1, id: "salomao", glow: 0.3 }),
        C("rei", 90, "stand", { dy: 0.46, facing: -1, id: "hirao" }),
        C("anciao", -230, "write", { dy: 0.52, facing: 1, id: "escriba-de-salomao" }),
        C("servo", 230, "bow", { dy: 0.54, facing: -1, id: "servo-de-hirao1" }),
      ] }),
      // v.13 — a LEVA: trinta mil homens tirados de todo o Israel. Não é festa,
      // é alistamento — por isso figuras individuais no portão, e não multidão
      // comemorando: o rei aponta, e os homens saem pela porta da cidade.
      b(13, { q: "E o rei Salomão fez subir uma leva de gente dentre todo o Israel, e foi a leva de gente trinta mil homens;",
        set: "praca-da-leva", props: PRACA_DA_LEVA,
        env: { terrain: "city", night: 0.26, glory: 0.42, storm: 0.08, water: 0.05, verdure: 0.3 }, cast: [
        C("rei", -140, "point", { dy: 0.44, facing: 1, id: "salomao" }),
        C("homem", 20, "stand", { dy: 0.6, facing: -1, id: "homem-da-leva1" }),
        C("homem", 130, "stand", { dy: 0.56, facing: -1, id: "homem-da-leva2" }),
        C("homem", 240, "walk", { dy: 0.5, facing: -1, id: "homem-da-leva3" }),
      ] }),
      // v.14 — o sistema de turnos, no arraial da estrada do Líbano: dez mil por
      // mês, um mês fora e dois em casa, e ADONIRÃO em pé sobre a leva. O
      // primeiro cedro já aparece à beira do caminho.
      b(14, { q: "um mês estavam no Líbano, e dois meses cada um em sua casa; e Adonirão estava sobre a leva de gente.",
        set: "arraial-da-leva", props: ARRAIAL_DA_LEVA,
        env: { terrain: "mountain", night: 0.34, glory: 0.28, storm: 0.1, water: 0.05, verdure: 0.5 }, cast: [
        C("homem", -40, "point", { dy: 0.5, facing: 1, id: "adonirao" }),
        C("homem", 110, "walk", { dy: 0.6, facing: 1, id: "homem-da-leva1" }),
        C("homem", 230, "walk", { dy: 0.56, facing: 1, id: "homem-da-leva2" }),
        C("servo", -200, "stand", { dy: 0.56, facing: -1, id: "servo-do-turno" }),
      ] }),
      // v.15 — cento e cinquenta mil homens no total: setenta mil debaixo das
      // cargas, curvados na subida, e oitenta mil talhando pedra na frente de
      // corte. A pedreira é onde mora todo o barulho desta obra.
      b(15, { q: "Tinha também Salomão setenta mil que levavam as cargas, e oitenta mil que talhavam pedras nas montanhas,",
        set: "pedreira", props: PEDREIRA,
        env: { terrain: "mountain", night: 0.32, glory: 0.26, storm: 0.14, water: 0.04, verdure: 0.24 }, cast: [
        C("servo", -160, "bow", { dy: 0.6, facing: 1, id: "carregador-da-carga1" }),
        C("servo", -40, "walk", { dy: 0.66, facing: 1, id: "carregador-da-carga2" }),
        C("homem", 120, "raise", { dy: 0.56, facing: -1, id: "cortador-de-pedra1" }),
        C("homem", 250, "stand", { dy: 0.5, facing: -1, id: "cortador-de-pedra2" }),
      ] }),
      // v.16 — a camada que faz a máquina girar: três mil e trezentos chefes de
      // oficiais dando as ordens. Eles ficam ALTOS na bancada (dy baixo), e os
      // homens da carga e do corte, abaixo deles, na frente do quadro.
      b(16, { q: "os quais davam as ordens ao povo que fazia aquela obra.",
        env: { night: 0.28, glory: 0.34, storm: 0.1 }, cast: [
        C("homem", -20, "point", { dy: 0.42, facing: 1, id: "oficial-da-obra1" }),
        C("homem", 120, "stand", { dy: 0.46, facing: -1, id: "oficial-da-obra2" }),
        C("servo", -190, "bow", { dy: 0.66, facing: 1, id: "carregador-da-carga1" }),
        C("homem", 230, "kneel", { dy: 0.62, facing: -1, id: "cortador-de-pedra1" }),
      ] }),
      // v.17 — ⭐ as PEDRAS GRANDES, pedras valiosas, pedras lavradas, para
      // FUNDAR a casa. O bloco solto ocupa meio quadro; o rei em pessoa veio
      // ver a pedra que vai ficar debaixo de tudo e nunca mais será vista.
      b(17, { q: "E mandou o rei que trouxessem pedras grandes, e pedras valiosas, pedras lavradas, para fundarem a casa.",
        set: "pedras-grandes", props: PEDRAS_GRANDES,
        env: { terrain: "mountain", night: 0.26, glory: 0.42, storm: 0.08, water: 0.04, verdure: 0.22 }, cast: [
        C("rei", -260, "point", { dy: 0.52, facing: 1, id: "salomao" }),
        C("homem", -20, "stand", { dy: 0.6, facing: 1, id: "cortador-de-pedra1" }),
        C("homem", 110, "kneel", { dy: 0.64, facing: -1, id: "cortador-de-pedra2" }),
        C("homem", 220, "stand", { dy: 0.56, facing: -1, id: "oficial-da-obra1" }),
      ] }),
      // v.18 — o canteiro de Jerusalém antes da primeira parede: os edificadores
      // de Hirão e os GIBLITAS, os pedreiros de Gebal, preparando a madeira e a
      // pedra. Tudo o que vai subir no capítulo 6 é lavrado aqui, no chão.
      b(18, { q: "E as lavraram os edificadores de Hirão, e os giblitas; e preparavam a madeira e as pedras para edificar a casa.",
        set: "canteiro-de-jerusalem", props: CANTEIRO_DE_JERUSALEM,
        env: { terrain: "city", night: 0.24, glory: 0.44, storm: 0.06, water: 0.05, verdure: 0.28 }, cast: [
        C("homem", -120, "kneel", { dy: 0.62, facing: 1, id: "edificador-de-hirao1" }),
        C("homem", 10, "stand", { dy: 0.58, facing: 1, id: "giblita1" }),
        C("homem", 130, "kneel", { dy: 0.64, facing: -1, id: "giblita2" }),
        C("servo", 250, "walk", { dy: 0.54, facing: -1, id: "carregador-da-carga1" }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ 1Rs 6
  6: {
    start: { terrain: "city", night: 0.2, glory: 0.5, storm: 0.05, fire: 0, water: 0.06, verdure: 0.3 },
    beats: [
      // v.1 — a data mais datada do Antigo Testamento: quatrocentos e oitenta
      // anos depois do Egito, ano quarto de Salomão, mês de ZIVE. O altar da
      // eira de Araúna ainda está de pé quando as duas primeiras pedras do
      // templo são assentadas ao lado dele.
      b(1, { q: "começou a edificar a casa do SENHOR.",
        set: "moria-fundacao", props: MORIA_FUNDACAO,
        env: { terrain: "field", night: 0.16, glory: 0.62, storm: 0.03, water: 0.05, verdure: 0.36 }, cast: [
        C("rei", -40, "raise", { dy: 0.5, facing: 1, id: "salomao", glow: 0.24 }),
        C("anciao", -200, "stand", { dy: 0.54, facing: 1, id: "escriba-de-salomao" }),
        C("homem", 120, "kneel", { dy: 0.62, facing: -1, id: "mestre-de-obra-do-templo" }),
        C("homem", 250, "stand", { dy: 0.56, facing: -1, id: "edificador-de-hirao1" }),
      ] }),
      // v.2 — a casa em pé no canteiro e as três medidas: sessenta côvados de
      // comprimento, vinte de largura, trinta de altura. O mestre de obra aponta
      // o vulto que agora tem tamanho.
      b(2, { q: "era de sessenta côvados de comprimento, e de vinte côvados de largura, e de trinta côvados de altura.",
        set: "casa-erguendo-se", props: A_CASA_ERGUENDO_SE,
        env: { terrain: "city", night: 0.2, glory: 0.52, storm: 0.05, water: 0.05, verdure: 0.28 }, cast: [
        C("homem", -160, "point", { dy: 0.56, facing: 1, id: "mestre-de-obra-do-templo" }),
        C("homem", 60, "stand", { dy: 0.62, facing: -1, id: "edificador-de-hirao1" }),
        C("servo", 210, "walk", { dy: 0.58, facing: -1, id: "carregador-da-carga1" }),
      ] }),
      // v.3 — o PÓRTICO diante do templo: vinte côvados de largura, dez de
      // fundo. O quadro vira para a frente da casa, com o alpendre entre as duas
      // colunas e a porta grande ao lado.
      b(3, { q: "E o pórtico diante do templo da casa era de vinte côvados de comprimento",
        set: "portico", props: O_PORTICO,
        env: { night: 0.2, glory: 0.56, storm: 0.04 }, cast: [
        C("homem", -200, "stand", { dy: 0.54, facing: 1, id: "mestre-de-obra-do-templo" }),
        C("homem", 90, "raise", { dy: 0.6, facing: -1, id: "giblita1" }),
        C("servo", 240, "stand", { dy: 0.56, facing: -1, id: "carregador-da-carga2" }),
      ] }),
      // v.4 — as JANELAS DE GELÓSIAS FIXAS, estreitas por fora e largas por
      // dentro: os entalhadores trabalham LÁ EM CIMA (dy baixo, no fundo do
      // palco), e o carregador fica minúsculo lá embaixo, na frente.
      b(4, { q: "E fez para a casa janelas de gelósias fixas.",
        env: { night: 0.18, glory: 0.6, storm: 0.03 }, cast: [
        C("homem", -60, "stand", { dy: 0.3, facing: 1, id: "entalhador-do-cedro1" }),
        C("homem", 150, "kneel", { dy: 0.34, facing: -1, id: "entalhador-do-cedro2" }),
        C("servo", -250, "stand", { dy: 0.62, facing: 1, id: "carregador-da-carga1" }),
      ] }),
      // v.5 — as CÂMARAS LATERAIS: um cinturão de cômodos em redor do muro da
      // casa, tanto do templo como do oráculo. O corpo do templo à esquerda, o
      // caracol à direita e a porta da câmara já rasgada no muro.
      b(5, { q: "E edificou câmaras junto ao muro da casa, contra as paredes da casa, em redor",
        set: "camaras-laterais", props: CAMARAS_LATERAIS,
        env: { terrain: "city", night: 0.24, glory: 0.46, storm: 0.06, verdure: 0.26 }, cast: [
        C("homem", -30, "stand", { dy: 0.58, facing: 1, id: "giblita1" }),
        C("homem", 180, "kneel", { dy: 0.54, facing: -1, id: "edificador-de-hirao1" }),
        C("servo", -240, "walk", { dy: 0.62, facing: 1, id: "carregador-da-carga2" }),
      ] }),
      // v.6 — os três andares — cinco, seis e sete côvados —, cada um mais largo
      // que o de baixo, porque a parede da casa se estreita em ENCOSTOS por
      // fora, "para que as vigas não se apoiassem nas paredes". Três obreiros em
      // três alturas dizem a medida sem precisar de número.
      b(6, { q: "porque pela parte de fora da casa, em redor, fizera encostos, para que as vigas não se apoiassem nas paredes da casa.",
        env: { night: 0.26, glory: 0.44, storm: 0.06 }, cast: [
        C("homem", -70, "stand", { dy: 0.3, facing: 1, id: "entalhador-do-cedro1" }),
        C("homem", 60, "stand", { dy: 0.5, facing: -1, id: "giblita1" }),
        C("homem", 200, "kneel", { dy: 0.68, facing: -1, id: "giblita2" }),
      ] }),
      // v.7 — ⭐⭐ O SILÊNCIO. As pedras chegam PRONTAS da pedreira e a casa se
      // edifica sem que se ouça martelo, machado ou qualquer instrumento de
      // ferro. Encenação própria: `storm` em ZERO, sem fogueira, sem poeira, e
      // os cinco obreiros TODOS em `stand` — nenhuma ferramenta erguida, ninguém
      // batendo. O único milagre registrado nestes dois capítulos é acústico.
      b(7, { q: "de maneira que nem martelo, nem machado, nem nenhum outro instrumento de ferro se ouviu na casa quando a edificavam.",
        set: "casa-em-silencio", props: A_CASA_EM_SILENCIO,
        env: { terrain: "city", night: 0.18, glory: 0.6, storm: 0, fire: 0, water: 0.04, verdure: 0.26 }, cast: [
        C("homem", -140, "stand", { dy: 0.58, facing: 1, id: "cortador-de-pedra1" }),
        C("homem", -20, "stand", { dy: 0.64, facing: 1, id: "edificador-de-hirao1" }),
        C("homem", 110, "stand", { dy: 0.6, facing: -1, id: "giblita1" }),
        C("homem", 240, "stand", { dy: 0.54, facing: -1, id: "mestre-de-obra-do-templo" }),
        C("servo", -260, "stand", { dy: 0.56, facing: 1, id: "carregador-da-carga1" }),
      ] }),
      // v.8 — a porta da câmara do meio ao LADO DIREITO da casa, e o CARACOL por
      // onde se sobe do primeiro ao segundo andar e do segundo ao terceiro. O
      // carregador já está subindo pela torre da escada.
      b(8, { q: "A porta da câmara do meio estava ao lado direito da casa, e por caracóis se subia à do meio",
        set: "camaras-laterais", props: CAMARAS_LATERAIS,
        env: { terrain: "city", night: 0.28, glory: 0.42, storm: 0.05, verdure: 0.26 }, cast: [
        C("servo", 120, "walk", { dy: 0.36, facing: -1, id: "carregador-da-carga2" }),
        C("homem", 250, "stand", { dy: 0.44, facing: -1, id: "mestre-de-obra-do-templo" }),
        C("homem", -90, "walk", { dy: 0.6, facing: 1, id: "giblita1" }),
      ] }),
      // v.9 — o telhado: pranchões e tabuados de CEDRO fechando a casa por cima.
      // Os dois entalhadores trabalham no alto do quadro, sobre a última fiada.
      b(9, { q: "e cobriu a casa com pranchões e tabuados de cedro.",
        set: "casa-erguendo-se", props: A_CASA_ERGUENDO_SE,
        env: { terrain: "city", night: 0.2, glory: 0.54, storm: 0.04, verdure: 0.28 }, cast: [
        C("homem", -40, "stand", { dy: 0.24, facing: 1, id: "entalhador-do-cedro1" }),
        C("homem", 90, "kneel", { dy: 0.26, facing: -1, id: "entalhador-do-cedro2" }),
        C("servo", -230, "walk", { dy: 0.62, facing: 1, id: "carregador-da-carga1" }),
      ] }),
      // v.10 — o cinturão fechado: as câmaras em volta de TODA a casa, de cinco
      // côvados de altura, ligadas ao corpo do templo com madeira de cedro.
      // Agora os obreiros descem para o nível do chão.
      b(10, { q: "Também edificou as câmaras em volta de toda a casa, de cinco côvados de altura, e as ligou à casa com madeira de cedro.",
        env: { night: 0.22, glory: 0.5, storm: 0.04 }, cast: [
        C("homem", -190, "kneel", { dy: 0.5, facing: 1, id: "giblita1" }),
        C("homem", 40, "stand", { dy: 0.56, facing: 1, id: "giblita2" }),
        C("homem", 210, "stand", { dy: 0.52, facing: -1, id: "edificador-de-hirao1" }),
      ] }),
      // v.11 — ⭐ VOZ DO CÉU. "Então veio a palavra do Senhor a Salomão" — não há
      // profeta na frase, não há anjo, não há sonho: é palavra DIRETA, sem
      // mediador. `by:"deus"`, balão dourado sem figura, glória no alto, e o
      // canteiro inteiro parado — o rei e os obreiros de joelhos dentro da casa
      // que ainda não tem teto acabado. Props declarados no beat para não herdar
      // outro cenário no clímax.
      dv(11, { q: "Então veio a palavra do Senhor a Salomão",
        props: A_CASA_ERGUENDO_SE,
        env: { terrain: "city", night: 0.1, glory: 0.86, storm: 0.02, water: 0.04, verdure: 0.26 }, cast: [
        C("rei", -30, "kneel", { dy: 0.56, facing: 1, id: "salomao" }),
        C("homem", 150, "bow", { dy: 0.6, facing: -1, id: "mestre-de-obra-do-templo" }),
        C("homem", 260, "kneel", { dy: 0.54, facing: -1, id: "giblita1" }),
        C("servo", -230, "bow", { dy: 0.58, facing: 1, id: "carregador-da-carga1" }),
      ] }),
      // v.12 — a condição: a casa que ele edifica só vale o que valer a
      // obediência — estatutos, juízos, mandamentos —, e então "confirmarei para
      // contigo a minha palavra, a qual falei a Davi, teu pai". A glória sobe
      // mais, o rei se curva.
      dv(12, { q: "Quanto a esta casa que tu edificas, se andares nos meus estatutos",
        env: { night: 0.08, glory: 0.92, storm: 0.01 }, cast: [
        C("rei", -30, "bow", { dy: 0.56, facing: 1, id: "salomao" }),
        C("homem", 150, "kneel", { dy: 0.6, facing: -1, id: "mestre-de-obra-do-templo" }),
        C("homem", 260, "bow", { dy: 0.54, facing: -1, id: "giblita1" }),
        C("servo", -230, "kneel", { dy: 0.58, facing: 1, id: "carregador-da-carga1" }),
      ] }),
      // v.13 — a promessa que é o verdadeiro alicerce da obra: não o ouro, não o
      // cedro, não as pedras de preço — "HABITAREI no meio dos filhos de Israel,
      // e não desampararei o meu povo de Israel". Glória no auge, todos por
      // terra, e nenhuma figura de Deus no palco.
      dv(13, { q: "E habitarei no meio dos filhos de Israel, e não desampararei o meu povo de Israel.",
        env: { night: 0.06, glory: 0.98, storm: 0.01 }, cast: [
        C("rei", -60, "bow", { dy: 0.6, facing: 1, id: "salomao" }),
        C("homem", 90, "bow", { dy: 0.64, facing: -1, id: "mestre-de-obra-do-templo" }),
        C("homem", 230, "kneel", { dy: 0.56, facing: -1, id: "giblita1" }),
        C("servo", -250, "bow", { dy: 0.58, facing: 1, id: "carregador-da-carga1" }),
      ] }),
      // v.14 — a palavra passa e a obra continua: "assim edificou Salomão aquela
      // casa, e a acabou". O rei de pé outra vez, o mestre de obra erguendo o
      // braço — a estrutura está fechada, falta tudo o que é por dentro.
      b(14, { q: "Assim edificou Salomão aquela casa, e a acabou.",
        env: { night: 0.16, glory: 0.6, storm: 0.03 }, cast: [
        C("rei", -60, "stand", { dy: 0.5, facing: 1, id: "salomao" }),
        C("homem", 110, "raise", { dy: 0.58, facing: -1, id: "mestre-de-obra-do-templo" }),
        C("homem", 240, "stand", { dy: 0.54, facing: -1, id: "edificador-de-hirao1" }),
      ] }),
      // v.15 — entramos. Tábuas de cedro do soalho ao teto, e o soalho coberto
      // de cipreste: o quadro é fechado, sem céu, com o cheiro de resina que o
      // texto não escreve mas o cedro todo faz sentir.
      b(15, { q: "Também cobriu as paredes da casa por dentro com tábuas de cedro",
        set: "interior-de-cedro", props: INTERIOR_DE_CEDRO,
        env: { terrain: "city", night: 0.3, glory: 0.44, storm: 0.02, water: 0.03, verdure: 0.1 }, cast: [
        C("homem", -140, "kneel", { dy: 0.62, facing: 1, id: "entalhador-do-cedro1" }),
        C("homem", 20, "stand", { dy: 0.58, facing: 1, id: "entalhador-do-cedro2" }),
        C("servo", 190, "walk", { dy: 0.6, facing: -1, id: "carregador-da-carga2" }),
      ] }),
      // v.16 — os vinte côvados do fundo separados por tábuas de cedro: nasce
      // ali dentro o ORÁCULO, o SANTO DOS SANTOS. O rei entrou para ver a
      // divisória subir.
      b(16, { q: "e por dentro lhas edificou para o oráculo, para o Santo dos Santos.",
        env: { night: 0.28, glory: 0.5, storm: 0.02 }, cast: [
        C("homem", -40, "raise", { dy: 0.5, facing: 1, id: "entalhador-do-cedro1" }),
        C("homem", 130, "stand", { dy: 0.56, facing: -1, id: "giblita2" }),
        C("rei", -250, "stand", { dy: 0.54, facing: 1, id: "salomao" }),
      ] }),
      // v.17 — e o que sobra à frente da divisória, o TEMPLO ANTERIOR, tem
      // quarenta côvados. O palco vira nave comprida: quatro colunas fugindo
      // para o fundo, e o rei andando por ela para medir o tamanho a pé.
      b(17, { q: "A casa, isto é, o templo anterior tinha quarenta côvados.",
        set: "templo-anterior", props: O_TEMPLO_ANTERIOR,
        env: { terrain: "city", night: 0.28, glory: 0.52, storm: 0.02, verdure: 0.08 }, cast: [
        C("rei", -30, "walk", { dy: 0.56, facing: 1, id: "salomao" }),
        C("anciao", -230, "stand", { dy: 0.52, facing: 1, id: "escriba-de-salomao" }),
        C("homem", 200, "stand", { dy: 0.5, facing: -1, id: "mestre-de-obra-do-templo" }),
      ] }),
      // v.18 — o lavor do cedro por dentro: BOTÕES e FLORES ABERTAS talhados na
      // madeira, e a frase que fecha o assunto — "tudo era cedro, pedra nenhuma
      // se via". Os dois entalhadores de joelhos, colados na parede.
      b(18, { q: "E o cedro da casa por dentro era lavrado de botões e flores abertas; tudo era cedro, pedra nenhuma se via.",
        set: "interior-de-cedro", props: INTERIOR_DE_CEDRO,
        env: { night: 0.26, glory: 0.56, storm: 0.02 }, cast: [
        C("homem", -80, "kneel", { dy: 0.6, facing: 1, id: "entalhador-do-cedro1" }),
        C("homem", 70, "kneel", { dy: 0.64, facing: -1, id: "entalhador-do-cedro2" }),
        C("servo", 240, "stand", { dy: 0.56, facing: -1, id: "carregador-da-carga1" }),
      ] }),
      // v.19 — o oráculo preparado na parte mais interior, e a razão de tudo:
      // "para pôr ali a ARCA DA ALIANÇA do Senhor". A casa inteira é o estojo de
      // uma caixa — e a caixa é a única coisa aqui que não foi feita por Salomão.
      b(19, { q: "preparou o oráculo, para pôr ali a arca da aliança do Senhor.",
        set: "oraculo", props: O_ORACULO,
        env: { terrain: "city", night: 0.24, glory: 0.66, storm: 0.02, water: 0.03, verdure: 0.06 }, cast: [
        C("rei", -40, "stand", { dy: 0.5, facing: 1, id: "salomao" }),
        C("homem", -220, "kneel", { dy: 0.58, facing: 1, id: "mestre-de-obra-do-templo" }),
        C("anciao", 180, "bow", { dy: 0.56, facing: -1, id: "escriba-de-salomao" }),
      ] }),
      // v.20 — um cubo perfeito de vinte por vinte por vinte, revestido de OURO
      // PURO, e até o altar coberto de cedro. Os ourives de joelhos batendo a
      // folha de ouro na parede; a luz do cômodo dobra.
      b(20, { q: "e o revestiu de ouro puro; também revestiu de cedro o altar.",
        set: "oraculo-de-ouro", props: O_ORACULO_DE_OURO,
        env: { terrain: "city", night: 0.16, glory: 0.82, storm: 0.01, verdure: 0.05 }, cast: [
        C("homem", -90, "kneel", { dy: 0.6, facing: 1, id: "ourives-do-oraculo1" }),
        C("homem", 80, "kneel", { dy: 0.64, facing: -1, id: "ourives-do-oraculo2" }),
        C("rei", 250, "stand", { dy: 0.52, facing: -1, id: "salomao" }),
      ] }),
      // v.21 — a casa toda por dentro de ouro puro, e as CADEIAS DE OURO
      // segurando a cortina diante do oráculo. O rei ergue os braços no meio do
      // cômodo dourado — é o momento em que a obra deixa de ser construção e
      // vira culto.
      b(21, { q: "E revestiu Salomão a casa por dentro de ouro puro; e com cadeias de ouro pôs uma cortina diante do oráculo",
        env: { night: 0.12, glory: 0.88, storm: 0.01 }, cast: [
        C("rei", -20, "raise", { dy: 0.48, facing: 1, id: "salomao", glow: 0.22 }),
        C("homem", 130, "stand", { dy: 0.58, facing: -1, id: "ourives-do-oraculo1" }),
        C("homem", -230, "kneel", { dy: 0.6, facing: 1, id: "ourives-do-oraculo2" }),
      ] }),
      // v.22 — "assim cobriu de ouro TODA a casa, inteiramente" — e o altar que
      // estava diante do oráculo também. A glória quase estoura o quadro: não
      // sobrou uma tábua sem ouro.
      b(22, { q: "Assim cobriu de ouro toda a casa, inteiramente",
        env: { night: 0.08, glory: 0.96, storm: 0.01 }, cast: [
        C("homem", -150, "raise", { dy: 0.56, facing: 1, id: "ourives-do-oraculo1" }),
        C("homem", 40, "stand", { dy: 0.62, facing: 1, id: "ourives-do-oraculo2" }),
        C("rei", 220, "stand", { dy: 0.5, facing: -1, id: "salomao" }),
      ] }),
      // v.23 — os DOIS QUERUBINS de madeira de oliveira, de dez côvados de
      // altura cada um. Saímos do ouro para a oficina onde eles ainda estão
      // sendo talhados, com a oliveira que os deu logo atrás.
      b(23, { q: "E no oráculo fez dois querubins de madeira de oliveira, cada um da altura de dez côvados.",
        set: "querubins", props: OS_QUERUBINS,
        env: { terrain: "city", night: 0.2, glory: 0.7, storm: 0.02, verdure: 0.14 }, cast: [
        C("homem", -10, "stand", { dy: 0.66, facing: 1, id: "entalhador-do-cedro1" }),
        C("homem", 210, "kneel", { dy: 0.62, facing: -1, id: "entalhador-do-cedro2" }),
        C("rei", -250, "stand", { dy: 0.56, facing: 1, id: "salomao" }),
      ] }),
      // v.24 — a conta das asas: cinco côvados uma, cinco a outra — dez côvados
      // de ponta a ponta. O escrivão do reino mede com o braço estendido, o
      // entalhador ergue a mão até a ponta da asa.
      b(24, { q: "dez côvados havia desde a extremidade de uma das suas asas até à extremidade da outra das suas asas.",
        env: { night: 0.2, glory: 0.74, storm: 0.02 }, cast: [
        C("homem", -40, "raise", { dy: 0.6, facing: 1, id: "entalhador-do-cedro1" }),
        C("anciao", 190, "point", { dy: 0.58, facing: -1, id: "escriba-de-salomao" }),
        C("homem", 300, "stand", { dy: 0.52, facing: -1, id: "mestre-de-obra-do-templo" }),
      ] }),
      // v.25 — o segundo querubim é igual ao primeiro: "de uma mesma medida e de
      // um mesmo talhe". O escrivão anota a conferência entre os dois; nada aqui
      // pode sair do risco.
      b(25, { q: "ambos os querubins eram de uma mesma medida e de um mesmo talhe.",
        env: { night: 0.18, glory: 0.78, storm: 0.02 }, cast: [
        C("anciao", -30, "write", { dy: 0.62, facing: 1, id: "escriba-de-salomao" }),
        C("homem", 160, "stand", { dy: 0.58, facing: -1, id: "entalhador-do-cedro2" }),
        C("homem", -250, "kneel", { dy: 0.64, facing: 1, id: "entalhador-do-cedro1" }),
      ] }),
      // v.26 — a altura repetida por escrito, para que não reste dúvida: dez
      // côvados um, dez côvados o outro. O mestre de obra aponta do chão até o
      // alto da figura.
      b(26, { q: "A altura de um querubim era de dez côvados, e assim a do outro querubim.",
        env: { night: 0.18, glory: 0.8, storm: 0.02 }, cast: [
        C("homem", -190, "point", { dy: 0.56, facing: 1, id: "mestre-de-obra-do-templo" }),
        C("homem", 30, "stand", { dy: 0.64, facing: 1, id: "entalhador-do-cedro1" }),
        C("anciao", 230, "stand", { dy: 0.6, facing: -1, id: "escriba-de-salomao" }),
      ] }),
      // v.27 — ⭐ postos no MEIO DA CASA DE DENTRO: a asa de um toca uma parede,
      // a asa do outro toca a outra, e as asas de dentro se tocam uma na outra,
      // bem no eixo, exatamente por cima do lugar da arca. Voltamos ao oráculo
      // para ver as quatro asas fechando o cômodo.
      b(27, { q: "e os querubins estendiam as asas, de maneira que a asa de um tocava na parede, e a asa do outro querubim tocava na outra parede; e as suas asas no meio da casa tocavam uma na outra.",
        set: "oraculo", props: O_ORACULO,
        env: { terrain: "city", night: 0.14, glory: 0.9, storm: 0.01, verdure: 0.05 }, cast: [
        C("rei", -30, "raise", { dy: 0.54, facing: 1, id: "salomao", glow: 0.24 }),
        C("homem", 210, "bow", { dy: 0.6, facing: -1, id: "mestre-de-obra-do-templo" }),
        C("homem", -240, "kneel", { dy: 0.58, facing: 1, id: "entalhador-do-cedro1" }),
      ] }),
      // v.28 — quatro palavras e a oficina acaba: "e revestiu de ouro os
      // querubins". Os ourives batem a folha nas asas; a glória vai ao topo.
      b(28, { q: "E revestiu de ouro os querubins.",
        env: { night: 0.08, glory: 0.98, storm: 0.01 }, cast: [
        C("homem", -120, "raise", { dy: 0.62, facing: 1, id: "ourives-do-oraculo1" }),
        C("homem", 120, "kneel", { dy: 0.64, facing: -1, id: "ourives-do-oraculo2" }),
        C("rei", 270, "stand", { dy: 0.52, facing: -1, id: "salomao" }),
      ] }),
      // v.29 — o mesmo desenho corre por TODAS as paredes, em redor, por dentro
      // e por fora: querubins, PALMAS e flores abertas. O templo inteiro vira
      // jardim entalhado — a casa lembra o Éden de que o homem foi expulso.
      b(29, { q: "lavrou de esculturas e entalhes de querubins, e de palmas, e de flores abertas, por dentro e por fora.",
        set: "paredes-lavradas", props: AS_PAREDES_LAVRADAS,
        env: { terrain: "city", night: 0.2, glory: 0.72, storm: 0.02, verdure: 0.16 }, cast: [
        C("homem", -40, "kneel", { dy: 0.62, facing: 1, id: "entalhador-do-cedro1" }),
        C("homem", 130, "stand", { dy: 0.58, facing: -1, id: "entalhador-do-cedro2" }),
        C("homem", 270, "stand", { dy: 0.54, facing: -1, id: "giblita1" }),
      ] }),
      // v.30 — até o CHÃO: o soalho da casa revestido de ouro, por dentro e por
      // fora. Os dois ourives de joelhos bem na frente do palco, batendo ouro no
      // piso que ninguém deveria pisar com sandália.
      b(30, { q: "Também revestiu de ouro o soalho da casa, por dentro e por fora.",
        env: { night: 0.14, glory: 0.86, storm: 0.01 }, cast: [
        C("homem", -160, "kneel", { dy: 0.7, facing: 1, id: "ourives-do-oraculo1" }),
        C("homem", 20, "kneel", { dy: 0.74, facing: 1, id: "ourives-do-oraculo2" }),
        C("homem", 220, "stand", { dy: 0.6, facing: -1, id: "mestre-de-obra-do-templo" }),
      ] }),
      // v.31 — as PORTAS DO ORÁCULO, de madeira de oliveira, com o umbral de
      // cima e as ombreiras ocupando a quinta parte da parede. Duas folhas, uma
      // de cada lado do eixo, e a oliveira que as deu ao fundo.
      b(31, { q: "E à entrada do oráculo fez portas de madeira de oliveira",
        set: "portas-de-oliveira", props: AS_PORTAS_DE_OLIVEIRA,
        env: { terrain: "city", night: 0.22, glory: 0.68, storm: 0.02, verdure: 0.14 }, cast: [
        C("homem", -30, "stand", { dy: 0.62, facing: 1, id: "entalhador-do-cedro1" }),
        C("homem", 180, "kneel", { dy: 0.6, facing: -1, id: "entalhador-do-cedro2" }),
        C("rei", -260, "stand", { dy: 0.56, facing: 1, id: "salomao" }),
      ] }),
      // v.32 — nas duas folhas, o mesmo lavor de querubins, palmas e flores
      // abertas — e o ouro estendido POR CIMA do entalhe, acompanhando o
      // desenho. O ourives ergue a folha de ouro contra a porta.
      b(32, { q: "e lavrou nelas entalhes de querubins, e de palmas, e de flores abertas, os quais revestiu de ouro",
        env: { night: 0.16, glory: 0.84, storm: 0.01 }, cast: [
        C("homem", -90, "kneel", { dy: 0.66, facing: 1, id: "entalhador-do-cedro1" }),
        C("homem", 90, "raise", { dy: 0.62, facing: -1, id: "ourives-do-oraculo1" }),
        C("homem", 250, "stand", { dy: 0.56, facing: -1, id: "giblita2" }),
      ] }),
      // v.33 — e a PORTA DO TEMPLO, mais para fora: ombreiras de oliveira, da
      // quarta parte da parede. O quadro recua para o pórtico, com o corpo da
      // casa à esquerda e a oliveira do pátio à direita.
      b(33, { q: "E assim fez à porta do templo ombreiras de madeira de oliveira, da quarta parte da parede.",
        set: "porta-do-templo", props: A_PORTA_DO_TEMPLO,
        env: { terrain: "city", night: 0.22, glory: 0.6, storm: 0.03, verdure: 0.22 }, cast: [
        C("homem", -60, "point", { dy: 0.6, facing: 1, id: "mestre-de-obra-do-templo" }),
        C("homem", 130, "stand", { dy: 0.64, facing: -1, id: "entalhador-do-cedro1" }),
        C("servo", 250, "walk", { dy: 0.56, facing: -1, id: "carregador-da-carga2" }),
      ] }),
      // v.34 — as duas portas dessa entrada são de CIPRESTE, e as folhas de cada
      // uma são DOBRADIÇAS — abrem-se em duas, como um biombo. Os giblitas
      // experimentam o movimento das folhas.
      b(34, { q: "E eram as duas portas de madeira de cipreste; e as duas folhas de uma porta eram dobradiças",
        env: { night: 0.2, glory: 0.66, storm: 0.02 }, cast: [
        C("homem", -140, "stand", { dy: 0.62, facing: 1, id: "giblita1" }),
        C("homem", 60, "kneel", { dy: 0.68, facing: 1, id: "giblita2" }),
        C("homem", 230, "stand", { dy: 0.58, facing: -1, id: "edificador-de-hirao1" }),
      ] }),
      // v.35 — e nelas também: querubins, palmas, flores abertas, e o ouro
      // "acomodado ao lavor" — assentado dentro de cada sulco do entalhe, e não
      // por cima dele. O rei veio ver a porta pronta.
      b(35, { q: "E as lavrou de querubins e de palmas, e de flores abertas, e as revestiu de ouro acomodado ao lavor.",
        env: { night: 0.14, glory: 0.88, storm: 0.01 }, cast: [
        C("homem", -40, "kneel", { dy: 0.66, facing: 1, id: "entalhador-do-cedro1" }),
        C("homem", 120, "raise", { dy: 0.62, facing: -1, id: "ourives-do-oraculo1" }),
        C("rei", -270, "stand", { dy: 0.56, facing: 1, id: "salomao" }),
      ] }),
      // v.36 — o PÁTIO INTERIOR fechando o recinto: três ordens de pedras
      // lavradas e, por cima, uma ordem de vigas de cedro. Os cortadores de
      // pedra assentam a última fiada com a casa já pronta ao fundo.
      b(36, { q: "Também edificou o pátio interior de três ordens de pedras lavradas e de uma ordem de vigas de cedro.",
        set: "patio-interior", props: PATIO_INTERIOR,
        env: { terrain: "city", night: 0.2, glory: 0.62, storm: 0.03, verdure: 0.26 }, cast: [
        C("homem", -150, "kneel", { dy: 0.64, facing: 1, id: "cortador-de-pedra1" }),
        C("homem", 30, "stand", { dy: 0.6, facing: 1, id: "cortador-de-pedra2" }),
        C("homem", 160, "stand", { dy: 0.56, facing: -1, id: "giblita1" }),
        C("servo", 290, "walk", { dy: 0.52, facing: -1, id: "carregador-da-carga1" }),
      ] }),
      // v.37 — o texto volta ao começo para fechar a conta do tempo: no ano
      // QUARTO, no mês de ZIVE, se pôs o fundamento. Voltamos ao Moriá do
      // primeiro dia, com o rei ajoelhado onde a primeira pedra desceu.
      b(37, { q: "No ano quarto se pôs o fundamento da casa do Senhor, no mês de Zive.",
        set: "moria-fundacao", props: MORIA_FUNDACAO,
        env: { terrain: "field", night: 0.24, glory: 0.5, storm: 0.03, water: 0.05, verdure: 0.36 }, cast: [
        C("rei", -80, "kneel", { dy: 0.56, facing: 1, id: "salomao" }),
        C("anciao", 90, "write", { dy: 0.6, facing: -1, id: "escriba-de-salomao" }),
        C("homem", 240, "stand", { dy: 0.54, facing: -1, id: "mestre-de-obra-do-templo" }),
      ] }),
      // v.38 — e o fecho: ano UNDÉCIMO, mês de BUL, a casa acabada "com todas as
      // suas coisas, e com tudo o que lhe convinha" — SETE ANOS de obra. A casa
      // inteira no centro do quadro, o sol cheio em cima dela e o povo em festa
      // (ninguém em luto nesta cena: a multidão é legítima aqui).
      b(38, { q: "e a edificou em sete anos.",
        set: "casa-acabada", props: A_CASA_ACABADA,
        env: { terrain: "field", night: 0.1, glory: 0.96, storm: 0.01, water: 0.05, verdure: 0.42 }, cast: [
        C("rei", -160, "raise", { dy: 0.56, facing: 1, id: "salomao", glow: 0.3 }),
        C("multidao", 90, "raise", { dy: 0.6, facing: -1, id: "povo-de-israel-na-casa-acabada" }),
        C("anciao", 260, "stand", { dy: 0.52, facing: -1, id: "escriba-de-salomao" }),
      ] }),
    ],
  },
};
