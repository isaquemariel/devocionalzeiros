// Fichas ESPECÍFICAS por (capítulo → papel) de 1 REIS 15–22.
// Da crônica seca dos reis do Norte — cinco tronos derrubados em dois capítulos,
// o paço queimado sobre a cabeça de quem reinou sete dias, o monte de Samaria
// comprado por dois talentos de prata — ao fogo do Carmelo, à voz mansa e
// delicada em Horebe, à vinha de Nabote apedrejado por cartas seladas com o
// sinete do rei, e ao carro lavado no tanque de Samaria. Cada figurante anônimo
// da cena é alguém REAL daquele capítulo, nunca "habitante da cena".
import type { StageInfo } from "@/lib/rpgStageInfo";

export const CHAPTER_ACTORS_15_22: Record<number, Record<string, StageInfo>> = {
  // ---------------------------------------------------------------- 1Rs 15
  15: {
    anciao: {
      title: "Os escribas das crônicas e o sacerdote da casa do SENHOR",
      subtitle: "1Rs 15 • os homens que registram os reinados em Jerusalém e em Tirza",
      text: "São os oficiais que este capítulo cita sem descrever: os cronistas de cujo trabalho o texto vive (15:7,23,31) e o sacerdote que recebe no templo \"as coisas consagradas por seu pai... prata, ouro e vasos\" (v. 15). O escriba é a memória do reino e o sacerdote é a sua consciência: um anota o que foi feito, o outro guarda o que foi dedicado. Diante deles passa o refrão do julgamento — Abias, cujo coração \"não foi perfeito\" (v. 3), e Asa, que fez \"o que era reto aos olhos do Senhor\" (v. 11). O arquivo do palácio guarda atos; a crônica de Deus guarda corações."
    },
    cavaleiro: {
      title: "Os capitães dos exércitos de Ben-Hadade",
      subtitle: "1Rs 15:20 • a cavalaria síria comprada com a prata do templo",
      text: "\"E Ben-Hadade deu ouvidos ao rei Asa, e enviou os capitães dos seus exércitos contra as cidades de Israel\" (15:20): estes cavaleiros não vêm por Israel nem contra Judá — vêm porque foram pagos. O preço está no versículo anterior: \"toda a prata e ouro que ficaram nos tesouros da casa do Senhor\" (v. 18), o dinheiro consagrado virando soldo estrangeiro. Ferem Ijom, Dã, Abel-Bete-Maaca e toda a terra de Naftali: cidades de irmãos. A manobra funciona (v. 21) — mas o rei que fez o que era reto comprou com o ouro do santuário o que devia ter pedido a Deus (2Cr 16:7-9)."
    },
    homem: {
      title: "Os pedreiros de Ramá, os carregadores dos ídolos e os sacerdotes dos altos",
      subtitle: "1Rs 15 • quem carrega a pedra, quem carrega o ídolo, quem serve o alto que não caiu",
      text: "Os primeiros são os sacerdotes dos lugares altos que Asa não conseguiu apagar: \"Os altos, porém, não foram tirados\" (15:14) — a reforma chegou ao palácio e parou fora dos muros. Depois vêm os que carregam para fora o que o rei condenou (v. 12), até o horrível ídolo da própria avó, queimado no Cedrom (v. 13). E no fim, os pedreiros do quadro mais bonito do capítulo: todo o Judá apregoado a trazer \"as pedras de Ramá, e a sua madeira com que Baasa edificara\" (v. 22) — o bloqueio inimigo desmontado pedra por pedra e reerguido como muro de Mizpá."
    },
    mulherComum: {
      title: "Maaca, a rainha-mãe deposta — e as mulheres da casa de Jeroboão",
      subtitle: "1Rs 15:2,10,13,29 • a avó que fez o ídolo e a casa do Norte que não deixou fôlego",
      text: "Maaca, filha de Absalão, atravessa dois reinados como a mulher mais poderosa de Jerusalém: mãe de Abias (15:2) e ainda rainha nos dias do neto (v. 10). Asa a depõe \"porquanto tinha feito um horrível ídolo a Aserá\" (v. 13), e é a prova mais dura da sua reforma: a piedade que não poupa a própria família é a única que o texto chama de reta. A Aserá era a deusa-mãe cananeia, e um ídolo dela na casa real punha Baal no coração de Judá; o rei o queima no Cedrom, o mesmo vale onde Josias queimaria o resto (2Rs 23:6)."
    },
    multidao: {
      title: "Todo o Judá convocado a carregar as pedras de Ramá",
      subtitle: "1Rs 15:22 • o povo apregoado, sem exceção, para desmanchar o bloqueio",
      text: "\"Então o rei Asa fez apregoar por toda a Judá que todos, sem exceção, trouxessem as pedras de Ramá, e a sua madeira com que Baasa edificara\" (15:22). É uma convocação total: não há isento, e o reino inteiro sobe à fronteira para carregar nos ombros o muro que fora levantado \"para que a ninguém fosse permitido sair, nem entrar a ter com Asa\" (v. 17). Com essas pedras Asa edificou Geba e Mizpá: o material do cerco vira material da defesa. Deus tem o costume de reaproveitar as pedras que os inimigos assentaram."
    },
    rei: {
      title: "A crônica dos reis: Abias e Asa em Judá, Nadabe e Baasa em Israel",
      subtitle: "1Rs 15 • quatro tronos num capítulo, medidos pelo coração de Davi",
      text: "O capítulo é uma corrida de coroas: Abias reina três anos nos pecados do pai (15:3); Asa reina quarenta e um e é o primeiro depois de Davi de quem se diz que \"fez o que era reto aos olhos do Senhor\" (v. 11); no Norte, Nadabe dura dois anos e cai pela conspiração de Baasa. A régua nunca é a força nem a duração — é sempre um homem morto há um século: \"como o coração de Davi, seu pai\". E é por esse morto que Judá sobrevive: \"por amor de Davi o Senhor seu Deus lhe deu uma lâmpada em Jerusalém\" (v. 4), promessa que segura a dinastia quando o rei não a merece."
    },
    servo: {
      title: "Os servos das duas casas: o tesoureiro, o mensageiro a Damasco e o viajante barrado em Ramá",
      subtitle: "1Rs 15 • as mãos por onde passa o ouro do templo e a estrada fechada",
      text: "O texto os nomeia coletivamente numa frase só: Asa tomou a prata e o ouro dos tesouros da casa do SENHOR \"e os entregou nas mãos de seus servos\" (15:18) — são eles que tiram do santuário o que estava consagrado e o levam por dias de estrada até Damasco, com o recado decorado (v. 19). Outro está do lado errado da fronteira: o viajante que topa com o muro de Ramá, erguido \"para que a ninguém fosse permitido sair, nem entrar a ter com Asa\" (v. 17) — um bloqueio que separa irmãos de irmãos. Servir a um trono, nesses dias, era estar tão perto do juízo quanto o próprio rei."
    }
  },

  // ---------------------------------------------------------------- 1Rs 16
  16: {
    anciao: {
      title: "O escriba do reino de Israel",
      subtitle: "1Rs 16 • o cronista que registra cinco reis num só capítulo",
      text: "Quatro vezes neste capítulo o texto remete ao arquivo real (16:5,14,20,27), e é este velho oficial quem o mantém. Cabe a ele anotar o que nenhum rei quereria ver anotado: que Elá foi morto \"bebendo e embriagando-se em casa de Arsa\" (v. 9), que \"reinou Zinri sete dias em Tirza\" (v. 15), que o povo se partiu em dois partidos. Ele escreve os atos; a Escritura, por cima da sua letra, escreve o veredicto: fez \"o que era mau aos olhos do Senhor\" (v. 19,25,30). O escriba guarda uma dinastia por vez; a palavra do SENHOR atravessa todas elas (v. 12)."
    },
    cavaleiro: {
      title: "Os carros de Zinri e a cavalaria que cercou Tirza",
      subtitle: "1Rs 16:9,17 • a arma de elite do Norte, virada contra o próprio trono",
      text: "Zinri não era um estranho ao palácio: era \"seu servo, capitão de metade dos carros\" (16:9) — o oficial da força mais cara do reino, que usou a confiança do rei para o matar à mesa. Os carros e os cavalos eram exatamente o que a lei proibia ao rei multiplicar (Dt 17:16), e aqui já são o instrumento das conspirações de dentro de casa. Sete dias depois, a mesma arma marcha do lado de Onri e cerca Tirza (v. 17). Israel tem cavalaria de sobra e não tem rei nenhum que se firme: a força posta no lugar da confiança em Deus acaba devorando quem a comanda."
    },
    homem: {
      title: "Jeú filho de Hanani, Arsa o mordomo, Semer dono do monte e Hiel o betelita",
      subtitle: "1Rs 16 • os homens sem coroa que atravessam cinco golpes de estado",
      text: "O primeiro é o único que importa: o profeta Jeú, filho de Hanani, que leva a palavra à cara de Baasa — \"te levantei do pó, e te pus por príncipe sobre o meu povo Israel\" (16:2) — e anuncia a ruína em imagens de rua (v. 4). Depois vêm os homens do avesso: Arsa, o mordomo em cuja casa o rei se embriagava; o arauto que grita no arraial \"Zinri tem conspirado\" (v. 16); e Semer, dono do monte comprado por dois talentos (v. 24). E o último fecha o capítulo com a frase mais sinistra: Hiel, que preferiu enterrar dois filhos a levar a sério a maldição sobre Jericó (v. 34)."
    },
    mulherComum: {
      title: "Jezabel, a sidônia trazida para a casa de Israel",
      subtitle: "1Rs 16:31 • o casamento que instalou Baal em Samaria",
      text: "O capítulo mede o pecado de Acabe por camadas, e a mulher é a última e a pior: \"como se fora pouco andar nos pecados de Jeroboão\", ele \"ainda tomou por mulher a Jezabel, filha de Etbaal, rei dos sidônios; e foi e serviu a Baal\" (16:31). Até ali o Norte adorava o SENHOR de modo errado, pelos bezerros; a partir daqui adora outro deus, com altar e casa próprios em Samaria (v. 32). O nome do sogro já diz tudo — Etbaal, \"com Baal\" —, e a aliança com Sidom é o casamento que a lei proibira: \"fariam desviar teus filhos de mim\" (Dt 7:4)."
    },
    multidao: {
      title: "O arraial de Gibetom e os dois partidos de Israel",
      subtitle: "1Rs 16:15-22 • o exército que faz um rei no campo e o povo que se parte em dois",
      text: "O exército está acampado contra Gibetom dos filisteus — a mesma cidade em que um rei já morrera de conspiração (15:27) — quando corre a notícia de que o trono foi tomado: \"Todo o Israel pois, no mesmo dia, no arraial, constituiu rei sobre Israel a Onri, capitão do exército\" (16:16). Não há unção, nem profeta, nem templo: uma coroa feita no acampamento, por aclamação de soldados. Depois o povo se divide em dois partidos (v. 21), e a guerra civil só termina porque um foi mais forte. Israel escolhe reis como escolhe deuses: pelo lado que grita mais alto."
    },
    rei: {
      title: "Baasa, Elá, Zinri, Onri, Tibni e Acabe",
      subtitle: "1Rs 16 • seis homens disputando um trono em vinte e poucos anos",
      text: "Nenhum capítulo da Bíblia derruba tantas coroas: Baasa, que Deus levantou do pó e que andou no caminho de Jeroboão; Elá, congelado num único gesto (16:9); Zinri, que reinou sete dias e \"queimou-a sobre si; e morreu\" (v. 18); Tibni, morto na disputa; Onri, fundador de Samaria, que \"fez pior do que todos quantos foram antes dele\" (v. 25). E Acabe, que supera o pai (v. 30). Cada golpe de estado apenas executa uma sentença já pronunciada, e o único trono que o capítulo não abala é o que ninguém vê — o do SENHOR (v. 12)."
    },
    servo: {
      title: "O copeiro de Elá, os servos dos paços e os dois filhos de Hiel",
      subtitle: "1Rs 16 • os que servem à mesa, carregam a prata e são enterrados no alicerce",
      text: "Servir num paço do Norte, nestes anos, era serviço de alto risco: os moços de Tirza veem o rei ser morto à mesa em que estava \"bebendo e embriagando-se\" (16:9), e dias depois veem o palácio em chamas com o novo rei dentro (v. 18). Outros carregam os dois talentos de prata com que Onri comprou o monte de Semer (v. 24), e outros montam a casa de Baal em Samaria (v. 32). Mas os últimos servos do capítulo são dois meninos, e a morte deles é o eco de uma maldição de trezentos anos (v. 34; Js 6:26): o preço acabava sempre pago por quem não tinha voz."
    }
  },

  // ---------------------------------------------------------------- 1Rs 17
  17: {
    mulherComum: {
      title: "A viúva de Sarepta, que é de Sidom",
      subtitle: "1Rs 17:8-24 • a estrangeira que apanhava lenha para a última refeição",
      text: "Deus manda o seu profeta para fora de Israel, para a terra natal de Jezabel, e o sustenta pela mão da pessoa mais frágil que há ali (17:9). Elias a encontra à porta da cidade \"apanhando lenha\" (v. 10), e ela responde ao pedido de pão com o inventário da sua morte: \"vou prepará-lo para mim e para o meu filho, para que o comamos, e morramos\" (v. 12). Dá primeiro o pouco que tem, e o milagre que recebe não é fartura, é sustento diário (v. 14). É a ela que Jesus apontaria em Nazaré para dizer que a graça de Deus não é propriedade de Israel (Lc 4:25-26)."
    },
    patriarca: {
      title: "O ofício do profeta em Israel nos dias da seca",
      subtitle: "1Rs 17 • os homens que estão \"perante a face\" do SENHOR quando o rei serve a Baal",
      text: "A cena é de um profeta só, mas o papel é de um ofício inteiro, e a definição está na primeira frase: o profeta é o homem que fala \"perante cuja face estou\" (17:1) — cortesão de outro trono, e por isso capaz de dizer a um rei que não haverá orvalho nem chuva. Nos dias de Acabe esse ofício é clandestino: os profetas do SENHOR sobrevivem em covas (18:4) enquanto os de Baal comem à mesa da rainha. O verdadeiro não tem mesa: come o que os corvos trazem (17:4) e a farinha de uma viúva estrangeira. E o poder nunca é dele: o menino revive porque \"o Senhor ouviu a voz de Elias\" (v. 22)."
    },
    rei: {
      title: "Acabe e o trono de Samaria no primeiro dia da seca",
      subtitle: "1Rs 17:1 • o rei que ouve a sentença e não pode revogá-la",
      text: "O rei aparece uma vez só no capítulo, e é para receber uma notícia que nenhum exército desfaz: \"nestes anos nem orvalho nem chuva haverá, senão segundo a minha palavra\" (17:1). O golpe é preciso: Baal era adorado justamente como o senhor da tempestade, e o SENHOR fecha o céu para mostrar quem manda nas nuvens — exatamente a maldição da aliança, \"E os teus céus... serão de bronze\" (Dt 28:23). Depois disso a cena corta. É a lição de perspectiva do capítulo: enquanto a corte espera chuva, o Reino está acontecendo numa panela de farinha em Sarepta."
    },
    servo: {
      title: "Os servos da corte de Acabe — e o filho da viúva de Sarepta",
      subtitle: "1Rs 17 • quem ouve a sentença no paço e o menino que morre e revive",
      text: "Os primeiros são os moços do paço de Samaria, testemunhas mudas do dia em que um homem de Gileade entrou na sala do trono para anunciar anos sem chuva (17:1) — servem a um rei que, três anos depois, andará ele mesmo à procura de erva para os cavalos (18:5). O outro é uma criança: o filho da viúva, para quem a mãe preparava a última refeição (v. 12) e que depois adoece \"até que nele nenhum fôlego ficou\" (v. 17). O profeta o leva ao quarto de cima e clama por ele (v. 21). É a primeira ressurreição da Escritura, e acontece na casa de uma viúva pagã (cf. Lc 7:15)."
    }
  },

  // ---------------------------------------------------------------- 1Rs 18
  18: {
    anciao: {
      title: "Os cem profetas do SENHOR escondidos nas covas",
      subtitle: "1Rs 18:4,13 • os velhos que Obadias sustentou com pão e água",
      text: "\"destruindo Jezabel os profetas do Senhor, Obadias tomou cem profetas, e de cinqüenta em cinqüenta os escondeu numa cova, e os sustentou com pão e água\" (18:4). São eles a prova de que Elias se enganava ao dizer \"Só eu fiquei\" (v. 22): Deus tinha reserva, mas ela estava debaixo da terra, em plena seca, quando pão e água valiam mais que prata. Escondidos em duas covas, para que uma delação não levasse tudo. Não sobem ao Carmelo; a sua fidelidade é continuar vivo e fiel no escuro — e é dela que sairão os \"filhos dos profetas\" das gerações seguintes (2Rs 2:3)."
    },
    cavaleiro: {
      title: "O condutor do carro de Acabe",
      subtitle: "1Rs 18:44-45 • quem aparelha o carro real antes que a chuva feche o caminho",
      text: "Ele espera ao pé do Carmelo o dia inteiro e só entra em cena quando a nuvem \"como a mão de um homem\" sobe do mar (18:44). O recado que chega é urgente e prático: \"Aparelha o teu carro, e desce, para que a chuva não te impeça\" — o mesmo aguaceiro que salva a terra pode atolar o rei nos vales de Jizreel. \"e veio uma grande chuva; e Acabe subiu ao carro, e foi para Jizreel\" (v. 45). O detalhe final humilha toda a cavalaria do Norte: com a mão do SENHOR sobre ele, um profeta a pé cinge os lombos e chega correndo adiante do carro real (v. 46)."
    },
    homem: {
      title: "Obadias, o mordomo — e os quatrocentos e cinqüenta profetas de Baal",
      subtitle: "1Rs 18 • o servo do rei que temia ao SENHOR, e os que se retalhavam junto ao altar",
      text: "Obadias é o retrato de uma fidelidade impossível: mordomo da casa de Acabe e ao mesmo tempo o homem que escondeu cem profetas, porque \"temia muito ao Senhor\" (18:3) desde a mocidade (v. 12). Junto dele estão os famintos de Samaria e o próprio rei percorrendo fontes \"para que em vida conservemos os cavalos e mulas\" (v. 5). No Carmelo, os homens em cena são o clero de Jezabel (v. 19), que salta sobre o altar e \"se retalhavam com facas e com lancetas... até derramarem sangue sobre si\" (v. 28). O veredicto é seco: \"não houve voz, nem resposta, nem atenção alguma\" (v. 29)."
    },
    mulherComum: {
      title: "As mulheres de Samaria na fome e as israelitas no Carmelo",
      subtitle: "1Rs 18 • quem administra a última água em casa e sobe ao monte para ver o julgamento",
      text: "Três anos sem chuva pesam primeiro sobre quem cuida da casa: \"a fome era extrema em Samaria\" (18:2), e a água é medida em gotas enquanto o rei sai a percorrer \"a todas as fontes de água, e a todos os rios\" (v. 5) atrás de erva para os animais. Depois elas estão no monte, no meio de todo o Israel, diante da pergunta que ninguém quer responder (v. 21) — e o texto anota o constrangimento com uma frase só: \"Porém o povo nada lhe respondeu\". Quando o fogo cai, caem com todos sobre os rostos (v. 39); e é para as casas delas que a chuva volta naquela noite."
    },
    multidao: {
      title: "Todo o Israel reunido no monte Carmelo",
      subtitle: "1Rs 18:20-39 • o povo que coxeava entre dois pensamentos e caiu sobre o rosto",
      text: "Acabe \"convocou todos os filhos de Israel; e reuniu os profetas no monte Carmelo\" (18:20), e esse povo é a verdadeira parte julgada no capítulo: não vieram como réus, mas a acusação é sobre eles — \"Até quando coxeareis entre dois pensamentos?\" (v. 21), gente que queria o SENHOR e Baal ao mesmo tempo. Concordam com a regra (v. 24) e passam o dia vendo o outro lado gritar em vão. Quando o fogo consome até a água do rego, \"caíram sobre os seus rostos, e disseram: Só o Senhor é Deus!\" (v. 39). É o povo do pacto voltando ao seu lugar."
    },
    patriarca: {
      title: "O ofício do profeta no dia do Carmelo",
      subtitle: "1Rs 18 • um profeta em cena, cem debaixo da terra, oitocentos e cinqüenta na mesa da rainha",
      text: "O capítulo põe lado a lado os três estados do ofício profético no Norte. Clandestinos são os cem escondidos numa cova, sustentados com pão e água (18:4,13) — vivos, fiéis e invisíveis. Falsos são os que \"comem da mesa de Jezabel\" (v. 19): um clero de corte, pago pelo palácio, cuja liturgia é gritar alto e sangrar. Público é o profeta que se apresenta ao rei porque foi mandado (v. 1) e cuja oração não pede espetáculo, mas prova de mandato: \"que eu sou teu servo, e que conforme à tua palavra fiz todas estas coisas\" (v. 36)."
    },
    rebanho: {
      title: "Os dois bezerros do desafio do Carmelo",
      subtitle: "1Rs 18:23-38 • um posto sobre a lenha em vão, o outro consumido pelo fogo do SENHOR",
      text: "A regra do juízo é dita com dois animais: \"eles escolham para si um dos bezerros, e o dividam em pedaços, e o ponham sobre a lenha, porém não lhe coloquem fogo\" (18:23). Escolhem primeiro, para que ninguém alegue vantagem, e o bezerro de Baal fica a manhã inteira sobre a lenha seca. O segundo é posto num altar de doze pedras, \"conforme ao número das tribos\" (v. 31), e encharcado de propósito até a água correr em volta. Então o fogo do SENHOR consome tudo (v. 38): o sacrifício aceito é sempre o que Deus mesmo consome."
    },
    rei: {
      title: "Acabe entre o mordomo e o profeta",
      subtitle: "1Rs 18 • o rei que procura erva para os cavalos e chama Elias de perturbador",
      text: "Três anos de fome reduziram o trono a uma busca por capim: \"pode ser que achemos erva, para que em vida conservemos os cavalos e mulas\" (18:5) — o rei divide a terra com o mordomo e sai a procurar pasto, sem uma única vez perguntar por que o céu se fechou. Ao reencontrar o profeta, a sua primeira palavra é uma acusação: \"És tu o perturbador de Israel?\" (v. 17), e recebe a resposta que inverte os papéis (v. 18). Assiste ao fogo cair e não muda nada: no capítulo seguinte, o relato que leva para casa é apenas o número de mortos (19:1)."
    },
    servo: {
      title: "Os carregadores dos quatro cântaros e o moço de Elias",
      subtitle: "1Rs 18:34-44 • quem encharca o altar em plena seca e quem olha sete vezes para o mar",
      text: "Os primeiros fazem o gesto mais absurdo do dia: em terra sem chuva há três anos, sobem água e a derramam sobre o sacrifício — \"Enchei de água quatro cântaros\", repetido segunda e terceira vez, \"de maneira que a água corria ao redor do altar\" (18:34-35). Doze cântaros carregados para tornar o milagre impossível de falsificar: a obediência deles é parte da prova. O outro é o moço que fica no cume enquanto o rei desce a comer, e volta seis vezes com \"Não há nada\" (v. 43) até avistar à sétima \"uma pequena nuvem, como a mão de um homem\" (v. 44; cf. Tg 5:17-18)."
    }
  },

  // ---------------------------------------------------------------- 1Rs 19
  19: {
    anciao: {
      title: "Safate, o pai de Eliseu, senhor das doze juntas de bois",
      subtitle: "1Rs 19:19-21 • o lavrador de Abel-Meolá cujo filho é chamado do arado",
      text: "Eliseu é apresentado como \"filho de Safate\" (19:16), e é a lavoura do pai que aparece no quadro: \"doze juntas de bois adiante dele, e ele estava com a duodécima\" (v. 19) — uma propriedade grande, em Abel-Meolá. Este velho vê a capa do profeta cair sobre o ombro do filho e o ouve pedir só \"Deixa-me beijar a meu pai e a minha mãe\" (v. 20). Depois vê o herdeiro matar a junta e repartir as carnes com o povo (v. 21): a herança inteira virou banquete de despedida. Numa geração que adorava Baal, esta casa do campo entrega o seu filho ao SENHOR."
    },
    homem: {
      title: "Eliseu e os lavradores de Abel-Meolá",
      subtitle: "1Rs 19:19-21 • o arado deixado no meio do sulco e o povo que come da carne cozida",
      text: "Eliseu não está numa escola de profetas nem num templo: está trabalhando, com \"doze juntas de bois adiante dele, e ele estava com a duodécima\" (19:19), quando Elias passa e \"lançou a sua capa sobre ele\" — gesto sem uma palavra, que é ao mesmo tempo unção, adoção e ordem de marcha. À volta estão os outros lavradores, que serão os convidados da festa (v. 21). Queimar o arado para assar os bois é dizer publicamente que não há volta (cf. Lc 5:11). E o novo profeta começa por baixo: \"se levantou e seguiu a Elias, e o servia\"."
    },
    mulherComum: {
      title: "A mãe de Eliseu, as vizinhas de Abel-Meolá — e a rainha que manda o recado",
      subtitle: "1Rs 19 • a ameaça que sai de Jizreel e a despedida que acontece na lavoura",
      text: "O capítulo abre com uma mulher que governa por mensageiro: \"Assim me façam os deuses... se de certo amanhã a estas horas não puser a tua vida como a de um deles\" (19:2) — o dia seguinte ao fogo do Carmelo é o dia em que o profeta corre para o deserto. E fecha com outra mulher, sem nome e sem poder nenhum: a mãe que o novo profeta pede licença para beijar antes de partir (v. 20). Uma rainha ameaça de morte em nome dos seus deuses; uma mãe do campo entrega o filho ao SENHOR: as duas mulheres do capítulo são os dois Israéis daquele momento."
    },
    patriarca: {
      title: "O ofício do profeta depois do Carmelo: sucessão, sobrevivência e os sete mil",
      subtitle: "1Rs 19 • os profetas mortos à espada, a capa passada adiante e a reserva que Deus guardou",
      text: "Depois do dia mais glorioso do ministério profético vem o mais escuro: um homem exausto debaixo de um zimbro pedindo a morte (19:4), e um anjo mandando comer duas vezes antes da caminhada. A queixa que ele leva a Horebe é o retrato da profissão naqueles dias: \"mataram os teus profetas à espada, e só eu fiquei\" (v. 14). Deus não o repreende com trovão: o vento, o terremoto e o fogo passam, e o SENHOR não está neles; a resposta vem em \"uma voz mansa e delicada\" (v. 12) e é uma lista de tarefas. E a solidão é desmentida por uma contagem que só Deus tinha: sete mil (v. 18; Rm 11:2-5)."
    },
    rebanho: {
      title: "As doze juntas de bois de Eliseu",
      subtitle: "1Rs 19:19-21 • os animais do arado, e a junta que virou holocausto e jantar",
      text: "\"achou a Eliseu, filho de Safate, que andava lavrando com doze juntas de bois adiante dele, e ele estava com a duodécima\" (19:19): vinte e quatro animais em fileira, sinal de casa próspera e de um moço que trabalhava junto com os seus, na última junta, e não de longe. Doze juntas para as doze tribos é uma imagem que o texto não explica mas o leitor sente. Chamado, ele não vende os bois nem os deixa pastando à espera de arrependimento: mata a junta e coze as carnes com os aparelhos do arado (v. 21). Quando Deus chama, o arado serve de lenha."
    },
    rei: {
      title: "Acabe, o rei que virou mensageiro da própria mulher",
      subtitle: "1Rs 19:1 • quem viu o fogo cair e só soube contar o número de mortos",
      text: "O único ato do rei neste capítulo é uma delação doméstica: \"E Acabe fez saber a Jezabel tudo quanto Elias havia feito, e como totalmente matara todos os profetas à espada\" (19:1). Ele estava no Carmelo, viu o fogo consumir as pedras, ouviu o povo cair de rosto gritando que só o SENHOR é Deus — e o que leva para casa é o relatório da matança, entregue a quem sustentava aquele clero à sua mesa. Não convoca reforma, não quebra o altar de Baal, não diz uma palavra. A explicação está em 21:25: \"Jezabel, sua mulher, o incitava\"."
    },
    servo: {
      title: "O moço deixado em Berseba, o mensageiro de Jezabel e os servos da lavoura",
      subtitle: "1Rs 19 • quem carrega a ameaça, quem é deixado para trás e quem serve o profeta novo",
      text: "O primeiro atravessa o reino com uma sentença na boca, mandado por Jezabel (19:2). O segundo é um moço sem nome, companheiro de fuga que não chega ao fim dela: \"chegando a Berseba, que é de Judá, deixou ali o seu servo\" (v. 3) — Berseba é o extremo sul, e dali para diante o deserto é feito sozinho. Depois há os lavradores de Abel-Meolá (v. 21). E há, por fim, o moço que se torna o serviço em pessoa: Eliseu \"se levantou e seguiu a Elias, e o servia\", lembrado em 2Rs 3:11 como \"que derramava água sobre as mãos de Elias\" — a sucessão passa pela bacia."
    }
  },

  // ---------------------------------------------------------------- 1Rs 20
  20: {
    anciao: {
      title: "Os anciãos da terra chamados por Acabe em Samaria",
      subtitle: "1Rs 20:7-8 • o conselho que disse ao rei para não consentir",
      text: "Cercada a cidade, o rei já tinha cedido tudo (20:4) e só chama conselho quando a exigência passa a ser o saque das casas: \"o rei de Israel chamou a todos os anciãos da terra\" (v. 7). São os cabeças de famílias e cidades, instituição anterior à monarquia (Êx 3:16), e é deles que sai a única palavra firme do palácio: \"Não lhe dês ouvidos, nem consintas\" (v. 8). O rei que se entregou sozinho encontra coragem quando o povo o obriga. Vale notar quem não é consultado: em todo o cerco ninguém pergunta ao SENHOR, e é Ele quem vem falar primeiro, sem ser chamado (v. 13)."
    },
    cavaleiro: {
      title: "A cavalaria de Ben-Hadade",
      subtitle: "1Rs 20 • os cavalos e carros de trinta e dois reis, e a fuga do rei da Síria",
      text: "A força que cerca Samaria é descrita pela sua cavalaria: \"havia com ele trinta e dois reis, e cavalos e carros\" (20:1) — um exército de coalizão diante de uma cidade faminta. Quando a linha se rompe pela mão de duzentos e trinta e dois moços, é a montaria que salva o comandante (v. 20). No ano seguinte a Síria reconstrói exatamente a mesma arma, \"cavalo por cavalo, e carro por carro\" (v. 25), porque o seu diagnóstico da derrota foi teológico e errado (v. 23). Contra essa aritmética, o SENHOR entrega cem mil homens de pé num só dia (v. 29)."
    },
    homem: {
      title: "Os duzentos e trinta e dois moços dos príncipes — e os profetas anônimos",
      subtitle: "1Rs 20 • quem sai ao meio-dia contra a Síria e quem se põe no caminho do rei",
      text: "A vitória é dada pela tropa mais improvável do reino: \"Pelos moços dos príncipes das províncias\" (20:14), contados na hora — \"foram duzentos e trinta e dois\" (v. 15). \"E saíram ao meio-dia\" (v. 16), à hora em que ninguém ataca e em que o rei sírio estava \"bebendo e embriagando-se nas tendas\". Os outros homens do capítulo são profetas sem nome: o que anuncia as duas vitórias \"para que saibas que eu sou o Senhor\" (v. 13,28), e o que arma a parábola final, disfarçado com cinza sobre os olhos, e leva o rei a pronunciar a própria sentença (v. 40)."
    },
    rebanho: {
      title: "Os dois pequenos rebanhos de cabras diante de Afeque",
      subtitle: "1Rs 20:27 • a imagem com que a Escritura mede Israel contra a Síria",
      text: "A comparação é do próprio texto, e é humilhante: \"os filhos de Israel acamparam-se defronte deles, como dois pequenos rebanhos de cabras; mas os sírios enchiam a terra\" (20:27). Dois currais de cabras contra um exército que cobre o horizonte — e a desproporção é justamente o argumento, porque a batalha existe para responder à blasfêmia de que \"O Senhor é Deus dos montes, e não Deus dos vales\" (v. 28). No sétimo dia os dois rebanhos ferem cem mil homens de pé (v. 29). É o padrão de Deus desde Gideão: reduz o número para que a vitória não tenha outro nome senão o Seu."
    },
    rei: {
      title: "Ben-Hadade e os trinta e dois reis — e Acabe, o rei clemente na hora errada",
      subtitle: "1Rs 20 • a coalizão que bebia nas tendas e o vencedor que chamou o inimigo de irmão",
      text: "De um lado, uma coroa arrogante: Ben-Hadade, com trinta e dois reis vassalos, jura que \"o pó de Samaria não bastará para encher as mãos de todo o povo que me segue\" (20:10) — e passa as duas batalhas bebendo nas tendas ou escondendo-se de câmara em câmara. Do outro, Acabe, que recebe duas vitórias de graça e no fim faz o único negócio que Deus não autorizou: \"Pois ainda vive? É meu irmão\" (v. 32). A sentença é imediata: \"a tua vida será em lugar da sua vida\" (v. 42) — a mesma falha de Saul com Agague (1Sm 15:9-23). E ele volta para casa \"desgostoso e indignado\" (v. 43)."
    },
    servo: {
      title: "Os mensageiros de Ben-Hadade e os servos de sacos aos lombos",
      subtitle: "1Rs 20 • quem leva as exigências entre as duas cortes e quem negocia a vida do senhor",
      text: "O capítulo inteiro anda pelas pernas de mensageiros: entram na cidade cercada com \"A tua prata e o teu ouro são meus\" (20:3) e levam de volta a resposta que fecha a negociação (v. 9). Depois da derrota em Afeque, são os servos do rei sírio que salvam o senhor com uma leitura fina da política do Norte: \"já temos ouvido que os reis da casa de Israel são reis clementes; ponhamos, pois, sacos aos lombos, e cordas às cabeças\" (v. 31). Funciona. O contraste é cruel: servos pagãos conhecem melhor o coração do rei de Israel do que ele conhece a vontade do SENHOR."
    }
  },

  // ---------------------------------------------------------------- 1Rs 21
  21: {
    anciao: {
      title: "Os anciãos e nobres de Jizreel",
      subtitle: "1Rs 21:8-13 • o tribunal da cidade que obedeceu a cartas seladas",
      text: "São os homens que deviam ser a defesa de Nabote e foram a arma contra ele: as cartas seladas com o sinete do rei chegam \"aos anciãos e aos nobres que havia na sua cidade e habitavam com Nabote\" (21:8). Eram vizinhos dele, sentavam-se com ele à porta, e mesmo assim \"fizeram como Jezabel lhes ordenara\" (v. 11). Cumprem tudo à risca, com duas testemunhas para satisfazer a exigência da lei (Dt 17:6) e uma pena de blasfêmia para satisfazer o palácio: a lei de Deus foi seguida na forma e assassinada no conteúdo (v. 13). O silêncio de um conselho inteiro é tão homicida quanto a pedra."
    },
    homem: {
      title: "Nabote, o jizreelita — e os dois filhos de Belial",
      subtitle: "1Rs 21 • quem recusou vender a herança dos pais e quem jurou mentira contra ele",
      text: "Nabote não é um camponês teimoso: é um israelita que conhece a lei. A vinha é herança de família, e a terra em Israel não se vende porque não é do lavrador — \"a terra é minha\", diz o SENHOR (Lv 25:23). Por isso a resposta é um voto religioso, não uma negociação: \"Guarde-me o Senhor de que eu te dê a herança de meus pais\" (21:3). Contra ele são postos \"dois filhos de Belial\" (v. 10) — testemunhas compradas, exatamente o que a lei mandava punir com a pena que a mentira buscava (Dt 19:16-19). O homem justo morre fora da cidade por causa da sua herança; mas o sangue tem voz."
    },
    mulherComum: {
      title: "Jezabel, que governa por cartas — e as mulheres de Jizreel",
      subtitle: "1Rs 21 • a rainha que ensina o marido a tomar, e a cidade que vê o vizinho ser apedrejado",
      text: "A pergunta com que ela levanta o marido da cama é a tese de todo o capítulo: \"Governas tu agora no reino de Israel?... eu te darei a vinha de Nabote\" (21:7) — para ela o rei é dono de tudo, como em Sidom; para Israel, o rei está debaixo da lei (cf. 1Sm 8:14). Ela não mata com a própria mão: escreve, sela com o sinete do marido, convoca jejum e usa a religião como palco do crime. Sobre ela cai uma sentença que o texto guarda em separado: \"Os cães comerão a Jezabel junto ao antemuro de Jizreel\" (v. 23) — cumprida à letra no mesmo terreno que ela tomou (2Rs 9:36)."
    },
    patriarca: {
      title: "O ofício do profeta diante do rei: a voz que ainda acusa em Israel",
      subtitle: "1Rs 21 • a linhagem de Aías, de Jeú filho de Hanani e dos filhos dos profetas",
      text: "Este capítulo mostra para que serve o ofício profético num reino onde já não há quem controle o trono: quando os anciãos obedecem a cartas seladas e as testemunhas são compradas, sobra um homem mandado por Deus para dizer ao rei o que ninguém dirá (21:18) — a mesma função de Aías contra Jeroboão e de Jeú contra Baasa. O profeta não negocia nem adoça: chega à vinha roubada e pergunta \"Porventura não mataste e tomaste a herança?\" (v. 19). E o ofício não é só ameaça: quando o rei anda mansamente em saco, a mesma boca recebe a palavra de adiamento (v. 29)."
    },
    rei: {
      title: "Acabe, o rei que se deitou de cara para a parede",
      subtitle: "1Rs 21 • quem podia tudo e emburrou por uma horta",
      text: "O quadro é quase cômico se não fosse mortal: dono do Norte inteiro, ele volta para casa desgostoso porque um vizinho não lhe vendeu uma vinha, \"E deitou-se na sua cama, e voltou o rosto, e não comeu pão\" (21:4). Não mata ninguém — apenas deixa a mulher matar, e desce a tomar posse sem perguntar como a vinha ficou vaga. O veredicto é o mais duro dado a um rei de Israel (v. 25). Encontrado na leira do morto, reage como sempre (v. 20) — mas desta vez a palavra o quebra, e ele jaz em saco e anda mansamente (v. 27). E Deus adia o mal para os dias do filho."
    },
    servo: {
      title: "O vinhateiro da leira, o correio de Jezabel e os moços do paço",
      subtitle: "1Rs 21 • as mãos que trabalham a vinha, levam as cartas e trazem a notícia da morte",
      text: "O primeiro é quem cuidava da vinha que o rei queria transformar em horta (21:2), e que de um dia para o outro passa a trabalhar para o assassino do seu senhor. Os segundos carregam papel: levam as cartas seladas e trazem de volta o recibo do crime, \"Nabote foi apedrejado, e morreu\" (v. 14), que a rainha repassa ao marido como boa notícia. Há ainda os moços do paço que veem o rei virar o rosto para a parede e que o vestem de saco quando a sentença cai (v. 27). A maquinaria de um crime de Estado funciona porque muita gente pequena entrega a carta sem perguntar o que está escrito."
    }
  },

  // ---------------------------------------------------------------- 1Rs 22
  22: {
    anciao: {
      title: "Os anciãos da corte de Jeosafá em Jerusalém",
      subtitle: "1Rs 22:41-51 • os conselheiros do rei bom de Judá que não tirou os altos",
      text: "Depois de Ramote de Gileade, a câmera atravessa a fronteira e mostra outra corte: Jeosafá, vinte e cinco anos em Jerusalém, e à volta dele os anciãos que servem a um rei que fez \"o que era reto aos olhos do Senhor\" (22:43). São eles que administram a reforma (v. 47) e que convivem com a falha anotada logo em seguida: \"Todavia os altos não se tiraram\" (v. 44). Foi este conselho que ouviu o rei pedir em Samaria a única coisa certa daquele dia — \"consulta hoje a palavra do Senhor\" (v. 5) — e o viu, ainda assim, subir à peleja de um rei ímpio."
    },
    cavaleiro: {
      title: "Os trinta e dois capitães dos carros da Síria e a cavalaria de Israel",
      subtitle: "1Rs 22:31-33 • a ordem de caçar um homem só no campo de batalha",
      text: "A batalha de Ramote é decidida por uma ordem dada antes dela: \"Não pelejareis nem contra pequeno nem contra grande, mas só contra o rei de Israel\" (22:31). Toda a cavalaria de um império empenhada em achar um único homem — e o único homem entra disfarçado, enquanto manda o aliado vestir as roupas reais (v. 30). Os carros erram o alvo, cercam Jeosafá, \"porém Jeosafá gritou\" (v. 32), e deixaram de o seguir. O disfarce funcionou contra trinta e dois capitães e falhou contra uma flecha atirada a esmo: nenhuma armadura protege de uma palavra profética já pronunciada."
    },
    homem: {
      title: "Micaías, filho de Inlá, Zedequias dos chifres de ferro e o arqueiro que atirou a esmo",
      subtitle: "1Rs 22 • quem disse a verdade, quem bateu no seu rosto e quem cumpriu a sentença sem saber",
      text: "Micaías é o homem que o rei odiava \"porque nunca profetiza de mim o que é bom\" (22:8) e que responde ao mensageiro enviado para o alinhar ao coro com o juramento do ofício: \"o que o Senhor me disser isso falarei\" (v. 14). Contra ele está Zedequias, que fabricou chifres de ferro para encenar a vitória e termina batendo no profeta (v. 24). O preço da verdade é o cárcere e o \"pão de angústia\" (v. 27), e ele responde jogando o ministério na aposta (v. 28). E o último homem do capítulo nem sabe o que fez: \"atirou a esmo, e feriu o rei de Israel por entre as fivelas\" (v. 34)."
    },
    mulherComum: {
      title: "As prostitutas do tanque de Samaria, Azuba de Jerusalém e a rainha de Jizreel",
      subtitle: "1Rs 22 • as mulheres nas margens do capítulo, do sangue lavado ao trono de Judá",
      text: "A primeira aparece num parêntese que a Escritura não teve pudor de escrever: lavando-se o carro no tanque de Samaria, \"os cães lamberam o seu sangue (ora as prostitutas se lavavam ali)\" (22:38) — o corpo de um rei que se vendeu ao mal termina misturado à água mais suja da capital, conforme a palavra sobre o sangue de Nabote (21:19). A segunda é uma mãe de Judá registrada pelo nome, como sempre com as rainhas-mães do Sul: \"Azuba, filha de Sili\" (v. 42). E ao fundo permanece Jezabel, cujo filho reinará \"no caminho de sua mãe\" (v. 53): a casa que ela plantou sobrevive ao marido morto."
    },
    multidao: {
      title: "Os quatrocentos profetas que profetizavam diante dos dois tronos",
      subtitle: "1Rs 22:6-12 • o coro unânime na praça, à entrada da porta de Samaria",
      text: "\"Então o rei de Israel reuniu os profetas até quase quatrocentos homens\" (22:6), e todos dizem a mesma coisa, com as mesmas palavras. Não são profetas de Baal — usam o nome do SENHOR e profetizam na praça diante dos dois reis \"assentados cada um no seu trono, vestidos de trajes reais\" (v. 10). É por isso que Jeosafá desconfia: \"Não há aqui ainda algum profeta do Senhor?\" (v. 7) — unanimidade paga não é confirmação. A explicação vem da visão do trono do céu (v. 23), e é o juízo mais assustador do capítulo: quem só quer ouvir o que agrada recebe a mentira que pediu (2Ts 2:11)."
    },
    pastor: {
      title: "O pastor da fronteira de Gileade",
      subtitle: "1Rs 22:1,17,45 • quem apascenta nos três anos de paz e a imagem do rebanho sem dono",
      text: "Ele abre o capítulo sem dizer palavra, apascentando onde há três anos não há guerra (22:1) — a paz que o rei considera insuficiente porque \"Ramote de Gileade é nossa\" (v. 3). Depois o seu ofício vira profecia: Micaías vê o exército derrotado como um rebanho abandonado, \"como ovelhas que não tem pastor\" (v. 17), e ouve a sentença sobre o rei que morreria naquele dia. No fim, o pregão que passa pelo exército é precisamente esse: \"Cada um para a sua cidade\" (v. 36). Israel tinha rei e não tinha pastor — a mesma compaixão que moveria Jesus diante das multidões (Mc 6:34)."
    },
    rebanho: {
      title: "As ovelhas dos montes de Gileade",
      subtitle: "1Rs 22:17 • o rebanho da fronteira e a visão do Israel disperso",
      text: "Nos primeiros beats são ovelhas de verdade, pastando na fronteira de Gileade durante os três anos de quietude entre a Síria e Israel (22:1) — a terra em paz que o rei trocará por uma cidade em disputa. Depois passam a ser a imagem central da profecia de Micaías: \"Vi a todo o Israel disperso pelos montes, como ovelhas que não tem pastor\" (v. 17). A figura tem história: Moisés pedira sucessor por isso mesmo (Nm 27:17), e os profetas a usariam contra os reis que apascentavam a si mesmos (Ez 34:2-6). Aqui o rebanho não é destruído: é mandado para casa em paz."
    },
    rei: {
      title: "Acabe e Jeosafá nos dois tronos — e a sucessão de Acazias e Jeorão",
      subtitle: "1Rs 22 • a aliança entre o Norte e o Sul que quase custou dois reis",
      text: "O capítulo põe lado a lado o rei que odeia a verdade e o rei que a pede tarde demais. Jeosafá adere primeiro e consulta depois: \"Serei como tu, e o meu povo como o teu povo\" (22:4), e só então lembra de dizer \"consulta hoje a palavra do Senhor\" (v. 5). Acabe ouve a sentença, prende o profeta e tenta enganar a profecia com um disfarce (v. 30) — e morre encostado no carro, sustentado até à tarde (v. 35). Duas dinastias seguem adiante: uma segura pela promessa a Davi, a outra correndo para o juízo que Elias anunciou na vinha (v. 54)."
    },
    servo: {
      title: "O carreteiro de Acabe, o guarda do cárcere e os que lavaram o carro",
      subtitle: "1Rs 22 • quem segura o rei em pé até a tarde e quem limpa o sangue no tanque",
      text: "O carreteiro recebe a ordem final do seu senhor no meio da peleja — \"Dá volta, e tira-me do exército, porque estou gravemente ferido\" (22:34) — e passa a tarde inteira sustentando o rei em pé no carro \"defronte dos sírios\" (v. 35). O guarda do cárcere fica com uma dieta escrita pelo próprio rei, \"até que eu venha em paz\" (v. 27) — e o rei nunca volta, o que o faz a primeira testemunha de que Micaías dissera a verdade. Os últimos são os que lavam o carro no tanque, e é ali que a palavra se fecha: \"os cães lamberam o seu sangue\" (v. 38)."
    }
  }
};
