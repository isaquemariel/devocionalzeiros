// Fichas ESPECÍFICAS por (capítulo → papel) de 1 CRÔNICAS 22–29.
// O fim do reinado de Davi é um canteiro de obras e um cartório: as pedras de
// cantaria e o cobre que não foi pesado, os levitas contados de trinta anos
// para cima, as vinte e quatro turmas dos sacerdotes sorteadas diante do rei,
// os duzentos e oitenta e oito cantores, os porteiros por portas, os tesouros,
// as doze turmas do exército, os mordomos da fazenda do rei, a planta do templo
// entregue por escrito, a oferta voluntária e a morte em boa velhice. Cada
// figurante anônimo é alguém REAL daquele capítulo — nunca "figura da cena".
import type { StageInfo } from "@/lib/rpgStageInfo";

export const CHAPTER_ACTORS_22_29: Record<number, Record<string, StageInfo>> = {
  // ---------------------------------------------------------------- 1Cr 22
  22: {
    anciao: {
      title: "Os príncipes de Israel encarregados de ajudar Salomão",
      subtitle: "1Cr 22:17-19 • as cabeças do povo intimadas a levantar o santuário",
      text: "\"E Davi deu ordem a todos os príncipes de Israel que ajudassem a Salomão, seu filho\" (1Cr 22:17): o velho rei não deixa a obra pendurada só no moço, e convoca as cabeças das tribos ao mesmo encargo. O argumento é histórico e teológico ao mesmo tempo — \"Porventura não está convosco o Senhor vosso Deus, e não vos deu repouso ao redor?\" (22:18). Por isso a ordem começa por dentro, não pelo tijolo: \"Disponde, pois, agora o vosso coração e a vossa alma para buscardes ao Senhor vosso Deus\" (22:19). E termina apontando o fim de toda a obra: que a arca se traga a esta casa.",
    },
    homem: {
      title: "Os cortadores de pedra estrangeiros, o ferreiro dos pregos e os que traziam o cedro do mar — e Ornã, o dono da eira",
      subtitle: "1Cr 22:2-4,15 • o canteiro de obras aberto sobre a eira comprada",
      text: "A primeira providência de Davi não é pedra, é gente: \"deu ordem Davi que se ajuntassem os estrangeiros que estavam na terra de Israel; e ordenou cortadores de pedras\" (1Cr 22:2) — os de fora que moravam entre Israel, postos a lavrar o santuário do Deus que os recebeu. Depois vem o metal, \"cobre em abundância, que não foi pesado\" (22:3), e o mar: \"os sidônios e tírios traziam a Davi madeira de cedro em abundância\" (22:4). No fim o pai mostra ao filho os obreiros que lhe deixa (22:15). O chão de tudo isso é a eira de Ornã, sobre a qual o rei declara: \"Esta será a casa do SENHOR Deus\" (22:1).",
    },
    servo: {
      title: "Os carregadores da cantaria, os aprendizes da forja, os carreteiros do cedro e os guardas do depósito",
      subtitle: "1Cr 22 • as mãos anônimas que empilham materiais em abundância antes da morte do rei",
      text: "Estes são os que carregam o que os mestres lavram: as pedras da pedreira ao pé do monte, os feixes de ferro para os pregos, e \"madeira de cedro sem conta\" (1Cr 22:4) puxada da costa até Jerusalém. O Cronista resume o trabalho de anos numa linha só: \"Assim preparou Davi materiais em abundância, antes da sua morte\" (22:5) — um velho gastando o fim da vida numa obra que sabe que não verá de pé. O depósito que guardam nem se pesa: \"Do ouro, da prata, e do cobre, e do ferro não há conta\" (22:16). Serviçais sem nome carregam o material de uma casa cujo nome durará para sempre.",
    },
  },

  // ---------------------------------------------------------------- 1Cr 23
  23: {
    anciao: {
      title: "Os chefes dos pais dos levitas, os contados de trinta anos e os seis mil oficiais e juízes",
      subtitle: "1Cr 23:3-5,24 • o recenseamento que reparte trinta e oito mil levitas em ofícios",
      text: "\"E foram contados os levitas de trinta anos para cima; e foi o número deles, segundo as suas cabeças, trinta e oito mil homens\" (1Cr 23:3) — a idade de Números 4:3, quando o levita entrava no serviço. Davi reparte esse exército sem espada em quatro frentes, e a segunda é judicial: \"vinte e quatro mil, para promoverem a obra da casa do Senhor, e seis mil oficiais e juízes\" (23:4). E o próprio critério muda dentro do capítulo, porque a arca já tinha lugar fixo: \"foram contados os filhos de Levi da idade de vinte anos para cima\" (23:27).",
    },
    homem: {
      title: "Os filhos de Levi casa por casa — Gérson, Coate e Merari — e os levitas postos na obra da casa",
      subtitle: "1Cr 23:6-23,28-32 • os nomes das três famílias e o serviço de cada manhã e cada tarde",
      text: "\"E Davi os repartiu por turnos, segundo os filhos de Levi, Gérson, Coate e Merari\" (1Cr 23:6), e o Cronista desce ao detalhe de cada casa (23:7,12,21). Nem as casas pequenas se perdem na lista: \"mas Jeús e Berias não tiveram muitos filhos; por isso estes, sendo contados juntos se tornaram uma só família\" (23:11) — Deus conta quem os censos humanos arredondariam. O trabalho desses homens é miúdo e diário (23:29,32). E o coração de tudo é a linha que institui o louvor contínuo de Israel: \"E para estarem cada manhã em pé para louvarem e celebrarem ao Senhor; e semelhantemente à tarde\" (23:30).",
    },
    mulherComum: {
      title: "As filhas de Eleazar, o merarita, casadas com os filhos de Quis",
      subtitle: "1Cr 23:22 • a casa sem herdeiro varão que não se perde em Israel",
      text: "\"E morreu Eleazar, e não teve filhos, porém filhas; e os filhos de Quis, seus parentes, as tomaram por mulheres\" (1Cr 23:22). Num rol de trinta e oito mil homens, o Cronista para para registrar umas moças: a casa de Eleazar acabaria ali, e o casamento com os primos a mantém dentro de Merari e dentro de Levi. É a mesma providência da lei sobre as filhas de Zelofeade (Nm 27:1-7; 36:6-9). Elas não ministram no altar, mas sem elas uma linhagem levítica inteira sumiria do registro — e o registro é o que garante, séculos depois, que se soubesse quem podia servir na casa de Deus (Ed 2:62).",
    },
    multidao: {
      title: "Os sacerdotes e levitas convocados — e os filhos de Reabias, que foram muitos",
      subtitle: "1Cr 23:2,17 • a assembleia do começo do capítulo e a casa que estourou o quadro",
      text: "No pórtico da cena está a convocação que abre o reinado novo: \"E reuniu a todos os príncipes de Israel, como também aos sacerdotes e levitas\" (1Cr 23:2) — Davi, já velho e cheio de dias, faz Salomão rei e no mesmo ato ajunta os que vão servir na casa. A segunda multidão é uma nota genealógica que vira retrato de graça: \"e Eliézer não teve outros filhos; porém os filhos de Reabias foram muitos\" (23:17). De um ramo estreitíssimo Deus fez uma casa numerosa. Diante desses milhares o rei declara o motivo de tudo: o SENHOR \"habitará em Jerusalém para sempre\" (23:25).",
    },
    servo: {
      title: "Os levitas do serviço miúdo: o escrivão do rol, os da purificação, os do peso e da medida e os do inventário dos tesouros",
      subtitle: "1Cr 23:26-32 • o que se faz quando o tabernáculo já não precisa ser carregado",
      text: "A grande mudança do capítulo é uma aposentadoria: \"E também, quanto aos levitas, que nunca mais levassem o tabernáculo, nem algum de seus aparelhos\" (1Cr 23:26). Os ombros que atravessaram o deserto ganham outro ofício, descrito sem romantismo: \"o seu cargo era assistir aos filhos de Arão no ministério da casa do Senhor, nos átrios, e nas câmaras\" e \"na purificação de todas as coisas sagradas\" (23:28). Servem a farinha e as sertãs — \"e para todo o peso e medida\" (23:29) —, ou seja, também a balança é ministério, porque casa de Deus com peso falso é contradição (Lv 19:35-36).",
    },
  },

  // ---------------------------------------------------------------- 1Cr 24
  24: {
    anciao: {
      title: "Zadoque e Aimeleque e os chefes das vinte e quatro turmas sacerdotais",
      subtitle: "1Cr 24:3-19 • as casas de Eleazar e de Itamar repartidas por sortes diante do rei",
      text: "\"E Davi, com Zadoque, dos filhos de Eleazar, e Aimeleque, dos filhos de Itamar, dividiu-os segundo o seu ofício no seu ministério\" (1Cr 24:3): a ordem do sacerdócio é organizada a partir dos dois ramos que sobreviveram a Nadabe e Abiú. O desequilíbrio entre as casas é dito sem disfarce (24:4), e a solução tira a divisão das mãos dos homens: \"E os repartiram por sortes\" (24:5). Vinte e quatro nomes saem em ordem (24:7-18). Mil anos depois um sacerdote velho ainda serviria por esse calendário — Zacarias, \"da ordem de Abias\" (Lc 1:5), a oitava sorte deste capítulo.",
    },
    homem: {
      title: "Semaías, o escrivão, os levitas restantes e a memória de Nadabe e Abiú",
      subtitle: "1Cr 24:2,6,20-31 • quem registra o sorteio e quem entra na lista depois dos sacerdotes",
      text: "O capítulo abre com uma sombra: \"E morreram Nadabe e Abiú antes de seu pai, e não tiveram filhos\" (1Cr 24:2) — o fogo estranho de Levítico 10 apagou dois quartos do sacerdócio de Arão. O homem que dá a este dia caráter de cartório é o escriba levita: \"E Semaías, filho de Natanael, o escrivão dentre os levitas, os registrou perante o rei\" (24:6). Depois dos sacerdotes vem \"o restante dos filhos de Levi\" (24:20), casa por casa. E a regra final do sorteio é uma pregação em si: \"assim fizeram, tanto os pais principais como os irmãos menores\" (24:31).",
    },
    multidao: {
      title: "Israel que sobe à casa do Senhor nas solenidades servidas por essas turmas",
      subtitle: "1Cr 24 • o povo para quem os vinte e quatro turnos existem",
      text: "A lista fria do capítulo só faz sentido por causa desta gente: as turmas foram sorteadas para que houvesse sacerdote de plantão em todo tempo, pois o ofício delas \"era entrar na casa do Senhor, segundo lhes fora ordenado por Arão seu pai\" (1Cr 24:19). É o povo das primícias e das cabanas, o que sobe com o dízimo e encontra alguém pronto a recebê-lo (23:31). Uma organização de cartório existe para que o adorador comum nunca chegue e ache o átrio vazio. E o rodízio impede o que arruinou a casa de Eli: nenhum clã se apossa do altar, e ninguém fica de fora dele.",
    },
    rebanho: {
      title: "Os cordeiros do holocausto contínuo e o gado das aldeias levíticas",
      subtitle: "1Cr 24 • o que as vinte e quatro turmas encontram no altar a cada turno",
      text: "As turmas não se revezavam para administrar papéis, mas para queimar sacrifício: o ofício de cada uma \"era entrar na casa do Senhor\" (1Cr 24:19), e o que ali as esperava era o cordeiro da manhã e o da tarde, o holocausto contínuo de Êxodo 29:38-39, reafirmado no capítulo anterior (23:31). O gado em cena é também o das aldeias dos próprios levitas, que não receberam herança de terra e viviam de cidades e arrabaldes com pasto (Nm 35:2-3). É a economia inteira do santuário no fundo do quadro: sem rebanho não há altar, e sem turma não há quem o sirva.",
    },
    servo: {
      title: "Os levitas do turno que entra e do turno que sai: a lenha, a cinza, o incenso e a lâmpada",
      subtitle: "1Cr 24 • o serviço que não aparece na lista, mas sustenta cada uma das vinte e quatro turmas",
      text: "Estes são os levitas que servem debaixo dos sacerdotes sorteados, e o Cronista já dissera o que fazem: assistir aos filhos de Arão \"nos átrios, e nas câmaras, e na purificação de todas as coisas sagradas\" (1Cr 23:28). Rachar a lenha, tirar a cinza, pesar as especiarias, encher a pia — tudo isso é o que faz uma turma poder \"entrar na casa do Senhor\" (24:19) e achar tudo pronto. Eles também foram sorteados, e no mesmo tribunal: \"Estes também lançaram sortes como seus irmãos, os filhos de Arão\" (24:31). O menor serviço recebeu o mesmo tipo de vocação que o maior.",
    },
  },

  // ---------------------------------------------------------------- 1Cr 25
  25: {
    anciao: {
      title: "Zadoque e o sacerdote do sacrifício da tarde, servidos pelo canto",
      subtitle: "1Cr 25 • os sacerdotes ao altar enquanto os cantores profetizam com instrumentos",
      text: "O canto deste capítulo não é concerto, é liturgia: acontece junto ao altar, no mesmo instante em que o sacerdote oferece. Davi \"separou para o ministério os filhos de Asafe, e de Hemã, e de Jedutum, para profetizarem com harpas, com címbalos, e com saltérios\" (1Cr 25:1), e a hora dessa profecia cantada é a hora fixa do sacrifício, cada manhã e \"semelhantemente à tarde\" (23:30). Por isso o oficiante em cena é peça da mesma ordem: enquanto ele levanta o holocausto, os duzentos e oitenta e oito levantam a voz, e Israel escuta a palavra de Deus em forma de música.",
    },
    homem: {
      title: "Asafe, Hemã e Jedutum e os seus filhos — os duzentos e oitenta e oito mestres do canto",
      subtitle: "1Cr 25:1-8 • os cantores que profetizavam com harpas, saltérios e címbalos",
      text: "\"E Davi, juntamente com os capitães do exército, separou para o ministério os filhos de Asafe, e de Hemã, e de Jedutum, para profetizarem com harpas, com címbalos, e com saltérios\" (1Cr 25:1) — o canto é chamado de profecia, e organizado com a seriedade de um exército. Cada casa tem o seu chefe (25:2-5). O número é dado com orgulho e com exigência: \"todos eles mestres, duzentos e oitenta e oito\" (25:7), pois na casa de Deus não bastava boa vontade. Doze nomes desses cantores encabeçam salmos do saltério: o que aqui é escala de turnos ficou sendo o hinário do povo de Deus.",
    },
    mulherComum: {
      title: "As três filhas de Hemã",
      subtitle: "1Cr 25:5 • as filhas do vidente do rei, contadas junto com os catorze filhos",
      text: "\"porque Deus dera a Hemã catorze filhos e três filhas\" (1Cr 25:5). A frase vem logo depois da razão do dom: Deus multiplicou a casa de Hemã em cumprimento de uma promessa feita ao vidente do rei, e o Cronista registra as filhas, embora só os filhos entrem na escala do canto. Numa lista inteira de turnos e sortes, é a única nota de família — a casa cheia como bênção concreta, do jeito que o salmo canta: \"Como flechas na mão de um homem poderoso, assim são os filhos da mocidade\" (Sl 127:4). Elas ficam do lado de fora do rol dos cantores e dentro da bênção que o rol celebra.",
    },
    multidao: {
      title: "Israel que enche o átrio quando os cantores servem",
      subtitle: "1Cr 25 • o povo das solenidades diante da música da casa do Senhor",
      text: "As vinte e quatro turmas de cantores existem para esta gente: eles estavam \"sob a direção de seu pai, para a música da casa do Senhor, com saltérios, címbalos e harpas\" (1Cr 25:6). É o povo que sobe às festas e ouve a palavra de Deus cantada por mestres, não improvisada. O Cronista escreve para uma geração que voltou do exílio com o templo em ruínas e precisava saber que o louvor de Israel tinha ordem, autoridade real e vocação divina. Quando enfim a casa ficou pronta, foi com esses instrumentos e com essa voz que a glória desceu (2Cr 5:13).",
    },
    servo: {
      title: "Os levitas da guarda da noite, os que atiçam o fogo da manhã e os que guardam os instrumentos",
      subtitle: "1Cr 25 • quem prepara o átrio para que a turma do canto entre",
      text: "Antes de qualquer harpa soar, alguém varreu o átrio, atiçou o fogo do altar para a oferta da manhã e tirou os saltérios e os címbalos da câmara onde ficavam guardados. É o serviço de que fala o capítulo anterior: assistir aos filhos de Arão \"nos átrios, e nas câmaras\" (1Cr 23:28), e estar de pé \"cada manhã\" para o louvor (23:30). Estes servos também foram sorteados, e pela regra mais igualitária do livro: \"E deitaram sortes acerca da guarda igualmente, assim o pequeno como o grande, o mestre juntamente com o discípulo\" (25:8).",
    },
  },

  // ---------------------------------------------------------------- 1Cr 26
  26: {
    anciao: {
      title: "Aías e Sebuel sobre os tesouros, Hosa, o merarita, e Quenanias, o izarita",
      subtitle: "1Cr 26:20-29 • os levitas postos sobre o dinheiro sagrado e sobre os negócios externos",
      text: "Depois das portas vêm os cofres, e o Cronista nomeia quem responde por eles: \"Aías tinha cargo dos tesouros da casa de Deus\" (1Cr 26:20), e \"Sebuel, filho de Gérson, o filho de Moisés, era o chefe dos tesouros\" (26:24) — um bisneto de Moisés guardando a arrecadação do santuário. Nem tudo é dentro do templo: \"Dos izaritas, Quenanias e seus filhos foram postos sobre Israel como oficiais e como juízes, dos negócios externos\" (26:29). Guardar tesouro e julgar causa é ministério tanto quanto queimar incenso: quem cuida do que é do Senhor responde diante do Senhor.",
    },
    homem: {
      title: "Os porteiros por portas: Meselemias e seus filhos, Obede-Edom e seus filhos, Hosa, Supim e Selomite dos tesouros",
      subtitle: "1Cr 26:1-19,26 • as sortes lançadas porta por porta na casa do Senhor",
      text: "As casas de porteiros são apresentadas pelo nome: \"Meselemias, filho de Coré, dos filhos de Asafe\" (1Cr 26:1); e a casa que a arca abençoou, cujo oitavo filho é registrado com a razão da fartura — \"Peuletai o oitavo; porque Deus o tinha abençoado\" (26:5). Dos netos de Obede-Edom diz-se \"que dominaram sobre a casa de seu pai; porque foram homens valentes\" (26:6): guardar porta em Israel exigia coragem, não só chave. A repartição é feita sem privilégio de idade — \"E lançaram sortes, assim os pequenos como os grandes... para cada porta\" (26:13).",
    },
    mulherComum: {
      title: "A mulher da casa de Obede-Edom",
      subtitle: "1Cr 26:4-8 • a casa onde a arca ficou três meses e que Deus encheu de filhos",
      text: "Ela é da família que hospedou a arca de Deus quando ninguém a queria depois da morte de Uzá: \"o Senhor abençoou a casa de Obede-Edom, e tudo quanto tinha\" (1Cr 13:14). A bênção não ficou no abstrato — o Cronista a conta em gente: oito filhos, netos valentes, \"ao todo sessenta e dois, de Obede-Edom\" (26:8), e diz por que: \"porque Deus o tinha abençoado\" (26:5). A mulher desta casa viu o pavor de três meses virar a maior família de porteiros de Israel: a presença de Deus, temida à distância, é bênção para quem a recebe em casa.",
    },
    multidao: {
      title: "Os sessenta e dois de Obede-Edom, os dezoito de Meselemias e Israel a ocidente do Jordão",
      subtitle: "1Cr 26:8-9,30 • as casas numerosas dos porteiros e o povo sob a superintendência dos hebronitas",
      text: "As duas casas de porteiros são contadas com nome e número: \"ao todo sessenta e dois, de Obede-Edom\" (1Cr 26:8), e \"os filhos e os irmãos de Meselemias, homens valentes, foram dezoito\" (26:9). Não é vaidade estatística — é a demonstração de que havia gente bastante para guardar cada porta em cada dia (26:17). A outra multidão está longe do templo: Hasabias e mil e setecentos hebronitas com superintendência sobre Israel \"além do Jordão para o ocidente, em toda a obra do Senhor, e para o serviço do rei\" (26:30). O reino inteiro entra debaixo de uma administração levítica.",
    },
    rebanho: {
      title: "O gado que sobe pela porta do sul e os rebanhos de além do Jordão",
      subtitle: "1Cr 26:15,30-32 • o dízimo e as ofertas que atravessam as portas guardadas",
      text: "Porteiro em Israel não guardava apenas homens: pelas portas do santuário subiam as reses do sacrifício e os produtos do dízimo, e por isso a sorte do sul veio acompanhada dos armazéns — \"E para Obede-Edom a do sul; e para seus filhos a casa dos depósitos\" (1Cr 26:15). Os rebanhos ao fundo do quadro são os das tribos do outro lado do rio, postas debaixo dos hebronitas \"para todos os negócios de Deus, e para todos os negócios do rei\" (26:32) — terra de pasto largo, escolhida por Rúben e Gade porque tinham muito gado (Nm 32:1).",
    },
    servo: {
      title: "Os levitas que abrem as portas, contam o despojo antigo e selam os caixotes do tesouro",
      subtitle: "1Cr 26:20-28 • as coisas dedicadas guardadas debaixo da mão de Selomite",
      text: "Estes são os levitas do turno prático: abrir a porta do oriente ao raiar do dia, receber o dízimo, conferir o que entra nos depósitos. O tesouro que manuseiam tem uma origem espantosa: \"Dos despojos das guerras dedicaram ofertas para repararem a casa do Senhor\" (1Cr 26:27) — o que se tomou em batalha volta como material de culto. E o inventário é uma pequena história de Israel em prata: \"tudo quanto tinha consagrado Samuel, o vidente, e Saul filho de Quis, e Abner filho de Ner, e Joabe filho de Zeruia\" (26:28). Deus guarda o que lhe foi dado, mesmo quando quem deu não terminou bem.",
    },
  },

  // ---------------------------------------------------------------- 1Cr 27
  27: {
    anciao: {
      title: "O conselho do rei: Zadoque e Abiatar, Aitofel, Husai e Jônatas, tio de Davi",
      subtitle: "1Cr 27:17,32-34 • os conselheiros e sacerdotes que fecham a lista do reino",
      text: "Depois dos exércitos e dos mordomos, o Cronista lista os homens que aconselham: \"E Jônatas, tio de Davi, era do conselho, homem entendido, e também escriba\" (1Cr 27:32), e ao lado dele o encarregado dos filhos do rei — havia preceptor para os príncipes. Sobre a casa sacerdotal está o de sempre: \"sobre os aronitas, Zadoque\" (27:17). E há um nome que traz uma ferida junto: \"E Aitofel era do conselho do rei; e Husai, o arquita, amigo do rei\" (27:33) — o conselheiro cujo parecer valia como palavra de Deus acabaria do lado de Absalão, enquanto o amigo do rei arruinou o conselho dele por fidelidade.",
    },
    cavaleiro: {
      title: "O cavaleiro da turma do primeiro mês",
      subtitle: "1Cr 27:1-3 • a milícia de vinte e quatro mil que servia mês a mês",
      text: "Ele pertence à primeira das doze turmas do exército de Davi, comandada por Jasobeão, \"chefe de todos os capitães dos exércitos, para o primeiro mês\" (1Cr 27:3), e o tamanho da tropa é dado logo na abertura: \"cada turma de vinte e quatro mil\" (27:1). Não é exército permanente de mercenários, e sim Israel inteiro em rodízio, \"de mês em mês\" (27:1) — onze meses o homem estava na lavoura, um mês estava sob armas. A montaria em cena lembra o limite que a lei punha ao trono: \"ele não multiplicará para si cavalos\" (Dt 17:16) — a lição que Salomão esqueceria (1Rs 10:26).",
    },
    homem: {
      title: "Os doze capitães das turmas mês a mês e os príncipes das tribos de Israel",
      subtitle: "1Cr 27:2-22 • Jasobeão, Dodai, Benaia, Asael e os líderes de cada tribo",
      text: "São os comandantes do calendário militar do reino, um para cada mês do ano, cada um sobre vinte e quatro mil homens (1Cr 27:1-15). Vários são conhecidos das listas dos valentes: \"Era este Benaia valente entre os trinta, e sobre os trinta\" (27:6), e um deles está morto havia anos, mas o texto o mantém no posto com o filho ao lado — \"O quarto, do quarto mês, era Asael, irmão de Joabe\" (27:7) (2Sm 2:18-23). Depois vêm os chefes civis, tribo por tribo (27:22): as doze tribos ainda existem, todas, no reino que o Cronista quer que a geração pós-exílio reconheça como seu.",
    },
    multidao: {
      title: "A turma de vinte e quatro mil homens do mês",
      subtitle: "1Cr 27:1,23-24 • o povo em armas por um mês — e o censo que não se pôs no registro",
      text: "\"cada turma de vinte e quatro mil\" (1Cr 27:1): doze levas de lavradores que largavam a foice por trinta dias, um sistema que dava a Davi quase trezentos mil homens por ano sem sustentar um exército permanente. No meio da contagem o Cronista trava: \"Não tomou, porém, Davi o número dos de vinte anos para baixo, porquanto o Senhor tinha falado que havia de multiplicar a Israel como as estrelas do céu\" (27:23). E vem a confissão mais direta: o número que Joabe começou \"não se pôs no registro das crônicas do rei Davi\" (27:24). Um livro de números guarda o número que Deus não deixou anotar.",
    },
    pastor: {
      title: "Sitrai, o saronita, Jaziz, o hagrita, e os pastores da fazenda do rei",
      subtitle: "1Cr 27:29-31 • os gados de Sarom, dos vales e o gado miúdo sob administradores",
      text: "\"E sobre os gados que pastavam em Sarom, Sitrai, o saronita\" (1Cr 27:29) — a planície costeira de pasto largo entre o Carmelo e Jope —, \"porém, sobre os gados dos vales, Safate, filho de Adlai\". O gado miúdo, o mais numeroso, ficou com um estrangeiro: \"E sobre o gado miúdo, Jaziz, o hagrita\" (27:31), da mesma gente que Israel vencera a leste do Jordão (5:10). O Cronista fecha a lista com a frase que a resume: \"todos esses eram administradores da fazenda que tinha o rei Davi\". O pastor de Belém virou dono dos rebanhos, e continuou pastor de Israel (Sl 78:70).",
    },
    rebanho: {
      title: "Os gados de Sarom e dos vales, o gado miúdo, os camelos e as jumentas do rei",
      subtitle: "1Cr 27:29-31 • a riqueza viva da fazenda real repartida por mordomos",
      text: "A fazenda de Davi é inventariada como um reino dentro do reino: gados em Sarom e nos vales, e mais \"os camelos, Obil, o ismaelita; e sobre as jumentas, Jedias, o meronotita\" (1Cr 27:30) — cada espécie com o seu perito. O gado miúdo tinha administrador próprio (27:31). Tudo isso é enumerado logo depois das vinhas, das adegas e dos olivais (27:27-28): o Cronista quer que se veja um Israel em repouso e em fartura, o \"repouso ao redor\" que Deus dera (22:18). E deixa claro de quem é a fartura: \"tudo vem de ti, e do que é teu to damos\" (29:14).",
    },
    servo: {
      title: "Os lavradores, vindimadores, apanhadores de azeitona e guardas de celeiro do rei",
      subtitle: "1Cr 27:25-28 • a lavoura, as vinhas, as adegas, os olivais e os armazéns do azeite",
      text: "Estes são os trabalhadores da fazenda real, e cada frente tinha o seu mordomo: \"E sobre os que faziam a obra do campo, na lavoura da terra, Ezri, filho de Quelube\" (1Cr 27:26); \"E sobre as vinhas, Simei, o ramatita; porém sobre o que das vides entrava nas adegas do vinho, Zabdi, o sifmita\" (27:27) — a vinha e a adega já eram ofícios separados. O azeite também (27:28). São os mesmos homens que, um mês por ano, deixam a enxada e entram na turma de vinte e quatro mil (27:1). A Escritura não separa o sagrado do trabalho.",
    },
  },

  // ---------------------------------------------------------------- 1Cr 28
  28: {
    anciao: {
      title: "Os oficiais da casa do rei, os sacerdotes das turmas e o escriba da planta do templo",
      subtitle: "1Cr 28:1,11-21 • a corte convocada e o projeto entregue por escrito",
      text: "A convocação junta todo o aparelho do reino, inclusive a administração civil: os príncipes, os capitães, \"e os administradores de toda a fazenda e possessão do rei\" (1Cr 28:1). Diante deles Davi entrega a Salomão a planta do alpendre, das câmaras e do propiciatório, e explica de onde ela veio: \"Tudo isto, disse Davi, fez-me entender o Senhor, por escrito da sua mão\" (28:19) — como Moisés no monte (Êx 25:40). E é isso que o velho rei põe na mão do moço: \"E eis que aí tens as turmas dos sacerdotes e dos levitas para todo o ministério da casa de Deus\" (28:21). Nada nesta casa será improvisado.",
    },
    homem: {
      title: "Os príncipes e capitães da assembleia, os ourives do ouro e da prata e os mortos das guerras de Davi",
      subtitle: "1Cr 28 • quem escuta o discurso, quem vai executar a obra e o sangue que impediu Davi de edificar",
      text: "\"Então Davi reuniu em Jerusalém todos os príncipes de Israel, os príncipes das tribos, e os capitães das turmas\" (1Cr 28:1): a nação está de pé diante do rei que se levanta para falar. E a primeira coisa que ele conta é uma recusa de Deus: \"Não edificarás casa ao meu nome, porque és homem de guerra, e derramaste muito sangue\" (28:3) — atrás desse veto estão homens reais, os mortos das batalhas que fizeram o reino. A eleição, porém, é dita com espanto (28:4). Os outros homens da cena são os artífices que vão pesar e bater o metal (28:15), e que o pai garante ao filho (28:21).",
    },
    multidao: {
      title: "A congregação do Senhor reunida em Jerusalém",
      subtitle: "1Cr 28:2,8 • o povo diante de quem o rei se põe em pé e faz o encargo",
      text: "\"E pôs-se o rei Davi em pé, e disse: Ouvi-me, irmãos meus, e povo meu\" (1Cr 28:2) — um rei velho que se levanta para falar, e que chama a nação de irmãos antes de chamá-la de povo. Diante dessa assembleia ele expõe o que tinha no coração: edificar \"uma casa de repouso para a arca da aliança do Senhor\" (28:2). E é a essa multidão que dirige o encargo público: \"perante os olhos de todo o Israel... guardai e buscai todos os mandamentos do Senhor vosso Deus\" (28:8). A promessa do trono é para sempre, mas a posse da boa terra é condicionada — o templo não substitui o mandamento.",
    },
    pastor: {
      title: "O pastor dos rebanhos de Jessé em Belém",
      subtitle: "1Cr 28:4 • a casa de onde Deus tirou o rei de Israel",
      text: "Quando Davi conta à assembleia como chegou ao trono, ele volta ao curral: \"E o Senhor Deus de Israel escolheu-me de toda a casa de meu pai\" (1Cr 28:4). Na tarde da unção ele não estava na casa, estava no pasto — \"Ainda falta o menor, que está apascentando as ovelhas\" (1Sm 16:11) —, e é esse detalhe que o salmo transforma em teologia da eleição: Deus \"elegeu a Davi seu servo, e o tirou dos apriscos das ovelhas\" (Sl 78:70). Diante de todo o Israel reunido, o rei mais glorioso da nação começa a sua fala pelo lugar mais humilde da sua vida.",
    },
    patriarca: {
      title: "Jessé, pai de Davi",
      subtitle: "1Cr 28:4 • a casa de Judá em que Deus se agradou do menor dos filhos",
      text: "\"porque a Judá escolheu por soberano, e a casa de meu pai na casa de Judá; e entre os filhos de meu pai se agradou de mim\" (1Cr 28:4): a escolha de Deus vai se estreitando — de Israel a Judá, de Judá à casa de Jessé, e dentro dela ao filho que ninguém chamou para a mesa. Jessé é o efrateu de Belém que Rute e Boaz geraram (Rt 4:17,22), e é dele que Isaías tomaria a imagem do Messias: \"brotará um rebento do tronco de Jessé\" (Is 11:1). Todo o discurso repousa nisso: quem escolheu o pai escolheu o filho, e quem escolheu Davi escolheu Salomão (28:5).",
    },
    rebanho: {
      title: "O rebanho de Jessé em Belém",
      subtitle: "1Cr 28:4 • as ovelhas que o rei de Israel apascentava antes do trono",
      text: "As ovelhas ao fundo da cena são as da herdade de Jessé, o cuidado que o menino Davi tinha nas mãos quando Deus o escolheu — \"E o Senhor Deus de Israel escolheu-me de toda a casa de meu pai, para que eternamente fosse rei sobre Israel\" (1Cr 28:4). Foi guardando esse rebanho que ele matou o leão e o urso, e por isso enfrentou o filisteu sem medo (1Sm 17:34-36). O salmo une as duas pastagens numa frase só: Deus o tirou do cuidado das ovelhas \"para apascentar a Jacó, seu povo\" (Sl 78:71). No dia em que entrega a planta do templo, o rei ainda é o pastor que Deus promoveu de rebanho.",
    },
    servo: {
      title: "Os que pesam o ouro e a prata dos utensílios, os tesoureiros e os servos das candeias e dos pães",
      subtitle: "1Cr 28:12-18 • cada peça do templo entregue por peso, do garfo ao carro dos querubins",
      text: "O que estes servos fazem é o detalhe mais minucioso do capítulo: \"E deu ouro, segundo o peso do ouro, para todos os utensílios de cada ministério; também a prata, por peso\" (1Cr 28:14). Nada é entregue a olho — castiçal por castiçal, e até os instrumentos menores: \"ouro puro para os garfos, e para as bacias, e para os jarros\" (28:17). No topo da lista está o que ninguém tocaria depois: o ouro para o modelo do carro dos querubins, \"que haviam de estender as asas, e cobrir a arca da aliança do Senhor\" (28:18) — o serviço mais miúdo existe para abrigar a presença mais alta.",
    },
  },

  // ---------------------------------------------------------------- 1Cr 29
  29: {
    anciao: {
      title: "Os anciãos de Israel, Jeiel, o gersonita, sobre o tesouro, Zadoque e o escriba das crônicas",
      subtitle: "1Cr 29 • quem recolhe a oferta, quem é ungido sacerdote e quem escreve os atos do rei",
      text: "Quando Israel abre a mão, alguém tem de guardar o que entra: \"E os que possuíam pedras preciosas, deram-nas para o tesouro da casa do Senhor, a cargo de Jeiel o gersonita\" (1Cr 29:8). O dia termina com uma segunda unção, e o sacerdócio é confirmado junto com o trono: \"e o ungiram ao Senhor por líder, e a Zadoque por sacerdote\" (29:22). Os anciãos que ali estão atravessaram os quarenta anos do reinado (29:27) e ouvem o velho rei confessar a condição de todos: \"Porque somos estrangeiros diante de ti, e peregrinos como todos os nossos pais\" (29:15).",
    },
    homem: {
      title: "Os chefes dos pais, os capitães de mil e de cem e os que possuíam pedras preciosas",
      subtitle: "1Cr 29:2-8 • a oferta voluntária dos grandes de Israel para a casa de Deus",
      text: "Davi dá primeiro o exemplo, e do que era dele mesmo: além de tudo o que já preparara, ofereceu \"Três mil talentos de ouro de Ofir; e sete mil talentos de prata purificada, para cobrir as paredes das casas\" (1Cr 29:4). Só então faz o convite: \"Quem, pois, está disposto a encher a sua mão, para oferecer hoje voluntariamente ao Senhor?\" (29:5). E a resposta vem de toda a liderança do reino (29:6). Quem tinha joia deu joia (29:8), e a palavra que se repete em todo o trecho é a mesma: voluntariamente, porque \"da sinceridade te agradas\" (29:17).",
    },
    mulherComum: {
      title: "A peregrina diante do Senhor, na congregação que ofertou",
      subtitle: "1Cr 29:15 • a mulher de Israel dentro da confissão que o rei faz por todos",
      text: "A oração de Davi não separa homens de mulheres, grandes de pequenos: ele fala em nome de todos e diz \"Porque quem sou eu, e quem é o meu povo, para que pudéssemos oferecer voluntariamente coisas semelhantes? Porque tudo vem de ti, e do que é teu to damos\" (1Cr 29:14). A frase seguinte é a mais nua da Escritura sobre a condição humana: \"Porque somos estrangeiros diante de ti, e peregrinos como todos os nossos pais; como a sombra são os nossos dias sobre a terra\" (29:15). O templo se levanta com dinheiro de gente que sabe que está de passagem.",
    },
    multidao: {
      title: "Toda a congregação de Israel na oferta, na oração e na aclamação de Salomão",
      subtitle: "1Cr 29:9,20-25 • o povo que se alegrou de dar e se prostrou perante o Senhor e o rei",
      text: "\"E o povo se alegrou porque contribuíram voluntariamente; porque, com coração perfeito, voluntariamente deram ao Senhor; e também o rei Davi se alegrou com grande alegria\" (1Cr 29:9) — a alegria vem de dar, não de receber. Depois da oração ele manda a congregação fazer o que ele acabou de fazer: \"Agora louvai ao Senhor vosso Deus\" (29:20). No dia seguinte a festa é imensa (29:22), e o reino passa de mão sem uma gota de sangue: \"e todo o Israel lhe obedecia\" (29:23). Assim se entrega uma casa a Deus, e assim se entrega um reino.",
    },
    patriarca: {
      title: "Os pais de Israel — Abraão, Isaque e Jacó — e os videntes Samuel, Natã e Gade",
      subtitle: "1Cr 29:18,29 • os patriarcas invocados na oração e os profetas que escreveram os atos do rei",
      text: "No auge da oração, Davi não invoca o seu próprio trono, invoca a aliança antiga: \"Senhor Deus de Abraão, Isaque, e Israel, nossos pais, conserva isto para sempre no intento dos pensamentos do coração de teu povo\" (1Cr 29:18). O pedido é pelo coração, não pelo cofre — o dinheiro já está dado, o que pode se perder é a disposição de dar. E o livro fecha com três homens que atravessaram esse reinado com a pena na mão: \"as crônicas de Samuel, o vidente, e... do profeta Natã, e... de Gade, o vidente\" (29:29). A história do rei foi escrita por quem tinha coragem de repreendê-lo.",
    },
    rebanho: {
      title: "Os mil bezerros, mil carneiros e mil cordeiros do dia seguinte",
      subtitle: "1Cr 29:21 • o sacrifício com que Israel confirma a entrega da casa e do reino",
      text: "A oferta de ouro e prata do dia anterior é selada com sangue no dia seguinte: \"E ao outro dia imolaram sacrifícios ao Senhor, e ofereceram holocaustos ao Senhor, mil bezerros, mil carneiros, mil cordeiros, com as suas libações\" (1Cr 29:21). Não é festa de coroação apenas, é culto — o povo não celebra um novo rei sem primeiro pôr o holocausto no altar. Três mil vítimas medem a gratidão de uma nação em repouso, e antecipam a dedicação do templo (2Cr 7:5). Só depois do sacrifício é que comeram e beberam \"perante o Senhor, com grande gozo\" (29:22).",
    },
    servo: {
      title: "Os que contam os talentos, empilham o cobre e o ferro, carregam o mármore e servem à mesa do Senhor",
      subtitle: "1Cr 29:2,7,21-22 • as mãos que recebem e arrumam a oferta da congregação",
      text: "A oferta daquele dia teve de ser pesada, contada e guardada por alguém: \"E deram para o serviço da casa de Deus cinco mil talentos de ouro... e cem mil talentos de ferro\" (1Cr 29:7). Antes disso o próprio rei já ajuntara madeira, pedras de ônix \"e pedras de mármore em abundância\" (29:2) — carga que homens sem nome descarregaram e empilharam. No dia seguinte esses servos degolam e servem as três mil vítimas do holocausto (29:21). O Cronista não os nomeia; mas foram eles que tornaram executável a frase do rei: \"tudo vem de ti, e do que é teu to damos\" (29:14).",
    },
  },
};
