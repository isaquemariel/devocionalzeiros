// Fichas ESPECÍFICAS por (capítulo → papel) de numbers — quem é aquela figura
// (mesmo anônima na Bíblia) no contexto daquele capítulo, biblicamente e
// teologicamente. Vence a ficha genérica do papel. Preenchido pelo agente.
import type { StageInfo } from "@/lib/rpgStageInfo";
export const CHAPTER_ACTORS: Record<number, Record<string, StageInfo>> = {
  1: {
    multidao: {
      title: "Israel recenseado no Sinai",
      subtitle: "Números 1 • o censo dos filhos de Israel",
      text: "A congregação dos filhos de Israel, contada tribo por tribo no deserto do Sinai um ano após o Êxodo — todo homem de vinte anos para cima que podia \"sair à guerra\" (Nm 1:3). Não é multidão anônima: é o exército do SENHOR sendo organizado para herdar a promessa, cada nome conhecido e chamado. O número (603.550) mostra Deus cumprindo a palavra dada a Abraão de multiplicar a sua semente (Gn 15:5).",
    },
  },
  2: {
    multidao: {
      title: "Israel acampado por tribos",
      subtitle: "Números 2 • o arraial em torno do tabernáculo",
      text: "As doze tribos dispostas em quadra ao redor da tenda da congregação, cada uma sob o seu estandarte — três a oriente, três ao sul, três ao ocidente, três ao norte (Nm 2:2). A ordem não é só militar: revela que o povo só existe com Deus habitando no meio dele. Já prefigura o acampamento dos remidos ao redor do trono (Ap 7:9).",
    },
  },
  5: {
    multidao: {
      title: "A congregação sob a lei da pureza",
      subtitle: "Números 5 • a santidade do arraial",
      text: "Israel recebe as leis que guardam a santidade do arraial onde Deus habita: os imundos postos fora, a restituição do dano e a prova das águas amargas para a suspeita de adultério (Nm 5:2,27). O povo aprende que a presença santa exige um povo santo. Cada ordenança protege a aliança e ensina que o pecado oculto não escapa aos olhos de Deus.",
    },
  },
  6: {
    multidao: {
      title: "Israel e o voto de nazireu",
      subtitle: "Números 6 • separação e bênção sacerdotal",
      text: "Diante de todo o povo institui-se o voto do nazireu — homem ou mulher que se separa \"para o SENHOR\" (Nm 6:2) — e a bênção com que Arão havia de abençoá-los: \"O SENHOR te abençoe e te guarde\" (Nm 6:24). A congregação é chamada à consagração e recebe sobre si o Nome de Deus (Nm 6:27). Aponta para Cristo, o verdadeiro Separado, e para a bênção que repousa sobre a Igreja.",
    },
  },
  8: {
    multidao: {
      title: "Israel e a oferta dos levitas",
      subtitle: "Números 8 • os levitas dados em lugar do povo",
      text: "A congregação apresenta os levitas diante do SENHOR, pondo as mãos sobre eles como oferta movida do meio dos filhos de Israel (Nm 8:10-11). Eles servem em lugar de todo primogênito, que pertence a Deus desde a Páscoa (Nm 8:17). O povo aprende que se aproxima do santo somente por meio de mediadores separados — sombra do sacerdócio de Cristo.",
    },
  },
  9: {
    multidao: {
      title: "Israel guiado pela nuvem",
      subtitle: "Números 9 • a segunda Páscoa e a coluna",
      text: "O povo celebra a Páscoa no deserto e caminha ao mando da nuvem que cobre o tabernáculo: partiam ou permaneciam \"segundo o mandado do SENHOR\" (Nm 9:18,23). Israel não escolhe o próprio rumo; vive na obediência à presença visível de Deus. A nuvem de dia e o fogo de noite prefiguram o Espírito que conduz o povo peregrino.",
    },
  },
  10: {
    multidao: {
      title: "Israel partindo do Sinai",
      subtitle: "Números 10 • a primeira jornada rumo à promessa",
      text: "Ao som das trombetas de prata, a congregação levanta acampamento pela primeira vez e marcha em ordem, tribo após tribo, com a arca à frente buscando lugar de descanso (Nm 10:33). Depois de quase um ano no Sinai, o povo enfim se move para Canaã. \"Levanta-te, SENHOR\" (Nm 10:35) torna-se o grito do povo em marcha atrás do seu Deus.",
    },
  },
  11: {
    multidao: {
      title: "O povo que se queixa",
      subtitle: "Números 11 • as murmurações em Taberá e Quibrote-Taavá",
      text: "A multidão, cansada do maná, chora por carne e relembra os peixes do Egito (Nm 11:5), acendendo a ira do SENHOR. É o mesmo povo redimido tornando-se ingrato diante do pão do céu. A sua queixa não era por fome, mas por desprezo da graça — advertência para os que \"tentaram a Deus no deserto\" (Sl 78:18).",
    },
    homem: {
      title: "Os que cobiçaram a carne",
      subtitle: "Números 11 • a praga em Quibrote-Taavá",
      text: "Os homens do arraial que se deixaram levar pelo desejo, ajuntando as codornizes com avidez enquanto a carne ainda estava entre os seus dentes (Nm 11:33). A Escritura não os nomeia, mas os sepulta: ali se chamou o lugar \"as sepulturas da concupiscência\" (Nm 11:34). Retrato do coração que prefere o Egito ao Provedor.",
    },
    mulherComum: {
      title: "As mulheres do arraial faminto",
      subtitle: "Números 11 • o povo às portas das tendas",
      text: "As mulheres de Israel que, com as suas famílias, choravam à porta das tendas ansiando pela fartura do Egito (Nm 11:10). Anônimas, representam o lar inteiro contagiado pela murmuração. A cobiça que começou na \"multidão de estranhos\" (Nm 11:4) espalhou-se por todo o povo, mostrando como a ingratidão se propaga.",
    },
  },
  12: {
    multidao: {
      title: "A congregação que espera por Miriã",
      subtitle: "Números 12 • a lepra da profetisa",
      text: "Todo o povo faz alto e não parte enquanto Miriã, ferida de lepra por murmurar contra Moisés, permanece sete dias fora do arraial (Nm 12:15). A congregação suporta o preço da rebeldia de um só. Aprende-se que falar contra o servo que Deus escolheu — \"fiel em toda a minha casa\" (Nm 12:7) — é falar contra o próprio SENHOR.",
    },
  },
  13: {
    multidao: {
      title: "A congregação diante do relato dos espias",
      subtitle: "Números 13 • o regresso de Canaã",
      text: "O povo reunido em Cades ouve os doze que espiaram a terra: fartos cachos de Escol numa terra que \"mana leite e mel\", mas cercada de gigantes (Nm 13:27-28). A congregação está à beira da promessa, e tudo dependerá de crer ou temer. É a hora do teste da fé de toda uma geração.",
    },
    homem: {
      title: "Os dez espias incrédulos",
      subtitle: "Números 13 • o mau relatório da terra",
      text: "Os príncipes das tribos que, tendo visto a bondade da terra, espalharam \"mau relatório\", dizendo-se gafanhotos diante dos filhos de Anaque (Nm 13:32-33). Contra eles se levantam Calebe e Josué. Estes homens mediram a promessa pela própria fraqueza, esquecendo Aquele que os tirara do Egito — pecado que custaria quarenta anos ao povo.",
    },
  },
  14: {
    multidao: {
      title: "A congregação que se rebela",
      subtitle: "Números 14 • o choro e a incredulidade em Cades",
      text: "A multidão levanta a voz e chora a noite toda, querendo eleger um capitão para voltar ao Egito e apedrejar Calebe e Josué (Nm 14:4,10). Ao rejeitar a terra, rejeita o SENHOR que a prometeu. Por isso a sentença: nenhum dos maiores de vinte anos entrará, e os seus cadáveres cairão no deserto por quarenta anos (Nm 14:29-34).",
    },
    homem: {
      title: "Os homens condenados ao deserto",
      subtitle: "Números 14 • a geração que não entrará",
      text: "Os guerreiros contados no Sinai que, por incredulidade, ouvem que os seus corpos hão de cair no deserto e não verão a terra (Nm 14:29). \"Não puderam entrar por causa da incredulidade\" (Hb 3:19). São o retrato solene de uma redenção começada e desperdiçada pela desconfiança do coração.",
    },
    mulherComum: {
      title: "As mulheres da geração incrédula",
      subtitle: "Números 14 • as mães do deserto",
      text: "As mulheres de Israel que choraram com o povo e temeram por seus filhos, dos quais Deus dissera que seriam \"por presa\" (Nm 14:3). O SENHOR volta contra elas a própria palavra: justamente esses pequeninos entrariam na terra que os pais desprezaram (Nm 14:31). Ergueram no deserto uma geração para a promessa que elas mesmas não viveram.",
    },
  },
  15: {
    multidao: {
      title: "Israel e as leis da terra",
      subtitle: "Números 15 • ofertas, franjas e a aliança lembrada",
      text: "Ainda no deserto, a congregação recebe as ordenanças para \"quando entrardes na terra\" (Nm 15:2) — sinal de que a promessa continua de pé apesar da rebeldia. Manda-se pôr franjas nas vestes para lembrar todos os mandamentos e não seguir o próprio coração (Nm 15:39). Entre a graça e a santidade, o violador do sábado é apedrejado (Nm 15:36).",
    },
  },
  16: {
    multidao: {
      title: "A congregação na rebelião de Coré",
      subtitle: "Números 16 • a contenda contra Moisés e Arão",
      text: "O povo se ajunta em torno de Coré e dos que dizem \"toda a congregação é santa\" para se levantarem contra Moisés (Nm 16:3). No dia seguinte murmuram de novo: \"vós matastes o povo do SENHOR\" (Nm 16:41). A multidão precisa ser separada da tenda para não perecer, e só a expiação de Arão detém a praga (Nm 16:48).",
    },
    homem: {
      title: "Coré, Datã e Abirão",
      subtitle: "Números 16 • os que a terra tragou",
      text: "Coré, o levita, com Datã e Abirão de Rúben, que cobiçaram o sacerdócio e desafiaram a autoridade dada por Deus (Nm 16:10). A terra abre a boca e os traga vivos com as suas casas ao Seol (Nm 16:32-33). Tornaram-se sinal perpétuo de que ninguém toma para si a honra sacerdotal senão o chamado por Deus (Hb 5:4; Jd 11).",
    },
    mulherComum: {
      title: "As mulheres e filhos dos rebeldes",
      subtitle: "Números 16 • as casas tragadas pela terra",
      text: "As esposas e os pequeninos das tendas de Datã e Abirão, que ficaram à porta e desceram vivos à sepultura com os seus (Nm 16:27,32). A Escritura registra o peso terrível do pecado que arrasta a casa inteira. Ainda assim, \"os filhos de Coré não morreram\" (Nm 26:11) e cantariam nos salmos — sinal da misericórdia que resta.",
    },
  },
  17: {
    multidao: {
      title: "Israel diante das varas das tribos",
      subtitle: "Números 17 • a vara de Arão que floresceu",
      text: "Depois da praga, a congregação vê doze varas postas diante do SENHOR, uma por tribo; só a de Arão brota, floresce e dá amêndoas (Nm 17:8). Deus encerra de vez a contenda sobre quem pode achegar-se. O povo clama \"eis aqui, perecemos\" (Nm 17:12), aprendendo que a vida está no sacerdote que Ele mesmo escolheu — figura de Cristo.",
    },
  },
  20: {
    multidao: {
      title: "O povo sem água em Cades",
      subtitle: "Números 20 • a contenda de Meribá",
      text: "A nova geração, reunida em Cades onde morre Miriã, contende com Moisés por falta de água, repetindo a murmuração dos pais (Nm 20:3-5). Deus manda falar à rocha, mas Moisés a fere; ainda assim brotam águas para o povo e para os seus animais (Nm 20:11). A rocha ferida no deserto é figura de Cristo, de quem \"todos beberam\" (1Co 10:4).",
    },
  },
  21: {
    multidao: {
      title: "O povo mordido pelas serpentes",
      subtitle: "Números 21 • a serpente de bronze",
      text: "Israel se impacienta no caminho e fala contra Deus e Moisés, enfadado do \"pão tão vil\" (Nm 21:5); vêm as serpentes ardentes e muitos morrem. Ao olhar para a serpente de bronze na haste, o mordido vive (Nm 21:9). O próprio Cristo lê aqui a sua cruz: \"assim importa que o Filho do homem seja levantado\" (Jo 3:14).",
    },
  },
  22: {
    multidao: {
      title: "Israel acampado nas campinas de Moabe",
      subtitle: "Números 22 • o povo que Balaque temeu",
      text: "A congregação, tão numerosa que \"cobre a face da terra\" (Nm 22:5), acampa nas planícies de Moabe, e Balaque, aterrorizado, contrata Balaão para amaldiçoá-la. O povo nem sabe da guerra travada nos céus a seu favor. Israel é o povo que nenhuma maldição alcança, porque Deus decidiu abençoá-lo (Nm 23:8).",
    },
  },
  23: {
    multidao: {
      title: "Israel abençoado por Balaão",
      subtitle: "Números 23 • as maldições transformadas em bênção",
      text: "Do alto dos montes, Balaão contempla o povo que habita só e \"não será contado entre as gentes\" (Nm 23:9), e não acha encanto contra Jacó. O que se pretendia maldição sai bênção: \"Deus não é homem, para que minta\" (Nm 23:19). Israel é visto como Deus o vê — sem que se enxergue iniquidade em Jacó (Nm 23:21).",
    },
  },
  25: {
    multidao: {
      title: "Israel em Baal-Peor",
      subtitle: "Números 25 • a prostituição com Moabe",
      text: "O povo que nenhuma maldição venceu de fora cai por dentro: prostitui-se com as filhas de Moabe e curva-se a Baal-Peor (Nm 25:1-3). O que Balaão não pôde amaldiçoar, ensinou a seduzir (Nm 31:16; Ap 2:14). Acende-se a ira do SENHOR, e a praga só cessa pelo zelo de Fineias — lição de que o pecado consumado dentro custa mais que o inimigo de fora.",
    },
  },
  26: {
    multidao: {
      title: "A nova geração recenseada em Moabe",
      subtitle: "Números 26 • o segundo censo, às portas de Canaã",
      text: "Depois da praga, conta-se de novo o povo nas campinas de Moabe: os filhos daqueles que caíram no deserto, pois \"nenhum deles ficou, senão Calebe e Josué\" (Nm 26:65). Esta multidão herdará a terra que os pais desprezaram. O censo divide as heranças por sorte (Nm 26:55) — a fidelidade de Deus recomeça numa geração inteira.",
    },
  },
  27: {
    multidao: {
      title: "A congregação e a herança das filhas de Zelofeade",
      subtitle: "Números 27 • justiça na herança e o sucessor de Moisés",
      text: "Diante de toda a congregação, as filhas de Zelofeade pedem o direito à herança do pai que morreu sem filhos, e Deus lhes faz justiça (Nm 27:7). Ali também Moisés recebe Josué como sucessor, para que o povo não fique \"como ovelhas que não têm pastor\" (Nm 27:17). A congregação é conduzida com equidade e cuidado pastoral rumo à terra.",
    },
    rebanho: {
      title: "O rebanho sem pastor",
      subtitle: "Números 27 • a imagem da congregação",
      text: "Moisés pede um sucessor para que a congregação do SENHOR não seja \"como ovelhas que não têm pastor\" (Nm 27:17) — o povo é o rebanho de Deus, que precisa de quem o faça sair e entrar. A imagem atravessa a Escritura até Jesus, que se compadece das multidões por serem como ovelhas sem pastor (Mc 6:34) e se dá como o Bom Pastor (Jo 10:11).",
    },
  },
  28: {
    rebanho: {
      title: "Os cordeiros do sacrifício contínuo",
      subtitle: "Números 28 • o holocausto perpétuo",
      text: "Os animais das ofertas ordenadas dia após dia: dois cordeiros de um ano, um pela manhã e outro à tarde, em holocausto contínuo diante do SENHOR (Nm 28:3-4). O rebanho de Israel sobe ao altar como \"cheiro suave\", sustentando a comunhão com Deus. Cada cordeiro sem defeito aponta para \"o Cordeiro de Deus, que tira o pecado do mundo\" (Jo 1:29).",
    },
  },
  29: {
    multidao: {
      title: "Israel nas festas do sétimo mês",
      subtitle: "Números 29 • trombetas, expiação e tabernáculos",
      text: "A congregação é chamada às solenidades do sétimo mês: o dia de jubilação das trombetas, a santa convocação da expiação em que \"afligireis as vossas almas\" (Nm 29:7), e os sete dias das cabanas com as suas muitas ofertas. Todo o ano do povo gira em torno do encontro com Deus. Estas festas prefiguram a redenção plena e o descanso final dos remidos.",
    },
  },
  31: {
    multidao: {
      title: "Israel em guerra contra Midiã",
      subtitle: "Números 31 • a vingança do SENHOR sobre os sedutores",
      text: "Mil de cada tribo saem à guerra santa contra Midiã, que seduzira Israel em Peor (Nm 31:2-3). O povo executa o juízo de Deus e reparte o despojo, dando a Ele o seu tributo. É a última campanha antes do Jordão, e ensina que a santidade do povo se guarda também contra quem quis destruí-lo por dentro.",
    },
  },
  33: {
    multidao: {
      title: "Israel em suas jornadas",
      subtitle: "Números 33 • as etapas desde o Egito",
      text: "A congregação cujas paradas, de Ramessés ao Jordão, Moisés registra por ordem do SENHOR (Nm 33:2) — memorial de quarenta anos de peregrinação e de fidelidade divina. Cada acampamento testemunha que Deus os guiou passo a passo. Aqui se ordena expulsar os moradores da terra, para que não sejam \"espinhos nos vossos olhos\" (Nm 33:55).",
    },
  },
  34: {
    multidao: {
      title: "Israel recebendo os limites da terra",
      subtitle: "Números 34 • as fronteiras de Canaã",
      text: "Ainda em Moabe, a congregação ouve traçados os limites da herança \"que vos há de cair em herança\" (Nm 34:2) e os nomes dos homens que a repartirão. A terra ainda não conquistada já é medida pela palavra de Deus, tão certa é a promessa. O povo recebe por dádiva o que Deus jurara aos pais.",
    },
  },
  35: {
    multidao: {
      title: "Israel e as cidades de refúgio",
      subtitle: "Números 35 • as cidades dos levitas e o abrigo do homicida",
      text: "A congregação separa quarenta e oito cidades aos levitas, seis delas de refúgio, para onde foge quem mata sem intenção até o juízo (Nm 35:11-12). Assim se guarda a terra, que não se profana com sangue inocente nem poupa o homicida voluntário (Nm 35:33). O refúgio prefigura o abrigo que há em Cristo para o pecador que a Ele se acolhe.",
    },
  },
  36: {
    multidao: {
      title: "As tribos guardando a herança",
      subtitle: "Números 36 • o casamento das filhas de Zelofeade",
      text: "Os cabeças da tribo de Manassés levam ao povo a questão: se as herdeiras casarem fora, a herança passará a outra tribo. Deus ordena que se casem dentro da própria tribo, \"para que cada um dos filhos de Israel possua a herança de seus pais\" (Nm 36:8). A congregação aprende que a herança dada por Deus deve ser guardada de geração em geração.",
    },
  },
};
