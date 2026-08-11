// Fichas ESPECÍFICAS por (capítulo → papel) de deuteronomy — quem é aquela figura
// (mesmo anônima na Bíblia) no contexto daquele capítulo, biblicamente e
// teologicamente. Vence a ficha genérica do papel. Preenchido pelo agente.
import type { StageInfo } from "@/lib/rpgStageInfo";
export const CHAPTER_ACTORS: Record<number, Record<string, StageInfo>> = {
  1: {
    anciao: {
      title: "Os cabeças das tribos postos por juízes",
      subtitle: "Deuteronômio 1 • os sábios que aliviaram Moisés",
      text: "São os \"homens sábios e entendidos, experimentados\" que Israel escolheu de suas tribos e Moisés constituiu por capitães de milhares, de cem, de cinquenta e de dez (Dt 1:13-15). A eles Moisés ordenou ouvir a causa entre os irmãos e o estrangeiro sem discriminar pessoas, \"porque o juízo é de Deus\" (Dt 1:16-17). São o primeiro tribunal de Israel, nascido da confissão de Moisés: \"Eu sozinho não poderei levar-vos\" (Dt 1:9).",
    },
    homem: {
      title: "Os doze espias enviados de Cades",
      subtitle: "Deuteronômio 1 • um homem de cada tribo",
      text: "São os \"doze homens, de cada tribo um homem\" que o povo pediu para espiar a terra antes de subir (Dt 1:22-23). Voltaram do vale de Escol com o fruto nas mãos, dizendo \"Boa é a terra que nos dá o Senhor nosso Deus\" — mas o relato dos demais fez derreter o coração do povo (Dt 1:25,28). Neles se vê que a incredulidade não nasce da falta de provas, mas da recusa de crer na palavra de Deus (Dt 1:32).",
    },
    mulherComum: {
      title: "A mãe israelita de Cades-Barnéia",
      subtitle: "Deuteronômio 1 • os meninos que herdariam",
      text: "A Escritura não lhe dá o nome, mas é uma das mães da geração que murmurou nas tendas, temendo que seus filhos fossem tomados por presa dos amorreus (Dt 1:27,39). O Senhor respondeu que justamente esses meninos, \"que hoje não conhecem nem o bem nem o mal\", entrariam e possuiriam a terra que os pais desprezaram (Dt 1:39). Ela é a mãe cujo medo foi desmentido pela misericórdia: o que temeu perder, Deus guardou para herdar.",
    },
    rei: {
      title: "Siom e Ogue, os reis já vencidos",
      subtitle: "Deuteronômio 1 • as vitórias que abrem o discurso",
      text: "São \"Siom, rei dos amorreus, que habitava em Hesbom\", e \"Ogue, rei de Basã, que habitava em Astarote\", feridos antes que Moisés começasse a declarar esta lei (Dt 1:4-5). Suas derrotas são a moldura do discurso: a palavra é pregada a um povo que acabou de ver Deus entregar reis em suas mãos. Servem de penhor visível de que o Senhor cumpre o que jurou aos pais (Dt 1:8).",
    },
    servo: {
      title: "Josué, filho de Num",
      subtitle: "Deuteronômio 1 • o servo que está diante de Moisés",
      text: "É Josué, o jovem servo que \"está diante de ti\", a quem Moisés deve fortalecer porque ele fará Israel herdar a terra (Dt 1:38). Enquanto a geração incrédula foi excluída, ele e Calebe são poupados por terem perseverado em seguir ao Senhor (Dt 1:36-38). O servo fiel de Moisés se torna, pela graça, o condutor do povo à promessa — figura do Salvador que introduz no descanso.",
    },
    multidao: {
      title: "A geração de Israel em Moabe",
      subtitle: "Deuteronômio 1 • o resumo da jornada",
      text: "É todo o Israel reunido além do Jordão, nas campinas de Moabe, ouvindo Moisés recapitular a caminhada desde Horebe (Dt 1:1-6). Diante deles Moisés relembra a nomeação dos juízes, o envio dos doze espias e a rebelião em Cades-Barnéia, quando o povo recusou subir e por isso vagou quarenta anos (Dt 1:26,34-35). São em grande parte os filhos daquela geração incrédula, que agora se preparam para herdar a terra que os pais desprezaram.",
    },
  },
  2: {
    homem: {
      title: "Os homens de guerra que se consumiram",
      subtitle: "Deuteronômio 2 • a geração sepultada no caminho",
      text: "São os guerreiros de Israel contados em Cades-Barnéia, sobre os quais caiu o juramento do Senhor: em trinta e oito anos, até passarem o ribeiro de Zerede, \"toda aquela geração dos homens de guerra se consumiu do meio do arraial\" (Dt 2:14). A mão do Senhor esteve contra eles até os haver consumido, e só então recomeçou a conquista (Dt 2:15-16). Seus túmulos anônimos no deserto pregam que a incredulidade não entra no descanso (Hb 3:19).",
    },
    mulherComum: {
      title: "A mulher de Israel na marcha do deserto",
      subtitle: "Deuteronômio 2 • quarenta anos sem que nada faltasse",
      text: "A Escritura não lhe dá o nome, mas é uma das mulheres que enterrou marido, pai e irmãos ao longo dos trinta e oito anos de rodeio, e ainda assim caminhou por Seir, Ar e Arnom (Dt 2:1,14). Sobre ela também se cumpriu a palavra: \"estes quarenta anos o Senhor teu Deus esteve contigo, coisa nenhuma te faltou\" (Dt 2:7). Ela é testemunha viva de que o juízo de Deus sobre uma geração não interrompeu o seu sustento diário.",
    },
    rei: {
      title: "Siom, rei de Hesbom",
      subtitle: "Deuteronômio 2 • o coração endurecido em Jaza",
      text: "É o rei amorreu a quem Israel mandou mensageiros com palavras de paz, pedindo apenas passagem pela estrada (Dt 2:26-28). Ele recusou e saiu à peleja em Jaza, \"porquanto o Senhor teu Deus endurecera o seu espírito, e fizera obstinado o seu coração\" para entregá-lo nas mãos de Israel (Dt 2:30-33). Sua queda é a primeira posse da herança e mostra que até a obstinação dos reis serve ao propósito de Deus (Rm 9:17-18).",
    },
    multidao: {
      title: "Israel rodeando Edom, Moabe e Amom",
      subtitle: "Deuteronômio 2 • o fim da geração do deserto",
      text: "É Israel a caminho do norte, passando pelos territórios de Esaú, de Moabe e de Amom, aos quais o Senhor mandou não molestar (Dt 2:4-5,9,19). Durante essa marcha consumou-se a morte de toda a geração dos homens de guerra, exatamente como o Senhor jurara (Dt 2:14). É o povo à beira de uma nova era, começando a possuir a terra com a vitória sobre Siom, rei de Hesbom.",
    },
  },
  3: {
    homem: {
      title: "Os homens valentes da Transjordânia",
      subtitle: "Deuteronômio 3 • armados adiante dos irmãos",
      text: "São os guerreiros de Rúben, Gade e da meia tribo de Manassés, que já receberam sua herança em Gileade e Basã, mas a quem Moisés ordena: \"passai, pois, armados vós, todos os homens valentes, diante de vossos irmãos\" (Dt 3:18). Suas mulheres, crianças e gado ficam nas cidades até que o Senhor dê descanso a todo o Israel (Dt 3:19-20). Eles ensinam que ninguém entra sozinho no descanso: a herança recebida obriga a lutar pelo irmão.",
    },
    rei: {
      title: "Ogue, rei de Basã",
      subtitle: "Deuteronômio 3 • o último dos gigantes",
      text: "É o rei que saiu ao encontro de Israel em Edrei com todo o seu povo e caiu, sem que lhe ficasse sobrevivente algum (Dt 3:1-3). Reinava sobre sessenta cidades fortificadas com altos muros, portas e ferrolhos, e dele se diz que \"só Ogue, o rei de Basã, restou dos gigantes\", com seu leito de ferro de nove côvados (Dt 3:4-5,11). Sua ruína prova a palavra do Senhor: \"Não o temas, porque a ele... tenho dado na tua mão\" (Dt 3:2).",
    },
    multidao: {
      title: "Israel vencedor de Ogue de Basã",
      subtitle: "Deuteronômio 3 • a herança na Transjordânia",
      text: "É Israel que acaba de derrotar Ogue, rei de Basã, o último dos gigantes, tomando sessenta cidades (Dt 3:3-4,11). Rúben, Gade e a meia tribo de Manassés recebem ali sua herança, com a condição de passar armados adiante dos irmãos até que todos tenham descanso (Dt 3:18-20). O povo ouve também que Moisés não entrará na terra, apenas a verá do cume do Pisga, e que Josué os conduzirá.",
    },
  },
  4: {
    homem: {
      title: "O homicida involuntário das três cidades",
      subtitle: "Deuteronômio 4 • Bezer, Ramote e Golã",
      text: "É o israelita que matou o próximo por acidente, \"a quem dantes não tivesse ódio algum\", e por isso pode fugir para uma das três cidades que Moisés separou além do Jordão (Dt 4:42-43). A lei o protege da vingança precipitada sem absolver o homicídio doloso, distinguindo o culpado do desafortunado. Nele se vê o cuidado de Deus com o sangue inocente e um refúgio que aponta para a segurança do pecador que se acolhe a Cristo (Hb 6:18).",
    },
    mulherComum: {
      title: "A mulher que não pode ser esculpida",
      subtitle: "Deuteronômio 4 • ouvistes a voz, sem ver figura",
      text: "É a mulher de Israel citada na proibição das imagens: nenhuma escultura se fará \"na forma de qualquer figura, semelhança de homem ou mulher\" (Dt 4:16). Porque em Horebe o povo ouviu a voz do meio do fogo e não viu figura alguma, nenhuma forma humana pode representar o Deus vivo (Dt 4:12,15). Ela lembra que a mulher é imagem de Deus, mas jamais imagem para Deus — a adoração se rende à voz, não ao que os olhos moldam.",
    },
    rei: {
      title: "Os dois reis dos amorreus",
      subtitle: "Deuteronômio 4 • a terra tomada além do Jordão",
      text: "São Siom, rei dos amorreus que habitava em Hesbom, e Ogue, rei de Basã, cujas terras Israel tomou em possessão do Arnom até o Hermom (Dt 4:46-47). É justamente no vale defronte de Bete-Peor, na terra do rei vencido, que Moisés propõe esta lei aos filhos de Israel (Dt 4:44-46). A Palavra é entregue sobre solo conquistado: a graça precede a exigência, e o dom da terra funda o dever da obediência.",
    },
    multidao: {
      title: "Israel chamado a guardar a Lei",
      subtitle: "Deuteronômio 4 • ouvistes a voz, sem ver figura",
      text: "É Israel exortado a ouvir os estatutos para viver e possuir a terra, sem nada acrescentar nem diminuir da palavra (Dt 4:1-2). Moisés lembra que em Horebe ouviram a voz do meio do fogo, mas não viram figura alguma — por isso não devem fazer imagem esculpida de nada (Dt 4:12,15-16). É o povo advertido de que o Senhor é fogo consumidor e Deus zeloso, mas também misericordioso, que não esquece a aliança dos pais (Dt 4:31).",
    },
  },
  5: {
    anciao: {
      title: "Os cabeças das tribos e os anciãos de Horebe",
      subtitle: "Deuteronômio 5 • os que pediram um mediador",
      text: "São \"todos os cabeças das vossas tribos, e vossos anciãos\" que se achegaram a Moisés depois de ouvirem a voz do meio das trevas e verem o monte ardendo em fogo (Dt 5:23). Confessaram a maravilha de que \"Deus fala com o homem, e que este permanece vivo\", mas suplicaram: \"Chega-te tu, e ouve tudo o que disser o Senhor nosso Deus\" (Dt 5:24,27). O Senhor aprovou o pedido — e desse temor santo nasce o ofício do mediador, cumprido em Cristo (Dt 5:28; 1 Tm 2:5).",
    },
    homem: {
      title: "O próximo protegido pelo Decálogo",
      subtitle: "Deuteronômio 5 • as palavras da segunda tábua",
      text: "É o vizinho israelita cuja vida, casamento, bens e reputação as cinco últimas palavras protegem: não matarás, não adulterarás, não furtarás, \"não dirás falso testemunho contra o teu próximo\" (Dt 5:17-20). Sobre ele recai ainda o último mandamento, que alcança o coração antes da mão: não cobiçar a mulher, a casa nem o campo do próximo (Dt 5:21). Ele é a prova visível de que amar a Deus se comprova no amor ao irmão (Rm 13:9).",
    },
    mulherComum: {
      title: "A serva que descansa no sábado",
      subtitle: "Deuteronômio 5 • memória da servidão no Egito",
      text: "É a serva da casa israelita, nomeada expressamente no mandamento do sábado, \"para que o teu servo e a tua serva descansem como tu\" (Dt 5:14). A razão dada em Deuteronômio é a memória da escravidão: \"lembrarás que foste servo na terra do Egito\" e que o Senhor te tirou dali com mão forte (Dt 5:15). Nela o descanso deixa de ser privilégio dos livres e se torna direito do humilde, porque o Redentor não esquece os pequenos.",
    },
    multidao: {
      title: "Israel diante do Decálogo",
      subtitle: "Deuteronômio 5 • a aliança de Horebe relembrada",
      text: "É toda a congregação a quem Moisés repete os dez mandamentos que o Senhor falou face a face, do meio do fogo, no monte (Dt 5:4,22). O povo relembra o terror daquele dia, quando pediram que Moisés fosse o mediador, temendo morrer se ouvissem mais a voz de Deus (Dt 5:24-27). São Israel confrontado com a aliança feita não só com os pais, mas \"conosco, todos os que hoje aqui estamos vivos\" (Dt 5:3).",
    },
  },
  6: {
    homem: {
      title: "O pai israelita que ensina o Shemá",
      subtitle: "Deuteronômio 6 • falando delas em casa e no caminho",
      text: "É o chefe de família a quem o mandamento é confiado: guardar as palavras no coração e ensiná-las aos filhos, \"assentado em tua casa, e andando pelo caminho, e deitando-te e levantando-te\" (Dt 6:6-7). Quando o filho perguntar o sentido dos estatutos, ele deve responder contando a redenção: \"Éramos servos de Faraó no Egito; porém o Senhor, com mão forte, nos tirou do Egito\" (Dt 6:20-21). A fé de Israel se transmite pela memória do livramento narrada em casa.",
    },
    rei: {
      title: "Faraó, o rei da casa da servidão",
      subtitle: "Deuteronômio 6 • a resposta dada ao filho",
      text: "É o Faraó do Êxodo, lembrado na catequese doméstica de Israel: contra ele e contra toda a sua casa o Senhor \"fez sinais e maravilhas, grandes e terríveis\" aos olhos do povo (Dt 6:22). Ele encarna a casa da servidão de que o povo foi tirado com mão forte, e cujo esquecimento é o perigo da fartura na terra (Dt 6:12). O rei derrotado permanece na memória de Israel como medida do poder do seu Redentor.",
    },
    servo: {
      title: "Israel quando era servo de Faraó",
      subtitle: "Deuteronômio 6 • a lembrança que funda a Lei",
      text: "São os hebreus escravizados no Egito, cuja condição o pai israelita confessa ao filho: \"Éramos servos de Faraó no Egito\" (Dt 6:21). A obediência aos estatutos não é preço da liberdade, mas resposta a ela: o Senhor primeiro tirou, depois ordenou, \"para o nosso perpétuo bem, para nos guardar em vida\" (Dt 6:23-24). Esses servos resgatados mostram que a Lei é dada a um povo já redimido.",
    },
    multidao: {
      title: "O povo que ouve o Shemá",
      subtitle: "Deuteronômio 6 • Ouve, Israel",
      text: "É Israel recebendo o mandamento maior: \"Ouve, Israel, o Senhor nosso Deus é o único Senhor\", e \"Amarás, pois, o Senhor teu Deus de todo o teu coração\" (Dt 6:4-5). O povo é instruído a guardar essas palavras no coração, ensiná-las aos filhos e atá-las por sinal na mão e nas portas (Dt 6:6-9). É a geração advertida a não esquecer o Senhor na fartura da terra que não construiu — o Shemá que Jesus chamaria o primeiro mandamento (Mc 12:29-30).",
    },
  },
  7: {
    homem: {
      title: "O israelita que derruba os altares",
      subtitle: "Deuteronômio 7 • o executor do anátema",
      text: "É o homem de Israel encarregado de derrubar os altares das nações, quebrar as estátuas, cortar os bosques e queimar a fogo as imagens de escultura (Dt 7:5). Sobre ele pesa uma advertência sutil: não cobiçar a prata e o ouro que cobrem os ídolos, \"para que não te enlaces neles\", nem levar abominação para dentro de casa (Dt 7:25-26). Ele aprende que a idolatria não se vence só derrubando altares, mas guardando o coração da cobiça.",
    },
    rei: {
      title: "Faraó e os reis de Canaã",
      subtitle: "Deuteronômio 7 • os nomes apagados de debaixo dos céus",
      text: "É Faraó, rei do Egito, de cuja mão o Senhor resgatou Israel da casa da servidão, e são os reis das sete nações que Israel encontrará adiante (Dt 7:8,24). O povo é mandado lembrar o que Deus fez a Faraó sempre que temer inimigos mais numerosos: \"assim fará o Senhor teu Deus com todos os povos\" (Dt 7:18-19). A promessa é que também esses reis serão entregues em sua mão, e seus nomes apagados de debaixo dos céus (Dt 7:24).",
    },
    multidao: {
      title: "Israel, povo santo e escolhido",
      subtitle: "Deuteronômio 7 • separado das nações",
      text: "É Israel diante das sete nações de Canaã, chamado a destruí-las e a não fazer aliança nem casamento com elas (Dt 7:1-3). O povo ouve que não foi escolhido por ser numeroso — pelo contrário, era o menor de todos —, mas porque o Senhor o amou e guardou o juramento feito aos pais (Dt 7:7-8). São o povo santo, propriedade especial do Senhor fiel, que guarda a aliança e a misericórdia até mil gerações (Dt 7:9).",
    },
    mulher: {
      title: "A filha das nações de Canaã",
      subtitle: "Deuteronômio 7 • o casamento proibido",
      text: "É a mulher cananeia cuja aliança matrimonial o Senhor proíbe: \"não darás tuas filhas a seus filhos, e não tomarás suas filhas para teus filhos\" (Dt 7:3). A razão é espiritual, não racial — tais uniões desviariam o coração de Israel para servir a outros deuses, acendendo a ira do Senhor (Dt 7:4). Ela personifica a sedução da idolatria que o povo santo deve rejeitar, em contraste com a bênção de fecundidade prometida à mulher fiel (Dt 7:14).",
    },
  },
  8: {
    homem: {
      title: "O israelita sustentado com o maná",
      subtitle: "Deuteronômio 8 • humilhado como filho",
      text: "É o homem de Israel que passou fome no deserto e foi sustentado com o maná que nem ele nem seus pais conheceram, para aprender que \"o homem não viverá só de pão, mas de tudo o que sai da boca do Senhor\" (Dt 8:3). Ele deve reconhecer no coração que, \"como um homem castiga a seu filho, assim te castiga o Senhor teu Deus\" (Dt 8:5). O maior perigo à sua frente não é a fome, mas a fartura que faz dizer: \"A minha força... me adquiriu este poder\" (Dt 8:17).",
    },
    mulherComum: {
      title: "A mulher de Israel na travessia do deserto",
      subtitle: "Deuteronômio 8 • a roupa que não envelheceu",
      text: "A Escritura não lhe dá o nome, mas é uma das mulheres que atravessou quarenta anos de deserto e viu cumprir-se o prodígio silencioso: \"Nunca se envelheceu a tua roupa sobre ti, nem se inchou o teu pé\" (Dt 8:4). Adiante a espera uma terra de trigo, vides, figueiras e azeite, onde comerá o pão sem escassez (Dt 8:8-9). Ela é chamada a louvar ao Senhor quando estiver farta, e a não esquecer quem a guiou pelo deserto de serpentes (Dt 8:10,15).",
    },
    servo: {
      title: "Os que foram servos na casa da servidão",
      subtitle: "Deuteronômio 8 • a memória contra a soberba",
      text: "São os israelitas tirados \"da terra do Egito, da casa da servidão\", cuja escravidão passada é o antídoto contra o coração que se eleva na prosperidade (Dt 8:14). Guiados pelo grande e terrível deserto e saciados com água da rocha pederneira, aprenderam que tudo o que têm é dádiva (Dt 8:15-16). Lembrar-se de ter sido servo é lembrar-se de ter sido resgatado — e é o Senhor \"que te dá força para adquirires riqueza\" (Dt 8:18).",
    },
    multidao: {
      title: "Israel lembrado do maná",
      subtitle: "Deuteronômio 8 • humilhado e provado no deserto",
      text: "É Israel chamado a lembrar todo o caminho de quarenta anos, em que o Senhor o humilhou e sustentou com o maná, \"para te dar a entender que o homem não viverá só de pão\" (Dt 8:2-3). O povo é advertido de que, ao entrar na boa terra e fartar-se, não eleve o coração dizendo que a própria força \"me adquiriu este poder\" (Dt 8:17). É a geração ensinada a que o Senhor é quem dá força para adquirir riqueza, e que esquecê-lo é perecer (Dt 8:18-19).",
    },
  },
  9: {
    homem: {
      title: "Arão, poupado pela intercessão",
      subtitle: "Deuteronômio 9 • o irmão por quem Moisés orou",
      text: "É Arão, o sacerdote, lembrado neste flashback do bezerro de ouro: \"Também o Senhor se irou muito contra Arão para o destruir; mas também orei por Arão ao mesmo tempo\" (Dt 9:20). Enquanto Moisés jejuava quarenta dias no monte, Arão cedeu ao povo, e sua vida foi preservada apenas pela intercessão do irmão (Dt 9:9,18). Nele se vê que nem o sumo sacerdote de Israel subsiste por mérito próprio, mas por um mediador que roga em seu favor (Hb 7:25).",
    },
    rei: {
      title: "Os reis das cidades muradas até aos céus",
      subtitle: "Deuteronômio 9 • os filhos dos gigantes",
      text: "São os soberanos das nações \"maiores e mais fortes\" que Israel encontrará além do Jordão, senhores de cidades muradas até aos céus e do povo alto, filhos dos gigantes (Dt 9:1-2). Diante da pergunta \"Quem resistiria diante dos filhos dos gigantes?\", a resposta não está na força de Israel, mas no Senhor que \"passa adiante de ti, é um fogo consumidor\" (Dt 9:3). Sua queda não premiará a justiça de Israel, mas julgará a impiedade das nações (Dt 9:5).",
    },
    multidao: {
      title: "Israel, povo obstinado",
      subtitle: "Deuteronômio 9 • não pela tua justiça",
      text: "É Israel prestes a passar o Jordão contra povos gigantes, advertido de que não vencerá nem herdará por sua própria justiça, mas pela impiedade das nações e pela fidelidade de Deus aos pais (Dt 9:4-6). Moisés lhes recorda o pecado do bezerro de ouro em Horebe, quando quebrou as tábuas e intercedeu quarenta dias para que não fossem destruídos (Dt 9:16-19). São o povo de \"dura cerviz\" que só subsiste pela intercessão e pela misericórdia (Dt 9:6,13).",
    },
  },
  10: {
    homem: {
      title: "O estrangeiro amado no meio de Israel",
      subtitle: "Deuteronômio 10 • pão e roupa por mãos de Deus",
      text: "É o forasteiro que habita entre os israelitas, objeto direto do cuidado do Deus que \"não faz acepção de pessoas, nem aceita recompensas\" e que \"ama o estrangeiro, dando-lhe pão e roupa\" (Dt 10:17-18). Israel deve amá-lo pela mesma razão que o dízimo e o sábado invocam: \"pois fostes estrangeiros na terra do Egito\" (Dt 10:19). Nele o povo aprende que a imitação de Deus se mede no tratamento dado a quem não tem parentela nem herança.",
    },
    mulherComum: {
      title: "A viúva a quem o Senhor faz justiça",
      subtitle: "Deuteronômio 10 • o Deus dos deuses e dos desamparados",
      text: "É a viúva de Israel, nomeada ao lado do órfão como aquela por quem o próprio Deus toma partido: ele \"faz justiça ao órfão e à viúva\" (Dt 10:18). O texto a coloca logo depois do título mais alto do capítulo — \"o Deus dos deuses, e o Senhor dos senhores, o Deus grande, poderoso e terrível\" (Dt 10:17) —, mostrando que a grandeza divina se inclina ao desamparo. Cuidar dela é a marca do coração circuncidado que o Senhor pede (Dt 10:16).",
    },
    servo: {
      title: "A tribo de Levi, separada para servir",
      subtitle: "Deuteronômio 10 • o Senhor é a sua herança",
      text: "São os levitas, separados pelo Senhor \"para levar a arca da aliança do Senhor, para estar diante do Senhor, para o servir, e para abençoar em seu nome\" (Dt 10:8). Por isso Levi não tem parte nem herança com seus irmãos: \"o Senhor é a sua herança\" (Dt 10:9). Nesse capítulo, em que Arão morre e Eleazar assume o sacerdócio, eles mostram que servir a Deus é receber o próprio Deus como porção (Dt 10:6; Sl 16:5).",
    },
    multidao: {
      title: "Israel chamado a circuncidar o coração",
      subtitle: "Deuteronômio 10 • o que o Senhor pede de ti",
      text: "É Israel diante das segundas tábuas e da arca, ouvindo o que o Senhor pede: temê-lo, andar em seus caminhos, amá-lo e servi-lo de todo o coração (Dt 10:12). O povo é chamado a circuncidar \"o prepúcio do vosso coração\" e não mais endurecer a cerviz, imitando o Deus que faz justiça ao órfão, à viúva e ao estrangeiro (Dt 10:16-18). São os descendentes das setenta almas que desceram ao Egito e agora são como as estrelas do céu (Dt 10:22).",
    },
  },
  11: {
    homem: {
      title: "Datã e Abirão, tragados pela terra",
      subtitle: "Deuteronômio 11 • o juízo que os olhos viram",
      text: "São os \"filhos de Eliabe, filho de Rúben\", lembrados por Moisés como sinal que a geração presente viu com os próprios olhos: a terra abriu a boca e os tragou com suas casas, suas tendas e tudo o que lhes pertencia, no meio de todo o Israel (Dt 11:6). Sua rebelião contra a autoridade dada por Deus terminou em juízo imediato (Nm 16:31-33). Ficam na cena como advertência de que a aliança tem bênção e maldição, e que Deus não é escarnecido (Dt 11:26-28).",
    },
    rei: {
      title: "Faraó e o exército afogado",
      subtitle: "Deuteronômio 11 • o que os pais viram e os filhos não",
      text: "É \"Faraó, rei do Egito\", junto com seus cavalos e carros, sobre quem o Senhor fez passar as águas do Mar Vermelho quando perseguiam Israel (Dt 11:3-4). Moisés adverte que fala aos que viram, não aos filhos que não viram: a memória desse juízo é a base do amor e da obediência exigidos (Dt 11:2,7-8). O rei destruído \"até ao dia de hoje\" é prova de que o Senhor peleja pelos seus e sepulta os que os oprimem.",
    },
    multidao: {
      title: "Israel entre a bênção e a maldição",
      subtitle: "Deuteronômio 11 • Gerizim e Ebal",
      text: "É Israel, cujos próprios olhos viram os feitos do Senhor no Egito, no Mar Vermelho e no juízo de Datã e Abirão (Dt 11:3-7). O povo é chamado a amar e servir ao Senhor para receber a chuva temporã e serôdia sobre a boa terra, e advertido de que a idolatria fecharia os céus (Dt 11:13-17). Diante deles Moisés põe \"a bênção e a maldição\", a serem pronunciadas nos montes Gerizim e Ebal (Dt 11:26,29).",
    },
  },
  12: {
    servo: {
      title: "Os servos e o levita na festa do santuário",
      subtitle: "Deuteronômio 12 • alegria diante do Senhor",
      text: "São \"os vossos servos, e as vossas servas, e o levita que está dentro das vossas portas\", convocados a comer e alegrar-se com a casa israelita no lugar que o Senhor escolher (Dt 12:12,18). O levita é nomeado com uma razão comovente: \"convosco não tem parte nem herança\", e por isso a lei manda: \"não desampares ao levita todos os teus dias na terra\" (Dt 12:12,19). No culto verdadeiro ninguém é excluído da mesa: a alegria diante de Deus se reparte com os que servem.",
    },
    multidao: {
      title: "Israel e o lugar do único culto",
      subtitle: "Deuteronômio 12 • onde o Senhor puser o seu nome",
      text: "É Israel instruído a destruir todos os altares das nações e a não adorar em qualquer lugar, mas só no lugar que o Senhor escolher para pôr o seu nome (Dt 12:2-5). Ali trarão holocaustos, dízimos e primícias, e ali se alegrarão perante o Senhor com suas casas (Dt 12:6-7). O povo aprende a santidade do sangue, que não deve ser comido mas derramado sobre a terra, porque \"o sangue é vida\" (Dt 12:23).",
    },
    rebanho: {
      title: "Os primogênitos das vacas e ovelhas",
      subtitle: "Deuteronômio 12 • trazidos ao lugar escolhido",
      text: "São os animais dos rebanhos de Israel — vacas e ovelhas cujos primogênitos e dízimos deviam ser trazidos ao lugar único do culto e ali comidos perante o Senhor (Dt 12:6,17-18). A carne comum podia ser abatida nas portas segundo o desejo da alma, mas o sangue jamais comido, sempre derramado como água (Dt 12:15-16). Representam a oferta que reconhece que toda a fartura do gado vem da bênção do Senhor.",
    },
  },
  13: {
    homem: {
      title: "O profeta ou sonhador de sonhos",
      subtitle: "Deuteronômio 13 • o sinal que não autoriza",
      text: "É aquele que se levanta no meio de Israel dando um sinal ou prodígio, e depois diz: \"Vamos após outros deuses, que não conheceste, e sirvamo-los\" (Dt 13:1-2). Ainda que o prodígio aconteça, o povo não deve ouvi-lo, \"porquanto o Senhor vosso Deus vos prova\" para saber se o amam de todo o coração (Dt 13:3). Ele ensina que milagre algum valida uma mensagem contrária à palavra revelada — o critério da verdade é a fidelidade ao único Senhor (Gl 1:8).",
    },
    multidao: {
      title: "Israel provado pela sedução à idolatria",
      subtitle: "Deuteronômio 13 • o profeta e o sedutor",
      text: "É Israel advertido de que, se um profeta ou sonhador o incitar a seguir outros deuses — mesmo confirmando um sinal —, não deve ouvi-lo, pois o Senhor está provando o seu amor (Dt 13:1-3). O povo aprende que a fidelidade à aliança pesa mais que laços de sangue ou milagres, e que a cidade que apostatar deve ser destruída para tirar o mal do meio de si (Dt 13:12-15). São a congregação chamada a andar após o Senhor e só a ele servir (Dt 13:4).",
    },
    mulherComum: {
      title: "A mulher do seio que incita à idolatria",
      subtitle: "Deuteronômio 13 • a sedução em segredo",
      text: "É \"a mulher do teu seio\" — a esposa amada — que, segundo a lei, poderia incitar secretamente o marido a servir a outros deuses que ele não conheceu (Dt 13:6). A gravidade do caso está justamente na intimidade: o apelo vem de quem é \"como a tua alma\", e ainda assim não se deve consentir nem poupar (Dt 13:8). Ela mostra que nenhum afeto humano pode competir com a lealdade devida ao único Senhor.",
    },
  },
  14: {
    homem: {
      title: "O israelita que traz o dízimo",
      subtitle: "Deuteronômio 14 • filho do Senhor, não das nações",
      text: "É o homem de Israel a quem se diz \"Filhos sois do Senhor vosso Deus\", e que por isso não se dá golpes nem faz calva por causa de algum morto, como os pagãos (Dt 14:1). Ele separa fielmente os dízimos do grão, do mosto e do azeite e os come no lugar escolhido, \"para que aprendas a temer ao Senhor teu Deus todos os dias\" (Dt 14:23). Quando o caminho é longo, converte o dízimo em dinheiro e se alegra com sua casa diante do Senhor (Dt 14:24-26).",
    },
    mulherComum: {
      title: "A viúva do dízimo do terceiro ano",
      subtitle: "Deuteronômio 14 • a mesa dos que nada têm",
      text: "É a viúva de Israel que, ao fim de três anos, vem com o levita, o estrangeiro e o órfão comer do dízimo recolhido dentro das portas, \"e comerão, e fartar-se-ão\" (Dt 14:28-29). A Escritura não lhe dá nome, mas lhe dá lugar à mesa: a santidade do povo se prova na fartura dos desamparados. E a promessa é clara — por causa dela o Senhor abençoa \"toda a obra que as tuas mãos fizerem\" (Dt 14:29).",
    },
    servo: {
      title: "O levita dentro das tuas portas",
      subtitle: "Deuteronômio 14 • o servo sem herança",
      text: "É o levita que vive nas cidades de Israel e a quem o israelita jamais deve desamparar, \"pois não tem parte nem herança contigo\" (Dt 14:27). Servo do santuário, depende do dízimo e das ofertas do povo para comer e fartar-se (Dt 14:29). Sustentá-lo não é caridade opcional, mas reconhecimento de que o culto pertence a toda a nação e de que o Senhor cuida dos seus servos por meio das mãos dos irmãos.",
    },
    multidao: {
      title: "Israel, filhos do Senhor",
      subtitle: "Deuteronômio 14 • povo santo e as leis do alimento",
      text: "É Israel identificado como \"Filhos sois do Senhor vosso Deus\" e povo santo, que por isso não imita os ritos de luto pagãos nem come o que é imundo (Dt 14:1-3). O povo distingue os animais limpos dos imundos como marca de sua consagração, e separa fielmente os dízimos do grão, do mosto e do azeite (Dt 14:22-23). A cada três anos partilha o dízimo com o levita, o órfão, a viúva e o estrangeiro, para que a bênção do Senhor repouse sobre suas mãos (Dt 14:29).",
    },
    rebanho: {
      title: "Os animais limpos e imundos",
      subtitle: "Deuteronômio 14 • o que a mesa santa pode comer",
      text: "São os animais que distinguem a mesa de Israel: o boi, a ovelha e a cabra entre os limpos, e o porco, o camelo e a lebre entre os imundos (Dt 14:4-8). Junto deles estão os primogênitos das vacas e ovelhas, comidos como dízimo no lugar escolhido pelo Senhor (Dt 14:23). Essas distinções ensinam o povo santo a temer ao Senhor e a lembrar que até o comer pertence a Deus.",
    },
  },
  15: {
    homem: {
      title: "O irmão pobre nas tuas portas",
      subtitle: "Deuteronômio 15 • a mão que se abre de todo",
      text: "É o israelita empobrecido \"de teus irmãos, em alguma das tuas portas\", diante de quem não se deve endurecer o coração nem fechar a mão (Dt 15:7-8). A lei antecipa o cálculo mesquinho de quem se recusa a emprestar por estar próximo o ano da remissão, e adverte: se ele clamar ao Senhor contra ti, \"haja em ti pecado\" (Dt 15:9). Sua presença permanente — \"nunca deixará de haver pobre na terra\" — é a ocasião contínua da generosidade do povo de Deus (Dt 15:11; Mt 26:11).",
    },
    servo: {
      title: "O irmão hebreu vendido por seis anos",
      subtitle: "Deuteronômio 15 • livre, e não vazio",
      text: "É o hebreu ou a hebreia que, por pobreza, se vendeu ao irmão e o serve seis anos, sendo despedido livre no sétimo (Dt 15:12). Não sai de mãos vazias: é fornecido liberalmente do rebanho, da eira e do lagar, porque \"lembrar-te-ás de que foste servo na terra do Egito, e de que o Senhor teu Deus te resgatou\" (Dt 15:14-15). Se por amor quiser ficar, tem a orelha furada à porta e serve para sempre — imagem da servidão que nasce do afeto, não do jugo (Dt 15:16-17).",
    },
    multidao: {
      title: "Israel no ano da remissão",
      subtitle: "Deuteronômio 15 • perdão de dívidas e libertação",
      text: "É Israel instruído a perdoar as dívidas ao fim de cada sete anos e a não fechar a mão ao irmão pobre, mas abri-la de todo, conforme a sua necessidade (Dt 15:1-2,7-8). No sétimo ano o escravo hebreu é libertado, e não vazio, mas suprido liberalmente do rebanho e do lagar, lembrando que Israel mesmo foi servo no Egito e foi resgatado (Dt 15:13-15). É o povo que reflete a generosidade do seu Redentor.",
    },
    rebanho: {
      title: "Os primogênitos machos do gado",
      subtitle: "Deuteronômio 15 • santificados ao Senhor",
      text: "São os primogênitos machos das vacas e ovelhas, que Israel devia santificar ao Senhor — sem trabalhar com o boi primogênito nem tosquiar a ovelha primogênita (Dt 15:19). Comidos ano após ano perante o Senhor no lugar escolhido, não podiam ter defeito: o coxo ou o cego não seria sacrificado (Dt 15:20-21). Apontam para a exigência de perfeição na oferta, cumprida no Cordeiro sem defeito.",
    },
  },
  16: {
    homem: {
      title: "O peregrino das três festas",
      subtitle: "Deuteronômio 16 • ninguém aparecerá vazio",
      text: "É o israelita de quem a lei diz: \"Três vezes no ano todo o homem entre ti aparecerá perante o Senhor teu Deus\", nas festas dos pães ázimos, das semanas e dos tabernáculos (Dt 16:16). Ele sobe ao lugar escolhido levando oferta voluntária, \"cada um, conforme ao dom da sua mão, conforme a bênção do Senhor teu Deus\" (Dt 16:17). Come o pão ázimo, \"pão de aflição\", para lembrar todos os dias da vida o dia em que saiu do Egito (Dt 16:3).",
    },
    multidao: {
      title: "Israel nas três festas",
      subtitle: "Deuteronômio 16 • Páscoa, Semanas e Tabernáculos",
      text: "É Israel reunido três vezes no ano diante do Senhor: na Páscoa, que celebra a saída do Egito, na festa das Semanas e na dos Tabernáculos (Dt 16:1,16). Ninguém aparece de mãos vazias; cada um traz conforme a bênção recebida, e todos se alegram — inclusive o servo, o levita, o órfão, a viúva e o estrangeiro (Dt 16:11,14). É o povo chamado também a seguir \"a justiça, somente a justiça\", pondo juízes que não torçam o direito (Dt 16:20).",
    },
  },
  17: {
    homem: {
      title: "O homem que transgrediu a aliança",
      subtitle: "Deuteronômio 17 • o idólatra julgado às portas",
      text: "É o israelita — \"algum homem ou mulher\" — achado numa das cidades servindo a outros deuses, ao sol, à lua ou a todo o exército do céu, \"o que eu não ordenei\" (Dt 17:2-3). Denunciado, sua causa é bem inquirida, e só sob a palavra de duas ou três testemunhas ele é levado às portas para morrer, jamais por uma única voz (Dt 17:5-6). Seu caso mostra a seriedade da apostasia e, ao mesmo tempo, o rigor probatório que protege o inocente da calúnia.",
    },
    servo: {
      title: "Os sacerdotes levitas do tribunal superior",
      subtitle: "Deuteronômio 17 • as causas difíceis demais",
      text: "São os sacerdotes levitas que servem no lugar escolhido pelo Senhor, aos quais sobem as questões difíceis demais em juízo — \"entre sangue e sangue, entre demanda e demanda, entre ferida e ferida\" (Dt 17:8-9). Sua sentença deve ser cumprida sem desvio, nem para a direita nem para a esquerda (Dt 17:10-11). Quem se houver soberbamente, não dando ouvidos ao sacerdote \"que está ali para servir ao Senhor teu Deus\", morrerá — porque desprezá-los é desprezar o juízo de Deus (Dt 17:12).",
    },
    multidao: {
      title: "Israel diante do tribunal e da Lei",
      subtitle: "Deuteronômio 17 • testemunhas e juízos",
      text: "É Israel que deve tirar o mal do meio de si, condenando o idólatra apenas sob a palavra de duas ou três testemunhas, nunca de uma só (Dt 17:6-7). As causas difíceis sobem ao lugar escolhido, aos sacerdotes levitas e ao juiz, cuja sentença deve ser obedecida, sem se desviar nem para a direita nem para a esquerda (Dt 17:8-11). É o povo aprendendo que o juízo pertence a Deus e exige integridade.",
    },
    rei: {
      title: "O futuro rei que copia a Lei",
      subtitle: "Deuteronômio 17 • o monarca sob a Palavra",
      text: "É o rei que Israel um dia pediria, \"assim como têm todas as nações\" — mas que deve ser escolhido pelo Senhor, dentre os irmãos, jamais estrangeiro (Dt 17:14-15). Ao assumir o trono, deve escrever para si uma cópia desta lei e nela ler todos os dias, para não multiplicar cavalos, mulheres, prata e ouro, nem elevar o coração sobre os irmãos (Dt 17:16-19). É a figura de um rei submisso à Palavra, que aponta para o Rei perfeito, filho de Davi.",
    },
  },
  18: {
    homem: {
      title: "O Profeta como Moisés",
      subtitle: "Deuteronômio 18 • as palavras postas na sua boca",
      text: "É aquele que o Senhor promete levantar \"do meio de ti, de teus irmãos, como eu; a ele ouvireis\" (Dt 18:15). Deus diz dele: \"porei as minhas palavras na sua boca, e ele lhes falará tudo o que eu lhe ordenar\", e requererá conta de quem não o ouvir (Dt 18:18-19). Contrastado com o profeta presunçoso cuja palavra não se cumpre, ele é a esperança de Israel — cumprida em Cristo, o Profeta a quem devemos ouvir (At 3:22-23).",
    },
    mulherComum: {
      title: "A que consulta os mortos",
      subtitle: "Deuteronômio 18 • as abominações das nações",
      text: "É a figura da feiticeira e agoureira das nações de Canaã, cuja arte o Senhor proíbe terminantemente em Israel: não se achará entre ti \"nem encantador, nem quem consulte a um espírito adivinhador, nem mágico, nem quem consulte os mortos\" (Dt 18:11). Por essas abominações o Senhor lança fora aquelas nações da terra (Dt 18:12). Ela é o avesso do Profeta prometido: em vez de receber a palavra de Deus, arranca segredos das trevas — caminho que levaria Saul à ruína em En-Dor (1 Sm 28:7-19).",
    },
    servo: {
      title: "Os sacerdotes levitas sem herança",
      subtitle: "Deuteronômio 18 • das ofertas queimadas comerão",
      text: "São os sacerdotes levitas, toda a tribo de Levi, que \"não terão parte nem herança com Israel; das ofertas queimadas do Senhor e da sua herança comerão\" (Dt 18:1). Deles é o direito da espádua, das queixadas e do bucho, e as primícias do grão, do mosto, do azeite e da tosquia das ovelhas (Dt 18:3-4). O Senhor os escolheu \"para que assista e sirva no nome do Senhor, ele e seus filhos, todos os dias\" — servos cuja única riqueza é o próprio Deus (Dt 18:2,5).",
    },
    multidao: {
      title: "Israel e a promessa do Profeta",
      subtitle: "Deuteronômio 18 • como eu, um profeta",
      text: "É Israel instruído a sustentar os sacerdotes levitas, que não têm herança porque \"o Senhor é a sua herança\", e a rejeitar toda adivinhação e feitiçaria das nações (Dt 18:2,10-12). Sobre o povo recai a grande promessa: o Senhor lhes levantará \"um profeta do meio de ti, de teus irmãos, como eu; a ele ouvireis\" (Dt 18:15,18). É a congregação que aguarda o Profeta maior, cumprido em Cristo (At 3:22).",
    },
  },
  19: {
    anciao: {
      title: "Os anciãos da cidade do homicida",
      subtitle: "Deuteronômio 19 • o refúgio que não acoberta",
      text: "São os anciãos que, sabendo que um assassino de propósito — que \"arma ciladas\" ao próximo — se refugiou numa das cidades, mandam buscá-lo e o entregam na mão do vingador do sangue (Dt 19:11-12). Cabe a eles distinguir o homicida involuntário, que ali deve viver, do criminoso que profana o asilo. Assim guardam a terra do sangue inocente, porque \"o teu olho não o perdoará\" quando a justiça exigir (Dt 19:13).",
    },
    homem: {
      title: "O lenhador cujo machado saltou",
      subtitle: "Deuteronômio 19 • o homicida sem ódio antigo",
      text: "É o israelita que entrou com o próximo no bosque para cortar lenha e, ao golpear a árvore, viu o ferro saltar do cabo, ferir o companheiro e matá-lo (Dt 19:5). Sem ódio anterior, ele foge a uma das cidades de refúgio e vive, protegido do vingador de sangue que o alcançaria pela longa estrada, \"porque não é culpado de morte\" (Dt 19:6). Ele é a razão humana e concreta das cidades de refúgio: Deus julga o coração, não só o resultado.",
    },
    servo: {
      title: "Os sacerdotes e juízes daqueles dias",
      subtitle: "Deuteronômio 19 • perante o Senhor, na demanda",
      text: "São os sacerdotes e juízes diante de quem \"aqueles dois homens, que tiverem a demanda, se apresentarão perante o Senhor\" quando surgir suspeita de testemunho falso (Dt 19:17). Servos do santuário e da justiça, devem inquirir bem, e se a testemunha mentiu, far-lhe-ão o que ela pretendia fazer ao irmão (Dt 19:18-19). Seu ofício mantém viva a regra de que nenhum fato se estabelece por uma só boca, mas por duas ou três testemunhas (Dt 19:15).",
    },
    multidao: {
      title: "Israel e as cidades de refúgio",
      subtitle: "Deuteronômio 19 • sangue inocente e justo juízo",
      text: "É Israel instruído a separar cidades de refúgio, para que o homicida involuntário se acolha e viva, protegido do vingador do sangue (Dt 19:2-6). O povo deve preservar o sangue inocente da terra e julgar com equidade, punindo a testemunha falsa com o mal que pretendia causar ao irmão (Dt 19:16-19). É a congregação que aprende a proteger o inocente e a extirpar a mentira: \"vida por vida, olho por olho\" (Dt 19:21).",
    },
  },
  20: {
    cavaleiro: {
      title: "Os cavalos e carros dos inimigos",
      subtitle: "Deuteronômio 20 • o que Israel vê e não teme",
      text: "São os esquadrões inimigos que Israel avistará ao sair à peleja — \"cavalos, e carros, e povo maior em número do que tu\" (Dt 20:1). Diante deles o sacerdote se adianta e proclama: \"não temais nem tremais, nem vos aterrorizeis diante deles\", porque o Senhor vai junto para pelejar e salvar (Dt 20:3-4). A cavalaria pagã, arma mais temida da época, torna-se aqui o cenário exato onde a fé substitui o cálculo militar (Sl 20:7).",
    },
    homem: {
      title: "Os dispensados antes da batalha",
      subtitle: "Deuteronômio 20 • quem torna à sua casa",
      text: "São os israelitas que os oficiais mandam voltar do exército: o que edificou casa nova e não a consagrou, o que plantou vinha e não a desfrutou, o que está desposado e ainda não recebeu a esposa, e ainda \"o homem medroso e de coração tímido\" (Dt 20:5-8). Os três primeiros são poupados para gozar o que Deus lhes deu; o último é dispensado para que seu medo não derreta o coração dos irmãos (Dt 20:8). A guerra do Senhor não depende de números, mas de corações inteiros (Jz 7:3).",
    },
    mulherComum: {
      title: "A noiva que espera o desposado",
      subtitle: "Deuteronômio 20 • a vida preservada na guerra",
      text: "É a moça de Israel desposada e ainda não recebida em casa, por causa de quem o noivo é dispensado da peleja, \"para que porventura não morra na peleja e algum outro homem a receba\" (Dt 20:7). Ao lado dela estão as mulheres e crianças das cidades distantes, poupadas quando a cidade não é das nações postas sob anátema (Dt 20:14-15). Mesmo em capítulo de guerra, a lei protege o vínculo do casamento e a vida dos que não pegam em armas.",
    },
    rei: {
      title: "Os reis das cidades sitiadas",
      subtitle: "Deuteronômio 20 • a paz apregoada antes do cerco",
      text: "São os senhores das cidades a que Israel se achega para combater e a quem primeiro deve apregoar a paz; se responderem em paz e abrirem as portas, o povo será tributário e servirá (Dt 20:10-11). Só a recusa traz o cerco (Dt 20:12-13). Mas para as cidades das nações de Canaã — heteus, amorreus, cananeus, perizeus, heveus e jebuseus — vale o anátema, para que não ensinem Israel a imitar suas abominações (Dt 20:17-18).",
    },
  },
  21: {
    anciao: {
      title: "Os anciãos que lavam as mãos no vale",
      subtitle: "Deuteronômio 21 • o sangue sem culpado conhecido",
      text: "São os anciãos e juízes da cidade mais próxima do morto achado no campo, que medem as distâncias, degolam uma novilha num vale áspero e lavam as mãos sobre ela (Dt 21:2-6). Ali protestam: \"As nossas mãos não derramaram este sangue, e os nossos olhos o não viram\", e rogam: \"Sê propício ao teu povo Israel\" (Dt 21:7-8). Mostram que o sangue inocente contamina a terra inteira até que haja expiação — e que a liderança responde por aquilo que ninguém confessa.",
    },
    homem: {
      title: "O filho contumaz e rebelde",
      subtitle: "Deuteronômio 21 • levado à porta da cidade",
      text: "É o filho que não obedece à voz do pai nem à voz da mãe e não se emenda com o castigo; ambos os pais o levam aos anciãos, à porta, acusando: \"Este nosso filho é rebelde e contumaz... é um comilão e um beberrão\" (Dt 21:18-20). Só então os homens da cidade o apedrejam, para que se tire o mal do meio de Israel e todo o povo ouça e tema (Dt 21:21). Sua figura sombria revela quanto Deus honra a autoridade dada aos pais e quão letal é a rebeldia obstinada.",
    },
    mulherComum: {
      title: "A esposa desprezada e seu primogênito",
      subtitle: "Deuteronômio 21 • o direito que o amor não anula",
      text: "É a mulher menos amada de um lar com duas esposas, cujo filho, porém, nasceu primeiro (Dt 21:15). A lei impede que o marido dê a primogenitura ao filho da amada: deve reconhecer o filho da desprezada, \"dando-lhe dobrada porção de tudo quanto tiver\", pois \"aquele é o princípio da sua força\" (Dt 21:16-17). Ela é a mulher preterida no afeto que Deus não permite que seja preterida no direito — como Lia na casa de Jacó (Gn 29:31-33).",
    },
    rebanho: {
      title: "A novilha degolada no vale áspero",
      subtitle: "Deuteronômio 21 • expiação por sangue anônimo",
      text: "É a novilha \"da manada, que não tenha trabalhado nem tenha puxado com o jugo\", levada pelos anciãos a um vale nunca lavrado nem semeado e ali degolada (Dt 21:3-4). Sem altar e sem culpado, ela leva sobre si o sangue inocente derramado na terra, e por ela o sangue é expiado ao povo (Dt 21:8-9). O animal sem jugo, morto no lugar do desconhecido, prefigura a substituição perfeita: um inocente morrendo pela culpa de outros (1 Pe 3:18).",
    },
    multidao: {
      title: "Israel e a expiação do sangue",
      subtitle: "Deuteronômio 21 • a novilha e o pendurado no madeiro",
      text: "É Israel diante de várias leis: a novilha degolada no vale quando se acha um morto sem culpado conhecido, os anciãos lavando as mãos e clamando pela expiação do sangue inocente (Dt 21:1-8). O povo aprende também o direito da primogenitura, o julgamento do filho rebelde e que \"o pendurado é maldito de Deus\", devendo ser enterrado no mesmo dia (Dt 21:22-23) — palavra que Paulo aplica à cruz de Cristo (Gl 3:13).",
    },
    mulher: {
      title: "A cativa formosa",
      subtitle: "Deuteronômio 21 • a prisioneira tomada por esposa",
      text: "É a mulher formosa vista entre os prisioneiros de guerra, que o israelita pode desejar e tomar por esposa (Dt 21:11). A lei a protege: ela rapa a cabeça, corta as unhas e chora pai e mãe um mês inteiro antes do casamento, e se depois for rejeitada, deve ser posta em liberdade, jamais vendida ou tratada como escrava, \"pois a tens humilhado\" (Dt 21:12-14). Mesmo no cativeiro, sua dignidade humana é resguardada.",
    },
  },
  22: {
    anciao: {
      title: "Os anciãos da cidade, à porta",
      subtitle: "Deuteronômio 22 • a honra da moça julgada",
      text: "São os anciãos diante de quem o pai da moça difamada estende a prova da virgindade da filha e denuncia: \"Eu dei minha filha por mulher a este homem, porém ele a despreza\" (Dt 22:15-17). Eles castigam o marido caluniador e o multam em cem siclos de prata, dados ao pai, e o proíbem de repudiá-la em todos os seus dias (Dt 22:18-19). À porta da cidade, o tribunal de Israel existe para que a palavra de um homem poderoso não destrua a reputação de uma jovem indefesa.",
    },
    homem: {
      title: "O marido que difama a esposa",
      subtitle: "Deuteronômio 22 • a má fama sobre uma virgem de Israel",
      text: "É o homem que, depois de coabitar com a mulher que tomou, a despreza e lhe imputa coisas escandalosas, divulgando má fama: \"Tomei esta mulher... porém não a achei virgem\" (Dt 22:13-14). Provada a mentira, ele é castigado, multado e perde para sempre o direito de repudiá-la (Dt 22:18-19). Sua figura mostra que, na lei de Deus, a calúnia contra a honra alheia é crime público, não desavença doméstica (Êx 20:16).",
    },
    mulherComum: {
      title: "A moça desposada forçada no campo",
      subtitle: "Deuteronômio 22 • ela gritou e não houve quem a livrasse",
      text: "É a jovem noiva violentada longe da cidade, sobre quem a lei declara: \"à moça não farás nada. A moça não tem culpa de morte\" (Dt 22:26). Só o agressor morre, porque o caso é comparado ao homicídio — \"como o homem que se levanta contra o seu próximo, e lhe tira a vida, assim é este caso\" (Dt 22:26). O texto presume seu grito e sua inocência: \"a moça desposada gritou, e não houve quem a livrasse\" (Dt 22:27), e Deus se põe ao lado da vítima.",
    },
    rebanho: {
      title: "O boi e a ovelha extraviados do irmão",
      subtitle: "Deuteronômio 22 • o animal que obriga ao amor",
      text: "São os animais perdidos do próximo — boi, ovelha ou jumento — que o israelita não pode ignorar: deve restituí-los sem falta e, se o dono estiver longe ou for desconhecido, recolhê-los em casa até que os busque (Dt 22:1-3). Vendo o jumento ou o boi do irmão caídos no caminho, \"sem falta o ajudarás a levantá-los\" (Dt 22:4). Junto deles está a ave-mãe sobre o ninho, que se deve deixar ir livre (Dt 22:6-7): até no trato com os animais o povo santo aprende misericórdia.",
    },
    multidao: {
      title: "Israel e as leis do próximo",
      subtitle: "Deuteronômio 22 • amor prático e pureza",
      text: "É Israel chamado à responsabilidade fraterna: recolher o boi ou a ovelha extraviados do irmão, levantar o jumento caído e devolver toda coisa perdida (Dt 22:1-4). O povo aprende a respeitar as distinções que Deus fez — no vestir, no plantar, no arar — e a proteger a vida com um parapeito no eirado da casa nova (Dt 22:8). São leis de santidade que tocam a vida cotidiana, inclusive a honra da moça de Israel (Dt 22:13-19).",
    },
  },
  23: {
    homem: {
      title: "Balaão, filho de Beor",
      subtitle: "Deuteronômio 23 • a maldição trocada em bênção",
      text: "É o adivinho de Petor, da Mesopotâmia, que Moabe alugou \"para te amaldiçoar\" quando Israel saía do Egito (Dt 23:4). Mas o Senhor não quis ouvi-lo; antes \"trocou em bênção a maldição; porquanto o Senhor teu Deus te amava\" (Dt 23:5). Por isso amonitas e moabitas ficam excluídos da congregação — e Balaão permanece na memória de Israel como prova de que nenhuma feitiçaria prevalece contra o povo amado de Deus (Nm 23:8).",
    },
    servo: {
      title: "O escravo fugido acolhido em Israel",
      subtitle: "Deuteronômio 23 • não o entregarás a seu senhor",
      text: "É o servo que fugiu do seu senhor e se acolheu a Israel, e a lei manda: \"Não entregarás a seu senhor o servo que, tendo fugido dele, se acolher a ti\" (Dt 23:15). Ele fica no meio do povo, no lugar que escolher em alguma das portas, onde lhe agradar, e ninguém o oprimirá (Dt 23:16). Num mundo antigo que devolvia fugitivos, Israel deve ser asilo — porque foi ele mesmo servo que fugiu da casa da servidão (Fm 1:15-16).",
    },
    multidao: {
      title: "Israel, a congregação do Senhor",
      subtitle: "Deuteronômio 23 • quem entra e a santidade do arraial",
      text: "É Israel reunido como \"congregação do Senhor\", cuja santidade determina quem nela pode entrar e como o arraial deve permanecer puro, \"porquanto o Senhor teu Deus anda no meio de teu arraial\" (Dt 23:1,14). O povo lembra que o Senhor transformou em bênção a maldição de Balaão, \"porquanto o Senhor teu Deus te amava\" (Dt 23:5). São a assembleia santa, chamada a cumprir votos, respeitar o próximo e acolher o escravo fugido.",
    },
  },
  24: {
    homem: {
      title: "O diarista pobre e necessitado",
      subtitle: "Deuteronômio 24 • o salário pago antes do pôr do sol",
      text: "É o trabalhador que ganha por dia, israelita ou estrangeiro, que vive nas portas da cidade e a quem se proíbe oprimir (Dt 24:14). Seu salário deve ser pago no mesmo dia, \"e o sol não se porá sobre isso; porquanto pobre é, e sua vida depende disso\" (Dt 24:15). Se lhe atrasarem a diária, ele clamará ao Senhor contra o empregador, e nisso haverá pecado — porque Deus ouve o grito do jornaleiro (Tg 5:4).",
    },
    mulherComum: {
      title: "A viúva e a espiga esquecida",
      subtitle: "Deuteronômio 24 • a colheita que se deixa para trás",
      text: "É a viúva de Israel, cuja roupa jamais pode ser tomada em penhor e cujo direito não se deve perverter (Dt 24:17). Para ela, junto com o estrangeiro e o órfão, ficam o molho esquecido no campo, os ramos não rebuscados da oliveira e os cachos deixados na vinha (Dt 24:19-21). A razão é sempre a mesma memória: \"lembrar-te-ás de que foste servo na terra do Egito\" — e a promessa é a bênção do Senhor sobre toda a obra das mãos (Dt 24:19,22).",
    },
    servo: {
      title: "Israel que foi servo no Egito",
      subtitle: "Deuteronômio 24 • a memória que gera compaixão",
      text: "São os hebreus escravizados, invocados duas vezes neste capítulo como fundamento das leis sociais: \"lembrar-te-ás de que foste servo no Egito, e de que o Senhor teu Deus te livrou dali\" (Dt 24:18,22). Por isso não se oprime o diarista, não se toma a mó em penhor, não se dorme com a capa do pobre e se deixa a colheita para os desamparados (Dt 24:6,12-15). A ética de Israel nasce da própria experiência do resgate: os libertados não podem oprimir.",
    },
    mulher: {
      title: "A mulher da carta de repúdio",
      subtitle: "Deuteronômio 24 • a lei do divórcio",
      text: "É a mulher que, achando o marido nela \"coisa indecente\", recebe carta de repúdio e é despedida de casa (Dt 24:1). Se casar com outro e este também a repudiar ou morrer, o primeiro marido não pode tomá-la de novo, lei que refreava o divórcio impulsivo e protegia a mulher de ser tratada como objeto (Dt 24:2-4). Jesus a explicaria como concessão \"pela dureza do vosso coração\", não como o propósito original de Deus (Mt 19:8).",
    },
  },
  25: {
    anciao: {
      title: "Os anciãos à porta, no caso do levirato",
      subtitle: "Deuteronômio 25 • a viúva que sobe e reclama",
      text: "São os anciãos diante de quem a viúva sem filho denuncia o cunhado: \"Meu cunhado recusa suscitar a seu irmão nome em Israel\" (Dt 25:7). Eles o chamam e falam com ele; se persistir na recusa, presenciam o ato de vergonha em que a cunhada lhe descalça o sapato e lhe cospe no rosto (Dt 25:8-9). Guardiões da porta da cidade, existem para que o nome de um morto e o futuro de uma viúva não se percam por egoísmo (Rt 4:1-2).",
    },
    homem: {
      title: "O cunhado que recusa o dever",
      subtitle: "Deuteronômio 25 • a casa do descalçado",
      text: "É o irmão do falecido que se nega a tomar a cunhada e levantar descendência ao morto, dizendo diante dos anciãos: \"Não quero tomá-la\" (Dt 25:8). Publicamente descalçado e cuspido, ouve o protesto: \"Assim se fará ao homem que não edificar a casa de seu irmão\", e sua família passa a ser chamada em Israel \"A casa do descalçado\" (Dt 25:9-10). Seu contraste é Boaz, que assumiu o resgate que outro recusou, entrando na linhagem do Messias (Rt 4:6-10).",
    },
    mulherComum: {
      title: "A viúva sem filho",
      subtitle: "Deuteronômio 25 • para que o nome não se apague",
      text: "É a mulher cujo marido morreu sem lhe deixar filho, e que por isso não deve casar-se \"com homem estranho, de fora\", mas receber o cunhado, pois \"o primogênito que ela lhe der será sucessor do nome do seu irmão falecido\" (Dt 25:5-6). Se lhe negarem esse direito, ela mesma sobe à porta dos anciãos e reclama em voz alta (Dt 25:7). Nela a lei protege ao mesmo tempo o sustento da desamparada e a continuidade do nome em Israel, de onde viria a semente prometida.",
    },
    servo: {
      title: "Os que executam os açoites diante do juiz",
      subtitle: "Deuteronômio 25 • quarenta, e não mais",
      text: "São os oficiais do juízo que fazem deitar o condenado e o açoitam na presença do juiz, \"segundo a sua culpa\" (Dt 25:2). O limite é sagrado: \"Quarenta açoites lhe fará dar, não mais\", para que o castigado não fique envilecido aos olhos dos irmãos (Dt 25:3). Servos da justiça, eles encarnam a medida divina que pune sem destruir a dignidade do culpado, que continua sendo chamado \"teu irmão\".",
    },
  },
  26: {
    homem: {
      title: "O israelita do cesto das primícias",
      subtitle: "Deuteronômio 26 • a confissão diante do altar",
      text: "É o lavrador de Israel que toma as primícias de todos os frutos do solo, as põe num cesto e as leva ao lugar que o Senhor escolher, dizendo ao sacerdote: \"Hoje declaro perante o Senhor teu Deus que entrei na terra que o Senhor jurou a nossos pais dar-nos\" (Dt 26:2-3). Diante do altar recita a história da servidão e do livramento e se inclina em adoração (Dt 26:5-10). Nele a colheita vira credo: cada fruto lembra que a terra é dádiva, não conquista.",
    },
    mulherComum: {
      title: "A viúva do dízimo do terceiro ano",
      subtitle: "Deuteronômio 26 • que comam dentro das tuas portas",
      text: "É a viúva de Israel a quem, no ano dos dízimos, se destina parte da colheita junto com o levita, o estrangeiro e o órfão, \"para que comam dentro das tuas portas, e se fartem\" (Dt 26:12). O israelita declara depois perante o Senhor que nada reteve das coisas consagradas nem transgrediu o mandamento (Dt 26:13-14). A fidelidade cultual de Israel se comprova no prato de quem não tem quem a sustente — e só então se pede a bênção do céu (Dt 26:15).",
    },
    servo: {
      title: "O levita que se alegra com a casa",
      subtitle: "Deuteronômio 26 • o servo sem herança à mesa",
      text: "É o levita que participa da alegria do israelita por todo o bem que o Senhor lhe deu, junto com \"o estrangeiro que está no meio de ti\" (Dt 26:11). No terceiro ano, o dízimo separado é dado primeiro a ele, porque não tem parte nem herança na terra (Dt 26:12-13). Servo do santuário sustentado pela obediência do povo, ele é sinal vivo de que a gratidão pelas primícias se traduz em partilha concreta.",
    },
    patriarca: {
      title: "O arameu prestes a perecer",
      subtitle: "Deuteronômio 26 • o pai peregrino confessado",
      text: "É o patriarca invocado na confissão das primícias: \"Arameu, prestes a perecer, foi meu pai, e desceu ao Egito\" (Dt 26:5) — Jacó, o peregrino errante que desceu com pouca gente e ali se tornou grande nação. Ao trazer o cesto dos primeiros frutos, cada israelita recita essa história de aflição no Egito e de livramento com mão forte (Dt 26:6-9). O patriarca frágil torna-se memorial da fidelidade de Deus, que fez do pequeno um povo.",
    },
    multidao: {
      title: "Israel trazendo as primícias",
      subtitle: "Deuteronômio 26 • a aliança confirmada hoje",
      text: "É Israel que, entrando na terra, traz num cesto as primícias do solo e as põe diante do altar, confessando com gratidão a redenção do Egito (Dt 26:1-4,10). O povo separa também o dízimo do terceiro ano para o levita, o estrangeiro, o órfão e a viúva (Dt 26:12-13). Naquele dia declaram o Senhor por seu Deus, e ele os declara \"seu próprio povo\", exaltado para louvor, fama e glória (Dt 26:17-19).",
    },
  },
  27: {
    anciao: {
      title: "Os anciãos que ordenam com Moisés",
      subtitle: "Deuteronômio 27 • as pedras caiadas no Ebal",
      text: "São os anciãos de Israel que, junto com Moisés, dão ordem ao povo: \"Guardai todos estes mandamentos que hoje vos ordeno\" (Dt 27:1). Sob sua autoridade, Israel deve levantar no monte Ebal pedras grandes e caiadas e escrever nelas todas as palavras desta lei, \"exprimindo-as nitidamente\", e edificar um altar de pedras brutas (Dt 27:4-8). Associados ao legislador que está para morrer, garantem que a aliança não dependa de um só homem, mas continue nas mãos dos que ficam.",
    },
    multidao: {
      title: "Israel entre Gerizim e Ebal",
      subtitle: "Deuteronômio 27 • as pedras da Lei",
      text: "É Israel que, ao passar o Jordão, deve levantar pedras caiadas no monte Ebal e sobre elas escrever \"todas as palavras desta lei\", erguendo ali um altar de pedras brutas (Dt 27:2-8). Seis tribos ficam sobre o Gerizim para abençoar e seis sobre o Ebal para amaldiçoar (Dt 27:12-13). Naquele dia Moisés declara: \"Hoje vieste a ser povo do Senhor teu Deus\" (Dt 27:9).",
    },
    servo: {
      title: "Os levitas que proclamam as maldições",
      subtitle: "Deuteronômio 27 • a voz da Lei ao povo",
      text: "São os levitas que, em alta voz, testificam a todo o Israel, pronunciando cada uma das maldições da aliança para que o povo responda (Dt 27:14). Servos do santuário sem herança na terra, aqui são a voz pública da Lei, declarando maldito quem faz imagem oculta, quem despreza os pais, quem move os limites, quem desvia o cego (Dt 27:15-18). Sua proclamação torna toda a nação responsável diante de Deus.",
    },
    homem: {
      title: "O homem de Israel que responde amém",
      subtitle: "Deuteronômio 27 • o povo sob a aliança",
      text: "É o israelita que, ouvindo cada maldição proclamada pelos levitas, responde \"Amém\", assumindo pessoalmente as cláusulas da aliança (Dt 27:15-16). Ao dizer amém, concorda com a justiça de Deus e reconhece que sobre si recai a maldição se transgredir a Lei, em oculto ou à vista (Dt 27:24-26). É o homem que se coloca sob o juízo divino — a mesma maldição da Lei que Cristo tomaria sobre si (Gl 3:10,13).",
    },
    mulherComum: {
      title: "A mulher de Israel que responde amém",
      subtitle: "Deuteronômio 27 • toda a congregação concorda",
      text: "É a mulher do povo que, junto com \"todo o Israel\", ecoa o \"Amém\" a cada maldição pronunciada nos montes (Dt 27:15-26). Sua voz mostra que a aliança não abarca apenas os homens ou os líderes, mas toda a congregação — homens e mulheres igualmente sujeitos aos estatutos do Senhor. Ela representa a nação inteira selando, de coração, a justiça da Lei.",
    },
  },
  28: {
    homem: {
      title: "O homem mimoso e delicado no cerco",
      subtitle: "Deuteronômio 28 • a fome que desfaz o afeto",
      text: "É o israelita descrito na maldição do cerco: \"Quanto ao homem mais mimoso e delicado no meio de ti, o seu olho será maligno para com o seu irmão, e para com a mulher do seu regaço\" (Dt 28:54). A fome do assédio inimigo o levaria a não repartir nem com os seus a comida mais horrenda (Dt 28:53,55). Sua figura mostra que a maldição da aliança não destrói só cidades: corrói de dentro os laços mais ternos do coração humano.",
    },
    mulherComum: {
      title: "A mulher mimosa e delicada no cerco",
      subtitle: "Deuteronômio 28 • quando falta tudo nas portas",
      text: "É a \"mulher mais mimosa e delicada no meio de ti, que de mimo e delicadeza nunca tentou pôr a planta de seu pé sobre a terra\", e que no cerco terá olho maligno contra o marido e os próprios filhos (Dt 28:56-57). Junto com ela estão as mães a quem \"filhos e filhas gerarás; porém não serão para ti; porque irão em cativeiro\" (Dt 28:41). Sua ruína é a medida mais dolorosa de quanto custa abandonar a aliança do Senhor.",
    },
    rei: {
      title: "O rei levado ao exílio com o povo",
      subtitle: "Deuteronômio 28 • a nação que não conheceste",
      text: "É o monarca que Israel um dia poria sobre si e que, na desobediência, seria arrastado no mesmo juízo: \"O Senhor te levará a ti e a teu rei, que tiveres posto sobre ti, a uma nação que não conheceste\" (Dt 28:36). Ali servirão a outros deuses, ao pau e à pedra, tornando-se \"por pasmo, por ditado, e por fábula\" entre os povos (Dt 28:36-37). Séculos antes de haver rei em Israel, a palavra anuncia que nem o trono livra da maldição da aliança quebrada.",
    },
    servo: {
      title: "Israel vendido como escravos e escravas",
      subtitle: "Deuteronômio 28 • o caminho de volta ao Egito",
      text: "São os israelitas que, na maldição final, servirão aos inimigos \"com fome e com sede, e com nudez, e com falta de tudo\", com jugo de ferro sobre o pescoço (Dt 28:48). O ponto mais amargo é o retorno ao ponto de partida: o Senhor os fará voltar ao Egito em navios, \"e ali sereis vendidos como escravos e escravas aos vossos inimigos; mas não haverá quem vos compre\" (Dt 28:68). A desobediência desfaz o Êxodo — o povo resgatado volta à casa da servidão.",
    },
    multidao: {
      title: "Israel diante das bênçãos e maldições",
      subtitle: "Deuteronômio 28 • a vida e a morte na aliança",
      text: "É Israel a quem Moisés estende as bênçãos da obediência — na cidade e no campo, no ventre e na terra, sobre inimigos e colheitas (Dt 28:1-8) — e as terríveis maldições da desobediência, até o cerco, o exílio e a dispersão entre os povos (Dt 28:15,64). O povo ouve, em detalhe profético, o destino que sua fidelidade ou apostasia lhe trará. São a nação posta diante da mais solene escolha, cuja história confirmaria cada palavra.",
    },
  },
  29: {
    homem: {
      title: "O homem cujo coração se desvia",
      subtitle: "Deuteronômio 29 • a raiz que dá veneno e fel",
      text: "É aquele que, ouvindo as palavras da maldição, se abençoa no próprio coração dizendo: \"Terei paz, ainda que ande conforme o parecer do meu coração\" (Dt 29:19). A lei o descreve como \"raiz que dê veneno e fel\" no meio do povo, e contra ele fumegará a ira e o zelo do Senhor, que apagará o seu nome de debaixo do céu (Dt 29:18,20). Ele é o perigo interno da aliança: a apostasia secreta que se esconde sob a bênção pública (Hb 12:15).",
    },
    mulherComum: {
      title: "As mulheres na assembleia de Moabe",
      subtitle: "Deuteronômio 29 • todos hoje perante o Senhor",
      text: "São as mulheres de Israel expressamente nomeadas entre os que \"estais hoje perante o Senhor vosso Deus\", ao lado dos meninos e do estrangeiro do arraial (Dt 29:10-11). Entram na aliança e no juramento como todo o povo, e a advertência as inclui: que não haja \"homem, nem mulher, nem família, nem tribo, cujo coração hoje se desvie do Senhor nosso Deus\" (Dt 29:18). A aliança de Moabe não é pacto de chefes, mas de cada alma da congregação.",
    },
    rei: {
      title: "Siom e Ogue, relembrados na aliança",
      subtitle: "Deuteronômio 29 • os reis que saíram ao encontro",
      text: "São \"Siom, rei de Hesbom, e Ogue, rei de Basã\", que saíram à peleja quando Israel chegou a este lugar e foram feridos, e cuja terra foi dada por herança a rubenitas, gaditas e à meia tribo de Manassés (Dt 29:7-8). Moisés os invoca dentro da lista de provas visíveis da fidelidade de Deus, ao lado dos sinais do Egito e dos quarenta anos no deserto (Dt 29:2-6). São a memória concreta que dá peso ao juramento feito naquele dia.",
    },
    servo: {
      title: "O rachador de lenha e o tirador de água",
      subtitle: "Deuteronômio 29 • os menores dentro da aliança",
      text: "São os serviçais mais humildes do arraial, incluídos nominalmente na lista dos que entram na aliança: \"desde o rachador da vossa lenha até ao tirador da vossa água\" (Dt 29:11). Ao lado de capitães, anciãos e oficiais, eles provam que o pacto do Senhor não se firma por posição social (Dt 29:10). E a aliança alcança ainda \"aquele que hoje não está aqui conosco\" — as gerações que ainda nasceriam (Dt 29:15).",
    },
    multidao: {
      title: "Israel entrando na aliança de Moabe",
      subtitle: "Deuteronômio 29 • todos hoje perante o Senhor",
      text: "É toda a congregação — capitães, anciãos, oficiais, homens, mulheres, meninos, o estrangeiro e até o rachador de lenha — reunida para entrar na aliança e no juramento do Senhor (Dt 29:10-12). O povo é lembrado de que viu os sinais do Egito e o sustento de quarenta anos, mas ainda não recebeu \"coração para entender\" (Dt 29:2-4). A aliança alcança também \"aquele que hoje não está aqui\" — as gerações futuras (Dt 29:15).",
    },
  },
  30: {
    homem: {
      title: "O israelita disperso que se converte",
      subtitle: "Deuteronômio 30 • a palavra na tua boca e no teu coração",
      text: "É o homem de Israel visto pela profecia já no exílio, entre as nações para onde foi lançado, que ali se recorda da bênção e da maldição e se converte ao Senhor com todo o coração (Dt 30:1-2). A ele o Senhor promete ajuntá-lo ainda que esteja \"na extremidade do céu\" e circuncidar-lhe o coração para que ame e viva (Dt 30:4-6). A ordem não lhe é impossível nem distante: \"esta palavra está mui perto de ti, na tua boca, e no teu coração\" (Dt 30:14; Rm 10:8).",
    },
    multidao: {
      title: "Israel diante da escolha da vida",
      subtitle: "Deuteronômio 30 • escolhe a vida",
      text: "É Israel a quem Moisés promete restauração após o exílio: o Senhor os ajuntará das nações e \"circuncidará o teu coração\" para amá-lo e viver (Dt 30:3-6). O povo ouve que a palavra não está longe, mas \"mui perto de ti, na tua boca, e no teu coração\" (Dt 30:14). Diante da vida e da morte, da bênção e da maldição, a congregação é chamada a decidir: \"escolhe pois a vida, para que vivas, tu e a tua descendência\" (Dt 30:19).",
    },
    mulher: {
      title: "A mulher de Israel diante da escolha",
      subtitle: "Deuteronômio 30 • a vida para a descendência",
      text: "É uma mulher da congregação diante da grande escolha proposta a Israel, cuja decisão de amar ao Senhor alcança também os filhos que dela nascerão: \"escolhe pois a vida, para que vivas, tu e a tua descendência\" (Dt 30:19). A promessa de que o Senhor circuncidaria o coração \"e o coração de tua descendência\" faz dela portadora da aliança para a geração seguinte (Dt 30:6). Nela se vê que a fidelidade de uma vida molda o futuro de um povo.",
    },
  },
  31: {
    anciao: {
      title: "Os anciãos que recebem o livro da Lei",
      subtitle: "Deuteronômio 31 • convocados a ouvir o cântico",
      text: "São \"todos os anciãos de Israel\" a quem Moisés entrega a lei que escreveu, junto com os sacerdotes filhos de Levi que levavam a arca da aliança (Dt 31:9). No fim, Moisés os convoca de novo: \"Ajuntai perante mim todos os anciãos das vossas tribos, e vossos oficiais\", para lhes falar o cântico e tomar contra eles o céu e a terra por testemunhas (Dt 31:28). Nas suas mãos fica a Palavra quando o mediador morrer — e sobre eles pesa a advertência da corrupção vindoura (Dt 31:29).",
    },
    homem: {
      title: "Josué, filho de Num",
      subtitle: "Deuteronômio 31 • esforça-te e anima-te",
      text: "É Josué, chamado por Moisés aos olhos de todo o Israel e exortado: \"Esforça-te e anima-te; porque com este povo entrarás na terra que o Senhor jurou a teus pais lhes dar\" (Dt 31:7). Levado à tenda da congregação, recebe ordem do próprio Senhor, que aparece na coluna de nuvem sobre a porta da tenda (Dt 31:14-15,23). O sucessor não se autoinveste: é comissionado por Deus, com a promessa \"eu serei contigo\".",
    },
    mulherComum: {
      title: "As mulheres na leitura setenal da Lei",
      subtitle: "Deuteronômio 31 • para que ouçam e aprendam",
      text: "São as mulheres de Israel expressamente convocadas na ordenança da leitura pública: \"Ajunta o povo, os homens e as mulheres, os meninos e os estrangeiros que estão dentro das tuas portas, para que ouçam e aprendam e temam ao Senhor vosso Deus\" (Dt 31:12). A cada sete anos, na festa dos tabernáculos, a Lei inteira é lida aos seus ouvidos (Dt 31:10-11). Sua inclusão mostra que o ensino da Palavra em Israel nunca foi privilégio de uma classe: toda alma deve ouvir e aprender.",
    },
    rei: {
      title: "Siom e Ogue, o penhor das vitórias",
      subtitle: "Deuteronômio 31 • assim fará o Senhor às nações",
      text: "São Siom e Ogue, os dois \"reis dos amorreus\" cuja destruição Moisés invoca na sua última exortação: \"E o Senhor lhes fará como fez a Siom e a Ogue, reis dos amorreus, e à sua terra, os quais destruiu\" (Dt 31:4). A memória desses dois reis vencidos é a base do encorajamento dado a Israel e a Josué: \"Esforçai-vos, e animai-vos; não temais, nem vos espanteis diante deles\" (Dt 31:6). O passado da fidelidade divina é o argumento para a coragem no futuro.",
    },
    servo: {
      title: "Os levitas que levavam a arca",
      subtitle: "Deuteronômio 31 • o livro posto ao lado da aliança",
      text: "São os sacerdotes levitas, portadores da arca da aliança do Senhor, a quem Moisés entrega a lei escrita (Dt 31:9). A eles ordena: \"Tomai este livro da lei, e ponde-o ao lado da arca da aliança do Senhor vosso Deus, para que ali esteja por testemunha contra ti\" (Dt 31:26). Servos do santuário, tornam-se guardiões do documento que julgará o povo, porque Moisés conhece sua rebelião e dura cerviz (Dt 31:27).",
    },
    multidao: {
      title: "Israel na despedida de Moisés",
      subtitle: "Deuteronômio 31 • a Lei escrita e o cântico",
      text: "É todo o Israel a quem Moisés, com cento e vinte anos, anuncia que não passará o Jordão, mas Josué os conduzirá, pois \"o Senhor teu Deus é o que vai contigo; não te deixará\" (Dt 31:2-3,6). O povo — homens, mulheres, meninos e estrangeiros — deve reunir-se a cada sete anos para ouvir a leitura da Lei e temer ao Senhor (Dt 31:11-13). Recebem também o cântico que servirá de testemunha contra eles quando se corromperem (Dt 31:19,21).",
    },
  },
  32: {
    anciao: {
      title: "Os anciãos que guardam a memória",
      subtitle: "Deuteronômio 32 • pergunta a teu pai, e ele te informará",
      text: "São os velhos de Israel a quem o cântico manda recorrer: \"Lembra-te dos dias da antiguidade, atenta para os anos de muitas gerações: pergunta a teu pai, e ele te informará; aos teus anciãos, e eles te dirão\" (Dt 32:7). Eles guardam a história de como o Senhor achou Jacó \"numa terra deserta\" e o cercou e guardou \"como a menina do seu olho\" (Dt 32:10). Sua palavra é o antídoto contra o esquecimento da Rocha que gerou o povo (Dt 32:18).",
    },
    homem: {
      title: "O homem encanecido sob o juízo",
      subtitle: "Deuteronômio 32 • por fora a espada, por dentro o pavor",
      text: "É o ancião de Israel nomeado no cântico entre as vítimas da apostasia: \"Por fora devastará a espada, e por dentro o pavor; ao jovem, juntamente com a virgem, assim à criança de peito como ao homem encanecido\" (Dt 32:25). Nenhuma idade escapa quando o Senhor esconde o rosto de uma \"geração perversa, filhos em quem não há lealdade\" (Dt 32:20). Ainda assim, o mesmo cântico promete que o Senhor fará justiça ao seu povo e se compadecerá dos seus servos (Dt 32:36).",
    },
    mulherComum: {
      title: "A virgem de Israel no cântico",
      subtitle: "Deuteronômio 32 • as filhas que provocaram e sofreram",
      text: "É a jovem de Israel citada ao lado do jovem sob a espada do juízo anunciado por Moisés (Dt 32:25). Ela pertence às \"filhas\" cuja provocação o Senhor viu e por causa das quais se irou contra seus filhos e filhas (Dt 32:19). Seu lugar no cântico revela que a apostasia nacional atinge as gerações mais novas — e que a esperança final não está na inocência do povo, mas naquele que \"terá misericórdia da sua terra e do seu povo\" (Dt 32:43).",
    },
    multidao: {
      title: "Israel ouvindo o Cântico de Moisés",
      subtitle: "Deuteronômio 32 • a testemunha em forma de canto",
      text: "É Israel a quem Moisés recita seu grande cântico, tomando os céus e a terra por testemunhas contra o povo (Dt 32:1). Nele Israel é retratado como a herança do Senhor e a Rocha que o gerou, mas que ele, na fartura, esqueceu e provocou com ídolos (Dt 32:15,18). É a nação diante de um canto profético que fixaria na memória, de geração em geração, a justiça de Deus, o juízo da apostasia e a promessa de que ele, ao fim, faria expiação pela sua terra e pelo seu povo (Dt 32:43).",
    },
  },
  33: {
    multidao: {
      title: "Israel recebendo a bênção de Moisés",
      subtitle: "Deuteronômio 33 • as doze tribos abençoadas",
      text: "É Israel, tribo por tribo, recebendo a bênção final de Moisés, \"homem de Deus\", antes de sua morte (Dt 33:1). Sobre a congregação de Jacó paira a memória do Senhor que veio de Sinai com dez milhares de santos e lhes deu a lei por herança (Dt 33:2,4). O povo é declarado bem-aventurado: \"Quem é como tu? Um povo salvo pelo Senhor\" (Dt 33:29).",
    },
  },
  34: {
    homem: {
      title: "O homem de Israel em luto",
      subtitle: "Deuteronômio 34 • chorando o mediador",
      text: "É um israelita entre os que prantearam Moisés trinta dias nas campinas de Moabe (Dt 34:8). Ele chora o profeta a quem o Senhor conhecera face a face, o servo que o tirou do Egito e o guiou pelo deserto por quarenta anos, e cujo sepulcro ninguém soube até hoje (Dt 34:6,10-11). Sua dor marca o fim de uma era e o limiar de outra, quando Josué assumiria a travessia do Jordão.",
    },
    mulherComum: {
      title: "A mulher de Israel em luto",
      subtitle: "Deuteronômio 34 • o pranto nas campinas",
      text: "É uma mulher do povo entre os que prantearam Moisés durante os trinta dias de luto em Moabe (Dt 34:8). Junto de toda a congregação, lamenta o legislador cujos olhos \"nunca se escureceram, nem perdeu o seu vigor\" mesmo aos cento e vinte anos (Dt 34:7). Ela representa as famílias de Israel despedindo-se do homem que as conduziu do cativeiro ao próprio limiar da promessa.",
    },
    servo: {
      title: "Os servos de Israel em luto",
      subtitle: "Deuteronômio 34 • os que serviam sob Moisés",
      text: "São os que serviam na congregação — os levitas e servos — em luto com todo o Israel pela morte de Moisés, chamado ele mesmo \"servo do Senhor\" (Dt 34:5). Prantearam trinta dias aquele sob cujas mãos Josué fora cheio do espírito de sabedoria, agora obedecido pelo povo como o Senhor ordenara (Dt 34:8-9). Servos que choram o maior dos servos, cujo lugar de sepultura permaneceu secreto (Dt 34:6).",
    },
    multidao: {
      title: "Israel que pranteia Moisés",
      subtitle: "Deuteronômio 34 • o luto de trinta dias",
      text: "É todo o Israel que, nas campinas de Moabe, pranteia Moisés por trinta dias, até cumprirem-se os dias do luto (Dt 34:8). O povo, agora sob a liderança de Josué, cheio do espírito de sabedoria pela imposição das mãos de Moisés, chora aquele de quem se disse: \"nunca mais se levantou em Israel profeta algum como Moisés, a quem o Senhor conhecera face a face\" (Dt 34:9-10). São a nação órfã do seu mediador, à beira da terra prometida.",
    },
  },
};
