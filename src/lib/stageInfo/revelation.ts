// Fichas ESPECÍFICAS por (capítulo → papel) de revelation — quem é aquela figura
// (mesmo anônima na Bíblia) no contexto daquele capítulo, biblicamente e
// teologicamente. Vence a ficha genérica do papel. Preenchido pelo agente.
import type { StageInfo } from "@/lib/rpgStageInfo";
export const CHAPTER_ACTORS: Record<number, Record<string, StageInfo>> = {
  5: {
    multidao: {
      title: "Toda a criatura que adora o Cordeiro",
      subtitle: "Apocalipse 5 • o louvor do céu e da terra",
      text: "É a incontável multidão de anjos ao redor do trono — milhões de milhões — e, com eles, toda criatura no céu, na terra, debaixo da terra e no mar (Ap 5:11-13). Cantam o novo cântico ao Cordeiro morto que, com seu sangue, comprou homens de toda tribo, língua, povo e nação (Ap 5:9). Teologicamente, é a criação inteira reconhecendo que só o Cordeiro é digno de abrir o livro: a redenção do Calvário desagua na adoração cósmica.",
    },
  },
  6: {
    cavaleiro: {
      title: "Os cavaleiros dos selos",
      subtitle: "Apocalipse 6 • os cavalos do juízo",
      text: "São os quatro que cavalgam quando o Cordeiro abre os selos: o cavalo branco que sai vencendo, o vermelho que tira a paz, o preto da balança e da fome, e o amarelo cujo cavaleiro tem por nome Morte, seguido do inferno (Ap 6:2-8). Não são heróis, mas instrumentos do juízo permitido sobre a terra. Teologicamente, mostram que a história — guerra, fome e peste — não escapa às mãos do Cordeiro que abriu os selos.",
    },
    homem: {
      title: "Os que se escondem da ira do Cordeiro",
      subtitle: "Apocalipse 6 • o sexto selo",
      text: "São os reis da terra, os grandes, os ricos, os poderosos e todo servo e livre que, ao sexto selo, se escondem nas cavernas e nas rochas (Ap 6:15). Bradam aos montes que caiam sobre eles, para escondê-los do rosto daquele que está no trono e da ira do Cordeiro (Ap 6:16). Teologicamente, retratam a humanidade que, diante do grande dia da ira, busca refúgio em qualquer lugar menos na graça: \"quem poderá subsistir?\" (Ap 6:17).",
    },
  },
  7: {
    multidao: {
      title: "A grande multidão dos remidos",
      subtitle: "Apocalipse 7 • os que vieram da grande tribulação",
      text: "É a multidão que ninguém pode contar, de todas as nações, tribos, povos e línguas, diante do trono e do Cordeiro, com vestes brancas e palmas nas mãos (Ap 7:9). São os que vieram da grande tribulação e lavaram suas vestes no sangue do Cordeiro (Ap 7:14). Teologicamente, é a colheita da cruz — nunca mais fome nem sede, e Deus enxuga toda lágrima (Ap 7:16-17): a promessa a Abraão de uma descendência inumerável cumprida no Cordeiro.",
    },
  },
  9: {
    homem: {
      title: "Os homens sem o selo de Deus",
      subtitle: "Apocalipse 9 • o tormento das trombetas",
      text: "São os homens que não têm nas testas o selo de Deus, atormentados pelos gafanhotos do abismo por cinco meses (Ap 9:4-5). Naqueles dias buscarão a morte e não a acharão; desejarão morrer, e a morte fugirá deles (Ap 9:6). Teologicamente, encarnam a humanidade endurecida que, mesmo sob as trombetas, não se arrepende dos seus homicídios, feitiçarias e idolatria (Ap 9:20-21): o juízo os fere, mas não os quebranta.",
    },
    mulherComum: {
      title: "Uma das habitantes da terra sob as trombetas",
      subtitle: "Apocalipse 9 • a humanidade não selada",
      text: "A Escritura não a nomeia, mas ela está entre os moradores da terra que não trazem o selo de Deus e sofrem o tormento das trombetas (Ap 9:4-6). Pertence aos \"outros homens\" que, poupados das pragas, não se arrependem das obras de suas mãos (Ap 9:20). Teologicamente, é rosto da geração que prefere adorar demônios e ídolos de ouro e pedra a voltar-se para o Deus vivo que a adverte pelo juízo.",
    },
    multidao: {
      title: "A humanidade ferida pelas trombetas",
      subtitle: "Apocalipse 9 • a terça parte dos homens",
      text: "É a massa dos moradores da terra sobre quem se abatem a quinta e a sexta trombetas — os soltos junto ao Eufrates matam a terça parte dos homens pelo fogo, pela fumaça e pelo enxofre (Ap 9:15,18). Os que sobram não se arrependem dos seus ídolos nem dos seus pecados (Ap 9:20-21). Teologicamente, é a humanidade sob advertência final: o juízo se intensifica, e ainda assim o coração idólatra resiste ao arrependimento.",
    },
  },
  11: {
    mulherComum: {
      title: "Uma das que se alegram sobre as testemunhas",
      subtitle: "Apocalipse 11 • os habitantes da terra",
      text: "A Bíblia não lhe dá nome, mas ela está entre os povos, tribos, línguas e nações que veem os corpos das duas testemunhas na praça da grande cidade (Ap 11:9). Regozija-se com os moradores da terra, alegrando-se e mandando presentes, porque os dois profetas os atormentavam (Ap 11:10). Teologicamente, é o mundo que festeja o silêncio da profecia — até que o espírito de vida ergue os mártires e grande temor a alcança (Ap 11:11).",
    },
    multidao: {
      title: "Os povos que contemplam as testemunhas",
      subtitle: "Apocalipse 11 • as duas testemunhas mortas",
      text: "É a gente de vários povos, tribos, línguas e nações que por três dias e meio contempla os corpos das duas testemunhas e não os deixa sepultar (Ap 11:9). Ao ver os profetas ressuscitados e a cidade abalada pelo terremoto, os que restam ficam atemorizados e dão glória ao Deus do céu (Ap 11:13). Teologicamente, é a multidão diante do testemunho que primeiro escarnece e depois se curva — antevendo o dia em que os reinos do mundo passam a ser do Senhor e do seu Cristo (Ap 11:15).",
    },
  },
  12: {
    mulher: {
      title: "A mulher vestida do sol",
      subtitle: "Apocalipse 12 • o povo de Deus que dá à luz o Messias",
      text: "É a mulher do grande sinal no céu, vestida do sol, com a lua sob os pés e uma coroa de doze estrelas, que em dores de parto dá à luz o filho homem arrebatado para o trono (Ap 12:1-2,5). Representa o povo de Deus — Israel e a Igreja — de quem, segundo a carne, veio o Cristo. Teologicamente, ela é perseguida pelo dragão mas guardada por Deus no deserto (Ap 12:6,14): a comunidade da aliança que Deus sustenta apesar da fúria de Satanás.",
    },
    multidao: {
      title: "O remanescente que guarda os mandamentos",
      subtitle: "Apocalipse 12 • a semente da mulher",
      text: "É o restante da semente da mulher, contra quem o dragão, derrotado no céu, sai a fazer guerra: os que guardam os mandamentos de Deus e têm o testemunho de Jesus (Ap 12:17). São os que o venceram pelo sangue do Cordeiro e pela palavra do seu testemunho, não amando as suas vidas até à morte (Ap 12:11). Teologicamente, é a Igreja fiel na tribulação — visada pela ira do diabo, mas mais que vencedora pela vitória do Cordeiro.",
    },
  },
  13: {
    multidao: {
      title: "Os habitantes da terra que adoram a besta",
      subtitle: "Apocalipse 13 • toda a terra maravilhada",
      text: "É a multidão de toda a terra que se maravilha após a besta cuja chaga mortal foi curada, e a adora perguntando: \"Quem é semelhante à besta?\" (Ap 13:3-4). São todos os moradores da terra cujos nomes não estão no livro da vida do Cordeiro (Ap 13:8). Teologicamente, é a humanidade que troca a adoração do Cordeiro pela adoração do poder blasfemo — a idolatria universal que a besta arranca do mundo.",
    },
    homem: {
      title: "O homem que recebe a marca da besta",
      subtitle: "Apocalipse 13 • o sinal na mão e na testa",
      text: "É o homem a quem, pequeno ou grande, rico ou pobre, livre ou servo, é posto o sinal na mão direita ou na testa, sem o qual ninguém pode comprar ou vender (Ap 13:16-17). Seu próprio número — seiscentos e sessenta e seis — é dito \"o número de um homem\" (Ap 13:18). Teologicamente, personifica a criatura que sela a si mesma no domínio da besta, marca que arremeda o selo dos servos de Deus e a exclui do livro da vida.",
    },
    mulherComum: {
      title: "Uma das que recebem a marca",
      subtitle: "Apocalipse 13 • pequenos e grandes marcados",
      text: "A Escritura não a nomeia, mas ela está entre \"todos, pequenos e grandes, ricos e pobres, livres e servos\" a quem se põe o sinal na mão ou na testa (Ap 13:16). Como os demais moradores da terra sem nome no livro da vida, adora a imagem da besta para poder comprar e vender (Ap 13:8,17). Teologicamente, é rosto da mulher comum arrastada à apostasia econômica e religiosa — a pressão do sistema da besta sobre a vida cotidiana.",
    },
  },
  14: {
    multidao: {
      title: "Os cento e quarenta e quatro mil",
      subtitle: "Apocalipse 14 • os remidos sobre o monte Sião",
      text: "É a multidão que está com o Cordeiro sobre o monte Sião, com o nome do Pai escrito nas testas, cantando o cântico novo que só eles podem aprender (Ap 14:1-3). São os comprados dentre os homens como primícias para Deus e para o Cordeiro, irrepreensíveis e sem engano na boca (Ap 14:4-5). Teologicamente, são a colheita santa que segue o Cordeiro aonde quer que vá — o oposto exato da multidão marcada pela besta.",
    },
  },
  15: {
    multidao: {
      title: "Os vencedores da besta junto ao mar de vidro",
      subtitle: "Apocalipse 15 • o cântico de Moisés e do Cordeiro",
      text: "É a multidão dos que saíram vitoriosos da besta, da sua imagem e do número do seu nome, de pé junto ao mar de vidro misturado com fogo, com as harpas de Deus (Ap 15:2). Cantam o cântico de Moisés, servo de Deus, e o cântico do Cordeiro, exaltando os caminhos justos e verdadeiros do Rei dos santos (Ap 15:3-4). Teologicamente, são o novo Israel à beira de um novo Mar Vermelho, louvando o Deus que os fez atravessar o juízo antes que as taças fossem derramadas.",
    },
  },
  16: {
    homem: {
      title: "Os homens sob as taças da ira",
      subtitle: "Apocalipse 16 • as sete últimas pragas",
      text: "São os homens que têm o sinal da besta e adoram a sua imagem, feridos de chaga má e maligna, abrasados por grandes calores e mordendo as línguas de dor (Ap 16:2,9-10). A cada taça blasfemam do nome de Deus e não se arrependem para lhe dar glória (Ap 16:9,11,21). Teologicamente, encarnam o coração endurecido no ápice do juízo: o sofrimento não os quebranta, apenas expõe a idolatria consumada.",
    },
    mulherComum: {
      title: "Uma das que sofrem as taças",
      subtitle: "Apocalipse 16 • a humanidade sob a ira",
      text: "A Escritura não a nomeia, mas ela está entre os homens marcados que padecem as sete taças — chagas, calor abrasador, trevas e a saraiva de um talento (Ap 16:2,8,10,21). Como todos ali, blasfema de Deus e não se arrepende das suas obras (Ap 16:11). Teologicamente, é rosto da criatura que colhe o fruto da adoração à besta: a mesma copa da ira que Babilônia serviu ao mundo volta-se agora sobre os que a beberam.",
    },
    multidao: {
      title: "A humanidade sobre quem se derramam as taças",
      subtitle: "Apocalipse 16 • a terra ferida pela ira de Deus",
      text: "É a massa dos moradores da terra sobre quem os sete anjos derramam as taças da ira de Deus (Ap 16:1-2). São feridos em corpo, mar, rios e ar, e ainda assim blasfemam em vez de dar glória (Ap 16:9). Teologicamente, é a humanidade no juízo final das pragas — o eco invertido do Egito de Moisés, onde as pragas caem, mas Faraó, agora multiplicado no mundo, não deixa cair o coração idólatra.",
    },
    cavaleiro: {
      title: "Os reis reunidos para o Armagedom",
      subtitle: "Apocalipse 16 • a batalha do grande dia",
      text: "São os reis do oriente, cujo caminho se abre ao secar o Eufrates, e os reis de toda a terra congregados pelos espíritos imundos como rãs para a batalha do grande dia do Deus Todo-Poderoso (Ap 16:12-14). Ajuntam-se no lugar que em hebreu se chama Armagedom (Ap 16:16). Teologicamente, é o poder do mundo montando-se para a guerra contra Deus — reunião de exércitos que a sexta taça arrasta para o seu próprio juízo.",
    },
  },
  17: {
    mulherComum: {
      title: "A grande prostituta, Babilônia",
      subtitle: "Apocalipse 17 • o mistério da mulher sobre a besta",
      text: "É a grande prostituta assentada sobre muitas águas e sobre a besta escarlate, vestida de púrpura e ouro, com um cálice de abominações na mão e na testa o nome \"Mistério, a grande Babilônia\" (Ap 17:1-5). Está embriagada do sangue dos santos e das testemunhas de Jesus (Ap 17:6), e é a grande cidade que reina sobre os reis da terra (Ap 17:18). Teologicamente, é o sistema mundial idólatra e perseguidor — que os próprios chifres da besta odiarão e destruirão, cumprindo o juízo de Deus (Ap 17:16-17).",
    },
    multidao: {
      title: "As águas: povos e nações",
      subtitle: "Apocalipse 17 • as multidões sob a prostituta",
      text: "São as águas sobre as quais a prostituta se assenta, que o anjo interpreta como \"povos, e multidões, e nações, e línguas\" (Ap 17:1,15). É a humanidade seduzida por Babilônia, embriagada com o vinho da sua fornicação (Ap 17:2). Teologicamente, retrata as massas do mundo sob o domínio da grande cidade — a mesma imensidão de nações que, redimida, aparece diante do trono no capítulo 7, aqui cativa da sedução idólatra.",
    },
  },
  18: {
    mulherComum: {
      title: "Babilônia, a rainha que cai",
      subtitle: "Apocalipse 18 • a queda da grande cidade",
      text: "É a grande Babilônia personificada como mulher e rainha, que diz no coração: \"Estou assentada como rainha, e não sou viúva, e não verei o pranto\" (Ap 18:7). Num só dia caem sobre ela a morte, o pranto e a fome, e é queimada no fogo, pois forte é o Senhor Deus que a julga (Ap 18:8). Teologicamente, é a soberba do mundo — luxo, feitiçaria e sangue dos santos (Ap 18:23-24) — desfeita num instante: \"Caiu, caiu a grande Babilônia\" (Ap 18:2).",
    },
  },
  19: {
    multidao: {
      title: "A multidão do Aleluia",
      subtitle: "Apocalipse 19 • o louvor pelas bodas do Cordeiro",
      text: "É a grande multidão no céu cuja voz, como a de muitas águas e de grandes trovões, clama \"Aleluia!\" porque o Senhor Deus Todo-Poderoso reina e julgou a grande prostituta (Ap 19:1-2,6). Regozija-se porque vieram as bodas do Cordeiro e a esposa se aprontou (Ap 19:7). Teologicamente, é a assembleia dos remidos e dos exércitos do céu passando do lamento sobre Babilônia à alegria nupcial — o juízo do mundo e a glória da Igreja num só cântico.",
    },
    homem: {
      title: "Os homens dos exércitos da besta",
      subtitle: "Apocalipse 19 • a ceia do grande Deus",
      text: "São os reis, tribunos e fortes, e todos os homens, livres e servos, pequenos e grandes, cuja carne as aves são convocadas a comer na ceia do grande Deus (Ap 19:17-18). Reunidos com a besta para guerrear contra o Cavaleiro Fiel e Verdadeiro, são mortos pela espada que sai da sua boca (Ap 19:19,21). Teologicamente, personificam a humanidade que segue a besta até o fim e cai sob a Palavra de Deus feita juízo — o reverso trágico da multidão do Aleluia.",
    },
  },
  20: {
    homem: {
      title: "Um dos mortos diante do grande trono branco",
      subtitle: "Apocalipse 20 • o juízo final",
      text: "A Escritura não o nomeia, mas ele está entre os mortos, grandes e pequenos, de pé diante de Deus quando os livros se abrem (Ap 20:12). É julgado pelas coisas escritas nos livros, segundo as suas obras (Ap 20:12-13). Teologicamente, representa todo homem no juízo final: a segunda morte, o lago de fogo, alcança aquele cujo nome não se acha escrito no livro da vida (Ap 20:15).",
    },
    mulherComum: {
      title: "Uma das mortas julgada pelas obras",
      subtitle: "Apocalipse 20 • diante dos livros abertos",
      text: "A Bíblia não lhe dá nome, mas ela está entre os mortos que o mar, a morte e o inferno entregam para serem julgados, cada um segundo as suas obras (Ap 20:13). Como todos ali, sua sorte se decide por estar ou não escrita no livro da vida (Ap 20:12,15). Teologicamente, é rosto da criatura diante do trono branco de que fogem a terra e o céu — onde nada fica oculto e a justiça de Deus se consuma.",
    },
    multidao: {
      title: "Os mortos diante do trono",
      subtitle: "Apocalipse 20 • a segunda ressurreição",
      text: "É a multidão dos mortos, grandes e pequenos, que estão diante de Deus quando os livros são abertos, entregues pelo mar, pela morte e pelo inferno (Ap 20:12-13). Cada um é julgado segundo as suas obras, e a morte e o inferno são lançados no lago de fogo, a segunda morte (Ap 20:14). Teologicamente, é a humanidade inteira no juízo final — o desfecho universal onde só o livro da vida separa a vida da segunda morte.",
    },
  },
  21: {
    multidao: {
      title: "Os povos que andam na luz da nova Jerusalém",
      subtitle: "Apocalipse 21 • as nações dos salvos",
      text: "São as nações dos salvos que andam à luz da santa cidade, e os reis da terra que trazem para ela a sua glória e honra (Ap 21:24). Este é o povo de que a grande voz do trono diz: \"eles serão o seu povo, e o mesmo Deus estará com eles\" (Ap 21:3). Teologicamente, é a humanidade redimida na nova criação — sem morte, pranto nem dor (Ap 21:4) —, e só entra ali quem está inscrito no livro da vida do Cordeiro (Ap 21:27).",
    },
  },
};
