// Fichas ESPECÍFICAS por (capítulo → papel) de NEEMIAS 1–7.
// Sete capítulos que começam num corredor de palácio persa e acabam numa cidade
// larga de espaço com pouco povo dentro dela. Não há voz do céu em nenhum
// versículo: Deus não fala uma única vez em todo o livro, e a providência
// aparece só na frase que o copeiro repete — "segundo a boa mão de Deus sobre
// mim" (Ne 2:8). O perigo da ficha aqui é o capítulo 3, que parece lista de
// nomes e é um MAPA DE OFÍCIOS dando a volta ao muro, porta a porta: o sumo
// sacerdote na porta do gado, os filhos de Hassenaá com as fechaduras e os
// ferrolhos, os nobres dos tecoítas que não submeteram a cerviz, o ourives, o
// boticário, Salum e as suas filhas, os netineus de Ofel, os mercadores da
// subida da esquina. Cada versículo tem a sua ferramenta, e a ficha tem de
// dizer qual é.
import type { StageInfo } from "@/lib/rpgStageInfo";

export const CHAPTER_ACTORS_01_07: Record<number, Record<string, StageInfo>> = {
  // ---------------------------------------------------------------- Ne 1
  1: {
    homem: {
      title: "O guarda da porta da fortaleza de Susã, os homens de Judá que chegaram com Hanani, e o sobrevivente do cativeiro que ficou lá na província",
      subtitle: "Ne 1:1-3 • o mês de Quislev em Susã, e a notícia que veio pela estrada",
      text: "\"E sucedeu no mês de Quislev, no ano vigésimo, estando eu em Susã, a fortaleza\" (Ne 1:1) — é inverno, e o lugar é o mesmo palácio de Assuero (Et 1:2). O guarda desta porta vê passar uma caravana pequena e empoeirada, gente que gastou quatro meses de estrada. O que o copeiro pergunta não é sobre o templo, que já estava de pé havia setenta anos: pergunta \"pelos judeus que escaparam\" (Ne 1:2). E a resposta é a frase que põe o livro em movimento: \"o muro de Jerusalém fendido e as suas portas queimadas a fogo\" (Ne 1:3).",
    },
    mulherComum: {
      title: "A mulher que restou na província de Judá, entre os que escaparam do cativeiro",
      subtitle: "Ne 1:3 • do outro lado da notícia, na cidade que não tem porta que se feche",
      text: "\"Os restantes, que ficaram do cativeiro, lá na província estão em grande miséria e desprezo\" (Ne 1:3). Ela é o rosto dessa frase. Viver sem muro, no mundo antigo, não é estética: é acordar todas as noites sabendo que qualquer bando de Samaria ou de Amom entra sem encontrar porta. Ao mesmo tempo, a promessa guardada para esta cidade partia justamente da falta de muro: \"Jerusalém será habitada como as aldeias sem muros... Pois eu, diz o Senhor, serei para ela um muro de fogo em redor\" (Zc 2:4-5). Ela é quem espera nesse meio.",
    },
    servo: {
      title: "O servo do paço de Susã e o segundo dos homens de Judá que subiram com Hanani",
      subtitle: "Ne 1:1-2,11 • o corredor persa onde servia o copeiro do rei",
      text: "\"Estando eu em Susã, a fortaleza\" (Ne 1:1): quem trabalha aqui trabalha dentro da capital de inverno do maior império que o mundo tinha visto, e a última linha do capítulo diz o ofício do narrador sem alarde nenhum — \"Então era eu copeiro do rei\" (Ne 1:11). O servo desta cena é do mesmo corredor: acende as lâmpadas, abre as portas dos aposentos, e vê um funcionário judeu sentar-se no chão e chorar (Ne 1:4). O outro servo não é persa: é um dos homens que vieram de Judá com Hanani, acabado de descer da estrada com a notícia da cidade aberta na boca.",
    },
  },

  // ---------------------------------------------------------------- Ne 2
  2: {
    anciao: {
      title: "Os governadores dalém do rio que receberam as cartas, e os sacerdotes, os nobres e os magistrados de Jerusalém a quem Neemias ainda não tinha declarado coisa alguma",
      subtitle: "Ne 2:7-9,16 • a estrada da Síria e os três dias calados dentro da cidade",
      text: "Há dois tipos de autoridade neste capítulo, e nenhuma sabe o que se passa. Do lado de fora estão os governadores da satrapia, a quem Neemias entrega as cartas do rei (Ne 2:9). Do lado de dentro estão os chefes de Jerusalém, e a ficha deles é o silêncio: \"não souberam os magistrados aonde eu fora nem o que eu fazia\" (Ne 2:16). Três dias de boca fechada numa cidade pequena onde toda a gente se conhece. Só depois de ter visto a ruína é que ele fala — e não começa por ordem, começa por diagnóstico partilhado: \"Bem vedes vós a miséria em que estamos\" (Ne 2:17).",
    },
    cavaleiro: {
      title: "O cavaleiro da escolta que o rei Artaxerxes enviou com Neemias",
      subtitle: "Ne 2:9 • a coluna persa que sobe pela estrada, com as cartas na mão",
      text: "\"E o rei tinha enviado comigo capitães do exército e cavaleiros\" (Ne 2:9). É um detalhe que Neemias regista e Esdras registou pelo contrário: quando o escriba subiu, envergonhou-se de pedir escolta (Ed 8:22). Não é contradição, é ofício: Esdras subiu como sacerdote com uma oferta de prata, Neemias sobe como funcionário do império com uma comissão administrativa. A cavalaria também serve de recado — quem vir esta coluna entrar em Jerusalém entende que o homem que a comanda traz a assinatura de Artaxerxes atrás de si (Ne 2:10).",
    },
    homem: {
      title: "Asafe, guarda da floresta do rei, o capitão do exército de Artaxerxes, o vigia do alto de Sambalate, o morador que recebeu Neemias, os poucos homens da ronda noturna e o judeu que disse Levantemo-nos, e edifiquemos",
      subtitle: "Ne 2:8-18 • da floresta real até a praça de Jerusalém, passando por uma noite às escuras",
      text: "O capítulo começa em papelada e acaba em mãos calejadas. Primeiro há Asafe, o guarda da floresta real sem o qual não haveria portas, e o versículo fecha com a única teologia que este livro se permite: \"E o rei mas deu, segundo a boa mão de Deus sobre mim\" (Ne 2:8). Depois, dentro da cidade, três dias de silêncio e então a ronda: \"de noite me levantei, eu e poucos homens comigo, e não declarei a ninguém o que o meu Deus me pôs no coração\" (Ne 2:12), até o entulho vencer a montaria (Ne 2:14). No fim, a praça: \"Levantemo-nos, e edifiquemos\" (Ne 2:18).",
    },
    mulherComum: {
      title: "A rainha assentada junto ao rei quando Neemias pediu para ir a Judá",
      subtitle: "Ne 2:6 • a única mulher da sala em que se decide a reconstrução de Jerusalém",
      text: "\"Então o rei me disse, estando a rainha assentada junto a ele: Quanto durará a tua viagem, e quando voltarás?\" (Ne 2:6). Meia linha, e Neemias não a deixou cair: a rainha presente indica que não é audiência de trono cheio, é refeição, círculo íntimo. Ele acabara de temer sobremaneira e de orar no meio da frase — \"E o rei me disse: Que me pedes agora? Então orei ao Deus dos céus\" (Ne 2:4), a oração mais curta da Escritura, feita de olhos abertos. O que sai da sala é uma data, que o livro contará depois: doze anos (Ne 5:14).",
    },
    multidao: {
      title: "O povo de Jerusalém que ouviu o relato e esforçou as suas mãos para o bem",
      subtitle: "Ne 2:17-18 • a praça em que a cidade decide levantar-se",
      text: "\"Bem vedes vós a miséria em que estamos, que Jerusalém está assolada... vinde, pois, e reedifiquemos o muro de Jerusalém, e não sejamos mais um opróbrio\" (Ne 2:17). Repare em quantas vezes ele diz \"nós\": não veio de Susã dizer a esta gente o que devia ter feito, veio pôr-se dentro da vergonha dela. E o argumento não é estratégico, é biográfico: primeiro a mão de Deus, depois a autorização do império, nessa ordem (Ne 2:18). A resposta é uma frase de duas palavras e um gesto: \"Levantemo-nos, e edifiquemos. E esforçaram as suas mãos para o bem\".",
    },
    servo: {
      title: "O servo que serviu o vinho no banquete de Artaxerxes, o escriba das cartas do rei, o lenhador e o carregador da floresta real, Tobias o servo amonita, e o segundo homem da ronda noturna",
      subtitle: "Ne 2:1-12 • as mãos que servem, escrevem, cortam, carregam e conspiram",
      text: "\"Estava posto vinho diante dele, e eu peguei o vinho e o dei ao rei; porém eu nunca estivera triste diante dele\" (Ne 2:1). Quatro meses depois de Quislev, o copeiro faz o gesto de sempre — e desta vez deixa o rosto trair-se, o que num paço persa é indisciplina grave (Ne 2:2). Ao lado dele há a criadagem do banquete, o escrivão que lavra as cartas, e na floresta real o lenhador que serra madeira sem fazer ideia do que está a cortar. E há um servo que não serve: \"Tobias, o servo amonita\" (Ne 2:10), chamado assim com desprezo calculado.",
    },
  },

  // ---------------------------------------------------------------- Ne 3
  3: {
    anciao: {
      title: "Eliasibe e os seus irmãos sacerdotes na porta do gado, os nobres dos tecoítas que não submeteram a cerviz, Reum filho de Bani, os sacerdotes da campina e os sacerdotes da porta dos cavalos",
      subtitle: "Ne 3:1,5,17,22,28 • a volta do muro vista do lado de quem manda",
      text: "A obra abre pelo mais alto: \"levantou-se Eliasibe, o sumo sacerdote, com os seus irmãos, os sacerdotes\" (Ne 3:1) — e é também um aviso, porque o mesmo Eliasibe vai aparecer no capítulo 13 a preparar uma câmara para Tobias. Onze versículos depois vem a única nota de vergonha da lista: \"os tecoítas; porém os seus nobres não submeteram a cerviz ao serviço de seu Senhor\" (Ne 3:5). Os homens de Tecoa trabalharam duas vezes; os fidalgos deles não desceram do lugar — e o Espírito Santo mandou escrever isso, com nome de cidade, para sempre.",
    },
    homem: {
      title: "Zacur filho de Imri, os filhos de Hassenaá na porta do peixe, Uziel dos ourives, Hananias filho de um dos boticários, Salum e as suas filhas, Malquias na torre dos fornos, Semaías guarda da porta oriental, os ourives e os mercadores da subida da esquina",
      subtitle: "Ne 3:2-32 • o mapa dos ofícios dando a volta à cidade, porta a porta",
      text: "Este capítulo não é uma lista de nomes: é uma planta da cidade com o ofício de cada mão. Os filhos de Hassenaá na porta do peixe, \"a qual emadeiraram, e levantaram as suas portas com as suas fechaduras e os seus ferrolhos\" (Ne 3:3). Depois dois artesãos que ninguém esperaria num andaime: \"Uziel, filho de Haraías, um dos ourives; e ao seu lado... Hananias, filho de um dos boticários\" (Ne 3:8). Baruque é o único de quem se diz COMO trabalhou: \"reparou com grande ardor\" (Ne 3:20). E o circuito fecha exatamente onde o sumo sacerdote o abriu (Ne 3:32).",
    },
    mulherComum: {
      title: "As filhas de Salum, filho de Haloés, que repararam o muro com o pai — e as moradoras das casas defronte das quais os homens trabalhavam",
      subtitle: "Ne 3:10,12,23 • o único lugar da Bíblia em que filhas aparecem a levantar um muro",
      text: "\"E ao seu lado reparou Salum, filho de Haloés, líder da outra meia parte de Jerusalém, ele e suas filhas\" (Ne 3:12). Três palavras sem paralelo em toda a Escritura: mulheres nomeadas dentro de um relatório de obra, na mesma fórmula com que o texto nomeia todos os outros. O capítulo tem ainda um segundo tipo de mulher, a de quem trabalha à sua própria porta — \"defronte de sua casa e ao seu lado reparou Hatus\" (Ne 3:10). Quem mora ali cozinha para o canteiro e vê o muro subir a três passos da janela. É a estratégia de Neemias em uma linha.",
    },
    multidao: {
      title: "O povo que fechou a volta inteira do muro, de porta em porta, até à câmara do canto",
      subtitle: "Ne 3:32 • o circuito completo, visto de cima",
      text: "O capítulo 3 tem mais de quarenta trechos de obra, e a sua estrutura é geográfica: começa na porta do gado, ao norte, roda pela porta do peixe, pelo muro largo, pela torre dos fornos, pela porta do vale, do monturo, da fonte, das águas, dos cavalos, e fecha onde tinha aberto (Ne 3:32). Ninguém edificou o muro; cada um edificou o seu bocado, e a soma dos bocados é que fez o muro. Estão ali sacerdotes, levitas, ourives, perfumistas, mercadores, gente de Jericó, de Tecoa, de Gibeom, de Mizpá — cidades inteiras a mandar turmas. É a razão pela qual cinquenta e dois dias chegaram.",
    },
    servo: {
      title: "Os carregadores de pedra e de madeira de cada porta, os aprendizes dos ourives, os levitas de Queila, o guarda da casa das armas, os netineus que habitavam em Ofel e o servidor do templo junto aos mercadores",
      subtitle: "Ne 3:1-31 • as costas em que o muro subiu",
      text: "Por trás de cada nome do capítulo há duas ou três pessoas sem nome nenhum, e o texto deixa-as ver pelo que carregam: cada porta traz a mesma fórmula técnica (Ne 3:3,6,13,14,15), e isso significa toras da floresta do rei, ferragem quente e homens de escada. Os levitas aparecem como turma de carga (Ne 3:17-18). E há os netineus, os \"dados\" ao serviço da casa de Deus, cuja aldeia o versículo situa com precisão: \"os servidores do templo que habitavam em Ofel\" (Ne 3:26). Tiravam água e rachavam lenha desde Josué (Js 9:27) — e agora assentam pedra.",
    },
  },

  // ---------------------------------------------------------------- Ne 4
  4: {
    anciao: {
      title: "Os nobres e os magistrados de Judá a quem Neemias disse Não os temais, e os líderes que ficavam por detrás de toda a casa de Judá",
      subtitle: "Ne 4:14,16,19 • a chefia que deixa de estar à frente e passa a estar atrás",
      text: "O capítulo tem duas falas dirigidas a estes homens, e as duas os tiram do lugar confortável. A primeira: \"Não os temais; lembrai-vos do grande e terrível Senhor, e pelejai pelos vossos irmãos, vossos filhos, vossas mulheres e vossas casas\" (Ne 4:14) — primeiro lembrar quem é Deus, depois pelejar pelo que é concreto. A segunda é a lição de comando: \"os líderes estavam por detrás de toda a casa de Judá\" (Ne 4:16). Retaguarda, não vanguarda: o chefe fica onde consegue ver a linha inteira e acudir ao ponto que ceder (Ne 4:19).",
    },
    homem: {
      title: "Os soldados do exército de Samaria diante de quem Sambalate escarneceu, os árabes, amonitas e asdoditas que se ligaram entre si, Judá que disse Já desfaleceram as forças, e o edificador que numa das mãos fazia a obra e na outra tinha as armas",
      subtitle: "Ne 4:2-23 • a zombaria, o desânimo de dentro e a espada cingida aos lombos",
      text: "O ataque começa por palavras, e diante de plateia: \"Que fazem estes fracos judeus?... Vivificarão dos montões do pó as pedras que foram queimadas?\" (Ne 4:2), e Tobias remata com a piada da raposa (Ne 4:3). Depois a zombaria vira conspiração de quatro frentes (Ne 4:7-8). Mas o golpe mais perigoso vem de dentro: \"Já desfaleceram as forças dos carregadores, e o pó é muito, e nós não poderemos edificar o muro\" (Ne 4:10). A resposta não é um discurso, é uma reorganização: \"cada um com uma das mãos fazia a obra e na outra tinha as armas\" (Ne 4:17).",
    },
    mulherComum: {
      title: "A mulher das aldeias que veio avisar dez vezes, e a mulher por quem se manda pelejar no muro",
      subtitle: "Ne 4:12,14 • quem trouxe o aviso e por quem se pega em armas",
      text: "Há duas mulheres neste capítulo e as duas estão no centro da defesa. A primeira vive fora, no meio dos inimigos, e faz a viagem para avisar: \"vindo os judeus que habitavam entre eles, dez vezes nos disseram: De todos os lugares, tornarão contra nós\" (Ne 4:12). Dez vezes — é uma rede de gente das aldeias que atravessa território hostil. A segunda está na frase gritada aos nobres: \"pelejai pelos vossos irmãos, vossos filhos, vossas mulheres e vossas casas\" (Ne 4:14). Ele podia ter dito \"pela cidade\"; disse quatro palavras concretas, três delas dentro de casa.",
    },
    servo: {
      title: "Os carregadores cujas forças desfaleceram debaixo do pó, e os servos que ficaram em Jerusalém para servirem de guarda à noite e de dia na obra",
      subtitle: "Ne 4:10,22-23 • quem carrega o entulho e quem dorme vestido",
      text: "O trabalho mais duro do muro não é assentar pedra, é tirar pedra: cento e quarenta anos de ruína viraram \"montões do pó\" (Ne 4:2). É por isso que o desânimo tem nome de ofício: \"Já desfaleceram as forças dos carregadores\" (Ne 4:10). A resposta de Neemias tira a estes homens até a viagem para casa (Ne 4:22). E o versículo que fecha o capítulo é dos mais físicos da Escritura: \"nem eu, nem meus irmãos, nem meus servos... largávamos as nossas vestes; cada um tinha suas armas e água\" (Ne 4:23). O governador dorme igual ao carregador.",
    },
  },

  // ---------------------------------------------------------------- Ne 5
  5: {
    anciao: {
      title: "Os nobres e os magistrados usurários com quem Neemias pelejou, os sacerdotes que tomaram o juramento, e os cento e cinquenta homens que comiam à mesa do governador",
      subtitle: "Ne 5:7,12,17 • o único capítulo em que o inimigo é de dentro",
      text: "O cerco é externo em todo o livro — menos aqui. \"Pelejei com os nobres e com os magistrados, e disse-lhes: Sois usurários cada um para com seu irmão. E convoquei contra eles uma grande assembléia\" (Ne 5:7). O crime não é técnico, é familiar: emprestar a juro ao próprio irmão. Diante da assembleia inteira eles calam-se (Ne 5:8), e a restituição é jurada perante quem tem de a registar (Ne 5:12). O mesmo estrato reaparece doze versículos adiante do outro lado da mesa (Ne 5:17), comendo à custa de um governador que se recusou a cobrar-lhes o pão do governo.",
    },
    homem: {
      title: "O pai de família que empenhou as terras, as vinhas e a casa por trigo, o que tomou emprestado para o tributo do rei, o credor que ficou com a herança do irmão e o judeu que fora resgatado das nações",
      subtitle: "Ne 5:1-11 • o clamor do povo contra os seus irmãos judeus",
      text: "\"Foi, porém, grande o clamor do povo e de suas mulheres, contra os judeus, seus irmãos\" (Ne 5:1). Seguem-se três queixas em degraus: a fome pura (Ne 5:2), a hipoteca das terras e das casas (Ne 5:3) e o imposto persa, que não perdoa ano de seca (Ne 5:4). E o fundo do poço: \"sujeitamos nossos filhos e nossas filhas para serem servos\" (Ne 5:5). Neemias devolve-lhes o argumento que os condena: pagava-se resgate para tirar judeu de mão estrangeira enquanto se fabricavam escravos judeus dentro de casa (Ne 5:8). A ordem é devolver tudo no mesmo dia (Ne 5:11).",
    },
    mulherComum: {
      title: "As mulheres cujo clamor abriu o capítulo, a mãe dos filhos que eram muitos para o trigo, e a filha sujeita que já não estava no poder das mãos de seu pai",
      subtitle: "Ne 5:1-5,15 • a fome vista de dentro da casa",
      text: "\"Foi, porém, grande o clamor do povo e de suas mulheres\" (Ne 5:1). É o único lugar do livro em que as mulheres aparecem como parte declarada de um protesto — e faz sentido, porque a conta chega primeiro à cozinha: \"Nós, nossos filhos e nossas filhas, somos muitos; então tomemos trigo, para que comamos e vivamos\" (Ne 5:2). A frase mais dura do capítulo é sobre uma filha: \"até algumas de nossas filhas são tão sujeitas, que já não estão no poder de nossas mãos\" (Ne 5:5) — vendida por dívida, e sem possibilidade de resgate.",
    },
    multidao: {
      title: "A congregação que disse Amém e louvou ao Senhor quando Neemias sacudiu as suas vestes",
      subtitle: "Ne 5:13 • a grande assembleia no fim do julgamento dos usurários",
      text: "\"Também sacudi as minhas vestes, e disse: Assim sacuda Deus todo o homem da sua casa e do seu trabalho que não confirmar esta palavra... E toda a congregação disse: Amém! E louvaram ao Senhor; e o povo fez conforme a esta palavra\" (Ne 5:13). O gesto é um sinal profético em corpo — Paulo faria o mesmo em Corinto (At 18:6). O que torna a cena rara é a resposta: nem discussão, nem prazo, nem comissão. Um Amém coletivo, louvor, e execução. E há um governador que abriu mão do próprio salário antes de exigir seja o que for.",
    },
    rebanho: {
      title: "O boi e as seis ovelhas escolhidas que se preparavam cada dia para a mesa do governador",
      subtitle: "Ne 5:18 • a despesa que Neemias pagou do seu bolso durante doze anos",
      text: "\"E o que se preparava para cada dia era um boi e seis ovelhas escolhidas; também aves se me preparavam e, de dez em dez dias, muito vinho de todas as espécies; e nem por isso exigi o pão do governador, porquanto a servidão deste povo era grande\" (Ne 5:18). É o orçamento diário de uma casa que alimenta cento e cinquenta homens, e a conta corre doze anos seguidos (Ne 5:14). O direito do cargo era cobrar tudo isso ao povo, como os governadores anteriores faziam (Ne 5:15). Neemias não cobrou nada, e o capítulo fecha com o primeiro dos quatro pedidos que assinam o livro (Ne 5:19).",
    },
    rei: {
      title: "Os primeiros governadores, que foram antes de Neemias, e oprimiram o povo",
      subtitle: "Ne 5:15 • o cargo como ele era antes de mudar de mão",
      text: "\"Mas os primeiros governadores, que foram antes de mim, oprimiram o povo, e tomaram-lhe pão e vinho e, além disso, quarenta siclos de prata, como também os seus servos dominavam sobre o povo; porém eu assim não fiz, por causa do temor de Deus\" (Ne 5:15). É um retrato administrativo em três camadas: a subsistência da casa, a prata por cima, e a criadagem tiranizando por conta própria. A linha entre imposto e extorsão dependia inteiramente do homem que assinava. Neemias corta a corrente por um motivo dito em cinco palavras: \"por causa do temor de Deus\".",
    },
    servo: {
      title: "O moço que servia à mesa do governador e preparava o boi e as aves cada dia, o escrivão que lançava a dívida sobre as terras, e os servos de Neemias que se ajuntaram todos à obra do muro",
      subtitle: "Ne 5:4,14-18 • quem escritura a dívida e quem cozinha para cento e cinquenta",
      text: "Há três criadagens neste capítulo, e elas dizem tudo. A primeira é a do credor: alguém tem de lavrar o penhor das terras e cobrar o tributo do rei sobre elas (Ne 5:4) — a dívida não vive de memória, vive de papel. A segunda é a dos governadores anteriores, e o texto acusa-a: \"os seus servos dominavam sobre o povo\" (Ne 5:15). A terceira é a de Neemias, que cozinha para uma mesa que ele paga do bolso e vai para o andaime: \"terra nenhuma compramos; e todos os meus servos se ajuntaram ali à obra\" (Ne 5:16). Numa fome compra-se barato o campo do vizinho arruinado — e ele não comprou.",
    },
  },

  // ---------------------------------------------------------------- Ne 6
  6: {
    anciao: {
      title: "O sacerdote do adro que viu Neemias recusar entrar no templo, Secanias filho de Ará, sogro de Tobias, e os nobres de Judá que lhe escreviam cartas",
      subtitle: "Ne 6:11,17-18 • a rede de parentesco que atravessava o muro",
      text: "O capítulo mostra que a fronteira mais difícil de defender não era de pedra. \"Porque muitos em Judá lhe eram ajuramentados, porque era genro de Secanias filho de Ará; e seu filho Joanã se casara com a filha de Mesulão\" (Ne 6:18). O amonita é genro de um chefe de casa paterna do rol, e o filho dele casou com a filha de um homem que reparou duas porções do muro. Por isso as cartas correm nos dois sentidos (Ne 6:17). Do outro lado está o adro, onde um sacerdote vê Neemias recusar entrar: \"De maneira nenhuma entrarei\" (Ne 6:11).",
    },
    homem: {
      title: "Semaías filho de Delaías, que estava encerrado em casa e foi subornado para o atemorizar, os profetas alugados contra Neemias, o gentio que ouviu ler a carta aberta, e os chefes das nações em redor que se abateram muito a seus próprios olhos",
      subtitle: "Ne 6:6-16 • as cinco armadilhas, e o muro acabado em cinquenta e dois dias",
      text: "São cinco armadilhas em vinte versículos. Quatro convites para o vale de Ono, a um dia de Jerusalém e longe de socorro (Ne 6:2-4). Depois a carta ABERTA, panfleto lido em cada aldeia da estrada, com a única acusação capaz de parar a obra por decreto (Ne 6:6). Depois o profeta alugado que aconselha esconder-se no templo (Ne 6:10-12). Depois Noadia e os outros. E, no fim, o veredicto vem da boca de quem estava contra: \"reconheceram que o nosso Deus fizera esta obra\" (Ne 6:16).",
    },
    mulherComum: {
      title: "Noadia, a profetisa que procurou atemorizar Neemias, e a filha de Mesulão casada com o filho de Tobias",
      subtitle: "Ne 6:14,18 • duas mulheres do lado errado do muro",
      text: "\"Lembra-te, meu Deus, de Tobias e de Sambalate... e também da profetisa Noadia, e dos mais profetas que procuraram atemorizar-me\" (Ne 6:14). É tudo o que se sabe dela, e é muito: uma mulher com ofício profético reconhecido, no mesmo posto de Débora, de Hulda e de Ana, e a usá-lo para dizer a um governador que fuja. A segunda mulher é uma noiva: a filha de Mesulão, casada com o filho de Tobias (Ne 6:18). O pai dela reparou o muro em dois trechos; o sogro é quem zombava desse muro. Não há acusação nenhuma contra ela: ela é a prova de que a fronteira passava por dentro das famílias.",
    },
    multidao: {
      title: "O povo de Judá em cima do muro acabado, aos vinte e cinco dias do mês de Elul",
      subtitle: "Ne 6:15-16 • cinquenta e dois dias depois do primeiro cesto de entulho",
      text: "\"Acabou-se, pois, o muro aos vinte e cinco do mês de Elul; em cinqüenta e dois dias\" (Ne 6:15). Menos de dois meses para fechar o perímetro de uma cidade aberta havia cento e quarenta anos, com metade da mão de obra armada. O texto não celebra a engenharia: entrega o crédito na frase seguinte, e põe-na na boca dos adversários — \"temeram, e abateram-se muito a seus próprios olhos; porque reconheceram que o nosso Deus fizera esta obra\" (Ne 6:16). Quem faz a confissão de fé deste capítulo não é Judá em cima do muro: são os que estão em baixo a olhar.",
    },
    servo: {
      title: "Os mensageiros que foram e vieram quatro vezes ao vale de Ono, o moço que trouxe a carta aberta na sua mão, o escrivão do suborno e os portadores das cartas de Tobias",
      subtitle: "Ne 6:2-5,17-19 • as pernas e as mãos das cinco armadilhas",
      text: "Este capítulo é feito de correios. O convite ao vale de Ono volta \"do mesmo modo… quatro vezes\" (Ne 6:4), e quatro vezes um mensageiro desce a estrada com a mesma recusa. À quinta, o método muda: \"Sambalate ainda pela quinta vez me enviou seu servo com uma carta aberta na sua mão\" (Ne 6:5). ABERTA é o ponto: carta selada é diplomacia, carta aberta é panfleto que se lê em cada aldeia do caminho. E há os dois carteiros permanentes do capítulo, que levam cartas dos nobres de Judá a Tobias e trazem as respostas (Ne 6:17).",
    },
  },

  // ---------------------------------------------------------------- Ne 7
  7: {
    anciao: {
      title: "Os levitas estabelecidos no serviço da cidade, o escriba que leu o livro da genealogia dos que subiram primeiro, os chefes das casas paternas do rol, os sacerdotes de Jedaías, Imer, Pasur e Harim, o cantor de Asafe, o sacerdote chamado do nome de Barzilai e o governador que vedou as coisas sagradas",
      subtitle: "Ne 7:1-5,39-44,63-65,70-71 • o rolo achado dentro de uma cidade vazia",
      text: "Acabado o muro, o problema deixa de ser a pedra: \"era a cidade larga de espaço, e grande, porém pouco povo havia dentro dela; e ainda as casas não estavam edificadas\" (Ne 7:4). É deste vazio que nasce o capítulo: \"achei o livro da genealogia dos que subiram primeiro\" (Ne 7:5). Em Esdras 2 a lista era o manifesto de uma caravana que ia partir; aqui é um documento ACHADO, noventa anos depois, e lido para saber quem tem direito e obrigação de vir povoar a cidade. Por isso dói tanto o caso dos que não acharam o registo (Ne 7:64).",
    },
    homem: {
      title: "Hananias, líder da fortaleza, homem fiel e temente a Deus mais do que muitos, os moradores postos de guarda cada um diante da sua casa, os chefes das casas paternas do rol e o que subiu de Tel-Melá sem poder provar a linhagem",
      subtitle: "Ne 7:2-3,8-38,61-62 • quem guarda a cidade e quem consta do livro",
      text: "A primeira decisão depois do muro é de pessoal, e o critério está escrito: \"porque ele era homem fiel e temente a Deus, mais do que muitos\" (Ne 7:2). Não se diz competente nem corajoso. A ordem que ele recebe é de uma prudência quase paranoica: \"Não se abram as portas de Jerusalém até que o sol aqueça\" (Ne 7:3) — o costume era abrir de madrugada; aqui espera-se pela luz plena. E cada morador vira sentinela do seu próprio pedaço de rua. Depois entram os homens do rol, casa a casa e cidade a cidade — e, no fim, os que não puderam provar a linhagem (Ne 7:61).",
    },
    mulherComum: {
      title: "As mulheres das casas paternas do rol, a que havia de tirar água do poço do pátio, a que subia ao terraço por cobrir, as duzentas e quarenta e cinco cantoras e a filha de Barzilai, o gileadita",
      subtitle: "Ne 7:8-38,63,67 • as que hão de mudar para uma cidade sem casas edificadas",
      text: "A conta deste capítulo é declaradamente de homens, e as mulheres atravessam setenta versículos fora da soma — aparecem uma vez, por causa do ofício: \"tinham duzentos e quarenta e cinco cantores e cantoras\" (Ne 7:67). Mas o que muda tudo é o versículo 4: a cidade está larga, com pouco povo e \"ainda as casas não estavam edificadas\". Mudar-se para Jerusalém agora é ir viver num lote sem telhado e cobrir um terraço antes das chuvas. É a mulher da casa paterna quem faz essa mudança acontecer, e é ela que no capítulo 11 será sorteada para vir.",
    },
    multidao: {
      title: "A congregação de quarenta e dois mil trezentos e sessenta do rolo, e o povo que habitou nas suas cidades",
      subtitle: "Ne 7:66,73 • a soma lida em voz alta dentro de uma cidade quase vazia",
      text: "\"Toda esta congregação junta foi de quarenta e dois mil, trezentos e sessenta\" (Ne 7:66) — a mesma soma que Esdras dera, copiada de novo para que não se perdesse. É pouco: um povo que saíra do Egito com seiscentos mil homens de pé cabe agora numa cidade média. E o capítulo fecha onde o problema começa: \"habitaram... todo o Israel nas suas cidades\" (Ne 7:73). Nas SUAS cidades — quer dizer, não em Jerusalém. O muro está de pé e o interior continua vazio; é por isso que o capítulo 11 terá de lançar sortes.",
    },
    pastor: {
      title: "Os homens de Belém e de Netofa, os pastores das aldeias do planalto a oeste e os dos outeiros de Betel, que hão de subir a Jerusalém",
      subtitle: "Ne 7:26,29,32 • as aldeias de pasto que o rol conta uma a uma",
      text: "A partir do versículo 25 a lista muda de eixo: deixa de contar casas paternas e passa a contar LUGARES. \"Os homens de Belém e de Netofa, cento e oitenta e oito\" (Ne 7:26) — uma encosta de cevada e de pastos onde Rute respigou e de onde Samuel mandou chamar o filho mais novo de Jessé, o que faltava porque estava com as ovelhas. \"Os homens de Quiriate-Jearim, Quefira e Beerote, setecentos e quarenta e três\" (Ne 7:29): as três antigas cidades gibeonitas. O pastor destas linhas tem rebanho num campo herdado — e pode ser sorteado para o largar.",
    },
    servo: {
      title: "Os porteiros e os cantores estabelecidos sobre as portas, os setenta e quatro levitas de Jesuá e Cadmiel, os cento e trinta e oito porteiros das seis casas, os netineus nome por nome, os filhos dos servos de Salomão e os arrieiros dos seis mil setecentos e vinte jumentos",
      subtitle: "Ne 7:1,43-60,68-69 • a folha inteira do serviço da casa e da caravana",
      text: "\"Depois que o muro foi edificado, eu levantei as portas; e foram estabelecidos os porteiros, os cantores e os levitas\" (Ne 7:1). Repare na ordem: as portas primeiro, e logo os homens que as guardam e o coro que canta nelas. Depois vem o rol, e nele o buraco de sempre: setenta e quatro levitas (Ne 7:43) contra mais de quatro mil sacerdotes. Seguem-se os NETINEUS, os \"dados\" ao serviço, listados casa por casa durante onze versículos — gente cujos nomes ninguém decorava, e que o texto teve o cuidado de escrever.",
    },
  },
};
