// Fichas ESPECÍFICAS por (capítulo → papel) de 1 SAMUEL 27–31.
// O fim das duas histórias que o livro vinha contando lado a lado: Davi se
// exila em Gate e vive um ano e quatro meses de duplo jogo (27), Saul, sem
// resposta do céu, procura de noite a mulher de En-Dor (28), os príncipes
// filisteus expulsam Davi da batalha e sem o saber o poupam (29), Ziclague é
// queimada e recobrada, e nasce o estatuto do despojo (30), e Gilboa fecha o
// livro em luto, com os valentes de Jabes-Gileade pagando a Saul a dívida do
// seu primeiro dia de rei (31). Cada figurante anônimo é alguém REAL daquele
// capítulo — nunca "homem da cena".
import type { StageInfo } from "@/lib/rpgStageInfo";

export const CHAPTER_ACTORS_27_31: Record<number, Record<string, StageInfo>> = {
  // ------------------------------------------------------------------ 1Sm 27
  27: {
    homem: {
      title: "Os seiscentos de Davi em Gate — e os moradores antigos da terra",
      subtitle: "1Sm 27 • a tropa que passou aos filisteus e as gentes feridas até Sur",
      text: "São, no princípio, \"os seiscentos homens que com ele estavam\" (1Sm 27:2): a tropa que atravessa a fronteira atrás de um chefe que decidiu sozinho — \"Disse, porém, Davi no seu coração\" (v. 1) —, sem éfode, sem Abiatar e sem uma linha de consulta ao Senhor. Do v. 8 em diante são os moradores antigos daquele sul, sobre os quais caem as investidas. O texto não elogia nada disso: diz secamente que Davi \"não dava vida nem a homem nem a mulher\" (v. 9) e que mentia a Aquis sobre o alvo dos ataques (v. 10) — é o exilado que perdeu de vista o Deus que o guardara em En-Gedi.",
    },
    mulherComum: {
      title: "Ainoã, a jizreelita, Abigail — e as mulheres mortas no sul",
      subtitle: "1Sm 27 • a casa de Davi em Ziclague e as que não podiam voltar vivas",
      text: "Duas delas têm nome: \"Ainoã, a jizreelita, e Abigail, a mulher de Nabal, o carmelita\" (1Sm 27:3), que descem com o marido à terra dos filisteus e montam casa em Ziclague, a cidade que Aquis lhe deu e que por isso \"pertence aos reis de Judá, até ao dia de hoje\" (v. 6). As outras são anônimas de propósito: as mulheres das povoações feridas, de quem o capítulo diz duas vezes que Davi \"não dava vida nem a homem nem a mulher\" (v. 9,11). A razão está escrita, e é fria: \"Para que porventura não nos denunciem\" — morriam para que o segredo vivesse.",
    },
    rebanho: {
      title: "As ovelhas, as vacas, os jumentos e os camelos do despojo do sul",
      subtitle: "1Sm 27:9 • o gado tomado nas investidas e levado a Gate",
      text: "\"E Davi feria aquela terra... e tomava ovelhas, e vacas, e jumentos, e camelos, e vestes; e voltava, e vinha a Aquis\" (1Sm 27:9). É o inventário do saque, e é a prova material que Davi apresenta ao rei de Gate para sustentar a versão de que atacara \"o sul de Judá\" (v. 10): gado que fala pelo dono que já não pode falar. Camelos aparecem aqui pela primeira vez no arco de Davi e voltarão no capítulo 30, montados pelos amalequitas que escapam (30:17) — o mesmo tipo de despojo mudando de mãos, e desta vez contra ele.",
    },
    servo: {
      title: "Os criados da corte de Aquis e o mensageiro que avisa Saul",
      subtitle: "1Sm 27 • a casa real de Gate e a notícia que chega a Israel",
      text: "São os homens da corte de Aquis, diante de quem Davi se apresenta e pede uma cidade do campo: \"por que razão habitaria o teu servo contigo na cidade real?\" (1Sm 27:5); e é do meio deles que sai, a cada volta das investidas, a pergunta do rei: \"Onde atacastes hoje?\" (v. 10). O outro é o portador da notícia que muda o capítulo em Israel: \"sendo Saul avisado que Davi tinha fugido para Gate, não cuidou mais de buscá-lo\" (v. 4). A palavra que costura tudo é \"servo\": Davi a usa de si mesmo diante do filisteu, e Aquis a devolve como sentença (v. 12).",
    },
  },

  // ------------------------------------------------------------------ 1Sm 28
  28: {
    homem: {
      title: "Os dois arraiais, os pranteadores de Samuel e os adivinhos desterrados",
      subtitle: "1Sm 28 • Suném e Gilboa, o luto de Ramá e os que Saul expulsou da terra",
      text: "São, primeiro, os soldados dos dois exércitos frente a frente: os filisteus em Suném e todo o Israel acampado \"em Gilboa\" (1Sm 28:4) — a vista desse arraial é o que faz o rei estremecer no coração (v. 5). São, depois, os homens de Ramá que sepultaram o profeta (v. 3): com ele foi enterrada a última boca por onde Deus falava a Saul. E são, por fim, \"os adivinhos e os encantadores\" que o próprio Saul \"tinha desterrado\", obedecendo à lei (Lv 19:31; Dt 18:10-11). A tragédia é que o rei que limpou a terra deles é o mesmo que sai de noite à procura de um que tenha escapado.",
    },
    mulherComum: {
      title: "As mulheres de Ramá no pranto pelo profeta",
      subtitle: "1Sm 28:3 • o luto de todo o Israel por Samuel, antes da noite de En-Dor",
      text: "\"E Samuel já estava morto, e todo o Israel o tinha chorado, e o tinha sepultado em Ramá, que era a sua cidade\" (1Sm 28:3). Elas são esse \"todo o Israel\" na cidade do profeta: as mulheres que carpiram o último juiz, o homem que ungiu dois reis e que rogava pelo povo (12:23). O narrador só lembra a morte de Samuel aqui porque ela explica o vazio de Saul: enquanto o povo chora em Ramá, o rei descobre que \"o Senhor não lhe respondeu, nem por sonhos, nem por Urim, nem por profetas\" (v. 6). O luto legítimo de Ramá é a moldura da noite ilegítima de En-Dor.",
    },
    servo: {
      title: "Os criados de Saul — e os dois homens que vão de noite a En-Dor",
      subtitle: "1Sm 28 • quem indica a feiticeira, quem acompanha o rei disfarçado",
      text: "São os criados a quem o rei, sem resposta do céu, dá a ordem mais desesperada do livro: \"Buscai-me uma mulher que tenha o espírito de feiticeira\" — e que respondem sabendo exatamente onde procurar: \"Eis que em En-Dor há uma mulher que tem o espírito de adivinhar\" (1Sm 28:7). Servos de um rei que desterrara os adivinhos e que ainda assim conheciam o endereço de uma sobrevivente. São eles \"os dois homens\" que atravessam a noite com Saul disfarçado (v. 8), e são eles que, no fim, junto com a mulher, o levantam do chão e o fazem comer (v. 23-25).",
    },
  },

  // ------------------------------------------------------------------ 1Sm 29
  29: {
    rei: {
      title: "Os príncipes dos filisteus em Afeque",
      subtitle: "1Sm 29 • os senhores das cidades que recusam Davi na batalha",
      text: "São \"os príncipes dos filisteus\", que se foram para a revista das tropas em Afeque \"com centenas e com milhares\" (1Sm 29:2) — os senhorios das cinco cidades, a mesma corte que já decidira a sorte da arca. Veem os hebreus na retaguarda e explodem: \"Que fazem aqui estes hebreus?\" (v. 3); e exigem que Aquis o faça voltar, \"para que não se torne nosso adversário na batalha\" (v. 4). E acusam-no pelo canto das danças que um dia foi a sua glória (v. 5). Sem o saberem, esses pagãos desconfiados são o instrumento pelo qual Deus impede que o seu ungido peleje contra o próprio povo.",
    },
    homem: {
      title: "Os israelitas junto à fonte de Jizreel e os homens de Davi na retaguarda",
      subtitle: "1Sm 29 • os dois exércitos, e os seiscentos hebreus fora de lugar",
      text: "De um lado estão os homens de Israel: \"acamparam-se os israelitas junto à fonte que está em Jizreel\" (1Sm 29:1), esperando a batalha que Samuel já sentenciara em En-Dor. Do outro estão os homens de Davi, que marcham na coluna errada: \"Davi e os seus homens iam com Aquis na retaguarda\" (v. 2), hebreus alistados contra hebreus. Entre os que passam em revista, é diante dos capitães filisteus que Aquis defende o seu vassalo (v. 3). O capítulo é o retrato de um homem preso entre dois campos por escolha sua (27:1) — e Deus o tira de lá pela voz dos príncipes.",
    },
    multidao: {
      title: "O exército filisteu reunido em Afeque",
      subtitle: "1Sm 29:1-2 • a hoste que passa em revista com centenas e com milhares",
      text: "\"E ajuntaram os filisteus todos os seus exércitos em Afeque\" (1Sm 29:1) — toda a força das cinco cidades reunida num só campo, desfilando \"com centenas e com milhares\" (v. 2) diante dos seus príncipes. Afeque não é um lugar qualquer: foi ali que Israel se acampou no dia em que perdeu trinta mil homens e a arca de Deus (4:1-11). Esta massa é o pano de fundo de tudo: é por causa dela que Saul estremeceu em Gilboa (28:5), e é dentro dela que Davi está andando, na retaguarda, quando Deus o manda embora (v. 11).",
    },
  },

  // ------------------------------------------------------------------ 1Sm 30
  30: {
    homem: {
      title: "Os seiscentos que acharam Ziclague queimada",
      subtitle: "1Sm 30 • os que choraram, os que falaram em apedrejar, os que negariam o despojo",
      text: "São \"os seiscentos homens que com ele se achavam\" (1Sm 30:9): chegam ao terceiro dia e acham a cidade queimada, com mulheres e filhos levados cativos (v. 3). O que fazem primeiro é chorar \"até que neles não houve mais forças para chorar\" (v. 4), e depois viram-se contra o chefe: \"o povo falava de apedrejá-lo\" (v. 6). Quatrocentos atravessam o Besor e ferem os amalequitas; mas na volta são também eles que mostram o pior, querendo negar o despojo aos que ficaram (v. 22). E ouvem a lição do capítulo: \"Não fareis assim, irmãos meus, com o que nos deu o Senhor\" (v. 23).",
    },
    servo: {
      title: "Os meninos cativos, os duzentos de Besor e os mensageiros do despojo",
      subtitle: "1Sm 30 • quem foi levado, quem ficou com a bagagem, quem levou a bênção a Judá",
      text: "São, primeiro, os pequenos de Ziclague: \"tinham levado cativas as mulheres, e todos os que estavam nela, tanto pequenos como grandes; a ninguém, porém, mataram\" (1Sm 30:2) — e no fim \"ninguém lhes faltou, desde o menor até ao maior\" (v. 19). São, depois, os duzentos que não puderam passar o ribeiro de cansados (v. 10), e é por causa deles que Davi põe em Israel o estatuto que ninguém esperava (v. 24-25). E são, por fim, os que levam o despojo às cidades de Judá com o recado: \"Eis aí para vós uma bênção do despojo dos inimigos do Senhor\" (v. 26).",
    },
    cavaleiro: {
      title: "Os quatrocentos moços amalequitas que fugiram sobre camelos",
      subtitle: "1Sm 30:17 • os únicos sobreviventes do arraial do despojo",
      text: "\"nenhum deles escapou, senão só quatrocentos moços que, montados sobre camelos, fugiram\" (1Sm 30:17). São o resto de Amaleque — a nação que atacou Israel na retaguarda na saída do Egito (Êx 17:8-16) e que Saul deveria ter destruído por inteiro e não destruiu (15:9). Fogem sobre os mesmos camelos que carregavam o despojo do sul, e a sua fuga é a prova de que a desobediência de um rei deixa dívidas que atravessam gerações: um amalequita ainda aparecerá com a coroa de Saul nas mãos (2Sm 1:8-10), e Hamã, o agagita, ainda tentará destruir os judeus (Et 3:6).",
    },
    mulherComum: {
      title: "As mulheres e as filhas levadas cativas de Ziclague",
      subtitle: "1Sm 30 • Ainoã, Abigail e as famílias dos seiscentos, tomadas e recobradas",
      text: "São as mulheres da cidade queimada, levadas vivas pela tropa amalequita: \"a ninguém, porém, mataram\" (1Sm 30:2) — e entre elas as duas mulheres de Davi, Ainoã e Abigail (v. 5). A amargura dos maridos é dita como poucas vezes na Escritura: choraram \"até que neles não houve mais forças para chorar\" (v. 4). O desfecho é o inventário da graça: \"ninguém lhes faltou, desde o menor até ao maior\" (v. 19). Que os captores não tenham matado ninguém é a mão silenciosa de Deus guardando as famílias que Davi, dois capítulos antes, não guardara nas cidades do sul (27:11).",
    },
    multidao: {
      title: "A tropa amalequita espalhada em festa pelo grande despojo",
      subtitle: "1Sm 30:16 • o arraial que comia, bebia e dançava sobre a face de toda a terra",
      text: "\"eis que estavam espalhados sobre a face de toda a terra, comendo, e bebendo, e dançando, por todo aquele grande despojo\" (1Sm 30:16). É um bando sem sentinelas, seguro demais para vigiar, celebrando o saque de Ziclague e do sul. A mesma gente que deixara um escravo egípcio doente para morrer no campo (v. 13) — e foi esse abandonado, alimentado com pão, água, figos e passas pelos homens de Davi, que os entregou. A festa termina no crepúsculo (v. 17). É o retrato do juízo que cai sobre quem come e bebe julgando o dia seguro (cf. Lc 12:19-20).",
    },
    rebanho: {
      title: "As ovelhas e as vacas tocadas adiante do gado",
      subtitle: "1Sm 30:20 • o despojo que volta gritando o nome de quem o recobrou",
      text: "\"Também tomou Davi todas as ovelhas e vacas, e levavam-nas adiante do outro gado, e diziam: Este é o despojo de Davi\" (1Sm 30:20). O gado abre a coluna de volta como um estandarte vivo, e o grito que o acompanha é o primeiro reconhecimento público de Davi como chefe que dá — e não apenas que toma. É o inverso exato do capítulo 27, quando o gado era levado a Gate para sustentar uma mentira (27:9-10); aqui o rebanho volta para casa e vira bênção repartida com os anciãos de Judá (v. 26), porque tudo aquilo é \"o que nos deu o Senhor\" (v. 23).",
    },
    anciao: {
      title: "Os anciãos de Judá que receberam a bênção do despojo",
      subtitle: "1Sm 30:26-31 • de Betel e Estemoa aos queneus, a Hormá, Corasã e Hebrom",
      text: "São \"os anciãos de Judá, seus amigos\", a quem Davi envia do despojo dizendo: \"Eis aí para vós uma bênção do despojo dos inimigos do Senhor\" (1Sm 30:26). A lista é longa e concreta (v. 27-31) e cobre justamente \"todos os lugares em que andara Davi\" nos anos de fuga — as gentes que o esconderam quando ele era um proscrito. Note-se quem entra: os queneus, o povo de Jetro (1Sm 15:6), e os jerameelitas que Davi mencionara a Aquis para encobrir os ataques (27:10) — agora recebem verdade em lugar de mentira. Poucos versículos depois, é Judá que virá a Hebrom ungi-lo rei (2Sm 2:4).",
    },
  },

  // ------------------------------------------------------------------ 1Sm 31
  31: {
    homem: {
      title: "Os que caíram em Gilboa — Israel em fuga, os flecheiros e os filhos do rei",
      subtitle: "1Sm 31 • o exército desfeito, os despojadores filisteus e os valentes de Jabes",
      text: "Primeiro são os israelitas de Saul: \"os homens de Israel fugiram de diante dos filisteus, e caíram mortos na montanha de Gilboa\" (1Sm 31:1), e entre eles Jônatas, que dissera a Davi \"tu reinarás sobre Israel, e eu serei contigo o segundo\" (23:17). Depois são os flecheiros filisteus e os despojadores que acham os quatro corpos no monte (v. 8). São ainda os que \"abandonaram as cidades, e fugiram; e vieram os filisteus, e habitaram nelas\" (v. 7): o povo que pedira um rei para fazer as suas guerras perde no mesmo dia o rei e a terra. E são, por fim, os valentes de Jabes (v. 12).",
    },
    servo: {
      title: "O pajem de armas de Saul e os que levaram a notícia",
      subtitle: "1Sm 31 • quem morreu com o rei, quem anunciou a queda, quem a ouviu em Jabes",
      text: "O pajem de armas é o último homem de pé junto a Saul, e a ele o rei pede o golpe de misericórdia (1Sm 31:4). Ele recusa — \"porque temia muito\" —, e o temor que o impede de tocar no ungido do Senhor é o mesmo escrúpulo de Davi nas cavernas (24:6; 26:9); depois, vendo o rei morto, \"também ele se lançou sobre a sua espada, e morreu com ele\" (v. 5), e o epitáfio o inclui na conta (v. 6). Os outros são os que carregam a notícia: os filisteus que a anunciam \"no templo dos seus ídolos\" (v. 9), transformando a morte do rei de Israel em boletim de vitória dos seus deuses.",
    },
    anciao: {
      title: "O sacerdote do templo de Astarote e os anciãos de Jabes-Gileade",
      subtitle: "1Sm 31 • as armas do rei no templo da deusa, e o jejum de sete dias em Jabes",
      text: "Um deles guarda o troféu: \"puseram as suas armas no templo de Astarote, e o seu corpo o afixaram no muro de Bete-Sã\" (1Sm 31:10). Astarote é a deusa de que Samuel mandara o povo se apartar em Mizpá (7:3-4): as armas do primeiro rei terminam penduradas no santuário do pecado que o profeta condenara. Os outros são os anciãos de Jabes-Gileade, que recebem os ossos e \"os sepultaram debaixo de um arvoredo, em Jabes, e jejuaram sete dias\" (v. 13) — a cidade que Saul salvou no seu primeiro dia de rei (11:1-11) é a única honra que sobra ao rei rejeitado.",
    },
    mulherComum: {
      title: "As moradoras das cidades abandonadas e as mulheres de Jabes",
      subtitle: "1Sm 31 • quem fugiu do vale de Jizreel e quem chorou o rei em Gileade",
      text: "São as mulheres das cidades que se esvaziam depois de Gilboa: vendo a derrota, os que estavam \"deste lado do vale e deste lado do Jordão... abandonaram as cidades, e fugiram; e vieram os filisteus, e habitaram nelas\" (1Sm 31:7) — um êxodo dentro da própria herança. E são as mulheres de Jabes-Gileade, para onde os valentes trazem de noite os corpos tirados do muro (v. 12): elas fazem o luto que ninguém mais podia fazer (v. 13). Uma geração antes cantavam \"Saul feriu os seus milhares\" (18:7); agora Davi mandará ensinar o canto do arco (2Sm 1:24).",
    },
  },
};
