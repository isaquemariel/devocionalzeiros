export interface Devotional {
  id: number;
  title: string;
  verse: {
    text: string;
    reference: string;
  };
  meditation: string;
  prayer: string;
  phraseOfDay: {
    text: string;
    author: string;
  };
  application: string;
}

export const devotionals: Devotional[] = [
  {
    id: 1,
    title: "Um Novo Ano, Um Novo Coração",
    verse: {
      text: "Irmãos, quanto a mim, não julgo que o haja alcançado; mas uma coisa faço, e é que, esquecendo-me das coisas que atrás ficam, e avançando para as que estão diante de mim, prossigo para o alvo, pelo prêmio da soberana vocação de Deus em Cristo Jesus.",
      reference: "Filipenses 3:13-14",
    },
    meditation: `O início de um novo ano nos chama a refletir sobre o que deixamos para trás e a olhar para frente com esperança e determinação. O Apóstolo Paulo nos lembra que, em Cristo, podemos esquecer o que passou e prosseguir para o alvo. Não precisamos carregar os fardos ou os fracassos do ano anterior; Deus nos convida a viver cada novo dia como uma oportunidade de renovação.

Em 2025, ao fazermos planos e traçarmos metas, que nosso principal objetivo seja caminhar mais próximos de Deus. Este é o tempo de abrir mão das distrações e focar naquilo que é eterno. Avançar no propósito de Deus é o maior presente que podemos dar a nós mesmos e àqueles que nos cercam.`,
    prayer: `Senhor, obrigado por nos permitir entrar em mais um ano sob Tua graça. Ensina-nos a deixar o que passou e a caminhar com confiança para aquilo que está por vir. Que nossos dias em 2025 sejam marcados pela Tua presença, pela renovação da nossa fé e pela busca do Teu propósito. Em nome de Jesus, amém.`,
    phraseOfDay: {
      text: "Deus ainda está escrevendo a sua história; confie n'Ele e continue avançando.",
      author: "Max Lucado",
    },
    application: `Reflita sobre o que você pode deixar para trás do ano anterior. Quais fardos, mágoas ou fracassos você precisa entregar a Deus? Escreva uma meta espiritual para este ano e comprometa-se a prosseguir para o alvo em Cristo.`,
  },
  {
    id: 2,
    title: "O Deus Que Controla os Tempos",
    verse: {
      text: "E ele muda os tempos e as estações; remove os reis e estabelece os reis; dá sabedoria aos sábios e conhecimento aos entendidos. Ele revela o profundo e o escondido; conhece o que está em trevas, e com ele mora a luz.",
      reference: "Daniel 2:21-22",
    },
    meditation: `Entrar em um novo ano é um lembrete de que Deus é o soberano sobre o tempo e a história. Ele é quem muda as estações, transforma circunstâncias e guia o curso das nações e das nossas vidas. Daniel louvou a Deus ao reconhecer Sua autoridade, pois sabia que mesmo os acontecimentos que pareciam incontroláveis estavam sob o domínio do Senhor.

Lembre-se de que o Deus que sustenta o universo é o mesmo que dirige a sua vida. Ele conhece as coisas ocultas e revela a luz em meio à escuridão. Podemos entrar neste novo ano com confiança, sabendo que nosso futuro está seguro em Suas mãos. Busque sabedoria e discernimento n'Ele, pois Deus deseja guiá-lo em cada decisão e propósito.`,
    prayer: `Senhor, obrigado porque o tempo está em Tuas mãos e porque controlas todas as coisas com perfeição. Dá-nos sabedoria e um coração cheio de fé para enfrentar os desafios e aproveitar as oportunidades que virão. Que Tua luz ilumine nosso caminho e nos mantenha firmes na Tua vontade. Em nome de Jesus, amém.`,
    phraseOfDay: {
      text: "Deus está sempre trabalhando, mesmo quando não conseguimos ver ou entender o que Ele está fazendo.",
      author: "Charles R. Swindoll",
    },
    application: `Identifique uma área da sua vida onde você precisa confiar mais na soberania de Deus. Ore entregando essa situação nas mãos do Senhor e peça sabedoria para discernir Sua vontade.`,
  },
  {
    id: 3,
    title: "Viver Para Agradar a Deus",
    verse: {
      text: "Porque persuado eu agora a homens ou a Deus? ou procuro agradar a homens? Se ainda estivesse agradando aos homens, não seria servo de Cristo.",
      reference: "Gálatas 1:10",
    },
    meditation: `A vida cristã nos chama para uma lealdade singular: agradar a Deus acima de todas as coisas. Paulo entendeu que ser servo de Cristo significa viver segundo a vontade do Senhor, mesmo que isso vá contra as expectativas humanas. No mundo em que vivemos, é fácil nos perder em tentativas de agradar as pessoas, buscar aprovação social ou nos conformar com padrões que nos afastam do verdadeiro propósito divino.

Gálatas 1:10 nos desafia a refletir sobre quem realmente está no centro das nossas decisões e prioridades. Você vive para agradar a Deus ou para atender às demandas dos outros? Quando colocamos Deus no centro, nossas escolhas, valores e ações ganham significado eterno. Lembre-se: agradar a Deus é muito mais do que um ato de devoção; é uma postura de vida que nos liberta do peso da aprovação alheia.`,
    prayer: `Senhor, ajuda-me a viver para Te agradar acima de tudo. Livra-me do desejo de buscar a aprovação dos homens e ensina-me a ser fiel à Tua vontade. Faz-me entender que ser Teu servo é o maior privilégio que eu posso ter. Em nome de Jesus, amém.`,
    phraseOfDay: {
      text: "Devemos viver para a audiência de um só: o nosso Deus.",
      author: "A.W. Tozer",
    },
    application: `Examine suas decisões recentes. Alguma delas foi motivada pelo medo do que os outros pensariam? Hoje, escolha uma atitude que agrade a Deus, mesmo que não seja popular.`,
  },
  {
    id: 4,
    title: "Entregando os Planos ao Senhor",
    verse: {
      text: "Confia ao Senhor as tuas obras, e teus pensamentos serão estabelecidos.",
      reference: "Provérbios 16:3",
    },
    meditation: `A vida está cheia de decisões e planos que fazemos na esperança de alcançar o sucesso. Mas a verdadeira segurança está em entregar nossos caminhos ao Senhor. Salomão, o homem natural mais sábio que já existiu, escreveu provérbios e nos ensinou que quando colocamos nossos projetos nas mãos de Deus, Ele não apenas nos guia, mas também ajusta nossos desejos para alinhar com Sua vontade perfeita.

Entregar nossos planos ao Senhor não significa cruzar os braços e esperar. Significa confiar que Ele está no controle, trabalhar diligentemente com sabedoria e permanecer em oração constante. À medida que damos esse passo de fé, descobrimos que Deus nos conduz por caminhos melhores do que poderíamos imaginar, mesmo que esses caminhos sejam diferentes dos nossos planos iniciais.`,
    prayer: `Pai amado, hoje eu entrego a Ti todos os meus planos e sonhos. Ensina-me a confiar em Tua sabedoria e a esperar no Teu tempo perfeito. Guia-me nas minhas decisões e usa cada uma delas para a Tua glória. Em nome de Jesus, amém.`,
    phraseOfDay: {
      text: "Quando entregamos nossos planos a Deus, Ele transforma sonhos humanos em realizações divinas.",
      author: "Elisabeth Elliot",
    },
    application: `Escolha um plano ou projeto importante para você e entregue-o a Deus em oração. Peça a Ele que alinhe seus desejos com Sua vontade perfeita.`,
  },
  {
    id: 5,
    title: "O Poder Transformador do Perdão",
    verse: {
      text: "Por isso te digo que os seus muitos pecados lhe são perdoados, porque muito amou; mas aquele a quem pouco é perdoado, pouco ama.",
      reference: "Lucas 7:47",
    },
    meditation: `A cena de Lucas 7:47 é um retrato profundo do amor e do perdão divinos. Uma mulher, desprezada pela sociedade, encontra em Jesus o perdão completo e incondicional. Seu gesto de lavar os pés de Jesus com lágrimas e ungir com perfume revela o impacto transformador do amor divino. Ela não retribui com palavras, mas com um amor demonstrado por ações, porque reconhece a profundidade do perdão recebido.

Essa história nos desafia a refletir sobre nossa própria vida. Quantas vezes subestimamos a profundidade do perdão que recebemos de Deus? O amor que brota de um coração perdoado é visível nas nossas atitudes, nas nossas palavras e na maneira como tratamos os outros. Quando entendemos o quanto fomos perdoados, somos chamados a amar de maneira extravagante e a estender o mesmo perdão àqueles ao nosso redor.`,
    prayer: `Senhor, obrigado pelo Teu perdão imensurável que transforma meu coração. Ensina-me a perdoar aos outros como fui perdoado, e que minha vida seja um reflexo da Tua graça. Em nome de Jesus, amém.`,
    phraseOfDay: {
      text: "O perdão de Deus não é apenas um presente; é uma convocação para amar de maneira extraordinária.",
      author: "Philip Yancey",
    },
    application: `Há alguém que você precisa perdoar? Hoje, dê um passo em direção ao perdão, mesmo que seja pequeno. Lembre-se de quanto você foi perdoado por Deus.`,
  },
  {
    id: 6,
    title: "O Auxílio do Espírito em Nossas Fraquezas",
    verse: {
      text: "E da mesma maneira também o Espírito ajuda as nossas fraquezas; porque não sabemos o que havemos de pedir como convém, mas o mesmo Espírito intercede por nós com gemidos inexprimíveis. E aquele que examina os corações sabe qual é a intenção do Espírito; e é ele que segundo Deus intercede pelos santos.",
      reference: "Romanos 8:26-27",
    },
    meditation: `Há momentos na vida em que as palavras nos faltam. Dores profundas, dúvidas inquietantes ou situações que parecem não ter solução nos deixam sem forças até mesmo para orar. É nesse lugar de fraqueza que o Espírito Santo age de forma poderosa e graciosa. Ele conhece as profundezas do nosso coração e intercede por nós de acordo com a perfeita vontade de Deus.

Essa verdade nos convida a uma confiança renovada. Mesmo quando nossa oração é um simples suspiro ou lágrima, Deus entende. O Espírito Santo, nosso consolador e guia, está conosco, traduzindo aquilo que não conseguimos expressar em palavras. Não há fraqueza tão grande que Ele não possa transformar em força, e não há oração tão pequena que Ele não ouça e eleve ao Pai.`,
    prayer: `Pai Bondoso, obrigado por não me deixar sozinho nas minhas fraquezas. Sou grato pelo Teu Espírito que intercede por mim quando não sei como orar. Ensina-me a confiar na Tua sabedoria e no Teu cuidado, mesmo nos momentos de maior incerteza. Em nome de Jesus, amém.`,
    phraseOfDay: {
      text: "O Espírito Santo transforma nossas orações imperfeitas em louvores perfeitos diante de Deus.",
      author: "R. C. Sproul",
    },
    application: `Hoje, em um momento de quietude, permita-se simplesmente estar na presença de Deus, sem palavras. Confie que o Espírito Santo está intercedendo por você.`,
  },
  {
    id: 7,
    title: "Perseverança na Provação",
    verse: {
      text: "Bem-aventurado o homem que sofre a tentação; porque, quando for provado, receberá a coroa da vida, a qual o Senhor tem prometido aos que o amam.",
      reference: "Tiago 1:12",
    },
    meditation: `A vida cristã não é isenta de provações, mas é rica em promessas. Tiago nos ensina que há felicidade e recompensa eterna para aqueles que perseveram em meio às lutas. A coroa da vida é um lembrete da vitória final que aguardamos, um prêmio reservado aos que amam a Deus e confiam n'Ele, mesmo quando tudo ao redor parece desabar.

Deus não ignora as nossas batalhas, e as provações que enfrentamos não são em vão. Elas moldam nosso caráter, nos fortalecem na fé e nos aproximam mais do Senhor. Cada passo de obediência, cada escolha de confiar em Deus no meio da tempestade, é um ato de amor e devoção a Ele. Perseverar não é apenas resistir; é crescer, amadurecer e esperar com esperança na recompensa divina.`,
    prayer: `Senhor, ajuda-me a perseverar nas provações com alegria e confiança em Ti. Que eu possa lembrar que cada dificuldade é uma oportunidade de crescer e glorificar o Teu nome. Sustenta-me em meio às lutas, dá-me forças para continuar e mantém meus olhos na promessa da coroa da vida. Em nome de Jesus, amém.`,
    phraseOfDay: {
      text: "As dificuldades não são sinais de que Deus te abandonou; são oportunidades de conhecer Sua fidelidade de forma mais profunda.",
      author: "Charles Spurgeon",
    },
    application: `Qual provação você está enfrentando atualmente? Ore pedindo a Deus forças para perseverar e agradeça pela oportunidade de crescimento espiritual.`,
  },
  {
    id: 8,
    title: "O Deus que Faz Infinitamente Mais",
    verse: {
      text: "Ora, àquele que é poderoso para fazer tudo muito mais abundantemente além daquilo que pedimos ou pensamos, segundo o poder que em nós opera,",
      reference: "Efésios 3:20",
    },
    meditation: `O apóstolo Paulo nos lembra que Deus não é limitado pelas nossas expectativas. Ele é capaz de realizar coisas que ultrapassam a nossa compreensão, agindo com um poder que opera dentro de nós. Muitas vezes, colocamos limites em nossas orações e sonhos, mas o Deus que servimos é infinito em poder e amor. Ele age de maneiras que não apenas atendem às nossas necessidades, mas superam os nossos anseios mais profundos.

Esse versículo nos encoraja a confiar na grandeza de Deus. Não importa o desafio, o sonho ou a oração, Ele está trabalhando por nós e em nós. Quando vivemos em obediência e fé, experimentamos o Seu poder transformador em nossas vidas, que nos leva além do que podemos imaginar.`,
    prayer: `Deus Todo-Poderoso, eu Te louvo porque és capaz de fazer infinitamente mais do que posso pedir ou imaginar. Ajuda-me a confiar em Teu poder e Tua bondade, mesmo quando minhas circunstâncias parecem impossíveis. Guia meus passos e expande minha fé para viver segundo os Teus propósitos. Em nome de Jesus, amém.`,
    phraseOfDay: {
      text: "Se o tamanho da sua visão não assusta você, é porque ela é muito pequena para Deus.",
      author: "Steven Furtick",
    },
    application: `Há algum sonho ou oração que você tem limitado por achar impossível? Apresente-o a Deus hoje, confiando que Ele pode fazer infinitamente mais.`,
  },
  {
    id: 9,
    title: "A Fidelidade de Deus",
    verse: {
      text: "As misericórdias do Senhor são a causa de não sermos consumidos, porque as suas misericórdias não têm fim; novas são cada manhã; grande é a tua fidelidade.",
      reference: "Lamentações 3:22-23",
    },
    meditation: `A Bíblia faz questão de nos lembrar da verdade essencial sobre Deus: Ele é fiel. Nossa caminhada cristã pode ser marcada por momentos de fraqueza, dúvidas e até infidelidade. Contudo, a fidelidade de Deus não depende da nossa constância. Ele permanece firme, sustentando Seu caráter imutável e Suas promessas.

Quando somos tentados a desanimar ou nos afastar, a Bíblia nos encoraja a voltar os olhos para o Senhor. Sua fidelidade não é apenas uma promessa; é quem Ele é. É um convite à perseverança e à confiança, sabendo que mesmo em nossas falhas, Deus não nos abandona. Ele nos chama a viver uma vida que O reflete, sabendo que, em Cristo, temos a vitória final.`,
    prayer: `Senhor, obrigado por Tua fidelidade, que nunca muda, mesmo quando sou fraco. Ajuda-me a perseverar em Tua verdade e a confiar em Teu caráter. Ensina-me a ser fiel, assim como Tu és, e a viver uma vida que glorifique o Teu nome. Amém.`,
    phraseOfDay: {
      text: "Não confie em você mesmo, mas em Deus, que nunca falha.",
      author: "Charles Spurgeon",
    },
    application: `Nesta manhã, agradeça a Deus por Sua fidelidade renovada. Reflita sobre uma situação passada onde você experimentou a fidelidade de Deus.`,
  },
  {
    id: 10,
    title: "Nada Levaremos",
    verse: {
      text: "Como saiu do ventre de sua mãe, assim nu tornará, indo-se como veio; e nada tomará do seu trabalho, que possa levar na sua mão.",
      reference: "Eclesiastes 5:15",
    },
    meditation: `Neste versículo, Salomão nos lembra de uma verdade fundamental: somos peregrinos nesta terra. Nada do que acumulamos ficará conosco quando partirmos. É fácil nos perdermos na busca incessante por bens materiais, status ou conquistas, esquecendo que tudo pertence a Deus e que somos apenas administradores temporários.

Hoje te desafio a refletir sobre o que realmente importa na sua vida. Nossas posses e esforços terrenos são passageiros, mas nossas ações e obediência a Deus têm impacto eterno. Quando vivemos com essa perspectiva, nossas prioridades mudam, e buscamos investir em coisas que glorificam ao Senhor e abençoam os outros.`,
    prayer: `Senhor, ajuda-me a viver com sabedoria, reconhecendo que tudo o que tenho vem de Ti. Ensina-me a ser um bom administrador dos recursos que confiaste a mim e a valorizar aquilo que tem peso eterno. Que eu viva uma vida que Te glorifique em tudo. Amém.`,
    phraseOfDay: {
      text: "Quanto mais amor por bens materiais tivermos, mais distante do céu estaremos.",
      author: "Isaque Mariel",
    },
    application: `Avalie suas prioridades. Você tem investido mais em coisas temporais ou eternas? Escolha uma forma de abençoar alguém com seus recursos hoje.`,
  },
  {
    id: 11,
    title: "O Deus que Restaura",
    verse: {
      text: "Senhor meu Deus, clamei a ti, e tu me saraste. Senhor, fizeste subir a minha alma da sepultura; conservaste-me em vida, para que não descesse ao abismo.",
      reference: "Salmos 30:2-3",
    },
    meditation: `O Salmo 30 é um cântico de gratidão e testemunho da bondade de Deus. Davi clama ao Senhor em um momento de angústia e encontra cura e restauração. Este texto nos lembra de que Deus não apenas ouve as nossas orações, mas age em favor dos que confiam Nele.

Quantas vezes nos sentimos como se estivéssemos à beira da "cova", presos em lutas, enfermidades ou desespero? É nesses momentos que podemos clamar ao Senhor, sabendo que Ele tem o poder de transformar a tristeza em alegria e de nos erguer das situações mais difíceis. A cura que Deus oferece não é apenas física, mas também espiritual e emocional.`,
    prayer: `Senhor, obrigado porque ouves o meu clamor e és o Deus que restaura. Nos momentos de dor, ajuda-me a confiar em Ti e a lembrar que tua cura e salvação são completas. Ensina-me a testemunhar tua bondade para que outros vejam o Teu poder em minha vida. Amém.`,
    phraseOfDay: {
      text: "A oração é o alicerce da fé; é nela que encontramos cura e restauração.",
      author: "Andrew Murray",
    },
    application: `Há alguma área da sua vida que precisa de restauração? Clame ao Senhor hoje e confie em Seu poder de cura e renovação.`,
  },
  {
    id: 12,
    title: "Orando em Espírito",
    verse: {
      text: "Orando em todo o tempo com toda a oração e súplica no Espírito, e vigiando nisto com toda a perseverança e súplica por todos os santos.",
      reference: "Efésios 6:18",
    },
    meditation: `A oração é o pilar que sustenta nossa caminhada cristã. Em Efésios 6, Paulo nos exorta a nos revestirmos da armadura de Deus, e encerra esse chamado com uma ordem clara: orar em todas as ocasiões. Isso nos mostra que a oração não é apenas uma prática ocasional, mas uma atitude constante de conexão com o Senhor.

Orar no Espírito significa buscar a orientação e o poder de Deus em nossas orações, entregando a Ele nossas lutas, preocupações e agradecimentos. Além disso, somos chamados a interceder uns pelos outros, demonstrando amor e cuidado pela família da fé. A oração perseverante é o combustível que nos mantém firmes em meio às batalhas da vida, lembrando-nos de que não lutamos sozinhos.`,
    prayer: `Senhor, ensina-me a orar em todo tempo, com um coração cheio de fé e rendição a Ti. Ajuda-me a interceder por aqueles que precisam do Teu cuidado e a confiar que Tu ouves cada clamor. Que minha vida seja marcada por uma oração constante e sincera. Amém.`,
    phraseOfDay: {
      text: "A oração é o exercício da fé. É por meio dela que experimentamos a intimidade com Deus.",
      author: "E.M. Bounds",
    },
    application: `Estabeleça um momento específico do seu dia para orar. Comece intercedendo por pessoas ao seu redor que precisam da graça de Deus.`,
  },
  {
    id: 13,
    title: "O Poder de Orar pelos Outros",
    verse: {
      text: "E o Senhor virou o cativeiro de Jó, quando orava pelos seus amigos; e o Senhor acrescentou a Jó outro tanto em dobro a tudo quanto dantes possuía.",
      reference: "Jó 42:10",
    },
    meditation: `A história de Jó nos ensina lições profundas sobre a fé, a perseverança e o poder da intercessão. No momento mais difícil de sua vida, Jó enfrentou críticas e julgamentos de seus amigos, que ao invés de consolá-lo, questionaram sua integridade. Mesmo assim, no final de sua jornada, Deus pediu a Jó que orasse por eles. Ao obedecer, não apenas os amigos foram restaurados, mas Jó também experimentou a bênção de Deus em dobro.

Esse gesto de orar pelos outros, incluindo aqueles que nos machucaram, é uma manifestação de graça e humildade. Jesus também nos ensinou a amar e orar por nossos inimigos (Mateus 5:44). Quando intercedemos pelos outros, liberamos perdão e refletimos o coração de Deus, permitindo que Sua paz e bênçãos fluam em nossas vidas. A intercessão é um ato poderoso que transforma não apenas aqueles por quem oramos, mas também o nosso próprio coração.`,
    prayer: `Pai amoroso, Ensina-me a liberar perdão e a interceder com um coração cheio de amor e compaixão. Que através dessas orações, eu veja a Tua obra restauradora tanto na vida deles quanto na minha. Em nome de Jesus, amém.`,
    phraseOfDay: {
      text: "A oração pelos outros é o amor mais puro que podemos oferecer.",
      author: "Corrie ten Boom",
    },
    application: `Há alguém que te magoou e por quem você pode orar hoje? Faça uma oração de bênção sobre essa pessoa e experimente a liberdade do perdão.`,
  },
  {
    id: 14,
    title: "Vivendo com Sabedoria",
    verse: {
      text: "Ensina-nos a contar os nossos dias, de tal maneira que alcancemos corações sábios.",
      reference: "Salmos 90:12",
    },
    meditation: `O salmista nos dá um lembrete profundo da brevidade da vida e da eternidade de Deus. Moisés, ao escrever este salmo, reconhece a fragilidade da existência humana e clama ao Senhor para que Ele ensine o Seu povo a viver de forma sábia. Contar os dias não significa apenas numerá-los, mas compreender o valor de cada momento, escolhendo viver com propósito e em obediência à vontade de Deus.

Em um mundo tão acelerado, é fácil nos perdermos em preocupações e distrações. No entanto, este versículo nos chama a pausar e refletir: estamos investindo nossa vida em coisas eternas ou em futilidades? Quando vivemos com sabedoria, alinhamos nossas prioridades com os valores do Reino de Deus, reconhecendo que cada dia é um presente que deve ser usado para glorificar o Senhor e impactar os outros.`,
    prayer: `Senhor eterno, ensina-me a valorizar cada dia que me concedes e a vivê-lo com sabedoria. Ajuda-me a alinhar minhas escolhas e ações com a Tua vontade, para que minha vida reflita a Tua glória. Que eu não desperdice o tempo, mas o invista em coisas que têm valor eterno. Em nome de Jesus, amém.`,
    phraseOfDay: {
      text: "A verdadeira sabedoria não está em conhecer muitas coisas, mas em viver cada dia à luz da eternidade.",
      author: "A.W. Tozer",
    },
    application: `Reflita: como você tem usado seu tempo? Hoje, escolha fazer algo que tenha impacto eterno – seja uma palavra de encorajamento, um ato de bondade ou tempo em oração.`,
  },
  {
    id: 15,
    title: "Segurando a Mão de Deus",
    verse: {
      text: "Porque eu, o Senhor teu Deus, te tomo pela tua mão direita, e te digo: Não temas, que eu te ajudo.",
      reference: "Isaías 41:13",
    },
    meditation: `Este versículo é um poderoso lembrete da proximidade e do cuidado de Deus. Ele não é um Deus distante, mas um Pai amoroso que segura a nossa mão, oferecendo segurança e direção. No contexto de Isaías 41, Deus fala ao Seu povo, assegurando que, mesmo em meio a dificuldades e desafios, Ele está presente, ajudando e fortalecendo.

Quantas vezes nos sentimos sobrecarregados pelas incertezas da vida? Em momentos assim, é fácil deixar o medo tomar conta. Mas Deus nos convida a confiar n'Ele, lembrando-nos de que não enfrentamos as lutas sozinhos. Ao segurar nossa mão, Ele não apenas nos sustenta, mas também nos guia no caminho certo, dando-nos força e coragem para avançar.`,
    prayer: `Senhor, obrigado porque seguras a minha mão e me ajudas nos momentos de medo e fraqueza. Ensina-me a confiar plenamente em Ti, sabendo que nunca estou sozinho. Fortalece meu coração e guia meus passos, para que eu possa caminhar com segurança e paz em Tua presença. Em nome de Jesus, amém.`,
    phraseOfDay: {
      text: "Se o Senhor segura nossa mão, não há tempestade que nos derrube.",
      author: "Corrie Ten Boom",
    },
    application: `Em que área da sua vida você precisa sentir a mão de Deus te guiando? Entregue esse medo ou incerteza a Ele hoje e descanse em Sua promessa de ajuda.`,
  },
  {
    id: 16,
    title: "Preparando o Solo para a Chuva do Senhor",
    verse: {
      text: "Semeiem a justiça para vocês mesmos, colham o fruto do amor leal e façam sulcos no seu campo não arado, pois é tempo de buscar o SENHOR, até que ele venha e faça chover justiça sobre vocês.",
      reference: "Oséias 10:12",
    },
    meditation: `Oséias nos apresenta uma chamada poderosa à transformação. O profeta usa a metáfora da agricultura para ilustrar como nossas ações e escolhas espirituais podem produzir frutos abundantes de justiça e vida. Semeando justiça significa viver de acordo com os princípios de Deus, em obediência e lealdade ao Seu chamado.

O solo dos nossos corações precisa ser preparado continuamente. Isso exige arrependimento genuíno, busca fervorosa por Deus e uma abertura para que Ele remova as "ervas daninhas" que impedem o crescimento espiritual. Ao buscarmos o Senhor com sinceridade, Ele promete derramar Suas bênçãos como uma chuva que revigora e transforma. Este é um convite a abandonar hábitos que não agradam a Deus e a investir em uma vida alinhada à Sua vontade.`,
    prayer: `Pai amado, ajuda-me a preparar o solo do meu coração para receber Tua Palavra e viver em justiça. Ensina-me a semear bondade, amor e lealdade em todas as áreas da minha vida. Que minha busca por Ti seja constante, e que a Tua chuva de bênçãos me transforme e frutifique para a Tua glória. Em nome de Jesus, amém.`,
    phraseOfDay: {
      text: "Aquilo que semeamos em nossos corações determinará o que colheremos em nossas vidas.",
      author: "Charles Spurgeon",
    },
    application: `Reflita sobre os "campos não arados" do seu coração. Que áreas da sua vida precisam de arrependimento e renovação? Dedique um tempo hoje para buscar o Senhor em oração.`,
  },
  {
    id: 17,
    title: "Vivendo na Liberdade em Cristo",
    verse: {
      text: "Foi para a liberdade que Cristo nos libertou. Portanto, permaneçam firmes e não se deixem submeter novamente a um jugo de escravidão.",
      reference: "Gálatas 5:1",
    },
    meditation: `Em Gálatas 5:1, Paulo nos lembra do propósito da obra redentora de Cristo: nos libertar de toda escravidão espiritual. Essa liberdade, porém, não é um passaporte para vivermos de maneira irresponsável, mas sim um chamado para caminharmos em obediência e gratidão.

Antes de conhecer Cristo, estávamos presos ao pecado, dominados por forças que nos afastavam de Deus. Agora, em Cristo, somos livres para viver uma vida de plenitude, movidos pelo Espírito e capacitados a refletir Seu amor ao mundo. Permanecer firmes nessa liberdade significa resistir à tentação de retornar a práticas que nos aprisionam e nos afastam da graça. Deus nos chama a viver em santidade, desfrutando da liberdade de sermos Seus filhos e agentes de transformação neste mundo.`,
    prayer: `Senhor, obrigado por me libertar das correntes do pecado e me chamar para uma vida de liberdade em Cristo. Ajuda-me a permanecer firme na Tua verdade, rejeitando tudo o que tenta me afastar de Ti. Que minha liberdade seja usada para Te glorificar e servir ao próximo com amor e humildade. Em nome de Jesus, amém.`,
    phraseOfDay: {
      text: "A liberdade cristã não é uma licença para pecar, mas uma oportunidade para servir e glorificar a Deus.",
      author: "John Stott",
    },
    application: `Examine sua vida: há algum "jugo de escravidão" ao qual você está retornando? Identifique hábitos ou padrões que te afastam de Deus e entregue-os a Ele hoje.`,
  },
  {
    id: 18,
    title: "O Verdadeiro Pão da Vida",
    verse: {
      text: "Eu sou o pão da vida. Quem vem a mim não terá mais fome e quem crê em mim nunca mais terá sede.",
      reference: "João 6:35",
    },
    meditation: `Vivemos em um mundo faminto. Não apenas por comida, mas por propósito, satisfação e sentido. A busca por saciar essa fome interior muitas vezes nos leva a fontes que prometem, mas não entregam – dinheiro, relacionamentos, status ou prazer momentâneo.

Jesus se apresenta como o único capaz de satisfazer verdadeiramente a nossa alma. Ele não apenas nos dá algo para consumir, Ele é o alimento eterno que preenche todo vazio. Quando nos aproximamos d'Ele e confiamos na Sua provisão, encontramos uma satisfação que nada mais pode oferecer.

Hoje, pergunte a si mesmo: onde você tem buscado saciar sua fome espiritual? Lembre-se de que só Jesus pode oferecer o pão que realmente sustenta, e Ele o faz com graça abundante.`,
    prayer: `Senhor, obrigado porque em Ti eu encontro tudo o que minha alma precisa. Tu és o pão que sustenta minha vida e a fonte da minha satisfação. Ajuda-me a buscar em Ti o que o mundo nunca poderá oferecer. Em nome de Jesus, amém.`,
    phraseOfDay: {
      text: "Há um vazio no coração humano que só Deus pode preencher.",
      author: "Agostinho de Hipona",
    },
    application: `Reflita: onde você tem buscado satisfação além de Jesus? Hoje, dedique um tempo para alimentar-se da Palavra de Deus e encontrar n'Ele a verdadeira saciedade.`,
  },
  {
    id: 19,
    title: "O Valor do Amor Simples",
    verse: {
      text: "É melhor ter verduras na refeição onde há amor do que um boi gordo acompanhado de ódio.",
      reference: "Provérbios 15:17",
    },
    meditation: `Vivemos em uma sociedade que frequentemente valoriza mais o "ter" do que o "ser". Muitas vezes, somos levados a acreditar que ter as melhores coisas – roupas, carros, casas – é o que define uma vida bem-sucedida. No entanto, o livro de Provérbios nos lembra que, sem amor, todas essas coisas perdem o valor.

O amor, o cuidado e a harmonia são os verdadeiros tesouros em um lar. Um simples prato compartilhado em comunhão, cheio de afeto e respeito, vale mais do que o banquete mais luxuoso rodeado por rancor e frieza. É no amor que a presença de Deus se manifesta e que experimentamos verdadeira alegria.`,
    prayer: `Senhor, ensina-me a valorizar o amor e a paz pelas pessoas acima de qualquer coisa material. Ajuda-me a construir um lar onde o Teu amor reine e onde a simplicidade seja vivida com alegria. Que minhas atitudes reflitam Tua graça em tudo o que faço. Em nome de Jesus, amém.`,
    phraseOfDay: {
      text: "Onde não há amor, nada vale; onde há amor, nada falta.",
      author: "Martinho Lutero",
    },
    application: `Avalie seus relacionamentos hoje. Há alguém com quem você precisa reconciliar-se ou demonstrar mais amor? Dê um passo prático nessa direção.`,
  },
  {
    id: 20,
    title: "Caminhando pela Fé",
    verse: {
      text: "Porque vivemos por fé, e não pelo que vemos.",
      reference: "2 Coríntios 5:7",
    },
    meditation: `Em um mundo tão dependente do que é visível, palpável e comprovado, Deus nos chama a uma jornada completamente diferente: caminhar pela fé. Isso significa confiar em Suas promessas, mesmo quando não conseguimos enxergar o próximo passo. É desafiador, especialmente quando enfrentamos situações incertas, mas é exatamente nessas horas que nossa fé é fortalecida.

Paulo nos lembra que viver pela fé não é ignorar a realidade, mas enxergar além dela. É saber que Deus está no controle, mesmo quando os ventos parecem contrários. É lembrar que Sua Palavra é fiel e que Ele nunca falhou com aqueles que confiam n'Ele.

Talvez hoje você esteja enfrentando dúvidas ou desafios que parecem insuperáveis. Lembre-se: Deus já está no futuro, preparando o caminho. Não dependa apenas dos seus olhos físicos, mas confie na visão espiritual que Ele concede por meio de Sua Palavra. Caminhar pela fé é depositar nossa total dependência em Deus, sabendo que Ele sempre cumprirá Suas promessas no tempo certo.`,
    prayer: `Pai, ensina-me a caminhar pela fé e não pelos meus próprios olhos. Ajuda-me a confiar em Ti, mesmo quando não vejo a solução ou o caminho. Que minha vida seja um testemunho de dependência em Tua graça e poder. Fortalece meu coração e guia meus passos, para que eu viva de acordo com Tua vontade. Em nome de Jesus, amém.`,
    phraseOfDay: {
      text: "Fé é dar o primeiro passo, mesmo quando você não consegue ver toda a escada.",
      author: "Martin Luther King Jr.",
    },
    application: `Em qual área da sua vida você precisa exercitar mais fé? Identifique uma situação e entregue-a a Deus, confiando em Seu cuidado.`,
  },
  {
    id: 21,
    title: "Fortalecidos no Senhor",
    verse: {
      text: "Finalmente, fortaleçam-se no Senhor e no seu forte poder.",
      reference: "Efésios 6:10",
    },
    meditation: `A vida cristã é uma batalha constante. Não lutamos contra carne e sangue, mas contra forças espirituais que tentam nos afastar do caminho de Deus. Paulo, ao escrever aos Efésios, nos lembra que nossa força não vem de nós mesmos, mas do Senhor. Ele é a fonte do poder que nos sustenta, protege e nos capacita a resistir aos ataques do inimigo.

Fortalecer-se no Senhor é um chamado para confiar em Sua presença, alimentar-se de Sua Palavra e buscar a comunhão com Ele em oração. É reconhecer que, sozinhos, somos fracos, mas com Deus, somos mais que vencedores. A armadura de Deus, descrita neste mesmo capítulo, é um lembrete de que Ele nos equipa com tudo o que precisamos: a verdade, a justiça, a fé, a salvação, a Palavra e a oração.`,
    prayer: `Senhor, eu reconheço que sozinho sou fraco, mas em Ti encontro força. Ensina-me a depender do Teu poder e a vestir Tua armadura todos os dias. Fortalece meu coração, renova minha mente e guia meus passos no caminho da justiça. Em nome de Jesus, amém.`,
    phraseOfDay: {
      text: "Deus nos dá força suficiente para cada dia, uma graça renovada para cada passo e um poder inabalável para enfrentar qualquer tempestade.",
      author: "Corrie Ten Boom",
    },
    application: `Qual batalha você está enfrentando hoje? Reserve um tempo para orar e pedir a Deus que te fortaleça com Seu poder.`,
  },
  {
    id: 22,
    title: "O Plano de Deus Prevalecerá",
    verse: {
      text: "Muitos são os planos no coração do homem, mas o desígnio do Senhor prevalecerá.",
      reference: "Provérbios 19:21",
    },
    meditation: `A vida é marcada por escolhas, sonhos e planos. Todos nós traçamos metas e ansiamos por realizações. No entanto, a sabedoria de Provérbios nos lembra que, por mais que façamos planos, a vontade de Deus é a que se cumpre. Isso não é uma limitação, mas um conforto, pois os propósitos do Senhor são sempre bons, perfeitos e agradáveis.

Em um mundo que valoriza a autonomia e o controle, essa verdade pode ser desafiadora. Queremos traçar nosso caminho e muitas vezes ignoramos o Criador do universo, que conhece cada detalhe do nosso futuro. Às vezes, nossos planos falham, mas isso não significa derrota; é Deus redirecionando nossas vidas para algo maior e melhor do que poderíamos imaginar.

Quantas vezes algo que parecia frustrante resultou em uma bênção inesperada? Os caminhos de Deus podem ser misteriosos, mas são sempre para o nosso bem e para a Sua glória. Confiar Nele significa abrir mão do controle e descansar na certeza de que Ele está à frente, guiando-nos com amor.`,
    prayer: `Senhor, reconheço que os Teus planos são maiores e melhores do que os meus. Ajuda-me a confiar em Ti, mesmo quando não entendo o que está acontecendo. Ensina-me a submeter meu coração e meus desejos à Tua vontade. Guia-me em cada passo e fortalece minha fé para seguir confiante no Teu propósito. Em nome de Jesus, amém.`,
    phraseOfDay: {
      text: "Deus nunca faz nada acidentalmente, e Ele nunca desperdiça sofrimento. Se você está passando por algo difícil, confie Nele: Ele tem um propósito.",
      author: "Rick Warren",
    },
    application: `Há algum plano seu que não saiu como esperado? Reflita sobre como Deus pode estar redirecionando sua vida para algo melhor.`,
  },
  {
    id: 23,
    title: "Confiança na Oração",
    verse: {
      text: "Por isso, eu lhes digo: tudo o que pedirem em oração, creiam que já o receberam, e isso lhes será concedido.",
      reference: "Marcos 11:24",
    },
    meditation: `A oração é uma das maiores dádivas que Deus nos concedeu para nos conectarmos diretamente com Ele. Em Marcos 11:24, Jesus nos desafia a apresentar nossos pedidos com uma fé inabalável. Mas quantas vezes oramos com dúvidas no coração? A confiança na oração é mais do que palavras; é uma atitude do coração que acredita plenamente na soberania e bondade de Deus.

No entanto, confiar na oração não significa receber tudo o que desejamos. Antes, é confiar que Deus sabe o que é melhor para nós e responderá conforme a Sua vontade perfeita. Como Charles Spurgeon afirmou: "Deus está mais disposto a ouvir orações do que nós a orar. Ele está mais pronto a dar-nos boas coisas do que estamos a buscá-las."`,
    prayer: `Pai celestial, obrigado porque sempre ouves minhas orações, mesmo antes de eu falar. Ensina-me a confiar mais em Ti e a apresentar os meus pedidos com fé. Que eu possa descansar em Tua vontade e confiar no Teu tempo perfeito. Em nome de Jesus, amém.`,
    phraseOfDay: {
      text: "A oração não é para informar Deus, mas para conformar-nos à vontade Dele.",
      author: "John Stott",
    },
    application: `Há algum pedido que você tem apresentado a Deus com dúvidas? Hoje, ore com fé renovada, confiando na resposta do Senhor.`,
  },
  {
    id: 24,
    title: "Trocando o Fardo Pesado",
    verse: {
      text: "Venham a mim todos os que estão cansados e sobrecarregados, e eu darei descanso a vocês. Tomem sobre vocês o meu jugo e aprendam de mim, porque sou manso e humilde de coração, e vocês encontrarão descanso para a alma. Pois o meu jugo é suave, e o meu fardo é leve.",
      reference: "Mateus 11:28-30",
    },
    meditation: `A vida muitas vezes nos apresenta desafios que nos fazem sentir o peso do cansaço, seja ele físico, emocional ou espiritual. Quantas vezes nos vemos sobrecarregados, tentando carregar fardos que não fomos feitos para suportar sozinhos? Nesse convite em Mateus 11, Jesus não apenas nos oferece descanso, mas também a oportunidade de aprender com Ele. Sua mansidão e humildade nos mostram que não precisamos enfrentar as batalhas com nossas forças limitadas.

O jugo que Ele menciona simboliza um fardo ajustado ao nosso limite, feito sob medida para nos libertar ao invés de nos prender. Jesus troca o peso de nossas preocupações pelo descanso em Sua presença. Ele não promete uma vida sem desafios, mas garante que, caminhando ao Seu lado, encontraremos paz e renovação. No mundo agitado e ansioso em que vivemos, esse convite é um lembrete de que a verdadeira paz não está nas circunstâncias, mas no relacionamento com Cristo.`,
    prayer: `Senhor Jesus, ensina-me a confiar plenamente no Teu cuidado e a entregar os meus fardos ao Teu altar. Que a Tua paz inunde o meu coração em meio às tempestades da vida, e que eu aprenda de Ti, vivendo em mansidão e humildade. Ajuda-me a caminhar ao Teu lado, confiando que o Teu jugo é suave e o Teu fardo é leve. Amém.`,
    phraseOfDay: {
      text: "Somente quando lançamos nossas cargas aos pés de Jesus descobrimos a leveza que Ele oferece para a alma.",
      author: "Charles Spurgeon",
    },
    application: `Qual fardo você tem carregado sozinho? Hoje, entregue-o a Jesus em oração e experimente o descanso que Ele oferece.`,
  },
  {
    id: 25,
    title: "A Verdadeira Riqueza da Vida",
    verse: {
      text: "Então lhes disse: Cuidado! Fiquem de sobreaviso contra todo tipo de ganância; a vida de um homem não consiste na quantidade dos seus bens.",
      reference: "Lucas 12:15",
    },
    meditation: `Vivemos em um mundo que frequentemente mede o sucesso e a felicidade pelo que possuímos: bens materiais, dinheiro, status. No entanto, Jesus nos alerta em Lucas 12:15 sobre o perigo da ganância e a falsa segurança que ela promete. Ele nos lembra que a verdadeira essência da vida não está nas posses que acumulamos, mas em um coração voltado para Deus e para os outros.

A ganância pode nos cegar para aquilo que realmente importa – nosso relacionamento com Deus, com a família, amigos e nossa contribuição para o bem do próximo. Os bens materiais podem desaparecer, mas a riqueza espiritual é eterna. Ao invés de buscar acumular, somos chamados a viver com gratidão, generosidade e propósito, reconhecendo que tudo o que temos vem de Deus.

Como o apóstolo Paulo disse em 1 Timóteo 6:7, "Nada trouxemos para este mundo, e dele nada podemos levar." Por isso, a nossa prioridade deve ser investir em tesouros celestiais, aqueles que não se corroem nem são roubados, mas que têm valor eterno.`,
    prayer: `Pai Celestial, ensina-me a viver com contentamento e gratidão, valorizando as coisas que realmente importam. Ajuda-me a ser generoso, a cuidar das pessoas ao meu redor e a colocar meu coração em tesouros eternos, em vez de bens passageiros. Em nome de Jesus, amém.`,
    phraseOfDay: {
      text: "A medida da verdadeira riqueza não está naquilo que acumulamos, mas naquilo que compartilhamos.",
      author: "Randy Alcorn",
    },
    application: `Avalie suas prioridades: você tem investido mais em coisas temporais ou eternas? Hoje, pratique a generosidade de alguma forma.`,
  },
];

export const AVAILABLE_DEVOTIONAL_DAYS = 25;
