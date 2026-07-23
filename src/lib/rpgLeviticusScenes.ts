// ============================================================================
// Roteiros de cena (Living Scene v2) — LEVÍTICO, capítulo por capítulo.
// As leis do culto: sacrifícios e ofertas, a consagração do sacerdócio, o fogo
// do Senhor, a santidade do povo, o Dia da Expiação, as festas do SENHOR e o
// ano do jubileu. Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const LEVITICUS_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("tent", 0.72, 1.2), P("altar", 0.42, 1.2, 0.8)], actors: [F(0.3, "man", "stand", "gold")] }),
      kf(3, { terrain: "desert", props: [P("altar", 0.45, 1.2, 1)], actors: [F(0.28, "man", "raise", "gold"), AN(0.66, "ox", 1)] }),
      kf(10, { terrain: "desert", props: [P("altar", 0.45, 1.2, 1), P("smoke", 0.45, 1.6)], actors: [F(0.3, "man", "stand", "gold"), AN(0.66, "sheep")] }),
    ],
    beats: [
      { upTo: 9, god: "Quando alguém trouxer oferta ao SENHOR, será do gado.", reaction: "A lei do holocausto: oferta queimada por inteiro. 🔥" },
      { upTo: 99, reaction: "Ovelhas, cabras e aves sobem em cheiro suave ao SENHOR. 🐑" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("altar", 0.45, 1.1, 0.7), P("basket", 0.66)], actors: [F(0.3, "man", "carry", "gold")] }),
      kf(11, { terrain: "desert", props: [P("altar", 0.45, 1.1, 0.8), P("smoke", 0.45, 1.4)], actors: [F(0.32, "man", "stand", "gold")] }),
    ],
    beats: [
      { upTo: 10, god: "Quando trouxeres oferta de manjares, será de flor de farinha.", reaction: "A oferta de cereais, com azeite e incenso. 🌾" },
      { upTo: 99, reaction: "Sem fermento e com sal — a aliança do SENHOR. 🧂" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("altar", 0.45, 1.2, 1)], actors: [F(0.3, "man", "stand", "gold"), AN(0.66, "ox", 1)] }),
      kf(6, { terrain: "desert", props: [P("altar", 0.45, 1.2, 1), P("smoke", 0.45, 1.4)], actors: [F(0.3, "man", "raise", "gold"), AN(0.68, "sheep")] }),
    ],
    beats: [
      { upTo: 5, god: "Se a sua oferta for sacrifício pacífico, do gado a trará.", reaction: "A oferta pacífica, sinal de comunhão. 🤝" },
      { upTo: 99, reaction: "Toda a gordura é do SENHOR — estatuto perpétuo. 🔥" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("altar", 0.45, 1.2, 0.9)], actors: [F(0.3, "man", "stand", "gold")] }),
      kf(3, { terrain: "desert", props: [P("altar", 0.45, 1.2, 1)], actors: [F(0.28, "man", "kneel", "gold"), AN(0.66, "ox", 1)] }),
      kf(27, { terrain: "desert", props: [P("altar", 0.45, 1.2, 0.9), P("smoke", 0.45, 1.4)], actors: [F(0.3, "man", "bow", "brown"), AN(0.68, "goat", 0.9)] }),
    ],
    beats: [
      { upTo: 12, god: "Se alguém pecar por engano contra os meus mandamentos...", reaction: "A oferta pelo pecado, para expiar o erro. 🐂" },
      { upTo: 99, reaction: "Príncipe ou povo — cada um traz o seu sacrifício. 🐐" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("altar", 0.45, 1.1, 0.8), P("dove", 0.66)], actors: [F(0.32, "man", "kneel", "brown")] }),
      kf(11, { terrain: "desert", props: [P("altar", 0.45, 1.1, 0.8), P("basket", 0.66)], actors: [F(0.3, "man", "carry", "sand")] }),
    ],
    beats: [
      { upTo: 10, god: "Se alguém pecar e for culpado, confessará o seu pecado.", reaction: "O pobre traz duas rolas ao SENHOR. 🕊️" },
      { upTo: 99, reaction: "A oferta pela culpa restitui o que foi tirado. 🤍" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("altar", 0.45, 1.2, 1)], actors: [F(0.3, "man", "stand", "gold")] }),
      kf(8, { terrain: "desert", props: [P("altar", 0.45, 1.2, 1), P("smoke", 0.45, 1.6)], actors: [F(0.3, "man", "raise", "gold")] }),
    ],
    beats: [
      { upTo: 7, god: "Restituirá aquilo em que fez fraude, e mais um quinto.", reaction: "Leis de restituição diante do SENHOR. ⚖️" },
      { upTo: 99, god: "O fogo arderá continuamente sobre o altar; não se apagará.", reaction: "O fogo perpétuo do altar. 🔥" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("altar", 0.45, 1.2, 0.9)], actors: [F(0.3, "man", "stand", "gold"), AN(0.66, "ram", 0.9)] }),
      kf(28, { terrain: "desert", props: [P("altar", 0.45, 1.2, 0.9), P("smoke", 0.45, 1.4)], actors: [F(0.3, "man", "raise", "gold")] }),
    ],
    beats: [
      { upTo: 27, god: "Esta é a lei da oferta pela culpa: coisa santíssima é.", reaction: "As porções dos sacerdotes nas ofertas. 🐏" },
      { upTo: 99, reaction: "O peito e a coxa, movidos diante do SENHOR. 🙌" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("tent", 0.72, 1.2), P("altar", 0.42, 1.1, 0.7)], actors: [F(0.28, "man", "stand", "brown"), F(0.5, "man", "stand", "gold")] }),
      kf(6, { terrain: "desert", crowd: 0.4, props: [P("altar", 0.42, 1.1, 0.9)], actors: [F(0.3, "man", "raise", "brown"), F(0.5, "man", "stand", "white"), F(0.66, "man", "stand", "white")] }),
      kf(22, { terrain: "desert", props: [P("altar", 0.42, 1.1, 1), P("ram", 0.68, 0.9)], actors: [F(0.3, "man", "raise", "brown"), F(0.52, "man", "kneel", "gold")] }),
    ],
    beats: [
      { upTo: 13, god: "Toma Arão e seus filhos, e as vestiduras e o azeite.", reaction: "Moisés consagra Arão e os seus filhos. 🕯️" },
      { upTo: 21, reaction: "As vestes sagradas, o óleo da unção e o sangue. 👘" },
      { upTo: 99, reaction: "Sete dias de consagração diante da tenda. ⛺" },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "desert", crowd: 0.5, props: [P("altar", 0.45, 1.2, 0.9)], actors: [F(0.3, "man", "stand", "gold"), AN(0.66, "ox", 0.9)] }),
      kf(8, { terrain: "desert", crowd: 0.5, props: [P("altar", 0.45, 1.2, 1), P("smoke", 0.45, 1.6)], actors: [F(0.32, "man", "raise", "gold")] }),
      kf(23, { terrain: "desert", glory: 0.8, fire: 0.6, crowd: 0.6, props: [P("altar", 0.45, 1.2, 1)], actors: [F(0.3, "man", "raise", "gold"), F(0.6, "man", "bow", "brown")] }),
    ],
    beats: [
      { upTo: 7, god: "Hoje o SENHOR vos aparecerá.", reaction: "Arão inicia o seu ministério sacerdotal. 🕎" },
      { upTo: 22, reaction: "Arão abençoa o povo diante do altar. 🙌" },
      { upTo: 99, reaction: "Fogo sai de diante do SENHOR e consome o holocausto! 🔥✨" },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "desert", fire: 0.7, glory: 0.5, props: [P("altar", 0.45, 1.1, 1), P("smoke", 0.45, 1.8)], actors: [F(0.34, "man", "lie", "white"), F(0.6, "man", "lie", "white")] }),
      kf(3, { terrain: "desert", night: 0.2, props: [P("tent", 0.7, 1.1)], actors: [F(0.4, "man", "mourn", "gold")] }),
      kf(8, { terrain: "desert", props: [P("altar", 0.45, 1.1, 0.7)], actors: [F(0.4, "man", "stand", "gold")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Nadabe e Abiú oferecem fogo estranho — e fogo os consome. 🔥😢" },
      { upTo: 7, god: "Serei santificado naqueles que se chegam a mim.", reaction: "Arão se cala diante do juízo do SENHOR. 🤍" },
      { upTo: 99, god: "Não bebereis vinho ao entrar na tenda da congregação.", reaction: "Estatutos para o sacerdócio santo. ⚖️" },
    ],
  },
  11: {
    keyframes: [
      kf(1, { terrain: "field", props: [P("tent", 0.78)], actors: [F(0.3, "man", "stand", "brown"), AN(0.6, "ox", 0.9), AN(0.8, "sheep")] }),
      kf(13, { terrain: "hills", props: [P("dove", 0.55)], actors: [F(0.3, "man", "stand", "gold"), AN(0.7, "camel", 0.9)] }),
    ],
    beats: [
      { upTo: 12, god: "Estes são os animais que comereis dentre todos.", reaction: "A distinção entre o limpo e o imundo. 🐂" },
      { upTo: 99, god: "Sereis santos, porque eu sou santo.", reaction: "O povo é chamado a viver separado. 🤍" },
    ],
  },
  12: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("tent", 0.72)], actors: [F(0.45, "woman", "carry", "blue")] }),
      kf(6, { terrain: "desert", props: [P("altar", 0.45, 1, 0.7), P("dove", 0.68)], actors: [F(0.36, "woman", "kneel", "blue"), F(0.6, "man", "stand", "gold")] }),
    ],
    beats: [
      { upTo: 5, god: "A mulher que der à luz será purificada a seu tempo.", reaction: "A purificação após o nascimento do filho. 👶" },
      { upTo: 99, reaction: "Ela traz um cordeiro, ou duas rolas, ao sacerdote. 🕊️" },
    ],
  },
  13: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("tent", 0.74)], actors: [F(0.4, "man", "stand", "gold"), F(0.62, "man", "stand", "sand")] }),
      kf(45, { terrain: "desert", night: 0.2, actors: [F(0.5, "man", "mourn", "gray")] }),
    ],
    beats: [
      { upTo: 44, god: "Quando alguém tiver praga de lepra, será levado ao sacerdote.", reaction: "O sacerdote examina a praga da pele. 🔍" },
      { upTo: 99, reaction: "O leproso habitará só, fora do arraial. 😔" },
    ],
  },
  14: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("dove", 0.5), P("dove", 0.6)], actors: [F(0.32, "man", "stand", "gold"), F(0.6, "man", "kneel", "sand")] }),
      kf(10, { terrain: "desert", props: [P("altar", 0.45, 1.1, 0.9), P("smoke", 0.45, 1.4)], actors: [F(0.32, "man", "raise", "gold"), AN(0.66, "sheep")] }),
    ],
    beats: [
      { upTo: 9, god: "Esta será a lei do leproso no dia da sua purificação.", reaction: "A ave viva solta em campo aberto. 🕊️" },
      { upTo: 99, reaction: "O purificado é reconciliado por meio do sacrifício. 🤍" },
    ],
  },
  15: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("tent", 0.74), P("well", 0.4)], actors: [F(0.4, "man", "stand", "gold")] }),
      kf(13, { terrain: "desert", props: [P("altar", 0.45, 1, 0.7), P("dove", 0.66)], actors: [F(0.4, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 12, god: "Falai aos filhos de Israel sobre as suas impurezas.", reaction: "Leis de pureza sobre o corpo. 💧" },
      { upTo: 99, reaction: "Lavar-se com água e esperar até a tarde. 🤍" },
    ],
  },
  16: {
    keyframes: [
      kf(1, { terrain: "desert", glory: 0.4, props: [P("tent", 0.72, 1.2), P("altar", 0.42, 1.1, 0.7)], actors: [F(0.34, "man", "stand", "white")] }),
      kf(7, { terrain: "desert", props: [P("altar", 0.42, 1.1, 0.8)], actors: [F(0.32, "man", "raise", "white"), AN(0.6, "goat", 0.9), AN(0.8, "goat", 0.9)] }),
      kf(15, { terrain: "desert", glory: 0.6, props: [P("arkCovenant", 0.5, 1), P("smoke", 0.5, 1.8)], actors: [F(0.4, "man", "kneel", "white")] }),
      kf(21, { terrain: "desert", props: [P("altar", 0.4, 1, 0.7)], actors: [F(0.34, "man", "raise", "white"), AN(0.68, "goat", 0.9)] }),
    ],
    beats: [
      { upTo: 10, god: "Uma vez por ano, Arão entrará no santuário com sangue.", reaction: "O Dia da Expiação: dois bodes diante do SENHOR. 🐐" },
      { upTo: 19, reaction: "O sangue aspergido sobre o propiciatório. 🩸" },
      { upTo: 99, reaction: "O bode emissário leva as culpas ao deserto. 🐐🏜️" },
    ],
  },
  17: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("altar", 0.45, 1.2, 0.9), P("tent", 0.72)], actors: [F(0.3, "man", "stand", "gold"), AN(0.66, "ox", 0.9)] }),
      kf(10, { terrain: "desert", props: [P("altar", 0.45, 1.2, 0.8)], actors: [F(0.4, "man", "raise", "gold")] }),
    ],
    beats: [
      { upTo: 9, god: "Todo sacrifício será trazido à porta da tenda.", reaction: "Um só lugar de culto para o povo. ⛺" },
      { upTo: 99, god: "A vida da carne está no sangue; não o comereis.", reaction: "O sangue é sagrado diante do SENHOR. 🩸" },
    ],
  },
  18: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("tent", 0.72)], actors: [F(0.4, "man", "raise", "brown"), F(0.62, "elder", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 5, god: "Eu sou o SENHOR vosso Deus; guardai os meus estatutos.", reaction: "Não sigais os costumes das nações. ⚖️" },
      { upTo: 99, god: "Não vos contamineis; a terra vomita quem a profana.", reaction: "Leis de santidade para a família. 🤍" },
    ],
  },
  19: {
    keyframes: [
      kf(1, { terrain: "desert", glory: 0.3, crowd: 0.5, actors: [F(0.4, "man", "raise", "brown")] }),
      kf(9, { terrain: "field", actors: [F(0.3, "man", "stand", "sand"), F(0.6, "man", "carry", "brown")] }),
    ],
    beats: [
      { upTo: 8, god: "Sereis santos, porque eu, o SENHOR vosso Deus, sou santo.", reaction: "O chamado supremo à santidade. ✨" },
      { upTo: 18, god: "Amarás o teu próximo como a ti mesmo.", reaction: "Deixa as espigas para o pobre e o estrangeiro. 🌾" },
      { upTo: 99, reaction: "Justiça, honra e compaixão no dia a dia. 🤍" },
    ],
  },
  20: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.2, actors: [F(0.4, "man", "raise", "brown"), F(0.64, "elder", "stand", "gray")] }),
    ],
    beats: [
      { upTo: 8, god: "Santificai-vos, pois eu sou o SENHOR que vos santifica.", reaction: "Penas contra a idolatria e a feitiçaria. ⚖️" },
      { upTo: 99, god: "Sereis santos para mim, porque eu, o SENHOR, sou santo.", reaction: "Um povo separado das nações. 🤍" },
    ],
  },
  21: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("tent", 0.72), P("altar", 0.42, 1, 0.7)], actors: [F(0.4, "man", "stand", "gold")] }),
    ],
    beats: [
      { upTo: 9, god: "Os sacerdotes não se contaminarão entre o seu povo.", reaction: "A santidade exigida do sacerdócio. 🕯️" },
      { upTo: 99, god: "Não profanará o meu santuário, pois eu o santifico.", reaction: "Sem defeito, para servir diante do SENHOR. 🤍" },
    ],
  },
  22: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("altar", 0.45, 1.1, 0.8)], actors: [F(0.35, "man", "stand", "gold"), AN(0.68, "ram", 0.9)] }),
    ],
    beats: [
      { upTo: 16, god: "Tratem com respeito as coisas santas dos filhos de Israel.", reaction: "As ofertas santas e quem delas participa. 🐏" },
      { upTo: 99, god: "Não oferecereis animal com defeito; será perfeito.", reaction: "Só o perfeito é digno do SENHOR. 🤍" },
    ],
  },
  23: {
    keyframes: [
      kf(1, { terrain: "desert", crowd: 0.6, props: [P("tent", 0.74)], actors: [F(0.4, "man", "raise", "brown")] }),
      kf(9, { terrain: "field", crowd: 0.6, props: [P("basket", 0.5)], actors: [F(0.35, "man", "carry", "sand"), F(0.6, "man", "raise", "gold")] }),
      kf(33, { terrain: "desert", crowd: 0.7, props: [P("tent", 0.5, 1.1), P("palm", 0.3), P("palm", 0.8)], actors: [F(0.4, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 8, god: "Estas são as minhas festas, as santas convocações.", reaction: "As festas do SENHOR: sábado e Páscoa. 📅" },
      { upTo: 32, reaction: "Primícias, Pentecostes e o Dia da Expiação. 🌾" },
      { upTo: 99, god: "No sétimo mês celebrareis a festa dos tabernáculos.", reaction: "O povo se alegra sob tendas de ramos. 🌿🎉" },
    ],
  },
  24: {
    keyframes: [
      kf(1, { terrain: "desert", glory: 0.3, props: [P("tent", 0.72), P("lampstand", 0.5, 1.1, 1)], actors: [F(0.4, "man", "stand", "gold")] }),
      kf(10, { terrain: "desert", night: 0.2, crowd: 0.4, actors: [F(0.4, "man", "stand", "brown"), F(0.62, "man", "mourn", "gray")] }),
    ],
    beats: [
      { upTo: 9, god: "Acenderás as lâmpadas continuamente diante do SENHOR.", reaction: "O azeite do candelabro e os pães da proposição. 🕎" },
      { upTo: 99, reaction: "O que blasfemou o Nome é julgado no arraial. ⚖️" },
    ],
  },
  25: {
    keyframes: [
      kf(1, { terrain: "field", actors: [F(0.35, "man", "stand", "brown"), AN(0.66, "ox", 0.9)] }),
      kf(8, { terrain: "field", glory: 0.3, crowd: 0.5, props: [P("staff", 0.5)], actors: [F(0.4, "man", "raise", "brown")] }),
      kf(23, { terrain: "hills", actors: [F(0.3, "man", "stand", "sand"), F(0.6, "man", "walk", "brown")] }),
    ],
    beats: [
      { upTo: 7, god: "A terra descansará um sábado ao SENHOR no sétimo ano.", reaction: "O ano sabático da terra. 🌾" },
      { upTo: 22, god: "Santificareis o ano quinquagésimo: será jubileu.", reaction: "O ano do jubileu: liberdade proclamada! 📯" },
      { upTo: 99, reaction: "Cada um volta à sua herança e à sua família. 🏡" },
    ],
  },
  26: {
    keyframes: [
      kf(1, { terrain: "field", glory: 0.4, props: [P("tent", 0.72)], actors: [F(0.4, "man", "raise", "brown")] }),
      kf(14, { terrain: "desert", storm: 0.5, night: 0.3, actors: [F(0.4, "man", "mourn", "gray")] }),
      kf(40, { terrain: "desert", glory: 0.5, actors: [F(0.4, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 13, god: "Se andardes nos meus estatutos, darei as vossas chuvas.", reaction: "As bênçãos da obediência. 🌧️🌾" },
      { upTo: 39, god: "Mas se não me ouvirdes, porei terror sobre vós.", reaction: "As advertências da desobediência. ⛈️" },
      { upTo: 99, god: "Lembrar-me-ei da minha aliança e não os rejeitarei.", reaction: "Deus se lembra da aliança. 🤝" },
    ],
  },
  27: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("tent", 0.72), P("altar", 0.42, 1, 0.6)], actors: [F(0.4, "man", "stand", "gold")] }),
      kf(30, { terrain: "field", actors: [F(0.35, "man", "carry", "brown"), AN(0.7, "sheep")] }),
    ],
    beats: [
      { upTo: 29, god: "Quando alguém fizer voto especial, será conforme a tua estimação.", reaction: "Os votos e as coisas consagradas ao SENHOR. 🤍" },
      { upTo: 99, god: "Todo o dízimo da terra é santo ao SENHOR.", reaction: "O dízimo pertence ao SENHOR. 🌾✨" },
    ],
  },
};
