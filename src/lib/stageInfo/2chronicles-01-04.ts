// Fichas ESPECÍFICAS por (capítulo → papel) de 2 CRÔNICAS 1–4.
// Quatro capítulos em que Israel tem dois santuários e nenhuma casa: a arca em
// Jerusalém, debaixo da tenda que Davi lhe armou, e o tabernáculo de Moisés com
// o altar de cobre de Bezaleel envelhecendo no alto de Gibeom. É lá que o rei
// novo queima mil holocaustos e ouve, de noite e sem mediador nenhum, "pede o
// que queres que eu te dê" — a única voz do céu do bloco. Do capítulo 2 em
// diante o livro vira canteiro de obras e folha de pagamento: setenta mil de
// carga, oitenta mil talhando pedra na montanha, três mil e seiscentos
// inspetores, os cortadores sidônios do Líbano, as jangadas até Jope, o
// artífice mandado de Tiro, os douradores do lugar santíssimo, os fundidores da
// terra argilosa entre Sucote e Zeredá e os sacerdotes que se lavavam no mar de
// cobre. Aqui o perigo da ficha é o inventário: cada figurante tem um OFÍCIO
// que o texto nomeia, e é por ele que se diz quem é.
import type { StageInfo } from "@/lib/rpgStageInfo";

export const CHAPTER_ACTORS_01_04: Record<number, Record<string, StageInfo>> = {
  // ---------------------------------------------------------------- 2Cr 1
  1: {
    anciao: {
      title: "Os juízes e os governadores convocados a todo o Israel — e o conselho que Salomão herdou de Davi",
      subtitle: "2Cr 1:2 • os anciãos do reino chamados antes de qualquer decisão",
      text: "\"E falou Salomão a todo o Israel, aos capitães de mil e de cem, aos juízes e a todos os governadores em todo o Israel, chefes das famílias\" (2Cr 1:2). A primeira coisa que o rei faz com o reino já firme não é decidir: é convocar. Os juízes desta cena são os que Davi separara entre os levitas (1Cr 23:4) e os que respondiam pela vida civil do país (1Cr 26:29). São estes rostos que dão peso ao pedido da noite seguinte: ao pedir \"sabedoria e conhecimento, para que possa sair e entrar perante este povo\" (1:10), ele olha para a máquina de julgar que herdou — e confessa que não sabe tocá-la.",
    },
    cavaleiro: {
      title: "Um dos doze mil cavaleiros repartidos entre as cidades dos carros e Jerusalém",
      subtitle: "2Cr 1:14 • a cavalaria nova, comprada onde a lei do rei proibia comprar",
      text: "\"E Salomão ajuntou carros e cavaleiros, e teve mil e quatrocentos carros, e doze mil cavaleiros; os quais pôs nas cidades dos carros, e junto ao rei em Jerusalém\" (2Cr 1:14). Este homem é guarnição de uma das praças fortes do reino (1Rs 9:19), e o animal que ele monta veio do lugar mais perigoso possível: \"E os cavalos... eram trazidos do Egito\" (1:16). O pai fizera o contrário, jarretando os cavalos tomados (1Cr 18:4), e a lei do rei era expressa (Dt 17:16). O Cronista põe essa cavalaria logo depois do dom da sabedoria e não comenta — mas o salmo comenta por ele (Sl 20:7).",
    },
    homem: {
      title: "Os capitães de mil e de cem que subiram a Gibeom, o condutor do carro do rei e o mercador que recebia os cavalos em tropas",
      subtitle: "2Cr 1:2,5,14,16-17 • a chefia militar convocada e os homens do negócio dos cavalos",
      text: "\"E falou Salomão a todo o Israel, aos capitães de mil e de cem\" (2Cr 1:2): são os oficiais das doze turmas que serviam mês a mês no reinado de Davi (1Cr 27:1), e é com eles que a nação sobe ao alto para buscar o altar de cobre (1:5). Descido o monte, os homens em cena trocam de ofício: o condutor de um dos mil e quatrocentos carros (1:14) e o negociante que ia buscá-los no sul (1:16). O preço está escriturado, e é o de um reino que virou entreposto (1:17). O mesmo capitão que viu mil bois arderem em Gibeom fecha o capítulo dentro de um mercado de carruagem egípcia.",
    },
    multidao: {
      title: "Toda a congregação que subiu com o rei ao alto de Gibeom",
      subtitle: "2Cr 1:3,5,13 • a nação inteira diante da tenda que Moisés fizera no deserto",
      text: "\"E foi Salomão, e toda a congregação com ele, ao alto que estava em Gibeom, porque ali estava a tenda da congregação de Deus, que Moisés, servo do Senhor, tinha feito no deserto\" (2Cr 1:3). Em 1 Reis quem sobe é o rei sozinho (1Rs 3:4), e o Cronista faz questão de pôr Israel inteiro atrás dele: a busca é de dois sujeitos, \"e Salomão e a congregação o buscavam\" (1:5). É a mesma gente que acabara de aclamar o filho de Davi. Nada do que Deus deu naquela noite foi pedido por um particular: foi pedido no meio de um povo e por causa dele.",
    },
    patriarca: {
      title: "Zadoque e os sacerdotes que ministravam diante do tabernáculo do SENHOR no alto de Gibeom",
      subtitle: "2Cr 1:3-6 • o sacerdócio do santuário velho, onde ficara o altar de Bezaleel",
      text: "Israel tinha dois endereços sagrados ao mesmo tempo, e este é o mais antigo. Davi \"deixou a Zadoque, o sacerdote, e a seus irmãos... diante do tabernáculo do Senhor, no alto que está em Gibeom, para oferecerem holocaustos ao Senhor continuamente\" (1Cr 16:39-40). É esse sacerdote que recebe o rei: guarda a tenda feita no deserto e o \"altar de cobre que tinha feito Bezaleel\" (2Cr 1:5), cuja obra ainda estava de pé quase quinhentos anos depois. Quando a casa ficar pronta, tudo isso subirá para Jerusalém (5:5) — e Gibeom deixa de ser santuário para sempre.",
    },
    rebanho: {
      title: "Os mil holocaustos queimados sobre o altar de cobre de Gibeom",
      subtitle: "2Cr 1:6 • o gado de uma noite inteira de fogo diante da tenda de Moisés",
      text: "\"E Salomão ofereceu ali sacrifícios perante o Senhor, sobre o altar de cobre que estava na tenda da congregação; e ofereceu sobre ele mil holocaustos\" (2Cr 1:6). Holocausto é a oferta que não volta para quem a trouxe: \"o sacerdote tudo isso queimará sobre o altar\" (Lv 1:9) — mil cabeças e nenhuma porção de volta. O número repete o do dia em que Israel confirmou o reino do moço (1Cr 29:21), e ficará pequeno diante da dedicação da casa (7:5). O que o texto sublinha é a ordem dos fatos: o rei gasta primeiro e só depois recebe a pergunta — \"Pede o que queres que eu te dê\" (1:7).",
    },
    rei: {
      title: "Os reis dos heteus e os reis da Síria, compradores das tropas de cavalos de Salomão",
      subtitle: "2Cr 1:17 • os fregueses estrangeiros do comércio de carros do Egito",
      text: "\"E faziam subir e sair do Egito cada carro por seiscentos siclos de prata... e assim, por meio deles eram para todos os reis dos heteus, e para os reis da Síria\" (2Cr 1:17). Os \"heteus\" aqui são os reinos neo-heteus do norte da Síria; os \"reis da Síria\", os principados arameus de Damasco. Israel, assentado na estrada entre o Egito e o norte, deixa de ser só freguês e vira atravessador. Estes mesmos fregueses reapareceriam num susto: cercada Samaria, um ruído de carros fez o exército sírio fugir de noite, temendo os reis dos heteus (2Rs 7:6).",
    },
    servo: {
      title: "Os levitas das duas tendas — a de Moisés em Gibeom e a que Davi armou para a arca — e os servos do tesouro, da forragem e das tropas de cavalos",
      subtitle: "2Cr 1:3-6,14-16 • quem serve nos dois santuários e quem toca a casa do rei",
      text: "O reino tinha dois lugares de serviço ao mesmo tempo, e estes servos são a gente dos dois. Em Jerusalém, junto à tenda nova, ficaram Asafe e os seus irmãos, \"para ministrarem continuamente perante a arca\" (1Cr 16:37; cf. 2Cr 1:4). Em Gibeom, o levita que serve ao altar de cobre na noite dos mil holocaustos (1:5-6). Depois o serviço muda de assunto e fica bem mundano: o do tesouro (1:15), o das cocheiras (1Rs 4:28) e o tratador que recebia os animais no lote (1:16). Um capítulo só emprega mãos no altar e mãos na estrebaria.",
    },
  },

  // ---------------------------------------------------------------- 2Cr 2
  2: {
    homem: {
      title: "Os três mil e seiscentos inspetores da obra, o escrivão do rol, o arauto que leu a carta em Tiro, o escriba de Hirão e os peritos que Davi preparou em Judá",
      subtitle: "2Cr 2:2,7,11,17-18 • a chefia do canteiro e os dois lados da correspondência",
      text: "A obra começa por uma folha de pessoal: \"E designou Salomão setenta mil homens de carga, e oitenta mil que talhavam pedras na montanha, e três mil e seiscentos inspetores sobre eles\" (2Cr 2:2), e o encargo do inspetor é dito sem eufemismo: \"para fazerem trabalhar o povo\" (2:18). O escrivão em cena é o do alistamento (2:17). O arauto é a boca do rei em terra alheia: a carta a Hirão pede o artífice \"juntamente com os peritos que estão comigo em Judá\" (2:7) — ourives treinados pelo velho rei para uma casa que ele não veria. Do outro lado há outro escriba: a resposta veio por escrito (2:11).",
    },
    mulherComum: {
      title: "A mãe de Hirão Abiú — uma das filhas de Dã, casada com um homem de Tiro",
      subtitle: "2Cr 2:14 • a mulher israelita de quem saiu o artífice do templo",
      text: "\"Filho de uma mulher das filhas de Dã, e cujo pai foi homem de Tiro\" (2Cr 2:14). A carta do rei fenício apresenta o seu melhor artífice pela mãe, e é essa metade israelita que faz dele mais do que um estrangeiro contratado. Em 1 Reis a notícia vem com outro recorte: \"filho de uma mulher viúva, da tribo de Naftali\" (1Rs 7:14). E a tribo dela não está ali por acaso: no tabernáculo, ao lado de Bezalel de Judá, Deus pusera \"Aoliabe... da tribo de Dã\" (Êx 31:6). Nenhum dos dois santuários foi levantado só pelas mãos das tribos de honra.",
    },
    multidao: {
      title: "Os cento e cinqüenta e três mil e seiscentos estrangeiros contados na terra de Israel",
      subtitle: "2Cr 2:2,17-18 • o rol dos de fora alistado para o canteiro do templo",
      text: "\"E Salomão contou todos os homens estrangeiros, que havia na terra de Israel... e acharam-se cento e cinqüenta e três mil e seiscentos\" (2Cr 2:17). São os restos dos povos da terra, que ele \"reduziu a tributo servil\" (1Rs 9:20-21), e a ideia não é dele: Davi já ordenara ajuntar os estrangeiros e pôr cortadores de pedra (1Cr 22:2). O alistamento reparte a multidão em três (2:18). É gente que serve sem ser do povo — e o mesmo rei que a arregimenta abrirá a boca por ela na dedicação: \"Assim também ao estrangeiro... ouve tu desde os céus\" (6:32-33).",
    },
    patriarca: {
      title: "O sacerdote do incenso aromático, do pão contínuo e dos holocaustos da manhã e da tarde",
      subtitle: "2Cr 2:4 • o culto para o qual a casa está sendo encomendada",
      text: "Antes de pedir uma tora de cedro, Salomão explica a Hirão para que serve o prédio: \"para queimar perante ele incenso aromático, e para a apresentação contínua do pão da proposição, para os holocaustos da manhã e da tarde... o que é obrigação perpétua de Israel\" (2Cr 2:4). O sacerdote em cena é quem executa essa lista (Lv 24:8). A palavra decisiva da carta é \"perpétua\": a casa não se levanta para ser vista, levanta-se para que um ofício que não pode parar tenha onde acontecer. E o rei já sabe o limite do que encomenda: \"os céus e até os céus dos céus o não podem conter\" (2:6).",
    },
    rei: {
      title: "Dois tronos e uma carta entre eles: o rei que encomenda a casa e o rei de Tiro que responde por escrito",
      subtitle: "2Cr 2:3,11-12 • a correspondência que abre o canteiro do templo",
      text: "O capítulo inteiro é uma troca de cartas entre dois reinos. De Jerusalém sai o pedido, e começa por uma dívida de família: \"Como fizeste com Davi meu pai, mandando-lhe cedros... assim também faze comigo\" (2Cr 2:3). De Tiro vem a resposta por escrito, e o espantoso é a teologia dela: um rei fenício escreve \"Bendito seja o Senhor Deus de Israel, que fez os céus e a terra\" (2:12) e lê corretamente a razão daquele trono (2:11). O acordo é comercial até o osso — mas o Cronista quer que se veja quem foi o primeiro estrangeiro a bendizer o Deus de Israel por causa desta casa.",
    },
    servo: {
      title: "Os setenta mil de carga, os oitenta mil que talhavam na montanha, os cortadores sidônios do Líbano, os jangadeiros de Jope e o medidor dos coros e dos batos",
      subtitle: "2Cr 2:2,8-10,16,18 • as mãos e a paga do maior canteiro de obras de Israel",
      text: "\"E designou Salomão setenta mil homens de carga, e oitenta mil que talhavam pedras na montanha\" (2Cr 2:2) — cento e cinquenta mil homens antes de a primeira pedra ser assentada. No Líbano quem derruba não é israelita, e o rei o diz sem constrangimento: \"bem sei eu que os teus servos sabem cortar madeira no Líbano\" (2:8; cf. 1Rs 5:6). A paga é comida, e alguém passa o dia com a medida na mão (2:10). O transporte é por água, com os toros amarrados: \"ta traremos em jangadas pelo mar até Jope\" (2:16). Quatro séculos depois, os que voltaram refizeram o mesmo trajeto (Ed 3:7).",
    },
  },

  // ---------------------------------------------------------------- 2Cr 3
  3: {
    homem: {
      title: "O mestre de obras dos sessenta côvados, o escrivão que anota a medida, o entalhador das palmas e das cadeias e o tecelão do véu",
      subtitle: "2Cr 3:3-5,7,14 • os ofícios que levantam a casa no monte Moriá",
      text: "\"E estes foram os fundamentos que Salomão pôs para edificar a casa de Deus: o comprimento em côvados, segundo a primeira medida, era de sessenta côvados\" (2Cr 3:3) — e a ressalva é trabalho de escrivão: o Cronista avisa em que côvado está falando. O entalhador entra depois da forra de madeira: \"fez sobre ela palmas e cadeias\" (3:5) e \"lavrou querubins nas paredes\" (3:7) — o jardim e a sua guarda talhados na parede. E o tecelão fecha a lista com a peça mais carregada de sentido do templo: o véu com querubins (3:14), a cortina que, no dia da cruz, \"se rasgou em dois, de alto a baixo\" (Mt 27:51).",
    },
    mulherComum: {
      title: "A fiandeira do linho fino e das lãs de azul, púrpura e carmesim do véu",
      subtitle: "2Cr 3:14 • a mão que fia o pano que fecha o lugar santíssimo",
      text: "\"Também fez o véu de azul, púrpura, carmesim e linho fino; e pôs sobre ele querubins\" (2Cr 3:14). As quatro matérias são as do véu do tabernáculo, e no deserto o texto diz de quem eram as mãos: \"todas as mulheres sábias de coração fiavam com as suas mãos\" (Êx 35:25). Fiar é trabalho lento e invisível: a púrpura saía do múrice de Tiro, o carmesim de um inseto, e o linho exigia fio parelho do começo ao fim. Esta mulher jamais entraria no lugar que a sua obra fecha — e foi justamente esse pano que Deus mandou rasgar (Hb 10:19-20).",
    },
    multidao: {
      title: "O povo do adro no dia em que Jaquim e Boaz foram levantadas diante da casa",
      subtitle: "2Cr 3:15-17 • a assistência das duas colunas de trinta e cinco côvados",
      text: "\"E levantou as colunas diante do templo, uma à direita, e outra à esquerda; e chamou o nome da que estava à direita Jaquim, e o nome da que estava à esquerda Boaz\" (2Cr 3:17). São trinta e cinco côvados de cobre subindo à vista de todos, com capitel, cadeias e cem romãs (3:16) — obra que não sustenta telhado nenhum e existe só para ser lida por quem chega. Jaquim quer dizer \"ele estabelecerá\"; Boaz, \"nele há força\". Diante da porta, o primeiro sermão do templo é feito de dois pilares e dois nomes: o que se firma ali não se firma pela mão de quem entra.",
    },
    patriarca: {
      title: "O sacerdote na eira de Ornã, o jebuseu — o chão do monte Moriá onde a peste parou",
      subtitle: "2Cr 3:1 • o endereço do templo, escolhido por uma aparição e não por conveniência",
      text: "\"E começou Salomão a edificar a casa do SENHOR em Jerusalém, no monte Moriá, onde o SENHOR aparecera a Davi seu pai, no lugar que Davi tinha preparado na eira de Ornã, o jebuseu\" (2Cr 3:1). Três memórias se cruzam neste chão. Moriá é a terra para onde Abraão levou o filho (Gn 22:2). A eira é onde o anjo da peste parou e onde Davi recusou receber o terreno de presente: \"não tomarei o que é teu, para o Senhor, para que não ofereça holocausto sem custo\" (1Cr 21:24). E ali desceu fogo do céu (1Cr 21:26), depois do que o velho rei sentenciou: \"Esta será a casa do SENHOR Deus\" (1Cr 22:1).",
    },
    rei: {
      title: "O rei que começa a edificar no segundo dia do segundo mês do quarto ano",
      subtitle: "2Cr 3:1-2 • a data exata em que a casa saiu do papel",
      text: "\"E começou a edificar no segundo mês, no segundo dia, no ano quarto do seu reinado\" (2Cr 3:2). O Cronista data a obra como quem lavra escritura, e a narrativa paralela amplia a conta: foi \"no ano de quatrocentos e oitenta, depois de saírem os filhos de Israel do Egito\" (1Rs 6:1) — a casa nasce dentro do calendário que começa no êxodo. Quatro anos separam o pedido de sabedoria em Gibeom da primeira pedra. O rei que aparece aqui não é o do trono, é o do canteiro — e nem o risco é dele: a planta veio pronta da mão do pai (1Cr 28:11,19).",
    },
    servo: {
      title: "O do cordel da medida, os douradores do pórtico e do lugar santíssimo, o aprendiz do buril e os que levantaram as colunas",
      subtitle: "2Cr 3:3-5,8-9,15-17 • as mãos que cobrem de ouro e erguem o cobre",
      text: "Estes servos fazem o trabalho mais repetitivo e mais caro da Escritura: bater ouro em folha e assentá-lo sobre madeira, dia após dia. O pórtico \"por dentro o revestiu com ouro puro\" (2Cr 3:4); a casa grande, forrada de faia e revestida \"com ouro fino\" (3:5); o lugar santíssimo, \"do peso de seiscentos talentos\" (3:8). E até o que ninguém tornaria a ver entrou na balança: \"O peso dos pregos era de cinqüenta siclos de ouro\" (3:9). No fim o serviço vira força bruta: aprumar duas colunas de trinta e cinco côvados (3:17). O ouro é do rei, o nome das colunas é de Deus; a lombeira é destes homens.",
    },
  },

  // ---------------------------------------------------------------- 2Cr 4
  4: {
    homem: {
      title: "O mestre das redes e dos capitéis, o escrivão das quatrocentas romãs e o ourives do ouro finíssimo",
      subtitle: "2Cr 4:12-13,18,21 • quem conta e quem confere o inventário da casa",
      text: "O capítulo 4 é uma lista, e lista precisa de quem a escreva. As peças do alto são as mais difíceis de conferir: os globos, os capitéis, as duas redes (2Cr 4:12) — e sobre as redes vem a conta que só um escrivão fecharia: \"E as quatrocentas romãs para as duas redes\" (4:13). Ainda assim o inventário chega a um limite e o admite por escrito: \"não se podia averiguar o peso do cobre\" (4:18), o mesmo que já sucedera com o metal de Davi (1Cr 22:14). O ourives fecha o rol pelo outro extremo, o das miudezas: \"as flores, as lâmpadas e os espevitadores eram de ouro, do mais finíssimo ouro\" (4:21).",
    },
    patriarca: {
      title: "Os sacerdotes do átrio: o que se lava no mar de cobre, o que acende as lâmpadas perante o oráculo e o que põe os pães da proposição",
      subtitle: "2Cr 4:6,8,19-20 • o ofício para o qual cada peça de cobre e de ouro foi feita",
      text: "O inventário deste capítulo só faz sentido pelos homens que vão usá-lo. O tanque de dez côvados não é ornamento: \"o mar era para que os sacerdotes se lavassem nele\" (2Cr 4:6) — a pia do tabernáculo crescida até virar mar, e a ordem que a instituiu não admitia descuido (Êx 30:20). As dez mesas recebem o pão que se troca de sábado em sábado (4:19; Lv 24:8). E os dez castiçais têm hora e regra: \"para as acenderem segundo o costume, perante o oráculo\" (4:20; cf. Êx 27:20-21). Lavar, alimentar e acender: em ouro, o que os filhos de Arão faziam em cobre debaixo de uma tenda.",
    },
    rebanho: {
      title: "Os doze bois de cobre debaixo do mar de fundição — três para cada rumo do céu",
      subtitle: "2Cr 4:4,15 • as figuras fundidas que sustentavam o mar no pátio dos sacerdotes",
      text: "\"E o mar estava posto sobre doze bois; três que olhavam para o norte, três que olhavam para o ocidente, três que olhavam para o sul e três que olhavam para o oriente\" (2Cr 4:4). Não são animais vivos, e sim quatro grupos de cobre fundido, cada um encarando um ponto do horizonte — doze, como as tribos, carregando a água em que os sacerdotes se lavavam. O fim deles ficou escrito em dois tempos: primeiro Acaz, que tirou o mar de cima deles (2Rs 16:17); depois os caldeus, que quebraram tudo e levaram o metal (Jr 52:20).",
    },
    rei: {
      title: "O rei que desceu a fundição para a campina do Jordão",
      subtitle: "2Cr 4:17-18 • o cobre moldado na terra argilosa entre Sucote e Zeredá",
      text: "\"Na campina do Jordão os fundiu o rei, na terra argilosa, entre Sucote e Zeredá\" (2Cr 4:17). O maior objeto de metal já feito em Israel não saiu de Jerusalém: a obra desceu ao vale, quase mil metros abaixo, porque ali havia o barro do molde, a lenha e a água à mão. É chão de história antiga — Sucote negou pão aos homens de Gideão (Jz 8:6), e a campina é a que Ló escolheu por ser \"como o jardim do Senhor\" (Gn 13:10). E a conta ficou aberta de propósito: \"não se podia averiguar o peso do cobre\" (4:18). O metal que Davi ajuntara sem pesar voltou do fogo em forma de mar, de bases e de pias.",
    },
    servo: {
      title: "Os fundidores da terra argilosa, o moldador de barro do vale, o polidor do cobre, o levita que lava o holocausto e o porteiro do pátio dos sacerdotes",
      subtitle: "2Cr 4:6,9,16-17 • as mãos que fundem, poliem, lavam e guardam",
      text: "\"Semelhantemente as caldeiras, as pás, os garfos e todos os seus utensílios, fez Hirão Abiú ao rei Salomão... de cobre polido\" (2Cr 4:16): polir é serviço de servo — dias de areia, pano e braço até o metal responder à luz. Antes dele vieram o moldador, que abriu as formas na argila do vale, e o fundidor (4:17). Já dentro do pátio, o levita das dez pias tem tarefa suja e exata: \"o que pertencia ao holocausto o lavavam nelas\" (4:6). E o porteiro responde pelas duas cercas que este capítulo levanta (4:9): há um lugar para o povo e outro para quem ministra.",
    },
  },
};
