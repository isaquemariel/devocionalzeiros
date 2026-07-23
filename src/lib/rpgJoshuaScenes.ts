// ============================================================================
// Roteiros de cena (Living Scene v2) — JOSUÉ, capítulo por capítulo.
// A conquista de Canaã: o chamado de Josué, os espias em Jericó, a travessia
// do Jordão em seco com a arca, a queda dos muros de Jericó, o pecado de Acã,
// o sol que parou, a divisão da terra e a despedida com a aliança em Siquém.
// Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const JOSHUA_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "desert", glory: 0.5, actors: [F(0.42, "man", "kneel", "brown")] }),
      kf(6, { terrain: "hills", glory: 0.4, actors: [F(0.42, "warrior", "raise", "blue")] }),
      kf(10, { terrain: "plain", crowd: 0.6, actors: [F(0.34, "warrior", "raise", "blue"), F(0.58, "elder", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 5, god: "Moisés, meu servo, é morto; agora levanta-te e passa o Jordão.", reaction: "Deus chama Josué para conduzir Israel. 🌟" },
      { upTo: 9, god: "Sê forte e corajoso; eu serei contigo por onde quer que andares.", reaction: "A promessa que sustenta o novo líder. 💪" },
      { upTo: 99, reaction: "Josué ordena aos chefes: preparai-vos para atravessar. 🎒" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.4, props: [P("tower", 0.2, 1.2), P("tower", 0.82, 1)], actors: [F(0.5, "man", "walk", "brown"), F(0.66, "man", "walk", "sand")] }),
      kf(8, { terrain: "city", night: 0.6, props: [P("tower", 0.24, 1.3)], actors: [F(0.4, "woman", "stand", "red"), F(0.6, "man", "kneel", "brown")] }),
      kf(15, { terrain: "city", night: 0.7, props: [P("tower", 0.7, 1.2)], actors: [F(0.4, "woman", "raise", "red"), F(0.58, "man", "walk", "brown", { facing: -1 })] }),
    ],
    beats: [
      { upTo: 7, reaction: "Josué envia dois espias a Jericó. 🕵️" },
      { upTo: 14, reaction: "Raabe os esconde e crê no Deus de Israel. 🤍" },
      { upTo: 99, reaction: "Desce-os pela janela com um cordão vermelho. 🧵" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "river", crowd: 0.7, actors: [F(0.4, "warrior", "stand", "blue")] }),
      kf(8, { terrain: "river", glory: 0.4, crowd: 0.7, props: [P("arkCovenant", 0.5, 1.1)], actors: [F(0.28, "man", "carry", "white"), F(0.72, "man", "carry", "white")] }),
      kf(15, { terrain: "river", glory: 0.6, crowd: 0.8, props: [P("arkCovenant", 0.5, 1.1)], actors: [F(0.3, "man", "carry", "white"), F(0.7, "man", "walk", "sand")] }),
      kf(17, { terrain: "river", glory: 0.5, crowd: 0.8, props: [P("arkCovenant", 0.36, 1)], actors: [F(0.3, "man", "stand", "white"), F(0.6, "man", "walk", "brown")] }),
    ],
    beats: [
      { upTo: 7, god: "Hoje começarei a engrandecer-te aos olhos de todo o Israel.", reaction: "A arca da aliança vai adiante do povo. 📦" },
      { upTo: 13, reaction: "Os sacerdotes põem os pés nas águas do Jordão. 👣" },
      { upTo: 99, reaction: "As águas se detêm e o povo passa em seco! 🌊✨" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "river", crowd: 0.6, actors: [F(0.4, "warrior", "raise", "blue"), F(0.62, "man", "carry", "brown")] }),
      kf(9, { terrain: "river", glory: 0.3, props: [P("arkCovenant", 0.5, 1), P("altar", 0.72, 0.9)], actors: [F(0.3, "man", "carry", "white")] }),
      kf(20, { terrain: "plain", crowd: 0.6, props: [P("altar", 0.5, 1)], actors: [F(0.4, "warrior", "raise", "blue"), F(0.64, "child", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 8, god: "Tomai doze pedras do meio do Jordão.", reaction: "Um homem de cada tribo carrega uma pedra. 🪨" },
      { upTo: 18, reaction: "A arca sai, e o Jordão volta a transbordar. 🌊" },
      { upTo: 99, reaction: "O memorial de pedras: 'Que significam estas?' 📖" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "plain", crowd: 0.5, actors: [F(0.42, "warrior", "stand", "blue")] }),
      kf(10, { terrain: "plain", night: 0.3, props: [P("tent", 0.3), P("tent", 0.7), P("manna", 0.5, 1.4)], actors: [F(0.45, "man", "kneel", "brown")] }),
      kf(13, { terrain: "field", glory: 0.6, props: [P("staff", 0.6)], actors: [F(0.38, "warrior", "bow", "blue"), F(0.62, "angel", "raise", "gold")] }),
    ],
    beats: [
      { upTo: 9, reaction: "Israel se consagra em Gilgal ao entrar na terra. 🕯️" },
      { upTo: 12, reaction: "Comem do fruto da terra; o maná cessa. 🌾" },
      { upTo: 99, god: "Tira as sandálias: o lugar onde estás é santo.", reaction: "O Príncipe do exército do SENHOR aparece. ⚔️✨" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.6, props: [P("tower", 0.18, 1.4), P("tower", 0.82, 1.3)], actors: [F(0.5, "warrior", "stand", "blue")] }),
      kf(6, { terrain: "city", props: [P("tower", 0.2, 1.4), P("arkCovenant", 0.5, 1), P("tower", 0.8, 1.3)], actors: [F(0.34, "man", "carry", "white"), F(0.66, "man", "walk", "brown")] }),
      kf(15, { terrain: "city", crowd: 0.7, props: [P("tower", 0.22, 1.4), P("arkCovenant", 0.5, 1), P("tower", 0.78, 1.3)], actors: [F(0.3, "man", "carry", "white"), F(0.7, "warrior", "raise", "blue")] }),
      kf(20, { terrain: "city", storm: 0.4, crowd: 0.7, props: [P("tower", 0.2, 0.7), P("tower", 0.8, 0.6), P("smoke", 0.5, 2)], actors: [F(0.4, "warrior", "fight", "blue"), F(0.62, "warrior", "raise", "red")] }),
    ],
    beats: [
      { upTo: 5, god: "Eis que entreguei em tuas mãos Jericó e o seu rei.", reaction: "Rodeai a cidade uma vez por dia, seis dias. 🎺" },
      { upTo: 14, reaction: "A arca e as trombetas marcham em silêncio. 📦" },
      { upTo: 19, reaction: "No sétimo dia, sete voltas e o grande brado! 🔊" },
      { upTo: 99, reaction: "Os muros de Jericó caem por terra! 💥 Raabe é poupada." },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "hills", actors: [F(0.4, "warrior", "walk", "blue"), F(0.62, "warrior", "walk", "sand")] }),
      kf(5, { terrain: "hills", storm: 0.4, actors: [F(0.4, "warrior", "fight", "red", { facing: -1 }), F(0.62, "warrior", "mourn", "blue")] }),
      kf(6, { terrain: "plain", night: 0.3, props: [P("arkCovenant", 0.5, 0.9)], actors: [F(0.45, "warrior", "mourn", "blue")] }),
      kf(24, { terrain: "field", storm: 0.3, actors: [F(0.4, "warrior", "raise", "blue"), F(0.62, "man", "kneel", "sand")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Acã tomou do anátema; Israel é ferido em Ai. ⚔️" },
      { upTo: 15, god: "Israel pecou; não me poreis diante dos inimigos assim.", reaction: "Josué prostra-se diante da arca. 😔" },
      { upTo: 99, reaction: "O pecado de Acã é descoberto e julgado. ⚖️" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.3, actors: [F(0.42, "warrior", "raise", "blue")] }),
      kf(14, { terrain: "hills", storm: 0.5, actors: [F(0.3, "warrior", "fight", "blue", { facing: 1 }), F(0.5, "warrior", "fight", "red", { facing: -1 }), F(0.72, "king", "mourn", "purple")] }),
      kf(20, { terrain: "city", fire: 0.6, props: [P("smoke", 0.5, 2.2), P("tower", 0.8, 0.6)], actors: [F(0.4, "warrior", "raise", "blue")] }),
      kf(30, { terrain: "mountain", glory: 0.4, props: [P("altar", 0.5, 1.1, 0.7)], actors: [F(0.4, "warrior", "raise", "blue"), F(0.64, "elder", "bow", "white")] }),
    ],
    beats: [
      { upTo: 13, god: "Não temas; toma contigo toda a gente de guerra e sobe a Ai.", reaction: "Josué prepara a emboscada. 🗡️" },
      { upTo: 29, reaction: "Ai é tomada e o seu rei, derrotado. 🔥" },
      { upTo: 99, reaction: "Josué levanta um altar no monte Ebal e lê a Lei. 📜" },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "hills", actors: [F(0.3, "king", "raise", "purple"), F(0.5, "king", "stand", "red"), F(0.7, "king", "stand", "gold")] }),
      kf(3, { terrain: "plain", actors: [F(0.4, "man", "bow", "gray"), F(0.6, "man", "carry", "sand")] }),
      kf(16, { terrain: "field", actors: [F(0.38, "warrior", "stand", "blue"), F(0.62, "man", "kneel", "gray")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Os reis de Canaã se unem contra Israel. 👑" },
      { upTo: 15, reaction: "Os gibeonitas enganam Josué com vestes gastas. 🥖" },
      { upTo: 99, reaction: "Descoberto o ardil, tornam-se servos ao altar. 🪓" },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.3, "king", "raise", "purple"), F(0.5, "king", "stand", "red")] }),
      kf(8, { terrain: "hills", storm: 0.6, actors: [F(0.3, "warrior", "fight", "blue", { facing: 1 }), F(0.6, "warrior", "fight", "red", { facing: -1 })] }),
      kf(11, { terrain: "hills", storm: 0.8, hail: 0.8, actors: [F(0.4, "warrior", "fight", "blue")] }),
      kf(12, { terrain: "field", glory: 0.9, fire: 0.4, actors: [F(0.42, "warrior", "raise", "blue")] }),
    ],
    beats: [
      { upTo: 7, god: "Não os temas, porque os entreguei nas tuas mãos.", reaction: "Cinco reis atacam Gibeão; Israel socorre. ⚔️" },
      { upTo: 11, reaction: "Deus lança do céu grandes pedras de saraiva. 🧊⚡" },
      { upTo: 99, reaction: "'Sol, detém-te!' — e o dia não findou. ☀️🙌" },
    ],
  },
  11: {
    keyframes: [
      kf(1, { terrain: "hills", actors: [F(0.3, "king", "raise", "purple"), F(0.55, "king", "stand", "gold"), F(0.75, "king", "stand", "red")] }),
      kf(6, { terrain: "mountain", storm: 0.5, actors: [F(0.3, "warrior", "fight", "blue", { facing: 1 }), F(0.6, "warrior", "fight", "red", { facing: -1 })] }),
      kf(10, { terrain: "city", fire: 0.6, props: [P("smoke", 0.5, 2), P("tower", 0.78, 0.7)], actors: [F(0.4, "warrior", "raise", "blue")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Os reis do norte se reúnem junto às águas de Merom. 👑" },
      { upTo: 9, god: "Amanhã os entregarei todos feridos diante de Israel.", reaction: "Josué os fere de improviso. 🗡️" },
      { upTo: 99, reaction: "Hazor é queimada; Josué toma toda a terra. 🔥" },
    ],
  },
  12: {
    keyframes: [
      kf(1, { terrain: "plain", actors: [F(0.4, "warrior", "raise", "blue"), F(0.64, "elder", "stand", "sand")] }),
      kf(7, { terrain: "hills", actors: [F(0.28, "king", "lie", "purple"), F(0.5, "king", "lie", "red"), F(0.72, "king", "lie", "gold")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Os reis vencidos além do Jordão, no oriente. 📜" },
      { upTo: 99, reaction: "Trinta e um reis derrotados por Israel. 👑" },
    ],
  },
  13: {
    keyframes: [
      kf(1, { terrain: "plain", actors: [F(0.42, "elder", "stand", "gray")] }),
      kf(8, { terrain: "hills", actors: [F(0.34, "warrior", "raise", "blue"), F(0.6, "man", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 7, god: "Já estás velho; resta ainda muita terra a possuir.", reaction: "Deus manda repartir a herança. 🗺️" },
      { upTo: 99, reaction: "As tribos do oriente recebem o seu quinhão. 🏞️" },
    ],
  },
  14: {
    keyframes: [
      kf(1, { terrain: "plain", crowd: 0.4, actors: [F(0.34, "warrior", "stand", "blue"), F(0.58, "elder", "stand", "white")] }),
      kf(6, { terrain: "mountain", actors: [F(0.36, "warrior", "stand", "blue"), F(0.6, "elder", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 5, reaction: "A terra é repartida por sortes entre as tribos. 🗺️" },
      { upTo: 99, reaction: "Calebe pede o seu monte: 'Dá-me esta montanha!' ⛰️" },
    ],
  },
  15: {
    keyframes: [
      kf(1, { terrain: "hills", actors: [F(0.4, "man", "stand", "brown")] }),
      kf(16, { terrain: "field", actors: [F(0.36, "elder", "stand", "brown"), F(0.6, "woman", "stand", "purple")] }),
    ],
    beats: [
      { upTo: 12, reaction: "O território de Judá, de mar a mar. 🏜️" },
      { upTo: 99, reaction: "Calebe dá a filha Acsa e as fontes de água. 💧" },
    ],
  },
  16: {
    keyframes: [
      kf(1, { terrain: "hills", actors: [F(0.4, "man", "stand", "green")] }),
    ],
    beats: [
      { upTo: 99, reaction: "A herança dos filhos de José: Efraim recebe a sua terra. 🌿" },
    ],
  },
  17: {
    keyframes: [
      kf(1, { terrain: "hills", actors: [F(0.35, "man", "stand", "brown"), F(0.6, "woman", "stand", "sand")] }),
      kf(14, { terrain: "field", actors: [F(0.36, "warrior", "stand", "blue"), F(0.62, "man", "raise", "green")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Manassés recebe sua parte; as filhas de Zelofeade herdam. 🤍" },
      { upTo: 99, reaction: "José pede mais terra; Josué manda desbravar os montes. 🪓" },
    ],
  },
  18: {
    keyframes: [
      kf(1, { terrain: "plain", crowd: 0.5, props: [P("tent", 0.4, 1.4), P("arkCovenant", 0.6, 0.8)], actors: [F(0.3, "warrior", "raise", "blue")] }),
      kf(8, { terrain: "field", actors: [F(0.4, "man", "walk", "brown"), F(0.6, "man", "walk", "sand")] }),
    ],
    beats: [
      { upTo: 7, reaction: "O tabernáculo é armado em Siló. ⛺" },
      { upTo: 99, reaction: "A terra restante é medida e sorteada perante o SENHOR. 🗺️" },
    ],
  },
  19: {
    keyframes: [
      kf(1, { terrain: "hills", crowd: 0.4, actors: [F(0.3, "man", "stand", "brown"), F(0.55, "man", "stand", "sand"), F(0.78, "man", "stand", "green")] }),
      kf(49, { terrain: "mountain", actors: [F(0.42, "warrior", "raise", "blue")] }),
    ],
    beats: [
      { upTo: 48, reaction: "Simeão, Zebulom, Issacar e as demais tribos herdam. 🏞️" },
      { upTo: 99, reaction: "Josué recebe por último a sua cidade, Timnate-Sera. 🏡" },
    ],
  },
  20: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.3, props: [P("tower", 0.2, 1.1), P("tower", 0.8, 1)], actors: [F(0.5, "man", "walk", "brown")] }),
    ],
    beats: [
      { upTo: 99, god: "Apartai as cidades de refúgio de que vos falei por Moisés.", reaction: "Cidades de refúgio para quem matar sem intenção. 🛡️" },
    ],
  },
  21: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.3, props: [P("altar", 0.5, 1, 0.6)], actors: [F(0.36, "elder", "stand", "white"), F(0.6, "man", "stand", "brown")] }),
      kf(43, { terrain: "plain", glory: 0.4, crowd: 0.4, actors: [F(0.42, "warrior", "raise", "blue")] }),
    ],
    beats: [
      { upTo: 42, reaction: "Os levitas recebem suas cidades e pastagens. 🏘️" },
      { upTo: 99, reaction: "Nenhuma palavra das boas promessas de Deus falhou. ✨" },
    ],
  },
  22: {
    keyframes: [
      kf(1, { terrain: "river", actors: [F(0.34, "warrior", "raise", "blue"), F(0.6, "warrior", "walk", "sand")] }),
      kf(10, { terrain: "river", props: [P("altar", 0.5, 1.3, 0.5)], actors: [F(0.4, "man", "stand", "brown")] }),
      kf(30, { terrain: "field", glory: 0.3, actors: [F(0.36, "elder", "raise", "white"), F(0.62, "man", "bow", "sand")] }),
    ],
    beats: [
      { upTo: 9, reaction: "As tribos do oriente voltam para casa abençoadas. 🤝" },
      { upTo: 20, reaction: "Erguem um grande altar junto ao Jordão; há alarme. ⚠️" },
      { upTo: 99, reaction: "É altar de testemunho, não de rebelião. A paz se firma. 🕊️" },
    ],
  },
  23: {
    keyframes: [
      kf(1, { terrain: "plain", crowd: 0.5, actors: [F(0.42, "elder", "stand", "white")] }),
      kf(6, { terrain: "hills", glory: 0.3, crowd: 0.4, actors: [F(0.38, "elder", "raise", "white"), F(0.62, "elder", "stand", "gray")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Josué, já velho, reúne os líderes de Israel. 👴" },
      { upTo: 11, reaction: "'O SENHOR pelejou por vós; guardai-vos e amai-o.' 💪" },
      { upTo: 99, reaction: "Advertência: não vos mistureis com estas nações. ⚠️" },
    ],
  },
  24: {
    keyframes: [
      kf(1, { terrain: "hills", crowd: 0.6, actors: [F(0.42, "elder", "raise", "white")] }),
      kf(14, { terrain: "hills", glory: 0.4, crowd: 0.6, props: [P("altar", 0.5, 1, 0.5)], actors: [F(0.4, "elder", "raise", "white"), F(0.66, "man", "bow", "brown")] }),
      kf(26, { terrain: "field", glory: 0.4, props: [P("altar", 0.42, 1), P("tree", 0.68, 1.2)], actors: [F(0.4, "elder", "stand", "white")] }),
      kf(29, { terrain: "field", night: 0.4, props: [P("altar", 0.6, 0.8)], actors: [F(0.45, "man", "mourn", "gray")] }),
    ],
    beats: [
      { upTo: 13, reaction: "Em Siquém, Josué relembra tudo o que Deus fez. 📖" },
      { upTo: 24, god: "Escolhei hoje a quem sirvais.", reaction: "'Eu e a minha casa serviremos ao SENHOR.' 🤍" },
      { upTo: 28, reaction: "Faz aliança e ergue uma pedra por testemunha. 🪨" },
      { upTo: 99, reaction: "Josué morre aos cento e dez anos, e é sepultado. 😢" },
    ],
  },
};
