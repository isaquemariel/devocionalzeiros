// ============================================================================
// JUÍZES 6–7 — CENA VIVA. GIDEÃO: do lagar escondido ao brado dos 300.
//
// Jz 6 — O CICLO outra vez: Israel faz o que é mau, e o SENHOR os dá NAS MÃOS
// DOS MIDIANITAS por sete anos. O povo cava COVAS nos montes, cavernas e
// fortificações; os do oriente sobem como GAFANHOTOS e não deixam mantimento,
// nem ovelhas, nem bois, nem jumentos. Israel empobrece — e CLAMA. Deus envia
// primeiro um PROFETA (fala como homem: "Do Egito eu vos fiz subir… mas não
// destes ouvidos à minha voz"), e depois o ANJO DO SENHOR, que se assenta
// DEBAIXO DO CARVALHO de Ofra enquanto GIDEÃO malha trigo escondido NO LAGAR.
// "O Senhor é contigo, homem valoroso." O sinal: o cabrito e os pães ázimos
// sobre a PENHA, o cajado que os toca, e o FOGO QUE SOBE DA ROCHA e consome a
// oferta — e o anjo desaparece. Gideão edifica o altar "O SENHOR É PAZ". De
// noite, derruba o ALTAR DE BAAL e corta o POSTE-ÍDOLO: por isso lhe chamam
// JERUBAAL. Enfim, o VELO na eira: orvalho só no velo, e depois orvalho só no
// chão.
//
// Jz 7 — À FONTE DE HARODE: 32 mil viram 10 mil, e 10 mil viram TREZENTOS —
// os que LAMBERAM a água como o cão lambe, levando a mão à boca. De noite,
// Gideão e o moço Purá descem às sentinelas e ouvem o SONHO DO PÃO DE CEVADA
// que rola pelo arraial e transtorna a tenda. Ele adora, e volta. Trezentos
// homens, três companhias: BUZINAS na mão direita, CÂNTAROS vazios com TOCHAS
// acesas dentro. Na VIGÍLIA DA MEIA-NOITE, os cântaros se quebram, as tochas
// ardem, as trombetas tocam e o brado sobe: "ESPADA DO SENHOR, E DE GIDEÃO."
// O SENHOR volta a espada de um contra o outro e Midiã debanda.
//
// A VOZ DE DEUS (regra do projeto): o PROFETA de 6:8 fala como HOMEM enviado
// (`by: "homem"`), não voz do céu. Sob o carvalho, o mediador é VISÍVEL — o
// ANJO DO SENHOR — e por isso toda a fala de 6:12-21 sai dele (`by: "anjo"`,
// figura luminosa com `glow`), nunca `by: "deus"`. Quando o anjo já
// desapareceu (6:23), e nas ordens da noite (6:25-26) e da fonte (7:2-10), o
// SENHOR fala DIRETO e sem mediador: `by: "deus"`, glória alta, sem figura.
// Gideão, protagonista, fala como `by: "servo"` sendo o PRIMEIRO servo do cast
// (id "gideao").
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const dv = (v: number, q?: string, extra: Partial<StageBeat> = {}) => b(v, { by: "deus", ...(q ? { q } : {}), ...extra });

// ---------------------------------------------------------------- SETS Jz 6
// A TERRA SOB MIDIÃ — a seara de Israel entregue ao saque do oriente.
const SEARA: StagePropSpec[] = [
  P("sheaf", -160, 1.0, undefined, 0.6),
  P("sheaf", 60, 0.95, undefined, 0.64),
  P("grass", 200, 0.78, undefined, 0.7),
  P("tree", -320, 1.0, undefined, 0.2),
  P("stall", 300, 1.0, undefined, 0.34),
];
// AS COVAS NOS MONTES — cavernas e fortificações onde Israel se esconde.
const COVAS: StagePropSpec[] = [
  P("rock", -40, 1.5, undefined, 0.42),
  P("rock", -260, 1.15, undefined, 0.52),
  P("rock", 230, 1.2, undefined, 0.48),
  P("tower", 330, 1.0, undefined, 0.28),
  P("bush", 120, 0.85, undefined, 0.66),
];
// A DEVASTAÇÃO — gafanhotos, camelos e gado do oriente sobre a terra nua.
const PRAGA: StagePropSpec[] = [
  P("locusts", 0, 1.2, undefined, 0.5),
  P("stall", -220, 1.05, undefined, 0.36),
  P("stall", 240, 1.0, undefined, 0.32),
  P("tent", 330, 1.0, undefined, 0.26),
  P("sheaf", -80, 0.8, undefined, 0.7),
];
// O LAGAR DE OFRA — o CARVALHO de Joás e o lagar onde Gideão malha o trigo.
const OFRA: StagePropSpec[] = [
  { ...P("tree", 210, 1.35, undefined, 0.28), tag: "carvalho-de-ofra" },
  P("rock", -110, 1.15, undefined, 0.56),
  P("sheaf", -230, 0.95, undefined, 0.62),
  P("amphora", -20, 0.8, undefined, 0.66),
  P("grass", 90, 0.76, undefined, 0.72),
  P("bush", -330, 0.9, undefined, 0.22),
];
// A PENHA — a carne e os pães ázimos sobre a rocha; o fogo que dela sobe.
const PENHA: StagePropSpec[] = [
  { ...P("rock", 40, 1.5, undefined, 0.5), tag: "penha-de-ofra" },
  P("campfire", 40, 1.15, 1, 0.5),
  { ...P("tree", 220, 1.3, undefined, 0.28), tag: "carvalho-de-ofra" },
  P("crate", -140, 0.8, undefined, 0.64),
  P("grass", -240, 0.76, undefined, 0.7),
];
// O ALTAR "O SENHOR É PAZ" em Ofra dos abiezritas.
const PAZ: StagePropSpec[] = [
  { ...P("altar", 0, 1.25, 0.5, 0.5), tag: "altar-o-senhor-e-paz" },
  P("tree", 230, 1.3, undefined, 0.28),
  P("rock", -230, 1.1, undefined, 0.5),
  P("grass", 120, 0.76, undefined, 0.7),
];
// O ALTAR DE BAAL e o BOSQUE (poste-ídolo) ao pé dele — de noite, antes.
const BAAL: StagePropSpec[] = [
  { ...P("altar", -40, 1.3, undefined, 0.48), tag: "altar-de-baal" },
  { ...P("tree", 150, 1.25, undefined, 0.32), tag: "poste-idolo-de-baal" },
  P("rock", 270, 1.05, undefined, 0.52),
  P("stall", -280, 1.0, undefined, 0.34),
  P("grass", 60, 0.74, undefined, 0.72),
];
// A MADRUGADA DO ESCÂNDALO — o altar de Baal em ruína, o bosque cortado,
// e o segundo boi oferecido no altar novo, ardendo.
const RUINA: StagePropSpec[] = [
  P("rock", -60, 1.35, undefined, 0.6),
  P("rock", -190, 1.05, undefined, 0.66),
  { ...P("altar", 110, 1.25, 1, 0.5), tag: "altar-novo-de-gideao" },
  P("tree", 260, 0.7, undefined, 0.62),
  P("grass", 30, 0.74, undefined, 0.72),
];
// O VALE DE JIZREEL — o arraial de Midiã acampado, tendas e camelos.
const JIZREEL: StagePropSpec[] = [
  P("tent", -180, 1.15, undefined, 0.22),
  P("tent", 120, 1.05, undefined, 0.28),
  P("tent", 290, 0.95, undefined, 0.3),
  P("stall", -30, 1.05, undefined, 0.4),
  P("grass", 220, 0.76, undefined, 0.7),
  P("rock", -330, 1.05, undefined, 0.46),
];
// A CONVOCAÇÃO — a buzina de Gideão e as tribos que se ajuntam.
const BUZINA: StagePropSpec[] = [
  P("trumpet", 170, 1.0, undefined, 0.46),
  P("rock", -260, 1.1, undefined, 0.44),
  P("tree", 300, 1.1, undefined, 0.26),
  P("grass", 40, 0.78, undefined, 0.7),
];
// A EIRA — o velo de lã, a taça do orvalho espremido, a noite sobre o chão.
const EIRA: StagePropSpec[] = [
  { ...P("sheaf", -30, 1.15, undefined, 0.58), tag: "velo-na-eira" },
  P("bowl", 130, 0.85, undefined, 0.66),
  P("sheaf", -230, 0.9, undefined, 0.62),
  P("grass", 230, 0.76, undefined, 0.7),
  { ...P("moon", 60, 1.5, undefined, 0.76), sky: true },
];

// ---------------------------------------------------------------- SETS Jz 7
// A FONTE DE HARODE — as águas onde o povo foi provado, o outeiro de Moré.
const HARODE: StagePropSpec[] = [
  { ...P("river", 0, 1.35, undefined, 0.84), tag: "fonte-de-harode" },
  P("rock", -270, 1.15, undefined, 0.44),
  P("rock", 290, 1.1, undefined, 0.4),
  P("palm", -340, 1.0, undefined, 0.14),
  P("grass", 170, 0.76, undefined, 0.68),
];
// O ARRAIAL DOS TREZENTOS — provisão, cântaros e buzinas na mão.
const TREZENTOS: StagePropSpec[] = [
  P("trumpet", -140, 0.9, undefined, 0.6),
  P("amphora", -30, 0.8, undefined, 0.64),
  P("amphora", 60, 0.78, undefined, 0.66),
  P("tent", 250, 1.0, undefined, 0.26),
  P("rock", -300, 1.1, undefined, 0.44),
  P("grass", 170, 0.76, undefined, 0.7),
];
// O ARRAIAL DE MIDIÃ NO VALE, de noite — tendas sem conta e camelos.
const MIDIA: StagePropSpec[] = [
  P("tent", -200, 1.15, undefined, 0.24),
  P("tent", -40, 1.05, undefined, 0.3),
  P("tent", 160, 1.0, undefined, 0.28),
  P("tent", 310, 0.9, undefined, 0.32),
  P("stall", 60, 1.05, undefined, 0.42),
  { ...P("moon", -80, 1.4, undefined, 0.78), sky: true },
];
// O SONHO DO PÃO DE CEVADA — o pão que rola e transtorna a tenda de cima abaixo.
const SONHO: StagePropSpec[] = [
  { ...P("sheaf", -20, 1.2, undefined, 0.58), tag: "pao-de-cevada-do-sonho" },
  P("tent", 180, 1.15, undefined, 0.34),
  P("tent", -230, 0.95, undefined, 0.28),
  P("campfire", 90, 0.7, 0.5, 0.62),
  { ...P("starfield", 250, 0.9, undefined, 0.8), sky: true },
];
// A VIGÍLIA DA MEIA-NOITE — as TOCHAS acesas, os cântaros quebrados, as buzinas.
const VIGILIA: StagePropSpec[] = [
  P("campfire", -170, 1.0, 1, 0.56),
  P("campfire", 20, 1.1, 1, 0.52),
  P("campfire", 210, 1.0, 1, 0.58),
  P("trumpet", -80, 0.85, undefined, 0.62),
  P("trumpet", 120, 0.85, undefined, 0.6),
  P("amphora", -240, 0.75, undefined, 0.68),
  P("tent", 320, 1.0, undefined, 0.28),
];
// A DEBANDADA — o arraial em fuga, tochas ardendo entre tendas caídas.
const DEBANDADA: StagePropSpec[] = [
  P("campfire", 200, 1.05, 1, 0.54),
  P("tent", 60, 1.0, undefined, 0.32),
  P("rock", -250, 1.1, undefined, 0.5),
  P("amphora", -60, 0.7, undefined, 0.7),
  P("grass", 280, 0.74, undefined, 0.7),
];
// O JORDÃO E AS ÁGUAS DE BETE-BARA — os vaus tomados, a penha de Orebe.
const JORDAO: StagePropSpec[] = [
  P("river", 0, 1.4, undefined, 0.84),
  { ...P("rock", 200, 1.3, undefined, 0.5), tag: "penha-de-orebe" },
  P("rock", -280, 1.1, undefined, 0.44),
  P("palm", 330, 1.0, undefined, 0.14),
  P("grass", -110, 0.76, undefined, 0.7),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Jz 6
  6: {
    start: { terrain: "field", night: 0.3, glory: 0.28, storm: 0, fire: 0, verdure: 0.3 },
    beats: [
      // v.1 — o ciclo recomeça: o mal aos olhos do SENHOR, sete anos de Midiã.
      b(1, { q: "nas mãos dos midianitas por sete anos", set: "seara", props: SEARA,
        env: { terrain: "field", glory: 0.22, night: 0.4, verdure: 0.28 }, cast: [
        C("homem", -140, "bow", { dy: 0.56, facing: 1, id: "israelita1" }),
        C("mulherComum", 20, "kneel", { dy: 0.54, facing: -1, id: "israelita2" }),
        C("rei", 220, "stand", { dy: 0.44, facing: -1, id: "midianita-chefe" }),
      ] }),
      // v.2 — Israel se esconde: as covas nos montes, as cavernas, as fortificações.
      b(2, { q: "as covas que estão nos montes, as cavernas e as fortificações",
        set: "covas", props: COVAS,
        env: { terrain: "mountain", glory: 0.16, night: 0.55, verdure: 0.16 }, cast: [
        C("homem", -150, "kneel", { dy: 0.6, facing: 1, id: "escondido1" }),
        C("mulherComum", 100, "bow", { dy: 0.58, facing: -1, id: "escondida2" }),
        C("homem", 250, "lie", { dy: 0.62, id: "escondido3" }),
      ] }),
      // v.3 — semeando Israel, subiam contra ele Midiã, Amaleque e os do oriente.
      b(3, { q: "os midianitas e os amalequitas, e também os do oriente",
        set: "seara", props: SEARA,
        env: { terrain: "field", glory: 0.2, night: 0.42, verdure: 0.34 }, cast: [
        C("homem", -180, "kneel", { dy: 0.58, facing: 1, id: "semeador" }),
        C("homem", 90, "walk", { dy: 0.5, facing: -1, id: "midianita1" }),
        C("homem", 220, "walk", { dy: 0.48, facing: -1, id: "amalequita" }),
      ] }),
      // v.4 — destruíam os frutos da terra: nem mantimento, nem ovelhas, nem bois.
      b(4, { q: "destruíam os frutos da terra", set: "praga", props: PRAGA,
        env: { terrain: "field", glory: 0.16, night: 0.48, storm: 0.14, verdure: 0.1 }, cast: [
        C("homem", 150, "point", { dy: 0.5, facing: -1, id: "saqueador" }),
        C("homem", -170, "bow", { dy: 0.58, facing: 1, id: "lavrador" }),
      ] }),
      // v.5 — subiam com gados e tendas, como gafanhotos, camelos sem conta.
      b(5, { q: "vinham como gafanhotos, em grande multidão que não se podia contar",
        env: { glory: 0.14, night: 0.5, storm: 0.2, verdure: 0.08 }, cast: [
        C("homem", 40, "walk", { dy: 0.46, facing: -1, id: "midianita1" }),
        C("homem", 170, "walk", { dy: 0.5, facing: -1, id: "midianita2" }),
        C("homem", 290, "walk", { dy: 0.42, facing: -1, id: "midianita3" }),
      ] }),
      // v.6 — Israel empobreceu muito; e clamou ao SENHOR.
      b(6, { q: "os filhos de Israel clamaram ao Senhor", set: "covas", props: COVAS,
        env: { terrain: "mountain", glory: 0.24, night: 0.52, storm: 0.1, verdure: 0.12 }, cast: [
        C("homem", -140, "kneel", { dy: 0.6, facing: 1, id: "clamor1" }),
        C("mulherComum", 30, "kneel", { dy: 0.58, facing: -1, id: "clamor2" }),
        C("homem", 190, "bow", { dy: 0.6, facing: -1, id: "clamor3" }),
      ] }),
      // v.7 — clamando os filhos de Israel por causa dos midianitas…
      b(7, { q: "clamando os filhos de Israel ao Senhor",
        env: { glory: 0.34, night: 0.46 }, cast: [
        C("homem", -120, "raise", { dy: 0.58, facing: 1, id: "clamor1" }),
        C("mulherComum", 60, "kneel", { dy: 0.56, facing: -1, id: "clamor2" }),
      ] }),
      // v.8 — o PROFETA enviado. Fala como HOMEM (não voz do céu).
      b(8, { by: "homem", q: "que lhes disse:", set: "seara", props: SEARA,
        env: { terrain: "field", glory: 0.42, night: 0.34, verdure: 0.24 }, cast: [
        C("homem", -110, "raise", { dy: 0.5, facing: -1, id: "profeta" }),
        C("homem", 110, "stand", { dy: 0.54, facing: 1, id: "ouvinte1" }),
        C("mulherComum", 210, "stand", { dy: 0.52, facing: 1, id: "ouvinte2" }),
      ] }),
      // v.9 — eu vos livrei da mão dos egípcios e a vós dei a sua terra.
      b(9, { by: "homem", env: { glory: 0.5 }, cast: [
        C("homem", -110, "point", { dy: 0.5, facing: -1, id: "profeta" }),
        C("homem", 110, "stand", { dy: 0.54, facing: 1, id: "ouvinte1" }),
      ] }),
      // v.10 — "mas não destes ouvidos à minha voz": a acusação.
      b(10, { by: "homem", q: "E vos disse:",
        env: { glory: 0.3, night: 0.42 }, cast: [
        C("homem", -110, "raise", { dy: 0.5, facing: -1, id: "profeta" }),
        C("homem", 110, "bow", { dy: 0.56, facing: 1, id: "ouvinte1" }),
        C("mulherComum", 210, "bow", { dy: 0.54, facing: 1, id: "ouvinte2" }),
      ] }),
      // v.11 — o ANJO do SENHOR debaixo do CARVALHO; Gideão malha trigo no lagar.
      b(11, { q: "assentou-se debaixo do carvalho que está em Ofra",
        set: "ofra", props: OFRA,
        env: { terrain: "field", glory: 0.55, night: 0.22, verdure: 0.34 }, cast: [
        C("anjo", 200, "stand", { dy: 0.4, facing: -1, glow: 0.85 }),
        C("servo", -120, "kneel", { dy: 0.58, facing: 1, id: "gideao" }),
      ] }),
      // v.12 — "O Senhor é contigo, homem valoroso." (mediador VISÍVEL: o anjo)
      b(12, { by: "anjo", q: "e lhe disse:", env: { glory: 0.7, night: 0.18 }, cast: [
        C("anjo", 190, "raise", { dy: 0.4, facing: -1, glow: 1 }),
        C("servo", -100, "stand", { dy: 0.56, facing: 1, id: "gideao" }),
      ] }),
      // v.13 — Gideão: se o SENHOR é conosco, por que tudo isto nos sobreveio?
      b(13, { by: "servo", q: "Mas Gideão lhe respondeu:", env: { glory: 0.52, night: 0.26 }, cast: [
        C("servo", -100, "raise", { dy: 0.56, facing: 1, id: "gideao" }),
        C("anjo", 190, "stand", { dy: 0.4, facing: -1, glow: 0.9 }),
      ] }),
      // v.14 — "Vai nesta tua força… porventura não te enviei eu?" (pelo anjo)
      b(14, { by: "anjo", q: "Então o Senhor olhou para ele, e disse:",
        env: { glory: 0.82, night: 0.14 }, cast: [
        C("anjo", 180, "point", { dy: 0.4, facing: -1, glow: 1 }),
        C("servo", -90, "stand", { dy: 0.56, facing: 1, id: "gideao" }),
      ] }),
      // v.15 — a minha família é a mais pobre, e eu o menor na casa de meu pai.
      b(15, { by: "servo", q: "E ele lhe disse:", env: { glory: 0.6 }, cast: [
        C("servo", -90, "bow", { dy: 0.58, facing: 1, id: "gideao" }),
        C("anjo", 180, "stand", { dy: 0.4, facing: -1, glow: 0.95 }),
      ] }),
      // v.16 — "eu hei de ser contigo": ferirás Midiã como se fosse um só homem.
      b(16, { by: "anjo", q: "E o Senhor lhe disse:", env: { glory: 0.85 }, cast: [
        C("anjo", 180, "raise", { dy: 0.4, facing: -1, glow: 1 }),
        C("servo", -90, "kneel", { dy: 0.58, facing: 1, id: "gideao" }),
      ] }),
      // v.17 — Gideão pede um SINAL de que és tu que falas comigo.
      b(17, { by: "servo", q: "E ele disse:", env: { glory: 0.7 }, cast: [
        C("servo", -90, "raise", { dy: 0.56, facing: 1, id: "gideao" }),
        C("anjo", 180, "stand", { dy: 0.4, facing: -1, glow: 0.95 }),
      ] }),
      // v.18 — "daqui não te apartes, até que eu volte e traga o meu presente".
      b(18, { by: "servo", q: "Rogo-te que daqui não te apartes", cast: [
        C("servo", -90, "walk", { dy: 0.56, facing: -1, id: "gideao" }),
        C("anjo", 180, "stand", { dy: 0.4, facing: -1, glow: 0.95 }),
      ] }),
      // v.19 — o cabrito, os pães ázimos, o cesto e a panela do caldo, sob o carvalho.
      b(19, { q: "e trouxe-lho até debaixo do carvalho", env: { glory: 0.72 }, cast: [
        C("servo", -60, "kneel", { dy: 0.58, facing: 1, id: "gideao" }),
        C("anjo", 180, "stand", { dy: 0.4, facing: -1, glow: 0.95 }),
      ] }),
      // v.20 — "põe-nos sobre esta PENHA e derrama-lhe o caldo".
      b(20, { by: "anjo", q: "Porém o anjo de Deus lhe disse:", set: "penha", props: PENHA,
        env: { terrain: "field", glory: 0.8, night: 0.16, fire: 0.1, verdure: 0.28 }, cast: [
        C("anjo", 190, "point", { dy: 0.4, facing: -1, glow: 1 }),
        C("servo", -110, "kneel", { dy: 0.58, facing: 1, id: "gideao" }),
      ] }),
      // v.21 — o cajado toca a oferta: SOBE O FOGO DA PENHA e a consome; o anjo some.
      b(21, { q: "então subiu o fogo da penha, e consumiu a carne", props: PENHA,
        env: { terrain: "field", glory: 0.95, night: 0.2, fire: 0.7, verdure: 0.24 }, cast: [
        C("servo", -130, "bow", { dy: 0.6, facing: 1, id: "gideao" }),
      ] }),
      // v.22 — "vi o anjo do SENHOR face a face" — o temor de Gideão.
      b(22, { by: "servo", q: "Então viu Gideão que era o anjo do SENHOR e disse:",
        env: { glory: 0.8, fire: 0.3, night: 0.24 }, cast: [
        C("servo", -60, "kneel", { dy: 0.6, facing: 1, id: "gideao" }),
      ] }),
      // v.23 — o SENHOR fala DIRETO (o anjo já desapareceu): "Paz seja contigo".
      dv(23, "Porém o Senhor lhe disse:", { env: { glory: 0.9, night: 0.14, fire: 0.12 }, cast: [
        C("servo", 0, "kneel", { dy: 0.58, facing: 1, id: "gideao" }),
      ] }),
      // v.24 — o altar em Ofra: O SENHOR É PAZ.
      b(24, { q: "chamou-lhe: O SENHOR É PAZ", set: "paz", props: PAZ,
        env: { terrain: "field", glory: 0.82, night: 0.14, fire: 0.25, verdure: 0.4 }, cast: [
        C("servo", -150, "raise", { dy: 0.56, facing: -1, id: "gideao" }),
      ] }),
      // v.25 — de NOITE, o SENHOR ordena: derruba o altar de Baal, corta o bosque.
      dv(25, "o Senhor lhe disse:", { set: "baal", props: BAAL,
        env: { terrain: "field", glory: 0.55, night: 0.75, fire: 0, verdure: 0.24 }, cast: [
        C("servo", -160, "stand", { dy: 0.56, facing: -1, id: "gideao" }),
      ] }),
      // v.26 — edifica um altar ao SENHOR e oferece o boi com a lenha do bosque.
      dv(26, undefined, { env: { glory: 0.62, night: 0.72 }, cast: [
        C("servo", -160, "kneel", { dy: 0.58, facing: -1, id: "gideao" }),
      ] }),
      // v.27 — dez servos; e por temer a casa do pai, fê-lo DE NOITE.
      b(27, { q: "não o fez de dia, mas fê-lo de noite",
        env: { glory: 0.42, night: 0.82, verdure: 0.2 }, cast: [
        C("servo", -180, "walk", { dy: 0.58, facing: -1, id: "gideao" }),
        C("servo", -60, "walk", { dy: 0.56, facing: -1, id: "servo1" }),
        C("servo", 60, "walk", { dy: 0.54, facing: -1, id: "servo2" }),
        C("servo", 170, "kneel", { dy: 0.6, facing: -1, id: "servo3" }),
      ] }),
      // v.28 — de madrugada: o altar de Baal derrubado, o bosque cortado.
      b(28, { q: "eis que estava o altar de Baal derrubado", set: "ruina", props: RUINA,
        env: { terrain: "field", glory: 0.45, night: 0.4, fire: 0.35, verdure: 0.22 }, cast: [
        C("homem", -220, "point", { dy: 0.56, facing: -1, id: "homem-cidade1" }),
        C("homem", -110, "stand", { dy: 0.54, facing: -1, id: "homem-cidade2" }),
      ] }),
      // v.29 — "Quem fez esta coisa?" — e a resposta: Gideão, o filho de Joás.
      b(29, { by: "homem", q: "E uns aos outros disseram:",
        env: { glory: 0.4, night: 0.38, storm: 0.12 }, cast: [
        C("homem", -200, "raise", { dy: 0.56, facing: -1, id: "homem-cidade1" }),
        C("homem", -80, "point", { dy: 0.54, facing: 1, id: "homem-cidade2" }),
        C("homem", 40, "stand", { dy: 0.52, facing: 1, id: "homem-cidade3" }),
      ] }),
      // v.30 — a cidade exige a Joás: "Tira para fora a teu filho; para que morra".
      b(30, { by: "homem", q: "disseram a Joás:",
        env: { glory: 0.32, night: 0.44, storm: 0.2 }, cast: [
        C("homem", -200, "raise", { dy: 0.56, facing: -1, id: "homem-cidade1" }),
        C("homem", -90, "raise", { dy: 0.54, facing: -1, id: "homem-cidade2" }),
        C("homem", 90, "stand", { dy: 0.54, facing: 1, id: "joas" }),
        C("servo", 220, "bow", { dy: 0.58, facing: 1, id: "gideao" }),
      ] }),
      // v.31 — JOÁS responde: "Contendereis vós por Baal?… se é deus, por si contenda".
      b(31, { by: "homem", q: "Porém Joás disse a todos os que se puseram contra ele:",
        env: { glory: 0.5, night: 0.36, storm: 0.1 }, cast: [
        C("homem", 60, "raise", { dy: 0.54, facing: -1, id: "joas" }),
        C("homem", -180, "stand", { dy: 0.56, facing: 1, id: "homem-cidade1" }),
        C("homem", -60, "bow", { dy: 0.54, facing: 1, id: "homem-cidade2" }),
        C("servo", 220, "stand", { dy: 0.58, facing: -1, id: "gideao" }),
      ] }),
      // v.32 — naquele dia lhe chamaram JERUBAAL: "Baal contenda contra ele".
      b(32, { q: "lhe chamaram Jerubaal", env: { glory: 0.62, night: 0.28, fire: 0.2 }, cast: [
        C("servo", 0, "stand", { dy: 0.54, facing: 1, id: "gideao" }),
        C("homem", 180, "stand", { dy: 0.54, facing: -1, id: "joas" }),
      ] }),
      // v.33 — Midiã, Amaleque e os do oriente acampam no VALE DE JIZREEL.
      b(33, { q: "acamparam no vale de Jizreel", set: "jizreel", props: JIZREEL,
        env: { terrain: "field", glory: 0.25, night: 0.5, storm: 0.16, verdure: 0.24 }, cast: [
        C("rei", 60, "stand", { dy: 0.44, facing: -1, id: "principe-midia" }),
        C("homem", 200, "stand", { dy: 0.48, facing: -1, id: "midianita1" }),
        C("homem", -160, "walk", { dy: 0.5, facing: -1, id: "midianita2" }),
      ] }),
      // v.34 — o ESPÍRITO do SENHOR reveste Gideão; ele toca a buzina.
      b(34, { q: "o Espírito do SENHOR revestiu a Gideão", set: "buzina", props: BUZINA,
        env: { terrain: "field", glory: 0.85, night: 0.16, storm: 0, verdure: 0.38 }, cast: [
        C("servo", -60, "raise", { dy: 0.52, facing: 1, id: "gideao", glow: 0.5 }),
        C("multidao", 140, "stand", { dy: 0.5 }),
      ] }),
      // v.35 — mensageiros a Manassés, Aser, Zebulom e Naftali; e todos vêm.
      b(35, { q: "enviou mensageiros a Aser, e a Zebulom, e a Naftali",
        env: { glory: 0.78, night: 0.16, verdure: 0.42 }, cast: [
        C("servo", -180, "point", { dy: 0.52, facing: -1, id: "gideao" }),
        C("servo", -60, "walk", { dy: 0.5, facing: -1, id: "mensageiro1" }),
        C("multidao", 130, "stand", { dy: 0.5 }),
      ] }),
      // v.36 — Gideão a Deus: "Se hás de livrar a Israel por minha mão…".
      b(36, { by: "servo", q: "E disse Gideão a Deus:", set: "eira", props: EIRA,
        env: { terrain: "field", glory: 0.6, night: 0.55, verdure: 0.3 }, cast: [
        C("servo", -80, "kneel", { dy: 0.56, facing: 1, id: "gideao" }),
      ] }),
      // v.37 — O VELO na eira: orvalho só no velo, e a terra seca — o 1º sinal.
      b(37, { by: "servo", q: "Eis que eu porei um velo de lã na eira",
        env: { glory: 0.66, night: 0.6 }, cast: [
        C("servo", -80, "point", { dy: 0.56, facing: 1, id: "gideao" }),
      ] }),
      // v.38 — de madrugada espremeu o velo: encheu uma TAÇA de água.
      b(38, { q: "do orvalho que espremeu do velo, encheu uma taça de água",
        env: { glory: 0.8, night: 0.32, verdure: 0.34 }, cast: [
        C("servo", -60, "raise", { dy: 0.56, facing: 1, id: "gideao" }),
      ] }),
      // v.39 — "só esta vez": que só o velo fique seco e haja orvalho na terra.
      b(39, { by: "servo", q: "E disse Gideão a Deus:",
        env: { glory: 0.6, night: 0.62 }, cast: [
        C("servo", -60, "kneel", { dy: 0.58, facing: 1, id: "gideao" }),
      ] }),
      // v.40 — e Deus assim fez naquela noite: só o velo seco, orvalho em toda a terra.
      b(40, { q: "só o velo ficou seco, e sobre toda a terra havia orvalho",
        env: { glory: 0.88, night: 0.4, verdure: 0.5 }, cast: [
        C("servo", -40, "bow", { dy: 0.58, facing: 1, id: "gideao" }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Jz 7
  7: {
    start: { terrain: "field", night: 0.24, glory: 0.55, storm: 0, fire: 0, verdure: 0.34 },
    beats: [
      // v.1 — Jerubaal (que é Gideão) acampa junto à FONTE DE HARODE.
      b(1, { q: "se acamparam junto à fonte de Harode", set: "harode", props: HARODE,
        env: { terrain: "field", glory: 0.55, night: 0.28, verdure: 0.36 }, cast: [
        C("servo", -140, "stand", { dy: 0.52, facing: 1, id: "gideao" }),
        C("multidao", 90, "stand", { dy: 0.5 }),
      ] }),
      // v.2 — "Muito é o povo": para que Israel não se glorie contra mim.
      dv(2, "E disse o Senhor a Gideão:", { env: { glory: 0.75, night: 0.22 }, cast: [
        C("servo", -60, "kneel", { dy: 0.54, facing: 1, id: "gideao" }),
        C("multidao", 150, "stand", { dy: 0.5 }),
      ] }),
      // v.3 — quem for medroso, volte: voltaram vinte e dois mil; ficaram dez mil.
      dv(3, "apregoa aos ouvidos do povo, dizendo:", { env: { glory: 0.66, night: 0.26 }, cast: [
        C("servo", -150, "raise", { dy: 0.54, facing: -1, id: "gideao" }),
        C("homem", 40, "walk", { dy: 0.54, facing: 1, id: "medroso1" }),
        C("homem", 150, "walk", { dy: 0.5, facing: 1, id: "medroso2" }),
        C("homem", 270, "walk", { dy: 0.46, facing: 1, id: "medroso3" }),
      ] }),
      // v.4 — "faze-os descer às ÁGUAS, e ali os provarei".
      dv(4, "E disse o Senhor a Gideão:", { env: { glory: 0.72, night: 0.2 }, cast: [
        C("servo", -220, "point", { dy: 0.52, facing: -1, id: "gideao" }),
        C("homem", -60, "walk", { dy: 0.58, facing: -1, id: "provado1" }),
        C("homem", 80, "walk", { dy: 0.56, facing: -1, id: "provado2" }),
        C("homem", 220, "walk", { dy: 0.54, facing: -1, id: "provado3" }),
      ] }),
      // v.5 — a prova: quem LAMBER as águas como as lambe o cão, esse porás à parte.
      dv(5, "Então o Senhor disse a Gideão:", { env: { glory: 0.78, night: 0.18 }, cast: [
        C("servo", -220, "stand", { dy: 0.5, facing: -1, id: "gideao" }),
        C("homem", -60, "kneel", { dy: 0.66, facing: 1, id: "lambedor1" }),
        C("homem", 70, "kneel", { dy: 0.68, facing: 1, id: "lambedor2" }),
        C("homem", 200, "bow", { dy: 0.64, facing: 1, id: "ajoelhado1" }),
      ] }),
      // v.6 — TREZENTOS lamberam levando a mão à boca; o resto ajoelhou-se.
      b(6, { q: "os que lamberam, levando a mão à boca, trezentos homens",
        env: { glory: 0.8, night: 0.16 }, cast: [
        C("homem", -190, "kneel", { dy: 0.68, facing: 1, id: "lambedor1" }),
        C("homem", -70, "kneel", { dy: 0.66, facing: 1, id: "lambedor2" }),
        C("homem", 60, "kneel", { dy: 0.7, facing: 1, id: "lambedor3" }),
        C("homem", 200, "bow", { dy: 0.62, facing: 1, id: "ajoelhado1" }),
        C("homem", 300, "bow", { dy: 0.6, facing: 1, id: "ajoelhado2" }),
      ] }),
      // v.7 — "Com estes trezentos vos livrarei"; os demais que se retirem.
      dv(7, "E disse o Senhor a Gideão:", { env: { glory: 0.88, night: 0.14 }, cast: [
        C("servo", -60, "raise", { dy: 0.52, facing: 1, id: "gideao" }),
        C("homem", 110, "stand", { dy: 0.56, facing: -1, id: "lambedor1" }),
        C("homem", 220, "stand", { dy: 0.54, facing: -1, id: "lambedor2" }),
      ] }),
      // v.8 — a provisão e as buzinas na mão; reteve os trezentos. Midiã no vale.
      b(8, { q: "porém os trezentos homens reteve", set: "trezentos", props: TREZENTOS,
        env: { terrain: "field", glory: 0.62, night: 0.34, verdure: 0.3 }, cast: [
        C("servo", -180, "stand", { dy: 0.52, facing: -1, id: "gideao" }),
        C("homem", -40, "stand", { dy: 0.56, facing: 1, id: "trezentos1" }),
        C("homem", 90, "stand", { dy: 0.54, facing: 1, id: "trezentos2" }),
        C("homem", 210, "walk", { dy: 0.5, facing: 1, id: "dispensado" }),
      ] }),
      // v.9 — naquela mesma noite: "Levanta-te, desce ao arraial; tenho-o dado".
      dv(9, "o Senhor lhe disse:", { env: { glory: 0.72, night: 0.72, verdure: 0.26 }, cast: [
        C("servo", -60, "kneel", { dy: 0.56, facing: 1, id: "gideao" }),
      ] }),
      // v.10 — "se ainda temes descer, desce tu e teu moço PURÁ".
      dv(10, undefined, { env: { glory: 0.68, night: 0.75 }, cast: [
        C("servo", -80, "stand", { dy: 0.56, facing: 1, id: "gideao" }),
        C("servo", 60, "stand", { dy: 0.54, facing: -1, id: "pura" }),
      ] }),
      // v.11 — descem os dois até ao extremo das sentinelas do arraial.
      b(11, { q: "até ao extremo das sentinelas que estavam no arraial",
        set: "midia", props: MIDIA,
        env: { terrain: "field", glory: 0.35, night: 0.85, verdure: 0.22 }, cast: [
        C("servo", -220, "walk", { dy: 0.6, facing: -1, id: "gideao" }),
        C("servo", -320, "walk", { dy: 0.58, facing: -1, id: "pura" }),
        C("homem", 240, "stand", { dy: 0.46, facing: 1, id: "sentinela" }),
      ] }),
      // v.12 — Midiã, Amaleque e os do oriente no vale como gafanhotos; camelos sem conta.
      b(12, { q: "jaziam no vale como gafanhotos em multidão",
        env: { glory: 0.28, night: 0.82, storm: 0.12 }, cast: [
        C("homem", -60, "lie", { dy: 0.62, id: "midianita1" }),
        C("homem", 100, "lie", { dy: 0.58, id: "midianita2" }),
        C("homem", 240, "lie", { dy: 0.54, id: "midianita3" }),
      ] }),
      // v.13 — O SONHO: o pão de cevada torrado que rola e transtorna a tenda.
      b(13, { by: "homem", q: "e dizia:", set: "sonho", props: SONHO,
        env: { terrain: "field", glory: 0.4, night: 0.78, fire: 0.2, verdure: 0.2 }, cast: [
        C("homem", -80, "point", { dy: 0.56, facing: 1, id: "midianita-sonho" }),
        C("homem", 80, "stand", { dy: 0.54, facing: -1, id: "companheiro" }),
        C("servo", -300, "kneel", { dy: 0.62, facing: -1, id: "gideao" }),
      ] }),
      // v.14 — o companheiro interpreta: "senão a espada de Gideão, filho de Joás".
      b(14, { by: "homem", q: "E respondeu o seu companheiro, e disse:",
        env: { glory: 0.5, night: 0.74 }, cast: [
        C("homem", 80, "raise", { dy: 0.54, facing: -1, id: "companheiro" }),
        C("homem", -60, "bow", { dy: 0.56, facing: 1, id: "midianita-sonho" }),
        C("servo", -300, "kneel", { dy: 0.62, facing: -1, id: "gideao" }),
      ] }),
      // v.15 — Gideão ADORA e volta: "o Senhor tem dado o arraial nas nossas mãos".
      b(15, { by: "servo", q: "e voltou ao arraial de Israel, e disse:",
        set: "trezentos", props: TREZENTOS,
        env: { terrain: "field", glory: 0.8, night: 0.6, verdure: 0.26 }, cast: [
        C("servo", -120, "raise", { dy: 0.54, facing: -1, id: "gideao" }),
        C("homem", 40, "stand", { dy: 0.56, facing: 1, id: "trezentos1" }),
        C("homem", 160, "stand", { dy: 0.54, facing: 1, id: "trezentos2" }),
      ] }),
      // v.16 — três companhias: buzinas, CÂNTAROS vazios e TOCHAS acesas dentro.
      b(16, { q: "buzinas, e cântaros vazios, com tochas neles acesas",
        set: "vigilia", props: VIGILIA,
        env: { terrain: "field", glory: 0.6, night: 0.8, fire: 0.5, verdure: 0.2 }, cast: [
        C("servo", -280, "point", { dy: 0.54, facing: -1, id: "gideao" }),
        C("homem", -110, "stand", { dy: 0.58, facing: 1, id: "companhia1" }),
        C("homem", 60, "stand", { dy: 0.56, facing: 1, id: "companhia2" }),
        C("homem", 230, "stand", { dy: 0.54, facing: 1, id: "companhia3" }),
      ] }),
      // v.17 — "Olhai para mim, e fazei como eu fizer."
      b(17, { by: "servo", q: "E disse-lhes:", env: { glory: 0.65, night: 0.8, fire: 0.5 }, cast: [
        C("servo", -280, "raise", { dy: 0.54, facing: -1, id: "gideao" }),
        C("homem", -110, "stand", { dy: 0.58, facing: 1, id: "companhia1" }),
        C("homem", 60, "stand", { dy: 0.56, facing: 1, id: "companhia2" }),
      ] }),
      // v.18 — o santo-e-senha: "Espada do Senhor, e de Gideão".
      b(18, { by: "servo", q: "e direis:", env: { glory: 0.75, night: 0.8, fire: 0.55 }, cast: [
        C("servo", -280, "raise", { dy: 0.54, facing: -1, id: "gideao" }),
        C("homem", -110, "raise", { dy: 0.58, facing: 1, id: "companhia1" }),
        C("homem", 60, "raise", { dy: 0.56, facing: 1, id: "companhia2" }),
        C("homem", 230, "raise", { dy: 0.54, facing: 1, id: "companhia3" }),
      ] }),
      // v.19 — a VIGÍLIA DA MEIA-NOITE: tocam as buzinas e quebram os cântaros.
      b(19, { q: "ao princípio da vigília da meia-noite", props: VIGILIA,
        env: { terrain: "field", glory: 0.7, night: 0.88, fire: 0.75, storm: 0.15, verdure: 0.18 }, cast: [
        C("servo", -240, "raise", { dy: 0.56, facing: -1, id: "gideao" }),
        C("homem", -80, "raise", { dy: 0.6, facing: 1, id: "companhia1" }),
        C("homem", 110, "raise", { dy: 0.58, facing: 1, id: "companhia2" }),
      ] }),
      // v.20 — as TOCHAS na esquerda, as buzinas na direita: "Espada do Senhor, e de Gideão".
      b(20, { by: "servo", q: "e clamaram:",
        env: { glory: 0.95, night: 0.85, fire: 0.95, storm: 0.2 }, cast: [
        C("servo", -220, "raise", { dy: 0.56, facing: -1, id: "gideao" }),
        C("homem", -60, "raise", { dy: 0.6, facing: 1, id: "companhia1" }),
        C("homem", 90, "raise", { dy: 0.58, facing: 1, id: "companhia2" }),
        C("homem", 240, "raise", { dy: 0.56, facing: 1, id: "companhia3" }),
      ] }),
      // v.21 — cada um no seu lugar; todo o exército correu, gritou e fugiu.
      b(21, { q: "todo o exército pôs-se a correr e, gritando, fugiu",
        set: "debandada", props: DEBANDADA,
        env: { terrain: "field", glory: 0.6, night: 0.82, fire: 0.7, storm: 0.35, verdure: 0.16 }, cast: [
        C("homem", 40, "walk", { dy: 0.6, facing: 1, id: "midianita1" }),
        C("homem", 160, "walk", { dy: 0.56, facing: 1, id: "midianita2" }),
        C("homem", -120, "lie", { dy: 0.64, id: "midianita3" }),
      ] }),
      // v.22 — o SENHOR volta a espada de um contra o outro; a fuga até Abel-Meolá.
      b(22, { q: "o Senhor tornou a espada de um contra o outro",
        env: { glory: 0.72, night: 0.78, fire: 0.5, storm: 0.4 }, cast: [
        C("homem", -140, "lie", { dy: 0.64, id: "midianita3" }),
        C("homem", 10, "bow", { dy: 0.6, facing: 1, id: "midianita4" }),
        C("homem", 190, "walk", { dy: 0.56, facing: 1, id: "midianita2" }),
      ] }),
      // v.23 — Naftali, Aser e todo o Manassés convocados: perseguem a Midiã.
      b(23, { q: "foram convocados, e perseguiram aos midianitas",
        env: { terrain: "field", glory: 0.68, night: 0.5, fire: 0.2, storm: 0.2, verdure: 0.26 }, cast: [
        C("servo", -200, "walk", { dy: 0.54, facing: -1, id: "gideao" }),
        C("homem", -60, "walk", { dy: 0.56, facing: -1, id: "naftali" }),
        C("homem", 70, "walk", { dy: 0.54, facing: -1, id: "aser" }),
        C("homem", 200, "walk", { dy: 0.52, facing: -1, id: "manasses" }),
      ] }),
      // v.24 — Efraim toma as águas até Bete-Bara e o Jordão.
      b(24, { by: "servo", q: "enviou mensageiros a todas as montanhas de Efraim, dizendo:",
        set: "jordao", props: JORDAO,
        env: { terrain: "field", glory: 0.7, night: 0.32, fire: 0, storm: 0.1, verdure: 0.34 }, cast: [
        C("servo", -200, "point", { dy: 0.54, facing: -1, id: "gideao" }),
        C("homem", -40, "walk", { dy: 0.56, facing: -1, id: "efraim1" }),
        C("homem", 90, "walk", { dy: 0.54, facing: -1, id: "efraim2" }),
      ] }),
      // v.25 — Orebe na penha e Zeebe no lagar; as cabeças trazidas a Gideão.
      b(25, { q: "prenderam a dois príncipes dos midianitas, a Orebe e a Zeebe",
        props: JORDAO,
        env: { terrain: "field", glory: 0.62, night: 0.42, storm: 0.18, verdure: 0.3 }, cast: [
        C("rei", 170, "lie", { dy: 0.62, id: "orebe" }),
        C("rei", 40, "bow", { dy: 0.6, facing: 1, id: "zeebe" }),
        C("servo", -190, "stand", { dy: 0.54, facing: -1, id: "gideao" }),
        C("homem", -60, "stand", { dy: 0.56, facing: -1, id: "efraim1" }),
      ] }),
    ],
  },
};
