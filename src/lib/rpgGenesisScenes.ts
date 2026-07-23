// ============================================================================
// Roteiros de cena (Living Scene v2) — GÊNESIS, capítulo por capítulo.
// Cada capítulo: ambiente + personagens + props por faixa de versículo, e a
// conversação (voz de Deus + reação). Lê o contexto real do capítulo e segue o
// padrão do capítulo 1. Puramente visual/narrativo — não toca em progresso.
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

// atalhos compactos
const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

// Genesis 1 fica no motor clássico (rpgLivingScene). Aqui: 2..50.
export const GENESIS_SCENES: Record<number, ChapterScript> = {
  2: {
    keyframes: [
      kf(1, { terrain: "garden", glory: 0.4, props: [P("tree", 0.16), P("palm", 0.84), P("tree", 0.7, 0.8)] }),
      kf(7, { terrain: "garden", glory: 0.6, props: [P("tree", 0.16), P("palm", 0.84)], actors: [F(0.5, "man", "kneel", "brown")] }),
      kf(15, { terrain: "garden", glory: 0.4, props: [P("tree", 0.2), P("tree", 0.8)], actors: [F(0.5, "man", "stand", "brown")] }),
      kf(19, { terrain: "garden", glory: 0.35, props: [P("tree", 0.85)], actors: [F(0.3, "man", "stand", "brown"), AN(0.6, "sheep"), AN(0.75, "goat"), AN(0.9, "ox", 0.8)] }),
      kf(22, { terrain: "garden", glory: 0.5, props: [P("tree", 0.2), P("palm", 0.82)], actors: [F(0.42, "man", "stand", "brown"), F(0.58, "woman", "stand", "purple")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Um jardim brotando da terra… 🌿" },
      { upTo: 14, god: "Do pó formei o homem e soprei-lhe a vida.", reaction: "Deus deu fôlego a Adão!" },
      { upTo: 20, god: "Dá nome a cada ser vivente.", reaction: "Adão nomeia os animais 🦌" },
      { upTo: 99, god: "Não é bom que o homem esteja só.", reaction: "Eva, tirada de sua costela 💛" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "garden", night: 0.15, props: [P("tree", 0.5)], actors: [F(0.42, "woman", "stand", "purple"), F(0.66, "man", "stand", "brown")] }),
      kf(6, { terrain: "garden", night: 0.3, props: [P("tree", 0.5)], actors: [F(0.44, "woman", "carry", "purple"), F(0.6, "man", "stand", "brown")] }),
      kf(8, { terrain: "garden", night: 0.5, glory: 0.4, props: [P("tree", 0.3), P("tree", 0.72)], actors: [F(0.35, "man", "bow", "brown"), F(0.55, "woman", "bow", "purple")] }),
      kf(23, { terrain: "desert", night: 0.35, glory: 0.2, actors: [F(0.3, "man", "mourn", "brown"), F(0.42, "woman", "mourn", "purple"), F(0.7, "angel", "raise", "white")] }),
    ],
    beats: [
      { upTo: 5, reaction: "A serpente sussurra… 🐍" },
      { upTo: 7, reaction: "Eles comeram do fruto proibido…" },
      { upTo: 19, god: "Onde estás? Que fizeste?", reaction: "Eles se escondem de Deus 😔" },
      { upTo: 99, god: "A semente da mulher esmagará a serpente.", reaction: "Expulsos do Éden — mas há promessa." },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "field", props: [P("altar", 0.3), P("altar", 0.68, 1, 0.9)], actors: [F(0.3, "man", "kneel", "green"), F(0.68, "man", "raise", "red")] }),
      kf(8, { terrain: "field", night: 0.2, actors: [F(0.4, "man", "fight", "red", { facing: 1 }), F(0.6, "man", "lie", "green")] }),
      kf(12, { terrain: "desert", night: 0.3, actors: [F(0.5, "man", "mourn", "red")] }),
      kf(17, { terrain: "city", actors: [F(0.5, "man", "stand", "red")] }),
    ],
    beats: [
      { upTo: 7, god: "Se fizeres o bem, não serás aceito?", reaction: "Caim e Abel trazem ofertas." },
      { upTo: 11, god: "A voz do sangue de teu irmão clama a mim.", reaction: "Caim matou Abel… 💔" },
      { upTo: 99, reaction: "Caim é marcado e parte errante." },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "plain", glory: 0.15, actors: [F(0.25, "elder", "stand", "gray"), F(0.5, "elder", "stand", "sand"), F(0.75, "elder", "stand", "brown")] }),
      kf(21, { terrain: "plain", glory: 0.5, actors: [F(0.4, "elder", "raise", "white"), F(0.62, "man", "stand", "brown")] }),
      kf(28, { terrain: "plain", actors: [F(0.5, "man", "stand", "blue")] }),
    ],
    beats: [
      { upTo: 20, reaction: "Gerações e gerações… e cada um morreu." },
      { upTo: 24, god: "Enoque andou comigo — e não mais foi visto.", reaction: "Deus levou Enoque! ✨" },
      { upTo: 99, reaction: "Noé nasce — haverá consolo." },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, storm: 0.3, actors: [F(0.3, "man", "stand", "gray"), F(0.7, "man", "stand", "gray")] }),
      kf(9, { terrain: "plain", storm: 0.4, glory: 0.3, props: [P("ark", 0.55, 0.8)], actors: [F(0.28, "elder", "stand", "brown")] }),
      kf(14, { terrain: "plain", storm: 0.5, props: [P("ark", 0.55, 1)], actors: [F(0.25, "elder", "carry", "brown")] }),
    ],
    beats: [
      { upTo: 8, god: "A maldade encheu a terra e me entristeceu.", reaction: "O mundo se corrompeu…" },
      { upTo: 13, god: "Noé, faze uma arca de madeira.", reaction: "Noé achou graça aos olhos de Deus." },
      { upTo: 99, reaction: "A arca começa a ser construída 🔨" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "plain", storm: 0.5, props: [P("ark", 0.5)], actors: [F(0.25, "elder", "raise", "brown"), AN(0.68, "ox", 0.8), AN(0.8, "camel", 0.7)] }),
      kf(11, { terrain: "sea", storm: 0.9, rain: 1, flood: 0.5, props: [P("ark", 0.5)] }),
      kf(17, { terrain: "sea", storm: 1, rain: 1, flood: 1, props: [P("ark", 0.5)] }),
    ],
    beats: [
      { upTo: 10, god: "Entra na arca, tu e tua casa.", reaction: "Os animais entram, de dois em dois 🐘" },
      { upTo: 16, reaction: "As comportas do céu se abriram! ⛈️" },
      { upTo: 99, reaction: "As águas cobriram até os montes…" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "sea", storm: 0.5, flood: 0.9, props: [P("ark", 0.5)] }),
      kf(4, { terrain: "mountain", flood: 0.5, props: [P("ark", 0.5, 0.9)] }),
      kf(8, { terrain: "mountain", flood: 0.25, props: [P("ark", 0.5, 0.9), P("dove", 0.5)] }),
      kf(20, { terrain: "mountain", glory: 0.4, props: [P("altar", 0.5, 1, 1), P("dove", 0.7)], actors: [F(0.32, "elder", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 3, god: "Lembrei-me de Noé — e as águas baixaram.", reaction: "O vento sopra, as águas recuam." },
      { upTo: 12, reaction: "A pomba volta com uma folha! 🕊️🌿" },
      { upTo: 99, god: "Sai da arca.", reaction: "Noé levanta um altar de gratidão." },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.3, actors: [F(0.3, "elder", "raise", "brown"), F(0.5, "man", "stand", "blue"), F(0.68, "woman", "stand", "green")] }),
      kf(12, { terrain: "hills", rainbow: 1, glory: 0.3, actors: [F(0.4, "elder", "raise", "brown")] }),
      kf(20, { terrain: "hills", props: [P("tree", 0.7)], actors: [F(0.4, "elder", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 11, god: "Sede fecundos e multiplicai-vos.", reaction: "Uma nova aliança com a vida." },
      { upTo: 17, god: "Ponho o meu arco nas nuvens.", reaction: "O arco-íris — sinal da promessa! 🌈" },
      { upTo: 99, reaction: "Noé planta uma vinha." },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.25, "man", "stand", "red"), F(0.5, "man", "stand", "blue"), F(0.75, "man", "stand", "sand")] }),
      kf(15, { terrain: "plain", actors: [F(0.3, "man", "walk", "green"), F(0.6, "man", "walk", "purple"), F(0.85, "man", "walk", "brown")] }),
    ],
    beats: [
      { upTo: 14, reaction: "Dos filhos de Noé nasceram as nações." },
      { upTo: 99, reaction: "Povos se espalham pela terra 🌍" },
    ],
  },
  11: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.5, 0.7)], actors: [F(0.3, "man", "carry", "sand"), F(0.7, "man", "carry", "brown")] }),
      kf(5, { terrain: "city", glory: 0.4, props: [P("tower", 0.5, 1)], actors: [F(0.3, "man", "stand", "sand"), F(0.7, "man", "stand", "brown")] }),
      kf(8, { terrain: "desert", actors: [F(0.4, "man", "walk", "red"), F(0.6, "man", "walk", "blue")] }),
      kf(27, { terrain: "desert", actors: [F(0.5, "elder", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 4, reaction: "'Façamos uma torre até o céu!'" },
      { upTo: 9, god: "Confundirei a sua língua.", reaction: "Babel — as línguas se dividem." },
      { upTo: 99, reaction: "A família de Terá segue para Harã." },
    ],
  },
  12: {
    keyframes: [
      kf(1, { terrain: "desert", glory: 0.4, actors: [F(0.45, "man", "raise", "brown")] }),
      kf(4, { terrain: "desert", actors: [F(0.3, "man", "walk", "brown"), F(0.42, "woman", "walk", "purple"), AN(0.62, "camel", 0.9), AN(0.8, "camel", 0.8)] }),
      kf(7, { terrain: "desert", glory: 0.3, props: [P("altar", 0.55, 1, 0.7)], actors: [F(0.35, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 3, god: "Sai da tua terra — farei de ti uma grande nação.", reaction: "Abrão obedece pela fé." },
      { upTo: 6, reaction: "A caravana atravessa o deserto 🐫" },
      { upTo: 99, god: "À tua descendência darei esta terra.", reaction: "Abrão ergue um altar." },
    ],
  },
  13: {
    keyframes: [
      kf(1, { terrain: "hills", actors: [F(0.35, "man", "stand", "brown"), F(0.6, "man", "stand", "blue"), AN(0.78, "sheep"), AN(0.88, "goat")] }),
      kf(9, { terrain: "plain", actors: [F(0.3, "man", "raise", "brown"), F(0.7, "man", "walk", "blue")] }),
      kf(14, { terrain: "hills", glory: 0.4, props: [P("altar", 0.5, 1, 0.6)], actors: [F(0.35, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 8, reaction: "A terra não bastava para os dois rebanhos." },
      { upTo: 13, reaction: "Ló escolhe o vale do Jordão." },
      { upTo: 99, god: "Ergue os olhos: toda esta terra te darei.", reaction: "Abrão permanece em Canaã." },
    ],
  },
  14: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.2, actors: [F(0.3, "warrior", "fight", "gray"), F(0.5, "warrior", "fight", "red"), F(0.7, "warrior", "fight", "blue")] }),
      kf(14, { terrain: "desert", actors: [F(0.4, "warrior", "walk", "brown"), F(0.6, "man", "carry", "brown")] }),
      kf(18, { terrain: "city", glory: 0.4, actors: [F(0.4, "king", "raise", "gold"), F(0.6, "man", "bow", "brown")] }),
    ],
    beats: [
      { upTo: 12, reaction: "Guerra dos reis — Ló é capturado." },
      { upTo: 16, reaction: "Abrão resgata Ló com seus homens! ⚔️" },
      { upTo: 99, god: "Bendito seja Abrão pelo Deus Altíssimo.", reaction: "Melquisedeque o abençoa com pão e vinho." },
    ],
  },
  15: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.9, glory: 0.4, actors: [F(0.45, "man", "stand", "brown")] }),
      kf(5, { terrain: "desert", night: 1, glory: 0.6, actors: [F(0.45, "man", "raise", "brown")] }),
      kf(17, { terrain: "desert", night: 1, fire: 0.6, glory: 0.3, props: [P("altar", 0.5, 1, 1)], actors: [F(0.35, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 4, god: "Não temas, Abrão: eu sou o teu escudo.", reaction: "A palavra do Senhor vem em visão." },
      { upTo: 6, god: "Olha os céus e conta as estrelas — assim será tua semente.", reaction: "Abrão creu, e isso lhe foi por justiça ⭐" },
      { upTo: 99, reaction: "Deus firma a aliança com fogo." },
    ],
  },
  16: {
    keyframes: [
      kf(1, { terrain: "desert", actors: [F(0.35, "woman", "stand", "purple"), F(0.6, "woman", "mourn", "sand")] }),
      kf(7, { terrain: "desert", glory: 0.4, props: [P("well", 0.6)], actors: [F(0.4, "woman", "kneel", "sand"), F(0.62, "angel", "raise", "white")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Agar foge para o deserto…" },
      { upTo: 99, god: "Eu te vejo, Agar. Teu filho se chamará Ismael.", reaction: "O Deus que vê a encontra junto à fonte." },
    ],
  },
  17: {
    keyframes: [
      kf(1, { terrain: "desert", glory: 0.6, actors: [F(0.45, "elder", "bow", "brown")] }),
      kf(15, { terrain: "desert", glory: 0.5, actors: [F(0.4, "elder", "raise", "brown"), F(0.6, "woman", "stand", "purple")] }),
    ],
    beats: [
      { upTo: 8, god: "Anda na minha presença e sê íntegro. Serás Abraão.", reaction: "Deus renova a aliança." },
      { upTo: 99, god: "Sara te dará um filho — Isaque.", reaction: "A promessa ganha nome!" },
    ],
  },
  18: {
    keyframes: [
      kf(1, { terrain: "desert", glory: 0.3, props: [P("tent", 0.28), P("tree", 0.8)], actors: [F(0.45, "angel", "stand", "white"), F(0.58, "angel", "stand", "white"), F(0.7, "angel", "stand", "white")] }),
      kf(9, { terrain: "desert", props: [P("tent", 0.28)], actors: [F(0.3, "elder", "bow", "brown"), F(0.5, "angel", "stand", "white"), F(0.62, "angel", "stand", "white")] }),
      kf(22, { terrain: "desert", night: 0.3, actors: [F(0.4, "elder", "raise", "brown"), F(0.6, "angel", "stand", "white")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Três visitantes chegam à tenda de Abraão." },
      { upTo: 15, god: "No tempo certo, Sara terá um filho.", reaction: "Sara ri — nada é impossível a Deus!" },
      { upTo: 99, reaction: "Abraão intercede por Sodoma 🙏" },
    ],
  },
  19: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.5, actors: [F(0.4, "man", "bow", "blue"), F(0.55, "angel", "stand", "white"), F(0.7, "angel", "stand", "white")] }),
      kf(15, { terrain: "city", night: 0.4, actors: [F(0.4, "man", "walk", "blue"), F(0.55, "woman", "walk", "purple"), F(0.68, "angel", "raise", "white")] }),
      kf(24, { terrain: "city", night: 0.4, fire: 1, storm: 0.3, actors: [F(0.25, "man", "walk", "blue")] }),
    ],
    beats: [
      { upTo: 14, reaction: "Os anjos avisam Ló: fuja da cidade!" },
      { upTo: 23, god: "Foge para o monte e não olhes para trás.", reaction: "Eles correm ao amanhecer." },
      { upTo: 99, reaction: "Fogo e enxofre sobre Sodoma 🔥" },
    ],
  },
  20: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.35, "king", "stand", "gold"), F(0.6, "woman", "stand", "purple")] }),
      kf(3, { terrain: "city", night: 0.7, glory: 0.4, actors: [F(0.4, "king", "lie", "gold")] }),
      kf(14, { terrain: "desert", actors: [F(0.4, "elder", "stand", "brown"), F(0.6, "woman", "stand", "purple")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Abraão diz que Sara é sua irmã…" },
      { upTo: 7, god: "Ela é casada — devolve-a.", reaction: "Deus avisa Abimeleque em sonho." },
      { upTo: 99, reaction: "Sara é restituída a Abraão." },
    ],
  },
  21: {
    keyframes: [
      kf(1, { terrain: "desert", glory: 0.4, props: [P("tent", 0.3)], actors: [F(0.42, "elder", "raise", "brown"), F(0.56, "woman", "carry", "purple")] }),
      kf(14, { terrain: "desert", actors: [F(0.4, "woman", "mourn", "sand"), F(0.55, "child", "stand", "sand")] }),
      kf(19, { terrain: "desert", glory: 0.3, props: [P("well", 0.6)], actors: [F(0.4, "woman", "raise", "sand"), F(0.56, "child", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 8, god: "Cumpri a promessa: Isaque nasceu!", reaction: "Sara ri de alegria — 'Deus me fez rir!' 😊" },
      { upTo: 18, reaction: "Agar e Ismael no deserto, sem água…" },
      { upTo: 99, god: "Não temas: farei de teu filho uma nação.", reaction: "Deus abre um poço 💧" },
    ],
  },
  22: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.3, actors: [F(0.35, "elder", "walk", "brown"), F(0.5, "child", "carry", "sand"), AN(0.75, "camel", 0.8)] }),
      kf(9, { terrain: "mountain", glory: 0.4, props: [P("altar", 0.5, 1)], actors: [F(0.4, "elder", "raise", "brown"), F(0.55, "child", "kneel", "sand")] }),
      kf(11, { terrain: "mountain", glory: 0.7, props: [P("altar", 0.5, 1), P("ram", 0.72)], actors: [F(0.4, "elder", "raise", "brown"), F(0.62, "angel", "raise", "white")] }),
    ],
    beats: [
      { upTo: 8, god: "Toma teu filho e oferece-o no monte que te mostrarei.", reaction: "Abraão obedece, mesmo sem entender…" },
      { upTo: 10, reaction: "A faca se ergue — prova de fé extrema." },
      { upTo: 99, god: "Não estendas a mão! Agora sei que me temes.", reaction: "Deus provê um cordeiro! 🐏" },
    ],
  },
  23: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.3, actors: [F(0.4, "elder", "mourn", "brown"), F(0.58, "woman", "lie", "purple")] }),
      kf(17, { terrain: "mountain", actors: [F(0.4, "elder", "stand", "brown"), F(0.6, "man", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Sara morre em Hebrom — Abraão a chora. 💔" },
      { upTo: 99, reaction: "Ele compra a caverna de Macpela para sepultá-la." },
    ],
  },
  24: {
    keyframes: [
      kf(1, { terrain: "desert", actors: [F(0.35, "elder", "stand", "brown"), F(0.6, "servant", "bow", "sand")] }),
      kf(11, { terrain: "desert", props: [P("well", 0.5)], actors: [F(0.35, "servant", "stand", "sand"), AN(0.6, "camel", 0.9), AN(0.78, "camel", 0.8)] }),
      kf(15, { terrain: "desert", glory: 0.3, props: [P("well", 0.5)], actors: [F(0.4, "woman", "carry", "blue"), F(0.6, "servant", "bow", "sand"), AN(0.82, "camel", 0.8)] }),
      kf(62, { terrain: "field", glory: 0.3, actors: [F(0.42, "man", "stand", "brown"), F(0.58, "woman", "stand", "blue")] }),
    ],
    beats: [
      { upTo: 10, reaction: "O servo parte em busca de esposa para Isaque." },
      { upTo: 27, god: "Guiei-o no caminho.", reaction: "Rebeca dá água a ele e aos camelos 💧" },
      { upTo: 99, reaction: "Isaque e Rebeca se encontram no campo 💛" },
    ],
  },
  25: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.3, actors: [F(0.5, "elder", "lie", "brown")] }),
      kf(11, { terrain: "field", glory: 0.3, actors: [F(0.5, "man", "stand", "brown")] }),
      kf(24, { terrain: "field", actors: [F(0.38, "child", "stand", "red"), F(0.56, "child", "stand", "blue")] }),
      kf(29, { terrain: "field", actors: [F(0.4, "man", "carry", "red"), F(0.6, "man", "stand", "blue")] }),
    ],
    beats: [
      { upTo: 10, reaction: "Abraão morre em boa velhice, cheio de dias." },
      { upTo: 23, god: "Duas nações há no teu ventre; o maior servirá ao menor.", reaction: "Nascem Esaú e Jacó 👶👶" },
      { upTo: 99, reaction: "Esaú vende a primogenitura por um prato…" },
    ],
  },
  26: {
    keyframes: [
      kf(1, { terrain: "field", glory: 0.3, actors: [F(0.5, "man", "stand", "brown")] }),
      kf(18, { terrain: "desert", props: [P("well", 0.4), P("well", 0.7)], actors: [F(0.3, "man", "kneel", "brown"), F(0.6, "servant", "carry", "sand")] }),
      kf(26, { terrain: "field", actors: [F(0.4, "man", "stand", "brown"), F(0.6, "king", "stand", "gold")] }),
    ],
    beats: [
      { upTo: 6, god: "Fica nesta terra e eu te abençoarei, como a teu pai.", reaction: "Deus renova a promessa a Isaque." },
      { upTo: 22, reaction: "Isaque cava poços — e faz a paz 💧" },
      { upTo: 99, reaction: "Aliança com Abimeleque em Berseba." },
    ],
  },
  27: {
    keyframes: [
      kf(1, { terrain: "plain", night: 0.2, props: [P("tent", 0.5, 1.2)], actors: [F(0.4, "elder", "lie", "brown"), F(0.6, "man", "kneel", "green")] }),
      kf(30, { terrain: "plain", night: 0.3, props: [P("tent", 0.5, 1.2)], actors: [F(0.4, "elder", "stand", "brown"), F(0.62, "man", "mourn", "red")] }),
    ],
    beats: [
      { upTo: 29, reaction: "Jacó se disfarça e recebe a bênção…" },
      { upTo: 99, reaction: "Esaú chora — a bênção já foi dada. 😢" },
    ],
  },
  28: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.4, actors: [F(0.5, "man", "walk", "blue")] }),
      kf(11, { terrain: "desert", night: 1, glory: 0.4, actors: [F(0.4, "man", "lie", "blue")] }),
      kf(12, { terrain: "desert", night: 1, glory: 0.8, props: [P("ladder", 0.55, 1)], actors: [F(0.3, "man", "lie", "blue"), F(0.62, "angel", "walk", "white"), F(0.72, "angel", "walk", "white")] }),
      kf(18, { terrain: "desert", glory: 0.4, props: [P("altar", 0.5, 1, 0.5)], actors: [F(0.4, "man", "raise", "blue")] }),
    ],
    beats: [
      { upTo: 10, reaction: "Jacó dorme com uma pedra por travesseiro…" },
      { upTo: 17, god: "Eis que estou contigo e te guardarei por onde fores.", reaction: "Uma escada até o céu, com anjos! ✨" },
      { upTo: 99, reaction: "'Esta é a casa de Deus' — Betel." },
    ],
  },
  29: {
    keyframes: [
      kf(1, { terrain: "field", props: [P("well", 0.5)], actors: [F(0.3, "man", "stand", "blue"), AN(0.6, "sheep"), AN(0.72, "sheep"), AN(0.84, "goat")] }),
      kf(10, { terrain: "field", glory: 0.2, props: [P("well", 0.4)], actors: [F(0.35, "man", "raise", "blue"), F(0.58, "woman", "stand", "green"), AN(0.8, "sheep")] }),
    ],
    beats: [
      { upTo: 9, reaction: "Jacó chega ao poço de Harã." },
      { upTo: 99, god: "O amor lhe fez os anos parecerem dias.", reaction: "Jacó encontra Raquel 💛" },
    ],
  },
  30: {
    keyframes: [
      kf(1, { terrain: "field", props: [P("tent", 0.2)], actors: [F(0.4, "woman", "stand", "green"), F(0.6, "woman", "stand", "purple")] }),
      kf(31, { terrain: "field", actors: [F(0.3, "man", "stand", "blue"), AN(0.55, "sheep"), AN(0.68, "goat"), AN(0.8, "sheep"), AN(0.92, "goat")] }),
    ],
    beats: [
      { upTo: 24, reaction: "Nascem os filhos de Jacó 👶" },
      { upTo: 99, reaction: "Os rebanhos de Jacó se multiplicam." },
    ],
  },
  31: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.3, actors: [F(0.3, "man", "walk", "blue"), F(0.45, "woman", "walk", "green"), AN(0.65, "camel", 0.9), AN(0.82, "sheep")] }),
      kf(22, { terrain: "mountain", night: 0.4, actors: [F(0.4, "man", "stand", "blue"), F(0.6, "elder", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 21, god: "Volta à terra de teus pais; estarei contigo.", reaction: "Jacó parte em segredo com sua família." },
      { upTo: 99, reaction: "Ele e Labão fazem um pacto de paz." },
    ],
  },
  32: {
    keyframes: [
      kf(1, { terrain: "river", night: 0.5, glory: 0.3, actors: [F(0.4, "man", "kneel", "blue")] }),
      kf(24, { terrain: "river", night: 0.9, glory: 0.5, actors: [F(0.4, "man", "fight", "blue", { facing: 1 }), F(0.58, "angel", "fight", "white", { facing: -1 })] }),
      kf(30, { terrain: "river", night: 0.6, glory: 0.7, actors: [F(0.5, "man", "raise", "blue")] }),
    ],
    beats: [
      { upTo: 23, reaction: "Jacó envia presentes a Esaú, com medo…" },
      { upTo: 29, god: "Não te largarei… Teu nome será Israel.", reaction: "Jacó luta com Deus até o amanhecer! 💪" },
      { upTo: 99, reaction: "'Vi a Deus face a face' — Peniel." },
    ],
  },
  33: {
    keyframes: [
      kf(1, { terrain: "hills", actors: [F(0.35, "man", "walk", "blue"), F(0.65, "man", "walk", "red")] }),
      kf(4, { terrain: "hills", glory: 0.2, actors: [F(0.45, "man", "stand", "blue"), F(0.55, "man", "stand", "red")] }),
      kf(18, { terrain: "field", props: [P("altar", 0.5, 1, 0.5), P("tent", 0.75)], actors: [F(0.4, "man", "raise", "blue")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Esaú corre ao encontro de Jacó…" },
      { upTo: 11, reaction: "Os irmãos se abraçam e choram — reconciliados! 🤝" },
      { upTo: 99, reaction: "Jacó se estabelece e ergue um altar." },
    ],
  },
  34: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "woman", "stand", "green"), F(0.6, "man", "stand", "purple")] }),
      kf(25, { terrain: "city", night: 0.3, actors: [F(0.35, "warrior", "fight", "blue"), F(0.6, "warrior", "fight", "gray")] }),
    ],
    beats: [
      { upTo: 24, reaction: "Diná é ultrajada em Siquém…" },
      { upTo: 99, reaction: "Seus irmãos fazem justiça com violência. ⚔️" },
    ],
  },
  35: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.4, props: [P("altar", 0.5, 1, 0.7)], actors: [F(0.4, "man", "raise", "blue")] }),
      kf(16, { terrain: "field", night: 0.3, actors: [F(0.4, "woman", "lie", "green"), F(0.6, "child", "stand", "sand")] }),
      kf(27, { terrain: "plain", actors: [F(0.5, "elder", "lie", "brown")] }),
    ],
    beats: [
      { upTo: 15, god: "Volta a Betel e faze ali um altar.", reaction: "Deus confirma: teu nome é Israel." },
      { upTo: 20, reaction: "Raquel morre ao dar à luz Benjamim. 💔" },
      { upTo: 99, reaction: "Isaque morre, velho e farto de dias." },
    ],
  },
  36: {
    keyframes: [
      kf(1, { terrain: "mountain", actors: [F(0.35, "king", "stand", "red"), F(0.65, "man", "stand", "sand")] }),
      kf(20, { terrain: "mountain", actors: [F(0.3, "man", "stand", "brown"), F(0.55, "man", "stand", "gray"), F(0.8, "man", "stand", "red")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Esaú se estabelece nas montanhas de Seir." },
      { upTo: 99, reaction: "Descendentes de Esaú — os edomitas." },
    ],
  },
  37: {
    keyframes: [
      kf(1, { terrain: "field", actors: [F(0.5, "child", "stand", "gold"), AN(0.75, "sheep"), AN(0.88, "goat")] }),
      kf(18, { terrain: "field", night: 0.2, actors: [F(0.5, "child", "kneel", "gold"), F(0.3, "man", "stand", "red"), F(0.7, "man", "stand", "brown")] }),
      kf(28, { terrain: "desert", actors: [F(0.4, "child", "walk", "sand"), AN(0.65, "camel", 0.9), AN(0.82, "camel", 0.8)] }),
    ],
    beats: [
      { upTo: 11, reaction: "José sonha — e os irmãos o invejam." },
      { upTo: 24, reaction: "Lançam José num poço… 😰" },
      { upTo: 99, reaction: "É vendido a mercadores rumo ao Egito." },
    ],
  },
  38: {
    keyframes: [
      kf(1, { terrain: "field", actors: [F(0.4, "man", "stand", "brown"), F(0.6, "woman", "stand", "red")] }),
      kf(24, { terrain: "city", actors: [F(0.4, "man", "stand", "brown"), F(0.6, "woman", "stand", "purple")] }),
    ],
    beats: [
      { upTo: 23, reaction: "Judá e Tamar — uma história difícil." },
      { upTo: 99, reaction: "Tamar é declarada mais justa que Judá." },
    ],
  },
  39: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.2, actors: [F(0.45, "man", "carry", "white"), F(0.65, "king", "stand", "gold")] }),
      kf(11, { terrain: "city", night: 0.3, actors: [F(0.4, "man", "walk", "white"), F(0.6, "woman", "stand", "red")] }),
      kf(20, { terrain: "city", night: 0.5, glory: 0.3, actors: [F(0.5, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 6, god: "O Senhor estava com José, e tudo prosperava.", reaction: "José serve fielmente em casa de Potifar." },
      { upTo: 18, reaction: "Ele foge do pecado — e é acusado injustamente." },
      { upTo: 99, god: "Mesmo na prisão, eu estou contigo.", reaction: "Deus dá graça a José diante do carcereiro." },
    ],
  },
  40: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.5, actors: [F(0.35, "man", "stand", "white"), F(0.55, "servant", "stand", "blue"), F(0.72, "servant", "stand", "sand")] }),
      kf(9, { terrain: "city", night: 0.4, glory: 0.3, actors: [F(0.4, "man", "raise", "white"), F(0.6, "servant", "kneel", "blue")] }),
    ],
    beats: [
      { upTo: 8, reaction: "O copeiro e o padeiro sonham na prisão." },
      { upTo: 99, god: "As interpretações pertencem a Deus.", reaction: "José interpreta os sonhos ✨" },
    ],
  },
  41: {
    keyframes: [
      kf(1, { terrain: "river", night: 0.6, actors: [F(0.5, "king", "lie", "gold"), AN(0.75, "ox", 0.8)] }),
      kf(14, { terrain: "city", glory: 0.3, actors: [F(0.4, "man", "stand", "white"), F(0.6, "king", "stand", "gold")] }),
      kf(41, { terrain: "city", glory: 0.4, actors: [F(0.45, "king", "raise", "gold"), F(0.6, "man", "stand", "white")] }),
    ],
    beats: [
      { upTo: 13, reaction: "Faraó sonha com vacas e espigas 🐄" },
      { upTo: 36, god: "Deus revela a Faraó o que há de vir.", reaction: "7 anos de fartura, 7 de fome." },
      { upTo: 99, reaction: "José é feito governador do Egito! 👑" },
    ],
  },
  42: {
    keyframes: [
      kf(1, { terrain: "desert", actors: [F(0.3, "man", "walk", "red"), F(0.5, "man", "walk", "brown"), AN(0.72, "camel", 0.9)] }),
      kf(6, { terrain: "city", glory: 0.2, actors: [F(0.4, "king", "stand", "gold"), F(0.6, "man", "bow", "red"), F(0.72, "man", "bow", "brown")] }),
    ],
    beats: [
      { upTo: 5, reaction: "A fome leva os irmãos ao Egito." },
      { upTo: 99, reaction: "Eles se curvam a José — sem reconhecê-lo." },
    ],
  },
  43: {
    keyframes: [
      kf(1, { terrain: "desert", actors: [F(0.3, "man", "walk", "red"), F(0.48, "child", "walk", "blue"), AN(0.7, "camel", 0.9)] }),
      kf(26, { terrain: "city", glory: 0.2, actors: [F(0.4, "king", "stand", "gold"), F(0.58, "man", "bow", "red"), F(0.72, "child", "bow", "blue")] }),
    ],
    beats: [
      { upTo: 14, reaction: "Desta vez levam Benjamim consigo." },
      { upTo: 99, reaction: "José se comove ao ver o irmão mais novo 💧" },
    ],
  },
  44: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "man", "walk", "red"), AN(0.65, "camel", 0.9)] }),
      kf(18, { terrain: "city", glory: 0.2, actors: [F(0.4, "king", "stand", "gold"), F(0.6, "man", "kneel", "red")] }),
    ],
    beats: [
      { upTo: 13, reaction: "A taça é achada no saco de Benjamim…" },
      { upTo: 99, reaction: "Judá se oferece no lugar do irmão 🙏" },
    ],
  },
  45: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.4, actors: [F(0.45, "man", "raise", "white"), F(0.6, "man", "stand", "red"), F(0.72, "child", "stand", "blue")] }),
      kf(14, { terrain: "city", glory: 0.5, actors: [F(0.45, "man", "stand", "white"), F(0.57, "child", "stand", "blue")] }),
    ],
    beats: [
      { upTo: 8, god: "Deus me enviou adiante para preservar vidas.", reaction: "'Eu sou José, vosso irmão!' 😭" },
      { upTo: 99, reaction: "O perdão transborda em abraços 💛" },
    ],
  },
  46: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.6, glory: 0.4, actors: [F(0.5, "elder", "kneel", "brown")] }),
      kf(5, { terrain: "desert", actors: [F(0.3, "elder", "walk", "brown"), F(0.48, "woman", "walk", "green"), AN(0.68, "camel", 0.9), AN(0.85, "camel", 0.8)] }),
    ],
    beats: [
      { upTo: 4, god: "Não temas descer ao Egito; ali farei de ti uma nação.", reaction: "Deus fala a Israel numa visão noturna." },
      { upTo: 99, reaction: "Toda a família de Jacó desce ao Egito 🐫" },
    ],
  },
  47: {
    keyframes: [
      kf(1, { terrain: "field", actors: [F(0.35, "elder", "raise", "brown"), F(0.6, "king", "stand", "gold")] }),
      kf(11, { terrain: "field", actors: [F(0.3, "man", "stand", "white"), AN(0.55, "sheep"), AN(0.68, "goat"), AN(0.82, "ox", 0.8)] }),
    ],
    beats: [
      { upTo: 10, reaction: "Jacó abençoa Faraó diante do trono." },
      { upTo: 99, reaction: "A família se estabelece em Gósen 🌾" },
    ],
  },
  48: {
    keyframes: [
      kf(1, { terrain: "plain", glory: 0.3, props: [P("tent", 0.5, 1.2)], actors: [F(0.35, "elder", "raise", "brown"), F(0.55, "child", "bow", "white"), F(0.68, "child", "bow", "sand")] }),
    ],
    beats: [
      { upTo: 15, reaction: "Jacó adota e abençoa Efraim e Manassés." },
      { upTo: 99, god: "O Deus que me pastoreou abençoe estes meninos.", reaction: "As mãos cruzadas — o menor adiante." },
    ],
  },
  49: {
    keyframes: [
      kf(1, { terrain: "plain", night: 0.2, glory: 0.3, props: [P("tent", 0.5, 1.3)], actors: [F(0.5, "elder", "lie", "brown")] }),
      kf(8, { terrain: "plain", glory: 0.4, props: [P("tent", 0.5, 1.3)], actors: [F(0.5, "elder", "raise", "brown"), F(0.3, "man", "stand", "red"), F(0.7, "man", "stand", "blue")] }),
    ],
    beats: [
      { upTo: 7, reaction: "Jacó reúne os doze filhos para abençoá-los." },
      { upTo: 27, god: "O cetro não se apartará de Judá.", reaction: "Profecias sobre as doze tribos." },
      { upTo: 99, reaction: "Israel expira, recolhido ao seu povo." },
    ],
  },
  50: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, actors: [F(0.45, "man", "mourn", "white"), F(0.6, "elder", "lie", "brown")] }),
      kf(7, { terrain: "desert", actors: [F(0.3, "man", "walk", "white"), F(0.5, "man", "walk", "red"), AN(0.72, "camel", 0.9), AN(0.88, "camel", 0.8)] }),
      kf(15, { terrain: "field", glory: 0.4, actors: [F(0.42, "man", "raise", "white"), F(0.6, "man", "bow", "red")] }),
      kf(22, { terrain: "field", glory: 0.5, actors: [F(0.5, "man", "stand", "white")] }),
    ],
    beats: [
      { upTo: 6, reaction: "José chora sobre o rosto do pai… 😢" },
      { upTo: 14, reaction: "Um grande cortejo sobe para sepultar Jacó em Canaã. 🐫" },
      { upTo: 21, god: "Vós intentastes o mal, mas Deus o tornou em bem.", reaction: "José perdoa os irmãos e chora com eles. 💛" },
      { upTo: 99, god: "Certamente Deus vos visitará e vos levará à terra prometida.", reaction: "José descansa, cheio de fé. 🕊️" },
    ],
  },
};

// hasV2Scene/getV2Script agora vivem em @/lib/rpgSceneRegistry (multi-livro).
