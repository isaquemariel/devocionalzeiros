// ============================================================================
// Roteiros de cena (Living Scene v2) — 2 CRÔNICAS, capítulo por capítulo.
// A sabedoria de Salomão, a construção e dedicação do templo, a glória que o
// enche com fogo, a rainha de Sabá, os reis de Judá com suas reformas e
// batalhas, e a queda de Jerusalém, o templo em chamas, o exílio e o decreto
// de Ciro. Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const CHRON2_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "hills", props: [P("tent", 0.6, 1.2), P("altar", 0.4, 1.2, 0.9)], actors: [F(0.3, "king", "stand", "gold")] }),
      kf(6, { terrain: "hills", glory: 0.4, props: [P("altar", 0.45, 1.3, 1)], actors: [F(0.4, "king", "kneel", "gold")] }),
      kf(7, { terrain: "hills", night: 0.6, glory: 0.6, actors: [F(0.42, "king", "bow", "gold")] }),
      kf(14, { terrain: "city", crowd: 0.5, actors: [F(0.4, "king", "stand", "gold"), AN(0.66, "camel", 0.9), AN(0.82, "ox", 0.9)] }),
    ],
    beats: [
      { upTo: 5, reaction: "Salomão firma-se no reino e vai a Gibeão sacrificar. 👑" },
      { upTo: 6, reaction: "Mil holocaustos sobem do altar de bronze. 🔥" },
      { upTo: 12, god: "Pede o que queres que eu te dê.", reaction: "'Dá-me sabedoria para julgar o teu povo.' ✨" },
      { upTo: 99, reaction: "Deus lhe dá sabedoria, riquezas e honra. 💰" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.4, actors: [F(0.4, "king", "raise", "gold"), F(0.62, "servant", "stand", "sand")] }),
      kf(11, { terrain: "sea", props: [P("tower", 0.72, 1.1)], actors: [F(0.3, "king", "stand", "purple"), F(0.5, "servant", "carry", "brown")] }),
    ],
    beats: [
      { upTo: 10, reaction: "Salomão resolve edificar uma Casa ao Nome do SENHOR. 🏗️" },
      { upTo: 99, reaction: "Hirão de Tiro envia madeira e artífices. 🤝" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "mountain", props: [P("tower", 0.5, 1.3)], actors: [F(0.32, "king", "stand", "gold"), F(0.6, "man", "carry", "brown")] }),
      kf(8, { terrain: "city", glory: 0.3, props: [P("tower", 0.5, 1.4)], actors: [F(0.3, "man", "carry", "sand"), F(0.7, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 7, reaction: "Sobre o monte Moriá começa a Casa do SENHOR. ⛰️" },
      { upTo: 99, reaction: "O Santo dos Santos, os querubins e as colunas de ouro. ✨" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("altar", 0.28, 1.3, 0.8), P("well", 0.55, 1.2), P("lampstand", 0.78, 1, 1)], actors: [F(0.4, "man", "stand", "brown")] }),
      kf(11, { terrain: "city", glory: 0.3, props: [P("lampstand", 0.35, 1, 1), P("lampstand", 0.66, 1, 1)], actors: [F(0.5, "man", "carry", "sand")] }),
    ],
    beats: [
      { upTo: 10, reaction: "O altar de bronze e o mar de fundição sobre doze bois. 🐂" },
      { upTo: 99, reaction: "Dez candelabros de ouro e todos os utensílios. 🕎" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, props: [P("tower", 0.72, 1.3)], actors: [F(0.4, "king", "stand", "gold")] }),
      kf(7, { terrain: "city", crowd: 0.7, glory: 0.4, props: [P("arkCovenant", 0.5, 1.1)], actors: [F(0.3, "servant", "carry", "white"), F(0.7, "servant", "carry", "white")] }),
      kf(11, { terrain: "city", crowd: 0.6, glory: 0.7, actors: [F(0.35, "man", "raise", "white"), F(0.55, "man", "raise", "sand")] }),
      kf(13, { terrain: "city", glory: 0.9, smoke: 0.6, props: [P("smoke", 0.5, 2.2)], actors: [] }),
    ],
    beats: [
      { upTo: 6, reaction: "Os sacerdotes trazem a arca à Casa do SENHOR. 📦" },
      { upTo: 10, reaction: "A arca repousa no Santo dos Santos, sob os querubins. ✨" },
      { upTo: 12, reaction: "Levitas e trombetas louvam: 'Porque ele é bom!' 🎺" },
      { upTo: 99, reaction: "A nuvem enche a Casa — a glória do SENHOR! 🌟☁️" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.6, glory: 0.5, props: [P("smoke", 0.5, 1.6)], actors: [F(0.4, "king", "stand", "gold")] }),
      kf(12, { terrain: "city", crowd: 0.7, glory: 0.6, props: [P("altar", 0.5, 1.2, 0.4)], actors: [F(0.42, "king", "kneel", "gold")] }),
      kf(40, { terrain: "city", crowd: 0.6, glory: 0.7, actors: [F(0.42, "king", "raise", "gold")] }),
    ],
    beats: [
      { upTo: 11, reaction: "Salomão bendiz toda a congregação de Israel. 🙌" },
      { upTo: 39, god: undefined, reaction: "De joelhos, ele estende as mãos ao céu e ora. 🙏" },
      { upTo: 99, reaction: "'Levanta-te, SENHOR, para o teu repouso!' ✨" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.6, glory: 0.7, fire: 0.85, props: [P("altar", 0.5, 1.3, 1), P("smoke", 0.5, 1.8)], actors: [F(0.4, "king", "bow", "gold")] }),
      kf(3, { terrain: "city", crowd: 0.8, glory: 0.8, actors: [F(0.3, "man", "bow", "white"), F(0.5, "man", "bow", "sand"), F(0.7, "man", "bow", "brown")] }),
      kf(11, { terrain: "city", crowd: 0.5, props: [P("altar", 0.5, 1.2, 0.6)], actors: [F(0.4, "king", "raise", "gold")] }),
      kf(12, { terrain: "city", night: 0.7, glory: 0.6, actors: [F(0.42, "king", "kneel", "gold")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Desce fogo do céu e consome o holocausto! 🔥" },
      { upTo: 10, reaction: "A glória enche a Casa; o povo adora e festeja. 🎉" },
      { upTo: 11, reaction: "Concluída a Casa do SENHOR e o palácio real. 🏛️" },
      { upTo: 99, god: "Se o meu povo se humilhar e orar, eu sararei a sua terra.", reaction: "Deus aparece a Salomão de noite. 🌙" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.3, 1.1), P("tower", 0.72, 1.2)], actors: [F(0.4, "king", "stand", "gold"), F(0.66, "man", "carry", "brown")] }),
      kf(17, { terrain: "sea", props: [P("tower", 0.8, 1.1)], actors: [F(0.3, "servant", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 16, reaction: "Salomão reedifica cidades e organiza o serviço do templo. 🏙️" },
      { upTo: 99, reaction: "Suas naus vão a Ofir buscar ouro. ⚓" },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "desert", crowd: 0.4, actors: [F(0.35, "queen", "walk", "purple"), AN(0.58, "camel", 1), AN(0.74, "camel", 0.9), AN(0.88, "camel", 0.85)] }),
      kf(3, { terrain: "city", crowd: 0.5, props: [P("tower", 0.72, 1.3)], actors: [F(0.35, "king", "stand", "gold"), F(0.6, "queen", "bow", "purple")] }),
      kf(13, { terrain: "city", glory: 0.3, actors: [F(0.4, "king", "stand", "gold"), AN(0.7, "lion", 0.9)] }),
      kf(29, { terrain: "city", night: 0.4, actors: [F(0.45, "king", "lie", "gold")] }),
    ],
    beats: [
      { upTo: 2, reaction: "A rainha de Sabá vem com camelos e especiarias. 🐫" },
      { upTo: 12, reaction: "Ela vê a sabedoria de Salomão e fica sem fôlego. 😮" },
      { upTo: 28, reaction: "Ouro, marfim e trono de leões — riqueza sem igual. 👑" },
      { upTo: 99, reaction: "Salomão descansa com seus pais após quarenta anos. 🌙" },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.6, actors: [F(0.4, "king", "stand", "gold"), F(0.62, "man", "kneel", "brown")] }),
      kf(13, { terrain: "city", crowd: 0.7, actors: [F(0.4, "king", "raise", "gold"), F(0.66, "man", "mourn", "sand")] }),
      kf(16, { terrain: "plain", crowd: 0.6, actors: [F(0.35, "man", "walk", "brown"), F(0.6, "man", "walk", "sand")] }),
    ],
    beats: [
      { upTo: 11, reaction: "O povo pede a Roboão que alivie o jugo. 🙏" },
      { upTo: 15, reaction: "Ele os responde com dureza, seguindo os jovens. 😠" },
      { upTo: 99, reaction: "Dez tribos se rebelam: o reino se divide. 💔" },
    ],
  },
  11: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.4, actors: [F(0.4, "king", "raise", "gold"), F(0.62, "warrior", "stand", "red")] }),
      kf(5, { terrain: "hills", props: [P("tower", 0.3, 1.1), P("tower", 0.7, 1.2)], actors: [F(0.5, "man", "carry", "brown")] }),
      kf(13, { terrain: "city", glory: 0.3, actors: [F(0.4, "man", "walk", "white"), F(0.6, "man", "walk", "sand")] }),
    ],
    beats: [
      { upTo: 4, god: "Não subireis a pelejar contra os vossos irmãos.", reaction: "Roboão recua da guerra. ✋" },
      { upTo: 12, reaction: "Ele fortifica as cidades de Judá. 🏰" },
      { upTo: 99, reaction: "Sacerdotes e levitas se ajuntam a ele em Jerusalém. 🤝" },
    ],
  },
  12: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.2, actors: [F(0.4, "king", "stand", "gold")] }),
      kf(2, { terrain: "plain", crowd: 0.6, actors: [F(0.3, "warrior", "fight", "red", { facing: 1 }), AN(0.66, "camel", 0.9)] }),
      kf(7, { terrain: "city", glory: 0.3, actors: [F(0.4, "king", "kneel", "gold"), F(0.62, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 1, reaction: "Roboão abandona a lei do SENHOR. 😔" },
      { upTo: 6, reaction: "Sisaque do Egito sobe contra Jerusalém. ⚔️" },
      { upTo: 99, god: "Eles se humilharam; não os destruirei de todo.", reaction: "Ao se humilharem, Deus os poupa. 🤍" },
    ],
  },
  13: {
    keyframes: [
      kf(1, { terrain: "hills", crowd: 0.4, actors: [F(0.4, "king", "raise", "gold")] }),
      kf(4, { terrain: "mountain", crowd: 0.5, actors: [F(0.3, "king", "raise", "purple"), F(0.7, "warrior", "stand", "red", { facing: -1 })] }),
      kf(14, { terrain: "plain", storm: 0.4, crowd: 0.6, actors: [F(0.28, "warrior", "fight", "purple", { facing: 1 }), F(0.5, "man", "raise", "white"), F(0.72, "warrior", "fight", "red", { facing: -1 })] }),
    ],
    beats: [
      { upTo: 3, reaction: "Abias enfrenta Jeroboão com metade do exército. ⚔️" },
      { upTo: 12, reaction: "'Conosco está Deus por cabeça!' 📯" },
      { upTo: 99, reaction: "Judá clama ao SENHOR e vence Israel. 🙌" },
    ],
  },
  14: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.3, props: [P("altar", 0.6, 1.1, 0.5)], actors: [F(0.4, "king", "stand", "gold")] }),
      kf(6, { terrain: "hills", props: [P("tower", 0.32, 1.1), P("tower", 0.7, 1.2)], actors: [F(0.5, "man", "carry", "brown")] }),
      kf(9, { terrain: "plain", storm: 0.4, crowd: 0.7, actors: [F(0.3, "king", "raise", "purple"), F(0.7, "warrior", "fight", "red", { facing: -1 })] }),
    ],
    beats: [
      { upTo: 5, reaction: "Asa tira os altares estranhos; a terra tem paz. 🕊️" },
      { upTo: 8, reaction: "Ele edifica cidades fortes em Judá. 🏰" },
      { upTo: 99, god: undefined, reaction: "Asa clama e o SENHOR fere Zerá, o etíope. 🙏⚔️" },
    ],
  },
  15: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.4, actors: [F(0.4, "king", "stand", "gold"), F(0.62, "man", "raise", "white")] }),
      kf(8, { terrain: "city", crowd: 0.5, props: [P("altar", 0.5, 1.2, 0.7)], actors: [F(0.4, "king", "raise", "gold")] }),
      kf(12, { terrain: "city", crowd: 0.7, glory: 0.4, actors: [F(0.35, "man", "raise", "sand"), F(0.6, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 7, god: "O SENHOR está convosco enquanto estiverdes com ele.", reaction: "Azarias, o profeta, anima o rei Asa. 📜" },
      { upTo: 11, reaction: "Asa renova o altar e purifica a terra. 🔥" },
      { upTo: 99, reaction: "Todos juram buscar o SENHOR de todo o coração. 🤝" },
    ],
  },
  16: {
    keyframes: [
      kf(1, { terrain: "hills", props: [P("tower", 0.5, 1.2)], actors: [F(0.3, "king", "stand", "gold"), F(0.66, "warrior", "stand", "red")] }),
      kf(7, { terrain: "city", night: 0.3, actors: [F(0.4, "king", "mourn", "gold"), F(0.62, "man", "raise", "white")] }),
      kf(12, { terrain: "city", night: 0.4, actors: [F(0.45, "king", "lie", "gold")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Asa faz aliança com a Síria contra Baasa. 🪙" },
      { upTo: 11, god: "Confiaste na Síria e não no SENHOR teu Deus.", reaction: "O vidente Hanani o repreende. 😔" },
      { upTo: 99, reaction: "Doente dos pés, Asa não busca a Deus e morre. 🌙" },
    ],
  },
  17: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.3, props: [P("tower", 0.72, 1.2)], actors: [F(0.4, "king", "stand", "gold")] }),
      kf(7, { terrain: "hills", crowd: 0.4, actors: [F(0.35, "man", "raise", "white"), F(0.6, "man", "stand", "sand")] }),
      kf(12, { terrain: "city", crowd: 0.4, actors: [F(0.3, "king", "stand", "gold"), F(0.66, "warrior", "stand", "red")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Josafá anda nos caminhos de Davi; o SENHOR o firma. 👑" },
      { upTo: 11, reaction: "Ele envia mestres a ensinar a Lei em Judá. 📖" },
      { upTo: 99, reaction: "Seu poder cresce e as nações o temem. 🛡️" },
    ],
  },
  18: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.4, actors: [F(0.35, "king", "stand", "gold"), F(0.62, "king", "stand", "purple")] }),
      kf(9, { terrain: "city", crowd: 0.6, actors: [F(0.3, "king", "stand", "gold"), F(0.5, "man", "raise", "white"), F(0.72, "king", "stand", "purple")] }),
      kf(28, { terrain: "plain", storm: 0.5, crowd: 0.6, actors: [F(0.3, "warrior", "fight", "red", { facing: 1 }), F(0.7, "king", "mourn", "purple")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Josafá alia-se a Acabe contra Ramote-Gileade. 🤝" },
      { upTo: 27, reaction: "Só Micaías profetiza a verdade — e é preso. 📜" },
      { upTo: 99, reaction: "Uma flecha ao acaso fere Acabe de morte. 🏹" },
    ],
  },
  19: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.2, actors: [F(0.4, "king", "walk", "gold"), F(0.62, "man", "raise", "white")] }),
      kf(5, { terrain: "city", crowd: 0.4, actors: [F(0.4, "king", "stand", "gold"), F(0.6, "elder", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 4, reaction: "O vidente Jeú adverte Josafá ao voltar. 📜" },
      { upTo: 99, god: undefined, reaction: "Josafá nomeia juízes: 'Julgai para o SENHOR.' ⚖️" },
    ],
  },
  20: {
    keyframes: [
      kf(1, { terrain: "desert", crowd: 0.5, actors: [F(0.4, "warrior", "stand", "red", { facing: -1 })] }),
      kf(5, { terrain: "city", crowd: 0.7, glory: 0.3, actors: [F(0.42, "king", "raise", "gold")] }),
      kf(21, { terrain: "hills", crowd: 0.6, glory: 0.4, actors: [F(0.3, "man", "raise", "white"), F(0.5, "man", "raise", "purple")] }),
      kf(24, { terrain: "desert", glory: 0.5, actors: [F(0.4, "king", "raise", "gold")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Moabe e Amom marcham contra Judá. ⚔️" },
      { upTo: 17, god: "Não é vossa a peleja, mas de Deus. Ficai quietos.", reaction: "Josafá ora e Deus responde. 🙏" },
      { upTo: 23, reaction: "Os cantores vão à frente louvando — e o inimigo se destrói. 🎶" },
      { upTo: 99, reaction: "Judá recolhe o despojo por três dias. 🎁" },
    ],
  },
  21: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, actors: [F(0.4, "king", "stand", "gold")] }),
      kf(4, { terrain: "city", night: 0.5, actors: [F(0.4, "king", "fight", "purple", { facing: 1 }), F(0.62, "man", "lie", "brown")] }),
      kf(18, { terrain: "city", night: 0.6, actors: [F(0.45, "king", "mourn", "purple")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Jeorão sobe ao trono de Judá. 👑" },
      { upTo: 11, reaction: "Ele mata os irmãos e anda no mal de Acabe. 😔" },
      { upTo: 99, reaction: "Uma doença o consome; morre sem ser lamentado. 🌙" },
    ],
  },
  22: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.2, actors: [F(0.4, "king", "stand", "gold"), F(0.62, "woman", "stand", "red")] }),
      kf(7, { terrain: "plain", night: 0.4, actors: [F(0.4, "king", "mourn", "purple")] }),
      kf(10, { terrain: "city", night: 0.6, actors: [F(0.4, "woman", "raise", "red")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Acazias reina mal, guiado por sua mãe. 😔" },
      { upTo: 9, reaction: "Ele morre na revolta de Jeú. ⚔️" },
      { upTo: 99, reaction: "Atalia usurpa o trono e mata a descendência real. 🩸" },
    ],
  },
  23: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.4, actors: [F(0.4, "man", "raise", "white"), F(0.62, "warrior", "stand", "red")] }),
      kf(11, { terrain: "city", crowd: 0.7, glory: 0.4, actors: [F(0.4, "man", "raise", "white"), F(0.58, "child", "stand", "gold")] }),
      kf(15, { terrain: "city", crowd: 0.6, actors: [F(0.4, "woman", "mourn", "red"), F(0.66, "warrior", "fight", "red", { facing: -1 })] }),
    ],
    beats: [
      { upTo: 10, reaction: "O sacerdote Joiada reúne os fiéis em segredo. 🤫" },
      { upTo: 13, reaction: "O menino Joás é coroado: 'Viva o rei!' 👑" },
      { upTo: 99, reaction: "Atalia é morta e a aliança é restaurada. ✊" },
    ],
  },
  24: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.3, actors: [F(0.4, "king", "stand", "gold"), F(0.62, "man", "raise", "white")] }),
      kf(8, { terrain: "city", crowd: 0.5, props: [P("basket", 0.5), P("tower", 0.75, 1.2)], actors: [F(0.35, "man", "carry", "sand")] }),
      kf(20, { terrain: "city", night: 0.4, props: [P("altar", 0.6, 1.1, 0.3)], actors: [F(0.4, "man", "raise", "white"), F(0.66, "king", "stand", "gold")] }),
    ],
    beats: [
      { upTo: 7, reaction: "Joás decide restaurar a Casa do SENHOR. 🔨" },
      { upTo: 14, reaction: "O povo traz ofertas e o templo é reparado. 🏛️" },
      { upTo: 99, reaction: "Após Joiada, Joás se desvia e mata Zacarias. 😔" },
    ],
  },
  25: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "king", "stand", "gold")] }),
      kf(11, { terrain: "mountain", crowd: 0.5, actors: [F(0.3, "warrior", "fight", "purple", { facing: 1 }), F(0.7, "warrior", "mourn", "red")] }),
      kf(14, { terrain: "city", night: 0.3, props: [P("altar", 0.6, 1, 0.4)], actors: [F(0.4, "king", "bow", "gold")] }),
    ],
    beats: [
      { upTo: 10, reaction: "Amazias despede os mercenários de Israel. 🪙" },
      { upTo: 13, reaction: "Ele vence os edomitas em Seir. ⚔️" },
      { upTo: 99, reaction: "Mas adora os deuses de Edom e cai em ruína. 😔" },
    ],
  },
  26: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.3, actors: [F(0.4, "king", "stand", "gold")] }),
      kf(9, { terrain: "hills", props: [P("tower", 0.3, 1.2), P("tower", 0.72, 1.1), P("well", 0.55)], actors: [F(0.4, "man", "carry", "brown"), AN(0.7, "ox", 0.9)] }),
      kf(16, { terrain: "city", night: 0.3, glory: 0.4, props: [P("altar", 0.5, 1.1, 0.6), P("smoke", 0.5, 1.4)], actors: [F(0.42, "king", "raise", "gold")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Uzias busca a Deus e prospera muito. 👑" },
      { upTo: 15, reaction: "Ele fortifica torres e engenhos de guerra. 🏰" },
      { upTo: 99, reaction: "Soberbo, queima incenso e é ferido de lepra. 🤒" },
    ],
  },
  27: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.3, props: [P("tower", 0.72, 1.2)], actors: [F(0.4, "king", "stand", "gold")] }),
      kf(5, { terrain: "hills", crowd: 0.4, actors: [F(0.4, "warrior", "stand", "purple"), F(0.66, "man", "carry", "brown")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Jotão edifica cidades e a porta alta do templo. 🏛️" },
      { upTo: 99, reaction: "Ele prospera porque firma o caminho diante de Deus. 👑" },
    ],
  },
  28: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, props: [P("altar", 0.5, 1, 0.7), P("smoke", 0.5, 1.4)], actors: [F(0.4, "king", "raise", "gold")] }),
      kf(5, { terrain: "plain", storm: 0.5, crowd: 0.6, actors: [F(0.3, "warrior", "fight", "red", { facing: 1 }), F(0.7, "man", "mourn", "purple")] }),
      kf(22, { terrain: "city", night: 0.5, actors: [F(0.42, "king", "bow", "gold")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Acaz anda no mal e queima incenso aos ídolos. 😔" },
      { upTo: 15, reaction: "Síria e Israel o ferem duramente. ⚔️" },
      { upTo: 99, reaction: "Na aflição, ele peca ainda mais contra o SENHOR. 🌙" },
    ],
  },
  29: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.3, actors: [F(0.4, "king", "stand", "gold")] }),
      kf(5, { terrain: "city", crowd: 0.4, actors: [F(0.35, "man", "carry", "white"), F(0.6, "man", "carry", "sand")] }),
      kf(20, { terrain: "city", crowd: 0.6, glory: 0.5, props: [P("altar", 0.5, 1.2, 1), P("smoke", 0.5, 1.4)], actors: [F(0.4, "king", "raise", "gold")] }),
    ],
    beats: [
      { upTo: 11, reaction: "Ezequias abre as portas do templo e chama os levitas. 🔑" },
      { upTo: 19, reaction: "Eles purificam a Casa do SENHOR. ✨" },
      { upTo: 99, reaction: "Voltam os holocaustos com cânticos e trombetas! 🎺🔥" },
    ],
  },
  30: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, actors: [F(0.4, "king", "raise", "gold"), F(0.62, "servant", "walk", "sand")] }),
      kf(13, { terrain: "city", crowd: 0.8, props: [P("altar", 0.5, 1.2, 0.8)], actors: [F(0.35, "man", "raise", "white"), AN(0.7, "sheep")] }),
      kf(26, { terrain: "city", crowd: 0.8, glory: 0.4, actors: [F(0.4, "king", "raise", "gold")] }),
    ],
    beats: [
      { upTo: 12, reaction: "Ezequias convida todo Israel à Páscoa. 📜" },
      { upTo: 25, reaction: "Grande multidão se reúne em Jerusalém. 🐑" },
      { upTo: 99, reaction: "Alegria como não havia desde os dias de Salomão! 🎉" },
    ],
  },
  31: {
    keyframes: [
      kf(1, { terrain: "hills", crowd: 0.5, actors: [F(0.3, "man", "raise", "brown"), F(0.6, "man", "fight", "sand", { facing: 1 })] }),
      kf(5, { terrain: "city", props: [P("basket", 0.35), P("basket", 0.5), P("basket", 0.65)], actors: [F(0.4, "man", "carry", "sand")] }),
      kf(20, { terrain: "city", glory: 0.3, actors: [F(0.4, "king", "stand", "gold")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Israel derruba os altares dos ídolos. 🔨" },
      { upTo: 19, reaction: "O povo traz dízimos até formar montões. 🌾" },
      { upTo: 99, reaction: "Ezequias faz o que é reto e prospera. 👑" },
    ],
  },
  32: {
    keyframes: [
      kf(1, { terrain: "hills", crowd: 0.6, props: [P("tower", 0.3, 1.2), P("tower", 0.72, 1.1)], actors: [F(0.3, "king", "raise", "gold"), F(0.7, "warrior", "stand", "red", { facing: -1 })] }),
      kf(9, { terrain: "city", crowd: 0.5, actors: [F(0.3, "warrior", "raise", "red", { facing: -1 }), F(0.66, "king", "stand", "gold")] }),
      kf(20, { terrain: "city", glory: 0.5, actors: [F(0.4, "king", "kneel", "gold"), F(0.62, "man", "raise", "white")] }),
      kf(21, { terrain: "plain", night: 0.5, glory: 0.6, actors: [F(0.5, "angel", "raise", "white")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Senaqueribe da Assíria invade Judá. ⚔️" },
      { upTo: 19, reaction: "Ele blasfema contra o Deus de Israel. 😠" },
      { upTo: 20, god: undefined, reaction: "Ezequias e Isaías clamam ao céu. 🙏" },
      { upTo: 99, reaction: "O anjo do SENHOR fere o exército assírio. 👼⚔️" },
    ],
  },
  33: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.4, props: [P("altar", 0.5, 1, 0.6), P("smoke", 0.5, 1.4)], actors: [F(0.4, "king", "raise", "gold")] }),
      kf(11, { terrain: "plain", night: 0.6, actors: [F(0.3, "warrior", "fight", "red", { facing: 1 }), F(0.66, "king", "mourn", "purple")] }),
      kf(13, { terrain: "city", glory: 0.4, actors: [F(0.42, "king", "kneel", "gold")] }),
    ],
    beats: [
      { upTo: 10, reaction: "Manassés enche Jerusalém de idolatria. 😔" },
      { upTo: 12, reaction: "Preso na Babilônia, ele se humilha e ora. ⛓️" },
      { upTo: 99, god: undefined, reaction: "Deus o restaura ao reino — só ele é Deus! 🤍" },
    ],
  },
  34: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.3, actors: [F(0.4, "king", "stand", "gold")] }),
      kf(4, { terrain: "hills", crowd: 0.4, props: [P("altar", 0.55, 1, 0.5)], actors: [F(0.3, "king", "fight", "purple", { facing: 1 })] }),
      kf(14, { terrain: "city", glory: 0.4, props: [P("tablets", 0.5, 1.1)], actors: [F(0.4, "man", "raise", "white"), F(0.62, "king", "stand", "gold")] }),
      kf(19, { terrain: "city", crowd: 0.5, actors: [F(0.42, "king", "mourn", "gold")] }),
    ],
    beats: [
      { upTo: 7, reaction: "Josias, ainda jovem, purga Judá dos ídolos. 🔨" },
      { upTo: 13, reaction: "Ele manda reparar a Casa do SENHOR. 🏛️" },
      { upTo: 18, reaction: "Acham o Livro da Lei no templo! 📜" },
      { upTo: 99, reaction: "Josias rasga as vestes e renova a aliança. 💧" },
    ],
  },
  35: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.7, props: [P("altar", 0.5, 1.2, 0.8)], actors: [F(0.35, "king", "raise", "gold"), AN(0.7, "sheep")] }),
      kf(10, { terrain: "city", crowd: 0.8, glory: 0.3, actors: [F(0.3, "man", "raise", "white"), F(0.55, "man", "carry", "sand")] }),
      kf(20, { terrain: "plain", storm: 0.5, crowd: 0.5, actors: [F(0.3, "king", "fight", "purple", { facing: 1 }), F(0.7, "warrior", "fight", "red", { facing: -1 })] }),
      kf(24, { terrain: "city", night: 0.5, actors: [F(0.45, "king", "lie", "purple"), F(0.62, "man", "mourn", "sand")] }),
    ],
    beats: [
      { upTo: 9, reaction: "Josias celebra a maior Páscoa desde Samuel. 🐑" },
      { upTo: 19, reaction: "Levitas e cantores servem em ordem. 🎶" },
      { upTo: 23, reaction: "Ele sai contra Neco e é ferido em Megido. 🏹" },
      { upTo: 99, reaction: "Todo Judá pranteia o bom rei Josias. 😢" },
    ],
  },
  36: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, actors: [F(0.4, "king", "stand", "gold"), F(0.62, "warrior", "stand", "red")] }),
      kf(11, { terrain: "city", night: 0.5, crowd: 0.4, actors: [F(0.4, "king", "raise", "gold"), F(0.66, "man", "mourn", "white")] }),
      kf(17, { terrain: "city", fire: 0.9, night: 0.6, smoke: 0.6, crowd: 0.6, props: [P("tower", 0.5, 1.3), P("smoke", 0.5, 2.2)], actors: [F(0.3, "warrior", "fight", "red", { facing: 1 }), F(0.66, "man", "mourn", "brown")] }),
      kf(20, { terrain: "plain", night: 0.5, crowd: 0.7, actors: [F(0.3, "man", "walk", "brown"), F(0.5, "woman", "mourn", "blue"), F(0.7, "child", "walk", "sand")] }),
      kf(22, { terrain: "city", glory: 0.7, actors: [F(0.4, "king", "raise", "purple")] }),
    ],
    beats: [
      { upTo: 10, reaction: "Os últimos reis de Judá fazem o mal. 😔" },
      { upTo: 16, reaction: "O povo zomba dos profetas de Deus. 😠" },
      { upTo: 19, reaction: "Nabucodonosor queima o templo e derruba Jerusalém. 🔥" },
      { upTo: 21, reaction: "Os sobreviventes vão cativos à Babilônia. ⛓️😢" },
      { upTo: 99, god: "O SENHOR moveu o espírito de Ciro para reconstruir a sua Casa.", reaction: "O decreto de Ciro: 'Suba o povo!' ✨" },
    ],
  },
};
