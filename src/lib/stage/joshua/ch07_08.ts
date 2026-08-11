// ============================================================================
// JOSUÉ 7–8 — CENA VIVA. O PECADO DE ACÃ e a conquista de AI.
//
// Js 7 — O ANÁTEMA DE ACÃ: um só homem, Acã, tomou do anátema de Jericó (a capa
// babilônica, a prata, a cunha de ouro) e escondeu-o na sua tenda; por isso a ira
// do SENHOR se acende, e Israel é DERROTADO em Ai — trinta e seis mortos, o
// coração do povo derretido como água. Josué RASGA as vestes e se prostra diante
// da ARCA até à tarde. Deus revela o pecado; pelas sortes Acã é achado, confessa,
// e no VALE DE ACOR é apedrejado e queimado — um grande montão de pedras. JUÍZO:
// noite alta, glória baixa, fogo do campfire, figuras INDIVIDUAIS, NUNCA multidão
// festiva, NUNCA glow em Acã.
//
// Js 8 — A EMBOSCADA DE AI: Deus manda subir de novo, sem temer. Josué põe
// EMBOSCADA por detrás da cidade, finge fugir, atrai os homens de Ai para fora, e
// ao ESTENDER a lança a emboscada toma e QUEIMA a cidade (a fumaça sobe ao céu).
// O rei de Ai é ENFORCADO num madeiro. Depois, no monte EBAL, Josué edifica um
// ALTAR, escreve a Lei em pedras, e lê a BÊNÇÃO e a MALDIÇÃO entre os dois montes
// (Ebal e Gerizim).
//
// A VOZ DE DEUS (regra do projeto): Deus fala DIRETO a Josué (oráculo, sem
// mediador visível): `by:"deus"`, voz do céu, glória, sem figura. Quando JOSUÉ
// fala, `by:"servo"` e Josué (`servo` id:"josue") é o PRIMEIRO servo do cast.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const jv = (v: number, q?: string) => b(v, { by: "servo", ...(q ? { q } : {}) }); // Josué fala
const dv = (v: number, q?: string) => b(v, { by: "deus", ...(q ? { q } : {}) });   // voz do céu

// O ARRAIAL DE GILGAL — a cena-base em Canaã: as tendas de Israel, o Jordão ao
// fundo, palmeiras e o chão da planície.
const GILGAL: StagePropSpec[] = [
  P("river", 0, 1.4, undefined, 0.86),
  P("tent", -230, 1.05, undefined, 0.2),
  P("tent", 220, 1.0, undefined, 0.24),
  P("palm", -320, 1.05, undefined, 0.14),
  P("grass", 80, 0.78, undefined, 0.68),
];
// AI — a cidade cananeia entre Betel e Bete-Áven: torres e muros a espiar.
const AI_CIDADE: StagePropSpec[] = [
  P("tower", -130, 1.28, undefined, 0.24),
  P("church", 150, 1.15, undefined, 0.3),
  P("rock", 305, 1.1, undefined, 0.32),
  P("grass", -50, 0.76, undefined, 0.78),
];
// A ARCA — Josué prostrado diante dela, na angústia da derrota (tarde, cinzas).
const ARCA: StagePropSpec[] = [
  { ...P("ark", 0, 1.25, undefined, 0.34), tag: "arca-do-senhor" },
  P("tent", -240, 1.0, undefined, 0.2),
  P("tent", 230, 0.98, undefined, 0.24),
  P("campfire", 250, 0.9, 0.5, 0.62),
];
// A TENDA DE ACÃ — o anátema escondido: o despojo enterrado no meio da tenda.
const TENDA_ACA: StagePropSpec[] = [
  { ...P("tent", 40, 1.35, undefined, 0.32), tag: "tenda-de-aca" },
  P("crate", 90, 0.85, undefined, 0.66),
  P("amphora", -30, 0.7, undefined, 0.6),
  P("rock", 300, 1.05, undefined, 0.3),
];
// O VALE DE ACOR — o lugar do juízo: o montão de pedras sobre Acã.
const ACOR: StagePropSpec[] = [
  { ...P("rock", 30, 1.6, undefined, 0.5), tag: "montao-de-acor" },
  P("rock", -170, 1.15, undefined, 0.42),
  P("rock", 200, 1.1, undefined, 0.36),
  P("campfire", 130, 1.0, 0.85, 0.58),
  P("grass", -80, 0.72, undefined, 0.7),
];
// O MONTE EBAL — o altar de pedras inteiras e a leitura da Lei entre os montes.
const EBAL: StagePropSpec[] = [
  { ...P("altar", 0, 1.35, undefined, 0.4), tag: "altar-de-ebal" },
  P("rock", -220, 1.3, undefined, 0.5),
  P("rock", 230, 1.25, undefined, 0.52),
  P("scroll", -70, 0.9, undefined, 0.58),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Js 7
  7: {
    start: { terrain: "field", night: 0.2, glory: 0.4, storm: 0, fire: 0, verdure: 0.32 },
    beats: [
      // v.1 — A TRANSGRESSÃO: Acã toma do anátema; a ira do Senhor se acende.
      b(1, { q: "a ira do SENHOR se acendeu contra os filhos de Israel", props: GILGAL,
        env: { terrain: "field", glory: 0.3, night: 0.34, storm: 0.1, verdure: 0.28 }, cast: [
        C("homem", 60, "stand", { dy: 0.5, facing: -1, id: "aca" }),
      ] }),
      // v.2 — Josué envia homens a espiar Ai.
      b(2, { by: "servo", q: "Subi, e espiai a terra", set: "ai", props: AI_CIDADE,
        env: { terrain: "city", glory: 0.42, night: 0.18, verdure: 0.2 }, cast: [
        C("servo", -150, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("homem", 40, "walk", { dy: 0.52, facing: -1, id: "espia1" }),
        C("homem", 130, "walk", { dy: 0.5, facing: -1, id: "espia2" }),
      ] }),
      // v.3 — os espias voltam: "Não suba todo o povo... poucos são".
      b(3, { by: "homem", q: "Não suba todo o povo", cast: [
        C("homem", 60, "point", { dy: 0.52, facing: 1, id: "espia1" }),
        C("servo", -140, "stand", { dy: 0.5, facing: 1, id: "josue" }),
      ] }),
      // v.4 — sobem uns três mil, e FOGEM diante dos homens de Ai.
      b(4, { q: "os quais fugiram diante dos homens de Ai", env: { terrain: "city", glory: 0.24, night: 0.42, storm: 0.12 }, cast: [
        C("homem", -100, "walk", { dy: 0.5, facing: 1, id: "fugitivo1" }),
        C("homem", -20, "walk", { dy: 0.54, facing: 1, id: "fugitivo2" }),
        C("homem", 160, "stand", { dy: 0.48, facing: -1, id: "aiense" }),
      ] }),
      // v.5 — ferem uns 36; o coração do povo se derrete como água. JUÍZO/DERROTA.
      b(5, { q: "se derreteu e se tornou como água", env: { terrain: "city", glory: 0.16, night: 0.55, storm: 0.14 }, cast: [
        C("homem", -110, "lie", { dy: 0.6, id: "morto1" }),
        C("mulherComum", -20, "bow", { dy: 0.54, id: "chorosa" }),
        C("homem", 80, "lie", { dy: 0.58, id: "morto2" }),
      ] }),
      // v.6 — Josué RASGA as vestes e se prostra diante da ARCA; pó nas cabeças.
      b(6, { q: "se prostrou em terra sobre o seu rosto perante a arca do Senhor", set: "arca", props: ARCA,
        env: { terrain: "field", glory: 0.22, night: 0.5, fire: 0.08, verdure: 0.2 }, cast: [
        C("servo", -40, "bow", { dy: 0.56, facing: 1, id: "josue" }),
        C("anciao", 120, "kneel", { dy: 0.58, facing: -1, id: "ancioes" }),
      ] }),
      // v.7 — o clamor de Josué: "Por que fizeste passar a este povo o Jordão?".
      b(7, { by: "servo", q: "fizeste passar a este povo o Jordão", env: { glory: 0.2, night: 0.5 }, cast: [
        C("servo", -30, "kneel", { dy: 0.54, facing: 1, id: "josue" }),
      ] }),
      // v.8 — "Israel virou as costas diante dos inimigos!".
      b(8, { by: "servo", q: "Israel virou as costas diante dos inimigos", cast: [
        C("servo", -30, "bow", { dy: 0.56, facing: 1, id: "josue" }),
      ] }),
      // v.9 — "e então que farás ao teu grande nome?".
      b(9, { by: "servo", q: "que farás ao teu grande nome", cast: [
        C("servo", -30, "raise", { dy: 0.54, facing: 1, id: "josue" }),
      ] }),
      // v.10 — Deus responde: "Levanta-te; por que estás prostrado?".
      dv(10, "por que estás prostrado assim sobre o teu rosto"),
      // v.11 — a acusação: tomaram do anátema, furtaram, mentiram.
      dv(11, "tomaram do anátema, e furtaram, e mentiram"),
      // v.12 — "porquanto estão amaldiçoados; não serei mais convosco".
      dv(12, "porquanto estão amaldiçoados"),
      // v.13 — "Anátema há no meio de ti, Israel".
      dv(13, "Anátema há no meio de ti, Israel"),
      // v.14 — a sorte: a tribo, a família, a casa, homem por homem.
      dv(14, "a tribo que o Senhor tomar se chegará"),
      // v.15 — o que for tomado será QUEIMADO A FOGO.
      dv(15, "será queimado a fogo"),
      // v.16 — Josué faz chegar Israel por tribos; a tribo de Judá é tomada.
      b(16, { q: "a tribo de Judá foi tomada", set: "gilgal", props: GILGAL,
        env: { terrain: "field", glory: 0.34, night: 0.3, verdure: 0.28 }, cast: [
        C("servo", -150, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("multidao", 150, "stand", { dy: 0.66 }),
      ] }),
      // v.17 — da família dos zeraítas, é tomado Zabdi.
      b(17, { q: "foi tomado Zabdi", env: { glory: 0.3, night: 0.32 }, cast: [
        C("servo", -150, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("homem", 100, "stand", { dy: 0.52, facing: -1, id: "zabdi" }),
      ] }),
      // v.18 — homem por homem, é tomado ACÃ. Singularizado, sem glow.
      b(18, { q: "foi tomado Acã", env: { glory: 0.26, night: 0.36 }, cast: [
        C("servo", -140, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("homem", 90, "bow", { dy: 0.54, facing: 1, id: "aca" }),
      ] }),
      // v.19 — Josué a Acã: "Filho meu, dá glória ao Senhor... declara-me".
      b(19, { by: "servo", q: "dá, peço-te, glória ao Senhor", env: { glory: 0.32, night: 0.34 }, cast: [
        C("servo", -120, "raise", { dy: 0.5, facing: 1, id: "josue" }),
        C("homem", 80, "bow", { dy: 0.54, facing: 1, id: "aca" }),
      ] }),
      // v.20 — Acã confessa: "Verdadeiramente pequei contra o Senhor".
      b(20, { by: "homem", q: "Verdadeiramente pequei contra o Senhor Deus de Israel", cast: [
        C("homem", 60, "kneel", { dy: 0.56, facing: 1, id: "aca" }),
        C("servo", -130, "stand", { dy: 0.5, facing: 1, id: "josue" }),
      ] }),
      // v.21 — o anátema: a capa babilônica, a prata, a cunha de ouro escondidas.
      b(21, { by: "homem", q: "uma boa capa babilônica", set: "tenda", props: TENDA_ACA,
        env: { terrain: "field", glory: 0.28, night: 0.36, verdure: 0.22 }, cast: [
        C("homem", -60, "point", { dy: 0.54, facing: -1, id: "aca" }),
      ] }),
      // v.22 — mensageiros correm à tenda: tudo estava escondido.
      b(22, { q: "foram correndo à tenda", cast: [
        C("homem", -120, "walk", { dy: 0.5, facing: -1, id: "mensageiro1" }),
        C("homem", -40, "kneel", { dy: 0.56, facing: -1, id: "mensageiro2" }),
      ] }),
      // v.23 — trazem o despojo e o põem PERANTE O SENHOR.
      b(23, { q: "as puseram perante o Senhor", set: "gilgal", props: [
        ...GILGAL, P("crate", 30, 0.9, undefined, 0.6),
      ], env: { terrain: "field", glory: 0.34, night: 0.3, verdure: 0.28 }, cast: [
        C("servo", -140, "stand", { dy: 0.5, facing: 1, id: "josue" }),
        C("homem", 90, "bow", { dy: 0.54, facing: 1, id: "mensageiro1" }),
      ] }),
      // v.24 — levam Acã e tudo o que é seu ao VALE DE ACOR.
      b(24, { q: "e levaram-nos ao vale de Acor", set: "acor", props: [
        ...ACOR.filter((p) => p.kind !== "campfire"),
        P("stall", -260, 0.9, undefined, 0.44),
      ], env: { terrain: "field", glory: 0.2, night: 0.44, verdure: 0.16 }, cast: [
        C("homem", 40, "walk", { dy: 0.56, facing: -1, id: "aca" }),
        C("homem", -110, "walk", { dy: 0.5, facing: -1, id: "condutor" }),
      ] }),
      // v.25 — Josué: "O Senhor te perturbará"; apedrejado e queimado a fogo. ÍCONE.
      b(25, { by: "servo", q: "O Senhor te perturbará neste dia", set: "acor2", props: ACOR,
        env: { terrain: "field", glory: 0.12, night: 0.6, storm: 0.12, fire: 0.28, verdure: 0.12 }, cast: [
        C("servo", -150, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("homem", 70, "lie", { dy: 0.64, id: "aca" }),
        C("homem", -60, "raise", { dy: 0.5, facing: -1, id: "executor" }),
      ] }),
      // v.26 — um GRANDE MONTÃO de pedras; o Senhor se aparta do ardor da ira.
      b(26, { q: "um grande montão de pedras", env: { terrain: "field", glory: 0.4, night: 0.28, fire: 0.05, verdure: 0.22 }, cast: [
        C("servo", -150, "stand", { dy: 0.5, facing: 1, id: "josue" }),
        C("homem", 90, "bow", { dy: 0.56, facing: 1, id: "testemunha" }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Js 8
  8: {
    start: { terrain: "field", night: 0.12, glory: 0.6, storm: 0, fire: 0, verdure: 0.35 },
    beats: [
      // v.1 — Deus: "Não temas... te tenho dado na tua mão o rei de Ai".
      dv(1, "te tenho dado na tua mão o rei de Ai"),
      // v.2 — "põe emboscadas à cidade, por detrás dela".
      dv(2, "põe emboscadas à cidade, por detrás dela"),
      // v.3 — Josué escolhe trinta mil valorosos e os envia de noite.
      b(3, { q: "escolheu Josué trinta mil homens valorosos", set: "ai", props: AI_CIDADE,
        env: { terrain: "city", glory: 0.34, night: 0.5, verdure: 0.18 }, cast: [
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "josue" }),
        C("homem", 60, "walk", { dy: 0.52, facing: -1, id: "valente1" }),
        C("homem", 150, "walk", { dy: 0.5, facing: -1, id: "valente2" }),
      ] }),
      // v.4 — a ordem: "Ponde-vos de emboscadas contra a cidade".
      b(4, { by: "servo", q: "Ponde-vos de emboscadas contra a cidade", env: { night: 0.5, glory: 0.34 }, cast: [
        C("servo", -140, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("homem", 90, "kneel", { dy: 0.56, facing: -1, id: "valente1" }),
      ] }),
      // v.5 — "quando nos saírem ao encontro... fugiremos diante deles".
      jv(5, "fugiremos diante deles"),
      // v.6 — o engano da fuga: "Fogem diante de nós como antes".
      jv(6, "Fogem diante de nós como antes"),
      // v.7 — "saireis vós da emboscada, e tomareis a cidade".
      jv(7, "saireis vós da emboscada, e tomareis a cidade"),
      // v.8 — "tomando vós a cidade, pôr-lhe-eis fogo".
      jv(8, "pôr-lhe-eis fogo"),
      // v.9 — a emboscada se põe entre Betel e Ai; Josué passa a noite no arraial.
      b(9, { q: "passou aquela noite no meio do povo", env: { terrain: "city", glory: 0.3, night: 0.55, verdure: 0.16 }, cast: [
        C("servo", -120, "stand", { dy: 0.5, facing: 1, id: "josue" }),
        C("homem", 100, "lie", { dy: 0.6, id: "emboscado" }),
      ] }),
      // v.10 — Josué se levanta de madrugada e sobe com os anciãos contra Ai.
      b(10, { q: "subiram ele e os anciãos de Israel adiante do povo", env: { terrain: "city", glory: 0.44, night: 0.3, verdure: 0.2 }, cast: [
        C("servo", -140, "walk", { dy: 0.5, facing: -1, id: "josue" }),
        C("anciao", -40, "walk", { dy: 0.52, facing: -1, id: "ancioes" }),
        C("multidao", 150, "walk", { dy: 0.64, facing: -1 }),
      ] }),
      // v.11 — acampam ao norte de Ai; há um vale entre eles e a cidade.
      b(11, { q: "havia um vale entre eles e Ai", cast: [
        C("servo", -140, "stand", { dy: 0.5, facing: -1, id: "josue" }),
        C("multidao", 130, "stand", { dy: 0.64 }),
      ] }),
      // v.12 — toma cinco mil e os põe de emboscada a ocidente da cidade.
      b(12, { q: "pô-los de emboscada entre Betel e Ai", env: { glory: 0.4, night: 0.34 }, cast: [
        C("servo", -140, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("homem", 90, "kneel", { dy: 0.56, facing: -1, id: "emboscado" }),
      ] }),
      // v.13 — Josué vai aquela noite até ao meio do vale.
      b(13, { q: "foi Josué aquela noite até ao meio do vale", env: { terrain: "city", glory: 0.32, night: 0.52 }, cast: [
        C("servo", -30, "walk", { dy: 0.5, facing: -1, id: "josue" }),
      ] }),
      // v.14 — o rei de Ai sai ao combate, sem saber da emboscada.
      b(14, { q: "os homens da cidade saíram ao encontro de Israel ao combate", env: { terrain: "city", glory: 0.36, night: 0.28, storm: 0.1 }, cast: [
        C("rei", 150, "stand", { dy: 0.48, facing: -1, id: "reidai" }),
        C("homem", 70, "walk", { dy: 0.52, facing: -1, id: "aiense" }),
        C("servo", -150, "stand", { dy: 0.5, facing: 1, id: "josue" }),
      ] }),
      // v.15 — Josué e Israel fingem-se feridos e fogem pelo deserto.
      b(15, { q: "fugiram pelo caminho do deserto", set: "fuga", props: [
        P("rock", 280, 1.1, undefined, 0.32), P("palm", -320, 1.0, undefined, 0.14),
        P("grass", -60, 0.78, undefined, 0.8), P("grass", 90, 0.74, undefined, 0.72),
      ], env: { terrain: "desert", glory: 0.3, night: 0.32, verdure: 0.12 }, cast: [
        C("servo", -120, "walk", { dy: 0.5, facing: 1, id: "josue" }),
        C("homem", -30, "walk", { dy: 0.54, facing: 1, id: "israelita" }),
        C("rei", 160, "walk", { dy: 0.48, facing: 1, id: "reidai" }),
      ] }),
      // v.16 — todo o povo da cidade é convocado a persegui-los.
      b(16, { q: "foram afastados da cidade", cast: [
        C("homem", 120, "walk", { dy: 0.52, facing: 1, id: "aiense1" }),
        C("homem", 40, "walk", { dy: 0.5, facing: 1, id: "aiense2" }),
        C("servo", -150, "walk", { dy: 0.5, facing: 1, id: "josue" }),
      ] }),
      // v.17 — nem um homem fica em Ai nem em Betel; a cidade fica aberta.
      b(17, { q: "deixaram a cidade aberta", set: "ai-aberta", props: AI_CIDADE,
        env: { terrain: "city", glory: 0.3, night: 0.3, verdure: 0.16 }, cast: [
        C("homem", 130, "walk", { dy: 0.5, facing: 1, id: "aiense1" }),
      ] }),
      // v.18 — Deus: "Estende a lança que tens na tua mão, para Ai". ÍCONE.
      b(18, { by: "deus", q: "Estende a lança que tens na tua mão", env: { terrain: "field", glory: 0.7, night: 0.2, verdure: 0.2 }, cast: [
        C("servo", -20, "raise", { dy: 0.5, facing: -1, id: "josue" }),
      ] }),
      // v.19 — a emboscada corre, toma a cidade e lhe PÕE FOGO. campfire!
      b(19, { q: "puseram fogo na cidade", set: "ai-queima", props: [
        P("tower", -130, 1.28, undefined, 0.24),
        { ...P("campfire", 150, 1.4, 0.95, 0.4), tag: "ai-em-chamas" },
        P("campfire", 60, 1.0, 0.85, 0.6),
        P("rock", 300, 1.05, undefined, 0.32),
      ], env: { terrain: "city", glory: 0.32, night: 0.4, storm: 0.1, fire: 0.55, verdure: 0.1 }, cast: [
        C("homem", -60, "raise", { dy: 0.52, facing: -1, id: "emboscado" }),
      ] }),
      // v.20 — a FUMAÇA da cidade sobe ao céu; os de Ai ficam sem saída.
      b(20, { q: "a fumaça da cidade subia ao céu", props: [
        P("tower", -130, 1.28, undefined, 0.24),
        { ...P("campfire", 150, 1.4, 0.95, 0.4), tag: "ai-em-chamas" },
        { ...P("clouds", 120, 1.7, undefined, 0.78), sky: true },
        P("rock", 300, 1.05, undefined, 0.32),
      ], env: { terrain: "city", glory: 0.28, night: 0.44, storm: 0.12, fire: 0.5 }, cast: [
        C("rei", 150, "point", { dy: 0.48, facing: -1, id: "reidai" }),
        C("homem", 60, "bow", { dy: 0.54, facing: -1, id: "aiense1" }),
      ] }),
      // v.21 — Josué e Israel voltam e ferem os homens de Ai.
      b(21, { q: "voltaram, e feriram os homens de Ai", env: { terrain: "city", glory: 0.3, night: 0.4, storm: 0.12, fire: 0.4 }, cast: [
        C("servo", -140, "raise", { dy: 0.5, facing: -1, id: "josue" }),
        C("homem", 60, "lie", { dy: 0.58, id: "aiense1" }),
        C("homem", 150, "stand", { dy: 0.5, facing: 1, id: "israelita" }),
      ] }),
      // v.22 — cercados de ambos os lados: nenhum sobreviveu nem escapou.
      b(22, { q: "nenhum deles sobreviveu nem escapou", env: { glory: 0.24, night: 0.5, storm: 0.12 }, cast: [
        C("homem", -80, "lie", { dy: 0.6, id: "aiense1" }),
        C("homem", 30, "lie", { dy: 0.62, id: "aiense2" }),
        C("homem", 150, "raise", { dy: 0.5, facing: -1, id: "israelita" }),
      ] }),
      // v.23 — o rei de Ai é tomado vivo e trazido a Josué.
      b(23, { q: "ao rei de Ai tomaram vivo", env: { glory: 0.3, night: 0.42 }, cast: [
        C("rei", 90, "bow", { dy: 0.56, facing: 1, id: "reidai" }),
        C("servo", -140, "stand", { dy: 0.5, facing: 1, id: "josue" }),
      ] }),
      // v.24 — Israel fere ao fio da espada todos os moradores de Ai.
      b(24, { q: "todo o Israel se tornou a Ai e a feriu ao fio de espada", env: { terrain: "city", glory: 0.22, night: 0.5, storm: 0.12, fire: 0.2 }, cast: [
        C("homem", -90, "lie", { dy: 0.6, id: "morto1" }),
        C("mulherComum", 20, "bow", { dy: 0.54, id: "morta2" }),
        C("homem", 150, "raise", { dy: 0.5, facing: -1, id: "israelita" }),
      ] }),
      // v.25 — todos os que caíram: doze mil, homens e mulheres de Ai.
      b(25, { q: "foram doze mil, todos moradores de Ai", env: { glory: 0.2, night: 0.52 }, cast: [
        C("homem", -100, "lie", { dy: 0.62, id: "morto1" }),
        C("mulherComum", -10, "lie", { dy: 0.58, id: "morta2" }),
        C("homem", 90, "lie", { dy: 0.6, id: "morto3" }),
      ] }),
      // v.26 — Josué não retira a mão da lança até destruir toda Ai.
      b(26, { q: "até destruir totalmente a todos os moradores de Ai", env: { glory: 0.3, night: 0.44 }, cast: [
        C("servo", -30, "raise", { dy: 0.5, facing: -1, id: "josue" }),
      ] }),
      // v.27 — só o gado e os despojos Israel toma para si.
      b(27, { q: "o gado e os despojos da cidade", set: "ai-despojo", props: [
        ...AI_CIDADE, P("stall", -280, 0.95, undefined, 0.5), P("crate", 40, 0.85, undefined, 0.62),
      ], env: { terrain: "city", glory: 0.36, night: 0.34, verdure: 0.16 }, cast: [
        C("servo", -150, "stand", { dy: 0.5, facing: 1, id: "josue" }),
        C("homem", 110, "stand", { dy: 0.52, facing: -1, id: "israelita" }),
      ] }),
      // v.28 — Josué QUEIMA Ai e a torna num montão perpétuo, em ruínas. campfire.
      b(28, { q: "a tornou num montão perpétuo", set: "ai-ruina", props: [
        { ...P("campfire", 40, 1.2, 0.8, 0.5), tag: "ai-em-ruinas" },
        P("rock", -140, 1.3, undefined, 0.44),
        P("rock", 170, 1.2, undefined, 0.4),
      ], env: { terrain: "city", glory: 0.24, night: 0.5, storm: 0.1, fire: 0.4, verdure: 0.08 }, cast: [
        C("servo", -150, "stand", { dy: 0.5, facing: 1, id: "josue" }),
      ] }),
      // v.29 — o rei de Ai ENFORCADO num madeiro; ao pôr do sol, montão de pedras.
      b(29, { q: "enforcou num madeiro, até à tarde", set: "madeiro", props: [
        { ...P("tree", 40, 1.5, undefined, 0.3), tag: "madeiro-do-rei" },
        P("rock", -110, 1.4, undefined, 0.5),
        P("rock", 200, 1.1, undefined, 0.38),
      ], env: { terrain: "field", glory: 0.26, night: 0.46, verdure: 0.14 }, cast: [
        C("rei", 40, "lie", { dy: 0.64, id: "reidai" }),
        C("servo", -160, "stand", { dy: 0.5, facing: 1, id: "josue" }),
      ] }),
      // v.30 — Josué edifica um ALTAR ao Senhor no monte EBAL.
      b(30, { q: "no monte Ebal", set: "ebal", props: EBAL,
        env: { terrain: "mountain", glory: 0.48, night: 0.16, verdure: 0.2 }, cast: [
        C("servo", -140, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.18 }),
      ] }),
      // v.31 — o altar de pedras inteiras; holocaustos e ofertas pacíficas.
      b(31, { q: "um altar de pedras inteiras", set: "ebal-oferta", props: [
        { ...P("altar", 0, 1.4, 0.7, 0.4), tag: "altar-de-ebal" },
        P("rock", -220, 1.3, undefined, 0.5),
        P("rock", 230, 1.25, undefined, 0.52),
      ], env: { terrain: "mountain", glory: 0.55, night: 0.14, fire: 0.2, verdure: 0.2 }, cast: [
        C("servo", -140, "kneel", { dy: 0.52, facing: 1, id: "josue", glow: 0.18 }),
        C("anciao", 130, "bow", { dy: 0.56, facing: -1, id: "sacerdote" }),
      ] }),
      // v.32 — Josué ESCREVE em pedras uma cópia da lei de Moisés.
      b(32, { by: "servo", q: "uma cópia da lei de Moisés", env: { terrain: "mountain", glory: 0.5, night: 0.15 }, cast: [
        C("servo", -20, "write", { dy: 0.5, facing: 1, id: "josue" }),
      ] }),
      // v.33 — Israel de um e outro lado da arca: metade a Gerizim, metade a Ebal.
      b(33, { q: "metade deles em frente do monte Gerizim, e a outra metade em frente do monte Ebal", set: "montes", props: [
        { ...P("ark", 0, 1.2, undefined, 0.36), tag: "arca-entre-os-montes" },
        P("rock", -260, 1.5, undefined, 0.46),
        P("rock", 260, 1.5, undefined, 0.46),
      ], env: { terrain: "mountain", glory: 0.5, night: 0.14, verdure: 0.22 }, cast: [
        C("anciao", -110, "stand", { dy: 0.56, facing: 1, id: "levita" }),
        C("multidao", -200, "stand", { dy: 0.66, facing: 1 }),
        C("multidao", 200, "stand", { dy: 0.66, facing: -1 }),
      ] }),
      // v.34 — Josué lê em alta voz a BÊNÇÃO e a MALDIÇÃO da Lei.
      b(34, { by: "servo", q: "a bênção e a maldição", set: "leitura", props: [
        { ...P("ark", 0, 1.15, undefined, 0.36), tag: "arca-da-lei" },
        P("scroll", -80, 1.0, undefined, 0.54),
        P("rock", -260, 1.4, undefined, 0.46),
        P("rock", 260, 1.4, undefined, 0.46),
      ], env: { terrain: "mountain", glory: 0.52, night: 0.14, verdure: 0.22 }, cast: [
        C("servo", -30, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.15 }),
        C("multidao", 160, "stand", { dy: 0.66 }),
      ] }),
      // v.35 — nenhuma palavra faltou: leu toda a Lei perante a congregação.
      b(35, { by: "servo", q: "que Josué não lesse perante toda a congregação de Israel", cast: [
        C("servo", -140, "point", { dy: 0.5, facing: 1, id: "josue", glow: 0.15 }),
        C("multidao", 140, "stand", { dy: 0.64 }),
      ] }),
    ],
  },
};
