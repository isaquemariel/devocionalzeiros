// ============================================================================
// 1 REIS 8 — CENA VIVA. A ARCA SOBE DE SIÃO, A NUVEM ENCHE A CASA e os
// sacerdotes não conseguem ficar de pé. É o capítulo mais longo do livro e o
// ponto mais alto do reinado inteiro: o dia em que o templo deixa de ser obra
// e passa a ser MORADA.
//
// 1Rs 8 — Salomão congrega os ANCIÃOS DE ISRAEL, todos os cabeças das tribos e
// os chefes dos pais diante de si em Jerusalém, "para fazerem subir a arca da
// aliança do SENHOR da cidade de Davi, que é Sião". Todos os homens de Israel
// se ajuntam ao rei na ocasião da festa, no MÊS DE ETANIM, que é o sétimo mês.
// Vêm os anciãos, os SACERDOTES ALÇAM A ARCA, e atrás dela sobem o tabernáculo
// da congregação e todos os objetos sagrados que havia nele, carregados pelos
// sacerdotes e pelos levitas. Diante da arca, o rei e toda a congregação
// sacrificam ovelhas e vacas "que não se podiam contar nem numerar pela sua
// quantidade" — a única contagem que o capítulo desiste de fazer. A arca chega
// ao seu lugar: ao ORÁCULO DA CASA, ao lugar santíssimo, até DEBAIXO DAS ASAS
// DOS QUERUBINS, que estendem ambas as asas sobre o lugar dela e cobrem por
// cima a arca e os seus varais. Os varais sobressaem tanto que as pontas se
// veem desde o santuário diante do oráculo, "porém de fora não se viam; e
// ficaram ali até ao dia de hoje". E o texto abre a arca para dizer o que há
// dentro: NADA, senão só AS DUAS TÁBUAS DE PEDRA que Moisés ali pusera junto a
// Horebe. Então, saindo os sacerdotes do santuário, UMA NUVEM ENCHE A CASA DO
// SENHOR, e os sacerdotes não podem permanecer em pé para ministrar por causa
// da nuvem — "porque a glória do SENHOR enchera a casa do SENHOR".
//
// Salomão fala: "o SENHOR disse que ele habitaria nas trevas. Certamente te
// edifiquei uma casa para morada, assento para a tua eterna habitação". Vira o
// rosto e abençoa toda a congregação, que está EM PÉ, e conta a história da
// promessa: desde o Egito o SENHOR não escolhera cidade para ali estabelecer o
// seu nome, mas escolhera Davi; e a Davi, que propusera no coração edificar a
// casa, Ele respondera "bem fizeste em o propor no teu coração… todavia TU não
// edificarás esta casa; porém teu filho". E então a ORAÇÃO: o rei diante do
// ALTAR DE COBRE, de joelhos, com as mãos estendidas para os céus, e a
// pergunta que atravessa a Bíblia inteira — "MAS, NA VERDADE, HABITARIA DEUS NA
// TERRA? Eis que os céus, e até o céu dos céus, não te poderiam conter, quanto
// menos esta casa que eu tenho edificado". Vêm os SETE PEDIDOS, cada um uma
// situação concreta: o juramento de maldição diante do altar; o povo ferido
// diante do inimigo; O CÉU FECHADO SEM CHUVA; a fome, a peste, a queima de
// searas, a ferrugem, os GAFANHOTOS e o pulgão, e o inimigo cercando as
// cidades; O ESTRANGEIRO que não é do povo e vem de terras remotas por amor do
// nome; o exército que sai à guerra pelo caminho por que foi enviado; e os
// CATIVOS na terra do inimigo, que caem em si, se convertem de todo o coração
// e oram voltados para a sua terra, para a cidade e para a casa. O refrão que
// amarra tudo: "ouve tu nos céus, assento da tua habitação, e perdoa".
//
// Acabada a oração, Salomão se levanta de diante do altar, põe-se em pé e
// abençoa a congregação EM ALTA VOZ: "bendito seja o SENHOR, que deu repouso ao
// seu povo Israel… NEM UMA SÓ PALAVRA CAIU de todas as suas boas palavras". O
// apelo final é ao coração: "e seja o vosso coração inteiro para com o SENHOR
// nosso Deus". E a FESTA: vinte e duas mil vacas e cento e vinte mil ovelhas em
// sacrifício pacífico; o MEIO DO ÁTRIO santificado no mesmo dia porque o altar
// de cobre era pequeno demais para caberem os holocaustos, as ofertas e a
// gordura; sete dias e mais sete dias, CATORZE DIAS, com uma grande congregação
// desde a entrada de Hamate até ao rio do Egito. No oitavo dia ele despede o
// povo — e eles abençoam o rei e se vão às suas tendas "alegres e felizes de
// coração, por causa de todo o bem que o SENHOR fizera a Davi seu servo, e a
// Israel seu povo".
//
// A VOZ DE DEUS — em 1Rs 8 o SENHOR NÃO FALA UMA ÚNICA VEZ em balão, e isso é a
// espinha dorsal do capítulo. Ele responde de outro jeito: A NUVEM ENCHE A CASA
// (vv.10-11) e a glória expulsa do santuário os próprios sacerdotes que a
// serviam. Por isso os beats 10 e 11 não têm `by` nenhum — só `clouds` com
// `sky:true` descendo sobre a casa, `glory` no máximo e os sacerdotes em `bow` e
// `kneel`, incapazes de ministrar; e por isso `multidao` está proibida ali (o
// motor a desenharia comemorando justamente onde ninguém consegue ficar de pé).
// Quem fala o capítulo inteiro é SALOMÃO — `by:"rei"`, id `salomao`, sempre o
// PRIMEIRO `rei` do elenco. Quando ele CITA o SENHOR (vv.16, 18-19, 25) o balão
// continua sendo dele: é o rei recitando a promessa diante do povo, não uma voz
// do céu. Nos sete pedidos (vv.31-53) as situações que ele descreve são
// ENCENADAS — a derrota, a seca, os gafanhotos, o cerco, o estrangeiro na
// estrada, o exército saindo, os cativos na terra inimiga — e o rei permanece
// em cena, ajoelhado na beira do quadro com as mãos abertas: a visão é a
// oração dele, e é ele quem a diz.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
// (sem `dv` aqui: em 1Rs 8 o SENHOR não fala em balão nenhuma vez — ver o
//  parágrafo "A VOZ DE DEUS" no cabeçalho.)

// ------------------------------------------------------------ SETS: A SUBIDA

// A PRAÇA DIANTE DA CASA NOVA, EM JERUSALÉM — o pátio onde Salomão congrega os
// anciãos, os cabeças das tribos e os chefes dos pais: a CASA acabada de pé ao
// fundo, as duas colunas de cobre do pórtico, a porta grande, a torre da
// muralha e a palmeira do pátio. Ainda não há arca aqui — é isso que falta.
const PRACA_DE_JERUSALEM: StagePropSpec[] = [
  { ...P("church", 0, 1.3, undefined, 0.22), tag: "casa-do-senhor" },
  P("column", -85, 1.25, undefined, 0.34),
  P("column", 85, 1.25, undefined, 0.34),
  P("door", 185, 1.0, undefined, 0.36),
  P("tower", -245, 1.2, undefined, 0.2),
  P("palm", 315, 1.1, undefined, 0.16),
  P("crate", 250, 0.85, undefined, 0.62),
  P("grass", -160, 0.78, undefined, 0.74),
];

// SIÃO, A CIDADE DE DAVI — a colina baixa de onde a arca vai subir: a TENDA que
// Davi armara para ela, a ARCA ainda no seu lugar antigo, as trombetas dos
// sacerdotes, a harpa dos cantores e a torre da cidade velha. Um lugar
// provisório sendo desmontado depois de quarenta anos.
const SIAO_CIDADE_DE_DAVI: StagePropSpec[] = [
  { ...P("tent", -240, 1.3, undefined, 0.28), tag: "tenda-da-congregacao" },
  { ...P("ark", -70, 1.0, undefined, 0.52), tag: "arca-da-alianca" },
  { ...P("trumpet", 80, 0.9, undefined, 0.44), tag: "trombetas-da-subida-da-arca" },
  P("harp", 175, 0.85, undefined, 0.5),
  P("tower", 250, 1.2, undefined, 0.2),
  P("rock", 305, 1.0, undefined, 0.56),
  P("grass", -140, 0.78, undefined, 0.74),
];

// O CAMINHO DA SUBIDA — a estrada entre Sião e o monte da casa, com o
// TABERNÁCULO DA CONGREGAÇÃO desmontado e todos os OBJETOS SAGRADOS a caminho:
// a tenda nos ombros, as bacias, o incensário, o candelabro e o menorá indo
// embrulhados, e a casa nova já visível no alto da subida.
const CAMINHO_DA_SUBIDA: StagePropSpec[] = [
  { ...P("tent", -170, 1.2, undefined, 0.3), tag: "tenda-da-congregacao" },
  { ...P("church", 130, 1.15, undefined, 0.2), tag: "casa-do-senhor" },
  P("bowl", 30, 0.8, undefined, 0.6),
  P("censer", -50, 0.78, undefined, 0.68),
  P("menorah", 225, 0.85, undefined, 0.5),
  P("lampstand", -265, 0.85, undefined, 0.52),
  P("palm", 315, 1.05, undefined, 0.16),
  P("grass", 70, 0.78, undefined, 0.76),
];

// O ALTAR DA SUBIDA — a parada do sacrifício diante da arca, no meio do
// caminho: o altar aceso, o curral improvisado com as ovelhas e as vacas que
// ninguém conseguiu contar, os fardos da festa e a casa nova ao fundo.
const ALTAR_DA_SUBIDA: StagePropSpec[] = [
  P("altar", -40, 1.1, 0.85, 0.46),
  P("stall", 150, 1.1, undefined, 0.36),
  { ...P("church", 255, 1.05, undefined, 0.2), tag: "casa-do-senhor" },
  P("tower", -255, 1.15, undefined, 0.2),
  P("crate", 60, 0.85, undefined, 0.64),
  P("amphora", -150, 0.8, undefined, 0.62),
  P("grass", 300, 0.78, undefined, 0.74),
];

// ------------------------------------------------------- SETS: O LUGAR SANTO

// O ORÁCULO, O LUGAR SANTÍSSIMO — a câmara do fundo da casa, onde só a arca
// entra: os DOIS QUERUBINS de madeira de oliveira com as asas estendidas de
// parede a parede, a arca descendo ao seu lugar debaixo delas, as colunas
// douradas dos cantos e o candelabro da entrada. Não há janela aqui.
const ORACULO_DOS_QUERUBINS: StagePropSpec[] = [
  { ...P("cherub", -100, 1.3, undefined, 0.3), tag: "querubins-do-oraculo" },
  { ...P("cherub", 100, 1.3, undefined, 0.3), tag: "querubins-do-oraculo" },
  { ...P("ark", 0, 1.05, undefined, 0.52), tag: "arca-da-alianca" },
  P("lampstand", -255, 0.9, undefined, 0.5),
  P("column", -320, 1.25, undefined, 0.28),
  P("column", 320, 1.25, undefined, 0.28),
  P("censer", 215, 0.78, undefined, 0.62),
];

// O ORÁCULO COM A ARCA ABERTA — o mesmo lugar santíssimo no versículo que
// inventaria o que há dentro: AS DUAS TÁBUAS DE PEDRA postas no chão diante da
// arca, entre os querubins, e mais nada. O quadro mais vazio do capítulo, e é
// essa a notícia.
const ORACULO_COM_AS_TABUAS: StagePropSpec[] = [
  { ...P("cherub", -105, 1.25, undefined, 0.28), tag: "querubins-do-oraculo" },
  { ...P("cherub", 105, 1.25, undefined, 0.28), tag: "querubins-do-oraculo" },
  { ...P("ark", 0, 1.0, undefined, 0.48), tag: "arca-da-alianca" },
  { ...P("tablets", 0, 1.0, undefined, 0.7), tag: "tabuas-da-alianca" },
  P("column", -300, 1.25, undefined, 0.3),
  P("column", 300, 1.25, undefined, 0.3),
  P("lampstand", 215, 0.85, undefined, 0.58),
];

// O SANTUÁRIO DIANTE DO ORÁCULO — o lugar santo, um passo antes do fundo: a
// entrada do oráculo à esquerda, a arca vista de esguelha com AS PONTAS DOS
// VARAIS sobressaindo, o menorá aceso, o candelabro e a bacia do serviço
// diário. De fora ninguém vê nada disto.
const SANTUARIO_DOS_VARAIS: StagePropSpec[] = [
  P("menorah", -205, 0.95, undefined, 0.48),
  P("door", -75, 1.05, undefined, 0.26),
  { ...P("ark", 65, 1.0, undefined, 0.46), tag: "arca-da-alianca" },
  P("lampstand", 175, 0.88, undefined, 0.54),
  P("column", 265, 1.2, undefined, 0.3),
  P("censer", -285, 0.78, undefined, 0.58),
  P("bowl", 305, 0.75, undefined, 0.64),
];

// A CASA NO INSTANTE DA NUVEM — o pátio interior visto de frente, no segundo em
// que os sacerdotes saem do santuário: a casa ao centro, a porta ainda aberta
// por onde eles vêm saindo, o altar do átrio, as colunas do pórtico e a
// primeira NUVEM entrando pelo alto do quadro.
const CASA_NA_NUVEM: StagePropSpec[] = [
  { ...P("church", -25, 1.35, undefined, 0.22), tag: "casa-do-senhor" },
  P("door", 130, 1.05, undefined, 0.36),
  P("altar", -175, 1.05, undefined, 0.5),
  P("column", -240, 1.25, undefined, 0.3),
  P("column", 240, 1.25, undefined, 0.3),
  { ...P("clouds", 20, 1.3, undefined, 0.42), sky: true, tag: "nuvem-da-gloria" },
  P("grass", 305, 0.78, undefined, 0.74),
];

// A CASA CHEIA DA NUVEM — o mesmo pátio um versículo depois, e a nuvem já não
// cabe no céu: duas massas baixando sobre o telhado e sobre o pórtico, o altar
// apagado, a porta engolida. É aqui que o ministério para.
const CASA_NA_NUVEM_CHEIA: StagePropSpec[] = [
  { ...P("church", -25, 1.35, undefined, 0.22), tag: "casa-do-senhor" },
  { ...P("clouds", -40, 1.75, undefined, 0.26), sky: true, tag: "nuvem-da-gloria" },
  { ...P("clouds", 175, 1.45, undefined, 0.46), sky: true },
  P("column", -240, 1.25, undefined, 0.3),
  P("column", 240, 1.25, undefined, 0.3),
  P("door", 130, 1.0, undefined, 0.36),
  P("censer", -300, 0.78, undefined, 0.62),
];

// ---------------------------------------------------- SETS: A BÊNÇÃO E O POVO

// O PÁTIO DEBAIXO DA SOMBRA DA NUVEM — onde Salomão fala das TREVAS em que o
// SENHOR disse que habitaria: a casa fechada dentro da nuvem, o altar frio, a
// porta escura e o candelabro que ninguém acendeu. A luz vem de dentro da
// nuvem, não do céu.
const PATIO_DA_BENCAO: StagePropSpec[] = [
  { ...P("church", 35, 1.3, undefined, 0.22), tag: "casa-do-senhor" },
  { ...P("clouds", 60, 1.5, undefined, 0.3), sky: true, tag: "nuvem-da-gloria" },
  P("altar", -130, 1.05, undefined, 0.48),
  P("column", -235, 1.25, undefined, 0.32),
  P("door", 200, 1.0, undefined, 0.36),
  P("lampstand", 285, 0.85, undefined, 0.54),
  P("grass", 120, 0.78, undefined, 0.76),
];

// A CONGREGAÇÃO EM PÉ — o plano aberto do dia da bênção: o rei de costas para a
// casa e de rosto para o povo, o átrio inteiro tomado, as trombetas dos
// sacerdotes de um lado e a porta do pátio do outro. Todo o Israel de pé, e
// nenhum banco em cena.
const CONGREGACAO_EM_PE: StagePropSpec[] = [
  { ...P("church", -215, 1.2, undefined, 0.2), tag: "casa-do-senhor" },
  P("column", -120, 1.2, undefined, 0.3),
  { ...P("trumpet", 40, 0.9, undefined, 0.44), tag: "trombetas-da-subida-da-arca" },
  P("door", 235, 1.0, undefined, 0.34),
  P("tower", 320, 1.15, undefined, 0.2),
  P("crate", 150, 0.85, undefined, 0.64),
  P("grass", -30, 0.78, undefined, 0.76),
];

// A LEMBRANÇA DE DAVI — a memória que Salomão põe diante do povo: a tenda velha
// de Sião com o TRONO vazio do pai, a HARPA encostada, o rolo da promessa de
// Natã e a estrada que desce da cidade de Davi. O único quadro do capítulo em
// que a casa não aparece.
const LEMBRANCA_DE_DAVI: StagePropSpec[] = [
  { ...P("tent", -210, 1.3, undefined, 0.28), tag: "tenda-da-congregacao" },
  P("throne", -20, 1.05, undefined, 0.38),
  P("harp", 80, 0.9, undefined, 0.56),
  P("scroll", 155, 0.8, undefined, 0.62),
  P("tower", 265, 1.15, undefined, 0.2),
  P("amphora", -300, 0.8, undefined, 0.62),
  P("grass", 25, 0.78, undefined, 0.76),
];

// O TRONO DE ISRAEL E A CASA — o versículo em que Salomão junta as duas coisas
// que o SENHOR confirmou: o trono onde ele se assentou em lugar de Davi e a
// casa que ele edificou ao nome. A coroa está posta ao lado do trono, e a casa
// atrás, inteira.
const TRONO_E_A_CASA: StagePropSpec[] = [
  P("throne", -145, 1.1, undefined, 0.44),
  { ...P("crown", -55, 0.85, undefined, 0.62), tag: "coroa-de-salomao" },
  { ...P("church", 105, 1.3, undefined, 0.22), tag: "casa-do-senhor" },
  P("column", 15, 1.25, undefined, 0.32),
  P("column", 215, 1.25, undefined, 0.32),
  P("door", 300, 1.0, undefined, 0.36),
  P("grass", -260, 0.78, undefined, 0.74),
];

// O LUGAR CONSTITUÍDO PARA A ARCA — o mesmo quadro do trono, agora com a ARCA
// posta no seu lugar dentro da casa: o trono do rei à esquerda, a arca à
// direita, e entre os dois a distância exata que o capítulo inteiro respeita.
const TRONO_E_A_ARCA: StagePropSpec[] = [
  P("throne", -195, 1.1, undefined, 0.44),
  { ...P("church", 55, 1.3, undefined, 0.2), tag: "casa-do-senhor" },
  { ...P("ark", 205, 1.0, undefined, 0.5), tag: "arca-da-alianca" },
  P("column", -40, 1.25, undefined, 0.32),
  P("column", 150, 1.25, undefined, 0.32),
  P("censer", -110, 0.78, undefined, 0.64),
  P("grass", 305, 0.78, undefined, 0.76),
];

// ------------------------------------------------------------ SETS: A ORAÇÃO

// O ALTAR DE COBRE — o lugar da oração: o altar do átrio, aceso, diante da face
// do SENHOR; a casa atrás, as colunas do pórtico, o incensário e a bacia do
// serviço. É aqui que o rei se põe de pé, e daqui a pouco de joelhos.
const ALTAR_DE_COBRE: StagePropSpec[] = [
  { ...P("altar", 0, 1.15, 0.6, 0.5), tag: "altar-de-cobre" },
  { ...P("church", -185, 1.25, undefined, 0.2), tag: "casa-do-senhor" },
  P("column", -75, 1.2, undefined, 0.32),
  P("column", 75, 1.2, undefined, 0.32),
  P("censer", -265, 0.8, undefined, 0.6),
  P("bowl", 245, 0.8, undefined, 0.62),
  { ...P("sun", 200, 1.1, undefined, 0.62), sky: true },
];

// O CÉU DOS CÉUS — o beat da pergunta que atravessa a Bíblia. O palco vira
// firmamento: o céu estrelado de ponta a ponta, a lua alta, a nuvem entre as
// estrelas — e lá embaixo, minúscula, a casa que ele acabou de edificar. Tudo
// aqui existe para medir o tamanho do "quanto menos".
const CEU_DOS_CEUS: StagePropSpec[] = [
  { ...P("firmament", 0, 1.6, undefined, 0.9), sky: true },
  { ...P("starfield", -190, 1.25, undefined, 0.84), sky: true },
  { ...P("starfield", 200, 1.15, undefined, 0.78), sky: true },
  { ...P("moon", 265, 1.05, undefined, 0.66), sky: true },
  { ...P("clouds", -70, 1.2, undefined, 0.56), sky: true },
  { ...P("church", 0, 0.8, undefined, 0.3), tag: "casa-do-senhor" },
  { ...P("altar", -180, 0.9, 0.4, 0.56), tag: "altar-de-cobre" },
];

// A CASA DE NOITE E DE DIA — o pedido dos olhos abertos sobre este lugar,
// encenado com as duas horas no mesmo quadro: a lua de um lado, o sol do outro,
// a casa entre elas, o candelabro que fica aceso a noite inteira e o altar que
// recomeça de manhã.
const CASA_NOITE_E_DIA: StagePropSpec[] = [
  { ...P("church", 0, 1.3, undefined, 0.22), tag: "casa-do-senhor" },
  { ...P("moon", -235, 1.05, undefined, 0.64), sky: true },
  { ...P("sun", 235, 1.05, undefined, 0.62), sky: true },
  P("lampstand", -115, 0.9, undefined, 0.54),
  { ...P("altar", 140, 1.05, 0.5, 0.48), tag: "altar-de-cobre" },
  P("column", -60, 1.2, undefined, 0.32),
  P("column", 60, 1.2, undefined, 0.32),
];

// ------------------------------------------- SETS: OS SETE PEDIDOS ENCENADOS

// O JURAMENTO DE MALDIÇÃO DIANTE DO ALTAR — o primeiro pedido: dois homens e um
// altar. O altar do juramento ao centro-direita, o rolo da acusação no chão, a
// coluna do átrio, a casa ao fundo e a porta por onde eles entraram. Um dos
// dois está mentindo, e é isso que o pedido quer resolver.
const JURAMENTO_AO_ALTAR: StagePropSpec[] = [
  { ...P("altar", 70, 1.1, 0.45, 0.48), tag: "altar-de-cobre" },
  P("scroll", -65, 0.8, undefined, 0.62),
  P("column", -225, 1.2, undefined, 0.3),
  { ...P("church", 220, 1.1, undefined, 0.22), tag: "casa-do-senhor" },
  P("door", 310, 1.0, undefined, 0.36),
  P("crate", -300, 0.85, undefined, 0.64),
  P("grass", 145, 0.78, undefined, 0.76),
];

// O CAMPO DA DERROTA — o segundo pedido: "quando o teu povo Israel for ferido
// diante do inimigo". A espada caída na terra, a lança fincada, o carro do
// inimigo passando por cima do campo, a tenda de Israel derrubada ao longe e a
// fogueira do acampamento que venceu.
const CAMPO_DA_DERROTA: StagePropSpec[] = [
  P("sword", -45, 0.95, undefined, 0.62),
  P("spear", 65, 0.9, undefined, 0.56),
  P("chariot", 195, 1.1, undefined, 0.42),
  P("tent", -235, 1.15, undefined, 0.3),
  P("campfire", 290, 0.95, undefined, 0.58),
  P("rock", -305, 1.0, undefined, 0.56),
  P("grass", 115, 0.76, undefined, 0.78),
];

// O CÉU FECHADO — o terceiro pedido: nem chuva nem orvalho. O poço seco no meio
// do quadro, as pedras à mostra onde devia haver relva, a árvore sem folha, a
// talha vazia virada e o sol batendo em cima de tudo. Aqui `verdure` e `water`
// vão a zero e a terra racha.
const CEU_FECHADO: StagePropSpec[] = [
  P("well", -55, 1.05, undefined, 0.46),
  P("rock", 125, 1.05, undefined, 0.56),
  P("rock", -235, 1.0, undefined, 0.52),
  P("tree", 250, 1.1, undefined, 0.2),
  P("bush", 200, 0.85, undefined, 0.5),
  P("amphora", 45, 0.8, undefined, 0.66),
  { ...P("sun", 0, 1.2, undefined, 0.62), sky: true },
];

// A CHUVA SOBRE A TERRA — o mesmo lugar quando o pedido é atendido: o poço
// cheio, o açude transbordando ao lado, a árvore refeita, as nuvens carregadas
// baixando e a relva voltando ao chão. Único quadro do capítulo em que `storm`
// e `water` sobem juntos.
const CHUVA_SOBRE_A_TERRA: StagePropSpec[] = [
  P("well", -55, 1.05, undefined, 0.46),
  P("pool", 90, 1.1, undefined, 0.58),
  P("tree", 250, 1.15, undefined, 0.18),
  P("bush", 190, 0.95, undefined, 0.5),
  { ...P("clouds", -40, 1.5, undefined, 0.5), sky: true },
  { ...P("clouds", 220, 1.2, undefined, 0.62), sky: true },
  P("grass", -180, 0.85, undefined, 0.76),
];

// A PRAGA E O CERCO — o quarto pedido, o mais carregado do capítulo: os
// GAFANHOTOS cobrindo o ar sobre a seara, o feixe queimado no chão, o inimigo
// cercando a cidade das suas portas, a torre da muralha, a porta trancada e a
// lança do sitiante encostada nela.
const PRAGA_E_CERCO: StagePropSpec[] = [
  P("locusts", 45, 1.35, undefined, 0.4),
  P("sheaf", -125, 0.95, undefined, 0.58),
  { ...P("church", 95, 1.1, undefined, 0.24), tag: "casa-do-senhor" },
  P("tower", 215, 1.25, undefined, 0.2),
  P("door", 300, 1.0, undefined, 0.34),
  P("spear", -255, 0.9, undefined, 0.52),
  P("grass", -35, 0.7, undefined, 0.78),
];

// A ESTRADA DO ESTRANGEIRO — o quinto pedido, e o mais largo: um homem que não
// é do povo, vindo de terras remotas por amor do nome. O jumento carregado da
// viagem, o poço da estrada, a tenda da caravana, a palmeira do último oásis e,
// pequenina lá na frente, a casa para a qual ele se volta para orar.
const ESTRADA_DO_ESTRANGEIRO: StagePropSpec[] = [
  P("donkey", -125, 1.05, undefined, 0.5),
  P("well", 25, 1.0, undefined, 0.5),
  { ...P("church", 230, 1.0, undefined, 0.18), tag: "casa-do-senhor" },
  P("tent", -260, 1.15, undefined, 0.28),
  P("palm", -320, 1.1, undefined, 0.16),
  P("rock", 310, 1.0, undefined, 0.56),
  P("grass", 125, 0.76, undefined, 0.74),
];

// A SAÍDA À GUERRA — o sexto pedido: o povo saindo pelo caminho por que foi
// enviado, e orando para o lado desta cidade. O portão da cidade e a torre
// atrás dos que partem, o cavalo e o carro na estrada, a lança e o arco em
// ordem de marcha. Todos olham para trás, para a casa.
const SAIDA_A_GUERRA: StagePropSpec[] = [
  P("door", -205, 1.05, undefined, 0.3),
  P("tower", -300, 1.25, undefined, 0.2),
  { ...P("church", -95, 1.1, undefined, 0.2), tag: "casa-do-senhor" },
  P("horse", 125, 1.05, undefined, 0.48),
  P("chariot", 250, 1.1, undefined, 0.42),
  P("spear", 40, 0.9, undefined, 0.56),
  P("bow", 310, 0.85, undefined, 0.6),
];

// A TERRA DO CATIVEIRO — o sétimo pedido, longe de tudo: o zigurate da cidade
// estranha, o rio do exílio cortando o chão, a fogueira do arraial dos que
// levaram o povo, os fardos empilhados e a pedra onde os cativos se sentam. Não
// há casa nenhuma neste quadro — é para o lado dela que eles vão se voltar.
const TERRA_DO_CATIVEIRO: StagePropSpec[] = [
  P("ziggurat", 195, 1.25, undefined, 0.2),
  P("river", -30, 1.15, undefined, 0.68),
  P("campfire", -205, 0.95, undefined, 0.56),
  P("crate", 70, 0.85, undefined, 0.62),
  P("tower", 310, 1.15, undefined, 0.22),
  P("rock", -305, 1.05, undefined, 0.54),
  P("grass", 130, 0.7, undefined, 0.78),
];

// O FORNO DE FERRO DO EGITO — a frase de onde o povo foi tirado, encenada: o
// forno aceso, as pilhas de tijolo dos dois lados, o zigurate egípcio ao fundo,
// a palmeira do Nilo e a pedra da olaria. É a memória mais antiga da oração.
const FORNO_DE_FERRO: StagePropSpec[] = [
  { ...P("campfire", -65, 1.2, undefined, 0.56), tag: "forno-de-ferro-do-egito" },
  P("crate", 65, 0.9, undefined, 0.62),
  P("crate", 180, 0.85, undefined, 0.58),
  P("ziggurat", 265, 1.2, undefined, 0.2),
  P("tower", -255, 1.15, undefined, 0.22),
  P("palm", 320, 1.1, undefined, 0.16),
  P("rock", -165, 1.0, undefined, 0.54),
];

// --------------------------------------------------- SETS: A BÊNÇÃO E A FESTA

// DIANTE DA CONGREGAÇÃO, EM ALTA VOZ — o rei já de pé, virado para o povo, com
// o altar às costas e a casa ao lado: a plataforma do átrio, as trombetas, a
// porta grande e o pátio cheio. É a última vez que ele fala neste capítulo.
const DIANTE_DA_CONGREGACAO: StagePropSpec[] = [
  { ...P("altar", -145, 1.1, 0.55, 0.46), tag: "altar-de-cobre" },
  { ...P("church", 65, 1.25, undefined, 0.2), tag: "casa-do-senhor" },
  P("column", -260, 1.2, undefined, 0.3),
  P("column", 250, 1.2, undefined, 0.3),
  P("door", 205, 1.0, undefined, 0.36),
  { ...P("trumpet", 310, 0.85, undefined, 0.5), tag: "trombetas-da-subida-da-arca" },
  P("grass", -45, 0.78, undefined, 0.76),
];

// DE DIA E DE NOITE DIANTE DO SENHOR — o mesmo pátio da bênção final quando ele
// pede que aquelas palavras estejam perto do SENHOR "de dia e de noite": o sol
// e a lua no mesmo céu sobre a casa, o altar aceso e o candelabro para as
// vigílias. As duas metades do dia num quadro só.
const CONGREGACAO_DE_DIA_E_DE_NOITE: StagePropSpec[] = [
  { ...P("altar", -145, 1.1, 0.6, 0.46), tag: "altar-de-cobre" },
  { ...P("church", 65, 1.25, undefined, 0.2), tag: "casa-do-senhor" },
  { ...P("sun", -250, 1.05, undefined, 0.62), sky: true },
  { ...P("moon", 250, 1.0, undefined, 0.66), sky: true },
  P("lampstand", 200, 0.9, undefined, 0.54),
  P("column", -20, 1.2, undefined, 0.32),
  P("grass", 300, 0.78, undefined, 0.76),
];

// O SACRIFÍCIO NO ÁTRIO — o rei e todo o Israel oferecendo sacrifícios perante
// a face do SENHOR: o altar no auge do fogo, o curral cheio à direita, as
// bacias do sangue, o incensário e a casa ao fundo. O ar do quadro é fumaça.
const SACRIFICIO_DO_PATIO: StagePropSpec[] = [
  { ...P("altar", -60, 1.2, 1, 0.48), tag: "altar-de-cobre" },
  P("stall", 145, 1.15, undefined, 0.36),
  { ...P("church", 40, 1.15, undefined, 0.18), tag: "casa-do-senhor" },
  P("bowl", -175, 0.85, undefined, 0.64),
  P("censer", 245, 0.8, undefined, 0.6),
  P("column", -285, 1.2, undefined, 0.3),
  P("grass", 310, 0.78, undefined, 0.76),
];

// O MEIO DO ÁTRIO SANTIFICADO — o versículo mais prático do capítulo: o altar
// de cobre ficou PEQUENO. Ele aparece encolhido lá na ponta direita, e o meio
// do pátio, santificado às pressas, virou brasa de ponta a ponta, com as bacias
// da gordura postas no chão e a casa espremida no canto.
const MEIO_DO_ATRIO: StagePropSpec[] = [
  { ...P("campfire", -85, 1.35, undefined, 0.54), tag: "meio-do-atrio-santificado" },
  P("campfire", 60, 1.2, undefined, 0.62),
  { ...P("altar", 215, 0.75, 0.7, 0.48), tag: "altar-de-cobre" },
  { ...P("church", -280, 1.15, undefined, 0.2), tag: "casa-do-senhor" },
  P("bowl", -190, 0.85, undefined, 0.66),
  P("column", 305, 1.2, undefined, 0.3),
  P("grass", 145, 0.78, undefined, 0.78),
];

// A FESTA DE CATORZE DIAS — a grande congregação desde a entrada de Hamate até
// ao RIO DO EGITO: o arraial de tendas de uma ponta à outra, a fogueira do
// acampamento, as harpas e as trombetas dos cantores, a casa no alto e o rio
// fechando o quadro pelo lado do Egito.
const FESTA_DE_CATORZE_DIAS: StagePropSpec[] = [
  P("tent", -275, 1.25, undefined, 0.28),
  P("tent", -155, 1.1, undefined, 0.36),
  { ...P("river", 265, 1.15, undefined, 0.7), tag: "rio-do-egito" },
  P("campfire", 45, 1.0, undefined, 0.58),
  P("harp", 160, 0.9, undefined, 0.54),
  { ...P("trumpet", -45, 0.9, undefined, 0.48), tag: "trombetas-da-subida-da-arca" },
  { ...P("church", 125, 1.05, undefined, 0.18), tag: "casa-do-senhor" },
];

// A ESTRADA DAS TENDAS — o oitavo dia: o povo despedido, indo embora alegre e
// feliz de coração. As tendas do caminho subindo pela direita, a palmeira da
// estrada, a casa ficando para trás à esquerda, o poço da última parada e o sol
// alto de quem tem viagem boa pela frente.
const ESTRADA_DAS_TENDAS: StagePropSpec[] = [
  { ...P("church", -265, 1.1, undefined, 0.2), tag: "casa-do-senhor" },
  P("door", -160, 1.0, undefined, 0.32),
  P("well", -30, 1.0, undefined, 0.5),
  P("tent", 190, 1.15, undefined, 0.32),
  P("tent", 300, 1.0, undefined, 0.24),
  P("palm", 80, 1.1, undefined, 0.16),
  { ...P("sun", 150, 1.15, undefined, 0.62), sky: true },
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ 1Rs 8
  8: {
    start: { terrain: "city", night: 0.2, glory: 0.5, storm: 0.04, fire: 0.06, water: 0, verdure: 0.3 },
    beats: [
      // v.1 — o convite que abre o capítulo: Salomão congrega os anciãos, os
      // cabeças das tribos e os chefes dos pais diante de si em Jerusalém, e
      // aponta para o sul — para Sião, onde a arca ainda está.
      b(1, { q: "para fazerem subir a arca da aliança do SENHOR da cidade de Davi, que é Sião.",
        set: "praca-de-jerusalem", props: PRACA_DE_JERUSALEM,
        env: { terrain: "city", night: 0.2, glory: 0.5, storm: 0.04, verdure: 0.3 }, cast: [
        C("rei", -30, "point", { dy: 0.5, facing: 1, id: "salomao" }),
        C("anciao", 95, "stand", { dy: 0.56, facing: -1, id: "anciao-de-israel1" }),
        C("anciao", 190, "stand", { dy: 0.52, facing: -1, id: "anciao-de-israel2" }),
        C("homem", -150, "stand", { dy: 0.6, facing: 1, id: "cabeca-de-tribo1" }),
        C("homem", -245, "stand", { dy: 0.54, facing: 1, id: "chefe-dos-pais1" }),
      ] }),
      // v.2 — e não vieram só os chefes: TODOS os homens de Israel se congregam
      // ao rei na ocasião da festa, no mês de Etanim, o sétimo mês. O pátio
      // enche, e o rei fica pequeno no meio da própria convocação.
      b(2, { q: "na ocasião da festa, no mês de Etanim, que é o sétimo mês.",
        env: { terrain: "city", night: 0.16, glory: 0.58, storm: 0.02, verdure: 0.32 }, cast: [
        C("rei", -215, "stand", { dy: 0.56, facing: 1, id: "salomao" }),
        C("multidao", 40, "raise", { dy: 0.5, facing: -1, id: "congregacao-de-israel" }),
        C("anciao", -100, "stand", { dy: 0.62, facing: 1, id: "anciao-de-israel1" }),
        C("homem", 235, "stand", { dy: 0.58, facing: -1, id: "cabeca-de-tribo1" }),
      ] }),
      // v.3 — em Sião, diante da tenda velha de Davi: vêm todos os anciãos, e são
      // OS SACERDOTES que alçam a arca do chão onde ela esteve quarenta anos.
      b(3, { q: "E vieram todos os anciãos de Israel; e os sacerdotes alçaram a arca.",
        set: "siao-cidade-de-davi", props: SIAO_CIDADE_DE_DAVI,
        env: { terrain: "city", night: 0.24, glory: 0.62, storm: 0.02, verdure: 0.26 }, cast: [
        C("anciao", -160, "raise", { dy: 0.62, facing: 1, id: "zadoque", glow: 0.22 }),
        C("homem", -10, "raise", { dy: 0.66, facing: 1, id: "sacerdote-que-alcou-a-arca" }),
        C("anciao", 130, "stand", { dy: 0.58, facing: -1, id: "anciao-de-israel1" }),
        C("anciao", 235, "stand", { dy: 0.52, facing: -1, id: "anciao-de-israel2" }),
      ] }),
      // v.4 — atrás da arca sobe a mudança inteira: o TABERNÁCULO DA CONGREGAÇÃO
      // desmontado e todos os objetos sagrados que havia nele, nos ombros dos
      // sacerdotes e dos levitas, subindo a estrada com a casa nova já à vista.
      b(4, { q: "o tabernáculo da congregação, juntamente com todos os objetos sagrados que havia no tabernáculo",
        set: "caminho-da-subida", props: CAMINHO_DA_SUBIDA,
        env: { terrain: "city", night: 0.18, glory: 0.6, storm: 0.02, verdure: 0.3 }, cast: [
        C("homem", -95, "walk", { dy: 0.64, facing: 1, id: "sacerdote-que-alcou-a-arca" }),
        C("servo", 15, "walk", { dy: 0.6, facing: 1, id: "levita-do-tabernaculo1" }),
        C("servo", 115, "walk", { dy: 0.56, facing: 1, id: "levita-do-tabernaculo2" }),
        C("anciao", -215, "walk", { dy: 0.6, facing: 1, id: "zadoque", glow: 0.2 }),
      ] }),
      // v.5 — a parada do sacrifício: o rei e toda a congregação diante da arca,
      // com ovelhas e vacas em número que ninguém conseguiu contar nem numerar.
      // O altar aceso e o curral cheio dizem o versículo sozinhos.
      b(5, { q: "sacrificando ovelhas e vacas, que não se podiam contar nem numerar pela sua quantidade.",
        set: "altar-da-subida", props: ALTAR_DA_SUBIDA,
        env: { terrain: "city", night: 0.16, glory: 0.64, storm: 0.02, fire: 0.32, verdure: 0.3 }, cast: [
        C("rei", -130, "raise", { dy: 0.62, facing: 1, id: "salomao" }),
        C("rebanho", 120, "stand", { dy: 0.6, facing: -1, id: "rebanho-do-sacrificio" }),
        C("homem", 20, "stand", { dy: 0.66, facing: -1, id: "sacerdote-do-sacrificio" }),
        C("multidao", 240, "raise", { dy: 0.48, facing: -1, id: "congregacao-de-israel" }),
      ] }),
      // v.6 — ⭐ a arca chega ao lugar para o qual a casa foi construída: o
      // ORÁCULO, o lugar santíssimo, ATÉ DEBAIXO DAS ASAS DOS QUERUBINS. Os dois
      // sacerdotes que a levaram entram curvados; a câmara não tem janela.
      b(6, { q: "ao oráculo da casa, ao lugar santíssimo, até debaixo das asas dos querubins.",
        set: "oraculo-dos-querubins", props: ORACULO_DOS_QUERUBINS,
        env: { terrain: "glory", night: 0.34, glory: 0.72, storm: 0, verdure: 0 }, cast: [
        C("anciao", -180, "bow", { dy: 0.66, facing: 1, id: "zadoque", glow: 0.26 }),
        C("homem", 175, "bow", { dy: 0.64, facing: -1, id: "sacerdote-que-alcou-a-arca" }),
      ] }),
      // v.7 — o detalhe que o texto faz questão de dar: os querubins estendiam
      // AMBAS as asas sobre o lugar da arca, e cobriam POR CIMA a arca e os seus
      // varais. Os dois homens já recuaram para as bordas do quadro.
      b(7, { q: "e os querubins cobriam, por cima, a arca e os seus varais.",
        env: { terrain: "glory", night: 0.3, glory: 0.82, storm: 0, verdure: 0 }, cast: [
        C("anciao", -285, "bow", { dy: 0.72, facing: 1, id: "zadoque", glow: 0.3 }),
        C("homem", 280, "kneel", { dy: 0.7, facing: -1, id: "sacerdote-do-oraculo" }),
      ] }),
      // v.8 — um passo para fora, no santuário diante do oráculo: as pontas dos
      // varais sobressaem tanto que dali se veem — "porém de fora não se viam; e
      // ficaram ali até ao dia de hoje". O sacerdote olha de esguelha e não passa.
      b(8, { q: "porém de fora não se viam; e ficaram ali até ao dia de hoje.",
        set: "santuario-dos-varais", props: SANTUARIO_DOS_VARAIS,
        env: { terrain: "glory", night: 0.36, glory: 0.66, storm: 0, verdure: 0 }, cast: [
        C("homem", -170, "point", { dy: 0.66, facing: 1, id: "sacerdote-do-oraculo" }),
        C("anciao", 230, "stand", { dy: 0.7, facing: -1, id: "zadoque", glow: 0.24 }),
      ] }),
      // v.9 — ⭐ e o texto abre a arca: NADA HAVIA nela, senão só AS DUAS TÁBUAS
      // DE PEDRA que Moisés ali pusera junto a Horebe, quando o SENHOR fez a
      // aliança com Israel na saída do Egito. O quadro mais vazio do capítulo.
      b(9, { q: "Na arca nada havia, senão só as duas tábuas de pedra, que Moisés ali pusera junto a Horebe",
        set: "oraculo-dos-querubins", props: ORACULO_COM_AS_TABUAS,
        env: { terrain: "glory", night: 0.28, glory: 0.86, storm: 0, verdure: 0 }, cast: [
        C("anciao", -270, "kneel", { dy: 0.76, facing: 1, id: "zadoque", glow: 0.32 }),
      ] }),
      // v.10 — ⭐ saindo os sacerdotes do santuário, UMA NUVEM ENCHE A CASA DO
      // SENHOR. Nenhuma palavra, nenhuma voz: a nuvem entra pelo alto do quadro e
      // os dois homens que acabaram de sair já param na porta.
      b(10, { q: "saindo os sacerdotes do santuário, uma nuvem encheu a casa do Senhor.",
        set: "casa-na-nuvem", props: CASA_NA_NUVEM,
        env: { terrain: "city", night: 0.3, glory: 0.88, storm: 0.12, fire: 0, verdure: 0.18 }, cast: [
        C("homem", 120, "walk", { dy: 0.6, facing: 1, id: "sacerdote-do-oraculo" }),
        C("anciao", 215, "bow", { dy: 0.64, facing: 1, id: "zadoque", glow: 0.3 }),
        C("homem", -130, "bow", { dy: 0.7, facing: -1, id: "sacerdote-que-alcou-a-arca" }),
      ] }),
      // v.11 — ⭐ e o ministério para: os sacerdotes NÃO PODEM PERMANECER EM PÉ
      // para ministrar por causa da nuvem, "porque a glória do SENHOR enchera a
      // casa do SENHOR". Glória no máximo, a nuvem em cima do telhado, e os três
      // homens no chão — nenhuma multidão comemorando aqui.
      b(11, { q: "porque a glória do Senhor enchera a casa do Senhor.",
        props: CASA_NA_NUVEM_CHEIA,
        env: { terrain: "city", night: 0.36, glory: 1, storm: 0.2, fire: 0, verdure: 0.14 }, cast: [
        C("anciao", -60, "kneel", { dy: 0.74, facing: 1, id: "zadoque", glow: 0.34 }),
        C("homem", 90, "bow", { dy: 0.72, facing: -1, id: "sacerdote-do-oraculo" }),
        C("homem", 235, "kneel", { dy: 0.66, facing: -1, id: "sacerdote-que-alcou-a-arca" }),
      ] }),
      // v.12 — a primeira palavra humana depois da nuvem, e é o rei quem a diz:
      // "o SENHOR disse que ele habitaria nas TREVAS". A casa está dentro da
      // nuvem, o altar apagado, e Salomão fala olhando para o escuro.
      b(12, { by: "rei", q: "Então falou Salomão:",
        set: "patio-da-bencao", props: PATIO_DA_BENCAO,
        env: { terrain: "city", night: 0.5, glory: 0.72, storm: 0.14, fire: 0, verdure: 0.16 }, cast: [
        C("rei", -215, "stand", { dy: 0.66, facing: 1, id: "salomao" }),
        C("anciao", 60, "bow", { dy: 0.7, facing: -1, id: "zadoque", glow: 0.28 }),
        C("homem", 190, "kneel", { dy: 0.66, facing: -1, id: "sacerdote-do-oraculo" }),
      ] }),
      // v.13 — e a segunda: "CERTAMENTE te edifiquei uma casa para morada,
      // assento para a tua eterna habitação". O rei aponta para a casa; a nuvem
      // começa a assentar e a luz sobe de dentro dela.
      b(13, { by: "rei", q: "Certamente te edifiquei uma casa para morada, assento para a tua eterna habitação.",
        env: { terrain: "city", night: 0.38, glory: 0.86, storm: 0.08, verdure: 0.2 }, cast: [
        C("rei", -180, "point", { dy: 0.64, facing: 1, id: "salomao", glow: 0.2 }),
        C("anciao", 45, "stand", { dy: 0.68, facing: -1, id: "zadoque", glow: 0.24 }),
        C("homem", 195, "stand", { dy: 0.62, facing: -1, id: "sacerdote-que-alcou-a-arca" }),
      ] }),
      // v.14 — então o rei VIRA O ROSTO: dá as costas à casa e abençoa toda a
      // congregação de Israel — "e toda a congregação de Israel estava EM PÉ".
      // Plano aberto, o pátio inteiro tomado, ninguém sentado.
      b(14, { q: "Então virou o rei o seu rosto, e abençoou toda a congregação de Israel; e toda a congregação de Israel estava em pé.",
        set: "congregacao-em-pe", props: CONGREGACAO_EM_PE,
        env: { terrain: "city", night: 0.24, glory: 0.8, storm: 0.04, verdure: 0.28 }, cast: [
        C("rei", -175, "raise", { dy: 0.62, facing: 1, id: "salomao", glow: 0.24 }),
        C("multidao", 105, "raise", { dy: 0.52, facing: -1, id: "congregacao-de-israel" }),
        C("anciao", -35, "stand", { dy: 0.68, facing: -1, id: "anciao-de-israel1" }),
        C("homem", 265, "stand", { dy: 0.6, facing: -1, id: "cabeca-de-tribo1" }),
      ] }),
      // v.15 — a bênção começa contando de onde veio tudo: "bendito seja o SENHOR
      // Deus de Israel, QUE FALOU PELA SUA BOCA a Davi, meu pai, E PELA SUA MÃO O
      // CUMPRIU". Boca e mão: a promessa e a casa.
      b(15, { by: "rei", q: "E disse:",
        env: { terrain: "city", night: 0.2, glory: 0.86, storm: 0.02, verdure: 0.3 }, cast: [
        C("rei", -140, "raise", { dy: 0.66, facing: 1, id: "salomao", glow: 0.3 }),
        C("anciao", 20, "stand", { dy: 0.66, facing: -1, id: "anciao-de-israel1" }),
        C("multidao", 175, "raise", { dy: 0.5, facing: -1, id: "congregacao-de-israel" }),
      ] }),
      // v.16 — Salomão recita a palavra do SENHOR: desde a saída do Egito não
      // escolhera CIDADE alguma para ali estabelecer o seu nome — "porém escolhi
      // a DAVI". O balão é do rei: é ele quem cita, diante do povo.
      b(16, { by: "rei", q: "porém escolhi a Davi, para que presidisse sobre o meu povo Israel.",
        env: { terrain: "city", night: 0.22, glory: 0.8, storm: 0.02, verdure: 0.28 }, cast: [
        C("rei", -75, "point", { dy: 0.62, facing: 1, id: "salomao", glow: 0.26 }),
        C("anciao", 80, "bow", { dy: 0.68, facing: -1, id: "anciao-de-israel1" }),
        C("homem", 205, "stand", { dy: 0.6, facing: -1, id: "chefe-dos-pais1" }),
        C("homem", -235, "stand", { dy: 0.58, facing: 1, id: "cabeca-de-tribo1" }),
      ] }),
      // v.17 — a memória do pai: Davi PROPUSERA EM SEU CORAÇÃO edificar casa ao
      // nome do SENHOR. A cena vai para a tenda velha de Sião — o trono vazio, a
      // harpa encostada, o rolo da promessa — e o rei aponta para lá.
      b(17, { by: "rei", q: "Também Davi, meu pai, propusera em seu coração o edificar casa ao nome do Senhor Deus de Israel.",
        set: "lembranca-de-davi", props: LEMBRANCA_DE_DAVI,
        env: { terrain: "city", night: 0.34, glory: 0.62, storm: 0.04, verdure: 0.26 }, cast: [
        C("rei", -95, "point", { dy: 0.7, facing: 1, id: "salomao", glow: 0.22 }),
        C("anciao", 195, "stand", { dy: 0.64, facing: -1, id: "anciao-de-israel2" }),
      ] }),
      // v.18 — e a resposta que Davi ouviu: "PORQUANTO propuseste no teu coração
      // o edificar casa ao meu nome, BEM FIZESTE em o propor no teu coração". O
      // elogio veio inteiro antes da recusa.
      b(18, { by: "rei", q: "Porquanto propuseste no teu coração o edificar casa ao meu nome, bem fizeste em o propor no teu coração.",
        env: { terrain: "city", night: 0.28, glory: 0.74, storm: 0.02, verdure: 0.28 }, cast: [
        C("rei", -55, "raise", { dy: 0.68, facing: 1, id: "salomao", glow: 0.28 }),
        C("anciao", 160, "stand", { dy: 0.66, facing: -1, id: "anciao-de-israel2" }),
        C("homem", 265, "stand", { dy: 0.6, facing: -1, id: "chefe-dos-pais1" }),
      ] }),
      // v.19 — e então a recusa: "TODAVIA tu não edificarás esta casa; porém TEU
      // FILHO, que sair de teus lombos, edificará esta casa ao meu nome". O rei
      // fala do trono vazio do pai e da própria mão ao mesmo tempo.
      b(19, { by: "rei", q: "Todavia tu não edificarás esta casa; porém teu filho, que sair de teus lombos, edificará esta casa ao meu nome.",
        env: { terrain: "city", night: 0.3, glory: 0.7, storm: 0.04, verdure: 0.26 }, cast: [
        C("rei", 100, "stand", { dy: 0.72, facing: -1, id: "salomao", glow: 0.3 }),
        C("anciao", -160, "bow", { dy: 0.64, facing: 1, id: "anciao-de-israel2" }),
      ] }),
      // v.20 — a conta fechada: o SENHOR confirmou a sua palavra, "me levantei em
      // lugar de Davi, meu pai, e me ASSENTEI NO TRONO de Israel… e EDIFIQUEI uma
      // casa ao nome do SENHOR". O trono e a casa no mesmo quadro.
      b(20, { by: "rei", q: "e me assentei no trono de Israel, como tem falado o Senhor; e edifiquei uma casa ao nome do Senhor Deus de Israel.",
        set: "trono-e-a-casa", props: TRONO_E_A_CASA,
        env: { terrain: "city", night: 0.18, glory: 0.88, storm: 0.02, verdure: 0.3 }, cast: [
        C("rei", -145, "raise", { dy: 0.62, facing: 1, id: "salomao", glow: 0.34 }),
        C("anciao", 40, "stand", { dy: 0.68, facing: -1, id: "zadoque", glow: 0.22 }),
        C("multidao", 235, "raise", { dy: 0.5, facing: -1, id: "congregacao-de-israel" }),
      ] }),
      // v.21 — e a última peça encaixa: "constituí ali LUGAR PARA A ARCA em que
      // está a aliança do SENHOR". A arca entra no quadro, do outro lado da casa,
      // à distância exata que o rei nunca atravessa.
      b(21, { by: "rei", q: "E constituí ali lugar para a arca em que está a aliança do Senhor",
        props: TRONO_E_A_ARCA,
        env: { terrain: "city", night: 0.16, glory: 0.92, storm: 0.02, verdure: 0.3 }, cast: [
        C("rei", -260, "point", { dy: 0.66, facing: 1, id: "salomao", glow: 0.3 }),
        C("anciao", -120, "bow", { dy: 0.7, facing: 1, id: "zadoque", glow: 0.24 }),
        C("homem", 275, "bow", { dy: 0.64, facing: -1, id: "sacerdote-do-oraculo" }),
      ] }),
      // v.22 — ⭐ começa A ORAÇÃO: Salomão se põe diante do ALTAR DE COBRE, na
      // presença de toda a congregação, e ESTENDE AS MÃOS PARA OS CÉUS. De pé,
      // ainda; os joelhos vêm no versículo seguinte.
      b(22, { q: "E pôs-se Salomão diante do altar do Senhor, na presença de toda a congregação de Israel; e estendeu as suas mãos para os céus,",
        set: "altar-de-cobre", props: ALTAR_DE_COBRE,
        env: { terrain: "field", night: 0.14, glory: 0.8, storm: 0.02, fire: 0.24, verdure: 0.32 }, cast: [
        C("rei", -95, "raise", { dy: 0.62, facing: 1, id: "salomao", glow: 0.34 }),
        C("multidao", 195, "raise", { dy: 0.48, facing: -1, id: "congregacao-de-israel" }),
        C("anciao", 65, "stand", { dy: 0.68, facing: -1, id: "zadoque", glow: 0.2 }),
      ] }),
      // v.23 — "ó SENHOR Deus de Israel, NÃO HÁ DEUS COMO TU, em cima nos céus nem
      // embaixo na terra; que guardas a aliança e a beneficência a teus servos que
      // andam com todo o seu coração diante de ti".
      b(23, { by: "rei", q: "E disse:",
        env: { terrain: "field", night: 0.12, glory: 0.88, storm: 0, fire: 0.22, verdure: 0.34 }, cast: [
        C("rei", -70, "raise", { dy: 0.66, facing: 1, id: "salomao", glow: 0.4 }),
        C("anciao", 110, "bow", { dy: 0.66, facing: -1, id: "zadoque", glow: 0.22 }),
        C("multidao", 245, "raise", { dy: 0.46, facing: -1, id: "congregacao-de-israel" }),
      ] }),
      // v.24 — a prova está na sala: o que o SENHOR disse a Davi com a BOCA
      // cumpriu com a MÃO — "como neste dia se vê". O rei aponta para a casa
      // acabada como quem apresenta o recibo.
      b(24, { by: "rei", q: "porque com a tua boca o disseste, e com a tua mão o cumpriste, como neste dia se vê.",
        env: { terrain: "field", night: 0.12, glory: 0.9, storm: 0, fire: 0.2, verdure: 0.34 }, cast: [
        C("rei", -110, "point", { dy: 0.64, facing: 1, id: "salomao", glow: 0.36 }),
        C("anciao", 75, "stand", { dy: 0.7, facing: -1, id: "anciao-de-israel1" }),
        C("homem", 215, "stand", { dy: 0.62, facing: -1, id: "cabeca-de-tribo1" }),
      ] }),
      // v.25 — e do cumprido ele pede o que falta: "não te faltará sucessor
      // diante de mim, que se assente no trono de Israel; SOMENTE QUE teus filhos
      // guardem o seu caminho". Aqui o rei dobra os joelhos.
      b(25, { by: "rei", q: "Não te faltará sucessor diante de mim, que se assente no trono de Israel",
        env: { terrain: "field", night: 0.14, glory: 0.84, storm: 0.02, fire: 0.2, verdure: 0.32 }, cast: [
        C("rei", -75, "kneel", { dy: 0.7, facing: 1, id: "salomao", glow: 0.36 }),
        C("anciao", 120, "bow", { dy: 0.66, facing: -1, id: "zadoque", glow: 0.2 }),
        C("homem", 250, "stand", { dy: 0.6, facing: -1, id: "chefe-dos-pais1" }),
      ] }),
      // v.26 — o pedido em três palavras: "CUMPRA-SE a tua palavra que disseste a
      // teu servo Davi, meu pai". Ele já está de joelhos, e o fogo do altar sobe
      // atrás dele.
      b(26, { by: "rei", q: "cumpra-se a tua palavra que disseste a teu servo Davi, meu pai.",
        env: { terrain: "field", night: 0.12, glory: 0.9, storm: 0, fire: 0.34, verdure: 0.32 }, cast: [
        C("rei", -40, "kneel", { dy: 0.72, facing: 1, id: "salomao", glow: 0.42 }),
        C("anciao", 150, "kneel", { dy: 0.66, facing: -1, id: "zadoque", glow: 0.2 }),
      ] }),
      // v.27 — ⭐⭐ a pergunta que atravessa a Bíblia inteira: "MAS, NA VERDADE,
      // HABITARIA DEUS NA TERRA? Eis que os céus, e até o CÉU DOS CÉUS, não te
      // poderiam conter, QUANTO MENOS ESTA CASA que eu tenho edificado". O palco
      // vira firmamento e a casa encolhe até caber embaixo de uma estrela.
      b(27, { by: "rei", q: "Mas, na verdade, habitaria Deus na terra? Eis que os céus, e até o céu dos céus, não te poderiam conter, quanto menos esta casa que eu tenho edificado.",
        set: "ceu-dos-ceus", props: CEU_DOS_CEUS,
        env: { terrain: "glory", night: 0.42, glory: 1, storm: 0.06, fire: 0.1, verdure: 0.1 }, cast: [
        C("rei", -20, "kneel", { dy: 0.86, facing: 1, id: "salomao", glow: 0.5, scale: 0.85 }),
      ] }),
      // v.28 — de volta ao chão do átrio, e o tom muda: "VOLVE-TE, pois, para a
      // oração de teu servo, e para a sua súplica" — o rei de joelhos diante do
      // altar, com o povo calado atrás.
      b(28, { by: "rei", q: "Volve-te, pois, para a oração de teu servo, e para a sua súplica",
        set: "altar-de-cobre", props: ALTAR_DE_COBRE,
        env: { terrain: "field", night: 0.18, glory: 0.76, storm: 0.02, fire: 0.26, verdure: 0.3 }, cast: [
        C("rei", -60, "kneel", { dy: 0.72, facing: 1, id: "salomao", glow: 0.38 }),
        C("anciao", 130, "kneel", { dy: 0.66, facing: -1, id: "zadoque", glow: 0.2 }),
        C("multidao", 265, "raise", { dy: 0.46, facing: -1, id: "congregacao-de-israel" }),
      ] }),
      // v.29 — "para que os teus OLHOS NOITE E DIA estejam abertos sobre esta
      // casa". As duas horas no mesmo quadro: a lua de um lado, o sol do outro, o
      // candelabro das vigílias aceso e o altar recomeçando de manhã.
      b(29, { by: "rei", q: "Para que os teus olhos noite e dia estejam abertos sobre esta casa",
        set: "casa-noite-e-dia", props: CASA_NOITE_E_DIA,
        env: { terrain: "city", night: 0.4, glory: 0.82, storm: 0.02, fire: 0.2, verdure: 0.24 }, cast: [
        C("rei", -190, "kneel", { dy: 0.74, facing: 1, id: "salomao", glow: 0.36 }),
        C("homem", 235, "stand", { dy: 0.66, facing: -1, id: "sacerdote-da-vigilia" }),
      ] }),
      // v.30 — o refrão que vai amarrar os sete pedidos seguintes: "ouve tu no
      // lugar da tua habitação nos céus; OUVE TAMBÉM, E PERDOA". A glória desce
      // sobre o altar; ninguém se levanta.
      b(30, { by: "rei", q: "ouve também, e perdoa.",
        set: "altar-de-cobre", props: ALTAR_DE_COBRE,
        env: { terrain: "field", night: 0.14, glory: 0.94, storm: 0, fire: 0.3, verdure: 0.32 }, cast: [
        C("rei", -50, "kneel", { dy: 0.72, facing: 1, id: "salomao", glow: 0.44 }),
        C("anciao", 120, "bow", { dy: 0.68, facing: -1, id: "zadoque", glow: 0.22 }),
        C("multidao", 250, "raise", { dy: 0.46, facing: -1, id: "congregacao-de-israel" }),
      ] }),
      // v.31 — PEDIDO 1, encenado: alguém peca contra o próximo, põem sobre ele
      // JURAMENTO DE MALDIÇÃO e o fazem jurar diante do altar nesta casa. Dois
      // homens, um altar e um rolo de acusação no chão entre eles.
      b(31, { by: "rei", q: "Quando alguém pecar contra o seu próximo, e puserem sobre ele juramento de maldição",
        set: "juramento-ao-altar", props: JURAMENTO_AO_ALTAR,
        env: { terrain: "city", night: 0.32, glory: 0.5, storm: 0.16, fire: 0.18, verdure: 0.24 }, cast: [
        C("rei", -305, "kneel", { dy: 0.78, facing: 1, id: "salomao", glow: 0.3 }),
        C("homem", 15, "raise", { dy: 0.66, facing: 1, id: "homem-que-jura" }),
        C("homem", 165, "point", { dy: 0.62, facing: -1, id: "proximo-ofendido" }),
      ] }),
      // v.32 — e a sentença pedida: condenar o INJUSTO, fazendo recair o seu
      // proceder sobre a sua cabeça, e justificar o JUSTO, rendendo-lhe segundo a
      // sua justiça. A luz separa os dois: um cai, o outro se levanta.
      b(32, { by: "rei", q: "condenando ao injusto, fazendo recair o seu proceder sobre a sua cabeça, e justificando ao justo",
        env: { terrain: "city", night: 0.24, glory: 0.82, storm: 0.08, fire: 0.2, verdure: 0.26 }, cast: [
        C("rei", -305, "kneel", { dy: 0.78, facing: 1, id: "salomao", glow: 0.34 }),
        C("homem", 20, "bow", { dy: 0.7, facing: 1, id: "injusto-condenado" }),
        C("homem", 175, "raise", { dy: 0.6, facing: -1, id: "justo-justificado", glow: 0.22 }),
      ] }),
      // v.33 — PEDIDO 2: "quando o teu povo Israel FOR FERIDO diante do inimigo,
      // por ter pecado contra ti". A espada caída, o carro do inimigo por cima do
      // campo, o soldado de Israel no chão. Nenhuma multidão neste quadro.
      b(33, { by: "rei", q: "Quando o teu povo Israel for ferido diante do inimigo, por ter pecado contra ti",
        set: "campo-da-derrota", props: CAMPO_DA_DERROTA,
        env: { terrain: "field", night: 0.6, glory: 0.16, storm: 0.42, fire: 0.14, verdure: 0.14 }, cast: [
        C("rei", -300, "kneel", { dy: 0.8, facing: 1, id: "salomao", glow: 0.26 }),
        C("homem", 10, "lie", { dy: 0.72, facing: 1, id: "soldado-ferido-de-israel" }),
        C("cavaleiro", 200, "stand", { dy: 0.54, facing: -1, id: "inimigo-vencedor" }),
      ] }),
      // v.34 — e o pedido: perdoa o pecado do teu povo e TORNA-O A LEVAR À TERRA
      // que deste a seus pais. Amanhece no campo, o ferido se põe de joelhos e o
      // carro do inimigo já saiu do quadro.
      b(34, { by: "rei", q: "e perdoa o pecado do teu povo Israel, e torna-o a levar à terra que tens dado a seus pais.",
        env: { terrain: "field", night: 0.3, glory: 0.76, storm: 0.14, fire: 0.06, verdure: 0.3 }, cast: [
        C("rei", -300, "kneel", { dy: 0.8, facing: 1, id: "salomao", glow: 0.34 }),
        C("homem", -20, "kneel", { dy: 0.7, facing: 1, id: "soldado-ferido-de-israel" }),
        C("homem", 145, "walk", { dy: 0.62, facing: -1, id: "sobrevivente-de-israel" }),
      ] }),
      // v.35 — PEDIDO 3: "quando os céus se FECHAR, e não houver chuva, por terem
      // pecado contra ti". O poço seco, as pedras à mostra, a árvore sem folha, a
      // talha virada e o sol batendo. `water` e `verdure` a zero.
      b(35, { by: "rei", q: "Quando os céus se fechar, e não houver chuva, por terem pecado contra ti",
        set: "ceu-fechado", props: CEU_FECHADO,
        env: { terrain: "desert", night: 0.12, glory: 0.24, storm: 0, fire: 0.1, water: 0, verdure: 0 }, cast: [
        C("rei", -300, "kneel", { dy: 0.8, facing: 1, id: "salomao", glow: 0.28 }),
        C("homem", 30, "bow", { dy: 0.72, facing: 1, id: "lavrador-da-seca" }),
        C("mulherComum", 185, "kneel", { dy: 0.66, facing: -1, id: "mulher-do-poco-seco" }),
      ] }),
      // v.36 — e a resposta pedida: ensina-lhes o bom caminho em que andem "e DÁ
      // CHUVA na tua terra que deste ao teu povo em herança". As nuvens baixam
      // carregadas, o açude enche e a relva volta ao chão rachado.
      b(36, { by: "rei", q: "e dá chuva na tua terra que deste ao teu povo em herança.",
        props: CHUVA_SOBRE_A_TERRA,
        env: { terrain: "field", night: 0.26, glory: 0.7, storm: 0.62, fire: 0, water: 0.44, verdure: 0.66 }, cast: [
        C("rei", -300, "kneel", { dy: 0.8, facing: 1, id: "salomao", glow: 0.36 }),
        C("homem", 20, "raise", { dy: 0.72, facing: 1, id: "lavrador-da-seca" }),
        C("mulherComum", 175, "raise", { dy: 0.66, facing: -1, id: "mulher-do-poco-seco" }),
      ] }),
      // v.37 — PEDIDO 4, o mais carregado: fome, peste, QUEIMA DE SEARAS,
      // ferrugem, GAFANHOTOS ou pulgão — e o inimigo CERCANDO a cidade das suas
      // portas. A nuvem de gafanhotos sobre o feixe queimado, a torre sitiada e a
      // lança do sitiante na porta.
      b(37, { by: "rei", q: "quando houver queima de searas, ferrugem, gafanhotos ou pulgão, quando o seu inimigo o cercar na terra das suas portas",
        set: "praga-e-cerco", props: PRAGA_E_CERCO,
        env: { terrain: "field", night: 0.46, glory: 0.14, storm: 0.4, fire: 0.24, water: 0, verdure: 0.08 }, cast: [
        C("rei", -305, "kneel", { dy: 0.8, facing: 1, id: "salomao", glow: 0.26 }),
        C("homem", -35, "bow", { dy: 0.74, facing: 1, id: "lavrador-da-praga" }),
        C("homem", 265, "stand", { dy: 0.56, facing: -1, id: "inimigo-do-cerco" }),
      ] }),
      // v.38 — e no meio da praga, um por um: "conhecendo cada um A CHAGA DO SEU
      // CORAÇÃO, e ESTENDENDO AS SUAS MÃOS para esta casa". Três figuras viradas
      // para a casa lá no fundo, com as mãos abertas.
      b(38, { by: "rei", q: "conhecendo cada um a chaga do seu coração, e estendendo as suas mãos para esta casa",
        env: { terrain: "field", night: 0.38, glory: 0.44, storm: 0.3, fire: 0.14, verdure: 0.12 }, cast: [
        C("rei", -300, "kneel", { dy: 0.8, facing: 1, id: "salomao", glow: 0.3 }),
        C("homem", -110, "raise", { dy: 0.74, facing: 1, id: "lavrador-da-praga" }),
        C("mulherComum", 15, "raise", { dy: 0.7, facing: 1, id: "mulher-da-cidade-sitiada" }),
        C("servo", 155, "kneel", { dy: 0.64, facing: 1, id: "sitiado-da-cidade" }),
      ] }),
      // v.39 — o pedido que só Deus pode atender: "dá a cada um conforme a todos
      // os seus caminhos, e segundo vires o seu coração, PORQUE SÓ TU CONHECES O
      // CORAÇÃO de todos os filhos dos homens". Volta ao altar, e a glória sobe.
      b(39, { by: "rei", q: "porque só tu conheces o coração de todos os filhos dos homens.",
        set: "altar-de-cobre", props: ALTAR_DE_COBRE,
        env: { terrain: "field", night: 0.14, glory: 0.92, storm: 0.02, fire: 0.3, water: 0, verdure: 0.32 }, cast: [
        C("rei", -55, "kneel", { dy: 0.72, facing: 1, id: "salomao", glow: 0.44 }),
        C("anciao", 115, "bow", { dy: 0.68, facing: -1, id: "zadoque", glow: 0.22 }),
      ] }),
      // v.40 — e o alvo de tudo isso: "PARA QUE TE TEMAM todos os dias que
      // viverem na terra que deste a nossos pais". O povo se ajoelha no átrio,
      // atrás do rei, sem uma palavra.
      b(40, { by: "rei", q: "Para que te temam todos os dias que viverem na terra que deste a nossos pais.",
        env: { terrain: "field", night: 0.16, glory: 0.86, storm: 0, fire: 0.26, verdure: 0.34 }, cast: [
        C("rei", -85, "kneel", { dy: 0.72, facing: 1, id: "salomao", glow: 0.4 }),
        C("anciao", 60, "kneel", { dy: 0.7, facing: -1, id: "anciao-de-israel1" }),
        C("homem", 185, "bow", { dy: 0.64, facing: -1, id: "cabeca-de-tribo1" }),
        C("servo", 280, "kneel", { dy: 0.58, facing: -1, id: "servo-do-atrio" }),
      ] }),
      // v.41 — ⭐ PEDIDO 5, e o mais largo de todos: o ESTRANGEIRO, que NÃO É do
      // teu povo Israel, vindo de TERRAS REMOTAS por amor do teu nome. O jumento
      // da viagem, o poço da estrada, e a casa pequenina lá na frente.
      b(41, { by: "rei", q: "E também ouve ao estrangeiro, que não for do teu povo Israel, quando vier de terras remotas, por amor do teu nome",
        set: "estrada-do-estrangeiro", props: ESTRADA_DO_ESTRANGEIRO,
        env: { terrain: "desert", night: 0.24, glory: 0.5, storm: 0.06, fire: 0, water: 0.08, verdure: 0.2 }, cast: [
        C("rei", -300, "kneel", { dy: 0.82, facing: 1, id: "salomao", glow: 0.3 }),
        C("homem", -45, "walk", { dy: 0.68, facing: 1, id: "estrangeiro-de-terra-remota" }),
      ] }),
      // v.42 — por que ele veio: "porque OUVIRÃO do teu grande nome, e da tua
      // FORTE MÃO, e do teu BRAÇO ESTENDIDO" — e vier orar VOLTADO PARA ESTA
      // CASA. Ele para no meio da estrada e se volta para o lado dela.
      b(42, { by: "rei", q: "e vier orar voltado para esta casa,",
        env: { terrain: "desert", night: 0.18, glory: 0.68, storm: 0.02, water: 0.08, verdure: 0.22 }, cast: [
        C("rei", -300, "kneel", { dy: 0.82, facing: 1, id: "salomao", glow: 0.34 }),
        C("homem", 70, "kneel", { dy: 0.66, facing: -1, id: "estrangeiro-de-terra-remota" }),
      ] }),
      // v.43 — e o alvo do pedido estoura o tamanho de Israel: "a fim de que
      // TODOS OS POVOS DA TERRA conheçam o teu nome, para te temerem como o teu
      // povo Israel". A estrada enche de gente que não é daqui.
      b(43, { by: "rei", q: "a fim de que todos os povos da terra conheçam o teu nome",
        env: { terrain: "desert", night: 0.12, glory: 0.96, storm: 0, water: 0.1, verdure: 0.26 }, cast: [
        C("rei", -300, "kneel", { dy: 0.82, facing: 1, id: "salomao", glow: 0.42 }),
        C("homem", -30, "raise", { dy: 0.7, facing: 1, id: "estrangeiro-de-terra-remota", glow: 0.24 }),
        C("multidao", 165, "raise", { dy: 0.52, facing: -1, id: "povos-da-terra" }),
      ] }),
      // v.44 — PEDIDO 6: quando o teu povo SAIR À GUERRA pelo caminho por que os
      // enviares, e orarem ao SENHOR PARA O LADO DESTA CIDADE. O portão fica para
      // trás, o carro e o cavalo já na estrada, e todos olham por cima do ombro.
      b(44, { by: "rei", q: "Quando o teu povo sair à guerra contra o seu inimigo, pelo caminho por que os enviares",
        set: "saida-a-guerra", props: SAIDA_A_GUERRA,
        env: { terrain: "field", night: 0.34, glory: 0.42, storm: 0.26, fire: 0.08, water: 0, verdure: 0.28 }, cast: [
        C("rei", -300, "kneel", { dy: 0.82, facing: 1, id: "salomao", glow: 0.3 }),
        C("homem", 10, "walk", { dy: 0.68, facing: 1, id: "soldado-que-sai-a-guerra1" }),
        C("homem", 170, "walk", { dy: 0.6, facing: 1, id: "soldado-que-sai-a-guerra2" }),
      ] }),
      // v.45 — "OUVE, ENTÃO, nos céus a sua oração e a sua súplica, e FAZE-LHES
      // JUSTIÇA". Os dois soldados param na estrada, viram-se para a cidade e
      // erguem as mãos; a luz cai sobre o caminho.
      b(45, { by: "rei", q: "Ouve, então, nos céus a sua oração e a sua súplica, e faze-lhes justiça.",
        env: { terrain: "field", night: 0.2, glory: 0.84, storm: 0.1, fire: 0.04, verdure: 0.32 }, cast: [
        C("rei", -300, "kneel", { dy: 0.82, facing: 1, id: "salomao", glow: 0.38 }),
        C("homem", 55, "raise", { dy: 0.7, facing: -1, id: "soldado-que-sai-a-guerra1" }),
        C("homem", 195, "kneel", { dy: 0.62, facing: -1, id: "soldado-que-sai-a-guerra2" }),
      ] }),
      // v.46 — PEDIDO 7, o mais longo e o mais escuro: "quando pecarem contra ti
      // (POIS NÃO HÁ HOMEM QUE NÃO PEQUE)… e os LEVEM EM CATIVEIRO para a terra
      // inimiga, quer longe ou perto esteja". O zigurate estranho, o rio do
      // exílio, os fardos e a fogueira de quem os levou.
      b(46, { by: "rei", q: "de modo que os levem em cativeiro para a terra inimiga, quer longe ou perto esteja,",
        set: "terra-do-cativeiro", props: TERRA_DO_CATIVEIRO,
        env: { terrain: "city", night: 0.72, glory: 0.08, storm: 0.34, fire: 0.16, water: 0.2, verdure: 0.08 }, cast: [
        C("rei", -300, "kneel", { dy: 0.84, facing: 1, id: "salomao", glow: 0.24 }),
        C("homem", 25, "walk", { dy: 0.72, facing: 1, id: "cativo-de-israel1" }),
        C("mulherComum", 130, "walk", { dy: 0.68, facing: 1, id: "cativa-de-israel" }),
        C("homem", 245, "stand", { dy: 0.58, facing: -1, id: "captor-da-terra-inimiga" }),
      ] }),
      // v.47 — e ali, na terra do cativeiro, eles CAEM EM SI: "PECAMOS, e
      // perversamente procedemos, e cometemos iniqüidade". A noite fecha em cima
      // deles e os três ficam de joelhos junto ao rio.
      b(47, { by: "rei", q: "Pecamos, e perversamente procedemos, e cometemos iniqüidade",
        env: { terrain: "city", night: 0.8, glory: 0.14, storm: 0.28, fire: 0.12, water: 0.22, verdure: 0.06 }, cast: [
        C("rei", -300, "kneel", { dy: 0.84, facing: 1, id: "salomao", glow: 0.26 }),
        C("homem", -30, "kneel", { dy: 0.76, facing: 1, id: "cativo-de-israel1" }),
        C("mulherComum", 95, "bow", { dy: 0.72, facing: 1, id: "cativa-de-israel" }),
        C("servo", 205, "kneel", { dy: 0.64, facing: 1, id: "cativo-de-israel2" }),
      ] }),
      // v.48 — a conversão inteira: DE TODO O CORAÇÃO e de toda a alma, na terra
      // dos inimigos — "e orarem a ti PARA O LADO DA SUA TERRA". Todos se voltam
      // para o mesmo lado, de costas para o zigurate, e o primeiro claro nasce.
      b(48, { by: "rei", q: "e orarem a ti para o lado da sua terra que deste a seus pais",
        env: { terrain: "city", night: 0.56, glory: 0.42, storm: 0.18, fire: 0.08, water: 0.22, verdure: 0.1 }, cast: [
        C("rei", -300, "kneel", { dy: 0.84, facing: 1, id: "salomao", glow: 0.3 }),
        C("homem", -40, "raise", { dy: 0.76, facing: 1, id: "cativo-de-israel1" }),
        C("mulherComum", 80, "kneel", { dy: 0.72, facing: 1, id: "cativa-de-israel" }),
        C("servo", 190, "kneel", { dy: 0.66, facing: 1, id: "cativo-de-israel2" }),
      ] }),
      // v.49 — o refrão volta, agora do fim do mundo: "OUVE ENTÃO NOS CÉUS,
      // ASSENTO DA TUA HABITAÇÃO, a sua oração e a sua súplica, e faze-lhes
      // justiça". A luz atravessa o rio do exílio e chega neles.
      b(49, { by: "rei", q: "Ouve então nos céus, assento da tua habitação, a sua oração e a sua súplica, e faze-lhes justiça.",
        env: { terrain: "city", night: 0.4, glory: 0.78, storm: 0.1, fire: 0.06, water: 0.24, verdure: 0.14 }, cast: [
        C("rei", -300, "kneel", { dy: 0.84, facing: 1, id: "salomao", glow: 0.4 }),
        C("homem", -20, "raise", { dy: 0.74, facing: 1, id: "cativo-de-israel1", glow: 0.22 }),
        C("servo", 150, "raise", { dy: 0.68, facing: 1, id: "cativo-de-israel2" }),
      ] }),
      // v.50 — e o pedido mais improvável do capítulo: "DÁ-LHES MISERICÓRDIA
      // PERANTE AQUELES QUE OS TÊM CATIVOS, para que deles tenham compaixão". O
      // captor baixa a mão e se aproxima; é o único que muda de pose aqui.
      b(50, { by: "rei", q: "e dá-lhes misericórdia perante aqueles que os têm cativos, para que deles tenham compaixão.",
        env: { terrain: "city", night: 0.34, glory: 0.84, storm: 0.06, fire: 0.04, water: 0.24, verdure: 0.18 }, cast: [
        C("rei", -300, "kneel", { dy: 0.84, facing: 1, id: "salomao", glow: 0.4 }),
        C("homem", -10, "kneel", { dy: 0.74, facing: 1, id: "cativo-de-israel1" }),
        C("homem", 150, "bow", { dy: 0.68, facing: -1, id: "captor-da-terra-inimiga" }),
      ] }),
      // v.51 — a razão de tudo: "SÃO O TEU POVO E A TUA HERANÇA que tiraste da
      // terra do Egito, DO MEIO DO FORNO DE FERRO". A memória mais antiga da
      // oração entra em cena — o forno aceso e as pilhas de tijolo.
      b(51, { by: "rei", q: "que tiraste da terra do Egito, do meio do forno de ferro.",
        set: "forno-de-ferro", props: FORNO_DE_FERRO,
        env: { terrain: "desert", night: 0.5, glory: 0.4, storm: 0.12, fire: 0.6, water: 0, verdure: 0.08 }, cast: [
        C("rei", -305, "kneel", { dy: 0.84, facing: 1, id: "salomao", glow: 0.34 }),
        C("servo", 30, "bow", { dy: 0.74, facing: 1, id: "escravo-do-forno-de-ferro" }),
        C("servo", 155, "kneel", { dy: 0.68, facing: 1, id: "escravo-do-forno-de-ferro2" }),
      ] }),
      // v.52 — de volta ao altar para o fecho da oração: "para que teus OLHOS
      // ESTEJAM ABERTOS à súplica do teu servo e à súplica do teu povo Israel, a
      // fim de OS OUVIRES EM TUDO quanto clamarem a ti".
      b(52, { by: "rei", q: "a fim de os ouvires em tudo quanto clamarem a ti.",
        set: "altar-de-cobre", props: ALTAR_DE_COBRE,
        env: { terrain: "field", night: 0.14, glory: 0.9, storm: 0, fire: 0.3, water: 0, verdure: 0.32 }, cast: [
        C("rei", -70, "kneel", { dy: 0.72, facing: 1, id: "salomao", glow: 0.44 }),
        C("anciao", 105, "kneel", { dy: 0.68, facing: -1, id: "zadoque", glow: 0.22 }),
        C("multidao", 250, "raise", { dy: 0.46, facing: -1, id: "congregacao-de-israel" }),
      ] }),
      // v.53 — a última linha da oração amarra tudo em Moisés: "POIS TU PARA TUA
      // HERANÇA OS ELEGESTE de todos os povos da terra, como tens falado pelo
      // ministério de Moisés, teu servo". A glória bate no auge sobre o altar.
      b(53, { by: "rei", q: "Pois tu para tua herança os elegeste de todos os povos da terra",
        env: { terrain: "field", night: 0.1, glory: 1, storm: 0, fire: 0.34, verdure: 0.34 }, cast: [
        C("rei", -60, "raise", { dy: 0.74, facing: 1, id: "salomao", glow: 0.5 }),
        C("anciao", 100, "bow", { dy: 0.68, facing: -1, id: "zadoque", glow: 0.24 }),
        C("anciao", 205, "bow", { dy: 0.62, facing: -1, id: "anciao-de-israel1" }),
      ] }),
      // v.54 — acabada a oração e a súplica, "ESTANDO DE JOELHOS e com as mãos
      // estendidas para os céus, SE LEVANTOU de diante do altar do SENHOR". O
      // versículo que registra a postura só quando ela termina.
      b(54, { q: "estando de joelhos e com as mãos estendidas para os céus, se levantou de diante do altar do Senhor.",
        env: { terrain: "field", night: 0.12, glory: 0.92, storm: 0, fire: 0.3, verdure: 0.34 }, cast: [
        C("rei", -95, "stand", { dy: 0.68, facing: 1, id: "salomao", glow: 0.46 }),
        C("anciao", 85, "stand", { dy: 0.68, facing: -1, id: "zadoque", glow: 0.22 }),
        C("multidao", 240, "raise", { dy: 0.48, facing: -1, id: "congregacao-de-israel" }),
      ] }),
      // v.55 — ele se põe EM PÉ e abençoa toda a congregação de Israel EM ALTA
      // VOZ. O altar fica às costas dele, o rosto vira para o povo, e o pátio
      // inteiro é o auditório.
      b(55, { q: "abençoou a toda a congregação de Israel em alta voz",
        set: "diante-da-congregacao", props: DIANTE_DA_CONGREGACAO,
        env: { terrain: "city", night: 0.12, glory: 0.9, storm: 0, fire: 0.24, verdure: 0.34 }, cast: [
        C("rei", -215, "raise", { dy: 0.64, facing: 1, id: "salomao", glow: 0.44 }),
        C("multidao", 90, "raise", { dy: 0.52, facing: -1, id: "congregacao-de-israel" }),
        C("anciao", -60, "stand", { dy: 0.7, facing: -1, id: "anciao-de-israel1" }),
      ] }),
      // v.56 — ⭐ "bendito seja o SENHOR, que DEU REPOUSO ao seu povo Israel,
      // segundo tudo o que disse; NEM UMA SÓ PALAVRA CAIU de todas as suas boas
      // palavras que falou pelo ministério de Moisés, seu servo".
      b(56, { by: "rei", q: "nem uma só palavra caiu de todas as suas boas palavras que falou pelo ministério de Moisés, seu servo.",
        env: { terrain: "city", night: 0.08, glory: 1, storm: 0, fire: 0.22, verdure: 0.38 }, cast: [
        C("rei", -190, "raise", { dy: 0.66, facing: 1, id: "salomao", glow: 0.52 }),
        C("multidao", 105, "raise", { dy: 0.5, facing: -1, id: "congregacao-de-israel" }),
        C("anciao", -50, "raise", { dy: 0.7, facing: -1, id: "zadoque", glow: 0.24 }),
      ] }),
      // v.57 — do louvor ele passa ao pedido pelo futuro: "o SENHOR nosso Deus
      // SEJA CONOSCO, como foi com nossos pais; NÃO NOS DESAMPARE, e não nos
      // deixe". As mãos abertas para o povo, não mais para o céu.
      b(57, { by: "rei", q: "O Senhor nosso Deus seja conosco, como foi com nossos pais; não nos desampare, e não nos deixe.",
        env: { terrain: "city", night: 0.12, glory: 0.88, storm: 0.02, fire: 0.2, verdure: 0.36 }, cast: [
        C("rei", -165, "point", { dy: 0.68, facing: 1, id: "salomao", glow: 0.42 }),
        C("anciao", 25, "stand", { dy: 0.7, facing: -1, id: "anciao-de-israel1" }),
        C("multidao", 175, "raise", { dy: 0.5, facing: -1, id: "congregacao-de-israel" }),
      ] }),
      // v.58 — e o pedido é por dentro: "INCLINANDO A SI O NOSSO CORAÇÃO, para
      // andar em todos os seus caminhos, e para guardar os seus mandamentos". O
      // povo se curva onde está, sem sair do lugar.
      b(58, { by: "rei", q: "Inclinando a si o nosso coração, para andar em todos os seus caminhos",
        env: { terrain: "city", night: 0.16, glory: 0.82, storm: 0.02, fire: 0.18, verdure: 0.34 }, cast: [
        C("rei", -175, "raise", { dy: 0.68, facing: 1, id: "salomao", glow: 0.4 }),
        C("anciao", 20, "bow", { dy: 0.72, facing: -1, id: "anciao-de-israel1" }),
        C("homem", 145, "kneel", { dy: 0.66, facing: -1, id: "cabeca-de-tribo1" }),
        C("servo", 260, "kneel", { dy: 0.6, facing: -1, id: "servo-do-atrio" }),
      ] }),
      // v.59 — que estas minhas palavras "estejam PERTO, diante do SENHOR nosso
      // Deus, DE DIA E DE NOITE". O sol e a lua entram no mesmo céu sobre a casa,
      // e o candelabro das vigílias se acende no meio da tarde.
      b(59, { by: "rei", q: "estejam perto, diante do Senhor nosso Deus, de dia e de noite",
        props: CONGREGACAO_DE_DIA_E_DE_NOITE,
        env: { terrain: "city", night: 0.34, glory: 0.86, storm: 0, fire: 0.2, verdure: 0.32 }, cast: [
        C("rei", -190, "raise", { dy: 0.68, facing: 1, id: "salomao", glow: 0.44 }),
        C("anciao", -25, "stand", { dy: 0.72, facing: -1, id: "zadoque", glow: 0.22 }),
        C("homem", 130, "stand", { dy: 0.66, facing: -1, id: "sacerdote-da-vigilia" }),
      ] }),
      // v.60 — ⭐ e o alvo de toda a dedicação sai de Israel outra vez: "para que
      // TODOS OS POVOS DA TERRA saibam que O SENHOR É DEUS, E QUE NÃO HÁ OUTRO".
      // Glória no máximo e o pátio inteiro de braços erguidos.
      b(60, { by: "rei", q: "Para que todos os povos da terra saibam que o Senhor é Deus, e que não há outro.",
        set: "diante-da-congregacao", props: DIANTE_DA_CONGREGACAO,
        env: { terrain: "city", night: 0.06, glory: 1, storm: 0, fire: 0.26, verdure: 0.4 }, cast: [
        C("rei", -200, "raise", { dy: 0.66, facing: 1, id: "salomao", glow: 0.55 }),
        C("multidao", 75, "raise", { dy: 0.52, facing: -1, id: "congregacao-de-israel" }),
        C("multidao", 265, "raise", { dy: 0.42, facing: -1, id: "povos-da-terra" }),
      ] }),
      // v.61 — a última palavra do rei neste capítulo não é sobre a casa, é sobre
      // o coração: "E SEJA O VOSSO CORAÇÃO INTEIRO para com o SENHOR nosso Deus,
      // para andardes nos seus estatutos… COMO HOJE".
      b(61, { by: "rei", q: "E seja o vosso coração inteiro para com o Senhor nosso Deus",
        env: { terrain: "city", night: 0.1, glory: 0.94, storm: 0, fire: 0.24, verdure: 0.38 }, cast: [
        C("rei", -150, "point", { dy: 0.7, facing: 1, id: "salomao", glow: 0.48 }),
        C("multidao", 110, "raise", { dy: 0.52, facing: -1, id: "congregacao-de-israel" }),
        C("anciao", -20, "bow", { dy: 0.72, facing: -1, id: "anciao-de-israel1" }),
      ] }),
      // v.62 — acabada a bênção, começa a matança da festa: "o rei e TODO O
      // ISRAEL com ele ofereceram sacrifícios perante a face do SENHOR". O altar
      // no auge do fogo e o curral cheio ao lado.
      b(62, { q: "E o rei e todo o Israel com ele ofereceram sacrifícios perante a face do Senhor.",
        set: "sacrificio-do-patio", props: SACRIFICIO_DO_PATIO,
        env: { terrain: "city", night: 0.14, glory: 0.86, storm: 0.02, fire: 0.72, verdure: 0.3 }, cast: [
        C("rei", -180, "raise", { dy: 0.66, facing: 1, id: "salomao", glow: 0.4 }),
        C("homem", 45, "stand", { dy: 0.7, facing: -1, id: "sacerdote-do-sacrificio" }),
        C("multidao", 235, "raise", { dy: 0.5, facing: -1, id: "congregacao-de-israel" }),
      ] }),
      // v.63 — e a conta que o capítulo faz questão de dar: VINTE E DUAS MIL
      // VACAS e CENTO E VINTE MIL OVELHAS em sacrifício pacífico — "assim o rei e
      // todos os filhos de Israel CONSAGRARAM a casa do SENHOR".
      b(63, { q: "vinte e duas mil vacas e cento e vinte mil ovelhas",
        env: { terrain: "city", night: 0.12, glory: 0.9, storm: 0.02, fire: 0.8, verdure: 0.3 }, cast: [
        C("rei", -215, "raise", { dy: 0.64, facing: 1, id: "salomao", glow: 0.42 }),
        C("rebanho", 120, "stand", { dy: 0.66, facing: -1, id: "rebanho-do-sacrificio" }),
        C("rebanho", 255, "stand", { dy: 0.58, facing: -1, id: "rebanho-da-dedicacao" }),
        C("homem", -40, "stand", { dy: 0.72, facing: -1, id: "sacerdote-do-sacrificio" }),
      ] }),
      // v.64 — o problema mais prático do dia: o ALTAR DE COBRE era MUITO PEQUENO
      // para tanta oferta, e por isso o rei SANTIFICOU O MEIO DO ÁTRIO no mesmo
      // dia. O altar encolhido lá na ponta, e o pátio inteiro virado brasa.
      b(64, { q: "porque o altar de cobre que estava diante da face do Senhor era muito pequeno",
        set: "meio-do-atrio", props: MEIO_DO_ATRIO,
        env: { terrain: "city", night: 0.18, glory: 0.82, storm: 0.02, fire: 0.9, verdure: 0.24 }, cast: [
        C("rei", 145, "point", { dy: 0.7, facing: -1, id: "salomao", glow: 0.36 }),
        C("anciao", -20, "stand", { dy: 0.74, facing: 1, id: "zadoque", glow: 0.22 }),
        C("homem", -160, "stand", { dy: 0.7, facing: 1, id: "sacerdote-do-sacrificio" }),
      ] }),
      // v.65 — a FESTA: sete dias e mais sete dias, CATORZE DIAS, com uma grande
      // congregação DESDE A ENTRADA DE HAMATE ATÉ AO RIO DO EGITO. O arraial de
      // tendas de ponta a ponta, as harpas, as trombetas e o rio fechando o quadro.
      b(65, { q: "desde a entrada de Hamate até ao rio do Egito",
        set: "festa-de-catorze-dias", props: FESTA_DE_CATORZE_DIAS,
        env: { terrain: "field", night: 0.16, glory: 0.9, storm: 0.02, fire: 0.36, water: 0.3, verdure: 0.52 }, cast: [
        C("rei", -110, "raise", { dy: 0.7, facing: 1, id: "salomao", glow: 0.4 }),
        C("multidao", 55, "raise", { dy: 0.54, facing: -1, id: "congregacao-de-israel" }),
        C("homem", -240, "stand", { dy: 0.66, facing: 1, id: "homem-de-hamate" }),
        C("mulherComum", 215, "stand", { dy: 0.6, facing: -1, id: "mulher-de-israel-na-festa" }),
      ] }),
      // v.66 — e o oitavo dia: ele DESPEDE o povo, "e eles ABENÇOARAM O REI;
      // então se foram às suas tendas, ALEGRES E FELIZES DE CORAÇÃO, por causa de
      // todo o bem que o SENHOR fizera a Davi seu servo, e a Israel seu povo".
      b(66, { q: "então se foram às suas tendas, alegres e felizes de coração",
        set: "estrada-das-tendas", props: ESTRADA_DAS_TENDAS,
        env: { terrain: "field", night: 0.1, glory: 0.96, storm: 0, fire: 0.12, water: 0.12, verdure: 0.5 }, cast: [
        C("rei", -215, "raise", { dy: 0.68, facing: 1, id: "salomao", glow: 0.44 }),
        C("multidao", 60, "raise", { dy: 0.56, facing: 1, id: "povo-que-volta-as-tendas" }),
        C("homem", 225, "walk", { dy: 0.62, facing: 1, id: "homem-de-hamate" }),
        C("mulherComum", 300, "walk", { dy: 0.56, facing: 1, id: "mulher-de-israel-na-festa" }),
      ] }),
    ],
  },
};
