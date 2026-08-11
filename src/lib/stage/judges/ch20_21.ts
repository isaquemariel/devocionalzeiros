// ============================================================================
// JUÍZES 20–21 — CENA VIVA. A GUERRA FRATRICIDA e o LUTO de Israel.
//
// Jz 20 — TODO O ISRAEL se ajunta perante o SENHOR em MISPÁ, "como se fora um
// só homem", desde Dã até Berseba: quatrocentos mil homens de pé que tiravam a
// espada. O LEVITA conta o caso — a noite em Gibeá, a casa cercada, a concubina
// morta, os pedaços enviados por toda a herança de Israel. O povo se levanta
// como um só homem; as tribos pedem a Benjamim os filhos de Belial de Gibeá, e
// BENJAMIM NÃO QUER OUVIR A VOZ DE SEUS IRMÃOS: ajunta vinte e seis mil homens
// e os setecentos canhotos que atiravam com a funda uma pedra em um cabelo.
// Em BETEL consultam a Deus diante da ARCA DA ALIANÇA (Finéias, filho de
// Eleazar, filho de Arão, perante ela). E vêm as TRÊS BATALHAS: duas DERROTAS
// de Israel — vinte e dois mil e dezoito mil caídos —, com CHORO e JEJUM até à
// tarde perante o Senhor; e enfim a EMBOSCADA em redor de Gibeá, o sinal
// combinado — a grande NUVEM DE FUMAÇA que sobe da cidade como uma coluna, e a
// cidade ao fio da espada. Benjamim quase se extingue; só SEISCENTOS HOMENS
// escapam à PENHA DE RIMOM, onde ficam quatro meses.
//
// Jz 21 — O LUTO DEPOIS DA VITÓRIA: em Betel o povo pranteia com grande pranto
// — "por que sucedeu isto, que hoje falte uma tribo em Israel?". Edificam um
// altar. O JURAMENTO de Mispá ("nenhum de nós dará sua filha aos benjamitas")
// aperta como um laço: para achar mulheres aos que restaram, ferem
// JABES-GILEADE e trazem quatrocentas moças a Siló; proclamam paz aos de Rimom;
// e mandam os benjamitas emboscar-se nas VINHAS, para arrebatarem as FILHAS DE
// SILÓ que dançavam em rodas na solenidade anual do Senhor. Benjamim reedifica
// as suas cidades, cada um volta para a sua herança — e o livro fecha com a sua
// própria sentença: "Naqueles dias não havia rei em Israel; porém cada um fazia
// o que parecia reto aos seus olhos" (21:25).
//
// TOM (regra desta cena): guerra ENTRE IRMÃOS e LUTO — night alto, glória
// baixa, sem festa. As mortes, os prantos, as marchas e as contagens de hoste
// são sempre figuras INDIVIDUAIS (`homem`/`mulherComum`/`servo`) em
// `stand`/`walk`/`lie`/`bow`/`kneel`; a `multidao` — que o motor SEMPRE desenha
// comemorando, ignorando a pose — só entra na assembleia parada de Mispá
// (20:1-2) e na solenidade do Senhor em Siló (21:19). Nunca marchando contra o
// irmão, nunca no arraial de guerra, nunca no luto de Betel.
//
// A VOZ DE DEUS (regra do projeto): em Betel o Senhor responde ao oráculo diante
// da ARCA, sem mediador visível → `by: "deus"` (voz do céu, sem figura), com a
// glória subindo só o bastante para se distinguir do luto ao redor.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const dv = (v: number, q?: string, extra: Partial<StageBeat> = {}) =>
  b(v, { by: "deus", ...(q ? { q } : {}), ...extra }); // voz do céu diante da arca

// MISPÁ — a congregação perante o SENHOR, desde Dã até Berseba: as tendas das
// tribos em roda, o altar do ajuntamento no meio.
const MISPA: StagePropSpec[] = [
  P("tent", -250, 1.1, undefined, 0.2),
  P("tent", 240, 1.05, undefined, 0.24),
  P("altar", 0, 1.0, undefined, 0.34),
  P("rock", -330, 1.05, undefined, 0.3),
  P("bush", -140, 0.9, undefined, 0.66),
  P("grass", 120, 0.75, undefined, 0.7),
];
// A NOITE DE GIBEÁ (o que o levita conta) — a casa cercada, a porta, a lua fria.
const GIBEA_NOITE: StagePropSpec[] = [
  P("church", -60, 1.15, undefined, 0.38),
  P("door", 90, 0.95, undefined, 0.52),
  P("tower", 250, 1.1, undefined, 0.28),
  { ...P("moon", -210, 1.5, undefined, 0.8), sky: true },
  P("rock", 320, 1.0, undefined, 0.5),
  P("grass", -300, 0.72, undefined, 0.7),
];
// GIBEÁ DE BENJAMIM — a cidade fechada aos irmãos: muralha, torre e portas.
const GIBEA: StagePropSpec[] = [
  P("tower", 40, 1.45, undefined, 0.28),
  P("church", -170, 1.05, undefined, 0.36),
  P("door", 215, 0.95, undefined, 0.5),
  P("rock", 320, 1.05, undefined, 0.56),
  P("bush", 130, 0.85, undefined, 0.66),
  P("grass", -300, 0.74, undefined, 0.7),
];
// BETEL — a ARCA DA ALIANÇA de Deus ali naqueles dias, e o altar do oráculo.
const BETEL: StagePropSpec[] = [
  P("ark", -40, 1.05, undefined, 0.4),
  P("altar", 150, 1.0, undefined, 0.44),
  P("tent", -250, 1.05, undefined, 0.22),
  P("rock", 300, 1.1, undefined, 0.36),
  P("grass", 60, 0.74, undefined, 0.72),
];
// BETEL com o altar ACESO — holocaustos e ofertas pacíficas do jejum e do luto.
const BETEL_ALTAR: StagePropSpec[] = [
  P("ark", -40, 1.05, undefined, 0.4),
  P("altar", 150, 1.05, 0.85, 0.44),
  P("tent", -250, 1.05, undefined, 0.22),
  P("rock", 300, 1.1, undefined, 0.36),
  P("grass", 60, 0.74, undefined, 0.72),
];
// O CAMPO ao pé de Gibeá — o vale onde a peleja se ordenou três vezes.
const BATALHA: StagePropSpec[] = [
  P("tower", 290, 1.15, undefined, 0.26),
  P("rock", -290, 1.2, undefined, 0.4),
  P("rock", 180, 1.0, undefined, 0.64),
  P("bush", -150, 0.9, undefined, 0.6),
  P("grass", 30, 0.74, undefined, 0.72),
];
// O ARRAIAL contra Gibeá — as tendas de Israel acampadas de manhã, a fogueira.
const ACAMPAMENTO: StagePropSpec[] = [
  P("tent", -230, 1.1, undefined, 0.22),
  P("tent", 60, 1.0, undefined, 0.26),
  P("tower", 300, 1.1, undefined, 0.26),
  P("campfire", -70, 0.9, undefined, 0.58),
  P("rock", 220, 1.0, undefined, 0.62),
  P("grass", 150, 0.72, undefined, 0.7),
];
// AS EMBOSCADAS em redor de Gibeá — as moitas e a caverna, a torre à espreita.
const EMBOSCADA: StagePropSpec[] = [
  P("rock", -270, 1.3, undefined, 0.48),
  P("bush", -110, 1.0, undefined, 0.62),
  P("bush", 110, 0.95, undefined, 0.58),
  P("tower", 260, 1.1, undefined, 0.28),
  P("rock", 30, 0.9, undefined, 0.7),
  P("grass", 180, 0.72, undefined, 0.72),
];
// O SINAL — a cidade em chamas e a grande NUVEM DE FUMAÇA subindo ao céu.
const FUMACA: StagePropSpec[] = [
  P("tower", 20, 1.2, undefined, 0.28),
  P("campfire", 135, 1.35, undefined, 0.46),
  P("church", -175, 1.05, undefined, 0.38),
  { ...P("clouds", 60, 1.7, undefined, 0.66), sky: true },
  P("rock", 300, 1.05, undefined, 0.58),
  P("grass", -290, 0.72, undefined, 0.72),
];
// A PENHA DE RIMOM — o rochedo do deserto onde os seiscentos ficaram 4 meses.
const RIMOM: StagePropSpec[] = [
  P("rock", 0, 1.7, undefined, 0.38),
  P("rock", -240, 1.2, undefined, 0.52),
  P("rock", 240, 1.15, undefined, 0.5),
  P("rock", 120, 0.9, undefined, 0.7),
  P("bush", -130, 0.8, undefined, 0.66),
];
// AS CIDADES QUEIMADAS de Benjamim — o fogo posto a tudo quanto se achou.
const RUINAS: StagePropSpec[] = [
  P("campfire", -155, 1.25, undefined, 0.5),
  P("campfire", 170, 1.15, undefined, 0.44),
  P("tower", 30, 1.1, undefined, 0.28),
  P("rock", -40, 1.2, undefined, 0.66),
  { ...P("clouds", 40, 1.8, undefined, 0.62), sky: true },
  P("bush", 280, 0.8, undefined, 0.6),
];
// JABES-GILEADE — a cidade que não subiu à assembleia, e o fio da espada.
const JABES: StagePropSpec[] = [
  P("church", -140, 1.1, undefined, 0.36),
  P("tower", 80, 1.2, undefined, 0.28),
  P("door", 250, 0.95, undefined, 0.48),
  P("campfire", -285, 1.0, undefined, 0.5),
  P("rock", 310, 1.0, undefined, 0.6),
  P("grass", -30, 0.72, undefined, 0.72),
];
// SILÓ — o arraial na terra de Canaã e a solenidade do Senhor de ano em ano.
const SILO: StagePropSpec[] = [
  P("tent", -40, 1.25, undefined, 0.28),
  P("grapes", 180, 1.1, undefined, 0.5),
  P("grapes", -230, 1.05, undefined, 0.46),
  P("palm", 310, 1.0, undefined, 0.16),
  P("bush", -120, 0.85, undefined, 0.64),
  P("grass", 60, 0.75, undefined, 0.72),
];
// AS VINHAS de Siló — onde os benjamitas se emboscaram para as rodas que dançavam.
const VINHAS: StagePropSpec[] = [
  P("grapes", -220, 1.15, undefined, 0.52),
  P("grapes", 200, 1.1, undefined, 0.48),
  P("grapes", -20, 1.0, undefined, 0.66),
  P("tent", 300, 1.0, undefined, 0.26),
  P("palm", -320, 1.0, undefined, 0.16),
  P("grass", 110, 0.74, undefined, 0.72),
];
// A HERANÇA REEDIFICADA — as cidades de Benjamim levantadas outra vez.
const HERANCA: StagePropSpec[] = [
  P("church", -150, 1.1, undefined, 0.34),
  P("tower", 100, 1.15, undefined, 0.28),
  P("door", 260, 0.9, undefined, 0.48),
  P("grapes", 200, 0.9, undefined, 0.62),
  P("palm", -320, 1.0, undefined, 0.16),
  P("grass", -40, 0.75, undefined, 0.7),
];
// O TRONO VAZIO — "não havia rei em Israel": cada um segue o seu próprio caminho.
const TRONO_VAZIO: StagePropSpec[] = [
  P("throne", 0, 1.15, undefined, 0.34),
  P("rock", -260, 1.1, undefined, 0.5),
  P("bush", 210, 0.85, undefined, 0.6),
  P("palm", -330, 1.0, undefined, 0.16),
  P("grass", -100, 0.74, undefined, 0.72),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Jz 20
  20: {
    start: { terrain: "field", night: 0.34, glory: 0.2, storm: 0.08, fire: 0, verdure: 0.28 },
    beats: [
      // v.1 — toda a congregação perante o SENHOR em Mispá, como um só homem.
      b(1, { q: "como se fora um só homem", set: "mispa", props: MISPA,
        env: { terrain: "field", night: 0.34, glory: 0.22, verdure: 0.28 }, cast: [
        C("multidao", -130, "stand", { dy: 0.4 }),
        C("homem", 120, "stand", { dy: 0.52, facing: -1, id: "israelita" }),
        C("anciao", 245, "stand", { dy: 0.46, facing: -1, id: "cabeca-de-tribo" }),
      ] }),
      // v.2 — os principais de todas as tribos: 400 mil homens que tiravam a espada.
      b(2, { q: "quatrocentos mil homens de pé que tiravam a espada", cast: [
        C("multidao", 10, "stand", { dy: 0.4 }),
        C("homem", -200, "stand", { dy: 0.56, facing: 1, id: "guerreiro" }),
        C("homem", 215, "stand", { dy: 0.52, facing: -1, id: "guerreiro-2" }),
        C("anciao", 300, "stand", { dy: 0.46, facing: -1, id: "cabeca-de-tribo" }),
      ] }),
      // v.3 — Benjamim ouve que Israel subiu; e Israel pede: falai, como sucedeu?
      b(3, { by: "homem", q: "E disseram os filhos de Israel:", cast: [
        C("homem", -155, "point", { dy: 0.54, facing: 1, id: "israelita" }),
        C("homem", 140, "stand", { dy: 0.52, facing: -1, id: "levita" }),
        C("multidao", 20, "stand", { dy: 0.36 }),
      ] }),
      // v.4 — responde o LEVITA, marido da mulher morta: cheguei a Gibeá.
      b(4, { by: "homem", q: "e disse:", cast: [
        C("homem", -70, "stand", { dy: 0.56, facing: 1, id: "levita" }),
        C("anciao", 190, "stand", { dy: 0.48, facing: -1, id: "cabeca-de-tribo" }),
        C("multidao", -250, "stand", { dy: 0.38 }),
      ] }),
      // v.5 — a memória: os cidadãos de Gibeá cercaram a casa DE NOITE.
      b(5, { by: "homem", q: "cercaram a casa de noite", set: "gibea-de-noite", props: GIBEA_NOITE,
        env: { terrain: "city", night: 0.74, glory: 0.06, storm: 0.14, verdure: 0.12 }, cast: [
        C("homem", -150, "point", { dy: 0.56, facing: 1, id: "levita" }),
        C("homem", 55, "stand", { dy: 0.6, facing: -1, id: "cidadao-de-gibea" }),
        C("homem", 175, "stand", { dy: 0.54, facing: -1, id: "cidadao-de-gibea-2" }),
        C("mulherComum", -40, "lie", { dy: 0.76, id: "concubina" }),
      ] }),
      // v.6 — os pedaços enviados por toda a herança de Israel: loucura em Israel.
      b(6, { by: "homem", q: "e fi-la em pedaços", env: { night: 0.78, glory: 0.05 }, cast: [
        C("homem", -130, "bow", { dy: 0.6, facing: 1, id: "levita" }),
        C("mulherComum", 60, "lie", { dy: 0.78, id: "concubina" }),
      ] }),
      // v.7 — de volta a Mispá: dai aqui a vossa palavra e conselho.
      b(7, { by: "homem", q: "dai aqui a vossa palavra e conselho", set: "mispa", props: MISPA,
        env: { terrain: "field", night: 0.36, glory: 0.2, storm: 0.08, verdure: 0.28 }, cast: [
        C("homem", -90, "raise", { dy: 0.56, facing: 1, id: "levita" }),
        C("multidao", 140, "stand", { dy: 0.38 }),
        C("anciao", 275, "stand", { dy: 0.46, facing: -1, id: "cabeca-de-tribo" }),
      ] }),
      // v.8 — todo o povo se levanta COMO UM SÓ HOMEM: ninguém volta à sua casa.
      b(8, { by: "homem", q: "dizendo:", env: { night: 0.4, glory: 0.18 }, cast: [
        C("homem", 60, "raise", { dy: 0.54, facing: -1, id: "israelita" }),
        C("homem", 200, "stand", { dy: 0.5, facing: -1, id: "israelita-2" }),
        C("multidao", -170, "stand", { dy: 0.38 }),
      ] }),
      // v.9 — a decisão: procederemos contra Gibeá POR SORTE.
      b(9, { by: "homem", q: "procederemos contra ela por sorte", cast: [
        C("homem", -60, "point", { dy: 0.56, facing: 1, id: "israelita" }),
        C("anciao", 160, "stand", { dy: 0.48, facing: -1, id: "cabeca-de-tribo" }),
        C("multidao", 250, "stand", { dy: 0.38 }),
      ] }),
      // v.10 — dez de cada cem para o mantimento do povo que vai a Gibeá.
      b(10, { by: "homem", q: "para providenciarem mantimento para o povo", cast: [
        C("homem", -120, "point", { dy: 0.56, facing: 1, id: "israelita" }),
        C("servo", 40, "walk", { dy: 0.6, facing: -1, id: "provedor" }),
        C("servo", 170, "walk", { dy: 0.56, facing: -1, id: "provedor-2" }),
        C("multidao", 280, "stand", { dy: 0.38 }),
      ] }),
      // v.11 — todos os homens de Israel contra a cidade, unidos como um só homem.
      b(11, { q: "unidos como um só homem", env: { night: 0.42, glory: 0.16, storm: 0.12 }, cast: [
        C("homem", -230, "walk", { dy: 0.6, facing: -1, id: "israelita-em-marcha" }),
        C("homem", -60, "walk", { dy: 0.56, facing: -1, id: "israelita-em-marcha-2" }),
        C("homem", 160, "walk", { dy: 0.58, facing: -1, id: "israelita" }),
        C("homem", 265, "walk", { dy: 0.52, facing: -1, id: "israelita-2" }),
      ] }),
      // v.12 — as tribos enviam homens a Benjamim: que maldade é esta entre vós?
      b(12, { by: "homem", q: "dizendo:", set: "gibea", props: GIBEA,
        env: { terrain: "city", night: 0.44, glory: 0.15, storm: 0.12, verdure: 0.18 }, cast: [
        C("homem", -170, "point", { dy: 0.56, facing: 1, id: "mensageiro" }),
        C("homem", 120, "stand", { dy: 0.54, facing: -1, id: "benjamita" }),
        C("homem", 235, "stand", { dy: 0.5, facing: -1, id: "benjamita-2" }),
      ] }),
      // v.13 — "dai-nos os filhos de Belial" — e Benjamim NÃO QUIS OUVIR.
      b(13, { by: "homem", q: "Dai-nos, pois, agora aqueles homens",
        env: { night: 0.48, glory: 0.12 }, cast: [
        C("homem", -170, "raise", { dy: 0.56, facing: 1, id: "mensageiro" }),
        C("homem", 120, "stand", { dy: 0.54, facing: 1, id: "benjamita" }),
        C("homem", 240, "stand", { dy: 0.5, facing: 1, id: "benjamita-2" }),
      ] }),
      // v.14 — Benjamim se ajunta das cidades em Gibeá para pelejar contra os irmãos.
      b(14, { q: "para saírem a pelejar contra os filhos de Israel",
        env: { night: 0.5, storm: 0.16 }, cast: [
        C("homem", -40, "stand", { dy: 0.6, facing: 1, id: "benjamita" }),
        C("homem", 90, "stand", { dy: 0.54, facing: 1, id: "benjamita-2" }),
        C("homem", 200, "walk", { dy: 0.5, facing: 1, id: "benjamita-3" }),
        C("homem", -190, "walk", { dy: 0.56, facing: 1, id: "benjamita-4" }),
      ] }),
      // v.15 — contam-se 26 mil de Benjamim, afora os 700 de Gibeá.
      b(15, { q: "vinte e seis mil homens que tiravam a espada", cast: [
        C("homem", -150, "stand", { dy: 0.58, facing: 1, id: "benjamita" }),
        C("homem", -20, "stand", { dy: 0.54, facing: 1, id: "benjamita-2" }),
        C("homem", 110, "stand", { dy: 0.5, facing: 1, id: "benjamita-3" }),
        C("homem", 230, "stand", { dy: 0.46, facing: 1, id: "benjamita-4" }),
      ] }),
      // v.16 — os 700 CANHOTOS: a funda que acertava um cabelo e não errava.
      b(16, { q: "setecentos homens escolhidos, canhotos", cast: [
        C("homem", -110, "raise", { dy: 0.62, facing: 1, id: "fundeiro" }),
        C("homem", 60, "raise", { dy: 0.56, facing: 1, id: "fundeiro-2" }),
        C("homem", 195, "point", { dy: 0.5, facing: 1, id: "fundeiro-3" }),
      ] }),
      // v.17 — de Israel, 400 mil homens de guerra, afora Benjamim.
      b(17, { q: "quatrocentos mil homens que tiravam da espada", set: "hoste-de-israel", props: BATALHA,
        env: { terrain: "field", night: 0.44, glory: 0.16, storm: 0.14, verdure: 0.22 }, cast: [
        C("homem", -235, "stand", { dy: 0.6, facing: -1, id: "homem-de-guerra" }),
        C("homem", -110, "stand", { dy: 0.56, facing: -1, id: "homem-de-guerra-2" }),
        C("homem", 30, "stand", { dy: 0.52, facing: -1, id: "homem-de-guerra-3" }),
        C("homem", 170, "stand", { dy: 0.56, facing: -1, id: "israelita" }),
        C("homem", 275, "stand", { dy: 0.5, facing: -1, id: "israelita-2" }),
      ] }),
      // v.18 — sobem a BETEL e consultam a Deus: quem subirá primeiro? — Judá.
      dv(18, "Judá subirá primeiro", { set: "betel", props: BETEL,
        env: { terrain: "mountain", night: 0.4, glory: 0.42, storm: 0.06, verdure: 0.18 }, cast: [
        C("homem", -140, "kneel", { dy: 0.58, facing: 1, id: "consulente" }),
        C("homem", 60, "bow", { dy: 0.54, facing: -1, id: "juda" }),
        C("homem", 235, "kneel", { dy: 0.5, facing: -1, id: "consulente-2" }),
      ] }),
      // v.19 — pela manhã acampam-se contra Gibeá.
      b(19, { q: "acamparam-se contra Gibeá", set: "arraial-contra-gibea", props: ACAMPAMENTO,
        env: { terrain: "field", night: 0.34, glory: 0.2, storm: 0.1, verdure: 0.22 }, cast: [
        C("homem", -120, "stand", { dy: 0.58, facing: 1, id: "israelita" }),
        C("servo", 15, "walk", { dy: 0.64, facing: 1, id: "escudeiro" }),
        C("homem", 165, "stand", { dy: 0.56, facing: -1, id: "acampado" }),
        C("homem", 275, "walk", { dy: 0.5, facing: -1, id: "acampado-2" }),
      ] }),
      // v.20 — ordenam a batalha contra Benjamim, ao pé de Gibeá.
      b(20, { q: "ordenaram a batalha contra eles, ao pé de Gibeá", set: "campo-de-gibea", props: BATALHA,
        env: { terrain: "field", night: 0.42, glory: 0.16, storm: 0.2, verdure: 0.2 }, cast: [
        C("homem", -190, "point", { dy: 0.58, facing: 1, id: "capitao" }),
        C("homem", -60, "stand", { dy: 0.6, facing: 1, id: "israelita" }),
        C("homem", 90, "stand", { dy: 0.54, facing: 1, id: "israelita-2" }),
        C("homem", 230, "stand", { dy: 0.48, facing: -1, id: "benjamita" }),
      ] }),
      // v.21 — PRIMEIRA DERROTA: 22 mil de Israel derrubados por terra num só dia.
      b(21, { q: "derrubaram por terra, naquele dia, vinte e dois mil homens de Israel",
        env: { night: 0.64, glory: 0.08, storm: 0.28, verdure: 0.14 }, cast: [
        C("homem", -195, "lie", { dy: 0.72, id: "caido" }),
        C("homem", -25, "lie", { dy: 0.8, id: "caido-2" }),
        C("homem", 145, "lie", { dy: 0.7, id: "caido-3" }),
        C("homem", 280, "bow", { dy: 0.6, facing: -1, id: "sobrevivente" }),
      ] }),
      // v.22 — porém o povo se ESFORÇA e torna a ordenar a peleja no mesmo lugar.
      b(22, { q: "esforçou-se o povo", env: { night: 0.56, glory: 0.14, storm: 0.2 }, cast: [
        C("homem", -170, "stand", { dy: 0.62, facing: 1, id: "israelita" }),
        C("homem", -20, "raise", { dy: 0.66, facing: 1, id: "capitao" }),
        C("homem", 140, "stand", { dy: 0.56, facing: 1, id: "israelita-2" }),
        C("homem", 265, "kneel", { dy: 0.6, facing: 1, id: "ferido" }),
      ] }),
      // v.23 — sobem e CHORAM perante o Senhor até à tarde; e Ele responde: subi.
      dv(23, "Subi contra ele", { set: "betel", props: BETEL,
        env: { terrain: "mountain", night: 0.52, glory: 0.36, storm: 0.06, verdure: 0.16 }, cast: [
        C("homem", -150, "kneel", { dy: 0.6, facing: 1, id: "pranteador" }),
        C("homem", 35, "bow", { dy: 0.66, facing: 1, id: "pranteador-2" }),
        C("homem", 215, "kneel", { dy: 0.56, facing: -1, id: "consulente" }),
      ] }),
      // v.24 — no dia seguinte chegam-se outra vez aos filhos de Benjamim.
      b(24, { q: "Chegaram-se, pois, os filhos de Israel aos filhos de Benjamim",
        set: "campo-de-gibea", props: BATALHA,
        env: { terrain: "field", night: 0.46, glory: 0.14, storm: 0.22, verdure: 0.18 }, cast: [
        C("homem", -180, "walk", { dy: 0.6, facing: 1, id: "israelita" }),
        C("homem", -50, "walk", { dy: 0.64, facing: 1, id: "israelita-2" }),
        C("homem", 130, "stand", { dy: 0.54, facing: -1, id: "benjamita" }),
        C("homem", 255, "stand", { dy: 0.5, facing: -1, id: "benjamita-2" }),
      ] }),
      // v.25 — SEGUNDA DERROTA: mais 18 mil de Israel por terra.
      b(25, { q: "derrubaram ainda por terra mais dezoito mil homens",
        env: { night: 0.7, glory: 0.06, storm: 0.32, verdure: 0.12 }, cast: [
        C("homem", -210, "lie", { dy: 0.74, id: "caido" }),
        C("homem", -60, "lie", { dy: 0.82, id: "caido-2" }),
        C("homem", 95, "lie", { dy: 0.72, id: "caido-3" }),
        C("homem", 230, "lie", { dy: 0.66, id: "caido-4" }),
        C("homem", 305, "bow", { dy: 0.58, facing: -1, id: "sobrevivente" }),
      ] }),
      // v.26 — todo o povo sobe a Betel, chora, JEJUA até à tarde e oferece holocaustos.
      b(26, { q: "jejuaram aquele dia até à tarde", set: "betel-de-luto", props: BETEL_ALTAR,
        env: { terrain: "mountain", night: 0.56, glory: 0.34, storm: 0.05, fire: 0.25, verdure: 0.14 }, cast: [
        C("homem", -180, "bow", { dy: 0.64, facing: 1, id: "pranteador" }),
        C("mulherComum", -30, "kneel", { dy: 0.72, id: "pranteadora" }),
        C("homem", 120, "lie", { dy: 0.68, id: "prostrado" }),
        C("homem", 250, "kneel", { dy: 0.58, facing: -1, id: "pranteador-2" }),
      ] }),
      // v.27 — perguntam ao Senhor: a ARCA DA ALIANÇA de Deus estava ali naqueles dias.
      b(27, { q: "a arca da aliança de Deus estava ali naqueles dias",
        env: { glory: 0.42, night: 0.5 }, cast: [
        C("homem", -160, "kneel", { dy: 0.6, facing: 1, id: "consulente" }),
        C("homem", 90, "bow", { dy: 0.62, facing: -1, id: "consulente-2" }),
        C("anciao", 250, "stand", { dy: 0.5, facing: -1, id: "cabeca-de-tribo" }),
      ] }),
      // v.28 — FINÉIAS, filho de Eleazar, perante a arca; e o Senhor: subi, amanhã to entrego.
      dv(28, "Subi, que amanhã eu to entregarei na mão", {
        env: { glory: 0.5, night: 0.46 }, cast: [
        C("arao", -155, "stand", { dy: 0.54, facing: 1, id: "fineias" }),
        C("homem", 70, "kneel", { dy: 0.62, facing: 1, id: "consulente" }),
        C("homem", 215, "bow", { dy: 0.56, facing: 1, id: "consulente-2" }),
      ] }),
      // v.29 — Israel põe EMBOSCADAS em redor de Gibeá.
      // (o `fire: 0` apaga o altar do jejum de Betel — o fogo vaza por herança)
      b(29, { q: "Israel pôs emboscadas em redor de Gibeá", set: "emboscadas", props: EMBOSCADA,
        env: { terrain: "field", night: 0.52, glory: 0.14, storm: 0.14, fire: 0, verdure: 0.2 }, cast: [
        C("homem", -215, "bow", { dy: 0.66, facing: 1, id: "emboscado" }),
        C("homem", -60, "kneel", { dy: 0.72, facing: 1, id: "emboscado-2" }),
        C("homem", 165, "bow", { dy: 0.68, facing: -1, id: "emboscado-3" }),
      ] }),
      // v.30 — ao TERCEIRO DIA ordenam a peleja junto a Gibeá, como das outras vezes.
      b(30, { q: "ordenaram a peleja junto a Gibeá, como das outras vezes",
        set: "campo-de-gibea", props: BATALHA,
        env: { terrain: "field", night: 0.44, glory: 0.16, storm: 0.2, verdure: 0.2 }, cast: [
        C("homem", -195, "point", { dy: 0.58, facing: 1, id: "capitao" }),
        C("homem", -55, "stand", { dy: 0.62, facing: 1, id: "israelita" }),
        C("homem", 110, "stand", { dy: 0.54, facing: -1, id: "benjamita" }),
        C("homem", 245, "stand", { dy: 0.5, facing: -1, id: "benjamita-2" }),
      ] }),
      // v.31 — Benjamim sai, desvia-se da cidade e fere uns TRINTA pelos caminhos.
      b(31, { q: "uns trinta dos homens de Israel",
        env: { night: 0.52, glory: 0.12, storm: 0.24 }, cast: [
        C("homem", -180, "lie", { dy: 0.74, id: "caido" }),
        C("homem", -40, "lie", { dy: 0.68, id: "caido-2" }),
        C("homem", 120, "stand", { dy: 0.6, facing: -1, id: "benjamita" }),
        C("homem", 250, "walk", { dy: 0.54, facing: -1, id: "benjamita-2" }),
      ] }),
      // v.32 — "estão derrotados como dantes" — e Israel: fujamos, desviemo-los da cidade.
      b(32, { by: "homem", q: "Então os filhos de Benjamim disseram:", cast: [
        C("homem", 120, "raise", { dy: 0.6, facing: -1, id: "benjamita" }),
        C("homem", 245, "stand", { dy: 0.54, facing: -1, id: "benjamita-2" }),
        C("homem", -110, "walk", { dy: 0.64, facing: -1, id: "israelita" }),
        C("homem", -260, "walk", { dy: 0.58, facing: -1, id: "israelita-2" }),
      ] }),
      // v.33 — a peleja em Baal-Tamar; a emboscada SAI do seu lugar, da caverna de Gibeá.
      b(33, { q: "a emboscada de Israel saiu do seu lugar", set: "emboscadas", props: EMBOSCADA,
        env: { terrain: "field", night: 0.5, glory: 0.16, storm: 0.22, verdure: 0.2 }, cast: [
        C("homem", -215, "stand", { dy: 0.66, facing: 1, id: "emboscado" }),
        C("homem", -60, "walk", { dy: 0.72, facing: 1, id: "emboscado-2" }),
        C("homem", 100, "walk", { dy: 0.66, facing: 1, id: "emboscado-3" }),
        C("homem", 250, "point", { dy: 0.56, facing: 1, id: "capitao" }),
      ] }),
      // v.34 — dez mil escolhidos contra Gibeá; e eles não sabiam o mal que lhes tocaria.
      b(34, { q: "porém eles não sabiam o mal que lhes tocaria", set: "gibea", props: GIBEA,
        env: { terrain: "city", night: 0.54, glory: 0.14, storm: 0.28, verdure: 0.14 }, cast: [
        C("homem", -230, "walk", { dy: 0.68, facing: 1, id: "escolhido" }),
        C("homem", -90, "walk", { dy: 0.62, facing: 1, id: "escolhido-2" }),
        C("homem", 150, "stand", { dy: 0.58, facing: -1, id: "benjamita" }),
        C("homem", 270, "stand", { dy: 0.52, facing: -1, id: "benjamita-2" }),
      ] }),
      // v.35 — o SENHOR fere a Benjamim: 25.100 homens caem naquele dia.
      b(35, { q: "feriu o Senhor a Benjamim diante de Israel",
        env: { night: 0.5, glory: 0.38, storm: 0.34, verdure: 0.12 }, cast: [
        C("homem", -200, "lie", { dy: 0.74, id: "benjamita-caido" }),
        C("homem", -50, "lie", { dy: 0.82, id: "benjamita-caido-2" }),
        C("homem", 110, "lie", { dy: 0.7, id: "benjamita-caido-3" }),
        C("homem", 255, "bow", { dy: 0.64, facing: -1, id: "benjamita" }),
      ] }),
      // v.36 — Benjamim vê que está ferido: Israel dera lugar, confiado na emboscada.
      b(36, { q: "estavam confiados na emboscada", env: { night: 0.52, glory: 0.2 }, cast: [
        C("homem", 130, "bow", { dy: 0.66, facing: -1, id: "benjamita" }),
        C("homem", 260, "kneel", { dy: 0.6, facing: -1, id: "benjamita-2" }),
        C("homem", -140, "stand", { dy: 0.62, facing: 1, id: "israelita" }),
        C("homem", -270, "stand", { dy: 0.56, facing: 1, id: "israelita-2" }),
      ] }),
      // v.37 — a emboscada arremete e fere toda a cidade ao fio da espada.
      b(37, { q: "feriu ao fio da espada toda a cidade",
        env: { night: 0.6, glory: 0.12, storm: 0.3, fire: 0.2, verdure: 0.1 }, cast: [
        C("homem", -175, "walk", { dy: 0.7, facing: 1, id: "emboscado" }),
        C("homem", -20, "point", { dy: 0.66, facing: 1, id: "emboscado-2" }),
        C("homem", 140, "lie", { dy: 0.76, id: "morador-caido" }),
        C("mulherComum", 250, "kneel", { dy: 0.68, facing: -1, id: "moradora" }),
      ] }),
      // v.38 — o SINAL combinado: fazer subir da cidade uma grande nuvem de fumaça.
      b(38, { q: "fazer levantar da cidade uma grande nuvem de fumaça",
        set: "gibea-em-chamas", props: FUMACA,
        env: { terrain: "city", night: 0.6, glory: 0.12, storm: 0.3, fire: 0.55, verdure: 0.08 }, cast: [
        C("homem", -240, "point", { dy: 0.66, facing: 1, id: "emboscado" }),
        C("homem", -110, "raise", { dy: 0.7, facing: 1, id: "emboscado-2" }),
      ] }),
      // v.39 — Israel se vira na peleja; Benjamim ainda diz: estão derrotados como dantes.
      b(39, { by: "homem", q: "pois diziam:",
        set: "campo-de-gibea", props: BATALHA,
        env: { terrain: "field", night: 0.54, glory: 0.14, storm: 0.3, fire: 0.2, verdure: 0.14 }, cast: [
        C("homem", 110, "raise", { dy: 0.62, facing: -1, id: "benjamita" }),
        C("homem", 240, "stand", { dy: 0.56, facing: -1, id: "benjamita-2" }),
        C("homem", -130, "stand", { dy: 0.64, facing: 1, id: "israelita" }),
        C("homem", -265, "stand", { dy: 0.58, facing: 1, id: "israelita-2" }),
      ] }),
      // v.40 — a COLUNA DE FUMAÇA: Benjamim olha para trás e vê a cidade subindo ao céu.
      b(40, { q: "a fumaça da cidade subia ao céu", set: "gibea-em-chamas", props: FUMACA,
        env: { terrain: "city", night: 0.62, glory: 0.1, storm: 0.32, fire: 0.6, verdure: 0.08 }, cast: [
        C("homem", -180, "point", { dy: 0.7, facing: 1, id: "benjamita" }),
        C("homem", -40, "bow", { dy: 0.74, facing: 1, id: "benjamita-2" }),
        C("homem", 235, "stand", { dy: 0.6, facing: 1, id: "israelita" }),
      ] }),
      // v.41 — Israel vira os rostos; e os homens de Benjamim PASMARAM.
      b(41, { q: "os homens de Benjamim pasmaram", cast: [
        C("homem", -60, "kneel", { dy: 0.76, facing: 1, id: "benjamita" }),
        C("homem", 80, "bow", { dy: 0.7, facing: 1, id: "benjamita-2" }),
        C("homem", 250, "point", { dy: 0.62, facing: -1, id: "israelita" }),
      ] }),
      // v.42 — viram as costas para o caminho do DESERTO, e a peleja os apertou.
      b(42, { q: "para o caminho do deserto", set: "fuga-ao-deserto", props: BATALHA,
        env: { terrain: "desert", night: 0.56, glory: 0.12, storm: 0.28, fire: 0.15, verdure: 0.06 }, cast: [
        C("homem", -60, "walk", { dy: 0.72, facing: -1, id: "benjamita" }),
        C("homem", 90, "walk", { dy: 0.66, facing: -1, id: "benjamita-2" }),
        C("homem", 245, "walk", { dy: 0.6, facing: -1, id: "israelita" }),
      ] }),
      // v.43 — cercados e pisados até diante de Gibeá, para o nascente do sol.
      b(43, { q: "até diante de Gibeá, para o nascente do sol", cast: [
        C("homem", -190, "lie", { dy: 0.76, id: "benjamita-caido" }),
        C("homem", -40, "bow", { dy: 0.72, facing: -1, id: "benjamita" }),
        C("homem", 120, "walk", { dy: 0.68, facing: -1, id: "israelita" }),
        C("homem", 260, "point", { dy: 0.6, facing: -1, id: "israelita-2" }),
      ] }),
      // v.44 — caem dezoito mil de Benjamim, todos eles homens valentes.
      b(44, { q: "caíram de Benjamim dezoito mil homens",
        env: { night: 0.66, glory: 0.08, storm: 0.3 }, cast: [
        C("homem", -215, "lie", { dy: 0.72, id: "valente-caido" }),
        C("homem", -70, "lie", { dy: 0.82, id: "valente-caido-2" }),
        C("homem", 95, "lie", { dy: 0.74, id: "valente-caido-3" }),
        C("homem", 240, "lie", { dy: 0.66, id: "valente-caido-4" }),
      ] }),
      // v.45 — fogem ao deserto, à PENHA DE RIMOM; colhem-nos pelos caminhos até Gidom.
      b(45, { q: "fugiram para o deserto, à penha de Rimom", set: "penha-de-rimom", props: RIMOM,
        env: { terrain: "desert", night: 0.6, glory: 0.1, storm: 0.22, verdure: 0.04 }, cast: [
        C("homem", -200, "walk", { dy: 0.7, facing: 1, id: "fugitivo" }),
        C("homem", -70, "walk", { dy: 0.76, facing: 1, id: "fugitivo-2" }),
        C("homem", 155, "lie", { dy: 0.72, id: "colhido-no-caminho" }),
      ] }),
      // v.46 — ao todo, vinte e cinco mil de Benjamim naquele dia.
      b(46, { q: "foram vinte e cinco mil homens que tiravam a espada",
        env: { night: 0.68, glory: 0.06 }, cast: [
        C("homem", -230, "lie", { dy: 0.7, id: "caido" }),
        C("homem", -90, "lie", { dy: 0.8, id: "caido-2" }),
        C("homem", 60, "lie", { dy: 0.74, id: "caido-3" }),
        C("homem", 210, "lie", { dy: 0.66, id: "caido-4" }),
      ] }),
      // v.47 — SEISCENTOS HOMENS ficam na penha de Rimom QUATRO MESES.
      b(47, { q: "ficaram na penha de Rimom quatro meses",
        props: [...RIMOM, { ...P("moon", -60, 1.4, undefined, 0.8), sky: true }],
        env: { terrain: "desert", night: 0.66, glory: 0.1, storm: 0.1, verdure: 0.04 }, cast: [
        C("homem", -150, "kneel", { dy: 0.66, facing: 1, id: "remanescente" }),
        C("homem", 20, "bow", { dy: 0.74, facing: 1, id: "remanescente-2" }),
        C("homem", 175, "kneel", { dy: 0.62, facing: -1, id: "remanescente-3" }),
      ] }),
      // v.48 — Israel volta e põe fogo a todas as cidades de Benjamim que acha.
      b(48, { q: "puseram fogo", set: "cidades-queimadas", props: RUINAS,
        env: { terrain: "city", night: 0.68, glory: 0.08, storm: 0.26, fire: 0.7, verdure: 0.04 }, cast: [
        C("homem", -250, "walk", { dy: 0.7, facing: 1, id: "israelita" }),
        C("homem", 80, "lie", { dy: 0.78, id: "morador-caido" }),
        C("mulherComum", 230, "lie", { dy: 0.72, id: "moradora-caida" }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Jz 21
  21: {
    start: { terrain: "mountain", night: 0.55, glory: 0.16, storm: 0.08, fire: 0, verdure: 0.14 },
    beats: [
      // v.1 — o JURAMENTO de Mispá: nenhum de nós dará sua filha aos benjamitas.
      b(1, { by: "homem", q: "dizendo:",
        set: "juramento-de-mispa", props: MISPA,
        env: { terrain: "field", night: 0.5, glory: 0.16, storm: 0.08, verdure: 0.22 }, cast: [
        C("homem", -110, "raise", { dy: 0.56, facing: 1, id: "israelita" }),
        C("homem", 80, "stand", { dy: 0.52, facing: -1, id: "israelita-2" }),
        C("anciao", 235, "stand", { dy: 0.48, facing: -1, id: "anciao-da-assembleia" }),
      ] }),
      // v.2 — o povo vem a Betel e ali pranteia com GRANDE PRANTO até à tarde.
      b(2, { q: "prantearam com grande pranto", set: "betel-de-luto", props: BETEL,
        env: { terrain: "mountain", night: 0.62, glory: 0.2, storm: 0.06, verdure: 0.12 }, cast: [
        C("homem", -185, "bow", { dy: 0.64, facing: 1, id: "pranteador" }),
        C("mulherComum", -30, "kneel", { dy: 0.74, id: "pranteadora" }),
        C("homem", 120, "lie", { dy: 0.7, id: "prostrado" }),
        C("anciao", 265, "stand", { dy: 0.56, facing: -1, id: "anciao-da-assembleia" }),
      ] }),
      // v.3 — o clamor: por que hoje falta uma tribo em Israel?
      b(3, { by: "homem", q: "E disseram:",
        env: { night: 0.6, glory: 0.26 }, cast: [
        C("homem", -120, "kneel", { dy: 0.66, facing: 1, id: "pranteador" }),
        C("mulherComum", 60, "bow", { dy: 0.74, id: "pranteadora" }),
        C("homem", 225, "lie", { dy: 0.68, id: "prostrado" }),
      ] }),
      // v.4 — pela manhã edificam ali um ALTAR e oferecem holocaustos e pacíficas.
      b(4, { q: "edificou ali um altar", set: "altar-de-betel", props: BETEL_ALTAR,
        env: { terrain: "mountain", night: 0.44, glory: 0.34, storm: 0.04, fire: 0.3, verdure: 0.16 }, cast: [
        C("homem", -160, "kneel", { dy: 0.6, facing: 1, id: "israelita" }),
        C("arao", 55, "stand", { dy: 0.56, facing: -1, id: "fineias-betel" }),
        C("homem", 245, "bow", { dy: 0.58, facing: -1, id: "israelita-2" }),
      ] }),
      // v.5 — quem não subiu à assembleia do Senhor? Havia grande juramento.
      b(5, { by: "homem", q: "E disseram os filhos de Israel:",
        env: { night: 0.5, glory: 0.26 }, cast: [
        C("homem", -130, "point", { dy: 0.58, facing: 1, id: "israelita" }),
        C("anciao", 100, "stand", { dy: 0.52, facing: -1, id: "anciao-da-assembleia" }),
        C("homem", 250, "stand", { dy: 0.54, facing: -1, id: "israelita-2" }),
      ] }),
      // v.6 — arrependem-se por Benjamim, seu irmão: cortada é hoje uma tribo.
      b(6, { by: "homem", q: "e disseram:",
        env: { night: 0.58, glory: 0.2 }, cast: [
        C("homem", -80, "bow", { dy: 0.64, facing: 1, id: "israelita" }),
        C("mulherComum", 90, "kneel", { dy: 0.72, id: "pranteadora" }),
        C("anciao", 240, "stand", { dy: 0.54, facing: -1, id: "anciao-da-assembleia" }),
      ] }),
      // v.7 — o laço do juramento: como conseguir mulheres para os que restaram?
      b(7, { by: "homem", q: "Como havemos de conseguir mulheres para os que restaram deles", cast: [
        C("homem", -140, "raise", { dy: 0.6, facing: 1, id: "israelita" }),
        C("homem", 30, "stand", { dy: 0.56, facing: -1, id: "israelita-2" }),
        C("anciao", 200, "stand", { dy: 0.5, facing: -1, id: "anciao-da-assembleia" }),
      ] }),
      // v.8 — e eis que ninguém de JABES-GILEADE viera ao arraial, à assembleia.
      b(8, { by: "homem", q: "E disseram:", cast: [
        C("homem", -90, "point", { dy: 0.58, facing: 1, id: "israelita" }),
        C("anciao", 120, "stand", { dy: 0.5, facing: -1, id: "anciao-da-assembleia" }),
        C("homem", 200, "stand", { dy: 0.54, facing: -1, id: "israelita-2" }),
        C("homem", 285, "bow", { dy: 0.5, facing: -1, id: "israelita-3" }),
      ] }),
      // v.9 — contado o povo, nenhum morador de Jabes-Gileade se achou ali.
      b(9, { q: "nenhum dos moradores de Jabes-Gileade se achou ali", cast: [
        C("homem", -170, "stand", { dy: 0.58, facing: 1, id: "israelita" }),
        C("homem", -30, "stand", { dy: 0.54, facing: 1, id: "israelita-2" }),
        C("homem", 130, "stand", { dy: 0.52, facing: -1, id: "israelita-3" }),
        C("servo", 250, "walk", { dy: 0.58, facing: -1, id: "contador-do-povo" }),
      ] }),
      // v.10 — a assembleia envia doze mil valentes com uma ordem terrível.
      b(10, { by: "homem", q: "dizendo:",
        env: { night: 0.62, glory: 0.12, storm: 0.18 }, cast: [
        C("homem", -150, "point", { dy: 0.58, facing: 1, id: "israelita" }),
        C("homem", 40, "stand", { dy: 0.62, facing: -1, id: "valente" }),
        C("homem", 190, "walk", { dy: 0.56, facing: -1, id: "valente-2" }),
      ] }),
      // v.11 — a sentença executada sobre Jabes-Gileade.
      b(11, { by: "homem", q: "A todo o homem e a toda a mulher", set: "jabes-gileade", props: JABES,
        env: { terrain: "city", night: 0.7, glory: 0.06, storm: 0.28, fire: 0.35, verdure: 0.08 }, cast: [
        C("homem", -215, "point", { dy: 0.66, facing: 1, id: "valente" }),
        C("homem", -60, "lie", { dy: 0.78, id: "morador-caido" }),
        C("mulherComum", 110, "lie", { dy: 0.72, id: "moradora-caida" }),
        C("homem", 260, "bow", { dy: 0.62, facing: -1, id: "morador" }),
      ] }),
      // v.12 — quatrocentas moças virgens são trazidas ao arraial, a SILÓ.
      // (o `fire: 0` apaga o incêndio de Jabes-Gileade — o fogo vaza por herança)
      b(12, { q: "quatrocentas moças virgens", set: "silo", props: SILO,
        env: { terrain: "field", night: 0.5, glory: 0.2, storm: 0.08, fire: 0, verdure: 0.35 }, cast: [
        C("mulherComum", -160, "walk", { dy: 0.66, facing: 1, id: "moca-de-jabes" }),
        C("mulherComum", -30, "walk", { dy: 0.72, facing: 1, id: "moca-de-jabes-2" }),
        C("mulherComum", 110, "bow", { dy: 0.66, facing: 1, id: "moca-de-jabes-3" }),
        C("homem", 250, "stand", { dy: 0.58, facing: -1, id: "valente" }),
      ] }),
      // v.13 — a assembleia fala aos benjamitas na penha de Rimom e lhes proclama a PAZ.
      b(13, { q: "lhes proclamou a paz", set: "penha-de-rimom", props: RIMOM,
        env: { terrain: "desert", night: 0.52, glory: 0.24, storm: 0.06, verdure: 0.06 }, cast: [
        C("homem", -230, "raise", { dy: 0.62, facing: 1, id: "mensageiro" }),
        C("homem", 60, "kneel", { dy: 0.7, facing: -1, id: "remanescente" }),
        C("homem", 195, "bow", { dy: 0.64, facing: -1, id: "remanescente-2" }),
      ] }),
      // v.14 — voltam os benjamitas e recebem as mulheres de Jabes — mas não bastaram.
      b(14, { q: "porém estas ainda não lhes bastaram", set: "silo", props: SILO,
        env: { terrain: "field", night: 0.48, glory: 0.22, storm: 0.06, verdure: 0.35 }, cast: [
        C("homem", -190, "walk", { dy: 0.64, facing: 1, id: "benjamita" }),
        C("mulherComum", -50, "stand", { dy: 0.7, facing: -1, id: "moca-de-jabes" }),
        C("homem", 120, "bow", { dy: 0.66, facing: 1, id: "benjamita-2" }),
        C("homem", 255, "kneel", { dy: 0.6, facing: 1, id: "benjamita-3" }),
      ] }),
      // v.15 — o povo se arrepende: o Senhor fizera BRECHA nas tribos de Israel.
      b(15, { q: "o Senhor tinha feito brecha nas tribos de Israel",
        env: { night: 0.56, glory: 0.2, verdure: 0.3 }, cast: [
        C("homem", -140, "bow", { dy: 0.66, facing: 1, id: "israelita" }),
        C("mulherComum", 30, "kneel", { dy: 0.72, id: "pranteadora" }),
        C("anciao", 210, "stand", { dy: 0.56, facing: -1, id: "anciao-da-assembleia" }),
      ] }),
      // v.16 — os ANCIÃOS da assembleia: que faremos acerca de mulheres?
      b(16, { by: "anciao", q: "E disseram os anciãos da assembléia:", cast: [
        C("anciao", -120, "stand", { dy: 0.56, facing: 1, id: "anciao-da-assembleia" }),
        C("anciao", 30, "stand", { dy: 0.52, facing: 1, id: "anciao-2" }),
        C("homem", 200, "stand", { dy: 0.6, facing: -1, id: "benjamita" }),
      ] }),
      // v.17 — tenha Benjamim herança: não seja destruída nenhuma tribo de Israel.
      b(17, { by: "anciao", q: "Disseram mais:", cast: [
        C("anciao", -100, "stand", { dy: 0.56, facing: 1, id: "anciao-da-assembleia" }),
        C("homem", 90, "kneel", { dy: 0.66, facing: -1, id: "benjamita" }),
        C("homem", 240, "bow", { dy: 0.6, facing: -1, id: "benjamita-2" }),
      ] }),
      // v.18 — mas o juramento pesa: maldito quem der mulher aos benjamitas.
      b(18, { by: "anciao", q: "Maldito aquele que der mulher aos benjamitas",
        env: { night: 0.58, glory: 0.16 }, cast: [
        C("anciao", -60, "stand", { dy: 0.56, facing: 1, id: "anciao-da-assembleia" }),
        C("homem", 120, "bow", { dy: 0.64, facing: -1, id: "benjamita" }),
        C("mulherComum", 255, "stand", { dy: 0.6, facing: -1, id: "filha-de-israel" }),
      ] }),
      // v.19 — a saída: a SOLENIDADE anual do Senhor em SILÓ, ao norte de Betel.
      b(19, { by: "anciao", q: "Então disseram:",
        set: "solenidade-de-silo", props: SILO,
        env: { terrain: "field", night: 0.3, glory: 0.38, storm: 0, verdure: 0.5 }, cast: [
        C("anciao", -175, "stand", { dy: 0.54, facing: 1, id: "anciao-da-assembleia" }),
        C("mulherComum", 60, "walk", { dy: 0.68, facing: -1, id: "filha-de-silo" }),
        C("mulherComum", 175, "walk", { dy: 0.62, facing: -1, id: "filha-de-silo-2" }),
        C("multidao", 275, "stand", { dy: 0.36 }),
      ] }),
      // v.20 — a ordem aos benjamitas: ide, e emboscai-vos nas VINHAS.
      b(20, { by: "homem", q: "dizendo:", set: "vinhas-de-silo", props: VINHAS,
        env: { terrain: "field", night: 0.34, glory: 0.34, storm: 0, verdure: 0.55 }, cast: [
        C("homem", -240, "point", { dy: 0.58, facing: 1, id: "mensageiro" }),
        C("homem", -80, "bow", { dy: 0.72, facing: 1, id: "benjamita" }),
        C("homem", 70, "kneel", { dy: 0.68, facing: 1, id: "benjamita-2" }),
      ] }),
      // v.21 — as FILHAS DE SILÓ dançando em rodas; saí e arrebatai cada um a sua.
      b(21, { by: "homem", q: "as filhas de Siló a dançar em rodas", cast: [
        C("homem", -300, "point", { dy: 0.56, facing: 1, id: "mensageiro" }),
        C("homem", -190, "walk", { dy: 0.72, facing: 1, id: "benjamita" }),
        C("homem", -40, "point", { dy: 0.68, facing: 1, id: "benjamita-2" }),
        C("mulherComum", 90, "walk", { dy: 0.74, facing: -1, id: "filha-de-silo" }),
        C("mulherComum", 210, "raise", { dy: 0.7, facing: -1, id: "filha-de-silo-2" }),
        C("mulherComum", 305, "walk", { dy: 0.66, facing: -1, id: "filha-de-silo-3" }),
      ] }),
      // v.22 — e aos pais e irmãos que vierem litigar: tende compaixão deles.
      b(22, { by: "homem", q: "Por amor de nós, tende compaixão deles",
        env: { night: 0.4, glory: 0.3 }, cast: [
        C("homem", -150, "raise", { dy: 0.6, facing: 1, id: "mensageiro" }),
        C("homem", 40, "point", { dy: 0.64, facing: -1, id: "pai-de-silo" }),
        C("homem", 190, "stand", { dy: 0.58, facing: -1, id: "irmao-de-silo" }),
      ] }),
      // v.23 — Benjamim leva as mulheres, volta à herança e REEDIFICA as cidades.
      b(23, { q: "reedificaram as cidades, e habitaram nelas", set: "heranca-de-benjamim", props: HERANCA,
        env: { terrain: "field", night: 0.34, glory: 0.32, storm: 0, verdure: 0.5 }, cast: [
        C("homem", -230, "stand", { dy: 0.62, facing: 1, id: "benjamita" }),
        C("mulherComum", -100, "stand", { dy: 0.66, facing: -1, id: "mulher-de-benjamim" }),
        C("homem", 40, "raise", { dy: 0.6, facing: 1, id: "benjamita-2" }),
        C("mulherComum", 175, "stand", { dy: 0.56, facing: -1, id: "mulher-de-benjamim-2" }),
      ] }),
      // v.24 — e os filhos de Israel partem dali, cada um para a sua herança.
      b(24, { q: "cada um para a sua herança", env: { night: 0.4, glory: 0.26, verdure: 0.42 }, cast: [
        C("homem", -250, "walk", { dy: 0.64, facing: -1, id: "israelita" }),
        C("mulherComum", -90, "walk", { dy: 0.7, facing: -1, id: "israelita-mulher" }),
        C("homem", 90, "walk", { dy: 0.6, facing: 1, id: "israelita-2" }),
        C("servo", 235, "walk", { dy: 0.56, facing: 1, id: "servo-de-israel" }),
      ] }),
      // v.25 — A SENTENÇA DO LIVRO: não havia rei em Israel — o TRONO VAZIO, e cada
      // um seguindo o seu próprio caminho, cada um fazendo o que lhe parecia reto.
      b(25, { q: "cada um fazia o que parecia reto aos seus olhos",
        set: "nao-havia-rei-em-israel", props: TRONO_VAZIO,
        env: { terrain: "field", night: 0.55, glory: 0.1, storm: 0.12, fire: 0, verdure: 0.22 }, cast: [
        C("homem", -235, "walk", { dy: 0.7, facing: -1, id: "cada-um" }),
        C("mulherComum", -110, "walk", { dy: 0.6, facing: 1, id: "cada-uma" }),
        C("servo", 120, "walk", { dy: 0.74, facing: 1, id: "cada-um-2" }),
        C("homem", 265, "walk", { dy: 0.52, facing: -1, id: "cada-um-3" }),
      ] }),
    ],
  },
};
