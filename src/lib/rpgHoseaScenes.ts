// ============================================================================
// Roteiros de cena (Living Scene v2) — OSÉIAS, capítulo por capítulo.
// O profeta se casa com Gômer, mulher infiel, como retrato do amor de Deus por
// Israel adúltero: filhos de nomes de juízo, controvérsia contra a nação,
// apelo ao arrependimento e a promessa de restauração — "eu os amarei
// livremente". Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Gênesis/Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const HOSEA_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.35, actors: [F(0.4, "man", "stand", "brown"), F(0.6, "woman", "stand", "red")] }),
      kf(3, { terrain: "city", props: [P("tent", 0.72)], actors: [F(0.36, "man", "stand", "brown"), F(0.54, "woman", "carry", "red"), F(0.7, "child", "stand", "sand")] }),
      kf(6, { terrain: "field", night: 0.3, actors: [F(0.4, "woman", "mourn", "red"), F(0.6, "child", "stand", "gray")] }),
      kf(9, { terrain: "field", night: 0.45, actors: [F(0.5, "child", "mourn", "gray")] }),
    ],
    beats: [
      { upTo: 2, god: "Toma uma mulher de prostituições, pois a terra se prostitui.", reaction: "Deus manda Oséias casar-se com Gômer. 💔" },
      { upTo: 5, reaction: "Nasce Jezreel — o SENHOR fará justiça. 👶" },
      { upTo: 8, god: "Chama-a Lo-Ruama: não mais me compadecerei de Israel.", reaction: "'Não amada' — o juízo se aproxima. 😢" },
      { upTo: 99, god: "Chama-o Lo-Ami: vós não sois meu povo.", reaction: "Ainda assim: 'sereis chamados filhos do Deus vivo.' 🤍" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, actors: [F(0.4, "woman", "walk", "red"), F(0.66, "man", "stand", "gray")] }),
      kf(6, { terrain: "field", darkness: 0.4, actors: [F(0.5, "woman", "mourn", "red")] }),
      kf(14, { terrain: "desert", glory: 0.4, props: [P("tent", 0.7)], actors: [F(0.4, "man", "stand", "white"), F(0.58, "woman", "stand", "purple")] }),
      kf(19, { terrain: "field", glory: 0.6, props: [P("tree", 0.72), P("dove", 0.3)], actors: [F(0.42, "man", "raise", "white"), F(0.58, "woman", "raise", "green")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Israel corre atrás dos seus amantes. 💔" },
      { upTo: 13, god: "Cercarei o teu caminho com espinhos.", reaction: "O juízo tira o trigo, o vinho e a alegria. 🥀" },
      { upTo: 18, god: "Eis que a atrairei, e a levarei ao deserto, e lhe falarei ao coração.", reaction: "Deus corteja de novo o seu povo. 🕊️" },
      { upTo: 99, god: "Desposar-te-ei comigo para sempre, em justiça e misericórdia.", reaction: "E direi: 'Tu és o meu povo.' ✨" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.25, actors: [F(0.44, "man", "walk", "brown"), F(0.66, "woman", "lie", "red")] }),
      kf(2, { terrain: "city", props: [P("basket", 0.6)], actors: [F(0.4, "man", "carry", "brown"), F(0.62, "woman", "stand", "sand")] }),
      kf(3, { terrain: "field", glory: 0.4, props: [P("tent", 0.72)], actors: [F(0.42, "man", "stand", "white"), F(0.58, "woman", "kneel", "purple")] }),
    ],
    beats: [
      { upTo: 1, god: "Ama uma mulher amada de outro, como o SENHOR ama Israel.", reaction: "Deus manda Oséias amar Gômer de novo. 🤍" },
      { upTo: 3, reaction: "Ele a resgata por prata e cevada. 💰" },
      { upTo: 99, reaction: "Israel voltará e buscará o SENHOR nos últimos dias. 🙏" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "field", night: 0.3, actors: [F(0.4, "man", "mourn", "gray"), F(0.62, "elder", "stand", "sand")] }),
      kf(3, { terrain: "field", darkness: 0.35, actors: [F(0.5, "man", "mourn", "brown"), AN(0.72, "ox", 0.85), AN(0.85, "sheep")] }),
      kf(12, { terrain: "hills", night: 0.35, props: [P("altar", 0.5, 1, 0.5), P("tree", 0.78)], actors: [F(0.36, "man", "bow", "red")] }),
    ],
    beats: [
      { upTo: 3, god: "O SENHOR tem contenda com os habitantes da terra.", reaction: "Não há verdade nem conhecimento de Deus. ⚖️" },
      { upTo: 11, god: "O meu povo foi destruído por falta de conhecimento.", reaction: "Os sacerdotes esqueceram a lei. 📖" },
      { upTo: 99, reaction: "Sacrificam nos montes, sob a árvore frondosa. 🌳" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, actors: [F(0.34, "elder", "stand", "gray"), F(0.5, "king", "stand", "gold"), F(0.68, "man", "stand", "brown")] }),
      kf(8, { terrain: "hills", storm: 0.5, night: 0.35, actors: [F(0.4, "warrior", "fight", "red", { facing: 1 })] }),
      kf(14, { terrain: "mountain", night: 0.4, actors: [AN(0.5, "lion", 1.1), F(0.75, "man", "mourn", "brown")] }),
    ],
    beats: [
      { upTo: 7, god: "Ouvi isto, ó sacerdotes; escutai, ó casa do rei.", reaction: "O juízo alcança líderes e povo. ⚖️" },
      { upTo: 13, reaction: "A trombeta soa: guerra sobre Efraim e Judá. 📯" },
      { upTo: 99, god: "Serei como um leão para Efraim; despedaçarei e me retirarei.", reaction: "Deus se recolhe até que busquem a sua face. 🦁" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.4, actors: [F(0.4, "man", "kneel", "white"), F(0.6, "man", "raise", "brown")] }),
      kf(4, { terrain: "field", night: 0.4, actors: [F(0.5, "man", "stand", "gray")] }),
      kf(6, { terrain: "hills", glory: 0.5, props: [P("altar", 0.5, 1, 0.3)], actors: [F(0.45, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 3, reaction: "'Vinde, e voltemos para o SENHOR!' 🙏" },
      { upTo: 5, god: "O vosso amor é como a névoa da manhã, que cedo se dissipa.", reaction: "A devoção some como o orvalho ao sol. 🌫️" },
      { upTo: 99, god: "Misericórdia quero, e não sacrifício; conhecimento de Deus, mais que holocaustos.", reaction: "Deus deseja o coração, não o rito. 🤍" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, actors: [F(0.4, "man", "stand", "red"), F(0.66, "king", "lie", "gold")] }),
      kf(4, { terrain: "city", fire: 0.6, night: 0.3, props: [P("smoke", 0.5, 1.6)], actors: [F(0.45, "man", "stand", "brown")] }),
      kf(11, { terrain: "field", props: [P("dove", 0.5)], actors: [F(0.35, "man", "walk", "sand")] }),
    ],
    beats: [
      { upTo: 3, god: "Alegram o rei com a sua malícia, e os príncipes com as suas mentiras.", reaction: "Corrupção no palácio de Israel. 👑" },
      { upTo: 7, god: "Todos ardem como um forno; devoram os seus juízes.", reaction: "Reis caem, mas ninguém clama a Deus. 🔥" },
      { upTo: 99, god: "Efraim é como uma pomba enganada, sem entendimento.", reaction: "Chamam o Egito e a Assíria, não o SENHOR. 🕊️" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "field", storm: 0.7, actors: [F(0.4, "man", "raise", "brown")] }),
      kf(5, { terrain: "city", night: 0.3, actors: [AN(0.5, "ox", 1.1, "#e8b04b"), F(0.28, "man", "bow", "red")] }),
      kf(11, { terrain: "field", storm: 0.5, props: [P("altar", 0.4, 1, 0.6), P("altar", 0.66, 0.9, 0.5)], actors: [F(0.5, "man", "stand", "gray")] }),
    ],
    beats: [
      { upTo: 4, god: "À boca a trombeta! A águia vem sobre a casa do SENHOR.", reaction: "Fizeram reis, mas não da parte de Deus. 📯" },
      { upTo: 7, god: "Semeiam vento e segam tormenta.", reaction: "O bezerro de Samaria será feito em pedaços. 🌪️" },
      { upTo: 99, god: "Israel multiplicou altares para pecar.", reaction: "Esqueceram o seu Criador. 🥀" },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "field", night: 0.3, actors: [F(0.4, "man", "mourn", "brown"), F(0.62, "man", "stand", "gray")] }),
      kf(6, { terrain: "desert", night: 0.4, crowd: 0.5, actors: [F(0.35, "man", "walk", "gray"), F(0.55, "woman", "mourn", "sand")] }),
      kf(11, { terrain: "field", darkness: 0.4, props: [P("tree", 0.7)], actors: [F(0.5, "man", "mourn", "brown")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Não te alegres, ó Israel: a festa acabou. 😔" },
      { upTo: 9, god: "Chegaram os dias da visitação, os dias da retribuição.", reaction: "O exílio se aproxima. 🚶" },
      { upTo: 99, god: "Quanto a Efraim, a sua glória voará como ave.", reaction: "A honra de Israel se esvai. 🍂" },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "field", props: [P("tree", 0.4), P("altar", 0.66, 0.9, 0.4)], actors: [F(0.3, "man", "stand", "green")] }),
      kf(5, { terrain: "hills", night: 0.3, actors: [AN(0.5, "ox", 1, "#e8b04b"), F(0.74, "man", "mourn", "gray")] }),
      kf(12, { terrain: "field", glory: 0.4, actors: [F(0.45, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 4, god: "Israel é uma vide frondosa; multiplicou os seus altares.", reaction: "Quanto mais fruto, mais ídolos. 🍇" },
      { upTo: 8, reaction: "O bezerro de Bete-Áven será levado embora. 😢" },
      { upTo: 99, god: "Semeai para vós em justiça, segai segundo a misericórdia.", reaction: "'Buscai ao SENHOR até que venha e chova.' 🌱" },
    ],
  },
  11: {
    keyframes: [
      kf(1, { terrain: "field", glory: 0.5, actors: [F(0.4, "man", "carry", "white"), F(0.58, "child", "stand", "sand")] }),
      kf(4, { terrain: "field", glory: 0.55, actors: [F(0.42, "man", "raise", "white"), F(0.6, "child", "walk", "brown")] }),
      kf(8, { terrain: "hills", glory: 0.7, actors: [F(0.45, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 4, god: "Quando Israel era menino, eu o amei, e do Egito chamei o meu filho.", reaction: "Deus recorda o amor de pai. 🤍" },
      { upTo: 7, reaction: "Mas o povo teima em se desviar dele. 😔" },
      { upTo: 99, god: "Como te deixaria, ó Efraim? O meu coração se comove dentro de mim.", reaction: "A compaixão vence a ira. ✨" },
    ],
  },
  12: {
    keyframes: [
      kf(1, { terrain: "field", storm: 0.4, actors: [F(0.4, "man", "walk", "gray")] }),
      kf(3, { terrain: "hills", night: 0.3, glory: 0.3, props: [P("ladder", 0.5)], actors: [F(0.42, "man", "fight", "brown", { facing: 1 }), F(0.58, "angel", "stand", "white")] }),
      kf(9, { terrain: "desert", glory: 0.4, props: [P("tent", 0.7)], actors: [F(0.45, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 2, god: "Efraim se apascenta de vento e persegue o vento oriental.", reaction: "Correm atrás do vazio. 🌬️" },
      { upTo: 6, reaction: "Jacó lutou com o Anjo em Betel e prevaleceu. 👼" },
      { upTo: 99, god: "Converte-te a teu Deus; guarda a benignidade e o juízo.", reaction: "'Espera sempre no teu Deus.' 🙏" },
    ],
  },
  13: {
    keyframes: [
      kf(1, { terrain: "hills", night: 0.35, props: [P("altar", 0.6, 0.9, 0.4)], actors: [F(0.4, "man", "bow", "red")] }),
      kf(7, { terrain: "mountain", storm: 0.5, night: 0.35, actors: [AN(0.5, "lion", 1.15), F(0.78, "man", "mourn", "gray")] }),
      kf(14, { terrain: "field", darkness: 0.45, actors: [F(0.5, "man", "mourn", "gray")] }),
    ],
    beats: [
      { upTo: 3, god: "Pecaram, fazendo imagens de fundição da sua prata.", reaction: "A culpa de Efraim por causa de Baal. 🥀" },
      { upTo: 11, god: "Serei para eles como leão, como leopardo à espreita.", reaction: "Esqueceram o Deus que os salvou. 🦁" },
      { upTo: 99, god: "Da mão do inferno os remirei; ó morte, onde estão as tuas pragas?", reaction: "Ainda há promessa de resgate. ✨" },
    ],
  },
  14: {
    keyframes: [
      kf(1, { terrain: "field", glory: 0.4, actors: [F(0.45, "man", "kneel", "brown")] }),
      kf(4, { terrain: "garden", glory: 0.6, props: [P("tree", 0.4), P("dove", 0.66)], actors: [F(0.5, "man", "raise", "white")] }),
      kf(5, { terrain: "garden", glory: 0.75, props: [P("tree", 0.35), P("palm", 0.7)], actors: [F(0.48, "man", "raise", "green")] }),
      kf(9, { terrain: "field", glory: 0.85, rainbow: 0.5, actors: [F(0.4, "man", "raise", "white"), F(0.6, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 3, reaction: "'Converte-te, ó Israel, ao SENHOR teu Deus!' 🙏" },
      { upTo: 4, god: "Sararei a sua infidelidade e os amarei livremente.", reaction: "O amor de Deus, gratuito e curador. 🤍" },
      { upTo: 8, god: "Serei para Israel como o orvalho; florescerá como o lírio.", reaction: "Restauração: raízes firmes e sombra que abriga. 🌿" },
      { upTo: 99, reaction: "Quem é sábio entenda os caminhos do SENHOR. ✨" },
    ],
  },
};
