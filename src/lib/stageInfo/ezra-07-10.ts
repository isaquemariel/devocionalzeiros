// Fichas ESPECÍFICAS por (capítulo → papel) de ESDRAS 7–10.
// Cinquenta e oito anos depois de acabada a casa entra um homem que não traz
// pedreiro nenhum: traz um ROLO. O capítulo 7 o apresenta subindo a própria
// genealogia até Arão, o sumo sacerdote, e resume quatro meses de estrada numa
// coisa que não se desenha — "segundo a boa mão do seu Deus sobre ele" —, antes
// de abrir a carta de Artaxerxes por extenso, do "rei dos reis" ao sal à
// vontade. O 8 é gente carregando fardo casa por casa, o rio que vai a Aava
// onde falta uma tribo inteira na chamada, o jejum de quem teve VERGONHA de
// pedir escolta armada, e a prata pesada duas vezes. O 9 é o chão cedendo: as
// vestes rasgadas, os cabelos arrancados, o homem assentado atônito até o
// sacrifício da tarde, e uma oração que não pede nada. O 10 é uma praça
// encharcada no nono mês, gente tremendo de frio e de medo ao mesmo tempo, e
// uma lista de nomes que acaba sem consolo nenhum. Cada figurante destas cenas
// é alguém REAL daquele capítulo — o netineu da caravana, o carregador do
// portão do rio, o moço do pátio do ensino, a mulher que saiu pela estrada no
// último versículo do livro.
import type { StageInfo } from "@/lib/rpgStageInfo";

export const CHAPTER_ACTORS_07_10: Record<number, Record<string, StageInfo>> = {
  // ----------------------------------------------------------------- Ed 7
  7: {
    patriarca: {
      title: "Esdras, o escriba hábil na lei de Moisés — e Arão, o sumo sacerdote, em quem a sua genealogia para de subir",
      subtitle: "Ed 7:1-10 • a câmara dos rolos em babilônia, dezesseis degraus de nomes acima, e o versículo que governa o livro",
      text: "O capítulo não apresenta este homem pelo cargo: apresenta-o subindo a própria linhagem, degrau por degrau, até parar em \"Finéias, filho de Eleazar, filho de Arão, o sumo sacerdote\" (Ed 7:5). É por isso que o rolo na mão dele tem direito de estar ali: \"era escriba hábil na lei de Moisés\" (v. 6). E então vem a frase que governa o livro: \"Porque Esdras tinha preparado o seu coração para buscar a lei do Senhor e para cumpri-la e para ensinar em Israel os seus estatutos\" (Ed 7:10) — buscar, cumprir, ensinar, nesta ordem, e nunca a terceira antes da segunda.",
    },
    rei: {
      title: "Artaxerxes, rei dos reis, que deu a Esdras tudo quanto lhe pedira e escreveu a carta por extenso",
      subtitle: "Ed 7:6,11-26 • o pátio de audiência em Susã, o trono e o rolo que atravessa o capítulo inteiro",
      text: "Artaxerxes I reina no sétimo ano do seu governo, e o texto lhe dá o título que ele mesmo usa: \"rei dos reis\" (Ed 7:12). A carta que dita é o documento mais generoso que um pagão assina em toda a Escritura: quem quiser, vá; leve a prata voluntária; compre o gado do altar; restitua os utensílios; e o que faltar, tire-se da casa dos tesouros do rei, \"e sal à vontade\" (v. 22). O motivo que ele alega é dele — medo de deus estrangeiro (v. 23). Mas quem lê a carta não a credita a Susã: \"Bendito seja o Senhor Deus de nossos pais, que tal inspirou ao coração do rei\" (v. 27).",
    },
    anciao: {
      title: "Os avós sacerdotais de Esdras — Seraías, Salum, Zadoque, Amarias, Buqui e Eleazar — e os anciãos do outro lado da carta: os sete conselheiros do rei, o escriba da corte, o levita que o recebeu em Jerusalém e os juízes que ele haveria de nomear",
      subtitle: "Ed 7:1-5,8,11-14,18,21-28 • a câmara dos rolos, o pátio persa e o portão de Jerusalém",
      text: "Metade destes homens está morta há séculos e só existe como degrau: Seraías, o pai, é o sumo sacerdote que Nabucodonosor matou em Ribla (2Rs 25:18-21); Zadoque ungiu Salomão em Giom (1Rs 1:39); Eleazar recebeu as vestes de Arão no monte Hor (Nm 20:26-28). A outra metade está viva e é persa: \"és enviado da parte do rei e dos seus sete conselheiros\" (Ed 7:14) — sete homens do conselho do império assinando a soltura de um povo pequeno. E no fim da estrada, os juízes que a mesma carta manda instituir (v. 25).",
    },
    homem: {
      title: "Aitube, Azarias, Meraiote, Uzi, Zeraquias e Finéias, degraus da linhagem — e os homens da carta: o tesoureiro do palácio, o tesoureiro-mor da casa dos tesouros, os tesoureiros dalém do rio, o mercador do portão, o cantor e o porteiro que subiram, e os chefes de Israel ajuntados para a subida",
      subtitle: "Ed 7:2-5,7,13-28 • do santuário antigo ao mercado do portão de Susã",
      text: "Os primeiros são nomes de uma escada: Finéias é o neto de Arão que deteve a praga em Sitim e recebeu o sacerdócio perpétuo (Nm 25:12-13); Azarias, Meraiote, Zeraquias e Uzi são a corrente que 1 Crônicas 6:6-12 registra. Os outros são homens vivos, e cada um segura uma peça do decreto: o tesoureiro que conta a prata voluntária (Ed 7:15), o que abre a conta do rei (v. 20), o mercador do portão que vende o que a carta manda comprar (v. 17), o cantor e o porteiro da caravana, isentos de tributo (v. 24).",
    },
    mulherComum: {
      title: "A mulher da caravana que fez os quatro meses de estrada, a que ofereceu voluntariamente na província de babilônia e a que viu a fila entrar por Jerusalém no quinto mês",
      subtitle: "Ed 7:8-9,16 • as três posições em que uma mulher aparece neste capítulo — a estrada, a oferta e o portão",
      text: "O texto conta a viagem em datas e não em cenas, e é preciso pôr gente dentro delas: \"no primeiro dia do primeiro mês foi o princípio da partida de babilônia; e no primeiro dia do quinto mês chegou a Jerusalém\" (Ed 7:9). Esta mulher andou os quatro meses inteiros, sem escolta armada nenhuma (Ed 8:22), com filho pequeno e cântaro no fardo — e chegou. Outra está na província e nunca sai dela: manda a oferta voluntária no lugar do corpo (v. 16). Nenhuma delas tem nome; duas gerações adiante, o texto fará questão de dizer que estavam lá (Ne 8:2).",
    },
    multidao: {
      title: "Os filhos de Israel, os sacerdotes, os levitas, os cantores, os porteiros e os servidores do templo que subiram a Jerusalém no sétimo ano de Artaxerxes",
      subtitle: "Ed 7:7 • a segunda leva de retornados, contada por ofícios e não por cabeças",
      text: "\"Também subiram a Jerusalém alguns dos filhos de Israel, dos sacerdotes, dos levitas, dos cantores, dos porteiros e dos servidores do templo\" (Ed 7:7). O versículo é uma lista de ofícios, e é assim que este livro conta gente: por função no serviço da casa. O número exato virá no capítulo seguinte e dá pouco mais de mil e quinhentos homens — nada perto dos quarenta e dois mil da primeira volta (Ed 2:64). Esta é a leva pequena, a que sobe quando já não há novidade nenhuma em subir: quem parte deixa em babilônia casa feita, ofício e parentela.",
    },
    rebanho: {
      title: "Os novilhos, os carneiros e os cordeiros que a carta do rei manda comprar diligentemente com a prata da Pérsia",
      subtitle: "Ed 7:17 • o gado do mercado do portão, comprado com dinheiro de império para o altar de Jerusalém",
      text: "\"Portanto diligentemente comprarás com este dinheiro novilhos, carneiros, cordeiros, com as suas ofertas de alimentos, e as suas libações\" (Ed 7:17). O advérbio é do rei, e a lista que ele dita é exatamente a de Números 15:1-10: o animal nunca sobe sozinho ao altar. Um monarca persa a especificar o ritual levítico por escrito, com o cuidado de quem não quer errar a fórmula (v. 23). Este gado é comprado na feira do portão, sobe os mesmos quatro meses de estrada e acaba em fogo no pátio de Jerusalém (Ed 8:35) — e toda esta contabilidade aponta para um só (Jo 1:29).",
    },
    servo: {
      title: "O moço da câmara dos rolos em babilônia, o guarda do tesouro do rei, o guarda dos utensílios restituídos, o carregador do trigo e do vinho da conta real, o mordomo do palácio e os netineus que subiram na caravana",
      subtitle: "Ed 7:1,7-9,15-24 • as mãos que carregam o que a carta apenas escreve",
      text: "O primeiro está no cubículo de estudo do exílio, e o trabalho dele é manter o rolo aberto e o candeeiro aceso: é ali que a genealogia de Ed 7:1-5 é conferida nome por nome, porque sem registro não há sacerdócio — foi por não acharem o seu que três casas foram excluídas na primeira volta (Ed 2:62). Outro embala os vasos que a Pérsia devolve (Ed 7:19); outro pesa o trigo, o vinho e o azeite do teto real. E os últimos são os netineus, os mais baixos do serviço, isentos de tributo por escrito junto com os sacerdotes (v. 24).",
    },
  },

  // ----------------------------------------------------------------- Ed 8
  8: {
    patriarca: {
      title: "Esdras no rio que vai a Aava: o que atenta para o povo e descobre que falta uma tribo inteira, o que teve vergonha de pedir escolta e o que pesa a prata duas vezes",
      subtitle: "Ed 8:15,21-23,31-34 • três dias de acampamento, um jejum e quatro meses de estrada sem soldado nenhum",
      text: "\"E ajuntei-os perto do rio que vai a Aava... Então atentei para o povo e para os sacerdotes, e não achei ali nenhum dos filhos de Levi\" (Ed 8:15). O verbo é o do capítulo: ele ATENTA — passa os olhos pela sua própria gente antes de partir e vê o buraco no meio dela. Depois apregoa jejum e explica por que não pediu tropa: \"tive vergonha de pedir ao rei exército e cavaleiros\", porque já tinha dito ao rei que \"A mão do nosso Deus é sobre todos os que o buscam\" (Ed 8:22). A vergonha não é de Deus: é de desdizer, diante de um pagão, uma frase que já saíra da sua boca.",
    },
    rei: {
      title: "Artaxerxes no flashback do versículo 22: o rei a quem Esdras já dissera, na cara, que a mão do seu Deus é sobre todos os que o buscam",
      subtitle: "Ed 8:22 • a sala persa lembrada de dentro do jejum, com o cavalo e a lança da escolta parados e recusados",
      text: "Este quadro é memória, não presente: enquanto o povo jejua junto ao rio Aava, Esdras lembra a audiência em que tudo se decidiu — \"tínhamos falado ao rei, dizendo: A mão do nosso Deus é sobre todos os que o buscam\" (Ed 8:22). Foi pregação feita diante do trono, e o preço chega quatro meses depois: pedir agora exército seria confessar que a frase era de ocasião. O rei está desenhado com o que ELE OFERECIA e não foi levado — o cavalo e a lança, disponíveis, parados. Neemias, no mesmo reinado, aceitaria a escolta sem constrangimento (Ne 2:9).",
    },
    anciao: {
      title: "Os chefes das casas paternas que subiram com Esdras — Gérson dos filhos de Finéias, os anciãos de Secanias, de Elão, de Sefatias e de Adonicão — e Ido, o chefe em Casifia, Serebias, Hasabias, Meremote filho de Urias e o governador dalém do rio",
      subtitle: "Ed 8:1-14,17-19,24,33,36 • do portão do rio em babilônia à câmara da pesagem em Jerusalém",
      text: "\"Estes, pois, são os chefes das casas paternas e esta a genealogia dos que subiram comigo\" (Ed 8:1). Não é arquivo: é a chamada de embarque, casa por casa, ao amanhecer num portão de muralha. As duas linhas sacerdotais de Arão abrem a fila (v. 2). Falta uma tribo inteira, e é isso que o versículo 15 descobre. Ido é o chefe em Casifia, povoado de levitas em terra estrangeira, e de lá saem Serebias e Hasabias (v. 18-19), que reaparecerão em Neemias à frente do povo (Ne 8:7; 9:4). E o último ancião do capítulo é persa, e faz o inesperado: \"ajudaram o povo e a casa de Deus\" (v. 36).",
    },
    homem: {
      title: "Os homens da subida: Hatus dos filhos de Davi, Zacarias de Parós, Elioenai filho de Zacarias, Ebede, Jesaías, Zebadias, Obadias, o filho de Josifias, Joanã filho de Hacatã, Elifelete, Jeiel e Semaías dos últimos filhos de Adonicão, Utai e Zabude — os onze chefes enviados a Casifia, o escriba da pesagem, o sátrapa persa e o salteador que armava cilada pelo caminho",
      subtitle: "Ed 8:2-14,16-17,25-27,31,36 • a fila das casas paternas, a estrada de Casifia e a emboscada que não aconteceu",
      text: "A lista de Ed 8:2-14 tem catorze casas, e uma delas cala o quadro inteiro: \"dos filhos de Davi, Hatus\" (v. 2) — a casa real de Judá sobe de babilônia como mais uma casa paterna, sem trono e sem nota de rodapé; é este o fio pelo qual a promessa a Davi atravessa o exílio até Mateus 1:12-13. Três outros carregam um detalhe triste: \"os últimos filhos de Adonicão\" (v. 13) — os que ficaram para trás na primeira volta, sessenta homens atrasados por uma geração. E o último homem do capítulo é o que não aparece: \"os que nos armavam ciladas pelo caminho\" (v. 31).",
    },
    cavaleiro: {
      title: "O cavaleiro que Esdras NÃO pediu ao rei — a escolta oferecida, disponível e recusada por causa de uma frase já dita",
      subtitle: "Ed 8:22 • a lembrança da sala persa dentro do jejum junto ao rio Aava",
      text: "Esta figura está em cena por ausência, e é o único caso do livro em que importa o que ficou de fora do quadro: \"Porque tive vergonha de pedir ao rei exército e cavaleiros para nos defenderem do inimigo pelo caminho\" (Ed 8:22). São mais de mil e quinhentos quilômetros de estrada mal guardada, com mulheres, crianças e uma fortuna em prata — o alvo que qualquer bando esperaria. A escolta existia e não lhe seria negada (Ed 7:6). O que o impede é a memória de uma pregação. E o texto não faz disso heroísmo nem regra: registra o jejum e a resposta com a mesma secura (v. 23).",
    },
    mulherComum: {
      title: "As mulheres das casas paternas que subiram — de Paate-Moabe, de Adim, de Elão, de Selomite, de Merari — e a mulher do acampamento do rio Aava, que jejuou três dias com os filhos",
      subtitle: "Ed 8:4-10,15,21,32 • as tendas armadas fora do muro, a fila dos jumentos e a margem do rio",
      text: "A lista conta homens — \"e com ele duzentos homens\" —, mas quem levanta e desmonta tenda são elas, e o texto o diz quando chega ao jejum: \"para lhe pedirmos caminho seguro para nós, para nossos filhos e para todos os nossos bens\" (Ed 8:21). Para nossos filhos: são famílias inteiras na estrada, não uma tropa. Esta mulher atravessou quatro meses de deserto sem soldado à frente da coluna e ficou três dias sem comer na margem de Aava com criança pequena ao lado. Uma geração depois, o texto fará questão de contar quem estava lá (Ne 8:2).",
    },
    multidao: {
      title: "Os números da chamada: cento e cinquenta de Parós, duzentos de Paate-Moabe, trezentos de Secanias, duzentos e dezoito de Joabe, cento e sessenta de Selomite, cento e dez de Azgade — e os duzentos e vinte servidores do templo que Davi e os príncipes deram ao ministério dos levitas",
      subtitle: "Ed 8:3-12,20 • a fila que se forma no portão do rio, casa por casa, com o número atrás de cada nome",
      text: "Cada bloco desta multidão é uma casa paterna com o seu chefe à frente e o seu número atrás (Ed 8:3-14). Somados os catorze grupos, dá cerca de mil e quinhentos homens — com mulheres e crianças, talvez cinco mil na estrada. É pouco: a volta com Zorobabel tinha sido de quarenta e dois mil (Ed 2:64). E o último bloco não é de Israel de sangue: \"duzentos e vinte servidores do templo; que foram todos mencionados por seus nomes\" (Ed 8:20). Netineus, gente da base do serviço — e o texto faz questão de dizer que TODOS foram chamados pelo próprio nome.",
    },
    rebanho: {
      title: "Os doze novilhos por todo o Israel, os noventa e seis carneiros, os setenta e sete cordeiros e os doze bodes do sacrifício pelo pecado",
      subtitle: "Ed 8:35 • o altar dos que voltaram do cativeiro, no pátio de Jerusalém, ainda com a poeira da estrada",
      text: "\"doze novilhos por todo o Israel, noventa e seis carneiros, setenta e sete cordeiros, e doze bodes em sacrifício pelo pecado\" (Ed 8:35). Os números são teologia. DOZE: gente que voltou de duas ou três tribos oferece pelas doze, porque não se reconhece como resto de Judá, e sim como Israel inteiro — a conta das doze pedras de Elias no Carmelo (1Rs 18:31). Os bodes vêm por último, no rito de Levítico 4. Este gado não foi comprado em Jerusalém: subiu a estrada com a prata de babilônia, como a carta mandara (Ed 7:17). Antes de qualquer reunião, o fogo.",
    },
    servo: {
      title: "Os carregadores do portão do rio, os que amarraram os fardos da partida ao meio-dia, os que levaram os seiscentos e cinquenta talentos de prata, os meninos das casas de Adim, de Paate-Moabe e de Serebias, os irmãos de Ido em Casifia, o correio do governo dalém do rio e Noadias, filho de Binui, o levita da pesagem",
      subtitle: "Ed 8:1-14,17,25-33,36 • as costas em que este capítulo inteiro viaja",
      text: "O capítulo é feito de peso, e alguém carrega cada grama dele. Na margem de Aava, estes recebem à mão o que a balança acabou de marcar: \"seiscentos e cinqüenta talentos de prata... e cem talentos de ouro\" (Ed 8:26) — mais de vinte toneladas repartidas por costas humanas, sem carro e sem escolta. E o encargo que recebem não é de estivador: \"Vigiai, pois, e guardai-os até que os peseis... nas câmaras da casa do Senhor\" (v. 29). Em Casifia estão os irmãos de Ido, netineus de um povoado inteiro dedicado ao serviço do templo em terra estrangeira (v. 17,20).",
    },
  },

  // ----------------------------------------------------------------- Ed 9
  9: {
    patriarca: {
      title: "Esdras com as vestes rasgadas, os cabelos arrancados e assentado atônito até o sacrifício da tarde — e depois de joelhos, com as mãos estendidas",
      subtitle: "Ed 9:3-6,15 • o pátio do ensino virado do avesso, e uma oração que acaba sem pedir nada",
      text: "A notícia chega numa manhã comum e derruba o quadro inteiro: \"rasguei as minhas vestes e o meu manto, e arranquei os cabelos da minha cabeça e da minha barba, e sentei-me atônito\" (Ed 9:3). Quatro gestos em fila, e o último é o mais estranho: ele não fala, não convoca, não decreta — SENTA-SE, e fica horas (v. 4). A oração que sai dali não usa a terceira pessoa uma única vez: é sempre NÓS, embora ele não tenha tomado mulher nenhuma (v. 6). E termina sem pedido, só dizendo onde estão: \"eis que estamos diante de ti, na nossa culpa\" (Ed 9:15).",
    },
    anciao: {
      title: "Os príncipes que se chegaram a Esdras com a denúncia — e o sacerdote que acendeu o sacrifício da tarde enquanto ele estava sentado atônito",
      subtitle: "Ed 9:1-2,4-5 • o alpendre do templo numa manhã comum, e o altar que continuou funcionando",
      text: "\"chegaram-se a mim os príncipes, dizendo: O povo de Israel, os sacerdotes e os levitas, não se têm separado dos povos destas terras\" (Ed 9:1). Estes anciãos não são acusados: são os que vieram contar, e a lista de povos que recitam é a de Deuteronômio 7:1-3, dita como se o exílio nunca tivesse acontecido. A frase que guardam para o fim arrebenta o capítulo: \"e até os príncipes e magistrados foram os primeiros nesta transgressão\" (v. 2). O segundo ancião em cena não diz nada: é o sacerdote de turno, que acende o holocausto vespertino como em qualquer outro dia.",
    },
    homem: {
      title: "Os que tremiam das palavras do Deus de Israel, o magistrado que foi o primeiro nesta transgressão, o cativo levado à espada nos dias dos pais e o homem do remanescente que escapou",
      subtitle: "Ed 9:2,4,7,13-15 • os quatro tipos de homem que a oração de Esdras põe em cena",
      text: "O primeiro chega sem ser chamado: \"Então se ajuntaram a mim todos os que tremiam das palavras do Deus de Israel\" (Ed 9:4) — gente que ainda estremece diante do que está escrito (Is 66:2), de pé em volta do homem sentado no chão. O segundo é o oposto exato: um magistrado, que tinha por ofício aplicar a lei, e \"até os príncipes e magistrados foram os primeiros nesta transgressão\" (v. 2). O terceiro é memória, entregue \"à espada, ao cativeiro, e ao roubo\" (v. 7). E o quarto é o resto que escapou (v. 13,15) — que aqui não é consolo, é advertência.",
    },
    mulherComum: {
      title: "A mulher que tremia das palavras do Deus de Israel, a cativa levada nos dias dos pais e a mulher do remanescente que escapou",
      subtitle: "Ed 9:4,7,11-15 • as três mulheres da oração: a que está de pé no pátio, a que foi levada e a que ficou",
      text: "A primeira está em cena e calada: entre \"todos os que tremiam das palavras do Deus de Israel\" (Ed 9:4) há mulheres que ficaram ali as horas todas, até o sacrifício da tarde. A segunda é lembrança: a avó desta gente saiu de Jerusalém amarrada (v. 7). A terceira é a que ficou, e sobre ela a oração faz a sua única citação direta: \"vossas filhas não dareis a seus filhos\" (v. 12; Dt 7:3). O problema não é etnia — Raabe e Rute estão na genealogia do Messias (Mt 1:5) —, é culto: temia-se a filha que trouxesse o deus dela para dentro de casa (1Rs 11:3-4).",
    },
    servo: {
      title: "O moço do pátio do ensino, que ficou com o rolo caído no chão, o pedreiro da parede de proteção em Judá e em Jerusalém, e o menino do remanescente que escapou",
      subtitle: "Ed 9:1,3,9,13 • os três serviços que continuam enquanto um homem está sentado atônito",
      text: "O primeiro é o moço que arruma o estrado do ensino: chegou de manhã, abriu o rolo, acendeu o candeeiro — e é neste quadro arrumado que a notícia entra e derruba tudo. O rolo fica caído onde caiu até o sacrifício da tarde (Ed 9:3-5). O segundo trabalha numa imagem da própria oração: \"para que nos desse uma parede de proteção em Judá e em Jerusalém\" (v. 9) — Jerusalém ainda não tem muro, faltam treze anos para Neemias, e a parede de que Esdras fala é a benignidade dos reis da Pérsia. O terceiro é criança, e é o argumento final da oração (v. 13-14).",
    },
  },

  // ---------------------------------------------------------------- Ed 10
  10: {
    patriarca: {
      title: "Esdras prostrado diante da casa de Deus, o que ajuramentou os chefes, o que não comeu pão nem bebeu água na câmara de Joanã e o que se levantou debaixo da chuva para falar",
      subtitle: "Ed 10:1,5-6,10-11,16-17,44 • do chão da praça à mesa da comissão que examinou o negócio de mês a mês",
      text: "Ele começa o capítulo no chão e de costas para todos (Ed 10:1). Quem o levanta não é ele nem uma voz do céu: é Secanias, que lhe diz \"Levanta-te, pois, porque te pertence este negócio... esforça-te, e age\" (v. 4). Então ajuramenta os chefes, e some: na câmara de Joanã \"não comeu pão, e nem bebeu água\" (v. 6) — a mesa vazia é o quadro inteiro. Reaparece de pé numa praça encharcada para dizer a frase mais dura do livro (v. 10). E o livro termina com ele calado, no versículo em que ninguém diz nada (v. 44).",
    },
    anciao: {
      title: "Os anciãos da grande congregação que chorou, o conselho que fixou os três dias, os anciãos de cada cidade chamados em tempos apontados, os chefes dos pais apontados para a inquirição, Joanã filho de Eliasibe, Mesulão que se opôs — e os nomes da lista: Maaséias de Jesuá, Maaséias de Harim, Netanel de Pasur, Jozabade o levita, Malquias de Parós, Jeiel de Elão, Zabade de Zatu, Atlai de Bebai, Bezalel de Paate-Moabe, Jeremai de Hasum, Matitias de Nebo e os sete de Bani",
      subtitle: "Ed 10:1-9,14-16,18-43 • a praça, a câmara da inquirição e as casas chamadas uma a uma",
      text: "Estes anciãos aparecem em três posições, e é preciso não os confundir. Os primeiros estão na praça, na chuva, e não decidem nada: são os cabeças da \"grande congregação de homens, mulheres e crianças\" (Ed 10:1). Os segundos governam, e fixam prazo curto e pena pesada — confisco e excomunhão (v. 8). Os terceiros são chamados de fora, cidade por cidade, \"e com eles os anciãos de cada cidade, e os seus juízes\" (v. 14). E um deles está do outro lado: \"e Mesulão, e Sabetai, levita, os ajudaram\" (v. 15) — o texto guarda o nome de quem discordou.",
    },
    homem: {
      title: "Secanias, filho de Jeiel, que falou primeiro; Jônatas, Jaseías, Mesulão e Sabetai, os quatro que se opuseram; o arauto do pregão; a voz que respondeu debaixo da chuva; o homem cuja fazenda se poria em interdito; e a lista casa por casa — Jesuá, Imer, Harim, Pasur, os levitas, o cantor, os porteiros, Parós, Elão, Zatu, Bebai, Bani, Paate-Moabe, Hasum e Nebo",
      subtitle: "Ed 10:2-4,7-15,18-43 • quem tomou a palavra, quem discordou e quem foi chamado pelo nome",
      text: "Quem abre a boca primeiro não é Esdras: \"Então Secanias, filho de Jeiel... no tocante a isto, ainda há esperança para Israel\" (Ed 10:2). É a única palavra de esperança do capítulo, e vem de uma casa que aparece na lista dos culpados. Depois passa o arauto, com três dias de prazo (v. 7-8). E a resposta da praça não vem de multidão em festa, vem de uma voz só, encharcada e prática: \"também é tempo de grandes chuvas, e não se pode estar aqui fora\" (v. 13). Quatro homens ficam parados enquanto o resto se move — e o texto escreve os quatro nomes (v. 15).",
    },
    mulherComum: {
      title: "A mulher da grande congregação que chorou com grande choro, a que ouviu o pregão, a que tremeu na praça debaixo das grandes chuvas — e as mulheres estrangeiras despedidas no último versículo do livro",
      subtitle: "Ed 10:1,7,9,44 • do choro da praça à estrada por onde elas saíram, com os filhos",
      text: "As três primeiras estão do lado de dentro: \"ajuntou-se a ele... uma grande congregação de homens, mulheres e crianças; pois o povo chorava com grande choro\" (Ed 10:1). Depois sentam-se no chão molhado, \"tremendo por este negócio e por causa das grandes chuvas\" (v. 9) — frio e medo na mesma frase, sem separar. As últimas estão do lado de fora, e o livro acaba nelas (v. 44), sem dizer para onde foram nem o que foi feito das crianças. A Escritura não elogia esta medida nem a repete: Malaquias, na mesma geração, dirá que o SENHOR aborrece o repúdio (Ml 2:16).",
    },
    servo: {
      title: "A criança que chorou com os pais na praça, o menino que tremeu debaixo das grandes chuvas, o moço da câmara de Joanã com a mesa vazia, o moço do portão do interdito, o do altar do delito, o da câmara da inquirição — e o filho e a filha que saíram com a mãe no último versículo",
      subtitle: "Ed 10:1,6,8-9,16,19,44 • os menores desta cena, que não votaram em nada e pagaram tudo",
      text: "A criança está no primeiro versículo, e o texto a põe ali de propósito (Ed 10:1); depois volta na praça alagada, sentada no chão com os pais, \"tremendo por este negócio e por causa das grandes chuvas\" (v. 9). Os moços servem as salas em que o negócio se decide: um cuida da câmara de Joanã, e o serviço dele é não servir nada — a mesa fica vazia dias a fio (v. 6); outro atiça o fogo do único sacrifício do capítulo (v. 19). E os dois últimos servos do livro são os que ninguém consultou: os filhos que saem pela estrada com a mãe (v. 44).",
    },
  },
};
