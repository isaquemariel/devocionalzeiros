// Fichas ESPECÍFICAS por (capítulo → papel) de JUÍZES — quem é aquela figura
// (mesmo anônima na Bíblia) no contexto daquele capítulo, biblicamente e
// teologicamente. Vence a ficha genérica do papel.
//
// O livro é o ciclo que se repete e se agrava: Israel serve aos baalins, Deus o
// entrega a um opressor, o povo clama, Deus levanta um juiz, a terra descansa —
// e tudo recomeça pior, até o veredito final: \"cada um fazia o que parecia reto
// aos seus olhos\" (Jz 21:25).
import type { StageInfo } from "@/lib/rpgStageInfo";

export const CHAPTER_ACTORS: Record<number, Record<string, StageInfo>> = {
  // ------------------------------------------------------------------ Jz 1
  1: {
    multidao: {
      title: "Israel consultando o SENHOR após a morte de Josué",
      subtitle: "Juízes 1 • a conquista que ficou pela metade",
      text: "É a nação reunida sem o seu capitão: morto Josué, os filhos de Israel perguntam ao SENHOR \"Quem dentre nós primeiro subirá aos cananeus?\" e recebem por resposta \"Judá subirá\" (Jz 1:1-2). Começam bem — buscando a boca de Deus —, mas o capítulo termina numa ladainha de \"tampouco expulsou\": Manassés, Efraim, Zebulom, Aser, Naftali e Dã deixam os cananeus na terra (Jz 1:27-34). A obediência parcial de hoje é a servidão de amanhã: é dessa multidão tolerante que sai todo o ciclo dos Juízes.",
    },
    rei: {
      title: "Adoni-Bezeque",
      subtitle: "Juízes 1 • o rei cananeu de Bezeque",
      text: "Senhor de Bezeque, derrotado por Judá e Simeão; fugiu, foi preso e teve cortados os polegares das mãos e dos pés — a mesma mutilação que ele impusera a setenta reis, que apanhavam migalhas debaixo da sua mesa (Jz 1:5-7). Ele mesmo pronuncia a sentença: \"assim como eu fiz, assim Deus me pagou\". É a justiça retributiva de Deus confessada pela boca de um pagão, abrindo o livro em que Israel também colherá o que semear (Gl 6:7).",
    },
    patriarca: {
      title: "Calebe, o velho de Hebrom",
      subtitle: "Juízes 1 • o ancião que ainda toma cidades",
      text: "O companheiro de Josué entre os doze espias, o único que \"perseverou em seguir ao SENHOR\" (Nm 14:24), aparece aqui já ancião, expulsando de Hebrom os três filhos de Anaque e prometendo a filha Acsa a quem tomar Quiriate-Sefer (Jz 1:12,20). Enquanto as tribos se acomodam, o velho ainda peleja. É o contraste do capítulo: a fé de uma geração antiga julgando a moleza da nova.",
    },
    mulherComum: {
      title: "Acsa, filha de Calebe",
      subtitle: "Juízes 1 • a que pediu as fontes de água",
      text: "Dada por mulher a Otniel, que tomou Quiriate-Sefer, ela desce do jumento diante do pai e pede: \"Dá-me uma bênção; pois me deste uma terra seca, dá-me também fontes de águas\" — e Calebe lhe dá as fontes superiores e as inferiores (Jz 1:14-15). Herdeira que não se contenta com o seco, ela pede o que dá vida à herança. Num capítulo em que Israel se acomoda com menos do que Deus prometeu, Acsa é a exceção que ousa pedir tudo.",
    },
    homem: {
      title: "O homem que saía de Betel (Luz)",
      subtitle: "Juízes 1 • o informante poupado pelos espias",
      text: "A Escritura não lhe dá o nome: é o morador que os espias da casa de José encontram saindo da cidade e que lhes mostra a entrada, recebendo em troca misericórdia para si e toda a sua família (Jz 1:24-25). Depois foi à terra dos heteus e edificou outra cidade, chamando-a Luz. Sua história ecoa a de Raabe em Jericó (Js 6:25): no meio do juízo sobre Canaã, quem se põe do lado de Israel é poupado — mas aqui a misericórdia já vem misturada com a tolerância que perderá o povo.",
    },
  },

  // ------------------------------------------------------------------ Jz 2
  2: {
    multidao: {
      title: "Israel chorando em Boquim",
      subtitle: "Juízes 2 • o povo diante da repreensão do Anjo do SENHOR",
      text: "É todo o povo reunido quando o Anjo do SENHOR sobe de Gilgal e lhes lembra a aliança: \"Nunca invalidarei a minha aliança convosco… mas vós não obedecestes à minha voz\" (Jz 2:1-2). Ouvindo isso, levantam a voz e choram — e por isso o lugar se chamou Boquim, \"os que choram\" — e ali sacrificam ao SENHOR (Jz 2:4-5). Lágrimas verdadeiras, mas sem arrependimento que dure: poucos versículos depois já servem aos baalins.",
    },
    patriarca: {
      title: "Os anciãos que sobreviveram a Josué",
      subtitle: "Juízes 2 • a geração que vira a obra do SENHOR",
      text: "São os velhos que tinham visto com os próprios olhos o Jordão aberto, Jericó caída e a terra repartida; enquanto viveram, \"serviu o povo ao SENHOR todos os dias de Josué, e todos os dias dos anciãos\" (Jz 2:7). Com eles morre a memória viva dos milagres, e levanta-se \"outra geração que não conhecia ao SENHOR\" (Jz 2:10). O capítulo ensina o preço de não transmitir a fé aos filhos (Dt 6:6-7).",
    },
    servo: {
      title: "Josué, o servo do SENHOR",
      subtitle: "Juízes 2 • o sepultamento em Timnate-Heres",
      text: "O capítulo o chama pelo seu maior título: \"Josué, filho de Num, servo do SENHOR\", morto aos cento e dez anos e sepultado na sua herança em Timnate-Heres, no monte de Efraim (Jz 2:8-9). O mesmo nome dado a Moisés (Js 1:1) passa ao discípulo — sinal de que a grandeza em Israel se mede pelo serviço. Com o seu túmulo fecha-se a era da obediência e abre-se a dos ciclos.",
    },
    homem: {
      title: "Os homens da geração que não conheceu o SENHOR",
      subtitle: "Juízes 2 • os filhos que serviram a Baal e a Astarote",
      text: "São os israelitas nascidos depois da conquista, que não viram a grande obra do SENHOR e por isso \"fizeram o que era mau aos olhos do SENHOR; e serviram aos baalins\" (Jz 2:10-11). Deixaram o Deus de seus pais pelos deuses dos povos ao redor, e o SENHOR os entregou na mão dos espoliadores. Neles se vê que a apostasia não começa por uma decisão grandiosa, mas por um esquecimento.",
    },
    mulherComum: {
      title: "As mulheres de Israel entre Boquim e os baalins",
      subtitle: "Juízes 2 • as que choraram e as que se prostituíram após outros deuses",
      text: "A Escritura não lhes dá os nomes: são as mães e filhas de Israel que levantam a voz e choram em Boquim, e são as mesmas que, na geração seguinte, \"se prostituíram após outros deuses, e adoraram a eles\" (Jz 2:4,17). Nos altos de Astarote, culto de fertilidade, a casa e o ventre ficavam no centro da idolatria. São elas quem carrega, dentro de casa, a aliança ou a apostasia — e a segunda opção custa a Israel gerações inteiras.",
    },
  },

  // ------------------------------------------------------------------ Jz 3
  3: {
    multidao: {
      title: "Israel provado pelas nações que ficaram",
      subtitle: "Juízes 3 • o povo que clama sob Cusã-Risataim e Eglom",
      text: "É a nação que habita no meio de cananeus, heteus e jebuseus, casa-se com eles, serve aos seus deuses — e por isso é vendida na mão de Cusã-Risataim por oito anos e de Eglom por dezoito (Jz 3:5-8,14). Duas vezes clama ao SENHOR, e duas vezes Ele levanta um libertador. O capítulo dá a chave de tudo: as nações ficaram \"para por elas provar a Israel, para saber se dariam ouvido aos mandamentos do SENHOR\" (Jz 3:4).",
    },
    rei: {
      title: "Eglom, rei dos moabitas (e Cusã-Risataim antes dele)",
      subtitle: "Juízes 3 • os opressores levantados pelo próprio SENHOR",
      text: "Primeiro Cusã-Risataim, rei da Mesopotâmia, a quem o SENHOR vendeu Israel por oito anos; depois Eglom de Moabe, que o SENHOR \"fortaleceu contra Israel\", reuniu amonitas e amalequitas, tomou a cidade das palmeiras e dominou dezoito anos (Jz 3:8,12-14). Homem muito gordo, engordado do tributo do povo de Deus, morre na sua sala de verão pela espada de dois fios de Eúde. Ensinam que até o algoz é instrumento na mão do Juiz de toda a terra (Is 10:5).",
    },
    servo: {
      title: "Os servos de Eglom à porta da sala de verão",
      subtitle: "Juízes 3 • os que esperaram até se alarmarem",
      text: "São os criados do palácio de Moabe, mandados sair quando Eúde disse \"tenho uma palavra secreta para ti, ó rei\" (Jz 3:19). Voltando e achando as portas trancadas, supõem que o senhor esteja em necessidade particular, esperam até se envergonharem e só então tomam a chave — e acham-no morto (Jz 3:24-25). Naquela demora, planejada por Deus, Eúde escapa: a providência trabalha até pelo protocolo de servos pagãos.",
    },
    homem: {
      title: "Os homens de Israel que desceram das montanhas de Efraim",
      subtitle: "Juízes 3 • os que tomaram os vaus do Jordão",
      text: "São os israelitas que ouvem a buzina de Eúde nas montanhas de Efraim e descem atrás dele ao grito \"Segui-me, porque o SENHOR vos tem entregue vossos inimigos\" (Jz 3:27-28). Tomam os vaus do Jordão contra Moabe, e naquele dia caem dez mil moabitas, \"todos corpulentos, e todos homens valorosos\". Anônimos, são a mão pela qual a libertação anunciada vira vitória — e a terra sossega oitenta anos.",
    },
    mulherComum: {
      title: "As filhas dos cananeus tomadas por mulheres",
      subtitle: "Juízes 3 • os casamentos que trouxeram os deuses estranhos",
      text: "São as mulheres de Canaã, Hete, Amor, Perizeu, Heve e Jebus que os filhos de Israel \"tomaram de suas filhas para si por mulheres, e deram as suas filhas aos filhos deles; e serviram aos seus deuses\" (Jz 3:6). Exatamente o que a Lei proibira, porque \"desviarão teus filhos de mim\" (Dt 7:3-4). A idolatria do livro inteiro entra em Israel pela porta da casa, não pela porta da cidade.",
    },
  },

  // ------------------------------------------------------------------ Jz 4
  4: {
    multidao: {
      title: "Israel clamando sob os novecentos carros de ferro",
      subtitle: "Juízes 4 • vinte anos de opressão de Hazor",
      text: "É o povo vendido na mão de Jabim, rei de Canaã, cujo capitão Sísera tinha novecentos carros de ferro e por vinte anos \"oprimia violentamente os filhos de Israel\" (Jz 4:2-3). Encurralado no vale, onde os carros mandavam, esse povo só tem uma arma: o clamor ao SENHOR. E o SENHOR responde por uma profetisa e por uma estaca de tenda — nunca pelo ferro que o inimigo confiava.",
    },
    rei: {
      title: "Jabim, rei de Canaã, que reinava em Hazor",
      subtitle: "Juízes 4 • o trono do norte que oprimiu vinte anos",
      text: "Senhor de Hazor, a antiga cabeça dos reinos do norte (Js 11:10), reergue o poder cananeu e mantém Israel debaixo do pé por vinte anos, tendo Sísera por capitão (Jz 4:2). Derrotado no Quisom, vê a mão de Israel pesar e endurecer sobre ele \"até que exterminaram a Jabim\" (Jz 4:24). O que Josué queimara e Israel não guardara torna a crescer: pecado tolerado volta armado.",
    },
    servo: {
      title: "Os mensageiros que anunciaram a Sísera",
      subtitle: "Juízes 4 • os que levaram a notícia do monte Tabor",
      text: "São os homens a serviço de Harosete que correm avisar Sísera de que \"Baraque, filho de Abinoão, tinha subido ao monte Tabor\" (Jz 4:12) — e é por essa notícia que o capitão convoca os seus novecentos carros até ao ribeiro de Quisom. Sem saber, servem ao plano que Deus anunciara: \"atrairei a ti para o ribeiro de Quisom a Sísera… e o darei na tua mão\" (Jz 4:7). O recado do inimigo é a isca do SENHOR.",
    },
    homem: {
      title: "Os dez mil de Zebulom e Naftali",
      subtitle: "Juízes 4 • os que desceram do Tabor atrás de Baraque",
      text: "São os guerreiros convocados em Quedes, tirados de duas tribos apenas, que sobem ao Tabor e descem à ordem \"Levanta-te, porque este é o dia em que o SENHOR tem dado a Sísera na tua mão\" (Jz 4:10,14). Sem carros, contra novecentos, perseguem o exército até Harosete \"até não ficar um só\" (Jz 4:16). O cântico seguinte os louvará como o povo \"que expôs a sua vida à morte\" (Jz 5:18).",
    },
    mulherComum: {
      title: "As mulheres de Israel nos dias de Jabim",
      subtitle: "Juízes 4 • as que subiam a juízo debaixo das palmeiras de Débora",
      text: "São as israelitas dos vinte anos de opressão, cujos caminhos cessaram e cujas aldeias se esvaziaram (Jz 5:6-7), e que sobem com os seus, entre Ramá e Betel, para buscar juízo diante da profetisa (Jz 4:5). Numa terra sem justiça, elas procuram a única voz que ainda fala pelo SENHOR. E o capítulo lhes dá a honra: \"à mão de uma mulher o SENHOR venderá a Sísera\" (Jz 4:9).",
    },
  },

  // ------------------------------------------------------------------ Jz 5
  5: {
    multidao: {
      title: "O povo do SENHOR que desceu às portas",
      subtitle: "Juízes 5 • o cântico de Débora e Baraque",
      text: "É Israel reunido para cantar a vitória do Quisom: \"Louvai ao SENHOR pela vingança de Israel, quando o povo se ofereceu voluntariamente\" (Jz 5:2). O cântico faz a chamada das tribos — Efraim, Benjamim, Maquir, Zebulom, Issacar vieram; Rúben, Gileade, Dã e Aser ficaram; Meroz é amaldiçoada por não vir \"ao socorro do SENHOR\" (Jz 5:23). Adoração e prestação de contas na mesma canção: quem louva também é pesado.",
    },
    rei: {
      title: "Os reis de Canaã em Taanaque",
      subtitle: "Juízes 5 • os que pelejaram junto às águas de Megido",
      text: "São os régulos cananeus coligados com Sísera: \"Vieram reis, pelejaram; então pelejaram os reis de Canaã em Taanaque, junto às águas de Megido; não tomaram despojo de prata\" (Jz 5:19). Vieram por saque e saíram sem nada. Contra eles pelejaram os céus e o próprio ribeiro: \"as estrelas desde os lugares dos seus cursos pelejaram contra Sísera\" (Jz 5:20-21) — a criação toda a serviço do seu Criador.",
    },
    servo: {
      title: "Os que voluntariamente se ofereceram entre o povo",
      subtitle: "Juízes 5 • os legisladores e os que levaram a cana do escriba",
      text: "São os chefes e homens livres de Israel que não foram arrastados, mas se apresentaram: \"Meu coração é para os legisladores de Israel, que voluntariamente se ofereceram entre o povo; bendizei ao SENHOR\" (Jz 5:9). De Maquir descem legisladores, de Zebulom os que levam a cana do escriba, e os principais de Issacar vão com Débora (Jz 5:14-15). Servir a Deus por vontade, e não por medo, é o louvor que o cântico exalta (Sl 110:3).",
    },
    homem: {
      title: "Os homens de Zebulom e Naftali nas alturas do campo",
      subtitle: "Juízes 5 • \"um povo que expôs a sua vida à morte\"",
      text: "São os guerreiros que o cântico honra acima de todos: \"Zebulom é um povo que expôs a sua vida à morte, como também Naftali, nas alturas do campo\" (Jz 5:18). Ao lado deles, o cântico expõe os que não vieram — Rúben com as suas \"grandes esquadrinhações do coração\", Dã nos navios, Aser junto às baías (Jz 5:16-17). Entre arriscar-se pelo SENHOR e ficar em casa deliberando, o cântico não hesita em dizer qual vale.",
    },
    mulherComum: {
      title: "A mãe de Sísera à janela, e as suas damas",
      subtitle: "Juízes 5 • a espera que nunca acaba",
      text: "É a mãe do capitão morto, que \"olhava pela janela, e exclamava pela grade: Por que tarda em vir o seu carro?\", enquanto as mais sábias das suas damas a consolam com o cálculo do despojo — \"uma ou duas moças a cada homem\" (Jz 5:28-30). A crueldade do saque é dita com naturalidade na boca das mulheres do palácio. O cântico deixa a cena suspensa e conclui: \"Assim, ó SENHOR, pereçam todos os teus inimigos!\" (Jz 5:31).",
    },
    rebanho: {
      title: "Os rebanhos dos currais de Rúben",
      subtitle: "Juízes 5 • os balidos que valeram mais que a guerra do SENHOR",
      text: "São as ovelhas dos apriscos de além-Jordão, motivo pelo qual o cântico interpela a tribo: \"Por que ficaste tu entre os currais para ouvires os balidos dos rebanhos?\" (Jz 5:16). O gado não peca; o coração que o prefere ao chamado, sim. Aqui o rebanho é o retrato do conforto que segura o crente longe do socorro do SENHOR.",
    },
  },

  // ------------------------------------------------------------------ Jz 6
  6: {
    multidao: {
      title: "Israel empobrecido pelos midianitas",
      subtitle: "Juízes 6 • sete anos de covas, cavernas e fortificações",
      text: "É o povo que semeia e não colhe: midianitas, amalequitas e os filhos do oriente sobem \"como gafanhotos, em grande multidão que não se podia contar\", destroem os frutos, não deixam ovelha nem boi, e Israel se esconde nas covas dos montes (Jz 6:2-5). \"Assim Israel empobreceu muito… então os filhos de Israel clamaram ao SENHOR\" (Jz 6:6). Ao clamor, Deus manda primeiro um profeta — antes do libertador, vem a acusação.",
    },
    rei: {
      title: "Os príncipes de Midiã e dos filhos do oriente",
      subtitle: "Juízes 6 • o arraial acampado no vale de Jizreel",
      text: "São os cabeças midianitas, amalequitas e do oriente que se ajuntam, passam o Jordão e acampam no vale de Jizreel para mais uma colheita de saque (Jz 6:33). Vêm com camelos inumeráveis, e por sete anos ninguém os enfrentou. Deles sairão os nomes que o capítulo seguinte registra — Orebe, Zeebe, Zeba e Salmuna —, todos entregues nas mãos de trezentos homens, para que a glória fosse só de Deus (Jz 7:2).",
    },
    servo: {
      title: "Os dez servos que derrubaram o altar de Baal",
      subtitle: "Juízes 6 • a obra feita de noite em Ofra",
      text: "São os dez homens da casa de Joás que Gideão toma consigo para derrubar o altar de Baal, cortar o bosque e edificar um altar ao SENHOR, oferecendo o segundo boi — feito de noite, \"temendo ele a casa de seu pai, e os homens daquela cidade\" (Jz 6:27). Anônimos e obedientes, arriscam a vida numa reforma que a cidade quis punir com morte. A libertação de Israel começa pela demolição do ídolo dentro de casa.",
    },
    homem: {
      title: "Joás e os homens de Ofra",
      subtitle: "Juízes 6 • a cidade que quis matar por Baal",
      text: "De madrugada, os homens de Ofra acham o altar de Baal derrubado e exigem do pai: \"Tira para fora a teu filho; para que morra\" (Jz 6:30). Joás os desarma com uma pergunta que julga a idolatria inteira: \"Contendereis vós por Baal? Livrá-lo-eis vós?… se é deus, por si mesmo contenda\" — e daí o nome Jerubaal (Jz 6:31-32). Um deus que precisa ser defendido por homens já se mostrou nenhum deus (Is 46:7).",
    },
    mulherComum: {
      title: "As mulheres de Israel escondidas nas covas dos montes",
      subtitle: "Juízes 6 • mães sem pão nos sete anos de Midiã",
      text: "A Escritura não as nomeia: são as israelitas que fizeram para si, por causa dos midianitas, \"as covas que estão nos montes, as cavernas e as fortificações\" (Jz 6:2), e que criam os filhos numa terra em que não se deixava mantimento (Jz 6:4). É a casa de uma delas que malha trigo escondido no lagar quando o Anjo do SENHOR chega. Sobre esse desamparo caem as duas melhores notícias do capítulo: \"O SENHOR é contigo\" e \"O SENHOR É PAZ\" (Jz 6:12,24).",
    },
  },

  // ------------------------------------------------------------------ Jz 7
  7: {
    multidao: {
      title: "Os trinta e dois mil reduzidos junto à fonte de Harode",
      subtitle: "Juízes 7 • o exército que Deus achou grande demais",
      text: "É o povo que acampa com Gideão contra o arraial de Midiã e ouve o SENHOR dizer: \"Muito é o povo que está contigo… a fim de que Israel não se glorie contra mim, dizendo: A minha mão me livrou\" (Jz 7:2). Vinte e dois mil voltam por medo, e dos dez mil restantes ficam trezentos. Deus diminui o exército para que a vitória não tenha dono humano (2Co 4:7).",
    },
    rei: {
      title: "Orebe e Zeebe, príncipes dos midianitas",
      subtitle: "Juízes 7 • a penha de Orebe e o lagar de Zeebe",
      text: "São os dois chefes de Midiã presos pelos homens de Efraim, chamados para tomar as águas até Bete-Bara e o Jordão; um morre na penha que levou o seu nome, o outro no lagar, e as suas cabeças são trazidas a Gideão (Jz 7:24-25). O profeta Isaías ainda invocaria esse dia como paradigma de livramento: \"como a matança de Midiã na rocha de Orebe\" (Is 10:26). Os grandes do arraial caem depois que Deus já o desfizera com cântaros e buzinas.",
    },
    servo: {
      title: "Purá, o moço de Gideão",
      subtitle: "Juízes 7 • a descida noturna às sentinelas do arraial",
      text: "É o servo que desce com Gideão até ao extremo das sentinelas de Midiã, na noite em que o SENHOR disse: \"E, se ainda temes descer, desce tu e teu moço Purá, ao arraial\" (Jz 7:10-11). Testemunha silenciosa do sonho do pão de cevada e da sua interpretação, vê o seu senhor adorar ali mesmo, no escuro, antes de qualquer vitória (Jz 7:15). Deus condescende com o medo do seu servo e lhe dá até um companheiro para a prova.",
    },
    homem: {
      title: "Os trezentos que lamberam as águas",
      subtitle: "Juízes 7 • buzinas, cântaros vazios e tochas acesas",
      text: "São os homens separados na prova das águas de Harode — os que lamberam levando a mão à boca, e não os que se abaixaram de joelhos (Jz 7:6-7). Divididos em três companhias, cercam o arraial à meia-noite, tocam as buzinas, quebram os cântaros e clamam: \"Espada do SENHOR, e de Gideão\" (Jz 7:20). Não desembainham espada: o SENHOR vira \"a espada de um contra o outro\" no arraial inteiro (Jz 7:22) — vaso de barro quebrado para que a luz apareça.",
    },
  },

  // ------------------------------------------------------------------ Jz 8
  8: {
    multidao: {
      title: "Os homens de Israel que ofereceram a coroa a Gideão",
      subtitle: "Juízes 8 • \"Domina sobre nós\" — e depois o éfode de Ofra",
      text: "É o povo livre dos midianitas, que agora pede dinastia: \"Domina sobre nós, tanto tu, como teu filho e o filho de teu filho; porquanto nos livraste da mão dos midianitas\" (Jz 8:22). Ouve a resposta certa — \"o SENHOR sobre vós dominará\" (Jz 8:23) —, mas entrega de boa vontade o ouro com que se faz o éfode diante do qual \"todo o Israel prostituiu-se\" (Jz 8:27). Recusar a coroa e aceitar o ouro: a vitória que não foi guardada em adoração vira armadilha.",
    },
    rei: {
      title: "Zeba e Salmuna, reis dos midianitas",
      subtitle: "Juízes 8 • os fugitivos alcançados em Carcor",
      text: "São os dois reis que fogem com quinze mil homens, o resto do exército do oriente, e são presos por Gideão além de Nobá e Jogbeá (Jz 8:10-12). Interrogados sobre os mortos de Tabor, confessam ter matado os irmãos de Gideão — \"cada um parecia filho de rei\" — e por isso morrem, com os ornamentos tirados dos pescoços dos seus camelos (Jz 8:18-21). A opressão cobra a sua conta: o sangue derramado não fica sem resposta (Gn 9:6).",
    },
    servo: {
      title: "O moço de Sucote tomado preso",
      subtitle: "Juízes 8 • o que escreveu os nomes dos setenta e sete",
      text: "Um rapaz anônimo da cidade de Sucote, capturado por Gideão e interrogado, que \"lhe deu por escrito os nomes dos príncipes de Sucote, e dos seus anciãos, setenta e sete homens\" (Jz 8:14). Sua lista é a sentença dos que negaram pão aos trezentos cansados. Detalhe precioso de história: mesmo um moço do interior de Israel sabia escrever — e aquela escrita virou juízo.",
    },
    homem: {
      title: "Os homens de Efraim, de Sucote e de Penuel",
      subtitle: "Juízes 8 • os que contenderam e os que negaram o pão",
      text: "Efraim contende com Gideão por não ter sido chamado à peleja, e se aplaca com uma palavra branda — \"não são porventura os rabiscos de Efraim melhores do que a vindima de Abiezer?\" (Jz 8:1-3; cf. Pv 15:1). Sucote e Penuel, porém, zombam dos trezentos famintos — \"Estão já, Zeba e Salmuna, em tua mão, para que demos pão ao teu exército?\" — e recebem os espinhos do deserto e a torre derrubada (Jz 8:6-9,16-17). Irmãos que negam pão a irmãos em guerra colhem o desprezo que semearam.",
    },
    mulherComum: {
      title: "As muitas mulheres de Gideão e a concubina de Siquém",
      subtitle: "Juízes 8 • a casa de setenta filhos e o nome Abimeleque",
      text: "A Escritura não as nomeia: são as mulheres de quem Gideão teve setenta filhos, e a concubina de Siquém que lhe deu à luz um filho a quem pôs por nome Abimeleque, \"meu pai é rei\" (Jz 8:30-31). O homem que recusou a coroa com a boca montou uma casa de rei com a vida. Desse harém e desse nome sai o capítulo mais sangrento do livro (Jz 9:5).",
    },
  },

  // ------------------------------------------------------------------ Jz 9
  9: {
    multidao: {
      title: "Os cidadãos de Siquém que aclamaram Abimeleque",
      subtitle: "Juízes 9 • a coroação junto ao carvalho alto",
      text: "São os moradores de Siquém e toda a casa de Milo que, seduzidos pelo argumento do parentesco — \"sou osso vosso e carne vossa\" —, se ajuntam e constituem Abimeleque rei junto ao carvalho (Jz 9:2,6). Financiam o golpe com setenta peças de prata da casa de Baal-Berite, o preço de setenta irmãos mortos sobre uma pedra. Três anos depois, o fogo que Jotão anunciou sai deles contra Abimeleque e de Abimeleque contra eles (Jz 9:20,56-57).",
    },
    rei: {
      title: "Abimeleque, o rei feito em Siquém",
      subtitle: "Juízes 9 • o primeiro trono de Israel, erguido sobre sangue",
      text: "Filho da concubina de Gideão, é constituído rei pelos cidadãos de Siquém depois de matar os setenta filhos de Jerubaal sobre uma pedra — só Jotão escapa (Jz 9:5-6). Reina três anos, assola a própria cidade e a semeia de sal, até morrer em Tebes com o crânio quebrado pela pedra de uma mó (Jz 9:45,53). \"Assim Deus fez tornar sobre Abimeleque o mal que tinha feito a seu pai\" (Jz 9:56): a realeza tomada à força é o espinheiro da parábola, que não dá sombra — só fogo.",
    },
    homem: {
      title: "Gaal, filho de Ebede, e os homens ociosos e levianos",
      subtitle: "Juízes 9 • os alugados do golpe e o rival que os sublevou",
      text: "Com a prata da casa de Baal-Berite, Abimeleque \"alugou uns homens ociosos e levianos, que o seguiram\" (Jz 9:4) — bando sem causa, pronto para qualquer crime pago. Depois chega Gaal, filho de Ebede, em quem os cidadãos de Siquém confiam e que, entre vinho e maldições na festa da vindima, desafia: \"Quem é Abimeleque… para que o sirvamos?\" (Jz 9:27-28). Denunciado por Zebul, o maioral da cidade, é derrotado e expulso: traição paga com traição, é a colheita do capítulo.",
    },
    mulherComum: {
      title: "A mulher que lançou o pedaço de mó da torre de Tebes",
      subtitle: "Juízes 9 • o fim do rei que temia a vergonha",
      text: "A Escritura não lhe dá o nome: refugiada com os homens e mulheres da cidade no eirado da torre forte de Tebes, viu o rei chegar-se à porta para incendiá-la e \"lançou um pedaço de uma mó sobre a cabeça de Abimeleque; e quebrou-lhe o crânio\" (Jz 9:51-53). Ele pediu ao seu escudeiro a morte pela espada, \"para que não se diga de mim: Uma mulher o matou\". Deus derruba o poderoso pela mão que ele mais desprezava (1Co 1:27) — e Israel lembraria esse golpe por gerações (2Sm 11:21).",
    },
  },

  // ------------------------------------------------------------------ Jz 10
  10: {
    multidao: {
      title: "Israel confessando o pecado e acampado em Mizpá",
      subtitle: "Juízes 10 • \"Pecamos; faze-nos conforme a tudo quanto te parecer bem\"",
      text: "É o povo que serviu a sete panteões ao mesmo tempo — baalins, Astarote, os deuses da Síria, de Sidom, de Moabe, de Amom e dos filisteus (Jz 10:6) — e que, oprimido dezoito anos, clama: \"Contra ti havemos pecado\". Ouve de Deus um \"não vos livrarei mais\" que o quebranta, tira os deuses alheios do meio de si e serve ao SENHOR (Jz 10:13-16). Só então se congrega em Mizpá — arrependimento que não é só palavra, mas ídolo removido.",
    },
    rei: {
      title: "O rei dos filhos de Amom e os príncipes dos filisteus",
      subtitle: "Juízes 10 • os dois flagelos do oriente e do ocidente",
      text: "São os opressores nas mãos de quem o SENHOR vendeu Israel: os filisteus a ocidente e os amonitas a oriente, que por dezoito anos vexaram os que estavam além do Jordão, em Gileade, e passaram o rio para pelejar contra Judá, Benjamim e Efraim (Jz 10:7-9). Israel fica \"muito angustiado\", cercado por dois lados. Deus usa os deuses que o povo escolheu para lhe mostrar quem eles servem de verdade (Jz 10:14).",
    },
    anciao: {
      title: "Os príncipes de Gileade em Mizpá",
      subtitle: "Juízes 10 • \"Quem será o homem que começará a pelejar?\"",
      text: "São os cabeças das casas paternas de Gileade que, acampados diante do exército de Amom, dizem uns aos outros: \"Quem será o homem que começará a pelejar contra os filhos de Amom? Ele será por cabeça de todos os moradores de Gileade\" (Jz 10:18). Prometem o governo a quem se arriscar — e essa promessa os obrigará a buscar o filho da prostituta que eles mesmos expulsaram (Jz 11:5-8). Deus escolhe a pedra que os edificadores rejeitaram (Sl 118:22).",
    },
    homem: {
      title: "Tola e Jair, os juízes entre dois ciclos",
      subtitle: "Juízes 10 • vinte e três anos e vinte e dois anos de sossego",
      text: "Tola, filho de Puá, de Issacar, levanta-se depois de Abimeleque \"para livrar a Israel\" e julga vinte e três anos em Samir; depois Jair, o gileadita, julga vinte e dois, com trinta filhos que cavalgavam trinta jumentos e tinham trinta cidades, as Havote-Jair (Jz 10:1-4). Deles não se conta batalha alguma, só descanso. São o lembrete de que a fidelidade escondida também sustenta um povo — e de que a paz herdada se perde depressa (Jz 10:6).",
    },
    mulherComum: {
      title: "As mulheres de Gileade nos dezoito anos de Amom",
      subtitle: "Juízes 10 • a angústia além do Jordão",
      text: "A Escritura não as nomeia: são as israelitas da terra dos amorreus, em Gileade, oprimidas e vexadas por dezoito anos pelos filhos de Amom, até Israel ficar \"muito angustiado\" (Jz 10:8-9). Nas suas casas estavam os ídolos de Sidom e de Moabe que o povo por fim tira do meio de si (Jz 10:16). O arrependimento nacional passa por dentro de cada casa antes de chegar ao campo de batalha.",
    },
    servo: {
      title: "Os que tiraram do meio de si os deuses alheios",
      subtitle: "Juízes 10 • \"e serviram ao SENHOR\"",
      text: "São os israelitas que fizeram a prova do arrependimento verdadeiro: não só disseram \"pecamos\", mas \"tiraram os deuses alheios do meio de si, e serviram ao SENHOR\" (Jz 10:15-16). Servir a Deus, no livro dos Juízes, é sempre um verbo disputado — o mesmo povo \"serviu aos baalins\" no versículo 6. Vendo esse retorno, \"angustiou-se a sua alma por causa da desgraça de Israel\": Deus não fica indiferente ao gemido do seu povo (Is 63:9).",
    },
  },

  // ------------------------------------------------------------------ Jz 11
  11: {
    multidao: {
      title: "O povo de Gileade em Mizpá",
      subtitle: "Juízes 11 • os que fizeram Jefté chefe e príncipe",
      text: "São os moradores de Gileade que, com os anciãos, tomam o rejeitado e \"o puseram por chefe e príncipe sobre si\", enquanto ele \"falou todas as suas palavras perante o SENHOR em Mizpá\" (Jz 11:11). É a mesma multidão que, depois da vitória sobre vinte cidades de Amom, verá o voto do seu chefe recair sobre a única filha dele. Um povo que aclama um libertador e assiste ao preço de uma promessa feita sem conhecer a Deus.",
    },
    rei: {
      title: "O rei dos filhos de Amom",
      subtitle: "Juízes 11 • o que reivindicou a terra desde Arnom até Jaboque",
      text: "É o soberano amonita que responde aos mensageiros de Jefté acusando Israel de lhe ter tomado a terra na saída do Egito e exigindo: \"Restitui-ma agora, em paz\" (Jz 11:13). Jefté lhe recita trezentos anos de história — a terra fora tirada de Siom, rei dos amorreus, pela mão do SENHOR — e conclui: \"o SENHOR, que é juiz, julgue hoje\" (Jz 11:23,27). O rei \"não deu ouvidos\", e é subjugado com grande mortandade (Jz 11:28,33).",
    },
    anciao: {
      title: "Os anciãos de Gileade",
      subtitle: "Juízes 11 • os que foram buscar Jefté na terra de Tobe",
      text: "São os chefes que haviam consentido na expulsão do filho da prostituta e que agora, em aperto diante de Amom, vão buscá-lo em Tobe: \"Vem, e sê o nosso chefe\" (Jz 11:5-6). Ouvem a acusação — \"não me odiastes a mim, e não me expulsastes da casa de meu pai?\" — e juram: \"O SENHOR será testemunha entre nós\" (Jz 11:7,10). Homens que só procuram o rejeitado quando a necessidade aperta, e ainda assim são usados por Deus para levantar um libertador.",
    },
    homem: {
      title: "Os homens levianos que se ajuntaram a Jefté em Tobe",
      subtitle: "Juízes 11 • o bando do exilado",
      text: "São os desgarrados que se ajuntaram ao filho expulso na terra de Tobe e \"saíam com ele\" (Jz 11:3) — companhia de fora da lei, formada por quem também não tinha lugar em casa. Deles sai o chefe que Gileade virá buscar. É o mesmo padrão que se repetirá com Davi em Adulão, quando \"todo o homem que estava em aperto\" se ajuntou a ele (1Sm 22:2): Deus levanta os seus libertadores das margens.",
    },
    servo: {
      title: "Os mensageiros enviados ao rei de Amom",
      subtitle: "Juízes 11 • os que levaram e trouxeram a causa",
      text: "São os emissários que Jefté envia duas vezes ao rei dos filhos de Amom, antes de qualquer espada, com a pergunta \"Que há entre mim e ti?\" e depois com a longa defesa histórica de Israel (Jz 11:12,14-27). Levam palavras enquanto ainda há palavras — a guerra só vem depois de o rei não dar ouvidos. Servos anônimos de uma diplomacia que apela ao Juiz de toda a terra antes de apelar às armas.",
    },
    mulherComum: {
      title: "As companheiras da filha de Jefté e as filhas de Israel",
      subtitle: "Juízes 11 • o pranto pelos montes e o costume anual",
      text: "São as moças que descem com ela pelos montes por dois meses para chorar a sua virgindade, e as filhas de Israel que depois \"iam de ano em ano lamentar, por quatro dias, a filha de Jefté, o gileadita\" (Jz 11:37-40). Anônimas, guardam viva a memória do preço de um voto precipitado. \"Melhor é que não votes do que votares e não pagares\" (Ec 5:5) — e melhor ainda é conhecer o Deus a quem se vota, que jamais pediu tal coisa (Dt 12:31).",
    },
  },

  // ------------------------------------------------------------------ Jz 12
  12: {
    multidao: {
      title: "Os quarenta e dois mil de Efraim nos vaus do Jordão",
      subtitle: "Juízes 12 • a guerra entre irmãos por uma questão de honra",
      text: "É a tribo de Efraim que se convoca contra Jefté — \"Por que passaste a combater contra os filhos de Amom, e não nos chamaste?… Queimaremos a fogo a tua casa contigo\" (Jz 12:1) — e acaba desfeita nos vaus do Jordão. Caem quarenta e dois mil, mais do que morreram na guerra contra Amom. A mesma soberba que Gideão aplacara com brandura (Jz 8:1-3) agora custa uma tribo: orgulho ferido é o combustível das guerras civis.",
    },
    anciao: {
      title: "Ibzã, Elom e Abdom, os juízes que sucederam a Jefté",
      subtitle: "Juízes 12 • sete, dez e oito anos de julgar Israel",
      text: "São os três anciãos que julgam Israel depois de Jefté: Ibzã de Belém, Elom o zebulonita, e Abdom, filho de Hilel, o piratonita, com quarenta filhos e trinta netos que cavalgavam setenta jumentos (Jz 12:8-15). Nenhuma batalha lhes é atribuída — só casas grandes, muitos filhos e muitos jumentos, sinais de prosperidade e de status. Julgar virou administrar bens; a fome de Deus foi sumindo do ofício.",
    },
    homem: {
      title: "Os efraimitas provados na senha \"Chibolete\"",
      subtitle: "Juízes 12 • o sotaque que virou sentença de morte",
      text: "São os fugitivos de Efraim detidos pelos gileaditas nos vaus do Jordão: quem negava ser efraimita era mandado dizer \"Chibolete\", e ao pronunciar \"Sibolete\" era degolado (Jz 12:5-6). Uma sílaba separava o vivo do morto entre irmãos da mesma aliança. É o retrato mais cru do livro: Israel, sem rei e sem temor de Deus, transformou diferença de fala em motivo de matança.",
    },
    servo: {
      title: "Os gileaditas que guardavam os vaus do Jordão",
      subtitle: "Juízes 12 • as sentinelas da passagem",
      text: "São os homens de Gileade postos por Jefté para tomar aos efraimitas os vaus do Jordão, único caminho de volta para casa (Jz 12:5). Cumprem ordem, interrogam cada fugitivo e executam ali mesmo. Servem fielmente — mas a uma causa que já não é a do SENHOR, e sim a de um chefe ferido no orgulho: obediência sem discernimento é o que arma as tragédias deste livro.",
    },
    mulherComum: {
      title: "As trinta filhas de Ibzã de Belém",
      subtitle: "Juízes 12 • os casamentos de fora e a paz negociada",
      text: "São as filhas do juiz Ibzã, casadas \"fora\", enquanto ele trazia de fora outras trinta para os seus trinta filhos (Jz 12:9). Casamentos como instrumento de aliança e prestígio, num tempo em que a Lei advertia contra tomar mulheres dos povos da terra (Dt 7:3). Junto delas estão as viúvas anônimas dos quarenta e dois mil de Efraim: as mulheres pagam, na casa, as contas da guerra dos homens.",
    },
  },

  // ------------------------------------------------------------------ Jz 13
  13: {
    rei: {
      title: "Os príncipes dos filisteus",
      subtitle: "Juízes 13 • quarenta anos de domínio sobre Israel",
      text: "São os senhores das cinco cidades filisteias — Gaza, Asdode, Ascalom, Gate e Ecrom — nas mãos de quem o SENHOR entregou Israel por quarenta anos, a mais longa opressão do livro (Jz 13:1). Desta vez o povo nem sequer clama: acomodou-se ao jugo. Ainda assim Deus toma a iniciativa e anuncia um nazireu que \"começará a livrar a Israel da mão dos filisteus\" (Jz 13:5) — graça que se antecipa ao pedido (Rm 5:8).",
    },
    homem: {
      title: "Os homens de Zorá e Estaol, da tribo de Dã",
      subtitle: "Juízes 13 • a vizinhança em que o Espírito começou a incitar o menino",
      text: "São os danitas das aldeias de Zorá e Estaol, apertados entre os amorreus e os filisteus (Jz 1:34) e vivendo os quarenta anos de domínio filisteu. É entre eles que nasce o menino abençoado do SENHOR, e é no campo de Maané-Dã, \"entre Zorá e Estaol\", que \"o Espírito do SENHOR começou a incitá-lo de quando em quando\" (Jz 13:24-25). Deus prepara o livramento no lugar mais estreito, com gente comum de uma tribo sem herança firme.",
    },
    mulherComum: {
      title: "As mulheres de Zorá",
      subtitle: "Juízes 13 • as vizinhas da estéril que recebeu a promessa",
      text: "A Escritura não as nomeia: são as danitas de Zorá que conviviam com a mulher de Manoá, \"sendo estéril, não tinha filhos\" (Jz 13:2) — e para quem a esterilidade era vergonha pública. Sobre essa casa desce o anúncio do Anjo do SENHOR, como antes sobre Sara, Rebeca e Ana: Deus abre ventres fechados para levantar libertadores (1Sm 1:20). O que a vizinhança tinha por desgraça, Deus escolheu para nele mostrar a sua força.",
    },
  },

  // ------------------------------------------------------------------ Jz 14
  14: {
    multidao: {
      title: "Os filisteus de Timnate e os ascalonitas",
      subtitle: "Juízes 14 • o banquete de bodas e a ira do enigma",
      text: "É a gente da cidade filisteia que celebra as bodas sete dias, ouve o enigma \"Do comedor saiu comida, e do forte saiu doçura\" e não o decifra — até arrancá-lo pela ameaça (Jz 14:12-18). Quando reclamam a vitória, ouvem: \"Se vós não lavrásseis com a minha novilha, nunca teríeis descoberto o meu enigma\". A festa termina com trinta ascalonitas mortos; o casamento que os pais reprovaram \"vinha do SENHOR, pois buscava ocasião contra os filisteus\" (Jz 14:4).",
    },
    homem: {
      title: "Os trinta companheiros das bodas",
      subtitle: "Juízes 14 • os \"amigos\" que ameaçaram a noiva com fogo",
      text: "São os trinta filisteus trazidos para acompanhar o noivo — guarda de honra que era também vigilância (Jz 14:11). Não conseguindo decifrar o enigma, dizem à mulher: \"Persuade a teu marido que nos declare o enigma, para que porventura não queimemos a fogo a ti e à casa de teu pai\" (Jz 14:15). A ameaça que fazem se cumprirá contra ela pelas mãos dos seus próprios conterrâneos (Jz 15:6): a violência filisteia devora até os seus.",
    },
    mulherComum: {
      title: "A mulher de Timnate, das filhas dos filisteus",
      subtitle: "Juízes 14 • a noiva pressionada entre o marido e o seu povo",
      text: "A Escritura não lhe dá o nome: é a filisteia que \"agradou aos olhos\" do nazireu, contra o conselho do pai e da mãe dele — \"Não há, porventura, mulher entre as filhas de teus irmãos?\" (Jz 14:2-3). Chora diante do marido os sete dias das bodas até arrancar o enigma, e o declara aos filhos do seu povo; depois é dada ao companheiro do noivo (Jz 14:16-17,20). Presa entre dois povos, prefigura Dalila e mostra o perigo do jugo desigual (2Co 6:14).",
    },
  },

  // ------------------------------------------------------------------ Jz 15
  15: {
    multidao: {
      title: "Os filisteus acampados em Leí",
      subtitle: "Juízes 15 • o exército que subiu por causa de um homem só",
      text: "É a força filisteia que sobe contra Judá e se estende por Leí, respondendo aos homens da tribo: \"Subimos para amarrar a Sansão, para lhe fazer a ele como ele nos fez a nós\" (Jz 15:9-10). Saem jubilando ao encontro do prisioneiro amarrado e caem mil homens diante de uma queixada de jumento (Jz 15:14-15). O que a nação inteira não ousava enfrentar, o SENHOR desbarata por um único homem cheio do seu Espírito.",
    },
    rei: {
      title: "Os que dominavam sobre Judá",
      subtitle: "Juízes 15 • os senhores filisteus a quem Judá já se rendera",
      text: "São os chefes filisteus cujo domínio Judá aceitara como fato consumado: \"Não sabias tu que os filisteus dominam sobre nós?\" (Jz 15:11). Não há aqui clamor ao SENHOR nem desejo de livramento — só o medo de perder a servidão em paz. É o retrato mais triste do capítulo: uma tribo que prefere entregar o seu libertador a arriscar a mudança que Deus está trazendo.",
    },
    servo: {
      title: "Os ceifeiros dos filisteus",
      subtitle: "Juízes 15 • a sega do trigo queimada pelas trezentas raposas",
      text: "São os trabalhadores dos campos filisteus na sega do trigo, que veem arder molhos, seara em pé, vinhas e olivais quando as raposas atadas cauda a cauda, com tochas no meio, são soltas nas plantações (Jz 15:4-5). Perguntam \"Quem fez isto?\", e a resposta desencadeia a queima da mulher de Timnate e de seu pai (Jz 15:6). A vingança em cadeia consome primeiro os que só trabalhavam a terra.",
    },
    homem: {
      title: "Os três mil homens de Judá na fenda da rocha de Etã",
      subtitle: "Juízes 15 • os que desceram para amarrar o seu próprio libertador",
      text: "São os israelitas que descem, não contra o inimigo, mas contra o irmão: \"Descemos para te amarrar e te entregar nas mãos dos filisteus\" (Jz 15:12). Amarram-no com duas cordas novas depois de jurar que eles mesmos não o matariam. Três mil homens de Judá bastavam para pelejar; preferiram usar a força para manter o jugo — sinal de um povo que já não sabe reconhecer a salvação quando ela chega (Jo 1:11).",
    },
    mulherComum: {
      title: "A mulher timnita queimada com seu pai",
      subtitle: "Juízes 15 • e a irmã mais nova oferecida no lugar dela",
      text: "É a noiva dada ao companheiro do noivo, cujo pai, ao recusar a entrada do genro, oferece em troca a filha mais nova: \"não é sua irmã mais nova, mais formosa do que ela?\" (Jz 15:2). Quando as searas ardem, os filisteus sobem e queimam a fogo \"a ela e a seu pai\" (Jz 15:6) — exatamente a ameaça de que ela tentara escapar traindo o marido. Duas filhas tratadas como moeda de troca: o livro dos Juízes vai mostrando o que acontece às mulheres quando cada um faz o que parece reto aos seus olhos.",
    },
  },

  // ------------------------------------------------------------------ Jz 16
  16: {
    multidao: {
      title: "Os três mil sobre o telhado da casa de Dagom",
      subtitle: "Juízes 16 • a festa que virou sepultura",
      text: "É o povo filisteu reunido para oferecer grande sacrifício a Dagom, louvando o seu deus: \"Nosso deus nos entregou nas mãos o nosso inimigo\" (Jz 16:23-24). Homens e mulheres enchem a casa, e uns três mil se apinham no telhado para ver o cego brincar diante deles (Jz 16:27). Quando as duas colunas do meio cedem, \"foram mais os mortos que matou na sua morte do que os que matara em sua vida\" (Jz 16:30): o triunfo do ídolo dura só o tempo de uma oração ouvida.",
    },
    rei: {
      title: "Os príncipes dos filisteus",
      subtitle: "Juízes 16 • os que compraram o segredo por mil e cem moedas cada um",
      text: "São os cinco senhores das cidades filisteias que sobem a Dalila e prometem, cada um, mil e cem moedas de prata para que ela descubra em que consiste a grande força (Jz 16:5). Pagam, cegam o prisioneiro, prendem-no com duas cadeias de bronze e o põem a girar um moinho em Gaza (Jz 16:21). No dia da festa, todos estão sob o mesmo teto que cai — o dinheiro comprou o segredo, mas não comprou o desfecho (Jz 16:30).",
    },
    servo: {
      title: "O moço que guiava o cego pela mão",
      subtitle: "Juízes 16 • quem o levou às colunas do meio",
      text: "É o rapaz encarregado de conduzir o prisioneiro cego diante da multidão e a quem ele pede: \"Guia-me para que apalpe as colunas em que se sustém a casa, para que me encoste a elas\" (Jz 16:26). Sem saber, coloca a mão do nazireu exatamente onde Deus responderia à última oração: \"Senhor DEUS, peço-te que te lembres de mim\" (Jz 16:28). Um servo anônimo se torna, sem querer, o instrumento do juízo sobre a casa de Dagom.",
    },
    homem: {
      title: "Os gazitas de emboscada e o espia na câmara interior",
      subtitle: "Juízes 16 • os que esperaram a luz da manhã e os que esperaram na recâmara",
      text: "São os homens de Gaza que cercam a casa e põem espias à porta da cidade, dizendo: \"Até à luz da manhã esperaremos; então o mataremos\" — e acordam sem portas, arrancadas com as umbreiras e a tranca e levadas ao cume do monte defronte de Hebrom (Jz 16:2-3). Depois, no vale de Soreque, é o espia escondido na câmara interior que aguarda o grito \"Os filisteus vêm sobre ti\" (Jz 16:9,12). Homens que se especializam em esperar o descuido: é assim que o pecado arma o seu bote (Gn 4:7).",
    },
    mulherComum: {
      title: "A prostituta de Gaza e as mulheres na casa de Dagom",
      subtitle: "Juízes 16 • o primeiro passo e o último salão",
      text: "A cena começa com a mulher prostituta de Gaza a quem o juiz de Israel entra (Jz 16:1) e termina com a casa \"cheia de homens e mulheres\" no templo de Dagom, celebrando a queda dele (Jz 16:27). Entre uma e outra está Dalila, do vale de Soreque. O capítulo mostra em que ordem se perde um nazireu: primeiro o segredo do coração, depois os cabelos, depois os olhos — e ele nem percebe que \"já o SENHOR se tinha retirado dele\" (Jz 16:20).",
    },
  },

  // ------------------------------------------------------------------ Jz 17
  17: {
    homem: {
      title: "O ourives que fundiu a imagem",
      subtitle: "Juízes 17 • duzentas moedas de prata viradas em deus",
      text: "É o artífice anônimo a quem foram entregues duzentas das mil e cem moedas de prata para fazer \"uma imagem de escultura e uma de fundição\", que ficaram na casa de Mica, na montanha de Efraim (Jz 17:4). Trabalhou por encomenda, com prata \"dedicada ao SENHOR\" — e produziu exatamente o que o segundo mandamento proíbe (Êx 20:4). É o retrato da religião fabricada: sincera na intenção, idólatra no resultado (Is 44:9-17).",
    },
    servo: {
      title: "O moço levita de Belém de Judá",
      subtitle: "Juízes 17 • dez moedas de prata, vestuário e sustento por ano",
      text: "É o levita peregrino que chega à casa de Mica procurando \"onde quer que achasse conveniente\" e aceita a proposta: \"Fica comigo, e sê-me por pai e sacerdote\" (Jz 17:9-10). Consagrado por um particular, num santuário particular, com um éfode e terafins particulares, torna o sacerdócio um emprego. Levita fora do lugar que Deus lhe deu — e um dono convencido de que comprou a bênção: \"Agora sei que o SENHOR me fará bem; porquanto tenho um levita por sacerdote\" (Jz 17:13).",
    },
    mulherComum: {
      title: "A mãe de Mica",
      subtitle: "Juízes 17 • a que amaldiçoou o ladrão e abençoou o filho",
      text: "A Escritura não lhe dá o nome: são dela as mil e cem moedas de prata furtadas, por causa das quais lançou maldições; quando o filho confessa e restitui, ela responde \"Bendito do SENHOR seja meu filho\" (Jz 17:2). Então dedica o dinheiro ao SENHOR — para fazer com ele uma imagem de escultura e uma de fundição (Jz 17:3). Piedade sincera e desobediência aberta na mesma frase: é o resumo do capítulo, \"cada um fazia o que parecia bem aos seus olhos\" (Jz 17:6).",
    },
  },

  // ------------------------------------------------------------------ Jz 18
  18: {
    multidao: {
      title: "Os seiscentos danitas munidos de armas de guerra",
      subtitle: "Juízes 18 • a tribo que foi buscar herança à sua maneira",
      text: "São os filhos de Dã que, sem herança firme, partem de Zorá e Estaol com seiscentos homens armados, acampam em Quiriate-Jearim e sobem contra Laís (Jz 18:11-12). Ferem ao fio da espada \"um povo quieto e confiado\", queimam a cidade e a reedificam com o nome de Dã (Jz 18:27-29). Vão levando à frente os meninos, o gado e a bagagem — e também os deuses roubados: uma tribo inteira migra com a idolatria na bagagem.",
    },
    servo: {
      title: "O levita que trocou uma casa por uma tribo",
      subtitle: "Juízes 18 • \"É melhor ser sacerdote de uma tribo do que da casa de um só homem?\"",
      text: "É o mesmo moço levita contratado por Mica, agora convidado pelos danitas: \"Cala-te, põe a mão na boca, e vem conosco, e sê-nos por pai e sacerdote\" (Jz 18:19). \"Então alegrou-se o coração do sacerdote\", que toma o éfode, os terafins e a imagem e entra no meio do povo (Jz 18:20). O texto revela por fim o seu nome e a sua linhagem: Jônatas, filho de Gérson, neto de Moisés — o sacerdócio de um santo transformado em cargo vendido ao maior lance (Jz 18:30).",
    },
    homem: {
      title: "Os cinco espias de Zorá e Estaol",
      subtitle: "Juízes 18 • os que consultaram a Deus na casa de Mica",
      text: "São os cinco homens valorosos enviados a espiar a terra, que reconhecem a voz do moço levita e lhe pedem: \"Consulta a Deus, para que possamos saber se prosperará o caminho que seguimos\" (Jz 18:2-5). Recebem um cômodo \"Ide em paz\" e, na volta, são eles que apontam aos irmãos o éfode, os terafins e as imagens a tomar (Jz 18:14,17). Buscar oráculo num santuário ilegítimo e sair com o próprio deus debaixo do braço: religião a serviço do apetite.",
    },
    mulherComum: {
      title: "As mulheres e os meninos da migração de Dã",
      subtitle: "Juízes 18 • as famílias postas diante da coluna",
      text: "A Escritura não as nomeia, mas estão ali: são as famílias danitas que partem com a tribo, e cujos \"meninos, e o gado, e a bagagem puseram diante de si\" enquanto os seiscentos armados vinham atrás (Jz 18:21). Também são as mulheres de Laís, povo \"quieto e confiado\", que \"ninguém houve que os livrasse\" (Jz 18:27-28). Migração e massacre no mesmo dia — e a imagem de escultura fica erguida em Dã \"por todos os dias em que a casa de Deus esteve em Siló\" (Jz 18:31).",
    },
  },

  // ------------------------------------------------------------------ Jz 19
  19: {
    homem: {
      title: "O levita peregrino da montanha de Efraim",
      subtitle: "Juízes 19 • o marido que foi falar ao coração dela",
      text: "É o levita anônimo que peregrinava aos lados da montanha de Efraim e tomou para si uma concubina de Belém de Judá; quando ela o deixa, ele vai atrás \"para lhe falar conforme ao seu coração, e para tornar a trazê-la\" (Jz 19:1-3). Mas o mesmo homem, cercado em Gibeá, \"pegou da sua concubina, e lha tirou para fora\" (Jz 19:25), e depois a despedaça em doze partes para convocar Israel. A ternura do início e a crueldade do fim moram no mesmo homem: sem rei e sem temor de Deus, ninguém é confiável.",
    },
    servo: {
      title: "O moço do levita",
      subtitle: "Juízes 19 • o servo que quis parar em Jebus",
      text: "É o criado que acompanha o levita com o par de jumentos albardados e que, ao cair da tarde perto de Jebus, aconselha: \"Vamos agora, e retiremo-nos a esta cidade dos jebuseus, e passemos ali a noite\" (Jz 19:11). O senhor recusa a cidade estranha — \"iremos até Gibeá\" — e vai dormir entre os seus (Jz 19:12-14). A ironia é o coração do capítulo: a cidade de Israel se mostrou pior que a dos pagãos, como Sodoma (Jz 19:22; cf. Gn 19:5).",
    },
    mulherComum: {
      title: "A concubina de Belém de Judá",
      subtitle: "Juízes 19 • as mãos sobre o limiar",
      text: "A Escritura não lhe dá o nome. Deixada para fora pelo próprio senhor aos homens de Belial de Gibeá, é abusada a noite toda e, ao romper da manhã, cai à porta da casa \"com as mãos sobre o limiar\" (Jz 19:25-27). O velho de Efraim que os hospedara já oferecera a ela e à própria filha virgem para poupar o hóspede (Jz 19:24). O seu corpo, enviado por todos os termos de Israel, arranca do povo o veredito: \"Nunca tal se fez, nem se viu desde o dia em que os filhos de Israel subiram da terra do Egito\" (Jz 19:30).",
    },
  },

  // ------------------------------------------------------------------ Jz 20
  20: {
    multidao: {
      title: "A congregação ajuntada em Mispá como um só homem",
      subtitle: "Juízes 20 • quatrocentos mil, desde Dã até Berseba",
      text: "É todo o Israel, de Dã até Berseba e da terra de Gileade, reunido perante o SENHOR em Mispá para julgar a maldade de Gibeá (Jz 20:1-2). A unidade que nunca houve contra os cananeus aparece agora contra um irmão. Sobem três vezes, choram e jejuam diante da arca em Betel, perdem quarenta mil homens e só então prevalecem (Jz 20:26-28): o zelo tardio de um povo que só se une depois do horror.",
    },
    anciao: {
      title: "Os principais de todas as tribos de Israel",
      subtitle: "Juízes 20 • a congregação do povo de Deus, e Finéias diante da arca",
      text: "São os cabeças de todas as tribos que \"se apresentaram na congregação do povo de Deus\" para ouvir a causa e dar palavra e conselho (Jz 20:2,7). Diante deles fala o levita, e por eles o povo consulta o SENHOR em Betel, onde estava a arca da aliança e onde Finéias, filho de Eleazar, filho de Arão, ministrava naqueles dias (Jz 20:27-28). O sacerdócio legítimo ainda existia — mas foi preciso um crime abominável para que Israel se lembrasse de procurá-lo.",
    },
    servo: {
      title: "Os dez de cada cem escolhidos para o mantimento",
      subtitle: "Juízes 20 • a logística da guerra contra Gibeá",
      text: "São os homens tirados por conta de todas as tribos — \"dez homens de cada cem, e cem de cada mil, e mil de cada dez mil\" — para providenciar mantimento ao povo enquanto o exército subia contra Gibeá (Jz 20:10). Servem sem pelejar, e sem eles nenhum cerco se sustenta. Sinal de uma nação que sabia organizar-se admiravelmente para a guerra, e não soube organizar-se para guardar a aliança.",
    },
    homem: {
      title: "Os quatrocentos mil de Israel e os setecentos canhotos de Benjamim",
      subtitle: "Juízes 20 • os que tiravam a espada, de um lado e do outro",
      text: "De um lado, quatrocentos mil homens de guerra de Israel; do outro, vinte e seis mil benjamitas com os setecentos escolhidos de Gibeá, canhotos que \"atiravam com a funda uma pedra em um cabelo, e não erravam\" (Jz 20:15-17). Benjamim prefere defender os filhos de Belial a entregá-los (Jz 20:13) — e a tribo quase desaparece, com vinte e cinco mil caídos num só dia (Jz 20:46). Encobrir o pecado por lealdade de sangue custa mais caro do que enfrentá-lo.",
    },
    mulherComum: {
      title: "As mulheres de Gibeá e das cidades de Benjamim",
      subtitle: "Juízes 20 • a espada que não distinguiu ninguém",
      text: "A Escritura não as nomeia: são as benjamitas das cidades postas a fogo, quando os homens de Israel voltaram e feriram ao fio da espada \"desde os homens da cidade até aos animais, até a tudo quanto se achava\" (Jz 20:48). O crime contra uma mulher em Gibeá termina na destruição de todas as mulheres da tribo — e por isso o capítulo seguinte se abre com o desespero de achar esposas para os seiscentos que restaram (Jz 21:16). A vingança sem justiça sempre cobra de quem nada fez.",
    },
  },

  // ------------------------------------------------------------------ Jz 21
  21: {
    multidao: {
      title: "O povo pranteando em Betel",
      subtitle: "Juízes 21 • \"por que sucedeu isto, que hoje falte uma tribo em Israel?\"",
      text: "É Israel diante de Deus em Betel, do dia até à tarde, levantando a voz \"com grande pranto\" pela brecha aberta nas tribos (Jz 21:2-3). Edificam altar, oferecem holocaustos e ofertas pacíficas — e em seguida procuram um jeito de contornar o próprio juramento de Mispá (Jz 21:1,7). Choram o resultado sem desfazer a causa: religiosidade fervorosa a serviço de decisões que ninguém pediu ao SENHOR.",
    },
    anciao: {
      title: "Os anciãos da congregação",
      subtitle: "Juízes 21 • os que inventaram a saída das vinhas de Siló",
      text: "São os velhos que perguntam \"Que faremos acerca de mulheres para os que restaram, pois foram destruídas as mulheres de Benjamim?\" e resolvem o impasse mandando os benjamitas emboscarem-se nas vinhas para arrebatar as filhas de Siló na festa anual do SENHOR (Jz 21:16,19-21). Assim guardam a letra do juramento — nenhum pai deu a filha — e quebram toda a justiça. Sabedoria de anciãos sem consulta a Deus: é o último conselho do livro, e o pior.",
    },
    servo: {
      title: "Os doze mil valentes enviados a Jabes-Gileade",
      subtitle: "Juízes 21 • a ordem cumprida ao fio da espada",
      text: "São os homens mais valentes destacados pela assembleia para executar o grande juramento de Mispá contra os que não subiram: \"Ide, e ao fio da espada feri aos moradores de Jabes-Gileade, e às mulheres e aos meninos\" (Jz 21:10-11). Cumprem a ordem e voltam a Siló com quatrocentas moças virgens. Servos obedientes de uma assembleia que já não distingue voto humano de mandamento divino — e o remédio inventado por Israel é tão sangrento quanto a doença.",
    },
    homem: {
      title: "Os seiscentos benjamitas da penha de Rimom",
      subtitle: "Juízes 21 • os que restaram de uma tribo inteira",
      text: "São os únicos sobreviventes de Benjamim, refugiados quatro meses na penha de Rimom, a quem a assembleia por fim proclama a paz (Jz 20:47; 21:13). Recebem as moças poupadas de Jabes-Gileade e depois as filhas arrebatadas em Siló, voltam à sua herança e reedificam as cidades (Jz 21:14,23). Deus preserva um remanescente da tribo em que nasceriam Saul e o apóstolo Paulo (1Sm 9:1; Rm 11:1) — misericórdia que sobrevive até ao pior capítulo do povo.",
    },
    mulherComum: {
      title: "As quatrocentas virgens de Jabes-Gileade e as filhas de Siló",
      subtitle: "Juízes 21 • as arrebatadas das rodas que dançavam",
      text: "São as moças poupadas na destruição de Jabes-Gileade e trazidas ao arraial em Siló, e as filhas de Siló que dançavam em rodas na solenidade anual do SENHOR quando os benjamitas saíram das vinhas e \"arrebatou cada um sua mulher\" (Jz 21:12,21-23). A Escritura não lhes dá nome nem voz: são o preço pago por juramentos precipitados e por uma guerra que ninguém quis impedir a tempo. Sobre elas cai o veredito final do livro: \"Naqueles dias não havia rei em Israel; porém cada um fazia o que parecia reto aos seus olhos\" (Jz 21:25).",
    },
  },
};
