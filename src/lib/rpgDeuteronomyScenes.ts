// ============================================================================
// Roteiros de cena (Living Scene v2) — DEUTERONÔMIO, capítulo por capítulo.
// Os discursos finais de Moisés nas planícies de Moabe: a recordação da
// jornada, a Lei e a aliança renovadas, as bênçãos e maldições, o cântico e
// a bênção sobre as tribos, e a visão da Terra Prometida do monte Nebo com a
// morte de Moisés. Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const DEUTERONOMY_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "plain", crowd: 0.7, actors: [F(0.42, "elder", "raise", "white")] }),
      kf(9, { terrain: "plain", crowd: 0.6, actors: [F(0.4, "elder", "stand", "white"), F(0.6, "elder", "stand", "sand"), F(0.74, "elder", "stand", "gray")] }),
      kf(22, { terrain: "hills", crowd: 0.4, actors: [F(0.35, "man", "walk", "brown"), F(0.55, "man", "carry", "sand")] }),
      kf(34, { terrain: "desert", night: 0.2, crowd: 0.5, actors: [F(0.45, "elder", "mourn", "white")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Moisés recorda: no Horebe, o SENHOR mandou tomar posse da terra. 🗺️" },
      { upTo: 18, reaction: "Ele reparte a carga, nomeando chefes sábios sobre o povo. ⚖️" },
      { upTo: 33, reaction: "Espias sobem a Canaã, mas o povo teme e murmura. 😟" },
      { upTo: 99, god: "Nenhum desta geração má verá a boa terra.", reaction: "A rebeldia adia a promessa. 😔" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "desert", crowd: 0.5, actors: [F(0.35, "man", "walk", "brown"), AN(0.7, "goat", 0.8)] }),
      kf(24, { terrain: "hills", actors: [F(0.4, "elder", "raise", "white"), F(0.7, "king", "stand", "red")] }),
      kf(32, { terrain: "hills", storm: 0.3, actors: [F(0.3, "warrior", "fight", "brown", { facing: 1 }), F(0.66, "warrior", "fight", "red", { facing: -1 })] }),
    ],
    beats: [
      { upTo: 23, reaction: "Israel contorna Edom e Moabe, sem os provocar. 🏜️" },
      { upTo: 31, god: "Começa a possuir a terra de Seom, rei de Hesbom.", reaction: "Deus entrega o inimigo em suas mãos." },
      { upTo: 99, reaction: "Seom sai à batalha e é derrotado. ⚔️" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "hills", storm: 0.4, actors: [F(0.3, "warrior", "fight", "brown", { facing: 1 }), F(0.68, "king", "fight", "gray", { facing: -1 })] }),
      kf(12, { terrain: "plain", crowd: 0.5, actors: [F(0.4, "elder", "raise", "white"), F(0.62, "man", "stand", "sand")] }),
      kf(23, { terrain: "mountain", glory: 0.4, actors: [F(0.45, "elder", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 11, reaction: "Ogue, o gigante de Basã, também cai diante de Israel. 🛡️" },
      { upTo: 20, reaction: "A terra a leste do Jordão é repartida às tribos. 🗺️" },
      { upTo: 99, god: "Basta! Sobe ao alto do Pisga e vê a terra com teus olhos.", reaction: "Moisés implora, mas não cruzará o Jordão. 😔" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "plain", crowd: 0.7, actors: [F(0.42, "elder", "raise", "white")] }),
      kf(11, { terrain: "mountain", glory: 0.6, fire: 0.5, storm: 0.3, props: [P("smoke", 0.5, 2)], actors: [F(0.4, "elder", "stand", "white")] }),
      kf(15, { terrain: "plain", crowd: 0.5, actors: [F(0.42, "elder", "raise", "white")] }),
      kf(41, { terrain: "hills", actors: [F(0.4, "elder", "stand", "white"), F(0.66, "man", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 10, reaction: "Guardai os estatutos: é a vossa sabedoria diante dos povos. 📖" },
      { upTo: 14, reaction: "Lembra do Horebe: fogo, nuvem e a voz de Deus. 🔥" },
      { upTo: 40, god: "Não farás para ti imagem alguma; eu sou fogo consumidor.", reaction: "Sede fiéis, pois vistes e não vistes forma alguma." },
      { upTo: 99, reaction: "Moisés separa cidades de refúgio a leste. 🏙️" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "plain", crowd: 0.7, actors: [F(0.42, "elder", "raise", "white")] }),
      kf(6, { terrain: "mountain", glory: 0.7, fire: 0.4, props: [P("tablets", 0.5, 1.1), P("smoke", 0.7, 1.6)], actors: [F(0.4, "elder", "raise", "white")] }),
      kf(23, { terrain: "plain", crowd: 0.6, actors: [F(0.4, "elder", "stand", "white"), F(0.65, "man", "bow", "sand")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Moisés relembra a aliança feita no Horebe. 🤝" },
      { upTo: 22, god: "Eu sou o SENHOR teu Deus. Não terás outros deuses.", reaction: "Os Dez Mandamentos são recitados. 📜" },
      { upTo: 99, reaction: "O povo pede: 'Fala tu conosco, e ouviremos.' 🙏" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "plain", crowd: 0.6, actors: [F(0.42, "elder", "raise", "white")] }),
      kf(4, { terrain: "plain", glory: 0.35, crowd: 0.5, actors: [F(0.42, "elder", "raise", "white")] }),
      kf(20, { terrain: "field", actors: [F(0.4, "elder", "stand", "white"), F(0.64, "child", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Uma terra que mana leite e mel vos espera. 🍯" },
      { upTo: 19, god: "Ouve, Israel: o SENHOR é um só. Amarás com todo o coração.", reaction: "O Shemá — o grande mandamento. ❤️" },
      { upTo: 99, reaction: "Ensinai aos filhos as maravilhas do SENHOR. 👨‍👦" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "hills", crowd: 0.5, actors: [F(0.4, "elder", "raise", "white")] }),
      kf(6, { terrain: "plain", glory: 0.4, crowd: 0.6, actors: [F(0.42, "elder", "raise", "white")] }),
      kf(17, { terrain: "hills", actors: [F(0.4, "elder", "stand", "white")] }),
    ],
    beats: [
      { upTo: 5, god: "Destruirás por completo as nações e seus altares.", reaction: "Não farás aliança com os povos da terra. ⚔️" },
      { upTo: 16, god: "O SENHOR te escolheu não por seres muitos, mas por amor.", reaction: "Israel, povo santo e amado. 🤍" },
      { upTo: 99, reaction: "Não temas: o teu Deus é grande e temível no meio de ti." },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "desert", crowd: 0.5, actors: [F(0.4, "elder", "stand", "white")] }),
      kf(3, { terrain: "desert", glory: 0.35, props: [P("manna", 0.55, 1.6)], actors: [F(0.35, "elder", "raise", "white")] }),
      kf(11, { terrain: "field", props: [P("tree", 0.72)], actors: [F(0.4, "elder", "stand", "white")] }),
    ],
    beats: [
      { upTo: 10, god: "Nem só de pão viverá o homem, mas de toda palavra de Deus.", reaction: "Lembra dos 40 anos no deserto e do maná. 🤍" },
      { upTo: 18, reaction: "Ao te fartares na boa terra, não esqueças o SENHOR. 🌾" },
      { upTo: 99, reaction: "Guarda-te de dizer: 'Minha força me deu esta riqueza.' ⚠️" },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "hills", crowd: 0.5, actors: [F(0.4, "elder", "raise", "white")] }),
      kf(8, { terrain: "mountain", fire: 0.4, night: 0.2, actors: [F(0.4, "elder", "mourn", "white"), AN(0.62, "ox", 1, "#e8b04b")] }),
      kf(18, { terrain: "mountain", glory: 0.4, actors: [F(0.45, "elder", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 6, god: "Não é por tua justiça que possuis a terra, mas por minha promessa.", reaction: "Não pela tua justiça, ó Israel. 🙇" },
      { upTo: 21, reaction: "Moisés recorda o bezerro de ouro e as tábuas quebradas. 💥" },
      { upTo: 99, reaction: "Quarenta dias prostrado, intercedendo pelo povo. 🙏" },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.6, props: [P("tablets", 0.5, 1.1), P("arkCovenant", 0.72, 0.9)], actors: [F(0.35, "elder", "kneel", "white")] }),
      kf(12, { terrain: "plain", crowd: 0.5, actors: [F(0.42, "elder", "raise", "white")] }),
      kf(17, { terrain: "plain", glory: 0.35, actors: [F(0.42, "elder", "raise", "white")] }),
    ],
    beats: [
      { upTo: 11, god: "Lavrei as segundas tábuas e as pus na arca.", reaction: "A aliança é restaurada na arca. 📦" },
      { upTo: 16, god: "Circuncidai o vosso coração e não mais endureçais a cerviz.", reaction: "Que pede o SENHOR? Que o temas e o ames." },
      { upTo: 99, reaction: "Ele faz justiça ao órfão e ama o estrangeiro. 🤍" },
    ],
  },
  11: {
    keyframes: [
      kf(1, { terrain: "field", crowd: 0.5, actors: [F(0.42, "elder", "raise", "white")] }),
      kf(13, { terrain: "field", rain: 0.5, actors: [F(0.4, "elder", "raise", "white"), AN(0.7, "ox", 0.9)] }),
      kf(26, { terrain: "hills", actors: [F(0.3, "elder", "stand", "white"), F(0.55, "man", "stand", "sand"), F(0.75, "man", "mourn", "gray")] }),
    ],
    beats: [
      { upTo: 12, reaction: "É uma terra que Deus cuida, do início ao fim do ano. 🗺️" },
      { upTo: 25, god: "Se obedecerdes, darei chuva à vossa terra a seu tempo.", reaction: "A obediência traz a chuva e o fruto. 🌧️" },
      { upTo: 99, reaction: "Diante de vós ponho a bênção e a maldição. Escolhei! ⚖️" },
    ],
  },
  12: {
    keyframes: [
      kf(1, { terrain: "hills", actors: [F(0.4, "elder", "raise", "white")] }),
      kf(5, { terrain: "mountain", glory: 0.5, props: [P("altar", 0.5, 1.1, 0.8)], actors: [F(0.35, "elder", "stand", "white")] }),
      kf(20, { terrain: "field", actors: [F(0.4, "man", "stand", "sand"), AN(0.68, "ox", 0.9)] }),
    ],
    beats: [
      { upTo: 4, god: "Derrubareis todos os altares dos deuses das nações.", reaction: "Destruí os altos e os ídolos da terra. ⛏️" },
      { upTo: 19, god: "Buscareis o lugar que o SENHOR escolher para o seu nome.", reaction: "Um só lugar para adorar ao SENHOR. 🕯️" },
      { upTo: 99, reaction: "Não seguirás os costumes cruéis das nações. 🚫" },
    ],
  },
  13: {
    keyframes: [
      kf(1, { terrain: "plain", night: 0.3, actors: [F(0.4, "elder", "stand", "white"), F(0.66, "man", "raise", "red")] }),
      kf(6, { terrain: "plain", night: 0.4, actors: [F(0.42, "elder", "stand", "white")] }),
      kf(12, { terrain: "city", fire: 0.5, night: 0.3, actors: [F(0.4, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 5, god: "Se um profeta te desviar para outros deuses, não o ouças.", reaction: "Provai os que dizem sinais e prodígios. ⚠️" },
      { upTo: 11, reaction: "Nem o mais próximo pode te seduzir à idolatria. 🚫" },
      { upTo: 99, reaction: "A cidade que serve ídolos será posta debaixo de juízo. 🔥" },
    ],
  },
  14: {
    keyframes: [
      kf(1, { terrain: "field", crowd: 0.4, actors: [F(0.42, "elder", "raise", "white")] }),
      kf(3, { terrain: "field", actors: [F(0.4, "man", "stand", "sand"), AN(0.66, "ox", 0.9), AN(0.82, "sheep")] }),
      kf(22, { terrain: "field", props: [P("altar", 0.6, 0.9)], actors: [F(0.4, "man", "carry", "sand")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Sois um povo santo, escolhido pelo SENHOR. 🤍" },
      { upTo: 21, reaction: "Leis do que é limpo e imundo para comer. 🍽️" },
      { upTo: 99, god: "Dizimarás fielmente todo o produto da tua semente.", reaction: "O dízimo e o cuidado com o levita. 🌾" },
    ],
  },
  15: {
    keyframes: [
      kf(1, { terrain: "field", actors: [F(0.4, "elder", "raise", "white")] }),
      kf(7, { terrain: "city", actors: [F(0.4, "man", "stand", "brown"), F(0.66, "servant", "kneel", "gray")] }),
      kf(12, { terrain: "city", glory: 0.3, actors: [F(0.4, "man", "raise", "sand"), F(0.64, "servant", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 6, god: "De sete em sete anos farás remissão das dívidas.", reaction: "O ano do perdão das dívidas. 📜" },
      { upTo: 11, god: "Abrirás de par em par a mão ao teu irmão pobre.", reaction: "Não endureças o coração ao necessitado. 🤲" },
      { upTo: 99, reaction: "Liberta o escravo hebreu e não o mandes de mãos vazias. 🕊️" },
    ],
  },
  16: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, props: [P("altar", 0.55, 0.9, 0.7)], actors: [F(0.4, "man", "stand", "brown"), AN(0.7, "sheep")] }),
      kf(9, { terrain: "field", glory: 0.3, crowd: 0.4, actors: [F(0.4, "man", "carry", "sand")] }),
      kf(18, { terrain: "city", actors: [F(0.4, "elder", "stand", "white"), F(0.66, "elder", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 8, god: "Guardarás a Páscoa ao SENHOR teu Deus.", reaction: "A festa da Páscoa e dos pães ázimos. 🐑" },
      { upTo: 17, reaction: "As festas das Semanas e dos Tabernáculos, com alegria. 🎉" },
      { upTo: 99, god: "A justiça, somente a justiça seguirás.", reaction: "Juízes retos em todas as portas. ⚖️" },
    ],
  },
  17: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "elder", "stand", "white"), F(0.66, "man", "stand", "sand")] }),
      kf(8, { terrain: "mountain", glory: 0.4, props: [P("altar", 0.62, 0.9)], actors: [F(0.4, "elder", "raise", "white")] }),
      kf(14, { terrain: "city", actors: [F(0.4, "king", "stand", "purple"), F(0.66, "elder", "stand", "white")] }),
    ],
    beats: [
      { upTo: 7, god: "Pela boca de duas ou três testemunhas se firmará a causa.", reaction: "Não sacrificareis o que tem defeito. ⚠️" },
      { upTo: 13, reaction: "Casos difíceis vão ao sacerdote e ao juiz. 📖" },
      { upTo: 99, god: "Porás rei o que o SENHOR escolher; que copie esta lei.", reaction: "O rei deve ler e temer o SENHOR. 👑" },
    ],
  },
  18: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("altar", 0.6, 0.9, 0.6)], actors: [F(0.4, "man", "stand", "gold")] }),
      kf(9, { terrain: "plain", night: 0.3, actors: [F(0.42, "elder", "raise", "white")] }),
      kf(15, { terrain: "plain", glory: 0.5, actors: [F(0.42, "elder", "raise", "white")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Os levitas viverão das ofertas ao SENHOR. 🕯️" },
      { upTo: 14, god: "Não aprenderás as abominações e feitiçarias das nações.", reaction: "Longe de adivinhos e encantadores. 🚫" },
      { upTo: 99, god: "Suscitarei um profeta como tu; a ele ouvireis.", reaction: "A promessa do Profeta que há de vir. ✨" },
    ],
  },
  19: {
    keyframes: [
      kf(1, { terrain: "hills", actors: [F(0.4, "elder", "raise", "white")] }),
      kf(4, { terrain: "city", actors: [F(0.35, "man", "walk", "brown"), F(0.68, "man", "stand", "sand")] }),
      kf(15, { terrain: "city", actors: [F(0.4, "elder", "stand", "white"), F(0.6, "man", "stand", "sand"), F(0.78, "man", "stand", "gray")] }),
    ],
    beats: [
      { upTo: 3, god: "Separarás três cidades no meio da tua terra.", reaction: "Cidades de refúgio para o que mata sem querer. 🏙️" },
      { upTo: 14, reaction: "Não removerás o marco antigo do teu próximo. 🪨" },
      { upTo: 99, god: "Vida por vida, olho por olho — assim tirarás o mal.", reaction: "Duas testemunhas firmam toda causa. ⚖️" },
    ],
  },
  20: {
    keyframes: [
      kf(1, { terrain: "hills", storm: 0.3, crowd: 0.5, actors: [F(0.4, "man", "stand", "gold")] }),
      kf(10, { terrain: "city", actors: [F(0.4, "warrior", "stand", "brown"), F(0.66, "man", "stand", "sand")] }),
      kf(19, { terrain: "field", props: [P("tree", 0.72)], actors: [F(0.4, "warrior", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 9, god: "Não temais, pois o SENHOR vai convosco à peleja.", reaction: "O sacerdote anima o exército. 🛡️" },
      { upTo: 18, reaction: "Ofereceis paz à cidade antes de a cercar. ⚔️" },
      { upTo: 99, reaction: "Não destruirás as árvores frutíferas no cerco. 🌳" },
    ],
  },
  21: {
    keyframes: [
      kf(1, { terrain: "field", night: 0.3, actors: [F(0.4, "elder", "kneel", "white"), AN(0.68, "ox", 0.9)] }),
      kf(15, { terrain: "city", actors: [F(0.35, "man", "stand", "brown"), F(0.55, "woman", "stand", "sand"), F(0.75, "child", "stand", "green")] }),
      kf(18, { terrain: "city", night: 0.2, actors: [F(0.4, "elder", "mourn", "white"), F(0.66, "man", "stand", "gray")] }),
    ],
    beats: [
      { upTo: 9, god: "Assim tirarás o sangue inocente do meio de ti.", reaction: "O rito da morte não vingada. 🕊️" },
      { upTo: 17, reaction: "O direito do primogênito deve ser respeitado. 📜" },
      { upTo: 99, reaction: "Leis sobre o filho rebelde e o corpo do enforcado. ⚖️" },
    ],
  },
  22: {
    keyframes: [
      kf(1, { terrain: "field", actors: [F(0.4, "man", "carry", "brown"), AN(0.7, "ox", 0.9)] }),
      kf(8, { terrain: "field", props: [P("tent", 0.7)], actors: [F(0.4, "man", "stand", "sand")] }),
      kf(13, { terrain: "city", actors: [F(0.4, "man", "stand", "brown"), F(0.62, "woman", "stand", "blue")] }),
    ],
    beats: [
      { upTo: 7, god: "Não verás o boi de teu irmão desgarrado sem o recolher.", reaction: "Cuida do que é do próximo. 🐂" },
      { upTo: 12, reaction: "Do parapeito no teto às vestes: leis do dia a dia. 🏠" },
      { upTo: 99, reaction: "Leis que protegem o casamento e a pureza. 🤍" },
    ],
  },
  23: {
    keyframes: [
      kf(1, { terrain: "plain", actors: [F(0.42, "elder", "raise", "white")] }),
      kf(9, { terrain: "desert", night: 0.3, props: [P("tent", 0.4), P("tent", 0.7)], actors: [F(0.5, "warrior", "stand", "brown")] }),
      kf(19, { terrain: "field", actors: [F(0.4, "man", "stand", "sand"), F(0.66, "servant", "stand", "gray")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Quem pode entrar na assembleia do SENHOR. 📖" },
      { upTo: 14, god: "O teu arraial será santo, pois eu ando no meio dele.", reaction: "A limpeza do acampamento. ⛺" },
      { upTo: 99, reaction: "Não cobrarás juros do irmão; cumpre os teus votos. 🤝" },
    ],
  },
  24: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "man", "stand", "brown"), F(0.62, "woman", "mourn", "sand")] }),
      kf(10, { terrain: "city", night: 0.2, actors: [F(0.4, "man", "carry", "sand"), F(0.66, "man", "stand", "gray")] }),
      kf(19, { terrain: "field", glory: 0.25, actors: [F(0.4, "woman", "kneel", "sand"), F(0.68, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 9, reaction: "Leis sobre o divórcio e o cuidado com o recém-casado. 📜" },
      { upTo: 18, god: "Não reterás o penhor do pobre ao pôr do sol.", reaction: "Compaixão com o assalariado e o estrangeiro. 🤍" },
      { upTo: 99, reaction: "Deixa a espiga esquecida para o pobre e a viúva. 🌾" },
    ],
  },
  25: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "elder", "stand", "white"), F(0.66, "man", "kneel", "sand")] }),
      kf(4, { terrain: "field", actors: [F(0.4, "man", "stand", "brown"), AN(0.7, "ox", 0.9)] }),
      kf(17, { terrain: "desert", storm: 0.3, actors: [F(0.4, "warrior", "fight", "brown", { facing: 1 })] }),
    ],
    beats: [
      { upTo: 4, god: "Não atarás a boca ao boi quando debulha.", reaction: "Justiça medida na punição e no trabalho. ⚖️" },
      { upTo: 16, god: "Peso justo e reto terás; abominação é a balança falsa.", reaction: "Pesos e medidas honestos. ⚖️" },
      { upTo: 99, reaction: "Lembra o que Amaleque te fez: apaga a sua memória. ⚔️" },
    ],
  },
  26: {
    keyframes: [
      kf(1, { terrain: "field", glory: 0.3, props: [P("altar", 0.58, 0.9, 0.5), P("basket", 0.42)], actors: [F(0.4, "man", "carry", "sand")] }),
      kf(5, { terrain: "field", glory: 0.4, actors: [F(0.42, "man", "raise", "white")] }),
      kf(16, { terrain: "plain", glory: 0.4, crowd: 0.5, actors: [F(0.42, "elder", "raise", "white")] }),
    ],
    beats: [
      { upTo: 11, god: "Tomarás das primícias da terra e as trarás ao SENHOR.", reaction: "A oferta das primícias com gratidão. 🧺" },
      { upTo: 15, reaction: "'Meu pai era um arameu errante...' — a confissão de fé. 📖" },
      { upTo: 99, god: "Hoje me proclamaste teu Deus, e eu, meu povo peculiar.", reaction: "A aliança selada de coração. 🤝" },
    ],
  },
  27: {
    keyframes: [
      kf(1, { terrain: "mountain", props: [P("altar", 0.5, 1.1, 0.7)], actors: [F(0.4, "elder", "stand", "white"), F(0.66, "man", "carry", "sand")] }),
      kf(11, { terrain: "hills", crowd: 0.6, actors: [F(0.28, "elder", "raise", "white"), F(0.72, "elder", "raise", "gray")] }),
      kf(15, { terrain: "hills", night: 0.3, crowd: 0.5, actors: [F(0.45, "elder", "mourn", "white")] }),
    ],
    beats: [
      { upTo: 10, god: "Edificarás um altar de pedras não lavradas ao SENHOR.", reaction: "A Lei é escrita em pedras no monte Ebal. 🪨" },
      { upTo: 14, reaction: "Seis tribos abençoam no Gerizim, seis amaldiçoam no Ebal. ⛰️" },
      { upTo: 99, reaction: "O povo responde 'Amém' a cada maldição. 🙇" },
    ],
  },
  28: {
    keyframes: [
      kf(1, { terrain: "field", glory: 0.5, crowd: 0.5, rain: 0.3, actors: [F(0.42, "elder", "raise", "white"), AN(0.72, "sheep")] }),
      kf(15, { terrain: "field", storm: 0.5, darkness: 0.3, actors: [F(0.42, "elder", "mourn", "white")] }),
      kf(38, { terrain: "field", locusts: 0.7, night: 0.3, actors: [F(0.4, "man", "mourn", "gray")] }),
      kf(64, { terrain: "desert", night: 0.6, crowd: 0.4, actors: [F(0.4, "man", "mourn", "gray")] }),
    ],
    beats: [
      { upTo: 14, god: "Se ouvires a minha voz, bênçãos te alcançarão.", reaction: "As bênçãos da obediência. 🌾✨" },
      { upTo: 37, god: "Mas se não obedeceres, virão sobre ti estas maldições.", reaction: "O peso da desobediência. ⛈️" },
      { upTo: 57, reaction: "Pragas, fome e cerco anunciados. 🦗" },
      { upTo: 99, reaction: "O exílio entre as nações, sem descanso. 😔" },
    ],
  },
  29: {
    keyframes: [
      kf(1, { terrain: "plain", crowd: 0.7, actors: [F(0.42, "elder", "raise", "white")] }),
      kf(10, { terrain: "plain", glory: 0.35, crowd: 0.7, actors: [F(0.3, "elder", "stand", "white"), F(0.55, "man", "stand", "sand"), F(0.78, "child", "stand", "green")] }),
      kf(22, { terrain: "desert", fire: 0.4, night: 0.3, actors: [F(0.45, "man", "mourn", "gray")] }),
    ],
    beats: [
      { upTo: 9, reaction: "Vistes tudo o que o SENHOR fez no Egito e no deserto. 👁️" },
      { upTo: 21, god: "Hoje estais todos diante do SENHOR para entrar na aliança.", reaction: "A aliança em Moabe, do maior ao menor. 🤝" },
      { upTo: 99, reaction: "As coisas ocultas pertencem ao SENHOR; guardai a Lei. 📖" },
    ],
  },
  30: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.3, crowd: 0.4, actors: [F(0.4, "man", "mourn", "gray")] }),
      kf(6, { terrain: "plain", glory: 0.4, actors: [F(0.42, "elder", "raise", "white")] }),
      kf(15, { terrain: "hills", glory: 0.35, crowd: 0.6, actors: [F(0.3, "elder", "raise", "white"), F(0.7, "man", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 5, god: "Quando te converteres de todo o coração, eu te restaurarei.", reaction: "A promessa do retorno e do perdão. 🕊️" },
      { upTo: 14, god: "Esta palavra está mui perto de ti, na tua boca e no coração.", reaction: "O mandamento não é oculto nem distante. ❤️" },
      { upTo: 99, god: "A vida e a morte pus diante de ti; escolhe a vida!", reaction: "Escolhe a vida, para que vivas! ✨" },
    ],
  },
  31: {
    keyframes: [
      kf(1, { terrain: "plain", crowd: 0.6, actors: [F(0.35, "elder", "stand", "white"), F(0.62, "warrior", "stand", "brown")] }),
      kf(9, { terrain: "plain", glory: 0.3, props: [P("arkCovenant", 0.6, 0.9)], actors: [F(0.4, "elder", "carry", "white")] }),
      kf(14, { terrain: "desert", glory: 0.6, props: [P("tent", 0.5, 1.2), P("pillarCloud", 0.42, 1)], actors: [F(0.34, "elder", "stand", "white"), F(0.6, "warrior", "bow", "brown")] }),
    ],
    beats: [
      { upTo: 8, god: "Esforça-te e tem bom ânimo; eu irei contigo.", reaction: "Josué é encorajado a suceder Moisés. 🛡️" },
      { upTo: 13, reaction: "A Lei é escrita e entregue aos sacerdotes e à arca. 📜" },
      { upTo: 99, god: "Escreve este cântico e ensina-o aos filhos de Israel.", reaction: "A nuvem desce à porta da tenda. ☁️" },
    ],
  },
  32: {
    keyframes: [
      kf(1, { terrain: "plain", glory: 0.4, crowd: 0.6, actors: [F(0.42, "elder", "raise", "white")] }),
      kf(10, { terrain: "desert", glory: 0.4, actors: [F(0.42, "elder", "raise", "white")] }),
      kf(39, { terrain: "mountain", storm: 0.4, fire: 0.3, actors: [F(0.42, "elder", "raise", "white")] }),
      kf(48, { terrain: "mountain", glory: 0.5, actors: [F(0.45, "elder", "stand", "white")] }),
    ],
    beats: [
      { upTo: 9, reaction: "O Cântico de Moisés: 'A Rocha, cujo obra é perfeita.' 🎶" },
      { upTo: 38, reaction: "Ele recorda o cuidado de Deus e a ingratidão do povo. 🦅" },
      { upTo: 47, god: "Vede que eu sou o único; eu firo e eu saro.", reaction: "Não é palavra vã: é a vossa vida. ✨" },
      { upTo: 99, god: "Sobe ao monte Nebo e vê a terra; ali morrerás.", reaction: "Moisés é chamado ao alto do monte. ⛰️" },
    ],
  },
  33: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.6, crowd: 0.5, actors: [F(0.42, "elder", "raise", "white")] }),
      kf(7, { terrain: "hills", glory: 0.4, crowd: 0.6, actors: [F(0.3, "elder", "raise", "white"), F(0.55, "man", "stand", "sand"), F(0.78, "man", "stand", "brown")] }),
      kf(26, { terrain: "mountain", glory: 0.8, actors: [F(0.42, "elder", "raise", "white")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Moisés abençoa as tribos de Israel, uma a uma. 🙌" },
      { upTo: 25, reaction: "Bênçãos de fartura, força e proteção sobre cada tribo. 🌾" },
      { upTo: 99, god: "O Deus eterno é a tua habitação; por baixo, os braços eternos.", reaction: "'Bem-aventurado és tu, ó Israel!' ✨" },
    ],
  },
  34: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.5, actors: [F(0.42, "elder", "raise", "white")] }),
      kf(4, { terrain: "hills", glory: 0.7, actors: [F(0.42, "elder", "stand", "white")] }),
      kf(5, { terrain: "mountain", night: 0.4, glory: 0.3, actors: [F(0.45, "elder", "lie", "white")] }),
      kf(8, { terrain: "plain", night: 0.6, crowd: 0.6, actors: [F(0.4, "man", "mourn", "gray"), F(0.6, "woman", "mourn", "sand")] }),
    ],
    beats: [
      { upTo: 3, god: "Esta é a terra que prometi a Abraão, Isaque e Jacó.", reaction: "Do Nebo, Moisés contempla a Terra Prometida. 🏞️" },
      { upTo: 4, reaction: "'Fiz-te vê-la, mas não passarás para lá.' 🥲" },
      { upTo: 7, reaction: "Moisés morre em Moabe; ninguém sabe seu sepulcro. 🌙" },
      { upTo: 99, reaction: "Israel o pranteia 30 dias; nunca mais houve profeta como ele. 😢" },
    ],
  },
};
