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
    homem: {
      title: "O cortesão de Faraó e os feitores do Egito",
      subtitle: "Êxodo 1 • os homens que impõem o jugo",
      text: "São os homens do novo rei que não conhecera a José: a corte a quem Faraó diz \"Eis que o povo dos filhos de Israel é muito, e mais poderoso do que nós\" (Êx 1:9), e os \"maiorais de tributos\" postos sobre Israel para os afligir com suas cargas (Êx 1:11). São eles que fazem servir os hebreus \"com dureza\", amargando-lhes a vida em barro, em tijolos e em todo o trabalho no campo (Êx 1:13-14). A Escritura não lhes dá nome: são o rosto anônimo de um império que teme a bênção de Deus e tenta sufocá-la pela força.",
    },
    patriarca: {
      title: "Jacó, que desceu ao Egito",
      subtitle: "Êxodo 1 • o pai das setenta almas",
      text: "É Israel, o patriarca com quem os filhos \"entraram no Egito\", \"cada um entrou com sua casa\" (Êx 1:1). Dos seus lombos procederam setenta almas, e ali morrem ele, José e toda aquela geração (Êx 1:5-6). Sua descida abre o livro: a família da promessa entra no Egito como hóspede e ali se tornará nação, exatamente como Deus dissera a Abraão sobre os quatrocentos anos em terra alheia (Gn 15:13-14).",
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
    homem: {
      title: "Anrão e os homens que cercam o menino Moisés",
      subtitle: "Êxodo 2 • do lar levita ao poço de Midiã",
      text: "É primeiro \"um homem da casa de Levi\" que casa com uma filha de Levi — Anrão, pai de Moisés (Êx 2:1; Êx 6:20). Depois é o egípcio que fere um hebreu e cai morto na areia, e os dois hebreus contendores, um dos quais retruca: \"Quem te tem posto a ti por maioral e juiz sobre nós?\" (Êx 2:13-14). Por fim é Reuel, o sacerdote de Midiã, que manda chamar o forasteiro para comer pão (Êx 2:20). Entre esses homens Deus vai formando, em silêncio e em rejeição, o libertador do seu povo.",
    },
    mulherComum: {
      title: "As mulheres que salvaram Moisés",
      subtitle: "Êxodo 2 • a arca entre os juncos",
      text: "São Joquebede, a mãe levita que esconde o menino três meses e o põe na arca de juncos à margem do rio (Êx 2:2-3); Miriã, a irmã que \"postou-se de longe, para saber o que lhe havia de acontecer\" (Êx 2:4); e a filha de Faraó, que se move de compaixão e o adota, chamando-lhe Moisés, \"porque das águas o tenho tirado\" (Êx 2:10). Adiante está Zípora, filha de Reuel, dada por mulher ao peregrino em Midiã (Êx 2:21). Contra o decreto que condenava os meninos ao rio, Deus usa a coragem de mulheres para guardar o salvador de Israel.",
    },
    pastor: {
      title: "Os pastores do poço de Midiã",
      subtitle: "Êxodo 2 • os que expulsam as filhas de Reuel",
      text: "São os pastores que chegam ao poço e expulsam dali as sete filhas do sacerdote de Midiã, depois que elas encheram os bebedouros para o rebanho do pai (Êx 2:16-17). Moisés levanta-se, defende as moças e dá de beber ao rebanho, e elas o descrevem como \"um homem egípcio\" que as livrou \"da mão dos pastores\" (Êx 2:19). A prepotência desses homens sem nome é a ocasião em que o futuro pastor de Israel exerce, já longe do Egito, a justiça que defende o fraco.",
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
    homem: {
      title: "Os exatores de Faraó e os oficiais hebreus",
      subtitle: "Êxodo 5 • os tijolos sem palha",
      text: "São, de um lado, \"os exatores do povo\" a quem Faraó ordena não dar mais palha sem diminuir a conta dos tijolos (Êx 5:6-8), e que apertam Israel dizendo: \"Acabai vossa obra, a tarefa de cada dia, como quando havia palha\" (Êx 5:13). De outro, os oficiais dos filhos de Israel, postos sobre os seus irmãos, que são açoitados e clamam a Faraó: \"Por que fazes assim a teus servos?\" (Êx 5:14-15). Entre o opressor e o oprimido, esses homens sem nome mostram como a servidão esmaga — e como o povo ferido acaba acusando o próprio libertador (Êx 5:21).",
    },
  },
  6: {
    multidao: {
      title: "Israel angustiado de espírito",
      subtitle: "Êxodo 6 • o povo que não ouve por dura servidão",
      text: "São os filhos de Israel a quem Moisés anuncia as grandes promessas do \"EU SOU O SENHOR\": tirar, livrar, resgatar, tomar por povo e introduzir na terra (Êx 6:6-8). Mas \"eles não ouviram a Moisés, por causa da angústia de espírito e da dura servidão\" (Êx 6:9). O peso do cativeiro sufoca até a fé, e a redenção terá de repousar na palavra de Deus, não no ânimo do povo.",
    },
    mulherComum: {
      title: "Eliseba, mulher de Arão",
      subtitle: "Êxodo 6 • a genealogia do sacerdócio",
      text: "É Eliseba, \"filha de Aminadabe, irmã de Naasson\", que Arão tomou por mulher e que lhe deu Nadabe, Abiú, Eleazar e Itamar (Êx 6:23). No meio da lista das casas paternas, ela é a mãe do primeiro sacerdócio de Israel, e do seu filho Eleazar virá Finéias, cabeça dos pais dos levitas (Êx 6:25). O registro sóbrio do seu nome mostra que a redenção de Deus caminha por famílias concretas e se cumpre em gerações.",
    },
  },
  7: {
    multidao: {
      title: "Os exércitos do Senhor no Egito",
      subtitle: "Êxodo 7 • o povo por quem Deus contende",
      text: "É Israel, que o Senhor chama \"meus exércitos, meu povo, os filhos de Israel\", e que promete tirar do Egito \"com grandes juízos\" (Êx 7:4). Ainda escravos, permanecem em Gósen enquanto Moisés e Arão confrontam Faraó com a vara que vira serpente e as águas que viram sangue. O povo é o alvo da libertação: as pragas começam para que \"os egípcios saibam que eu sou o Senhor\" (Êx 7:5).",
    },
    homem: {
      title: "Os magos do Egito e os servos de Faraó",
      subtitle: "Êxodo 7 • a vara que traga as varas",
      text: "São os sábios, encantadores e magos que Faraó chama, e que \"fizeram também o mesmo com os seus encantamentos\", lançando cada um a sua vara, que se tornou em serpente (Êx 7:11-12). Mas \"a vara de Arão tragou as varas deles\", e diante dos olhos deles e dos servos do rei as águas do Nilo se tornam em sangue (Êx 7:12,20). Esses homens anônimos são a corte de um poder falso: sabem imitar o sinal, jamais desfazê-lo — e o seu prodígio é engolido pelo do Senhor.",
    },
  },
  8: {
    multidao: {
      title: "O povo separado em Gósen",
      subtitle: "Êxodo 8 • Israel poupado das pragas",
      text: "É Israel, a quem Deus faz \"separação entre o meu povo e o teu povo\", livrando a terra de Gósen dos enxames de moscas (Êx 8:22-23). Em meio às pragas do Egito, o povo da aliança vive sob proteção distinta, \"para que saibas que eu sou o Senhor no meio desta terra\". Essa separação prefigura o povo remido, guardado do juízo que cai sobre o mundo.",
    },
    homem: {
      title: "Os magos vencidos pelo dedo de Deus",
      subtitle: "Êxodo 8 • as rãs, os piolhos e os enxames",
      text: "São os mesmos magos do Egito, que ainda conseguem fazer subir rãs sobre a terra com os seus encantamentos (Êx 8:7), mas que diante dos piolhos \"não puderam\" e confessam a Faraó: \"Isto é o dedo de Deus\" (Êx 8:18-19). Com eles estão os servos do rei, sobre cujas casas caem os grandes enxames de moscas de que Gósen é poupada (Êx 8:21-24). A rendição dos sábios do Egito é o primeiro reconhecimento, em terra pagã, de que quem governa ali é o Senhor, e não Faraó.",
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
    homem: {
      title: "Os magos feridos e os servos de Faraó",
      subtitle: "Êxodo 9 • a sarna, a peste e a saraiva",
      text: "São os magos que \"não podiam parar diante de Moisés, por causa da sarna\", porque as úlceras arrebentaram neles como em todos os egípcios (Êx 9:11). São também os cortesãos diante do aviso do granizo: \"quem dos servos de Faraó temia a palavra do Senhor, fez fugir os seus servos e o seu gado para as casas\", e quem não a considerou os deixou no campo para morrer (Êx 9:20-21). Aqui a palavra de Deus já divide corações dentro do próprio Egito: o temor guarda a vida, o desprezo a perde.",
    },
  },
  10: {
    multidao: {
      title: "O povo com luz nas trevas",
      subtitle: "Êxodo 10 • Israel na praga das trevas",
      text: "É Israel, sobre quem, mesmo nas trevas que se apalpavam por três dias em todo o Egito, \"todos os filhos de Israel tinham luz em suas habitações\" (Êx 10:23). Faraó tenta reter o gado do povo, mas Moisés responde que \"nem uma unha ficará\" (Êx 10:26). A luz no meio da escuridão anuncia o povo que anda na presença de Deus enquanto o juízo cega os rebeldes.",
    },
    homem: {
      title: "Os servos de Faraó que pedem trégua",
      subtitle: "Êxodo 10 • a corte diante do Egito arruinado",
      text: "São os cortesãos que, depois de sete pragas e diante da ameaça dos gafanhotos, ousam dizer ao próprio rei: \"Até quando este homem nos há de ser por laço? Deixa ir os homens, para que sirvam ao Senhor seu Deus; ainda não sabes que o Egito está destruído?\" (Êx 10:7). O conselho é ouvido pela metade, e logo Moisés e Arão são expulsos da presença de Faraó (Êx 10:11). Até os servos do opressor enxergam o que o coração endurecido do rei recusa ver: o juízo de Deus é evidente a todos, menos a quem se obstina.",
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
    anciao: {
      title: "Os anciãos de Israel na noite da Páscoa",
      subtitle: "Êxodo 12 • os que recebem a ordem do cordeiro",
      text: "São \"todos os anciãos de Israel\" que Moisés chama para dizer-lhes: \"Escolhei e tomai vós cordeiros para vossas famílias, e sacrificai a páscoa\" (Êx 12:21). Deles depende que cada casa molhe o molho de hissopo no sangue da bacia e o passe na verga e nas ombreiras, e que nenhum saia da porta até a manhã (Êx 12:22). Como cabeças das famílias, são os primeiros ministros do rito que salva Israel: a fé da aliança se transmite por pais que obedecem em favor dos seus.",
    },
    homem: {
      title: "Os egípcios na noite dos primogênitos",
      subtitle: "Êxodo 12 • o clamor e a expulsão de Israel",
      text: "É o Egito ferido à meia-noite, \"desde o primogênito de Faraó, que se sentava em seu trono, até ao primogênito do cativo que estava no cárcere\" (Êx 12:29), e o clamor que sobe da terra \"porque não havia casa em que não houvesse um morto\" (Êx 12:30). São esses mesmos egípcios que apertam o povo, \"apressando-se para lançá-los da terra\", e que lhes dão prata, ouro e roupas (Êx 12:33,36). O juízo que atinge a casa sem sangue mostra o preço da redenção: onde não morre o cordeiro, morre o primogênito.",
    },
    mulherComum: {
      title: "A hebreia que sai com a massa aos ombros",
      subtitle: "Êxodo 12 • as mulheres da partida às pressas",
      text: "É uma das mulheres de Israel que \"tomou a sua massa, antes que levedasse\", com as amassadeiras atadas em suas roupas sobre os ombros (Êx 12:34). É ela que pede ao vizinho egípcio jóias de prata, jóias de ouro e roupas, e recebe o que pede, porque \"o Senhor deu ao povo graça aos olhos dos egípcios\" (Êx 12:35-36), e que depois coze bolos ázimos, pois não houve tempo de preparar comida (Êx 12:39). A Escritura não lhe dá o nome: ela é a casa de Israel inteira saindo, de lombos cingidos, da terra da servidão.",
    },
  },
  13: {
    multidao: {
      title: "Israel guiado pela coluna",
      subtitle: "Êxodo 13 • o povo que sai da casa da servidão",
      text: "É a multidão de Israel a quem Moisés ordena: \"Lembrai-vos deste mesmo dia, em que saístes do Egito, da casa da servidão\" (Êx 13:3), consagrando ao Senhor todo primogênito. Deus não os leva pelo caminho mais curto, mas rodeia pelo deserto, indo adiante deles \"de dia numa coluna de nuvem\" e \"de noite numa coluna de fogo\" (Êx 13:21). O povo redimido caminha sob a presença visível de Deus que nunca se afasta dele.",
    },
    homem: {
      title: "O pai israelita e o seu primogênito",
      subtitle: "Êxodo 13 • \"farás saber a teu filho\"",
      text: "São o chefe de casa que acaba de ser poupado pelo sangue da porta e o filho mais velho que só está vivo porque outro morreu em seu lugar. A festa dos ázimos é entregue às mãos dele: sete dias sem levedura, e \"o levedado não se verá contigo em todos os teus termos\" (Êx 13:7). Mas o culto não termina no rito — termina na catequese: \"naquele mesmo dia farás saber a teu filho\", e quando o menino perguntar \"Que é isto?\", o pai responderá com a história da redenção (Êx 13:8,14).",
    },
    mulherComum: {
      title: "A mãe de casa nos dias dos ázimos",
      subtitle: "Êxodo 13 • o fermento varrido de todos os termos",
      text: "É a israelita que faz o pão da sua casa e que, por sete dias, o faz sem fermento algum, porque \"nem ainda fermento será visto em todos os teus termos\" (Êx 13:7). A pressa da saída, quando não houve tempo de levedar a massa (Êx 12:34,39), virou estatuto perpétuo: a casa inteira é vasculhada e limpa. Nela se vê que a redenção alcança o mais doméstico da vida — a massa, a mesa, a despensa —, e que o povo remido é chamado a tirar de si o velho fermento (1Co 5:7-8).",
    },
    rebanho: {
      title: "Os primogênitos do gado e o cordeiro do resgate",
      subtitle: "Êxodo 13 • \"tudo o que abrir a madre\"",
      text: "São as crias que a lei separa para o Senhor: \"todo o primogênito dos animais que tiveres; os machos serão do Senhor\" (Êx 13:12). O jumento, animal imundo que não podia subir ao altar, tem um substituto — \"todo o primogênito da jumenta resgatarás com um cordeiro\" (Êx 13:13) —, e o mesmo princípio cobre o filho do homem, que também é resgatado. O curral prega assim o evangelho todas as manhãs: o que é do Senhor por direito, ou lhe é entregue, ou é remido pela morte de um cordeiro em seu lugar (1Pe 1:18-19).",
    },
  },
  14: {
    mulherComum: {
      title: "As mulheres de Israel encurraladas no mar",
      subtitle: "Êxodo 14 • o povo entre o exército do Egito e a água",
      text: "Saíram do Egito \"com mão levantada\" (Êx 14:8) e em poucos dias se viram sem saída: o mar à frente, os carros de Faraó atrás. São elas que carregam as crianças na fuga e que ouvem a acusação amarga sair do meio do próprio povo: \"não é melhor que sirvamos aos egípcios do que morrermos no deserto?\" (Êx 14:12). A resposta de Moisés é dirigida também a elas — \"não temais; estai quietos e vede o livramento do Senhor\" (Êx 14:13) — e do outro lado da água será Miriã, com os tamboris, quem primeiro cantará (Êx 15:20-21).",
    },
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
    homem: {
      title: "Os servos de Faraó que aconselham a perseguição",
      subtitle: "Êxodo 14 • o arrependimento no palácio",
      text: "São os oficiais da corte cujo coração, junto com o do rei, \"mudou-se... contra o povo\" quando lhes anunciaram que Israel fugia, e que dizem: \"Por que fizemos isso, havendo deixado ir a Israel, para que não nos sirva?\" (Êx 14:5). Deles saem os seiscentos carros escolhidos, todos os carros do Egito e os capitães postos sobre eles (Êx 14:7). O lamento pela mão de obra perdida revela o coração da escravidão — o homem só vale pelo que produz — e é por isso que todo esse poder afundará no mar.",
    },
  },
  15: {
    multidao: {
      title: "Israel cantando a vitória",
      subtitle: "Êxodo 15 • o cântico do mar",
      text: "É a multidão redimida que, após a passagem do mar, canta com Moisés: \"Cantarei ao Senhor, porque gloriosamente triunfou; lançou no mar o cavalo e o seu cavaleiro\" (Êx 15:1). Miriã e todas as mulheres respondem com tamboris e danças (Êx 15:20-21). Este primeiro louvor de Israel liberto celebra o Deus que é \"homem de guerra\" (Êx 15:3) e antecipa o cântico dos remidos diante do trono (Ap 15:3).",
    },
    mulherComum: {
      title: "Miriã, a profetisa, e as mulheres com tamboris",
      subtitle: "Êxodo 15 • a dança na praia do mar",
      text: "É Miriã, \"a profetisa, a irmã de Arão\", que toma o tamboril na sua mão, e \"todas as mulheres saíram atrás dela com tamboris e com danças\" (Êx 15:20). Ela responde ao cântico entoando: \"Cantai ao Senhor, porque gloriosamente triunfou; e lançou no mar o cavalo com o seu cavaleiro\" (Êx 15:21). A menina que velou de longe pela arca de juncos (Êx 2:4) conduz agora o primeiro coro do povo remido: o louvor é a resposta natural de quem foi salvo de graça.",
    },
  },
  16: {
    mulherComum: {
      title: "As mulheres que recolhiam o maná cada manhã",
      subtitle: "Êxodo 16 • um gômer por cabeça, cada dia",
      text: "Quando o orvalho subia, ficava sobre a terra \"uma coisa miúda, redonda, miúda como a geada\" (Êx 16:14), e a casa inteira saía a recolher, \"um gômer por cabeça\" (Êx 16:16). Eram elas que mediam, moíam, cozinhavam e guardavam, e que descobriram na prática as duas regras do pão do céu: o que se guardava para o dia seguinte \"criava bichos e cheirava mal\" (Êx 16:20), mas o que se preparava na véspera do sábado amanhecia intacto (Êx 16:24). O sabor ficou registrado por elas: \"como bolos de mel\" (Êx 16:31).",
    },
    homem: {
      title: "Os filhos de Israel murmurando por pão no deserto de Sim",
      subtitle: "Êxodo 16 • um mês depois do mar, a fome",
      text: "\"E toda a congregação dos filhos de Israel murmurou contra Moisés e contra Arão no deserto\" (Êx 16:2), e a queixa tem a nostalgia distorcida de quem esqueceu o jugo: \"quando estávamos sentados junto às panelas de carne, quando comíamos pão até fartar\" (Êx 16:3). Eram escravos, e lembram do Egito como fartura. Moisés lhes devolve a medida exata: \"as vossas murmurações não são contra nós, mas sim contra o Senhor\" (Êx 16:8). E o maná vem na porção de cada dia, \"para que eu o prove se anda em minha lei ou não\" (Êx 16:4).",
    },
    multidao: {
      title: "O povo faminto que recebe o maná",
      subtitle: "Êxodo 16 • a murmuração e o pão do céu",
      text: "É toda a congregação de Israel que, no deserto de Sim, murmura contra Moisés e Arão, lembrando \"as panelas de carne\" do Egito (Êx 16:3). O Senhor responde fazendo \"chover pão dos céus\", o maná, e enviando codornizes, provando o povo se anda em sua lei (Êx 16:4). O pão do deserto, que apodrece se guardado e cessa no sábado, ensina a depender diariamente de Deus e prefigura o verdadeiro pão do céu (Jo 6:31-35).",
    },
    anciao: {
      title: "Os príncipes da congregação e o maná dobrado",
      subtitle: "Êxodo 16 • a véspera do sábado no deserto",
      text: "São \"todos os príncipes da congregação\" que, ao sexto dia, vendo o povo colher dois ômeres para cada um, vêm e o contam a Moisés (Êx 16:22). Deles Moisés recebe a palavra a transmitir: \"Amanhã é repouso, o santo sábado do Senhor\", e o que sobejar há de ser guardado sem criar bichos (Êx 16:23-24). Cabeças das casas paternas, são os primeiros a aprender o ritmo do descanso que Deus dá ao seu povo antes mesmo de o mandar do Sinai.",
    },
  },
  17: {
    mulherComum: {
      title: "As mulheres de Israel sem água em Refidim",
      subtitle: "Êxodo 17 • a sede que fez o povo contender com Moisés",
      text: "\"Não havia água para o povo beber\" (Êx 17:1), e num acampamento do deserto isso ameaça primeiro as crianças e quem as carrega. A queixa que sobe é concreta e desesperada: \"para nos matares de sede, a nós, e aos nossos filhos, e ao nosso gado?\" (Êx 17:3). Moisés clama ao Senhor porque teme ser apedrejado (Êx 17:4), e a água sai da rocha em Horebe diante dos anciãos. O lugar ficou com dois nomes que são uma acusação — Massá e Meribá, \"por causa da contenda dos filhos de Israel, e porque tentaram ao Senhor, dizendo: Está o Senhor no meio de nós, ou não?\" (Êx 17:7).",
    },
    multidao: {
      title: "O povo sedento em Refidim",
      subtitle: "Êxodo 17 • a contenda em Massá e Meribá",
      text: "É a multidão de Israel que, sem água em Refidim, contende com Moisés e tenta ao Senhor, dizendo: \"Está o Senhor no meio de nós, ou não?\" (Êx 17:7). Deus manda Moisés ferir a rocha em Horebe, e dela sai água para o povo beber (Êx 17:6). A rocha ferida que sacia os murmuradores é figura de Cristo, a Rocha espiritual que os seguia (1Co 10:4).",
    },
    anciao: {
      title: "Os anciãos de Israel diante da rocha",
      subtitle: "Êxodo 17 • as testemunhas em Horebe",
      text: "São \"alguns dos anciãos de Israel\" que o Senhor manda Moisés tomar consigo ao passar diante do povo sedento (Êx 17:5). Diante deles ele fere a rocha em Horebe e a água jorra — \"Moisés assim o fez, diante dos olhos dos anciãos de Israel\" (Êx 17:6). A sua função é ser testemunha oficial do milagre, para que Israel saiba que a água não veio da vara de um homem, mas do Deus que estava sobre a rocha (1Co 10:4).",
    },
    homem: {
      title: "Josué, Hur e o amalequita",
      subtitle: "Êxodo 17 • a batalha de Refidim",
      text: "São Josué, a quem Moisés diz \"Escolhe-nos homens, e sai, peleja contra Amaleque\" (Êx 17:9), e Hur, que com Arão sustenta as mãos do mediador, \"um de um lado e o outro do outro\", até que o sol se põe (Êx 17:12). Diante deles está Amaleque, o primeiro inimigo a atacar Israel recém-liberto, desfeito \"ao fio da espada\" (Êx 17:13). A vitória não pende da espada no vale, mas das mãos levantadas no outeiro: Israel prevalece enquanto o seu mediador intercede.",
    },
  },
  18: {
    multidao: {
      title: "O povo que busca juízo",
      subtitle: "Êxodo 18 • Israel diante do tribunal de Moisés",
      text: "É a multidão de Israel que se apinha diante de Moisés \"desde a manhã até à tarde\" para consultar a Deus e ser julgada segundo os seus estatutos (Êx 18:13-16). Vendo o peso, Jetro aconselha a nomear \"maiorais de mil, de cem, de cinqüenta e de dez\" (Êx 18:21). Nasce ali a estrutura de governo do povo de Deus, para que a justiça alcance a todos e o mediador não desfaleça.",
    },
    anciao: {
      title: "Os anciãos de Israel à mesa de Jetro",
      subtitle: "Êxodo 18 • o sacrifício no monte de Deus",
      text: "São \"todos os anciãos de Israel\" que, com Arão, vêm \"para comerem pão com o sogro de Moisés diante de Deus\", depois que Jetro tomou holocausto e sacrifícios (Êx 18:12). Os cabeças do povo recém-liberto sentam-se assim à mesa com um sacerdote midianita que acaba de confessar: \"Agora sei que o Senhor é maior que todos os deuses\" (Êx 18:11). É um vislumbre precoce das nações trazidas à comunhão do Deus de Israel.",
    },
    homem: {
      title: "Jetro, sacerdote de Midiã e sogro de Moisés",
      subtitle: "Êxodo 18 • o conselho no deserto",
      text: "É Jetro, que \"ouviu todas as coisas que Deus tinha feito a Moisés e a Israel seu povo\" e vem ao monte de Deus trazendo Zípora e os dois filhos, Gérson e Eliézer (Êx 18:1,5). Vendo Moisés julgar sozinho desde a manhã até a tarde, adverte-o: \"Não é bom o que fazes\", e o aconselha a pôr sobre o povo \"homens capazes, tementes a Deus, homens de verdade, que odeiem a avareza\" (Êx 18:13,17,21). Deus usa a sabedoria de um estrangeiro convertido para dar governo justo ao seu povo e poupar o seu mediador.",
    },
  },
  19: {
    multidao: {
      title: "Israel ao pé do Sinai",
      subtitle: "Êxodo 19 • o povo santificado diante da teofania",
      text: "É a multidão de Israel acampada em frente ao monte, chamada a ser \"a minha propriedade peculiar dentre todos os povos\" e \"um reino sacerdotal e o povo santo\" (Êx 19:5-6). O povo se santifica e lava as roupas para o terceiro dia, e treme diante dos trovões, relâmpagos e da nuvem espessa quando o Senhor desce em fogo (Êx 19:16-18). Ali Israel é constituído nação da aliança na presença tremenda de Deus.",
    },
    anciao: {
      title: "Os anciãos do povo ao pé do Sinai",
      subtitle: "Êxodo 19 • os primeiros a ouvir a proposta da aliança",
      text: "São \"os anciãos do povo\" que Moisés chama ao descer do monte, e diante de quem expõe \"todas estas palavras, que o Senhor lhe tinha ordenado\" (Êx 19:7). Por eles a proposta da aliança chega a todo o Israel, que responde a uma voz: \"Tudo o que o Senhor tem falado, faremos\" (Êx 19:8). Representantes das tribos, são os fiadores humanos do pacto que fará daquele povo de escravos \"um reino sacerdotal e o povo santo\" (Êx 19:6).",
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
    anciao: {
      title: "Os setenta anciãos que viram a Deus",
      subtitle: "Êxodo 24 • a subida ao monte",
      text: "São os \"setenta dos anciãos de Israel\" chamados a subir com Moisés, Arão, Nadabe e Abiú, para adorar de longe (Êx 24:1,9). Eles \"viram o Deus de Israel, e debaixo de seus pés havia como que uma pavimentação de pedra de safira\", e Deus não estendeu a mão sobre os escolhidos: \"viram a Deus, e comeram e beberam\" (Êx 24:10-11). É a refeição da aliança — sinal da comunhão que só o sangue aspergido (Êx 24:8) torna possível entre o Deus santo e pecadores.",
    },
    homem: {
      title: "Os jovens do altar e os que sobem com Moisés",
      subtitle: "Êxodo 24 • a ratificação da aliança",
      text: "São primeiro os \"jovens dos filhos de Israel\" que Moisés envia, e que \"ofereceram holocaustos e sacrificaram ao Senhor sacrifícios pacíficos de bezerros\" (Êx 24:5) — sangue que será aspergido sobre o altar e sobre o povo. São também Nadabe e Abiú, que sobem com os anciãos, e Josué, o servidor que acompanha Moisés ao monte de Deus, enquanto Arão e Hur ficam com o povo para julgar (Êx 24:9,13-14). Antes de haver sacerdócio consagrado, o culto de Israel passa por mãos jovens: a aliança começa no altar, com sangue derramado.",
    },
  },
  28: {
    homem: {
      title: "Os filhos de Arão revestidos para o santuário",
      subtitle: "Êxodo 28 • as vestes de glória e ornamento",
      text: "São Nadabe, Abiú, Eleazar e Itamar, tirados \"do meio dos filhos de Israel\" junto com o pai \"para me administrarem o ofício sacerdotal\" (Êx 28:1). Para eles Deus manda fazer túnicas, cintos e tiaras, \"para glória e ornamento\", e ordena ungi-los, consagrá-los e santificá-los (Êx 28:40-41). As vestes que os cobrem, \"para que não levem iniqüidade e morram\" (Êx 28:43), ensinam que ninguém se aproxima do Deus santo senão revestido de uma justiça que não é sua.",
    },
  },
  29: {
    homem: {
      title: "Os filhos de Arão na consagração",
      subtitle: "Êxodo 29 • lavados, vestidos e ungidos",
      text: "São os filhos de Arão que Moisés deve fazer chegar \"à porta da tenda da congregação\" e lavar com água, vestindo-lhes as túnicas para o sacerdócio (Êx 29:4,8). Põem as mãos sobre a cabeça do novilho e do carneiro, e recebem nas mãos o pão, o bolo azeitado e o coscorão do cesto dos ázimos, para movê-los diante do Senhor (Êx 29:10,23). Lavados, vestidos, ungidos e com as mãos cheias, retratam todo aquele que só pode servir a Deus depois de purificado e consagrado por um sacrifício alheio (Hb 7:26-27).",
    },
    rebanho: {
      title: "O novilho e os carneiros da consagração",
      subtitle: "Êxodo 29 • os animais sem mácula",
      text: "São o novilho e os \"dois carneiros sem mácula\" que Deus manda tomar para santificar os sacerdotes (Êx 29:1). Sobre a cabeça do novilho Arão e seus filhos põem as mãos, e a sua carne é queimada fora do arraial como \"sacrifício pelo pecado\" (Êx 29:10,14); os carneiros servem ao holocausto e ao rito da consagração. Somam-se a eles os dois cordeiros de um ano oferecidos \"cada dia, continuamente\" (Êx 29:38) — sangue que nunca acaba, até vir aquele que padeceu fora da porta uma só vez (Hb 13:11-12).",
    },
  },
  30: {
    multidao: {
      title: "Israel no arrolamento",
      subtitle: "Êxodo 30 • o resgate de meio siclo",
      text: "São os filhos de Israel que, ao serem contados, cada um dá \"o resgate da sua alma\", meio siclo do santuário, \"para que não haja entre eles praga alguma\" (Êx 30:12-13). Rico e pobre dão o mesmo, \"para fazer expiação por vossas almas\" (Êx 30:15), e o dinheiro serve à tenda da congregação. O preço igual do resgate ensina que toda alma pertence a Deus e só se aproxima dele por expiação.",
    },
  },
  31: {
    homem: {
      title: "Bezalel e Aoliabe, chamados por nome",
      subtitle: "Êxodo 31 • os artífices cheios do Espírito",
      text: "É Bezalel, \"o filho de Uri, filho de Hur, da tribo de Judá\", a quem o Senhor chamou por nome e a quem encheu \"do Espírito de Deus, de sabedoria, e de entendimento, e de ciência, em todo o lavor\" (Êx 31:2-3). Com ele está Aoliabe, filho de Aisamaque, da tribo de Dã, e todos os hábeis a cujo coração Deus deu sabedoria para fazer tudo quanto ordenara (Êx 31:6). É a primeira vez que a Escritura diz de alguém que foi cheio do Espírito — e é para lavrar ouro, pedra e madeira: a arte, posta a serviço do santuário, é dom de Deus.",
    },
  },
  32: {
    multidao: {
      title: "O povo do bezerro de ouro",
      subtitle: "Êxodo 32 • Israel na apostasia ao pé do monte",
      text: "É a multidão de Israel que, vendo Moisés tardar, exige de Arão: \"Faze-nos deuses, que vão adiante de nós\" (Êx 32:1), e adora o bezerro de fundição, dizendo: \"Este é teu deus, ó Israel\" (Êx 32:4). Deus os chama \"povo de dura cerviz\" e só a intercessão de Moisés detém o furor (Êx 32:9-11). No mesmo lugar onde jurou obedecer, o povo cai na idolatria — retrato da infidelidade do coração humano.",
    },
    homem: {
      title: "Josué e os filhos de Levi",
      subtitle: "Êxodo 32 • o alarido e a espada no arraial",
      text: "É Josué, que desce do monte com Moisés e, ouvindo a voz do povo que jubilava, diz: \"Alarido de guerra há no arraial\" (Êx 32:17). E são os filhos de Levi que, ao brado \"Quem é do Senhor, venha a mim\", se ajuntam a Moisés e passam pelo arraial de porta em porta, caindo naquele dia cerca de três mil homens (Êx 32:26-28). Consagrando as mãos ao Senhor mesmo contra o irmão e o vizinho (Êx 32:29), esta tribo recebe ali a vocação que a porá no serviço do santuário: a santidade de Deus não transige com a idolatria.",
    },
    servo: {
      title: "Os três mil que caíram pela espada",
      subtitle: "Êxodo 32 • os mortos do dia do bezerro",
      text: "São os israelitas que ficaram do lado do bezerro quando Moisés se pôs à porta do arraial e clamou \"Quem é do Senhor, venha a mim\" (Êx 32:26). Os filhos de Levi passaram de porta em porta, \"e caíram do povo, aquele dia, uns três mil homens\" (Êx 32:28). Não são inimigos de fora: são irmãos, amigos e vizinhos do próprio arraial, e por isso o juízo dói. A Escritura os registra como aviso a quem se ajunta ao culto falso enquanto a aliança ainda ecoa no ouvido (1Co 10:7).",
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
    anciao: {
      title: "Os príncipes da congregação diante do rosto que brilha",
      subtitle: "Êxodo 34 • o retorno com as segundas tábuas",
      text: "São Arão e \"todos os príncipes da congregação\" que, vendo que \"a pele do seu rosto resplandecia\", \"temeram chegar-se a ele\" (Êx 34:30). Só quando Moisés os chama é que tornam a ele e ouvem a sua palavra, antes que se cheguem todos os filhos de Israel (Êx 34:31-32). Como cabeças do povo, são os primeiros a provar que a glória da aliança renovada ao mesmo tempo atrai e atemoriza (2Co 3:7).",
    },
  },
  35: {
    multidao: {
      title: "A congregação das ofertas voluntárias",
      subtitle: "Êxodo 35 • Israel doando para o tabernáculo",
      text: "É \"toda a congregação dos filhos de Israel\" convocada a trazer, cada um \"cujo coração é voluntariamente disposto\", ouro, prata, tecidos e trabalho para a obra do santuário (Êx 35:5,21). Homens e mulheres, hábeis de coração, oferecem e fiam com alegria (Êx 35:22,25). O mesmo povo que pecou com o ouro do bezerro agora o consagra a Deus: o coração remido responde com generosidade ao culto verdadeiro.",
    },
    anciao: {
      title: "Os príncipes que trouxeram as pedras de ônix",
      subtitle: "Êxodo 35 • a oferta dos cabeças das tribos",
      text: "São \"os príncipes\" que trazem \"pedras de ônix e pedras de engastes para o éfode e para o peitoral\", e ainda especiarias e azeite para a luz, para o azeite da unção e para o incenso aromático (Êx 35:27-28). São justamente as pedras em que serão gravados os nomes das tribos, para que o sumo sacerdote as leve sobre os ombros e sobre o coração diante do Senhor (Êx 28:9-12,29). Os cabeças de Israel oferecem aquilo que os fará ser lembrados perante Deus: a verdadeira liderança se mede pelo que entrega.",
    },
    homem: {
      title: "Os israelitas de coração voluntário",
      subtitle: "Êxodo 35 • as ofertas para o tabernáculo",
      text: "São os homens que, \"todos dispostos de coração\", trazem fivelas, pendentes, anéis e braceletes — \"todo o homem fazia oferta de ouro ao Senhor\" (Êx 35:22) — e também azul, púrpura, carmesim, linho fino, peles, prata, metal e madeira de acácia para a obra. Entre eles Moisés aponta Bezalel, a quem \"o Senhor tem chamado por nome\", e Aoliabe, a quem Deus \"dispôs o coração para ensinar a outros\" (Êx 35:30,34). A oferta e a arte brotam da mesma raiz: um coração movido por Deus.",
    },
    mulherComum: {
      title: "As mulheres sábias de coração que fiavam",
      subtitle: "Êxodo 35 • os fios do santuário",
      text: "São \"todas as mulheres sábias de coração\" que \"fiavam com as suas mãos\" e traziam o que tinham fiado: o azul, a púrpura, o carmesim e o linho fino (Êx 35:25). Outras, \"cujo coração as moveu em habilidade\", fiavam os pêlos das cabras para as cortinas da tenda (Êx 35:26), e com os homens traziam oferta voluntária ao Senhor (Êx 35:29). Anônimas na Escritura, são as mãos que teceram, fio a fio, o lugar onde Deus viria habitar no meio do seu povo.",
    },
  },
  36: {
    multidao: {
      title: "O povo que trouxe mais do que bastava",
      subtitle: "Êxodo 36 • as ofertas em excesso",
      text: "É a multidão de Israel cuja generosidade foi tanta que os sábios disseram a Moisés: \"O povo traz muito mais do que basta\" (Êx 36:5). Moisés precisa proclamar que ninguém traga mais, e \"o povo foi proibido de trazer\", pois já sobejava (Êx 36:6-7). Raro juízo de fartura no deserto: quando o coração é movido por Deus, a oferta transborda além da necessidade da obra.",
    },
    homem: {
      title: "Bezalel, Aoliabe e os sábios de coração",
      subtitle: "Êxodo 36 • a obra do santuário em marcha",
      text: "São Bezalel e Aoliabe \"e todo o homem sábio de coração, a quem o Senhor dera sabedoria e inteligência\", para saber como fazer toda a obra do serviço do santuário (Êx 36:1). Moisés os chama, e vem \"todo aquele a quem o seu coração moveu a se chegar à obra\", recebendo das mãos do povo as ofertas trazidas cada manhã (Êx 36:2-3). São eles que avisam Moisés: \"O povo traz muito mais do que basta\" (Êx 36:5) — obreiros fiéis, que fazem exatamente conforme o Senhor ordenara, sem acrescentar nem diminuir.",
    },
  },
  37: {
    homem: {
      title: "Bezalel na oficina do santuário",
      subtitle: "Êxodo 37 • a arca, a mesa, o candelabro e o altar do incenso",
      text: "É Bezalel, filho de Uri, que \"fez também a arca de madeira de acácia\", coberta de ouro puro, com o propiciatório e os querubins (Êx 37:1). As mesmas mãos fazem a mesa dos pães, o candelabro de ouro puro \"de obra batida\", cujo pedestal, hastes, copos, maçãs e flores \"formavam com ele uma só peça\", e o altar do incenso, quadrado, com as suas pontas (Êx 37:10,17,25). Cada peça que ele molda será o lugar da presença, da luz e da intercessão: o Espírito que o encheu traduz em ouro a palavra que Deus dera no monte.",
    },
  },
  38: {
    homem: {
      title: "Bezalel, Aoliabe e Itamar",
      subtitle: "Êxodo 38 • o altar, o pátio e a conta do tabernáculo",
      text: "É Bezalel, que \"fez tudo quanto o Senhor tinha ordenado a Moisés\": o altar do holocausto de acácia, a pia de cobre e as cortinas do pátio (Êx 38:1,8,22). Com ele está Aoliabe, da tribo de Dã, \"um mestre de obra, e engenhoso artífice, e bordador em azul, e em púrpura e em carmesim e em linho fino\" (Êx 38:23). E está Itamar, filho de Arão, por cujo intermédio, por ordem de Moisés, se contaram todas as coisas usadas no tabernáculo do testemunho (Êx 38:21): a obra de Deus se faz com arte e se presta com contas.",
    },
    mulherComum: {
      title: "As mulheres dos espelhos à porta da tenda",
      subtitle: "Êxodo 38 • o metal que se tornou pia",
      text: "São \"as mulheres que se reuniam, para servir à porta da tenda da congregação\", de cujos espelhos de cobre foram feitas a pia e a sua base (Êx 38:8). Entregaram aquilo em que olhavam para si mesmas, e daquele metal saiu a bacia em que os sacerdotes lavariam as mãos e os pés para que não morressem (Êx 30:20-21). O que servia à vaidade tornou-se instrumento de purificação — consagração que troca o próprio reflexo pelo serviço do santuário.",
    },
  },
  39: {
    multidao: {
      title: "Israel que terminou a obra",
      subtitle: "Êxodo 39 • o povo abençoado por Moisés",
      text: "São os filhos de Israel que fizeram \"conforme a tudo o que o Senhor ordenara a Moisés\" toda a obra do tabernáculo e das vestes sacerdotais (Êx 39:32,42). Ao ver a obra concluída exatamente como mandara o Senhor, \"Moisés os abençoou\" (Êx 39:43). A obediência fiel do povo em cada detalhe do santuário ecoa o descanso da criação e prepara a habitação de Deus no meio deles.",
    },
    homem: {
      title: "Os artífices das vestes santas",
      subtitle: "Êxodo 39 • SANTIDADE AO SENHOR",
      text: "São Bezalel e os obreiros hábeis que fizeram \"as vestes do ministério, para ministrar no santuário, de azul, e de púrpura e de carmesim\", e as vestes santas para Arão (Êx 39:1). Das suas mãos sai, de ouro puro, \"a lâmina da coroa de santidade\", com o escrito como de gravura de selo: SANTIDADE AO SENHOR, atada à mitra por um cordão de azul (Êx 39:30-31). Cada peça foi feita \"como o Senhor ordenara a Moisés\": o culto aceitável não é o que a criatura inventa, mas o que Deus prescreve.",
    },
  },
  40: {
    multidao: {
      title: "A congregação sob a glória",
      subtitle: "Êxodo 40 • Israel vê a glória encher o tabernáculo",
      text: "É \"toda a casa de Israel\" que, levantado o tabernáculo, vê \"a nuvem cobrir a tenda da congregação, e a glória do Senhor encher o tabernáculo\" (Êx 40:34). A nuvem de dia e o fogo de noite ficam sobre a tenda \"perante os olhos de toda a casa de Israel, em todas as suas jornadas\" (Êx 40:38). O Deus que os tirou do Egito agora habita no meio deles — clímax do Êxodo e penhor do Emanuel, \"Deus conosco\".",
    },
    homem: {
      title: "Os filhos de Arão lavados na pia",
      subtitle: "Êxodo 40 • o dia em que o tabernáculo foi levantado",
      text: "São os filhos de Arão que Moisés faz chegar \"à porta da tenda da congregação\" para lavá-los com água e vesti-los, a fim de que administrem o sacerdócio (Êx 40:12-14). Ali, com Moisés e o pai, \"lavaram as suas mãos e os seus pés\", e assim faziam sempre \"quando entravam na tenda da congregação, e quando chegavam ao altar\" (Êx 40:31-32). O sacerdócio começa na água antes de começar no altar: sem purificação não há serviço diante do Deus cuja glória logo encheria aquela tenda (Êx 40:34).",
    },
  },
};
