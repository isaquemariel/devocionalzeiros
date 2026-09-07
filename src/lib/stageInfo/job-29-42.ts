// Fichas ESPECÍFICAS por (capítulo → papel) de JÓ 29–42.
// O último terço do livro, e o palco de Jó quase nunca mostra os cinco homens
// sentados na cinza: mostra o que a fala VÊ. Por isso o figurante destes
// capítulos nunca é "um homem do povo" — é a FIGURA DA IMAGEM daquele
// versículo, e a ficha tem de dizer de que imagem ele é, quem a disse e o que
// ela quer dizer. Em 29 e 30 são dois quadros opostos do mesmo homem no mesmo
// portão: os idosos que se levantavam e os moços de menos idade que agora
// cospem; a lâmpada sobre a cabeça e a lama; a harpa e o luto. Em 31, quarenta
// versículos de juramento, e cada "se" é um quadro: a aliança com os olhos, as
// balanças fiéis, o direito do servo e da serva, o bocado comido sozinho, o
// ouro, o sol e a lua, as portas abertas ao viandante, os cardos por trigo. De
// 32 a 37 entra ELIÚ, o único moço no meio de quatro velhos, e o palco enche-se
// do que ele descreve: os odres novos sem respiradouro, o barro do oleiro, a
// cama do sonho e a cama da dor, o mensageiro intérprete um entre milhares, a
// mesa em que o paladar experimenta a comida, o gado que dá notícia do temporal
// que sobe, a neve que recebe ordem e o céu firme como espelho fundido. De 38 a
// 41 o SENHOR responde de um redemoinho — sem figura, porque o redemoinho é o
// MODO da voz e não um mensageiro —, e cada figurante é a criatura ou o homem
// que a pergunta cita como testemunha: os ímpios que a alva sacode, a cabra
// montesa, o jumento montês que se ri do ruído da cidade, o boi selvagem, a
// avestruz, o cavalo que ao soar das buzinas diz "Eia!", a águia, o beemote e o
// leviatã. E em 42, a casa refeita: os irmãos que comem pão, a peça de dinheiro
// e o pendente de ouro, as três filhas nomeadas e a herança entre seus irmãos.
import type { StageInfo } from "@/lib/rpgStageInfo";

export const CHAPTER_ACTORS_29_42: Record<number, Record<string, StageInfo>> = {
  // ----------------------------------------------------------------- Jó 29
  29: {
    patriarca: {
      title: "Jó no monturo, lembrando em voz alta os meses passados — e os três amigos, que já não têm o que responder",
      subtitle: "Jó 29:1-2 • a cinzeira fora de Uz, e a memória de um homem que já foi o primeiro da cidade",
      text: "\"Ah! quem me dera ser como eu fui nos meses passados, como nos dias em que Deus me guardava!\" (Jó 29:2). O capítulo inteiro é lembrança, e é a única vez em que se vê como era a vida de Jó antes do capítulo 1: não um rico distante, mas o cidadão a quem a cidade inteira se levantava. Ele está de saco e cinza, e a `palette` que lhe tira a coroa e a auréola diz sem palavra nenhuma o que a lembrança está a medir — a distância entre o diadema de 29:14 e o pó de 30:19. Os três estão ali, calados: daqui até 31:40 é Jó sozinho.",
    },
    anciao: {
      title: "Os idosos que se levantavam e se punham em pé, os nobres cuja voz se calava, e os que pranteavam e Jó consolava",
      subtitle: "Jó 29:8-10,21-25 • a praça da porta de Uz, onde a idade tem cadeira e a autoridade se mede pelo silêncio dos outros",
      text: "Estes são os velhos do lugar, e o texto marca a reverência deles por um gesto que na Antiguidade era enorme: \"Os moços me viam, e se escondiam, e até os idosos se levantavam e se punham em pé\" (Jó 29:8) — a lei mandava o contrário, levantar-se diante do cabelo branco (Lv 19:32). Depois vem o mais fino: \"A voz dos nobres se calava\" (29:10). Não é medo, é peso. E ouviam de verdade (29:21-22). O último ancião é o que estava de luto, porque ele fechava a sessão \"como aquele que consola os que pranteiam\" (29:25) — que é o que os três vieram fazer e não fizeram.",
    },
    rei: {
      title: "Os príncipes que continham as suas palavras e punham a mão sobre a boca, e Jó habitando como rei entre as suas tropas",
      subtitle: "Jó 29:9,25 • o assento do chefe na rua de Uz, antes de tudo",
      text: "\"Os príncipes continham as suas palavras, e punham a mão sobre a sua boca\" (Jó 29:9). A mão sobre a boca é o gesto exato da submissão no Oriente antigo, e é o mesmo que fecha o livro pelo outro lado: diante do redemoinho, é Jó quem diz \"A minha mão ponho à boca\" (40:4). O capítulo termina na imagem mais alta que ele se permite: \"assentava-me como chefe, e habitava como rei entre as suas tropas\" (29:25). Ele não era rei — a frase é comparação, não título. Por isso a cena lhe dá o diadema de 29:14, que não é ouro: \"como manto e diadema era a minha justiça\".",
    },
    homem: {
      title: "O cego de quem Jó se fazia olhos, o coxo de quem se fazia pés, o miserável que clamava, o que ia perecendo, o moço que se escondia e o perverso cujos queixos ele quebrava",
      subtitle: "Jó 29:5,8,12-13,15,17,24 • os homens que passavam pela porta de Uz e o que ali lhes acontecia",
      text: "É o retrato mais concreto de justiça social que o livro tem, e nenhuma linha é abstrata. \"Eu me fazia de olhos para o cego, e de pés para o coxo\" (Jó 29:15) — não deu esmola ao cego, foi os olhos dele. \"eu livrava o miserável, que clamava, como também o órfão que não tinha quem o socorresse\" (29:12): livrar quem clama é tirá-lo da mão de alguém, e o versículo seguinte diz de quem — \"quebrava os queixos do perverso, e dos seus dentes tirava a presa\" (29:17), imagem de pastor a arrancar a ovelha da boca do lobo (1Sm 17:35; Am 3:12).",
    },
    servo: {
      title: "O servo que lavava os passos de Jó na manteiga, o que preparava a sua cadeira na rua, o órfão que não tinha quem o socorresse, o que trazia a causa desconhecida e o lavrador que esperava as suas palavras como a chuva tardia",
      subtitle: "Jó 29:6-7,12,16,23 • a casa e a rua de um homem que era pai dos necessitados",
      text: "\"Quando lavava os meus passos na manteiga, e da rocha me corriam ribeiros de azeite\" (Jó 29:6): é o modo hebraico de dizer fartura absurda. Todas as manhãs alguém saía antes dele e punha a cadeira na rua (29:7) — o tribunal aberto. Depois chegava a fila: o órfão sem quem falasse por ele (29:12) e o caso difícil, e aqui está a frase que o separa de um juiz comum: \"as causas de que eu não tinha conhecimento inquiria com diligência\" (29:16). E no fim do dia o lavrador: \"me esperavam, como à chuva; e abriam a sua boca, como à chuva tardia\" (29:23).",
    },
    mulherComum: {
      title: "A viúva cujo coração Jó fazia rejubilar, e as filhas de Jó em redor dele nos dias da sua mocidade",
      subtitle: "Jó 29:5,13 • a porta da cidade e a tenda sobre que estava o segredo de Deus",
      text: "\"A bênção do que ia perecendo vinha sobre mim, e eu fazia que rejubilasse o coração da viúva\" (Jó 29:13). Viúva, na sociedade antiga, é a pessoa sem representante legal. Fazer o coração dela cantar — o verbo é de alegria alta, não de alívio — significa que ela saía da porta da cidade com a causa ganha, e Jó torna a jurá-lo em 31:18. A outra mulher deste capítulo é a que já não existe: \"os meus filhos em redor de mim\" (29:5) — as três filhas que estavam na casa do irmão mais velho quando o vento derrubou os quatro cantos (1:18-19).",
    },
    multidao: {
      title: "Os que ouviam Jó e o tinham por bem-aventurado, e as tropas entre as quais ele habitava como rei",
      subtitle: "Jó 29:11,25 • a praça da porta cheia, no dia em que a cidade inteira lhe dava razão",
      text: "\"Ouvindo-me algum ouvido, me tinha por bem-aventurado; vendo-me algum olho, dava testemunho de mim\" (Jó 29:11). O versículo é feito de ouvido e olho, e não de nome: quem quer que ouvisse, quem quer que visse. É a reputação de um homem numa cidade pequena, medida pelo que os desconhecidos diziam dele. E o fecho: \"habitava como rei entre as suas tropas\" (29:25). Vale olhar esta multidão sabendo o que a espera no capítulo seguinte: a mesma cidade, o mesmo portão, e \"agora, porém, sou a sua canção, e lhes sirvo de provérbio\" (30:9).",
    },
  },

  // ----------------------------------------------------------------- Jó 30
  30: {
    patriarca: {
      title: "Jó lançado na lama, semelhante ao pó e à cinza, gritando ao céu que não responde",
      subtitle: "Jó 30:19-20 • o mesmo portão do capítulo 29, com a luz e o elenco invertidos",
      text: "Trinta e um versículos que são o negativo exato do capítulo anterior, e o mesmo homem no mesmo lugar. Ali os idosos se levantavam; aqui \"se riem de mim os de menos idade do que eu\" (Jó 30:1). Ali os passos lavados na manteiga; aqui \"Lançou-me na lama, e fiquei semelhante ao pó e à cinza\" (30:19). Ali a harpa; aqui \"A minha harpa se tornou em luto\" (30:31). No meio está a frase mais nua do livro: \"Clamo a ti, porém, tu não me respondes; estou em pé, porém, para mim não atentas\" (30:20). O céu de facto não responde — só em 38:1, e não com uma explicação.",
    },
    homem: {
      title: "Os de menos idade que se riem de Jó, cujos pais ele teria desdenhado de pôr com os cães do seu rebanho — os expulsos do meio dos homens, que apanhavam malvas e bramavam entre os arbustos",
      subtitle: "Jó 30:1-14 • os barrancos dos vales e as cavernas das rochas em volta de Uz, e a estrada por onde agora passa quem o despreza",
      text: "É a gente mais baixa que o livro descreve, e Jó descreve-a sem piedade: \"se riem de mim os de menos idade do que eu, cujos pais eu teria desdenhado de pôr com os cães do meu rebanho\" (Jó 30:1). São filhos de párias, que comem o que se colhe fora da agricultura (30:4) e a quem a cidade grita \"como contra o ladrão\" (30:5). Moram onde os bichos moram (30:6), e o verbo que Jó lhes dá não é humano: \"Bramavam entre os arbustos\" (30:7). Estes é que agora o insultam e lhe cospem no rosto (30:10). Não é só a dor que o quebra: é a ordem social invertida.",
    },
    anciao: {
      title: "O da congregação que ouve Jó clamar por socorro em pé, no meio de todos, e não se levanta",
      subtitle: "Jó 30:28 • a assembleia de Uz, onde a cadeira de Jó agora está vazia",
      text: "\"Denegrido ando, porém não do sol; levantando-me na congregação, clamo por socorro\" (Jó 30:28). É o mesmo lugar do capítulo 29 — a assembleia da porta, onde ele se assentava como chefe. Agora levanta-se ali e pede ajuda em voz alta, e o versículo não registra uma única resposta. \"Denegrido\" não é do sol: é a pele enegrecida pela doença (30:30) — ele entra na assembleia com o corpo a testemunhar contra ele. O homem que \"inquiria com diligência\" as causas alheias (29:16) é agora a causa que ninguém quer inquirir. Perdeu o direito de ser ouvido.",
    },
    mulherComum: {
      title: "A que se ajuntava debaixo das urtigas e comia as raízes dos zimbros, e a carpideira em cuja voz a harpa de Jó se tornou",
      subtitle: "Jó 30:4,7,31 • o ermo fora de Uz e a casa onde a música parou",
      text: "Duas mulheres, e são as duas pontas do capítulo. A primeira está no ermo com os expulsos: \"Apanhavam malvas junto aos arbustos, e o seu mantimento eram as raízes dos zimbros\" (Jó 30:4) — não são comida, são o que se rói quando não há comida —, e ajuntam-se \"debaixo das urtigas\" (30:7), onde nem o gado quer pastar. A segunda chora por ofício, e é a última imagem do capítulo: \"A minha harpa se tornou em luto, e o meu órgão em voz dos que choram\" (30:31). É a mesma imagem de Amós 8:10.",
    },
    servo: {
      title: "Os que se recolhiam para os lugares secos, tenebrosos, assolados e desertos, e os que se ajuntavam debaixo das urtigas",
      subtitle: "Jó 30:3,7 • os lugares assolados em volta de Uz, onde vive quem a cidade expulsou",
      text: "Não são servos de casa nenhuma: são os que trabalhariam se alguém os quisesse. \"De míngua e fome se debilitaram; e recolhiam-se para os lugares secos, tenebrosos, assolados e desertos\" (Jó 30:3) — e Jó diz-lhes na cara que a força das mãos deles já não vale nada (30:2). São \"filhos de gente sem nome, e da terra foram expulsos\" (30:8): sem nome, na Bíblia, é sem linhagem e sem quem responda por eles. Ele não os está a defender, está a medir a própria queda — mas quem lê o livro vê que o homem de 29:12 foi parar no mesmo monturo, e são estes que o cospem.",
    },
    rebanho: {
      title: "O rebanho de Jó, e os cães que o guardavam — os cães com que ele não teria posto os pais daquela gente",
      subtitle: "Jó 30:1 • o pasto dos sete mil ovelhas do primeiro estado de Jó",
      text: "\"cujos pais eu teria desdenhado de pôr com os cães do meu rebanho\" (Jó 30:1). O rebanho é o de 1:3 — \"sete mil ovelhas\" —, aquele que o fogo de Deus queimou com os pastores num só dia (1:16). Os cães entram aqui como unidade de medida do desprezo, e é preciso saber o que cão era naquele mundo: não animal de estimação, mas bicho de rua que come cadáver (1Rs 14:11; Sl 59:6). Dizer que não se poria alguém junto deles é dizer que nem para essa função serviria. O quadro é o pasto vazio que a memória de Jó ainda vê.",
    },
  },

  // ----------------------------------------------------------------- Jó 31
  31: {
    patriarca: {
      title: "Jó fazendo o juramento de inocência — quarenta versículos de \"se eu fiz isto, que me aconteça aquilo\" — até \"acabaram-se as palavras de Jó\"",
      subtitle: "Jó 31:1-40 • o monturo de Uz, na última fala que ele dará antes do redemoinho",
      text: "É a peça jurídica mais completa do Antigo Testamento e funciona como juramento de purificação: em vez de provar que é inocente, o acusado invoca sobre si a maldição correspondente a cada crime que nega (Jó 31:5,8; 31:9-10; 31:21-22). E pede o processo por escrito: \"que o meu adversário escreva um livro\" (31:35), que ele levaria ao ombro como coroa. A lista não é de crimes visíveis: é de olhos, de coração, do direito do servo, do bocado repartido. E o fim é a assinatura mais seca da Bíblia: \"Acabaram-se as palavras de Jó\" (31:40).",
    },
    homem: {
      title: "O viandante a quem Jó abria as portas, o que perecia por falta de roupa, o órfão que cresceu com ele como com seu pai, o dono da terra cuja alma ele não sufocou e o que tinha ódio dele e o mal o atingiu",
      subtitle: "Jó 31:8,10,18-19,29,32,39 • os homens que passaram pela porta e pelo campo de Jó, e a conta que ele faz de cada um",
      text: "Todo homem desta lista é uma oportunidade de pecar que Jó jura não ter tomado. O forasteiro é o primeiro: \"O estrangeiro não passava a noite na rua; as minhas portas abria ao viandante\" (Jó 31:32) — hospitalidade não era cortesia, era a diferença entre viver e morrer no ermo. Depois o que passa frio, aquecido com as peles dos cordeiros dele (31:19-20); o órfão criado em casa (31:18); e o inimigo, onde ele vai além da lei: \"Se me alegrei da desgraça do que me tem ódio\" (31:29; cf. Pv 24:17; Mt 5:44).",
    },
    servo: {
      title: "O servo e a serva cujo direito Jó não desprezou, o órfão que comeu do seu bocado, a gente da sua tenda e o lavrador cujos frutos ele não comeu sem dinheiro",
      subtitle: "Jó 31:13-17,31,39 • a tenda, a mesa e o campo de Jó, e o direito de quem trabalhava neles",
      text: "O versículo 13 é dos mais radicais do Antigo Testamento: \"Se desprezei o direito do meu servo ou da minha serva, quando eles contendiam comigo\". Contender com o senhor é o servo abrir processo contra o dono — coisa que o direito antigo não previa. Jó admite o processo e dá a razão: \"Aquele que me formou no ventre não o fez também a ele?\" (31:15; cf. Pv 22:2; Ef 6:9). Na mesa, a mesma lógica: \"se, sozinho comi o meu bocado, e o órfão não comeu dele\" (31:17) — comer sozinho é o pecado, não a riqueza. E no campo, o salário que não se retém (31:39; cf. Tg 5:4).",
    },
    mulherComum: {
      title: "A virgem em que Jó não fixou os olhos, a serva cujo direito ele não desprezou, a viúva de quem foi guia — e a sua própria mulher, na maldição que ele invoca sobre si",
      subtitle: "Jó 31:1,9-10,13,16,18 • a aliança feita com os olhos, e a única maldição que Jó põe sobre outra pessoa",
      text: "O capítulo abre pela intenção, não pelo ato: \"Fiz aliança com os meus olhos; como, pois, os fixaria numa virgem?\" (Jó 31:1) — o mesmo território de Mt 5:28. Adiante, o pecado hipotético é com mulher casada, e a maldição correspondente é a mais brutal do capítulo, porque cai sobre a esposa dele (31:10). A serva aparece com direito de processo, ao lado do servo (31:13), fundamentado no ventre em que Deus formou os dois. E a viúva aparece duas vezes (31:16,18). A lei repete a mesma tríade: o estrangeiro, o órfão e a viúva (Dt 24:17).",
    },
    anciao: {
      title: "Os juízes a quem pertence o delito da infâmia — os que julgariam Jó se alguma coisa daquela lista fosse verdade",
      subtitle: "Jó 31:11,28 • o tribunal da porta de Uz, invocado por um réu que quer ser processado",
      text: "Duas vezes o juramento se interrompe para nomear o foro. No adultério: \"é delito pertencente aos juízes\" (Jó 31:11). Na idolatria secreta do sol e da lua: \"Também isto seria delito à punição de juízes\" (31:28). Jó está a dizer que aqueles pecados não são assunto de consciência particular — têm pena legal, e ele aceita o tribunal. É o oposto do que os amigos supõem: Elifaz acusou-o à distância, sem instrução nenhuma (22:5). Estes anciãos são os do capítulo 29, que no 30 o viram clamar sem que ninguém se mexesse. Agora ele chama-os, e nenhum vem.",
    },
    multidao: {
      title: "A grande multidão que Jó temia, e o desprezo das famílias que o apavorava — o medo que ele jura não ter tido",
      subtitle: "Jó 31:34 • a praça cheia de Uz, e a porta de que ele não se calou",
      text: "Perto do fim da lista aparece um pecado que quase nenhuma lei antiga previa: a covardia social. \"Porque eu temia a grande multidão, e o desprezo das famílias me apavorava, e eu me calei, e não saí da porta\" (Jó 31:34). A frase está na forma condicional do juramento, e o que nega é o silêncio de quem sabe da injustiça e não vai à porta dizê-la, com medo do que as famílias importantes vão comentar. Para quem se assentava como chefe (29:25), era o pecado mais fácil e mais invisível: bastava não aparecer (cf. Is 1:23; Pv 31:8).",
    },
  },

  // ----------------------------------------------------------------- Jó 32
  32: {
    homem: {
      title: "Eliú, filho de Baraquel, o buzita, da família de Rão — o quinto homem do monturo, o único moço no meio de quatro velhos; e o homem em quem há um espírito",
      subtitle: "Jó 32:2-9,18-19 • a cinzeira de Uz, no silêncio que se abre quando os três param de responder",
      text: "\"Então aqueles três homens cessaram de responder a Jó\" (Jó 32:1) — e no silêncio levanta-se alguém que ninguém apresentara e que estava ali desde o capítulo 3. É `homem` e não `patriarca` porque o texto insiste nisso: \"Eu sou de menos idade, e vós sois idosos\" (32:6). A ira dele acende-se por motivos opostos: contra Jó, que \"se justificava a si mesmo, mais do que a Deus\", e contra os três, que \"condenavam a Jó\" sem ter o que responder (32:2-3). E a tese que o autoriza é nova no livro: \"há um espírito no homem, e a inspiração do TodoPoderoso o faz entendido\" (32:8).",
    },
    patriarca: {
      title: "Jó, justo aos seus próprios olhos, e os três amigos que cessaram de responder — pasmados, sem palavras",
      subtitle: "Jó 32:1,12,15-16 • o monturo, no fim do debate e antes da resposta do céu",
      text: "Os quatro velhos estão em cena e nenhum fala neste capítulo. Jó calou-se em 31:40 e não voltará a abrir a boca até 40:3. Os três ficaram sem argumento, e o texto diz isso três vezes, o que é raro (Jó 32:1,12,15). Eliú ainda lhes tira a última saída, que era atribuir o fim do debate a uma vitória teológica: \"Para que não digais: Achamos a sabedoria; Deus o derrubou, e não homem algum\" (32:13). No palco, os quatro estão sentados nas pedras da roda, e Jó continua de saco e cinza — não voltou ao seu traje desde 1:20, e só sairá dele em 42:10.",
    },
    anciao: {
      title: "Os anciãos de Uz, cujos dias deviam falar e cuja multidão de anos devia ensinar a sabedoria",
      subtitle: "Jó 32:6-7 • a praça da porta, onde a idade tinha o direito da primeira palavra",
      text: "\"Dizia eu: Falem os dias, e a multidão dos anos ensine a sabedoria\" (Jó 32:7). É a regra inteira daquela cultura numa linha, e é por ela que Eliú passou trinta capítulos calado no fundo do quadro: quem se assenta à porta e fala primeiro é o velho (Lv 19:32; Pv 16:31). O que ele faz em seguida é derrubar a regra sem faltar ao respeito: esperou tudo o que devia, e então diz \"Os grandes não são os sábios, nem os velhos entendem o que é direito\" (32:9). A sabedoria não vem do tempo, vem do sopro (32:8).",
    },
    servo: {
      title: "O servo que guarda os odres novos do mosto, cheios e sem respiradouro, prestes a arrebentar",
      subtitle: "Jó 32:19 • a adega de Uz, no retrato que Eliú faz de si mesmo",
      text: "\"Eis que dentro de mim sou como o mosto, sem respiradouro, prestes a arrebentar, como odres novos\" (Jó 32:19). Quem cuidava do vinho conhecia o perigo: mosto é suco em fermentação, e a fermentação faz gás; um odre novo aguenta a pressão, um já usado rasga — a figura de Mt 9:17. Eliú inverte-a: ele é o odre novo, cheio até em cima, e o que lhe falta é a abertura. Por isso o versículo seguinte é alívio pedido, não bravata (32:20). E promete o que nenhum dos três prometeu: \"não sei usar de lisonjas\" (32:22).",
    },
  },

  // ----------------------------------------------------------------- Jó 33
  33: {
    homem: {
      title: "Eliú, formado do barro como Jó; o homem sobre quem cai sono profundo, o que na cama é castigado com dores, o que tem os pés postos no tronco, e aquele a quem o intérprete declara a sua retidão",
      subtitle: "Jó 33:6,11,15,19,23-25 • as duas maneiras de Deus falar — o sonho da noite e a dor na cama",
      text: "Eliú é o único que chama Jó pelo nome, e a primeira coisa que faz é tirar-se do pedestal: \"Eis que vim de Deus, como tu; do barro também eu fui formado\" (Jó 33:6). Depois cita Jó de cor, inclusive a queixa do cepo (33:11), e responde que Deus fala de dois modos. O primeiro é o sonho, e a finalidade não é informar, é desviar (33:15-17). O segundo é a dor, descrita de dentro do corpo (33:19-21). E entre a cova e o homem entra a figura mais surpreendente do bloco: \"um intérprete, um entre milhares... já achei resgate\" (33:23-24) — o eco mais próximo do único Mediador (1Tm 2:5-6).",
    },
    patriarca: {
      title: "Jó, chamado pelo nome — \"Assim, na verdade, ó Jó, ouve as minhas razões\" — e os três amigos calados a ouvir",
      subtitle: "Jó 33:1,31-33 • o monturo, no primeiro discurso que trata Jó como interlocutor e não como réu",
      text: "\"Assim, na verdade, ó Jó, ouve as minhas razões\" (Jó 33:1). Nos vinte e nove capítulos anteriores, nenhum dos três amigos chamou Jó pelo nome uma única vez. O moço começa pelo nome e acaba com uma frase que nenhum deles disse: \"fala, porque desejo justificar-te\" (33:32) — quero que saias daqui com razão. O que ele contesta é uma coisa só, e bem escolhida: não o sofrimento, mas a acusação de que Deus se calou. \"Antes Deus fala uma e duas vezes; porém ninguém atenta para isso\" (33:14). Jó continua de saco e cinza, sem um único balão neste bloco.",
    },
    servo: {
      title: "O guarda que observa todas as veredas do preso no tronco, o servo que traz a comida apetecível que o doente recusa, e o moço que ouviu no vale a confissão do restituído",
      subtitle: "Jó 33:11,20,27 • o cepo, a cabeceira e a praça — os três lugares em que o capítulo se passa",
      text: "Três serviços humildes, e cada um é uma cena inteira. O primeiro é o carcereiro da imagem que Jó usou contra Deus: \"Põe no tronco os meus pés\" (Jó 33:11) — o cepo de Jr 20:2 e At 16:24; o guarda que anota cada passo é um Deus sentido como vigia e não como pai. O segundo está à cabeceira: \"a sua vida abomina até o pão, e a sua alma a comida apetecível\" (33:20) — alguém leva o melhor prato da casa e o doente vira o rosto. O terceiro está na rua, quando o curado confessa em público o que fez em segredo (33:27-28).",
    },
  },

  // ----------------------------------------------------------------- Jó 34
  34: {
    homem: {
      title: "Eliú falando aos sábios; e os homens da sua tese — o poderoso tomado não por mão humana, o forte quebrantado sem inquirição, o que voltou para o pó, o ímpio batido à vista dos espectadores e o que procura esconderijo onde não há trevas",
      subtitle: "Jó 34:14-15,20,22,24-26 • o tribunal que Eliú monta no monturo, com o mundo inteiro por prova",
      text: "Neste capítulo Eliú deixa de falar a Jó e vira-se para a assistência (Jó 34:2). A tese é a justiça de Deus (34:10) e a prova é a dependência absoluta de tudo o que respira: \"Se ele... recolhesse para si o seu espírito e o seu fôlego, Toda a carne juntamente expiraria\" (34:14-15). Não é preciso que Deus faça nada para acabar o mundo: basta que retome o que emprestou (cf. Sl 104:29). Daí sai o resto: o poderoso tomado \"não por mão humana\" (34:20), o forte deposto sem processo (34:24), o que se esconde onde não há trevas (34:22). E o veredito mais duro do moço (34:35).",
    },
    anciao: {
      title: "Os sábios e os entendidos a quem Eliú declara as suas razões, e os homens de entendimento que hão de julgar com ele",
      subtitle: "Jó 34:2-4,10,16,34 • a roda dos que ouvem, e o rolo das razões aberto no alpendre",
      text: "\"Ouvi, vós, sábios, as minhas razões\" (Jó 34:2). Eliú muda de destinatário e, com isso, o gênero do discurso: já não é conversa de cabeceira, é sessão pública. A imagem do método é doméstica e exata: \"o ouvido prova as palavras, como o paladar experimenta a comida\" (34:3) — mastigar antes de engolir, a mesma figura de Hb 5:14. A proposta é de júri, não de sermão (34:4). E no fim reclama o veredito da assistência (34:34-35). A ironia é que o Juiz que eles supõem representar dará, no capítulo 42, uma sentença que nenhum deles previu.",
    },
    rei: {
      title: "O rei a quem não se diria \"Oh! Vil\", os príncipes a quem não se diria \"Oh! ímpios\" — e o homem hipócrita que nunca mais há de reinar",
      subtitle: "Jó 34:18-19,30 • a corte que Eliú convoca só para mostrar que o trono não protege ninguém",
      text: "O argumento é de escada: se nem a um rei se atira à cara \"Oh! Vil\", nem aos príncipes \"Oh! ímpios\" (Jó 34:18), quanto menos a Deus — e a razão de Deus estar acima disso não é ser mais alto, é não ter preferidos: \"não faz acepção das pessoas de príncipes, nem estima o rico mais do que o pobre; porque todos são obras de suas mãos\" (34:19). É a mesma frase com que Jó defendeu o direito do servo (31:15) e a que o Novo Testamento repete (At 10:34). Do outro lado da escada está o trono que cai: \"Para que o homem hipócrita nunca mais reine\" (34:30).",
    },
    servo: {
      title: "O pobre cujo clamor subiu até ele, os aflitos que ele ouviu, o povo perturbado à meia-noite e o povo livrado dos laços do hipócrita",
      subtitle: "Jó 34:19-20,28,30 • as ruas da cidade em que o argumento de Eliú se verifica",
      text: "A prova de que Deus julga com retidão, para Eliú, não está no céu: está em quem é ouvido. \"De sorte que o clamor do pobre subisse até ele, e que ouvisse o clamor dos aflitos\" (Jó 34:28). Este pobre é o de 34:19, e o argumento que o protege é o mais simples: o rico não vale mais, \"porque todos são obras de suas mãos\". Depois há o povo que acorda no meio de uma queda de governo, \"até à meia-noite\" (34:20) — a hora bíblica das viradas súbitas (Êx 12:29; At 16:25). E o povo do lado de fora da armadilha desmontada (34:30). São estes que sustentam a tese do capítulo.",
    },
    mulherComum: {
      title: "A aflita cujo clamor ele ouviu, e a mulher cuja carne expiraria juntamente com toda a carne se Deus recolhesse o seu fôlego",
      subtitle: "Jó 34:15,28 • o pátio de onde sobe o clamor, e a criatura inteira dependurada num sopro",
      text: "\"E que ouvisse o clamor dos aflitos\" (Jó 34:28): a palavra abrange quem não tem a quem recorrer, e na sociedade antiga isso quer dizer, antes de tudo, a mulher sem marido e sem filho adulto — a mesma viúva de 31:16 e 29:13. O clamor sobe: é a linguagem do sangue de Abel (Gn 4:10) e do gemido no Egito (Êx 2:23), e em ambos o texto diz que Deus ouviu. A outra imagem em que ela está incluída é a mais universal do capítulo: \"Toda a carne juntamente expiraria\" (34:15) — o rico e a aflita do pátio no mesmo instante.",
    },
    pastor: {
      title: "O pastor do vale — a quem se pergunta quem lhe entregou o governo da terra",
      subtitle: "Jó 34:13 • a encosta em volta de Uz, na pergunta que não tem resposta humana",
      text: "\"Quem lhe entregou o governo da terra? E quem fez todo o mundo?\" (Jó 34:13). A pergunta é de procuração: um administrador responde perante quem o nomeou, e Eliú mostra que sobre Deus não há nomeante nenhum — não há a quem Ele preste contas, e por isso não há como acusá-lo de abuso de mandato. A figura em cena é quem recebe terra para guardar e a devolve com contas: o pastor a quem se entrega um vale e um prazo (cf. Gn 2:15; Mt 25:14). A diferença é o degrau de cima: o pastor tem dono, e o Dono não tem (cf. Jó 38:4).",
    },
    patriarca: {
      title: "Jó, de quem Eliú diz que bebe a zombaria como água, e os três amigos que já não respondem",
      subtitle: "Jó 34:5-9,35-37 • o monturo, no capítulo em que Jó é julgado à revelia sem se defender",
      text: "Eliú faz o que nenhum dos três fez: cita Jó textualmente antes de o contradizer. \"Porque Jó disse: Sou justo, e Deus tirou o meu direito\" (Jó 34:5) — e é verdade, está em 27:2. E também a frase mais perigosa que Jó soltou: \"De nada aproveita ao homem o comprazer-se em Deus\" (34:9), que é, palavra por palavra, a tese que Satanás propôs no capítulo 1. Sobre isso Eliú é severo (34:7-8) e pede que a prova continue (34:36). Jó não responde uma palavra — está calado desde 31:40 —, e o leitor sabe o que nenhum dos cinco sabe (42:7-8).",
    },
  },

  // ----------------------------------------------------------------- Jó 35
  35: {
    homem: {
      title: "Eliú mandando olhar para as mais altas nuvens; o outro tal como tu a quem a tua impiedade faria mal, o grande cujo braço oprime, e o homem que recebe salmos durante a noite",
      subtitle: "Jó 35:5-10 • o capítulo mais curto e mais frio do bloco, e a única linha quente que há nele",
      text: "O argumento de Jó 35 é uma correção de escala, e começa mandando levantar a cabeça: \"Atenta para os céus, e vê; e contempla as mais altas nuvens, que são mais altas do que tu\" (35:5). Daí as perguntas gêmeas: \"Se pecares, que efetuarás contra ele?... Se fores justo, que lhe darás?\" (35:6-7). A resposta dá a este homem o seu lugar: \"A tua impiedade faria mal a outro tal como tu\" (35:8) — o que não é indiferença de Deus, é dignidade do próximo. Depois vem o oprimido que clama sem rezar (35:9-10), e o capítulo frio solta a sua única imagem quente: Deus \"dá salmos durante a noite\".",
    },
    servo: {
      title: "O oprimido que clama por causa do braço dos grandes, e não é respondido por causa da arrogância dos maus",
      subtitle: "Jó 35:9,12-13 • o pátio dos que gritam, no capítulo em que o grito não basta",
      text: "\"Por causa das muitas opressões os homens clamam por causa do braço dos grandes\" (Jó 35:9). O braço dos grandes é o poder concreto do credor e do magistrado — o mesmo que Jó jurou nunca ter levantado contra o órfão (31:21). O clamor é legítimo, e a Escritura garante que Deus o ouve (Êx 3:7; Tg 5:4). O que Eliú acrescenta é duro: existe um grito que é só dor e não procura ninguém — \"ninguém diz: Onde está Deus que me criou\" (35:10). Se o argumento é justo com Jó é outra questão: em 42:7 o SENHOR não dirá que Jó falou de menos, dirá que os outros falaram errado.",
    },
    mulherComum: {
      title: "A aflita do pátio que clamou junto com os oprimidos por causa do braço dos grandes",
      subtitle: "Jó 35:9-10 • a mesma opressão vista de quem tem ainda menos recurso",
      text: "\"Por causa das muitas opressões os homens clamam por causa do braço dos grandes\" (Jó 35:9). No pátio de onde sobe esse clamor está quem, naquela sociedade, tinha menos meio de resistir a um braço forte: a mulher sem quem a defendesse. É dela que a lei fala ao ameaçar o opressor com a viuvez das próprias mulheres (Êx 22:22-24). Eliú não nega a legitimidade do clamor; aponta o que falta nele (35:10). É censura que soa fria dita a quem está debaixo do braço — e traz escondida a promessa de que há canção que se dá de noite.",
    },
    rebanho: {
      title: "Os animais da terra e as aves dos céus, a quem Deus também ensina — mas menos do que ao homem",
      subtitle: "Jó 35:11 • o pasto e o bando, na comparação que mede o que o homem recebeu",
      text: "\"Que nos ensina mais do que aos animais da terra e nos faz mais sábios do que as aves dos céus?\" (Jó 35:11). O versículo pressupõe que o bicho também é ensinado — o instinto da cegonha (Jr 8:7) e o da formiga (Pv 6:6-8) é instrução de Deus — e afirma que ao homem foi dado mais. Esse mais é o que Eliú acusa Jó de não usar: perguntar \"Onde está Deus que me criou\" (35:10). O animal geme sem endereço porque não tem outro; o homem, que tem, faz o mesmo. Isaías fará a comparação virar acusação (Is 1:3).",
    },
    patriarca: {
      title: "Jó, de quem Eliú diz que em vão abre a sua boca e sem ciência multiplica palavras",
      subtitle: "Jó 35:2-4,16 • o monturo, no capítulo em que a acusação se afina",
      text: "Eliú abre o capítulo repetindo o que ouviu de Jó, e afina a acusação a um ponto que os três nunca alcançaram: \"Tens por direito dizeres: Maior é a minha justiça do que a de Deus?\" (Jó 35:2). Jó nunca disse a frase assim, mas disse coisas que a implicam (34:5), e é sobre a implicação que o moço trabalha. Anuncia que a resposta é para os quatro (35:4) — os três velhos continuam calados. E o fecho é o veredito mais curto do bloco: \"Logo Jó em vão abre a sua boca, e sem ciência multiplica palavras\" (35:16) — palavra por palavra o que o SENHOR dirá em 38:2.",
    },
  },

  // ----------------------------------------------------------------- Jó 36
  36: {
    homem: {
      title: "O preso em grilhões, amarrado com cordas de aflição, a quem Deus abre o ouvido pela própria corda; o convidado à mesa cheia de gordura em lugar espaçoso; e o que não ouviu e à espada foi passado",
      subtitle: "Jó 36:8-16 • a cadeia, a mesa e o campo, nos três desfechos que Eliú põe lado a lado",
      text: "A parte mais original do discurso de Eliú está aqui, e nenhum dos três a teve: a aflição não é só castigo, é comunicação. \"E se estão presos em grilhões... Abre-lhes também os seus ouvidos, para sua disciplina\" (Jó 36:8-10) — o ouvido abre-se pela mesma corda que aperta, doutrina que Hb 12:5-11 desenvolverá e que Sl 119:71 resume. Dali saem duas estradas: quem ouve acaba \"os seus anos em delícias\" (36:11) e à mesa larga (36:16); quem não ouve, \"à espada serão passados\" (36:12). O que Eliú não vê é que a aflição de Jó não estava em nenhuma das duas colunas.",
    },
    servo: {
      title: "O aflito a quem ele livra da sua aflição e na opressão se revela aos ouvidos; o homem sobre quem as nuvens gotejam abundantemente; e o tesoureiro do ouro que não compra livramento nenhum",
      subtitle: "Jó 36:15,19,28 • a porta, a arca do tesouro e o campo debaixo da chuva",
      text: "\"Ao aflito livra da sua aflição, e na opressão se revela aos seus ouvidos\" (Jó 36:15). A frase é de uma precisão notável: não diz que Deus se revela DEPOIS da opressão, diz que se revela NELA — dentro do aperto, e pelo ouvido. É o miolo de toda a teologia de Eliú. Contra isso ele põe o que não serve: \"nem ouro, nem todas as forças do poder\" (36:19; cf. 1Pe 1:18). E o terceiro servo está no campo, recebendo de graça o que o ouro não compra: a chuva destilada do vapor (36:27-28). Daí em diante o discurso deixa de argumentar e vira hino.",
    },
    anciao: {
      title: "O velho que acabou os seus dias em bem, o conselheiro que viu o justo ser exaltado e o homem que se lembrou de engrandecer a obra que todos contemplam",
      subtitle: "Jó 36:7,11,24-25 • o trono dos justos e o mirante de onde se vê a obra",
      text: "Eliú tem uma versão do fim da vida do justo, e é a que Jó julgava ter perdido: \"Do justo não tira os seus olhos; antes estão com os reis no trono\" (Jó 36:7), e \"acabarão seus dias em bem\" (36:11). É boa doutrina em geral e péssima aplicada ao homem sentado à frente dele — e o livro acaba dando razão à doutrina no caso concreto (42:17), só que por um caminho que ele não previu. O outro ancião é o que sabe olhar: \"Lembra-te de engrandecer a sua obra, que os homens contemplam\" (36:24) — o ofício do louvor, que prepara para ouvir o trovão como voz e não como ruído.",
    },
    pastor: {
      title: "O pastor que viu o temporal subir, avisado pelo gado; o que recebeu a chuva na encosta; e o pastor do vale a quem Deus, sendo mui grande, não despreza",
      subtitle: "Jó 36:5,27-28,33 • a encosta em volta de Uz, no vestíbulo do redemoinho",
      text: "O pastor é a figura certa para o fim deste capítulo, porque o fim deste capítulo é meteorologia: \"faz miúdas as gotas das águas que, do seu vapor, derramam a chuva\" (Jó 36:27-28) — o ciclo inteiro descrito com uma exatidão que só quem vive fora de casa tem. E o remate é o versículo mais estranho e mais bonito: \"O que nos dá a entender o seu pensamento, como também ao gado, acerca do temporal que sobe\" (36:33). O gado sente a tempestade antes do homem, e Eliú diz que esse pressentimento é aviso de Deus. Quem pastoreia lê o rebanho como quem lê o céu (cf. 36:5).",
    },
    rebanho: {
      title: "O gado que dá notícia do temporal que sobe",
      subtitle: "Jó 36:33 • a última imagem do capítulo, e a porta de entrada do trovão",
      text: "\"O que nos dá a entender o seu pensamento, como também ao gado, acerca do temporal que sobe\" (Jó 36:33). É um dos versículos mais curiosos do Antigo Testamento: o gado é posto como destinatário de um aviso divino, a par do homem. Qualquer criador conhece o fenômeno — o rebanho inquieta-se e procura o abrigo antes de a primeira nuvem escurecer. Eliú lê nisso um pensamento comunicado, e não um reflexo: o mesmo Deus que abre o ouvido do preso pela corda (36:10) dá notícia da tempestade ao boi (cf. Jr 8:7; Is 1:3).",
    },
    rei: {
      title: "Os reis em cujo trono Deus assenta os justos para sempre",
      subtitle: "Jó 36:7 • o trono, na única promessa alta que Eliú faz",
      text: "\"Do justo não tira os seus olhos; antes estão com os reis no trono; ali os assenta para sempre\" (Jó 36:7). É promessa de reversão social completa, e ecoa o cântico de Ana (1Sm 2:8) e o Salmo 113:7-8, que usam a mesma palavra: monturo. A ironia é violenta, porque o homem a quem Eliú diz isto está literalmente sentado num. Lido do fim do livro para trás, o versículo não estava errado (42:17) — estava errado no uso: Eliú faz da promessa uma condição, e Deus cumpre-a como puro dom, depois de Jó orar pelos que o acusaram (42:10).",
    },
    mulherComum: {
      title: "A aflita a quem ele faz justiça, e a quem se revela aos ouvidos dentro da própria opressão",
      subtitle: "Jó 36:6,15 • a porta onde a causa dos que não têm ninguém é julgada",
      text: "\"Ele não preserva a vida do ímpio, e faz justiça aos aflitos\" (Jó 36:6). É o par que a Escritura repete de ponta a ponta (Dt 10:18; Sl 103:6). A figura em cena é a que estava por trás de todo o capítulo 31: a mulher sem marido, cuja causa se decide à porta e cujo penhor se toma sem que ela tenha como reclamar. O que Eliú acrescenta é mais interior do que jurídico: \"na opressão se revela aos seus ouvidos\" (36:15) — dentro do aperto. É a única coisa que Jó, que clamou \"tu não me respondes\" (30:20), precisaria mesmo de ouvir.",
    },
    multidao: {
      title: "Os povos a quem ele julga por estas coisas e a quem dá mantimento em abundância",
      subtitle: "Jó 36:31 • a chuva sobre as nações, no mesmo gesto com que as julga",
      text: "\"Porque por estas coisas julga os povos e lhes dá mantimento em abundância\" (Jó 36:31). O versículo põe as duas coisas na mesma mão e no mesmo instrumento: a mesma nuvem que julga é a que alimenta. Chuva a tempo é colheita; a falta dela é fome — por isso a bênção e a maldição de Dt 28 se decidem sobre o céu. A multidão em cena é a humanidade inteira debaixo de um céu carregado: Eliú saiu do caso de Jó para o governo do mundo. Jesus dirá o mesmo com a mesma imagem (Mt 5:45), e Paulo em Listra resumirá o capítulo numa frase (At 14:17).",
    },
    patriarca: {
      title: "Jó, a quem Eliú diz \"espera-me um pouco\", e os três amigos no monturo já debaixo da nuvem",
      subtitle: "Jó 36:2-4 • a cinzeira de Uz, no último trecho antes de o céu tomar a palavra",
      text: "\"Espera-me um pouco, e mostrar-te-ei que ainda há razões a favor de Deus\" (Jó 36:2). O moço pede mais tempo — o discurso já vai no quinto capítulo — e faz uma afirmação de si quase impertinente: \"contigo está um que tem perfeito conhecimento\" (36:4). Jó continua calado, de saco e cinza, desde 31:40; os três, desde 25:6. O que muda no palco não é o elenco, é o céu: a tempestade sobe capítulo a capítulo e o gado dá notícia dela em 36:33. Este é o último capítulo em que um homem explica Deus a Jó.",
    },
  },

  // ----------------------------------------------------------------- Jó 37
  37: {
    homem: {
      title: "Eliú com o coração a tremer e a saltar do seu lugar; e o homem que não estendeu os céus com ele, que nada pode pôr em boa ordem por causa das trevas e que não tem notícia do equilíbrio das grossas nuvens",
      subtitle: "Jó 37:1,16,18-19 • o trovão sobre Uz, no capítulo que é todo vestíbulo do redemoinho",
      text: "\"Sobre isto também treme o meu coração, e salta do seu lugar\" (Jó 37:1). O capítulo começa com o corpo do orador a reagir, e daí em diante é tudo imagem: \"ruge uma voz; ele troveja com a sua voz majestosa\" (37:4). O trovão como voz é o modo bíblico de dizer presença (Êx 19:16-19; Jo 12:29). E o homem, aqui, é sempre o que não sabe (37:16,18) — \"espelho fundido\" é bronze polido, e diz que o céu tem a solidez de uma peça de fundição. O rendimento final: \"nós nada poderemos pôr em boa ordem, por causa das trevas\" (37:19).",
    },
    servo: {
      title: "O lavrador cuja mão foi selada pela neve, o que pisou as largas águas congeladas, o viajante apanhado pelo tufão da recâmara do sul e aquele cujas roupas aquecem quando do sul há calma",
      subtitle: "Jó 37:7-10,17,21 • o campo parado pelo inverno, quando Deus sela a mão de todo o homem",
      text: "\"Ele sela as mãos de todo o homem, para que conheçam todos os homens a sua obra\" (Jó 37:7). Selar a mão é parar o trabalho: quando a neve cai, o lavrador não sai, e o ócio forçado tem finalidade — que o homem, sem nada para fazer com as mãos, veja o que Deus faz. \"Porque à neve diz: Cai sobre a terra\" (37:6): à neve se DIZ, e ela cai (cf. Sl 147:16-18). Depois o frio endurece a água (37:10) e os ventos entram pelo par cardeal (37:9,17). E no fim o sol depois do temporal, forte demais para se olhar (37:21).",
    },
    pastor: {
      title: "O pastor que viu as feras entrarem nos seus esconderijos, e o que recebeu a chuva por misericórdia",
      subtitle: "Jó 37:8,13 • a encosta em volta de Uz, entre a tempestade e a graça",
      text: "\"E as feras entram nos seus esconderijos e ficam nas suas cavernas\" (Jó 37:8). É o quadro que segue o selar das mãos do homem: quando o temporal sobe, o mundo recolhe-se — o lavrador para, o bicho entra, e o pastor é o único que ainda está fora, a contar o rebanho. E é ele quem entende o versículo mais teológico do capítulo: \"Seja que por vara, ou para a sua terra, ou por misericórdia as faz vir\" (37:13). Castigo, providência ou dom — e nenhum dos três se distingue pelo aspecto da nuvem. Quem vive de chuva sabe disso melhor do que quem discute sobre ela.",
    },
    anciao: {
      title: "O homem de Uz que teme o Todo-Poderoso — e a quem Deus não respeita quando se julga sábio de coração",
      subtitle: "Jó 37:23-24 • o fecho do discurso de Eliú, e o último versículo humano antes do redemoinho",
      text: "\"Ao Todo-Poderoso não podemos alcançar; grande é em poder; porém a ninguém oprime em juízo... ele não respeita os que se julgam sábios de coração\" (Jó 37:23-24). São as últimas palavras que um homem diz neste livro antes de Deus falar, e são duas: Ele é inalcançável, e não oprime ninguém. O temor que daí decorre é o de 28:28, e a ferroada final apanha os três velhos da roda e, se ele soubesse, o próprio Eliú. O ancião em cena é o que sabe temer sem entender. E na linha seguinte: \"Depois disto o SENHOR respondeu a Jó de um redemoinho\" (38:1).",
    },
    patriarca: {
      title: "Jó, a quem se manda parar e considerar as maravilhas de Deus, e os três amigos debaixo do temporal",
      subtitle: "Jó 37:14 • o monturo de Uz já dentro da tempestade, no beat que entrega o palco ao capítulo 38",
      text: "\"A isto, ó Jó, inclina os teus ouvidos; para, e considera as maravilhas de Deus\" (Jó 37:14). É a última coisa que se pede a Jó antes de o céu tomar a palavra, e é um mandado de duas sílabas no meio de um hino: PARA. Depois vêm sete perguntas seguidas que são, em forma e em tom, o ensaio exato do interrogatório do redemoinho. Jó não responde a nenhuma; está calado desde 31:40 e continuará até 40:3. É deste quadro que o próximo versículo parte: \"Depois disto o SENHOR respondeu a Jó de um redemoinho\" (38:1).",
    },
  },

  // ----------------------------------------------------------------- Jó 38
  38: {
    patriarca: {
      title: "Jó, mandado cingir os lombos como homem — e os três amigos, testemunhas mudas da resposta que nenhum deles pediu",
      subtitle: "Jó 38:1-3 • o monturo debaixo do redemoinho, no capítulo em que o céu finalmente fala e não responde nada do que se perguntou",
      text: "\"Depois disto o SENHOR respondeu a Jó de um redemoinho... Quem é este que escurece o conselho com palavras sem conhecimento? Agora cinge os teus lombos, como homem\" (Jó 38:1-3). Trinta e cinco capítulos de homens a discutir, e a resposta vem — mas não responde a nenhuma das perguntas de Jó. O que vem é um interrogatório sobre a criação. Importa ver como a cena o desenha: o redemoinho é o MODO da voz, não um mensageiro — não há anjo nem objeto que fale por Ele. O balão é dourado, centralizado e SEM figura; Deus não é desenhado uma única vez.",
    },
    homem: {
      title: "Os ímpios que a alva sacode das extremidades da terra, aquele de quem se desvia a sua luz e o braço altivo que se quebranta — e Eliú, calado, no primeiro versículo em que o céu fala",
      subtitle: "Jó 38:12-15 • a madrugada que pega na terra pelas pontas e a sacode como quem sacode um pano",
      text: "A imagem é doméstica e assustadora ao mesmo tempo: a madrugada pega a terra pelas bordas e sacode-a, e o que cai são os que trabalham de noite. \"Para que pegasse nas extremidades da terra, e os ímpios fossem sacudidos dela\" (Jó 38:13). O ladrão e o adúltero são gente do escuro, como o próprio Jó dissera (24:15), e a luz do dia é o que os desmancha (38:15). Junto vem a metáfora do selo: a terra, sem relevo de noite, recebe forma com a primeira luz como o barro que o carimbo imprime (38:14).",
    },
  },

  // ----------------------------------------------------------------- Jó 39
  39: {
    rebanho: {
      title: "As cabras montesas que parem no rochedo, as cervas nas suas dores, e os filhos que enrijam, saem e nunca mais tornam para elas",
      subtitle: "Jó 39:1-4 • o rochedo alto, no primeiro quadro do bestiário do redemoinho",
      text: "\"Sabes tu o tempo em que as cabras montesas têm filhos...? Contarás os meses que cumprem?\" (Jó 39:1-2). A pergunta é escolhida com cuidado: o parto da cabra do rochedo acontece onde nenhum pastor chega, sem ninguém para contar os meses, sem testemunha — e acontece certo. Depois vem o desfecho, que dá o tom: \"saem, e nunca mais tornam para elas\" (39:4). Todo o bestiário do capítulo é feito de animais que não servem para nada a ninguém, e a força está aí: Deus sustenta um mundo inteiro que não passa pelas mãos do homem, e do qual o homem nem sabe as datas.",
    },
    homem: {
      title: "O condutor a quem o jumento montês não ouve, o lavrador que quis amarrar o boi selvagem ao arado, o caminhante cujo pé pode pisar os ovos da avestruz, e o armado ao encontro de quem o cavalo sai",
      subtitle: "Jó 39:7,9-12,15,21-25 • os homens deste capítulo, que aparecem todos como aquilo que o bicho dispensa",
      text: "Nenhum homem aqui está em cena por si: cada um mostra aquilo de que a criatura não precisa. O condutor, com a corda e a voz, de quem o jumento montês \"não ouve os muitos gritos\" (Jó 39:7). O lavrador, com o arado: \"com corda amarrarás, no arado, ao boi selvagem?\" (39:10) — o mesmo bicho que domesticado sustenta a economia inteira. O caminhante, cujo pé pode pisar os ovos da avestruz (39:15), de quem Deus assume ter privado de sabedoria (39:17). E o soldado, o único que o bicho procura em vez de evitar (39:21-22).",
    },
    cavaleiro: {
      title: "O cavalo a quem o SENHOR deu a força e revestiu o pescoço de crinas — que ao soar das buzinas diz \"Eia!\" — e o cavalo com o seu montado, de que a avestruz se ri",
      subtitle: "Jó 39:18-25 • o vale onde ele escarva a terra, no quadro mais eufórico de todo o livro",
      text: "\"Ou darás tu força ao cavalo, ou revestirás o seu pescoço com crinas?... Terrível é o fogoso respirar das suas ventas\" (Jó 39:19-20). O retrato do cavalo de guerra é o trecho mais elétrico do livro, todo feito de som e de fôlego, e o versículo que ninguém esquece: \"Ao soar das buzinas diz: Eia! E cheira de longe a guerra\" (39:25). É a única criatura do bestiário que serve ao homem, e mesmo essa não é obra do homem. E o capítulo já o humilhara pela boca do bicho mais tolo: a avestruz \"ri-se do cavalo, e do que vai montado nele\" (39:18; cf. Pv 21:31).",
    },
    multidao: {
      title: "O povo do mercado, cujo alarido o jumento montês despreza",
      subtitle: "Jó 39:7 • a praça da cidade vista de longe, do alto da região montanhosa",
      text: "\"Ri-se do ruído da cidade; não ouve os muitos gritos do condutor\" (Jó 39:7). A cidade entra neste capítulo pelo ouvido, e entra como aquilo de que se pode rir. O jumento doméstico é o animal mais amarrado daquele mundo; o texto põe ao lado o mesmo bicho solto, a quem Deus \"deu o ermo por casa\" (39:6) — liberdade que é dádiva, não fuga. Do alto do seu pasto, o barulho do mercado é só um zumbido lá em baixo. É o movimento de toda a resposta do redemoinho: tirar o homem do centro do quadro sem lhe tirar o valor.",
    },
    patriarca: {
      title: "Jó ouvindo o bestiário, pequeno na borda do quadro, sem responder uma palavra",
      subtitle: "Jó 39:1-30 • o monturo debaixo do redemoinho, num capítulo inteiro de perguntas sem resposta",
      text: "Em Jó 39 o interrogado não diz nada, e a cena desenha-o assim de propósito: Jó pequeno, na borda, curvado no pó, enquanto o centro do palco é o bicho de cada versículo. São trinta versículos e nove criaturas, e nenhuma tem utilidade para a economia doméstica de um homem rico de Uz. É esse o argumento: o mundo é maior do que a contabilidade de quem o habita. O capítulo fecha na águia, e fecha sombrio de propósito: \"onde há mortos, ali está ela\" (39:30). Jó responderá dois versículos depois, e a resposta será a mão na boca (40:4).",
    },
  },

  // ----------------------------------------------------------------- Jó 40
  40: {
    patriarca: {
      title: "Jó com a mão à boca — \"Eis que sou vil; que te responderia eu?\" — e os três amigos que assistem",
      subtitle: "Jó 40:3-5 • o monturo debaixo do redemoinho, na primeira resposta de Jó em nove capítulos",
      text: "\"Eis que sou vil; que te responderia eu? A minha mão ponho à boca\" (Jó 40:4). É o mesmo gesto que os príncipes de Uz faziam diante dele nos seus dias bons (29:9), e agora é ele quem o faz. Mas ainda não é o arrependimento do capítulo 42: aqui Jó só se cala, e por isso o SENHOR não aceita a rendição e recomeça (40:6-7). A segunda rodada muda de assunto: já não é sobre poder, é sobre juízo (40:8). E o convite que se segue é ironia pura: se és capaz de governar o mundo, governa — \"veste-te de majestade e de glória\" (40:10).",
    },
    homem: {
      title: "O soberbo que Jó teria de abater, o ímpio atropelado no seu lugar, e o caçador que quis furar o nariz do beemote com laços",
      subtitle: "Jó 40:11-13,24 • o desafio irônico do redemoinho e o esconderijo das canas e da lama",
      text: "\"Derrama os furores da tua ira, e atenta para todo o soberbo, e abate-o... atropela os ímpios no seu lugar\" (Jó 40:11-12). É o único lugar da Bíblia em que Deus manda um homem tentar fazer o Seu trabalho: julgar o mundo. A condição vem em seguida, e é impiedosa: \"Então também eu a ti confessarei que a tua mão direita te poderá salvar\" (40:14). Depois entra o beemote, e o capítulo termina numa pergunta de caçador: \"com laços lhe furar o nariz?\" (40:24). Furar o nariz e passar corda é o que se faz ao boi manso. O homem em cena é quem tentou.",
    },
    rebanho: {
      title: "Os animais do campo que folgam nos pastos que os montes produzem para o beemote",
      subtitle: "Jó 40:20 • a encosta e o ribeiro dos salgueiros, onde o maior dos bichos come erva",
      text: "\"Em verdade os montes lhe produzem pastos, onde todos os animais do campo folgam\" (Jó 40:20). É um detalhe que o poema podia ter dispensado e não dispensou: onde pasta a criatura mais poderosa da terra firme, pastam também todos os outros bichos, à vontade. O beemote come erva como o boi (40:15) e não persegue ninguém — a sua força não se usa contra o rebanho ao lado. O texto chama-o \"obra-prima dos caminhos de Deus\" (40:19), e o quadro é de convivência, não de terror. O Salmo 104 descreve o mesmo mundo (Sl 104:14,18).",
    },
  },

  // ----------------------------------------------------------------- Jó 41
  41: {
    homem: {
      title: "O pescador que quis tirar o leviatã com anzol, os companheiros que fariam dele um banquete, os negociantes que o repartiriam, o frecheiro cuja seta não o faz fugir e os valentes que tremem quando ele se levanta",
      subtitle: "Jó 41:1-9,25-29 • a praia e a barca, diante de trinta e quatro versículos de um só animal",
      text: "O capítulo inteiro é sobre um bicho, e todos os homens que aparecem nele estão a perder. Primeiro o pescador: \"Poderás tirar com anzol o leviatã...?\" (Jó 41:1), e mais adiante os arpões (41:7). Depois a sociedade comercial que já contava com o lucro: \"Os teus companheiros farão dele um banquete, ou o repartirão entre os negociantes?\" (41:6). Depois o soldado, cuja espada não penetra e cujas setas são restolho (41:26-28). E por último os valentes, que tremem quando ele se levanta (41:25). O aviso, no meio, vale por todo o capítulo (41:8).",
    },
    mulherComum: {
      title: "A menina para quem ninguém prende o leviatã — \"Brincarás com ele, como se fora um passarinho\"",
      subtitle: "Jó 41:5 • a pergunta doméstica no meio do poema mais terrível do livro",
      text: "\"Brincarás com ele, como se fora um passarinho, ou o prenderás para tuas meninas?\" (Jó 41:5). No meio de trinta e quatro versículos de escamas seladas e tochas na boca, entra de repente uma cena de casa: o pai que amarra um passarinho por uma linha para as filhas brincarem. O riso do versículo está em pôr o monstro no lugar do pássaro. E a ironia é mais afiada do que parece, porque o homem a quem se pergunta teve três filhas, perdeu-as no capítulo 1 e terá outras três no 42 (42:14-15). A mesma criatura folga sem perigo no Salmo 104:26.",
    },
    patriarca: {
      title: "Jó calado diante do leviatã — rei sobre todos os filhos da soberba",
      subtitle: "Jó 41:10-11,34 • o último quadro do redemoinho, antes de Jó abrir a boca pela última vez",
      text: "No meio do poema do leviatã há dois versículos que não falam do bicho, e são o eixo do livro: \"quem, pois, é aquele que ousa erguer-se diante de mim? Quem primeiro me deu, para que eu haja de retribuir-lhe?\" (Jó 41:10-11). Se ninguém desperta o crocodilo, quem se levanta diante de Quem o fez — e ninguém adiantou nada a Deus para depois lhe cobrar. É a resposta última à contabilidade dos cinco homens, e o versículo que Paulo cita em Rm 11:35. Jó está na borda do quadro e não diz nada; a próxima palavra dele é 42:5.",
    },
  },

  // ----------------------------------------------------------------- Jó 42
  42: {
    patriarca: {
      title: "Jó, que se abomina e se arrepende no pó e na cinza, e ora pelos amigos que o acusaram — e Elifaz, Bildade e Zofar, que trazem sete bezerros e sete carneiros",
      subtitle: "Jó 42:5-10 • o monturo, no versículo em que o cativeiro se vira",
      text: "\"Com o ouvir dos meus ouvidos ouvi, mas agora te vêem os meus olhos. Por isso me abomino e me arrependo no pó e na cinza\" (Jó 42:5-6). Não é confissão de crime — o SENHOR dirá que Jó falou dele \"o que era reto\" —, é o que acontece quando o que se sabia de ouvir vira coisa vista (cf. Is 6:5; Lc 5:8). Depois o céu vira-se para os consoladores (42:7): três homens que passaram trinta capítulos a defender Deus contra Jó são repreendidos a favor de Jó. E o versículo dobradiça: \"o Senhor virou o cativeiro de Jó, quando orava pelos seus amigos\" (42:10).",
    },
    mulherComum: {
      title: "Jemima, Quezia e Quéren-Hapuque, as três filhas do último estado de Jó, a quem seu pai deu herança entre seus irmãos — e as irmãs que vieram comer pão com ele",
      subtitle: "Jó 42:11,13-15 • a casa refeita, e o versículo mais extraordinário do fim do livro",
      text: "\"E chamou o nome da primeira Jemima, e o nome da segunda Quezia, e o nome da terceira Quéren-Hapuque\" (Jó 42:14). Os sete filhos não são nomeados; as três filhas são — e os nomes são de beleza e perfume: pomba ou dia claro; a cássia do óleo santo (Êx 30:24); e, literalmente, \"frasco de pintura de olhos\". Um homem que passou o livro coberto de cinza chama à filha caixinha de maquiagem. E a linha seguinte é jurídica: \"seu pai lhes deu herança entre seus irmãos\" (42:15), havendo sete varões vivos — o que a lei só previa na falta deles (Nm 27:1-11).",
    },
    homem: {
      title: "Os que dantes o conheceram e voltaram, cada um com uma peça de dinheiro e um pendente de ouro — e os sete filhos do último estado de Jó",
      subtitle: "Jó 42:11,13 • a casa de Jó cheia outra vez, e a mesa em que comeram pão com ele",
      text: "\"Então vieram a ele todos os seus irmãos... e comeram com ele pão em sua casa... e cada um deles lhe deu uma peça de dinheiro, e um pendente de ouro\" (Jó 42:11). Vale ler devagar quem são estes homens: são exatamente os que sumiram (19:14). Agora estão à mesa, e o texto não os censura nem os elogia: regista que vieram, comeram e deram. A \"peça de dinheiro\" é a unidade das compras de terra dos patriarcas (Gn 33:19). E há os sete filhos novos (42:13) — mesmo número do capítulo 1, e a nota mais delicada do epílogo: o gado veio em dobro e os filhos não.",
    },
    servo: {
      title: "O filho mais moço da casa refeita e o neto de Jó da quarta geração",
      subtitle: "Jó 42:16 • o pátio da casa em que ele viveu cento e quarenta anos depois de tudo",
      text: "\"E depois disto viveu Jó cento e quarenta anos; e viu a seus filhos, e aos filhos de seus filhos, até à quarta geração\" (Jó 42:16). Estes são os meninos que correm pela casa no último quadro: gente que nasceu depois do monturo e só conhece a história de ouvir contar. Ver a quarta geração é, na Escritura, a fórmula da vida completa (2Rs 10:30; Sl 128:6). O epílogo não explica nada — não conta a Jó o que se passou no capítulo 1 e não desfaz a perda. Dá-lhe tempo, e dá-lhe gente. E a última linha é a mais serena do livro (42:17).",
    },
    multidao: {
      title: "Os irmãos e as irmãs de Jó e todos quantos dantes o conheceram, comendo pão com ele em sua casa",
      subtitle: "Jó 42:11 • a mesa cheia, no primeiro quadro alegre do livro desde o capítulo 1",
      text: "\"Então vieram a ele todos os seus irmãos, e todas as suas irmãs, e todos quantos dantes o conheceram, e comeram com ele pão em sua casa\" (Jó 42:11). O livro começa numa festa de família (1:4) que acaba no versículo 19 do mesmo capítulo. Trinta e nove capítulos depois, a mesa volta a estar posta. Comer pão em casa de alguém é o gesto máximo de reconciliação: quem come contigo já não te acusa. E o que faltava a Jó não era dinheiro, era gente à mesa (19:17-18). O que fizeram — condoer-se e consolar — é o que os três amigos vieram fazer em 2:11 e não conseguiram.",
    },
    rebanho: {
      title: "As catorze mil ovelhas, os seis mil camelos, as mil juntas de bois e as mil jumentas do último estado de Jó — e os sete bezerros e sete carneiros do holocausto dos amigos",
      subtitle: "Jó 42:8,12 • o pasto refeito, com exatamente o dobro do capítulo 1",
      text: "\"E assim abençoou o Senhor o último estado de Jó... pois teve catorze mil ovelhas, e seis mil camelos, e mil juntas de bois, e mil jumentas\" (Jó 42:12). Conferindo com o inventário de abertura (1:3), é o dobro exato de cada linha — e o dobro é, na lei de Israel, a restituição que o ladrão devia pagar (Êx 22:4). Antes dele há outro grupo em cena, e é o mais importante: os sete bezerros e sete carneiros que os três velhos levam ao monturo (42:8), e que não bastavam sem a oração do acusado. Cada marca de `rebanho` é um grupo, não um bicho.",
    },
  },
};
