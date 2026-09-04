// ============================================================================
// ÊXODO 33–34 — roteiro do modo CENA VIVA (força-tarefa AT, onda Êxodo).
//
// Êx 33 — A PRESENÇA E A GLÓRIA: depois do bezerro, o povo pranteia e tira os
// atavios; Moisés arma a tenda da congregação fora do arraial, e a coluna de
// nuvem desce à porta — o Senhor fala com Moisés "face a face, como amigo".
// Moisés intercede ("se tu não fores, não nos faças subir") e pede: "mostra-me a
// tua glória"; Deus o põe na fenda da penha e passa, e ele o vê pelas costas.
//
// Êx 34 — A ALIANÇA RENOVADA E A FACE RESPLANDECENTE: novas tábuas; o Senhor
// desce na nuvem e proclama o Nome ("misericordioso e piedoso, tardio em
// irar-se"); renova a aliança e os mandamentos. Moisés desce após quarenta dias
// com o rosto RESPLANDECENTE, e põe um véu ao falar com o povo.
//
// A VOZ DE DEUS (regra do projeto): a presença é nuvem, glória e fogo — SEM
// figura. `by: "deus"` para a voz do céu; a glória que passa (33:22-23) e o Nome
// (34:6-7) são pura luz. A face de Moisés resplandece com `glow`.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------------------
// O ARRAIAL ao pé de Horebe, a TENDA da congregação fora do arraial, e a PENHA
// (a fenda da rocha) onde a glória passa. E o MONTE Sinai da renovação.
const ARRAIAL: StagePropSpec[] = [
  P("tent", -240, 1.1, undefined, 0.14),
  P("tent", -160, 0.95, undefined, 0.24),
  P("tent", 200, 1.05, undefined, 0.16),
  P("tent", 280, 0.9, undefined, 0.3),
  P("palm", 60, 0.9, undefined, 0.12),
  P("rock", -320, 0.9, undefined, 0.5),
  P("grass", -40, 0.85, undefined, 0.8),
];
const TENDA_FORA: StagePropSpec[] = [
  { ...P("tent", 0, 1.4, undefined, 0.36), tag: "tenda-congregacao" },
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1.05, undefined, 0.52),
  P("palm", 220, 0.9, undefined, 0.16),
  P("grass", -60, 0.8, undefined, 0.82),
];
const PENHA: StagePropSpec[] = [
  { ...P("rock", 20, 1.7, undefined, 0.3), tag: "fenda-penha" },
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1, undefined, 0.52),
  P("bush", -150, 0.75, undefined, 0.44),
];
const MONTE: StagePropSpec[] = [
  { ...P("rock", 0, 1.75, undefined, 0.24), tag: "monte-sinai" },
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1.05, undefined, 0.52),
  P("bush", -150, 0.75, undefined, 0.44),
  P("grass", -40, 0.78, undefined, 0.82),
];
const TABUAS: StagePropSpec[] = [
  { ...P("scroll", 50, 0.85, undefined, 0.5), tag: "tabuas-testemunho" },
  P("rock", 0, 1.7, undefined, 0.24),
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1.05, undefined, 0.52),
];

// ---------------------------------------------------------------------------
// AS FESTAS E OS PRIMOGÊNITOS (Êx 34:18-26). A lista das obrigações do ano tem
// um objeto por lei, e o cume mostra cada um deles enquanto a voz o nomeia: a
// mesa dos ázimos do mês de Abibe, o curral do que abre a madre, o jumento
// resgatado por um cordeiro, o descanso na aradura e na sega, a festa das
// semanas e a colheita do fim do ano, as três subidas de todo homem de Israel,
// as nações lançadas fora e o território alargado, a páscoa que não fica da
// noite para a manhã, e as primícias trazidas à casa do Senhor.
const FESTA_AZIMOS: StagePropSpec[] = [
  { ...P("stall", 70, 1.15, undefined, 0.46), tag: "mesa-azimos" },
  P("rock", 0, 1.6, undefined, 0.24),
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1.05, undefined, 0.52),
];
const CURRAL_PRIMOGENITOS: StagePropSpec[] = [
  { ...P("stall", 100, 1.1, undefined, 0.5), tag: "curral-primogenitos" },
  P("rock", 0, 1.6, undefined, 0.24),
  P("grass", -110, 0.8, undefined, 0.86),
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1.05, undefined, 0.52),
];
const RESGATE_JUMENTO: StagePropSpec[] = [
  P("donkey", 160, 1.0, undefined, 0.54),
  { ...P("stall", -70, 1.0, undefined, 0.48), tag: "curral-primogenitos" },
  P("rock", 0, 1.5, undefined, 0.22),
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 305, 1.05, undefined, 0.52),
];
const SEGA: StagePropSpec[] = [
  P("sheaf", 70, 1.05, undefined, 0.56),
  P("sheaf", 145, 0.95, undefined, 0.64),
  P("rock", 0, 1.5, undefined, 0.22),
  P("grass", -120, 0.85, undefined, 0.86),
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1.05, undefined, 0.52),
];
const COLHEITA: StagePropSpec[] = [
  P("sheaf", -70, 1.0, undefined, 0.58),
  P("sheaf", 5, 0.95, undefined, 0.66),
  P("grapes", 110, 1.0, undefined, 0.56),
  P("tree", 220, 1.0, undefined, 0.4),
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1.05, undefined, 0.52),
];
const TRES_VEZES: StagePropSpec[] = [
  P("rock", 0, 1.7, undefined, 0.22),
  P("palm", -230, 0.95, undefined, 0.16),
  P("palm", 245, 0.9, undefined, 0.18),
  P("grass", -80, 0.82, undefined, 0.86),
  P("rock", -320, 1.05, undefined, 0.5),
  P("rock", 320, 1, undefined, 0.52),
];
const NACOES_LANCADAS: StagePropSpec[] = [
  P("tower", -250, 0.85, undefined, 0.12),
  P("tower", 255, 0.8, undefined, 0.14),
  P("rock", 0, 1.6, undefined, 0.24),
  P("tree", 155, 0.95, undefined, 0.42),
  P("grass", -110, 0.85, undefined, 0.86),
  P("rock", -320, 1.05, undefined, 0.5),
];
const PASCOA_NOITE: StagePropSpec[] = [
  P("altar", 80, 1.15, 0.55, 0.46),
  P("rock", 0, 1.5, undefined, 0.22),
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 305, 1.05, undefined, 0.52),
];
const PRIMICIAS: StagePropSpec[] = [
  P("grapes", -60, 1.05, undefined, 0.56),
  P("sheaf", 25, 1.0, undefined, 0.64),
  P("crate", 110, 0.85, undefined, 0.68),
  P("tent", 230, 1.1, undefined, 0.4),
  P("rock", 0, 1.5, undefined, 0.22),
  P("rock", -300, 1.1, undefined, 0.5),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Êx 33
  // O luto do povo → a tenda fora do arraial e a coluna de nuvem → o diálogo
  // "face a face" e a intercessão → e a glória que passa pela fenda da penha.
  33: {
    start: { terrain: "desert", night: 0.26, glory: 0.45, storm: 0, fire: 0, verdure: 0.3 },
    beats: [
      b(1, { by: "deus", q: "Disse mais o SENHOR a Moisés: ", set: "arraial", cast: [C("moises", -20, "stand", { dy: 0.5, facing: 1 })], props: ARRAIAL, env: { terrain: "desert", glory: 0.5, night: 0.22 } }), // "vai, sobe daqui à terra que jurei a Abraão, Isaque e Jacó"
      b(2, { by: "deus" }), // "enviarei um anjo adiante de ti, e lançarei fora os cananeus e amorreus"
      b(3, { by: "deus", env: { glory: 0.62, night: 0.3 } }), // "terra que mana leite e mel; mas não subirei no meio de ti, povo de dura cerviz"
      b(4, { cast: [C("multidao", -30, "bow", { dy: 0.5 }), C("multidao", 60, "kneel", { scale: 0.9, dy: 0.56, id: "povo2" })], env: { glory: 0.25, night: 0.34 } }), // ouvindo a má notícia, o povo pranteia; ninguém põe seus atavios
      b(5, { env: { glory: 0.62, night: 0.34 }, by: "deus", q: "Dize aos filhos de Israel: " }), // "és povo de dura cerviz; tira os teus atavios, para que eu saiba o que fazer"
      b(6, { cast: [C("multidao", -30, "stand", { dy: 0.5 }), C("multidao", 60, "stand", { scale: 0.9, dy: 0.54, id: "povo2" })], env: { glory: 0.3, night: 0.28 } }), // os filhos de Israel se despojam dos atavios, ao pé de Horebe
      b(7, { set: "tenda", cast: [C("moises", -40, "walk", { dy: 0.5, facing: 1 }), C("multidao", 200, "stand", { scale: 0.85, dy: 0.46, id: "povo2", facing: -1 })], props: TENDA_FORA, env: { terrain: "desert", glory: 0.5, night: 0.2 } }), // Moisés arma a tenda da congregação fora do arraial; quem busca o Senhor sai a ela
      b(8, { cast: [C("moises", -20, "walk", { dy: 0.5, facing: 1 }), C("multidao", 180, "stand", { scale: 0.85, dy: 0.46, id: "povo2", facing: -1 }), C("multidao", 260, "stand", { scale: 0.8, dy: 0.5, id: "povo3", facing: -1 })], env: { glory: 0.5 } }), // ao sair Moisés, o povo se levanta e o olha, cada um à porta da sua tenda
      b(9, { cast: [C("moises", -10, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.8, night: 0.16 } }), // entrando Moisés, desce a coluna de nuvem à porta, e o Senhor fala com ele
      b(10, { cast: [C("moises", -10, "stand", { dy: 0.5, facing: 1 }), C("multidao", 180, "bow", { scale: 0.85, dy: 0.48, id: "povo2" }), C("multidao", 260, "bow", { scale: 0.8, dy: 0.52, id: "povo3" })], env: { glory: 0.85 } }), // vendo a coluna, todo o povo adora à porta das suas tendas
      b(11, { cast: [C("moises", -30, "stand", { dy: 0.5, facing: 1 }), C("homem", 40, "stand", { dy: 0.5, id: "josue", facing: -1 })], env: { glory: 0.9, night: 0.1 } }), // o Senhor fala com Moisés face a face, como amigo; Josué não se aparta da tenda
      b(12, { by: "moises", q: "E Moisés disse ao Senhor: ", cast: [C("moises", -20, "raise", { dy: 0.5, facing: 1 })], env: { glory: 0.82 } }), // "tu me dizes: faze subir este povo, mas não me fazes saber a quem enviarás comigo"
      b(13, { by: "moises" }), // "faze-me saber o teu caminho, para que ache graça aos teus olhos"
      b(14, { by: "deus", q: "Disse pois: ", env: { glory: 0.9 } }), // "irá a minha presença contigo, para te fazer descansar"
      b(15, { by: "moises", q: "Então lhe disse: " }), // "se tu mesmo não fores conosco, não nos faças subir daqui"
      b(16, { by: "moises" }), // "como se saberá que achei graça, senão por andares tu conosco?"
      b(17, { by: "deus", q: "Então disse o Senhor a Moisés: ", env: { glory: 0.92 } }), // "farei também isto que disseste, porque achaste graça e te conheço por nome"
      b(18, { by: "moises", q: "Então ele disse: ", cast: [C("moises", -20, "kneel", { dy: 0.5, facing: 1 })], env: { glory: 0.85 } }), // "rogo-te que me mostres a tua glória"
      b(19, { by: "deus", q: "Porém ele disse: ", env: { glory: 0.95 } }), // "farei passar toda a minha bondade e proclamarei o nome do Senhor diante de ti"
      b(20, { by: "deus", q: "E disse mais: " }), // "não poderás ver a minha face, porque homem nenhum a verá e viverá"
      b(21, { by: "deus", q: "Disse mais o Senhor: ", set: "penha", cast: [C("moises", -30, "stand", { dy: 0.5, facing: 1 })], props: PENHA, env: { terrain: "mountain", glory: 0.85, night: 0.14 } }), // "eis um lugar junto a mim; aqui te porás sobre a penha"
      b(22, { by: "deus", cast: [C("moises", 4, "kneel", { dy: 0.52, facing: 1 })], env: { glory: 0.95 } }), // "quando a minha glória passar, pôr-te-ei numa fenda da penha e te cobrirei com a mão"
      b(23, { by: "deus", env: { glory: 1, fire: 0.3 } }), // "havendo eu passado, me verás pelas costas; mas a minha face não se verá"
    ],
  },

  // ------------------------------------------------------------------ Êx 34
  // As novas tábuas → o Senhor desce e proclama o Nome → a aliança renovada e os
  // mandamentos → os quarenta dias → e a descida de Moisés com o rosto resplandecente.
  34: {
    start: { terrain: "mountain", night: 0.2, glory: 0.7, storm: 0, fire: 0.4, verdure: 0.2 },
    beats: [
      b(1, { by: "deus", q: "Então disse o SENHOR a Moisés: ", set: "monte", cast: [C("moises", -30, "stand", { dy: 0.5, facing: 1 })], props: MONTE, env: { terrain: "mountain", glory: 0.78, fire: 0.4, night: 0.18 } }), // "lavra duas tábuas como as primeiras, e nelas escreverei as mesmas palavras"
      b(2, { by: "deus" }), // "prepara-te para subir pela manhã ao Sinai, e põe-te no cume diante de mim"
      b(3, { by: "deus" }), // "ninguém suba contigo, nem apareça no monte, nem apascentem defronte dele"
      b(4, { cast: [C("moises", -40, "walk", { dy: 0.44, facing: 1 })], props: TABUAS, env: { glory: 0.7, fire: 0.45 } }), // Moisés lavra as tábuas e sobe de madrugada ao monte, com elas nas mãos
      b(5, { cast: [C("moises", -30, "kneel", { dy: 0.5, facing: 1 })], props: MONTE, env: { glory: 0.9, fire: 0.5, night: 0.14 } }), // o Senhor desce numa nuvem, põe-se junto a ele, e proclama o nome do Senhor
      b(6, { by: "deus", q: "clamou: ", env: { glory: 1, fire: 0.4 } }), // "o Senhor, o Senhor Deus, misericordioso e piedoso, tardio em irar-se, grande em beneficência"
      b(7, { by: "deus", env: { glory: 0.95 } }), // "que guarda a beneficência em milhares, que perdoa a iniqüidade, a transgressão e o pecado"
      b(8, { cast: [C("moises", -20, "bow", { dy: 0.5, facing: 1 })], env: { glory: 0.9 } }), // Moisés apressa-se, inclina a cabeça à terra e adora
      b(9, { by: "moises", q: "E disse: ", cast: [C("moises", -20, "kneel", { dy: 0.5, facing: 1 })], env: { glory: 0.85 } }), // "vá o Senhor no meio de nós; perdoa a nossa iniqüidade, e toma-nos por tua herança"
      b(10, { by: "deus", q: "Então disse: ", env: { glory: 0.92 } }), // "eis que faço uma aliança; farei diante do teu povo maravilhas nunca feitas"
      b(11, { by: "deus" }), // "guarda o que te ordeno; lançarei fora os amorreus, cananeus e heteus"
      b(12, { by: "deus" }), // "guarda-te de fazeres aliança com os moradores da terra, para não seres enlaçado"
      b(13, { by: "deus", env: { fire: 0.55 } }), // "os seus altares derrubareis, as suas estátuas quebrareis, os seus bosques cortareis"
      b(14, { by: "deus", env: { glory: 0.9, fire: 0.6 } }), // "não te inclinarás diante de outro deus; o nome do Senhor é Zeloso"
      b(15, { by: "deus" }), // "não faças aliança, para não comeres dos seus sacrifícios ao te convidarem"
      b(16, { by: "deus" }), // "nem tomes das suas filhas para teus filhos, para não se prostituírem com os seus deuses"
      b(17, { by: "deus", env: { fire: 0.5 } }), // "não te farás deuses de fundição"
      b(18, { by: "deus", props: FESTA_AZIMOS, cast: [C("moises", -150, "kneel", { dy: 0.5, facing: 1 })], env: { glory: 0.85, fire: 0.4 } }), // "a festa dos ázimos guardarás, no mês de Abibe, porque nele saíste do Egito"
      b(19, { by: "deus", props: CURRAL_PRIMOGENITOS, cast: [C("moises", -170, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.82, verdure: 0.35 } }), // "tudo o que abre a madre meu é, todo o teu gado macho"
      b(20, { by: "deus", props: RESGATE_JUMENTO, cast: [C("moises", -180, "stand", { dy: 0.5, facing: 1 }), C("cordeiro", 40, "stand", { dy: 0.6 })], env: { glory: 0.8 } }), // "o burro resgatarás com um cordeiro; e ninguém aparecerá vazio diante de mim"
      b(21, { by: "deus", props: SEGA, cast: [C("moises", -190, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.84, verdure: 0.45 } }), // "seis dias trabalharás, mas ao sétimo descansarás, na aradura e na sega"
      b(22, { by: "deus", props: COLHEITA, cast: [C("moises", -200, "raise", { dy: 0.5, facing: 1 })], env: { glory: 0.86, verdure: 0.6 } }), // "guardarás a festa das semanas e a festa da colheita no fim do ano"
      b(23, { by: "deus", props: TRES_VEZES, cast: [C("moises", -210, "stand", { dy: 0.5, facing: 1 }), C("multidao", 30, "walk", { dy: 0.5, facing: 1 }), C("multidao", 140, "walk", { scale: 0.9, dy: 0.54, id: "povo2", facing: 1 }), C("multidao", 240, "walk", { scale: 0.8, dy: 0.58, id: "povo3", facing: 1 })], env: { glory: 0.9, verdure: 0.4 } }), // "três vezes ao ano todos os homens aparecerão perante o Senhor Deus de Israel"
      b(24, { by: "deus", props: NACOES_LANCADAS, cast: [C("moises", -215, "raise", { dy: 0.5, facing: 1 })], env: { glory: 0.88, verdure: 0.55 } }), // "lançarei fora as nações e alargarei o teu território; ninguém cobiçará a tua terra"
      b(25, { by: "deus", props: PASCOA_NOITE, cast: [C("moises", -160, "kneel", { dy: 0.54, facing: 1 })], env: { glory: 0.8, night: 0.4, fire: 0.55, verdure: 0.3 } }), // "não sacrificarás o sangue com pão levedado, nem ficará a páscoa até a manhã"
      b(26, { by: "deus", props: PRIMICIAS, cast: [C("moises", -180, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.9, night: 0.16, verdure: 0.6, fire: 0.35 } }), // "as primícias trarás à casa do Senhor; não cozerás o cabrito no leite da mãe"
      b(27, { by: "deus", q: "Disse mais o Senhor a Moisés: ", props: MONTE, cast: [C("moises", -20, "write", { dy: 0.5, facing: 1 })], env: { glory: 0.9, verdure: 0.2, night: 0.2, fire: 0.4 } }), // "escreve estas palavras, porque conforme a elas fiz aliança contigo e com Israel"
      b(28, { cast: [C("moises", -20, "write", { dy: 0.5, facing: 1 })], env: { glory: 0.92, fire: 0.4 } }), // esteve ali quarenta dias e noites, sem comer nem beber, e escreveu os dez mandamentos
      b(29, { set: "descida", cast: [C("moises", -40, "walk", { dy: 0.5, facing: 1, glow: 1 })], props: TABUAS, env: { terrain: "mountain", glory: 0.85, fire: 0.35, night: 0.16 } }), // descendo com as tábuas, Moisés não sabia que a pele do seu rosto resplandecia
      b(30, { set: "arraial", cast: [C("moises", -70, "stand", { dy: 0.5, facing: 1, glow: 1 }), C("arao", 20, "stand", { dy: 0.5, facing: 1 }), C("multidao", 120, "bow", { scale: 0.9, dy: 0.5, id: "povo2", facing: 1 })], props: ARRAIAL, env: { terrain: "desert", glory: 0.75, night: 0.12 } }), // Arão e Israel veem o rosto resplandecer, e temem chegar-se a ele
      b(31, { cast: [C("moises", -70, "raise", { dy: 0.5, facing: 1, glow: 1 }), C("arao", 10, "stand", { dy: 0.5, facing: 1 }), C("anciao", 80, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.78 } }), // Moisés os chama; Arão e os príncipes tornam a ele, e ele lhes fala
      b(32, { cast: [C("moises", -70, "point", { dy: 0.5, facing: 1, glow: 1 }), C("multidao", 40, "stand", { dy: 0.5, facing: 1 }), C("multidao", 140, "stand", { scale: 0.9, dy: 0.52, id: "povo2", facing: 1 })], env: { glory: 0.75 } }), // chegam todos os filhos de Israel, e ele lhes ordena tudo o que o Senhor falara
      b(33, { cast: [C("moises", -40, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.6 } }), // acabando de falar, Moisés põe um véu sobre o seu rosto
      b(34, { cast: [C("moises", -30, "walk", { dy: 0.5, facing: 1, glow: 1 })], env: { glory: 0.8 } }), // entrando perante o Senhor, tira o véu; e saindo, fala o que lhe é ordenado
      b(35, { cast: [C("moises", -60, "stand", { dy: 0.5, facing: 1, glow: 1 }), C("multidao", 60, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.78, night: 0.1 } }), // Israel vê o rosto resplandecer; e Moisés torna a pôr o véu, até entrar a falar com Ele
    ],
  },
};
