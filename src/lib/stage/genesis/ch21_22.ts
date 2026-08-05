// ============================================================================
// GÊNESIS 21–22 — roteiro do modo CENA VIVA (força-tarefa AT, onda 2).
//
// Gn 21 — O RISO CHEGA: Isaque nasce no acampamento de Berseba ("Deus me tem
// feito riso"), a festa do desmame azeda com a zombaria, e Agar é despedida
// para o deserto — a água acaba, ela chora longe do menino, e DEUS OUVE
// ("abriu-lhe Deus os olhos": o POÇO). Fecha com o pacto de Berseba (as sete
// cordeiras como testemunho do poço) e o bosque plantado ao Deus eterno.
//
// Gn 22 — MORIÁ: o capítulo mais dramático do livro. "Toma o teu filho, o teu
// único filho" na noite; três dias de caminhada; o diálogo mais pungente do
// AT ("onde está o cordeiro?" / "Deus proverá"); o altar, Isaque amarrado, o
// cutelo erguido — e o brado do céu com glória SÚBITA. O carneiro no mato, o
// juramento ("abençoando-te abençoarei") e a notícia serena de Naor: REBECA.
//
// DEUS NUNCA É DESENHADO: a voz dele é narração pura (sem `by`); a Presença
// é glória no ambiente. O anjo do SENHOR fala com `by: "anjo"`.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------------------
// BERSEBA — o acampamento de Abraão na terra dos filisteus: tendas, o poço da
// casa, uma tamargueira de sombra. (corredor de extras dx -100..-190 LIVRE)
const BERSEBA: StagePropSpec[] = [
  P("tent", 190, 1.2, undefined, 0.1),     // a tenda de Abraão e Sara
  P("tent", 274, 0.95, undefined, 0.32),   // tenda menor do acampamento
  P("tree", -40, 1.15, undefined, 0.06),   // tamargueira de sombra
  P("well", 320, 1, undefined, 0.12),      // o poço da casa
  P("amphora", 226, 0.85, undefined, 0.56),
  P("crate", 254, 0.8, undefined, 0.64),
  P("rock", -240, 0.9, undefined, 0.55),
  P("rock", 84, 0.55, undefined, 0.25),
  P("bush", -300, 0.9, undefined, 0.4),
  P("bush", 132, 0.85, undefined, 0.62),
  P("grass", -62, 0.9, undefined, 0.82),
  P("grass", 58, 1, undefined, 0.78),
  P("grass", -272, 1, undefined, 0.72),
];
// o grande banquete do desmame (Gn 21:8): fogo e vinho no corredor de extras
const BERSEBA_FESTA: StagePropSpec[] = [
  ...BERSEBA,
  P("campfire", -130, 1, 1, 0.5),
  P("amphora", -178, 0.85, undefined, 0.62),
];
// o poço da contenda (Gn 21:25–32), destacado na vaga dos extras
const BERSEBA_POCO: StagePropSpec[] = [...BERSEBA, { ...P("well", -140, 1.05, undefined, 0.22), tag: "poco-berseba" }];
// o bosque plantado e a invocação do Deus eterno (Gn 21:33)
const BERSEBA_BOSQUE: StagePropSpec[] = [
  ...BERSEBA,
  P("tree", -175, 1.35, undefined, 0.1),   // o bosque recém-plantado
  P("altar", -108, 1, undefined, 0.45),    // onde invoca o nome do SENHOR
];

// ---------------------------------------------------------------------------
// O DESERTO DE BERSEBA (Gn 21:14–21): sol a pino, mato ralo — e UMA árvore,
// aquela debaixo da qual o menino é lançado.
const DESERTO: StagePropSpec[] = [
  P("tree", 70, 1.25, undefined, 0.1),     // "debaixo de uma das árvores"
  P("rock", -250, 0.95, undefined, 0.5),
  P("rock", 184, 0.7, undefined, 0.7),
  P("rock", 320, 0.9, undefined, 0.6),
  P("bush", -300, 0.8, undefined, 0.35),
  P("bush", 244, 0.75, undefined, 0.45),
  P("grass", -44, 0.8, undefined, 0.85),
  P("grass", 144, 0.7, undefined, 0.78),
];
// o odre de água sobre o ombro (extra do versículo 14)
const DESERTO_ODRE: StagePropSpec[] = [...DESERTO, P("amphora", -180, 0.8, undefined, 0.52)];
// "abriu-lhe Deus os olhos, e viu um poço de água" (v.19): o poço REVELADO
const DESERTO_POCO: StagePropSpec[] = [...DESERTO_ODRE, P("well", -140, 1.05, undefined, 0.22)];

// ---------------------------------------------------------------------------
// MORIÁ (Gn 22:4–19): o monte árido — pedras grandes, um mato espinhoso (onde
// o carneiro ficará travado) e uma árvore retorcida contra o céu.
const MORIA: StagePropSpec[] = [
  P("rock", -260, 1.1, undefined, 0.45),
  P("rock", -60, 0.7, undefined, 0.2),
  P("rock", 300, 1, undefined, 0.55),
  P("rock", 92, 0.6, undefined, 0.75),
  P("bush", 158, 0.9, undefined, 0.35),    // o MATO do carneiro (v.13)
  P("bush", -312, 0.8, undefined, 0.6),
  P("tree", 250, 0.9, undefined, 0.1),     // árvore retorcida do monte
  P("grass", 20, 0.85, undefined, 0.85),
  P("grass", 212, 0.8, undefined, 0.68),
];
// a lenha do holocausto posta sobre Isaque (v.6–8)
const MORIA_LENHA: StagePropSpec[] = [...MORIA, P("crate", 48, 0.7, undefined, 0.62)];
// o ALTAR edificado no lugar que Deus dissera (v.9–12): CENTRAL e grande — é o
// coração da cena, não um detalhe na borda.
const MORIA_ALTAR: StagePropSpec[] = [...MORIA, { ...P("altar", -20, 1.4, undefined, 0.4), tag: "altar-moria" }];
// o altar ACESO com o carneiro oferecido em lugar do filho (v.13–16)
const MORIA_FOGO: StagePropSpec[] = [...MORIA, { ...P("altar", -20, 1.4, 1, 0.4), tag: "altar-moria" }];
// "como as ESTRELAS dos céus" (v.17–18): a promessa escrita no alto
const MORIA_ESTRELAS: StagePropSpec[] = [
  ...MORIA_FOGO,
  P("star", -178, 0.6, undefined, 0.04),
  P("star", 288, 0.55, undefined, 0.02),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Gn 21
  // O RISO CHEGA: nascimento (glória) → atrito e deserto (a noite mais
  // dolorida) → o poço revelado (glória) → pacto de Berseba → o bosque.
  21: {
    start: { terrain: "field", night: 0.05, glory: 0.3, storm: 0, fire: 0 },
    beats: [
      b(1, { cast: [C("sara", -10, "stand", { dy: 0.48 }), C("abraao", 64, "stand", { dy: 0.52 })], props: BERSEBA, env: { glory: 0.7 } }), // o SENHOR visitou a Sara, como dissera
      b(2, { cast: [C("sara", -10, "stand", { dy: 0.48 }), C("isaque", 8, "stand", { scale: 0.32, dy: 0.52 }), C("abraao", 64, "stand", { dy: 0.52 })], env: { glory: 0.8 } }), // Sara dá um filho na velhice
      b(3, { cast: [C("sara", -14, "stand", { dy: 0.48 }), C("isaque", 6, "stand", { scale: 0.32, dy: 0.52 }), C("abraao", 54, "raise", { dy: 0.5 })] }), // Abraão põe o nome: ISAQUE
      b(4, { env: { glory: 0.6 } }),                                                 // circuncidado aos oito dias, como ordenado
      b(5),                                                                          // Abraão tinha cem anos
      b(6, { by: "sara", q: "disse Sara: ", cast: [C("sara", -14, "raise", { dy: 0.48 }), C("isaque", 8, "stand", { scale: 0.35, dy: 0.52 }), C("abraao", 58, "stand", { dy: 0.52 })], env: { glory: 0.9 } }), // "Deus me tem feito riso"
      b(7, { by: "sara", q: "Disse mais: " }),                                       // quem diria: Sara amamentando?
      b(8, { cast: [C("abraao", -60, "stand", { dy: 0.5 }), C("sara", 0, "stand", { dy: 0.48 }), C("isaque", 32, "stand", { scale: 0.5, dy: 0.55 }), C("multidao", 140, "stand", { dy: 0.42 })], props: BERSEBA_FESTA, env: { glory: 0.55 } }), // o grande banquete do desmame
      b(9, { cast: [C("mulherComum", -70, "stand", { dy: 0.5, id: "agar" }), C("homem", -18, "point", { scale: 0.62, dy: 0.52, id: "ismael", facing: 1 }), C("isaque", 34, "stand", { scale: 0.5, dy: 0.55 }), C("sara", 96, "point", { dy: 0.48, facing: -1 }), C("multidao", 170, "stand", { dy: 0.4 })], env: { night: 0.15, glory: 0.4 } }), // Sara vê o filho de Agar zombando
      b(10, { by: "sara", q: "disse a Abraão: ", cast: [C("mulherComum", -70, "stand", { dy: 0.5, id: "agar" }), C("homem", -18, "stand", { scale: 0.62, dy: 0.52, id: "ismael" }), C("isaque", 34, "stand", { scale: 0.5, dy: 0.55 }), C("sara", 78, "point", { dy: 0.48, facing: 1 }), C("abraao", 140, "stand", { dy: 0.5, facing: -1 })], env: { night: 0.25 } }), // "Ponha fora esta serva e o seu filho"
      b(11, { cast: [C("mulherComum", -70, "stand", { dy: 0.5, id: "agar" }), C("homem", -18, "stand", { scale: 0.62, dy: 0.52, id: "ismael" }), C("isaque", 34, "stand", { scale: 0.5, dy: 0.55 }), C("sara", 78, "stand", { dy: 0.48 }), C("abraao", 140, "bow", { dy: 0.5, facing: -1 })] }), // a palavra pesa aos olhos de Abraão
      b(12, { by: "deus", q: "Porém Deus disse a Abraão: ", env: { night: 0.1, glory: 0.7 } }),                                    // Deus: "em tudo… ESCUTA A SUA VOZ"
      b(13, { by: "deus", env: { glory: 0.75 } }),                                               // Deus: também do filho da serva farei nação
      b(14, { set: "deserto", cast: [C("abraao", -260, "stand", { dy: 0.5, facing: 1 }), C("mulherComum", -60, "walk", { dy: 0.5, id: "agar" }), C("homem", -10, "walk", { scale: 0.62, dy: 0.55, id: "ismael" })], props: DESERTO_ODRE, env: { terrain: "desert", night: 0.2, glory: 0.2 } }), // pão e odre: errante no deserto de Berseba
      b(15, { cast: [C("mulherComum", 10, "kneel", { dy: 0.5, id: "agar", facing: 1 }), C("homem", 62, "lie", { scale: 0.62, dy: 0.35, id: "ismael" })], env: { night: 0.35, glory: 0.1 } }), // a água acaba: o menino sob a árvore
      b(16, { cast: [C("mulherComum", -240, "kneel", { dy: 0.55, id: "agar", facing: -1 }), C("homem", 62, "lie", { scale: 0.62, dy: 0.35, id: "ismael" })], env: { night: 0.4, glory: 0.05 } }), // a um tiro de arco, ela chora
      b(17, { by: "anjo", q: "disse-lhe: ", cast: [C("anjo", -180, "flyIdle", { glow: 0.9, dy: 0.2 }), C("mulherComum", -240, "kneel", { dy: 0.55, id: "agar", facing: 1 }), C("homem", 62, "lie", { scale: 0.62, dy: 0.35, id: "ismael" })], env: { night: 0.15, glory: 0.7 } }), // DEUS OUVIU o menino: "Que tens, Agar?"
      b(18, { by: "anjo", cast: [C("anjo", -180, "flyIdle", { glow: 0.9, dy: 0.2 }), C("mulherComum", -60, "walk", { dy: 0.52, id: "agar" }), C("homem", 62, "lie", { scale: 0.62, dy: 0.35, id: "ismael" })] }), // "Ergue-te… dele farei grande nação"
      b(19, { cast: [C("mulherComum", -150, "stand", { dy: 0.45, id: "agar" }), C("homem", -96, "kneel", { scale: 0.62, dy: 0.5, id: "ismael" })], props: DESERTO_POCO, env: { glory: 0.8, night: 0.05 } }), // abriu-lhe Deus os olhos: UM POÇO
      b(20, { cast: [C("mulherComum", -150, "stand", { dy: 0.48, id: "agar" }), C("homem", -80, "stand", { scale: 0.8, dy: 0.5, id: "ismael" })], env: { glory: 0.5 } }), // Deus com o menino: cresce, flecheiro
      b(21, { cast: [C("mulherComum", -130, "stand", { dy: 0.48, id: "agar" }), C("homem", -60, "stand", { scale: 0.8, dy: 0.5, id: "ismael" }), C("mulherComum", 0, "stand", { dy: 0.52, id: "egipcia" })], env: { glory: 0.4 } }), // Parã; mulher da terra do Egito
      b(22, { by: "rei", q: "dizendo: ", set: "berseba-pacto", cast: [C("abraao", -50, "stand", { dy: 0.5 }), C("rei", 40, "stand", { dy: 0.48, facing: -1 }), C("homem", 104, "stand", { dy: 0.54, id: "ficol", facing: -1 })], props: BERSEBA, env: { terrain: "field", night: 0, glory: 0.35 } }), // Abimeleque e Ficol: "Deus é contigo"
      b(23, { by: "rei" }),                                                          // "jura-me aqui por Deus"
      b(24, { by: "abraao", q: "disse Abraão: ", cast: [C("abraao", -50, "raise", { dy: 0.5 }), C("rei", 40, "stand", { dy: 0.48, facing: -1 }), C("homem", 104, "stand", { dy: 0.54, id: "ficol", facing: -1 })] }), // "Eu jurarei."
      b(25, { cast: [C("abraao", -50, "point", { dy: 0.5, facing: -1 }), C("rei", 40, "stand", { dy: 0.48, facing: -1 }), C("homem", 104, "stand", { dy: 0.54, id: "ficol", facing: -1 })], props: BERSEBA_POCO, env: { storm: 0.15 } }), // a repreensão: o poço tomado à força
      b(26, { by: "rei", q: "disse Abimeleque: ", env: { storm: 0.05 } }),           // "Eu não sei quem fez isto"
      b(27, { cast: [C("rebanho", -230, "stand", { dy: 0.42 }), C("abraao", -50, "stand", { dy: 0.5 }), C("rei", 40, "stand", { dy: 0.48, facing: -1 }), C("homem", 104, "stand", { dy: 0.54, id: "ficol", facing: -1 })], env: { storm: 0, glory: 0.45 } }), // ovelhas e vacas: fizeram ALIANÇA
      b(28, { cast: [C("rebanho", -230, "stand", { dy: 0.42 }), C("rebanho", -76, "stand", { scale: 0.55, dy: 0.56, id: "cordeiras" }), C("abraao", -30, "point", { dy: 0.5, facing: -1 }), C("rei", 44, "stand", { dy: 0.48, facing: -1 }), C("homem", 106, "stand", { dy: 0.54, id: "ficol", facing: -1 })] }), // SETE CORDEIRAS postas à parte
      b(29, { by: "rei", q: "disse a Abraão: " }),                                   // "Para que estas sete cordeiras?"
      b(30, { by: "abraao", q: "E disse: ", cast: [C("rebanho", -230, "stand", { dy: 0.42 }), C("rebanho", -76, "stand", { scale: 0.55, dy: 0.56, id: "cordeiras" }), C("abraao", -30, "point", { dy: 0.5, facing: -1 }), C("rei", 44, "stand", { dy: 0.48, facing: -1 }), C("homem", 106, "stand", { dy: 0.54, id: "ficol", facing: -1 })] }), // testemunho: "eu cavei este poço"
      b(31, { env: { glory: 0.55 } }),                                               // por isso: BERSEBA, "poço do juramento"
      b(32, { cast: [C("rebanho", -230, "stand", { dy: 0.42 }), C("abraao", -30, "stand", { dy: 0.5 }), C("rei", 240, "walk", { dy: 0.5, facing: 1 }), C("homem", 296, "walk", { dy: 0.55, id: "ficol", facing: 1 })], env: { glory: 0.45 } }), // Abimeleque e Ficol voltam à Filístia
      b(33, { cast: [C("abraao", -56, "raise", { dy: 0.5, facing: -1 }), C("rebanho", 220, "stand", { dy: 0.44 })], props: BERSEBA_BOSQUE, env: { glory: 0.85, night: 0.1 } }), // o BOSQUE: invoca o Deus ETERNO
      b(34, { cast: [C("abraao", 10, "walk", { dy: 0.52 }), C("rebanho", 220, "stand", { dy: 0.44 })], env: { glory: 0.45, night: 0.25 } }), // peregrino muitos dias entre filisteus
    ],
  },

  // ------------------------------------------------------------------ Gn 22
  // MORIÁ: noite pesada na provação → três dias de estrada → o diálogo mais
  // pungente do AT → tensão máxima no altar (storm+night) → glória SÚBITA no
  // brado do céu → o carneiro substituto → a promessa → a notícia de Rebeca.
  22: {
    start: { terrain: "field", night: 0.5, glory: 0.05, storm: 0, fire: 0 },
    beats: [
      b(1, { cast: [C("abraao", -10, "kneel", { dy: 0.5 })], props: BERSEBA, env: { glory: 0.35 } }), // Deus PROVA: "Abraão!" — "Eis-me aqui"
      b(2, { by: "deus", q: "E disse: ", cast: [C("abraao", -10, "bow", { dy: 0.5 })], env: { glory: 0.45, night: 0.5 } }), // Deus: "Toma teu filho, teu ÚNICO filho"
      b(3, { cast: [C("abraao", -64, "walk", { dy: 0.5 }), C("isaque", -6, "walk", { scale: 0.8, dy: 0.54 }), C("servo", 58, "walk", { dy: 0.56, id: "moco1" }), C("servo", 110, "walk", { dy: 0.6, id: "moco2" })], props: [...BERSEBA, P("crate", -140, 0.9, undefined, 0.5)], env: { night: 0.55, glory: 0.2 } }), // madrugada: a lenha cortada, os moços
      b(4, { set: "moria", cast: [C("abraao", -44, "point", { dy: 0.5, facing: 1 }), C("isaque", 14, "stand", { scale: 0.8, dy: 0.54 }), C("servo", 120, "stand", { dy: 0.56, id: "moco1" }), C("servo", 172, "stand", { dy: 0.6, id: "moco2" })], props: MORIA, env: { terrain: "mountain", night: 0.25, glory: 0.1 } }), // TERCEIRO DIA: vê o lugar de longe
      b(5, { by: "abraao", q: "disse Abraão a seus moços: ", cast: [C("abraao", -44, "stand", { dy: 0.5, facing: 1 }), C("isaque", 14, "stand", { scale: 0.8, dy: 0.54 }), C("servo", 120, "stand", { dy: 0.56, id: "moco1", facing: -1 }), C("servo", 172, "stand", { dy: 0.6, id: "moco2", facing: -1 })] }), // "havendo adorado, TORNAREMOS a vós"
      b(6, { cast: [C("abraao", -34, "walk", { dy: 0.5 }), C("isaque", 30, "walk", { scale: 0.8, dy: 0.55 }), C("servo", 224, "stand", { dy: 0.58, id: "moco1" }), C("servo", 270, "stand", { dy: 0.62, id: "moco2" })], props: MORIA_LENHA, env: { night: 0.3 } }), // a lenha sobre Isaque; fogo e cutelo
      b(7, { by: "isaque", q: "meu filho! E ele disse: " }),                         // "onde está o CORDEIRO?"
      b(8, { by: "abraao", q: "disse Abraão: ", env: { night: 0.35, glory: 0.15 } }), // "DEUS PROVERÁ para si o cordeiro"
      b(9, { cast: [C("abraao", 46, "raise", { dy: 0.46, facing: -1 }), C("isaque", -20, "lie", { scale: 0.8, dy: 0.42 })], props: MORIA_ALTAR, env: { night: 0.5, storm: 0.2, glory: 0.05 } }), // o ALTAR ao centro: Isaque amarrado sobre a lenha, o cutelo erguido
      b(10, { cast: [C("abraao", -94, "raise", { dy: 0.46, facing: -1 }), C("isaque", -140, "lie", { scale: 0.8, dy: 0.42 })], env: { night: 0.6, storm: 0.3, glory: 0 } }), // a mão estendida, o CUTELO
      b(11, { by: "anjo", q: "desde os céus, e disse: ", cast: [C("anjo", 16, "flyIdle", { glow: 1, dy: 0.22 }), C("abraao", -94, "raise", { dy: 0.46, facing: 1 }), C("isaque", -140, "lie", { scale: 0.8, dy: 0.42 })], env: { glory: 0.9, storm: 0.1, night: 0.25 } }), // o BRADO do céu: "Abraão, Abraão!"
      b(12, { by: "anjo", q: "Então disse: ", cast: [C("anjo", 16, "flyIdle", { glow: 1, dy: 0.22 }), C("abraao", -94, "kneel", { dy: 0.46, facing: 1 }), C("isaque", -140, "lie", { scale: 0.8, dy: 0.42 })], env: { glory: 0.9, storm: 0, night: 0.15 } }), // "NÃO ESTENDAS A TUA MÃO" — o alívio
      b(13, { cast: [C("rebanho", 150, "stand", { scale: 0.5, dy: 0.42, id: "carneiro" }), C("abraao", 88, "walk", { dy: 0.5, facing: 1 }), C("isaque", -60, "stand", { scale: 0.8, dy: 0.52 })], props: MORIA_FOGO, env: { glory: 0.85, fire: 0.2, night: 0.1 } }), // o CARNEIRO travado no mato: substituto
      b(14, { cast: [C("abraao", -6, "raise", { dy: 0.48 }), C("isaque", 46, "stand", { scale: 0.8, dy: 0.54 })], env: { glory: 1, fire: 0.15 } }), // o nome do lugar: O SENHOR PROVERÁ
      b(15, { cast: [C("anjo", 30, "flyIdle", { glow: 1, dy: 0.2 }), C("abraao", -44, "kneel", { dy: 0.5 }), C("isaque", 4, "kneel", { scale: 0.8, dy: 0.54 })], env: { glory: 0.9 } }), // o anjo brada SEGUNDA vez
      b(16, { by: "anjo", q: "E disse: ", env: { glory: 0.95 } }),                   // "Por mim mesmo JUREI, diz o Senhor"
      b(17, { by: "anjo", props: MORIA_ESTRELAS, env: { glory: 1 } }),               // como as ESTRELAS… como a areia
      b(18, { by: "anjo" }),                                                         // nele benditas TODAS as nações
      b(19, { set: "berseba-volta", cast: [C("abraao", -40, "walk", { dy: 0.5 }), C("isaque", 12, "walk", { scale: 0.8, dy: 0.54 }), C("servo", 68, "walk", { dy: 0.56, id: "moco1" }), C("servo", 118, "walk", { dy: 0.6, id: "moco2" })], props: BERSEBA, env: { terrain: "field", night: 0.2, glory: 0.5, fire: 0, storm: 0 } }), // juntos de volta: habita em Berseba
      b(20, { by: "homem", q: "dizendo: ", cast: [C("homem", -70, "stand", { dy: 0.52, id: "mensageiro", facing: 1 }), C("abraao", -8, "stand", { dy: 0.5, facing: -1 }), C("isaque", 48, "stand", { scale: 0.8, dy: 0.54 })], env: { night: 0.25, glory: 0.4 } }), // a notícia: Milca deu filhos a Naor
      b(21, { env: { night: 0.3 } }),                                                // Uz, Buz e Quemuel, pai de Arã
      b(22, { env: { night: 0.32 } }),                                               // Quésede, Hazo, Pildas, Jidlafe, Betuel
      b(23, { env: { glory: 0.55 } }),                                               // Betuel gerou REBECA — a futura noiva
      b(24, { env: { night: 0.35, glory: 0.4 } }),                                   // Reumá e seus filhos: fim sereno
    ],
  },
};
