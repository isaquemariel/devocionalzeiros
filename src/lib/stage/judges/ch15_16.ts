// ============================================================================
// JUÍZES 15–16 — CENA VIVA. SANSÃO: as RAPOSAS, a QUEIXADA, DALILA e DAGOM.
//
// Jz 15 — A vingança acesa: negada a mulher de Timna, Sansão pega TREZENTAS
// RAPOSAS, ata-as cauda a cauda com TOCHAS no meio e as solta nas searas dos
// filisteus — os molhos, as vinhas e os olivais ardem na sega do trigo. Os
// filisteus queimam a mulher e o pai dela; Sansão os fere com grande ferimento
// e desce à FENDA DA ROCHA DE ETÃ. Três mil homens de Judá o amarram com DUAS
// CORDAS NOVAS e o entregam em LEÍ — e ali o ESPÍRITO DO SENHOR poderosamente
// se apossa dele: as cordas viram fios de linho queimados. Com uma QUEIXADA
// FRESCA DE JUMENTO fere MIL HOMENS ("montões sobre montões") e chama o lugar
// RAMATE-LEÍ. Depois vem a SEDE — e Deus fende a cavidade e abre a fonte
// EN-HACORÉ, "a fonte do que clama". Julgou Israel vinte anos.
//
// Jz 16 — GAZA: cercado à noite, à meia-noite Sansão ARRANCA AS PORTAS da
// cidade com as umbreiras e a tranca e as leva ao cume do monte defronte de
// Hebrom. Depois, o vale de Soreque e DALILA: quatro interrogatórios — as sete
// vergas de vimes frescos, as cordas novas, as sete tranças tecidas no tear e,
// enfim, o segredo do nazireado. Rapados os SETE CABELOS, "ele não sabia que
// já o Senhor se tinha retirado dele" (16:20) — o versículo mais triste do
// livro. Furam-lhe os OLHOS e ele gira a MÓ no cárcere de Gaza. Mas o CABELO
// TORNA A CRESCER. Na festa a DAGOM, entre as duas colunas do meio, ele clama
// ao SENHOR e a CASA CAI sobre os príncipes: "Morra eu com os filisteus".
//
// A VOZ DE DEUS (regra do projeto): nestes dois capítulos o SENHOR não fala —
// Ele AGE (o Espírito que assalta, a fonte que se abre, a força que volta).
// Por isso não há voz do céu aqui: a presença é ENCENADA na glória do ambiente
// (glory alto quando o Espírito age; glory quase zero quando Ele se retira).
// SANSÃO fala como `by: "homem"` (id "sansao", sempre o PRIMEIRO homem do cast
// daquele beat); DALILA como `by: "mulherComum"` (id "dalila", a PRIMEIRA);
// os príncipes filisteus como `by: "rei"`; os homens de Judá como `by: "servo"`.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------- Jz 15 sets

// TIMNA — a casa do sogro timnita na sega do trigo: a porta fechada, o cabrito.
const TIMNA: StagePropSpec[] = [
  P("door", 0, 1.15, undefined, 0.36),
  P("church", -190, 1.05, undefined, 0.32),
  P("sheaf", 220, 1.0, undefined, 0.6),
  P("crate", 300, 0.9, undefined, 0.48),
  P("palm", -330, 1.0, undefined, 0.14),
  P("grass", 120, 0.78, undefined, 0.72),
];
// AS RAPOSAS — as tochas atadas cauda a cauda, à beira da seara madura.
const RAPOSAS: StagePropSpec[] = [
  P("campfire", -70, 1.0, undefined, 0.64),
  P("campfire", 80, 0.95, undefined, 0.56),
  P("sheaf", 215, 1.0, undefined, 0.58),
  P("sheaf", -230, 0.95, undefined, 0.5),
  P("bush", 320, 0.9, undefined, 0.42),
  P("grass", 150, 0.78, undefined, 0.74),
];
// AS SEARAS EM CHAMAS — os molhos, as vinhas e os olivais dos filisteus ardendo.
const SEARAS: StagePropSpec[] = [
  P("campfire", -170, 1.35, undefined, 0.48),
  P("campfire", 30, 1.3, undefined, 0.64),
  P("campfire", 235, 1.2, undefined, 0.42),
  P("sheaf", -60, 1.05, undefined, 0.68),
  P("sheaf", 130, 1.0, undefined, 0.56),
  P("grapes", -290, 1.0, undefined, 0.32),
  P("tree", 320, 1.05, undefined, 0.24),
];
// TIMNA QUEIMADA — a fogueira dos filisteus sobre a casa: a mulher e o pai.
const TIMNA_FOGO: StagePropSpec[] = [
  P("campfire", 0, 1.35, undefined, 0.5),
  P("church", -195, 1.05, undefined, 0.32),
  P("door", 155, 1.0, undefined, 0.4),
  P("rock", 285, 1.0, undefined, 0.6),
  P("grass", -100, 0.76, undefined, 0.74),
];
// A FENDA DA ROCHA DE ETÃ — o esconderijo de pedra onde Sansão desce e habita.
const ETA: StagePropSpec[] = [
  P("rock", 0, 1.6, undefined, 0.34),
  P("rock", -235, 1.15, undefined, 0.52),
  P("rock", 250, 1.1, undefined, 0.46),
  P("bush", 130, 0.85, undefined, 0.64),
  P("grass", -120, 0.78, undefined, 0.74),
];
// LEÍ — o acampamento filisteu estendido sobre Judá, o outeiro no meio.
const LEI: StagePropSpec[] = [
  P("tent", -245, 1.1, undefined, 0.22),
  P("tent", 230, 1.05, undefined, 0.26),
  P("rock", 60, 1.2, undefined, 0.4),
  P("bush", -120, 0.85, undefined, 0.62),
  P("grass", 150, 0.76, undefined, 0.72),
];
// RAMATE-LEÍ — o campo depois da queixada: montões sobre montões.
const RAMATE: StagePropSpec[] = [
  P("rock", -70, 1.3, undefined, 0.44),
  P("rock", 195, 1.15, undefined, 0.62),
  P("rock", 320, 1.0, undefined, 0.36),
  P("bush", -265, 0.85, undefined, 0.54),
  P("grass", 90, 0.76, undefined, 0.74),
];
// EN-HACORÉ — a fonte do que clama, aberta por Deus na cavidade da queixada.
const ENHACORE: StagePropSpec[] = [
  { ...P("well", -40, 1.15, undefined, 0.56), tag: "fonte-en-hacore" },
  P("rock", 195, 1.2, undefined, 0.42),
  P("bush", 90, 0.85, undefined, 0.66),
  P("grass", -180, 0.8, undefined, 0.72),
  P("palm", 300, 1.05, undefined, 0.14),
];

// ---------------------------------------------------------------- Jz 16 sets

// GAZA — a cidade filisteia de noite: a muralha, a torre e a PORTA vigiada.
const GAZA: StagePropSpec[] = [
  { ...P("door", 20, 1.2, undefined, 0.44), tag: "portas-de-gaza" },
  P("tower", 205, 1.35, undefined, 0.28),
  P("church", -175, 1.05, undefined, 0.34),
  P("rock", 320, 1.0, undefined, 0.5),
  P("grass", -60, 0.76, undefined, 0.74),
];
// O CUME DEFRONTE DE HEBROM — as portas de Gaza postas no alto do monte.
const MONTE_HEBROM: StagePropSpec[] = [
  { ...P("door", 0, 1.3, undefined, 0.42), tag: "portas-de-gaza" },
  P("rock", -235, 1.2, undefined, 0.32),
  P("rock", 250, 1.15, undefined, 0.46),
  P("tree", 330, 1.0, undefined, 0.2),
  P("grass", 120, 0.76, undefined, 0.72),
];
// O VALE DE SOREQUE — as vinhas do vale e a casa de Dalila.
const SOREQUE: StagePropSpec[] = [
  P("church", 215, 1.05, undefined, 0.32),
  P("door", 85, 1.05, undefined, 0.46),
  P("grapes", -235, 1.05, undefined, 0.3),
  P("grapes", -70, 0.95, undefined, 0.52),
  P("palm", 330, 1.0, undefined, 0.14),
  P("grass", 150, 0.76, undefined, 0.72),
];
// A CÂMARA INTERIOR — o tear, os fardos das amarras e o espia atrás da porta.
const CAMARA: StagePropSpec[] = [
  P("tent", -50, 1.2, undefined, 0.38),
  P("crate", 170, 0.95, undefined, 0.58),
  P("amphora", -215, 0.9, undefined, 0.5),
  P("door", 265, 1.0, undefined, 0.4),
  P("lampstand", 60, 0.9, undefined, 0.62),
];
// O CÁRCERE DE GAZA — a torre, a MÓ que ele gira cego, o entulho e a porta.
const CARCERE: StagePropSpec[] = [
  P("tower", 0, 1.5, undefined, 0.26),
  { ...P("rock", -190, 1.25, undefined, 0.58), tag: "mo-do-carcere" },
  P("rock", 225, 1.1, undefined, 0.5),
  P("door", 305, 1.0, undefined, 0.34),
  P("crate", 120, 0.85, undefined, 0.66),
];
// A CASA DE DAGOM — o grande sacrifício ao ídolo, o altar aceso, a festa.
const DAGOM: StagePropSpec[] = [
  { ...P("church", 0, 1.5, undefined, 0.3), tag: "casa-de-dagom" },
  P("tower", -235, 1.2, undefined, 0.26),
  P("tower", 245, 1.2, undefined, 0.26),
  P("altar", 125, 1.0, 0.85, 0.52),
  P("campfire", -125, 1.0, undefined, 0.58),
];
// A CASA CAÍDA — o entulho sobre os príncipes: pedra sobre pedra.
const RUINA: StagePropSpec[] = [
  P("rock", 0, 1.5, undefined, 0.58),
  P("rock", -195, 1.3, undefined, 0.48),
  P("rock", 210, 1.25, undefined, 0.64),
  P("rock", 320, 1.05, undefined, 0.38),
  P("tower", -305, 1.0, undefined, 0.28),
  P("church", 130, 0.9, undefined, 0.34),
];
// ENTRE ZORÁ E ESTAOL — o sepulcro de Manoá, seu pai, no alto sóbrio.
const SEPULCRO: StagePropSpec[] = [
  { ...P("rock", 0, 1.35, undefined, 0.44), tag: "sepulcro-de-manoa" },
  P("tree", -245, 1.1, undefined, 0.22),
  P("tree", 260, 1.05, undefined, 0.26),
  P("bush", -110, 0.85, undefined, 0.62),
  P("grass", 120, 0.78, undefined, 0.72),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ================================================================== Jz 15
  15: {
    start: { terrain: "field", night: 0.14, glory: 0.34, storm: 0, fire: 0, verdure: 0.5 },
    beats: [
      // v.1 — na sega do trigo, Sansão visita a mulher com um cabrito: a porta fechada.
      b(1, { by: "homem", q: "e disse:", set: "timna", props: TIMNA,
        env: { terrain: "field", night: 0.16, glory: 0.32, verdure: 0.52 }, cast: [
        C("homem", -110, "walk", { dy: 0.54, facing: 1, id: "sansao", scale: 1.25 }),
        C("homem", 90, "stand", { dy: 0.5, facing: -1, id: "timnita" }),
        C("mulherComum", 200, "stand", { dy: 0.44, facing: -1, id: "mulher-de-timna" }),
      ] }),
      // v.2 — o sogro: pensava que a desprezavas; toma a irmã mais nova.
      b(2, { by: "homem", q: "Toma-a, pois, em seu lugar", env: { glory: 0.28 }, cast: [
        C("homem", 90, "point", { dy: 0.5, facing: -1, id: "timnita" }),
        C("homem", -110, "stand", { dy: 0.54, facing: 1, id: "sansao", scale: 1.25 }),
        C("mulherComum", 230, "stand", { dy: 0.42, facing: -1, id: "irma-mais-nova" }),
      ] }),
      // v.3 — Sansão: inocente sou desta vez para com os filisteus.
      b(3, { by: "homem", q: "Inocente sou esta vez para com os filisteus",
        env: { night: 0.24, glory: 0.24, fire: 0.15 }, cast: [
        C("homem", -60, "raise", { dy: 0.58, facing: 1, id: "sansao", scale: 1.3 }),
        C("homem", 150, "bow", { dy: 0.46, facing: -1, id: "timnita" }),
      ] }),
      // v.4 — TREZENTAS RAPOSAS: cauda a cauda, uma tocha no meio de cada duas.
      b(4, { q: "pegou trezentas raposas", set: "raposas", props: RAPOSAS,
        env: { terrain: "field", night: 0.36, glory: 0.2, fire: 0.4, verdure: 0.55 }, cast: [
        C("homem", -160, "kneel", { dy: 0.64, facing: 1, id: "sansao", scale: 1.25 }),
      ] }),
      // v.5 — o fogo nas tochas: abrasa os molhos, as vinhas e os olivais.
      b(5, { q: "abrasou os molhos com a sega do trigo, e as vinhas e os olivais",
        set: "searas", props: SEARAS,
        env: { terrain: "field", night: 0.42, glory: 0.16, fire: 0.9, verdure: 0.3 }, cast: [
        C("homem", -280, "stand", { dy: 0.5, facing: 1, id: "sansao", scale: 1.3 }),
        C("homem", 160, "bow", { dy: 0.72, facing: -1, id: "filisteu" }),
        C("homem", 285, "walk", { dy: 0.62, facing: -1, id: "filisteu-2" }),
      ] }),
      // v.6 — "Quem fez isto?"; e os filisteus queimam a fogo a ela e a seu pai.
      // JUÍZO/luto: sem multidão festiva — figuras individuais no fogo.
      b(6, { by: "homem", q: "E responderam:", set: "timna-fogo", props: TIMNA_FOGO,
        env: { terrain: "field", night: 0.55, glory: 0.08, fire: 0.85, verdure: 0.2 }, cast: [
        C("homem", -140, "point", { dy: 0.56, facing: 1, id: "filisteu" }),
        C("homem", -40, "stand", { dy: 0.5, facing: 1, id: "filisteu-2" }),
        C("mulherComum", 190, "lie", { dy: 0.68, facing: -1, id: "mulher-de-timna" }),
        C("homem", 260, "lie", { dy: 0.62, facing: -1, id: "timnita" }),
      ] }),
      // v.7 — Sansão: havendo-me vingado de vós, então cessarei.
      b(7, { by: "homem", q: "havendo-me vingado eu de vós, então cessarei",
        env: { night: 0.5, glory: 0.14, fire: 0.6 }, cast: [
        C("homem", -80, "raise", { dy: 0.6, facing: 1, id: "sansao", scale: 1.35 }),
        C("homem", 160, "bow", { dy: 0.5, facing: -1, id: "filisteu" }),
        C("homem", 250, "lie", { dy: 0.58, facing: -1, id: "filisteu-2" }),
      ] }),
      // v.8 — grande ferimento; e desce a habitar na fenda da rocha de Etã.
      b(8, { q: "habitou na fenda da rocha de Etã", set: "eta", props: ETA,
        env: { terrain: "mountain", night: 0.42, glory: 0.16, fire: 0.1, verdure: 0.28 }, cast: [
        C("homem", -30, "stand", { dy: 0.5, facing: 1, id: "sansao", scale: 1.3 }),
        C("homem", 200, "lie", { dy: 0.66, facing: -1, id: "filisteu" }),
        C("homem", 290, "lie", { dy: 0.58, facing: -1, id: "filisteu-2" }),
      ] }),
      // v.9 — os filisteus sobem, acampam contra Judá e se estendem por Leí.
      b(9, { q: "estenderam-se por Leí", set: "lei", props: LEI,
        env: { terrain: "field", night: 0.3, glory: 0.12, fire: 0, verdure: 0.34 }, cast: [
        C("rei", 120, "stand", { dy: 0.5, facing: -1, id: "principe-filisteu" }),
        C("multidao", -80, "stand", { dy: 0.3 }),
      ] }),
      // v.10 — Judá pergunta; os filisteus: subimos para amarrar a Sansão.
      b(10, { by: "homem", q: "Subimos para amarrar a Sansão", env: { night: 0.32, glory: 0.12 }, cast: [
        C("homem", 130, "point", { dy: 0.52, facing: -1, id: "filisteu" }),
        C("servo", -140, "stand", { dy: 0.52, facing: 1, id: "juda" }),
        C("servo", -240, "stand", { dy: 0.46, facing: 1, id: "juda-2" }),
      ] }),
      // v.11 — três mil de Judá descem a Etã; Sansão: como me fizeram, lhes fiz.
      b(11, { by: "homem", q: "Assim como eles me fizeram a mim, eu lhes fiz a eles",
        set: "eta", props: ETA,
        env: { terrain: "mountain", night: 0.36, glory: 0.18, verdure: 0.28 }, cast: [
        C("homem", -60, "stand", { dy: 0.56, facing: 1, id: "sansao", scale: 1.3 }),
        C("servo", 120, "stand", { dy: 0.52, facing: -1, id: "juda" }),
        C("servo", 220, "bow", { dy: 0.46, facing: -1, id: "juda-2" }),
        C("multidao", 20, "stand", { dy: 0.24 }),
      ] }),
      // v.12 — "descemos para te amarrar"; Sansão: jurai-me que não me acometereis.
      b(12, { by: "homem", q: "Jurai-me que vós mesmos não me acometereis",
        env: { night: 0.38, glory: 0.18 }, cast: [
        C("homem", -60, "point", { dy: 0.56, facing: 1, id: "sansao", scale: 1.3 }),
        C("servo", 110, "raise", { dy: 0.52, facing: -1, id: "juda" }),
        C("servo", 210, "stand", { dy: 0.46, facing: -1, id: "juda-2" }),
      ] }),
      // v.13 — as DUAS CORDAS NOVAS: amarram-no e o fazem subir da rocha.
      b(13, { q: "amarraram-no com duas cordas novas", env: { night: 0.34, glory: 0.2 }, cast: [
        C("homem", 0, "stand", { dy: 0.6, facing: 1, id: "sansao", scale: 1.35 }),
        C("servo", -130, "kneel", { dy: 0.58, facing: 1, id: "juda" }),
        C("servo", 140, "kneel", { dy: 0.56, facing: -1, id: "juda-2" }),
        C("multidao", 30, "stand", { dy: 0.22 }),
      ] }),
      // v.14 — LEÍ: os filisteus jubilam; o ESPÍRITO DO SENHOR se apossa dele e
      // as cordas se tornam fios de linho queimados no fogo.
      b(14, { q: "o Espírito do Senhor poderosamente se apossou dele", set: "lei", props: LEI,
        env: { terrain: "field", night: 0.16, glory: 0.9, fire: 0.35, verdure: 0.36 }, cast: [
        C("homem", -20, "raise", { dy: 0.62, facing: 1, id: "sansao", scale: 1.6, glow: 0.85 }),
        C("rei", 200, "bow", { dy: 0.48, facing: -1, id: "principe-filisteu" }),
        C("homem", 120, "bow", { dy: 0.56, facing: -1, id: "filisteu" }),
        C("multidao", -180, "stand", { dy: 0.26 }),
      ] }),
      // v.15 — a QUEIXADA FRESCA de jumento: fere com ela MIL HOMENS.
      // Derrota/morte em 1º plano: individuais em `lie`, sem multidão festiva.
      b(15, { q: "feriu com ela mil homens", set: "ramate", props: RAMATE,
        env: { terrain: "field", night: 0.24, glory: 0.72, fire: 0.2, verdure: 0.26 }, cast: [
        C("homem", -40, "raise", { dy: 0.6, facing: 1, id: "sansao", scale: 1.7, glow: 0.7 }),
        C("homem", 140, "lie", { dy: 0.7, facing: -1, id: "filisteu" }),
        C("homem", 235, "lie", { dy: 0.6, facing: -1, id: "filisteu-2" }),
        C("homem", 305, "lie", { dy: 0.5, facing: -1, id: "filisteu-3" }),
        C("homem", -210, "lie", { dy: 0.66, facing: 1, id: "filisteu-4" }),
      ] }),
      // v.16 — o cântico da queixada: montões sobre montões.
      b(16, { by: "homem", q: "montões sobre montões", env: { glory: 0.66, night: 0.22 }, cast: [
        C("homem", -30, "raise", { dy: 0.6, facing: 1, id: "sansao", scale: 1.6, glow: 0.55 }),
        C("homem", 160, "lie", { dy: 0.7, facing: -1, id: "filisteu" }),
        C("homem", 260, "lie", { dy: 0.58, facing: -1, id: "filisteu-2" }),
      ] }),
      // v.17 — lança a queixada da mão e chama o lugar RAMATE-LEÍ.
      b(17, { q: "chamou aquele lugar Ramate-Leí", env: { glory: 0.58, night: 0.24 }, cast: [
        C("homem", -20, "point", { dy: 0.58, facing: 1, id: "sansao", scale: 1.4 }),
        C("homem", 190, "lie", { dy: 0.68, facing: -1, id: "filisteu" }),
      ] }),
      // v.18 — a GRANDE SEDE: clama ao SENHOR, de joelhos, o chão rachando.
      b(18, { by: "homem", q: "morrerei eu pois agora de sede",
        env: { terrain: "desert", night: 0.2, glory: 0.4, fire: 0.15, verdure: 0.08 }, cast: [
        C("homem", 0, "kneel", { dy: 0.62, facing: 1, id: "sansao", scale: 1.35 }),
      ] }),
      // v.19 — Deus fende a cavidade: sai ÁGUA. EN-HACORÉ, a fonte do que clama.
      b(19, { q: "A fonte do que clama", set: "en-hacore", props: ENHACORE,
        env: { terrain: "field", night: 0.12, glory: 0.86, fire: 0, verdure: 0.5, water: 0.2 }, cast: [
        C("homem", -140, "kneel", { dy: 0.62, facing: 1, id: "sansao", scale: 1.3, glow: 0.35 }),
      ] }),
      // v.20 — e julgou a Israel, nos dias dos filisteus, vinte anos.
      b(20, { q: "julgou a Israel, nos dias dos filisteus, vinte anos",
        env: { terrain: "field", night: 0.1, glory: 0.7, verdure: 0.62, water: 0.1 }, cast: [
        C("homem", -60, "stand", { dy: 0.56, facing: 1, id: "sansao", scale: 1.4, glow: 0.3 }),
        C("multidao", 130, "stand", { dy: 0.3 }),
      ] }),
    ],
  },

  // ================================================================== Jz 16
  16: {
    start: { terrain: "city", night: 0.5, glory: 0.2, storm: 0, fire: 0, verdure: 0.24 },
    beats: [
      // v.1 — GAZA: Sansão entra na cidade filisteia e vê ali uma prostituta.
      b(1, { q: "viu ali uma mulher prostituta", set: "gaza", props: GAZA,
        env: { terrain: "city", night: 0.52, glory: 0.14, verdure: 0.2 }, cast: [
        C("homem", -90, "walk", { dy: 0.56, facing: 1, id: "sansao", scale: 1.3 }),
        C("mulherComum", 90, "stand", { dy: 0.5, facing: -1, id: "prostituta-de-gaza" }),
      ] }),
      // v.2 — os gazitas cercam e põem espias à PORTA: até à luz da manhã.
      b(2, { by: "homem", q: "Até à luz da manhã esperaremos",
        env: { night: 0.78, glory: 0.06 }, cast: [
        C("homem", 130, "stand", { dy: 0.52, facing: -1, id: "gazita" }),
        C("homem", 230, "stand", { dy: 0.46, facing: -1, id: "gazita-2" }),
        C("homem", -220, "lie", { dy: 0.6, facing: 1, id: "sansao", scale: 1.25 }),
      ] }),
      // v.3 — À MEIA-NOITE arranca as PORTAS com as umbreiras e a tranca, põe-as
      // sobre os ombros e as leva até ao CUME DO MONTE defronte de Hebrom.
      b(3, { q: "arrancou as portas da entrada da cidade", set: "monte-hebrom", props: MONTE_HEBROM,
        env: { terrain: "mountain", night: 0.62, glory: 0.35, verdure: 0.18 }, cast: [
        C("homem", -40, "raise", { dy: 0.6, facing: 1, id: "sansao", scale: 2.0, glow: 0.3 }),
        C("homem", 200, "bow", { dy: 0.5, facing: -1, id: "gazita" }),
        C("homem", 300, "lie", { dy: 0.56, facing: -1, id: "gazita-2" }),
      ] }),
      // v.4 — o vale de Soreque: DALILA.
      b(4, { q: "cujo nome era Dalila", set: "soreque", props: SOREQUE,
        env: { terrain: "field", night: 0.28, glory: 0.2, verdure: 0.55 }, cast: [
        C("mulherComum", 60, "stand", { dy: 0.5, facing: -1, id: "dalila" }),
        C("homem", -110, "walk", { dy: 0.56, facing: 1, id: "sansao", scale: 1.3 }),
      ] }),
      // v.5 — os PRÍNCIPES filisteus sobem a ela: mil e cem moedas de prata cada um.
      // Inimigos: NUNCA glow.
      b(5, { by: "rei", q: "vê em que consiste a sua grande força",
        env: { night: 0.36, glory: 0.1, verdure: 0.5 }, cast: [
        C("rei", 150, "point", { dy: 0.5, facing: -1, id: "principe-filisteu" }),
        C("rei", 250, "stand", { dy: 0.44, facing: -1, id: "principe-filisteu-2" }),
        C("mulherComum", -60, "stand", { dy: 0.54, facing: 1, id: "dalila" }),
      ] }),
      // v.6 — PRIMEIRO interrogatório: declara-me em que consiste a tua grande força.
      b(6, { by: "mulherComum", q: "Declara-me, peço-te, em que consiste a tua grande força",
        set: "camara", props: CAMARA,
        env: { terrain: "city", night: 0.42, glory: 0.14, verdure: 0.14 }, cast: [
        C("mulherComum", 70, "point", { dy: 0.54, facing: -1, id: "dalila" }),
        C("homem", -100, "stand", { dy: 0.58, facing: 1, id: "sansao", scale: 1.3 }),
      ] }),
      // v.7 — Sansão mente: sete vergas de vimes frescos.
      b(7, { by: "homem", q: "Se me amarrassem com sete vergas de vimes frescos", cast: [
        C("homem", -100, "point", { dy: 0.58, facing: 1, id: "sansao", scale: 1.3 }),
        C("mulherComum", 70, "stand", { dy: 0.54, facing: -1, id: "dalila" }),
      ] }),
      // v.8 — os príncipes trazem as sete vergas e o amarram com elas.
      b(8, { q: "sete vergas de vimes frescos, que ainda não estavam secos",
        env: { night: 0.46, glory: 0.12 }, cast: [
        C("homem", -60, "lie", { dy: 0.62, facing: 1, id: "sansao", scale: 1.3 }),
        C("mulherComum", 80, "kneel", { dy: 0.56, facing: -1, id: "dalila" }),
        C("rei", 210, "stand", { dy: 0.46, facing: -1, id: "principe-filisteu" }),
      ] }),
      // v.9 — o espia na câmara interior: "Os filisteus vêm sobre ti"; ele quebra
      // as vergas como se quebra o fio da estopa ao cheiro do fogo.
      b(9, { by: "mulherComum", q: "Então ela lhe disse:",
        env: { night: 0.44, glory: 0.3, fire: 0.2 }, cast: [
        C("mulherComum", 90, "raise", { dy: 0.54, facing: -1, id: "dalila" }),
        C("homem", -70, "raise", { dy: 0.6, facing: 1, id: "sansao", scale: 1.45, glow: 0.35 }),
        C("homem", 260, "stand", { dy: 0.4, facing: -1, id: "espia" }),
      ] }),
      // v.10 — SEGUNDO interrogatório: zombaste de mim e me disseste mentiras.
      b(10, { by: "mulherComum", q: "Eis que zombaste de mim, e me disseste mentiras",
        env: { night: 0.44, glory: 0.14, fire: 0 }, cast: [
        C("mulherComum", 80, "point", { dy: 0.54, facing: -1, id: "dalila" }),
        C("homem", -100, "stand", { dy: 0.58, facing: 1, id: "sansao", scale: 1.3 }),
      ] }),
      // v.11 — Sansão mente outra vez: cordas novas, nunca usadas.
      b(11, { by: "homem", q: "Se me amarrassem fortemente com cordas novas", cast: [
        C("homem", -100, "point", { dy: 0.58, facing: 1, id: "sansao", scale: 1.3 }),
        C("mulherComum", 80, "stand", { dy: 0.54, facing: -1, id: "dalila" }),
      ] }),
      // v.12 — as CORDAS NOVAS; o espia na recâmara; ele as quebra como um fio.
      b(12, { by: "mulherComum", q: "e disse-lhe:",
        env: { night: 0.46, glory: 0.3 }, cast: [
        C("mulherComum", 90, "raise", { dy: 0.54, facing: -1, id: "dalila" }),
        C("homem", -70, "raise", { dy: 0.6, facing: 1, id: "sansao", scale: 1.45, glow: 0.35 }),
        C("homem", 265, "stand", { dy: 0.4, facing: -1, id: "espia" }),
      ] }),
      // v.13 — TERCEIRO: as SETE TRANÇAS tecidas com os liços da teia (o tear).
      b(13, { by: "homem", q: "Se teceres sete tranças dos cabelos da minha cabeça com os liços da teia",
        env: { night: 0.5, glory: 0.12 }, cast: [
        C("homem", -90, "stand", { dy: 0.58, facing: 1, id: "sansao", scale: 1.3 }),
        C("mulherComum", 90, "stand", { dy: 0.54, facing: -1, id: "dalila" }),
      ] }),
      // v.14 — ela as fixa com a estaca; ele desperta e arranca estaca e liço.
      b(14, { q: "arrancou a estaca das tranças tecidas",
        env: { night: 0.48, glory: 0.28 }, cast: [
        C("homem", -60, "raise", { dy: 0.6, facing: 1, id: "sansao", scale: 1.45, glow: 0.3 }),
        C("mulherComum", 110, "kneel", { dy: 0.56, facing: -1, id: "dalila" }),
      ] }),
      // v.15 — QUARTO: "Tenho-te amor, não estando comigo o teu coração?"
      b(15, { by: "mulherComum", q: "Tenho-te amor, não estando comigo o teu coração",
        env: { night: 0.52, glory: 0.1 }, cast: [
        C("mulherComum", 70, "point", { dy: 0.54, facing: -1, id: "dalila" }),
        C("homem", -100, "bow", { dy: 0.6, facing: 1, id: "sansao", scale: 1.3 }),
      ] }),
      // v.16 — importunando-o todos os dias: a alma dele se angustia até a morte.
      b(16, { q: "a sua alma se angustiou até a morte",
        env: { night: 0.6, glory: 0.06, verdure: 0.12 }, cast: [
        C("homem", -60, "kneel", { dy: 0.64, facing: 1, id: "sansao", scale: 1.3 }),
        C("mulherComum", 100, "point", { dy: 0.54, facing: -1, id: "dalila" }),
      ] }),
      // v.17 — descobre TODO o coração: o nazireado, a navalha que nunca passou.
      b(17, { by: "homem", q: "Nunca passou navalha pela minha cabeça",
        env: { night: 0.62, glory: 0.08 }, cast: [
        C("homem", -60, "kneel", { dy: 0.64, facing: 1, id: "sansao", scale: 1.3 }),
        C("mulherComum", 100, "kneel", { dy: 0.56, facing: -1, id: "dalila" }),
      ] }),
      // v.18 — Dalila manda chamar os príncipes: e eles sobem com o dinheiro.
      b(18, { by: "mulherComum", q: "dizendo:",
        env: { night: 0.64, glory: 0.05 }, cast: [
        C("mulherComum", -40, "point", { dy: 0.56, facing: 1, id: "dalila" }),
        C("rei", 160, "walk", { dy: 0.5, facing: -1, id: "principe-filisteu" }),
        C("rei", 260, "walk", { dy: 0.44, facing: -1, id: "principe-filisteu-2" }),
      ] }),
      // v.19 — dorme sobre os joelhos dela: rapadas as SETE TRANÇAS, a força se retira.
      b(19, { q: "rapou-lhe as sete tranças do cabelo de sua cabeça",
        env: { night: 0.72, glory: 0.03, verdure: 0.1 }, cast: [
        C("homem", -50, "lie", { dy: 0.68, facing: 1, id: "sansao", scale: 1.2 }),
        C("mulherComum", 60, "kneel", { dy: 0.58, facing: -1, id: "dalila" }),
        C("homem", 190, "stand", { dy: 0.5, facing: -1, id: "rapador" }),
      ] }),
      // v.20 — O VERSÍCULO MAIS TRISTE: ele se sacode como dantes — "porque ele
      // não sabia que já o Senhor se tinha retirado dele". Night sobe, glória cai.
      // SEM `by`: o fecho do versículo é do NARRADOR e não pode sair de boca
      // nenhuma — nem da de Sansão, que é justamente quem NÃO sabia.
      b(20, { q: "Sairei ainda esta vez como dantes",
        env: { terrain: "city", night: 0.86, glory: 0.01, fire: 0, verdure: 0.06 }, cast: [
        C("homem", -40, "stand", { dy: 0.62, facing: 1, id: "sansao", scale: 1.2 }),
        C("mulherComum", 90, "stand", { dy: 0.54, facing: -1, id: "dalila" }),
        C("rei", 220, "stand", { dy: 0.46, facing: -1, id: "principe-filisteu" }),
      ] }),
      // v.21 — furam-lhe os OLHOS, cadeias de bronze, e ele gira a MÓ no cárcere.
      // Sem multidão festiva, sem glow: só a noite e a pedra.
      b(21, { q: "arrancaram-lhe os olhos", set: "carcere", props: CARCERE,
        env: { terrain: "city", night: 0.9, glory: 0.01, verdure: 0.03 }, cast: [
        C("homem", -60, "kneel", { dy: 0.66, facing: 1, id: "sansao", scale: 1.25 }),
        C("homem", 160, "stand", { dy: 0.52, facing: -1, id: "carcereiro-gaza" }),
      ] }),
      // v.22 — e o CABELO da sua cabeça começou a crescer: a primeira réstia de luz.
      b(22, { q: "E o cabelo da sua cabeça começou a crescer",
        env: { night: 0.82, glory: 0.14 }, cast: [
        C("homem", -40, "kneel", { dy: 0.66, facing: 1, id: "sansao", scale: 1.25 }),
      ] }),
      // v.23 — a festa a DAGOM: grande sacrifício ao ídolo, o altar aceso.
      b(23, { by: "rei", q: "e diziam:", set: "dagom", props: DAGOM,
        env: { terrain: "city", night: 0.55, glory: 0.06, fire: 0.6, verdure: 0.08 }, cast: [
        C("rei", -70, "raise", { dy: 0.54, facing: 1, id: "principe-filisteu" }),
        C("rei", 60, "stand", { dy: 0.5, facing: -1, id: "principe-filisteu-2" }),
        C("multidao", 210, "stand", { dy: 0.28 }),
      ] }),
      // v.24 — o povo louva o seu deus: ao que destruía a nossa terra.
      b(24, { by: "homem", q: "Nosso deus nos entregou nas mãos o nosso inimigo",
        env: { night: 0.52, fire: 0.65 }, cast: [
        C("homem", -100, "raise", { dy: 0.56, facing: 1, id: "filisteu" }),
        C("rei", 40, "stand", { dy: 0.5, facing: -1, id: "principe-filisteu" }),
        C("multidao", 220, "stand", { dy: 0.28 }),
      ] }),
      // v.25 — "Chamai a Sansão, para que brinque diante de nós": entre as colunas.
      b(25, { by: "rei", q: "disseram:",
        env: { night: 0.5, fire: 0.7 }, cast: [
        C("rei", 150, "point", { dy: 0.5, facing: -1, id: "principe-filisteu" }),
        C("homem", -40, "stand", { dy: 0.64, facing: 1, id: "sansao", scale: 1.25 }),
        C("servo", -140, "walk", { dy: 0.6, facing: 1, id: "moco" }),
        C("multidao", 240, "stand", { dy: 0.26 }),
      ] }),
      // v.26 — cego, ao moço: guia-me para que apalpe as colunas da casa.
      b(26, { by: "homem", q: "Guia-me para que apalpe as colunas em que se sustém a casa",
        env: { night: 0.52, glory: 0.1, fire: 0.6 }, cast: [
        C("homem", -20, "point", { dy: 0.66, facing: 1, id: "sansao", scale: 1.3 }),
        C("servo", -130, "stand", { dy: 0.62, facing: 1, id: "moco" }),
        C("rei", 190, "stand", { dy: 0.48, facing: -1, id: "principe-filisteu" }),
      ] }),
      // v.27 — a casa cheia; e sobre o telhado uns TRÊS MIL vendo-o brincar.
      b(27, { q: "sobre o telhado havia uns três mil homens e mulheres",
        env: { night: 0.5, fire: 0.6 }, cast: [
        C("multidao", 0, "stand", { dy: 0.2 }),
        C("multidao", 230, "stand", { dy: 0.3 }),
        C("homem", -70, "stand", { dy: 0.68, facing: 1, id: "sansao", scale: 1.3 }),
        C("rei", 150, "stand", { dy: 0.5, facing: -1, id: "principe-filisteu" }),
      ] }),
      // v.28 — o CLAMOR: lembra-te de mim e fortalece-me agora só esta vez.
      b(28, { by: "homem", q: "peço-te que te lembres de mim, e fortalece-me agora só esta vez",
        env: { night: 0.4, glory: 0.75, fire: 0.5 }, cast: [
        C("homem", 0, "kneel", { dy: 0.66, facing: 1, id: "sansao", scale: 1.4, glow: 0.5 }),
        C("servo", -150, "stand", { dy: 0.6, facing: 1, id: "moco" }),
        C("multidao", 220, "stand", { dy: 0.26 }),
      ] }),
      // v.29 — abraça as DUAS COLUNAS do meio, a direita numa, a esquerda na outra.
      // As colunas do MEIO precisam estar no meio: o set DAGOM põe as suas duas
      // torres nas bordas (±235/245) e o ícone do capítulo ficava fora de cena.
      // Aqui o beat declara props PRÓPRIOS — duas colunas centrais e próximas
      // (±55), altas, com Sansão entre elas — mantendo a casa, o altar aceso e
      // as paredes do fundo para a casa de Dagom continuar reconhecível.
      b(29, { q: "Abraçou-se, pois, Sansão com as duas colunas do meio",
        props: [
          { ...P("church", 0, 1.5, undefined, 0.26), tag: "casa-de-dagom" },
          P("tower", -55, 1.6, undefined, 0.4),
          P("tower", 55, 1.6, undefined, 0.4),
          P("tower", -250, 1.15, undefined, 0.24),
          P("tower", 250, 1.15, undefined, 0.24),
          P("altar", 150, 1.0, 0.85, 0.52),
          P("campfire", -150, 1.0, undefined, 0.58),
        ],
        env: { night: 0.36, glory: 0.85, storm: 0.3, fire: 0.5 }, cast: [
        C("homem", 0, "raise", { dy: 0.62, facing: 1, id: "sansao", scale: 2.0, glow: 0.7 }),
        C("rei", 200, "stand", { dy: 0.48, facing: -1, id: "principe-filisteu" }),
        C("multidao", -230, "stand", { dy: 0.26 }),
      ] }),
      // v.30 — "MORRA EU COM OS FILISTEUS": a casa cai sobre os príncipes.
      // Morte em 1º plano: individuais em `lie`, sem multidão festiva.
      b(30, { by: "homem", q: "E disse Sansão:", set: "ruina", props: RUINA,
        env: { terrain: "city", night: 0.62, glory: 0.45, storm: 0.7, fire: 0.35, verdure: 0.05 }, cast: [
        C("homem", -30, "raise", { dy: 0.6, facing: 1, id: "sansao", scale: 1.9, glow: 0.5 }),
        C("rei", 150, "lie", { dy: 0.7, facing: -1, id: "principe-filisteu" }),
        C("rei", 250, "lie", { dy: 0.6, facing: -1, id: "principe-filisteu-2" }),
        C("homem", 310, "lie", { dy: 0.52, facing: -1, id: "filisteu" }),
        C("mulherComum", -200, "lie", { dy: 0.68, facing: 1, id: "filisteia" }),
      ] }),
      // v.31 — os irmãos o sepultam entre Zorá e Estaol, no sepulcro de Manoá.
      b(31, { q: "sepultaram-no entre Zorá e Estaol", set: "sepulcro", props: SEPULCRO,
        env: { terrain: "mountain", night: 0.45, glory: 0.35, storm: 0, fire: 0, verdure: 0.3 }, cast: [
        C("homem", -110, "bow", { dy: 0.6, facing: 1, id: "irmao-de-sansao" }),
        C("homem", 110, "kneel", { dy: 0.58, facing: -1, id: "irmao-de-sansao-2" }),
        C("mulherComum", 220, "kneel", { dy: 0.5, facing: -1, id: "parenta" }),
      ] }),
    ],
  },
};
