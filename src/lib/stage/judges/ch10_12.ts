// ============================================================================
// JUÍZES 10–12 — CENA VIVA. TOLA e JAIR; a APOSTASIA MÚLTIPLA e o CLAMOR;
// JEFTÉ, o filho da estrangeira; o VOTO; a FILHA; "CHIBOLETE" nos vaus do Jordão.
//
// Jz 10 — Depois do sangue de Abimeleque, dois juízes de descanso: TOLA, de
// Issacar, em Samir na montanha de Efraim (23 anos), e JAIR, o gileadita, com
// trinta filhos sobre trinta jumentos e trinta cidades — as HAVOTE-JAIR (22
// anos). Morto Jair, o ciclo recomeça, e agora pior de todos: Israel serve aos
// BAALINS e a ASTAROTE, e ainda aos deuses da SÍRIA, de SIDOM, de MOABE, de
// AMOM e dos FILISTEUS — sete apostasias de uma vez, "e deixaram ao SENHOR, e
// não o serviram". A ira se acende: dezoito anos de opressão em Gileade, além
// do Jordão, e os amonitas passam o rio contra Judá, Benjamim e Efraim. Israel
// clama; e o SENHOR responde com a mais dura das palavras: "Ide, e clamai aos
// deuses que escolhestes." Então vem a cena forte do arrependimento: eles
// TIRAM DE SI os deuses estranhos e servem ao SENHOR — "e se angustiou a sua
// alma por causa da desgraça de Israel". Os exércitos se acampam: Amom em
// Gileade, Israel em MIZPÁ, sem cabeça que os leve.
//
// Jz 11 — JEFTÉ, homem valoroso, filho de uma prostituta, EXPULSO pelos irmãos
// ("não herdarás na casa de nosso pai"), foge para Tobe e ajunta homens
// levianos. Quando o aperto aperta, os ANCIÃOS de Gileade vão buscá-lo, e o
// rejeitado vira CHEFE — "perante o SENHOR em Mizpá". Segue a longa EMBAIXADA
// ao rei de Amom (vv.12-28): Jefté reconta toda a história de Israel — o
// deserto, o Mar Vermelho, Cades, Edom e Moabe que negaram passagem, Arnom,
// Siom rei de Hesbom ferido em Jasa, a herança do Arnom ao Jaboque, Quemós,
// Balaque filho de Zipor, os trezentos anos em Hesbom — e entrega a causa ao
// SENHOR, "que é juiz". O rei não dá ouvidos. O Espírito do SENHOR vem sobre
// Jefté; e ali ele faz o VOTO precipitado: o que sair da porta da sua casa ao
// encontro será do SENHOR, em holocausto. Vem a vitória — vinte cidades, de
// Aroer a Abel-Queramim. E vem a volta a Mizpá: a sua FILHA, a ÚNICA, sai a
// recebê-lo com ADUFES e DANÇAS. Ele rasga as vestes; ela pede dois meses para
// chorar a sua virgindade pelos montes; e ao fim de dois meses ele cumpre nela
// o voto. Daí o costume: quatro dias por ano, as filhas de Israel a lamentam.
//
// Jz 12 — EFRAIM, sempre tarde e sempre inflamado, ameaça queimar a casa de
// Jefté. Gileade peleja e toma os VAUS DO JORDÃO: quem não sabia dizer
// "CHIBOLETE" — dizia "Sibolete" — caía ali. Quarenta e dois mil de Efraim.
// Jefté julga seis anos e é sepultado numa das cidades de Gileade; depois dele
// IBZÃ de Belém, ELOM o zebulonita e ABDOM, filho de Hilel, o piratonita,
// com setenta jumentos para os seus filhos e netos.
//
// A VOZ DE DEUS (regra do projeto): em Jz 10:11-14 o SENHOR fala DIRETO, sem
// mediador visível — `by: "deus"`, voz do céu, sem figura alguma em cena.
// Jefté, protagonista, fala como `by: "servo"` (id "jefte", SEMPRE o primeiro
// servo do cast do beat); a filha fala como `by: "mulherComum"` (id
// "filha-jefte", SEMPRE a primeira mulherComum do beat).
//
// TOM: a morte da filha, os quarenta e dois mil dos vaus e a mortandade de
// Amom NUNCA levam `multidao` (que ignora pose e comemora sempre) — ali só
// individuais em `lie`/`kneel`/`bow`, night alto e glória baixa.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const dv = (v: number, q?: string, extra: Partial<StageBeat> = {}) => b(v, { by: "deus", ...(q ? { q } : {}), ...extra });

// ---------------------------------------------------------------- SETS Jz 10
// SAMIR, na montanha de Efraim — a aldeia sossegada de Tola, filho de Puá.
const SAMIR: StagePropSpec[] = [
  P("church", -60, 1.0, undefined, 0.32),
  P("tree", 200, 1.1, undefined, 0.24),
  P("rock", -280, 1.15, undefined, 0.42),
  P("grass", 60, 0.78, undefined, 0.7),
  P("palm", 320, 1.0, undefined, 0.14),
];
// HAVOTE-JAIR — as trinta cidades de Gileade e os trinta jumentos dos filhos.
const HAVOTE: StagePropSpec[] = [
  P("tower", 150, 1.1, undefined, 0.3),
  P("church", -110, 0.95, undefined, 0.34),
  P("stall", -280, 1.0, undefined, 0.5),
  P("crate", 40, 0.8, undefined, 0.62),
  P("grass", 250, 0.75, undefined, 0.7),
];
// A APOSTASIA — o bezerro dos baalins, o altar estranho aceso, o alto pagão.
const IDOLOS: StagePropSpec[] = [
  P("calf", -150, 1.05, undefined, 0.52),
  P("altar", 130, 1.0, 0.55, 0.44),
  P("tower", 290, 1.0, undefined, 0.3),
  P("rock", -20, 1.0, undefined, 0.68),
  P("bush", 230, 0.85, undefined, 0.6),
];
// A OPRESSÃO — Gileade além do Jordão, dezoito anos debaixo de Amom.
const OPRESSAO: StagePropSpec[] = [
  P("river", 0, 1.4, undefined, 0.86),
  P("tent", -240, 1.05, undefined, 0.22),
  P("tower", 250, 1.0, undefined, 0.3),
  P("rock", -120, 1.1, undefined, 0.5),
  P("bush", 140, 0.8, undefined, 0.64),
];
// O CLAMOR — a terra nua, o ídolo ainda de pé enquanto o povo cai de joelhos.
const CLAMOR: StagePropSpec[] = [
  P("rock", -250, 1.1, undefined, 0.44),
  P("calf", 230, 0.9, undefined, 0.6),
  P("bush", -80, 0.85, undefined, 0.62),
  P("tent", 300, 1.0, undefined, 0.26),
  P("grass", 60, 0.78, undefined, 0.72),
];
// OS DEUSES ALHEIOS TIRADOS DO MEIO DE SI — o ídolo por terra e o fogo que o come.
const PURIFICA: StagePropSpec[] = [
  P("campfire", 120, 1.15, 0.7, 0.5),
  P("calf", -170, 0.8, undefined, 0.7),
  P("rock", 260, 1.1, undefined, 0.42),
  P("tent", -300, 1.0, undefined, 0.24),
  P("grass", 20, 0.76, undefined, 0.72),
];
// MIZPÁ — o arraial de Israel congregado, o altar do juramento no meio.
const MIZPA: StagePropSpec[] = [
  P("tent", -220, 1.1, undefined, 0.22),
  P("tent", 220, 1.05, undefined, 0.26),
  P("altar", 30, 1.0, undefined, 0.44),
  P("rock", -300, 1.05, undefined, 0.4),
  P("grass", 120, 0.76, undefined, 0.7),
];

// ---------------------------------------------------------------- SETS Jz 11
// A CASA DE GILEADE — a porta da herança que se fecha para o filho de outra mulher.
const CASA_GILEADE: StagePropSpec[] = [
  P("door", 40, 1.1, undefined, 0.36),
  P("church", -180, 1.0, undefined, 0.32),
  P("well", 240, 0.9, undefined, 0.5),
  P("crate", -60, 0.8, undefined, 0.62),
  P("palm", 320, 1.0, undefined, 0.14),
];
// A TERRA DE TOBE — o exílio do rejeitado, a fogueira dos homens levianos.
const TOBE: StagePropSpec[] = [
  P("tent", -170, 1.05, undefined, 0.26),
  P("campfire", 90, 1.05, 0.5, 0.5),
  P("rock", 250, 1.15, undefined, 0.42),
  P("bush", -60, 0.85, undefined, 0.64),
  P("grass", 180, 0.72, undefined, 0.7),
];
// A CORTE DE AMOM — o trono do rei que manda restituir a terra "em paz".
const CORTE_AMOM: StagePropSpec[] = [
  P("throne", 120, 1.05, undefined, 0.4),
  P("tower", -200, 1.05, undefined, 0.3),
  P("church", 300, 0.95, undefined, 0.34),
  P("crate", -40, 0.8, undefined, 0.62),
  P("grass", 40, 0.74, undefined, 0.72),
];
// MEMÓRIA — o deserto até o MAR VERMELHO, quando Israel subiu do Egito.
const MEM_MAR: StagePropSpec[] = [
  P("river", 0, 1.5, undefined, 0.84),
  P("rock", -270, 1.2, undefined, 0.42),
  P("palm", 300, 1.0, undefined, 0.14),
  { ...P("sun", 60, 1.1, undefined, 0.62), sky: true },
  P("bush", 170, 0.78, undefined, 0.64),
];
// MEMÓRIA — CADES: Edom e Moabe negam passagem, e Israel fica parado.
const MEM_CADES: StagePropSpec[] = [
  P("tent", -200, 1.05, undefined, 0.24),
  P("well", 20, 0.9, undefined, 0.52),
  P("rock", 180, 1.2, undefined, 0.44),
  P("bush", 280, 0.8, undefined, 0.62),
  P("palm", -320, 1.0, undefined, 0.14),
];
// MEMÓRIA — o ribeiro ARNOM, o limite dos moabitas que Israel não transpôs.
const MEM_ARNOM: StagePropSpec[] = [
  P("river", 0, 1.4, undefined, 0.86),
  P("rock", -240, 1.15, undefined, 0.44),
  P("rock", 240, 1.1, undefined, 0.4),
  P("bush", 120, 0.82, undefined, 0.62),
  P("palm", 320, 1.0, undefined, 0.14),
];
// MEMÓRIA — JASA: Siom, rei dos amorreus, ajunta o povo e combate Israel.
const MEM_JASA: StagePropSpec[] = [
  P("tower", -160, 1.1, undefined, 0.3),
  P("church", 140, 0.95, undefined, 0.34),
  P("tent", 300, 1.0, undefined, 0.26),
  P("campfire", 40, 0.9, 0.45, 0.5),
  P("rock", -30, 1.05, undefined, 0.66),
];
// MEMÓRIA — HESBOM e as suas vilas: trezentos anos de posse pacífica.
const HESBOM: StagePropSpec[] = [
  P("church", -140, 1.0, undefined, 0.34),
  P("tower", 120, 1.1, undefined, 0.3),
  P("well", -20, 0.85, undefined, 0.56),
  P("grapes", 260, 0.9, undefined, 0.4),
  P("palm", -330, 1.0, undefined, 0.14),
];
// A GUERRA DE AMOM — de Aroer a Abel-Queramim, vinte cidades subjugadas.
const GUERRA: StagePropSpec[] = [
  P("tower", 160, 1.1, undefined, 0.3),
  P("campfire", -140, 1.1, 0.6, 0.5),
  P("rock", 20, 1.15, undefined, 0.62),
  P("church", 300, 0.95, undefined, 0.34),
  P("bush", -280, 0.8, undefined, 0.6),
];
// A CASA DE JEFTÉ EM MIZPÁ — a PORTA de onde havia de sair o holocausto.
const CASA_JEFTE: StagePropSpec[] = [
  P("door", -20, 1.15, undefined, 0.38),
  P("church", 200, 0.95, undefined, 0.34),
  P("tent", -250, 1.0, undefined, 0.24),
  P("amphora", 100, 0.8, undefined, 0.62),
  P("grass", 280, 0.75, undefined, 0.7),
];
// OS MONTES — dois meses de choro, a lua fria sobre as alturas de Gileade.
const MONTES: StagePropSpec[] = [
  P("rock", -180, 1.25, undefined, 0.42),
  P("tree", 160, 1.05, undefined, 0.26),
  P("rock", 300, 1.05, undefined, 0.5),
  { ...P("moon", -60, 1.5, undefined, 0.78), sky: true },
  P("grass", 40, 0.76, undefined, 0.7),
];
// O VOTO CUMPRIDO — o altar sozinho, a noite fechada, nenhuma festa.
const VOTO: StagePropSpec[] = [
  P("altar", 0, 1.05, 0.3, 0.44),
  P("rock", -250, 1.1, undefined, 0.46),
  P("tent", 260, 1.0, undefined, 0.24),
  P("bush", -90, 0.8, undefined, 0.64),
  P("grass", 130, 0.74, undefined, 0.72),
];

// ---------------------------------------------------------------- SETS Jz 12
// EFRAIM — a tribo inflamada que ameaça queimar a fogo a casa de Jefté.
const EFRAIM: StagePropSpec[] = [
  P("tent", -200, 1.05, undefined, 0.24),
  P("tower", -40, 1.0, undefined, 0.3),
  P("campfire", 150, 1.1, 0.55, 0.5),
  P("rock", 260, 1.1, undefined, 0.46),
  P("grass", 60, 0.74, undefined, 0.7),
];
// OS VAUS DO JORDÃO — a passagem tomada, a senha que separa vida e morte.
const VAUS: StagePropSpec[] = [
  P("river", 0, 1.5, undefined, 0.86),
  P("rock", -230, 1.15, undefined, 0.5),
  P("bush", 210, 0.85, undefined, 0.62),
  P("grass", 90, 0.75, undefined, 0.72),
  P("palm", -330, 1.0, undefined, 0.14),
];
// A SEPULTURA EM GILEADE — uma das cidades de Gileade, o luto por Jefté.
const SEPULCRO: StagePropSpec[] = [
  P("rock", 0, 1.3, undefined, 0.44),
  P("tree", -220, 1.05, undefined, 0.24),
  P("church", 200, 0.9, undefined, 0.32),
  P("grass", 100, 0.75, undefined, 0.7),
  P("palm", 320, 1.0, undefined, 0.14),
];
// BELÉM de Ibzã — as trinta filhas casadas fora e as trinta trazidas de fora.
const BELEM: StagePropSpec[] = [
  P("church", -80, 1.0, undefined, 0.34),
  P("tower", 180, 1.0, undefined, 0.3),
  P("well", -260, 0.9, undefined, 0.5),
  P("sheaf", 60, 0.9, undefined, 0.6),
  P("grass", 280, 0.74, undefined, 0.7),
];
// AIJALOM, na terra de ZEBULOM — o descanso curto de Elom, o zebulonita.
const ZEBULOM: StagePropSpec[] = [
  P("tree", -160, 1.1, undefined, 0.24),
  P("church", 140, 0.95, undefined, 0.34),
  P("rock", 280, 1.1, undefined, 0.46),
  P("grass", -40, 0.76, undefined, 0.7),
  P("palm", 320, 1.0, undefined, 0.14),
];
// PIRATOM — os setenta jumentos dos filhos e netos de Abdom, filho de Hilel.
const PIRATOM: StagePropSpec[] = [
  P("stall", -180, 1.05, undefined, 0.5),
  P("church", 60, 0.95, undefined, 0.34),
  P("tower", 240, 1.0, undefined, 0.3),
  P("rock", -300, 1.1, undefined, 0.44),
  P("grass", 140, 0.74, undefined, 0.72),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ----------------------------------------------------------------- Jz 10
  10: {
    start: { terrain: "field", night: 0.14, glory: 0.5, storm: 0, fire: 0, verdure: 0.4 },
    beats: [
      // v.1 — depois do sangue de Abimeleque, TOLA se levanta para livrar Israel.
      b(1, { q: "para livrar a Israel, Tola, filho de Puá", set: "samir", props: SAMIR,
        env: { terrain: "field", glory: 0.5, night: 0.14, verdure: 0.42 }, cast: [
        C("servo", -60, "stand", { dy: 0.5, facing: 1, id: "tola" }),
        C("multidao", 160, "stand", { dy: 0.46 }),
      ] }),
      // v.2 — vinte e três anos de juízo; morre e é sepultado em Samir.
      b(2, { q: "e morreu, e foi sepultado em Samir",
        env: { glory: 0.34, night: 0.34, verdure: 0.36 }, cast: [
        C("homem", -60, "bow", { dy: 0.56, facing: 1, id: "pranteador" }),
        C("mulherComum", 90, "kneel", { dy: 0.52, facing: -1, id: "enlutada" }),
        C("homem", 210, "stand", { dy: 0.48, facing: -1, id: "vizinho" }),
      ] }),
      // v.3 — JAIR, o gileadita, se levanta e julga vinte e dois anos.
      b(3, { q: "se levantou Jair, gileadita", set: "havote", props: HAVOTE,
        env: { terrain: "field", glory: 0.52, night: 0.14, verdure: 0.44 }, cast: [
        C("homem", -80, "stand", { dy: 0.5, facing: 1, id: "jair" }),
        C("multidao", 170, "stand", { dy: 0.46 }),
      ] }),
      // v.4 — trinta filhos sobre trinta jumentos; trinta cidades: Havote-Jair.
      b(4, { q: "que cavalgavam sobre trinta jumentos", env: { glory: 0.56, verdure: 0.5 }, cast: [
        C("homem", -150, "stand", { dy: 0.52, facing: 1, id: "jair" }),
        C("homem", -20, "walk", { dy: 0.54, facing: 1, id: "filho1" }),
        C("homem", 90, "walk", { dy: 0.5, facing: 1, id: "filho2" }),
        C("homem", 200, "walk", { dy: 0.46, facing: 1, id: "filho3" }),
      ] }),
      // v.5 — morre Jair e é sepultado em Camom; acaba o descanso.
      b(5, { q: "foi sepultado em Camom", env: { glory: 0.26, night: 0.42, verdure: 0.3 }, cast: [
        C("homem", -40, "bow", { dy: 0.56, facing: 1, id: "pranteador" }),
        C("mulherComum", 120, "kneel", { dy: 0.52, facing: -1, id: "enlutada" }),
      ] }),
      // v.6 — a APOSTASIA MÚLTIPLA: baalins, Astarote e os deuses de cinco nações.
      b(6, { q: "serviram aos baalins, e a Astarote", set: "idolos", props: IDOLOS,
        env: { terrain: "field", glory: 0.06, night: 0.66, fire: 0.3, verdure: 0.16 }, cast: [
        C("homem", -40, "bow", { dy: 0.58, facing: 1, id: "adorador1" }),
        C("mulherComum", 60, "kneel", { dy: 0.54, facing: -1, id: "adoradora" }),
        C("homem", 200, "kneel", { dy: 0.5, facing: -1, id: "adorador2" }),
      ] }),
      // v.7 — a ira do SENHOR se acende: vendidos aos filisteus e a Amom.
      b(7, { q: "vendeu-os nas mãos dos filisteus",
        env: { glory: 0.1, night: 0.62, storm: 0.38, fire: 0.2 }, cast: [
        C("rei", 170, "stand", { dy: 0.4, facing: -1, id: "filisteu" }),
        C("rei", 280, "stand", { dy: 0.44, facing: -1, id: "rei-amom" }),
        C("homem", -120, "kneel", { dy: 0.58, facing: 1, id: "israelita" }),
      ] }),
      // v.8 — dezoito anos de opressão em Gileade, além do Jordão.
      b(8, { q: "dezoito anos oprimiram a todos os filhos de Israel", set: "opressao", props: OPRESSAO,
        env: { terrain: "desert", glory: 0.1, night: 0.58, storm: 0.3, fire: 0.06, verdure: 0.12 }, cast: [
        C("homem", -160, "lie", { dy: 0.6, id: "vexado1" }),
        C("mulherComum", -40, "kneel", { dy: 0.56, facing: 1, id: "vexada" }),
        C("rei", 170, "point", { dy: 0.42, facing: -1, id: "rei-amom" }),
        C("homem", 260, "stand", { dy: 0.44, facing: -1, id: "amonita" }),
      ] }),
      // v.9 — Amom passa o Jordão contra Judá, Benjamim e Efraim: grande angústia.
      b(9, { q: "Israel ficou muito angustiado", env: { storm: 0.42, night: 0.6, glory: 0.08 }, cast: [
        C("homem", 130, "walk", { dy: 0.5, facing: -1, id: "amonita" }),
        C("homem", 240, "walk", { dy: 0.46, facing: -1, id: "amonita2" }),
        C("mulherComum", -150, "bow", { dy: 0.58, facing: 1, id: "angustiada" }),
        C("homem", -40, "kneel", { dy: 0.6, facing: 1, id: "angustiado" }),
      ] }),
      // v.10 — o CLAMOR: "Contra ti havemos pecado". (fala o povo)
      b(10, { by: "homem", q: "clamaram ao Senhor, dizendo:", set: "clamor", props: CLAMOR,
        env: { terrain: "field", glory: 0.18, night: 0.55, storm: 0.2, fire: 0, verdure: 0.16 }, cast: [
        C("homem", -80, "kneel", { dy: 0.58, facing: 1, id: "israelita" }),
        C("mulherComum", 40, "kneel", { dy: 0.54, facing: -1, id: "israelita2" }),
        C("homem", 160, "bow", { dy: 0.5, facing: -1, id: "israelita3" }),
      ] }),
      // v.11 — a resposta do SENHOR, voz do céu: a lista dos livramentos passados.
      dv(11, "Porém o Senhor disse aos filhos de Israel:", {
        env: { glory: 0.48, night: 0.42, storm: 0.1 }, cast: [
        C("homem", -80, "kneel", { dy: 0.58, facing: 1, id: "israelita" }),
        C("mulherComum", 40, "kneel", { dy: 0.54, facing: -1, id: "israelita2" }),
      ] }),
      // v.12 — sidônios, amalequitas, maonitas: "quando a mim clamastes, não vos livrei?"
      dv(12, "E dos sidônios,", { env: { glory: 0.52, night: 0.4 } }),
      // v.13 — "vós me deixastes a mim... não vos livrarei mais".
      dv(13, "Contudo vós", { env: { glory: 0.4, night: 0.5, storm: 0.18 } }),
      // v.14 — a palavra mais dura: "clamai aos deuses que escolhestes".
      dv(14, "Ide, e clamai", { env: { glory: 0.3, night: 0.58, storm: 0.26 }, cast: [
        C("homem", -80, "bow", { dy: 0.6, facing: 1, id: "israelita" }),
        C("mulherComum", 60, "kneel", { dy: 0.56, facing: -1, id: "israelita2" }),
        C("homem", 190, "kneel", { dy: 0.5, facing: -1, id: "israelita3" }),
      ] }),
      // v.15 — "Pecamos... tão-somente te rogamos que nos livres nesta vez". (o povo)
      b(15, { by: "homem", q: "disseram ao Senhor:", env: { glory: 0.34, night: 0.52, storm: 0.12 }, cast: [
        C("homem", -70, "kneel", { dy: 0.58, facing: 1, id: "israelita" }),
        C("mulherComum", 60, "bow", { dy: 0.54, facing: -1, id: "israelita2" }),
        C("homem", 180, "kneel", { dy: 0.5, facing: -1, id: "israelita3" }),
      ] }),
      // v.16 — TIRAM os deuses alheios do meio de si; a alma do SENHOR se angustia.
      b(16, { q: "E tiraram os deuses alheios do meio de si", set: "purifica", props: PURIFICA,
        env: { terrain: "field", glory: 0.58, night: 0.32, storm: 0, fire: 0.45, verdure: 0.3 }, cast: [
        C("homem", -60, "raise", { dy: 0.56, facing: 1, id: "israelita" }),
        C("mulherComum", 50, "kneel", { dy: 0.54, facing: -1, id: "israelita2" }),
        C("homem", 190, "bow", { dy: 0.5, facing: -1, id: "israelita3" }),
      ] }),
      // v.17 — Amom se acampa em Gileade; Israel se congrega em MIZPÁ.
      b(17, { q: "se acamparam em Mizpá", set: "mizpa", props: MIZPA,
        env: { terrain: "field", glory: 0.42, night: 0.34, storm: 0.14, fire: 0, verdure: 0.34 }, cast: [
        C("multidao", -120, "stand", { dy: 0.48 }),
        C("rei", 230, "stand", { dy: 0.4, facing: -1, id: "rei-amom" }),
      ] }),
      // v.18 — os príncipes de Gileade: "Quem será o homem...?" (falam eles)
      b(18, { by: "homem", q: "disseram uns aos outros:", env: { glory: 0.4, night: 0.36 }, cast: [
        C("homem", -140, "point", { dy: 0.52, facing: -1, id: "principe-gileade" }),
        C("anciao", -20, "stand", { dy: 0.5, facing: 1, id: "anciao1" }),
        C("multidao", 170, "stand", { dy: 0.48 }),
      ] }),
    ],
  },

  // ----------------------------------------------------------------- Jz 11
  11: {
    start: { terrain: "field", night: 0.28, glory: 0.34, storm: 0.1, fire: 0, verdure: 0.32 },
    beats: [
      // v.1 — JEFTÉ, o gileadita, homem valoroso — e filho de uma prostituta.
      b(1, { q: "homem valoroso, porém filho de uma prostituta", set: "casa-gileade", props: CASA_GILEADE,
        env: { terrain: "city", glory: 0.36, night: 0.28, storm: 0.06, verdure: 0.22 }, cast: [
        C("servo", -40, "stand", { dy: 0.52, facing: 1, id: "jefte" }),
        C("mulherComum", 130, "stand", { dy: 0.5, facing: -1, id: "mae-jefte" }),
        C("homem", 250, "stand", { dy: 0.46, facing: -1, id: "gileade" }),
      ] }),
      // v.2 — os irmãos o EXPULSAM: "Não herdarás na casa de nosso pai". (irmãos)
      b(2, { by: "homem", q: "e lhe disseram:", env: { glory: 0.2, night: 0.4, storm: 0.16 }, cast: [
        C("homem", 120, "point", { dy: 0.52, facing: -1, id: "irmao1" }),
        C("homem", 230, "stand", { dy: 0.48, facing: -1, id: "irmao2" }),
        C("servo", -100, "stand", { dy: 0.56, facing: 1, id: "jefte" }),
      ] }),
      // v.3 — foge para TOBE; homens levianos se ajuntam a ele e saem com ele.
      b(3, { q: "habitou na terra de Tobe", set: "tobe", props: TOBE,
        env: { terrain: "desert", glory: 0.24, night: 0.38, storm: 0.06, fire: 0.25, verdure: 0.12 }, cast: [
        C("servo", -60, "walk", { dy: 0.54, facing: 1, id: "jefte" }),
        C("homem", 110, "stand", { dy: 0.5, facing: -1, id: "leviano1" }),
        C("homem", 210, "stand", { dy: 0.46, facing: -1, id: "leviano2" }),
      ] }),
      // v.4 — passado algum tempo, os filhos de Amom pelejam contra Israel.
      b(4, { q: "os filhos de Amom pelejaram contra Israel", set: "guerra", props: GUERRA,
        env: { terrain: "city", glory: 0.12, night: 0.5, storm: 0.4, fire: 0.35, verdure: 0.12 }, cast: [
        C("rei", 170, "point", { dy: 0.4, facing: -1, id: "rei-amom" }),
        C("homem", 260, "stand", { dy: 0.44, facing: -1, id: "amonita" }),
        C("homem", -150, "bow", { dy: 0.58, facing: 1, id: "israelita" }),
      ] }),
      // v.5 — os ANCIÃOS de Gileade descem a Tobe para buscar Jefté.
      b(5, { q: "foram os anciãos de Gileade buscar a Jefté", set: "tobe", props: TOBE,
        env: { terrain: "desert", glory: 0.3, night: 0.34, storm: 0.08, fire: 0.2, verdure: 0.12 }, cast: [
        C("anciao", -170, "walk", { dy: 0.5, facing: 1, id: "anciao1" }),
        C("anciao", -60, "walk", { dy: 0.48, facing: 1, id: "anciao2" }),
        C("servo", 150, "stand", { dy: 0.54, facing: -1, id: "jefte" }),
      ] }),
      // v.6 — "Vem, e sê o nosso chefe". (falam os anciãos)
      b(6, { by: "anciao", q: "E disseram a Jefté:", env: { glory: 0.34 }, cast: [
        C("anciao", -130, "point", { dy: 0.5, facing: 1, id: "anciao1" }),
        C("anciao", -20, "stand", { dy: 0.48, facing: 1, id: "anciao2" }),
        C("servo", 160, "stand", { dy: 0.54, facing: -1, id: "jefte" }),
      ] }),
      // v.7 — Jefté responde: "não me expulsastes da casa de meu pai?" (Jefté fala)
      b(7, { by: "servo", q: "Porém Jefté disse aos anciãos de Gileade:", env: { glory: 0.3, night: 0.36 }, cast: [
        C("servo", 160, "point", { dy: 0.54, facing: -1, id: "jefte" }),
        C("anciao", -130, "bow", { dy: 0.5, facing: 1, id: "anciao1" }),
        C("anciao", -20, "stand", { dy: 0.48, facing: 1, id: "anciao2" }),
      ] }),
      // v.8 — "para que nos sejas por chefe sobre todos os moradores de Gileade".
      b(8, { by: "anciao", q: "E disseram os anciãos de Gileade a Jefté:", env: { glory: 0.36 }, cast: [
        C("anciao", -130, "raise", { dy: 0.5, facing: 1, id: "anciao1" }),
        C("anciao", -20, "stand", { dy: 0.48, facing: 1, id: "anciao2" }),
        C("servo", 160, "stand", { dy: 0.54, facing: -1, id: "jefte" }),
      ] }),
      // v.9 — Jefté põe a condição, e põe o SENHOR no meio. (Jefté fala)
      b(9, { by: "servo", q: "Então Jefté disse aos anciãos de Gileade:", env: { glory: 0.42 }, cast: [
        C("servo", 150, "raise", { dy: 0.54, facing: -1, id: "jefte" }),
        C("anciao", -130, "stand", { dy: 0.5, facing: 1, id: "anciao1" }),
        C("anciao", -20, "stand", { dy: 0.48, facing: 1, id: "anciao2" }),
      ] }),
      // v.10 — "O SENHOR será testemunha entre nós". (falam os anciãos)
      b(10, { by: "anciao", q: "E disseram os anciãos de Gileade a Jefté:", env: { glory: 0.5, night: 0.3 }, cast: [
        C("anciao", -130, "raise", { dy: 0.5, facing: 1, id: "anciao1" }),
        C("anciao", -20, "stand", { dy: 0.48, facing: 1, id: "anciao2" }),
        C("servo", 160, "stand", { dy: 0.54, facing: -1, id: "jefte" }),
      ] }),
      // v.11 — o rejeitado vira CHEFE e PRÍNCIPE; fala tudo perante o SENHOR em Mizpá.
      b(11, { q: "o povo o pôs por chefe e príncipe sobre si", set: "mizpa", props: MIZPA,
        env: { terrain: "field", glory: 0.58, night: 0.2, storm: 0, fire: 0, verdure: 0.34 }, cast: [
        C("servo", -40, "raise", { dy: 0.52, facing: 1, id: "jefte" }),
        C("anciao", 100, "stand", { dy: 0.5, facing: -1, id: "anciao1" }),
        C("multidao", 220, "stand", { dy: 0.46 }),
      ] }),
      // v.12 — a EMBAIXADA: "Que há entre mim e ti...?" (Jefté fala pelos mensageiros)
      b(12, { by: "servo", q: "ao rei dos filhos de Amom, dizendo:", set: "corte-amom", props: CORTE_AMOM,
        env: { terrain: "city", glory: 0.4, night: 0.26, verdure: 0.2 }, cast: [
        C("servo", -160, "point", { dy: 0.54, facing: -1, id: "jefte" }),
        C("servo", -40, "walk", { dy: 0.5, facing: -1, id: "mensageiro" }),
        C("rei", 180, "stand", { dy: 0.4, facing: -1, id: "rei-amom" }),
      ] }),
      // v.13 — o rei de Amom reclama a terra do Arnom ao Jaboque. (fala o rei)
      b(13, { by: "rei", q: "aos mensageiros de Jefté:", env: { glory: 0.28, night: 0.34, storm: 0.14 }, cast: [
        C("rei", 160, "point", { dy: 0.4, facing: -1, id: "rei-amom" }),
        C("servo", -60, "stand", { dy: 0.52, facing: 1, id: "mensageiro" }),
        C("servo", -200, "stand", { dy: 0.5, facing: 1, id: "mensageiro2" }),
      ] }),
      // v.14 — Jefté PROSSEGUE em enviar mensageiros: a longa resposta começa.
      b(14, { q: "prosseguiu ainda em enviar mensageiros", set: "mizpa", props: MIZPA,
        env: { terrain: "field", glory: 0.45, night: 0.24, storm: 0, verdure: 0.32 }, cast: [
        C("servo", -140, "point", { dy: 0.54, facing: -1, id: "jefte" }),
        C("servo", 20, "walk", { dy: 0.5, facing: -1, id: "mensageiro" }),
        C("servo", 150, "walk", { dy: 0.48, facing: -1, id: "mensageiro2" }),
      ] }),
      // v.15 — "Israel não tomou nem a terra dos moabitas, nem a de Amom". (Jefté)
      b(15, { by: "servo", q: "Assim diz Jefté:", env: { glory: 0.48 }, cast: [
        C("servo", -100, "raise", { dy: 0.54, facing: 1, id: "jefte" }),
        C("servo", 90, "stand", { dy: 0.5, facing: -1, id: "mensageiro" }),
      ] }),
      // v.16 — MEMÓRIA: subindo do Egito, Israel andou pelo deserto até o Mar Vermelho.
      b(16, { by: "servo", q: "Porque, subindo", set: "mem-mar", props: MEM_MAR,
        env: { terrain: "desert", glory: 0.5, night: 0.14, storm: 0, fire: 0, verdure: 0.08 }, cast: [
        C("servo", -280, "point", { dy: 0.58, facing: 1, id: "jefte" }),
        C("multidao", 60, "walk", { dy: 0.48 }),
      ] }),
      // v.17 — MEMÓRIA: Edom e Moabe negam passagem; Israel fica em Cades.
      b(17, { by: "servo", q: "E Israel enviou", set: "mem-cades", props: MEM_CADES,
        env: { terrain: "desert", glory: 0.4, night: 0.2, verdure: 0.1 }, cast: [
        C("servo", -290, "stand", { dy: 0.58, facing: 1, id: "jefte" }),
        C("homem", 40, "bow", { dy: 0.52, facing: -1, id: "mensageiro-israel" }),
        C("rei", 190, "stand", { dy: 0.4, facing: -1, id: "rei-edom" }),
      ] }),
      // v.18 — MEMÓRIA: rodeou Edom e Moabe e alojou-se ALÉM do Arnom, sem entrar.
      b(18, { by: "servo", q: "Depois andou", set: "mem-arnom", props: MEM_ARNOM,
        env: { terrain: "desert", glory: 0.42, night: 0.18, verdure: 0.14 }, cast: [
        C("servo", -290, "point", { dy: 0.58, facing: 1, id: "jefte" }),
        C("multidao", 80, "walk", { dy: 0.48 }),
      ] }),
      // v.19 — MEMÓRIA: o pedido a SIOM, rei dos amorreus, rei de Hesbom.
      b(19, { by: "servo", q: "Mas Israel enviou", set: "mem-jasa", props: MEM_JASA,
        env: { terrain: "city", glory: 0.38, night: 0.24, fire: 0.2, verdure: 0.16 }, cast: [
        C("servo", -290, "stand", { dy: 0.58, facing: 1, id: "jefte" }),
        C("homem", 20, "bow", { dy: 0.52, facing: -1, id: "mensageiro-israel" }),
        C("rei", 160, "stand", { dy: 0.4, facing: -1, id: "siom" }),
      ] }),
      // v.20 — MEMÓRIA: Siom não confia, ajunta o povo em Jasa e combate Israel.
      b(20, { by: "servo", q: "Porém Siom não", env: { glory: 0.2, night: 0.44, storm: 0.4, fire: 0.3 }, cast: [
        C("servo", -290, "stand", { dy: 0.58, facing: 1, id: "jefte" }),
        C("rei", 140, "point", { dy: 0.4, facing: -1, id: "siom" }),
        C("homem", 250, "stand", { dy: 0.44, facing: -1, id: "amorreu" }),
      ] }),
      // v.21 — MEMÓRIA: o SENHOR entrega Siom na mão de Israel; a terra é herdada.
      b(21, { by: "servo", q: "E o Senhor Deus de Israel deu",
        env: { glory: 0.6, night: 0.3, storm: 0.18, fire: 0.15 }, cast: [
        C("servo", -290, "raise", { dy: 0.58, facing: 1, id: "jefte" }),
        C("homem", 150, "lie", { dy: 0.62, id: "amorreu1" }),
        C("homem", 250, "bow", { dy: 0.54, facing: -1, id: "amorreu2" }),
      ] }),
      // v.22 — MEMÓRIA: do Arnom ao Jaboque, do deserto ao Jordão — tudo por herança.
      b(22, { by: "servo", q: "E por herança", set: "mem-arnom", props: MEM_ARNOM,
        env: { terrain: "field", glory: 0.55, night: 0.16, storm: 0, fire: 0, verdure: 0.34 }, cast: [
        C("servo", -290, "point", { dy: 0.58, facing: 1, id: "jefte" }),
        C("multidao", 70, "stand", { dy: 0.48 }),
      ] }),
      // v.23 — o argumento: foi o SENHOR quem desapossou — "e os possuirias tu?"
      b(23, { by: "servo", q: "Assim o Senhor Deus de Israel", set: "hesbom", props: HESBOM,
        env: { terrain: "city", glory: 0.5, night: 0.18, verdure: 0.3 }, cast: [
        C("servo", -250, "raise", { dy: 0.56, facing: 1, id: "jefte" }),
        C("multidao", 90, "stand", { dy: 0.48 }),
      ] }),
      // v.24 — QUEMÓS, o deus de Amom, contra o SENHOR nosso Deus.
      b(24, { by: "servo", q: "Não possuirias tu", set: "quemos", props: IDOLOS,
        env: { terrain: "city", glory: 0.34, night: 0.42, fire: 0.3, verdure: 0.14 }, cast: [
        C("servo", -200, "point", { dy: 0.56, facing: 1, id: "jefte" }),
        C("rei", 190, "stand", { dy: 0.4, facing: -1, id: "rei-amom" }),
      ] }),
      // v.25 — "és tu melhor do que BALAQUE, filho de Zipor?" — ele não contendeu.
      b(25, { by: "servo", q: "Agora, pois, és tu", set: "mem-arnom", props: MEM_ARNOM,
        env: { terrain: "field", glory: 0.42, night: 0.24, fire: 0, verdure: 0.3 }, cast: [
        C("servo", -260, "point", { dy: 0.56, facing: 1, id: "jefte" }),
        C("rei", 170, "stand", { dy: 0.4, facing: -1, id: "balaque" }),
      ] }),
      // v.26 — TREZENTOS ANOS em Hesbom, Aroer e as vilas do Arnom: por que só agora?
      b(26, { by: "servo", q: "Enquanto Israel habitou", set: "hesbom", props: HESBOM,
        env: { terrain: "city", glory: 0.48, night: 0.18, verdure: 0.36 }, cast: [
        C("servo", -250, "raise", { dy: 0.56, facing: 1, id: "jefte" }),
        C("multidao", 90, "stand", { dy: 0.48 }),
      ] }),
      // v.27 — a causa entregue ao JUIZ: "o SENHOR... julgue hoje". (Jefté fala)
      b(27, { by: "servo", q: "Tampouco pequei eu", set: "mizpa", props: MIZPA,
        env: { terrain: "field", glory: 0.66, night: 0.16, storm: 0, verdure: 0.34 }, cast: [
        C("servo", -50, "raise", { dy: 0.54, facing: 1, id: "jefte" }),
        C("anciao", 110, "stand", { dy: 0.5, facing: -1, id: "anciao1" }),
      ] }),
      // v.28 — o rei de Amom NÃO dá ouvidos às palavras de Jefté.
      b(28, { q: "não deu ouvidos às palavras que Jefté lhe enviou", set: "corte-amom", props: CORTE_AMOM,
        env: { terrain: "city", glory: 0.16, night: 0.46, storm: 0.28, verdure: 0.16 }, cast: [
        C("rei", 150, "stand", { dy: 0.4, facing: -1, id: "rei-amom" }),
        C("servo", -100, "bow", { dy: 0.54, facing: 1, id: "mensageiro" }),
      ] }),
      // v.29 — o ESPÍRITO do SENHOR vem sobre Jefté; ele atravessa Gileade e Manassés.
      b(29, { q: "o Espírito do Senhor veio sobre Jefté", set: "mizpa", props: MIZPA,
        env: { terrain: "field", glory: 0.8, night: 0.1, storm: 0, fire: 0, verdure: 0.4 }, cast: [
        C("servo", 0, "raise", { dy: 0.52, facing: 1, id: "jefte", glow: 0.5 }),
        C("multidao", 190, "stand", { dy: 0.46 }),
      ] }),
      // v.30 — o VOTO precipitado começa: "Se totalmente deres os filhos de Amom..."
      b(30, { by: "servo", q: "fez um voto ao Senhor, e disse:", env: { glory: 0.68, night: 0.18 }, cast: [
        C("servo", -50, "kneel", { dy: 0.56, facing: 1, id: "jefte" }),
        C("anciao", 120, "stand", { dy: 0.5, facing: -1, id: "anciao1" }),
      ] }),
      // v.31 — "aquilo que sair da PORTA de minha casa... o oferecerei em holocausto".
      b(31, { by: "servo", q: "Aquilo que, saindo", set: "casa-jefte", props: CASA_JEFTE,
        env: { terrain: "city", glory: 0.44, night: 0.32, storm: 0.08, verdure: 0.24 }, cast: [
        C("servo", -140, "raise", { dy: 0.56, facing: 1, id: "jefte" }),
      ] }),
      // v.32 — Jefté passa contra Amom, e o SENHOR os dá na sua mão.
      b(32, { q: "o Senhor os deu na sua mão", set: "guerra", props: GUERRA,
        env: { terrain: "city", glory: 0.5, night: 0.4, storm: 0.34, fire: 0.4, verdure: 0.12 }, cast: [
        C("servo", -150, "point", { dy: 0.54, facing: -1, id: "jefte" }),
        C("homem", 50, "stand", { dy: 0.5, facing: -1, id: "gileadita" }),
        C("homem", 180, "bow", { dy: 0.56, facing: 1, id: "amonita" }),
      ] }),
      // v.33 — grande mortandade, de Aroer a Abel-Queramim: vinte cidades (sem festa).
      b(33, { q: "os feriu com grande mortandade",
        env: { glory: 0.3, night: 0.5, storm: 0.26, fire: 0.35 }, cast: [
        C("homem", 120, "lie", { dy: 0.62, id: "amonita1" }),
        C("homem", 240, "lie", { dy: 0.56, id: "amonita2" }),
        C("servo", -140, "stand", { dy: 0.54, facing: -1, id: "jefte" }),
      ] }),
      // v.34 — a volta a Mizpá: a FILHA, a única, sai com ADUFES e DANÇAS (entardece).
      b(34, { q: "a sua filha lhe saiu ao encontro com adufes e com danças",
        set: "casa-jefte", props: CASA_JEFTE,
        env: { terrain: "city", glory: 0.3, night: 0.42, storm: 0.06, fire: 0, verdure: 0.22 }, cast: [
        C("mulherComum", 80, "walk", { dy: 0.54, facing: -1, id: "filha-jefte" }),
        C("mulherComum", 200, "walk", { dy: 0.5, facing: -1, id: "companheira1" }),
        C("servo", -150, "stand", { dy: 0.56, facing: 1, id: "jefte" }),
      ] }),
      // v.35 — RASGA as vestes: "abri a minha boca ao SENHOR, e não tornarei atrás".
      b(35, { by: "servo", q: "rasgou as suas vestes, e disse:",
        env: { glory: 0.12, night: 0.64, storm: 0.18 }, cast: [
        C("servo", -110, "kneel", { dy: 0.58, facing: 1, id: "jefte" }),
        C("mulherComum", 90, "stand", { dy: 0.54, facing: -1, id: "filha-jefte" }),
      ] }),
      // v.36 — a FILHA responde: "faze de mim conforme o que prometeste". (ela fala)
      b(36, { by: "mulherComum", q: "E ela lhe disse:", env: { glory: 0.16, night: 0.62 }, cast: [
        C("mulherComum", 90, "stand", { dy: 0.54, facing: -1, id: "filha-jefte" }),
        C("servo", -110, "bow", { dy: 0.6, facing: 1, id: "jefte" }),
      ] }),
      // v.37 — o pedido: dois meses pelos montes, com as companheiras. (ela fala)
      b(37, { by: "mulherComum", q: "Disse mais a seu pai:", env: { glory: 0.14, night: 0.64 }, cast: [
        C("mulherComum", 60, "kneel", { dy: 0.56, facing: -1, id: "filha-jefte" }),
        C("servo", -130, "bow", { dy: 0.6, facing: 1, id: "jefte" }),
        C("mulherComum", 210, "stand", { dy: 0.5, facing: -1, id: "companheira1" }),
      ] }),
      // v.38 — "Vai." — e ela chora a sua virgindade pelos MONTES, dois meses.
      b(38, { by: "servo", q: "E disse ele:", set: "montes", props: MONTES,
        env: { terrain: "mountain", glory: 0.12, night: 0.66, storm: 0.1, fire: 0, verdure: 0.2 }, cast: [
        C("servo", -270, "stand", { dy: 0.58, facing: 1, id: "jefte" }),
        C("mulherComum", 30, "walk", { dy: 0.56, facing: 1, id: "filha-jefte" }),
        C("mulherComum", 160, "kneel", { dy: 0.52, facing: 1, id: "companheira1" }),
      ] }),
      // v.39 — ao fim de dois meses, torna ao pai, e ele cumpre nela o seu voto.
      b(39, { q: "cumpriu nela o seu voto que tinha feito", set: "voto", props: VOTO,
        env: { terrain: "field", glory: 0.1, night: 0.72, storm: 0.14, fire: 0.18, verdure: 0.14 }, cast: [
        C("servo", -110, "bow", { dy: 0.6, facing: 1, id: "jefte" }),
        C("mulherComum", 90, "kneel", { dy: 0.56, facing: -1, id: "filha-jefte" }),
      ] }),
      // v.40 — o costume: quatro dias por ano, as filhas de Israel a lamentam.
      b(40, { q: "iam de ano em ano lamentar, por quatro dias, a filha de Jefté",
        set: "montes", props: MONTES,
        env: { terrain: "mountain", glory: 0.2, night: 0.58, storm: 0, fire: 0, verdure: 0.24 }, cast: [
        C("mulherComum", -70, "kneel", { dy: 0.58, facing: 1, id: "filha-israel1" }),
        C("mulherComum", 60, "bow", { dy: 0.54, facing: -1, id: "filha-israel2" }),
        C("mulherComum", 190, "kneel", { dy: 0.5, facing: -1, id: "filha-israel3" }),
      ] }),
    ],
  },

  // ----------------------------------------------------------------- Jz 12
  12: {
    start: { terrain: "field", night: 0.34, glory: 0.28, storm: 0.16, fire: 0.2, verdure: 0.28 },
    beats: [
      // v.1 — EFRAIM se convoca: "Queimaremos a fogo a tua casa contigo". (Efraim fala)
      b(1, { by: "homem", q: "e disseram a Jefté:", set: "efraim", props: EFRAIM,
        env: { terrain: "field", glory: 0.18, night: 0.42, storm: 0.24, fire: 0.4, verdure: 0.24 }, cast: [
        C("homem", 140, "point", { dy: 0.5, facing: -1, id: "efraimita1" }),
        C("homem", 250, "stand", { dy: 0.46, facing: -1, id: "efraimita2" }),
        C("servo", -130, "stand", { dy: 0.56, facing: 1, id: "jefte" }),
      ] }),
      // v.2 — Jefté: "chamei-vos, e não me livrastes da sua mão". (Jefté fala)
      b(2, { by: "servo", q: "E Jefté lhes disse:", env: { glory: 0.24, night: 0.42 }, cast: [
        C("servo", -130, "point", { dy: 0.56, facing: -1, id: "jefte" }),
        C("homem", 140, "stand", { dy: 0.5, facing: -1, id: "efraimita1" }),
        C("homem", 250, "stand", { dy: 0.46, facing: -1, id: "efraimita2" }),
      ] }),
      // v.3 — "arrisquei a minha vida... por que subistes contra mim?" (Jefté fala)
      b(3, { by: "servo", q: "E, vendo eu", env: { glory: 0.32, night: 0.44, storm: 0.3 }, cast: [
        C("servo", -130, "raise", { dy: 0.56, facing: -1, id: "jefte" }),
        C("homem", 150, "point", { dy: 0.5, facing: -1, id: "efraimita1" }),
      ] }),
      // v.4 — Gileade fere Efraim, por causa do insulto: "fugitivos sois de Efraim".
      b(4, { q: "os homens de Gileade feriram a Efraim",
        env: { glory: 0.14, night: 0.52, storm: 0.44, fire: 0.35 }, cast: [
        C("servo", -160, "point", { dy: 0.54, facing: -1, id: "jefte" }),
        C("homem", -30, "stand", { dy: 0.52, facing: -1, id: "gileadita1" }),
        C("homem", 130, "bow", { dy: 0.56, facing: 1, id: "efraimita1" }),
        C("homem", 240, "lie", { dy: 0.6, id: "efraimita2" }),
      ] }),
      // v.5 — os VAUS DO JORDÃO tomados; o fugitivo pede passagem. (fala o fugitivo)
      b(5, { by: "homem", q: "quando algum dos fugitivos de Efraim dizia:",
        set: "vaus", props: VAUS,
        env: { terrain: "field", glory: 0.16, night: 0.5, storm: 0.26, fire: 0.06, verdure: 0.24 }, cast: [
        C("homem", -60, "bow", { dy: 0.58, facing: 1, id: "fugitivo-efraim" }),
        C("homem", 120, "point", { dy: 0.5, facing: -1, id: "gileadita1" }),
        C("homem", 230, "stand", { dy: 0.48, facing: -1, id: "gileadita2" }),
      ] }),
      // v.6 — "Dize, pois, CHIBOLETE" — e caíram de Efraim quarenta e dois mil.
      b(6, { by: "homem", q: "Então lhe diziam:",
        env: { glory: 0.08, night: 0.62, storm: 0.32 }, cast: [
        C("homem", 120, "point", { dy: 0.5, facing: -1, id: "gileadita1" }),
        C("homem", -60, "kneel", { dy: 0.58, facing: 1, id: "fugitivo-efraim" }),
        C("homem", -200, "lie", { dy: 0.62, id: "efraimita-caido" }),
        C("mulherComum", 240, "bow", { dy: 0.52, facing: -1, id: "enlutada" }),
      ] }),
      // v.7 — Jefté julga seis anos e é sepultado numa das cidades de Gileade.
      b(7, { q: "Jefté julgou a Israel seis anos", set: "sepulcro", props: SEPULCRO,
        env: { terrain: "field", glory: 0.24, night: 0.46, storm: 0.06, fire: 0, verdure: 0.3 }, cast: [
        C("homem", -60, "bow", { dy: 0.58, facing: 1, id: "pranteador" }),
        C("mulherComum", 90, "kneel", { dy: 0.54, facing: -1, id: "enlutada" }),
        C("anciao", 220, "stand", { dy: 0.48, facing: -1, id: "anciao1" }),
      ] }),
      // v.8 — depois dele, IBZÃ de Belém julga a Israel.
      b(8, { q: "julgou a Israel Ibzã de Belém", set: "belem", props: BELEM,
        env: { terrain: "city", glory: 0.5, night: 0.18, storm: 0, fire: 0, verdure: 0.42 }, cast: [
        C("homem", -40, "stand", { dy: 0.5, facing: 1, id: "ibza" }),
        C("multidao", 170, "stand", { dy: 0.46 }),
      ] }),
      // v.9 — trinta filhos e trinta filhas casadas fora; sete anos de juízo.
      b(9, { q: "e trinta filhas que casou fora", env: { glory: 0.56, verdure: 0.46 }, cast: [
        C("homem", -150, "stand", { dy: 0.52, facing: 1, id: "ibza" }),
        C("mulherComum", -30, "stand", { dy: 0.54, facing: 1, id: "filha1" }),
        C("homem", 90, "stand", { dy: 0.5, facing: -1, id: "filho1" }),
        C("mulherComum", 210, "walk", { dy: 0.48, facing: -1, id: "filha2" }),
      ] }),
      // v.10 — faleceu Ibzã e foi sepultado em Belém.
      b(10, { q: "foi sepultado em Belém", env: { glory: 0.24, night: 0.44, verdure: 0.32 }, cast: [
        C("homem", -40, "bow", { dy: 0.58, facing: 1, id: "pranteador" }),
        C("mulherComum", 110, "kneel", { dy: 0.54, facing: -1, id: "enlutada" }),
      ] }),
      // v.11 — depois dele, ELOM, o zebulonita, julga dez anos.
      b(11, { q: "Elom, o zebulonita", set: "zebulom", props: ZEBULOM,
        env: { terrain: "field", glory: 0.5, night: 0.18, storm: 0, fire: 0, verdure: 0.44 }, cast: [
        C("homem", -40, "stand", { dy: 0.5, facing: 1, id: "elom" }),
        C("multidao", 170, "stand", { dy: 0.46 }),
      ] }),
      // v.12 — faleceu Elom e foi sepultado em Aijalom, na terra de Zebulom.
      b(12, { q: "foi sepultado em Aijalom", env: { glory: 0.24, night: 0.44, verdure: 0.34 }, cast: [
        C("homem", -50, "bow", { dy: 0.58, facing: 1, id: "pranteador" }),
        C("mulherComum", 100, "kneel", { dy: 0.54, facing: -1, id: "enlutada" }),
      ] }),
      // v.13 — depois dele, ABDOM, filho de Hilel, o piratonita.
      b(13, { q: "Abdom, filho de Hilel, o piratonita", set: "piratom", props: PIRATOM,
        env: { terrain: "field", glory: 0.5, night: 0.18, verdure: 0.44 }, cast: [
        C("homem", -60, "stand", { dy: 0.5, facing: 1, id: "abdom" }),
        C("multidao", 180, "stand", { dy: 0.46 }),
      ] }),
      // v.14 — quarenta filhos e trinta netos sobre SETENTA jumentos: oito anos.
      b(14, { q: "que cavalgavam sobre setenta jumentos", env: { glory: 0.56, verdure: 0.48 }, cast: [
        C("homem", -140, "stand", { dy: 0.52, facing: 1, id: "abdom" }),
        C("homem", -20, "walk", { dy: 0.54, facing: 1, id: "filho1" }),
        C("homem", 100, "walk", { dy: 0.5, facing: 1, id: "neto1" }),
        C("homem", 220, "walk", { dy: 0.46, facing: 1, id: "neto2" }),
      ] }),
      // v.15 — faleceu Abdom, sepultado em Piratom, no monte dos amalequitas.
      b(15, { q: "no monte dos amalequitas",
        env: { terrain: "mountain", glory: 0.2, night: 0.48, storm: 0.08, verdure: 0.26 }, cast: [
        C("homem", -60, "bow", { dy: 0.58, facing: 1, id: "pranteador" }),
        C("mulherComum", 90, "kneel", { dy: 0.54, facing: -1, id: "enlutada" }),
        C("anciao", 210, "stand", { dy: 0.48, facing: -1, id: "anciao1" }),
      ] }),
    ],
  },
};
