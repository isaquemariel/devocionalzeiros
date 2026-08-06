// ============================================================================
// ÊXODO 5–6 — roteiro do modo CENA VIVA (força-tarefa AT, onda Êxodo).
//
// Êx 5 — "QUEM É O SENHOR?": Moisés e Arão entram na corte e pedem a saída do
// povo; Faraó zomba ("Não conheço o Senhor") e AGRAVA o cativeiro — tijolos sem
// palha. Os oficiais hebreus são açoitados, clamam a Faraó em vão, e voltam-se
// contra Moisés. Moisés, ferido, volta-se ao SENHOR na oração amarga.
//
// Êx 6 — "EU SOU O SENHOR": a resposta do céu. Deus se apresenta pelo Nome,
// lembra a aliança de Abraão/Isaque/Jacó e promete os quatro verbos do resgate
// (tirar, livrar, resgatar, tomar por povo). O povo, esmagado, não ouve; segue
// a genealogia das casas dos pais que desemboca em ARÃO E MOISÉS — os homens da
// libertação.
//
// A VOZ DE DEUS (regra do projeto): em Êx 5–6 NÃO há mediador visível (nem
// sarça, nem Anjo) — Deus fala do céu direto a Moisés: `by: "deus"`, glória no
// ambiente, SEM figura. Faraó fala com `by: "farao"`; exatores/oficiais e magos
// com `by: "homem"`.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------------------
// O PALÁCIO DE FARAÓ (a corte): o trono ao centro, as torres da cidade-armazém
// ao fundo, colunas e ânforas. (corredor de extras dx -110..-200 LIVRE)
const PALACIO: StagePropSpec[] = [
  { ...P("throne", 40, 1.1, undefined, 0.28), tag: "trono-farao" },
  P("tower", 300, 1.3, undefined, 0.06),
  P("tower", 232, 1, undefined, 0.22),
  P("tower", -300, 1.2, undefined, 0.1),
  P("palm", -240, 1.05, undefined, 0.12),
  P("amphora", -120, 0.85, undefined, 0.5),
  P("amphora", 150, 0.8, undefined, 0.55),
];

// ---------------------------------------------------------------------------
// O EGITO (cidade) e a DURA SERVIDÃO em barro e tijolos (Êx 5:7-19): as pilhas
// de tijolos, as tendas dos hebreus e as palmeiras do Nilo.
const EGITO: StagePropSpec[] = [
  P("tower", 300, 1.35, undefined, 0.05),
  P("tower", 232, 1, undefined, 0.24),
  P("tent", -206, 1.05, undefined, 0.14),
  P("tent", -288, 0.85, undefined, 0.32),
  P("palm", 250, 1.1, undefined, 0.1),
  P("palm", 190, 0.85, undefined, 0.28),
  P("well", -150, 1, undefined, 0.2),
  P("grass", -60, 0.9, undefined, 0.8),
  P("grass", 60, 0.85, undefined, 0.76),
  P("rock", 332, 0.8, undefined, 0.52),
];
const EGITO_OBRA: StagePropSpec[] = [
  ...EGITO,
  P("crate", 150, 0.9, undefined, 0.5),
  P("crate", 96, 0.8, undefined, 0.62),
  P("crate", -110, 0.85, undefined, 0.56),
  P("crate", 24, 0.75, undefined, 0.68),
];

// ---------------------------------------------------------------------------
// AS CASAS DOS PAIS (Êx 6:14-25): a genealogia das tribos — tendas em fileira e
// a cidade ao fundo; a linha de Levi desemboca em Arão e Moisés.
const CASAS: StagePropSpec[] = [
  P("tent", -260, 1.05, undefined, 0.14),
  P("tent", -180, 0.95, undefined, 0.24),
  P("tent", 180, 1, undefined, 0.18),
  P("tent", 262, 0.9, undefined, 0.3),
  P("tower", 310, 1.2, undefined, 0.06),
  P("palm", 100, 1, undefined, 0.12),
  P("grass", -40, 0.85, undefined, 0.8),
  P("rock", -320, 0.85, undefined, 0.5),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Êx 5
  // A corte: o pedido e a zombaria de Faraó → o decreto cruel (tijolos sem
  // palha) → os oficiais açoitados clamam em vão → a revolta contra Moisés → e a
  // oração amarga de Moisés ao SENHOR (a glória sobe quando ele se volta a Deus).
  5: {
    start: { terrain: "city", night: 0.14, glory: 0.3, storm: 0, fire: 0, verdure: 0.5 },
    beats: [
      b(1, { by: "moises", q: "Assim diz o SENHOR Deus de Israel: ", set: "palacio", cast: [C("farao", 90, "stand", { dy: 0.44, facing: -1 }), C("moises", -60, "stand", { dy: 0.5, facing: 1 }), C("arao", -10, "raise", { dy: 0.5, facing: 1 })], props: PALACIO, env: { terrain: "city", glory: 0.4, night: 0.1 } }), // Moisés e Arão a Faraó: "Deixa ir o meu povo... uma festa no deserto"
      b(2, { by: "farao", q: "Mas Faraó disse: ", cast: [C("farao", 90, "point", { dy: 0.44, facing: -1 }), C("moises", -60, "stand", { dy: 0.5, facing: 1 }), C("arao", -10, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.2, night: 0.2 } }), // "Quem é o Senhor... Não conheço o Senhor, nem deixarei ir Israel"
      b(3, { by: "moises", q: "E eles disseram: ", cast: [C("farao", 90, "stand", { dy: 0.44, facing: -1 }), C("moises", -60, "point", { dy: 0.5, facing: 1 }), C("arao", -10, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.35 } }), // "O Deus dos hebreus nos encontrou; deixa-nos ir caminho de três dias"
      b(4, { by: "farao", q: "Então disse-lhes o rei do Egito: ", cast: [C("farao", 90, "point", { dy: 0.44, facing: -1 }), C("moises", -60, "stand", { dy: 0.5, facing: 1 }), C("arao", -10, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.2, storm: 0.12 } }), // "por que fazeis cessar o povo das suas obras? Ide às vossas cargas"
      b(5, { by: "farao", q: "E disse também Faraó: ", env: { storm: 0.18 } }), // "o povo da terra já é muito, e vós os fazeis abandonar as suas cargas"
      b(6, { cast: [C("farao", 90, "raise", { dy: 0.44, facing: -1 }), C("homem", 10, "bow", { dy: 0.5, id: "exator", facing: 1 }), C("homem", -50, "bow", { dy: 0.52, id: "oficial2", facing: 1 })], env: { storm: 0.25, night: 0.24, glory: 0.12 } }), // Faraó dá ordem aos exatores e oficiais do povo
      b(7, { by: "farao" }), // "Não torneis a dar palha ao povo para fazer tijolos... colham palha para si"
      b(8, { by: "farao", env: { storm: 0.3 } }), // "imporeis a mesma conta de tijolos... porque estão ociosos"
      b(9, { by: "farao", env: { storm: 0.35, glory: 0.1 } }), // "Agrave-se o serviço sobre estes homens... e não confiem em palavras mentirosas"
      b(10, { by: "homem", q: "Assim diz Faraó: ", set: "obra", cast: [C("homem", 80, "point", { dy: 0.48, id: "exator", facing: -1 }), C("multidao", -60, "kneel", { dy: 0.54 }), C("multidao", 20, "bow", { scale: 0.9, dy: 0.6, id: "povo2" })], props: EGITO_OBRA, env: { terrain: "city", storm: 0.35, night: 0.22, glory: 0.12, verdure: 0.35 } }), // exatores ao povo: "Eu não vos darei palha"
      b(11, { by: "homem" }), // "Ide vós mesmos, tomai palha onde a achardes; nada se diminuirá do serviço"
      b(12, { cast: [C("multidao", -120, "walk", { dy: 0.5 }), C("multidao", 40, "kneel", { scale: 0.9, dy: 0.6, id: "povo2" }), C("multidao", 150, "walk", { scale: 0.85, dy: 0.46, id: "povo3", facing: -1 })], env: { storm: 0.3, glory: 0.15 } }), // o povo se espalha pela terra a colher restolho em lugar de palha
      b(13, { by: "homem", q: "dizendo: ", cast: [C("homem", 90, "point", { dy: 0.48, id: "exator", facing: -1 }), C("multidao", -60, "kneel", { dy: 0.56 }), C("multidao", 20, "bow", { scale: 0.9, dy: 0.62, id: "povo2" })], env: { storm: 0.38, night: 0.28 } }), // os exatores apertavam: "Acabai vossa obra, a tarefa de cada dia"
      b(14, { by: "homem", q: "dizendo estes: ", cast: [C("homem", 90, "raise", { dy: 0.48, id: "exator", facing: -1 }), C("homem", -20, "kneel", { dy: 0.54, id: "oficial", facing: 1 }), C("homem", -80, "kneel", { dy: 0.56, id: "oficial2", facing: 1 })], env: { storm: 0.45, glory: 0.08 } }), // os oficiais dos filhos de Israel açoitados: "Por que não acabastes vossa tarefa?"
      b(15, { by: "homem", q: "dizendo: ", set: "palacio", cast: [C("farao", 90, "stand", { dy: 0.44, facing: -1 }), C("homem", -40, "bow", { dy: 0.5, id: "oficial", facing: 1 }), C("homem", -100, "bow", { dy: 0.52, id: "oficial2", facing: 1 })], props: PALACIO, env: { terrain: "city", storm: 0.15, night: 0.16, glory: 0.15 } }), // os oficiais clamam a Faraó: "Por que fazes assim a teus servos?"
      b(16, { by: "homem", cast: [C("farao", 90, "stand", { dy: 0.44, facing: -1 }), C("homem", -40, "raise", { dy: 0.5, id: "oficial", facing: 1 }), C("homem", -100, "bow", { dy: 0.52, id: "oficial2", facing: 1 })] }), // "Palha não se dá a teus servos... e eis que teus servos são açoitados"
      b(17, { by: "farao", q: "Mas ele disse: ", cast: [C("farao", 90, "point", { dy: 0.44, facing: -1 }), C("homem", -40, "stand", { dy: 0.5, id: "oficial", facing: 1 }), C("homem", -100, "stand", { dy: 0.52, id: "oficial2", facing: 1 })], env: { storm: 0.25, glory: 0.1 } }), // "Vós sois ociosos... por isso dizeis: sacrifiquemos ao Senhor"
      b(18, { by: "farao" }), // "Ide, trabalhai; palha porém não se vos dará; contudo, dareis a conta dos tijolos"
      b(19, { cast: [C("homem", -40, "bow", { dy: 0.5, id: "oficial", facing: 1 }), C("homem", 30, "bow", { dy: 0.52, id: "oficial2" })], env: { storm: 0.3, night: 0.3, glory: 0.08 } }), // os oficiais se veem em aflição: nada se diminuirá dos tijolos
      b(20, { set: "obra", cast: [C("moises", -70, "stand", { dy: 0.5, facing: 1 }), C("arao", -20, "stand", { dy: 0.5, facing: 1 }), C("homem", 60, "point", { dy: 0.5, id: "oficial", facing: -1 }), C("homem", 120, "stand", { dy: 0.52, id: "oficial2", facing: -1 })], props: EGITO_OBRA, env: { terrain: "city", storm: 0.2, night: 0.24, glory: 0.12 } }), // ao sair de Faraó, encontram Moisés e Arão defronte deles
      b(21, { by: "homem", q: "E disseram-lhes: ", cast: [C("homem", 60, "raise", { dy: 0.5, id: "oficial", facing: -1 }), C("homem", 120, "point", { dy: 0.52, id: "oficial2", facing: -1 }), C("moises", -70, "bow", { dy: 0.5, facing: 1 }), C("arao", -20, "stand", { dy: 0.5, facing: 1 })], env: { storm: 0.3 } }), // "O Senhor atente sobre vós e julgue... destes-lhes a espada nas mãos"
      b(22, { by: "moises", q: "disse: ", set: "clamor", cast: [C("moises", -10, "kneel", { dy: 0.5, facing: 1 })], props: EGITO, env: { terrain: "city", storm: 0, night: 0.3, glory: 0.4 } }), // Moisés se volta ao Senhor: "por que fizeste mal a este povo? por que me enviaste?"
      b(23, { by: "moises", cast: [C("moises", -10, "raise", { dy: 0.5, facing: 1 })], env: { glory: 0.5 } }), // "desde que falei em teu nome, ele maltratou o povo, e não livraste o teu povo"
    ],
  },

  // ------------------------------------------------------------------ Êx 6
  // A resposta do céu (VOZ DO CÉU, glória crescente) → o Nome e a aliança → os
  // quatro verbos do resgate → o povo esmagado que não ouve → a genealogia das
  // casas dos pais que desemboca em Arão e Moisés → a renovação do envio.
  6: {
    start: { terrain: "city", night: 0.22, glory: 0.5, storm: 0, fire: 0, verdure: 0.4 },
    beats: [
      b(1, { by: "deus", q: "Então disse o SENHOR a Moisés: ", set: "clamor", cast: [C("moises", -10, "kneel", { dy: 0.5, facing: 1 })], props: EGITO, env: { terrain: "city", glory: 0.65, night: 0.18 } }), // "Agora verás o que hei de fazer a Faraó; por uma mão poderosa os lançará"
      b(2, { by: "deus", q: "e disse: ", cast: [C("moises", -10, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.75 } }), // "Eu sou o Senhor"
      b(3, { by: "deus", env: { glory: 0.8 } }), // "apareci a Abraão, a Isaque e a Jacó como o Deus Todo-Poderoso"
      b(4, { by: "deus", env: { glory: 0.82 } }), // "estabeleci a minha aliança... para dar-lhes a terra de Canaã"
      b(5, { by: "deus", env: { glory: 0.85 } }), // "tenho ouvido o gemido dos filhos de Israel... e lembrei-me da minha aliança"
      b(6, { by: "deus", q: "Portanto dize aos filhos de Israel: ", env: { glory: 0.9 } }), // "Eu sou o Senhor, e vos tirarei... vos livrarei... vos resgatarei com braço estendido"
      b(7, { by: "deus", env: { glory: 0.95 } }), // "E eu vos tomarei por meu povo, e serei vosso Deus"
      b(8, { by: "deus", env: { glory: 1 } }), // "vos levarei à terra... jurando que a daria a Abraão, Isaque e Jacó... eu o Senhor"
      b(9, { set: "povo-oprimido", cast: [C("moises", -70, "point", { dy: 0.5, facing: 1 }), C("multidao", 40, "bow", { dy: 0.5 }), C("multidao", 130, "kneel", { scale: 0.9, dy: 0.56, id: "povo2" })], props: EGITO_OBRA, env: { terrain: "city", glory: 0.3, night: 0.3, storm: 0.25 } }), // Moisés fala ao povo, mas não o ouvem, pela angústia e dura servidão
      b(10, { cast: [C("moises", -10, "kneel", { dy: 0.5, facing: 1 })], env: { glory: 0.6, storm: 0, night: 0.2 } }), // o Senhor torna a falar a Moisés
      b(11, { by: "deus", env: { glory: 0.7 } }), // "Entra, e fala a Faraó rei do Egito, que deixe sair os filhos de Israel"
      b(12, { by: "moises", q: "dizendo: ", cast: [C("moises", -10, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.5 } }), // "os filhos de Israel não me ouviram; como Faraó me ouvirá? sou incircunciso de lábios"
      b(13, { cast: [C("moises", -50, "stand", { dy: 0.5, facing: 1 }), C("arao", 10, "stand", { dy: 0.5, facing: -1 })], env: { glory: 0.7 } }), // o Senhor dá mandamento a Moisés e a Arão para tirar Israel do Egito
      b(14, { set: "casas-dos-pais", cast: [C("patriarca", -70, "stand", { dy: 0.5, id: "ruben" }), C("multidao", 90, "stand", { scale: 0.85, dy: 0.46, id: "casas" })], props: CASAS, env: { terrain: "city", glory: 0.4, night: 0.15, storm: 0, verdure: 0.5 } }), // as cabeças das casas dos pais: os filhos de Rúben
      b(15, { cast: [C("patriarca", -70, "stand", { dy: 0.5, id: "simeao" }), C("multidao", 90, "stand", { scale: 0.85, dy: 0.46, id: "casas" })] }), // os filhos de Simeão
      b(16, { cast: [C("patriarca", -70, "stand", { dy: 0.5, id: "levi" }), C("multidao", 90, "stand", { scale: 0.85, dy: 0.46, id: "casas" })], env: { glory: 0.5 } }), // os filhos de Levi: Gérson, Coate e Merari
      b(17), // os filhos de Gérson: Libni e Simei
      b(18), // os filhos de Coate: Anrão, Izar, Hebrom e Uziel
      b(19), // os filhos de Merari: Mali e Musi
      b(20, { cast: [C("homem", -60, "stand", { dy: 0.5, id: "anrao" }), C("arao", 20, "stand", { dy: 0.5, facing: -1 }), C("moises", 80, "stand", { dy: 0.5, facing: -1 })], env: { glory: 0.65 } }), // Anrão e Joquebede: dela nasceram Arão e Moisés
      b(21), // os filhos de Izar: Corá, Nefegue e Zicri
      b(22), // os filhos de Uziel: Misael, Elzafã e Sitri
      b(23, { cast: [C("arao", -30, "stand", { dy: 0.5 }), C("mulherComum", 30, "stand", { dy: 0.52, id: "eliseba", facing: -1 })], env: { glory: 0.55 } }), // Arão e Eliseba: Nadabe, Abiú, Eleazar e Itamar
      b(24), // os filhos de Corá: Assir, Elcana e Abiasafe
      b(25, { cast: [C("homem", -40, "stand", { dy: 0.5, id: "eleazar" }), C("multidao", 60, "stand", { scale: 0.85, dy: 0.48, id: "casas" })] }), // Eleazar e a filha de Putiel: dela nasceu Finéias
      b(26, { by: "deus", q: "aos quais o Senhor disse: ", cast: [C("arao", -30, "stand", { dy: 0.5, facing: 1 }), C("moises", 30, "raise", { dy: 0.5, facing: -1 })], env: { glory: 0.85 } }), // Estes são Arão e Moisés: "Tirai os filhos de Israel da terra do Egito"
      b(27, { cast: [C("arao", -30, "point", { dy: 0.5, facing: 1 }), C("moises", 30, "stand", { dy: 0.5, facing: -1 })], env: { glory: 0.7 } }), // estes são os que falaram a Faraó: Moisés e Arão
      b(28, { cast: [C("moises", -10, "kneel", { dy: 0.5, facing: 1 })], env: { glory: 0.75, night: 0.1 } }), // naquele dia em que o Senhor falou a Moisés na terra do Egito
      b(29, { by: "deus", q: "Falou o Senhor a Moisés, dizendo: ", env: { glory: 0.9 } }), // "Eu sou o Senhor; fala a Faraó tudo quanto eu te digo"
      b(30, { by: "moises", q: "Então disse Moisés perante o Senhor: ", cast: [C("moises", -10, "bow", { dy: 0.5, facing: 1 })], env: { glory: 0.7 } }), // "Eis que sou incircunciso de lábios; como, pois, Faraó me ouvirá?"
    ],
  },
};
