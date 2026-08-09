// ============================================================================
// DEUTERONÔMIO 6–7 — CENA VIVA. O SHEMÁ e o POVO SANTO.
//
// Dt 6 — O CORAÇÃO DO LIVRO. "Ouve, Israel: o Senhor nosso Deus é o único
// Senhor" (6:4); "Amarás o Senhor teu Deus de todo o teu coração, e de toda a
// tua alma, e de todas as tuas forças" (6:5). Moisés manda ENSINAR aos FILHOS
// (6:7), atar por SINAL na mão e FRONTAIS entre os olhos (6:8), escrever nos
// UMBRAIS e nas PORTAS — a mezuzá (6:9). A transmissão às gerações: "quando teu
// filho te perguntar…" (6:20), o flashback do Egito (6:21-23).
//
// Dt 7 — ISRAEL, POVO SANTO E ESCOLHIDO. Expulsar as SETE nações, sem aliança
// nem casamento; DESTRUIR altares e ídolos (7:5,25). "Porque povo santo és ao
// Senhor teu Deus" (7:6). O Senhor os amou e os resgatou com mão forte (7:8);
// bênção sobre o fruto da terra e do ventre a quem guardar a aliança (7:13).
//
// A VOZ é de MOISÉS (mediador visível pregando nas campinas de Moabe): usa-se
// `by: "moises"` com `q` nas frases-chave. Cena-base: `field`, verdure alto,
// Jordão ao fundo, o monte de Moabe, as tendas do arraial.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const mv = (v: number, q?: string) => b(v, { by: "moises", ...(q ? { q } : {}) }); // Moisés prega

// Campinas de Moabe: o Jordão ao fundo, o monte de Moabe, as tendas do arraial.
const MOABE: StagePropSpec[] = [
  P("river", 300, 1.25, undefined, 0.2),
  P("rock", 320, 1.1, undefined, 0.12),
  P("tent", -285, 1.0, undefined, 0.2),
  P("tent", 250, 0.95, undefined, 0.24),
  P("palm", -320, 1.05, undefined, 0.14),
  P("grass", -70, 0.85, undefined, 0.82),
  P("grass", 70, 0.8, undefined, 0.74),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Dt 6
  6: {
    start: { terrain: "field", night: 0.1, glory: 0.62, storm: 0, fire: 0, verdure: 0.45 },
    beats: [
      b(1, { by: "moises", q: "os mandamentos, os estatutos e os juízos", props: MOABE, // os mandamentos que o Senhor mandou ensinar
        env: { terrain: "field", glory: 0.62, night: 0.1, verdure: 0.45 }, cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
      b(2, { by: "moises", q: "temas ao Senhor teu Deus", cast: [ // tu, teu filho e o filho de teu filho: as gerações
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("homem", 20, "stand", { dy: 0.52, facing: -1, id: "pai" }),
        C("homem", 90, "stand", { scale: 0.72, dy: 0.44, facing: -1, id: "filho" }),
        C("homem", 140, "stand", { scale: 0.55, dy: 0.38, facing: -1, id: "neto" }),
      ] }),
      mv(3, "terra que mana leite e mel"),                          // a terra que mana leite e mel
      // v.4-5 — O SHEMÁ. A proclamação. Moisés ergue a voz diante de todo o Israel.
      b(4, { by: "moises", q: "o Senhor nosso Deus é o único Senhor", env: { glory: 0.9 }, cast: [ // "OUVE, ISRAEL: o Senhor é o ÚNICO"
        C("moises", -120, "raise", { glow: 0.4, dy: 0.5, facing: 1 }),
        C("multidao", 120, "stand", { dy: 0.46 }),
        C("multidao", 210, "stand", { scale: 0.9, dy: 0.42, id: "povo2" }),
      ] }),
      b(5, { by: "moises", q: "de todo o teu coração", env: { glory: 0.85 }, cast: [ // "AMARÁS de todo o teu coração, alma e forças"
        C("moises", -120, "raise", { glow: 0.35, dy: 0.5, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.46 }),
      ] }),
      mv(6, "estarão no teu coração"),                              // estas palavras estarão no teu coração
      // v.7 — ENSINAR AOS FILHOS: o pai assentado, as crianças ao redor.
      b(7, { by: "moises", q: "as ensinarás a teus filhos", cast: [ // "as ENSINARÁS a teus filhos" — assentado, andando, deitando…
        C("homem", -70, "kneel", { dy: 0.5, facing: 1, id: "pai" }),
        C("homem", 30, "stand", { scale: 0.62, dy: 0.42, facing: -1, id: "crianca1" }),
        C("homem", 95, "stand", { scale: 0.55, dy: 0.38, facing: -1, id: "crianca2" }),
        C("moises", -190, "point", { dy: 0.5, facing: 1 }),
      ] }),
      b(8, { by: "moises", q: "por sinal na tua mão", cast: [       // por SINAL na mão, por FRONTAIS entre os olhos
        C("homem", -30, "raise", { dy: 0.52, facing: 1, id: "pai" }),
        C("moises", -180, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      // v.9 — A MEZUZÁ: escrever nos umbrais e nas portas da casa.
      b(9, { by: "moises", q: "nas tuas portas", cast: [           // "e nas tuas PORTAS" — a mezuzá no umbral
        C("homem", -40, "write", { dy: 0.52, facing: 1, id: "pai" }),
        C("moises", -190, "point", { dy: 0.5, facing: 1 }),
      ], props: [
        { ...P("door", 60, 1.2, undefined, 0.3), tag: "mezuza" },
        P("tent", -285, 1.0, undefined, 0.2),
        P("grass", 120, 0.8, undefined, 0.72),
      ] }),
      // v.10-11 — FLASHBACK da terra prometida: cidades que não edificaste, vinhas que não plantaste.
      b(10, { by: "moises", q: "grandes e boas cidades, que tu não edificaste", cast: [ // cidades que não edificaste
        C("moises", -170, "point", { dy: 0.5, facing: 1 }),
      ], props: [
        P("tower", 60, 1.2, undefined, 0.18),
        P("tower", 210, 1.0, undefined, 0.24),
        P("rock", -300, 1.0, undefined, 0.14),
      ] }),
      b(11, { by: "moises", q: "vinhas e olivais, que tu não plantaste", cast: [ // vinhas e olivais que não plantaste; comer e fartar
        C("moises", -170, "point", { dy: 0.5, facing: 1 }),
      ], props: [
        P("grapes", 70, 1.15, undefined, 0.5),
        P("tree", 200, 1.1, undefined, 0.2),
        P("well", -280, 1.0, undefined, 0.5),
      ] }),
      b(12, { by: "moises", q: "não te esqueças do Senhor", props: MOABE, // GUARDA-TE de esquecer quem te tirou do Egito
        env: { terrain: "field", glory: 0.6, night: 0.12, verdure: 0.45 }, cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
      mv(13, "a ele servirás"),                                    // o Senhor temerás e a ele servirás
      mv(14, "Não seguireis outros deuses"),                       // não seguireis os deuses dos povos ao redor
      mv(15, "é um Deus zeloso"),                                  // o Senhor é um Deus zeloso no meio de ti
      mv(16, "como o tentastes em Massá"),                         // não tentareis o Senhor, como em Massá
      mv(17, "guardareis os mandamentos do Senhor"),              // diligentemente guardareis os mandamentos
      mv(18, "o que é reto e bom"),                                // farás o que é reto e bom aos olhos do Senhor
      mv(19, "lance fora a todos os teus inimigos"),              // para que lance fora os teus inimigos
      // v.20-23 — "QUANDO TEU FILHO TE PERGUNTAR": a transmissão e o flashback do Egito.
      b(20, { by: "moises", q: "Quando teu filho te perguntar", cast: [ // o FILHO pergunta: que significam os testemunhos?
        C("homem", -60, "kneel", { dy: 0.5, facing: 1, id: "pai" }),
        C("homem", 30, "stand", { scale: 0.62, dy: 0.42, facing: -1, id: "filho" }),
        C("moises", -190, "point", { dy: 0.5, facing: 1 }),
      ] }),
      b(21, { by: "moises", q: "Éramos servos de Faraó no Egito", // FLASHBACK: éramos servos de Faraó; mão forte nos tirou
        env: { terrain: "desert", glory: 0.3, night: 0.35, verdure: 0.05 }, cast: [
        C("rei", 150, "stand", { dy: 0.5, facing: -1, id: "farao" }),
        C("servo", -120, "bow", { dy: 0.48, facing: 1, id: "israel1" }),
        C("servo", -40, "kneel", { dy: 0.46, facing: 1, id: "israel2" }),
      ], props: [
        P("tower", 240, 1.3, undefined, 0.2),
        P("ziggurat", 300, 1.1, undefined, 0.18),
      ] }),
      b(22, { by: "moises", q: "fez sinais e maravilhas", // os SINAIS E MARAVILHAS contra o Egito
        env: { terrain: "desert", glory: 0.2, night: 0.5, storm: 0.4, verdure: 0.05 }, cast: [
        C("rei", 150, "bow", { dy: 0.5, facing: -1, id: "farao" }),
      ], props: [
        P("locusts", -20, 1.2, undefined, 0.6),
        P("hail", 180, 1.0, undefined, 0.4),
        P("tower", 260, 1.3, undefined, 0.2),
      ] }),
      b(23, { by: "moises", q: "a terra que jurara a nossos pais", props: MOABE, // dali nos tirou para nos dar a terra
        env: { terrain: "field", glory: 0.65, night: 0.1, verdure: 0.5 }, cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "walk", { dy: 0.46 }),
      ] }),
      mv(24, "para o nosso perpétuo bem"),                         // o Senhor nos ordenou tudo, para o nosso bem
      b(25, { by: "moises", q: "E será para nós justiça", env: { glory: 0.78 }, cast: [ // e será para nós JUSTIÇA guardar tudo isto
        C("moises", -140, "raise", { glow: 0.3, dy: 0.5, facing: 1 }),
        C("multidao", 140, "stand", { dy: 0.46 }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Dt 7
  7: {
    start: { terrain: "field", night: 0.12, glory: 0.58, storm: 0, fire: 0, verdure: 0.45 },
    beats: [
      // v.1 — AS SETE NAÇÕES a serem lançadas fora: cidades muradas ao fundo.
      b(1, { by: "moises", q: "sete nações mais numerosas e mais poderosas", props: [ // sete nações mais numerosas e poderosas
        P("tower", 40, 1.15, undefined, 0.18),
        P("tower", 150, 1.3, undefined, 0.24),
        P("tower", 260, 1.0, undefined, 0.28),
        P("river", -300, 1.2, undefined, 0.2),
        P("grass", -80, 0.85, undefined, 0.8),
      ], env: { terrain: "field", glory: 0.55, night: 0.14, verdure: 0.4 }, cast: [
        C("moises", -180, "point", { dy: 0.5, facing: 1 }),
      ] }),
      b(2, { by: "moises", q: "totalmente as destruirás", cast: [ // as ferirás e destruirás; sem aliança, sem piedade
        C("moises", -160, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 160, "stand", { dy: 0.46 }),
      ] }),
      b(3, { by: "moises", q: "Nem te aparentarás com elas", cast: [ // NÃO te casarás com elas
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 160, "stand", { dy: 0.46 }),
      ] }),
      mv(4, "servissem a outros deuses"),                          // desviariam teus filhos para outros deuses
      // v.5 — DESTRUIR ALTARES E ÍDOLOS: o altar derrubado, o ídolo quebrado, fogo nas imagens.
      b(5, { by: "moises", q: "Derrubareis os seus altares", // DERRUBAR altares, QUEBRAR estátuas, QUEIMAR imagens
        env: { terrain: "field", glory: 0.5, night: 0.18, fire: 0.4, verdure: 0.35 }, cast: [
        C("homem", -40, "raise", { dy: 0.52, facing: 1, id: "destruidor" }),
        C("moises", -190, "point", { dy: 0.5, facing: 1 }),
      ], props: [
        { ...P("altar", 70, 1.15, 0.6, 0.4), tag: "altar-idolo" },
        P("calf", 150, 0.95, undefined, 0.62),
      ] }),
      // v.6 — POVO SANTO: a eleição de Israel; glória de bênção.
      b(6, { by: "moises", q: "povo santo és ao Senhor teu Deus", props: [ // "porque POVO SANTO és ao Senhor" — o povo especial
        P("rock", 320, 1.05, undefined, 0.12),
        P("tent", -285, 1.0, undefined, 0.2),
        P("grass", 80, 0.82, undefined, 0.76),
      ], env: { terrain: "field", glory: 0.92, night: 0.08, fire: 0, verdure: 0.5 }, cast: [
        C("moises", -130, "raise", { glow: 0.4, dy: 0.5, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.46 }),
        C("multidao", 220, "stand", { scale: 0.9, dy: 0.42, id: "povo2" }),
      ] }),
      mv(7, "éreis menos em número"),                              // não vos escolheu por serdes muitos: éreis os menos
      b(8, { by: "moises", q: "vos tirou com mão forte", env: { glory: 0.82 }, cast: [ // porque VOS AMAVA, resgatou com mão forte
        C("moises", -140, "raise", { glow: 0.35, dy: 0.5, facing: 1 }),
        C("multidao", 140, "stand", { dy: 0.46 }),
      ] }),
      mv(9, "o Deus fiel, que guarda a aliança"),                 // o Deus fiel, que guarda a aliança até mil gerações
      mv(10, "retribui no rosto"),                                 // retribui no rosto aos que o odeiam
      mv(11, "Guarda, pois, os mandamentos"),                     // guarda os mandamentos, estatutos e juízos
      mv(12, "te guardará a aliança e a misericórdia"),           // se guardares, ele te guardará a aliança
      // v.13 — A BÊNÇÃO sobre o fruto da terra e do ventre.
      b(13, { by: "moises", q: "abençoará o fruto do teu ventre, e o fruto da tua terra", // abençoará o FRUTO do ventre e da terra
        env: { terrain: "field", glory: 0.9, night: 0.08, verdure: 0.6 }, cast: [
        C("moises", -170, "raise", { glow: 0.35, dy: 0.5, facing: 1 }),
        C("mulher", 60, undefined, { dy: 0.5 }),
      ], props: [
        P("grapes", 130, 1.15, undefined, 0.5),
        P("sheaf", 210, 1.1, undefined, 0.5),
        P("stall", -280, 1.0, undefined, 0.4),
        P("grass", 40, 0.85, undefined, 0.78),
      ] }),
      b(14, { by: "moises", q: "Bendito serás mais do que todos os povos", env: { glory: 0.85 }, cast: [ // BENDITO mais que todos os povos
        C("moises", -140, "raise", { glow: 0.3, dy: 0.5, facing: 1 }),
        C("multidao", 140, "stand", { dy: 0.46 }),
      ] }),
      mv(15, "desviará toda a enfermidade"),                       // o Senhor desviará de ti toda enfermidade
      mv(16, "consumirás a todos os povos"),                       // consumirás os povos; não servirás a seus deuses
      // v.17-19 — "COMO AS PODEREI LANÇAR FORA?" — lembra o que Deus fez ao Egito.
      b(17, { by: "moises", q: "Estas nações são mais numerosas do que eu", cast: [ // o temor do coração: são mais numerosas
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("homem", 60, "stand", { dy: 0.52, facing: -1, id: "israelita" }),
      ] }),
      b(18, { by: "moises", q: "o que o Senhor teu Deus fez a Faraó", // LEMBRA o que fez a Faraó e ao Egito
        env: { terrain: "desert", glory: 0.28, night: 0.4, storm: 0.35, verdure: 0.05 }, cast: [
        C("rei", 150, "bow", { dy: 0.5, facing: -1, id: "farao" }),
        C("moises", -170, "point", { dy: 0.5, facing: 1 }),
      ], props: [
        P("hail", 40, 1.0, undefined, 0.4),
        P("tower", 250, 1.3, undefined, 0.2),
      ] }),
      b(19, { by: "moises", q: "sinais, e maravilhas, e mão forte", // as grandes provas: sinais, maravilhas, mão forte
        env: { terrain: "desert", glory: 0.25, night: 0.45, storm: 0.4, verdure: 0.05 }, cast: [
        C("rei", 160, "lie", { dy: 0.5, facing: -1, id: "farao" }),
      ], props: [
        P("locusts", -20, 1.15, undefined, 0.6),
        P("tower", 260, 1.3, undefined, 0.2),
      ] }),
      b(20, { by: "moises", q: "mandará vespões", props: MOABE, // o Senhor mandará vespões contra os que restarem
        env: { terrain: "field", glory: 0.55, night: 0.14, verdure: 0.4 }, cast: [
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
      ] }),
      b(21, { by: "moises", q: "Deus grande e terrível", env: { glory: 0.7 }, cast: [ // não te espantes: Deus grande e terrível no meio de ti
        C("moises", -140, "raise", { glow: 0.3, dy: 0.5, facing: 1 }),
        C("multidao", 140, "stand", { dy: 0.46 }),
      ] }),
      mv(22, "pouco a pouco"),                                     // lançará as nações POUCO A POUCO
      mv(23, "uma grande confusão"),                               // as entregará e lhes infligirá grande confusão
      // v.24 — OS REIS caídos, seus nomes apagados.
      b(24, { by: "moises", q: "os seus reis te entregará na mão", cast: [ // os REIS entregues; apagarás os seus nomes
        C("moises", -170, "raise", { dy: 0.5, facing: 1 }),
        C("rei", 120, "lie", { dy: 0.5, facing: -1, id: "reiCaido" }),
      ], props: [
        P("tower", 240, 1.2, undefined, 0.2),
      ] }),
      // v.25 — QUEIMAR as imagens; não cobiçar a prata e o ouro dos ídolos.
      b(25, { by: "moises", q: "a prata e o ouro que estão sobre elas não cobiçarás", // QUEIMAR as imagens; não cobiçar prata e ouro
        env: { terrain: "field", glory: 0.5, night: 0.2, fire: 0.5, verdure: 0.3 }, cast: [
        C("moises", -180, "point", { dy: 0.5, facing: 1 }),
      ], props: [
        { ...P("calf", 80, 0.95, undefined, 0.55), tag: "idolo" },
        { ...P("altar", 160, 1.1, 0.7, 0.4), tag: "imagens-queimadas" },
      ] }),
      b(26, { by: "moises", q: "porque anátema é", cast: [ // não porás abominação em casa: de todo a detestarás
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
    ],
  },
};
