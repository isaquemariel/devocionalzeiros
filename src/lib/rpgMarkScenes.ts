// ============================================================================
// Roteiros de cena (Living Scene v2) — MARCOS, capítulo por capítulo.
// O batismo e o chamado dos pescadores, curas e exorcismos com muita ação, a
// tempestade acalmada no mar, a multiplicação dos pães, a transfiguração, a
// entrada em Jerusalém, a paixão, a crucificação e o túmulo vazio. Puramente
// visual/narrativo — não toca em progresso. Segue o padrão de Êxodo.
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const MARK_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "river", props: [P("reeds", 0.18), P("reeds", 0.82)], actors: [F(0.4, "man", "raise", "brown"), F(0.6, "man", "stand", "white")] }),
      kf(9, { terrain: "river", glory: 0.6, props: [P("dove", 0.5, 0.9)], actors: [F(0.5, "man", "stand", "white")] }),
      kf(16, { terrain: "sea", props: [P("boat", 0.68, 1.1)], actors: [F(0.34, "man", "raise", "white"), F(0.58, "man", "stand", "brown"), F(0.72, "man", "stand", "sand")] }),
      kf(23, { terrain: "city", night: 0.2, actors: [F(0.4, "man", "raise", "white"), F(0.64, "man", "kneel", "gray")] }),
    ],
    beats: [
      { upTo: 8, reaction: "João Batista prega no deserto: 'Preparai o caminho!' 🐫" },
      { upTo: 11, god: "Tu és o meu Filho amado, em ti me comprazo.", reaction: "Jesus é batizado; o Espírito desce como pomba. 🕊️" },
      { upTo: 20, reaction: "'Segui-me!' Os pescadores deixam as redes. 🎣" },
      { upTo: 99, reaction: "Jesus ensina com autoridade, cura e expulsa demônios. ✨" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.7, props: [P("tent", 0.7)], actors: [F(0.4, "man", "raise", "white"), F(0.62, "man", "lie", "gray")] }),
      kf(3, { terrain: "city", crowd: 0.6, actors: [F(0.4, "man", "walk", "gray"), F(0.6, "man", "carry", "sand")] }),
      kf(14, { terrain: "sea", actors: [F(0.4, "man", "raise", "white"), F(0.62, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 12, god: "Filho, os teus pecados estão perdoados. Levanta-te!", reaction: "Descem o paralítico pelo telhado — e ele anda! 🛏️" },
      { upTo: 17, god: "Não vim chamar justos, mas pecadores.", reaction: "Jesus chama Levi, o cobrador de impostos. 🤝" },
      { upTo: 99, reaction: "'O sábado foi feito para o homem.' 🌾" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, actors: [F(0.4, "man", "raise", "white"), F(0.62, "man", "stand", "gray")] }),
      kf(7, { terrain: "sea", crowd: 0.8, props: [P("boat", 0.72)], actors: [F(0.4, "man", "raise", "white")] }),
      kf(13, { terrain: "mountain", actors: [F(0.4, "man", "raise", "white"), F(0.56, "man", "stand", "brown"), F(0.7, "man", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 6, god: "Estende a tua mão.", reaction: "No sábado, Jesus cura a mão ressequida. ✋" },
      { upTo: 12, reaction: "Multidões acorrem; os espíritos imundos gritam. 👥" },
      { upTo: 99, reaction: "No monte, Jesus escolhe os doze apóstolos. ✨" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "sea", crowd: 0.7, props: [P("boat", 0.3, 1.1)], actors: [F(0.32, "man", "raise", "white")] }),
      kf(26, { terrain: "field", actors: [F(0.4, "man", "raise", "white"), F(0.64, "man", "kneel", "brown")] }),
      kf(37, { terrain: "sea", storm: 0.85, rain: 0.5, night: 0.4, props: [P("boat", 0.5, 1.2)], actors: [F(0.5, "man", "lie", "white")] }),
      kf(39, { terrain: "sea", glory: 0.6, props: [P("boat", 0.5, 1.2)], actors: [F(0.46, "man", "raise", "white"), F(0.62, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 20, reaction: "A parábola do semeador: a semente é a Palavra. 🌱" },
      { upTo: 34, reaction: "O Reino é como o grão de mostarda, o menor de todos. 🌿" },
      { upTo: 38, reaction: "Uma tempestade se abate sobre o barco! 🌊⚡" },
      { upTo: 99, god: "Cala-te, aquieta-te!", reaction: "Jesus repreende o mar; faz-se grande bonança. 🌟" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "sea", night: 0.3, props: [P("boat", 0.16), P("tomb", 0.7, 1.1)], actors: [F(0.36, "man", "raise", "white"), F(0.62, "man", "kneel", "gray")] }),
      kf(13, { terrain: "hills", actors: [F(0.4, "man", "raise", "white"), AN(0.66, "goat", 0.9), AN(0.82, "goat", 0.9)] }),
      kf(22, { terrain: "city", crowd: 0.7, actors: [F(0.4, "man", "raise", "white"), F(0.62, "man", "bow", "gray")] }),
      kf(41, { terrain: "city", glory: 0.5, actors: [F(0.42, "man", "raise", "white"), F(0.6, "child", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 13, god: "Sai deste homem, espírito imundo!", reaction: "Jesus liberta o endemoninhado geraseno. ⛓️" },
      { upTo: 34, god: "Filha, a tua fé te salvou; vai em paz.", reaction: "A mulher toca a orla e é curada. 🤍" },
      { upTo: 42, god: "Menina, eu te digo: levanta-te!", reaction: "A filha de Jairo volta à vida! ✨" },
      { upTo: 99, reaction: "O poder de Jesus vence a morte e o medo." },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "man", "raise", "white"), F(0.64, "man", "stand", "gray")] }),
      kf(7, { terrain: "plain", actors: [F(0.3, "man", "walk", "brown"), F(0.5, "man", "walk", "sand"), F(0.7, "man", "walk", "sand")] }),
      kf(30, { terrain: "field", crowd: 0.9, props: [P("basket", 0.4), P("basket", 0.6)], actors: [F(0.5, "man", "raise", "white")] }),
      kf(48, { terrain: "sea", night: 0.6, props: [P("boat", 0.62)], actors: [F(0.36, "man", "walk", "white")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Em Nazaré, Jesus se admira da incredulidade deles. 😔" },
      { upTo: 29, reaction: "Os doze são enviados; Herodes decapita João. 😢" },
      { upTo: 44, god: "Dai-lhes vós mesmos de comer.", reaction: "Cinco pães e dois peixes saciam cinco mil! 🍞🐟" },
      { upTo: 99, reaction: "Jesus anda sobre o mar até o barco. 🌊" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.4, actors: [F(0.4, "man", "raise", "white"), F(0.64, "elder", "stand", "gray")] }),
      kf(24, { terrain: "plain", actors: [F(0.4, "man", "stand", "white"), F(0.62, "woman", "kneel", "purple")] }),
      kf(31, { terrain: "hills", actors: [F(0.42, "man", "raise", "white"), F(0.62, "man", "stand", "gray")] }),
    ],
    beats: [
      { upTo: 23, god: "O que sai do homem é que o contamina.", reaction: "Jesus ensina sobre a pureza do coração. 🤍" },
      { upTo: 30, reaction: "A fé da mulher siro-fenícia é atendida. 🙏" },
      { upTo: 99, god: "Efatá! (Abre-te!)", reaction: "Jesus cura o surdo-gago. 👂" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "field", crowd: 0.85, props: [P("basket", 0.42), P("basket", 0.58)], actors: [F(0.5, "man", "raise", "white")] }),
      kf(22, { terrain: "city", actors: [F(0.42, "man", "raise", "white"), F(0.62, "man", "stand", "gray")] }),
      kf(27, { terrain: "hills", actors: [F(0.4, "man", "stand", "white"), F(0.6, "man", "kneel", "brown")] }),
      kf(34, { terrain: "mountain", glory: 0.3, props: [P("cross", 0.7, 0.9)], actors: [F(0.4, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 9, reaction: "Sete pães alimentam quatro mil na multidão. 🍞" },
      { upTo: 26, reaction: "Jesus abre os olhos do cego de Betsaida. 👁️" },
      { upTo: 30, god: "E vós, quem dizeis que eu sou?", reaction: "Pedro confessa: 'Tu és o Cristo!' ✨" },
      { upTo: 99, god: "Quem quiser seguir-me, tome a sua cruz.", reaction: "O chamado a negar-se a si mesmo. ✝️" },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.9, actors: [F(0.5, "man", "raise", "white"), F(0.3, "elder", "stand", "gray"), F(0.7, "elder", "stand", "sand")] }),
      kf(7, { terrain: "mountain", glory: 0.7, actors: [F(0.5, "man", "stand", "white"), F(0.34, "man", "bow", "brown"), F(0.66, "man", "bow", "sand")] }),
      kf(14, { terrain: "hills", crowd: 0.5, actors: [F(0.4, "man", "raise", "white"), F(0.62, "child", "lie", "gray")] }),
      kf(33, { terrain: "city", actors: [F(0.4, "man", "stand", "white"), F(0.62, "child", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 8, god: "Este é o meu Filho amado; a ele ouvi.", reaction: "A transfiguração: Jesus resplandece! 🌟" },
      { upTo: 13, reaction: "Moisés e Elias aparecem com ele no monte. ✨" },
      { upTo: 29, god: "Tudo é possível ao que crê.", reaction: "Jesus liberta o menino do espírito mudo. 🙏" },
      { upTo: 99, reaction: "'Quem quiser ser o primeiro, seja servo de todos.' 🤍" },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "plain", crowd: 0.4, actors: [F(0.4, "man", "raise", "white"), F(0.62, "man", "stand", "gray")] }),
      kf(13, { terrain: "field", actors: [F(0.4, "man", "kneel", "white"), F(0.6, "child", "stand", "sand"), F(0.74, "child", "stand", "green")] }),
      kf(17, { terrain: "city", actors: [F(0.4, "man", "stand", "white"), F(0.62, "man", "kneel", "gold")] }),
      kf(46, { terrain: "city", crowd: 0.5, actors: [F(0.4, "man", "raise", "white"), F(0.64, "man", "kneel", "gray")] }),
    ],
    beats: [
      { upTo: 12, reaction: "Jesus ensina sobre o casamento e a fidelidade. 💍" },
      { upTo: 16, god: "Deixai vir a mim os pequeninos.", reaction: "Jesus abraça e abençoa as crianças. 🤗" },
      { upTo: 31, reaction: "O jovem rico se entristece; segui-lo custa tudo. 💰" },
      { upTo: 99, god: "A tua fé te salvou.", reaction: "O cego Bartimeu recobra a vista. 👁️" },
    ],
  },
  11: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.8, props: [P("palm", 0.2), P("palm", 0.82)], actors: [F(0.5, "man", "raise", "white")] }),
      kf(7, { terrain: "city", crowd: 0.9, props: [P("palm", 0.18), P("palm", 0.5), P("palm", 0.84)], actors: [F(0.5, "man", "stand", "white")] }),
      kf(15, { terrain: "city", actors: [F(0.42, "man", "fight", "white", { facing: 1 }), F(0.64, "man", "mourn", "gray")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Jesus entra em Jerusalém montado num jumentinho. 🌿" },
      { upTo: 11, reaction: "'Hosana! Bendito o que vem em nome do Senhor!' 🙌" },
      { upTo: 19, god: "A minha casa será casa de oração.", reaction: "Jesus expulsa os cambistas do templo. 💥" },
      { upTo: 99, reaction: "'Tende fé em Deus' — a figueira seca. 🌳" },
    ],
  },
  12: {
    keyframes: [
      kf(1, { terrain: "field", props: [P("tower", 0.75, 1.1), P("tree", 0.2)], actors: [F(0.4, "man", "raise", "white")] }),
      kf(13, { terrain: "city", crowd: 0.4, actors: [F(0.4, "man", "stand", "white"), F(0.62, "man", "stand", "gray")] }),
      kf(41, { terrain: "city", actors: [F(0.4, "man", "stand", "white"), F(0.64, "woman", "kneel", "gray")] }),
    ],
    beats: [
      { upTo: 12, reaction: "A parábola dos lavradores maus da vinha. 🍇" },
      { upTo: 34, god: "Amarás o Senhor de todo o coração, e ao próximo.", reaction: "O maior mandamento. 🤍" },
      { upTo: 99, god: "Esta viúva deu mais do que todos.", reaction: "As duas moedinhas da viúva pobre. 🪙" },
    ],
  },
  13: {
    keyframes: [
      kf(1, { terrain: "mountain", actors: [F(0.4, "man", "raise", "white"), F(0.62, "man", "stand", "brown")] }),
      kf(14, { terrain: "city", darkness: 0.4, storm: 0.4, actors: [F(0.4, "man", "raise", "white")] }),
      kf(24, { terrain: "mountain", night: 0.7, glory: 0.5, actors: [F(0.4, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 13, reaction: "Jesus anuncia o fim do templo e as tribulações. ⛰️" },
      { upTo: 23, reaction: "'Vede que ninguém vos engane.' Sinais do fim. ⚠️" },
      { upTo: 99, god: "Vigiai! Não sabeis quando virá o Senhor.", reaction: "O Filho do Homem virá com glória. 🌟" },
    ],
  },
  14: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, props: [P("tent", 0.7)], actors: [F(0.4, "man", "stand", "white"), F(0.62, "woman", "kneel", "purple")] }),
      kf(22, { terrain: "city", night: 0.5, props: [P("tent", 0.5, 1.2)], actors: [F(0.5, "man", "raise", "white")] }),
      kf(32, { terrain: "garden", night: 0.8, props: [P("tree", 0.7), P("tree", 0.2)], actors: [F(0.45, "man", "kneel", "white")] }),
      kf(43, { terrain: "garden", night: 0.85, actors: [F(0.4, "man", "stand", "white"), F(0.6, "man", "stand", "gray"), F(0.74, "warrior", "fight", "red")] }),
    ],
    beats: [
      { upTo: 11, reaction: "Uma mulher unge Jesus; Judas trama a traição. 💰" },
      { upTo: 25, god: "Isto é o meu corpo... este é o meu sangue.", reaction: "A Última Ceia. 🍞🍷" },
      { upTo: 42, god: "Aba, Pai! Não seja o que eu quero, mas o que tu queres.", reaction: "Agonia no Getsêmani. 😢" },
      { upTo: 99, reaction: "Jesus é preso; Pedro o nega três vezes. 🌑" },
    ],
  },
  15: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, crowd: 0.6, actors: [F(0.4, "man", "stand", "white"), F(0.68, "king", "stand", "purple")] }),
      kf(16, { terrain: "city", crowd: 0.5, actors: [F(0.45, "man", "mourn", "white"), F(0.7, "warrior", "stand", "red")] }),
      kf(22, { terrain: "mountain", darkness: 0.6, props: [P("cross", 0.5, 1.3)], actors: [F(0.5, "man", "lie", "white")] }),
      kf(33, { terrain: "mountain", darkness: 0.9, night: 0.5, props: [P("cross", 0.5, 1.3)], actors: [F(0.5, "man", "lie", "white"), F(0.68, "woman", "mourn", "blue")] }),
      kf(46, { terrain: "mountain", night: 0.6, props: [P("tomb", 0.6, 1.1)], actors: [F(0.4, "man", "carry", "gray"), F(0.62, "woman", "mourn", "purple")] }),
    ],
    beats: [
      { upTo: 15, reaction: "Diante de Pilatos, a multidão grita: 'Crucifica-o!' 😢" },
      { upTo: 21, reaction: "Coroam Jesus de espinhos e o escarnecem. 🌑" },
      { upTo: 32, reaction: "Crucificam Jesus no Gólgota, entre dois ladrões. ✝️" },
      { upTo: 41, god: "Eloí, Eloí, lamá sabactâni?", reaction: "Trevas cobrem a terra; o véu se rasga. ⬛" },
      { upTo: 99, reaction: "José de Arimateia sepulta Jesus no túmulo. 🪨" },
    ],
  },
  16: {
    keyframes: [
      kf(1, { terrain: "mountain", night: 0.3, props: [P("tomb", 0.55, 1.2)], actors: [F(0.32, "woman", "walk", "purple"), F(0.48, "woman", "walk", "blue"), F(0.62, "woman", "carry", "green")] }),
      kf(5, { terrain: "mountain", glory: 0.85, props: [P("tomb", 0.55, 1.2)], actors: [F(0.5, "angel", "raise", "white"), F(0.34, "woman", "bow", "purple")] }),
      kf(9, { terrain: "garden", glory: 0.6, actors: [F(0.5, "man", "stand", "white"), F(0.7, "woman", "kneel", "purple")] }),
      kf(19, { terrain: "mountain", glory: 0.95, actors: [F(0.5, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 4, reaction: "As mulheres vão ao túmulo ao raiar do sol. 🌅" },
      { upTo: 8, god: "Ele ressuscitou! Não está aqui.", reaction: "O anjo diante do túmulo vazio! ✨" },
      { upTo: 18, god: "Ide por todo o mundo e pregai o evangelho.", reaction: "Jesus ressurreto envia os discípulos. 🌍" },
      { upTo: 99, reaction: "O Senhor é elevado ao céu e assenta-se à direita de Deus. 🌟" },
    ],
  },
};
