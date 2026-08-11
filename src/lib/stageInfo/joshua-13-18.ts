// ============================================================================
// JOSUÉ 13–18 — fichas ESPECÍFICAS por (capítulo → papel). A grande REPARTIÇÃO
// da terra: a herança dada por sortes às tribos. Para cada papel ANÔNIMO que
// aparece no cast de cada capítulo, quem é aquela figura naquele capítulo de
// Josué — biblicamente e teologicamente. Figuras nomeadas (Josué, Calebe,
// Eleazar, Otniel, Acsa, Balaão, as filhas nomeadas de Zelofeade, as tribos)
// têm ficha própria por `id` e NÃO entram aqui.
// ============================================================================
import type { StageInfo } from "@/lib/rpgStageInfo";

export const CHAPTER_ACTORS_13_18: Record<number, Record<string, StageInfo>> = {
  // ------------------------------------------------------------------ Js 13
  13: {
    multidao: {
      title: "Israel diante da terra a repartir",
      subtitle: "Josué 13 • a herança das tribos de além-Jordão",
      text: "O povo reunido a quem o Senhor manda repartir a terra por herança, ainda com \"muitíssima terra\" por possuir (Js 13:1,7). Este capítulo relembra as duas tribos e meia — Rúben, Gade e a meia de Manassés — que já haviam recebido a sua porção a leste do Jordão pela mão de Moisés (Js 13:8). A multidão aqui é Israel entrando no descanso prometido a Abraão, cada família recebendo o seu quinhão \"segundo as suas famílias\".",
    },
    homem: {
      title: "Os moradores da terra que resta",
      subtitle: "Josué 13 • gesureus, maacateus e os povos por expulsar",
      text: "Os homens das nações que ainda ficaram no meio de Israel — os gesureus e os maacateus, que \"ficaram habitando no meio de Israel até ao dia de hoje\" (Js 13:13), e os príncipes de Midiã feridos com Siom. A Escritura não os enaltece: são o sinal da conquista incompleta, a terra que resta como advertência. Entre os mortos daquele juízo estava Balaão, o adivinho, morto à espada (Js 13:22).",
    },
    servo: {
      title: "Os levitas, sem herança de terra",
      subtitle: "Josué 13 • \"o Senhor é a sua herança\"",
      text: "A tribo de Levi, apartada para o serviço do santuário, a quem \"Moisés não deu herança\" de terra (Js 13:14,33). Em lugar de campos, receberam os sacrifícios queimados do Senhor — e o próprio Senhor: \"o Senhor Deus de Israel é a sua herança\". Traço teológico central do capítulo: quem serve a Deus tem em Deus a sua porção (cf. Sl 16:5; Nm 18:20).",
    },
    rei: {
      title: "Os reis inimigos da terra",
      subtitle: "Josué 13 • os cinco príncipes filisteus, Siom e Ogue",
      text: "Os reis das nações de Canaã e de além-Jordão: os cinco príncipes dos filisteus, de Sior a Ecrom (Js 13:3), e os reis amorreus já vencidos por Moisés — Siom de Hesbom e Ogue de Basã, \"restante dos gigantes\" (Js 13:12,21). Seus tronos caem para que Israel herde a terra, mostrando que o Senhor \"os lançará de diante dos filhos de Israel\" (Js 13:6).",
    },
  },

  // ------------------------------------------------------------------ Js 14
  14: {
    multidao: {
      title: "Israel recebendo a herança por sorte",
      subtitle: "Josué 14 • a repartição de Canaã começa",
      text: "O povo de Israel a quem, em Gilgal, se reparte a terra de Canaã \"por sorte da sua herança, como o Senhor ordenara\" (Js 14:1-2). A sorte não é acaso: é a mão de Deus escolhendo o quinhão de cada tribo, tirando dos homens a disputa e pondo a partilha na vontade do Senhor (cf. Pv 16:33). É o cumprimento da promessa feita aos pais, agora entregue às nove tribos e à meia de Manassés.",
    },
    homem: {
      title: "Os anaquins de Hebrom",
      subtitle: "Josué 14 • os gigantes que Calebe reivindica expulsar",
      text: "Os anaquins — homens de grande estatura que habitavam \"grandes e fortes cidades\" no monte de Hebrom (Js 14:12). Foram eles que, quarenta e cinco anos antes, fizeram derreter o coração dos dez espias covardes (Nm 13:33); mas Calebe, aos 85 anos, os reclama justamente como o monte que o Senhor lhe prometeu. Onde o medo viu gigantes, a fé vê a herança: \"porventura o Senhor será comigo, para os expulsar\".",
    },
    servo: {
      title: "Os levitas entre as tribos",
      subtitle: "Josué 14 • sem herança de terra, só cidades",
      text: "A tribo de Levi, a quem \"não se deu herança na terra, senão cidades em que habitassem\" e arrabaldes para o seu gado (Js 14:4). Espalhados no meio de todas as tribos, os levitas seriam os guardas do culto e os mestres da Lei em todo o Israel. Sua falta de território é sinal proposital: a sua porção é o serviço do Senhor, não o chão.",
    },
    anciao: {
      title: "Os cabeças dos pais das tribos",
      subtitle: "Josué 14 • os que repartem a terra com Eleazar e Josué",
      text: "Os \"cabeças dos pais das tribos dos filhos de Israel\", que junto com Eleazar, o sacerdote, e Josué fazem repartir a herança (Js 14:1). São os anciãos e chefes de cada casa paterna, representantes do povo diante da autoridade; por suas mãos, a sorte lançada perante o Senhor se torna posse concreta de cada família. A Escritura não lhes dá os nomes, mas neles Israel inteiro recebe a terra em ordem e justiça.",
    },
  },

  // ------------------------------------------------------------------ Js 15
  15: {
    multidao: {
      title: "A tribo de Judá recebendo a sua herança",
      subtitle: "Josué 15 • a primeira e a mais ampla das sortes",
      text: "O povo de Judá, a tribo real de onde viria o Messias (Gn 49:10), que recebe a primeira e maior porção da terra — do deserto de Zim ao Mar Grande, com suas cidades do Neguebe, da Sefelá, das montanhas e do deserto (Js 15:1,20-21). A multidão aqui caminha pelos marcos do termo, tomando posse da herança prometida. Só uma sombra fica: os jebuseus, que permaneceram em Jerusalém \"até ao dia de hoje\" (Js 15:63).",
    },
    homem: {
      title: "Os habitantes cananeus da terra de Judá",
      subtitle: "Josué 15 • os filhos de Anaque e os jebuseus",
      text: "Os homens dos povos que Judá enfrenta: os três filhos de Anaque — Sesai, Aimã e Talmai —, gigantes que Calebe expulsa de Hebrom (Js 15:14), e os jebuseus que os filhos de Judá \"não puderam expulsar\" de Jerusalém (Js 15:63). Uns caem diante da fé de Calebe; outros ficam como espinho, sinal de que a fidelidade incompleta deixa restos que voltarão a ferir Israel.",
    },
    servo: {
      title: "Os que demarcam o termo de Judá",
      subtitle: "Josué 15 • os oficiais que medem a herança",
      text: "Os homens encarregados de percorrer e demarcar os limites da herança — de Bete-Hogla à pedra de Boã, ao vale de Hinom junto a Jerusalém, à fonte de Neftoa e ao Mar Grande (Js 15:5-11). A Escritura não lhes dá o nome, mas por seu trabalho paciente a promessa se traduz em fronteiras reais, cidade por cidade, aldeia por aldeia. A herança de Deus não é vaga: é terra medida e entregue com fidelidade.",
    },
    rebanho: {
      title: "O jumento de Acsa",
      subtitle: "Josué 15 • a montaria de que a noiva desce",
      text: "O animal de que Acsa, filha de Calebe, desce ao chegar diante do pai para lhe pedir a bênção das fontes (Js 15:18). Descer do jumento era gesto de reverência e de súplica no mundo antigo — sinal de quem vem pedir um favor. Pequeno detalhe da cena, mostra que a terra herdada precisava de água para dar vida: e Calebe deu à filha \"as fontes superiores e as fontes inferiores\" (Js 15:19).",
    },
  },

  // ------------------------------------------------------------------ Js 16
  16: {
    multidao: {
      title: "Os filhos de José recebendo a herança",
      subtitle: "Josué 16 • a sorte de Efraim e Manassés",
      text: "O povo dos filhos de José — Efraim e Manassés — que recebe a sua sorte desde o Jordão junto a Jericó, subindo por Betel e Bete-Horom até o mar (Js 16:1-4). É a tribo de Josué, o próprio condutor da conquista, tomando posse do coração da terra. A multidão herda a bênção que Jacó pusera sobre os dois filhos de José no leito de morte (Gn 48).",
    },
    homem: {
      title: "Os cananeus de Gezer",
      subtitle: "Josué 16 • os que não foram expulsos",
      text: "Os homens cananeus que habitavam Gezer, a quem Efraim \"não expulsou\", e que \"habitam no meio dos efraimitas até ao dia de hoje\" (Js 16:10). Israel os tornou tributários em vez de os lançar fora — solução cômoda que desobedecia à ordem de purificar a terra. São o retrato do compromisso incompleto que, capítulo após capítulo em Josué, semeia o joio que mais tarde brotaria em idolatria.",
    },
    servo: {
      title: "Os que demarcam o termo de Efraim",
      subtitle: "Josué 16 • os oficiais da medição",
      text: "Os homens que percorrem e assinalam o limite da herança dos filhos de José — de Atarote-Adar a Bete-Horom de cima, a Taanate-Siló e ao ribeiro de Caná (Js 16:5-8). Anônimos, cumprem a tarefa exata de traduzir a sorte lançada em fronteiras firmes. Por sua diligência, cada cidade separada para Efraim, mesmo no meio de Manassés, é registrada e possuída (Js 16:9).",
    },
  },

  // ------------------------------------------------------------------ Js 17
  17: {
    multidao: {
      title: "A meia tribo de Manassés a oeste",
      subtitle: "Josué 17 • a herança do primogênito de José",
      text: "O povo de Manassés, primogênito de José, que recebe dez quinhões a oeste do Jordão, afora Gileade e Basã já dados a leste (Js 17:1,5). Homem de guerra em Maquir, forte e numeroso, ainda assim não pôde expulsar de todo os cananeus das cidades do vale (Js 17:12-13). A multidão herda a terra, mas a conquista mistura vitória e acomodação — grandeza de povo sem plena obediência.",
    },
    homem: {
      title: "Os filhos de José e os cananeus do vale",
      subtitle: "Josué 17 • o povo numeroso e os carros de ferro",
      text: "Os homens da casa de José que reclamam a Josué uma herança maior, \"sendo eu um tão grande povo\" (Js 17:14), e os cananeus do vale que possuíam \"carros de ferro\" (Js 17:16). Josué não lhes dá mais sorte, mas mais fé: subam ao bosque, cortem a floresta, tomem as montanhas — \"expulsarás os cananeus, ainda que tenham carros de ferro\" (Js 17:18). A promessa vence o ferro quando o povo trabalha e crê.",
    },
    mulherComum: {
      title: "As filhas de Zelofeade",
      subtitle: "Josué 17 • Maalá, Noa, Hogla, Milca e Tirza",
      text: "As cinco filhas de Zelofeade, que \"não teve filhos, mas só filhas\" (Js 17:3), e chegam diante de Eleazar, de Josué e dos príncipes reclamando a herança que o Senhor ordenara a Moisés que se lhes desse (Js 17:4; cf. Nm 27:1-7). A Escritura as nomeia com honra: em uma cultura em que só os homens herdavam, a justiça de Deus alcança as mulheres sem irmãos, e \"lhes deu herança no meio dos irmãos de seu pai\".",
    },
    anciao: {
      title: "Os cabeças das famílias de Manassés",
      subtitle: "Josué 17 • os príncipes e os filhos de Manassés",
      text: "Os príncipes diante de quem as filhas de Zelofeade apresentam a sua causa (Js 17:4) e os chefes das famílias de Manassés — os filhos de Abiezer, Heleque, Asriel, Siquém, Hefer e Semida (Js 17:2). São os anciãos e cabeças por quem a terra se reparte casa por casa. A Escritura não os individua todos, mas neles a herança de Manassés se divide em quinhões ordenados, segundo as famílias.",
    },
    rei: {
      title: "Os cananeus que ficaram no vale",
      subtitle: "Josué 17 • os senhores das cidades muradas",
      text: "Os senhores cananeus das cidades fortes do vale — Bete-Seã, Ibleã, Dor, Taanaque, Megido — que \"queriam habitar na mesma terra\" e que Manassés não pôde expulsar (Js 17:11-12). Engrossando em forças, Israel os fez tributários, mas \"não os expulsou de todo\" (Js 17:13). Ficam como poder subjugado porém não vencido — o resto da conquista que Israel deixou por acabar.",
    },
  },

  // ------------------------------------------------------------------ Js 18
  18: {
    multidao: {
      title: "A congregação reunida em Siló",
      subtitle: "Josué 18 • as sete tribos ainda sem herança",
      text: "Toda a congregação de Israel, que se reúne em Siló e ali arma a tenda da congregação, \"depois que a terra lhes foi sujeita\" (Js 18:1). Entre eles restavam sete tribos que \"ainda não tinham repartido a sua herança\" (Js 18:2), a quem Josué repreende pela negligência em possuir o que Deus já lhes dera. A multidão aguarda a sorte que Josué lançaria perante o Senhor — a primeira a sair foi a de Benjamim (Js 18:11).",
    },
    homem: {
      title: "Os três homens de cada tribo",
      subtitle: "Josué 18 • os que demarcam a terra num livro",
      text: "Os homens escolhidos — três de cada tribo — que Josué envia a percorrer a terra e demarcá-la \"em sete partes segundo as cidades, descrevendo-a num livro\" (Js 18:4,9). Anônimos, são os cartógrafos da promessa: levantam a terra por escrito para que Josué lance as sortes \"perante o Senhor\" em Siló (Js 18:6,10). Por seu trabalho fiel, a herança de Deus deixa de ser negligenciada e passa a ser tomada.",
    },
  },
};
