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
  // ---- Números: OS DOZE PRÍNCIPES das tribos (Nm 1:5-15; 2; 7:12-83; 10:14-27) ----
  // São os mesmos doze homens do começo ao fim: assistem ao censo, marcham à
  // frente das bandeiras e, um por dia, oferecem na dedicação do altar.
  elizur: { title: "Elizur, filho de Sedeur", subtitle: "Príncipe de Rúben (Nm 1:5)", text: "O cabeça da casa paterna do primogênito de Israel, primeiro nomeado entre os que estariam com Moisés e Arão no censo (Nm 1:5). Conduz o exército de Rúben, que acampa e marcha ao sul do tabernáculo (Nm 2:10; 10:18). No quarto dia da dedicação apresenta a sua oferta ao altar recém-ungido (Nm 7:30-35). Rúben perdera o direito de primogênito por causa do pecado do pai (Gn 49:3-4), mas Deus não o deixa de fora: também ele tem príncipe, lugar e dia." },
  selumiel: { title: "Selumiel, filho de Zurisadai", subtitle: "Príncipe de Simeão (Nm 1:6)", text: "Cabeça da tribo de Simeão, contada em cinquenta e nove mil e trezentos homens de guerra (Nm 1:23). Acampa ao sul, ao lado de Rúben, sob a mesma bandeira (Nm 2:12). Oferece no quinto dia da consagração do altar (Nm 7:36-41). Simeão fora repreendido por Jacó pela violência em Siquém e disperso em Israel (Gn 49:5-7); ainda assim marcha no exército do SENHOR — a graça dá lugar a quem a palavra do pai deixara sem lugar." },
  naassom: { title: "Naassom, filho de Aminadabe", subtitle: "Príncipe de Judá (Nm 1:7)", text: "Cabeça da maior das tribos — setenta e quatro mil e seiscentos homens (Nm 1:26-27) — e o primeiro a mover-se: Judá acampa e parte à frente, ao oriente (Nm 2:3; 10:14). Foi ele quem abriu os doze dias da dedicação, oferecendo no primeiro dia (Nm 7:12-17). Cunhado de Arão (Êx 6:23), está na linhagem que desce até Boaz, Davi e o Cristo (Rt 4:20; Mt 1:4): o cetro que Jacó prometera a Judá já vai adiante do arraial." },
  natanael: { title: "Natanael, filho de Zuar", subtitle: "Príncipe de Issacar (Nm 1:8)", text: "Cabeça de Issacar, tribo que acampa ao oriente com Judá e Zebulom e marcha logo atrás deles (Nm 2:5; 10:15). Apresenta a sua oferta no segundo dia da consagração do altar (Nm 7:18-23). De Issacar se dirá depois que eram \"entendidos nos tempos, para saberem o que Israel devia fazer\" (1Cr 12:32) — sabedoria que começa aqui, no lugar certo, no dia certo, diante do SENHOR." },
  eliabe: { title: "Eliabe, filho de Helom", subtitle: "Príncipe de Zebulom (Nm 1:9)", text: "Cabeça de Zebulom, o terceiro dos exércitos do oriente, que parte com a bandeira de Judá (Nm 2:7; 10:16). Oferece no terceiro dia da dedicação (Nm 7:24-29). Zebulom \"habitará no porto dos mares\" (Gn 49:13), e nos seus limites ficará mais tarde a Galileia onde a luz há de raiar sobre os que jaziam em trevas (Is 9:1-2; Mt 4:13-16)." },
  elisama: { title: "Elisama, filho de Amiúde", subtitle: "Príncipe de Efraim (Nm 1:10)", text: "Cabeça de Efraim, o filho mais novo de José a quem Jacó pôs a mão direita e a bênção maior (Gn 48:14,19). Efraim leva a bandeira do ocidente e marcha em terceiro lugar (Nm 2:18; 10:22). Oferece no sétimo dia da consagração (Nm 7:48-53). Da sua descendência sairá Josué, filho de Num, que introduzirá Israel na terra (1Cr 7:26-27)." },
  gamaliel: { title: "Gamaliel, filho de Pedazur", subtitle: "Príncipe de Manassés (Nm 1:10)", text: "Cabeça de Manassés, o primogênito de José, contado com Efraim entre \"os filhos de José\" (Nm 1:10,34-35). Acampa ao ocidente, ao lado de Efraim (Nm 2:20; 10:23). Oferece no oitavo dia da dedicação do altar (Nm 7:54-59). A sua tribo é a menor do primeiro censo (trinta e dois mil e duzentos) e ainda assim tem príncipe, bandeira e dia próprio: diante de Deus a casa pequena não é casa esquecida." },
  abida: { title: "Abidã, filho de Gideoni", subtitle: "Príncipe de Benjamim (Nm 1:11)", text: "Cabeça de Benjamim, o caçula de Jacó e o filho da direita, cuja tribo fecha os exércitos do ocidente (Nm 2:22; 10:24). Oferece no nono dia da consagração do altar (Nm 7:60-65). De Benjamim virão Saul, o primeiro rei, e Paulo, o apóstolo que se dizia \"da tribo de Benjamim\" (1Sm 9:1-2; Fp 3:5) — o menor recebendo, como sempre, honra do SENHOR." },
  aieser: { title: "Aieser, filho de Amisadai", subtitle: "Príncipe de Dã (Nm 1:12)", text: "Cabeça de Dã, a segunda tribo em número no primeiro censo — sessenta e dois mil e setecentos (Nm 1:39). Leva a bandeira do norte e fecha a marcha como \"retaguarda de todos os arraiais\" (Nm 2:25; 10:25). Oferece no décimo dia da dedicação (Nm 7:66-71). Guardar a retaguarda é ofício de honra: os que vão atrás protegem os cansados do povo (Dt 25:18)." },
  pagiel: { title: "Pagiel, filho de Ocrã", subtitle: "Príncipe de Aser (Nm 1:13)", text: "Cabeça de Aser, tribo que acampa ao norte, junto a Dã e Naftali (Nm 2:27; 10:26). Oferece no undécimo dia da consagração do altar (Nm 7:72-77). Sobre Aser Jacó dissera que \"o seu pão será fértil\" (Gn 49:20) e Moisés que \"molhe o seu pé em azeite\" (Dt 33:24): a fartura da tribo volta ao altar em prata, ouro e sacrifício." },
  eliasafe: { title: "Eliasafe, filho de Deuel", subtitle: "Príncipe de Gade (Nm 1:14)", text: "Cabeça de Gade, tribo que acampa ao sul com Rúben e Simeão (Nm 2:14; 10:20). Oferece no sexto dia da dedicação do altar (Nm 7:42-47). Gade pedirá depois herança aquém do Jordão, e passará armado adiante dos irmãos até que toda a terra seja repartida (Nm 32:1-32) — tribo de guerreiros que aprende a não buscar só o seu próprio descanso." },
  aira: { title: "Aira, filho de Enã", subtitle: "Príncipe de Naftali (Nm 1:15)", text: "Cabeça de Naftali, o último dos doze a ser nomeado no censo e o último a oferecer: no duodécimo dia encerra a dedicação do altar (Nm 1:15; 7:78-83). Acampa ao norte e marcha no fim de tudo (Nm 2:29; 10:27). Ser o último não é ser menor — a sua oferta é registrada com a mesma minúcia da primeira, e só depois dela o SENHOR fala a Moisés de cima do propiciatório (Nm 7:89)." },
  itamar: { title: "Itamar, filho de Arão", subtitle: "O sacerdote sobre gersonitas e meraritas (Nm 4:28,33)", text: "O mais novo dos filhos de Arão, sacerdote depois da morte de Nadabe e Abiú (Nm 3:4). Sob a sua mão ficam as cargas dos gersonitas (as cortinas) e dos meraritas (as tábuas, colunas e bases) quando o tabernáculo marcha (Nm 4:28,33), e por seu intermédio já se haviam contado os materiais do santuário (Êx 38:21). Da sua linhagem virá Eli, sacerdote em Siló (1Sm 1:3; 1Cr 24:3)." },

  // ---- Josué: a conquista de Canaã ----
  josue: { title: "Josué, filho de Num", subtitle: "O servo de Moisés que introduz Israel na terra (Js 1:1)", text: "Da tribo de Efraim, foi o \"moço\" que servia a Moisés e um dos dois espias que creram na promessa (Nm 14:6-9). Moisés lhe mudou o nome de Oséias para Josué — \"o Senhor é salvação\" — e sobre ele pôs as mãos, cheio do Espírito de sabedoria (Nm 27:18; Dt 34:9). A ele Deus repetiu: \"Esforça-te e tem bom ânimo... o Senhor teu Deus é contigo\" (Js 1:9). Atravessou o Jordão, tomou a terra e a repartiu, e no fim desafiou o povo: \"eu e a minha casa serviremos ao Senhor\" (Js 24:15). Prefigura Jesus, que leva o povo ao verdadeiro descanso (Hb 4:8)." },
  calebe: { title: "Calebe, filho de Jefoné", subtitle: "O espia fiel, herdeiro de Hebrom (Js 14:6)", text: "O quenezeu que, com Josué, trouxe bom relato da terra e creu contra a incredulidade dos dez: \"subamos animosamente... porque bem poderemos com ela\" (Nm 13:30). Por seguir \"integralmente\" ao Senhor, foi dos únicos daquela geração a entrar (Nm 14:24). Aos 85 anos, com a mesma fé de 45 anos antes, reivindicou o monte dos anaquins: \"dá-me este monte de que o Senhor falou\" (Js 14:12), e tomou Hebrom. Modelo de quem persevera na promessa até vê-la cumprida." },
  // ---- Números 15: as leis das ofertas na terra ----
  "ofertante-cheiro-suave": { title: "O israelita ofertante", subtitle: "Números 15 • o que traz a oferta de cheiro suave", text: "É o homem de Israel a quem a lei diz: \"quando entrardes na terra... e ao Senhor fizerdes oferta queimada\" (Nm 15:2-3). Traz do rebanho o cordeiro, o carneiro ou o novilho, e com cada animal a medida certa de flor de farinha, azeite e vinho (Nm 15:4-10). A oferta não é imposto: é voto, gratidão e festa — \"cheiro suave ao Senhor\" — de quem já vive, pela fé, na terra que ainda não pisou." },
  "sacerdote-cheiro-suave": { title: "O sacerdote das ofertas", subtitle: "Números 15 • o filho de Arão junto ao altar", text: "O sacerdote da casa de Arão que recebe o animal, a farinha amassada com azeite e o vinho da libação, e os faz subir do altar \"em cheiro suave ao Senhor\" (Nm 15:7,10). É também ele quem \"fará expiação por toda a congregação... e lhes será perdoado\" quando o pecado for por ignorância (Nm 15:25,28). No seu ministério já aponta o mediador maior, que se ofereceu \"a Deus em cheiro suave\" (Ef 5:2)." },
  "estrangeiro-peregrino": { title: "O estrangeiro que peregrina", subtitle: "Números 15 • um mesmo estatuto perante o Senhor", text: "O peregrino de fora de Israel que habita no meio do povo e quer apresentar \"uma oferta queimada de cheiro suave ao Senhor\" (Nm 15:14). Sobre ele Deus decreta: \"um mesmo estatuto haja para vós... como vós, assim será o peregrino perante o Senhor\" (Nm 15:15-16) — mesma lei, mesmo perdão (Nm 15:26) e mesmo juízo (Nm 15:30). Já no deserto o altar anuncia que a bênção de Abraão alcançaria todas as famílias da terra (Gn 12:3; Ef 2:12-13)." },
  "pecador-por-ignorancia": { title: "O que pecou por ignorância", subtitle: "Números 15 • a fraqueza que a expiação alcança", text: "É a alma que errou \"por ignorância\", sem o saber — não por desafio (Nm 15:27). Para ela há caminho de volta: uma cabra de um ano, e \"o sacerdote fará expiação pela pessoa... e lhe será perdoado\" (Nm 15:28). A mesma graça vale para o natural e para o estrangeiro (Nm 15:29). A lei distingue o tropeço da rebeldia: para a fraqueza há sangue e perdão; é figura do sacrifício que purifica \"os pecados cometidos por ignorância\" (Hb 9:7)." },
  "temerario-mao-levantada": { title: "O que peca de mão levantada", subtitle: "Números 15 • a alma extirpada do meio do povo", text: "\"A pessoa que fizer alguma coisa temerariamente... injuria ao Senhor; tal pessoa será extirpada do meio do seu povo\" (Nm 15:30). Não é o que tropeça, mas o que ergue a mão contra o próprio Deus da aliança, desprezando a sua palavra e anulando o seu mandamento (Nm 15:31). Para essa rebeldia deliberada a lei não prevê sacrifício — advertência que Hebreus retoma: \"se pecarmos voluntariamente... já não resta mais sacrifício pelos pecados\" (Hb 10:26)." },
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
  // ---- 1 SAMUEL: a casa de Elcana, o fim dos juízes e os dois primeiros reis ----
  elcana: { title: "Elcana", subtitle: "O pai de Samuel, levita de Ramataim-Zofim (1Sm 1:1)", text: "Efrateu da montanha de Efraim, subia \"de ano em ano\" a Siló para adorar e sacrificar ao SENHOR dos Exércitos (1Sm 1:3) — fidelidade rara num tempo em que \"cada um fazia o que parecia reto aos seus olhos\". Tinha duas mulheres, e a casa dividida entre a amada estéril e a fecunda que a provocava era ferida antiga em Israel (cf. Gn 29–30). A Ana dava \"uma parte excelente\", e a consolava com ternura desajeitada: \"não te sou eu melhor do que dez filhos?\" (1Sm 1:8). Quando ela fez o voto, ele não o desfez — como a lei lhe permitiria (Nm 30:6-8) —, mas disse: \"faze o que bem te parecer... confirme o Senhor a sua palavra\" (1Sm 1:23). Genealogia levítica confirmada em 1Cr 6:27,34." },
  "ana-mae-de-samuel": { title: "Ana", subtitle: "A mãe de Samuel, a estéril que orou sem voz (1Sm 1)", text: "\"O Senhor lhe tinha cerrado a madre\" (1Sm 1:5), e a rival a provocava amargamente ano após ano até que ela chorasse e não comesse. Junto ao umbral do templo de Siló derramou a alma perante o SENHOR — \"falava no seu coração, só se moviam os seus lábios, porém não se ouvia a sua voz\" (1Sm 1:13) —, e fez o voto que devolvia o filho antes de o ter: \"o darei ao Senhor por todos os dias da sua vida, e sobre a sua cabeça não subirá navalha\" (1Sm 1:11). Cumpriu-o ao desmamá-lo: \"por este menino orava eu... também eu o entreguei ao Senhor\" (1Sm 1:27-28). O cântico que então entoou (1Sm 2:1-10) é a primeira grande profecia do REI e do UNGIDO de Deus, e Maria o retomaria quase palavra por palavra no Magnificat (Lc 1:46-55)." },
  penina: { title: "Penina", subtitle: "A outra mulher de Elcana (1Sm 1:2)", text: "\"Penina tinha filhos, porém Ana não tinha filhos\" (1Sm 1:2) — e a fecundidade virou arma: \"a sua competidora a irritava excessivamente, para a embravecer, porquanto o Senhor lhe tinha cerrado a madre\" (1Sm 1:6). Ano após ano, na própria subida à casa do SENHOR, repetia a provocação até que Ana chorasse e não comesse (1Sm 1:7). É o retrato do lar partido pela poligamia, como o de Sara e Agar e o de Lia e Raquel; e é contra a sua zombaria que Ana cantará: \"a estéril teve sete filhos, e a que tinha muitos filhos enfraqueceu\" (1Sm 2:5)." },
  eli: { title: "Eli", subtitle: "Sacerdote e juiz de Israel em Siló (1Sm 1:9; 4:18)", text: "Guardava a casa do SENHOR em Siló, sentado numa cadeira junto ao umbral, e julgou Israel quarenta anos (1Sm 4:18). Homem devoto o bastante para abençoar Ana — \"vai em paz, e o Deus de Israel te conceda a tua petição\" (1Sm 1:17) — e para ensinar o menino a responder \"Fala, Senhor, porque o teu servo ouve\" (1Sm 3:9); mas fraco onde mais importava. Repreendeu os filhos com palavras e nada mais, e por isso veio a sentença: \"honraste a teus filhos mais do que a mim\" (1Sm 2:29). Aos noventa e oito anos, cego e pesado, ouviu que a ARCA fora tomada, caiu para trás da cadeira e quebrou o pescoço (1Sm 4:18): não foi a morte dos filhos que o matou, foi a notícia da arca." },
  hofni: { title: "Hofni", subtitle: "Filho de Eli, sacerdote em Siló (1Sm 1:3)", text: "Um dos dois \"filhos de Belial\" que \"não conheciam ao Senhor\" (1Sm 2:12). Junto com Fineias, corrompeu o sacrifício: mandava o moço enfiar o garfo de três dentes na caldeira e tomar o que subisse, e exigia a carne CRUA antes de queimada a gordura, arrancando-a à força se preciso (1Sm 2:13-16). \"Era, pois, muito grande o pecado destes jovens perante o Senhor, porquanto os homens desprezavam a oferta do Senhor\" (1Sm 2:17). Morreu no mesmo dia que o irmão, na batalha de Afeque, cumprindo o sinal anunciado pelo homem de Deus (1Sm 2:34; 4:11)." },
  "fineias-silo": { title: "Fineias, filho de Eli", subtitle: "Sacerdote em Siló, morto em Afeque (1Sm 4:11)", text: "Irmão de Hofni e, com ele, culpado de roubar o sacrifício e de se deitar com as mulheres que serviam à porta da tenda da congregação (1Sm 2:22). Não confundir com o Fineias zeloso, filho de Eleazar (Nm 25). Levou a ARCA ao arraial como se fosse talismã de guerra, e morreu com ela tomada — o sinal dado a seu pai: \"ambos morrerão no mesmo dia\" (1Sm 2:34; 4:11). Sua morte tirou a vida da mulher grávida, que pariu e expirou dando ao filho o nome de ICABODE (1Sm 4:19-21)." },
  "mulher-fineias": { title: "A mulher de Fineias", subtitle: "A mãe de Icabode (1Sm 4:19-22)", text: "Grávida e a ponto de dar à luz, ouviu numa só notícia que a arca de Deus fora tomada, que o sogro e o marido estavam mortos — \"encurvou-se e pariu, porquanto as dores lhe sobrevieram\" (1Sm 4:19). Às mulheres que a animavam dizendo \"tens dado à luz um filho\", não respondeu nem tomou nota. Ao expirar, deu ao menino um nome que é uma sentença sobre a nação inteira: \"ICABODE, dizendo: Foi-se a glória de Israel\" — e explicou por quê: \"porquanto a arca de Deus foi levada\" (1Sm 4:21-22). Perdeu marido e sogro no mesmo instante, mas chorou pela glória de Deus: é a teologia mais lúcida do capítulo, na boca de quem estava morrendo." },
  "samuel-menino": { title: "Samuel, o menino de Siló", subtitle: "O nazireu pedido a Deus, servindo perante Eli (1Sm 2:11,18)", text: "Seu nome guarda a resposta ao voto da mãe: \"do Senhor o pedi\" (1Sm 1:20). Desmamado, foi levado a Siló com três bezerros, um efa de farinha e um odre de vinho, e ali ficou: \"o menino servia ao Senhor perante o sacerdote Eli\" (1Sm 2:11), \"cingido com um éfode de linho\", e a mãe lhe fazia uma CAPINHA pequena que lhe trazia ano após ano (1Sm 2:18-19). Cresceu num santuário corrompido sem se corromper — \"o menino Samuel crescia e se fazia agradável, assim para com o Senhor como também para com os homens\" (1Sm 2:26), palavras que Lucas ecoaria sobre o menino Jesus (Lc 2:52). Numa noite em que \"a palavra do Senhor era de muita valia\" e não havia visão manifesta, foi a ele que Deus chamou pelo nome (1Sm 3:1-10)." },
  samuel: { title: "Samuel", subtitle: "O último juiz, profeta e ungidor de reis (1Sm 3:20; 7:15)", text: "\"Todo o Israel, desde Dã até Berseba, conheceu que Samuel estava confirmado por profeta do Senhor\" (1Sm 3:20). Fez o povo tirar os deuses estranhos, reuniu-o em Mizpá e o levou a vencer os filisteus pela oração, e levantou a pedra EBEN-EZER: \"até aqui nos ajudou o Senhor\" (1Sm 7:12). Julgou Israel todos os dias da sua vida em circuito por Betel, Gilgal e Mizpá, com casa em Ramá (1Sm 7:15-17). Foi a dobradiça entre os juízes e a monarquia: ungiu Saul e depois Davi, e nunca se calou diante de nenhum dos dois — \"eis que o obedecer é melhor do que o sacrificar\" (1Sm 15:22). Quando morreu, \"todo o Israel se ajuntou, e o prantearam\" (1Sm 25:1). Hebreus 11:32 o conta entre os heróis da fé, e Jeremias 15:1 o põe ao lado de Moisés como intercessor." },
  "samuel-endor": { title: "Samuel, chamado em En-Dor", subtitle: "A aparição da noite antes de Gilboa (1Sm 28:12-19)", text: "Saul, sem resposta \"nem por sonhos, nem por Urim, nem por profetas\" (1Sm 28:6), procurou a mulher que tinha espírito adivinho — depois de ele mesmo haver expulsado da terra os adivinhos (1Sm 28:3,9). O texto não deixa dúvida de que quem apareceu foi o próprio Samuel, e a mulher gritou de espanto, sinal de que o resultado excedeu a sua arte (1Sm 28:12). \"Um homem velho... coberto de uma capa\" (1Sm 28:14) — a mesma capa de profeta cuja aba se rasgara na mão de Saul (1Sm 15:27). A palavra que trouxe não consolou nada: \"o Senhor se tem desviado de ti e se tem feito teu inimigo... amanhã tu e teus filhos estareis comigo\" (1Sm 28:16,19). Nem a morte fez o profeta mudar a sentença que dera vivo." },
  "homem-de-deus": { title: "O homem de Deus que veio a Eli", subtitle: "O profeta anônimo de 1Sm 2:27-36", text: "A Escritura não lhe dá nome — só a mensagem. Lembrou a Eli a graça antiga (\"não me manifestei, na verdade, à casa de teu pai, estando eles ainda no Egito?\", 1Sm 2:27) para medir por ela a ingratidão presente: \"por que pisais o meu sacrifício... e honras a teus filhos mais do que a mim?\" (1Sm 2:29). Anunciou o corte do braço da casa de Eli, o sinal dos dois filhos mortos no mesmo dia — e, no meio do juízo, a promessa maior: \"suscitarei para mim um sacerdote fiel, que procederá segundo o meu coração... e andará perante o meu ungido todos os dias\" (1Sm 2:35). Cumpriu-se em parte na deposição de Abiatar por Zadoque (1Rs 2:27,35) e plenamente em Cristo, o Sumo Sacerdote fiel (Hb 2:17)." },
  "joel-filho-samuel": { title: "Joel, filho de Samuel", subtitle: "Juiz em Berseba (1Sm 8:2)", text: "Primogênito de Samuel, posto por juiz em Berseba, no extremo sul da terra. \"Seus filhos, porém, não andaram pelos caminhos dele; antes se inclinaram à avareza, e tomaram suborno, e perverteram o direito\" (1Sm 8:3) — exatamente o que a lei proibia (Êx 23:8; Dt 16:19). Foi o pretexto que os anciãos usaram para pedir um rei (1Sm 8:5). Tragédia repetida: o profeta que crescera na sombra dos filhos de Eli não conseguiu criar melhor os seus. A linhagem, porém, não se perdeu — dela veio Hemã, o cantor do templo (1Cr 6:33)." },
  "abias-filho-samuel": { title: "Abias, filho de Samuel", subtitle: "Juiz em Berseba (1Sm 8:2)", text: "O segundo filho de Samuel, juiz em Berseba ao lado do irmão Joel, e como ele corrompido pelo suborno e pela perversão do direito (1Sm 8:3). Seu nome significa \"o SENHOR é meu pai\" — e é justamente diante da sua injustiça que Israel decide que não quer mais o SENHOR por rei, mas \"um rei como o têm todas as nações\" (1Sm 8:5,20). O pecado de dois juízes de província acabou mudando a forma de governo de todo um povo." },
  quis: { title: "Quis", subtitle: "O pai de Saul, benjamita de Gibeá (1Sm 9:1)", text: "\"Homem poderoso e valente\", filho de Abiel, da tribo de Benjamim (1Sm 9:1) — a menor das tribos, e a que quase desaparecera na guerra de Gibeá (Jz 20–21). Foi a perda das suas jumentas que pôs o filho na estrada em que encontraria o vidente e a unção (1Sm 9:3). Homem de casa ordinária, ficou preocupado não com os animais mas com o rapaz: \"deixará meu pai de inquietar-se com as jumentas, e se afligirá por nós\" (1Sm 9:5). Foi sepultado em Zela, e ali, anos depois, Davi mandaria pôr os ossos de Saul e Jônatas no jazigo de Quis (2Sm 21:14)." },
  saul: { title: "Saul", subtitle: "O primeiro rei de Israel (1Sm 9–31)", text: "Benjamita, filho de Quis, \"moço e tão bem parecido... desde os ombros para cima mais alto do que todo o povo\" (1Sm 9:2) — o rei que Israel pediu para ser \"como todas as nações\". Começou com humildade real: escondeu-se entre a bagagem no dia da proclamação (1Sm 10:22) e poupou os que o desprezaram (1Sm 11:13). Mas a coroa o corroeu: sacrificou em Gilgal sem esperar Samuel (1Sm 13:9-14), poupou Agague e o melhor do gado contra a ordem do SENHOR (1Sm 15), e ouviu a sentença \"rejeitou-te a ti, para que não sejas rei\". A partir dali, \"o Espírito do Senhor se retirou de Saul, e o atormentava um espírito mau\" (1Sm 16:14): perseguiu Davi por montes e desertos, mandou matar os oitenta e cinco sacerdotes de Nobe (1Sm 22:18-19), consultou a mulher de En-Dor e caiu sobre a própria espada em Gilboa (1Sm 31:4). Davi, a quem ele caçou, o chorou: \"como caíram os valentes!\" (2Sm 1:19)." },
  "moco-de-saul": { title: "O moço de Saul", subtitle: "O criado que o levou ao vidente (1Sm 9:5-10)", text: "Servo anônimo que acompanhou Saul na busca das jumentas por Efraim, Salisa, Saalim e Benjamim. Quando o amo queria desistir, foi ele quem lembrou: \"eis que se acha nesta cidade um homem de Deus, e homem honrado é; tudo quanto diz sucede assim\" (1Sm 9:6), e ainda achou no bolso o quarto de siclo de prata para o presente (1Sm 9:8). Sem esse criado sem nome, Saul teria voltado para casa e não teria encontrado Samuel. Depois foi mandado adiante para que o rei recebesse a unção a sós (1Sm 9:27). A Escritura guarda vários desses: gente miúda cujo bom senso muda o rumo da história." },
  jonatas: { title: "Jônatas", subtitle: "Filho de Saul, o amigo de Davi (1Sm 13–31)", text: "Guerreiro de fé ousada: com o pajem apenas, subiu de gatinhas pelos penhascos de Bozez e Sené contra a guarnição filisteia, dizendo \"para com o Senhor nenhum impedimento há de livrar com muitos ou com poucos\" (1Sm 14:6). Provou o mel na ponta da vara sem saber do juramento do pai, e o povo o resgatou da morte (1Sm 14:27,45). Amou Davi \"como à sua própria alma\", despiu-se da própria capa, espada, arco e cinto para vesti-lo (1Sm 18:1-4) e fez com ele aliança diante do SENHOR — sabendo que estava entregando o trono que lhe caberia: \"tu reinarás sobre Israel, e eu serei o segundo depois de ti\" (1Sm 23:17). Defendeu-o do pai arriscando a própria vida sob a lança (1Sm 19:4; 20:33). Morreu ao lado de Saul em Gilboa, e Davi o pranteou: \"a tua amizade me era mais maravilhosa do que o amor de mulheres\" (2Sm 1:26)." },
  "pajem-de-jonatas": { title: "O pajem de Jônatas", subtitle: "O escudeiro da subida de Micmás (1Sm 14:6-14)", text: "O jovem que carregava as armas de Jônatas e, diante de uma guarnição inteira, respondeu ao amo a frase que decidiu o dia: \"faze tudo o que teu coração te disser; eis-me aqui contigo, conforme o teu coração\" (1Sm 14:7). Subiu de gatinhas atrás dele pelo penhasco, e \"caíam diante de Jônatas, e o seu pajem de armas os matava atrás dele\" — cerca de vinte homens em meia jeira de terra (1Sm 14:13-14). Foi essa dupla que provocou o tremor no arraial, no campo e em toda a gente, \"tremor de Deus\" (1Sm 14:15), do qual nasceu a vitória de Israel naquele dia." },
  abner: { title: "Abner", subtitle: "Filho de Ner, capitão do exército de Saul (1Sm 14:50)", text: "Primo de Saul e chefe do seu exército, sentava-se ao lado do rei à mesa (1Sm 20:25). Foi ele quem trouxe Davi diante de Saul com a cabeça de Golias na mão (1Sm 17:57), e foi ele que Davi humilhou do alto do monte de Haquila: \"não és tu um homem? ... por que, pois, não guardaste o rei, teu senhor?\" (1Sm 26:15). Depois da morte de Saul sustentou Isbosete no trono do norte, e a sua passagem para o lado de Davi teria unido o reino — mas Joabe o matou à traição em Hebrom, vingando o irmão Asael. Davi o chorou: \"não morreu Abner como morre o vilão? ... como se cai diante dos filhos da maldade, assim caíste\" (2Sm 3:33-34)." },
  "aias-sacerdote": { title: "Aías, o sacerdote de Saul", subtitle: "Filho de Aitube, com o éfode em Micmás (1Sm 14:3,18)", text: "\"Aías, filho de Aitube, irmão de Icabode, filho de Fineias, filho de Eli, sacerdote do Senhor em Siló\" (1Sm 14:3) — a casa sentenciada ainda servindo, quatro gerações depois. Trazia o ÉFODE junto ao exército, e Saul mandou trazer a arca de Deus para consultar; mas, enquanto o alvoroço no arraial filisteu crescia, o rei impaciente cortou a consulta pela metade: \"retira a tua mão\" (1Sm 14:19). É o retrato do reinado inteiro — começa a buscar a Deus e desiste antes da resposta. Seu parente Aimeleque pagaria com a vida por consultar o SENHOR a favor de Davi (1Sm 22:10,18)." },
  agague: { title: "Agague", subtitle: "Rei de Amaleque, poupado por Saul (1Sm 15:8-33)", text: "Amaleque fora o primeiro povo a atacar Israel saído do Egito, ferindo os cansados na retaguarda (Êx 17:8; Dt 25:17-19), e sobre ele pesava a sentença antiga. Saul feriu o povo mas poupou o rei e o melhor do gado — \"tudo o que era bom\" (1Sm 15:9) —, e chamou de sacrifício o que era desobediência. Agague veio \"alegremente\", dizendo \"na verdade já passou a amargura da morte\" (1Sm 15:32), e Samuel o despedaçou perante o SENHOR em Gilgal. Foi por causa dele que soou a palavra que atravessa a Escritura: \"tem porventura o Senhor tanto prazer em holocaustos... como em que se obedeça à sua palavra? Eis que o obedecer é melhor do que o sacrificar\" (1Sm 15:22). Séculos depois, Hamã, \"o agagita\", tentaria de novo exterminar os judeus (Et 3:1)." },
  jesse: { title: "Jessé", subtitle: "O belemita, pai de Davi (1Sm 16:1)", text: "Neto de Boaz e Rute (Rt 4:17,22), criador de gado em Belém de Judá e pai de oito filhos. Quando Samuel veio com a bezerra do sacrifício, apresentou sete deles e não se lembrou de mandar chamar o caçula, que estava com as ovelhas — e o profeta teve de dizer: \"não nos assentaremos até que ele venha aqui\" (1Sm 16:11). Foi então que Deus deu a regra: \"o homem vê o que está diante dos olhos, porém o Senhor olha para o coração\" (1Sm 16:7). O seu nome ficou como o do tronco messiânico: \"sairá um rebento do tronco de Jessé\" (Is 11:1), e assim Cristo é \"a raiz e a geração de Davi\" (Ap 22:16)." },
  "eliabe-irmao-de-davi": { title: "Eliabe", subtitle: "O irmão mais velho de Davi (1Sm 16:6; 17:28)", text: "Primogênito de Jessé, de porte tão imponente que Samuel se enganou: \"certamente está perante o Senhor o seu ungido\" — e ouviu a correção que resume o capítulo: \"não atentes para a sua aparência, nem para a altura da sua estatura\" (1Sm 16:6-7). No vale do carvalho, ao ouvir o irmão pequeno perguntar por Golias, acendeu-se em ira contra ele: \"eu conheço a tua presunção e a maldade do teu coração; desceste apenas para ver a peleja\" (1Sm 17:28). Acusou Davi exatamente do que ele não estava fazendo. O gigante, naquele dia, não estava só do lado filisteu: estava também na voz do irmão." },
  davi: { title: "Davi", subtitle: "O pastor de Belém, ungido rei (1Sm 16–31)", text: "O oitavo e menor filho de Jessé, apascentando ovelhas quando Samuel derramou sobre ele o azeite no meio dos irmãos — \"e desde aquele dia em diante o Espírito do Senhor se apoderou de Davi\" (1Sm 16:13). Tocava harpa para aliviar Saul, matou o leão e o urso do rebanho antes de matar o gigante, e derrubou Golias com uma funda e cinco pedras lisas em nome do \"Senhor dos Exércitos, o Deus dos exércitos de Israel\" (1Sm 17:45). Amado por Jônatas e pelo povo (\"Saul feriu os seus milhares, porém Davi os seus dez milhares\"), foi caçado por dez anos pelo rei que servira — e por duas vezes teve Saul na ponta da mão e não estendeu a mão contra \"o ungido do Senhor\" (1Sm 24:6; 26:9). Homem \"segundo o coração de Deus\" (1Sm 13:14), autor de grande parte dos Salmos, e o rei de cuja casa Deus prometeu um trono eterno (2Sm 7:16) — cumprido em Jesus, \"o filho de Davi\" (Mt 1:1)." },
  golias: { title: "Golias", subtitle: "O gigante de Gate (1Sm 17:4-51)", text: "\"Um homem de combate, do arraial dos filisteus, cuja altura era de seis côvados e um palmo\" — cerca de 2,90 m —, com capacete de bronze, couraça de escamas de cinco mil siclos, grevas de bronze, escudo às costas e uma hasta cuja lança pesava seiscentos siclos de ferro (1Sm 17:4-7). Vinha de Gate, uma das cinco cidades filisteias e reduto dos gigantes que sobraram da conquista (Js 11:22). Por quarenta dias, manhã e tarde, afrontou os exércitos do Deus vivo e propôs o duelo que decidiria a guerra, e \"todos os homens de Israel fugiam dele e temiam grandemente\" (1Sm 17:24). Desprezou o rapaz que veio com um cajado — \"sou eu algum cão?\" — e ouviu a resposta que ficou: \"tu vens a mim com espada, e com lança, e com escudo; porém eu venho a ti em nome do Senhor dos Exércitos\" (1Sm 17:45). Caiu com a pedra na testa, e a sua própria espada lhe cortou a cabeça." },
  "escudeiro-golias": { title: "O escudeiro de Golias", subtitle: "O que lhe levava o pavês adiante (1Sm 17:7,41)", text: "\"O que lhe trazia o escudo ia diante dele\" (1Sm 17:7,41) — o pavês era um escudo grande demais para o guerreiro carregar e lutar ao mesmo tempo, e ia à frente cobrindo o campeão na aproximação. A figura mede o tamanho do desafio: o filisteu era tão pesadamente armado que precisava de um homem só para lhe levar a defesa. E mede também o contraste — do lado de Israel desceu um pastor \"com o seu cajado na mão, e cinco seixos do ribeiro\", sem armadura nenhuma, porque \"não é do Senhor salvar com espada nem com lança\" (1Sm 17:40,47)." },
  mical: { title: "Mical", subtitle: "A filha mais nova de Saul, mulher de Davi (1Sm 18:20)", text: "\"Mical, filha de Saul, o amava\" (1Sm 18:20) — e o pai usou esse amor como armadilha, exigindo por dote cem prepúcios de filisteus na esperança de que Davi caísse pela mão do inimigo (1Sm 18:25). Quando Saul mandou vigiar a casa para matá-lo pela manhã, foi ela quem o desceu por uma janela e pôs no leito o ídolo dos TERAFINS com uma pele de cabra à cabeceira, ganhando a noite inteira de vantagem (1Sm 19:12-16). Ao pai mentiu para salvar o marido. Depois foi dada a outro homem, Paltiel, e mais tarde reclamada por Davi (1Sm 25:44; 2Sm 3:14-16). A história dos dois termina fria: ao vê-lo dançando diante da arca, \"o desprezou no seu coração\" (2Sm 6:16)." },
  merabe: { title: "Merabe", subtitle: "A filha mais velha de Saul (1Sm 18:17-19)", text: "Prometida a Davi como recompensa pelo valor na guerra — \"sê-me somente filho valente, e guerreia as guerras do Senhor\" —, mas Saul dizia isso calculando: \"não seja contra ele a minha mão, mas sim a dos filisteus\" (1Sm 18:17). Davi respondeu com a humildade de sempre: \"quem sou eu... para vir a ser genro do rei?\" (1Sm 18:18). E, chegado o tempo, o pai simplesmente a deu a Adriel, o meolatita (1Sm 18:19). Foi tratada como peça, não como filha. Seus cinco filhos morreriam depois na conta que os gibeonitas cobraram da casa de Saul (2Sm 21:8)." },
  aquimeleque: { title: "Aimeleque", subtitle: "Sacerdote de Nobe, morto por Doegue (1Sm 21–22)", text: "Recebeu Davi em Nobe \"tremendo\" porque o via sozinho, deu-lhe os PÃES DA PROPOSIÇÃO que só aos sacerdotes cabiam e a espada de Golias guardada atrás do éfode (1Sm 21:6,9) — episódio que Jesus citaria para defender os discípulos no sábado, mostrando que \"a misericórdia é o que quero, e não o sacrifício\" (Mt 12:3-7). Chamado a Gibeá, defendeu-se com a verdade e com a lealdade a ambos: \"quem, entre todos os teus servos, há tão fiel como Davi... e honrado na tua casa?\" e \"não saiba o rei nada disto\" (1Sm 22:14-15). Saul o condenou junto com toda a sua casa; os guardas se recusaram a levantar a mão contra os sacerdotes do SENHOR, e Doegue matou oitenta e cinco homens que vestiam o éfode de linho (1Sm 22:17-18). Cumpriu-se ali a palavra dada a Eli, seu antepassado." },
  abiatar: { title: "Abiatar", subtitle: "O único sacerdote que escapou de Nobe (1Sm 22:20)", text: "Filho de Aimeleque, escapou do massacre e fugiu para Davi, que assumiu a culpa diante dele: \"eu dei ocasião à morte de todas as almas da casa de teu pai. Fica comigo, não temas... estarás em segurança comigo\" (1Sm 22:22-23). Trouxe consigo o ÉFODE, e por ele Davi passou a consultar o SENHOR nas horas decisivas — em Queila (1Sm 23:9-12) e em Ziclague (1Sm 30:7-8). Foi sacerdote durante todo o reinado de Davi, carregou a arca e chorou com ele na fuga de Absalão; mas apoiou Adonias na sucessão e foi deposto por Salomão, \"para que se cumprisse a palavra do Senhor, que tinha dito sobre a casa de Eli em Siló\" (1Rs 2:27)." },
  doegue: { title: "Doegue, o edomeu", subtitle: "O edomeu de Saul que matou os sacerdotes (1Sm 21:7; 22:9-22)", text: "\"O principal dos pastores de Saul\", edomeu, que estava \"detido perante o Senhor\" em Nobe no dia em que Davi ali passou (1Sm 21:7). Levou a informação a Gibeá no momento em que o rei se queixava de que ninguém lhe revelava nada, e a contou de modo a condenar Aimeleque (1Sm 22:9-10). Quando os servos de Saul se recusaram a estender a mão contra os sacerdotes do SENHOR, ele o fez sozinho: oitenta e cinco homens do éfode de linho, e depois a cidade inteira — \"homens e mulheres, meninos e criancinhas, e bois, jumentos e ovelhas\" (1Sm 22:18-19). Fez em Nobe o que Saul se recusara a fazer em Amaleque. O Salmo 52 é escrito contra ele: \"por que te glorias na malícia, ó homem poderoso?\"." },
  aquis: { title: "Aquis", subtitle: "Rei de Gate, o senhor filisteu (1Sm 21:10; 27–29)", text: "Davi fugiu duas vezes para ele. Na primeira, reconhecido pelos servos como \"o rei da terra\", teve de fingir-se louco, escrevendo nos batentes da porta e deixando correr a saliva pela barba, e Aquis o expulsou: \"faltam-me a mim doidos?\" (1Sm 21:10-15). O Salmo 34 nasceu dessa fuga. Na segunda, recebeu-o com toda a confiança, deu-lhe ZICLAGUE por cidade e o creu inimigo do próprio povo — \"fez-se ele por certo abominável ao seu povo... por isso me será por servo perpetuamente\" (1Sm 27:12). Foi só a desconfiança dos outros príncipes filisteus que impediu Davi de marchar contra Israel em Gilboa (1Sm 29:4-7) — providência disfarçada de política." },
  "gade-profeta": { title: "Gade, o profeta", subtitle: "O vidente que acompanhou Davi na fuga (1Sm 22:5)", text: "Aparece pela primeira vez no covil de Adulão, com uma ordem curta que salvou a vida do fugitivo: \"não fiques neste lugar de segurança; vai, e entra na terra de Judá\" (1Sm 22:5). Ficaria com Davi a vida inteira, chamado depois \"o vidente de Davi\" (2Sm 24:11): foi ele quem lhe trouxe as três opções de castigo depois do censo e quem lhe mandou levantar o altar na eira de Araúna — o lugar onde se ergueria o templo (2Sm 24:18). Escreveu parte da história do reinado (1Cr 29:29) e ajudou a organizar o culto com os levitas (2Cr 29:25). Um profeta de poucas palavras e de presença constante." },
  nabal: { title: "Nabal", subtitle: "O carmelita rico e insensato (1Sm 25)", text: "\"O nome deste homem era Nabal... e era o homem duro e maligno nas obras\" (1Sm 25:3) — e o próprio nome significa TOLO, INSENSATO, como a mulher diria: \"segundo é o seu nome, tal é ele; Nabal é o seu nome, e a loucura está com ele\" (1Sm 25:25). Tinha três mil ovelhas e mil cabras, e à tosquia — a festa da fartura — respondeu ao pedido de Davi com desprezo de classe: \"quem é Davi, e quem é o filho de Jessé? Muitos servos há hoje que fogem ao seu senhor\" (1Sm 25:10). Não pagou a proteção que recebera de graça no deserto. Naquela noite banqueteava-se como um rei, embriagado; dez dias depois de saber o que se passara, \"o Senhor feriu a Nabal, e este morreu\" (1Sm 25:37-38). É o rico insensato do Antigo Testamento (cf. Lc 12:16-21)." },
  abigail: { title: "Abigail", subtitle: "A mulher de Nabal, que deteve a espada de Davi (1Sm 25)", text: "\"Mulher de bom entendimento e formosa de aspecto\" (1Sm 25:3), casada com um insensato. Avisada por um criado, agiu sem consultar o marido: carregou depressa duzentos pães, dois odres de vinho, cinco ovelhas guisadas, cinco medidas de trigo tostado, cem cachos de passas e duzentas pastas de figos, e desceu ao encontro dos quatrocentos homens armados (1Sm 25:18). Prostrou-se e tomou sobre si a culpa alheia, e então falou como profeta: o SENHOR faria ao seu senhor \"casa firme\", a sua alma estaria \"atada no feixe dos que vivem\", e ele não teria \"tropeço nem escrúpulo de coração\" por sangue derramado sem causa (1Sm 25:28-31). Davi a abençoou por tê-lo impedido: \"bendito o teu conselho, e bendita tu\" (1Sm 25:33). Viúva, tornou-se sua mulher — a voz que salvou o futuro rei do próprio impulso." },
  "moco-de-nabal": { title: "O moço que avisou Abigail", subtitle: "O criado dos rebanhos do Carmelo (1Sm 25:14-17)", text: "Um dos servos que apascentavam no deserto, e o único da casa com juízo suficiente para ver o que vinha. Contou a Abigail o desprezo do amo — \"ele se lançou a eles\" — e deu o testemunho que justificava o pedido de Davi: \"aqueles homens nos têm sido muito bons... foram muro em redor de nós, tanto de dia como de noite, todos os dias que andamos com eles apascentando as ovelhas\" (1Sm 25:15-16). E concluiu com a franqueza dos que servem de perto: \"ele é um tal filho de Belial, que não há quem lhe possa falar\" (1Sm 25:17). Sem esse aviso, teria havido um massacre — e a mancha de sangue na consciência do futuro rei." },
  abisai: { title: "Abisai", subtitle: "Filho de Zeruia, sobrinho de Davi (1Sm 26:6)", text: "Irmão de Joabe e de Asael, e o único que se ofereceu para descer com Davi ao arraial adormecido em Haquila: \"eu descerei contigo\" (1Sm 26:6). Achando Saul dormindo com a lança fincada à cabeceira, pediu o golpe único: \"deixa-me, pois, agora ferí-lo com a lança, até ao chão, uma só vez; e não o ferirei segunda\" (1Sm 26:8). Davi o conteve com a regra que o governava: \"quem estenderá a mão contra o ungido do Senhor e ficará inculpável?\" (1Sm 26:9). Abisai é o guerreiro leal e sempre pronto demais — o mesmo que quereria cortar a cabeça de Simei (2Sm 16:9) e que depois salvaria a vida de Davi na peleja contra o gigante Isbi-Benobe (2Sm 21:17)." },
  joabe: { title: "Joabe", subtitle: "Filho de Zeruia, o futuro capitão de Davi", text: "Sobrinho de Davi e irmão de Abisai e Asael, aparece já no bando do deserto e se tornaria o comandante do exército durante quase todo o reinado (2Sm 8:16). Soldado de altíssima competência e de consciência curta: matou Abner à traição em Hebrom (2Sm 3:27), executou a ordem que pôs Urias na linha de frente (2Sm 11:16-17) e matou Absalão contra a ordem expressa do rei (2Sm 18:14). Sabia, porém, dizer a Davi o que ninguém dizia (2Sm 19:5-7). Foi finalmente alcançado pela justiça que adiara, agarrado às pontas do altar (1Rs 2:28-34) — figura da lealdade sem temor de Deus." },
  "aimeleque-heteu": { title: "Aimeleque, o heteu", subtitle: "O estrangeiro no bando de Davi (1Sm 26:6)", text: "Davi perguntou primeiro a ele: \"quem descerá comigo a Saul, ao arraial?\" (1Sm 26:6) — e foi Abisai quem respondeu. Heteu, isto é, do povo cananeu antigo que Israel devia ter expulsado, e no entanto contado entre os homens de confiança do ungido. Não está sozinho: Urias, o heteu, seria um dos trinta valentes (2Sm 23:39), e Itai, o giteu, ficaria fiel a Davi quando Jerusalém inteira o abandonou (2Sm 15:19-21). No exército do rei rejeitado havia lugar para estrangeiros leais — sinal antigo de que a casa de Davi acabaria por abrigar \"toda tribo, e língua, e povo, e nação\" (Ap 5:9)." },
  "pitonisa-endor": { title: "A mulher de En-Dor", subtitle: "A necromante que Saul procurou de noite (1Sm 28:7-25)", text: "\"Buscai-me uma mulher que tenha o espírito de adivinhar\" — e o próprio Saul tinha \"desarraigado da terra os adivinhos e os encantadores\" (1Sm 28:3,7), conforme a lei que proibia consultar os mortos sob pena de morte (Lv 19:31; Dt 18:10-12). Ela reconheceu a armadilha e cobrou juramento antes de agir; e quando Samuel apareceu de fato, GRITOU em alta voz, espantada com o que não esperava produzir (1Sm 28:12) — o texto sugere que Deus interveio à revelia da sua arte. No fim, foi ela quem teve compaixão do rei caído no chão, sem forças e sem ter comido o dia inteiro: matou o bezerro cevado de casa, cozeu pães asmos e o fez comer antes de partir para Gilboa (1Sm 28:24-25). Uma bondade humana na última noite de um homem sem Deus." },
  naas: { title: "Naás, o amonita", subtitle: "O rei que cercou Jabes-Gileade (1Sm 11:1-2)", text: "Veio contra Jabes-Gileade, e quando a cidade pediu aliança respondeu com a proposta infame: \"com esta condição farei aliança convosco: que a todos vos arranque o olho direito, e assim ponha esta afronta sobre todo o Israel\" (1Sm 11:2). Não queria só vencer: queria marcar um povo inteiro de vergonha, deixando cada homem inútil para a guerra — o olho esquerdo ficava coberto pelo escudo. Os sete dias de prazo que concedeu por arrogância deram tempo aos mensageiros e ao Espírito de Deus, que se apoderou de Saul (1Sm 11:6). Foi derrotado na vigília da manhã e os seus dispersos \"de maneira que dois deles não ficaram juntos\" (1Sm 11:11)." },
  "egipcio-de-amaleque": { title: "O egípcio achado no campo", subtitle: "O escravo abandonado que guiou Davi a Ziclague (1Sm 30:11-16)", text: "Mancebo egípcio, servo de um amalequita, deixado para trás no campo porque adoecera três dias antes — \"três dias há que não como pão nem bebo água\" (1Sm 30:12-13). Os homens de Davi lhe deram um pedaço de pasta de figos, dois cachos de passas e água, e o espírito lhe voltou. Foi ele quem apontou o caminho do bando que saqueara Ziclague, sob a condição de não ser morto nem entregue de volta ao amo (1Sm 30:15). Um escravo estrangeiro descartado por doença foi o instrumento que devolveu a Davi as mulheres, os filhos e todo o despojo — \"nada lhes faltou\" (1Sm 30:19). O que Amaleque jogou fora, Deus usou." },
  nata: { title: "Natã", subtitle: "O profeta que disse a Davi \"Tu és este homem\" (2Sm 12:7)", text: "Aparece primeiro aprovando depressa o que o rei tinha no coração — \"Vai, e faze tudo quanto está no teu coração; porque o Senhor é contigo\" (2Sm 7:3) —, e naquela mesma noite a palavra do SENHOR o desmentiu: não seria Davi a edificar a casa, seria Deus a fazer casa a Davi, com um trono \"firme para sempre\" (2Sm 7:11-16). Anos depois voltou com uma parábola de cordeira, deixou o rei condenar-se pela própria boca e cravou a sentença: \"Tu és este homem\" (12:7). Anunciou a espada que nunca mais sairia daquela casa, ouviu a confissão \"Pequei contra o Senhor\" e respondeu com o perdão que não cancelava o castigo (12:10,13). Quando nasceu Salomão, foi pela sua mão que Deus mandou chamá-lo JEDIDIAS, \"por amor ao Senhor\" (12:25). Na última hora do reinado ainda entrou no quarto do velho rei para desfazer o golpe de Adonias, e desceu a Giom com Zadoque a ungir Salomão (1Rs 1:11,32-34). Escreveu parte da história do reinado (1Cr 29:29): profeta de corte que nunca virou bajulador." },
  "bate-seba": { title: "Bate-Seba", subtitle: "Filha de Eliã, mulher de Urias, o heteu (2Sm 11:3)", text: "O relato é sóbrio e devastador: \"numa tarde Davi se levantou do seu leito, e andava passeando no terraço da casa real, e viu do terraço a uma mulher que se estava lavando\" (11:2). Mandaram indagar quem era, mandaram buscá-la, e o recado que voltou tem duas palavras: \"Estou grávida\" (11:5). Chorou o marido morto pela carta que ele mesmo carregara, e \"passado o luto\" foi recolhida à casa do rei (11:26-27). O primeiro filho adoeceu e morreu ao sétimo dia; do segundo o texto diz apenas \"e o Senhor o amou\" — Salomão (12:24). Era filha de Eliã, e aquele Eliã era filho de Aitofel, o gilonita (23:34), o conselheiro que depois trairia Davi. Reapareceu decisiva na velhice do rei, cobrando o juramento antigo — \"Salomão, teu filho, reinará depois de mim\" (1Rs 1:17) — e sentou-se depois como rainha-mãe. Mateus não a nomeia na genealogia do Messias: chama-a \"a que foi mulher de Urias\" (Mt 1:6), para que a ferida entrasse inteira na linhagem de Cristo." },
  urias: { title: "Urias, o heteu", subtitle: "Um dos valentes de Davi, marido de Bate-Seba (2Sm 23:39)", text: "Estrangeiro — heteu, de um povo cananeu — e ainda assim inscrito na lista de honra do reino, o último nome dos trinta e sete valentes de Davi (23:39). Chamado da frente de batalha para encobrir o adultério do rei, recusou-se a descer à própria casa: \"A arca, e Israel, e Judá ficaram em tendas; e Joabe, meu senhor, e os servos de meu senhor estão acampados no campo; e hei de eu entrar na minha casa, para comer e beber, e para me deitar com minha mulher?\" (11:11). Dormiu à porta da casa real com os servos; embebedado de propósito, dormiu à porta outra vez — sóbrio ou bêbado, mais fiel do que o ungido. Levou nas próprias mãos a carta que o condenava: \"Ponde a Urias na frente da maior força da peleja; e retirai-vos de detrás dele, para que seja ferido e morra\" (11:15). Morreu junto ao muro de Rabá, e a notícia chegou a Jerusalém escondida no meio de uma lista de baixas. Foi por causa dele que Natã pronunciou a sentença — \"não se apartará a espada jamais da tua casa\" (12:10) — e é o nome dele, não o dela, que Mateus preservou na genealogia do Messias (Mt 1:6)." },
  absalao: { title: "Absalão", subtitle: "Terceiro filho de Davi, o príncipe que roubou o reino (2Sm 13–18)", text: "Filho de Maaca, filha de Talmai, rei de Gesur (3:3): \"Não havia, porém, em todo o Israel homem tão belo e tão aprazível como Absalão; desde a planta do pé até à cabeça não havia nele defeito algum\" (14:25), e o cabelo que tosquiava uma vez por ano pesava duzentos siclos. Depois da violência contra Tamar, \"não falou com Amnom, nem mal nem bem\" (13:22) por dois anos inteiros, e então o mandou matar na tosquia de Baal-Hazor, alegre do vinho. Fugiu três anos para Gesur, voltou pela mão de Joabe e passou mais dois anos em Jerusalém sem ver a face do pai; para ser recebido, tocou fogo na cevada do próprio Joabe (14:28-31). Depois pôs-se todas as manhãs à beira do caminho da porta, ouvindo as demandas que o rei não ouvia e beijando quem se inclinava: \"assim furtava Absalão o coração dos homens de Israel\" (15:6). Proclamado em Hebrom, entrou na cidade abandonada e possuiu as concubinas do pai numa tenda no terraço, cumprindo ao sol a palavra de Natã (12:11-12; 16:22). No bosque de Efraim a cabeça se prendeu nos ramos de um grande carvalho e ele ficou \"pendurado entre o céu e a terra\" até os três dardos de Joabe (18:9,14); e do rei que ele quis destronar veio o pranto: \"Meu filho Absalão, meu filho, meu filho\" (18:33)." },
  amnom: { title: "Amnom", subtitle: "O primogênito de Davi, nascido em Hebrom (2Sm 3:2)", text: "Primeiro filho de Davi, de Ainoã, a jizreelita (3:2), e por isso o herdeiro natural do trono. O texto diz que \"angustiou-se Amnom, até adoecer\" por Tamar, meia-irmã sua, \"porque era virgem\" (13:2) — chamou de amor o que era cobiça, e adoeceu de não poder ter. Seguiu à risca a receita do primo Jonadabe: fingiu-se doente, pediu ao pai que a irmã lhe fizesse bolos, esvaziou o quarto e a forçou, \"sendo mais forte do que ela\" (13:14). O versículo seguinte julga tudo o que veio antes: \"Depois Amnom sentiu grande aversão por ela, pois maior era o ódio que sentiu por ela do que o amor com que a amara\" (13:15) — e mandou o moço trancar a porta atrás dela. Davi \"muito se lhe acendeu a ira\" (13:21) e não fez absolutamente nada, e o silêncio do pai foi a sentença do filho. Dois anos depois caiu sob a ordem dos servos de Absalão, entre os tosquiadores (13:28-29): a primeira espada a cair sobre a casa de Davi, exatamente como Natã dissera." },
  jonadabe: { title: "Jonadabe", subtitle: "Filho de Siméia, irmão de Davi; o amigo de Amnom (2Sm 13:3)", text: "Primo do príncipe e \"homem mui sagaz\" (13:3) — inteligência a serviço de coisa nenhuma. Notou o emagrecimento de Amnom, arrancou-lhe a confissão e lhe entregou o plano pronto: \"Deita-te na tua cama, e finge-te doente; e, quando teu pai te vier visitar, dize-lhe: Peço-te que minha irmã Tamar venha, e me dê de comer pão\" (13:5). Foi um conselho de quatro linhas que destruiu uma princesa, matou o herdeiro do trono e abriu a rebelião que quase custou o reino. Reapareceu no dia da matança, calmo entre os que rasgavam as vestes, para informar ao rei que só Amnom morrera — \"porque assim tinha resolvido fazer Absalão, desde o dia em que forçou a Tamar sua irmã\" (13:32). Ou seja: sabia do ódio de Absalão havia dois anos inteiros e não avisou ninguém. A Escritura não lhe dá castigo nem fim; deixa-o de pé ao lado do trono, o homem que sempre sabe de tudo e nunca impede nada — e é assim que Provérbios distingue a astúcia do temor do SENHOR, que é o princípio da sabedoria (Pv 9:10)." },
  asael: { title: "Asael", subtitle: "Filho de Zeruia, irmão de Joabe e Abisai (2Sm 2:18)", text: "Sobrinho de Davi e um dos trinta valentes (23:24), conhecido por uma coisa só: \"Asael era ligeiro de pés, como as gazelas do campo\" (2:18). No dia da peleja junto ao tanque de Gibeom escolheu a presa maior e perseguiu o velho capitão do norte: \"não se desviou de detrás de Abner, nem para a direita nem para a esquerda\" (2:19). Duas vezes Abner lhe pediu que largasse a caçada — \"por que hei de eu ferir-te e dar contigo em terra? E como levantaria eu o meu rosto diante de Joabe, teu irmão?\" (2:22) —, e duas vezes ele não quis. Morreu com a ponta da lança pela quinta costela, e \"todos os que chegavam ao lugar onde Asael caiu e morreu, paravam\" (2:23). Foi sepultado em Belém, na sepultura de seu pai (2:32). A velocidade lhe custou a vida, e o seu sangue virou o pretexto com que Joabe assassinou Abner à traição em Hebrom (3:27) — uma morte de rapaz que envenenou o reinado inteiro." },
  isbosete: { title: "Is-Bosete", subtitle: "Filho de Saul, rei em Maanaim por dois anos (2Sm 2:8-10)", text: "Sobrevivente da casa de Saul, não foi ungido por profeta nem aclamado por povo: \"Abner, filho de Ner, capitão do exército de Saul, tomou a Is-Bosete, filho de Saul, e o fez passar a Maanaim... o constituiu rei\" (2:8-9) — um trono levantado por um general. Tinha quarenta anos e reinou dois, sobre o norte, enquanto Judá seguia Davi em Hebrom (2:10-11). Rei sem autoridade nenhuma: quando ousou repreender Abner por causa de Rispa, ouviu uma explosão de desprezo e \"nenhuma palavra podia ele responder a Abner, porque o temia\" (3:11). Logo depois obedeceu e arrancou Mical do marido, que a seguiu chorando até Baurim (3:15-16). Morto Abner, \"as mãos se lhe afrouxaram; e todo o Israel pasmou\" (4:1) — perdeu o único homem que o sustentava. Foi morto na cama, ao meio-dia, por dois dos seus próprios capitães; Davi mandou executar os assassinos e sepultou a cabeça dele na sepultura de Abner, em Hebrom (4:5-7,12), fechando com honra a casa que o SENHOR rejeitara." },
  mefibosete: { title: "Mefibosete", subtitle: "Filho de Jônatas, coxo de ambos os pés (2Sm 4:4; 9)", text: "Tinha cinco anos quando chegou de Jizreel a notícia de Gilboa: \"sua ama o tomou, e fugiu; e sucedeu que, apressando-se ela a fugir, ele caiu, e ficou coxo\" (4:4) — a queda de uma dinastia inteira em cima de um menino. Vivia escondido em Lo-Debar, na casa de Maquir, quando Davi perguntou se restava alguém da casa de Saul \"para que lhe faça benevolência por amor de Jônatas\" (9:1). Trazido à presença do rei, prostrou-se e disse o que pensava de si mesmo: \"Quem é teu servo, para teres olhado para um cão morto tal como eu?\" (9:8). Recebeu de volta todas as terras do avô e um lugar permanente: \"comerá à minha mesa como um dos filhos do rei\" (9:11) — a mesa que cobre os pés coxos. Na fuga de Absalão foi caluniado por Ziba e perdeu metade da fazenda por um despacho apressado; mas veio ao encontro do rei sem ter lavado os pés, nem feito a barba, nem lavado as vestes desde o dia da partida, e devolveu tudo: \"Tome ele também tudo; pois já veio o rei meu senhor em paz à sua casa\" (19:24,30). Quando sete descendentes de Saul foram enforcados em Gibeá, foi poupado \"por causa do juramento do Senhor... entre Davi e Jônatas\" (21:7): a aliança de dois amigos guardou-lhe a vida uma geração inteira depois." },
  ziba: { title: "Ziba", subtitle: "O servo da casa de Saul (2Sm 9:2; 16:1-4)", text: "Mordomo da casa de Saul, homem de posses com quinze filhos e vinte servos (9:10), foi ele quem informou ao rei que restava \"um filho de Jônatas, aleijado de ambos os pés\" (9:3) — e recebeu ordem de lavrar as terras devolvidas ao neto do seu antigo senhor. Na fuga de Absalão apareceu logo depois do cume do monte, na hora exata, com um par de jumentos albardados, duzentos pães, cem cachos de passas, cem frutas de verão e um odre de vinho (16:1). Com a boca cheia de zelo, acusou o amo ausente de conspirar: \"Hoje me restituirá a casa de Israel o reino de meu pai\" (16:3). O rei, apressado e sem ouvir o outro lado, sentenciou numa frase: \"Eis que teu é tudo quanto tem Mefibosete\" (16:4). Na volta o coxo apareceu de luto e desmentiu tudo — \"o meu servo me enganou... falsamente acusou a teu servo\" (19:26-27) —, e Davi, cansado, apenas mandou repartir a terra entre os dois (19:29). A Escritura não declara quem mentiu, mas deixa ver quem lucrou: o presente certo, na hora certa, valeu meia herança." },
  aitofel: { title: "Aitofel", subtitle: "O gilonita, conselheiro de Davi passado a Absalão (2Sm 15:12)", text: "Conselheiro do rei, com uma autoridade quase oracular: \"era o conselho de Aitofel, que aconselhava naqueles dias, como se a palavra de Deus se consultara\" (16:23). Absalão o mandou buscar em Giló, e foi a sua adesão que fez a conjuração ganhar corpo (15:12) — por isso Davi, fugindo descalço, não pediu exércitos, pediu isto: \"Ó Senhor, peço-te que torne em loucura o conselho de Aitofel\" (15:31). Aconselhou o terraço com as concubinas e depois o golpe frio e certeiro: doze mil homens naquela mesma noite, espantar o povo e \"então ferirei somente o rei\" (17:1-3). O plano era bom, e foi por ser bom que Deus o quebrou: Husai falou depois dele, \"porém assim o Senhor o ordenara, para aniquilar o bom conselho de Aitofel, para que o Senhor trouxesse o mal sobre Absalão\" (17:14). Sabendo-se derrotado, \"albardou o jumento, e levantou-se, e foi para sua casa e para a sua cidade, e deu ordem à sua casa, e se enforcou e morreu\" (17:23) — calculista até no suicídio, pôs os papéis em ordem antes de se matar. Era pai daquele Eliã que estava entre os valentes (23:34) e, por ele, avô de Bate-Seba (11:3); e é o amigo de mesa que levanta o calcanhar contra o rei (Sl 41:9), a figura que Jesus aplicaria a Judas na última ceia (Jo 13:18)." },
  husai: { title: "Husai", subtitle: "O arquita, o amigo do rei (2Sm 15:32-37)", text: "Encontrou Davi no cume do monte das Oliveiras \"com a roupa rasgada e terra sobre a cabeça\" (15:32), pronto a subir descalço com ele. O rei lhe deu uma missão pior que o exílio: voltar, fingir-se do outro lado — \"dissipar-me-ás então o conselho de Aitofel\" (15:34). Entrou em Jerusalém gritando \"Viva o rei, viva o rei!\" a quem não era rei, e aguentou na cara a suspeita de Absalão: \"É esta a tua beneficência para com o teu amigo?\" (16:16-17). Chamado a opinar, não atacou de frente o plano de Aitofel — pintou Davi e seus homens \"como a ursa no campo, roubada dos cachorros\" e ofereceu ao vaidoso o que ele queria ouvir: todo o Israel reunido \"em multidão como a areia do mar\", e o próprio Absalão à frente (17:8,11). Ganhou uma noite, e a noite ganhou a guerra; e o texto credita a vitória a quem devia: \"assim o Senhor o ordenara, para aniquilar o bom conselho de Aitofel\" (17:14). Mandou o aviso a Zadoque e Abiatar, e pelos pés de dois moços o rei passou o Jordão antes do amanhecer (17:15-22). A Bíblia lhe dá um título só, e é cargo e é verdade ao mesmo tempo: \"Husai, pois, amigo de Davi\" (15:37)." },
  itai: { title: "Itai, o giteu", subtitle: "O estrangeiro que jurou seguir Davi na fuga (2Sm 15:19-22)", text: "Filisteu de Gate — a cidade de Golias — à frente de seiscentos homens que tinham chegado havia pouco tempo (15:18). Na noite da fuga Davi tentou dispensá-lo, e com razões honestas: \"Por que irias tu também conosco? Volta-te, e fica-te com o rei, porque és estrangeiro, e também desterrado de teu lugar. Ontem vieste, e te levaria eu hoje conosco a caminhar?\" (15:19-20). A resposta é uma das grandes confissões de lealdade da Escritura: \"Vive o SENHOR, e vive o rei meu senhor, que no lugar em que estiver o rei meu senhor, seja para morte seja para vida, aí certamente estará também o teu servidor\" (15:21). Passou o ribeiro de Cedrom com todos os seus homens e todas as crianças que iam com eles. No bosque de Efraim comandou um dos três corpos do exército, ao lado de Joabe e Abisai, e ouviu com eles a ordem sobre o jovem Absalão (18:2,5). O gentio de ontem foi mais fiel ao ungido do que os anciãos de Israel — o mesmo escândalo de graça que o Evangelho repetiria com a cananeia e com o centurião de quem Jesus disse: \"nem ainda em Israel tenho achado tanta fé\" (Mt 8:10)." },
  simei: { title: "Simei", subtitle: "Filho de Gera, que amaldiçoou o rei em Baurim (2Sm 16:5)", text: "Benjamita da linhagem da casa de Saul, saiu de Baurim para acompanhar o cortejo do rei em fuga, \"e, saindo, ia amaldiçoando\", atirando pedras e levantando poeira ao longo do monte (16:5-6,13). O que gritava era: \"Sai, sai, homem de sangue, e homem de Belial... eis-te agora na tua desgraça, porque és um homem de sangue\" (16:7-8). Abisai quis resolver como sempre — \"Deixa-me passar, e lhe tirarei a cabeça\" —, e ouviu do rei a resposta que só cabe num homem quebrantado: \"Deixai-o, que amaldiçoe; porque o Senhor lho disse. Porventura o Senhor olhará para a minha miséria\" (16:9-12). Na volta foi o primeiro de toda a casa de José a descer ao Jordão, com mil benjamitas, prostrando-se e confessando: \"teu servo deveras confessa que pecou\" (19:16-20). Davi lhe jurou a vida — \"Não morrerás\" (19:23) —, mas legou a conta ao filho: \"não o tenhas por inculpável, pois és homem sábio... para que faças com que as suas cãs desçam à sepultura com sangue\" (1Rs 2:9). Confinado por Salomão a Jerusalém, quebrou o confinamento atrás de dois escravos fugidos e morreu pela mão de Benaia (1Rs 2:36-46): a maldição daquele dia levou anos a cobrar, mas cobrou." },
  barzilai: { title: "Barzilai", subtitle: "O gileadita de Rogelim, de oitenta anos (2Sm 19:31-39)", text: "Homem de posses em Rogelim, de quem o texto diz apenas que \"era grande homem\" (19:32); foi um dos três que subiram a Maanaim com camas, bacias, trigo, cevada, farinha, favas, lentilhas, mel, manteiga, ovelhas e queijos para o rei fugitivo e o povo que \"no deserto está faminto, cansado e sedento\" (17:27-29). Quando Davi voltou em triunfo e o convidou para a corte — \"Passa tu comigo, e sustentar-te-ei comigo em Jerusalém\" (19:33) —, recusou com uma honestidade que não tem par na Bíblia: \"Da idade de oitenta anos sou eu hoje; poderia eu discernir entre o bom e o mau? Poderia o teu servo ter gosto no que comer e beber? Poderia eu mais ouvir a voz dos cantores e cantoras? E por que será o teu servo ainda pesado ao rei meu senhor?\" (19:35-36). Não quis ser peso e pediu só uma coisa: morrer na sua cidade, \"junto à sepultura de meu pai e de minha mãe\" — mandando o moço Quimã em seu lugar (19:37). Atravessou apenas um pedaço do Jordão; \"beijou o rei a Barzilai, e o abençoou; e ele voltou para o seu lugar\" (19:39). Davi não o esqueceu: no leito de morte encomendou a Salomão que os filhos dele estivessem \"entre os que comem à tua mesa, porque assim se chegaram eles a mim, quando eu fugia por causa de teu irmão Absalão\" (1Rs 2:7). Serviu sem cobrar nada e soube a hora de ir para casa — a velhice sem ilusão e sem amargura." },
  amasa: { title: "Amasa", subtitle: "Primo de Davi, capitão de Absalão e depois do rei (2Sm 17:25)", text: "Filho de Itra e de Abigail, irmã de Zeruia — portanto sobrinho de Davi e primo de Joabe, do mesmo sangue dos dois lados da guerra (17:25). Absalão o \"constituiu a Amasa em lugar de Joabe sobre o arraial\", e ele comandou o exército rebelde derrotado no bosque de Efraim. Vencido, foi perdoado e promovido: para se livrar de Joabe, que matara Absalão contra a sua ordem, Davi entregou a este primo o comando do exército. Convocado a reunir Judá em três dias, \"demorou-se além do tempo que lhe tinha sido designado\" (20:5), e a demora abriu a porta ao homem que ele substituíra. Junto à pedra grande de Gibeom, Joabe o saudou como irmão: \"Vai bem, meu irmão? E Joabe, com a mão direita, pegou da barba de Amasa, para o beijar\" — e com a outra o feriu pela quinta costela, sem precisar de segundo golpe (20:9-10). Ficou \"envolto no seu sangue no meio do caminho\" até que o arrastassem para o campo e o cobrissem com um manto, porque todo o povo que passava parava para olhar (20:12). Foi um dos dois homens de quem Joabe \"em paz derramou o sangue de guerra\", e que Davi, morrendo, mandou Salomão cobrar de Joabe (1Rs 2:5)." },
  seba: { title: "Seba", subtitle: "Filho de Bicri, o benjamita que tocou a buzina (2Sm 20:1)", text: "Benjamita da tribo do rei deposto, é apresentado como \"um homem de Belial\" (20:1); aproveitou a briga entre Judá e Israel na volta de Davi e tocou a buzina com o grito da separação: \"Não temos parte em Davi, nem herança no filho de Jessé; cada um às suas tendas, ó Israel\" (20:1). O grito pegou na hora: \"todos os homens de Israel se separaram de Davi, e seguiram Seba, filho de Bicri\" (20:2). O rei o julgou pior que o próprio filho rebelde — \"Mais mal agora nos fará Seba, o filho de Bicri, do que Absalão\" (20:6) — e mandou persegui-lo antes que se fechasse em cidades fortes. Refugiou-se em Abel de Bete-Maaca, e a barragem de Joabe já batia no muro quando uma mulher sábia negociou por dentro. A cidade escolheu depressa: \"cortaram a cabeça de Seba, filho de Bicri, e a lançaram a Joabe\" (20:22). Mas o grito dele não morreu naquele muro: as mesmas palavras voltariam, quase idênticas, na boca das dez tribos no dia em que o reino se partiu de vez (1Rs 12:16)." },
  rispa: { title: "Rispa", subtitle: "Filha de Aiá, concubina de Saul, a mãe que velou os mortos (2Sm 21:10)", text: "Concubina de Saul e mãe de Armoni e Mefibosete, foi primeiro apenas o pretexto de uma briga de homens: Is-Bosete acusou Abner de a ter possuído, e Abner, ofendido, entregou o reino do norte a Davi (3:7-10). Anos depois, uma fome de três anos consecutivos descobriu o sangue dos gibeonitas derramado por Saul, e sete descendentes do rei morto foram enforcados em Gibeá \"nos dias da sega, nos dias primeiros, no princípio da sega das cevadas\" — dois deles eram os filhos dela (21:1-9). Então fez o que nenhuma lei mandava e nenhum poder podia impedir: \"Rispa, filha de Aiá, tomou um pano de cilício, e estendeu-lho sobre uma penha, desde o princípio da sega até que a água do céu caiu sobre eles; e não deixou as aves do céu pousar sobre eles de dia, nem os animais do campo de noite\" (21:10). Foram meses inteiros de vigília sobre a rocha, sozinha, espantando as aves de rapina de dia e os animais do campo de noite, guardando corpos que já não podia salvar — o luto virado sentinela. Não pregou, não acusou ninguém e não pediu nada; e mesmo assim \"foi contado a Davi o que fizera Rispa, filha de Aiá, concubina de Saul\" (21:11), e o rei se levantou: foi buscar em Jabes-Gileade os ossos de Saul e de Jônatas, ajuntou os ossos dos enforcados e sepultou a todos na terra de Benjamim, em Zela, na sepultura de Quis (21:12-14). Só então \"Deus se aplacou com a terra\". A fidelidade de uma mulher sem nenhum poder ensinou um rei a honrar os seus mortos." },
  arauna: { title: "Araúna", subtitle: "O jebuseu, dono da eira onde o anjo parou (2Sm 24:16-25)", text: "Jebuseu — do povo que habitava Jerusalém antes de Davi tomar a fortaleza de Sião (5:6) — e dono de uma eira no alto da cidade. Foi exatamente ali que a mão do destruidor se deteve: \"o Senhor se arrependeu daquele mal; e disse ao anjo... Basta, agora retira a tua mão. E o anjo do Senhor estava junto à eira de Araúna, o jebuseu\" (24:16). Vendo chegar o rei e os seus servos, saiu e se inclinou com o rosto em terra, e ofereceu tudo de graça: a eira, os bois para o holocausto, os trilhos e os aparelhos dos bois para lenha — \"O Senhor teu Deus tome prazer em ti\" (24:22-23). Davi recusou com a frase que define o que é adorar: \"Não, mas por preço justo to comprarei, porque não oferecerei ao Senhor meu Deus holocaustos que não me custem nada\" (24:24). Pagou cinquenta siclos de prata, levantou o altar, ofereceu holocaustos e ofertas pacíficas, \"e cessou aquele castigo de sobre Israel\" (24:25). E aquele chão de debulhar trigo era o monte Moriá: ali Salomão começaria a edificar a casa do SENHOR, \"no lugar que Davi tinha preparado na eira de Ornã, o jebuseu\" (2Cr 3:1) — o templo nasceu do terreno de um estrangeiro, no dia em que a praga parou." },
  "sabia-de-tecoa": { title: "A mulher sábia de Tecoa", subtitle: "A viúva fingida que trouxe Absalão de volta (2Sm 14:1-20)", text: "Joabe a mandou buscar em Tecoa e lhe pôs as palavras na boca: que se fingisse de luto, não se ungisse com óleo e fosse \"como uma mulher que há já muitos dias está de luto por algum morto\" (14:2-3). Diante do rei contou o caso de dois filhos que brigaram no campo sem ninguém para os apartar, um matou o outro, e agora a linhagem inteira exigia o sobrevivente: \"Assim apagarão a brasa que me ficou, de sorte que não deixam a meu marido nome, nem remanescente sobre a terra\" (14:7). Arrancou de Davi um juramento pela vida do assassino — \"não há de cair no chão nem um dos cabelos de teu filho\" — e, com o juramento na mão, virou a parábola contra ele: \"Por que, pois, pensaste tu uma tal coisa contra o povo de Deus?... visto que o rei não torna a trazer o seu desterrado\" (14:11,13). Então disse a frase que é teologia inteira na boca de uma camponesa: \"certamente morreremos, e seremos como águas derramadas na terra que não se ajuntam mais; Deus, pois, lhe não tirará a vida, mas cogita meios, para que não fique banido dele o seu desterrado\" (14:14) — Deus é o que arquiteta o regresso do exilado, e é isso que a cruz faria em escala definitiva. Quando o rei percebeu a mão de Joabe atrás de tudo, ela não mentiu: \"Joabe, teu servo, é quem me deu ordem\" (14:19). É a segunda parábola que julga Davi: Natã o condenou com uma cordeira, ela o desarmou com um filho — mas onde Natã trouxe arrependimento, esta só arrancou um perdão pela metade, e o desterrado que voltou sem ser reconciliado acabaria por tomar-lhe o trono." },
  "sabia-de-abel": { title: "A mulher sábia de Abel", subtitle: "A que salvou Abel-Bete-Maaca do cerco de Joabe (2Sm 20:16-22)", text: "A cidade estava cercada, a barragem levantada contra o muro e \"todo o povo que estava com Joabe batia no muro, para derrubá-lo\" (20:15) — quando uma voz de dentro parou o exército: \"Ouvi, ouvi, peço-vos que digais a Joabe: Chega-te aqui, para que eu te fale\" (20:16). Lembrou-lhe primeiro a fama antiga daquela terra, aonde se ia buscar conselho: \"Certamente pediram conselho a Abel; e assim resolveram\" (20:18). Depois falou pela cidade inteira, e falou como quem conhece a quem a terra pertence: \"Sou eu uma das pacíficas e das fiéis em Israel; e tu procuras matar uma cidade que é mãe em Israel; por que, pois, devorarias a herança do Senhor?\" (20:19). Joabe recuou na hora e pediu um só homem, o rebelde Seba, e ela \"na sua sabedoria, foi a todo o povo\" — a cabeça de Seba voou por cima do muro e o cerco se desfez (20:21-22). Não tem nome, nem cargo, nem um soldado; tem a pergunta certa na hora certa, e por ela uma cidade inteira ficou de pé. \"Melhor é a sabedoria do que as armas de guerra\" (Ec 9:18)." },
  recabe: { title: "Recabe", subtitle: "Capitão beerotita, um dos assassinos de Is-Bosete (2Sm 4:2)", text: "Filho de Rimom, o beerotita, dos filhos de Benjamim, e capitão de tropa do próprio rei que veio a matar (4:2). Com o irmão Baaná entrou em casa de Is-Bosete \"no maior calor do dia, estando ele deitado a dormir, ao meio-dia\", e o feriu na quinta costela (4:5-6). Cortaram-lhe a cabeça e \"andaram toda a noite caminhando pela planície\" até Hebrom, para vender em Judá o serviço prestado. Calcularam mal o homem a quem a ofereciam: já uma vez, em Ziclague, Davi mandara executar quem lhe trouxera a coroa de Saul esperando recompensa (4:10; 1:15). Ouviu a sentença — \"Quanto mais a ímpios homens, que mataram um homem justo em sua casa, sobre a sua cama\" (4:11) — e morreu pelas mãos dos moços do rei, com os pés e as mãos cortados, pendurado sobre o tanque de Hebrom (4:12). O que ele chamou de vingança do SENHOR foi, no juízo do rei, simples assassinato de um homem dormindo." },
  baana: { title: "Baaná", subtitle: "Capitão beerotita, irmão de Recabe (2Sm 4:2)", text: "O segundo dos dois irmãos de Beerote, cidade contada em Benjamim, cujos moradores tinham fugido para Gitaim (4:2-3) — homens da tribo de Saul que traíram o último filho de Saul. Entraram até o meio da casa \"como que vindo buscar trigo\", e mataram o rei desarmado no seu quarto, na sua cama (4:6-7). Diante de Davi ainda deram à traição um verniz de piedade: \"Eis aqui a cabeça de Is-Bosete, filho de Saul, teu inimigo, que procurava a tua morte; assim o SENHOR vingou hoje ao rei meu senhor\" (4:8) — puseram o nome de Deus por cima do próprio proveito. O rei respondeu invocando o Deus verdadeiro: \"Vive o Senhor, que remiu a minha alma de toda a angústia\" (4:9), e requereu deles o sangue que ninguém lhe pedira. Executados, foram pendurados sobre o tanque de Hebrom, enquanto a cabeça da vítima recebia sepultura honrada junto a Abner (4:12). O trono de Davi não se firmou sobre atalhos: nem o amalequita de Gilboa, nem estes dois, nem mais tarde Joabe escaparam à conta." },
  zadoque: { title: "Zadoque", subtitle: "O sacerdote, filho de Aitube (2Sm 8:17; 15:24-29)", text: "Descendente de Eleazar, filho de Arão, serviu ao lado de Abiatar durante todo o reinado de Davi (8:17). Na noite da fuga saiu de Jerusalém com todos os levitas e a arca da aliança, e o rei o mandou de volta com ela: \"Torna a levar a arca de Deus à cidade; que, se achar graça nos olhos do Senhor, ele me tornará a trazer para lá e me deixará ver a ela e a sua habitação\" (15:25) — Davi recusou usar a arca como amuleto, como Israel fizera em Ebenézer. Ficou dentro da cidade ocupada como os olhos e os ouvidos do rei, mandando por Aimaás e Jônatas os avisos que salvaram o exército inteiro (15:35-36; 17:15-21). Na volta, trabalhou para que Judá fosse o primeiro a buscar o rei (19:11). Foi ele quem ungiu Salomão em Giom, tomando \"o chifre de azeite do tabernáculo\" (1Rs 1:39). E quando Abiatar caiu por apoiar Adonias, \"a Zadoque, o sacerdote, pôs o rei em lugar de Abiatar\" (1Rs 2:35): dele veio a casa sacerdotal que substituiu a de Eli, e são os \"filhos de Zadoque\" que Ezequiel guarda para o serviço do santuário na visão do templo (Ez 44:15)." },
  aimaas: { title: "Aimaás", subtitle: "Filho de Zadoque, o corredor de boas novas (2Sm 18:19-30)", text: "Moço, filho do sumo sacerdote, foi um dos dois mensageiros que arriscaram a vida na Jerusalém tomada por Absalão: esperava junto à fonte de Rogel e, denunciado por um rapaz, escondeu-se num poço em Baurim, sob a tampa e o grão descascado que a dona da casa espalhou por cima (17:17-20). Saiu dali para atravessar a noite e avisar Davi a tempo de passar o Jordão antes do amanhecer (17:21-22). Depois da batalha quis correr outra vez — \"Deixa-me correr, e denunciarei ao rei que já o Senhor o vingou da mão de seus inimigos\" (18:19) —, e Joabe o segurou: \"hoje não darás a nova, porque é morto o filho do rei\" (18:20). Insistiu até arrancar o \"Corre\", \"correu pelo caminho da planície, e passou a Cusi\" (18:23), e a sentinela o reconheceu de longe pelo modo de correr: \"Este é homem de bem, e virá com boas novas\" (18:27). Chegou primeiro, gritou \"Paz\" e se prostrou; mas diante da única pergunta que importava — \"Vai bem com o jovem, com Absalão?\" — faltou-lhe a coragem: \"Vi um grande alvoroço... porém não sei o que era\" (18:29). Correu mais que todo mundo e não teve o que dizer: pressa não é o mesmo que mensagem." },
  cuchita: { title: "Cusi, o etíope", subtitle: "O que levou a Davi a notícia de Absalão (2Sm 18:21-32)", text: "O nome pelo qual a Escritura o chama diz apenas de onde veio: o cuchita, o homem de Cuxe, a Etiópia — um africano no exército de Davi. Foi a ele que Joabe entregou a notícia que ninguém queria carregar: \"Vai tu, e dize ao rei o que viste\" (18:21); e ele se inclinou e correu, sem discutir. Ultrapassado no caminho por Aimaás, chegou em segundo e disse tudo sem rodeios: \"Anunciar-se-á ao rei meu senhor que hoje o SENHOR te vingou da mão de todos os que se levantaram contra ti\" (18:31). Perguntado pelo jovem Absalão, respondeu com uma bênção que era uma sentença de morte: \"Sejam como aquele jovem os inimigos do rei meu senhor, e todos os que se levantam contra ti para mal\" (18:32). Vinha anunciar uma vitória e derrubou um pai: \"Então o rei se perturbou, e subiu à sala que estava por cima da porta, e chorou\" (18:33). Foi fiel ao recado e o recado partiu o coração de quem o mandara — a distância entre dizer a verdade e saber o que ela custa." },
  quimao: { title: "Quimã", subtitle: "O que Barzilai mandou ao rei em seu lugar (2Sm 19:37-40)", text: "Aparece em quatro versículos, e por uma razão só: o velho Barzilai, recusando a corte para si, pediu que a dessem a ele — \"Deixa voltar o teu servo... mas eis aí está o teu servo Quimã; passe ele com o rei meu senhor, e faze-lhe o que bem parecer aos teus olhos\" (19:37). O rei aceitou na hora: \"Quimã passará comigo, e eu lhe farei como bem parecer aos teus olhos, e tudo quanto me pedires te farei\" (19:38). Atravessou o Jordão, seguiu até Gilgal e entrou com o rei que voltava (19:40). Era, quase certamente, filho de Barzilai — e herdou o convite que o pai declinou; no leito de morte Davi ainda encomendaria a Salomão os filhos do gileadita, \"e estarão entre os que comem à tua mesa\" (1Rs 2:7). Séculos mais tarde, os fugitivos de Judá a caminho do Egito ainda paravam em \"Gerute-Quimã, que está perto de Belém\" (Jr 41:17) — sinal de que o rei lhe deu terra junto à sua própria cidade natal. Um homem sem uma única fala registrada, cujo nome ficou colado a um pedaço de chão: a bondade recebida em Maanaim sendo paga, em silêncio, uma geração depois." },
  hanum: { title: "Hanum", subtitle: "Filho de Naás, rei dos filhos de Amom (2Sm 10:1-4)", text: "Herdou o trono de Amom à morte do pai, aquele Naás que em vida usara de benevolência com Davi (10:1-2). Recebeu embaixadores de pêsames, e os príncipes amonitas lhe plantaram a suspeita: \"Porventura honra Davi a teu pai aos teus olhos, porque te enviou consoladores? Não te enviou antes Davi os seus servos para reconhecerem esta cidade, e para espiá-la, e para transtorná-la?\" (10:3). Ouviu os conselheiros errados e transformou um luto em ultraje: \"tomou Hanum os servos de Davi, e lhes raspou metade da barba, e lhes cortou metade das vestes, até às nádegas, e os despediu\" (10:4) — meia barba e meia veste, uma humilhação desenhada para não ser esquecida. Davi mandou que ficassem em Jericó \"até que vos torne a crescer a barba\" (10:5), e depois desceu com o exército. A afronta de um dia custou a Amom mercenários sírios, duas derrotas, a morte de Sobaque e, por fim, a coroa de Rabá na cabeça de outro rei (10:6-19; 12:30). Quem despreza a mão estendida em consolo acaba encontrando a mesma mão armada." },
  toi: { title: "Toí", subtitle: "Rei de Hamate (2Sm 8:9-10)", text: "Rei de uma cidade-estado ao norte, na Síria, que vivia sob a pressão de um vizinho maior: \"Hadadezer de contínuo fazia guerra a Toí\" (8:10). Ao saber que Davi \"ferira a todo o exército de Hadadezer\", não esperou ser o próximo nem tentou vingança própria: mandou o filho Jorão ao rei de Israel \"para lhe perguntar como estava, e para lhe dar os parabéns\" pela vitória (8:9-10). Com o filho foram \"vasos de prata, e vasos de ouro, e vasos de bronze\" — o gesto de quem reconhece de bom grado uma supremacia nova. Davi consagrou tudo ao SENHOR, junto com a prata e o ouro que já havia consagrado de todas as nações que sujeitara (8:11-12). É um dos poucos reis pagãos deste livro que não termina jarretado nem tributário: chegou com presentes em vez de exército, e por isso ficou de pé. Boa parte do tesouro com que Salomão levantaria o templo foi ajuntada de despojos e presentes assim (1Cr 18:11)." },
  hadadezer: { title: "Hadadezer", subtitle: "Filho de Reobe, rei de Zobá (2Sm 8:3)", text: "Rei arameu de Zobá, a maior potência da Síria no seu tempo, ferido por Davi \"quando ele ia recuperar o seu domínio sobre o rio Eufrates\" (8:3). Perdeu numa só campanha mil carros, setecentos cavaleiros e vinte mil homens de pé; e Davi jarretou todos os cavalos dos carros, reservando apenas cem (8:4) — Israel não quis a cavalaria das nações, obedecendo à lei do rei, que mandava que o rei \"não multiplicará para si cavalos\" (Dt 17:16). Os sírios de Damasco vieram socorrê-lo e caíram vinte e dois mil (8:5). Os escudos de ouro dos seus servos e o muito bronze de Betá e Berotai foram levados a Jerusalém e consagrados ao SENHOR (8:7-8,11). Ainda tentou refazer-se uma segunda vez, chamando os sírios do outro lado do rio sob o comando de Sobaque, e perdeu tudo em Helã (10:16-18). No fim, \"todos os reis, servos de Hadadezer, que foram feridos diante de Israel, fizeram paz com Israel, e o serviram\" (10:19) — e o bronze do inimigo virou material do culto do Deus vivo." },
  hirao: { title: "Hirão", subtitle: "Rei de Tiro, o que mandou os cedros (2Sm 5:11)", text: "Rei fenício da cidade portuária de Tiro, foi o primeiro soberano estrangeiro a reconhecer o reinado de Davi sobre todo o Israel: \"enviou mensageiros a Davi, e madeira de cedro, e carpinteiros, e pedreiros que edificaram a Davi uma casa\" (5:11). Foi diante desse palácio novo que o rei entendeu quem o tinha posto ali: \"entendeu Davi que o Senhor o confirmara rei sobre Israel, e que exaltara o seu reino por amor do seu povo\" (5:12). E foi o mesmo cedro que lhe pesou na consciência: \"Eis que eu moro em casa de cedro, e a arca de Deus mora dentro de cortinas\" (7:2) — dessa inquietação nasceu a promessa da casa eterna (7:11-16). A amizade sobreviveu ao pai: \"Hirão sempre tinha amado a Davi\", e mandaria a Salomão os cedros e ciprestes do Líbano para o templo (1Rs 5:1). Um rei pagão fornecendo a madeira da casa do SENHOR — sinal de que os despojos e as artes das nações acabam servindo aos propósitos do Deus de Israel." },
  uza: { title: "Uzá", subtitle: "Filho de Abinadabe, morto junto à arca (2Sm 6:6-8)", text: "Um dos filhos de Abinadabe, em cuja casa a arca ficara desde que voltara das mãos dos filisteus, e um dos dois que guiavam o carro novo (6:3). O carro era o erro: a lei mandava que os filhos de Coate levassem o santuário aos ombros, pelas varas, e que \"no santuário não tocarão para que não morram\" (Nm 4:15; 7:9) — Israel copiou o transporte dos filisteus e chamou aquilo de reverência. \"E, chegando à eira de Nacom, estendeu Uzá a mão à arca de Deus, e pegou nela; porque os bois a deixavam pender\" (6:6). O gesto parece piedoso e foi fatal: \"Então a ira do Senhor se acendeu contra Uzá, e Deus o feriu ali por esta imprudência; e morreu ali junto à arca de Deus\" (6:7). Davi contristou-se e teve medo — \"Como virá a mim a arca do Senhor?\" (6:9) — e deu ao lugar o nome de Perez-Uzá. Três meses depois refez tudo pela ordenança, com os levitas carregando aos ombros e sacrifícios a cada seis passos, confessando: \"não a levastes na primeira vez... porque não o buscamos segundo a ordenança\" (6:13; 1Cr 15:13-15). Uzá ficou como a lembrança dura de que boa intenção não substitui a palavra de Deus." },
  "obede-edom": { title: "Obede-Edom", subtitle: "O giteu em cuja casa a arca ficou três meses (2Sm 6:10-12)", text: "Depois da morte de Uzá, Davi não teve coragem de recolher a arca à cidade e a desviou para a casa deste homem, chamado \"o giteu\" — provavelmente de Gate-Rimom, cidade dada aos levitas (6:10). O que para o rei era risco, para ele foi bênção: \"ficou a arca do Senhor em casa de Obede-Edom, o giteu, três meses; e abençoou o Senhor a Obede-Edom, e a toda a sua casa\" (6:11). Foi a notícia daquela casa próspera que devolveu a coragem a Davi: \"Abençoou o Senhor a casa de Obede-Edom, e tudo quanto tem, por causa da arca de Deus; foi pois Davi, e trouxe a arca de Deus para cima... com alegria\" (6:12). A mesma arca que feriu Uzá abençoou Obede-Edom: não mudou a arca, mudou o modo de se chegar a ela. E ele não voltou à vida de antes — as Crônicas o registram entre os porteiros da arca em Jerusalém (1Cr 15:24) e pai de oito filhos, com a explicação em quatro palavras: \"porque Deus o tinha abençoado\" (1Cr 26:5). Hospedou a presença de Deus por um trimestre e passou o resto da vida servindo à porta dela." },
  "salomao-menino": { title: "Salomão (Jedidias)", subtitle: "O menino a quem o SENHOR mandou chamar Jedidias (2Sm 12:24-25)", text: "Nasceu do consolo, não do escândalo: morto o primeiro filho, \"consolou Davi a Bate-Seba, sua mulher, e entrou a ela... e ela deu à luz um filho, e deu-lhe o nome de Salomão\" (12:24) — nome que traz dentro o shalom, a paz que aquela casa tinha perdido. E então vem a frase mais curta e mais espantosa do capítulo: \"e o Senhor o amou\". Deus não deixou esse amor implícito: \"enviou pela mão do profeta Natã, dando-lhe o nome de Jedidias, por amor ao Senhor\" (12:25) — Jedidias quer dizer \"amado do SENHOR\", e foi o próprio mensageiro do juízo quem veio trazer o nome de afeto. Este é o filho que edificaria a casa que o pai não pôde edificar, aquele de quem Deus dissera: \"Eu lhe serei por pai, e ele me será por filho\" (7:13-14). Berço nenhum da Escritura recebeu uma palavra assim tão cedo. Sobre um menino nascido logo depois do pior pecado do reino, a graça pôs a sua palavra primeiro." },
  benaia: { title: "Benaia", subtitle: "Filho de Joiada, sobre os quereteus e peleteus (2Sm 8:18; 23:20-23)", text: "De Cabzeel, filho de um homem valoroso e ele mesmo \"grande em obras\": feriu dois fortes heróis de Moabe e \"desceu ele, e feriu um leão no meio duma cova, no tempo da neve\" (23:20) — a Escritura guarda até o detalhe do tempo, porque descer a um poço gelado atrás de um leão é o retrato inteiro do homem. Enfrentou também um egípcio de respeito armado de lança levando apenas um cajado, \"e arrancou a lança da mão do egípcio, e com ela o matou\" (23:21). Nos anais dos valentes ficou registrado que \"teve nome entre três poderosos\", embora não chegasse aos três primeiros, e Davi o pôs sobre a sua guarda pessoal, os quereteus e os peleteus (23:22-23; 8:18). Nunca aparece do lado errado: não vacilou na fuga de Absalão, não entrou na conspiração de Adonias, e foi um dos três que Davi chamou para descer a Giom e ungir Salomão (1Rs 1:32-38). Foi ele quem executou as sentenças que fecharam a conta do reinado — Joabe agarrado às pontas do altar, e depois Simei (1Rs 2:34,46) — e recebeu o comando do exército (1Rs 2:35). O homem do leão na cova acabou general." },
  paltiel: { title: "Paltiel", subtitle: "Filho de Laís, o marido de Mical (2Sm 3:15-16)", text: "Homem de Galim, recebeu Mical das mãos de Saul quando o rei tomou a filha de volta ao genro que caçava pelos montes (1Sm 25:44, onde é chamado Palti). Viveu com ela os anos todos do exílio de Davi, e nunca lhe é atribuída culpa nenhuma. Quando Abner negociou a passagem do norte, Davi pôs uma condição única: \"não verás a minha face, se primeiro não me trouxeres a Mical, filha de Saul\" (3:13); e assim se fez: \"E enviou Is-Bosete, e tirou-a de seu marido, a Paltiel, filho de Laís\" (3:15). O que a Escritura registra em seguida é uma das imagens mais tristes do livro: \"E ia com ela seu marido, caminhando, e chorando atrás dela, até Baurim\" (3:16). Não protestou nem lutou; andou atrás chorando até que Abner cortou a cena com quatro palavras — \"Vai-te, agora volta. E ele voltou\". Nunca mais é mencionado: é o preço humano de um acordo político, pago inteiro por quem não estava sentado à mesa." },
  "amalequita-de-gilboa": { title: "O amalequita de Gilboa", subtitle: "O que trouxe a Davi a coroa de Saul (2Sm 1:2-16)", text: "Chegou a Ziclague ao terceiro dia \"com as vestes rotas e com terra sobre a cabeça\", com todos os sinais certos do luto, e se lançou por terra diante de Davi (1:2). Contou que passara \"por acaso\" pela montanha de Gilboa, que achara Saul encostado sobre a lança e que o matara a pedido dele: \"e tomei a coroa que tinha na cabeça, e o bracelete que trazia no braço, e os trouxe aqui a meu senhor\" (1:10). O capítulo anterior desmente a história inteira: Saul caíra sobre a própria espada (1Sm 31:4) — ele inventou um serviço para cobrar um salário. Davi rasgou as vestes, jejuou até à tarde por Saul, por Jônatas e pelo povo do SENHOR, e só então lhe perguntou: \"Como não temeste tu estender a mão para matares ao ungido do Senhor?\" (1:14). Morreu pela sua própria boca: \"O teu sangue seja sobre a tua cabeça, porque a tua própria boca testificou contra ti, dizendo: Eu matei o ungido do Senhor\" (1:16). E era \"filho de um estrangeiro, amalequita\" (1:13) — do povo que Saul poupara contra a ordem expressa de Deus, e que agora vinha buscar recompensa pela cabeça dele." },
  "maquir-filho-de-amiel": { title: "Maquir", subtitle: "Filho de Amiel, de Lo-Debar (2Sm 9:4; 17:27)", text: "Homem de Lo-Debar, na Transjordânia, abrigou em casa o último herdeiro da casa de Saul quando ninguém mais o queria: foi dali que Davi mandou buscar Mefibosete, o filho de Jônatas \"aleijado de ambos os pés\" (9:3-5). Sustentar por anos o neto de um rei deposto não era caridade barata — era guardar em casa alguém que qualquer rei novo teria motivo de sobra para matar. Anos depois foi a vez do próprio Davi precisar de teto: fugindo de Absalão e chegando a Maanaim, recebeu de Sobi, de Maquir e de Barzilai camas, bacias, trigo, cevada, farinha, favas, lentilhas, mel, manteiga, ovelhas e queijos, \"porque disseram: Este povo no deserto está faminto, cansado e sedento\" (17:27-29). O mesmo homem hospedou o herdeiro caído e o rei fugitivo, sem mudar de lado conforme o vento virava. Não tem uma única fala registrada em toda a Escritura; tem uma casa aberta duas vezes, nas duas horas em que abri-la custava caro. É a hospitalidade que o Novo Testamento manda praticar \"uns para com os outros, sem murmurações\" (1Pe 4:9), retratada em Gileade." },
  talmai: { title: "Talmai", subtitle: "Rei de Gesur, avô materno de Absalão (2Sm 3:3; 13:37)", text: "Rei do pequeno reino arameu de Gesur, a nordeste do mar da Galileia, e pai de Maaca, uma das mulheres que Davi tomou em Hebrom (3:3) — casamento de aliança, como se fazia entre casas reais. Por isso Absalão, seu neto, tinha para onde correr: morto Amnom na tosquia, \"Absalão fugiu, e foi a Talmai, filho de Amiur, rei de Gesur\", e \"esteve ali três anos\" (13:37-38). Abrigar o assassino do príncipe herdeiro de Israel foi ao mesmo tempo dever de avô e ato de soberania de um rei estrangeiro. Foi de Gesur que Joabe o trouxe de volta a Jerusalém, depois da parábola da mulher de Tecoa (14:23); e foi um voto supostamente feito \"morando eu em Gesur, na Síria\" (15:8) que serviu de pretexto para a viagem a Hebrom onde a revolta começou. Uma corte estrangeira guardou por três anos o rancor que voltaria armado. A casa que Davi construiu com casamentos políticos foi a mesma que se levantou contra ele." },
  "jorao-filho-de-toi": { title: "Jorão", subtitle: "Filho de Toí, rei de Hamate; o embaixador dos vasos (2Sm 8:10)", text: "Filho do rei de Hamate, foi enviado pelo pai ao acampamento de Davi depois da derrota de Hadadezer, \"para lhe perguntar como estava, e para lhe dar os parabéns por haver pelejado contra Hadadezer, e por o haver ferido\" (8:10). Não veio de mãos vazias: \"na sua mão trazia vasos de prata, e vasos de ouro, e vasos de bronze\". Um príncipe herdeiro fazendo em pessoa o papel de mensageiro é a medida do respeito que a sua casa passou a ter por aquele reino novo. E o que trouxe não foi parar no tesouro do rei: \"Os quais também o rei Davi consagrou ao Senhor, juntamente com a prata e ouro que já havia consagrado de todas as nações que sujeitara\" (8:11). O metal saiu de Hamate e entrou na reserva com que o filho de Davi ergueria o templo (1Cr 18:11; 22:14). É o contraste exato dos embaixadores de Davi humilhados por Hanum dois capítulos adiante: aqui, uma embaixada bem recebida, e o presente de um pagão virando oferta ao Deus de Israel." },
  "tamar-filha-de-davi": { title: "Tamar", subtitle: "Filha de Davi, irmã de Absalão (2Sm 13)", text: "Princesa e virgem, trazia \"uma roupa de muitas cores (porque assim se vestiam as filhas virgens dos reis)\" (13:18) — a veste era o sinal público da sua condição, e por isso o que ela rasgaria depois dizia tudo. Foi mandada pelo próprio pai à casa do meio-irmão que se fingia doente; amassou e cozeu os bolos diante dos olhos dele e, quando a casa foi esvaziada, resistiu com a lucidez de quem conhece a lei e o próprio valor: \"Não, meu irmão, não me forces, porque não se faz assim em Israel; não faças tal loucura\" (13:12), e ainda lhe ofereceu a saída honesta — \"fales ao rei, porque não me negará a ti\" (13:13). \"Porém ele não quis dar ouvidos à sua voz; antes, sendo mais forte do que ela, a forçou\" (13:14); e logo depois a expulsou com mais ódio do que amor tivera, mandando trancar a porta atrás dela — ao que ela respondeu que aquilo era \"maior... mal do que o outro que já me tens feito\" (13:16). Então fez o luto que se faz por um morto, o dela: \"Tamar tomou cinza sobre a sua cabeça, e a roupa de muitas cores que trazia rasgou; e pôs as mãos sobre a cabeça, e foi andando e clamando\" (13:19). O irmão a mandou calar — \"cala-te; é teu irmão. Não se angustie o teu coração por isto\" —, o pai apenas \"muito se lhe acendeu a ira\" e não fez nada (13:20-21), e ela sai do relato numa única frase: \"Assim ficou Tamar, e esteve solitária em casa de Absalão seu irmão\". A Escritura não a culpa de coisa alguma e não a esquece: guarda o grito dela pelas ruas, credita a Amnom o crime e a Absalão o silêncio, e registra que foi o nome dela que Absalão deu à sua própria filha (14:27)." },
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
  // ---- objetos novos: as armas, a realeza e a casa (1-2 Samuel em diante) ----
  sword: {
    title: "A espada",
    subtitle: "A arma de mão do mundo antigo",
    text: "Curta e de dois gumes, era arma de corpo a corpo, não de arremesso — por isso \"passar a fio de espada\" é a expressão bíblica para a destruição completa. Israel viveu longos períodos sem poder forjá-la: \"em toda a terra de Israel não se achava ferreiro\", e os filisteus cobravam para amolar até a relha do arado (1Sm 13:19-21). Davi enfrentou Golias sem nenhuma — \"não é do Senhor salvar com espada, nem com lança\" (1Sm 17:47) — e o matou com a espada do próprio gigante. A Escritura conhece a ferida que ela abre nos dois lados: \"a espada devora tanto um como outro\" (2Sm 11:25). E acaba transformando-a: \"converterão as suas espadas em enxadões\" (Is 2:4), enquanto a única espada que resta ao cristão é a Palavra (Ef 6:17; Hb 4:12).",
  },
  spear: {
    title: "A lança",
    subtitle: "A haste de guerra, e o cetro improvisado de Saul",
    text: "Haste longa de madeira com ponta de ferro, usada de perto ou arremessada. Em 1 e 2 Samuel ela é quase um personagem: Saul a tem sempre na mão e a atira contra Davi encostado à parede (1Sm 18:11; 19:10) e depois contra o próprio filho Jônatas à mesa (1Sm 20:33); fincada à cabeceira, é o que Davi leva do arraial adormecido em vez da vida do rei (1Sm 26:7-12). Foi o conto da lança de Abner que atravessou Asael na fuga (2Sm 2:23). Na mão de Saul a lança virou cetro — e o cetro, ameaça. Golias trazia uma cuja haste era \"como o órgão de um tecelão\" (1Sm 17:7).",
  },
  bow: {
    title: "O arco e a aljava",
    subtitle: "A arma de longe, e o cântico que leva o seu nome",
    text: "O arco alcançava o inimigo antes que ele chegasse, e por isso decidia batalhas: foram os frecheiros que alcançaram Saul em Gilboa e o feriram gravemente (1Sm 31:3). Jônatas era arqueiro, e foi com três flechas atiradas \"como se ao alvo\" que ele mandou a Davi o aviso combinado sem dizer uma palavra (1Sm 20:20-38). Quando os dois morreram, Davi compôs a elegia que a Escritura chama justamente de CÂNTICO DO ARCO, mandando que se ensinasse aos filhos de Judá (2Sm 1:18): \"o arco de Jônatas não voltava atrás\" (2Sm 1:22). Nos Salmos o arco é a imagem do poder que Deus quebra — \"quebra o arco e corta a lança\" (Sl 46:9).",
  },
  crown: {
    title: "A coroa",
    subtitle: "O sinal do reinado — e o peso que vem com ele",
    text: "Em Israel a coroa (nezer) era posta na cabeça do rei junto com a unção e o testemunho da lei (2Rs 11:12), lembrando que o trono estava debaixo de uma norma e não acima dela. A primeira coroa da história de Davi lhe chega das mãos de um amalequita, tirada do cadáver de Saul em Gilboa (2Sm 1:10) — e ele a recebe rasgando as vestes, não festejando. A segunda vem de Rabá: \"de um talento de ouro e pedras preciosas, e foi posta sobre a cabeça de Davi\" (2Sm 12:30), um peso de mais de trinta quilos que só se podia sustentar por instantes. As duas dizem a mesma coisa: a coroa é pesada, e não pertence a quem a usa. No fim, os anciãos lançam as suas diante do trono (Ap 4:10).",
  },
  harp: {
    title: "A harpa",
    subtitle: "O kinnor de Davi, a lira de dez cordas",
    text: "O kinnor era uma lira de madeira com oito a dez cordas, tocada com os dedos ou com plectro — instrumento de festa e de culto, e o primeiro que a Bíblia nomeia (Gn 4:21). Foi por ela que Davi entrou na história: \"sei de um filho de Jessé, que sabe tocar\", e quando o espírito mau assaltava Saul, \"Davi tomava a harpa, e a tocava com a sua mão; então Saul sentia alívio\" (1Sm 16:16-23). A mesma harpa subiu com a arca a Jerusalém, quando Davi e todo o Israel \"tocavam perante o Senhor com toda a sorte de instrumentos de pau de faia\" (2Sm 6:5). É o som dos Salmos: \"louvai ao Senhor com harpa\" (Sl 33:2) — e o instrumento que os cativos penduraram nos salgueiros quando não conseguiam mais cantar (Sl 137:2).",
  },
  bed: {
    title: "O leito",
    subtitle: "O divã baixo da casa oriental",
    text: "Não a cama alta de hoje, mas um estrado baixo com colchão e coberta, encostado à parede, que de dia servia de assento. Na história de Davi o leito é sempre o lugar onde alguma coisa se decide às escondidas: Mical desceu o marido pela janela e pôs no dele uma estátua com pele de cabra à cabeceira (1Sm 19:13); Isbosete foi morto no seu, ao meio-dia, enquanto repousava (2Sm 4:5-7); Amnom fingiu-se doente no seu para atrair a irmã (2Sm 13:5); e foi levantando-se do seu, à tarde, que Davi viu do terraço a mulher que se lavava (2Sm 11:2). Os Salmos o conhecem como o lugar das lágrimas e do exame de consciência: \"consultai no vosso coração sobre a vossa cama, e calai-vos\" (Sl 4:4).",
  },
  pool: {
    title: "O tanque",
    subtitle: "O reservatório de pedra da cidade antiga",
    text: "Escavado na rocha e revestido de pedra, o tanque guardava a água da chuva e das fontes — a diferença entre resistir a um cerco e render-se. Junto ao tanque de Gibeão sentaram-se os homens de Abner de um lado e os de Joabe do outro, e dali saíram os doze de cada lado que se pegaram pela cabeça e caíram juntos (2Sm 2:12-16). Sobre o tanque de Hebrom Davi mandou pendurar os assassinos de Isbosete (2Sm 4:12). Eram lugares públicos e visíveis, e é isso que os torna cenário de acordos e de castigos exemplares. Ezequias abriria depois o mais famoso deles, trazendo água para dentro de Jerusalém (2Rs 20:20).",
  },
  chariot: {
    title: "O carro de guerra",
    subtitle: "A tecnologia que Israel não tinha",
    text: "Carro leve de duas rodas puxado por cavalos, era o tanque de guerra da Idade do Ferro — e foi exatamente o que travou a conquista: \"não expulsou os moradores do vale, porquanto tinham carros de ferro\" (Jz 1:19). Israel foi avisado de que o rei que pedira tomaria os seus filhos \"para os seus carros\" (1Sm 8:11), e Absalão começou a sua rebelião comprando um: \"preparou para si carros e cavalos, e cinquenta homens que corressem adiante dele\" (2Sm 15:1). A Escritura mede a fé de um povo pelo que ele faz diante dos carros alheios: \"uns confiam em carros e outros em cavalos, mas nós faremos menção do nome do Senhor\" (Sl 20:7).",
  },
  horse: {
    title: "O cavalo",
    subtitle: "Força de guerra, nunca montaria de paz",
    text: "No antigo Oriente o cavalo era animal de guerra, não de viagem: quem andava a cavalo estava indo pelejar. Por isso a lei proibia ao rei de Israel multiplicá-los (Dt 17:16) e Josué mandou jarretar os dos inimigos (Js 11:6) — para que o povo não passasse a confiar neles em vez de em Deus. \"O cavalo é vão para a segurança\" (Sl 33:17). O contraste é deliberado: os reis das nações entram nas cidades a cavalo, e o Rei prometido entra \"humilde, e montado sobre um jumento\" (Zc 9:9; Mt 21:5) — deixando o cavalo branco para o dia em que vier julgar (Ap 19:11).",
  },
  donkey: {
    title: "O jumento",
    subtitle: "A montaria da paz, do trabalho e dos reis de Israel",
    text: "Animal de carga e de estrada, sinal de vida sedentária e pacífica, e — ao contrário do cavalo — a montaria própria dos juízes e dos reis de Israel (Jz 10:4; 12:14). Foi atrás de jumentas perdidas que Saul saiu de casa e encontrou o profeta que o ungiria (1Sm 9:3). Abigail desceu num deles com duzentos pães para deter a espada de Davi (1Sm 25:18-20), e a fuga de Davi diante de Absalão foi socorrida por uma junta de jumentos albardados (2Sm 16:1-2). Absalão ia numa mula quando a cabeça se lhe prendeu no carvalho e a montaria seguiu adiante sem ele (2Sm 18:9). É neste animal, e não no cavalo, que o Messias entra em Jerusalém (Zc 9:9).",
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
  "mesa-azimos": {
    title: "A mesa dos pães asmos",
    subtitle: "Êx 13:6-7 — sete dias sem fermento",
    text: "\"Sete dias comerás pães ázimos, e ao sétimo dia haverá festa ao Senhor\" (Êx 13:6). O pão sem levedura nasceu da pressa da saída, quando o povo tomou a massa antes de levedar (Êx 12:34,39), e virou estatuto perpétuo: por uma semana inteira, nenhuma casa de Israel guarda fermento em todos os seus termos (Êx 13:7). A mesa mais simples do ano prega a redenção — e Paulo a lê como figura da vida limpa do povo remido: \"celebremos a festa... com os ázimos da sinceridade e da verdade\" (1Co 5:7-8)." },
  "curral-primogenitos": {
    title: "O curral dos primogênitos",
    subtitle: "Êx 13:12-13 — tudo o que abre a madre é do Senhor",
    text: "É o cercado de onde saem as crias que a lei reserva a Deus: \"separarás para o Senhor tudo o que abrir a madre e todo o primogênito dos animais que tiveres; os machos serão do Senhor\" (Êx 13:12). O jumento, imundo e inaceitável no altar, é remido por um cordeiro que morre em seu lugar; e assim também \"todo o primogênito do homem, entre teus filhos, resgatarás\" (Êx 13:13). O curral guarda a memória da noite do Egito, quando os primogênitos de Israel foram poupados pelo sangue (Êx 13:15)." },
  "lei-na-boca": {
    title: "O sinal na mão e entre os olhos",
    subtitle: "Êx 13:9,16 — \"para que a lei do Senhor esteja em tua boca\"",
    text: "\"E te será por sinal sobre tua mão e por lembrança entre teus olhos, para que a lei do Senhor esteja em tua boca; porquanto com mão forte o Senhor te tirou do Egito\" (Êx 13:9). A ordem é repetida no fecho do capítulo, agora com \"frontais entre os teus olhos\" (Êx 13:16), e deu origem aos filactérios que Israel ata ao braço e à testa. O sentido é mais fundo que a tira de couro: o que a mão faz e o que os olhos miram devem ficar marcados pela redenção, e a boca há de contá-la aos filhos (Dt 6:6-9)." },
  "porta-patio": {
    title: "A porta do pátio",
    subtitle: "Êx 27:16 • 38:18 — a única entrada",
    text: "\"E à porta do pátio haverá uma cortina de vinte côvados, de azul, e púrpura, e carmesim, e de linho fino torcido, de obra de bordador; as suas colunas quatro, e as suas bases quatro\" (Êx 27:16). Todo o pátio era cercado de cortinas brancas de linho, sem brecha alguma: havia UMA só abertura, ao oriente, bordada em cores. Quem quisesse trazer sacrifício tinha de passar por ali, e não por onde lhe parecesse — pregação silenciosa de que a Deus se chega pelo caminho que Ele mesmo abriu (Jo 10:9; Jo 14:6)." },
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
  "paes-primicias": {
    title: "Os dois pães de movimento",
    subtitle: "Lv 23:16-17,20 — as primícias de Pentecoste",
    text: "Cinquenta dias depois do molho movido, Israel trazia \"das vossas habitações dois pães de movimento; de duas dízimas de farinha serão, levedados se cozerão; primícias são ao Senhor\" (Lv 23:17). São a única oferta LEVEDADA movida perante o Senhor: não é mais o primeiro feixe cru, é o pão pronto da vida comum, vindo de casa. O sacerdote os movia com os cordeiros, \"santos serão ao Senhor\" (Lv 23:20) — e foi nesse mesmo Pentecoste que o Espírito desceu e as primícias do novo povo foram apresentadas a Deus (At 2:1,41; Tg 1:18).",
  },
  "tenda-familia": {
    title: "A tenda da família",
    subtitle: "Lv 18 — a casa que a santidade protege",
    text: "É a tenda de uma família de Israel: a mãe e o pai, os filhos e as filhas, o avô e a nora debaixo da mesma lona. É ela que está no centro das leis de Levítico 18 — cada \"não descobrirás\" é uma estaca cravada ao redor desta casa, contra o que o Egito e Canaã faziam dentro das suas (Lv 18:3,24-25). A família não é apenas protegida pela lei: é o lugar onde a santidade de Deus se torna visível de geração em geração, selada pelo \"Eu sou o Senhor vosso Deus\" (Lv 18:30).",
  },
  "coisas-santas": {
    title: "As coisas santas — o pão dos sacerdotes",
    subtitle: "Lv 22:2-16 — a porção que vem do altar",
    text: "São as porções santas das ofertas dos filhos de Israel, reservadas por Deus a Arão e a seus filhos: \"este é o seu pão\" (Lv 22:7). Mesa aberta e cercada ao mesmo tempo: o sacerdote imundo se aparta dela até o pôr-do-sol, o estranho e o diarista não comem, mas o nascido na casa e a filha viúva que volta ao pai têm lugar (Lv 22:4-13). Quem come por erro restitui com a quinta parte (Lv 22:14). Comer à mesa de Deus é privilégio de pertença — \"Eu sou o Senhor que os santifico\" (Lv 22:9,16).",
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
  "rol-do-censo": {
    title: "O rol do segundo censo",
    subtitle: "Nm 26 — contados para herdar",
    text: "O registro em que Moisés e Eleazar somam a nova geração nas campinas de Moabe, família por família: 601.730 homens de guerra (Nm 26:51). Não é burocracia — é a lista dos herdeiros: \"a estes se repartirá a terra em herança, segundo o número dos nomes\" (Nm 26:53). Dos contados no Sinai, quarenta anos antes, só Josué e Calebe permanecem (Nm 26:64-65).",
  },
  "rol-dos-levitas": {
    title: "O rol dos levitas",
    subtitle: "Nm 3; 26 — contados à parte, de um mês para cima",
    text: "Os levitas não entram no censo dos homens de guerra: são contados à parte, \"de um mês para cima\" (Nm 3:15; 26:62), porque a sua herança não é a terra, mas o serviço da tenda — \"eu sou a tua porção\" (Nm 18:20). Um rol sem espada e sem alqueire: 23 mil nomes que pertencem ao altar.",
  },
  "aguas-amargas": {
    title: "As águas amargas",
    subtitle: "Nm 5:17-24 — água santa, pó do tabernáculo e maldição",
    text: "Água santa num vaso de barro, misturada com o pó do chão do tabernáculo (Nm 5:17): a bebida da prova dos ciúmes, que nada faz à inocente e traz maldição sobre a culpada (Nm 5:27-28). Nenhum veneno age ali — só o juízo de Deus, a quem a suspeita é entregue. O que o ciúme humano resolveria com violência, a lei põe num copo diante do SENHOR.",
  },
  "rol-das-maldicoes": {
    title: "O rol das maldições apagadas",
    subtitle: "Nm 5:23 — escritas num livro e lavadas na água",
    text: "O sacerdote \"escreverá estas mesmas maldições num livro, e com a água amarga as apagará\" (Nm 5:23): a sentença escrita é dissolvida na própria água da prova, para que a mulher beba o juízo de Deus, e não a palavra de um acusador. É figura estranha e cheia de evangelho: há Alguém que apaga \"a cédula que era contra nós\" (Cl 2:14).",
  },
  "cesto-do-nazireu": {
    title: "O cesto de ázimos do nazireu",
    subtitle: "Nm 6:15-19 — os pães do fim do voto",
    text: "O cesto de bolos ázimos amassados com azeite e coscorões untados, trazido à porta da tenda no dia em que o nazireado se cumpre (Nm 6:15). Dele o sacerdote toma um bolo e um coscorão e os põe nas mãos do nazireu já rapado, movendo tudo perante o SENHOR (Nm 6:19-20). O voto não termina em festa própria, mas em oferta: até a alegria do cumprimento é devolvida a Deus.",
  },
  "soma-da-presa": {
    title: "A soma da presa de Midiã",
    subtitle: "Nm 31:25-47 — o despojo passado em conta diante de Deus",
    text: "Moisés, Eleazar e os cabeças somam tudo o que foi tomado — gente e gado — e o dividem ao meio: aos que pelejaram e à congregação, com o tributo do Senhor separado de cada metade (Nm 31:27-30). No fim, os capitães ainda trazem ouro de oferta \"para fazer expiação\" (Nm 31:50). A contagem é liturgia: a vitória pertence a Deus, e as primícias dela também.",
  },
  "mar-salgado": {
    title: "O mar Salgado",
    subtitle: "Nm 34:3,12 — o marco do sul e do oriente",
    text: "O mar Morto, fronteira dupla da herança: dele parte o limite sul, pelo deserto de Zim, e nele termina o limite oriental que desce pelo Jordão (Nm 34:3,12). Suas águas pesadas, onde nada vive, guardam também a memória de Sodoma (Gn 19:24-26) — na moldura da terra prometida, um lembrete permanente do juízo e da graça.",
  },
  "mar-de-quinerete": {
    title: "O mar de Quinerete",
    subtitle: "Nm 34:11 — o lago da fronteira oriental",
    text: "Pelo lado do oriente, o termo desce \"até à borda do mar de Quinerete\" (Nm 34:11) — o lago que os evangelhos chamarão mar da Galileia. Séculos antes de barcas e redes, ele já está no mapa de Deus: nas margens desta fronteira Jesus chamaria pescadores e ensinaria as multidões (Mt 4:18).",
  },
  "entrada-hamate": {
    title: "A entrada de Hamate",
    subtitle: "Nm 34:7-8 — o marco do extremo norte",
    text: "Do mar Grande ao monte Hor, e do monte \"até à entrada de Hamate\" (Nm 34:8): é o portão setentrional da herança, a garganta entre os montes que leva à Síria. O marco voltará como medida da promessa cumprida nos dias de Salomão, quando Israel se estendeu \"desde a entrada de Hamate até ao rio do Egito\" (1Rs 8:65).",
  },
  // ---- 1 SAMUEL 1–9: Siló, a arca peregrina e o pedido de um rei ----
  "cadeira-de-eli": {
    title: "A cadeira de Eli",
    subtitle: "1Sm 1:9; 4:13,18 — o assento junto ao umbral do templo",
    text: "\"Eli, o sacerdote, estava assentado numa cadeira, junto a um poste do templo do Senhor\" (1Sm 1:9). Dali ele vigiava a porta da casa de Deus: foi dali que viu os lábios de Ana se moverem sem voz e a julgou bêbada, e foi dali que a despediu em paz. Anos depois, cego e de noventa e oito anos, estaria \"assentado numa cadeira, ao pé do caminho, olhando, porque o seu coração estava tremendo pela arca de Deus\" (1Sm 4:13). Ao ouvir que a arca fora tomada, \"caiu da cadeira para trás, da banda da porta, e quebrou-se-lhe o pescoço\" (1Sm 4:18). O mesmo assento que o mostra guardando a casa acaba mostrando que ele já não conseguia sustentá-la.",
  },
  "caldeira-de-silo": {
    title: "A caldeira do garfo de três dentes",
    subtitle: "1Sm 2:13-16 — o costume dos sacerdotes com o povo",
    text: "A lei dava ao sacerdote uma porção definida do sacrifício (Lv 7:31-34), mas em Siló havia outro \"costume\": o moço vinha com um garfo de três dentes, enfiava-o \"na caldeira, ou na panela, ou no tacho, ou na marmita\" e tomava tudo o que subisse (1Sm 2:13-14). Pior ainda, exigiam a carne CRUA antes de queimada a gordura que pertencia a Deus, e ameaçavam tomá-la à força (1Sm 2:15-16). O utensílio comum da cozinha do santuário virou o instrumento de um roubo religioso: \"era muito grande o pecado destes jovens perante o Senhor, porquanto os homens desprezavam a oferta do Senhor\" (1Sm 2:17).",
  },
  "efa-de-farinha": {
    title: "O efa de farinha do voto",
    subtitle: "1Sm 1:24 — a oferta com que Ana entregou o filho",
    text: "Ao desmamar Samuel, Ana subiu com ele a Siló levando \"três bezerros, e um efa de farinha, e um odre de vinho\" (1Sm 1:24). O efa (cerca de 22 litros) era uma medida generosa — a oferta de manjares que acompanhava o holocausto (Nm 15:8-10) — e ela a trouxe inteira num único ato: pagou o voto sem descontar nada. Não veio pedir; veio devolver. \"Por este menino orava eu; e o Senhor me concedeu a minha petição... também eu o entreguei ao Senhor\" (1Sm 1:27-28).",
  },
  "odre-de-vinho": {
    title: "O odre de vinho de Ana",
    subtitle: "1Sm 1:24 — a libação que acompanhou a entrega de Samuel",
    text: "Parte da mesma oferta com que Ana pagou o voto em Siló (1Sm 1:24). O vinho era a libação derramada sobre o sacrifício (Nm 15:5,10) — a porção que se perde por completo, que ninguém come nem guarda. É o símbolo exato do que aquela mãe estava fazendo: derramar diante de Deus o filho que Ele lhe dera, sem reter nada para si. Curioso e comovente: a mulher que Eli acusara de estar cheia de vinho (1Sm 1:14) volta ao mesmo lugar trazendo vinho para o SENHOR.",
  },
  "rocha-do-cantico-de-ana": {
    title: "\"Rocha nenhuma há como o nosso Deus\"",
    subtitle: "1Sm 2:2 — a imagem central do cântico de Ana",
    text: "\"Não há santo como é o Senhor; porque não há outro fora de ti; e rocha nenhuma há como o nosso Deus\" (1Sm 2:2). Chamar Deus de ROCHA é linguagem do cântico de Moisés — \"Ele é a Rocha, cuja obra é perfeita\" (Dt 32:4,31) — e atravessa os Salmos como o nome da segurança que não cede. Na boca de uma mulher que passara anos sendo provocada por ser estéril, a palavra tem peso: o que não se moveu debaixo dela não foi a sorte, foi Deus. Davi, seu descendente espiritual nesta história, cantaria o mesmo: \"o Senhor é o meu rochedo, e o meu lugar forte\" (Sl 18:2).",
  },
  "trono-de-gloria": {
    title: "O trono de glória do cântico",
    subtitle: "1Sm 2:8,10 — o pobre assentado entre príncipes",
    text: "\"Levanta o pobre do pó, e desde o monturo exalta o necessitado, para o fazer assentar entre os príncipes, para o fazer herdar o trono de glória\" (1Sm 2:8). É a reviravolta que dá nome ao cântico inteiro, e é profecia: dez versículos antes de Israel ter rei, Ana termina falando de um — \"dará força ao seu rei, e exaltará o poder do seu ungido\" (1Sm 2:10), a primeira vez que a palavra UNGIDO (mashiach) aparece assim na história de Israel. A estéril que canta no adro de Siló está descrevendo, sem saber, o pastor de Belém que virá — e Maria a citaria quase palavra por palavra: \"depôs dos tronos os poderosos, e elevou os humildes\" (Lc 1:52).",
  },
  "capinha-de-samuel": {
    title: "A capinha que a mãe lhe fazia",
    subtitle: "1Sm 2:19 — o presente anual de Ana ao filho entregue",
    text: "\"E sua mãe lhe fazia uma túnica pequena, e de ano em ano lha trazia, quando com seu marido subia a sacrificar o sacrifício anual\" (1Sm 2:19). É o detalhe mais humano do livro: a mulher que cumpriu o voto até o fim não deixou de ser mãe: media o filho de longe, uma vez por ano, no tamanho da roupa nova. A veste é a mesma palavra (meʽil) do manto de profeta que Samuel usaria adulto — aquele cuja aba Saul rasgaria em Gilgal (1Sm 15:27) e pelo qual a mulher de En-Dor o reconheceria (1Sm 28:14). O profeta que julgaria Israel andou a vida inteira vestido do que a mãe começou a costurar.",
  },
  "porta-da-tenda-da-congregacao": {
    title: "A porta da tenda da congregação",
    subtitle: "1Sm 2:22 — onde os filhos de Eli pecavam",
    text: "Era o lugar de serviço das mulheres que se ajuntavam para servir à entrada do santuário (Êx 38:8) — e foi exatamente ali que Hofni e Fineias se deitaram com elas (1Sm 2:22). O pecado não foi cometido às escondidas, mas na soleira da casa de Deus, diante de todo o Israel que subia a adorar. Por isso a repreensão de Eli é tão insuficiente quanto verdadeira: \"não, filhos meus, porque não é boa fama esta que ouço; fazeis transgredir o povo do Senhor\" (1Sm 2:24). Corromper o santuário é corromper o povo inteiro que depende dele.",
  },
  "lampada-de-deus": {
    title: "A lâmpada de Deus",
    subtitle: "1Sm 3:3 — \"antes que se apagasse\"",
    text: "\"E, antes que a lâmpada de Deus se apagasse, estando Samuel também deitado no templo do Senhor, onde estava a arca de Deus\" (1Sm 3:3). O candelabro de ouro devia arder \"desde a tarde até pela manhã, perante o Senhor, continuamente\" (Êx 27:20-21; Lv 24:2-4), e a observação do narrador marca a hora exata: a madrugada, quando o azeite está no fim. Mas é também um retrato do tempo — \"a palavra do Senhor era de muita valia naqueles dias; não havia visão manifesta\" (1Sm 3:1). A luz de Israel estava quase se apagando quando Deus chamou um menino pelo nome.",
  },
  "arca-do-concerto": {
    title: "A arca do concerto do SENHOR dos Exércitos",
    subtitle: "1Sm 4–6 — o trono visível de Deus, tomado e devolvido",
    text: "Caixa de madeira de acácia coberta de ouro, com os querubins sobre o propiciatório, guardando as tábuas da lei (Êx 25:10-22): o lugar de onde Deus falava, \"o Senhor dos Exércitos, que habita entre os querubins\" (1Sm 4:4). Em 1 Samuel ela é o personagem silencioso do drama. Israel a arrasta a Afeque como amuleto de guerra e a perde (1Sm 4:11); os filisteus a levam a Asdode e o seu ídolo amanhece decepado no limiar (1Sm 5:3-4); ela atravessa Gate e Ecrom deixando pânico atrás de si, até que o próprio inimigo a devolve num carro novo com oferta pela culpa (1Sm 6). Deus não precisou de exército para se defender. A lição é dupla: ninguém captura o SENHOR, e ninguém o manipula — nem os filisteus com seu templo, nem Israel com sua superstição.",
  },
  "templo-de-silo": {
    title: "O templo do SENHOR em Siló",
    subtitle: "1Sm 1–4 — a casa da arca antes de Jerusalém",
    text: "Siló, no coração de Efraim, foi onde Josué armou a tenda da congregação e repartiu a terra por sortes (Js 18:1,10), e ali a arca ficou por gerações — o centro de culto de Israel durante todo o tempo dos juízes. É o lugar da oração de Ana, da infância de Samuel e do sacerdócio corrompido de Hofni e Fineias. Depois de 1Sm 4 ela desaparece da história: escavações mostram uma destruição violenta na mesma época, e Jeremias usaria a sua ruína como advertência a quem confiava no templo de Jerusalém — \"ide agora ao meu lugar, que estava em Siló, onde, ao princípio, fiz habitar o meu nome, e vede o que lhe fiz\" (Jr 7:12-14).",
  },
  "eben-ezer": {
    title: "Eben-Ezer, a pedra da ajuda",
    subtitle: "1Sm 4:1; 7:12 — o mesmo nome em duas histórias opostas",
    text: "\"Então tomou Samuel uma pedra, e a pôs entre Mizpá e Sem, e chamou o seu nome Eben-Ezer, e disse: Até aqui nos ajudou o Senhor\" (1Sm 7:12). O nome significa PEDRA DE AJUDA, e a Escritura o usa com ironia deliberada: em 1Sm 4:1 Israel já acampara \"junto a Eben-Ezer\" — e ali perdeu trinta mil homens e a arca, porque tratou Deus como talismã. Três capítulos depois, no mesmo território, com o povo em jejum, água derramada e confissão, o SENHOR troveja e os filisteus são desbaratados. A pedra não marca uma vitória militar: marca a diferença entre usar a Deus e voltar-se para Ele.",
  },
  "estante-de-eli": {
    title: "O assento de Eli à beira do caminho",
    subtitle: "1Sm 4:13,18 — o velho sacerdote esperando notícias da arca",
    text: "\"Eli estava assentado numa cadeira, ao pé do caminho, olhando, porque o seu coração estava tremendo pela arca de Deus\" (1Sm 4:13). Estava cego e não podia ver a estrada, mas ficou virado para ela — a última imagem de um homem que amava a casa de Deus mais do que soube governá-la. O mensageiro trouxe quatro notícias em ordem crescente: Israel fugiu, houve grande matança, teus dois filhos morreram, e a arca foi tomada. Só a última o derrubou: \"e sucedeu que, fazendo ele menção da arca de Deus, Eli caiu da cadeira para trás\" (1Sm 4:18).",
  },
  "dagom-caido": {
    title: "Dagom caído sobre o limiar",
    subtitle: "1Sm 5:2-5 — o deus de Asdode diante da arca",
    text: "Dagom era a principal divindade dos filisteus, ligada ao grão e à fertilidade, com templos em Asdode e Gaza (cf. Jz 16:23). Os vencedores puseram a arca ao seu lado como troféu — e o troféu virou julgamento: no primeiro amanhecer o ídolo estava \"caído com o rosto em terra diante da arca do Senhor\"; no segundo, além de caído, \"a cabeça de Dagom e ambas as palmas das suas mãos estavam cortadas sobre o limiar; só o tronco lhe ficou\" (1Sm 5:3-4). Cabeça e mãos: a sabedoria e a força do deus, decepadas na soleira da própria casa. Desde então os sacerdotes não pisavam mais aquele limiar (1Sm 5:5) — guardaram o rito e perderam a lição.",
  },
  "astarotes-e-baalins": {
    title: "Os baalins e os astarotes",
    subtitle: "1Sm 7:3-4 — os deuses estranhos que Israel tirou do meio de si",
    text: "Baal era o senhor da tempestade e da chuva, e Astarote a deusa da fertilidade e da guerra: o casal divino de Canaã, cujo culto prometia colheita e filhos em troca de ritos que a lei abominava. Toda a época dos juízes foi um vaivém entre eles e o SENHOR (Jz 2:11-13). A palavra de Samuel em Mizpá é a condição do livramento: \"se com todo o vosso coração vos converterdes ao Senhor, tirai dentre vós os deuses estranhos e os astarotes, e preparai o vosso coração ao Senhor, e servi a ele só\" (1Sm 7:3). Não bastava acrescentar o SENHOR à prateleira: era preciso esvaziá-la.",
  },
  "agua-derramada-em-mizpa": {
    title: "A água derramada perante o SENHOR",
    subtitle: "1Sm 7:6 — o rito do arrependimento em Mizpá",
    text: "\"E congregaram-se em Mizpá, e tiraram água, e a derramaram perante o Senhor, e jejuaram aquele dia, e disseram ali: Pecamos contra o Senhor\" (1Sm 7:6). O gesto não aparece na lei: é um sinal espontâneo e eloquente. A água derramada no chão não se recolhe mais — como a alma que se entrega sem reservas (\"derramo a minha alma perante o Senhor\", disse Ana em 1Sm 1:15) e como a vida que se reconhece perdida sem Deus (\"somos como águas derramadas na terra, que não se ajuntam mais\", 2Sm 14:14). Foi neste dia, e não na força das armas, que a guerra dos filisteus se decidiu.",
  },
  "cordeiro-de-mama": {
    title: "O cordeiro de mama de Mizpá",
    subtitle: "1Sm 7:9-10 — o holocausto inteiro enquanto o inimigo chegava",
    text: "\"E tomou Samuel um cordeiro de mama, e sacrificou-o inteiro em holocausto ao Senhor; e clamou Samuel ao Senhor por Israel, e o Senhor lhe deu ouvidos\" (1Sm 7:9). Um cordeiro ainda de leite, oferecido INTEIRO — nada reservado para o sacerdote, tudo queimado. E foi oferecido no pior momento possível: \"enquanto Samuel sacrificava o holocausto, os filisteus chegaram à peleja\" (1Sm 7:10). Israel não interrompeu o culto para pegar em armas; e foi durante a oferta que o SENHOR trovejou com grande trovão sobre os filisteus e os desbaratou. A vitória veio de um altar, não de uma tática.",
  },
  "altar-de-rama": {
    title: "O altar de Samuel em Ramá",
    subtitle: "1Sm 7:17 — o juiz que edificou um altar na sua própria cidade",
    text: "\"Porém voltava a Ramá, porque estava ali a sua casa, e ali julgava a Israel, e edificou ali um altar ao Senhor\" (1Sm 7:17). Samuel julgava em circuito — Betel, Gilgal, Mizpá — mas o altar ficava em casa. É o retrato de uma liderança inteira: o homem que cobrava do povo o culto exclusivo ao SENHOR começou por levantar o altar onde ele mesmo morava. Ramá, a cidade natal (a mesma Ramataim-Zofim de 1Sm 1:1), seria também o lugar do seu túmulo, onde todo o Israel viria prantear (1Sm 25:1).",
  },
  "casa-de-abinadabe": {
    title: "A casa de Abinadabe no outeiro",
    subtitle: "1Sm 7:1-2 — os vinte anos da arca em Quiriate-Jearim",
    text: "Devolvida pelos filisteus, a arca não voltou a Siló: os homens de Quiriate-Jearim a levaram \"à casa de Abinadabe, no outeiro, e consagraram a Eleazar, seu filho, para que guardasse a arca do Senhor\" (1Sm 7:1). Ali ficou vinte anos, \"e toda a casa de Israel suspirava pelo Senhor\" (1Sm 7:2) — um santuário improvisado numa casa particular, sinal de que o culto nacional estava em ruínas. Só no reinado de Davi ela sairia dali, e a primeira tentativa terminaria na morte de Uzá (2Sm 6:3-7): a arca guardada com reverência por vinte anos ensinou o que a arca carregada com pressa esqueceu.",
  },
  "carro-novo-dos-filisteus": {
    title: "O carro novo das duas vacas",
    subtitle: "1Sm 6:7-12 — o teste que os próprios filisteus inventaram",
    text: "Os adivinhos propuseram uma experiência honesta: um carro NOVO, nunca usado, puxado por duas vacas de leite \"sobre as quais não tenha vindo o jugo\", com os bezerros encerrados em casa (1Sm 6:7). Se as vacas subissem por Bete-Semes, contra todo o instinto materno e sem nunca terem sido guiadas, então a praga viera do Deus de Israel; se não, fora acaso. E elas foram \"caminho direito... andando e berrando, e não se desviaram nem para a direita nem para a esquerda\" (1Sm 6:12), com os cinco príncipes atrás até a fronteira. O carro que trouxe a arca de volta virou depois a lenha do holocausto (1Sm 6:14).",
  },
  "cofre-de-ouro-dos-filisteus": {
    title: "O cofre da oferta pela culpa",
    subtitle: "1Sm 6:4-5,17-18 — as cinco hemorroidas e os cinco ratos de ouro",
    text: "\"Qual será a expiação da culpa que lhe havemos de pagar? ... cinco hemorróidas de ouro e cinco ratos de ouro, conforme o número dos príncipes dos filisteus\" (1Sm 6:4). Era prática antiga oferecer a imagem do próprio mal para pedir alívio dele — os filisteus confessaram em ouro exatamente onde a mão de Deus os ferira, cidade por cidade. E os adivinhos deram um conselho teológico melhor do que Israel andava dando: \"por que, pois, endureceríeis o vosso coração, como os egípcios e Faraó endureceram o seu coração?\" (1Sm 6:6). Os pagãos lembraram do Êxodo quando o povo da aliança já o esquecera.",
  },
  "pedra-de-abel": {
    title: "A grande pedra de Bete-Semes",
    subtitle: "1Sm 6:14-15,18 — onde a arca parou e o carro virou altar",
    text: "\"E o carro veio ao campo de Josué, o bete-semita, e parou ali onde havia uma grande pedra... e fenderam a madeira do carro, e ofereceram as vacas ao Senhor em holocausto\" (1Sm 6:14). Os levitas puseram sobre ela a arca e o cofre de ouro, e o narrador registra que a pedra \"ainda está até ao dia de hoje no campo de Josué\" (1Sm 6:18) — um marco que qualquer israelita da época podia ir ver. Mas a alegria da sega virou luto no mesmo capítulo: alguns olharam para dentro da arca e foram feridos, e a cidade perguntou o que o livro inteiro está perguntando: \"quem poderia estar em pé perante o Senhor, este Deus santo?\" (1Sm 6:20).",
  },
  "poco-de-berseba": {
    title: "O poço de Berseba",
    subtitle: "1Sm 8:2 — o tribunal dos filhos de Samuel no extremo sul",
    text: "Berseba é o \"poço do juramento\" cavado por Abraão e reaberto por Isaque (Gn 21:31; 26:33), e marcava o limite meridional da terra — daí a expressão \"de Dã até Berseba\" (1Sm 3:20). Ali Samuel pôs os dois filhos por juízes, e ali eles se venderam: \"inclinaram-se à avareza, e tomaram suborno, e perverteram o direito\" (1Sm 8:3), justamente o que a lei mais proibia ao juiz (Êx 23:8; Dt 16:19). Um poço aberto por juramento virou o lugar onde o juramento se comprava — e foi essa injustiça que os anciãos usaram para pedir um rei.",
  },
  "fonte-das-mocas-de-zufe": {
    title: "A fonte das moças de Zufe",
    subtitle: "1Sm 9:11-13 — o poço da subida onde Saul pediu informação",
    text: "\"E, subindo eles pela encosta da cidade, encontraram umas moças que saíam a tirar água\" (1Sm 9:11). O poço à entrada da cidade é um dos lugares mais recorrentes da Bíblia — Rebeca, Raquel, as filhas de Jetro, a samaritana —, e quase sempre é ali que uma vida muda de rumo. Aqui as moças respondem com uma prontidão quase impaciente, explicando o sacrifício no alto e mandando que se apressem: \"agora, pois, subi, porque hoje o achareis\" (1Sm 9:13). Duas desconhecidas tirando água puseram o primeiro rei de Israel no caminho do profeta que iria ungi-lo.",
  },
  "camara-do-alto": {
    title: "A câmara do alto de Zufe",
    subtitle: "1Sm 9:22-24 — o cenáculo dos trinta convidados",
    text: "Samuel levou Saul e o seu moço \"à câmara, e deu-lhes lugar acima dos convidados, que eram uns trinta homens\" (1Sm 9:22). Dar o lugar de honra a um desconhecido que viera atrás de jumentas, diante de trinta notáveis da cidade, era um anúncio público antes da unção secreta. Nos altos de Israel havia salas de banquete anexas ao lugar do sacrifício, onde se comiam as ofertas pacíficas — a refeição diante de Deus que selava a comunhão (Lv 7:15). Saul entrou ali como um rapaz perdido e saiu com uma coroa pela frente.",
  },
  "espadua-reservada": {
    title: "A espádua guardada de propósito",
    subtitle: "1Sm 9:23-24 — a porção posta de lado antes de Saul chegar",
    text: "\"Disse Samuel ao cozinheiro: Dá cá a porção que te dei, de que te disse: Põe-na à parte contigo\" (1Sm 9:23). A espádua era a porção nobre, reservada ao sacerdote na oferta pacífica (Lv 7:32-33) — e Samuel a mandara separar antes de Saul aparecer, porque Deus lhe dissera na véspera quem viria. É o detalhe mais delicado do capítulo: o rapaz que andava procurando jumentas perdidas descobre que havia um prato guardado à sua espera. \"Come, porque se guardou para ti para este tempo determinado\" (1Sm 9:24). A providência tinha chegado primeiro.",
  },
  "eirado-de-samuel": {
    title: "O eirado da casa de Samuel",
    subtitle: "1Sm 9:25-26 — a conversa da noite antes da unção",
    text: "\"E, descendo do alto para a cidade, falou com Saul sobre o eirado\" (1Sm 9:25). O terraço plano das casas de Israel era o lugar fresco onde se dormia, se orava e se conversava a sós (cf. 2Sm 11:2; At 10:9). Ali o velho profeta e o rapaz de Benjamim passaram a última noite anônima da história de Israel; o texto não registra uma palavra do que foi dito. De madrugada Samuel o chamou, saiu com ele até a extremidade da cidade, mandou o criado adiante — \"porém tu espera agora aqui, e te farei ouvir a palavra de Deus\" (1Sm 9:27) — e derramou o azeite.",
  },
  // ---- 1 SAMUEL 10–12: a unção secreta, a sorte de Mizpá e a despedida ----
  "frasco-de-azeite": {
    title: "O vaso de azeite da unção",
    subtitle: "1Sm 10:1 — o vaso com que Samuel ungiu o primeiro rei",
    text: "\"Então tomou Samuel um vaso de azeite, e lho derramou sobre a cabeça, e beijou-o, e disse: Porventura te não ungiu o Senhor por capitão sobre a sua herança?\" (1Sm 10:1). Ungir era derramar sobre a cabeça o azeite perfumado que consagrava sacerdotes e objetos santos (Êx 30:25-30); daqui em diante consagra também reis, e \"o ungido do Senhor\" (mashiach) passa a ser o título do rei de Israel — a palavra de que vem MESSIAS. A unção de Saul foi feita a sós, na extremidade da cidade, sem testemunhas: Deus escolhe antes de o povo aclamar. O mesmo azeite voltaria a Belém, num chifre, sobre a cabeça de um pastor (1Sm 16:13).",
  },
  "sepulcro-de-raquel": {
    title: "O sepulcro de Raquel em Zelza",
    subtitle: "1Sm 10:2 — o primeiro sinal dado a Saul",
    text: "\"Quando te apartares hoje de mim, acharás dois homens junto ao sepulcro de Raquel, no termo de Benjamim, em Zelza\" (1Sm 10:2). Raquel morreu dando à luz Benjamim e foi sepultada no caminho de Efrata (Gn 35:16-20) — e é exatamente no território do filho que lhe custou a vida que o primeiro rei de Israel recebe o sinal de que as jumentas foram achadas. O túmulo da mãe de Benjamim marca o começo do reinado benjamita. Séculos depois, Jeremias ouviria ali \"voz de lamentação... Raquel chorando por seus filhos\" (Jr 31:15), palavra que Mateus aplicaria a Belém (Mt 2:18).",
  },
  "carvalho-de-tabor": {
    title: "O carvalho de Tabor",
    subtitle: "1Sm 10:3-4 — o segundo sinal, e os dois pães dados a Saul",
    text: "\"Chegarás ao carvalho de Tabor, e ali te encontrarão três homens, que vão subir a Deus a Betel: um levando três cabritos, outro três bolos de pão, e o outro um odre de vinho... e te darão dois pães, os quais receberás da sua mão\" (1Sm 10:3-4). Os três romeiros levavam ofertas ao santuário — e entregam parte delas a um desconhecido no caminho. É um sinal humilde e desconcertante: o futuro rei recebe de graça o pão que ia para o altar, antes de ter feito coisa alguma por Israel. Grandes árvores serviam de marco de estrada e de lugar de encontro em Canaã (cf. Gn 35:8; Jz 4:5).",
  },
  "bagagem-de-mizpa": {
    title: "A bagagem em que Saul se escondeu",
    subtitle: "1Sm 10:21-22 — o rei achado no meio dos fardos",
    text: "Quando a sorte caiu sobre ele diante de todo o Israel, \"buscaram-no, porém não se achou\"; e a resposta do SENHOR foi: \"eis que se escondeu entre a bagagem\" (1Sm 10:22). Os fardos e apetrechos que as famílias traziam à assembleia de Mizpá viraram o esconderijo do primeiro rei — e a imagem ficou como retrato do homem: começou pequeno aos próprios olhos (\"não sou eu filho de Benjamim, da menor das tribos de Israel?\", 1Sm 9:21) e acabou grande demais para obedecer. Samuel um dia lhe lembraria isso: \"não é assim que, sendo tu pequeno aos teus olhos, foste feito cabeça das tribos de Israel?\" (1Sm 15:17).",
  },
  "livro-do-direito-do-reino": {
    title: "O livro do direito do reino",
    subtitle: "1Sm 10:25 — a monarquia posta debaixo da lei",
    text: "\"E Samuel anunciou ao povo o direito do reino, e escreveu-o num livro, e pô-lo perante o Senhor\" (1Sm 10:25). O rei de Israel não seria um faraó nem um déspota do oriente: nasceria já limitado por um texto escrito e depositado no santuário, exatamente como Deuteronômio 17:14-20 previra — o rei que não multiplica cavalos, mulheres nem prata, e que copia a lei para lê-la todos os dias da sua vida. É a raiz bíblica da ideia de que a autoridade está debaixo de uma norma, e não acima dela. Saul cairia justamente por ignorar o que estava naquele livro.",
  },
  "junta-de-bois-despedacada": {
    title: "A junta de bois cortada em pedaços",
    subtitle: "1Sm 11:5-7 — a convocação de Saul a todo o Israel",
    text: "\"E tomou uma junta de bois, e cortou-os em pedaços, e os enviou a todos os termos de Israel pelas mãos dos mensageiros, dizendo: Qualquer que não sair atrás de Saul e atrás de Samuel, assim se fará aos seus bois\" (1Sm 11:7). Saul vinha do campo atrás dos bois quando soube do choro de Gibeá; \"então o Espírito de Deus se apoderou de Saul... e acendeu-se em grande maneira a sua ira\" — e o lavrador destruiu o próprio ganha-pão para convocar o povo. O gesto ecoa, invertido, o crime de Juízes 19-20, quando um corpo despedaçado convocou Israel para uma guerra civil; aqui os pedaços convocam para um livramento. \"E caiu o temor do Senhor sobre o povo, e saíram como um só homem\" (1Sm 11:7).",
  },
  "sega-do-trigo": {
    title: "A sega do trigo debaixo dos trovões",
    subtitle: "1Sm 12:17-18 — o sinal que fechou a despedida de Samuel",
    text: "\"Não é hoje a sega do trigo? Clamarei, pois, ao Senhor, e dará trovões e chuva; e sabereis e vereis que é grande a vossa maldade\" (1Sm 12:17). Na Palestina a colheita do trigo cai no fim de maio e junho, em plena estação seca: chuva ali não é apenas incômoda, é impossível — e destrói a safra. Samuel pede exatamente isso, e \"o Senhor deu trovões e chuva naquele dia; pelo que todo o povo temeu em grande maneira ao Senhor e a Samuel\" (1Sm 12:18). O céu limpo abrindo-se sobre os feixes em pé foi a prova de que o pedido de um rei fora pecado — e, mesmo assim, o profeta acrescentou: \"longe de mim que eu peque contra o Senhor, deixando de orar por vós\" (1Sm 12:23).",
  },
  // ---- 1 SAMUEL 13–14: Micmás, o desfiladeiro e o juramento temerário ----
  "romeira-de-migrom": {
    title: "A romeira de Migrom",
    subtitle: "1Sm 14:2 — a árvore sob a qual Saul esperava com seiscentos homens",
    text: "\"E Saul estava à extremidade de Gibeá, debaixo da romeira que estava em Migrom; e o povo que havia com ele eram uns seiscentos homens\" (1Sm 14:2). A cena é de paralisia: o rei parado à sombra de uma árvore com o resto do exército, o sacerdote ao lado com o éfode, e o inimigo acampado a poucos quilômetros. Enquanto isso, sem que ninguém soubesse, o filho descia sozinho pelo penhasco com um pajem. O contraste é a espinha do capítulo — a fé que age e a autoridade que espera. Seiscentos homens é tudo o que restara dos três mil de 1Sm 13:2.",
  },
  "bozez-e-sene": {
    title: "Bozez e Sené",
    subtitle: "1Sm 14:4-5 — as duas penhas do desfiladeiro de Micmás",
    text: "\"E entre os desfiladeiros pelos quais Jônatas procurava passar à guarnição dos filisteus, dum lado havia uma penha aguda, e do outro lado uma penha aguda; e era o nome de uma Bozez, e o nome da outra Sené\" (1Sm 14:4). O narrador registra até a orientação: uma ao norte, defronte de Micmás, outra ao sul, defronte de Gibeá — o wadi es-Suweinit, uma garganta funda que ainda hoje se pode ver. Era o pior caminho possível, e por isso o único desguarnecido: Jônatas e o pajem subiram \"de gatinhas\", com as mãos e os pés (1Sm 14:13). Os nomes das duas rochas ficaram na Bíblia porque foi ali que dois homens decidiram uma guerra.",
  },
  "arca-de-deus-em-gibea": {
    title: "A arca trazida ao campo por Aías",
    subtitle: "1Sm 14:18-19 — a consulta que Saul interrompeu",
    text: "\"Então disse Saul a Aías: Traze aqui a arca de Deus\" (1Sm 14:18) — e o sacerdote, bisneto de Eli, a trouxe ao arraial. Mas o alvoroço no campo filisteu crescia a cada instante, e o rei não esperou a resposta: \"enquanto Saul ainda falava com o sacerdote, o alvoroço que havia no arraial dos filisteus ia crescendo muito; então disse Saul ao sacerdote: Retira a tua mão\" (1Sm 14:19). É o reinado inteiro num só gesto: começa a buscar a Deus e desiste antes de ouvir. A mesma arca que a casa de Eli tratara como amuleto em Afeque (1Sm 4:3) volta a ser consultada com pressa e abandonada no meio da frase.",
  },
  "favo-de-mel-de-jonatas": {
    title: "O favo de mel do bosque",
    subtitle: "1Sm 14:25-27 — a ponta da vara e os olhos que se aclararam",
    text: "\"E todo o povo chegou a um bosque, onde havia mel na superfície do campo... e eis que havia um manancial de mel, porém ninguém chegou a mão à boca, porque o povo temia a conjuração\" (1Sm 14:25-26). Jônatas não ouvira o juramento do pai; \"estendeu a ponta da vara que tinha na mão, e a molhou no favo de mel, e tornou a mão à boca, e aclararam-se os seus olhos\" (1Sm 14:27). O mel derramado pelo chão é a imagem do sustento que Deus punha no caminho do exército — e que uma ordem humana precipitada proibiu. \"Quanto maior não teria sido a derrota dos filisteus?\", diria Jônatas (1Sm 14:30). O voto de Saul cansou o povo e quase lhe custou o filho.",
  },
  "pedra-grande-de-aijalom": {
    title: "A grande pedra do despojo",
    subtitle: "1Sm 14:33-35 — o altar improvisado contra o sangue",
    text: "Faminto depois de um dia inteiro de jejum forçado, o povo lançou-se ao despojo \"e comeram com o sangue\" (1Sm 14:32) — transgressão grave da lei, que proíbe comer a carne com a vida que está no sangue (Lv 17:10-14; Dt 12:23). Saul mandou rolar uma grande pedra para que ali cada um degolasse o seu animal como devia. Foi um remédio correto para um mal que ele mesmo causara com o juramento. E o texto acrescenta a nota melancólica: \"então edificou Saul um altar ao Senhor; este foi o primeiro altar que edificou ao Senhor\" (1Sm 14:35) — o primeiro, depois de tantos anos de reinado.",
  },
  "primeiro-altar-de-saul": {
    title: "O primeiro altar de Saul",
    subtitle: "1Sm 14:35 — tarde, e sobre o campo do despojo",
    text: "\"Então edificou Saul um altar ao Senhor; este foi o primeiro altar que edificou ao Senhor\" (1Sm 14:35). A frase é elogio e acusação ao mesmo tempo. Samuel edificara o seu altar em Ramá logo no começo do ministério (1Sm 7:17); Saul só levanta o primeiro depois de anos no trono, e ainda assim como remédio de emergência para o pecado do povo. Naquela mesma noite ele quereria descer sobre os filisteus e o sacerdote pediria que se consultasse primeiro a Deus — \"porém não lhe respondeu naquele dia\" (1Sm 14:37). O altar estava construído; o ouvido, não.",
  },
  // ---- 1 SAMUEL 27–31: Ziclague, En-Dor e o fim de Saul em Gilboa ----
  "trono-de-aquis": {
    title: "O trono de Aquis, rei de Gate",
    subtitle: "1Sm 27:5 — o assento do rei filisteu na cidade real",
    text: "Aquis, filho de Maoque, reinava em Gate, uma das cinco cidades dos príncipes filisteus — e a pátria de Golias. Davi, exausto de fugir, disse no coração: \"não há coisa melhor para mim do que escapar apressadamente para a terra dos filisteus\" (1Sm 27:1), e foi assentar-se com seiscentos homens debaixo do trono do inimigo que um dia enfrentara com uma funda. Mas morar na cidade real é morar sob os olhos do rei, e Davi pediu distância: \"dá-me lugar numa das cidades da terra, para que ali habite; pois por que razão habitaria o teu servo contigo na cidade real?\" (1Sm 27:5). O pedido soa humildade e é cálculo: longe de Gate, ele podia ferir os inimigos de Israel e mentir a Aquis sobre onde estivera (1Sm 27:8-12). Este é o assento mais estranho de toda a história de Davi — o ungido do SENHOR pedindo favor ao senhor dos filisteus, protegido por quem devia matá-lo, e pagando por essa proteção um ano e quatro meses de dissimulação.",
  },
  "ziclague": {
    title: "Ziclague",
    subtitle: "1Sm 27:6-7 — a cidade que Aquis deu a Davi",
    text: "\"Então lhe deu Aquis, naquele dia, a cidade de Ziclague (por isso Ziclague pertence aos reis de Judá, até ao dia de hoje)\" (1Sm 27:6). No papel a cidade já era de Israel — coube a Judá e depois a Simeão na repartição de Josué (Js 15:31; 19:5) —, mas na prática estava em mãos filisteias, e foi de mão filisteia que Davi a recebeu. Ali ele habitou \"um ano e quatro meses\" (1Sm 27:7): uma praça só sua, longe da corte, onde o bando de fugitivos foi virando governo. O parêntese do narrador é uma seta apontando para frente: o presente de um rei pagão tornou-se propriedade permanente da dinastia davídica. Deus estava levantando o trono de Davi com material emprestado do inimigo, sem que Davi, ocupado em sobreviver, percebesse. É de Ziclague que ele sairá para ser ungido rei em Hebrom (2Sm 2:4).",
  },
  "casa-de-en-dor": {
    title: "A porta da casa em En-Dor",
    subtitle: "1Sm 28:7-8 — o umbral que Saul cruzou de noite e disfarçado",
    text: "En-Dor ficava do outro lado de Suném, onde os filisteus estavam acampados: para bater àquela porta, Saul teve de contornar no escuro o exército que o mataria no dia seguinte. \"E Saul se disfarçou, e vestiu outras roupas, e foi ele com dois homens, e de noite chegaram à mulher\" (1Sm 28:8). Tudo nessa entrada é confissão, porque a lei que ele mesmo executara na terra é a que está prestes a quebrar — \"Saul tinha desterrado os adivinhos e os encantadores\" (1Sm 28:3), cumprindo o \"não vos virareis para os adivinhadores e encantadores; não os busqueis, contaminando-vos com eles\" (Lv 19:31) e o rol de abominações de Dt 18:10-12, onde está \"nem quem consulte a um espírito adivinhador, nem mágico, nem quem consulte os mortos\". A própria mulher fareja a cilada: \"eis aqui tu sabes o que Saul fez, como tem destruído da terra os adivinhos e os encantadores; por que, pois, me armas um laço à minha vida, para me fazeres morrer?\" (1Sm 28:9). Saul veio até aqui porque o céu se calara: \"perguntou Saul ao Senhor, porém o Senhor não lhe respondeu, nem por sonhos, nem por Urim, nem por profetas\" (1Sm 28:6) — e, não suportando o silêncio de Deus, foi procurar voz em porta proibida. O Cronista resumiria o fim do reinado exatamente aí: morreu \"também porque buscou a adivinhadora para a consultar. E não buscou ao Senhor\" (1Cr 10:13-14).",
  },
  "bezerro-cevado-de-en-dor": {
    title: "O bezerro cevado de En-Dor",
    subtitle: "1Sm 28:24-25 — a última refeição de Saul",
    text: "\"E tinha a mulher em casa um bezerro cevado, e se apressou, e o matou, e tomou farinha, e a amassou, e a cozeu em bolos ázimos\" (1Sm 28:24). O bezerro cevado era o melhor animal da casa, guardado para uma festa ou para um hóspede de honra — e a cena repete, gesto por gesto, a hospitalidade de Abraão diante dos três varões: a pressa, a farinha amassada em bolos, a vitela tenra e boa (Gn 18:6-7). Os pães asmos são pão sem fermento, o pão de quem não tem tempo de esperar a massa levedar. Ela faz isso por um homem que caíra estendido por terra e não comia \"todo aquele dia e toda aquela noite\" (1Sm 28:20), e lhe diz o que Deus já não lhe dizia: \"porei um bocado de pão diante de ti, e come, para que tenhas forças para te pores a caminho\" (1Sm 28:22). A ironia é amarga e o texto não a comenta: quem teve compaixão do rei na última noite da sua vida foi a necromante que ele proscrevera, e o cuidado lhe veio da mão que a sua própria lei mandara tirar da terra. Saul come, levanta-se e parte \"naquela mesma noite\" (1Sm 28:25) — para Gilboa.",
  },
  "fonte-de-jizreel": {
    title: "A fonte de Jizreel",
    subtitle: "1Sm 29:1 — o último acampamento de Israel sob Saul",
    text: "\"E ajuntaram os filisteus todos os seus exércitos em Afeque; e acamparam-se os israelitas junto à fonte que está em Jizreel\" (1Sm 29:1). Exército que desce ao vale precisa de água, e essa nascente ao pé de Gilboa é quase certamente a mesma fonte de Harode junto à qual Gideão peneirara os seus trezentos (Jz 7:1) — o vale onde Deus já vencera com poucos. A geografia aqui é o enredo: os filisteus vêm de Afeque, o lugar onde uma geração antes Israel perdera a arca e a casa de Eli (1Sm 4:1), e Israel os espera na planície, o único terreno em que os carros filisteus levam vantagem. Enquanto Saul acampa junto à água, Davi é mandado de volta na retaguarda do inimigo (1Sm 29:11), poupado por Deus de estar naquela batalha. Dias depois, dessa mesma encosta, \"os homens de Israel fugiram de diante dos filisteus, e caíram mortos na montanha de Gilboa\" (1Sm 31:1). A fonte é o último ponto de descanso do primeiro rei de Israel.",
  },
  "ziclague-queimada": {
    title: "Ziclague queimada a fogo",
    subtitle: "1Sm 30:1-6 — a cidade de Davi em brasas ao terceiro dia",
    text: "\"Chegando Davi e os seus homens ao terceiro dia a Ziclague, já os amalequitas tinham invadido o sul, e Ziclague, e tinham ferido a Ziclague e a tinham queimado a fogo\" (1Sm 30:1). O assalto foi calculado: não mataram ninguém, \"tão-somente os levaram consigo, e foram o seu caminho\" (1Sm 30:2) — levaram as mulheres e os filhos como mercadoria e deixaram atrás só o que arde. São os mesmos amalequitas que Saul recebera ordem de destruir e poupou (1Sm 15:2-3), e agora a desobediência do rei que reina queima a casa do rei que há de vir. \"Então Davi e o povo que se achava com ele alçaram a sua voz, e choraram, até que neles não houve mais forças para chorar\" (1Sm 30:4); e o luto virou motim, porque \"o povo falava de apedrejá-lo\" (1Sm 30:6). Foi ali, diante das cinzas da própria casa, sem mulheres, sem filhos e sem os seiscentos ao seu lado, que se escreveu a linha que define este homem: \"todavia Davi se fortaleceu no Senhor seu Deus\" (1Sm 30:6). E o passo seguinte não foi vingança, foi consulta: \"Traze-me, peço-te, aqui o éfode\" (1Sm 30:7).",
  },
  "ribeiro-de-besor": {
    title: "O ribeiro de Besor",
    subtitle: "1Sm 30:9-10,21 — a torrente onde duzentos ficaram para trás",
    text: "O Besor é um dos wadis do Neguebe, a sudoeste de Ziclague: leito seco quase o ano inteiro, com barrancos fundos que obrigam a descer e subir. Ali a perseguição se partiu em duas — \"chegaram ao ribeiro de Besor, onde pararam os que ficaram atrás\", pois \"duzentos homens ficaram, por não poderem, de cansados que estavam, passar o ribeiro de Besor\" (1Sm 30:9-10). Um terço do exército de Davi não conseguiu atravessar uma vala; eram homens que tinham marchado três dias desde Afeque e chorado até não terem mais forças. Davi não os repreendeu nem os desprezou: deixou-os com a bagagem e seguiu com quatrocentos. Na volta, \"estes saíram ao encontro de Davi e do povo que com ele vinha; e, chegando-se Davi com o povo, os saudou em paz\" (1Sm 30:21). Este barranco é o lugar exato onde nasceu o estatuto do v.24 — porque foi aqui que se viu, na carne, quem ficaria de fora se coubesse aos homens repartir.",
  },
  "estatuto-e-direito-de-davi": {
    title: "O estatuto e direito de Davi",
    subtitle: "1Sm 30:22-25 — a parte igual para quem ficou com a bagagem",
    text: "Repartido o despojo, \"todos os maus e perversos, dentre os homens que tinham ido com Davi\" quiseram cortar fora os duzentos do Besor: \"visto que não foram conosco, não lhes daremos do despojo que libertamos; mas que leve cada um sua mulher e seus filhos, e se vá\" (1Sm 30:22) — assim a ARC traduz os que o hebraico chama filhos de Belial, os homens sem proveito. O argumento deles é mérito puro: quem lutou, leva. Davi responde primeiro pela origem do bem, não pelo esforço: \"não fareis assim, irmãos meus, com o que nos deu o Senhor, que nos guardou, e entregou a tropa que contra nós vinha, nas nossas mãos\" (1Sm 30:23) — despojo não foi conquistado, foi dado, e ninguém reparte como dono aquilo que recebeu de graça. Só então vem a regra: \"qual é a parte dos que desceram à peleja, tal também será a parte dos que ficaram com a bagagem; igualmente repartirão\" (1Sm 30:24). A decisão de um dia virou lei permanente — \"o pôs por estatuto e direito em Israel até ao dia de hoje\" (1Sm 30:25) —, e Davi apenas recolocou em vigor o que Moisés já mandara ao dividir a presa de Midiã \"entre os que se armaram para a peleja, e saíram à guerra, e toda a congregação\" (Nm 31:27). O primeiro ato de governo do futuro rei não foi tomar; foi garantir que o cansado não fosse esquecido na hora da partilha.",
  },
  "muro-de-bete-sa": {
    title: "O muro de Bete-Sã",
    subtitle: "1Sm 31:10,12 — onde afixaram o corpo de Saul",
    text: "Bete-Sã guardava o cruzamento do vale de Jizreel com o vale do Jordão, e estava em mãos filisteias: pendurar o corpo ali era pôr o troféu na estrada mais movimentada do norte. \"E cortaram-lhe a cabeça, e o despojaram das suas armas... e o seu corpo o afixaram no muro de Bete-Sã\" (1Sm 31:9-10). O homem que Israel escolhera porque \"desde os ombros para cima sobressaía a todo o povo\" (1Sm 9:2) acabou pregado numa parede, sem cabeça, à vista de quem passasse. Contra esse muro se levantaram os homens de Jabes-Gileade: \"todo o homem valoroso se levantou, e caminharam toda a noite, e tiraram o corpo de Saul e os corpos de seus filhos do muro, de Bete-Sã\" (1Sm 31:12). Foram vinte quilômetros de ida e vinte de volta, atravessando o Jordão em terreno inimigo, só para descer um cadáver de uma parede. Davi cantaria depois: \"não o noticieis em Gate, não o publiqueis nas ruas de Ascalom, para que não se alegrem as filhas dos filisteus\" (2Sm 1:20) — e anos mais tarde iria buscar aqueles ossos para sepultá-los na terra de Benjamim (2Sm 21:12-14).",
  },
  "casa-de-astarote": {
    title: "A casa de Astarote",
    subtitle: "1Sm 31:9-10 — o templo onde penduraram as armas de Saul",
    text: "\"E puseram as suas armas no templo de Astarote\" (1Sm 31:10), e mandaram a notícia \"pela terra dos filisteus, em redor, a anunciá-lo no templo dos seus ídolos e entre o povo\" (1Sm 31:9). Depositar as armas do rei vencido na casa do deus era o modo antigo de declarar quem realmente ganhara a guerra: não exército contra exército, mas deus contra Deus. Astarote era a deusa da fertilidade e da guerra, a mesma que Israel servira nos dias dos juízes e que Samuel mandara tirar do meio do povo (1Sm 7:3-4) — o rei que devia tê-la varrido da terra terminou com a própria armadura pendurada no santuário dela. E é justamente aqui que a Escritura arma o contraste: um templo filisteu já recebera troféu do SENHOR e não soubera o que fazer com ele. Quando levaram a arca à casa de Dagom em Asdode, o ídolo amanheceu \"caído com o rosto em terra diante da arca do Senhor\", e no dia seguinte \"a cabeça de Dagom e ambas as palmas das suas mãos estavam cortadas sobre o limiar\" (1Sm 5:3-4). Da primeira vez, quem entrou no templo pagão foi Deus, e o ídolo é que caiu decepado; desta vez entram as armas de um rei que deixara de ouvir a Deus, e a cabeça cortada é a dele (1Sm 31:9). Os filisteus não ficaram mais fortes entre um capítulo e outro — mudou Saul.",
  },
  "arvoredo-de-jabes": {
    title: "O arvoredo de Jabes",
    subtitle: "1Sm 31:11-13 — a sepultura de Saul e o jejum de sete dias",
    text: "\"E tomaram os seus ossos, e os sepultaram debaixo de um arvoredo, em Jabes, e jejuaram sete dias\" (1Sm 31:13). Sepultar debaixo de uma árvore era dar ao morto um marco que a cidade inteira sabia apontar, como o carvalho de Betel onde ficou Débora, a ama de Rebeca (Gn 35:8); e sete dias de jejum é o luto cheio, o que se guardava pelos pais. Só que quem faz esse funeral não é a tribo do rei nem a sua casa: são os moradores de Jabes-Gileade, do outro lado do Jordão. O arco se fecha exatamente aqui. No primeiro dia do seu reinado, Saul vinha do campo atrás dos bois, ouviu que Naás, o amonita, sitiava Jabes exigindo \"que a todos vos arranque o olho direito\", e desceu sobre os amonitas de madrugada, ferindo-os \"até que o dia aqueceu\" (1Sm 11:1-11). Quarenta anos depois, Jabes é a única cidade de Israel que caminha a noite toda para pagar a dívida — e Davi, recém-ungido em Hebrom, mandou abençoá-los por isso: \"benditos sejais vós do Senhor, que fizestes tal beneficência a vosso senhor, a Saul, e o sepultastes!\" (2Sm 2:5). O rei que perdeu tudo teve, no fim, um punhado de homens que ainda se lembrava do seu melhor dia.",
  },
  // ---- 1 SAMUEL 15–26: a rejeição de Saul, a unção de Belém e os anos de fuga ----
  "monumento-de-saul": {
    title: "O monumento que Saul levantou para si",
    subtitle: "1Sm 15:12 — a coluna do Carmelo, depois de Amaleque",
    text: "\"Já chegou Saul ao Carmelo, e eis que levantou para si uma coluna\" (1Sm 15:12). Colunas de pedra eram o modo antigo de fincar memória no chão: Jacó levantou uma em Betel para marcar onde Deus lhe falara (Gn 28:18), e Samuel pôs Eben-Ezer dizendo \"Até aqui nos ajudou o Senhor\" (1Sm 7:12). Esta é diferente por uma preposição só — foi levantada PARA SI. O rei que acabara de poupar o melhor do interdito parou no caminho de volta para se comemorar, e é assim, por um recado de terceiros, que Samuel fica sabendo dele antes de os dois se encontrarem. Absalão faria igual, e pelo mesmo motivo: \"tinha tomado e levantado para si uma coluna... porque dizia: Filho nenhum tenho para conservar a memória do meu nome\" (2Sm 18:18). Pedra em pé é sempre um testemunho; a questão é a favor de quem.",
  },
  "altar-de-gilgal": {
    title: "O altar de Gilgal",
    subtitle: "1Sm 15:21,33 — onde o despojo virou desculpa e Agague foi despedaçado",
    text: "Gilgal foi o lugar em que o reino de Saul se renovou com ofertas pacíficas perante o SENHOR (1Sm 11:15) e, depois, o lugar em que ele começou a perdê-lo, oferecendo o holocausto sem esperar o profeta (1Sm 13:9-14). Agora, na volta de Amaleque, o altar vira álibi: \"Mas o povo tomou do despojo ovelhas e vacas, o melhor do interdito, para oferecer ao Senhor teu Deus em Gilgal\" (1Sm 15:21). Samuel responde com a frase que atravessa o livro inteiro: \"Eis que o obedecer é melhor do que o sacrificar; e o atender melhor é do que a gordura de carneiros\" (1Sm 15:22). Culto não compra desobediência, e o que Deus mandou destruir não pode ser reciclado em oferta. Diante deste mesmo altar o profeta terminou o que o rei deixara pela metade: \"Então Samuel despedaçou a Agague perante o Senhor em Gilgal\" (1Sm 15:33).",
  },
  "chifre-de-azeite": {
    title: "O chifre de azeite",
    subtitle: "1Sm 16:1,13 — o vaso com que Davi foi ungido em Belém",
    text: "\"Enche um chifre de azeite, e vem, enviar-te-ei a Jessé o belemita; porque dentre os seus filhos me tenho provido de um rei\" (1Sm 16:1). O chifre era um recipiente de osso, duro e permanente, e não o frasco fino de barro que se usa uma vez: Saul fora ungido com um \"vaso de azeite\" (1Sm 10:1), Davi é ungido com um chifre — e com chifre Zadoque ungiria Salomão (1Rs 1:39). O azeite santo consagrava sacerdotes e utensílios do santuário (Êx 30:25-30); derramado aqui sobre o menor dos filhos de Jessé, faz dele o ungido do SENHOR. \"Então Samuel tomou o chifre do azeite, e ungiu-o no meio de seus irmãos; e desde aquele dia em diante o Espírito do Senhor se apoderou de Davi\" (1Sm 16:13). O texto encadeia os dois fatos sem respirar: no versículo seguinte, \"o Espírito do Senhor se retirou de Saul\" (1Sm 16:14). O próprio Deus resumiria aquele quintal numa linha: \"Achei a Davi, meu servo; com santo óleo o ungi\" (Sl 89:20).",
  },
  "presente-de-jesse": {
    title: "O presente de Jessé ao rei",
    subtitle: "1Sm 16:20 — o pão, o odre de vinho e o cabrito levados pela mão de Davi",
    text: "\"Então tomou Jessé um jumento carregado de pão, e um odre de vinho, e um cabrito, e enviou-os a Saul pela mão de Davi, seu filho\" (1Sm 16:20). Era o costume de quem se apresentava pela primeira vez diante de um superior: ninguém chegava de mãos vazias, e o próprio Saul se preocupara com isso quando ia procurar o vidente (1Sm 9:7). A carga é quase a mesma que três romeiros deram a Saul no carvalho de Tabor, no dia em que ele foi ungido — pão, vinho e cabrito, o mantimento de sempre (1Sm 10:3). E há a ironia que o narrador não comenta: dias antes o azeite fora derramado sobre este moço em segredo, e agora o pai o manda ao palácio como quem manda uma encomenda. O rei rejeitado recebe o jantar das mãos do rei escolhido, \"e o amou muito, e foi seu pajem de armas\" (1Sm 16:21). Deus põe o sucessor dentro da casa do antecessor pela porta de serviço.",
  },
  "carvalho-do-vale": {
    title: "O carvalho do vale",
    subtitle: "1Sm 17:2,19 — a árvore que dá nome ao vale do desafio",
    text: "\"Porém Saul e os homens de Israel se ajuntaram e acamparam no vale do carvalho, e ordenaram a batalha contra os filisteus\" (1Sm 17:2). O nome hebraico é vale de Elá, o vale do terebinto: uma planície larga entre Socó e Azeca, com um ribeiro seco no meio, por onde se subia da planície filistéia ao coração de Judá. Grandes árvores serviam de marco de terreno em Canaã, e esta batizou o campo inteiro; o narrador repete o nome de propósito ao mandar Davi para lá (1Sm 17:19). O vale era terra de ninguém: \"os filisteus estavam num monte de um lado, e os israelitas estavam num monte do outro lado; e o vale estava entre eles\" (1Sm 17:3), e por quarenta dias ninguém desceu. A memória ficou colada ao lugar — anos depois, em Nobe, o sacerdote descreveria a espada guardada como sendo de \"Golias, o filisteu, a quem tu feriste no vale do carvalho\" (1Sm 21:9).",
  },
  "lanca-de-golias": {
    title: "A lança de Golias",
    subtitle: "1Sm 17:7 — a haste como eixo de tecelão",
    text: "\"E a haste da sua lança era como o eixo do tecelão, e a ponta da sua lança de seiscentos siclos de ferro, e diante dele ia o escudeiro\" (1Sm 17:7). O eixo do tecelão é o rolo grosso do tear, com o cordame enrolado — a comparação diz a espessura da haste e sugere a laçada de arremesso enrolada nela. Só a ponta pesava uns sete quilos, e era de FERRO: é aí que mora o horror da cena, porque os filisteus detinham o monopólio do metal, \"e em toda a terra de Israel nem um ferreiro se achava\" (1Sm 13:19), de modo que no dia da peleja \"não se achou nem espada nem lança na mão de todo o povo\" (1Sm 13:22). Golias exibe em bronze e em ferro exatamente aquilo que Israel não tinha como fabricar. Contra a lança veio uma funda, e o pastor disse por quê: \"Tu vens a mim com espada, e com lança, e com escudo; porém eu venho a ti em nome do Senhor dos Exércitos\" (1Sm 17:45).",
  },
  "armadura-de-saul": {
    title: "As armas de Saul emprestadas a Davi",
    subtitle: "1Sm 17:38-39 — o capacete, a couraça e a espada que ele tirou de si",
    text: "\"E Saul vestiu a Davi de suas vestes, e pôs-lhe sobre a cabeça um capacete de bronze; e o vestiu de uma couraça\" (1Sm 17:38). Era o melhor equipamento de Israel: Saul sobressaía a todo o povo dos ombros para cima (1Sm 9:2) e, com Jônatas, era um dos dois únicos homens do exército que tinham espada e lança (1Sm 13:22). O rapaz cingiu a espada, deu alguns passos e devolveu tudo: \"Não posso andar com isto, pois nunca o experimentei. E Davi tirou aquilo de sobre si\" (1Sm 17:39). Não foi desprezo pela armadura nem humildade de retórica — era grande demais e, sobretudo, não era dele. O rei que não desceu ao vale queria ao menos mandar a sua imagem em campo; Davi recusou vestir-se de Saul para poder ir como Davi. Quem saiu foi um pastor com cajado, funda e alforje, e o narrador faz questão de sublinhar essa nudez de armas no fim: \"sem que Davi tivesse uma espada na mão\" (1Sm 17:50).",
  },
  "cinco-pedras-lisas": {
    title: "Os cinco seixos do ribeiro",
    subtitle: "1Sm 17:40 — as pedras escolhidas e postas no surrão",
    text: "\"E tomou o seu cajado na mão, e escolheu para si cinco seixos do ribeiro, e pô-los no alforje de pastor, que trazia, a saber, no surrão, e lançou mão da sua funda\" (1Sm 17:40). Seixo de leito de rio é pedra rolada pela água até ficar redonda e densa: o projétil perfeito, e o ribeiro do vale de Elá está cheio deles. A funda não era brinquedo de menino — em Benjamim havia setecentos canhotos que \"atiravam com a funda uma pedra em um cabelo, e não erravam\" (Jz 20:16), e um pastor a usava todo dia contra o leão e o urso (1Sm 17:34-36). Escolher cinco não é dúvida nem superstição; é o cuidado de quem sabe o que está fazendo, e sobraram quatro. A perícia não dispensou a fé, e a fé não dispensou a perícia — mas quem venceu não foi nenhuma das duas: \"o Senhor salva, não com espada, nem com lança; porque do Senhor é a guerra\" (1Sm 17:47).",
  },
  "espada-de-golias": {
    title: "A espada de Golias",
    subtitle: "1Sm 17:51,54; 21:9 — o troféu tirado da bainha do próprio gigante",
    text: "\"Por isso correu Davi, e pôs-se em pé sobre o filisteu, e tomou a sua espada, e tirou-a da bainha, e o matou, e lhe cortou com ela a cabeça\" (1Sm 17:51). Quem não tinha espada matou o gigante com a espada do gigante: a arma que Israel não podia forjar (1Sm 13:19) chegou de graça pela mão do inimigo. Davi levou a cabeça a Jerusalém e \"pôs as armas dele na sua tenda\" (1Sm 17:54); mais tarde a lâmina foi parar no santuário de Nobe, guardada \"envolta num pano detrás do éfode\" (1Sm 21:9) — no ponto mais santo da casa, como quem pendura um ex-voto diante de Deus. Fugindo de Saul sem nada nas mãos, Davi a pede de volta, e o sacerdote lha entrega: \"Não há outra semelhante; dá-ma\". Foi essa entrega que Doegue delatou — \"e lhe deu também a espada de Golias, o filisteu\" (1Sm 22:10) — e que custou a vida a oitenta e cinco sacerdotes. O mesmo ferro que celebrou a maior vitória de Davi virou a prova usada para destruir a casa que o abrigou.",
  },
  "efa-de-grao-tostado": {
    title: "O efa de grão tostado",
    subtitle: "1Sm 17:17 — o mantimento que Jessé mandou aos filhos no arraial",
    text: "\"Toma, peço-te, para teus irmãos um efa deste grão tostado e estes dez pães, e corre a levá-los ao arraial, a teus irmãos\" (1Sm 17:17). Grão tostado é trigo ou cevada torrado na chapa: comida de estrada e de colheita, que não estraga nem precisa de fogo — a mesma que Boaz ofereceu a Rute na eira (Rt 2:14) e que Abigail levaria a Davi no deserto (1Sm 25:18). O efa era medida de secos de uns vinte e dois litros, ração para dias, porque o exército de Israel se sustentava do que a família de cada soldado mandasse. É por isso, e só por isso, que Davi está no vale do carvalho: não foi convocado para a guerra, foi mandado com o farnel. Deus costuma pôr os seus no lugar decisivo por um caminho que parecia secundário demais para importar.",
  },
  "dez-queijos-de-leite": {
    title: "Os dez queijos de leite",
    subtitle: "1Sm 17:18 — o presente ao capitão de mil e o penhor dos irmãos",
    text: "\"Porém estes dez queijos de leite leva ao capitão de mil; e visitarás a teus irmãos, a ver se vão bem; e tomarás o seu penhor\" (1Sm 17:18). Os queijos não são para os irmãos: são para o oficial deles — a cortesia calculada de um pai que quer o comandante bem-disposto com os seus três filhos na linha de frente. E o \"penhor\" era um sinal material, algum objeto que Davi devia trazer de volta como prova de que os encontrara vivos, porque do arraial não descia carta nem notícia. As duas encomendas desenham a angústia doméstica de Jessé, \"já velho e adiantado em idade\", com metade da casa na guerra (1Sm 17:12-14). O menino cumpriu a lista até o fim e, de quebra, matou Golias; o texto não diz que o penhor tenha chegado a Belém.",
  },
  "espada-de-jonatas": {
    title: "A espada e o arco de Jônatas",
    subtitle: "1Sm 18:4 — as armas com que o príncipe vestiu o pastor",
    text: "\"E Jônatas se despojou da capa que trazia sobre si, e a deu a Davi, como também as suas vestes, até a sua espada, e o seu arco, e o seu cinto\" (1Sm 18:4). Ceder as próprias armas e o próprio manto era, no oriente antigo, transferir posição: o herdeiro do trono está vestindo com insígnias de príncipe o rapaz que acabou de chegar do rebanho. E há um detalhe de peso: em todo o Israel só havia duas espadas, a de Saul e a de Jônatas (1Sm 13:22) — ele deu metade do arsenal da casa real. Nada disso lhe foi arrancado; \"a alma de Jônatas se ligou com a alma de Davi; e Jônatas o amou, como à sua própria alma\" (1Sm 18:1). Anos depois, no bosque de Zife, ele diria em voz alta o que aquele gesto já dissera calado: \"tu reinarás sobre Israel, e eu serei contigo o segundo\" (1Sm 23:17). É a abdicação mais alegre da Escritura.",
  },
  "lanca-de-saul": {
    title: "A lança de Saul",
    subtitle: "1Sm 18:11; 19:10; 20:33; 26:7 — a arma que ele nunca larga",
    text: "A lança acompanha Saul como um personagem. Ele a tem na mão enquanto Davi toca a harpa — \"e Saul atirou com a lança, dizendo: Encravarei a Davi na parede\" (1Sm 18:11) — e torna a atirá-la outra vez, ferindo a parede (1Sm 19:10). Na festa da lua nova ela voa contra o próprio filho: \"então Saul atirou-lhe com a lança, para o ferir; assim entendeu Jônatas que já seu pai tinha determinado matar a Davi\" (1Sm 20:33). Está na mão dele debaixo do arvoredo de Gibeá, quando acusa os criados de conspiração e manda matar os sacerdotes de Nobe (1Sm 22:6), e está \"fincada na terra à sua cabeceira\" na noite de Haquilá, quando Davi podia tê-la usado e apenas a levou embora (1Sm 26:7,11). Cetro é sinal de autoridade; lança na mão o tempo todo é sinal de medo armado, e Saul trocou um pelo outro. O fim é coerente com a vida: no monte Gilboa o mensageiro o encontraria \"encostado sobre a sua lança\" (2Sm 1:6), apoiado até o último instante na arma que nunca lhe deu segurança nenhuma.",
  },
  "dote-dos-cem-prepucios": {
    title: "O dote dos cem prepúcios",
    subtitle: "1Sm 18:25-27 — o preço da noiva que era uma sentença de morte",
    text: "Pela lei, quem tomava mulher pagava ao pai um dote em dinheiro ou bens (Êx 22:16-17; Gn 34:12), e Davi já dissera que não tinha com que: \"parece-vos pouco aos vossos olhos ser genro do rei, sendo eu homem pobre e desprezível?\" (1Sm 18:23). Saul viu a brecha: \"O rei não tem necessidade de dote, senão de cem prepúcios de filisteus, para se tomar vingança dos inimigos do rei\" (1Sm 18:25). O narrador desmonta o verniz patriótico na frase seguinte: \"porquanto Saul tentava fazer cair a Davi pela mão dos filisteus\". Exigir a marca da incircuncisão do inimigo era disfarçar de zelo religioso uma missão suicida — o rei queria o genro morto sem sujar as próprias mãos. Davi trouxe o dobro: \"feriu dentre os filisteus duzentos homens, e Davi trouxe os seus prepúcios, e os entregou todos ao rei\" (1Sm 18:27), e Mical foi sua. Cada armadilha que Saul monta acaba engrandecendo Davi, e é isso que o deixa inimigo dele \"todos os seus dias\" (1Sm 18:29).",
  },
  "janela-de-mical": {
    title: "A janela da casa de Davi",
    subtitle: "1Sm 19:12 — por onde a filha do rei desceu o marido",
    text: "\"Então Mical desceu a Davi por uma janela; e ele se foi, e fugiu, e escapou\" (1Sm 19:12). A casa israelita tinha janelas altas e estreitas, e descer alguém por uma delas era coisa de corda e de noite — a mesma fuga de Raabe com os espias (Js 2:15) e de Paulo em Damasco, descido num cesto pelo muro (At 9:25). O que torna esta cena grave é quem abriu a janela: uma filha escolheu o marido contra o pai, na noite em que o rei mandou vigias à casa do genro \"que o guardassem, e o matassem pela manhã\" (1Sm 19:11). Daqui em diante Davi não tem mais casa: começa nesta janela a vida de fugitivo que vai até o fim do livro. E o casal nunca mais se encontraria como naquela noite — a última vez que Mical aparece a uma janela é para ver Davi bailando diante da arca e desprezá-lo no seu coração (2Sm 6:16).",
  },
  "terafim-de-mical": {
    title: "A estátua posta na cama",
    subtitle: "1Sm 19:13,16 — o ídolo doméstico que ganhou tempo para Davi",
    text: "\"E Mical tomou uma estátua e a deitou na cama, e pôs-lhe à cabeceira uma pele de cabra, e a cobriu com uma coberta\" (1Sm 19:13). A palavra hebraica é TERAFIM: as imagens domésticas que as casas do oriente guardavam por proteção e por herança de família — as mesmas que Raquel furtou do pai e escondeu na albarda de um camelo (Gn 31:19,34). Do tamanho de um homem, ou ao menos capaz de fingir um sob a coberta, com a pele de cabra imitando cabelo na altura do travesseiro, o boneco enganou os mensageiros o tempo bastante: \"vindo, pois, os mensageiros, eis que a estátua estava na cama, e a pele de cabra à sua cabeceira\" (1Sm 19:16). O detalhe é desconcertante e o texto não o esconde: havia um ídolo dentro da casa do ungido do SENHOR. Deus livrou Davi naquela noite apesar do que estava no quarto, e não por causa disso — e a estátua muda, incapaz de fazer coisa alguma senão jazer numa cama, é a melhor crítica que a Escritura já escreveu contra esse tipo de deus.",
  },
  "pedra-de-ezel": {
    title: "A pedra de Ezel",
    subtitle: "1Sm 20:19,41 — o marco do campo onde Davi esperou o sinal",
    text: "\"E, ausentando-te tu três dias, desce apressadamente, e vai àquele lugar onde te escondeste no dia do negócio; e fica-te junto à pedra de Ezel\" (1Sm 20:19). Pedras grandes e isoladas serviam de ponto de referência no campo aberto de Israel, e esta já servira de esconderijo antes — Jônatas não precisa explicar onde fica. Foi o combinado possível entre dois homens que não podiam mais ser vistos juntos: um agachado atrás da pedra, o outro atirando flechas e falando com um moço para ser ouvido por quem não podia aparecer. Dado o sinal e mandado o moço embora, a pedra ainda escondeu o que ninguém devia ver: \"levantou-se Davi do lado do sul, e lançou-se sobre o seu rosto em terra, e inclinou-se três vezes; e beijaram-se um ao outro, e choraram juntos, mas Davi chorou muito mais\" (1Sm 20:41). O herdeiro do trono despediu-se do amigo agachado atrás de uma pedra, porque a corte do próprio pai virara território inimigo.",
  },
  "tres-flechas-de-jonatas": {
    title: "As três flechas de Jônatas",
    subtitle: "1Sm 20:20-38 — o código combinado no campo",
    text: "\"E eu atirarei três flechas para aquele lado, como se atirasse ao alvo\" (1Sm 20:20). O sinal não estava nas flechas, e sim no LADO: se Jônatas dissesse ao moço \"olha que as flechas estão para cá de ti\", havia paz; se dissesse \"olha que as flechas estão para lá de ti\", então \"vai-te embora, porque o Senhor te deixa ir\" (1Sm 20:21-22). Toda a mensagem cabia numa frase gritada a um menino que não fazia ideia de nada — \"e o moço não entendeu coisa alguma; só Jônatas e Davi sabiam deste negócio\" (1Sm 20:39). Treinar arco no campo com um pajem era a coisa mais banal que um príncipe podia fazer numa manhã, e foi exatamente por isso que funcionou. O conteúdo, porém, era uma sentença: o pai atirara a lança no filho à mesa da lua nova, e não havia mais volta para Davi. Com três flechas e uma ordem gritada, Jônatas mandou embora, para salvá-lo, o homem que ficaria com o seu trono.",
  },
  "paes-da-proposicao": {
    title: "Os pães da proposição",
    subtitle: "1Sm 21:6 — o pão santo dado ao fugitivo em Nobe",
    text: "\"Então o sacerdote lhe deu o pão sagrado, porquanto não havia ali outro pão senão os pães da proposição, que se tiraram de diante do Senhor, para se pôr ali pão quente no dia em que aquele se tirasse\" (1Sm 21:6). Eram doze pães de flor de farinha, postos em duas fileiras sobre a mesa pura perante o SENHOR e trocados a cada sábado, e a lei era explícita quanto ao destino do pão retirado: \"será de Arão e de seus filhos, os quais o comerão no lugar santo, porque uma coisa santíssima é para eles\" (Lv 24:5-9). Aimeleque entregou a um fugitivo faminto o que só sacerdote podia comer, e a Escritura não o repreende por isso em lugar nenhum. Jesus usaria exatamente esta cena contra quem o acusava de quebrar o sábado: \"não tendes lido o que fez Davi, quando teve fome... como entrou na casa de Deus, e comeu os pães da proposição, que não lhe era lícito comer, nem aos que com ele estavam, mas só aos sacerdotes?\" (Mt 12:3-4). A conclusão é dele: \"misericórdia quero, e não sacrifício\" (Mt 12:7). O pão que estava diante de Deus foi feito para alimentar gente — e o sacerdote que entendeu isso pagou com a vida no capítulo seguinte.",
  },
  "portas-de-gate": {
    title: "As portas de Gate",
    subtitle: "1Sm 21:13 — os batentes esgravatados pelo rei que se fingiu doido",
    text: "\"Por isso se contrafez diante dos olhos deles, e fez-se como doido entre as suas mãos, e esgravatava nas portas de entrada, e deixava correr a saliva pela barba\" (1Sm 21:13). Davi tinha ido pedir asilo justamente na cidade natal de Golias, com a espada do gigante à cintura, e foi reconhecido logo no portão: \"não é este Davi, o rei da terra?\" (1Sm 21:11). O portão era o lugar público por excelência da cidade antiga — tribunal, mercado, posto de guarda —, e foi ali, à vista de todos, que o vencedor do vale do carvalho arranhou a madeira e deixou a baba escorrer na barba para não ser morto. Aquis o expulsou com desprezo, e o desprezo foi a salvação. Os títulos dos Salmos 34 e 56 amarram esses dois cânticos a esta fuga, e o que sai da humilhação é louvor: \"Louvarei ao SENHOR em todo o tempo; o seu louvor estará continuamente na minha boca\" (Sl 34:1). O homem que fingiu não ter juízo diante do rei de Gate estava aprendendo a não temer mais ninguém além de Deus.",
  },
  "caverna-de-adulao": {
    title: "A caverna de Adulão",
    subtitle: "1Sm 22:1-2 — onde se ajuntaram os quatrocentos",
    text: "\"Então Davi se retirou dali, e escapou para a caverna de Adulão; e ouviram-no seus irmãos e toda a casa de seu pai, e desceram ali para ter com ele\" (1Sm 22:1). Adulão fica na descida de Judá para a planície filistéia, região de calcário furado de grutas que serviam de abrigo a rebanho e a foragido. Ali se formou o exército mais improvável da Escritura: \"e ajuntou-se a ele todo o homem que se achava em aperto, e todo o homem endividado, e todo o homem de espírito desgostoso, e ele se fez capitão deles; e eram com ele uns quatrocentos homens\" (1Sm 22:2). Não eram voluntários patrióticos: eram os arruinados do reinado de Saul, e foi desse ajuntamento que saíram os valentes de Davi. Três deles voltariam a esta mesma caverna anos depois, rompendo o arraial filisteu só para trazer água da cisterna de Belém a um homem com saudade de casa (2Sm 23:13-17). Hebreus dá o endereço dos que o mundo não merecia: \"errantes pelos desertos, e montes, e pelas covas e cavernas da terra\" (Hb 11:38).",
  },
  "bosque-de-herete": {
    title: "O bosque de Herete",
    subtitle: "1Sm 22:5 — a mata de Judá para onde o profeta mandou Davi",
    text: "\"Porém o profeta Gade disse a Davi: Não fiques naquele lugar forte; vai, e entra na terra de Judá. Então Davi saiu, e foi para o bosque de Herete\" (1Sm 22:5). É a primeira aparição de Gade, que seria o profeta ao lado de Davi pelo resto da vida dele (2Sm 24:11), e a ordem é contraintuitiva: sair do refúgio seguro em Moabe, onde até os pais estavam protegidos, e voltar justamente para o território que Saul patrulhava. Segurança e obediência nem sempre apontam para o mesmo lado. A mata de Herete, nas colinas de Judá, não tinha muro nem porta — mas era o chão da sua própria tribo, a terra onde o futuro rei precisava estar. Davi obedeceu sem discutir, e foi essa mudança que chegou aos ouvidos de Saul, sentado com a lança na mão debaixo do arvoredo de Gibeá, e desencadeou a chacina de Nobe (1Sm 22:6-19).",
  },
  "nobe-cidade-dos-sacerdotes": {
    title: "Nobe, a cidade dos sacerdotes",
    subtitle: "1Sm 22:11,19 — o santuário de Aimeleque passado a fio de espada",
    text: "Depois da ruína de Siló, o serviço do tabernáculo passou para Nobe, povoado perto de Jerusalém onde morava a casa sacerdotal de Aimeleque, filho de Aitube: \"então o rei mandou chamar a Aimeleque, sacerdote, filho de Aitube, e a toda a casa de seu pai, os sacerdotes que estavam em Nobe; e todos eles vieram ao rei\" (1Sm 22:11). O crime deles foi dar pão e espada a um fugitivo e consultar a Deus por ele — coisa que Aimeleque fizera de boa-fé, tomando Davi pelo genro leal do rei (1Sm 22:14-15). Nenhum criado quis levantar a mão contra os sacerdotes do SENHOR; Doegue, o edomeu, quis: \"e matou naquele dia oitenta e cinco homens que vestiam éfode de linho\" (1Sm 22:18). Depois foi a vez do povoado inteiro: \"também a Nobe, cidade destes sacerdotes, passou a fio de espada, desde o homem até à mulher, desde os meninos até aos de peito\" (1Sm 22:19) — o mesmo extermínio total que Saul se recusara a executar em Amaleque, agora aplicado contra Israel. E naquela matança cumpriu-se, pela mão do rei mais culpado do livro, a sentença antiga sobre a casa de Eli (1Sm 2:31-33).",
  },
  "efode-de-abiatar": {
    title: "O éfode de Abiatar",
    subtitle: "1Sm 22:20; 23:6,9; 30:7 — a veste da consulta salva do massacre",
    text: "Um só filho de Aimeleque escapou de Nobe, \"cujo nome era Abiatar, o qual fugiu para Davi\" (1Sm 22:20) — e não fugiu de mãos vazias: \"desceu com o éfode na mão\" (1Sm 23:6). O éfode era a veste do sumo sacerdote, feita \"de ouro, e de azul, e de púrpura, e de carmesim, e de linho fino torcido\" (Êx 28:6), e nele ia o peitoral do juízo com o Urim e o Tumim, pelos quais se buscava a decisão de Deus (Êx 28:30). O que Saul destruiu naquele dia, Davi recebeu: o rei ficaria sem resposta do céu, \"nem por sonhos, nem por Urim, nem por profetas\" (1Sm 28:6), enquanto o fugitivo diria \"Traze aqui o éfode\" e ouviria o SENHOR — em Queila (1Sm 23:9-12) e em Ziclague (1Sm 30:7-8). O pastor que ninguém consultava tornou-se o homem que não dá um passo sem perguntar. Muito depois, Salomão deporia Abiatar do sacerdócio, \"para cumprir a palavra do Senhor, que tinha falado sobre a casa de Eli em Siló\" (1Rs 2:27) — a última página de uma sentença dada quando Samuel ainda era menino.",
  },
  "eiras-de-queila": {
    title: "As eiras de Queila",
    subtitle: "1Sm 23:1 — a colheita que os filisteus vinham roubar",
    text: "\"Eis que os filisteus pelejam contra Queila, e saqueiam as eiras\" (1Sm 23:1). A eira era um terreiro de rocha ou de terra batida, fora dos muros e em lugar alto para pegar vento, onde se malhava e joeirava o grão depois da sega — ali ficava exposto, a céu aberto, o ano inteiro de comida de uma cidade. Saqueá-la não é escaramuça de fronteira: é fome garantida no inverno, a mesma tática com que Midiã sufocou Israel no tempo de Gideão, sem deixar \"mantimento em Israel, nem ovelhas, nem bois, nem jumentos\" (Jz 6:4). O rei, que devia defender a cidade, estava ocupado caçando Davi; foi o proscrito quem consultou o SENHOR, desceu e \"livrou os moradores de Queila\" (1Sm 23:5). E foram esses mesmos moradores que o entregariam se ele ficasse (1Sm 23:12). Davi salvou uma cidade que não o salvaria — e desceu assim mesmo, porque a ordem viera de Deus.",
  },
  "portas-e-ferrolhos-de-queila": {
    title: "As portas e ferrolhos de Queila",
    subtitle: "1Sm 23:7 — o portão que Saul leu como armadilha",
    text: "\"E foi anunciado a Saul que Davi tinha ido a Queila, e disse Saul: Deus o entregou nas minhas mãos, pois está encerrado, entrando numa cidade de portas e ferrolhos\" (1Sm 23:7). Portas de madeira reforçada e travessas de ferrolho eram o que fazia de um povoado uma cidade fortificada: proteção contra o inimigo de fora e, para quem está cercado, uma ratoeira. O que Davi ganhou ao livrar Queila, podia perder por continuar dentro dela. Repare no que Saul faz com a teologia — chama de entrega divina o que era apenas a geometria de um muro, e usa o nome de Deus para abençoar a própria obsessão. Davi não confia em muro nem em pressentimento: manda trazer o éfode e pergunta duas coisas concretas, se Saul desceria e se os cidadãos o entregariam, e ouve sim para as duas (1Sm 23:9-12). Saiu naquele mesmo dia com os seus seiscentos homens; a cidade que ele salvara teria fechado as portas com ele dentro.",
  },
  "outeiro-de-haquila": {
    title: "O outeiro de Haquilá",
    subtitle: "1Sm 23:19; 26:1 — o esconderijo delatado duas vezes pelos zifeus",
    text: "\"Não se escondeu Davi entre nós, nos lugares fortes no bosque, no outeiro de Haquilá, que está à mão direita de Jesimom?\" (1Sm 23:19). Jesimom é o ermo que desce para o mar Morto, e Haquilá era um alto sobre esse deserto, com vista para todos os lados — ótimo para se esconder e péssimo se alguém da região resolver contar. Foi o que fizeram os zifeus, gente da própria tribo de Judá, e não uma vez só: subiram a Gibeá em 1Sm 23:19 e tornaram a subir, com quase as mesmas palavras, em 1Sm 26:1. Saul agradece aos delatores com bênção religiosa — \"Bendito sejais vós do Senhor, porque vos compadecestes de mim\" (1Sm 23:21) —, e o Salmo 54, que o título liga a essa traição, responde por Davi: \"eis que Deus é o meu ajudador\" (Sl 54:4). Na segunda vez o rei acampou exatamente ali, no outeiro que lhe entregaram, e foi ali que perdeu a lança e a bilha de água enquanto dormia (1Sm 26:3-12). O esconderijo delatado acabou virando o palco da vergonha de quem o comprou.",
  },
  "sela-hamalecote": {
    title: "O Rochedo das Divisões",
    subtitle: "1Sm 23:28 — Sela-Hamalecote, onde os dois caminhos se separaram",
    text: "No deserto de Maom o cerco se fechou: \"e Saul ia deste lado do monte, e Davi e os seus homens do outro lado do monte; e, temeroso, Davi se apressou a escapar de Saul; Saul, porém, e os seus homens cercaram a Davi e aos seus homens, para lançar mão deles\" (1Sm 23:26). Faltava contornar a montanha, e nada mais. Foi então que chegou o mensageiro: \"Apressa-te, e vem, porque os filisteus com ímpeto entraram na terra\" (1Sm 23:27), e o rei teve de largar a caçada no último instante. \"Por isso Saul voltou de perseguir a Davi, e foi ao encontro dos filisteus; por esta razão aquele lugar se chamou Rochedo das Divisões\" (1Sm 23:28) — em hebraico Sela-Hamalecote, a rocha da separação, marco que ficou na geografia como nome de um livramento. E o livramento não teve nada de espetacular: nenhum anjo, nenhum trovão, apenas um recado de guerra chegando na hora exata. O narrador já dissera o essencial um pouco antes: \"Saul o buscava todos os dias, porém Deus não o entregou na sua mão\" (1Sm 23:14).",
  },
  "fonte-de-en-gedi": {
    title: "A fonte de En-Gedi",
    subtitle: "1Sm 23:29; 24:1 — o oásis à beira do mar Morto",
    text: "\"E subiu Davi dali, e ficou nos lugares fortes de En-Gedi\" (1Sm 23:29). O nome quer dizer FONTE DO CABRITO: uma nascente que jorra no alto de um paredão sobre o mar Morto e desce em cascata pela rocha, criando uma faixa de verde improvável no meio da terra mais seca de Israel. Água doce o ano inteiro, tamareiras, cavernas nas encostas — refúgio perfeito para seiscentos homens, e por isso mesmo o primeiro lugar onde procurar: \"anunciaram-lhe, dizendo: Eis que Davi está no deserto de En-Gedi\" (1Sm 24:1). A fama do lugar chegou até a poesia de amor de Israel: \"como um ramalhete de hena nas vinhas de En-Gedi, é para mim o meu amado\" (Ct 1:14). Perseguido, sem casa e sem reino, Davi foi levado por Deus ao único jardim daquele deserto — e foi ali, com o inimigo entregue nas mãos, que ele mostrou por que merecia o trono.",
  },
  "penhas-das-cabras-montesas": {
    title: "As penhas das cabras montesas",
    subtitle: "1Sm 24:2 — os cumes onde Saul subiu com três mil escolhidos",
    text: "\"Então tomou Saul três mil homens, escolhidos dentre todo o Israel, e foi em busca de Davi e dos seus homens, até sobre os cumes das penhas das cabras montesas\" (1Sm 24:2). A cabra montesa — o íbex que ainda hoje anda pelos paredões de En-Gedi — salta em cornijas onde nenhum homem se firma, e o nome do lugar diz o que é aquele terreno: chão de bicho, não de exército. Três mil soldados escolhidos subindo despenhadeiros de cabra atrás de um homem só é a medida exata da obsessão de Saul, e a medida da inutilidade dela. \"Os altos montes são para as cabras monteses, e os rochedos são refúgio para os coelhos\" (Sl 104:18): o Deus que deu a cada criatura o seu esconderijo tinha guardado um para Davi. No fim, o rei que escalou os cumes atrás do fugitivo desceu sozinho a uma caverna e ficou nas mãos dele sem perceber.",
  },
  "currais-do-caminho-de-en-gedi": {
    title: "Os currais de ovelhas do caminho",
    subtitle: "1Sm 24:3 — o aprisco junto à boca da caverna",
    text: "\"E chegou a uns currais de ovelhas no caminho, onde estava uma caverna\" (1Sm 24:3). Currais assim eram cercas baixas de pedra solta, muitas vezes encostadas à boca de uma gruta, que servia de fundo e de abrigo contra o frio e a fera; o pastor dormia na entrada e virava ele mesmo a porta do aprisco. Nada mais banal na estrada de En-Gedi, e é justamente por isso que o lugar não despertou suspeita nenhuma em Saul. O detalhe é uma ironia calada do narrador: o rei parou para descansar num curral de ovelhas, e lá dentro estava o pastor que Deus tirara do rebanho para apascentar Israel. Jesus retomaria as duas imagens de uma vez: \"eu sou a porta das ovelhas\" e \"eu sou o bom Pastor\" (Jo 10:7,11). Naquela manhã, quem entrou no aprisco foi o lobo — e quem o poupou foi o pastor.",
  },
  "caverna-de-en-gedi": {
    title: "A caverna de En-Gedi",
    subtitle: "1Sm 24:3-8 — onde Saul entrou sem saber quem estava nos fundos",
    text: "\"E entrou nela Saul, a cobrir seus pés; e Davi e os seus homens estavam nos fundos da caverna\" (1Sm 24:3). \"A cobrir seus pés\" é o modo pudico com que o hebraico diz que o rei entrou para fazer as suas necessidades: sozinho, agachado, de costas, com o manto no chão. As grutas de calcário de En-Gedi são fundas e ramificadas, e quem vem da luz não enxerga nada lá dentro, enquanto quem está no escuro vê perfeitamente a silhueta recortada na entrada. Os homens leram a coincidência como sentença do céu: \"Eis aqui o dia, do qual o Senhor te diz: Eis que te dou o teu inimigo nas tuas mãos\" (1Sm 24:4). Davi leu de outro jeito — oportunidade não é ordem — e a única coisa que a sua lâmina tocou foi um pedaço de pano. Saiu depois e gritou da boca da caverna o que poderia ter feito e não fez (1Sm 24:8-11); e Saul, que entrara ali como caçador, saiu chorando e chamando-o de filho.",
  },
  "aba-da-capa-de-saul": {
    title: "A orla do manto de Saul",
    subtitle: "1Sm 24:4-5,11 — o retalho cortado mansamente no escuro",
    text: "\"E levantou-se Davi, e mansamente cortou a orla do manto de Saul\" (1Sm 24:4). A orla da veste não era enfeite: era nela que Israel usava as franjas com o cordão de azul, \"para que, vendo-as, vos lembreis de todos os mandamentos do Senhor\" (Nm 15:38-39), e no manto de um rei ela carregava a dignidade do cargo. Por isso a consciência não o deixou em paz por causa de um pedaço de pano: \"sucedeu, porém, que depois o coração doeu a Davi, por ter cortado a orla do manto de Saul\" (1Sm 24:5) — um homem que se arrepende do que a maioria nem contaria. E o retalho vira, na boca da caverna, a prova de uma inocência: \"olha, pois, meu pai, vê aqui a orla do teu manto na minha mão; porque cortando-te eu a orla do manto, não te matei\" (1Sm 24:11). O eco é exato e proposital: nove capítulos antes, foi Saul quem pegou pela orla da capa de SAMUEL e a rasgou, e ouviu na hora a sentença — \"o Senhor tem rasgado de ti hoje o reino de Israel, e o tem dado ao teu próximo, melhor do que tu\" (1Sm 15:27-28). Um rasgou o manto do profeta e perdeu o reino; o outro cortou a orla do rei e se recusou a tomar o reino pela força. O pano na mão de Davi é o trono que ele não quis arrancar.",
  },
  "sepultura-de-samuel": {
    title: "A sepultura de Samuel em Ramá",
    subtitle: "1Sm 25:1 — o túmulo do profeta na sua própria casa",
    text: "\"E faleceu Samuel, e todo o Israel se ajuntou, e o prantearam, e o sepultaram na sua casa, em Ramá\" (1Sm 25:1). Sepultar dentro da propriedade da família era costume em Israel, e Ramá era tudo para ele: a cidade natal (1Sm 1:19), a casa para onde voltava depois de julgar em circuito e o lugar onde erguera o seu altar ao SENHOR (1Sm 7:17). Com ele se foi o último juiz, o profeta que ungiu os dois primeiros reis e o único homem que ainda podia falar a Saul na cara. A nota é curta demais para o peso que tem — meio versículo para o funeral nacional de quem carregou Israel da queda de Siló até a monarquia. O narrador a repete em 1Sm 28:3, e não por descuido: é a lembrança de que o profeta estava morto e enterrado na noite em que Saul foi procurar uma adivinha em En-Dor para tentar chamá-lo de volta.",
  },
  "presente-de-abigail": {
    title: "O presente de Abigail",
    subtitle: "1Sm 25:18,27 — os jumentos carregados que detiveram uma vingança",
    text: "\"Então Abigail se apressou, e tomou duzentos pães, e dois odres de vinho, e cinco ovelhas guisadas, e cinco medidas de trigo tostado, e cem cachos de passas, e duzentas pastas de figos passados, e os pôs sobre jumentos\" (1Sm 25:18). É a lista de comida mais detalhada do livro, e cada item responde a uma recusa: onde Nabal dissera \"tomaria eu, pois, o meu pão, e a minha água, e a carne das minhas reses que degolei para os meus tosquiadores, e o daria a homens que eu não sei donde vêm?\" (1Sm 25:11), a mulher dele mandou pão, vinho e carne em quantidade de festa de tosquia. As pastas de figos e os cachos de passas eram o alimento prensado de estrada, próprio para sustentar quatrocentos homens armados no deserto. Ela não veio pedir perdão de mãos vazias: \"e agora este é o presente que trouxe a tua serva a meu senhor; seja dado aos moços que seguem ao meu senhor\" (1Sm 25:27). E junto com a carga veio o conselho que salvou Davi de si mesmo — \"bendito o teu conselho, e bendita tu, que hoje me impediste de derramar sangue, e de vingar-me pela minha própria mão\" (1Sm 25:33).",
  },
  "banquete-de-nabal": {
    title: "O banquete de Nabal",
    subtitle: "1Sm 25:36 — \"como banquete de rei\", na noite em que ele não soube de nada",
    text: "\"E, vindo Abigail a Nabal, eis que tinha em sua casa um banquete, como banquete de rei; e o coração de Nabal estava alegre nele, e ele já muito embriagado\" (1Sm 25:36). A tosquia era a festa da economia pastoril, o fim da colheita da lã, com comida e bebida fartas para todos os trabalhadores — e o dono de três mil ovelhas e mil cabras podia armar mesa de palácio. A comparação \"como banquete de rei\" é uma pontada do narrador: enquanto o verdadeiro ungido do SENHOR passava necessidade no deserto, um fazendeiro que lhe negara pão bancava o monarca em Maom. Naquela mesma hora quatrocentas espadas subiam o monte para matar todo homem da casa dele, e ele não fazia ideia; a mulher \"não lhe deu a entender coisa alguma, pequena nem grande, até à luz da manhã\". O nome dele quer dizer LOUCO, e Abigail já explicara por quê: \"tal é ele qual é o seu nome. Nabal é o seu nome, e a loucura está com ele\" (1Sm 25:25). O rico da parábola de Jesus também tinha os celeiros cheios e uma só noite pela frente: \"Louco! esta noite te pedirão a tua alma\" (Lc 12:20).",
  },
  "nabal-feito-pedra": {
    title: "O coração de Nabal, feito pedra",
    subtitle: "1Sm 25:37-38 — os dez dias entre a notícia e o golpe",
    text: "\"Sucedeu, pois, que pela manhã, estando Nabal já livre do vinho, sua mulher lhe deu a entender aquelas coisas; e se amorteceu o seu coração, e ficou ele como pedra\" (1Sm 25:37). O quadro é o de um homem fulminado: o susto de saber das quatrocentas espadas que quase chegaram e a humilhação de descobrir que fora a mulher, e não ele, quem salvou a casa. Ficou assim dez dias, vivo e imóvel, antes do fim — \"e aconteceu que, passados quase dez dias, feriu o Senhor a Nabal, e este morreu\" (1Sm 25:38). A imagem é a do coração endurecido que a Escritura promete trocar: \"tirarei da vossa carne o coração de pedra, e vos darei um coração de carne\" (Ez 36:26). E é a única morte do capítulo: Davi cingira a espada para não deixar vivo um homem sequer daquela casa, e no fim não precisou levantar a mão para nada. \"Bendito seja o Senhor, que julgou a causa de minha afronta recebida da mão de Nabal\" (1Sm 25:39) — quem entrega a vingança não fica sem justiça, fica sem sangue nas mãos.",
  },
  "galheta-de-agua-de-hasila": {
    title: "A bilha de água da cabeceira de Saul",
    subtitle: "1Sm 26:11-16 — a prova trazida do arraial adormecido",
    text: "\"Agora, porém, toma a lança que está à sua cabeceira e a bilha de água, e vamo-nos\" (1Sm 26:11). No deserto de Zife a bilha à cabeceira não era luxo nenhum: era o que um homem tinha de mais necessário durante a noite, ao alcance da mão, e no acampamento inteiro só o rei dormia com uma ao lado da lança fincada no chão. Foi exatamente isso que Davi escolheu levar em lugar da vida de Saul, e o texto explica por que ninguém acordou: \"porque da parte do Senhor havia caído sobre eles um profundo sono\" (1Sm 26:12). Do alto do monte, ao longe, ele ergueu as duas peças e humilhou o capitão do exército com uma pergunta: \"vede, pois, agora onde está a lança do rei, e a bilha de água, que tinha à sua cabeceira\" (1Sm 26:16). É a segunda vez que Davi tem Saul nas mãos e a segunda vez que sai de lá com um objeto em vez de um cadáver — antes uma orla de manto, agora uma bilha de água. Abisai queria resolver com uma lançada só; Davi respondeu com a regra que governou toda a sua clandestinidade: \"quem estendeu a sua mão contra o ungido do Senhor, e ficou inocente?\" (1Sm 26:9).",
  },
  "vara-de-jonatas": {
    title: "A vara na mão de Jônatas",
    subtitle: "1Sm 14:27 — a ponta que tocou o favo e aclarou os olhos",
    text: "\"Jônatas, porém, não tinha ouvido quando seu pai conjurara o povo, e estendeu a ponta da vara que tinha na mão, e a molhou no favo de mel, e tornou a mão à boca, e aclararam-se os seus olhos\" (1Sm 14:27). A vara é a haste que o guerreiro levava na mão — apoio na subida dos penhascos e cabo da arma —, e aqui ela faz o serviço mais humilde possível: alcançar mel sem sujar a mão. O gesto é pequeno e as consequências são enormes. Quem lhe conta do juramento vê o efeito na hora: o povo estava desfalecido, e um só toque de mel reacendeu os olhos de um homem. \"Meu pai turbou a terra\", respondeu ele (1Sm 14:29) — e à noite as sortes cairiam sobre a sua cabeça por causa desta vara.",
  },
  // ---- 2 SAMUEL 18: o bosque, o carvalho, a cova e a coluna ----
  "grande-carvalho-de-efraim": {
    title: "O grande carvalho do bosque de Efraim",
    subtitle: "2Sm 18:9-14 — a árvore que prendeu o príncipe pela cabeça",
    text: "O carvalho da Palestina (o Quercus ithaburensis, que ainda cresce em Gileade) é uma árvore de tronco curto e copa larguíssima, de galharia baixa e emaranhada — sombra boa para o gado e armadilha para quem passa a cavalo. Foi nela que a rebelião acabou: \"entrando o mulo debaixo dos espessos ramos de um grande carvalho, pegou-se-lhe a cabeça no carvalho, e ficou pendurado entre o céu e a terra\" (2Sm 18:9). A frase é teológica antes de ser topográfica: suspenso, sem tocar o chão nem alcançar o alto, o filho que quis o trono do pai fica exatamente entre os dois mundos, sem ser aceito por nenhum. Nem o inimigo o derrubou nem o exército o socorreu — a árvore o segurou até Joabe chegar. O narrador já preparara a cena: \"foram mais os do povo que o bosque consumiu do que os que a espada consumiu naquele dia\" (2Sm 18:8), e Absalão foi o último e maior nome dessa conta. E a cabeleira de que ele tanto se orgulhava (2Sm 14:26) não é citada aqui — o texto diz só \"a cabeça\", e deixa a ironia por conta do leitor.",
  },
  "mula-de-absalao": {
    title: "A mula de Absalão",
    subtitle: "2Sm 18:9 — a montaria real que passou adiante sem o dono",
    text: "A mula não era um animal qualquer em Israel: era a montaria dos filhos do rei (2Sm 13:29) e o sinal público da sucessão, tanto que Salomão seria levado à unção montado na mula do próprio Davi (1Rs 1:33). Absalão entra no bosque montado nela como quem já se considera rei. E é dela que vem a imagem mais cruel do capítulo: \"e o mulo, que estava debaixo dele, passou adiante\" (2Sm 18:9). O trono continuou andando; o pretendente ficou pendurado. Um animal treinado, sem cavaleiro, seguindo pelo mato — não há símbolo mais exato para uma usurpação que perdeu o seu homem no meio do caminho.",
  },
  "tres-dardos-de-joabe": {
    title: "Os três dardos de Joabe",
    subtitle: "2Sm 18:14 — a ordem do rei desobedecida a sangue-frio",
    text: "Dardo é a azagaia curta de arremesso, arma de mão fechada que se cravava a curta distância — não é a lança de formatura, é a arma de quem quer acabar depressa. Davi tinha dito diante de todo o exército: \"Brandamente tratai, por amor de mim, ao jovem Absalão\" (2Sm 18:5), e o soldado que achou o rapaz preso recusou dez moedas de prata e um cinto para não tocar nele. Joabe não discutiu teologia nem lealdade: \"Não me demorarei assim contigo aqui. E tomou três dardos, e traspassou com eles o coração de Absalão, estando ele ainda vivo no meio do carvalho\" (2Sm 18:14). Os três ferros no coração de um homem indefeso são o retrato do general que já matara Abner pelas costas e mataria Amasa com um abraço: eficiente, leal ao reino e absolutamente sem freio. E são também o começo do fim dele — Davi jamais lhe perdoou este dia (1Rs 2:5-6).",
  },
  "espada-que-o-bosque-superou": {
    title: "A espada que o bosque superou",
    subtitle: "2Sm 18:8 — a arma que perdeu a conta para a floresta",
    text: "É a espada larga de bronze e ferro dos exércitos de Israel, a arma que decide as batalhas do livro inteiro — e neste capítulo ela aparece derrotada pela paisagem. \"Porque ali se derramou a batalha sobre a face de toda aquela terra; e foram mais os do povo que o bosque consumiu do que os que a espada consumiu naquele dia\" (2Sm 18:8). Vinte mil homens caíram, e a maioria não morreu na peleja: morreu perdida, despenhada, presa nos barrancos e no matagal do bosque de Efraim. O verbo é o mesmo para os dois — o bosque \"consumiu\" como a espada consome —, e o efeito é o de uma terra que se levanta contra a guerra civil. Por isso a espada entra em cena caída no chão, entre as árvores: aquele dia não foi vitória de ninguém.",
  },
  "montao-de-pedras-de-absalao": {
    title: "O mui grande montão de pedras",
    subtitle: "2Sm 18:17 — o túmulo sem nome no meio do bosque",
    text: "Cobrir um corpo com um montão de pedras era, em Israel, o sepultamento reservado ao maldito: assim foram enterrados Acã no vale de Acor (Js 7:26) e o rei de Ai à porta da sua cidade (Js 8:29). Não é homenagem, é selo — pedra sobre pedra para que a memória fique presa embaixo. \"E tomaram a Absalão, e o lançaram no bosque, numa grande cova, e levantaram sobre ele um mui grande montão de pedras\" (2Sm 18:17). Sem inscrição, sem coluna, sem cidade por perto: o filho do rei acabou debaixo de um amontoado anônimo no meio do mato. O narrador põe o versículo seguinte logo em seguida, de propósito, para que o leitor compare este montão com o monumento que o próprio Absalão levantara em vida.",
  },
  "coluna-de-absalao": {
    title: "A coluna de Absalão, no vale do rei",
    subtitle: "2Sm 18:18 — o monumento que ele levantou para si mesmo",
    text: "A massebá, a pedra em pé, era o marco com que os antigos fixavam uma memória: um pacto, uma teofania, um túmulo. Absalão usou uma para si próprio, ainda em vida: \"Ora, Absalão, quando ainda vivia, tinha tomado e levantado para si uma coluna, que está no vale do rei, porque dizia: Filho nenhum tenho para conservar a memória do meu nome\" (2Sm 18:18). A frase espanta, porque 2Sm 14:27 diz que ele teve três filhos — ou morreram antes dele, ou ele já não contava com nenhum deles; de um jeito ou de outro, o homem que se achava dono do futuro só tinha uma pedra para garanti-lo. \"E chamou aquela coluna pelo seu próprio nome; por isso até ao dia de hoje se chama o Pilar de Absalão.\" O narrador encaixa este versículo exatamente entre a cova no bosque e o mensageiro que corre a contar tudo: um homem tem duas sepulturas neste capítulo, a que ele mesmo construiu com o próprio nome gravado, e a que os outros lhe deram, sem nome nenhum. A que a Bíblia registra como verdadeira é a segunda.",
  },
  "porta-de-maanaim": {
    title: "A porta de Maanaim",
    subtitle: "2Sm 18:4,24,33 — o portão da espera e do pranto",
    text: "A porta de uma cidade antiga não era só uma abertura no muro: era um corpo de guarda com câmaras, bancos de pedra e um vão duplo entre torres — o tribunal, a praça e o púlpito da cidade toda. Maanaim, em Gileade, foi o refúgio de Davi na fuga, e o portão dela vê os dois lados do dia: primeiro o rei em pé ao lado dele, passando em revista o exército que sai \"em centenas e em milhares\" (2Sm 18:4); depois o mesmo rei sozinho, \"assentado entre as duas portas\" (2Sm 18:24), com a sentinela no terraço acima, à espera de um corredor no horizonte. Quando a notícia chega, ele não fica no lugar público: \"subiu à sala que estava por cima da porta, e chorou\" (2Sm 18:33). O quarto sobre o portão é o único canto privado que um rei tem numa cidade emprestada — e é dali que sai o grito que todo o exército escuta: \"Meu filho Absalão, meu filho, meu filho, Absalão!\"",
  },

  // ---- 2 SAMUEL 19: o luto, o assento à porta e a volta pelo Jordão ----
  "coroa-de-davi": {
    title: "A coroa de Davi",
    subtitle: "2Sm 19:4 — a insígnia largada por um pai que não quer ser rei",
    text: "A coroa de Davi não era herança: foi tomada em guerra. \"E tirou a coroa da cabeça do seu rei, cujo peso era de um talento de ouro, e havia nela pedras preciosas, e foi posta sobre a cabeça de Davi\" (2Sm 12:30) — um talento é perto de trinta e quatro quilos de ouro, um peso que ninguém carrega na cabeça o dia inteiro e que o texto cita justamente para dizer o que custa reinar. Nestes capítulos ela aparece no chão. Enquanto o exército volta da vitória, \"Estava, pois, o rei com o rosto coberto; e o rei gritava a alta voz: Meu filho Absalão, Absalão meu filho, meu filho!\" (2Sm 19:4) — e Joabe entra para lhe dizer que um rei não tem direito de escolher entre o filho e o povo que morreu por ele. O ouro fica de lado no palco porque é isso que a cena mostra: um homem que naquela hora só queria ser pai. Depois ele se levanta, e a coroa volta à cabeça — mas a Bíblia registra a ordem exata: primeiro o luto, depois o governo.",
  },
  "assento-do-rei-a-porta": {
    title: "O assento do rei à porta",
    subtitle: "2Sm 19:8 — o trono levado para o lugar onde o povo passa",
    text: "Assentar-se à porta era o ato de governo mais visível que um rei do antigo Oriente podia praticar: ali se julgavam as causas, se selavam os negócios e se recebiam os que chegavam de fora. Depois da repreensão dura de Joabe — \"Hoje envergonhaste o rosto de todos os teus servos, que livraram hoje a tua vida\" (2Sm 19:5) —, Davi faz exatamente isso: \"Então o rei se levantou, e se assentou à porta; e fizeram saber a todo o povo dizendo: Eis que o rei está assentado à porta\" (2Sm 19:8). Não houve discurso; bastou o assento ocupado no lugar de sempre. É o mesmo portão onde ele chorara sozinho no capítulo anterior, agora aberto de manhã e cheio de gente. Um trono num salão é poder; um trono na porta é poder disponível — e era disso que o reino precisava para não se desfazer naquela semana.",
  },
  "recado-aos-anciaos-de-juda": {
    title: "O recado aos anciãos de Judá",
    subtitle: "2Sm 19:11-14 — o rolo que reconquistou um reino sem uma espada",
    text: "É uma carta oficial despachada pelas mãos dos dois sumos sacerdotes, Zadoque e Abiatar, que Davi mantinha em Jerusalém justamente como o seu canal seguro (2Sm 15:35-36). O conteúdo é puro tato político e puro parentesco: \"Falai aos anciãos de Judá, dizendo: Por que seríeis vós os últimos em tornar a trazer o rei para a sua casa?\" (2Sm 19:11), e logo depois, \"Vós sois meus irmãos, meus ossos e minha carne sois vós\" (2Sm 19:12). No mesmo rolo vai a oferta que desarma o último foco de revolta: o comando do exército prometido a Amasa, o general de Absalão. O resultado é imediato — \"Assim moveu ele o coração de todos os homens de Judá, como o de um só homem\" (2Sm 19:14). Davi não voltou a Jerusalém por conquista; voltou por convite arrancado com palavras, e este pedaço de couro escrito é a arma que o fez.",
  },
  "barca-do-rei": {
    title: "A barca do vau do Jordão",
    subtitle: "2Sm 19:18 — a travessia da volta ao reino",
    text: "O Jordão nos vaus baixos de Gileade se atravessa a pé em tempo seco, mas a casa do rei — mulheres, crianças, bagagem — precisava de uma balsa. É o que o texto registra: \"E, atravessando a barca, para fazer passar a casa do rei e para fazer o que bem parecesse aos seus olhos, então Simei, filho de Gera, se prostrou diante do rei, quando ele passava o Jordão\" (2Sm 19:18). O rio é a fronteira entre o exílio e o trono, e tudo o que importa neste capítulo acontece na beira dele: Simei implorando por uma vida que Abisai queria tirar, Mefibosete descalço e por barbear, Barzilai de oitenta anos recusando ir a Jerusalém para morrer perto da sepultura dos seus pais. A mesma água que Davi atravessara chorando e descalço na fuga (2Sm 15:23,30) ele volta a atravessar sendo carregado. Uma balsa comum, e sobre ela um reino inteiro voltando para casa.",
  },
  "jumento-de-mefibosete": {
    title: "O jumento de Mefibosete",
    subtitle: "2Sm 19:26 — a montaria que ninguém albardou para o coxo",
    text: "Mefibosete, o filho de Jônatas, ficara aleijado dos dois pés aos cinco anos, no dia em que a ama o deixou cair fugindo com a notícia de Gilboa (2Sm 4:4). Sem pernas, não havia como acompanhar a fuga do rei senão montado — e é nisso que se decide a sua defesa: \"o meu servo me enganou; porque o teu servo dizia: Albardarei um jumento, e nele montarei, e irei com o rei; pois o teu servo é coxo\" (2Sm 19:26). Ziba, o servo, tinha albardado o jumento para si mesmo e corrido a Davi com comida e com uma calúnia (2Sm 16:1-4), levando as terras do senhor como prêmio. A prova do luto do dono estava no corpo: \"não tinha lavado os pés, nem tinha feito a barba, nem tinha lavado as suas vestes desde o dia em que o rei tinha saído até ao dia em que voltou em paz\" (2Sm 19:24). Davi reparte as terras entre os dois, e Mefibosete responde com a única frase que interessa: \"Tome ele também tudo; pois já veio o rei meu senhor em paz à sua casa\" (2Sm 19:30). O animal albardado por engano é a lembrança de que uma calúnia bem contada corre mais depressa do que um coxo.",
  },
  "pedras-de-gilgal": {
    title: "As pedras de Gilgal",
    subtitle: "2Sm 19:15,40 — o memorial da primeira entrada, e a discórdia da segunda",
    text: "Gilgal, na planície ao pé de Jericó, é o primeiro acampamento de Israel na terra prometida: ali Josué mandou levantar as doze pedras tiradas do leito seco do Jordão, \"Para que todos os povos da terra conheçam a mão do Senhor, que é forte\" (Js 4:20-24), e ali Israel foi circuncidado e comeu do fruto da terra. Era também o lugar onde Saul fora feito rei diante do povo (1Sm 11:15). Por isso a comitiva escolhe justamente este chão para reconduzir Davi: \"e Judá veio a Gilgal, para ir encontrar-se com o rei\" (2Sm 19:15). Mas a cena não termina em festa. É ali mesmo que estoura a briga entre Judá e Israel sobre quem tinha mais direito ao rei — \"a palavra dos homens de Judá foi mais forte do que a palavra dos homens de Israel\" (2Sm 19:43) —, e dessa fagulha nasce, no versículo seguinte, a revolta de Seba. O memorial da unidade vira o palco da divisão.",
  },

  // ---- 2 SAMUEL 20: a buzina, a espada de Joabe e a cidade-mãe ----
  "buzina-de-seba": {
    title: "A buzina de Seba, filho de Bicri",
    subtitle: "2Sm 20:1,22 — o mesmo toque que abre e fecha a revolta",
    text: "O chofar, o chifre de carneiro, era o rádio do mundo antigo: convocava o exército, dava o sinal de retirada e proclamava rei. Seba, benjamita da casa de Saul, usa-o para dissolver um reino: \"Então se achou ali por acaso um homem de Belial, cujo nome era Seba, filho de Bicri, homem de Benjamim, o qual tocou a buzina, e disse: Não temos parte em Davi, nem herança no filho de Jessé; cada um às suas tendas, ó Israel\" (2Sm 20:1). A frase não é improviso: é a palavra de ordem que Israel repetirá, quase sílaba por sílaba, no dia em que o reino se partir de vez sob Roboão (1Rs 12:16). O capítulo se fecha com o mesmo instrumento na mão do outro lado — \"então este tocou a buzina, e se retiraram da cidade, cada um para a sua tenda\" (2Sm 20:22). Um sopro espalhou o povo; outro sopro o mandou para casa. Entre os dois toques morreram Amasa e Seba, e o reino ganhou mais algumas décadas de sobrevida.",
  },
  "leito-das-concubinas": {
    title: "O leito das dez concubinas encerradas",
    subtitle: "2Sm 20:3 — as mulheres que ficaram vivendo como viúvas",
    text: "As dez concubinas eram parte do harém real, deixadas em Jerusalém \"para guardarem a casa\" quando Davi fugiu (2Sm 15:16); Absalão as tomou publicamente, num toldo sobre o terraço, à vista de todo o Israel, por conselho de Aitofel — o gesto com que um usurpador declarava que o reino era seu (2Sm 16:21-22). Nada disso foi escolha delas, e o preço foi delas: \"tomou o rei as dez mulheres, suas concubinas, que deixara para guardarem a casa, e as pôs numa casa sob guarda, e as sustentava; porém não as possuiu; e estiveram encerradas até ao dia da sua morte, vivendo como viúvas\" (2Sm 20:3). O texto registra o sustento e registra o encerramento, sem suavizar nenhum dos dois. É o cumprimento exato da sentença de Natã sobre o mal levantado da própria casa de Davi (2Sm 12:11), e o leito vazio de uma casa guardada por fora é a fatura que o pecado do rei mandou para quem não o cometeu.",
  },
  "pedra-grande-de-gibeao": {
    title: "A pedra grande junto a Gibeão",
    subtitle: "2Sm 20:8-10 — o marco da estrada onde Amasa foi morto",
    text: "Era um penedo conhecido à beira do caminho, desses que serviam de ponto de encontro e de referência de jornada — e Gibeão, para os leitores do livro, já tinha uma tradição sinistra de sangue derramado entre irmãos, no tanque onde os moços de Abner e os de Joabe se mataram aos pares (2Sm 2:12-16). É a este mesmo lugar que a estrada leva de novo: \"Chegando eles, pois, à pedra grande, que está junto a Gibeom, Amasa veio diante deles\" (2Sm 20:8). Amasa era o primo que Davi acabara de nomear no lugar de Joabe, e vinha desarmado ao encontro do homem que ele havia substituído. A pedra fica no palco como testemunha muda: nenhuma emboscada, nenhum exército, só dois parentes se cumprimentando à luz do dia num marco da estrada.",
  },
  "baluarte-de-joabe": {
    title: "O baluarte levantado contra Abel",
    subtitle: "2Sm 20:15 — a rampa de terra encostada no muro",
    text: "Um exército antigo sem torres de assalto tomava cidade de dois jeitos: por fome ou por rampa. A rampa — um aterro de terra e pedra socada, empilhado contra a muralha até chegar à altura da coroa do muro — é a máquina de cerco mais antiga que se conhece, e é a que Joabe manda erguer: \"E vieram, e o cercaram em Abel de Bete-Maaca, e levantaram uma barragem contra a cidade, e isto colocado na trincheira; e todo o povo que estava com Joabe batia no muro, para derrubá-lo\" (2Sm 20:15). Cada cesto de terra despejado ali era um dia mais perto do saque de uma cidade inteira por causa de um só fugitivo. E o cerco não foi levantado por um general nem por um profeta: foi uma mulher sábia gritando do alto da muralha que fez a conta em voz alta e mudou a decisão. A rampa ficou meio pronta, e é isso que o palco mostra — a máquina interrompida no meio do serviço.",
  },
  "muro-de-abel-bete-maaca": {
    title: "O muro de Abel de Bete-Maaca",
    subtitle: "2Sm 20:16-22 — \"uma cidade que é mãe em Israel\"",
    text: "Abel de Bete-Maaca ficava no extremo norte de Israel, perto de Dã, e tinha fama antiga de casa de bom conselho: \"Antigamente costumava-se dizer: Certamente pediram conselho a Abel; e assim resolveram\" (2Sm 20:18). Do alto deste muro uma mulher sem nome negocia de igual para igual com o general mais temido do reino, e o argumento que ela usa é o coração da cena: \"Sou eu uma das pacíficas e das fiéis em Israel; e tu procuras matar uma cidade que é mãe em Israel; por que, pois, devorarias a herança do Senhor?\" (2Sm 20:19). \"mãe em Israel\" é o título que se dava a uma cidade-tronco, que gera e sustenta as aldeias em volta — destruí-la seria matar uma linhagem inteira, não um homem. Joabe recua na hora, e a mulher \"na sua sabedoria\" faz o resto: a cabeça de Seba é lançada pelo muro e o cerco se desfaz (2Sm 20:22). É o segundo capítulo seguido em que uma mulher sábia salva mais vidas do que um exército — e o narrador, que guardou o nome de Joabe, não guardou o dela.",
  },
  "cronicas-do-reino": {
    title: "As crônicas do reino",
    subtitle: "2Sm 20:23-26 — a lista de oficiais que diz que o Estado voltou a funcionar",
    text: "O rolo do cronista era um arquivo real de verdade: o oficial encarregado de \"lembrar\", de guardar os atos do governo dia a dia, ao lado do escrivão que redigia a correspondência do palácio. Depois de dois capítulos de guerra civil, o livro fecha o episódio com uma lista administrativa seca — Joabe sobre o exército, Benaia sobre os quereteus e peleteus, Adorão sobre os tributos, \"e Jeosafá, filho de Ailude, era o cronista\", Seva o escrivão, Zadoque e Abiatar os sacerdotes (2Sm 20:23-25). Parece cenário, e é exatamente a mensagem: quando o cronista volta a escrever e o cobrador de impostos volta a cobrar, é sinal de que o reino parou de sangrar. Uma lista de cargos é a coisa mais entediante que se pode ler — e, depois de Absalão e de Seba, era a melhor notícia que Israel podia receber.",
  },

  // ---- 2 SAMUEL 21: a fome, a penha de Rispa e os filhos do gigante ----
  "primicias-da-sega-das-cevadas": {
    title: "As primícias da sega das cevadas",
    subtitle: "2Sm 21:9 — a hora exata do ano em que os sete morreram",
    text: "A cevada é o primeiro cereal a amadurecer na Palestina, colhido entre março e abril, e a sua sega abre o calendário agrícola de Israel: é dela que sai o molho movido perante o SENHOR no dia seguinte ao sábado da Páscoa (Lv 23:10-11), a oferta que declara aberta a colheita do ano. O narrador marca a data com precisão de lavrador: \"e foram mortos nos dias da sega, nos dias primeiros, no princípio da sega das cevadas\" (2Sm 21:9). Depois de três anos de fome, a terra estava enfim dando pão — e é justo na primeira semana de pão que sete homens são enforcados no monte. O feixe em cena não é enfeite: é o relógio da história, e é ele que mede quanto tempo Rispa ficou de guarda na penha, do começo da sega até a chuva do céu cair.",
  },
  "penha-de-rispa": {
    title: "A penha de Rispa",
    subtitle: "2Sm 21:10 — o pano de saco estendido sobre a rocha, da sega até a chuva",
    text: "Rispa, filha de Aiá, era concubina de Saul; dos sete entregues aos gibeonitas, dois eram filhos dela. Sem poder impedir a execução e sem direito a enterrá-los — os corpos ficaram expostos no monte, o que a lei de Israel proibia até para um criminoso (Dt 21:22-23) —, ela fez a única coisa que lhe restava: \"Então Rispa, filha de Aiá, tomou um pano de cilício, e estendeu-lho sobre uma penha, desde o princípio da sega até que a água do céu caiu sobre eles; e não deixou as aves do céu pousar sobre eles de dia, nem os animais do campo de noite\" (2Sm 21:10). O cilício é o pano áspero de pelo de cabra do luto, o mesmo com que se rasgavam as vestes e se dormia no chão; ela não o vestiu, estendeu-o sobre a rocha e fez dele cama, tenda e altar. A guarda durou meses — do fim de abril até as primeiras chuvas —, dia após dia espantando os abutres, noite após noite espantando os chacais, sozinha, sem soldados e sem sacerdote, defendendo corpos que já não podiam agradecer. Nenhuma palavra dela é registrada; o texto guarda só os gestos, e eles falam mais alto que os discursos do capítulo. E foi o gesto que moveu o rei: \"E foi contado a Davi o que fizera Rispa\" (2Sm 21:11) — e só então Davi mandou buscar os ossos de Saul e de Jônatas e deu sepultura a todos, e só depois disso \"Deus se aplacou com a terra\" (2Sm 21:14). A justiça exigida pelos gibeonitas abriu o capítulo; foi a fidelidade teimosa de uma mulher sem poder nenhum que o fechou.",
  },
  "sepultura-de-quis": {
    title: "A sepultura de Quis, em Zela",
    subtitle: "2Sm 21:13-14 — o túmulo de família onde a casa de Saul enfim descansa",
    text: "Quis, o benjamita, era o pai de Saul, e Zela, na terra de Benjamim, guardava o sepulcro da família — uma câmara cavada na rocha, com bancadas para os corpos e um nicho para os ossos, o modo comum de enterrar em Israel. Até este dia, os restos do primeiro rei estavam espalhados: queimados e sepultados às pressas em Jabes-Gileade por homens que atravessaram a noite para tirá-los do muro de Bete-Sã (1Sm 31:11-13). Davi manda recolher tudo — os ossos de Saul, os ossos de Jônatas e também os ossos dos sete enforcados no monte — e os leva para casa: \"Enterraram os ossos de Saul, e de Jônatas seu filho na terra de Benjamim, em Zela, na sepultura de seu pai Quis, e fizeram tudo o que o rei ordenara; e depois disto Deus se aplacou com a terra\" (2Sm 21:14). A boca do sepulcro fechada é o fim de uma dinastia e o fim de uma praga na mesma frase. E é o rei que a casa de Saul caçou por anos quem paga o funeral.",
  },
  "lanca-de-isbi-benobe": {
    title: "A lança de Isbi-Benobe",
    subtitle: "2Sm 21:16 — trezentos siclos de cobre apontados para um rei cansado",
    text: "Isbi-Benobe era \"dos filhos do gigante\", os refains de Gate, a mesma linhagem de Golias. O narrador pesa a arma dele para que o leitor sinta o tamanho do homem: \"cuja lança pesava trezentos siclos de cobre, e que cingia uma espada nova, intentou ferir a Davi\" (2Sm 21:16) — cerca de três quilos e meio só na ponta de metal, metade do ferro da lança de Golias (1Sm 17:7), e ainda assim mais do que um homem comum consegue manejar. O detalhe que faz a cena doer não é a lança, é o versículo anterior: \"e tanto pelejaram contra os filisteus, que Davi se cansou\" (2Sm 21:15). O menino que derrubou o gigante com uma funda é agora um velho sem fôlego no meio do campo, e quem o salva é Abisai. A arma erguida sobre ele é o retrato do tempo passando: o mesmo inimigo, o mesmo tipo de lança, e um corpo que já não responde.",
  },
  "espada-nova-de-isbi-benobe": {
    title: "A espada nova do gigante",
    subtitle: "2Sm 21:16 — a arma recém-forjada de quem contava matar o rei",
    text: "\"e que cingia uma espada nova\" (2Sm 21:16) é uma daquelas notas curtas que a Escritura larga sem explicar e que valem um capítulo. Espada nova, no mundo antigo, é lâmina sem mossa, gume sem os desgastes de vinte pelejas — arma comprada ou forjada para uma ocasião. Isbi-Benobe cingiu-a e foi ao campo com um propósito declarado: \"intentou ferir a Davi\". Havia até uma tradição entre os filisteus de que a lâmina que matasse o rei de Israel entraria para a história, e há quem leia neste gigante um parente vingando Golias — cuja própria espada, aliás, Davi carregara de Nobe embrulhada num pano (1Sm 21:9). A espada nova nunca foi usada: Abisai chegou primeiro. Ela fica caída no palco como o que sobra de todo plano feito contra o ungido — ferro afiado, sem dono.",
  },
  "lampada-de-israel": {
    title: "A lâmpada de Israel",
    subtitle: "2Sm 21:17 — o juramento dos valentes ao rei já velho",
    text: "A lâmpada de barro da casa israelita ficava acesa a noite inteira; apagá-la era sinal de família extinta, e por isso a Escritura chama de \"lâmpada\" a continuidade de uma linhagem — Deus promete a Davi \"uma lâmpada\" em Jerusalém para sempre (1Rs 11:36; 2Rs 8:19). Depois do susto com Isbi-Benobe, os homens de Davi tomam a decisão por ele: \"Então os homens de Davi lhe juraram, dizendo: Nunca mais sairás conosco à peleja, para que não apagues a lâmpada de Israel\" (2Sm 21:17). É uma frase de amor e de política ao mesmo tempo — não é o braço do rei que faz falta, é o nome dele. Um exército pode perder um general e continuar; perder o ungido é ficar sem casa e sem promessa. O velho guerreiro é aposentado do campo pelos próprios soldados, e a chama que eles protegem é a que chegaria, séculos depois, a Belém.",
  },
  "haste-como-orgao-de-tecelao": {
    title: "A haste como órgão de tecelão",
    subtitle: "2Sm 21:19 — a lança do gigante medida pelo tear",
    text: "O órgão de tecelão é o eixo grosso do tear vertical, a peça de madeira que atravessa o urdume — o objeto mais pesado da casa, do tamanho de um braço de homem e da grossura de um punho. É a medida que a Bíblia usa duas vezes, e sempre para a mesma família: \"El-Hanã, filho de Jaaré-Oregim, o belemita, feriu Golias, o giteu, de cuja lança era a haste como órgão de tecelão\" (2Sm 21:19), com as mesmas palavras da descrição de Golias no vale do carvalho (1Sm 17:7). O texto de 1Cr 20:5 esclarece que este El-Hanã feriu Lami, irmão de Golias, e há aqui uma daquelas notas de copista que os estudiosos discutem há séculos. O que a cena guarda é a imagem: uma lança tão grossa que só se descreve por comparação com um móvel, e um homem de Belém — a cidade de Davi — derrubando outro gigante de Gate. A geração seguinte aprendeu a fazer o que o rei fizera na juventude.",
  },

  // ---- 2 SAMUEL 22: as imagens do grande cântico (o Salmo 18) ----
  "harpa-do-cantico-de-davi": {
    title: "A harpa do cântico de Davi",
    subtitle: "2Sm 22:1 — o instrumento do \"suave em salmos de Israel\"",
    text: "O kinnor de Davi era a lira de madeira com cordas de tripa que ele tocava desde menino no campo, a mesma que acalmava Saul quando o espírito mau o apertava (1Sm 16:23). Este capítulo inteiro é a letra que ela acompanhou: \"as palavras deste cântico, no dia em que o SENHOR o livrou das mãos de todos os seus inimigos e das mãos de Saul\" (2Sm 22:1). O leitor atento reconhece o texto — é o Salmo 18, quase palavra por palavra, guardado duas vezes na Bíblia: uma no livro que conta a história, outra no livro que a canta. Cinquenta e um versos, e nenhum deles pede coisa alguma: é louvor puro, feito por um homem no fim da vida olhando para trás. A harpa em cena diz o que o narrador quer que se entenda — a maior arma do reinado de Davi não foi a funda nem a espada, foi isto.",
  },
  "rochedo-do-cantico": {
    title: "O rochedo do cântico",
    subtitle: "2Sm 22:2,32,47 — a palavra que abre e fecha o Salmo 18",
    text: "Nos anos de fuga, Davi viveu literalmente dentro de rochas: as grutas de Adulão, os desfiladeiros de Maom, as fortalezas de En-Gedi. Quando ele quer dizer quem é Deus, é essa a primeira palavra que lhe vem: \"O Senhor é o meu rochedo, e o meu lugar forte, e o meu libertador\" (2Sm 22:2). O cântico volta à imagem no meio — \"E quem é rochedo, senão o nosso Deus?\" (2Sm 22:32) — e a repete no fecho, como assinatura: \"Vive o Senhor, e bendito seja o meu rochedo; e exaltado seja Deus, a rocha da minha salvação\" (2Sm 22:47). Um penedo não é um abrigo confortável: é duro, é frio e é absolutamente imóvel, e é justamente por isso que serve. Davi não louva a Deus por ser gentil; louva-o por não se mexer.",
  },
  "altar-do-clamor-ouvido": {
    title: "O altar do clamor ouvido",
    subtitle: "2Sm 22:7 — \"do seu templo ouviu ele a minha voz\"",
    text: "O altar do holocausto era o lugar onde a oração de Israel subia com a fumaça, e o \"templo\" de que o cântico fala não é o edifício de Salomão, que ainda não existia: é o santuário celeste, a casa de onde Deus governa. Encurralado pelas ondas de morte e pelas cordas do inferno, o cantor descreve o que fez e o que aconteceu: \"Estando em angústia, invoquei ao Senhor, e a meu Deus clamei; do seu templo ouviu ele a minha voz, e o meu clamor chegou aos seus ouvidos\" (2Sm 22:7). É o versículo-dobradiça do salmo — tudo antes dele é afogamento, tudo depois é terremoto. O grito de um homem sozinho num barranco chegou ao palácio de Deus, e o palácio se moveu. O altar aceso em cena é a imagem desse trajeto: fumaça pequena subindo de um lugar apertado, e o céu respondendo com fogo.",
  },
  "coluna-de-fogo-da-ira": {
    title: "A coluna de fogo da ira",
    subtitle: "2Sm 22:9 — a fumaça das narinas e o fogo devorador",
    text: "A teofania do salmo é descrita em linguagem de vulcão e de tempestade: \"Subiu fumaça de suas narinas, e da sua boca um fogo devorador; carvões se incenderam dele\" (2Sm 22:9). A imagem é deliberadamente física — o hebraico fala de um resfolegar de narinas, o gesto do animal ou do homem tomado de ira —, e vem logo depois do abalo da terra: Deus não responde ao clamor com um sussurro, responde com um fim de mundo em miniatura. Aqui a chama é desenhada, não sugerida: uma coluna de fogo subindo do chão e os carvões pegando sozinhos em volta. Israel conhecia bem essa coluna, que o guiara pelo deserto quarenta anos (Êx 13:21); a diferença é que ali ela caminhava adiante do povo, e aqui ela vem contra os inimigos dele. O mesmo fogo, virado para o outro lado.",
  },
  "querubim-do-voo-do-senhor": {
    title: "O querubim do voo do SENHOR",
    subtitle: "2Sm 22:11 — \"E subiu sobre um querubim, e voou\"",
    text: "Os querubins da Bíblia não são meninos de asas: são as criaturas aladas que guardam a entrada do Éden com a espada flamejante (Gn 3:24), as figuras de ouro batido sobre o propiciatório da arca (Êx 25:18-20) e o carro vivo da glória de Deus na visão de Ezequiel (Ez 10). Ele é o trono que se move, e é assim que o cântico o usa: \"E subiu sobre um querubim, e voou; e foi visto sobre as asas do vento\" (2Sm 22:11). O Deus que \"habita entre os querubins\" não fica sentado quando o seu servo grita: levanta o próprio trono e vem. O paralelismo é bonito de propósito — querubim e vento na mesma frase, o veículo visível e o invisível. E é por isso que o palco desenha a figura alada contra as estrelas e não desenha Deus: o que se pode representar é o carro, nunca quem o conduz.",
  },
  "brasas-do-resplendor-da-presenca": {
    title: "As brasas do resplendor da presença",
    subtitle: "2Sm 22:13 — os carvões que se acendem sozinhos",
    text: "\"Pelo resplendor da sua presença brasas de fogo se acenderam\" (2Sm 22:13). O verso descreve algo que não tem paralelo na experiência comum: não é uma tocha que incendeia a lenha, é o próprio brilho de Deus que faz o carvão pegar fogo, à distância e sem contato. A cena é a mesma do Sinai, onde o monte fumegava porque o SENHOR descera sobre ele em fogo (Êx 19:18), e a mesma que o Novo Testamento resume numa linha: \"o nosso Deus é um fogo consumidor\" (Hb 12:29). No cântico, o clarão vem entre o trovão do versículo 14 e as flechas do 15, no auge da tempestade. No palco, três fogueiras ardendo num descampado sem ninguém por perto: ninguém as acendeu, e é esse o ponto. Onde Deus aparece, as coisas comuns começam a queimar.",
  },
  "flechas-disparadas-do-alto": {
    title: "As flechas disparadas do alto",
    subtitle: "2Sm 22:15 — os raios que o SENHOR atirou como setas",
    text: "O arco de guerra do Oriente antigo era arma de longo alcance e de linha de frente: dispara antes que o inimigo chegue e desmancha a formação antes do choque. É essa imagem que o cântico empresta ao céu: \"E disparou flechas, e os dissipou; raios, e os perturbou\" (2Sm 22:15). O paralelismo hebraico explica a metáfora em tempo real — as flechas são os raios, e o arqueiro é Deus. Nota-se o que os verbos fazem: não é matança, é dispersão e pânico; o exército inimigo não é aniquilado, é desmanchado. O cantor, encurralado embaixo, não precisou de arco nenhum — o arco estava em cima. O palco larga a arma no chão, entre nuvens rasgadas: o disparo já foi dado, e quem o deu não está em cena.",
  },
  "estatutos-diante-de-davi": {
    title: "Os estatutos diante de Davi",
    subtitle: "2Sm 22:23 — as tábuas que ele diz não ter desviado de si",
    text: "As tábuas do testemunho, escritas pelo dedo de Deus e guardadas dentro da arca (Êx 31:18), eram o documento da aliança — e a lei mandava que o rei de Israel escrevesse para si uma cópia dela e a lesse todos os dias da sua vida (Dt 17:18-19). O trecho central do cântico é a defesa que Davi faz da própria conduta, e ele a ancora exatamente aí: \"Porque todos os seus juízos estavam diante de mim; e de seus estatutos não me desviei\" (2Sm 22:23). Não é um homem alegando ser sem pecado — o leitor de 2 Samuel acaba de atravessar o capítulo 11 e sabe muito bem que não é isso. É um homem dizendo que nunca trocou de senhor: caiu, foi repreendido, se levantou, e jamais foi atrás de outro deus. As tábuas postas no chão diante dele são o padrão que ele não retirou de vista, mesmo nos anos em que não conseguiu cumpri-lo.",
  },
  "juizos-do-senhor-diante-de-davi": {
    title: "Os juízos do SENHOR diante de Davi",
    subtitle: "2Sm 22:22-23 — o rolo aberto sobre a mesa do rei",
    text: "Os \"juízos\" (mishpatim) são as sentenças da lei, o direito aplicado caso a caso — o corpo de decisões que o rei tinha de conhecer para julgar o povo à porta da cidade. Guardadas em rolos de couro copiados à mão, elas eram lidas em voz alta e revisadas continuamente; um rei que não as tinha por perto governava por capricho. Davi reivindica o contrário: \"Porque guardei os caminhos do Senhor; e não me apartei impiamente do meu Deus\" (2Sm 22:22), e logo em seguida: \"Porque todos os seus juízos estavam diante de mim\" (2Sm 22:23). O rolo aberto ao lado das tábuas separa duas coisas que costumam ser confundidas: a lei que Deus deu de uma vez, gravada em pedra, e o trabalho diário de aplicá-la, escrito em tinta. Davi diz ter feito os dois. E o palco o mostra debruçado sobre o rolo, escrevendo — porque a lei não estava só diante dele, estava passando pela mão dele.",
  },
  "lampada-do-senhor": {
    title: "A lâmpada do SENHOR",
    subtitle: "2Sm 22:29 — \"o Senhor ilumina as minhas trevas\"",
    text: "O candelabro de sete braços ardia continuamente diante do véu, alimentado com azeite de oliva batido, \"desde a tarde até a manhã\" (Êx 27:20-21) — a única luz do santuário, acesa por ordem e nunca apagada. O cântico faz do próprio Deus esse candelabro: \"Porque tu, Senhor, és a minha lâmpada; e o Senhor ilumina as minhas trevas\" (2Sm 22:29). Note-se que ele não pede que as trevas sejam retiradas; diz que elas são iluminadas. É uma promessa mais realista e mais dura: continua escuro em volta, e ainda assim se enxerga o caminho. Davi passou anos em cavernas e desfiladeiros noturnos, e sabia a diferença entre um dia claro e uma lâmpada na mão. O versículo seguinte mostra o que se faz com essa luz: passar pelo meio de um esquadrão e saltar um muro.",
  },
  "espada-cingida-para-a-peleja": {
    title: "A espada cingida para a peleja",
    subtitle: "2Sm 22:40 — \"me cingiste de força para a peleja\"",
    text: "Cingir é apertar o cinto: o gesto com que o homem antigo prendia a túnica solta para poder correr, trabalhar ou lutar, e com que o soldado pendurava a espada nos lombos. O cântico usa o verbo para dizer de onde vem a força de Davi: \"Porque me cingiste de força para a peleja; fizeste abater-se debaixo de mim os que se levantaram contra mim\" (2Sm 22:40). Não é o rei que se arma; é Deus quem o veste. Toda a seção das vitórias (vv. 33-46) é construída assim — Deus instrui as mãos, alarga os passos, dá o escudo, e o guerreiro apenas executa. Por isso a espada aparece caída no campo da perseguição, e não empunhada: quem a segurou já sabe que não foi ela que venceu.",
  },
  "espada-do-homem-violento": {
    title: "A espada do homem violento",
    subtitle: "2Sm 22:49 — a lâmina de que o cantor diz ter sido livrado",
    text: "\"O homem violento\" é uma figura fixa nos salmos de Davi: o adversário que não obedece a lei nenhuma, cuja força é o próprio argumento. Ele aparece duas vezes no cântico, no começo — \"Ó meu Salvador, da violência me salvas\" (2Sm 22:3) — e no fim, quando o rol das vitórias se fecha: \"e tu me exaltas sobre os que contra mim se levantam; do homem violento me livras\" (2Sm 22:49). A lâmina caída entre os penedos, com o carro do perseguidor já dentro do quadro, é o dia da calamidade de que fala o versículo 19: o inimigo mais forte alcançando um homem sem saída. Davi conheceu a lança de Saul encostada na parede e o javali de Gate à porta da cidade. A confissão do cântico é simples e vem do corpo: ele não escapou por ser mais rápido — foi tirado dali.",
  },
  "arco-de-cobre-quebrado-pelos-bracos": {
    title: "O arco de cobre quebrado pelos braços",
    subtitle: "2Sm 22:35 — a força de guerra que é ensinada, não nata",
    text: "O arco composto de guerra, reforçado com lâminas de bronze, era a arma mais difícil de manejar do arsenal antigo: só se armava vergando-o com todo o corpo, e por isso quebrar um arco de cobre virou, em toda a região, a maneira de dizer que um homem tinha força fora do comum. O cântico devolve o crédito a quem é devido: \"Instrui as minhas mãos para a peleja, de maneira que um arco de cobre se quebra pelos meus braços\" (2Sm 22:35). O verbo é \"instrui\", não \"dá\" — a força de Davi é ofício aprendido debaixo de um mestre, e o mestre é Deus. Vale reparar no que o mesmo Deus faz com o arco do inimigo em outro salmo: \"quebra o arco e corta a lança\" (Sl 46:9). Ele ensina o braço de um e desarma o do outro, e ambos os gestos são o mesmo governo.",
  },
  "armas-largadas-na-fuga": {
    title: "As armas largadas na fuga",
    subtitle: "2Sm 22:42 — \"Olharam, porém não houve libertador\"",
    text: "Um exército em pânico deixa para trás uma trilha característica: lanças fincadas de qualquer jeito, escudos virados, fardos abertos no chão. É o cenário mais silencioso do cântico, e o mais assustador: \"Olharam, porém não houve libertador; sim, para o Senhor, porém não lhes respondeu\" (2Sm 22:42). Os inimigos de Davi chegam ao ponto de clamar ao Deus de Israel — e o céu fica mudo. O verso incomoda de propósito: o mesmo SENHOR que ouviu o clamor do versículo 7, \"do seu templo\", não responde a este. A diferença não está no volume do grito, está em quem passou a vida buscando e em quem só se lembrou de buscar quando não havia mais saída. O palco esvazia tudo — só as armas no chão, uma nuvem e o silêncio.",
  },
  "coroa-do-ungido-do-senhor": {
    title: "A coroa do ungido do SENHOR",
    subtitle: "2Sm 22:51 — a benignidade prometida \"para sempre\"",
    text: "\"Ungido\", em hebraico, é mashiach — a palavra que atravessa o Antigo Testamento e chega ao Novo como Messias. No último verso do cântico ela é aplicada a um homem concreto, com nome e sobrenome: \"Ele é a torre das salvações do seu rei, e usa de benignidade com o seu ungido, com Davi, e com a sua descendência para sempre\" (2Sm 22:51). A palavra traduzida por benignidade é hesed, a lealdade de aliança que não se retira — e é dela, e não da coroa, que depende tudo o que vem depois. O texto não diz \"com Davi\" e para: diz \"e com a sua descendência para sempre\", retomando a promessa do capítulo 7. A coroa em cena, portanto, não é a de um homem só. É o penhor de uma linhagem que ainda estava a mil anos do seu último Rei.",
  },
  "torre-das-salvacoes": {
    title: "A torre das salvações",
    subtitle: "2Sm 22:51 — a última imagem do cântico",
    text: "A torre — o migdal — era a construção mais alta e mais forte de uma cidade murada: o último reduto, para onde a população subia quando o muro caía, e o posto de onde se enxergava o inimigo antes de todo mundo. Depois de cinquenta versos de mar, terremoto, fogo, flechas e perseguição, o cântico escolhe terminar aqui: \"Ele é a torre das salvações do seu rei\" (2Sm 22:51). Repare no plural — salvações, no acumulado: de Saul, dos filisteus, de Absalão, do gigante de Gate, de si mesmo. Não é uma torre de vitória, é uma torre de refúgio; o rei não está no alto dela olhando o mundo, está dentro dela por não ter aonde mais ir. É por isso que a imagem fecha o salmo: o homem mais poderoso de Israel confessando, no fim da vida, que passou o tempo todo abrigado em outro.",
  },
  "altar-do-louvor-entre-os-gentios": {
    title: "O altar do louvor entre os gentios",
    subtitle: "2Sm 22:50 — \"te louvarei entre os gentios\"",
    text: "Um altar levantado fora de Israel, no meio das nações, seria uma imagem estranha para um israelita do tempo dos juízes — o culto tinha um lugar e um povo. Mas é isso que o penúltimo verso do cântico anuncia: \"Por isso, ó Senhor, te louvarei entre os gentios, e entoarei louvores ao teu nome\" (2Sm 22:50). Davi acaba de dizer que povos que não o conheciam vieram servi-lo (v. 44); agora ele diz o que fará no meio deles — cantar. O verso não ficou parado ali: Paulo o cita em Romanos 15:9 como uma das provas de que o plano de Deus sempre incluiu as nações, ao lado de outras três passagens do Antigo Testamento. O altar aceso numa praça estrangeira, com a harpa encostada nele, é o cântico saindo das fronteiras de Israel mil anos antes de o evangelho fazer o mesmo caminho.",
  },

  // ---- 2 SAMUEL 23: as últimas palavras e os valentes ----
  "rocha-de-israel": {
    title: "A Rocha de Israel",
    subtitle: "2Sm 23:3 — o nome de Deus nas últimas palavras de Davi",
    text: "\"Rocha de Israel\" é um dos nomes mais antigos de Deus na Bíblia hebraica, usado no cântico de Moisés — \"Ele é a Rocha, cuja obra é perfeita\" (Dt 32:4) — e retomado por Davi no seu último oráculo: \"Disse o Deus de Israel, a Rocha de Israel a mim me falou: Haverá um justo que domine sobre os homens, que domine no temor de Deus\" (2Sm 23:3). É um título de estabilidade, não de dureza: a rocha é onde se constrói, o penedo que não cede quando tudo em volta se move. Nas últimas palavras do rei ela aparece como quem fala, não como quem abriga — a Rocha tem voz, e o que ela diz é a descrição de um governo justo que Davi sabe que não foi o dele. O palco põe o penedo de Sião aflorando na beira do terraço, para que a metáfora tenha corpo: o rei está em pé sobre a pedra, e é a pedra que dita a sentença.",
  },
  "fogo-dos-espinhos": {
    title: "O fogo dos espinhos",
    subtitle: "2Sm 23:6-7 — o fim dos filhos de Belial",
    text: "Nas terras de sequeiro da Palestina, o espinheiro é a praga do lavrador: não serve de pasto, não dá fruto, e a única forma de limpar o campo é arrancá-lo com ferro e queimá-lo onde caiu, porque não vale a pena carregar. Davi termina o seu oráculo com essa cena rural: \"Porém os filhos de Belial todos serão como os espinhos que se lançam fora, porque não podem ser tocados com a mão\" (2Sm 23:6); \"e a fogo serão totalmente queimados no mesmo lugar\" (2Sm 23:7). O contraste é o coração das últimas palavras: quatro versos antes, o governo justo era a luz da manhã e a erva brotando depois da chuva; aqui é o espinhal ardendo. A mesma chuva que faz brotar a relva alimenta o espinho — o que separa os dois é o fim de cada um. E o fogo do palco é desenhado, não sugerido: \"totalmente queimados no mesmo lugar\" não deixa nada para depois.",
  },
  "haste-de-lanca": {
    title: "A haste de uma lança",
    subtitle: "2Sm 23:7 — o único jeito de tocar no espinho",
    text: "A haste é o cabo de madeira da lança, longo e grosso, com que se empurra e se revolve à distância; é a ferramenta improvisada de quem precisa mexer no que não se pega com a mão. Davi a inclui na sua imagem final: \"Mas qualquer que os tocar se armará de ferro e da haste de uma lança\" (2Sm 23:7). É uma observação de fazendeiro dentro de um oráculo de rei — para limpar um espinhal, luva não basta; leva-se ferro. E é também um aviso sobre lidar com os \"filhos de Belial\": não há como tratá-los de perto sem ferimento; o justo os afasta com o cabo comprido e deixa o fogo terminar o serviço. A arma aparece aqui não como instrumento de guerra, mas de faxina — a última figura que o suave em salmos de Israel usa antes de calar.",
  },
  "lanca-de-josebe-bassebete": {
    title: "A lança de Josebe-Bassebete",
    subtitle: "2Sm 23:8 — o principal dos capitães contra oitocentos de uma vez",
    text: "Abre-se aqui o rol dos poderosos de Davi, uma espécie de quadro de honra do reino, e o primeiro nome vem com o número mais improvável de todos: \"Josebe-Bassebete, filho de Taquemoni, o principal dos capitães; este era Adino, o eznita, que se opusera a oitocentos, e os feriu de uma vez\" (2Sm 23:8). O paralelo em 1Cr 11:11 diz trezentos, e os copistas antigos discutiram o número — o que nenhuma versão discute é o gesto: um homem só barrando uma coluna inteira num desfiladeiro, que é onde esses feitos acontecem, porque em campo aberto ninguém enfrenta oitocentos. A lança plantada no meio do palco é o retrato do cargo dele: o \"principal dos capitães\" não é o que manda de longe, é o que fica na frente. O rol começa com este homem e termina, trinta e sete nomes depois, com Urias, o heteu — e essa ordem é a acusação mais silenciosa do livro.",
  },
  "espada-pegada-a-mao": {
    title: "A espada pegada à mão",
    subtitle: "2Sm 23:10 — a mão de Eleazar que não abria mais",
    text: "Eleazar, filho de Dodô, foi o segundo dos três valentes, e a sua história tem uma só imagem, mas é inesquecível. Quando os homens de Israel se retiraram e o campo ficou vazio, ele ficou: \"Este se levantou, e feriu os filisteus, até lhe cansar a mão e ficar a mão pegada à espada; e naquele dia o Senhor efetuou um grande livramento\" (2Sm 23:10). Os dedos travados em cãibra sobre o punho da arma, endurecidos de sangue seco e de esforço, são o detalhe que só quem já lutou de verdade registraria: acabada a peleja, ele não conseguia soltar a espada. O verso guarda dois créditos ao mesmo tempo, sem os misturar — a mão foi de Eleazar, e o livramento foi do SENHOR. E o fecho é de uma ironia calma: \"e o povo voltou junto dele, somente a tomar o despojo\". Quem tinha fugido voltou na hora de recolher.",
  },
  "despojo-de-pas-damim": {
    title: "O despojo recolhido pelos que fugiram",
    subtitle: "2Sm 23:10 — \"somente a tomar o despojo\"",
    text: "Despojo, no mundo antigo, era a folha de pagamento da guerra: armas, roupas, gado e metal recolhidos do campo depois da batalha, repartidos entre os que combateram. Aqui a repartição fica torta, e o narrador não comenta — só relata: os homens de Israel se tinham retirado antes da peleja, Eleazar ficou sozinho, e quando tudo acabou \"o povo voltou junto dele, somente a tomar o despojo\" (2Sm 23:10). A palavra \"somente\" carrega o juízo inteiro. O relato paralelo em 1Cr 11:13 situa a cena em Pas-Damim, no mesmo vale onde Davi enfrentara Golias anos antes. O fardo largado no chão do palco, com um homem ajoelhado sobre ele enquanto outro mal consegue soltar a espada, é uma das cenas mais honestas da Bíblia sobre como funcionam as recompensas entre os homens.",
  },
  "terra-das-lentilhas": {
    title: "O pedaço de terra cheio de lentilhas",
    subtitle: "2Sm 23:11-12 — a horta que Samá não deixou pisar",
    text: "Lentilha é comida de pobre e alimento de fome: cozida em guisado vermelho, foi o prato pelo qual Esaú vendeu a primogenitura (Gn 25:34), e o feijão dos que atravessavam o deserto com Davi (2Sm 17:28). O que estava em jogo, portanto, não era uma fortaleza nem uma cidade — era uma leira de legume. \"onde havia um pedaço de terra cheio de lentilhas, e o povo fugira de diante dos filisteus\" (2Sm 23:11); \"Este, pois, se pôs no meio daquele pedaço de terra, e o defendeu, e feriu os filisteus; e o Senhor efetuou um grande livramento\" (2Sm 23:12). Todo mundo achou que não valia a pena morrer por aquilo, e Samá, filho de Agé, achou que valia. A conta dele era outra: aquele chão era herança do SENHOR dada a Israel, e ceder um palmo era ceder o princípio. O narrador concorda com ele, e usa para uma horta a mesma frase que usara para a batalha de Eleazar — \"um grande livramento\".",
  },
  "fogueira-de-adulao": {
    title: "A fogueira da caverna de Adulão",
    subtitle: "2Sm 23:13 — o lugar forte no tempo da sega",
    text: "Adulão é uma gruta na encosta calcária da Sefelá, entre a serra de Judá e a planície filisteia, e foi o primeiro esconderijo de Davi na fuga de Saul: ali se ajuntaram a ele \"todo o homem que se achava em aperto, e todo o homem endividado, e todo o homem de espírito desgostoso\", quatrocentos ao todo (1Sm 22:1-2). Anos depois, já rei, ele está de volta ao mesmo buraco na pedra: \"Também três dos trinta chefes desceram, e no tempo da sega foram a Davi, à caverna de Adulão; e a multidão dos filisteus acampara no vale de Refaim\" (2Sm 23:13). A fogueira no chão da gruta é o clima da cena inteira — uns poucos homens em volta do fogo, à noite, com o inimigo acampado no vale e a cidade natal do rei ocupada a poucos quilômetros dali. É perto deste fogo que ele deixa escapar o desejo que quase custou três vidas.",
  },
  "sega-de-adulao": {
    title: "Os feixes do tempo da sega",
    subtitle: "2Sm 23:13 — a colheita alheia vista de dentro do esconderijo",
    text: "\"no tempo da sega\" não é enfeite de calendário: é a estação em que os exércitos do Oriente antigo saíam a campo, porque havia grão nas eiras para saquear e sol firme para marchar. O narrador registra a data — \"e no tempo da sega foram a Davi, à caverna de Adulão\" (2Sm 23:13) — e com ela a moldura da cena: em volta da gruta a terra está dando pão, e dentro dela um rei escondido sem poder chegar à água da sua própria cidade. Os feixes empilhados a céu aberto pertencem a quem está por cima, e naquele mês quem estava por cima eram os filisteus, acampados no vale de Refaim com guarnição em Belém. É essa a distância que o capítulo mede: colheita à vista, e nada dela ao alcance.",
  },
  "cisterna-de-belem": {
    title: "A cisterna de Belém, junto à porta",
    subtitle: "2Sm 23:15-16 — a água que três homens foram buscar no meio do arraial inimigo",
    text: "Cisterna não é poço: é um reservatório cavado na rocha e revestido de reboco, que guarda a água da chuva do inverno para o verão inteiro — em Belém, a que ficava junto ao portão era a fonte pública da cidade, o lugar onde as mulheres se juntavam ao anoitecer. Davi cresceu bebendo dela, e é dela que ele sente falta na gruta: \"Quem me dera beber da água da cisterna de Belém, que está junto à porta!\" (2Sm 23:15). Não foi ordem, foi saudade dita em voz alta — e três homens ouviram. \"Então aqueles três poderosos romperam pelo arraial dos filisteus, e tiraram água da cisterna de Belém, que está junto à porta, e a tomaram, e a trouxeram a Davi\" (2Sm 23:16). Atravessaram uma guarnição inimiga nos dois sentidos por um gole de água de casa. A cisterna, portanto, não guarda só água: guarda a infância de um rei e a medida do amor que os seus homens tinham por ele.",
  },
  "porta-de-belem": {
    title: "A porta de Belém ocupada",
    subtitle: "2Sm 23:14 — a guarnição filisteia na cidade natal do rei",
    text: "Belém era uma aldeia pequena na serra de Judá, a cidade de Jessé e o lugar onde Samuel derramou o azeite sobre o menino do rebanho (1Sm 16:1,13). No tempo desta cena, ela está tomada: \"Davi estava então num lugar forte, e a guarnição dos filisteus em Belém\" (2Sm 23:14). O portão da cidade — o ponto de controle, onde se cobrava, se julgava e se decidia quem entrava — estava em mãos estrangeiras, e a cisterna do lado de dentro dele também. É essa a imagem que dá peso ao desejo de Davi: o rei ungido de Israel não podia entrar na própria cidade para beber. Séculos depois, a mesma porta veria chegar um casal sem lugar na hospedaria, e a Belém ocupada — então por Roma — receberia o Filho de Davi.",
  },
  "agua-derramada-perante-o-senhor": {
    title: "A água derramada perante o SENHOR",
    subtitle: "2Sm 23:16-17 — o gole que o rei não quis beber",
    text: "A vasilha chega às mãos de Davi ainda molhada da corrida, trazida por três homens que atravessaram um acampamento inimigo duas vezes — e ele faz a última coisa que se esperava: \"porém ele não a quis beber, mas derramou-a perante o Senhor\" (2Sm 23:16). Derramar um líquido no chão diante de Deus era a libação, a oferta que não se recupera e que ninguém consome (cf. 1Sm 7:6); ele tratou aquela água como sangue e como sacrifício, não como bebida. A razão está na frase seguinte: \"Guarda-me, ó Senhor, de que tal faça; beberia eu o sangue dos homens que foram com risco da sua vida?\" (2Sm 23:17). Não foi desprezo pelo presente — foi o contrário: era caro demais para descer pela garganta de um homem. O rei que anos antes tomara a mulher de um dos seus trinta e mandara matá-lo à distância (2Sm 11) recusa-se agora a consumir a vida de três deles por um capricho. Este é o Davi que o livro quer que se lembre.",
  },
  "lanca-de-abisai": {
    title: "A lança de Abisai",
    subtitle: "2Sm 23:18 — a lança alçada contra trezentos",
    text: "Abisai, filho de Zeruia e irmão de Joabe, é o homem que acompanhou Davi ao arraial adormecido de Saul e quis pregá-lo à terra com a própria lança do rei (1Sm 26:8), e o que salvou a vida do velho Davi diante do gigante Isbi-Benobe (2Sm 21:17). No rol dos valentes ele tem o seu feito próprio: \"e este alçou a sua lança contra trezentos e os feriu; e tinha nome entre os três\" (2Sm 23:18). Alçar a lança é o gesto de comando e de investida, o sinal que faz uma tropa avançar — e a expressão marca que a façanha foi de combate aberto, não de emboscada. O narrador o coloca em posição delicada: chefe dos três da segunda ordem, o mais nobre entre eles, \"porém aos primeiros três não chegou\" (2Sm 23:19). Uma vida inteira de bravura, sempre a um degrau da primeira fila — e o rol registra as duas coisas com a mesma frieza.",
  },
  "espada-de-benaia": {
    title: "A espada de Benaia, na cova do leão",
    subtitle: "2Sm 23:20 — \"no meio duma cova, no tempo da neve\"",
    text: "Benaia, filho de Joiada, de Cabzeel, é o homem dos três feitos impossíveis, e o do meio não tem paralelo em toda a Bíblia: \"este feriu dois fortes heróis de Moabe; e desceu ele, e feriu um leão no meio duma cova, no tempo da neve\" (2Sm 23:20). Cada palavra piora a situação — a cova é fundo de cisterna ou armadilha de caça, sem saída; o leão é o predador maior da Palestina antiga, encurralado e portanto no auge da fúria; e a neve, rara na região, deixa a pedra escorregadia e a luz enganosa. E o verbo é \"desceu\": ninguém o empurrou, ele entrou. Não desenhamos a fera nesta cena, porque o motor não tem leão e etiquetar outro animal seria mentir — o palco conta o episódio pela boca de pedra escancarada, pela neve caindo e pela espada. Este é o homem que Davi pôs sobre a sua guarda pessoal, e que Salomão faria general de todo o exército (1Rs 2:35).",
  },
  "lanca-do-egipcio": {
    title: "A lança arrancada da mão do egípcio",
    subtitle: "2Sm 23:21 — o cajado contra a lança",
    text: "O terceiro feito de Benaia é uma repetição em miniatura do vale do carvalho: \"Também este feriu um egípcio, homem de respeito; e na mão do egípcio havia uma lança, porém ele desceu a ele com um cajado, e arrancou a lança da mão do egípcio, e com ela o matou\" (2Sm 23:21). O cajado é o bordão do pastor, o pau que se leva ao campo — arma nenhuma, e é com isso que ele desce contra um lanceiro. O paralelo com Davi e Golias é evidente e proposital: o improvisado contra o armado, e no fim a arma do gigante virada contra ele (1Sm 17:51). É assim que a Bíblia mostra a geração formada por Davi — os seus homens venciam do jeito que ele lhes ensinara. \"Estas coisas fez Benaia, filho de Joiada, pelo que teve nome entre três poderosos\" (2Sm 23:22).",
  },
  "porta-da-casa-do-rei": {
    title: "A porta da casa do rei",
    subtitle: "2Sm 23:23 — o posto que Benaia recebeu",
    text: "A guarda pessoal de Davi eram os quereteus e os peleteus, mercenários estrangeiros escolhidos justamente por não terem laços de tribo em Israel — a tropa que ficou com ele quando o próprio povo o abandonou na fuga de Absalão (2Sm 15:18). Quem os comandava dormia à porta do rei. O rol dos valentes registra a nomeação em meia linha: \"Dentre os trinta ele era o mais nobre, porém aos três primeiros não chegou; e Davi o pôs sobre os seus guardas\" (2Sm 23:23). A porta guardada por dentro é o cargo mais íntimo do reino: quem passa e quem não passa, quem chega de noite, quem entra armado. Foi por confiar essa porta a Benaia que Davi pôde morrer em paz — e foi Benaia quem executou as últimas ordens do velho rei e garantiu o trono a Salomão (1Rs 2).",
  },
  "rol-dos-trinta": {
    title: "O rol dos trinta",
    subtitle: "2Sm 23:24-39 — a lista de honra do reino, lida em voz alta",
    text: "É um documento de arquivo militar embutido no meio da narrativa: nomes, patronímicos e cidades de origem, do jeito que se registrava uma tropa de elite — \"Asael, irmão de Joabe, estava entre os trinta; El-Hanã, filho de Dodó, de Belém\" (2Sm 23:24), e assim por trinta e poucos versos, passando por Netofa, Anatote, Tecoa, Gibeá de Benjamim, o ribeiro de Gaás, Zobá, Gade, Beerote. Lido de corrido, o rol vira um mapa de Israel; lido devagar, vira um monumento a homens que ninguém mais conhece. E é aqui que o livro dá o seu golpe mais silencioso. O último nome da lista de honra é \"Urias, heteu; trinta e sete ao todo\" (2Sm 23:39) — o estrangeiro que morreu diante dos muros de Rabá porque o rei o mandou para a frente da batalha e recuou os que estavam com ele. Nenhum comentário, nenhuma nota: só o nome no fim, no lugar exato onde não dá para não vê-lo.",
  },
  "porta-de-jerusalem": {
    title: "A porta de Jerusalém, ao anoitecer",
    subtitle: "2Sm 23:39 — \"Urias, heteu; trinta e sete ao todo\"",
    text: "A porta de Jerusalém era onde os homens de Davi se juntavam ao voltar da guerra, e é onde o rol dos trinta se encerra. O último nome não é o de um israelita: \"Urias, heteu; trinta e sete ao todo\" (2Sm 23:39). Heteu — hitita, estrangeiro, um dos povos que Israel deveria ter expulsado da terra — e ainda assim inscrito, com nome próprio, entre os melhores soldados do reino. Foi ele quem se recusou a dormir em casa enquanto a arca e o exército estavam em barracas no campo (2Sm 11:11), e foi ele quem levou, sem saber, a carta que mandava matá-lo. Colocar este nome no fecho da lista de honra, sem uma palavra de explicação, é a maneira que o narrador achou de não deixar o leitor sair do capítulo dos valentes achando que estava tudo bem. A porta ao anoitecer, com o rol ainda aberto e um candeeiro aceso, é o lugar certo para essa lembrança.",
  },

  // ---- 2 SAMUEL 24: o censo, a peste e a eira comprada a preço ----
  "rol-do-recenseamento": {
    title: "O rol do recenseamento",
    subtitle: "2Sm 24:1-9 — a soma que pesou no coração do rei",
    text: "Contar o povo não era proibido em si — a Lei previa o censo, desde que cada arrolado pagasse o resgate da sua alma, \"para que não haja entre eles praga\" (Êx 30:12). O que Davi manda fazer é outra coisa: um levantamento militar puro, tribo por tribo, para saber quanto músculo o reino tinha. Até Joabe reluta: \"mas, por que deseja o rei meu senhor este negócio?\" (2Sm 24:3). Nove meses e vinte dias depois, os números entram no rolo: \"e havia em Israel oitocentos mil homens de guerra, que arrancavam da espada; e os homens de Judá eram quinhentos mil homens\" (2Sm 24:9). E então vem a frase que explica o pecado sem precisar defini-lo: \"E pesou o coração de Davi, depois de haver numerado o povo\" (2Sm 24:10). O rei que a vida inteira contou com o SENHOR quis, uma vez, saber com o que mais podia contar — e o rolo cheio de números virou a acusação.",
  },
  "eira-de-arauna": {
    title: "A eira de Araúna, o jebuseu",
    subtitle: "2Sm 24:16-24 — o chão onde o anjo parou",
    text: "A eira era o terreiro de rocha nua no alto de um monte, batido pelo vento, onde se malhava o trigo com trilhos e se joeirava o grão ao entardecer — chão duro, aberto e limpo, o único lugar de uma cidade onde caberia um altar improvisado. Araúna era jebuseu, gente da população que já morava em Jerusalém antes de Davi tomar a fortaleza de Sião: o dono da terra não era israelita. É ali que a peste para: \"E o anjo do Senhor estava junto à eira de Araúna, o jebuseu\" (2Sm 24:16). E é para ali que Gade manda o rei subir: \"Sobe, levanta ao Senhor um altar na eira de Araúna, o jebuseu\" (2Sm 24:18). O livro inteiro de 2 Samuel converge para este terreiro, e não por acaso — 2Cr 3:1 identifica este monte com Moriá, onde Abraão levantara o altar de Isaque, e é exatamente aqui que Salomão edificaria o templo. O último capítulo de um livro de guerras, adultério e revoltas termina numa eira de trigo que vira o chão mais santo de Israel.",
  },
  "trilhos-e-aparelho-dos-bois": {
    title: "Os trilhos e o aparelho dos bois",
    subtitle: "2Sm 24:22 — a lenha oferecida pelo dono da eira",
    text: "O trilho era uma prancha pesada de madeira com pedras ou lascas de ferro cravadas embaixo, arrastada pelos bois sobre as espigas para separar o grão da palha; o \"aparelho\" são as canga e os arreios da junta. Juntos, são a ferramenta de trabalho de uma vida inteira — e é isso que Araúna põe à disposição do rei: \"Tome, e ofereça o rei meu senhor o que bem parecer aos seus olhos; eis aí bois para o holocausto, e os trilhos, e o aparelho dos bois para a lenha\" (2Sm 24:22). O gesto é de largueza total: os animais para o sacrifício e o próprio equipamento do ofício para alimentar o fogo. Ele oferece tudo de graça, e Davi recusa tudo de graça. Duas generosidades se cruzam nesta eira, e a que a Bíblia registra como definitiva é a do rei que insistiu em pagar.",
  },
  "cinquenta-siclos-de-prata": {
    title: "Os cinquenta siclos de prata",
    subtitle: "2Sm 24:24 — \"holocaustos que não me custem nada\"",
    text: "A prata não era moeda cunhada e sim pesada: cinquenta siclos são pouco mais de meio quilo de metal, entregue em barrinhas ou pedaços na balança, diante de testemunhas — o mesmo modo como Abraão comprara a cova de Macpela (Gn 23:16). É o preço que Davi faz questão de pagar por um terreno que lhe estava sendo dado: \"Não, mas por preço justo to comprarei, porque não oferecerei ao Senhor meu Deus holocaustos que não me custem nada. Assim Davi comprou a eira e os bois por cinqüenta siclos de prata\" (2Sm 24:24). A frase é a última grande palavra do livro e uma das definições mais limpas de culto que a Escritura dá: adoração que não custa não é adoração, é decoração. Vale reparar no que o rei acabara de aprender pelo caminho mais caro — setenta mil homens tinham morrido por um censo em que ele quis saber o que possuía. Agora, comprando um pedaço de rocha, ele aprende quanto vale o que oferece.",
  },
  "altar-da-eira-de-arauna": {
    title: "O altar da eira de Araúna",
    subtitle: "2Sm 24:25 — o fogo que fechou o livro e abriu o templo",
    text: "O altar de holocaustos era uma estrutura de pedras não lavradas sobre a qual a vítima era inteiramente queimada — nada voltava para as mãos de quem ofereceu. Davi o levanta no chão que acabou de comprar: \"E edificou ali Davi ao Senhor um altar, e ofereceu holocaustos, e ofertas pacíficas. Assim o Senhor se aplacou para com a terra e cessou aquele castigo de sobre Israel\" (2Sm 24:25). As duas ofertas dizem o movimento inteiro: o holocausto sobe todo para Deus, e a oferta pacífica termina em refeição partilhada — primeiro a entrega, depois a comunhão restaurada. É o segundo \"aplacou\" do livro, ecoando o de 2Sm 21:14, e é assim que 2 Samuel termina: não com uma vitória militar, mas com fogo aceso num terreiro pago. Neste mesmo lugar, dentro de poucos anos, Salomão levantaria a casa do SENHOR (2Cr 3:1) — e todo sacrifício de Israel por quatro séculos subiria do chão que um velho rei arrependido comprou de um jebuseu.",
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
