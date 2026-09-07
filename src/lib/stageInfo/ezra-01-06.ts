// Fichas ESPECÍFICAS por (capítulo → papel) de ESDRAS 1–6.
// Seis capítulos que vão do pregão de Ciro à páscoa comida dentro de uma casa
// acabada, e que quase não têm heróis: têm OFÍCIOS e CASAS PATERNAS. O perigo
// da ficha aqui é a lista — "um homem que voltou do cativeiro" trinta vezes —,
// e o remédio é o próprio texto, que teve o cuidado de escrever o nome de cada
// um: o chefe dos filhos de Parós, o homem de Anatote, o cantor de Asafe, o
// porteiro dos filhos de Salum, o netinim que Davi dera ao serviço dos levitas,
// o filho dos servos de Salomão, o que subiu de Tel-Melá e não pôde mostrar a
// casa de seus pais, os velhos que viram a primeira casa e choraram em altas
// vozes enquanto os outros jubilavam. Deus, nestes seis capítulos, nunca fala
// sem mediador: em 1:1 age calado, por dentro de um rei pagão; em 5:1-2 a
// palavra tem boca, nome e barba — Ageu e Zacarias, filho de Ido.
import type { StageInfo } from "@/lib/rpgStageInfo";

export const CHAPTER_ACTORS_01_06: Record<number, Record<string, StageInfo>> = {
  // ---------------------------------------------------------------- Ed 1
  1: {
    anciao: {
      title: "Os chefes dos pais de Judá e de Benjamim, cujo espírito Deus despertou — e Sesbazar, o príncipe de Judá, que recebeu os vasos contados",
      subtitle: "Ed 1:5,8,11 • a resposta ao pregão, do lado de cá da cidade",
      text: "\"Então se levantaram os chefes dos pais de Judá e Benjamim, e os sacerdotes e os levitas, com todos aqueles cujo espírito Deus despertou\" (Ed 1:5). Repare no verbo: é o MESMO do primeiro versículo — \"despertou o SENHOR o espírito de Ciro\". Deus acorda o imperador e o chefe de família com a mesma palavra, e nenhum dos dois ouve voz nenhuma. Duas tribos, e só duas: gente nascida em Babilônia que nunca viu a terra para onde vai. Não há rei nem exército, há pais de família com um decreto na mão; à frente vai \"Sesbazar, príncipe de Judá\" (Ed 1:8).",
    },
    homem: {
      title: "O arauto que passou o pregão, o judeu do cativeiro que deu um passo à frente, o vizinho que ficou atrás e pagou a subida, e o sacerdote da casa dos deuses de Babilônia",
      subtitle: "Ed 1:1-4,6-7 • quem ouviu o decreto, quem obedeceu e quem ficou",
      text: "O decreto sai por duas vias: Ciro \"fez passar pregão por todo o seu reino, como também por escrito\" (Ed 1:1) — a voz para a praça, a cópia selada para o arquivo, e é uma dessas cópias que reaparecerá em Acmeta para salvar a obra (Ed 6:2). O convite é voluntário, e o quadro precisa dos dois ouvintes: o que dá o passo e o que fica. Porque o decreto pensou em quem fica — \"os homens do seu lugar o ajudarão com prata, com ouro, com bens, e com gados\" (Ed 1:4), eco exato da saída do Egito (Êx 12:35-36).",
    },
    multidao: {
      title: "Os do cativeiro que subiram de Babilônia para Jerusalém atrás dos vasos",
      subtitle: "Ed 1:11 • a coluna do regresso na estrada, com a cidade ainda pequena no horizonte",
      text: "\"todos estes levou Sesbazar, quando os do cativeiro subiram de babilônia para Jerusalém\" (Ed 1:11). O capítulo fecha em movimento, e quem anda nesta estrada é, na maior parte, gente que nunca esteve em Jerusalém: nasceu junto ao rio Quebar e sobe para uma cidade que só conhece de ouvir contar. Setenta anos foi o prazo dito com número (Jr 25:11), e Daniel achou-o nos livros (Dn 9:2). O salmo que ficou desta manhã não se envergonha do espanto: \"Quando o SENHOR trouxe do cativeiro os que voltaram a Sião, estávamos como os que sonham\" (Sl 126:1).",
    },
    patriarca: {
      title: "Os sacerdotes que se levantaram para subir — a casa de Arão sem casa onde ministrar",
      subtitle: "Ed 1:5 • o sacerdócio arrumando a mudança no bairro dos exilados",
      text: "\"Então se levantaram os chefes dos pais de Judá e Benjamim, e os sacerdotes e os levitas\" (Ed 1:5). Este homem é filho ou neto de quem viu o templo arder; o seu chefe de linhagem foi levado a ferros (1Cr 6:15). Durante setenta anos houve sacerdotes sem altar: uma ordem inteira preparada para um serviço que não podia acontecer em lugar nenhum, guardando de cor os ritos, os turnos e as medidas. É por isso que a primeira coisa que este povo levanta em Jerusalém não é parede — é altar (Ed 3:2), antes de uma só pedra do templo (Ed 3:6).",
    },
    rebanho: {
      title: "O gado com que os vizinhos de Babilônia firmaram as mãos dos que subiam",
      subtitle: "Ed 1:4,6 • os animais dados à porta por quem não ia",
      text: "\"os homens do seu lugar o ajudarão com prata, com ouro, com bens, e com gados\" (Ed 1:4) — e o versículo 6 diz que foi feito: \"lhes firmaram as mãos com vasos de prata, com ouro, com bens e com gado\". O gado desta cena não é riqueza de exposição: é o transporte, o leite da estrada e o rebanho de quem vai recomeçar num campo que passou setenta anos sem dono. E é dado por quem NÃO vai. \"Firmaram as mãos\" é a chave — as mesmas mãos que o capítulo 4 verá debilitadas pelo povo da terra (Ed 4:4) são aqui firmadas por vizinhos que ficam em Babilônia.",
    },
    servo: {
      title: "O escriba que copiou o pregão, o escrivão que contou os cinco mil e quatrocentos, os levitas que subiram e os carregadores dos utensílios",
      subtitle: "Ed 1:1,5,8-11 • as mãos que escrevem, contam, amarram e carregam",
      text: "Este capítulo inteiro se faz com pena e com corda. A pena é a do escriba que passa o pregão \"como também por escrito\" (Ed 1:1) e a do escrivão do tesouro persa: os utensílios saem \"pela mão de Mitredate, o tesoureiro, que os entregou contados a Sesbazar\" (Ed 1:8), e a conta é lida peça por peça (v. 9). A corda é a de quem amarra as caixas no lombo do jumento. Ao lado sobe o levita, sem alarde, que dois capítulos adiante estará com os címbalos na mão no dia do fundamento (Ed 3:10). Nada aqui é épico: é gente conferindo números e carregando peso.",
    },
  },

  // ---------------------------------------------------------------- Ed 2
  2: {
    anciao: {
      title: "Os chefes das casas paternas e os velhos das cidades do arrolamento — os filhos de Parós, de Sefatias, de Ará, de Paate-Moabe, e os homens de Belém, de Anatote, de Micmás, de Jericó — e o governador que julgou o registro dos sacerdotes",
      subtitle: "Ed 2:3-35,63 • quem dá o número da sua casa e quem responde pela sua cidade",
      text: "Setenta versículos de nomes, e cada linha é um homem em pé diante de um contador. A lista começa por CASAS — \"Os filhos de Parós, dois mil cento e setenta e dois\" (Ed 2:3) — e no versículo 21 muda de eixo para CIDADES: Belém, Anatote, Micmás. O ancião é a autoridade que restou a um povo sem rei: responde pelo número, pela terra e pela genealogia dos seus. E no fim um deles diz a frase mais delicada do livro: \"que não comessem das coisas consagradas, até que houvesse sacerdote com Urim e com Tumim\" (Ed 2:63) — não é um não, é um \"ainda não\".",
    },
    homem: {
      title: "O lavrador de Parós, o pisador do lagar de Elão, o filho da casa de Adonicão, o homem de Ai, de Anatote, de Hadide e de Ono, o porteiro dos filhos de Salum e de Talmom, o netinim, o filho dos servos de Salomão e o que subiu de Tel-Melá sem linhagem",
      subtitle: "Ed 2:3-58,59-62 • os homens que a lista conta um a um, e os que ela não pôde contar",
      text: "\"O número dos homens do povo de Israel\" (Ed 2:2): é assim que o arrolamento se apresenta, e por isso quase toda figura masculina do capítulo é uma linha do rol — o que volta ao campo de Nebo, o porteiro de um dos seis postos (v. 42), o netinim que carrega água e lenha, o filho dos servos de Salomão. E há, no fim, os que a lista não conseguiu contar: \"porém não puderam provar que as suas famílias e a sua linhagem eram de Israel\" (Ed 2:59). Seiscentas e cinquenta e duas pessoas com nome, com número e sem papel, paradas do lado de fora do portão.",
    },
    mulherComum: {
      title: "As mulheres do arrolamento — a da casa de Ará na eira, a da casa de Zacai no poço, a mãe da casa de Jora no arraial, a que lavou no ribeiro dos netinins, a que subiu de Tel-Harsa sem linhagem — e as duzentas cantoras",
      subtitle: "Ed 2:65 • as que a soma não contou, e o único versículo em que aparecem",
      text: "A conta deste capítulo é declaradamente de homens (Ed 2:2), e as mulheres atravessam setenta versículos sem entrar na soma. Aparecem uma vez só, e por causa do ofício: \"também tinha duzentos cantores e cantoras\" (Ed 2:65) — duzentas vozes contadas porque cantam, e o cântico é serviço da casa desde Davi (Ne 12:46). Fora dessa linha, ela está na eira, no poço, na vinha, e é ela que faz a viagem inteira com as crianças. A promessa que este povo carregava contava com todas: \"as ruas da cidade se encherão de meninos e meninas\" (Zc 8:5).",
    },
    multidao: {
      title: "A congregação junta dos quarenta e dois mil trezentos e sessenta, a gente de Senaá e a fila da casa de Azgade no poço",
      subtitle: "Ed 2:12,35,38,64 • a soma lida em voz alta e os grupos grandes da lista",
      text: "\"Toda esta congregação junta foi de quarenta e dois mil trezentos e sessenta\" (Ed 2:64). É pouco — pouquíssimo, para um povo que saíra do Egito com seiscentos mil homens de pé —, e o livro dá o número sem o disfarçar. Dentro dele há blocos que enchem sozinhos uma praça: \"Os filhos de Senaá, três mil seiscentos e trinta\" (v. 35), o maior da lista e de um lugar que nenhum outro texto situa no mapa. A multidão daqui não é um borrão: é a soma de casas contadas uma a uma. Neemias copiou-a de novo, até no total (Ne 7:66).",
    },
    pastor: {
      title: "O pastor dos campos de Belém, na aldeia que recebeu de volta cento e vinte e três dos seus",
      subtitle: "Ed 2:21 • a primeira cidade da lista, e a menor entre os milhares de Judá",
      text: "\"Os filhos de Belém, cento e vinte e três\" (Ed 2:21). É o primeiro nome de cidade do arrolamento, e cento e vinte e três é uma aldeia — três dezenas de famílias voltando para uma encosta de pastos e de cevada. A Escritura já passara por estes campos com Rute (Rt 1:22) e com o filho mais novo de Jessé, o que faltava porque \"está apascentando as ovelhas\" (1Sm 16:11). E foi sobre esta pequenez que Miquéias falou: \"posto que pequena entre os milhares de Judá, de ti me sairá o que governará em Israel\" (Mq 5:2). Este pastor não sabe disso.",
    },
    patriarca: {
      title: "As quatro casas sacerdotais que voltaram — Jedaías, Imer, Pasur e Harim — e o sacerdote dos filhos de Barzilai, excluído por não achar o seu nome",
      subtitle: "Ed 2:36-39,61-63 • o adro sem paredes, com quatro mil duzentos e oitenta e nove sacerdotes",
      text: "\"Os sacerdotes: os filhos de Jedaías, da casa de Jesuá, novecentos e setenta e três\" (Ed 2:36), Imer, Pasur e Harim — quatro casas apenas, das vinte e quatro turmas que Davi repartira por sorte (1Cr 24:7-14). Pasur é a casa do sacerdote que mandou pôr Jeremias no tronco (Jr 20:1). Quatro mil duzentos e oitenta e nove homens de linho para uma casa que ainda não tem uma pedra — e ao lado deles um sacerdote que não consegue provar que o é: \"assim, por imundos, foram excluídos do sacerdócio\" (Ed 2:62).",
    },
    servo: {
      title: "Os setenta e quatro levitas, os cento e vinte e oito cantores de Asafe, os porteiros, os netinins nome por nome e os filhos dos servos de Salomão",
      subtitle: "Ed 2:40-58 • a folha inteira do serviço da casa, e o buraco que ela deixa à vista",
      text: "\"Os levitas: os filhos de Jesuá e Cadmiel... setenta e quatro\" (Ed 2:40). Setenta e quatro — contra mil duzentos e quarenta e sete sacerdotes de uma casa só; é este buraco que Esdras, oitenta anos depois, vai parar três dias junto ao rio Aava a tentar tapar (Ed 8:15). Os cantores são mais do que os levitas: \"os filhos de Asafe, cento e vinte e oito\" (v. 41), herdeiros dos que Davi separou \"para profetizarem com harpas\" (1Cr 25:1). E vêm os NETININS, os \"dados\" ao serviço, listados um a um por doze versículos: gente cujos nomes ninguém decorava.",
    },
  },

  // ---------------------------------------------------------------- Ed 3
  3: {
    anciao: {
      title: "Os velhos que viram a primeira casa e choraram em altas vozes — e os chefes dos pais que vieram ao sétimo mês e pagaram aos pedreiros",
      subtitle: "Ed 3:7,12 • o versículo mais difícil do livro, em cima da linha do fundamento",
      text: "\"Porém muitos dos sacerdotes, e levitas e chefes dos pais, já idosos, que viram a primeira casa, choraram em altas vozes quando à sua vista foram lançados os fundamentos desta casa\" (Ed 3:12). Faça-se a conta: quem viu o templo de Salomão de pé tem mais de setenta anos. O que lhes arranca o choro não é a ruína — é a MEDIDA: o risco no chão é menor do que a casa da lembrança, e só eles podem comparar. Ageu pôs a pergunta em palavras (Ag 2:3) e respondeu: \"A glória desta última casa será maior do que a da primeira\" (Ag 2:9).",
    },
    homem: {
      title: "O pedreiro da casa do SENHOR, o vigia que olhava os povos das terras, os sidônios e os tírios que desceram os cedros do Líbano, o filho de Henadade e o moço que jubilou sobre o fundamento",
      subtitle: "Ed 3:3,7,9,12 • as mãos da obra, o medo em volta dela e a alegria de quem não tinha memória",
      text: "\"E firmaram o altar sobre as suas bases, porque o terror estava sobre eles, por causa dos povos das terras\" (Ed 3:3): o primeiro homem em cena é um vigia, porque a obra se faz olhando por cima do ombro. Depois vêm os de fora, no mesmo contrato de Salomão — azeite aos sidônios e aos tírios \"para trazerem do Líbano madeira de cedro ao mar, para Jope\" (Ed 3:7; cf. 2Cr 2:16). E no dia do fundamento entra o homem que o quadro não pode perder: o novo, que nunca viu templo nenhum e por isso grita (v. 12). Não está errado; está sem memória.",
    },
    mulherComum: {
      title: "A mulher que armou a cabana de ramos na festa dos tabernáculos, no primeiro sétimo mês da volta",
      subtitle: "Ed 3:4 • a festa de gente sem casa que celebra justamente a vida em cabanas",
      text: "\"E celebraram a festa dos tabernáculos, como está escrito\" (Ed 3:4). A lei dizia por quê: \"Sete dias habitareis em tendas... Para que saibam as vossas gerações que eu fiz habitar os filhos de Israel em tendas\" (Lv 23:42-43). A ironia é boa demais para se perder: quem arma esta cabana ainda não tem casa de verdade, e passa sete dias numa cabana de ramos DE PROPÓSITO, para se lembrar de um êxodo antigo enquanto vive um novo. As mãos que cortam os ramos e cozinham os sete dias são, na vida de uma aldeia, sobretudo as dela.",
    },
    multidao: {
      title: "O povo ajuntado como um só homem em Jerusalém, e o som do júbilo que se ouvia de muito longe",
      subtitle: "Ed 3:1,11,13 • a praça do sétimo mês e o dia do fundamento",
      text: "\"Chegando, pois, o sétimo mês, e estando os filhos de Israel já nas cidades, ajuntou-se o povo, como um só homem, em Jerusalém\" (Ed 3:1). O capítulo anterior acabara de os espalhar, e a primeira coisa que fazem com o endereço novo é largá-lo e subir. O sétimo mês é o das trombetas e dos tabernáculos: remarcam o calendário antes de remarcar o terreno. E o capítulo não fecha numa imagem, fecha num SOM — \"não discernia o povo as vozes do júbilo de alegria das vozes do choro do povo\" (Ed 3:13). Deus recebe os dois na mesma oferta.",
    },
    patriarca: {
      title: "Jesuá e os sacerdotes que edificaram o altar antes de qualquer parede, o do holocausto contínuo e o que se apresentou vestido e com trombeta no dia do fundamento",
      subtitle: "Ed 3:2-6,10 • o culto que começa em cima de um alicerce que ainda não existe",
      text: "\"E levantou-se Jesuá, filho de Jozadaque, e seus irmãos, os sacerdotes... e edificaram o altar do Deus de Israel\" (Ed 3:2). A ordem das coisas é a lição do capítulo: primeiro o altar, depois a casa — e entre um e outro passa quase um ano. O versículo 6 diz a coisa mais honesta do livro: \"porém ainda não estavam postos os fundamentos do templo do SENHOR\". Culto de verdade em cima de um chão vazio, e com medo (v. 3). No dia dos alicerces ele aparece fardado e com metal na mão: \"já vestidos e com trombetas\" (Ed 3:10).",
    },
    servo: {
      title: "Os levitas de vinte anos para cima postos a dirigir a obra, Cadmiel e os seus, os filhos de Asafe com címbalos, o pedreiro do altar e o carpinteiro que recebeu os cedros em Jope",
      subtitle: "Ed 3:8-11 • quem toca a obra e quem faz o som do dia do fundamento",
      text: "\"constituíram os levitas da idade de vinte anos para cima, para que a dirigissem\" (Ed 3:8). Vinte anos é idade de recruta, e o levita aqui não é cantor de sacristia: é mestre de obras. Eram setenta e quatro ao todo (Ed 2:40), e organizaram-se \"como um só homem, para dirigirem os que faziam a obra\" (v. 9). No dia da primeira fiada, o mesmo grupo trocou a ferramenta pelo instrumento: \"os levitas, filhos de Asafe, com címbalos... conforme à instituição de Davi\" (v. 10) — a ordem de um rei morto havia quinhentos anos, guardada de cor no exílio.",
    },
  },

  // ---------------------------------------------------------------- Ed 4
  4: {
    anciao: {
      title: "O conselheiro da corte de Artaxerxes que buscou nas crônicas — e o velho de Judá que viu a obra cessar e ficou dezesseis anos olhando para as pedras",
      subtitle: "Ed 4:5,19,24 • os dois lados da mesa em que a obra foi parada",
      text: "Há dois velhos neste capítulo, em salas opostas. Um é o conselheiro persa, que vira o arquivo: \"buscaram e acharam, que de tempos antigos aquela cidade se levantou contra os reis\" (Ed 4:19) — e o arquivo não mentiu; a acusação vence porque diz a verdade sobre o passado para esconder a verdade sobre o presente. O outro é o ancião de Judá, que vê a obra parar e não tem a quem recorrer: \"Então cessou a obra da casa de Deus\" (Ed 4:24). Dezesseis anos numa linha só. É a ele que Ageu falará quando o silêncio se romper (Ag 1:4).",
    },
    homem: {
      title: "Os adversários de Judá e Benjamim, o povo da terra que debilitou as mãos, o conselheiro alugado, Bislão e Tabeel, Reum, o chanceler, e o correio que levou a resposta a Samaria",
      subtitle: "Ed 4:1-2,4-8,17,23 • quem se ofereceu, quem foi recusado e quem passou a escrever",
      text: "\"Deixai-nos edificar convosco, porque, como vós, buscaremos a vosso Deus\" (Ed 4:2). É a frase mais mansa do livro, e é verdadeira pela metade: esta gente foi mesmo trazida pela Assíria (2Rs 17:24), e o resultado da mistura ficou escrito sem rodeios — \"Assim temiam ao Senhor, mas também serviam a seus deuses\" (2Rs 17:33). Recusados de frente, mudam de arma três vezes em quatro versículos: debilitam as mãos (v. 4), alugam conselheiros (v. 5) e escrevem (v. 7-8). Neste capítulo, a arma que funciona é papel.",
    },
    multidao: {
      title: "Os nove povos que assinaram a carta — dinaítas, afarsaquitas, tarpelitas, afarsitas, arquevitas, babilônios, susanquitas, deavitas e elamitas",
      subtitle: "Ed 4:9-10 • o espelho torto da lista de Esdras 2",
      text: "\"os dinaítas, afarsaquitas, tarpelitas, afarsitas, arquevitas, babilônios, susanquitas, deavitas, elamitas\" (Ed 4:9). Nove povos numa linha só — e quem acabou de atravessar as setenta linhas do arrolamento de Esdras 2 reconhece a forma: é uma lista contra uma lista. O versículo seguinte diz de onde vieram, e é a ironia inteira: \"os outros povos, que o grande e afamado Asnapar transportou\" (v. 10). São deportados escrevendo contra deportados. O que os separa não é a dor: é que uns voltaram para edificar casa a um Deus só.",
    },
    patriarca: {
      title: "Jesuá, filho de Jozadaque, e os sacerdotes que recusaram a ajuda dos adversários",
      subtitle: "Ed 4:2-3 • o sumo sacerdote ao lado de Zorobabel na hora do não",
      text: "\"Não convém que nós e vós edifiquemos casa a nosso Deus; mas nós sozinhos a edificaremos ao Senhor Deus de Israel, como nos ordenou o rei Ciro\" (Ed 4:3). A recusa é dita por dois: o príncipe da casa de Davi e o sumo sacerdote da casa de Arão, lado a lado — é assim que este povo governa, sem rei e sem exército. E o fundamento do não não é gosto nem desprezo: é uma ordem escrita. O sacerdote sabe o que está em jogo, porque a mistura dos cultos foi o que arruinou o reino do norte. O preço vem no versículo seguinte, e é alto.",
    },
    rei: {
      title: "Artaxerxes, rei da Pérsia, e o Assuero em cujo reinado se escreveu a primeira acusação",
      subtitle: "Ed 4:6-7,17-22 • os tronos persas de que saiu a ordem de impedir a obra",
      text: "Este capítulo é um parêntese: para juntar num só lugar toda a oposição escrita contra Jerusalém, o autor cita cartas do tempo de Assuero (v. 6) e de Artaxerxes (v. 7), que reinaram muito depois de Dario, e só no versículo 24 volta ao fio da obra parada. O rei que responde não decide por convicção religiosa: decide por receita e por arquivo — tributos e pedágios (v. 20). Aí vem a ordem, e nela o descuido que salva a história: \"a fim de que não se edifique aquela cidade, até que eu dê uma ordem\" (Ed 4:21). A porta fica encostada.",
    },
    servo: {
      title: "Sinsai, o escrivão, que leu a carta em voz alta; o escriba da resposta do rei; e o pedreiro de Judá que largou a ferramenta e ficou de guarda ao canteiro abandonado",
      subtitle: "Ed 4:8-16,23-24 • quem escreve a carta e quem paga por ela",
      text: "Há duas espécies de servo aqui, e a distância entre elas é a história inteira. Um trabalha com tinta: \"Escreveram, pois, Reum, o chanceler, e Sinsai, o escrivão, uma carta contra Jerusalém\" (Ed 4:8), e a carta confessa o próprio motivo sem perceber — \"porquanto somos assalariados do palácio\" (v. 14): escrevem porque comem da mão dele. O outro trabalha com pedra, e é ele que apanha: \"os impediram à força e com violência\" (v. 23). Uma folha de papel derrubou o que nenhum exército tinha tentado derrubar.",
    },
  },

  // ---------------------------------------------------------------- Ed 5
  5: {
    anciao: {
      title: "Os anciãos dos judeus sobre quem estavam os olhos de Deus — e Sesbazar, o que pusera os fundamentos e a quem a carta dá nome ao rei",
      subtitle: "Ed 5:5,9-11,14-16 • os velhos que responderam a Tatenai e não pararam a obra",
      text: "\"Porém os olhos de Deus estavam sobre os anciãos dos judeus, e não os impediram\" (Ed 5:5). É a frase teológica do capítulo, e não vem com milagre nenhum: nenhum anjo, nenhuma voz — apenas um inspetor imperial que, por alguma razão que o texto atribui a Deus, não manda parar. E, perguntados, estes velhos não se apresentam por decreto, e sim por dono: \"Nós somos servos do Deus dos céus e da terra\" (v. 11). Depois contam a história inteira sem se pouparem, incluindo a parte que os incrimina (v. 12), e confessam o atraso: \"ainda não está acabada\" (v. 16).",
    },
    homem: {
      title: "Tatenai, governador dalém do rio, Setar-Bozenai e os afarsaquitas; o carpinteiro que punha a madeira nas paredes e o judeu de Judá que ouviu os profetas",
      subtitle: "Ed 5:3-4,6-10,17 • a inspeção que virou testemunho a favor",
      text: "\"Quem vos deu ordem para reedificardes esta casa, e restaurardes este muro?\" (Ed 5:3). E logo a segunda pergunta, que num império assusta mais do que a primeira: \"E quais são os nomes dos homens que construíram este edifício?\" (v. 4) — porque uma lista de nomes, entregue à autoridade errada, é uma lista de réus. Mas Tatenai não é Reum: não denuncia, relata. E o relatório acaba por ser o melhor testemunho que a obra recebeu — \"esta obra vai sendo feita com diligência, e se adianta em suas mãos\" (v. 8). E fecha pedindo arquivo, não tropa (v. 17).",
    },
    patriarca: {
      title: "Ageu e Zacarias, filho de Ido, e Jesuá, filho de Jozadaque — a palavra de Deus com boca, nome e pé no chão",
      subtitle: "Ed 5:1-2 • por que aqui não há voz do céu",
      text: "\"E os profetas Ageu e Zacarias, filho de Ido, profetizaram aos judeus que estavam em Judá\" (Ed 5:1). Dezesseis anos de mato entre as pedras não são quebrados por decreto, por exército nem por sinal no céu: são quebrados por duas bocas. Por isso, aqui, Deus não fala do alto — fala DELES, e o quadro mostra as figuras. Sabemos o que disseram: \"Subi ao monte, e trazei madeira, e edificai a casa\" (Ag 1:8) e \"Não por força nem por violência, mas sim pelo meu Espírito\" (Zc 4:6). E os dois não pregaram de fora do tapume: entraram no canteiro (Ed 5:2).",
    },
    servo: {
      title: "O escrivão que anotou os nomes dos edificadores, o que redigiu a carta de Tatenai a Dario, o pedreiro das grandes pedras e o que carregou os vasos para Jerusalém",
      subtitle: "Ed 5:4,7-8,10,14-16 • quem escreve o relatório e quem levanta a parede que ele descreve",
      text: "Duas mãos trabalham em paralelo. Uma segura o cálamo: \"para que te pudéssemos escrever os nomes dos homens que entre eles são os chefes\" (Ed 5:10), e depois redige a cópia selada que começa por \"Toda a paz ao rei Dario\" (v. 7). A outra segura a pedra, e é dela que a carta fala: \"a qual se edifica com grandes pedras, e a madeira já está sendo posta nas paredes\" (v. 8). O pedreiro deste versículo não sabe que está a ser descrito num documento oficial nem que a descrição o vai salvar — só está a assentar uma fiada.",
    },
  },

  // ---------------------------------------------------------------- Ed 6
  6: {
    anciao: {
      title: "Os anciãos dos judeus que iam edificando e prosperando pela profecia — o conselheiro da corte de Dario e o filho do cativeiro que buscou ao SENHOR",
      subtitle: "Ed 6:7-8,14,21 • os velhos a quem o rei entrega a obra e a mesa da páscoa",
      text: "O decreto de Dario faz o que nenhum outro documento do livro fizera: entrega a obra aos velhos de Judá pelo nome do ofício. \"que o governador dos judeus e os seus anciãos reedifiquem esta casa de Deus no seu lugar\" (Ed 6:7), e o versículo seguinte manda pagar a despesa com eles. Os mesmos homens que Tatenai interrogara passam a ser os destinatários da fazenda do rei. E o resumo reparte o crédito com honestidade rara: \"iam edificando e prosperando pela profecia\" e \"conforme ao decreto de Ciro e Dario\" (v. 14) — céu e chancelaria na mesma frase.",
    },
    homem: {
      title: "O oficial que achou o rolo em Acmeta, o tesoureiro da casa do rei, o correio do decreto, Tatenai e Setar-Bozenai obedecendo, e o estrangeiro que se apartou da imundícia dos gentios",
      subtitle: "Ed 6:1-2,8,13,21 • os que buscaram, os que pagaram e os que se sentaram à mesa",
      text: "O capítulo abre com um império a virar papéis por causa de uma obra de província (Ed 6:1). E não acham em Babilônia: \"E em Acmeta, no palácio, que está na província de Média, se achou um rolo\" (v. 2) — Ecbátana, a cidade de veraneio dos reis persas, e por isso o memorial estava lá. Depois do despacho, quem muda de lado é o próprio inspetor: Tatenai \"assim fizeram diligentemente\" (v. 13) — quem viera perguntar acaba a cumprir. E o último homem daqui não tem genealogia: é o de fora que \"se apartou da imundícia dos gentios\" (v. 21).",
    },
    mulherComum: {
      title: "A mulher dos filhos do cativeiro que comeu a páscoa na casa acabada — e a que se apartou da imundícia dos gentios da terra",
      subtitle: "Ed 6:19-21 • a mesa da noite de catorze de Abibe, no adro do templo novo",
      text: "\"E os filhos do cativeiro celebraram a páscoa no dia catorze do primeiro mês\" (Ed 6:19). A páscoa é, desde o Egito, festa de CASA e não de sacerdócio — o cordeiro é comido por família, e a lei manda que a criança pergunte. Quem prepara essa mesa e ensina os filhos é sobretudo esta mulher; e é a primeira vez em setenta anos que o faz com um templo de pé atrás de si. O versículo 21 alarga a mesa a quem não tinha papel mas se apartou. E a noite fecha com uma frase sobre alegria, não sobre pureza: \"porque o Senhor os tinha alegrado\" (v. 22).",
    },
    multidao: {
      title: "Os filhos do cativeiro que viram a casa acabada, fizeram a dedicação com alegria e celebraram os pães ázimos por sete dias",
      subtitle: "Ed 6:15-16,22 • o adro cheio diante da fachada nova, vinte e um anos depois do primeiro alicerce",
      text: "\"E acabou-se esta casa no terceiro dia do mês de Adar, no sexto ano do reinado do rei Dario\" (Ed 6:15). A data vem com dia, mês e ano porque este povo aprendeu a desconfiar de promessa sem calendário: entre o fundamento do capítulo 3 e esta manhã passaram-se vinte e um anos, dezesseis deles de obra parada. E no fecho a alegria tem sujeito: \"porque o Senhor os tinha alegrado... para lhes fortalecer as mãos na obra\" (v. 22) — as mesmas mãos que o capítulo 4 vira debilitadas (Ed 4:4). Nesta multidão ainda estão os velhos que choraram sobre o alicerce.",
    },
    patriarca: {
      title: "Os sacerdotes postos nas suas turmas, o que ofereceu os doze cabritos pelo pecado de todo o Israel, o que matou o cordeiro da páscoa e o que orou pela vida do rei",
      subtitle: "Ed 6:10,17-20 • o sacerdócio de volta ao seu posto, conforme ao livro de Moisés",
      text: "\"cem novilhos, duzentos carneiros, quatrocentos cordeiros, e doze cabritos por expiação do pecado de todo o Israel; segundo o número das tribos\" (Ed 6:17). Doze, e não dois — é o detalhe mais comovente do capítulo: quem voltou é o resto de Judá e Benjamim, mas o sacerdote expia pelas DOZE, por irmãos ausentes que talvez nunca voltem. Depois a casa recebe a sua ordem interna, \"conforme ao que está escrito no livro de Moisés\" (v. 18): as turmas que Davi sorteara (1Cr 24:7-8) voltam ao serviço setenta anos depois, guardadas de cor.",
    },
    rebanho: {
      title: "Os bezerros, carneiros e cordeiros da provisão de dia em dia, e os cem novilhos e duzentos carneiros da dedicação da casa",
      subtitle: "Ed 6:9,17 • o gado que o rei da Pérsia manda entregar à porta do templo",
      text: "\"E o que for necessário, como bezerros, carneiros, e cordeiros... dê-se-lhes, de dia em dia, para que não haja falta\" (Ed 6:9). Repare em quem paga: um imperador persa manda abastecer todos os dias o altar de um Deus que não é o seu, e \"para que não haja falta\" é frase de despenseiro, não de teólogo. É o mesmo tesouro de que saíra o salário dos conselheiros alugados contra a obra (Ed 4:5). Na dedicação a conta sobe a setecentas cabeças (v. 17) — fração dos vinte e dois mil bois de Salomão (2Cr 7:5), e o livro não esconde a diferença.",
    },
    rei: {
      title: "Dario, rei da Pérsia, que mandou buscar nos arquivos e baixou o decreto que fez a obra andar",
      subtitle: "Ed 6:1,6-12 • o trono de onde saiu a ordem que desfez dezesseis anos de embargo",
      text: "Dario não é convertido nem devoto; é um administrador que decidiu verificar. Achado o memorial de Ciro, cumpre-o à letra e vai além: manda o governador afastar-se (Ed 6:6), manda a obra prosseguir (v. 7), manda pagar \"da fazenda do rei... para que não interrompam a obra\" (v. 8). E põe sanção que não é decorativa (v. 11). O mais estranho vem no fim, quando um rei pagão invoca o Deus de Israel contra os próprios sucessores: \"O Deus, pois, que fez habitar ali o seu nome derrube a todos os reis... que estenderem a sua mão para mudar o decreto\" (v. 12).",
    },
    servo: {
      title: "O guarda dos arquivos de Babilônia, o escriba que leu o rolo de Acmeta e o do decreto de Dario, o despenseiro da provisão de dia em dia, o pedreiro das grandes pedras e o levita posto na sua divisão",
      subtitle: "Ed 6:1-5,9,13,18,20 • as mãos que procuram, leem, pesam, assentam e servem",
      text: "Este capítulo se resolve num arquivo empoeirado. O primeiro servo em cena é o que desce com o candeeiro e revista caixotes: \"buscaram nos arquivos, onde se guardavam os tesouros em babilônia\" (Ed 6:1); o segundo é o que lê em voz alta o que se achou, porque o rolo, ali, é o verdadeiro personagem. Depois o serviço muda de matéria: o despenseiro recebe \"trigo, sal, vinho e azeite\" da fazenda do rei (v. 9), e o pedreiro volta às fiadas. E na véspera da páscoa faz-se o que nenhum decreto persa podia mandar: \"todos estavam limpos\" (v. 20).",
    },
  },
};
