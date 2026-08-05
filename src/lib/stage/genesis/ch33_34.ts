// ============================================================================
// GÊNESIS 33–34 — roteiro do modo CENA VIVA (força-tarefa AT, onda 2).
//
// Gn 33 — O REENCONTRO. O capítulo que desarma vinte anos de medo em um único
// versículo. (1) A APROXIMAÇÃO: Esaú vem, e quatrocentos homens com ele —
// Jacó reparte a família em camadas (servas na frente, Lia atrás, Raquel e
// José os derradeiros) e vai ELE MESMO adiante, inclinando-se SETE VEZES à
// terra. Tensão máxima: storm 0.2, o herói ainda manquejando de Peniel.
// (2) O ABRAÇO (v.4): Esaú CORRE, abraça, beija — e CHORAM. A tempestade cai
// a zero e a glória sobe a 0.7: é o beat mais tocante do capítulo, a
// reconciliação como teofania de graça. (3) A APRESENTAÇÃO: as mulheres e os
// meninos chegam e se inclinam, leva a leva. (4) O PRESENTE recusado e
// aceito: "Eu tenho bastante, meu irmão" contra "tenho visto o teu rosto,
// como se tivesse visto o rosto de Deus" (glory 0.5 — o rosto do irmão
// perdoado espelha o rosto de Peniel). (5) OS CAMINHOS SE SEPARAM: o gado
// tenro não corre, Esaú volta a Seir, e a estrada esvazia. (6) SUCOTE: casa e
// CABANAS ao cair da tarde. (7) SIQUÉM: a tenda diante da cidade, o campo
// COMPRADO com cem peças de dinheiro e o ALTAR — EL-ELOÉ-ISRAEL, "Deus, o
// Deus de Israel": o homem que ganhou nome novo agora o grava em pedra.
//
// Gn 34 — DINÁ E SIQUÉM. O capítulo mais duro dos patriarcas, encenado com
// DECORO ABSOLUTO: a violência NUNCA é desenhada — ela vive na narração e no
// ambiente. Diná sai para ver as filhas da terra (v.1) e o palco perde a luz
// (v.2: night 0.6, storm 0.3, o elenco recuando ao fundo — nada se encena, o
// texto narra). Vem a paixão e o pedido de casamento (Siquém e Hamor), o
// SILÊNCIO de Jacó, e os filhos que voltam do campo indignados (storm 0.3).
// A proposta generosa de Hamor à porta da tenda, e então O ENGANO DA
// CIRCUNCISÃO — falado "enganosamente", aceito pela cidade inteira na porta.
// AO TERCEIRO DIA a noite se fecha (night 0.7, storm 0.6, fire 0.2): Simeão e
// Levi entram, a cidade fica VAZIA no palco (nenhuma morte encenada — só o
// ambiente, o fogo e o saque), Diná é tirada da casa de Siquém, os bens e os
// presos saem. Fim amargo: a repreensão de Jacó ("Tendes-me turbado") e a
// réplica que fecha o capítulo sem resposta ("Devia ele tratar a nossa irmã
// como a uma prostituta?") — night 0.5, sem glória nenhuma.
//
// DEUS NUNCA É DESENHADO: em 33:5,10,11 os irmãos falam DE Deus ("os filhos
// que Deus graciosamente tem dado", "o rosto de Deus") — a resposta do palco é
// GLÓRIA no ambiente, nunca figura. Em 34 a glória se ausenta de propósito:
// é o único capítulo do ciclo em que Deus não fala nem age — e o palco sente.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------------------
// A ESTRADA DO ENCONTRO (33:1-16) — a descida de Peniel: pedra nua, mato
// ralo, horizonte aberto à direita, por onde vêm as quatrocentas lanças.
// O corredor de extras (dx -100..-190) fica LIVRE de decoração: é por ali que
// a FAMÍLIA de Jacó se enfileira em camadas.
const ESTRADA: StagePropSpec[] = [
  P("rock", -262, 1.0, undefined, 0.24),
  P("rock", -34, 0.6, undefined, 0.52),
  P("rock", 208, 0.95, undefined, 0.3),
  P("rock", 312, 1.15, undefined, 0.62),
  P("bush", -308, 0.9, undefined, 0.44),
  P("bush", 120, 0.85, undefined, 0.7),
  P("tree", -66, 1.15, undefined, 0.06),
  P("tree", 84, 1.0, undefined, 0.04),
  P("tree", 268, 0.95, undefined, 0.46),
  P("grass", -228, 1, undefined, 0.82),
  P("grass", 26, 0.95, undefined, 0.88),
  P("grass", 236, 1, undefined, 0.76),
];

// ---------------------------------------------------------------------------
// SUCOTE (33:17) — "edificou para si uma casa; e fez CABANAS para o seu gado".
// Duas tendas grandes (a casa e as cabanas), o fogo aceso, o bebedouro: a
// primeira paragem tranquila do herói desde que fugiu de Harã.
const SUCOTE: StagePropSpec[] = [
  P("tent", 190, 1.35, undefined, 0.12),     // a casa que edificou para si
  P("tent", 274, 1.05, undefined, 0.36),     // as cabanas para o gado
  P("campfire", 52, 1, 1, 0.62),
  P("well", 320, 1, undefined, 0.18),
  P("crate", -286, 0.9, undefined, 0.52),
  P("amphora", 228, 0.85, undefined, 0.58),
  P("rock", -40, 0.55, undefined, 0.26),
  P("rock", 306, 0.85, undefined, 0.74),
  P("bush", -318, 0.9, undefined, 0.36),
  P("bush", 132, 0.85, undefined, 0.68),
  P("tree", -70, 1.1, undefined, 0.06),
  P("tree", 96, 0.95, undefined, 0.04),
  P("grass", -246, 1, undefined, 0.82),
  P("grass", 18, 1, undefined, 0.86),
  P("grass", 206, 0.95, undefined, 0.78),
];

// ---------------------------------------------------------------------------
// SALÉM, CIDADE DE SIQUÉM (33:18-20) — a muralha e a porta ao fundo à direita,
// a tenda de Jacó "diante da cidade" à esquerda, e o campo comprado no meio.
const SIQUEM: StagePropSpec[] = [
  P("tower", 236, 1.35, undefined, 0.08),    // a cidade de Siquém, na terra de Canaã
  P("door", 300, 1.05, undefined, 0.14),     // a porta da cidade
  P("tent", -246, 1.3, undefined, 0.18),     // "armou a sua tenda diante da cidade"
  P("tent", -300, 1.0, undefined, 0.42),     // as tendas da casa
  P("stall", 158, 0.95, undefined, 0.3),
  P("well", 316, 1, undefined, 0.56),
  P("amphora", -206, 0.85, undefined, 0.6),
  P("crate", -282, 0.9, undefined, 0.62),
  P("rock", -30, 0.55, undefined, 0.28),
  P("bush", 108, 0.85, undefined, 0.68),
  P("tree", -74, 1.1, undefined, 0.05),
  P("tree", 44, 0.95, undefined, 0.03),
  P("grass", -256, 1, undefined, 0.84),
  P("grass", 30, 1, undefined, 0.86),
  P("grass", 200, 0.95, undefined, 0.8),
];
// O CAMPO COMPRADO (33:19): os fardos do preço, "cem peças de dinheiro",
// entram no corredor de extras — o primeiro pedaço de Canaã que é de Israel.
const SIQUEM_CAMPO: StagePropSpec[] = [...SIQUEM, P("crate", -138, 0.95, undefined, 0.26)];
// O ALTAR EL-ELOÉ-ISRAEL (33:20): o altar aceso e a árvore de Siquém ao lado,
// destacados no corredor — o marco do nome novo.
const SIQUEM_ALTAR: StagePropSpec[] = [
  ...SIQUEM,
  { ...P("altar", -136, 1.15, 1, 0.26), tag: "altar-siquem" },           // "levantou ali um altar"
  P("tree", -188, 1.25, undefined, 0.08),    // a árvore do lugar de Siquém
];

// ---------------------------------------------------------------------------
// GN 34 — DENTRO DE SIQUÉM (34:1-4) — a cidade das "filhas da terra": muralha,
// torre, barracas do comércio, o poço e as talhas. Rua estreita, palco fechado.
const CIDADE: StagePropSpec[] = [
  P("tower", -258, 1.4, undefined, 0.08),    // a cidade do príncipe Siquém
  P("tower", 246, 1.2, undefined, 0.06),
  P("door", 300, 1.1, undefined, 0.16),      // a porta da cidade
  P("stall", -300, 1.0, undefined, 0.26),
  P("stall", 168, 0.95, undefined, 0.32),
  P("well", 320, 1, undefined, 0.6),
  P("amphora", 214, 0.85, undefined, 0.58),
  P("amphora", -228, 0.8, undefined, 0.66),
  P("crate", -276, 0.9, undefined, 0.54),
  P("crate", 262, 0.8, undefined, 0.72),
  P("bush", 100, 0.85, undefined, 0.7),
  P("tree", -60, 1.1, undefined, 0.05),
  P("grass", -200, 1, undefined, 0.86),
  P("grass", 40, 0.95, undefined, 0.84),
];

// ---------------------------------------------------------------------------
// O ARRAIAL DE JACÓ diante de Siquém (34:5-19) — as tendas da casa, o fogo, o
// altar de 33:20 ainda de pé, e a muralha da cidade no horizonte à direita.
// É aqui que Hamor negocia e os irmãos respondem "enganosamente".
const ARRAIAL: StagePropSpec[] = [
  P("tent", -252, 1.35, undefined, 0.16),    // a tenda de Jacó
  P("tent", -308, 1.05, undefined, 0.44),    // as tendas dos filhos
  P("tent", 214, 1.15, undefined, 0.14),
  { ...P("altar", -66, 1.0, undefined, 0.08), tag: "altar-siquem" },     // o altar de El-Eloé-Israel (33:20)
  P("campfire", 44, 1, 1, 0.64),
  P("tower", 296, 1.25, undefined, 0.04),    // Siquém, ao longe
  P("amphora", -212, 0.85, undefined, 0.62),
  P("crate", -284, 0.9, undefined, 0.6),
  P("rock", -26, 0.55, undefined, 0.3),
  P("rock", 316, 0.85, undefined, 0.76),
  P("bush", 116, 0.85, undefined, 0.68),
  P("tree", 88, 1.05, undefined, 0.04),
  P("grass", -244, 1, undefined, 0.84),
  P("grass", 22, 1, undefined, 0.88),
  P("grass", 200, 0.95, undefined, 0.8),
];

// ---------------------------------------------------------------------------
// A PORTA DA CIDADE (34:20-24) — o fórum do mundo antigo: é ali que Hamor e
// Siquém convencem "todos os que saíam da porta". A porta entra GRANDE no
// corredor de extras: o versículo gira em torno dela.
const PORTA: StagePropSpec[] = [
  P("door", -142, 1.5, undefined, 0.22),     // "à porta da sua cidade"
  P("tower", -262, 1.4, undefined, 0.06),
  P("tower", 232, 1.25, undefined, 0.05),
  P("stall", -308, 1.0, undefined, 0.3),
  P("stall", 156, 0.95, undefined, 0.34),
  P("well", 318, 1, undefined, 0.62),
  P("amphora", 206, 0.85, undefined, 0.6),
  P("crate", -60, 0.8, undefined, 0.24),
  P("bush", 104, 0.85, undefined, 0.72),
  P("tree", -20, 1.05, undefined, 0.04),
  P("grass", -206, 1, undefined, 0.86),
  P("grass", 46, 0.95, undefined, 0.82),
];
// AO TERCEIRO DIA (34:25-29) — a mesma cidade, agora sob a noite: as estrelas
// frias sobre a porta aberta e o fogo do saque no ambiente (env.fire).
const PORTA_NOITE: StagePropSpec[] = [
  ...PORTA,
  P("star", -288, 0.45, undefined, 0.03),
  P("star", 190, 0.5, undefined, 0.02),
  P("star", 320, 0.4, undefined, 0.07),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Gn 33
  // O REENCONTRO. Arco de env: a manhã tensa da descida de Peniel (storm 0.15
  // → 0.2 nas sete inclinações) → O ABRAÇO: storm 0, glory 0.7 (o pico do
  // capítulo) → o presente e "o rosto de Deus" (glory 0.5 → 0.55) → a
  // separação dos caminhos com o dia caindo (night 0.3) → SUCOTE ao anoitecer
  // (night 0.45) → a chegada salvo a Salém na manhã seguinte (night 0.15) →
  // o ALTAR de El-Eloé-Israel (glory 0.6, night 0.1).
  33: {
    start: { terrain: "desert", night: 0.12, glory: 0.15, storm: 0.15 },
    beats: [
      // ---- ATO 1: a aproximação das quatrocentas lanças
      b(1, { props: ESTRADA, env: { storm: 0.18 }, cast: [                          // eis que vinha ESAÚ, e quatrocentos homens
        C("jaco", -30, "point", { dy: 0.54, facing: 1 }),
        C("mulherComum", -112, "stand", { dy: 0.6, facing: 1, id: "raquel" }),
        C("mulherComum", -164, "stand", { dy: 0.46, facing: 1, id: "lia" }),
        C("esau", 214, "walk", { dy: 0.44, facing: -1 }),
        C("multidao", 292, "stand", { dy: 0.18 }),
      ] }),
      b(2, { env: { storm: 0.2 }, cast: [                                           // servas na frente, Lia atrás, Raquel e José os derradeiros
        C("jaco", -18, "stand", { dy: 0.54, facing: 1 }),
        C("mulherComum", -84, "stand", { dy: 0.58, facing: 1, id: "servaA" }),
        C("mulherComum", -122, "stand", { dy: 0.44, facing: 1, id: "servaB" }),
        C("homem", -150, "stand", { dy: 0.62, facing: 1, scale: 0.72, id: "meninoA" }),
        C("mulherComum", -196, "stand", { dy: 0.52, facing: 1, id: "lia" }),
        C("mulherComum", -258, "stand", { dy: 0.6, facing: 1, id: "raquel" }),
        C("jose", -292, "stand", { dy: 0.48, facing: 1, scale: 0.74 }),
        C("esau", 170, "walk", { dy: 0.44, facing: -1 }),
        C("multidao", 276, "stand", { dy: 0.18 }),
      ] }),
      b(3, { env: { storm: 0.2, night: 0.15, glory: 0.1 }, cast: [                   // passou ADIANTE deles: inclinou-se SETE VEZES
        C("jaco", 24, "bow", { dy: 0.52, facing: 1 }),
        C("mulherComum", -104, "stand", { dy: 0.58, facing: 1, id: "servaA" }),
        C("mulherComum", -142, "stand", { dy: 0.44, facing: 1, id: "servaB" }),
        C("homem", -170, "stand", { dy: 0.62, facing: 1, scale: 0.72, id: "meninoA" }),
        C("mulherComum", -212, "stand", { dy: 0.52, facing: 1, id: "lia" }),
        C("mulherComum", -270, "stand", { dy: 0.6, facing: 1, id: "raquel" }),
        C("jose", -304, "stand", { dy: 0.48, facing: 1, scale: 0.74 }),
        C("esau", 110, "walk", { dy: 0.48, facing: -1 }),
        C("multidao", 262, "stand", { dy: 0.18 }),
      ] }),
      // ---- O ABRAÇO: o coração do capítulo (storm cai a zero, a glória explode)
      b(4, { env: { storm: 0, night: 0.06, glory: 0.7 }, cast: [                     // Esaú CORREU, abraçou-o, beijou-o — E CHORARAM
        C("jaco", -16, "raise", { dy: 0.52, facing: 1 }),
        C("esau", 18, "raise", { dy: 0.52, facing: -1 }),
        C("mulherComum", -128, "stand", { dy: 0.58, facing: 1, id: "servaA" }),
        C("mulherComum", -166, "stand", { dy: 0.44, facing: 1, id: "servaB" }),
        C("mulherComum", -224, "stand", { dy: 0.54, facing: 1, id: "lia" }),
        C("mulherComum", -280, "stand", { dy: 0.62, facing: 1, id: "raquel" }),
        C("multidao", 264, "stand", { dy: 0.18 }),
      ] }),
      // ---- ATO 2: as famílias apresentadas, leva a leva
      b(5, { by: "esau", q: "e disse: ", env: { glory: 0.55 }, cast: [               // Quem são estes contigo? — os filhos que DEUS deu
        C("jaco", -30, "point", { dy: 0.54, facing: 1 }),
        C("esau", 26, "stand", { dy: 0.5, facing: -1 }),
        C("mulherComum", -110, "stand", { dy: 0.6, facing: 1, id: "servaA" }),
        C("mulherComum", -152, "stand", { dy: 0.46, facing: 1, id: "servaB" }),
        C("mulherComum", -212, "stand", { dy: 0.54, facing: 1, id: "lia" }),
        C("mulherComum", -270, "stand", { dy: 0.62, facing: 1, id: "raquel" }),
        C("multidao", 276, "stand", { dy: 0.18 }),
      ] }),
      b(6, { env: { glory: 0.5 }, cast: [                                            // chegaram as SERVAS e seus filhos: inclinaram-se
        C("jaco", -48, "stand", { dy: 0.54, facing: 1 }),
        C("esau", 34, "stand", { dy: 0.5, facing: -1 }),
        C("mulherComum", -8, "bow", { dy: 0.6, facing: 1, id: "servaA" }),
        C("mulherComum", -54, "bow", { dy: 0.44, facing: 1, id: "servaB" }),
        C("homem", -96, "bow", { dy: 0.64, facing: 1, scale: 0.72, id: "meninoA" }),
        C("homem", -140, "bow", { dy: 0.5, facing: 1, scale: 0.7, id: "meninoB" }),
        C("multidao", 276, "stand", { dy: 0.18 }),
      ] }),
      b(7, { env: { glory: 0.52 }, cast: [                                           // Lia e seus filhos; depois JOSÉ e RAQUEL — inclinaram-se
        C("jaco", -56, "stand", { dy: 0.54, facing: 1 }),
        C("esau", 36, "stand", { dy: 0.5, facing: -1 }),
        C("mulherComum", -10, "bow", { dy: 0.6, facing: 1, id: "lia" }),
        C("homem", -58, "bow", { dy: 0.46, facing: 1, scale: 0.72, id: "meninoA" }),
        C("mulherComum", -112, "bow", { dy: 0.62, facing: 1, id: "raquel" }),
        C("jose", -158, "bow", { dy: 0.5, facing: 1, scale: 0.74 }),
        C("multidao", 276, "stand", { dy: 0.18 }),
      ] }),
      // ---- ATO 3: o presente recusado e aceito
      b(8, { by: "esau", q: "E disse Esaú: ", env: { glory: 0.42 }, cast: [           // De que te serve todo este BANDO? — achar graça
        C("jaco", -34, "stand", { dy: 0.54, facing: 1 }),
        C("esau", 24, "point", { dy: 0.5, facing: -1 }),
        C("rebanho", -186, "stand", { dy: 0.34, id: "presenteA" }),
        C("rebanho", -278, "stand", { dy: 0.5, id: "presenteB" }),
        C("multidao", 276, "stand", { dy: 0.18 }),
      ] }),
      b(9, { by: "esau", env: { glory: 0.4 }, cast: [                                 // EU TENHO BASTANTE, MEU IRMÃO: seja para ti
        C("jaco", -34, "stand", { dy: 0.54, facing: 1 }),
        C("esau", 22, "raise", { dy: 0.5, facing: -1 }),
        C("rebanho", -186, "stand", { dy: 0.34, id: "presenteA" }),
        C("rebanho", -278, "stand", { dy: 0.5, id: "presenteB" }),
        C("multidao", 276, "stand", { dy: 0.18 }),
      ] }),
      b(10, { by: "jaco", q: "Então disse Jacó: ", env: { glory: 0.5 }, cast: [        // vi o teu ROSTO como se visse O ROSTO DE DEUS
        C("jaco", -28, "raise", { dy: 0.54, facing: 1 }),
        C("esau", 30, "stand", { dy: 0.5, facing: -1 }),
        C("rebanho", -186, "stand", { dy: 0.34, id: "presenteA" }),
        C("rebanho", -278, "stand", { dy: 0.5, id: "presenteB" }),
        C("multidao", 276, "stand", { dy: 0.18 }),
      ] }),
      b(11, { by: "jaco", env: { glory: 0.55 }, cast: [                                // toma a minha BÊNÇÃO — e instou até que a tomou
        C("jaco", -24, "point", { dy: 0.54, facing: 1 }),
        C("esau", 26, "bow", { dy: 0.5, facing: -1 }),
        C("rebanho", 150, "walk", { dy: 0.36, id: "presenteA" }),
        C("rebanho", 240, "walk", { dy: 0.5, id: "presenteB" }),
        C("multidao", 300, "stand", { dy: 0.18 }),
      ] }),
      // ---- ATO 4: os caminhos se separam
      b(12, { by: "esau", q: "E disse: ", env: { glory: 0.4 }, cast: [                 // Caminhemos — eu partirei ADIANTE de ti
        C("jaco", -30, "stand", { dy: 0.54, facing: 1 }),
        C("esau", 32, "walk", { dy: 0.5, facing: 1 }),
        C("multidao", 288, "stand", { dy: 0.18 }),
      ] }),
      b(13, { by: "jaco", q: "Porém ele lhe disse: ", env: { glory: 0.35 }, cast: [    // os filhos são TENROS; se as afadigarem, morrerá o rebanho
        C("jaco", -36, "point", { dy: 0.54, facing: 1 }),
        C("esau", 28, "stand", { dy: 0.5, facing: -1 }),
        C("rebanho", -170, "stand", { dy: 0.34, id: "gadoA" }),
        C("homem", -244, "stand", { dy: 0.6, facing: 1, scale: 0.72, id: "meninoA" }),
        C("multidao", 288, "stand", { dy: 0.18 }),
      ] }),
      b(14, { by: "jaco", env: { glory: 0.32 } }),                                     // passe meu senhor adiante; irei POUCO A POUCO até Seir
      b(15, { by: "jaco", q: "E ele disse: ", env: { glory: 0.3 }, cast: [             // Esaú oferece gente; Jacó: "Basta que ache graça"
        C("jaco", -34, "bow", { dy: 0.54, facing: 1 }),
        C("esau", 26, "point", { dy: 0.5, facing: -1 }),
        C("rebanho", -170, "stand", { dy: 0.34, id: "gadoA" }),
        C("multidao", 288, "stand", { dy: 0.18 }),
      ] }),
      b(16, { env: { night: 0.3, glory: 0.2 }, cast: [                                  // assim VOLTOU ESAÚ pelo seu caminho a SEIR
        C("jaco", -60, "stand", { dy: 0.54, facing: 1 }),
        C("esau", 214, "walk", { dy: 0.42, facing: 1 }),
        C("multidao", 316, "stand", { dy: 0.16 }),
      ] }),
      // ---- SUCOTE: casa e cabanas ao anoitecer
      b(17, { set: "sucote", props: SUCOTE, env: { terrain: "field", night: 0.45, glory: 0.25 }, cast: [
        C("jaco", -56, "stand", { dy: 0.54, facing: 1 }),
        C("mulherComum", -130, "stand", { dy: 0.6, facing: 1, id: "lia" }),
        C("mulherComum", -178, "stand", { dy: 0.46, facing: 1, id: "raquel" }),
        C("rebanho", 120, "stand", { dy: 0.36, id: "gadoA" }),
      ] }),                                                                             // partiu para SUCOTE: casa e CABANAS para o gado
      // ---- SIQUÉM: a tenda, o campo comprado e o altar
      b(18, { set: "siquem", props: SIQUEM, env: { terrain: "city", night: 0.15, glory: 0.35 }, cast: [
        C("jaco", -40, "walk", { dy: 0.54, facing: 1 }),
        C("mulherComum", -116, "walk", { dy: 0.6, facing: 1, id: "lia" }),
        C("mulherComum", -166, "walk", { dy: 0.46, facing: 1, id: "raquel" }),
        C("rebanho", 130, "stand", { dy: 0.34, id: "gadoA" }),
      ] }),                                                                             // chegou SALVO a Salém, cidade de Siquém: armou a tenda
      b(19, { props: SIQUEM_CAMPO, env: { glory: 0.4 }, cast: [                          // COMPROU o campo dos filhos de Hamor: cem peças
        C("jaco", -46, "point", { dy: 0.54, facing: 1 }),
        C("patriarca", 22, "stand", { dy: 0.5, facing: -1 }),
        C("homem", 84, "stand", { dy: 0.44, facing: -1, id: "filhoHamorA" }),
        C("homem", 128, "stand", { dy: 0.58, facing: -1, id: "filhoHamorB" }),
      ] }),
      b(20, { props: SIQUEM_ALTAR, env: { glory: 0.6, night: 0.1 }, cast: [              // o ALTAR: Deus, o Deus de Israel — EL-ELOÉ-ISRAEL
        C("jaco", -96, "kneel", { dy: 0.5, facing: -1 }),
        C("mulherComum", -22, "stand", { dy: 0.58, facing: -1, id: "lia" }),
        C("mulherComum", 26, "stand", { dy: 0.44, facing: -1, id: "raquel" }),
        C("jose", 78, "stand", { dy: 0.56, facing: -1, scale: 0.76 }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Gn 34
  // DINÁ E SIQUÉM. Arco de env: a manhã inocente da cidade (night 0.1,
  // glory 0.3) → O APAGÃO do v.2 (night 0.6, storm 0.3, glory 0 — a glória
  // sai de cena e NÃO volta em todo o capítulo) → o luto e a IRA dos irmãos
  // (storm 0.3) → a negociação, calma enganosa (storm 0.1) → a sombra do
  // ENGANO (night 0.4, storm 0.25) → a porta da cidade e o consentimento
  // (night 0.2) → AO TERCEIRO DIA: night 0.7, storm 0.6, fire 0.2 → o saque
  // (fire 0.25) e os presos (night 0.75) → o fim amargo (night 0.5, storm
  // 0.35, glory 0: nenhuma luz fecha este capítulo).
  34: {
    start: { terrain: "city", night: 0.1, glory: 0.3, storm: 0 },
    beats: [
      // ---- ATO 1: Diná sai, e a luz sai com ela
      b(1, { props: CIDADE, env: { glory: 0.3, night: 0.1 }, cast: [                    // DINÁ, filha de Lia, sai para ver as filhas da terra
        C("mulherComum", -40, "walk", { dy: 0.56, facing: 1, scale: 0.86, id: "dina" }),
        C("multidao", 236, "stand", { dy: 0.2 }),
      ] }),
      // DECORO ABSOLUTO: nada se encena. O elenco RECUA ao fundo, a cidade
      // engole a cena e o ambiente escurece — o versículo narra, o palco cala.
      b(2, { env: { night: 0.6, storm: 0.3, glory: 0 }, cast: [                          // Siquém, príncipe da terra, viu-a — e HUMILHOU-A
        C("mulherComum", -306, "stand", { dy: 0.04, facing: 1, scale: 0.66, id: "dina" }),
      ] }),
      b(3, { env: { night: 0.4, storm: 0.15 }, cast: [                                   // apegou-se a sua alma com Diná: amou a moça
        C("homem", 34, "stand", { dy: 0.5, facing: -1, id: "siquem" }),
        C("mulherComum", -46, "stand", { dy: 0.6, facing: 1, scale: 0.86, id: "dina" }),
      ] }),
      b(4, { by: "homem", q: "dizendo: ", env: { night: 0.35, storm: 0.1 }, cast: [       // Toma-me esta moça POR MULHER (a Hamor, seu pai)
        C("homem", -22, "point", { dy: 0.54, facing: 1, id: "siquem" }),
        C("patriarca", 40, "stand", { dy: 0.5, facing: -1, id: "hamor" }),
        C("mulherComum", -186, "stand", { dy: 0.5, facing: 1, scale: 0.82, id: "dina" }),
      ] }),
      // ---- ATO 2: o silêncio de Jacó e a ira dos filhos
      b(5, { set: "arraial", props: ARRAIAL, env: { night: 0.3, storm: 0.2 }, cast: [
        C("jaco", -20, "stand", { dy: 0.56 }),
        C("homem", 236, "walk", { dy: 0.36, facing: -1, id: "irmaoA" }),
        C("homem", 300, "walk", { dy: 0.5, facing: -1, id: "irmaoB" }),
        C("rebanho", 190, "stand", { dy: 0.3, id: "gadoA" }),
      ] }),                                                                              // Jacó ouviu — e CALOU-SE até que viessem os filhos
      b(6, { env: { storm: 0.18 }, cast: [                                               // saiu HAMOR, pai de Siquém, a falar com Jacó
        C("jaco", -34, "stand", { dy: 0.56, facing: 1 }),
        C("patriarca", 40, "walk", { dy: 0.5, facing: -1, id: "hamor" }),
        C("homem", 214, "walk", { dy: 0.36, facing: -1, id: "irmaoA" }),
        C("homem", 274, "walk", { dy: 0.5, facing: -1, id: "irmaoB" }),
      ] }),
      b(7, { env: { storm: 0.3, night: 0.35 }, cast: [                                   // vieram os filhos do campo: entristeceram-se e IRARAM-SE MUITO
        C("jaco", -12, "stand", { dy: 0.56, facing: 1 }),
        C("homem", -92, "raise", { dy: 0.6, facing: 1, id: "irmaoA" }),
        C("homem", -148, "point", { dy: 0.46, facing: 1, id: "irmaoB" }),
        C("patriarca", 52, "stand", { dy: 0.5, facing: -1, id: "hamor" }),
      ] }),
      // ---- ATO 3: a proposta de Hamor (a calma enganosa da negociação)
      b(8, { by: "patriarca", q: "dizendo: ", env: { storm: 0.2 }, cast: [                // a alma de meu filho está ENAMORADA: dai-lha por mulher
        C("patriarca", 30, "point", { dy: 0.5, facing: -1, id: "hamor" }),
        C("jaco", -32, "stand", { dy: 0.56, facing: 1 }),
        C("homem", -100, "stand", { dy: 0.6, facing: 1, id: "irmaoA" }),
        C("homem", -152, "stand", { dy: 0.46, facing: 1, id: "irmaoB" }),
      ] }),
      b(9, { by: "patriarca", env: { storm: 0.15 } }),                                    // aparentai-vos conosco: dai-nos as vossas filhas
      b(10, { by: "patriarca", env: { storm: 0.12 }, cast: [                               // habitareis conosco: a terra estará diante de vós
        C("patriarca", 26, "raise", { dy: 0.5, facing: -1, id: "hamor" }),
        C("jaco", -32, "stand", { dy: 0.56, facing: 1 }),
        C("homem", -100, "stand", { dy: 0.6, facing: 1, id: "irmaoA" }),
        C("homem", -152, "stand", { dy: 0.46, facing: 1, id: "irmaoB" }),
      ] }),
      b(11, { by: "homem", q: "e aos irmãos dela: ", env: { storm: 0.1 }, cast: [          // ACHE EU GRAÇA: darei o que me disserdes
        C("homem", 22, "bow", { dy: 0.52, facing: -1, id: "siquem" }),
        C("patriarca", 76, "stand", { dy: 0.44, facing: -1, id: "hamor" }),
        C("jaco", -36, "stand", { dy: 0.56, facing: 1 }),
        C("homem", -104, "stand", { dy: 0.6, facing: 1, id: "irmaoA" }),
        C("homem", -156, "stand", { dy: 0.46, facing: 1, id: "irmaoB" }),
      ] }),
      b(12, { by: "homem", env: { storm: 0.08 }, cast: [                                    // aumentai o DOTE e a dádiva: dai-me somente a moça
        C("homem", 20, "point", { dy: 0.52, facing: -1, id: "siquem" }),
        C("patriarca", 76, "stand", { dy: 0.44, facing: -1, id: "hamor" }),
        C("jaco", -36, "stand", { dy: 0.56, facing: 1 }),
        C("homem", -104, "stand", { dy: 0.6, facing: 1, id: "irmaoA" }),
        C("homem", -156, "stand", { dy: 0.46, facing: 1, id: "irmaoB" }),
      ] }),
      // ---- ATO 4: O ENGANO DA CIRCUNCISÃO (a sombra entra na negociação)
      b(13, { env: { storm: 0.25, night: 0.4 }, cast: [                                     // responderam ENGANOSAMENTE, porque violara a irmã
        C("homem", -60, "stand", { dy: 0.6, facing: 1, id: "irmaoA" }),
        C("homem", -112, "stand", { dy: 0.46, facing: 1, id: "irmaoB" }),
        C("homem", 30, "stand", { dy: 0.52, facing: -1, id: "siquem" }),
        C("patriarca", 84, "stand", { dy: 0.44, facing: -1, id: "hamor" }),
        C("jaco", -206, "stand", { dy: 0.54, facing: 1 }),
      ] }),
      b(14, { by: "homem", q: "E disseram-lhe: ", env: { storm: 0.22 }, cast: [              // não podemos dar nossa irmã a um não circuncidado
        C("homem", -44, "point", { dy: 0.6, facing: 1, id: "irmaoA" }),
        C("homem", -100, "stand", { dy: 0.46, facing: 1, id: "irmaoB" }),
        C("homem", 34, "stand", { dy: 0.52, facing: -1, id: "siquem" }),
        C("patriarca", 88, "stand", { dy: 0.44, facing: -1, id: "hamor" }),
      ] }),
      b(15, { by: "homem", env: { storm: 0.2 }, cast: [                                      // A ARMADILHA: que se circuncide todo o homem entre vós
        C("homem", -40, "raise", { dy: 0.6, facing: 1, id: "irmaoA" }),
        C("homem", -96, "point", { dy: 0.46, facing: 1, id: "irmaoB" }),
        C("homem", 34, "stand", { dy: 0.52, facing: -1, id: "siquem" }),
        C("patriarca", 88, "stand", { dy: 0.44, facing: -1, id: "hamor" }),
      ] }),
      b(16, { by: "homem", env: { storm: 0.18 } }),                                          // então seremos UM POVO, e habitaremos convosco
      b(17, { by: "homem", env: { storm: 0.24 }, cast: [                                     // mas se não vos circuncidardes: tomaremos a moça e iremos
        C("homem", -38, "point", { dy: 0.6, facing: 1, id: "irmaoA" }),
        C("homem", -94, "raise", { dy: 0.46, facing: 1, id: "irmaoB" }),
        C("homem", 36, "stand", { dy: 0.52, facing: -1, id: "siquem" }),
        C("patriarca", 90, "bow", { dy: 0.44, facing: -1, id: "hamor" }),
      ] }),
      b(18, { env: { storm: 0.12, night: 0.3 }, cast: [                                      // as palavras foram BOAS aos olhos de Hamor e Siquém
        C("patriarca", 40, "raise", { dy: 0.48, facing: -1, id: "hamor" }),
        C("homem", -6, "stand", { dy: 0.56, facing: -1, id: "siquem" }),
        C("homem", -104, "stand", { dy: 0.6, facing: 1, id: "irmaoA" }),
        C("homem", -156, "stand", { dy: 0.44, facing: 1, id: "irmaoB" }),
      ] }),
      b(19, { env: { night: 0.25 }, cast: [                                                  // não TARDOU o jovem: era o mais honrado da casa
        C("homem", 60, "walk", { dy: 0.5, facing: 1, id: "siquem" }),
        C("patriarca", 130, "walk", { dy: 0.42, facing: 1, id: "hamor" }),
        C("mulherComum", -160, "stand", { dy: 0.56, facing: 1, scale: 0.84, id: "dina" }),
      ] }),
      // ---- ATO 5: a cidade concorda, à porta
      b(20, { set: "porta", props: PORTA, env: { night: 0.2, storm: 0.1 }, cast: [
        C("patriarca", -34, "point", { dy: 0.5, facing: 1, id: "hamor" }),
        C("homem", 16, "stand", { dy: 0.58, facing: 1, id: "siquem" }),
        C("multidao", 208, "stand", { dy: 0.22 }),
      ] }),                                                                                  // Hamor e Siquém à PORTA DA CIDADE, falando aos homens
      b(21, { by: "patriarca", env: { storm: 0.08 }, cast: [                                  // estes homens são PACÍFICOS: a terra é larga
        C("patriarca", -30, "raise", { dy: 0.5, facing: 1, id: "hamor" }),
        C("homem", 20, "stand", { dy: 0.58, facing: 1, id: "siquem" }),
        C("multidao", 196, "stand", { dy: 0.22 }),
      ] }),
      b(22, { by: "patriarca", env: { storm: 0.1 } }),                                         // A CONDIÇÃO: se todo o homem entre nós se circuncidar
      b(23, { by: "patriarca", env: { storm: 0.16 }, cast: [                                   // e o seu GADO não será nosso? Consintamos com eles
        C("patriarca", -26, "point", { dy: 0.5, facing: 1, id: "hamor" }),
        C("homem", 24, "stand", { dy: 0.58, facing: 1, id: "siquem" }),
        C("multidao", 186, "stand", { dy: 0.22 }),
        C("rebanho", 296, "stand", { dy: 0.42, id: "gadoA" }),
      ] }),
      b(24, { env: { night: 0.3, storm: 0.2 }, cast: [                                         // DERAM OUVIDOS: circuncidado todo o homem da cidade
        C("multidao", 60, "stand", { dy: 0.26 }),
        C("patriarca", -46, "raise", { dy: 0.5, facing: 1, id: "hamor" }),
        C("homem", -4, "stand", { dy: 0.6, facing: 1, id: "siquem" }),
      ] }),
      // ---- ATO 6: AO TERCEIRO DIA — a vingança. NADA de morte encenada: só a
      // noite, a tempestade, o fogo no ambiente e a cidade que fica VAZIA.
      b(25, { set: "vinganca", props: PORTA_NOITE, env: { night: 0.7, storm: 0.6, fire: 0.2 }, cast: [
        C("homem", -54, "walk", { dy: 0.56, facing: 1, id: "simeao" }),
        C("homem", -104, "walk", { dy: 0.42, facing: 1, id: "levi" }),
      ] }),                                                                                    // Simeão e Levi entram AFOITAMENTE na cidade
      b(26, { env: { night: 0.72, storm: 0.55 }, cast: [                                       // tomaram DINÁ da casa de Siquém — e saíram
        C("homem", 40, "stand", { dy: 0.54, facing: -1, id: "simeao" }),
        C("mulherComum", -18, "walk", { dy: 0.6, facing: -1, scale: 0.86, id: "dina" }),
        C("homem", -76, "walk", { dy: 0.44, facing: -1, id: "levi" }),
      ] }),
      b(27, { env: { night: 0.7, storm: 0.5, fire: 0.25 }, cast: [                              // os filhos de Jacó SAQUEARAM a cidade
        C("homem", -30, "point", { dy: 0.56, facing: 1, id: "simeao" }),
        C("homem", -88, "stand", { dy: 0.42, facing: 1, id: "levi" }),
        C("multidao", 250, "stand", { dy: 0.16 }),
      ] }),
      b(28, { env: { storm: 0.45, fire: 0.2 }, cast: [                                          // as ovelhas, as vacas, os jumentos: tomaram tudo
        C("rebanho", 130, "walk", { dy: 0.34, id: "despojoA" }),
        C("rebanho", 240, "walk", { dy: 0.48, id: "despojoB" }),
        C("homem", -40, "walk", { dy: 0.56, facing: -1, id: "simeao" }),
        C("homem", -96, "walk", { dy: 0.42, facing: -1, id: "levi" }),
      ] }),
      b(29, { env: { night: 0.75, storm: 0.4, fire: 0.12 }, cast: [                              // os bens, os meninos e as mulheres, levados PRESOS
        C("mulherComum", 30, "walk", { dy: 0.6, facing: -1, id: "cativaA" }),
        C("mulherComum", 88, "walk", { dy: 0.44, facing: -1, id: "cativaB" }),
        C("homem", 146, "walk", { dy: 0.62, facing: -1, scale: 0.72, id: "meninoA" }),
        C("homem", -60, "walk", { dy: 0.5, facing: -1, id: "simeao" }),
        C("rebanho", 250, "walk", { dy: 0.36, id: "despojoA" }),
      ] }),
      // ---- FIM AMARGO: a repreensão e a réplica sem resposta
      b(30, { by: "jaco", q: "Então disse Jacó a Simeão e a Levi: ", set: "tendas", props: ARRAIAL, env: { night: 0.6, storm: 0.3, fire: 0, glory: 0 }, cast: [
        C("jaco", -30, "point", { dy: 0.56, facing: 1 }),
        C("homem", 36, "stand", { dy: 0.52, facing: -1, id: "simeao" }),
        C("homem", 92, "stand", { dy: 0.42, facing: -1, id: "levi" }),
        C("mulherComum", -160, "stand", { dy: 0.6, facing: 1, scale: 0.86, id: "dina" }),
      ] }),                                                                                     // TENDES-ME TURBADO: serei destruído, eu e minha casa
      b(31, { by: "homem", q: "E eles disseram: ", env: { night: 0.5, storm: 0.35, glory: 0 }, cast: [
        C("jaco", -40, "stand", { dy: 0.56, facing: 1 }),
        C("homem", 30, "raise", { dy: 0.52, facing: -1, id: "simeao" }),
        C("homem", 86, "point", { dy: 0.42, facing: -1, id: "levi" }),
        C("mulherComum", -164, "stand", { dy: 0.6, facing: 1, scale: 0.86, id: "dina" }),
      ] }),                                                                                     // Devia ele TRATAR a nossa irmã como a uma prostituta?
    ],
  },
};
