// ============================================================================
// NÚMEROS 5–6 — CENA VIVA. A pureza do arraial; o nazireu; A BÊNÇÃO SACERDOTAL.
//
// Nm 5 — A PUREZA DO ARRAIAL: os imundos postos fora do acampamento (porque o
// Senhor habita no meio); a restituição do dano com o quinto; e a prova das
// águas amargas para a mulher suspeita — encenada com DECORO (nada do caso em
// si é representado: só o rito público — o sacerdote, a mulher em pé, a oferta,
// o rol escrito e lavado na água, o altar).
//
// Nm 6 — O NAZIREU e A BÊNÇÃO DE ARÃO: o voto de separação (sem vinho, sem
// navalha, sem tocar morto — cabelo consagrado ao Senhor). E o ápice: a bênção
// que os sacerdotes põem sobre o povo — "O SENHOR TE ABENÇOE E TE GUARDE; o
// SENHOR faça resplandecer o seu rosto sobre ti… e te dê a paz" (6:24-26):
// o Nome de Deus posto sobre Israel.
//
// A VOZ DE DEUS (regra do projeto): a instrução vem do alto (`by: "deus"`); na
// bênção, Arão é o mediador VISÍVEL, com as mãos levantadas e glória sobre o
// povo — o Nome descendo, sem figura.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const dv = (v: number) => b(v, { by: "deus" });

const ARRAIAL: StagePropSpec[] = [
  { ...P("tent", -30, 1.45, undefined, 0.1), tag: "tabernaculo" },
  P("tent", -260, 1.0, undefined, 0.2),
  P("tent", 240, 1.0, undefined, 0.22),
  P("palm", -310, 1.05, undefined, 0.14),
  P("well", 320, 1.0, undefined, 0.5),
  P("grass", -60, 0.82, undefined, 0.82),
  P("grass", 60, 0.78, undefined, 0.74),
];
// A RESTITUIÇÃO DO DANO (Nm 5:5-10): o culpado confessa e devolve a soma com o
// quinto, diante do altar — e a oferta alçada fica para o sacerdote.
const RESTITUICAO: StagePropSpec[] = [
  P("tent", -250, 1.1, undefined, 0.16),
  P("tent", 265, 0.95, undefined, 0.24),
  { ...P("altar", -70, 0.9, 0.3, 0.5), tag: "altar-holocausto" },
  P("crate", 145, 0.9, undefined, 0.54),
  P("bowl", 85, 0.8, undefined, 0.62),
  P("amphora", 215, 0.8, undefined, 0.48),
  P("grass", -150, 0.8, undefined, 0.8),
];
// A PROVA DAS ÁGUAS AMARGAS (Nm 5:11-31): a tenda da congregação, o altar, o
// vaso das águas e o livro em que as maldições são escritas e depois apagadas.
const PROVA: StagePropSpec[] = [
  { ...P("tent", -130, 1.45, undefined, 0.1), tag: "tenda-congregacao" },
  { ...P("altar", 60, 0.95, 0.35, 0.48), tag: "altar-holocausto" },
  { ...P("bowl", 150, 0.9, undefined, 0.6), tag: "aguas-amargas" },
  { ...P("scroll", 225, 0.9, undefined, 0.54), tag: "rol-das-maldicoes" },
  P("amphora", 295, 0.75, undefined, 0.48),
  P("grass", -30, 0.8, undefined, 0.82),
];
// O punhado da oferta queimado sobre o altar (Nm 5:26).
const PROVA_FOGO: StagePropSpec[] = PROVA.map((p) =>
  p.tag === "altar-holocausto" ? { ...p, fire: 0.65 } : p);
// O NAZIREADO (Nm 6:3-4): o arraial com a vinha RECUSADA — uvas e vinho que o
// separado não toca todos os dias do seu voto.
const NAZIREADO: StagePropSpec[] = [
  { ...P("tent", -60, 1.4, undefined, 0.1), tag: "tabernaculo" },
  P("tent", 255, 0.95, undefined, 0.22),
  P("grapes", 120, 0.9, undefined, 0.6),
  P("amphora", 190, 0.8, undefined, 0.52),
  P("palm", -300, 1.05, undefined, 0.14),
  P("grass", -20, 0.8, undefined, 0.8),
];
// A PORTA DA TENDA (Nm 6:9-12): o recomeço do voto — o altar da expiação à
// porta da tenda da congregação.
const PORTA_TENDA: StagePropSpec[] = [
  { ...P("tent", -80, 1.5, undefined, 0.1), tag: "tenda-congregacao" },
  { ...P("altar", 90, 0.95, 0.3, 0.5), tag: "altar-holocausto" },
  P("bowl", 175, 0.8, undefined, 0.6),
  P("grass", -20, 0.8, undefined, 0.8),
];
// O FIM DO VOTO (Nm 6:13-21): as ofertas, o cesto de ázimos e o fogo do
// sacrifício pacífico, sob o qual o cabelo consagrado é queimado.
const FIM_VOTO: StagePropSpec[] = [
  { ...P("tent", -100, 1.45, undefined, 0.1), tag: "tenda-congregacao" },
  { ...P("altar", 60, 1.0, 0.4, 0.48), tag: "altar-holocausto" },
  { ...P("crate", 165, 0.85, undefined, 0.56), tag: "cesto-do-nazireu" },
  P("bowl", 225, 0.75, undefined, 0.6),
  P("amphora", 285, 0.7, undefined, 0.5),
  P("grass", -30, 0.8, undefined, 0.8),
];
// O fogo alto do pacífico, que consome o cabelo do nazireado (Nm 6:18).
const FIM_VOTO_FOGO: StagePropSpec[] = FIM_VOTO.map((p) =>
  p.tag === "altar-holocausto" ? { ...p, fire: 0.7 } : p);
// "…e depois o nazireu pode beber vinho" (Nm 6:20): as uvas voltam à cena.
const VINHO_LIBERTO: StagePropSpec[] = [
  ...FIM_VOTO,
  P("grapes", 330, 0.85, undefined, 0.55),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Nm 5
  5: {
    start: { terrain: "desert", night: 0.1, glory: 0.6, storm: 0, fire: 0, verdure: 0.2 },
    beats: [
      b(1, { by: "deus", props: ARRAIAL, env: { terrain: "desert", glory: 0.62, night: 0.1, verdure: 0.2 }, cast: [ // o Senhor fala a Moisés
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(2, { by: "deus", q: "lancem fora do arraial" }),                 // lancem para fora todo imundo, para não contaminar o arraial
      b(3, { by: "deus", q: "no meio dos quais eu habito", cast: [                 // "porque eu habito no meio deles"
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "walk", { dy: 0.44 }),
      ] }),
      b(4, { cast: [                                                             // e os filhos de Israel os LANÇARAM fora do arraial
        C("servo", -60, "point", { dy: 0.52, facing: 1, id: "guarda-do-arraial" }),
        C("homem", 190, "walk", { dy: 0.44, facing: 1, id: "imundo" }),
        C("mulherComum", 265, "walk", { scale: 0.92, dy: 0.4, facing: 1, id: "imunda" }),
      ] }),
      b(5, { by: "deus", cast: [                                                 // falou mais o Senhor a Moisés
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(6, { by: "deus", cast: [                                                 // quando homem ou mulher fizer algum pecado, culpada será aquela alma
        C("homem", -20, "bow", { dy: 0.54, facing: 1, id: "culpado" }),
        C("mulherComum", 70, "bow", { dy: 0.5, facing: 1, id: "culpada" }),
        C("moises", -160, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(7, { by: "deus", q: "fará plena restituição", set: "restituicao", props: RESTITUICAO, env: { terrain: "desert", glory: 0.62, night: 0.1 }, cast: [ // confessará e restituirá o dano, com o quinto
        C("homem", -20, "bow", { dy: 0.54, facing: 1, id: "culpado" }),
        C("homem", 100, "stand", { dy: 0.5, facing: -1, id: "lesado" }),
      ] }),
      b(8, { by: "deus", cast: [                                                 // sem resgatador, a culpa restituída será do Senhor, do SACERDOTE
        C("homem", -30, "bow", { dy: 0.54, facing: 1, id: "culpado" }),
        C("servo", 110, "stand", { dy: 0.5, facing: -1, id: "sacerdote-da-prova" }),
      ] }),
      b(9, { by: "deus", cast: [                                                 // toda oferta alçada das coisas santificadas será do sacerdote
        C("servo", -110, "raise", { dy: 0.52, facing: 1, id: "sacerdote-da-prova" }),
        C("homem", 60, "walk", { dy: 0.5, facing: -1, id: "ofertante" }),
      ] }),
      b(10, { by: "deus", env: { glory: 0.66 }, cast: [                          // "o que alguém der ao sacerdote será seu"
        C("servo", -40, "stand", { dy: 0.52, facing: -1, id: "sacerdote-da-prova" }),
      ] }),
      // v.11-31 — A PROVA DAS ÁGUAS AMARGAS: só o rito público, com decoro.
      b(11, { by: "deus", set: "prova", props: PROVA, env: { terrain: "desert", glory: 0.62, night: 0.12 }, cast: [
        C("moises", -160, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(12, { by: "deus", cast: [                                                // "quando a mulher de alguém se desviar" — o casal apartado
        C("homem", -90, "stand", { dy: 0.54, facing: -1, id: "marido" }),
        C("mulherComum", 130, "stand", { dy: 0.5, facing: 1, id: "mulher-suspeita" }),
      ] }),
      b(13, { by: "deus", env: { night: 0.18 }, cast: [                          // oculto aos olhos do marido; não há testemunha
        C("mulherComum", 160, "stand", { dy: 0.48, facing: 1, id: "mulher-suspeita" }),
      ] }),
      b(14, { by: "deus", env: { night: 0.14 }, cast: [                          // o ESPÍRITO DE CIÚMES vem sobre ele
        C("homem", -50, "point", { dy: 0.54, facing: 1, id: "marido" }),
        C("mulherComum", 175, "stand", { dy: 0.48, facing: -1, id: "mulher-suspeita" }),
      ] }),
      b(15, { by: "deus", cast: [                                                // o marido traz a mulher ao sacerdote, com a oferta de ciúmes
        C("homem", -170, "walk", { dy: 0.5, facing: 1, id: "marido" }),
        C("mulherComum", -60, "walk", { dy: 0.52, facing: 1, id: "mulher-suspeita" }),
        C("servo", 110, "stand", { dy: 0.5, facing: -1, id: "sacerdote-da-prova" }),
      ] }),
      b(16, { by: "deus", env: { glory: 0.66 }, cast: [                          // o sacerdote a fará chegar e a porá perante a face do Senhor
        C("servo", -50, "point", { dy: 0.52, facing: 1, id: "sacerdote-da-prova" }),
        C("mulherComum", 60, "stand", { dy: 0.52, facing: -1, id: "mulher-suspeita" }),
      ] }),
      b(17, { by: "deus", cast: [                                                // ÁGUA SANTA num vaso de barro, e o pó do chão do tabernáculo
        C("servo", 115, "kneel", { dy: 0.54, facing: -1, id: "sacerdote-da-prova" }),
        C("mulherComum", -20, "stand", { dy: 0.5, facing: 1, id: "mulher-suspeita" }),
      ] }),
      b(18, { by: "deus", cast: [                                                // a oferta memorativa nas mãos dela; as águas amargas na mão do sacerdote
        C("mulherComum", 10, "stand", { dy: 0.54, facing: 1, id: "mulher-suspeita" }),
        C("servo", 120, "raise", { dy: 0.5, facing: -1, id: "sacerdote-da-prova" }),
      ] }),
      b(19, { by: "deus", cast: [                                                // o sacerdote a fará JURAR
        C("servo", 100, "point", { dy: 0.52, facing: -1, id: "sacerdote-da-prova" }),
        C("mulherComum", -20, "stand", { dy: 0.52, facing: 1, id: "mulher-suspeita" }),
      ] }),
      b(20, { by: "deus", env: { night: 0.2, glory: 0.58 }, cast: [              // "mas, se te apartaste…" — a sombra da maldição condicional
        C("servo", 100, "point", { dy: 0.52, facing: -1, id: "sacerdote-da-prova" }),
        C("mulherComum", -20, "bow", { dy: 0.52, facing: 1, id: "mulher-suspeita" }),
      ] }),
      b(21, { by: "deus", env: { night: 0.24, glory: 0.54 }, cast: [             // o juramento da maldição diante do Senhor
        C("servo", 110, "raise", { dy: 0.5, facing: -1, id: "sacerdote-da-prova" }),
        C("mulherComum", -30, "bow", { dy: 0.52, facing: 1, id: "mulher-suspeita" }),
      ] }),
      b(22, { by: "deus", cast: [                                                // e a mulher dirá: "Amém, amém"
        C("mulherComum", -10, "kneel", { dy: 0.54, facing: 1, id: "mulher-suspeita" }),
        C("servo", 105, "stand", { dy: 0.5, facing: -1, id: "sacerdote-da-prova" }),
      ] }),
      b(23, { by: "deus", env: { night: 0.16 }, cast: [                          // as maldições ESCRITAS num livro e APAGADAS com a água amarga
        C("servo", 190, "write", { dy: 0.52, facing: -1, id: "sacerdote-da-prova" }),
        C("mulherComum", -60, "stand", { dy: 0.5, facing: 1, id: "mulher-suspeita" }),
      ] }),
      b(24, { by: "deus", cast: [                                                // a água amarga, amaldiçoante, dada a beber à mulher
        C("servo", -10, "point", { dy: 0.52, facing: 1, id: "sacerdote-da-prova" }),
        C("mulherComum", 95, "stand", { dy: 0.52, facing: -1, id: "mulher-suspeita" }),
      ] }),
      b(25, { by: "deus", cast: [                                                // a oferta por ciúmes MOVIDA perante o Senhor e trazida ao altar
        C("servo", 30, "raise", { dy: 0.52, facing: 1, id: "sacerdote-da-prova" }),
        C("mulherComum", 150, "kneel", { dy: 0.46, facing: -1, id: "mulher-suspeita" }),
      ] }),
      b(26, { by: "deus", props: PROVA_FOGO, env: { fire: 0.25 }, cast: [        // o punhado memorativo QUEIMADO sobre o altar
        C("servo", 15, "raise", { dy: 0.52, facing: 1, id: "sacerdote-da-prova" }),
        C("mulherComum", 140, "stand", { dy: 0.46, facing: -1, id: "mulher-suspeita" }),
      ] }),
      b(27, { by: "deus", env: { night: 0.28, glory: 0.5, fire: 0.1 }, cast: [   // se ela se tiver contaminado: a maldição entra e ela será por maldição
        C("mulherComum", 60, "bow", { dy: 0.52, facing: 1, id: "mulher-suspeita" }),
        C("servo", -70, "stand", { dy: 0.5, facing: 1, id: "sacerdote-da-prova" }),
      ] }),
      b(28, { by: "deus", props: PROVA, env: { night: 0.1, glory: 0.76, fire: 0 }, cast: [ // mas, se estiver LIMPA: será livre, e conceberá filhos
        C("mulherComum", 40, "stand", { glow: 0.25, dy: 0.54, facing: -1, id: "mulher-suspeita" }),
        C("servo", -80, "stand", { dy: 0.5, facing: 1, id: "sacerdote-da-prova" }),
      ] }),
      b(29, { by: "deus", env: { glory: 0.64 }, cast: [                          // esta é a LEI DOS CIÚMES
        C("moises", -170, "stand", { dy: 0.5, facing: 1 }),
        C("servo", -70, "stand", { dy: 0.52, facing: 1, id: "sacerdote-da-prova" }),
        C("mulherComum", 90, "stand", { dy: 0.5, facing: -1, id: "mulher-suspeita" }),
      ] }),
      b(30, { by: "deus", cast: [                                                // o homem apresentará a mulher perante o Senhor
        C("homem", -130, "stand", { dy: 0.52, facing: 1, id: "marido" }),
        C("mulherComum", -40, "stand", { dy: 0.54, facing: 1, id: "mulher-suspeita" }),
        C("servo", 110, "stand", { dy: 0.5, facing: -1, id: "sacerdote-da-prova" }),
      ] }),
      b(31, { by: "deus", env: { glory: 0.6 }, cast: [                           // o homem será livre da iniquidade; a mulher levará a sua
        C("homem", -150, "stand", { dy: 0.5, facing: -1, id: "marido" }),
        C("mulherComum", 140, "bow", { dy: 0.48, facing: 1, id: "mulher-suspeita" }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Nm 6
  6: {
    start: { terrain: "desert", night: 0.1, glory: 0.64, storm: 0, fire: 0, verdure: 0.2 },
    beats: [
      b(1, { by: "deus", props: ARRAIAL, env: { terrain: "desert", glory: 0.66, night: 0.1, verdure: 0.2 }, cast: [ // o Senhor fala a Moisés
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(2, { by: "deus", q: "voto de nazireu", cast: [                           // o voto de NAZIREU: separar-se para o Senhor
        C("homem", -40, "stand", { dy: 0.54, facing: 1, id: "nazireu" }),
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(3, { by: "deus", q: "De vinho e de bebida forte se apartará", set: "nazireado", props: NAZIREADO, env: { terrain: "desert", glory: 0.64, night: 0.1 }, cast: [ // apartar-se-á do vinho e da bebida forte
        C("homem", -60, "stand", { dy: 0.54, facing: -1, id: "nazireu" }),
      ] }),
      b(4, { by: "deus", cast: [                                                 // nada da vinha comerá, desde os caroços até à casca
        C("homem", -160, "walk", { dy: 0.5, facing: -1, id: "nazireu" }),
      ] }),
      b(5, { by: "deus", q: "não passará navalha", cast: [                       // navalha não passará pela cabeça: santo ao Senhor
        C("homem", -40, "stand", { dy: 0.54, facing: 1, id: "nazireu" }),
      ] }),
      // v.6-8 — a separação: longe de todo morto, santo ao Senhor
      b(6, { by: "deus", cast: [                                                 // não se aproximará do corpo de um morto
        C("homem", -170, "stand", { dy: 0.48, facing: -1, id: "nazireu" }),
      ] }),
      b(7, { by: "deus", cast: [                                                 // nem por pai, nem por mãe: o luto da própria casa não o toca
        C("homem", -150, "stand", { dy: 0.5, facing: -1, id: "nazireu" }),
        C("anciao", 130, "bow", { dy: 0.48, facing: 1, id: "pai-do-nazireu" }),
        C("mulherComum", 210, "bow", { scale: 0.94, dy: 0.44, facing: 1, id: "mae-do-nazireu" }),
      ] }),
      b(8, { by: "deus", env: { glory: 0.72 }, cast: [                           // "todos os dias do seu nazireado santo será ao Senhor"
        C("homem", -20, "raise", { glow: 0.3, dy: 0.54, facing: 1, id: "nazireu" }),
      ] }),
      // v.9-12 — a contaminação SÚBITA e o recomeço do voto
      b(9, { by: "deus", set: "contaminacao", env: { night: 0.3, glory: 0.5 }, cast: [ // se alguém morrer junto a ele, de repente, contamina a cabeça do voto
        C("anciao", 80, "lie", { dy: 0.55, facing: 1, id: "morto-subito" }),
        C("homem", -50, "kneel", { dy: 0.52, facing: 1, id: "nazireu" }),
      ] }),
      b(10, { by: "deus", set: "porta-da-tenda", props: PORTA_TENDA, env: { terrain: "desert", night: 0.12, glory: 0.62 }, cast: [ // ao oitavo dia: duas rolas ao sacerdote, à porta da tenda
        C("arao", -170, "stand", { glow: 0.25, dy: 0.5, facing: 1 }),
        C("homem", 20, "bow", { dy: 0.54, facing: -1, id: "nazireu" }),
      ] }),
      b(11, { by: "deus", env: { glory: 0.66 }, cast: [                          // um para expiação, outro para holocausto: a cabeça santificada de novo
        C("arao", 0, "raise", { glow: 0.3, dy: 0.52, facing: 1 }),
        C("homem", -110, "kneel", { dy: 0.52, facing: 1, id: "nazireu" }),
      ] }),
      b(12, { by: "deus", cast: [                                                // separará de novo os dias; um cordeiro pela transgressão — os dias antigos caem
        C("homem", -60, "stand", { dy: 0.54, facing: 1, id: "nazireu" }),
        C("arao", -160, "stand", { glow: 0.25, dy: 0.5, facing: 1 }),
        C("rebanho", 180, "stand", { scale: 0.85, dy: 0.44, id: "cordeiro-da-culpa" }),
      ] }),
      // v.13-21 — o FIM do voto: as ofertas, o cabelo cortado e queimado sob o pacífico
      b(13, { by: "deus", set: "fim-do-voto", props: FIM_VOTO, env: { terrain: "desert", glory: 0.66, night: 0.1 }, cast: [ // cumpridos os dias, o trarão à porta da tenda
        C("homem", -200, "walk", { dy: 0.48, facing: 1, id: "nazireu" }),
        C("arao", -60, "stand", { glow: 0.25, dy: 0.52, facing: 1 }),
      ] }),
      b(14, { by: "deus", cast: [                                                // a oferta: cordeiro em holocausto, cordeira em expiação, carneiro em pacífico
        C("homem", -110, "stand", { dy: 0.52, facing: 1, id: "nazireu" }),
        C("rebanho", 200, "stand", { scale: 0.8, dy: 0.46, id: "cordeiro-do-holocausto" }),
        C("rebanho", 275, "stand", { scale: 0.9, dy: 0.4, id: "carneiro-do-pacifico" }),
      ] }),
      b(15, { by: "deus", cast: [                                                // e o CESTO de bolos ázimos amassados com azeite
        C("homem", 110, "walk", { dy: 0.52, facing: 1, id: "nazireu" }),
        C("arao", -80, "point", { glow: 0.25, dy: 0.5, facing: 1 }),
      ] }),
      b(16, { by: "deus", env: { glory: 0.7 }, cast: [                           // o sacerdote os trará perante o Senhor
        C("arao", 0, "raise", { glow: 0.3, dy: 0.52, facing: 1 }),
        C("homem", -120, "kneel", { dy: 0.5, facing: 1, id: "nazireu" }),
      ] }),
      b(17, { by: "deus", props: FIM_VOTO_FOGO, env: { fire: 0.25 }, cast: [     // o carneiro em SACRIFÍCIO PACÍFICO, com o cesto dos ázimos
        C("arao", -40, "stand", { glow: 0.3, dy: 0.52, facing: 1 }),
        C("rebanho", 175, "stand", { scale: 0.9, dy: 0.44, id: "carneiro-do-pacifico" }),
        C("homem", -140, "stand", { dy: 0.5, facing: 1, id: "nazireu" }),
      ] }),
      b(18, { by: "deus", cast: [                                                // o nazireu RAPA a cabeça e põe o cabelo no fogo debaixo do sacrifício
        C("homem", 10, "kneel", { dy: 0.54, facing: 1, id: "nazireu" }),
        C("arao", -100, "stand", { glow: 0.3, dy: 0.5, facing: 1 }),
      ] }),
      b(19, { by: "deus", cast: [                                                // a espádua cozida e os pães postos nas MÃOS do nazireu já rapado
        C("arao", -50, "point", { glow: 0.3, dy: 0.52, facing: 1 }),
        C("homem", 40, "raise", { dy: 0.54, facing: -1, id: "nazireu" }),
      ] }),
      b(20, { by: "deus", props: VINHO_LIBERTO, env: { fire: 0, glory: 0.74 }, cast: [ // oferta movida perante o Senhor — e DEPOIS o nazireu pode beber vinho
        C("arao", -30, "raise", { glow: 0.32, dy: 0.52, facing: 1 }),
        C("homem", 70, "stand", { glow: 0.2, dy: 0.54, facing: -1, id: "nazireu" }),
      ] }),
      b(21, { by: "deus", env: { glory: 0.7 }, cast: [                           // esta é a LEI DO NAZIREU, conforme o seu voto
        C("moises", -180, "stand", { dy: 0.5, facing: 1 }),
        C("arao", -90, "stand", { glow: 0.28, dy: 0.5, facing: 1 }),
        C("homem", 60, "stand", { dy: 0.54, facing: -1, id: "nazireu" }),
      ] }),
      // v.22-27 — A BÊNÇÃO SACERDOTAL.
      b(22, { by: "deus", cast: [                                                // o Senhor fala a Moisés
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
        C("arao", 40, "stand", { glow: 0.3, dy: 0.52, facing: -1 }),
      ] }),
      b(23, { by: "deus", q: "Assim abençoareis os filhos de Israel", env: { glory: 0.75 }, cast: [ // "Assim abençoareis os filhos de Israel"
        C("arao", -20, "raise", { glow: 0.4, dy: 0.52, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.46 }),
      ] }),
      b(24, { by: "arao", q: "O Senhor te abençoe e te guarde", env: { glory: 0.85 }, cast: [ // "O SENHOR TE ABENÇOE E TE GUARDE"
        C("arao", -30, "raise", { glow: 0.5, dy: 0.5, facing: 1 }),
        C("multidao", 120, "bow", { dy: 0.46 }),
      ] }),
      b(25, { by: "arao", q: "faça resplandecer o seu rosto sobre ti", env: { glory: 0.92 }, cast: [ // "faça RESPLANDECER o seu rosto sobre ti"
        C("arao", -30, "raise", { glow: 0.55, dy: 0.5, facing: 1 }),
        C("multidao", 120, "bow", { dy: 0.46 }),
      ] }),
      b(26, { by: "arao", q: "te dê a paz", env: { glory: 0.98 }, cast: [         // "levante sobre ti o seu rosto, e te dê a PAZ"
        C("arao", -30, "raise", { glow: 0.6, dy: 0.5, facing: 1 }),
        C("multidao", 120, "bow", { dy: 0.46 }),
        C("multidao", 210, "bow", { scale: 0.9, dy: 0.42, id: "povo2" }),
      ] }),
      b(27, { by: "deus", q: "porão o meu nome sobre os filhos de Israel", env: { glory: 0.9 }, cast: [ // "porão o meu NOME sobre eles, e eu os abençoarei"
        C("arao", -30, "stand", { glow: 0.5, dy: 0.5, facing: 1 }),
        C("multidao", 120, "stand", { dy: 0.46 }),
      ] }),
    ],
  },
};
