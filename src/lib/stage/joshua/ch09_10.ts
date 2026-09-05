// ============================================================================
// JOSUÉ 9–10 — CENA VIVA. O ENGANO DE GIBEOM; o SOL QUE SE DETÉM.
//
// Js 9 — A ASTÚCIA DE GIBEOM: enquanto os reis de Canaã se ajuntam para pelejar,
// os moradores de GIBEOM, ouvindo o que Josué fez a Jericó e a Ai, usam de
// ASTÚCIA: fingem-se embaixadores de terra distante, com SACOS VELHOS, ODRES DE
// VINHO rotos e remendados, SAPATOS gastos e PÃO SECO E BOLORENTO. Os homens de
// Israel tomam da provisão deles e NÃO PEDEM CONSELHO AO SENHOR; Josué faz um
// acordo e os príncipes juram. Descoberto o engano, o juramento os obriga: os
// gibeonitas viram RACHADORES DE LENHA e TIRADORES DE ÁGUA para a casa de Deus.
//
// Js 10 — O SOL SE DETÉM: cinco reis amorreus atacam Gibeom por ter feito paz.
// Josué MARCHA DE NOITE desde Gilgal e cai sobre eles de repente; o Senhor os
// conturba e lança do céu grandes PEDRAS DE SARAIVA. Então Josué clama: "SOL,
// DETÉM-TE EM GIBEOM" — e o sol para no meio do céu quase um dia inteiro. Os
// cinco reis fogem à COVA de Maquedá, são presos, pisados no pescoço e
// enforcados. Segue a CONQUISTA DO SUL: Maquedá, Libna, Laquis, Eglom, Hebrom,
// Debir — toda a terra ferida, porque o Senhor pelejava por Israel.
//
// A VOZ DE DEUS (regra do projeto): quando o Senhor fala DIRETO a Josué sem
// mediador visível ("Não os temas", 10:8), `by: "deus"` — voz do céu, glória
// alta, sem figura. Josué fala = `by: "servo"` (Josué é o PRIMEIRO servo do
// beat). Os gibeonitas = `homem` id "gibeom"; os reis inimigos = `rei`.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const jv = (v: number, q?: string, extra: Partial<StageBeat> = {}) =>
  b(v, { by: "servo", ...(q ? { q } : {}), ...extra });                          // Josué fala
const dv = (v: number) => b(v, { by: "deus" });                                    // voz do céu

// ARRAIAL DE GILGAL — a cena-base: as tendas do acampamento, o Jordão ao fundo.
const GILGAL: StagePropSpec[] = [
  P("tent", -230, 1.05, undefined, 0.2),
  P("tent", 215, 1.0, undefined, 0.24),
  P("river", 320, 1.2, undefined, 0.86),
  P("palm", -330, 1.05, undefined, 0.14),
  P("grass", 80, 0.78, undefined, 0.68),
];
// O ENGANO DE GIBEOM — os sacos velhos, os odres rotos, a provisão bolorenta.
const ENGANO: StagePropSpec[] = [
  P("crate", -60, 1.0, undefined, 0.6),        // os sacos velhos sobre os jumentos
  P("amphora", 60, 0.9, undefined, 0.62),      // os odres de vinho, rotos e remendados
  P("sheaf", 150, 0.85, undefined, 0.66),      // o pão seco e bolorento da provisão
  P("stall", 250, 1.0, undefined, 0.5),        // os jumentos dos "embaixadores"
  P("tent", -250, 1.0, undefined, 0.2),
  P("grass", -120, 0.78, undefined, 0.72),
];
// AS CIDADES DOS GIBEONITAS — Gibeom, Cefira, Beerote, Quiriate-Jearim.
const CIDADES: StagePropSpec[] = [
  P("tower", -135, 1.28, undefined, 0.24),
  P("tower", 150, 1.22, undefined, 0.28),
  P("church", 20, 1.0, undefined, 0.4),
  P("rock", 305, 1.1, undefined, 0.3),
];
// A SERVIDÃO — rachadores de lenha (a árvore) e tiradores de água (o poço),
// para a congregação e para o altar da casa de Deus.
const SERVIDAO: StagePropSpec[] = [
  { ...P("well", -60, 1.25, undefined, 0.5), tag: "tiradores-de-agua" },  // tiradores de água
  P("tree", 130, 1.2, undefined, 0.26),                                    // rachadores de lenha
  { ...P("altar", 250, 1.0, undefined, 0.5), tag: "casa-de-deus" },        // o altar do Senhor
  P("tent", -250, 1.0, undefined, 0.2),
  P("grass", 40, 0.78, undefined, 0.72),
];
// O MONTE DE GIBEOM SITIADO — os cinco reis amorreus cercam a cidade.
const GIBEOM_SITIO: StagePropSpec[] = [
  P("tower", -20, 1.3, undefined, 0.28),
  P("rock", -200, 1.2, undefined, 0.4),
  P("rock", 220, 1.15, undefined, 0.36),
  P("grass", 100, 0.76, undefined, 0.72),
];
// A MARCHA NOTURNA — o exército sobe de Gilgal na escuridão da noite.
const NOITE: StagePropSpec[] = [
  { ...P("starfield", -20, 2.2, undefined, 0.2), sky: true },
  P("rock", 290, 1.1, undefined, 0.34),
  P("palm", -320, 1.0, undefined, 0.14),
  P("grass", -60, 0.76, undefined, 0.78),
];
// A SARAIVA DO CÉU — as grandes pedras que o Senhor lança sobre os amorreus.
const SARAIVA: StagePropSpec[] = [
  { ...P("hail", -30, 1.8, undefined, 0.55), sky: true },   // grandes pedras de saraiva
  { ...P("hail", 120, 1.4, undefined, 0.4), sky: true },
  { ...P("clouds", -20, 1.6, undefined, 0.8), sky: true },
  P("rock", 300, 1.1, undefined, 0.32),
  P("grass", -100, 0.74, undefined, 0.72),
];
// O SOL DETIDO SOBRE GIBEOM — o astro parado no meio do céu, a lua sobre Ajalom.
const SOL_PARADO: StagePropSpec[] = [
  { ...P("sun", 40, 2.6, undefined, 0.3), tag: "sol-detem-te", sky: true },  // Sol, detém-te em Gibeom
  { ...P("moon", -260, 1.3, undefined, 0.24), sky: true },                    // a lua no vale de Ajalom
  P("tower", 190, 1.1, undefined, 0.34),
  P("rock", -180, 1.1, undefined, 0.4),
  P("grass", 90, 0.76, undefined, 0.72),
];
// A COVA DE MAQUEDÁ — a boca fechada com grandes pedras, os cinco reis dentro.
const COVA: StagePropSpec[] = [
  { ...P("rock", 0, 1.6, undefined, 0.44), tag: "cova-de-maqueda" },
  P("rock", 150, 1.25, undefined, 0.56),
  P("rock", -170, 1.2, undefined, 0.5),
  P("grass", 80, 0.76, undefined, 0.74),
];
// AS CIDADES DO SUL CONQUISTADAS — Libna, Laquis, Eglom, Hebrom, Debir.
const CONQUISTA: StagePropSpec[] = [
  P("tower", -125, 1.26, undefined, 0.26),
  P("tower", 145, 1.2, undefined, 0.3),
  P("rock", 305, 1.1, undefined, 0.3),
  P("grass", -40, 0.76, undefined, 0.76),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Js 9
  9: {
    start: { terrain: "field", night: 0.12, glory: 0.58, storm: 0, fire: 0, verdure: 0.36 },
    beats: [
      // v.1 — TODOS OS REIS de Canaã ouvem e se agitam contra Israel.
      b(1, { q: "ouvindo isto todos os reis", set: "cidades", props: CIDADES,
        env: { terrain: "city", glory: 0.42, night: 0.2, verdure: 0.2 }, cast: [
        C("rei", 140, "stand", { dy: 0.48, facing: -1, id: "reiA" }),
        C("rei", 220, "stand", { dy: 0.5, facing: -1, id: "reiB" }),
        C("rei", -60, "stand", { dy: 0.46, facing: 1, id: "reiC" }),
      ] }),
      // v.2 — ajuntam-se de comum acordo para PELEJAR contra Josué.
      b(2, { q: "para pelejar contra Josué e contra Israel", env: { glory: 0.36, night: 0.26, storm: 0.1 }, cast: [
        C("rei", 120, "raise", { dy: 0.48, facing: -1, id: "reiA" }),
        C("rei", 200, "stand", { dy: 0.5, facing: -1, id: "reiB" }),
        C("multidao", -120, "stand", { dy: 0.5 }),
      ] }),
      // v.3 — os MORADORES DE GIBEOM ouvem o que Josué fez a Jericó e a Ai.
      b(3, { q: "os moradores de Gibeom, ouvindo", set: "gilgal", props: GILGAL,
        env: { terrain: "field", glory: 0.5, night: 0.15, verdure: 0.34 }, cast: [
        C("homem", 120, "stand", { dy: 0.52, facing: -1, id: "gibeom" }),
        C("homem", 200, "stand", { dy: 0.5, facing: -1, id: "gibeom2" }),
      ] }),
      // v.4 — a ASTÚCIA: fingem-se embaixadores, sacos velhos, ODRES ROTOS.
      b(4, { q: "odres de vinho, velhos, e rotos, e remendados", set: "engano", props: ENGANO,
        env: { terrain: "field", glory: 0.44, night: 0.18, verdure: 0.28 }, cast: [
        C("homem", -40, "point", { dy: 0.52, facing: -1, id: "gibeom" }),
        C("homem", 90, "stand", { dy: 0.5, facing: -1, id: "gibeom2" }),
      ] }),
      // v.5 — sapatos velhos, roupas gastas, o PÃO SECO E BOLORENTO.
      b(5, { q: "era seco e bolorento", env: { glory: 0.44, verdure: 0.26 }, cast: [
        C("homem", -30, "raise", { dy: 0.52, facing: -1, id: "gibeom" }),
        C("homem", 100, "kneel", { dy: 0.56, facing: -1, id: "gibeom2" }),
      ] }),
      // v.6 — vêm a Josué, ao arraial de Gilgal: "Viemos de uma terra distante".
      b(6, { by: "homem", q: "Viemos de uma terra distante", set: "gilgal", props: GILGAL,
        env: { terrain: "field", glory: 0.5, night: 0.14, verdure: 0.34 }, cast: [
        C("homem", 60, "raise", { dy: 0.52, facing: -1, id: "gibeom" }),
        C("servo", -150, "stand", { dy: 0.5, facing: 1, id: "josue" }),
        C("homem", 150, "bow", { dy: 0.54, facing: -1, id: "gibeom2" }),
      ] }),
      // v.7 — os homens de Israel desconfiam: "como faremos acordo convosco?"
      b(7, { by: "anciao", q: "como pois faremos acordo convosco", cast: [
        C("anciao", -80, "point", { dy: 0.5, facing: 1, id: "principes" }),
        C("homem", 90, "stand", { dy: 0.52, facing: -1, id: "gibeom" }),
      ] }),
      // v.8 — Josué pergunta: "Quem sois vós, e de onde vindes?"
      jv(8, "Quem sois vós, e de onde vindes", { cast: [
        C("servo", -150, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("homem", 40, "stand", { dy: 0.52, facing: -1, id: "gibeom" }),
        C("anciao", -270, "stand", { dy: 0.48, facing: 1, id: "principes" }),
      ] }),
      // v.9 — respondem: viemos de terra MUI DISTANTE, pela fama do teu Deus.
      b(9, { by: "homem", q: "vieram de uma terra mui distante", cast: [
        C("homem", 40, "raise", { dy: 0.52, facing: -1, id: "gibeom" }),
        C("servo", -150, "stand", { dy: 0.5, facing: 1, id: "josue" }),
      ] }),
      // v.10 — relembram o que Deus fez aos DOIS REIS dos amorreus, Siom e Ogue.
      b(10, { by: "homem", q: "aos dois reis dos amorreus", cast: [
        C("homem", 30, "point", { dy: 0.52, facing: -1, id: "gibeom" }),
        C("servo", -150, "stand", { dy: 0.5, facing: 1, id: "josue" }),
      ] }),
      // v.11 — "nossos anciãos disseram: tomai provisão para o caminho".
      b(11, { by: "homem", q: "Tomai em vossas mãos provisão para o caminho", set: "engano", props: ENGANO,
        env: { terrain: "field", glory: 0.46, night: 0.16, verdure: 0.28 }, cast: [
        C("homem", 40, "point", { dy: 0.52, facing: -1, id: "gibeom" }),
        C("anciao", 160, "stand", { dy: 0.5, facing: -1, id: "anciaosGibeom" }),
      ] }),
      // v.12 — "este pão tomamos quente... e ei-lo já SECO E BOLORENTO".
      b(12, { by: "homem", q: "já seco e bolorento", cast: [
        C("homem", 20, "raise", { dy: 0.52, facing: -1, id: "gibeom" }),
        C("servo", -150, "stand", { dy: 0.5, facing: 1, id: "josue" }),
      ] }),
      // v.13 — "estes odres eram novos, e ei-los JÁ ROTOS".
      b(13, { by: "homem", q: "eram novos, e ei-los aqui já rotos", cast: [
        C("homem", 40, "point", { dy: 0.52, facing: -1, id: "gibeom" }),
        C("servo", -150, "stand", { dy: 0.5, facing: 1, id: "josue" }),
      ] }),
      // v.14 — os homens de Israel tomam da provisão e NÃO CONSULTAM O SENHOR.
      b(14, { q: "não pediram conselho ao Senhor", set: "gilgal", props: GILGAL,
        env: { terrain: "field", glory: 0.32, night: 0.28, verdure: 0.3 }, cast: [
        C("anciao", -80, "stand", { dy: 0.5, facing: 1, id: "principes" }),
        C("homem", 60, "stand", { dy: 0.52, facing: -1, id: "gibeom" }),
        C("homem", 0, "kneel", { dy: 0.6, facing: -1, id: "israelita" }),
      ] }),
      // v.15 — JOSUÉ FAZ PAZ e a aliança; os príncipes prestam juramento.
      b(15, { q: "E Josué fez paz com eles", env: { glory: 0.4, night: 0.2, verdure: 0.32 }, cast: [
        C("servo", -140, "raise", { dy: 0.5, facing: 1, id: "josue" }),
        C("homem", 80, "bow", { dy: 0.54, facing: -1, id: "gibeom" }),
        C("anciao", 180, "stand", { dy: 0.5, facing: -1, id: "principes" }),
      ] }),
      // v.16 — ao fim de três dias descobrem: eram SEUS VIZINHOS.
      b(16, { q: "eram seus vizinhos", env: { glory: 0.34, night: 0.24 }, cast: [
        C("anciao", -70, "point", { dy: 0.5, facing: 1, id: "principes" }),
        C("homem", 80, "stand", { dy: 0.52, facing: -1, id: "gibeom" }),
      ] }),
      // v.17 — chegam às CIDADES deles: Gibeom, Cefira, Beerote, Quiriate-Jearim.
      b(17, { q: "suas cidades eram Gibeom e Cefira", set: "cidades", props: CIDADES,
        env: { terrain: "city", glory: 0.44, night: 0.18, verdure: 0.24 }, cast: [
        C("multidao", -110, "walk", { dy: 0.5, facing: 1 }),
        C("homem", 120, "stand", { dy: 0.56, facing: -1, id: "gibeom" }),
      ] }),
      // v.18 — não os ferem por causa do juramento; a congregação MURMURA.
      b(18, { q: "toda a congregação murmurava contra os príncipes", env: { glory: 0.34, night: 0.24 }, cast: [
        C("multidao", 100, "point", { dy: 0.52, facing: -1 }),
        C("anciao", -110, "stand", { dy: 0.5, facing: 1, id: "principes" }),
      ] }),
      // v.19 — os príncipes: "Juramos pelo Senhor; não podemos tocar-lhes".
      b(19, { by: "anciao", q: "Nós juramos-lhes pelo Senhor Deus de Israel",
        env: { glory: 0.42, night: 0.18 }, cast: [
        C("anciao", -90, "raise", { dy: 0.5, facing: 1, id: "principes" }),
        C("multidao", 120, "stand", { dy: 0.58 }),
      ] }),
      // v.20 — "conservar-lhes-emos a vida, para que não haja grande ira".
      b(20, { by: "anciao", q: "conservar-lhes-emos a vida", cast: [
        C("anciao", -80, "point", { dy: 0.5, facing: 1, id: "principes" }),
        C("homem", 100, "bow", { dy: 0.54, facing: -1, id: "gibeom" }),
      ] }),
      // v.21 — a sentença: VIVAM, mas RACHADORES DE LENHA e TIRADORES DE ÁGUA.
      b(21, { by: "anciao", q: "sejam rachadores de lenha e tiradores de água", set: "servidao", props: SERVIDAO,
        env: { terrain: "field", glory: 0.46, night: 0.16, verdure: 0.3 }, cast: [
        C("anciao", -140, "point", { dy: 0.5, facing: 1, id: "principes" }),
        C("homem", 70, "bow", { dy: 0.58, facing: -1, id: "gibeom" }),
        C("homem", 170, "kneel", { dy: 0.6, facing: -1, id: "gibeom2" }),
      ] }),
      // v.22 — JOSUÉ os chama: "Por que nos enganastes?"
      jv(22, "Por que nos enganastes dizendo", { cast: [
        C("servo", -150, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("homem", 70, "bow", { dy: 0.58, facing: -1, id: "gibeom" }),
        C("homem", 170, "kneel", { dy: 0.6, facing: -1, id: "gibeom2" }),
      ] }),
      // v.23 — "sereis malditos... rachadores para A CASA DO MEU DEUS".
      b(23, { by: "servo", q: "para a casa do meu Deus", env: { glory: 0.42, night: 0.2 }, cast: [
        C("servo", -140, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("homem", 80, "bow", { dy: 0.58, facing: -1, id: "gibeom" }),
        C("homem", 170, "kneel", { dy: 0.6, facing: -1, id: "gibeom2" }),
      ] }),
      // v.24 — os gibeonitas confessam: "TEMEMOS muito por nossas vidas".
      b(24, { by: "homem", q: "tememos muito por nossas vidas", cast: [
        C("homem", 40, "bow", { dy: 0.56, facing: 1, id: "gibeom" }),
        C("servo", -150, "stand", { dy: 0.5, facing: -1, id: "josue" }),
      ] }),
      // v.25 — "estamos NA TUA MÃO; faze o que te pareça bom".
      b(25, { by: "homem", q: "estamos na tua mão", cast: [
        C("homem", 30, "kneel", { dy: 0.58, facing: 1, id: "gibeom" }),
        C("servo", -150, "stand", { dy: 0.5, facing: -1, id: "josue" }),
      ] }),
      // v.26 — assim lhes faz: livra-os das mãos de Israel, e NÃO OS MATAM.
      b(26, { q: "e não os mataram", env: { glory: 0.48, night: 0.16 }, cast: [
        C("servo", -140, "raise", { dy: 0.5, facing: 1, id: "josue" }),
        C("homem", 90, "bow", { dy: 0.56, facing: -1, id: "gibeom" }),
      ] }),
      // v.27 — RACHADORES DE LENHA e TIRADORES DE ÁGUA para a congregação e o ALTAR.
      b(27, { q: "rachadores de lenha e tiradores de água para a congregação", set: "servidao", props: SERVIDAO,
        env: { terrain: "field", glory: 0.5, night: 0.14, verdure: 0.32 }, cast: [
        C("homem", -40, "kneel", { dy: 0.6, facing: -1, id: "gibeom" }),
        C("homem", 110, "bow", { dy: 0.58, facing: 1, id: "gibeom2" }),
        C("multidao", 200, "stand", { dy: 0.64 }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Js 10
  10: {
    start: { terrain: "city", night: 0.14, glory: 0.5, storm: 0, fire: 0, verdure: 0.24 },
    beats: [
      // v.1 — ADONI-ZEDEQUE, rei de Jerusalém, ouve que Gibeom fez paz com Israel.
      b(1, { q: "os moradores de Gibeom fizeram paz com os israelitas", set: "cidades", props: CIDADES,
        env: { terrain: "city", glory: 0.4, night: 0.22, verdure: 0.2 }, cast: [
        C("rei", 120, "stand", { dy: 0.48, facing: -1, id: "adoni" }),
        C("homem", -100, "stand", { dy: 0.52, facing: 1, id: "gibeom" }),
      ] }),
      // v.2 — TEMEM MUITO: Gibeom é cidade grande, maior do que Ai.
      b(2, { q: "Temeram muito", env: { glory: 0.34, night: 0.28 }, cast: [
        C("rei", 110, "bow", { dy: 0.5, facing: -1, id: "adoni" }),
      ] }),
      // v.3 — Adoni-Zedeque envia aos reis de Hebrom, Jarmute, Laquis, Eglom.
      b(3, { q: "rei de Hebrom", env: { glory: 0.38, night: 0.24 }, cast: [
        C("rei", -120, "point", { dy: 0.5, facing: 1, id: "adoni" }),
        C("rei", 30, "stand", { dy: 0.48, facing: -1, id: "reiHebrom" }),
        C("rei", 120, "stand", { dy: 0.5, facing: -1, id: "reiJarmute" }),
        C("rei", 210, "stand", { dy: 0.46, facing: -1, id: "reiLaquis" }),
      ] }),
      // v.4 — o clamor: "SUBI A MIM E AJUDAI-ME; firamos a Gibeom".
      b(4, { by: "rei", q: "Subi a mim, e ajudai-me", cast: [
        C("rei", -120, "raise", { dy: 0.5, facing: 1, id: "adoni" }),
        C("rei", 40, "stand", { dy: 0.48, facing: -1, id: "reiHebrom" }),
        C("rei", 140, "stand", { dy: 0.5, facing: -1, id: "reiEglom" }),
      ] }),
      // v.5 — os CINCO REIS DOS AMORREUS sobem e sitiam Gibeom.
      b(5, { q: "cinco reis dos amorreus", set: "gibeom-sitio", props: GIBEOM_SITIO,
        env: { terrain: "mountain", glory: 0.3, night: 0.32, storm: 0.12, verdure: 0.16 }, cast: [
        C("rei", -160, "walk", { dy: 0.48, facing: 1, id: "adoni" }),
        C("rei", -70, "walk", { dy: 0.5, facing: 1, id: "reiHebrom" }),
        C("rei", 60, "stand", { dy: 0.46, facing: -1, id: "reiJarmute" }),
        C("multidao", 180, "stand", { dy: 0.62 }),
      ] }),
      // v.6 — GIBEOM clama a Josué em Gilgal: "sobe apressadamente, e livra-nos".
      b(6, { by: "homem", q: "sobe apressadamente a nós, e livra-nos", set: "gilgal", props: GILGAL,
        env: { terrain: "field", glory: 0.46, night: 0.18, verdure: 0.32 }, cast: [
        C("homem", 60, "raise", { dy: 0.52, facing: -1, id: "gibeom" }),
        C("servo", -150, "stand", { dy: 0.5, facing: 1, id: "josue" }),
      ] }),
      // v.7 — SOBE JOSUÉ de Gilgal com toda a gente de guerra.
      b(7, { q: "Então subiu Josué, de Gilgal", env: { glory: 0.5, night: 0.16 }, cast: [
        C("servo", -140, "walk", { dy: 0.5, facing: 1, id: "josue" }),
        C("multidao", 100, "walk", { dy: 0.56 }),
      ] }),
      // v.8 — o SENHOR fala direto a Josué: "Não os temas" — voz do céu, glória.
      dv(8),
      // v.9 — de repente sobre eles: TODA A NOITE veio subindo desde Gilgal.
      b(9, { q: "toda a noite veio subindo desde Gilgal", set: "noite", props: NOITE,
        env: { terrain: "desert", glory: 0.34, night: 0.62, storm: 0.05, verdure: 0.14 }, cast: [
        C("servo", -140, "walk", { dy: 0.5, facing: 1, id: "josue" }),
        C("multidao", 90, "walk", { dy: 0.56 }),
      ] }),
      // v.10 — o Senhor os CONTURBA: grande matança em Gibeom, perseguidos.
      b(10, { q: "os feriu com grande matança em Gibeom", set: "gibeom-sitio", props: GIBEOM_SITIO,
        env: { terrain: "mountain", glory: 0.34, night: 0.34, storm: 0.2, verdure: 0.14 }, cast: [
        C("rei", 120, "lie", { dy: 0.62, id: "adoni" }),
        C("rei", 200, "bow", { dy: 0.58, facing: 1, id: "reiHebrom" }),
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "josue" }),
      ] }),
      // v.11 — o Senhor lança DO CÉU grandes PEDRAS DE SARAIVA. ÍCONE.
      b(11, { q: "das pedras da saraiva", set: "saraiva", props: SARAIVA,
        env: { terrain: "field", glory: 0.3, night: 0.4, storm: 0.35, verdure: 0.12 }, cast: [
        C("rei", 130, "lie", { dy: 0.64, id: "reiJarmute" }),
        C("rei", 40, "lie", { dy: 0.6, id: "reiLaquis" }),
        C("homem", -110, "bow", { dy: 0.56, facing: 1, id: "amorreu" }),
      ] }),
      // v.12 — JOSUÉ clama: "SOL, DETÉM-TE EM GIBEOM" — o astro parado. ÍCONE.
      b(12, { by: "servo", q: "Sol, detém-te em Gibeom", set: "sol-parado", props: SOL_PARADO,
        env: { terrain: "field", glory: 0.85, night: 0, storm: 0, verdure: 0.28 }, cast: [
        C("servo", -60, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.3 }),
        C("multidao", 150, "stand", { dy: 0.62 }),
      ] }),
      // v.13 — o SOL SE DETÉM no meio do céu, quase um dia inteiro.
      b(13, { q: "não se apressou a pôr-se, quase um dia inteiro", env: { glory: 0.9, night: 0, verdure: 0.3 }, cast: [
        C("servo", -60, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.3 }),
        C("multidao", 150, "raise", { dy: 0.62 }),
      ] }),
      // v.14 — não houve dia como este: o Senhor pelejava por Israel.
      b(14, { q: "porque o Senhor pelejava por Israel", env: { glory: 0.82, night: 0.04 }, cast: [
        C("servo", -60, "bow", { dy: 0.52, facing: 1, id: "josue", glow: 0.25 }),
      ] }),
      // v.15 — volta Josué e todo o Israel ao arraial em Gilgal.
      b(15, { q: "voltou Josué, e todo o Israel com ele", set: "gilgal", props: GILGAL,
        env: { terrain: "field", glory: 0.56, night: 0.14, verdure: 0.34 }, cast: [
        C("servo", -140, "walk", { dy: 0.5, facing: 1, id: "josue" }),
        C("multidao", 110, "walk", { dy: 0.58 }),
      ] }),
      // v.16 — os cinco reis fogem e se ESCONDEM numa COVA em Maquedá.
      b(16, { q: "se esconderam numa cova em Maquedá", set: "cova", props: COVA,
        env: { terrain: "field", glory: 0.36, night: 0.28, verdure: 0.18 }, cast: [
        C("rei", 30, "kneel", { dy: 0.62, facing: 1, id: "adoni" }),
        C("rei", 120, "bow", { dy: 0.58, facing: -1, id: "reiHebrom" }),
      ] }),
      // v.17 — é anunciado a Josué: acharam os cinco reis escondidos na cova.
      b(17, { q: "Acharam-se os cinco reis escondidos numa cova", cast: [
        C("homem", 120, "point", { dy: 0.52, facing: -1, id: "mensageiro" }),
        C("servo", -150, "stand", { dy: 0.5, facing: 1, id: "josue" }),
      ] }),
      // v.18 — Josué: "Arrastai GRANDES PEDRAS à boca da cova" e guardai-a.
      jv(18, "Arrastai grandes pedras à boca da cova"),
      // v.19 — "persegui os vossos inimigos; não os deixeis entrar nas cidades".
      b(19, { by: "servo", q: "persegui os vossos inimigos", set: "conquista", props: CONQUISTA,
        env: { terrain: "city", glory: 0.42, night: 0.2, storm: 0.12, verdure: 0.18 }, cast: [
        C("servo", -140, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("multidao", 100, "walk", { dy: 0.56, facing: -1 }),
      ] }),
      // v.20 — acabam de os ferir com GRANDE MATANÇA; o resto foge às cidades.
      b(20, { q: "os ferir com grande matança", env: { glory: 0.4, night: 0.22 }, cast: [
        C("rei", 120, "lie", { dy: 0.62, id: "reiEglom" }),
        C("homem", -110, "raise", { dy: 0.5, facing: 1, id: "guerreiro" }),
      ] }),
      // v.21 — TODO O POVO volta em paz a Josué ao arraial em Maquedá.
      b(21, { q: "Todo o povo voltou em paz a Josué", set: "cova", props: COVA,
        env: { terrain: "field", glory: 0.5, night: 0.16, verdure: 0.22 }, cast: [
        C("servo", -140, "stand", { dy: 0.5, facing: 1, id: "josue" }),
        C("multidao", 110, "stand", { dy: 0.6 }),
      ] }),
      // v.22 — Josué: "ABRI A BOCA DA COVA e trazei-me os cinco reis".
      jv(22, "Abri a boca da cova"),
      // v.23 — trazem os CINCO REIS para fora da cova.
      b(23, { q: "cinco reis para fora da cova", env: { glory: 0.44, night: 0.18 }, cast: [
        C("servo", -150, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("rei", 30, "bow", { dy: 0.6, facing: 1, id: "adoni" }),
        C("rei", 110, "bow", { dy: 0.58, facing: 1, id: "reiHebrom" }),
        C("rei", 190, "kneel", { dy: 0.6, facing: 1, id: "reiJarmute" }),
      ] }),
      // v.24 — Josué manda pôr os PÉS sobre os PESCOÇOS destes reis.
      b(24, { by: "servo", q: "ponde os vossos pés sobre os pescoços destes reis", env: { glory: 0.46, night: 0.18 }, cast: [
        C("servo", -150, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("rei", 40, "lie", { dy: 0.66, id: "adoni" }),
        C("rei", 130, "lie", { dy: 0.64, id: "reiHebrom" }),
        C("homem", 210, "stand", { dy: 0.52, facing: -1, id: "capitao" }),
      ] }),
      // v.25 — "NÃO TEMAIS: assim fará o Senhor a todos os vossos inimigos".
      b(25, { by: "servo", q: "Não temais, nem vos espanteis", env: { glory: 0.56, night: 0.14 }, cast: [
        C("servo", -140, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.2 }),
        C("multidao", 120, "stand", { dy: 0.6 }),
      ] }),
      // v.26 — Josué os fere e os ENFORCA em cinco madeiros até à tarde. JUÍZO.
      b(26, { q: "os enforcou em cinco madeiros", set: "cova", props: [
        ...COVA, P("tree", -40, 1.15, undefined, 0.24), P("tree", 60, 1.1, undefined, 0.26),
      ], env: { terrain: "field", glory: 0.3, night: 0.36, verdure: 0.14 }, cast: [
        C("servo", -160, "stand", { dy: 0.5, facing: 1, id: "josue" }),
        C("rei", 20, "lie", { dy: 0.66, id: "adoni" }),
        C("rei", 110, "lie", { dy: 0.64, id: "reiHebrom" }),
      ] }),
      // v.27 — ao pôr do sol lançam-nos na cova e põem GRANDES PEDRAS à boca.
      b(27, { q: "puseram grandes pedras à boca da cova", set: "cova", props: COVA,
        env: { terrain: "field", glory: 0.28, night: 0.5, verdure: 0.14 }, cast: [
        C("homem", -90, "stand", { dy: 0.5, facing: 1, id: "guerreiro" }),
        C("homem", 60, "kneel", { dy: 0.58, facing: -1, id: "guerreiro2" }),
      ] }),
      // v.28 — naquele dia TOMA MAQUEDÁ, ferida a fio de espada, ao seu rei.
      b(28, { q: "tomou Josué a Maquedá", set: "conquista", props: CONQUISTA,
        env: { terrain: "city", glory: 0.4, night: 0.22, storm: 0.1, verdure: 0.16 }, cast: [
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "josue" }),
        C("rei", 120, "lie", { dy: 0.62, id: "reiMaqueda" }),
      ] }),
      // v.29 — passa de Maquedá a LIBNA e peleja contra ela.
      b(29, { q: "passou de Maquedá a Libna", env: { glory: 0.42, night: 0.2, storm: 0.1 }, cast: [
        C("servo", -140, "walk", { dy: 0.5, facing: 1, id: "josue" }),
        C("multidao", 100, "walk", { dy: 0.56, facing: -1 }),
      ] }),
      // v.30 — o Senhor a dá na mão de Israel: ferida a fio de espada.
      b(30, { q: "a feriu a fio de espada", env: { glory: 0.4, night: 0.22 }, cast: [
        C("rei", 120, "lie", { dy: 0.62, id: "reiLibna" }),
        C("homem", -110, "raise", { dy: 0.5, facing: 1, id: "guerreiro" }),
      ] }),
      // v.31 — passa de Libna a LAQUIS e a sitia.
      b(31, { q: "passou de Libna a Laquis", env: { glory: 0.42, night: 0.2, storm: 0.1 }, cast: [
        C("servo", -140, "walk", { dy: 0.5, facing: 1, id: "josue" }),
        C("multidao", 100, "walk", { dy: 0.56, facing: -1 }),
      ] }),
      // v.32 — o Senhor dá LAQUIS: tomada no dia seguinte, ferida a fio de espada.
      b(32, { q: "deu a Laquis nas mãos de Israel", env: { glory: 0.4, night: 0.22 }, cast: [
        C("rei", 120, "lie", { dy: 0.62, id: "reiLaquis" }),
        C("homem", -110, "raise", { dy: 0.5, facing: 1, id: "guerreiro" }),
      ] }),
      // v.33 — HORÃO, rei de Gezer, sobe a ajudar Laquis; Josué o fere.
      b(33, { q: "Horão, rei de Gezer, subiu a ajudar a Laquis", env: { glory: 0.4, night: 0.22, storm: 0.1 }, cast: [
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "josue" }),
        C("rei", 130, "lie", { dy: 0.62, id: "horao" }),
      ] }),
      // v.34 — passa de Laquis a EGLOM e a sitia.
      b(34, { q: "passou de Laquis a Eglom", env: { glory: 0.42, night: 0.2, storm: 0.1 }, cast: [
        C("servo", -140, "walk", { dy: 0.5, facing: 1, id: "josue" }),
        C("multidao", 100, "walk", { dy: 0.56, facing: -1 }),
      ] }),
      // v.35 — NO MESMO DIA a toma, ferida a fio de espada.
      b(35, { q: "E no mesmo dia a tomaram", env: { glory: 0.4, night: 0.22 }, cast: [
        C("rei", 120, "lie", { dy: 0.62, id: "reiEglomC" }),
        C("homem", -110, "raise", { dy: 0.5, facing: 1, id: "guerreiro" }),
      ] }),
      // v.36 — sobe de Eglom a HEBROM e peleja contra ela.
      b(36, { q: "subiu de Eglom a Hebrom", env: { glory: 0.42, night: 0.2, storm: 0.1 }, cast: [
        C("servo", -140, "walk", { dy: 0.5, facing: 1, id: "josue" }),
        C("multidao", 100, "walk", { dy: 0.56, facing: -1 }),
      ] }),
      // v.37 — toma HEBROM, ao seu rei e cidades; a ninguém deixa com vida.
      b(37, { q: "a ninguém deixou com vida", env: { glory: 0.38, night: 0.24 }, cast: [
        C("rei", 120, "lie", { dy: 0.62, id: "reiHebromC" }),
        C("homem", -110, "raise", { dy: 0.5, facing: 1, id: "guerreiro" }),
      ] }),
      // v.38 — torna a DEBIR e peleja contra ela.
      b(38, { q: "tornou a Debir", env: { glory: 0.42, night: 0.2, storm: 0.1 }, cast: [
        C("servo", -140, "walk", { dy: 0.5, facing: 1, id: "josue" }),
        C("multidao", 100, "walk", { dy: 0.56, facing: -1 }),
      ] }),
      // v.39 — toma DEBIR com o seu rei; como fizera a Hebrom, assim fez a Debir.
      b(39, { q: "como fizera a Hebrom, assim fez a Debir", env: { glory: 0.4, night: 0.22 }, cast: [
        C("rei", 120, "lie", { dy: 0.62, id: "reiDebir" }),
        C("homem", -110, "raise", { dy: 0.5, facing: 1, id: "guerreiro" }),
      ] }),
      // v.40 — ASSIM FERIU toda a terra: montanhas, sul, campinas, todos os reis.
      b(40, { q: "Assim feriu Josué toda aquela terra", set: "conquista", props: CONQUISTA,
        env: { terrain: "mountain", glory: 0.4, night: 0.2, verdure: 0.16 }, cast: [
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.2 }),
        C("multidao", 120, "stand", { dy: 0.62 }),
      ] }),
      // v.41 — feriu desde Cades-Barnéia até Gaza, toda Gósen, até Gibeom.
      b(41, { q: "desde Cades-Barnéia, até Gaza", env: { terrain: "field", glory: 0.44, night: 0.18, verdure: 0.24 }, cast: [
        C("servo", -140, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("multidao", 120, "stand", { dy: 0.62 }),
      ] }),
      // v.42 — de uma vez toma todos estes reis: o Senhor PELEJAVA por Israel.
      b(42, { q: "porquanto o Senhor Deus de Israel pelejava por Israel", env: { glory: 0.7, night: 0.1, verdure: 0.28 }, cast: [
        C("servo", -140, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.25 }),
        C("multidao", 120, "raise", { dy: 0.62 }),
      ] }),
      // v.43 — volta Josué e todo o Israel ao arraial em Gilgal.
      b(43, { q: "voltou ao arraial em Gilgal", set: "gilgal", props: GILGAL,
        env: { terrain: "field", glory: 0.58, night: 0.12, verdure: 0.36 }, cast: [
        C("servo", -140, "walk", { dy: 0.5, facing: 1, id: "josue" }),
        C("multidao", 110, "walk", { dy: 0.58 }),
      ] }),
    ],
  },
};
