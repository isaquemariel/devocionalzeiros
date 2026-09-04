// ============================================================================
// DEUTERONÔMIO 1–3 — CENA VIVA. Moisés, nas campinas de Moabe, RELEMBRA a jornada.
//
// Dt 1 — DE HOREBE A CADES: Moisés, aos 120 anos, começa a declarar a Lei além
// do Jordão. Relembra a NOMEAÇÃO de juízes e chefes; o envio dos DOZE ESPIAS e o
// cacho do vale de ESCOL (a boa terra); a INCREDULIDADE do povo diante dos
// gigantes e das cidades muradas; a SENTENÇA (aquela geração não entra, salvo
// Calebe e Josué); e a DERROTA quando teimaram em subir — os amorreus os
// perseguiram "como fazem as abelhas".
//
// Dt 2 — OS 38 ANOS RODEANDO: passam sem guerra por Edom (Esaú), Moabe e Amom;
// a geração de guerra se consome no deserto; e vem a VITÓRIA sobre SIOM, rei de
// Hesbom, cujas cidades são tomadas.
//
// Dt 3 — OGUE, O GIGANTE: a VITÓRIA sobre OGUE, rei de Basã, o resto dos
// gigantes (seu leito de ferro). A terra é dada a Rúben, Gade e à meia tribo de
// Manassés. Josué é encorajado. E Moisés, a quem se nega a passagem, é mandado
// SUBIR o cume do PISGA para VER a terra que não atravessará.
//
// A VOZ DE DEUS (regra do projeto): quase tudo é MOISÉS pregando/relembrando
// (`by:"moises"`), pois ele é o mediador visível. Reserva-se `by:"deus"` (voz do
// céu, glória, sem figura) só para os oráculos divinos mais solenes do
// flashback — a SENTENÇA sobre a geração (1:35) e o "Não o temas" antes de Ogue
// (3:2).
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const mv = (v: number, q?: string) => b(v, { by: "moises", ...(q ? { q } : {}) }); // Moisés fala
const dv = (v: number, q?: string, extra: Partial<StageBeat> = {}) => b(v, { by: "deus", ...(q ? { q } : {}), ...extra });   // voz do céu

// CAMPINAS DE MOABE, além do Jordão — a cena-base do discurso: o rio ao fundo, o
// monte, as tendas do arraial.
const MOABE: StagePropSpec[] = [
  P("river", 0, 1.4, undefined, 0.86),
  P("tent", -230, 1.05, undefined, 0.2),
  P("tent", 220, 1.0, undefined, 0.24),
  P("rock", 310, 1.1, undefined, 0.32),
  P("palm", -320, 1.05, undefined, 0.14),
  P("grass", 80, 0.78, undefined, 0.68),
];
// O DESERTO da peregrinação relembrada — a marcha por lugares áridos.
const DESERTO: StagePropSpec[] = [
  P("palm", -320, 1.05, undefined, 0.14),
  P("rock", 300, 1.12, undefined, 0.3),
  P("grass", -60, 0.8, undefined, 0.82),
  P("grass", 90, 0.76, undefined, 0.74),
];
// HOREBE — o monte de onde partiram; a ordem "assaz vos haveis demorado".
const HOREBE: StagePropSpec[] = [
  P("rock", 0, 1.45, undefined, 0.42),
  P("rock", 210, 1.15, undefined, 0.52),
  P("tent", -240, 1.0, undefined, 0.2),
  P("grass", -70, 0.76, undefined, 0.8),
];
// O VALE DE ESCOL — o cacho da terra boa que os espias trouxeram.
const ESCOL: StagePropSpec[] = [
  { ...P("grapes", 0, 1.55, undefined, 0.4), tag: "cacho-de-escol" },
  P("grapes", -270, 1.1, undefined, 0.3),
  P("tree", 285, 1.15, undefined, 0.24),
  P("grass", -90, 0.85, undefined, 0.8),
  P("grass", 120, 0.82, undefined, 0.72),
];
// AS CIDADES MURADAS "até aos céus" e os gigantes — o pavor da incredulidade.
const MURADAS: StagePropSpec[] = [
  P("tower", -135, 1.32, undefined, 0.22),
  P("tower", 150, 1.26, undefined, 0.28),
  P("rock", 305, 1.1, undefined, 0.3),
];
// AS CIDADES TOMADAS na guerra a Siom / a Ogue — torres sob juízo.
const GUERRA: StagePropSpec[] = [
  P("tower", -120, 1.22, undefined, 0.28),
  P("tower", 145, 1.16, undefined, 0.34),
  P("rock", 300, 1.1, undefined, 0.3),
  P("grass", -40, 0.76, undefined, 0.78),
];
// O CUME DO PISGA — o alto solene de onde Moisés verá a terra sem entrar nela.
const PISGA: StagePropSpec[] = [
  P("rock", 0, 1.55, undefined, 0.44),
  P("rock", 210, 1.2, undefined, 0.56),
  P("river", -210, 1.2, undefined, 0.82),
  P("tree", 250, 1.0, undefined, 0.3),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Dt 1
  1: {
    start: { terrain: "field", night: 0.1, glory: 0.6, storm: 0, fire: 0, verdure: 0.4 },
    beats: [
      // v.1 — Moisés fala a TODO o Israel, além do Jordão.
      b(1, { by: "moises", q: "que Moisés falou a todo o Israel", props: MOABE,
        env: { terrain: "field", glory: 0.6, night: 0.1, verdure: 0.42 }, cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1, glow: 0.2 }),
        C("multidao", 130, "stand", { dy: 0.6 }),
      ] }),
      mv(2, "Onze jornadas há desde Horebe"),                                        // onze jornadas desde Horebe até Cades
      mv(3, "no ano quadragésimo"),                                                  // no ano quadragésimo, Moisés fala
      // v.4 — recorda que já feriu SIOM e OGUE (o que Dt 2-3 detalha).
      b(4, { by: "moises", q: "feriu a Siom, rei dos amorreus", set: "guerra", props: GUERRA,
        env: { terrain: "field", glory: 0.42, night: 0.2, verdure: 0.18 }, cast: [
        C("rei", -120, "lie", { dy: 0.6, id: "siom" }),
        C("rei", 150, "lie", { dy: 0.62, id: "ogue", scale: 1.3 }),
      ] }),
      // v.5 — começou a declarar ESTA LEI: o livro nas mãos.
      b(5, { by: "moises", q: "começou Moisés a declarar esta lei", set: "moabe", props: [
        ...MOABE, P("scroll", -70, 0.95, undefined, 0.56),
      ], env: { terrain: "field", glory: 0.6, night: 0.1, verdure: 0.42 }, cast: [
        C("moises", -150, "point", { dy: 0.5, facing: 1, glow: 0.2 }),
        C("multidao", 140, "stand", { dy: 0.6 }),
      ] }),
      // v.6 — flashback de HOREBE: "assaz vos haveis demorado neste monte".
      b(6, { by: "moises", q: "Assaz vos haveis demorado neste monte", set: "horebe", props: HOREBE,
        env: { terrain: "mountain", glory: 0.35, night: 0.22, verdure: 0.16 }, cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.64 }),
      ] }),
      mv(7, "ide à montanha dos amorreus"),                                          // parti à montanha dos amorreus
      mv(8, "a terra que o Senhor jurou a vossos pais"),                             // a terra jurada a Abraão, Isaque e Jacó
      // v.9 — "eu sozinho não poderei levar-vos".
      b(9, { by: "moises", q: "Eu sozinho não poderei levar-vos", cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 140, "stand", { dy: 0.62 }),
      ] }),
      // v.10 — multiplicados como as ESTRELAS do céu.
      b(10, { by: "moises", q: "como as estrelas do céu", props: [
        ...HOREBE, { ...P("starfield", 0, 2.2, undefined, 0.22), sky: true },
      ], env: { glory: 0.5, night: 0.3 }, cast: [
        C("moises", -140, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 140, "stand", { dy: 0.62 }),
      ] }),
      mv(11, "ainda mil vezes mais do que sois"),                                    // que o Senhor vos aumente e abençoe
      mv(12, "Como suportaria eu sozinho os vossos fardos"),                         // o peso dos fardos, cargas e contendas
      // v.13 — TOMAI HOMENS SÁBIOS: a escolha dos chefes.
      b(13, { by: "moises", q: "Tomai-vos homens sábios e entendidos",
        env: { terrain: "field", glory: 0.55, night: 0.15 }, cast: [
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("anciao", 20, "stand", { dy: 0.5, id: "chefes" }),
        C("anciao", 110, "stand", { dy: 0.52, facing: -1, id: "chefes2" }),
      ] }),
      mv(14, "Bom é fazer o que tens falado"),                                       // o povo aprova a proposta
      // v.15 — os chefes POSTOS por cabeças: capitães de milhares, cem, cinquenta, dez.
      b(15, { by: "moises", q: "e os tenho posto por cabeças sobre vós", cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1, glow: 0.15 }),
        C("anciao", 40, "bow", { dy: 0.5, id: "chefes" }),
        C("anciao", 130, "bow", { dy: 0.52, facing: -1, id: "chefes2" }),
      ] }),
      // v.16 — instrução aos JUÍZES: julgai justamente.
      b(16, { by: "moises", q: "julgai justamente entre o homem e seu irmão", cast: [
        C("moises", -140, "point", { dy: 0.5, facing: 1 }),
        C("anciao", 60, "stand", { dy: 0.5, id: "juizes" }),
        C("homem", 160, "stand", { dy: 0.54, facing: -1, id: "litigante" }),
      ] }),
      mv(17, "porque o juízo é de Deus"),                                            // não temer a face de ninguém: o juízo é de Deus
      mv(18, "vos ordenei todas as coisas que havíeis de fazer"),                    // tudo o que deviam fazer, ordenado
      // v.19 — partem de Horebe pelo GRANDE E TREMENDO DESERTO até Cades.
      b(19, { by: "moises", q: "aquele grande e tremendo deserto", set: "deserto", props: DESERTO,
        env: { terrain: "desert", glory: 0.5, night: 0.14, verdure: 0.14 }, cast: [
        C("multidao", 30, "walk", { dy: 0.5 }),
        C("moises", -170, "walk", { dy: 0.5, facing: 1 }),
      ] }),
      mv(20, "Chegados sois às montanhas dos amorreus"),                             // chegaram às montanhas dos amorreus
      mv(21, "não temas, e não te assustes"),                                        // sobe e toma posse; não temas
      // v.22 — o pedido de ENVIAR ESPIAS adiante.
      b(22, { by: "moises", q: "para que nos espiem a terra", cast: [
        C("multidao", 120, "point", { dy: 0.56, facing: -1 }),
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      // v.23 — DOZE HOMENS, um de cada tribo.
      b(23, { by: "moises", q: "tomei doze homens", cast: [
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("servo", 20, "stand", { dy: 0.5, id: "espia1" }),
        C("servo", 100, "stand", { dy: 0.52, facing: -1, id: "espia2" }),
        C("servo", 180, "stand", { dy: 0.48, id: "espia3" }),
      ] }),
      // v.24 — chegam ao VALE DE ESCOL e o espiam: o cacho da boa terra.
      b(24, { by: "moises", q: "chegaram até ao vale de Escol", set: "escol", props: ESCOL,
        env: { terrain: "field", glory: 0.62, night: 0.1, verdure: 0.72 }, cast: [
        C("servo", -150, "walk", { dy: 0.5, facing: 1, id: "espia1" }),
        C("servo", 150, "stand", { dy: 0.54, facing: -1, id: "espia2" }),
      ] }),
      // v.25 — "Boa é a terra": erguem o fruto nas mãos.
      b(25, { by: "moises", q: "Boa é a terra que nos dá o Senhor", env: { glory: 0.68, verdure: 0.78 }, cast: [
        C("servo", -120, "raise", { dy: 0.5, facing: 1, id: "espia1" }),
        C("servo", 140, "raise", { dy: 0.54, facing: -1, id: "espia2" }),
      ] }),
      // v.26 — mas NÃO QUISERAM SUBIR: rebeldes.
      b(26, { by: "moises", q: "Porém vós não quisestes subir", set: "muradas", props: MURADAS,
        env: { terrain: "field", glory: 0.32, night: 0.28, verdure: 0.18 }, cast: [
        C("homem", -100, "bow", { dy: 0.52, facing: 1, id: "rebelde1" }),
        C("mulherComum", -20, "bow", { dy: 0.5, id: "rebelde2" }),
      ] }),
      // v.27 — MURMURAM nas tendas: "o Senhor nos odeia".
      b(27, { by: "moises", q: "Porquanto o Senhor nos odeia", env: { glory: 0.28, night: 0.34 }, cast: [
        C("homem", -80, "point", { dy: 0.52, facing: -1, id: "murmurador" }),
        C("mulherComum", 40, "bow", { dy: 0.5, id: "murmurador2" }),
      ] }),
      // v.28 — o pavor: cidades fortificadas "até aos céus" e os GIGANTES.
      b(28, { by: "moises", q: "fortificadas até aos céus", env: { glory: 0.26, night: 0.36 }, cast: [
        C("homem", 150, "stand", { dy: 0.54, facing: -1, id: "gigante", scale: 2.2 }),
        C("homem", -110, "bow", { dy: 0.56, facing: 1, id: "temeroso" }),
        C("mulherComum", -20, "kneel", { dy: 0.52, id: "temerosa" }),
      ] }),
      mv(29, "Não vos espanteis, nem os temais"),                                    // Moisés os anima: não temais
      mv(30, "ele pelejará por vós"),                                                // o Senhor pelejará por vós como no Egito
      mv(31, "como um homem leva seu filho"),                                        // Deus vos levou como pai leva o filho
      mv(32, "nem por isso crestes no Senhor"),                                      // e ainda assim não creram
      // v.33 — a COLUNA: de noite no FOGO, de dia na NUVEM.
      b(33, { by: "moises", q: "de noite no fogo", set: "deserto", props: [
        ...DESERTO,
        { ...P("pillar", 0, 1.5, 0.8, 0.5), tag: "coluna-de-fogo" },
        { ...P("clouds", -30, 1.6, undefined, 0.8), sky: true },
      ], env: { terrain: "desert", glory: 0.4, night: 0.45, fire: 0.3, verdure: 0.14 }, cast: [
        C("multidao", 150, "stand", { dy: 0.64 }),
      ] }),
      mv(34, "indignou-se, e jurou"),                                               // o Senhor se indigna e jura
      // v.35 — A SENTENÇA: voz do céu, sem figura. A geração não verá a terra.
      // env/props próprios (MOABE, sem a coluna de fogo do v.33) — reseta o fire herdado.
      b(35, { by: "deus", q: "Nenhum dos homens desta maligna geração", set: "moabe", props: MOABE,
        env: { terrain: "field", glory: 0.55, night: 0.2, storm: 0, fire: 0, verdure: 0.3 }, cast: [
        C("homem", 120, "bow", { dy: 0.58, facing: -1, id: "condenado1" }),
        C("mulherComum", 40, "kneel", { dy: 0.54, id: "condenada2" }),
      ] }),
      // v.36 — SALVO CALEBE, que perseverou.
      b(36, { by: "moises", q: "Salvo Calebe, filho de Jefoné", set: "moabe", props: MOABE,
        env: { terrain: "field", glory: 0.6, night: 0.12, verdure: 0.4 }, cast: [
        C("moises", -140, "point", { dy: 0.5, facing: 1 }),
        C("servo", 120, "stand", { dy: 0.5, facing: -1, id: "calebe", glow: 0.2 }),
      ] }),
      mv(37, "Também tu lá não entrarás"),                                          // também Moisés não entrará
      // v.38 — JOSUÉ entrará: fortalece-o.
      b(38, { by: "moises", q: "Josué, filho de Num", cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1 }),
        C("servo", 120, "stand", { dy: 0.5, facing: -1, id: "josue", glow: 0.2 }),
      ] }),
      mv(39, "eles ali entrarão, e a eles a darei"),                                // os pequeninos entrarão e possuirão
      // v.40 — voltar ao DESERTO, caminho do Mar Vermelho.
      b(40, { by: "moises", q: "parti para o deserto, pelo caminho do Mar Vermelho",
        set: "deserto", props: DESERTO, env: { terrain: "desert", glory: 0.45, night: 0.18, verdure: 0.14 }, cast: [
        C("multidao", 0, "walk", { dy: 0.5 }),
      ] }),
      // v.41 — teimam: "Pecamos"; armam-se para subir.
      b(41, { by: "moises", q: "Pecamos contra o Senhor", env: { glory: 0.4, night: 0.22 }, cast: [
        C("homem", 100, "raise", { dy: 0.52, facing: -1, id: "guerreiro1" }),
        C("homem", -110, "stand", { dy: 0.5, facing: 1, id: "guerreiro2" }),
      ] }),
      mv(42, "Não subais nem pelejeis"),                                            // o aviso: não subais, pois não estou convosco
      mv(43, "antes fostes rebeldes ao mandado do Senhor"),                         // rebeldes, subiram assim mesmo
      // v.44 — A DERROTA: os amorreus os perseguem "como fazem as abelhas".
      b(44, { by: "moises", q: "perseguiram-vos como fazem as abelhas", set: "muradas", props: MURADAS,
        env: { terrain: "mountain", glory: 0.14, night: 0.55, storm: 0.15, verdure: 0.12 }, cast: [
        C("homem", 150, "stand", { dy: 0.46, facing: -1, id: "amorreu" }),
        C("homem", -100, "lie", { dy: 0.6, id: "ferido1" }),
        C("mulherComum", 0, "bow", { dy: 0.54, id: "ferido2" }),
        C("homem", 60, "lie", { dy: 0.64, id: "ferido3" }),
      ] }),
      // v.45 — choram, mas o Senhor não os ouve.
      b(45, { by: "moises", q: "o Senhor não ouviu a vossa voz", env: { glory: 0.16, night: 0.5 }, cast: [
        C("homem", -80, "bow", { dy: 0.56, id: "chorao1" }),
        C("mulherComum", 40, "kneel", { dy: 0.52, id: "chorao2" }),
      ] }),
      // v.46 — permanecem MUITOS DIAS em Cades.
      b(46, { by: "moises", q: "muitos dias em Cades", set: "deserto", props: DESERTO,
        env: { terrain: "desert", glory: 0.42, night: 0.2, verdure: 0.14 }, cast: [
        C("multidao", 140, "stand", { dy: 0.62 }),
        C("moises", -160, "stand", { dy: 0.5, facing: 1 }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Dt 2
  2: {
    start: { terrain: "desert", night: 0.16, glory: 0.5, storm: 0, fire: 0, verdure: 0.16 },
    beats: [
      // v.1 — rodeiam MUITOS DIAS o monte Seir.
      b(1, { by: "moises", q: "rodeamos o monte Seir", props: DESERTO,
        env: { terrain: "desert", glory: 0.5, night: 0.16, verdure: 0.16 }, cast: [
        C("multidao", 0, "walk", { dy: 0.5 }),
        C("moises", -170, "walk", { dy: 0.5, facing: 1 }),
      ] }),
      mv(2, "o Senhor me falou"),                                                   // o Senhor fala a Moisés
      mv(3, "virai-vos para o norte"),                                              // basta de rodear; virai para o norte
      // v.4 — passar pelos filhos de ESAÚ (Edom), que os temerão.
      b(4, { by: "moises", q: "os filhos de Esaú", env: { glory: 0.48, night: 0.16 }, cast: [
        C("multidao", -110, "walk", { dy: 0.5, facing: 1 }),
        C("rei", 150, "stand", { dy: 0.5, facing: -1, id: "esau" }),
      ] }),
      mv(5, "a Esaú tenho dado o monte Seir por herança"),                          // Seir é herança de Esaú; não se envolver
      mv(6, "Comprareis deles, por dinheiro, comida"),                             // comprar deles comida e água
      // v.7 — o Senhor te abençoou: 40 anos, nada faltou.
      b(7, { by: "moises", q: "estes quarenta anos o Senhor teu Deus esteve contigo",
        env: { glory: 0.6, night: 0.12, verdure: 0.24 }, cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1, glow: 0.18 }),
        C("multidao", 140, "stand", { dy: 0.6 }),
      ] }),
      mv(8, "passamos o caminho do deserto de Moabe"),                              // passam ao deserto de Moabe
      // v.9 — não molestar MOABE (herança dos filhos de Ló).
      b(9, { by: "moises", q: "Não molestes aos de Moabe", cast: [
        C("moises", -140, "point", { dy: 0.5, facing: 1 }),
        C("rei", 150, "stand", { dy: 0.5, facing: -1, id: "moabe" }),
      ] }),
      // v.10 — nota: os EMINS, gigantes, ali habitaram.
      b(10, { by: "moises", q: "alto como os gigantes", env: { glory: 0.4, night: 0.24 }, cast: [
        C("homem", 140, "stand", { dy: 0.54, facing: -1, id: "emim", scale: 2.2 }),
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      mv(11, "considerados gigantes como os anaquins"),                            // os emins, tidos por gigantes
      mv(12, "os filhos de Esaú os lançaram fora"),                               // Esaú expulsou os horeus de Seir
      // v.13 — passar o ribeiro de ZEREDE.
      b(13, { by: "moises", q: "passai o ribeiro de Zerede", props: [
        ...DESERTO, P("river", 40, 1.3, undefined, 0.78),
      ], env: { glory: 0.5, night: 0.15, verdure: 0.2 }, cast: [
        C("multidao", -30, "walk", { dy: 0.5 }),
      ] }),
      // v.14 — TRINTA E OITO ANOS: a geração de guerra se consome.
      b(14, { by: "moises", q: "foram trinta e oito anos", env: { terrain: "desert", glory: 0.2, night: 0.5, verdure: 0.1 }, cast: [
        C("homem", -90, "lie", { dy: 0.6, id: "morto1" }),
        C("homem", 40, "bow", { dy: 0.54, id: "sobrevivente" }),
        C("mulherComum", 150, "kneel", { dy: 0.5, id: "enlutada" }),
      ] }),
      // v.15 — a MÃO DO SENHOR contra eles, para consumi-los.
      b(15, { by: "moises", q: "a mão do Senhor", env: { glory: 0.16, night: 0.55, storm: 0.12 }, cast: [
        C("homem", -70, "lie", { dy: 0.62, id: "morto1" }),
        C("homem", 80, "lie", { dy: 0.58, id: "morto2" }),
      ] }),
      mv(16, "todos os homens de guerra, pela morte"),                            // consumidos os homens de guerra
      mv(17, "O Senhor me falou"),                                                // o Senhor torna a falar a Moisés
      mv(18, "pelos termos de Moabe"),                                            // hoje passarás por Ar, termos de Moabe
      // v.19 — chegando aos filhos de AMOM: não os molestar.
      b(19, { by: "moises", q: "os filhos de Amom", set: "desert-amom", props: DESERTO,
        env: { terrain: "desert", glory: 0.48, night: 0.16, verdure: 0.16 }, cast: [
        C("moises", -140, "point", { dy: 0.5, facing: 1 }),
        C("rei", 150, "stand", { dy: 0.5, facing: -1, id: "amom" }),
      ] }),
      // v.20 — nota: também terra de GIGANTES (zamzumins).
      b(20, { by: "moises", q: "considerada terra de gigantes", env: { glory: 0.4, night: 0.24 }, cast: [
        C("homem", 140, "stand", { dy: 0.54, facing: -1, id: "zamzumim", scale: 2.2 }),
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      mv(21, "alto, como os gigantes"),                                           // povo grande e alto, que o Senhor destruiu
      mv(22, "destruiu os horeus"),                                              // como fez a Esaú contra os horeus
      mv(23, "destruíram os aveus"),                                             // os caftorins destruíram os aveus
      // v.24 — a ORDEM contra SIOM: passai Arnom, "tenho dado a Siom".
      b(24, { by: "moises", q: "tenho dado a Siom", set: "guerra", props: GUERRA,
        env: { terrain: "desert", glory: 0.44, night: 0.2, verdure: 0.14 }, cast: [
        C("rei", 150, "stand", { dy: 0.48, facing: -1, id: "siom" }),
        C("multidao", -130, "walk", { dy: 0.5, facing: 1 }),
      ] }),
      mv(25, "um terror e um medo de ti"),                                       // terror de Israel sobre os povos
      // v.26 — mensageiros a Siom com PALAVRAS DE PAZ.
      b(26, { by: "moises", q: "com palavras de paz", cast: [
        C("homem", -110, "walk", { dy: 0.5, facing: 1, id: "mensageiro" }),
        C("rei", 150, "stand", { dy: 0.48, facing: -1, id: "siom" }),
      ] }),
      mv(27, "Deixa-me passar pela tua terra"),                                  // só pela estrada, sem desviar
      mv(28, "tão-somente deixa-me passar a pé"),                                // comprar comida e água; só passar
      mv(29, "até que eu passe o Jordão"),                                       // como fizeram Esaú e Moabe
      // v.30 — Siom NÃO OS DEIXA passar; Deus endurece o seu coração.
      b(30, { by: "moises", q: "não nos quis deixar passar por sua terra", env: { glory: 0.36, night: 0.26 }, cast: [
        C("rei", 150, "point", { dy: 0.48, facing: -1, id: "siom" }),
        C("homem", -110, "stand", { dy: 0.5, facing: 1, id: "mensageiro" }),
      ] }),
      mv(31, "tenho começado a dar-te Siom"),                                    // o Senhor entrega Siom nas mãos de Israel
      // v.32 — SIOM sai à peleja em Jaza.
      b(32, { by: "moises", q: "Siom saiu-nos ao encontro", env: { terrain: "desert", glory: 0.34, night: 0.3, storm: 0.12 }, cast: [
        C("rei", 150, "stand", { dy: 0.48, facing: -1, id: "siom" }),
        C("homem", -110, "raise", { dy: 0.5, facing: 1, id: "guerreiro" }),
      ] }),
      // v.33 — o Senhor o ENTREGA: Siom, seus filhos e povo, feridos.
      b(33, { by: "moises", q: "e o ferimos a ele", env: { glory: 0.4, night: 0.22 }, cast: [
        C("rei", 150, "lie", { dy: 0.62, id: "siom" }),
        C("homem", -110, "raise", { dy: 0.5, facing: 1, id: "guerreiro" }),
      ] }),
      // v.34 — TOMAM TODAS as suas cidades.
      b(34, { by: "moises", q: "tomamos todas as suas cidades", env: { glory: 0.42, night: 0.2 }, cast: [
        C("homem", -100, "raise", { dy: 0.5, facing: 1, id: "guerreiro" }),
        C("homem", 90, "stand", { dy: 0.52, facing: -1, id: "guerreiro2" }),
      ] }),
      mv(35, "tomamos por presa o gado"),                                        // por presa, só o gado e o despojo
      mv(36, "o Senhor nosso Deus nos entregou"),                               // nenhuma cidade escapou, de Aroer a Gileade
      mv(37, "à terra dos filhos de Amom não chegastes"),                       // não tocaram na terra de Amom
    ],
  },

  // ------------------------------------------------------------------ Dt 3
  3: {
    start: { terrain: "desert", night: 0.2, glory: 0.44, storm: 0, fire: 0, verdure: 0.14 },
    beats: [
      // v.1 — OGUE, rei de Basã, o GIGANTE, sai à peleja em Edrei (escala grande).
      b(1, { by: "moises", q: "Ogue, rei de Basã, nos saiu ao encontro", set: "basa", props: GUERRA,
        env: { terrain: "desert", glory: 0.38, night: 0.3, storm: 0.12, verdure: 0.12 }, cast: [
        C("rei", 150, "stand", { dy: 0.58, facing: -1, id: "ogue", scale: 2.4 }),
        C("multidao", -130, "walk", { dy: 0.5, facing: 1 }),
      ] }),
      // v.2 — o oráculo: "Não o temas" — voz do céu antes da batalha.
      dv(2, "Não o temas", { env: { glory: 0.62, night: 0.3 } }),
      // v.3 — o Senhor ENTREGA Ogue: nenhum sobrevivente. O gigante caído (sem glow).
      b(3, { by: "moises", q: "não lhe ficou sobrevivente algum", env: { glory: 0.4, night: 0.24 }, cast: [
        C("rei", 150, "lie", { dy: 0.66, id: "ogue", scale: 1.9 }),
        C("homem", -110, "raise", { dy: 0.5, facing: 1, id: "guerreiro" }),
      ] }),
      // v.4 — tomam SESSENTA CIDADES, toda Argobe.
      b(4, { by: "moises", q: "sessenta cidades, toda a região de Argobe", env: { glory: 0.44, night: 0.2 }, cast: [
        C("homem", -100, "raise", { dy: 0.5, facing: 1, id: "guerreiro" }),
        C("homem", 100, "stand", { dy: 0.52, facing: -1, id: "guerreiro2" }),
      ] }),
      // v.5-10 — O QUE FOI TOMADO EM BASÃ, item por item: os muros e ferrolhos,
      // a destruição, a presa, a extensão da terra do Arnom ao Hermom, o monte
      // de três nomes, e as cidades do planalto.
      b(5, { by: "moises", q: "fortificadas com altos muros, portas e ferrolhos", set: "muros-de-basa", props: [
        P("tower", -180, 1.4, undefined, 0.24),
        { ...P("door", -20, 1.15, undefined, 0.5), tag: "portas" },
        P("tower", 165, 1.3, undefined, 0.3),
        P("tent", 300, 0.9, undefined, 0.5),
        P("grass", 60, 0.76, undefined, 0.82),
      ], env: { terrain: "city", glory: 0.42, night: 0.24, storm: 0, verdure: 0.16 }, cast: [
        C("moises", -310, "point", { dy: 0.48, facing: -1 }),
      ] }),
      b(6, { by: "moises", q: "destruindo todas as cidades", set: "basa-destruida", props: [
        P("rock", -215, 1.3, undefined, 0.3),
        P("rock", -30, 1.05, undefined, 0.5),
        P("tower", 165, 1.0, undefined, 0.26),
        { ...P("campfire", 60, 1.0, 0.9, 0.64), tag: "fogo-destruicao" },
        P("grass", 290, 0.72, undefined, 0.84),
      ], env: { terrain: "city", glory: 0.16, night: 0.7, storm: 0.3, fire: 0.7, verdure: 0.06 }, cast: [
        C("moises", -305, "stand", { dy: 0.48, facing: -1 }),
        C("homem", -120, "lie", { dy: 0.72, facing: 1, id: "morto-de-basa" }),
      ] }),
      b(7, { by: "moises", q: "todo o gado, e o despojo das cidades, tomamos para nós por presa", set: "presa-de-basa", props: [
        P("stall", -170, 1.1, undefined, 0.46),
        P("crate", -20, 1.0, undefined, 0.62),
        P("crate", 85, 0.9, undefined, 0.54),
        P("amphora", 190, 0.95, undefined, 0.66),
        P("tower", 300, 0.95, undefined, 0.24),
      ], env: { terrain: "field", glory: 0.5, night: 0.2, storm: 0, fire: 0, verdure: 0.34 }, cast: [
        C("moises", -320, "stand", { dy: 0.48, facing: -1 }),
        C("homem", -290, "walk", { dy: 0.58, facing: -1, id: "guerreiro" }),
      ] }),
      b(8, { by: "moises", q: "desde o rio de Arnom, até ao monte de Hermom", set: "arnom-ao-hermom", props: [
        { ...P("river", -180, 1.35, undefined, 0.7), tag: "jordao" },
        P("rock", 130, 1.75, undefined, 0.18),
        P("rock", 300, 1.15, undefined, 0.34),
        P("palm", -320, 1.0, undefined, 0.14),
        P("grass", 20, 0.78, undefined, 0.8),
      ], env: { terrain: "field", glory: 0.56, night: 0.14, verdure: 0.4, water: 0.4 }, cast: [
        C("moises", -300, "point", { dy: 0.48, facing: -1 }),
        C("multidao", -60, "walk", { scale: 0.9, dy: 0.56 }),
      ] }),
      b(9, { by: "moises", q: "A Hermom os sidônios chamam Siriom", set: "hermom", props: [ // o monte de três nomes: Hermom, Siriom, Senir
        P("rock", -20, 1.95, undefined, 0.12),
        P("rock", 215, 1.3, undefined, 0.3),
        P("rock", -270, 1.2, undefined, 0.34),
        P("grass", 90, 0.72, undefined, 0.8),
      ], env: { terrain: "mountain", glory: 0.44, night: 0.2, verdure: 0.14, water: 0 } }),
      b(10, { by: "moises", q: "Todas as cidades do planalto", set: "planalto-de-basa", props: [
        P("tower", -250, 1.1, undefined, 0.2),
        P("tower", -90, 1.05, undefined, 0.26),
        P("church", 80, 1.1, undefined, 0.24),
        P("tower", 245, 1.0, undefined, 0.3),
        P("grass", -10, 0.85, undefined, 0.82),
        P("grass", 160, 0.8, undefined, 0.74),
      ], env: { terrain: "city", glory: 0.54, night: 0.14, verdure: 0.5 }, cast: [
        C("moises", -305, "stand", { dy: 0.48, facing: -1 }),
        C("multidao", 150, "stand", { scale: 0.88, dy: 0.56 }),
      ] }),
      // v.11 — SÓ OGUE restou dos gigantes: o LEITO DE FERRO (o ícone do gigante).
      b(11, { by: "moises", q: "um leito de ferro", set: "basa2", props: GUERRA,
        env: { terrain: "field", glory: 0.46, night: 0.16, verdure: 0.16 }, cast: [
        C("rei", 80, "lie", { dy: 0.64, id: "ogue", scale: 2.5 }),
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
      ] }),
      // v.12 — a HERANÇA: aos rubenitas e gaditas, desde Aroer.
      b(12, { by: "moises", q: "tenho dado aos rubenitas e gaditas", set: "moabe", props: MOABE,
        env: { terrain: "field", glory: 0.58, night: 0.12, verdure: 0.42 }, cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1, glow: 0.18 }),
        C("multidao", 140, "stand", { dy: 0.6 }),
      ] }),
      // v.13-17 — A REPARTIÇÃO, herdeiro por herdeiro e marco por marco: a meia
      // tribo de Manassés na terra dos gigantes, Jair em Argobe, Maquir em
      // Gileade, Rúben e Gade entre o Arnom e o Jaboque, e o Jordão por termo.
      b(13, { by: "moises", q: "se chamava a terra dos gigantes", set: "terra-dos-gigantes", props: [
        P("rock", -190, 1.7, undefined, 0.18),
        P("tower", 60, 1.25, undefined, 0.28),
        P("tower", 250, 1.1, undefined, 0.34),
        P("grass", -40, 0.8, undefined, 0.8),
      ], env: { terrain: "field", glory: 0.5, night: 0.18, verdure: 0.42 }, cast: [
        C("moises", -300, "point", { dy: 0.48, facing: -1 }),
        C("multidao", 150, "stand", { scale: 0.9, dy: 0.6 }),
      ] }),
      b(14, { by: "moises", q: "e a chamou de seu nome, Havote-Jair", set: "havote-jair", props: [
        P("tent", -220, 1.15, undefined, 0.3),
        P("tent", -60, 1.05, undefined, 0.42),
        P("tent", 105, 1.0, undefined, 0.36),
        P("tower", 275, 1.05, undefined, 0.24),
        P("grass", 190, 0.8, undefined, 0.78),
      ], env: { terrain: "field", glory: 0.56, night: 0.12, verdure: 0.5 }, cast: [
        C("moises", -310, "stand", { dy: 0.48, facing: -1 }),
        C("homem", 20, "point", { dy: 0.62, facing: -1, id: "jair-filho-de-manasses" }),
      ] }),
      b(15, { by: "moises", q: "E a Maquir dei Gileade", set: "gileade", props: [ // e a MAQUIR, o outeiro fértil de Gileade
        P("tree", -240, 1.3, undefined, 0.2),
        P("tree", 240, 1.2, undefined, 0.26),
        P("rock", 40, 1.4, undefined, 0.3),
        P("well", 300, 0.95, undefined, 0.5),
        P("grass", -80, 0.88, undefined, 0.82),
        P("grass", 120, 0.84, undefined, 0.74),
      ], env: { terrain: "field", glory: 0.6, night: 0.1, verdure: 0.66, water: 0 }, cast: [
        C("moises", -310, "point", { dy: 0.48, facing: -1 }),
        C("homem", -30, "stand", { dy: 0.62, facing: -1, id: "maquir-filho-de-manasses" }),
      ] }),
      b(16, { by: "moises", q: "cujo meio serve de limite", set: "arnom-jaboque", props: [
        { ...P("river", -110, 1.4, undefined, 0.66), tag: "jordao" },
        P("river", 175, 1.15, undefined, 0.84),
        P("rock", 20, 1.15, undefined, 0.38),
        P("tower", 290, 1.0, undefined, 0.24),
        P("grass", -280, 0.8, undefined, 0.8),
      ], env: { terrain: "field", glory: 0.54, night: 0.14, verdure: 0.44, water: 0.45 }, cast: [
        C("moises", -320, "stand", { dy: 0.48, facing: -1 }),
        C("homem", -30, "point", { dy: 0.58, facing: -1, id: "demarcador-de-ruben" }),
      ] }),
      b(17, { by: "moises", q: "desde Quinerete até ao mar da campina, o Mar Salgado", set: "quinerete-ao-mar-salgado", props: [
        { ...P("river", -150, 1.35, undefined, 0.5), tag: "mar-de-quinerete" },
        { ...P("river", 130, 1.45, undefined, 0.8), tag: "mar-salgado" },
        P("rock", 300, 1.25, undefined, 0.28),
        P("palm", -320, 1.05, undefined, 0.14),
        P("grass", -20, 0.8, undefined, 0.72),
      ], env: { terrain: "field", glory: 0.6, night: 0.1, verdure: 0.38, water: 0.6 }, cast: [
        C("moises", -300, "point", { dy: 0.48, facing: -1 }),
        C("multidao", 40, "stand", { scale: 0.88, dy: 0.6 }),
      ] }),
      // v.18 — a ordem: os VALENTES passem ARMADOS diante dos irmãos.
      b(18, { by: "moises", q: "todos os homens valentes", env: { glory: 0.56, night: 0.12 }, cast: [
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("homem", 60, "raise", { dy: 0.5, facing: -1, id: "valente1" }),
        C("homem", 150, "stand", { dy: 0.52, facing: -1, id: "valente2" }),
      ] }),
      mv(19, "ficarão nas vossas cidades"),                                      // mulheres, crianças e gado ficam
      mv(20, "Até que o Senhor dê descanso a vossos irmãos"),                    // até dar descanso; depois voltam à herança
      // v.21 — JOSUÉ encorajado: viu o que Deus fez aos dois reis.
      b(21, { by: "moises", q: "dei ordem a Josué", cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1 }),
        C("servo", 120, "stand", { dy: 0.5, facing: -1, id: "josue", glow: 0.2 }),
      ] }),
      // v.22 — "não temais, o Senhor peleja por vós".
      b(22, { by: "moises", q: "o que peleja por vós", env: { glory: 0.6 }, cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1, glow: 0.15 }),
        C("servo", 120, "stand", { dy: 0.5, facing: -1, id: "josue", glow: 0.2 }),
      ] }),
      // v.23 — Moisés PEDE GRAÇA ao Senhor.
      b(23, { by: "moises", q: "eu pedi graça ao Senhor", env: { glory: 0.55, night: 0.16 }, cast: [
        C("moises", 0, "kneel", { dy: 0.52, facing: 1, glow: 0.2 }),
      ] }),
      mv(24, "a tua grandeza e a tua forte mão"),                               // exalta a grandeza do Senhor
      // v.25 — "deixa-me passar, para ver a boa terra e a boa montanha".
      b(25, { by: "moises", q: "me deixes passar, para que veja esta boa terra", set: "pisga", props: PISGA,
        env: { terrain: "field", glory: 0.5, night: 0.16, verdure: 0.36 }, cast: [
        C("moises", -40, "raise", { dy: 0.46, facing: 1, glow: 0.2 }),
      ] }),
      // v.26 — o Senhor se INDIGNA: "não me fales mais deste assunto".
      b(26, { by: "moises", q: "não me fales mais deste assunto", env: { glory: 0.34, night: 0.28 }, cast: [
        C("moises", -20, "bow", { dy: 0.52, facing: 1 }),
      ] }),
      // v.27 — SOBE AO CUME DO PISGA e vê a terra; não passará o Jordão. ÍCONE solene.
      b(27, { by: "moises", q: "Sobe ao cume de Pisga", env: { terrain: "mountain", glory: 0.4, night: 0.28, verdure: 0.16 }, cast: [
        C("moises", -30, "point", { dy: 0.36, facing: 1, glow: 0.25 }),
      ] }),
      // v.28 — anima e fortalece JOSUÉ, que passará adiante.
      b(28, { by: "moises", q: "anima-o, e fortalece-o", set: "moabe2", props: MOABE,
        env: { terrain: "field", glory: 0.56, night: 0.12, verdure: 0.4 }, cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1, glow: 0.18 }),
        C("servo", 120, "stand", { dy: 0.5, facing: -1, id: "josue", glow: 0.2 }),
      ] }),
      // v.29 — ficam no VALE defronte de Bete-Peor.
      b(29, { by: "moises", q: "defronte de Bete-Peor", env: { glory: 0.5, night: 0.14, verdure: 0.38 }, cast: [
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
        C("multidao", 140, "stand", { dy: 0.6 }),
      ] }),
    ],
  },
};
