// ============================================================================
// JOSUÉ 1–2 — CENA VIVA. A CONQUISTA começa: morto Moisés, Deus comissiona
// JOSUÉ para atravessar o Jordão e possuir Canaã.
//
// Js 1 — A COMISSÃO: junto ao Jordão, além do rio, DEUS fala do céu a Josué
// (voz do céu, glória, SEM figura) — "levanta-te, passa este Jordão"; "todo o
// lugar que pisar a planta do vosso pé"; o triplo "ESFORÇA-TE E TEM BOM ÂNIMO"
// (1:6,7,9); "não se aparte da tua boca o LIVRO DESTA LEI" (o rolo). Então
// JOSUÉ (`servo` id:"josue") dá ordem aos oficiais: em TRÊS DIAS passareis o
// Jordão. E manda RÚBEN, GADE e a meia MANASSÉS passarem ARMADOS na frente; o
// povo promete obedecer.
//
// Js 2 — RAABE E OS ESPIAS: de Sitim, Josué envia DOIS ESPIAS a Jericó
// (`homem` id:"espia1/2"). Entram na casa de RAABE (`mulherComum` id:"raabe"),
// sobre o MURO da cidade (`tower`/`church`). O rei os busca; Raabe os ESCONDE no
// eirado sob as CANAS DO LINHO e engana os perseguidores. Ela CONFESSA a fé —
// "o Senhor vosso Deus é Deus em cima nos céus e embaixo na terra" (2:11) — e
// pede misericórdia. Os espias descem pela corda da JANELA; o sinal é o CORDÃO
// de escarlata atado à janela do muro. Fogem aos MONTES três dias e voltam a
// Josué: "o Senhor tem dado toda esta terra nas nossas mãos".
//
// A VOZ DE DEUS (regra do projeto): em Js 1 não há mediador — Deus fala do céu
// a Josué, logo `by:"deus"` (glória alta, sem figura). Quando JOSUÉ fala,
// `by:"servo"` com Josué (id:"josue") PRIMEIRO no cast. Raabe = `by:"mulherComum"`.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const jv = (v: number, q?: string) => b(v, { by: "servo", ...(q ? { q } : {}) }); // Josué fala
const dv = (v: number, q?: string) => b(v, { by: "deus", ...(q ? { q } : {}) });   // voz do céu

// ARRAIAL de Israel além do Jordão, em Sitim — a cena-base de Js 1: o rio
// (que hão de atravessar) ao fundo, as tendas do arraial, os montes de Canaã.
const ARRAIAL: StagePropSpec[] = [
  P("river", 0, 1.4, undefined, 0.86),
  P("tent", -235, 1.05, undefined, 0.2),
  P("tent", 225, 1.0, undefined, 0.24),
  P("rock", 315, 1.1, undefined, 0.32),
  P("palm", -320, 1.0, undefined, 0.14),
  P("grass", 90, 0.78, undefined, 0.68),
];
// JERICÓ — a cidade murada: o grande MURO (tower) e, sobre ele, a casa de
// Raabe (church); o Jordão e os montes ao fundo, as palmeiras da planície.
const JERICO: StagePropSpec[] = [
  P("tower", -155, 1.34, undefined, 0.24),
  P("church", 155, 1.2, undefined, 0.28),
  P("rock", 315, 1.1, undefined, 0.36),
  P("palm", -325, 1.0, undefined, 0.16),
];
// OS MONTES — a fuga dos espias, escondidos três dias entre as rochas.
const MONTE: StagePropSpec[] = [
  P("rock", 0, 1.5, undefined, 0.42),
  P("rock", 215, 1.2, undefined, 0.54),
  P("tree", 265, 1.0, undefined, 0.28),
  P("grass", -85, 0.8, undefined, 0.8),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Js 1
  1: {
    start: { terrain: "field", night: 0.1, glory: 0.66, storm: 0, fire: 0, verdure: 0.4 },
    beats: [
      // v.1 — morto Moisés, o SENHOR fala a Josué: a voz do céu sobre o arraial.
      dv(1, "o SENHOR falou a Josué"),
      // v.2 — "levanta-te, passa este Jordão": o rio à frente, Josué se levanta.
      b(2, { by: "deus", q: "passa este Jordão", props: ARRAIAL,
        env: { terrain: "field", glory: 0.74, night: 0.08, verdure: 0.42 }, cast: [
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.2 }),
        C("multidao", 150, "stand", { dy: 0.62 }),
      ] }),
      // v.3 — "todo o lugar que pisar a planta do vosso pé": Josué aponta o chão.
      b(3, { by: "deus", q: "que pisar a planta do vosso pé", cast: [
        C("servo", -140, "point", { dy: 0.5, facing: 1, id: "josue", glow: 0.2 }),
      ] }),
      // v.4 — os TERMOS da terra: do deserto ao Eufrates, ao grande mar.
      b(4, { by: "deus", q: "até ao grande rio, o rio Eufrates", cast: [
        C("servo", -140, "stand", { dy: 0.5, facing: 1, id: "josue", glow: 0.18 }),
      ] }),
      // v.5 — "como fui com Moisés, assim serei contigo": glória alta sobre Josué.
      b(5, { by: "deus", q: "como fui com Moisés, assim serei contigo",
        env: { terrain: "field", glory: 0.82, night: 0.06 }, cast: [
        C("servo", -130, "kneel", { dy: 0.52, facing: 1, id: "josue", glow: 0.24 }),
      ] }),
      // v.6 — ÍCONE: "Esforça-te, e tem bom ânimo" — Josué se ergue animado.
      b(6, { by: "deus", q: "Esforça-te, e tem bom ânimo",
        env: { terrain: "field", glory: 0.85, night: 0.05 }, cast: [
        C("servo", -130, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.26 }),
      ] }),
      // v.7 — esforça-te e guarda toda a LEI de Moisés: o rolo em cena.
      b(7, { by: "deus", q: "esforça-te e tem mui bom ânimo", props: [
        ...ARRAIAL, P("scroll", -70, 0.95, undefined, 0.56),
      ], env: { terrain: "field", glory: 0.78, night: 0.08, verdure: 0.42 }, cast: [
        C("servo", -155, "stand", { dy: 0.5, facing: 1, id: "josue", glow: 0.2 }),
      ] }),
      // v.8 — ÍCONE: "Não se aparte da tua boca o livro desta lei" — o rolo aberto.
      b(8, { by: "deus", q: "Não se aparte da tua boca o livro desta lei", props: [
        ...ARRAIAL, { ...P("scroll", -60, 1.1, undefined, 0.54), tag: "livro-da-lei" },
      ], env: { terrain: "field", glory: 0.82, night: 0.06, verdure: 0.42 }, cast: [
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.24 }),
      ] }),
      // v.9 — ÍCONE: "não temas, nem te espantes; o Senhor teu Deus é contigo".
      b(9, { by: "deus", q: "não temas, nem te espantes",
        env: { terrain: "field", glory: 0.85, night: 0.05 }, cast: [
        C("servo", -130, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.26 }),
      ] }),
      // v.10 — Josué toma a palavra e dá ordem aos OFICIAIS do povo.
      b(10, { by: "servo", q: "deu ordem aos príncipes do povo", props: ARRAIAL,
        env: { terrain: "field", glory: 0.62, night: 0.1, verdure: 0.4 }, cast: [
        C("servo", -150, "point", { dy: 0.5, facing: 1, id: "josue", glow: 0.15 }),
        C("anciao", 40, "stand", { dy: 0.5, id: "oficial1" }),
        C("anciao", 140, "stand", { dy: 0.52, facing: -1, id: "oficial2" }),
      ] }),
      // v.11 — "dentro de TRÊS DIAS passareis este Jordão": preparar comida.
      b(11, { by: "servo", q: "dentro de três dias passareis este Jordão", cast: [
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.15 }),
        C("multidao", 140, "stand", { dy: 0.6 }),
      ] }),
      // v.12 — Josué fala a RÚBEN, GADE e à meia tribo de MANASSÉS.
      b(12, { by: "servo", q: "aos rubenitas, e aos gaditas", cast: [
        C("servo", -150, "point", { dy: 0.5, facing: 1, id: "josue", glow: 0.15 }),
        C("homem", 50, "stand", { dy: 0.5, facing: -1, id: "ruben" }),
        C("homem", 145, "stand", { dy: 0.52, facing: -1, id: "gade" }),
      ] }),
      // v.13 — "o Senhor vosso Deus vos dá descanso, e vos dá esta terra".
      b(13, { by: "servo", q: "O Senhor vosso Deus vos dá descanso", cast: [
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.15 }),
        C("homem", 60, "bow", { dy: 0.5, facing: -1, id: "ruben" }),
        C("homem", 150, "bow", { dy: 0.52, facing: -1, id: "gade" }),
      ] }),
      // v.14 — "passareis ARMADOS na frente de vossos irmãos": os valentes.
      b(14, { by: "servo", q: "passareis armados na frente de vossos irmãos", cast: [
        C("servo", -150, "point", { dy: 0.5, facing: 1, id: "josue", glow: 0.15 }),
        C("homem", 60, "raise", { dy: 0.5, facing: -1, id: "ruben" }),
        C("homem", 150, "stand", { dy: 0.52, facing: -1, id: "gade" }),
      ] }),
      // v.15 — até dar descanso aos irmãos; depois voltam à sua herança.
      b(15, { by: "servo", q: "Até que o Senhor dê descanso a vossos irmãos", cast: [
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.15 }),
        C("homem", 90, "stand", { dy: 0.5, facing: -1, id: "ruben" }),
      ] }),
      // v.16 — o povo RESPONDE: "Tudo quanto nos ordenaste faremos".
      b(16, { by: "homem", q: "Tudo quanto nos ordenaste faremos", cast: [
        C("homem", 90, "raise", { dy: 0.5, facing: -1, id: "ruben" }),
        C("homem", 170, "stand", { dy: 0.52, facing: -1, id: "gade" }),
        C("servo", -150, "stand", { dy: 0.5, facing: 1, id: "josue", glow: 0.15 }),
      ] }),
      // v.17 — "assim te ouviremos a ti", como ouviram a Moisés.
      b(17, { by: "homem", q: "assim te ouviremos a ti", cast: [
        C("homem", 90, "stand", { dy: 0.5, facing: -1, id: "ruben" }),
        C("servo", -150, "stand", { dy: 0.5, facing: 1, id: "josue", glow: 0.18 }),
      ] }),
      // v.18 — o rebelde morrerá; e repetem o ânimo: "esforça-te, e tem bom ânimo".
      b(18, { by: "homem", q: "Tão-somente esforça-te, e tem bom ânimo", cast: [
        C("homem", 90, "raise", { dy: 0.5, facing: -1, id: "ruben" }),
        C("homem", 170, "raise", { dy: 0.52, facing: -1, id: "gade" }),
        C("servo", -150, "stand", { dy: 0.5, facing: 1, id: "josue", glow: 0.2 }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Js 2
  2: {
    start: { terrain: "city", night: 0.18, glory: 0.44, storm: 0, fire: 0, verdure: 0.28 },
    beats: [
      // v.1 — de Sitim, Josué envia DOIS ESPIAS a Jericó, à casa de Raabe.
      b(1, { by: "servo", q: "Ide reconhecer a terra e a Jericó", props: ARRAIAL,
        env: { terrain: "field", glory: 0.6, night: 0.1, verdure: 0.4 }, cast: [
        C("servo", -155, "point", { dy: 0.5, facing: 1, id: "josue", glow: 0.15 }),
        C("homem", 60, "walk", { dy: 0.5, facing: -1, id: "espia1" }),
        C("homem", 150, "walk", { dy: 0.52, facing: -1, id: "espia2" }),
      ] }),
      // v.2 — dá-se notícia ao REI de Jericó: vieram espias de Israel.
      b(2, { by: "homem", q: "vieram aqui uns homens dos filhos de Israel", props: JERICO,
        env: { terrain: "city", glory: 0.36, night: 0.42, verdure: 0.22 }, cast: [
        C("homem", -100, "point", { dy: 0.5, facing: 1, id: "informante" }),
        C("rei", 150, "stand", { dy: 0.5, facing: -1, id: "reijerico" }),
      ] }),
      // v.3 — o rei manda a Raabe: "Tira fora os homens que vieram a ti".
      b(3, { by: "rei", q: "Tira fora os homens que vieram a ti", cast: [
        C("rei", -110, "point", { dy: 0.5, facing: 1, id: "reijerico" }),
        C("mulherComum", 130, "stand", { dy: 0.52, facing: -1, id: "raabe" }),
      ] }),
      // v.4 — RAABE toma os dois homens, os esconde, e engana: "não sabia de onde eram".
      b(4, { by: "mulherComum", q: "tomou os dois homens, e os escondeu", cast: [
        C("mulherComum", -80, "point", { dy: 0.52, facing: 1, id: "raabe" }),
        C("homem", 150, "stand", { dy: 0.5, facing: -1, id: "guarda" }),
      ] }),
      // v.5 — segue enganando os perseguidores: "ide após eles depressa".
      b(5, { by: "mulherComum", q: "ide após eles depressa", cast: [
        C("mulherComum", -80, "raise", { dy: 0.52, facing: 1, id: "raabe" }),
        C("homem", 150, "walk", { dy: 0.5, facing: -1, id: "guarda" }),
      ] }),
      // v.6 — ÍCONE: os espias ESCONDIDOS no eirado, entre as CANAS DO LINHO.
      b(6, { q: "escondido entre as canas do linho", props: JERICO,
        env: { terrain: "city", glory: 0.34, night: 0.46, verdure: 0.22 }, cast: [
        C("mulherComum", 120, "stand", { dy: 0.44, facing: -1, id: "raabe" }),
        C("homem", 130, "lie", { dy: 0.34, id: "espia1" }),
        C("homem", 185, "lie", { dy: 0.32, id: "espia2" }),
      ] }),
      // v.7 — os perseguidores saem pelo caminho do Jordão, até aos vaus.
      b(7, { q: "pelo caminho do Jordão, até aos vaus", props: [
        ...JERICO, P("river", -30, 1.3, undefined, 0.8),
      ], env: { terrain: "city", glory: 0.36, night: 0.44, verdure: 0.22 }, cast: [
        C("homem", -90, "walk", { dy: 0.5, facing: 1, id: "guarda" }),
        C("homem", 20, "walk", { dy: 0.52, facing: 1, id: "guarda2" }),
      ] }),
      // v.8 — antes que dormissem, Raabe sobe a eles no eirado.
      b(8, { q: "ela subiu a eles no eirado", props: JERICO,
        env: { terrain: "city", glory: 0.38, night: 0.42, verdure: 0.22 }, cast: [
        C("mulherComum", 120, "stand", { dy: 0.42, facing: -1, id: "raabe" }),
        C("homem", 140, "kneel", { dy: 0.36, id: "espia1" }),
      ] }),
      // v.9 — RAABE crê: "bem sei que o Senhor vos deu esta terra".
      b(9, { by: "mulherComum", q: "Bem sei que o Senhor vos deu esta terra", cast: [
        C("mulherComum", -60, "raise", { dy: 0.46, facing: 1, id: "raabe" }),
        C("homem", 130, "stand", { dy: 0.44, facing: -1, id: "espia1" }),
      ] }),
      // v.10 — ela ouviu do Mar Vermelho seco e de Siom e Ogue destruídos.
      b(10, { by: "mulherComum", q: "o Senhor secou as águas do Mar Vermelho", cast: [
        C("mulherComum", -60, "point", { dy: 0.46, facing: 1, id: "raabe" }),
        C("homem", 130, "stand", { dy: 0.44, facing: -1, id: "espia1" }),
      ] }),
      // v.11 — ÍCONE-CONFISSÃO: "é Deus em cima nos céus e embaixo na terra" (glória alta).
      b(11, { by: "mulherComum", q: "é Deus em cima nos céus e em baixo na terra",
        env: { terrain: "city", glory: 0.72, night: 0.2, verdure: 0.24 }, cast: [
        C("mulherComum", -40, "raise", { dy: 0.46, facing: 1, id: "raabe", glow: 0.18 }),
        C("homem", 130, "bow", { dy: 0.46, facing: -1, id: "espia1" }),
      ] }),
      // v.12 — pede juramento: "dai-me um sinal seguro".
      b(12, { by: "mulherComum", q: "dai-me um sinal seguro",
        env: { terrain: "city", glory: 0.44, night: 0.32, verdure: 0.24 }, cast: [
        C("mulherComum", -60, "kneel", { dy: 0.48, facing: 1, id: "raabe" }),
        C("homem", 130, "stand", { dy: 0.44, facing: -1, id: "espia1" }),
      ] }),
      // v.13 — que livrem da morte seu pai, mãe, irmãos e irmãs.
      b(13, { by: "mulherComum", q: "livrareis as nossas vidas da morte", cast: [
        C("mulherComum", -60, "point", { dy: 0.48, facing: 1, id: "raabe" }),
        C("homem", 130, "stand", { dy: 0.44, facing: -1, id: "espia1" }),
      ] }),
      // v.14 — os espias juram: "a nossa vida responderá pela vossa até à morte".
      b(14, { by: "homem", q: "A nossa vida responderá pela vossa até à morte", cast: [
        C("homem", 100, "raise", { dy: 0.44, facing: -1, id: "espia1" }),
        C("mulherComum", -70, "stand", { dy: 0.48, facing: 1, id: "raabe" }),
      ] }),
      // v.15 — ela os faz DESCER por uma corda pela JANELA do muro.
      b(15, { q: "os fez descer por uma corda pela janela", props: JERICO,
        env: { terrain: "city", glory: 0.42, night: 0.36, verdure: 0.24 }, cast: [
        C("mulherComum", 120, "raise", { dy: 0.4, facing: -1, id: "raabe" }),
        C("homem", 145, "stand", { dy: 0.56, facing: 1, id: "espia1" }),
        C("homem", 185, "lie", { dy: 0.62, id: "espia2" }),
      ] }),
      // v.16 — Raabe: "ide-vos ao monte", escondei-vos três dias.
      b(16, { by: "mulherComum", q: "Ide-vos ao monte", cast: [
        C("mulherComum", 120, "point", { dy: 0.4, facing: -1, id: "raabe" }),
        C("homem", -60, "walk", { dy: 0.54, facing: 1, id: "espia1" }),
      ] }),
      // v.17 — os espias: "desobrigados seremos deste juramento" (as condições).
      b(17, { by: "homem", q: "Desobrigados seremos deste juramento", cast: [
        C("homem", -60, "point", { dy: 0.54, facing: 1, id: "espia1" }),
        C("mulherComum", 120, "stand", { dy: 0.4, facing: -1, id: "raabe" }),
      ] }),
      // v.18 — ÍCONE: "atarás este CORDÃO de fio de escarlata à janela".
      b(18, { by: "homem", q: "atarás este cordão de fio de escarlata à janela", props: JERICO,
        env: { terrain: "city", glory: 0.44, night: 0.34, verdure: 0.24 }, cast: [
        C("homem", -60, "point", { dy: 0.54, facing: 1, id: "espia1" }),
        C("mulherComum", 130, "stand", { dy: 0.4, facing: -1, id: "raabe" }),
      ] }),
      // v.19 — quem sair pela porta, seu sangue sobre a sua cabeça.
      b(19, { by: "homem", q: "o seu sangue será sobre a sua cabeça", cast: [
        C("homem", -60, "raise", { dy: 0.54, facing: 1, id: "espia1" }),
        C("mulherComum", 130, "stand", { dy: 0.4, facing: -1, id: "raabe" }),
      ] }),
      // v.20 — mas se denunciar, "seremos desobrigados do juramento".
      b(20, { by: "homem", q: "seremos desobrigados do juramento", cast: [
        C("homem", -60, "point", { dy: 0.54, facing: 1, id: "espia1" }),
        C("mulherComum", 130, "stand", { dy: 0.4, facing: -1, id: "raabe" }),
      ] }),
      // v.21 — ÍCONE: Raabe concorda e ATA o cordão de escarlata à janela.
      b(21, { by: "mulherComum", q: "atou o cordão de escarlata à janela", props: [
        ...JERICO, { ...P("rock", -285, 1.0, undefined, 0.34), tag: "muro-de-jerico" },
      ], env: { terrain: "city", glory: 0.5, night: 0.28, verdure: 0.26 }, cast: [
        C("mulherComum", 120, "raise", { dy: 0.4, facing: -1, id: "raabe", glow: 0.12 }),
      ] }),
      // v.22 — os espias fogem, "chegaram ao monte, e ficaram ali três dias".
      b(22, { q: "chegaram ao monte, e ficaram ali três dias", props: MONTE,
        env: { terrain: "mountain", glory: 0.34, night: 0.4, verdure: 0.2 }, cast: [
        C("homem", -60, "kneel", { dy: 0.52, facing: 1, id: "espia1" }),
        C("homem", 40, "lie", { dy: 0.56, id: "espia2" }),
      ] }),
      // v.23 — voltam e "chegaram a Josué, filho de Num", e lhe contam tudo.
      b(23, { q: "chegaram a Josué, filho de Num", props: ARRAIAL,
        env: { terrain: "field", glory: 0.6, night: 0.1, verdure: 0.4 }, cast: [
        C("servo", -150, "stand", { dy: 0.5, facing: 1, id: "josue", glow: 0.15 }),
        C("homem", 60, "walk", { dy: 0.5, facing: -1, id: "espia1" }),
        C("homem", 150, "walk", { dy: 0.52, facing: -1, id: "espia2" }),
      ] }),
      // v.24 — o relato: "o Senhor tem dado toda esta terra nas nossas mãos".
      b(24, { by: "homem", q: "o Senhor tem dado toda esta terra nas nossas mãos", cast: [
        C("homem", 70, "raise", { dy: 0.5, facing: -1, id: "espia1" }),
        C("homem", 160, "raise", { dy: 0.52, facing: -1, id: "espia2" }),
        C("servo", -150, "stand", { dy: 0.5, facing: 1, id: "josue", glow: 0.18 }),
      ] }),
    ],
  },
};
