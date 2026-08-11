// ============================================================================
// NÚMEROS 15–16 — CENA VIVA. Leis de ofertas na terra; a rebelião de Coré.
//
// Nm 15 — LEIS DE OFERTAS E LIBAÇÕES para quando entrarem na terra; o pecado
// por ignorância (perdoado) contra o pecado feito TEMERARIAMENTE, de mão
// levantada (extirpado). O homem que APANHA LENHA no SÁBADO é levado a Moisés e
// APEDREJADO fora do arraial (juízo). E as FRANJAS nas bordas das vestes, com um
// cordão de AZUL, para que, vendo-as, se lembrem dos mandamentos do Senhor.
//
// Nm 16 — A REBELIÃO DE CORÉ, DATÃ E ABIRÃO: 250 príncipes com incensários
// desafiam Moisés e Arão. A glória do Senhor aparece; a TERRA ABRE A BOCA e
// engole Coré, Datã, Abirão e suas casas, que descem vivos ao abismo; e FOGO do
// Senhor consome os 250. No dia seguinte o povo murmura e vem a PRAGA; Arão
// corre com o INCENSÁRIO e se põe ENTRE OS MORTOS E OS VIVOS, e a praga cessa.
//
// A VOZ DE DEUS (regra do projeto): a lei e a sentença vêm do alto (`by:"deus"`)
// com glória no ambiente, sem figura; quando Moisés/Arão falam em nome de Deus,
// o `by` é o personagem. No juízo (sábado, terra aberta, fogo, praga) a glória
// baixa e entram nuvem escura, noite, fogo consumidor e rocha.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const dv = (v: number) => b(v, { by: "deus" });

// O arraial em paz: o tabernáculo ao centro, tendas, palmeira e poço.
const ARRAIAL: StagePropSpec[] = [
  { ...P("tent", -20, 1.5, undefined, 0.1), tag: "tabernaculo" },
  P("tent", -270, 1.0, undefined, 0.2),
  P("tent", 240, 1.0, undefined, 0.22),
  P("palm", -320, 1.05, undefined, 0.14),
  P("well", 320, 1.0, undefined, 0.5),
  P("grass", -60, 0.82, undefined, 0.82),
  P("grass", 70, 0.78, undefined, 0.74),
];

// O SÁBADO PROFANADO (Nm 15:32-36): céu carregado, rochas do apedrejamento.
const SABADO: StagePropSpec[] = [
  { ...P("clouds", -170, 1.4, undefined, 0.68), sky: true },
  { ...P("clouds", 150, 1.3, undefined, 0.6), sky: true },
  P("rock", -40, 1.05, undefined, 0.56),
  P("rock", 130, 0.9, undefined, 0.6),
  P("rock", 230, 0.7, undefined, 0.44),
  P("palm", -330, 1.0, undefined, 0.14),
];

// A ASSEMBLEIA DA REBELIÃO (Nm 16): porta da tenda, altar e incensários fumegando.
const ASSEMBLEIA: StagePropSpec[] = [
  { ...P("tent", -30, 1.5, undefined, 0.1), tag: "tabernaculo" },
  { ...P("altar", 150, 0.9, undefined, 0.5), tag: "altar" },
  P("censer", -130, 0.8, 0.6, 0.6),
  P("censer", 70, 0.8, 0.6, 0.62),
  P("censer", 210, 0.8, 0.6, 0.58),
  P("palm", -330, 1.0, undefined, 0.14),
  P("grass", -70, 0.8, undefined, 0.82),
];

// A TERRA ABRE A BOCA (Nm 16:31-34): abismo, nuvem negra, fenda de rocha.
const ABISMO: StagePropSpec[] = [
  { ...P("clouds", -190, 1.5, undefined, 0.7), sky: true },
  { ...P("clouds", 130, 1.6, undefined, 0.62), sky: true },
  P("rock", -70, 1.15, undefined, 0.56),
  P("rock", 150, 1.0, undefined, 0.62),
  P("rock", -240, 0.8, undefined, 0.4),
];

// O FOGO DO SENHOR (Nm 16:35): fogo consumidor grande entre os corpos dos 250.
const FOGO: StagePropSpec[] = [
  { ...P("tent", -50, 1.4, undefined, 0.1), tag: "tabernaculo" },
  P("campfire", 70, 2.0, 1, 0.5),
  P("campfire", 150, 2.15, 1, 0.52),
  P("campfire", 220, 1.95, 1, 0.48),
  P("censer", -150, 0.75, 0, 0.6),
  { ...P("clouds", 30, 1.4, undefined, 0.72), sky: true },
];

// A PRAGA (Nm 16:41-50): nuvem sobre a tenda, fogo do altar, dia sombrio.
const PRAGA: StagePropSpec[] = [
  { ...P("tent", -30, 1.45, undefined, 0.1), tag: "tabernaculo" },
  { ...P("clouds", -150, 1.5, undefined, 0.7), sky: true },
  { ...P("clouds", 170, 1.4, undefined, 0.6), sky: true },
  P("campfire", 210, 1.0, 0.7, 0.55),
  P("grass", -70, 0.78, undefined, 0.82),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Nm 15
  15: {
    start: { terrain: "desert", night: 0.1, glory: 0.6, storm: 0, fire: 0, verdure: 0.2 },
    beats: [
      b(1, { by: "deus", props: ARRAIAL, env: { terrain: "desert", glory: 0.62, night: 0.1, verdure: 0.2 }, cast: [ // o Senhor fala a Moisés
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(2, { by: "deus", q: "Quando entrardes na terra das vossas habitações" }), // quando entrardes na terra que vos hei de dar
      dv(3), dv(4), dv(5), dv(6), dv(7), dv(8), dv(9), dv(10), dv(11), dv(12),    // as ofertas de alimentos e as libações
      dv(13), dv(14), dv(15), dv(16),                                            // um mesmo estatuto para o natural e o estrangeiro
      b(17, { by: "deus", cast: [ C("moises", -150, "kneel", { dy: 0.5, facing: 1 }) ] }), // o Senhor fala outra vez a Moisés
      dv(18), dv(19), dv(20), dv(21), dv(22), dv(23), dv(24), dv(25), dv(26), dv(27), dv(28), dv(29),
      b(30, { by: "deus", q: "temerariamente" }),                                // o pecado de MÃO LEVANTADA: injuria ao Senhor
      dv(31),                                                                    // desprezou a palavra do Senhor: será extirpada
      // v.32-36 — O HOMEM QUE APANHA LENHA NO SÁBADO É APEDREJADO.
      b(32, { set: "sabado", props: SABADO, env: { terrain: "desert", night: 0.5, glory: 0.12, verdure: 0.12 }, q: "apanhando lenha no dia de sábado", cast: [ // acharam um homem apanhando lenha no sábado
        C("homem", 30, "kneel", { dy: 0.56, facing: -1, id: "lenhador" }),
        C("multidao", 180, "stand", { dy: 0.46 }),
      ] }),
      b(33, { q: "o trouxeram a Moisés e a Arão", cast: [                         // o levam a Moisés, a Arão e à congregação
        C("moises", -180, "stand", { dy: 0.5, facing: 1 }),
        C("arao", -120, "stand", { glow: 0.2, dy: 0.5, facing: 1 }),
        C("homem", 20, "stand", { dy: 0.54, facing: -1, id: "lenhador" }),
        C("multidao", 170, "stand", { dy: 0.46 }),
      ] }),
      b(34, { q: "E o puseram em guarda", cast: [                                 // posto em guarda, pois não estava declarado
        C("homem", 20, "kneel", { dy: 0.56, facing: -1, id: "lenhador" }),
        C("multidao", 170, "stand", { dy: 0.46 }),
      ] }),
      b(35, { by: "deus", q: "o apedrejará fora do arraial", env: { glory: 0.15, night: 0.42 }, cast: [ // a SENTENÇA do alto: certamente morrerá
        C("moises", -180, "stand", { dy: 0.5, facing: 1 }),
        C("homem", 20, "kneel", { dy: 0.56, facing: -1, id: "lenhador" }),
      ] }),
      b(36, { q: "o apedrejaram, e morreu", env: { glory: 0.1, night: 0.52 }, cast: [ // toda a congregação o apedreja fora do arraial
        C("homem", 30, "lie", { dy: 0.6, facing: -1, id: "lenhador" }),
        C("servo", 140, "raise", { dy: 0.46, facing: -1, id: "apedrejadorA" }),
        C("servo", 200, "point", { dy: 0.44, facing: -1, id: "apedrejadorB" }),
        C("servo", 258, "raise", { scale: 0.9, dy: 0.42, facing: -1, id: "apedrejadorC" }),
      ] }),
      // v.37-41 — AS FRANJAS COM O CORDÃO DE AZUL.
      b(37, { by: "deus", set: "arraial", props: ARRAIAL, env: { terrain: "desert", glory: 0.58, night: 0.1, verdure: 0.2 }, cast: [ // o Senhor fala a Moisés
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(38, { by: "deus", q: "ponham um cordão de azul", cast: [                  // FRANJAS nas bordas, com um cordão de AZUL
        C("homem", -30, "stand", { dy: 0.54, facing: 1, id: "franjas", palette: "azul" }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
      b(39, { by: "deus", q: "vos lembreis de todos os mandamentos do Senhor" }), // vendo-as, lembrar-se dos mandamentos
      dv(40),                                                                     // santos sereis ao vosso Deus
      b(41, { by: "deus", q: "Eu sou o Senhor vosso Deus", env: { glory: 0.66 }, cast: [ // "Eu sou o Senhor vosso Deus, que vos tirei do Egito"
        C("multidao", 130, "stand", { dy: 0.46 }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Nm 16
  16: {
    start: { terrain: "desert", night: 0.14, glory: 0.5, storm: 0, fire: 0, verdure: 0.2 },
    beats: [
      b(1, { set: "assembleia", props: ASSEMBLEIA, env: { terrain: "desert", night: 0.14, glory: 0.5, verdure: 0.2 }, cast: [ // Coré toma consigo Datã e Abirão
        C("servo", -30, "stand", { dy: 0.52, facing: -1, id: "core" }),
        C("homem", 60, "stand", { dy: 0.5, facing: -1, id: "data" }),
        C("homem", 130, "stand", { dy: 0.48, facing: -1, id: "abirao" }),
      ] }),
      b(2, { q: "duzentos e cinqüenta homens", cast: [                            // 250 príncipes da congregação se levantam
        C("servo", -60, "stand", { dy: 0.52, facing: -1, id: "core" }),
        C("homem", 20, "stand", { dy: 0.5, facing: -1, id: "data" }),
        C("multidao", 160, "stand", { dy: 0.46 }),
        C("multidao", 250, "stand", { scale: 0.9, dy: 0.42, id: "principes2" }),
      ] }),
      b(3, { by: "multidao", q: "vos elevais sobre a congregação do Senhor", cast: [ // congregam-se contra Moisés e Arão
        C("moises", -200, "stand", { dy: 0.5, facing: 1 }),
        C("arao", -140, "stand", { glow: 0.25, dy: 0.5, facing: 1 }),
        C("servo", 20, "point", { dy: 0.52, facing: -1, id: "core" }),
        C("multidao", 170, "stand", { dy: 0.46 }),
      ] }),
      b(4, { q: "caiu sobre o seu rosto", cast: [                                 // Moisés ouve e cai sobre o seu rosto
        C("moises", -120, "bow", { dy: 0.52, facing: 1 }),
        C("arao", -60, "stand", { glow: 0.25, dy: 0.5, facing: 1 }),
        C("servo", 60, "stand", { dy: 0.52, facing: -1, id: "core" }),
      ] }),
      b(5, { by: "moises", q: "o Senhor fará saber quem é seu", cast: [           // amanhã o Senhor fará saber quem é seu
        C("moises", -100, "point", { dy: 0.52, facing: 1 }),
        C("servo", 60, "stand", { dy: 0.52, facing: -1, id: "core" }),
      ] }),
      b(6, { by: "moises", q: "Tomai vós incensários" }),                         // "Tomai vós incensários, Coré e todo o teu grupo"
      b(7, { by: "moises", q: "basta-vos, filhos de Levi" }),                     // o que o Senhor escolher, esse é o santo
      b(8, { by: "moises", q: "Ouvi agora, filhos de Levi", cast: [              // "Ouvi agora, filhos de Levi"
        C("moises", -100, "point", { dy: 0.52, facing: 1 }),
        C("servo", 60, "stand", { dy: 0.52, facing: -1, id: "core" }),
      ] }),
      b(9, { by: "moises" }),                                                     // pouco vos é Deus vos ter separado?
      b(10, { by: "moises", q: "procurais o sacerdócio" }),                       // ainda buscais também o sacerdócio?
      b(11, { by: "moises", q: "estais contra o Senhor" }),                       // vós estais contra o Senhor
      b(12, { q: "Não subiremos", cast: [                                        // Moisés chama Datã e Abirão: "Não subiremos"
        C("moises", -180, "stand", { dy: 0.5, facing: 1 }),
        C("homem", 40, "stand", { dy: 0.5, facing: 1, id: "data" }),
        C("homem", 120, "stand", { dy: 0.48, facing: 1, id: "abirao" }),
      ] }),
      b(13, { by: "homem", q: "para nos matares neste deserto", cast: [          // acusam Moisés de os matar no deserto
        C("homem", 40, "point", { dy: 0.5, facing: 1, id: "data" }),
        C("homem", 120, "stand", { dy: 0.48, facing: 1, id: "abirao" }),
        C("moises", -180, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(14, { by: "homem", q: "Não subiremos." }),                               // "Não subiremos" (repetido, com desprezo)
      b(15, { by: "moises", q: "Não atentes para a sua oferta", env: { glory: 0.52 }, cast: [ // Moisés irado clama ao Senhor
        C("moises", -60, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      b(16, { by: "moises", q: "ponde-vos perante o Senhor", cast: [             // ponde-vos perante o Senhor, tu, eles e Arão
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("servo", 40, "stand", { dy: 0.52, facing: -1, id: "core" }),
      ] }),
      b(17, { by: "moises", q: "duzentos e cinqüenta incensários", cast: [       // cada um tome o seu incensário: 250
        C("servo", 40, "stand", { dy: 0.52, facing: -1, id: "core" }),
        C("multidao", 170, "stand", { dy: 0.46 }),
      ] }),
      b(18, { q: "puseram fogo, e neles deitaram incenso", env: { fire: 0.35, glory: 0.55 }, cast: [ // à porta da tenda, com Moisés e Arão
        C("moises", -200, "stand", { dy: 0.5, facing: 1 }),
        C("arao", -140, "stand", { glow: 0.3, dy: 0.5, facing: 1 }),
        C("servo", 40, "stand", { dy: 0.52, facing: -1, id: "core" }),
        C("multidao", 180, "stand", { dy: 0.46 }),
      ] }),
      b(19, { q: "a glória do Senhor apareceu a toda a congregação", env: { glory: 0.9, night: 0.06 }, cast: [ // a GLÓRIA do Senhor aparece
        C("moises", -200, "stand", { dy: 0.5, facing: 1 }),
        C("arao", -140, "stand", { glow: 0.4, dy: 0.5, facing: 1 }),
        C("multidao", 170, "stand", { dy: 0.46 }),
      ] }),
      b(20, { by: "deus", env: { glory: 0.9 }, cast: [                            // o Senhor fala a Moisés e a Arão
        C("moises", -160, "kneel", { dy: 0.5, facing: 1 }),
        C("arao", -100, "kneel", { glow: 0.4, dy: 0.5, facing: 1 }),
      ] }),
      b(21, { by: "deus", q: "os consumirei num momento", env: { glory: 0.92 } }), // "apartai-vos… e os consumirei num momento"
      b(22, { by: "moises", q: "Deus dos espíritos de toda a carne", env: { glory: 0.88 }, cast: [ // prostram-se: "pecará um só homem?"
        C("moises", -120, "bow", { dy: 0.52, facing: 1 }),
        C("arao", -60, "bow", { glow: 0.4, dy: 0.5, facing: 1 }),
      ] }),
      b(23, { by: "deus", env: { glory: 0.85 } }),                                // o Senhor fala a Moisés
      b(24, { by: "deus", q: "Subi do derredor da habitação de Coré", env: { glory: 0.7, night: 0.2 } }), // afastai-vos da habitação de Coré
      b(25, { set: "abismo", props: ABISMO, env: { terrain: "abyss", glory: 0.3, night: 0.55, storm: 0.4, verdure: 0.05 }, q: "seguiram os anciãos de Israel", cast: [ // Moisés vai a Datã e Abirão, os anciãos o seguem
        C("moises", -120, "walk", { dy: 0.5, facing: -1 }),
        C("anciao", -200, "walk", { dy: 0.48, facing: -1 }),
        C("homem", 90, "stand", { dy: 0.5, facing: 1, id: "data" }),
        C("homem", 160, "stand", { dy: 0.48, facing: 1, id: "abirao" }),
      ] }),
      b(26, { by: "moises", q: "não toqueis nada do que é seu", cast: [           // "desviai-vos das tendas destes homens ímpios"
        C("moises", -120, "point", { dy: 0.5, facing: -1 }),
        C("multidao", -230, "walk", { dy: 0.46 }),
        C("homem", 90, "stand", { dy: 0.5, facing: 1, id: "data" }),
        C("homem", 160, "stand", { dy: 0.48, facing: 1, id: "abirao" }),
      ] }),
      b(27, { q: "à porta das suas tendas", env: { night: 0.62, storm: 0.5 }, cast: [ // Datã e Abirão à porta das tendas com suas casas
        C("homem", 60, "stand", { dy: 0.52, facing: 1, id: "data" }),
        C("homem", 130, "stand", { dy: 0.5, facing: 1, id: "abirao" }),
        C("multidao", 210, "stand", { scale: 0.85, dy: 0.44, id: "casas" }),
        C("moises", -160, "stand", { dy: 0.5, facing: -1 }),
      ] }),
      b(28, { by: "moises", q: "Nisto conhecereis que o Senhor me enviou", cast: [ // "nisto conhecereis que o Senhor me enviou"
        C("moises", -160, "raise", { dy: 0.5, facing: -1 }),
        C("homem", 80, "stand", { dy: 0.52, facing: 1, id: "data" }),
      ] }),
      b(29, { by: "moises" }),                                                    // se morrerem como todos, o Senhor não me enviou
      b(30, { by: "moises", q: "a terra abrir a sua boca e os tragar", env: { night: 0.72, storm: 0.7, glory: 0.08 }, cast: [ // profecia: a TERRA abrirá a boca e os tragará
        C("moises", -170, "point", { dy: 0.5, facing: -1 }),
        C("homem", 70, "stand", { dy: 0.52, facing: 1, id: "data" }),
        C("homem", 140, "stand", { dy: 0.5, facing: 1, id: "abirao" }),
      ] }),
      b(31, { q: "a terra que estava debaixo deles se fendeu", env: { terrain: "abyss", night: 0.85, storm: 1, glory: 0.05, verdure: 0 }, cast: [ // a terra debaixo deles se FENDE
        C("servo", -20, "kneel", { dy: 0.62, facing: 1, id: "core" }),
        C("homem", 70, "kneel", { dy: 0.6, facing: 1, id: "data" }),
        C("homem", 140, "kneel", { dy: 0.58, facing: 1, id: "abirao" }),
      ] }),
      b(32, { q: "a terra abriu a sua boca, e os tragou com as suas casas", env: { night: 0.88, storm: 1 }, cast: [ // engole-os com as suas casas
        C("servo", -20, "lie", { scale: 0.85, dy: 0.72, facing: 1, id: "core" }),
        C("homem", 60, "lie", { scale: 0.8, dy: 0.7, facing: 1, id: "data" }),
        C("homem", 130, "lie", { scale: 0.8, dy: 0.68, facing: 1, id: "abirao" }),
        C("mulherComum", 200, "lie", { scale: 0.7, dy: 0.66, id: "casaData" }),
        C("mulherComum", 252, "lie", { scale: 0.66, dy: 0.64, id: "casaAbirao" }),
        C("servo", 302, "lie", { scale: 0.68, dy: 0.62, id: "casaCore" }),
      ] }),
      b(33, { q: "desceram vivos ao abismo", env: { night: 0.9 }, cast: [        // descem VIVOS ao abismo; a terra os cobre
        C("servo", 0, "lie", { scale: 0.65, dy: 0.82, facing: 1, id: "core" }),
        C("homem", 70, "lie", { scale: 0.6, dy: 0.8, facing: 1, id: "data" }),
      ] }),
      b(34, { q: "fugiu ao clamor deles", env: { night: 0.82 }, cast: [          // todo o Israel foge ao clamor deles
        C("multidao", -60, "walk", { dy: 0.5, facing: 1 }),
        C("multidao", 90, "walk", { dy: 0.46, facing: 1, id: "povo2" }),
        C("moises", -220, "stand", { dy: 0.5, facing: -1 }),
      ] }),
      b(35, { set: "fogo", props: FOGO, env: { terrain: "desert", night: 0.7, glory: 0.1, storm: 0.3, fire: 1, verdure: 0.05 }, q: "saiu fogo do Senhor", cast: [ // FOGO do Senhor consome os 250
        C("homem", 100, "lie", { dy: 0.6 }),
        C("homem", 180, "lie", { dy: 0.56, scale: 0.9 }),
        C("servo", 240, "lie", { dy: 0.52, id: "q250" }),
        C("moises", -220, "stand", { dy: 0.5, facing: -1 }),
      ] }),
      b(36, { by: "deus", env: { glory: 0.4 } }),                                 // o Senhor fala a Moisés
      b(37, { by: "deus", q: "que tome os incensários do meio do incêndio", cast: [ // Eleazar recolhe os incensários do incêndio
        C("servo", 60, "kneel", { glow: 0.2, dy: 0.56, facing: -1, id: "eleazar" }),
        C("anciao", 170, "lie", { dy: 0.58, id: "principeIncensarioA" }),
        C("anciao", 238, "lie", { scale: 0.9, dy: 0.56, id: "principeIncensarioB" }),
      ] }),
      b(38, { by: "deus", q: "cobertura do altar" }),                             // dos incensários se façam folhas para o altar
      b(39, { q: "os incensários de metal", cast: [                              // Eleazar os estende em folhas sobre o altar
        C("servo", 40, "kneel", { glow: 0.2, dy: 0.56, facing: -1, id: "eleazar" }),
      ] }),
      b(40, { q: "que nenhum estranho" }),                                        // memorial: nenhum estranho acenda incenso
      // v.41-50 — A MURMURAÇÃO, A PRAGA, E ARÃO ENTRE OS MORTOS E OS VIVOS.
      b(41, { set: "praga", props: PRAGA, env: { terrain: "desert", night: 0.48, glory: 0.15, storm: 0.2, fire: 0.3, verdure: 0.12 }, q: "Vós matastes o povo do Senhor", cast: [ // no dia seguinte o povo murmura
        C("multidao", 120, "point", { dy: 0.48 }),
        C("multidao", 210, "stand", { scale: 0.9, dy: 0.44, id: "povo2" }),
        C("moises", -200, "stand", { dy: 0.5, facing: 1 }),
        C("arao", -140, "stand", { glow: 0.25, dy: 0.5, facing: 1 }),
      ] }),
      b(42, { q: "a glória do Senhor apareceu", env: { glory: 0.7, night: 0.3 }, cast: [ // a nuvem cobre a tenda e a glória aparece
        C("moises", -200, "stand", { dy: 0.5, facing: 1 }),
        C("arao", -140, "stand", { glow: 0.35, dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
      b(43, { q: "perante a tenda da congregação", cast: [                        // Moisés e Arão vêm perante a tenda
        C("moises", -80, "stand", { dy: 0.5, facing: -1 }),
        C("arao", -20, "stand", { glow: 0.35, dy: 0.5, facing: -1 }),
      ] }),
      b(44, { by: "deus", env: { glory: 0.68 } }),                                // o Senhor fala a Moisés
      b(45, { by: "deus", q: "a consumirei num momento", env: { glory: 0.6, night: 0.4 }, cast: [ // "levantai-vos… e a consumirei num momento"
        C("moises", -80, "bow", { dy: 0.52, facing: -1 }),
        C("arao", -20, "bow", { glow: 0.35, dy: 0.5, facing: -1 }),
      ] }),
      b(46, { by: "moises", q: "já começou a praga", env: { glory: 0.2, night: 0.5 }, cast: [ // Moisés a Arão: toma o incensário, já começou a PRAGA
        C("moises", -110, "point", { dy: 0.5, facing: 1 }),
        C("arao", -30, "stand", { glow: 0.5, dy: 0.5, facing: 1, id: "arao" }),
      ] }),
      b(47, { q: "correu ao meio da congregação", props: [                        // Arão CORRE ao meio da congregação com o incensário
        ...PRAGA,
        P("censer", 30, 0.85, 0.9, 0.5),
      ], env: { night: 0.55 }, cast: [
        C("arao", 40, "walk", { glow: 0.6, dy: 0.5, facing: -1, id: "arao" }),
        C("multidao", 260, "kneel", { scale: 0.9, dy: 0.5, id: "vivos" }),
      ] }),
      b(48, { q: "entre os mortos e os vivos; e cessou a praga", props: [         // ARÃO ENTRE OS MORTOS E OS VIVOS: a praga cessa
        ...PRAGA,
        P("censer", 20, 0.85, 0.9, 0.5),
      ], env: { glory: 0.35, night: 0.5 }, cast: [
        C("homem", -160, "lie", { dy: 0.56 }),
        C("mulherComum", -90, "lie", { dy: 0.5 }),
        C("arao", 0, "raise", { glow: 0.75, dy: 0.5, facing: 1, id: "arao" }),
        C("pastor", 140, "kneel", { dy: 0.52, facing: -1, id: "vivoA" }),
        C("patriarca", 200, "bow", { dy: 0.5, facing: -1, id: "vivoB" }),
        C("pastor", 256, "kneel", { scale: 0.9, dy: 0.46, facing: -1, id: "vivoC" }),
      ] }),
      b(49, { q: "catorze mil e setecentos", env: { night: 0.46 }, cast: [        // morreram 14.700, fora os da causa de Coré
        C("arao", -20, "stand", { glow: 0.6, dy: 0.5, facing: 1, id: "arao" }),
        C("homem", -160, "lie", { dy: 0.56 }),
        C("mulherComum", -90, "lie", { dy: 0.5 }),
        C("pastor", 140, "kneel", { dy: 0.5, facing: -1, id: "vivoA" }),
        C("patriarca", 205, "bow", { dy: 0.48, facing: -1, id: "vivoB" }),
      ] }),
      b(50, { q: "cessou a praga", env: { glory: 0.5, night: 0.28 }, cast: [      // Arão volta a Moisés à porta da tenda: a praga cessou
        C("arao", 30, "walk", { glow: 0.45, dy: 0.5, facing: 1, id: "arao" }),
        C("moises", -150, "stand", { dy: 0.5, facing: -1 }),
        C("multidao", 190, "stand", { dy: 0.46, id: "vivos" }),
      ] }),
    ],
  },
};
