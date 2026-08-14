// Fichas ESPECÍFICAS por (capítulo → papel) de leviticus — quem é aquela figura
// (mesmo anônima na Bíblia) no contexto daquele capítulo, biblicamente e
// teologicamente. Vence a ficha genérica do papel. Preenchido pelo agente.
import type { StageInfo } from "@/lib/rpgStageInfo";
export const CHAPTER_ACTORS: Record<number, Record<string, StageInfo>> = {
  1: {
    homem: {
      title: "O ofertante do holocausto",
      subtitle: "Levítico 1 • a oferta que sobe inteira",
      text: "É o israelita que, de sua própria vontade, traz à porta da tenda um macho sem defeito do seu gado e ali se apresenta perante o Senhor (Lv 1:2-3). Ele mesmo põe a mão sobre a cabeça do animal — gesto de identificação e transferência — \"para que seja aceito a favor dele, para a sua expiação\", e ele mesmo o degola (Lv 1:4-5). O holocausto sobe todo em fogo: nada lhe fica de volta, porque quem se achega a Deus se entrega por inteiro, como Cristo se ofereceu a si mesmo sem mácula (Hb 9:14; Ef 5:2).",
    },
    rebanho: {
      title: "O novilho do holocausto",
      subtitle: "Levítico 1 • macho sem defeito",
      text: "É o bezerro tirado do gado vacum do ofertante, macho sem defeito, degolado perante o Senhor e partido nos seus pedaços sobre a lenha do altar (Lv 1:3,6). Onde não há gado, bastam ovelhas, cabras ou até duas rolas — mas nunca um animal manco ou doente, porque a Deus não se dá o que sobra. Consumido todo pelo fogo, é \"holocausto, oferta queimada, de cheiro suave ao Senhor\" (Lv 1:9): a vítima inocente tomando o lugar do culpado, sombra do Cordeiro sem mancha (1Pe 1:19).",
    },
    servo: {
      title: "Os filhos de Arão ao redor do altar",
      subtitle: "Levítico 1 • os sacerdotes do holocausto",
      text: "São os sacerdotes, filhos de Arão, no seu ofício: recebem o sangue e o espargem em redor sobre o altar, põem o fogo e ordenam a lenha, dispõem os pedaços e a cabeça e queimam tudo (Lv 1:5,7-9). O ofertante degola, mas não toca no sangue nem no altar — só o sacerdote consagrado leva a oferta à presença de Deus. Assim Israel aprende que ninguém se apresenta a Deus sem mediador, e que havia de vir o Sacerdote que é também a oferta (Hb 5:1; Hb 9:11-12).",
    },
  },
  2: {
    homem: {
      title: "O ofertante da oferta de alimentos",
      subtitle: "Levítico 2 • flor de farinha, azeite e incenso",
      text: "É o israelita que traz ao Senhor não sangue, mas o fruto do seu trabalho: flor de farinha com azeite e incenso, ou bolos ázimos cozidos no forno, na caçoula ou na frigideira (Lv 2:1,4-7). Nada de fermento nem de mel sobe ao altar, mas nenhuma oferta pode faltar \"o sal da aliança do teu Deus\" (Lv 2:13) — a corrupção fica de fora, a fidelidade tempera tudo. Aqui a vida diária, o pão de cada dia e a lavoura são postos diante de Deus em gratidão, culto racional de quem já foi expiado pelo sangue (Rm 12:1).",
    },
    servo: {
      title: "Os filhos de Arão que queimam o memorial",
      subtitle: "Levítico 2 • os sacerdotes da oferta de alimentos",
      text: "São os sacerdotes a quem a oferta é trazida: tomam dela um punhado com o azeite e todo o incenso e o queimam sobre o altar \"como memorial\", cheiro suave ao Senhor (Lv 2:2,9). O que sobeja é deles, \"coisa santíssima\", das ofertas queimadas ao Senhor (Lv 2:3,10). Deus recebe a parte do memorial e sustenta com o restante os que servem ao altar — princípio que o Novo Testamento repete para os que anunciam o evangelho (1Co 9:13-14).",
    },
  },
  3: {
    homem: {
      title: "O ofertante do sacrifício pacífico",
      subtitle: "Levítico 3 • a oferta da comunhão",
      text: "É o israelita que traz do gado ou do rebanho, macho ou fêmea sem defeito, põe a mão sobre a cabeça da sua oferta e a degola diante da porta da tenda (Lv 3:1-2). Diferente do holocausto, nem tudo sobe: a gordura é do Senhor, o sacerdote recebe a sua porção e o ofertante come a carne com os seus — é o sacrifício da mesa partilhada com Deus. Por isso se chama pacífico: celebra a paz já feita pelo sangue, prenúncio da comunhão que temos por Cristo, que é a nossa paz (Ef 2:13-14; Rm 5:1).",
    },
    rebanho: {
      title: "O animal do sacrifício pacífico",
      subtitle: "Levítico 3 • boi, cordeiro ou cabra sem defeito",
      text: "É a rês que o ofertante separa do seu gado — boi, cordeiro ou cabra, macho ou fêmea, mas sempre \"sem defeito diante do Senhor\" (Lv 3:1,6,12). Dela se tira a gordura que cobre a fressura, os rins e o redenho do fígado, queimados sobre o altar como \"alimento da oferta queimada\" (Lv 3:11,16). O estatuto é perpétuo: \"nenhuma gordura nem sangue algum comereis\" (Lv 3:17) — o melhor da oferta pertence a Deus, e a vida que está no sangue jamais é do homem.",
    },
  },
  4: {
    multidao: {
      title: "A congregação que peca por ignorância",
      subtitle: "Levítico 4 • a oferta pelo pecado",
      text: "É \"toda a congregação de Israel\" que, mesmo sem intenção, transgride algum mandamento do Senhor e se torna culpada (Lv 4:13). Quando o erro vem à luz, os anciãos põem as mãos sobre a cabeça do novilho e o sangue é levado diante do véu, para que o sacerdote faça propiciação e o pecado lhes seja perdoado (Lv 4:15,20). Aqui o povo aprende que o pecado desconhecido ainda contamina e precisa de expiação pelo sangue — sombra do sacrifício de Cristo, que remove até a culpa que não vemos (Hb 9:7).",
    },
    homem: {
      title: "A pessoa do povo da terra que pecou sem saber",
      subtitle: "Levítico 4 • o israelita comum e a sua expiação",
      text: "É \"qualquer pessoa do povo da terra\" — nem sacerdote, nem príncipe, um israelita comum — que fez o que não se devia fazer e só depois foi notificada do seu pecado (Lv 4:27-28). Traz então uma cabra ou uma cordeira sem defeito, põe a mão sobre a cabeça da oferta e a degola no lugar do holocausto, e o sacerdote faz expiação por ela \"e ser-lhe-á perdoado o pecado\" (Lv 4:31). A lei não deixa ninguém de fora nem por baixo: o mais simples do povo tem o mesmo caminho de perdão, o sangue de um substituto.",
    },
    rebanho: {
      title: "O novilho da expiação queimado fora do arraial",
      subtitle: "Levítico 4 • a vítima pelo sacerdote e pela congregação",
      text: "É o novilho sem defeito trazido pelo sacerdote ungido que pecou e, depois, pela congregação inteira (Lv 4:3,14). Seu sangue é o único que entra até diante do véu, espargido sete vezes e posto nas pontas do altar do incenso, enquanto a gordura sobe no altar (Lv 4:6-7,17-18). Mas o corpo — couro, carne e entranhas — é levado \"fora do arraial\" e ali queimado (Lv 4:12,21): por isso Jesus, para santificar o povo com o próprio sangue, padeceu fora da porta (Hb 13:11-12).",
    },
    anciao: {
      title: "Os anciãos da congregação",
      subtitle: "Levítico 4 • as mãos que representam Israel",
      text: "São os cabeças das casas paternas que respondem por todo o povo quando \"toda a congregação de Israel pecar por ignorância\" (Lv 4:13). Diante da tenda, eles põem as suas mãos sobre a cabeça do novilho perante o Senhor, e então o animal é degolado (Lv 4:15). O gesto é representativo: poucas mãos carregam a culpa de muitos sobre uma só vítima — a lógica da substituição que se cumpre em Cristo, sobre quem o Senhor fez cair a iniquidade de todos nós (Is 53:6).",
    },
    rei: {
      title: "O príncipe que pecou por ignorância",
      subtitle: "Levítico 4 • o chefe de tribo diante da lei",
      text: "É o \"príncipe\" — o cabeça de tribo ou de casa paterna, homem de autoridade em Israel — que transgrediu sem intenção algum mandamento do Senhor seu Deus e assim se fez culpado (Lv 4:22). Notificado do pecado, traz um bode macho sem defeito, põe a sua mão sobre a cabeça e o degola no lugar do holocausto (Lv 4:23-24). Sua oferta é maior que a do povo comum e menor que a do sacerdote ungido: quanto mais alto o posto, mais pesada a responsabilidade — mas nem o príncipe tem outro perdão senão o do sangue (Lv 4:26).",
    },
    servo: {
      title: "Os sacerdotes que levam o novilho fora do arraial",
      subtitle: "Levítico 4 • os filhos de Arão no rito da expiação",
      text: "São os sacerdotes filhos de Arão no ofício mais penoso deste capítulo: depois de queimada a gordura sobre o altar, levam o novilho todo — couro, carne, cabeça, pernas e entranhas — para fora do arraial, ao lugar limpo onde se lança a cinza, e ali o queimam sobre a lenha (Lv 4:11-12). O sangue entrou no santuário, mas o corpo foi expulso: o pecado é levado para longe do meio do povo. Nisso servem de figura viva do Cordeiro rejeitado fora dos muros da cidade (Hb 13:12-13).",
    },
  },
  5: {
    homem: {
      title: "O culpado que confessa o seu pecado",
      subtitle: "Levítico 5 • a expiação segundo as posses",
      text: "É a pessoa que se calou sendo testemunha, ou tocou coisa imunda, ou jurou temerariamente com os lábios, e só depois soube que era culpada (Lv 5:1-4). A lei manda que \"confessará aquilo em que pecou\" e traga a sua expiação (Lv 5:5). Se não puder um cordeiro, traga duas rolas; se nem isso, a décima parte de um efa de flor de farinha, sem azeite nem incenso, porque é oferta pelo pecado (Lv 5:7,11). A misericórdia de Deus desce até o mais pobre de Israel: ninguém fica sem caminho para o perdão (1Jo 1:9).",
    },
    rebanho: {
      title: "O carneiro da expiação da culpa",
      subtitle: "Levítico 5 • as coisas sagradas profanadas",
      text: "É o carneiro sem defeito tirado do rebanho, avaliado em siclos de prata segundo o siclo do santuário, trazido por quem pecou \"nas coisas sagradas do Senhor\" (Lv 5:15). Com ele vem a restituição do que se tomou, mais a quinta parte entregue ao sacerdote (Lv 5:16). Não basta lamentar: a culpa contra o que é santo se repara e se expia — e a mesma oferta vale para quem pecou sem saber, porque \"certamente se fez culpado diante do Senhor\" (Lv 5:19).",
    },
  },
  6: {
    homem: {
      title: "O que defraudou o seu próximo",
      subtitle: "Levítico 6 • a culpa contra o irmão",
      text: "É o israelita que negou ao próximo o depósito que lhe foi dado em guarda, ou reteve violentamente o que era dele, ou achou o perdido e jurou falso para ficar com ele (Lv 6:2-3). E ao lado dele está o irmão lesado, que espera justiça. A sentença é notável: pecar contra o próximo é \"transgredir contra o Senhor\" (Lv 6:2). Por isso o culpado restitui o todo e ainda acrescenta o quinto, e só então traz o carneiro da expiação — a reconciliação com Deus não dispensa a reparação ao irmão (Mt 5:23-24; Lc 19:8).",
    },
    rebanho: {
      title: "O carneiro trazido pelo defraudador",
      subtitle: "Levítico 6 • a oferta que segue a restituição",
      text: "É o carneiro sem defeito do rebanho, conforme a estimação do santuário, que o culpado leva ao sacerdote depois de haver devolvido o que tomou (Lv 6:6). Ele não compra o perdão: vem depois da restituição, no dia da expiação daquele homem (Lv 6:5). Pelo seu sangue \"o sacerdote fará expiação por ela diante do Senhor, e será perdoada\" (Lv 6:7) — a fraude contra o irmão é dívida diante de Deus, e só o sangue a apaga.",
    },
    servo: {
      title: "Os sacerdotes que guardam o fogo do altar",
      subtitle: "Levítico 6 • o ofício contínuo dos filhos de Arão",
      text: "São Arão e seus filhos no serviço de cada dia: vestidos de linho, levantam a cinza do holocausto, mudam de vestes para levá-la fora do arraial e acendem lenha nova cada manhã (Lv 6:10-12). A ordem é uma só e não admite descuido: \"O fogo arderá continuamente sobre o altar; não se apagará\" (Lv 6:13). Deles é também a porção santíssima da oferta de alimentos, comida sem levedura no pátio da tenda (Lv 6:16-17) — o serviço a Deus é ininterrupto, e Deus mesmo sustenta quem o serve.",
    },
  },
  7: {
    homem: {
      title: "O que traz o pacífico com as próprias mãos",
      subtitle: "Levítico 7 • ação de graças, voto e oferta voluntária",
      text: "É o israelita que oferece o seu sacrifício pacífico ao Senhor, e a lei insiste: \"as suas próprias mãos trarão as ofertas queimadas do Senhor\" (Lv 7:29-30). Se é oferta de ação de graças, vem com bolos ázimos e pão levedado, e a carne se come no mesmo dia, sem sobrar nada para a manhã (Lv 7:12-15). Quem come dela estando imundo é extirpado do povo (Lv 7:20). Gratidão em Israel não se delega nem se adia: é entrega pessoal, imediata e em santidade (Hb 13:15).",
    },
    servo: {
      title: "Os sacerdotes que recebem o peito e a espádua",
      subtitle: "Levítico 7 • a porção dos filhos de Arão",
      text: "São os sacerdotes que queimam a gordura sobre o altar e recebem do sacrifício pacífico o peito movido e a espádua direita alçada (Lv 7:31-32). Cabe ao próprio filho de Arão que espargiu o sangue e ofereceu a gordura ficar com a espádua como sua porção (Lv 7:33). Deus tomou essas partes dos filhos de Israel e as deu a Arão e aos seus \"por estatuto perpétuo\" desde o dia em que os ungiu (Lv 7:34-36): quem serve ao altar vive do altar (1Co 9:13).",
    },
  },
  8: {
    multidao: {
      title: "O povo reunido à porta da tenda",
      subtitle: "Levítico 8 • a consagração de Arão",
      text: "É toda a congregação convocada por Moisés à porta da tenda para testemunhar a consagração de Arão e seus filhos ao sacerdócio (Lv 8:3-4). O povo vê a lavagem, a unção com azeite, o sangue posto sobre a orelha, o polegar e o pé, e ouve que por sete dias os sacerdotes ficarão à porta \"para fazer expiação por vós\" (Lv 8:33-34). A comunidade não pode aproximar-se de Deus por si mesma: precisa de mediadores consagrados — figura do único Sumo Sacerdote que havia de vir (Hb 5:1-5).",
    },
    rebanho: {
      title: "Os animais da consagração",
      subtitle: "Levítico 8 • o novilho e os dois carneiros",
      text: "São as três vítimas dos sete dias de sagração: o novilho da expiação, sobre cuja cabeça Arão e seus filhos põem as mãos e cujo sangue purifica o altar; o carneiro do holocausto, queimado inteiro em cheiro suave; e o carneiro da consagração (Lv 8:14-15,18,22). Deste último Moisés toma o sangue e o põe na ponta da orelha direita, no polegar da mão e no polegar do pé de Arão e de seus filhos (Lv 8:23-24). O ouvido, a obra e o caminho do sacerdote são comprados por sangue antes que ele sirva a Deus.",
    },
    servo: {
      title: "Os filhos de Arão consagrados ao sacerdócio",
      subtitle: "Levítico 8 • Nadabe, Abiú, Eleazar e Itamar",
      text: "São os quatro filhos de Arão que Moisés faz chegar diante da congregação: lavados com água, vestidos de túnicas, cingidos e com as tiaras apertadas, exatamente como o Senhor lhe ordenara (Lv 8:6,13). Recebem o sangue da consagração na orelha, na mão e no pé, e o azeite da unção com o sangue espargido sobre eles e sobre as suas vestes (Lv 8:24,30). Depois ficam sete dias à porta da tenda, dia e noite, \"para que não morrais\" (Lv 8:35) — o serviço santo começa em obediência temerosa, e eles fizeram tudo o que o Senhor ordenara pela mão de Moisés (Lv 8:36).",
    },
  },
  9: {
    multidao: {
      title: "O povo diante da glória que aparece",
      subtitle: "Levítico 9 • o oitavo dia",
      text: "Ao oitavo dia, terminada a consagração, toda a congregação se chega e \"se pôs perante o Senhor\", porque naquele dia o Senhor lhes apareceria (Lv 9:5-6). Depois que Arão oferece expiação, holocausto e oferta pacífica e abençoa o povo, \"a glória do Senhor apareceu a todo o povo\" e o fogo saiu de diante do Senhor e consumiu o sacrifício (Lv 9:23-24). Vendo isso, o povo jubila e cai sobre as suas faces — o culto aceito culmina na adoração, quando Deus mesmo desce para habitar no meio dos seus.",
    },
    anciao: {
      title: "Os anciãos de Israel chamados ao oitavo dia",
      subtitle: "Levítico 9 • as testemunhas da glória",
      text: "São os anciãos que Moisés chama junto com Arão e seus filhos no dia em que o sacerdócio entra em exercício (Lv 9:1). Como cabeças do povo, estão ali para ouvir a ordem e ver com os próprios olhos que tudo se fez \"como o Senhor ordenou\", pois \"hoje o Senhor vos aparecerá\" (Lv 9:4,6). São os fiadores humanos daquele dia: quando o fogo desce e consome o holocausto, podem testemunhar a Israel que a oferta foi aceita e que Deus se agradou do seu culto.",
    },
    rebanho: {
      title: "O bezerro de Arão e o boi do povo",
      subtitle: "Levítico 9 • as vítimas do primeiro culto",
      text: "São os animais do oitavo dia: o bezerro da expiação \"que era por si mesmo\", que Arão degola antes de tudo, e depois o bode, o cordeiro, o boi e o carneiro trazidos pelo povo (Lv 9:2-4,8,18). A ordem ensina teologia: o sacerdote precisa expiar primeiro o próprio pecado para só então oferecer pelos outros (Lv 9:7). Nisso Arão difere do Sumo Sacerdote que havia de vir, que não teve necessidade de oferecer por si, porque se ofereceu a si mesmo uma vez por todas (Hb 7:27).",
    },
    servo: {
      title: "Os filhos de Arão que lhe entregam o sangue",
      subtitle: "Levítico 9 • os sacerdotes assistentes no oitavo dia",
      text: "São os filhos de Arão em seu primeiro dia de ofício, servindo ao pai no altar: trazem-lhe o sangue do bezerro, entregam-lhe o holocausto nos seus pedaços com a cabeça, e lhe passam o sangue do boi e do carneiro do sacrifício pacífico (Lv 9:9,12-13,18). Ninguém improvisa; cada mão tem o seu lugar no rito ordenado. Esse serviço obediente e ordenado é justamente o que os capítulos seguintes mostrarão ser questão de vida ou morte diante do Deus santo (Lv 10:1-3).",
    },
  },
  10: {
    homem: {
      title: "Misael e Elzafã, filhos de Uziel",
      subtitle: "Levítico 10 • os que levaram os corpos para fora",
      text: "São primos de Arão, filhos de Uziel, o tio de Arão, chamados por Moisés no dia terrível em que o fogo do Senhor consumiu Nadabe e Abiú (Lv 10:1-2,4). Como levitas não ungidos, podem tocar os mortos: chegam e levam os irmãos \"nas suas túnicas para fora do arraial\", conforme Moisés lhes dissera (Lv 10:5). Fazem o que Arão, Eleazar e Itamar estavam proibidos de fazer, pois o azeite da unção estava sobre eles (Lv 10:6-7) — o luto do povo teve de ser carregado por outras mãos, para que o santuário não fosse profanado.",
    },
    servo: {
      title: "Nadabe, Abiú, Eleazar e Itamar",
      subtitle: "Levítico 10 • o fogo estranho e os que ficaram",
      text: "São os quatro filhos de Arão recém-consagrados. Nadabe e Abiú tomam os seus incensários e oferecem \"fogo estranho perante o Senhor, o que não lhes ordenara\", e saiu fogo de diante do Senhor e os consumiu (Lv 10:1-2). A palavra de Moisés explica tudo: \"Serei santificado naqueles que se chegarem a mim\" — e Arão calou-se (Lv 10:3). Eleazar e Itamar ficam, proibidos de prantear, chamados a distinguir entre o santo e o profano e a ensinar Israel (Lv 10:10-11), ainda que repreendidos por não terem comido a expiação no lugar santo (Lv 10:16-18).",
    },
  },
  11: {
    homem: {
      title: "O israelita à mesa da aliança",
      subtitle: "Levítico 11 • limpos e imundos",
      text: "A Escritura não lhe dá o nome, mas é cada israelita diante do próprio prato: o que ruminava e tinha unha fendida podia comer; o réptil, o que morre por si e o vaso onde o imundo cai, não (Lv 11:3,32-34). A mesa virava confissão diária — \"sede santos, porque eu sou santo\" (Lv 11:44) — até que, em Cristo, Deus purificou os alimentos e apontou o coração (Mc 7:19; At 10:15)." },
    multidao: {
      title: "Israel chamado à santidade no comer",
      subtitle: "Levítico 11 • limpos e imundos",
      text: "É o povo instruído a distinguir entre o limpo e o imundo até à mesa, separando o que pode comer do que lhe é abominação (Lv 11:47). A razão não é higiene, mas vocação: \"sereis santos, porque eu sou santo\" — o mesmo Deus que os fez subir da terra do Egito (Lv 11:44-45). Cada refeição tornava-se lembrança de que Israel fora separado das nações para pertencer a Deus, distinção que o Novo Testamento cumpre no coração purificado (At 10:15; Mc 7:19).",
    },
    rebanho: {
      title: "Os animais limpos e os imundos",
      subtitle: "Levítico 11 • a unha fendida e o ruminar",
      text: "São os rebanhos e as manadas passados pelo crivo da lei: come-se o que tem as unhas fendidas em duas e rumina, mas o camelo, o coelho e a lebre ruminam sem ter unha fendida, e o porco tem unha fendida sem ruminar — todos imundos a Israel (Lv 11:3-7). O gado que serve de mantimento também contamina quem lhe toca o cadáver (Lv 11:39). Assim até os animais do curral pregavam a mesma lição: há uma linha traçada por Deus entre o santo e o profano, e o povo da aliança vive dentro dela (Lv 11:46-47).",
    },
  },
  12: {
    mulherComum: {
      title: "A mulher que deu à luz",
      subtitle: "Levítico 12 • os dias da purificação",
      text: "É a mãe israelita, recém-parida: sete dias imunda se lhe nasce um menino, com a circuncisão ao oitavo dia, e depois trinta e três dias \"no sangue da sua purificação\", sem tocar coisa santa nem entrar no santuário (Lv 12:2-4). Cumpridos os dias, traz um cordeiro por holocausto e um pombinho ou rola pela expiação, e o sacerdote faz propiciação por ela (Lv 12:6-7). Se lhe faltam recursos, bastam duas rolas ou dois pombinhos (Lv 12:8) — foi essa exatamente a oferta dos pobres que Maria levou ao templo por Jesus (Lc 2:22-24).",
    },
  },
  13: {
    servo: {
      title: "O sacerdote que examina a praga",
      subtitle: "Levítico 13 • o exame da lepra",
      text: "Arão e seus filhos eram também os peritos da pele de Israel: olhavam o pelo que embranquece, a carne viva, a praga que se estende, encerravam por sete dias e tornavam a olhar (Lv 13:3-8). Não curavam — DECLARAVAM limpo ou imundo, guardando o arraial onde Deus habitava. Por isso Jesus, ao curar leprosos, manda: \"vai, mostra-te ao sacerdote\" (Lv 14:2; Mc 1:44) — o perito da exclusão vira testemunha da restauração." },
    mulherComum: {
      title: "A mulher sob o exame da praga",
      subtitle: "Levítico 13 • tinha e impigem",
      text: "A lei do exame valia para \"homem ou mulher\" (Lv 13:29,38): também ela trazia ao sacerdote a tinha na cabeça ou a impigem na pele, e aguardava os sete dias do encerramento. A Escritura não lhe dá o nome, mas o texto a inclui de propósito — diante da santidade e da purificação não há distinção; e Miriã, ferida de lepra e restaurada, mostra que a porta de volta também era dela (Nm 12:10-15)." },
    homem: {
      title: "O que tem a praga da lepra",
      subtitle: "Levítico 13 • o exame e a exclusão",
      text: "É o israelita em cuja pele apareceu inchação, pústula ou mancha lustrosa, levado a Arão ou a um de seus filhos para ser examinado, encerrado sete dias e depois outros sete (Lv 13:2-5). Se o sacerdote o declara imundo, sua vida muda por inteiro: \"as vestes do leproso serão rasgadas, e a sua cabeça será descoberta, e cobrirá o lábio superior, e clamará: Imundo, imundo\", e \"habitará só; a sua habitação será fora do arraial\" (Lv 13:45-46). É a imagem viva do pecado que separa do povo e da presença — e por isso é tão espantoso que Cristo estendesse a mão e tocasse justamente o leproso (Mc 1:41).",
    },
  },
  14: {
    homem: {
      title: "O leproso no dia da sua purificação",
      subtitle: "Levítico 14 • as duas aves e o sangue na orelha",
      text: "É aquele que foi expulso do arraial e agora está sarado: o sacerdote sai fora do arraial ao seu encontro, porque o imundo não podia entrar (Lv 14:2-3). Toma-se então duas aves vivas, pau de cedro, carmesim e hissopo; uma ave é degolada sobre águas vivas e a outra, molhada no sangue, é solta livre sobre a face do campo (Lv 14:4-7). Depois o sangue e o azeite lhe são postos na orelha direita, no polegar da mão e no pé, e sobre a cabeça (Lv 14:14,17-18). Morte e vida, sangue e liberdade: o quadro de Cristo entregue e ressuscitado para a nossa justificação (Rm 4:25).",
    },
  },
  15: {
    homem: {
      title: "O homem com fluxo, e os que ele toca",
      subtitle: "Levítico 15 • a impureza que se comunica",
      text: "É o israelita cujo corpo escorre o fluxo — e, com ele, todo o que toca a sua cama, o seu assento ou a sua saliva: \"lavará as suas vestes, e se banhará em água, e será imundo até à tarde\" (Lv 15:5-11). A lei ensinava pelo corpo o que o pecado faz na alma: contamina o que toca. Ao sarar, contava sete dias e trazia ao sacerdote duas rolas ou dois pombinhos (Lv 15:13-15) — e é essa cadeia que a mulher do fluxo rompe ao tocar em Jesus e sair CURADA, não o contaminando (Mc 5:25-34)." },
    mulherComum: {
      title: "A mulher no seu fluxo",
      subtitle: "Levítico 15 • a espera e a purificação",
      text: "A mulher na sua menstruação, e a que padece fluxo por muitos dias fora do tempo: tudo em que se deitar ou assentar fica imundo, e quem o tocar lava as vestes e se banha (Lv 15:19-27). Ao cessar, conta sete dias e ao oitavo traz as duas aves à porta da tenda (Lv 15:28-30). Doze anos viveu assim a mulher do evangelho, excluída de tudo — até tocar a orla da veste do Senhor (Lc 8:43-48)." },
    servo: {
      title: "O sacerdote da purificação do fluxo",
      subtitle: "Levítico 15 • as duas aves ao oitavo dia",
      text: "Ao oitavo dia, o purificado trazia duas rolas ou dois pombinhos à porta da tenda, e o sacerdote oferecia um por expiação do pecado e outro em holocausto (Lv 15:14-15,29-30). Era a oferta dos pobres — a mesma da mãe de Jesus (Lv 12:8; Lc 2:24). O sacerdote fazia expiação \"por causa do seu fluxo\": até a fraqueza involuntária do corpo era trazida ao altar, porque Deus habitava no meio do arraial (Lv 15:31)." },
  },
  16: {
    homem: {
      title: "O homem designado que leva o bode ao deserto",
      subtitle: "Levítico 16 • o bode emissário",
      text: "A Escritura não lhe dá o nome: é apenas \"um homem designado para isso\", escolhido para conduzir à terra solitária o bode vivo sobre cuja cabeça Arão confessou todas as iniquidades, transgressões e pecados dos filhos de Israel (Lv 16:21-22). Ele volta contaminado pelo que carregou e precisa lavar as vestes e banhar-se antes de reentrar no arraial (Lv 16:26), como também aquele que queima fora do arraial o novilho e o bode da expiação (Lv 16:27-28). Sua caminhada silenciosa desenha o que nenhum sacrifício conseguia dizer sozinho: o pecado não só é coberto, é levado para longe (Sl 103:12; Jo 1:29).",
    },
    rebanho: {
      title: "O novilho da expiação de Arão",
      subtitle: "Levítico 16 • o Dia da Expiação",
      text: "É o novilho que Arão traz por si mesmo antes de tudo, \"e fará expiação por si e pela sua casa\" (Lv 16:6,11). Somente com o seu sangue, e o do bode do povo, o sumo sacerdote passa uma vez no ano para dentro do véu, envolto na nuvem do incenso, e esparge sete vezes perante o propiciatório (Lv 16:12-15). Nem o mais santo homem de Israel entrava sem sangue e sem primeiro expiar-se — por isso o Novo Testamento vê aqui a sombra de Cristo, que entrou no santuário celestial com o seu próprio sangue, uma vez por todas (Hb 9:7,11-12).",
    },
  },
  17: {
    multidao: {
      title: "O povo sob a lei do sangue",
      subtitle: "Levítico 17 • a vida está no sangue",
      text: "É toda a casa de Israel proibida de derramar sangue fora da tenda ou de comer sangue algum, para que não sacrifiquem mais aos demônios do campo (Lv 17:5-7). A razão é revelada como o coração de todo o sistema: \"a vida da carne está no sangue; pelo que vo-lo tenho dado sobre o altar, para fazer expiação pelas vossas almas\" (Lv 17:11). O povo guarda o sangue como coisa sagrada porque nele está a vida dada por Deus para resgatar a vida — anúncio do sangue de Cristo que purifica (Hb 9:22).",
    },
    homem: {
      title: "O israelita que degola no arraial",
      subtitle: "Levítico 17 • trazer a oferta à porta da tenda",
      text: "É \"qualquer homem da casa de Israel\" que degola boi, cordeiro ou cabra dentro ou fora do arraial sem trazê-lo à porta da tenda da congregação (Lv 17:3-4). A lei é severa: a esse homem \"será imputado o sangue\" e será extirpado do seu povo. Deus não quer que os seus sacrifiquem sobre a face do campo, onde Israel se prostituía após os demônios (Lv 17:5-7). Há um só altar e um só caminho de aproximação — a adoração não é onde e como o homem inventa, mas onde Deus determinou (Jo 4:23-24).",
    },
    rebanho: {
      title: "O boi, o cordeiro e a cabra do arraial",
      subtitle: "Levítico 17 • o gado que só se degola diante do Senhor",
      text: "São os animais do rebanho doméstico que o israelita degola — boi, cordeiro ou cabra — e que a lei manda trazer ao Senhor à porta da tenda, para serem oferecidos como sacrifícios pacíficos pela mão do sacerdote (Lv 17:3-5). Também o animal caçado no campo tem o seu sangue derramado e coberto com pó (Lv 17:13). Nenhuma vida animal se toma em Israel como coisa banal, \"porquanto a vida de toda a carne é o seu sangue\" (Lv 17:14): o gado do curral lembrava diariamente que a vida pertence ao Criador.",
    },
  },
  18: {
    homem: {
      title: "O homem da casa de Israel",
      subtitle: "Levítico 18 • o pai, o filho, o marido",
      text: "É o israelita a quem cada uma destas leis se dirige: \"nenhum homem se chegará a qualquer parenta da sua carne\" (Lv 18:6). Ele aparece na cena como pai, filho, irmão, sobrinho e marido — todos os lugares que um homem ocupa dentro da tenda da família, e que a lei cerca de reverência. Guardando estes juízos, \"viverá por eles\" (Lv 18:5): a santidade da casa começa no homem que honra cada parentela como fronteira posta por Deus, não como campo de desejo (1Ts 4:3-5).",
    },
    mulherComum: {
      title: "As mulheres da casa protegidas pela lei",
      subtitle: "Levítico 18 • mãe, irmã, nora, tia",
      text: "São a mãe, a irmã, a neta, a tia, a nora, a cunhada e a mulher do próximo — cada uma nomeada por Deus, uma a uma, como intocável (Lv 18:7-20). Num mundo antigo em que a mulher da casa era a mais vulnerável dentro das próprias paredes, esta lei a cerca de dignidade: a sua honra não depende da força de ninguém, mas do \"Eu sou o Senhor\" que sela cada mandamento. A família de Israel é santuário, e cada mulher nela tem a guarda do próprio Deus (Lv 18:30).",
    },
    anciao: {
      title: "O pai e o tio, cabeças da parentela",
      subtitle: "Levítico 18 • a honra das gerações",
      text: "É o homem velho da família — o pai cuja nudez não se descobre, o tio cuja mulher não se toca, o avô que guarda as netas (Lv 18:7-8,10,14). A lei protege a sua honra porque nele se guarda a ordem das gerações: descobrir a nudez do pai é derrubar a casa inteira. Onde Cam zombou da nudez de Noé e trouxe maldição (Gn 9:22-25), Israel é chamado a cobrir e honrar os seus velhos, para que a tenda permaneça de pé de geração em geração.",
    },
    multidao: {
      title: "O povo separado das nações",
      subtitle: "Levítico 18 • a santidade da família",
      text: "É a congregação advertida a não viver segundo as obras do Egito de onde saiu, nem de Canaã para onde vai, mas segundo os juízos do Senhor (Lv 18:3-4). Contra os pecados de incesto, adultério e das abominações que fizeram a terra vomitar os seus moradores, Deus chama o seu povo à pureza dos laços e do corpo (Lv 18:24-25). A santidade de Israel havia de brilhar até na vida familiar, porque o povo da aliança é marcado pelo \"Eu sou o Senhor vosso Deus\" que sela cada mandamento (Lv 18:30).",
    },
  },
  19: {
    multidao: {
      title: "A congregação chamada à santidade",
      subtitle: "Levítico 19 • sereis santos",
      text: "É \"toda a congregação dos filhos de Israel\" reunida para ouvir o coração da aliança: \"Santos sereis, porque eu, o Senhor vosso Deus, sou santo\" (Lv 19:2). Dessa raiz brotam mandamentos que unem o culto e a justiça — respeitar os pais e os sábados, deixar a respiga para o pobre e o estrangeiro, não oprimir nem mentir — coroados por \"amarás o teu próximo como a ti mesmo\" (Lv 19:18). Aqui a santidade não é apenas ritual, mas amor concreto ao próximo, palavra que o próprio Cristo tomou como o segundo grande mandamento (Mt 22:39).",
    },
    homem: {
      title: "O próximo de Levítico 19",
      subtitle: "Levítico 19 • o ceifeiro, o pobre, o estrangeiro",
      text: "São as figuras concretas em que este capítulo traduz o amor: o lavrador que não sega totalmente o canto do campo nem rabisca a vinha, e o pobre e o estrangeiro que vêm respigar o que ficou (Lv 19:9-10); o próximo que não deve ser oprimido nem roubado, cuja diária não fica retida até de manhã (Lv 19:13); e o jovem que se levanta diante das cãs (Lv 19:32). A esse estrangeiro Deus manda amar \"como a ti mesmo, pois estrangeiros fostes na terra do Egito\" (Lv 19:34) — a santidade de Israel se mede no campo, na balança e no trato com o mais fraco.",
    },
    anciao: {
      title: "O ancião de cãs",
      subtitle: "Levítico 19 • honrarás a face do ancião",
      text: "É o velho de Israel, cabelos brancos, que passa entre os seus: \"Diante das cãs te levantarás, e honrarás a face do ancião; e temerás o teu Deus. Eu sou o Senhor\" (Lv 19:32). O mandamento é duplamente notável — junta a reverência ao idoso e o temor a Deus na mesma frase, como se desonrar o ancião fosse desonrar Aquele que lhe deu os anos. Em meio a leis de campo, balança e juízo, a velhice aparece como coisa santa, e a comunidade que teme a Deus se põe de pé diante dela (Pv 16:31).",
    },
  },
  20: {
    multidao: {
      title: "O povo santificado pelo Senhor",
      subtitle: "Levítico 20 • separados para Deus",
      text: "É a congregação chamada a executar a justiça da aliança, expulsando de si o culto a Moloque, a feitiçaria e as abominações que profanam o santuário e o nome de Deus (Lv 20:2-3,7). O apelo se repete: \"santificai-vos, e sede santos, pois eu sou o Senhor vosso Deus\", e \"eu sou o Senhor que vos santifica\" (Lv 20:7-8). Israel é povo separado dos povos para ser de Deus — \"ser-me-eis santos, porque eu, o Senhor, sou santo\" (Lv 20:26) — santidade que é obra do próprio Deus que o consagra.",
    },
    homem: {
      title: "O culpado diante da pena declarada",
      subtitle: "Levítico 20 • o seu sangue será sobre ele",
      text: "É o homem de Israel sobre quem a sentença cai: o que amaldiçoou pai ou mãe, o adúltero, o que violou a casa do parente — \"certamente morrerá; o seu sangue será sobre ele\" (Lv 20:9-12). As leis de Levítico 18 tinham dito o que não se faz; aqui se declara o peso de tê-lo feito: a culpa é dele, não de outro. A cena o mostra curvado, sem nome, porque qualquer um pode estar ali — e é justamente esse peso que o evangelho anuncia ter caído sobre Outro (Is 53:5; Rm 6:23).",
    },
    mulherComum: {
      title: "A mulher alcançada pela mesma sentença",
      subtitle: "Levítico 20 • morrerá o adúltero e a adúltera",
      text: "É a mulher que a pena alcança em pé de igualdade com o homem: \"certamente morrerá o adúltero e a adúltera\" (Lv 20:10) — nada da dupla medida dos povos, que puniam a mulher e poupavam o homem. Nas penas da casa, ambos respondem: \"ambos certamente morrerão; o seu sangue será sobre eles\" (Lv 20:11-12,18). Diante da lei santa não há culpados de segunda classe nem cúmplices invisíveis — verdade que Jesus expôs quando trouxeram só a mulher, sem o homem (Jo 8:3-7).",
    },
    anciao: {
      title: "O ancião à porta, testemunha do juízo",
      subtitle: "Levítico 20 • os olhos dos filhos do seu povo",
      text: "É o velho de Israel diante de quem as penas se executam: os culpados são \"extirpados aos olhos dos filhos do seu povo\" (Lv 20:17), e ninguém julgava em Israel senão diante dos anciãos da porta (Dt 21:19-20). Ele é também o pai ofendido de Lv 20:9, cuja honra a lei defende com a máxima gravidade. A sua presença grave na cena diz que o juízo da aliança não é vingança privada: é a comunidade inteira guardando a santidade que a faz viver.",
    },
    servo: {
      title: "O levita que proclama as penas",
      subtitle: "Levítico 20 • a boca da lei no arraial",
      text: "É o levita, homem da tribo separada para o serviço santo, por cuja boca as sentenças da aliança chegam aos ouvidos do povo — como mais tarde os levitas proclamariam em alta voz as maldições no monte Ebal, e todo o povo responderia \"Amém\" (Dt 27:14-26). Ele não inventa a pena nem a abranda: repete o que o Senhor falou a Moisés (Lv 20:1-2). A gravidade da sua voz ensina Israel que a santidade não é conselho, é fronteira de vida e morte (Lv 20:26).",
    },
  },
  21: {
    servo: {
      title: "Os sacerdotes, filhos de Arão, na sua santidade",
      subtitle: "Levítico 21 • quem oferece o pão do seu Deus",
      text: "São os filhos de Arão sob uma regra mais estreita que a do povo: não se contaminam por morto senão pelo parente mais chegado, não fazem calva na cabeça nem golpes na carne, não tomam mulher prostituta nem repudiada (Lv 21:1-2,5,7). A razão é uma só e se repete: \"Santos serão a seu Deus... porque oferecem as ofertas queimadas do Senhor, e o pão do seu Deus\" (Lv 21:6). Nem o defeito físico podia chegar-se ao véu, ainda que comesse do pão santo (Lv 21:21-23) — sinal de que só um Sacerdote sem mácula abriria de vez o caminho (Hb 7:26).",
    },
  },
  22: {
    servo: {
      title: "Os sacerdotes que guardam as coisas santas",
      subtitle: "Levítico 22 • o pão do sacerdote e a sua pureza",
      text: "São Arão e seus filhos advertidos a apartar-se das coisas santas dos filhos de Israel sempre que houver imundícia sobre eles, \"para que não profanem o meu santo nome\" (Lv 22:2-3). O leproso, o que tem fluxo, o que tocou cadáver ou réptil não come das coisas santas até banhar-se e o sol se pôr — e só então come, \"porque este é o seu pão\" (Lv 22:4-7). Nenhum estranho, hóspede ou diarista participa (Lv 22:10). O privilégio de comer à mesa de Deus vem acompanhado de temor: \"Eu sou o Senhor que os santifico\" (Lv 22:9).",
    },
    rebanho: {
      title: "O animal sem defeito da oferta",
      subtitle: "Levítico 22 • nada de aleijado sobre o altar",
      text: "É a rês que o israelita separa dos bois, cordeiros ou cabras para cumprir um voto ou oferta voluntária: \"macho sem defeito\", porque com defeito \"não seria aceita em vosso favor\" (Lv 22:19-20). Ficam excluídos o cego, o quebrado, o aleijado, o verrugoso, o sarnoso, o machucado ou cortado (Lv 22:22,24). O recém-nascido fica sete dias debaixo da mãe e só do oitavo dia em diante é aceito (Lv 22:27). Deus não recebe as sobras do rebanho — exigência que aponta para o Cordeiro \"sem defeito e sem mancha\" (1Pe 1:19; Ml 1:8).",
    },
    homem: {
      title: "Os homens ao redor da mesa santa",
      subtitle: "Levítico 22 • o estranho, o da casa, o ofertante",
      text: "São os homens que este capítulo distingue diante das coisas santas: o ESTRANHO, hóspede ou diarista, que não come delas por mais perto que trabalhe (Lv 22:10); o comprado com dinheiro e o NASCIDO NA CASA do sacerdote, que comem, porque pertencem à família do altar (Lv 22:11); o que comeu POR ERRO e restitui acrescentando a quinta parte (Lv 22:14); e o OFERTANTE que traz do rebanho o seu voto, aguardando o exame do animal (Lv 22:18-21). A mesa de Deus não se herda por proximidade, mas por pertença — a mesma lição da mesa do Senhor (1Co 10:16-17).",
    },
    mulherComum: {
      title: "A filha do sacerdote",
      subtitle: "Levítico 22 • a que sai e a que volta",
      text: "É a filha da casa de Arão: casando-se com homem estranho, deixa a mesa do pai e não come mais da oferta das coisas santas (Lv 22:12). Mas se ficar viúva ou for repudiada, sem filho, e tornar à casa de seu pai \"como na sua mocidade\", do pão de seu pai comerá (Lv 22:13). No meio de um capítulo de cercas e exclusões, abre-se esta porta de misericórdia: a que perdeu tudo tem lugar posto na mesa santa da casa paterna — figura do Pai que recebe de volta quem volta (Lc 15:20-24).",
    },
  },
  23: {
    multidao: {
      title: "Israel nas festas do Senhor",
      subtitle: "Levítico 23 • as santas convocações",
      text: "É o povo convocado para o calendário sagrado das \"solenidades do Senhor\", as santas convocações que ritmam o ano (Lv 23:2). Do sábado à Páscoa e aos pães ázimos, às primícias e Pentecostes, às trombetas, ao dia da expiação e à festa dos tabernáculos, a congregação recorda a redenção e habita em tendas para lembrar que Deus os tirou do Egito (Lv 23:42-43). Cada festa é um encontro marcado com o Senhor, e todas apontam, em sombra, para a obra de Cristo e o descanso do seu povo (Cl 2:16-17).",
    },
    homem: {
      title: "O israelita nas primícias e nos tabernáculos",
      subtitle: "Levítico 23 • o molho da sega e os ramos da festa",
      text: "É o lavrador de Israel dentro do calendário das festas: entrado na terra e feita a colheita, traz \"um molho das primícias da vossa sega ao sacerdote\", que o move perante o Senhor para que sejam aceitos, e nada do novo pão se come antes disso (Lv 23:10-11,14). No sétimo mês, esse mesmo homem toma ramos de palmeiras, de árvores frondosas e salgueiros de ribeiras e se alegra perante o Senhor por sete dias, habitando em tendas (Lv 23:40,42). Primeiro entrega, depois festeja — e o molho movido antecipa Cristo, primícias dos que dormem (1Co 15:20).",
    },
    rebanho: {
      title: "O cordeiro do molho e as vítimas de Pentecoste",
      subtitle: "Levítico 23 • as ofertas das festas da sega",
      text: "São os animais que acompanham o pão das festas: no dia do molho movido, \"um cordeiro sem defeito, de um ano, em holocausto ao Senhor\" (Lv 23:12); e cinquenta dias depois, com os dois pães de Pentecoste, sete cordeiros, um novilho e dois carneiros, mais o bode da expiação e os dois cordeiros do pacífico (Lv 23:18-19). A colheita não sobe a Deus sem sangue que a consagre — e o cordeiro das primícias aponta para o Cordeiro morto e ressuscitado justamente na festa das primícias (1Co 5:7; 15:20).",
    },
    mulherComum: {
      title: "A respigadora do canto do campo",
      subtitle: "Levítico 23 • a semente de Rute",
      text: "É a pobre ou a estrangeira que entra no campo quando a sega passa: para ela o lavrador não acaba de segar os cantos nem colhe as espigas caídas — \"para o pobre e para o estrangeiro as deixarás\" (Lv 23:22). No meio do calendário das festas, Deus planta a caridade da colheita: a alegria de Pentecoste inclui quem não tem campo. Desta lei viverá Rute, a moabita que respigou no campo de Boaz e entrou na linhagem do Messias (Rt 2:2-3; Mt 1:5).",
    },
  },
  24: {
    multidao: {
      title: "A congregação diante do blasfemo",
      subtitle: "Levítico 24 • o nome que não se profana",
      text: "É toda a congregação chamada a julgar o filho de Selomite, a mulher de Dã, que no arraial blasfemou e amaldiçoou o nome do Senhor (Lv 24:11). Os que o ouviram põem as mãos sobre a sua cabeça e \"toda a congregação certamente o apedrejará\", sob uma mesma lei para o natural e para o estrangeiro (Lv 24:14-16,22). O povo que tem no santuário as lâmpadas e os pães sempre acesos diante de Deus aprende quão santo é o Nome que carrega, e que a comunidade da aliança guarda a honra do seu Deus.",
    },
    homem: {
      title: "O filho de Selomite e o israelita do arraial",
      subtitle: "Levítico 24 • a contenda que virou blasfêmia",
      text: "Um é filho de mãe israelita, Selomite, filha de Dibri, da tribo de Dã, e de pai egípcio — homem de dupla origem no meio do povo; o outro é um israelita com quem ele discutiu no arraial (Lv 24:10). No calor da contenda, \"o filho da mulher israelita blasfemou o nome do Senhor, e o amaldiçoou\", e foi preso até que a vontade do Senhor lhes fosse declarada (Lv 24:11-12). A briga de dois homens revela o que Israel precisava saber: o Nome não é assunto privado, e há uma só lei para o estrangeiro e para o natural (Lv 24:22).",
    },
  },
  25: {
    multidao: {
      title: "O povo no sábado da terra e no jubileu",
      subtitle: "Levítico 25 • a liberdade apregoada",
      text: "É Israel instruído, já com os olhos na terra prometida, a deixar a terra descansar no sétimo ano e a apregoar liberdade no ano do jubileu, quando cada um torna à sua possessão e à sua família (Lv 25:2-4,10). A raiz de tudo é que \"a terra é minha; pois vós sois estrangeiros e peregrinos comigo\", e o próprio povo pertence a Deus, que o tirou do Egito (Lv 25:23,42). O jubileu proclama que o Senhor liberta os cativos e restaura os endividados — sombra da graça que Cristo anunciou como o ano aceitável do Senhor (Lc 4:18-19).",
    },
    homem: {
      title: "O irmão empobrecido que torna à sua possessão",
      subtitle: "Levítico 25 • o resgatado do jubileu",
      text: "É o israelita cujas forças decaíram: vendeu parte da herança dos pais, ou vendeu-se a si mesmo por dívida, e agora serve como diarista na casa de outro (Lv 25:25,35,39-40). A lei não permite que o tratem com rigor nem com juros, e lhe reserva um resgatador, parente mais chegado (Lv 25:25,36,43). E no ano quinquagésimo, ao som da trombeta no dia da expiação, \"sairá do teu serviço, ele e seus filhos com ele, e tornará à sua família e à possessão de seus pais\" (Lv 25:41). Nenhuma ruína é definitiva em Israel, porque \"os filhos de Israel me são servos\" (Lv 25:55).",
    },
    patriarca: {
      title: "O resgatador, parente mais chegado",
      subtitle: "Levítico 25 • o goel do irmão empobrecido",
      text: "É o parente próximo que a lei convoca quando o irmão empobrece: \"então virá o seu resgatador, seu parente, e resgatará o que vendeu seu irmão\" (Lv 25:25). O mesmo direito o alcança quando o irmão se vende ao estrangeiro: \"um de seus irmãos o poderá resgatar\" (Lv 25:48). O goel paga do próprio bolso para devolver ao outro a terra e a liberdade — figura que Boaz encarna nos campos de Belém (Rt 4:9-10) e que aponta para Aquele que se fez nosso parente para nos resgatar (Jó 19:25; Gl 4:4-5).",
    },
    servo: {
      title: "O levita e o seu direito perpétuo de resgate",
      subtitle: "Levítico 25 • as cidades da possessão levítica",
      text: "É o homem da tribo de Levi, que não recebeu herança de campos como as demais tribos, porque \"o Senhor é a sua herança\" (Dt 10:9). Por isso a lei o protege de modo único: sobre as casas das cidades da sua possessão os levitas têm \"direito perpétuo de resgate\", e a casa vendida sai do poder do comprador no jubileu (Lv 25:32-33). E o campo do arrabalde das suas cidades nem sequer se vende, \"porque lhes é possessão perpétua\" (Lv 25:34) — quem vive do altar não pode ficar sem teto em Israel.",
    },
    anciao: {
      title: "O tio que pode resgatar",
      subtitle: "Levítico 25 • a família que não abandona",
      text: "É um dos parentes que a lei enumera quando o irmão se vendeu ao estrangeiro: \"ou seu tio, ou o filho de seu tio o poderá resgatar; ou um dos seus parentes, da sua família\" (Lv 25:49). A lista desce de grau em grau para que ninguém fique sem ninguém: enquanto houver família, há esperança de resgate. Assim fez Jeremias ao comprar o campo do primo Hanameel, \"porque teu é o direito de resgate\" (Jr 32:7-8) — em Israel, o parentesco é um chamado, não só um laço.",
    },
    mulherComum: {
      title: "A mulher da casa que volta no jubileu",
      subtitle: "Levítico 25 • a família restituída",
      text: "É a mulher da família empobrecida que acompanhou o marido na queda: viu a herança vendida e a casa servindo em terra alheia. A promessa do jubileu também é dela, pois o que sai, \"sairá do teu serviço, ele e seus filhos com ele, e tornará à sua família e à possessão de seus pais\" (Lv 25:41,54). A liberdade apregoada \"a todos os seus moradores\" (Lv 25:10) não deixa ninguém para trás — a restauração de Deus recompõe a casa inteira, como o ano aceitável que Cristo proclamou (Lc 4:18-19).",
    },
    rebanho: {
      title: "O gado do arrabalde levítico",
      subtitle: "Levítico 25 • o pasto que não se vende",
      text: "São as reses apascentadas no campo do arrabalde das cidades dos levitas — a faixa de pasto ao redor dos muros que a lei declara invendável, \"porque lhes é possessão perpétua\" (Lv 25:34). Foi para esse gado que as quarenta e oito cidades levíticas receberam os seus arredores (Nm 35:2-3). O rebanho pastando ali é o sustento visível de quem serve ao santuário: Deus, que é a herança do levita, não o deixa sem provisão (Dt 10:9; 1Co 9:13).",
    },
  },
  26: {
    multidao: {
      title: "Israel diante das bênçãos e maldições",
      subtitle: "Levítico 26 • as sanções da aliança",
      text: "É o povo posto diante das duas veredas da aliança: se andar nos estatutos do Senhor, terá chuvas, paz e a promessa \"andarei no meio de vós, e eu vos serei por Deus, e vós me sereis por povo\" (Lv 26:11-12); se rejeitar, virão o terror, a espada e o exílio entre as nações (Lv 26:14-17,33). Mesmo na dispersão, porém, se o coração incircunciso se humilhar, Deus promete lembrar-se da aliança com Jacó, Isaque e Abraão (Lv 26:41-42). Aqui Israel ouve que a fidelidade do Senhor à sua palavra é maior que a infidelidade do povo, e que o castigo mira a restauração.",
    },
  },
  27: {
    homem: {
      title: "O que faz voto particular ao Senhor",
      subtitle: "Levítico 27 • a avaliação do santuário",
      text: "É o israelita que, movido por gratidão ou súplica, consagra ao Senhor uma pessoa, um animal, a sua casa ou o campo da sua possessão (Lv 27:2,9,14,16). O sacerdote avalia tudo em siclos do santuário, e quem quiser resgatar o que consagrou acrescenta a quinta parte (Lv 27:13,15,19). Notável é a provisão para o necessitado: \"se for mais pobre do que a tua avaliação\", o sacerdote o avalia \"conforme as posses daquele que fez o voto\" (Lv 27:8). O voto é livre, mas uma vez feito é dívida santa — melhor não votar do que votar e não pagar (Ec 5:4-5).",
    },
    rebanho: {
      title: "O dízimo do gado que passa debaixo da vara",
      subtitle: "Levítico 27 • o décimo santo ao Senhor",
      text: "São as reses contadas uma a uma na saída do curral: \"tudo o que passar debaixo da vara, o dízimo será santo ao Senhor\" (Lv 27:32). Não se investiga entre o bom e o mau nem se troca um pelo outro; se houver troca, ambos ficam santos e não se resgatam (Lv 27:33). Também o primogênito do boi ou do gado miúdo não pode ser consagrado por ninguém, \"por já ser do Senhor\" (Lv 27:26). O livro que começou com a oferta voluntária termina lembrando que o melhor do rebanho já pertence a Deus antes de qualquer promessa humana.",
    },
    mulherComum: {
      title: "A mulher avaliada no voto",
      subtitle: "Levítico 27 • trinta siclos segundo o santuário",
      text: "É a mulher de Israel consagrada ao Senhor por voto e apresentada diante do sacerdote para a avaliação: trinta siclos na força da idade, dez siclos de cinco a vinte anos, três siclos de prata pela menina de um mês a cinco anos (Lv 27:4-6). A tabela não mede o valor da alma — mede a capacidade de trabalho que o voto dedica ao santuário, e a própria lei se dobra diante do pobre, avaliado \"conforme as posses daquele que fez o voto\" (Lv 27:8). Como Ana, que votou o filho ao Senhor, também a mulher israelita entra por inteiro na consagração voluntária (1Sm 1:11,28).",
    },
    anciao: {
      title: "O homem de sessenta anos e acima",
      subtitle: "Levítico 27 • a avaliação da velhice",
      text: "É o ancião de Israel apresentado ao sacerdote no voto: \"de sessenta anos e acima, pelo homem a tua avaliação será de quinze siclos\" (Lv 27:7). O número cai porque a força de trabalho declinou, mas o velho continua avaliável e consagrável — ninguém envelhece para fora do serviço de Deus. O mesmo livro manda levantar-se \"diante das cãs\" e honrar a face do ancião (Lv 19:32); e a Escritura promete que os plantados na casa do Senhor \"na velhice ainda darão frutos\" (Sl 92:13-14).",
    },
  },
};
