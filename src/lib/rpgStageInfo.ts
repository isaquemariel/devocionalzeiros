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

// ============================================================================
// AS FICHAS PESADAS VÊM POR LIVRO, SOB DEMANDA.
//
// As fichas de capítulo (livro→capítulo→papel), as de personagem (por `id`) e
// as de objeto-marco (por `tag`) somavam 4,7 MB e desciam no primeiro
// carregamento do app, mesmo para quem nunca abrisse a cena viva. Agora cada
// livro tem um PACOTE em src/lib/stageInfo/pack/<livro>.ts, trazido por
// import() quando o capítulo abre (ver `ensureStageInfo`), e registrado nos
// mapas abaixo. O que fica aqui é só o que vale para todo livro: as fichas-base
// de papel e de tipo de objeto.
//
// Consequência para quem lê estas funções: `actorInfo`, `namedActorInfo` e
// `propTagInfo` continuam SÍNCRONAS (o desenho as chama a cada quadro) e
// respondem null enquanto o pacote não chegou. Quem monta a cena tem de esperar
// `ensureStageInfo(bookId)` antes de desenhar — é o que o RPGChapterModal faz,
// no mesmo efeito em que busca o roteiro.
// ============================================================================

/** O que um livro entrega ao registro de fichas. */
export interface StageInfoPack {
  /** capítulo → papel → ficha (vence a ficha genérica do papel) */
  chapterActors: Record<number, Record<string, StageInfo>>;
  /** `id` de cena → ficha do personagem (Caim, Raquel, Ló…) */
  chars: Record<string, StageInfo>;
  /** `tag` de prop → ficha do objeto-marco (a coluna de Betel, o poço…) */
  tags: Record<string, StageInfo>;
}

const ACTOR_INFO_BY_CHAPTER: Record<string, Record<number, Record<string, StageInfo>>> = {};
const CHAR_REG: Record<string, StageInfo> = {};
const TAG_REG: Record<string, StageInfo> = {};
const CARREGADOS = new Set<string>();

/** Põe o pacote de um livro no ar. Idempotente. Um verbete que dois livros
 *  compartilham é o MESMO texto copiado nos dois pacotes, então sobrescrever
 *  não muda nada. */
export function registerStageInfo(bookId: string, pack: StageInfoPack): void {
  if (CARREGADOS.has(bookId)) return;
  CARREGADOS.add(bookId);
  ACTOR_INFO_BY_CHAPTER[bookId] = pack.chapterActors;
  Object.assign(CHAR_REG, pack.chars);
  Object.assign(TAG_REG, pack.tags);
}

/** Um import() LITERAL por livro — o Vite só separa o pedaço quando o caminho
 *  é estático. Nada de `import(\`./stageInfo/pack/${id}.ts\`)`. */
const PACOTES: Record<string, () => Promise<{ PACK: StageInfoPack }>> = {
  "1chronicles": () => import("@/lib/stageInfo/pack/stageinfo-1chronicles"),
  "1kings": () => import("@/lib/stageInfo/pack/stageinfo-1kings"),
  "1samuel": () => import("@/lib/stageInfo/pack/stageinfo-1samuel"),
  "2chronicles": () => import("@/lib/stageInfo/pack/stageinfo-2chronicles"),
  "2kings": () => import("@/lib/stageInfo/pack/stageinfo-2kings"),
  "2samuel": () => import("@/lib/stageInfo/pack/stageinfo-2samuel"),
  deuteronomy: () => import("@/lib/stageInfo/pack/stageinfo-deuteronomy"),
  esther: () => import("@/lib/stageInfo/pack/stageinfo-esther"),
  exodus: () => import("@/lib/stageInfo/pack/stageinfo-exodus"),
  ezra: () => import("@/lib/stageInfo/pack/stageinfo-ezra"),
  genesis: () => import("@/lib/stageInfo/pack/stageinfo-genesis"),
  job: () => import("@/lib/stageInfo/pack/stageinfo-job"),
  joshua: () => import("@/lib/stageInfo/pack/stageinfo-joshua"),
  judges: () => import("@/lib/stageInfo/pack/stageinfo-judges"),
  leviticus: () => import("@/lib/stageInfo/pack/stageinfo-leviticus"),
  nehemiah: () => import("@/lib/stageInfo/pack/stageinfo-nehemiah"),
  numbers: () => import("@/lib/stageInfo/pack/stageinfo-numbers"),
  revelation: () => import("@/lib/stageInfo/pack/stageinfo-revelation"),
  ruth: () => import("@/lib/stageInfo/pack/stageinfo-ruth"),
};

const EM_VOO = new Map<string, Promise<void>>();

/** true se as fichas daquele livro já estão no ar (o desenho pode chamar as
 *  funções síncronas sem risco de badge vazio). */
export function stageInfoReady(bookId: string): boolean {
  return CARREGADOS.has(bookId) || !PACOTES[bookId];
}

/** Traz as fichas do livro. Resolve na hora se já estiverem carregadas; para um
 *  livro sem pacote, resolve também — a cena cai nas fichas-base. Se o pedido
 *  falhar (rede caída), a promessa é descartada para a próxima tentativa não
 *  herdar o erro. */
export function ensureStageInfo(bookId: string): Promise<void> {
  if (CARREGADOS.has(bookId)) return Promise.resolve();
  const carrega = PACOTES[bookId];
  if (!carrega) return Promise.resolve();
  let p = EM_VOO.get(bookId);
  if (!p) {
    p = carrega()
      .then((m) => { registerStageInfo(bookId, m.PACK); })
      .catch((e) => { EM_VOO.delete(bookId); throw e; });
    EM_VOO.set(bookId, p);
  }
  return p;
}

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

// As fichas de personagem por `id` vivem em src/lib/stageInfo/chars/<livro>.ts
// e entram em CHAR_REG quando o pacote do livro é registrado.

// ============================================================================
// FICHAS-BASE DOS OBJETOS — leitura ampla, válida em qualquer livro.
// (As versões específicas do Apocalipse ficam em PROP_INFO_BY_BOOK.revelation.)
// ============================================================================
export const PROP_INFO: Record<string, StageInfo> = {
  column: {
    title: "A coluna",
    subtitle: "O sustento de pórtico, palácio e templo",
    text: "Coluna de pedra lavrada ou de cobre fundido, com plinto, fuste e capitel — o que sustenta o teto e, na arquitetura antiga, o que anuncia a importância da casa. As mais famosas de Israel foram fundidas em cobre por Hirão de Tiro e postas no pórtico do templo, com capitéis \"de obra de lírios\" e duas ordens de romãs em redor: a da direita chamou-se JAQUIM e a da esquerda BOAZ (1Rs 7:15-22). Nomes que são frases inteiras — Jaquim quer dizer ELE FIRMARÁ, e Boaz, NELE HÁ FORÇA —, de modo que quem entrasse para adorar passava entre duas declarações sobre Deus. Sansão apalpou duas colunas como estas, as do meio, sobre as quais a casa de Dagom se sustinha, e as derrubou com a própria vida (Jz 16:29-30). Não confundir com a COLUNA DE NUVEM E DE FOGO do Êxodo, que é a presença do SENHOR e não obra de mão humana.",
  },
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
  return id ? (CHAR_REG[id] ?? null) : null;
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
// As fichas de objeto-marco por `tag` vivem em src/lib/stageInfo/tags/<livro>.ts
// e entram em TAG_REG quando o pacote do livro é registrado.

/** Ficha de OBJETO por etiqueta específica (coluna de Betel, poço de Rebeca…). */
export function propTagInfo(tag?: string): StageInfo | null {
  return tag ? (TAG_REG[tag] ?? null) : null;
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
