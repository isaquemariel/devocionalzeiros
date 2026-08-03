// ============================================================================
// GÊNESIS — cena viva, caps. 47–48 (JACÓ DIANTE DE FARAÓ e AS MÃOS CRUZADAS).
//
// Cap. 47: dois palcos e dois impérios. Primeiro a SALA DE FARAÓ — cinco irmãos
// pastores diante do trono do maior rei do mundo, pedindo pasto (v.1–6). Então
// o momento silenciosamente maior de Gênesis inteiro: o velho beduíno JACÓ é
// apresentado ao trono e ABENÇOA FARAÓ (v.7 e v.10, a bênção repetida como
// moldura). Ele não pede nada: chama a própria vida de "peregrinação", "poucos
// e maus foram os dias" (v.9) — e o menor abençoa o maior (glory 0.5). Depois o
// palco vira EGITO NA FOME, e o capítulo desce em quatro degraus, cada um com
// os seus beats: o DINHEIRO (v.14), o GADO (v.16–17), a TERRA E OS CORPOS
// (v.18–21, night 0.35 — o povo vende a si mesmo), a exceção dos SACERDOTES
// (v.22, altar no corredor de extras) e a SEMENTE com o quinto de Faraó
// (v.23–26, sheaf + glory 0.3 — "A vida nos tens dado"). O contraste é o
// argumento: enquanto o Egito se vende, ISRAEL FRUTIFICA em Gósen (v.27).
// Fecha na tenda: dezessete anos, cento e quarenta e sete anos, a mão debaixo
// da coxa e o JURAMENTO de não ser sepultado no Egito (v.28–31) — night 0.4 com
// glory 0.4, porque o velho já não olha para o Nilo, olha para a promessa.
//
// Cap. 48: A BÊNÇÃO TROCADA. José chega com Manassés e Efraim; Israel se
// esforça e SE ASSENTA na cama (v.2) — o corpo que morre ainda se levanta para
// abençoar. Ele volta a Luz/Betel (v.3–4), ADOTA os dois netos como filhos
// ("Efraim e Manassés serão meus", v.5) e, no meio do documento de adoção,
// para para lembrar RAQUEL morta no caminho de Efrata (v.7, night 0.3 — a
// sepultura no corredor de extras). Os olhos carregados de velhice não
// reconhecem os meninos (v.8), mas os braços reconhecem: beijos, abraços, e a
// frase que resume o livro — "não cuidara ver o teu rosto; e eis que Deus me
// fez ver também a tua descendência" (v.11, glory 0.6).
// O beat central é o v.14: José posiciona Manassés à direita de Israel e Efraim
// à esquerda (v.13, geometria real no palco: direita de Israel = dx negativo),
// e ISRAEL CRUZA OS BRAÇOS DE PROPÓSITO. José tenta corrigir a mão (v.17–18) e
// ouve "Eu o sei, meu filho, eu o sei" (v.19): a eleição não segue a ordem de
// nascimento. Termina com Efraim POSTO DIANTE de Manassés (v.20) e a porção de
// terra a mais (v.22).
//
// DEUS NUNCA É DESENHADO: "O Deus Todo-Poderoso me apareceu em Luz" (48:3), "o
// Deus que me sustentou" e "O ANJO que me livrou de todo o mal" (48:15–16) são
// LUZ no ambiente — glory subindo sobre o leito —, jamais figura em cena. O
// "anjo" do v.16 é memória dentro da fala do patriarca: nenhum `anjo` entra no
// elenco.
//
// Elenco: `jaco` = Israel; `jose` com glow ~0.35 (o governador do Egito);
// `farao` no trono; `homem` SEM id = a voz dos irmãos (cap. 47, v.3–4) e depois
// a voz do povo egípcio (v.15–25) — é ele que leva o balão; `homem` com id
// ("irmao", "sacerdote"…) = figurantes que nunca falam; `multidao` = os irmãos
// e o povo do Egito; `rebanho` = as ovelhas e vacas de Gósen e o gado entregue
// a José; `pastor` com ids "manasses"/"efraim" (scale ~0.8) = os dois meninos;
// `servo` = o que anuncia a chegada de José (48:2).
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ------------------------------------------------------------------ Gn 47: sets
// A SALA DE FARAÓ: o trono ao fundo à direita, as torres do palácio, o portão
// pesado, candeeiros acesos, tamareiras do pátio. O corredor dx -100..-190 fica
// LIVRE — é a vaga dos extras do versículo.
const PALACIO: StagePropSpec[] = [
  P("throne", 98, 1.3, undefined, 0.08),        // o trono de Faraó
  P("tower", 300, 1.4, undefined, 0.03),        // as torres do palácio
  P("tower", -300, 1.25, undefined, 0.06),
  P("door", 232, 1.2, undefined, 0.14),         // o portão da sala
  P("lampstand", -62, 1.05, 1, 0.22),
  P("lampstand", 36, 1.0, 1, 0.3),
  P("palm", 162, 1.1, undefined, 0.2),
  P("palm", -228, 1.05, undefined, 0.1),
  P("amphora", -262, 0.9, undefined, 0.52),
  P("crate", 254, 0.9, undefined, 0.58),
  P("bush", 122, 0.8, undefined, 0.64),
  P("grass", -24, 1.0, undefined, 0.92),
  P("grass", 200, 0.95, undefined, 0.8),
  P("grass", 288, 0.9, undefined, 0.46),
];

// GÓSEN, "o melhor da terra", na terra de Ramessés: as tendas de Israel, o
// braço do Nilo que rega o pasto, o poço, a sombra que não havia em Canaã.
const GOSEN: StagePropSpec[] = [
  P("river", -20, 1.1, undefined, 0.12),        // a água do Egito — o pasto verde
  P("tent", -282, 1.3, undefined, 0.16),        // a tenda de Israel, o pai
  P("tent", 240, 1.15, undefined, 0.22),        // as tendas das famílias
  P("tent", 306, 1.0, undefined, 0.42),
  P("well", 318, 1.0, undefined, 0.64),
  P("tree", 74, 1.15, undefined, 0.06),
  P("palm", 156, 1.05, undefined, 0.22),
  P("bush", -58, 0.85, undefined, 0.32),
  P("bush", 124, 0.8, undefined, 0.68),
  P("amphora", -252, 0.85, undefined, 0.54),
  P("crate", -216, 0.9, undefined, 0.42),
  P("grass", -232, 0.9, undefined, 0.84),
  P("grass", 58, 1.0, undefined, 0.9),
  P("grass", 272, 0.95, undefined, 0.74),
];

// v.12 — "E José sustentou de pão a seu pai, seus irmãos e toda a casa de seu
// pai": o feixe e o cesto da ração entram no corredor de extras. Enquanto o
// mundo desfalece, esta casa come.
const GOSEN_PAO: StagePropSpec[] = [
  ...GOSEN,
  P("sheaf", -142, 1.1, undefined, 0.18),       // o mantimento segundo as famílias
  P("crate", -106, 0.95, undefined, 0.34),
];

// v.27 — "frutificaram, e multiplicaram-se muito": a mesma Gósen, agora cheia —
// mais uma tenda, o gado e os feixes da colheita própria.
const GOSEN_CHEIA: StagePropSpec[] = [
  ...GOSEN,
  P("tent", 186, 1.05, undefined, 0.34),        // a possessão que cresce
  P("sheaf", -134, 1.1, undefined, 0.2),
  P("sheaf", -172, 1.0, undefined, 0.38),
];

// O EGITO NA FOME: a rua da cidade onde o povo vem a José. Banca vazia, ânfora
// tombada, palmeira sem fruto, poço no fim da praça. Cenografia da escassez.
const EGITO_FOME: StagePropSpec[] = [
  P("tower", 300, 1.4, undefined, 0.03),        // a cidade de Faraó ao fundo
  P("tower", -300, 1.2, undefined, 0.08),
  P("door", 240, 1.2, undefined, 0.14),         // o celeiro do rei, guardado
  P("stall", -238, 1.0, undefined, 0.2),        // a banca do mercado, vazia
  P("well", 318, 1.0, undefined, 0.66),
  P("palm", 152, 1.0, undefined, 0.22),         // tamareira sem fruto
  P("rock", -320, 0.9, undefined, 0.44),
  P("amphora", -60, 0.85, undefined, 0.88),     // a ânfora tombada, sem trigo
  P("crate", 62, 0.85, undefined, 0.9),
  P("bush", 98, 0.75, undefined, 0.6),
  P("grass", -20, 0.85, undefined, 0.95),
  P("grass", 202, 0.85, undefined, 0.78),
];

// v.14 — "José recolheu TODO o dinheiro que se achou na terra do Egito e na
// terra de Canaã… e trouxe o dinheiro à casa de Faraó": as arcas de prata em
// fila no corredor de extras. Degrau 1 da entrega.
const FOME_DINHEIRO: StagePropSpec[] = [
  ...EGITO_FOME,
  P("crate", -138, 1.1, undefined, 0.18),       // o dinheiro do Egito
  P("crate", -178, 1.0, undefined, 0.36),       // e o dinheiro de Canaã
];

// v.22 — "somente a terra dos sacerdotes não a comprou": o altar do Egito fica
// de pé no meio da venda geral. Degrau 3 tem uma exceção — e ela é religiosa.
const FOME_SACERDOTES: StagePropSpec[] = [
  ...EGITO_FOME,
  P("altar", -146, 1.05, undefined, 0.22),      // a porção dos sacerdotes, intocada
];

// v.23–26 — "eis aí tendes SEMENTE para vós, para que semeeis a terra": os
// feixes voltam ao palco e o quinto de Faraó é separado à vista. Degrau 4 é o
// único que devolve algo — e é por ele que o povo diz "A vida nos tens dado".
const FOME_SEMENTE: StagePropSpec[] = [
  ...EGITO_FOME,
  P("sheaf", -128, 1.15, undefined, 0.16),      // a semente entregue ao povo
  P("sheaf", -170, 1.0, undefined, 0.34),
  P("crate", -100, 0.9, undefined, 0.08),       // o quinto que sobe a Faraó
];

// A TENDA DE JACÓ (47:28–31 e todo o cap. 48): a tenda grande do patriarca com
// a cama ao fundo, dois candeeiros velando, a sombra da tamareira. O corredor
// -100..-190 fica LIVRE: por ali passam a sepultura de Raquel, o altar dos pais
// e a porção de terra a mais.
const TENDA_JACO: StagePropSpec[] = [
  P("tent", 0, 1.55, undefined, 0.05),          // a tenda do patriarca — a cama ao fundo
  P("lampstand", -70, 1.05, 1, 0.28),           // os candeeiros que velam o velho
  P("lampstand", 88, 1.0, 1, 0.32),
  P("tree", -300, 1.15, undefined, 0.1),
  P("palm", 262, 1.05, undefined, 0.16),
  P("bush", 204, 0.8, undefined, 0.52),
  P("amphora", -42, 0.85, undefined, 0.88),
  P("crate", 124, 0.85, undefined, 0.74),
  P("grass", -240, 0.9, undefined, 0.82),
  P("grass", 44, 0.95, undefined, 0.94),
  P("grass", 300, 0.9, undefined, 0.6),
];

// 48:7 — "morreu-me Raquel no caminho… e eu a sepultei ali, no caminho de
// Efrata, que é Belém": a pedra da sepultura entra no corredor como MEMÓRIA.
// O documento de adoção para no meio para chorar uma mulher morta há 40 anos.
const TENDA_RAQUEL: StagePropSpec[] = [
  ...TENDA_JACO,
  P("rock", -150, 1.05, undefined, 0.2),        // a sepultura no caminho de Efrata
];

// 48:15–16 — "O Deus, em cuja presença andaram os meus pais Abraão e Isaque":
// o altar dos pais no corredor de extras. A bênção não nasce em Jacó; ela vem
// de trás dele. (A presença é LUZ no ambiente, nunca figura.)
const TENDA_PAIS: StagePropSpec[] = [
  ...TENDA_JACO,
  P("altar", -144, 1.05, undefined, 0.22),      // o altar de Abraão e de Isaque
];

// 48:22 — "eu tenho dado a ti um pedaço da terra a mais do que a teus irmãos":
// o feixe da porção extra — herança de Canaã prometida do leito de morte.
const TENDA_PORCAO: StagePropSpec[] = [
  ...TENDA_PAIS,
  P("sheaf", -114, 1.1, undefined, 0.14),       // o pedaço de terra a mais
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Gn 47
  // Arco de env: a sala clara de Faraó (night 0.18, glory 0.25) → a audiência
  // dos pastores (0.3) → A BÊNÇÃO DO VELHO SOBRE O REI, ponto alto de luz do
  // capítulo (glory 0.5) → Gósen concedida (field, glory 0.45) → A FOME abre
  // como praga (storm 0.28, night 0.3, glory 0.06) → o dinheiro, o gado
  // (storm 0.32) → A TERRA E OS CORPOS, o fundo do poço (night 0.35) → a
  // semente devolvida (glory 0.3) → Israel frutificando em Gósen (glory 0.5,
  // night 0.1) → e a tenda do juramento fechando em night 0.4 / glory 0.4.
  47: {
    start: { terrain: "city", night: 0.18, glory: 0.25, storm: 0, fire: 0 },
    beats: [
      b(1, { by: "jose", q: "e disse: ", props: PALACIO, cast: [                        // "Meu pai e os meus irmãos… estão na terra de Gósen"
        C("farao", 92, "stand", { glow: 0.2, dy: 0.3, facing: -1 }),
        C("jose", -10, "point", { glow: 0.35, dy: 0.46, facing: 1 }),
      ] }),
      b(2, { env: { glory: 0.28 }, cast: [                                              // tomou CINCO HOMENS e os pôs diante de Faraó
        C("farao", 92, "stand", { glow: 0.2, dy: 0.3, facing: -1 }),
        C("jose", -14, "stand", { glow: 0.35, dy: 0.46, facing: 1 }),
        C("homem", -58, "walk", { dy: 0.54, facing: 1 }),
        C("homem", -100, "walk", { id: "irmao", dy: 0.6, facing: 1 }),
        C("multidao", 196, "stand", { dy: 0.32 }),
      ] }),
      b(3, { by: "homem", q: "E eles disseram a Faraó: ", cast: [                        // "Qual é o vosso negócio?" — "Teus servos são PASTORES DE OVELHAS"
        C("farao", 92, "point", { glow: 0.2, dy: 0.3, facing: -1 }),
        C("jose", -18, "stand", { glow: 0.35, dy: 0.46, facing: 1 }),
        C("homem", -54, "stand", { dy: 0.54, facing: 1 }),
        C("homem", -96, "stand", { id: "irmao", dy: 0.6, facing: 1 }),
        C("multidao", 196, "stand", { dy: 0.32 }),
      ] }),
      b(4, { by: "homem", q: "Disseram mais a Faraó: ", cast: [                          // "Viemos para PEREGRINAR nesta terra… habitem em Gósen"
        C("farao", 92, "stand", { glow: 0.2, dy: 0.3, facing: -1 }),
        C("jose", -18, "stand", { glow: 0.35, dy: 0.46, facing: 1 }),
        C("homem", -50, "bow", { dy: 0.54 }),
        C("homem", -92, "bow", { id: "irmao", dy: 0.6 }),
        C("multidao", 196, "bow", { dy: 0.32 }),
      ] }),
      b(5, { by: "farao", q: "dizendo: ", env: { glory: 0.3 }, cast: [                   // "Teu pai e teus irmãos vieram a ti"
        C("farao", 86, "point", { glow: 0.25, dy: 0.32, facing: -1 }),
        C("jose", -6, "stand", { glow: 0.35, dy: 0.46, facing: 1 }),
        C("homem", -50, "bow", { dy: 0.54 }),
        C("homem", -92, "bow", { id: "irmao", dy: 0.6 }),
        C("multidao", 196, "bow", { dy: 0.32 }),
      ] }),
      b(6, { by: "farao", env: { glory: 0.34 }, cast: [                                  // "no MELHOR da terra… os porás por MAIORAIS DO GADO"
        C("farao", 80, "raise", { glow: 0.25, dy: 0.32, facing: -1 }),
        C("jose", -6, "stand", { glow: 0.35, dy: 0.46, facing: 1 }),
        C("homem", -50, "stand", { dy: 0.54, facing: 1 }),
        C("homem", -92, "stand", { id: "irmao", dy: 0.6, facing: 1 }),
        C("multidao", 196, "stand", { dy: 0.32 }),
      ] }),
      b(7, { env: { glory: 0.42 }, cast: [                                               // JACÓ APRESENTADO AO TRONO — e o velho ABENÇOA FARAÓ
        C("farao", 84, "stand", { glow: 0.25, dy: 0.32, facing: -1 }),
        C("jose", -52, "walk", { glow: 0.35, dy: 0.5, facing: 1 }),
        C("jaco", -4, "raise", { dy: 0.48, facing: 1 }),
        C("homem", 150, "bow", { dy: 0.3 }),
        C("homem", 196, "bow", { id: "irmao", dy: 0.32 }),
        C("multidao", 250, "bow", { dy: 0.28 }),
      ] }),
      b(8, { by: "farao", q: "E Faraó disse a Jacó: ", cast: [                            // "QUANTOS SÃO OS DIAS DOS ANOS DA TUA VIDA?"
        C("farao", 78, "point", { glow: 0.25, dy: 0.32, facing: -1 }),
        C("jose", -58, "stand", { glow: 0.35, dy: 0.5, facing: 1 }),
        C("jaco", 4, "stand", { dy: 0.48, facing: 1 }),
        C("homem", 150, "bow", { dy: 0.3 }),
        C("homem", 196, "bow", { id: "irmao", dy: 0.32 }),
        C("multidao", 250, "bow", { dy: 0.28 }),
      ] }),
      b(9, { by: "jaco", q: "E Jacó disse a Faraó: ", env: { glory: 0.46 }, cast: [        // "cento e trinta anos; POUCOS E MAUS foram os dias… peregrinações"
        C("farao", 78, "stand", { glow: 0.25, dy: 0.32, facing: -1 }),
        C("jaco", 0, "point", { glow: 0.25, dy: 0.48, facing: 1 }),
        C("jose", -62, "stand", { glow: 0.35, dy: 0.5, facing: 1 }),
        C("homem", 150, "bow", { dy: 0.3 }),
        C("homem", 196, "bow", { id: "irmao", dy: 0.32 }),
        C("multidao", 250, "bow", { dy: 0.28 }),
      ] }),
      b(10, { env: { glory: 0.5 }, cast: [                                                // A BÊNÇÃO OUTRA VEZ: o menor abençoa o maior — e sai da sua presença
        C("farao", 74, "bow", { glow: 0.25, dy: 0.32, facing: -1 }),
        C("jaco", -10, "raise", { glow: 0.4, dy: 0.48, facing: 1 }),
        C("jose", -70, "stand", { glow: 0.35, dy: 0.5, facing: 1 }),
        C("homem", 150, "bow", { dy: 0.3 }),
        C("homem", 196, "bow", { id: "irmao", dy: 0.32 }),
        C("multidao", 250, "bow", { dy: 0.28 }),
      ] }),
      b(11, { set: "gosen", props: GOSEN, env: { terrain: "field", night: 0.1, glory: 0.45 }, cast: [  // possessão em RAMESSÉS, no melhor da terra
        C("jose", -20, "point", { glow: 0.35, dy: 0.46, facing: 1 }),
        C("jaco", 34, "stand", { dy: 0.5, facing: -1 }),
        C("homem", 96, "stand", { dy: 0.56 }),
        C("homem", 140, "stand", { id: "irmao", dy: 0.6 }),
        C("multidao", 220, "stand", { dy: 0.34 }),
        C("rebanho", 292, "stand", { dy: 0.44 }),
      ] }),
      b(12, { props: GOSEN_PAO, env: { glory: 0.5 }, cast: [                               // José SUSTENTOU DE PÃO toda a casa de seu pai
        C("jose", -40, "point", { glow: 0.4, dy: 0.46, facing: 1 }),
        C("jaco", 24, "stand", { dy: 0.5, facing: -1 }),
        C("homem", 88, "kneel", { dy: 0.56 }),
        C("homem", 132, "kneel", { id: "irmao", dy: 0.6 }),
        C("multidao", 214, "stand", { dy: 0.34 }),
        C("rebanho", 292, "stand", { dy: 0.44 }),
      ] }),
      b(13, { set: "fome", props: EGITO_FOME, env: { terrain: "city", night: 0.3, storm: 0.28, glory: 0.06 }, cast: [  // NÃO HAVIA PÃO: Egito e Canaã DESFALECIAM
        C("multidao", 150, "stand", { dy: 0.36 }),
        C("homem", 46, "bow", { dy: 0.56 }),
      ] }),
      b(14, { props: FOME_DINHEIRO, env: { storm: 0.3 }, cast: [                           // DEGRAU 1: todo o dinheiro recolhido à casa de Faraó
        C("jose", -30, "point", { glow: 0.35, dy: 0.44, facing: 1 }),
        C("homem", 50, "kneel", { dy: 0.56 }),
        C("multidao", 170, "stand", { dy: 0.36 }),
      ] }),
      b(15, { by: "multidao", q: "dizendo: ", env: { night: 0.32 }, cast: [                 // "DÁ-NOS PÃO; por que morreremos em tua presença?"
        C("jose", -34, "stand", { glow: 0.35, dy: 0.44, facing: 1 }),
        C("homem", 30, "raise", { dy: 0.56 }),
        C("multidao", 130, "raise", { dy: 0.38 }),
      ] }),
      b(16, { by: "jose", q: "E José disse: ", cast: [                                      // "DAI O VOSSO GADO, e eu vo-lo darei por vosso gado"
        C("jose", -30, "point", { glow: 0.35, dy: 0.44, facing: 1 }),
        C("homem", 34, "bow", { dy: 0.56 }),
        C("multidao", 140, "stand", { dy: 0.38 }),
      ] }),
      b(17, { env: { storm: 0.32, glory: 0.1 }, cast: [                                     // DEGRAU 2: cavalos, ovelhas, vacas e jumentos entregues por pão
        C("jose", -46, "stand", { glow: 0.35, dy: 0.44, facing: 1 }),
        C("homem", 20, "walk", { dy: 0.56, facing: -1 }),
        C("rebanho", 120, "walk", { dy: 0.46, facing: -1 }),
        C("multidao", 234, "walk", { dy: 0.36, facing: -1 }),
      ] }),
      b(18, { by: "multidao", q: "disseram-lhe: ", env: { night: 0.34, glory: 0.06 }, cast: [ // O SEGUNDO ANO: "senão o nosso corpo e a nossa terra"
        C("jose", -40, "stand", { glow: 0.35, dy: 0.44, facing: 1 }),
        C("homem", 26, "kneel", { dy: 0.58 }),
        C("multidao", 130, "kneel", { dy: 0.4 }),
      ] }),
      b(19, { by: "multidao", env: { night: 0.35, storm: 0.34 }, cast: [                     // DEGRAU 3: "Compra-nos a nós e a nossa terra… e dá-nos semente"
        C("jose", -40, "stand", { glow: 0.35, dy: 0.44, facing: 1 }),
        C("homem", 20, "bow", { dy: 0.58 }),
        C("multidao", 120, "bow", { dy: 0.4 }),
      ] }),
      b(20, { env: { night: 0.35, storm: 0.3, glory: 0.08 }, cast: [                         // toda a terra do Egito comprada — a terra ficou sendo de Faraó
        C("jose", -30, "point", { glow: 0.35, dy: 0.44, facing: 1 }),
        C("homem", 40, "lie", { dy: 0.6 }),
        C("multidao", 160, "bow", { dy: 0.4 }),
      ] }),
      b(21, { env: { night: 0.33 }, cast: [                                                  // e fez o POVO passar às cidades, de uma extremidade à outra
        C("jose", -60, "stand", { glow: 0.35, dy: 0.44, facing: 1 }),
        C("multidao", 40, "walk", { dy: 0.42, facing: 1 }),
        C("homem", 190, "walk", { dy: 0.56, facing: 1 }),
      ] }),
      b(22, { props: FOME_SACERDOTES, env: { night: 0.28, glory: 0.16 }, cast: [              // SÓ A TERRA DOS SACERDOTES não foi comprada
        C("jose", -34, "stand", { glow: 0.35, dy: 0.44, facing: 1 }),
        C("homem", 48, "stand", { id: "sacerdote", glow: 0.15, dy: 0.5, facing: -1 }),
        C("homem", 96, "stand", { id: "sacerdote2", glow: 0.12, dy: 0.56, facing: -1 }),
        C("homem", 200, "stand", { dy: 0.6 }),
        C("multidao", 262, "stand", { dy: 0.38 }),
      ] }),
      b(23, { by: "jose", q: "Então disse José ao povo: ", props: FOME_SEMENTE, env: { night: 0.22, glory: 0.24, storm: 0.18 }, cast: [  // DEGRAU 4: "eis aí tendes SEMENTE… para que semeeis a terra"
        C("jose", -28, "point", { glow: 0.4, dy: 0.44, facing: 1 }),
        C("homem", 40, "kneel", { dy: 0.56 }),
        C("multidao", 150, "stand", { dy: 0.38 }),
      ] }),
      b(24, { by: "jose", env: { glory: 0.26 } }),                                            // O QUINTO a Faraó; as quatro partes serão vossas
      b(25, { by: "homem", q: "E disseram: ", env: { glory: 0.3, storm: 0.1 }, cast: [         // "A VIDA NOS TENS DADO… seremos servos de Faraó"
        C("jose", -30, "stand", { glow: 0.4, dy: 0.44, facing: 1 }),
        C("homem", 34, "raise", { dy: 0.56 }),
        C("multidao", 140, "bow", { dy: 0.38 }),
      ] }),
      b(26, { env: { glory: 0.28, storm: 0 } }),                                              // o ESTATUTO do quinto, até ao dia de hoje
      b(27, { set: "gosenCheia", props: GOSEN_CHEIA, env: { terrain: "field", night: 0.1, glory: 0.5 }, cast: [  // ISRAEL frutificou e MULTIPLICOU-SE MUITO em Gósen
        C("jaco", -24, "stand", { dy: 0.48 }),
        C("jose", 30, "stand", { glow: 0.4, dy: 0.44, facing: -1 }),
        C("multidao", 172, "stand", { dy: 0.36 }),
        C("rebanho", 268, "stand", { dy: 0.46 }),
      ] }),
      b(28, { env: { night: 0.24, glory: 0.42 }, cast: [                                       // DEZESSETE ANOS no Egito: cento e quarenta e sete anos de vida
        C("jaco", -34, "walk", { dy: 0.5 }),
        C("jose", 40, "stand", { glow: 0.4, dy: 0.44, facing: -1 }),
        C("multidao", 190, "stand", { dy: 0.36 }),
        C("rebanho", 280, "stand", { dy: 0.46 }),
      ] }),
      b(29, { by: "jaco", q: "e disse-lhe: ", set: "tenda", props: TENDA_JACO, env: { night: 0.4, glory: 0.32 }, cast: [  // A MÃO DEBAIXO DA COXA: "rogo-te que NÃO ME ENTERRES NO EGITO"
        C("jaco", -14, "lie", { dy: 0.5 }),
        C("jose", 52, "kneel", { glow: 0.35, dy: 0.58, facing: -1 }),
      ] }),
      b(30, { by: "jose", q: "E ele disse: ", env: { glory: 0.36 }, cast: [                     // "que eu jaza com os meus pais" — "Farei conforme a tua palavra"
        C("jaco", -14, "lie", { dy: 0.5 }),
        C("jose", 40, "kneel", { glow: 0.4, dy: 0.56, facing: -1 }),
      ] }),
      b(31, { by: "jaco", q: "E disse ele: ", env: { night: 0.4, glory: 0.4 }, cast: [           // "JURA-ME" — e Israel inclinou-se sobre a cabeceira da cama
        C("jaco", -16, "bow", { glow: 0.3, dy: 0.5 }),
        C("jose", 44, "kneel", { glow: 0.4, dy: 0.56, facing: -1 }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Gn 48
  // Arco de env: a tenda do enfermo (night 0.38, glory 0.28) → Luz/Betel
  // acendendo a memória da promessa (glory 0.5–0.55) → a adoção (0.5) → RAQUEL
  // no caminho de Efrata, o único recuo do capítulo (night 0.3 sobre glory
  // 0.35) → "Deus me fez ver também a tua descendência" (glory 0.6) → AS MÃOS
  // CRUZADAS (0.7) → A BÊNÇÃO, o ápice (glory 0.8) → a correção recusada (0.68)
  // → "o seu irmão menor será maior que ele" (0.75) → e o fecho profético em
  // 0.7 com night baixando: o velho morre, mas a luz fica com os meninos.
  48: {
    start: { terrain: "field", night: 0.38, glory: 0.28, storm: 0, fire: 0 },
    beats: [
      b(1, { set: "tenda", props: TENDA_JACO, cast: [                                        // "teu pai está ENFERMO": José toma consigo Manassés e Efraim
        C("jaco", -20, "lie", { dy: 0.5 }),
        C("jose", 124, "walk", { glow: 0.35, dy: 0.52, facing: -1 }),
        C("pastor", 188, "walk", { id: "manasses", dy: 0.6, scale: 0.82, facing: -1 }),
        C("pastor", 230, "walk", { id: "efraim", dy: 0.64, scale: 0.78, facing: -1 }),
      ] }),
      b(2, { by: "servo", q: "e disse: ", env: { glory: 0.34 }, cast: [                        // "Eis que José teu filho vem a ti" — e ISRAEL SE ASSENTA na cama
        C("jaco", -20, "kneel", { dy: 0.5 }),
        C("servo", 46, "bow", { dy: 0.54, facing: -1 }),
        C("jose", 132, "walk", { glow: 0.35, dy: 0.52, facing: -1 }),
        C("pastor", 196, "walk", { id: "manasses", dy: 0.6, scale: 0.82, facing: -1 }),
        C("pastor", 238, "walk", { id: "efraim", dy: 0.64, scale: 0.78, facing: -1 }),
      ] }),
      b(3, { by: "jaco", q: "E Jacó disse a José: ", env: { glory: 0.5, night: 0.32 }, cast: [ // "O DEUS TODO-PODEROSO ME APARECEU EM LUZ" (a teofania é LUZ)
        C("jaco", -20, "kneel", { glow: 0.25, dy: 0.5, facing: 1 }),
        C("jose", 58, "kneel", { glow: 0.35, dy: 0.56, facing: -1 }),
        C("pastor", 150, "stand", { id: "manasses", dy: 0.6, scale: 0.82, facing: -1 }),
        C("pastor", 192, "stand", { id: "efraim", dy: 0.64, scale: 0.78, facing: -1 }),
      ] }),
      b(4, { by: "jaco", env: { glory: 0.55 } }),                                             // a promessa: frutificar, multiplicar, A TERRA em possessão perpétua
      b(5, { by: "jaco", env: { glory: 0.5 }, cast: [                                          // A ADOÇÃO: "EFRAIM E MANASSÉS SERÃO MEUS, como Rúben e Simeão"
        C("jaco", -20, "point", { glow: 0.25, dy: 0.5, facing: 1 }),
        C("jose", 132, "kneel", { glow: 0.35, dy: 0.56, facing: -1 }),
        C("pastor", 40, "stand", { id: "manasses", glow: 0.15, dy: 0.56, scale: 0.82, facing: -1 }),
        C("pastor", 82, "stand", { id: "efraim", glow: 0.15, dy: 0.6, scale: 0.78, facing: -1 }),
      ] }),
      b(6, { by: "jaco" }),                                                                    // a geração seguinte será dele: chamada no nome dos irmãos
      b(7, { by: "jaco", props: TENDA_RAQUEL, env: { night: 0.3, glory: 0.35 }, cast: [         // RAQUEL morta no caminho de Efrata, que é Belém — a ternura do velho
        C("jaco", -24, "kneel", { dy: 0.5 }),
        C("jose", 96, "kneel", { glow: 0.3, dy: 0.56, facing: -1 }),
        C("pastor", 40, "stand", { id: "manasses", dy: 0.56, scale: 0.82, facing: -1 }),
        C("pastor", 82, "stand", { id: "efraim", dy: 0.6, scale: 0.78, facing: -1 }),
      ] }),
      b(8, { by: "jaco", q: "e disse: ", env: { night: 0.26, glory: 0.4 }, cast: [               // "QUEM SÃO ESTES?" — os olhos que já não distinguem
        C("jaco", -22, "point", { dy: 0.5, facing: 1 }),
        C("pastor", 44, "stand", { id: "manasses", dy: 0.56, scale: 0.82, facing: -1 }),
        C("pastor", 86, "stand", { id: "efraim", dy: 0.6, scale: 0.78, facing: -1 }),
        C("jose", 140, "stand", { glow: 0.35, dy: 0.54, facing: -1 }),
      ] }),
      b(9, { by: "jose", q: "E José disse a seu pai: ", env: { glory: 0.46 }, cast: [            // "que Deus me tem dado aqui" — "traze-mos, para que os abençoe"
        C("jaco", -22, "raise", { glow: 0.2, dy: 0.5, facing: 1 }),
        C("pastor", 40, "walk", { id: "manasses", dy: 0.56, scale: 0.82, facing: -1 }),
        C("pastor", 82, "walk", { id: "efraim", dy: 0.6, scale: 0.78, facing: -1 }),
        C("jose", 110, "point", { glow: 0.35, dy: 0.54, facing: -1 }),
      ] }),
      b(10, { env: { glory: 0.52, night: 0.24 }, cast: [                                         // olhos carregados de velhice — mas BEIJOU-OS e ABRAÇOU-OS
        C("jaco", -20, "raise", { glow: 0.25, dy: 0.5, facing: 1 }),
        C("pastor", 16, "kneel", { id: "manasses", dy: 0.56, scale: 0.82, facing: -1 }),
        C("pastor", 54, "kneel", { id: "efraim", dy: 0.6, scale: 0.78, facing: -1 }),
        C("jose", 120, "stand", { glow: 0.35, dy: 0.54, facing: -1 }),
      ] }),
      b(11, { by: "jaco", q: "E Israel disse a José: ", env: { glory: 0.6 }, cast: [              // "NÃO CUIDARA VER O TEU ROSTO; e Deus me fez ver a tua descendência"
        C("jaco", -20, "raise", { glow: 0.35, dy: 0.5, facing: 1 }),
        C("pastor", 16, "kneel", { id: "manasses", glow: 0.15, dy: 0.56, scale: 0.82, facing: -1 }),
        C("pastor", 54, "kneel", { id: "efraim", glow: 0.15, dy: 0.6, scale: 0.78, facing: -1 }),
        C("jose", 108, "stand", { glow: 0.4, dy: 0.54, facing: -1 }),
      ] }),
      b(12, { env: { glory: 0.56 }, cast: [                                                      // tirou-os dos joelhos do pai e INCLINOU-SE À TERRA
        C("jaco", -20, "kneel", { glow: 0.25, dy: 0.5, facing: 1 }),
        C("pastor", 46, "stand", { id: "manasses", dy: 0.56, scale: 0.82 }),
        C("pastor", 86, "stand", { id: "efraim", dy: 0.6, scale: 0.78 }),
        C("jose", 132, "bow", { glow: 0.4, dy: 0.62, facing: -1 }),
      ] }),
      b(13, { env: { glory: 0.6 }, cast: [                                                       // JOSÉ POSICIONA: Manassés à DIREITA de Israel, Efraim à ESQUERDA
        C("pastor", -76, "stand", { id: "manasses", dy: 0.54, scale: 0.82, facing: 1 }),
        C("jaco", -20, "kneel", { glow: 0.25, dy: 0.5 }),
        C("pastor", 34, "stand", { id: "efraim", dy: 0.58, scale: 0.78, facing: -1 }),
        C("jose", 108, "point", { glow: 0.4, dy: 0.56, facing: -1 }),
      ] }),
      b(14, { env: { glory: 0.7, night: 0.2 }, cast: [                                            // AS MÃOS CRUZADAS: a direita sobre EFRAIM, o menor — propositadamente
        C("pastor", -76, "kneel", { id: "manasses", glow: 0.2, dy: 0.54, scale: 0.82, facing: 1 }),
        C("jaco", -20, "raise", { glow: 0.5, dy: 0.5 }),
        C("pastor", 34, "kneel", { id: "efraim", glow: 0.3, dy: 0.58, scale: 0.78, facing: -1 }),
        C("jose", 108, "stand", { glow: 0.4, dy: 0.56, facing: -1 }),
      ] }),
      b(15, { by: "jaco", q: "e disse: ", props: TENDA_PAIS, env: { glory: 0.75 }, cast: [         // "O Deus em cuja presença andaram os meus pais ABRAÃO E ISAQUE"
        C("pastor", -76, "kneel", { id: "manasses", glow: 0.2, dy: 0.54, scale: 0.82, facing: 1 }),
        C("jaco", -20, "raise", { glow: 0.6, dy: 0.5 }),
        C("pastor", 34, "kneel", { id: "efraim", glow: 0.32, dy: 0.58, scale: 0.78, facing: -1 }),
        C("jose", 108, "kneel", { glow: 0.4, dy: 0.58, facing: -1 }),
      ] }),
      b(16, { by: "jaco", env: { glory: 0.8, night: 0.16 }, cast: [                                // "O ANJO QUE ME LIVROU DE TODO O MAL ABENÇOE ESTES RAPAZES" (só LUZ)
        C("pastor", -76, "kneel", { id: "manasses", glow: 0.28, dy: 0.54, scale: 0.82, facing: 1 }),
        C("jaco", -20, "raise", { glow: 0.7, dy: 0.5 }),
        C("pastor", 34, "kneel", { id: "efraim", glow: 0.4, dy: 0.58, scale: 0.78, facing: -1 }),
        C("jose", 108, "kneel", { glow: 0.4, dy: 0.58, facing: -1 }),
      ] }),
      b(17, { env: { glory: 0.68, night: 0.2 }, cast: [                                            // FOI MAU AOS SEUS OLHOS: José toma a mão do pai para transpô-la
        C("pastor", -76, "kneel", { id: "manasses", glow: 0.25, dy: 0.54, scale: 0.82, facing: 1 }),
        C("jaco", -20, "raise", { glow: 0.6, dy: 0.5 }),
        C("pastor", 34, "kneel", { id: "efraim", glow: 0.35, dy: 0.58, scale: 0.78, facing: -1 }),
        C("jose", 76, "point", { glow: 0.45, dy: 0.54, facing: -1 }),
      ] }),
      b(18, { by: "jose", q: "E José disse a seu pai: ", env: { glory: 0.64 }, cast: [               // "NÃO ASSIM, MEU PAI, porque ESTE é o primogênito"
        C("pastor", -76, "kneel", { id: "manasses", glow: 0.25, dy: 0.54, scale: 0.82, facing: 1 }),
        C("jaco", -20, "raise", { glow: 0.6, dy: 0.5 }),
        C("pastor", 34, "kneel", { id: "efraim", glow: 0.35, dy: 0.58, scale: 0.78, facing: -1 }),
        C("jose", 64, "raise", { glow: 0.45, dy: 0.54, facing: -1 }),
      ] }),
      b(19, { by: "jaco", q: "e disse: ", env: { glory: 0.75, night: 0.16 }, cast: [                 // "EU O SEI, MEU FILHO, EU O SEI" — o menor será maior que ele
        C("pastor", -76, "kneel", { id: "manasses", glow: 0.28, dy: 0.54, scale: 0.82, facing: 1 }),
        C("jaco", -20, "point", { glow: 0.7, dy: 0.5 }),
        C("pastor", 34, "kneel", { id: "efraim", glow: 0.5, dy: 0.58, scale: 0.78, facing: -1 }),
        C("jose", 76, "kneel", { glow: 0.45, dy: 0.56, facing: -1 }),
      ] }),
      b(20, { by: "jaco", q: "dizendo: ", env: { glory: 0.75, night: 0.12 }, cast: [                  // "Deus te faça como a EFRAIM e como a Manassés": Efraim POSTO DIANTE
        C("pastor", -52, "stand", { id: "efraim", glow: 0.5, dy: 0.5, scale: 0.8, facing: 1 }),
        C("jaco", -20, "raise", { glow: 0.65, dy: 0.5 }),
        C("pastor", 48, "stand", { id: "manasses", glow: 0.28, dy: 0.58, scale: 0.82, facing: -1 }),
        C("jose", 108, "kneel", { glow: 0.45, dy: 0.56, facing: -1 }),
      ] }),
      b(21, { by: "jaco", q: "Depois disse Israel a José: ", env: { glory: 0.72, night: 0.22 }, cast: [ // "EIS QUE EU MORRO, mas Deus será convosco… tornar à terra de vossos pais"
        C("pastor", -52, "stand", { id: "efraim", glow: 0.45, dy: 0.5, scale: 0.8, facing: 1 }),
        C("jaco", -20, "point", { glow: 0.6, dy: 0.5 }),
        C("pastor", 48, "stand", { id: "manasses", glow: 0.28, dy: 0.58, scale: 0.82, facing: -1 }),
        C("jose", 72, "kneel", { glow: 0.45, dy: 0.56, facing: -1 }),
      ] }),
      b(22, { by: "jaco", props: TENDA_PORCAO, env: { glory: 0.7, night: 0.18 }, cast: [               // A PORÇÃO A MAIS: o pedaço de terra tomado com a espada e o arco
        C("pastor", -52, "stand", { id: "efraim", glow: 0.45, dy: 0.5, scale: 0.8, facing: 1 }),
        C("jaco", -20, "raise", { glow: 0.6, dy: 0.5 }),
        C("pastor", 48, "stand", { id: "manasses", glow: 0.28, dy: 0.58, scale: 0.82, facing: -1 }),
        C("jose", 76, "bow", { glow: 0.5, dy: 0.58, facing: -1 }),
      ] }),
    ],
  },
};
