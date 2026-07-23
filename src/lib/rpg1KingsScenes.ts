// ============================================================================
// Roteiros de cena (Living Scene v2) — 1 REIS, capítulo por capítulo.
// Salomão rei e o sonho da sabedoria, o julgamento das duas mães, a construção
// do templo e a glória que o enche, a rainha de Sabá, a divisão do reino, e o
// profeta Elias: os corvos, o fogo no Carmelo e a brisa suave no Horebe.
// Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const KINGS1_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, props: [P("tent", 0.7, 1.2)], actors: [F(0.4, "king", "lie", "purple"), F(0.62, "woman", "stand", "white")] }),
      kf(5, { terrain: "city", crowd: 0.6, actors: [F(0.45, "man", "raise", "red"), F(0.68, "man", "stand", "sand")] }),
      kf(38, { terrain: "city", crowd: 0.7, props: [P("well", 0.72)], actors: [F(0.3, "elder", "raise", "white"), F(0.5, "king", "stand", "gold"), AN(0.72, "goat", 0.8)] }),
      kf(39, { terrain: "city", glory: 0.3, crowd: 0.8, actors: [F(0.5, "king", "raise", "gold")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Davi está velho, e o frio não o deixa. 🕯️" },
      { upTo: 27, reaction: "Adonias se exalta: 'Eu serei rei!' 👑" },
      { upTo: 40, reaction: "Salomão é ungido rei sobre Gião. 🎺" },
      { upTo: 99, reaction: "O povo aclama: 'Viva o rei Salomão!' ✨" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.25, actors: [F(0.4, "king", "lie", "purple"), F(0.6, "king", "kneel", "gold")] }),
      kf(10, { terrain: "city", night: 0.4, props: [P("altar", 0.5)], actors: [F(0.5, "man", "mourn", "gray")] }),
      kf(12, { terrain: "city", glory: 0.2, actors: [F(0.5, "king", "stand", "gold")] }),
    ],
    beats: [
      { upTo: 9, reaction: "Davi encarrega Salomão: 'Anda nos caminhos do SENHOR.' 📜" },
      { upTo: 11, reaction: "Davi dorme com seus pais depois de reinar. 🕊️" },
      { upTo: 99, reaction: "O reino se firma nas mãos de Salomão. 👑" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "hills", props: [P("altar", 0.5, 1.1, 0.7)], actors: [F(0.4, "king", "kneel", "gold")] }),
      kf(5, { terrain: "hills", night: 0.7, glory: 0.7, actors: [F(0.42, "king", "kneel", "gold")] }),
      kf(16, { terrain: "city", crowd: 0.4, actors: [F(0.5, "king", "stand", "gold"), F(0.28, "woman", "kneel", "blue"), F(0.72, "woman", "raise", "red")] }),
      kf(24, { terrain: "city", crowd: 0.5, actors: [F(0.5, "king", "raise", "gold"), F(0.3, "woman", "mourn", "blue"), F(0.7, "servant", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Salomão oferece sacrifícios em Gibeom. 🐑" },
      { upTo: 5, god: "Pede o que queres que eu te dê.", reaction: "Deus aparece a Salomão em sonho, à noite. 🌙" },
      { upTo: 15, god: "Dou-te coração sábio e entendido como nunca houve.", reaction: "Salomão pede sabedoria, e Deus se agrada. 🤍" },
      { upTo: 99, reaction: "O julgamento das duas mães revela a sabedoria de Deus. ⚖️" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, actors: [F(0.5, "king", "stand", "gold"), F(0.3, "elder", "stand", "white"), F(0.7, "servant", "stand", "sand")] }),
      kf(20, { terrain: "field", actors: [F(0.5, "king", "stand", "gold"), AN(0.68, "ox", 0.9), AN(0.84, "sheep")] }),
      kf(29, { terrain: "garden", glory: 0.3, props: [P("tree", 0.3), P("palm", 0.72)], actors: [F(0.5, "king", "raise", "gold")] }),
    ],
    beats: [
      { upTo: 19, reaction: "Salomão organiza seus príncipes e governadores. 📋" },
      { upTo: 28, reaction: "Judá e Israel vivem seguros, cada um sob sua videira. 🍇" },
      { upTo: 99, reaction: "Sua sabedoria excede a de todos os do Oriente. 🌿" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "king", "stand", "gold"), F(0.66, "servant", "bow", "sand")] }),
      kf(6, { terrain: "mountain", props: [P("tree", 0.2), P("tree", 0.4), P("tree", 0.6)], actors: [F(0.78, "man", "carry", "brown")] }),
      kf(13, { terrain: "hills", crowd: 0.6, props: [P("tree", 0.7)], actors: [F(0.35, "man", "carry", "sand"), F(0.55, "man", "carry", "brown")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Salomão resolve edificar a Casa do SENHOR. 🏗️" },
      { upTo: 12, reaction: "Hirão de Tiro envia cedros do Líbano. 🌲" },
      { upTo: 99, reaction: "Milhares trabalham para preparar as pedras. 🪨" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, props: [P("tower", 0.5, 1.3)], actors: [F(0.3, "man", "carry", "brown")] }),
      kf(14, { terrain: "city", props: [P("tower", 0.5, 1.4), P("tree", 0.78)], actors: [F(0.3, "man", "carry", "sand")] }),
      kf(19, { terrain: "city", glory: 0.5, props: [P("tower", 0.5, 1.4), P("arkCovenant", 0.6, 0.8)], actors: [] }),
      kf(38, { terrain: "city", glory: 0.4, props: [P("tower", 0.5, 1.5)], actors: [F(0.5, "king", "raise", "gold")] }),
    ],
    beats: [
      { upTo: 13, god: "Se andares nos meus estatutos, habitarei no meio de Israel.", reaction: "Começa a construção do templo. 🏛️" },
      { upTo: 22, reaction: "O interior é revestido de ouro puro. ✨" },
      { upTo: 30, reaction: "O Santo dos Santos guarda a arca da aliança. 📦" },
      { upTo: 99, reaction: "Em sete anos, a Casa do SENHOR fica pronta. 🌟" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.3, 1.2), P("tower", 0.68, 1.3)], actors: [F(0.5, "king", "stand", "gold")] }),
      kf(15, { terrain: "city", props: [P("tower", 0.3, 1.4), P("tower", 0.68, 1.4)], actors: [F(0.5, "man", "stand", "brown")] }),
      kf(48, { terrain: "city", glory: 0.4, props: [P("lampstand", 0.36, 1, 1), P("altar", 0.64, 1, 0.6)], actors: [F(0.5, "king", "raise", "gold")] }),
    ],
    beats: [
      { upTo: 12, reaction: "Salomão edifica também o seu palácio. 🏰" },
      { upTo: 47, reaction: "Hurão funde as duas colunas de bronze e o mar de fundição. 🔨" },
      { upTo: 99, reaction: "O ouro do templo: candelabros, mesa e utensílios. 🕎" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.8, props: [P("tower", 0.5, 1.4), P("arkCovenant", 0.5, 0.9)], actors: [F(0.3, "elder", "carry", "white"), F(0.7, "elder", "carry", "sand")] }),
      kf(10, { terrain: "city", glory: 0.8, smoke: 0.8, props: [P("tower", 0.5, 1.4), P("smoke", 0.5, 2.2)], actors: [] }),
      kf(22, { terrain: "city", glory: 0.6, crowd: 0.6, props: [P("altar", 0.5, 1.1, 0.6)], actors: [F(0.5, "king", "raise", "gold")] }),
      kf(54, { terrain: "city", glory: 0.7, crowd: 0.7, props: [P("altar", 0.5, 1.1, 0.8)], actors: [F(0.5, "king", "kneel", "gold")] }),
    ],
    beats: [
      { upTo: 9, reaction: "A arca é levada ao Santo dos Santos. 📦✨" },
      { upTo: 11, reaction: "A nuvem enche a Casa: a glória do SENHOR! 🌟☁️" },
      { upTo: 53, god: "Escolhi esta casa para que o meu nome ali esteja.", reaction: "Salomão ora com as mãos estendidas ao céu. 🙌" },
      { upTo: 99, reaction: "O rei abençoa e todo Israel celebra a festa. 🎉" },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.5, glory: 0.6, props: [P("tower", 0.5, 1.3)], actors: [F(0.5, "king", "kneel", "gold")] }),
      kf(10, { terrain: "city", actors: [F(0.4, "king", "stand", "gold"), F(0.66, "servant", "bow", "sand")] }),
      kf(26, { terrain: "sea", props: [P("tower", 0.2, 0.9)], actors: [F(0.55, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 9, god: "Consagrei esta casa; se me abandonares, a rejeitarei.", reaction: "Deus aparece de novo a Salomão, à noite. 🌙" },
      { upTo: 25, reaction: "Salomão firma tratados e cidades. 🏘️" },
      { upTo: 99, reaction: "Frotas navegam a Ofir e trazem ouro. ⚓" },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "desert", crowd: 0.5, actors: [F(0.3, "woman", "walk", "purple"), AN(0.6, "camel", 1.1), AN(0.82, "camel", 0.9)] }),
      kf(4, { terrain: "city", crowd: 0.6, props: [P("tower", 0.72, 1.2)], actors: [F(0.4, "king", "stand", "gold"), F(0.66, "woman", "bow", "purple")] }),
      kf(14, { terrain: "city", glory: 0.3, props: [P("tower", 0.7, 1.3)], actors: [F(0.5, "king", "raise", "gold"), F(0.28, "servant", "carry", "sand")] }),
    ],
    beats: [
      { upTo: 3, reaction: "A rainha de Sabá vem provar Salomão com perguntas. 🐫" },
      { upTo: 9, reaction: "Ela se admira: não lhe contaram nem a metade! ✨" },
      { upTo: 99, reaction: "O ouro e a sabedoria de Salomão encantam as nações. 👑" },
    ],
  },
  11: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.4, props: [P("altar", 0.3, 0.9, 0.5), P("altar", 0.7, 0.9, 0.5)], actors: [F(0.5, "king", "bow", "purple")] }),
      kf(14, { terrain: "hills", actors: [F(0.4, "warrior", "stand", "red"), F(0.66, "warrior", "stand", "gray")] }),
      kf(29, { terrain: "field", actors: [F(0.35, "man", "stand", "white"), F(0.6, "man", "raise", "brown")] }),
      kf(41, { terrain: "city", night: 0.5, actors: [F(0.5, "king", "mourn", "purple")] }),
    ],
    beats: [
      { upTo: 8, reaction: "As muitas mulheres desviam o coração de Salomão. 💔" },
      { upTo: 13, god: "Rasgarei o reino de tua mão, mas não todo, por amor a Davi.", reaction: "O SENHOR se ira contra Salomão. 😔" },
      { upTo: 40, reaction: "Adversários se levantam; Jeroboão é anunciado. 📜" },
      { upTo: 99, reaction: "Salomão morre e Roboão reina em seu lugar. 🕊️" },
    ],
  },
  12: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.7, actors: [F(0.4, "king", "stand", "gold"), F(0.68, "man", "raise", "brown")] }),
      kf(13, { terrain: "city", crowd: 0.6, actors: [F(0.5, "king", "raise", "gold"), F(0.3, "elder", "mourn", "white")] }),
      kf(16, { terrain: "hills", crowd: 0.8, actors: [F(0.35, "man", "raise", "brown"), F(0.6, "king", "stand", "gold")] }),
      kf(28, { terrain: "city", night: 0.2, actors: [F(0.4, "king", "raise", "sand"), AN(0.66, "ox", 1.1, "#e8b04b")] }),
    ],
    beats: [
      { upTo: 11, reaction: "O povo pede alívio; Roboão consulta os conselheiros. 🗣️" },
      { upTo: 15, reaction: "Ele responde com dureza, rejeitando os anciãos. 😠" },
      { upTo: 24, reaction: "O reino se divide: dez tribos seguem Jeroboão. 💔" },
      { upTo: 99, reaction: "Jeroboão levanta dois bezerros de ouro. 🐂" },
    ],
  },
  13: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("altar", 0.5, 1.1, 0.6)], actors: [F(0.3, "man", "raise", "white"), F(0.66, "king", "stand", "sand")] }),
      kf(4, { terrain: "city", glory: 0.3, props: [P("altar", 0.5, 1.1, 0.3)], actors: [F(0.3, "man", "raise", "white"), F(0.66, "king", "mourn", "sand")] }),
      kf(24, { terrain: "desert", night: 0.3, props: [P("tree", 0.4)], actors: [F(0.5, "man", "lie", "white"), AN(0.72, "lion", 1)] }),
    ],
    beats: [
      { upTo: 3, god: "Ó altar, altar! Um filho nascerá à casa de Davi.", reaction: "Um homem de Deus clama contra o altar de Betel. 📢" },
      { upTo: 10, reaction: "A mão de Jeroboão seca e o altar se fende. 🖐️" },
      { upTo: 99, reaction: "O profeta desobedece e um leão o encontra no caminho. 🦁" },
    ],
  },
  14: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, props: [P("tent", 0.7)], actors: [F(0.35, "woman", "walk", "blue"), F(0.62, "child", "lie", "sand")] }),
      kf(4, { terrain: "hills", glory: 0.3, actors: [F(0.4, "elder", "raise", "white"), F(0.66, "woman", "bow", "blue")] }),
      kf(25, { terrain: "city", crowd: 0.5, actors: [F(0.4, "king", "mourn", "gold"), F(0.66, "warrior", "stand", "red")] }),
    ],
    beats: [
      { upTo: 6, reaction: "A esposa de Jeroboão busca o profeta Aías. 🚶‍♀️" },
      { upTo: 18, god: "Trago o mal sobre a casa de Jeroboão.", reaction: "O menino morre ao entrar ela na cidade. 😢" },
      { upTo: 99, reaction: "Sisaque do Egito saqueia os tesouros de Judá. ⚔️" },
    ],
  },
  15: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.5, "king", "stand", "purple")] }),
      kf(9, { terrain: "city", glory: 0.3, props: [P("altar", 0.66, 1, 0.6)], actors: [F(0.4, "king", "raise", "gold")] }),
      kf(16, { terrain: "hills", crowd: 0.5, actors: [F(0.35, "warrior", "fight", "red"), F(0.66, "warrior", "fight", "gray", { facing: -1 })] }),
    ],
    beats: [
      { upTo: 8, reaction: "Abias reina em Judá, mas seu coração não é perfeito. 👑" },
      { upTo: 15, reaction: "Asa faz o que é reto e tira os ídolos da terra. 🤍" },
      { upTo: 99, reaction: "Guerra entre Asa e Baasa de Israel. ⚔️" },
    ],
  },
  16: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.4, actors: [F(0.4, "man", "raise", "white"), F(0.66, "king", "stand", "sand")] }),
      kf(15, { terrain: "city", fire: 0.5, storm: 0.3, props: [P("tower", 0.5, 1.2)], actors: [F(0.5, "king", "mourn", "sand")] }),
      kf(29, { terrain: "city", night: 0.3, props: [P("altar", 0.66, 0.9, 0.5)], actors: [F(0.4, "king", "stand", "red"), F(0.68, "woman", "stand", "purple")] }),
    ],
    beats: [
      { upTo: 14, god: "Levantei Baasa, mas ele andou nos pecados de Jeroboão.", reaction: "Reis de Israel caem uns após os outros. ⚰️" },
      { upTo: 22, reaction: "Zinri e Onri disputam o trono. 🔥" },
      { upTo: 99, reaction: "Acabe reina e faz o mal mais que todos. 😔" },
    ],
  },
  17: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "elder", "raise", "brown"), F(0.68, "king", "stand", "red")] }),
      kf(4, { terrain: "river", desert: 0.4, props: [P("reeds", 0.7), P("dove", 0.3), P("dove", 0.5)], actors: [F(0.5, "elder", "stand", "brown")] }),
      kf(10, { terrain: "desert", actors: [F(0.35, "elder", "stand", "brown"), F(0.6, "woman", "carry", "sand"), F(0.78, "child", "stand", "green")] }),
      kf(21, { terrain: "desert", glory: 0.5, props: [P("tent", 0.7)], actors: [F(0.4, "elder", "raise", "brown"), F(0.62, "child", "stand", "green")] }),
    ],
    beats: [
      { upTo: 1, god: "Não haverá orvalho nem chuva senão pela minha palavra.", reaction: "Elias anuncia a seca a Acabe. ☀️" },
      { upTo: 7, reaction: "Junto ao ribeiro, corvos alimentam o profeta. 🐦" },
      { upTo: 16, reaction: "A viúva de Sarepta parte o último pão, e a farinha não falta. 🍞" },
      { upTo: 99, reaction: "Elias ora e o filho da viúva torna a viver! 🙏" },
    ],
  },
  18: {
    keyframes: [
      kf(1, { terrain: "hills", actors: [F(0.4, "elder", "walk", "brown"), F(0.66, "servant", "bow", "sand")] }),
      kf(20, { terrain: "mountain", crowd: 0.7, props: [P("altar", 0.5, 1.1)], actors: [F(0.3, "elder", "stand", "brown"), F(0.7, "man", "raise", "red")] }),
      kf(38, { terrain: "mountain", fire: 0.9, glory: 0.5, crowd: 0.6, props: [P("altar", 0.5, 1.2, 1)], actors: [F(0.35, "elder", "raise", "brown")] }),
      kf(41, { terrain: "mountain", storm: 0.8, rain: 0.8, actors: [F(0.4, "elder", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 19, reaction: "Elias desafia os profetas de Baal no Carmelo. ⛰️" },
      { upTo: 37, god: "SENHOR, Deus de Abraão, sê hoje conhecido!", reaction: "Baal não responde; Elias prepara o altar. 🔥" },
      { upTo: 40, reaction: "Cai fogo do céu e consome tudo! O povo se prostra. ⚡" },
      { upTo: 99, reaction: "Depois de três anos, enfim volta a chuva. 🌧️" },
    ],
  },
  19: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.3, props: [P("bush", 0.62)], actors: [F(0.4, "elder", "lie", "brown")] }),
      kf(5, { terrain: "desert", glory: 0.5, props: [P("bush", 0.66)], actors: [F(0.4, "elder", "stand", "brown"), F(0.62, "angel", "raise", "white")] }),
      kf(11, { terrain: "mountain", storm: 0.6, fire: 0.5, actors: [F(0.4, "elder", "bow", "brown")] }),
      kf(12, { terrain: "mountain", glory: 0.7, actors: [F(0.42, "elder", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Elias foge de Jezabel e pede a morte no deserto. 😔" },
      { upTo: 8, reaction: "Um anjo o alimenta para a longa jornada ao Horebe. 🍞" },
      { upTo: 12, god: "Que fazes aqui, Elias?", reaction: "Não no vento, nem no fogo — mas numa brisa suave. 🍃" },
      { upTo: 99, reaction: "Deus envia Elias a ungir reis e a chamar Eliseu. 🕊️" },
    ],
  },
  20: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.6, props: [P("tower", 0.72, 1.2)], actors: [F(0.4, "king", "stand", "gold"), F(0.68, "warrior", "stand", "gray")] }),
      kf(13, { terrain: "hills", glory: 0.3, actors: [F(0.4, "man", "raise", "white"), F(0.66, "king", "stand", "gold")] }),
      kf(20, { terrain: "hills", storm: 0.3, crowd: 0.7, actors: [F(0.3, "warrior", "fight", "red"), F(0.7, "warrior", "fight", "gray", { facing: -1 })] }),
    ],
    beats: [
      { upTo: 12, reaction: "Ben-Hadade da Síria cerca Samaria. 🛡️" },
      { upTo: 21, god: "Entregarei hoje esta multidão em tua mão.", reaction: "Israel vence a batalha por palavra do profeta. ⚔️" },
      { upTo: 99, reaction: "Acabe poupa o rei inimigo e é repreendido. 😔" },
    ],
  },
  21: {
    keyframes: [
      kf(1, { terrain: "garden", props: [P("tree", 0.3), P("palm", 0.7)], actors: [F(0.4, "king", "stand", "gold"), F(0.66, "man", "stand", "brown")] }),
      kf(7, { terrain: "city", night: 0.3, actors: [F(0.4, "king", "lie", "gold"), F(0.66, "woman", "raise", "purple")] }),
      kf(17, { terrain: "garden", glory: 0.3, props: [P("tree", 0.7)], actors: [F(0.35, "elder", "raise", "brown"), F(0.62, "king", "mourn", "gold")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Acabe cobiça a vinha de Nabote. 🍇" },
      { upTo: 16, reaction: "Jezabel arma a morte de Nabote e toma a vinha. 💔" },
      { upTo: 99, god: "No lugar onde caiu Nabote, lamberão o teu sangue.", reaction: "Elias condena Acabe, que se humilha. 😔" },
    ],
  },
  22: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, actors: [F(0.35, "king", "stand", "gold"), F(0.62, "king", "stand", "purple")] }),
      kf(14, { terrain: "city", glory: 0.3, actors: [F(0.4, "elder", "raise", "brown"), F(0.66, "king", "mourn", "gold")] }),
      kf(29, { terrain: "hills", storm: 0.4, crowd: 0.7, actors: [F(0.3, "warrior", "fight", "gray"), F(0.66, "king", "lie", "gold")] }),
    ],
    beats: [
      { upTo: 12, reaction: "Acabe e Josafá planejam a guerra em Ramote. 🗺️" },
      { upTo: 28, god: "Vi todo o Israel disperso como ovelhas sem pastor.", reaction: "Só Micaías profetiza a verdade. 📜" },
      { upTo: 99, reaction: "Uma flecha ao acaso fere Acabe, e ele morre. 🏹" },
    ],
  },
};
