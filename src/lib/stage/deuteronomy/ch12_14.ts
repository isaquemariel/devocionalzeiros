// ============================================================================
// DEUTERONÔMIO 12–14 — CENA VIVA. A adoração pura na Terra Prometida.
//
// Nas CAMPINAS DE MOABE, além do Jordão, MOISÉS prega a Lei da adoração:
//
// Dt 12 — UM SÓ ALTAR: destruir TODOS os altares, estátuas e imagens das
// nações (ídolos quebrados, o bezerro derrubado, o fogo nos bosques) e buscar
// o ÚNICO LUGAR que o Senhor escolher para pôr o seu Nome — ali os holocaustos,
// os dízimos, os votos (o santuário central: altar + tenda). Podem comer carne
// nas suas portas, MAS NÃO O SANGUE — "pois o sangue é vida" (12:23): derramá-lo
// na terra como água.
//
// Dt 13 — O FALSO PROFETA: o profeta ou sonhador que dá um sinal e chama a
// seguir outros deuses — ainda que o sinal se cumpra, é PROVA do Senhor: não
// ouvir. A cidade apóstata (filhos de Belial) posta debaixo de anátema. Clima
// sóbrio, glória média-baixa, vigilância.
//
// Dt 14 — FILHOS DO SENHOR: povo santo (nada de incisões pelos mortos); os
// animais LIMPOS e IMUNDOS (rumina + casco fendido; barbatana + escama; as
// aves); e o DÍZIMO comido perante o Senhor, e de três em três anos guardado
// nas portas para o levita, o estrangeiro, o órfão e a viúva.
//
// A VOZ (regra do projeto): quem prega é MOISÉS, mediador visível → `by:
// "moises"` com `q` na frase-chave. Sem voz do céu aqui.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const mv = (v: number, q?: string) => b(v, { by: "moises", ...(q ? { q } : {}) }); // Moisés prega

// Cena-base: campinas de Moabe, o Jordão ao fundo, as tendas do arraial.
const MOABE: StagePropSpec[] = [
  P("river", 0, 1.5, undefined, 0.14),
  P("tent", -250, 1.0, undefined, 0.24),
  P("tent", 250, 1.0, undefined, 0.26),
  P("palm", -320, 1.05, undefined, 0.16),
  P("grass", -70, 0.82, undefined, 0.82),
  P("grass", 70, 0.78, undefined, 0.74),
];

// O santuário central: o único lugar do Nome — altar diante da tenda (habitação).
const SANTUARIO: StagePropSpec[] = [
  { ...P("tent", 30, 1.5, undefined, 0.12), tag: "santuario-do-nome" },
  P("altar", -110, 1.15, undefined, 0.5),
  P("river", 0, 1.4, undefined, 0.1),
  P("palm", 300, 1.0, undefined, 0.18),
  P("grass", -60, 0.8, undefined, 0.8),
];

// Os altares e ídolos das nações — a serem destruídos.
const IDOLATRIA: StagePropSpec[] = [
  { ...P("altar", -150, 1.2, undefined, 0.5), tag: "altar-das-nacoes" },
  P("calf", 120, 1.25, undefined, 0.52),
  P("tower", 260, 1.0, undefined, 0.2),
  P("tree", -300, 1.1, undefined, 0.2),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ================================================================= Dt 12
  12: {
    start: { terrain: "field", night: 0.1, glory: 0.58, storm: 0, fire: 0, verdure: 0.4 },
    beats: [
      b(1, { by: "moises", q: "os estatutos e os juízos", props: MOABE, cast: [ // Moisés abre: os estatutos e os juízos
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.44 }),
      ] }),
      // v.2-3 — DESTRUIR os altares e ídolos das nações.
      b(2, { by: "moises", q: "Totalmente destruireis todos os lugares", props: IDOLATRIA, env: { glory: 0.32, night: 0.2, fire: 0.15 }, cast: [ // altares nas altas montanhas
        C("moises", -260, "point", { dy: 0.5, facing: 1 }),
      ] }),
      b(3, { by: "moises", q: "derrubareis os seus altares, e quebrareis as suas estátuas", env: { fire: 0.4, storm: 0.1 }, props: [ // derrubar, quebrar, queimar
        { ...P("altar", -150, 1.15, 0.5, 0.5), tag: "altar-derrubado" },
        P("calf", 120, 0.85, undefined, 0.54),
        P("campfire", -120, 1.2, 1, 0.55),
        P("tree", -300, 1.1, undefined, 0.2),
        P("campfire", -290, 0.95, 1, 0.38),
      ], cast: [ C("moises", -260, "raise", { dy: 0.5, facing: 1 }) ] }),
      mv(4, "Assim não fareis ao Senhor vosso Deus"),
      // v.5-7 — O ÚNICO LUGAR do Nome: o santuário central.
      b(5, { by: "moises", q: "para ali pôr o seu nome", props: SANTUARIO, env: { glory: 0.7, night: 0.1, fire: 0, storm: 0 }, cast: [ // o lugar que o Senhor escolher
        C("moises", -240, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 200, "stand", { dy: 0.42 }),
      ] }),
      b(6, { by: "moises", q: "os vossos holocaustos, e os vossos sacrifícios", env: { glory: 0.74, fire: 0.2 }, cast: [ // trareis holocaustos, dízimos, votos
        C("moises", -240, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      b(7, { by: "moises", q: "vos alegrareis", env: { glory: 0.8, verdure: 0.5 }, cast: [ // comereis e vos alegrareis perante o Senhor
        C("moises", -240, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 180, "stand", { dy: 0.44 }),
      ] }),
      // v.8-12 — só no lugar escolhido, depois do descanso além do Jordão.
      b(8, { by: "moises", q: "cada qual tudo o que bem parece aos seus olhos", props: MOABE, env: { glory: 0.58, verdure: 0.4 }, cast: [
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
      ] }),
      mv(9, "no descanso e na herança"),
      b(10, { by: "moises", q: "passareis o Jordão", env: { verdure: 0.5 }, props: [ // passareis o Jordão e morareis seguros
        P("river", 0, 1.7, undefined, 0.16), P("palm", -320, 1.05, undefined, 0.16),
        P("tent", 250, 1.0, undefined, 0.26), P("grass", -70, 0.82, undefined, 0.82),
      ], cast: [ C("moises", -150, "point", { dy: 0.5, facing: 1 }) ] }),
      b(11, { by: "moises", q: "para ali fazer habitar o seu nome", props: SANTUARIO, env: { glory: 0.72 }, cast: [
        C("moises", -240, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      b(12, { by: "moises", q: "e o levita que está dentro das vossas portas", env: { glory: 0.76 }, cast: [ // alegrai-vos, com o levita
        C("moises", -240, "raise", { dy: 0.5, facing: 1 }),
        C("servo", -40, "stand", { dy: 0.5, facing: -1, id: "levita" }),
        C("multidao", 180, "stand", { dy: 0.42 }),
      ] }),
      // v.13-19 — só ali os holocaustos; carne nas portas, mas não o sangue.
      b(13, { by: "moises", q: "não ofereças os teus holocaustos em todo o lugar", props: MOABE, env: { glory: 0.58 }, cast: [
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
      ] }),
      mv(14, "no lugar que o Senhor escolher"),
      b(15, { by: "moises", q: "matarás e comerás carne, dentro das tuas portas", props: [ // comer carne nas portas
        ...MOABE, P("stall", 190, 1.0, undefined, 0.5),
      ], cast: [ C("moises", -150, "stand", { dy: 0.5, facing: 1 }) ] }),
      b(16, { by: "moises", q: "o sangue não comereis", env: { glory: 0.5 }, cast: [ // o sangue derramado na terra
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      mv(17, "não poderás comer o dízimo"),
      b(18, { by: "moises", q: "Mas os comerás perante o Senhor teu Deus", props: SANTUARIO, env: { glory: 0.7 }, cast: [
        C("moises", -240, "raise", { dy: 0.5, facing: 1 }),
        C("servo", -40, "stand", { dy: 0.5, facing: -1, id: "levita" }),
      ] }),
      mv(19, "não desampares ao levita"),
      // v.20-28 — o sangue É VIDA.
      b(20, { by: "moises", q: "Comerei carne", props: MOABE, env: { glory: 0.58 }, cast: [
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(21, { by: "moises", q: "matarás das tuas vacas e das tuas ovelhas", props: [ // do teu gado nas portas
        ...MOABE, P("stall", 190, 1.0, undefined, 0.5),
      ], cast: [
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
        C("rebanho", 120, "stand", { dy: 0.5 }),
      ] }),
      mv(22, "como se come o corço e o veado"),
      b(23, { by: "moises", q: "o sangue é vida", env: { glory: 0.5, night: 0.14 }, cast: [ // "o SANGUE É VIDA"
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      mv(24, "na terra o derramarás como água"),
      mv(25, "o que for reto aos olhos do Senhor"),
      b(26, { by: "moises", q: "virás ao lugar que o Senhor escolher", props: SANTUARIO, env: { glory: 0.7 }, cast: [ // as coisas santas ao lugar
        C("moises", -240, "point", { dy: 0.5, facing: 1 }),
      ] }),
      b(27, { by: "moises", q: "sobre o altar do Senhor teu Deus", env: { glory: 0.74, fire: 0.3 }, props: [ // holocaustos sobre o altar
        { ...P("tent", 30, 1.5, undefined, 0.12), tag: "santuario-do-nome" },
        { ...P("altar", -110, 1.2, 0.5, 0.5), tag: "altar-do-nome" },
        P("river", 0, 1.4, undefined, 0.1), P("palm", 300, 1.0, undefined, 0.18),
      ], cast: [ C("moises", -240, "kneel", { dy: 0.5, facing: 1 }) ] }),
      b(28, { by: "moises", q: "Guarda e ouve todas estas palavras", env: { glory: 0.72, fire: 0 }, cast: [
        C("moises", -240, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 180, "stand", { dy: 0.42 }),
      ] }),
      // v.29-32 — não imitar os deuses das nações desarraigadas.
      b(29, { by: "moises", q: "desarraigar de diante de ti as nações", props: MOABE, env: { glory: 0.55 }, cast: [
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
      ] }),
      b(30, { by: "moises", q: "não te enlaces seguindo-as", props: [ ...MOABE, P("calf", 240, 1.1, undefined, 0.5) ], env: { glory: 0.4, night: 0.18 }, cast: [ // o laço dos ídolos
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      b(31, { by: "moises", q: "Assim não farás ao Senhor teu Deus", props: [ ...MOABE, P("calf", 240, 1.1, undefined, 0.5), P("altar", 150, 1.0, 0.5, 0.52) ], env: { glory: 0.3, night: 0.24, fire: 0.3 }, cast: [ // abominação: queimaram filhos no fogo
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
      ] }),
      b(32, { by: "moises", q: "nada lhe acrescentarás nem diminuirás", props: [ ...MOABE, P("scroll", 140, 1.1, undefined, 0.5) ], env: { glory: 0.6, night: 0.1, fire: 0 }, cast: [ // a Lei: nada acrescentar nem diminuir
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
      ] }),
    ],
  },

  // ================================================================= Dt 13
  13: {
    start: { terrain: "field", night: 0.24, glory: 0.34, storm: 0.05, fire: 0, verdure: 0.32 },
    beats: [
      // v.1-5 — O FALSO PROFETA que dá sinal e chama a outros deuses.
      b(1, { by: "moises", q: "profeta ou sonhador de sonhos se levantar", props: MOABE, cast: [ // o falso profeta se levanta
        C("moises", -180, "point", { dy: 0.5, facing: 1 }),
        C("homem", 40, "raise", { dy: 0.5, facing: -1, id: "falsoProfeta" }),
        C("multidao", 200, "stand", { dy: 0.42 }),
      ] }),
      b(2, { by: "moises", q: "Vamos após outros deuses", props: [ ...MOABE, P("calf", 120, 1.2, undefined, 0.52) ], env: { glory: 0.28, night: 0.28 }, cast: [ // "vamos após outros deuses"
        C("homem", 40, "point", { dy: 0.5, facing: -1, id: "falsoProfeta" }),
        C("moises", -180, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(3, { by: "moises", q: "o Senhor vosso Deus vos prova", env: { glory: 0.4 }, cast: [ // é PROVA do Senhor: não ouvir
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 160, "stand", { dy: 0.44 }),
      ] }),
      mv(4, "Após o Senhor vosso Deus andareis"),
      b(5, { by: "moises", q: "aquele profeta ou sonhador de sonhos morrerá", env: { glory: 0.26, night: 0.3 }, props: MOABE, cast: [ // o falso profeta morrerá
        C("moises", -180, "point", { dy: 0.5, facing: 1 }),
        C("homem", 60, "lie", { dy: 0.52, id: "falsoProfeta" }),
      ] }),
      // v.6-11 — nem o parente mais próximo que incita em segredo.
      b(6, { by: "moises", q: "dizendo-te em segredo", env: { glory: 0.34, night: 0.24 }, props: MOABE, cast: [ // o irmão, o filho, a mulher do seio
        C("moises", -180, "point", { dy: 0.5, facing: 1 }),
        C("homem", 30, "stand", { dy: 0.5, facing: -1, id: "incitador" }),
        C("mulherComum", 130, "stand", { dy: 0.46, facing: -1 }),
      ] }),
      mv(7, "os deuses dos povos"),
      mv(8, "Não consentirás com ele"),
      mv(9, "certamente o matarás"),
      b(10, { by: "moises", q: "E o apedrejarás", env: { glory: 0.26, night: 0.3 }, props: [ ...MOABE, P("rock", 90, 0.9, undefined, 0.55), P("rock", 150, 0.7, undefined, 0.5) ], cast: [ // o apedrejamento
        C("moises", -180, "raise", { dy: 0.5, facing: 1 }),
        C("homem", 60, "lie", { dy: 0.54, id: "incitador" }),
      ] }),
      mv(11, "todo o Israel o ouça e o tema"),
      // v.12-18 — a CIDADE APÓSTATA sob anátema.
      b(12, { by: "moises", q: "de alguma das tuas cidades", props: [ ...MOABE, P("tower", 220, 1.1, undefined, 0.24) ], env: { glory: 0.32 }, cast: [ // uma cidade tua
        C("moises", -180, "point", { dy: 0.5, facing: 1 }),
      ] }),
      b(13, { by: "moises", q: "filhos de Belial", props: [ ...MOABE, P("tower", 220, 1.1, undefined, 0.24), P("calf", 130, 1.1, undefined, 0.5) ], env: { glory: 0.26, night: 0.28 }, cast: [ // filhos de Belial incitam a cidade
        C("moises", -180, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      mv(14, "inquirirás e investigarás"),
      b(15, { by: "moises", q: "ao fio da espada", env: { glory: 0.22, night: 0.32, storm: 0.1 }, props: [ ...MOABE, P("tower", 220, 1.1, undefined, 0.24) ], cast: [ // ferir os moradores
        C("moises", -180, "point", { dy: 0.5, facing: 1 }),
        C("homem", 90, "lie", { dy: 0.54, id: "moradorA" }),
        C("mulherComum", 150, "lie", { dy: 0.5, id: "moradorB" }),
      ] }),
      b(16, { by: "moises", q: "queimarás totalmente para o Senhor teu Deus", env: { glory: 0.2, fire: 0.5, storm: 0.15 }, props: [ // a cidade queimada: montão perpétuo
        ...MOABE, { ...P("tower", 220, 1.1, 0.7, 0.24), tag: "cidade-anatema" },
        P("campfire", 200, 1.2, 1, 0.42),
      ], cast: [ C("moises", -180, "raise", { dy: 0.5, facing: 1 }) ] }),
      b(17, { by: "moises", q: "para que o Senhor se aparte do ardor da sua ira", env: { glory: 0.42, night: 0.2, fire: 0.1, storm: 0 }, props: MOABE, cast: [ // misericórdia: nada do anátema
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      b(18, { by: "moises", q: "Quando ouvires a voz do Senhor teu Deus", env: { glory: 0.5, night: 0.14, fire: 0 }, cast: [ // ouvir a voz do Senhor
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 160, "stand", { dy: 0.44 }),
      ] }),
    ],
  },

  // ================================================================= Dt 14
  14: {
    start: { terrain: "field", night: 0.1, glory: 0.58, storm: 0, fire: 0, verdure: 0.42 },
    beats: [
      // v.1-2 — FILHOS do Senhor, povo santo.
      b(1, { by: "moises", q: "Filhos sois do SENHOR vosso Deus", props: MOABE, env: { glory: 0.64 }, cast: [ // filhos do Senhor: nada de incisões
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 160, "stand", { dy: 0.44 }),
      ] }),
      b(2, { by: "moises", q: "és povo santo ao Senhor teu Deus", env: { glory: 0.74 }, cast: [ // povo santo, escolhido
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 160, "stand", { dy: 0.44 }),
      ] }),
      // v.3-8 — os animais LIMPOS e IMUNDOS.
      b(3, { by: "moises", q: "Nenhuma coisa abominável comereis", env: { glory: 0.6 }, cast: [
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
      ] }),
      b(4, { by: "moises", q: "o boi, a ovelha, e a cabra", props: [ // os limpos: boi, ovelha, cabra
        ...MOABE, P("stall", 180, 1.05, undefined, 0.5),
      ], cast: [
        C("moises", -180, "point", { dy: 0.5, facing: 1 }),
        C("rebanho", 110, "stand", { dy: 0.5 }),
      ] }),
      b(5, { by: "moises", q: "O veado e a corça", cast: [ // veado, corça, gamo — do campo
        C("moises", -180, "stand", { dy: 0.5, facing: 1 }),
        C("rebanho", 110, "stand", { dy: 0.5, id: "caca" }),
      ] }),
      mv(6, "que rumina, entre os animais"),
      b(7, { by: "moises", q: "imundos vos serão", env: { glory: 0.48 }, cast: [ // camelo, lebre, coelho: imundos
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
      ] }),
      b(8, { by: "moises", q: "Nem o porco", props: [ ...MOABE, P("stall", 200, 1.0, undefined, 0.52) ], env: { glory: 0.46 }, cast: [ // o porco: imundo
        C("moises", -180, "point", { dy: 0.5, facing: 1 }),
      ] }),
      // v.9-10 — dos que há nas águas: barbatana e escama.
      b(9, { by: "moises", q: "tudo o que tem barbatanas e escamas", props: [ ...MOABE ], env: { glory: 0.58 }, cast: [ // dos peixes: barbatana e escama
        C("moises", -180, "point", { dy: 0.5, facing: 1 }),
      ] }),
      mv(10, "imundo vos será"),
      // v.11-20 — as AVES limpas e imundas.
      b(11, { by: "moises", q: "Toda a ave limpa comereis", props: [ // as aves limpas no céu
        ...MOABE, { ...P("birds", 60, 1.0, undefined, 0.7), sky: true }, { ...P("birds", -120, 0.9, undefined, 0.78), sky: true },
      ], env: { glory: 0.62 }, cast: [ C("moises", -180, "raise", { dy: 0.5, facing: 1 }) ] }),
      b(12, { by: "moises", q: "a águia, e o quebrantosso", env: { glory: 0.5 }, cast: [ // as impuras: águia, quebrantosso
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
      ] }),
      mv(13, "o abutre, e o falcão"),
      mv(14, "todo o corvo"),
      mv(15, "o avestruz, e o mocho"),
      mv(16, "o bufo, e a coruja"),
      mv(17, "o cisne, e o pelicano"),
      mv(18, "a cegonha, e a garça"),
      b(19, { by: "moises", q: "todo o inseto que voa", props: [ ...MOABE, P("locusts", 0, 1.0, undefined, 0.4) ], env: { glory: 0.46 }, cast: [ // os insetos que voam: imundos
        C("moises", -180, "point", { dy: 0.5, facing: 1 }),
      ] }),
      b(20, { by: "moises", q: "Toda a ave limpa comereis", props: [ // volta às aves limpas
        ...MOABE, { ...P("birds", 60, 1.0, undefined, 0.72), sky: true },
      ], env: { glory: 0.6 }, cast: [ C("moises", -180, "raise", { dy: 0.5, facing: 1 }) ] }),
      b(21, { by: "moises", q: "Não cozerás o cabrito com leite da sua mãe", env: { glory: 0.58 }, cast: [ // povo santo: ao estrangeiro o morto
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      // v.22-27 — o DÍZIMO comido perante o Senhor.
      b(22, { by: "moises", q: "os dízimos de todo o fruto da tua semente", props: [ // o dízimo da colheita
        ...MOABE, P("sheaf", 160, 1.0, undefined, 0.5), P("grapes", 220, 0.95, undefined, 0.52),
      ], env: { glory: 0.62, verdure: 0.55 }, cast: [ C("moises", -180, "point", { dy: 0.5, facing: 1 }) ] }),
      b(23, { by: "moises", q: "comerás os dízimos do teu grão", props: SANTUARIO, env: { glory: 0.72 }, cast: [ // comer o dízimo perante o Senhor
        C("moises", -240, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 200, "stand", { dy: 0.42 }),
      ] }),
      b(24, { by: "moises", q: "por estar longe de ti o lugar", props: [ ...MOABE ], env: { glory: 0.58 }, cast: [ // quando o caminho for comprido
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
      ] }),
      mv(25, "ata o dinheiro na tua mão"),
      b(26, { by: "moises", q: "come-o ali perante o Senhor teu Deus, e alegra-te", props: SANTUARIO, env: { glory: 0.8, verdure: 0.55 }, cast: [ // alegrar-se com a casa perante o Senhor
        C("moises", -240, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 200, "stand", { dy: 0.42 }),
      ] }),
      b(27, { by: "moises", q: "não desampararás o levita", env: { glory: 0.72 }, cast: [ // não desamparar o levita
        C("moises", -240, "point", { dy: 0.5, facing: 1 }),
        C("servo", -40, "stand", { dy: 0.5, facing: -1, id: "levita" }),
      ] }),
      // v.28-29 — o dízimo de três em três anos: o levita, o estrangeiro, o órfão e a viúva.
      b(28, { by: "moises", q: "Ao fim de três anos", props: [ // o dízimo guardado nas portas
        ...MOABE, P("crate", 150, 1.0, undefined, 0.5), P("sheaf", 210, 0.95, undefined, 0.52),
      ], env: { glory: 0.6 }, cast: [ C("moises", -180, "point", { dy: 0.5, facing: 1 }) ] }),
      b(29, { by: "moises", q: "o estrangeiro, e o órfão, e a viúva", env: { glory: 0.76, verdure: 0.5 }, props: [ // todos comem e se fartam: a bênção
        ...MOABE, P("crate", 200, 1.0, undefined, 0.5),
      ], cast: [
        C("moises", -240, "raise", { dy: 0.5, facing: 1 }),
        C("servo", -60, "stand", { dy: 0.5, facing: -1, id: "levita" }),
        C("homem", 60, "stand", { dy: 0.5, facing: -1, id: "estrangeiro" }),
        C("mulherComum", 150, "stand", { dy: 0.46, facing: -1, id: "viuva" }),
      ] }),
    ],
  },
};
