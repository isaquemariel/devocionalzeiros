// Fichas ESPECÍFICAS por (capítulo → papel) de JÓ 1–14.
// Este bloco é de um livro que não se parece com nenhum outro do palco. Só os
// dois primeiros capítulos são narrativa — Uz, o maior de todos os do oriente,
// os banquetes dos filhos e os holocaustos da madrugada, a corte celestial com
// Satanás entre os filhos de Deus, as quatro notícias que chegam uma por cima
// da outra, os tumores desde a planta do pé até ao alto da cabeça, o caco de
// telha na cinza e os três amigos calados sete dias e sete noites. Do capítulo
// 3 em diante o palco quase nunca mostra os quatro homens assentados na cinza:
// mostra O QUE A FALA VÊ. Cada versículo de discurso virou o quadro da sua
// própria imagem — o leão que perece sem presa, o espírito que passa na noite,
// a fagulha que sobe, o ribeiro que seca e as caravanas de Temá envergonhadas,
// a lançadeira do tecelão, o papiro no lodo, a teia de aranha, a Ursa e o
// Órion, o leite que se coalha, a árvore cortada que ao cheiro das águas torna
// a brotar e as águas que gastam as pedras.
//
// Por isso a regra destas fichas é outra: o figurante de um beat de discurso
// NÃO é "um homem do povo" — é a FIGURA DA IMAGEM daquele versículo. O
// jornaleiro que espera a sua paga, o preso que não ouve a voz do exator, o rei
// que edificou para si casas em lugares assolados, o insensato cuja habitação
// Elifaz amaldiçoou, o correio que corre mais que os dias de Jó. A ficha diz de
// que imagem ele é, QUEM a disse e o que ela quer dizer dentro do argumento —
// porque em Jó o argumento é a ação.
//
// PAPEL `patriarca`: não tem entrada aqui em nenhum capítulo, de propósito. Nos
// catorze capítulos ele resolve sempre para `jo`, `elifaz-o-temanita`,
// `bildade-o-suita` ou `zofar-o-naamatita`, que têm verbete próprio em
// CHAR_INFO e vencem esta camada. O mesmo vale para `mulher-de-jo` (1:20-21;
// 2:7-10) e para os quatro mensageiros de 1:14-19.
import type { StageInfo } from "@/lib/rpgStageInfo";

export const CHAPTER_ACTORS_01_14: Record<number, Record<string, StageInfo>> = {
  // ------------------------------------------------------------------ Jó 1
  1: {
    homem: {
      title: "Os sete filhos de Jó nos banquetes por turno, e os sabeus e os caldeus que caíram sobre o seu gado",
      subtitle: "Jó 1:4,13,15,17-19 • a casa do irmão primogênito e as duas hostes que vieram de rumos opostos",
      text: "\"E iam seus filhos à casa uns dos outros e faziam banquetes cada um por sua vez\" (Jó 1:4). São sete rapazes com casa própria e um calendário de festa que gira entre eles; o mais velho é o anfitrião do último dia (1:18), e é sobre esse telhado que o vento dará nos quatro cantos. Nada no texto os acusa: o pai apenas temia (1:5). Os outros homens vêm dos dois extremos do mundo conhecido de Uz: do sul os sabeus das caravanas (1:15), do norte os caldeus, que não vieram em bando mas em formação — \"Ordenando os caldeus três tropas\" (1:17). Entre o banquete e o saque não há capítulo: é o mesmo dia.",
    },
    mulherComum: {
      title: "As três filhas de Jó, convidadas a comer e beber com os irmãos",
      subtitle: "Jó 1:2,4,13,18-19 • as três que morreram na casa do primogênito",
      text: "\"E nasceram-lhe sete filhos e três filhas\" (Jó 1:2). O detalhe que a Escritura guarda delas diz muito: os irmãos \"mandavam convidar as suas três irmãs a comerem e beberem com eles\" (1:4) — numa casa do oriente antigo, mulheres chamadas a cada rodada de banquete são gente de posição. Estão à mesa quando a notícia chega ao pai (1:18) e morrem debaixo do mesmo teto (1:19). Ele as santificava junto com os irmãos, sem distinção (1:5). No fim do livro voltam a nascer três — e desta vez com nome: Jemima, Quezia e Quéren-Hapuque (42:14-15).",
    },
    pastor: {
      title: "Os pastores das sete mil ovelhas — os que dormiam no campo quando o fogo caiu do céu",
      subtitle: "Jó 1:3,16 • os servos queimados com o rebanho, e o único que escapou",
      text: "\"E o seu gado era de sete mil ovelhas\" (Jó 1:3), e sete mil cabeças não se guardam com dois homens: é gente espalhada por vários apriscos, dormindo ao relento, como os pastores de Belém (Lc 2:8). São eles a segunda notícia do dia: \"Fogo de Deus caiu do céu, e queimou as ovelhas e os servos\" (1:16). Note-se a ordem em que o mensageiro conta — primeiro as ovelhas, depois os servos —, e que é o próprio sobrevivente quem batiza o desastre de FOGO DE DEUS, sem saber o que o leitor sabe desde 1:12.",
    },
    rebanho: {
      title: "As sete mil ovelhas, os três mil camelos e as quinhentas juntas de bois — a fazenda do maior de todos os do oriente",
      subtitle: "Jó 1:3,10,14-17 • o gado que a sebe cercava e que se perdeu num dia",
      text: "\"E o seu gado era de sete mil ovelhas, três mil camelos, quinhentas juntas de bois e quinhentas jumentas... este homem era maior do que todos os do oriente\" (Jó 1:3). O texto conta a grandeza de Jó em bichos, e não em prata: lã e carne, comércio de longa distância, lavoura e transporte de casa. É esse gado que o adversário aponta no céu como prova de que a piedade tem preço: \"Porventura tu não cercaste de sebe...?\" (1:10). Aberta a sebe, os quatro rebanhos somem em quatro frases (1:15-17). No fim, Deus devolve tudo em dobro (42:12).",
    },
    servo: {
      title: "Os muitíssimos servos de Jó: o mordomo da casa, o boiadeiro do sulco, o cameleiro, o que servia o vinho do banquete, o que ajudava no holocausto da madrugada e o que ficava ao portão de Uz",
      subtitle: "Jó 1:3,5,14-17 • a criadagem que fazia daquela casa a maior do oriente — e a que morreu ao fio da espada",
      text: "\"Eram também muitíssimos os servos a seu serviço\" (Jó 1:3) — e é por eles que o texto mede a casa antes de a medir pelo gado. Cada rebanho tem a sua gente: o boiadeiro do sulco, o cameleiro, o pastor das sete mil ovelhas, e o mordomo que responde pela porta por onde entram os quatro mensageiros. A dureza do capítulo é que este pessoal não é cenário: duas das quatro notícias dizem que \"aos servos feriram ao fio da espada\" (1:15,17). Quando Jó perde tudo, o \"tudo\" inclui os homens que trabalhavam para ele — e ele saberá disso a vida inteira (31:13-15).",
    },
  },

  // ------------------------------------------------------------------ Jó 2
  2: {
    servo: {
      title: "O servo que veio de longe com os três amigos, e que os viu não reconhecer o dono da casa",
      subtitle: "Jó 2:11-13 • a comitiva que chegou de Temã, de Suá e de Naamá",
      text: "\"Ouvindo, pois, três amigos de Jó todo este mal... vieram cada um do seu lugar\" (Jó 2:11) — e ninguém atravessava o deserto sozinho: quem carrega o odre e arma a tenda é este servo, que fica de fora da conversa e vê tudo. O que vê primeiro é a coisa mais terrível do capítulo: \"levantando de longe os seus olhos, não o conheceram\" (2:12). Depois vem o luto antigo, e por fim sete dias de silêncio (2:13) — o tempo do luto por um morto (Gn 50:10). Enquanto ficaram calados, os três fizeram tudo certo; o livro só dá errado quando abrem a boca.",
    },
  },

  // ------------------------------------------------------------------ Jó 3
  3: {
    anciao: {
      title: "Os conselheiros da terra que jazem com os reis nas casas que edificaram em lugares assolados",
      subtitle: "Jó 3:14 • o repouso que a morte teria sido, na primeira fala de Jó",
      text: "\"Com os reis e conselheiros da terra, que para si edificam casas nos lugares assolados\" (Jó 3:14). Jó descreve o sossego que teria tido se houvesse morrido ao nascer, e a companhia que imagina é a mais alta possível. A ironia está na palavra ASSOLADOS — o que estes homens edificaram para si são hoje monumentos no meio do nada. O que ele quer dizer é que a morte iguala, e ali \"os maus cessam de perturbar; e ali repousam os cansados\" (3:17). Note-se o que Jó NÃO diz: em nenhum momento amaldiçoa Deus — amaldiçoa o seu dia (3:1).",
    },
    homem: {
      title: "As figuras do capítulo do dia amaldiçoado: os que estão prontos para suscitar o pranto, os cansados que repousam, os presos que não ouvem a voz do exator, os que cavam em procura da morte e o homem cujo caminho é oculto",
      subtitle: "Jó 3:8,17-18,20-23 • as imagens que Jó vê depois de sete dias calado",
      text: "Depois de sete dias de silêncio, \"abriu Jó a sua boca, e amaldiçoou o seu dia\" (Jó 3:1), e o palco passa a mostrar o que ele vê. Primeiro os que \"estão prontos para suscitar o seu pranto\" (3:8). Depois os habitantes do lugar onde queria estar: \"Ali os presos juntamente repousam, e não ouvem a voz do exator\" (3:18) — o exator é o cobrador de trabalho forçado (Êx 5:6). Depois os que cavam atrás da morte \"mais do que de tesouros ocultos\" (3:21). E por fim ele mesmo: \"Por que se dá luz ao homem, cujo caminho é oculto?\" (3:23). Não é a dor que o mata, é não saber por quê.",
    },
    mulherComum: {
      title: "A mãe que o recebeu nos joelhos e lhe deu os peitos, no versículo em que Jó pergunta por quê",
      subtitle: "Jó 3:10-12 • as portas do ventre que não se fecharam",
      text: "\"Por que me receberam os joelhos? E por que os peitos, para que mamasse?\" (Jó 3:12). Receber o recém-nascido sobre os joelhos é o gesto antigo de acolhê-lo na família (Gn 30:3; 50:23). Jó não está acusando a mãe: está desmontando, um a um, todos os cuidados que o mantiveram vivo, e é isso que torna o capítulo tão sombrio. A figura em cena é a mulher que fez o que qualquer mãe faz, e cujo gesto de amor virou, na boca do filho arrasado, um argumento contra a vida. Ele voltará a esta cena no capítulo 10, e ali com outra ternura (10:8).",
    },
    rei: {
      title: "Os reis que edificaram casas em lugares assolados, os príncipes que encheram de prata as suas casas, e o grande que jaz ao lado do pequeno",
      subtitle: "Jó 3:14-15,19 • a igualdade da sepultura, na boca de quem perdeu tudo",
      text: "\"Com os reis e conselheiros da terra... ou com os príncipes que possuem ouro, que enchem as suas casas de prata\" (Jó 3:14-15). Jó não critica os poderosos: lista com quem estaria deitado se tivesse morrido ao nascer. O contraste é deliberado — casas cheias de prata e casas em lugares desertos, no mesmo parágrafo. E a conclusão é a frase mais nivelada da Escritura: \"Ali está o pequeno e o grande, e o servo livre de seu senhor\" (3:19). É a mesma leitura do Salmo 49:10, e a razão pela qual Jó pôde dizer, na cinza, \"nu saí do ventre de minha mãe\" (1:21).",
    },
    servo: {
      title: "O servo livre de seu senhor na sepultura, e o que guardava a prata do príncipe enquanto ele vivia",
      subtitle: "Jó 3:15,19 • a alforria que só a morte deu",
      text: "\"Ali está o pequeno e o grande, e o servo livre de seu senhor\" (Jó 3:19). É a única alforria que Jó consegue enxergar do fundo do monturo, e ela custa a vida: no túmulo o escravo deixa de pertencer a alguém. Ao lado dele estão os presos que \"não ouvem a voz do exator\" (3:18), o cobrador de trabalho forçado. É um dos poucos lugares do Antigo Testamento em que a servidão aparece vista do lado de quem serve — e quem fala foi, até dias atrás, o maior patrão do oriente (1:3), o mesmo que dirá depois \"Aquele que me formou no ventre não o fez também a ele?\" (31:15).",
    },
  },

  // ------------------------------------------------------------------ Jó 4
  4: {
    anciao: {
      title: "O ancião que se assentava com Jó à porta de Uz, no tempo em que ele ensinava a muitos",
      subtitle: "Jó 4:3-5 • a memória com que Elifaz abre o primeiro discurso",
      text: "\"Eis que ensinaste a muitos, e tens fortalecido as mãos fracas\" (Jó 4:3). Antes de acusar, Elifaz descreve o que Jó era na praça: um homem procurado por conselho, cuja palavra endireitava gente que ia caindo. O próprio Jó desenhará depois essa cena: \"Os moços me viam, e se escondiam, e até os idosos se levantavam\" (29:8). Este ancião é colega de banco, testemunha de anos de bom julgamento. E é por isso que o argumento corta: \"Mas agora, que se trata de ti, te enfadas\" (4:5). O que não lhe ocorre é que o caso à sua frente não cabe na doutrina.",
    },
    homem: {
      title: "As figuras do primeiro discurso de Elifaz: as mãos fracas e os joelhos desfalecentes que Jó firmou, o inocente que jamais pereceu, o que lavra iniquidade e sega o mesmo, e os que habitam em casas de lodo",
      subtitle: "Jó 4:3-4,7-8,19 • a doutrina da retribuição posta em imagens",
      text: "Elifaz constrói o caso em três quadros. O primeiro é elogio: \"As tuas palavras firmaram os que tropeçavam\" (Jó 4:4). O segundo é a tese, numa pergunta que soa irrespondível: \"qual é o inocente que jamais pereceu?\" (4:7). Dela sai o lavrador: \"os que lavram iniqüidade, e semeiam mal, segam o mesmo\" (4:8) — a lei de Os 8:7 e Gl 6:7. O erro não é a lei; é usá-la ao contrário, deduzindo do sofrimento o pecado. O terceiro vem da visão da noite: \"casas de lodo, cujo fundamento está no pó\" (4:19) — o barro de 2Co 4:7.",
    },
    pastor: {
      title: "O pastor que fugiu do covil, no versículo em que o leão velho perece por falta de presa",
      subtitle: "Jó 4:10-11 • a imagem com que Elifaz descreve a queda dos violentos",
      text: "\"O rugido do leão, e a voz do leão feroz, e os dentes dos leõezinhos se quebram. Perece o leão velho, porque não tem presa\" (Jó 4:10-11). Cinco palavras diferentes para leão em dois versículos: Elifaz pinta uma família inteira de predadores e mostra todos a acabar pelo lado mais humilhante, não pela lança, mas pela FOME. A figura em cena é quem convive com esse bicho: o pastor que perdia ovelhas para o leão e às vezes ia buscá-las da boca dele (1Sm 17:34-35). É a imagem que Naum aplicará a Nínive (Na 2:11) — e o avesso do Salmo 34:10.",
    },
    servo: {
      title: "O aprendiz que Jó ensinava ao portão, o ceifeiro da messe dos que semeiam o mal, o homem sobre quem cai o sono profundo e o vizinho esmagado como a traça",
      subtitle: "Jó 4:3,8,13,19 • as mãos que aparecem no discurso de Elifaz",
      text: "\"Eis que ensinaste a muitos\" (Jó 4:3) — e entre esses muitos estava o moço que ficava de pé, ouvindo, enquanto os anciãos se assentavam. Depois o palco vira lavoura: o ceifeiro que corta a messe dos que \"semeiam mal\" e \"segam o mesmo\" (4:8). Depois escurece para a única experiência que Elifaz alega ter: \"quando cai sobre os homens o sono profundo\" (4:13) — o torpor de Gn 15:12; só que aqui não é Deus quem fala, é um vulto sem feição. E fecha com o mais frágil dos figurantes: o homem de \"casas de lodo\", esmagado \"como a traça\" (4:19).",
    },
  },

  // ------------------------------------------------------------------ Jó 5
  5: {
    anciao: {
      title: "O velho que chega à sepultura como o feixe de trigo se recolhe a seu tempo",
      subtitle: "Jó 5:26 • a última promessa do discurso de Elifaz",
      text: "\"Na velhice irás à sepultura, como se recolhe o feixe de trigo a seu tempo\" (Jó 5:26). É a imagem mais bonita que Elifaz produz no livro: a morte não como corte, mas como colheita — o feixe que se ata quando o grão está pronto. Nada nisso é falso: é assim que a Escritura despede Abraão (Gn 25:8) e Davi (1Cr 29:28). O problema é o endereço: ele oferece esse fim a um homem que acabou de enterrar dez filhos, e a quem três versículos antes disse que a aflição não brota da terra por acaso (5:6). Promessa verdadeira dita à pessoa errada vira acusação.",
    },
    homem: {
      title: "O louco que Elifaz viu lançar raízes, o astuto apanhado na própria astúcia, o abatido posto num lugar alto, o necessitado livrado da espada e o homem a quem Deus faz a chaga e ele mesmo liga",
      subtitle: "Jó 5:2-5,11-21 • o mundo em ordem que Elifaz descreve — e a ordem em que Jó não cabe",
      text: "O capítulo 5 é um mundo inteiro em duas colunas. Na primeira, o insensato: \"Bem vi eu o louco lançar raízes... Seus filhos estão longe da salvação; e são despedaçados às portas\" (Jó 5:3-4) — e o ouvinte que acabou de perder os filhos entende de quem se fala. Com ele vêm os sábios que Deus \"apanha na sua própria astúcia\" — a única frase de Jó que o Novo Testamento cita como Escritura (1Co 3:19). Na segunda, os salvos: os abatidos postos num lugar alto (5:11) e o ferido curado pela mesma mão (5:18). Tudo verdadeiro. E nada disso explica por que Jó está na cinza.",
    },
    rebanho: {
      title: "Os animais da terra que não temerás e as feras do campo que serão pacíficas contigo",
      subtitle: "Jó 5:22-23 • a paz com a criação prometida ao homem corrigido",
      text: "\"Da assolação e da fome te rirás, e os animais da terra não temerás. Porque até com as pedras do campo terás o teu acordo, e as feras do campo serão pacíficas contigo\" (Jó 5:22-23). Elifaz oferece a reconciliação com tudo o que ameaçava um criador de gado: a pedra que quebra o arado e a fera que come as ovelhas. É promessa de aliança com o campo, parente de Os 2:18 e Is 11:6. A crueldade não está no conteúdo, está em quem ouve: o amigo promete um campo pacífico a quem já não tem gado nenhum para pôr nele (1:14-17).",
    },
    servo: {
      title: "O que atiça a fogueira de que sobem as faíscas, o lavrador que rega o campo com as águas que Deus envia, o irmão do despedaçado às portas e os filhos da posteridade que se multiplica como a erva",
      subtitle: "Jó 5:4,7,10,25 • as mãos que aparecem dentro das imagens de Elifaz",
      text: "\"Mas o homem nasce para a tribulação, como as faíscas se levantam para voar\" (Jó 5:7). Alguém tem de estar a atiçar esse fogo para que as fagulhas subam, e é essa figura curvada sobre a brasa que o palco mostra. Ao lado está o lavrador do versículo mais generoso do discurso: \"Ele dá a chuva sobre a terra\" (5:10), o mesmo Deus de Mt 5:45. Depois escurece: os filhos do insensato, \"despedaçados às portas, e não há quem os livre\" (5:4). E no fim os filhos da promessa (5:25). Elifaz põe os dois no mesmo discurso e deixa Jó escolher — como se estivesse ao alcance dele.",
    },
  },

  // ------------------------------------------------------------------ Jó 6
  6: {
    homem: {
      title: "Os caminhantes de Tema que procuram o ribeiro, o hóspede diante da comida insípida, o amigo que poderia oferecer presentes e o opressor de cujas mãos Jó nada pediu",
      subtitle: "Jó 6:6-7,19-20,22-23 • a resposta de Jó a Elifaz, dita por imagens de estrada e de mesa",
      text: "A figura central deste capítulo é uma caravana. \"Os caminhantes de Tema os vêem; os passageiros de Sabá esperam por eles. Ficam envergonhados, por terem confiado\" (Jó 6:19-20). Contam com o ribeiro que estava lá no inverno — só que o ribeiro do oriente é uádi: cheio de neve na estação fria e, no calor, \"desaparecem do seu lugar\" (6:17). Chegam ao leito e acham pedra seca. É esse o retrato dos três amigos: \"Meus irmãos aleivosamente me trataram, como um ribeiro\" (6:15). Ele não pediu dinheiro nem resgate (6:22-23): pediu companhia, e recebeu doutrina.",
    },
    rebanho: {
      title: "O jumento montês junto à relva e o boi que muge junto ao seu pasto",
      subtitle: "Jó 6:5 • os dois bichos com que Jó defende o direito de se queixar",
      text: "\"Porventura zurrará o jumento montês junto à relva? Ou mugirá o boi junto ao seu pasto?\" (Jó 6:5). É o argumento mais simples e mais afiado da resposta a Elifaz: bicho satisfeito não faz barulho. O jumento selvagem só zurra quando falta pasto; o boi só muge quando o cocho está vazio. Se Jó está a gritar, não é falta de piedade — é fome. A queixa é sintoma, não pecado. E o mesmo homem que usa dois animais para explicar a dor vai mandar os amigos aprenderem com eles: \"pergunta agora às alimárias, e cada uma delas te ensinará\" (12:7).",
    },
    servo: {
      title: "O carregador que pesaria a mágoa contra a areia dos mares, o caminhante cuja vereda sobe ao vácuo, e o órfão sobre quem se lançam sortes",
      subtitle: "Jó 6:2-3,18,27 • os figurantes da queixa de Jó contra os amigos",
      text: "\"Oh! se a minha mágoa retamente se pesasse... mais pesada seria, do que a areia dos mares\" (Jó 6:2-3). O primeiro em cena é o homem da balança: Jó não quer que o compadeçam, quer que o PESEM. O segundo é o caminhante perdido: \"sobem ao vácuo, e perecem\" (6:18) — as caravanas saem da estrada atrás da água que já não existe. O terceiro é acusação direta: \"Mas antes lançais sortes sobre o órfão; e cavais uma cova para o amigo\" (6:27) — o cúmulo da crueldade em Joel 3:3, e é isso que Jó diz que os três fazem com ele.",
    },
  },

  // ------------------------------------------------------------------ Jó 7
  7: {
    homem: {
      title: "O jornaleiro cujos dias são a medida da vida humana, o vizinho cujos olhos agora o veem e não o verão mais, e a guarda posta sobre o mar e sobre a baleia",
      subtitle: "Jó 7:1-2,8,12 • as três imagens com que Jó fala de si a Deus",
      text: "\"Porventura não tem o homem guerra sobre a terra? E não são os seus dias como os dias do jornaleiro?\" (Jó 7:1). O jornaleiro não tem contrato: ganha por dia, e a lei mandava pagá-lo antes do pôr do sol porque sem isso não jantava (Dt 24:15). Jó diz que a vida inteira é assim: turno duro, pagamento no fim, nada garantido no meio. O segundo é o vizinho que ainda o vê ali (7:8). O terceiro é o mais irônico: \"Sou eu porventura o mar, ou a baleia, para que me ponhas uma guarda?\" (7:12) — desde quando um homem coberto de feridas merece sentinela?",
    },
    servo: {
      title: "O servo que suspira pela sombra, o jornaleiro que espera pela sua paga e o tecelão cuja lançadeira corre mais depressa do que os dias de Jó",
      subtitle: "Jó 7:2,6 • o trabalho braçal como medida do tempo que resta",
      text: "\"Como o servo que suspira pela sombra, e como o jornaleiro que espera pela sua paga\" (Jó 7:2). São dois desejos de fim de expediente: a sombra que chega na parede oposta e o dinheiro na mão ao entardecer. Jó pega o alívio mais modesto que existe e diz que nem isso lhe dão (7:3). A terceira figura ficou famosa: \"Os meus dias são mais velozes do que a lançadeira do tecelão, e acabam-se, sem esperança\" (7:6). Ezequias usará a mesma oficina na sua doença (Is 38:12). O que Jó acrescenta é o fim da frase — \"sem esperança\".",
    },
  },

  // ------------------------------------------------------------------ Jó 8
  8: {
    anciao: {
      title: "As gerações passadas a quem Bildade manda perguntar, e os pais cuja inquirição é a sua autoridade",
      subtitle: "Jó 8:8-10 • \"nós somos de ontem, e nada sabemos\"",
      text: "\"pergunta agora às gerações passadas; e prepara-te para a inquirição de seus pais. Porque nós somos de ontem, e nada sabemos\" (Jó 8:8-9). Onde Elifaz apelou para uma visão, Bildade apela para a tradição: o que os antigos sempre souberam vale mais do que o que qualquer homem vivo pode alegar. É um princípio bom, e a Escritura repete-o (Dt 32:7). O que ele não percebe é que escolheu uma testemunha que não pode ser interrogada: o caso de Jó é exatamente aquilo que a tradição não previu.",
    },
    homem: {
      title: "O suplicante que de madrugada busca a Deus, o hipócrita que se encosta à sua casa e ela não subsiste, o reto que Deus não rejeitará e o inimigo que se vestirá de confusão",
      subtitle: "Jó 8:5-6,13-15,20-22 • as duas fileiras em que Bildade divide os homens",
      text: "O discurso de Bildade cabe em duas figuras opostas. De um lado, quem se dobra: \"se tu de madrugada buscares a Deus... certamente logo despertará por ti\" (Jó 8:5-6) — note-se a madrugada, exatamente a hora em que o Jó do capítulo 1 já oferecia holocaustos (1:5). Do outro, o hipócrita: \"a sua confiança será como a teia de aranha. Encostar-se-á à sua casa, mas ela não subsistirá\" (8:14-15). Dito a um homem cuja casa acabara de cair sobre dez filhos, o quadro da casa que não fica em pé é 8:4 outra vez, agora sem dizer o nome.",
    },
    rebanho: {
      title: "O gado do último estado que cresceria em extremo",
      subtitle: "Jó 8:7 • a restauração que Bildade promete se Jó se arrepender",
      text: "\"O teu princípio, na verdade, terá sido pequeno, porém o teu último estado crescerá em extremo\" (Jó 8:7). Bildade oferece um negócio: reconheça a culpa, e a fazenda volta maior do que era. O espantoso é que ele acerta o desfecho e erra tudo o mais: no último capítulo o Senhor abençoa \"o último estado de Jó, mais do que o primeiro\" (42:12) — o dobro exato. Só que isso não veio porque Jó confessou um pecado escondido; veio depois de Deus repreender os três (42:7) e de Jó orar por eles (42:10). A conta de Bildade fecha; a teologia dele, não.",
    },
    servo: {
      title: "O jardineiro da planta viçosa perante o sol, cujas raízes se entrelaçam junto à fonte",
      subtitle: "Jó 8:11-12,16-19 • o papiro sem lodo, o junco sem água e o lugar que nega a planta arrancada",
      text: "\"Porventura cresce o junco sem lodo? Ou cresce a espadana sem água?\" (Jó 8:11). Bildade tira as imagens de uma horta e de um brejo, e o servo em cena é quem cuida delas. O papiro parece forte e depende inteiramente do charco: baixe a água e ele seca em pé, verde, antes de todas as outras ervas (8:12). Depois a trepadeira agarrada à pedra (8:16-17) — e a frase que ele guardou para o fim: \"Se Deus o consumir do seu lugar, negá-lo-á este, dizendo: Nunca te vi!\" (8:18). É o avesso exato da árvore de Jó 14:9, que \"ao cheiro das águas brotará\".",
    },
  },

  // ------------------------------------------------------------------ Jó 9
  9: {
    anciao: {
      title: "Os juízes cujo rosto Deus cobre, no versículo em que Jó diz que a terra foi entregue nas mãos do ímpio",
      subtitle: "Jó 9:24 • a acusação mais perigosa que Jó faz",
      text: "\"A terra é entregue nas mãos do ímpio; ele cobre o rosto dos juízes; se não é ele, quem é, logo?\" (Jó 9:24). Cobrir o rosto do juiz é deixá-lo julgar às cegas — o oposto do que a lei exigia da porta da cidade (Dt 16:19). E a pergunta pendurada ao lado é a mais ousada do livro até aqui: se o mundo está torto e não é Deus quem o entortou, quem é? Jó não nega a existência de Deus; nega que o mundo, visto da cinza, prove a justiça dele. É a pergunta de Jr 12:1, e a que quase custou a fé de Asafe (Sl 73:2-3,17).",
    },
    homem: {
      title: "Os auxiliadores soberbos que se encurvam debaixo dele, o dono a quem a presa é arrebatada, o inocente de cuja prova se zomba e o perfeito que é consumido junto com o ímpio",
      subtitle: "Jó 9:12-13,22-24 • as figuras da resposta a Bildade, sobre o Deus com quem não se pode contender",
      text: "O capítulo 9 é sobre um poder diante do qual não há recurso, e as figuras são de gente vencida antes de abrir a boca. \"Eis que arrebata a presa; quem lha fará restituir?\" (Jó 9:12) — o dono do bem levado nem tem a quem reclamar. E então vem a frase que os amigos jamais admitiriam: \"ele consome ao perfeito e ao ímpio\" (9:22). O leitor sabe desde 1:8 que o golpe caiu justamente sobre aquele de quem Deus se gabou. O que falta a Jó não é uma tese melhor, é uma pessoa: \"Não há entre nós árbitro\" (9:33) — o buraco que 1Tm 2:5 preencheria.",
    },
    servo: {
      title: "O correio que corre mais depressa do que os dias de Jó",
      subtitle: "Jó 9:25-26 • o mensageiro, o navio veleiro e a águia que se lança à comida",
      text: "\"E os meus dias são mais velozes do que um correio; fugiram, e não viram o bem. Passam como navios veleiros; como águia que se lança à comida\" (Jó 9:25-26). O correio é o portador de despachos reais, o homem mais rápido do mundo antigo (cf. Et 8:14). Jó põe-no em cena para dizer que os seus dias o ultrapassam, e empilha mais duas velocidades: o navio de vela e a águia que despenca sobre a caça. Três imagens de pressa e nenhuma de destino. Diferente do capítulo 1: ali o mensageiro trazia notícia; aqui já não traz nada, é só a medida do tempo.",
    },
  },

  // ----------------------------------------------------------------- Jó 10
  10: {
    homem: {
      title: "As testemunhas que Deus renova contra Jó",
      subtitle: "Jó 10:17 • \"Tu renovas contra mim as tuas testemunhas\"",
      text: "\"Tu renovas contra mim as tuas testemunhas, e multiplicas contra mim a tua ira\" (Jó 10:17). A cena é um tribunal em que a acusação nunca fecha: cada vez que uma testemunha termina, entra outra — e o réu não sabe do que é acusado, porque a pergunta dele é \"faze-me saber por que contendes comigo\" (10:2). No mundo de Jó, as testemunhas que se renovam são as chagas, e os três amigos leem esses corpos de delito assim mesmo. O mesmo homem dirá, poucos capítulos adiante, que há alguém do outro lado: \"a minha testemunha está no céu\" (16:19).",
    },
    rebanho: {
      title: "O rebanho de que vem o leite, no versículo em que Jó fala de como foi feito",
      subtitle: "Jó 10:10 • \"Porventura não me vazaste como leite, e como queijo não me coalhaste?\"",
      text: "\"Porventura não me vazaste como leite, e como queijo não me coalhaste? De pele e carne me vestiste\" (Jó 10:10-11). A imagem vem do curral e da cozinha, não do templo: a ordenha, o leite na vasilha, o coalho que o firma. Jó descreve a própria gestação como trabalho artesanal feito por mãos que sabiam o que faziam. O argumento é este: o Deus que me formou com esse cuidado é o mesmo que agora me desfaz (10:8). O Salmo 139 percorre o mesmo caminho e chega ao louvor; Jó percorre-o e chega a uma pergunta: \"Por que, pois, me tiraste da madre?\" (10:18).",
    },
    servo: {
      title: "O escrivão da inquirição da iniquidade de Jó e o queijeiro que coalha o leite no pátio",
      subtitle: "Jó 10:6,10 • o processo que se instaura e as mãos que o formaram",
      text: "Duas mãos muito diferentes trabalham neste capítulo. A primeira é a do escrivão do processo: \"Para te informares da minha iniqüidade, e averiguares o meu pecado?\" (Jó 10:6) — Jó acha o quadro absurdo porque não há o que averiguar: \"Bem sabes tu que eu não sou iníquo\" (10:7). Deus não precisa investigar, e ainda assim o trata como suspeito. A segunda é a do queijeiro, de uma ternura que o capítulo não sustenta: o leite coalhado até tomar corpo (10:10), os ossos tecidos (10:11). Como pode a mesma pessoa ter feito as duas coisas?",
    },
  },

  // ----------------------------------------------------------------- Jó 11
  11: {
    anciao: {
      title: "O ancião da praça que ouve a multidão de palavras e o escriba que guarda os segredos da sabedoria",
      subtitle: "Jó 11:2,6 • a plateia que Zofar convoca contra Jó",
      text: "\"Porventura não se dará resposta à multidão de palavras? E o homem falador será justificado?\" (Jó 11:2). Zofar abre a boca como quem preside uma assembleia: há falatório demais, alguém tem de pôr ordem. O ancião em cena é essa autoridade da praça. Ao lado está o guardião do saber antigo, porque o que Zofar deseja para Jó é uma aula (11:5-6). O desejo é atendido, mas não como ele imaginava: Deus abre os lábios em 38:1, e o que sai de lá não lhe dá razão uma vez sequer (42:7).",
    },
    homem: {
      title: "O homem falador que Zofar quer ver envergonhado, o que não alcança os caminhos de Deus, o que nasce como a cria do jumento montês, e o que estende as mãos e depois repousa seguro",
      subtitle: "Jó 11:2-3,7-12,13-19 • as duas metades do discurso de Zofar",
      text: "A primeira metade do capítulo é feita de homens pequenos diante de uma medida grande demais: \"Como as alturas dos céus é a sua sabedoria... É mais profunda do que o inferno... Mais comprida é a sua medida do que a terra, e mais larga do que o mar\" (Jó 11:7-9). Quatro dimensões e o homem no meio sem régua nenhuma — o mesmo esquema que Paulo usará para dizer o contrário (Ef 3:18). A segunda metade é a oferta: prepare o coração, e \"deitar-te-ás, e ninguém te espantará\" (11:19). Um homem dormindo sem susto era tudo o que Jó queria (7:13-14).",
    },
    servo: {
      title: "O oficial do juízo à porta de Uz, o mercador que parou para ouvir a contenda, o que varre a tenda em que não há de habitar a injustiça e o que suplica o favor do que repousa seguro",
      subtitle: "Jó 11:10,14,18-19 • os figurantes da praça no discurso de Zofar",
      text: "\"Se ele passar, aprisionar, ou chamar a juízo, quem o impedirá?\" (Jó 11:10). O oficial em cena é o braço que executa essa ordem — o homem que prende e leva à porta da cidade, onde os processos corriam. Ao lado está a praça: os que pararam de negociar para ouvir a contenda. Depois o palco entra na casa: \"não deixes habitar a injustiça nas tuas tendas\" (11:14) — a injustiça é tratada como moradora, e alguém tem de varrê-la. E no fim os suplicantes que baterão à porta do restaurado (11:19) — imagem do que Jó já foi (29:12).",
    },
  },

  // ----------------------------------------------------------------- Jó 12
  12: {
    anciao: {
      title: "Os acreditados a quem se tira a fala, os anciãos a quem se tira o entendimento, os conselheiros levados despojados e os sacerdotes levados despojados",
      subtitle: "Jó 12:12,17,19-20 • a lista de autoridades que Deus desmonta",
      text: "Jó começa concedendo a premissa dos amigos — \"Com os idosos está a sabedoria\" (Jó 12:12) — e depois derruba-a com uma lista em que Deus desfaz todas as instituições de que essa sabedoria depende: \"Aos conselheiros leva despojados... Aos acreditados tira a fala, e tira o entendimento aos anciãos\" (12:17,20). Acreditados são os homens de confiança, cuja palavra bastava. Aos anciãos que Bildade mandara consultar (8:8), tira o entendimento. Se é o próprio Deus quem os esvazia, a tradição não é tribunal de recurso nenhum.",
    },
    homem: {
      title: "O justo que serve de zombaria, a tocha desprezível na opinião do que está descansado, o que erra e o que o faz errar, e os que apalpam nas trevas e desatinam como ébrios",
      subtitle: "Jó 12:4-6,16,24-25 • a resposta em que Jó tira a sabedoria dos amigos e a devolve a Deus",
      text: "\"Eu sou motivo de riso para os meus amigos... o justo e perfeito serve de zombaria\" (Jó 12:4). Em seguida vem a imagem mais precisa que o livro faz da crueldade dos confortáveis: \"Tocha desprezível é, na opinião do que está descansado, aquele que está pronto a vacilar com os pés\" (12:5). E o mundo, visto do monturo, está de cabeça para baixo (12:6). Depois Jó leva o argumento ao extremo: \"seu é o que erra e o que o faz errar\" (12:16), com chefes de povos a apalpar nas trevas (12:24-25) — a cegueira que Elifaz reservava aos astutos (5:14).",
    },
    mulherComum: {
      title: "A mulher das nações que Deus multiplica e faz perecer, dispersa e de novo reconduz",
      subtitle: "Jó 12:23 • o povo inteiro como figura de um só verbo",
      text: "\"Multiplica as nações e as faz perecer; dispersa as nações, e de novo as reconduz\" (Jó 12:23). Quatro verbos, e cada um é a vida inteira de milhares de famílias: crescer, acabar, ser espalhado, ser trazido de volta. A figura em cena é a gente comum a quem essas coisas acontecem sem que ninguém lhe pergunte nada. Jó usa a história dos povos como prova contra a doutrina dos amigos: se o destino de nações sobe e desce assim, não se pode ler a sorte de um homem como boletim do seu caráter. Nas mãos dele, a lista não é consolo.",
    },
    pastor: {
      title: "O pastor que ouve o que as alimárias ensinam, e o que sabe que a alma de tudo quanto vive está na mão do Senhor",
      subtitle: "Jó 12:7-10 • \"pergunta agora às alimárias, e cada uma delas te ensinará\"",
      text: "\"Mas, pergunta agora às alimárias, e cada uma delas te ensinará; e às aves dos céus, e elas te farão saber\" (Jó 12:7). É a resposta mais irônica que Jó dá aos amigos: aquilo que vocês me ensinam com tanto empenho, qualquer bicho já sabe. O pastor em cena passa a vida entre esses professores e sabe a lição sem discurso: \"Na sua mão está a alma de tudo quanto vive\" (12:10). É a escola a que Provérbios manda o preguiçoso (Pv 6:6) e a que Deus abrirá em pessoa nos capítulos 38—41. A diferença é o resultado: ali, os bichos calam a boca dele (40:4).",
    },
    rebanho: {
      title: "As alimárias a que Jó manda perguntar e tudo quanto vive, cuja alma está na mão do Senhor",
      subtitle: "Jó 12:7,10 • os animais como testemunhas de acusação contra os três amigos",
      text: "\"Pergunta agora às alimárias, e cada uma delas te ensinará\" (Jó 12:7). O rebanho em cena não é cenário: é o corpo de testemunhas que Jó convoca. Ele acaba de ouvir três discursos sobre como Deus governa o mundo e responde que essa informação está disponível em qualquer pasto. E o versículo que fecha a convocação é dos mais amplos da Escritura: \"Na sua mão está a alma de tudo quanto vive, e o espírito de toda a carne humana\" (12:10). Aqui ele usa os bichos para vencer uma discussão; nos capítulos 38—41, os bichos vencerão a discussão dele.",
    },
    rei: {
      title: "O rei cuja autoridade Deus solta e a quem ata o cinto aos lombos, o príncipe sobre quem se derrama desprezo e o chefe dos povos a quem se tira o entendimento",
      subtitle: "Jó 12:18,21,24 • a corte inteira desmontada em três versículos",
      text: "\"Solta a autoridade dos reis, e ata o cinto aos seus lombos\" (Jó 12:18). O verso é uma troca de roupa: tira-se a faixa de comando e amarra-se aos rins a tanga do cativo — o mesmo homem, de manhã no trono, à tarde na corda. \"afrouxa o cinto dos fortes\" (12:21) é desarmar o guerreiro, porque era nele que ia a espada. E o fim da lista é o pior: chefes de povos esvaziados por dentro e postos a vaguear \"pelos desertos, sem caminho\" (12:24), como Nabucodonosor em Dn 4:25. Jó não celebra isso: mostra aos amigos que esse Deus não consulta a doutrina de ninguém.",
    },
    servo: {
      title: "O servo do arraial dos que provocam a Deus e estão seguros, o que ata o cinto aos lombos do rei destronado e o morador da casa que Deus derruba e ninguém há que edifique",
      subtitle: "Jó 12:6,14,18 • as mãos dentro das imagens da resposta de Jó",
      text: "\"As tendas dos assoladores têm descanso, e os que provocam a Deus estão seguros\" (Jó 12:6). O primeiro servo em cena é o que trabalha nesse acampamento: arruma o saque e dorme tranquilo num arraial de gente que vive de destruir os outros — a prova viva de que a conta dos amigos não fecha. O segundo é o que \"ata o cinto\" aos lombos do rei destronado (12:18): alguém tem de amarrar a corda, e é sempre um servo. O terceiro está debaixo de escombros: \"ele derruba, e ninguém há que edifique\" (12:14) — a mesma casa caída de 1:19.",
    },
  },

  // ----------------------------------------------------------------- Jó 13
  13: {
    anciao: {
      title: "Os inventores de mentiras e os médicos que não valem nada: os que contendem por Deus fazendo acepção da sua pessoa, e o escrivão que escreve contra Jó coisas amargas",
      subtitle: "Jó 13:4,7-10,26 • a repreensão de Jó aos três amigos, e a queixa que ele leva a Deus",
      text: "\"Vós, porém, sois inventores de mentiras, e vós todos médicos que não valem nada\" (Jó 13:4). É a sentença mais famosa que Jó pronuncia contra os amigos, e julga-os no ofício que eles escolheram: vieram consolar e receitaram veneno. Em seguida diz por que a defesa que fazem de Deus é ímpia: \"Fareis acepção da sua pessoa? Contendereis por Deus?\" (13:8) — puxam o processo para o lado do mais forte, como advogados que sabem quem paga. E o aviso cumpre-se à letra em 42:7. Ele não pede absolvição barata; pede o auto, para poder responder (13:26).",
    },
    homem: {
      title: "O hipócrita que não virá perante ele, no versículo em que Jó aposta a vida em Deus",
      subtitle: "Jó 13:15-16 • \"Ainda que ele me mate, nele esperarei\"",
      text: "\"Ainda que ele me mate, nele esperarei; contudo os meus caminhos defenderei diante dele... porém o hipócrita não virá perante ele\" (Jó 13:15-16). É o ponto mais alto do bloco, e as duas metades andam juntas: Jó não desiste de discutir com Deus, mas o único a quem confia o desfecho é o próprio Deus com quem discute. A figura em cena é o contraste que ele escolhe — o homem de dois rostos, que jamais se aproximaria de um tribunal onde tudo é sabido. Jó está a dizer: o meu desejo de comparecer é a minha defesa (13:18).",
    },
    servo: {
      title: "O guarda que põe os pés de Jó no tronco e marca os sinais dos seus passos",
      subtitle: "Jó 13:27 • a vigilância descrita como carceragem",
      text: "\"Também pões os meus pés no tronco, e observas todos os meus caminhos, e marcas os sinais dos meus pés\" (Jó 13:27). O tronco é o cepo em que se prendiam os pés do preso — o de Jeremias (Jr 20:2) e o de Paulo e Silas em Filipos (At 16:24). O servo em cena é o carcereiro que fecha a madeira e depois confere as marcas de quem não pode ir a lugar nenhum. Jó usa a imagem para descrever o cuidado de Deus pelo avesso: o que no Salmo 139:2 é consolo, aqui é sentinela sobre um homem imobilizado, e ninguém lhe diz do que é acusado.",
    },
  },

  // ----------------------------------------------------------------- Jó 14
  14: {
    homem: {
      title: "O homem nascido da mulher, que sai como a flor e murcha e foge como a sombra; o lenhador diante da árvore cortada que ainda se renova; e o que se deita e não se levanta até que não haja mais céus",
      subtitle: "Jó 14:1-2,7-12 • o capítulo em que Jó pergunta se, morrendo o homem, tornará a viver",
      text: "\"O homem, nascido da mulher, é de poucos dias e farto de inquietação. Sai como a flor, e murcha; foge também como a sombra\" (Jó 14:1-2). Duas imagens, e nenhuma dura até o fim do dia (Is 40:6; Sl 102:11). Contra isso Jó põe o cepo: \"há esperança para a árvore que, se for cortada, ainda se renovará... ao cheiro das águas brotará\" (14:7-9). A árvore tem uma segunda chance que o homem não tem (14:10,12). E no meio da negativa escapa a pergunta que a Escritura levaria séculos a responder: \"Morrendo o homem, porventura tornará a viver?\" (14:14; cf. Dn 12:2).",
    },
    mulherComum: {
      title: "A mulher de quem nasce o homem de poucos dias e farto de inquietação",
      subtitle: "Jó 14:1,4 • a origem que o capítulo põe no primeiro verso",
      text: "\"O homem, nascido da mulher, é de poucos dias e farto de inquietação\" (Jó 14:1). A expressão atravessa o livro sempre com o mesmo peso (15:14; 25:4), e não é desprezo pela mãe: é a maneira antiga de dizer HOMEM, criatura que veio ao mundo por parto e está no relógio desde o primeiro minuto. Dela Jó tira a pergunta da impureza herdada: \"Quem do imundo tirará o puro? Ninguém\" (14:4) — a mesma linha de Sl 51:5, que Paulo desata pelo outro lado ao escrever que Deus \"enviou seu Filho, nascido de mulher\" (Gl 4:4).",
    },
    multidao: {
      title: "O povo de Uz que honra os filhos de um homem sem que ele o saiba",
      subtitle: "Jó 14:21 • a praça vista por quem já morreu",
      text: "\"Os seus filhos recebem honra, sem que ele o saiba; são humilhados, sem que ele o perceba\" (Jó 14:21). O quadro é a praça em dia de acontecimento — um filho a subir na estima de todos, ou a cair na vergonha de todos — e um pai que já não está lá para ver. Jó diz o que a morte tira além da vida: tira a notícia. E há uma dor escondida na escolha da imagem: quem fala é um homem cujos dez filhos morreram antes dele (1:18-19). É esta multidão indiferente que dá a medida do isolamento em que o livro o deixa.",
    },
    servo: {
      title: "O jornaleiro que espera o contentamento do seu dia, o oleiro da obra de tuas mãos, o guarda que amontoa os sacos das iniquidades, o oficial que conta os passos e o coveiro do homem consumido",
      subtitle: "Jó 14:6,10,15-17 • os ofícios em que Jó traduz o trato de Deus com ele",
      text: "\"Desvia-te dele, para que tenha repouso, até que, como o jornaleiro, tenha contentamento no seu dia\" (Jó 14:6). Volta o diarista do capítulo 7, agora pelo lado do descanso: tudo o que Jó pede é o fim do turno (Dt 24:15). Ao lado está o oleiro, na única frase carinhosa do capítulo: \"terias afeto à obra de tuas mãos\" (14:15; cf. Is 64:8). Depois o quadro endurece em dois servos de repartição: o guarda dos sacos lacrados das iniquidades (14:17) e o fiscal que conta os passos (14:16). E no fim da fila, o coveiro (14:10).",
    },
  },
};
