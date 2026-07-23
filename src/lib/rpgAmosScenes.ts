// ============================================================================
// Roteiros de cena (Living Scene v2) — AMÓS, capítulo por capítulo.
// Amós, pastor de Tecoa, clama por justiça social: o leão rugiu, juízos de fogo
// contra as nações e contra Israel, as visões (gafanhotos, fogo, prumo, cesto
// de frutos), "corra o juízo como as águas" e a promessa de restauração final.
// Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const AMOS_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "hills", props: [P("tree", 0.82)], actors: [F(0.34, "shepherd", "stand", "brown"), AN(0.58, "sheep"), AN(0.72, "sheep"), AN(0.88, "goat", 0.9)] }),
      kf(2, { terrain: "hills", glory: 0.4, actors: [F(0.36, "shepherd", "raise", "brown"), AN(0.7, "lion", 1.1)] }),
      kf(6, { terrain: "city", fire: 0.7, props: [P("tower", 0.24, 1.1), P("tower", 0.8, 0.9)], actors: [F(0.5, "elder", "mourn", "gray")] }),
      kf(13, { terrain: "city", fire: 0.85, props: [P("tower", 0.7, 1)], actors: [F(0.42, "warrior", "fight", "red", { facing: 1 })] }),
    ],
    beats: [
      { upTo: 1, reaction: "As palavras de Amós, pastor de Tecoa. 🐑" },
      { upTo: 2, god: "O SENHOR ruge de Sião; secam-se os pastos.", reaction: "O leão rugiu! Quem não temerá? 🦁" },
      { upTo: 10, god: "Enviarei fogo sobre Damasco, Gaza e Tiro.", reaction: "Juízo de fogo contra as nações. 🔥" },
      { upTo: 99, reaction: "Edom e Amom não escaparão da espada. ⚔️" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "plain", fire: 0.7, props: [P("altar", 0.7, 1, 0.9)], actors: [F(0.4, "warrior", "fight", "red", { facing: -1 })] }),
      kf(4, { terrain: "city", fire: 0.6, props: [P("tower", 0.78)], actors: [F(0.44, "elder", "mourn", "purple")] }),
      kf(6, { terrain: "field", night: 0.2, crowd: 0.4, actors: [F(0.34, "man", "lie", "sand"), F(0.6, "man", "stand", "gold")] }),
      kf(13, { terrain: "field", storm: 0.4, actors: [F(0.4, "warrior", "stand", "red"), F(0.66, "man", "mourn", "brown")] }),
    ],
    beats: [
      { upTo: 3, god: "Sobre Moabe enviarei fogo, e ele será queimado.", reaction: "Juízo contra Moabe. 🔥" },
      { upTo: 5, god: "Rejeitaram a lei do SENHOR e não guardaram seus preceitos.", reaction: "Também Judá é julgada." },
      { upTo: 12, god: "Vendem o justo por prata e o pobre por um par de sandálias.", reaction: "Israel esmaga o necessitado. 😢" },
      { upTo: 99, reaction: "Nem o mais valente escapará naquele dia. ⚔️" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.4, actors: [F(0.4, "shepherd", "stand", "brown"), F(0.62, "man", "walk", "sand")] }),
      kf(4, { terrain: "hills", actors: [F(0.34, "shepherd", "raise", "brown"), AN(0.66, "lion", 1.2), AN(0.86, "sheep", 0.8)] }),
      kf(9, { terrain: "city", crowd: 0.5, props: [P("tower", 0.22, 1.1), P("tower", 0.82, 0.9)], actors: [F(0.5, "elder", "mourn", "gray")] }),
      kf(14, { terrain: "city", fire: 0.7, props: [P("altar", 0.5, 1.1, 0.8)], actors: [F(0.62, "man", "mourn", "gold")] }),
    ],
    beats: [
      { upTo: 3, god: "A vós conheci de todas as famílias da terra.", reaction: "Deus fala a Israel, o povo que escolheu." },
      { upTo: 8, god: "O leão rugiu; quem não temerá? O SENHOR falou; quem não profetizará?", reaction: "Nada faz o Senhor sem revelar aos profetas. 🦁" },
      { upTo: 12, reaction: "Do rebanho o pastor só arranca da boca do leão duas pernas. 🐑" },
      { upTo: 99, god: "Castigarei os altares e as casas de marfim.", reaction: "Samaria será derrubada. 🔥" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "hills", actors: [F(0.36, "woman", "stand", "gold"), F(0.58, "man", "carry", "sand")] }),
      kf(6, { terrain: "field", locusts: 0.6, actors: [F(0.4, "man", "mourn", "brown")] }),
      kf(9, { terrain: "field", locusts: 0.9, props: [P("tree", 0.2), P("tree", 0.8)], actors: [F(0.5, "man", "kneel", "brown")] }),
      kf(12, { terrain: "mountain", glory: 0.6, storm: 0.4, actors: [F(0.42, "man", "bow", "brown")] }),
    ],
    beats: [
      { upTo: 3, god: "Ouvi, vacas de Basã, que oprimis os pobres.", reaction: "Repreensão aos que vivem em fartura. 😔" },
      { upTo: 8, god: "Dei-vos fome e sequei as chuvas — contudo não voltastes a mim.", reaction: "Deus envia sinais para o povo voltar." },
      { upTo: 11, god: "Feri vossas hortas com gafanhotos — contudo não voltastes.", reaction: "Praga de gafanhotos e crestamento. 🦗" },
      { upTo: 99, god: "Prepara-te para te encontrares com o teu Deus, ó Israel.", reaction: "Ele forma os montes e cria o vento. ⛰️" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, actors: [F(0.45, "elder", "mourn", "gray")] }),
      kf(4, { terrain: "hills", glory: 0.5, actors: [F(0.42, "man", "raise", "brown")] }),
      kf(18, { terrain: "plain", darkness: 0.7, actors: [F(0.4, "man", "mourn", "sand"), AN(0.7, "lion", 1) ] }),
      kf(24, { terrain: "river", glory: 0.4, props: [P("reeds", 0.2), P("reeds", 0.82)], actors: [F(0.44, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Lamentação: caiu a virgem de Israel. 😢" },
      { upTo: 15, god: "Buscai-me e vivereis; odiai o mal e amai o bem.", reaction: "Estabelecei o juízo na porta. ⚖️" },
      { upTo: 20, god: "Ai dos que desejam o Dia do SENHOR! Será trevas, e não luz.", reaction: "O dia do Senhor: escuridão. ⬛" },
      { upTo: 99, god: "Corra, porém, o juízo como as águas, e a justiça como ribeiro perene.", reaction: "Justiça que flui como um rio! 💧" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.24, 1.1), P("tent", 0.78, 1.2)], actors: [F(0.44, "man", "lie", "purple"), F(0.66, "man", "stand", "gold")] }),
      kf(4, { terrain: "city", crowd: 0.4, props: [P("altar", 0.72, 0.9, 0.4)], actors: [F(0.4, "man", "lie", "gold"), F(0.62, "woman", "stand", "purple")] }),
      kf(8, { terrain: "hills", storm: 0.4, actors: [F(0.42, "elder", "mourn", "gray")] }),
      kf(14, { terrain: "plain", fire: 0.6, props: [P("tower", 0.7)], actors: [F(0.4, "warrior", "fight", "red", { facing: 1 })] }),
    ],
    beats: [
      { upTo: 3, god: "Ai dos que vivem tranquilos em Sião e confiados em Samaria!", reaction: "Ai dos que estão em falso repouso. 😴" },
      { upTo: 7, reaction: "Deitados em leitos de marfim, banqueteiam-se sem dó. 🍷" },
      { upTo: 11, god: "Abomino a soberba de Jacó e entregarei a cidade.", reaction: "O Senhor detesta o orgulho do povo." },
      { upTo: 99, reaction: "Converteram o juízo em fel e a justiça em amargura. ⚔️" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "field", locusts: 0.85, actors: [F(0.4, "man", "kneel", "brown")] }),
      kf(4, { terrain: "field", fire: 0.85, props: [P("tree", 0.2), P("tree", 0.82)], actors: [F(0.44, "man", "raise", "brown")] }),
      kf(7, { terrain: "city", glory: 0.5, props: [P("tower", 0.62, 1.1)], actors: [F(0.36, "man", "stand", "white"), F(0.6, "man", "stand", "brown")] }),
      kf(12, { terrain: "city", crowd: 0.4, props: [P("altar", 0.72, 0.9, 0.3)], actors: [F(0.34, "shepherd", "stand", "brown"), F(0.66, "man", "raise", "purple")] }),
    ],
    beats: [
      { upTo: 3, god: "Isto me mostrou o Senhor: eis gafanhotos.", reaction: "1ª visão: gafanhotos — Amós intercede. 🦗" },
      { upTo: 6, god: "Chamava por fogo, e este devorava o abismo.", reaction: "2ª visão: o fogo — o Senhor se arrepende. 🔥" },
      { upTo: 9, god: "Eis que porei um prumo no meio do meu povo Israel.", reaction: "3ª visão: o prumo mede a nação. 📏" },
      { upTo: 99, god: "Não sou profeta, mas boieiro e cultivador — o SENHOR me tomou do rebanho.", reaction: "Amazias o expulsa; Amós responde a Deus. 🐑" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "field", glory: 0.4, props: [P("basket", 0.5, 1.2), P("tree", 0.84)], actors: [F(0.32, "man", "stand", "brown")] }),
      kf(4, { terrain: "city", crowd: 0.4, actors: [F(0.36, "man", "lie", "sand"), F(0.62, "man", "stand", "gold")] }),
      kf(9, { terrain: "plain", darkness: 0.85, actors: [F(0.44, "man", "mourn", "gray")] }),
      kf(11, { terrain: "desert", night: 0.5, actors: [F(0.4, "man", "kneel", "brown"), F(0.66, "man", "mourn", "sand")] }),
    ],
    beats: [
      { upTo: 3, god: "Que vês, Amós? Um cesto de frutos do verão.", reaction: "4ª visão: o cesto de frutos — chegou o fim. 🧺" },
      { upTo: 6, god: "Vós que pisais o necessitado e falsificais a balança.", reaction: "Deus vê a exploração dos pobres. ⚖️" },
      { upTo: 10, god: "Farei que o sol se ponha ao meio-dia.", reaction: "Escuridão em pleno dia; luto amargo. ⬛" },
      { upTo: 99, god: "Enviarei fome — não de pão, mas de ouvir as palavras do SENHOR.", reaction: "Fome da Palavra pela terra. 📖" },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "city", fire: 0.6, glory: 0.4, props: [P("altar", 0.5, 1.2, 0.9)], actors: [F(0.5, "man", "raise", "brown")] }),
      kf(5, { terrain: "mountain", storm: 0.6, glory: 0.5, actors: [F(0.42, "man", "bow", "brown")] }),
      kf(11, { terrain: "hills", glory: 0.6, props: [P("tent", 0.5, 1.2), P("tree", 0.82)], actors: [F(0.36, "shepherd", "stand", "brown"), AN(0.66, "sheep"), AN(0.8, "sheep", 0.9)] }),
      kf(13, { terrain: "garden", glory: 0.85, rainbow: 0.4, props: [P("tree", 0.24), P("tree", 0.78), P("well", 0.52)], actors: [F(0.44, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 4, god: "Vi o Senhor junto ao altar; ninguém fugirá do juízo.", reaction: "Do céu ao abismo, não há esconderijo. 🔥" },
      { upTo: 10, god: "Peneirarei a casa de Israel entre as nações.", reaction: "Nenhum grão bom cairá por terra." },
      { upTo: 12, god: "Naquele dia levantarei a tenda caída de Davi.", reaction: "Promessa de restauração! ✨" },
      { upTo: 99, god: "Plantarei Israel na sua terra, e nunca mais será arrancado.", reaction: "Os montes destilarão vinho; o povo restaurado. 🍇🌟" },
    ],
  },
};
