// ============================================================================
// Fichas da CENA VIVA — quem é quem (e o que é o quê) na cena, com resumo
// bíblico e contexto histórico. Abre ao tocar em um personagem/objeto do palco.
//
// ARQUITETURA CONTEXTUAL POR LIVRO
// --------------------------------
// Muitos papéis e objetos são REUSADOS em livros diferentes (uma rocha, uma
// palmeira, um anjo, uma multidão aparecem tanto no Gênesis quanto no
// Apocalipse). Por isso as fichas-BASE (ACTOR_INFO / PROP_INFO) são escritas de
// forma AMPLA e biblicamente correta em qualquer contexto — nunca presas a um
// só livro. Quando um livro precisa de uma leitura própria (ex.: a rocha da
// ILHA DE PATMOS no Apocalipse, os sete castiçais = as sete igrejas), essa
// versão fica num MAPA DE SOBREPOSIÇÃO por livro (…_BY_BOOK). `actorInfo`/
// `propInfo` recebem o `bookId` e escolhem a sobreposição do livro, caindo na
// ficha-base quando não houver. Assim o Gênesis nunca mostra "Rochas de Patmos".
// ============================================================================

export interface StageInfo {
  title: string;
  subtitle: string;   // "Personagem bíblico" / "Objeto da cena" etc.
  text: string;       // resumo bíblico + histórico (2–4 frases, caprichado)
}

// Fichas ESPECÍFICAS por (livro → capítulo → papel): quem é aquela figura
// naquele capítulo, mesmo quando a Bíblia não a nomeia. Vence a ficha genérica
// do papel (ver actorInfo). Os dados vivem em src/lib/stageInfo/<livro>.ts.
import { ACTOR_INFO_BY_CHAPTER } from "@/lib/stageInfo";

// ============================================================================
// FICHAS-BASE DOS ATORES — leitura ampla, válida em qualquer livro.
// ============================================================================
export const ACTOR_INFO: Record<string, StageInfo> = {
  joao: {
    title: "João",
    subtitle: "Apóstolo e profeta • autor do Apocalipse",
    text: "Filho de Zebedeu, pescador da Galileia e um dos três mais próximos de Jesus (Mc 5:37). Já idoso, foi exilado na ilha de Patmos \"por causa da palavra de Deus\" (Ap 1:9) — a tradição situa o exílio por volta de 95 d.C., sob o imperador Domiciano. Ali, \"no Espírito, no dia do Senhor\", recebeu a visão que escreveu às sete igrejas da Ásia.",
  },
  cristo: {
    title: "O Filho do Homem",
    subtitle: "Jesus Cristo glorificado (Ap 1:13-16)",
    text: "Não mais o carpinteiro humilde, mas o Senhor ressurreto em glória: veste comprida e cinto de ouro (dignidade sacerdotal e real), cabelos brancos como lã (o Ancião de Dias, Dn 7:9), olhos como chama de fogo (nada escapa ao seu olhar), pés de bronze polido e voz como muitas águas. Na destra segura sete estrelas, e da boca sai a espada de dois gumes — a Palavra que julga (Hb 4:12).",
  },
  anjo: {
    title: "Anjo",
    subtitle: "Mensageiro de Deus",
    text: "\"Anjo\" (hebraico malʼak, grego ángelos) quer dizer mensageiro. São criaturas celestes que servem a Deus e levam a sua palavra aos homens: guardam o caminho do Éden (Gn 3:24), encontram Agar no deserto (Gn 16:7), hospedam-se com Abraão e arrancam Ló de Sodoma (Gn 18–19), sobem e descem pela escada de Jacó (Gn 28:12). \"Não são todos eles espíritos ministradores, enviados para servir a favor dos que hão de herdar a salvação?\" (Hb 1:14).",
  },
  anciao: {
    title: "Ancião",
    subtitle: "Um dos 24 anciãos (Ap 4:4)",
    text: "Ao redor do trono de Deus, João vê 24 anciãos vestidos de branco e com coroas de ouro — a plenitude do povo de Deus: 12 tribos de Israel + 12 apóstolos. Eles lançam suas coroas diante do trono e adoram: \"Digno és, Senhor, de receber glória, e honra, e poder\" (Ap 4:10-11).",
  },
  servivente: {
    title: "Ser vivente",
    subtitle: "Criatura celestial (Ap 4:6-8)",
    text: "Quatro seres cheios de olhos, com seis asas, semelhantes a leão, novilho, homem e águia — parentes dos querubins de Ezequiel 1 e dos serafins de Isaías 6. Dia e noite proclamam: \"Santo, Santo, Santo é o Senhor Deus, o Todo-Poderoso\". Representam toda a criação adorando ao Criador.",
  },
  cordeiro: {
    title: "O Cordeiro",
    subtitle: "Jesus, o Cordeiro de Deus (Ap 5:6)",
    text: "\"Vi um Cordeiro em pé, como que imolado\" — o símbolo central do Apocalipse: Jesus, sacrificado como o cordeiro pascal (Êx 12; Jo 1:29), mas vivo e vencedor. Só Ele é digno de abrir o livro selado. Aparece 28 vezes no livro; seu sangue liberta \"de toda tribo, língua, povo e nação\" (Ap 5:9).",
  },
  dragao: {
    title: "O grande dragão vermelho",
    subtitle: "Satanás (Ap 12:3,9)",
    text: "Com sete cabeças, dez chifres e sete diademas, o dragão é identificado pelo próprio texto: \"a antiga serpente, chamada Diabo e Satanás\" (Ap 12:9). Persegue a mulher e seu Filho, guerreia contra Miguel e é lançado do céu — furioso \"porque sabe que pouco tempo lhe resta\" (Ap 12:12).",
  },
  cavaleiro: {
    title: "Cavaleiro do Apocalipse",
    subtitle: "Os quatro cavaleiros (Ap 6:1-8)",
    text: "Quando o Cordeiro abre os quatro primeiros selos, quatro cavalos saem: branco (conquista), vermelho (guerra), preto (fome, com a balança) e amarelo (morte). Ecoam os juízos descritos em Zacarias 1 e 6 e resumem as dores da história humana até a volta de Cristo.",
  },
  multidao: {
    title: "A multidão",
    subtitle: "O povo reunido",
    text: "Desde a torre de Babel, onde a humanidade se ajuntou para \"fazer um nome\" (Gn 11:4), até as nações que seriam benditas em Abraão (Gn 12:3), a Bíblia acompanha as multidões — famílias, tribos e povos que enchem a terra. Deus nunca lida só com indivíduos: chama um povo, e promete que dele hão de vir \"todas as famílias da terra\" abençoadas.",
  },
  mulher: {
    title: "Mulher",
    subtitle: "Personagem da cena",
    text: "As mulheres estão no centro da história da aliança: de Eva, \"a mãe de todos os viventes\" (Gn 3:20), a Sara, Rebeca, Raquel e Lia, as matriarcas por quem passou a promessa. A Escritura as retrata com realismo — riso, fé, dor e coragem — e faz delas peça decisiva do plano de Deus, até que da descendência da mulher viesse quem feriria a cabeça da serpente (Gn 3:15).",
  },
  besta: {
    title: "A besta",
    subtitle: "Os impérios contra Deus (Ap 13)",
    text: "João vê duas bestas. A primeira sobe do mar, com sete cabeças e dez chifres, e recebe do dragão \"o seu poder, o seu trono e grande autoridade\" (Ap 13:2) — para os primeiros leitores, o retrato de Roma, que exigia adoração ao imperador. A segunda sobe da terra: parece cordeiro, mas fala como dragão — a propaganda religiosa que obriga todos a adorar a primeira e marca os que se dobram com o seu número, 666 (Ap 13:18). O livro já anuncia o fim da história: \"o Cordeiro os vencerá\" (Ap 17:14).",
  },
  hero: {
    title: "Você",
    subtitle: "Testemunha da cena",
    text: "Seu Devocionalzeiro caminha por dentro da história sagrada — não como espectador distante, mas como testemunha que vê, ouve e guarda a Palavra. \"Bem-aventurado aquele que lê, e os que ouvem as palavras\" (Ap 1:3); e \"todas estas coisas... estão escritas para aviso nosso\" (1Co 10:11). Você está dentro da cena para viver o que a Escritura conta.",
  },
  homem: {
    title: "Homem",
    subtitle: "Habitante da cena",
    text: "Uma das muitas figuras que povoam a cena — pastores, servos, viajantes e moradores por entre os quais a história de Deus acontece. Cada rosto anônimo lembra que a Escritura fala de gente real, em tendas e cidades reais: \"de um só sangue fez toda a geração dos homens, para habitar sobre toda a face da terra\" (At 17:26).",
  },
  mulherComum: {
    title: "Mulher",
    subtitle: "Habitante da cena",
    text: "Uma das mulheres que compõem a vida do povo na cena — junto aos poços, às tendas e aos mercados por onde a história caminha. A Bíblia não as deixa no anonimato do costume: mães, filhas e servas aparecem como parte viva da aliança, lembrando que a promessa de Deus alcança \"todas as famílias da terra\" (Gn 12:3).",
  },
  adao: {
    title: "Adão",
    subtitle: "O primeiro homem (Gn 2:7)",
    text: "\"Formou o Senhor Deus o homem do pó da terra e soprou em suas narinas o fôlego da vida\" — seu nome vem de adamah, \"terra\", em hebraico. Colocado no Éden \"para o lavrar e o guardar\" (Gn 2:15), deu nome aos animais e recebeu uma única proibição. Sua queda abriu a ferida que a Bíblia inteira conta como Deus veio curar: Paulo o chama de \"figura daquele que havia de vir\" — Cristo, o último Adão (Rm 5:14; 1Co 15:45).",
  },
  eva: {
    title: "Eva",
    subtitle: "Mãe de todos os viventes (Gn 2:22; 3:20)",
    text: "Formada da costela de Adão — não da cabeça nem dos pés, mas do lado, como companheira à altura (Gn 2:22-23). Enganada pela serpente, comeu do fruto e o deu ao marido; mas foi Adão quem lhe deu o nome de esperança: Eva, \"porque era a mãe de todos os viventes\" (Gn 3:20). Da sua descendência, prometeu Deus, viria quem feriria a cabeça da serpente (Gn 3:15) — o primeiro anúncio do evangelho.",
  },
  serpente: {
    title: "A serpente",
    subtitle: "\"Mais astuta que todos os animais\" (Gn 3:1)",
    text: "Entra em cena com uma pergunta venenosa: \"É assim que Deus disse?\" — semeando dúvida sobre a bondade de Deus antes de negar a sua palavra. O Apocalipse a identifica pelo nome: \"a antiga serpente, chamada Diabo e Satanás\" (Ap 12:9). Sobre ela caiu a primeira profecia messiânica da Bíblia: a semente da mulher lhe feriria a cabeça (Gn 3:15).",
  },
  rebanho: {
    title: "O rebanho",
    subtitle: "Os animais e a riqueza dos pastores (Gn 13:2)",
    text: "\"Abrão era muito rico em gado, em prata e em ouro\" — no mundo dos patriarcas, ovelhas, cabras e camelos eram conta bancária, alimento, roupa e sacrifício. Junto com as feras do campo e as aves, o gado foi criado por Deus no sexto dia e trazido a Adão para receber nome (Gn 1:24-25; 2:19-20). Rebanhos grandes exigiam poços e pastos — era ao redor deles que giravam alianças, dotes e bênçãos de pai para filho.",
  },
  noe: {
    title: "Noé",
    subtitle: "\"Varão justo e reto\" (Gn 6:9)",
    text: "Numa geração em que \"toda a imaginação dos pensamentos do coração era só má\" (Gn 6:5), Noé \"andava com Deus\". Recebeu ordens de construir uma arca de dimensões precisas e obedeceu \"conforme a tudo o que Deus lhe mandou\" (Gn 6:22) — Hebreus o chama de \"pregoeiro da justiça\" pela fé demonstrada em anos de trabalho antes de cair a primeira gota. Com ele, Deus firmou a primeira aliança da Bíblia, selada pelo arco-íris (Gn 9).",
  },
  abraao: {
    title: "Abraão",
    subtitle: "O pai da fé (Gn 12:1-3)",
    text: "\"Sai da tua terra... e farei de ti uma grande nação\" — Abrão deixou Ur dos caldeus, uma das cidades mais avançadas do mundo antigo (c. 2000 a.C.), por uma promessa sem mapa. Deus mudou seu nome para Abraão, \"pai de multidões\" (Gn 17:5), e prometeu que nele seriam benditas \"todas as famílias da terra\". \"Creu ele no Senhor, e foi-lhe imputado isto por justiça\" (Gn 15:6) — o versículo que Paulo usa para explicar o evangelho (Rm 4).",
  },
  sara: {
    title: "Sara",
    subtitle: "Princesa e mãe da promessa (Gn 17:15-16)",
    text: "Deus mudou seu nome de Sarai para Sara, \"princesa\": \"abençoá-la-ei, e ela será mãe de nações\" (Gn 17:16). Estéril até os 90 anos, riu-se escondida atrás da porta da tenda quando ouviu a promessa (Gn 18:12) — e depois deu ao filho o nome de Isaque, \"riso\": \"Deus me tem feito riso\" (Gn 21:6). Hebreus 11:11 a lista entre os heróis da fé: \"teve por fiel aquele que lho tinha prometido\".",
  },
  isaque: {
    title: "Isaque",
    subtitle: "O filho da promessa (Gn 21–26)",
    text: "Nasceu quando Abraão tinha 100 anos — o riso impossível que Deus prometeu e cumpriu (Gn 21:5-6). No monte Moriá, carregou a lenha do próprio sacrifício e ouviu do pai: \"Deus proverá para si o cordeiro\" (Gn 22:8) — cena que aponta séculos adiante, para outro Filho num monte. Homem de poços e de paz, reabriu as fontes que os filisteus haviam entulhado e recebeu a renovação da aliança (Gn 26).",
  },
  rebeca: {
    title: "Rebeca",
    subtitle: "A noiva junto ao poço (Gn 24)",
    text: "Quando o servo de Abraão orou junto ao poço de Harã por um sinal, Rebeca apareceu antes que ele acabasse de falar — e ofereceu água a ele e a todos os seus camelos (um camelo sedento bebe dezenas de litros: gentileza que custava trabalho). Consultada, respondeu com duas palavras: \"Irei\" (Gn 24:58). Tornou-se esposa de Isaque e mãe dos gêmeos Esaú e Jacó, sobre os quais ouviu de Deus: \"o maior servirá ao menor\" (Gn 25:23).",
  },
  jaco: {
    title: "Jacó",
    subtitle: "O que lutou com Deus — Israel (Gn 25–35)",
    text: "Nasceu segurando o calcanhar do gêmeo — daí o nome, ligado a \"suplantar\". Comprou a primogenitura por um guisado, tomou a bênção com engano e fugiu; mas em Betel viu a escada que ligava terra e céu (Gn 28:12) e, no vau de Jaboque, lutou a noite inteira até ouvir: \"Não te chamarás mais Jacó, mas Israel, pois lutaste com Deus e com os homens e prevaleceste\" (Gn 32:28). Seus doze filhos deram nome às doze tribos.",
  },
  esau: {
    title: "Esaú",
    subtitle: "O primogênito que vendeu o direito (Gn 25:25-34)",
    text: "\"Ruivo e todo como um vestido de pelo\" — caçador habilidoso, o favorito de Isaque. Voltando faminto do campo, trocou a primogenitura por um guisado de lentilhas: \"desprezou Esaú a sua primogenitura\" (Gn 25:34) — no mundo antigo, isso valia porção dobrada da herança e a liderança do clã. Décadas depois, porém, correu ao encontro de Jacó \"e o abraçou... e choraram\" (Gn 33:4). Foi pai dos edomitas.",
  },
  jose: {
    title: "José",
    subtitle: "Do poço ao palácio (Gn 37–50)",
    text: "O filho amado de Jacó, dono da túnica especial e dos sonhos com feixes e estrelas, foi vendido pelos irmãos por vinte moedas de prata (Gn 37:28). No Egito, passou de escravo a prisioneiro e de prisioneiro a governador — interpretando os sonhos de Faraó e salvando nações da fome. Sua frase resume a história: \"Vós bem intentastes mal contra mim, porém Deus o intentou para bem\" (Gn 50:20).",
  },
  farao: {
    title: "Faraó",
    subtitle: "O soberano do Egito dos patriarcas",
    text: "\"Faraó\" (do egípcio per-aá, \"casa grande\") era o título do rei do Egito — considerado pelos súditos um deus vivo, senhor do Nilo e dos celeiros. Foi um faraó quem sonhou com sete vacas gordas e sete magras e, sem sábio que o decifrasse, tirou José da prisão para o segundo trono do reino (Gn 41). Diante de outro faraó, séculos depois, Deus mostraria quem realmente governa a história (Êx 5–14).",
  },
  rei: {
    title: "Rei",
    subtitle: "Os reis do mundo dos patriarcas",
    text: "As terras de Canaã e da Mesopotâmia eram um mosaico de cidades-reino, cada uma com o seu rei. Gênesis narra a guerra de quatro reis contra cinco no vale de Sidim (Gn 14) e traz uma figura única: Melquisedeque, \"rei de Salém e sacerdote do Deus Altíssimo\", que trouxe pão e vinho e abençoou Abraão (Gn 14:18). Acima de todos os tronos da terra, a Bíblia anuncia o Rei que não teria fim (Sl 24:7-10).",
  },
  pastor: {
    title: "Pastor",
    subtitle: "O ofício dos patriarcas (Sl 23)",
    text: "Abraão, Isaque, Jacó, Moisés e Davi — todos pastorearam ovelhas antes (ou enquanto) pastoreavam gente. O pastor do mundo antigo vivia com o rebanho: guiava a pastos e águas, contava as ovelhas à noite e enfrentava leão e urso com cajado e funda (1Sm 17:34-36). Por isso a Bíblia ousa dizer \"O Senhor é o meu pastor\" (Sl 23:1) — e Jesus completa: \"Eu sou o bom Pastor; o bom Pastor dá a sua vida pelas ovelhas\" (Jo 10:11).",
  },
  servo: {
    title: "O servo",
    subtitle: "Eliézer e os servos das casas patriarcais (Gn 24)",
    text: "As grandes casas dos patriarcas se sustentavam com servos de confiança. \"O mais velho da casa, que tinha o governo sobre tudo o que possuía\" (Gn 24:2) — provavelmente Eliézer de Damasco (Gn 15:2) — foi enviado a Harã para buscar uma esposa para Isaque e fez a primeira oração por orientação registrada na Bíblia. Antes de acabar de falar, Rebeca chegou, e sua reação virou lema de fé: \"estando eu no caminho, o Senhor me guiou\" (Gn 24:27).",
  },
  patriarca: {
    title: "Patriarca",
    subtitle: "Os pais das gerações",
    text: "Patriarca significa \"pai que governa\" — na Bíblia, os chefes dos clãs de onde nasceu o povo de Deus: Abraão, Isaque e Jacó (e antes deles, os pais de Gn 5 e 11). Viviam em tendas, mediam riqueza em rebanhos e carregavam de geração em geração uma mesma promessa: terra, descendência e bênção para todas as famílias da terra (Gn 12:1-3). Hebreus 11 resume: morreram \"sem ter recebido as promessas, mas vendo-as de longe\".",
  },
  melquisedeque: {
    title: "Melquisedeque",
    subtitle: "Rei de Salém e sacerdote do Deus Altíssimo (Gn 14:18)",
    text: "\"E Melquisedeque, rei de Salém, trouxe pão e vinho; e era este sacerdote do Deus Altíssimo\" (Gn 14:18). Abençoou Abrão em nome do \"Possuidor dos céus e da terra\", e Abrão \"deu-lhe o dízimo de tudo\" (Gn 14:19-20). Rei e sacerdote ao mesmo tempo e sem genealogia registrada, tornou-se figura de Cristo: \"Tu és sacerdote eternamente, segundo a ordem de Melquisedeque\" (Hb 7:17).",
  },
  moises: {
    title: "Moisés",
    subtitle: "O libertador de Israel (Êx 2–3)",
    text: "Salvo das águas do Nilo e criado no palácio de Faraó, fugiu para Midiã e ali, aos oitenta anos, encontrou Deus na sarça ardente do monte Horebe (Êx 3). Enviado para tirar Israel do Egito, tornou-se o maior profeta do Antigo Testamento — \"a quem o Senhor conhecia face a face\" (Dt 34:10). Pela sua mão vieram as pragas, a passagem do mar e a Lei no Sinai; e ele apontou adiante: \"o Senhor teu Deus te levantará um profeta... a ele ouvireis\" (Dt 18:15).",
  },
  arao: {
    title: "Arão",
    subtitle: "Irmão de Moisés, o primeiro sumo sacerdote (Êx 4:14)",
    text: "Levita, irmão mais velho de Moisés, foi dado por Deus como sua \"boca\" diante do povo e de Faraó: \"ele falará por ti ao povo\" (Êx 4:16). Diante do rei, sua vara fez os sinais; no Sinai, cedeu ao clamor do povo e fez o bezerro de ouro (Êx 32). Ainda assim, foi consagrado o primeiro sumo sacerdote de Israel, com as vestes santas e o peitoral dos doze — o mediador que entrava por todos diante do Senhor (Êx 28).",
  },
};

// ============================================================================
// FICHAS POR PERSONAGEM (id) — quem É aquela figura na história, não apenas o
// papel genérico. Muitos personagens entram em cena com um papel visual comum
// (homem, mulherComum, pastor…) mas um `id` que revela quem são: Caim, Abel,
// Ló, Raquel, os doze filhos de Jacó. Aqui cada `id` ganha a sua própria ficha,
// biblicamente exata. Vence a ficha do papel quando o `id` bate (ver actorInfo).
// Extras anônimos (filhoA, moço1, exército-4…) não têm entrada e caem na ficha
// do papel — como deve ser: são a multidão sem nome por onde a história passa.
// ============================================================================
// Fichas COMPARTILHADAS por vários `id`s de uma mesma figura coletiva: a hoste
// de Midiã entra em cena como midianita1..4 (Jz 6-8), os carros de Sísera como
// carro-ferro1..3 (Jz 4). Um verbete só, referenciado por cada id da cena — para
// que nenhum deles caia na ficha do papel (que ali é sempre de israelitas).
const HOSTE_DE_MIDIA: StageInfo = {
  title: "A hoste de Midiã, Amaleque e os filhos do oriente",
  subtitle: "Juízes 6-8 • os que subiam como gafanhotos contra a seara",
  text: "São os saqueadores do oriente que por sete anos subiam contra Israel bem no tempo da colheita: \"acampavam-se contra eles, e destruíam os frutos da terra... e não deixavam mantimento algum em Israel, nem ovelhas, nem bois, nem jumentos\" (Jz 6:3-4). Vinham \"com os seus gados e as suas tendas, como gafanhotos, em grande multidão\", e os seus camelos eram sem conta (Jz 6:5). Contra esse mar de gente Deus não pôs exército, mas trezentos homens com buzinas, cântaros e tochas — \"e o Senhor tornou a espada de um contra o outro, e isto em todo o arraial\" (Jz 7:22). A multidão que parecia invencível debandou por dentro, para que Israel não pudesse dizer \"a minha mão me livrou\" (Jz 7:2).",
};
const CORTE_DE_HAZOR: StageInfo = {
  title: "A corte de Jabim, rei de Canaã, em Hazor",
  subtitle: "Juízes 4 • os oficiais do trono que oprimiu vinte anos",
  text: "São os homens do palácio do rei que reinava em Hazor — a cidade que fora \"a cabeça de todos estes reinos\" (Js 11:10) e que Israel não guardou destruída. Dali torna a pesar o jugo: \"o Senhor os vendeu na mão de Jabim, rei de Canaã, que reinava em Hazor; e Sísera era o capitão do seu exército\" (Jz 4:2), e por vinte anos \"oprimia violentamente os filhos de Israel\" (Jz 4:3). Confiavam no ferro dos seus carros e no trono do norte; mas do ribeiro de Quisom voltou a notícia de que \"nem um só ficou\" (Jz 4:16), e a mão de Israel foi endurecendo sobre Jabim \"até que exterminaram a Jabim\" (Jz 4:24).",
};
const CARROS_DE_FERRO: StageInfo = {
  title: "Os novecentos carros de ferro de Sísera",
  subtitle: "Juízes 4 • a hoste que desceu de Harosete ao ribeiro de Quisom",
  text: "São os homens de Harosete dos Gentios convocados assim que anunciaram a Sísera que Baraque subira ao monte Tabor: \"ajuntou Sísera todos os seus carros, novecentos carros de ferro, e todo o povo que estava com ele\" (Jz 4:12-13). O carro de ferro era exatamente o que fizera a conquista parar — \"não expulsou os moradores do vale, porquanto tinham carros de ferro\" (Jz 1:19; cf. Js 17:16). Mas foi o próprio Senhor quem os atraiu ao leito do Quisom (Jz 4:7): ali a torrente antiga os arrastou e \"os cascos dos cavalos se despedaçaram\" (Jz 5:21-22). A arma em que o inimigo confia é a armadilha na mão de Deus (Sl 20:7).",
};

export const CHAR_INFO: Record<string, StageInfo> = {
  // ---- Êxodo: a casa de Moisés e o Egito ----
  sifra: { title: "Sifrá", subtitle: "Parteira das hebréias (Êx 1:15)", text: "Uma das duas parteiras a quem o rei do Egito ordenou matar os meninos hebreus ao nascer. \"As parteiras, porém, temeram a Deus e não fizeram como o rei do Egito lhes dissera, antes conservavam os meninos com vida\" (Êx 1:17). Por isso \"Deus fez bem às parteiras... e estabeleceu-lhes casas\" (Êx 1:20-21) — a coragem de duas mulheres comuns furou o decreto do império mais poderoso da terra." },
  pua: { title: "Puá", subtitle: "Parteira das hebréias (Êx 1:15)", text: "A segunda das parteiras que, junto com Sifrá, desobedeceram a Faraó por temor a Deus, poupando os recém-nascidos (Êx 1:15-17). Diante do rei, responderam com astúcia: \"as mulheres hebréias não são como as egípcias... já têm dado à luz antes que a parteira venha a elas\" (Êx 1:19). Deus honrou o seu temor, e o povo continuou a se multiplicar." },
  joquebede: { title: "Joquebede", subtitle: "A mãe de Moisés (Êx 2:1-3; 6:20)", text: "Filha de Levi, casada com Anrão, escondeu o filho três meses e, não podendo mais, fê-lo uma arca de juncos e o pôs às margens do rio (Êx 2:2-3). A providência a trouxe de volta como ama do próprio filho, paga pela filha de Faraó (Êx 2:9). Hebreus 11:23 louva a fé dos pais: \"esconderam o menino três meses... e não temeram o mandamento do rei\"." },
  anrao: { title: "Anrão", subtitle: "O pai de Moisés, da casa de Levi (Êx 2:1; 6:20)", text: "\"Foi um homem da casa de Levi e casou com uma filha de Levi\" (Êx 2:1) — Anrão, marido de Joquebede e pai de Arão, Moisés e Miriã (Êx 6:20). Da tribo escolhida para o sacerdócio veio a família por quem Deus libertaria Israel, cumprindo a promessa feita a Abraão séculos antes." },
  miria: { title: "Miriã", subtitle: "A irmã de Moisés (Êx 2:4; 15:20)", text: "A menina que \"postou-se de longe, para saber o que lhe havia de acontecer\" ao irmão no rio (Êx 2:4), e teve a coragem de propor à filha de Faraó uma ama hebreia — a própria mãe (Êx 2:7-8). Profetisa, mais tarde conduziu as mulheres com tamboris no cântico do mar: \"Cantai ao Senhor, porque sumamente se exaltou\" (Êx 15:20-21)." },
  filhaFarao: { title: "A filha de Faraó", subtitle: "A princesa que salvou Moisés (Êx 2:5-10)", text: "Desceu a lavar-se no rio, viu a arca entre os juncos e, movida de compaixão pelo menino que chorava, resolveu criá-lo como filho: \"e chamou-lhe Moisés, e disse: Porque das águas o tenho tirado\" (Êx 2:10). Sem saber, a filha do rei que mandara matar os meninos criou, dentro do próprio palácio, o libertador de Israel." },
  zipora: { title: "Zípora", subtitle: "A esposa de Moisés, filha de Jetro (Êx 2:21)", text: "Uma das sete filhas do sacerdote de Midiã, dada a Moisés por mulher depois que ele defendeu o rebanho no poço (Êx 2:16-21). Foi mãe de Gérson e Eliézer. No caminho de volta ao Egito, num episódio grave e obscuro, tomou uma pedra aguda e circuncidou o filho, salvando a casa (Êx 4:24-26)." },
  jetro: { title: "Jetro (Reuel)", subtitle: "Sacerdote de Midiã, sogro de Moisés (Êx 2:18; 3:1)", text: "Chamado Reuel e Jetro, sacerdote de Midiã, acolheu o egípcio fugitivo que defendera suas filhas: \"Chamai-o para que coma pão\" (Êx 2:20). Deu-lhe Zípora e o rebanho que Moisés levou até Horebe. Mais tarde, reencontrando o genro no deserto, reconheceu: \"bendito seja o Senhor... agora sei que o Senhor é maior que todos os deuses\" (Êx 18:10-11), e lhe ensinou a repartir o governo do povo." },
  gerson: { title: "Gérson", subtitle: "O primeiro filho de Moisés (Êx 2:22)", text: "Filho de Moisés e Zípora, nascido em Midiã: \"chamou o seu nome Gérson, porque disse: Peregrino fui em terra estranha\" (Êx 2:22) — o nome lembra \"peregrino\". No próprio nome do filho, Moisés gravou a condição do estrangeiro longe de casa, antes de Deus o chamar de volta ao Egito." },
  // ---- Gn 4–5: os antediluvianos ----
  caim: { title: "Caim", subtitle: "O primogênito de Adão e Eva (Gn 4:1)", text: "\"Alcancei do SENHOR um homem\", disse Eva ao dá-lo à luz — o primeiro filho nascido de mulher (Gn 4:1). Lavrador da terra, invejou o irmão pastor e o matou no campo; Deus o sentenciou: \"fugitivo e vagabundo serás na terra\" (Gn 4:12). Mas, ainda ao amaldiçoá-lo, pôs nele um sinal \"para que o não ferisse qualquer que o achasse\" (Gn 4:15) — e Caim saiu para a terra de Node, ao oriente do Éden (Gn 4:16)." },
  abel: { title: "Abel", subtitle: "Pastor de ovelhas, morto pelo irmão (Gn 4:2)", text: "\"Abel foi pastor de ovelhas\" (Gn 4:2), e trouxe a Deus \"dos primogênitos das suas ovelhas, e da sua gordura\"; e \"atentou o Senhor para Abel e para a sua oferta\" (Gn 4:4). O irmão o matou por inveja, mas a sua morte não calou: \"a voz do sangue do teu irmão clama a mim desde a terra\" (Gn 4:10). Hebreus o celebra: \"pela fé Abel ofereceu... mais excelente sacrifício... e por ela, defunto, ainda fala\" (Hb 11:4)." },
  enos: { title: "Enos", subtitle: "Filho de Sete (Gn 4:26)", text: "\"E a Sete também nasceu um filho; e chamou o seu nome Enos; então se começou a invocar o nome do Senhor\" (Gn 4:26) — nasceu quando Sete tinha 105 anos (Gn 5:6). Seu nome, em hebraico, lembra a fragilidade do homem mortal. E, no entanto, foi nos seus dias que a humanidade começou a clamar publicamente pelo Nome do Senhor; viveu 905 anos e morreu (Gn 5:11)." },
  lameque: { title: "Lameque", subtitle: "Da linhagem de Caim (Gn 4:18)", text: "Descendente de Caim e filho de Metusael (Gn 4:18), foi o primeiro a tomar duas mulheres, Ada e Zilá — o primeiro polígamo da Bíblia (Gn 4:19). A elas entoou o canto vingativo da espada: \"matei um homem por me ferir, e um jovem por me pisar. Porque sete vezes Caim será castigado, mas Lameque setenta vezes sete\" (Gn 4:23-24). Na sua boca, a violência de Caim já não teme o castigo: gaba-se dele." },
  // ---- órbita de Abraão ----
  lo: { title: "Ló", subtitle: "O sobrinho de Abraão (Gn 11:27)", text: "Filho de Harã e sobrinho de Abrão, acompanhou-o de Ur até Canaã (Gn 11:27,31). Quando as duas casas já não cabiam juntas, \"escolheu para si toda a campina do Jordão\" e foi armando tendas até Sodoma (Gn 13:11-12). Dois anjos o arrancaram pela mão da cidade condenada, mas \"a mulher de Ló olhou para trás e ficou convertida numa estátua de sal\" (Gn 19:26) — e Pedro ainda o chama de \"justo\", afligido dia a dia pela devassidão ao redor (2Pe 2:7-8)." },
  agar: { title: "Agar", subtitle: "Serva egípcia, mãe de Ismael (Gn 16)", text: "Serva egípcia de Sarai, foi dada a Abrão e, maltratada e grávida, fugiu para o deserto — onde \"o anjo do Senhor a achou junto a uma fonte de água\" (Gn 16:7). Ela deu ao Senhor um nome que ninguém antes lhe dera: \"Tu és Deus que me vê\" — El-Roi (Gn 16:13). Anos depois, despedida com o filho e quase morta de sede, ouviu de novo o céu: \"Não temas... dele farei uma grande nação\" (Gn 21:17-18)." },
  ismael: { title: "Ismael", subtitle: "Filho de Abraão e Agar (Gn 16:11)", text: "\"Chamarás o seu nome Ismael; porquanto o Senhor ouviu a tua aflição\" (Gn 16:11) — o nome quer dizer \"Deus ouve\". Foi anunciado como \"homem feroz\", cuja mão seria contra todos e a de todos contra ele (Gn 16:12); cresceu no deserto e tornou-se flecheiro (Gn 21:20). Por amor a Abraão, Deus o abençoou e fez dele uma grande nação de \"doze príncipes\" (Gn 17:20; 25:16); viveu 137 anos (Gn 25:17)." },
  "tera-pai": { title: "Terá", subtitle: "O pai de Abrão, Naor e Harã (Gn 11:26)", text: "Descendente de Sem, \"gerou a Abrão, a Naor, e a Harã\" (Gn 11:26-27). Foi ele quem começou a grande jornada: tomou Abrão, a nora Sarai e o neto Ló e \"saiu com eles de Ur dos caldeus, para ir à terra de Canaã; e vieram até Harã, e habitaram ali\" (Gn 11:31). Mas parou no meio do caminho: \"foram os dias de Terá duzentos e cinco anos, e morreu Terá em Harã\" (Gn 11:32)." },
  "naor-filho": { title: "Naor", subtitle: "Irmão de Abraão (Gn 11:26)", text: "Irmão de Abrão e de Harã (Gn 11:26), tomou por mulher Milca e permaneceu na Mesopotâmia quando Abraão partiu para Canaã (Gn 11:29). Anos mais tarde chegou a notícia: \"Eis que também Milca deu filhos a Naor teu irmão\" — oito ao todo (Gn 22:20-23). O último deles, Betuel, gerou Rebeca — de modo que Naor se tornou avô da noiva de Isaque." },
  milca: { title: "Milca", subtitle: "Mulher de Naor (Gn 11:29)", text: "Filha de Harã, casou-se com o tio Naor, irmão de Abraão (Gn 11:29). A Escritura registra a boa nova da sua fecundidade: \"Milca deu filhos a Naor teu irmão\" — oito ao todo (Gn 22:20-23). Entre eles estava Betuel, pai de Rebeca; assim, por Milca veio a matriarca que o servo de Abraão encontraria junto ao poço de Harã." },
  betuel: { title: "Betuel", subtitle: "Filho de Naor e Milca, pai de Rebeca (Gn 22:22)", text: "O caçula dos oito filhos que Milca deu a Naor (Gn 22:22-23), da parentela arameia deixada na Mesopotâmia. Foi pai de Rebeca e de Labão (Gn 24:15). Quando o servo de Abraão pediu a moça para Isaque, ele e o filho reconheceram a mão de Deus: \"Do Senhor procedeu este negócio... Eis que Rebeca está diante da tua face; toma-a, e vai-te\" (Gn 24:50-51)." },
  sacerdote: { title: "Os sacerdotes do Egito", subtitle: "A casta poupada por Faraó (Gn 47:22)", text: "Na grande fome, José comprou para Faraó toda a terra do Egito — \"somente a terra dos sacerdotes não comprou, porquanto os sacerdotes tinham porção de Faraó, e eles comiam a sua porção que Faraó lhes tinha dado\" (Gn 47:22,26). Poderosa e isenta, a casta sacerdotal do Egito guardava os templos dos deuses do Nilo. Foi de uma dessas famílias, a de Potífera, sacerdote de Om, que José recebeu por mulher a Asenate (Gn 41:45)." },
  // ---- a casa de Jacó: Labão, esposas, servas ----
  labao: { title: "Labão", subtitle: "Sogro de Jacó, irmão de Rebeca (Gn 29:16)", text: "Irmão de Rebeca, correu a receber o servo de Abraão junto à fonte (Gn 24:29). Anos depois, hospedou o sobrinho Jacó — e o enganou, dando-lhe Lia em vez de Raquel na noite das bodas: \"Por que então me enganaste?\" (Gn 29:25). Ao enganador Jacó coube provar do próprio remédio; e, nos vinte anos de serviço, mudou-lhe o salário \"dez vezes\", mas \"Deus não lhe permitiu que me fizesse mal\" (Gn 31:7,41)." },
  lia: { title: "Lia", subtitle: "Filha mais velha de Labão, 1ª esposa de Jacó (Gn 29:16)", text: "A filha de \"olhos tenros\", trocada pelo pai no lugar de Raquel na noite das núpcias (Gn 29:17,23). Não amada, mas vista por Deus — \"o Senhor ouviu que eu era desprezada\" (Gn 29:33) —, deu a Jacó seis filhos e a filha Diná: Rúben, Simeão, Levi, Judá, Issacar e Zebulom. Ao quarto, disse: \"Esta vez louvarei ao Senhor\", e o chamou Judá (Gn 29:35). Foi sepultada com os patriarcas na cova de Macpela (Gn 49:31)." },
  raquel: { title: "Raquel", subtitle: "A amada de Jacó (Gn 29:18)", text: "Pastora junto ao poço de Harã, foi quem Jacó amou e por quem serviu catorze anos. Estéril por anos, clamou: \"Dá-me filhos, se não morro\" (Gn 30:1), até que Deus lhe abriu o ventre e nasceu José: \"O Senhor me acrescente outro filho\" (Gn 30:24). No parto do segundo, morrendo, chamou-o Benoni; morreu no caminho de Efrata, \"que é Belém\", e Jacó pôs uma coluna sobre a sua sepultura (Gn 35:16-20)." },
  bila: { title: "Bila", subtitle: "Serva de Raquel, dada a Jacó (Gn 30:3-4)", text: "Serva de Raquel, entregue a Jacó por mulher para que a estéril \"receba filhos por ela\" (Gn 30:3). Deu à luz Dã — \"Julgou-me Deus... e me deu um filho\" (Gn 30:6) — e Naftali, no meio das \"grandes lutas\" entre as irmãs (Gn 30:8). Assim seus dois filhos entraram na conta das doze tribos de Israel (Gn 35:25)." },
  zilpa: { title: "Zilpa", subtitle: "Serva de Lia, dada a Jacó (Gn 30:9)", text: "Serva de Lia, dada a Jacó por mulher quando Lia cessou de conceber (Gn 30:9). Deu à luz Gade — \"Afortunada!\" (Gn 30:11) — e Aser: \"Para minha ventura; porque as filhas me terão por bem-aventurada\" (Gn 30:13). Seus dois filhos tornaram-se cabeças de tribos de Israel." },
  // ---- os doze filhos de Jacó ----
  ruben: { title: "Rúben", subtitle: "O primogênito de Jacó e Lia (Gn 29:32)", text: "O primeiro filho de Lia: \"Porque o Senhor atendeu à minha aflição\" (Gn 29:32). \"Minha força e o princípio de meu vigor\", diz dele a bênção de Jacó (Gn 49:3) — mas por ter subido ao leito do pai (Gn 35:22) perdeu a primazia: \"Impetuoso como a água, não serás o mais excelente\" (Gn 49:4). Foi ele, contudo, quem tentou livrar José da morte (Gn 37:21-22)." },
  simeao: { title: "Simeão", subtitle: "2º filho de Lia (Gn 29:33)", text: "Segundo filho de Lia — \"Porquanto o Senhor ouviu que eu era desprezada\" (Gn 29:33). Com o irmão Levi, tomou da espada e vingou a desonra de Diná, matando os homens de Siquém (Gn 34:25). Por isso a bênção de Jacó pesou-lhe a mão: \"suas espadas são instrumentos de violência... eu os dividirei em Jacó, e os espalharei em Israel\" (Gn 49:5-7)." },
  levi: { title: "Levi", subtitle: "3º filho de Lia (Gn 29:34)", text: "Terceiro filho de Lia — \"Agora esta vez se unirá meu marido a mim\" (Gn 29:34). Ao lado de Simeão, protagonizou a violência de Siquém e ouviu de Jacó a mesma sentença de dispersão (Gn 34:25; 49:5-7). Dessa mesma tribo, porém, Deus faria brotar o sacerdócio de Israel — o espalhamento tornado serviço no meio do povo." },
  juda: { title: "Judá", subtitle: "4º filho de Lia (Gn 29:35)", text: "Quarto filho de Lia: \"Esta vez louvarei ao Senhor\" — e o chamou Judá, \"louvor\" (Gn 29:35). Propôs vender José aos ismaelitas (Gn 37:26-27), mas depois ofereceu-se como fiador de Benjamim diante do irmão que não reconhecia (Gn 44:33). Sobre ele repousou a promessa maior: \"O cetro não se arredará de Judá... até que venha Siló\" (Gn 49:10) — a linhagem do Messias." },
  issacar: { title: "Issacar", subtitle: "5º filho de Lia (Gn 30:17-18)", text: "Quinto filho de Lia, dado quando \"ouviu Deus a Lia\": \"Deus me tem dado o meu galardão\" (Gn 30:17-18). Na bênção de Jacó é retratado como \"jumento de fortes ossos, deitado entre dois fardos\", que viu que \"o descanso era bom, e que a terra era deliciosa\", e abaixou o ombro ao trabalho (Gn 49:14-15)." },
  zebulom: { title: "Zebulom", subtitle: "6º filho de Lia (Gn 30:19-20)", text: "Sexto e último filho de Lia: \"Deus me deu uma boa dádiva... desta vez morará o meu marido comigo\" (Gn 30:20). Jacó lhe profetizou vocação de mar e comércio: \"Zebulom habitará no porto dos mares, e será como porto dos navios, e o seu termo será para Sidom\" (Gn 49:13)." },
  da: { title: "Dã", subtitle: "1º filho de Bila (Gn 30:5-6)", text: "Primeiro filho de Bila, serva de Raquel: \"Julgou-me Deus, e também ouviu a minha voz\" — daí o nome Dã, ligado a \"julgar\" (Gn 30:6). A bênção de Jacó ecoa o próprio nome: \"Dã julgará o seu povo, como uma das tribos de Israel\", e o compara à serpente astuta \"junto ao caminho\" (Gn 49:16-17)." },
  naftali: { title: "Naftali", subtitle: "2º filho de Bila (Gn 30:7-8)", text: "Segundo filho de Bila: nasceu no auge da rivalidade das irmãs — \"Com grandes lutas tenho lutado com minha irmã; também venci\" (Gn 30:8). Jacó o abençoou com imagem de liberdade e beleza: \"Naftali é uma gazela solta; ele dá palavras formosas\" (Gn 49:21)." },
  gade: { title: "Gade", subtitle: "1º filho de Zilpa (Gn 30:10-11)", text: "Primeiro filho de Zilpa, serva de Lia: ao vê-lo, Lia exclamou \"Afortunada!\", e o chamou Gade (Gn 30:11). A bênção de Jacó joga com o sentido guerreiro do nome: \"uma tropa o acometerá; mas ele a acometerá por fim\" (Gn 49:19)." },
  aser: { title: "Aser", subtitle: "2º filho de Zilpa (Gn 30:12-13)", text: "Segundo filho de Zilpa: \"Para minha ventura; porque as filhas me terão por bem-aventurada\" — Aser significa \"feliz, bem-aventurado\" (Gn 30:13). Jacó lhe prometeu fartura: \"De Aser, o seu pão será gordo, e ele dará delícias reais\" (Gn 49:20)." },
  benjamim: { title: "Benjamim", subtitle: "O caçula de Jacó (Gn 35:18)", text: "O décimo segundo filho, único nascido em Canaã. Morrendo no parto, Raquel chamou-o Benoni, \"filho da minha dor\"; mas o pai lhe deu o nome de Benjamim, \"filho da destra\" (Gn 35:18). Amado por Jacó como último elo de Raquel, tornou-se a chave da provação dos irmãos no Egito (Gn 42-45). Jacó o profetizou como \"lobo que despedaça\" (Gn 49:27)." },
  manasses: { title: "Manassés", subtitle: "Primogênito de José, nascido no Egito (Gn 41:51)", text: "Primeiro filho que José teve no Egito, de Asenate: \"Deus me fez esquecer de todo o meu trabalho, e de toda a casa de meu pai\" — daí Manassés, \"o que faz esquecer\" (Gn 41:51). Jacó o adotou como seu, ao lado de Rúben e Simeão (Gn 48:5); mas, sendo o mais velho, recebeu do avô a mão esquerda, cedendo a bênção maior ao irmão menor (Gn 48:14)." },
  efraim: { title: "Efraim", subtitle: "2º filho de José (Gn 41:52)", text: "Segundo filho de José no Egito: \"Deus me fez crescer na terra da minha aflição\" — Efraim, ligado a \"frutífero\" (Gn 41:52). Embora o menor, recebeu de Jacó a mão direita, cruzada de propósito sobre a de Manassés (Gn 48:14). Ao pai que quis corrigi-lo, Jacó respondeu: \"o seu irmão menor será maior que ele\" (Gn 48:19) — mais uma vez, na Escritura, o último posto adiante do primeiro." },
  dina: { title: "Diná", subtitle: "Filha de Jacó e Lia (Gn 30:21)", text: "Única filha de Lia nomeada no relato (Gn 30:21). Ao sair \"para ver as filhas da terra\", foi violentada por Siquém, filho de Hamor (Gn 34:1-2). A afronta desencadeou a tragédia: seus irmãos Simeão e Levi, à espada, mataram todos os homens da cidade (Gn 34:25) — vingança que Jacó reprovou, temendo por toda a casa (Gn 34:30)." },
  debora: { title: "Débora", subtitle: "Ama (nutriz) de Rebeca (Gn 35:8)", text: "A ama que criara Rebeca, tão querida da família que sua morte foi registrada junto à jornada de Jacó a Betel. \"Morreu Débora, a ama de Rebeca, e foi sepultada ao pé de Betel, debaixo do carvalho\" a que se deu o nome de Alom-Bacute — \"o carvalho do choro\" (Gn 35:8). Um lampejo de ternura e luto em meio à grande história da aliança." },
  // ---- Siquém, Judá e Tamar, Edom, Egito ----
  siquem: { title: "Siquém", subtitle: "Príncipe heveu, filho de Hamor (Gn 34)", text: "\"Siquém, filho de Hamor, heveu, príncipe daquela terra\", viu Diná, filha de Jacó, e a humilhou (Gn 34:2). Depois, enamorado, pediu ao pai: \"Toma-me esta moça por mulher\" (Gn 34:4), e aceitou até circuncidar-se com todos os homens da cidade para tê-la. Mas Simeão e Levi, irmãos de Diná, vingaram a irmã: ao terceiro dia caíram sobre a cidade e mataram Hamor e Siquém ao fio da espada (Gn 34:25-26)." },
  hamor: { title: "Hamor", subtitle: "Príncipe heveu, pai de Siquém (Gn 34)", text: "Heveu, príncipe da terra e pai de Siquém, foi ele quem negociou com Jacó e seus filhos o casamento do filho com Diná: \"A alma de Siquém, meu filho, está enamorada da vossa filha; dai-lha, peço-vos, por mulher\" (Gn 34:8). Propôs aliança, comércio e terras entre os dois povos, e convenceu os homens da sua cidade a se circuncidarem. Confiando no acordo, foi morto com o filho pela espada de Simeão e Levi (Gn 34:26)." },
  tamar: { title: "Tamar", subtitle: "Nora de Judá, mãe de Perez (Gn 38)", text: "Casada com Er e depois com Onã, os dois primeiros filhos de Judá, ficou viúva sem filhos quando ambos morreram (Gn 38:6-10). Negado o direito de gerar descendência, disfarçou-se e enganou o próprio sogro para que a promessa não se perdesse — e Judá reconheceu: \"Mais justa é ela do que eu\" (Gn 38:26). Deu à luz os gêmeos Perez e Zerá (Gn 38:29-30), e por Perez entrou na genealogia do Messias (Mt 1:3)." },
  er: { title: "Er", subtitle: "Primogênito de Judá (Gn 38:3-7)", text: "Primeiro filho de Judá com a filha de Sua, a cananeia (Gn 38:3), e marido de Tamar, que o pai lhe tomou por esposa. A Bíblia o resume sem rodeios: \"Er, porém, o primogênito de Judá, era mau aos olhos do Senhor, por isso o Senhor o matou\" (Gn 38:7). Morreu sem deixar filhos, dando início à história do levirato que se seguiria em sua família." },
  ona: { title: "Onã", subtitle: "Segundo filho de Judá (Gn 38:4-10)", text: "Segundo filho de Judá (Gn 38:4). Morto o irmão, Judá lhe ordenou: \"Toma a mulher do teu irmão... e suscita descendência a teu irmão\" (Gn 38:8). Mas Onã, sabendo que o filho não seria contado como seu, recusou-se a levantar descendência ao irmão — \"e o que fazia era mau aos olhos do Senhor, pelo que também o matou\" (Gn 38:10)." },
  hira: { title: "Hira", subtitle: "O adulamita, amigo de Judá (Gn 38)", text: "Morador de Adulão, foi o amigo em cuja companhia Judá se afastou dos irmãos (Gn 38:1). Anos depois subiu com ele aos tosquiadores de ovelhas em Timna (Gn 38:12), e foi Hira quem Judá enviou para entregar o cabrito prometido e reaver o penhor deixado com Tamar (Gn 38:20). Amigo fiel nas idas e vindas de Judá, é sempre lembrado como \"o adulamita\"." },
  elifaz: { title: "Elifaz", subtitle: "Filho de Esaú e Ada (Gn 36)", text: "Primeiro filho de Esaú com Ada (Gn 36:4,10), tornou-se cabeça de uma linhagem de príncipes de Edom: Temã, Omar, Zefô, Gaetã e Quenaz (Gn 36:15-16). De sua concubina Timna nasceu Amaleque (Gn 36:12) — pai dos amalequitas, que seriam inimigos ferrenhos de Israel. Das mesmas raízes de Esaú brotou assim uma nação de chefes." },
  reuel: { title: "Reuel", subtitle: "Filho de Esaú e Basemate (Gn 36)", text: "Filho de Esaú com Basemate (Gn 36:4,10), foi pai de quatro chefes de Edom: \"o príncipe Naate, o príncipe Zerá, o príncipe Samá, o príncipe Mizá\" (Gn 36:13,17). Por ele a terra de Edom se encheu de príncipes muito antes de Israel ter o seu primeiro rei — cumprindo o destino de reis anunciado à casa de Esaú." },
  seir: { title: "Seir", subtitle: "O horeu, antigo morador da terra (Gn 36)", text: "Antes de os descendentes de Esaú ali habitarem, a terra pertencia a Seir, o horeu, e aos seus filhos: \"Estes são os filhos de Seir, horeu, moradores daquela terra\" (Gn 36:20). Dele a região tomou o nome — os montes de Seir. Gênesis registra seus clãs e príncipes ao lado dos de Edom, guardando a memória dos povos que a história atravessou (Gn 36:20-30)." },
  ana: { title: "Aná", subtitle: "Filho de Zibeão, o horeu (Gn 36:24)", text: "Um dos filhos de Zibeão, o horeu, guardado na Bíblia por um detalhe curioso: \"este é o Aná que achou as fontes termais no deserto, quando apascentava os jumentos de Zibeão, seu pai\" (Gn 36:24). Foi pai de Aolibama, que viria a ser mulher de Esaú (Gn 36:25). Um pastor comum cujo achado no ermo mereceu ser lembrado." },
  copeiro: { title: "O copeiro-mor", subtitle: "Chefe dos copeiros de Faraó (Gn 40)", text: "Chefe dos que serviam o vinho a Faraó, foi preso junto a José e sonhou com uma videira de três ramos — três dias até ser restituído ao cargo, como José interpretou (Gn 40:9-13). \"E fez tornar o copeiro-mor ao seu ofício de copeiro, e este deu o copo na mão de Faraó\" (Gn 40:21). Mas \"não se lembrou de José, antes se esqueceu dele\" (Gn 40:23) — só dois anos depois, diante do sonho de Faraó, confessou: \"Das minhas ofensas me lembro hoje\" (Gn 41:9)." },
  padeiro: { title: "O padeiro-mor", subtitle: "O sonho dos três cestos (Gn 40)", text: "Chefe dos padeiros de Faraó, preso com José e o copeiro. Vendo que José interpretara bem, contou o próprio sonho: três cestos brancos sobre a cabeça, e as aves comendo os manjares do cesto mais alto (Gn 40:16-17). Mas a leitura foi de morte: \"dentro ainda de três dias Faraó tirará a tua cabeça... e as aves comerão a tua carne\" (Gn 40:19). Cumpriu-se ao terceiro dia, no aniversário de Faraó (Gn 40:22)." },
  // ---- a casa do Egito (ciclo de José) ----
  sua: { title: "A filha de Sua", subtitle: "A esposa cananeia de Judá (Gn 38:2)", text: "Filha de um cananeu de Adulão, tornou-se mulher de Judá e mãe de seus três filhos: Er, Onã e Selá (Gn 38:2-5). Depois de sua morte, já consolado, Judá subiu aos tosquiadores de Timna — e ali se deu o episódio de Tamar (Gn 38:12). Representa a descendência que Judá gerou longe da casa de seu pai." },
  potifar: { title: "Potifar", subtitle: "Oficial de Faraó, capitão da guarda (Gn 39:1)", text: "Egípcio de alta patente que comprou José dos ismaelitas e o pôs sobre toda a sua casa, vendo que \"o Senhor estava com ele, e tudo o que fazia o Senhor prosperava\" (Gn 39:1-6). Ao ouvir a acusação falsa da mulher, acendeu-se em ira e lançou José no cárcere (Gn 39:19-20). Sem saber, foi o instrumento que levou José um passo mais perto do trono." },
  "mulher-potifar": { title: "A mulher de Potifar", subtitle: "A tentação na casa do egípcio (Gn 39:7)", text: "Esposa do capitão da guarda que, cobiçando o jovem hebreu, o assediava dia após dia: \"Deita-te comigo\" (Gn 39:7). Rejeitada — \"como faria eu este tão grande mal, e pecaria contra Deus?\" (Gn 39:9) —, agarrou-lhe a roupa e o acusou falsamente diante da casa e do marido (Gn 39:12-18). Sua mentira custou a José a liberdade, mas nunca a integridade." },
  carcereiro: { title: "O carcereiro-mor", subtitle: "O guarda que confiou em José (Gn 39:21)", text: "Chefe da casa do cárcere do Egito. Como \"o Senhor era com José... e fazia prosperar tudo quanto ele fazia\", entregou-lhe todos os presos e de mais nada cuidava (Gn 39:21-23). Onde José chega, logo governa — no cárcere como na casa de Potifar, porque a bênção o acompanhava mesmo na injustiça." },
  azenate: { title: "Azenate", subtitle: "Esposa de José, filha de Potífera (Gn 41:45)", text: "Filha de Potífera, sacerdote de Om, dada por Faraó a José por mulher quando o exaltou sobre todo o Egito (Gn 41:45). Deu a José, antes dos anos de fome, dois filhos: Manassés e Efraim (Gn 41:50-52), que Jacó adotaria como tribos de Israel. Por ela, a bênção de Abraão entrou numa casa egípcia." },
  mordomo: { title: "O mordomo de José", subtitle: "O que estava sobre a casa do governador (Gn 43:16)", text: "Servo de confiança posto sobre a casa de José no Egito. Recebeu os irmãos, tranquilizou-os — \"Paz seja convosco, não temais; o vosso Deus... vos tem dado um tesouro nos vossos sacos\" (Gn 43:23) — e lhes trouxe Simeão. Foi ele quem, por ordem secreta de José, escondeu o copo de prata no saco de Benjamim e depois os perseguiu (Gn 44:1-12)." },
  // ---- os reis de Gn 14 ----
  "rei-elao": { title: "Quedorlaomer", subtitle: "Rei de Elão, o suserano do oriente (Gn 14:1)", text: "\"Quedorlaomer, rei de Elão\", encabeçou a coalizão de quatro reis do oriente (Gn 14:1,9). Por doze anos as cidades da campina lhe serviram; ao rebelarem-se no décimo terceiro, ele desceu e as feriu no vale de Sidim (Gn 14:4-5). Levou cativo a Ló, sobrinho de Abraão — e foi perseguido e desbaratado por Abraão até Hobá, à esquerda de Damasco (Gn 14:12-16)." },
  "rei-sinar": { title: "Anrafel", subtitle: "Rei de Sinar (Gn 14:1)", text: "\"Anrafel, rei de Sinar\" — a terra de Babel, na baixa Mesopotâmia — foi um dos quatro reis aliados a Quedorlaomer contra as cidades da campina (Gn 14:1,9). Marchou no exército do oriente que saqueou Sodoma e Gomorra e levou Ló cativo, antes de ser derrotado na perseguição noturna de Abraão (Gn 14:11-16)." },
  "rei-sodoma": { title: "Bera", subtitle: "Rei de Sodoma (Gn 14:2)", text: "\"Bera, rei de Sodoma\", foi um dos cinco reis da campina que se rebelaram contra Quedorlaomer e caíram no vale de Sidim, cheio de poços de betume (Gn 14:2,10). Depois do resgate, saiu ao encontro de Abraão e ofereceu-lhe os bens: \"Dá-me as pessoas, e os bens toma para ti\" (Gn 14:21). Mas Abraão recusou tudo, para que ninguém dissesse \"eu enriqueci a Abrão\" (Gn 14:22-23)." },
  "rei-gomorra": { title: "Birsa", subtitle: "Rei de Gomorra (Gn 14:2)", text: "\"Birsa, rei de Gomorra\", aliou-se a Bera de Sodoma e aos demais reis da campina contra a coalizão do oriente (Gn 14:2). Vencido no vale de Sidim, viu a sua cidade saqueada de todos os bens e mantimentos (Gn 14:10-11) — Gomorra, que pouco depois arderia com Sodoma sob o enxofre e o fogo do céu (Gn 19:24)." },
  "hara-filho": { title: "Harã", subtitle: "Irmão de Abraão, pai de Ló (Gn 11:27)", text: "Filho mais novo de Terá e irmão de Abrão e Naor, \"gerou a Ló\" (Gn 11:27). Foi o primeiro da família a morrer, ainda na terra natal: \"morreu Harã antes de seu pai Terá, na terra do seu nascimento, em Ur dos caldeus\" (Gn 11:28). Deixou o filho Ló, que Abraão tomaria consigo, e as filhas Milca e Iscá (Gn 11:29)." },
  // ---- Gerar e Edom ----
  abimeleque: { title: "Abimeleque", subtitle: "Rei de Gerar, dos filisteus (Gn 20; 21; 26)", text: "Rei de Gerar na terra dos filisteus, cruzou a história de Abraão e de Isaque. Tomou Sara para si enganado pelo \"é minha irmã\", mas Deus o advertiu em sonho e ele a restituiu (Gn 20). Depois firmou com Abraão o pacto do poço de Berseba (Gn 21:22-32) e, gerações mais tarde, buscou a mesma aliança com Isaque: \"havemos visto que o Senhor é contigo\" (Gn 26:28). \"Abimeleque\" (\"meu pai é rei\") era provavelmente título dinástico dos reis de Gerar." },
  ficol: { title: "Ficol", subtitle: "Príncipe do exército de Abimeleque (Gn 21:22)", text: "Comandante das forças de Abimeleque, rei de Gerar, acompanhou o rei nas duas alianças que a casa filisteia firmou com os patriarcas. Esteve no juramento de Berseba com Abraão — \"Deus é contigo em tudo o que fazes\" (Gn 21:22) — e de novo no pacto com Isaque, gerações depois (Gn 26:26). Seu nome aparece sempre ao lado do rei, como a espada que garante o tratado." },
  efrom: { title: "Efrom", subtitle: "O heteu, dono do campo de Macpela (Gn 23:8-16)", text: "Heteu que habitava entre os filhos de Hete, dono do campo e da cova de Macpela, em frente de Manre. À porta da cidade, ofereceu a Abraão o campo \"de graça\" na cortesia oriental, mas nomeou o preço: \"a terra é de quatrocentos siclos de prata\" (Gn 23:15). Abraão pesou-lhe a prata diante das testemunhas, e o campo passou a ser posse do patriarca — o primeiro chão da promessa (Gn 23:16-18)." },
  amaleque: { title: "Amaleque", subtitle: "Filho de Elifaz, pai dos amalequitas (Gn 36:12)", text: "Neto de Esaú, nascido de Elifaz e da concubina Timna (Gn 36:12). Dele saiu o povo de Amaleque, o primeiro a atacar Israel na saída do Egito, ferindo os cansados na retaguarda (Êx 17:8-16; Dt 25:17-19). Por isso Deus jurou \"guerra contra Amaleque de geração em geração\" — de um ramo da casa de Esaú brotou um dos mais antigos inimigos do povo da aliança." },
  ada: { title: "Ada", subtitle: "Mulher de Esaú, mãe de Elifaz (Gn 36:2)", text: "Uma das mulheres cananeias que Esaú tomou — \"das filhas de Canaã\", que foram amargura de espírito para Isaque e Rebeca (Gn 26:34-35; 36:2). Mãe de Elifaz, o primogênito de Esaú, tornou-se por ele avó de uma linhagem de príncipes de Edom, entre eles Temã e Amaleque (Gn 36:15-16)." },
  aolibama: { title: "Aolibama", subtitle: "Mulher de Esaú, filha de Aná (Gn 36:2)", text: "Filha de Aná e neta de Zibeão, o horeu, foi uma das mulheres que Esaú tomou na terra de Canaã (Gn 36:2,25). Deu a Esaú três filhos — Jeús, Jalão e Coré —, que se tornaram príncipes de Edom (Gn 36:5,14,18)." },
  // ---- Josué: a conquista de Canaã ----
  josue: { title: "Josué, filho de Num", subtitle: "O servo de Moisés que introduz Israel na terra (Js 1:1)", text: "Da tribo de Efraim, foi o \"moço\" que servia a Moisés e um dos dois espias que creram na promessa (Nm 14:6-9). Moisés lhe mudou o nome de Oséias para Josué — \"o Senhor é salvação\" — e sobre ele pôs as mãos, cheio do Espírito de sabedoria (Nm 27:18; Dt 34:9). A ele Deus repetiu: \"Esforça-te e tem bom ânimo... o Senhor teu Deus é contigo\" (Js 1:9). Atravessou o Jordão, tomou a terra e a repartiu, e no fim desafiou o povo: \"eu e a minha casa serviremos ao Senhor\" (Js 24:15). Prefigura Jesus, que leva o povo ao verdadeiro descanso (Hb 4:8)." },
  calebe: { title: "Calebe, filho de Jefoné", subtitle: "O espia fiel, herdeiro de Hebrom (Js 14:6)", text: "O quenezeu que, com Josué, trouxe bom relato da terra e creu contra a incredulidade dos dez: \"subamos animosamente... porque bem poderemos com ela\" (Nm 13:30). Por seguir \"integralmente\" ao Senhor, foi dos únicos daquela geração a entrar (Nm 14:24). Aos 85 anos, com a mesma fé de 45 anos antes, reivindicou o monte dos anaquins: \"dá-me este monte de que o Senhor falou\" (Js 14:12), e tomou Hebrom. Modelo de quem persevera na promessa até vê-la cumprida." },
  raabe: { title: "Raabe", subtitle: "A meretriz de Jericó que creu (Js 2:1)", text: "Prostituta de Jericó que escondeu os dois espias e confessou a fé que já corria em seu coração: \"o Senhor vosso Deus é Deus em cima nos céus e embaixo na terra\" (Js 2:11). Pediu misericórdia e a recebeu: o cordão de escarlata à janela salvou toda a sua casa quando os muros caíram (Js 6:22-25). A gentia redimida entrou em Israel, tornou-se mãe de Boaz e antepassada de Davi e de Cristo (Mt 1:5); Hebreus e Tiago a louvam pela fé viva e obediente (Hb 11:31; Tg 2:25)." },
  eleazar: { title: "Eleazar, filho de Arão", subtitle: "O sumo sacerdote que repartiu a terra (Js 14:1)", text: "Terceiro filho de Arão, sucedeu-lhe no sumo sacerdócio quando Deus revestiu Eleazar com as vestes no monte Hor (Nm 20:26-28). Ao lado de Josué, lançou as sortes \"perante o Senhor\" para dividir a herança entre as tribos (Js 14:1; 19:51) — o sacerdote e o capitão juntos, palavra e espada a serviço da promessa. Morreu ao fim do livro e foi sepultado no outeiro de Finéias, seu filho, em Efraim (Js 24:33)." },
  aca: { title: "Acã, filho de Carmi", subtitle: "O que tomou do anátema em Jericó (Js 7:1)", text: "Da tribo de Judá, transgrediu o interdito de Jericó: cobiçou e escondeu \"uma boa capa babilônica, e duzentos siclos de prata, e uma cunha de ouro\" debaixo da sua tenda (Js 7:21). Por isso Israel foi ferido diante de Ai, pois \"pecou Israel\" na pessoa de um só (Js 7:11). Descoberto pela sorte, confessou; foi apedrejado no vale de Acor — \"vale da perturbação\" —, sério aviso de que o pecado escondido de um contamina todo o povo (Js 7:24-26)." },
  fineias: { title: "Finéias, filho de Eleazar", subtitle: "O sacerdote zeloso, mediador da paz (Js 22:13)", text: "Neto de Arão, ficou conhecido pelo zelo em Baal-Peor, que estancou a praga e lhe valeu \"o pacto de um sacerdócio perpétuo\" (Nm 25:11-13). Em Josué 22 é enviado às tribos de além-Jordão para apurar o altar que haviam erguido; ouvindo que era altar de testemunho, e não de rebeldia, alegrou-se e evitou a guerra entre irmãos: \"hoje sabemos que o Senhor está no meio de nós\" (Js 22:31). Homem de zelo e de discernimento para a paz." },
  acsa: { title: "Acsa, filha de Calebe", subtitle: "A que pediu as fontes de água (Js 15:16)", text: "Dada por esposa a Otniel, que tomou Quiriate-Sefer, pediu ousadamente ao pai mais do que o campo do Neguebe: \"dá-me também fontes de águas\" — e Calebe lhe deu as fontes superiores e as inferiores (Js 15:19). Sabendo que a terra seca precisa de água viva, buscou a bênção completa; imagem de quem não se contenta com a herança pela metade, mas pede as fontes que a fazem frutificar." },
  otniel: { title: "Otniel, filho de Quenaz", subtitle: "O que tomou Quiriate-Sefer, primeiro juiz (Js 15:17)", text: "Parente de Calebe, conquistou Debir (Quiriate-Sefer) e por isso recebeu Acsa por mulher (Js 15:16-17). Mais tarde, quando Israel serviu a um rei da Mesopotâmia, \"o Senhor suscitou um libertador... a Otniel\", sobre quem veio o Espírito do Senhor, e a terra teve quarenta anos de descanso (Jz 3:9-11) — o primeiro dos juízes de Israel." },
  balaao: { title: "Balaão, filho de Beor", subtitle: "O adivinho que quis amaldiçoar Israel (Js 13:22)", text: "Adivinho de Petor, junto ao Eufrates, contratado por Balaque para amaldiçoar Israel — mas Deus lhe torceu a boca em bênção (Nm 22-24). Amou \"o prêmio da injustiça\" (2Pe 2:15) e ensinou Balaque a seduzir o povo em Baal-Peor. Josué registra o seu fim: foi morto à espada entre os reis de Midiã (Js 13:22), lembrança de que nem toda ciência do oculto livra o coração cobiçoso do juízo." },
  balaque: { title: "Balaque, filho de Zipor", subtitle: "O rei de Moabe que temeu Israel (Js 24:9)", text: "Rei de Moabe que, aterrorizado com a multidão que saíra do Egito, mandou chamar Balaão para amaldiçoar Israel (Nm 22:2-6). Na aliança de Siquém, Josué recorda o episódio como prova do cuidado de Deus: \"levantou-se Balaque... e chamou a Balaão para que vos amaldiçoasse; porém eu não quis ouvir a Balaão... e livrei-vos da sua mão\" (Js 24:9-10)." },
  tera: { title: "Terá", subtitle: "O pai de Abraão, além do Rio (Js 24:2)", text: "Na aliança de Siquém, Josué recua até a raiz de tudo: \"Além do rio habitaram antigamente vossos pais, Terá, pai de Abraão e de Naor, e serviram a outros deuses\" (Js 24:2). Terá, idólatra da Mesopotâmia, é o retrato da origem de onde a graça arrancou Israel — a eleição de Abraão não brotou de mérito, mas do puro chamado do Senhor que \"tomou\" o patriarca de além do Eufrates (Js 24:3)." },
  // ---- Juízes: os libertadores levantados por Deus ----
  "debora-juiza": { title: "Débora", subtitle: "Profetisa e juíza de Israel (Jz 4:4)", text: "\"Débora, mulher profetisa, mulher de Lapidote, julgava a Israel naquele tempo\" — e o povo subia até ela, que se assentava debaixo da sua palmeira entre Ramá e Betel (Jz 4:4-5). Chamou Baraque à guerra contra Sísera e foi com ele quando ele não quis ir só; por isso a honra da vitória coube a uma mulher (Jz 4:9). No seu cântico chama a si mesma \"mãe em Israel\" (Jz 5:7) — em tempo de covardia, uma mulher creu na palavra do Senhor e conduziu a nação." },
  baraque: { title: "Baraque, filho de Abinoão", subtitle: "O capitão convocado por Débora (Jz 4:6)", text: "De Quedes-Naftali, foi chamado a levar dez mil homens ao monte Tabor contra os novecentos carros de ferro de Sísera. Hesitou: \"Se fores comigo, irei; porém, se não fores comigo, não irei\" (Jz 4:8). Desceu do Tabor e o Senhor derrotou Sísera diante dele. Apesar da fé vacilante, Hebreus o conta entre os que \"pela fé venceram reinos\" (Hb 11:32-33)." },
  jael: { title: "Jael, mulher de Héber", subtitle: "A que feriu Sísera na tenda (Jz 4:17)", text: "Queneia, acolheu na sua tenda o general fugitivo, deu-lhe leite em vez da água que ele pedira e o cobriu; e enquanto ele dormia exausto, tomou a estaca da tenda e o martelo e o traspassou (Jz 4:18-21). O cântico a proclama \"bendita sobre as mulheres\" (Jz 5:24). Numa tenda, com as ferramentas domésticas de uma mulher, caiu o poder que oprimira Israel vinte anos." },
  sisera: { title: "Sísera", subtitle: "O capitão do exército de Jabim (Jz 4:2)", text: "Chefe militar de Jabim, rei de Canaã, tinha novecentos carros de ferro e oprimira Israel violentamente por vinte anos (Jz 4:2-3). No Quisom, \"o Senhor derrotou a Sísera\", e ele desceu do carro e fugiu a pé, para morrer pela mão de uma mulher (Jz 4:15-21). O cântico o mostra pela última vez pelos olhos da mãe, à janela, esperando o filho que não volta (Jz 5:28)." },
  eude: { title: "Eúde, filho de Gera", subtitle: "O juiz canhoto, libertador de Moabe (Jz 3:15)", text: "Benjamita canhoto, cingiu à coxa direita uma espada de dois gumes — onde ninguém revistaria — e a levou à câmara de verão de Eglom, rei de Moabe, dizendo: \"Tenho uma palavra secreta para ti\" (Jz 3:16-19). Morto o opressor, tocou a buzina em Efraim, tomou os vaus do Jordão, e a terra sossegou oitenta anos (Jz 3:27-30) — o maior descanso do livro." },
  sangar: { title: "Sangar, filho de Anate", subtitle: "O que feriu seiscentos com uma aguilhada (Jz 3:31)", text: "Um só versículo o guarda: \"feriu seiscentos homens dos filisteus com uma aguilhada de bois; e também ele libertou a Israel\" (Jz 3:31). Sem exército e sem espada, com a ferramenta do lavrador, tornou-se libertador — e no cântico de Débora os seus dias são lembrados como tempo em que \"cessaram os caminhos\" (Jz 5:6). Deus salva por quem quer e com o que houver na mão." },
  gideao: { title: "Gideão (Jerubaal)", subtitle: "O juiz dos trezentos (Jz 6:11)", text: "O anjo do Senhor o achou malhando trigo escondido no lagar, por causa dos midianitas, e o saudou: \"O Senhor é contigo, homem valoroso\" (Jz 6:12). Ele se dizia o menor da casa mais pobre de Manassés, pediu sinais e o velo — e ainda assim derrubou o altar de Baal (por isso Jerubaal) e desceu com trezentos homens, trombetas, cântaros e tochas contra um arraial \"como a areia\" (Jz 7:12,20). Recusou a coroa — \"o Senhor sobre vós dominará\" (Jz 8:23) —, mas o éfode de ouro que fez virou laço para a sua casa." },
  jotao: { title: "Jotão, filho de Jerubaal", subtitle: "O caçula que escapou e falou a parábola (Jz 9:5)", text: "O menor dos setenta filhos de Gideão, escondeu-se e sobreviveu à matança sobre a pedra em Ofra (Jz 9:5). Do alto do monte Gerizim bradou a primeira parábola da Escritura: as árvores que buscam um rei e acabam sob o espinheiro, de quem sai fogo que devora os cedros do Líbano (Jz 9:8-15). A maldição que pronunciou cumpriu-se três anos depois, sobre Abimeleque e sobre Siquém (Jz 9:20,57)." },
  "abimeleque-jz": { title: "Abimeleque, filho de Gideão", subtitle: "O que se fez rei em Siquém (Jz 9:1)", text: "Filho da concubina de Gideão em Siquém, comprou homens ociosos com prata do templo de Baal-Berite e matou os setenta irmãos sobre uma pedra (Jz 9:4-5). Reinou três anos — o primeiro a usurpar a realeza em Israel — até que Deus enviou \"um mau espírito\" entre ele e Siquém (Jz 9:23). Queimou a torre de Siquém e morreu em Tebes, quando uma mulher lhe lançou do muro um pedaço de mó sobre a cabeça (Jz 9:53)." },
  jefte: { title: "Jefté, o gileadita", subtitle: "O rejeitado que se tornou chefe (Jz 11:1)", text: "\"Era filho de uma prostituta\" e foi expulso pelos irmãos da casa do pai; na terra de Tobe, homens vadios se ajuntaram a ele (Jz 11:1-3). Quando Amom veio à guerra, os mesmos anciãos que o lançaram fora foram buscá-lo — a pedra rejeitada virou cabeça. Argumentou com Amom pela história e pela justiça de Deus (Jz 11:27), venceu, mas fez um voto precipitado que lhe custou a filha única. Hebreus ainda o nomeia entre os homens de fé (Hb 11:32)." },
  "filha-jefte": { title: "A filha de Jefté", subtitle: "A única, que saiu com adufes (Jz 11:34)", text: "\"Ela era única; não tinha ele outro filho nem filha\" — e foi ela quem saiu a recebê-lo com adufes e com danças (Jz 11:34). Sabendo do voto do pai, não fugiu: \"faze de mim conforme o que prometeste\", pedindo só dois meses nos montes com as companheiras (Jz 11:36-37). A Escritura não lhe dá nome, mas guarda o seu costume em Israel, quatro dias por ano. Sua história é o retrato mais amargo do que custa jurar levianamente diante de Deus (Ec 5:2-5)." },
  manoa: { title: "Manoá", subtitle: "O pai de Sansão, de Zorá (Jz 13:2)", text: "Danita de Zorá, rogou ao Senhor que o varão de Deus voltasse para lhes ensinar o que fazer ao menino que havia de nascer (Jz 13:8). Perguntou o nome ao anjo e ouviu: \"por que perguntas assim pelo meu nome, visto que é maravilhoso?\" (Jz 13:18). Quando a chama subiu do altar com o mensageiro, caiu com o rosto em terra e disse à mulher: \"certamente morreremos, porquanto temos visto a Deus\" (Jz 13:22)." },
  "mulher-manoa": { title: "A mulher de Manoá", subtitle: "A estéril a quem o anjo apareceu (Jz 13:3)", text: "A Escritura não lhe dá o nome, mas foi a ela — e não ao marido — que o anjo do Senhor apareceu duas vezes, anunciando: \"tu és estéril, e nunca tens dado à luz; porém conceberás, e darás à luz um filho\" (Jz 13:3). Recebeu a lei do nazireado ainda no ventre. E foi a sua fé serena que sossegou o medo de Manoá: \"se o Senhor nos quisera matar, não aceitaria da nossa mão o holocausto\" (Jz 13:23)." },
  sansao: { title: "Sansão", subtitle: "O nazireu de Deus desde o ventre (Jz 13:5)", text: "Danita consagrado antes de nascer — \"navalha não subirá à sua cabeça... e ele começará a livrar a Israel da mão dos filisteus\" (Jz 13:5). O Espírito do Senhor o assaltava com força espantosa: despedaçou o leão, feriu mil com uma queixada, carregou as portas de Gaza. Mas a força que os inimigos não venceram, a paixão desatou: nos joelhos de Dalila perdeu os cabelos e, o que é pior, \"não sabia que já o Senhor se tinha retirado dele\" (Jz 16:20). Cego e moendo na prisão, orou uma última vez e derrubou a casa de Dagom — \"os que matou na sua morte foram mais do que os que matara na sua vida\" (Jz 16:30); e Hebreus o conta entre os que pela fé \"das fraquezas tiraram forças\" (Hb 11:32-34)." },
  dalila: { title: "Dalila", subtitle: "A mulher do vale de Soreque (Jz 16:4)", text: "Amada por Sansão e comprada pelos príncipes dos filisteus, cada um por mil e cem moedas de prata, para descobrir em que estava a sua grande força (Jz 16:5). Três vezes ele mentiu e três vezes ela o entregou; \"e sucedeu que, importunando-o ela todos os dias com as suas palavras... a sua alma se angustiou até à morte\" (Jz 16:16). Ela é o retrato da sedução que arranca o segredo do coração e o vende — o inimigo que dorme dentro de casa." },
  mica: { title: "Mica, o efraimita", subtitle: "O da imagem de escultura e do levita alugado (Jz 17:1)", text: "Devolveu à mãe as mil e cem moedas de prata que lhe furtara, e dela saiu o dinheiro para o ourives fazer uma imagem de escultura e de fundição (Jz 17:2-4). Fez uma casa de deuses, um éfode, terafins, consagrou um filho por sacerdote e depois alugou um levita por dez peças de prata por ano, dizendo: \"agora sei que o Senhor me fará bem\" (Jz 17:13). É a religião virada superstição doméstica — culto ao Senhor pelo nome, com ídolos e sacerdote comprado; do seu santuário saiu a idolatria de toda a tribo de Dã (Jz 18:30-31)." },
  // ---- Rute: a fidelidade nos dias dos juízes ----
  noemi: { title: "Noemi", subtitle: "A que voltou vazia a Belém (Rt 1:2)", text: "Mulher de Elimeleque, desceu com ele a Moabe por causa da fome e ali perdeu o marido e os dois filhos. Voltou a Belém dizendo: \"Não me chameis Noemi; chamai-me Mara, porque grande amargura me tem dado o Todo-Poderoso... cheia parti, porém vazia o Senhor me fez tornar\" (Rt 1:20-21). Falou verdade, mas não a verdade toda: nos braços trazia Rute, e no fim as vizinhas lhe põem ao colo um menino, dizendo \"a Noemi nasceu um filho\" (Rt 4:17)." },
  rute: { title: "Rute, a moabita", subtitle: "A que se apegou a Noemi e ao seu Deus (Rt 1:4)", text: "Viúva moabita — de um povo excluído da congregação (Dt 23:3) —, recusou voltar aos seus e fez o juramento que se tornou o coração do livro: \"aonde quer que fores irei... o teu povo é o meu povo, e o teu Deus é o meu Deus\" (Rt 1:16). Respigou nos campos de Boaz para sustentar a sogra, e dele ouviu: \"o Senhor galardoe o teu feito... sob cujas asas te vieste abrigar\" (Rt 2:12). A estrangeira que buscou refúgio no Deus de Israel tornou-se bisavó de Davi e entrou na genealogia do Messias (Rt 4:17; Mt 1:5)." },
  boaz: { title: "Boaz", subtitle: "O remidor, homem valente e rico (Rt 2:1)", text: "Parente de Elimeleque em Belém, saudava os segadores com \"o Senhor seja convosco\" e mandou que deixassem punhados de propósito para a estrangeira (Rt 2:4,16). Na eira, ouviu o pedido de Rute — \"estende pois tua capa sobre a tua serva, porque tu és o remidor\" — e prometeu resolvê-lo pela lei, sem pressa nem escândalo (Rt 3:9-13). À porta da cidade resgatou a herança e tomou Rute por mulher diante dos anciãos. Nele se vê a figura do Redentor que paga o preço e traz o excluído para dentro da família (Lv 25:25; Ef 1:7)." },
  orfa: { title: "Orfa", subtitle: "A nora que voltou ao seu povo (Rt 1:4)", text: "A outra moabita, casada com um dos filhos de Noemi. Chorou, beijou a sogra e voltou — \"eis que tua cunhada tornou ao seu povo e aos seus deuses; torna tu também após a tua cunhada\" (Rt 1:14-15). Não fez nada de perverso: fez o razoável, o que a sogra lhe aconselhara. Fica na história como o contraste que faz brilhar a escolha de Rute — dois caminhos na mesma encruzilhada, e só um leva a Belém." },
  // ---- Juízes: as vozes anônimas e as hostes inimigas em cena ----
  profeta: { title: "O profeta enviado antes de Gideão", subtitle: "O varão anônimo do SENHOR a Israel (Jz 6:8)", text: "Ao clamor de Israel debaixo de Midiã, Deus responde primeiro com uma palavra, e não com um libertador: \"o Senhor enviou um homem, um profeta, aos filhos de Israel\" (Jz 6:8). A Escritura não lhe dá o nome; dá-lhe a mensagem, e ela começa pela memória do livramento: \"Do Egito vos fiz subir, e vos tirei da casa da servidão... e vos livrei da mão dos egípcios, e da mão de todos os que vos oprimiam\" (Jz 6:8-9). Depois vem a acusação, que é o coração dos três versículos: \"Eu sou o Senhor vosso Deus; não temais os deuses dos amorreus, em cuja terra habitais; mas não destes ouvidos à minha voz\" (Jz 6:10). Antes de mandar o juiz, Deus manda o diagnóstico — não há livramento verdadeiro sem que o povo saiba do que precisa ser livrado (cf. Ne 9:9-10)." },
  "midianita-sonho": { title: "O midianita que sonhou com o pão de cevada", subtitle: "O sonho ouvido por Gideão na noite (Jz 7:13)", text: "É o soldado do arraial de Midiã a quem Gideão, descido às sentinelas, ouve contar ao companheiro: \"Eis que sonhei um sonho; e eis que um pão de cevada torrado rodava pelo arraial dos midianitas, e chegava até à tenda, e a feriu, e caiu, e a transtornou de cima para baixo, e ficou caída\" (Jz 7:13). O pão de cevada é o pão dos pobres — a comida do Israel esfomeado que se escondia nas covas dos montes. Deus dá o sonho dentro do acampamento inimigo e o faz contar justamente na hora em que o seu servo medroso passa por ali: até os sonhos dos pagãos servem ao propósito do Senhor e à fé de um homem (cf. Gn 41:25; Dn 2:28)." },
  companheiro: { title: "O companheiro que interpretou o sonho", subtitle: "\"Não é isto senão a espada de Gideão\" (Jz 7:14)", text: "O outro midianita responde sem hesitar: \"Isto não é outra coisa senão a espada de Gideão, filho de Joás, varão israelita; Deus pôs na sua mão a Midiã e a todo este arraial\" (Jz 7:14). O inimigo confessa a derrota antes de a batalha começar, como Raabe confessara em Jericó: \"todos os moradores da terra estão desmaiados diante de vós\" (Js 2:9). Gideão ouve, adora ali mesmo no escuro — antes de qualquer vitória — e volta ao arraial dizendo: \"Levantai-vos, porque o Senhor tem dado o arraial de Midiã nas vossas mãos\" (Jz 7:15). Deus condescende com o medo do seu servo e lhe dá a certeza pela boca do adversário." },
  "sentinela-midia": { title: "A sentinela do arraial de Midiã", subtitle: "O extremo da guarda, na noite da descida (Jz 7:11)", text: "É a guarda do acampamento até cujo extremo Gideão e o moço Purá descem, na noite em que o Senhor lhe disse: \"Levanta-te, e desce ao arraial, porque o tenho dado na tua mão\" (Jz 7:9-11). Vigia uma hoste que jazia no vale \"como gafanhotos em multidão\", com camelos \"como a areia que há na praia do mar, em multidão\" (Jz 7:12). Guardam tudo, menos o que importa: naquela mesma noite o temor já corria dentro das tendas, e o arraial cairia sem que Israel desembainhasse a espada (Jz 7:22). \"Se o Senhor não guardar a cidade, em vão vigia a sentinela\" (Sl 127:1)." },
  midianita1: HOSTE_DE_MIDIA,
  midianita2: HOSTE_DE_MIDIA,
  midianita3: HOSTE_DE_MIDIA,
  midianita4: HOSTE_DE_MIDIA,
  "oficial-hazor1": CORTE_DE_HAZOR,
  "oficial-hazor2": CORTE_DE_HAZOR,
  "carro-ferro1": CARROS_DE_FERRO,
  "carro-ferro2": CARROS_DE_FERRO,
  "carro-ferro3": CARROS_DE_FERRO,
  goel: { title: "O remidor mais chegado", subtitle: "O parente que recusou o resgate (Rt 4:1)", text: "A Escritura de propósito não lhe dá nome — Boaz o chama apenas de \"fulano\" à porta da cidade (Rt 4:1). Aceitou de bom grado resgatar a terra, até saber que com ela vinha Rute e o dever de levantar o nome do morto: \"não poderei redimi-la, para que não prejudique a minha herança\" (Rt 4:6). Descalçou o sapato e saiu da história sem nome. Quem calcula a herança acima do dever perde justamente aquilo que buscava guardar." },
};

// ============================================================================
// FICHAS-BASE DOS OBJETOS — leitura ampla, válida em qualquer livro.
// (As versões específicas do Apocalipse ficam em PROP_INFO_BY_BOOK.revelation.)
// ============================================================================
export const PROP_INFO: Record<string, StageInfo> = {
  river: {
    title: "O rio",
    subtitle: "Águas que dão vida",
    text: "Num mundo em que tudo dependia da água, o rio era a própria vida: o Éden nascia de um rio que se abria em quatro braços (Gn 2:10), o Nilo sustentava o Egito, o Jordão marcava a Terra Prometida. A Bíblia faz do rio um retrato da bênção que vem de Deus e transborda — \"há um rio cujas correntes alegram a cidade de Deus\" (Sl 46:4) —, até o rio da água da vida que procede do trono (Ap 22:1).",
  },
  well: {
    title: "O poço",
    subtitle: "O coração da vida cotidiana",
    text: "O poço era o ponto de encontro do mundo antigo: ali se tirava água, se fechavam acordos e se conheciam viajantes. Junto a poços, Eliézer achou Rebeca (Gn 24), Jacó achou Raquel (Gn 29) e Jesus se revelou à samaritana como a fonte da \"água viva\" que jorra para a vida eterna (Jo 4:6-14). Cavar e guardar um poço no deserto era questão de vida ou morte — e motivo de aliança (Gn 21:25-31).",
  },
  amphora: {
    title: "Ânfora de barro",
    subtitle: "Vaso de água, azeite e vinho",
    text: "Vasos de cerâmica como este guardavam água, azeite, vinho e grãos em toda casa do mundo antigo. A Bíblia usa o vaso de barro como figura do ser humano nas mãos do Oleiro (Jr 18:1-6) e do tesouro do evangelho \"em vasos de barro, para que a excelência do poder seja de Deus\" (2Co 4:7).",
  },
  stall: {
    title: "Banca de feira",
    subtitle: "O comércio da cidade antiga",
    text: "Nas portas e praças das cidades se armavam bancas de grãos, frutas, azeite e cerâmica — ali se comprava, se pesava a prata e se fechavam negócios, como Abraão comprando o campo de Macpela \"a peso de prata\" (Gn 23:16). O mercado era o coração econômico da urbe; e a Escritura pede ali \"balança justa e peso justo\" (Lv 19:36), porque a fé se prova também no modo de negociar.",
  },
  lampstand: {
    title: "Candeeiro",
    subtitle: "A luz que não se apaga",
    text: "Antes da eletricidade, uma pequena lâmpada de azeite fazia recuar a noite dentro da casa e da tenda. A Bíblia faz da luz acesa um símbolo de vida e direção: \"lâmpada para os meus pés é a tua palavra\" (Sl 119:105). No Tabernáculo, o candelabro de ouro de sete braços ardia continuamente diante de Deus (Êx 25:31-37) — sinal de que a presença do Senhor nunca deixa o seu povo às escuras.",
  },
  palm: {
    title: "Palmeira",
    subtitle: "O justo que floresce",
    text: "Árvore de oásis, a palmeira dá sombra, tâmaras e fibras onde quase nada cresce — sinal seguro de que há água por perto. A Bíblia faz dela retrato do justo: \"o justo florescerá como a palmeira\" (Sl 92:12). Seus ramos abriam festa e vitória — agitados à entrada de Jesus em Jerusalém (Jo 12:13) e diante do Cordeiro pela grande multidão (Ap 7:9).",
  },
  rock: {
    title: "Rocha",
    subtitle: "Firmeza e abrigo",
    text: "A rocha é, na Bíblia, imagem de firmeza e refúgio: sombra no calor, alicerce que não se move. Jacó fez de uma pedra o seu travesseiro e depois a levantou como altar em Betel (Gn 28:11,18). \"O Senhor é a minha rocha, a minha fortaleza e o meu libertador\" (Sl 18:2) — e Paulo diz que \"a rocha era Cristo\" (1Co 10:4), aquela que, ferida, derramou água no deserto (Êx 17:6).",
  },
  door: {
    title: "A porta",
    subtitle: "Entrada e limiar",
    text: "A porta guardava a casa e decidia quem entrava. A arca teve uma só porta, e \"o Senhor a fechou por fora\" (Gn 7:16); à porta da tenda Abraão avistou os três visitantes (Gn 18:1); a porta de Ló foi cercada em Sodoma (Gn 19:6-11). A imagem atravessa a Bíblia até Jesus: \"Eu sou a porta; se alguém entrar por mim, salvar-se-á\" (Jo 10:9) — e \"eis que estou à porta e bato\" (Ap 3:20).",
  },
  tower: {
    title: "Torre",
    subtitle: "Cidade, vigília e soberba",
    text: "A torre erguia-se sobre muralhas e vinhas para vigiar e proteger. A Bíblia guarda a mais famosa: a torre de Babel, onde os homens quiseram \"chegar até aos céus\" e \"fazer um nome\" — e foram dispersos, confundidas as suas línguas (Gn 11:4-9). Contra a torre da soberba, ela aponta outra confiança: \"Torre forte é o nome do Senhor; a ela correrá o justo e estará seguro\" (Pv 18:10).",
  },
  tree: {
    title: "Árvore",
    subtitle: "Sombra, fruto e vida",
    text: "Deus fez brotar \"toda a árvore agradável à vista e boa para comida\" (Gn 2:9). À sombra dos carvalhos de Manre, Abraão recebeu o Senhor (Gn 18:1); debaixo delas os patriarcas armavam tenda e sepultavam os seus. A Escritura começa e termina junto a uma árvore: a da vida, no meio do jardim (Gn 2:9), e à beira do rio na Nova Jerusalém, com folhas \"para a saúde das nações\" (Ap 22:2).",
  },
  star: {
    title: "Estrela",
    subtitle: "As luzes do céu e a promessa",
    text: "Postas no firmamento no quarto dia \"para sinais e para tempos determinados\" (Gn 1:16), as estrelas se tornaram a medida da promessa: \"Olha para os céus e conta as estrelas... assim será a tua descendência\", disse Deus a Abraão (Gn 15:5). Delas o salmista canta que Deus \"conta o número das estrelas e chama-as todas pelos seus nomes\" (Sl 147:4); e de Jacó se ergueria uma Estrela (Nm 24:17).",
  },
  church: {
    title: "Construção da cidade",
    subtitle: "Os edifícios do mundo antigo",
    text: "As cidades antigas se erguiam em pedra e tijolo — casas, templos e torres agrupados dentro das muralhas. Desde Enoque, a primeira cidade (Gn 4:17), e Babel (Gn 11), a Escritura observa com cuidado o que o homem constrói: pode ser abrigo e ordem, ou monumento à própria glória. Por isso Abraão preferiu a tenda, \"esperando a cidade que tem fundamentos, da qual o artífice e construtor é Deus\" (Hb 11:10).",
  },
  throne: {
    title: "O trono",
    subtitle: "Assento de quem governa",
    text: "O trono era o lugar do poder: dele se julgava e se reinava. Faraó disse a José: \"somente no trono eu serei maior do que tu\" (Gn 41:40). Mas a Bíblia insiste que há um trono acima de todos — \"o Senhor estabeleceu o seu trono nos céus, e o seu reino domina sobre tudo\" (Sl 103:19) —, o mesmo que João veria posto no céu, com Alguém assentado sobre ele (Ap 4:2).",
  },
  bowl: {
    title: "Taça",
    subtitle: "Vaso de servir à mesa e no culto",
    text: "Taças e vasilhas serviam água, leite, vinho e azeite à mesa e nas ofertas. José escondeu a sua taça de prata no saco de Benjamim para reencontrar os irmãos (Gn 44:2). A Bíblia faz da taça a medida do que se recebe da mão de Deus — \"o Senhor é a porção da minha herança e o meu cálice\" (Sl 16:5) —, para bênção que transborda (Sl 23:5) ou para juízo (Ap 16).",
  },
  altar: {
    title: "O altar",
    subtitle: "Onde se adora e se sacrifica",
    text: "Altar quer dizer \"lugar alto\" onde se oferece a Deus. Ao sair da arca, Noé \"edificou um altar ao Senhor\" (Gn 8:20); Abraão os levantou por onde passou (Gn 12:7-8) e, no monte Moriá, ergueu o altar do cordeiro que Deus proveu (Gn 22:9-14). Cada altar é um encontro: sangue derramado, fumaça que sobe e a certeza de que \"o Senhor proverá\" (Gn 22:14).",
  },
  scroll: {
    title: "O rolo",
    subtitle: "A palavra escrita",
    text: "No mundo antigo, os textos eram rolos de papiro ou couro, guardados com zelo e lidos em voz alta. A Bíblia dá enorme peso ao que está escrito: \"estas palavras... as escreverás\" (Dt 6:6-9). O rolo é a memória da aliança — e, no Apocalipse, o livro selado que só o Cordeiro é digno de abrir guarda o plano de Deus para a história (Ap 5:1-7).",
  },
  censer: {
    title: "Incensário de ouro",
    subtitle: "Ap 8:3-5 — as orações dos santos",
    text: "Um anjo, em pé junto ao altar, recebe muito incenso \"para o oferecer com as orações de todos os santos\" — e a fumaça sobe diante de Deus. No Templo, o incensário levava brasas do altar para queimar o incenso no Santo Lugar (Lv 16:12). É uma das cenas mais consoladoras do livro: nenhuma oração se perde — todas chegam ao trono, e quando o incensário é lançado à terra, a história se move.",
  },
  ark: {
    title: "Arca da aliança",
    subtitle: "Ap 11:19 • Êx 25:10-22",
    text: "Caixa de madeira de acácia revestida de ouro, coroada pelo propiciatório com dois querubins de asas estendidas — \"ali virei a ti\", prometeu Deus (Êx 25:22). Guardava as tábuas da Lei e sumiu da história na destruição de Jerusalém (586 a.C.); nunca mais foi vista. Em Ap 11:19, o templo de Deus se abre no céu e a arca aparece: a aliança nunca esteve perdida — estava guardada com Deus.",
  },
  trumpet: {
    title: "Trombeta",
    subtitle: "Convocação e anúncio (Êx 19:16)",
    text: "No mundo antigo, a trombeta (o shofar de Israel) convocava o povo, anunciava guerra e proclamava reis (Êx 19:16; 1Rs 1:34). Seu toque marcava as festas e o começo dos tempos sagrados. No Apocalipse, sete anjos recebem sete trombetas, e cada toque é um alarme que chama a humanidade ao arrependimento — até a sétima, que proclama: \"os reinos do mundo vieram a ser de nosso Senhor e do seu Cristo\" (Ap 11:15).",
  },
  tent: {
    title: "Tenda",
    subtitle: "A casa dos patriarcas e peregrinos",
    text: "Abraão, Isaque e Jacó viveram em tendas de pele e pelo de cabra, \"aguardando a cidade que tem fundamentos\" (Hb 11:9-10) — a casa de quem está de passagem. A imagem cresce na Bíblia inteira: Deus habitou numa tenda no deserto (o Tabernáculo), \"tabernaculou\" entre nós em Jesus (Jo 1:14), e o Apocalipse encerra anunciando: \"eis que o tabernáculo de Deus está com os homens\" (Ap 21:3).",
  },
  campfire: {
    title: "Fogueira",
    subtitle: "Brasas ao cair da noite",
    text: "No mundo antigo, a fogueira era cozinha, aquecimento e ponto de encontro ao cair da noite. Ao redor do fogo se contavam as histórias da família e se velava o rebanho. Foi junto de brasas que Pedro negou Jesus (Jo 18:18) — e ao redor de outras brasas, na praia da Galileia, que o Ressurreto o restaurou com pão, peixe e três perguntas: \"Tu me amas?\" (Jo 21:9-17). Na Bíblia, a fogueira é palco de recomeços.",
  },
  manger: { title: "Manjedoura", subtitle: "Objeto da cena", text: "Cocho de alimentação de animais. Em Lucas 2, tornou-se o primeiro berço do Salvador — sinal de que Ele veio para todos, dos pastores aos magos." },
  boat: { title: "Barco", subtitle: "Objeto da cena", text: "Os barcos de pesca do primeiro século, como os do mar da Galileia, tinham ~8 m e abrigavam uma dúzia de homens — cenário de tempestades acalmadas e de chamados de pescadores a pescadores de gente." },
  arkship: {
    title: "A arca de Noé",
    subtitle: "Gn 6:14-16 — madeira de gofer e betume",
    text: "Deus deu a Noé o projeto completo: 300 côvados de comprimento, 50 de largura e 30 de altura (cerca de 135 × 22,5 × 13,5 m) — proporções de navio que a engenharia naval moderna reconhece como estáveis. Três andares, uma janela e uma só porta, calafetada \"por dentro e por fora com betume\". Não era um barco para navegar, mas para flutuar e preservar a vida; Pedro a lê como figura da salvação (1Pe 3:20-21).",
  },
  ladder: {
    title: "A escada de Jacó",
    subtitle: "Gn 28:12-17 — \"a porta dos céus\"",
    text: "Fugindo de Esaú, Jacó dormiu ao relento com uma pedra por travesseiro — e sonhou com uma escada \"posta na terra, cujo topo tocava nos céus\", com anjos de Deus subindo e descendo por ela. Acordou dizendo: \"Na verdade o Senhor está neste lugar... esta é a casa de Deus e a porta dos céus\" — e chamou o lugar de Betel, \"casa de Deus\". Jesus tomou a imagem para si: \"vereis o céu aberto e os anjos de Deus subindo e descendo sobre o Filho do Homem\" (Jo 1:51) — Ele é a ligação entre terra e céu.",
  },
  rainbow: {
    title: "O arco-íris",
    subtitle: "Gn 9:12-17 — o sinal da aliança",
    text: "Depois do dilúvio, Deus firmou aliança com Noé, seus descendentes e \"toda alma vivente\": nunca mais as águas destruiriam a terra. O sinal escolhido foi o arco nas nuvens — na linguagem do mundo antigo, um arco de guerra pendurado, apontado para longe da terra: a arma da tempestade virou promessa de paz. O arco reaparece ao redor do trono de Deus (Ez 1:28; Ap 4:3): a aliança continua de pé.",
  },
  ziggurat: {
    title: "A torre de Babel",
    subtitle: "Gn 11:4 — \"um cume que toque nos céus\"",
    text: "\"Edifiquemos uma cidade e uma torre cujo cume toque nos céus, e façamo-nos um nome, para que não sejamos espalhados sobre a face de toda a terra\" (Gn 11:4). Era um zigurate — a torre-templo mesopotâmica de tijolo cru e betume, feita de terraços que recuavam ao subir, com uma escadaria monumental para o alto. O projeto não tinha nada de errado na engenharia; o erro estava no coração: subir até Deus pela própria glória, contra a ordem de \"encher a terra\". Deus desceu, confundiu a língua única e os espalhou — e do nome que quiseram fazer sobrou \"Babel\", confusão (Gn 11:9).",
  },
  sheaf: {
    title: "O feixe de trigo",
    subtitle: "Gn 37:5-8 — o sonho de José",
    text: "\"Eis que estávamos atando molhos no meio do campo, e o meu molho se levantava... e os vossos molhos o rodeavam e se inclinavam ao meu\" — o primeiro sonho de José, que fez os irmãos o odiarem ainda mais. Anos depois, na fome, eles se curvariam de fato diante do governador do Egito, sem saber que era ele (Gn 42:6). O feixe — os talos de cereal atados após a ceifa — era o retrato da colheita e do sustento que José um dia administraria para salvar nações.",
  },
  // ---- Éden (Gn 2–3) ----
  treeOfLife: {
    title: "A árvore da vida",
    subtitle: "Gn 2:9; 3:22 • Ap 22:2",
    text: "\"Fez o Senhor Deus brotar da terra toda a árvore agradável à vista e boa para comida; e a árvore da vida no meio do jardim\" (Gn 2:9). Depois da queda, o acesso a ela foi barrado — \"para que não estenda a sua mão, e tome também da árvore da vida, e coma, e viva eternamente\" (Gn 3:22) —, não por mesquinhez, mas para que ninguém ficasse eternamente preso à condição caída. A Bíblia termina com ela restituída: na Nova Jerusalém dá fruto de mês em mês, \"e as suas folhas são para a saúde das nações\" (Ap 22:2).",
  },
  treeOfKnowledge: {
    title: "A árvore do conhecimento do bem e do mal",
    subtitle: "Gn 2:17 — o único limite do jardim",
    text: "No jardim inteiro havia liberdade — \"de toda a árvore do jardim comerás livremente\" — e um só limite: \"mas da árvore do conhecimento do bem e do mal, dela não comerás; porque no dia em que dela comeres, certamente morrerás\" (Gn 2:16-17). Ela não era feia nem escondida: era \"boa para se comer, agradável aos olhos e árvore desejável para dar entendimento\" (Gn 3:6) — a tentação veio embrulhada em beleza. Comer dela não foi ganhar sabedoria, mas tomar para si o direito de decidir, à revelia de Deus, o que é bem e o que é mal.",
  },
  edenRiver: {
    title: "O rio do Éden",
    subtitle: "Gn 2:10 — \"saía um rio do Éden para regar o jardim\"",
    text: "\"E saía um rio do Éden para regar o jardim; e dali se dividia e se tornava em quatro braços\" (Gn 2:10). Num mundo em que toda a vida dependia da água, o texto apresenta o jardim como nascente: a bênção começa em Deus, rega o Éden e transborda para a terra inteira. A imagem atravessa toda a Bíblia — o rio que alegra a cidade de Deus (Sl 46:4), as águas que saem do templo e curam tudo por onde passam (Ez 47) e, no fim, o rio da água da vida que procede do trono (Ap 22:1).",
  },
  riverFork: {
    title: "Os quatro rios",
    subtitle: "Gn 2:11-14 — Pisom, Giom, Tigre e Eufrates",
    text: "Do rio do Éden saíam quatro braços: o Pisom, que rodeava Havilá, terra de ouro, bdélio e ônix; o Giom, que rodeava toda a terra de Cuxe; o Hidéquel (o Tigre), que corria ao oriente da Assíria; e o Eufrates (Gn 2:11-14). Dois deles ainda existem e banham a Mesopotâmia — o berço das primeiras civilizações —, o que ancora a narrativa em geografia real; os outros dois nunca foram identificados com certeza. Quatro é o número dos pontos cardeais: a vida que nasce no jardim é enviada para todos os cantos da terra.",
  },
  flamingSword: {
    title: "A espada inflamada",
    subtitle: "Gn 3:24 — guardando o caminho da árvore da vida",
    text: "\"E havendo lançado fora o homem, pôs querubins ao oriente do jardim do Éden, e uma espada inflamada que andava ao redor, para guardar o caminho da árvore da vida\" (Gn 3:24). Ninguém a empunha: ela se revolve sozinha, e o fogo é o sinal constante da santidade de Deus — a sarça que arde (Êx 3:2), a coluna de fogo (Êx 13:21), o \"fogo consumidor\" de Hb 12:29. O caminho fechado naquele dia só tornaria a se abrir por outro caminho: \"Eu sou o caminho\" (Jo 14:6) — e o véu do templo rasgado de alto a baixo (Mt 27:51).",
  },
  cherub: {
    title: "Querubim",
    subtitle: "Gn 3:24 • Êx 25:18-22",
    text: "Os querubins aparecem na Bíblia como guardiões da presença de Deus: postos ao oriente do Éden para guardar o caminho da árvore da vida (Gn 3:24) e batidos em ouro sobre o propiciatório da arca, com as asas estendidas para cima e o rosto voltado para a tampa (Êx 25:18-22). Não são os bebês alados da arte renascentista: Ezequiel os vê como criaturas imponentes, de muitas faces e asas, sustentando a glória de Deus (Ez 1; 10). E onde eles estão, Deus marcou encontro: \"ali virei a ti, e falarei contigo de cima do propiciatório\" (Êx 25:22).",
  },
  // ---- luminares e criaturas do primeiro capítulo ----
  sun: {
    title: "O sol",
    subtitle: "Gn 1:14-16 — o luminar maior",
    text: "No quarto dia Deus disse: \"Haja luminares na expansão dos céus, para haver separação entre o dia e a noite; e sejam eles para sinais e para tempos determinados e para dias e anos\" (Gn 1:14). O texto chama o sol apenas de \"luminar maior, para governar o dia\" — sem lhe dar nome próprio, numa recusa deliberada dos cultos vizinhos que o adoravam como divindade. Aqui ele é criatura e servo: marca as estações, o calendário e as festas do povo de Deus, e é sinal daquele que \"faz nascer o seu sol sobre maus e bons\" (Mt 5:45).",
  },
  moon: {
    title: "A lua",
    subtitle: "Gn 1:16 — o luminar menor",
    text: "\"E fez Deus os dois grandes luminares: o luminar maior para governar o dia, e o luminar menor para governar a noite\" (Gn 1:16). A lua não tem luz própria: reflete a do sol — e era por suas fases que Israel contava os meses e marcava as festas, pois \"designou a lua para as estações\" (Sl 104:19). Também dela a Bíblia retira qualquer divindade: é lâmpada pendurada por Deus para que a noite nunca seja escuridão total.",
  },
  starfield: {
    title: "As estrelas",
    subtitle: "Gn 1:16 — \"e fez também as estrelas\"",
    text: "A frase é quase casual — \"e fez também as estrelas\" — e é justamente esse o ponto: o que os povos antigos adoravam e consultavam, Gênesis anota como um detalhe da obra do quarto dia. Junto com o sol e a lua, elas servem \"para sinais e para tempos determinados e para dias e anos\" (Gn 1:14): calendário, orientação e beleza. Foi olhando para elas que Abraão ouviu a promessa \"assim será a tua descendência\" (Gn 15:5), e delas o salmista diz que Deus \"conta o número das estrelas; chama-as a todas pelos seus nomes\" (Sl 147:4).",
  },
  birds: {
    title: "As aves",
    subtitle: "Gn 1:20-22 — o quinto dia",
    text: "\"Produzam as águas abundantemente répteis de alma vivente; e voem as aves sobre a face da expansão dos céus\" (Gn 1:20). As aves e os seres do mar são os primeiros a receber uma bênção explícita do Criador: \"Frutificai e multiplicai-vos... e as aves se multipliquem na terra\" (Gn 1:22) — a vida já nasce abençoada, não por acaso. Jesus voltaria a esse mesmo quadro para ensinar confiança: \"Olhai para as aves do céu... e vosso Pai celestial as alimenta\" (Mt 6:26).",
  },
  firmament: {
    title: "O firmamento",
    subtitle: "Gn 1:6-8 — a expansão do segundo dia",
    text: "\"Haja uma expansão no meio das águas, e haja separação entre águas e águas\" (Gn 1:6). No segundo dia Deus abre um espaço — o hebraico raqia sugere algo estendido, como lâmina batida — e separa as águas de cima das águas de baixo, chamando a expansão de \"céus\". É o lugar onde depois serão postos os luminares (v.14) e por onde voarão as aves (v.20): antes de encher a criação de vida, Deus prepara o espaço em que a vida vai caber.",
  },
};

// ============================================================================
// SOBREPOSIÇÕES POR LIVRO — quando um livro dá um sentido próprio ao mesmo
// papel/objeto. Vence a ficha-base quando o `bookId` bate.
// ============================================================================

/** Atores com leitura específica de um livro. */
export const ACTOR_INFO_BY_BOOK: Record<string, Record<string, StageInfo>> = {
  // ÊXODO — o Faraó da opressão (não o de José) e o povo escravizado.
  exodus: {
    farao: {
      title: "Faraó",
      subtitle: "O rei que não conheceu a José (Êx 1:8)",
      text: "\"Levantou-se um novo rei sobre o Egito, que não conhecera a José\" (Êx 1:8). Vendo Israel crescer, escravizou o povo com trabalhos duros e ordenou lançar os meninos ao rio (Êx 1:11-22). Tido como deus vivo pelos egípcios, endureceu o coração diante de Deus praga após praga — até o mar se fechar sobre o seu exército. É a figura de todo poder humano que se ergue contra o Senhor e diz: \"Quem é o Senhor, para que ouça a sua voz?\" (Êx 5:2).",
    },
    multidao: {
      title: "Os filhos de Israel",
      subtitle: "O povo escravizado no Egito (Êx 1:7-14)",
      text: "A família de setenta que desceu com Jacó tornou-se um povo que \"a terra se encheu deles\" (Êx 1:7). Escravizados em barro e tijolos, \"suspiraram por causa da servidão, e clamaram; e o seu clamor subiu a Deus\" (Êx 2:23). Deus ouviu, lembrou-se da aliança com Abraão, Isaque e Jacó, e desceu para os livrar — o nascimento de Israel como nação começa neste gemido.",
    },
  },
  // APOCALIPSE — a leitura simbólica das visões de Patmos.
  revelation: {
    anjo: {
      title: "O anjo da igreja",
      subtitle: "Mensageiro (Ap 1:20)",
      text: "\"Anjo\" (grego ángelos) significa mensageiro. Em Apocalipse, as sete estrelas \"são os anjos das sete igrejas\" — entendidos como os mensageiros celestiais que representam cada comunidade, ou, para muitos estudiosos, os líderes/pastores responsáveis por entregar e viver a mensagem. Cada carta de Ap 2–3 é endereçada a um deles.",
    },
    multidao: {
      title: "A grande multidão",
      subtitle: "Os redimidos de todas as nações (Ap 7:9)",
      text: "\"Multidão que ninguém podia contar, de todas as nações, tribos, povos e línguas\", vestida de branco e com palmas nas mãos — símbolo de vitória e festa (como na entrada de Jesus em Jerusalém, Jo 12:13). São os que \"lavaram as suas vestes no sangue do Cordeiro\" (Ap 7:14).",
    },
    mulher: {
      title: "A mulher vestida de sol",
      subtitle: "Sinal no céu (Ap 12:1)",
      text: "Vestida de sol, com a lua debaixo dos pés e coroa de doze estrelas, dá à luz o Filho que regerá as nações. Desde os primeiros séculos é lida como o povo de Deus (as doze tribos/Israel fiel) que gera o Messias — e muitos também veem nela a figura de Maria.",
    },
    hero: {
      title: "Você",
      subtitle: "Testemunha da visão",
      text: "Seu Devocionalzeiro caminha ao lado de João como testemunha das visões de Patmos. \"Bem-aventurado aquele que lê, e os que ouvem as palavras desta profecia\" (Ap 1:3) — você está dentro da cena para ver, ouvir e guardar.",
    },
  },
};

/** Objetos com leitura específica de um livro. */
export const PROP_INFO_BY_BOOK: Record<string, Record<string, StageInfo>> = {
  // APOCALIPSE — a ilha de Patmos e os símbolos das visões.
  revelation: {
    river: {
      title: "O rio da água da vida",
      subtitle: "Ap 22:1 — claro como cristal",
      text: "\"Mostrou-me o rio puro da água da vida, claro como cristal, que procedia do trono de Deus e do Cordeiro.\" É o Éden restaurado (Gn 2:10) e a promessa de Jesus cumprida: \"quem beber da água que eu lhe der nunca terá sede\" (Jo 4:14). Às suas margens, a árvore da vida dá fruto o ano inteiro — e suas folhas são para a cura das nações.",
    },
    stall: {
      title: "Banca de mercado",
      subtitle: "O comércio da ágora",
      text: "As sete cidades de Ap 2–3 eram centros comerciais da Ásia Menor — Éfeso tinha um dos maiores portos da região. Nas bancas da ágora (praça do mercado) se vendiam romãs, uvas, azeite e cerâmica. É nesse mundo de negócios e culto imperial que os cristãos foram chamados a ser fiéis.",
    },
    lampstand: {
      title: "Castiçal de ouro",
      subtitle: "As sete igrejas (Ap 1:20)",
      text: "\"Os sete castiçais que viste são as sete igrejas.\" O castiçal (grego lychnía) remete à menorá do Tabernáculo (Êx 25:31-40): a igreja existe para sustentar a luz. Cristo anda \"no meio dos castiçais\" — presente entre as suas igrejas — e adverte: quem abandona o primeiro amor pode ter o castiçal removido (Ap 2:5).",
    },
    palm: {
      title: "Palmeira",
      subtitle: "Vegetação de Patmos",
      text: "Patmos é uma pequena ilha rochosa do mar Egeu (~34 km²), no arquipélago do Dodecaneso, usada por Roma como local de exílio. Palmeiras e oliveiras pontuavam suas enseadas. Na Bíblia, a palma é símbolo de justo florescente (Sl 92:12) e de vitória (Ap 7:9).",
    },
    rock: {
      title: "Rochas de Patmos",
      subtitle: "A ilha do exílio",
      text: "A ilha é montanhosa e árida — um lugar duro para um exilado. A tradição aponta a \"Gruta do Apocalipse\", onde João teria recebido as visões; sobre ela ergueu-se depois o mosteiro de São João (hoje patrimônio mundial da UNESCO).",
    },
    door: {
      title: "A porta",
      subtitle: "Ap 3:8 e Ap 3:20",
      text: "A Filadélfia, Cristo diz: \"pus diante de ti uma porta aberta que ninguém pode fechar\" — oportunidade e acesso garantidos por Ele. E a Laodicéia: \"Eis que estou à porta e bato\" — o Senhor pede entrada na casa (e no coração) de quem esfriou. Duas portas, dois convites.",
    },
    tower: {
      title: "Torres da cidade",
      subtitle: "Cidades da Ásia Menor",
      text: "As sete cidades de Ap 2–3 (Éfeso, Esmirna, Pérgamo, Tiatira, Sardes, Filadélfia e Laodicéia) eram centros prósperos da província romana da Ásia, com muralhas, templos e teatros. Ficavam numa rota circular de ~500 km — a ordem das cartas segue o caminho do mensageiro.",
    },
    tree: {
      title: "Árvore da vida",
      subtitle: "Ap 2:7 • Ap 22:2",
      text: "Perdida no Éden (Gn 3:22-24), a árvore da vida reaparece no paraíso de Deus: \"Ao que vencer, dar-lhe-ei a comer da árvore da vida\". Na Nova Jerusalém ela frutifica todos os meses, e suas folhas servem \"para a saúde das nações\" — a história termina onde começou, com a vida restaurada.",
    },
    star: {
      title: "Estrela",
      subtitle: "As sete estrelas (Ap 1:20)",
      text: "\"As sete estrelas são os anjos das sete igrejas.\" Estão na DESTRA de Cristo — os mensageiros e as comunidades estão seguros na mão dele. A Tiatira é prometida ainda \"a estrela da manhã\" (Ap 2:28): o próprio Cristo (Ap 22:16).",
    },
    church: {
      title: "Igreja da Ásia",
      subtitle: "Comunidade cristã do séc. I",
      text: "As primeiras igrejas se reuniam em casas ampliadas e salões — comunidades pequenas em cidades grandes e hostis. Às sete delas Cristo dita cartas com o mesmo esqueleto: \"Conheço as tuas obras… quem tem ouvidos, ouça… ao que vencer\". Elogio, correção e promessa — o cuidado do Pastor por cada rebanho local.",
    },
    throne: {
      title: "O trono de Deus",
      subtitle: "Ap 4:2-3 — o centro do céu",
      text: "\"Eis que um trono estava posto no céu, e um assentado sobre o trono.\" João não descreve o rosto de quem está assentado — apenas o brilho de pedras preciosas (jaspe e sardônio) e, ao redor, \"um arco celeste semelhante à esmeralda\": glória demais para palavras, aliança demais para medo (o arco lembra Gn 9). A palavra \"trono\" aparece mais de 40 vezes no Apocalipse: enquanto César parecia mandar na história, o livro insiste que o governo do universo tem dono.",
    },
    bowl: {
      title: "Taça de ouro",
      subtitle: "As sete taças (Ap 15:7)",
      text: "Um dos quatro seres viventes entrega aos sete anjos \"sete taças de ouro, cheias da ira de Deus\". Diferentes dos selos e das trombetas (juízos parciais, de aviso), as taças são derramadas por inteiro — o juízo final sobre um mundo que se recusou a se arrepender (Ap 16:9). As pragas ecoam as do Egito (Êx 7–12): a mesma justiça que um dia libertou os escravos.",
    },
    altar: {
      title: "O altar celestial",
      subtitle: "Ap 6:9 • Ap 8:3",
      text: "Debaixo do altar, João vê \"as almas dos que foram mortos por causa da palavra de Deus\" clamando: \"Até quando?\". No Templo de Jerusalém havia dois altares — o do sacrifício, no pátio, e o do incenso, junto ao Santo Lugar — e os dois ecoam no céu: o sangue dos mártires e as orações dos santos sobem juntos diante de Deus. A resposta vem com vestes brancas: \"repousem ainda um pouco de tempo\" (Ap 6:11).",
    },
    scroll: {
      title: "O livro selado",
      subtitle: "Ap 5:1 — escrito por dentro e por fora",
      text: "Na destra daquele que está no trono, João vê um rolo \"escrito por dentro e por fora, selado com sete selos\" — o plano de Deus para a história. Ninguém no céu, na terra ou debaixo da terra era digno de abri-lo, e João chorou muito... até que o Cordeiro tomou o livro (Ap 5:7). No 1º século, os livros eram rolos de papiro ou pergaminho, e os selos de cera garantiam que só o herdeiro legítimo abrisse o documento.",
    },
    trumpet: {
      title: "Trombeta",
      subtitle: "As sete trombetas (Ap 8–11)",
      text: "No mundo antigo, a trombeta (o shofar de Israel) convocava o povo, anunciava guerra e proclamava reis (Êx 19:16; 1Rs 1:34). Em Apocalipse 8, sete anjos recebem sete trombetas: cada toque desencadeia um juízo parcial — um alarme que chama a humanidade ao arrependimento antes do fim. A sétima não traz praga, mas proclamação: \"os reinos do mundo vieram a ser de nosso Senhor e do seu Cristo\" (Ap 11:15).",
    },
    well: {
      title: "Poço da cidade",
      subtitle: "Vida cotidiana do 1º século",
      text: "O poço era o coração da cidade antiga: ali se tirava água, se fechavam acordos e se encontravam viajantes — como Eliézer e Rebeca (Gn 24) e Jesus com a samaritana (Jo 4:6-14). Junto a um poço, Jesus se apresentou como a fonte da \"água viva\" que jorra para a vida eterna.",
    },
  },
};

/** Ficha ESPECÍFICA de um personagem pelo seu `id` de cena (Caim, Raquel, Ló…),
 *  ou null se aquele id não tiver ficha própria (é um extra anônimo). */
export function namedActorInfo(id?: string): StageInfo | null {
  return id ? (CHAR_INFO[id] ?? null) : null;
}

/** Ficha de um ator do palco. Prioridade: personagem específico (id) → figura
 *  específica DAQUELE capítulo (livro+cap+papel) → leitura do livro (bookId) →
 *  papel genérico. Assim a "mulher" de Gn 4 mostra a esposa de Caim, e nunca
 *  uma explicação genérica de "habitante da cena". */
export function actorInfo(role: string, bookId?: string, id?: string, chapter?: number): StageInfo | null {
  const byId = namedActorInfo(id);
  if (byId) return byId;
  const byChapter = bookId && chapter != null
    ? ACTOR_INFO_BY_CHAPTER[bookId]?.[chapter]?.[role]
    : undefined;
  if (byChapter) return byChapter;
  const override = bookId ? ACTOR_INFO_BY_BOOK[bookId]?.[role] : undefined;
  return override ?? ACTOR_INFO[role] ?? null;
}

/** Ficha de um objeto/estrutura do palco (por kind), na leitura do livro atual. */
export function propInfo(kind: string, bookId?: string): StageInfo | null {
  const override = bookId ? PROP_INFO_BY_BOOK[bookId]?.[kind] : undefined;
  return override ?? PROP_INFO[kind] ?? null;
}

// ============================================================================
// OBJETOS-MARCO vs. CENÁRIO. Nem todo objeto merece ficha: uma rocha qualquer,
// uma árvore de fundo, uma moita são só cenário e NÃO mostram badge "?". Só
// ganham ficha (1) objetos de tipo já intrinsecamente específico (a árvore da
// vida, a torre de Babel, a arca, o altar, o trono, os luminares…), (2) objetos
// a que o LIVRO deu sentido próprio (os sete castiçais de Apocalipse) ou (3)
// objetos comuns ETIQUETADOS naquela cena como um marco (a coluna de Betel, o
// poço de Rebeca) — via `tag` no prop, apontando para PROP_TAG_INFO.
// ============================================================================

/** Tipos puramente decorativos: sem etiqueta e sem leitura própria do livro,
 *  não mostram ficha alguma — são apenas paisagem. */
const AMBIENT_KINDS = new Set<string>([
  "rock", "tree", "bush", "grass", "palm", "star", "amphora", "crate",
  "campfire", "tent", "stall", "well", "tower", "door", "church", "river",
  "lampstand",
]);

/** Fichas de OBJETOS-MARCO específicos de uma cena (etiquetados com `tag`). */
export const PROP_TAG_INFO: Record<string, StageInfo> = {
  "sarca-ardente": {
    title: "A sarça ardente",
    subtitle: "Êx 3:2-5 — o fogo que não consome",
    text: "\"Apareceu-lhe o anjo do Senhor em uma chama de fogo do meio duma sarça; e olhou, e eis que a sarça ardia no fogo, e a sarça não se consumia\" (Êx 3:2). Do meio dela veio a voz: \"tira os sapatos de teus pés; porque o lugar em que tu estás é terra santa\" (Êx 3:5). A moita comum que arde sem se gastar é a imagem do Deus vivo que se aproxima do homem sem ser diminuído — e ali revela o seu Nome: EU SOU O QUE SOU (Êx 3:14)." },
  "poco-midia": {
    title: "O poço de Midiã",
    subtitle: "Êx 2:15-21 — onde Moisés achou refúgio",
    text: "Fugindo de Faraó, Moisés \"assentou-se junto a um poço\" na terra de Midiã (Êx 2:15). Ali defendeu as sete filhas do sacerdote, expulsas pelos pastores, e deu de beber ao rebanho delas (Êx 2:16-17). Como nos poços dos patriarcas, foi junto às águas que Deus lhe deu casa, esposa e o descanso de quarenta anos antes do chamado — o pastor sendo preparado para pastorear um povo." },
  "cesto-moises": {
    title: "A arca de juncos",
    subtitle: "Êx 2:3 — o cesto no Nilo",
    text: "\"Tomou uma arca de juncos, e a revestiu com barro e betume; e, pondo nela o menino, a pôs nos juncos à margem do rio\" (Êx 2:3). A palavra usada para \"arca\" é a mesma da arca de Noé: um pequeno barco de salvação sobre as águas. O rio que Faraó fizera túmulo dos meninos hebreus tornou-se, para este, o caminho da vida — e o levou das águas ao próprio palácio do rei." },
  "coluna-betel": {
    title: "A coluna de Betel",
    subtitle: "Gn 28:18-22 • 35:14 — a pedra que virou altar",
    text: "A pedra que Jacó pusera por travesseiro, ao acordar do sonho da escada, ele a levantou por coluna e derramou azeite sobre ela: \"Esta pedra... será casa de Deus\" (Gn 28:18-22). Voltando a Betel vinte anos depois, tornou a erguer ali uma coluna de pedra, com libação e azeite (Gn 35:14). Marco de encontro com Deus, a coluna transforma o chão comum em \"a casa de Deus e a porta dos céus\"." },
  "sepulcro-raquel": {
    title: "A coluna da sepultura de Raquel",
    subtitle: "Gn 35:19-20 — no caminho de Efrata",
    text: "\"Assim morreu Raquel, e foi sepultada no caminho de Efrata, que é Belém. E Jacó pôs uma coluna sobre a sua sepultura; esta é a coluna da sepultura de Raquel até o dia de hoje\" (Gn 35:19-20). A pedra em pé guarda o lugar onde a amada de Jacó deu à luz Benjamim e expirou — a memória de um amor e de um luto fincada à beira da estrada, séculos antes de Belém receber outro nascimento." },
  "mizpa": {
    title: "O montão de Mispá",
    subtitle: "Gn 31:44-49 — \"Atente o Senhor entre mim e ti\"",
    text: "Ao se separarem, Jacó e Labão fizeram uma aliança e ajuntaram pedras num montão, comendo sobre ele (Gn 31:46). Chamaram-no Galeede e Mispá — \"atalaia\" —, dizendo: \"Atente o Senhor entre mim e ti, quando nós estivermos apartados um do outro\" (Gn 31:49). O montão de pedras ficou como testemunha silenciosa de um pacto de não se fazerem mal — a fronteira selada diante de Deus." },
  "poco-rebeca": {
    title: "O poço de Naor",
    subtitle: "Gn 24:11-27 — onde a oração foi respondida",
    text: "Junto a este poço, à tarde, \"quando as moças saíam a tirar água\", o servo de Abraão orou por um sinal: aquela que desse de beber a ele e aos camelos seria a escolhida (Gn 24:11-14). Antes de acabar de falar, Rebeca desceu, encheu o cântaro e correu a dar água a dez camelos sedentos (Gn 24:15-20). O poço tornou-se o palco da providência: \"estando eu no caminho, o Senhor me guiou\" (Gn 24:27)." },
  "poco-jaco": {
    title: "O poço de Harã",
    subtitle: "Gn 29:2-10 — o encontro de Jacó e Raquel",
    text: "No campo havia um poço com uma grande pedra sobre a boca, que só se removia quando todos os rebanhos se ajuntavam (Gn 29:2-3). Ao ver Raquel chegando com as ovelhas do pai, Jacó, sozinho, revolveu a pedra e deu de beber ao rebanho dela — e chorou de emoção ao beijá-la (Gn 29:10-11). Como no poço de sua mãe Rebeca, foi junto às águas que a história da aliança encontrou a próxima matriarca." },
  "poco-berseba": {
    title: "O poço de Berseba",
    subtitle: "Gn 21:30-31 • 26:32-33 — o poço do juramento",
    text: "Abraão cavou este poço e, por causa de uma contenda, firmou aliança com Abimeleque, dando-lhe sete cordeiras \"para que me sejam por testemunho de que eu cavei este poço\" (Gn 21:30). Por isso o lugar se chamou Berseba, \"poço do juramento\" (Gn 21:31). Gerações depois, os servos de Isaque acharam ali água no mesmo dia em que ele renovava o pacto — e ele confirmou o nome (Gn 26:32-33)." },
  "poco-agar": {
    title: "Beer-Laai-Roi",
    subtitle: "Gn 16:13-14 — \"o poço daquele que vive e me vê\"",
    text: "Foi no deserto, junto a uma fonte de água, que o anjo do Senhor achou Agar em fuga (Gn 16:7). Ela chamou o Senhor que lhe falou de \"Deus que me vê\", e por isso o poço recebeu o nome de Beer-Laai-Roi — \"o poço daquele que vive e me vê\" (Gn 16:13-14). Anos depois, era perto desse mesmo poço que habitava Isaque quando saiu ao campo a meditar, e viu chegarem os camelos de Rebeca (Gn 24:62-63)." },
  "altar-moria": {
    title: "O altar de Moriá",
    subtitle: "Gn 22:9-14 — \"o Senhor proverá\"",
    text: "\"Edificou Abraão ali um altar... e amarrou a Isaque, seu filho, e deitou-o sobre o altar, em cima da lenha\" (Gn 22:9). Sobre esta pedra a mão se ergueu com o cutelo — e o céu bradou a tempo, e um carneiro travado no mato morreu em lugar do filho (Gn 22:13). Abraão chamou o lugar \"O Senhor proverá\"; a tradição vê no monte Moriá o mesmo do templo (2Cr 3:1) — e, séculos adiante, outro Filho carregaria a sua lenha por aquele monte." },
  "altar-betel": {
    title: "O altar de El-Betel",
    subtitle: "Gn 35:1,7 — \"o Deus de Betel\"",
    text: "De volta a Betel por ordem de Deus, Jacó edificou um altar e chamou o lugar El-Betel — \"o Deus da casa de Deus\" —, \"porquanto Deus ali se lhe tinha manifestado, quando fugia da face de seu irmão\" (Gn 35:7). É o cumprimento do voto feito vinte anos antes, ao acordar do sonho da escada (Gn 28:20-22). No mesmo lugar Deus lhe confirma o nome Israel e a promessa de Abraão (Gn 35:9-12)." },
  "altar-siquem": {
    title: "O altar El-Eloé-Israel",
    subtitle: "Gn 33:20 — \"Deus, o Deus de Israel\"",
    text: "Ao chegar salvo a Salém, cidade de Siquém, e comprar ali o seu primeiro campo em Canaã, Jacó \"levantou ali um altar, e chamou-lhe El-Eloé-Israel\" — \"Deus, o Deus de Israel\" (Gn 33:20). O homem que acabara de receber o nome novo no vau de Jaboque (Gn 32:28) grava-o agora em pedra: o Deus com quem lutou é o seu Deus. É o primeiro altar erguido na Terra Prometida depois do retorno." },
  "cova-macpela": {
    title: "A cova de Macpela",
    subtitle: "Gn 23:17-20 — o primeiro chão da promessa",
    text: "Comprada por Abraão a Efrom, o heteu, por quatrocentos siclos de prata \"corrente entre mercadores\" (Gn 23:16), a cova no campo de Macpela, em frente de Manre, foi o primeiro pedaço da Terra Prometida que a família de fato possuiu — e um túmulo. Ali Abraão sepultou Sara (Gn 23:19), e ali foram recolhidos ele mesmo, Isaque, Rebeca, Lia e Jacó (Gn 49:31; 50:13). O sepulcro dos patriarcas em Hebrom guarda até hoje a memória da aliança fincada em terra." },
  "cisterna-jose": {
    title: "A cisterna de Dotã",
    subtitle: "Gn 37:24 — a cova seca onde José foi lançado",
    text: "Poço sem água no campo de Dotã, onde os irmãos lançaram José depois de lhe arrancarem a túnica de várias cores (Gn 37:23-24). Enquanto o menino clamava do fundo, eles assentaram-se a comer pão — e dali o venderam por vinte moedas de prata aos ismaelitas que desciam ao Egito (Gn 37:25-28). A cova que parecia o fim foi o começo do caminho que salvaria muitos povos (Gn 45:5-7)." },
  "taca-jose": {
    title: "A taça de prata de José",
    subtitle: "Gn 44:2 — o copo escondido no saco de Benjamim",
    text: "Copo de prata do governador do Egito, \"pelo qual ele bem adivinha\", que José mandou esconder na boca do saco de Benjamim (Gn 44:2,5). Achado na busca, tornou-se a prova que prenderia o irmão mais novo — e a ocasião do maior discurso de Gênesis, quando Judá se oferece como escravo em lugar do moço, para não ver a dor do pai (Gn 44:12-34)." },
  "altar-berseba": {
    title: "O altar de Berseba",
    subtitle: "Gn 26:23-25 — onde Isaque invocou o Nome",
    text: "Subindo a Berseba, Isaque recebeu de noite a mesma promessa do pai — \"não temas, porque eu sou contigo\" (Gn 26:24). \"Então edificou ali um altar, e invocou o nome do Senhor, e armou ali a sua tenda\" (Gn 26:25). Foi junto a este altar que Abimeleque veio de Gerar buscar aliança: \"tu és agora o bendito do Senhor\" (Gn 26:28-29)." },

  "altar-caim": {
    title: "O altar de Caim",
    subtitle: "Gn 4:3 — a oferta do fruto da terra",
    text: "Caim, lavrador, \"trouxe do fruto da terra uma oferta ao Senhor\" (Gn 4:3). Mas \"para Caim e para a sua oferta não atentou\" (Gn 4:5) — não pelo tipo do dom, e sim pelo coração de quem o trazia, pois \"pela fé Abel ofereceu... mais excelente sacrifício\" (Hb 11:4). Diante do altar rejeitado, o rosto de Caim descaiu, e Deus o advertiu: \"o pecado jaz à porta... sobre ele deves dominar\" (Gn 4:7)." },
  "altar-abel": {
    title: "O altar de Abel",
    subtitle: "Gn 4:4 — os primogênitos do rebanho",
    text: "Abel, pastor, trouxe \"dos primogênitos das suas ovelhas, e da sua gordura; e atentou o Senhor para Abel e para a sua oferta\" (Gn 4:4). Foi o primeiro a adorar com sangue, apontando de longe para o Cordeiro. Morto pelo irmão por causa dessa fé, tornou-se a primeira testemunha: \"depois de morto, ainda fala\" (Hb 11:4), e o seu sangue clamou da terra (Gn 4:10)." },

  // ---- ÊXODO: os objetos-marco da libertação, da aliança e do tabernáculo ----
  "ossos-jose": {
    title: "Os ossos de José",
    subtitle: "Êx 13:19 — a promessa carregada por 400 anos",
    text: "\"Moisés levou consigo os ossos de José\" ao sair do Egito (Êx 13:19). Antes de morrer, José fizera Israel jurar: \"Certamente Deus vos visitará; fazei, pois, subir daqui os meus ossos convosco\" (Gn 50:25). Por quatro séculos o caixão esperou; agora seguia com o povo rumo à terra prometida, testemunho vivo de que Deus não esquece a sua palavra — e seria enterrado em Siquém (Js 24:32)." },
  "mar-vermelho": {
    title: "O Mar Vermelho",
    subtitle: "Êx 14:21-22 — o mar que se abriu",
    text: "Encurralado entre o exército de Faraó e o mar, Israel viu Moisés estender a mão: \"o Senhor fez retirar o mar por um forte vento oriental toda aquela noite... e as águas foram partidas\" (Êx 14:21). O povo passou \"em seco pelo meio do mar\", com as águas como muro à direita e à esquerda (Êx 14:22); e as mesmas águas voltaram sobre os carros do Egito. É o maior sinal do livramento: o Senhor peleja, e o seu povo se cala." },
  "aguas-mara": {
    title: "As águas de Mara",
    subtitle: "Êx 15:23-25 — o amargo que se fez doce",
    text: "Três dias no deserto sem água, e as primeiras águas que acharam eram amargas: \"por isso chamaram o lugar Mara\" — amargura (Êx 15:23). O povo murmurou, mas Moisés clamou ao Senhor, \"e o Senhor mostrou-lhe uma árvore, que lançou nas águas, e as águas se tornaram doces\" (Êx 15:25). Ali Deus se revelou como \"o Senhor que te sara\" (Êx 15:26)." },
  "arvore-mara": {
    title: "A árvore de Mara",
    subtitle: "Êx 15:25 — o madeiro lançado nas águas",
    text: "\"O Senhor mostrou-lhe uma árvore, que lançou nas águas, e as águas se tornaram doces\" (Êx 15:25). Um madeiro comum, apontado por Deus, transformou a amargura em bênção diante de todo o povo. A cena ficou como parábola: é pelo remédio que o Senhor indica — e não pela força do homem — que a vida amarga se adoça." },
  "fontes-elim": {
    title: "As fontes de Elim",
    subtitle: "Êx 15:27 — doze fontes e setenta palmeiras",
    text: "Logo depois de Mara, \"vieram a Elim, e havia ali doze fontes de água e setenta palmeiras; e ali se acamparam junto das águas\" (Êx 15:27). O oásis de descanso vem justamente após a prova da sede — doze fontes para as doze tribos, setenta palmeiras como os setenta anciãos. Deus, que provou o povo em Mara, agora o refrigera à sombra e junto às águas." },
  "rocha-horebe": {
    title: "A rocha de Horebe",
    subtitle: "Êx 17:6 — a água que saiu da pedra",
    text: "Sem água em Refidim, o povo contendeu com Moisés. Disse o Senhor: \"Eis que eu estarei ali diante de ti sobre a rocha, em Horebe, e tu ferirás a rocha, e dela sairão águas\" (Êx 17:6). Da pedra seca brotou rio para um povo inteiro — sinal tão grande que Paulo diria: \"a pedra era Cristo\" (1Co 10:4). O lugar ficou chamado Massá e Meribá, \"prova e contenda\"." },
  "cume-outeiro": {
    title: "O cume do outeiro",
    subtitle: "Êx 17:9-13 — as mãos levantadas na batalha",
    text: "Enquanto Josué pelejava contra Amaleque no vale, Moisés subiu ao cume com a vara de Deus na mão (Êx 17:9). \"Quando Moisés levantava a sua mão, Israel prevalecia; mas quando ele abaixava a sua mão, Amaleque prevalecia\" (Êx 17:11). A vitória não vinha da espada só, mas das mãos erguidas ao céu — a batalha ganha na intercessão." },
  "pedra-assento": {
    title: "A pedra onde Moisés se assentou",
    subtitle: "Êx 17:12 — sustentado por Arão e Hur",
    text: "\"As mãos de Moisés eram pesadas; por isso tomaram uma pedra, e a puseram debaixo dele, para assentar-se sobre ela; e Arão e Hur sustentaram as suas mãos, um de um lado e o outro do outro\" (Êx 17:12). Assim as mãos ficaram firmes até o pôr do sol, e Josué venceu. Nenhum servo de Deus vence sozinho: mesmo o maior precisa de quem lhe segure os braços." },
  "altar-bandeira": {
    title: "O altar \"O Senhor é minha bandeira\"",
    subtitle: "Êx 17:15 — Jeová-Nissi",
    text: "Depois da vitória sobre Amaleque, \"Moisés edificou um altar, ao qual chamou: O SENHOR É MINHA BANDEIRA\" (Êx 17:15) — em hebraico, Jeová-Nissi. A bandeira é o estandarte em torno do qual o exército se reúne: Israel não confiaria na própria força, mas se ajuntaria em nome do seu Deus, \"porquanto jurou o Senhor, haverá guerra do Senhor contra Amaleque de geração em geração\" (Êx 17:16)." },
  "altar-jetro": {
    title: "O sacrifício de Jetro",
    subtitle: "Êx 18:12 — o gentio que adora ao Senhor",
    text: "Ouvindo tudo o que Deus fizera, Jetro, o sacerdote de Midiã, exclamou: \"Agora sei que o Senhor é maior que todos os deuses\" (Êx 18:11). \"Então Jetro... tomou holocausto e sacrifícios para Deus; e veio Arão, e todos os anciãos de Israel, para comerem pão com o sogro de Moisés diante de Deus\" (Êx 18:12). Um estrangeiro à mesa da aliança — sinal de que a bênção alcançaria todas as famílias da terra." },
  "monte-sinai": {
    title: "O monte Sinai",
    subtitle: "Êx 19:18 — o monte que fumegava",
    text: "\"Todo o monte Sinai fumegava, porque o Senhor descera sobre ele em fogo; e a sua fumaça subiu como fumaça de uma fornalha, e todo o monte tremia grandemente\" (Êx 19:18). Com trovões, relâmpagos, nuvem espessa e o sonido crescente da buzina, Deus desceu para fazer aliança com o seu povo e dar a Lei. Ninguém podia tocar o monte e viver: a santidade de Deus, aproximada da terra, é fogo consumidor (Hb 12:29)." },
  "tabuas-testemunho": {
    title: "As tábuas do testemunho",
    subtitle: "Êx 31:18 — escritas pelo dedo de Deus",
    text: "\"Deu a Moisés... as duas tábuas do testemunho, tábuas de pedra, escritas pelo dedo de Deus\" (Êx 31:18). Nelas estavam os Dez Mandamentos, \"escritas de ambos os lados\" (Êx 32:15). Moisés quebrou as primeiras ao ver o bezerro de ouro (Êx 32:19); Deus mandou lavrar outras duas iguais (Êx 34:1), e essas foram guardadas dentro da arca — o coração da aliança." },
  "altar-alianca": {
    title: "O altar da aliança",
    subtitle: "Êx 24:4-8 — o sangue da aliança",
    text: "Ao pé do Sinai, Moisés \"edificou um altar... e doze monumentos, segundo as doze tribos de Israel\" (Êx 24:4). Metade do sangue dos sacrifícios foi espargida sobre o altar, a outra metade sobre o povo, com a palavra: \"Eis aqui o sangue da aliança que o Senhor tem feito convosco\" (Êx 24:8). Selada em sangue, a aliança do Sinai prefigura a nova, no sangue de Cristo (Mt 26:28)." },
  "doze-monumentos": {
    title: "As doze colunas das tribos",
    subtitle: "Êx 24:4 — o povo inteiro diante de Deus",
    text: "Junto ao altar da aliança, Moisés levantou \"doze monumentos, segundo as doze tribos de Israel\" (Êx 24:4). Cada pedra em pé representava uma tribo, todo o povo reunido para dizer a uma só voz: \"Tudo o que o Senhor tem falado faremos, e obedeceremos\" (Êx 24:7). Nenhuma tribo ficava de fora do pacto — a nação toda entrava, junto ao altar, na aliança com o seu Deus." },
  "arca-testemunho": {
    title: "A arca do testemunho",
    subtitle: "Êx 25:10-22 — o trono de Deus no meio do povo",
    text: "Caixa de madeira de acácia coberta de ouro por dentro e por fora, com coroa de ouro e quatro argolas para os varais, que nunca se tiravam (Êx 25:10-15). Dentro ia o \"testemunho\" — as duas tábuas da Lei; a ela se juntariam um vaso de ouro com maná e a vara de Arão que floresceu (Êx 16:33-34; Nm 17:10; Hb 9:4). Sobre ela, o propiciatório de ouro entre dois querubins, de onde Deus disse: \"ali virei a ti, e falarei contigo de cima do propiciatório, do meio dos dois querubins\" (Êx 25:22)." },
  "mesa-proposicao": {
    title: "A mesa dos pães da proposição",
    subtitle: "Êx 25:23-30 — o pão perante a face de Deus",
    text: "Mesa de acácia coberta de ouro puro, com coroa, moldura e varais (Êx 25:23-28). Sobre ela ficavam continuamente os pães — \"o pão da proposição perante a minha face perpetuamente\" (Êx 25:30) —, doze ao todo, um por tribo, renovados a cada sábado. No lugar santo, ao lado norte, era o sinal de que o povo da aliança comia e vivia diante do seu Deus." },
  "candelabro-ouro": {
    title: "O candelabro de ouro",
    subtitle: "Êx 25:31-40 — a luz que nunca se apaga",
    text: "A menorá: \"de ouro puro, de obra batida\", com o pé, seis hastes, copos em forma de flor de amêndoa, botões e flores, tudo de uma só peça (Êx 25:31-36). Suas sete lâmpadas ardiam diante do Senhor, alimentadas por azeite puro de oliva, postas em ordem por Arão de manhã e de tarde (Êx 27:20-21). No lugar santo sem janelas, era a única luz — a presença de Deus iluminando o seu povo." },
  "altar-incenso": {
    title: "O altar do incenso",
    subtitle: "Êx 30:1-8 — o perfume que sobe a Deus",
    text: "Pequeno altar de acácia coberto de ouro, com pontas e coroa, posto diante do véu, junto à arca (Êx 30:1-6). Sobre ele Arão queimava incenso aromático de manhã e de tarde — \"incenso contínuo perante o Senhor pelas vossas gerações\" (Êx 30:8). A fumaça perfumada que subia é figura das orações do povo diante do trono de Deus (Ap 8:3-4)." },
  "altar-holocausto": {
    title: "O altar do holocausto",
    subtitle: "Êx 27:1-8 — onde o sacrifício era queimado",
    text: "O grande altar de acácia coberto de cobre, quadrado, de cinco côvados, com pontas nos quatro cantos e um crivo de bronze (Êx 27:1-5). Ficava logo à entrada do pátio, e sobre ele ardiam os holocaustos. Era o primeiro objeto que se encontrava ao entrar: sem sangue derramado no altar, ninguém se aproximava da presença santa de Deus." },
  "altar-cobre": {
    title: "O altar de cobre",
    subtitle: "Êx 38:1-7 — o altar do holocausto, feito por Bezalel",
    text: "O altar do holocausto que Bezalel fez de madeira de acácia, coberto de cobre, com os cinzeiros, as pás, as bacias, os garfos e os braseiros, tudo de cobre (Êx 38:1-3). Sobre ele se ofereciam, cada dia, dois cordeiros — um pela manhã e outro à tarde: \"holocausto contínuo... perante o Senhor, onde vos encontrarei\" (Êx 29:38-42). O cobre resistia ao fogo que nunca se apagava." },
  "pia-cobre": {
    title: "A pia de cobre",
    subtitle: "Êx 30:18-21; 38:8 — a água da purificação",
    text: "Bacia de cobre entre a tenda e o altar, para que Arão e seus filhos lavassem as mãos e os pés antes de ministrar, \"para que não morram\" (Êx 30:20). Foi feita \"dos espelhos das mulheres que se reuniam à porta da tenda\" (Êx 38:8) — o que servia à vaidade, ofertado, virou instrumento de santidade. Diante de Deus, ninguém serve sem antes ser lavado." },
  "veu-santissimo": {
    title: "O véu do santíssimo",
    subtitle: "Êx 26:31-33 — a separação entre Deus e o homem",
    text: "Cortina de azul, púrpura e carmesim, com querubins bordados, pendurada em quatro colunas de ouro: \"este véu vos fará separação entre o santuário e o lugar santíssimo\" (Êx 26:33). Atrás dele ficava a arca; só o sumo sacerdote entrava, uma vez por ano, e com sangue. O véu dizia que o caminho à presença de Deus ainda não estava aberto — até que, na cruz, ele se rasgasse de alto a baixo (Mt 27:51)." },
  "tabernaculo": {
    title: "O tabernáculo",
    subtitle: "Êx 25:8-9 — \"habitarei no meio deles\"",
    text: "\"E me farão um santuário, e habitarei no meio deles\" (Êx 25:8). Tenda portátil de cortinas de linho com querubins, tábuas de acácia cobertas de ouro e três coberturas, feita exatamente \"conforme ao modelo\" mostrado no monte (Êx 25:9). Dividia-se em lugar santo e santíssimo, e era o coração móvel do arraial: onde Israel acampasse, Deus habitava no meio do seu povo — até encher-se da sua glória (Êx 40:34)." },
  "tenda-congregacao": {
    title: "A tenda da congregação",
    subtitle: "Êx 29:42-43 — o lugar do encontro",
    text: "Outro nome do tabernáculo: a tenda \"onde vos encontrarei, para falar contigo ali\" (Êx 29:42). À sua porta se ofereciam os holocaustos contínuos, e ali Deus prometeu: \"virei aos filhos de Israel, para que por minha glória sejam santificados\" (Êx 29:43). Era o ponto de reunião entre o Deus santo e o povo peregrino — a agenda do céu marcada na terra." },
  "tenda-moises": {
    title: "A tenda da congregação (fora do arraial)",
    subtitle: "Êx 33:7-11 — onde Deus falava face a face",
    text: "Depois do bezerro, Moisés armou a tenda \"fora do arraial, desviada longe\", e todo o que buscava o Senhor saía a ela (Êx 33:7). Quando Moisés entrava, \"descia a coluna de nuvem, e punha-se à porta da tenda; e o Senhor falava com Moisés\" (Êx 33:9). Ali \"falava o Senhor a Moisés face a face, como qualquer fala com o seu amigo\" (Êx 33:11) — intimidade rara em toda a Escritura." },
  "patio-tabernaculo": {
    title: "O pátio do tabernáculo",
    subtitle: "Êx 27:9-19 — o cerco de linho",
    text: "O tabernáculo era cercado por um pátio de cem côvados de comprimento, com cortinas de linho fino torcido penduradas em colunas de cobre com faixas de prata (Êx 27:9-18). Só havia uma entrada, uma cortina bordada ao oriente. Dentro ficavam o altar de cobre e a pia; o pátio marcava o espaço santo, separando a presença de Deus do arraial ao redor." },
  "fenda-penha": {
    title: "A fenda da penha",
    subtitle: "Êx 33:22 — abrigado enquanto a glória passa",
    text: "Moisés pediu: \"rogo-te que me mostres a tua glória\" (Êx 33:18). Deus respondeu que homem nenhum veria a sua face e viveria, mas o poria numa fenda da rocha: \"quando a minha glória passar... te cobrirei com a minha mão, até que eu haja passado\" (Êx 33:22). Escondido na rocha, coberto pela mão de Deus, Moisés o viu \"pelas costas\" — a glória é grande demais para se olhar de frente." },
  "trono-farao": {
    title: "O trono de Faraó",
    subtitle: "Êx 5–14 — o coração endurecido",
    text: "Do seu trono, o rei do Egito — tido como deus vivo — desafiou o Senhor: \"Quem é o Senhor, cuja voz eu ouvirei...? Não conheço o Senhor\" (Êx 5:2). Praga após praga, o seu coração se endureceu, até a morte dos primogênitos e o mar que tragou os seus carros. O maior império da terra dobrou-se diante do Deus dos escravos: \"os egípcios saberão que eu sou o Senhor\" (Êx 7:5)." },
  "porta-sangue": {
    title: "A porta marcada de sangue",
    subtitle: "Êx 12:7,13 — a Páscoa",
    text: "Cada família tomava um cordeiro sem mácula e punha do seu sangue \"em ambas as ombreiras, e na verga da porta\" (Êx 12:7). Naquela noite o Senhor passou ferindo os primogênitos do Egito, mas: \"vendo eu o sangue, passarei por cima de vós, e não haverá entre vós praga\" (Êx 12:13). O sangue na porta salvava a casa — a Páscoa que aponta para \"Cristo, nosso Cordeiro pascal\" (1Co 5:7)." },
  "cordeiro-assado": {
    title: "O cordeiro da Páscoa",
    subtitle: "Êx 12:8-9 — assado no fogo, comido às pressas",
    text: "\"Naquela noite comerão a carne assada no fogo, com pães ázimos; com ervas amargosas a comerão\" (Êx 12:8) — nada cru nem cozido, e sem quebrar-lhe osso (Êx 12:9,46). Comia-se de pé, com os lombos cingidos e o cajado na mão, prontos para partir: \"esta é a páscoa do Senhor\" (Êx 12:11). O cordeiro sem mácula, cujo sangue livrava e cuja carne alimentava, é figura de Cristo (Jo 19:36)." },
  "oferta-alcada": {
    title: "A oferta alçada",
    subtitle: "Êx 25:2-7 — o coração que dá de boa vontade",
    text: "Para erguer o santuário, Deus não mandou cobrar, mas convidar: \"de todo o homem cujo coração se mover voluntariamente, dele tomareis a minha oferta alçada\" (Êx 25:2). Ouro, prata, cobre, tecidos, peles, madeira, pedras preciosas — cada um trazia o que tinha. A morada de Deus no meio do povo nasceu de ofertas espontâneas, não de imposto." },
  "ofertas-santuario": {
    title: "As ofertas para o santuário",
    subtitle: "Êx 35:21-29; 36:5-7 — mais do que bastava",
    text: "\"Todo aquele cujo espírito voluntariamente o excitou\" trouxe a sua oferta; homens e mulheres traziam ouro, e as mulheres sábias fiavam com as mãos (Êx 35:21-26). Trouxeram tanto que os artífices disseram a Moisés: \"o povo traz muito mais do que basta\", e foi preciso proibir novas ofertas (Êx 36:5-7). Raro problema: generosidade em excesso para a obra de Deus." },
  "azeite-unção": {
    title: "O azeite da santa unção",
    subtitle: "Êx 30:22-33 — o que consagra",
    text: "Composto de mirra, canela, cálamo, cássia e azeite de oliveira, \"segundo a obra do perfumista\" (Êx 30:23-25). Com ele se ungiam o tabernáculo, a arca, os móveis e os sacerdotes, para que tudo fosse \"santíssimo\": separado para Deus (Êx 30:26-30). Era proibido imitá-lo ou usá-lo em coisa comum (Êx 30:32-33) — a unção pertencia só ao serviço do Senhor." },
  "azeite-puro": {
    title: "O azeite puro para a luz",
    subtitle: "Êx 27:20-21 — para arder continuamente",
    text: "\"Azeite puro de oliveiras, batido, para o candeeiro, para fazer arder as lâmpadas continuamente\" (Êx 27:20). Trazido pelo povo, mantinha acesa a luz do lugar santo, que Arão e seus filhos punham em ordem \"desde a tarde até a manhã, perante o Senhor\" (Êx 27:21). A luz da casa de Deus dependia da oferta diária do povo — um estatuto perpétuo pelas gerações." },
  "incenso-santo": {
    title: "O incenso santo",
    subtitle: "Êx 30:34-38 — perfume só para Deus",
    text: "Feito de estoraque, onicha, gálbano e incenso puro em igual proporção, \"temperado, puro e santo\" (Êx 30:34-35). Uma parte se moía e se punha diante do testemunho, \"coisa santíssima\" (Êx 30:36). Quem o imitasse para o próprio prazer seria extirpado do povo (Êx 30:37-38): o que é consagrado a Deus não se rebaixa a uso comum." },
  "altar-bezerro": {
    title: "O bezerro de ouro",
    subtitle: "Êx 32:4-5 — o pecado ao pé do monte",
    text: "Enquanto Moisés recebia a Lei, o povo fez com o seu ouro um bezerro de fundição e clamou: \"Este é teu deus, ó Israel, que te tirou da terra do Egito\" (Êx 32:4). Arão edificou um altar diante dele e apregoou festa (Êx 32:5). No mesmo lugar da aliança, a idolatria — e Moisés desceu, quebrou as tábuas, queimou o bezerro e o reduziu a pó (Êx 32:19-20)." },
  "oferta-alimentos": {
    title: "A oferta de alimentos (manjares)",
    subtitle: "Lv 2 — flor de farinha, azeite e incenso",
    text: "Da flor de farinha, com azeite e incenso, o sacerdote queimava um punhado como \"memorial\" sobre o altar — \"oferta queimada, de cheiro suave ao Senhor\" (Lv 2:2) — e o restante era dos sacerdotes, \"coisa santíssima\". Nunca com fermento nem mel, mas sempre temperada com \"o sal da aliança do teu Deus\" (Lv 2:13). É a oferta do pão e do trabalho, oferecida em gratidão ao Senhor que provê." },
  "praga-gafanhotos": {
    title: "A praga dos gafanhotos",
    subtitle: "Êx 10:12-15 — a oitava praga",
    text: "Moisés estendeu a vara, e o Senhor trouxe sobre a terra um vento oriental todo aquele dia e toda a noite; pela manhã, o vento trouxe os gafanhotos (Êx 10:13). \"Cobriram a face de toda a terra, de modo que a terra se escureceu; e comeram toda a erva da terra e todo o fruto das árvores... e não ficou nada verde\" (Êx 10:15) — depois da saraiva, o pouco que restara. Faraó reconheceu o pecado, mas seu coração de novo se endureceu (Êx 10:16-20)." },
  "praga-ras": {
    title: "A praga das rãs",
    subtitle: "Êx 8:1-6 — a segunda praga sobre o Egito",
    text: "Arão estendeu a mão sobre as águas do Egito, \"e subiram rãs, e cobriram a terra do Egito\" (Êx 8:6) — entrando nas casas, nas camas, nos fornos e nas amassadeiras (Êx 8:3). Os magos as imitaram com seus encantamentos, mas não puderam livrar a terra delas. Faraó rogou a Moisés que orasse, e no dia marcado as rãs morreram; ajuntaram-nas em montões, e a terra cheirou mal — mas, vendo o descanso, Faraó tornou a endurecer o coração (Êx 8:12-15)." },
  "coluna-nuvem-fogo": {
    title: "A coluna de nuvem e de fogo",
    subtitle: "Êx 13:21-22 — Deus indo adiante do povo",
    text: "\"O Senhor ia adiante deles, de dia numa coluna de nuvem para os guiar pelo caminho, e de noite numa coluna de fogo para os alumiar, para que caminhassem de dia e de noite\" (Êx 13:21). Nunca se apartava do povo a coluna de nuvem de dia, nem a coluna de fogo de noite (Êx 13:22). Foi ela que se pôs entre o campo dos egípcios e o de Israel no mar (Êx 14:19-20), e que enchia o tabernáculo quando o Senhor descia (Êx 40:38) — a presença visível de Deus conduzindo o seu povo." },
  "vara-serpente": {
    title: "A vara que virou serpente",
    subtitle: "Êx 7:10-12 — o sinal diante de Faraó",
    text: "Arão lançou a sua vara diante de Faraó e dos seus servos, e ela se tornou em serpente (Êx 7:10). Faraó chamou os sábios e encantadores, e também eles, com seus encantamentos, lançaram cada um a sua vara, e viraram serpentes — \"mas a vara de Arão tragou as varas deles\" (Êx 7:12). O sinal anuncia quem é o Senhor de toda potência: o poder do Egito é engolido diante do Deus de Israel. O coração de Faraó, porém, se endureceu (Êx 7:13)." },
  "mana": {
    title: "O maná — o pão do céu",
    subtitle: "Êx 16:14-15,31 — pão do céu no deserto",
    text: "Ao subir o orvalho, havia sobre a face do deserto \"uma coisa miúda, redonda, miúda como a geada sobre a terra\" (Êx 16:14). O povo perguntou: \"Man-hu?\" — \"Que é isto?\" —, e daí lhe veio o nome maná; e Moisés disse: \"Este é o pão que o Senhor vos deu para comer\" (Êx 16:15). Era \"como semente de coentro, branco, e o seu sabor como bolos de mel\" (Êx 16:31). Caía cada manhã, seis dias, e ao sexto em dobro para guardar o sábado — o Senhor sustentando o seu povo dia após dia (Jo 6:31-35)." },
  "vaso-mana": {
    title: "O vaso de maná",
    subtitle: "Êx 16:33-34 — memória guardada diante de Deus",
    text: "Moisés disse a Arão: \"Toma um vaso, e põe nele um ômer cheio de maná, e coloca-o diante do Senhor, para guardá-lo para as vossas gerações\" (Êx 16:33). Assim se conservou uma porção do pão do céu \"diante do Testemunho\" (Êx 16:34), para que os filhos vissem com que Deus alimentara o povo no deserto. O vaso de ouro foi guardado dentro da arca, ao lado das tábuas e da vara de Arão (Hb 9:4)." },
  "cachos-escol": {
    title: "Os cachos de Escol",
    subtitle: "Nm 13:23-24 — o fruto da Terra Prometida",
    text: "Chegando ao vale de Escol, os espias cortaram \"um ramo de vide com um cacho de uvas, e levaram-no dois homens sobre uma verga; como também das romãs e dos figos\" (Nm 13:23). O cacho era tão pesado que precisou de dois para carregá-lo numa vara — sinal de uma terra que \"mana leite e mel\" (Nm 13:27). Ao lugar chamaram vale de Escol (\"cacho\"), por causa do cacho que ali cortaram (Nm 13:24). O fruto provava a bondade da promessa; mas dez dos doze só viram os gigantes, e o povo não creu." },
  "serpente-bronze": {
    title: "A serpente de bronze",
    subtitle: "Nm 21:8-9 — olhar e viver",
    text: "Depois que as serpentes ardentes mordiam e matavam o povo murmurador, o Senhor disse a Moisés: \"Faze-te uma serpente ardente, e põe-na sobre uma haste; e será que viverá todo o que, tendo sido picado, olhar para ela\" (Nm 21:8). Moisés fez uma serpente de metal (bronze) e a pôs sobre a haste; \"quando a serpente tinha mordido a alguém, olhava para a serpente de metal, e ficava vivo\" (Nm 21:9). Não havia poder na figura, mas na obediência da fé que olhava. O próprio Jesus tomou essa cena como figura da cruz: \"como Moisés levantou a serpente no deserto, assim importa que o Filho do Homem seja levantado, para que todo aquele que nele crê... tenha a vida eterna\" (Jo 3:14-15)." },
  "vara-arao": {
    title: "A vara de Arão que floresceu",
    subtitle: "Nm 17:8 — o sinal contra a murmuração",
    text: "Para acabar com as murmurações depois da rebelião de Coré, o Senhor mandou pôr diante do testemunho, na tenda, doze varas — uma por tribo, com o nome escrito. \"A vara de Arão, pela casa de Levi, tinha brotado; produzira gomos, dera flores e amadurecera amêndoas\" (Nm 17:8). Num só dia a vara seca reviveu, floresceu e frutificou — sinal de que Deus mesmo escolhera Arão e a sua casa para o sacerdócio. A vara foi guardada diante da arca \"por sinal contra os filhos rebeldes\" (Nm 17:10; Hb 9:4)." },
  "trombetas-prata": {
    title: "As duas trombetas de prata",
    subtitle: "Nm 10:2-10 — a voz que convoca e marcha",
    text: "O Senhor mandou fazer \"duas trombetas de prata; de obra batida as farás; e te serão para a convocação da congregação, e para a partida dos arraiais\" (Nm 10:2). Tocando as duas, todo o povo se ajuntava à porta da tenda; ao toque de rebate, os arraiais partiam por ordem. As trombetas soavam também na guerra — \"e perante o Senhor vosso Deus sereis lembrados\" (Nm 10:9) — e nas festas e luas novas, sobre os holocaustos. Eram voz de prata a reunir e a mover o povo de Deus ao mando do Senhor." },
  "tabuas-da-lei": {
    title: "As duas tábuas da Lei",
    subtitle: "Dt 5:22; 9:10 — escritas pelo dedo de Deus",
    text: "No monte Horebe, o Senhor falou dentro do fogo, da nuvem e da escuridão, com grande voz, e escreveu os Dez Mandamentos \"em duas tábuas de pedra\" (Dt 5:22), \"escritas pelo dedo de Deus\" (Dt 9:10). Quando Moisés desceu e viu o bezerro de ouro, quebrou as tábuas ao pé do monte (Dt 9:17); depois o Senhor mandou lavrar outras duas iguais, e nelas tornou a escrever as mesmas palavras (Dt 10:1-4). As tábuas foram guardadas na arca da aliança — a lei santa no coração do santuário, memória perpétua do concerto entre Deus e o seu povo." },
  // ---- Josué: os marcos da conquista ----
  "arca-do-senhor": {
    title: "A arca da aliança à frente do povo",
    subtitle: "Josué 3-6 — a presença que abre o caminho",
    text: "Em Josué, a arca vai adiante de Israel: entra primeiro no Jordão nos ombros dos sacerdotes, e as águas se detêm num montão enquanto o povo passa a seco (Js 3:15-17). Rodeia Jericó por sete dias até os muros caírem (Js 6:4-20). \"Vereis a arca da aliança do Senhor de toda a terra passar diante de vós\" (Js 3:11) — onde vai a arca, vai a presença de Deus, e diante dela o rio recua e a muralha desaba." },
  "arca-da-lei": {
    title: "A arca da aliança entre os montes",
    subtitle: "Josué 8:33 — a Lei lida em Ebal e Gerizim",
    text: "Diante da arca, os sacerdotes levitas ao centro, metade de Israel voltada para o Gerizim (a bênção) e metade para o Ebal (a maldição), Josué leu \"todas as palavras da lei, a bênção e a maldição\" (Js 8:34). A arca no meio é o trono da aliança: a Palavra que abençoa e adverte procede do lugar onde Deus habita entre o seu povo." },
  "arca-entre-os-montes": {
    title: "A arca entre o Gerizim e o Ebal",
    subtitle: "Josué 8:33 — o centro da assembleia da Lei",
    text: "Posta no vale entre os dois montes, a arca marcava o coração da renovação da aliança em Canaã. Assim Josué cumpriu à risca o que Moisés ordenara (Dt 27): a terra recém-conquistada é consagrada não pela espada, mas pela Palavra lida diante da presença de Deus." },
  "muro-de-jerico": {
    title: "Os muros caídos de Jericó",
    subtitle: "Josué 6:20 — a fortaleza que ruiu pela fé",
    text: "Ao sétimo dia, à sétima volta, ao som das trombetas e ao grande brado do povo, \"o muro caiu abaixo, e o povo subiu à cidade, cada qual em frente de si\" (Js 6:20). A primeira e mais forte cidade de Canaã caiu sem aríete nem cerco: \"pela fé caíram os muros de Jericó, sendo rodeados sete dias\" (Hb 11:30). O entulho prega que nenhuma muralha resiste ao Senhor dos exércitos." },
  "tenda-de-aca": {
    title: "A tenda de Acã e o anátema escondido",
    subtitle: "Josué 7:21 — o pecado oculto no arraial",
    text: "Debaixo da sua tenda, na terra, Acã enterrou o que tomara do interdito de Jericó: \"uma boa capa babilônica, e duzentos siclos de prata, e uma cunha de ouro\" (Js 7:21). O que os olhos de Israel não viam, os olhos de Deus viam: o esconderijo revela que o pecado secreto de um só derruba um exército inteiro diante de Ai (Js 7:11-12)." },
  "montao-de-acor": {
    title: "O montão de pedras no vale de Acor",
    subtitle: "Josué 7:26 — o juízo sobre o anátema",
    text: "Sobre Acã e o que era seu, Israel levantou \"um grande montão de pedras, que permanece até ao dia de hoje\" no vale de Acor — \"vale da perturbação\" (Js 7:26). O monumento do juízo tornou-se, na promessa, porta de esperança: Deus faria daquele vale \"uma porta de esperança\" (Os 2:15). Onde o pecado foi punido, a graça abriria entrada." },
  "ai-em-chamas": {
    title: "Ai entregue às chamas",
    subtitle: "Josué 8:19,28 — a cidade da emboscada queimada",
    text: "Tomada pela emboscada que Josué armara, \"queimaram a cidade... e Josué queimou a Ai, e a tornou num montão perpétuo\" (Js 8:19,28). O fogo que sobe de Ai é o sinal combinado e o juízo cumprido: a derrota vergonhosa do capítulo 7, nascida do pecado de Acã, é revertida em vitória depois que o mal foi tirado do meio do povo." },
  "ai-em-ruinas": {
    title: "Ai reduzida a um montão perpétuo",
    subtitle: "Josué 8:28 — a ruína que permanece",
    text: "\"E Josué queimou a Ai, e a tornou num montão perpétuo, em assolação, até ao dia de hoje\" (Js 8:28). As ruínas testemunham que a conquista não era empresa humana, mas juízo de Deus sobre a iniquidade dos cananeus, cumprido no tempo em que \"a medida\" daquele povo se encheu (Gn 15:16)." },
  "altar-de-ebal": {
    title: "O altar no monte Ebal",
    subtitle: "Josué 8:30-31 — pedras não lavradas ao Senhor",
    text: "Josué edificou ao Senhor um altar de \"pedras inteiras, sobre as quais se não movera ferro\", conforme mandara Moisés (Js 8:31; Dt 27:5-6). Ali ofereceram holocaustos e ofertas pacíficas. No monte da maldição, ergue-se um altar de sacrifício: sinal de que só pela expiação o povo pecador pode estar diante do Deus santo na terra da promessa." },
  "livro-da-lei": {
    title: "A cópia da Lei escrita em pedras",
    subtitle: "Josué 8:32 — a Palavra gravada na terra",
    text: "Sobre as pedras do altar, Josué \"escreveu ali uma cópia da lei de Moisés\" na presença de Israel (Js 8:32). A Lei que fora dada no Sinai é agora inscrita no próprio solo de Canaã: a terra é possuída sob a Palavra de Deus, e o povo é lembrado de que a herança se guarda pela obediência à aliança." },
  "sol-detem-te": {
    title: "O sol detido sobre Gibeom",
    subtitle: "Josué 10:12-13 — o dia em que o céu obedeceu",
    text: "No calor da batalha por Gibeom, Josué clamou à vista de todos: \"Sol, detém-te em Gibeom, e tu, lua, no vale de Aijalom\" — \"e o sol se deteve, e a lua parou... quase um dia inteiro\" (Js 10:12-13). \"Nem antes nem depois houve dia semelhante\", porque \"o Senhor pelejava por Israel\" (Js 10:14). O próprio curso dos céus se sujeitou à oração de um homem que confiava no Deus da promessa." },
  "cova-de-maqueda": {
    title: "A cova de Maquedá dos cinco reis",
    subtitle: "Josué 10:16-27 — os reis vencidos escondidos",
    text: "Os cinco reis amorreus fugiram e se esconderam numa cova em Maquedá; Josué mandou rolar-lhe grandes pedras à boca (Js 10:18). Depois, tirando-os, disse aos capitães: \"não temais, nem vos espanteis... porque assim fará o Senhor a todos os vossos inimigos\" (Js 10:25). Foram mortos e pendurados; a cova selada prega que nenhum poder da terra se esconde do juízo de Deus." },
  "madeiro-do-rei": {
    title: "O madeiro dos reis enforcados",
    subtitle: "Josué 8:29; 10:26 — o juízo pendurado no lenho",
    text: "O rei de Ai e, depois, os cinco reis foram mortos e pendurados em madeiros até o pôr do sol, quando os corpos foram descidos, segundo a Lei (Js 8:29; 10:26-27; Dt 21:22-23). \"Maldito todo aquele que for pendurado no madeiro\": a maldição que caiu sobre os reis inimigos é a mesma que Cristo tomaria sobre si na cruz, por nós (Gl 3:13)." },
  "carros-queimados": {
    title: "Os carros de guerra queimados",
    subtitle: "Josué 11:6,9 — a força do inimigo destruída",
    text: "Contra os cavalos e carros \"em multidão como a areia\" da coligação do norte, o Senhor disse: \"os seus cavalos jarretarás, e os seus carros queimarás a fogo\" (Js 11:6). Josué obedeceu (Js 11:9). Israel não confiaria na tecnologia de guerra dos cananeus, mas só no Senhor: \"uns confiam em carros e outros em cavalos, mas nós faremos menção do nome do Senhor\" (Sl 20:7)." },
  "hazor-queimada": {
    title: "Hazor entregue ao fogo",
    subtitle: "Josué 11:10-11 — a cabeça dos reinos do norte",
    text: "Hazor, \"cabeça de todos estes reinos\", foi tomada e queimada; só ela, das cidades sobre os seus outeiros, Josué incendiou (Js 11:10-13). A destruição da capital do norte selou a conquista: \"assim tomou Josué toda esta terra... e a terra repousou da guerra\" (Js 11:23)." },
  "lista-dos-reis": {
    title: "O rol dos reis vencidos",
    subtitle: "Josué 12 — a memória das vitórias do Senhor",
    text: "Josué 12 alinha os reis derrotados: os de além-Jordão feridos por Moisés (Siom e Ogue) e os trinta e um reis a ocidente feridos por Josué. A lista é um monumento de louvor — cada nome recorda que \"o Senhor pelejou por Israel\" e cumpriu a promessa feita aos pais de dar-lhes a terra." },
  "lista-dos-31": {
    title: "Os trinta e um reis de Canaã",
    subtitle: "Josué 12:24 — \"trinta e um reis ao todo\"",
    text: "Ao ocidente do Jordão, Josué feriu trinta e um reis, nomeados um a um até o total (Js 12:24). O número exato testemunha que a conquista não foi acaso nem lenda, mas obra ordenada de Deus: cada reino cananeu caiu no tempo devido, para que a semente de Abraão herdasse a terra jurada." },
  "timnate-sera": {
    title: "Timnate-Sera, a herança de Josué",
    subtitle: "Josué 19:49-50 — o líder servido por último",
    text: "Só depois de repartir toda a terra às tribos, Israel deu a Josué a cidade que ele pediu, Timnate-Sera, no monte de Efraim, e ele a edificou e nela habitou (Js 19:49-50). O capitão que conduziu a conquista recebe a sua porção por último — retrato do verdadeiro líder que serve primeiro e busca o seu quinhão depois de todos." },
  "cidade-de-refugio": {
    title: "As cidades de refúgio",
    subtitle: "Josué 20 — o amparo do homicida involuntário",
    text: "Seis cidades foram apartadas para onde pudesse fugir \"aquele que matar alguma pessoa por erro\", ficando a salvo do vingador do sangue até o juízo da congregação e a morte do sumo sacerdote (Js 20:2-6). A justiça e a misericórdia se encontram: sombra de Cristo, o refúgio para onde fugimos, \"tendo a esperança proposta\" (Hb 6:18)." },
  "livro-da-demarcacao": {
    title: "O livro da demarcação da terra",
    subtitle: "Josué 18:9 — a terra descrita por escrito",
    text: "Os homens enviados percorreram a terra que restava, \"descreveram-na, segundo as cidades, em sete partes, num livro\", e voltaram a Josué em Siló (Js 18:9). A herança é repartida com ordem e por escrito, diante do Senhor: Deus não dá a terra ao acaso, mas com fidelidade e justiça a cada tribo." },
  "tiradores-de-agua": {
    title: "Os gibeonitas, rachadores de lenha",
    subtitle: "Josué 9:27 — os que serviram à casa de Deus",
    text: "Descoberto o engano, Josué não os matou por causa do juramento, mas os fez \"rachadores de lenha e tiradores de água para a congregação e para o altar do Senhor\" (Js 9:27). Os gentios que buscaram misericórdia com astúcia acabaram servindo perpetuamente no santuário — figura de como os de fora, por graça, são achegados à casa de Deus." },
  "casa-de-deus": {
    title: "A tenda da congregação em Siló",
    subtitle: "Josué 18:1 — o santuário no centro da terra",
    text: "\"Toda a congregação dos filhos de Israel se ajuntou em Siló, e ali armaram a tenda da congregação\" (Js 18:1). Conquistada a terra, o tabernáculo acha o seu lugar de repouso; dali se lançam as sortes \"perante o Senhor\" (Js 18:10). O centro de Israel não é o palácio de um rei, mas a tenda onde Deus habita no meio do povo." },
  "tenda-da-congregacao": {
    title: "A tenda da congregação em Siló",
    subtitle: "Josué 18-19 — de onde se reparte a herança",
    text: "Em Siló, à porta da tenda da congregação, Eleazar, Josué e os cabeças das tribos lançaram as sortes diante do Senhor para repartir a terra (Js 18:1,10; 19:51). A herança flui da presença de Deus: cada porção é recebida do santuário, não conquistada por mérito de tribo alguma." },
  "altar-ede": {
    title: "O altar de Ede, \"testemunho\"",
    subtitle: "Josué 22:34 — o altar que quase gerou guerra",
    text: "As tribos de além-Jordão ergueram junto ao rio um grande altar; o oeste temeu apostasia e se ajuntou para a guerra. Mas ouviram que não era para sacrifício, e sim \"por testemunho entre nós de que o Senhor é Deus\" — e o chamaram Ede (Js 22:34). O mal-entendido resolvido pela palavra guardou a unidade dos irmãos e a pureza do único altar do Senhor." },
  "altar-do-senhor": {
    title: "O altar do Senhor em Siló",
    subtitle: "Josué 22 — o único lugar do sacrifício",
    text: "Diante da suspeita de um altar rival, Finéias e os príncipes lembram que há um só altar legítimo, o do tabernáculo do Senhor (Js 22:19,29). O zelo pela unidade do culto — um só Deus, um só altar — protege Israel da idolatria e prefigura o único sacrifício por onde nos achegamos a Deus." },
  "fontes-de-acsa": {
    title: "As fontes de água de Acsa",
    subtitle: "Josué 15:19 — a bênção que rega a herança",
    text: "Acsa, filha de Calebe, não se contentou com o campo seco do Neguebe e pediu ao pai as fontes: \"deu-lhe Calebe as fontes superiores e as fontes inferiores\" (Js 15:19). A terra prometida precisa de água viva para frutificar; a filha que pede as fontes é imagem de quem busca do Pai a bênção completa, não pela metade." },
  "pedra-testemunho": {
    title: "A grande pedra por testemunho em Siquém",
    subtitle: "Josué 24:26-27 — a testemunha da aliança",
    text: "Feita a aliança, Josué tomou uma grande pedra e a pôs debaixo do carvalho junto ao santuário do Senhor, dizendo: \"esta pedra... ouviu todas as palavras que o Senhor nos tem dito; e será testemunha contra vós\" (Js 24:26-27). O monumento silencioso guardaria a memória da escolha do povo: \"serviremos ao Senhor\"." },
  "pedra-de-boa": {
    title: "A pedra de Boã, filho de Rúben",
    subtitle: "Josué 15:6; 18:17 — o marco dos limites",
    text: "\"A pedra de Boã, filho de Rúben\" era um marco conhecido na fronteira entre Judá e Benjamim (Js 15:6; 18:17). As pedras-limite testemunhavam que cada herança tinha termos justos, fixados diante do Senhor — a repartição da terra foi medida e honesta, tribo por tribo." },
  "carvalho-de-siquem": {
    title: "O carvalho do santuário de Siquém",
    subtitle: "Josué 24:26 — o lugar das alianças",
    text: "Debaixo do carvalho junto ao santuário do Senhor em Siquém, Josué selou a aliança e ergueu a pedra do testemunho (Js 24:26). O mesmo lugar onde Abraão erguera altar ao entrar na terra (Gn 12:6-7) e onde Jacó enterrara os deuses estranhos (Gn 35:4): chão de decisões pelo Senhor, geração após geração." },
  sepultura: {
    title: "As sepulturas dos pais em Canaã",
    subtitle: "Josué 24:29-33 — o descanso na terra da promessa",
    text: "No fim do livro, Josué é sepultado em Timnate-Sera, os ossos de José — trazidos do Egito conforme o juramento (Gn 50:25; Êx 13:19) — são enterrados em Siquém, e Eleazar no outeiro de Finéias (Js 24:29-33). Os que creram na promessa repousam por fim no solo prometido: a fidelidade de Deus alcança até a sepultura." },
  "alem-do-rio": {
    title: "Além do rio, onde serviram a outros deuses",
    subtitle: "Josué 24:2 — a origem de onde a graça arrancou Israel",
    text: "\"Além do rio habitaram antigamente vossos pais... e serviram a outros deuses\" (Js 24:2). Na recitação de Siquém, Josué recorda que a história de Israel começou na idolatria da Mesopotâmia: não foi mérito, mas o puro chamado de Deus que \"tomou\" Abraão dali (Js 24:3). Toda a aliança repousa na graça que elege." },
  egito: {
    title: "O Egito da servidão, no relato de Siquém",
    subtitle: "Josué 24:5-7 — a casa da escravidão de onde Deus livrou",
    text: "Josué recorda o Egito onde os pais desceram e serviram, as pragas com que Deus o feriu, e o mar que engoliu os egípcios (Js 24:5-7). A memória da libertação sustenta o desafio: o Deus que os tirou da casa da servidão merece toda a fidelidade — \"eu e a minha casa serviremos ao Senhor\" (Js 24:15)." },
  jerusalem: {
    title: "A Jerusalém dos jebuseus",
    subtitle: "Josué 15:63 — a cidade ainda não tomada",
    text: "\"Não puderam os filhos de Judá expulsar os jebuseus... e habitaram os jebuseus com os filhos de Judá em Jerusalém até ao dia de hoje\" (Js 15:63). A cidade que só Davi tomaria (2Sm 5:6-9) fica como sinal de conquista inacabada: a promessa é certa, mas há herança que ainda se há de possuir pela fé e obediência." },
  // ---- Levítico: os marcos do sacerdócio e da pureza ----
  "cesto-consagracao": {
    title: "O cesto dos pães ázimos da consagração",
    subtitle: "Levítico 8:2,26 — o pão da investidura sacerdotal",
    text: "Ao consagrar Arão e seus filhos, Moisés levou, por ordem do Senhor, \"o azeite da unção... e o cesto dos pães ázimos\" (Lv 8:2), e dele tomou \"um bolo ázimo, e um bolo de pão azeitado, e um coscorão\" para pôr sobre a gordura e a espádua direita do carneiro da consagração (Lv 8:26). O pão sem fermento diz que o ministério do santuário não pode carregar corrupção; posto nas mãos do sacerdote e movido perante o Senhor (Lv 8:27), ensina que tudo o que o sacerdote é e tem vem de Deus e a Deus retorna. Sete dias à porta da tenda selavam essa entrega: \"por sete dias ele vos consagrará\" (Lv 8:33)." },
  "casa-lepra": {
    title: "A casa ferida de lepra",
    subtitle: "Levítico 14:34-53 — a praga que Deus envia às paredes",
    text: "\"Quando tiverdes entrado na terra de Canaã... e eu enviar a praga da lepra em alguma casa da terra da vossa possessão\" (Lv 14:34): a impureza não é acaso, é visita do Senhor à própria morada do homem. O sacerdote inspeciona, manda arrancar as pedras contaminadas e, se a praga torna, \"se derribará a casa\" e o entulho vai para fora da cidade (Lv 14:45). A expiação da casa se faz com duas aves, cedro, carmesim e hissopo (Lv 14:49), e a ave viva é solta sobre o campo (Lv 14:53) — figura do sangue que purifica e da vida que sai livre." },
  // ---- Números: o deserto, a guia e o juízo ----
  "fogo-do-senhor": {
    title: "O fogo do Senhor em Taberá",
    subtitle: "Números 11:1-3 — a murmuração que acendeu a ira",
    text: "\"Queixou-se o povo falando o que era mal aos ouvidos do Senhor... e o fogo do Senhor ardeu entre eles\" (Nm 11:1), consumindo a última parte do arraial. A murmuração não é ruído inocente: é desprezo do Deus que os alimentava com o maná. O lugar ficou por nome Taberá, \"porquanto o fogo do Senhor se acendera entre eles\" (Nm 11:3) — memória gravada no mapa de que o Deus que caminha no meio do povo é também \"um fogo que consome\" (Dt 4:24)." },
  "coluna-nuvem": {
    title: "A coluna de nuvem que desce à porta da tenda",
    subtitle: "Números 11:25; 12:5; 14:10 — a presença que fala e que julga",
    text: "No deserto a nuvem não é só guia: é o lugar de onde Deus fala. Sobre os setenta anciãos \"o Senhor desceu na nuvem, e lhe falou\" (Nm 11:25); contra a murmuração de Arão e Miriã \"desceu na coluna de nuvem, e se pôs à porta da tenda\" (Nm 12:5); e quando a congregação quis apedrejar Josué e Calebe, \"a glória do Senhor apareceu na tenda da congregação\" (Nm 14:10). A mesma nuvem que abriga é a que repreende — Deus nunca é figura desenhada, mas voz e glória no meio do arraial." },
  "cidade-forte": {
    title: "As cidades fortificadas de Canaã",
    subtitle: "Números 13:19; 14:40-45 — o que os espias viram e o povo temeu",
    text: "Moisés mandou espiar \"quais são as cidades em que eles habitam; se em arraiais, ou em fortalezas\" (Nm 13:19), e o relatório dos dez transformou muralhas em desespero: \"as cidades são grandes e fortificadas até aos céus\" (Dt 1:28). No dia seguinte, o mesmo povo que recusara subir com Deus quis subir sem Ele — \"temerariamente, tentaram subir ao cume do monte\" (Nm 14:44), enquanto a arca ficava no arraial, e foram feridos até Hormá (Nm 14:45). A muralha só é intransponível para quem mede a terra sem contar com o Senhor." },
  "queima-novilha": {
    title: "A novilha ruiva queimada fora do arraial",
    subtitle: "Números 19:2-5 — o sacrifício da purificação",
    text: "O estatuto pedia \"uma novilha ruiva, que não tenha defeito, e sobre a qual não tenha sido posto jugo\" (Nm 19:2); entregue a Eleazar, ele a tirava \"para fora do arraial\" e ali era degolada e queimada inteira (Nm 19:3-5). Fora do acampamento, longe do santuário, o animal sem jugo e sem mancha ardia para que a sua cinza servisse por muito tempo à limpeza do povo. É sombra daquele que \"padeceu fora da porta\" para santificar o povo com o seu próprio sangue (Hb 13:12)." },
  "agua-separacao": {
    title: "A água da separação",
    subtitle: "Números 19:9 — a cinza guardada para purificar",
    text: "\"Um homem limpo ajuntará a cinza da novilha, e a porá fora do arraial, num lugar limpo... para a água da separação; expiação é\" (Nm 19:9). Sobre essa cinza se punha água corrente num vaso (Nm 19:17), e com ela se aspergia quem tocara em morto. Um só sacrifício, reduzido a cinza, bastava para muitas purificações ao longo dos anos: Deus provê para o seu povo peregrino uma limpeza sempre à mão, sinal do sangue que purifica a consciência das obras mortas (Hb 9:13-14)." },
  "rocha-meriba": {
    title: "A rocha ferida em Cades",
    subtitle: "Números 20:8-12 — falar à rocha, e Moisés feriu-a",
    text: "Faltando água, o Senhor ordenou: \"Toma a vara... e falai à rocha, perante os seus olhos, e dará a sua água\" (Nm 20:8). Mas Moisés, irado com o povo, \"feriu a rocha duas vezes com a sua vara\" (Nm 20:11) — e a água saiu farta, porque a graça de Deus não falhou. Falhou o servo: \"Porquanto não crestes em mim, para me santificardes diante dos filhos de Israel, por isso não introduzireis esta congregação na terra\" (Nm 20:12). A rocha dá água; quem a representa mal fica de fora da herança." },
  "aguas-meriba": {
    title: "As águas de Meribá",
    subtitle: "Números 20:13 — a contenda onde Deus se santificou",
    text: "\"Estas são as águas de Meribá, porque os filhos de Israel contenderam com o Senhor; e se santificou neles\" (Nm 20:13). Meribá quer dizer contenda: o nome do lugar guarda para sempre a queixa do povo e a falha de Moisés e Arão. Ainda assim, no mesmo lugar Deus se mostrou santo — dando de beber a quem murmurava e, ao mesmo tempo, não deixando impune a incredulidade dos seus servos. A água que corre da rocha ferida é a mesma que julga o coração de quem bebe." },
  "monte-hor": {
    title: "O monte Hor, onde Arão morreu",
    subtitle: "Números 20:22-29 — as vestes passadas a Eleazar",
    text: "\"Toda a congregação, chegaram ao monte Hor\" (Nm 20:22), e ali, ao cume, subiram Moisés, Arão e Eleazar. \"Moisés despiu a Arão de suas vestes, e as vestiu em Eleazar, seu filho; e morreu Arão ali sobre o cume do monte\" (Nm 20:28). O sacerdote morre, mas o sacerdócio continua: as vestes passam adiante porque o povo não pode ficar sem mediador. Israel o chorou trinta dias (Nm 20:29) — e a cena aponta para o Sumo Sacerdote que \"permanece para sempre\" e não precisa de sucessor (Hb 7:24)." },
  "poco-de-beer": {
    title: "O poço de Beer",
    subtitle: "Números 21:16-18 — o poço que virou cântico",
    text: "\"E dali partiram para Beer; este é o poço do qual o Senhor disse a Moisés: Ajunta o povo e lhe darei água\" (Nm 21:16). Desta vez não há murmuração nem vara ferindo a rocha: há promessa antes da sede e um cântico depois — \"Brota, ó poço! Cantai dele\" (Nm 21:17). Príncipes e nobres cavaram com os seus bordões (Nm 21:18), mas a água é dom de Deus. O deserto que ouviu queixas em Meribá agora ouve louvor: a mesma graça, recebida com fé, produz canto." },
  holocausto: {
    title: "Os sete altares e os holocaustos de Balaque",
    subtitle: "Números 23:1-24:1 — o sacrifício que não compra maldição",
    text: "\"Edifica-me aqui sete altares, e prepara-me aqui sete novilhos e sete carneiros\" (Nm 23:1): Balaque multiplica altares em Bamote-Baal, no cume de Pisga e no cume de Peor, tentando comprar do céu uma maldição contra Israel. Mas o sacrifício pago não dobra a vontade de Deus: \"Como amaldiçoarei o que Deus não amaldiçoa?\" (Nm 23:8). Ao fim, Balaão deixa os encantamentos (Nm 24:1) e só resta a bênção — \"contra Jacó não vale encantamento, nem adivinhação contra Israel\" (Nm 23:23)." },
  "estrela-de-jaco": {
    title: "A estrela que procederá de Jacó",
    subtitle: "Números 24:17 — o cetro que subirá de Israel",
    text: "Na quarta parábola, o profeta contratado para amaldiçoar acaba anunciando o Rei: \"Vê-lo-ei, mas não agora, contemplá-lo-ei, mas não de perto; uma estrela procederá de Jacó e um cetro subirá de Israel\" (Nm 24:17). A estrela e o cetro dizem realeza e domínio, e a visão olha para além de Davi. Deus faz da boca de um adivinho pago o arauto da esperança messiânica — a mesma que os magos seguiriam ao ver a estrela no oriente (Mt 2:2)." },
  "baal-peor": {
    title: "O ídolo de Baal-Peor",
    subtitle: "Números 25:1-9 — a prostituição que trouxe a praga",
    text: "\"Israel deteve-se em Sitim e o povo começou a prostituir-se com as filhas dos moabitas\" (Nm 25:1), comendo dos sacrifícios e inclinando-se aos deuses delas. \"Juntando-se, pois, Israel a Baal-peor, a ira do Senhor se acendeu contra Israel\" (Nm 25:3), e vinte e quatro mil caíram na praga. O que exércitos e encantamentos não conseguiram fazer contra o povo, o ídolo conseguiu por dentro: a idolatria é sempre adultério espiritual, e fere Israel mais fundo do que a espada de Moabe." },
  tenda: {
    title: "A tenda onde o zelo fez expiação",
    subtitle: "Números 25:8-13 — a aliança de paz dada a Finéias",
    text: "Finéias entrou atrás do israelita \"até à tenda, e os atravessou a ambos... então a praga cessou de sobre os filhos de Israel\" (Nm 25:8). O Senhor declarou: \"foi zeloso com o meu zelo no meio deles; de modo que, no meu zelo, não consumi os filhos de Israel\" (Nm 25:11), e lhe deu a aliança do sacerdócio perpétuo, \"porquanto teve zelo pelo seu Deus, e fez expiação pelos filhos de Israel\" (Nm 25:13). No lugar onde o pecado se escondeu, a santidade se levantou — e a tenda da vergonha ficou sendo o marco da paz restaurada." },
  fogo: {
    title: "O fogo sobre as cidades de Midiã",
    subtitle: "Números 31:6-10 — o juízo executado no arraial inimigo",
    text: "Mil homens de cada tribo saíram à guerra \"com os vasos do santuário, e com as trombetas do alarido\" (Nm 31:6): a peleja é vingança do Senhor contra quem seduziu Israel em Peor. \"E queimaram a fogo todas as suas cidades com todas as suas habitações e todos os seus acampamentos\" (Nm 31:10). O fogo aqui não é acaso de guerra, mas sentença: o que arrastou o povo à idolatria não pode ser guardado, e nem o despojo entra no arraial sem passar pelo fogo e pela água da separação (Nm 31:23)." },
  cidade: {
    title: "As cidades fortes edificadas a oriente",
    subtitle: "Números 32:33-38 — a herança de Rúben, Gade e meia tribo de Manassés",
    text: "Moisés deu às duas tribos e meia \"o reino de Siom... e o reino de Ogue, rei de Basã; a terra com as suas cidades nos seus termos\" (Nm 32:33), e eles edificaram cidades muradas e currais para o gado. O acordo era claro: \"ficarão as nossas crianças nas cidades fortes\" enquanto os homens passassem armados adiante de Israel (Nm 32:17). Herança recebida antes do tempo só é legítima quando não desobriga da luta pelos irmãos — a posse pessoal não pode desfazer a solidariedade do povo de Deus." },
  coluna: {
    title: "A coluna que guiou as jornadas",
    subtitle: "Números 33:1-2 — o itinerário escrito sob a direção do Senhor",
    text: "\"Estas são as jornadas dos filhos de Israel, que saíram da terra do Egito... sob a direção de Moisés e Arão\" (Nm 33:1), e Moisés escreveu cada saída \"conforme ao mandado do Senhor\" (Nm 33:2). Por trás de cada nome de acampamento está a coluna que ia adiante: nuvem de dia, fogo de noite. O capítulo é um mapa de graça — o povo saiu de Ramessés \"por alta mão\" (Nm 33:3) e cada etapa, mesmo as de queda, foi caminhada sob a mesma guia que nunca se afastou." },
  "coluna-fogo": {
    title: "A coluna de fogo no deserto do Sinai",
    subtitle: "Números 33:15 — a etapa do monte da Lei",
    text: "\"Partiram, pois, de Refidim, e acamparam-se no deserto de Sinai\" (Nm 33:15): no roteiro seco das jornadas, esta é a parada onde o monte fumegou e Deus falou do meio do fogo. A mesma coluna que guiava desceu ali como fogo sobre o monte, e dela saiu a aliança. No itinerário de Israel, Sinai não é um destino, mas uma escola no caminho: o povo é guiado para receber a Lei e depois é guiado por ela — \"à sua direita havia para eles o fogo da lei\" (Dt 33:2)." },
  jordao: {
    title: "O Jordão, junto às campinas de Moabe",
    subtitle: "Números 33:48; 34:12 — o rio que faz fronteira da herança",
    text: "A última etapa das jornadas termina \"nas campinas de Moabe, junto ao Jordão, na direção de Jericó\" (Nm 33:48): quarenta anos de deserto param diante de um rio. Ele é também o limite oriental da terra prometida — \"descerá também este limite ao longo do Jordão, e as suas saídas serão no Mar Salgado\" (Nm 34:12). O Jordão marca o lugar onde a promessa deixa de ser caminhada e passa a ser possuída; atravessá-lo exigirá, mais uma vez, que Deus vá adiante." },
  "cidade-refugio": {
    title: "As cidades de refúgio",
    subtitle: "Números 35:11-28 — asilo para o homicida por engano",
    text: "\"Fazei com que vos estejam à mão cidades que vos sirvam de cidades de refúgio, para que ali se acolha o homicida que ferir a alguma alma por engano\" (Nm 35:11). Seis cidades, três de cada lado do Jordão (Nm 35:6), guardavam o sangue inocente do vingador e, ao mesmo tempo, não absolviam o culposo: ele ficava ali \"até à morte do sumo sacerdote, a quem ungiram com o santo óleo\" (Nm 35:25,28). Justiça e misericórdia se encontram, e a liberdade do refugiado depende da morte do sacerdote — sombra clara do Calvário." },
  "cidade-levita": {
    title: "As cidades dos levitas",
    subtitle: "Números 35:2-8 — herança espalhada por todo o Israel",
    text: "\"Dá ordem aos filhos de Israel que, da herança da sua possessão, dêem cidades aos levitas, em que habitem; e também aos levitas dareis arrabaldes ao redor delas\" (Nm 35:2). A tribo que não recebeu território recebe quarenta e oito cidades no meio das outras (Nm 35:6-7), com pasto ao redor. Assim o ensino da Lei fica ao alcance de todos, e cada tribo sustenta os que servem ao santuário: o Senhor é a porção dos levitas, e os levitas são a porção de Deus distribuída no meio do povo." },
  // ---- Deuteronômio: a lei recontada nas campinas de Moabe ----
  "cacho-de-escol": {
    title: "O fruto trazido do vale de Escol",
    subtitle: "Deuteronômio 1:24-25 — a prova de que a terra era boa",
    text: "Os doze \"subiram à montanha, e chegaram até ao vale de Escol, e o espiaram\" (Dt 1:24), e voltaram com o fruto nas mãos, dizendo: \"Boa é a terra que nos dá o Senhor nosso Deus\" (Dt 1:25). O cacho era penhor visível da promessa — Deus não pediu fé cega, deu um gosto antecipado da herança. Mesmo assim o povo não quis subir (Dt 1:26): a incredulidade consegue segurar o fruto da terra na mão e ainda assim duvidar de quem a dá." },
  "coluna-de-fogo": {
    title: "A coluna de fogo que ia adiante",
    subtitle: "Deuteronômio 1:33 — de noite no fogo, de dia na nuvem",
    text: "O Senhor \"foi adiante de vós por todo o caminho, para vos achar o lugar onde vós deveríeis acampar; de noite no fogo, para vos mostrar o caminho por onde havíeis de andar, e de dia na nuvem\" (Dt 1:33). Moisés lembra isto exatamente onde acusa o povo de não ter crido: a incredulidade em Cades-Barnéia aconteceu à vista do fogo. Deus não só apontou o caminho, escolheu o acampamento; e no deserto o fogo que arde à frente é o mesmo Deus que caminha por amor de Israel." },
  "fogo-de-horebe": {
    title: "O fogo de Horebe",
    subtitle: "Deuteronômio 4:33; 5:2-4 — a voz de Deus do meio do fogo",
    text: "\"O Senhor nosso Deus fez conosco aliança em Horebe\" (Dt 5:2), e ali \"face a face o Senhor falou conosco no monte, do meio do fogo\" (Dt 5:4). Israel ouviu a voz e viu apenas fogo, nuvem e escuridão — nenhuma figura, para que nunca fizessem imagem alguma (Dt 4:15-16). Moisés faz a pergunta que resume o privilégio: \"se algum povo ouviu a voz de Deus falando do meio do fogo, como tu a ouviste, e ficou vivo?\" (Dt 4:33). Dali saíram os dez mandamentos, escritos em duas tábuas de pedra (Dt 4:13)." },
  idolo: {
    title: "A imagem de escultura",
    subtitle: "Deuteronômio 4:16-28; 7:5,25 — o que se deve derrubar e queimar",
    text: "Porque em Horebe não viram figura alguma, Israel é advertido a não fazer \"alguma imagem esculpida na forma de qualquer figura\" (Dt 4:16); quem troca o Deus vivo por obra de mãos acaba servindo a \"madeira e pedra, que não vêem, nem ouvem, nem comem, nem cheiram\" (Dt 4:28). Na terra, a ordem é radical: derrubar altares, quebrar estátuas, queimar as imagens e não cobiçar nem a prata nem o ouro que as cobre, \"pois abominação é ao Senhor teu Deus\" (Dt 7:25). O ídolo não se negocia, se destrói." },
  mezuza: {
    title: "As palavras escritas nos umbrais",
    subtitle: "Deuteronômio 6:9 — a Lei na porta da casa",
    text: "Depois do \"Amarás o Senhor teu Deus de todo o teu coração\" (Dt 6:5) vem a ordem doméstica: \"E as escreverás nos umbrais de tua casa, e nas tuas portas\" (Dt 6:9). A palavra atada à mão, posta entre os olhos (Dt 6:8) e gravada na entrada faz da casa o primeiro santuário de ensino, onde se fala dela ao assentar, ao andar, ao deitar e ao levantar (Dt 6:7). Cada vez que se entra ou se sai, a aliança está escrita à altura dos olhos: a fé de Israel se transmite pelo lar." },
  "bezerro-de-ouro": {
    title: "O bezerro de fundição em Horebe",
    subtitle: "Deuteronômio 9:16-21 — o pecado ao pé do monte",
    text: "Enquanto Moisés recebia as tábuas, o povo fez um bezerro de fundição: \"cedo vos desviastes do caminho que o Senhor vos ordenara\" (Dt 9:16). Moisés o tomou, \"e o queimei a fogo, e o pisei, moendo-o bem, até que se desfez em pó; e o seu pó lancei no ribeiro que descia do monte\" (Dt 9:21). O ídolo é reduzido a nada diante do Deus que fala do fogo — e só a intercessão de Moisés, prostrado quarenta dias e quarenta noites, impediu que Israel fosse destruído (Dt 9:18-19)." },
  "tabuas-quebradas": {
    title: "As tábuas quebradas ao pé do monte",
    subtitle: "Deuteronômio 9:17 — a aliança rompida à vista de todos",
    text: "\"Então peguei das duas tábuas, e as arrojei das minhas mãos, e as quebrei diante dos vossos olhos\" (Dt 9:17). O gesto não é descontrole: é sentença visível — as tábuas \"escritas com o dedo de Deus\" (Dt 9:10) caem em pedaços porque o povo já quebrara o concerto ao pé do próprio monte. Mas a graça não termina no cascalho: o Senhor manda lavrar outras duas, \"como as primeiras\" (Dt 10:1), e torna a escrever as mesmas palavras, que serão guardadas na arca." },
  "santuario-do-nome": {
    title: "O lugar que o Senhor escolher para ali pôr o seu nome",
    subtitle: "Deuteronômio 12:5-27; 14:23 — o culto centralizado",
    text: "Contra o costume de cada um adorar \"tudo o que bem parece aos seus olhos\" (Dt 12:8), a Lei manda buscar \"o lugar que o Senhor vosso Deus escolher de todas as vossas tribos, para ali pôr o seu nome\" (Dt 12:5). Ali se levam holocaustos, sacrifícios, dízimos e votos (Dt 12:11,26-27), e ali se come com alegria diante do Senhor, com filhos, servos e levitas (Dt 12:18). O nome de Deus habitando num lugar guarda o culto de virar invenção humana e ensina o povo a temê-lo todos os dias (Dt 14:23)." },
  "cidade-anatema": {
    title: "A cidade posta em anátema",
    subtitle: "Deuteronômio 13:12-16 — o juízo sobre a cidade que apostatou",
    text: "Se numa cidade de Israel \"filhos de Belial\" incitassem os moradores a servir outros deuses (Dt 13:13), depois de rigorosa inquirição a sentença era total: \"a cidade e todo o seu despojo queimarás totalmente para o Senhor teu Deus, e será montão perpétuo, nunca mais se edificará\" (Dt 13:16). Nada do despojo podia ficar na mão de ninguém, para que a idolatria não se espalhasse pelo lucro. A apostasia coletiva é tratada como Canaã: o povo santo não pode abrigar dentro de si o que foi mandado destruir." },
  porta: {
    title: "A porta onde se furava a orelha do servo",
    subtitle: "Deuteronômio 15:17 — servo para sempre, por amor",
    text: "No sétimo ano o hebreu saía livre e bem provido do rebanho, da eira e do lagar (Dt 15:13-14). Mas se dissesse \"Não sairei de ti\" (Dt 15:16), porque amava o senhor e a casa, então \"tomarás uma sovela, e lhe furarás a orelha à porta, e teu servo será para sempre\" (Dt 15:17). A marca não é de cativeiro, e sim de amor escolhido, feita no umbral da casa que ele adotou. A liberdade de Israel, resgatado do Egito, se cumpre em servir de bom grado a quem se ama." },
  cabana: {
    title: "A cabana da festa dos tabernáculos",
    subtitle: "Deuteronômio 16:13-15 — a alegria da colheita sob ramos",
    text: "\"A festa dos tabernáculos celebrarás sete dias, quando tiveres colhido da tua eira e do teu lagar\" (Dt 16:13). Ao fim da colheita, quando o celeiro está cheio, Israel deixa a casa e mora em cabanas: a fartura não pode apagar a memória do deserto, onde só havia o Senhor. E a alegria é de todos — filho, serva, levita, estrangeiro, órfão e viúva (Dt 16:14) —, porque \"o Senhor teu Deus te há de abençoar em toda a tua colheita... por isso certamente te alegrarás\" (Dt 16:15)." },
  portas: {
    title: "As portas da cidade, tribunal de Israel",
    subtitle: "Deuteronômio 16:18; 17:5 — onde se julga com juízo de justiça",
    text: "\"Juízes e oficiais porás em todas as tuas cidades... para que julguem o povo com juízo de justiça\" (Dt 16:18). A porta era a praça pública: ali se ouviam as causas à vista de todos, sem torcer o direito, sem aceitar suborno, sem dar preferência a pessoas (Dt 16:19). Ali também se executava a sentença capital contra o idólatra, \"às tuas portas\" (Dt 17:5), e nunca por uma só testemunha (Dt 17:6). A justiça de Israel é pública, sóbria e cercada de garantias, porque o juízo pertence a Deus." },
  "cesto-primicias": {
    title: "O cesto das primícias",
    subtitle: "Deuteronômio 26:2-12 — a confissão de quem entra na terra",
    text: "\"Tomarás das primícias de todos os frutos do solo... e as porás num cesto, e irás ao lugar que escolher o Senhor teu Deus\" (Dt 26:2). Ali o israelita recita a sua história: \"Arameu, prestes a perecer, foi meu pai\" (Dt 26:5), lembrando o Egito, o clamor e a mão forte que o tirou. O cesto na mão é gratidão encarnada — o primeiro do fruto, não a sobra —, e o mesmo capítulo manda repartir o dízimo do terceiro ano com o levita, o estrangeiro, o órfão e a viúva (Dt 26:12)." },
  "pedras-caiadas": {
    title: "As pedras grandes, caiadas, com a Lei escrita",
    subtitle: "Deuteronômio 27:2-8 — a Lei publicada ao entrar na terra",
    text: "\"No dia em que passares o Jordão... levantar-te-ás umas pedras grandes, e as caiarás\" (Dt 27:2), e nelas se escreveriam \"todas as palavras desta lei, exprimindo-as nitidamente\" (Dt 27:8). O primeiro ato na terra prometida não é fortificar, mas publicar a aliança onde todos leiam. Junto às pedras se levantava um altar de pedras não lavradas, com holocaustos e ofertas pacíficas (Dt 27:5-7): a Lei escrita e o sacrifício lado a lado, porque quem lê a exigência precisa também do sangue." },
  "fogo-cerco": {
    title: "O cerco às portas da cidade",
    subtitle: "Deuteronômio 28:52 — os muros em que confiavas caindo",
    text: "Entre as maldições da desobediência está o sítio: \"sitiar-te-á em todas as tuas portas, até que venham a cair os teus altos e fortes muros, em que confiavas em toda a tua terra\" (Dt 28:52). A palavra fere onde estava a confiança — as muralhas erguidas contra o inimigo não seguram nada quando o Senhor não é a defesa. E o cerco não traz só fome, traz desumanização, a ponto de o próprio fruto do ventre ser devorado \"no cerco e no aperto\" (Dt 28:53)." },
  "fogo-destruicao": {
    title: "As maldições que perseguem até destruir",
    subtitle: "Deuteronômio 28:15-63 — o juízo sobre a aliança quebrada",
    text: "\"Se não deres ouvidos à voz do Senhor teu Deus... então virão sobre ti todas estas maldições, e te alcançarão\" (Dt 28:15). Elas perseguem \"até que sejas destruído\" (Dt 28:45), trazem de longe uma nação feroz que \"voa como a águia\" e não se apieda do velho nem do moço (Dt 28:49-50), e reduzem a multidão prometida a poucos em número (Dt 28:62). O mais grave é o motivo: \"assim o Senhor se deleitará em destruir-vos\" (Dt 28:63) — a mesma santidade que abençoa é a que julga." },
  "tirador-de-agua": {
    title: "O tirador da vossa água",
    subtitle: "Deuteronômio 29:11 — a aliança que inclui os últimos",
    text: "Diante do concerto de Moabe estavam todos: \"os vossos meninos, as vossas mulheres, e o estrangeiro que está no meio do vosso arraial; desde o rachador da vossa lenha até ao tirador da vossa água\" (Dt 29:11). A aliança não se faz apenas com os chefes e anciãos — alcança a criança, a mulher, o estrangeiro e o servo mais humilde do acampamento. Cada um responde pessoalmente diante do Senhor, e ninguém é pequeno demais para ser parte do povo de Deus." },
  "raiz-de-fel": {
    title: "A raiz que dá veneno e fel",
    subtitle: "Deuteronômio 29:18 — a apostasia que começa escondida",
    text: "Moisés adverte para que \"entre vós não haja homem, nem mulher, nem família, nem tribo, cujo coração hoje se desvie do Senhor nosso Deus... para que entre vós não haja raiz que dê veneno e fel\" (Dt 29:18). A idolatria raramente começa em público: começa num coração que se abençoa a si mesmo dizendo \"terei paz\" enquanto anda na dureza (Dt 29:19). Sobre esse, \"fumegará a ira do Senhor e o seu zelo\" (Dt 29:20). O Novo Testamento repete a imagem: guardai-vos da raiz de amargura (Hb 12:15)." },
  sodoma: {
    title: "Sodoma, memória do juízo",
    subtitle: "Deuteronômio 29:23 — a terra abrasada como sinal",
    text: "A terra da aliança quebrada será \"abrasada com enxofre, e sal, de sorte que não será semeada, e nada produzirá... assim como foi a destruição de Sodoma e de Gomorra, de Admá e de Zeboim\" (Dt 29:23). O nome de Sodoma funciona como marco de advertência: aquilo que Deus fez outrora \"na sua ira e no seu furor\" pode recair sobre um povo que conheceu a Lei. Israel não é imune por ser eleito — a eleição agrava a responsabilidade em vez de anulá-la." },
  gomorra: {
    title: "Gomorra, a cidade irmã do fogo",
    subtitle: "Deuteronômio 29:23 — a segunda testemunha da ruína",
    text: "Ao lado de Sodoma, Gomorra aparece na advertência de Moabe entre as cidades \"que o Senhor destruiu na sua ira e no seu furor\" (Dt 29:23). O nome volta no cântico de Moisés como retrato da corrupção de Israel: \"a sua vinha é a vinha de Sodoma e dos campos de Gomorra; as suas uvas são uvas venenosas\" (Dt 32:32). Quem imita a vinha das cidades queimadas colhe o mesmo fruto — e as gerações seguintes, vendo a terra estéril, perguntarão por que o Senhor assim fez (Dt 29:24)." },
  "outros-deuses": {
    title: "Outros deuses, que eles não conheceram",
    subtitle: "Deuteronômio 29:26; 30:17 — a troca que quebra a aliança",
    text: "A resposta ao espanto das nações é simples: \"foram, e serviram a outros deuses, e se inclinaram diante deles; deuses que eles não conheceram, e nenhum dos quais lhes tinha sido dado\" (Dt 29:26). Não foram enganados por uma revelação superior — correram atrás de nada. E o perigo permanece diante da escolha final: \"se o teu coração se desviar... e fores seduzido para te inclinares a outros deuses, e os servires\" (Dt 30:17), o fim é perecer. O ídolo nunca foi dado por Deus; é sempre escolha do coração." },
  "caminho-da-vida": {
    title: "O caminho da vida",
    subtitle: "Deuteronômio 30:19-20 — escolhe a vida, para que vivas",
    text: "\"Escolhe pois a vida, para que vivas, tu e a tua descendência\" (Dt 30:19). E o versículo seguinte define o que é essa vida: \"Amando ao Senhor teu Deus, dando ouvidos à sua voz, e achegando-te a ele; pois ele é a tua vida, e o prolongamento dos teus dias\" (Dt 30:20). A vida não é um prêmio separado de Deus — é o próprio Senhor. Andar nos seus caminhos e guardar os seus mandamentos (Dt 30:16) é permanecer junto à fonte de onde tudo o que vive procede." },
  "caminho-da-morte": {
    title: "O caminho da morte",
    subtitle: "Deuteronômio 30:15-19 — a alternativa posta diante do povo",
    text: "\"Vês aqui, hoje te tenho proposto a vida e o bem, e a morte e o mal\" (Dt 30:15). Moisés não deixa uma terceira via: há bênção e há maldição, e os céus e a terra são tomados por testemunhas contra o povo (Dt 30:19). A morte aqui não é fatalidade, é resultado do coração que se desvia e se inclina a outros deuses (Dt 30:17-18). O apelo é urgente porque a escolha é real e a palavra está \"mui perto de ti, na tua boca, e no teu coração\" (Dt 30:14)." },
  "coluna-de-nuvem": {
    title: "A coluna de nuvem à porta da tenda",
    subtitle: "Deuteronômio 31:15,23 — a presença que comissiona Josué",
    text: "\"Então o Senhor apareceu na tenda, na coluna de nuvem; e a coluna de nuvem estava sobre a porta da tenda\" (Dt 31:15). Dali Deus anuncia a Moisés a apostasia que virá (Dt 31:16) e manda escrever o cântico como testemunha. E dali mesmo comissiona o sucessor: \"Esforça-te e anima-te; porque tu introduzirás os filhos de Israel na terra que lhes jurei; e eu serei contigo\" (Dt 31:23). O líder muda, a nuvem permanece: a garantia de Josué não é a sua coragem, é a companhia do Senhor." },
  "idolo-jesurum": {
    title: "O ídolo de Jesurum",
    subtitle: "Deuteronômio 32:15-17 — o povo reto que engordou e deu coices",
    text: "Jesurum — \"o reto\", nome carinhoso de Israel — \"engordando-se... deu coices\" e \"deixou a Deus, que o fez, e desprezou a Rocha da sua salvação\" (Dt 32:15). A fartura da terra virou combustível de idolatria: \"sacrifícios ofereceram aos demônios, não a Deus; aos deuses que não conheceram, novos deuses que vieram há pouco\" (Dt 32:17). O cântico expõe o retrato mais triste da aliança — não a perseguição, mas a prosperidade que faz o povo esquecer quem lhe deu tudo." },
  "a-rocha": {
    title: "A Rocha, cuja obra é perfeita",
    subtitle: "Deuteronômio 32:4,13,31 — o nome de Deus no cântico de Moisés",
    text: "O cântico começa exaltando o caráter de Deus: \"Ele é a Rocha, cuja obra é perfeita, porque todos os seus caminhos justos são; Deus é a verdade, e não há nele injustiça; justo e reto é\" (Dt 32:4). Essa Rocha é firme e ao mesmo tempo generosa — dela Deus fez o povo \"chupar mel da rocha e azeite da dura pederneira\" (Dt 32:13). E é incomparável: \"a sua rocha não é como a nossa Rocha, sendo até os nossos inimigos juízes disto\" (Dt 32:31). Firmeza, doçura e exclusividade num só nome." },
  "a-rocha-esquecida": {
    title: "A Rocha esquecida",
    subtitle: "Deuteronômio 32:15,18 — o Deus que te gerou e foi desprezado",
    text: "O mesmo cântico que chama Deus de Rocha perfeita acusa: Jesurum \"desprezou a Rocha da sua salvação\" (Dt 32:15) e \"Esqueceste-te da Rocha que te gerou; e em esquecimento puseste o Deus que te formou\" (Dt 32:18). O pecado de Israel não é ignorância, é amnésia voluntária diante de quem o gerou. E o fruto dessa troca é vinha estragada: \"as suas uvas são uvas venenosas, cachos amargos têm\" (Dt 32:32). Quem larga a Rocha não fica sem apoio — fica apoiado no que não pode salvar." },
  "fogo-da-lei": {
    title: "O fogo da lei à direita do Senhor",
    subtitle: "Deuteronômio 33:2 — a bênção que começa em Sinai",
    text: "A última bênção de Moisés abre com uma teofania: \"O Senhor veio de Sinai, e lhes subiu de Seir; resplandeceu desde o monte Parã, e veio com dez milhares de santos; à sua direita havia para eles o fogo da lei\" (Dt 33:2). A Lei não é apresentada como peso, mas como esplendor que acompanha o Rei em marcha para abençoar as tribos. O fogo que apavorou em Horebe é aqui a luz que vai adiante do povo — santidade e amor no mesmo raio." },
  sarca: {
    title: "Aquele que habitava na sarça",
    subtitle: "Deuteronômio 33:16 — a benevolência que desce sobre José",
    text: "Ao abençoar José, Moisés invoca \"a benevolência daquele que habitava na sarça\" (Dt 33:16). É a memória de Horebe, onde o Senhor apareceu no fogo que ardia sem consumir o arbusto e se revelou como o Deus dos pais (Êx 3:2-6). Deus nunca é figura desenhada: aqui a sua presença é o fogo na sarça, mediador da voz. E o mesmo Deus que desceu para livrar do Egito é quem faz descer sobre José \"o mais excelente da terra, e da sua plenitude\"." },
  "cume-do-pisga": {
    title: "O cume do Pisga",
    subtitle: "Deuteronômio 34:1-5 — a terra vista e não pisada",
    text: "\"Então subiu Moisés das campinas de Moabe ao monte Nebo, ao cume de Pisga, que está em frente a Jericó e o Senhor mostrou-lhe toda a terra\" (Dt 34:1) — de Gileade a Dã, Efraim, Judá, o vale de Jericó, a cidade das palmeiras (Dt 34:2-3). Deus lhe diz: \"eu te faço vê-la com os teus olhos, porém lá não passarás\" (Dt 34:4). Ali \"morreu ali Moisés, servo do Senhor\" (Dt 34:5), sepultado pelo próprio Deus. O servo vê a promessa cumprir-se sem entrar nela: a fidelidade de Deus é maior do que a vida de qualquer mediador." },
  // ---- Juízes: os marcos dos dias em que não havia rei em Israel ----
  "palmeira-de-debora": {
    title: "As palmeiras de Débora",
    subtitle: "Jz 4:4-5 — o tribunal ao ar livre, entre Ramá e Betel",
    text: "\"Ela assentava-se debaixo das palmeiras de Débora, entre Ramá e Betel, nas montanhas de Efraim; e os filhos de Israel subiam a ela a juízo\" (Jz 4:5). Não há palácio nem cidade forte: o único lugar de justiça em Israel é a sombra de uma árvore, onde uma profetisa julga o povo enquanto Jabim os oprime com novecentos carros de ferro (Jz 4:3). Dali sai a convocação de Baraque ao monte Tabor (Jz 4:6) — a palavra de Deus fala antes que a espada se levante. Marco da misericórdia divina: quando o povo clama, o Senhor levanta juízes, e a justiça volta a ter endereço na terra.",
  },
  "carvalho-de-ofra": {
    title: "O carvalho de Ofra",
    subtitle: "Jz 6:11-24 — onde o Anjo do Senhor se assentou",
    text: "\"Então o anjo do Senhor veio, e assentou-se debaixo do carvalho que está em Ofra, que pertencia a Joás, abiezrita; e Gideão, seu filho, estava malhando o trigo no lagar, para o salvar dos midianitas\" (Jz 6:11). Debaixo daquela árvore, um homem escondido no lagar por medo ouve o nome que Deus lhe dá antes de qualquer feito: \"O Senhor é contigo, homem valoroso\" (Jz 6:12). Ali mesmo Gideão traz o cabrito e os pães ázimos e os oferece \"até debaixo do carvalho\" (Jz 6:19). Deus não é desenhado como figura: quem fala e come sob a copa é o Anjo do Senhor, e a árvore comum de um lavrador temeroso se torna o lugar do chamado.",
  },
  "penha-de-ofra": {
    title: "A penha que soltou fogo",
    subtitle: "Jz 6:20-21 — o altar improvisado de Gideão",
    text: "\"Toma a carne e os pães ázimos, e põe-nos sobre esta penha e derrama-lhe o caldo\" (Jz 6:20). Quando o Anjo do Senhor estendeu a ponta do cajado e tocou a oferta, \"subiu o fogo da penha, e consumiu a carne e os pães ázimos; e o anjo do Senhor desapareceu de seus olhos\" (Jz 6:21). A rocha nua vira altar, e o fogo que sobe de dentro dela é a assinatura de Deus sobre o chamado — o mesmo sinal que aceitou os sacrifícios de Israel (Lv 9:24). Gideão entende então com quem falava, e teme por ter visto o Anjo do Senhor face a face (Jz 6:22).",
  },
  "poste-idolo-de-baal": {
    title: "O bosque ao pé do altar de Baal",
    subtitle: "Jz 6:25-28 — o poste-ídolo que Gideão cortou",
    text: "\"Derruba o altar de Baal, que é de teu pai; e corta o bosque que está ao pé dele\" (Jz 6:25). O \"bosque\" (a Aserá) era o poste sagrado da deusa plantado junto ao altar, culto de fertilidade que Israel recebera ordem expressa de destruir (Dt 7:5; 16:21). O escândalo do texto é que esse altar estava na casa do próprio pai de Gideão: a apostasia não era só dos cananeus, era doméstica. Gideão o corta de noite, por temor, e usa a madeira do ídolo como lenha do holocausto (Jz 6:26-27) — a primeira libertação de Israel começa dentro de casa, antes de qualquer batalha.",
  },
  "fonte-de-harode": {
    title: "A fonte de Harode",
    subtitle: "Jz 7:1-7 — as águas onde o povo foi provado",
    text: "\"Se acamparam junto à fonte de Harode… perto do outeiro de Moré\" (Jz 7:1). O nome significa \"tremor\", e é ali que Deus reduz trinta e dois mil homens a trezentos: primeiro voltam os medrosos, depois a prova da água separa os que lambem com a mão dos que se abaixam de joelhos (Jz 7:3-7). A razão é dita sem rodeios: \"para que Israel não se glorie contra mim, dizendo: A minha mão me livrou\" (Jz 7:2). A fonte que devia dar confiança pela quantidade de bebedores torna-se a peneira de Deus — a vitória será claramente dele.",
  },
  "penha-de-orebe": {
    title: "A penha de Orebe",
    subtitle: "Jz 7:25 — onde caiu o príncipe de Midiã",
    text: "\"Prenderam a dois príncipes dos midianitas, a Orebe e a Zeebe; e mataram a Orebe na penha de Orebe, e a Zeebe mataram no lagar de Zeebe\" (Jz 7:25). Os homens de Efraim tomaram os vaus do Jordão até Bete-Bara, e o lugar da queda ficou com o nome do morto, marco de pedra na memória da terra. Séculos depois, a rocha ainda é lembrada como emblema do juízo de Deus sobre os opressores: \"Faze aos seus nobres como a Orebe e como a Zeebe\" (Sl 83:11; cf. Is 10:26). O monumento não celebra a espada de Israel, mas o dia em que o Senhor entregou Midiã com trezentos homens.",
  },
  "pedra-dos-setenta": {
    title: "A pedra sobre a qual morreram setenta",
    subtitle: "Jz 9:5,18 — o crime de Abimeleque em Ofra",
    text: "\"E veio à casa de seu pai, a Ofra, e matou a seus irmãos, os filhos de Jerubaal, setenta homens, sobre uma pedra\" (Jz 9:5). Não foi briga de guerra, foi execução ritualizada: uma única pedra, um por um, paga com prata tirada da casa de Baal-Berite (Jz 9:4). Jotão, o menor, escapa escondido e do monte Gerizim lança a parábola das árvores e a maldição que se cumpriria (Jz 9:7-20,57). A pedra fica no chão de Ofra como o preço de um trono tomado por sangue — o retrato do que acontece quando alguém se faz rei sem que Deus o tenha levantado.",
  },
  "pedaco-de-mo": {
    title: "O pedaço de mó de Tebes",
    subtitle: "Jz 9:50-56 — a pedra que quebrou o crânio de Abimeleque",
    text: "\"Porém uma mulher lançou um pedaço de uma mó sobre a cabeça de Abimeleque; e quebrou-lhe o crânio\" (Jz 9:53). Ele havia queimado a torre de Siquém com mil almas dentro e chegara ao pé da torre de Tebes para repetir o feito, quando lhe caiu do alto a pedra de moinho de uma mulher anônima. Envergonhado, pediu ao seu escudeiro que o matasse \"para que não se diga de mim: uma mulher o matou\" (Jz 9:54). O texto encerra sem meio-termo: \"Assim Deus fez tornar sobre Abimeleque o mal que tinha feito a seu pai, matando os seus setenta irmãos\" (Jz 9:56) — a mó doméstica cumpre a maldição de Jotão.",
  },
  "fonte-en-hacore": {
    title: "En-Hacoré, a fonte do que clama",
    subtitle: "Jz 15:18-19 — água aberta por Deus em Leí",
    text: "Depois de ferir mil homens com uma queixada de jumento, Sansão quase morre de sede e clama: \"Pela mão do teu servo tu deste esta grande salvação; morrerei eu pois agora de sede…?\" (Jz 15:18). \"Então Deus fendeu uma cavidade que estava na queixada; e saiu dela água, e bebeu; e recobrou o seu espírito e reanimou-se; por isso chamou aquele lugar: A fonte do que clama\" (Jz 15:19). O nome do lugar não guarda a façanha do herói, mas o seu clamor — a mesma bondade que abriu água da rocha no deserto (Êx 17:6). O forte de Israel só se sustenta enquanto reconhece de quem vem a força.",
  },
  "portas-de-gaza": {
    title: "As portas de Gaza no cume de Hebrom",
    subtitle: "Jz 16:1-3 — o cerco que virou troféu",
    text: "Os gazitas cercaram a cidade e puseram espias \"à porta da cidade\", dizendo: \"Até à luz da manhã esperaremos; então o mataremos\" (Jz 16:2). À meia-noite, Sansão \"arrancou as portas da entrada da cidade com ambas as umbreiras, e juntamente com a tranca as tomou, pondo-as sobre os ombros; e levou-as para cima até ao cume do monte que está defronte de Hebrom\" (Jz 16:3). A porta era a força e a honra de uma cidade antiga; arrancada e plantada num monte de Judá, tornou-se a zombaria pública da fortaleza filisteia. O escárnio, porém, é ambíguo: a mesma noite que mostra o poder do nazireu o mostra na casa de uma prostituta — a força de Deus sobre um homem que não guarda o coração.",
  },
  "mo-do-carcere": {
    title: "A mó do cárcere de Gaza",
    subtitle: "Jz 16:21 — o juiz de Israel moendo como escravo",
    text: "\"Então os filisteus pegaram nele, e arrancaram-lhe os olhos, e fizeram-no descer a Gaza, e amarraram-no com duas cadeias de bronze, e girava ele um moinho no cárcere\" (Jz 16:21). Girar a mó era trabalho de mulher ou de besta de carga; o homem que carregara as portas daquela mesma cidade agora anda em círculos, cego, dentro dela. O texto marcara a raiz da queda: \"ele não sabia que já o Senhor se tinha retirado dele\" (Jz 16:20). E acrescenta a única esperança da cena: \"o cabelo da sua cabeça começou a crescer\" (Jz 16:22) — Deus não desiste do seu instrumento quebrantado.",
  },
  "casa-de-dagom": {
    title: "A casa de Dagom",
    subtitle: "Jz 16:23-30 — o templo que caiu sobre os príncipes",
    text: "\"Os príncipes dos filisteus se ajuntaram para oferecer um grande sacrifício ao seu deus Dagom… e diziam: Nosso deus nos entregou nas mãos a Sansão\" (Jz 16:23). Ali o cativo cego é trazido para servir de diversão entre as colunas, e ora a última oração do livro: \"Senhor Deus, peço-te que te lembres de mim… fortalece-me agora só esta vez, ó Deus\" (Jz 16:28). A casa cheia de adoradores desaba, e \"foram mais os mortos que matou na sua morte do que os que matara em sua vida\" (Jz 16:30). O templo do ídolo que se gabava de ter vencido o Deus de Israel torna-se o túmulo dos seus próprios sacerdotes e senhores (cf. 1Sm 5:3-4).",
  },
  "sepulcro-de-manoa": {
    title: "O sepulcro de Manoá",
    subtitle: "Jz 16:31 — entre Zorá e Estaol",
    text: "\"Então seus irmãos desceram, e toda a casa de seu pai, e tomaram-no… e sepultaram-no entre Zorá e Estaol, no sepulcro de Manoá, seu pai. Ele julgou a Israel vinte anos\" (Jz 16:31). O nazireu volta a repousar exatamente entre os dois lugares onde o Espírito do Senhor começara a movê-lo (Jz 13:25) — a vida inteira cabe entre dois marcos daquele monte. Manoá e sua mulher haviam recebido o anúncio do filho pelo Anjo do Senhor e temido morrer por terem visto a Deus (Jz 13:22); agora sepultam o filho que nunca completou a libertação prometida. Ainda assim, o Novo Testamento o conta entre os que \"pela fé\" foram fortes na fraqueza (Hb 11:32-34): Deus honra a fé que os homens desperdiçam.",
  },
  "mil-e-cem-moedas-de-prata": {
    title: "As mil e cem moedas de prata",
    subtitle: "Jz 17:2-4 — a prata amaldiçoada que virou ídolo",
    text: "Mica confessa à mãe: \"As mil e cem moedas de prata que te foram tiradas, por cuja causa lançaste maldições… eis que esse dinheiro está comigo; eu o tomei\" (Jz 17:2). É a mesma soma que cada príncipe filisteu prometeu a Dalila por Sansão (Jz 16:5): o livro repete o preço para que se veja o que a prata compra em Israel. A mãe responde \"Bendito do Senhor seja meu filho\" e logo dedica o dinheiro \"da minha mão ao Senhor\" para fazer \"uma imagem de escultura e uma de fundição\" (Jz 17:3) — isto é, quebra o segundo mandamento (Êx 20:4) invocando o nome do primeiro. Roubo, maldição, bênção e idolatria no mesmo saco de moedas: a religião de quem faz \"o que parecia bem aos seus olhos\" (Jz 17:6).",
  },
  "forja-do-ourives": {
    title: "A forja do ourives",
    subtitle: "Jz 17:4 — duzentas moedas nas mãos do artífice",
    text: "\"Sua mãe tomou duzentas moedas de prata, e as deu ao ourives, o qual fez delas uma imagem de escultura e uma de fundição, que ficaram em casa de Mica\" (Jz 17:4). Do voto inteiro de mil e cem, só cerca de um quinto chega ao fogo: até a devoção é dosada. O fole e o cadinho desta oficina são os mesmos de Arão no Sinai (Êx 32:4) e os que os profetas ridicularizariam depois — \"o ourives o cobre de ouro… ele o firma para que não vacile\" (Is 40:19; 41:7). A cena mostra o coração da idolatria: um deus que precisa que alguém o funda, o pague e o carregue.",
  },
  "imagem-de-fundicao": {
    title: "A imagem de fundição",
    subtitle: "Jz 17:3-4 — o metal derretido em forma de deus",
    text: "A prata dedicada \"ao Senhor\" volta da forja como \"uma imagem de escultura e uma de fundição\" (Jz 17:3-4) — exatamente o que a Lei proibia sob juramento: \"Não farás para ti imagem de escultura… não te encurvarás a elas nem as servirás\" (Êx 20:4-5; Dt 27:15). Israel não trocou abertamente o Senhor por Baal aqui; pior, quis adorar o Senhor com um objeto fundido, do jeito dos vizinhos. É o pecado do bezerro de ouro repetido em escala doméstica (Êx 32:4-5). Estas duas peças de metal atravessarão o capítulo seguinte e acabarão como culto oficial de uma tribo inteira (Jz 18:30-31).",
  },
  "idolo-de-mica": {
    title: "O ídolo da casa de deuses de Mica",
    subtitle: "Jz 17:5 — o santuário particular de um homem de Efraim",
    text: "\"E teve este homem, Mica, uma casa de deuses; e fez um éfode e terafins, e consagrou um de seus filhos, para que lhe fosse por sacerdote\" (Jz 17:5). Tudo é imitação do culto verdadeiro — um santuário, uma veste sacerdotal, um sacerdote —, só que montado em casa, sem ordem de Deus e sem a tribo que ele escolheu. Quando um levita errante aparece, Mica conclui satisfeito: \"Agora sei que o SENHOR me fará bem; porquanto tenho um levita por sacerdote\" (Jz 17:13). É religião como seguro: usar o nome do Senhor para garantir prosperidade — a marca dos dias em que \"cada um fazia o que parecia bem aos seus olhos\" (Jz 17:6).",
  },
  "casa-de-mica": {
    title: "A casa de Mica, na montanha de Efraim",
    subtitle: "Jz 17–18 — a casa que virou templo",
    text: "\"Havia um homem da montanha de Efraim, cujo nome era Mica\" (Jz 17:1) — e o livro dedica dois capítulos inteiros à casa desse particular, porque nela cabe o retrato de Israel. Ali moram juntos o roubo confessado, a prata dedicada, o ídolo fundido, o éfode, os terafins e um levita alugado por \"dez moedas de prata, e vestuário, e o sustento\" por ano (Jz 17:10). Enquanto o tabernáculo estava em Siló (Jz 18:31), a devoção do povo se organizava no quintal de casa. E o desfecho é impiedoso: a mesma casa é saqueada pelos danitas, e Mica fica sem sacerdote e sem deuses, perguntando \"que é o que mais me resta?\" (Jz 18:24).",
  },
  "lais-quieta-e-confiada": {
    title: "Laís, quieta e confiada",
    subtitle: "Jz 18:7 — a cidade sem muros e sem defensor",
    text: "Os cinco espias de Dã \"chegaram a Laís; e viram que o povo que havia no meio dela estava seguro, conforme ao costume dos sidônios, quieto e confiado; nem havia autoridade alguma do reino que por qualquer coisa envergonhasse a alguém naquela terra; também estavam longe dos sidônios, e não tinham relação com ninguém\" (Jz 18:7). A descrição é de paz e fartura — e é justamente por isso que a marcam para a espada: \"a terra é muito boa… lugar em que não há falta de coisa alguma\" (Jz 18:9-10). Os espias ainda usam linguagem piedosa, \"Deus a entregou na vossa mão\", para justificar o assalto. A tribo que não tomou a herança que Deus lhe dera junto ao mar escolhe a presa mais fácil.",
  },
  "maane-da": {
    title: "Maané-Dã, o arraial dos seiscentos",
    subtitle: "Jz 18:11-12 — o acampamento por detrás de Quiriate-Jearim",
    text: "\"Partiram dali, da tribo dos danitas, de Zorá e de Estaol, seiscentos homens munidos de armas de guerra\" e \"acamparam-se em Quiriate-Jearim, em Judá; então chamaram a este lugar Maané-Dã\" — o arraial de Dã — \"até ao dia de hoje\" (Jz 18:11-12). O nome ficou fincado no mapa como lembrança de uma marcha que não foi guerra santa, mas migração armada em busca de herança mais cômoda. É o mesmo lugar onde o Espírito do Senhor começara a mover Sansão (Jz 13:25): a tribo que teve um juiz levantado por Deus agora se põe a caminho por conta própria. Deste acampamento sairá o roubo da casa de Mica e a destruição de Laís.",
  },
  "lais-queimada-a-fogo": {
    title: "Laís ferida e queimada a fogo",
    subtitle: "Jz 18:27-28 — a cidade pacífica destruída",
    text: "\"Chegaram a Laís, a um povo quieto e confiado, e os feriram ao fio da espada, e queimaram a cidade a fogo. E ninguém houve que os livrasse, porquanto estavam longe de Sidom, e não tinham relações com ninguém\" (Jz 18:27-28). Não houve provocação, oráculo do Senhor nem ordem de herem: apenas seiscentos homens armados contra gente indefesa e isolada. O contraste é brutal — a mesma tribo que fugiu dos amorreus e não sustentou a sua fronteira (Jz 1:34) mostra-se valente onde não há resistência. Quando Israel esquece o seu Deus, a força que devia servir à justiça vira instrumento de rapina.",
  },
  "da-que-antes-era-lais": {
    title: "Dã, que antes era Laís",
    subtitle: "Jz 18:28-29 — a cidade reedificada com nome novo",
    text: "\"Depois reedificaram a cidade e habitaram nela. E chamaram-lhe Dã, conforme ao nome de Dã, seu pai… era, porém, antes o nome desta cidade Laís\" (Jz 18:28-29). Este é o marco do extremo norte de Israel — o \"de Dã até Berseba\" que a Escritura usaria para dizer \"o país inteiro\" (1Sm 3:20) — e nasceu de uma conquista sem mandato divino. Dar o nome do pai da tribo à cidade tomada é reivindicar como herança aquilo que se tomou pela força. Séculos depois, Jeroboão poria ali um dos seus bezerros de ouro (1Rs 12:29-30): o lugar do primeiro santuário ilegítimo continuou sendo o lugar do cisma.",
  },
  "imagem-de-escultura-em-da": {
    title: "A imagem de escultura levantada em Dã",
    subtitle: "Jz 18:30-31 — o ídolo roubado vira culto de uma tribo",
    text: "\"E os filhos de Dã levantaram para si aquela imagem de escultura; e Jônatas, filho de Gérson, o filho de Manassés, ele e seus filhos foram sacerdotes da tribo dos danitas, até ao dia do cativeiro da terra\" (Jz 18:30). O sacerdócio deste santuário é hereditário e — segundo o próprio texto — descende de Gérson, filho de Moisés: a apostasia chegou à família do maior mediador de Israel. O que começou como devoção caseira de um homem terminou como religião oficial de uma tribo inteira, durando gerações. \"Assim, pois, estabeleceram para si a imagem de escultura, que fizera Mica, por todos os dias em que a casa de Deus esteve em Siló\" (Jz 18:31).",
  },
  "casa-de-deus-em-silo": {
    title: "A casa de Deus em Siló",
    subtitle: "Jz 18:31 — o tabernáculo verdadeiro, a poucas jornadas dali",
    text: "O narrador guarda para o último versículo a frase que julga tudo: os danitas serviram ao ídolo de Mica \"por todos os dias em que a casa de Deus esteve em Siló\" (Jz 18:31). Em Siló estava o tabernáculo armado por Josué e a arca da aliança, o único lugar que o Senhor escolhera para pôr o seu nome (Js 18:1; Dt 12:5). Ou seja: enquanto o culto verdadeiro estava de pé e acessível, Israel preferiu um deus de prata mais perto de casa. Séculos depois, o profeta mandaria olhar para as ruínas: \"ide agora ao meu lugar, que estava em Siló, onde, ao princípio, fiz habitar o meu nome, e vede o que lhe fiz\" (Jr 7:12).",
  },
  "casa-do-pai-da-moca": {
    title: "A casa do pai da moça, em Belém de Judá",
    subtitle: "Jz 19:3-9 — cinco dias de hospitalidade insistente",
    text: "O levita desce a Belém \"para lhe falar conforme ao seu coração, e para tornar a trazê-la\", e o sogro, \"vendo-o o pai da moça, alegrou-se ao encontrar-se com ele\" (Jz 19:3). O que se segue é uma cortesia sem fim — comer, beber, ficar mais um dia, \"conforta o teu coração\" — que retém o casal até a tarde do quinto dia (Jz 19:4-9). Esta casa de Belém é o último lugar seguro da narrativa: nela há pão, vinho e portas que se abrem. O contraste com Gibeá, a poucas horas de estrada, é o argumento inteiro do capítulo — e o atraso gentil do velho pai é o que empurra os viajantes para a noite.",
  },
  "jebus-que-e-jerusalem": {
    title: "Jebus, que é Jerusalém",
    subtitle: "Jz 19:10-12 — a cidade estranha que foi evitada",
    text: "\"Chegou até defronte de Jebus (que é Jerusalém)\", e o moço propôs: \"retiremo-nos a esta cidade dos jebuseus, e passemos ali a noite\" (Jz 19:10-11). O senhor recusa por princípio: \"Não nos retiraremos a nenhuma cidade estranha, que não seja dos filhos de Israel; mas iremos até Gibeá\" (Jz 19:12). A ironia é o eixo da história — a cidade pagã teria sido mais segura que a cidade da tribo de Benjamim. Jebus ainda estava em mãos estrangeiras porque Judá e Benjamim não a expulsaram (Jz 1:21); um dia seria a cidade de Davi e o lugar do templo, mas naquela noite era apenas o lugar que um israelita julgou perigoso demais.",
  },
  "gibea-de-benjamim": {
    title: "Gibeá de Benjamim",
    subtitle: "Jz 19:14-15 — a cidade onde o sol se pôs",
    text: "\"Passaram, pois, adiante, e caminharam, e o sol se lhes pôs junto a Gibeá, que é cidade de Benjamim\" (Jz 19:14). Ali o viajante que fugiu da cidade dos jebuseus descobre que entre os seus \"não houve quem os recolhesse em casa para ali passarem a noite\" (Jz 19:15). Recusar hospedagem já era, no Oriente antigo, quebra grave do dever para com o forasteiro (Lv 19:34; Dt 10:19); o que aconteceria depois faria de Gibeá sinônimo de corrupção — \"pecaram desde os dias de Gibeá\" (Os 9:9; 10:9). Desta cidade sairia também o primeiro rei de Israel (1Sm 10:26), e a noite descrita aqui custaria à tribo de Benjamim quase a sua existência (Jz 20:46-48).",
  },
  "praca-de-gibea": {
    title: "A praça de Gibeá",
    subtitle: "Jz 19:15-21 — o viajante assentado ao relento",
    text: "\"Entrando ele, assentou-se na praça da cidade, porque não houve quem os recolhesse em casa\" (Jz 19:15). A praça junto à porta era o lugar público onde o forasteiro esperava ser convidado; ficar ali ao anoitecer era um atestado de que a cidade fechara o coração — como em Sodoma, onde Ló insistiu para que os hóspedes não passassem a noite na rua (Gn 19:2-3). Só um velho de passagem, ele mesmo peregrino vindo da montanha de Efraim, levanta os olhos e pergunta: \"Para onde vais, e donde vens?\" (Jz 19:17). E lhe diz: \"Paz seja contigo… tão-somente não passes a noite na praça\" (Jz 19:20) — em Gibeá, a hospitalidade sobrevive apenas num estrangeiro.",
  },
  "casa-do-velho-de-gibea": {
    title: "A casa do velho de Efraim",
    subtitle: "Jz 19:16-24 — o único abrigo de Gibeá",
    text: "\"Eis que um velho homem vinha à tarde do seu trabalho do campo; e era este homem da montanha de Efraim, mas peregrinava em Gibeá; eram porém os homens deste lugar filhos de Benjamim\" (Jz 19:16). O texto sublinha que o único hospitaleiro da cidade não é dali: leva o levita para casa, dá pasto aos jumentos, lava-lhes os pés, dá-lhes de comer e beber (Jz 19:21). Naquela mesma noite a casa é cercada, e o velho sai a suplicar: \"não façais tal loucura\" (Jz 19:23) — e então oferece a própria filha, mostrando que nem o justo daquele lugar tem mais um padrão íntegro. A casa que devia ser refúgio termina como palco do horror que dividiria Israel.",
  },
  "porta-da-casa-em-gibea": {
    title: "A porta da casa, ao romper da manhã",
    subtitle: "Jz 19:22-27 — o limiar onde a mulher caiu",
    text: "A porta atravessa a cena inteira: os filhos de Belial \"cercaram a casa, batendo à porta\" (Jz 19:22); por ela a concubina é lançada para fora; e \"ao romper da manhã veio a mulher, e caiu à porta da casa daquele homem, onde estava seu senhor\" (Jz 19:26). Quando o levita abre \"as portas da casa\" para seguir viagem, \"eis que a mulher, sua concubina, jazia à porta da casa, com as mãos sobre o limiar\" (Jz 19:27). O limiar é a fronteira entre o abrigo e a violência, e as mãos estendidas sobre ele acusam a covardia do homem que a entregou. Nenhuma outra imagem do livro diz com tanta força onde chegou Israel quando \"cada um fazia o que parecia bem aos seus olhos\" (Jz 21:25).",
  },
  "casa-do-levita-em-efraim": {
    title: "A casa do levita em Efraim",
    subtitle: "Jz 19:28-30 — o fim da viagem, e o cutelo",
    text: "\"Chegando, pois, à sua casa, tomou um cutelo, e pegou na sua concubina, e a despedaçou com os seus ossos em doze partes; e enviou-as por todos os termos de Israel\" (Jz 19:29). O gesto é uma convocação — como Saul faria com uma junta de bois (1Sm 11:7) —, mas feita sobre o corpo de uma vítima que ele mesmo entregou. A reação do povo é unânime: \"nunca tal se fez, nem se viu desde o dia em que os filhos de Israel subiram da terra do Egito… considerai isso, consultai, e falai\" (Jz 19:30). Desta casa sai o clamor que convoca a nação a Mispá e leva à guerra contra Benjamim (Jz 20).",
  },
  // ---- Rute: os marcos do livro da remissão ----
  "voto-de-rute": {
    title: "A estrela sobre o voto de Rute",
    subtitle: "Rt 1:16-17 — a aliança jurada na estrada de Moabe",
    text: "Na estrada entre Moabe e Judá, uma viúva moabita se apega à sogra e faz o juramento mais claro de conversão em todo o Antigo Testamento: \"aonde quer que tu fores irei eu… o teu povo é o meu povo, o teu Deus é o meu Deus\" (Rt 1:16). E o sela com a fórmula de aliança diante do Senhor: \"Faça-me assim o Senhor, e outro tanto, se outra coisa que não seja a morte me separar de ti\" (Rt 1:17). A lei excluía Moabe da congregação (Dt 23:3), mas a graça recebe quem vem \"abrigar-se sob as suas asas\" (Rt 2:12). O céu que se abre sobre a cena lembra a promessa feita a Abraão sob as estrelas (Gn 15:5): é ali, num voto de pobre, que a linhagem do Rei recomeça.",
  },
  "estrela-de-belem": {
    title: "A estrela sobre Belém",
    subtitle: "Rt 4:17-22 — a linhagem que vai de Perez a Davi",
    text: "O livro termina com uma genealogia e o nome de um rei: \"Obede gerou a Jessé, e Jessé gerou a Davi\" (Rt 4:22). O que parecia história doméstica de fome, viuvez e respiga era, o tempo todo, o caminho por onde Deus trouxe o trono de Israel à cidadezinha de Belém — onde Samuel ungiria o pastorzinho entre os filhos de Jessé (1Sm 16:1,13). A estrela sobre a cidade recorda a profecia do próprio Moabe: \"uma estrela procederá de Jacó, e um cetro subirá de Israel\" (Nm 24:17). E aponta adiante de Davi, para Belém-Efrata, de onde sairia \"aquele que há de reinar em Israel\" (Mq 5:2; Mt 1:5-6).",
  },
  // ---- Altares: o do SENHOR, e os que hão de ser derrubados ----
  "altar": {
    title: "O altar do SENHOR",
    subtitle: "Nm 29:2; Dt 17:1 — o holocausto em cheiro suave",
    text: "É o altar do holocausto diante da tenda: ali sobe o sacrifício \"em cheiro suave ao Senhor\" (Nm 29:2), e ali se cumprem as solenidades \"além dos vossos votos, e das vossas ofertas voluntárias\" (Nm 29:39). A Lei o cerca de santidade: o primogênito macho do gado é santificado ao Senhor (Dt 15:19), nada defeituoso lhe é trazido, \"pois abominação é ao SENHOR teu Deus\" (Dt 17:1), e junto dele não se planta árvore nem se levanta imagem (Dt 16:21-22). Este altar único, onde o sangue é derramado por outrem, é a sombra do sacrifício \"uma vez por todas\" oferecido por Cristo (Hb 10:10-12).",
  },
  "altar-das-nacoes": {
    title: "Os altares das nações",
    subtitle: "Dt 12:2 — sobre os altos, debaixo de toda árvore frondosa",
    text: "Israel havia de destruir \"todos os lugares, onde as nações que possuireis serviram os seus deuses, sobre as altas montanhas, e sobre os outeiros, e debaixo de toda a árvore frondosa\" (Dt 12:2). Não era intolerância cega, mas cirurgia: o culto cananeu chegava a queimar filhos no fogo (Dt 12:31), e o altar que fica de pé acaba por reclamar adoradores. Contra a multidão de altares das nações, o Senhor põe um só lugar — \"o lugar que o Senhor vosso Deus escolher… para ali pôr o seu nome\" (Dt 12:5). Um Deus, um altar, um caminho: a exclusividade do culto é a face visível do primeiro mandamento.",
  },
  "altar-de-baal": {
    title: "O altar de Baal, na casa do pai de Gideão",
    subtitle: "Jz 6:25-27 — o ídolo dentro de casa",
    text: "A primeira batalha de Gideão não foi contra Midiã, mas contra o altar do seu próprio pai: \"derruba o altar de Baal, que é de teu pai; e corta o bosque que está ao pé dele\" (Jz 6:25). O opressor de fora só prevalecia porque a idolatria já morava dentro — Israel \"fez o que era mau aos olhos do Senhor\" e por isso foi entregue (Jz 6:1). Gideão obedece de noite, \"porque temia\" (Jz 6:27), e ainda assim obedece: a fé fraca que age vale mais que a coragem que não se move. Antes de haver libertação, tem de haver arrependimento na própria casa.",
  },
  "altar-derrubado": {
    title: "O altar derrubado e as imagens queimadas",
    subtitle: "Dt 12:3 — apagar o nome do ídolo daquele lugar",
    text: "\"E derrubareis os seus altares, e quebrareis as suas estátuas, e os seus bosques queimareis a fogo, e destruireis as imagens esculpidas dos seus deuses, e apagareis o seu nome daquele lugar\" (Dt 12:3). Quatro verbos de demolição para uma só ordem: onde estava o nome do ídolo, nada há de restar. O contraste é imediato e proposital — apaga-se ali um nome para que noutro lugar seja posto o Nome do Senhor (Dt 12:5). O evangelho segue a mesma ordem: os que se converteram \"deixaram os ídolos, para servir ao Deus vivo e verdadeiro\" (1Ts 1:9).",
  },
  "altar-do-nome": {
    title: "O altar no lugar do Nome",
    subtitle: "Dt 12:27; 26:2-10 — o único altar do único Deus",
    text: "É o altar do santuário central, no \"lugar que escolher o Senhor teu Deus, para ali fazer habitar o seu nome\" (Dt 26:2). Sobre ele se oferecem \"a carne e o sangue\", e o sangue dos sacrifícios \"se derramará sobre o altar do Senhor teu Deus\" (Dt 12:27). Diante dele o israelita põe o cesto das primícias e confessa a sua história: \"Arameu, prestes a perecer, foi meu pai\" (Dt 26:5), e adora reconhecendo que a terra e o fruto são dádiva. Um só altar dizia, em pedra, que há um só Deus e um só caminho até Ele (Jo 14:6).",
  },
  "altar-ebal": {
    title: "O altar de pedras brutas no monte Ebal",
    subtitle: "Dt 27:5-7 — sem ferro sobre as pedras",
    text: "No monte da maldição, Israel havia de edificar \"um altar de pedras; não alçarás instrumento de ferro sobre elas\" (Dt 27:5): pedra bruta, sem lavor humano, para que ninguém glorie na própria obra. Ao lado ficam as pedras caiadas com \"todas as palavras desta lei\" (Dt 27:8) — a Lei que acusa e o altar que expia, um ao lado do outro. E o rito termina em festa: \"sacrificarás ofertas pacíficas, e ali comerás perante o Senhor teu Deus, e te alegrarás\" (Dt 27:7). Josué cumpriu isto à risca ao entrar na terra (Js 8:30-32): a conquista começa com sacrifício, não com espada.",
  },
  "altar-idolo": {
    title: "Os altares dos povos, entregues à destruição",
    subtitle: "Dt 7:5 — derrubar, quebrar, cortar, queimar",
    text: "A ordem é sumária: \"Derrubareis os seus altares, quebrareis as suas estátuas; e cortareis os seus bosques, e queimareis a fogo as suas imagens de escultura\" (Dt 7:5). A razão está no versículo anterior: os casamentos com os cananeus desviariam os filhos de Israel \"para servirem a outros deuses\" (Dt 7:4). Não se negocia com aquilo que rouba o coração — por isso o povo santo, escolhido \"para lhe ser o seu povo próprio\" (Dt 7:6), não guarda relíquia alguma do culto que destrói. O mesmo zelo é pedido ao crente sobre os ídolos do coração (1Jo 5:21).",
  },
  "altar-novo-de-gideao": {
    title: "O altar novo de Gideão, no cume do lugar forte",
    subtitle: "Jz 6:26-28 — o segundo boi, com a lenha do bosque",
    text: "Onde caiu o altar de Baal, o Senhor manda levantar outro: \"edifica ao Senhor teu Deus um altar no cume deste lugar forte… e toma o segundo boi, e o oferecerás em holocausto com a lenha que cortares do bosque\" (Jz 6:26). A própria madeira do ídolo vira lenha para o sacrifício ao Deus vivo — o que servia à mentira arde em honra da verdade. De madrugada a cidade acorda e vê tudo: \"eis que estava o altar de Baal derrubado… e o segundo boi oferecido no altar que fora edificado\" (Jz 6:28). Derrubar não basta: onde se tira um culto falso, é preciso erguer o verdadeiro.",
  },
  "altar-o-senhor-e-paz": {
    title: "O altar \"O SENHOR É PAZ\", em Ofra",
    subtitle: "Jz 6:24 — Jeová-Salom, depois do temor da morte",
    text: "Vendo que falara com o Anjo do Senhor, Gideão teme morrer, e ouve: \"Paz seja contigo; não temas; não morrerás\" (Jz 6:23). \"Então Gideão edificou ali um altar ao SENHOR, e chamou-lhe: O SENHOR É PAZ; e ainda até o dia de hoje está em Ofra dos abiezritas\" (Jz 6:24). O nome é confissão: a paz não é ausência de Midiã, é o próprio Senhor recebendo em graça quem merecia perecer. É a mesma paz \"pelo sangue da sua cruz\" (Cl 1:20), com que somos justificados e temos paz com Deus (Rm 5:1).",
  },
  "altar-ofertas": {
    title: "O altar das ofertas e as porções dos sacerdotes",
    subtitle: "Nm 18:8-19 — o sustento de quem serve ao santuário",
    text: "Depois da rebelião de Coré, o Senhor firma o sacerdócio e o sustenta do próprio altar: \"Eis que eu te tenho dado a guarda das minhas ofertas alçadas, com todas as coisas santas dos filhos de Israel\" (Nm 18:8). O sangue dos primogênitos é aspergido sobre o altar e a gordura queimada \"em oferta queimada de cheiro suave ao Senhor\" (Nm 18:17), e a parte restante é comida pelos sacerdotes como \"aliança de sal perpétua\" (Nm 18:19). Levi não recebe herança na terra porque \"eu sou a tua parte e a tua herança\" (Nm 18:20). Daqui Paulo tira a regra do evangelho: \"os que servem ao altar participam do altar\" (1Co 9:13-14).",
  },
  // ---- A arca da aliança em três cenas ----
  "arca-alianca": {
    title: "A arca que ficou no arraial",
    subtitle: "Nm 14:44 — subir sem Deus é subir para a derrota",
    text: "Depois de recusarem entrar quando Deus mandou, o povo resolve entrar quando Deus proíbe: \"temerariamente, tentaram subir ao cume do monte; mas a arca da aliança do Senhor e Moisés não se apartaram do meio do arraial\" (Nm 14:44). A arca parada é o sermão mudo daquela cena — a presença do Senhor não acompanha a presunção, e sem ela a vitória é impossível: \"não subais, porque o Senhor não estará no meio de vós\" (Nm 14:42). O fim é imediato: os amalequitas e cananeus os derrotam \"até Hormá\" (Nm 14:45). Arrependimento tardio que insiste na própria vontade não é fé, é teimosia.",
  },
  "arca-da-alianca": {
    title: "A arca da aliança e o livro posto ao seu lado",
    subtitle: "Dt 31:9,25-26 — a Lei por testemunha",
    text: "Moisés escreveu esta lei e a deu \"aos sacerdotes, filhos de Levi, que levavam a arca da aliança do Senhor\" (Dt 31:9); depois mandou: \"Tomai este livro da lei, e ponde-o ao lado da arca da aliança do Senhor vosso Deus, para que ali esteja por testemunha contra ti\" (Dt 31:26). Dentro da arca estavam as tábuas, coração do concerto; ao lado dela, o livro que testifica. É o retrato de um povo guardado pela presença e medido pela palavra — as duas coisas inseparáveis. O mesmo Deus que habita no meio do seu povo é o que o julga pela sua própria Lei (Hb 4:12-13).",
  },
  "arca-em-silo": {
    title: "A arca na casa de Deus, em Siló",
    subtitle: "Jz 18:31 — o santuário verdadeiro, a poucos dias de distância",
    text: "O narrador fecha o episódio de Dã com uma frase demolidora: estabeleceram para si a imagem de escultura de Mica \"por todos os dias em que a casa de Deus esteve em Siló\" (Jz 18:31). Não faltava santuário legítimo, nem arca, nem sacerdócio: faltava vontade de buscá-los. Enquanto a arca da aliança repousava em Siló (Js 18:1; 1Sm 3:3), uma tribo inteira preferia um ídolo roubado e um levita alugado. É o retrato exato do tempo em que \"cada um fazia o que parecia bem aos seus olhos\" (Jz 17:6) — culto inventado ao lado do culto revelado.",
  },
  // ---- Números: as codornizes, as trombetas, o rol das jornadas ----
  "codornizes": {
    title: "As codornizes trazidas pelo vento",
    subtitle: "Nm 11:31-34 — a carne pedida com choro, e a praga",
    text: "\"Então soprou um vento do Senhor e trouxe codornizes do mar, e as espalhou pelo arraial quase caminho de um dia… quase dois côvados sobre a terra\" (Nm 11:31). Deus concedeu com fartura o que o povo exigira com pranto, mas o dom pedido em incredulidade tornou-se juízo: \"quando a carne estava entre os seus dentes… feriu o Senhor o povo com uma praga mui grande\" (Nm 11:33). O lugar ficou chamado Quibrote-Ataavá, as \"sepulturas da concupiscência\" (Nm 11:34). Há orações atendidas que nos empobrecem: \"deu-lhes o que pediram, mas enviou magreza às suas almas\" (Sl 106:15).",
  },
  "trombetas": {
    title: "As trombetas do alarido, na mão de Finéias",
    subtitle: "Nm 31:6 — a guerra travada diante do Senhor",
    text: "Israel não sai contra Midiã como exército comum: \"Moisés os mandou à guerra, mil de cada tribo, e com eles Finéias, filho de Eleazar, o sacerdote, com os vasos do santuário, e com as trombetas do alarido na sua mão\" (Nm 31:6). As trombetas de prata tinham promessa anexa: tocando-as ao sair contra o inimigo, \"perante o Senhor vosso Deus haverá lembrança de vós, e sereis salvos\" (Nm 10:9). O som não é sinal tático apenas — é oração audível, o povo pondo a causa nas mãos de Deus. A batalha se vence onde é lembrada diante d'Ele.",
  },
  "rol": {
    title: "O rol das jornadas, escrito por Moisés",
    subtitle: "Nm 33:1-2 — quarenta anos anotados nome por nome",
    text: "\"E escreveu Moisés as suas saídas, segundo as suas jornadas, conforme ao mandado do Senhor\" (Nm 33:2). O registro não nasceu de zelo de arquivista: foi ordenado por Deus. Cada acampamento entre Ramessés e as campinas de Moabe — os de murmuração e os de misericórdia — fica escrito, para que a geração seguinte leia a fidelidade de Deus na letra miúda do deserto. É a memória feita dever: \"lembrar-te-ás de todo o caminho pelo qual o Senhor teu Deus te guiou\" (Dt 8:2). Deus não esquece um passo dos seus, e quer que os seus também não esqueçam.",
  },
  // ---- Deuteronômio: festas, colheita, lugar, rei e livro ----
  "pascoa": {
    title: "A páscoa no mês de Abibe",
    subtitle: "Dt 16:1-8 — o cordeiro, à noite, no lugar do Nome",
    text: "\"Guarda o mês de Abibe, e celebra a páscoa ao SENHOR teu Deus; porque no mês de Abibe o SENHOR teu Deus te tirou do Egito, de noite\" (Dt 16:1). O sacrifício não pode ser feito em qualquer porta, mas no lugar que o Senhor escolher (Dt 16:5-6), e com pão ázimo, \"pão de aflição\", para que o povo se lembre \"todos os dias da tua vida\" do dia da saída (Dt 16:3). A libertação é anual e é pessoal: cada geração come como quem foi tirada do Egito. O cordeiro pascal aponta diretamente para \"Cristo, nossa páscoa\", sacrificado por nós (1Co 5:7; Jo 1:29).",
  },
  "feixes": {
    title: "Os feixes da festa das semanas",
    subtitle: "Dt 16:9-12 — desde que a foice começa na seara",
    text: "\"Sete semanas contarás; desde que a foice começar na seara iniciarás a contar as sete semanas\" (Dt 16:9); então vem a festa, e a oferta é \"voluntária da tua mão, segundo o Senhor teu Deus te houver abençoado\" (Dt 16:10). A alegria é obrigatoriamente partilhada — filho, serva, levita, estrangeiro, órfão e viúva (Dt 16:11) —, e o motivo é a memória: \"lembrar-te-ás de que foste servo no Egito\" (Dt 16:12). Quem colhe fartura e se lembra da própria escravidão não fecha a mão. Nesta festa, séculos depois, seria derramado o Espírito sobre a Igreja (At 2:1-4).",
  },
  "molho-esquecido": {
    title: "O molho esquecido no campo",
    subtitle: "Dt 24:19 — a colheita que Deus reserva ao pobre",
    text: "\"Quando no teu campo colheres a tua colheita, e esqueceres um molho no campo, não tornarás a tomá-lo; para o estrangeiro, para o órfão, e para a viúva será; para que o Senhor teu Deus te abençoe em toda a obra das tuas mãos\" (Dt 24:19). O esquecimento vira lei de misericórdia: o dono não volta atrás, porque aquele feixe já não é dele. A mesma regra vale para a oliveira e a vinha (Dt 24:20-21), sempre com a memória do Egito por fundamento (Dt 24:22). Foi de uma respiga assim que Rute, a moabita, comeu nos campos de Boaz (Rt 2:2-3) — e dessa colheita deixada aos pobres veio a linhagem de Davi.",
  },
  "primicias": {
    title: "O molho das primícias, movido perante o Senhor",
    subtitle: "Lv 23:10-14 — o primeiro feixe da sega",
    text: "\"Quando houverdes entrado na terra… e fizerdes a sua colheita, então trareis um molho das primícias da vossa sega ao sacerdote\" (Lv 23:10), e ele o moverá perante o Senhor \"para que sejais aceitos\" (Lv 23:11), com um cordeiro sem defeito em holocausto (Lv 23:12). Nada da nova safra podia ser comido antes dessa oferta (Lv 23:14): o primeiro punhado consagra toda a seara e confessa de quem é a terra. O Novo Testamento lê a figura sem rodeios — \"Cristo é as primícias; depois os que são de Cristo, na sua vinda\" (1Co 15:23): o primeiro feixe ressuscitado garante a colheita inteira.",
  },
  "lugar": {
    title: "O lugar que o Senhor escolher, para as causas difíceis",
    subtitle: "Dt 17:8-13 — o tribunal supremo junto ao santuário",
    text: "\"Quando alguma coisa te for difícil demais em juízo, entre sangue e sangue, entre demanda e demanda… então te levantarás, e subirás ao lugar que escolher o Senhor teu Deus\" (Dt 17:8). Ali, diante dos sacerdotes levitas e do juiz daqueles dias, se anuncia a sentença (Dt 17:9), e dela não se desvia \"nem para a direita nem para a esquerda\" (Dt 17:11). A última instância de Israel não fica no palácio, mas no santuário: o direito humano é ancorado na presença de Deus. Quem despreza esse juízo despreza a Deus, \"e todo o povo o ouça, e tema\" (Dt 17:13).",
  },
  "trono": {
    title: "O trono do rei que o Senhor escolher",
    subtitle: "Dt 17:14-20 — a realeza sob a Lei",
    text: "Deus prevê o pedido — \"Porei sobre mim um rei, assim como têm todas as nações\" (Dt 17:14) — e o disciplina: o rei será escolhido pelo Senhor, dentre os irmãos, e não multiplicará para si cavalos, mulheres, prata nem ouro (Dt 17:15-17). O trono de Israel não é absoluto; está debaixo da Lei, para que o coração do rei \"não se levante sobre os seus irmãos\" (Dt 17:20). Salomão quebraria cada uma dessas cláusulas (1Rs 10:26-11:4). Só um Rei nascido dessa linhagem guardaria inteiramente a palavra do Pai, e no seu trono \"não haverá fim\" (Lc 1:32-33).",
  },
  "traslado-da-lei": {
    title: "O traslado da Lei, escrito pelo próprio rei",
    subtitle: "Dt 17:18-20 — o rei copista das palavras de Deus",
    text: "\"Quando se assentar sobre o trono do seu reino, então escreverá para si num livro, um traslado desta lei, do original que está diante dos sacerdotes levitas\" (Dt 17:18). O primeiro ato de governo é copiar a Palavra à mão — e depois lê-la: \"o terá consigo, e nele lerá todos os dias da sua vida, para que aprenda a temer ao Senhor seu Deus\" (Dt 17:19). O cetro fica assim submetido ao livro, e o rei se torna o primeiro discípulo do reino. É o homem \"cuja delícia está na lei do Senhor\", que nela medita de dia e de noite (Sl 1:2).",
  },
  "coisas-reveladas": {
    title: "As coisas reveladas, e as encobertas",
    subtitle: "Dt 29:29 — o limite do saber e o dever de obedecer",
    text: "\"As coisas encobertas pertencem ao Senhor nosso Deus, porém as reveladas nos pertencem a nós e a nossos filhos para sempre, para que cumpramos todas as palavras desta lei\" (Dt 29:29). O versículo traça duas fronteiras: há um segredo que é de Deus e não nos cabe forçar, e há uma palavra dada que nos cabe obedecer — e ensinar aos filhos. A curiosidade sobre o oculto não desculpa a desobediência ao que já está claro. Toda a Escritura foi dada \"para que o homem de Deus seja perfeito, e perfeitamente instruído para toda a boa obra\" (2Tm 3:16-17): o revelado basta.",
  },
  "navios-do-exilio": {
    title: "Os navios que voltam ao Egito",
    subtitle: "Dt 28:68 — a maldição que desfaz o Êxodo",
    text: "A última das maldições é a mais amarga: \"o Senhor te fará voltar ao Egito em navios, pelo caminho de que te tenho dito; nunca jamais o verás; e ali sereis vendidos como escravos e escravas aos vossos inimigos; mas não haverá quem vos compre\" (Dt 28:68). O caminho da redenção é percorrido ao contrário — o povo tirado do Egito com mão forte é devolvido à servidão, e nem valor de escravo lhe resta. É o retrato do que faz o pecado persistente: desfaz a libertação e espalha o povo \"entre todos os povos\" (Dt 28:64). Só a graça reverte esse rumo, recolhendo os dispersos (Dt 30:3-4).",
  },
  // ---- Juízes: o velo, o pão do sonho, e os cultos inventados ----
  "velo-na-eira": {
    title: "O velo de lã na eira",
    subtitle: "Jz 6:36-40 — o orvalho como sinal ao coração medroso",
    text: "\"Eis que eu porei um velo de lã na eira; se o orvalho estiver somente no velo, e toda a terra ficar seca, então conhecerei que hás de livrar a Israel por minha mão\" (Jz 6:37). Deus concede o sinal — de manhã Gideão espremeu do velo \"uma taça de água\" (Jz 6:38) — e concede também o inverso, quando ele pede outra vez, temendo abusar: \"só o velo ficou seco, e sobre toda a terra havia orvalho\" (Jz 6:40). Não é modelo de como buscar a vontade de Deus, que já fora dita com clareza (Jz 6:14,16); é retrato da paciência de Deus com a fé fraca de quem, apesar de tudo, obedece.",
  },
  "pao-de-cevada-do-sonho": {
    title: "O pão de cevada que rola pelo arraial",
    subtitle: "Jz 7:13-14 — o sonho do midianita, ouvido por Gideão",
    text: "Na véspera do ataque, Gideão ouve um midianita contar ao companheiro: \"um pão de cevada torrado rodava pelo arraial dos midianitas, e chegava até à tenda, e a feriu, e caiu, e a transtornou\" (Jz 7:13). A interpretação vem da boca do próprio inimigo: \"não é isto outra coisa, senão a espada de Gideão… Deus tem dado na sua mão aos midianitas\" (Jz 7:14). Pão de cevada era comida de pobre, e Gideão era o menor da casa de seu pai (Jz 6:15) — Deus escolhe o fraco para envergonhar o forte (1Co 1:27). Ouvindo aquilo, Gideão adorou (Jz 7:15) antes de pelejar.",
  },
  "efode-e-terafins-de-mica": {
    title: "O éfode e os terafins de Mica",
    subtitle: "Jz 17:5 — a casa de deuses e o sacerdote de encomenda",
    text: "\"E teve este homem, Mica, uma casa de deuses; e fez um éfode e terafins, e consagrou um de seus filhos, para que lhe fosse por sacerdote\" (Jz 17:5). Tudo ali imita o culto verdadeiro — vestes sacerdotais, santuário, sacerdote — mas nada foi ordenado por Deus, e ao lado disso estão os terafins, ídolos domésticos. Mica ainda conclui: \"agora sei que o Senhor me fará bem\" (Jz 17:13), como se a bênção se comprasse com um levita alugado por dez moedas de prata (Jz 17:10). É religião fabricada à imagem do adorador, o exato sintoma de que \"não havia rei em Israel\" (Jz 17:6).",
  },
  "santuario-de-da": {
    title: "O santuário de Dã",
    subtitle: "Jz 18:30-31 — o ídolo roubado, erguido por uma tribo inteira",
    text: "O que era devoção particular de um homem vira culto oficial de uma tribo: \"os filhos de Dã levantaram para si aquela imagem de escultura; e Jônatas, filho de Gérson, o filho de Manassés, ele e seus filhos foram sacerdotes da tribo dos danitas, até ao dia do cativeiro da terra\" (Jz 18:30). Um sacerdote da descendência de Moisés servindo a um ídolo roubado, e um santuário rival ao de Siló (Jz 18:31): o desvio, uma vez tolerado, institucionaliza-se e dura gerações. Séculos depois, Jeroboão poria justamente ali um dos seus bezerros de ouro (1Rs 12:29-30).",
  },
  "imagens-queimadas": {
    title: "As imagens queimadas, e o ouro não cobiçado",
    subtitle: "Dt 7:25-26 — anátema não entra em casa",
    text: "\"As imagens de escultura de seus deuses queimarás a fogo; a prata e o ouro que estão sobre elas não cobiçarás, nem os tomarás para ti, para que não te enlaces neles\" (Dt 7:25). A tentação não estava só no ídolo, mas no metal que o revestia — e o metal também é laço. Por isso a ordem se estende à casa: \"não porás abominação em tua casa… de todo a detestarás, e de todo a abominarás, porque anátema é\" (Dt 7:26). Acã guardou do anátema de Jericó e trouxe a derrota sobre todo o Israel (Js 7:20-21). Com o pecado não se faz sociedade nem se guarda lembrança.",
  },
  "estaca-de-jael": {
    title: "A estaca da tenda de Jael",
    subtitle: "Jz 4:21; 5:26 — o ferro doméstico que derrubou um general",
    text: "\"Então Jael, mulher de Héber, tomou uma estaca da tenda, e lançou mão de um martelo, e foi-se a ele mansamente, e lhe cravou a estaca na fonte\" (Jz 4:21). Não era espada de guerreiro: era a ferramenta com que a mulher nômade fincava a tenda no chão. Nas mãos de Jael derrubou o capitão dos novecentos carros de ferro, e o cântico repete o gesto em câmera lenta: \"À estaca estendeu a sua mão esquerda, e ao martelo dos trabalhadores a sua direita\" (Jz 5:26). Cumpre-se ao pé da letra o que Débora anunciara a Baraque — \"à mão de uma mulher o Senhor venderá a Sísera\" (Jz 4:9) —, e por isso Jael é chamada \"bendita sobre as mulheres\" (Jz 5:24). Deus escolhe o fraco do mundo para envergonhar o forte (1Co 1:27).",
  },
  "imagens-de-gilgal": {
    title: "As imagens de escultura ao pé de Gilgal",
    subtitle: "Jz 3:19,26 — o marco por onde Eúde volta e por onde escapa",
    text: "\"Porém ele mesmo voltou das imagens de escultura que estavam ao pé de Gilgal\" (Jz 3:19) — e, morto o rei, foi por ali que escapou: \"ele passou pelas imagens de escultura, e escapou para Seirá\" (Jz 3:26). O lugar carrega a ironia amarga do livro: Gilgal foi onde Israel entrou na terra, se circuncidou e comeu a primeira páscoa em Canaã, e ouviu do Senhor \"hoje revolvi de sobre vós o opróbrio do Egito\" (Js 5:9-10). Agora o mesmo chão está semeado de ídolos. O marco da aliança virado marco de idolatria diz, num só objeto, o que aconteceu com a geração \"que não conhecia ao Senhor\" (Jz 2:10).",
  },
  "vaus-do-jordao": {
    title: "Os vaus do Jordão contra Moabe",
    subtitle: "Jz 3:28 — a passagem tomada, e a ninguém deixaram passar",
    text: "Descendo das montanhas de Efraim ao som da buzina, Eúde brada: \"Segui-me, porque o Senhor tem dado a vossos inimigos, os moabitas, na vossa mão\"; e Israel \"tomou os vaus do Jordão contra os moabitas, e a nenhum homem deixou passar\" (Jz 3:28). Os vaus são os poucos trechos rasos por onde se atravessa o rio: quem os toma decide quem escapa. Ali caíram dez mil moabitas, \"todos corpulentos, e todos homens valorosos\", e nem um só escapou (Jz 3:29). O rio que Deus abrira para o povo entrar na terra fecha-se agora sobre o opressor — e a terra sossega oitenta anos, o maior descanso do livro (Jz 3:30).",
  },
  "aguilhada-de-sangar": {
    title: "A aguilhada de bois de Sangar",
    subtitle: "Jz 3:31 — a ferramenta do lavrador que libertou Israel",
    text: "\"Depois dele foi Sangar, filho de Anate, que feriu a seiscentos homens dos filisteus com uma aguilhada de bois; e também ele libertou a Israel\" (Jz 3:31). A aguilhada era a vara longa e ferrada com que o lavrador tocava a junta de bois — instrumento de trabalho, não de guerra. Num tempo em que \"não se via escudo nem lança entre quarenta mil em Israel\" (Jz 5:8), Deus salvou com o que havia na mão de um lavrador, como fizera com o cajado de Moisés (Êx 4:2) e faria com a queixada de Sansão (Jz 15:15). O cântico de Débora lembra os seus dias como o tempo em que \"cessaram os caminhos\" (Jz 5:6): um só versículo, um só homem, e o Senhor livrando o seu povo.",
  },
  "altar-de-boquim": {
    title: "O altar de Boquim",
    subtitle: "Jz 2:5 — o altar dos que choram",
    text: "Subindo de Gilgal, o Anjo do Senhor repreendeu Israel — \"não fareis concerto com os moradores desta terra; derrubareis os seus altares; porém não obedecestes à minha voz\" —, e \"o povo levantou a sua voz e chorou. Por isso chamaram àquele lugar Boquim; e ali sacrificaram ao Senhor\" (Jz 2:1-5). Boquim quer dizer \"os que choram\". O altar guarda um pranto verdadeiro e, ainda assim, sem fruto: choraram, sacrificaram — e logo adiante já serviam aos baalins (Jz 2:11). Fica como aviso da diferença entre a tristeza segundo Deus, que gera arrependimento para a salvação, e a tristeza do mundo, que só produz morte (2Co 7:10).",
  },
};

/** Ficha de OBJETO por etiqueta específica (coluna de Betel, poço de Rebeca…). */
export function propTagInfo(tag?: string): StageInfo | null {
  return tag ? (PROP_TAG_INFO[tag] ?? null) : null;
}

/** Decide a ficha (e SE há badge) de um prop na cena. Prioridade: etiqueta
 *  específica → leitura do livro → tipo-marco. Tipos ambientais sem etiqueta e
 *  sem leitura própria do livro retornam null: são só cenário, sem badge. */
export function propBadgeInfo(kind: string, bookId?: string, tag?: string): StageInfo | null {
  const tagged = propTagInfo(tag);
  if (tagged) return tagged;
  const perBook = bookId ? PROP_INFO_BY_BOOK[bookId]?.[kind] : undefined;
  if (perBook) return perBook;
  if (AMBIENT_KINDS.has(kind)) return null;   // cenário puro: sem badge
  return PROP_INFO[kind] ?? null;             // tipo-marco (altar, trono, árvore da vida…)
}
