// Fichas ESPECÍFICAS por (capítulo → papel) de numbers — quem é aquela figura
// (mesmo anônima na Bíblia) no contexto daquele capítulo, biblicamente e
// teologicamente. Vence a ficha genérica do papel. Preenchido pelo agente.
import type { StageInfo } from "@/lib/rpgStageInfo";
export const CHAPTER_ACTORS: Record<number, Record<string, StageInfo>> = {
  1: {
    multidao: {
      title: "Israel recenseado no Sinai",
      subtitle: "Números 1 • o censo dos filhos de Israel",
      text: "A congregação dos filhos de Israel, contada tribo por tribo no deserto do Sinai um ano após o Êxodo — todo homem de vinte anos para cima que podia \"sair à guerra\" (Nm 1:3). Não é multidão anônima: é o exército do SENHOR sendo organizado para herdar a promessa, cada nome conhecido e chamado. O número (603.550) mostra Deus cumprindo a palavra dada a Abraão de multiplicar a sua semente (Gn 15:5).",
    },
    anciao: {
      title: "Os doze príncipes das tribos",
      subtitle: "Números 1 • os cabeças das casas paternas",
      text: "Os homens designados por nome para estar com Moisés e Arão no censo — Elizur, Selumiel, Naasson e os demais — \"os príncipes das tribos de seus pais, os cabeças dos milhares de Israel\" (Nm 1:16). Cada um responde pela casa paterna que representa, porque em Israel ninguém é número solto: cada família tem quem a apresente diante do SENHOR. É o primeiro esboço do governo do povo de Deus por homens escolhidos e nomeados (Nm 1:4).",
    },
    rei: {
      title: "Naasson, príncipe de Judá",
      subtitle: "Números 1 • o cetro na tribo que marcha primeiro",
      text: "Israel ainda não tem rei, e a figura coroada da cena é o cabeça de Judá, Naasson, filho de Aminadabe, cuja tribo é a mais numerosa do censo — setenta e quatro mil e seiscentos (Nm 1:26-27). Judá é a tribo de quem Jacó dissera que o cetro não se apartaria (Gn 49:10), e desta casa virão Davi e o Cristo (Rt 4:20; Mt 1:4). O censo já traz, escondido no meio dos números, o caminho do trono.",
    },
    servo: {
      title: "Os levitas do tabernáculo",
      subtitle: "Números 1 • a tribo não contada no exército",
      text: "Os filhos de Levi, deixados de fora da soma dos guerreiros e postos \"sobre o tabernáculo do testemunho\" para o desarmar, o levar e o armar (Nm 1:50-51). Acampam ao redor da tenda para que não haja indignação sobre a congregação (Nm 1:53). Não pelejam com espada: guardam a santidade do lugar onde Deus habita, e nisso servem ao povo inteiro.",
    },
    homem: {
      title: "Os contados de vinte anos para cima",
      subtitle: "Números 1 • os homens que podem sair à guerra",
      text: "São os homens de Israel que passam um a um diante de Moisés, de Arão e do príncipe da sua tribo, declarando a sua genealogia \"pelas suas gerações, segundo as suas famílias, segundo a casa de seus pais\" (Nm 1:18). Cada um é contado \"cabeça por cabeça\" (Nm 1:2), não como massa, mas como soldado com nome e casa. O escravo que saiu do Egito está sendo formado em exército do SENHOR (Êx 12:41).",
    },
    patriarca: {
      title: "Os cabeças das casas paternas",
      subtitle: "Números 1 • um homem de cada tribo, nomeado por Deus",
      text: "Os príncipes que o próprio SENHOR designa pelo nome para estar com Moisés e Arão no censo: \"cada um cabeça da casa de seus pais\" (Nm 1:4). Em Israel a tribo é feita de casas, e a casa tem quem responda por ela — por isso o censo não é anônimo: passa de pai em pai. Estes mesmos homens trarão depois as ofertas da dedicação do altar (Nm 7:2).",
    },
  },
  2: {
    multidao: {
      title: "Israel acampado por tribos",
      subtitle: "Números 2 • o arraial em torno do tabernáculo",
      text: "As doze tribos dispostas em quadra ao redor da tenda da congregação, cada uma sob o seu estandarte — três a oriente, três ao sul, três ao ocidente, três ao norte (Nm 2:2). A ordem não é só militar: revela que o povo só existe com Deus habitando no meio dele. Já prefigura o acampamento dos remidos ao redor do trono (Ap 7:9).",
    },
    servo: {
      title: "Os levitas no meio dos exércitos",
      subtitle: "Números 2 • a tenda que marcha no centro",
      text: "Os levitas que acampam junto ao tabernáculo e o levam na marcha: \"partirá a tenda da congregação com o exército dos levitas no meio dos exércitos\" (Nm 2:17). Não têm bandeira própria entre as doze; o seu lugar é o centro, entre as tribos. Assim o serviço do santuário fica no coração do povo, sinal de que a presença de Deus é o eixo de toda a caminhada.",
    },
  },
  3: {
    homem: {
      title: "Os filhos de Coate, Gérson e Merari",
      subtitle: "Números 3 • as famílias de Levi",
      text: "São os homens das três casas de Levi contadas de um mês para cima: Anrão, Izar, Hebrom e Uziel entre os coatitas; Libni e Simei entre os gersonitas; Mali e Musi entre os meraritas (Nm 3:17-20). Cada família com o seu posto ao redor do tabernáculo e a sua carga — as coisas santíssimas, as cortinas, as tábuas. Ninguém escolheu a própria tarefa: o Senhor a designou (Nm 3:25-37)." },
    mulherComum: {
      title: "As mães dos primogênitos resgatados",
      subtitle: "Números 3 • os levitas no lugar dos filhos",
      text: "A Escritura não lhes dá o nome, mas são as mães de Israel cujos primogênitos pertenciam ao Senhor desde a noite do Egito (Êx 13:2). Em vez deles, Deus tomou os levitas — \"meus serão os levitas\" (Nm 3:12) — e os 273 que excederam foram resgatados a cinco siclos (Nm 3:46-47). Cada moeda pesada lembrava a essas casas que o filho vivia porque um substituto ocupara o seu lugar." },
    multidao: {
      title: "Israel ao redor dos levitas contados",
      subtitle: "Números 3 • o arraial e os seus guardas",
      text: "É o povo acampado em ordem, vendo Levi ser posto entre ele e a tenda: \"os levitas acamparão ao redor do tabernáculo do testemunho, para que não haja indignação sobre a congregação\" (Nm 1:53; 3:38). Entre a santidade de Deus e o arraial havia uma tribo inteira de permeio — figura do mediador de que todo o povo precisa (Hb 5:1)." },
    rebanho: {
      title: "O gado dos levitas, resgate do gado de Israel",
      subtitle: "Números 3 • até os animais substituídos",
      text: "\"Toma os levitas em lugar de todos os primogênitos entre os filhos de Israel, e o gado dos levitas em lugar do seu gado\" (Nm 3:41,45). Até os animais entraram na conta da substituição: o rebanho de Levi ocupou o lugar das primícias dos currais de Israel, para que tudo o que abre a madre fosse do Senhor sem que Israel perdesse os seus." },
    servo: {
      title: "Gérson, Coate e Merari",
      subtitle: "Números 3 • os levitas dados a Arão",
      text: "As três famílias levíticas contadas de um mês para cima e repartidas em torno da tenda: os gersonitas com as cortinas, os coatitas com a arca e os utensílios santos, os meraritas com as tábuas e colunas (Nm 3:25,31,36). São tomados do meio de Israel em lugar de todo primogênito, e \"dentre os filhos de Israel lhes são dados em dádiva\" ao sacerdote (Nm 3:9,12). O serviço deles é vida para o povo, pois \"o estranho que se chegar morrerá\" (Nm 3:10).",
    },
  },
  4: {
    servo: {
      title: "Os levitas de trinta a cinquenta anos",
      subtitle: "Números 4 • os carregadores das coisas santas",
      text: "Os levitas em plena idade do serviço, contados para levar o tabernáculo desmontado quando o arraial parte — cada família com o seu cargo designado \"nome por nome\" (Nm 4:32). Os coatitas só se aproximam depois que Arão e seus filhos cobrem o santuário, pois \"no santuário não tocarão para que não morram\" (Nm 4:15). O trabalho é braçal e o cuidado é santo: servir a Deus exige reverência tanto quanto força.",
    },
    anciao: {
      title: "Os príncipes da congregação no censo de Levi",
      subtitle: "Números 4 • os que contaram com Moisés e Arão",
      text: "Os cabeças de Israel que se puseram ao lado de Moisés e Arão quando \"contaram os filhos dos coatitas\" e as demais famílias de Levi (Nm 4:34,46). O serviço do santuário não é assunto só dos sacerdotes: os príncipes das tribos testemunham a conta, para que todo o povo saiba quem leva o quê. Assim a carga santa é pública, ordenada e reconhecida por Israel inteiro (Nm 4:49).",
    },
  },
  5: {
    multidao: {
      title: "A congregação sob a lei da pureza",
      subtitle: "Números 5 • a santidade do arraial",
      text: "Israel recebe as leis que guardam a santidade do arraial onde Deus habita: os imundos postos fora, a restituição do dano e a prova das águas amargas para a suspeita de adultério (Nm 5:2,27). O povo aprende que a presença santa exige um povo santo. Cada ordenança protege a aliança e ensina que o pecado oculto não escapa aos olhos de Deus.",
    },
    homem: {
      title: "Os homens sob as leis da pureza",
      subtitle: "Números 5 • o imundo, o culpado e o marido do ciúme",
      text: "A Escritura não os nomeia: são o imundo lançado para fora do arraial \"para que não contaminem\" onde Deus habita (Nm 5:3), o culpado que confessa e faz \"plena restituição\" com o quinto (Nm 5:7), e o marido sobre quem vem o espírito de ciúmes e que traz a mulher perante o sacerdote (Nm 5:15). Em cada caso a lei arranca o pecado do escondido e o põe diante do SENHOR. O arraial só permanece santo porque nada nele fica sem juízo ou sem reparação.",
    },
    mulherComum: {
      title: "A mulher da prova das águas amargas",
      subtitle: "Números 5 • a suspeita posta perante o SENHOR",
      text: "A mulher anônima que o marido ciumento traz ao sacerdote sem testemunha nenhuma contra ela (Nm 5:13-15). A prova a tira das mãos do ciúme humano e a entrega ao julgamento de Deus: se está limpa, \"será livre, e conceberá filhos\" (Nm 5:28). Numa época em que a suspeita bastava para condenar, o SENHOR reserva para si a sentença — nenhum marido é juiz da própria causa (Sl 43:1).",
    },
    servo: {
      title: "O sacerdote das águas amargas",
      subtitle: "Números 5 • o ministro do juízo de Deus",
      text: "O sacerdote que recebe a restituição de quem não tem resgatador (Nm 5:8) e conduz o rito dos ciúmes: apresenta a mulher perante o SENHOR, escreve as maldições num livro e as apaga com a água amarga (Nm 5:16,23). Ele não acusa nem absolve — executa um juízo que só Deus pode dar. Nas suas mãos, até a suspeita mais amarga é levada ao altar em vez de ser resolvida pela violência da casa.",
    },
  },
  6: {
    multidao: {
      title: "Israel e o voto de nazireu",
      subtitle: "Números 6 • separação e bênção sacerdotal",
      text: "Diante de todo o povo institui-se o voto do nazireu — homem ou mulher que se separa \"para o SENHOR\" (Nm 6:2) — e a bênção com que Arão havia de abençoá-los: \"O SENHOR te abençoe e te guarde\" (Nm 6:24). A congregação é chamada à consagração e recebe sobre si o Nome de Deus (Nm 6:27). Aponta para Cristo, o verdadeiro Separado, e para a bênção que repousa sobre a Igreja.",
    },
    homem: {
      title: "O nazireu",
      subtitle: "Números 6 • o israelita separado por voto",
      text: "O israelita — a Escritura não o nomeia, pois pode ser \"um homem ou mulher\" (Nm 6:2) — que por voto se aparta do vinho, deixa crescer o cabelo e não se contamina com morto algum, nem por pai ou mãe. Enquanto dura o voto, \"santo será ao Senhor\" (Nm 6:8), e ao fim traz cordeiro, carneiro e cesto de ázimos à porta da tenda. Sansão e Samuel viveram esse voto; nele se antevê Cristo, inteiramente consagrado ao Pai (Jz 13:5; Hb 7:26).",
    },
    anciao: {
      title: "Os parentes que o nazireu não pode chorar",
      subtitle: "Números 6 • o luto vedado e a morte súbita",
      text: "São a casa do nazireu: o pai, a mãe, o irmão e a irmã por quem ele \"se não contaminará quando forem mortos\" (Nm 6:7), e o homem que \"vier a morrer junto a ele por acaso, subitamente\", desfazendo num instante todos os dias do voto (Nm 6:9,12). A consagração custa até o luto mais legítimo — como depois se exigirá do sumo sacerdote (Lv 21:11). A vida separada para Deus não é dona nem das próprias despedidas.",
    },
    mulherComum: {
      title: "A mãe do nazireu",
      subtitle: "Números 6 • o lar que o voto ultrapassa",
      text: "A mulher anônima da casa do separado: nem por ela, sua mãe, o nazireu pode contaminar-se \"quando for morta, porquanto o nazireado do seu Deus está sobre a sua cabeça\" (Nm 6:7). O voto põe Deus acima do vínculo mais fundo que um israelita conhece. É a mesma medida que Jesus pedirá aos seus: quem ama pai ou mãe mais do que a Ele não é digno dEle (Mt 10:37; Lc 9:59-60).",
    },
    rebanho: {
      title: "As ofertas do nazireado",
      subtitle: "Números 6 • cordeiro, cordeira e carneiro",
      text: "Os animais que o voto exige: o cordeiro da expiação da transgressão quando o voto é quebrado (Nm 6:12), e, no dia do cumprimento, \"um cordeiro sem defeito de um ano em holocausto, e uma cordeira... em expiação do pecado, e um carneiro sem defeito por oferta pacífica\" (Nm 6:14). Nem a consagração mais rigorosa dispensa sacrifício: até o separado precisa de sangue que o cubra. Sob o carneiro pacífico arde o fogo que consome o cabelo consagrado (Nm 6:18).",
    },
  },
  7: {
    multidao: {
      title: "A tribo que vem com o seu príncipe",
      subtitle: "Números 7 • Israel na dedicação do altar",
      text: "O povo da tribo que naquele dia acompanha o seu cabeça ao pátio do tabernáculo recém-ungido, enquanto ele apresenta a oferta \"para a consagração do altar\" (Nm 7:10-11). Cada casa paterna sobe no dia que lhe foi marcado, e nenhuma é esquecida: o SENHOR manda registrar as doze ofertas uma por uma, embora idênticas. Israel aprende que a adoração é dada em ordem, por famílias, e recebida por Deus nome a nome (Nm 7:84-88).",
    },
    homem: {
      title: "Os príncipes que ofereceram ao altar",
      subtitle: "Números 7 • doze dias de ofertas na consagração",
      text: "Os \"cabeças da casa de seus pais\" (Nm 7:2), um por tribo, que trazem a sua oferta ao altar recém-ungido, cada qual no seu dia — Naassom de Judá no primeiro (Nm 7:12). As ofertas são idênticas e mesmo assim registradas uma a uma: Deus não resume o que os seus dão. Aqui os líderes conduzem o povo não pela ordem, mas pela generosidade.",
    },
    rebanho: {
      title: "Os bois e os animais das ofertas",
      subtitle: "Números 7 • carros para o serviço e vítimas para o altar",
      text: "Os doze bois atrelados aos seis carros cobertos, dados aos gersonitas e meraritas para o transporte do tabernáculo (Nm 7:3,7-8), e as vítimas trazidas dia após dia: doze novilhos, doze carneiros, doze cordeiros de um ano e doze bodes (Nm 7:87). O gado dos príncipes é posto a serviço do santuário, na estrada e no altar. Já os coatitas nada recebem, porque as coisas santíssimas eles \"levavam aos ombros\" (Nm 7:9).",
    },
    servo: {
      title: "Os levitas que receberam os carros",
      subtitle: "Números 7 • cada família segundo o seu ministério",
      text: "Os filhos de Gérson e de Merari, a quem Moisés entrega os carros e os bois \"a cada qual segundo o seu ministério\" (Nm 7:5-8), sob a mão de Itamar, filho de Arão. O peso das cortinas e das tábuas passa a rodar; o peso da arca continua nos ombros dos coatitas. Deus reparte o serviço com sabedoria, dando a cada um a carga que lhe cabe (1Co 12:5).",
    },
  },
  8: {
    multidao: {
      title: "Israel e a oferta dos levitas",
      subtitle: "Números 8 • os levitas dados em lugar do povo",
      text: "A congregação apresenta os levitas diante do SENHOR, pondo as mãos sobre eles como oferta movida do meio dos filhos de Israel (Nm 8:10-11). Eles servem em lugar de todo primogênito, que pertence a Deus desde a Páscoa (Nm 8:17). O povo aprende que se aproxima do santo somente por meio de mediadores separados — sombra do sacerdócio de Cristo.",
    },
    servo: {
      title: "Os levitas purificados",
      subtitle: "Números 8 • a consagração dos ministros da tenda",
      text: "Os levitas aspergidos com a água da expiação, rapados, com as vestes lavadas, e oferecidos por Arão \"por oferta movida\" diante do SENHOR (Nm 8:7,11). Servem dos vinte e cinco aos cinquenta anos, e depois apenas guardam com seus irmãos (Nm 8:24-26). São dados a Deus para \"fazer expiação pelos filhos de Israel, para que não haja praga entre eles\" (Nm 8:19) — o serviço deles protege o povo inteiro.",
    },
  },
  9: {
    multidao: {
      title: "Israel guiado pela nuvem",
      subtitle: "Números 9 • a segunda Páscoa e a coluna",
      text: "O povo celebra a Páscoa no deserto e caminha ao mando da nuvem que cobre o tabernáculo: partiam ou permaneciam \"segundo o mandado do SENHOR\" (Nm 9:18,23). Israel não escolhe o próprio rumo; vive na obediência à presença visível de Deus. A nuvem de dia e o fogo de noite prefiguram o Espírito que conduz o povo peregrino.",
    },
    homem: {
      title: "Os homens imundos por causa de um morto",
      subtitle: "Números 9 • os que pediram lugar na Páscoa",
      text: "Israelitas anônimos que, por terem tocado um cadáver, não podiam celebrar a Páscoa no dia marcado e vieram a Moisés perguntar: \"por que seríamos privados de oferecer a oferta do Senhor a seu tempo determinado\" (Nm 9:7). Não murmuraram: buscaram a Deus. Por causa deles institui-se a Páscoa do segundo mês (Nm 9:11), prova de que o SENHOR faz lugar para o impedido que deseja chegar-se a Ele.",
    },
  },
  10: {
    multidao: {
      title: "Israel partindo do Sinai",
      subtitle: "Números 10 • a primeira jornada rumo à promessa",
      text: "Ao som das trombetas de prata, a congregação levanta acampamento pela primeira vez e marcha em ordem, tribo após tribo, com a arca à frente buscando lugar de descanso (Nm 10:33). Depois de quase um ano no Sinai, o povo enfim se move para Canaã. \"Levanta-te, SENHOR\" (Nm 10:35) torna-se o grito do povo em marcha atrás do seu Deus.",
    },
    homem: {
      title: "Hobabe, o midianita",
      subtitle: "Números 10 • o parente convidado a caminhar com Israel",
      text: "Hobabe, filho de Reuel, da casa de Jetro, a quem Moisés convida: \"vai conosco e te faremos bem; porque o Senhor falou bem sobre Israel\" (Nm 10:29). Conhecedor do deserto, é chamado a ser os olhos do arraial — \"nos servirás de guia\" (Nm 10:31) — ainda que a nuvem é que conduz. Um estrangeiro convidado a partilhar a promessa: os seus descendentes, os queneus, habitarão com Judá (Jz 1:16).",
    },
    servo: {
      title: "Os levitas que levantaram a tenda",
      subtitle: "Números 10 • o tabernáculo em marcha",
      text: "Os filhos de Gérson e de Merari, que desarmam e transportam o tabernáculo logo após a bandeira de Judá, e os coatitas, que seguem depois levando o santuário para que a tenda já esteja erguida quando chegarem (Nm 10:17,21). O serviço deles dá ritmo à caminhada inteira. Na primeira jornada do Sinai, são eles que garantem que Deus vá com o povo aonde o povo for.",
    },
  },
  11: {
    multidao: {
      title: "O povo que se queixa",
      subtitle: "Números 11 • as murmurações em Taberá e Quibrote-Taavá",
      text: "A multidão, cansada do maná, chora por carne e relembra os peixes do Egito (Nm 11:5), acendendo a ira do SENHOR. É o mesmo povo redimido tornando-se ingrato diante do pão do céu. A sua queixa não era por fome, mas por desprezo da graça — advertência para os que \"tentaram a Deus no deserto\" (Sl 78:18).",
    },
    homem: {
      title: "Os que cobiçaram a carne",
      subtitle: "Números 11 • a praga em Quibrote-Taavá",
      text: "Os homens do arraial que se deixaram levar pelo desejo, ajuntando as codornizes com avidez enquanto a carne ainda estava entre os seus dentes (Nm 11:33). A Escritura não os nomeia, mas os sepulta: ali se chamou o lugar \"as sepulturas da concupiscência\" (Nm 11:34). Retrato do coração que prefere o Egito ao Provedor.",
    },
    mulherComum: {
      title: "As mulheres do arraial faminto",
      subtitle: "Números 11 • o povo às portas das tendas",
      text: "As mulheres de Israel que, com as suas famílias, choravam à porta das tendas ansiando pela fartura do Egito (Nm 11:10). Anônimas, representam o lar inteiro contagiado pela murmuração. A cobiça que começou na \"multidão de estranhos\" (Nm 11:4) espalhou-se por todo o povo, mostrando como a ingratidão se propaga.",
    },
    anciao: {
      title: "Os setenta anciãos",
      subtitle: "Números 11 • o Espírito repartido em torno da tenda",
      text: "Os setenta homens que Moisés ajuntou dos anciãos e oficiais do povo, postos ao redor da tenda para que \"contigo levarão a carga do povo\" (Nm 11:17). O SENHOR desce na nuvem e tira do espírito que estava sobre Moisés para pô-lo sobre eles, e profetizam. Eldade e Medade profetizam até no arraial, e Moisés se alegra: \"Quem dera que todo o povo do Senhor fosse profeta\" (Nm 11:29) — anúncio de Pentecostes (Jl 2:28).",
    },
    servo: {
      title: "Josué, servidor de Moisés",
      subtitle: "Números 11 • o zelo do jovem escolhido",
      text: "Josué, filho de Num, \"servidor de Moisés, um dos seus jovens escolhidos\" (Nm 11:28), que se levanta para proibir Eldade e Medade, temendo pela honra do seu senhor. É repreendido com doçura, e aprende que o Espírito de Deus não é propriedade de ninguém. Este servo aprendiz será o pastor que introduzirá Israel na terra (Nm 27:18).",
    },
  },
  12: {
    multidao: {
      title: "A congregação que espera por Miriã",
      subtitle: "Números 12 • a lepra da profetisa",
      text: "Todo o povo faz alto e não parte enquanto Miriã, ferida de lepra por murmurar contra Moisés, permanece sete dias fora do arraial (Nm 12:15). A congregação suporta o preço da rebeldia de um só. Aprende-se que falar contra o servo que Deus escolheu — \"fiel em toda a minha casa\" (Nm 12:7) — é falar contra o próprio SENHOR.",
    },
  },
  13: {
    multidao: {
      title: "A congregação diante do relato dos espias",
      subtitle: "Números 13 • o regresso de Canaã",
      text: "O povo reunido em Cades ouve os doze que espiaram a terra: fartos cachos de Escol numa terra que \"mana leite e mel\", mas cercada de gigantes (Nm 13:27-28). A congregação está à beira da promessa, e tudo dependerá de crer ou temer. É a hora do teste da fé de toda uma geração.",
    },
    homem: {
      title: "Os dez espias incrédulos",
      subtitle: "Números 13 • o mau relatório da terra",
      text: "Os príncipes das tribos que, tendo visto a bondade da terra, espalharam \"mau relatório\", dizendo-se gafanhotos diante dos filhos de Anaque (Nm 13:32-33). Contra eles se levantam Calebe e Josué. Estes homens mediram a promessa pela própria fraqueza, esquecendo Aquele que os tirara do Egito — pecado que custaria quarenta anos ao povo.",
    },
    servo: {
      title: "Josué, o espia de Efraim",
      subtitle: "Números 13 • o servidor que ganhou novo nome",
      text: "O servidor de Moisés enviado como príncipe de Efraim entre os doze: \"a Oséias, filho de Num, Moisés chamou Josué\" (Nm 13:16) — nome que significa \"o SENHOR salva\". Ele vê os mesmos gigantes que os outros e crê no mesmo Deus. Ao lado de Calebe, será um dos dois de toda a geração a entrar na terra (Nm 14:30), e o seu nome é o nome que o Salvador levaria (Mt 1:21).",
    },
  },
  14: {
    multidao: {
      title: "A congregação que se rebela",
      subtitle: "Números 14 • o choro e a incredulidade em Cades",
      text: "A multidão levanta a voz e chora a noite toda, querendo eleger um capitão para voltar ao Egito e apedrejar Calebe e Josué (Nm 14:4,10). Ao rejeitar a terra, rejeita o SENHOR que a prometeu. Por isso a sentença: nenhum dos maiores de vinte anos entrará, e os seus cadáveres cairão no deserto por quarenta anos (Nm 14:29-34).",
    },
    homem: {
      title: "Os homens condenados ao deserto",
      subtitle: "Números 14 • a geração que não entrará",
      text: "Os guerreiros contados no Sinai que, por incredulidade, ouvem que os seus corpos hão de cair no deserto e não verão a terra (Nm 14:29). \"Não puderam entrar por causa da incredulidade\" (Hb 3:19). São o retrato solene de uma redenção começada e desperdiçada pela desconfiança do coração.",
    },
    mulherComum: {
      title: "As mulheres da geração incrédula",
      subtitle: "Números 14 • as mães do deserto",
      text: "As mulheres de Israel que choraram com o povo e temeram por seus filhos, dos quais Deus dissera que seriam \"por presa\" (Nm 14:3). O SENHOR volta contra elas a própria palavra: justamente esses pequeninos entrariam na terra que os pais desprezaram (Nm 14:31). Ergueram no deserto uma geração para a promessa que elas mesmas não viveram.",
    },
  },
  15: {
    multidao: {
      title: "Israel e as leis da terra",
      subtitle: "Números 15 • ofertas, franjas e a aliança lembrada",
      text: "Ainda no deserto, a congregação recebe as ordenanças para \"quando entrardes na terra\" (Nm 15:2) — sinal de que a promessa continua de pé apesar da rebeldia. Manda-se pôr franjas nas vestes para lembrar todos os mandamentos e não seguir o próprio coração (Nm 15:39). Entre a graça e a santidade, o violador do sábado é apedrejado (Nm 15:36).",
    },
    homem: {
      title: "O homem que apanhava lenha no sábado",
      subtitle: "Números 15 • o pecado de mão levantada",
      text: "A Escritura não lhe dá o nome: é o israelita que os outros \"acharam apanhando lenha no dia de sábado\" (Nm 15:32) e trouxeram a Moisés, ficando em guarda até que Deus declarasse a sentença. Ele encarna o pecado cometido \"temerariamente\", que despreza a palavra do SENHOR (Nm 15:30-31), logo depois das ofertas pelo pecado por ignorância. Ali se aprende a diferença entre a fraqueza perdoada e a rebeldia deliberada (Hb 10:26).",
    },
    servo: {
      title: "A congregação que apedrejou fora do arraial",
      subtitle: "Números 15 • os executores da sentença do SENHOR",
      text: "São os israelitas comuns a quem Deus disse: \"toda a congregação o apedrejará com pedras fora do arraial\" (Nm 15:35). Não agem por vingança própria: cumprem a palavra recebida, e a execução se dá FORA do acampamento porque o pecado não pode habitar onde o SENHOR habita (Lv 24:14; Hb 13:12). Cada mão que levanta a pedra assume diante de Deus a santidade da aliança que todos juraram guardar.",
    },
    rebanho: {
      title: "Os animais do cheiro suave",
      subtitle: "Números 15 • cordeiro, carneiro, novilho e a cabra da expiação",
      text: "São as \"ovelhas ou gado\" das ofertas queimadas para quando Israel entrar na terra (Nm 15:3): o cordeiro com a sua décima de farinha, o carneiro com duas, o novilho com três — cada um com o seu azeite e o seu vinho (Nm 15:4-10). A eles se somam o novilho e o bode pela ignorância da congregação e a cabra de um ano pela alma que errou (Nm 15:24,27). Cada animal medido lembra que a comunhão com Deus tem preço — e aponta o Cordeiro cuja oferta única bastou (Hb 10:12).",
    },
    mulherComum: {
      title: "As mulheres das primícias e da congregação",
      subtitle: "Números 15 • a massa da terra e o erro perdoado",
      text: "São as mulheres de Israel que, na terra prometida, amassarão o primeiro pão da colheita: \"das primícias da vossa massa oferecereis um bolo em oferta alçada\" (Nm 15:20-21). O gesto doméstico — mãos na farinha da eira — vira culto que atravessa as gerações. Elas também pertencem à congregação que erra por ignorância e é alcançada pela expiação e pelo perdão (Nm 15:25-26), pois a lei e a graça abraçam a casa inteira de Israel.",
    },
  },
  16: {
    multidao: {
      title: "A congregação na rebelião de Coré",
      subtitle: "Números 16 • a contenda contra Moisés e Arão",
      text: "O povo se ajunta em torno de Coré e dos que dizem \"toda a congregação é santa\" para se levantarem contra Moisés (Nm 16:3). No dia seguinte murmuram de novo: \"vós matastes o povo do SENHOR\" (Nm 16:41). A multidão precisa ser separada da tenda para não perecer, e só a expiação de Arão detém a praga (Nm 16:48).",
    },
    homem: {
      title: "Coré, Datã e Abirão",
      subtitle: "Números 16 • os que a terra tragou",
      text: "Coré, o levita, com Datã e Abirão de Rúben, que cobiçaram o sacerdócio e desafiaram a autoridade dada por Deus (Nm 16:10). A terra abre a boca e os traga vivos com as suas casas ao Seol (Nm 16:32-33). Tornaram-se sinal perpétuo de que ninguém toma para si a honra sacerdotal senão o chamado por Deus (Hb 5:4; Jd 11).",
    },
    mulherComum: {
      title: "As mulheres e filhos dos rebeldes",
      subtitle: "Números 16 • as casas tragadas pela terra",
      text: "As esposas e os pequeninos das tendas de Datã e Abirão, que ficaram à porta e desceram vivos à sepultura com os seus (Nm 16:27,32). A Escritura registra o peso terrível do pecado que arrasta a casa inteira. Ainda assim, \"os filhos de Coré não morreram\" (Nm 26:11) e cantariam nos salmos — sinal da misericórdia que resta.",
    },
    anciao: {
      title: "Os duzentos e cinquenta príncipes",
      subtitle: "Números 16 • os incensários que arderam",
      text: "Os homens que se levantaram com Coré, \"príncipes da congregação, chamados à assembléia, homens de posição\" (Nm 16:2), gente de nome e de peso no arraial. Tomam cada um o seu incensário e se põem à porta da tenda, e sai fogo do SENHOR que os consome (Nm 16:35). Os seus incensários viram lâminas para cobrir o altar, memorial de que nem prestígio nem número autorizam ninguém a tomar o que Deus não deu (Nm 16:40).",
    },
    servo: {
      title: "Os levitas do grupo de Coré",
      subtitle: "Números 16 • o serviço desprezado pela ambição",
      text: "Os filhos de Levi arrastados por Coré, a quem Moisés adverte: pouco lhes parecia Deus os haver separado para \"administrar o ministério do tabernáculo do Senhor\" e agora \"ainda também procurais o sacerdócio?\" (Nm 16:9-10). Tinham a honra rara de servir junto ao santo e a desprezaram por querer mais. É o retrato do ministro que despreza o próprio chamado por cobiçar o do outro (Jd 11).",
    },
    pastor: {
      title: "Os vivos que a expiação alcançou",
      subtitle: "Números 16 • o povo do lado de cá do incensário",
      text: "São os israelitas comuns que sobreviveram à praga porque Arão correu com o incenso e \"pôs-se entre os mortos e os vivos, e a praga cessou\" (Nm 16:47-48). Ficam de joelhos onde a morte parou, devendo a vida não ao seu mérito mas à intercessão de um sacerdote que Deus escolheu. É a figura mais nítida do Evangelho em Números: alguém se põe no meio, e o juízo para (1Tm 2:5).",
    },
    patriarca: {
      title: "Os cabeças das casas paternas de Israel",
      subtitle: "Números 16 • os que ouviram \"apartai-vos\" e viveram",
      text: "São os anciãos e chefes de família que seguiram Moisés quando ele disse \"apartai-vos, peço-vos, das tendas destes ímpios homens\" (Nm 16:26) e que, no dia seguinte, viram a praga varrer o arraial. Ao contrário dos duzentos e cinquenta \"homens de nome\" que se ergueram com Coré (Nm 16:2), estes ouviram a palavra e se afastaram do pecado alheio. Sobrevivem curvados, sabendo que a separação obediente foi o que os pôs entre os vivos (2Co 6:17).",
    },
  },
  17: {
    multidao: {
      title: "Israel diante das varas das tribos",
      subtitle: "Números 17 • a vara de Arão que floresceu",
      text: "Depois da praga, a congregação vê doze varas postas diante do SENHOR, uma por tribo; só a de Arão brota, floresce e dá amêndoas (Nm 17:8). Deus encerra de vez a contenda sobre quem pode achegar-se. O povo clama \"eis aqui, perecemos\" (Nm 17:12), aprendendo que a vida está no sacerdote que Ele mesmo escolheu — figura de Cristo.",
    },
  },
  18: {
    servo: {
      title: "Os levitas cuja herança é o SENHOR",
      subtitle: "Números 18 • os dados em dádiva a Arão",
      text: "Os irmãos de Arão, tomados do meio de Israel e \"dados a vós em dádiva pelo Senhor\" para o ministério da tenda (Nm 18:6), guardando tudo menos os utensílios do santuário e o altar, que só cabem aos sacerdotes. Não recebem terra: vivem dos dízimos do povo e devem oferecer o dízimo do dízimo (Nm 18:21,26). Deles se diz a palavra mais alta de toda a herança: \"eu sou a tua parte e a tua herança\" (Nm 18:20).",
    },
  },
  19: {
    homem: {
      title: "O homem limpo que asperge a água",
      subtitle: "Números 19 • a purificação de quem tocou um morto",
      text: "O israelita anônimo declarado limpo que toma hissopo, molha-o na água misturada com a cinza da novilha ruiva e a asperge sobre a tenda, os móveis e as pessoas contaminadas pela morte (Nm 19:18-19). Ao terceiro e ao sétimo dia ele purifica o imundo, e este é limpo à tarde. Figura viva do sangue de Cristo, que \"purificará as vossas consciências das obras mortas\" (Hb 9:13-14).",
    },
    servo: {
      title: "Os que queimaram a novilha ruiva",
      subtitle: "Números 19 • o serviço fora do arraial",
      text: "Aqueles que, fora do arraial, degolam e queimam a novilha ruiva diante de Eleazar e depois ajuntam a sua cinza para guardá-la em lugar limpo (Nm 19:3,8-9). O texto não os nomeia, e cada um deles fica imundo até à tarde: tornam-se impuros para que o povo seja purificado. Serviço humilde que aponta para Aquele que \"padeceu fora da porta\" para santificar o povo com o próprio sangue (Hb 13:12).",
    },
  },
  20: {
    multidao: {
      title: "O povo sem água em Cades",
      subtitle: "Números 20 • a contenda de Meribá",
      text: "A nova geração, reunida em Cades onde morre Miriã, contende com Moisés por falta de água, repetindo a murmuração dos pais (Nm 20:3-5). Deus manda falar à rocha, mas Moisés a fere; ainda assim brotam águas para o povo e para os seus animais (Nm 20:11). A rocha ferida no deserto é figura de Cristo, de quem \"todos beberam\" (1Co 10:4).",
    },
    rei: {
      title: "O rei de Edom",
      subtitle: "Números 20 • o irmão que fechou o caminho",
      text: "O rei dos descendentes de Esaú, a quem Moisés manda dizer: \"Assim diz teu irmão Israel\" (Nm 20:14), pedindo apenas passagem pela estrada real. Edom responde \"Não passarás por mim\" (Nm 20:18) e sai armado ao encontro, obrigando Israel a rodear a sua terra. A velha rivalidade de Jacó e Esaú reaparece como nação, e Deus manda poupar o irmão mesmo hostil (Dt 2:4-5).",
    },
    servo: {
      title: "Os levitas do monte Hor",
      subtitle: "Números 20 • o ministério que não morre com o ministro",
      text: "Os levitas que levam o tabernáculo de Cades ao monte Hor e ali veem, à vista de toda a congregação, Moisés despir Arão das vestes santas e vesti-las em Eleazar (Nm 20:27-28). O sacerdote morre no cume, e o serviço da tenda continua sem interrupção. Israel aprende que os seus mediadores são mortais — até que venha Aquele que \"permanece para sempre, tem um sacerdócio perpétuo\" (Hb 7:24).",
    },
    rebanho: {
      title: "Os animais da congregação",
      subtitle: "Números 20 • o gado que bebeu da rocha",
      text: "Os rebanhos que acompanham Israel pelo deserto de Zim e entram na queixa do povo: \"para que morramos aqui, nós e os nossos animais\" (Nm 20:4). Quando a rocha se abre, o SENHOR não os esquece — \"bebeu a congregação e os seus animais\" (Nm 20:11). O cuidado de Deus alcança até o gado do seu povo, pois Ele \"aos animais dá o seu sustento\" (Sl 147:9).",
    },
  },
  21: {
    multidao: {
      title: "O povo mordido pelas serpentes",
      subtitle: "Números 21 • a serpente de bronze",
      text: "Israel se impacienta no caminho e fala contra Deus e Moisés, enfadado do \"pão tão vil\" (Nm 21:5); vêm as serpentes ardentes e muitos morrem. Ao olhar para a serpente de bronze na haste, o mordido vive (Nm 21:9). O próprio Cristo lê aqui a sua cruz: \"assim importa que o Filho do homem seja levantado\" (Jo 3:14).",
    },
    homem: {
      title: "O mordido que olhou e viveu",
      subtitle: "Números 21 • o israelita curado pela serpente de metal",
      text: "O israelita anônimo picado pelas serpentes ardentes, já morrendo, que ergue os olhos para a haste: \"quando esse olhava para a serpente de metal, vivia\" (Nm 21:9). Nada faz senão olhar — não há remédio, mérito ou obra, só o olhar da fé para o sinal que Deus levantou. É a figura mais exata do evangelho no Pentateuco (Jo 3:14-15).",
    },
    mulherComum: {
      title: "As mulheres do arraial ferido",
      subtitle: "Números 21 • as mães entre as serpentes ardentes",
      text: "As mulheres de Israel que, no caminho do Mar Vermelho ao redor de Edom, viram \"muita gente\" morrer em suas tendas pelas serpentes (Nm 21:6). A Escritura não as nomeia, mas foram elas que levaram os filhos mordidos a olhar para a haste de metal. O clamor \"havemos pecado\" (Nm 21:7) sobe de todo o arraial, e a cura alcança as casas inteiras.",
    },
    rei: {
      title: "Siom e Ogue",
      subtitle: "Números 21 • os reis amorreus derrotados a leste do Jordão",
      text: "Siom, rei dos amorreus em Hesbom, que recusou a passagem e saiu à peleja em Jaza, e Ogue, rei de Basã, que veio contra Israel em Edrei — ambos feridos ao fio da espada, com a sua terra tomada em possessão (Nm 21:23-24,33-35). Antes deles já caíra o cananeu, rei de Arade (Nm 21:1-3). São as primícias da herança: Israel ainda não cruzou o Jordão e já vê que \"o SENHOR pelejará por vós\" (Sl 135:10-11).",
    },
  },
  22: {
    multidao: {
      title: "Israel acampado nas campinas de Moabe",
      subtitle: "Números 22 • o povo que Balaque temeu",
      text: "A congregação, tão numerosa que \"cobre a face da terra\" (Nm 22:5), acampa nas planícies de Moabe, e Balaque, aterrorizado, contrata Balaão para amaldiçoá-la. O povo nem sabe da guerra travada nos céus a seu favor. Israel é o povo que nenhuma maldição alcança, porque Deus decidiu abençoá-lo (Nm 23:8).",
    },
    homem: {
      title: "Balaão, filho de Beor",
      subtitle: "Números 22 • o adivinho de Petor chamado a amaldiçoar",
      text: "O vidente de Petor, junto ao rio, que Balaque manda buscar por saber que a quem ele abençoa é abençoado (Nm 22:5-6). Fala o nome do SENHOR, mas cobiça o salário: torna a consultar Deus sobre o que já lhe fora negado, e vai. No caminho, o anjo do SENHOR o detém e a sua jumenta enxerga o que o profeta não vê — retrato de quem \"amou o prêmio da injustiça\" (2Pe 2:15).",
    },
    anciao: {
      title: "Os anciãos de Moabe e de Midiã",
      subtitle: "Números 22 • a embaixada com o preço dos encantamentos",
      text: "Os anciãos das duas nações que Balaque envia a Petor \"com o preço dos encantamentos nas suas mãos\" (Nm 22:7) e, recusados, voltam com príncipes ainda mais honrados e promessas maiores (Nm 22:15-17). Representam a sabedoria dos povos tentando comprar a palavra de Deus. Toda a sua diligência apenas prepara o palco para que o SENHOR abençoe Israel diante deles.",
    },
    rebanho: {
      title: "Os animais de Balaque e a jumenta",
      subtitle: "Números 22 • o gado do sacrifício e a boca que falou",
      text: "Os bois e ovelhas que \"Balaque matou\" e enviou a Balaão e aos príncipes ao recebê-lo em Moabe (Nm 22:40), sacrifício com que se pretendia comprar os céus. E, antes deles, a jumenta que viu o anjo do SENHOR com a espada desembainhada e se desviou três vezes, até que \"o Senhor abriu a boca da jumenta\" (Nm 22:28). O animal enxerga e obedece onde o profeta é cego — Deus humilha a soberba pela criatura mais simples.",
    },
  },
  23: {
    multidao: {
      title: "Israel abençoado por Balaão",
      subtitle: "Números 23 • as maldições transformadas em bênção",
      text: "Do alto dos montes, Balaão contempla o povo que habita só e \"não será contado entre as gentes\" (Nm 23:9), e não acha encanto contra Jacó. O que se pretendia maldição sai bênção: \"Deus não é homem, para que minta\" (Nm 23:19). Israel é visto como Deus o vê — sem que se enxergue iniquidade em Jacó (Nm 23:21).",
    },
  },
  25: {
    multidao: {
      title: "Israel em Baal-Peor",
      subtitle: "Números 25 • a prostituição com Moabe",
      text: "O povo que nenhuma maldição venceu de fora cai por dentro: prostitui-se com as filhas de Moabe e curva-se a Baal-Peor (Nm 25:1-3). O que Balaão não pôde amaldiçoar, ensinou a seduzir (Nm 31:16; Ap 2:14). Acende-se a ira do SENHOR, e a praga só cessa pelo zelo de Fineias — lição de que o pecado consumado dentro custa mais que o inimigo de fora.",
    },
    homem: {
      title: "Zinri, filho de Salu",
      subtitle: "Números 25 • o príncipe simeonita traspassado",
      text: "\"Príncipe da casa paterna dos simeonitas\" (Nm 25:14), que trouxe a midianita à tenda \"à vista de Moisés, e à vista de toda a congregação\" enquanto o povo chorava diante da tenda (Nm 25:6). O seu pecado é público e desafiador, feito no auge do juízo. A lança de Fineias o atravessa, e a praga cessa — sinal de que Deus não deixa a sua casa sem zelo.",
    },
    mulher: {
      title: "Cosbi, a midianita",
      subtitle: "Números 25 • a filha de um príncipe de Midiã",
      text: "Cosbi, \"filha de Zur, cabeça do povo da casa paterna entre os midianitas\" (Nm 25:15), morta com Zinri no dia da praga. Não é uma mulher qualquer: é a aliança com Midiã selada em pecado, no meio do engano de Peor. Por causa dela e de Peor, o SENHOR manda afligir os midianitas (Nm 25:17-18), guerra que se cumprirá em Números 31.",
    },
    mulherComum: {
      title: "As filhas de Moabe",
      subtitle: "Números 25 • as que convidaram Israel a Baal-Peor",
      text: "As mulheres moabitas com quem o povo começou a prostituir-se em Sitim: \"Elas convidaram o povo aos sacrifícios dos seus deuses; e o povo comeu, e inclinou-se aos seus deuses\" (Nm 25:2). A Escritura não lhes dá nomes, e o dano que causaram foi maior que o de exércitos. Foram a arma que Balaão sugeriu quando não pôde amaldiçoar (Nm 31:16; Ap 2:14).",
    },
    pastor: {
      title: "Os mortos da praga de Baal-Peor",
      subtitle: "Números 25 • \"foram vinte e quatro mil\"",
      text: "São os israelitas anônimos que se ajuntaram a Baal-Peor e caíram no juízo: \"os que morreram daquela praga foram vinte e quatro mil\" (Nm 25:9). Homens do próprio arraial, gente de tenda e rebanho, tombados às portas da terra prometida por um pecado que nenhum exército conseguiu impor de fora. Paulo os lembra como advertência à igreja: \"nem forniquemos, como alguns deles fornicaram\" (1Co 10:8).",
    },
    patriarca: {
      title: "Os cabeças do povo alcançados pelo juízo",
      subtitle: "Números 25 • os príncipes que Deus mandou enforcar",
      text: "São os chefes das casas paternas envolvidos em Peor, sobre quem veio a ordem mais dura: \"toma todos os cabeças do povo, e enforca-os ao SENHOR diante do sol\" (Nm 25:4). O juízo começa pelos que tinham responsabilidade de guardar a santidade de Israel, não pelos menores. Ali se aprende que a liderança não isenta ninguém — antes, agrava a conta (Tg 3:1).",
    },
  },
  26: {
    anciao: {
      title: "Os cabeças das famílias contadas",
      subtitle: "Números 26 • o segundo censo",
      text: "São os anciãos que respondem pelo clã quando Moisés e Eleazar contam o povo nas campinas de Moabe: os de Enoque e Palu, de Hezrom e Carmi, e os demais chefes de casa (Nm 26:5-7). Cada nome no rol é uma família que atravessou o deserto inteiro. Deles se dirá o mais notável do capítulo: \"entre estes nenhum houve dos que foram contados por Moisés e Arão no deserto de Sinai\" (Nm 26:64) — a geração nova, contada para HERDAR (Nm 26:53)." },
    homem: {
      title: "Os homens de guerra da nova geração",
      subtitle: "Números 26 • contados para herdar",
      text: "Os de vinte anos para cima, contados família por família — Bela e Asbel, Héber e Malquiel, Jasube e os demais (Nm 26). Não são os pais que saíram do Egito: aqueles caíram no deserto, como jurado em Cades (Nm 14:29-32). Estes são os filhos, contados não para vagar, mas para receber — \"a estes se repartirá a terra em herança\" (Nm 26:53)." },
    pastor: {
      title: "Os filhos de Gade, pastores contados",
      subtitle: "Números 26 • as famílias do gado",
      text: "Zefom, Hagi, Suni e os demais clãs de Gade (Nm 26:15-18): gente de muitíssimo gado, que logo pedirá a terra de pastos a leste do Jordão (Nm 32:1-5). Contados como os outros, para guerra e herança — e o seu quinhão será o primeiro definido, com a condição de atravessarem armados à frente dos irmãos (Nm 32:20-22)." },
    patriarca: {
      title: "Os cabeças das tribos de José e dos irmãos",
      subtitle: "Números 26 • as casas dos pais",
      text: "São os chefes das casas paternas — Efraim e Manassés, Issacar e Dã — sob cujos nomes a nova geração é arrolada (Nm 26:23-42). Neles as promessas feitas a doze irmãos numa casa de Canaã (Gn 49) chegam à porta do cumprimento: cada casa paterna vira um território na terra jurada, repartido por sorte conforme o seu número (Nm 26:55-56)." },
    rebanho: {
      title: "O gado da nova geração",
      subtitle: "Números 26 • a riqueza que atravessou o deserto",
      text: "Os rebanhos que pastam ao redor do arraial enquanto o povo é contado. Quarenta anos no deserto e Israel não sai pobre: \"o Senhor teu Deus... conheceu o teu caminho... nada te faltou\" (Dt 2:7). É esse gado que fará Rúben e Gade pedirem Jazer e Gileade (Nm 32:1), terra de pastos — a provisão de Deus visível em patas e lã." },
    rei: {
      title: "Zinri e os príncipes mortos com Coré",
      subtitle: "Números 26 • a memória do juízo no meio do censo",
      text: "No meio do rol, o texto para e lembra: Datã e Abirão, \"os afamados da congregação\" que contenderam contra Moisés, e os 250 dos incensários, tragados pela terra e consumidos pelo fogo — \"e serviram de sinal\" (Nm 26:9-10). O censo da herança carrega dentro de si o memorial do juízo: herda a terra quem não repete a rebelião." },
    multidao: {
      title: "A nova geração recenseada em Moabe",
      subtitle: "Números 26 • o segundo censo, às portas de Canaã",
      text: "Depois da praga, conta-se de novo o povo nas campinas de Moabe: os filhos daqueles que caíram no deserto, pois \"nenhum deles ficou, senão Calebe e Josué\" (Nm 26:65). Esta multidão herdará a terra que os pais desprezaram. O censo divide as heranças por sorte (Nm 26:55) — a fidelidade de Deus recomeça numa geração inteira.",
    },
    mulherComum: {
      title: "Joquebede, filha de Levi",
      subtitle: "Números 26 • a mãe lembrada no censo dos levitas",
      text: "A mulher de Anrão, \"filha de Levi, a qual nasceu a Levi no Egito\", e de quem nasceram \"Arão, e Moisés, e Miriã, irmã deles\" (Nm 26:59). No meio de listas de milhares, o SENHOR faz questão de registrar o nome da mãe que escondeu o menino às margens do Nilo (Êx 2:1-3). A fé de uma mulher está na raiz de toda a libertação — por isso é contada entre os fiéis (Hb 11:23).",
    },
    servo: {
      title: "Os levitas contados à parte",
      subtitle: "Números 26 • vinte e três mil sem herança na terra",
      text: "Os gersonitas, coatitas e meraritas recenseados de um mês para cima, somando vinte e três mil, e postos fora da conta dos guerreiros porque \"não lhes foi dada herança entre os filhos de Israel\" (Nm 26:62). Enquanto as tribos recebem terra por sorte, eles recebem o próprio SENHOR (Nm 18:20). No censo da herança, a sua ausência é a maior das dádivas.",
    },
  },
  27: {
    multidao: {
      title: "A congregação e a herança das filhas de Zelofeade",
      subtitle: "Números 27 • justiça na herança e o sucessor de Moisés",
      text: "Diante de toda a congregação, as filhas de Zelofeade pedem o direito à herança do pai que morreu sem filhos, e Deus lhes faz justiça (Nm 27:7). Ali também Moisés recebe Josué como sucessor, para que o povo não fique \"como ovelhas que não têm pastor\" (Nm 27:17). A congregação é conduzida com equidade e cuidado pastoral rumo à terra.",
    },
    mulherComum: {
      title: "As filhas de Zelofeade",
      subtitle: "Números 27 • Maalá, Noa, Hogla, Milca e Tirza",
      text: "As cinco irmãs da tribo de Manassés que se apresentam diante de Moisés, de Eleazar e de toda a congregação e pedem: \"Dá-nos possessão entre os irmãos de nosso pai\" (Nm 27:4). Fazem questão de dizer que o pai morreu no seu próprio pecado, e não com Coré. O SENHOR responde que elas \"falam o que é justo\" (Nm 27:7) e muda por elas o estatuto da herança em Israel — a justiça de Deus ouve as que não tinham voz.",
    },
    rebanho: {
      title: "O rebanho sem pastor",
      subtitle: "Números 27 • a imagem da congregação",
      text: "Moisés pede um sucessor para que a congregação do SENHOR não seja \"como ovelhas que não têm pastor\" (Nm 27:17) — o povo é o rebanho de Deus, que precisa de quem o faça sair e entrar. A imagem atravessa a Escritura até Jesus, que se compadece das multidões por serem como ovelhas sem pastor (Mc 6:34) e se dá como o Bom Pastor (Jo 10:11).",
    },
  },
  28: {
    rebanho: {
      title: "Os cordeiros do sacrifício contínuo",
      subtitle: "Números 28 • o holocausto perpétuo",
      text: "Os animais das ofertas ordenadas dia após dia: dois cordeiros de um ano, um pela manhã e outro à tarde, em holocausto contínuo diante do SENHOR (Nm 28:3-4). O rebanho de Israel sobe ao altar como \"cheiro suave\", sustentando a comunhão com Deus. Cada cordeiro sem defeito aponta para \"o Cordeiro de Deus, que tira o pecado do mundo\" (Jo 1:29).",
    },
  },
  29: {
    multidao: {
      title: "Israel nas festas do sétimo mês",
      subtitle: "Números 29 • trombetas, expiação e tabernáculos",
      text: "A congregação é chamada às solenidades do sétimo mês: o dia de jubilação das trombetas, a santa convocação da expiação em que \"afligireis as vossas almas\" (Nm 29:7), e os sete dias das cabanas com as suas muitas ofertas. Todo o ano do povo gira em torno do encontro com Deus. Estas festas prefiguram a redenção plena e o descanso final dos remidos.",
    },
  },
  30: {
    patriarca: {
      title: "Os cabeças das tribos",
      subtitle: "Números 30 • os chefes a quem Moisés deu a lei dos votos",
      text: "Os anciãos e chefes das casas paternas a quem Moisés fala esta palavra: são eles os \"cabeças das tribos dos filhos de Israel\" (Nm 30:1), responsáveis por julgar votos e obrigações dentro das famílias. A palavra dada a Deus não é assunto privado: passa pelo governo da casa e da tribo. Sobre eles recai o dever de guardar a verdade no meio do povo (Dt 1:15-17).",
    },
    homem: {
      title: "O homem que faz voto ao SENHOR",
      subtitle: "Números 30 • a palavra que não se pode violar",
      text: "O israelita anônimo que se liga por voto ou juramento e, por isso mesmo, fica preso à sua própria boca: \"não violará a sua palavra: segundo tudo o que saiu da sua boca, fará\" (Nm 30:2). Ninguém pode anular por ele o que ele mesmo prometeu. Assim aprende Israel que a palavra dada diante de Deus vale a vida inteira (Ec 5:4-5; Mt 5:33-37).",
    },
    mulherComum: {
      title: "A filha, a esposa e a viúva",
      subtitle: "Números 30 • os votos confirmados ou anulados",
      text: "As mulheres de Israel cujo voto é examinado nesta lei: a moça na casa do pai, a esposa na casa do marido, e a viúva ou repudiada, sobre quem \"tudo com que ligar a sua alma, sobre ela será válido\" (Nm 30:9). O pai ou o marido que cala confirma; o que anula no mesmo dia leva sobre si a iniquidade dela (Nm 30:15). A lei protege a mulher de promessas ruinosas e responsabiliza quem tem autoridade sobre a casa.",
    },
  },
  31: {
    mulherComum: {
      title: "As cativas de Midiã",
      subtitle: "Números 31 • o despojo que tinha rosto",
      text: "As mulheres e crianças de Midiã trazidas ao arraial depois da guerra — as mesmas cujas mães seduziram Israel em Baal-Peor pelo conselho de Balaão (Nm 31:9,15-16; 25:1-2). A Escritura não as nomeia, mas as conta uma a uma na repartição, com a porção do Senhor separada (Nm 31:35,40): nem no despojo Israel podia esquecer que tudo passa diante de Deus." },
    pastor: {
      title: "Os que apascentam a presa",
      subtitle: "Números 31 • o gado contado e repartido",
      text: "São os homens postos sobre a enorme presa de Midiã — 675 mil ovelhas, 72 mil bois, 61 mil jumentos (Nm 31:32-34) — guardando-a enquanto Moisés, Eleazar e os cabeças a somam e dividem: metade aos que pelejaram, metade à congregação (Nm 31:27). Cada curral contado prega a mesma lição do dízimo: primeiro separa-se a porção do Senhor (Nm 31:28-30)." },
    rebanho: {
      title: "A presa de Midiã",
      subtitle: "Números 31 • ovelhas, bois e jumentos aos milhares",
      text: "O gado tomado na guerra contra Midiã, somado cabeça por cabeça: \"seiscentas e setenta e cinco mil ovelhas... setenta e dois mil bois... sessenta e um mil jumentos\" (Nm 31:32-34). De cada quinhão saiu o tributo ao Senhor, entregue a Eleazar e aos levitas (Nm 31:29-30,41-47) — a contabilidade minuciosa é o próprio sermão: a vitória foi de Deus, e a Ele pertencem as primícias dela." },
    servo: {
      title: "Os levitas que recebem o tributo da presa",
      subtitle: "Números 31 • a porção dos que guardam a tenda",
      text: "Da metade da congregação, um de cada cinquenta — pessoas e animais — foi dado \"aos levitas que têm cuidado da guarda do tabernáculo do Senhor\" (Nm 31:30,47). Quem serve no santuário vive do que o povo consagra (Nm 18:21-24): até o despojo de uma guerra passa pelo altar antes de chegar às tendas." },
    multidao: {
      title: "Israel em guerra contra Midiã",
      subtitle: "Números 31 • a vingança do SENHOR sobre os sedutores",
      text: "Mil de cada tribo saem à guerra santa contra Midiã, que seduzira Israel em Peor (Nm 31:2-3). O povo executa o juízo de Deus e reparte o despojo, dando a Ele o seu tributo. É a última campanha antes do Jordão, e ensina que a santidade do povo se guarda também contra quem quis destruí-lo por dentro.",
    },
    cavaleiro: {
      title: "Os doze mil armados para a peleja",
      subtitle: "Números 31 • mil de cada tribo contra Midiã",
      text: "Os guerreiros escolhidos, \"mil de cada tribo, doze mil armados para a peleja\" (Nm 31:5), enviados a fazer a vingança do SENHOR sobre Midiã. Voltam com imenso despojo e com um relato assombroso: \"não falta nenhum de nós\" (Nm 31:49). Por isso trazem uma oferta de ouro ao SENHOR, reconhecendo que a vitória e a vida foram dádiva, não façanha.",
    },
    homem: {
      title: "Fineias, filho de Eleazar",
      subtitle: "Números 31 • o sacerdote que foi à guerra",
      text: "O mesmo que atravessara Zinri e Cosbi em Peor vai agora à frente do exército, não com espada, mas \"com os vasos do santuário, e com as trombetas do alarido na sua mão\" (Nm 31:6). O toque das trombetas é o memorial diante de Deus na batalha (Nm 10:9). A guerra é santa porque é do SENHOR, e quem a conduz é o homem da aliança de paz (Nm 25:12-13).",
    },
    rei: {
      title: "Os cinco reis de Midiã",
      subtitle: "Números 31 • Evi, Requém, Zur, Hur e Reba",
      text: "Os \"cinco reis dos midianitas\" mortos na batalha, entre eles Zur, pai de Cosbi, e com eles Balaão, filho de Beor, morto à espada (Nm 31:8). Caem os que planejaram destruir Israel pela sedução em vez da maldição (Nm 31:16). O conselho de Balaão acaba por matá-lo, e o juízo alcança quem cobiçou o prêmio da injustiça (Js 13:22; 2Pe 2:15).",
    },
  },
  32: {
    homem: {
      title: "Os filhos de Rúben e de Gade",
      subtitle: "Números 32 • os que pediram a terra aquém do Jordão",
      text: "Os chefes das duas tribos que, vendo as pastagens de Jazer e Gileade, pedem a Moisés: \"dê-se esta terra aos teus servos em possessão; e não nos faças passar o Jordão\" (Nm 32:5). Moisés os repreende com a memória de Cades: \"Irão vossos irmãos à peleja, e ficareis vós aqui?\" (Nm 32:6). Emendam o pedido comprometendo-se a lutar primeiro pelos irmãos — lição de que nenhuma herança se goza às custas do povo de Deus.",
    },
    cavaleiro: {
      title: "Os que passariam armados à frente",
      subtitle: "Números 32 • a vanguarda de Rúben, Gade e meia tribo de Manassés",
      text: "Os guerreiros que juram: \"Nós passaremos, armados, perante o Senhor, à terra de Canaã\" (Nm 32:32), indo à frente de Israel até que cada tribo esteja de posse da sua herança (Nm 32:18). Só então voltarão às suas casas, \"inculpáveis perante o Senhor e perante Israel\" (Nm 32:22). Cumprirão a palavra sob Josué (Js 4:12), exemplo de fé que se prova no compromisso com os irmãos.",
    },
    rebanho: {
      title: "O gado de Rúben e de Gade",
      subtitle: "Números 32 • os currais de Gileade",
      text: "Os rebanhos numerosíssimos das duas tribos, que \"tinham gado em grande quantidade\" e viram que Jazer e Gileade eram \"lugar de gado\" (Nm 32:1). Por eles se edificam currais antes mesmo das cidades para as crianças (Nm 32:16). A bênção material é real, mas o capítulo adverte: a prosperidade pode tentar o coração a parar aquém da promessa.",
    },
  },
  33: {
    multidao: {
      title: "Israel em suas jornadas",
      subtitle: "Números 33 • as etapas desde o Egito",
      text: "A congregação cujas paradas, de Ramessés ao Jordão, Moisés registra por ordem do SENHOR (Nm 33:2) — memorial de quarenta anos de peregrinação e de fidelidade divina. Cada acampamento testemunha que Deus os guiou passo a passo. Aqui se ordena expulsar os moradores da terra, para que não sejam \"espinhos nos vossos olhos\" (Nm 33:55).",
    },
  },
  34: {
    multidao: {
      title: "Israel recebendo os limites da terra",
      subtitle: "Números 34 • as fronteiras de Canaã",
      text: "Ainda em Moabe, a congregação ouve traçados os limites da herança \"que vos há de cair em herança\" (Nm 34:2) e os nomes dos homens que a repartirão. A terra ainda não conquistada já é medida pela palavra de Deus, tão certa é a promessa. O povo recebe por dádiva o que Deus jurara aos pais.",
    },
    homem: {
      title: "Os homens que repartiriam a terra",
      subtitle: "Números 34 • Eleazar, Josué e um príncipe por tribo",
      text: "Os nomeados por Deus para dividir Canaã: \"Eleazar, o sacerdote, e Josué, filho de Num\" (Nm 34:17), e com eles um príncipe de cada tribo, o primeiro dos quais é Calebe, filho de Jefoné, por Judá (Nm 34:19). Deus escolhe pelo nome quem cuidará da justiça da partilha, e põe à frente os dois homens que creram em Cades. A herança não se toma por força nem por cobiça: reparte-se por ordem do SENHOR (Js 14:1).",
    },
  },
  35: {
    multidao: {
      title: "Israel e as cidades de refúgio",
      subtitle: "Números 35 • as cidades dos levitas e o abrigo do homicida",
      text: "A congregação separa quarenta e oito cidades aos levitas, seis delas de refúgio, para onde foge quem mata sem intenção até o juízo (Nm 35:11-12). Assim se guarda a terra, que não se profana com sangue inocente nem poupa o homicida voluntário (Nm 35:33). O refúgio prefigura o abrigo que há em Cristo para o pecador que a Ele se acolhe.",
    },
    homem: {
      title: "O homicida por engano",
      subtitle: "Números 35 • o que corre para a cidade de refúgio",
      text: "O israelita sem nome que \"ferir a alguma alma por engano\" (Nm 35:11) e foge para uma das seis cidades, escapando do vingador do sangue até ser apresentado à congregação para julgamento. Ali deve permanecer \"até à morte do sumo sacerdote\" (Nm 35:25), e só então volta à sua possessão. A sua liberdade depende da morte de um sacerdote — figura clara da liberdade que nos vem pela morte de Cristo (Hb 6:18).",
    },
    servo: {
      title: "Os levitas das quarenta e oito cidades",
      subtitle: "Números 35 • os que habitam espalhados pela herança",
      text: "Os levitas a quem as tribos, da sua própria herança, devem \"dar cidades aos levitas, em que habitem\" com arrabaldes para o seu gado (Nm 35:2-3). Não têm território, mas moram em toda a terra, e seis das suas cidades são as de refúgio. Assim quem serve ao santuário fica ao alcance de todo o povo — o cumprimento misericordioso da palavra que dividiria Levi em Israel (Gn 49:7).",
    },
  },
  36: {
    multidao: {
      title: "As tribos guardando a herança",
      subtitle: "Números 36 • o casamento das filhas de Zelofeade",
      text: "Os cabeças da tribo de Manassés levam ao povo a questão: se as herdeiras casarem fora, a herança passará a outra tribo. Deus ordena que se casem dentro da própria tribo, \"para que cada um dos filhos de Israel possua a herança de seus pais\" (Nm 36:8). A congregação aprende que a herança dada por Deus deve ser guardada de geração em geração.",
    },
    homem: {
      title: "Os chefes da família de Gileade",
      subtitle: "Números 36 • os anciãos de Manassés diante de Moisés",
      text: "Os \"chefes dos pais da família de Gileade, filho de Maquir, filho de Manassés\" (Nm 36:1), que vêm a Moisés e aos príncipes com um zelo legítimo: que a porção da tribo não se perca no ano do jubileu por causa de casamentos fora dela (Nm 36:3-4). Não contestam o direito das herdeiras; buscam preservar o que Deus repartira. Moisés responde que a tribo de José \"fala o que é justo\" (Nm 36:5).",
    },
    mulherComum: {
      title: "As filhas de Zelofeade casadas",
      subtitle: "Números 36 • Maalá, Tirza, Hogla, Milca e Noa",
      text: "As mesmas irmãs a quem Deus dera herança, agora livres para casar com quem bem lhes parecer, \"contanto que se casem na família da tribo de seu pai\" (Nm 36:6). Casam-se com os filhos de seus tios, em Manassés, e \"a sua herança ficou na tribo da família de seu pai\" (Nm 36:12). Com elas o livro de Números se fecha: a fidelidade de Deus e a obediência do povo guardando juntas a herança prometida.",
    },
  },
};
