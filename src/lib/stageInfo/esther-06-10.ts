// Fichas ESPECÍFICAS por (capítulo → papel) de ESTER 6–10.
// O livro em que Deus não é nomeado uma única vez vira de lado numa NOITE SEM
// SONO. O texto não diz por que o sono fugiu, não diz por que o rolo se abriu
// naquela página, não diz por que Hamã estava no pátio exterior naquele exato
// momento e não diz por que a forca já estava pronta — apenas registra as
// coincidências uma atrás da outra e cala sobre todas elas. As fichas destes
// capítulos apontam o encaixe e param onde o livro para: o feito escrito em
// 2:23 e nunca pago, o rei insone que manda buscar justamente esse rolo, o
// pur lançado em Nisã que caiu em Adar e deu onze meses de prazo, e a frase
// repetida três vezes em Et 9 — "porém ao despojo não estenderam a sua mão" —
// que é o contrário exato do que Saul fez com o despojo de Amaleque (1Sm 15:9,
// 19), na briga de quatrocentos anos entre a casa de Quis e a casa de Agague.
// Cada figurante anônimo é alguém REAL daquele capítulo: o escrivão que leu as
// crônicas em voz alta na madrugada, o servo que trouxe o cavalo do rei, o
// eunuco que cobriu o rosto de Hamã, o correio sobre ginete veloz das
// cavalariças do rei, o judeu que se ajuntou na sua cidade para defender a
// vida, o pobre que recebeu dádivas no primeiro Purim, o cobrador do tributo
// das ilhas do mar.
import type { StageInfo } from "@/lib/rpgStageInfo";

export const CHAPTER_ACTORS_06_10: Record<number, Record<string, StageInfo>> = {
  // ---------------------------------------------------------------- Et 6
  6: {
    anciao: {
      title: "Mardoqueu, o homem a quem coisa nenhuma se fez, e os sábios da casa de Hamã que pronunciaram a sentença",
      subtitle: "Et 6 • o velho esquecido nas crônicas e os conselheiros que perceberam o fim antes do dono da casa",
      text: "O capítulo gira sobre um nome que estava escrito e nunca fora pago (Et 6:2). A pergunta do rei e a resposta dos servos são o eixo de tudo: \"Que honra e distinção se deu por isso a Mardoqueu? E os servos do rei... disseram: Coisa nenhuma se lhe fez\" (Et 6:3). Do outro lado da cidade, os sábios que na véspera mandaram levantar a forca mudam de conselho em vinte e quatro horas: \"não prevalecerás contra ele, antes certamente cairás diante dele\" (Et 6:13). É a única vez em que alguém enuncia uma lei de causa e efeito sobre os judeus — e quem a enuncia são pagãos numa sala de jantar."
    },
    cavaleiro: {
      title: "Mardoqueu sobre o cavalo em que o rei costuma andar montado, com a veste real e a coroa na cabeça do animal",
      subtitle: "Et 6:10-11 • o judeu da porta levado pelas ruas da cidade pelo homem que mandara fazer a sua forca",
      text: "Hamã descreve a honra que quer para si mesmo, sem saber que redige a própria humilhação: veste do rei, cavalo do rei, \"e ponha-se-lhe a coroa real na sua cabeça\", com um príncipe conduzindo e um pregão pelas ruas (Et 6:8-9). O rei fecha a armadilha com um nome e uma cláusula: \"faze assim para com o judeu Mardoqueu... e coisa nenhuma omitas de tudo quanto disseste\" (Et 6:10). O homem que atravessou aquelas ruas em saco e cinza (Et 4:1) atravessa-as agora montado, com um agagita a pé ao lado do estribo. E volta para o seu banco (Et 6:12)."
    },
    homem: {
      title: "O escrivão que leu as crônicas diante do rei, Hamã no pátio exterior e o príncipe mais nobre que segurou as rédeas",
      subtitle: "Et 6 • os três homens da noite em que tudo virou, e nenhum deles sabia o que estava fazendo",
      text: "O primeiro é o leitor da madrugada: \"fugiu o sono do rei; então mandou trazer o livro de registro das crônicas\" (Et 6:1). Um funcionário acordado às pressas, e o rolo se abre justamente na página de 2:23. O segundo é Hamã, que chega ao pátio no minuto exato \"para dizer ao rei que enforcassem a Mardoqueu na forca que lhe tinha preparado\" (Et 6:4) — entra para pedir uma morte e sai obrigado a organizar uma festa. O terceiro é \"um dos príncipes mais nobres do rei\" (Et 6:9), que o plano previa e que o rei substitui pelo autor da ideia."
    },
    mulherComum: {
      title: "Zeres, mulher de Hamã, que ouviu o marido chegar correndo de cabeça coberta",
      subtitle: "Et 6:13 • a mesma mulher que mandou levantar a forca, agora dizendo que ele vai cair",
      text: "Na véspera fora dela a ideia: \"Faça-se uma forca de cinqüenta côvados de altura\" (Et 5:14). Vinte e quatro horas depois, o marido volta correndo, triste e de cabeça coberta, e conta tudo. A resposta dela é a profecia mais estranha do livro, porque não vem de profeta, não invoca nome nenhum e mesmo assim acerta em cheio: \"Se Mardoqueu, diante de quem já começaste a cair, é da descendência dos judeus, não prevalecerás contra ele\" (Et 6:13). Ela nomeia a descendência, não o homem. E a frase fica cortada no meio pelos camareiros que vêm buscá-lo (Et 6:14)."
    },
    multidao: {
      title: "O povo de Susã nas ruas por onde passou o pregão",
      subtitle: "Et 6:11 • a cidade que ouviu \"assim se fará ao homem a quem o rei deseja honrar\" e viu quem ia a pé",
      text: "\"E o levou a cavalo pelas ruas da cidade, e apregoou diante dele: Assim se fará ao homem a quem o rei deseja honrar!\" (Et 6:11). Esta é a mesma população que ficara parada quando os correios saíram com o decreto (Et 3:15) e que vira um velho judeu atravessar essas ruas em saco e cinza (Et 4:1). Agora vê o mesmo homem passar montado no cavalo do rei, e vê quem vai a pé segurando as rédeas. Ninguém em Susã sabe ainda que a rainha é judia. Dois capítulos adiante voltará a olhar para ele na rua, e daquela vez saberá tudo (Et 8:15)."
    },
    rei: {
      title: "Assuero, o rei de quem fugiu o sono naquela mesma noite",
      subtitle: "Et 6:1-10 • o insone que mandou trazer as crônicas e perguntou a coisa certa na hora certa",
      text: "\"Naquela mesma noite fugiu o sono do rei; então mandou trazer o livro de registro das crônicas\" (Et 6:1). É o versículo em torno do qual o livro gira, e é feito de nada. O texto não diz que Deus tirou o sono do rei, nem que o rolo se abriu numa página escolhida. Diz que se leu, que se achou escrito, e que a resposta foi \"coisa nenhuma se lhe fez\" (Et 6:3). Este rei tem um padrão: pergunta antes de saber com quem fala. Fez isso em 3:8-11 para o mal; faz agora para o bem (Et 6:6). É a mesma ignorância, e ela cai dos dois lados."
    },
    servo: {
      title: "O camareiro que trouxe o livro das crônicas, os servos que ministravam junto ao rei, o que trouxe o cavalo real e os que levaram Hamã depressa ao banquete",
      subtitle: "Et 6 • quem carrega o rolo na madrugada e quem sela o cavalo da honra de outro homem",
      text: "Nenhum destes homens sabe o que está fazendo, e todos são indispensáveis. O primeiro atravessa o palácio de noite com um rolo debaixo do braço porque o rei não dorme (Et 6:1) — se tivesse trazido outro volume, o capítulo não existiria. Os segundos respondem à pergunta do rei sem floreio: \"Coisa nenhuma se lhe fez\" (Et 6:3). Poderiam ter inventado uma recompensa esquecida; disseram a verdade seca, e ela abriu a porta. Depois vêm os moços da estrebaria que aparelham o cavalo do rei — e os últimos entram para cortar uma conversa no meio (Et 6:14)."
    }
  },

  // ---------------------------------------------------------------- Et 7
  7: {
    homem: {
      title: "Hamã, o opressor e o inimigo, e o oficial que cumpriu a sentença",
      subtitle: "Et 7 • o convidado que foi apontado à mesa e enforcado na forca que ele mesmo mandou fazer",
      text: "Hamã entra neste capítulo como convidado de honra e sai de rosto coberto. A denúncia é feita sem nome até a última palavra, e a última palavra é o nome dele: \"O homem, o opressor, e o inimigo, é este mau Hamã\" (Et 7:6). O rei sai furioso para o jardim e o deixa sozinho com a mulher a quem ia matar (Et 7:7). O erro final é físico: \"Hamã tinha caído prostrado sobre o leito em que estava Ester\" (Et 7:8) — o homem diante de quem todos se prostravam acaba prostrado no lugar errado. E morreu \"na forca, que ele tinha preparado para Mardoqueu\" (Et 7:10)."
    },
    mulherComum: {
      title: "Ester, a rainha, no segundo banquete do vinho",
      subtitle: "Et 7:3-6 • a mulher que pediu a própria vida como petição e o próprio povo como desejo",
      text: "Perguntada pela terceira vez o que quer, até metade do reino, Ester finalmente responde — e não pede coisa nenhuma do reino: \"dê-se-me a minha vida como minha petição, e o meu povo como meu desejo\" (Et 7:3). É aqui que ela declara o que Mardoqueu mandara esconder desde 2:10: ao pedir o povo, diz de que povo é. Cita o decreto pelas palavras exatas dele e acrescenta a frase que mede a diferença entre escravidão e extermínio: \"se ainda por servos e por servas nos vendessem, calar-me-ia\" (Et 7:4). Não acusa o rei, que assinou: espera que ele pergunte (Et 7:5)."
    },
    rei: {
      title: "Assuero no banquete do vinho, entre o jardim do palácio e a casa do banquete",
      subtitle: "Et 7 • o rei que perguntou quem tinha feito aquilo sem se lembrar de quem tinha dado o anel",
      text: "\"Quem é esse e onde está esse, cujo coração o instigou a assim fazer?\" (Et 7:5). A pergunta é sincera e é absurda: quem entregou o anel foi ele, quem disse \"Essa prata te é dada como também esse povo\" foi ele (Et 3:10-11). O livro deixa a incoerência de pé sem comentar. A reação é a de sempre: furor e movimento sem decisão (Et 7:7). Volta e lê a cena pela ofensa pessoal, não pelo genocídio (Et 7:8). A sentença sai de outra boca ainda, a de Harbona (Et 7:9), e ao rei só resta dizer \"Enforcai-o nela\"."
    },
    servo: {
      title: "Harbona, um dos camareiros que serviam diante do rei, com os servos do banquete do vinho e os que cobriram o rosto de Hamã",
      subtitle: "Et 7:8-10 • o eunuco que lembrou a forca do quintal e resolveu o livro numa frase",
      text: "Os servos deste capítulo estão à mesa dos três e veem tudo. São eles que executam a ordem que não precisa de palavras: \"Saindo esta palavra da boca do rei, cobriram o rosto de Hamã\" (Et 7:8) — o gesto persa do condenado. E então fala o servo mais decisivo do livro: \"Eis que também a forca de cinqüenta côvados de altura que Hamã fizera para Mardoqueu, que falara em defesa do rei, está junto à casa de Hamã\" (Et 7:9). Harbona sabe da forca, sabe para quem foi feita, e sabe do feito lido na madrugada anterior."
    }
  },

  // ---------------------------------------------------------------- Et 8
  8: {
    anciao: {
      title: "Mardoqueu com o anel do rei, e os anciãos dos judeus de Susã e das províncias a quem chegou a segunda carta",
      subtitle: "Et 8 • o velho que passou da porta do rei ao encargo da casa de Hamã, e os que leram a carta que devolveu a vida",
      text: "\"E tirou o rei o seu anel, que tinha tomado de Hamã, e o deu a Mardoqueu\" (Et 8:2). O selo do império que condenou os judeus passa, sem uma palavra de explicação, para a mão de um judeu. E o problema jurídico continua de pé: não se apaga a primeira carta (Et 8:8); escreve-se uma segunda. É Mardoqueu quem a dita, e o que ela concede não é vingança, é defesa: \"que se reunissem, e se dispusessem para defenderem as suas vidas\" (Et 8:11). Os outros velhos são os anciãos que, onze meses depois da sentença, leem no fim dela: \"para os judeus houve luz, e alegria, e gozo, e honra\" (Et 8:16)."
    },
    cavaleiro: {
      title: "Os correios a cavalo sobre ginetes velozes das cavalariças do rei",
      subtitle: "Et 8:10-14 • os mesmos cavalos e as mesmas estradas do decreto de morte, agora com a carta contrária",
      text: "\"Enviaram as cartas pela mão de correios a cavalo, que cavalgavam sobre ginetes, que eram das cavalariças do rei\" (Et 8:10). O texto se demora nos animais de propósito: são montarias do estábulo real, criadas para velocidade, e não os cavalos comuns da posta que levaram o decreto de Hamã. Havia pressa — a primeira carta tinha onze meses de vantagem. \"Os correios, sobre ginetes velozes, saíram apressuradamente, impelidos pela palavra do rei\" (Et 8:14): a expressão é a mesma de 3:15, e a repetição é o ponto. Nada mudou na máquina; mudou quem tem o anel."
    },
    homem: {
      title: "Os escrivães do mês de Sivã, o cavalariço dos ginetes, o arauto do decreto em Susã e os homens dos povos da terra que se fizeram judeus",
      subtitle: "Et 8 • a mesma sala de copistas do capítulo 3, escrevendo desta vez o contrário",
      text: "\"Então foram chamados os escrivães do rei, naquele mesmo tempo, no terceiro mês (que é o mês de Sivã)\" (Et 8:9). A frase é a gêmea exata de 3:12 — mesma sala, mesmo ofício, mesma fórmula —, com um acréscimo que só aparece agora: \"como também aos judeus segundo o seu modo de escrever, e conforme a sua língua\". Pela primeira vez o império escreve aos judeus na língua deles. E o capítulo fecha com uma categoria de homem que não existia antes: \"muitos, dos povos da terra, se fizeram judeus, porque o temor dos judeus tinha caído sobre eles\" (Et 8:17)."
    },
    mulherComum: {
      title: "Ester lançada aos pés do rei, as judias de Susã que ouviram o decreto e as mulheres das províncias nos dias de folguedo",
      subtitle: "Et 8 • a rainha que chorou e suplicou depois de o inimigo já estar morto",
      text: "Hamã já fora enforcado no capítulo anterior, e ainda assim: \"Falou mais Ester perante o rei, e se lhe lançou aos seus pés; e chorou, e lhe suplicou\" (Et 8:3). É a única vez em que o livro lhe atribui lágrimas, e elas vêm depois da vitória pessoal — a casa de Hamã já era dela —, porque a carta continuava valendo. O argumento é de alguém que não consegue separar a própria vida da do seu povo: \"como poderei ver o mal que sobrevirá ao meu povo?\" (Et 8:6). No fim, \"alegria e gozo, banquetes e dias de folguedo\" (Et 8:17) — o contrário exato de 4:3."
    },
    multidao: {
      title: "A cidade de Susã que exultou e se alegrou, os judeus a quem houve luz e alegria, e os povos da terra que se fizeram judeus",
      subtitle: "Et 8:15-17 • a mesma cidade que estava confusa em 3:15, agora na rua por outro motivo",
      text: "\"Então Mardoqueu saiu da presença do rei com veste real azul-celeste e branca... e a cidade de Susã exultou e se alegrou\" (Et 8:15). O versículo foi escrito para ser lido contra o de 3:15 — \"o rei e Hamã se assentaram a beber, porém a cidade de Susã estava confusa\" —, e os dois capítulos são espelho um do outro: escrivães, anel, correios, decreto e a reação da cidade. O versículo seguinte é o mais luminoso do livro: \"para os judeus houve luz, e alegria, e gozo, e honra\" (Et 8:16) — e nenhuma dessas quatro palavras é atribuída a ninguém."
    },
    rei: {
      title: "Assuero, que deu a casa de Hamã a Ester e o anel a Mardoqueu",
      subtitle: "Et 8 • o rei preso à própria lei, que não pode revogar e por isso manda escrever outra carta",
      text: "\"Naquele mesmo dia deu o rei Assuero à rainha Ester a casa de Hamã... e Mardoqueu veio perante o rei, porque Ester tinha declarado quem ele era\" (Et 8:1). O rei descobre agora, no mesmo movimento, que a mulher é judia e que o homem da porta é da família dela. A generosidade é imediata e a impotência também: pedido a revogar o decreto, responde com a lei que já o enredara (Et 8:8). Entrega a caneta e sai da frente — o mesmo gesto de 3:10-11, agora com outro homem do outro lado da mesa. Este rei nunca decide o conteúdo de nada; decide a quem entrega o selo."
    },
    servo: {
      title: "O servo da sala do anel, os moços da câmara dos escrivães e o que afixou o decreto na praça de Susã",
      subtitle: "Et 8 • quem carrega o selo do império de uma mão para a outra e quem prega a nova carta no muro",
      text: "Estes são os funcionários que fazem a virada acontecer no papel. Um é o servo da sala onde o anel é tirado do dedo do rei pela segunda vez (Et 8:2) — o mesmo objeto que em 3:10 selara o extermínio. Outros são os moços da câmara dos escrivães, que passam o dia copiando a mesma carta em dezenas de escritas e línguas, inclusive, pela primeira vez, na dos judeus (Et 8:9). E o último é o que sai com o rolo e a cola (Et 8:13-14): é o mesmo cargo, o mesmo muro e talvez o mesmo homem que onze meses antes afixara ali a sentença de morte."
    }
  },

  // ---------------------------------------------------------------- Et 9
  9: {
    anciao: {
      title: "Mardoqueu, grande na casa do rei, e os anciãos dos judeus de Susã e das províncias que estabeleceram o Purim",
      subtitle: "Et 9 • os velhos que escreveram as cartas de paz e verdade e deram nome à festa a partir da sorte de Hamã",
      text: "\"Porque Mardoqueu era grande na casa do rei... porque o homem Mardoqueu ia sendo engrandecido\" (Et 9:4) — o mesmo verbo com que o capítulo 3 apresentara Hamã, agora aplicado ao homem que ele quis enforcar. No fim do capítulo, Mardoqueu vira legislador de um calendário (Et 9:20-21). Os outros velhos são os anciãos que recebem as cartas e as confirmam sobre si e sobre a descendência (Et 9:27), e os que dão nome à festa: \"àqueles dias chamam Purim, do nome Pur\" (Et 9:26) — o nome da alegria judaica vem da palavra persa para a sorte que Hamã lançou."
    },
    cavaleiro: {
      title: "Os correios que levaram as cartas de paz e verdade às cento e vinte e sete províncias",
      subtitle: "Et 9:30 • a terceira leva de cavaleiros do livro, e a única que não leva decreto de guerra nenhum",
      text: "\"E mandaram cartas a todos os judeus, às cento e vinte e sete províncias do reino de Assuero, com palavras de paz e verdade\" (Et 9:30). São os mesmos cavalos e as mesmas estradas de sempre — as de 3:13, com a ordem de destruir, e as de 8:14, com a licença de defender a vida. Desta vez não levam decreto de guerra nenhum: levam a segunda carta do Purim, escrita \"com toda autoridade\" pela rainha Ester e por Mardoqueu (Et 9:29), para confirmar dois dias de festa no calendário de um povo espalhado da Índia à Etiópia."
    },
    homem: {
      title: "Os judeus que se ajuntaram nas suas cidades, os sátrapas e governadores que os auxiliaram, os inimigos caídos no dia treze — e os dez filhos de Hamã",
      subtitle: "Et 9 • o dia marcado para acabar com eles, em que sucedeu o contrário, e a frase que o livro repete três vezes",
      text: "\"No dia em que os inimigos dos judeus esperavam assenhorear-se deles, sucedeu o contrário\" (Et 9:1). Estes homens não atacaram: \"se ajuntaram para pôr as mãos naqueles que procuravam o seu mal\" (Et 9:2), o que a segunda carta permitia. Do lado da administração, algo que nenhum decreto obrigava: os sátrapas \"auxiliavam os judeus; porque tinha caído sobre eles o temor de Mardoqueu\" (Et 9:3). E então a frase que o capítulo repete três vezes e que é o pudor do livro inteiro: \"porém ao despojo não estenderam a sua mão\" — o contrário do que Saul fez com Amaleque (1Sm 15:19)."
    },
    mulherComum: {
      title: "Ester, a rainha, filha de Abiail; as judias que se ajuntaram nas suas cidades; e as mães que ensinaram o Purim aos filhos",
      subtitle: "Et 9 • a mulher que pediu mais um dia, e as que fizeram do dia catorze festa de presentes e dádivas aos pobres",
      text: "Este é o capítulo em que Ester deixa de suplicar e passa a pedir: \"conceda-se aos judeus que se acham em Susã que também façam amanhã conforme ao mandado de hoje; e pendurem numa forca os dez filhos de Hamã\" (Et 9:13). O pedido é duro e o texto não o suaviza. Depois vem a segunda carta, e nela o nome dela vem primeiro (Et 9:29); e é o mandado dela que fecha o livro: \"o mandado de Ester estabeleceu os sucessos daquele Purim; e escreveu-se no livro\" (Et 9:32). Ao redor estão as que passaram do saco e da cinza (Et 4:3) ao dia de banquetes (Et 9:19)."
    },
    multidao: {
      title: "Os judeus que descansaram no dia catorze e no dia quinze, os das aldeias que mandaram presentes uns aos outros e as famílias que tomaram sobre si o Purim",
      subtitle: "Et 9:17-28 • a multidão que fez de um dia de matança marcada um dia de banquetes e dádivas aos pobres",
      text: "O que o texto sublinha não é a vitória, é o DESCANSO: \"descansaram no dia catorze, e fizeram, daquele dia, dia de banquetes e de alegria\" (Et 9:17), e em Susã, que teve dois dias de luta, \"descansaram no dia quinze\" (Et 9:18) — daí a festa ter duas datas até hoje. A forma dessa alegria é registrada com cuidado: presentes uns aos outros e, na carta de Mardoqueu, \"dádivas aos pobres\" (Et 9:22). Um povo que não tocou no despojo dos inimigos reparte o que é seu. E toma o compromisso por conta própria, sem decreto (Et 9:27)."
    },
    rei: {
      title: "Assuero, que perguntou à rainha o que mais ela queria depois do número dos mortos",
      subtitle: "Et 9:11-14 • o rei que recebe o relatório da fortaleza e concede mais um dia sem discutir",
      text: "\"No mesmo dia foi comunicado ao rei o número dos mortos na fortaleza de Susã\" (Et 9:11). É assim que este rei aparece pela última vez em ação: recebendo um número. A reação é a de um administrador, com uma conta em voz alta que só ele acharia natural: \"nas mais províncias do rei que teriam feito?\" (Et 9:12). E emenda, pela quarta vez no livro, a mesma pergunta de sempre. Do primeiro capítulo ao nono, Assuero foi sempre isto: um homem que assina o que lhe põem à frente, para o mal em 3:10-11 e para o bem em 8:8 e 9:14."
    },
    servo: {
      title: "Os que faziam a obra do rei nas províncias, os guardas que cumpriram o edito em Susã, os que levaram as cartas do Purim e os meninos que aprenderam a festa",
      subtitle: "Et 9 • a máquina do império virada a favor, e a primeira geração a guardar o Purim",
      text: "\"E todos os líderes das províncias, e os sátrapas, e os governadores, e os que faziam a obra do rei, auxiliavam os judeus; porque tinha caído sobre eles o temor de Mardoqueu\" (Et 9:3). É a burocracia inteira do império — a mesma que em 3:12 copiou o decreto de extermínio e o traduziu com esmero — agora do outro lado. E os últimos servos deste capítulo são os menores: as crianças da casa, a quem se ensina uma data nova e um nome estrangeiro, porque \"a memória deles nunca teria fim entre os de sua descendência\" (Et 9:28). É a única coisa no livro que se firma sem o anel do rei."
    }
  },

  // ---------------------------------------------------------------- Et 10
  10: {
    anciao: {
      title: "Mardoqueu, o judeu, o segundo depois do rei Assuero",
      subtitle: "Et 10:3 • o homem da porta do rei no último versículo do livro, procurando o bem do seu povo",
      text: "\"Porque o judeu Mardoqueu foi o segundo depois do rei Assuero, e grande entre os judeus, e estimado pela multidão de seus irmãos, procurando o bem do seu povo\" (Et 10:3). O livro fecha com o mesmo epíteto com que o abriu: \"o judeu\" — nunca deixou de ser um transportado de Jerusalém (Et 2:6). O cargo é o mais alto que um estrangeiro podia ter na Pérsia, e o texto o descreve não pelo poder, mas pelo uso do poder. É o retrato oposto ao de Hamã (Et 5:13), e o eco distante de outro judeu que foi segundo de um rei pagão para alimentar os irmãos (Gn 45:7)."
    },
    homem: {
      title: "Os portadores do tributo das ilhas do mar, os cobradores sobre a terra e o cronista dos reis da Média e da Pérsia",
      subtitle: "Et 10:1-2 • o epílogo administrativo: o império volta a fazer o que os impérios fazem",
      text: "\"Depois disto impôs o rei Assuero tributo sobre a terra, e sobre as ilhas do mar\" (Et 10:1). Passada a crise, o livro devolve o mundo ao normal: cobradores nas províncias, fardos nos cais, o dinheiro subindo para Susã. O império que começou exibindo as suas riquezas por cento e oitenta dias termina cobrando imposto. O último homem da cena é o funcionário dos anais (Et 10:2) — e é bom lembrar o que um arquivo desses já fez neste livro: uma linha esquecida num rolo, lida por acaso numa noite de insônia, impediu um extermínio."
    },
    mulherComum: {
      title: "Ester, a rainha, no fim do livro que leva o seu nome",
      subtitle: "Et 10 • a mulher que já não precisa aparecer, porque o mandado dela ficou escrito",
      text: "Ester não é citada nos três versículos do último capítulo, e a ausência é o próprio desfecho: o que ela tinha a fazer já está feito e já está por escrito. A última palavra sobre ela é de autoridade legal, não de favor: \"o mandado de Ester estabeleceu os sucessos daquele Purim; e escreveu-se no livro\" (Et 9:32). A órfã de 2:7, levada à casa do rei sem que ninguém lhe perguntasse nada, termina como legisladora de uma festa que o seu povo guarda até hoje. Fica a pergunta de 4:14 e fica o resultado; o texto não junta os dois para o leitor."
    },
    multidao: {
      title: "A multidão de seus irmãos que estimou a Mardoqueu",
      subtitle: "Et 10:3 • o povo espalhado por cento e vinte e sete províncias, no último quadro do livro",
      text: "\"E grande entre os judeus, e estimado pela multidão de seus irmãos\" (Et 10:3). Esta é a mesma gente que Hamã descreveu ao rei como \"um povo... espalhado e dividido entre os povos em todas as províncias do teu reino\" (Et 3:8) — a dispersão que ele apresentou como ameaça é agora simplesmente o mapa de uma comunidade viva. É a multidão que esteve em saco e cinza (Et 4:3), que se ajuntou para defender a vida (Et 9:2) e que tomou sobre si a guarda de dois dias por ano. O livro termina com eles em pé, longe de Jerusalém, sem templo, sem profeta, sem uma menção ao nome de Deus — e vivos."
    },
    rei: {
      title: "Assuero, que impôs tributo sobre a terra e sobre as ilhas do mar",
      subtitle: "Et 10:1-2 • o rei do primeiro versículo do livro, no último, fazendo o que os reis fazem",
      text: "\"Depois disto impôs o rei Assuero tributo sobre a terra, e sobre as ilhas do mar\" (Et 10:1). O livro abriu medindo este homem pelo mapa (Et 1:1) e fecha medindo-o pela receita. Nada nele mudou: continua senhor do maior império do mundo conhecido, continua sem plano próprio. A fórmula final é a mesma dos livros dos Reis, aplicada a um monarca pagão — e o nome que ela carrega junto com o dele é o de um judeu do cativeiro (Et 10:2). Assinou a morte de um povo sem perguntar quem era, e a sua sobrevivência sem entender o que assinava."
    },
    servo: {
      title: "O servo que descarregou o tributo no cais das ilhas do mar",
      subtitle: "Et 10:1 • quem carrega os fardos no último quadro do livro, sem saber de nada do que aconteceu",
      text: "O último servo de Ester é uma figura de rotina: um homem no cais ou na estrada, descarregando os fardos do tributo (Et 10:1). Não esteve no banquete dos cento e oitenta dias, não ouviu o pregão, não leu a carta de Purim; faz o mesmo serviço que faria se Hamã tivesse vencido. E é assim que este livro acaba de propósito: sem milagre, sem coro, sem voz do céu. Todo o peso da história ficou em coisas pequenas — um rolo aberto na página certa, um convite adiado, uma forca pronta antes da hora, uma sorte lançada em Nisã que caiu no último mês do ano."
    }
  }
};
