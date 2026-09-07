// Fichas ESPECÍFICAS por (capítulo → papel) de 2 CRÔNICAS 5–9.
// O ponto mais alto do livro. A arca sobe de Sião pela última vez nos ombros
// dos levitas e desce ao oráculo debaixo das asas dos querubins, com os varais
// tão compridos que as pontas se veem de dentro e dentro dela nada senão as
// duas tábuas de Horebe; os cantores de linho fino de Asafe, de Hemã e de
// Jedutum fazem "ouvir uma só voz" com cento e vinte trombetas, e a nuvem
// derruba o ministério dos sacerdotes. Depois vem a oração mais longa da
// Escritura, feita de joelhos sobre uma plataforma de metal no meio do pátio, e
// os seus sete casos — o juramento diante do altar, a derrota, o céu fechado,
// os gafanhotos, o ESTRANGEIRO de terras remotas, o exército pelo caminho e o
// cativo que ora voltado para a sua terra. O fogo desce, a glória enche a casa,
// vinte e dois mil bois e cento e vinte mil ovelhas ardem em catorze dias de
// festa, e de noite o SENHOR aparece outra vez para dizer "se o meu povo... se
// humilhar". Do capítulo 8 em diante o livro vira mapa e inventário: cidades,
// tributários, turmas, a frota de Ofir, a rainha de Sabá, o trono de marfim, a
// prata como pedras — e uma fórmula de sepultamento. Aqui o perigo da ficha é o
// culto genérico: cada figurante tem um OFÍCIO que o texto nomeia, e é por ele
// que se diz quem é.
import type { StageInfo } from "@/lib/rpgStageInfo";

export const CHAPTER_ACTORS_05_09: Record<number, Record<string, StageInfo>> = {
  // ---------------------------------------------------------------- 2Cr 5
  5: {
    anciao: {
      title: "Os anciãos de Israel e os chefes das tribos convocados a Jerusalém para fazerem subir a arca de Sião",
      subtitle: "2Cr 5:2,4 • a segunda geração da procissão de Davi, e a que aprendeu a não tocar",
      text: "\"Então Salomão congregou em Jerusalém os anciãos de Israel, e todos os chefes das tribos... para fazerem subir a arca da aliança do Senhor, da cidade de Davi, que é Sião\" (2Cr 5:2). Estes homens já fizeram este caminho uma vez, com o pai do rei (1Cr 15:25), e carregam na memória o preço da primeira tentativa, a do carro novo e da mão de Uzá (1Cr 15:13). Por isso o versículo seguinte é seco: \"E vieram todos os anciãos de Israel; e os levitas levantaram a arca\" (5:4) — ninguém troca de função. São os últimos homens de Israel a ver a arca ao ar livre.",
    },
    homem: {
      title: "Os sacerdotes que puseram a arca debaixo das asas, o que apontou as pontas dos varais, os que se santificaram sem respeitar as suas turmas, e os cento e vinte das trombetas",
      subtitle: "2Cr 5:5,7-14 • o sacerdócio no único dia em que não houve escala de serviço",
      text: "Estes homens fazem, num dia só, o que nenhuma geração antes nem depois faria. Primeiro carregam a mudança inteira do santuário (2Cr 5:5). Depois entram no lugar de onde vão sair para nunca mais (5:7). Um deles é testemunha de um detalhe que só quem esteve lá dentro podia dar: as pontas dos varais visíveis perante o oráculo, \"e ali tem estado até ao dia de hoje\" (5:9). Outro constatou o inventário mais curto da Escritura: \"Na arca não havia coisa alguma senão as duas tábuas\" (5:10). E na saída rompe-se a regra: santificaram-se todos, \"sem respeitarem as suas turmas\" (5:11).",
    },
    multidao: {
      title: "Todo o Israel congregado na festa do sétimo mês e o coro de Asafe, de Hemã e de Jedutum vestido de linho fino",
      subtitle: "2Cr 5:3,6,12-13 • a assembleia e os cantores que fizeram ouvir uma só voz",
      text: "\"E todos os homens de Israel se congregaram ao rei na ocasião da festa, que foi no sétimo mês\" (2Cr 5:3) — a festa dos tabernáculos, quando o povo mora em cabanas para lembrar o deserto; e é no mês em que Israel finge não ter casa que Deus ganha a sua. O retrato desta congregação é o coro: as três casas de música que Davi separou (1Cr 25:1), agora reunidas de uma vez, sem turno, \"vestidos de linho fino\" (5:12). E o que o texto sublinha não é o volume, é a unidade: \"para fazerem ouvir uma só voz\" (5:13). A letra é de uma linha só, a antífona que volta na fundação do segundo templo (Ed 3:11).",
    },
    rebanho: {
      title: "Os carneiros e os bois que não se podiam contar, sacrificados no caminho diante da arca",
      subtitle: "2Cr 5:6 • a parada do sacrifício no meio da subida de Sião para o monte",
      text: "\"Então o rei Salomão e toda a congregação de Israel... sacrificaram carneiros e bois, que não se podiam contar, nem numerar, por causa da sua abundância\" (2Cr 5:6). É o único número do livro que o Cronista se recusa a fechar, ele que conta tudo — os mil de Gibeom, os cento e cinquenta mil do canteiro, os vinte e dois mil da dedicação. Aqui a conta é abandonada de propósito. O gesto vem de Davi, que na primeira subida bem-sucedida mandou sacrificar a cada seis passos (1Cr 15:26). Sacrificar no meio do caminho é confessar que aquele trajeto não é transporte de móvel.",
    },
    rei: {
      title: "Salomão no dia em que entregou a casa: o que guardou nos tesouros a prata do pai e o que andou atrás da arca até a porta do oráculo",
      subtitle: "2Cr 5:1-2,6 • o rei que acaba a obra e some do próprio capítulo",
      text: "\"Assim se acabou toda a obra que Salomão fez para a casa do SENHOR; então trouxe Salomão as coisas que seu pai Davi havia consagrado... e pô-los entre os tesouros da casa de Deus\" (2Cr 5:1). O capítulo abre fechando, e o primeiro ato do rei com a casa pronta não é usá-la: é depositar nela o que não é dele — o que um homem ajuntou e morreu sem ver a parede subir (1Cr 22:14). Feito isso, ele desaparece do próprio capítulo: quem carrega são os levitas, quem entra é o sacerdote, quem canta são os cantores, e quem enche a casa é a nuvem. Só no capítulo seguinte ele reaparece, de joelhos.",
    },
    servo: {
      title: "Os levitas que levantaram a arca pela última vez, os que subiram com a tenda e os objetos sagrados, e o do tesouro que recebeu a prata consagrada por Davi",
      subtitle: "2Cr 5:1,4-5,9 • quem carrega, quem guarda e quem serve no lugar santo",
      text: "\"E vieram todos os anciãos de Israel; e os levitas levantaram a arca\" (2Cr 5:4). Esta é a última vez na Escritura que mãos humanas erguem aquela caixa, e elas a erguem do jeito certo, que custou caro para se aprender: \"sobre os seus ombros, pelas varas que nela havia, como Moisés tinha ordenado\" (1Cr 15:15) — nada de carro novo, nada de mão estendida (Nm 4:15). Com a arca sobe o resto de uma mudança de quarenta anos, a tenda velha do deserto (5:5). Depois deste dia o ofício do carregador acaba: a arca chegou ao seu lugar, e ninguém mais precisa de ombro para ela.",
    },
  },

  // ---------------------------------------------------------------- 2Cr 6
  6: {
    anciao: {
      title: "Os anciãos da congregação que ficou em pé no pátio — e o ancião levado em cativeiro para terra remota",
      subtitle: "2Cr 6:3,12-13,36-38 • os que ouviram a oração e os que haveriam de precisar dela",
      text: "\"Então o rei virou o seu rosto, e abençoou a toda a congregação de Israel, e toda a congregação de Israel estava em pé\" (2Cr 6:3). A postura volta duas vezes, e é ela que faz do capítulo uma cena: o rei se ajoelha sobre a plataforma e a congregação continua de pé (6:13). E estes anciãos são também os rostos do sétimo caso da oração: \"Quando pecarem contra ti (pois não há homem que não peque)... para alguma terra, remota ou vizinha\" (6:36). A única coisa que a oração lhe pede é uma direção: \"e orarem para o lado da sua terra\" (6:38). Foi o que Daniel fez em Babilônia (Dn 6:10).",
    },
    cavaleiro: {
      title: "O cavaleiro do exército que sai à peleja pelo caminho por onde Deus o enviar",
      subtitle: "2Cr 6:34-35 • o sexto caso da oração: a tropa que ora virada para trás",
      text: "\"Quando o teu povo sair à guerra contra os seus inimigos, pelo caminho que os enviares, e orarem a ti para o lado desta cidade que escolheste\" (2Cr 6:34). É o único dos sete casos em que o povo não está em desgraça nenhuma: está em marcha, e a marcha é legítima. A cláusula é toda de orientação: no meio da estrada, o soldado se vira para trás e ora na direção da cidade. O pedido é o mais curto da oração, porque a hora da batalha é curta (6:35). E a oração do seu rei não lhe promete vitória: promete audiência.",
    },
    homem: {
      title: "Os dois litigantes do juramento de maldição, o ferido diante do inimigo, o lavrador do céu fechado, o estrangeiro de terras remotas, o guerreiro em marcha e o cativo que caiu em si",
      subtitle: "2Cr 6:22-38 • os sete casos da oração, cada um com um rosto",
      text: "A oração do púlpito não é geral: é uma lista de desgraças com endereço. O primeiro caso é jurídico e insolúvel (2Cr 6:22), e o que se pede não é clemência, é sentença (6:23). O segundo é o derrotado (6:24); o terceiro, o lavrador debaixo de um céu de metal (6:26); o quarto, as pragas, com a dor individualizada — \"conhecendo cada um a sua praga\" (6:29). O quinto é o mais surpreendente, e é um homem de fora: por ele o rei pede sem cláusula nenhuma (6:32-33). O sexto é o soldado em marcha; o sétimo, o cativo. Sete becos sem saída, e uma só porta.",
    },
    mulherComum: {
      title: "A mulher do poço seco, a da fome na terra, a que estende as mãos para esta casa e a levada presa para a terra do cativeiro",
      subtitle: "2Cr 6:26-29,36-38 • as pragas da oração vistas de dentro de casa",
      text: "Os casos que o rei enumera acontecem primeiro dentro das casas, e é ali que esta mulher vive. O céu fechado dá no poço (2Cr 6:26) — e quem mede a água que resta e reparte a farinha é ela, como a viúva de Sarepta (1Rs 17:12). Depois vem o resto da lista, fome, peste, ferrugem, gafanhotos (6:28), e a oração faz questão de não somar as dores num total: \"conhecendo cada um a sua praga, e a sua dor\" (6:29). O último quadro é a que sai na fila dos presos (6:36). O que o rei pede não é que a desgraça não venha — é que, vindo, ela saiba para que lado se virar (6:38).",
    },
    multidao: {
      title: "A congregação de Israel que ficou em pé no pátio durante os quarenta e dois versículos da oração",
      subtitle: "2Cr 6:3,12-13 • o povo diante de um rei ajoelhado",
      text: "Duas vezes o Cronista para a narrativa para dizer onde está o povo: \"toda a congregação de Israel estava em pé\" (2Cr 6:3), e depois, quando o rei sobe à plataforma, \"ajoelhou-se em presença de toda a congregação de Israel\" (6:13). A inversão é o ponto: no pátio de qualquer outro reino antigo, o rei fica de pé e o povo se prostra. Aqui a congregação assiste ao seu monarca de joelhos, em público, por quarenta e dois versículos. Enquanto isso fica de pé — porque toda a oração que está ouvindo é sobre ela: os sete casos são sete desgraças desta multidão, não do rei.",
    },
    rei: {
      title: "Salomão de joelhos sobre a plataforma de metal no meio do pátio — e Davi, o morto cujo nome fecha a oração",
      subtitle: "2Cr 6:12-13,42 • o púlpito de bronze e o último argumento",
      text: "O palco de trinta versículos é uma peça que só o Cronista registra: a plataforma de metal posta \"no meio do pátio\", em que o rei sobe para se ajoelhar diante de todos (2Cr 6:13). O que ele diz de lá começa por uma admissão que nenhuma dedicação de templo ousou fazer: \"habitará Deus com os homens na terra? Eis que os céus, e o céu dos céus, não te podem conter\" (6:18). Nos versículos 5 a 9 ele CITA o que o SENHOR disse ao pai — aqui Deus é falado, não fala. E a última coisa que este rei alega não é a própria obra: é a lealdade a um morto (6:42).",
    },
    servo: {
      title: "O levita da tenda que Davi armou, o carregador das pedras aparelhadas, o levita de serviço no pátio do púlpito e o servo que veio com o estrangeiro de terras remotas",
      subtitle: "2Cr 6:5-11,32-33 • as mãos por trás dos quadros de memória e do quinto caso",
      text: "A oração passeia por quatro séculos, e estes servos são a gente de cada parada. No flashback do deserto, o levita que serviu desde a saída do Egito, quando não havia cidade escolhida (2Cr 6:5). Na tenda de Sião, o que ficou junto à arca nos quarenta anos de Davi (1Cr 16:37). No canteiro, o carregador das pedras de uma promessa adiada: \"tu não edificarás a casa, mas teu filho\" (6:9) — pedra que Davi mandou lavrar para uma obra que não veria. E, no quinto caso, o criado que veio na comitiva do homem de fora (6:32), parado à porta de um átrio que não é o seu (cf. Is 56:7).",
    },
  },

  // ---------------------------------------------------------------- 2Cr 7
  7: {
    anciao: {
      title: "O ancião de rosto em terra sobre o pavimento e o que se converte dos seus maus caminhos",
      subtitle: "2Cr 7:3,14 • o velho que viu o fogo descer e o velho a quem o oráculo se dirige",
      text: "\"E todos os filhos de Israel vendo descer o fogo, e a glória do Senhor sobre a casa, encurvaram-se com o rosto em terra sobre o pavimento\" (2Cr 7:3). Não é reação de susto: é a mesma de Israel no dia em que Arão foi consagrado (Lv 9:24) e na eira de Ornã (1Cr 21:26). Um ancião no pavimento é quem tem memória para ligar as três coisas. E é a ele que se endereça a condição do oráculo daquela noite: \"se o meu povo... se humilhar, e orar, e buscar a minha face\" (7:14). Os quatro verbos vão organizar o resto do livro (12:6-7; 33:12-13).",
    },
    homem: {
      title: "Os sacerdotes que não puderam entrar na casa, o levita dos instrumentos que Davi fez, o das trombetas da consagração e o viajante que há de passar diante da ruína",
      subtitle: "2Cr 7:1-9,21-22 • quem serviu no dia do fogo e quem fará a pergunta no fim",
      text: "\"E acabando Salomão de orar, desceu o fogo do céu, e consumiu o holocausto e os sacrifícios; e a glória do SENHOR encheu a casa\" (2Cr 7:1) — e os sacerdotes não podiam entrar (7:2). Passado o assombro, começa o maior turno de trabalho da história do sacerdócio, com os instrumentos que Davi tinha feito (7:6). O altar não deu conta do volume, e o chão precisou ser promovido (7:7). No fim do capítulo aparece outro homem, e não é do culto: o passante da estrada, no dia em que tudo isto for ruína — e a resposta à pergunta dele já está escrita antes de ela existir (7:21-22).",
    },
    mulherComum: {
      title: "A mulher de rosto em terra no pavimento, a que voltou para a sua tenda alegre e de bom ânimo, e a da terra consumida pelos gafanhotos",
      subtitle: "2Cr 7:3,10,13-14 • a festa e a praga vistas de quem cuida da casa",
      text: "Duas cenas deste capítulo têm mulher dentro, e são opostas. A primeira é o chão do átrio: \"encurvaram-se com o rosto em terra sobre o pavimento... Porque ele é bom, porque a sua benignidade dura para sempre\" (2Cr 7:3) — a laje do pátio novo é o lugar mais alto a que uma israelita comum chegou naquele mês. A segunda é a estrada de volta, depois de catorze dias de festa: \"despediu o povo para as suas tendas, alegres e de bom ânimo\" (7:10). A terceira é uma hipótese: \"se ordenar aos gafanhotos que consumam a terra\" (7:13) — e a promessa que vem depois é curar o chão de onde sai o pão (7:14).",
    },
    multidao: {
      title: "A congregação desde a entrada de Hamate até ao rio do Egito — catorze dias de festa e a assembleia solene do dia oitavo",
      subtitle: "2Cr 7:8-10 • o maior ajuntamento de Israel em toda a Escritura",
      text: "\"E, assim, naquele mesmo tempo celebrou Salomão a festa por sete dias e todo o Israel com ele, uma grande congregação, desde a entrada de Hamate, até ao rio do Egito\" (2Cr 7:8). O tamanho da multidão é dado por geografia, não por número: de uma ponta a outra do território prometido. Foram duas semanas emendadas (7:9; 1Rs 8:65). Alimentar essa gente é o que explica os números do sacrifício (7:5), porque a oferta pacífica volta em carne. E o fim é uma das linhas mais humanas do livro (7:10): o último momento em que o povo inteiro está no mesmo lugar, contente e ainda não dividido.",
    },
    rebanho: {
      title: "Os vinte e dois mil bois e as cento e vinte mil ovelhas da consagração da casa",
      subtitle: "2Cr 7:5 • o número que o Cronista fecha depois de ter recusado fechar o do capítulo 5",
      text: "\"E o rei Salomão ofereceu sacrifícios de bois, vinte e dois mil, e de ovelhas, cento e vinte mil; e o rei e todo o povo consagraram a casa de Deus\" (2Cr 7:5). Cento e quarenta e duas mil cabeças em catorze dias — o que só se explica porque não é holocausto puro: a maior parte é oferta pacífica, cuja carne volta para a mesa de uma congregação vinda de Hamate ao rio do Egito (7:8). O volume estourou o móvel, e o rei teve de santificar o próprio chão do átrio (7:7). Deste rebanho não ficou nada, e era esse o ponto: a casa não foi inaugurada com uma fita, foi inaugurada com um prejuízo.",
    },
    rei: {
      title: "Salomão no fim da oração e o rei sozinho no seu quarto na noite em que o SENHOR lhe apareceu outra vez",
      subtitle: "2Cr 7:1,11-18 • a única fala de Deus destes cinco capítulos, e por que ela é voz do céu",
      text: "\"E acabando Salomão de orar, desceu o fogo do céu\" (2Cr 7:1): a resposta chega antes de o joelho sair da plataforma, e é MUDA. Só depois de tudo pronto vem a fala: \"E o Senhor apareceu de noite a Salomão\" (7:12). É por isso que aqui a fala é voz do céu e não personificação: não há mediador nenhum em cena — nem profeta, nem anjo, nem objeto de onde o balão possa sair. É visão noturna e oráculo interior, como em Gibeom (1:7). O conteúdo responde ponto por ponto à oração do púlpito (7:13) e chega ao versículo que é o coração do livro inteiro (7:14).",
    },
    servo: {
      title: "O levita diante da porta que a glória fechou, o que conduziu o gado do sacrifício, o da gordura das ofertas e o servo da câmara do rei na noite da aparição",
      subtitle: "2Cr 7:2,4-7,12 • o serviço pesado por trás do dia mais alto do livro",
      text: "Enquanto a glória enche a casa, alguém tem de segurar a porta: \"os sacerdotes não podiam entrar na casa do Senhor\" (2Cr 7:2), e o levita fica de fora, encarando um vão que ninguém atravessa. Passado isso, começa o trabalho bruto: cento e quarenta e duas mil cabeças de gado não chegam ao altar sozinhas — há quem conduza, esfole, separe a gordura (7:7) e lave o que vai subir. São catorze dias seguidos. E, no fim, um servo de outro tipo: o da câmara do rei, do lado de fora da porta, na noite da aparição (7:12). Ele não ouve nada — o oráculo é só para quem dorme lá dentro.",
    },
  },

  // ---------------------------------------------------------------- 2Cr 8
  8: {
    cavaleiro: {
      title: "O cavaleiro das cidades dos carros e o capitão de Israel que não foi feito servo da obra",
      subtitle: "2Cr 8:6,9 • a única classe de israelita que o rei não pôs a carregar pedra",
      text: "\"Como também a Baalate, e todas as cidades de provisões, que Salomão tinha, e todas as cidades dos carros e as cidades dos cavaleiros\" (2Cr 8:6). O reino que começou pedindo sabedoria acaba dividido em praças de guarnição. O Cronista faz questão de dizer o que este homem NÃO é: \"dos filhos de Israel, Salomão não fez servos para sua obra (mas eram homens de guerra... e capitàes dos seus carros e cavaleiros)\" (8:9). É o eixo social do capítulo: quem carrega é o estrangeiro (8:7-8); quem monta é o israelita. E o animal vinha do lugar que a lei do rei proibira (1:16; Dt 17:16).",
    },
    homem: {
      title: "O mestre da obra dos vinte anos, o morador de Tadmor no deserto, o porteiro do ferrolho de Bete-Horom, o heteu que ficou na terra, o cobrador do tributo, o porteiro de cada porta e o servo prático do mar de Hirão",
      subtitle: "2Cr 8:1-18 • os ofícios de um reino já pronto, do canteiro à praia de Edom",
      text: "Vinte anos de obra terminam numa linha (2Cr 8:1) e o capítulo vira mapa. Há o que foi habitar as cidades devolvidas por Tiro (8:2); o soldado da única campanha do reinado (8:3); o morador da cidade fundada onde não havia nada, \"Tadmor no deserto\" (8:4); o guarda das praças gêmeas do desfiladeiro, \"com muros, portas e ferrolhos\" (8:5). Depois vêm os que a conquista não expulsou, feitos tributários (8:7-8), e o cobrador. No pátio, o serviço entra em regime, \"porque assim tinha mandado Davi, o homem de Deus\" (8:14). E na praia de Edom, os \"servos práticos do mar\" de Hirão (8:18).",
    },
    mulherComum: {
      title: "A filha de Faraó tirada da cidade de Davi, a amorreia que ficou na terra e a mulher das cidades que Hirão devolveu",
      subtitle: "2Cr 8:2,7-8,11 • as mulheres de um reino que se acomodou com o que não expulsou",
      text: "O verso mais estranho do capítulo é uma mudança de endereço: \"E Salomão fez subir a filha de Faraó da cidade de Davi para a casa que lhe tinha edificado; porque disse: Minha mulher não morará na casa de Davi... porquanto santos são os lugares nos quais entrou a arca do Senhor\" (2Cr 8:11). A razão é litúrgica, não conjugal. Ainda assim o Cronista não comenta o resto, que Reis contaria sem piedade (1Rs 11:1-3), e que a lei do rei previra (Dt 17:17). Ao lado dela estão as mulheres dos povos que ficaram, cujas famílias entraram na folha de carga do reino (8:8).",
    },
    rei: {
      title: "Salomão ao fim de vinte anos: o que fundou cidades no deserto, pôs os que ficaram a tributo e desceu à praia do mar em Edom",
      subtitle: "2Cr 8:1-6,11-18 • o rei administrador, entre o mapa e o calendário do culto",
      text: "Este é o capítulo em que o construtor vira governante. Terminadas as duas casas (2Cr 8:1), ele reedifica as cidades devolvidas por Tiro, toma Hamate-Zobá e planta Tadmor num deserto onde não havia nada (8:3-4). Fortifica o desfiladeiro de Bete-Horom (8:5) e enche o país de cidades de provisões e de carros. Depois arruma o culto pelo calendário de Moisés e pela ordem do pai (8:13-14) — em 2 Crônicas, obedecer a Davi e a Moisés é a mesma coisa. E o fim do capítulo o leva ao ponto mais distante do reino, a praia de Edom, de onde a frota parte para Ofir (8:17-18).",
    },
    servo: {
      title: "O jebuseu posto a tributo, o heveu carregador da obra, o servo das cidades de provisões, o levita das turmas do louvor e o que foi a Ofir nos navios de Hirão",
      subtitle: "2Cr 8:8,14,18 • duas escravidões e um ministério no mesmo capítulo",
      text: "Este capítulo separa a mão de obra por nascimento, e diz isso com todas as letras: os que ficaram na terra \"Salomão os fez tributários, até ao dia de hoje\" (2Cr 8:8), e logo em seguida, \"dos filhos de Israel, Salomão não fez servos para sua obra\" (8:9). O jebuseu e o heveu carregam pedra; o israelita, não. É o mesmo rei que, dois capítulos atrás, pediu que Deus atendesse \"a tudo o que o estrangeiro te suplicar\" (6:33) — e o Cronista põe as duas coisas no mesmo livro. No pátio, outro tipo de servo: o levita das turmas do louvor (8:14).",
    },
  },

  // ---------------------------------------------------------------- 2Cr 9
  9: {
    anciao: {
      title: "O ancião de Jerusalém no sepultamento de Salomão, na cidade de Davi",
      subtitle: "2Cr 9:30-31 • quem enterrou o rei dos quarenta anos e viu o filho assumir",
      text: "\"E reinou Salomão em Jerusalém quarenta anos sobre todo o Israel. E dormiu Salomão com seus pais, e o sepultaram na cidade de Davi seu pai\" (2Cr 9:30-31). Um ancião que esteja neste enterro nasceu no reinado de Davi: viu a arca subir de Sião, esteve no pátio quando a nuvem derrubou os sacerdotes e ouviu a oração inteira do púlpito de bronze. O Cronista não lhe dá tempo de luto: o versículo seguinte já está em Siquém. O apogeu e a divisão cabem no espaço de uma linha branca. E o que este velho leva do reinado é a frase que o resto do livro vai testar rei por rei (7:14).",
    },
    cavaleiro: {
      title: "Um dos doze mil cavaleiros das quatro mil estrebarias, repartidos entre as cidades dos carros e Jerusalém",
      subtitle: "2Cr 9:25 • a última conta militar do reinado",
      text: "\"Teve também Salomão quatro mil estrebarias para os cavalos de seus carros, e doze mil cavaleiros; e colocou-os nas cidades dos carros, e junto ao rei em Jerusalém\" (2Cr 9:25). O número dos homens é o mesmo do primeiro capítulo (1:14); o que cresceu foi a estrutura. O animal continua vindo do sul (9:28), no mesmo comércio de atravessador que abriu o livro. Ler isto ao lado da lei do rei é desconfortável, e o Cronista põe os dois lado a lado sem uma palavra (Dt 17:16). É o soldado mais bem equipado que Israel teve, guarnecendo um reino que se partiria sem uma batalha.",
    },
    homem: {
      title: "O ministro da mesa do rei, o escriba que pesava os seiscentos e sessenta e seis talentos, o ourives dos paveses de ouro batido, o guarda da casa do bosque do Líbano e o marinheiro dos navios de Társis",
      subtitle: "2Cr 9:4,13-21 • os ofícios do apogeu, do salão de jantar à alfândega",
      text: "O que derrubou a rainha de Sabá não foi um discurso: foi uma casa funcionando. \"E as iguarias da sua mesa, o assentar dos seus servos, o estar dos seus criados, e as vestes deles; e os seus copeiros...\" (2Cr 9:4) — cada item é um homem com um posto. Depois vêm os do tesouro: o escriba dos seiscentos e sessenta e seis talentos do ano (9:13) e o da alfândega (9:14). O ourives bate os paveses de ouro (9:15-16), e o guarda da sala não sabe que toma conta de um saque futuro (12:9-10). E na outra ponta está o marinheiro dos navios de Társis, três anos por viagem (9:21).",
    },
    mulherComum: {
      title: "A rainha de Sabá diante da subida pela qual o rei chegava à casa do SENHOR, a mulher das campinas dos sicômoros e a carpideira do sepulcro",
      subtitle: "2Cr 9:1-9,27,31 • a estrangeira que fez a melhor pergunta e a israelita do fim do reinado",
      text: "Ela veio de longe e veio para testar (2Cr 9:1), e falou com ele \"de tudo o que tinha no seu coração\". O que a derrubou não foram as respostas, e sim a última linha do inventário: \"e a sua subida pela qual ele chegava à casa do Senhor, ela ficou como fora de si\" (9:4) — a rampa por onde o rei subia ao templo, isto é, o culto, e não o palácio. E a confissão dela acerta a teologia do livro melhor do que a de muitos reis de Judá: \"para te colocar no seu trono como rei para o Senhor teu Deus\" (9:8) — no seu trono, não no teu. Jesus a citaria como testemunha de acusação (Mt 12:42).",
    },
    multidao: {
      title: "O povo de Israel dos quarenta anos de Salomão — o que viveu inteiro dentro do apogeu",
      subtitle: "2Cr 9:20,27,30 • a geração que viu a prata reputar-se por nada",
      text: "\"E reinou Salomão em Jerusalém quarenta anos sobre todo o Israel\" (2Cr 9:30). Quem nasceu no ano da dedicação morreu com o reino ainda inteiro; esta é a única geração da história de Israel que não conheceu guerra em casa, invasão nem exílio. E viu coisas que ninguém tornaria a ver: \"a prata reputava-se por nada nos dias de Salomão\" (9:20) e cedros \"como as figueiras bravas que há pelas campinas\" (9:27). Mas o livro guarda também a fatura: as cento e cinquenta mil pessoas do canteiro e o jugo que o povo pediria a Roboão para aliviar (10:4).",
    },
    patriarca: {
      title: "Natã, o profeta, Aías, o silonita, e Ido, o vidente — as três testemunhas que puseram um reinado por escrito",
      subtitle: "2Cr 9:29 • as fontes que o Cronista nomeia no fim da vida de Salomão",
      text: "\"Os demais atos de Salomão... porventura não estão escritos no livro das crônicas de Natã, o profeta, e na profecia de Aías, o silonita, e nas visões de Ido, o vidente, acerca de Jeroboão, filho de Nebate?\" (2Cr 9:29). O Cronista fecha o maior reinado da história remetendo a três arquivos, e os três são de profeta. Natã é o homem da aliança davídica e quem ungiu Salomão em Giom. Aías é o do outro lado da conta: rasgou a capa em doze pedaços diante de Jeroboão (1Rs 11:30). A menção final é a rachadura dentro do elogio: o livro que conta o trono de marfim já sabe quem levará dez tribos embora.",
    },
    rei: {
      title: "Os reis da Arábia e os reis da terra que buscavam a presença de Salomão — e Roboão, que reinou em seu lugar",
      subtitle: "2Cr 9:14,22-24,31 • as coroas estrangeiras diante do trono de marfim e a que herdou tudo",
      text: "\"Assim excedeu o rei Salomão a todos os reis da terra, em riquezas e sabedoria. E todos os reis da terra buscavam a presença de Salomão, para ouvirem a sabedoria que Deus tinha posto no seu coração\" (2Cr 9:22-23). O Cronista faz questão de dizer o que vinham buscar: não é aliança nem comércio, é sabedoria — e sabedoria que Deus pôs. Eles não vêm de mãos vazias (9:24). O móvel diante do qual se curvam é único: um trono de marfim com seis degraus e doze leões, \"outro tal não se fez em nenhum reino\" (9:19). E o último rei do capítulo é o que não fez nada para o merecer (9:31).",
    },
    servo: {
      title: "Os do séquito da rainha de Sabá, os copeiros de Salomão, o que mostrava a casa, o que pesava o ouro do rei e os servos de Hirão nos navios de Társis",
      subtitle: "2Cr 9:1-4,10-12,21 • a criadagem que a rainha veio ver e a marinhagem que sustentava a conta",
      text: "Numa das listas mais curiosas da Escritura, o que impressiona uma rainha estrangeira é o pessoal de serviço: \"o assentar dos seus servos, o estar dos seus criados, e as vestes deles; e os seus copeiros e as vestes deles\" (2Cr 9:4). Não é o ouro: é a ordem. Do lado dela vêm os do séquito, que descarregaram os camelos e os tornariam a carregar mais pesados do que vieram (9:12). Dentro de casa está o do peso (9:13); e fora, no mar, os que fazem o dinheiro entrar, com a frota que voltava \"uma vez em três anos\" (9:21).",
    },
  },
};
