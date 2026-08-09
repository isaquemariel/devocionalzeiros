// ============================================================================
// DEUTERONÔMIO 31–32 — CENA VIVA. A ENTREGA DA LEI e o CÂNTICO DE MOISÉS.
//
// Dt 31 — O FIM DE MOISÉS COMEÇA. Aos 120 anos, "já não poderei mais sair e
// entrar" (31:2); o Senhor lhe dissera: "Não passarás o Jordão". Moisés
// encoraja o povo e a JOSUÉ — "esforça-te e anima-te… ele será contigo, não te
// deixará, nem te desamparará" (31:6-8). ESCREVE a Lei e a entrega aos
// sacerdotes/levitas que levavam a ARCA, para pô-la AO LADO da arca por
// testemunha, lida de sete em sete anos (31:9-13,24-26 — `scroll`+`ark`). Na
// TENDA da congregação, o Senhor aparece na COLUNA DE NUVEM à porta e comissiona
// Josué: "eu serei contigo" (31:14-15,23 — `pillar`, glória, voz de Deus da
// coluna). O CÂNTICO é ordenado como testemunha contra o povo que apostatará.
//
// Dt 32 — O CÂNTICO DE MOISÉS. "Inclinai os ouvidos, ó céus… e ouça a terra"
// (32:1) — céus e terra por testemunhas; "Goteje a minha doutrina como a chuva"
// (32:2). Deus é a ROCHA, cuja obra é perfeita (32:4 — `rock` como "a Rocha").
// JESURUM engordou e recalcitrou, "desprezou a Rocha da sua salvação" (32:15) —
// apostasia, o clima escurece; o juízo e o fogo da ira (32:22), "Minha é a
// vingança" (32:35), mas também a compaixão (32:36) e a soberania: "eu, eu o
// sou… eu mato, e eu faço viver" (32:39). Ao fim, o Senhor manda Moisés SUBIR ao
// monte NEBO/Abarim para ver a terra e morrer ali sem entrar nela (32:48-52).
//
// A VOZ (regra do projeto): o CÂNTICO é MOISÉS cantando (mediador visível) —
// `by: "moises"` mesmo nas estrofes em que Deus fala em primeira pessoa, pois
// é Moisés quem entoa. `by: "deus"` só quando o texto diz que o Senhor fala
// AGORA: da COLUNA de nuvem na tenda (31:14,16-21,23) e no chamado ao Nebo
// (32:48-52). Josué e os levitas não têm papel próprio → `servo` com `id`.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const mv = (v: number, q?: string) => b(v, { by: "moises", ...(q ? { q } : {}) }); // Moisés fala/canta
const dv = (v: number, q?: string) => b(v, { by: "deus", ...(q ? { q } : {}) });   // voz do Senhor

// Campinas de Moabe, além do Jordão — o arraial diante do monte de Moabe.
const MOABE: StagePropSpec[] = [
  P("river", 300, 1.25, undefined, 0.2),
  P("rock", 320, 1.1, undefined, 0.12),
  P("tent", -285, 1.0, undefined, 0.2),
  P("tent", 250, 0.95, undefined, 0.24),
  P("palm", -320, 1.05, undefined, 0.14),
  P("grass", -70, 0.85, undefined, 0.82),
  P("grass", 70, 0.8, undefined, 0.74),
];
// A TENDA DA CONGREGAÇÃO com a COLUNA DE NUVEM à porta — o Senhor comissiona Josué.
const TENDA: StagePropSpec[] = [
  { ...P("pillar", 0, 1.5, undefined, 0.3), tag: "coluna-de-nuvem" },
  P("tent", -140, 1.2, undefined, 0.34),
  P("tent", 200, 1.0, undefined, 0.26),
  P("palm", -320, 1.0, undefined, 0.14),
  P("grass", 90, 0.78, undefined, 0.76),
];
// A ARCA DA ALIANÇA e o LIVRO DA LEI posto ao seu lado por testemunha.
const ARCA: StagePropSpec[] = [
  { ...P("ark", -20, 1.2, undefined, 0.4), tag: "arca-da-alianca" },
  { ...P("scroll", 130, 1.0, undefined, 0.5), tag: "livro-da-lei" },
  P("tent", -260, 1.0, undefined, 0.22),
  P("palm", 300, 1.0, undefined, 0.14),
  P("grass", -90, 0.78, undefined, 0.78),
];
// OS CÉUS E A TERRA por testemunhas — as nuvens da chuva sobre a relva (o Cântico).
const CEUS: StagePropSpec[] = [
  { ...P("clouds", -180, 1.4, undefined, 0.78), sky: true },
  { ...P("clouds", 170, 1.3, undefined, 0.82), sky: true },
  P("well", 300, 1.1, undefined, 0.5),
  P("grass", -90, 0.9, undefined, 0.82),
  P("grass", 60, 0.86, undefined, 0.72),
  P("grass", 190, 0.8, undefined, 0.66),
];
// "Inclinai os ouvidos, ó céus" — o firmamento estrelado por testemunha, guardando a nuvem da chuva.
const CEUS_TESTEMUNHA: StagePropSpec[] = [
  { ...P("starfield", 0, 1.2, undefined, 0.3), sky: true },
  ...CEUS,
];
// A ROCHA — "Ele é a Rocha, cuja obra é perfeita": monte firme e central.
const ROCHA: StagePropSpec[] = [
  { ...P("rock", 0, 2.6, undefined, 0.5), tag: "a-rocha" }, // "Ele é a Rocha" — grande e à frente, dominando a cena
  { ...P("clouds", -190, 1.2, undefined, 0.8), sky: true },
  P("grass", -110, 0.82, undefined, 0.8),
  P("grass", 150, 0.8, undefined, 0.7),
];
// O ERMO SOLITÁRIO onde o Senhor achou Jacó e o guardou (flashback do deserto).
const ERMO: StagePropSpec[] = [
  { ...P("birds", 40, 1.2, undefined, 0.28), sky: true }, // a águia sobre a ninhada
  P("rock", 260, 1.15, undefined, 0.3),
  P("rock", -280, 1.0, undefined, 0.2),
  P("grass", -60, 0.6, undefined, 0.8),
];
// A APOSTASIA DE JESURUM — o ídolo, a Rocha esquecida, o clima que escurece.
const APOSTASIA: StagePropSpec[] = [
  { ...P("calf", 0, 1.15, undefined, 0.4), tag: "idolo-jesurum" },
  { ...P("rock", 250, 1.2, undefined, 0.3), tag: "a-rocha-esquecida" },
  P("grapes", -290, 0.95, undefined, 0.26), // a vinha de Sodoma, uvas venenosas
  P("grass", -70, 0.7, undefined, 0.78),
];
// O MONTE NEBO / ABARIM — o alto de onde Moisés vê a terra e morre sem entrar.
const NEBO: StagePropSpec[] = [
  P("rock", 40, 1.5, undefined, 0.24),
  P("river", -280, 1.2, undefined, 0.72), // o Jordão lá embaixo, a terra além
  P("tower", 220, 0.9, undefined, 0.5),   // Jericó defronte
  P("grass", -100, 0.7, undefined, 0.8),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Dt 31
  31: {
    start: { terrain: "field", night: 0.1, glory: 0.58, storm: 0, fire: 0, verdure: 0.42 },
    beats: [
      b(1, { by: "moises", props: MOABE, env: { terrain: "field", glory: 0.58, night: 0.1, verdure: 0.42 }, cast: [ // Moisés falou estas palavras a todo o Israel
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
      // v.2 — 120 anos: "já não poderei mais sair e entrar".
      b(2, { by: "moises", q: "já não poderei mais sair e entrar", env: { glory: 0.5 }, cast: [
        C("moises", -140, "stand", { dy: 0.5, facing: 1, glow: 0.15 }),
        C("multidao", 140, "bow", { dy: 0.48 }),
      ] }),
      // v.3 — Josué passará adiante de ti.
      b(3, { by: "moises", q: "Josué passará adiante de ti", cast: [
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("servo", 60, "stand", { dy: 0.5, facing: -1, id: "josue" }),
        C("multidao", 200, "stand", { dy: 0.44 }),
      ] }),
      // v.4 — flashback: o Senhor fará como fez a Siom e a Ogue, reis caídos.
      b(4, { by: "moises", q: "reis dos amorreus", env: { glory: 0.44, night: 0.2 }, cast: [
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("rei", 120, "lie", { dy: 0.6, id: "siom" }),
        C("rei", 210, "lie", { dy: 0.58, id: "ogue", scale: 1.1 }),
      ] }),
      mv(5, "todo o mandamento que vos tenho ordenado"),                       // fareis conforme todo o mandamento
      // v.6 — "não te deixará nem te desamparará".
      b(6, { by: "moises", q: "não te deixará nem te desamparará", env: { glory: 0.66 }, cast: [
        C("moises", -130, "raise", { dy: 0.5, facing: 1, glow: 0.25 }),
        C("multidao", 140, "raise", { dy: 0.46 }),
      ] }),
      // v.7 — chama Josué aos olhos de todo o Israel: "Esforça-te e anima-te".
      b(7, { by: "moises", q: "Esforça-te e anima-te", env: { glory: 0.68 }, cast: [
        C("moises", -120, "raise", { dy: 0.5, facing: 1, glow: 0.3 }),
        C("servo", 70, "stand", { dy: 0.5, facing: -1, id: "josue" }),
        C("multidao", 210, "stand", { dy: 0.44 }),
      ] }),
      b(8, { by: "moises", q: "vai adiante de ti", cast: [                       // o Senhor é aquele que vai adiante de ti
        C("moises", -120, "point", { dy: 0.5, facing: 1 }),
        C("servo", 70, "bow", { dy: 0.5, facing: -1, id: "josue" }),
      ] }),
      // v.9 — Moisés escreve a Lei e a entrega aos sacerdotes que levavam a ARCA.
      b(9, { by: "moises", q: "que levavam a arca da aliança", set: "arca", props: ARCA,
        env: { terrain: "field", glory: 0.6, night: 0.1, verdure: 0.4 }, cast: [
        C("moises", -150, "write", { dy: 0.5, facing: 1 }),
        C("servo", 40, "stand", { dy: 0.5, facing: -1, id: "sacerdote1" }),
        C("servo", 120, "stand", { dy: 0.48, facing: -1, id: "levita" }),
      ] }),
      b(10, { by: "moises", cast: [                                             // ordenou: ao fim de cada sete anos, no ano da remissão
        C("moises", -130, "point", { dy: 0.5, facing: 1 }),
        C("servo", 60, "stand", { dy: 0.5, facing: -1, id: "sacerdote1" }),
      ] }),
      mv(11, "lerás esta lei diante de todo o Israel"),                          // lerás esta lei diante de todo o Israel
      // v.12 — ajunta o povo: homens, mulheres, meninos, estrangeiros.
      b(12, { by: "moises", q: "Ajunta o povo", cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.48 }),
        C("mulherComum", 40, "stand", { dy: 0.52, facing: -1, id: "mae" }),
        C("homem", 110, "stand", { scale: 0.62, dy: 0.42, facing: -1, id: "menino" }),
      ] }),
      mv(13, "aprendam a temer ao Senhor vosso Deus"),                           // e seus filhos ouçam e aprendam
      // v.14 — o Senhor a Moisés: teus dias chegados; apresentai-vos na tenda.
      dv(14, "para que eu lhe dê ordens"),
      // v.15 — o Senhor aparece na TENDA, na COLUNA DE NUVEM à porta. ÍCONE.
      b(15, { by: "deus", q: "na coluna de nuvem", set: "tenda", props: TENDA,
        env: { terrain: "field", glory: 0.92, night: 0.12, verdure: 0.35 }, cast: [
        C("moises", -150, "bow", { dy: 0.52, facing: 1, glow: 0.3 }),
        C("servo", 130, "bow", { dy: 0.52, facing: -1, id: "josue", glow: 0.2 }),
      ] }),
      // v.16-21 — a voz da coluna: o povo apostatará; o cântico será testemunha.
      dv(16, "após os deuses estranhos"),                                        // este povo prostituir-se-á após deuses estranhos
      b(17, { by: "deus", q: "acenderá a minha ira", env: { glory: 0.2, night: 0.5, storm: 0.12 } }), // a ira se acenderá; esconderei o meu rosto
      dv(18, "totalmente o meu rosto"),                                          // esconderei totalmente o meu rosto
      dv(19, "este cântico me seja por testemunha"),                             // escrevei este cântico por testemunha
      b(20, { by: "deus", q: "então se tornará a outros deuses", env: { glory: 0.28, night: 0.42 } }), // fartar-se-á e se tornará a outros deuses
      b(21, { by: "deus", q: "por testemunha", env: { glory: 0.3, night: 0.4 } }), // o cântico responderá por testemunha
      // v.22 — Moisés escreve o cântico naquele dia e o ensina.
      b(22, { by: "moises", q: "escreveu este cântico", set: "arca", props: ARCA,
        env: { terrain: "field", glory: 0.55, night: 0.14, verdure: 0.38 }, cast: [
        C("moises", -140, "write", { dy: 0.5, facing: 1 }),
        C("multidao", 140, "stand", { dy: 0.46 }),
      ] }),
      // v.23 — a coluna comissiona JOSUÉ: "eu serei contigo". ÍCONE.
      b(23, { by: "deus", q: "Esforça-te e anima-te", set: "tenda", props: TENDA,
        env: { terrain: "field", glory: 0.92, night: 0.12, verdure: 0.35 }, cast: [
        C("servo", 60, "raise", { dy: 0.5, facing: -1, id: "josue", glow: 0.5 }),
        C("moises", -170, "stand", { dy: 0.5, facing: 1, glow: 0.2 }),
      ] }),
      b(24, { by: "moises", q: "acabando Moisés de escrever num livro", set: "arca", props: ARCA,
        env: { terrain: "field", glory: 0.56, night: 0.12, verdure: 0.38 }, cast: [
        C("moises", -140, "write", { dy: 0.5, facing: 1 }),
      ] }),
      b(25, { by: "moises", q: "que levavam a arca da aliança", cast: [          // deu ordem aos levitas que levavam a arca
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("servo", 60, "stand", { dy: 0.5, facing: -1, id: "levita" }),
      ] }),
      // v.26 — ponde o livro AO LADO DA ARCA por testemunha. ÍCONE.
      b(26, { by: "moises", q: "ao lado da arca da aliança", env: { glory: 0.62 }, cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1, glow: 0.15 }),
        C("servo", 70, "stand", { dy: 0.5, facing: -1, id: "levita" }),
      ] }),
      mv(27, "a tua rebelião e a tua dura cerviz"),                              // conheço a tua rebelião e dura cerviz
      // v.28 — ajuntai os anciãos: por testemunhas tomarei o céu e a terra.
      b(28, { by: "moises", q: "tomarei o céu e a terra", cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("anciao", 60, "stand", { dy: 0.5, facing: -1, id: "anciaos" }),
        C("multidao", 200, "stand", { dy: 0.44 }),
      ] }),
      mv(29, "depois da minha morte certamente vos corrompereis"),              // depois da minha morte vos corrompereis
      // v.30 — Moisés fala as palavras do cântico a toda a congregação.
      b(30, { by: "moises", q: "as palavras deste cântico", env: { glory: 0.6 }, cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Dt 32
  32: {
    start: { terrain: "field", night: 0.1, glory: 0.62, storm: 0, fire: 0, verdure: 0.5 },
    beats: [
      // v.1 — "Inclinai os ouvidos, ó céus; e ouça a terra". Céus e terra por testemunhas.
      b(1, { by: "moises", q: "Inclinai os ouvidos, ó céus", set: "ceus", props: CEUS_TESTEMUNHA,
        env: { terrain: "field", glory: 0.66, night: 0.08, verdure: 0.55 }, cast: [
        C("moises", -120, "raise", { dy: 0.5, facing: 1, glow: 0.2 }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
      // v.2 — "Goteje a minha doutrina como a chuva".
      b(2, { by: "moises", q: "Goteje a minha doutrina como a chuva", env: { glory: 0.6, storm: 0.15, verdure: 0.6 }, cast: [
        C("moises", -120, "raise", { dy: 0.5, facing: 1, glow: 0.2 }),
      ] }),
      mv(3, "apregoarei o nome do Senhor"),                                      // apregoarei o nome do Senhor
      // v.4 — "Ele é a Rocha, cuja obra é perfeita". ÍCONE: a Rocha.
      b(4, { by: "moises", q: "Ele é a Rocha, cuja obra é perfeita", set: "rocha", props: ROCHA,
        env: { terrain: "field", glory: 0.78, night: 0.08, verdure: 0.4 }, cast: [
        C("moises", -160, "raise", { dy: 0.5, facing: 1, glow: 0.3 }),
      ] }),
      mv(5, "geração perversa e distorcida"),                                    // geração perversa e distorcida
      b(6, { by: "moises", q: "povo louco e ignorante", cast: [                  // recompensais assim ao Senhor, povo louco?
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
      b(7, { by: "moises", q: "Lembra-te dos dias da antiguidade", cast: [       // pergunta a teu pai, aos teus anciãos
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("anciao", 70, "stand", { dy: 0.5, facing: -1, id: "anciaos" }),
      ] }),
      mv(8, "distribuía as heranças às nações"),                                 // o Altíssimo distribuía as heranças
      mv(9, "Jacó é a parte da sua herança"),                                    // a porção do Senhor é o seu povo
      // v.10 — flashback: achou-o num ermo solitário e o guardou como a menina do olho.
      b(10, { by: "moises", q: "num ermo solitário cheio de uivos", set: "ermo", props: ERMO,
        env: { terrain: "desert", glory: 0.42, night: 0.2, verdure: 0.1 }, cast: [
        C("multidao", 20, "walk", { dy: 0.52 }),
      ] }),
      // v.11 — "Como a águia desperta a sua ninhada" — a águia sobre o povo.
      b(11, { by: "moises", q: "Como a águia desperta a sua ninhada", env: { glory: 0.5 }, cast: [
        C("multidao", 20, "raise", { dy: 0.52 }),
      ] }),
      mv(12, "só o Senhor o guiou"),                                             // só o Senhor o guiou; sem deus estranho
      // v.13 — fez cavalgar sobre as alturas e chupar mel da rocha.
      b(13, { by: "moises", q: "chupar mel da rocha", set: "rocha", props: ROCHA,
        env: { terrain: "field", glory: 0.6, night: 0.1, verdure: 0.45 }, cast: [
        C("multidao", 30, "raise", { dy: 0.52 }),
      ] }),
      mv(14, "o mais escolhido trigo"),                                          // manteiga, leite, gordura, o melhor trigo
      // v.15 — JESURUM engordou e "desprezou a Rocha da sua salvação". APOSTASIA.
      b(15, { by: "moises", q: "desprezou a Rocha da sua salvação", set: "apostasia", props: APOSTASIA,
        env: { terrain: "field", glory: 0.15, night: 0.5, storm: 0.15, verdure: 0.3 }, cast: [
        C("homem", -40, "point", { dy: 0.52, facing: 1, id: "jesurum" }),
      ] }),
      b(16, { by: "moises", q: "deuses estranhos o provocaram a zelos", env: { glory: 0.12, night: 0.55 }, cast: [
        C("homem", -40, "bow", { dy: 0.52, facing: 1, id: "jesurum" }),
      ] }),
      // v.17 — sacrifícios aos demônios, a novos deuses.
      b(17, { by: "moises", q: "Sacrifícios ofereceram aos demônios", env: { glory: 0.1, night: 0.6, fire: 0.12 }, cast: [
        C("homem", -60, "kneel", { dy: 0.56, facing: 1, id: "jesurum" }),
        C("homem", 90, "bow", { dy: 0.54, facing: -1, id: "idolatra" }),
      ] }),
      // v.18 — "Esqueceste-te da Rocha que te gerou".
      b(18, { by: "moises", q: "Esqueceste-te da Rocha que te gerou", env: { glory: 0.12, night: 0.55 } }),
      b(19, { by: "moises", q: "os desprezou", env: { glory: 0.14, night: 0.55 } }), // o Senhor os desprezou, provocado à ira
      // v.20 — "Esconderei o meu rosto deles".
      b(20, { by: "moises", q: "Esconderei o meu rosto deles", env: { glory: 0.1, night: 0.62 } }),
      mv(21, "com nação louca os despertarei à ira"),                            // provocá-los-ei a zelos com o que não é povo
      // v.22 — "um fogo se acendeu na minha ira" — o fogo do juízo.
      b(22, { by: "moises", q: "um fogo se acendeu na minha ira", env: { glory: 0.08, night: 0.55, fire: 0.5, storm: 0.2 } }),
      b(23, { by: "moises", q: "as minhas setas esgotarei contra eles", env: { glory: 0.1, night: 0.55, fire: 0.35 } }),
      // v.24 — fome, febre, peste, dentes de feras, veneno de serpentes.
      b(24, { by: "moises", q: "dentes de feras", env: { glory: 0.08, night: 0.6, fire: 0.2 }, cast: [
        C("homem", -60, "lie", { dy: 0.58, id: "ferido1" }),
        C("mulherComum", 60, "bow", { dy: 0.54, id: "ferido2" }),
      ] }),
      b(25, { by: "moises", q: "Por fora devastará a espada", env: { glory: 0.1, night: 0.55, fire: 0.15 }, cast: [
        C("homem", -50, "lie", { dy: 0.58, id: "ferido1" }),
      ] }),
      mv(26, "farei cessar a sua memória"),                                      // por todos os cantos os espalharei
      mv(27, "A nossa mão está exaltada"),                                       // se eu não receasse a ira do inimigo
      mv(28, "neles não há entendimento"),                                       // gente falta de conselhos
      mv(29, "atentassem para o seu fim"),                                       // quem dera fossem sábios
      mv(30, "um só perseguisse mil"),                                           // se a sua Rocha os não vendera
      // v.31 — "a sua rocha não é como a nossa Rocha".
      b(31, { by: "moises", q: "não é como a nossa Rocha", set: "rocha", props: ROCHA,
        env: { terrain: "field", glory: 0.4, night: 0.28, verdure: 0.32 } }),
      // v.32 — a vinha de Sodoma, uvas venenosas.
      b(32, { by: "moises", q: "a vinha de Sodoma", set: "apostasia", props: APOSTASIA,
        env: { terrain: "field", glory: 0.2, night: 0.45, verdure: 0.25 } }),
      mv(33, "veneno de serpentes"),                                             // o seu vinho é veneno de víboras
      mv(34, "Selado nos meus tesouros"),                                        // não está isto guardado comigo?
      // v.35 — "Minha é a vingança e a recompensa".
      b(35, { by: "moises", q: "Minha é a vingança e a recompensa", env: { glory: 0.16, night: 0.5, fire: 0.2 } }),
      // v.36 — mas o Senhor fará justiça ao seu povo e se compadecerá. A luz volta.
      b(36, { by: "moises", q: "o Senhor fará justiça ao seu povo", set: "ceus", props: CEUS,
        env: { terrain: "field", glory: 0.6, night: 0.14, verdure: 0.5 }, cast: [
        C("moises", -120, "raise", { dy: 0.5, facing: 1, glow: 0.25 }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
      mv(37, "Onde estão os seus deuses"),                                       // onde está a rocha em que confiavam?
      mv(38, "Levantem-se, e vos ajudem"),                                       // que os falsos deuses os socorram
      // v.39 — "eu mato, e eu faço viver". A soberania única. ÍCONE do Cântico.
      b(39, { by: "moises", q: "eu mato, e eu faço viver", env: { glory: 0.85, night: 0.08 }, cast: [
        C("moises", -100, "raise", { dy: 0.5, facing: 1, glow: 0.45 }),
      ] }),
      b(40, { by: "moises", q: "Eu vivo para sempre", env: { glory: 0.9 }, cast: [ // levanto a minha mão aos céus: eu vivo para sempre
        C("moises", -100, "raise", { dy: 0.5, facing: 1, glow: 0.5 }),
      ] }),
      // v.41 — a espada reluzente do juízo; a vingança sobre os adversários.
      b(41, { by: "moises", q: "a minha espada reluzente", env: { glory: 0.5, night: 0.2, fire: 0.2 }, cast: [
        C("moises", -120, "raise", { dy: 0.5, facing: 1, glow: 0.3 }),
      ] }),
      mv(42, "a minha espada comerá carne"),                                     // embriagarei as minhas setas de sangue
      // v.43 — "Jubilai, ó nações" — misericórdia da sua terra e do seu povo.
      b(43, { by: "moises", q: "Jubilai, ó nações", env: { glory: 0.82, night: 0.08, verdure: 0.55 }, cast: [
        C("moises", -120, "raise", { dy: 0.5, facing: 1, glow: 0.4 }),
        C("multidao", 150, "raise", { dy: 0.46 }),
      ] }),
      // v.44 — Moisés vem e fala o cântico, "ele e Josué, filho de Num".
      b(44, { by: "moises", q: "ele e Josué, filho de Num", set: "moabe", props: MOABE,
        env: { terrain: "field", glory: 0.6, night: 0.1, verdure: 0.45 }, cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1 }),
        C("servo", 20, "stand", { dy: 0.5, facing: -1, id: "josue" }),
        C("multidao", 160, "stand", { dy: 0.46 }),
      ] }),
      mv(45, "acabando Moisés de falar todas estas palavras"),                   // acabando Moisés de falar
      // v.46 — "Aplicai o vosso coração a todas as palavras".
      b(46, { by: "moises", q: "Aplicai o vosso coração", cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
      // v.47 — "antes é a vossa vida".
      b(47, { by: "moises", q: "antes é a vossa vida", env: { glory: 0.66 }, cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1, glow: 0.2 }),
      ] }),
      // v.48 — o Senhor fala a Moisés naquele mesmo dia. Voz do céu.
      dv(48, "naquele mesmo dia"),
      // v.49 — "Sobe ao monte de Abarim, ao monte Nebo… e vê a terra de Canaã".
      b(49, { by: "deus", q: "Sobe ao monte de Abarim, ao monte Nebo", set: "nebo", props: NEBO,
        env: { terrain: "mountain", glory: 0.5, night: 0.2, verdure: 0.2 }, cast: [
        C("moises", -30, "raise", { dy: 0.42, facing: 1, glow: 0.25 }),
      ] }),
      // v.50 — "E morre no monte ao qual subirás", como Arão morreu no monte Hor.
      b(50, { by: "deus", q: "morre no monte ao qual subirás", env: { glory: 0.4, night: 0.28 }, cast: [
        C("moises", -30, "stand", { dy: 0.42, facing: 1, glow: 0.2 }),
      ] }),
      b(51, { by: "deus", q: "às águas de Meribá de Cades", env: { glory: 0.38, night: 0.3 } }), // transgredistes nas águas de Meribá
      // v.52 — "porém não entrarás nela": Moisés vê a terra do alto do Nebo.
      b(52, { by: "deus", q: "porém não entrarás nela", env: { glory: 0.48, night: 0.22 }, cast: [
        C("moises", -30, "point", { dy: 0.42, facing: -1, glow: 0.2 }),
      ] }),
    ],
  },
};
