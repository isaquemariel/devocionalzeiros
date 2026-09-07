// Fichas ESPECÍFICAS por (capítulo → papel) de 1 CRÔNICAS 1–6.
// Seis capítulos de genealogia que são, na verdade, seis mundos: a humanidade
// inteira de Adão a Edom; Judá com Er morto pelo SENHOR, Acar o perturbador e
// Bezaleel o artífice; a casa de Davi de Hebrom até a prisão da Babilônia;
// Judá outra vez pelo lado da oficina, com JABEZ no meio como um clarão; as
// tribos de além do Jordão, ricas de gado e levadas cativas; e LEVI, com a
// casa sacerdotal, os cantores de Davi e o mapa das cidades levíticas.
// Cada figurante anônimo é alguém REAL daquele capítulo.
import type { StageInfo } from "@/lib/rpgStageInfo";

export const CHAPTER_ACTORS_01_06: Record<number, Record<string, StageInfo>> = {
  // ---------------------------------------------------------------- 1Cr 1
  1: {
    anciao: {
      title: "Os cabeças das casas antigas: o hamateu do Orontes, Serugue e os príncipes de Edom",
      subtitle: "1Cr 1 • os velhos que presidem as nações antes de haver rei em Israel",
      text: "São os anciãos que o Cronista põe à frente de cada casa desta lista de nações. Primeiro os cananeus do norte — \"E aos arvadeus e aos zemareus e aos hamateus\" (1Cr 1:16) —, gente de cidade velha à beira do Orontes. Depois os pais da linha eleita, no trecho mais curto e mais pesado do capítulo: \"Serugue, Naor, Terá\" (1:26), três nomes que desembocam em \"Abrão, que é Abraão\" (1:27). No fim, os que governam Edom, até \"o príncipe Magdiel, o príncipe Irã\" (1:54). As nações também são contadas nome por nome diante de Deus."
    },
    cavaleiro: {
      title: "Togarma, que vendia cavalos, e Jetur, pai dos itureus",
      subtitle: "1Cr 1 • a cavalaria das estepes do norte e a do deserto oriental",
      text: "\"E os filhos de Gomer: Asquenaz, Rifate, Togarma\" (1Cr 1:6): a casa de Togarma é a da estepe do norte, e a Escritura sabe do que ela vivia — \"Os da casa de Togarma trocavam pelas tuas mercadorias, cavalos, e cavaleiros e mulos\" (Ez 27:14). O outro cavaleiro vem do extremo oposto do mapa: \"Jetur, Nafis e Quedemá; estes foram os filhos de Ismael\" (1:31). Não é nome perdido na lista: quatro capítulos adiante estas casas voltam como inimigas dos rubenitas (5:19). A lei dizia do rei de Israel que \"não multiplicará para si cavalos\" (Dt 17:16)."
    },
    homem: {
      title: "A humanidade inteira, de Sete a Edom: os filhos de Noé, Ninrode e Pelegue",
      subtitle: "1Cr 1 • os homens em que o mundo se reparte antes de existir Israel",
      text: "O livro começa sem preâmbulo, em três nomes — \"Adão, Sete, Enos\" (1Cr 1:1) — e desce dali por dez gerações até a arca. De Noé o mundo se abre em três, e é da linha de Cão que sai o primeiro homem de quem a Escritura diz que se fez grande: \"Cuxe gerou a Ninrode, que começou a ser poderoso na terra\" (1:10). Entre os filhos de Mizraim aparecem os filisteus (1:12). E um nome guarda uma catástrofe inteira em duas palavras: \"Pelegue, porquanto nos seus dias se repartiu a terra\" (1:19). O Cronista conta todos porque a promessa foi para \"todas as famílias da terra\" (Gn 12:3)."
    },
    mulherComum: {
      title: "As mulheres que a lista não apaga: Quetura, Timna, Meetabel e Matrede",
      subtitle: "1Cr 1 • os poucos nomes de mulher guardados na conta das nações",
      text: "Numa página feita quase só de pais e filhos, o Cronista para quatro vezes para nomear uma mulher. A primeira é a segunda casa de Abraão: \"Quanto aos filhos de Quetura, concubina de Abraão\" (1Cr 1:32), de quem saem Midiã e os povos do deserto. A segunda vem do meio dos horeus, e é uma nota que a Escritura poderia ter calado: \"e a irmã de Lotã foi Timna\" (1:39) — mãe de Amaleque (Gn 36:12). As últimas fecham a linhagem de Edom com três gerações numa frase só (1:50). Que a genealogia lhes abra espaço já diz que a promessa não corre só por homens."
    },
    pastor: {
      title: "Os pastores das casas do deserto: Nebaiote, Efá de Midiã e os currais de Bozra",
      subtitle: "1Cr 1 • a gente de rebanho no meio da conta das nações",
      text: "Boa parte dos nomes deste capítulo é gente que vivia atrás de gado, e o resto da Escritura confirma um por um. \"O primogênito de Ismael foi Nebaiote\" (1Cr 1:29), e Isaías ainda o veria trazendo tributo ao altar: \"os carneiros de Nebaiote te servirão\" (Is 60:7). \"E os filhos de Midiã: Efá\" (1:33) é a casa das caravanas de camelos do mesmo profeta (Is 60:6). E quando o capítulo chega a Edom, os pastos são de \"Jobabe, filho de Zerá, de Bozra\" (1:44) — a cidade de onde o profeta veria o SENHOR voltar com as vestes tintas (Is 63:1)."
    },
    patriarca: {
      title: "Os patriarcas da lista: Enoque, Sem, Éber, Terá — e Seir, o horeu",
      subtitle: "1Cr 1 • os pais de casa em que o mundo antigo se apoia",
      text: "São os velhos que sustentam cada degrau desta escada de nomes: \"Cainã, Maalaleel, Jerede\" (1Cr 1:2) e logo \"Enoque, Matusalém, Lameque\" (1:3). O Cronista escreve Enoque como se fosse um nome qualquer, mas Gênesis já dissera que ele \"andou com Deus; e não apareceu mais, porquanto Deus para si o tomou\" (Gn 5:24). Depois do dilúvio vêm os três pais das nações (1:4), e da linha de Sem os pais da promessa — \"Serugue, Naor, Terá\" (1:26) —, até a frase de quatro palavras em que a história muda de rumo: \"Abrão, que é Abraão\" (1:27). Nenhum deles fala; todos apenas geram."
    },
    rebanho: {
      title: "As manadas das nações: Togarma, Nebaiote, Midiã e os pastos de Bozra",
      subtitle: "1Cr 1 • o gado que sustenta as casas contadas neste capítulo",
      text: "O gado é o que a maior parte destes nomes tinha por riqueza. Da casa de Togarma vinham \"cavalos, e cavaleiros e mulos\" para as feiras de Tiro (Ez 27:14); das casas de Ismael e de Quetura vinham as ovelhas e os camelos do deserto oriental (1Cr 1:29,33). Isaías promete que esse mesmo gado subirá um dia ao altar: \"os carneiros de Nebaiote te servirão; com agrado subirão ao meu altar\" (Is 60:7). Em Edom, os apriscos são de \"Jobabe, filho de Zerá, de Bozra\" (1:44). Foi por causa do gado que os filhos de Israel e os de Esaú se separaram (Gn 36:7)."
    },
    rei: {
      title: "Os oito reis que reinaram em Edom antes de haver rei em Israel",
      subtitle: "1Cr 1:43-50 • Bela, Jobabe, Husão, Hadade, Samlá, Saul, Baal-Hanã e Hadade de Paí",
      text: "\"E estes são os reis que reinaram na terra de Edom, antes que reinasse rei sobre os filhos de Israel\" (1Cr 1:43): a lista mais estranha da página, e uma das mais teológicas. Nenhum deles herda do pai — a fórmula se repete oito vezes, \"E morreu Bela, e reinou em seu lugar Jobabe\" (1:44) — e cada um vem de uma cidade diferente. Edom teve trono séculos antes de Israel, e mesmo assim o trono nunca ficou numa casa. Israel esperaria muito mais e receberia o que Edom nunca teve: \"o teu trono será firmado para sempre\" (2Sm 7:16)."
    },
    servo: {
      title: "Os filhos mais novos e a gente de ofício das nações, de Enos aos fundidores de Edom",
      subtitle: "1Cr 1 • as casas menores, os marinheiros, os pescadores e a criadagem da lista",
      text: "Onde a lista dá o nome de um filho mais novo ou de um povo pequeno, a cena põe um servo. É o neto de Adão em cujos dias \"se começou a invocar o nome do Senhor\" (Gn 4:26), aqui apenas \"Adão, Sete, Enos\" (1Cr 1:1); são os marinheiros das costas de Javã (1:7); são as casas do Egito (1:11); e os pescadores da cidade que abre Canaã (1:13). No fim são os homens de ofício dos reis de Edom — o vindimador de Masreca, o barqueiro de \"Reobote, junto ao rio\" (1:48). São os anônimos que sustentam cada nome desta página, e o Cronista não os deixa fora da conta."
    }
  },

  // ---------------------------------------------------------------- 1Cr 2
  2: {
    anciao: {
      title: "Os velhos de Judá: Etã o sábio, Obede, Hur, Sesã e os escribas de Jabez",
      subtitle: "1Cr 2 • os cabeças de família que guardam a memória da tribo escolhida",
      text: "Abrem a lista os cinco sábios de Zerá, contados com um cuidado que a genealogia raramente tem: \"Zinri, e Etã, e Hemã, e Calcol, e Dara: cinco ao todo\" (1Cr 2:6) — os mesmos nomes a que a sabedoria de Salomão seria comparada (1Rs 4:31). Vem depois o avô de Davi, no verso mais discreto que a Escritura já deu a uma casa real: \"E Boaz gerou a Obede, e Obede gerou a Jessé\" (2:12). Na casa de Calebe está o ancião de quem sai o ourives do tabernáculo (2:20). E o capítulo termina com os anciãos que fizeram esta página existir: \"as famílias dos escribas que habitavam em Jabez\" (2:55)."
    },
    homem: {
      title: "Os homens de Judá: Er que Deus matou, Acar o perturbador, Naassom, Jessé e Bezaleel",
      subtitle: "1Cr 2 • a tribo escolhida contada pelos seus filhos, os bons e os maus",
      text: "A genealogia do Messias começa com uma sepultura: \"e Er, o primogênito de Judá, foi mau aos olhos do Senhor, pelo que o matou\" (1Cr 2:3). Duas gerações depois aparece outro nome que o Cronista não maquia: \"Acar, o perturbador de Israel, que pecou no anátema\" (2:7) — o Acã de Josué (Js 7:25). Depois disso a linha sobe: Naassom, príncipe de Judá (2:10), Boaz, Obede, Jessé — e a conta dos irmãos termina onde o livro queria chegar: \"Ozém, o sexto, Davi, o sétimo\" (2:15). Na casa de Calebe nasce o artífice do tabernáculo, Bezaleel (2:20; Êx 31:2-3)."
    },
    mulherComum: {
      title: "As mulheres da casa de Judá: a filha de Suá, Tamar, Zeruia e Abigail, Azuba e Efrate",
      subtitle: "1Cr 2 • as mães, irmãs e concubinas por quem a tribo do rei continua",
      text: "O capítulo nomeia mulher atrás de mulher, e cada nome carrega uma história. A primeira é uma estrangeira, e o ramo dela morre: os três primeiros filhos de Judá \"lhe nasceram da filha de Suá, a cananéia\" (1Cr 2:3). Quem salva a linhagem é a nora: \"Porém Tamar, sua nora, lhe deu à luz Perez e Zerá\" (2:4) — e Mateus o repetirá na genealogia de Cristo (Mt 1:3). Vêm as irmãs de Davi, Zeruia e Abigail (2:16), mães dos três sobrinhos que fariam e desfariam o reinado. E \"morreu Azuba; e Calebe tomou para si a Efrate, da qual lhe nasceu Hur\" (2:19)."
    },
    pastor: {
      title: "Os pastores de Judá — e Davi, o sétimo filho, no campo de Belém",
      subtitle: "1Cr 2 • a tribo do rei vista pelos seus apriscos",
      text: "Os pastores desta lista são os filhos de Israel e de Judá que viveram de gado: Aser, na conta que abre o capítulo (1Cr 2:2), e Quelubai, o filho de Hezrom que também se chama Calebe (2:9). O mais importante deles é aquele que o texto conta por último e sem um único adjetivo: \"Ozém, o sexto, Davi, o sétimo\" (2:15). Quando Samuel foi a Belém, o sétimo filho não estava à mesa — \"Ainda falta o menor, que está apascentando as ovelhas\" (1Sm 16:11). No mesmo capítulo nasce a cidade dos pastores que daria um profeta, Tecoa (2:24; Am 1:1)."
    },
    patriarca: {
      title: "Israel e os troncos de Judá: Rúben, Hezrom e Jerameel",
      subtitle: "1Cr 2 • os pais de casa de que sai tudo o que este capítulo conta",
      text: "O capítulo abre com os doze, e a ordem já é uma tese: \"Estes são os filhos de Israel: Rúben, Simeão, Levi, Judá, Issacar e Zebulom\" (1Cr 2:1). O Cronista larga onze deles em dois versículos e fica com Judá, porque é dali que vem o rei. Dentro de Judá, o pai que sustenta quase toda a página é Hezrom, e a Escritura conta dele até a idade em que voltou a gerar (2:21). Rúben aparece em primeiro lugar e some em seguida — o primogênito perdeu a primogenitura (5:1) —, e é essa troca silenciosa que a genealogia inteira está explicando."
    },
    rebanho: {
      title: "O gado das casas de Judá: as eiras de Perez, os apriscos de Jessé e o rebanho de Davi",
      subtitle: "1Cr 2 • os currais em que a tribo do rei ganhava a vida",
      text: "A riqueza destas famílias era o gado, e a cena o mostra em cada degrau da lista: os bois de trilha da casa de Perez, os rebanhos de Jerameel, os currais de Samai. O que dá sentido a todos é o do fim da linhagem — \"E Boaz gerou a Obede, e Obede gerou a Jessé\" (1Cr 2:12) e \"Davi, o sétimo\" (2:15): a casa de Jessé era casa de criador de ovelhas, e do meio delas Deus tirou o rei (1Sm 16:11). O Cronista nunca diz isso em voz alta, mas o desenho está na página: o Pastor de Israel escolheu para si uma família de pastores."
    },
    servo: {
      title: "Os moços de Judá — e Jará, o servo egípcio que virou genro de Sesã",
      subtitle: "1Cr 2 • os filhos mais novos, os ceifeiros, e o escravo de quem saem treze gerações",
      text: "A cena põe como servos os filhos mais novos e a gente de trabalho das casas contadas: Selá, Perez e Zerá, o ceifeiro da seara do remidor de Belém (1Cr 2:11), os irmãos do meio de Davi (2:14). Mas o servo deste capítulo é um só, e a Escritura o nomeia duas vezes: \"E tinha Sesã um servo egípcio, cujo nome era Jará\" (2:34). O senhor sem herdeiro varão faz o que o costume não aplaudia: \"Deu, pois, Sesã sua filha por mulher a Jará, seu servo\" (2:35) — e dessas bodas saem treze gerações dentro de Judá. Um escravo estrangeiro entra pela porta da frente na tribo do Messias."
    }
  },

  // ---------------------------------------------------------------- 1Cr 3
  3: {
    anciao: {
      title: "Os escribas e sacerdotes que guardaram a conta da casa de Davi",
      subtitle: "1Cr 3 • quem registrou a dinastia, de Hebrom ao cativeiro e de volta",
      text: "Este capítulo só existe porque alguém escreveu — e continuou escrevendo quando já não havia trono. São os cronistas da corte que anotam os filhos de Hebrom e de Jerusalém, inclusive a linha que o pudor mandaria calar (1Cr 3:9). São os escrivães dos reis de Judá, que passam a coroa de nome em nome (3:14). E são, por fim, os anciãos do desterro, que continuaram a fazer o cadastro de uma casa real sem reino (3:18,21). Guardar genealogia na Babilônia era ato de fé: enquanto houvesse lista, havia promessa de pé."
    },
    homem: {
      title: "Os filhos de Davi em Hebrom e em Jerusalém — e a casa real dentro do cativeiro",
      subtitle: "1Cr 3 • dos príncipes de Hebrom a Sealtiel, Zorobabel e Anani",
      text: "Começam os seis de Hebrom, cada um com o nome da mãe colado ao seu: \"o primogênito, Amnom, de Ainoã, a jizreelita\" (1Cr 3:1) — e quem leu Samuel já sabe o que sairá desta casa. Em Jerusalém nascem os quatro de Bate-Sua: \"Siméia, e Sobabe, e Natã, e Salomão\" (3:5), os dois ramos por onde os Evangelhos fariam descer o Cristo. Passada a dinastia, o capítulo dá o passo mais improvável da Escritura: a casa continua a nascer dentro da prisão (3:17), e dela sai o homem que voltaria a levantar o templo, Zorobabel (3:19). A promessa ainda de pé, ainda esperando (3:24)."
    },
    mulherComum: {
      title: "As mulheres da casa de Davi: Ainoã, Abigail, Maaca, Abital, Eglá, Bate-Sua — e Tamar",
      subtitle: "1Cr 3 • as mães dos príncipes e a filha cujo nome o Cronista não apaga",
      text: "Em Hebrom o texto conta os filhos pelas mães, uma a uma: \"o segundo Daniel, de Abigail, a carmelita\" (1Cr 3:1), \"Absalão, filho de Maaca, filha de Talmai, rei de Gesur\" (3:2), \"o sexto, Itreão, de Eglá, sua mulher\" (3:3). Seis mulheres em Hebrom e mais em Jerusalém: uma casa real que multiplicou mulheres contra a lei do rei (Dt 17:17), e o preço são as histórias de Amnom, Absalão e Adonias. E há a única filha da lista, registrada em quatro palavras e sem explicação: \"e Tamar, irmã deles\" (3:9) — a Escritura não deixa que o nome dela suma."
    },
    rei: {
      title: "Davi e os reis de Judá, de Roboão a Jeconias, o cativo",
      subtitle: "1Cr 3 • a dinastia inteira em quinze versículos, do trono de Hebrom à Babilônia",
      text: "O reinado de Davi é resumido numa contabilidade seca: \"porque ali reinou sete anos e seis meses; e trinta e três anos reinou em Jerusalém\" (1Cr 3:4). Depois a coroa desce sem uma única batalha contada: \"E o filho de Salomão foi Roboão; de quem foi filho Abias; de quem foi filho Asa\" (3:10) — e assim até Josias, o último rei bom. O fim vem sem lamento: \"E os filhos de Jeconias: Assir, e seu filho Sealtiel\" (3:17) — o rei que a Babilônia levou continua a gerar dentro da cadeia, e é por essa lista que Mateus fará passar o Cristo (Mt 1:11-12). Israel perdeu o trono; a linhagem, não."
    },
    servo: {
      title: "A criadagem da casa real: os pátios de Hebrom e de Jerusalém e o carcereiro de Jeconias",
      subtitle: "1Cr 3 • quem serve os príncipes e quem guarda o rei preso na Babilônia",
      text: "São os moços da casa de Davi em cada uma das três paisagens do capítulo. Primeiro os do pátio de Hebrom, nos sete anos e meio em que ali houve corte (1Cr 3:4). Depois os do palácio da cidade escolhida, casa de rei já feita (3:5). E, por último, o mais estranho de todos — o guarda da prisão babilônica onde a casa real continuou a nascer (3:17). Aquele cativeiro teve fim, e num gesto que a Escritura guardou: Evil-Merodaque \"levantou a cabeça de Joaquim, rei de Judá, tirando-o da casa da prisão\" (2Rs 25:27). Servem o rei quando ele já não tem coroa nenhuma."
    }
  },

  // ---------------------------------------------------------------- 1Cr 4
  4: {
    anciao: {
      title: "Os velhos de Judá e de Simeão: Quenaz, Calebe, o de Jasubi-Leém e os escribas",
      subtitle: "1Cr 4 • os cabeças de casa que guardam as famílias e as terras antigas",
      text: "São os anciãos que respondem pelas casas deste capítulo. Um deles é o pai do primeiro juiz de Israel: \"E foram os filhos de Quenaz: Otniel e Seraías\" (1Cr 4:13) — Otniel, o libertador que o Senhor levantou (Jz 3:9). Outro é o velho de Hebrom, contado aqui pelos filhos (4:15). Há o ancião de uma casa absorvida em Judá (4:8), e o velho de um lugar tão antigo que o próprio Cronista precisa avisar o leitor: \"porém estas coisas já são antigas\" (4:22). E há os escribas de Simeão: \"Estas foram as suas habitações e suas genealogias\" (4:33)."
    },
    cavaleiro: {
      title: "Os cavalos de Hazar-Susim e os carros de Bete-Marcabote",
      subtitle: "1Cr 4:31 • as cidades de Simeão cujos nomes são um curral e uma cocheira",
      text: "\"E em Bete-Marcabote, e em Hazar-Susim, e em Bete-Biri, e em Saaraim\" (1Cr 4:31): dois destes nomes não são poesia, são ofício — Bete-Marcabote é a casa dos carros, e Hazar-Susim é o curral dos cavalos. Era gente de Simeão criando montarias no sul seco, na fronteira do deserto, e o Cronista fecha a lista com uma data que muda tudo: \"estas foram as suas cidades, até que Davi reinou\". A tribo pequena, encravada dentro da herança de Judá desde Josué (Js 19:1), acaba absorvida pelo reino do sétimo filho de Jessé."
    },
    homem: {
      title: "Os homens de Judá e de Simeão — e JABEZ, o filho da dor que orou",
      subtitle: "1Cr 4 • o vale dos artífices, os oleiros do rei e o homem cuja oração Deus atendeu",
      text: "No meio de uma lista de pais de aldeias, o Cronista para tudo por dois versículos: \"E foi Jabez mais ilustre do que seus irmãos; e sua mãe deu-lhe o nome de Jabez, dizendo: Porquanto com dores o dei à luz\" (1Cr 4:9). O homem carrega no nome a dor do próprio nascimento e faz dela oração (4:10) — e o texto encerra com sete palavras que valem o capítulo: \"E Deus lhe concedeu o que lhe tinha pedido\". Em volta, Judá aparece pelo trabalho: o vale dos artífices (4:14), o linho fino de Asbéia (4:21), e os oleiros que \"ficaram ali com o rei na sua obra\" (4:23)."
    },
    mulherComum: {
      title: "As mulheres de Judá: a mãe de Jabez, Hazelelponi, Helá e Naará, Bitia filha de Faraó",
      subtitle: "1Cr 4 • as mães, irmãs e tecelãs da tribo trabalhadora",
      text: "A genealogia de Judá aqui é cheia de mulheres, e a mais importante não tem nome: \"sua mãe deu-lhe o nome de Jabez, dizendo: Porquanto com dores o dei à luz\" (1Cr 4:9) — é dela que vem o nome que o filho transformaria em oração. O Cronista nomeia também a irmã dos filhos de Etã (4:3) e as duas mulheres do pai de Tecoa, \"Helá e Naará\" (4:5). Uma delas é filha de rei e estrangeira: \"os filhos de Bitia, filha de Faraó, que Merede tomou\" (4:18) — uma egípcia dentro da tribo do Messias, como Tamar, Raabe e Rute. E há as tecelãs anônimas do linho fino (4:21)."
    },
    multidao: {
      title: "A casa numerosa de Simei e as famílias dos príncipes de Simeão",
      subtitle: "1Cr 4:27,38 • a tribo pequena que só se multiplica em alguns ramos",
      text: "O Cronista faz aqui uma conta que quase ninguém faz: mede uma tribo pela quantidade de berços. \"E Simei teve dezesseis filhos, e seis filhas, porém seus irmãos não tiveram muitos filhos; e toda a sua família não se multiplicou tanto como as dos filhos de Judá\" (1Cr 4:27). Vinte e dois filhos numa casa só, e mesmo assim Simeão continua a menor das tribos — o cumprimento silencioso do que Jacó dissera: \"eu os dividirei em Jacó, e os espalharei em Israel\" (Gn 49:7). Mas onde há bênção o texto também a registra (4:38): são essas famílias que acharão terra farta em Gedor (4:39-41)."
    },
    pastor: {
      title: "Os pastores de Simeão que desceram a Gedor a buscar pasto",
      subtitle: "1Cr 4:39-41 • os príncipes que acharam terra farta e quieta ao oriente do vale",
      text: "O capítulo dos ofícios termina em pasto. \"E chegaram até à entrada de Gedor, ao oriente do vale, a buscar pasto para os seus rebanhos\" (1Cr 4:39), e o que encontram vem descrito com adjetivos que não parecem de genealogia: \"E acharam pasto fértil e terra espaçosa, e quieta, e descansada\" (4:40). É a coisa mais parecida com um jardim que uma lista de nomes consegue dizer, e o motivo se repete uma terceira vez (4:41). Estes homens vieram \"nos dias de Ezequias, rei de Judá\" — a tribo que perdera território indo buscar o descanso que Deus prometera ao seu povo."
    },
    patriarca: {
      title: "Perez, tronco de Judá, e Simeão, o segundo filho de Israel",
      subtitle: "1Cr 4 • os dois pais de tribo que sustentam este capítulo",
      text: "O capítulo abre repetindo o tronco: \"Os filhos de Judá foram: Perez, Hezrom, Carmi, Hur, e Sobal\" (1Cr 4:1) — Perez, o filho de Tamar por quem a linhagem de Davi passou (Rt 4:18-22). Na metade do capítulo entra o segundo patriarca: \"Os filhos de Simeão foram Nemuel, Jamim, Jaribe, Zerá, e Saul\" (4:24). Os dois vieram do mesmo pai e tiveram destinos opostos: de Perez sai o rei, e Simeão desaparece dentro da herança de Judá, como Jacó dissera (Gn 49:7). O comentário é a própria lista: uma casa cresce até o trono, a outra encolhe até virar aldeia."
    },
    rebanho: {
      title: "Os rebanhos de Simeão, dos currais de Berseba ao pasto de Gedor",
      subtitle: "1Cr 4 • o gado que faz uma tribo inteira mudar de lugar",
      text: "Neste capítulo o gado é o que move a história. As cidades de Simeão são currais no sul seco — \"Etã, Aim, Rimom, Toquém, e Asã, cinco cidades\" (1Cr 4:32), com as aldeias em redor — e, quando o pasto acaba, a tribo anda. \"E chegaram até à entrada de Gedor, ao oriente do vale, a buscar pasto para os seus rebanhos\" (4:39), e o que acharam ficou escrito assim: \"pasto fértil e terra espaçosa, e quieta, e descansada\" (4:40). Um capítulo de artífices, oleiros e tecelões termina com ovelhas comendo em silêncio — porque a bênção de Deus quase sempre tem cheiro de campo."
    },
    rei: {
      title: "O rei em cuja obra ficaram os oleiros — e Ezequias, nos dias de quem Simeão subiu a Gedor",
      subtitle: "1Cr 4 • a coroa vista de fora, pelos que trabalhavam para ela",
      text: "O rei entra neste capítulo pela porta da oficina: \"Estes foram oleiros, e habitavam nas hortas e nos cerrados; estes ficaram ali com o rei na sua obra\" (1Cr 4:23). Não há trono, nem batalha, nem discurso — há um ofício de barro trabalhando para a casa real, e o Cronista o registra com a mesma dignidade com que registra príncipes. Antes disso, as cidades de Simeão são datadas pela monarquia: \"até que Davi reinou\" (4:31). E no fim aparece o rei em cujos dias a tribo pequena se atreveu a sair (4:41). Aqui a coroa serve de calendário para a vida de gente comum."
    },
    servo: {
      title: "Os moços das oficinas de Judá: o vale dos artífices, o linho fino e a olaria do rei",
      subtitle: "1Cr 4 • os aprendizes e serviçais das casas de ofício da tribo",
      text: "Este é o capítulo do trabalho, e os servos são os que o fazem. No vale de Joabe estão os aprendizes de um lugar cujo nome é a profissão dos moradores: \"pai dos do vale dos artífices; porque os dali eram artífices\" (1Cr 4:14). Nas casas de Asbéia estão os moços dos teares (4:21) — o mesmo linho de que se faziam as vestes do santuário (Êx 28:39). Nas hortas do sul estão os da olaria, que \"ficaram ali com o rei na sua obra\" (4:23). Nenhum deles fala; todos fazem — e o Cronista os conta porque a história de Deus passa por dentro de uma oficina."
    }
  },

  // ---------------------------------------------------------------- 1Cr 5
  5: {
    anciao: {
      title: "Os chefes das casas de além do Jordão e os escribas que os registraram",
      subtitle: "1Cr 5 • Safate, Abiail, Abdiel, Jadiel — e o cadastro feito nos dias de Jotão",
      text: "São os cabeças de casa paterna das três tribos do outro lado do Jordão. Rúben tem os seus: \"tiveram por chefes Jeiel e Zacarias\" (1Cr 5:7). Gade tem os seus em Basã (5:12,15). A meia tribo de Manassés tem os seus, descritos com um elogio raro: \"homens valentes, homens de nome, e chefes das casas de seus pais\" (5:24). Junto deles está o escriba que fez a conta, e o texto até o data: \"nos dias de Jotão, rei de Judá, e nos dias de Jeroboão, rei de Israel\" (5:17). O último ancião do capítulo, porém, é o que atendia aos altares alheios (5:25)."
    },
    homem: {
      title: "Rúben, Gade e a meia tribo de Manassés: os valentes que clamaram a Deus na peleja",
      subtitle: "1Cr 5 • os homens de além do Jordão, do primogênito deserdado ao cativeiro",
      text: "O capítulo abre com uma perda: Rúben era o primogênito, \"mas porque profanara a cama de seu pai, deu-se a sua primogenitura aos filhos de José\" (1Cr 5:1). O que sobra a estes homens é terra, gado e guerra, e a guerra vem descrita com números e com teologia: \"homens muito valentes, que traziam escudo e espada, e entesavam o arco\" (5:18). A vitória, porém, não é creditada à perícia: \"na peleja, clamaram a Deus que lhes deu ouvidos, porquanto confiaram nele\" (5:20). O fim é o avesso do começo: \"Porém transgrediram contra o Deus de seus pais\" (5:25), e os mesmos homens acabam levados presos."
    },
    mulherComum: {
      title: "As mulheres de Gileade: as das tendas tomadas aos hagarenos e as levadas ao cativeiro",
      subtitle: "1Cr 5 • as que ficaram nas tendas da vitória e as que saíram na estrada da deportação",
      text: "Duas cenas, dois destinos. Na primeira, os rubenitas vencem os hagarenos e tomam-lhes o lugar de morada: \"e eles habitaram nas suas tendas defronte de todo o lado oriental de Gileade\" (1Cr 5:10) — as tendas eram das mulheres que ali criavam os filhos. Na segunda, a conta se inverte, e são as de Israel que saem: os reis da Assíria \"os trouxeram a Hala, e a Habor, e a Hara, e ao rio de Gozã\" (5:26). Entre uma cena e outra houve gado farto e cidades — e houve o pecado que o texto nomeia sem rodeio (5:25). O desterro sempre se mede nas mulheres e nas crianças da estrada."
    },
    multidao: {
      title: "Os quarenta e quatro mil setecentos e sessenta que saíam à peleja",
      subtitle: "1Cr 5:18,23 • o exército das duas tribos e meia e as famílias que encheram o Hermom",
      text: "\"Dos filhos de Rúben, e dos gaditas, e da meia tribo de Manassés, homens muito valentes... houve quarenta e quatro mil e setecentos e sessenta, que saíam à peleja\" (1Cr 5:18). É um exército contado até a última dezena — e, contado assim, torna ainda mais surpreendente o que o Cronista diz da vitória: ela não veio do número, veio do clamor (5:20). A mesma multidão reaparece em paz, ocupando o norte inteiro: \"multiplicaram-se desde Basã até Baal-Hermom\" (5:23). Terra farta, tribo numerosa, guerra ganha — e ainda assim o capítulo termina em deportação."
    },
    pastor: {
      title: "Os pastores de Rúben e de Gade, de Aroer aos arrabaldes de Sarom",
      subtitle: "1Cr 5 • as tribos que escolheram a terra pelo pasto",
      text: "Estas tribos ficaram do outro lado do Jordão por uma razão só, e Números a registra: tinham muitíssimo gado (Nm 32:1). O Cronista repete o motivo no meio da lista — Bela se espalhou para o oriente \"porque seu gado se tinha multiplicado na terra de Gileade\" (1Cr 5:9). Gade fica defronte, nos pastos gordos do norte (5:11), e a sua gente ainda apascentava \"em todos os arrabaldes de Sarom\" (5:16). A terra escolhida pelo pasto foi a primeira a ser perdida no cativeiro — a herança que parece melhor aos olhos nem sempre é a melhor diante de Deus."
    },
    patriarca: {
      title: "Israel, que reparte a primogenitura, e Judá, de quem veio o soberano",
      subtitle: "1Cr 5:1-2 • a explicação teológica que abre o capítulo",
      text: "Os dois patriarcas em cena estão nos dois primeiros versículos, e eles explicam o livro inteiro. Rúben era \"o primogênito de Israel\" e perdeu a primogenitura pelo pecado contra o pai (1Cr 5:1) — o que Jacó já sentenciara ao morrer (Gn 49:4). Mas o Cronista não deixa que se confunda primogenitura com cetro, e faz a distinção com uma clareza que decide toda a história bíblica: \"Porque Judá foi poderoso entre seus irmãos, e dele veio o soberano; porém a primogenitura foi de José\" (5:2). A porção dobrada foi para José; o trono foi para Judá (Gn 49:10)."
    },
    rebanho: {
      title: "O gado de Gileade e o despojo tomado aos hagarenos",
      subtitle: "1Cr 5 • os rebanhos que multiplicaram, a terra que encheram e a presa que trouxeram",
      text: "O rebanho é o personagem econômico deste capítulo. Rúben se espalha para o oriente \"porque seu gado se tinha multiplicado na terra de Gileade\" (1Cr 5:9); Gade pasta em Basã, e Manassés sobe até o Hermom. Depois da guerra, o despojo vem contado com minúcia de escrivão: \"seus camelos, cinqüenta mil, e duzentas e cinqüenta mil ovelhas, e dois mil jumentos\" (5:21). É a maior conta de gado do livro, e o Cronista a atribui inteira a Deus: \"porque de Deus era a peleja\" (5:22). A abundância que Deus dá pode ser guardada; a que toma o lugar de Deus, não."
    },
    rei: {
      title: "Os reis deste capítulo: o soberano que veio de Judá, e Pul e Tiglate-Pilneser",
      subtitle: "1Cr 5 • a coroa prometida a Judá e as coroas pagãs que Deus usou como vara",
      text: "O primeiro rei aparece sem nome, numa frase de doutrina: \"Judá foi poderoso entre seus irmãos, e dele veio o soberano\" (1Cr 5:2) — é a casa de Davi anunciada dentro da genealogia de Rúben. Os outros reis do capítulo são todos estrangeiros e todos instrumentos. O príncipe dos rubenitas é levado por um deles (5:6). E o fim do capítulo mostra quem realmente move os impérios: \"o Deus de Israel suscitou o espírito de Pul, rei da Assíria, e o espírito de Tiglate-Pilneser\" (5:26). O rei pagão não venceu Israel — Deus o levantou como \"vara da minha ira\" (Is 10:5)."
    },
    servo: {
      title: "Os moços das casas paternas de Gade, do campo da peleja e da estrada do cativeiro",
      subtitle: "1Cr 5 • quem serve nas tendas, quem recolhe o despojo e quem caminha para Habor",
      text: "Os servos deste capítulo acompanham as três etapas da história das tribos de além do Jordão. Primeiro, os moços das casas de Gade, contadas uma a uma: \"E seus irmãos, segundo as suas casas paternas\" (1Cr 5:13). Depois, os que recolhem o despojo da guerra aos hagarenos e ficam a morar na terra vencida: \"habitaram em seu lugar, até ao cativeiro\" (5:22) — sete palavras em que cabe todo o tempo que lhes restava. E, por fim, os que saem na estrada da deportação (5:26). O Cronista escreve \"até ao dia de hoje\" com o desterro ainda diante dos olhos."
    }
  },

  // ---------------------------------------------------------------- 1Cr 6
  6: {
    anciao: {
      title: "Os sumos sacerdotes da casa de Arão e os anciãos levitas das cidades",
      subtitle: "1Cr 6 • de Eleazar a Jeozadaque, o cativo, e os velhos que receberam as cidades",
      text: "Esta é a lista mais solene do livro: a linha que queimava o incenso, de Eleazar e Finéias até o exílio. No meio dela o Cronista acende as lâmpadas do templo — Azarias, \"o que exerceu o sacerdócio na casa que Salomão tinha edificado\" (1Cr 6:10) — e onze nomes depois apaga tudo numa linha só: \"E Jeozadaque foi levado cativo\" (6:15). Entre os dois extremos estão Zadoque e Hilquias, o que achou o livro da lei (2Rs 22:8). Sacerdote não herdava terra — \"eu sou a tua parte e a tua herança\" (Nm 18:20) —, e por isso a conta deles é de cidades cedidas por todas as tribos (6:55-57)."
    },
    homem: {
      title: "Os levitas: as três casas de Levi, os cantores de Davi e os homens das cidades de refúgio",
      subtitle: "1Cr 6 • Gérson, Coate e Merari; Hemã, Asafe e Etã; e a tribo espalhada por Israel",
      text: "Levi tem três filhos, e os três viram três serviços: \"Os filhos de Levi foram: Gérson, Coate e Merari\" (1Cr 6:1) — Gérson levava as cortinas, Coate levava o santuário aos ombros (Nm 7:9) e Merari as tábuas. De Coate saem os nomes maiores: \"Arão, Moisés, e Miriã\" (6:3). Na metade do capítulo a tribo passa a cantar: \"os que Davi constituiu para o ofício do canto na casa do Senhor, depois que a arca teve repouso\" (6:31) — enquanto a arca andava, ninguém cantava. No fim, a tribo sem herança guarda as cidades de refúgio (6:67), justamente as portas onde uma vida podia ser salva."
    },
    mulherComum: {
      title: "Miriã, as mulheres das tendas levíticas e as das cidades dos arrabaldes",
      subtitle: "1Cr 6 • as mulheres da casa de Levi, do Egito ao exílio e às aldeias do país inteiro",
      text: "A primeira é nomeada logo no terceiro versículo, ao lado dos dois irmãos: \"E os filhos de Anrão: Arão, Moisés, e Miriã\" (1Cr 6:3) — a menina que vigiou a arca de juncos e a profetisa do cântico do mar (Êx 15:20). Depois vêm as anônimas: as mulheres das tendas de Coate e da casa de Elcana, que criaram os meninos de quem sairiam Samuel e os cantores. E vêm as mulheres das cidades levíticas, espalhadas por dentro de todas as tribos, dos arrabaldes de Bete-Semes aos de Jazer (6:59,81). Levi não teve território, mas teve casa em toda parte — e em cada uma havia uma família."
    },
    multidao: {
      title: "Os levitas postos para todo o ministério e o Israel que lhes deu as cidades",
      subtitle: "1Cr 6:48,64 • o corpo inteiro da tribo servindo, e o povo entregando parte da herança",
      text: "Os cantores ficam no meio, mas a casa toda em volta serve: \"E seus irmãos, os levitas, foram postos para todo o ministério do tabernáculo da casa de Deus\" (1Cr 6:48). É uma multidão de carregadores, porteiros e serventes — gente sem nome guardada numa frase só, e sem a qual não haveria culto. A segunda multidão está do outro lado da conta: \"Assim os filhos de Israel deram aos levitas estas cidades e os seus arrabaldes\" (6:64). Cada tribo cedeu um pedaço da herança para que a tribo do santuário tivesse onde morar (Nm 35:2): um povo sem terra, sustentado por todos."
    },
    pastor: {
      title: "Os pastores dos arrabaldes levíticos, de Hebrom a Basã e ao monte Tabor",
      subtitle: "1Cr 6 • os levitas que apascentavam nos campos ao redor das suas cidades",
      text: "As cidades dos levitas vinham sempre com os seus arrabaldes, e a lei diz para que serviam: \"os seus arrabaldes serão o seu gado, e para os seus bens, e para todos os seus animais\" (Nm 35:3). Por isso a cena põe pastores em quase todo o mapa do fim do capítulo: em Hebrom \"e os arrabaldes que a rodeiam\" (1Cr 6:55); nos pastos gordos de Basã (6:62); no vale de Aijalom (6:69), onde a lua um dia parou; e no alto de \"Tabor e os seus arrabaldes\" (6:77). Nem tudo aqui é incenso: a tribo do santuário também tirava leite, lã e carne do campo."
    },
    patriarca: {
      title: "Levi e as três casas — e os pais da linha de Elcana, até Samuel",
      subtitle: "1Cr 6 • os troncos da tribo sacerdotal, de Levi até Israel",
      text: "Tudo neste capítulo pende de um nome: \"Os filhos de Levi foram: Gérson, Coate e Merari\" (1Cr 6:1), repetido de propósito quando a lista recomeça (6:16). Cada um vira uma família e um cargo. Na casa de Coate está o ramo que a Escritura acompanha de perto: \"Aminadabe, seu filho; Coré, seu filho\" (6:22) — sim, o Coré que se rebelou no deserto, de cujos filhos Números faz questão de dizer que \"não morreram\" (Nm 26:11). Dessa casa desce Elcana, e dele o profeta que ungiria dois reis (6:28). E a genealogia de Hemã sobe até \"filho de Coate, filho de Levi, filho de Israel\" (6:38)."
    },
    rebanho: {
      title: "O gado dos levitas: os bois dos carros de Gérson e os rebanhos dos arrabaldes",
      subtitle: "1Cr 6 • os animais do serviço da tenda e os das cidades espalhadas por Israel",
      text: "O primeiro gado da cena é de trabalho: os bois dos carros dos gersonitas, que levavam as cortinas e as coberturas do tabernáculo pelo deserto (Nm 7:7). O resto do rebanho aparece no mapa do fim do capítulo, porque toda cidade levítica vinha com pasto em volta — \"Hebrom... e os arrabaldes que a rodeiam\" (1Cr 6:55) —, e a lei já dissera para quê: \"os seus arrabaldes serão o seu gado\" (Nm 35:3). Há gado em Basã (6:62) e nas encostas do Tabor (6:77). A tribo que não recebeu herança recebeu, dentro de cada tribo, um cercado — porque o SENHOR era a sua parte (Nm 18:20)."
    },
    servo: {
      title: "Os serventes do pátio do templo e os moços das cidades levíticas",
      subtitle: "1Cr 6 • quem carrega, guarda e mora nas cidades dadas a Levi por sorte",
      text: "Junto dos sacerdotes há sempre quem carregue. No pátio da casa que Salomão edificou estão os moços do serviço (1Cr 6:10), e antes deles, no deserto, os que armavam e desmontavam a tenda, geração após geração (6:23). No fim do capítulo, os servos são os moradores das cidades dadas a Levi: as de Benjamim, \"Geba... Alemete... e Anatote e os seus arrabaldes\" (6:60) — Anatote, de onde viria Jeremias (Jr 1:1) —, e os da costa, em Abdom (6:74). Nenhum é nomeado, mas todos existem pela mesma razão: para que houvesse quem servisse à casa de Deus em todo canto de Israel."
    }
  }
};
