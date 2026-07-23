// ============================================================================
// Roteiros de cena (Living Scene v2) — 2 REIS, capítulo por capítulo.
// Elias arrebatado no carro de fogo, os milagres de Eliseu, Naamã curado no
// Jordão, os carros de fogo, a queda de Samaria, o Livro da Lei achado por
// Josias e a queda de Jerusalém com o exílio na Babilônia.
// Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const KINGS2_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.2, props: [P("tower", 0.8, 1.1)], actors: [F(0.5, "king", "lie", "gold")] }),
      kf(9, { terrain: "hills", actors: [F(0.32, "elder", "stand", "brown"), F(0.66, "warrior", "stand", "red", { facing: -1 })] }),
      kf(10, { terrain: "hills", fire: 0.85, glory: 0.4, actors: [F(0.3, "elder", "raise", "brown"), F(0.68, "warrior", "lie", "red")] }),
      kf(15, { terrain: "city", actors: [F(0.34, "elder", "stand", "brown"), F(0.6, "king", "mourn", "gold")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Acazias cai e consulta um deus estrangeiro. 🤕" },
      { upTo: 14, god: "Descerá fogo do céu e te consumirá.", reaction: "Fogo desce sobre os capitães enviados a Elias. 🔥" },
      { upTo: 99, reaction: "Elias anuncia o juízo, e o rei morre. ⚖️" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "plain", actors: [F(0.36, "elder", "walk", "brown"), F(0.56, "man", "walk", "white")] }),
      kf(8, { terrain: "river", seaSplit: 0.7, actors: [F(0.34, "elder", "raise", "brown"), F(0.58, "man", "stand", "white")] }),
      kf(11, { terrain: "plain", pillarFire: 0.9, storm: 0.7, glory: 0.7, props: [P("pillarFire", 0.5, 1.4)], actors: [F(0.34, "man", "raise", "white")] }),
      kf(14, { terrain: "river", glory: 0.4, props: [P("staff", 0.5)], actors: [F(0.45, "man", "raise", "white")] }),
      kf(23, { terrain: "hills", actors: [F(0.4, "man", "walk", "white"), F(0.68, "child", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 7, reaction: "Elias e Eliseu caminham juntos rumo ao Jordão. 🚶" },
      { upTo: 10, god: undefined, reaction: "Eliseu pede porção dobrada do espírito. 🙏" },
      { upTo: 14, reaction: "Um carro de fogo e um redemoinho levam Elias ao céu! 🔥🌪️ Eliseu vê subir." },
      { upTo: 99, reaction: "Com o manto, Eliseu divide as águas do Jordão. 💧" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.5, "king", "stand", "gold")] }),
      kf(9, { terrain: "desert", actors: [F(0.28, "king", "walk", "gold"), F(0.48, "king", "walk", "purple"), F(0.68, "king", "walk", "sand")] }),
      kf(15, { terrain: "desert", glory: 0.3, actors: [F(0.4, "elder", "raise", "brown")] }),
      kf(20, { terrain: "desert", blood: 0.6, props: [P("well", 0.6)], actors: [F(0.5, "warrior", "stand", "red")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Moabe se rebela; três reis marcham juntos. 👑" },
      { upTo: 19, god: "Este vale se encherá de água, e Moabe será entregue.", reaction: "Eliseu profetiza água e vitória. 💧" },
      { upTo: 99, reaction: "As águas parecem sangue ao sol; Moabe é derrotado. ⚔️" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("well", 0.7)], actors: [F(0.34, "woman", "mourn", "blue"), F(0.6, "elder", "stand", "brown")] }),
      kf(6, { terrain: "city", glory: 0.3, props: [P("basket", 0.42), P("basket", 0.56)], actors: [F(0.32, "woman", "raise", "blue"), F(0.7, "child", "stand", "sand")] }),
      kf(17, { terrain: "field", props: [P("tent", 0.7)], actors: [F(0.4, "woman", "carry", "green"), F(0.66, "child", "lie", "sand")] }),
      kf(34, { terrain: "field", glory: 0.5, props: [P("tent", 0.72)], actors: [F(0.42, "elder", "kneel", "brown"), F(0.62, "child", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 7, reaction: "O azeite da viúva não para de fluir! 🫙✨" },
      { upTo: 17, reaction: "A sunamita hospeda o profeta e recebe um filho. 🏠" },
      { upTo: 37, god: undefined, reaction: "Eliseu ressuscita o menino da sunamita. 🙏💛" },
      { upTo: 99, reaction: "Cem homens são fartos com poucos pães. 🍞" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.82)], actors: [F(0.4, "warrior", "stand", "gray"), F(0.66, "king", "stand", "purple")] }),
      kf(9, { terrain: "field", props: [P("tent", 0.7)], actors: [F(0.3, "warrior", "stand", "gray"), F(0.6, "servant", "stand", "sand")] }),
      kf(14, { terrain: "river", glory: 0.4, actors: [F(0.5, "man", "kneel", "white")] }),
      kf(27, { terrain: "city", actors: [F(0.4, "elder", "stand", "brown"), F(0.66, "servant", "mourn", "gray")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Naamã, general leproso, busca cura em Israel. 🎖️" },
      { upTo: 13, god: undefined, reaction: "Eliseu manda: 'Lava-te sete vezes no Jordão.' 🌊" },
      { upTo: 19, reaction: "Naamã mergulha e sai curado, com pele de criança! ✨" },
      { upTo: 99, reaction: "A cobiça de Geazi lhe traz a lepra. ⚖️" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "river", props: [P("tree", 0.2), P("tree", 0.78)], actors: [F(0.4, "elder", "raise", "brown"), F(0.62, "man", "stand", "sand")] }),
      kf(13, { terrain: "mountain", night: 0.4, actors: [F(0.5, "warrior", "stand", "red", { facing: -1 })] }),
      kf(17, { terrain: "mountain", fire: 0.85, glory: 0.6, props: [P("pillarFire", 0.3, 1.1), P("pillarFire", 0.72, 1.1)], actors: [F(0.5, "warrior", "stand", "gold")] }),
      kf(25, { terrain: "city", night: 0.3, crowd: 0.4, actors: [F(0.4, "king", "mourn", "purple"), F(0.66, "woman", "mourn", "gray")] }),
    ],
    beats: [
      { upTo: 7, reaction: "O ferro do machado flutua sobre as águas. 🪓💧" },
      { upTo: 16, god: undefined, reaction: "Eliseu ora: abre-lhe os olhos, Senhor. 🙏" },
      { upTo: 23, reaction: "O monte se enche de cavalos e carros de fogo! 🔥🐎" },
      { upTo: 99, reaction: "Samaria sofre um cerco cruel e faminto. 😔" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "elder", "raise", "brown"), F(0.66, "warrior", "stand", "gray")] }),
      kf(3, { terrain: "city", night: 0.6, actors: [F(0.3, "man", "walk", "sand"), F(0.5, "man", "walk", "sand"), F(0.66, "man", "walk", "sand"), F(0.82, "man", "walk", "sand")] }),
      kf(7, { terrain: "field", night: 0.7, storm: 0.4, props: [P("tent", 0.4), P("tent", 0.7)], actors: [] }),
      kf(16, { terrain: "city", crowd: 0.7, actors: [F(0.4, "man", "carry", "brown"), F(0.62, "man", "raise", "sand")] }),
    ],
    beats: [
      { upTo: 2, god: "Amanhã, a esta hora, a farinha se venderá barata.", reaction: "Eliseu anuncia o fim da fome. 🌾" },
      { upTo: 8, reaction: "Quatro leprosos acham o acampamento sírio vazio. 🏕️" },
      { upTo: 15, reaction: "O SENHOR fez ouvir estrondo de carros; os sírios fugiram. 🐎" },
      { upTo: 99, reaction: "A fartura volta a Samaria — como Deus disse. ✨" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "field", actors: [F(0.4, "woman", "walk", "green"), F(0.66, "child", "walk", "sand")] }),
      kf(7, { terrain: "city", props: [P("tower", 0.8)], actors: [F(0.34, "elder", "mourn", "brown"), F(0.62, "man", "stand", "gray")] }),
      kf(16, { terrain: "city", actors: [F(0.5, "king", "stand", "purple")] }),
    ],
    beats: [
      { upTo: 6, reaction: "A sunamita recupera sua terra pela palavra do profeta. 🏡" },
      { upTo: 15, god: undefined, reaction: "Eliseu chora ao ver o mal que Hazael fará. 😢" },
      { upTo: 99, reaction: "Jorão reina em Judá, andando em caminhos maus. 👑" },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.3, props: [P("basket", 0.5)], actors: [F(0.36, "man", "raise", "white"), F(0.6, "warrior", "kneel", "gray")] }),
      kf(13, { terrain: "field", actors: [F(0.5, "warrior", "raise", "gold"), F(0.72, "warrior", "stand", "red")] }),
      kf(24, { terrain: "field", blood: 0.5, actors: [F(0.4, "warrior", "fight", "gold", { facing: 1 }), F(0.66, "king", "lie", "purple")] }),
      kf(33, { terrain: "city", night: 0.3, props: [P("tower", 0.78, 1.2)], actors: [F(0.4, "warrior", "raise", "gold"), F(0.78, "woman", "mourn", "purple")] }),
    ],
    beats: [
      { upTo: 12, god: "Ungi-te rei sobre Israel.", reaction: "Jeú é ungido rei por um profeta. 🫗👑" },
      { upTo: 26, reaction: "Jeú avança e fere Jorão com a flecha. 🏹" },
      { upTo: 99, reaction: "Jezabel é lançada da janela — juízo cumprido. ⚖️" },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "warrior", "stand", "gold"), F(0.66, "elder", "bow", "gray")] }),
      kf(18, { terrain: "city", crowd: 0.6, props: [P("altar", 0.5)], actors: [F(0.4, "warrior", "stand", "gold")] }),
      kf(25, { terrain: "city", fire: 0.7, props: [P("altar", 0.5), P("smoke", 0.6, 1.8)], actors: [F(0.4, "warrior", "raise", "gold")] }),
    ],
    beats: [
      { upTo: 17, reaction: "Jeú extermina toda a casa de Acabe. ⚔️" },
      { upTo: 28, reaction: "Ele reúne os profetas de Baal e destrói o culto. 🔥" },
      { upTo: 99, god: undefined, reaction: "Mas Jeú não se aparta de todos os pecados. 😔" },
    ],
  },
  11: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.4, actors: [F(0.5, "woman", "raise", "purple")] }),
      kf(2, { terrain: "city", night: 0.3, props: [P("tent", 0.7)], actors: [F(0.4, "woman", "carry", "blue"), F(0.66, "child", "lie", "sand")] }),
      kf(12, { terrain: "city", glory: 0.4, crowd: 0.6, props: [P("altar", 0.7)], actors: [F(0.4, "elder", "raise", "white"), F(0.6, "child", "stand", "gold")] }),
      kf(18, { terrain: "city", fire: 0.5, crowd: 0.5, props: [P("altar", 0.6), P("smoke", 0.7, 1.6)], actors: [F(0.5, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Atalia mata a família real; só Joás é escondido. 😢" },
      { upTo: 11, god: undefined, reaction: "O sacerdote Joiada esconde o menino no templo por seis anos. 🛡️" },
      { upTo: 16, reaction: "Joás é coroado rei; Atalia cai. 👑" },
      { upTo: 99, reaction: "O povo destrói o templo de Baal. 🔨" },
    ],
  },
  12: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.8)], actors: [F(0.5, "king", "stand", "gold")] }),
      kf(9, { terrain: "city", props: [P("basket", 0.4), P("altar", 0.66)], actors: [F(0.36, "king", "stand", "gold"), F(0.62, "elder", "stand", "white")] }),
      kf(11, { terrain: "city", crowd: 0.4, props: [P("tower", 0.7, 1.2)], actors: [F(0.4, "man", "carry", "brown"), F(0.64, "man", "carry", "sand")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Joás faz o certo enquanto Joiada o instrui. 🤍" },
      { upTo: 16, reaction: "As ofertas são reunidas para reparar a Casa do SENHOR. 💰" },
      { upTo: 99, reaction: "O templo é restaurado com fidelidade. 🔨" },
    ],
  },
  13: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.2, actors: [F(0.5, "king", "mourn", "gray")] }),
      kf(14, { terrain: "city", props: [P("tent", 0.7)], actors: [F(0.36, "elder", "lie", "brown"), F(0.62, "king", "kneel", "gold")] }),
      kf(21, { terrain: "field", night: 0.5, glory: 0.4, actors: [F(0.4, "man", "raise", "sand"), F(0.66, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 13, reaction: "Reis de Israel oscilam entre o mal e o clamor. 😔" },
      { upTo: 20, god: undefined, reaction: "Eliseu adoece e profetiza vitória a Joás. 🏹" },
      { upTo: 99, reaction: "Um morto revive ao tocar os ossos de Eliseu! ✨" },
    ],
  },
  14: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.5, "king", "stand", "gold")] }),
      kf(8, { terrain: "field", actors: [F(0.34, "warrior", "fight", "red", { facing: 1 }), F(0.66, "warrior", "fight", "gray", { facing: -1 })] }),
      kf(23, { terrain: "city", props: [P("tower", 0.8, 1.1)], actors: [F(0.5, "king", "raise", "purple")] }),
    ],
    beats: [
      { upTo: 7, reaction: "Amazias reina em Judá e vence Edom. 👑" },
      { upTo: 14, reaction: "Judá e Israel se enfrentam em batalha. ⚔️" },
      { upTo: 99, reaction: "Jeroboão II restaura as fronteiras de Israel. 🗺️" },
    ],
  },
  15: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.82)], actors: [F(0.5, "king", "stand", "gold")] }),
      kf(5, { terrain: "city", night: 0.2, actors: [F(0.5, "king", "mourn", "gray")] }),
      kf(19, { terrain: "hills", actors: [F(0.4, "king", "bow", "gray"), F(0.66, "warrior", "stand", "red", { facing: -1 })] }),
    ],
    beats: [
      { upTo: 7, reaction: "Azarias reina, mas fere-se de lepra. 🤒" },
      { upTo: 18, reaction: "Reis sobem e caem depressa em Israel. 👑" },
      { upTo: 99, reaction: "A Assíria já ronda a terra, cobrando tributo. 🛡️" },
    ],
  },
  16: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.2, actors: [F(0.5, "king", "stand", "purple")] }),
      kf(7, { terrain: "city", actors: [F(0.4, "king", "bow", "purple"), F(0.66, "king", "stand", "gray")] }),
      kf(10, { terrain: "city", fire: 0.4, props: [P("altar", 0.5, 1.1, 0.6), P("smoke", 0.6, 1.4)], actors: [F(0.4, "king", "stand", "purple")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Acaz faz o mal e imita as nações. 😔" },
      { upTo: 9, reaction: "Ele compra socorro do rei da Assíria. 💰" },
      { upTo: 99, reaction: "Acaz ergue um altar pagão no templo. ⚠️" },
    ],
  },
  17: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.2, actors: [F(0.5, "king", "stand", "gray")] }),
      kf(5, { terrain: "city", crowd: 0.6, actors: [F(0.4, "warrior", "fight", "red", { facing: 1 }), F(0.7, "warrior", "stand", "gray")] }),
      kf(6, { terrain: "city", fire: 0.8, crowd: 0.7, props: [P("tower", 0.8, 1.2), P("smoke", 0.5, 2)], actors: [F(0.3, "warrior", "raise", "red"), F(0.6, "man", "mourn", "sand")] }),
      kf(23, { terrain: "desert", crowd: 0.7, night: 0.3, actors: [F(0.3, "man", "walk", "sand"), F(0.55, "man", "carry", "gray"), F(0.78, "woman", "mourn", "blue")] }),
    ],
    beats: [
      { upTo: 5, reaction: "A Assíria cerca Samaria por três anos. 🛡️" },
      { upTo: 12, reaction: "Samaria cai; Israel é levado cativo. 🔥😢" },
      { upTo: 23, god: undefined, reaction: "O reino do Norte é exilado por sua rebeldia. ⚖️" },
      { upTo: 99, reaction: "Povos estrangeiros ocupam a terra deserta. 🏙️" },
    ],
  },
  18: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.3, actors: [F(0.5, "king", "raise", "purple")] }),
      kf(4, { terrain: "city", props: [P("serpent", 0.5, 1.1)], actors: [F(0.4, "king", "fight", "purple", { facing: 1 })] }),
      kf(17, { terrain: "city", crowd: 0.5, props: [P("tower", 0.8, 1.2)], actors: [F(0.3, "king", "stand", "purple"), F(0.7, "warrior", "raise", "red", { facing: -1 })] }),
    ],
    beats: [
      { upTo: 8, reaction: "Ezequias confia no SENHOR e faz o bem. 🤍" },
      { upTo: 16, reaction: "Ele derruba os altos e a serpente de bronze. 🐍" },
      { upTo: 99, reaction: "Senaqueribe invade e o Rabsaqué blasfema. 😠" },
    ],
  },
  19: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.2, props: [P("altar", 0.66)], actors: [F(0.5, "king", "mourn", "purple")] }),
      kf(14, { terrain: "city", glory: 0.4, props: [P("altar", 0.5)], actors: [F(0.5, "king", "kneel", "purple")] }),
      kf(35, { terrain: "field", night: 0.7, glory: 0.6, props: [P("tent", 0.4), P("tent", 0.7)], actors: [F(0.5, "angel", "raise", "white")] }),
    ],
    beats: [
      { upTo: 13, reaction: "Ezequias leva a ameaça ao profeta Isaías. 📜" },
      { upTo: 19, god: "Eu defenderei esta cidade para a salvar.", reaction: "Ezequias ora diante do SENHOR. 🙏" },
      { upTo: 99, reaction: "Um anjo fere o exército assírio na noite! 👼⚔️" },
    ],
  },
  20: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.2, props: [P("tent", 0.7)], actors: [F(0.5, "king", "lie", "purple"), F(0.72, "elder", "stand", "brown")] }),
      kf(8, { terrain: "city", glory: 0.5, props: [P("star", 0.5, 1.2)], actors: [F(0.5, "king", "raise", "purple")] }),
      kf(12, { terrain: "city", props: [P("basket", 0.4), P("basket", 0.55)], actors: [F(0.36, "king", "stand", "purple"), F(0.66, "man", "bow", "gray")] }),
    ],
    beats: [
      { upTo: 7, god: "Ouvi a tua oração; sararei a tua enfermidade.", reaction: "Deus acrescenta quinze anos a Ezequias. 💛" },
      { upTo: 11, reaction: "A sombra recua dez graus no relógio! 🌅" },
      { upTo: 99, reaction: "Ezequias mostra tudo aos enviados da Babilônia. ⚠️" },
    ],
  },
  21: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, props: [P("altar", 0.5, 1, 0.5)], actors: [F(0.5, "king", "stand", "gray")] }),
      kf(16, { terrain: "city", night: 0.5, blood: 0.3, actors: [F(0.4, "king", "stand", "gray"), F(0.68, "man", "mourn", "sand")] }),
      kf(19, { terrain: "city", night: 0.3, actors: [F(0.5, "king", "stand", "gray")] }),
    ],
    beats: [
      { upTo: 9, reaction: "Manassés enche Judá de idolatria. 😔" },
      { upTo: 18, god: "Trarei tal mal que a quem o ouvir retinirão os ouvidos.", reaction: "O SENHOR anuncia juízo sobre Jerusalém. ⚖️" },
      { upTo: 99, reaction: "Amom segue no mal e é morto. 🌑" },
    ],
  },
  22: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.3, actors: [F(0.5, "king", "stand", "purple")] }),
      kf(8, { terrain: "city", glory: 0.5, props: [P("tablets", 0.5, 1.1)], actors: [F(0.36, "elder", "raise", "white"), F(0.64, "man", "stand", "sand")] }),
      kf(11, { terrain: "city", night: 0.2, props: [P("tablets", 0.6)], actors: [F(0.5, "king", "mourn", "purple")] }),
    ],
    beats: [
      { upTo: 7, reaction: "Josias, jovem rei, manda reparar o templo. 🔨" },
      { upTo: 10, reaction: "Acham o Livro da Lei na Casa do SENHOR! 📖✨" },
      { upTo: 99, god: undefined, reaction: "Josias rasga as vestes e busca a Deus. 😢" },
    ],
  },
  23: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.6, props: [P("tablets", 0.5)], actors: [F(0.4, "king", "raise", "purple")] }),
      kf(4, { terrain: "city", fire: 0.7, props: [P("altar", 0.5), P("smoke", 0.6, 1.8)], actors: [F(0.4, "king", "raise", "purple")] }),
      kf(21, { terrain: "city", glory: 0.4, props: [P("altar", 0.6, 1, 0.6)], actors: [F(0.4, "king", "stand", "purple"), F(0.66, "man", "kneel", "brown")] }),
      kf(29, { terrain: "field", night: 0.4, actors: [F(0.4, "king", "lie", "purple"), F(0.66, "warrior", "stand", "red")] }),
    ],
    beats: [
      { upTo: 3, god: undefined, reaction: "Josias lê a Lei e renova a aliança. 📖" },
      { upTo: 20, reaction: "Ele destrói os ídolos e altos de Judá. 🔥" },
      { upTo: 27, reaction: "Celebram a Páscoa como não havia muito tempo. 🐑" },
      { upTo: 99, reaction: "Josias morre em batalha; o luto cobre a terra. 😢" },
    ],
  },
  24: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, actors: [F(0.5, "king", "stand", "gray")] }),
      kf(10, { terrain: "city", crowd: 0.6, props: [P("tower", 0.8, 1.1)], actors: [F(0.3, "king", "mourn", "purple"), F(0.7, "warrior", "stand", "red", { facing: -1 })] }),
      kf(14, { terrain: "desert", crowd: 0.7, night: 0.3, actors: [F(0.3, "man", "walk", "sand"), F(0.56, "man", "carry", "gray")] }),
    ],
    beats: [
      { upTo: 9, reaction: "Nabucodonosor sobe contra Judá. 🛡️" },
      { upTo: 16, reaction: "Joaquim se rende; a Babilônia leva cativos. 😔" },
      { upTo: 99, god: undefined, reaction: "Zedequias reina, mas a queda se aproxima. 🌑" },
    ],
  },
  25: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.4, crowd: 0.5, props: [P("tower", 0.8, 1.2)], actors: [F(0.5, "warrior", "stand", "red", { facing: -1 })] }),
      kf(4, { terrain: "city", night: 0.6, actors: [F(0.4, "king", "walk", "purple"), F(0.68, "warrior", "fight", "red", { facing: 1 })] }),
      kf(9, { terrain: "city", fire: 0.9, night: 0.5, crowd: 0.4, props: [P("tower", 0.78, 1.2), P("smoke", 0.5, 2.2)], actors: [F(0.4, "warrior", "raise", "red")] }),
      kf(11, { terrain: "desert", night: 0.6, crowd: 0.8, actors: [F(0.3, "man", "walk", "sand"), F(0.52, "man", "carry", "gray"), F(0.74, "woman", "mourn", "blue")] }),
      kf(27, { terrain: "city", night: 0.3, actors: [F(0.5, "king", "stand", "purple")] }),
    ],
    beats: [
      { upTo: 3, reaction: "A Babilônia cerca Jerusalém; a fome aperta. 🛡️" },
      { upTo: 7, reaction: "A cidade é rompida; Zedequias é capturado. 😢" },
      { upTo: 12, reaction: "O templo e Jerusalém são queimados; o povo, exilado. 🔥🌑" },
      { upTo: 99, god: undefined, reaction: "No exílio, Joaquim recebe favor — resta uma esperança. 🕯️" },
    ],
  },
};
