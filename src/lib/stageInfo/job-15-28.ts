// Fichas ESPECÍFICAS por (capítulo → papel) de JÓ 15–28.
// O segundo e o terceiro ciclo do debate, e o poema da sabedoria que os fecha.
// O palco de Jó quase nunca mostra os quatro homens sentados na cinza: mostra o
// que a fala VÊ. Cada versículo de discurso virou o quadro da sua própria
// imagem, e por isso o figurante de um beat não é "um homem do povo" — é a
// FIGURA DAQUELA IMAGEM: o ímpio de pescoço engrossado que Elifaz desenha, o
// flecheiro que cerca o alvo, o primogênito da morte, a viúva despedida vazia
// da porta, o pobre que sai à obra como jumento montês, o mineiro pendurado no
// poço. As fichas abaixo dizem de que imagem cada figura é, quem a disse e o
// que ela quer dizer no argumento — porque num livro de discursos é o argumento
// que é a ação.
//
// Nota de direção: em nenhum destes catorze capítulos há `by: "deus"`. Deus não
// fala em Jó 15–28; a voz do céu só volta no capítulo 38, do meio do redemoinho.
// Todos os balões daqui são de Jó, de Elifaz, de Bildade e de Zofar, sempre
// pelo `id` — e as fichas dos quatro vivem em CHAR_INFO, não aqui.
import type { StageInfo } from "@/lib/rpgStageInfo";

export const CHAPTER_ACTORS_15_28: Record<number, Record<string, StageInfo>> = {
  // ----------------------------------------------------------------- Jó 15
  15: {
    anciao: {
      title: "Os encanecidos e idosos do portão, mais idosos do que o pai de Jó, e os sábios que anunciaram o que ouviram de seus pais",
      subtitle: "Jó 15:10,18 • as cabeças brancas que Elifaz chama para a sua banca de testemunhas",
      text: "Quando Elifaz volta a falar, a cortesia do capítulo 4 acabou e a argumentação também: o que ele tem agora é idade. \"Também há entre nós encanecidos e idosos, muito mais idosos do que teu pai\" (Jó 15:10) — e não é retórica, é a autoridade inteira do discurso. Ao lado deles apela a uma geração ainda mais atrás: \"O que os sábios anunciaram, ouvindo-o de seus pais\" (15:18). É a tese central do amigo: o que os pais disseram basta. O livro dá-lhe a resposta mais dura possível em 42:7."
    },
    homem: {
      title: "O ímpio do retrato de Elifaz: o que bebe a iniquidade como a água, o que anda vagueando por pão, o de rosto coberto de gordura, o que habitou em cidades assoladas — e o vinhateiro da vide que sacode as uvas verdes",
      subtitle: "Jó 15:16-34 • as doze figuras do quadro que Elifaz pinta para Jó se ver dentro",
      text: "Dois terços do capítulo são um só retrato, longo e feio de propósito: Elifaz quer que Jó se reconheça nele. É o homem que \"bebe a iniqüidade como a água\" (Jó 15:16), com a naturalidade de quem tem sede. É o atormentado que \"anda vagueando por pão, dizendo: Onde está?\" (15:23). É o que arremete contra Deus \"com a dura cerviz\" (15:26), o gordo de 15:27, o que se instalou \"em cidades assoladas\" (15:28). E é o vinhateiro que \"sacudirá as suas uvas verdes\" (15:33). Nada disto descreve o Jó que o próprio Deus chamou \"íntegro e reto\" (1:8)."
    },
    mulherComum: {
      title: "A mulher de quem nasce o que não é justo",
      subtitle: "Jó 15:14 • a mãe do argumento que corta pela raiz",
      text: "\"Que é o homem, para que seja puro? E o que nasce da mulher, para ser justo?\" (Jó 15:14). É a segunda vez que Elifaz usa esta frase — ouvira-a, diz ele, na visão do capítulo 4 (4:17) —, a mesma que Bildade repetirá em 25:4. A mulher em cena não é acusada de nada: é o começo de uma cadeia que o argumento quer fechar antes de discutir o caso concreto. O passo seguinte é: \"nem os céus são puros aos seus olhos\" (15:15). O raciocínio é verdadeiro e a aplicação é falsa — Davi dirá o mesmo em Sl 51:5, e \"nascido de mulher\" (Gl 4:4) é o único a quem a frase não alcança."
    },
    rei: {
      title: "O rei preparado para a peleja e o tirano para quem se reserva um certo número de anos",
      subtitle: "Jó 15:20,24 • as duas figuras de poder que Elifaz usa como imagem do medo",
      text: "Elifaz não tem um rei na cena de Uz — tem duas figuras de coroa dentro do próprio discurso, e as duas são medo. A primeira é o prazo contado: \"se reserva, para o tirano, um certo número de anos\" (Jó 15:20) — o homem que manda e sabe que os anos dele estão numerados por outro. A segunda é a angústia armada: \"prevalecem contra ele, como o rei preparado para a peleja\" (15:24) — o aparato do rei usado como medida do terror que cai sobre um homem sozinho. E o livro já mostrou quem de fato veio com tropa: sabeus e caldeus (1:15-17), desastre real, não parábola."
    },
    servo: {
      title: "O ouvinte da praça a quem a língua dos astutos se dirige",
      subtitle: "Jó 15:5-6 • a testemunha pública da acusação, porque a acusação é pública",
      text: "\"Porque a tua boca declara a tua iniqüidade... A tua boca te condena, e não eu, e os teus lábios testificam contra ti\" (Jó 15:5-6). O quadro é uma praça de propósito: Elifaz não censura um amigo em particular, faz com que o próprio réu forneça a prova diante de terceiros. Este servo é o homem comum que passa, ouve e leva embora o que ouviu — e a humilhação de Jó, que no capítulo 17 se queixará de ter virado \"um provérbio dos povos\" (17:6), começa em cenas assim. O que se ouviu na praça teve de ser desdito na praça (42:8)."
    }
  },

  // ----------------------------------------------------------------- Jó 16
  16: {
    homem: {
      title: "Os flecheiros que cercam Jó pela direita e pela esquerda, o valente que arremete com brecha sobre brecha, o que range os dentes e o que fere nos queixos com desprezo",
      subtitle: "Jó 16:9-14 • o cerco de figuras em que Jó descreve o que lhe está a acontecer",
      text: "Este é o capítulo em que o livro faz a sua curva, e o meio dele é o quadro mais violento do bloco. Jó não descreve doença: descreve um cerco. \"também me pôs por seu alvo. Cercam-me os seus flecheiros\" (Jó 16:12-13) — um homem posto de pé no campo para servir de alvo, com os arqueiros em roda. Depois o assalto à muralha: \"arremete contra mim como um valente\" (16:14). À volta estão os homens de carne e osso: \"com desprezo me feriram nos queixos\" (16:10) — matilha, não tribunal. O bofetão e a boca aberta voltarão no Servo de Is 50:6 e em Mc 14:65."
    },
    servo: {
      title: "O servo da companhia de Jó que foi assolada e o que se ajunta com os outros contra ele",
      subtitle: "Jó 16:7,10 • os dois lados da casa que já não existe",
      text: "\"Na verdade, agora tu me tens fatigado; tu assolaste toda a minha companhia\" (Jó 16:7). A palavra é de casa, não de exército: a companhia de Jó era a gente do capítulo 1, os que morreram ao fio da espada e de que só escapou um de cada vez (1:14-19). Um destes servos é o que sobrou. O outro está do lado contrário, e dói mais: \"contra mim se ajuntam todos\" (16:10). Gente que comia do pão dele faz agora parte da roda que zomba — o que dirá por extenso em 19:15 e 30:1. Perder a fazenda é uma coisa; ver os criados passarem para a fila dos escarnecedores é outra."
    }
  },

  // ----------------------------------------------------------------- Jó 17
  17: {
    homem: {
      title: "O zombador que cerca Jó na praça, o que denuncia os seus amigos para serem despojados — e os retos que pasmarão, o inocente que se levantará e o justo que seguirá o seu caminho firmemente",
      subtitle: "Jó 17:2-9 • a roda que ri e os três versículos limpos no meio dela",
      text: "\"Deveras estou cercado de zombadores\" (Jó 17:2), e o pior é o lugar: \"a mim me pôs por um provérbio dos povos\" (17:6). Virar provérbio é ser dito por gente que nunca o conheceu. Ao lado dos zombadores está o delator, num provérbio que Jó devolve aos amigos: \"O que denuncia os seus amigos, a fim de serem despojados...\" (17:5). E então, no meio do capítulo mais escuro do bloco, abrem-se três linhas de luz: \"o justo seguirá o seu caminho firmemente, e o puro de mãos irá crescendo em força\" (17:9) — a mesma teimosia de 27:5."
    },
    servo: {
      title: "O segundo zombador cujas provocações Jó contempla e o filho do delator cujos olhos desfalecerão",
      subtitle: "Jó 17:2,5 • quem está de pé em volta de um homem que só tem a sepultura diante de si",
      text: "O capítulo abre com a frase mais seca do bloco: \"só tenho perante mim a sepultura\" (Jó 17:1). É em volta desse homem que estas figuras estão. Uma é o segundo da roda dos escarnecedores, cujas provocações ele diz contemplar de olhos abertos (17:2) — não passam por ele, ele vê-as uma a uma. A outra é o filho do delator, que não fez nada e entra na frase porque o provérbio antigo cobrava a conta na geração seguinte (17:5). É a lógica que os três aplicam a Jó o tempo todo, e que ele recusará em 21:19-20."
    }
  },

  // ----------------------------------------------------------------- Jó 18
  18: {
    homem: {
      title: "O ímpio de Bildade e as armadilhas que o esperam: o que por seus próprios pés é lançado na rede, o primogênito da morte, os assombros que o espantam de todos os lados, e os do ocidente e do oriente que se espantam do seu dia",
      subtitle: "Jó 18:5-21 • um capítulo inteiro de ciladas, e uma só figura no meio delas",
      text: "Bildade responde com um capítulo que é quase todo caça: rede, laço, corda e arapuca, e um homem no meio. \"Porque por seus próprios pés é lançado na rede... O laço o apanhará pelo calcanhar\" (Jó 18:8-9). Ninguém o empurra: ele entra por si. Antes disso apagou-se-lhe a casa (18:6) — e por isso, no beat desse versículo, o candeeiro teve de sair de cena: o motor desenha sempre a chama acesa. Depois vem \"o primogênito da morte\" (18:13), doença personificada, desenhada como homem de veste escura e nunca como mensageiro de asas. O fim é o apagamento do nome (18:17-19)."
    },
    rebanho: {
      title: "O rebanho a que Bildade se diz igualado diante de Jó",
      subtitle: "Jó 18:3 • \"Por que somos tratados como animais, e como imundos aos vossos olhos?\"",
      text: "\"Por que somos tratados como animais, e como imundos aos vossos olhos?\" (Jó 18:3). A cena põe no quadro exatamente a ofensa de Bildade: a malhada de bichos com que ele se sente comparado. Vale reparar no que o ofende — não a injustiça feita a Jó, nem os dez túmulos, nem a doença: o que o move é ter sido tratado sem consideração no debate. É a queixa de quem está a perder a discussão. E o livro guarda a ironia: quando Deus falar do redemoinho, será para desfilar animais diante dos homens (Jó 39), mostrando que o homem não os entende nem os governa."
    },
    servo: {
      title: "O moço da praça que nunca ouviu o nome do ímpio e o morador estranho que fica na sua tenda",
      subtitle: "Jó 18:15,17 • os dois figurantes do apagamento",
      text: "Bildade fecha o retrato com duas figuras que dizem o mesmo por lados opostos. A primeira mora onde não é dono: \"Morará na sua mesma tenda, o que não lhe pertence; espalhar-se-á enxofre sobre a sua habitação\" (Jó 18:15) — e o enxofre é palavra pesada: é o de Sodoma (Gn 19:24). A segunda é a mais cruel: \"a sua memória perecerá da terra, e pelas praças não terá nome\" (18:17) — um rapaz que passa e a quem aquele nome não diz nada. A resposta virá de outra boca: no capítulo 19 Jó pedirá que as suas palavras sejam gravadas na rocha (19:23-24)."
    }
  },

  // ----------------------------------------------------------------- Jó 19
  19: {
    homem: {
      title: "Os irmãos que Deus pôs longe de Jó, os conhecidos que se apartaram como estranhos, os homens da sua confidência que o abominam e os homens de armas das tropas acampadas em redor da sua tenda",
      subtitle: "Jó 19:12-19 • o inventário do abandono, um parente de cada vez",
      text: "O capítulo do Redentor começa por um censo de perdas, feito com o cuidado de quem conta dinheiro. Primeiro o cerco: \"se acamparam ao redor da minha tenda\" (Jó 19:12) — sitiado dentro de casa, como uma cidade. Depois a família: \"pôs longe de mim a meus irmãos... Os meus parentes me deixaram\" (19:13-14). E o círculo mais apertado: \"Todos os homens da minha confidência me abominam\" (19:19). No meio disso, a frase que sobreviveu à língua: \"escapei só com a pele dos meus dentes\" (19:20). É deste chão, sem nada nas mãos, que sai o versículo 25."
    },
    mulherComum: {
      title: "A mulher de Jó, a quem o seu hálito se fez estranho, e as servas a cujos olhos ele veio a ser um estrangeiro",
      subtitle: "Jó 19:15,17 • a casa por dentro, quando o dono já não é de casa",
      text: "\"Os meus domésticos e as minhas servas me reputaram como um estranho\" (Jó 19:15). E, um versículo adiante, a linha mais íntima do livro: \"O meu hálito se fez estranho à minha mulher\" (19:17). A mulher de Jó aparece três vezes e nunca com nome: enterra dez filhos no capítulo 1, diz \"amaldiçoa a Deus, e morre\" no 2 (2:9), e reaparece aqui, num verso em que quem se afasta é ela e quem suplica é ele. Não há condenação no texto: há uma casa em que o cheiro da doença já não se suporta. Em 42:11 a casa volta a encher-se, e comem pão com ele."
    },
    servo: {
      title: "O criado que não respondeu quando Jó o chamou, o doméstico que o reputou estranho e os pequeninos da viela que falam contra ele",
      subtitle: "Jó 19:16,18 • o dia em que a autoridade de um homem dentro da própria casa acaba",
      text: "\"Chamei a meu criado, e ele não me respondeu; cheguei a suplicar-lhe com a minha própria boca\" (Jó 19:16). É o verso em que se percebe que Jó já não é senhor de nada: um homem que tinha \"muitíssimos os servos a seu serviço\" (1:3) passa do chamado à súplica — e mesmo assim não é atendido. Depois vêm os meninos: \"Até os pequeninos me desprezam\" (19:18). O capítulo 29 guardará a memória do contrário exato (29:8). Entre uma coisa e outra não há culpa provada: há uma reputação que caiu e uma rua que se ajustou depressa."
    }
  },

  // ----------------------------------------------------------------- Jó 20
  20: {
    homem: {
      title: "O ímpio de Zofar: o que engoliu riquezas e as vomitará, o que tem o mal doce na boca, o que oprimiu e desamparou os pobres, o que foge das armas de ferro — e o pobre que ele oprimiu",
      subtitle: "Jó 20:5-28 • o último discurso de Zofar, escrito inteiro em digestão e em armas",
      text: "Zofar fala pela última vez e escolhe duas linguagens: a da comida e a da guerra. A tese está no início: \"O júbilo dos ímpios é breve\" (Jó 20:5). Depois vem a imagem que ninguém esquece: \"Ainda que o mal lhe seja doce na boca... fel de áspides será interiormente\" (20:12-14), e \"Engoliu riquezas, porém vomitá-las-á\" (20:15). O motivo é dito sem rodeios: \"oprimiu e desamparou os pobres, e roubou a casa que não edificou\" (20:19). O fim é armaria: \"o arco de bronze o atravessará\" (20:24). Tudo verdadeiro em geral, e tudo dirigido ao homem errado."
    },
    multidao: {
      title: "Os hipócritas cuja alegria dura um momento",
      subtitle: "Jó 20:5 • a única festa do discurso de Zofar, e dura um versículo",
      text: "\"O júbilo dos ímpios é breve, e a alegria dos hipócritas momentânea\" (Jó 20:5). É o único lugar deste discurso em que uma multidão cabe em cena, e cabe porque o texto diz júbilo e alegria — que é como o motor sempre a desenha, de braços erguidos. A tese de Zofar é temporal, não moral: não nega que o ímpio se alegre; nega que a alegria dure. É contra isso que Jó levanta o capítulo seguinte: \"Por que razão vivem os ímpios, envelhecem, e ainda se robustecem em poder?\" (21:7). O Salmo 73 leva o salmista ao santuário antes de achar resposta."
    },
    servo: {
      title: "Os filhos do ímpio que restituem os bens aos pobres e o servo que transporta as riquezas da casa",
      subtitle: "Jó 20:10,28 • quem carrega para fora o que o dono juntou",
      text: "Duas cenas de mudança, uma no princípio e outra no fim do discurso. A primeira é uma restituição feita tarde: \"Os seus filhos procurarão agradar aos pobres, e as suas mãos restituirão os seus bens\" (Jó 20:10) — a geração seguinte devolvendo o que o pai tomou. A segunda é o esvaziamento: \"As riquezas de sua casa serão transportadas\" (20:28); os fardos a sair, e o dono nem aparece no quadro. Jó ouviu isto tendo perdido a fazenda em três levas num só dia (1:14-17) — menos um argumento do que uma reencenação."
    }
  },

  // ----------------------------------------------------------------- Jó 21
  21: {
    anciao: {
      title: "O ímpio que vive, envelhece e ainda se robustece em poder",
      subtitle: "Jó 21:7 • a pergunta que vira a mesa do debate inteiro",
      text: "\"Por que razão vivem os ímpios, envelhecem, e ainda se robustecem em poder?\" (Jó 21:7). Esta cabeça branca é a resposta de Jó a três discursos seguidos: não um ímpio castigado, mas um ímpio velho, forte e respeitado, que a doutrina dos amigos não explica. É a observação contra a teoria — e é radical, porque a teoria era a de todos (15:20; 18:5-6; 20:5). Jó leva a coisa até ao fim: morrem sossegados (21:23) e o túmulo é vigiado com honras (21:32). É o espinho do Salmo 73:3 e de Jr 12:1, e o livro deixa-o aberto até o capítulo 38."
    },
    homem: {
      title: "O que morre na força da sua plenitude, sossegado e tranquilo, e o que morre na amargura sem haver provado do bem; o ímpio que diz a Deus \"retira-te de nós\"; o tangedor do tamboril; e o caminhante a quem Jó manda perguntar pelos sinais",
      subtitle: "Jó 21:11-33 • dois homens que acabam no mesmo pó, e a estrada onde se confere a conta",
      text: "O centro do capítulo são dois funerais lado a lado. \"Um morre na força da sua plenitude... E outro, ao contrário, morre na amargura do seu coração\" (Jó 21:23-25) — e então a frase que os iguala e desmonta a doutrina dos três: \"Juntamente jazem no pó, e os vermes os cobrem\" (21:26). Antes disso, a casa próspera, com as crianças a saltar e o tamboril (21:11-12), sustentada por quem diz a Deus na cara: \"Retira-te de nós\" (21:14). Jó não inveja aquilo (21:16); recusa-se a fingir que não existe. E manda conferir na estrada, com quem passa (21:29)."
    },
    mulherComum: {
      title: "A mulher da casa do ímpio, que tem paz e não tem temor",
      subtitle: "Jó 21:9 • \"as suas casas têm paz, sem temor\"",
      text: "\"As suas casas têm paz, sem temor; e a vara de Deus não está sobre eles\" (Jó 21:9). A mulher deste quadro é a peça mais incômoda do argumento de Jó, porque não é personagem de acusação nenhuma: é uma dona de casa tranquila, num pátio bem posto, num dia bom. O verso anterior põe a descendência estabelecida e o seguinte o gado que não falha — a bênção inteira do Deuteronômio a funcionar na casa de gente que declarou não querer saber de Deus. É a serenidade dela que faz o argumento: se a doutrina fosse verdadeira, este pátio não podia existir (cf. Sl 73:12)."
    },
    multidao: {
      title: "As crianças do ímpio, que saem como a um rebanho e andam saltando",
      subtitle: "Jó 21:11-12 • a festa que Jó põe diante dos amigos para eles explicarem",
      text: "\"Fazem sair as suas crianças, como a um rebanho, e seus filhos andam saltando. Levantam a voz, ao som do tamboril e da harpa\" (Jó 21:11-12). É o único quadro de festa dos capítulos 15 a 28, e a multidão cabe aqui porque o texto diz que saltam e se alegram. A crueldade da cena é do tamanho do livro: quem a descreve enterrou dez filhos que estavam exatamente assim quando o vento derrubou a casa (1:18-19). Jó não diz que aquelas crianças mereçam menos; diz aos três que a régua deles não mede o mundo real — e já recusou que o filho pague pelo pai (21:19)."
    },
    pastor: {
      title: "O pastor do gado do ímpio, cujo touro gera e não falha",
      subtitle: "Jó 21:10 • a malhada que a doutrina dos amigos não explica",
      text: "\"O seu touro gera, e não falha; pare a sua vaca, e não aborta\" (Jó 21:10). Este pastor cuida do gado que devia estar amaldiçoado e não está. Num mundo agrário é este o termômetro: a fecundidade do rebanho era a medida visível do favor de Deus (Dt 28:4,18). Jó aponta um curral em que tudo pare e nada se perde, na casa de quem diz a Deus \"retira-te de nós\" (21:14). O quadro é sereno de propósito, e é o argumento: não há ali nenhum sinal de juízo para o pastor ver. Quem perdeu tudo em quatro horas (1:14-17) sabe reconhecer um rebanho intacto."
    },
    rebanho: {
      title: "O gado do ímpio, o touro que gera e a vaca que não aborta",
      subtitle: "Jó 21:10 • a prosperidade que Jó manda os amigos olharem",
      text: "\"O seu touro gera, e não falha; pare a sua vaca, e não aborta\" (Jó 21:10). São bichos gordos ao sol, junto de um poço cheio, e estão no palco por serem a prova material do argumento: a bênção agrícola inteira a funcionar na fazenda de quem dispensou Deus por escrito. O contraste é com a manhã do capítulo 1, em que os sabeus levaram os bois, o fogo queimou as ovelhas e os caldeus levaram os camelos (1:14-17). É por isso que o capítulo fecha com a resposta mais seca do livro aos três: \"Como, pois, me consolais com vaidade?\" (21:34)."
    },
    servo: {
      title: "O filho do ímpio estabelecido perante a sua face, o renovo que cresce perante os seus olhos, o guarda que vigia o túmulo e o companheiro do caminhante que conhece os sinais",
      subtitle: "Jó 21:8,29-32 • a casa que continua e o enterro com honras",
      text: "\"A sua descendência se estabelece com eles perante a sua face\" (Jó 21:8) — o ímpio de Jó vê os filhos crescerem e os netos assentarem casa, que era a definição bíblica de vida cumprida (Sl 128:6). No fim entra o figurante que mais o irrita: \"Finalmente é levado à sepultura, e vigiam-lhe o túmulo\" (21:32) — guarda de honra ao pé da campa de quem disse a Deus \"retira-te de nós\". Entre uma coisa e outra está o viajante que Jó manda consultar (21:29): quem anda por estradas vê muitas casas, e o que vê não confirma a doutrina de quem só fala sentado."
    }
  },

  // ----------------------------------------------------------------- Jó 22
  22: {
    anciao: {
      title: "O poderoso para quem era a terra, e que nela habitava",
      subtitle: "Jó 22:8 • o retrato do latifundiário que Elifaz cola em Jó",
      text: "\"Mas para o poderoso era a terra, e o homem tido em respeito habitava nela\" (Jó 22:8). É o único versículo em que Elifaz descreve o que imagina que Jó foi: o grande homem da região, dono do chão. É dito com desprezo, e é a moldura em que vai pendurar as acusações que inventa a seguir. O incômodo é que a descrição é quase verdadeira (1:3; 29:9-10). O que ele faz é converter a grandeza em prova de crime — se era grande, tomou de alguém —, e o capítulo 29 desmente linha a linha: \"eu livrava o miserável, que clamava\" (29:12)."
    },
    homem: {
      title: "O cansado a quem não deram água a beber, o faminto a quem retiveram o pão, o irmão penhorado sem causa, o homem iníquo que pisou a vereda antiga e o inocente que escarnece dos ímpios",
      subtitle: "Jó 22:6-19 • os pecados concretos que Elifaz inventa, um figurante por acusação",
      text: "Este é o momento mais baixo dos três amigos: sem prova nenhuma, Elifaz passa da doutrina geral à lista de crimes. \"sem causa penhoraste a teus irmãos... Não deste ao cansado água a beber, e ao faminto retiveste o pão\" (Jó 22:6-7). Cada figura em cena é uma dessas acusações de pé — e tomar a capa em penhor sem a devolver ao pôr do sol era o que a Lei proibia (Êx 22:26-27). Elifaz não viu nada disto: deduziu-o do sofrimento, porque a doutrina exige uma causa. O capítulo 31 responderá ponto por ponto (31:16-17)."
    },
    mulherComum: {
      title: "A viúva despedida vazia da porta",
      subtitle: "Jó 22:9 • a pior frase que sai da boca dos três em todo o livro",
      text: "\"As viúvas despediste vazias, e os braços dos órfãos foram quebrados\" (Jó 22:9). A viúva e o órfão são, na Lei, os dois nomes que Deus toma como seus: \"Se de algum modo os afligires, e eles clamarem a mim... a minha ira se acenderá\" (Êx 22:22-24; cf. Dt 27:19). Elifaz sabe disso — por isso escolhe a acusação mais grave que se podia fazer. E é falsa: Jó dirá que fazia \"que rejubilasse o coração da viúva\" (29:13). A mulher com o cântaro vazio no degrau é o retrato do que a doutrina da retribuição faz a quem a leva às últimas: inventar um crime para justificar uma dor."
    },
    multidao: {
      title: "Os justos que o veem e se alegram",
      subtitle: "Jó 22:19 • a alegria com a desgraça alheia, apresentada como piedade",
      text: "\"Os justos o vêem, e se alegram, e o inocente escarnece deles\" (Jó 22:19). Elifaz cita isto como coisa boa, e é aí que o discurso se denuncia: a comunidade dos direitos reunida a comemorar a ruína dos outros. É uma multidão de braços erguidos numa cena que devia ser de luto — e o que a torna insuportável é que Jó está a ouvir, na condição exata daquele de quem se ri. A Escritura julga essa alegria (Pv 24:17; Ob 12). No fim do livro estes mesmos justos terão de pedir que ele ore por eles (42:8)."
    },
    servo: {
      title: "O órfão cujos braços foram quebrados",
      subtitle: "Jó 22:9 • o menino da segunda metade da acusação",
      text: "\"As viúvas despediste vazias, e os braços dos órfãos foram quebrados\" (Jó 22:9). O braço quebrado é a imagem exata do que se faz a quem não tem defensor: tira-se-lhe a única coisa com que se podia sustentar. No mundo do livro, o órfão sem parente que o reclamasse era carne de penhor — cena que Jó descreverá no capítulo 24 (24:3,9). A diferença é decisiva: em 24 ele denuncia o que os ímpios fazem a estes meninos; em 22 Elifaz diz que quem lhes fez isso foi ele. Nada no livro sustenta a acusação, e duas coisas a contradizem (1:8; 29:12)."
    }
  },

  // ----------------------------------------------------------------- Jó 24
  24: {
    anciao: {
      title: "O poderoso que Deus arrasta com a sua força",
      subtitle: "Jó 24:22-24 • o grande que também acaba cortado como cabeça de espiga",
      text: "\"Até aos poderosos arrasta com a sua força\" (Jó 24:22), e o remate: \"Por um pouco se exaltam, e logo desaparecem; são abatidos, encerrados como todos os demais; e cortados como as cabeças das espigas\" (24:24). Depois de vinte versículos de denúncia social, Jó fecha com o único consolo que consegue formular: o grande também cai — mas repare em quando. Não cai no meio do crime; cai depois, como todos os demais. É o que os amigos não aceitam: querem uma queda que se veja e que ensine. Jó concede a queda e recusa o calendário (cf. Sl 37:1-2)."
    },
    homem: {
      title: "Os pobres que saem à obra como jumentos monteses, os nus que passam a noite sem roupa, os que levam os molhos e têm fome, os que pisam os lagares e têm sede — e o homicida de madrugada, o adúltero do crepúsculo e o que mina as casas nas trevas",
      subtitle: "Jó 24:2-17 • o capítulo mais social da Bíblia poética, um quadro por versículo",
      text: "Jó abre com a pergunta de fundo (24:1) e responde com um inventário do mundo tal como funciona. Do lado das vítimas: \"como jumentos monteses no deserto, saem à sua obra\" (24:5); \"ao nu fazem passar a noite sem roupa... abraçam-se com as rochas\" (24:7-8); e o verso mais amargo, \"pisam os lagares, e ainda têm sede\" (24:11) — fazem o vinho do mundo inteiro e passam sede. Do lado dos que fazem: o homicida de madrugada (24:14), o adúltero do crepúsculo (24:15), os que minam casas nas trevas (24:16). Nada disto está no discurso dos amigos, e é tudo verdade."
    },
    mulherComum: {
      title: "A viúva cujo boi tomam em penhor, a mãe de quem arrancam o orfãozinho dos peitos, a molhada das chuvas das montanhas que se abraça com a rocha e a estéril a quem o ímpio aflige",
      subtitle: "Jó 24:3-21 • as mulheres do inventário, uma por crime",
      text: "\"Do órfão levam o jumento; tomam em penhor o boi da viúva\" (Jó 24:3) — o boi era o arado, e tirá-lo a uma viúva é tirar-lhe a próxima colheita. Depois: \"Ao orfãozinho arrancam dos peitos\" (24:9), a criança de colo levada como garantia de dívida. A terceira é a das encostas, que \"não tendo refúgio, abraçam-se com as rochas\" (24:8). E a última é a que ninguém defende: \"Aflige à estéril que não dá à luz, e à viúva não faz bem\" (24:21) — as duas sem quem as reclame, e por isso postas pela Lei sob a guarda direta de Deus (Êx 22:22-24)."
    },
    rebanho: {
      title: "O rebanho roubado que os ímpios apascentam",
      subtitle: "Jó 24:2 • gado furtado a pastar tranquilamente no pasto de outro",
      text: "\"Até os limites removem; roubam os rebanhos, e os apascentam\" (Jó 24:2). São duas ações num verso, e a segunda faz o retrato: não basta roubar o gado — depois levam-no a pastar à vista de todos, com a naturalidade de dono. O crime começa numa pedra fora do lugar: o marco de divisa, cuja remoção a Lei amaldiçoa em público (Dt 27:17), justamente por ser um roubo silencioso que muda a terra de dono para sempre. O que Jó denuncia não é a violência espetacular: é a impunidade tranquila. E é isso que o capítulo cobra (24:1)."
    },
    servo: {
      title: "O órfão de quem levam o jumento, o orfãozinho arrancado dos peitos, o que espreme o azeite dentro das paredes do ímpio e o filho do pobre a quem a campina dá mantimento",
      subtitle: "Jó 24:3-11 • os pequenos do inventário, que trabalham e não comem",
      text: "\"Do órfão levam o jumento\" (Jó 24:3): não é bicho de estimação, é a única força de trabalho que um menino sem pai podia ter. \"Ao orfãozinho arrancam dos peitos\" (24:9) — penhor humano, criança de colo tomada por dívida. \"pisam os lagares, e ainda têm sede\" (24:11): o trabalhador dentro da propriedade do rico, a fabricar aquilo que lhe falta. E o filho do pobre, a quem \"a campina dá mantimento\" (24:5) — não o senhor, não o salário: a campina. Toda esta gente está dentro da economia e fora da mesa, e quem a põe no palco é o antigo grande da região (cf. 31:13-15)."
    }
  },

  // ----------------------------------------------------------------- Jó 25
  25: {
    homem: {
      title: "O nascido de mulher que não seria puro, e o homem que é um verme",
      subtitle: "Jó 25:4-6 • o discurso mais curto do livro, e o sinal de que o debate acabou",
      text: "Bildade fala pela terceira e última vez e gasta seis versículos — depois disto nenhum dos três volta a abrir a boca. É o sinal de que os argumentos se esgotaram: em vez de responder à denúncia social do capítulo 24, recua para a distância entre Deus e o homem. \"o homem, que é um verme, e o filho do homem, que é um vermezinho!\" (Jó 25:6). Cada frase é verdadeira e nenhuma responde à pergunta: Jó nunca disse que era puro diante de Deus, disse que não fizera o que lhe imputavam. Reduzir um homem a verme é um modo eficaz de não o ouvir (cf. Sl 22:6)."
    },
    mulherComum: {
      title: "A mulher de quem nasce o que não seria puro",
      subtitle: "Jó 25:4 • a mãe que Bildade põe no argumento pela terceira vez no livro",
      text: "\"Como seria puro aquele que nasce de mulher?\" (Jó 25:4). É a terceira vez que a frase é usada nestes catorze capítulos (14:1; 15:14), e agora Bildade fecha com ela o debate inteiro. A cena põe a mulher com o filho à porta da tenda, e é bom que ela esteja em cena: o argumento fala dela sem nunca a olhar. Não há acusação nenhuma a esta mãe; ela é o elo por onde a impureza supostamente entra. A Escritura conhece a verdade da frase (Sl 51:5) e o seu limite: \"nascido de mulher\" é como Paulo descreve a vinda do Filho (Gl 4:4)."
    }
  },

  // ----------------------------------------------------------------- Jó 26
  26: {
    anciao: {
      title: "Aquele que não tinha sabedoria, a quem Bildade aconselhou",
      subtitle: "Jó 26:3 • a ironia com que Jó agradece o discurso de seis versículos",
      text: "\"Como aconselhaste aquele que não tinha sabedoria, e plenamente fizeste saber a causa, assim como era?\" (Jó 26:3). É sarcasmo puro, e é raro no livro: Jó agradece a Bildade um conselho que não recebeu. A cena desenha exatamente o que não aconteceu — o rolo aberto, a lamparina acesa, e o assento vazio de quem devia estar ali a ensinar. A resposta dele às três palestras é começar, dois versículos depois, o hino mais alto do livro (26:6-7) e fechá-lo com \"eis que isto são apenas as orlas dos seus caminhos\" (26:14). Quem fala assim não precisava do curso."
    },
    homem: {
      title: "Aquele que não tinha força, a quem Bildade diz ter ajudado, e os mortos que tremem debaixo das águas",
      subtitle: "Jó 26:2,5 • o socorro que não houve, e o que existe no fundo do mar",
      text: "\"Como ajudaste aquele que não tinha força, e sustentaste o braço que não tinha vigor?\" (Jó 26:2) — e a cena põe no pátio o homem caído, sem ninguém a segurá-lo: o auxílio de Bildade desenhado como não aconteceu. Logo depois o capítulo desce ao lugar mais fundo que a poesia hebraica conhece: \"Os mortos tremem debaixo das águas, com os seus moradores\" (26:5). E o ponto de Jó é que nem ali há esconderijo (26:6; cf. Sl 139:8). Ele conhece o alcance de Deus melhor do que quem o usa para o esmagar — e é isso que torna a sua situação insuportável."
    },
    servo: {
      title: "O braço sem vigor que ninguém sustentou e o morador das águas que treme com os mortos",
      subtitle: "Jó 26:2,5 • as duas figuras do capítulo do hino cósmico",
      text: "As duas pontas do capítulo, e é uma queda enorme entre elas. A primeira é doméstica e irônica: um homem desfalecido no chão de um pátio, o \"braço que não tinha vigor\" a quem Bildade se gaba de ter sustentado (Jó 26:2). A segunda é cósmica: \"os mortos tremem debaixo das águas, com os seus moradores\" (26:5) — os habitantes do fundo, presos debaixo do oceano e visíveis a Deus como se não houvesse água por cima. Entre uma e outra está tudo o que o capítulo faz: mostrar que quem veio dar lições sobre a grandeza de Deus não sabe do que fala (26:14)."
    }
  },

  // ----------------------------------------------------------------- Jó 27
  27: {
    homem: {
      title: "O ímpio que amontoa prata como pó, o rico que se deita e não será recolhido, o hipócrita avaro a quem Deus arranca a alma, o justo que vestirá as roupas do ímpio — e o inimigo que Jó deseja que seja como o perverso",
      subtitle: "Jó 27:7-23 • Jó jura pela sua integridade e depois usa a doutrina dos amigos contra eles",
      text: "O capítulo abre com o juramento mais firme do livro: \"até que eu expire, nunca apartarei de mim a minha integridade\" (Jó 27:5). Só então ele descreve a sorte do ímpio — e a surpresa é que a descrição é dura como a de Zofar. A diferença é o uso: Jó aceita que o mau acaba mal, e recusa apenas ler para trás, a partir da dor de um homem. Em cena: o avarento cujo clamor não será ouvido (27:8-9), o que amontoa prata e outro a veste (27:16-17), o rico da última noite (27:19). E a casa que ele edifica \"como a traça\" (27:18), barraca de uma estação."
    },
    mulherComum: {
      title: "A viúva do ímpio, que não chorará",
      subtitle: "Jó 27:15 • o enterro sem pranto, que é o pior enterro possível",
      text: "\"Os que ficarem dele na morte serão enterrados, e as suas viúvas não chorarão\" (Jó 27:15). No mundo do livro, o pranto no funeral não era sentimento privado: era ofício e era honra — havia carpideiras e dias contados de luto, e não ter quem chorasse era a marca de um fim maldito (cf. Jr 22:18-19). A dureza do quadro está no que falta nele: a cova aberta e ninguém em volta. A mulher aqui é viúva de um homem por quem não tem lágrima — o que diz da casa em que viveu mais do que qualquer acusação. O contraste com Jó é deliberado (42:16-17)."
    },
    multidao: {
      title: "A gente que bate palmas e assobia contra o ímpio",
      subtitle: "Jó 27:23 • o último quadro do debate, e a única multidão que cabe nele",
      text: "\"Cada um baterá palmas contra ele e assobiará tirando-o do seu lugar\" (Jó 27:23). É o versículo que fecha o discurso, e a multidão cabe aqui porque o texto diz que se batem palmas — só que não é aplauso: no Oriente antigo bater palmas e assobiar era vaia, o gesto público de expulsar alguém da comunidade (Lm 2:15; Sf 2:15). O quadro é a praça no dia seguinte, com o homem a sair pelo seu pé enquanto a cidade o despede assim. E dá espessura à cena lembrar quem a descreve: um homem que virou \"provérbio dos povos\" (17:6) e já ouviu esse assobio."
    },
    rei: {
      title: "O tirano que recebe a herança do Todo-Poderoso",
      subtitle: "Jó 27:13 • a porção do homem ímpio, entregue de mão beijada",
      text: "\"Esta, pois, é a porção do homem ímpio da parte de Deus, e a herança, que os tiranos receberão do Todo-Poderoso\" (Jó 27:13). Jó usa aqui, palavra por palavra, a linguagem com que Zofar fechara o discurso dele (20:29), e é de propósito: devolve aos amigos a fórmula deles. O que se vê é a herança posta no chão como espólio a repartir. Este rei não conquistou nada; recebeu — e o inventário que se segue é todo de perdas (27:14-20). A diferença entre Jó e Zofar não está na descrição do fim do ímpio: está em recusar ler a vida de um homem de trás para a frente."
    },
    servo: {
      title: "O filho do ímpio que é para a espada, o guarda da vinha que faz a cabana e o inocente que repartirá a prata",
      subtitle: "Jó 27:14-18 • os três figurantes da herança que ninguém quer",
      text: "\"Se os seus filhos se multiplicarem, será para a espada\" (Jó 27:14) — o primeiro é o filho contado como carne de guerra, num verso em que a fecundidade deixa de ser bênção. O segundo dá nome ao capítulo: \"edificará a sua casa como a traça, e como o guarda que faz a cabana\" (27:18). O guarda da vinha é gente real do calendário agrícola: arma-se uma barraca de ramos até à vindima e depois desmancha-se (cf. Is 1:8). É esse o tamanho da casa do ímpio: uma temporada. O terceiro é o herdeiro que ele não escolheu: \"o justo as vestirá\" (27:17; cf. Pv 13:22)."
    }
  },

  // ----------------------------------------------------------------- Jó 28
  28: {
    anciao: {
      title: "O ancião da terra dos viventes que a procurou e não a achou",
      subtitle: "Jó 28:12-13 • o velho que passou a vida a procurar e volta de mãos vazias",
      text: "\"Porém onde se achará a sabedoria... O homem não conhece o seu valor, e nem ela se acha na terra dos viventes\" (Jó 28:12-13). Este ancião é a resposta em pessoa à primeira metade do poema: o homem sabe achar a veia da prata debaixo de trezentos metros de pedra — e não sabe onde está a sabedoria. A engenharia chega ao fundo da terra; ela não está lá. A \"terra dos viventes\" é o mundo dos vivos, com toda a sua experiência acumulada, e o poema diz duas vezes que ali ela não se acha (28:13,21). Só há um lugar de onde vem: \"Deus entende o seu caminho\" (28:23)."
    },
    homem: {
      title: "Os mineiros do poema: o que põe fim às trevas, o que pende e oscila longe dos homens, o que revolve os montes desde as raízes, o que faz sair rios dos rochedos, o que acha o lugar da safira — e a Perdição e a Morte, que só ouviram a fama",
      subtitle: "Jó 28:3-22 • o capítulo mais desenhável do livro, e o mais antigo relato técnico de mineração da Escritura",
      text: "A primeira metade do poema é engenharia pura, e é espantosa pela data: \"Abre um poço de mina longe dos homens, em lugares esquecidos do pé; ficando pendentes longe dos homens, oscilam de um lado para outro\" (Jó 28:3-4) — o mineiro suspenso numa corda dentro de um poço vertical. Segue-se o corte transversal (28:5), a força bruta que \"revolve os montes desde as suas raízes\" (28:9) e a hidráulica que desvia o curso da água (28:10-11). Ele chega onde nenhum bicho chega (28:7-8). E mesmo assim não acha o que procura: nem a Perdição e a Morte a têm (28:22)."
    },
    mulherComum: {
      title: "A moradora da terra dos viventes que não conhece o valor da sabedoria e a que traz o coral e as pérolas à mesa do avaliador",
      subtitle: "Jó 28:13-18 • a cidade cheia de gente, e a sabedoria não está ali",
      text: "\"O homem não conhece o seu valor, e nem ela se acha na terra dos viventes\" (Jó 28:13). A primeira destas mulheres é a cidade inteira em figura: a porta, a banca com as romãs, gente a comprar e a vender — toda esta vida, e o que se procura não está aqui. A segunda entra no inventário do avaliador com a mercadoria mais fina do mundo antigo: \"não se fará menção de coral nem de pérolas\" (28:18). O poema soma o tesouro de uma corte inteira (28:15-19) e não compra uma grama do que se busca — a economia de Pv 3:14-15 e da pérola de Mt 13:45-46."
    },
    rei: {
      title: "O avaliador que pesa o ouro e a prata por ela",
      subtitle: "Jó 28:15-19 • o homem da balança diante da única coisa que não tem preço",
      text: "\"Não se dará por ela ouro fino, nem se pesará prata em troca dela\" (Jó 28:15). Esta figura é a autoridade do mercado: quem determina o valor das coisas, com a balança na mão e o tesouro na mesa. O poema põe diante dele tudo o que se podia pôr — ônix, safira, ouro de Ofir, topázio da Etiópia (28:16-19) — e o homem da balança não consegue formar um preço. Reunir isto numa mesa é reunir o poder de compra do mundo, e o poema declara-o insuficiente. É aqui que o capítulo dá a volta: se não se compra, tem de ser dado (28:23)."
    },
    servo: {
      title: "O fundidor que refina o ouro, o ferreiro que funde o cobre da pedra, o lavrador de cuja terra procede o pão, e os que trazem o ônix e a safira de Ofir, o topázio da Etiópia e a joia de ouro fino",
      subtitle: "Jó 28:1-19 • os ofícios do poema, do fundo da mina à mesa do avaliador",
      text: "\"Na verdade, há veios de onde se extrai a prata, e lugar onde se refina o ouro. O ferro tira-se da terra, e da pedra se funde o cobre\" (Jó 28:1-2). O poema começa por uma cadeia de trabalho, e cada elo tem a sua figura: o fundidor que separa o metal da escória — a operação que Jó usara para falar de si (23:10) —, o ferreiro do cobre, o lavrador que ara por cima da galeria (28:5) e os que põem na mesa do avaliador o ônix e o ouro de Ofir (28:16-19). É a economia inteira de um mundo, montada em vinte versículos para dizer que nada dali serve (28:20,28)."
    }
  }
};
