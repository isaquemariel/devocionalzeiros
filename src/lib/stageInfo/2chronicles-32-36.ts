// Fichas ESPECÍFICAS por (capítulo → papel) de 2 CRÔNICAS 32–36.
// Os cinco capítulos do fim do livro e do fim do reino. Em 32, Senaqueribe
// acampa contra as cidades fortificadas e Ezequias responde com pedreiro e
// cal — tapa as fontes de fora, edifica o muro quebrado até às torres, faz
// armas e escudos em abundância e fala ao coração do povo na praça da porta;
// depois vêm os arautos gritando EM JUDAICO contra a gente que estava em cima
// do muro, e o anjo que ceifa o arraial numa noite. Em 33, Manassés reedifica
// os altos, enche os dois átrios da casa de altares ao exército dos céus,
// passa os filhos pelo fogo em Hinom — e volta de Babilônia com ganchos na
// carne e a boca aprendida em oração. Em 34, um menino de oito anos vira rei,
// aos vinte manda derrubar os altares perante ele e moer as imagens em pó, e
// aos vinte e seis acha um livro dentro da casa que estava consertando. Em 35,
// a arca pousa e os levitas largam a carga dos ombros para a maior páscoa
// desde Samuel — e o mesmo rei morre no vale de Megido, no segundo carro. Em
// 36, quatro reis em vinte versículos, os mensageiros escarnecidos até que
// "mais nenhum remédio houve", a casa queimada, os muros derribados, a terra
// folgando nos seus sábados setenta anos — e o pregão de um rei estrangeiro.
// Cada figurante anônimo destas cenas é alguém REAL daquele capítulo: o que
// tapou a boca do manancial, o que empilhou os escudos, o cavador do aqueduto
// de Giom, o adivinho da corte, o moedor das imagens em pó, o levita que
// largou a carga dos ombros, o flecheiro de Megido, a donzela morta no
// santuário, o arauto do pregão de Ciro.
import type { StageInfo } from "@/lib/rpgStageInfo";

export const CHAPTER_ACTORS_32_36: Record<number, Record<string, StageInfo>> = {
  // ---------------------------------------------------------------- 2Cr 32
  32: {
    rei: {
      title: "Senaqueribe, rei da Assíria, e Ezequias, rei de Judá — os dois tronos deste capítulo, e Manassés no último versículo",
      subtitle: "2Cr 32:1-23,33 • o campo diante das cidades fortificadas, o muro de Jerusalém e a casa do deus de Nínive",
      text: "O capítulo começa com um rei entrando: \"veio Senaqueribe, rei da Assíria, e entrou em Judá, e acampou-se contra as cidades fortificadas\" (2Cr 32:1) — e a nota de abertura importa: a invasão vem depois da fidelidade, não em vez dela. Ezequias responde com obra e com uma frase: \"Com ele está o braço de carne, mas conosco o Senhor nosso Deus\" (32:8). Senaqueribe fala como quem já venceu: \"nenhum deus de nação alguma... pôde livrar o seu povo da minha mão\" (32:15). E o desfecho não lhe dá batalha: volta envergonhado e é morto pelos próprios filhos na casa do seu deus (32:21).",
    },
    homem: {
      title: "O sentinela sobre o muro, o príncipe do conselho das fontes, o homem valente, o capitão de guerra, o arauto que gritou em judaico, o valente ceifado no arraial, o cavador do aqueduto de Giom e o embaixador de Babilônia",
      subtitle: "2Cr 32:3-31 • os homens de um cerco que se ganhou com pedreiro, com oração e com uma noite",
      text: "O primeiro homem em cena não pega em arma, pega em mapa: \"Teve conselho com os seus príncipes e os seus homens valentes, para que se tapassem as fontes das águas que havia fora da cidade\" (2Cr 32:3). A lógica é de guerra pura: \"Por que viriam os reis da Assíria, e achariam tantas águas?\" (32:4). Depois há o que está no muro quando os arautos gritam \"em judaico\" de propósito, para que o soldado entendesse sem intérprete (32:18). Depois o que amanheceu morto sem que ninguém o tocasse (32:21). E o que abriu a rocha por baixo da cidade, levando Giom para dentro do muro (32:30).",
    },
    servo: {
      title: "O carregador das pedras das fontes, o ferreiro das armas e escudos em abundância, o que empilhou os escudos, o escriba das cartas de blasfêmia, o servo do leito da doença, o tesoureiro, o servo dos armazéns e o que carregou a terra do túnel",
      subtitle: "2Cr 32:4-30 • as mãos que executaram o que o capítulo credita ao rei",
      text: "\"Assim muito povo se ajuntou, e tapou todas as fontes\" (2Cr 32:4) — e tapar fonte é serviço de enxada e argamassa, feito de joelhos no barro da encosta. Depois vem a forja: \"fez armas e escudos em abundância\" (32:5); o texto credita ao rei, mas quem malhou o ferro foi este servo. Do outro lado da linha há um que escreve para o inimigo: alguém segurou o cálamo enquanto Senaqueribe ditava cartas \"para blasfemar do Senhor Deus de Israel\" (32:17). E o último sai com cesto de terra ao ombro, tirando entulho de dentro da rocha: o túnel que trouxe Giom para dentro do muro (32:30).",
    },
    anciao: {
      title: "Os anciãos de Judá reunidos na praça da porta e o sacerdote da casa do SENHOR nos dias de Ezequias",
      subtitle: "2Cr 32:6,20,23 • o largo do discurso e o átrio do clamor",
      text: "O rei põe capitães sobre o povo, mas quem reúne primeiro é a cidade inteira: \"reuniu-os na praça da porta da cidade, e falou-lhes ao coração\" (2Cr 32:6). A praça da porta é o fórum de Israel — onde o ancião se assenta e se sela o negócio (Rt 4:1-2) —, e é ali, não no parapeito, que Judá recebe o argumento de 32:7-8. O segundo está no átrio de noite: \"o rei Ezequias e o profeta Isaías... oraram contra isso, e clamaram ao céu\" (32:20) — a única arma que Judá usa no capítulo. Depois é ele que recebe à porta os presentes das nações (32:23), de onde nasce o coração exaltado (32:25).",
    },
    multidao: {
      title: "O povo que se ajuntou e tapou todas as fontes, que descansou nas palavras do rei, que estava em cima do muro quando gritaram em judaico — e os moradores de Jerusalém livrados, que depois se humilharam com o rei",
      subtitle: "2Cr 32:4,8,18,22,26 • a cidade como personagem, do trabalho ao medo, do medo ao livramento",
      text: "Esta multidão aparece quatro vezes e muda de posição em cada uma. Primeiro está no vale, com pedra na mão (2Cr 32:4). Depois na praça da porta, e o Cronista registra o efeito exato do discurso — não entusiasmo, descanso: \"E o povo descansou nas palavras de Ezequias\" (32:8). Depois em cima do muro, calada, enquanto os arautos gritam de baixo na sua própria língua (32:18) — nenhuma resposta do parapeito, que em Reis é ordem expressa (2Rs 18:36). E depois livre sem ter pelejado (32:22). A última vez não é de vitória: humilha-se junto com o rei (32:26).",
    },
    mulherComum: {
      title: "A mulher de Jerusalém em cima do muro, que ouviu os arautos gritarem contra o seu Deus na sua própria língua",
      subtitle: "2Cr 32:18-19 • o adarve cheio de gente, e um cerco travado por palavras",
      text: "Ela está onde o texto a põe: \"E clamaram em alta voz em judaico contra o povo de Jerusalém, que estava em cima do muro, para os atemorizar e os perturbar\" (2Cr 32:18). Não é soldado; é moradora, subiu ao muro como sobe quem quer ver o que vem pela estrada, e o que ouve é feito para ela: a Assíria escolheu falar judaico para que a dona de casa e o menino entendessem antes dos oficiais — o cerco começa pelo ouvido. E o que dizem é o mais perigoso: puseram o Deus de Jerusalém entre \"os deuses dos povos da terra, obras das mãos dos homens\" (32:19). A resposta veio de noite, no arraial (32:21).",
    },
    patriarca: {
      title: "Isaías, filho de Amós, o profeta que orou com o rei e escreveu a visão em que este reinado ficou registrado",
      subtitle: "2Cr 32:20,32 • o átrio do clamor de noite, e a câmara dos rolos",
      text: "O Cronista dá a Isaías duas linhas e um livro. A primeira é de joelhos: \"o rei Ezequias e o profeta Isaías, filho de Amós, oraram contra isso, e clamaram ao céu\" (2Cr 32:20) — a única ação militar do capítulo é a oração de dois homens, e o versículo seguinte começa com \"Então\". A segunda é de arquivo: os atos do rei \"estão escritos na visão do profeta Isaías\" (32:32), aberta na nossa Bíblia em Is 36—39: a resposta contra Senaqueribe, os quinze anos a mais com a sombra que recuou, e o aviso sobre Babilônia (Is 39:6) que 2Cr 36 cumpre.",
    },
    anjo: {
      title: "O anjo que o SENHOR enviou ao arraial do rei da Assíria",
      subtitle: "2Cr 32:21 • uma noite no acampamento assírio, e nenhuma palavra dita",
      text: "\"Então o Senhor enviou um anjo que destruiu a todos os homens valentes, e os líderes, e os capitàes no arraial do rei da Assíria\" (2Cr 32:21). O versículo começa com \"Então\", ligado ao clamor dos dois homens do versículo anterior, e não descreve batalha nenhuma: as tendas ficam de pé e ninguém fica de pé. Reis dá o número e a hora (2Rs 19:35). O texto não lhe põe uma palavra na boca — age em silêncio absoluto —, e por isso a cena inteira é o argumento: quem chamou o SENHOR de obra das mãos dos homens (32:19) perdeu, sem espada, todo o valente e todo o capitão que tinha.",
    },
    pastor: {
      title: "O pastor dos currais e das estrebarias de Ezequias, no tempo em que Deus lhe deu muitíssimas possessões",
      subtitle: "2Cr 32:28-29 • o terreiro fora da cidade, depois do livramento",
      text: "Depois da noite do arraial, o capítulo faz um inventário de fazenda: armazéns para o trigo, o vinho e o azeite, \"e de estrebarias para toda a espécie de animais e de currais para os rebanhos... porque Deus lhe tinha dado muitíssimas possessões\" (2Cr 32:28-29). Este pastor é o empregado dessa conta: toca ovelha para o curral novo e dorme no campo perto do gado do rei. O detalhe que o Cronista não deixa passar é a causa — \"porque Deus lhe tinha dado\" —, e é a fartura que arma a armadilha do versículo 25: \"o seu coração se exaltou\". Judá sabia o risco de cor (Dt 8:13-14).",
    },
    rebanho: {
      title: "As ovelhas e as vacas em abundância de Ezequias, e o gado dos currais que ele mandou fazer",
      subtitle: "2Cr 32:28-29 • os currais e as estrebarias do rei que prosperou em todas as suas obras",
      text: "\"e de currais para os rebanhos. Edificou também cidades, e possuiu ovelhas e vacas em abundância; porque Deus lhe tinha dado muitíssimas possessões\" (2Cr 32:28-29). É o retrato de uma casa que se recompôs depressa: poucos anos antes este rei tirara do templo a prata do tributo assírio, e chegou a cortar o ouro das portas (2Rs 18:15-16). Rebanho de rei não é ornamento: é a despesa do altar — dele saíram os mil novilhos da páscoa (2Cr 30:24) — e a reserva de um reino que espera cerco. E nada disso segurou o coração do dono quando chegaram os hóspedes de Babilônia (32:31).",
    },
  },

  // ---------------------------------------------------------------- 2Cr 33
  33: {
    rei: {
      title: "Manassés, doze anos de idade e cinquenta e cinco de reinado; Amom, que não se humilhou; e Josias, feito rei pelo povo da terra",
      subtitle: "2Cr 33:1-25 • o trono de Judá no seu pior e mais longo reinado, e as duas sucessões que o seguem",
      text: "\"Tinha Manassés doze anos de idade, quando começou a reinar, e cinqüenta e cinco anos reinou em Jerusalém\" (2Cr 33:1) — o reinado mais longo de Judá e o mais destrutivo: reedificou os altos, encheu os dois átrios de altares, pôs uma imagem dentro do santuário e \"tanto fez errar a Judá... que fizeram pior do que as nações\" (33:9). E então o Cronista conta o que Reis não conta: os ganchos, as cadeias, Babilônia, e a frase que ninguém espera — \"Então conheceu Manassés que o Senhor era Deus\" (33:13). O filho recebe os ídolos e não o arrependimento (33:23), e morre pelas mãos dos servos.",
    },
    homem: {
      title: "O pedreiro dos altares dos Baalins, o servidor dos altares do átrio de fora, o adivinho e o encantador da corte, o capitão assírio dos ganchos, o pedreiro do muro de fora e o que sacrificava nos altos ao SENHOR",
      subtitle: "2Cr 33:3-17 • os homens que construíram a queda deste reinado e depois reconstruíram o muro",
      text: "O primeiro está de colher na mão dentro da casa de Deus: \"Edificou altares a todo o exército dos céus, em ambos os átrios da casa do Senhor\" (2Cr 33:5) — não é um canto escondido, é a casa inteira ocupada. Os seguintes vivem de ler o invisível: \"usou de adivinhações e de agouros, e de feitiçarias\" (33:6), tudo o que Dt 18:10-12 lista como abominação. Depois entra quem muda a cena: os capitães da Assíria, que o prenderam \"com ganchos\" (33:11) — o método de conduzir preso que Ezequiel usaria como figura (Ez 19:4). E no fim há o teimoso: \"o povo ainda sacrificava nos altos\" (33:17).",
    },
    servo: {
      title: "O servo do átrio de Manassés, o filho levado ao fogo em Hinom, o levita que guardou a lei escondida, o carcereiro de Babilônia, os que subiram as pedras do muro de fora e os dois servos que mataram Amom em sua casa",
      subtitle: "2Cr 33:6,11-16,24 • os menores deste capítulo, e os que executaram tudo o que ele conta",
      text: "O primeiro destes não escolheu nada e é o mais novo: \"Fez ele também passar seus filhos pelo fogo no vale do filho de Hinom\" (2Cr 33:6) — o mesmo vale de Acaz (2Cr 28:3), cujo nome a língua guardaria para o inferno (Jr 7:31-32). O segundo carrega tocha e incensário para os altares dos dois átrios (33:5). O terceiro está na porta do cárcere de Babilônia, onde o rei \"angustiado, orou deveras ao Senhor seu Deus\" (33:12) — a única imagem do capítulo que o Cronista trata com misericórdia. Os últimos entram de madrugada num quarto de palácio e matam Amom (33:24).",
    },
    anciao: {
      title: "O sacerdote da casa do SENHOR que viu o ídolo entrar no santuário, o sacerdote do altar reparado depois de Babilônia e o que ungiu o menino Josias",
      subtitle: "2Cr 33:4-7,15-16,25 • o átrio profanado, o átrio limpo e a posse de um rei de oito anos",
      text: "Este sacerdote envelheceu vendo três coisas impossíveis. A primeira: \"pôs uma imagem de escultura do ídolo que tinha feito, na casa de Deus\" — a casa de que Deus dissera \"porei o meu nome para sempre\" (2Cr 33:7); o Cronista põe a promessa e a profanação no mesmo versículo. A segunda vem depois do exílio do rei: \"tirou da casa do Senhor os deuses estranhos e o ídolo... E reparou o altar do Senhor\" (33:15-16). A terceira é uma unção às pressas sobre uma criança, com o corpo de Amom ainda quente (33:25). Viu o ídolo entrar e sair, e pôs a mão na cabeça do menino que acharia o livro.",
    },
    multidao: {
      title: "O povo de Judá que Manassés fez errar, o povo que o recebeu de volta de Babilônia, o Judá a quem ele ordenou que servisse ao SENHOR e o povo da terra que vingou Amom",
      subtitle: "2Cr 33:9,13,16,25 • a cidade arrastada, e depois arrastada de volta",
      text: "A sentença mais dura do capítulo não é sobre o rei, é sobre o que ele fez com a rua: \"Manassés tanto fez errar a Judá e aos moradores de Jerusalém, que fizeram pior do que as nações que o Senhor tinha destruído\" (2Cr 33:9) — pior do que os cananeus, na terra tomada deles por causa dessas mesmas coisas. Cinquenta e cinco anos são duas gerações que nunca viram outra coisa. Depois esta multidão vê voltar do norte um rei que saíra de ganchos (33:13) e ouve dele o inesperado: \"ordenou a Judá que servisse ao Senhor Deus de Israel\" (33:16). A obediência é parcial, e o texto não a maquia (33:17).",
    },
    mulherComum: {
      title: "A mãe que viu o filho passar pelo fogo no vale de Hinom e a mulher que subiu ao alto com a oferta na mão",
      subtitle: "2Cr 33:3,6,17 • o vale ao sul da cidade e o outeiro de fora, nos dias em que o rei mandava",
      text: "As duas mulheres deste capítulo estão nos dois lugares em que a religião de Manassés acontecia. A primeira desce ao vale: \"Fez ele também passar seus filhos pelo fogo no vale do filho de Hinom\" (2Cr 33:6) — quando o rei faz isso com os próprios filhos, a corte imita, e Jeremias descreveria o resultado no mesmo terreno (Jr 7:31). A segunda sobe o outeiro com a cesta, porque ele \"tornou a edificar os altos que Ezequias, seu pai, tinha derrubado\" (33:3). Ela vira, menina, a páscoa de catorze dias (2Cr 30); voltou ao alto porque o alto voltou (33:17).",
    },
    patriarca: {
      title: "Os videntes que falaram a Manassés no nome do SENHOR Deus de Israel, e não foram ouvidos",
      subtitle: "2Cr 33:10,18 • o salão do trono, com o incensário do ídolo fumegando atrás",
      text: "\"E falou o Senhor a Manassés e ao seu povo, porém não deram ouvidos\" (2Cr 33:10). O versículo é curto e esconde anos: Deus não ficou calado durante cinquenta e cinco anos de abominação, mandou gente falar, e o Cronista guarda os nomes num arquivo que perdemos (33:18). Reis conserva um pedaço do que disseram, e é a sentença de morte de Jerusalém: \"limparei a Jerusalém, como quem limpa o prato\" (2Rs 21:13). Este vidente prega diante de um trono que tem o ídolo ao lado e sai sem resposta — e ainda assim é essa palavra que alcança o rei no chão de um cárcere (33:12-13).",
    },
  },

  // ---------------------------------------------------------------- 2Cr 34
  34: {
    rei: {
      title: "Josias, oito anos de idade, que aos dezesseis começou a buscar, aos vinte começou a purificar e aos vinte e seis rasgou as suas vestes",
      subtitle: "2Cr 34:1-33 • trinta e um anos de reinado contados por três idades e um livro",
      text: "\"Tinha Josias oito anos quando começou a reinar... E fez o que era reto aos olhos do Senhor\" (2Cr 34:1-2). O Cronista datou a conversão dele: \"no oitavo ano do seu reinado, sendo ainda moço, começou a buscar o Deus de Davi, seu pai; e no duodécimo ano começou a purificar\" (34:3) — dezesseis anos para buscar, vinte para pegar na marreta. A purificação é feita na frente dele (34:4-5), cumprindo à letra a palavra dita contra o altar de Betel trezentos anos antes (1Rs 13:2). E então o rei que já limpara tudo ouve pela primeira vez o que estava escrito, e \"rasgou as suas vestes\" (34:19).",
    },
    anciao: {
      title: "Hilquias, o sumo sacerdote que achou o livro; Safã, o escrivão que o leu perante o rei; e os anciãos de Judá e de Jerusalém reunidos para ouvir a aliança",
      subtitle: "2Cr 34:9,14-22,29-30 • a câmara do dinheiro, o salão do rei e o átrio da leitura pública",
      text: "O achado não foi procurado: \"tirando eles o dinheiro que se tinha trazido à casa do Senhor, Hilquias, o sacerdote, achou o livro da lei do Senhor, dada pela mão de Moisés\" (2Cr 34:14) — estavam contando moeda para pagar carpinteiro, e apareceu o livro. Safã presta contas da obra primeiro (34:16) e só depois, quase como quem se lembra, acrescenta: \"O sacerdote Hilquias entregou-me um livro\" (34:18). Foi a leitura, não o achado, que rasgou as vestes do rei. Depois a delegação vai à casa de Hulda (34:22) — e no fim o próprio rei lê tudo em voz alta aos anciãos reunidos (34:29-30).",
    },
    homem: {
      title: "O derrubador dos altares dos Baalins, o moedor das imagens em pó, o queimador dos ossos sobre os altares, o carpinteiro e o edificador da obra, os quatro superintendentes levitas e o porteiro que guardava a entrada",
      subtitle: "2Cr 34:4-13 • o canteiro da purificação e o canteiro do conserto, com o mesmo povo nos dois",
      text: "A limpeza deste capítulo é serviço de marreta e peneira: as imagens são quebradas e reduzidas a pó, \"e o espargiu sobre as sepulturas dos que lhes tinham sacrificado\" (2Cr 34:4). Reduzir a pó não é destruir, é humilhar. O trabalho seguinte é mais pesado: \"os ossos dos sacerdotes queimou sobre os seus altares\" (34:5), o gesto que torna o lugar imundo para sempre. Depois os mesmos braços passam a construir, comprando \"pedras lavradas, e madeiras... para as casas que os reis de Judá tinham destruído\" (34:11) — o estrago era interno. E quem dirigia a obra eram levitas cantores (34:12).",
    },
    servo: {
      title: "O que espargiu o pó das imagens sobre as sepulturas, o que atiçou o fogo dos ossos sobre os altares, o carregador da obra, o escrivão levita, o porteiro da entrada e o arauto que reuniu os anciãos",
      subtitle: "2Cr 34:4-5,9,13,29 • as mãos miúdas de uma reforma que começou por fora e acabou por dentro",
      text: "\"e o espargiu sobre as sepulturas dos que lhes tinham sacrificado\" (2Cr 34:4) — alguém andou de cemitério em cemitério com um cesto de pó de ídolo. \"E os ossos dos sacerdotes queimou sobre os seus altares\" (34:5) — alguém trouxe a lenha e abriu os túmulos. Estes servos fazem o serviço que o texto credita ao rei. Depois mudam de ofício: um recebe à porta o dinheiro vindo \"de Manassés, e de Efraim, e de todo o restante de Israel\" (34:9) — a coleta atravessou fronteiras de reinos que já não existiam; outro carrega viga; outro lança em rolo o que entra e sai (34:13).",
    },
    mulherComum: {
      title: "Hulda, a profetisa, mulher de Salum, guarda das vestimentas, que habitava em Jerusalém na segunda parte",
      subtitle: "2Cr 34:22-28 • a casa de onde saiu o oráculo que o sumo sacerdote e os oficiais do rei foram buscar",
      text: "O rei tinha cinco homens de confiança e mandou os cinco à casa de uma mulher: \"foram ter com a profetisa Hulda, mulher de Salum... e habitava ela em Jerusalém na segunda parte\" (2Cr 34:22). Jeremias e Sofonias já profetizavam; os enviados vieram a esta casa, e o texto não explica por quê. Ela começa com a frase mais desconcertante do capítulo: \"Dizei ao homem que vos enviou a mim\" (34:23), sem título nem cortesia de corte. O oráculo tem duas metades: o mal virá sobre o lugar (34:24-25), mas \"porquanto o teu coração se enterneceu... também eu te ouvi\" (34:27).",
    },
    multidao: {
      title: "Todo o povo, desde o maior até ao menor, que subiu à casa do SENHOR para ouvir o livro — e todos quantos se achavam em Israel, obrigados a servir ao SENHOR",
      subtitle: "2Cr 34:30-33 • o átrio da leitura pública e a terra inteira varrida",
      text: "\"E o rei subiu à casa do Senhor... e todo o povo, desde o maior até ao menor; e ele leu aos ouvidos deles todas as palavras do livro da aliança\" (2Cr 34:30). \"desde o maior até ao menor\" é a medida da assembleia: não é convocação de notáveis, é a cidade toda, criança inclusive, ouvindo de uma vez o que estivera perdido dentro do próprio templo. O rei lê de pé e jura de pé (34:31), e faz o que só um rei pode fazer: obriga todos a firmarem (34:32). O fecho é honesto: a obediência durou o que durou a vida dele (34:33) — e Jeremias diria que foi \"falsamente\" (Jr 3:10).",
    },
  },

  // ---------------------------------------------------------------- 2Cr 35
  35: {
    rei: {
      title: "Josias, que celebrou a páscoa que não se celebrava desde os dias de Samuel — e Necó, rei do Egito, cujas palavras saíram da boca de Deus",
      subtitle: "2Cr 35:1-24 • o átrio da maior páscoa de Israel, e o vale de Megido",
      text: "\"Então Josias celebrou a páscoa ao SENHOR em Jerusalém; e mataram o cordeiro da páscoa no décimo quarto dia do primeiro mês\" (2Cr 35:1) — no dia certo, ao contrário da de Ezequias, e com o rei pagando o gado (35:7). O veredito é sem paralelo: \"Nunca, pois, se celebrou tal páscoa em Israel, desde os dias do profeta Samuel\" (35:18). Cinco versículos depois, o mesmo homem morre por não ouvir: \"não deu ouvidos às palavras de Neco, que saíram da boca de Deus\" (35:22). Deus pode falar por uma boca errada — e o rei que passara a vida obedecendo ao livro não reconheceu a voz fora dele..",
    },
    anciao: {
      title: "Os sacerdotes postos nos seus cargos, Hilquias e os líderes da casa de Deus que deram do seu, os que espargiram o sangue e os que se ocuparam até à noite",
      subtitle: "2Cr 35:2,8,11,14 • o átrio do sacrifício, do amanhecer até depois de escurecer",
      text: "O rei começa a festa pelo clero: \"E estabeleceu os sacerdotes nos seus cargos, e os animou ao ministério da casa do Senhor\" (2Cr 35:2) — animar é o verbo, porque este sacerdócio atravessara cinquenta e cinco anos de Manassés. Depois eles não só servem: pagam, abrindo os próprios currais (35:8). O dia é de matadouro e de altar ao mesmo tempo: \"os sacerdotes espargiram o sangue recebido das mãos dos levitas que esfolavam as reses\" (35:11). E o versículo que mede a jornada: ocuparam-se \"até à noite\", e por isso os levitas prepararam a ceia deles (35:14).",
    },
    servo: {
      title: "O levita que largou a carga dos ombros quando a arca pousou, o que esfolava as reses, o que assou a páscoa no fogo, o cantor filho de Asafe, o porteiro de cada porta e o servo que tirou o rei do carro em Megido",
      subtitle: "2Cr 35:3-15,24 • os levitas de uma páscoa inteira, e a mão que carregou um rei ferido",
      text: "A ordem que abre o serviço deles é uma aposentadoria: \"Ponde a arca sagrada na casa que edificou Salomão... não tereis mais esta carga aos ombros\" (2Cr 35:3). Desde o deserto o ofício coatita era levar a arca aos ombros (Nm 4:15); o rei declara a marcha terminada. O que vem depois é trabalho miúdo: esfolar rês, passar a bacia (35:11) e cozinhar para um país — \"assaram a páscoa no fogo, segundo o rito\" (35:13), como manda Êx 12:8-9. Outros não saem do posto: cantores e porteiros, servidos pelos irmãos (35:15). E o último tira um rei ferido do carro, em Megido (35:24).",
    },
    homem: {
      title: "O homem do povo que recebeu a sua porção, o soldado de Judá que saiu ao encontro de Necó, o mensageiro do Egito, o flecheiro que atirou contra o rei e o homem de Judá que o pranteou",
      subtitle: "2Cr 35:12-13,20-24 • do pátio da repartição ao vale de Megido, no mesmo capítulo",
      text: "O primeiro sai do átrio com comida na mão: as porções são repartidas \"segundo as divisões das casas paternas\" (2Cr 35:12) e \"prontamente\" (35:13) — a maior páscoa de Israel foi também a mais bem servida. O segundo põe o elmo poucos meses depois: \"subiu Neco, rei do Egito, para guerrear contra Carquemis... e Josias lhe saiu ao encontro\" (35:20) — Judá entrou numa guerra que não era sua. O terceiro traz o recado e é o único a acertar: \"guarda-te de te opores a Deus, que é comigo\" (35:21). O quarto arma o arco no vale (35:23). E o último prateia o rei na porta da cidade (35:24; Zc 12:11).",
    },
    mulherComum: {
      title: "A mulher do povo na páscoa de Josias e a cantora das lamentações, que canta sobre este rei até ao dia de hoje",
      subtitle: "2Cr 35:13,17,25 • o pátio das mesas nos sete dias dos ázimos, e o luto que virou estatuto",
      text: "Ela come no átrio, e o texto faz questão de dizer que a comida chegou depressa e a todos (2Cr 35:13). Depois ficam sete dias de casa cheia (35:17) — pão sem fermento por uma semana é uma cozinha inteira reorganizada, e essa parte da festa recai sobre as mulheres de Judá desde a noite do Egito (Êx 12:15-20). Poucos meses depois ela troca a mesa pelo canto do luto: \"todos os cantores e cantoras, nas suas lamentações, têm falado de Josias, até ao dia de hoje\" (35:25). Cantoras, no plural, com ofício reconhecido (Ed 2:65): o pranto por este rei foi posto em partitura e guardado por estatuto.",
    },
    multidao: {
      title: "O povo de Judá e de Israel que se achou em Jerusalém na páscoa de Josias, e comeu os sete dias dos pães ázimos",
      subtitle: "2Cr 35:17-19 • o átrio cheio no décimo oitavo ano do reinado",
      text: "\"E os filhos de Israel que ali se acharam celebraram a páscoa naquele tempo, e a festa dos pães ázimos, durante sete dias\" (2Cr 35:17). Repare em \"filhos de Israel\": não é só Judá. Samaria caíra havia quase um século, e o rei purificara até Naftali (2Cr 34:6); há gente do Norte no pátio, vinda de aldeias em ruínas. O Cronista mede tudo contra o começo: \"Nunca, pois, se celebrou tal páscoa em Israel, desde os dias do profeta Samuel\" (35:18) — nem Davi, nem Salomão. E a data é a mesma do achado do livro (35:19): a maior festa foi feita por um povo que acabara de o ouvir em voz alta.",
    },
    cavaleiro: {
      title: "O cavaleiro do exército de Necó, subindo pela estrada do mar para Carquemis",
      subtitle: "2Cr 35:20-22 • a passagem do Egito por Megido, no caminho do Eufrates",
      text: "\"subiu Neco, rei do Egito, para guerrear contra Carquemis, junto ao Eufrates; e Josias lhe saiu ao encontro\" (2Cr 35:20). Este cavaleiro não vinha atacar Judá: ia atravessá-lo. A passagem obrigatória entre o Egito e o Eufrates é a planície de Jezreel, e o gargalo dela chama-se Megido — a esquina de quase todas as batalhas da Palestina, de Débora (Jz 5:19) à que dá nome à última (Ap 16:16). O recado que trazia Judá não quis ouvir: \"Não é contra ti que venho hoje\" (35:21). Quatro anos depois esse mesmo exército seria desfeito em Carquemis por Nabucodonosor (Jr 46:2-12).",
    },
    cordeiro: {
      title: "O cordeiro da páscoa, morto no décimo quarto dia do primeiro mês",
      subtitle: "2Cr 35:1,6,11 • o animal por cuja conta a festa inteira existe",
      text: "\"mataram o cordeiro da páscoa no décimo quarto dia do primeiro mês\" (2Cr 35:1). A data é a de Êxodo 12:6, e a ordem aos levitas repete a fonte: \"imolai a páscoa... conforme a palavra do Senhor, dada pela mão de Moisés\" (35:6). O que muda em relação ao Egito é quem segura a faca: lá era o chefe de cada casa, aqui é o levita, e o sangue passa à mão do sacerdote (35:11). Foram perto de quarenta mil animais num só pátio, e todos apontam para um: \"Eis o Cordeiro de Deus, que tira o pecado do mundo\" (Jo 1:29). Na cruz, nenhum osso lhe foi quebrado (Êx 12:46; Jo 19:36).",
    },
    rebanho: {
      title: "Os trinta mil cordeiros e cabritos e os três mil bois da fazenda do rei, e as reses dadas pelos príncipes e pelos chefes dos levitas",
      subtitle: "2Cr 35:7-9 • o gado de uma páscoa em que ninguém pagou a sua",
      text: "\"E ofereceu Josias, aos filhos do povo, cordeiros e cabritos do rebanho... em número de trinta mil, por todos os que ali se achavam, e de bois três mil; isto era da fazenda do rei\" (2Cr 35:7). A última frase é a que importa: da fazenda do rei — não do tesouro do templo, nem de imposto novo. Depois vêm as ofertas dos líderes da casa de Deus (35:8) e dos chefes dos levitas (35:9). O Cronista faz uma conta teológica, não pecuária: a páscoa é a festa da casa, em que cada família traz o seu cordeiro (Êx 12:3), e aqui o rei e os levitas cobrem a conta para que nenhuma casa pobre ficasse de fora.",
    },
    pastor: {
      title: "O pastor da fazenda do rei, que tangeu trinta mil cabeças de gado miúdo do campo até o átrio",
      subtitle: "2Cr 35:7 • as estradas de Judá nos dias que antecedem o décimo quarto do primeiro mês",
      text: "Antes da páscoa houve uma boiada. \"cordeiros e cabritos do rebanho... em número de trinta mil... e de bois três mil; isto era da fazenda do rei\" (2Cr 35:7) — trinta mil cabeças não aparecem em Jerusalém por decreto: alguém as apartou no campo, as tangeu pelas estradas de Judá durante dias e as entregou contadas no terreiro. O rebanho da coroa vinha das terras que os reis administravam desde Davi, com feitor sobre as manadas (1Cr 27:29-31). O serviço deste pastor é anônimo por definição: quando o texto começa a contar a festa, o gado já está lá.",
    },
    patriarca: {
      title: "Jeremias, o profeta que fez uma lamentação sobre Josias",
      subtitle: "2Cr 35:25 • o pátio do luto de Jerusalém, com o rei morto e o reino a cair",
      text: "\"E Jeremias fez uma lamentação sobre Josias; e todos os cantores e cantoras, nas suas lamentações, têm falado de Josias, até ao dia de hoje; porque as estabeleceram por estatuto em Israel\" (2Cr 35:25). Jeremias começara a profetizar no décimo terceiro ano deste rei (Jr 1:2) e enterrou o único rei de Judá que ouviu o livro. Sobre o luto certo, mandaria não chorar o morto e sim o que ia para o exílio (Jr 22:10). O canto que compôs não se conservou — as Lamentações da nossa Bíblia são sobre a destruição da cidade —, mas ficou por estatuto, cantado por gerações.",
    },
  },

  // ---------------------------------------------------------------- 2Cr 36
  36: {
    rei: {
      title: "Jeoacaz, Jeoiaquim, Joaquim e Zedequias — quatro reis em vinte versículos; e, do lado de fora, Necó, Nabucodonosor e Ciro",
      subtitle: "2Cr 36:1-23 • o trono de Davi passando de mão em mão até não haver mais trono",
      text: "Nenhum destes quatro escolhe o próprio fim. Jeoacaz é posto pelo povo e deposto por estrangeiro em três meses (2Cr 36:3); Jeremias diz que não voltaria nunca mais (Jr 22:11-12). Jeoiaquim é nomeado por Necó, que lhe troca até o nome (36:4), e acaba amarrado com cadeias (36:6). Joaquim reina três meses e dez dias e é levado \"com os mais preciosos vasos da casa do SENHOR\" (36:10). Zedequias tem onze anos para se humilhar e não usa nenhum (36:12-13). E o livro acaba com um rei que não é de Davi: \"despertou o Senhor o espírito de Ciro, rei da Pérsia\" (36:22).",
    },
    homem: {
      title: "O homem do povo da terra que fez rei a Jeoacaz, o cobrador dos cem talentos, o caldeu que amarrou o rei, o escarnecedor dos mensageiros, o que matou no santuário e o judeu do cativeiro que ouviu o pregão",
      subtitle: "2Cr 36:1-23 • os homens de Judá e os homens que vieram buscá-los",
      text: "O primeiro age com pressa, sobre um corpo recém-chegado de Megido: \"o povo da terra tomou a Jeoacaz... e o fez rei em lugar de seu pai\" (2Cr 36:1) — não era o mais velho, e a escolha durou três meses. O segundo aparece com balança, cobrando cem talentos da terra (36:3), pagos casa por casa. Depois vêm os de fora: um amarra o rei (36:6), outro escolhe os vasos (36:10), outro entra no santuário de espada (36:17). Mas o homem que decide o capítulo é o de dentro, e o que ele faz é rir: \"zombaram dos mensageiros de Deus... até que... mais nenhum remédio houve\" (36:16).",
    },
    anciao: {
      title: "Os chefes dos sacerdotes que contaminaram a casa, o sacerdote que serviu aos ídolos de Jeoiaquim, o velho morto no santuário e o velho de Judá levado a Babilônia",
      subtitle: "2Cr 36:14,17,20 • o clero do fim de Judá, e os que não tiveram idade para escapar",
      text: "A acusação sobe até o alto do sacerdócio e não poupa ninguém: \"todos os chefes dos sacerdotes e o povo aumentavam de mais em mais as transgressões... e contaminaram a casa do Senhor\" (2Cr 36:14). Não é negligência: é o culto dos gentios celebrado dentro do santuário por quem foi ordenado para o guardar — Ezequiel, deportado nesses anos, foi levado em visão a ver isso por dentro (Ez 8:10-12). E o juízo vem sem distinção de idade: \"não teve piedade nem dos jovens, nem das donzelas, nem dos velhos, nem dos decrépitos\" (36:17). Quem sobrou fez a viagem a pé (36:20).",
    },
    servo: {
      title: "O escriba dos três meses de Jeoacaz, o servo do trono de Jeoiaquim, o que pôs os vasos no templo de Babilônia, o que escolheu os mais preciosos vasos e o escriba do pregão de Ciro",
      subtitle: "2Cr 36:2-23 • os que escreveram, embalaram e leram o fim do reino",
      text: "Estes servos fazem o registro e a embalagem de uma catástrofe. O primeiro fecha um rolo com quase nada dentro: \"três meses reinou em Jerusalém\" (2Cr 36:2). O segundo empacota: os vasos da casa do SENHOR postos no templo de Babilônia (36:7) — o que a Antiguidade lia como prova de que aquele deus vencera; foram esses vasos que Belsazar mandou trazer (Dn 5:2-5). O terceiro faz a seleção do segundo saque (36:10). E o último, setenta anos depois, escreve o pregão que desfaz tudo (36:22) — o decreto que devolveria os utensílios, contados um a um (Ed 1:7-11).",
    },
    mulherComum: {
      title: "A mulher de Judá que seguiu as abominações dos gentios, a donzela morta na casa do santuário, a que ficou sobre os escombros e a que foi levada a Babilônia",
      subtitle: "2Cr 36:14,17-20 • as quatro posições em que este capítulo põe as mulheres de Jerusalém",
      text: "A primeira está dentro da casa de Deus fazendo o que ali não se faz (2Cr 36:14) — Ezequiel, na mesma década, viu \"mulheres assentadas chorando a Tamuz\" à porta do norte do templo (Ez 8:14), e Jeremias ouviu delas a defesa do culto da rainha dos céus (Jr 44:19). A segunda é a que o versículo mais duro nomeia: \"não teve piedade... nem das donzelas\" (36:17) — morta no santuário, onde se ia justamente para não morrer. A terceira fica sobre os escombros (36:19), e é dela que Lamentações fala: \"Tornou-se como viúva\" (Lm 1:1). A quarta entra na fila da estrada (36:20).",
    },
    patriarca: {
      title: "Jeremias, diante de quem o rei não se humilhou, e os mensageiros que Deus enviou constantemente e foram escarnecidos",
      subtitle: "2Cr 36:12,15-16,21-22 • o salão do trono, a porta da casa e a palavra que ficou de pé sobre a terra vazia",
      text: "\"nem se humilhou perante o profeta Jeremias, que falava da parte do Senhor\" (2Cr 36:12) — o Cronista mede o último rei de Judá por uma coisa só, e não é política: tinha a palavra de Deus falada na cara e não abaixou a cabeça. Atrás de Jeremias há uma multidão de mensageiros, e o motivo do envio é a frase mais terna deste capítulo terrível: Deus falou-lhes \"constantemente... porque se compadeceu do seu povo e da sua habitação\" (36:15). A resposta vem em três verbos: \"zombaram... desprezaram... mofaram\" (36:16). E é essa palavra desprezada a única coisa que sobrevive à cidade (36:21-22).",
    },
    cavaleiro: {
      title: "O cavaleiro do exército dos caldeus, na estrada em que Judá foi levado",
      subtitle: "2Cr 36:6,17-20 • a escolta de três deportações e do cerco final",
      text: "Ele aparece três vezes na mesma estrada do norte, cada vez com mais gente atrás. Primeiro leva um rei amarrado com cadeias (2Cr 36:6). Depois leva outro rei e a nata do reino, \"com os mais preciosos vasos da casa do SENHOR\" (36:10) — nessa leva foram Ezequiel e a corte (2Rs 24:14-16). Na terceira já não há reino para levar (36:20). O Cronista não o descreve com ódio, e sim como instrumento: \"Porque fez subir contra eles o rei dos caldeus\" (36:17) — quem fez subir foi o SENHOR. É o Nabucodonosor a quem Jeremias chamou \"meu servo\" (Jr 25:9).",
    },
    pastor: {
      title: "O único que passou pela terra assolada, enquanto ela folgava nos seus sábados",
      subtitle: "2Cr 36:21 • setenta anos de campo de Judá sem lavrador e sem dono",
      text: "\"até que a terra se agradasse dos seus sábados; todos os dias da assolação repousou, até que os setenta anos se cumpriram\" (2Cr 36:21). Esta figura solitária no campo vazio é tudo o que o capítulo deixa vivo em Judá: um homem com o seu gado atravessando lavoura que ninguém semeia, entre muro caído e cerca sem dono. A lei previra a cobrança: a terra devia descansar de sete em sete anos, e quem não a deixasse folgar veria isto (Lv 26:34-35). Setenta anos de descanso são setenta sábados sonegados, e a conta fecha sozinha (Jr 25:11). Daniel leria este número nos livros e se poria a orar (Dn 9:2).",
    },
  },
};
