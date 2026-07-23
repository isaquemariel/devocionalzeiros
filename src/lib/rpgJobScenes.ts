// ============================================================================
// Roteiros de cena (Living Scene v2) — JÓ, capítulo por capítulo.
// A prosperidade e a integridade de Jó, a perda de tudo num só dia, as chagas
// e as cinzas, o longo debate com os três amigos, o discurso de Eliú, a
// resposta de Deus do meio do redemoinho e a restauração final em dobro.
// Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Gênesis/Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const JOB_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "field", glory: 0.4, props: [P("tent", 0.72, 1.2), P("altar", 0.3)], actors: [F(0.4, "man", "stand", "purple"), AN(0.62, "sheep"), AN(0.76, "ox", 0.9), AN(0.9, "camel", 0.9)] }),
      kf(6, { terrain: "field", glory: 0.6, actors: [F(0.35, "angel", "stand", "white"), F(0.62, "angel", "stand", "gray")] }),
      kf(13, { terrain: "field", storm: 0.7, fire: 0.6, actors: [F(0.5, "servant", "walk", "sand")] }),
      kf(18, { terrain: "field", storm: 0.9, night: 0.4, actors: [F(0.5, "servant", "mourn", "sand")] }),
      kf(20, { terrain: "field", night: 0.5, mourn: 0.7, actors: [F(0.45, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Jó, íntegro e temente a Deus, prospera com muitos rebanhos. 🐑🐫" },
      { upTo: 12, god: "Reparaste no meu servo Jó? Não há outro como ele na terra.", reaction: "Satanás é permitido provar Jó. ⚡" },
      { upTo: 19, reaction: "Num só dia: assaltos, fogo do céu e um vendaval derrubam tudo. 💥" },
      { upTo: 99, reaction: "Jó cai por terra e adora: 'O SENHOR deu, o SENHOR tomou.' 🙏" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "field", glory: 0.5, actors: [F(0.35, "angel", "stand", "white"), F(0.62, "angel", "stand", "gray")] }),
      kf(7, { terrain: "desert", night: 0.3, mourn: 0.6, actors: [F(0.45, "man", "lie", "sand")] }),
      kf(9, { terrain: "desert", night: 0.4, mourn: 0.7, actors: [F(0.4, "man", "mourn", "sand"), F(0.62, "woman", "stand", "gray")] }),
      kf(11, { terrain: "desert", mourn: 0.6, actors: [F(0.42, "man", "mourn", "sand"), F(0.6, "elder", "mourn", "gray"), F(0.72, "elder", "mourn", "brown"), F(0.84, "elder", "mourn", "blue")] }),
    ],
    beats: [
      { upTo: 6, god: "Ei-lo na tua mão; somente poupa-lhe a vida.", reaction: "Satanás recebe permissão de tocar seu corpo." },
      { upTo: 8, reaction: "Coberto de chagas, Jó se assenta em cinzas. 🤕" },
      { upTo: 10, reaction: "'Receberíamos o bem e não o mal?' Jó não peca. 🤍" },
      { upTo: 99, reaction: "Os três amigos vêm de longe e choram com ele sete dias. 😢" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.7, mourn: 0.7, actors: [F(0.45, "man", "mourn", "sand")] }),
      kf(11, { terrain: "desert", night: 0.85, storm: 0.4, actors: [F(0.45, "man", "kneel", "sand")] }),
      kf(20, { terrain: "desert", night: 0.9, actors: [F(0.45, "man", "mourn", "sand")] }),
    ],
    beats: [
      { upTo: 10, reaction: "Jó amaldiçoa o dia em que nasceu. 🌑" },
      { upTo: 19, reaction: "'Por que não morri ao sair do ventre?' 😔" },
      { upTo: 99, reaction: "'O que temia me sobreveio; não tenho descanso.' 😢" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.3, actors: [F(0.4, "elder", "raise", "gray"), F(0.62, "man", "mourn", "sand")] }),
      kf(12, { terrain: "desert", night: 0.6, glory: 0.2, actors: [F(0.4, "elder", "stand", "gray")] }),
    ],
    beats: [
      { upTo: 11, reaction: "Elifaz fala: 'Lembra-te: quem, sendo inocente, pereceu?'" },
      { upTo: 99, reaction: "Ele conta uma visão noturna e o temor que o tomou. 🌫️" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.2, actors: [F(0.4, "elder", "raise", "gray"), F(0.62, "man", "mourn", "sand")] }),
      kf(17, { terrain: "desert", glory: 0.3, actors: [F(0.42, "elder", "stand", "gray")] }),
    ],
    beats: [
      { upTo: 16, reaction: "Elifaz: 'A aflição não brota do pó.' 🌾" },
      { upTo: 99, reaction: "'Bem-aventurado o homem a quem Deus corrige.' 🤝" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "desert", mourn: 0.6, actors: [F(0.45, "man", "mourn", "sand"), F(0.7, "elder", "stand", "gray")] }),
      kf(14, { terrain: "desert", night: 0.4, actors: [F(0.45, "man", "raise", "sand")] }),
    ],
    beats: [
      { upTo: 13, reaction: "Jó: 'Se pesassem a minha dor, seria mais pesada que a areia.' ⚖️" },
      { upTo: 99, reaction: "'Meus amigos me falharam como ribeiro que seca.' 💧" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.6, mourn: 0.6, actors: [F(0.45, "man", "lie", "sand")] }),
      kf(11, { terrain: "desert", night: 0.7, storm: 0.3, actors: [F(0.45, "man", "raise", "sand")] }),
    ],
    beats: [
      { upTo: 10, reaction: "Jó: 'Meus dias são mais velozes que a lançadeira.' ⏳" },
      { upTo: 99, god: undefined, reaction: "Ele clama a Deus: 'Por que fizeste de mim teu alvo?' 😔" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "desert", actors: [F(0.4, "elder", "raise", "brown"), F(0.66, "man", "mourn", "sand")] }),
      kf(11, { terrain: "river", props: [P("reeds", 0.2), P("reeds", 0.78)], actors: [F(0.45, "elder", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 10, reaction: "Bildade fala: 'Deus perverte o juízo?' 🌾" },
      { upTo: 99, reaction: "'Como o junco sem lodo, seca o que se esquece de Deus.' 🌱" },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.4, actors: [F(0.45, "man", "stand", "sand")] }),
      kf(4, { terrain: "mountain", storm: 0.5, night: 0.4, actors: [F(0.45, "man", "mourn", "sand")] }),
      kf(25, { terrain: "desert", night: 0.6, actors: [F(0.45, "man", "kneel", "sand")] }),
    ],
    beats: [
      { upTo: 12, reaction: "Jó: 'Como pode o homem justificar-se diante de Deus?' 🌌" },
      { upTo: 24, reaction: "'Ele remove os montes e sacode a terra.' ⛰️" },
      { upTo: 99, reaction: "'Quem dera houvesse entre nós um árbitro!' 😔" },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.6, mourn: 0.6, actors: [F(0.45, "man", "mourn", "sand")] }),
      kf(18, { terrain: "desert", night: 0.8, actors: [F(0.45, "man", "kneel", "sand")] }),
    ],
    beats: [
      { upTo: 17, god: undefined, reaction: "Jó desabafa: 'A minha alma tem tédio da vida.' 😢" },
      { upTo: 99, reaction: "'Cessa, para que eu tome um pouco de alento.' 🌑" },
    ],
  },
  11: {
    keyframes: [
      kf(1, { terrain: "desert", actors: [F(0.4, "elder", "raise", "blue"), F(0.66, "man", "mourn", "sand")] }),
      kf(13, { terrain: "desert", glory: 0.3, actors: [F(0.42, "elder", "stand", "blue")] }),
    ],
    beats: [
      { upTo: 12, reaction: "Zofar fala: 'Devem calar-se os teus muitos ditos?'" },
      { upTo: 99, reaction: "'Se dispuseres o coração a Deus, esquecerás a miséria.' 🌅" },
    ],
  },
  12: {
    keyframes: [
      kf(1, { terrain: "desert", actors: [F(0.45, "man", "raise", "sand"), F(0.72, "elder", "stand", "gray")] }),
      kf(13, { terrain: "mountain", glory: 0.3, actors: [F(0.45, "man", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 12, reaction: "Jó: 'Convosco morrerá a sabedoria?' Com ironia responde. 🙄" },
      { upTo: 99, reaction: "'Com Deus está a sabedoria e a força.' 🌌" },
    ],
  },
  13: {
    keyframes: [
      kf(1, { terrain: "desert", actors: [F(0.4, "man", "raise", "sand"), F(0.6, "elder", "stand", "gray"), F(0.74, "elder", "stand", "brown")] }),
      kf(20, { terrain: "desert", night: 0.4, actors: [F(0.45, "man", "kneel", "sand")] }),
    ],
    beats: [
      { upTo: 19, reaction: "Jó: 'Sois todos médicos que nada valeis.' ⚖️" },
      { upTo: 99, god: undefined, reaction: "'Ainda que me mate, nele esperarei.' 🤍" },
    ],
  },
  14: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.4, actors: [F(0.45, "man", "mourn", "sand")] }),
      kf(7, { terrain: "field", props: [P("tree", 0.6, 1.1)], actors: [F(0.4, "man", "stand", "sand")] }),
      kf(13, { terrain: "desert", night: 0.7, actors: [F(0.45, "man", "kneel", "sand")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Jó: 'O homem nasce da mulher, breve de dias.' 🍃" },
      { upTo: 12, reaction: "'Há esperança para a árvore que é cortada.' 🌳" },
      { upTo: 99, reaction: "'Tu contas os meus passos...' 🌑" },
    ],
  },
  15: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.3, actors: [F(0.4, "elder", "raise", "gray"), F(0.66, "man", "mourn", "sand")] }),
      kf(17, { terrain: "desert", storm: 0.3, night: 0.4, actors: [F(0.42, "elder", "stand", "gray")] }),
    ],
    beats: [
      { upTo: 16, reaction: "Elifaz replica com mais dureza: 'A tua boca te condena.'" },
      { upTo: 99, reaction: "'O ímpio se atormenta todos os seus dias.' 🌫️" },
    ],
  },
  16: {
    keyframes: [
      kf(1, { terrain: "desert", mourn: 0.6, actors: [F(0.45, "man", "mourn", "sand"), F(0.72, "elder", "stand", "gray")] }),
      kf(18, { terrain: "desert", night: 0.4, glory: 0.3, actors: [F(0.45, "man", "raise", "sand")] }),
    ],
    beats: [
      { upTo: 17, reaction: "Jó: 'Consoladores molestos sois todos vós.' 😔" },
      { upTo: 99, reaction: "'Eis que a minha testemunha está nos céus.' 🌟" },
    ],
  },
  17: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.7, mourn: 0.7, actors: [F(0.45, "man", "mourn", "sand")] }),
      kf(11, { terrain: "desert", night: 0.85, actors: [F(0.45, "man", "kneel", "sand")] }),
    ],
    beats: [
      { upTo: 10, reaction: "Jó: 'O meu espírito se vai consumindo.' 🌑" },
      { upTo: 99, reaction: "'Se espero, a sepultura é a minha casa.' 😢" },
    ],
  },
  18: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.3, actors: [F(0.4, "elder", "raise", "brown"), F(0.66, "man", "mourn", "sand")] }),
      kf(5, { terrain: "desert", night: 0.6, fire: 0.3, actors: [F(0.42, "elder", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Bildade fala de novo, indignado. 😠" },
      { upTo: 99, reaction: "'A luz do ímpio se apaga; a rede o prende.' 🕸️" },
    ],
  },
  19: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.5, mourn: 0.6, actors: [F(0.45, "man", "mourn", "sand"), F(0.74, "elder", "stand", "gray")] }),
      kf(13, { terrain: "desert", night: 0.6, actors: [F(0.45, "man", "kneel", "sand")] }),
      kf(25, { terrain: "mountain", glory: 0.85, actors: [F(0.45, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 12, reaction: "Jó: 'Até quando afligireis a minha alma?' 😢" },
      { upTo: 24, reaction: "'Meus parentes me abandonaram.' 🌑" },
      { upTo: 99, reaction: "'Eu sei que o meu Redentor vive!' A esperança irrompe. 🌟" },
    ],
  },
  20: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.3, actors: [F(0.4, "elder", "raise", "blue"), F(0.66, "man", "mourn", "sand")] }),
      kf(15, { terrain: "desert", night: 0.6, fire: 0.3, actors: [F(0.42, "elder", "stand", "blue")] }),
    ],
    beats: [
      { upTo: 14, reaction: "Zofar fala outra vez: 'O júbilo do ímpio é breve.'" },
      { upTo: 99, reaction: "'Ele engole riquezas, mas as vomitará.' ⚖️" },
    ],
  },
  21: {
    keyframes: [
      kf(1, { terrain: "desert", actors: [F(0.45, "man", "raise", "sand"), F(0.72, "elder", "stand", "gray")] }),
      kf(17, { terrain: "field", night: 0.3, actors: [F(0.45, "man", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 16, reaction: "Jó: 'Por que vivem os ímpios e envelhecem?' 🤔" },
      { upTo: 99, reaction: "'Como, então, me consolais com vaidade?' 😔" },
    ],
  },
  22: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.3, actors: [F(0.4, "elder", "raise", "gray"), F(0.66, "man", "mourn", "sand")] }),
      kf(21, { terrain: "desert", glory: 0.4, actors: [F(0.42, "elder", "raise", "gray")] }),
    ],
    beats: [
      { upTo: 20, reaction: "Elifaz acusa Jó de grandes pecados. 😠" },
      { upTo: 99, reaction: "'Apega-te a Deus e terás paz.' 🌅" },
    ],
  },
  23: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.4, actors: [F(0.45, "man", "raise", "sand")] }),
      kf(8, { terrain: "mountain", night: 0.5, actors: [F(0.45, "man", "walk", "sand")] }),
    ],
    beats: [
      { upTo: 7, god: undefined, reaction: "Jó: 'Quem me dera achar o lugar de Deus!' 🔍" },
      { upTo: 99, reaction: "'Ele conhece o meu caminho; sairei como o ouro.' ✨" },
    ],
  },
  24: {
    keyframes: [
      kf(1, { terrain: "plain", night: 0.6, actors: [F(0.35, "man", "stand", "sand"), F(0.6, "man", "carry", "gray")] }),
      kf(13, { terrain: "city", night: 0.8, actors: [F(0.45, "man", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 12, reaction: "Jó lamenta a injustiça dos violentos contra os pobres. 😔" },
      { upTo: 99, reaction: "'Amam as trevas mais que a luz.' 🌑" },
    ],
  },
  25: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.5, glory: 0.3, actors: [F(0.42, "elder", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Bildade, breve: 'Como será justo o homem diante de Deus?'" },
      { upTo: 99, reaction: "'Ele faz reinar a paz nas suas alturas.' 🌌" },
    ],
  },
  26: {
    keyframes: [
      kf(1, { terrain: "desert", actors: [F(0.45, "man", "stand", "sand"), F(0.72, "elder", "mourn", "gray")] }),
      kf(7, { terrain: "sea", night: 0.5, glory: 0.4, actors: [F(0.45, "man", "raise", "sand")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Jó responde com ironia a Bildade. 🙄" },
      { upTo: 99, reaction: "'Ele estende o norte sobre o vazio e suspende a terra.' 🌌" },
    ],
  },
  27: {
    keyframes: [
      kf(1, { terrain: "desert", glory: 0.3, actors: [F(0.45, "man", "raise", "sand")] }),
      kf(13, { terrain: "desert", storm: 0.3, night: 0.4, actors: [F(0.45, "man", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 12, reaction: "Jó mantém a integridade: 'Não largarei a minha justiça.' 🤍" },
      { upTo: 99, reaction: "'Esta é a porção do ímpio para com Deus.' ⚖️" },
    ],
  },
  28: {
    keyframes: [
      kf(1, { terrain: "mountain", night: 0.3, actors: [F(0.4, "man", "stand", "sand")] }),
      kf(12, { terrain: "mountain", glory: 0.5, actors: [F(0.45, "man", "raise", "sand")] }),
      kf(28, { terrain: "mountain", glory: 0.7, actors: [F(0.45, "man", "kneel", "sand")] }),
    ],
    beats: [
      { upTo: 11, reaction: "O homem cava a terra em busca de metais preciosos. ⛏️" },
      { upTo: 27, reaction: "'Mas onde se achará a sabedoria?' 💎" },
      { upTo: 99, reaction: "'Eis que o temor do Senhor é a sabedoria.' 🌟" },
    ],
  },
  29: {
    keyframes: [
      kf(1, { terrain: "field", glory: 0.4, actors: [F(0.45, "man", "stand", "sand")] }),
      kf(7, { terrain: "city", glory: 0.3, crowd: 0.4, actors: [F(0.4, "man", "stand", "sand"), F(0.7, "elder", "bow", "gray")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Jó recorda os dias em que Deus o guardava. ☀️" },
      { upTo: 99, reaction: "'Ouviam-me e esperavam; eu era olhos para o cego.' 🤝" },
    ],
  },
  30: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.5, mourn: 0.6, actors: [F(0.45, "man", "mourn", "sand"), F(0.7, "man", "stand", "gray")] }),
      kf(16, { terrain: "desert", night: 0.7, storm: 0.3, actors: [F(0.45, "man", "kneel", "sand")] }),
    ],
    beats: [
      { upTo: 15, reaction: "'Mas agora zombam de mim os mais jovens.' 😢" },
      { upTo: 99, reaction: "'Clamo a ti, e não me respondes.' 🌑" },
    ],
  },
  31: {
    keyframes: [
      kf(1, { terrain: "desert", glory: 0.3, actors: [F(0.45, "man", "raise", "sand")] }),
      kf(35, { terrain: "desert", glory: 0.4, actors: [F(0.45, "man", "raise", "sand")] }),
    ],
    beats: [
      { upTo: 34, reaction: "Jó faz seu juramento de inocência, ponto por ponto. 🤍" },
      { upTo: 99, reaction: "'Eis a minha defesa; que o Todo-Poderoso me responda!' ✍️" },
    ],
  },
  32: {
    keyframes: [
      kf(1, { terrain: "desert", actors: [F(0.3, "man", "mourn", "sand"), F(0.5, "elder", "stand", "gray"), F(0.66, "elder", "stand", "brown"), F(0.82, "elder", "stand", "blue")] }),
      kf(6, { terrain: "desert", storm: 0.4, actors: [F(0.45, "man", "raise", "green")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Os três amigos se calam. Eliú, jovem, arde de indignação. 🔥" },
      { upTo: 99, reaction: "Eliú fala: 'Eu também darei a minha opinião.' 💨" },
    ],
  },
  33: {
    keyframes: [
      kf(1, { terrain: "desert", storm: 0.4, actors: [F(0.42, "man", "raise", "green"), F(0.7, "man", "mourn", "sand")] }),
      kf(14, { terrain: "desert", night: 0.4, storm: 0.3, actors: [F(0.42, "man", "stand", "green")] }),
    ],
    beats: [
      { upTo: 13, reaction: "Eliú se dirige a Jó: 'Ouve as minhas palavras.' 💨" },
      { upTo: 99, reaction: "'Deus fala de uma e de outra maneira.' 🌫️" },
    ],
  },
  34: {
    keyframes: [
      kf(1, { terrain: "desert", storm: 0.4, actors: [F(0.42, "man", "raise", "green"), F(0.66, "elder", "stand", "gray")] }),
      kf(16, { terrain: "desert", storm: 0.5, night: 0.3, actors: [F(0.42, "man", "raise", "green")] }),
    ],
    beats: [
      { upTo: 15, reaction: "Eliú: 'Longe de Deus a impiedade.' ⚖️" },
      { upTo: 99, reaction: "'Ele paga ao homem conforme a sua obra.' 💨" },
    ],
  },
  35: {
    keyframes: [
      kf(1, { terrain: "desert", storm: 0.4, actors: [F(0.42, "man", "raise", "green"), F(0.7, "man", "mourn", "sand")] }),
      kf(9, { terrain: "desert", night: 0.4, storm: 0.3, actors: [F(0.42, "man", "stand", "green")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Eliú: 'Tua justiça, o que acrescenta a Deus?' 🌌" },
      { upTo: 99, reaction: "'Clamam, mas ninguém responde por causa do orgulho.' 💨" },
    ],
  },
  36: {
    keyframes: [
      kf(1, { terrain: "desert", storm: 0.4, actors: [F(0.42, "man", "raise", "green")] }),
      kf(26, { terrain: "mountain", storm: 0.6, glory: 0.3, actors: [F(0.42, "man", "raise", "green")] }),
    ],
    beats: [
      { upTo: 25, reaction: "Eliú exalta a grandeza de Deus. 🌟" },
      { upTo: 99, reaction: "'Eis que Deus é excelso; ajunta as águas em nuvens.' ☁️" },
    ],
  },
  37: {
    keyframes: [
      kf(1, { terrain: "mountain", storm: 0.8, night: 0.4, actors: [F(0.42, "man", "raise", "green")] }),
      kf(14, { terrain: "mountain", storm: 0.7, glory: 0.4, actors: [F(0.42, "man", "bow", "green")] }),
    ],
    beats: [
      { upTo: 13, reaction: "Eliú: 'A sua voz troveja maravilhosamente.' ⚡" },
      { upTo: 99, reaction: "'O Todo-Poderoso é grande em poder; temam-no os homens.' 🌩️" },
    ],
  },
  38: {
    keyframes: [
      kf(1, { terrain: "mountain", storm: 0.9, glory: 0.6, actors: [F(0.45, "man", "bow", "sand")] }),
      kf(4, { terrain: "sea", storm: 0.7, glory: 0.5, actors: [F(0.45, "man", "kneel", "sand")] }),
      kf(31, { terrain: "mountain", night: 0.7, storm: 0.4, glory: 0.5, props: [P("star", 0.28), P("star", 0.5, 0.9), P("star", 0.72)], actors: [F(0.45, "man", "bow", "sand")] }),
    ],
    beats: [
      { upTo: 3, god: "Quem é este que escurece o conselho com palavras sem saber?", reaction: "Deus responde do meio do redemoinho! 🌪️" },
      { upTo: 30, god: "Onde estavas tu quando eu lançava os fundamentos da terra?", reaction: "O Criador interroga sobre mar, luz e neve. 🌊" },
      { upTo: 99, god: "Podes atar as delícias das Plêiades?", reaction: "As estrelas e as leis dos céus. ✨" },
    ],
  },
  39: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.4, actors: [F(0.35, "man", "bow", "sand"), AN(0.6, "goat"), AN(0.78, "goat", 0.9)] }),
      kf(9, { terrain: "field", glory: 0.4, actors: [AN(0.5, "ox", 1.1), F(0.8, "man", "kneel", "sand")] }),
      kf(19, { terrain: "plain", storm: 0.4, glory: 0.4, actors: [F(0.78, "man", "bow", "sand")] }),
    ],
    beats: [
      { upTo: 8, god: "Sabes tu o tempo em que as cabras montesas dão crias?", reaction: "Deus mostra as maravilhas dos animais selvagens. 🐐" },
      { upTo: 18, god: "Prenderás o boi selvagem com a corda ao sulco?", reaction: "O boi selvagem, o avestruz, indomáveis. 🐂" },
      { upTo: 99, god: "Deste tu força ao cavalo? Ele ri-se do temor.", reaction: "O cavalo de guerra e a águia nas alturas. 🦅" },
    ],
  },
  40: {
    keyframes: [
      kf(1, { terrain: "mountain", storm: 0.7, glory: 0.6, actors: [F(0.45, "man", "bow", "sand")] }),
      kf(6, { terrain: "mountain", storm: 0.8, glory: 0.6, actors: [F(0.45, "man", "kneel", "sand")] }),
      kf(15, { terrain: "river", glory: 0.4, props: [P("reeds", 0.2), P("reeds", 0.82)], actors: [F(0.4, "man", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 5, god: "Contenderá contra o Todo-Poderoso quem o repreende?", reaction: "Jó põe a mão sobre a boca. 🤫" },
      { upTo: 14, god: "Cinge agora os teus lombos como homem.", reaction: "Deus desafia Jó a ostentar poder. 🌪️" },
      { upTo: 99, god: "Contempla o beemote, que eu criei como a ti.", reaction: "A força colossal do beemote. 🦛" },
    ],
  },
  41: {
    keyframes: [
      kf(1, { terrain: "sea", night: 0.4, storm: 0.5, actors: [F(0.4, "man", "kneel", "sand")] }),
      kf(18, { terrain: "sea", fire: 0.6, storm: 0.4, actors: [F(0.4, "man", "bow", "sand")] }),
    ],
    beats: [
      { upTo: 17, god: "Poderás tirar com anzol o leviatã?", reaction: "Deus descreve o leviatã, o terror do mar. 🐉" },
      { upTo: 99, god: "Sobre a terra não há quem se lhe compare.", reaction: "Fogo sai da sua boca; ninguém o domina. 🔥" },
    ],
  },
  42: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.8, actors: [F(0.45, "man", "bow", "sand")] }),
      kf(7, { terrain: "desert", glory: 0.6, props: [P("altar", 0.5, 1, 0.9)], actors: [F(0.3, "man", "raise", "brown"), F(0.55, "elder", "kneel", "gray"), F(0.7, "elder", "kneel", "brown"), F(0.84, "elder", "kneel", "blue")] }),
      kf(10, { terrain: "field", glory: 0.9, crowd: 0.6, props: [P("tent", 0.72, 1.3)], actors: [F(0.4, "man", "raise", "purple"), AN(0.6, "sheep"), AN(0.74, "ox", 0.9), AN(0.88, "camel", 0.9)] }),
    ],
    beats: [
      { upTo: 6, reaction: "Jó se rende: 'Eu te conhecia de ouvir, mas agora te veem os meus olhos.' 🙇" },
      { upTo: 9, god: "Ide ao meu servo Jó, e ele orará por vós.", reaction: "Deus perdoa os amigos por intercessão de Jó. 🙏" },
      { upTo: 99, reaction: "O SENHOR restaura Jó em dobro — rebanhos, filhos e alegria! 🐑🐫✨" },
    ],
  },
};
