// Fichas ESPECÍFICAS por (capítulo → papel) de ESTER 1–5.
// Cinco capítulos inteiros dentro de um império pagão, na fortaleza de Susã,
// onde o nome de Deus NÃO APARECE UMA ÚNICA VEZ: não há profeta, não há altar,
// não há templo, não há oração dita em voz alta. O que vira a história são
// coincidências que o texto registra e nunca explica — uma rainha que diz não
// numa festa de bêbados; uma órfã judia dos levados com Jeconias que ninguém
// sabe que é judia; um feito anotado nas crônicas e esquecido no mesmo
// versículo em que é escrito; uma sorte lançada em Nisã que cai no último mês
// do ano e dá onze meses de prazo a um povo condenado; e uma forca de cinquenta
// côvados levantada de noite no quintal de quem morreria nela. As fichas
// apontam essas coincidências e param onde o livro para: nenhuma delas põe na
// boca de Ester ou de Mardoqueu palavras que eles não dizem.
// Cada figurante anônimo da cena é alguém REAL daquele capítulo: o copeiro dos
// copos de ouro todos diferentes uns dos outros, o escriba que escreveu o edito
// a cada província segundo a sua escrita, a serva que levava à moça tudo quanto
// ela desejava, o lançador do pur diante de Hamã, o judeu de província deitado
// em saco e cinza, o carpinteiro que serrou cinquenta côvados de madeira numa
// noite só.
import type { StageInfo } from "@/lib/rpgStageInfo";

export const CHAPTER_ACTORS_01_05: Record<number, Record<string, StageInfo>> = {
  // ---------------------------------------------------------------- Et 1
  1: {
    anciao: {
      title: "Os governadores das cento e vinte e sete províncias, os nobres do banquete, os sábios que entendiam dos tempos, e Carsena e Setar entre os sete príncipes",
      subtitle: "Et 1 • as cabeças brancas de um império que se exibe por cento e oitenta dias e depois legisla sobre o que fazer com uma esposa",
      text: "São os homens que governam por procuração o maior território que o mundo conhecia — \"o poder da Pérsia e Média e os nobres e príncipes das províncias\" (Et 1:3) —, convocados a Susã e retidos cento e oitenta dias vendo \"as riquezas da glória do seu reino\" (Et 1:4). E são os juristas da corte, \"os sábios que entendiam dos tempos... todos os que sabiam a lei e o direito\" (Et 1:13), entre eles Carsena e Setar. Consultados para uma questão de estado que é doméstica (Et 1:15), produzem um edito irrevogável mandando que \"cada homem fosse senhor em sua casa\" (Et 1:22)."
    },
    homem: {
      title: "Os príncipes da Média, os guardas de lança da fortaleza, os convidados deitados nos leitos de ouro, os que sabiam a lei e o direito — e Memucã, que transformou um desaforo em lei",
      subtitle: "Et 1 • os homens do salão de Susã, do soldado da porta ao conselheiro que ditou o primeiro decreto irrevogável do livro",
      text: "O quadro começa com os que estão em pé por ofício: os lanceiros da fortaleza e \"todos os seus príncipes e seus servos, estando assim perante ele o poder da Pérsia e Média\" (Et 1:3). Depois vêm os convidados dos sete dias, recostados nos \"leitos de ouro e de prata\" (Et 1:6), com o beber \"por lei, sem constrangimento\" (Et 1:8) — a única lei deste capítulo que não obriga ninguém a nada. No fim do salão estão os sete príncipes (Et 1:14), e é o último deles que fala: Memucã pega o não de uma mulher e o transforma em ameaça imperial (Et 1:16-17)."
    },
    mulherComum: {
      title: "A rainha Vasti, as convidadas do banquete da casa real e as senhoras da Pérsia e da Média",
      subtitle: "Et 1 • a mulher que disse não ao império inteiro, e as que ouviriam falar disso",
      text: "Vasti não é figura de glória, e por isso a cena a desenha de pé como qualquer pessoa: ela dá a sua própria festa, longe do vinho dos homens (Et 1:9). No sétimo dia sete camareiros vêm buscá-la \"com a coroa real, para mostrar aos povos e aos príncipes a sua beleza\" (Et 1:11) — chamada não como rainha, mas como peça do mostruário. A resposta derruba o capítulo (Et 1:12), e o texto não diz o motivo nem a julga. Ao lado dela estão as \"senhoras da Pérsia e da Média\" (Et 1:18) que os conselheiros temem: o império legislou às pressas com medo de uma conversa entre esposas."
    },
    multidao: {
      title: "Todo o povo que se achava na fortaleza de Susã, desde o maior até ao menor",
      subtitle: "Et 1:5 • os sete dias em que o pátio do jardim do palácio real ficou aberto à cidade",
      text: "\"Fez o rei um banquete a todo o povo que se achava na fortaleza de Susã, desde o maior até ao menor, por sete dias, no pátio do jardim do palácio real\" (Et 1:5). Esta é a única multidão realmente alegre do começo do livro, e a alegria é comprada: depois de meio ano exibindo o tesouro aos governadores, o rei abre os portões. É gente comum bebendo em louça do palácio (Et 1:7). Essa mesma cidade reaparece duas vezes, e as duas de outro jeito: \"a cidade de Susã estava confusa\" (Et 3:15), e depois \"exultou e se alegrou\" (Et 8:15)."
    },
    rei: {
      title: "Assuero, o rei que reinou desde a Índia até a Etiópia sobre cento e vinte e sete províncias",
      subtitle: "Et 1 • o homem mais poderoso do mundo conhecido, medido pelo tamanho do mapa e pelo tamanho da decisão",
      text: "A primeira coisa que o livro dá é a medida do homem: \"reinou desde a India até a Etiópia, sobre cento e vinte e sete províncias\" (Et 1:1). A segunda é o que ele faz com esse poder: um banquete de cento e oitenta dias \"para mostrar as riquezas da glória do seu reino\" (Et 1:4) e uma ordem dada com \"o coração do rei alegre do vinho\" (Et 1:10). Recusado, o rei do mundo não sabe o que fazer e pergunta aos advogados (Et 1:13). É o retrato: ao longo do livro será movido por Memucã, por Hamã, pelo sono que foge, por Harbona e por Ester — nunca por um plano seu."
    },
    servo: {
      title: "Meumã, Bizta, Harbona, Bigtá, Abagta, Zetar e Carcas, os sete camareiros — com o copeiro dos copos de ouro, o tesoureiro, o escriba do edito e o moço de estrebaria",
      subtitle: "Et 1 • os que servem no palácio no dia em que uma ordem do rei volta sem ter sido cumprida",
      text: "Os principais deste capítulo têm nome e são sete: \"Meumã, Bizta, Harbona, Bigtá, Abagta, Zetar e Carcas, os sete camareiros que serviam na presença do rei Assuero\" (Et 1:10). O texto os nomeia um a um justamente porque vão voltar de mãos vazias (Et 1:12), e é diante deles que o furor sobe. Um desses nomes reaparece seis capítulos adiante para dizer a frase que enforca Hamã (Et 7:9). Ao redor deles trabalha a casa inteira: o copeiro dos copos de ouro, o tesoureiro das arcas, as servas do banquete de Vasti (Et 1:9) e o escriba que copia o edito (Et 1:22)."
    }
  },

  // ---------------------------------------------------------------- Et 2
  2: {
    anciao: {
      title: "Mardoqueu, filho de Jair, filho de Simei, filho de Quis, homem benjamita",
      subtitle: "Et 2:5-11 • o judeu que passeava cada dia diante do pátio da casa das mulheres",
      text: "\"Havia então um homem judeu na fortaleza de Susã... Mardoqueu, filho de Jair, filho de Simei, filho de Quis, homem benjamita\" (Et 2:5). A genealogia não é enfeite: Quis, benjamita, é o pai de Saul (1Sm 9:1), e no capítulo seguinte entra um agagita, da casa que Saul poupou. A rixa tem quatrocentos anos e nenhum dos dois a menciona. É gente do cativeiro de Jeconias (Et 2:6), e é ele quem cria a órfã (Et 2:7). Manda-a esconder o povo (Et 2:10) e faz a única coisa que lhe resta: \"passeava Mardoqueu cada dia diante do pátio da casa das mulheres\" (Et 2:11)."
    },
    homem: {
      title: "Os conselheiros do rei apaziguado, os oficiais que ajuntaram as moças nas províncias, os judeus de Susã levados com Jeconias — e Bigtã e Teres, os guardas da porta",
      subtitle: "Et 2 • os homens que inventaram o concurso, os que vieram do cativeiro e os dois que conspiraram e foram pendurados",
      text: "O capítulo começa com um remédio de cortesãos: \"Busquem-se para o rei moças virgens e formosas\" (Et 2:2), e a máquina imperial é posta a serviço disso — oficiais recolhendo meninas por decreto nas províncias, com a burocracia com que se recolhe tributo (Et 2:3). Entre a gente de Susã estão os judeus \"levados com Jeconias\" (Et 2:6). E no fim entram os dois que dão ao livro o seu segredo mais bem guardado: Bigtã e Teres, denunciados por Mardoqueu e pendurados, \"e foi escrito nas crônicas perante o rei\" (Et 2:23). Ninguém agradece: fica só a tinta no rolo."
    },
    mulherComum: {
      title: "Ester, filha de Abiail, com as moças virgens ajuntadas em Susã, as sete moças de respeito dadas a ela e as concubinas da casa de Saasgaz",
      subtitle: "Et 2 • a casa das mulheres por dentro: doze meses de purificação, uma noite, e a segunda casa para o resto da vida",
      text: "Ester entra aqui sem escolha nenhuma: \"também levaram Ester à casa do rei, sob a custódia de Hegai\" (Et 2:8) — o verbo é levar. O regulamento é descrito com frieza administrativa: doze meses, \"seis meses com óleo de mirra, e seis meses com especiarias\" (Et 2:12), e depois uma noite — \"não tornava mais ao rei, salvo se o rei a desejasse, e fosse chamada pelo nome\" (Et 2:14). As mulheres desta cena são as que ficaram naquela segunda casa. Ester atravessa o mesmo caminho e faz o que nenhuma fez: \"coisa nenhuma pediu, senão o que disse Hegai\" (Et 2:15)."
    },
    multidao: {
      title: "Os príncipes e os servos do grande banquete de Ester",
      subtitle: "Et 2:18 • a festa da coroação de uma rainha judia que ninguém sabe que é judia",
      text: "\"Então o rei deu um grande banquete a todos os seus príncipes e aos seus servos; era o banquete de Ester; e deu alívio às províncias\" (Et 2:18). É a mesma corte do capítulo 1, no mesmo salão, celebrando a substituta da rainha que se recusou a comparecer. E ninguém ali sabe do que está falando: \"Ester, porém, não declarava a sua parentela e o seu povo\" (Et 2:20). Uma sala cheia de gente brindando a uma judia do cativeiro sem saber. Quando a informação aparecer, será numa mesa de três pessoas, e custará a vida de um convidado (Et 7:6)."
    },
    rei: {
      title: "Assuero, apaziguado o furor, lembrando-se de Vasti",
      subtitle: "Et 2:1 • o rei que acorda da ira e descobre que assinou um decreto que não pode desfazer",
      text: "\"Passadas estas coisas, e apaziguado já o furor do rei Assuero, lembrou-se de Vasti, e do que fizera, e do que se tinha decretado a seu respeito\" (Et 2:1). Os três verbos são a chave: lembrou-se dela, do que ela fez e do que ele decretou — e o decreto foi escrito para que \"não se revogue\" (Et 1:19). O homem mais poderoso do mundo está preso à própria assinatura, e a corte trata a saudade dele como logística (Et 2:2-4). O mesmo mecanismo o prenderá outra vez quando quiser salvar os judeus (Et 8:8)."
    },
    servo: {
      title: "Hegai, guarda das mulheres; Saasgaz, guarda das concubinas; as servas do óleo de mirra; e o escriba que escreveu o feito de Mardoqueu nas crônicas",
      subtitle: "Et 2 • quem administra a casa das mulheres, e quem anotou no rolo a linha que salvaria um povo",
      text: "Hegai é o funcionário decisivo do capítulo: é dele o favor que muda a sorte de Ester — enfeites, quinhões, sete moças de respeito \"e a fez passar com as suas moças ao melhor lugar da casa das mulheres\" (Et 2:9). Do outro lado do corredor está Saasgaz, \"guarda das concubinas\" (Et 2:14), que administra a casa das que já entraram e não voltam. E no último versículo entra o servo mais importante do livro, sem nome e sem fala: o escriba que registra a denúncia (Et 2:23). Um homem molhou a pena e foi dormir; quatro capítulos depois, um povo não morre."
    }
  },

  // ---------------------------------------------------------------- Et 3
  3: {
    anciao: {
      title: "Os príncipes que se prostravam perante Hamã, o lançador do pur, os governadores que receberam o decreto — e Mardoqueu, que não se inclinava",
      subtitle: "Et 3 • os velhos que se curvam ao assento posto acima de todos, e o único que fica de pé",
      text: "\"O rei Assuero engrandeceu a Hamã... e pôs o seu assento acima de todos os príncipes que estavam com ele\" (Et 3:1). Os anciãos desta cena são esses príncipes rebaixados, que se inclinam diante de um recém-chegado \"porque assim tinha ordenado o rei\" (Et 3:2). No meio deles fica um só de pé, e a única razão registrada é a que ele deu aos que o interrogavam dia após dia: \"porque ele lhes tinha declarado que era judeu\" (Et 3:4). Outro velho é o que assiste ao lançamento das sortes em Nisã, que cai no último mês (Et 3:7): onze meses de prazo para um povo já sentenciado."
    },
    homem: {
      title: "Hamã, filho de Hamedata, o agagita; os guardas da porta do rei; os correios do decreto; e os moradores de Susã na rua confusa",
      subtitle: "Et 3 • o homem que comprou um povo por dez mil talentos e a cidade que ficou parada quando a carta saiu",
      text: "Hamã é apresentado por três palavras que valem por um capítulo de 1 Samuel: \"filho de Hamedata, agagita\" (Et 3:1). Do outro lado do pátio está um benjamita da casa de Quis. O furor dele não se contenta com um homem (Et 3:6), e diante do rei monta a acusação perfeita porque quase tudo nela é verdade: \"um povo, cujas leis são diferentes das leis de todos os povos, e que não cumpre as leis do rei\" (Et 3:8) — e nunca diz o nome. O rei nem pergunta quem morre (Et 3:10). E a cena fecha na rua: \"o rei e Hamã se assentaram a beber, porém a cidade de Susã estava confusa\" (Et 3:15)."
    },
    mulherComum: {
      title: "As mulheres das províncias diante do decreto e as moradoras de Susã na cidade confusa",
      subtitle: "Et 3:13-15 • as que leram o próprio nome na lista, porque o edito não poupava nem crianças nem mulheres",
      text: "O decreto não faz distinção nenhuma, e o texto guarda a lista por extenso: \"que destruíssem, matassem, e fizessem perecer a todos os judeus, desde o jovem até ao velho, crianças e mulheres, em um mesmo dia\" (Et 3:13). Estas são as mulheres que ouviram isso lido em praça pública, na sua própria língua (Et 3:12) — a máquina do império traduziu a sentença com todo o cuidado, para que ninguém deixasse de entender, com onze meses de antecedência. Ao lado delas estão as moradoras comuns, que não eram alvo de nada e mesmo assim pararam na rua (Et 3:15)."
    },
    rei: {
      title: "Assuero, que tirou o anel da sua mão sem perguntar o nome do povo",
      subtitle: "Et 3:8-11 • o rei que vendeu uma nação inteira num diálogo de quatro versículos",
      text: "A cena que define este rei é curtíssima. Hamã descreve um povo sem o nomear (Et 3:8), oferece dez mil talentos de prata, e a resposta vem sem uma única pergunta: \"tirou o rei o anel da sua mão, e o deu a Hamã... Essa prata te é dada como também esse povo, para fazeres dele o que bem parecer aos teus olhos\" (Et 3:10-11). Ele não sabe quem vai morrer; não sabe que a própria rainha está na lista; não sabe que o homem que lhe salvou a vida está nela. E o capítulo fecha com a imagem mais dura que o livro tem sobre ele: dois homens à mesa, e uma cidade parada do lado de fora (Et 3:15)."
    },
    servo: {
      title: "Os servos da porta do rei que se inclinavam, o tesoureiro dos dez mil talentos, os escrivães do dia treze de Nisã e o moço de estrebaria dos correios",
      subtitle: "Et 3 • quem cumpre a ordem de se prostrar, quem conta a prata e quem copia a sentença em todas as escritas do império",
      text: "Os primeiros são os que perguntam, e perguntam por dias: \"Por que transgrides o mandado do rei? Sucedeu, pois, que, dizendo-lhe eles isto, dia após dia, e não lhes dando ele ouvidos, o fizeram saber a Hamã\" (Et 3:3-4). Não são inimigos: são colegas de porta, incomodados com o único homem que não se curva. Depois vem a sala dos copistas, no dia mais burocrático da Escritura, redigindo um extermínio \"a cada província segundo a sua escrita\" e selando-o com o anel do rei (Et 3:12). E, no pátio, o moço que sela os cavalos dos correios \"impelidos pela palavra do rei\" (Et 3:15)."
    }
  },

  // ---------------------------------------------------------------- Et 4
  4: {
    anciao: {
      title: "Mardoqueu de saco e cinza diante da porta do rei, e os velhos das províncias em jejum e choro",
      subtitle: "Et 4 • o homem que rasgou as vestes no meio da cidade e a pergunta que ele mandou de volta",
      text: "\"Quando Mardoqueu soube tudo quanto se havia passado, rasgou as suas vestes, e vestiu-se de saco e de cinza, e saiu pelo meio da cidade, e clamou com grande e amargo clamor\" (Et 4:1). Vai até onde a lei o deixa ir e para ali: \"ninguém vestido de saco podia entrar pelas portas do rei\" (Et 4:2). Manda a Ester o documento e o preço (Et 4:7-8), e depois as duas frases que sustentam o livro: a certeza sem sujeito nomeado, \"socorro e livramento de outra parte sairá para os judeus\", e a pergunta \"quem sabe se para tal tempo como este chegaste a este reino?\" (Et 4:14)."
    },
    homem: {
      title: "Os judeus de Susã que ouviram o clamor, os deitados em saco e cinza pelas províncias, os guardas da porta e do pátio interior, e os que jejuaram três dias com Mardoqueu",
      subtitle: "Et 4 • um povo inteiro em luto público num império onde o luto não podia passar da porta",
      text: "\"Em todas as províncias aonde a palavra do rei e a sua lei chegava, havia entre os judeus grande luto, com jejum, e choro, e lamentação; e muitos estavam deitados em saco e em cinza\" (Et 4:3). Estes homens estão no chão porque leram uma data. O texto descreve o gesto inteiro do luto bíblico e — coisa que impressiona num livro da Escritura — NÃO diz que oraram, não nomeia a quem clamam, não registra uma palavra dirigida a Deus. O silêncio é deliberado. Os últimos são os que atendem ao chamado da rainha: três dias e três noites de mesa vazia numa cidade pagã (Et 4:16)."
    },
    mulherComum: {
      title: "Ester, a rainha, com as suas servas que jejuaram três dias, e as judias das províncias deitadas em saco e cinza",
      subtitle: "Et 4 • a mulher que soube da carta por terceiros e respondeu com a frase mais dura do livro",
      text: "Ester descobre a catástrofe pelo lado errado: não por decreto, mas por corredor — \"vieram as servas de Ester, e os seus camareiros, e fizeram-na saber\" (Et 4:4). O primeiro impulso é cobrir o problema com roupas, e Mardoqueu recusa. Depois vem o argumento que qualquer pessoa levantaria: a lei do pátio interior, agravada por um detalhe pessoal que ela não precisava dizer e disse — \"e eu nestes trinta dias não tenho sido chamada para ir ao rei\" (Et 4:11). E então a decisão: \"se perecer, pereci\" (Et 4:16). Nenhuma delas reza em voz alta no texto; todas jejuam."
    },
    servo: {
      title: "Hatá, o camareiro que o rei tinha posto para servir a Ester, e os camareiros que viram Mardoqueu vestido de saco",
      subtitle: "Et 4:5-12 • o eunuco que atravessou a praça da cidade cinco vezes carregando o livro inteiro",
      text: "\"Então Ester chamou a Hatá (um dos camareiros do rei, que este tinha posto para servi-la)\" (Et 4:5). Ele é o único canal entre os dois protagonistas — ela não pode sair, ele não pode entrar, e nenhum dos dois aparece na mesma cena até o capítulo 8. Todo o diálogo central do livro passa pelos pés deste homem, atravessando \"à praça da cidade, que estava diante da porta do rei\" (Et 4:6). Leva a cópia da lei, traz a objeção do pátio, leva a pergunta de 4:14 e traz \"se perecer, pereci\" — carregando, sem saber, a sobrevivência de um povo dentro de um recado."
    }
  },

  // ---------------------------------------------------------------- Et 5
  5: {
    anciao: {
      title: "Mardoqueu assentado à porta do rei, que não se levantou nem se moveu, e os amigos chamados à casa de Hamã",
      subtitle: "Et 5:9-14 • o velho que não se mexeu, e os conselheiros que sugeriram cinquenta côvados de forca",
      text: "Hamã sai do primeiro banquete \"alegre e de bom ânimo\" (Et 5:9), e a alegria dura o tempo de atravessar um pátio: vendo Mardoqueu \"que ele não se levantara nem se movera diante dele\", enche-se de furor. O gesto do velho é de economia total — não fala, não protesta: apenas continua sentado. Do lado de lá da cidade estão os outros anciãos, os amigos chamados à casa de Hamã (Et 5:10), que ouvem o inventário da vaidade e dão o conselho da forca (Et 5:14). Os mesmos voltarão no capítulo seguinte para dizer o contrário (Et 6:13)."
    },
    homem: {
      title: "Hamã, o convidado único dos dois banquetes, o guarda do pátio interior e os amigos chamados à sua casa",
      subtitle: "Et 5 • o homem que se achou o preferido da rainha e mandou levantar uma forca na mesma noite",
      text: "Hamã atravessa este capítulo convencido de que está subindo. É chamado às pressas ao banquete (Et 5:5), come com o rei e a rainha, é convidado outra vez, e conta isso em casa como quem conta uma promoção: \"a ninguém fez vir com o rei ao banquete... senão a mim\" (Et 5:12). O leitor sabe o que ele não sabe: aquele convite é a armadilha. O outro homem da cena é o guarda do pátio interior, que vê a rainha entrar sem convocação. E o capítulo fecha num quintal: cinquenta côvados de madeira levantados às pressas na casa de quem ia morrer nela (Et 5:14)."
    },
    mulherComum: {
      title: "Ester, de trajes reais no pátio interior, e Zeres, mulher de Hamã",
      subtitle: "Et 5 • as duas mulheres que decidem o capítulo: uma que espera dois banquetes e outra que resolve numa noite",
      text: "\"Ao terceiro dia Ester se vestiu com trajes reais, e se pôs no pátio interior da casa do rei\" (Et 5:1). Terceiro dia é o fim do jejum; os trajes reais são o contrário do saco de Mardoqueu — ela não entra chorando, entra como rainha. O texto não descreve sentimento nenhum, só o que se vê: põe-se de pé e espera. Oferecida metade do reino, pede um jantar; oferecida outra vez, pede outro (Et 5:8) — e é o adiamento que põe Hamã na rua no dia exato em que o rei perderia o sono. Do outro lado da cidade, Zeres levanta a forca (Et 5:14)."
    },
    rei: {
      title: "Assuero, que estendeu o cetro de ouro e ofereceu metade do reino duas vezes",
      subtitle: "Et 5 • o rei nos dois banquetes do vinho, perguntando o que ela quer e sem imaginar a resposta",
      text: "\"Vendo o rei a rainha Ester, que estava no pátio, ela alcançou graça aos seus olhos\" (Et 5:2). O cetro estendido é a diferença entre a vida e a morte, e o texto o registra sem uma palavra de suspense: a lei era mortal, e o rei simplesmente estende a mão. Depois vêm as duas ofertas, com a mesma fórmula exagerada que já usara com Hamã e o dinheiro: \"Até metade do reino se te dará\" (Et 5:3). Este é o rei que assinou a morte de um povo sem perguntar o nome dele, e agora oferece meio império à mulher que está naquela lista. Nada nele mudou."
    },
    servo: {
      title: "O camareiro do pátio interior, os servos dos dois banquetes de Ester, os filhos de Hamã na casa de Susã e o carpinteiro que fez a forca de cinquenta côvados",
      subtitle: "Et 5 • quem serve o vinho na mesa dos três e quem serrou madeira a noite inteira num quintal",
      text: "Os primeiros são os da casa: o camareiro que abre o pátio interior, os que correm chamar Hamã (Et 5:5) e os que servem \"o banquete do vinho\" (Et 5:6) a três pessoas, sem saber que estão pondo à mesa o acusado e a acusadora. Na casa de Hamã, os servos ouvem o dono contar \"a multidão de seus filhos\" (Et 5:11) — são dez, e o capítulo 9 os nomeará um por um. E o último é o que trabalha de noite: o carpinteiro que levanta cinquenta côvados de madeira antes do amanhecer, no quintal do patrão, sem saber para quem trabalha (Et 5:14)."
    }
  }
};
