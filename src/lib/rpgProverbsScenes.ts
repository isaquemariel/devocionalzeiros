// ============================================================================
// Roteiros de cena (Living Scene v2) — PROVÉRBIOS, capítulo por capítulo.
// A sabedoria de Salomão: o temor do SENHOR como princípio do saber, um pai
// que instrui o filho, o caminho do justo contra o do ímpio, o valor do
// trabalho, a Sabedoria personificada que clama nas ruas e a mulher virtuosa.
// Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Gênesis/Êxodo (rpgGenesisScenes / rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const PROVERBS_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.82, 1.1)], actors: [F(0.38, "elder", "stand", "purple"), F(0.6, "child", "stand", "sand")] }),
      kf(7, { terrain: "city", glory: 0.45, actors: [F(0.4, "elder", "raise", "purple"), F(0.62, "child", "kneel", "sand")] }),
      kf(20, { terrain: "city", crowd: 0.5, glory: 0.4, actors: [F(0.42, "woman", "raise", "white"), F(0.7, "man", "stand", "brown")] }),
      kf(24, { terrain: "city", night: 0.4, actors: [F(0.4, "woman", "mourn", "white"), F(0.68, "man", "walk", "gray")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Os provérbios de Salomão, para dar sabedoria aos simples. 📖" },
      { upTo: 7, god: undefined, reaction: "O temor do SENHOR é o princípio do saber. ✨" },
      { upTo: 19, reaction: "Filho meu, não andes com os que armam ciladas. ⚠️" },
      { upTo: 99, reaction: "A Sabedoria clama nas ruas: 'Até quando, ó néscios?' 📣" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "field", props: [P("well", 0.62), P("tree", 0.2, 1.1)], actors: [F(0.4, "elder", "stand", "purple"), F(0.62, "child", "kneel", "sand")] }),
      kf(6, { terrain: "field", glory: 0.5, props: [P("tree", 0.22, 1.1)], actors: [F(0.45, "child", "raise", "sand")] }),
      kf(12, { terrain: "field", night: 0.35, actors: [F(0.42, "man", "walk", "brown"), F(0.7, "man", "stand", "gray")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Se buscares a sabedoria como a prata escondida... 🔎" },
      { upTo: 11, god: undefined, reaction: "Porque o SENHOR é quem dá a sabedoria. 💡" },
      { upTo: 99, reaction: "Ela te livrará do caminho do mau. 🛡️" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "field", props: [P("tree", 0.7, 1.3)], actors: [F(0.36, "elder", "stand", "purple"), F(0.58, "child", "stand", "sand")] }),
      kf(9, { terrain: "field", props: [P("altar", 0.55, 1, 0.6), P("tree", 0.8, 1.1)], actors: [F(0.4, "man", "kneel", "brown")] }),
      kf(13, { terrain: "field", glory: 0.4, props: [P("tree", 0.55, 1.4)], actors: [F(0.45, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Confia no SENHOR de todo o teu coração. 🤍" },
      { upTo: 12, reaction: "Honra o SENHOR com os teus bens e primícias. 🌾" },
      { upTo: 99, reaction: "Bem-aventurado quem acha a sabedoria: é árvore de vida. 🌳" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "plain", actors: [F(0.3, "elder", "stand", "gray"), F(0.5, "man", "stand", "brown"), F(0.7, "child", "stand", "sand")] }),
      kf(10, { terrain: "plain", glory: 0.35, actors: [F(0.4, "elder", "raise", "purple"), F(0.62, "child", "walk", "sand")] }),
      kf(18, { terrain: "plain", night: 0.45, actors: [F(0.4, "man", "walk", "brown"), F(0.72, "man", "stand", "gray")] }),
    ],
    beats: [
      { upTo: 9, reaction: "Ouvi, filhos, a instrução do pai. 👨‍👦" },
      { upTo: 19, reaction: "A vereda dos justos é como a luz da aurora. 🌅" },
      { upTo: 99, reaction: "Guarda o teu coração, porque dele procede a vida. 💗" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.4, actors: [F(0.38, "elder", "raise", "purple"), F(0.62, "man", "stand", "brown")] }),
      kf(15, { terrain: "field", props: [P("well", 0.55, 1.1)], actors: [F(0.42, "man", "stand", "brown")] }),
      kf(21, { terrain: "field", glory: 0.4, props: [P("well", 0.55)], actors: [F(0.45, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 14, reaction: "Filho, guarda-te da mulher estranha e suas palavras. ⚠️" },
      { upTo: 20, reaction: "Bebe a água da tua própria cisterna. 💧" },
      { upTo: 99, reaction: "Os caminhos do homem estão diante dos olhos do SENHOR. 👁️" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "field", actors: [F(0.4, "man", "stand", "brown"), F(0.66, "man", "stand", "gray")] }),
      kf(6, { terrain: "field", props: [P("tree", 0.75, 1.2)], actors: [F(0.42, "man", "kneel", "brown")] }),
      kf(16, { terrain: "city", night: 0.35, actors: [F(0.4, "elder", "raise", "purple")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Não sejas fiador do teu próximo sem pensar. ✋" },
      { upTo: 11, reaction: "Vai ter com a formiga, ó preguiçoso, e sê sábio. 🐜" },
      { upTo: 99, reaction: "Seis coisas o SENHOR aborrece; sete detesta. ⚖️" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "elder", "stand", "purple"), F(0.62, "child", "stand", "sand")] }),
      kf(6, { terrain: "city", night: 0.55, props: [P("tower", 0.2, 1.1)], actors: [F(0.5, "man", "walk", "gray")] }),
      kf(21, { terrain: "city", night: 0.7, actors: [F(0.42, "woman", "raise", "red"), F(0.66, "man", "walk", "gray")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Guarda os meus mandamentos como a menina dos olhos. 👁️" },
      { upTo: 20, reaction: "Da janela vejo um jovem falto de juízo. 🌙" },
      { upTo: 99, reaction: "Ele a segue como o boi que vai ao matadouro. 😔" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, glory: 0.5, props: [P("tower", 0.8, 1.1)], actors: [F(0.42, "woman", "raise", "white")] }),
      kf(22, { terrain: "hills", glory: 0.8, actors: [F(0.45, "woman", "raise", "white")] }),
      kf(32, { terrain: "hills", glory: 0.7, props: [P("tree", 0.7, 1.3)], actors: [F(0.42, "woman", "stand", "white"), F(0.68, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 21, reaction: "A Sabedoria clama nas alturas do caminho. 📣" },
      { upTo: 31, reaction: "'O SENHOR me possuiu no princípio de seus caminhos.' ✨" },
      { upTo: 99, reaction: "Bem-aventurado quem me ouve e vela às minhas portas. 🚪" },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.5, props: [P("tower", 0.7, 1.2)], actors: [F(0.4, "woman", "raise", "white"), F(0.66, "servant", "carry", "sand")] }),
      kf(10, { terrain: "city", glory: 0.6, actors: [F(0.45, "child", "kneel", "sand")] }),
      kf(13, { terrain: "city", night: 0.5, props: [P("tower", 0.2)], actors: [F(0.42, "woman", "stand", "red")] }),
    ],
    beats: [
      { upTo: 9, reaction: "A Sabedoria edificou sua casa e convida ao banquete. 🍞" },
      { upTo: 12, god: undefined, reaction: "O temor do SENHOR é o princípio da sabedoria. ✨" },
      { upTo: 99, reaction: "A mulher insensata também clama, mas para a morte. ⚠️" },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "field", props: [P("tree", 0.6, 1.2)], actors: [F(0.35, "man", "stand", "brown"), F(0.62, "man", "mourn", "gray")] }),
      kf(16, { terrain: "field", glory: 0.35, actors: [F(0.4, "man", "raise", "green")] }),
    ],
    beats: [
      { upTo: 9, reaction: "O filho sábio alegra o pai. 😊" },
      { upTo: 15, reaction: "A mão dos diligentes enriquece. 🌾" },
      { upTo: 99, reaction: "A boca do justo é fonte de vida. 💧" },
    ],
  },
  11: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.8)], actors: [F(0.38, "man", "stand", "brown"), F(0.66, "man", "stand", "gray")] }),
      kf(24, { terrain: "field", glory: 0.35, props: [P("tree", 0.7, 1.2)], actors: [F(0.42, "man", "carry", "green")] }),
    ],
    beats: [
      { upTo: 11, reaction: "Balança falsa o SENHOR abomina; o peso justo lhe agrada. ⚖️" },
      { upTo: 23, reaction: "A justiça exalta a cidade. 🏛️" },
      { upTo: 99, reaction: "Quem espalha ainda mais possui; o justo floresce. 🌳" },
    ],
  },
  12: {
    keyframes: [
      kf(1, { terrain: "field", actors: [F(0.4, "man", "stand", "brown"), AN(0.66, "ox", 0.9)] }),
      kf(15, { terrain: "field", glory: 0.3, props: [P("tree", 0.72, 1.1)], actors: [F(0.42, "man", "raise", "green")] }),
    ],
    beats: [
      { upTo: 10, reaction: "O justo atende à vida dos seus animais. 🐂" },
      { upTo: 22, reaction: "Lábios mentirosos o SENHOR abomina. 🤐" },
      { upTo: 99, reaction: "No caminho da justiça está a vida. 🌿" },
    ],
  },
  13: {
    keyframes: [
      kf(1, { terrain: "plain", actors: [F(0.36, "elder", "stand", "purple"), F(0.6, "child", "stand", "sand")] }),
      kf(20, { terrain: "plain", glory: 0.35, actors: [F(0.4, "man", "walk", "brown"), F(0.62, "man", "walk", "green")] }),
    ],
    beats: [
      { upTo: 11, reaction: "O filho sábio ouve a instrução do pai. 👂" },
      { upTo: 19, reaction: "Quem anda com sábios será sábio. 🤝" },
      { upTo: 99, reaction: "Quem poupa a vara aborrece o filho. 🌾" },
    ],
  },
  14: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.78, 1.1)], actors: [F(0.4, "woman", "stand", "white"), F(0.7, "woman", "mourn", "gray")] }),
      kf(26, { terrain: "city", glory: 0.4, actors: [F(0.42, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 12, reaction: "A mulher sábia edifica a sua casa. 🏠" },
      { upTo: 25, reaction: "Há caminho que ao homem parece direito... ⚠️" },
      { upTo: 99, reaction: "No temor do SENHOR há firme confiança. 🛡️" },
    ],
  },
  15: {
    keyframes: [
      kf(1, { terrain: "field", actors: [F(0.4, "man", "stand", "brown"), F(0.64, "man", "stand", "gray")] }),
      kf(16, { terrain: "field", glory: 0.4, props: [P("altar", 0.55, 0.9, 0.5)], actors: [F(0.42, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 10, reaction: "A resposta branda desvia o furor. 🕊️" },
      { upTo: 22, reaction: "Os olhos do SENHOR estão em todo lugar. 👁️" },
      { upTo: 99, reaction: "O temor do SENHOR é a instrução da sabedoria. ✨" },
    ],
  },
  16: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.45, actors: [F(0.42, "man", "kneel", "brown")] }),
      kf(18, { terrain: "city", night: 0.3, props: [P("tower", 0.75, 1.2)], actors: [F(0.4, "king", "stand", "gold")] }),
      kf(31, { terrain: "city", glory: 0.35, actors: [F(0.45, "elder", "stand", "white")] }),
    ],
    beats: [
      { upTo: 9, reaction: "Ao homem cabe o preparar; ao SENHOR, a resposta. 🙏" },
      { upTo: 20, reaction: "A soberba precede a ruína. ⚠️" },
      { upTo: 99, reaction: "Coroa de honra são as cãs, no caminho da justiça. 👑" },
    ],
  },
  17: {
    keyframes: [
      kf(1, { terrain: "field", props: [P("tree", 0.7, 1.1)], actors: [F(0.4, "man", "stand", "brown")] }),
      kf(17, { terrain: "field", glory: 0.3, actors: [F(0.38, "man", "stand", "green"), F(0.6, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 9, reaction: "Melhor um bocado seco com paz. 🍞" },
      { upTo: 22, reaction: "O amigo ama em todo tempo. 🤝" },
      { upTo: 99, reaction: "O coração alegre é bom remédio. 😊" },
    ],
  },
  18: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.55, 1.4)], actors: [F(0.42, "man", "stand", "brown")] }),
      kf(10, { terrain: "city", glory: 0.5, props: [P("tower", 0.55, 1.5)], actors: [F(0.44, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 9, reaction: "As palavras do homem são águas profundas. 💧" },
      { upTo: 15, reaction: "Torre forte é o nome do SENHOR. 🏰" },
      { upTo: 99, reaction: "Quem acha uma esposa acha o bem. 🤍" },
    ],
  },
  19: {
    keyframes: [
      kf(1, { terrain: "plain", actors: [F(0.4, "man", "walk", "brown"), F(0.68, "man", "mourn", "gray")] }),
      kf(17, { terrain: "plain", glory: 0.35, actors: [F(0.4, "man", "carry", "green"), F(0.66, "man", "kneel", "sand")] }),
    ],
    beats: [
      { upTo: 9, reaction: "Melhor o pobre íntegro que o perverso. 🤍" },
      { upTo: 21, reaction: "Quem se compadece do pobre empresta ao SENHOR. 🎁" },
      { upTo: 99, reaction: "Muitos são os planos, mas o conselho do SENHOR prevalece. ✨" },
    ],
  },
  20: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.35, actors: [F(0.42, "man", "stand", "gray")] }),
      kf(24, { terrain: "city", glory: 0.4, actors: [F(0.42, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 10, reaction: "O vinho é escarnecedor; quem por ele erra não é sábio. 🍷" },
      { upTo: 23, reaction: "Peso e balança justos são do SENHOR. ⚖️" },
      { upTo: 99, reaction: "Os passos do homem são dirigidos pelo SENHOR. 👣" },
    ],
  },
  21: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.45, props: [P("tower", 0.8)], actors: [F(0.4, "king", "kneel", "gold")] }),
      kf(21, { terrain: "field", glory: 0.35, props: [P("tree", 0.7, 1.2)], actors: [F(0.42, "man", "raise", "green")] }),
    ],
    beats: [
      { upTo: 8, reaction: "O coração do rei está na mão do SENHOR. 👑" },
      { upTo: 20, reaction: "Fazer justiça agrada ao SENHOR mais que sacrifício. ⚖️" },
      { upTo: 99, reaction: "Não há sabedoria contra o SENHOR. ✨" },
    ],
  },
  22: {
    keyframes: [
      kf(1, { terrain: "plain", actors: [F(0.35, "elder", "stand", "purple"), F(0.6, "child", "walk", "sand")] }),
      kf(6, { terrain: "field", glory: 0.35, props: [P("tree", 0.72, 1.2)], actors: [F(0.4, "elder", "stand", "purple"), F(0.62, "child", "stand", "sand")] }),
      kf(17, { terrain: "field", actors: [F(0.4, "elder", "raise", "purple"), F(0.66, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Melhor o bom nome que muitas riquezas. 🌾" },
      { upTo: 16, reaction: "Instrui a criança no caminho em que deve andar. 👨‍👦" },
      { upTo: 99, reaction: "Palavras dos sábios: inclina o teu ouvido. 👂" },
    ],
  },
  23: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "man", "stand", "brown"), F(0.66, "king", "stand", "gold")] }),
      kf(19, { terrain: "field", actors: [F(0.38, "elder", "raise", "purple"), F(0.62, "child", "kneel", "sand")] }),
      kf(29, { terrain: "city", night: 0.55, actors: [F(0.5, "man", "lie", "gray")] }),
    ],
    beats: [
      { upTo: 11, reaction: "Não te fatigues para ser rico. 💰" },
      { upTo: 25, reaction: "Ouve, filho, e dá-me o teu coração. 💗" },
      { upTo: 99, reaction: "Quem se demora no vinho tem ais e tristezas. 🍷" },
    ],
  },
  24: {
    keyframes: [
      kf(1, { terrain: "field", props: [P("tower", 0.8, 1.1)], actors: [F(0.4, "man", "stand", "brown")] }),
      kf(30, { terrain: "field", night: 0.3, props: [P("tree", 0.6, 0.9)], actors: [F(0.42, "man", "lie", "gray")] }),
    ],
    beats: [
      { upTo: 12, reaction: "Com sabedoria se edifica a casa. 🏠" },
      { upTo: 22, reaction: "Se desfaleces no dia da angústia, pequena é tua força. 💪" },
      { upTo: 99, reaction: "Passei pelo campo do preguiçoso: só espinhos. 🌿" },
    ],
  },
  25: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.75, 1.2)], actors: [F(0.4, "king", "stand", "gold")] }),
      kf(11, { terrain: "field", glory: 0.35, props: [P("tree", 0.65, 1.2)], actors: [F(0.42, "man", "stand", "green")] }),
    ],
    beats: [
      { upTo: 10, reaction: "Provérbios de Salomão, copiados pelos homens de Ezequias. 📜" },
      { upTo: 20, reaction: "Como maçãs de ouro é a palavra dita a seu tempo. 🍎" },
      { upTo: 99, reaction: "Se o teu inimigo tiver fome, dá-lhe pão. 🍞" },
    ],
  },
  26: {
    keyframes: [
      kf(1, { terrain: "field", night: 0.25, actors: [F(0.42, "man", "mourn", "gray")] }),
      kf(13, { terrain: "field", actors: [F(0.4, "man", "lie", "gray"), AN(0.7, "lion", 0.9)] }),
    ],
    beats: [
      { upTo: 12, reaction: "Não respondas ao tolo segundo a sua estultície. 🤦" },
      { upTo: 16, reaction: "'Há um leão no caminho!', diz o preguiçoso. 🦁" },
      { upTo: 99, reaction: "Como cão que volta ao vômito, o tolo repete a loucura. ⚠️" },
    ],
  },
  27: {
    keyframes: [
      kf(1, { terrain: "hills", props: [P("well", 0.65)], actors: [F(0.38, "man", "stand", "brown"), F(0.62, "man", "stand", "green")] }),
      kf(23, { terrain: "hills", glory: 0.3, actors: [F(0.35, "shepherd", "stand", "brown"), AN(0.6, "sheep"), AN(0.74, "sheep"), AN(0.88, "goat")] }),
    ],
    beats: [
      { upTo: 10, reaction: "Não te glories do dia de amanhã. 🌅" },
      { upTo: 22, reaction: "Como ferro com ferro se afia o amigo. ⚔️" },
      { upTo: 99, reaction: "Cuida bem dos teus rebanhos. 🐑" },
    ],
  },
  28: {
    keyframes: [
      kf(1, { terrain: "field", night: 0.3, actors: [F(0.4, "man", "walk", "gray"), F(0.68, "man", "stand", "green")] }),
      kf(13, { terrain: "field", glory: 0.4, actors: [F(0.42, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 12, reaction: "O ímpio foge sem que ninguém o persiga. 🏃" },
      { upTo: 20, reaction: "Quem confessa e deixa o pecado alcança misericórdia. 🤍" },
      { upTo: 99, reaction: "O justo é ousado como o leão. 🦁" },
    ],
  },
  29: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.8, 1.1)], actors: [F(0.4, "king", "stand", "gold"), F(0.68, "man", "kneel", "brown")] }),
      kf(18, { terrain: "city", glory: 0.4, actors: [F(0.42, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 14, reaction: "Quando os justos governam, o povo se alegra. 👑" },
      { upTo: 25, reaction: "Não havendo visão, o povo perece. 👁️" },
      { upTo: 99, reaction: "Quem confia no SENHOR será posto em alto retiro. 🛡️" },
    ],
  },
  30: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.4, actors: [F(0.42, "man", "kneel", "brown")] }),
      kf(18, { terrain: "hills", props: [P("tree", 0.7, 1.1)], actors: [F(0.4, "man", "stand", "brown"), AN(0.66, "lion", 0.8)] }),
      kf(24, { terrain: "field", props: [P("tree", 0.75, 1.1)], actors: [F(0.42, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 9, reaction: "As palavras de Agur: 'Não me dês nem pobreza nem riqueza.' 🙏" },
      { upTo: 23, reaction: "Três coisas há que não se fartam... 🌊" },
      { upTo: 99, reaction: "Quatro pequeninos da terra, mas muito sábios: a formiga... 🐜" },
    ],
  },
  31: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.82, 1.1)], actors: [F(0.4, "woman", "stand", "purple"), F(0.66, "king", "kneel", "gold")] }),
      kf(10, { terrain: "field", glory: 0.35, props: [P("tree", 0.78, 1.1)], actors: [F(0.42, "woman", "carry", "purple"), AN(0.72, "sheep")] }),
      kf(20, { terrain: "city", glory: 0.35, actors: [F(0.4, "woman", "raise", "purple"), F(0.66, "man", "kneel", "sand")] }),
      kf(28, { terrain: "city", glory: 0.5, actors: [F(0.42, "woman", "stand", "purple"), F(0.62, "man", "raise", "brown"), F(0.78, "child", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 9, reaction: "As palavras do rei Lemuel, que sua mãe lhe ensinou. 👑" },
      { upTo: 19, reaction: "Mulher virtuosa, quem a achará? Seu valor excede o das joias. 💎" },
      { upTo: 27, reaction: "Ela estende as mãos ao pobre e ao necessitado. 🤍" },
      { upTo: 99, reaction: "A mulher que teme ao SENHOR será louvada. ✨" },
    ],
  },
};
