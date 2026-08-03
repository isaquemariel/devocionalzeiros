// ============================================================================
// GÊNESIS 19–20 — roteiro do modo CENA VIVA (força-tarefa AT, onda 2).
//
// Gn 19 — SODOMA: os dois anjos chegam à tarde, Ló inclina-se à porta; a
// cidade CERCA a casa à noite (tensão com decoro — a multidão pressiona, a
// tempestade cresce, nada é explicitado); o CLARÃO da cegueira; "tira-os
// deste lugar"; a fuga ao amanhecer ("Escapa-te por tua vida"); Zoar;
// ENXOFRE E FOGO sobre a campina; a mulher de Ló vira ESTÁTUA DE SAL (rock
// no corredor de extras — beat icônico); Abraão contempla a fumaça do monte;
// e a caverna das filhas com DECORO MÁXIMO — narração sóbria, figuras
// distantes, o texto fala por si.
//
// Gn 20 — ABIMELEQUE: Sara levada de novo em Gerar; o SONHO de Deus ao rei
// (noite funda + glória fria — DEUS NUNCA É DESENHADO: a voz dele é narração,
// a presença é luz); a confrontação da manhã ("Que nos fizeste?"); a desculpa
// de Abraão; a restituição generosa; Abraão ORA e Deus sara a casa do rei.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------------------
// Gn 19 — SODOMA à noite: torres, comércio adormecido e a PORTA da casa de Ló
// (dx 150 — nela bate o cerco). Corredor de extras dx -100..-190 LIVRE.
const SODOMA: StagePropSpec[] = [
  P("tower", -280, 1.3, undefined, 0.05),   // torre de Sodoma
  P("tower", 250, 1.15, undefined, 0.04),   // segunda torre da cidade
  P("door", 150, 1.1, undefined, 0.2),      // a PORTA da casa de Ló
  P("stall", -300, 1, undefined, 0.3),      // comércio fechado à tarde
  P("well", 320, 1, undefined, 0.14),
  P("amphora", 195, 0.85, undefined, 0.56),
  P("crate", -256, 1, undefined, 0.5),
  P("crate", -240, 0.8, undefined, 0.64),
  P("palm", 60, 0.8, undefined, 0.06),
  P("bush", 288, 0.85, undefined, 0.52),
  P("grass", -60, 0.9, undefined, 0.8),
  P("grass", 120, 1, undefined, 0.74),
  P("grass", -285, 1, undefined, 0.72),
];
// o banquete de Ló: fogo e bolos sem levedura no corredor de extras
const SODOMA_CEIA: StagePropSpec[] = [
  ...SODOMA,
  P("campfire", -170, 0.95, 0.8, 0.4),
  P("bowl", -120, 0.9, undefined, 0.56),
];

// ---------------------------------------------------------------------------
// A CAMPINA do Jordão: Sodoma e Gomorra atrás (direita), Zoar pequena ao longe
// (esquerda) — a fuga corre da direita para a esquerda.
const CAMPINA: StagePropSpec[] = [
  P("tower", 300, 1.25, undefined, 0.03),   // Sodoma atrás
  P("tower", 255, 1.05, undefined, 0.06),   // Gomorra atrás
  P("tower", -300, 0.9, undefined, 0.08),   // Zoar — "não é pequena?"
  P("tree", -60, 1.1, undefined, 0.08),
  P("rock", 90, 0.7, undefined, 0.6),
  P("rock", -240, 0.8, undefined, 0.55),
  P("bush", 200, 0.9, undefined, 0.4),
  P("bush", -270, 0.85, undefined, 0.42),
  P("grass", 40, 1, undefined, 0.8),
  P("grass", 150, 0.95, undefined, 0.72),
  P("grass", -215, 1, undefined, 0.75),
];
// enxofre e fogo: as cidades atrás ARDEM (a destruição vista de longe)
const CAMPINA_FOGO: StagePropSpec[] = CAMPINA.map((p) =>
  p.kind === "tower" && p.dx > 0 ? { ...p, fire: 1 } : p);
// a MULHER DE LÓ: estátua de sal no corredor de extras (beat icônico)
const CAMPINA_SAL: StagePropSpec[] = [
  ...CAMPINA_FOGO,
  P("rock", -130, 0.9, undefined, 0.3),     // a estátua de sal
];

// ---------------------------------------------------------------------------
// O mirante de Abraão: o lugar onde ele estivera diante do SENHOR (Gn 18),
// com o altar da intercessão e as cidades fumegando pequeninas ao longe.
const MIRANTE: StagePropSpec[] = [
  P("altar", -60, 1, undefined, 0.3),       // onde intercedeu pelos dez justos
  P("tower", 300, 0.8, 1, 0.02),            // Sodoma fumegando, distante
  P("tower", 262, 0.7, 1, 0.05),            // Gomorra fumegando, distante
  P("rock", 120, 1.1, undefined, 0.4),
  P("rock", -260, 0.9, undefined, 0.55),
  P("tree", 40, 1.1, undefined, 0.08),
  P("bush", 210, 0.85, undefined, 0.45),
  P("bush", -300, 0.9, undefined, 0.4),
  P("grass", -220, 1, undefined, 0.72),
  P("grass", 90, 0.95, undefined, 0.8),
];

// ---------------------------------------------------------------------------
// A caverna no monte (Gn 19:30–38): boca de pedra à direita, tenda ao lado —
// cenário sóbrio para a narração mais sóbria do capítulo.
const CAVERNA: StagePropSpec[] = [
  P("rock", 120, 1.5, undefined, 0.12),     // a boca da caverna
  P("rock", 185, 1.1, undefined, 0.3),
  P("rock", -280, 0.9, undefined, 0.5),
  P("tent", 280, 1, undefined, 0.1),        // a tenda no monte
  P("tree", -40, 1.05, undefined, 0.07),
  P("bush", 235, 0.85, undefined, 0.55),
  P("bush", -310, 0.85, undefined, 0.42),
  P("grass", 60, 1, undefined, 0.78),
  P("grass", -230, 1, undefined, 0.7),
  P("grass", 160, 0.9, undefined, 0.82),
];
// as noites do vinho: fogo baixo e ânfora no corredor de extras
const CAVERNA_VINHO: StagePropSpec[] = [
  ...CAVERNA,
  P("campfire", -160, 0.9, 0.7, 0.42),
  P("amphora", -115, 0.85, undefined, 0.58), // o vinho
];

// ---------------------------------------------------------------------------
// Gn 20 — o caminho do sul: deserto entre Cades e Sur, Gerar ao longe.
const CAMINHO_SUL: StagePropSpec[] = [
  P("tower", 300, 1.1, undefined, 0.04),    // Gerar adiante
  P("tower", 258, 0.9, undefined, 0.07),
  P("well", -320, 1, undefined, 0.14),
  P("rock", -250, 0.9, undefined, 0.5),
  P("rock", 100, 0.7, undefined, 0.62),
  P("bush", -295, 0.85, undefined, 0.4),
  P("bush", 200, 0.85, undefined, 0.45),
  P("tree", -50, 1.05, undefined, 0.08),
  P("grass", 40, 1, undefined, 0.8),
  P("grass", -220, 0.95, undefined, 0.72),
  P("grass", 150, 0.9, undefined, 0.75),
];

// GERAR — a corte de Abimeleque: palácio, o assento do rei, vida de cidade.
const GERAR: StagePropSpec[] = [
  P("tower", -280, 1.35, undefined, 0.04),  // o palácio de Abimeleque
  P("tower", 268, 1.1, undefined, 0.06),
  P("throne", 220, 1.05, undefined, 0.18),  // o assento do rei de Gerar
  P("stall", -300, 1, undefined, 0.32),
  P("well", 320, 1, undefined, 0.14),
  P("palm", 60, 0.85, undefined, 0.06),
  P("palm", -218, 0.9, undefined, 0.46),
  P("amphora", 178, 0.85, undefined, 0.56),
  P("crate", -262, 1, undefined, 0.62),
  P("bush", 250, 0.85, undefined, 0.48),
  P("grass", -60, 0.9, undefined, 0.8),
  P("grass", 128, 1, undefined, 0.75),
  P("grass", -290, 1, undefined, 0.72),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Gn 19
  // Ló é `homem`; os dois anjos sem id (o balão sai do role); a mulher de Ló
  // é `mulher`; as filhas são `mulherComum` (a menor com id "menor").
  // Arco de env: tarde → noite do cerco (storm) → clarão → alvorada → FOGO →
  // fumaça ao longe → noite da caverna → manhã quieta dos nascimentos.
  19: {
    start: { terrain: "city", night: 0.55, glory: 0 },
    beats: [
      b(1, { cast: [C("anjo", -70, "walk", { glow: 0.5, dy: 0.45 }), C("anjo", -20, "walk", { glow: 0.5, dy: 0.48 }), C("homem", 60, "bow", { dy: 0.52 })], props: SODOMA }), // dois anjos à tarde; Ló inclina-se
      b(2, { by: "homem", q: "E disse: ", cast: [C("anjo", -70, "stand", { glow: 0.5, dy: 0.45 }), C("anjo", -20, "stand", { glow: 0.5, dy: 0.48 }), C("homem", 55, "point", { dy: 0.52, facing: 1 })] }), // entrai em casa de vosso servo
      b(3, { cast: [C("anjo", 60, "stand", { glow: 0.45, dy: 0.5 }), C("anjo", 106, "stand", { glow: 0.45, dy: 0.54 }), C("homem", 10, "stand", { dy: 0.55 })], props: SODOMA_CEIA, env: { night: 0.7 } }), // porfiou; banquete, bolos sem levedura
      b(4, { cast: [C("multidao", -20, "walk", { dy: 0.45, facing: 1 })], props: SODOMA, env: { night: 0.8, storm: 0.25 } }), // Sodoma inteira CERCA a casa
      b(5, { by: "multidao", q: "disseram-lhe: ", cast: [C("multidao", 40, "stand", { dy: 0.45, facing: 1 })], env: { storm: 0.35 } }), // "onde estão os homens?"
      b(6, { cast: [C("multidao", 30, "stand", { dy: 0.45, facing: 1 }), C("homem", 122, "stand", { dy: 0.5, facing: -1 })] }), // Ló sai e fecha a porta
      b(7, { by: "homem", q: "E disse: " }),                                          // "rogo-vos que não façais mal"
      b(8, { by: "homem", env: { night: 0.82, storm: 0.4 } }),                        // a oferta desesperada de Ló
      b(9, { by: "multidao", q: "disseram: ", cast: [C("multidao", 85, "walk", { dy: 0.47, facing: 1 }), C("homem", 128, "stand", { dy: 0.5, facing: -1 })], env: { storm: 0.5 } }), // arremessam-se; querem arrombar a porta
      b(10, { cast: [C("multidao", 60, "stand", { dy: 0.47, facing: 1 }), C("anjo", 122, "point", { glow: 0.85, dy: 0.5, facing: 1 }), C("homem", 160, "walk", { dy: 0.52, facing: 1 })] }), // mãos estendidas puxam Ló para dentro
      b(11, { cast: [C("multidao", 70, "stand", { dy: 0.46 })], env: { glory: 0.5, storm: 0.45 } }), // CLARÃO: feridos de cegueira
      b(12, { by: "anjo", q: "aqueles homens a Ló: ", cast: [C("anjo", -50, "stand", { glow: 0.6, dy: 0.45 }), C("anjo", 4, "point", { glow: 0.6, dy: 0.48 }), C("homem", 66, "stand", { dy: 0.52 })], env: { glory: 0.2, storm: 0.3 } }), // "tens alguém mais aqui? tira-os"
      b(13, { by: "anjo", env: { storm: 0.45, night: 0.85 } }),                       // "vamos destruir este lugar"
      b(14, { by: "homem", q: "e disse: ", cast: [C("homem", -30, "point", { dy: 0.5 }), C("homem", 40, "stand", { id: "genro1", dy: 0.52 }), C("homem", 92, "stand", { id: "genro2", dy: 0.55 })], env: { storm: 0.3 } }), // genros: tido por zombador
      b(15, { by: "anjo", q: "dizendo: ", cast: [C("anjo", -80, "point", { glow: 0.6, dy: 0.44 }), C("anjo", -28, "point", { glow: 0.6, dy: 0.47 }), C("homem", 36, "stand", { dy: 0.52 }), C("mulher", 92, "stand", { dy: 0.53 }), C("mulherComum", 140, "stand", { dy: 0.55 }), C("mulherComum", 180, "stand", { id: "menor", dy: 0.57 })], env: { night: 0.45, glory: 0.15, storm: 0.2 } }), // amanhecer: os anjos apertam com Ló
      b(16, { cast: [C("anjo", -110, "walk", { glow: 0.6, dy: 0.44, facing: -1 }), C("anjo", -62, "walk", { glow: 0.6, dy: 0.47, facing: -1 }), C("homem", -10, "walk", { dy: 0.52, facing: -1 }), C("mulher", 44, "walk", { dy: 0.53, facing: -1 }), C("mulherComum", 92, "walk", { dy: 0.55, facing: -1 }), C("mulherComum", 132, "walk", { id: "menor", dy: 0.57, facing: -1 })], env: { night: 0.35 } }), // pegam-nos pela mão: para fora da cidade
      b(17, { by: "anjo", q: "disse: ", set: "campina", props: CAMPINA, cast: [C("anjo", -90, "point", { glow: 0.7, dy: 0.42, facing: -1 }), C("homem", -20, "stand", { dy: 0.52 }), C("mulher", 36, "stand", { dy: 0.53 }), C("mulherComum", 84, "stand", { dy: 0.55 }), C("mulherComum", 124, "stand", { id: "menor", dy: 0.57 })], env: { night: 0.3, glory: 0.2, storm: 0.15 } }), // "Escapa-te por tua vida; não olhes para trás"
      b(18, { by: "homem", q: "disse-lhe: ", cast: [C("anjo", -90, "stand", { glow: 0.7, dy: 0.42 }), C("homem", -20, "kneel", { dy: 0.52 }), C("mulher", 36, "stand", { dy: 0.53 }), C("mulherComum", 84, "stand", { dy: 0.55 }), C("mulherComum", 124, "stand", { id: "menor", dy: 0.57 })] }), // "Ora, não, meu Senhor!"
      b(19, { by: "homem" }),                                                         // "não posso escapar no monte"
      b(20, { by: "homem" }),                                                         // "aquela cidade é pequena" — Zoar
      b(21, { by: "anjo", q: "disse-lhe: " }),                                        // "tenho-te aceitado neste negócio"
      b(22, { by: "anjo", env: { night: 0.2 } }),                                     // "apressa-te" — chamou-se Zoar
      b(23, { cast: [C("homem", -240, "walk", { dy: 0.5, facing: -1 }), C("mulher", -185, "walk", { dy: 0.52, facing: -1 }), C("mulherComum", -140, "walk", { dy: 0.54, facing: -1 }), C("mulherComum", -100, "walk", { id: "menor", dy: 0.56, facing: -1 })], env: { night: 0, glory: 0.25 } }), // saiu o sol; Ló entra em Zoar
      b(24, { props: CAMPINA_FOGO, env: { fire: 1, storm: 0.6, glory: 0.4, night: 0.15 } }), // ENXOFRE E FOGO desde os céus
      b(25, { env: { fire: 1, storm: 0.85, night: 0.3, glory: 0.2 } }),               // cidades, campina e moradores destruídos
      b(26, { props: CAMPINA_SAL, cast: [C("homem", -260, "walk", { dy: 0.5, facing: -1 }), C("mulherComum", -215, "walk", { dy: 0.54, facing: -1 }), C("mulherComum", -178, "walk", { id: "menor", dy: 0.56, facing: -1 })], env: { fire: 0.9, storm: 0.7, glory: 0.35 } }), // olhou para trás: ESTÁTUA DE SAL
      b(27, { set: "mirante", props: MIRANTE, cast: [C("abraao", -30, "stand", { dy: 0.5 })], env: { night: 0.15, fire: 0.45, storm: 0.35, glory: 0.25 } }), // Abraão madruga ao lugar da intercessão
      b(28, { cast: [C("abraao", -10, "point", { dy: 0.5, facing: 1 })], env: { fire: 0.5, storm: 0.55 } }), // a fumaça sobe como de fornalha
      b(29, { cast: [C("abraao", -20, "kneel", { dy: 0.5 })], env: { glory: 0.5, fire: 0.35, storm: 0.35 } }), // Deus lembrou-se de Abraão
      b(30, { set: "caverna", props: CAVERNA, cast: [C("homem", -10, "stand", { dy: 0.5 }), C("mulherComum", 50, "stand", { dy: 0.53 }), C("mulherComum", 92, "stand", { id: "menor", dy: 0.55 })], env: { night: 0.6, fire: 0, storm: 0, glory: 0 } }), // temia Zoar: a caverna no monte
      b(31, { by: "mulherComum", q: "disse à menor: ", cast: [C("mulherComum", 30, "stand", { dy: 0.52, facing: 1 }), C("mulherComum", 80, "stand", { id: "menor", dy: 0.54, facing: -1 }), C("homem", 200, "stand", { dy: 0.35 })] }), // "nosso pai já é velho…"
      b(32, { by: "mulherComum", env: { night: 0.65 } }),                             // o plano da descendência
      b(33, { props: CAVERNA_VINHO, cast: [C("homem", 195, "lie", { dy: 0.32 }), C("mulherComum", 130, "walk", { dy: 0.34 }), C("mulherComum", -60, "stand", { id: "menor", dy: 0.55 })], env: { night: 0.8 } }), // primeira noite — figuras distantes, decoro
      b(34, { by: "mulherComum", q: "disse à menor: ", cast: [C("mulherComum", 20, "stand", { dy: 0.52, facing: 1 }), C("mulherComum", 70, "stand", { id: "menor", dy: 0.54, facing: -1 }), C("homem", 200, "stand", { dy: 0.35 })], env: { night: 0.3 } }), // no outro dia: "esta noite entra tu"
      b(35, { cast: [C("homem", 195, "lie", { dy: 0.32 }), C("mulherComum", -60, "stand", { dy: 0.55 }), C("mulherComum", 130, "walk", { id: "menor", dy: 0.34 })], env: { night: 0.8 } }), // segunda noite — narração sóbria
      b(36, { props: CAVERNA, cast: [C("homem", 180, "stand", { dy: 0.4 }), C("mulherComum", -30, "stand", { dy: 0.52 }), C("mulherComum", 40, "stand", { id: "menor", dy: 0.54 })], env: { night: 0.45 } }), // conceberam as duas filhas de Ló
      b(37, { cast: [C("mulherComum", -20, "stand", { dy: 0.52 }), C("mulherComum", 60, "stand", { id: "menor", dy: 0.55 }), C("homem", 170, "stand", { dy: 0.4 })], env: { night: 0.2, glory: 0.15 } }), // nasce MOABE, pai dos moabitas
      b(38, { env: { night: 0.1, glory: 0.2 } }),                                     // nasce BEN-AMI, pai dos amonitas
    ],
  },

  // ------------------------------------------------------------------ Gn 20
  // Abimeleque é `rei`. A voz de Deus no SONHO (v.3, 6–7) é narração pura —
  // presença = noite funda + glória fria, NUNCA figura.
  // Arco de env: estrada clara → noite do sonho (glória fria crescendo) →
  // manhã tensa (storm baixa) → restituição → glória da oração que sara.
  20: {
    start: { terrain: "desert", night: 0, glory: 0.1 },
    beats: [
      b(1, { cast: [C("abraao", -70, "walk", { dy: 0.5, facing: 1 }), C("sara", -10, "walk", { dy: 0.52, facing: 1 }), C("servo", 46, "walk", { dy: 0.55, facing: 1 }), C("rebanho", 120, "walk", { dy: 0.42 })], props: CAMINHO_SUL }), // rumo ao sul: peregrino em Gerar
      b(2, { set: "gerar", props: GERAR, cast: [C("rei", 150, "stand", { dy: 0.45 }), C("servo", 90, "walk", { dy: 0.5 }), C("sara", 30, "walk", { dy: 0.52, facing: 1 }), C("abraao", -90, "stand", { dy: 0.55, facing: 1 })], env: { night: 0.1 } }), // "é minha irmã"; Sara é tomada
      b(3, { cast: [C("rei", 10, "lie", { dy: 0.5 })], env: { night: 0.8, glory: 0.55 } }), // o SONHO: "morto serás" — voz sem rosto
      b(4, { by: "rei", q: "por isso disse: ", cast: [C("rei", 0, "kneel", { dy: 0.5 })] }), // "matarás também uma nação justa?"
      b(5, { by: "rei" }),                                                            // "em sinceridade do coração fiz isto"
      b(6, { env: { glory: 0.7 } }),                                                  // Deus: "eu te impedi de pecar"
      b(7, { env: { glory: 0.75, storm: 0.2 } }),                                     // "restitui a mulher… ou morrerás"
      b(8, { cast: [C("rei", -40, "point", { dy: 0.48 }), C("servo", 30, "bow", { dy: 0.53 }), C("multidao", 110, "stand", { dy: 0.44 })], env: { night: 0.1, glory: 0.2, storm: 0.1 } }), // madrugada: os servos temeram muito
      b(9, { by: "rei", q: "disse-lhe: ", cast: [C("rei", -50, "point", { dy: 0.48, facing: 1 }), C("abraao", 40, "stand", { dy: 0.52, facing: -1 })], env: { storm: 0.2 } }), // a confrontação: "Que nos fizeste?"
      b(10, { by: "rei", q: "a Abraão: " }),                                          // "que tens visto, para fazer tal coisa?"
      b(11, { by: "abraao", q: "disse Abraão: ", cast: [C("rei", -50, "stand", { dy: 0.48, facing: 1 }), C("abraao", 40, "stand", { dy: 0.52, facing: -1 })], env: { storm: 0.1 } }), // "não há temor de Deus neste lugar"
      b(12, { by: "abraao" }),                                                        // "é também minha irmã, por parte de pai"
      b(13, { by: "abraao", env: { storm: 0 } }),                                     // errante de casa em casa: "é meu irmão"
      b(14, { cast: [C("rei", -60, "point", { dy: 0.48, facing: 1 }), C("abraao", 30, "stand", { dy: 0.52 }), C("sara", 90, "walk", { dy: 0.53 }), C("servo", 150, "stand", { dy: 0.56 }), C("rebanho", 220, "stand", { dy: 0.42 })], env: { glory: 0.3 } }), // ovelhas, vacas, servos; Sara restituída
      b(15, { by: "rei", q: "disse Abimeleque: " }),                                  // "habita onde for bom aos teus olhos"
      b(16, { by: "rei", q: "a Sara disse: " }),                                      // mil moedas de prata; véu dos olhos
      b(17, { cast: [C("abraao", -20, "raise", { dy: 0.5 }), C("rei", 60, "stand", { dy: 0.5 }), C("sara", 120, "stand", { dy: 0.53 })], env: { glory: 0.6 } }), // Abraão ORA; Deus sara a casa do rei
      b(18, { env: { glory: 0.5 } }),                                                 // o SENHOR fechara as madres, por Sara
    ],
  },
};
