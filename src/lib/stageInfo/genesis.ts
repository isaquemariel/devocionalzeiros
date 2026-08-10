// Fichas ESPECÍFICAS por (capítulo → papel) de genesis — quem é aquela figura
// (mesmo anônima na Bíblia) no contexto daquele capítulo, biblicamente e
// teologicamente. Vence a ficha genérica do papel. Preenchido pelo agente.
import type { StageInfo } from "@/lib/rpgStageInfo";
export const CHAPTER_ACTORS: Record<number, Record<string, StageInfo>> = {
  1: {
    rebanho: {
      title: "Os animais do sexto dia",
      subtitle: "Gênesis 1 • a criação dos viventes",
      text: "São o gado, os répteis e as feras que Deus fez brotar da terra no sexto dia, cada um \"conforme a sua espécie\" (Gn 1:24-25). Precedem o homem, que recebe domínio sobre eles (Gn 1:26,28). Fazem parte da criação que Deus viu como \"boa\", ordem e vida saídas da palavra do Criador.",
    },
  },
  2: {
    rebanho: {
      title: "Os animais que Adão nomeou",
      subtitle: "Gênesis 2 • o Éden e o domínio do homem",
      text: "São as bestas do campo e as aves que o Senhor Deus trouxe a Adão \"para ver como lhes chamaria\" (Gn 2:19). Ao nomeá-los, o homem exerce o domínio dado por Deus e mostra que entre eles \"não se achava adjutora que estivesse como diante dele\" (Gn 2:20). Servem de pano de fundo à criação da mulher, coroa do Éden.",
    },
  },
  4: {
    rebanho: {
      title: "As primícias do rebanho de Abel",
      subtitle: "Gênesis 4 • a primeira oferta aceita",
      text: "São \"os primogênitos das suas ovelhas, e da sua gordura\" que Abel trouxe ao Senhor (Gn 4:4). Deus atentou para essa oferta de sangue, e não para o fruto da terra de Caim. O cordeiro do justo Abel é a primeira sombra do sacrifício aceito, que aponta ao Cordeiro de Deus (Hb 11:4).",
    },
    mulherComum: {
      title: "A esposa de Caim",
      subtitle: "Gênesis 4 • a primeira família",
      text: "A Escritura não lhe dá o nome, mas foi uma filha de Adão e Eva, pois \"gerou filhos e filhas\" (Gn 5:4); com ela Caim concebeu Enoque na terra de Node (Gn 4:17). É mãe da linhagem do primeiro homicida, longe da face do Senhor. Sua vida mostra que, mesmo sob a maldição, a humanidade se multiplica.",
    },
    patriarca: {
      title: "Adão, pai da humanidade",
      subtitle: "Gênesis 4 • cabeça da primeira família",
      text: "É o primeiro homem, cabeça de toda a raça, que conheceu Eva e gerou Caim e Abel (Gn 4:1-2). Já expulso do Éden, vê o pecado passar de sua desobediência ao fratricídio do filho. Ao fim do capítulo, gera Sete, por quem \"se começou a invocar o nome do Senhor\" (Gn 4:26).",
    },
    homem: {
      title: "Caim, o lavrador",
      subtitle: "Gênesis 4 • o primeiro homicida",
      text: "Primogênito de Adão, \"foi lavrador da terra\" (Gn 4:2) e ofereceu do fruto do solo, oferta não aceita. Irado, matou seu irmão Abel no campo, e o sangue clamou da terra (Gn 4:8-10). Fugitivo e errante, recebeu ainda um sinal da misericórdia de Deus (Gn 4:15).",
    },
    pastor: {
      title: "Abel, o pastor de ovelhas",
      subtitle: "Gênesis 4 • o primeiro justo martirizado",
      text: "Segundo filho de Adão, \"foi pastor de ovelhas\" (Gn 4:2) e ofereceu as primícias do rebanho, aceitas por Deus pela fé (Hb 11:4). Morto pela mão de Caim, é o primeiro justo cujo sangue foi derramado, \"o sangue de Abel\" que fala melhor por Cristo (Hb 12:24).",
    },
  },
  5: {
    homem: {
      title: "Os homens da linhagem de Sete",
      subtitle: "Gênesis 5 • o livro das gerações de Adão",
      text: "São os pais que se sucedem de Adão até Noé — Sete, Enos, Cainã e os demais — cada um dos quais \"gerou filhos e filhas\" e depois \"morreu\" (Gn 5:6-8). O refrão fúnebre confirma a sentença: \"pois tu és pó, e em pó te tornarás\" (Gn 3:19). É a linha da promessa atravessando a morte rumo a Noé.",
    },
    mulherComum: {
      title: "As mães da linhagem antediluviana",
      subtitle: "Gênesis 5 • as gerações de Adão a Noé",
      text: "A Escritura não as nomeia, mas foram as esposas por quem cada patriarca \"gerou filhos e filhas\" (Gn 5:4,7,10). Delas veio a descendência que preservou a linha de Sete até Noé, através de quem \"se começou a invocar o nome do Senhor\" (Gn 4:26). Mães silenciosas de um mundo que caminhava para o dilúvio.",
    },
    patriarca: {
      title: "Os patriarcas de longa vida",
      subtitle: "Gênesis 5 • de Adão a Noé",
      text: "São os anciãos que viveram séculos antes do dilúvio, cabeças das gerações de Adão (Gn 5:1). Entre eles brilha Enoque, que \"andou com Deus, e não apareceu mais, porquanto Deus para si o tomou\" (Gn 5:24), sinal de esperança contra a morte. A linha desemboca em Noé, o consolador anunciado (Gn 5:29).",
    },
    pastor: {
      title: "Os pastores do mundo antigo",
      subtitle: "Gênesis 5 • a linhagem antediluviana",
      text: "A Escritura não os destaca por nome, mas entre os \"filhos e filhas\" da linha de Sete estavam os que apascentavam rebanhos, como Abel antes deles (Gn 4:2,20). Guardavam o gado no mundo anterior ao dilúvio, vivendo da terra que Deus, por Noé, prometia consolar (Gn 5:29).",
    },
    servo: {
      title: "Os servos das casas antediluvianas",
      subtitle: "Gênesis 5 • as gerações de longa vida",
      text: "A Escritura não os nomeia, mas as vastas famílias dos patriarcas que viviam quase mil anos reuniam grandes casas, servidas por muitos. Trabalhavam a terra ainda sob a maldição do Éden (Gn 3:17-19), no mundo que a corrupção logo faria perecer no dilúvio (Gn 6:5-7).",
    },
  },
  6: {
    homem: {
      title: "Noé, o justo que achou graça",
      subtitle: "Gênesis 6 • o anúncio do dilúvio",
      text: "Em meio à corrupção universal, \"Noé, porém, achou graça aos olhos do Senhor\" (Gn 6:8). Era \"homem justo e perfeito em suas gerações\" e \"andava com Deus\" (Gn 6:9). Obedeceu à ordem de construir a arca, \"conforme a tudo o que Deus lhe mandou\" (Gn 6:22), tornando-se salvador da sua casa e da criação.",
    },
    mulherComum: {
      title: "A mulher de Noé",
      subtitle: "Gênesis 6 • a família preservada na arca",
      text: "A Escritura não lhe dá o nome, mas é a esposa que Deus manda entrar na arca com Noé e os filhos: \"entrarás na arca, tu, e os teus filhos, e a tua mulher\" (Gn 6:18). É uma das oito almas por quem a humanidade seria repovoada, poupada da destruição que viria sobre \"toda a carne\" (Gn 6:12-13).",
    },
    multidao: {
      title: "A geração corrompida da terra",
      subtitle: "Gênesis 6 • a maldade antes do dilúvio",
      text: "É toda a humanidade daqueles dias, cuja maldade \"se multiplicara sobre a terra\" e cujo coração só maquinava o mal continuamente (Gn 6:5). \"Toda a carne havia corrompido o seu caminho\" (Gn 6:12), e por isso o Senhor arrependeu-se de ter feito o homem e decretou o dilúvio (Gn 6:6-7,17).",
    },
    pastor: {
      title: "Os pastores da geração perdida",
      subtitle: "Gênesis 6 • o mundo que o dilúvio levaria",
      text: "A Escritura não os nomeia, mas entre \"toda a carne\" que enchia a terra de violência (Gn 6:11-13) estavam os que apascentavam rebanhos, herdeiros de Jabal, \"pai dos que habitam em tendas e têm gado\" (Gn 4:20). Sua vida seguia como sempre, comendo e bebendo, até o dia em que Noé entrou na arca (Mt 24:38).",
    },
    servo: {
      title: "Os que ergueram a arca com Noé",
      subtitle: "Gênesis 6 • a obra da salvação",
      text: "São os filhos de Noé — Sem, Cão e Jafé (Gn 6:10) — e as mãos da sua casa que serviram na longa construção da arca de gofer (Gn 6:14-16). Trabalharam na obra que o mundo desprezava, e por essa fé obediente \"Noé preparou a arca para salvação da sua família\" (Hb 11:7).",
    },
    rebanho: {
      title: "Os animais poupados aos pares",
      subtitle: "Gênesis 6 • a semente viva da criação",
      text: "São os viventes que Deus manda entrar na arca, \"dois de cada espécie\", macho e fêmea, para os conservar em vida (Gn 6:19-20). Aves, animais e répteis são poupados da destruição para repovoar a terra depois do dilúvio. Neles Deus guarda a criação sob a aliança que faria com Noé (Gn 6:18).",
    },
  },
  7: {
    homem: {
      title: "Noé, que entrou na arca",
      subtitle: "Gênesis 7 • o dia do dilúvio",
      text: "É o pregador da justiça (2Pe 2:5) que, aos seiscentos anos, entrou na arca com sua casa \"por causa das águas do dilúvio\" (Gn 7:6-7). Fez tudo \"segundo tudo o que o Senhor lhe ordenara\" (Gn 7:5), e o próprio Senhor \"o fechou por fora\" (Gn 7:16). Sua obediência salvou oito almas do juízo das águas.",
    },
    pastor: {
      title: "Os que conduziram os animais à arca",
      subtitle: "Gênesis 7 • o ajuntar dos pares",
      text: "São Noé e seus filhos, que guiaram para dentro da arca os animais aos pares, \"como Deus lhe ordenara\" (Gn 7:9,16). Como pastores dos viventes poupados, reuniram limpos e imundos, aves e feras, para preservar a criação através do dilúvio (Gn 7:2-3,8).",
    },
    servo: {
      title: "Os filhos de Noé, servos da obra",
      subtitle: "Gênesis 7 • a casa que se salvou",
      text: "São Sem, Cão e Jafé, que com Noé entraram na arca no mesmo dia (Gn 7:13). Serviram na obediência que preparou a salvação da família, enquanto o mundo perecia. Por eles, depois do dilúvio, toda a terra tornaria a povoar-se (Gn 9:19).",
    },
    mulherComum: {
      title: "As mulheres da arca",
      subtitle: "Gênesis 7 • as oito almas salvas",
      text: "São a mulher de Noé e as três esposas de seus filhos, que \"entraram na arca\" no dia do dilúvio (Gn 7:7,13). Estão entre as oito almas salvas pelas águas (1Pe 3:20), guardadas para serem mães de toda a humanidade renovada depois do juízo.",
    },
    rebanho: {
      title: "Os pares que entraram na arca",
      subtitle: "Gênesis 7 • os viventes salvos das águas",
      text: "São os animais limpos e imundos que entraram na arca, \"macho e fêmea, como Deus ordenara a Noé\" (Gn 7:8-9). Dos limpos, sete pares; dos outros, um par (Gn 7:2). Assim Deus preservou a semente viva da criação enquanto \"morreu toda a carne\" sobre a terra (Gn 7:21).",
    },
  },
  8: {
    homem: {
      title: "Noé, que edificou o altar",
      subtitle: "Gênesis 8 • as águas se abaixam",
      text: "É Noé que, ao repousar a arca sobre Ararate, soltou o corvo e a pomba para saber se as águas haviam minguado (Gn 8:6-12). Saído da arca por ordem de Deus, \"edificou um altar ao Senhor\" e ofereceu holocaustos de cheiro suave (Gn 8:20-21). O justo é o primeiro adorador da terra renovada.",
    },
    pastor: {
      title: "O que conduziu os viventes para fora",
      subtitle: "Gênesis 8 • a criação recomeça",
      text: "É Noé, que a mando de Deus fez sair da arca \"toda a besta, todo o réptil e toda a ave\" para que se multiplicassem sobre a terra (Gn 8:17-19). Como guardião dos viventes poupados, conduz a criação de volta ao mundo limpo pelas águas, para frutificar de novo.",
    },
    servo: {
      title: "Os filhos que saíram com Noé",
      subtitle: "Gênesis 8 • a casa que repovoaria a terra",
      text: "São Sem, Cão e Jafé, que saíram da arca com seu pai e suas mulheres (Gn 8:16,18). Serviram ao lado de Noé na travessia do dilúvio e agora recebem o mundo renovado, do qual seriam pais de todas as nações (Gn 9:19; 10:32).",
    },
    mulherComum: {
      title: "As mulheres que saíram da arca",
      subtitle: "Gênesis 8 • as mães do novo mundo",
      text: "São a mulher de Noé e as esposas de seus filhos, mandadas sair da arca para se multiplicarem sobre a terra (Gn 8:16,18). Depois do juízo das águas, tornam-se mães da humanidade renovada, sob a bênção que Deus repetiria: \"frutificai e multiplicai-vos\" (Gn 9:1).",
    },
    rebanho: {
      title: "Os animais soltos e ofertados",
      subtitle: "Gênesis 8 • os viventes da terra renovada",
      text: "São as feras, aves e répteis que saíram da arca \"por suas famílias\" para encher de novo a terra (Gn 8:19). Dos animais limpos, Noé tomou alguns e os ofereceu em holocausto, e o Senhor \"cheirou o suave cheiro\" e prometeu não mais amaldiçoar a terra (Gn 8:20-21).",
    },
  },
  9: {
    homem: {
      title: "Noé, novo pai da humanidade",
      subtitle: "Gênesis 9 • a aliança do arco-íris",
      text: "É Noé, a quem Deus abençoou e deu de novo a ordem: \"Frutificai e multiplicai-vos, e enchei a terra\" (Gn 9:1). Recebeu a aliança confirmada pelo arco nas nuvens (Gn 9:13). Depois, lavrando a terra, plantou uma vinha, embriagou-se, e sua nudez tornou-se ocasião da bênção e da maldição sobre os filhos (Gn 9:20-27).",
    },
    pastor: {
      title: "Os que repovoaram a terra com rebanhos",
      subtitle: "Gênesis 9 • a criação recomeçada",
      text: "São Noé e seus filhos, aos quais Deus entregou \"todo o animal que se move\" para deles se alimentarem (Gn 9:2-3). Como pastores da terra renovada, guardam o gado sob a aliança que Deus fez \"com toda a alma vivente\" (Gn 9:10), sinal de que a criação não mais pereceria pelas águas.",
    },
    servo: {
      title: "Canaã, servo dos servos",
      subtitle: "Gênesis 9 • a maldição de Cão",
      text: "É o filho de Cão sobre quem recaiu a palavra de Noé: \"Maldito seja Canaã; servo dos servos seja aos seus irmãos\" (Gn 9:25). A desonra de Cão à nudez do pai marca sua descendência com a servidão. Dele viriam os cananeus, cuja terra seria dada a Israel (Gn 9:26-27).",
    },
    mulherComum: {
      title: "As mães por quem a terra se povoou",
      subtitle: "Gênesis 9 • a humanidade renovada",
      text: "São as mulheres de Noé e de seus filhos, das quais \"se povoou toda a terra\" (Gn 9:19). Sob a bênção de frutificar e multiplicar (Gn 9:1,7), tornam-se mães de todas as famílias que encheriam o mundo depois do dilúvio, dentro da aliança perpétua de Deus.",
    },
    rebanho: {
      title: "Os animais sob a aliança",
      subtitle: "Gênesis 9 • entregues por alimento",
      text: "São os viventes que Deus entrega a Noé por alimento: \"tudo quanto se move... vos servirá de mantimento\" (Gn 9:3), com o temor do homem posto sobre eles (Gn 9:2). Ainda assim, Deus os inclui na aliança do arco, feita \"com toda a alma vivente que está convosco\" (Gn 9:10-12).",
    },
  },
  10: {
    patriarca: {
      title: "Os pais das nações",
      subtitle: "Gênesis 10 • a Tábua das Nações",
      text: "São Sem, Cão e Jafé, filhos de Noé, \"por estes foram repartidas as nações na terra depois do dilúvio\" (Gn 10:32). Cabeças das setenta famílias que se espalharam \"segundo as suas línguas, terras e nações\" (Gn 10:5,31), são os troncos de toda a humanidade — entre eles, a linha de Sem que levaria a Abraão.",
    },
    homem: {
      title: "Ninrode, o poderoso caçador",
      subtitle: "Gênesis 10 • o primeiro reino da terra",
      text: "Filho de Cuxe, \"começou a ser poderoso na terra\" e foi \"poderoso caçador diante do Senhor\" (Gn 10:8-9). O princípio do seu reino foi Babel, na terra de Sinar (Gn 10:10), de onde edificaria as grandes cidades. É a primeira figura de poder imperial, prenúncio das cidades que se erguem contra Deus.",
    },
    mulherComum: {
      title: "As mães das setenta nações",
      subtitle: "Gênesis 10 • a descendência de Noé",
      text: "A Escritura não as nomeia, mas foram as esposas dos filhos de Sem, Cão e Jafé, por quem nasceram as famílias \"das quais se repartiram as ilhas das nações\" (Gn 10:5). Delas veio a multidão dos povos espalhados pela terra, entre os quais Deus escolheria a linhagem da promessa.",
    },
  },
  11: {
    multidao: {
      title: "Os construtores de Babel",
      subtitle: "Gênesis 11 • a torre e a confusão das línguas",
      text: "É a humanidade de então, \"de uma só língua e de uma só fala\" (Gn 11:1), que na planície de Sinar disse: \"edifiquemos... uma torre cujo cume toque nos céus\" (Gn 11:4). Para não ser espalhada, quis fazer-se um nome; por isso o Senhor confundiu-lhe a língua e a dispersou sobre a face da terra (Gn 11:8-9).",
    },
    homem: {
      title: "Terá, pai de Abrão",
      subtitle: "Gênesis 11 • a saída de Ur",
      text: "É o descendente de Sem que \"tomou a Abrão seu filho\" e a Ló, e saiu de Ur dos caldeus \"para ir à terra de Canaã\" (Gn 11:31). Deteve-se em Harã, onde morreu (Gn 11:32). Sua jornada interrompida prepara o chamado de Abrão, começo da história da redenção.",
    },
    mulherComum: {
      title: "Sarai, a estéril",
      subtitle: "Gênesis 11 • a mulher de Abrão",
      text: "É a esposa de Abrão de quem se diz: \"Sarai era estéril, e não tinha filhos\" (Gn 11:30). Sua esterilidade abre o drama da promessa: dela, contra toda esperança, Deus faria nascer a semente prometida (Gn 21:1-2; Rm 4:19). Saiu de Ur com a casa de Terá rumo à terra da promessa.",
    },
  },
  12: {
    rebanho: {
      title: "Os rebanhos de Abrão no Egito",
      subtitle: "Gênesis 12 • a riqueza do peregrino",
      text: "São \"ovelhas, e vacas, e jumentos\" que Abrão ganhou no Egito por causa de Sarai (Gn 12:16). A crescente riqueza em gado marca o patriarca peregrino, a quem Deus prometera fazer \"uma grande nação\" (Gn 12:2). Esses rebanhos o acompanhariam de volta a Canaã, a terra da promessa.",
    },
    servo: {
      title: "Os servos da casa de Abrão",
      subtitle: "Gênesis 12 • a família em peregrinação",
      text: "São os \"servos e servas\" que Abrão adquiriu no Egito (Gn 12:16), parte da casa que carregava consigo em suas jornadas. Compõem o séquito do peregrino a quem Deus dissera: \"em ti serão benditas todas as famílias da terra\" (Gn 12:3), sinal da nação que dele havia de vir.",
    },
    multidao: {
      title: "O Egito de Faraó",
      subtitle: "Gênesis 12 • a descida por causa da fome",
      text: "É o povo e a corte do Egito para onde Abrão desceu fugindo da fome (Gn 12:10). Os príncipes gabaram Sarai diante de Faraó, que a tomou; então \"feriu o Senhor a Faraó e a sua casa com grandes pragas\" por causa dela (Gn 12:15,17). Deus guarda a mãe da promessa mesmo entre as nações.",
    },
  },
  14: {
    pastor: {
      title: "Os criados armados de Abrão",
      subtitle: "Gênesis 14 • o resgate de Ló",
      text: "São os \"trezentos e dezoito, nascidos em sua casa\" (Gn 14:14), a gente que guardava os rebanhos de Abrão e que ele armou para perseguir os reis do oriente. Pastores tornados soldados, feriram os inimigos até Hobá e trouxeram de volta Ló e todos os bens (Gn 14:15-16).",
    },
    mulherComum: {
      title: "As mulheres cativas de Sodoma",
      subtitle: "Gênesis 14 • o saque e o resgate",
      text: "São as mulheres levadas cativas quando os reis do oriente saquearam Sodoma e Gomorra (Gn 14:11-12). Abrão \"tornou a trazer... também as mulheres e o povo\" ao vencer os invasores (Gn 14:16). Entre elas estava a casa de Ló, resgatada pela mão do patriarca.",
    },
    rebanho: {
      title: "Os bens e o gado de Sodoma",
      subtitle: "Gênesis 14 • o despojo recuperado",
      text: "São \"todos os bens de Sodoma e de Gomorra\" tomados pelos reis vitoriosos (Gn 14:11), incluindo o gado das cidades da planície. Abrão os recuperou ao derrotar Quedorlaomer (Gn 14:16), recusando depois ficar com coisa alguma do rei de Sodoma, \"desde um fio até à correia de um sapato\" (Gn 14:23).",
    },
    rei: {
      title: "Os reis da guerra e Melquisedeque",
      subtitle: "Gênesis 14 • a batalha dos reis",
      text: "De um lado, os quatro reis do oriente e os cinco reis da planície que guerrearam no vale de Sidim (Gn 14:8-9). Do outro, Melquisedeque, \"rei de Salém\" e \"sacerdote do Deus Altíssimo\", que trouxe pão e vinho e abençoou Abrão (Gn 14:18-19). Rei de justiça e de paz, é figura de Cristo, sacerdote eterno (Hb 7:1-3).",
    },
  },
  17: {
    homem: {
      title: "Abraão, selado na aliança",
      subtitle: "Gênesis 17 • a circuncisão como sinal",
      text: "É Abrão, que Deus renomeia Abraão, \"pai de muitas nações\" (Gn 17:5), e a quem impõe o sinal da aliança na carne. Aos noventa e nove anos, \"foi circuncidado... no mesmo dia\" (Gn 17:24). Recebe a promessa de Isaque por Sara, filho da aliança eterna (Gn 17:19,21).",
    },
    servo: {
      title: "Os servos circuncidados da casa",
      subtitle: "Gênesis 17 • o sinal em toda a casa",
      text: "São \"todo o nascido na sua casa, e todo o comprado por dinheiro\" que Abraão circuncidou no mesmo dia da ordem de Deus (Gn 17:23,27). O sinal da aliança abrange toda a casa do patriarca, não só o sangue, prenunciando os que de longe seriam achegados ao povo da promessa.",
    },
    multidao: {
      title: "As nações prometidas a Abraão",
      subtitle: "Gênesis 17 • pai de muitas nações",
      text: "É a multidão que Deus promete fazer sair de Abraão: \"por pai de muitas nações te tenho posto\" (Gn 17:4-5), reis procederiam dele (Gn 17:6). Ainda não nascida, é a descendência inumerável da aliança eterna, que em Cristo abrange todos os que são da fé de Abraão (Gl 3:29).",
    },
  },
  18: {
    servo: {
      title: "O moço que serviu aos hóspedes",
      subtitle: "Gênesis 18 • os três visitantes em Manre",
      text: "É o criado a quem Abraão entregou o novilho para preparar a refeição dos três varões junto aos carvalhais de Manre (Gn 18:7). Serve à mesa daquela visitação onde o próprio Senhor anuncia o nascimento de Isaque (Gn 18:10) — a hospitalidade em que \"alguns... hospedaram anjos\" (Hb 13:2).",
    },
  },
  19: {
    homem: {
      title: "Ló, livrado de Sodoma",
      subtitle: "Gênesis 19 • a destruição das cidades",
      text: "É o sobrinho de Abraão, o \"justo\" cuja alma se afligia com a torpeza de Sodoma (2Pe 2:7-8). Recebeu os dois anjos em sua casa e, pela misericórdia do Senhor, foi arrancado da cidade antes do fogo (Gn 19:16). Sua libertação mostra que \"o Senhor sabe livrar da tentação os piedosos\" (2Pe 2:9).",
    },
    multidao: {
      title: "Os homens de Sodoma",
      subtitle: "Gênesis 19 • a cidade condenada",
      text: "São os homens da cidade, \"desde o mais moço até ao mais velho\", que cercaram a casa de Ló exigindo os hóspedes (Gn 19:4-5). Feridos de cegueira (Gn 19:11), pereceram sob o enxofre e o fogo que o Senhor fez chover (Gn 19:24-25), tornando-se exemplo do juízo sobre a impiedade (Jd 7).",
    },
    mulherComum: {
      title: "A mulher de Ló",
      subtitle: "Gênesis 19 • a estátua de sal",
      text: "É a esposa de Ló, que fugia de Sodoma com a família quando \"olhou para trás e ficou convertida numa estátua de sal\" (Gn 19:26). Seu coração preso à cidade condenada tornou-se advertência eterna: \"lembrai-vos da mulher de Ló\" (Lc 17:32), sobre o perigo de olhar para trás no dia do juízo.",
    },
  },
  20: {
    servo: {
      title: "Os servos de Abimeleque",
      subtitle: "Gênesis 20 • o temor na casa de Gerar",
      text: "São os servos a quem Abimeleque, levantando-se de madrugada, contou o sonho em que Deus o ameaçara de morte por causa de Sara (Gn 20:8). \"Temeram muito aqueles homens\", vendo que o Senhor guardava a mulher de Abraão. Sua casa fora ferida de esterilidade até que Abraão orasse (Gn 20:17-18).",
    },
    rebanho: {
      title: "As ovelhas e vacas dadas a Abraão",
      subtitle: "Gênesis 20 • a restituição de Abimeleque",
      text: "São \"ovelhas, e vacas\" que Abimeleque deu a Abraão ao restituir-lhe Sara (Gn 20:14). O gado acompanha o pedido de perdão do rei de Gerar, que reconheceu ter Deus por Abraão e não ousou tocar na mãe da promessa (Gn 20:6-7).",
    },
    multidao: {
      title: "A casa de Abimeleque",
      subtitle: "Gênesis 20 • os ventres fechados de Gerar",
      text: "É a casa inteira do rei de Gerar, cujas madres o Senhor \"havia fechado totalmente... por causa de Sara\" (Gn 20:18). Só quando Abraão, o profeta, orou por eles é que Deus sarou Abimeleque, sua mulher e suas servas (Gn 20:17). O povo de Gerar sente na carne a proteção divina sobre a aliança.",
    },
  },
  21: {
    multidao: {
      title: "A grande nação de Ismael",
      subtitle: "Gênesis 21 • o menino no deserto",
      text: "É o povo numeroso que Deus prometeu fazer do filho de Agar: \"dele farei uma grande nação\" (Gn 21:18), porque também ele era descendência de Abraão (Gn 21:13). Do menino chorando no deserto de Parã (Gn 21:20-21) viriam as tribos do deserto, ao lado — mas fora — da linha da promessa em Isaque.",
    },
    rei: {
      title: "Abimeleque, rei de Gerar",
      subtitle: "Gênesis 21 • a aliança em Berseba",
      text: "É o rei dos filisteus que, reconhecendo que \"Deus é contigo em tudo o que fazes\" (Gn 21:22), buscou fazer aliança com Abraão. Juraram ambos junto ao poço, e o lugar chamou-se Berseba, \"poço do juramento\" (Gn 21:31). O rei pagão confessa a bênção de Deus sobre o patriarca.",
    },
    rebanho: {
      title: "As sete cordeiras do juramento",
      subtitle: "Gênesis 21 • o testemunho do poço",
      text: "São as \"sete cordeiras do rebanho\" que Abraão pôs à parte e deu a Abimeleque \"para que me sejam em testemunho\" de que ele cavara o poço de Berseba (Gn 21:28-30). Junto com as ovelhas e vacas da aliança (Gn 21:27), selam o juramento entre o patriarca e o rei de Gerar.",
    },
  },
  24: {
    servo: {
      title: "Eliézer, o servo de Abraão",
      subtitle: "Gênesis 24 • a busca da noiva para Isaque",
      text: "É \"o servo mais velho da casa\", que a tudo governava (Gn 24:2) — a tradição o identifica com Eliézer de Damasco (Gn 15:2). Sob juramento, foi buscar em Padã-Arã uma esposa para Isaque, e o Senhor o guiou a Rebeca junto ao poço (Gn 24:14-27). O servo fiel que busca a noiva para o filho é belíssima figura do Espírito e da Igreja.",
    },
  },
  25: {
    mulherComum: {
      title: "Rebeca, mãe dos dois povos",
      subtitle: "Gênesis 25 • o oráculo no ventre",
      text: "É a esposa de Isaque, estéril, por quem ele \"orou insistentemente ao Senhor\", e ela concebeu (Gn 25:21). Sentindo os filhos lutarem no ventre, recebeu o oráculo: \"dois povos se dividirão das tuas entranhas... o maior servirá ao menor\" (Gn 25:23). Nela a eleição divina precede o nascimento (Rm 9:11-13).",
    },
    multidao: {
      title: "As duas nações no ventre de Rebeca",
      subtitle: "Gênesis 25 • Israel e Edom",
      text: "São os dois povos anunciados a Rebeca: \"duas nações há no teu ventre, e dois povos se dividirão\" (Gn 25:23). Esaú, pai de Edom, e Jacó, pai de Israel, começam sua contenda antes de nascer (Gn 25:24-26). A eleição do menor sobre o maior revela o propósito soberano de Deus (Rm 9:12).",
    },
    homem: {
      title: "Esaú, o homem do campo",
      subtitle: "Gênesis 25 • a primogenitura desprezada",
      text: "É o primogênito de Isaque, \"perito na caça, homem do campo\" (Gn 25:27). Voltando faminto, vendeu a primogenitura a Jacó por um guisado de lentilhas: \"comeu... e desprezou a sua primogenitura\" (Gn 25:34). É o tipo do profano, \"que por uma comida vendeu o seu direito\" (Hb 12:16).",
    },
    rebanho: {
      title: "A herança dos rebanhos de Abraão",
      subtitle: "Gênesis 25 • tudo dado a Isaque",
      text: "São os rebanhos e a riqueza que compunham tudo o que Abraão possuía e que ele \"deu... a Isaque\" (Gn 25:5), enquanto aos filhos das concubinas deu presentes e os apartou. O gado dos pais passa ao filho da promessa, guardando concentrada na linha de Isaque a bênção da aliança.",
    },
  },
  26: {
    homem: {
      title: "Isaque, engrandecido em Gerar",
      subtitle: "Gênesis 26 • a bênção herdada",
      text: "É o filho da promessa, a quem o Senhor apareceu confirmando a aliança de Abraão (Gn 26:3-4). Semeou naquela terra e \"colheu no mesmo ano cem medidas\", e \"engrandeceu-se o homem... até que se tornou mui poderoso\" (Gn 26:12-13). Sua prosperidade em terra estranha é fruto da fidelidade de Deus.",
    },
    rei: {
      title: "Abimeleque, rei de Gerar",
      subtitle: "Gênesis 26 • a aliança renovada",
      text: "É o rei dos filisteus que repreendeu Isaque por ter dito de Rebeca \"é minha irmã\" (Gn 26:9-11) e depois, vendo que \"o Senhor é contigo\", veio fazer aliança com ele em Berseba (Gn 26:28-31). Como no tempo de Abraão, o rei pagão reconhece a bênção de Deus sobre o patriarca.",
    },
    multidao: {
      title: "Os filisteus de Gerar",
      subtitle: "Gênesis 26 • a inveja e a contenda dos poços",
      text: "É o povo de Gerar que, invejoso da prosperidade de Isaque, entupiu os poços cavados no tempo de Abraão (Gn 26:14-15). Tão poderoso se fizera o patriarca que o próprio rei lhe disse: \"aparta-te de nós\" (Gn 26:16). A inveja dos filisteus cerca, mas não anula, a bênção sobre o herdeiro da promessa.",
    },
    servo: {
      title: "Os servos que cavaram os poços",
      subtitle: "Gênesis 26 • água no vale de Gerar",
      text: "São os servos de Isaque que tornaram a abrir os poços de Abraão e cavaram novos no vale, achando \"um poço de águas vivas\" (Gn 26:18-19). Suportaram as porfias dos pastores de Gerar por Eseque e Sitna, até Reobote, onde houve espaço (Gn 26:20-22). Cavam a bênção da terra prometida ao patriarca.",
    },
    rebanho: {
      title: "Os rebanhos de Isaque",
      subtitle: "Gênesis 26 • a possessão do patriarca",
      text: "São a \"possessão de ovelhas, e possessão de vacas, e muita gente de serviço\" que Isaque ajuntou em Gerar (Gn 26:14). O gado abundante é a medida visível da bênção com que Deus o engrandeceu, despertando a inveja dos filisteus sobre o herdeiro da promessa.",
    },
    pastor: {
      title: "Os pastores de Gerar",
      subtitle: "Gênesis 26 • a porfia sobre a água",
      text: "São os pastores de Gerar que porfiaram com os pastores de Isaque, dizendo \"esta água é nossa\" (Gn 26:20). Sua contenda pelos poços de Eseque e Sitna revela a hostilidade da terra ao peregrino, até que Isaque cava Reobote e diz: \"o Senhor nos alargou\" (Gn 26:22).",
    },
    mulherComum: {
      title: "Rebeca, chamada irmã",
      subtitle: "Gênesis 26 • a mulher guardada em Gerar",
      text: "É a esposa de Isaque, a quem ele, por medo, chamou \"minha irmã\" diante dos homens de Gerar (Gn 26:7). Descoberta a verdade por Abimeleque, o rei ordenou: \"qualquer que tocar neste homem ou em sua mulher, certamente morrerá\" (Gn 26:11). Deus guarda a mãe da descendência prometida.",
    },
  },
  27: {
    rebanho: {
      title: "Os dois cabritos do engano",
      subtitle: "Gênesis 27 • a bênção tomada por Jacó",
      text: "São \"dois bons cabritos das cabras\" que Rebeca mandou Jacó buscar do rebanho para preparar o guisado saboroso a Isaque (Gn 27:9). Com sua carne e suas peles, Jacó se fez passar por Esaú e recebeu a bênção do pai cego (Gn 27:16-27). O rebanho serve ao ardil por onde a promessa recaiu sobre o menor.",
    },
  },
  28: {
    mulherComum: {
      title: "As filhas de Labão, a noiva buscada",
      subtitle: "Gênesis 28 • a esposa da linhagem da aliança",
      text: "São as mulheres da casa de Labão, em Padã-Arã, a quem Isaque manda Jacó buscar esposa: \"não tomes mulher das filhas de Canaã... toma... das filhas de Labão\" (Gn 28:1-2). Contra o exemplo de Esaú, que tomou mulher de Canaã e depois uma filha de Ismael (Gn 28:8-9), Jacó deve casar dentro da linha da promessa.",
    },
  },
  29: {
    rebanho: {
      title: "Os rebanhos junto ao poço de Harã",
      subtitle: "Gênesis 29 • as ovelhas à espera de água",
      text: "São os \"três rebanhos de ovelhas\" deitados junto ao poço, à espera de que rolassem a grande pedra da boca para os abeberar (Gn 29:2-3). Entre eles vinham as ovelhas de Labão guiadas por Raquel (Gn 29:9). O poço de Harã é o cenário onde Jacó encontra a noiva prometida da sua linhagem.",
    },
    pastor: {
      title: "Os pastores de Harã",
      subtitle: "Gênesis 29 • o encontro no poço",
      text: "São os pastores reunidos junto ao poço, a quem Jacó, chegado a Harã, perguntou por Labão (Gn 29:4-8). Esperavam ajuntar-se todos os rebanhos para remover a pedra. Foi entre eles que Jacó viu Raquel chegar com as ovelhas e, movido, rolou sozinho a pedra do poço (Gn 29:10).",
    },
    mulherComum: {
      title: "Raquel, a pastora amada",
      subtitle: "Gênesis 29 • Jacó a serve por amor",
      text: "É a filha mais nova de Labão, que \"era pastora\" e veio com as ovelhas do pai ao poço (Gn 29:9). Jacó a amou e serviu sete anos por ela, \"que lhe pareceram como poucos dias, pelo muito que a amava\" (Gn 29:20). Enganado, recebeu antes Lia, a de olhos tenros, mãe dos primeiros filhos das tribos (Gn 29:23,31).",
    },
    patriarca: {
      title: "Labão, o anfitrião de Harã",
      subtitle: "Gênesis 29 • o tio de Jacó",
      text: "É o irmão de Rebeca, que abraçou Jacó dizendo \"certamente és meu osso e minha carne\" (Gn 29:13-14). Acordou dar-lhe Raquel por sete anos de serviço, mas na noite das bodas trocou-a por Lia (Gn 29:23-25). Astuto e interesseiro, seria por vinte anos o sogro com quem Jacó lutaria pela bênção.",
    },
  },
  30: {
    mulherComum: {
      title: "Raquel e Lia, as irmãs rivais",
      subtitle: "Gênesis 30 • as mães das tribos",
      text: "São as duas esposas de Jacó, cuja rivalidade encheu a casa de filhos. Raquel, estéril, clamou \"dá-me filhos, senão morro\" (Gn 30:1); Lia e as servas foram dando à luz. Delas e de suas servas nasceram os patriarcas das doze tribos de Israel, no meio de ciúmes que Deus soberanamente usou (Gn 30:22-24).",
    },
    patriarca: {
      title: "Jacó, pai das tribos",
      subtitle: "Gênesis 30 • a casa que cresce em Padã-Arã",
      text: "É o patriarca cuja casa se multiplica em filhos e rebanhos na terra de Labão. Serviu por Raquel e por Lia, e por artifício e bênção de Deus ajuntou grandes rebanhos: \"cresceu o homem em grande maneira\" (Gn 30:43). Nele se formam os cabeças das doze tribos e a riqueza que voltaria a Canaã.",
    },
    rebanho: {
      title: "Os rebanhos malhados e salpicados",
      subtitle: "Gênesis 30 • o salário de Jacó",
      text: "São as ovelhas e cabras malhadas, salpicadas e pretas que Jacó pôs por seu salário diante de Labão (Gn 30:32-33). Pela providência de Deus, os mais fortes do rebanho lhe nasciam marcados (Gn 30:41-42), e \"cresceu o homem em grande maneira\" (Gn 30:43). O gado testemunha que Deus abençoava o servo enganado.",
    },
    servo: {
      title: "Bila e Zilpa, as servas dadas por esposas",
      subtitle: "Gênesis 30 • filhos pelas mãos das servas",
      text: "São as servas de Raquel e de Lia, dadas por mulheres a Jacó para que dessem filhos em nome de suas senhoras (Gn 30:3-4,9). Bila gerou Dã e Naftali; Zilpa, Gade e Aser (Gn 30:6-13). Ainda que anônimas em condição, tornam-se mães de quatro das tribos de Israel.",
    },
  },
  31: {
    rebanho: {
      title: "Os rebanhos ganhos em Padã-Arã",
      subtitle: "Gênesis 31 • a partida secreta de Jacó",
      text: "São \"todo o seu gado... o gado da sua aquisição\" que Jacó ajuntou na casa de Labão e levou consigo ao fugir para Canaã (Gn 31:18). Fruto da bênção de Deus, apesar dos enganos de Labão, esses rebanhos são a riqueza com que o patriarca retorna à terra prometida (Gn 31:9).",
    },
    patriarca: {
      title: "Labão, que perseguiu Jacó",
      subtitle: "Gênesis 31 • a aliança de Mispá",
      text: "É o sogro que, sentindo-se roubado, perseguiu Jacó sete dias e o alcançou em Gileade (Gn 31:23), sendo antes advertido por Deus em sonho a não lhe falar mal (Gn 31:24). Depois de acusações mútuas, ergueram um montão de pedras e fizeram aliança em Mispá: \"atente o Senhor entre mim e ti\" (Gn 31:49).",
    },
  },
  33: {
    multidao: {
      title: "Os quatrocentos homens de Esaú",
      subtitle: "Gênesis 33 • o reencontro dos irmãos",
      text: "É o bando de \"quatrocentos homens\" que vinha com Esaú ao encontro de Jacó (Gn 33:1). O que parecia ameaça tornou-se abraço: \"Esaú correu-lhe ao encontro, e abraçou-o... e beijou-o\" (Gn 33:4). A multidão armada é testemunha da reconciliação que Deus operou entre os irmãos separados por vinte anos.",
    },
    patriarca: {
      title: "Jacó reconciliado com Esaú",
      subtitle: "Gênesis 33 • o altar El-Eloé-Israel",
      text: "É o patriarca que, tendo lutado com Deus em Peniel, inclina-se sete vezes diante de Esaú e o chama \"meu senhor\" (Gn 33:3,8). Vendo o rosto do irmão \"como se tivesse visto o rosto de Deus\" (Gn 33:10), passa em paz a Siquém e ali levanta um altar: \"Deus, o Deus de Israel\" (Gn 33:20).",
    },
  },
  34: {
    multidao: {
      title: "Os homens de Siquém",
      subtitle: "Gênesis 34 • a vingança por Diná",
      text: "É todo o povo da cidade de Hamor e Siquém que, persuadido a circuncidar-se para se aparentar com a casa de Jacó (Gn 34:24), foi surpreendido \"ao terceiro dia, quando estavam com a mais violenta dor\" por Simeão e Levi, que passaram os homens ao fio da espada (Gn 34:25). A cidade inteira paga a violação de Diná.",
    },
  },
  35: {
    rebanho: {
      title: "Os rebanhos de Israel a caminho de Betel",
      subtitle: "Gênesis 35 • a casa que sobe a adorar",
      text: "São os gados e a riqueza que acompanham Jacó quando Deus lhe diz \"levanta-te, sobe a Betel\" (Gn 35:1). Movendo toda a casa e seus rebanhos, o patriarca — agora Israel (Gn 35:10) — retorna ao lugar do voto para adorar. O gado peregrina com a família rumo ao altar da aliança.",
    },
  },
  36: {
    rebanho: {
      title: "O gado de Esaú, pai de Edom",
      subtitle: "Gênesis 36 • a separação das terras",
      text: "São os rebanhos e a fazenda de Esaú, tão numerosos que \"a terra das suas peregrinações não os podia sustentar por causa do seu gado\" (Gn 36:7). Por isso Esaú apartou-se de Jacó e habitou no monte Seir (Gn 36:6,8), tornando-se pai dos edomitas. A riqueza separa os irmãos em nações distintas.",
    },
  },
  37: {
    homem: {
      title: "José, o sonhador",
      subtitle: "Gênesis 37 • vendido pelos irmãos",
      text: "É o filho amado de Israel, aos dezessete anos, a quem o pai fez a túnica de várias cores (Gn 37:3). Seus sonhos de feixes e estrelas que se inclinavam acenderam a inveja dos irmãos (Gn 37:5-11). Lançado numa cova e vendido aos ismaelitas (Gn 37:28), começa o caminho por onde Deus preservaria muitas vidas (Gn 50:20).",
    },
    rebanho: {
      title: "O rebanho do pai em Dotã",
      subtitle: "Gênesis 37 • os irmãos ao longe",
      text: "É \"o rebanho de seu pai\" que os irmãos de José apascentavam junto de Siquém e depois em Dotã (Gn 37:12-17). Israel enviou José para ver \"como está o rebanho\", e foi assim que ele caiu nas mãos dos irmãos (Gn 37:14). O gado do patriarca é o pano de fundo da traição que abre a história de José.",
    },
    mulherComum: {
      title: "As filhas de Jacó, que o consolavam",
      subtitle: "Gênesis 37 • o luto do pai",
      text: "São \"todas as suas filhas\" que se levantaram com os filhos para consolar Jacó quando ele julgou José devorado por uma fera (Gn 37:35). Diante da túnica ensanguentada, o pai recusou consolo: \"descerei ao meu filho pranteando até à sepultura\" (Gn 37:35). As mulheres da casa cercam a dor que o engano dos irmãos causou.",
    },
    servo: {
      title: "José reduzido a escravo",
      subtitle: "Gênesis 37 • vendido ao Egito",
      text: "É o mesmo José, tirado da cova e vendido por vinte moedas de prata aos mercadores (Gn 37:28), que os midianitas \"venderam no Egito a Potifar, oficial de Faraó\" (Gn 37:36). O filho amado torna-se servo em terra estranha — descida humilhante por onde Deus o levaria ao trono, para salvação de muitos.",
    },
  },
  38: {
    homem: {
      title: "Judá, que desceu de entre os irmãos",
      subtitle: "Gênesis 38 • a linha do Messias",
      text: "É o filho de Jacó que se apartou dos irmãos e tomou mulher entre os cananeus (Gn 38:1-2). Negou a Tamar o levirato do filho Selá, mas foi por ela confrontado e confessou: \"mais justa é ela do que eu\" (Gn 38:26). Apesar da falha, é dele, por Perez, que viria Davi e o Cristo (Mt 1:3).",
    },
    mulherComum: {
      title: "Tamar, que garantiu a semente de Judá",
      subtitle: "Gênesis 38 • a viúva e o penhor",
      text: "É a nora de Judá, viúva de Er e Onã, a quem foi negado o cunhado Selá (Gn 38:11). Disfarçada de prostituta, tomou de Judá o selo, o cordão e o cajado por penhor, e dele concebeu (Gn 38:15-18). Declarada mais justa que o sogro (Gn 38:26), tornou-se mãe de Perez e ancestral de Cristo (Mt 1:3).",
    },
    rebanho: {
      title: "O cabrito e as ovelhas da tosquia",
      subtitle: "Gênesis 38 • o penhor prometido",
      text: "É o \"cabrito do rebanho\" que Judá prometeu enviar a Tamar, deixando o penhor até pagá-lo (Gn 38:17). Foi indo \"tosquiar as suas ovelhas\" a Timna que Judá se encontrou com ela no caminho (Gn 38:12-13). O rebanho serve de moldura ao episódio por onde se preservou a linha real de Judá.",
    },
  },
  39: {
    multidao: {
      title: "A casa de Potifar",
      subtitle: "Gênesis 39 • a falsa acusação",
      text: "São \"os homens da sua casa\", os servos do egípcio Potifar, a quem sua mulher chamou para acusar falsamente José depois que ele fugiu da sedução (Gn 39:11,14). Diante da casa reunida ela ergueu a mentira que levaria José ao cárcere (Gn 39:16-20) — mas \"o Senhor era com José\" mesmo ali (Gn 39:21).",
    },
  },
  40: {
    homem: {
      title: "José, intérprete de sonhos no cárcere",
      subtitle: "Gênesis 40 • o copeiro e o padeiro",
      text: "É José, preso na casa do cárcere, a quem foram entregues os dois oficiais de Faraó (Gn 40:4). Vendo-os perturbados, disse: \"não são de Deus as interpretações? contai-mo, peço-vos\" (Gn 40:8), e interpretou com exatidão os dois sonhos. Ainda esquecido pelo copeiro (Gn 40:23), aguarda a hora de Deus.",
    },
    multidao: {
      title: "Os cortesãos no banquete de Faraó",
      subtitle: "Gênesis 40 • o dia do aniversário",
      text: "São \"todos os seus servos\" a quem Faraó fez banquete no dia do seu nascimento (Gn 40:20), diante dos quais levantou a cabeça do copeiro-mor e do padeiro-mor. Perante a corte reunida cumpriu-se ao pé da letra a palavra que José interpretara: um restaurado, outro enforcado (Gn 40:21-22).",
    },
    servo: {
      title: "O copeiro e o padeiro de Faraó",
      subtitle: "Gênesis 40 • os dois oficiais presos",
      text: "São o copeiro-mor e o padeiro-mor, oficiais que ofenderam seu senhor e foram lançados na prisão onde José estava (Gn 40:1-3). Cada um teve seu sonho na mesma noite (Gn 40:5), e José os interpretou: ao copeiro, a restauração; ao padeiro, a morte (Gn 40:12-19). Instrumentos por onde José chegaria a Faraó.",
    },
  },
  41: {
    multidao: {
      title: "O Egito e as nações na fome",
      subtitle: "Gênesis 41 • os sete anos de fome",
      text: "É o povo do Egito e de todas as terras que, esgotados os anos de fartura, clamavam por pão: \"e havia fome em todas as terras\" (Gn 41:54). Faraó os mandava a José, que abriu os celeiros (Gn 41:55-56), e \"de todas as terras vinham ao Egito para comprar\" (Gn 41:57). A multidão faminta é preservada pela sabedoria dada por Deus a José.",
    },
  },
  42: {
    multidao: {
      title: "Os que desciam a comprar trigo",
      subtitle: "Gênesis 42 • a fome leva a família ao Egito",
      text: "É a multidão dos povos que descia ao Egito por causa da fome que havia \"na terra de Canaã\" e alhures (Gn 42:5), diante de José, \"o governador daquela terra\", que vendia a todo o povo (Gn 42:6). Entre eles vieram os dez irmãos de José, sem o reconhecer, cumprindo-se os sonhos da mocidade (Gn 42:6,9).",
    },
  },
  43: {
    multidao: {
      title: "A casa de José no Egito",
      subtitle: "Gênesis 43 • o banquete dos irmãos",
      text: "É a casa do governador, servida pelo mordomo a quem José mandou levar os irmãos e preparar o repasto (Gn 43:16-17,24). Ali lavaram os pés, aprontaram o presente e comeram diante de José, maravilhados por serem assentados por ordem de idade (Gn 43:33). A casa egípcia acolhe, sem saber, a reconciliação da família da promessa.",
    },
    homem: {
      title: "Judá, fiador de Benjamim",
      subtitle: "Gênesis 43 • a descida com o irmão menor",
      text: "É o filho de Jacó que persuadiu o pai a deixar descer Benjamim, dando-se por fiador: \"da minha mão o requererás\" (Gn 43:8-9). Sua palavra desata o segundo encontro com José. O mesmo Judá que vendera José agora se oferece pelo irmão mais novo, prenúncio da intercessão que faria no capítulo seguinte (Gn 44:33).",
    },
    pastor: {
      title: "Os irmãos, pastores de Canaã",
      subtitle: "Gênesis 43 • os que desceram por mantimento",
      text: "São os filhos de Jacó, \"homens de gado desde a mocidade\" (Gn 46:34), que a fome forçou a descer segunda vez ao Egito para comprar alimento (Gn 43:2,15). Pastores da terra prometida, prostram-se diante do irmão que não reconhecem, cumprindo os sonhos que outrora desprezaram (Gn 43:26).",
    },
  },
  44: {
    homem: {
      title: "Judá, que se oferece por escravo",
      subtitle: "Gênesis 44 • a intercessão pelo irmão",
      text: "É o filho de Jacó que, achado o copo no saco de Benjamim, se chega a José e suplica: \"fique teu servo em lugar do moço por escravo\" (Gn 44:33). Aquele que vendera José agora se dá a si mesmo pelo irmão amado do pai, para não ver a dor de Jacó (Gn 44:34) — figura viva do amor que substitui o culpado.",
    },
    pastor: {
      title: "Os irmãos, que rasgaram as vestes",
      subtitle: "Gênesis 44 • o copo achado",
      text: "São os filhos de Jacó, pastores de Canaã, que, quando o copo de prata foi achado no saco de Benjamim, \"rasgaram as suas vestes\" e voltaram à cidade em desespero (Gn 44:12-13). Prostrados por terra diante de José (Gn 44:14), provam agora a angústia da perda de um irmão que outrora causaram.",
    },
    multidao: {
      title: "A casa de José em perseguição",
      subtitle: "Gênesis 44 • o copo de prata",
      text: "É a casa do governador, a quem José ordenou encher os sacos e esconder o seu copo no de Benjamim (Gn 44:1-2). O mordomo e os homens da casa alcançaram os irmãos no caminho e os fizeram voltar (Gn 44:4-6,13). O aparato egípcio serve à última prova com que José sondou o coração dos irmãos.",
    },
  },
  45: {
    homem: {
      title: "José, que se dá a conhecer",
      subtitle: "Gênesis 45 • \"Eu sou José\"",
      text: "É o governador que, não podendo mais conter-se, chora em alta voz e revela: \"Eu sou José; vive ainda meu pai?\" (Gn 45:3). Longe de vingança, consola os irmãos: \"não fostes vós que me enviastes para cá, senão Deus\", para conservar-lhes a vida (Gn 45:8). Perdão e providência coroam a história do sonhador.",
    },
    pastor: {
      title: "Os irmãos, enviados a buscar o pai",
      subtitle: "Gênesis 45 • a subida a Canaã",
      text: "São os filhos de Jacó, pastores, a quem José, já reconciliado, envia de volta com o recado: \"subi a meu pai e dizei-lhe... desce a mim, não te demores\" (Gn 45:9). Carregados de bens do Egito (Gn 45:21-23), sobem a Canaã levando a nova que reanimou o espírito do velho Israel (Gn 45:27).",
    },
    multidao: {
      title: "A casa de Faraó, que se alegrou",
      subtitle: "Gênesis 45 • a notícia no Egito",
      text: "É a corte do Egito, onde \"esta notícia se ouviu na casa de Faraó: Os irmãos de José são vindos\", e a coisa pareceu boa aos olhos de Faraó e de seus servos (Gn 45:16). O próprio Faraó manda trazer o pai e as famílias, prometendo \"o melhor da terra do Egito\" (Gn 45:18-20). A nação hospeda a família da promessa.",
    },
    servo: {
      title: "Os servos que aprontaram os carros",
      subtitle: "Gênesis 45 • a provisão para a jornada",
      text: "São os que, por ordem de Faraó e de José, prepararam os carros e o mantimento para trazer Jacó e as famílias do Egito (Gn 45:19,21). Deram a cada irmão mudas de roupas e a Benjamim trezentas peças de prata (Gn 45:22). Servem à descida de Israel ao Egito, onde a semente se tornaria nação.",
    },
    rebanho: {
      title: "As jumentas carregadas do bem do Egito",
      subtitle: "Gênesis 45 • o presente enviado a Jacó",
      text: "São os \"dez jumentos carregados do melhor do Egito, e dez jumentas carregadas de trigo, pão e comida\" que José enviou ao pai para a viagem (Gn 45:23). As bestas de carga levam a Canaã a fartura do Egito, sinal visível de que o filho perdido vivia e reinava, e a família seria sustentada.",
    },
    mulherComum: {
      title: "As mulheres e os meninos das famílias",
      subtitle: "Gênesis 45 • os carros para descer",
      text: "São as esposas e crianças das casas dos irmãos, por quem Faraó mandou tomar carros do Egito: \"trazei vosso pai e as vossas famílias, e vinde a mim\" (Gn 45:18-19). Delas se formaria, em Gósen, a multidão de Israel. As mães da nascente nação são conduzidas à terra da provisão.",
    },
  },
  46: {
    homem: {
      title: "Jacó, que desce ao Egito",
      subtitle: "Gênesis 46 • a promessa na descida",
      text: "É Israel, o velho patriarca, que partiu com tudo o que tinha e ofereceu sacrifícios em Berseba (Gn 46:1). Ali Deus lhe falou: \"não temas descer ao Egito, porque eu te farei ali uma grande nação... e certamente te farei tornar a subir\" (Gn 46:3-4). Desce para reencontrar José e ver cumprir-se a palavra da aliança.",
    },
    multidao: {
      title: "As setenta almas da casa de Jacó",
      subtitle: "Gênesis 46 • a semente que seria nação",
      text: "São \"todas as almas da casa de Jacó, que vieram ao Egito, setenta\" (Gn 46:27). O rol dos filhos e netos que desceram (Gn 46:8-26) é a pequena semente de onde Deus faria \"uma grande nação\" (Gn 46:3), cumprindo a promessa feita a Abraão. Do punhado de peregrinos nasceria o povo de Israel.",
    },
    rebanho: {
      title: "O gado trazido de Canaã",
      subtitle: "Gênesis 46 • a fazenda dos peregrinos",
      text: "É \"o seu gado, e os seus bens que tinham adquirido na terra de Canaã\" que a casa de Jacó levou ao Egito (Gn 46:6). Por serem \"homens de gado\" e pastores de ovelhas (Gn 46:32), habitariam Gósen, apartados dos egípcios. Os rebanhos descem com a família rumo à terra onde se tornariam nação.",
    },
    mulherComum: {
      title: "As mulheres e filhas de Israel",
      subtitle: "Gênesis 46 • as mães que desceram ao Egito",
      text: "São as esposas dos filhos de Jacó e as filhas da casa, entre elas Diná, que desceram ao Egito (Gn 46:5,15,26). Levadas nos carros que Faraó enviara, são as mães por quem as setenta almas cresceriam até encher a terra (Êx 1:7). A descendência feminina da promessa segue rumo a Gósen.",
    },
    pastor: {
      title: "Os filhos de Jacó, pastores de ovelhas",
      subtitle: "Gênesis 46 • a preparação para Gósen",
      text: "São os irmãos de José, \"homens de gado\" e \"pastores de ovelhas\" desde a mocidade (Gn 46:32,34). José os instrui a confessar seu ofício a Faraó, para que habitassem à parte em Gósen, \"porque todo o pastor de ovelhas é abominação aos egípcios\" (Gn 46:34). O ofício humilde guarda o povo separado.",
    },
  },
  47: {
    homem: {
      title: "Jacó, que abençoou a Faraó",
      subtitle: "Gênesis 47 • o peregrino diante do rei",
      text: "É o velho Israel apresentado por José a Faraó, a quem \"Jacó abençoou\" ao entrar e ao sair (Gn 47:7,10). Confessou-se peregrino de \"cento e trinta anos\", poucos e maus (Gn 47:9). \"Sem contradição alguma o menor é abençoado pelo maior\" (Hb 7:7): o patriarca da promessa abençoa o senhor do Egito.",
    },
    multidao: {
      title: "Os egípcios vendidos a Faraó",
      subtitle: "Gênesis 47 • a fome e a servidão",
      text: "É o povo do Egito que, na fome extrema, deu a José primeiro o dinheiro, depois o gado, a terra e a si mesmo por pão: \"compra-nos a nós e à nossa terra\" (Gn 47:19). Assim toda a terra passou a Faraó, e o povo se fez servo, salvo com a semente que José lhes deu (Gn 47:20-25).",
    },
    rebanho: {
      title: "O gado trocado por pão",
      subtitle: "Gênesis 47 • o segundo ano de fome",
      text: "São os \"cavalos, ovelhas, vacas e jumentos\" que os egípcios entregaram a José em troca de pão quando se lhes acabou o dinheiro (Gn 47:16-17). Ao mesmo tempo, os rebanhos de Israel prosperavam em Gósen, onde \"tiveram nela possessões, e cresceram\" (Gn 47:27). O gado mede a diferença entre a fome do Egito e a bênção sobre a casa de Jacó.",
    },
  },
  48: {
    servo: {
      title: "O que avisou José da doença do pai",
      subtitle: "Gênesis 48 • a bênção de Efraim e Manassés",
      text: "É o mensageiro da casa que disse a José: \"eis que teu pai está enfermo\" (Gn 48:1), e depois anunciou a Jacó: \"eis que José teu filho vem a ti\" (Gn 48:2). Seu recado põe em marcha a cena em que Israel, cruzando as mãos, abençoa os filhos de José, dando a primazia ao menor, Efraim (Gn 48:14,19).",
    },
  },
  49: {
    homem: {
      title: "Jacó, que profetiza sobre os filhos",
      subtitle: "Gênesis 49 • a bênção e o cetro de Judá",
      text: "É o patriarca moribundo que reúne os filhos para anunciar \"o que vos há de acontecer nos dias vindouros\" (Gn 49:1). Sobre Judá pronuncia a grande promessa messiânica: \"o cetro não se arredará de Judá... até que venha Siló, e a ele obedecerão os povos\" (Gn 49:10). Acabando de falar, expira e é congregado ao seu povo (Gn 49:33).",
    },
    multidao: {
      title: "As doze tribos de Israel",
      subtitle: "Gênesis 49 • os filhos reunidos",
      text: "São os doze filhos de Jacó, ajuntados junto ao leito do pai: \"todas estas são as doze tribos de Israel\" (Gn 49:28). Cada um recebe a palavra que fixa o seu destino — Rúben instável, Judá o leão, José o ramo frutífero. Da assembleia dos irmãos nasce o retrato profético da nação da promessa.",
    },
    rebanho: {
      title: "O rebanho de Israel e o seu Pastor",
      subtitle: "Gênesis 49 • a Pedra de Israel",
      text: "Na bênção de José, Jacó aponta para além do gado das tribos ao verdadeiro Pastor: \"dali é o pastor, a pedra de Israel\", pelas mãos do Poderoso de Jacó (Gn 49:24). Os rebanhos das tribos — do jumentinho de Judá atado à vide (Gn 49:11) ao gado de Israel — repousam sob o cuidado do Deus que apascenta o seu povo.",
    },
  },
  50: {
    homem: {
      title: "José, que perdoou os irmãos",
      subtitle: "Gênesis 50 • \"Deus o intentou para bem\"",
      text: "É José que, morto o pai, tranquiliza os irmãos temerosos: \"vós, na verdade, intentastes o mal contra mim; porém Deus o intentou para bem... para conservar muita gente em vida\" (Gn 50:20). Enterra Jacó em Canaã e, ao morrer, faz jurar que levariam seus ossos: \"Deus certamente vos visitará\" (Gn 50:25).",
    },
    multidao: {
      title: "O grande cortejo do enterro de Jacó",
      subtitle: "Gênesis 50 • o luto na eira de Atade",
      text: "É a grande companhia que subiu a Canaã para sepultar Jacó: \"todos os servos de Faraó, os anciãos da sua casa, e todos os anciãos do Egito\", com carros e cavaleiros (Gn 50:7-9). Na eira de Atade fizeram \"um pranto grande e mui doloroso\" por sete dias, tanto que os cananeus chamaram o lugar Abel-Mizraim (Gn 50:10-11).",
    },
    servo: {
      title: "Os médicos que embalsamaram Israel",
      subtitle: "Gênesis 50 • os quarenta dias de embalsamamento",
      text: "São \"os servos, os médicos\" a quem José ordenou embalsamar seu pai, cumprindo-se nele quarenta dias, à maneira do Egito (Gn 50:2-3). Preparam o corpo do patriarca para a longa viagem até a cova de Macpela, em Canaã, onde repousaria com Abraão e Isaque (Gn 50:13).",
    },
    patriarca: {
      title: "Jacó, sepultado com os pais",
      subtitle: "Gênesis 50 • o repouso em Macpela",
      text: "É Israel, levado pelos filhos à terra de Canaã e sepultado \"na cova do campo de Macpela\", com Abraão, Sara, Isaque e Rebeca (Gn 50:13). O último dos patriarcas descansa na terra da promessa, e não no Egito, apontando para a herança que Deus jurara aos pais (Gn 50:24).",
    },
    rebanho: {
      title: "Os rebanhos deixados em Gósen",
      subtitle: "Gênesis 50 • a família sobe a sepultar Jacó",
      text: "São \"as suas ovelhas e as suas vacas\" que, com os meninos, ficaram na terra de Gósen enquanto a casa de José subia a Canaã para o enterro (Gn 50:8). O gado permanece na terra da provisão, penhor de que a família voltaria ao Egito, onde a semente de Israel aguardava a visitação de Deus (Gn 50:24-25).",
    },
  },
};
