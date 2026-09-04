// ============================================================================
// LEVÍTICO 19–20 — CENA VIVA. O Código de Santidade; as penas.
//
// Lev 19 — "SANTOS SEREIS, PORQUE EU SOU SANTO" (v.2): e a santidade desce à
// vida — honrar pai e mãe, guardar o sábado, deixar a RESPIGA para o pobre e o
// estrangeiro (v.9-10), não roubar nem mentir, pagar o diarista no mesmo dia,
// não amaldiçoar o surdo nem pôr tropeço ao cego, julgar com justiça, e o
// coração de tudo: "AMARÁS O TEU PRÓXIMO COMO A TI MESMO" (v.18) — e o
// estrangeiro também (v.34). Honrar as cãs; balanças justas.
//
// Lev 20 — AS PENAS: contra Moloque, os adivinhadores, as abominações. Fecha na
// vocação: "sereis santos, porque eu sou santo, e vos separei dos povos, para
// serdes meus" (v.26) — a santidade é pertença a Deus.
//
// A VOZ DE DEUS (regra do projeto): tudo é instrução do alto (`by: "deus"`),
// sem figura, com o refrão "Eu sou o Senhor". Em 19, a respiga ganha o campo
// da colheita; o pobre `homem` recolhe as espigas caídas.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const dv = (v: number) => b(v, { by: "deus" });

const ARRAIAL: StagePropSpec[] = [
  { ...P("tent", -40, 1.35, undefined, 0.1), tag: "tabernaculo" },
  P("tent", -260, 1.0, undefined, 0.2),
  P("tent", 250, 1.05, undefined, 0.18),
  P("palm", -300, 1.05, undefined, 0.14),
  P("well", 300, 1.0, undefined, 0.5),
  P("grass", -60, 0.82, undefined, 0.82),
  P("grass", 60, 0.78, undefined, 0.74),
];
// A COLHEITA com a RESPIGA (Lev 19:9-10): as espigas deixadas nos cantos do
// campo e os bagos da vinha, para o pobre e o estrangeiro recolherem.
const SEARA: StagePropSpec[] = [
  P("sheaf", 150, 1.1, undefined, 0.4),
  P("sheaf", 210, 1.0, undefined, 0.36),
  P("sheaf", 270, 0.95, undefined, 0.32),
  P("tree", -260, 1.1, undefined, 0.12),
  P("bush", 60, 0.85, undefined, 0.34),
  P("tent", -300, 0.9, undefined, 0.22),
  P("grass", -80, 0.85, undefined, 0.82),
  P("grass", 40, 0.8, undefined, 0.76),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Lev 19
  19: {
    start: { terrain: "field", night: 0.1, glory: 0.65, storm: 0, fire: 0, verdure: 0.5 },
    beats: [
      b(1, { props: ARRAIAL, env: { terrain: "field", glory: 0.68, night: 0.1, verdure: 0.5 }, cast: [ // falou mais o Senhor a Moisés
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "stand", { dy: 0.46 }),
      ] }),
      b(2, { by: "deus", q: "Santos sereis, porque eu, o Senhor vosso Deus, sou santo", env: { glory: 0.85 }, cast: [ // "SANTOS SEREIS, porque eu sou santo"
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "bow", { dy: 0.46 }),
      ] }),
      b(3, { by: "deus", q: "Cada um temerá a sua mãe e a seu pai", env: { glory: 0.74 }, cast: [ // TEMER pai e mãe e guardar os sábados
        C("anciao", 60, "stand", { dy: 0.5 }),
        C("homem", -20, "bow", { dy: 0.54, facing: 1, id: "filho" }),
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(4, { by: "deus", q: "Não vos virareis para os ídolos", props: [...ARRAIAL, P("calf", 200, 1.0, undefined, 0.44)], env: { night: 0.3, glory: 0.6 }, cast: [ // não vos virareis para os ÍDOLOS nem fareis deuses de fundição
        C("homem", 20, "stand", { dy: 0.54, facing: -1, id: "filho" }),
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
      ] }),
      b(5, { by: "deus", q: "da vossa própria vontade o oferecereis", props: [...ARRAIAL, { ...P("altar", 120, 1.2, 0.7, 0.44), tag: "altar-holocausto" }], env: { night: 0.1, glory: 0.72, fire: 0.5 }, cast: [ // o sacrifício PACÍFICO, oferecido de vossa própria vontade
        C("homem", 30, "stand", { dy: 0.54, facing: 1, id: "ofertante" }),
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(6, { by: "deus", q: "será queimado com fogo", props: [...ARRAIAL, { ...P("altar", 120, 1.2, 0.85, 0.44), tag: "altar-holocausto" }, P("campfire", -140, 1.0, 1, 0.6)], env: { fire: 0.7 }, cast: [ // comido no dia e no seguinte; o que sobejar ao terceiro, QUEIMADO
        C("homem", 20, "kneel", { dy: 0.56, facing: 1, id: "ofertante" }),
      ] }),
      b(7, { by: "deus", q: "coisa abominável é; não será aceita", env: { night: 0.34, glory: 0.58, fire: 0.5 }, cast: [ // comido ao terceiro dia: coisa abominável, não será aceita
        C("homem", 0, "bow", { dy: 0.58, facing: -1, id: "ofertante" }),
      ] }),
      b(8, { by: "deus", q: "porquanto profanou a santidade do Senhor", env: { night: 0.42, glory: 0.55 }, cast: [ // quem o comer leva a sua iniquidade: profanou a santidade do Senhor
        C("homem", -30, "walk", { dy: 0.56, facing: -1, id: "ofertante" }),
      ] }),
      b(9, { by: "deus", set: "seara", props: SEARA, env: { terrain: "field", glory: 0.72, verdure: 0.6, night: 0.08, fire: 0 }, cast: [ // a RESPIGA: não segarás o canto do teu campo
        C("homem", -30, "stand", { dy: 0.54, facing: 1, id: "ceifeiro" }),
      ] }),
      b(10, { by: "deus", q: "deixá-los-ás ao pobre e ao estrangeiro", env: { glory: 0.78 }, cast: [ // deixa a respiga e os bagos ao POBRE e ao estrangeiro
        C("homem", -40, "stand", { dy: 0.54, facing: 1, id: "ceifeiro" }),
        C("homem", 100, "kneel", { dy: 0.5, facing: -1, id: "pobre" }),
      ] }),
      b(11, { by: "deus", set: "arraial", props: ARRAIAL, env: { terrain: "field", glory: 0.68, verdure: 0.5 } }), // não furtareis, nem mentireis
      b(12, { by: "deus", q: "Nem jurareis falso pelo meu nome", env: { glory: 0.7, night: 0.14 }, cast: [ // não jurareis FALSO pelo meu nome, profanando-o
        C("homem", 20, "raise", { dy: 0.54, facing: -1, id: "vizinho" }),
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(13, { by: "deus", q: "a paga do diarista", props: [...ARRAIAL, P("bowl", 90, 0.9, undefined, 0.6)], env: { night: 0.44, glory: 0.55 }, cast: [ // não oprimirás; a paga do DIARISTA não fica contigo até pela manhã
        C("homem", 150, "stand", { dy: 0.5, facing: -1, id: "patrao" }),
        C("homem", 20, "kneel", { dy: 0.56, facing: 1, id: "diarista" }),
      ] }),
      b(14, { by: "deus", q: "nem porás tropeço diante do cego", props: [...ARRAIAL, P("rock", 60, 0.9, undefined, 0.64)], env: { night: 0.12, glory: 0.66 }, cast: [ // não amaldiçoarás o surdo nem porás TROPEÇO diante do cego
        C("homem", -30, "walk", { dy: 0.58, facing: 1, id: "cego" }),
        C("homem", 160, "stand", { dy: 0.5, facing: -1, id: "vizinho" }),
      ] }),
      b(15, { by: "deus", q: "com justiça julgarás o teu próximo", props: ARRAIAL, env: { glory: 0.76 }, cast: [ // não respeitarás o pobre nem honrarás o poderoso: JULGA COM JUSTIÇA
        C("anciao", 0, "stand", { dy: 0.48 }),
        C("homem", -110, "kneel", { dy: 0.56, facing: 1, id: "pobre" }),
        C("homem", 110, "stand", { dy: 0.52, facing: -1, id: "poderoso" }),
      ] }),
      b(16, { by: "deus", q: "Não andarás como mexeriqueiro entre o teu povo", env: { night: 0.36, glory: 0.58 }, cast: [ // não andarás como MEXERIQUEIRO; não te porás contra o sangue do próximo
        C("homem", -60, "point", { dy: 0.54, facing: 1, id: "mexeriqueiro" }),
        C("homem", 20, "stand", { dy: 0.54, facing: 1, id: "vizinho" }),
        C("homem", 190, "bow", { dy: 0.5, facing: -1, id: "difamado" }),
      ] }),
      b(17, { by: "deus", q: "não deixarás de repreender o teu próximo", env: { night: 0.12, glory: 0.72 }, cast: [ // não odiarás teu irmão; repreenderás o teu próximo cara a cara
        C("homem", -50, "point", { dy: 0.54, facing: 1, id: "irmao" }),
        C("homem", 50, "stand", { dy: 0.54, facing: -1, id: "vizinho" }),
      ] }),
      b(18, { by: "deus", q: "amarás o teu próximo como a ti mesmo", env: { glory: 0.9 }, cast: [ // "AMARÁS O TEU PRÓXIMO COMO A TI MESMO"
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "stand", { dy: 0.46 }),
        C("homem", 40, "stand", { dy: 0.52, facing: -1, id: "proximo" }),
      ] }),
      dv(19), dv(20), dv(21),
      b(22, { by: "deus", q: "este lhe será perdoado", env: { glory: 0.75 } }),   // o carneiro da culpa: e este lhe será perdoado
      b(23, { by: "deus", props: SEARA, env: { verdure: 0.62 } }),               // a árvore plantada: três anos incircunciso o fruto
      dv(24),
      b(25, { by: "deus", q: "Eu sou o Senhor vosso Deus", env: { verdure: 0.7 } }), // no quinto ano comereis; Eu sou o Senhor
      b(26, { by: "deus", set: "arraial", props: ARRAIAL, env: { terrain: "field", verdure: 0.5 } }), // não comereis com o sangue; não agourareis
      b(27, { by: "deus", q: "nem danificareis as extremidades da tua barba", env: { glory: 0.66, night: 0.12 }, cast: [ // não arredondareis os cantos da cabeça nem danificareis a barba
        C("homem", 0, "stand", { dy: 0.62, scale: 1.15, facing: 1, id: "israelita" }),
      ] }),
      b(28, { by: "deus", q: "Pelos mortos não dareis golpes na vossa carne", props: [...ARRAIAL, P("rock", 170, 1.0, undefined, 0.56)], env: { night: 0.42, glory: 0.56, verdure: 0.4 }, cast: [ // pelos MORTOS não dareis golpes na carne nem fareis marca sobre vós
        C("homem", 120, "lie", { dy: 0.6, facing: 1, id: "morto" }),
        C("homem", -20, "bow", { dy: 0.56, facing: 1, id: "israelita" }),
      ] }),
      b(29, { by: "deus", q: "para que a terra não se prostitua", props: ARRAIAL, env: { verdure: 0.14, night: 0.46, glory: 0.52 }, cast: [ // não contaminarás a tua filha; para que a TERRA não se prostitua
        C("homem", -40, "bow", { dy: 0.58, facing: 1, id: "pai" }),
      ] }),
      b(30, { by: "deus", q: "o meu santuário reverenciareis", env: { night: 0.1, glory: 0.85, verdure: 0.5 }, cast: [ // guardai os sábados; REVERENCIAI o meu santuário
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 130, "bow", { dy: 0.46 }),
      ] }),
      b(31, { by: "deus", q: "Não vos virareis para os adivinhadores e encantadores", env: { night: 0.56, glory: 0.5 }, cast: [ // não vos virareis para os ADIVINHADORES e encantadores
        C("homem", 230, "stand", { dy: 0.48, facing: -1, id: "adivinhador" }),
        C("homem", -20, "walk", { dy: 0.56, facing: -1, id: "israelita" }),
      ] }),
      b(32, { by: "deus", q: "honrarás a face do ancião", env: { glory: 0.8 }, cast: [ // diante das cãs te levantarás; HONRARÁS o ancião
        C("anciao", 40, "stand", { dy: 0.5 }),
        C("homem", -20, "bow", { dy: 0.54, facing: 1, id: "jovem" }),
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(33, { by: "deus" }),                                                     // não oprimireis o estrangeiro que peregrina
      b(34, { by: "deus", q: "amá-lo-ás como a ti mesmo", env: { glory: 0.85 }, cast: [ // ao estrangeiro AMARÁS COMO A TI MESMO
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("homem", 40, "stand", { dy: 0.52, facing: -1, id: "estrangeiro" }),
      ] }),
      b(35, { by: "deus" }),                                                     // não cometereis injustiça na vara, no peso, na medida
      b(36, { by: "deus", q: "Balanças justas" }),                              // balanças justas, pesos justos, efa e him justos
      b(37, { by: "deus", q: "Eu sou o Senhor", env: { glory: 0.8 } }),         // guardareis todos os meus estatutos; Eu sou o Senhor
    ],
  },

  // ------------------------------------------------------------------ Lev 20
  // As penas contra a idolatria e as abominações; e a vocação: separados para
  // serem de Deus. Palco sóbrio; env com storm leve no juízo, glória no fecho.
  20: {
    start: { terrain: "field", night: 0.12, glory: 0.6, storm: 0, fire: 0, verdure: 0.4 },
    beats: [
      b(1, { props: ARRAIAL, env: { terrain: "field", glory: 0.62, night: 0.12, verdure: 0.4 }, cast: [ // falou mais o Senhor a Moisés
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "stand", { dy: 0.46 }),
      ] }),
      b(2, { by: "deus", q: "Moloque", env: { storm: 0.14 } }),                  // quem der da sua semente a Moloque: morrerá
      dv(3), dv(4), dv(5), dv(6),
      b(7, { by: "deus", q: "santificai-vos, e sede santos", env: { glory: 0.78, storm: 0 }, cast: [ // "santificai-vos, e sede santos"
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "bow", { dy: 0.46 }),
      ] }),
      b(8, { by: "deus", q: "Eu sou o Senhor que vos santifica", env: { glory: 0.78, storm: 0 }, cast: [ // guardai os estatutos; Eu sou o Senhor que vos santifica
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("servo", 60, "stand", { dy: 0.5, facing: -1, id: "levita" }),
        C("anciao", 140, "stand", { dy: 0.48, facing: -1, id: "juiz-da-porta" }),
      ] }),
      // v.9-21 — as PENAS das leis da casa: JUÍZO declarado. Night sobe, glória
      // desce, NUNCA multidão (o motor a desenha comemorando) — figuras
      // individuais em bow/kneel, e o proclamador alterna (Moisés/levita).
      b(9, { by: "deus", env: { night: 0.3, glory: 0.62, storm: 0.12 }, cast: [  // quem amaldiçoar pai ou mãe: o seu sangue sobre ele
        C("homem", -30, "bow", { dy: 0.54, id: "culpado" }),
        C("anciao", 80, "stand", { dy: 0.5, facing: -1, id: "pai-ofendido" }),
        C("moises", -180, "point", { dy: 0.5, facing: 1 }),
      ] }),
      b(10, { by: "deus", env: { glory: 0.62, night: 0.32 }, cast: [                           // o adúltero e a adúltera: certamente morrerão
        C("homem", -40, "kneel", { dy: 0.54, id: "adultero" }),
        C("mulherComum", 60, "kneel", { dy: 0.52, id: "adultera" }),
        C("servo", -180, "point", { dy: 0.5, facing: 1, id: "levita" }),
      ] }),
      b(11, { by: "deus", env: { night: 0.32, glory: 0.62 }, cast: [                            // a mulher de seu pai: ambos morrerão
        C("homem", -20, "bow", { dy: 0.54, id: "culpado" }),
        C("moises", -180, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(12, { env: { glory: 0.62, night: 0.32 }, by: "deus", cast: [                                                 // com a sua nora: fizeram confusão
        C("homem", -60, "kneel", { dy: 0.54, id: "culpado" }),
        C("mulherComum", 50, "bow", { dy: 0.52, id: "culpada" }),
        C("servo", -190, "stand", { dy: 0.5, facing: 1, id: "levita" }),
      ] }),
      b(13, { by: "deus", env: { glory: 0.62, night: 0.34 }, cast: [                           // ambos fizeram abominação: certamente morrerão
        C("homem", -70, "bow", { dy: 0.54, id: "culpado" }),
        C("homem", 30, "bow", { dy: 0.52, id: "culpado2" }),
        C("moises", -190, "point", { dy: 0.5, facing: 1 }),
      ] }),
      b(14, { by: "deus", props: [...ARRAIAL, P("campfire", -330, 0.9, 0.9, 0.3)], env: { glory: 0.62, night: 0.36, fire: 0.25 }, cast: [ // uma mulher e sua mãe: queimarão com fogo (fora, ao longe)
        C("homem", -30, "bow", { dy: 0.54, id: "culpado" }),
        C("mulherComum", 60, "bow", { dy: 0.52, id: "culpada" }),
        C("mulherComum", 130, "bow", { dy: 0.5, scale: 0.95, id: "mae-dela" }),
        C("moises", -190, "point", { dy: 0.5, facing: 1 }),
      ] }),
      b(15, { by: "deus", props: [...ARRAIAL, P("stall", 180, 1.1, undefined, 0.4)], env: { glory: 0.62, night: 0.3, fire: 0 }, cast: [ // com animal: morrerá; e matareis o animal
        C("homem", -30, "bow", { dy: 0.54, id: "culpado" }),
        C("servo", -180, "point", { dy: 0.5, facing: 1, id: "levita" }),
      ] }),
      b(16, { env: { glory: 0.62, night: 0.3 }, by: "deus", cast: [                                                 // a mulher que se chegar a algum animal
        C("mulherComum", -20, "bow", { dy: 0.52, id: "culpada" }),
        C("moises", -180, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(17, { by: "deus", props: ARRAIAL, env: { night: 0.32, glory: 0.62 }, cast: [ // a sua irmã: extirpados aos olhos dos filhos do seu povo
        C("homem", -90, "walk", { dy: 0.54, facing: -1, id: "extirpado" }),
        C("mulherComum", 20, "walk", { dy: 0.52, facing: -1, id: "extirpada" }),
        C("anciao", 140, "stand", { dy: 0.48, facing: -1, id: "juiz-da-porta" }),
      ] }),
      b(18, { by: "deus", env: { glory: 0.62, night: 0.3 }, cast: [                            // no tempo da sua enfermidade: ambos extirpados
        C("homem", -40, "bow", { dy: 0.54, id: "culpado" }),
        C("mulherComum", 50, "bow", { dy: 0.52, id: "culpada" }),
        C("moises", -190, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(19, { env: { glory: 0.62, night: 0.3 }, by: "deus", cast: [                                                 // a irmã de tua mãe ou de teu pai: levarão a iniquidade
        C("mulherComum", 60, "stand", { dy: 0.52, facing: -1, id: "tia" }),
        C("homem", -50, "bow", { dy: 0.54, id: "sobrinho" }),
        C("servo", -190, "point", { dy: 0.5, facing: 1, id: "levita" }),
      ] }),
      b(20, { by: "deus", env: { night: 0.36, glory: 0.62 }, cast: [              // com a sua tia: sem filhos morrerão
        C("homem", -30, "bow", { dy: 0.54, id: "culpado" }),
        C("mulherComum", 60, "bow", { dy: 0.52, id: "culpada" }),
        C("moises", -190, "point", { dy: 0.5, facing: 1 }),
      ] }),
      b(21, { by: "deus", env: { night: 0.38, glory: 0.62 }, cast: [              // a mulher de seu irmão: imundícia é; sem filhos ficarão
        C("homem", -40, "kneel", { dy: 0.54, id: "culpado" }),
        C("mulherComum", 50, "kneel", { dy: 0.52, id: "culpada" }),
        C("servo", -190, "stand", { dy: 0.5, facing: 1, id: "levita" }),
      ] }),
      b(22, { by: "deus", q: "para que não vos vomite a terra", env: { storm: 0.12, night: 0.2, glory: 0.5 }, cast: [ // guardai os estatutos, para que a terra não vos vomite
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("anciao", 60, "stand", { dy: 0.5, facing: -1, id: "juiz-da-porta" }),
        C("homem", 140, "stand", { dy: 0.52, facing: -1, id: "israelita" }),
      ] }),
      b(23, { by: "deus" }),                                                     // não andeis nos costumes das nações que expulso
      b(24, { by: "deus", q: "terra que mana leite e mel", env: { glory: 0.75, storm: 0, verdure: 0.6, night: 0.1 }, cast: [ // possuireis a terra que mana leite e mel
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "stand", { dy: 0.46 }),
      ] }),
      b(25, { by: "deus" }),                                                     // fareis diferença entre o animal limpo e o imundo
      b(26, { by: "deus", q: "porque eu, o Senhor, sou santo", env: { glory: 0.88 }, cast: [ // "ser-me-eis santos… e vos separei dos povos, para serdes meus"
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "bow", { dy: 0.46 }),
      ] }),
      b(27, { by: "deus", env: { storm: 0.1, glory: 0.6 } }),                    // o homem ou mulher com espírito de adivinhação: morrerá
    ],
  },
};
