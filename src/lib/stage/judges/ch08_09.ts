// ============================================================================
// JUÍZES 8–9 — CENA VIVA. O fim de GIDEÃO e o reinado de sangue de ABIMELEQUE.
//
// Jz 8 — A queixa de EFRAIM ("que não nos chamaste") e a resposta branda de
// Gideão, que apaga a ira com uma palavra: "os rabiscos de Efraim melhores do
// que a vindima de Abiezer". Depois, o JORDÃO: trezentos homens "já cansados,
// mas ainda perseguindo". SUCOTE nega o pão; PENUEL zomba — e ambas pagam: os
// anciãos ensinados com os espinhos do deserto, a torre de Penuel derrubada.
// ZEBA e SALMUNA são presos em Carcor e mortos, porque em Tabor mataram os
// irmãos de Gideão. Israel quer coroá-lo, e ele RECUSA: "o Senhor sobre vós
// dominará". Mas pede os PENDENTES de ouro do despojo e faz deles um ÉFODE em
// Ofra — e o ouro da vitória vira LAÇO: "todo o Israel prostituiu-se ali após
// ele". Gideão morre em boa velhice, e Israel volta aos baalins.
//
// Jz 9 — ABIMELEQUE, filho da concubina de Siquém, compra homens ociosos com a
// prata do templo de Baal-Berite e mata SETENTA irmãos SOBRE UMA PEDRA. Só
// JOTÃO, o caçula, escapa escondido. Do cume do monte GERIZIM ele grita a
// PARÁBOLA DAS ÁRVORES: a oliveira, a figueira e a videira recusam reinar; só o
// ESPINHEIRO aceita — e do espinheiro sai fogo. A maldição se cumpre: Deus
// envia um mau espírito, Gaal sublima Siquém, Zebul avisa Abimeleque, a cidade
// cai e é semeada de sal; a TORRE de Siquém é QUEIMADA com mil pessoas dentro.
// E em Tebes, do alto da TORRE, uma mulher lança um pedaço de mó sobre a sua
// cabeça e lhe quebra o crânio — "e a maldição de Jotão veio sobre eles".
//
// DIREÇÃO: o massacre da pedra, o incêndio da torre e a morte de Abimeleque são
// JUÍZO e HORROR — individuais em `lie`/`bow`/`kneel`, night alto, glória baixa,
// NUNCA multidão festiva e NUNCA `glow` no amaldiçoado. Fogo só com `campfire`.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ------------------------------------------------------------------ Jz 8 sets
// EFRAIM — os homens de Efraim contendendo com Gideão junto às águas do Jordão.
const EFRAIM: StagePropSpec[] = [
  P("river", 0, 1.3, undefined, 0.86),
  P("palm", -320, 1.0, undefined, 0.14),
  P("tent", 250, 1.0, undefined, 0.22),
  P("rock", -200, 1.05, undefined, 0.5),
  P("grass", 100, 0.78, undefined, 0.68),
];
// O JORDÃO — a passagem dos trezentos, cansados, sem parar de perseguir.
const JORDAO: StagePropSpec[] = [
  P("river", 0, 1.4, undefined, 0.8),
  P("rock", 260, 1.05, undefined, 0.5),
  P("bush", -300, 0.9, undefined, 0.32),
  P("palm", 320, 1.0, undefined, 0.14),
  P("grass", -120, 0.76, undefined, 0.7),
];
// SUCOTE — a cidade fechada que negou os pedaços de pão aos famintos.
const SUCOTE: StagePropSpec[] = [
  P("church", -160, 1.0, undefined, 0.34),
  P("door", 40, 1.0, undefined, 0.46),
  P("tower", 240, 1.1, undefined, 0.3),
  P("sheaf", -300, 0.9, undefined, 0.6),
  P("grass", 130, 0.76, undefined, 0.72),
];
// PENUEL — a torre alta, orgulho da cidade que zombou.
const PENUEL: StagePropSpec[] = [
  P("tower", 0, 1.45, undefined, 0.32),
  P("church", 200, 1.0, undefined, 0.36),
  P("rock", -230, 1.1, undefined, 0.5),
  P("palm", -330, 1.0, undefined, 0.14),
  P("grass", 120, 0.76, undefined, 0.7),
];
// CARCOR — o arraial descuidado dos filhos do oriente, tendas e camelos.
const CARCOR: StagePropSpec[] = [
  P("tent", -180, 1.15, undefined, 0.24),
  P("tent", 60, 1.05, undefined, 0.3),
  P("tent", 250, 1.0, undefined, 0.22),
  P("stall", -300, 0.9, undefined, 0.5),
  P("grass", 140, 0.76, undefined, 0.7),
];
// OS CATIVOS — Zeba e Salmuna presos; os ornamentos nos pescoços dos camelos.
const CATIVOS: StagePropSpec[] = [
  P("rock", 0, 1.2, undefined, 0.44),
  P("stall", -240, 1.0, undefined, 0.5),
  P("tent", 250, 1.05, undefined, 0.24),
  P("palm", 330, 1.0, undefined, 0.14),
  P("grass", 120, 0.76, undefined, 0.7),
];
// O DESPOJO — a capa estendida no chão, os pendentes de ouro caindo nela.
const DESPOJO: StagePropSpec[] = [
  P("crate", 0, 0.9, undefined, 0.55),
  P("amphora", -140, 0.85, undefined, 0.58),
  P("tent", 230, 1.05, undefined, 0.24),
  P("stall", -290, 0.95, undefined, 0.48),
  P("grass", 120, 0.76, undefined, 0.7),
];
// OFRA — a cidade de Gideão, onde o ÉFODE de ouro foi colocado e virou laço.
const OFRA: StagePropSpec[] = [
  P("church", 0, 1.2, undefined, 0.34),
  P("altar", -180, 1.0, undefined, 0.46),
  P("tower", 210, 1.05, undefined, 0.3),
  P("amphora", 120, 0.8, undefined, 0.6),
  P("grass", -100, 0.76, undefined, 0.72),
];
// O SOSSEGO — quarenta anos de descanso: o poço, as espigas, as vinhas.
const SOSSEGO: StagePropSpec[] = [
  P("well", 0, 0.9, undefined, 0.5),
  P("sheaf", -150, 1.0, undefined, 0.6),
  P("grapes", 180, 1.0, undefined, 0.34),
  P("palm", 320, 1.0, undefined, 0.14),
  P("grass", 110, 0.76, undefined, 0.72),
];
// O SEPULCRO de Joás em Ofra dos abiezritas — a pedra e a árvore do luto.
const SEPULCRO: StagePropSpec[] = [
  P("rock", 0, 1.3, undefined, 0.44),
  P("rock", -200, 1.1, undefined, 0.5),
  P("tree", 230, 1.1, undefined, 0.3),
  P("church", -290, 1.0, undefined, 0.34),
  P("grass", 110, 0.76, undefined, 0.72),
];
// OS BAALINS — a apostasia outra vez: o ídolo, o altar estranho, a noite.
const BAALINS: StagePropSpec[] = [
  P("calf", 0, 1.1, undefined, 0.5),
  P("altar", 180, 1.0, undefined, 0.44),
  P("church", -220, 1.0, undefined, 0.34),
  P("rock", 270, 1.0, undefined, 0.58),
  P("grass", -100, 0.76, undefined, 0.72),
];

// ------------------------------------------------------------------ Jz 9 sets
// SIQUÉM — a cidade e o CARVALHO ALTO junto ao qual coroaram Abimeleque.
const SIQUEM: StagePropSpec[] = [
  P("tree", 0, 1.4, undefined, 0.3),
  P("church", -200, 1.0, undefined, 0.36),
  P("tower", 220, 1.1, undefined, 0.3),
  P("rock", 300, 1.0, undefined, 0.5),
  P("grass", -110, 0.76, undefined, 0.72),
];
// A PEDRA — em Ofra, a única pedra sobre a qual morreram setenta irmãos.
const PEDRA: StagePropSpec[] = [
  { ...P("rock", 0, 1.5, undefined, 0.46), tag: "pedra-dos-setenta" },
  P("rock", -230, 1.1, undefined, 0.52),
  P("church", 230, 1.0, undefined, 0.34),
  P("rock", 300, 1.0, undefined, 0.6),
  P("grass", -110, 0.74, undefined, 0.72),
];
// GERIZIM — o cume de onde Jotão brada; Siquém pequenina lá embaixo.
const GERIZIM: StagePropSpec[] = [
  P("rock", 0, 1.3, undefined, 0.5),
  P("tower", 250, 0.9, undefined, 0.22),
  P("tree", -260, 1.1, undefined, 0.28),
  P("bush", 140, 0.9, undefined, 0.6),
  P("grass", -120, 0.76, undefined, 0.7),
];
// AS ÁRVORES da parábola — a oliveira, a figueira, a videira e, ao lado, a moita.
const ARVORES: StagePropSpec[] = [
  P("tree", -220, 1.15, undefined, 0.3),
  P("tree", -60, 1.05, undefined, 0.34),
  P("grapes", 110, 1.05, undefined, 0.42),
  P("tree", 300, 0.95, undefined, 0.28),
  P("bush", 220, 1.0, undefined, 0.52),
  P("grass", -130, 0.76, undefined, 0.72),
];
// O ESPINHEIRO — a moita raquítica no centro, querendo reinar sobre os cedros.
const ESPINHEIRO: StagePropSpec[] = [
  P("bush", 0, 1.3, undefined, 0.5),
  P("tree", -230, 1.1, undefined, 0.3),
  P("tree", 240, 1.05, undefined, 0.28),
  P("grapes", 130, 0.95, undefined, 0.44),
  P("grass", -110, 0.76, undefined, 0.72),
];
// A VINDIMA de Siquém — as uvas pisadas, a festa e a maldição contra Abimeleque.
const VINDIMA: StagePropSpec[] = [
  P("grapes", -140, 1.15, undefined, 0.42),
  P("grapes", 120, 1.05, undefined, 0.38),
  P("amphora", 20, 0.85, undefined, 0.58),
  P("church", 250, 1.0, undefined, 0.36),
  P("tree", -300, 1.05, undefined, 0.3),
  P("grass", 190, 0.74, undefined, 0.7),
];
// A PORTA da cidade — onde Gaal se põe e onde caem os feridos.
const PORTA: StagePropSpec[] = [
  P("door", 0, 1.1, undefined, 0.44),
  P("tower", 200, 1.15, undefined, 0.3),
  P("church", -210, 1.0, undefined, 0.36),
  P("rock", 300, 1.0, undefined, 0.52),
  P("grass", 110, 0.76, undefined, 0.72),
];
// O CAMPO das emboscadas — as tropas escondidas nas moitas, de noite.
const EMBOSCADA: StagePropSpec[] = [
  P("bush", -200, 1.0, undefined, 0.5),
  P("rock", 220, 1.1, undefined, 0.48),
  P("tree", 300, 1.0, undefined, 0.3),
  P("tent", -320, 1.0, undefined, 0.24),
  P("grass", 60, 0.76, undefined, 0.7),
];
// A FORTALEZA DE BERITE — a torre onde os de Siquém se refugiam, ainda INTACTA:
// NENHUMA fogueira acesa aqui (o fogo só entra em v.49, quando a queimam).
const FORTALEZA: StagePropSpec[] = [
  P("tower", 0, 1.4, undefined, 0.32),
  P("door", 150, 1.0, undefined, 0.5),
  P("rock", -230, 1.15, undefined, 0.5),
  P("rock", 250, 1.0, undefined, 0.6),
  P("church", -300, 1.0, undefined, 0.36),
];
// A TORRE DE SIQUÉM QUEIMADA — os ramos amontoados e o fogo (campfire!).
const FOGO_TORRE: StagePropSpec[] = [
  P("tower", 0, 1.4, undefined, 0.32),
  P("campfire", 140, 1.35, 1, 0.5),
  P("rock", -230, 1.15, undefined, 0.5),
  P("rock", 250, 1.0, undefined, 0.6),
  P("church", -300, 1.0, undefined, 0.36),
];
// TEBES — a torre forte no meio da cidade, as portas fechadas, o eirado em cima.
const TEBES: StagePropSpec[] = [
  P("tower", 0, 1.5, undefined, 0.3),
  P("church", -220, 1.0, undefined, 0.36),
  P("door", 150, 1.0, undefined, 0.5),
  P("rock", 280, 1.05, undefined, 0.56),
  P("grass", -110, 0.76, undefined, 0.72),
];
// A MÓ — ao pé da torre de Tebes, a pedra de moinho e o crânio quebrado.
const MO: StagePropSpec[] = [
  P("tower", 60, 1.45, undefined, 0.3),
  { ...P("rock", -40, 1.1, undefined, 0.64), tag: "pedaco-de-mo" },
  P("door", 210, 1.0, undefined, 0.5),
  P("church", -240, 1.0, undefined, 0.36),
  P("grass", 150, 0.74, undefined, 0.72),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ================================================================== Jz 8
  8: {
    start: { terrain: "field", night: 0.18, glory: 0.45, storm: 0, fire: 0, verdure: 0.35 },
    beats: [
      // v.1 — EFRAIM contende fortemente: "que não nos chamaste". (efraimita fala)
      b(1, { by: "homem", q: "Que é isto que nos fizeste", set: "efraim", props: EFRAIM,
        env: { terrain: "field", glory: 0.4, night: 0.2, verdure: 0.35 }, cast: [
        C("homem", 140, "point", { dy: 0.52, facing: -1, id: "efraim1" }),
        C("homem", 240, "raise", { dy: 0.48, facing: -1, id: "efraim2" }),
        C("servo", -120, "stand", { dy: 0.5, facing: 1, id: "gideao" }),
      ] }),
      // v.2 — a resposta branda: os rabiscos de Efraim > a vindima de Abiezer.
      b(2, { by: "servo", q: "Porém ele lhes disse:", cast: [
        C("servo", -120, "raise", { dy: 0.5, facing: 1, id: "gideao" }),
        C("homem", 140, "stand", { dy: 0.52, facing: -1, id: "efraim1" }),
        C("homem", 240, "stand", { dy: 0.48, facing: -1, id: "efraim2" }),
      ] }),
      // v.3 — Orebe e Zeebe já foram entregues nas mãos deles; a ira se abranda.
      b(3, { by: "servo", q: "Deus vos deu na vossa mão os príncipes dos midianitas",
        env: { glory: 0.52, night: 0.16 }, cast: [
        C("servo", -120, "point", { dy: 0.5, facing: 1, id: "gideao" }),
        C("homem", 140, "bow", { dy: 0.52, facing: -1, id: "efraim1" }),
        C("homem", 240, "bow", { dy: 0.48, facing: -1, id: "efraim2" }),
      ] }),
      // v.4 — o Jordão: trezentos homens já cansados, mas ainda perseguindo.
      b(4, { q: "já cansados, mas ainda perseguindo", set: "jordao", props: JORDAO,
        env: { terrain: "field", glory: 0.42, night: 0.3, verdure: 0.3 }, cast: [
        C("servo", -140, "walk", { dy: 0.52, facing: 1, id: "gideao" }),
        C("homem", -20, "walk", { dy: 0.54, facing: 1, id: "trezentos1" }),
        C("homem", 90, "bow", { dy: 0.5, facing: 1, id: "trezentos2" }),
        C("homem", 200, "walk", { dy: 0.46, facing: 1, id: "trezentos3" }),
      ] }),
      // v.5 — Gideão pede pão a Sucote: "estão cansados, e eu vou ao encalço".
      b(5, { by: "servo", q: "E disse aos homens de Sucote:", set: "sucote", props: SUCOTE,
        env: { terrain: "city", glory: 0.4, night: 0.28, verdure: 0.2 }, cast: [
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "gideao" }),
        C("homem", 100, "stand", { dy: 0.48, facing: -1, id: "sucote1" }),
        C("homem", 200, "stand", { dy: 0.44, facing: -1, id: "sucote2" }),
        C("homem", -40, "bow", { dy: 0.56, facing: 1, id: "faminto" }),
      ] }),
      // v.6 — os príncipes de Sucote escarnecem: "para que demos pão ao teu exército?"
      b(6, { by: "homem", q: "Porém os príncipes de Sucote disseram:", cast: [
        C("homem", 100, "point", { dy: 0.48, facing: -1, id: "sucote1" }),
        C("homem", 200, "stand", { dy: 0.44, facing: -1, id: "sucote2" }),
        C("servo", -150, "stand", { dy: 0.5, facing: 1, id: "gideao" }),
      ] }),
      // v.7 — Gideão jura: trilharei a vossa carne com os espinhos do deserto.
      b(7, { by: "servo", q: "Então disse Gideão:", env: { night: 0.34, glory: 0.34 }, cast: [
        C("servo", -150, "point", { dy: 0.5, facing: 1, id: "gideao" }),
        C("homem", 100, "stand", { dy: 0.48, facing: -1, id: "sucote1" }),
        C("homem", 200, "stand", { dy: 0.44, facing: -1, id: "sucote2" }),
      ] }),
      // v.8 — subiu a PENUEL; a mesma zombaria, a mesma recusa.
      b(8, { q: "e os homens de Penuel lhe responderam como os homens de Sucote",
        set: "penuel", props: PENUEL,
        env: { terrain: "city", glory: 0.36, night: 0.32, verdure: 0.18 }, cast: [
        C("servo", -170, "stand", { dy: 0.5, facing: 1, id: "gideao" }),
        C("homem", 120, "point", { dy: 0.48, facing: -1, id: "penuel1" }),
        C("homem", 220, "stand", { dy: 0.44, facing: -1, id: "penuel2" }),
      ] }),
      // v.9 — "Quando eu voltar em paz, derribarei esta torre."
      b(9, { by: "servo", q: "Quando eu voltar em paz, derribarei esta torre", cast: [
        C("servo", -170, "point", { dy: 0.5, facing: 1, id: "gideao" }),
        C("homem", 120, "stand", { dy: 0.48, facing: -1, id: "penuel1" }),
        C("homem", 220, "stand", { dy: 0.44, facing: -1, id: "penuel2" }),
      ] }),
      // v.10 — Carcor: quinze mil restantes; cento e vinte mil já caíram.
      b(10, { q: "uns quinze mil homens", set: "carcor", props: CARCOR,
        env: { terrain: "desert", glory: 0.3, night: 0.42, verdure: 0.1 }, cast: [
        C("rei", -60, "stand", { dy: 0.42, facing: 1, id: "zeba" }),
        C("rei", 40, "stand", { dy: 0.4, facing: 1, id: "salmuna" }),
        C("homem", 150, "bow", { dy: 0.38, facing: -1, id: "midianita1" }),
        C("homem", 230, "kneel", { dy: 0.34, facing: -1, id: "midianita2" }),
        C("homem", 300, "walk", { dy: 0.3, facing: -1, id: "midianita3" }),
      ] }),
      // v.11 — Gideão sobe pelo caminho das tendas e fere o exército descuidado.
      b(11, { q: "porquanto o exército estava descuidado", env: { night: 0.5, glory: 0.34, storm: 0.14 }, cast: [
        C("servo", -180, "walk", { dy: 0.54, facing: 1, id: "gideao" }),
        C("homem", -60, "walk", { dy: 0.52, facing: 1, id: "trezentos1" }),
        C("homem", 90, "lie", { dy: 0.56, id: "midianita1" }),
        C("homem", 210, "bow", { dy: 0.48, facing: -1, id: "midianita2" }),
      ] }),
      // v.12 — Zeba e Salmuna fogem; são tomados presos, ambos os reis.
      b(12, { q: "tomou presos a ambos os reis dos midianitas", set: "cativos", props: CATIVOS,
        env: { terrain: "desert", glory: 0.4, night: 0.4, verdure: 0.1 }, cast: [
        C("rei", 80, "kneel", { dy: 0.54, facing: -1, id: "zeba" }),
        C("rei", 190, "kneel", { dy: 0.5, facing: -1, id: "salmuna" }),
        C("servo", -140, "stand", { dy: 0.52, facing: 1, id: "gideao" }),
      ] }),
      // v.13 — Gideão volta da peleja, antes do nascer do sol.
      b(13, { q: "antes do nascer do sol", env: { night: 0.46, glory: 0.4 }, cast: [
        C("servo", -140, "walk", { dy: 0.52, facing: 1, id: "gideao" }),
        C("rei", 60, "walk", { dy: 0.5, facing: 1, id: "zeba" }),
        C("rei", 170, "walk", { dy: 0.48, facing: 1, id: "salmuna" }),
      ] }),
      // v.14 — o moço de Sucote escreve os nomes: setenta e sete anciãos.
      b(14, { q: "o qual lhe deu por escrito os nomes dos príncipes de Sucote",
        set: "sucote", props: SUCOTE,
        env: { terrain: "city", glory: 0.4, night: 0.34, verdure: 0.18 }, cast: [
        C("homem", 60, "write", { dy: 0.56, facing: -1, id: "moco-sucote" }),
        C("servo", -150, "stand", { dy: 0.5, facing: 1, id: "gideao" }),
      ] }),
      // v.15 — "Vede aqui a Zeba e a Salmuna" — o escárnio devolvido.
      b(15, { by: "servo", q: "Então veio aos homens de Sucote, e disse:", cast: [
        C("servo", -160, "point", { dy: 0.5, facing: 1, id: "gideao" }),
        C("rei", -20, "kneel", { dy: 0.56, facing: 1, id: "zeba" }),
        C("rei", 70, "kneel", { dy: 0.52, facing: 1, id: "salmuna" }),
        C("homem", 210, "bow", { dy: 0.48, facing: -1, id: "sucote1" }),
      ] }),
      // v.16 — os anciãos "ensinados" com os espinhos do deserto e os abrolhos.
      b(16, { q: "os espinhos do deserto, e os abrolhos",
        env: { terrain: "city", glory: 0.26, night: 0.5, storm: 0.16, verdure: 0.14 }, cast: [
        C("servo", -160, "raise", { dy: 0.5, facing: 1, id: "gideao" }),
        C("homem", 40, "bow", { dy: 0.58, facing: 1, id: "anciao-sucote1" }),
        C("homem", 150, "lie", { dy: 0.54, id: "anciao-sucote2" }),
        C("homem", 250, "kneel", { dy: 0.5, facing: -1, id: "anciao-sucote3" }),
      ] }),
      // v.17 — a torre de Penuel derrubada; mortos os homens da cidade.
      b(17, { q: "E derrubou a torre de Penuel", set: "penuel", props: PENUEL,
        env: { terrain: "city", glory: 0.24, night: 0.55, storm: 0.22, verdure: 0.12 }, cast: [
        C("servo", -180, "raise", { dy: 0.5, facing: 1, id: "gideao" }),
        C("homem", 90, "lie", { dy: 0.58, id: "penuel1" }),
        C("homem", 200, "bow", { dy: 0.52, facing: -1, id: "penuel2" }),
      ] }),
      // v.18 — os reis confessam Tabor: "cada um parecia filho de rei". (Zeba fala)
      b(18, { by: "rei", q: "E disseram: Como és tu, assim eram eles", set: "cativos", props: CATIVOS,
        env: { terrain: "desert", glory: 0.3, night: 0.45, verdure: 0.1 }, cast: [
        C("rei", 90, "kneel", { dy: 0.54, facing: -1, id: "zeba" }),
        C("rei", 200, "kneel", { dy: 0.5, facing: -1, id: "salmuna" }),
        C("servo", -140, "stand", { dy: 0.52, facing: 1, id: "gideao" }),
      ] }),
      // v.19 — "Meus irmãos eram, filhos de minha mãe" — o vingador do sangue.
      b(19, { by: "servo", q: "Então disse ele: Meus irmãos eram", env: { night: 0.5, glory: 0.28 }, cast: [
        C("servo", -140, "point", { dy: 0.52, facing: 1, id: "gideao" }),
        C("rei", 90, "kneel", { dy: 0.54, facing: -1, id: "zeba" }),
        C("rei", 200, "kneel", { dy: 0.5, facing: -1, id: "salmuna" }),
      ] }),
      // v.20 — Jeter, o primogênito, não puxa da espada: ainda era jovem.
      b(20, { by: "servo", q: "E disse a Jeter, seu primogênito:", cast: [
        C("servo", -180, "point", { dy: 0.52, facing: 1, id: "gideao" }),
        C("homem", -50, "bow", { dy: 0.6, facing: 1, id: "jeter" }),
        C("rei", 110, "kneel", { dy: 0.54, facing: -1, id: "zeba" }),
        C("rei", 220, "kneel", { dy: 0.5, facing: -1, id: "salmuna" }),
      ] }),
      // v.21 — "qual o homem, tal a sua valentia"; Gideão os mata. (NARRADOR:
      //        o versículo conta a morte dos dois — não sai da boca deles.)
      b(21, { q: "Então disseram Zeba e Salmuna:",
        env: { terrain: "desert", glory: 0.22, night: 0.58, storm: 0.18, verdure: 0.08 }, cast: [
        C("rei", 110, "kneel", { dy: 0.56, facing: -1, id: "zeba" }),
        C("rei", 220, "lie", { dy: 0.52, id: "salmuna" }),
        C("servo", -140, "raise", { dy: 0.52, facing: 1, id: "gideao" }),
      ] }),
      // v.22 — Israel quer coroá-lo: "Domina sobre nós, tanto tu, como teu filho".
      b(22, { by: "homem", q: "Domina sobre nós", set: "ofra", props: OFRA,
        env: { terrain: "city", glory: 0.48, night: 0.24, storm: 0, verdure: 0.3 }, cast: [
        C("homem", 120, "bow", { dy: 0.52, facing: -1, id: "israelita1" }),
        C("homem", 230, "raise", { dy: 0.48, facing: -1, id: "israelita2" }),
        C("servo", -130, "stand", { dy: 0.5, facing: 1, id: "gideao" }),
      ] }),
      // v.23 — a RECUSA: "o Senhor sobre vós dominará". Glória sobe.
      b(23, { by: "servo", q: "Sobre vós eu não dominarei", env: { glory: 0.78, night: 0.14 }, cast: [
        C("servo", -130, "raise", { dy: 0.5, facing: 1, id: "gideao" }),
        C("homem", 120, "kneel", { dy: 0.52, facing: -1, id: "israelita1" }),
        C("homem", 230, "bow", { dy: 0.48, facing: -1, id: "israelita2" }),
      ] }),
      // v.24 — mas pede uma coisa: os pendentes de ouro do despojo.
      b(24, { by: "servo", q: "E disse-lhes mais Gideão:", set: "despojo", props: DESPOJO,
        env: { terrain: "field", glory: 0.5, night: 0.2, verdure: 0.28 }, cast: [
        C("servo", -140, "point", { dy: 0.5, facing: 1, id: "gideao" }),
        C("homem", 110, "stand", { dy: 0.52, facing: -1, id: "israelita1" }),
        C("homem", 220, "stand", { dy: 0.48, facing: -1, id: "israelita2" }),
      ] }),
      // v.25 — a capa estendida no chão; cada um lança ali o seu pendente.
      b(25, { q: "E estenderam uma capa", cast: [
        C("homem", 80, "kneel", { dy: 0.58, facing: -1, id: "israelita1" }),
        C("homem", 190, "bow", { dy: 0.54, facing: -1, id: "israelita2" }),
        C("servo", -140, "stand", { dy: 0.5, facing: 1, id: "gideao" }),
        C("multidao", 280, "stand", { dy: 0.4 }),
      ] }),
      // v.26 — mil e setecentos siclos de ouro, afora as vestes de púrpura.
      b(26, { q: "mil e setecentos siclos de ouro", env: { glory: 0.44, night: 0.22 }, cast: [
        C("servo", -100, "raise", { dy: 0.52, facing: 1, id: "gideao" }),
        C("homem", 130, "stand", { dy: 0.5, facing: -1, id: "israelita1" }),
      ] }),
      // v.27 — o ÉFODE em Ofra: Israel se prostitui após ele — TROPEÇO, laço.
      b(27, { q: "todo o Israel prostituiu-se ali após ele", set: "ofra", props: OFRA,
        env: { terrain: "city", glory: 0.2, night: 0.5, storm: 0.12, verdure: 0.2 }, cast: [
        C("servo", -160, "stand", { dy: 0.5, facing: 1, id: "gideao" }),
        C("homem", 60, "kneel", { dy: 0.58, facing: 1, id: "adorador1" }),
        C("mulherComum", 160, "bow", { dy: 0.54, facing: 1, id: "adoradora2" }),
        C("homem", 260, "kneel", { dy: 0.5, facing: 1, id: "adorador3" }),
      ] }),
      // v.28 — Midiã abatida; a terra sossega quarenta anos.
      b(28, { q: "sossegou a terra quarenta anos", set: "sossego", props: SOSSEGO,
        env: { terrain: "field", glory: 0.66, night: 0.12, storm: 0, verdure: 0.7 }, cast: [
        C("multidao", 140, "stand", { dy: 0.44 }),
        C("servo", -140, "stand", { dy: 0.5, facing: 1, id: "gideao" }),
      ] }),
      // v.29 — Jerubaal, filho de Joás, habitou em sua casa.
      b(29, { q: "habitou em sua casa", env: { glory: 0.58, verdure: 0.6 }, cast: [
        C("servo", -60, "stand", { dy: 0.52, facing: 1, id: "gideao" }),
      ] }),
      // v.30 — setenta filhos, porque tinha muitas mulheres.
      b(30, { q: "E teve Gideão setenta filhos", cast: [
        C("servo", -180, "stand", { dy: 0.5, facing: 1, id: "gideao" }),
        C("homem", -40, "stand", { dy: 0.54, facing: -1, id: "filho1" }),
        C("homem", 70, "stand", { dy: 0.5, facing: -1, id: "filho2" }),
        C("homem", 180, "stand", { dy: 0.46, facing: -1, id: "filho3" }),
        C("multidao", 280, "stand", { dy: 0.4 }),
      ] }),
      // v.31 — a concubina de Siquém dá à luz ABIMELEQUE. Sombra no ar.
      b(31, { q: "e pôs-lhe por nome Abimeleque", set: "siquem", props: SIQUEM,
        env: { terrain: "city", glory: 0.34, night: 0.4, verdure: 0.3 }, cast: [
        C("mulherComum", 100, "stand", { dy: 0.54, facing: -1, id: "concubina" }),
        C("servo", -140, "stand", { dy: 0.5, facing: 1, id: "gideao" }),
        C("rei", 230, "stand", { dy: 0.44, facing: -1, id: "abimeleque-jz" }),
      ] }),
      // v.32 — Gideão morre em boa velhice e é sepultado em Ofra.
      b(32, { q: "numa boa velhice", set: "sepulcro", props: SEPULCRO,
        env: { terrain: "field", glory: 0.4, night: 0.42, verdure: 0.24 }, cast: [
        C("servo", -20, "lie", { dy: 0.6, id: "gideao" }),
        C("homem", 140, "bow", { dy: 0.54, facing: -1, id: "filho1" }),
        C("mulherComum", 240, "kneel", { dy: 0.5, facing: -1, id: "pranteadora" }),
      ] }),
      // v.33 — mal ele morre, Israel se prostitui após os baalins; Baal-Berite.
      b(33, { q: "tornaram a se prostituir após os baalins", set: "baalins", props: BAALINS,
        env: { terrain: "city", glory: 0.12, night: 0.66, storm: 0.16, verdure: 0.18 }, cast: [
        C("homem", -60, "kneel", { dy: 0.6, facing: 1, id: "apostata1" }),
        C("mulherComum", 60, "bow", { dy: 0.56, facing: 1, id: "apostata2" }),
        C("homem", 190, "kneel", { dy: 0.5, facing: 1, id: "apostata3" }),
      ] }),
      // v.34 — não se lembraram do SENHOR, que os livrara de todos ao redor.
      b(34, { q: "não se lembraram do Senhor seu Deus", env: { glory: 0.1, night: 0.7 }, cast: [
        C("homem", -100, "kneel", { dy: 0.6, facing: 1, id: "apostata1" }),
        C("homem", 120, "bow", { dy: 0.54, facing: 1, id: "apostata3" }),
      ] }),
      // v.35 — nem beneficência com a casa de Jerubaal, apesar de todo o bem.
      b(35, { q: "Nem usaram de beneficência com a casa de Jerubaal", set: "sepulcro", props: SEPULCRO,
        env: { terrain: "field", glory: 0.14, night: 0.62, storm: 0.1, verdure: 0.2 }, cast: [
        C("homem", -120, "bow", { dy: 0.56, facing: 1, id: "filho1" }),
        C("homem", 40, "kneel", { dy: 0.52, facing: 1, id: "filho2" }),
        C("mulherComum", 190, "bow", { dy: 0.48, facing: 1, id: "pranteadora" }),
      ] }),
    ],
  },

  // ================================================================== Jz 9
  9: {
    start: { terrain: "city", night: 0.4, glory: 0.16, storm: 0.06, fire: 0, verdure: 0.28 },
    beats: [
      // v.1 — Abimeleque vai a Siquém, aos irmãos de sua mãe, conspirar.
      b(1, { q: "foi a Siquém, aos irmãos de sua mãe", set: "siquem", props: SIQUEM,
        env: { terrain: "city", glory: 0.18, night: 0.42, verdure: 0.28 }, cast: [
        C("rei", -120, "walk", { dy: 0.52, facing: 1, id: "abimeleque-jz" }),
        C("homem", 90, "stand", { dy: 0.5, facing: -1, id: "tio1" }),
        C("homem", 200, "stand", { dy: 0.46, facing: -1, id: "tio2" }),
      ] }),
      // v.2 — a proposta: setenta homens ou um só? "sou osso vosso e carne vossa".
      b(2, { by: "rei", q: "Falai, peço-vos, aos ouvidos de todos os cidadãos de Siquém:", cast: [
        C("rei", -120, "point", { dy: 0.52, facing: 1, id: "abimeleque-jz" }),
        C("homem", 90, "stand", { dy: 0.5, facing: -1, id: "tio1" }),
        C("homem", 200, "stand", { dy: 0.46, facing: -1, id: "tio2" }),
      ] }),
      // v.3 — o coração de Siquém se inclina: "É nosso irmão".
      b(3, { q: "o coração deles se inclinou a seguir Abimeleque", cast: [
        C("homem", -40, "point", { dy: 0.52, facing: -1, id: "tio1" }),
        C("homem", 70, "raise", { dy: 0.48, facing: -1, id: "tio2" }),
        C("rei", -200, "stand", { dy: 0.5, facing: 1, id: "abimeleque-jz" }),
        C("multidao", 220, "stand", { dy: 0.42 }),
      ] }),
      // v.4 — setenta peças de prata do templo de Baal-Berite compram homens vadios.
      b(4, { q: "setenta peças de prata, da casa de Baal-Berite",
        env: { glory: 0.12, night: 0.5, storm: 0.1 }, cast: [
        C("rei", -140, "raise", { dy: 0.52, facing: 1, id: "abimeleque-jz" }),
        C("homem", 40, "stand", { dy: 0.56, facing: -1, id: "ocioso1" }),
        C("homem", 150, "walk", { dy: 0.5, facing: -1, id: "ocioso2" }),
        C("homem", 250, "stand", { dy: 0.46, facing: -1, id: "ocioso3" }),
      ] }),
      // v.5 — SETENTA IRMÃOS mortos SOBRE UMA PEDRA; só Jotão escapa escondido.
      //       Juízo e horror: individuais em lie/bow, noite alta, sem festa e sem glow.
      b(5, { q: "setenta homens, sobre uma pedra", set: "pedra", props: PEDRA,
        env: { terrain: "city", glory: 0.06, night: 0.78, storm: 0.28, verdure: 0.12 }, cast: [
        C("rei", -180, "raise", { dy: 0.5, facing: 1, id: "abimeleque-jz" }),
        C("homem", -30, "lie", { dy: 0.62, id: "irmao1" }),
        C("homem", 90, "lie", { dy: 0.56, id: "irmao2" }),
        C("homem", 200, "bow", { dy: 0.5, facing: 1, id: "irmao3" }),
        C("homem", 300, "kneel", { dy: 0.34, facing: -1, id: "jotao" }),
      ] }),
      // v.6 — coroam Abimeleque rei junto ao CARVALHO ALTO de Siquém.
      b(6, { q: "constituíram a Abimeleque rei, junto ao carvalho alto", set: "siquem", props: SIQUEM,
        env: { terrain: "city", glory: 0.16, night: 0.5, storm: 0.1, verdure: 0.26 }, cast: [
        C("rei", 0, "raise", { dy: 0.46, facing: -1, id: "abimeleque-jz" }),
        C("homem", 170, "bow", { dy: 0.52, facing: -1, id: "cidadao1" }),
        C("homem", 260, "kneel", { dy: 0.46, facing: -1, id: "cidadao2" }),
        C("multidao", -220, "stand", { dy: 0.42 }),
      ] }),
      // v.7 — JOTÃO no cume de GERIZIM: "Ouvi-me, cidadãos de Siquém".
      b(7, { by: "homem", q: "Ouvi-me, cidadãos de Siquém", set: "gerizim", props: GERIZIM,
        env: { terrain: "mountain", glory: 0.3, night: 0.4, storm: 0.08, verdure: 0.24 }, cast: [
        C("homem", -80, "raise", { dy: 0.56, facing: 1, id: "jotao" }),
        C("multidao", 220, "stand", { dy: 0.22 }),
      ] }),
      // v.8 — a PARÁBOLA: as árvores vão ungir um rei e chamam a OLIVEIRA.
      b(8, { by: "homem", q: "Foram uma vez as árvores a ungir para si um rei",
        set: "arvores", props: ARVORES,
        env: { terrain: "field", glory: 0.42, night: 0.24, storm: 0, verdure: 0.66 }, cast: [
        C("homem", -140, "point", { dy: 0.58, facing: 1, id: "jotao" }),
      ] }),
      // v.9 — a oliveira recusa: deixar a gordura que Deus e os homens prezam?
      b(9, { by: "homem", q: "Porém a oliveira lhes disse:", env: { glory: 0.46, verdure: 0.7 }, cast: [
        C("homem", -140, "raise", { dy: 0.58, facing: 1, id: "jotao" }),
      ] }),
      // v.10 — as árvores chamam a FIGUEIRA.
      b(10, { by: "homem", q: "Então disseram as árvores à figueira:", cast: [
        C("homem", -140, "point", { dy: 0.58, facing: 1, id: "jotao" }),
      ] }),
      // v.11 — a figueira recusa: deixar a doçura e o bom fruto?
      b(11, { by: "homem", q: "Porém a figueira lhes disse:", env: { verdure: 0.72 }, cast: [
        C("homem", -140, "raise", { dy: 0.58, facing: 1, id: "jotao" }),
      ] }),
      // v.12 — as árvores chamam a VIDEIRA.
      b(12, { by: "homem", q: "Então disseram as árvores à videira:", cast: [
        C("homem", -140, "point", { dy: 0.58, facing: 1, id: "jotao" }),
      ] }),
      // v.13 — a videira recusa: deixar o mosto que alegra a Deus e aos homens?
      b(13, { by: "homem", q: "Porém a videira lhes disse:", env: { glory: 0.5, verdure: 0.74 }, cast: [
        C("homem", -140, "raise", { dy: 0.58, facing: 1, id: "jotao" }),
      ] }),
      // v.14 — sobra o ESPINHEIRO: "Vem tu, e reina sobre nós".
      b(14, { by: "homem", q: "Então todas as árvores disseram ao espinheiro:",
        set: "espinheiro", props: ESPINHEIRO,
        env: { terrain: "field", glory: 0.32, night: 0.34, verdure: 0.5 }, cast: [
        C("homem", -140, "point", { dy: 0.58, facing: 1, id: "jotao" }),
      ] }),
      // v.15 — o espinheiro aceita: abrigai-vos na minha sombra — ou saia fogo!
      b(15, { by: "homem", q: "E disse o espinheiro às árvores:",
        env: { glory: 0.2, night: 0.48, storm: 0.16, fire: 0.3, verdure: 0.34 }, cast: [
        C("homem", -140, "raise", { dy: 0.58, facing: 1, id: "jotao" }),
      ] }),
      // v.16 — a aplicação: agistes em verdade e sinceridade ao fazer rei Abimeleque?
      b(16, { by: "homem", q: "Agora, pois, se é que em verdade e sinceridade agistes",
        set: "gerizim", props: GERIZIM,
        env: { terrain: "mountain", glory: 0.28, night: 0.42, storm: 0.1, fire: 0, verdure: 0.22 }, cast: [
        C("homem", -80, "point", { dy: 0.56, facing: 1, id: "jotao" }),
        C("multidao", 220, "stand", { dy: 0.22 }),
      ] }),
      // v.17 — "meu pai pelejou por vós, e desprezou a sua vida".
      b(17, { by: "homem", q: "meu pai pelejou por vós, e desprezou a sua vida", cast: [
        C("homem", -80, "raise", { dy: 0.56, facing: 1, id: "jotao" }),
        C("multidao", 220, "stand", { dy: 0.22 }),
      ] }),
      // v.18 — "matastes a seus filhos, setenta homens, sobre uma pedra".
      b(18, { by: "homem", q: "matastes a seus filhos, setenta homens, sobre uma pedra",
        env: { glory: 0.16, night: 0.54, storm: 0.2 }, cast: [
        C("homem", -80, "point", { dy: 0.56, facing: 1, id: "jotao" }),
        C("homem", 180, "bow", { dy: 0.24, facing: 1, id: "cidadao1" }),
        C("homem", 250, "kneel", { dy: 0.21, facing: 1, id: "cidadao2" }),
        C("homem", 310, "bow", { dy: 0.18, facing: 1, id: "cidadao3" }),
      ] }),
      // v.19 — se agistes com sinceridade, alegrai-vos com Abimeleque (ironia).
      b(19, { by: "homem", q: "alegrai-vos com Abimeleque", cast: [
        C("homem", -80, "raise", { dy: 0.56, facing: 1, id: "jotao" }),
        C("multidao", 220, "stand", { dy: 0.22 }),
      ] }),
      // v.20 — a MALDIÇÃO: saia fogo de Abimeleque e fogo dos cidadãos de Siquém.
      b(20, { by: "homem", q: "Mas, se não, saia fogo de Abimeleque",
        env: { glory: 0.12, night: 0.6, storm: 0.3, fire: 0.4 }, cast: [
        C("homem", -80, "raise", { dy: 0.56, facing: 1, id: "jotao" }),
        C("homem", 180, "kneel", { dy: 0.24, facing: 1, id: "cidadao1" }),
        C("homem", 250, "bow", { dy: 0.21, facing: 1, id: "cidadao2" }),
        C("homem", 310, "bow", { dy: 0.18, facing: 1, id: "cidadao3" }),
      ] }),
      // v.21 — Jotão foge para Beer, por medo do irmão.
      b(21, { q: "fugiu e foi para Beer", set: "emboscada", props: EMBOSCADA,
        env: { terrain: "desert", glory: 0.2, night: 0.55, storm: 0.12, fire: 0, verdure: 0.16 }, cast: [
        C("homem", 0, "walk", { dy: 0.56, facing: -1, id: "jotao" }),
      ] }),
      // v.22 — Abimeleque domina três anos sobre Israel.
      b(22, { q: "Abimeleque dominado três anos sobre Israel", set: "siquem", props: SIQUEM,
        env: { terrain: "city", glory: 0.16, night: 0.48, storm: 0.08, verdure: 0.26 }, cast: [
        C("rei", -60, "stand", { dy: 0.5, facing: 1, id: "abimeleque-jz" }),
        C("homem", 140, "bow", { dy: 0.5, facing: -1, id: "cidadao1" }),
        C("homem", 240, "stand", { dy: 0.46, facing: -1, id: "cidadao2" }),
      ] }),
      // v.23 — Deus envia um MAU ESPÍRITO entre Abimeleque e Siquém.
      b(23, { q: "Enviou Deus um mau espírito entre Abimeleque e os cidadãos de Siquém",
        env: { glory: 0.08, night: 0.66, storm: 0.34 }, cast: [
        C("rei", -120, "stand", { dy: 0.5, facing: 1, id: "abimeleque-jz" }),
        C("homem", 90, "point", { dy: 0.52, facing: -1, id: "cidadao1" }),
        C("homem", 210, "stand", { dy: 0.46, facing: -1, id: "cidadao2" }),
      ] }),
      // v.24 — para que o sangue dos setenta caísse sobre quem os matou.
      b(24, { q: "o seu sangue caísse sobre Abimeleque", set: "pedra", props: PEDRA,
        env: { terrain: "city", glory: 0.06, night: 0.74, storm: 0.32, verdure: 0.12 }, cast: [
        C("rei", -170, "stand", { dy: 0.5, facing: 1, id: "abimeleque-jz" }),
        C("homem", 30, "lie", { dy: 0.62, id: "irmao1" }),
        C("homem", 160, "lie", { dy: 0.54, id: "irmao2" }),
      ] }),
      // v.25 — emboscadas nos cumes dos montes; assaltam quem passa.
      b(25, { q: "quem lhe armasse emboscadas sobre os cumes dos montes",
        set: "emboscada", props: EMBOSCADA,
        env: { terrain: "mountain", glory: 0.14, night: 0.6, storm: 0.2, verdure: 0.2 }, cast: [
        C("homem", -140, "kneel", { dy: 0.56, facing: 1, id: "salteador1" }),
        C("homem", 40, "point", { dy: 0.5, facing: 1, id: "salteador2" }),
        C("homem", 200, "walk", { dy: 0.54, facing: -1, id: "viajante" }),
      ] }),
      // v.26 — chega GAAL, filho de Ebede; Siquém confia nele.
      b(26, { q: "Veio também Gaal, filho de Ebede", set: "siquem", props: SIQUEM,
        env: { terrain: "city", glory: 0.2, night: 0.44, storm: 0.08, verdure: 0.3 }, cast: [
        C("homem", -100, "walk", { dy: 0.54, facing: 1, id: "gaal" }),
        C("homem", 100, "stand", { dy: 0.5, facing: -1, id: "cidadao1" }),
        C("homem", 210, "stand", { dy: 0.46, facing: -1, id: "cidadao2" }),
      ] }),
      // v.27 — vindimam, pisam as uvas, festejam e amaldiçoam Abimeleque.
      b(27, { q: "vindimaram as suas vinhas, e pisaram as uvas", set: "vindima", props: VINDIMA,
        env: { terrain: "field", glory: 0.24, night: 0.42, storm: 0.06, verdure: 0.6 }, cast: [
        C("homem", -60, "raise", { dy: 0.56, facing: 1, id: "gaal" }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
      // v.28 — Gaal ergue a voz: "Quem é Abimeleque... para que o sirvamos?"
      b(28, { by: "homem", q: "E disse Gaal, filho de Ebede:", cast: [
        C("homem", -60, "point", { dy: 0.56, facing: 1, id: "gaal" }),
        C("homem", 130, "stand", { dy: 0.5, facing: -1, id: "zebul" }),
        C("multidao", 250, "stand", { dy: 0.44 }),
      ] }),
      // v.29 — "se este povo estivera na minha mão, eu expulsaria a Abimeleque".
      b(29, { by: "homem", q: "se este povo estivera na minha mão", env: { night: 0.48, storm: 0.14 }, cast: [
        C("homem", -60, "raise", { dy: 0.56, facing: 1, id: "gaal" }),
        C("homem", 130, "stand", { dy: 0.5, facing: -1, id: "zebul" }),
        C("multidao", 250, "stand", { dy: 0.44 }),
      ] }),
      // v.30 — ZEBUL, o maioral da cidade, ouve e se acende em ira.
      b(30, { q: "se acendeu a sua ira", set: "porta", props: PORTA,
        env: { terrain: "city", glory: 0.14, night: 0.52, storm: 0.16, verdure: 0.2 }, cast: [
        C("homem", 60, "raise", { dy: 0.52, facing: -1, id: "zebul" }),
        C("homem", -140, "stand", { dy: 0.54, facing: 1, id: "gaal" }),
      ] }),
      // v.31 — mensageiros astutos a Abimeleque: "estão sublevando esta cidade".
      b(31, { by: "homem", q: "E enviou astutamente mensageiros a Abimeleque, dizendo:", cast: [
        C("homem", -60, "point", { dy: 0.54, facing: 1, id: "zebul" }),
        C("homem", 120, "walk", { dy: 0.5, facing: -1, id: "mensageiro" }),
        C("rei", 260, "stand", { dy: 0.42, facing: -1, id: "abimeleque-jz" }),
      ] }),
      // v.32 — "Levanta-te de noite... e põe emboscadas no campo."
      b(32, { by: "homem", q: "põe emboscadas no campo", env: { night: 0.62, glory: 0.1 }, cast: [
        C("homem", -60, "raise", { dy: 0.54, facing: 1, id: "zebul" }),
        C("rei", 200, "stand", { dy: 0.46, facing: -1, id: "abimeleque-jz" }),
      ] }),
      // v.33 — "levanta-te pela manhã ao sair o sol, e dá de golpe sobre a cidade".
      b(33, { by: "homem", q: "E levanta-te pela manhã ao sair o sol", cast: [
        C("homem", -60, "point", { dy: 0.54, facing: 1, id: "zebul" }),
        C("rei", 200, "stand", { dy: 0.46, facing: -1, id: "abimeleque-jz" }),
      ] }),
      // v.34 — de noite, quatro tropas emboscadas contra Siquém.
      b(34, { q: "puseram emboscadas a Siquém, com quatro tropas", set: "emboscada", props: EMBOSCADA,
        env: { terrain: "field", glory: 0.08, night: 0.76, storm: 0.18, verdure: 0.22 }, cast: [
        C("rei", -160, "kneel", { dy: 0.54, facing: 1, id: "abimeleque-jz" }),
        C("homem", -30, "kneel", { dy: 0.58, facing: 1, id: "tropa1" }),
        C("homem", 110, "kneel", { dy: 0.5, facing: 1, id: "tropa2" }),
        C("homem", 230, "kneel", { dy: 0.44, facing: 1, id: "tropa3" }),
      ] }),
      // v.35 — Gaal se põe à entrada da PORTA; as emboscadas se levantam.
      b(35, { q: "pôs-se à entrada da porta da cidade", set: "porta", props: PORTA,
        env: { terrain: "city", glory: 0.22, night: 0.5, storm: 0.14, verdure: 0.2 }, cast: [
        C("homem", -80, "stand", { dy: 0.54, facing: 1, id: "gaal" }),
        C("rei", 180, "stand", { dy: 0.44, facing: -1, id: "abimeleque-jz" }),
        C("multidao", 280, "stand", { dy: 0.4 }),
      ] }),
      // v.36 — "Eis que desce gente dos cumes dos montes" / "são sombras", diz Zebul.
      b(36, { by: "homem", q: "disse a Zebul:", cast: [
        C("homem", -120, "point", { dy: 0.56, facing: 1, id: "gaal" }),
        C("homem", 40, "stand", { dy: 0.52, facing: -1, id: "zebul" }),
        C("rei", 220, "walk", { dy: 0.4, facing: -1, id: "abimeleque-jz" }),
      ] }),
      // v.37 — "desce gente do meio da terra... do caminho do carvalho de Meonenim".
      b(37, { by: "homem", q: "Eis ali desce gente do meio da terra", cast: [
        C("homem", -120, "raise", { dy: 0.56, facing: 1, id: "gaal" }),
        C("homem", 40, "stand", { dy: 0.52, facing: -1, id: "zebul" }),
        C("rei", 220, "walk", { dy: 0.42, facing: -1, id: "abimeleque-jz" }),
      ] }),
      // v.38 — Zebul desmascara: "Onde está agora a tua boca?... Sai e peleja".
      b(38, { by: "homem", q: "Então lhe disse Zebul:", cast: [
        C("homem", 40, "point", { dy: 0.52, facing: -1, id: "zebul" }),
        C("homem", -120, "bow", { dy: 0.56, facing: 1, id: "gaal" }),
        C("rei", 240, "stand", { dy: 0.42, facing: -1, id: "abimeleque-jz" }),
      ] }),
      // v.39 — Gaal sai à vista de Siquém e peleja contra Abimeleque.
      b(39, { q: "E saiu Gaal à vista dos cidadãos de Siquém",
        env: { glory: 0.14, night: 0.5, storm: 0.24 }, cast: [
        C("homem", -140, "walk", { dy: 0.54, facing: 1, id: "gaal" }),
        C("rei", 120, "raise", { dy: 0.48, facing: -1, id: "abimeleque-jz" }),
        C("homem", 240, "stand", { dy: 0.44, facing: -1, id: "tropa1" }),
      ] }),
      // v.40 — Gaal foge; feridos caem até à entrada da porta (sem festa).
      b(40, { q: "muitos feridos caíram até à entrada da porta da cidade",
        env: { glory: 0.08, night: 0.62, storm: 0.32, verdure: 0.16 }, cast: [
        C("homem", -180, "walk", { dy: 0.5, facing: -1, id: "gaal" }),
        C("homem", -40, "lie", { dy: 0.62, id: "ferido1" }),
        C("homem", 90, "lie", { dy: 0.56, id: "ferido2" }),
        C("rei", 220, "raise", { dy: 0.46, facing: -1, id: "abimeleque-jz" }),
      ] }),
      // v.41 — Abimeleque fica em Arumá; Zebul expulsa Gaal de Siquém.
      b(41, { q: "E Zebul expulsou a Gaal e a seus irmãos", cast: [
        C("homem", 60, "point", { dy: 0.52, facing: -1, id: "zebul" }),
        C("homem", -160, "walk", { dy: 0.54, facing: -1, id: "gaal" }),
        C("homem", -60, "walk", { dy: 0.5, facing: -1, id: "irmao-gaal" }),
      ] }),
      // v.42 — no dia seguinte o povo sai ao campo; avisam Abimeleque.
      b(42, { q: "o povo saiu ao campo", set: "emboscada", props: EMBOSCADA,
        env: { terrain: "field", glory: 0.2, night: 0.4, storm: 0.14, verdure: 0.34 }, cast: [
        C("homem", -140, "walk", { dy: 0.5, facing: 1, id: "siquemita1" }),
        C("homem", -30, "walk", { dy: 0.46, facing: 1, id: "siquemita2" }),
        C("homem", 80, "bow", { dy: 0.44, facing: 1, id: "siquemita3" }),
        C("rei", 220, "stand", { dy: 0.42, facing: -1, id: "abimeleque-jz" }),
      ] }),
      // v.43 — três tropas emboscadas; o povo sai da cidade e é ferido.
      b(43, { q: "o repartiu em três tropas", env: { glory: 0.1, night: 0.54, storm: 0.28 }, cast: [
        C("rei", -180, "point", { dy: 0.5, facing: 1, id: "abimeleque-jz" }),
        C("homem", -50, "kneel", { dy: 0.58, facing: 1, id: "tropa1" }),
        C("homem", 80, "kneel", { dy: 0.52, facing: 1, id: "tropa2" }),
        C("homem", 210, "kneel", { dy: 0.46, facing: 1, id: "tropa3" }),
      ] }),
      // v.44 — romperam de improviso e pararam à entrada da porta.
      b(44, { q: "romperam de improviso", set: "porta", props: PORTA,
        env: { terrain: "city", glory: 0.08, night: 0.6, storm: 0.34, verdure: 0.14 }, cast: [
        C("rei", -140, "walk", { dy: 0.5, facing: 1, id: "abimeleque-jz" }),
        C("homem", 30, "lie", { dy: 0.6, id: "siquemita1" }),
        C("homem", 160, "bow", { dy: 0.54, facing: 1, id: "siquemita2" }),
      ] }),
      // v.45 — a cidade tomada, o povo morto, e a terra SEMEADA DE SAL.
      b(45, { q: "assolou a cidade, e a semeou de sal",
        env: { terrain: "city", glory: 0.05, night: 0.72, storm: 0.36, verdure: 0.04 }, cast: [
        C("rei", -160, "raise", { dy: 0.5, facing: 1, id: "abimeleque-jz" }),
        C("homem", -20, "lie", { dy: 0.62, id: "siquemita1" }),
        C("mulherComum", 110, "lie", { dy: 0.56, id: "siquemita2" }),
        C("homem", 230, "kneel", { dy: 0.48, facing: 1, id: "siquemita3" }),
      ] }),
      // v.46 — os da TORRE de Siquém se refugiam na fortaleza do deus Berite.
      //        A torre ainda está INTACTA: nada de campfire aceso antes de v.49.
      b(46, { q: "entraram na fortaleza, na casa do deus Berite", set: "fortaleza", props: FORTALEZA,
        env: { terrain: "city", glory: 0.08, night: 0.66, storm: 0.26, fire: 0.2, verdure: 0.1 }, cast: [
        C("homem", -140, "walk", { dy: 0.5, facing: 1, id: "refugiado1" }),
        C("mulherComum", -30, "walk", { dy: 0.54, facing: 1, id: "refugiada2" }),
        C("homem", 250, "bow", { dy: 0.46, facing: 1, id: "refugiado3" }),
      ] }),
      // v.47 — contam a Abimeleque que todos se congregaram na torre (ainda em pé,
      //        herdando a FORTALEZA sem fogo do beat anterior).
      b(47, { q: "todos os cidadãos da torre de Siquém se haviam congregado", cast: [
        C("rei", -200, "stand", { dy: 0.5, facing: 1, id: "abimeleque-jz" }),
        C("homem", -90, "point", { dy: 0.54, facing: 1, id: "mensageiro" }),
      ] }),
      // v.48 — no monte Salmom, o machado e o ramo ao ombro: "fazei como eu".
      b(48, { by: "rei", q: "e disse ao povo, que com ele havia:", set: "emboscada", props: EMBOSCADA,
        env: { terrain: "mountain", glory: 0.1, night: 0.6, storm: 0.2, fire: 0.1, verdure: 0.24 }, cast: [
        C("rei", -80, "raise", { dy: 0.54, facing: 1, id: "abimeleque-jz" }),
        C("homem", 90, "stand", { dy: 0.52, facing: -1, id: "tropa1" }),
        C("homem", 210, "walk", { dy: 0.46, facing: -1, id: "tropa2" }),
      ] }),
      // v.49 — a TORRE QUEIMADA a fogo com mil homens e mulheres dentro (campfire!).
      b(49, { q: "queimaram-na a fogo com os que nela estavam", set: "fogotorre", props: FOGO_TORRE,
        env: { terrain: "city", glory: 0.04, night: 0.8, storm: 0.34, fire: 0.9, verdure: 0.04 }, cast: [
        C("rei", -180, "raise", { dy: 0.5, facing: 1, id: "abimeleque-jz" }),
        C("homem", -40, "lie", { dy: 0.62, id: "morto-torre1" }),
        C("mulherComum", 70, "kneel", { dy: 0.56, facing: 1, id: "morta-torre2" }),
        C("homem", 230, "bow", { dy: 0.48, facing: 1, id: "morto-torre3" }),
      ] }),
      // v.50 — Abimeleque vai a TEBES, sitia e toma a cidade.
      b(50, { q: "Então Abimeleque foi a Tebes e a sitiou", set: "tebes", props: TEBES,
        env: { terrain: "city", glory: 0.1, night: 0.58, storm: 0.24, fire: 0.12, verdure: 0.14 }, cast: [
        C("rei", -160, "walk", { dy: 0.52, facing: 1, id: "abimeleque-jz" }),
        C("homem", -40, "walk", { dy: 0.5, facing: 1, id: "tropa1" }),
        C("homem", 230, "bow", { dy: 0.46, facing: -1, id: "tebita" }),
      ] }),
      // v.51 — a torre forte: todos sobem ao eirado e fecham as portas.
      b(51, { q: "subiram ao eirado da torre", cast: [
        C("mulherComum", -30, "stand", { dy: 0.16, facing: 1, id: "mulher-da-torre" }),
        C("homem", 60, "stand", { dy: 0.18, facing: -1, id: "refugiado-tebes" }),
        C("rei", -220, "walk", { dy: 0.54, facing: 1, id: "abimeleque-jz" }),
      ] }),
      // v.52 — Abimeleque chega à porta da torre para a incendiar.
      b(52, { q: "chegou-se até à porta da torre, para a incendiar",
        env: { glory: 0.06, night: 0.68, storm: 0.3, fire: 0.4 }, cast: [
        C("rei", -60, "walk", { dy: 0.56, facing: 1, id: "abimeleque-jz" }),
        C("mulherComum", 20, "stand", { dy: 0.14, facing: 1, id: "mulher-da-torre" }),
        C("homem", -200, "stand", { dy: 0.5, facing: 1, id: "tropa1" }),
      ] }),
      // v.53 — do ALTO DA TORRE, uma MULHER lança o pedaço de mó: o crânio quebrado.
      b(53, { q: "Porém uma mulher lançou um pedaço de uma mó sobre a cabeça de Abimeleque",
        set: "mo", props: MO,
        env: { terrain: "city", glory: 0.05, night: 0.74, storm: 0.36, fire: 0.2, verdure: 0.08 }, cast: [
        C("mulherComum", 60, "raise", { dy: 0.12, facing: -1, id: "mulher-da-torre" }),
        C("rei", -40, "lie", { dy: 0.66, id: "abimeleque-jz" }),
      ] }),
      // v.54 — "mata-me; para que não se diga: Uma mulher o matou". E morreu.
      //        (NARRADOR: o versículo termina na morte dele — não é fala dele.)
      b(54, { q: "e disse-lhe: Desembainha a tua espada", cast: [
        C("rei", -40, "lie", { dy: 0.66, id: "abimeleque-jz" }),
        C("homem", 100, "kneel", { dy: 0.6, facing: 1, id: "escudeiro" }),
        C("mulherComum", 60, "stand", { dy: 0.12, facing: -1, id: "mulher-da-torre" }),
      ] }),
      // v.55 — morto Abimeleque, cada um de Israel se vai para o seu lugar.
      b(55, { q: "foram-se cada um para o seu lugar",
        env: { glory: 0.1, night: 0.62, storm: 0.2, fire: 0 }, cast: [
        C("rei", -40, "lie", { dy: 0.66, id: "abimeleque-jz" }),
        C("homem", 120, "walk", { dy: 0.54, facing: -1, id: "israelita1" }),
        C("homem", 230, "walk", { dy: 0.48, facing: -1, id: "israelita2" }),
      ] }),
      // v.56 — Deus fez tornar sobre Abimeleque o mal dos setenta irmãos.
      b(56, { q: "Assim Deus fez tornar sobre Abimeleque o mal que tinha feito a seu pai",
        set: "pedra", props: PEDRA,
        env: { terrain: "city", glory: 0.24, night: 0.56, storm: 0.16, verdure: 0.12 }, cast: [
        C("rei", -170, "lie", { dy: 0.64, id: "abimeleque-jz" }),
        C("homem", 60, "lie", { dy: 0.56, id: "irmao1" }),
        C("homem", 190, "lie", { dy: 0.5, id: "irmao2" }),
      ] }),
      // v.57 — e a MALDIÇÃO DE JOTÃO veio sobre a cabeça dos homens de Siquém.
      b(57, { q: "a maldição de Jotão, filho de Jerubaal, veio sobre eles",
        set: "gerizim", props: GERIZIM,
        env: { terrain: "mountain", glory: 0.34, night: 0.48, storm: 0.14, verdure: 0.2 }, cast: [
        C("homem", -80, "raise", { dy: 0.56, facing: 1, id: "jotao" }),
        C("homem", 120, "bow", { dy: 0.52, facing: 1, id: "siquemita1" }),
        C("homem", 240, "kneel", { dy: 0.46, facing: 1, id: "siquemita2" }),
      ] }),
    ],
  },
};
