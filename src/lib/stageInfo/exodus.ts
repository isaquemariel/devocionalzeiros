// Fichas ESPECÍFICAS por (capítulo → papel) de exodus — quem é aquela figura
// (mesmo anônima na Bíblia) no contexto daquele capítulo, biblicamente e
// teologicamente. Vence a ficha genérica do papel. Preenchido pelo agente.
import type { StageInfo } from "@/lib/rpgStageInfo";
export const CHAPTER_ACTORS: Record<number, Record<string, StageInfo>> = {
  1: {
    multidao: {
      title: "Os hebreus multiplicados no Egito",
      subtitle: "Êxodo 1 • a semente que cresce sob a opressão",
      text: "São os filhos de Israel que, morto José, \"frutificaram, aumentaram muito, e multiplicaram-se\" até encher a terra (Êx 1:7), cumprindo a promessa feita a Abraão. Agora um novo Faraó os escraviza \"em barro e em tijolos\", e ordena matar os meninos hebreus (Êx 1:14,22). Sua sobrevivência é a fidelidade de Deus à aliança: o povo da promessa é oprimido, mas não pode ser extinto.",
    },
  },
  2: {
    multidao: {
      title: "Israel gemendo na servidão",
      subtitle: "Êxodo 2 • o clamor que sobe a Deus",
      text: "É a multidão dos filhos de Israel que, passados muitos dias, \"suspiraram por causa da servidão, e clamaram\" (Êx 2:23). O texto diz que \"o seu clamor subiu a Deus\", e Deus \"lembrou-se da sua aliança com Abraão, com Isaque, e com Jacó\" (Êx 2:24). Aqui a redenção começa não pela força do povo, mas pela memória fiel de Deus, que ouve o gemido e prepara o livramento.",
    },
    rebanho: {
      title: "O rebanho de Reuel em Midiã",
      subtitle: "Êxodo 2 • os animais junto ao poço",
      text: "São os rebanhos do sacerdote de Midiã, Reuel (Jetro), que suas sete filhas vinham abeberar quando os pastores as expulsaram (Êx 2:16-17). Moisés, o fugitivo do Egito, levanta-se, defende as moças e dá de beber ao rebanho. Este gado humilde no deserto é o cenário em que o libertador aprende a pastorear antes de conduzir o povo de Deus.",
    },
  },
  3: {
    rebanho: {
      title: "O rebanho de Jetro em Horebe",
      subtitle: "Êxodo 3 • as ovelhas junto à sarça ardente",
      text: "É o rebanho de Jetro, sogro de Moisés, que ele apascentava quando \"levou o rebanho atrás do deserto\" ao monte de Deus, Horebe (Êx 3:1). Junto destes animais o pastor vê a sarça que arde sem se consumir e ouve o \"EU SOU\" chamá-lo (Êx 3:14). O rebanho de Midiã marca o fim dos quarenta anos de pastoreio que fizeram de Moisés o pastor de Israel.",
    },
  },
  4: {
    multidao: {
      title: "O povo que creu e adorou",
      subtitle: "Êxodo 4 • Israel recebe os sinais",
      text: "É a multidão dos filhos de Israel a quem Arão fala e diante de quem faz os sinais dados por Deus a Moisés (Êx 4:30). Ao ouvirem que \"o Senhor visitava aos filhos de Israel, e que via a sua aflição\", o povo creu, \"inclinaram-se, e adoraram\" (Êx 4:31). É o primeiro fruto da missão: a fé nascente do povo escravo diante da promessa de livramento.",
    },
  },
  5: {
    multidao: {
      title: "O povo sob o jugo dos tijolos",
      subtitle: "Êxodo 5 • a carga agravada por Faraó",
      text: "É Israel escravo, obrigado agora a recolher a própria palha sem que se diminua a conta dos tijolos (Êx 5:7-8). Os oficiais hebreus são açoitados, e o povo se espalha pela terra do Egito a colher restolho (Êx 5:12-14). Ao endurecer o jugo, Faraó torna a opressão insuportável — mas é justamente na hora mais escura que Deus dirá: \"Agora verás o que hei de fazer a Faraó\" (Êx 6:1).",
    },
  },
  6: {
    multidao: {
      title: "Israel angustiado de espírito",
      subtitle: "Êxodo 6 • o povo que não ouve por dura servidão",
      text: "São os filhos de Israel a quem Moisés anuncia as grandes promessas do \"EU SOU O SENHOR\": tirar, livrar, resgatar, tomar por povo e introduzir na terra (Êx 6:6-8). Mas \"eles não ouviram a Moisés, por causa da angústia de espírito e da dura servidão\" (Êx 6:9). O peso do cativeiro sufoca até a fé, e a redenção terá de repousar na palavra de Deus, não no ânimo do povo.",
    },
  },
  7: {
    multidao: {
      title: "Os exércitos do Senhor no Egito",
      subtitle: "Êxodo 7 • o povo por quem Deus contende",
      text: "É Israel, que o Senhor chama \"meus exércitos, meu povo, os filhos de Israel\", e que promete tirar do Egito \"com grandes juízos\" (Êx 7:4). Ainda escravos, permanecem em Gósen enquanto Moisés e Arão confrontam Faraó com a vara que vira serpente e as águas que viram sangue. O povo é o alvo da libertação: as pragas começam para que \"os egípcios saibam que eu sou o Senhor\" (Êx 7:5).",
    },
  },
  8: {
    multidao: {
      title: "O povo separado em Gósen",
      subtitle: "Êxodo 8 • Israel poupado das pragas",
      text: "É Israel, a quem Deus faz \"separação entre o meu povo e o teu povo\", livrando a terra de Gósen dos enxames de moscas (Êx 8:22-23). Em meio às pragas do Egito, o povo da aliança vive sob proteção distinta, \"para que saibas que eu sou o Senhor no meio desta terra\". Essa separação prefigura o povo remido, guardado do juízo que cai sobre o mundo.",
    },
  },
  9: {
    rebanho: {
      title: "O gado poupado de Israel",
      subtitle: "Êxodo 9 • a distinção na peste e na saraiva",
      text: "É o gado dos israelitas — cavalos, jumentos, camelos, bois e ovelhas — sobre o qual Deus faz separação, para que \"nada morra de tudo o que for dos filhos de Israel\" (Êx 9:4). Na praga da peste \"todo o gado dos egípcios morreu; porém do gado dos filhos de Israel não morreu nenhum\" (Êx 9:6), e na saraiva o gado guardado em Gósen escapa. O rebanho poupado testemunha a mão que distingue os seus.",
    },
    multidao: {
      title: "Israel guardado em Gósen",
      subtitle: "Êxodo 9 • o povo livre da saraiva",
      text: "É a multidão dos filhos de Israel que habita em Gósen, \"onde estavam os filhos de Israel, não havia saraiva\" (Êx 9:26). Enquanto trovões, fogo e granizo destroem o Egito, o povo da aliança permanece intocado. A praga que humilha o orgulho de Faraó revela que o Senhor é dono da terra (Êx 9:29) e protetor do seu povo.",
    },
  },
  10: {
    multidao: {
      title: "O povo com luz nas trevas",
      subtitle: "Êxodo 10 • Israel na praga das trevas",
      text: "É Israel, sobre quem, mesmo nas trevas que se apalpavam por três dias em todo o Egito, \"todos os filhos de Israel tinham luz em suas habitações\" (Êx 10:23). Faraó tenta reter o gado do povo, mas Moisés responde que \"nem uma unha ficará\" (Êx 10:26). A luz no meio da escuridão anuncia o povo que anda na presença de Deus enquanto o juízo cega os rebeldes.",
    },
  },
  11: {
    multidao: {
      title: "Israel na véspera do êxodo",
      subtitle: "Êxodo 11 • o povo que pede joias ao Egito",
      text: "É a multidão dos filhos de Israel a quem o Senhor manda pedir \"jóias de prata e jóias de ouro\" a cada vizinho egípcio, na véspera da última praga (Êx 11:2). Deus lhes dá graça aos olhos dos egípcios e \"faz diferença entre os egípcios e os israelitas\", pois nenhum cão moverá a língua contra eles (Êx 11:7). O povo escravo será solto enriquecido, despojando o opressor às portas da liberdade.",
    },
  },
  12: {
    multidao: {
      title: "Israel na Páscoa saindo do Egito",
      subtitle: "Êxodo 12 • a congregação salva pelo sangue",
      text: "É \"toda a congregação de Israel\" que, na noite da Páscoa, marca as ombreiras com o sangue do cordeiro, para que ao ver o sangue o Senhor \"passe por cima\" e o destruidor não entre (Êx 12:13). Cerca de seiscentos mil homens, além de mulheres e crianças, partem de Ramessés com massa sem levedar (Êx 12:37). O sangue que os liberta prefigura o Cordeiro de Deus, cujo sacrifício redime o novo Israel (1Co 5:7).",
    },
    rebanho: {
      title: "O cordeiro da Páscoa",
      subtitle: "Êxodo 12 • os cordeiros e o gado que saem",
      text: "É o cordeiro \"sem mácula, um macho de um ano\", tomado das ovelhas ou das cabras, sacrificado por cada família à tarde do décimo quarto dia (Êx 12:5-6). Seu sangue salva as casas, e com as ovelhas e vacas o povo sai do Egito (Êx 12:32). Este cordeiro imolado no lugar do primogênito é a figura mais nítida de Cristo, \"a nossa páscoa\" (Jo 1:29; 1Co 5:7).",
    },
  },
  13: {
    multidao: {
      title: "Israel guiado pela coluna",
      subtitle: "Êxodo 13 • o povo que sai da casa da servidão",
      text: "É a multidão de Israel a quem Moisés ordena: \"Lembrai-vos deste mesmo dia, em que saístes do Egito, da casa da servidão\" (Êx 13:3), consagrando ao Senhor todo primogênito. Deus não os leva pelo caminho mais curto, mas rodeia pelo deserto, indo adiante deles \"de dia numa coluna de nuvem\" e \"de noite numa coluna de fogo\" (Êx 13:21). O povo redimido caminha sob a presença visível de Deus que nunca se afasta dele.",
    },
  },
  14: {
    cavaleiro: {
      title: "Os cavaleiros de Faraó",
      subtitle: "Êxodo 14 • os carros que perseguem no Mar Vermelho",
      text: "São os seiscentos carros escolhidos, \"todos os cavalos e carros de Faraó, e os seus cavaleiros e o seu exército\", lançados atrás de Israel em fuga (Êx 14:9). O Senhor endurece o coração de Faraó para ser glorificado \"nos seus carros e nos seus cavaleiros\" (Êx 14:17). As mesmas águas que salvam Israel os cobrem, \"nenhum deles ficou\" (Êx 14:28): o poder do opressor afunda como chumbo diante do Deus que peleja.",
    },
    multidao: {
      title: "Israel encurralado no mar",
      subtitle: "Êxodo 14 • o povo entre o mar e o exército",
      text: "É a multidão de Israel acampada junto ao mar que, vendo os egípcios avançarem, \"temeram muito\" e clamaram (Êx 14:10). Moisés responde: \"Não temais; estai quietos, e vede o livramento do Senhor\" (Êx 14:13), e o povo passa pelo meio do mar em seco, entre muros de água. Salvos naquele dia \"da mão dos egípcios\", temeram ao Senhor e creram nele e em Moisés (Êx 14:31): a redenção que se recebe pela fé, não pela espada.",
    },
  },
  15: {
    multidao: {
      title: "Israel cantando a vitória",
      subtitle: "Êxodo 15 • o cântico do mar",
      text: "É a multidão redimida que, após a passagem do mar, canta com Moisés: \"Cantarei ao Senhor, porque gloriosamente triunfou; lançou no mar o cavalo e o seu cavaleiro\" (Êx 15:1). Miriã e todas as mulheres respondem com tamboris e danças (Êx 15:20-21). Este primeiro louvor de Israel liberto celebra o Deus que é \"homem de guerra\" (Êx 15:3) e antecipa o cântico dos remidos diante do trono (Ap 15:3).",
    },
  },
  16: {
    multidao: {
      title: "O povo faminto que recebe o maná",
      subtitle: "Êxodo 16 • a murmuração e o pão do céu",
      text: "É toda a congregação de Israel que, no deserto de Sim, murmura contra Moisés e Arão, lembrando \"as panelas de carne\" do Egito (Êx 16:3). O Senhor responde fazendo \"chover pão dos céus\", o maná, e enviando codornizes, provando o povo se anda em sua lei (Êx 16:4). O pão do deserto, que apodrece se guardado e cessa no sábado, ensina a depender diariamente de Deus e prefigura o verdadeiro pão do céu (Jo 6:31-35).",
    },
  },
  17: {
    multidao: {
      title: "O povo sedento em Refidim",
      subtitle: "Êxodo 17 • a contenda em Massá e Meribá",
      text: "É a multidão de Israel que, sem água em Refidim, contende com Moisés e tenta ao Senhor, dizendo: \"Está o Senhor no meio de nós, ou não?\" (Êx 17:7). Deus manda Moisés ferir a rocha em Horebe, e dela sai água para o povo beber (Êx 17:6). A rocha ferida que sacia os murmuradores é figura de Cristo, a Rocha espiritual que os seguia (1Co 10:4).",
    },
  },
  18: {
    multidao: {
      title: "O povo que busca juízo",
      subtitle: "Êxodo 18 • Israel diante do tribunal de Moisés",
      text: "É a multidão de Israel que se apinha diante de Moisés \"desde a manhã até à tarde\" para consultar a Deus e ser julgada segundo os seus estatutos (Êx 18:13-16). Vendo o peso, Jetro aconselha a nomear \"maiorais de mil, de cem, de cinqüenta e de dez\" (Êx 18:21). Nasce ali a estrutura de governo do povo de Deus, para que a justiça alcance a todos e o mediador não desfaleça.",
    },
  },
  19: {
    multidao: {
      title: "Israel ao pé do Sinai",
      subtitle: "Êxodo 19 • o povo santificado diante da teofania",
      text: "É a multidão de Israel acampada em frente ao monte, chamada a ser \"a minha propriedade peculiar dentre todos os povos\" e \"um reino sacerdotal e o povo santo\" (Êx 19:5-6). O povo se santifica e lava as roupas para o terceiro dia, e treme diante dos trovões, relâmpagos e da nuvem espessa quando o Senhor desce em fogo (Êx 19:16-18). Ali Israel é constituído nação da aliança na presença tremenda de Deus.",
    },
  },
  20: {
    multidao: {
      title: "Israel recebendo a Lei",
      subtitle: "Êxodo 20 • o povo diante dos Dez Mandamentos",
      text: "É a multidão de Israel que ouve Deus falar \"todas estas palavras\" — os Dez Mandamentos — do meio do fogo e da fumaça (Êx 20:1). Vendo os trovões e o monte fumegar, o povo \"retirou-se e pôs-se de longe\" e pediu: \"Fala tu conosco... e não fale Deus conosco, para que não morramos\" (Êx 20:18-19). O temor da Lei revela a necessidade de um mediador entre o Deus santo e o povo pecador.",
    },
  },
  24: {
    multidao: {
      title: "O povo da aliança selada",
      subtitle: "Êxodo 24 • Israel aspergido com sangue",
      text: "É a multidão de Israel que, ouvindo o livro da aliança, responde a uma voz: \"Tudo o que o Senhor tem falado faremos, e obedeceremos\" (Êx 24:7). Moisés asperge sobre o povo o sangue dos sacrifícios, dizendo: \"Eis aqui o sangue da aliança que o Senhor tem feito convosco\" (Êx 24:8). Esse sangue que ratifica o pacto aponta para \"o sangue da nova aliança\" derramado por Cristo (Mt 26:28; Hb 9:19-20).",
    },
  },
  30: {
    multidao: {
      title: "Israel no arrolamento",
      subtitle: "Êxodo 30 • o resgate de meio siclo",
      text: "São os filhos de Israel que, ao serem contados, cada um dá \"o resgate da sua alma\", meio siclo do santuário, \"para que não haja entre eles praga alguma\" (Êx 30:12-13). Rico e pobre dão o mesmo, \"para fazer expiação por vossas almas\" (Êx 30:15), e o dinheiro serve à tenda da congregação. O preço igual do resgate ensina que toda alma pertence a Deus e só se aproxima dele por expiação.",
    },
  },
  32: {
    multidao: {
      title: "O povo do bezerro de ouro",
      subtitle: "Êxodo 32 • Israel na apostasia ao pé do monte",
      text: "É a multidão de Israel que, vendo Moisés tardar, exige de Arão: \"Faze-nos deuses, que vão adiante de nós\" (Êx 32:1), e adora o bezerro de fundição, dizendo: \"Este é teu deus, ó Israel\" (Êx 32:4). Deus os chama \"povo de dura cerviz\" e só a intercessão de Moisés detém o furor (Êx 32:9-11). No mesmo lugar onde jurou obedecer, o povo cai na idolatria — retrato da infidelidade do coração humano.",
    },
  },
  33: {
    multidao: {
      title: "O povo enlutado que adora",
      subtitle: "Êxodo 33 • Israel entre o juízo e a presença",
      text: "É a multidão de Israel que, ouvindo a má notícia de que Deus não subiria \"no meio de ti, porquanto és povo de dura cerviz\", pranteia e tira os seus atavios (Êx 33:3-6). Quando a coluna de nuvem desce à porta da tenda, \"todo o povo se levantava e cada um, à porta da sua tenda, adorava\" (Êx 33:10). O povo perdoado aprende que sua única esperança é a presença de Deus: \"Se tu mesmo não fores conosco, não nos faças subir daqui\" (Êx 33:15).",
    },
  },
  34: {
    multidao: {
      title: "Israel diante do rosto resplandecente",
      subtitle: "Êxodo 34 • o povo na renovação da aliança",
      text: "É a multidão de Israel a quem Moisés desce trazendo as segundas tábuas, sem saber que \"a pele do seu rosto resplandecia\" por ter falado com Deus (Êx 34:29). Arão e o povo temem chegar-se, e Moisés põe um véu sobre o rosto (Êx 34:30,33). O brilho que os atemoriza mostra a glória da aliança renovada com o Deus \"misericordioso e piedoso, tardio em irar-se\" (Êx 34:6; 2Co 3:7,13).",
    },
  },
  35: {
    multidao: {
      title: "A congregação das ofertas voluntárias",
      subtitle: "Êxodo 35 • Israel doando para o tabernáculo",
      text: "É \"toda a congregação dos filhos de Israel\" convocada a trazer, cada um \"cujo coração é voluntariamente disposto\", ouro, prata, tecidos e trabalho para a obra do santuário (Êx 35:5,21). Homens e mulheres, hábeis de coração, oferecem e fiam com alegria (Êx 35:22,25). O mesmo povo que pecou com o ouro do bezerro agora o consagra a Deus: o coração remido responde com generosidade ao culto verdadeiro.",
    },
  },
  36: {
    multidao: {
      title: "O povo que trouxe mais do que bastava",
      subtitle: "Êxodo 36 • as ofertas em excesso",
      text: "É a multidão de Israel cuja generosidade foi tanta que os sábios disseram a Moisés: \"O povo traz muito mais do que basta\" (Êx 36:5). Moisés precisa proclamar que ninguém traga mais, e \"o povo foi proibido de trazer\", pois já sobejava (Êx 36:6-7). Raro juízo de fartura no deserto: quando o coração é movido por Deus, a oferta transborda além da necessidade da obra.",
    },
  },
  39: {
    multidao: {
      title: "Israel que terminou a obra",
      subtitle: "Êxodo 39 • o povo abençoado por Moisés",
      text: "São os filhos de Israel que fizeram \"conforme a tudo o que o Senhor ordenara a Moisés\" toda a obra do tabernáculo e das vestes sacerdotais (Êx 39:32,42). Ao ver a obra concluída exatamente como mandara o Senhor, \"Moisés os abençoou\" (Êx 39:43). A obediência fiel do povo em cada detalhe do santuário ecoa o descanso da criação e prepara a habitação de Deus no meio deles.",
    },
  },
  40: {
    multidao: {
      title: "A congregação sob a glória",
      subtitle: "Êxodo 40 • Israel vê a glória encher o tabernáculo",
      text: "É \"toda a casa de Israel\" que, levantado o tabernáculo, vê \"a nuvem cobrir a tenda da congregação, e a glória do Senhor encher o tabernáculo\" (Êx 40:34). A nuvem de dia e o fogo de noite ficam sobre a tenda \"perante os olhos de toda a casa de Israel, em todas as suas jornadas\" (Êx 40:38). O Deus que os tirou do Egito agora habita no meio deles — clímax do Êxodo e penhor do Emanuel, \"Deus conosco\".",
    },
  },
};
