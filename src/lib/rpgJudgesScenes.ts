// ============================================================================
// Roteiros de cena (Living Scene v2) — JUÍZES, capítulo por capítulo.
// Os ciclos de apostasia e libertação: Otniel, Eúde, Débora e Baraque, Gideão
// e os 300, Abimeleque, Jefté, Sansão — e o caos final "não havia rei em
// Israel". Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const JUDGES_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "hills", crowd: 0.5, actors: [F(0.35, "warrior", "stand", "brown"), F(0.55, "warrior", "raise", "red")] }),
      kf(4, { terrain: "hills", storm: 0.3, actors: [F(0.3, "warrior", "fight", "red", { facing: 1 }), F(0.6, "king", "mourn", "gold")] }),
      kf(19, { terrain: "field", actors: [F(0.35, "warrior", "stand", "brown"), F(0.6, "man", "stand", "sand")] }),
      kf(27, { terrain: "city", crowd: 0.4, actors: [F(0.4, "man", "stand", "brown"), F(0.65, "man", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 3, god: "Judá subirá; eis que dei a terra na sua mão.", reaction: "Depois de Josué, Israel pergunta quem subirá primeiro. ⚔️" },
      { upTo: 18, reaction: "Judá vence Adoni-Bezeque e conquista cidades. 🏹" },
      { upTo: 26, reaction: "Mas o ferro dos vales resiste ao seu avanço." },
      { upTo: 99, reaction: "Muitas tribos não expulsam os cananeus da terra. 😔" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.5, actors: [F(0.35, "angel", "raise", "white"), F(0.6, "man", "mourn", "brown")] }),
      kf(4, { terrain: "hills", crowd: 0.6, actors: [F(0.45, "man", "mourn", "brown"), F(0.65, "woman", "mourn", "sand")] }),
      kf(8, { terrain: "field", night: 0.3, actors: [F(0.5, "elder", "lie", "gray")] }),
      kf(11, { terrain: "city", night: 0.4, props: [P("altar", 0.5)], actors: [F(0.4, "man", "bow", "sand")] }),
    ],
    beats: [
      { upTo: 5, god: "Eu vos tirei do Egito; por que desobedecestes à minha voz?", reaction: "O Anjo do SENHOR repreende em Boquim; o povo chora. 😢" },
      { upTo: 10, reaction: "Josué morre; surge uma geração que não conheceu o SENHOR." },
      { upTo: 19, god: undefined, reaction: "Israel abandona o SENHOR e serve a Baal. 🪨" },
      { upTo: 99, reaction: "Começa o ciclo: pecado, opressão, clamor e livramento. 🔁" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "hills", actors: [F(0.4, "man", "stand", "brown"), F(0.62, "warrior", "stand", "red")] }),
      kf(9, { terrain: "field", glory: 0.35, actors: [F(0.4, "warrior", "raise", "brown")] }),
      kf(15, { terrain: "city", night: 0.25, actors: [F(0.35, "warrior", "fight", "brown", { facing: 1 }), F(0.6, "king", "lie", "gold")] }),
      kf(31, { terrain: "field", actors: [F(0.4, "warrior", "fight", "brown", { facing: 1 }), AN(0.7, "ox", 0.9)] }),
    ],
    beats: [
      { upTo: 8, reaction: "Nações são deixadas para provar Israel; o povo cai de novo. 🪤" },
      { upTo: 11, god: undefined, reaction: "Otniel, o primeiro juiz, liberta a terra. ⚔️" },
      { upTo: 30, reaction: "Eúde crava o punhal em Eglom, o rei gordo de Moabe. 🗡️" },
      { upTo: 99, reaction: "Sangar fere 600 filisteus com uma aguilhada de bois. 🐂" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "hills", props: [P("palm", 0.55, 1.2)], actors: [F(0.4, "woman", "stand", "purple")] }),
      kf(6, { terrain: "hills", props: [P("palm", 0.3)], actors: [F(0.35, "woman", "raise", "purple"), F(0.6, "warrior", "stand", "red")] }),
      kf(14, { terrain: "mountain", storm: 0.6, rain: 0.4, actors: [F(0.3, "warrior", "fight", "red", { facing: 1 }), F(0.6, "warrior", "fight", "gray", { facing: -1 })] }),
      kf(21, { terrain: "field", night: 0.4, props: [P("tent", 0.6)], actors: [F(0.4, "woman", "raise", "green"), F(0.62, "warrior", "lie", "gray")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Débora, profetisa, julga Israel sob a palmeira. 🌴" },
      { upTo: 10, god: "Vai, atrai Sísera ao ribeiro de Quisom; eu o entregarei.", reaction: "Ela chama Baraque para a batalha." },
      { upTo: 16, reaction: "O exército de Sísera é desbaratado. ⚔️⚡" },
      { upTo: 99, reaction: "Jael crava a estaca na têmpora de Sísera. 🔨" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.4, actors: [F(0.4, "woman", "raise", "purple"), F(0.6, "warrior", "raise", "red")] }),
      kf(19, { terrain: "mountain", storm: 0.5, rain: 0.3, actors: [F(0.4, "woman", "raise", "purple")] }),
      kf(28, { terrain: "city", night: 0.3, actors: [F(0.5, "woman", "mourn", "gold")] }),
    ],
    beats: [
      { upTo: 11, reaction: "Cântico de Débora e Baraque: 'Louvai ao SENHOR!' 🎶" },
      { upTo: 22, reaction: "As estrelas do céu pelejaram contra Sísera. ⭐⚔️" },
      { upTo: 99, reaction: "A mãe de Sísera espera em vão à janela. 😔" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "field", locusts: 0.5, actors: [F(0.4, "man", "mourn", "sand")] }),
      kf(11, { terrain: "field", glory: 0.5, props: [P("tree", 0.62, 1.2)], actors: [F(0.34, "man", "stand", "brown"), F(0.58, "angel", "raise", "white")] }),
      kf(21, { terrain: "field", glory: 0.7, props: [P("altar", 0.55, 1.1, 1)], actors: [F(0.38, "man", "bow", "brown")] }),
      kf(28, { terrain: "hills", night: 0.4, props: [P("altar", 0.5)], actors: [F(0.42, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 10, reaction: "Midiã oprime Israel; o povo se esconde e clama. 😟" },
      { upTo: 16, god: "O SENHOR é contigo, valente. Vai e salva Israel.", reaction: "O Anjo chama Gideão junto ao carvalho. 👼" },
      { upTo: 24, reaction: "Fogo sobe da rocha e consome a oferta. 🔥" },
      { upTo: 99, reaction: "Gideão derruba o altar de Baal e prova o SENHOR com o velo. 🐑💧" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "hills", crowd: 0.6, actors: [F(0.4, "warrior", "stand", "brown")] }),
      kf(5, { terrain: "river", actors: [F(0.35, "warrior", "kneel", "brown"), F(0.6, "warrior", "stand", "sand")] }),
      kf(16, { terrain: "hills", night: 0.85, fire: 0.6, actors: [F(0.3, "warrior", "raise", "brown", { facing: 1 }), F(0.55, "warrior", "raise", "red")] }),
      kf(22, { terrain: "hills", night: 0.8, fire: 0.5, storm: 0.3, actors: [F(0.4, "warrior", "raise", "brown"), F(0.65, "warrior", "fight", "gray", { facing: -1 })] }),
    ],
    beats: [
      { upTo: 8, god: "O povo é demais; com estes 300 vos salvarei.", reaction: "Deus reduz o exército de Gideão a apenas 300. 🪖" },
      { upTo: 15, reaction: "Um sonho no arraial inimigo anima Gideão. 🌙" },
      { upTo: 21, reaction: "Tochas, trombetas e cântaros quebrados na noite! 🔥🎺" },
      { upTo: 99, reaction: "Midiã foge em pânico; a espada do SENHOR vence! ⚔️" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "desert", actors: [F(0.35, "warrior", "stand", "brown"), F(0.6, "warrior", "walk", "sand")] }),
      kf(10, { terrain: "desert", night: 0.3, actors: [F(0.35, "warrior", "fight", "brown", { facing: 1 }), F(0.62, "king", "mourn", "gold")] }),
      kf(22, { terrain: "city", glory: 0.3, props: [P("altar", 0.55)], actors: [F(0.4, "man", "raise", "gold")] }),
      kf(28, { terrain: "field", night: 0.35, actors: [F(0.45, "elder", "stand", "gray")] }),
    ],
    beats: [
      { upTo: 9, reaction: "Gideão acalma Efraim e persegue os reis de Midiã. 🐫" },
      { upTo: 21, reaction: "Zeba e Zalmuna são capturados e mortos. ⚔️" },
      { upTo: 27, reaction: "Do ouro do despojo, Gideão faz um éfode — um laço. ⚠️" },
      { upTo: 99, reaction: "A terra tem paz 40 anos; então Gideão morre. 🕊️" },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, actors: [F(0.4, "man", "stand", "purple"), F(0.62, "man", "mourn", "sand")] }),
      kf(7, { terrain: "mountain", actors: [F(0.4, "man", "raise", "brown")] }),
      kf(45, { terrain: "city", fire: 0.5, storm: 0.3, actors: [F(0.35, "warrior", "fight", "purple", { facing: 1 })] }),
      kf(53, { terrain: "city", props: [P("tower", 0.55, 1.3)], actors: [F(0.55, "woman", "raise", "sand"), F(0.4, "king", "lie", "purple")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Abimeleque mata 70 irmãos e se faz rei. 👑💀" },
      { upTo: 21, reaction: "Jotão brada a parábola das árvores no monte Gerizim. 🌳" },
      { upTo: 49, reaction: "Guerra em Siquém; a cidade é destruída. 🔥" },
      { upTo: 99, reaction: "Da torre, uma mulher lança a mó e fere Abimeleque. 🪨" },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "hills", actors: [F(0.4, "elder", "stand", "gray"), F(0.62, "elder", "stand", "sand")] }),
      kf(6, { terrain: "city", night: 0.35, props: [P("altar", 0.5)], actors: [F(0.4, "man", "bow", "sand")] }),
      kf(10, { terrain: "field", glory: 0.3, crowd: 0.5, actors: [F(0.45, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Tola e Jair julgam Israel em anos de paz. 🕊️" },
      { upTo: 9, reaction: "O povo serve a outros deuses; amonitas os oprimem. 😔" },
      { upTo: 99, god: "Clamastes a mim; livrai-vos pelos deuses que escolhestes.", reaction: "Israel se arrepende e tira os ídolos. 🙏" },
    ],
  },
  11: {
    keyframes: [
      kf(1, { terrain: "hills", actors: [F(0.4, "warrior", "stand", "brown")] }),
      kf(11, { terrain: "city", crowd: 0.4, actors: [F(0.35, "warrior", "raise", "brown"), F(0.6, "elder", "stand", "gray")] }),
      kf(29, { terrain: "field", storm: 0.4, actors: [F(0.35, "warrior", "fight", "brown", { facing: 1 }), F(0.65, "warrior", "fight", "gray", { facing: -1 })] }),
      kf(34, { terrain: "hills", night: 0.4, actors: [F(0.4, "man", "mourn", "brown"), F(0.6, "woman", "raise", "white")] }),
    ],
    beats: [
      { upTo: 10, reaction: "Jefté, o rejeitado, é chamado a liderar Gileade. 🤝" },
      { upTo: 28, reaction: "Ele apela à história, mas o rei de Amom não ouve." },
      { upTo: 33, god: undefined, reaction: "O Espírito o reveste; Amom é derrotado. ⚔️" },
      { upTo: 99, reaction: "O voto precipitado de Jefté e sua filha. 😢" },
    ],
  },
  12: {
    keyframes: [
      kf(1, { terrain: "river", actors: [F(0.35, "warrior", "fight", "brown", { facing: 1 }), F(0.62, "warrior", "mourn", "gray")] }),
      kf(8, { terrain: "hills", actors: [F(0.4, "elder", "stand", "gray"), F(0.62, "elder", "stand", "sand")] }),
      kf(13, { terrain: "field", actors: [F(0.4, "elder", "stand", "brown"), AN(0.7, "goat", 0.8)] }),
    ],
    beats: [
      { upTo: 7, reaction: "Efraim briga com Jefté; 'Chibolete' os denuncia nos vaus. 🌊" },
      { upTo: 10, reaction: "Ibzã julga Israel após Jefté." },
      { upTo: 99, reaction: "Elom e Abdom julgam a terra em seus dias." },
    ],
  },
  13: {
    keyframes: [
      kf(1, { terrain: "field", night: 0.3, actors: [F(0.45, "woman", "stand", "sand")] }),
      kf(3, { terrain: "field", glory: 0.6, actors: [F(0.35, "angel", "raise", "white"), F(0.6, "woman", "bow", "sand")] }),
      kf(19, { terrain: "hills", glory: 0.8, props: [P("altar", 0.5, 1.1, 1)], actors: [F(0.35, "man", "bow", "brown"), F(0.62, "woman", "kneel", "sand")] }),
      kf(24, { terrain: "field", glory: 0.35, actors: [F(0.4, "woman", "carry", "sand"), F(0.6, "child", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 5, god: "Eis que conceberás um filho; será nazireu de Deus.", reaction: "O Anjo anuncia o nascimento de Sansão. 👼" },
      { upTo: 18, reaction: "Manoá pergunta o nome do Anjo — que é maravilhoso." },
      { upTo: 23, reaction: "O Anjo sobe na chama do altar! 🔥" },
      { upTo: 99, reaction: "Nasce Sansão, e o Espírito começa a movê-lo. ✨" },
    ],
  },
  14: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "warrior", "stand", "brown"), F(0.62, "woman", "stand", "purple")] }),
      kf(5, { terrain: "hills", glory: 0.4, actors: [F(0.4, "warrior", "fight", "brown", { facing: 1 }), AN(0.66, "lion", 1.1)] }),
      kf(12, { terrain: "city", crowd: 0.5, actors: [F(0.4, "warrior", "raise", "brown"), F(0.65, "man", "stand", "sand")] }),
      kf(19, { terrain: "city", night: 0.3, actors: [F(0.4, "warrior", "fight", "brown", { facing: 1 })] }),
    ],
    beats: [
      { upTo: 4, reaction: "Sansão deseja uma mulher filisteia em Timna. 💍" },
      { upTo: 9, reaction: "Ele despedaça um leão com as próprias mãos. 🦁" },
      { upTo: 18, reaction: "O enigma do mel no leão desafia os filisteus. 🍯" },
      { upTo: 99, reaction: "Traído, Sansão fere trinta homens em Asquelom. ⚔️" },
    ],
  },
  15: {
    keyframes: [
      kf(1, { terrain: "field", fire: 0.6, actors: [F(0.4, "warrior", "raise", "brown")] }),
      kf(8, { terrain: "mountain", actors: [F(0.42, "warrior", "stand", "brown")] }),
      kf(14, { terrain: "hills", crowd: 0.4, actors: [F(0.4, "warrior", "fight", "brown", { facing: 1 }), F(0.68, "warrior", "lie", "gray")] }),
      kf(18, { terrain: "desert", glory: 0.3, props: [P("well", 0.6)], actors: [F(0.4, "warrior", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Sansão solta raposas com tochas nas searas. 🔥🦊" },
      { upTo: 13, reaction: "Entregue amarrado, ele rompe as cordas. 💪" },
      { upTo: 17, reaction: "Com uma queixada de jumento, fere mil homens. 🦴" },
      { upTo: 99, god: undefined, reaction: "Deus faz brotar água; Sansão bebe e revive. 💧" },
    ],
  },
  16: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.5, props: [P("tower", 0.6, 1.1)], actors: [F(0.4, "warrior", "carry", "brown")] }),
      kf(4, { terrain: "city", night: 0.3, props: [P("tent", 0.6)], actors: [F(0.4, "warrior", "lie", "brown"), F(0.6, "woman", "stand", "purple")] }),
      kf(21, { terrain: "city", darkness: 0.6, actors: [F(0.45, "servant", "walk", "gray")] }),
      kf(29, { terrain: "city", storm: 0.4, props: [P("tower", 0.4, 1.4), P("tower", 0.62, 1.4)], actors: [F(0.5, "warrior", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Sansão arranca as portas de Gaza e as carrega ao monte. 🚪" },
      { upTo: 17, reaction: "Dalila arranca-lhe o segredo: os sete cabelos. ✂️" },
      { upTo: 22, reaction: "Cego e preso, ele mói no cárcere dos filisteus. ⛓️" },
      { upTo: 99, god: "Lembra-te de mim; fortalece-me só esta vez, ó Deus.", reaction: "Ele derruba o templo de Dagom sobre todos. 🏛️💥" },
    ],
  },
  17: {
    keyframes: [
      kf(1, { terrain: "hills", actors: [F(0.4, "man", "stand", "sand"), F(0.62, "woman", "stand", "gray")] }),
      kf(5, { terrain: "city", night: 0.25, props: [P("altar", 0.5)], actors: [F(0.4, "man", "bow", "sand")] }),
      kf(10, { terrain: "hills", actors: [F(0.4, "man", "stand", "sand"), F(0.6, "servant", "walk", "brown")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Mica faz um ídolo com a prata da mãe. 🪙" },
      { upTo: 6, reaction: "Naqueles dias não havia rei; cada um fazia o que queria." },
      { upTo: 99, reaction: "Mica contrata um levita como seu sacerdote particular. 🏠" },
    ],
  },
  18: {
    keyframes: [
      kf(1, { terrain: "hills", actors: [F(0.35, "warrior", "walk", "brown"), F(0.55, "warrior", "stand", "sand")] }),
      kf(14, { terrain: "city", actors: [F(0.35, "warrior", "carry", "brown"), F(0.6, "man", "mourn", "sand")] }),
      kf(27, { terrain: "city", fire: 0.4, crowd: 0.4, actors: [F(0.4, "warrior", "fight", "brown", { facing: 1 })] }),
    ],
    beats: [
      { upTo: 13, reaction: "Os danitas buscam terra para habitar. 🧭" },
      { upTo: 26, reaction: "Levam à força o ídolo e o sacerdote de Mica. 😠" },
      { upTo: 99, reaction: "Conquistam Laís e a chamam Dã; erguem o ídolo. 🪓" },
    ],
  },
  19: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "man", "stand", "brown"), F(0.6, "woman", "stand", "sand")] }),
      kf(15, { terrain: "city", night: 0.4, actors: [F(0.4, "man", "stand", "brown"), F(0.62, "elder", "stand", "gray")] }),
      kf(22, { terrain: "city", night: 0.8, crowd: 0.4, actors: [F(0.45, "man", "mourn", "brown")] }),
      kf(29, { terrain: "city", night: 0.6, actors: [F(0.5, "man", "mourn", "brown")] }),
    ],
    beats: [
      { upTo: 14, reaction: "Um levita e sua concubina viajam por Gibeá. 🌆" },
      { upTo: 21, reaction: "Um velho os acolhe naquela noite. 🌙" },
      { upTo: 28, reaction: "A maldade de Gibeá traz horror e morte. 😢" },
      { upTo: 99, reaction: "O levita clama a todo Israel por justiça. 📣" },
    ],
  },
  20: {
    keyframes: [
      kf(1, { terrain: "field", crowd: 0.7, actors: [F(0.4, "warrior", "raise", "brown")] }),
      kf(18, { terrain: "hills", glory: 0.3, actors: [F(0.4, "elder", "kneel", "gray")] }),
      kf(29, { terrain: "city", storm: 0.4, actors: [F(0.35, "warrior", "fight", "brown", { facing: 1 }), F(0.65, "warrior", "fight", "gray", { facing: -1 })] }),
      kf(40, { terrain: "city", fire: 0.6, actors: [F(0.5, "warrior", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 17, reaction: "Todo Israel se reúne contra a tribo de Benjamim. ⚔️" },
      { upTo: 28, god: "Subi, porque amanhã os entregarei nas vossas mãos.", reaction: "Após derrotas, o povo busca a Deus chorando. 😔" },
      { upTo: 39, reaction: "Uma emboscada engana e cerca Benjamim. 🪤" },
      { upTo: 99, reaction: "Gibeá arde; Benjamim é quase exterminado. 🔥" },
    ],
  },
  21: {
    keyframes: [
      kf(1, { terrain: "hills", night: 0.3, actors: [F(0.45, "elder", "mourn", "gray")] }),
      kf(12, { terrain: "field", actors: [F(0.4, "warrior", "stand", "brown"), F(0.62, "woman", "stand", "sand")] }),
      kf(19, { terrain: "field", crowd: 0.5, actors: [F(0.4, "woman", "raise", "green"), F(0.6, "woman", "raise", "purple")] }),
    ],
    beats: [
      { upTo: 11, reaction: "Israel lamenta: falta uma tribo em Israel. 😢" },
      { upTo: 18, reaction: "Buscam esposas para os sobreviventes de Benjamim." },
      { upTo: 24, reaction: "Nas festas de Siló, os benjamitas tomam esposas. 💃" },
      { upTo: 99, reaction: "Não havia rei; cada um fazia o que parecia reto. 🌫️" },
    ],
  },
};
