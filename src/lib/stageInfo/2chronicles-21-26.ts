// Fichas ESPECÍFICAS por (capítulo → papel) de 2 CRÔNICAS 21–26.
// Seis reinados encaixados uns nos outros como caixas de um mesmo desastre: o
// primogênito que se firma no trono matando os seis irmãos e recebe, único em
// toda a Escritura, uma CARTA ESCRITA DE ELIAS; o filho de um ano de reinado
// cuja mãe "era sua conselheira, para proceder impiamente"; a avó que destrói a
// descendência real e o bebê furtado para a câmara dos leitos; o sacerdote que
// "se animou" no sétimo ano e coroou um menino de sete anos com o testemunho na
// mão; o rei que devolveu cem talentos de prata e depois se prostrou diante dos
// deuses do povo que acabara de vencer; e o REI LAVRADOR, que cavou poços no
// deserto porque "era amigo da agricultura" e acabou leproso numa casa separada.
// Cada figurante anônimo da cena é alguém REAL daquele capítulo: o levita que
// leu a carta em voz alta, a ama que escondeu o menino, o homem do povo que
// lançou no cofre furado, o vinhateiro dos montes, o sacerdote que segurou o
// braço do rei leproso junto ao altar do incenso.
import type { StageInfo } from "@/lib/rpgStageInfo";

export const CHAPTER_ACTORS_21_26: Record<number, Record<string, StageInfo>> = {
  // ---------------------------------------------------------------- 2Cr 21
  21: {
    anciao: {
      title: "O sacerdote do enterro de Jeosafá, o guardião da lâmpada de Davi, o sacerdote de Libna e o médico da casa do rei",
      subtitle: "2Cr 21 • os homens de cabeça branca que enterram um rei bom, guardam a promessa e veem outro apodrecer por dentro",
      text: "O primeiro entra antes de qualquer maldade: o sacerdote que recolhe Jeosafá ao jazigo (2Cr 21:1). O segundo é o velho do santuário que continua acendendo o candeeiro enquanto o novo rei enche os montes de altos — a razão está em 21:7: \"o Senhor não quis destruir a casa de Davi, em atenção à aliança que tinha feito com Davi\". O terceiro é o sacerdote de Libna, cidade dada aos filhos de Arão (Js 21:13): quando até ela fecha as portas ao rei (21:10), o problema já não é político. O último é o médico da corte, diante de \"uma enfermidade incurável\" (21:18)."
    },
    cavaleiro: {
      title: "O capitão dos carros de Jeorão na saída noturna contra Edom",
      subtitle: "2Cr 21:9 • o oficial que rompeu o cerco de noite e ainda assim perdeu Edom",
      text: "\"Por isso Jeorão passou adiante com os seus príncipes, e todos os carros com ele; levantou-se de noite, e feriu aos edomeus, que o tinham cercado\" (2Cr 21:9). O quadro é de escape, não de vitória: o exército de Judá acordou cercado no planalto vermelho e abriu caminho no escuro para não ser desfeito ao amanhecer. Este homem conduz os carros que salvaram o rei — e o versículo seguinte lhe tira a glória: \"os edomitas se revoltaram contra o mando de Judá até ao dia de hoje\" (21:10). Edom estava sujeito desde Davi (2Sm 8:14); soltou-se aqui, e nunca mais voltou."
    },
    homem: {
      title: "Azarias, Jeiel, Zacarias, Asarias, Micael e Sefatias, os príncipes de Israel mortos com eles, e os edomeus, os filisteus e os árabes que vieram depois",
      subtitle: "2Cr 21 • os seis irmãos nomeados dois versículos antes de serem apagados, e os inimigos que o SENHOR despertou",
      text: "O capítulo dá a lista por extenso justamente porque ela vai durar dois versículos: \"E teve irmãos, filhos de Jeosafá: Azarias, Jeiel, Zacarias, Asarias, Micael e Sefatias\" (2Cr 21:2). O pai os deixara bem postos (21:3), e o mais velho, que recebera o reino inteiro, não suportou: \"matou a todos os seus irmãos à espada\" (21:4). A carta de Elias dirá o que ninguém em Jerusalém teve coragem de dizer: eram \"melhores do que tu\" (21:13). Depois entram os inimigos que o texto não atribui ao acaso (21:16). No fim, dois coveiros abrem cova na cidade de Davi, \"porém não nos sepulcros dos reis\" (21:20)."
    },
    mulherComum: {
      title: "A filha de Acabe, mulher de Jeorão, e as mulheres do rei levadas cativas do arraial",
      subtitle: "2Cr 21 • o casamento que trouxe o Norte para dentro de Judá, e as esposas arrastadas pelos árabes",
      text: "A frase que explica o reinado inteiro é uma frase de casamento: \"E andou no caminho dos reis de Israel, como fazia a casa de Acabe; porque tinha a filha de Acabe por mulher\" (2Cr 21:6). Atalia entra na casa de Davi por aliança de família — costurada pelo próprio Jeosafá (2Cr 18:1) — e vai custar, no capítulo 22, quase toda a linhagem da promessa. Ao lado dela, as mulheres que não decidiram nada e pagaram tudo: filisteus e árabes levam \"a seus filhos e a suas mulheres\" (21:17), como Elias anunciara (21:14). O rei que matou a família para reinar sozinho terminou sozinho."
    },
    rei: {
      title: "Jeosafá recolhido ao jazigo, Jeorão firmado no trono, e o rei que Edom constituiu para si",
      subtitle: "2Cr 21 • três coroas num capítulo: a que se apaga, a que mata, e a que se levanta contra Judá",
      text: "O capítulo abre com um enterro e uma posse no mesmo versículo: \"Depois Jeosafá dormiu com seus pais... e Jeorão, seu filho, reinou em seu lugar\" (2Cr 21:1). O herdeiro tem trinta e dois anos, reina oito (21:5) e faz da primeira hora de poder uma chacina de irmãos (21:4). O terceiro trono nasce da revolta: \"se revoltaram os edomitas contra o mando de Judá, e constituíram para si um rei\" (21:8) — a primeira vez desde Davi, e o cumprimento tardio de Gn 27:40. O fim é o mais duro do livro: dois anos de doença, nenhum aroma queimado (21:19) e um epitáfio — \"e foi sem deixar de si saudades\" (21:20)."
    },
    servo: {
      title: "O levita que leu em voz alta o escrito de Elias, os moços do trono e do leito, e Jeoacaz, o mais moço dos filhos do rei",
      subtitle: "2Cr 21 • quem serve num palácio onde a carta do profeta é a única voz honesta",
      text: "O criado principal desta cena é o que ninguém espera: o homem que abriu o rolo diante do rei e leu em voz alta a única palavra escrita de Elias que a Escritura guardou — \"Então lhe veio um escrito da parte de Elias, o profeta\" (2Cr 21:12). Elias não aparece; o que chegou de Israel foi papel, e o papel disse tudo: \"mataste a teus irmãos da casa de teu pai, melhores do que tu\" (21:13). Outro troca os panos do leito por dois anos (21:19). E há o menino poupado no saque, \"Jeoacaz, o mais moço de seus filhos\" (21:17) — a casa de Davi passa por um fio, e passa pelo caçula."
    }
  },

  // ---------------------------------------------------------------- 2Cr 22
  22: {
    anciao: {
      title: "O ancião de Jerusalém que aclamou o filho mais moço por falta de outro",
      subtitle: "2Cr 22:1 • a cabeça branca que faz rei o caçula porque a tropa matou todos os mais velhos",
      text: "\"E os moradores de Jerusalém, em lugar de Jeorão, fizeram rei a Acazias, seu filho mais moço, porque a tropa, que viera com os árabes ao arraial, tinha matado a todos os mais velhos\" (2Cr 22:1). Este é o homem que preside a uma aclamação feita por falta de candidatos: não há assembleia festiva, não há profeta ungindo, não há escolha — há um resto do saque do capítulo anterior (21:17). E o que o texto acrescenta é o retrato de uma corte aconselhada pelo Norte: \"eles eram seus conselheiros... para a sua perdição\" (22:4). Anciãos existem para lembrar a Lei; estes ficaram calados."
    },
    cavaleiro: {
      title: "O cavaleiro sírio de Hazael que feriu Jorão em Ramote de Gileade",
      subtitle: "2Cr 22:5 • a lança da Síria que abriu a ferida por onde entrou o juízo",
      text: "\"foi com Jorão, filho de Acabe, rei de Israel, à peleja contra Hazael, rei da Síria, junto a Ramote de Gileade; e os sírios feriram a Jorão\" (2Cr 22:5). Ramote é chão marcado: foi ali que Acabe, pai deste Jorão, morreu com Jeosafá ao lado (2Cr 18:33-34) — e agora o filho de Acabe e o neto de Jeosafá repetem a mesma aliança e a mesma estrada. O golpe deste cavaleiro não mata ninguém em cena; apenas manda o rei ferido para Jizreel, e é a visita ao ferido que põe Acazias na frente de Jeú. A lança de um soldado anônimo faz aqui o trabalho de um relógio."
    },
    homem: {
      title: "Os conselheiros da casa de Acabe, os príncipes de Judá e os filhos dos irmãos de Acazias mortos por Jeú, e o algoz que Atalia mandou",
      subtitle: "2Cr 22 • os homens que aconselharam para a perdição, os que morreram no juízo e o que degolou a descendência real",
      text: "Primeiro estão os conselheiros: \"porque eles eram seus conselheiros depois da morte de seu pai, para a sua perdição\" (2Cr 22:4). Um rei de um ano governado por gente do Norte, e o texto diz quem os pôs ali (22:3). Depois vêm os que caem: \"achou os príncipes de Judá e os filhos dos irmãos de Acazias, que serviam a Acazias, e os matou\" (22:8) — a corte de Jerusalém varrida numa estrada de Israel, por ter ido servir onde não devia. E entra o algoz da rainha-mãe: \"levantou-se e destruiu toda a descendência real da casa de Judá\" (22:10). Conseguiu-o uma avó dentro do palácio."
    },
    mulherComum: {
      title: "Atalia, filha de Onri; Jeosabeate, filha do rei; e a ama que segurou o menino no colo",
      subtitle: "2Cr 22 • a mulher que destruiu a semente real e as duas que salvaram a promessa numa noite",
      text: "\"era o nome de sua mãe Atalia, filha de Onri\" (2Cr 22:2), e o versículo seguinte diz o resto: \"porque sua mãe era sua conselheira, para proceder impiamente\" (22:3). Morto o filho, ela faz o que a Escritura não registra de mais ninguém em Judá: \"destruiu toda a descendência real da casa de Judá\" (22:10). Contra isso levanta-se Jeosabeate, \"filha do rei\", que furta Joás dentre os que matavam e o esconde na câmara dos leitos (22:11) — e era \"mulher do sacerdote Joiada\", o que explica como um bebê sumiu no templo. A terceira é a ama, sem nome, que o manteve calado e vivo seis anos (22:12)."
    },
    multidao: {
      title: "Os moradores de Jerusalém que fizeram rei a Acazias",
      subtitle: "2Cr 22:1 • a cidade que aclamou o único filho que os árabes não levaram",
      text: "\"E os moradores de Jerusalém, em lugar de Jeorão, fizeram rei a Acazias, seu filho mais moço, porque a tropa, que viera com os árabes ao arraial, tinha matado a todos os mais velhos\" (2Cr 22:1). É a mesma cidade que o pai dele \"fez com que se corrompesse\" (21:11), e que agora se ajunta à porta para levantar um rei porque não sobrou outro. A aclamação é legítima e trágica: o povo faz o que lhe compete e o resultado dura doze meses. Passarão seis anos até que essa multidão torne a se ajuntar num pátio — e daquela vez será para bater palmas por um menino de sete anos (2Cr 23:11-13)."
    },
    rei: {
      title: "Acazias de Judá, Jorão de Israel, Hazael da Síria, Jeú filho de Ninsi — e o menino Joás",
      subtitle: "2Cr 22 • quatro coroas na mesma estrada de Jizreel, e a quinta escondida num quarto",
      text: "Acazias reina um ano (2Cr 22:2) e o gasta inteiro nos conselhos da casa de Acabe. Vai com Jorão contra Hazael em Ramote (22:5), desce a Jizreel para ver o ferido, e o Cronista dá ao passeio um nome teológico: \"Foi, pois, da vontade de Deus, que Acazias, para sua ruína, visitasse Jorão\" (22:7). Na estrada está Jeú, ungido \"para desarraigar a casa de Acabe\" (22:7), cumprindo o dito a Elias em Horebe. Acazias é achado escondido em Samaria e morto — e sepultado assim mesmo: \"Filho é de Jeosafá, que buscou ao Senhor com todo o seu coração\" (22:9). Um bisavô fiel comprou-lhe uma sepultura."
    },
    servo: {
      title: "Os moços do palácio, o servo do leito de Jorão em Jizreel, e os filhos do rei aos quais matavam",
      subtitle: "2Cr 22 • quem serve numa casa onde a ordem do dia é degolar os netos",
      text: "Servir nesta corte é servir a dois senhores: o trono está em Jerusalém, mas as ordens vêm da casa de Acabe (2Cr 22:3-4). Um destes criados passa o capítulo em Jizreel, trocando os panos das feridas do rei do Norte (22:6), e é ele quem abre a porta para a visita que arruinou o rei de Judá. Outros são os moços do ídolo que Atalia instalara no palácio. E há, no quadro mais escuro do livro, as próprias crianças: o texto chama-as, sem rodeio, \"os filhos do rei, aos quais matavam\" (22:11). De todos escapa um, tirado dali no colo — e por causa desse um há, mil anos depois, a genealogia de Mt 1:8-9."
    }
  },

  // ---------------------------------------------------------------- 2Cr 23
  23: {
    anciao: {
      title: "Joiada, o sacerdote que se animou, e os chefes dos pais de Israel ajuntados de todas as cidades de Judá",
      subtitle: "2Cr 23:1-2 • os velhos que passaram seis anos calados e no sétimo ano moveram um país",
      text: "\"Porém no sétimo ano Joiada se animou\" (2Cr 23:1) — o verbo é esse, e é o eixo do capítulo. O sacerdote que escondera o menino toma em aliança cinco chefes de cem e manda percorrer a terra: eles ajuntam \"os levitas de todas as cidades de Judá e os chefes dos pais de Israel\" (23:2). É diante deles, e não de um exército, que Joiada mostra a criança: \"Eis que o filho do rei reinará, como o Senhor falou a respeito dos filhos de Davi\" (23:3). O argumento não é dinástico, é de palavra dada — a promessa de 2Sm 7:16 posta em pé diante de gente que a sabia de cor."
    },
    cavaleiro: {
      title: "Os chefes de cem da aliança: Azarias filho de Jeroão, Ismael filho de Joanã, Azarias filho de Obede, Maaséias filho de Adaías e Elisafate filho de Zicri",
      subtitle: "2Cr 23 • os cinco centuriões que armaram o levante e depois tiraram Atalia das fileiras",
      text: "O Cronista dá os cinco nomes com os patronímicos, porque num golpe de estado se sabe quem estava dentro: \"tomou consigo em aliança os chefes de cem, a Azarias, filho de Jeroão, a Ismael, filho de Joanã, a Azarias, filho de Obede, a Maaséias, filho de Adaías, e a Elisafate, filho de Zicri\" (2Cr 23:1). São oficiais de tropa, e Joiada os arma com o arsenal do templo: \"as lanças, os escudos e as rodelas que foram do rei Davi\" (23:9). Executam a única ordem de sangue do dia sem a executar no lugar errado — \"Não a mateis na casa do Senhor\" (23:14) — e conduzem o menino ao palácio (23:20)."
    },
    homem: {
      title: "Os chefes de cem vindos de Judá, os homens do povo em guarda diante do SENHOR, e os que derrubaram a casa de Baal",
      subtitle: "2Cr 23 • quem toma posto sem entrar no santuário, e quem quebra o templo do outro lado da cidade",
      text: "A ordem de serviço de Joiada tem uma linha que ninguém cruza: \"ninguém entre na casa do Senhor, senão os sacerdotes e os levitas que ministram... mas todo o povo fará a guarda diante do Senhor\" (2Cr 23:6). Estes homens são os de fora dessa linha: gente comum, armada, plantada nos pátios e nas portas (23:5), cumprindo o dia inteiro uma disciplina que num levante é a primeira coisa a se perder. Depois da coroação atravessam a cidade para o único ato de demolição: \"todo o povo entrou na casa de Baal, e a derrubaram\" (23:17). A aliança de 23:16 tem consequência de picareta."
    },
    mulherComum: {
      title: "Atalia, que rasgou os seus vestidos e clamou: Traição, traição!",
      subtitle: "2Cr 23:12-15 • os últimos minutos de seis anos de reinado sobre a casa de Davi",
      text: "\"Ouvindo, pois, Atalia a voz do povo que concorria e louvava o rei, veio ao povo, à casa do Senhor\" (2Cr 23:12) — vem sozinha, sem guarda, porque não imagina o que vai ver. E vê o impossível: \"o rei estava junto à coluna, à entrada\", com as trombetas e \"todo o povo da terra estava alegre\"; \"então Atalia rasgou os seus vestidos, e clamou: Traição, traição!\" (23:13). A palavra é o retrato dela: quem destruiu a descendência real (22:10) chama de traição a volta do herdeiro. Joiada não deixa manchar o santuário (23:14), e ela sai pela porta dos cavalos, onde a matam (23:15)."
    },
    multidao: {
      title: "Toda a congregação que fez aliança com o rei na casa de Deus e todo o povo da terra que tocava as trombetas",
      subtitle: "2Cr 23 • o povo que enche os pátios, jura o pacto, aclama o menino e sai em paz",
      text: "É a assembleia que Joiada ajuntou de todas as cidades de Judá (2Cr 23:2) e que, dentro do templo, se compromete antes de tudo: \"E toda aquela congregação fez aliança com o rei na casa de Deus\" (23:3). Recebe posto e disciplina — \"todo o povo fará a guarda diante do Senhor\" (23:6) — e no instante da coroação irrompe no grito mais curto do livro: \"e o fizeram rei; e Joiada e seus filhos o ungiram, e disseram: Viva o rei!\" (23:11). Depois vem a segunda aliança, entre os três lados (23:16). E o capítulo fecha: \"a cidade ficou em paz\" (23:21)."
    },
    rei: {
      title: "Joás, o filho do rei tirado para fora com a coroa e o testemunho",
      subtitle: "2Cr 23:11 • sete anos de idade, seis deles escondido, e um dia inteiro em pé diante de todos",
      text: "\"Então tiraram para fora ao filho do rei, e lhe puseram a coroa; deram-lhe o testemunho, e o fizeram rei\" (2Cr 23:11). A criança que sai daquela porta passou seis anos escondida na casa de Deus (22:12) e não conhece outra casa; o mundo dela cabia num quarto, e agora está no eixo de um pátio cheio. Recebe duas coisas, e a ordem importa: a coroa e o TESTEMUNHO — o documento da aliança —, como a lei mandava (Dt 17:18-19). Depois é levado do templo ao palácio, e não o contrário (23:20). Enquanto houver quem lhe leia aquele rolo, o reinado será bom (2Cr 24:2)."
    },
    servo: {
      title: "Os levitas vindos de todas as cidades, os guardas das três portas, os porteiros, os cantores e o sacerdote do holocausto",
      subtitle: "2Cr 23 • quem larga a cidade pequena para fazer turno num golpe de estado — e depois recompõe o culto",
      text: "São os homens que Joiada mandou buscar por Judá inteira (2Cr 23:2) e que ele reparte em três turmas com precisão de quem preparou aquilo por seis anos (23:4-5). O truque do dia está numa linha administrativa: \"o sacerdote Joiada não tinha despedido as turmas\" (23:8) — dobrou o efetivo sem que ninguém notasse, apenas não mandando embora a guarda que saía. Em volta do menino ficam os que podem: \"os levitas cercarão o rei de todos os lados\" (23:7). Passado o dia, os mesmos voltam ao ofício: os cantores (23:13), os holocaustos \"com alegria e com canto\" (23:18), os porteiros (23:19)."
    }
  },

  // ---------------------------------------------------------------- 2Cr 24
  24: {
    anciao: {
      title: "Joiada, o chefe; os sacerdotes convocados pelo rei; e o oficial do sumo sacerdote que esvaziava o cofre",
      subtitle: "2Cr 24 • o velho que criou o rei, os sacerdotes cobrados pela demora e o homem de confiança da contagem",
      text: "O capítulo pende de um homem: \"E fez Joás o que era reto aos olhos do Senhor, todos os dias do sacerdote Joiada\" (2Cr 24:2). É Joiada quem lhe dá casa (24:3) e é a Joiada que o rei adulto chama para cobrar: \"Por que não requereste dos levitas... o tributo que Moisés, servo do Senhor, ordenou?\" (24:6). Ao lado dele estão os sacerdotes da primeira convocação (24:5) e o oficial do sumo sacerdote, que abre o cofre junto com o escrivão do rei — duas casas conferindo o mesmo dinheiro (24:11). Morto o velho (24:15-16), a estrutura moral do reinado morre: vêm os príncipes, \"e o rei os ouviu\" (24:17)."
    },
    cavaleiro: {
      title: "O capitão do exército da Síria que subiu contra Jerusalém com poucos homens",
      subtitle: "2Cr 24:23-24 • o oficial de Damasco a quem o SENHOR entregou um exército mui numeroso",
      text: "\"decorrido um ano, o exército da Síria subiu contra ele; e vieram a Judá e a Jerusalém, e destruíram dentre o povo a todos os seus príncipes\" (2Cr 24:23). O ano contado é o ano depois do apedrejamento no pátio, e o texto não deixa a coincidência sem explicação: \"ainda que o exército dos sírios viera com poucos homens, contudo o Senhor entregou na sua mão um exército mui numeroso\" (24:24). É o inverso de Gideão e dos trezentos (Jz 7:7): ali Deus reduziu os seus para mostrar quem vencia. Os príncipes destruídos são os mesmos que se prostraram em 24:17."
    },
    homem: {
      title: "O arauto do pregão, os príncipes que lançaram no cofre, os pedreiros, carpinteiros e ferreiros da obra — e os que apedrejaram Zacarias no pátio",
      subtitle: "2Cr 24 • os mesmos homens de Judá nas duas metades do capítulo: alegres diante do cofre, e depois com pedras na mão",
      text: "Na primeira metade é o país inteiro trabalhando: o arauto do pregão (2Cr 24:9), os príncipes e o povo diante da caixa — \"se alegraram, e o trouxeram e o lançaram no cofre, até que ficou cheio\" (24:10) — e o canteiro de obras dentro do templo, com \"pedreiros e carpinteiros... ferreiros e serralheiros\" (24:12), até restaurarem a casa \"no seu estado\" (24:13). Na segunda metade os mesmos homens mudam de mão: lisonjeiam o rei (24:17-18), não dão ouvidos aos profetas (24:19) e apedrejam Zacarias \"no pátio da casa do Senhor\" (24:21). Restauraram as paredes e apedrejaram um profeta dentro delas."
    },
    mulherComum: {
      title: "Zíbia de Berseba, mãe do rei, e as duas mulheres que Joiada tomou para Joás",
      subtitle: "2Cr 24:1-3 • as mulheres da casa do menino que cresceu no templo",
      text: "\"Tinha Joás sete anos de idade quando começou a reinar... e era o nome da sua mãe Zíbia, de Berseba\" (2Cr 24:1). O Cronista dá o nome e a cidade da rainha-mãe como faz com todos os reis de Judá, e aqui a linha vale duplo: ela é do extremo sul, e não da casa de Acabe — depois de Atalia, o texto faz questão de dizer de onde veio a mãe do herdeiro. As outras duas são as esposas que o sacerdote escolheu: \"E tomou-lhe Joiada duas mulheres, e gerou filhos e filhas\" (24:3). Depois de a avó ter destruído a descendência real (22:10), a lâmpada de Davi torna a arder porque um velho tratou de o casar."
    },
    multidao: {
      title: "O povo de Judá que ouviu o pregão, lançou no cofre com alegria e enterrou Joiada",
      subtitle: "2Cr 24 • a multidão que resolveu num dia o que vinte e três anos de ordens não resolveram",
      text: "Este povo aparece três vezes, e as três valem a pena. Ouve o edital do tributo de Moisés lido em praça pública, oito séculos depois de ordenado no deserto (2Cr 24:9). Responde com uma alegria que o texto registra sem economia: \"se alegraram, e o trouxeram e o lançaram no cofre, até que ficou cheio\" (24:10) — o que anos de cobrança pelas cidades não conseguiram (24:5), uma caixa à porta resolveu. E enterra o sacerdote com honra de rei (24:16). Depois desse enterro, o mesmo povo deixa a casa do SENHOR (24:18): a devoção de uma multidão pode durar o tempo de vida de quem a conduzia."
    },
    patriarca: {
      title: "Os profetas enviados para reconduzir Judá — e Zacarias, filho do sacerdote Joiada",
      subtitle: "2Cr 24:19-22 • as vozes que Deus mandou e a que foi apedrejada no pátio da sua própria casa",
      text: "\"Porém enviou profetas entre eles, para os reconduzir ao Senhor, os quais protestaram contra eles; mas eles não deram ouvidos\" (2Cr 24:19). Deus não abandona sem falar. O último enviado é o mais próximo: \"o Espírito de Deus revestiu a Zacarias, filho do sacerdote Joiada... Porque deixastes ao Senhor, também ele vos deixará\" (24:20). É o filho do homem que criou o rei, e a resposta é a ingratidão mais nua da Escritura: \"matou-lhe o filho, o qual, morrendo, disse: O Senhor o verá, e o requererá\" (24:22) — conta que o próprio Senhor fecharia em Mt 23:35."
    },
    rei: {
      title: "Joás, reto todos os dias do sacerdote Joiada — e Amazias, seu filho, que reinou em seu lugar",
      subtitle: "2Cr 24 • quarenta anos de reinado divididos ao meio por um enterro",
      text: "\"E fez Joás o que era reto aos olhos do Senhor, todos os dias do sacerdote Joiada\" (2Cr 24:2): a ressalva é o capítulo inteiro. Enquanto o velho vive, o rei renova a casa do SENHOR (24:4), cobra os levitas (24:6), inventa o cofre à porta (24:8) e vê o templo restaurado (24:13). Morto Joiada, tudo desaba num versículo: \"vieram os príncipes de Judá e prostraram-se perante o rei; e o rei os ouviu\" (24:17). Manda apedrejar o filho do seu benfeitor (24:21), é ferido pela Síria e morre nas mãos dos seus, sepultado \"porém não nos sepulcros dos reis\" (24:25)."
    },
    servo: {
      title: "Os levitas que não se apressaram, os que levavam o cofre de dia em dia — e Zabade e Jeozabade, que feriram o rei na cama",
      subtitle: "2Cr 24 • quem carrega a caixa do dinheiro e quem carrega a espada no fim",
      text: "Começam mal: mandados levantar dinheiro pelas cidades, \"Porém os levitas não se apressaram\" (2Cr 24:5) — quatro palavras que custaram anos de casa arruinada. Depois de o cofre resolver o problema, são eles a rotina que faz a obra andar: o escrivão do rei e o oficial do sumo sacerdote esvaziam a caixa e a repõem, \"assim faziam de dia em dia\" (24:11). Guardam também os utensílios feitos do resto (24:14). No fim, porém, servos da casa do rei aparecem do outro lado da lâmina, nomeados com as mães: \"Zabade, filho de Simeate, a amonita, e Jeozabade, filho de Sinrite, a moabita\" (24:26)."
    }
  },

  // ---------------------------------------------------------------- 2Cr 25
  25: {
    anciao: {
      title: "O sacerdote do livro de Moisés na corte de Amazias, Obede-Edom o guarda do tesouro, e o sacerdote do sepultamento do rei",
      subtitle: "2Cr 25 • os homens que lhe abriram a Lei, os que guardaram o ouro e os que o enterraram em Jerusalém",
      text: "O primeiro abre o rolo na sala da lei e mostra ao rei o versículo que salvou duas crianças: \"fez segundo está escrito na lei, no livro de Moisés... cada um morrerá pelo seu pecado\" (2Cr 25:4; a lei é Dt 24:16). É o melhor momento do reinado, e é feito com a Escritura aberta na mesa. O segundo é Obede-Edom, que guarda o tesouro quando Jeoás de Israel arromba Jerusalém (25:24) — a casa levítica dos porteiros que desde Davi respondia pelas câmaras (1Cr 26:15). O terceiro é o sacerdote do enterro, depois de Laquis (25:28). Três velhos e três funções: a lei, o tesouro e a cova."
    },
    cavaleiro: {
      title: "O cavaleiro de Judá em Bete-Semes",
      subtitle: "2Cr 25:21-22 • o soldado montado que viu o exército inteiro fugir para as suas tendas",
      text: "\"E Jeoás, rei de Israel, subiu; e ele e Amazias, rei de Judá, viram-se face a face em Bete-Semes, que está em Judá\" (2Cr 25:21) — o encontro que o próprio Amazias pedira por escrito (25:17). Este cavaleiro é da tropa que sobrou depois de despedidos os cem mil de Efraim (25:10), e está no campo pela decisão mais soberba do reinado, tomada contra o aviso de Jeoás: \"elevou-se o teu coração, para te gloriares; agora, pois, fica em tua casa\" (25:19). O resultado: \"E Judá foi ferido diante de Israel; e fugiu cada um para a sua tenda\" (25:22). Perdeu dentro de casa."
    },
    homem: {
      title: "Os trezentos mil escolhidos de Judá e Benjamim, os cem mil valentes de Efraim que voltaram ardendo em ira, e os filhos de Seir lançados do cimo da rocha",
      subtitle: "2Cr 25 • os homens comprados a peso de prata, os que saquearam as cidades no caminho de casa e os que se despedaçaram",
      text: "Primeiro é a resenha: \"achou deles trezentos mil escolhidos que podiam sair à guerra, e manejar lança e escudo\" (2Cr 25:5). Depois a compra — \"cem mil homens valentes, por cem talentos de prata\" (25:6) — e a devolução: despedidos por ordem do homem de Deus, \"voltaram para as suas casas ardendo em ira\" (25:10) e cobraram a conta sozinhos, ferindo três mil no caminho (25:13). Do outro lado, os filhos de Seir: dez mil no Vale do Sal e outros dez mil lançados do alto da rocha, \"e todos se despedaçaram\" (25:12) — o povo das \"fendas das rochas\" de Obadias 3."
    },
    mulherComum: {
      title: "Joadã de Jerusalém, mãe do rei, e as mulheres das cidades de Judá saqueadas por Efraim",
      subtitle: "2Cr 25 • a rainha-mãe da cidade e as que pagaram por cem talentos de prata mal gastos",
      text: "\"Era Amazias da idade de vinte e cinco anos, quando começou a reinar... e era o nome de sua mãe Joadã, de Jerusalém\" (2Cr 25:1). Ao lado dela, sem nome e sem fala, estão as mulheres das cidades da fronteira norte — as do trecho \"desde Samaria, até Bete-Horom\" (25:13) — sobre quem caiu a ira dos cem mil despedidos. O rei fez a coisa certa ao mandar embora um exército com que o SENHOR não estava (25:7-10), mas fizera antes a coisa errada ao contratá-lo, e a conta veio para três mil mortos. Obediência tardia ainda é obediência, e ainda assim há estrago que não volta atrás."
    },
    patriarca: {
      title: "O homem de Deus dos cem talentos e o profeta calado diante dos deuses de Seir",
      subtitle: "2Cr 25:7-9 e 25:15-16 • as duas vozes mandadas a Amazias, uma ouvida e outra mandada calar",
      text: "O primeiro chega sem ser chamado, ao campo do recenseamento: \"não deixes ir contigo o exército de Israel; porque o Senhor não é com Israel\" (2Cr 25:7). A objeção do rei é uma calculadora — \"Que se fará, pois, dos cem talentos de prata...?\" (25:9) —, e a resposta resume toda a economia da fé: \"Mais tem o Senhor que te dar do que isso\" (25:9). O segundo chega depois da vitória, com o vencedor de joelhos diante dos ídolos dos vencidos: \"Por que buscaste deuses deste povo, os quais não livraram o seu próprio povo da tua mão?\" (25:15). O rei manda calar, e o profeta cala — com uma sentença (25:16)."
    },
    rebanho: {
      title: "Os animais do campo que passaram e pisaram o cardo",
      subtitle: "2Cr 25:18 • o gado solto da parábola do cardo e do cedro do Líbano",
      text: "São a única figura viva da resposta de Jeoás ao desafio de Amazias: \"O cardo que estava no Líbano mandou dizer ao cedro... porém os animais do campo, que estavam no Líbano passaram e pisaram o cardo\" (2Cr 25:18). O golpe da parábola está aí: o cardo não é derrubado pelo cedro, nem numa disputa entre iguais — é pisado sem querer por um bando de bichos que passava. Não há batalha nenhuma, só desatenção. É a fábula de Jotão em Siquém outra vez (Jz 9:8-15): quem se mede acima do seu tamanho não é vencido, é atropelado. E o cardo foi pisado em Bete-Semes (25:20-22)."
    },
    rei: {
      title: "Amazias de Judá, reto porém não com inteireza de coração, e Jeoás de Israel, que lhe respondeu com uma parábola",
      subtitle: "2Cr 25 • o rei que devolveu cem talentos e depois adorou os deuses de quem venceu",
      text: "\"E fez o que era reto aos olhos do Senhor, porém não com inteireza de coração\" (2Cr 25:2) — e o capítulo passa vinte e oito versículos mostrando o que a ressalva quer dizer. Executa os assassinos do pai, mas poupa os filhos deles conforme a lei (25:3-4). Despede os mercenários e vence (25:10-11). E logo faz a coisa mais absurda do livro: traz \"os deuses dos filhos de Seir, tomou-os por seus deuses, e prostrou-se diante deles\" (25:14). Envaidecido, desafia o Norte (25:17) e não ouve o conselho: \"fica em tua casa\" (25:19). Acaba como o pai: muro arrombado, conspiração, Laquis (25:23-28)."
    },
    servo: {
      title: "Os moços da corte, os filhos de Zabade e de Jeozabade poupados pela lei, e o refém levado para Samaria",
      subtitle: "2Cr 25 • quem serve a um rei correto pela metade, e quem foi salvo justamente pela metade correta",
      text: "Os primeiros são as crianças que o capítulo não deixa morrer. O rei mandou matar os servos que feriram o pai na cama, \"Porém não matou os filhos deles; mas fez segundo está escrito na lei, no livro de Moisés\" (2Cr 25:4). Num tempo em que a vingança dinástica varria casas inteiras, dois meninos amanheceram vivos porque um rei foi ler antes de decidir. Depois vêm os criados do pátio dos ídolos de Seir (25:14) e os que saem amarrados na bagagem de Israel: \"e os tesouros da casa do rei, e os reféns\" (25:24). Começou salvando pela lei; termina entregando reféns pela soberba."
    }
  },

  // ---------------------------------------------------------------- 2Cr 26
  26: {
    anciao: {
      title: "Azarias, o sumo sacerdote, e os oitenta sacerdotes valentes que resistiram ao rei junto ao altar do incenso",
      subtitle: "2Cr 26:17-20 • os homens que entraram atrás do rei no santo lugar e lhe disseram na cara que não era o lugar dele",
      text: "\"Porém o sacerdote Azarias entrou após ele, e com ele oitenta sacerdotes do Senhor, homens valentes\" (2Cr 26:17). O adjetivo é do texto e não é enfeite: é preciso valentia para barrar, dentro do templo, um rei de cinquenta anos de reinado. A frase não deixa margem: \"A ti, Uzias, não compete queimar incenso perante o Senhor, mas aos sacerdotes, filhos de Arão... sai do santuário\" (26:18) — a lei é a de depois de Corá (Nm 16:40). E foi diante deles que \"a lepra lhe saiu à testa\" (26:19). São também eles que, anos depois, o enterram fora do jazigo: \"porque disseram: Leproso é\" (26:23)."
    },
    cavaleiro: {
      title: "Hananias, um dos capitàes do rei, sob cuja direção saía o exército em tropas",
      subtitle: "2Cr 26:11 • o oficial que comandava os trezentos e sete mil e quinhentos de Uzias",
      text: "\"Tinha também Uzias um exército de homens destros na guerra... segundo o número da resenha feita por mão de Jeiel, o escrivão, e Maaséias, oficial, sob a direção de Hananias, um dos capitàes do rei\" (2Cr 26:11). Três nomes numa linha — quem conta, quem registra e quem comanda — porque este é um exército administrado: dois mil e seiscentos chefes de pais e \"trezentos e sete mil e quinhentos homens\" debaixo deles (26:12-13), armados pelo rei (26:14). E é essa força que o texto aponta como raiz da queda: \"havendo-se já fortificado, exaltou-se o seu coração\" (26:16)."
    },
    homem: {
      title: "Os obreiros de Elote, os pedreiros das torres, os lavradores dos campos férteis, os armeiros do arsenal e os engenheiros das máquinas",
      subtitle: "2Cr 26 • os homens de ofício de um rei que passou cinquenta e dois anos construindo",
      text: "Este é o capítulo das mãos que trabalham. Começa no porto do golfo: \"Este edificou a Elote, e a restituiu a Judá\" (2Cr 26:2). Segue nos muros filisteus quebrados (26:6) e nos pedreiros das torres de Jerusalém (26:9). No quadro mais bonito estão os homens do campo: \"cavou muitos poços, porque tinha muito gado... tinha lavradores, e vinhateiros, nos montes e nos campos férteis; porque era amigo da agricultura\" (26:10). No fim, os armeiros (26:14) e os engenheiros das \"máquinas da invenção de engenheiros\" (26:15) — e o versículo seguinte diz o que a competência fez com o coração."
    },
    mulherComum: {
      title: "Jecolia de Jerusalém, mãe do rei Uzias",
      subtitle: "2Cr 26:3 • a rainha-mãe do reinado mais longo de Judá",
      text: "\"Tinha Uzias dezesseis anos quando começou a reinar, e cinqüenta e dois anos reinou em Jerusalém; e era o nome de sua mãe Jecolia, de Jerusalém\" (2Cr 26:3). O Cronista registra a mãe de cada rei de Judá, e aqui a linha marca o começo do reinado mais longo da dinastia. O menino que ela vê subir ao trono foi posto ali pelo povo da terra, depois de o pai ser assassinado em Laquis (26:1). Ela não reaparece; o filho reina cinquenta e dois anos e morre leproso, numa casa separada (26:21). Entre uma coisa e outra cabe Isaías, que datará a sua visão por esta morte (Is 6:1)."
    },
    multidao: {
      title: "Todo o povo da terra que fez rei a Uzias, e o exército guerreiro de trezentos e sete mil e quinhentos",
      subtitle: "2Cr 26 • a multidão que garantiu a sucessão de Davi e a que saía à guerra em tropas",
      text: "A primeira é a assembleia do portão: \"Então todo o povo tomou a Uzias, que tinha dezesseis anos, e o fizeram rei em lugar de Amazias seu pai\" (2Cr 26:1). É a terceira vez em poucos capítulos que o \"povo da terra\" segura a casa de Davi de pé quando o palácio falha (24:25; 25:27). A segunda multidão é a do campo de guerra: \"um exército guerreiro de trezentos e sete mil e quinhentos homens\" (26:13). Nunca Judá teve tanto, e o texto não esconde causa nem consequência: \"foi maravilhosamente ajudado, até que se fortificou\" (26:15), e logo \"exaltou-se o seu coração até se corromper\" (26:16)."
    },
    pastor: {
      title: "O vinhateiro dos montes de Uzias",
      subtitle: "2Cr 26:10 • o homem das vinhas nos montes e nos campos férteis do rei amigo da agricultura",
      text: "\"tinha lavradores, e vinhateiros, nos montes e nos campos férteis; porque era amigo da agricultura\" (2Cr 26:10). É uma das frases mais inesperadas do livro: o Cronista para de contar guerras para dizer do que este rei gostava. O vinhateiro trabalha nas encostas terraceadas de Judá e depende das obras do rei — as torres de vigia no deserto e os muitos poços cavados no chão de pedra. É a paisagem que Isaías, contemporâneo deste reinado, usará na canção da vinha: \"cercou-a, e limpando-a das pedras, plantou-a de excelentes vides; e edificou no meio dela uma torre\" (Is 5:1-2)."
    },
    patriarca: {
      title: "Zacarias, que era entendido nas visões de Deus, e Isaías, filho de Amós, que escreveu os atos do rei",
      subtitle: "2Cr 26:5 e 26:22 • o mestre do rei moço e o profeta que datou a sua visão pela morte dele",
      text: "O primeiro aparece numa das ligações mais explícitas entre discipulado e bênção: \"deu-se a buscar a Deus nos dias de Zacarias, que era entendido nas visões de Deus; e nos dias em que buscou ao Senhor, Deus o fez prosperar\" (2Cr 26:5). Não se diz mais nada sobre ele, e é o silêncio que pesa: enquanto houve esse homem ao lado do rei, o rei buscou; depois disso o coração se exalta (26:16). O segundo fecha o reinado: \"o profeta Isaías, filho de Amós, o escreveu\" (26:22) — o mesmo que, no ano da morte deste rei leproso, viu o Rei que ninguém expulsa do templo (Is 6:1)."
    },
    rebanho: {
      title: "O muito gado dos vales e das campinas de Uzias",
      subtitle: "2Cr 26:10 • os rebanhos por causa dos quais o rei cavou os poços e levantou as torres do deserto",
      text: "\"Também edificou torres no deserto, e cavou muitos poços, porque tinha muito gado, tanto nos vales como nas campinas\" (2Cr 26:10). A ordem da frase é a explicação inteira: as torres e as cisternas existem POR CAUSA destes animais. Nas campinas da Sefelá e nos vales do sul, um rebanho grande só se sustenta com água armazenada e vigia contra os saqueadores do deserto — os mesmos árabes e meunitas contra quem o rei foi ajudado (26:7). O gado de Uzias é obra de engenharia tanto quanto as máquinas das torres, e é parte do bem que Deus dá (26:5)."
    },
    rei: {
      title: "Uzias, o rei lavrador que entrou no templo com o incensário na mão — e Jotão, seu filho, que tomou o encargo da casa",
      subtitle: "2Cr 26 • cinquenta e dois anos de prosperidade e um único gesto que os fechou atrás de uma porta",
      text: "Feito rei aos dezesseis anos pelo povo da terra (2Cr 26:1), reinou cinquenta e dois — e o segredo cabe numa linha: \"nos dias em que buscou ao Senhor, Deus o fez prosperar\" (26:5). Quebrou muros filisteus, espalhou o nome \"até à entrada do Egito\" (26:8), cavou poços, teve lavradores e vinhateiros (26:10) e montou as máquinas dos engenheiros (26:15). Então a página vira: \"exaltou-se o seu coração até se corromper... porque entrou no templo do Senhor para queimar incenso\" (26:16). A lepra saiu-lhe à testa, e ele governou o resto da vida de uma casa separada (26:21)."
    },
    servo: {
      title: "Os moços da corte e da câmara de Zacarias, o levita do santo lugar, e o criado que levava água à casa separada",
      subtitle: "2Cr 26 • quem serve nos cinquenta e dois anos de fartura e quem serve na casa onde o rei acabou sozinho",
      text: "No começo servem numa casa em ascensão: o moço da câmara alta de Zacarias, \"que era entendido nas visões de Deus\" (2Cr 26:5), o do salão dos anais, o dos pátios onde chegam os presentes dos amonitas (26:8). Um deles é o levita de serviço no dia em que um rei atravessou a porta que não era dele e \"a lepra lhe saiu à testa perante os sacerdotes\" (26:19). Depois disso o serviço muda de endereço: alguém tem de levar água todos os dias à casa separada, fora da cidade (26:21), segundo a lei do leproso (Lv 13:46). E são mãos de servos que lhe cavam a cova fora do jazigo real (26:23)."
    }
  }
};
