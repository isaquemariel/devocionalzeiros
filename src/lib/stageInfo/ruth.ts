// Fichas ESPECÍFICAS por (capítulo → papel) do livro de RUTE.
// "Nos dias em que os juízes julgavam" (Rt 1:1): a fome na casa do pão, o
// desterro em Moabe, a viuvez, a volta a Belém, a sega das cevadas, o remidor à
// porta e a linhagem que desemboca em Davi. Cada figurante anônimo da cena é
// alguém REAL daquele capítulo — nunca "habitante da cena".
import type { StageInfo } from "@/lib/rpgStageInfo";

export const CHAPTER_ACTORS: Record<number, Record<string, StageInfo>> = {
  // ------------------------------------------------------------------ Rt 1
  1: {
    homem: {
      title: "Elimeleque e seus filhos, Malom e Quiliom",
      subtitle: "Rute 1 • os homens de Belém que morreram em Moabe",
      text: "Elimeleque — cujo nome diz \"meu Deus é rei\", justamente nos dias em que \"não havia rei em Israel\" — era efrateu de Belém de Judá, e a fome o levou a peregrinar nos campos de Moabe com a mulher e os dois filhos (Rt 1:1-2). Ali morreu ele; ali morreram também Malom e Quiliom, que haviam tomado mulheres moabitas, deixando Noemi \"desamparada dos seus dois filhos e de seu marido\" (Rt 1:5). Faltou pão na própria \"casa do pão\", e a família que buscou vida fora da herança achou três sepulturas em terra estranha — o vazio em que Deus começará a escrever a linhagem de Davi. No fim do capítulo, os homens em cena já são os segadores de Belém no princípio da sega das cevadas (Rt 1:22): o Senhor \"tinha visitado o seu povo, dando-lhe pão\" (Rt 1:6).",
    },
    mulherComum: {
      title: "As três viúvas da casa de Elimeleque — e as vizinhas de Belém",
      subtitle: "Rute 1 • Noemi, Orfa e Rute na estrada; as mulheres que as recebem à porta",
      text: "Noemi, Orfa e Rute são três mulheres sem marido e sem filhos, e no Israel antigo isso significava ficar sem pão e sem futuro. Noemi as despede com bênção — \"o Senhor vos dê que acheis descanso cada uma em casa de seu marido\" (Rt 1:9) —, Orfa beija a sogra e volta \"ao seu povo e aos seus deuses\" (Rt 1:15), e Rute se apega a ela com o voto que muda a história: \"o teu povo é o meu povo, o teu Deus é o meu Deus\" (Rt 1:16). Chegando a Belém, as mulheres da cidade — as mesmas que a viram partir dez anos antes — se admiram e perguntam \"Não é esta Noemi?\", e é a elas que ela responde: \"não me chameis Noemi; chamai-me Mara... cheia parti, porém vazia o Senhor me fez tornar\" (Rt 1:19-21). Não são figurantes: é diante dessas vizinhas que a amargura recebe nome, e serão elas que no fim bendirão o Senhor \"que não deixou hoje de te dar remidor\" (Rt 4:14).",
    },
    multidao: {
      title: "Toda a cidade de Belém",
      subtitle: "Rute 1:19-21 • a cidade que se comove ao ver Noemi voltar",
      text: "\"Entrando elas em Belém, toda a cidade se comoveu por causa delas, e diziam: Não é esta Noemi?\" (Rt 1:19). São os vizinhos, parentes e conhecidos que a viram partir dez anos antes — casada, com dois filhos e algum bem — e a veem tornar viúva, sem filhos e acompanhada apenas de uma moabita. Diante deles Noemi faz a sua confissão amarga: \"Cheia parti, porém vazia o Senhor me fez tornar\" (Rt 1:21). A mesma cidade que a vê vazia será testemunha, três capítulos depois, de que o Senhor não a deixou sem remidor (Rt 4:14).",
    },
  },

  // ------------------------------------------------------------------ Rt 2
  2: {
    homem: {
      title: "Os segadores de Boaz e o moço posto sobre eles",
      subtitle: "Rute 2 • a sega das cevadas no campo de Belém",
      text: "São os trabalhadores da colheita de Boaz e o capataz \"que estava posto sobre os segadores\" (Rt 2:5-6) — o moço que sabe quem é a respigadora e responde ao seu senhor: \"Esta é a moça moabita que voltou com Noemi dos campos de Moabe\". A saudação que trocam com o dono do campo, \"O Senhor seja convosco… O Senhor te abençoe\" (Rt 2:4), revela um trabalho ainda vivido diante de Deus, coisa rara na época dos juízes. Por ordem de Boaz, eles não a molestam, deixam-na respigar até entre as gavelas e ainda deixam cair punhados de propósito (Rt 2:9,15-16) — a lei da respiga do pobre e do estrangeiro (Lv 19:9-10; Dt 24:19) cumprida com generosidade que excede a letra.",
    },
    mulherComum: {
      title: "As moças de Boaz na sega",
      subtitle: "Rute 2 • as criadas em cujo meio Rute acha abrigo",
      text: "São as servas que trabalham na colheita de Boaz, e a elas Rute é confiada: \"aqui ficarás com as minhas moças\" (Rt 2:8), \"melhor é, filha minha, que saias com as suas moças, para que noutro campo não te encontrem\" (Rt 2:22). No meio delas a estrangeira deixa de ser presa fácil e passa a ser gente da casa — e ali fica \"até que a sega das cevadas e dos trigos se acabou\" (Rt 2:23). Junto delas se cumpre a bênção que Boaz pronunciou sobre Rute: veio abrigar-se \"sob cujas asas\" do Deus de Israel (Rt 2:12), e as asas de Deus tomam a forma concreta de um campo seguro e de companhia honesta.",
    },
  },

  // ------------------------------------------------------------------ Rt 3
  3: {
    homem: {
      title: "O dono da eira, na noite da padejadura",
      subtitle: "Rute 3 • o remidor que dorme junto ao monte de grãos",
      text: "O homem desta cena é o senhor da colheita que \"esta noite padejará a cevada na eira\" (Rt 3:2) — a debulha se ventilava à noite, quando corria a brisa, e o dono dormia ao pé do monte de grãos para guardar o fruto do ano. Ali, à meia-noite, ele estremece e acha uma mulher a seus pés, que lhe pede: \"estende pois tua capa sobre a tua serva, porque tu és o remidor\" (Rt 3:9). Estender a capa (a mesma \"aba\" das asas de Deus, Rt 2:12) é assumir por inteiro o encargo do parente resgatador da lei — casa, nome e herança do falecido (Lv 25:25; Dt 25:5-6). Ele responde com juramento e com honra: guarda o segredo, reconhece que há um remidor mais chegado, e não descansa até concluir o negócio (Rt 3:12-13,18).",
    },
    mulherComum: {
      title: "A sogra e a nora que buscam descanso",
      subtitle: "Rute 3 • Noemi instrui, Rute desce à eira",
      text: "Noemi deixa de ser apenas a mulher amargurada do capítulo 1 e volta a agir como mãe em Israel: \"minha filha, não hei de buscar descanso, para que fiques bem?\" (Rt 3:1) — o mesmo \"descanso\" que ela pedira em vão sobre as noras na estrada de Moabe (Rt 1:9). Ensina a nora a lavar-se, ungir-se, vestir-se e descer à eira, e Rute responde com a obediência de sempre: \"Tudo quanto me disseres, farei\" (Rt 3:5). O gesto não é sedução, mas apelo legal e humilde de uma viúva pobre ao seu resgatador — e Boaz o entende assim: \"toda a cidade do meu povo sabe que és mulher virtuosa\" (Rt 3:11), a mulher de valor que Provérbios celebraria (Pv 31:10).",
    },
  },

  // ------------------------------------------------------------------ Rt 4
  4: {
    anciao: {
      title: "Os dez anciãos da porta de Belém",
      subtitle: "Rute 4:2-11 • o tribunal da cidade, à porta",
      text: "\"Então tomou dez homens dos anciãos da cidade, e disse: Assentai-vos aqui\" (Rt 4:2). A porta era o fórum de Israel: ali se julgavam causas, se fechavam compras e se davam testemunhos públicos (Dt 21:19; 25:7), e dez varões formavam o número de uma assembleia legítima. Diante deles Boaz expõe o caso da parte da terra de Elimeleque e do dever de suscitar \"o nome do falecido sobre a sua herança\" (Rt 4:5,9-10). Não são figurantes: são as testemunhas que tornam legal e pública a redenção, e da boca deles sai a bênção sobre Rute — \"como a Raquel e como a Lia, que ambas edificaram a casa de Israel\" (Rt 4:11).",
    },
    homem: {
      title: "O remidor mais chegado — e o menino Obede",
      subtitle: "Rute 4 • quem recusa resgatar, e o filho que nasce do resgate",
      text: "O parente com direito anterior é chamado por Boaz apenas de \"Ó fulano\" (Rt 4:1): a Escritura, de propósito, não guarda o nome de quem não quis redimir. Ele aceita a terra, mas recua ao saber que com ela vem Rute e o dever de levantar o nome do morto — \"para que não prejudique a minha herança\" (Rt 4:6) — e descalça o sapato, gesto que em Israel confirmava toda a permuta (Rt 4:7-8). Perde o nome e a herança que temia perder, enquanto Boaz, que pagou o preço, é lembrado até no Evangelho (Mt 1:5). Do resgate nasce Obede, o menino que Noemi põe no colo e que a Escritura apresenta assim: \"Este é o pai de Jessé, pai de Davi\" (Rt 4:17,21-22).",
    },
    mulherComum: {
      title: "As vizinhas de Belém",
      subtitle: "Rute 4:14-17 • as mulheres que dão nome ao menino",
      text: "São as vizinhas que dez anos antes se espantaram com a volta de Noemi vazia e agora bendizem por ela: \"Bendito seja o Senhor, que não deixou hoje de te dar remidor\" (Rt 4:14). Chamam o menino de restaurador da alma e sustento da velhice de Noemi, e dizem à sogra a maior palavra do livro sobre Rute: \"tua nora, que te ama… ela te é melhor do que sete filhos\" (Rt 4:15). São elas que lhe dão o nome, Obede — \"servo\" —, dizendo \"A Noemi nasceu um filho\" (Rt 4:17). O coro anônimo da cidade fecha a história que a cidade abrira, e sem o saber nomeia o avô de Davi.",
    },
    multidao: {
      title: "Todo o povo que estava na porta",
      subtitle: "Rute 4:9-12 • as testemunhas do resgate em Belém",
      text: "\"Sois hoje testemunhas de que tomei tudo quanto foi de Elimeleque… e de que também tomo por mulher a Rute, a moabita\" (Rt 4:9-10); e o povo responde: \"Somos testemunhas\" (Rt 4:11). É a assembleia de Belém que legitima o resgate e o abençoa invocando Raquel e Lia, que edificaram a casa de Israel, e a casa de Perez, que Tamar deu a Judá (Rt 4:11-12) — memória de que Deus já havia enxertado uma estrangeira naquela linhagem. Este povo não sabe o alcance do que testemunha: a moabita que acolhem entra na descendência de Davi e do Messias (Mt 1:5-6).",
    },
    patriarca: {
      title: "As gerações de Perez",
      subtitle: "Rute 4:18-22 • de Perez, filho de Judá, até Jessé",
      text: "Os dez nomes que fecham o livro — Perez, Hezrom, Rão, Aminadabe, Naassom, Salmom, Boaz, Obede, Jessé, Davi — não são apêndice, são a tese: a fome, o desterro e a viuvez desembocam num trono. Perez nasceu de Judá e Tamar (Gn 38:29), Naassom foi príncipe de Judá no deserto (Nm 1:7; 2:3) e Salmom, segundo o Evangelho, foi marido de Raabe (Mt 1:5). Uma genealogia costurada de escândalos e estrangeiras, guardada por Deus através dos séculos dos juízes. Nela o Senhor prova que conduz a história silenciosamente, pelo dever cumprido de um homem justo e pela fidelidade de uma viúva moabita.",
    },
    rei: {
      title: "Davi, o bisneto de Rute",
      subtitle: "Rute 4:17,22 • o rei para onde o livro inteiro caminhava",
      text: "\"Obede gerou a Jessé, e Jessé gerou a Davi\" (Rt 4:22): a última palavra do livro é o nome do rei que Deus daria a Israel — o pastor de Belém, ungido por Samuel entre os filhos de Jessé (1Sm 16:1,13). Num tempo em que \"cada um fazia o que parecia bem aos seus olhos\" (Jz 21:25), o livro de Rute mostra Deus preparando, na cozinha e na eira de uma família pobre, o trono que traria justiça. E a promessa não para em Davi: dele viria o Filho que nasceria na mesma Belém (Mq 5:2; Mt 1:5-6), o Remidor de que Boaz foi apenas a sombra.",
    },
  },
};
