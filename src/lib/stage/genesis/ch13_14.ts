// ============================================================================
// GÊNESIS — CENA VIVA, caps. 13 e 14.
//
// Gn 13 — ABRÃO E LÓ SE SEPARAM: a subida do Egito rico (deserto do sul →
// Betel, o altar de outrora), a CONTENDA dos pastores (night 0.25 de atrito),
// a grandeza de Abrão ("não haja contenda entre mim e ti"), Ló escolhendo a
// campina do Jordão (o rio exuberante de um lado, Sodoma ao fundo — night 0.3
// sobre os "grandes pecadores"), a PROMESSA renovada (voz do SENHOR = narração
// com glory 0.8 — Deus NUNCA é desenhado) e os carvalhais de Manre com o altar.
//
// Gn 14 — A GUERRA DOS REIS E MELQUISEDEQUE: quatro reis contra cinco no vale
// de Sidim (storm 0.3 → 0.6, os poços de betume engolindo os reis), LÓ LEVADO
// cativo (night 0.5), Abrão armando os trezentos e dezoito e a perseguição
// NOTURNA até Hobá (night 0.7), o resgate, o rei de Sodoma no vale de Savé —
// e MELQUISEDEQUE, rei de Salém, com pão e vinho (glow 0.5, glory 0.8:
// "bendito seja o Deus Altíssimo") e a recusa digna de Abrão: "nem um fio
// até à correia de um sapato".
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// O DESERTO DO SUL (Gn 13:1-2): o Neguebe da subida do Egito — pedra, palmeira
// solitária e mato ralo. Corredor de extras dx -100..-190 LIVRE (a riqueza de
// prata e ouro do v.2 entra ali).
const NEGUEBE: StagePropSpec[] = [
  P("rock", -262, 1.0, undefined, 0.3),
  P("rock", -318, 0.75, undefined, 0.58),
  P("rock", 240, 0.85, undefined, 0.62),
  P("palm", 300, 0.95, undefined, 0.12),
  P("bush", 170, 0.85, undefined, 0.5),
  P("bush", -228, 0.8, undefined, 0.64),
  P("grass", -55, 0.85, undefined, 0.85),
  P("grass", 120, 0.8, undefined, 0.78),
];

// BETEL (Gn 13:3-9): o lugar onde "a princípio estivera a sua tenda", entre
// Betel e Ai — as tendas de outrora, campo aberto para dois rebanhos que já
// não cabem. O altar do v.4 entra na vaga de extras (-140).
const BETEL = (altar = false): StagePropSpec[] => [
  P("tent", 228, 1.05, undefined, 0.24),     // a tenda de outrora
  P("tent", 300, 0.9, undefined, 0.4),
  P("tree", -262, 1.05, undefined, 0.1),
  P("rock", -318, 0.8, undefined, 0.55),
  P("rock", 150, 0.65, undefined, 0.7),
  P("bush", -226, 0.85, undefined, 0.5),
  P("bush", 176, 0.9, undefined, 0.3),
  P("grass", -60, 0.95, undefined, 0.85),
  P("grass", 110, 0.9, undefined, 0.78),
  P("grass", 262, 0.85, undefined, 0.68),
  ...(altar ? [P("altar", -140, 1.05, 0.35, 0.22)] : []),
];

// A CAMPINA DO JORDÃO (Gn 13:10-17): "toda bem regada, como o jardim do
// Senhor" — o rio exuberante de um lado e SODOMA ao longe (a torre no
// horizonte). A tenda de Ló (v.12) avança em direção à cidade.
const CAMPINA = (tendaDeLo = false): StagePropSpec[] => [
  P("river", 240, 1.3, undefined, 0.06),     // a campina toda bem regada
  P("tower", 320, 1.05, undefined, 0.1),     // Sodoma ao longe
  P("tree", 150, 1.0, undefined, 0.18),
  P("tree", -270, 1.1, undefined, 0.1),
  P("tent", -320, 0.9, undefined, 0.35),
  P("bush", -230, 0.85, undefined, 0.55),
  P("bush", 200, 0.85, undefined, 0.55),
  P("grass", -60, 0.95, undefined, 0.85),
  P("grass", 90, 0.9, undefined, 0.78),
  P("grass", 280, 0.85, undefined, 0.7),
  ...(tendaDeLo ? [P("tent", 118, 0.85, undefined, 0.3)] : []), // as tendas até Sodoma
];

// OS CARVALHAIS DE MANRE (Gn 13:18 e 14:13-14): os carvalhos grandes junto a
// Hebrom, as tendas do clã — e o altar ao SENHOR na vaga de extras.
const MANRE = (altar = false): StagePropSpec[] => [
  P("tree", -60, 1.4, undefined, 0.06),      // o carvalho grande de Manre
  P("tree", 120, 1.25, undefined, 0.1),
  P("tree", 268, 1.0, undefined, 0.2),
  P("tent", -280, 1.05, undefined, 0.18),
  P("tent", 320, 0.9, undefined, 0.42),
  P("bush", 200, 0.85, undefined, 0.55),
  P("rock", -320, 0.7, undefined, 0.6),
  P("grass", -50, 0.95, undefined, 0.85),
  P("grass", 170, 0.9, undefined, 0.78),
  P("grass", -230, 0.85, undefined, 0.7),
  ...(altar ? [P("altar", -140, 1.05, 0.35, 0.22)] : []),
];

// AS CIDADES DOS REIS (Gn 14:1-2): torres de reinos em guerra — Sinar, Elasar,
// Elão e Goim contra as cidades da campina. Corredor -100..-190 livre.
const REINOS: StagePropSpec[] = [
  P("tower", -280, 1.3, undefined, 0.06),
  P("tower", 262, 1.2, undefined, 0.08),
  P("tower", 320, 0.95, undefined, 0.3),
  P("stall", -300, 0.95, undefined, 0.45),
  P("crate", -230, 0.85, undefined, 0.6),
  P("amphora", 200, 0.85, undefined, 0.55),
  P("palm", 130, 0.85, undefined, 0.15),
  P("grass", -50, 0.9, undefined, 0.85),
  P("grass", 90, 0.85, undefined, 0.78),
];

// O VALE DE SIDIM (Gn 14:3-12): o campo de batalha do Mar Salgado — pedras e
// POÇOS (de betume). O poço em destaque do v.10 entra na vaga de extras.
const SIDIM = (poco = false): StagePropSpec[] => [
  P("well", 220, 0.95, undefined, 0.28),     // poços de betume
  P("well", 304, 0.9, undefined, 0.5),
  P("rock", -300, 1.05, undefined, 0.18),
  P("rock", -242, 0.8, undefined, 0.6),
  P("rock", 130, 0.7, undefined, 0.7),
  P("bush", -320, 0.8, undefined, 0.5),
  P("bush", 168, 0.85, undefined, 0.35),
  P("grass", -60, 0.85, undefined, 0.85),
  P("grass", 80, 0.8, undefined, 0.78),
  ...(poco ? [P("well", -140, 1.0, undefined, 0.22)] : []),   // o poço que engoliu os reis
];

// A NOITE DE HOBÁ (Gn 14:15-16): deserto aberto sob as estrelas — a
// perseguição noturna dos trezentos e dezoito, até à esquerda de Damasco.
const NOITE_HOBA: StagePropSpec[] = [
  P("rock", -290, 1.0, undefined, 0.2),
  P("rock", 250, 0.85, undefined, 0.6),
  P("tree", 310, 0.95, undefined, 0.1),
  P("bush", -230, 0.8, undefined, 0.5),
  P("bush", 150, 0.75, undefined, 0.3),
  P("star", -140, 0.6, undefined, 0.06),     // a noite da perseguição
  P("grass", -50, 0.85, undefined, 0.85),
  P("grass", 80, 0.8, undefined, 0.78),
];

// O VALE DE SAVÉ (Gn 14:17-24): "o vale do rei" — Salém ao longe (a torre da
// cidade de Melquisedeque). O pão e o vinho (bowl) entram na vaga de extras.
const VALE_SAVE = (paoEVinho = false): StagePropSpec[] => [
  P("tower", -280, 1.2, undefined, 0.06),    // Salém ao longe
  P("tree", 250, 1.05, undefined, 0.1),
  P("tree", -320, 0.9, undefined, 0.38),
  P("rock", 310, 0.8, undefined, 0.6),
  P("bush", 180, 0.85, undefined, 0.3),
  P("grass", -40, 0.95, undefined, 0.85),
  P("grass", 120, 0.9, undefined, 0.78),
  P("grass", -220, 0.85, undefined, 0.7),
  ...(paoEVinho ? [P("bowl", -140, 0.95, undefined, 0.24)] : []), // o pão e o vinho
];

export const CHAPTERS: Record<number, StageScript> = {
  // ----------------------------------------------------------------- Gn 13
  // A separação: a subida rica do Egito (desert → field em Betel, o altar de
  // volta), a contenda dos pastores (night 0.25), a grandeza de Abrão, a
  // escolha de Ló (Sodoma ao fundo, night 0.3 sobre os pecadores), a PROMESSA
  // (voz do SENHOR = narração, glory até 0.8) e os carvalhais de Manre.
  13: {
    start: { terrain: "desert", night: 0.1, glory: 0.35, storm: 0 },
    beats: [
      // A SUBIDA DO EGITO (v.1-2) — a caravana rica atravessa o Neguebe
      b(1, { cast: [C("abraao", -20, "walk", { dy: 0.5, glow: 0.3, facing: 1 }), C("sara", 30, "walk", { dy: 0.54, facing: 1 }), C("homem", -80, "walk", { id: "lo", dy: 0.56, facing: 1 }), C("rebanho", -160, "walk", { id: "rebanho-abrao", dy: 0.46, facing: 1 })], props: NEGUEBE }), // subiu do Egito ao sul, com Sarai e Ló
      b(2, { props: [...NEGUEBE, P("crate", -150, 0.9, undefined, 0.3), P("amphora", -118, 0.8, undefined, 0.45)], cast: [C("abraao", -10, "stand", { dy: 0.5, glow: 0.3 }), C("sara", 44, "stand", { dy: 0.54 }), C("homem", -76, "stand", { id: "lo", dy: 0.56 }), C("rebanho", 130, "stand", { id: "rebanho-abrao", dy: 0.46 })] }), // muito rico em gado, prata e ouro
      // DE VOLTA A BETEL (v.3-4) — o lugar da tenda e do altar de outrora
      b(3, { set: "betel", props: BETEL(), cast: [C("abraao", -30, "walk", { dy: 0.5, glow: 0.3, facing: 1 }), C("sara", 20, "walk", { dy: 0.54, facing: 1 }), C("homem", -90, "walk", { id: "lo", dy: 0.56, facing: 1 }), C("rebanho", -170, "walk", { id: "rebanho-abrao", dy: 0.46, facing: 1 })], env: { terrain: "field", night: 0.05, glory: 0.4 } }), // jornadas do sul até Betel e Ai
      b(4, { props: BETEL(true), cast: [C("abraao", -95, "raise", { dy: 0.5, glow: 0.45 }), C("sara", -30, "kneel", { dy: 0.54 }), C("homem", 40, "stand", { id: "lo", dy: 0.56 }), C("rebanho", 150, "stand", { id: "rebanho-abrao", dy: 0.46 })], env: { glory: 0.6 } }), // o altar de outrora; invocou o Senhor
      // A TERRA NÃO OS SUPORTA (v.5-7) — dois rebanhos, uma contenda
      b(5, { cast: [C("abraao", -90, "stand", { dy: 0.52, glow: 0.35 }), C("rebanho", -40, "stand", { id: "rebanho-abrao", dy: 0.46 }), C("homem", 70, "stand", { id: "lo", dy: 0.52 }), C("rebanho", 140, "stand", { id: "rebanho-lo", dy: 0.46 })], env: { glory: 0.45 } }), // também Ló tinha rebanhos, gado e tendas
      b(6, { cast: [C("abraao", -70, "stand", { dy: 0.52, glow: 0.3 }), C("rebanho", -16, "stand", { id: "rebanho-abrao", dy: 0.46 }), C("rebanho", 50, "stand", { id: "rebanho-lo", dy: 0.46 }), C("homem", 116, "stand", { id: "lo", dy: 0.54 })], env: { night: 0.12, glory: 0.35 } }), // a terra não os suportava juntos
      b(7, { cast: [C("pastor", -36, "point", { id: "pastor-abrao", dy: 0.52, facing: 1 }), C("pastor", 36, "point", { id: "pastor-lo", dy: 0.52, facing: -1 }), C("rebanho", -130, "stand", { id: "rebanho-abrao", dy: 0.46 }), C("rebanho", 130, "stand", { id: "rebanho-lo", dy: 0.46 }), C("abraao", -100, "stand", { dy: 0.56, glow: 0.3 })], env: { night: 0.25, storm: 0.12 } }), // contenda entre os pastores do gado
      // A GRANDEZA DE ABRÃO (v.8-9) — "somos irmãos"
      b(8, { by: "abraao", q: "disse Abrão a Ló: ", cast: [C("abraao", -34, "stand", { dy: 0.5, glow: 0.35, facing: 1 }), C("homem", 36, "stand", { id: "lo", dy: 0.52, facing: -1 }), C("pastor", -120, "stand", { id: "pastor-abrao", dy: 0.56 }), C("pastor", 120, "stand", { id: "pastor-lo", dy: 0.56 })], env: { night: 0.12, storm: 0 } }), // "não haja contenda… somos irmãos"
      b(9, { by: "abraao", cast: [C("abraao", -34, "point", { dy: 0.5, glow: 0.4, facing: 1 }), C("homem", 40, "stand", { id: "lo", dy: 0.52, facing: -1 })], env: { glory: 0.5, night: 0.05 } }), // "não está toda a terra diante de ti?"
      // LÓ ESCOLHE O JORDÃO (v.10-13) — o rio de um lado, Sodoma ao fundo
      b(10, { set: "campina", props: CAMPINA(), cast: [C("homem", 30, "point", { id: "lo", dy: 0.5, facing: 1 }), C("abraao", -50, "stand", { dy: 0.52, glow: 0.3 })], env: { glory: 0.45, night: 0.08 } }), // Ló viu a campina toda bem regada
      b(11, { cast: [C("abraao", -90, "stand", { dy: 0.52, glow: 0.3 }), C("homem", 190, "walk", { id: "lo", dy: 0.46, facing: 1 }), C("rebanho", 260, "walk", { id: "rebanho-lo", dy: 0.44, facing: 1 })] }), // Ló partiu para o oriente; apartaram-se
      b(12, { props: CAMPINA(true), cast: [C("abraao", -110, "stand", { dy: 0.54, glow: 0.3 }), C("homem", 254, "stand", { id: "lo", dy: 0.42, facing: 1 })] }), // Abrão em Canaã; tendas até Sodoma
      b(13, { env: { night: 0.3, storm: 0.1, glory: 0.25 } }),                                            // maus os homens de Sodoma, grandes pecadores
      // A PROMESSA RENOVADA (v.14-17) — a voz do SENHOR: luz, nunca figura
      b(14, { cast: [C("abraao", -20, "raise", { dy: 0.5, glow: 0.5 })], env: { glory: 0.55, night: 0.08, storm: 0 } }), // (voz) levanta os teus olhos: norte e sul
      b(15, { env: { glory: 0.68, night: 0 } }),                                                          // (voz) toda esta terra te darei, para sempre
      b(16, { env: { glory: 0.8 } }),                                                                     // (voz) descendência como o pó da terra
      b(17, { cast: [C("abraao", 60, "walk", { dy: 0.52, glow: 0.5, facing: 1 })] }),                     // (voz) levanta-te, percorre essa terra
      // OS CARVALHAIS DE MANRE (v.18) — a tenda mudada e o novo altar
      b(18, { set: "manre", props: MANRE(true), cast: [C("abraao", -95, "raise", { dy: 0.5, glow: 0.45 }), C("sara", -20, "stand", { dy: 0.54 }), C("rebanho", 80, "stand", { id: "rebanho-abrao", dy: 0.46 })], env: { glory: 0.5, night: 0.05 } }), // Manre, junto a Hebrom; altar ao Senhor
    ],
  },

  // ----------------------------------------------------------------- Gn 14
  // A guerra dos reis: quatro contra cinco no vale de Sidim (storm até 0.6,
  // os poços de betume), Ló levado (night 0.5), os trezentos e dezoito na
  // perseguição noturna (night 0.7), o resgate — e Melquisedeque com pão e
  // vinho (glory 0.8) antes da recusa digna: "nem um fio até à correia".
  14: {
    start: { terrain: "city", night: 0.15, glory: 0.1, storm: 0.3 },
    beats: [
      // OS REIS DO ORIENTE (v.1-2) — a guerra é declarada
      b(1, { cast: [C("rei", -46, "stand", { id: "rei-elao", dy: 0.46 }), C("rei", 34, "stand", { id: "rei-sinar", dy: 0.5 }), C("multidao", 150, "stand", { id: "exercito-4", dy: 0.44 })], props: REINOS }), // Anrafel, Arioque, Quedorlaomer e Tidal
      b(2, { cast: [C("rei", -70, "point", { id: "rei-elao", dy: 0.46, facing: 1 }), C("rei", -20, "stand", { id: "rei-sinar", dy: 0.5, facing: 1 }), C("rei", 70, "stand", { id: "rei-sodoma", dy: 0.46, facing: -1 }), C("rei", 124, "stand", { id: "rei-gomorra", dy: 0.52, facing: -1 }), C("multidao", -190, "stand", { id: "exercito-4", dy: 0.44 })], env: { storm: 0.35 } }), // guerra a Bera, Birsa, Sinabe e Semeber
      // O VALE DE SIDIM (v.3-7) — a rebelião e a marcha de Quedorlaomer
      b(3, { set: "sidim", props: SIDIM(), cast: [C("rei", -40, "stand", { id: "rei-sodoma", dy: 0.46 }), C("rei", 26, "stand", { id: "rei-gomorra", dy: 0.5 }), C("multidao", 130, "stand", { id: "exercito-5", dy: 0.44 })], env: { terrain: "desert", night: 0.2, storm: 0.35 } }), // ajuntaram-se no vale de Sidim
      b(4, { env: { night: 0.3, storm: 0.4 } }),                                                          // doze anos serviram; então rebelaram-se
      b(5, { cast: [C("rei", -170, "walk", { id: "rei-elao", dy: 0.46, facing: 1 }), C("multidao", -250, "walk", { id: "exercito-4", dy: 0.44, facing: 1 }), C("rei", 60, "stand", { id: "rei-sodoma", dy: 0.48, facing: -1 }), C("multidao", 150, "stand", { id: "exercito-5", dy: 0.44 })], env: { storm: 0.5 } }), // veio Quedorlaomer: refains, zuzins, emins
      b(6, { cast: [C("rei", -110, "walk", { id: "rei-elao", dy: 0.46, facing: 1 }), C("multidao", -200, "walk", { id: "exercito-4", dy: 0.44, facing: 1 }), C("rei", 60, "stand", { id: "rei-sodoma", dy: 0.48, facing: -1 }), C("multidao", 150, "stand", { id: "exercito-5", dy: 0.44 })], env: { storm: 0.52, night: 0.32 } }), // e aos horeus, até junto ao deserto
      b(7, { cast: [C("rei", -60, "point", { id: "rei-elao", dy: 0.46, facing: 1 }), C("multidao", -160, "walk", { id: "exercito-4", dy: 0.44, facing: 1 }), C("rei", 70, "stand", { id: "rei-sodoma", dy: 0.48, facing: -1 }), C("multidao", 160, "stand", { id: "exercito-5", dy: 0.44 })], env: { storm: 0.55 } }), // tornaram a Cades: amalequitas e amorreus
      // QUATRO CONTRA CINCO (v.8-11) — a batalha e os poços de betume
      b(8, { cast: [C("rei", 50, "point", { id: "rei-sodoma", dy: 0.46, facing: -1 }), C("rei", 110, "stand", { id: "rei-gomorra", dy: 0.5, facing: -1 }), C("multidao", 190, "stand", { id: "exercito-5", dy: 0.44 }), C("rei", -60, "point", { id: "rei-elao", dy: 0.46, facing: 1 }), C("multidao", -160, "stand", { id: "exercito-4", dy: 0.44 })], env: { storm: 0.55, night: 0.3 } }), // ordenaram batalha no vale de Sidim
      b(9, { env: { storm: 0.6 } }),                                                                      // quatro reis contra cinco
      b(10, { props: SIDIM(true), cast: [C("rei", -30, "lie", { id: "rei-sodoma", dy: 0.56 }), C("rei", 36, "lie", { id: "rei-gomorra", dy: 0.6 }), C("multidao", 240, "walk", { id: "exercito-5", dy: 0.44, facing: 1 }), C("rei", -110, "stand", { id: "rei-elao", dy: 0.46, facing: 1 })], env: { night: 0.35, storm: 0.6 } }), // poços de betume: caíram ali; fugiram
      b(11, { cast: [C("rei", -150, "walk", { id: "rei-elao", dy: 0.46, facing: -1 }), C("multidao", -240, "walk", { id: "exercito-4", dy: 0.44, facing: -1 })], env: { night: 0.4, storm: 0.5 } }), // tomaram os bens e o mantimento
      // LÓ É LEVADO (v.12) — o sobrinho cativo entre os despojos
      b(12, { cast: [C("homem", -50, "walk", { id: "lo", dy: 0.52, facing: -1 }), C("rei", -130, "walk", { id: "rei-elao", dy: 0.46, facing: -1 }), C("multidao", -220, "walk", { id: "exercito-4", dy: 0.44, facing: -1 })], env: { night: 0.5, storm: 0.4 } }), // tomaram também a Ló e os seus bens
      // A NOTÍCIA EM MANRE (v.13-14) — Abrão arma os trezentos e dezoito
      b(13, { set: "manre", props: MANRE(true), cast: [C("homem", -60, "walk", { id: "fugitivo", dy: 0.54, facing: 1 }), C("abraao", 30, "stand", { dy: 0.5, glow: 0.35, facing: -1 })], env: { terrain: "field", night: 0.3, storm: 0, glory: 0.2 } }), // um que escapara contou a Abrão
      b(14, { cast: [C("abraao", -40, "point", { dy: 0.5, glow: 0.4, facing: 1 }), C("servo", 30, "stand", { id: "criado1", dy: 0.54 }), C("servo", 78, "stand", { id: "criado2", dy: 0.56 }), C("pastor", 128, "stand", { dy: 0.52 }), C("homem", -110, "stand", { id: "fugitivo", dy: 0.56 })], env: { night: 0.4, glory: 0.15 } }), // armou os trezentos e dezoito; até Dã
      // A PERSEGUIÇÃO NOTURNA (v.15-16) — Hobá e o RESGATE
      b(15, { set: "hoba", props: NOITE_HOBA, cast: [C("abraao", -30, "point", { dy: 0.5, glow: 0.45, facing: 1 }), C("servo", -90, "walk", { id: "criado1", dy: 0.54, facing: 1 }), C("servo", 30, "walk", { id: "criado2", dy: 0.56, facing: 1 }), C("pastor", 80, "walk", { dy: 0.52, facing: 1 }), C("rei", 230, "walk", { id: "rei-elao", dy: 0.44, facing: 1 })], env: { terrain: "desert", night: 0.7, storm: 0.15, glory: 0.05 } }), // dividiu-se de noite; feriu-os até Hobá
      b(16, { cast: [C("abraao", -30, "stand", { dy: 0.5, glow: 0.5 }), C("homem", 36, "stand", { id: "lo", dy: 0.52 }), C("mulherComum", 90, "stand", { dy: 0.56 }), C("multidao", 170, "stand", { id: "povo", dy: 0.44 }), C("rebanho", -130, "stand", { dy: 0.46 })], env: { night: 0.45, storm: 0, glory: 0.25 } }), // tornou a trazer Ló, mulheres e povo
      // O VALE DO REI (v.17) — o rei de Sodoma sai ao encontro
      b(17, { set: "save", props: VALE_SAVE(), cast: [C("rei", 140, "walk", { id: "rei-sodoma", dy: 0.46, facing: -1 }), C("abraao", -40, "stand", { dy: 0.5, glow: 0.4, facing: 1 }), C("homem", -110, "stand", { id: "lo", dy: 0.56 }), C("rebanho", -200, "stand", { dy: 0.46 })], env: { terrain: "field", night: 0.2, glory: 0.3, storm: 0 } }), // o rei de Sodoma saiu-lhe ao encontro
      // MELQUISEDEQUE (v.18-20) — pão e vinho; o sacerdote do Deus Altíssimo
      b(18, { props: VALE_SAVE(true), cast: [C("melquisedeque", -60, "stand", { dy: 0.46, glow: 0.5 }), C("abraao", 20, "stand", { dy: 0.5, glow: 0.4, facing: -1 }), C("rei", 150, "stand", { id: "rei-sodoma", dy: 0.5, facing: -1 })], env: { glory: 0.55, night: 0.08 } }), // Melquisedeque, rei de Salém: pão e vinho
      b(19, { by: "melquisedeque", q: "disse: ", cast: [C("melquisedeque", -60, "raise", { dy: 0.46, glow: 0.55 }), C("abraao", 20, "bow", { dy: 0.5, glow: 0.4, facing: -1 }), C("rei", 150, "stand", { id: "rei-sodoma", dy: 0.5, facing: -1 })], env: { glory: 0.7 } }), // "Bendito seja Abrão pelo Deus Altíssimo"
      b(20, { by: "melquisedeque", cast: [C("melquisedeque", -60, "raise", { dy: 0.46, glow: 0.6 }), C("abraao", 20, "kneel", { dy: 0.5, glow: 0.45, facing: -1 }), C("rei", 150, "stand", { id: "rei-sodoma", dy: 0.5, facing: -1 })], env: { glory: 0.8 } }), // "bendito o Deus Altíssimo"; o dízimo
      // NEM UM FIO ATÉ À CORREIA (v.21-24) — a recusa digna de Abrão
      b(21, { by: "rei", q: "disse a Abrão: ", set: "partilha", props: VALE_SAVE(), cast: [C("rei", 60, "point", { dy: 0.46, facing: -1 }), C("abraao", -40, "stand", { dy: 0.5, glow: 0.4, facing: 1 }), C("multidao", 150, "stand", { id: "povo", dy: 0.44 })], env: { glory: 0.5, night: 0.15 } }), // "dá-me as pessoas; toma os bens"
      b(22, { by: "abraao", q: "disse ao rei de Sodoma: ", cast: [C("abraao", -40, "raise", { dy: 0.5, glow: 0.5, facing: 1 }), C("rei", 60, "stand", { dy: 0.46, facing: -1 }), C("multidao", 150, "stand", { id: "povo", dy: 0.44 })], env: { glory: 0.6 } }), // "Levantei minha mão ao Senhor"
      b(23, { by: "abraao", cast: [C("abraao", -40, "point", { dy: 0.5, glow: 0.5, facing: 1 }), C("rei", 60, "stand", { dy: 0.46, facing: -1 }), C("multidao", 150, "stand", { id: "povo", dy: 0.44 })] }), // "nem um fio até à correia de sapato"
      b(24, { by: "abraao", env: { glory: 0.55 } }),                                                      // só a parte de Aner, Escol e Manre
    ],
  },
};
