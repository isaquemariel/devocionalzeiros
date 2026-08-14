// ============================================================================
// LEVÍTICO 25–26 — CENA VIVA. O ano sabático e o JUBILEU; bênçãos e maldições.
//
// Lev 25 — O DESCANSO DA TERRA e o JUBILEU: de sete em sete anos a terra
// descansa; e ao quinquagésimo ano soa a TROMBETA e se apregoa LIBERDADE na
// terra — as dívidas perdoadas, as posses restituídas, os servos livres.
// "A terra é minha; pois vós sois estrangeiros e peregrinos comigo" (v.23).
//
// Lev 26 — BÊNÇÃOS E MALDIÇÕES (as sanções da aliança): se andarem nos estatutos,
// chuva, fartura, paz, e — o ápice — "porei o meu tabernáculo no meio de vós…
// andarei no meio de vós, e eu vos serei por Deus" (v.11-12). Se não ouvirem,
// terror, seca, espada e exílio. Mas, se confessarem, Deus se lembra da aliança
// com Abraão, Isaque e Jacó, e não os rejeita de todo (v.42-45): a misericórdia
// tem a última palavra.
//
// A VOZ DE DEUS (regra do projeto): tudo é instrução do alto (`by: "deus"`).
// Env conta a aliança: o verde da bênção (verdure alta) → a seca e a tempestade
// da maldição (storm, night) → e a glória da misericórdia no fim.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const dv = (v: number) => b(v, { by: "deus" });

const CAMPO: StagePropSpec[] = [
  { ...P("tent", -40, 1.3, undefined, 0.12), tag: "tabernaculo" },
  P("tree", -250, 1.15, undefined, 0.12),
  P("tree", 240, 1.0, undefined, 0.16),
  P("well", 300, 1.0, undefined, 0.5),
  P("bush", 130, 0.85, undefined, 0.36),
  P("grass", -60, 0.85, undefined, 0.82),
  P("grass", 60, 0.8, undefined, 0.74),
];
const JUBILEU: StagePropSpec[] = [
  { ...P("tent", -40, 1.3, undefined, 0.12), tag: "tabernaculo" },
  P("trumpet", -110, 1.15, undefined, 0.4),
  P("tree", -250, 1.15, undefined, 0.12),
  P("palm", 250, 1.0, undefined, 0.14),
  P("sheaf", 150, 1.0, undefined, 0.46),
  P("grass", -60, 0.85, undefined, 0.82),
  P("grass", 60, 0.8, undefined, 0.74),
];
// ---------------------------------------------------------------------------
// LEV 25 — CADA CASO É UMA CENA. O capítulo não é lista: é um desfile de
// situações concretas (a terra em pousio, a venda entre irmãos, a casa da
// cidade murada, o campo do levita, o irmão acolhido, o vendido ao estrangeiro
// e o parente que o resgata). Cada bloco troca cenário e figuras.
//
// A TERRA EM POUSIO (Lv 25:11-12): o ano em que não se semeia nem se vindima —
// a vinha por colher, o campo entregue ao que nasce de si mesmo.
const POUSIO: StagePropSpec[] = [
  P("tree", -250, 1.15, undefined, 0.12),
  P("grapes", -120, 1.05, undefined, 0.42),
  P("grapes", 130, 0.95, undefined, 0.48),
  P("bush", 40, 0.9, undefined, 0.36),
  P("well", 300, 1.0, undefined, 0.5),
  P("grass", -60, 0.9, undefined, 0.82),
  P("grass", 60, 0.85, undefined, 0.74),
];
// A VENDA ENTRE IRMÃOS (Lv 25:14-17): o preço contado pelo número das colheitas
// que faltam até o jubileu — negócio sob o temor de Deus.
const MERCADO: StagePropSpec[] = [
  P("stall", 0, 1.15, undefined, 0.46),
  P("tent", -250, 1.05, undefined, 0.18),
  P("tent", 250, 1.0, undefined, 0.2),
  P("crate", -110, 0.8, undefined, 0.62),
  P("amphora", 110, 0.8, undefined, 0.62),
  P("palm", -320, 1.0, undefined, 0.14),
  P("grass", -60, 0.82, undefined, 0.82),
];
// A FARTURA PROMETIDA (Lv 25:19,21): "a terra dará o seu fruto, e comereis a
// fartar" — e a bênção do sexto ano que dá fruto por três anos.
const FARTURA: StagePropSpec[] = [
  P("sheaf", -140, 1.15, undefined, 0.42),
  P("sheaf", -60, 1.05, undefined, 0.5),
  P("sheaf", 60, 1.05, undefined, 0.5),
  P("sheaf", 140, 1.15, undefined, 0.42),
  P("grapes", 230, 1.0, undefined, 0.4),
  P("tree", -260, 1.15, undefined, 0.12),
  P("well", 310, 1.0, undefined, 0.5),
  P("grass", -20, 0.85, undefined, 0.84),
];
// O CELEIRO (Lv 25:22): a colheita velha guardada até vir a nova.
const CELEIRO: StagePropSpec[] = [
  P("crate", -160, 0.95, undefined, 0.56),
  P("crate", -80, 0.9, undefined, 0.62),
  P("crate", 80, 0.9, undefined, 0.62),
  P("amphora", 160, 0.9, undefined, 0.58),
  P("sheaf", 230, 1.05, undefined, 0.44),
  P("tent", -280, 1.1, undefined, 0.16),
  P("tree", 300, 1.0, undefined, 0.14),
  P("grass", 0, 0.8, undefined, 0.86),
];
// O CAMPO COM OS SEUS MARCOS (Lv 25:24-28): a herança vendida, o limite de
// pedra, e o resgate que a lei manda dar à terra.
const CAMPO_MARCOS: StagePropSpec[] = [
  P("rock", -180, 0.9, undefined, 0.56),
  P("rock", 180, 0.9, undefined, 0.56),
  P("sheaf", -80, 1.0, undefined, 0.46),
  P("tree", -280, 1.15, undefined, 0.12),
  P("tent", 270, 1.0, undefined, 0.2),
  P("bush", 90, 0.85, undefined, 0.4),
  P("grass", 20, 0.85, undefined, 0.84),
];
// A TROMBETA DO JUBILEU sobre o arraial: o ano em que tudo sai livre.
const JUBILEU_TROMBETA: StagePropSpec[] = [
  P("trumpet", -110, 1.2, undefined, 0.4),
  P("tent", -280, 1.1, undefined, 0.16),
  P("tent", 250, 1.05, undefined, 0.2),
  P("palm", 120, 1.05, undefined, 0.16),
  P("sheaf", 190, 1.0, undefined, 0.46),
  P("grass", -50, 0.85, undefined, 0.84),
  P("grass", 60, 0.8, undefined, 0.76),
];
// A CASA NA CIDADE MURADA (Lv 25:29-30): a única posse que, passado o ano do
// resgate, fica em perpetuidade e NÃO sai no jubileu.
const CIDADE_MURADA: StagePropSpec[] = [
  P("door", 0, 1.2, undefined, 0.44),
  P("tower", -220, 1.3, undefined, 0.08),
  P("tower", -120, 1.1, undefined, 0.2),
  P("tower", 130, 1.15, undefined, 0.18),
  P("tower", 240, 1.25, undefined, 0.1),
  P("crate", -70, 0.75, undefined, 0.66),
  P("amphora", 80, 0.75, undefined, 0.66),
];
// A ALDEIA SEM MURO (Lv 25:31): estimada como o campo da terra — tem resgate e
// sai no jubileu.
const ALDEIA: StagePropSpec[] = [
  P("tent", -230, 1.15, undefined, 0.16),
  P("tent", -120, 1.0, undefined, 0.26),
  P("tent", 140, 1.05, undefined, 0.24),
  P("tent", 260, 1.15, undefined, 0.16),
  P("well", 0, 1.05, undefined, 0.5),
  P("tree", 320, 1.0, undefined, 0.14),
  P("grass", -60, 0.85, undefined, 0.84),
];
// AS CIDADES DOS LEVITAS (Lv 25:32-33): quem não recebeu herança na terra tem
// direito perpétuo de resgate sobre as casas da sua possessão.
const CIDADE_LEVITAS: StagePropSpec[] = [
  { ...P("tent", -30, 1.4, undefined, 0.1), tag: "tabernaculo" },
  P("tower", -250, 1.2, undefined, 0.1),
  P("tower", -150, 1.05, undefined, 0.22),
  P("tower", 180, 1.1, undefined, 0.2),
  P("tower", 290, 1.2, undefined, 0.1),
  P("crate", -120, 0.75, undefined, 0.64),
  P("grass", 40, 0.82, undefined, 0.84),
];
// O CAMPO DO ARRABALDE (Lv 25:34): o pasto ao redor das cidades levíticas, que
// não se vende, porque lhes é possessão perpétua.
const CAMPO_LEVITAS: StagePropSpec[] = [
  P("tower", -290, 1.15, undefined, 0.12),
  P("tower", -190, 1.0, undefined, 0.24),
  P("well", 20, 1.0, undefined, 0.52),
  P("tree", 280, 1.1, undefined, 0.14),
  P("bush", 140, 0.9, undefined, 0.38),
  P("grass", -40, 0.9, undefined, 0.84),
  P("grass", 80, 0.85, undefined, 0.76),
];
// A CASA QUE ACOLHE (Lv 25:35-38): o irmão decaído sustentado como estrangeiro
// e peregrino, sem juros e sem usura.
const CASA_ACOLHIDA: StagePropSpec[] = [
  P("tent", -60, 1.35, undefined, 0.14),
  P("crate", 60, 0.9, undefined, 0.6),
  P("amphora", 130, 0.85, undefined, 0.62),
  P("well", 250, 1.0, undefined, 0.5),
  P("palm", -300, 1.05, undefined, 0.14),
  P("bush", -170, 0.85, undefined, 0.4),
  P("grass", 0, 0.82, undefined, 0.86),
];
// A CASA ONDE ELE SERVE (Lv 25:39-46): não como escravo, mas como diarista, até
// que a trombeta o solte.
const CASA_SERVICO: StagePropSpec[] = [
  P("stall", 120, 1.1, undefined, 0.46),
  P("tent", -220, 1.2, undefined, 0.14),
  P("crate", -80, 0.85, undefined, 0.62),
  P("crate", 0, 0.8, undefined, 0.66),
  P("amphora", 230, 0.85, undefined, 0.6),
  P("palm", 310, 1.0, undefined, 0.14),
  P("grass", -140, 0.82, undefined, 0.84),
];
// A CASA DO ESTRANGEIRO ENRIQUECIDO (Lv 25:47-53): ali o irmão se vendeu — e
// dali o parente o há de tirar.
const CASA_ESTRANGEIRO: StagePropSpec[] = [
  P("tower", -260, 1.2, undefined, 0.1),
  P("stall", -60, 1.15, undefined, 0.46),
  P("tent", 190, 1.1, undefined, 0.2),
  P("crate", 60, 0.85, undefined, 0.62),
  P("amphora", 130, 0.85, undefined, 0.64),
  P("amphora", 270, 0.8, undefined, 0.6),
  P("grass", -150, 0.82, undefined, 0.84),
];
// A VOLTA À POSSESSÃO DOS PAIS (Lv 25:13,41,54): a casa da família recobrada.
const VOLTA_POSSESSAO: StagePropSpec[] = [
  P("tent", -200, 1.25, undefined, 0.14),
  P("tent", -80, 1.05, undefined, 0.26),
  P("sheaf", 90, 1.05, undefined, 0.46),
  P("tree", 200, 1.15, undefined, 0.12),
  P("well", 300, 1.0, undefined, 0.5),
  P("grass", -20, 0.85, undefined, 0.84),
  P("grass", 130, 0.8, undefined, 0.76),
];

// A DESOLAÇÃO da maldição (Lev 26:19-33): "o vosso céu como ferro e a terra
// como cobre" — o céu carregado de nuvens de tempestade, a terra seca e
// rachada, as árvores murchas, as pedras expostas. Sem glória, só juízo.
const DESOLACAO: StagePropSpec[] = [
  { kind: "clouds", dx: 0, dy: 0.62, scale: 2.0, sky: true },
  { kind: "clouds", dx: -200, dy: 0.74, scale: 1.4, sky: true },
  { kind: "clouds", dx: 210, dy: 0.7, scale: 1.35, sky: true },
  P("tent", 240, 0.7, undefined, 0.22),
  P("tree", -250, 0.85, undefined, 0.14),
  P("rock", -300, 1.15, undefined, 0.44),
  P("rock", 300, 1.05, undefined, 0.5),
  P("rock", 60, 0.75, undefined, 0.7),
  P("rock", -60, 0.6, undefined, 0.6),
  P("bush", 120, 0.55, undefined, 0.4),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Lev 25
  25: {
    start: { terrain: "field", night: 0.1, glory: 0.66, storm: 0, fire: 0, verdure: 0.55 },
    beats: [
      b(1, { by: "deus", props: CAMPO, env: { terrain: "field", glory: 0.68, night: 0.1, verdure: 0.55 }, cast: [ // o Senhor fala a Moisés no monte Sinai
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      dv(2), dv(3), dv(4), dv(5), dv(6), dv(7),                                   // o ano sabático: a terra descansa ao sétimo ano
      b(8, { by: "deus", cast: [ C("moises", -150, "kneel", { dy: 0.5, facing: 1 }) ] }), // sete semanas de anos: quarenta e nove anos
      b(9, { by: "deus", q: "a trombeta do jubileu", set: "jubileu", props: JUBILEU, env: { terrain: "field", glory: 0.82, verdure: 0.6 }, cast: [ // soa a TROMBETA do jubileu no dia da expiação
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 130, "raise", { dy: 0.46 }),
      ] }),
      b(10, { by: "deus", q: "apregoareis liberdade na terra", env: { glory: 0.9, verdure: 0.7 }, cast: [ // santificareis o ano; APREGOAREIS LIBERDADE na terra
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "raise", { dy: 0.46 }),
        C("homem", 40, "raise", { dy: 0.52, facing: -1, id: "livre" }),
      ] }),
      dv(11), dv(12), dv(13), dv(14), dv(15), dv(16), dv(17), dv(18), dv(19), dv(20), dv(21), dv(22),
      b(23, { by: "deus", q: "a terra é minha", set: "campo", props: CAMPO, env: { terrain: "field", glory: 0.8, verdure: 0.55 }, cast: [ // "a terra é minha; sois estrangeiros e peregrinos comigo"
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      dv(24), dv(25), dv(26), dv(27), dv(28), dv(29), dv(30), dv(31), dv(32), dv(33), dv(34),
      dv(35), dv(36), dv(37), dv(38), dv(39), dv(40), dv(41), dv(42), dv(43), dv(44),
      dv(45), dv(46), dv(47), dv(48), dv(49), dv(50), dv(51), dv(52), dv(53), dv(54),
      b(55, { by: "deus", q: "meus servos são eles", env: { glory: 0.82 }, cast: [ // "os filhos de Israel me são servos… que tirei do Egito"
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "stand", { dy: 0.46 }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Lev 26
  // A aliança em bênção e maldição. Arco de env: o verde da bênção (v.3-13,
  // verdure 0.8, glória alta) → a seca e a tempestade da maldição (v.14-39,
  // storm alto, night, verdure ~0) → a misericórdia que lembra a aliança
  // (v.40-45, glória volta).
  26: {
    start: { terrain: "field", night: 0.1, glory: 0.7, storm: 0, fire: 0, verdure: 0.5 },
    beats: [
      b(1, { by: "deus", props: CAMPO, env: { terrain: "field", glory: 0.72, night: 0.1, verdure: 0.5 }, cast: [ // não fareis ídolos nem imagem de escultura
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "stand", { dy: 0.46 }),
      ] }),
      b(2, { by: "deus", q: "reverenciareis o meu santuário" }),                  // guardai os sábados e reverenciai o santuário
      // v.3-13 — AS BÊNÇÃOS.
      b(3, { by: "deus", q: "Se andardes nos meus estatutos", env: { glory: 0.78, verdure: 0.65 } }), // "se andardes nos meus estatutos…"
      b(4, { by: "deus", q: "as chuvas a seu tempo", env: { verdure: 0.78 }, cast: [ // "darei as vossas chuvas a seu tempo; a terra dará o fruto"
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      b(5, { by: "deus", env: { verdure: 0.85 } }),                              // a debulha alcançará a vindima; comereis o pão a fartar
      b(6, { by: "deus", q: "darei paz na terra", env: { glory: 0.82, verdure: 0.82 } }), // "darei paz na terra; dormireis sem susto"
      dv(7), dv(8), dv(9), dv(10),
      b(11, { by: "deus", q: "porei o meu tabernáculo no meio de vós", env: { glory: 0.9, verdure: 0.8 }, cast: [ // "POREI O MEU TABERNÁCULO NO MEIO DE VÓS"
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "stand", { dy: 0.46 }),
      ] }),
      b(12, { by: "deus", q: "andarei no meio de vós", env: { glory: 0.95, verdure: 0.82 }, cast: [ // "ANDAREI NO MEIO DE VÓS, e vos serei por Deus"
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "bow", { dy: 0.46 }),
      ] }),
      b(13, { by: "deus", q: "vos fiz andar eretos", env: { glory: 0.9 } }), // "eu vos tirei do Egito, e vos fiz andar de cabeça erguida"
      // v.14-39 — AS MALDIÇÕES (a terra escurece, seca e assola-se).
      b(14, { by: "deus", q: "se não me ouvirdes", set: "desolacao", props: DESOLACAO, env: { terrain: "desert", glory: 0.15, storm: 0.35, verdure: 0.2, night: 0.34 }, cast: [ // "mas, se não me ouvirdes…"
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(15, { by: "deus", env: { storm: 0.42, verdure: 0.12, night: 0.4, glory: 0.1 } }), // se rejeitardes os estatutos e quebrardes a aliança
      b(16, { by: "deus", q: "porei sobre vós terror", env: { storm: 0.5, night: 0.46, verdure: 0.08, glory: 0.08 } }), // porei terror, tísica e febre; semeareis em vão
      dv(17),
      b(18, { by: "deus", env: { storm: 0.55, night: 0.5, glory: 0.05 } }),      // se ainda não ouvirdes, castigar-vos-ei sete vezes mais
      b(19, { by: "deus", q: "sejam como ferro", props: DESOLACAO, env: { terrain: "desert", storm: 0.62, night: 0.52, verdure: 0.03, glory: 0 } }), // farei o vosso céu como ferro e a terra como bronze
      dv(20), dv(21),
      b(22, { by: "deus", env: { storm: 0.66, night: 0.56 } }),                  // enviarei feras que vos desfilharão
      dv(23),
      b(24, { by: "deus", env: { storm: 0.7, night: 0.58 } }),                   // andarei contra vós, e vos ferirei sete vezes
      b(25, { by: "deus", q: "a espada", env: { storm: 0.78, night: 0.62 } }),   // trarei sobre vós a espada vingadora da aliança
      dv(26), dv(27), dv(28), dv(29), dv(30),
      b(31, { by: "deus", q: "assolarei os vossos santuários", env: { storm: 0.82, night: 0.66, verdure: 0.02 } }), // porei as vossas cidades e santuários em assolação
      dv(32),
      b(33, { by: "deus", q: "espalhar-vos-ei entre as nações", env: { storm: 0.85, night: 0.7 }, cast: [ // vos espalharei entre as nações; a terra ficará assolada
        C("multidao", -180, "walk", { dy: 0.46 }),
      ] }),
      dv(34), dv(35), dv(36), dv(37), dv(38), dv(39),
      // v.40-45 — A MISERICÓRDIA.
      b(40, { by: "deus", q: "confessarão a sua iniqüidade", set: "campo", props: CAMPO, env: { terrain: "field", storm: 0.25, night: 0.3, glory: 0.4, verdure: 0.3 }, cast: [ // se CONFESSAREM a sua iniquidade e a de seus pais
        C("multidao", 120, "bow", { dy: 0.46 }),
      ] }),
      dv(41),
      b(42, { by: "deus", q: "me lembrarei da minha aliança com Jacó", env: { storm: 0, glory: 0.7, verdure: 0.45 } }), // "lembrar-me-ei da minha aliança com Jacó, Isaque e Abraão"
      dv(43),
      b(44, { by: "deus", q: "não os rejeitarei", env: { glory: 0.82, verdure: 0.55 } }), // ainda na terra dos inimigos, não os rejeitarei de todo
      b(45, { by: "deus", q: "me lembrarei da aliança com os seus antepassados", env: { glory: 0.85 } }), // lembrar-me-ei da aliança dos seus antepassados
      b(46, { by: "deus", q: "no monte Sinai", env: { glory: 0.8 }, cast: [        // estes são os estatutos que o Senhor deu no monte Sinai
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
      ] }),
    ],
  },
};
