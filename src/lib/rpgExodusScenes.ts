// ============================================================================
// Roteiros de cena (Living Scene v2) — ÊXODO, capítulo por capítulo.
// Nascimento de Moisés, sarça ardente, as dez pragas, a Páscoa, o mar se
// abrindo, o maná, o Sinai fumegante, as tábuas, o bezerro de ouro e o
// tabernáculo. Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Gênesis (rpgGenesisScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const EXODUS_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.7, props: [P("pyramid", 0.18, 1.2), P("pyramid", 0.85, 0.9)], actors: [F(0.5, "man", "walk", "brown")] }),
      kf(8, { terrain: "city", crowd: 0.6, props: [P("pyramid", 0.16, 1.1)], actors: [F(0.3, "king", "stand", "gold"), F(0.66, "man", "carry", "sand")] }),
      kf(15, { terrain: "river", night: 0.25, props: [P("reeds", 0.2), P("reeds", 0.8)], actors: [F(0.4, "woman", "mourn", "blue"), F(0.6, "woman", "stand", "green")] }),
      kf(22, { terrain: "river", night: 0.4, props: [P("reeds", 0.85)], actors: [F(0.5, "king", "raise", "gold")] }),
    ],
    beats: [
      { upTo: 7, reaction: "Os filhos de Israel multiplicaram-se no Egito. 🌾" },
      { upTo: 14, god: undefined, reaction: "Um novo faraó os escraviza com dureza. ⛏️" },
      { upTo: 21, reaction: "As parteiras temeram a Deus e pouparam os meninos. 🤍" },
      { upTo: 99, god: undefined, reaction: "Faraó ordena: 'Lançai ao Nilo todo menino!' 😢" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "river", props: [P("reeds", 0.18), P("reeds", 0.34), P("basket", 0.5), P("reeds", 0.7)], actors: [F(0.66, "woman", "kneel", "blue"), F(0.8, "child", "stand", "green")] }),
      kf(5, { terrain: "river", props: [P("reeds", 0.2), P("basket", 0.46)], actors: [F(0.3, "woman", "stand", "purple"), F(0.6, "child", "stand", "green")] }),
      kf(11, { terrain: "city", night: 0.15, props: [P("pyramid", 0.85, 0.9)], actors: [F(0.4, "man", "fight", "brown", { facing: 1 }), F(0.62, "man", "lie", "sand")] }),
      kf(15, { terrain: "desert", actors: [F(0.35, "man", "walk", "brown")] }),
      kf(16, { terrain: "desert", props: [P("well", 0.5)], actors: [F(0.34, "man", "stand", "brown"), F(0.6, "woman", "carry", "sand"), AN(0.78, "sheep"), AN(0.9, "sheep") ] }),
    ],
    beats: [
      { upTo: 4, reaction: "Uma mãe esconde o bebê num cesto entre os juncos. 🧺" },
      { upTo: 10, god: undefined, reaction: "A filha de Faraó o encontra: será chamado Moisés. 👶" },
      { upTo: 14, reaction: "Adulto, Moisés defende um hebreu e mata um egípcio. ⚔️" },
      { upTo: 99, god: undefined, reaction: "Foge para Midiã e acha família junto ao poço. 🐑" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "mountain", actors: [F(0.35, "shepherd", "stand", "brown"), AN(0.62, "sheep"), AN(0.75, "sheep"), AN(0.88, "goat")] }),
      kf(2, { terrain: "mountain", glory: 0.5, props: [P("burningBush", 0.6, 1.1, 1)], actors: [F(0.34, "man", "stand", "brown")] }),
      kf(5, { terrain: "mountain", glory: 0.7, props: [P("burningBush", 0.6, 1.2, 1)], actors: [F(0.36, "man", "bow", "brown")] }),
      kf(13, { terrain: "mountain", glory: 0.8, props: [P("burningBush", 0.62, 1.2, 1)], actors: [F(0.38, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 1, reaction: "Moisés apascenta o rebanho no monte de Deus. 🐑" },
      { upTo: 4, god: "Não te aproximes; tira as sandálias — é terra santa.", reaction: "A sarça arde, mas não se consome! 🔥" },
      { upTo: 12, god: "Vi a aflição do meu povo. Eu te envio ao Faraó.", reaction: "Deus chama Moisés." },
      { upTo: 99, god: "EU SOU O QUE SOU. Este é o meu nome para sempre.", reaction: "O Nome que se revela. ✨" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.4, props: [P("staff", 0.55)], actors: [F(0.4, "man", "stand", "brown")] }),
      kf(3, { terrain: "mountain", glory: 0.4, props: [P("serpent", 0.55)], actors: [F(0.36, "man", "mourn", "brown")] }),
      kf(18, { terrain: "desert", actors: [F(0.3, "man", "walk", "brown"), F(0.46, "woman", "walk", "sand"), AN(0.7, "goat", 0.8)] }),
      kf(27, { terrain: "desert", glory: 0.3, actors: [F(0.4, "man", "raise", "brown"), F(0.6, "man", "stand", "white")] }),
    ],
    beats: [
      { upTo: 2, god: "Que tens na mão? Lança-a por terra.", reaction: "Moisés hesita diante do chamado." },
      { upTo: 9, reaction: "A vara vira serpente — sinal do poder de Deus. 🐍" },
      { upTo: 17, god: "Eu estarei com a tua boca e te ensinarei.", reaction: "Deus dá sinais a Moisés." },
      { upTo: 99, reaction: "Arão vem ao seu encontro no deserto. 🤝" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("pyramid", 0.16, 1.1)], actors: [F(0.3, "man", "raise", "brown"), F(0.42, "man", "stand", "white"), F(0.7, "king", "stand", "gold")] }),
      kf(6, { terrain: "city", crowd: 0.7, actors: [F(0.7, "king", "raise", "gold")] }),
      kf(15, { terrain: "city", crowd: 0.6, actors: [F(0.4, "man", "carry", "sand"), F(0.6, "man", "mourn", "sand")] }),
    ],
    beats: [
      { upTo: 5, god: "Assim diz o SENHOR: Deixa ir o meu povo!", reaction: "Faraó: 'Quem é o SENHOR para que eu o obedeça?' 😠" },
      { upTo: 14, reaction: "Tijolos sem palha — o fardo fica mais pesado. 🧱" },
      { upTo: 99, reaction: "O povo se queixa; Moisés clama a Deus. 😔" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "desert", glory: 0.6, actors: [F(0.45, "man", "kneel", "brown")] }),
      kf(6, { terrain: "desert", glory: 0.8, actors: [F(0.45, "man", "raise", "brown")] }),
      kf(14, { terrain: "plain", actors: [F(0.3, "elder", "stand", "gray"), F(0.5, "elder", "stand", "sand"), F(0.7, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 8, god: "Eu sou o SENHOR. Vos livrarei com braço estendido.", reaction: "Deus renova sua promessa. 🤝" },
      { upTo: 99, reaction: "As gerações de Levi — Moisés e Arão." },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("pyramid", 0.85, 0.9)], actors: [F(0.34, "man", "stand", "brown"), F(0.46, "man", "raise", "white"), F(0.72, "king", "stand", "gold")] }),
      kf(10, { terrain: "city", props: [P("serpent", 0.5, 1.2)], actors: [F(0.34, "man", "stand", "brown"), F(0.72, "king", "mourn", "gold")] }),
      kf(20, { terrain: "river", blood: 0.9, props: [P("reeds", 0.2), P("reeds", 0.82)], actors: [F(0.36, "man", "raise", "brown"), F(0.6, "king", "stand", "gold")] }),
    ],
    beats: [
      { upTo: 9, god: "Endurecerei o coração de Faraó, mas mostrarei sinais.", reaction: "Moisés diante do trono do Egito. 👑" },
      { upTo: 13, reaction: "A vara de Arão engole as varas dos magos! 🐍" },
      { upTo: 99, god: "Nisto saberás que eu sou o SENHOR.", reaction: "1ª praga: o Nilo vira sangue. 🩸" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "river", props: [P("frog", 0.2), P("frog", 0.35), P("frog", 0.55), P("frog", 0.7, 0.9), P("reeds", 0.85)], actors: [F(0.44, "man", "raise", "brown")] }),
      kf(16, { terrain: "city", night: 0.2, actors: [F(0.36, "man", "stand", "brown"), F(0.7, "king", "mourn", "gold")] }),
      kf(20, { terrain: "field", actors: [F(0.34, "man", "raise", "brown"), AN(0.66, "ox", 0.9)] }),
    ],
    beats: [
      { upTo: 15, reaction: "2ª praga: rãs cobrem toda a terra. 🐸" },
      { upTo: 19, god: "Estende a vara e fere o pó da terra.", reaction: "3ª praga: piolhos do pó. 🐜" },
      { upTo: 99, reaction: "4ª praga: enxames de moscas. 🪰 Faraó endurece." },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "field", night: 0.2, actors: [F(0.35, "man", "raise", "brown"), AN(0.6, "ox", 0.9), AN(0.8, "sheep")] }),
      kf(8, { terrain: "city", night: 0.3, actors: [F(0.36, "man", "raise", "brown"), F(0.7, "king", "mourn", "gold")] }),
      kf(23, { terrain: "field", storm: 0.7, hail: 0.9, rain: 0.3, actors: [F(0.4, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 7, reaction: "5ª praga: peste mata o gado do Egito. 🐂" },
      { upTo: 12, god: undefined, reaction: "6ª praga: úlceras sobre homens e animais. 🤒" },
      { upTo: 99, god: "Ainda não há quem seja como eu em toda a terra.", reaction: "7ª praga: saraiva e fogo do céu! 🧊⚡" },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "field", locusts: 0.85, actors: [F(0.4, "man", "raise", "brown")] }),
      kf(12, { terrain: "field", locusts: 0.95, actors: [F(0.4, "man", "stand", "brown")] }),
      kf(21, { terrain: "city", darkness: 0.9, actors: [F(0.4, "man", "stand", "brown"), F(0.7, "king", "mourn", "gold")] }),
    ],
    beats: [
      { upTo: 20, god: "Estende a mão sobre o Egito por causa dos gafanhotos.", reaction: "8ª praga: gafanhotos devoram tudo. 🦗" },
      { upTo: 99, reaction: "9ª praga: trevas que se podem apalpar. ⬛" },
    ],
  },
  11: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.5, actors: [F(0.4, "man", "raise", "brown"), F(0.68, "king", "stand", "gold")] }),
      kf(4, { terrain: "city", night: 0.7, glory: 0.2, actors: [F(0.45, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Moisés anuncia a última praga. 🌑" },
      { upTo: 99, god: "À meia-noite sairei pelo meio do Egito.", reaction: "Morrerá todo primogênito do Egito. 😔" },
    ],
  },
  12: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.5, props: [P("altar", 0.5)], actors: [F(0.34, "man", "stand", "brown"), AN(0.64, "sheep")] }),
      kf(11, { terrain: "city", night: 0.7, props: [P("tent", 0.3), P("tent", 0.72)], actors: [F(0.5, "man", "kneel", "brown")] }),
      kf(29, { terrain: "city", night: 0.85, actors: [F(0.7, "king", "mourn", "gold")] }),
      kf(37, { terrain: "desert", night: 0.4, crowd: 0.85, actors: [F(0.3, "man", "walk", "brown"), AN(0.66, "goat", 0.8), AN(0.82, "sheep")] }),
    ],
    beats: [
      { upTo: 10, god: "Tomai um cordeiro sem defeito e guardai a Páscoa.", reaction: "O cordeiro da Páscoa. 🐑" },
      { upTo: 13, god: "Verei o sangue e passarei por cima de vós.", reaction: "Sangue nas portas — sinal de proteção. 🩸🚪" },
      { upTo: 30, reaction: "À meia-noite, morre todo primogênito do Egito. 😢" },
      { upTo: 99, reaction: "Israel sai do Egito — enfim livres! ✨" },
    ],
  },
  13: {
    keyframes: [
      kf(1, { terrain: "desert", crowd: 0.7, actors: [F(0.4, "man", "raise", "brown")] }),
      kf(17, { terrain: "desert", crowd: 0.7, props: [P("pillarCloud", 0.5, 1.1)], actors: [F(0.3, "man", "walk", "brown")] }),
      kf(21, { terrain: "desert", night: 0.7, crowd: 0.6, props: [P("pillarFire", 0.5, 1.1)], actors: [F(0.3, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 16, god: "Consagra-me todo primogênito; lembra deste dia.", reaction: "Israel guarda a lembrança da libertação. 📖" },
      { upTo: 20, reaction: "De dia, a coluna de nuvem guia o povo. ☁️" },
      { upTo: 99, reaction: "De noite, a coluna de fogo ilumina o caminho. 🔥" },
    ],
  },
  14: {
    keyframes: [
      kf(1, { terrain: "sea", crowd: 0.7, actors: [F(0.35, "man", "stand", "brown")] }),
      kf(9, { terrain: "sea", night: 0.3, crowd: 0.6, props: [P("pillarCloud", 0.5, 1) ], actors: [F(0.3, "man", "raise", "brown")] }),
      kf(21, { terrain: "sea", seaSplit: 0.95, crowd: 0.7, actors: [F(0.3, "man", "raise", "brown", { facing: 1 })] }),
      kf(27, { terrain: "sea", flood: 0.7, actors: [F(0.32, "man", "raise", "brown")] }),
      kf(30, { terrain: "sea", glory: 0.4, crowd: 0.6, actors: [F(0.4, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Faraó persegue Israel até o mar. 🐎" },
      { upTo: 14, god: "Não temais! O SENHOR pelejará por vós.", reaction: "O povo, encurralado, clama a Deus." },
      { upTo: 25, god: "Estende a mão sobre o mar.", reaction: "O mar se abre — muralhas de água! 🌊" },
      { upTo: 29, reaction: "Israel passa em seco pelo meio do mar. 👣" },
      { upTo: 99, reaction: "As águas voltam sobre o Egito. Israel é salvo! ✨" },
    ],
  },
  15: {
    keyframes: [
      kf(1, { terrain: "sea", glory: 0.5, crowd: 0.6, actors: [F(0.4, "man", "raise", "brown")] }),
      kf(20, { terrain: "sea", glory: 0.4, actors: [F(0.35, "woman", "raise", "purple"), F(0.55, "woman", "raise", "green"), F(0.72, "woman", "stand", "sand")] }),
      kf(23, { terrain: "desert", props: [P("well", 0.6)], actors: [F(0.4, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 19, god: undefined, reaction: "Cântico de Moisés: 'Cantarei ao SENHOR!' 🎶" },
      { upTo: 21, reaction: "Miriã e as mulheres dançam com tamboris. 🥁" },
      { upTo: 99, god: "Eu sou o SENHOR que te sara.", reaction: "Em Mara, Deus adoça as águas amargas. 💧" },
    ],
  },
  16: {
    keyframes: [
      kf(1, { terrain: "desert", crowd: 0.7, actors: [F(0.4, "man", "stand", "brown")] }),
      kf(13, { terrain: "desert", night: 0.3, props: [P("quail", 0.3), P("quail", 0.45), P("quail", 0.62)], actors: [F(0.5, "man", "stand", "brown")] }),
      kf(14, { terrain: "desert", glory: 0.35, props: [P("manna", 0.5, 2)], actors: [F(0.35, "man", "kneel", "brown"), F(0.6, "child", "kneel", "sand")] }),
    ],
    beats: [
      { upTo: 12, reaction: "O povo murmura de fome no deserto. 😟" },
      { upTo: 13, god: "À tarde comereis carne.", reaction: "Codornizes cobrem o acampamento. 🐦" },
      { upTo: 99, god: "Este é o pão que o SENHOR vos deu.", reaction: "De manhã, o maná do céu! 🤍" },
    ],
  },
  17: {
    keyframes: [
      kf(1, { terrain: "mountain", crowd: 0.5, actors: [F(0.4, "man", "raise", "brown")] }),
      kf(6, { terrain: "mountain", props: [P("staff", 0.5)], actors: [F(0.4, "man", "raise", "brown"), F(0.62, "man", "kneel", "sand")] }),
      kf(11, { terrain: "hills", actors: [F(0.28, "man", "raise", "brown"), F(0.42, "man", "stand", "white"), F(0.7, "warrior", "fight", "red", { facing: -1 })] }),
    ],
    beats: [
      { upTo: 7, god: "Ferirás a rocha, e dela sairá água.", reaction: "Água jorra da rocha em Horebe. 💧" },
      { upTo: 99, reaction: "Enquanto Moisés ergue as mãos, Israel vence Amaleque. 🙌⚔️" },
    ],
  },
  18: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("tent", 0.7)], actors: [F(0.3, "man", "stand", "brown"), F(0.5, "elder", "stand", "white")] }),
      kf(13, { terrain: "desert", crowd: 0.5, props: [P("tent", 0.8)], actors: [F(0.35, "man", "stand", "brown"), F(0.55, "elder", "raise", "white")] }),
    ],
    beats: [
      { upTo: 12, reaction: "Jetro, sogro de Moisés, o visita. 🤝" },
      { upTo: 99, god: undefined, reaction: "Jetro aconselha: reparte a carga com juízes. ⚖️" },
    ],
  },
  19: {
    keyframes: [
      kf(1, { terrain: "mountain", crowd: 0.6, actors: [F(0.4, "man", "stand", "brown")] }),
      kf(9, { terrain: "mountain", glory: 0.5, storm: 0.4, props: [P("smoke", 0.5, 2)], actors: [F(0.4, "man", "raise", "brown")] }),
      kf(16, { terrain: "mountain", storm: 0.7, fire: 0.5, glory: 0.5, crowd: 0.4, props: [P("smoke", 0.5, 2.4)], actors: [F(0.35, "man", "bow", "brown")] }),
    ],
    beats: [
      { upTo: 8, god: "Sereis para mim reino de sacerdotes e nação santa.", reaction: "Deus chama Israel ao monte Sinai. ⛰️" },
      { upTo: 15, reaction: "Santificai-vos: ao terceiro dia o SENHOR descerá." },
      { upTo: 99, reaction: "Trovões, fogo e fumaça — o Sinai treme! ⚡🔥" },
    ],
  },
  20: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.7, storm: 0.4, fire: 0.4, props: [P("smoke", 0.5, 2.2)], actors: [F(0.4, "man", "raise", "brown")] }),
      kf(18, { terrain: "mountain", glory: 0.5, crowd: 0.6, props: [P("smoke", 0.5, 2)], actors: [F(0.4, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 17, god: "Eu sou o SENHOR teu Deus. Não terás outros deuses.", reaction: "Os Dez Mandamentos! 📜" },
      { upTo: 99, reaction: "O povo treme e se afasta; Moisés se aproxima de Deus." },
    ],
  },
  21: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "man", "raise", "brown"), F(0.62, "elder", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 99, god: "Estes são os direitos que porás diante deles.", reaction: "Leis de justiça para o povo. ⚖️" },
    ],
  },
  22: {
    keyframes: [
      kf(1, { terrain: "field", actors: [F(0.4, "man", "stand", "brown"), AN(0.66, "ox", 0.9), AN(0.82, "sheep")] }),
    ],
    beats: [
      { upTo: 99, god: "Não afligireis o estrangeiro, a viúva nem o órfão.", reaction: "Leis de restituição e compaixão. 🤍" },
    ],
  },
  23: {
    keyframes: [
      kf(1, { terrain: "field", actors: [F(0.4, "man", "stand", "brown"), F(0.62, "elder", "stand", "sand")] }),
      kf(20, { terrain: "desert", glory: 0.4, actors: [F(0.4, "man", "stand", "brown"), F(0.62, "angel", "raise", "white")] }),
    ],
    beats: [
      { upTo: 19, reaction: "Justiça, sábado e três festas ao SENHOR. 🌾" },
      { upTo: 99, god: "Eis que envio um anjo adiante de ti.", reaction: "Deus promete guiar até a Terra Prometida. 👼" },
    ],
  },
  24: {
    keyframes: [
      kf(1, { terrain: "mountain", props: [P("altar", 0.5)], actors: [F(0.3, "man", "stand", "brown"), F(0.5, "elder", "bow", "white"), F(0.7, "elder", "bow", "sand")] }),
      kf(9, { terrain: "mountain", glory: 0.7, actors: [F(0.3, "elder", "raise", "white"), F(0.5, "elder", "raise", "sand")] }),
      kf(15, { terrain: "mountain", glory: 0.6, fire: 0.4, props: [P("smoke", 0.5, 2.4)], actors: [F(0.4, "man", "walk", "brown")] }),
    ],
    beats: [
      { upTo: 8, god: undefined, reaction: "O povo promete: 'Tudo o que o SENHOR falou, faremos.' 🤝" },
      { upTo: 14, reaction: "Os anciãos veem o Deus de Israel e comem diante dele. ✨" },
      { upTo: 99, reaction: "Moisés sobe ao monte; a glória como fogo. Quarenta dias. 🔥" },
    ],
  },
  25: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.5, actors: [F(0.45, "man", "kneel", "brown")] }),
      kf(10, { terrain: "mountain", glory: 0.6, props: [P("arkCovenant", 0.5, 1.1)], actors: [F(0.3, "man", "stand", "brown")] }),
      kf(31, { terrain: "mountain", glory: 0.5, props: [P("arkCovenant", 0.3), P("lampstand", 0.66, 1, 1)], actors: [] }),
    ],
    beats: [
      { upTo: 9, god: "Farão um santuário, e habitarei no meio deles.", reaction: "Deus pede ofertas para o tabernáculo. 🎁" },
      { upTo: 30, god: "Farás uma arca de madeira coberta de ouro.", reaction: "A arca da aliança. 📦✨" },
      { upTo: 99, reaction: "O candelabro de ouro puro. 🕎" },
    ],
  },
  26: {
    keyframes: [
      kf(1, { terrain: "desert", glory: 0.4, props: [P("tent", 0.4, 1.4), P("tent", 0.66, 1.2)], actors: [F(0.3, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 99, god: "Levantarás o tabernáculo conforme o modelo do monte.", reaction: "As cortinas e tábuas do tabernáculo. ⛺" },
    ],
  },
  27: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("altar", 0.4, 1.2, 0.9), P("lampstand", 0.68, 1, 1)], actors: [F(0.3, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 99, god: "Farás o altar de bronze e o átrio ao redor.", reaction: "O altar do holocausto e a lâmpada perpétua. 🔥" },
    ],
  },
  28: {
    keyframes: [
      kf(1, { terrain: "desert", glory: 0.4, props: [P("tent", 0.72)], actors: [F(0.45, "man", "stand", "gold")] }),
    ],
    beats: [
      { upTo: 99, god: "Farás vestes sagradas para Arão, teu irmão.", reaction: "As vestes do sacerdote: éfode e peitoral. 👘" },
    ],
  },
  29: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("altar", 0.5, 1.2, 1), P("ram", 0.7, 0.9)], actors: [F(0.3, "man", "stand", "gold")] }),
      kf(38, { terrain: "desert", glory: 0.5, props: [P("altar", 0.5, 1.2, 1)], actors: [F(0.4, "man", "raise", "gold")] }),
    ],
    beats: [
      { upTo: 37, god: "Consagrarás Arão e seus filhos para me servirem.", reaction: "A consagração dos sacerdotes. 🕯️" },
      { upTo: 99, god: "Habitarei no meio dos filhos de Israel.", reaction: "Deus promete morar com o seu povo. ✨" },
    ],
  },
  30: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("altar", 0.5, 0.9, 0.6), P("smoke", 0.5, 1.6)], actors: [F(0.35, "man", "stand", "gold")] }),
    ],
    beats: [
      { upTo: 99, god: "Queimarás incenso aromático diante de mim.", reaction: "O altar do incenso e a bacia de bronze. 🌫️" },
    ],
  },
  31: {
    keyframes: [
      kf(1, { terrain: "desert", glory: 0.4, actors: [F(0.4, "man", "stand", "brown")] }),
      kf(18, { terrain: "mountain", glory: 0.7, props: [P("tablets", 0.5, 1.1)], actors: [F(0.4, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 11, god: "Enchi Bezalel do Espírito para toda obra de arte.", reaction: "Deus capacita os artesãos. 🎨" },
      { upTo: 17, god: "Guardareis o meu sábado como sinal perpétuo.", reaction: "O sábado, sinal entre Deus e Israel. 🕯️" },
      { upTo: 99, reaction: "Deus entrega as duas tábuas, escritas por seu dedo. 📜" },
    ],
  },
  32: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.2, crowd: 0.5, actors: [F(0.5, "man", "stand", "white")], props: [] }),
      kf(4, { terrain: "desert", night: 0.2, crowd: 0.6, actors: [AN(0.5, "ox", 1.1, "#e8b04b"), F(0.28, "man", "raise", "sand")] }),
      kf(19, { terrain: "mountain", fire: 0.4, props: [P("tablets", 0.6, 1.1)], actors: [F(0.4, "man", "fight", "brown", { facing: 1 })] }),
      kf(26, { terrain: "desert", glory: 0.3, actors: [F(0.4, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 6, reaction: "O povo faz um bezerro de ouro e o adora. 🐂✨" },
      { upTo: 18, god: "Vi este povo, e eis que é povo de dura cerviz.", reaction: "Moisés desce e vê a idolatria. 😠" },
      { upTo: 25, reaction: "Ele quebra as tábuas e destrói o ídolo. 💥" },
      { upTo: 99, reaction: "Moisés intercede pelo povo diante de Deus. 🙏" },
    ],
  },
  33: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("tent", 0.6, 1.2)], actors: [F(0.35, "man", "walk", "brown")] }),
      kf(9, { terrain: "desert", glory: 0.4, props: [P("tent", 0.6, 1.2), P("pillarCloud", 0.42, 1)], actors: [F(0.34, "man", "kneel", "brown")] }),
      kf(18, { terrain: "mountain", glory: 0.9, actors: [F(0.42, "man", "bow", "brown")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Moisés arma a tenda da congregação fora do arraial. ⛺" },
      { upTo: 17, god: "A minha presença irá contigo, e te darei descanso.", reaction: "A coluna de nuvem desce à porta da tenda. ☁️" },
      { upTo: 99, god: "Verás as minhas costas, mas a minha face não se verá.", reaction: "'Mostra-me a tua glória!' 🌟" },
    ],
  },
  34: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.6, props: [P("tablets", 0.55, 1.1)], actors: [F(0.4, "man", "kneel", "brown")] }),
      kf(5, { terrain: "mountain", glory: 0.9, props: [P("pillarCloud", 0.5, 1)], actors: [F(0.4, "man", "bow", "brown")] }),
      kf(29, { terrain: "desert", glory: 0.7, crowd: 0.4, props: [P("tablets", 0.6)], actors: [F(0.42, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 4, god: "Lavra duas tábuas como as primeiras.", reaction: "Deus renova a aliança. 📜" },
      { upTo: 9, god: "O SENHOR, Deus misericordioso e clemente, tardio em irar-se.", reaction: "Deus proclama o seu nome. ✨" },
      { upTo: 99, reaction: "O rosto de Moisés resplandece ao descer. 😇" },
    ],
  },
  35: {
    keyframes: [
      kf(1, { terrain: "desert", crowd: 0.6, actors: [F(0.4, "man", "raise", "brown")] }),
      kf(20, { terrain: "desert", crowd: 0.7, actors: [F(0.35, "woman", "carry", "purple"), F(0.55, "man", "carry", "sand")] }),
    ],
    beats: [
      { upTo: 19, god: "Seis dias se trabalhará, mas o sétimo será santo.", reaction: "Moisés reúne o povo para a obra. 🛠️" },
      { upTo: 99, reaction: "Todos trazem ofertas de coração voluntário. 🎁" },
    ],
  },
  36: {
    keyframes: [
      kf(1, { terrain: "desert", crowd: 0.6, props: [P("tent", 0.5, 1.4)], actors: [F(0.3, "man", "carry", "brown")] }),
    ],
    beats: [
      { upTo: 99, reaction: "Os sábios de coração levantam o tabernáculo. ⛺ As ofertas até sobram!" },
    ],
  },
  37: {
    keyframes: [
      kf(1, { terrain: "desert", glory: 0.4, props: [P("arkCovenant", 0.36, 1.1), P("lampstand", 0.68, 1, 1)], actors: [F(0.3, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 99, reaction: "Bezalel faz a arca, a mesa e o candelabro de ouro. 📦🕎" },
    ],
  },
  38: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("altar", 0.4, 1.2, 0.8)], actors: [F(0.3, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 99, reaction: "O altar de bronze, a bacia e o átrio ficam prontos. 🔨" },
    ],
  },
  39: {
    keyframes: [
      kf(1, { terrain: "desert", glory: 0.4, props: [P("tent", 0.7)], actors: [F(0.4, "man", "stand", "gold")] }),
      kf(32, { terrain: "desert", glory: 0.5, crowd: 0.5, props: [P("tent", 0.6, 1.3)], actors: [F(0.35, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 31, reaction: "As vestes sagradas são concluídas. 👘" },
      { upTo: 99, god: undefined, reaction: "Trazem toda a obra a Moisés — feita como o SENHOR ordenou. ✅" },
    ],
  },
  40: {
    keyframes: [
      kf(1, { terrain: "desert", glory: 0.4, props: [P("tent", 0.5, 1.4)], actors: [F(0.35, "man", "raise", "brown")] }),
      kf(17, { terrain: "desert", glory: 0.6, props: [P("tent", 0.5, 1.5), P("arkCovenant", 0.5, 0.7)], actors: [F(0.3, "man", "stand", "gold")] }),
      kf(34, { terrain: "desert", glory: 0.95, props: [P("tent", 0.5, 1.5), P("pillarCloud", 0.5, 1.2)], actors: [] }),
    ],
    beats: [
      { upTo: 16, god: "No primeiro dia do mês, levantarás o tabernáculo.", reaction: "Moisés arma a Casa do SENHOR. ⛺" },
      { upTo: 33, reaction: "Tudo é posto em ordem — como Deus ordenou. ✨" },
      { upTo: 99, god: "A minha glória encherá o tabernáculo.", reaction: "A nuvem cobre a tenda e a glória a enche! 🌟☁️" },
    ],
  },
};
