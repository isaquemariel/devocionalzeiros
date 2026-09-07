// Fichas ESPECÍFICAS por (capítulo → papel) de 1 REIS 1–6.
// Do rei coberto de roupas que não se aquece até a casa acabada no mês de Bul:
// os carros de Adonias e a mula de Davi, as três sepulturas que firmam o trono,
// o sonho de Gibeão e a espada que não corta o menino, a corte dos doze
// provedores, a leva do Líbano e o templo edificado sem ruído de ferro.
// Cada figurante anônimo é alguém REAL daquele capítulo.
import type { StageInfo } from "@/lib/rpgStageInfo";

export const CHAPTER_ACTORS_01_06: Record<number, Record<string, StageInfo>> = {
  // ----------------------------------------------------------------- 1Rs 1
  1: {
    cavaleiro: {
      title: "Os carros e os cavaleiros que Adonias preparou para si",
      subtitle: "1Rs 1:5 • a cavalaria de um filho que se coroou sozinho",
      text: "\"E preparou carros, e cavaleiros, e cinqüenta homens, que corressem adiante dele\" (1Rs 1:5): antes de qualquer unção, antes de qualquer palavra do SENHOR, Adonias monta a aparência de um rei. O gesto é copiado do irmão mais velho (2Sm 15:1) e acabou do mesmo jeito. É também exatamente o que a lei do rei proibia (Dt 17:16). No mesmo capítulo, o rei legítimo desce a Giom montado num animal emprestado do pai (1:33) — e a diferença entre a cavalaria alugada e a mula do pai é a diferença entre tomar o reino e recebê-lo."
    },
    homem: {
      title: "Os convidados de En-Rogel — e Jônatas, que lhes traz a notícia",
      subtitle: "1Rs 1 • os filhos do rei e os homens de Judá à mesa de Adonias; a guarda que desce a Giom",
      text: "São os convidados do banquete da conspiração (1Rs 1:9) — e a lista de quem NÃO foi chamado (Natã, Benaia, Salomão, v. 10) é a lista exata de quem o derrubaria antes do fim do dia. Enquanto comem, descem a Giom os quereteus e os peleteus, a guarda estrangeira fiel a Davi, e é essa tropa que faz a coroação verdadeira (v. 38,44). Ao estrondo das trombetas, Adonias recebe Jônatas com uma esperança que a cena desmente (v. 42). E então \"estremeceram e se levantaram todos os convidados\" (v. 49): um reino fundado em convite se desmancha diante de um fundado em juramento."
    },
    mulherComum: {
      title: "Abisague, a sunamita — e as mulheres da casa do rei",
      subtitle: "1Rs 1 • a moça buscada em todos os termos de Israel para aquecer Davi",
      text: "A busca começa por um conselho da criadagem (1Rs 1:2), e o reino inteiro é vasculhado por uma cura que a medicina da corte não sabia dar: \"E buscaram por todos os termos de Israel uma moça formosa, e acharam a Abisague, sunamita\" (v. 3). O texto guarda a sua dignidade com cuidado: \"porém o rei não a conheceu\" (v. 4). É ela quem está de pé na câmara quando o destino do trono se decide (v. 15), testemunha silenciosa do juramento. No capítulo seguinte, o pedido de tê-la por mulher custará a vida a Adonias: a herança do trono não se toma pela cama."
    },
    multidao: {
      title: "O povo que subiu de Giom com Salomão",
      subtitle: "1Rs 1:39-41 • a aclamação que fez a terra retinir",
      text: "É todo o povo de Jerusalém descendo à fonte de Giom e voltando atrás do rei ungido: \"e tocaram a trombeta, e todo o povo disse: Viva o rei Salomão!\" (1Rs 1:39). A alegria é física e barulhenta — \"com o seu clamor a terra retiniu\" (v. 40) —, e o estrondo é a primeira coisa que a festa rival ouve, a poucos passos dali (v. 41). O povo não foi convidado por Adonias, mas é ele que dá ao reino de Salomão o que nenhuma cavalaria dá: o consentimento público de Israel. Duas festas acontecem naquela manhã; sobrevive a que Deus mandou fazer."
    },
    rebanho: {
      title: "O gado do sacrifício junto à pedra de Zoelete",
      subtitle: "1Rs 1:9,25 • as reses que Adonias matou em En-Rogel para se fazer rei",
      text: "\"E matou Adonias ovelhas, e vacas, e animais cevados, junto à pedra de Zoelete\" (1Rs 1:9): a rebelião se disfarça de culto, e o banquete de posse começa com sacrifício. Natã descreve a cena ao rei como quem descreve uma coroação já feita (v. 25). É religião a serviço da própria ambição: há altar, há vítimas e há aclamação, mas não há palavra do SENHOR nem profeta convidado. A poucos metros dali, no mesmo vale, Salomão é ungido sem uma única rês — só com o chifre de azeite do tabernáculo (v. 39) —, e é essa unção que fica de pé."
    },
    rei: {
      title: "A casa real em cena: Davi no leito, Salomão no trono, os filhos do rei em fuga",
      subtitle: "1Rs 1 • o rei que esfria, o rei que é ungido e os príncipes que se levantam da mesa",
      text: "O livro dos Reis abre com o corpo do maior rei de Israel falhando: \"cobriam-no de roupas, porém não se aquecia\" (1Rs 1:1) — o homem que matou Golias já não aquece a si mesmo, e um reino sem sucessor declarado está à beira da guerra civil. Do leito, porém, sai a única palavra que decide a história, e é um juramento (v. 29). Ao fim do dia a cena já é outra: \"E também Salomão está assentado no trono do reino\" (v. 46). Os outros da casa real são os filhos convidados a En-Rogel: sentam-se à mesa como príncipes e saem dela como fugitivos (v. 49)."
    },
    servo: {
      title: "Os servos da câmara de Davi, os corredores de Adonias e a guarda dos quereteus e peleteus",
      subtitle: "1Rs 1 • quem cuida do rei velho, quem corre adiante do usurpador e quem desce a Giom",
      text: "São primeiro os servos da alcova, os que veem o rei de perto e falam (1Rs 1:2), e depois os que percorrem o país à procura da moça (v. 3). Do outro lado estão os cinquenta que Adonias pôs a correr adiante do seu carro (v. 5), pompa comprada que não segura um trono uma tarde. No palácio, é o porteiro que anuncia a entrada decisiva — \"Eis aí está o profeta Natã\" (v. 23) —, e são os quereteus e os peleteus que descem a Giom (v. 38). No fim, os mesmos criados voltam à cama do velho para o abençoar (v. 47), e o rei, sem forças para se levantar, inclina-se no leito."
    }
  },

  // ----------------------------------------------------------------- 1Rs 2
  2: {
    homem: {
      title: "Os homens das contas velhas de Davi: Joabe, Simei, Adonias — e Benaia, a mão do rei",
      subtitle: "1Rs 2 • o testamento do pai e as quatro sentenças que firmam o reino",
      text: "O capítulo começa com uma ordem de homem a homem — \"esforça-te, pois, e sê homem\" (2:2) — e com a lei antes das contas: andar nos caminhos do SENHOR \"como está escrito na lei de Moisés\" (v. 3). Só depois vêm os encargos: Joabe, que \"em paz derramou o sangue de guerra\" (v. 5), e Simei (v. 9). Joabe foge ao tabernáculo e se apega às pontas do altar, mas o altar não abriga homicida (Êx 21:14). Benaia é a mão que executa, e a razão declarada não é vingança (v. 32). O capítulo fecha com a linha que explica todas as sepulturas: \"assim foi confirmado o reino na mão de Salomão\" (v. 46)."
    },
    rei: {
      title: "Davi que morre, Salomão que se assenta — e Aquis, rei de Gate",
      subtitle: "1Rs 2 • a passagem do trono, e o rei filisteu que atrai Simei à sua morte",
      text: "\"E Davi dormiu com seus pais, e foi sepultado na cidade de Davi\" (1Rs 2:10), fechando quarenta anos de reinado. A sucessão é dita em uma linha seca e teologicamente enorme: \"E Salomão se assentou no trono de Davi, seu pai, e o seu reino se fortificou sobremaneira\" (v. 12) — cumpre-se a promessa de 2Sm 7:12-13, e o trono passa sem golpe. O terceiro rei da cena está fora de Israel: Aquis, de Gate, não faz nada contra Salomão e ainda assim é o anzol — por dois escravos, Simei atravessa o Cedrom que jurara não passar (v. 39-46)."
    },
    servo: {
      title: "O coveiro do deserto, os dois servos fugidos de Simei e os mensageiros do rei",
      subtitle: "1Rs 2 • quem sepulta Joabe, quem foge para Gate e quem conta tudo a Salomão",
      text: "O primeiro é o homem que cava no ermo: morto junto ao altar, Joabe \"foi sepultado em sua casa, no deserto\" (2:34) — o general que enterrou meio Israel acaba num túmulo particular fora da cidade. Depois vêm os dois escravos que fazem a história virar, fugidos para Gate (v. 39). Simei, que dissera \"assim fará o teu servo\" (v. 38), albarda o jumento por causa de dois homens e perde a vida. E há sempre, na corte, quem conte (v. 41). Servos anônimos movem o capítulo inteiro — cada um instrumento de um juramento que Deus não deixou cair."
    }
  },

  // ----------------------------------------------------------------- 1Rs 3
  3: {
    anciao: {
      title: "O oficiante do alto de Gibeão e os anciãos que ouviram o juízo",
      subtitle: "1Rs 3 • o culto legítimo no lugar errado, e as cabeças de Israel diante do trono",
      text: "Ele serve num tempo intermediário e sem casa: \"o povo sacrificava sobre os altos; porque até àqueles dias ainda não se havia edificado casa ao nome do Senhor\" (3:2). O próprio rei o faz — \"somente que nos altos sacrificava, e queimava incenso\" (v. 3) —, e aquele \"somente\" é a rachadura por onde entrará todo o sincretismo dos Reis. Em Gibeão, o alto maior, \"mil holocaustos sacrificou Salomão\" (v. 4), e é a esse culto generoso mas descentralizado que Deus responde com um sonho. No fim, os anciãos recebem o veredito, e o temor não é do carrasco: é do discernimento (v. 28)."
    },
    homem: {
      title: "Os pedreiros da muralha, os israelitas dos altos e o executor da espada",
      subtitle: "1Rs 3 • quem levanta Jerusalém, quem sacrifica nos altos e quem traz a espada ao tribunal",
      text: "No primeiro verso trabalham os construtores do reinado inteiro: a casa do rei, a casa do SENHOR e \"a muralha de Jerusalém em redor\" (3:1) — três obras que ocuparão os próximos capítulos. Nos altos estão os homens comuns, que sacrificam onde o pai e o avô sacrificaram, sem templo que os reúna (v. 2). E no pátio entra o homem mais perturbador do capítulo: \"Trazei-me uma espada\" (v. 24). O executor obedece sem saber que é peça de um teste — a lâmina existe para revelar corações, não para cortar o menino (v. 28)."
    },
    mulherComum: {
      title: "A filha de Faraó e as mulheres do pátio do juízo",
      subtitle: "1Rs 3 • a princesa egípcia trazida à cidade de Davi; as mulheres que veem duas rés diante do rei",
      text: "\"E Salomão se aparentou com Faraó, rei do Egito; e tomou a filha de Faraó, e a trouxe à cidade de Davi\" (3:1). O capítulo que celebra a sabedoria abre com um casamento político com o império de onde Israel saíra escravo — e a Escritura registra o detalhe sem elogiar. É a primeira pedra de um caminho longo, que o próprio livro cobrará (11:1-2). As outras mulheres da cena assistem ao julgamento das duas prostitutas, e o que veem é o reino inclinar-se para ouvir as duas pessoas mais desprezíveis da cidade: a justiça do rei mede-se por quem não tem advogado (Sl 72:1-4)."
    },
    multidao: {
      title: "Todo o Israel que ouviu o juízo e temeu o rei",
      subtitle: "1Rs 3:28 • o povo grande que não se pode contar, e a notícia que corre",
      text: "É o povo que Salomão descreveu a Deus em Gibeão: \"povo grande, que nem se pode contar, nem numerar, pela sua multidão\" (3:8) — e foi por causa deles, não de si mesmo, que pediu um coração entendido. No fim do capítulo esse povo aparece como o eco do pedido atendido: \"E todo o Israel ouviu o juízo que havia dado o rei, e temeu ao rei; porque viram que havia nele a sabedoria de Deus\" (v. 28). O temor não é medo de tirano: é o reconhecimento de que Deus governa por aquele trono. Uma sentença dada a duas mulheres sem nome fez mais pelo reino do que todas as execuções do capítulo 2."
    },
    rebanho: {
      title: "Os mil holocaustos do alto de Gibeão",
      subtitle: "1Rs 3:4,15 • as reses do maior sacrifício da juventude de Salomão",
      text: "\"E foi o rei a Gibeom para lá sacrificar, porque aquele era o alto maior; mil holocaustos sacrificou Salomão naquele altar\" (1Rs 3:4). O holocausto era a oferta inteiramente queimada, nada retido para o ofertante — mil delas dizem, em fumaça, quanto o jovem rei queria estar diante de Deus antes de pedir qualquer coisa. Foi ali que \"apareceu o Senhor a Salomão de noite em sonhos\" (v. 5). Ao acordar, ele muda de lugar e refaz o culto onde ele devia estar, perante a arca, \"e fez um banquete a todos os seus servos\" (v. 15): a oferta que sobe a Deus vira mesa partilhada com a criadagem."
    },
    rei: {
      title: "Salomão, o menino pequeno que pediu um coração entendido",
      subtitle: "1Rs 3 • o sonho de Gibeão e a espada que não cortou o menino",
      text: "Diante da oferta mais perigosa que Deus já fez a um homem — \"Pede o que queres que eu te dê\" (3:5) —, o rei responde confessando incapacidade: \"sou apenas um menino pequeno; não sei como sair, nem como entrar\" (v. 7). O pedido não é para si, é para o cargo (v. 9). Deus concede o que foi pedido e acrescenta o que não foi (v. 12-13), sob a condição que o livro inteiro vai testar: \"se andares nos meus caminhos\" (v. 14). A prova vem no mesmo capítulo, e é minúscula: duas prostitutas e um bebê. A sabedoria de Deus não se exibe em provérbios, mas em devolver um filho vivo à mãe certa."
    },
    servo: {
      title: "Os servos do incenso e do banquete — e os dois meninos aos pés do trono",
      subtitle: "1Rs 3 • quem serve o culto e a mesa do rei, e as duas crianças da causa",
      text: "São os que carregam a caravana do Egito, atiçam o incenso nos altos e cuidam dos mil holocaustos de Gibeão; e são os que servem a festa de Jerusalém quando o rei acorda do sonho (3:15) — a primeira coisa que a sabedoria recebida produz é uma mesa aberta à casa inteira. Mas os menores em cena são os dois recém-nascidos: um vivo e um morto, sem voz e sem defesa. Sobre um deles cai a ordem mais dura já dada num tribunal de Israel (v. 25). A espada nunca desce; a ordem existe só para fazer o amor falar, e o veredito devolve a criança a quem preferiu perdê-la a vê-la morta (v. 27)."
    }
  },

  // ----------------------------------------------------------------- 1Rs 4
  4: {
    anciao: {
      title: "Azarias, o sacerdote, com Zadoque e Abiatar — e os sábios do oriente e do Egito",
      subtitle: "1Rs 4 • as cabeças religiosas da corte, e os mestres que a sabedoria de Salomão ultrapassou",
      text: "À frente da lista dos príncipes vem o sacerdócio: \"Azarias, filho de Zadoque, sacerdote\" (4:2), e ainda se registram os dois nomes da geração anterior (v. 4), embora Abiatar já tivesse sido despachado para Anatote. Do outro lado do palco estão os anciãos de outra escola: \"E era a sabedoria de Salomão maior do que a sabedoria de todos os do oriente e do que toda a sabedoria dos egípcios\" (v. 30). Nomeiam-se até os concorrentes de casa, Etã e Hemã (v. 31), que ainda encabeçam salmos. O ponto não é que ele estudou mais: é que a sabedoria foi DADA (v. 29)."
    },
    cavaleiro: {
      title: "Os doze mil cavaleiros de Salomão",
      subtitle: "1Rs 4:26,28 • a cavalaria das quarenta mil estrebarias",
      text: "\"Tinha também Salomão quarenta mil estrebarias de cavalos para os seus carros, e doze mil cavaleiros\" (4:26): a paz do reinado é guardada por uma força montada que Israel nunca tivera. A logística entra na conta diária do reino — \"a cevada e a palha para os cavalos e para os ginetes\" (v. 28). Mas a Escritura registra o esplendor sem apagar o aviso: a lei do rei dizia que \"ele não multiplicará para si cavalos, nem fará voltar o povo ao Egito\" (Dt 17:16), e é justamente do Egito que Salomão os trará (10:28-29). Glória do reino e primeiro sinal de onde ele vai tropeçar."
    },
    homem: {
      title: "A corte de Salomão e os doze provedores, cada um o seu mês",
      subtitle: "1Rs 4 • secretários, cronista, mordomo, o homem do tributo e os oficiais das doze regiões",
      text: "É a primeira administração organizada da história de Israel: secretários, cronista, chefe do exército, sacerdotes, o \"amigo do rei\", o mordomo — e \"Adonirão, filho de Abda, sobre o tributo\" (4:6), o cargo que, no reinado seguinte, faria todo o Israel apedrejar Adorão (12:18). Debaixo deles, doze oficiais, \"e cada um tinha que abastecê-lo por um mês no ano\" (v. 7), \"coisa nenhuma deixavam faltar\" (v. 27). E o homem comum aparece na imagem que resume o reinado: \"cada um debaixo da sua videira, e debaixo da sua figueira, desde Dã até Berseba\" (v. 25; cf. Mq 4:4)."
    },
    mulherComum: {
      title: "Tafate e Basemate, filhas de Salomão — e as mulheres debaixo da sua figueira",
      subtitle: "1Rs 4 • as princesas dadas por mulher aos provedores, e as israelitas dos dias de paz",
      text: "Duas filhas do rei aparecem na lista administrativa como parte da engrenagem: Tafate, dada a Ben-Abinadabe no termo de Dor (4:11), e Basemate, dada a Aimaás em Naftali (v. 15). Casamento era política: as duas amarram as províncias mais distantes à casa do rei — e o preço dessa aliança é pago em mulheres. As outras são as israelitas comuns de um tempo raro, em que \"cada um debaixo da sua videira, e debaixo da sua figueira, desde Dã até Berseba\" habitava seguro (v. 25). Nenhuma fala no capítulo, e ainda assim é nelas que se vê se o reino é bom: a paz mede-se na porta de casa."
    },
    multidao: {
      title: "Judá e Israel, como a areia que está junto ao mar",
      subtitle: "1Rs 4:20,34 • o povo em festa, e as nações que vinham ouvir o rei",
      text: "\"Eram, pois, os de Judá e Israel muitos, como a areia que está junto ao mar em multidão, comendo, e bebendo, e alegrando-se\" (4:20). A frase é uma citação disfarçada: Deus jurara a Abraão multiplicar a sua descendência \"como a areia que está na praia do mar\" (Gn 22:17), e aqui o narrador diz que a promessa está cumprida diante dos olhos. O segundo ajuntamento vem de fora: \"vinham de todos os povos a ouvir a sabedoria de Salomão\" (v. 34) — o vislumbre daquilo para que Israel foi chamado (Gn 12:3). É o ponto mais alto do reino unido."
    },
    pastor: {
      title: "Os pastores que levam a provisão de um dia à mesa do rei",
      subtitle: "1Rs 4:22-23 • o gado que subia todos os dias para Jerusalém",
      text: "Este pastor não guarda o seu rebanho: entrega-o. A conta diária da casa real está escrita no capítulo — trinta coros de flor de farinha (4:22) e, de carne, \"Dez bois cevados, e vinte bois de pasto, e cem carneiros; afora os veados e as cabras montesas\" (v. 23). Cada dia, por um mês inteiro, um dos doze provedores tocava esse gado das suas aldeias até Jerusalém. O texto celebra a fartura, mas quem lê os Reis até o fim sabe de que curral aquela conta subia: um dia o norte dirá a Roboão \"alivia tu a dura servidão de teu pai\" (12:4)."
    },
    rebanho: {
      title: "Os bois cevados e os carneiros da mesa do rei — e os animais de que Salomão falou",
      subtitle: "1Rs 4:23,33 • a carne de cada dia, e a criação que o sábio soube ler",
      text: "São as reses da despensa de Jerusalém: \"Dez bois cevados, e vinte bois de pasto, e cem carneiros; afora os veados e as cabras montesas, e os corços, e aves cevadas\" (4:23) — a conta de um único dia, o retrato mais concreto da fartura do reino. Mas o rebanho em cena não é só comida: o mesmo capítulo mostra o rei como o primeiro naturalista de Israel, que \"falou dos animais e das aves, e dos répteis e dos peixes\" (v. 33). A sabedoria dada por Deus desce até o bicho e a erva da parede: o mundo criado é livro, e o sábio o lê."
    },
    rei: {
      title: "Os reis tributários do rio ao Egito, e os que vinham ouvir Salomão",
      subtitle: "1Rs 4:21,24,34 • o império de presentes e a corte que virou escola",
      text: "\"E dominava Salomão sobre todos os reinos desde o rio até à terra dos filisteus, e até ao termo do Egito; os quais traziam presentes\" (4:21) — reis vassalos do Eufrates à fronteira egípcia, exatamente a extensão prometida a Abraão (Gn 15:18). O domínio não é descrito por batalhas, e sim pelo fruto: \"tinha paz de todos os lados em redor dele\" (v. 24), coisa que Davi nunca pôde dizer. Há ainda os que vêm por curiosidade santa (v. 34) — o caminho que a rainha de Sabá fará. Jesus lembraria esta cena para dizer que ali estava só a sombra (Mt 12:42)."
    },
    servo: {
      title: "Os carregadores da despensa real, os servos da mesa e o escriba dos provérbios",
      subtitle: "1Rs 4 • quem carrega a farinha, a cevada e a palha, e quem escreve os três mil provérbios",
      text: "É a criadagem que faz o número da corte virar comida: cada dia trinta coros de flor de farinha e sessenta de farinha (4:22) passam pelas suas mãos, e o texto os credita — \"coisa nenhuma deixavam faltar\" (v. 27). Outros cuidam das estrebarias, \"cada um segundo o seu cargo\" (v. 28): o reino funciona porque gente sem nome cumpre a sua ordem de serviço. E há o servo mais improvável do capítulo, o que segura o cálamo: alguém teve de registrar que Salomão \"disse três mil provérbios, e foram os seus cânticos mil e cinco\" (v. 32). Deus se serve do escriba tanto quanto do rei."
    }
  },

  // ----------------------------------------------------------------- 1Rs 5
  5: {
    anciao: {
      title: "O escriba que registra o acordo com Hirão e as contas da obra",
      subtitle: "1Rs 5 • o velho oficial que lavra o tratado e conta a leva de gente",
      text: "Este ancião é a memória escrita do capítulo: por trás das cartas trocadas entre Salomão e Hirão está quem as lavra e guarda — \"e ambos fizeram acordo\" (5:12). É dele a lista de números que o texto preserva: trinta mil na leva, setenta mil carregadores, oitenta mil talhadores, e três mil e trezentos chefes \"os quais davam as ordens ao povo\" (v. 16). Anota também quem manda em quem (v. 14) e a razão de se contratar estrangeiro: \"entre nós ninguém há que saiba cortar a madeira como os sidônios\" (v. 6). A casa de Deus nasce de fé e de planilha; Deus não despreza a segunda."
    },
    homem: {
      title: "Os sidônios que cortam madeira, a leva de Israel e os que talham nas montanhas",
      subtitle: "1Rs 5:6,13-18 • trinta mil por turnos, setenta mil às cargas, oitenta mil na pedreira",
      text: "A obra começa reconhecendo uma perícia que Israel não tinha: \"entre nós ninguém há que saiba cortar a madeira como os sidônios\" (5:6). De Israel sai a leva, trinta mil homens em turnos — \"um mês estavam no Líbano, e dois meses cada um em sua casa\" (v. 14) —, e somam-se os que nunca aparecem nas gravuras do templo: \"setenta mil que levavam as cargas, e oitenta mil que talhavam pedras nas montanhas\" (v. 15). É bom lembrar de onde veio o suor quando, quatro capítulos adiante, o norte reclamar da \"dura servidão\" (12:4)."
    },
    rei: {
      title: "Hirão, rei de Tiro, e Salomão: dois reis e um acordo",
      subtitle: "1Rs 5 • o velho amigo de Davi que manda o cedro, e o filho que edifica a casa",
      text: "A iniciativa é do estrangeiro: \"E enviou Hirão, rei de Tiro, os seus servos a Salomão... porquanto Hirão sempre tinha amado a Davi\" (5:1) — uma amizade herdada abre a porta para a maior obra do reinado. Salomão explica por que o pai não construiu (v. 3) e por que ele pode: \"o Senhor meu Deus me tem dado descanso de todos os lados\" (v. 4). O templo é filho da paz, não da vitória. E a resposta do rei pagão é uma das mais belas do livro: \"Bendito seja hoje o Senhor, que deu a Davi um filho sábio sobre este tão grande povo\" (v. 7)."
    },
    servo: {
      title: "Os servos de Hirão, os jangadeiros de Tiro e os carregadores das cargas",
      subtitle: "1Rs 5 • quem desce o cedro do Líbano ao mar e quem carrega a pedra até Jerusalém",
      text: "Os primeiros são a tripulação de Tiro, e o plano deles está escrito: \"eu as farei conduzir em jangadas pelo mar até ao lugar que me designares, e ali as desamarrarei\" (5:9). Os de Israel trabalham junto com eles por acordo dos reis (v. 6), e a mão de obra estrangeira é paga em comida: \"vinte mil coros de trigo... e vinte coros de azeite batido\" (v. 11), ano após ano. Terra adentro estão os que a Escritura conta às dezenas de milhares: \"setenta mil que levavam as cargas\" (v. 15), homens cujo ofício é o ombro. Nenhum deles verá o oráculo de ouro."
    }
  },

  // ----------------------------------------------------------------- 1Rs 6
  6: {
    anciao: {
      title: "O escriba que anota as medidas e as datas da casa",
      subtitle: "1Rs 6 • o velho oficial que registra os côvados, o mês de Zive e o mês de Bul",
      text: "O capítulo é, do começo ao fim, um registro — e alguém o fez. É dele a data que ancora a história de Israel no calendário: \"no ano de quatrocentos e oitenta, depois de saírem os filhos de Israel do Egito... no mês de Zive\" (6:1). São dele as medidas (v. 2) e os detalhes que só um olho treinado anota, como as \"janelas de gelósias fixas\" (v. 4). E é dele o fecho: \"no mês de Bul... se acabou esta casa... e a edificou em sete anos\" (v. 38). A Bíblia não guarda só o que Deus disse; guarda também, com exatidão de escriba, o que os homens fizeram por causa do que Ele disse."
    },
    homem: {
      title: "Os obreiros da casa: cortadores de pedra, entalhadores de cedro e ourives do oráculo",
      subtitle: "1Rs 6:7 • os que edificaram sem que se ouvisse ferramenta de ferro na casa",
      text: "O verso que define esses homens é dos mais surpreendentes da Escritura: \"nem martelo, nem machado, nem nenhum outro instrumento de ferro se ouviu na casa quando a edificavam\" (6:7). Todo o barulho ficou na pedreira; no monte, as pedras encaixavam em silêncio — eco da lei do altar (Êx 20:25). Depois entram os entalhadores, e \"tudo era cedro, pedra nenhuma se via\" (v. 18), lavrado \"de querubins, e de palmas, e de flores abertas\" (v. 29): um jardim esculpido, o Éden de volta em madeira. Nenhum desses artesãos é nomeado — o nome que a casa leva é o do SENHOR."
    },
    multidao: {
      title: "O povo de Israel diante da casa acabada",
      subtitle: "1Rs 6:38 • a geração que viu o templo pronto no mês de Bul",
      text: "É o povo para quem a casa foi feita, reunido diante dela quando \"no mês de Bul, que é o mês oitavo, se acabou esta casa\" (6:38). São os primeiros a ver, em pedra e cedro e ouro, aquilo que os seus pais carregaram em cortinas pelo deserto. Mas a promessa que a obra recebe no meio do capítulo não é sobre o edifício, é sobre eles: \"E habitarei no meio dos filhos de Israel, e não desampararei o meu povo\" (v. 13) — e vem condicionada ao andar nos estatutos (v. 12). Séculos depois ouvirão que \"templo do Senhor, templo do Senhor\" não é escudo nenhum (Jr 7:4)."
    },
    rei: {
      title: "Salomão, o edificador da casa do SENHOR",
      subtitle: "1Rs 6 • o rei que levanta o templo e recebe uma palavra no meio da obra",
      text: "\"Assim edificou Salomão aquela casa, e a acabou\" (6:14): sete anos de obra resumidos numa linha, cumprindo o que Deus dissera a Davi — que o filho, e não ele, edificaria a casa (2Sm 7:13). No meio do canteiro Deus o interrompe com uma palavra que não fala de pedra alguma: \"se andares nos meus estatutos... confirmarei para contigo a minha palavra\" (v. 12). E o coração de tudo é o cômodo mais escondido: o oráculo, \"para pôr ali a arca da aliança do Senhor\" (v. 19). O rei mais rico do oriente constrói, no fundo do seu maior projeto, uma sala vazia de móveis e cheia de aliança."
    },
    servo: {
      title: "Os carregadores da carga na subida do templo",
      subtitle: "1Rs 6 • os que trazem as pedras preparadas e a madeira de cedro ao monte",
      text: "Não aparecem por nome em nenhum verso do capítulo, e sem eles não há capítulo: são os setenta mil \"que levavam as cargas\" (5:15), subindo pedra lavrada e prancha de cedro pela rampa do monte durante sete anos. O ofício deles é exigido pela regra mais estranha da obra: como nenhum instrumento de ferro se ouvia na casa (6:7), tudo tinha de chegar pronto — cada peça carregada até o lugar exato onde ia assentar, sem correção possível no destino. Nenhum deles entrará no oráculo de ouro; e a casa em que Deus prometeu habitar subiu sobre os ombros deles."
    }
  }
};
