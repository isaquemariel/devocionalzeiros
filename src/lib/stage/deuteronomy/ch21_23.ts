// ============================================================================
// DEUTERONÔMIO 21–23 — CENA VIVA. Leis diversas nas campinas de Moabe.
// Moisés (120 anos), diante de todo o Israel, com o Jordão ao fundo, prega a
// Lei antes de morrer. FALANTE = MOISÉS (`mv`), pontuando as frases-chave.
//
// Dt 21 — O HOMICÍDIO SEM AUTOR: a NOVILHA cujo pescoço se quebra no vale
// áspero, os anciãos lavando as mãos ("as nossas mãos não derramaram este
// sangue"); a cativa tomada por mulher; o direito do primogênito; o filho
// REBELDE apedrejado; e o pendurado no MADEIRO — "maldito de Deus é o
// pendurado" (21:23), tirado antes da noite.
//
// Dt 22 — achados do próximo devolvidos; não misturar (boi+jumento, lã+linho,
// semente); as FRANJAS/borlas nas quatro bordas da manta; leis do casamento e
// da pureza.
//
// Dt 23 — quem entra na congregação do Senhor; a maldição de Balaão trocada em
// bênção; o arraial SANTO na guerra ("o Senhor anda no meio de teu arraial");
// o servo fugido acolhido; nada de prostituição cultual; não emprestar a juro
// ao irmão; cumprir os votos; as uvas e as espigas do próximo.
//
// VERDADES DO MOTOR: apedrejamento e madeiro = clima SÓBRIO (glory baixo, night
// alto, campfire) com FIGURAS INDIVIDUAIS (homem/mulherComum) em lie/bow/kneel —
// nunca `multidao` (que ignora pose e comemora). `glow` só em glorificados.
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
  P("tent", -270, 1.0, undefined, 0.2),
  P("tent", 250, 1.0, undefined, 0.22),
  P("tower", 300, 0.9, undefined, 0.16),
  P("river", 0, 1.2, undefined, 0.88),
  P("palm", -320, 1.05, undefined, 0.14),
  P("grass", -70, 0.82, undefined, 0.82),
  P("grass", 70, 0.78, undefined, 0.74),
];

// Ambiente sóbrio para morte/apedrejamento/madeiro (juízo individual).
const LUTO = { terrain: "field" as const, glory: 0.1, night: 0.58, storm: 0.2, fire: 0.4, verdure: 0.3 };

export const CHAPTERS: Record<number, StageScript> = {
  // -------------------------------------------------------------- Dt 21
  21: {
    start: { terrain: "field", night: 0.14, glory: 0.55, storm: 0, fire: 0, verdure: 0.4 },
    beats: [
      // v.1-9 — O HOMICÍDIO SEM AUTOR CONHECIDO: a novilha do vale.
      b(1, { by: "moises", q: "se achar um morto, caído no campo", props: MOABE,
        env: { terrain: "field", glory: 0.5, night: 0.16, verdure: 0.4 }, cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
      mv(2, "medirão a distância"),
      b(3, { by: "moises", q: "tomarão uma novilha da manada", cast: [   // a novilha que nunca puxou o jugo
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("anciao", 60, "stand", { dy: 0.5, facing: -1 }),
        C("rebanho", 190, "stand", { dy: 0.5, id: "novilha" }),
      ] }),
      b(4, { by: "moises", q: "naquele vale, degolarão a novilha",       // o vale áspero — clima sóbrio
        env: { terrain: "field", glory: 0.22, night: 0.42, verdure: 0.24, fire: 0 }, cast: [
        C("anciao", -40, "kneel", { dy: 0.5, facing: 1 }),
        C("rebanho", 120, "lie", { dy: 0.5, id: "novilha" }),
      ] }),
      mv(5, "os sacerdotes, filhos de Levi"),
      b(6, { by: "moises", q: "lavarão as suas mãos sobre a novilha degolada", cast: [
        C("anciao", -60, "bow", { dy: 0.5, facing: 1 }),
        C("anciao", 40, "bow", { dy: 0.5, facing: -1, id: "anciao2" }),
        C("rebanho", 150, "lie", { dy: 0.5, id: "novilha" }),
      ] }),
      b(7, { by: "anciao", q: "As nossas mãos não derramaram este sangue", cast: [ // o protesto dos anciãos
        C("anciao", -20, "raise", { dy: 0.5, facing: 1 }),
        C("anciao", -120, "bow", { dy: 0.5, facing: 1, id: "anciao2" }),
      ] }),
      b(8, { by: "anciao", q: "não ponhas o sangue inocente no meio do teu povo Israel" }),
      mv(9, "Assim tirarás o sangue inocente do meio de ti"),
      // v.10-14 — A CATIVA tomada por mulher.
      b(10, { by: "moises", q: "levares prisioneiros",
        env: { terrain: "field", glory: 0.5, night: 0.16, verdure: 0.4 }, cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      b(11, { by: "moises", q: "uma mulher formosa à vista", cast: [
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("mulherComum", 90, "stand", { dy: 0.52, facing: -1, id: "cativa" }),
      ] }),
      mv(12, "ela rapará a cabeça"),
      b(13, { by: "moises", q: "chorará a seu pai e a sua mãe um mês inteiro", cast: [
        C("mulherComum", 40, "kneel", { dy: 0.52, facing: 1, id: "cativa" }),
      ] }),
      mv(14, "de modo algum a venderás por dinheiro"),
      // v.15-17 — O DIREITO DO PRIMOGÊNITO.
      b(15, { by: "moises", q: "tiver duas mulheres",
        env: { terrain: "field", glory: 0.52, night: 0.16, verdure: 0.4 }, cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("mulher", 60, "stand", { dy: 0.52 }),
        C("mulherComum", 170, "stand", { dy: 0.5, facing: -1, id: "desprezada" }),
      ] }),
      mv(16, "não poderá dar a primogenitura ao filho da amada"),
      mv(17, "dando-lhe dobrada porção"),
      // v.18-21 — O FILHO REBELDE E CONTUMAZ.
      b(18, { by: "moises", q: "um filho contumaz e rebelde", cast: [
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("homem", 120, "stand", { dy: 0.5, facing: -1, id: "filho" }),
      ] }),
      b(19, { by: "moises", q: "o levarão aos anciãos da sua cidade", cast: [
        C("homem", -140, "walk", { dy: 0.5, facing: 1, id: "pai" }),
        C("homem", -20, "stand", { dy: 0.5, facing: 1, id: "filho" }),
        C("anciao", 150, "stand", { dy: 0.5, facing: -1 }),
      ] }),
      mv(20, "é um comilão e um beberrão"),
      b(21, { q: "o apedrejarão, até que morra", env: LUTO, cast: [       // apedrejamento — sóbrio, individual
        C("homem", 0, "lie", { dy: 0.54, id: "filho" }),
        C("homem", -150, "stand", { dy: 0.5, facing: 1, id: "acusador" }),
        C("homem", 160, "kneel", { dy: 0.5, facing: -1, id: "acusador2" }),
      ] }),
      // v.22-23 — O PENDURADO NO MADEIRO: "maldito de Deus é o pendurado".
      b(22, { by: "moises", q: "o pendurares num madeiro", env: LUTO, cast: [
        C("moises", -160, "raise", { dy: 0.5, facing: 1 }),
      ], props: [P("tree", 90, 1.3, undefined, 0.42)] }),
      b(23, { by: "moises", q: "o pendurado é maldito de Deus", env: LUTO, cast: [ // tirado antes da noite
        C("homem", -140, "bow", { dy: 0.5, facing: 1, id: "sepultador" }),
      ], props: [P("tree", 90, 1.3, undefined, 0.42)] }),
    ],
  },

  // -------------------------------------------------------------- Dt 22
  22: {
    start: { terrain: "field", night: 0.12, glory: 0.6, storm: 0, fire: 0, verdure: 0.45 },
    beats: [
      // v.1-4 — ACHADOS DO IRMÃO devolvidos.
      b(1, { by: "moises", q: "restituí-los-ás sem falta a teu irmão", props: MOABE,
        env: { terrain: "field", glory: 0.6, night: 0.12, verdure: 0.45 }, cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("rebanho", 150, "stand", { dy: 0.5, id: "gado" }),
      ] }),
      mv(2, "recolhê-los-ás na tua casa"),
      mv(3, "toda a coisa perdida"),
      b(4, { by: "moises", q: "sem falta o ajudarás a levantá-los", cast: [
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("rebanho", 120, "lie", { dy: 0.52, id: "jumento" }),
      ] }),
      // v.5-11 — NÃO MISTURAR.
      mv(5, "Não haverá traje de homem na mulher"),
      b(6, { by: "moises", q: "não tomarás a mãe com os filhotes",       // o ninho na árvore
        props: [P("tree", 120, 1.25, undefined, 0.4), P("birds", 120, 0.7, undefined, 0.3)], cast: [
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
      ] }),
      mv(7, "Deixarás ir livremente a mãe"),
      mv(8, "farás um parapeito, no eirado"),
      mv(9, "Não semearás a tua vinha com diferentes espécies de semente"),
      b(10, { by: "moises", q: "Com boi e com jumento não lavrarás juntamente", cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("rebanho", 100, "stand", { dy: 0.5, id: "boi" }),
        C("rebanho", 200, "stand", { dy: 0.5, id: "jumento", scale: 0.9 }),
      ] }),
      mv(11, "diversos estofos de lã e linho juntamente"),
      // v.12 — as FRANJAS/BORLAS nas quatro bordas da manta.
      b(12, { by: "moises", q: "Franjas porás nas quatro bordas da tua manta",
        env: { terrain: "field", glory: 0.66, night: 0.1, verdure: 0.45 }, cast: [
        C("moises", -120, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.46 }),
      ] }),
      // v.13-30 — LEIS DO CASAMENTO E DA PUREZA.
      b(13, { by: "moises", q: "depois de coabitar com ela, a desprezar",
        env: { terrain: "field", glory: 0.5, night: 0.16, verdure: 0.4 }, cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      mv(14, "contra ela divulgar má fama"),
      b(15, { by: "moises", q: "levá-los-ão aos anciãos da cidade", cast: [
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("anciao", 130, "stand", { dy: 0.5, facing: -1 }),
      ] }),
      mv(16, "Eu dei minha filha por mulher a este homem"),
      mv(17, "estenderão a roupa diante dos anciãos"),
      mv(18, "o castigarão"),
      mv(19, "o multarão em cem siclos de prata"),
      mv(20, "a virgindade não se achou na moça"),
      b(21, { q: "os homens da sua cidade a apedrejarão", env: LUTO, cast: [ // apedrejamento — sóbrio
        C("mulherComum", 0, "lie", { dy: 0.54, id: "moca" }),
        C("homem", -150, "stand", { dy: 0.5, facing: 1, id: "acusador" }),
        C("homem", 150, "kneel", { dy: 0.5, facing: -1, id: "acusador2" }),
      ] }),
      b(22, { q: "ambos morrerão", env: LUTO, cast: [
        C("homem", -50, "lie", { dy: 0.54, id: "reu" }),
        C("mulherComum", 60, "lie", { dy: 0.52, id: "re" }),
        C("homem", 190, "stand", { dy: 0.5, facing: -1, id: "acusador" }),
      ] }),
      b(23, { by: "moises", q: "moça virgem, desposada",
        env: { terrain: "field", glory: 0.5, night: 0.16, verdure: 0.4 }, cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      b(24, { q: "os apedrejareis, até que morram", env: LUTO, cast: [
        C("homem", -40, "lie", { dy: 0.54, id: "reu" }),
        C("mulherComum", 60, "lie", { dy: 0.52, id: "re" }),
        C("homem", 180, "stand", { dy: 0.5, facing: -1, id: "acusador" }),
      ] }),
      b(25, { by: "moises", q: "morrerá só o homem que se deitou com ela",
        env: { terrain: "field", glory: 0.4, night: 0.2, verdure: 0.4 }, cast: [
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
      ] }),
      mv(26, "A moça não tem culpa de morte"),
      mv(27, "a moça desposada gritou, e não houve quem a livrasse"),
      b(28, { by: "moises", q: "uma moça virgem, que não for desposada",
        env: { terrain: "field", glory: 0.52, night: 0.14, verdure: 0.42 }, cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      mv(29, "cinqüenta siclos de prata"),
      mv(30, "Nenhum homem tomará a mulher de seu pai"),
    ],
  },

  // -------------------------------------------------------------- Dt 23
  23: {
    start: { terrain: "field", night: 0.12, glory: 0.58, storm: 0, fire: 0, verdure: 0.42 },
    beats: [
      // v.1-8 — QUEM ENTRA NA CONGREGAÇÃO DO SENHOR.
      b(1, { by: "moises", q: "não entrará na congregação do SENHOR", props: MOABE,
        env: { terrain: "field", glory: 0.58, night: 0.12, verdure: 0.42 }, cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
      mv(2, "Nenhum bastardo entrará na congregação do Senhor"),
      mv(3, "Nenhum amonita nem moabita entrará na congregação"),
      // v.4-5 — FLASHBACK: Balaão alugado para amaldiçoar, e a maldição trocada.
      b(4, { by: "moises", q: "alugaram contra ti a Balaão",
        env: { terrain: "field", glory: 0.4, night: 0.2, verdure: 0.38 }, cast: [
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("servo", 120, "raise", { dy: 0.5, facing: -1, id: "balaao" }),
      ] }),
      b(5, { by: "moises", q: "trocou em bênção a maldição",              // Deus trocou a maldição em bênção
        env: { terrain: "field", glory: 0.78, night: 0.08, verdure: 0.45 }, cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 140, "stand", { dy: 0.46 }),
      ] }),
      mv(6, "nem paz nem bem"),
      b(7, { by: "moises", q: "Não abominarás o edomeu, pois é teu irmão",
        env: { terrain: "field", glory: 0.58, night: 0.12, verdure: 0.42 }, cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      mv(8, "na terceira geração"),
      // v.9-14 — O ARRAIAL SANTO NA GUERRA.
      b(9, { by: "moises", q: "te guardarás de toda a coisa má", cast: [
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "walk", { dy: 0.46 }),
      ] }),
      mv(10, "sairá fora do arraial"),
      mv(11, "em se pondo o sol, entrará no meio do arraial"),
      mv(12, "um lugar fora do arraial"),
      mv(13, "entre as tuas armas terás uma pá"),
      b(14, { by: "moises", q: "o teu arraial será santo",               // o Senhor anda no meio do arraial
        env: { terrain: "field", glory: 0.8, night: 0.08, verdure: 0.45 }, cast: [
        C("moises", -120, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 130, "bow", { dy: 0.46 }),
      ] }),
      // v.15-25 — O SERVO FUGIDO, A PUREZA E OS VOTOS.
      b(15, { by: "moises", q: "o servo que, tendo fugido dele, se acolher a ti",
        env: { terrain: "field", glory: 0.58, night: 0.12, verdure: 0.42 }, cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("servo", 110, "kneel", { dy: 0.52, facing: -1, id: "fugido" }),
      ] }),
      mv(16, "não o oprimirás"),
      mv(17, "Não haverá prostituta dentre as filhas de Israel"),
      mv(18, "salário da prostituta"),
      b(19, { by: "moises", q: "A teu irmão não emprestarás com juros", cast: [
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("homem", 130, "stand", { dy: 0.5, facing: -1, id: "irmao" }),
      ] }),
      mv(20, "Ao estranho emprestarás com juros"),
      mv(21, "não tardarás em cumpri-lo"),
      mv(22, "abstendo-te de votar, não haverá pecado"),
      mv(23, "O que saiu dos teus lábios guardarás"),
      // v.24-25 — as UVAS e as ESPIGAS do próximo (fartar-se, mas sem cesto/foice).
      b(24, { by: "moises", q: "comerás uvas conforme ao teu desejo",
        env: { terrain: "field", glory: 0.64, night: 0.1, verdure: 0.5 },
        props: [P("grapes", 130, 1.1, undefined, 0.44)], cast: [
        C("moises", -120, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      b(25, { by: "moises", q: "com a tua mão arrancarás as espigas",
        props: [P("sheaf", 130, 1.1, undefined, 0.5)], cast: [
        C("moises", -120, "point", { dy: 0.5, facing: 1 }),
      ] }),
    ],
  },
};
