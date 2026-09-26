import type { Fala } from "./tipos";

/**
 * O QUE O DEVOCIONALZEIRO SABE SOBRE O SEU NOME.
 *
 * "Prazer, Ana!" é o que qualquer formulário diria. Ele conhece a Bíblia — então,
 * quando o nome é de alguém dela, ele lembra quem foi. É a primeira resposta
 * da jornada, e é ali que a pessoa descobre que está falando com um
 * personagem, não com um campo de cadastro.
 *
 * Toda citação entre aspas confere com a ARC (`public/bible/arc.json`) — o
 * `scripts/test-jornada.mjs` procura cada uma no texto —; o que não está entre
 * aspas é paráfrase e se apresenta como tal. A chave é o
 * primeiro nome sem acento e em minúsculas.
 */
const BIBLICOS: Record<string, string> = {
  ana: "Ana, como a mãe de Samuel — a mulher que orou até ser ouvida (1Sm 1).",
  maria: "Maria! Nome de quem disse \"cumpra-se em mim segundo a tua palavra\" (Lc 1:38).",
  joao: "João, o discípulo que escreveu tanto sobre amor. Nome bonito de carregar.",
  pedro: "Pedro! Que também começou afundando na água — e Jesus segurou a mão dele (Mt 14).",
  paulo: "Paulo, o das treze cartas do Novo Testamento. Tem história pra contar, hein?",
  davi: "Davi! Nome de rei — e do pastor que escreveu boa parte dos Salmos.",
  daniel: "Daniel, o que orava três vezes no dia com as janelas abertas (Dn 6:10).",
  samuel: "Samuel, o menino que respondeu: \"Fala, porque o teu servo ouve\" (1Sm 3:10).",
  lucas: "Lucas, o médico que se informou de tudo \"desde o princípio\" antes de escrever (Lc 1:3).",
  tiago: "Tiago! O da carta que manda ser \"cumpridores da palavra, e não somente ouvintes\".",
  mateus: "Mateus, o cobrador de impostos que largou a mesa quando Jesus chamou (Mt 9:9).",
  marcos: "Marcos, o evangelho mais curto e mais ligeiro. Gosto do ritmo.",
  sara: "Sara, que riu da promessa e depois disse: \"Deus me tem feito riso\" (Gn 21:6).",
  rute: "Rute! \"Aonde quer que tu fores irei eu.\" Acho que a gente vai se dar bem.",
  ester: "Ester, a rainha que falou na hora em que falar era perigoso. Coragem no nome.",
  debora: "Débora, juíza e profetisa, que julgava debaixo de uma palmeira (Jz 4:5).",
  raquel: "Raquel! Por ela, Jacó serviu sete anos, e foram aos olhos dele \"como poucos dias\".",
  rebeca: "Rebeca, a que tirou água até para os camelos de um estranho (Gn 24).",
  isaque: "Isaque quer dizer riso. A gente já começou bem.",
  jose: "José — o dos sonhos, no Gênesis, ou o carpinteiro de Nazaré? Os dois souberam esperar.",
  gabriel: "Gabriel, o nome do anjo que levou a notícia a Maria. Chegou com notícia boa, então.",
  miguel: "Miguel, como o arcanjo! Vou subir essa trilha com mais coragem.",
  elias: "Elias! O do fogo que desceu no Carmelo (1Rs 18). Você entende de chama.",
  jonas: "Jonas, o que foi pro lado errado — e Deus foi buscar mesmo assim.",
  noemi: "Noemi, que voltou a Belém de mãos vazias e viu Deus refazer a família (Rt 1).",
  josue: "Josué! \"Esforça-te, e tem bom ânimo.\" Vou lembrar disso na subida (Js 1:9).",
  moises: "Moisés, o da sarça que ardia e não se consumia. Olha a gente falando de fogo de novo.",
  benjamim: "Benjamim, o caçula de Jacó. O nome quer dizer filho da mão direita.",
  benjamin: "Benjamim, o caçula de Jacó. O nome quer dizer filho da mão direita.",
  miria: "Miriã, que pegou o tamboril e puxou o louvor depois do mar (Êx 15:20).",
  miriam: "Miriã, que pegou o tamboril e puxou o louvor depois do mar (Êx 15:20).",
  marta: "Marta! Jesus amava aquela casa de Betânia — está escrito assim mesmo (Jo 11:5).",
  tome: "Tomé, o que precisou ver pra crer. Aqui pode perguntar à vontade.",
  andre: "André, o que foi correndo buscar o irmão pra conhecer Jesus (Jo 1:41).",
  filipe: "Filipe, o do \"Vem, e vê\" (Jo 1:46). É o que a gente vai fazer agora.",
  felipe: "Felipe, como o Filipe do \"Vem, e vê\" (Jo 1:46). É o que a gente vai fazer agora.",
  timoteo: "Timóteo, que conhecia as Escrituras desde criança (2Tm 3:15).",
  priscila: "Priscila, que ensinava a Palavra na própria casa (At 18:26).",
  lidia: "Lídia, a vendedora de púrpura que abriu a casa em Filipos (At 16).",
  abigail: "Abigail, a mulher sensata que evitou uma guerra com uma conversa (1Sm 25).",
  eva: "Eva, o primeiro nome de mulher da Bíblia. Começo de tudo.",
  estevao: "Estêvão, cheio de fé, que viu os céus abertos (At 7:56).",
  caleb: "Calebe, que aos oitenta e cinco pediu o monte mais difícil (Js 14). Que fôlego!",
  calebe: "Calebe, que aos oitenta e cinco pediu o monte mais difícil (Js 14). Que fôlego!",
  natanael: "Natanael, de quem Jesus disse: \"Eis aqui um verdadeiro israelita\" (Jo 1:47).",
  levi: "Levi, a tribo que cuidava do santuário. Nome de quem serve.",
  gideao: "Gideão! Com trezentos homens e umas tochas dentro de cântaros (Jz 7).",
  sofia: "Sofia quer dizer sabedoria — e Provérbios diz que ela vale mais que rubis.",
};

/** frases para os nomes que não estão na lista — escolhidas pelo próprio nome */
const COMUNS: ((n: string) => string)[] = [
  (n) => `${n}. Gostei de como soa. Vou gravar direitinho aqui.`,
  (n) => `${n}! Nome gravado. Agora essa pedra é sua.`,
  (n) => `Prazer, ${n}. Esse nome combina com trilha.`,
];

const semAcento = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");

/** a reação ao nome — a mesma para o mesmo nome, sempre */
export function reacaoAoNome(apelido: string): Fala {
  const nome = apelido.trim().replace(/\s+/g, " ");
  const chave = semAcento(nome.split(" ")[0] ?? "").toLowerCase();
  const fato = BIBLICOS[chave];
  if (fato) return { texto: fato, expressao: "radiante", gesto: "comemorar" };
  let h = 0;
  for (const c of chave) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return { texto: COMUNS[h % COMUNS.length](nome.split(" ")[0]), expressao: "feliz", gesto: "acenar" };
}

export const NOMES_BIBLICOS = Object.keys(BIBLICOS);
