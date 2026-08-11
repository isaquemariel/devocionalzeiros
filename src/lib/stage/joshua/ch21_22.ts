// ============================================================================
// JOSUÉ 21–22 — CENA VIVA. As cidades dos LEVITAS e a FIDELIDADE de Deus; o
// ALTAR do testemunho (Ede) e a guerra evitada entre as tribos.
//
// Js 21 — AS CIDADES DOS LEVITAS: os cabeças dos pais dos levitas se achegam a
// Eleazar e a Josué, em Siló, e pedem cidades para habitar, com os seus
// arrabaldes (pastagens) para o gado — conforme o Senhor ordenara por Moisés.
// Por sortes, as tribos entregam da sua herança QUARENTA E OITO cidades aos
// levitas: aos filhos de Arão (os sacerdotes), aos coatitas, aos gersonitas e
// aos meraritas — os levitas ESPALHADOS no meio de todo o Israel, para ensinar
// a Lei. E vem o grande clímax teológico do livro (21:45): NENHUMA palavra
// falhou de todas as boas coisas que o Senhor falara — tudo se cumpriu. A
// FIDELIDADE de Deus, com glória alta.
//
// Js 22 — O ALTAR DO TESTEMUNHO: Josué despede as 2 tribos e meia (Rúben, Gade,
// meia Manassés) para as suas tendas a leste do Jordão, ricas de despojo. Junto
// ao Jordão elas edificam um grande ALTAR. As tribos do ocidente, temendo
// apostasia, ajuntam-se em Siló para a GUERRA. FINÉIAS, o sacerdote, com dez
// príncipes, vai apurar; explica-se que o altar não é para sacrifício, mas de
// TESTEMUNHO — "testemunha entre nós que o Senhor é Deus". Dão-lhe o nome de
// Ede. A guerra é evitada; Israel louva a Deus.
//
// A VOZ DE DEUS (regra do projeto): em Js 22 não há oráculo divino direto — as
// tribos INVOCAM o Senhor (v.22), mas quem fala são elas (`by:"homem"`). Josué
// prega como mediador visível (`by:"servo"`, josue PRIMEIRO); Finéias como
// mediador visível (`by:"servo"`, fineias PRIMEIRO).
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const jv = (v: number, q?: string) => b(v, { by: "servo", ...(q ? { q } : {}) }); // Josué fala
const dv = (v: number, q?: string) => b(v, { by: "deus", ...(q ? { q } : {}) });   // voz do céu

// SILÓ — a congregação reunida na terra de Canaã: as tendas do arraial, o poço.
const SILO: StagePropSpec[] = [
  P("tent", -245, 1.1, undefined, 0.2),
  P("tent", 235, 1.05, undefined, 0.24),
  P("palm", -330, 1.05, undefined, 0.14),
  P("well", 315, 1.0, undefined, 0.5),
  P("grass", -70, 0.8, undefined, 0.8),
  P("grass", 95, 0.78, undefined, 0.72),
];
// AS CIDADES DOS LEVITAS — as torres das cidades e os seus ARRABALDES
// (pastagens): a relva e o gado ao redor, os levitas espalhados.
const CIDADES: StagePropSpec[] = [
  P("tower", -140, 1.2, undefined, 0.26),
  P("tower", 155, 1.15, undefined, 0.32),
  P("stall", 300, 0.9, undefined, 0.6),
  P("tree", -300, 1.0, undefined, 0.24),
  P("grass", -55, 0.82, undefined, 0.8),
  P("grass", 100, 0.78, undefined, 0.7),
];
// A TERRA DA PROMESSA cumprida — o Jordão, as cidades e as tendas, a boa terra
// possuída: o cenário do clímax da fidelidade de Deus.
const TERRA: StagePropSpec[] = [
  P("river", 315, 1.3, undefined, 0.84),
  P("tent", -255, 1.05, undefined, 0.2),
  P("tower", 155, 1.1, undefined, 0.3),
  P("palm", -330, 1.05, undefined, 0.14),
  P("tree", 255, 1.0, undefined, 0.26),
  P("grass", -60, 0.8, undefined, 0.78),
];
// A DESPEDIDA das 2 tribos e meia — voltam ricas de despojo: fardos, ânforas,
// gado. A bênção de Josué antes da partida para o oriente.
const DESPEDIDA: StagePropSpec[] = [
  P("tent", -255, 1.05, undefined, 0.2),
  P("crate", 250, 0.95, undefined, 0.5),
  P("amphora", 305, 0.85, undefined, 0.6),
  P("stall", -320, 0.95, undefined, 0.6),
  P("palm", 330, 1.0, undefined, 0.14),
  P("grass", -60, 0.8, undefined, 0.78),
];
// O GRANDE ALTAR junto ao Jordão — "de grande aparência". NÃO é para sacrifício
// (sem fogo): é o altar de TESTEMUNHO, entre as duas margens do rio.
const ALTAR_J: StagePropSpec[] = [
  { ...P("altar", 0, 1.5, undefined, 0.4), tag: "altar-ede" },
  P("river", -245, 1.3, undefined, 0.84),
  P("river", 260, 1.2, undefined, 0.82),
  P("palm", 330, 1.0, undefined, 0.14),
  P("grass", -85, 0.8, undefined, 0.72),
];
// GILEADE, a leste — onde Finéias e os príncipes vão apurar diante do altar, na
// terra da possessão das tribos do oriente.
const GILEADE: StagePropSpec[] = [
  { ...P("altar", 125, 1.4, undefined, 0.42), tag: "altar-ede" },
  P("river", -245, 1.3, undefined, 0.84),
  P("tent", -265, 1.0, undefined, 0.2),
  P("palm", 330, 1.0, undefined, 0.14),
  P("grass", -60, 0.8, undefined, 0.74),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Js 21
  21: {
    start: { terrain: "field", night: 0.1, glory: 0.62, storm: 0, fire: 0, verdure: 0.4 },
    beats: [
      // v.1 — os cabeças dos pais dos levitas se achegam a Eleazar e a Josué.
      b(1, { q: "os cabeças dos pais dos levitas se achegaram", set: "silo", props: SILO,
        env: { terrain: "field", glory: 0.6, night: 0.1, verdure: 0.42 }, cast: [
        C("servo", -155, "stand", { dy: 0.5, facing: 1, id: "josue", glow: 0.15 }),
        C("servo", -60, "stand", { dy: 0.5, facing: 1, id: "eleazar" }),
        C("anciao", 130, "walk", { dy: 0.52, facing: -1, id: "levitas" }),
      ] }),
      // v.2 — em Siló, os levitas pedem cidades para habitar, com arrabaldes.
      b(2, { by: "anciao", q: "que se nos dessem cidades para habitar", cast: [
        C("anciao", 120, "raise", { dy: 0.52, facing: -1, id: "levitas" }),
        C("servo", -150, "stand", { dy: 0.5, facing: 1, id: "josue", glow: 0.15 }),
        C("servo", -55, "stand", { dy: 0.5, facing: 1, id: "eleazar" }),
      ] }),
      // v.3 — os filhos de Israel dão aos levitas cidades da sua herança.
      b(3, { q: "deram aos levitas da sua herança", cast: [
        C("servo", -150, "point", { dy: 0.5, facing: 1, id: "josue", glow: 0.15 }),
        C("servo", -55, "stand", { dy: 0.5, facing: 1, id: "eleazar" }),
        C("anciao", 120, "bow", { dy: 0.52, facing: -1, id: "levitas" }),
      ] }),
      // v.4 — a sorte dos coatitas: aos filhos de Arão, treze cidades.
      b(4, { q: "tiveram por sorte da tribo de Judá", set: "cidades", props: CIDADES,
        env: { terrain: "field", glory: 0.56, night: 0.1, verdure: 0.36 }, cast: [
        C("servo", -140, "stand", { dy: 0.5, facing: 1, id: "eleazar" }),
        C("anciao", 130, "walk", { dy: 0.54, facing: -1, id: "coatitas" }),
      ] }),
      // v.5 — aos outros filhos de Coate, dez cidades.
      b(5, { q: "dez cidades", cast: [
        C("anciao", 120, "walk", { dy: 0.54, facing: -1, id: "coatitas" }),
      ] }),
      // v.6 — aos filhos de Gérson, em Basã, treze cidades.
      b(6, { q: "em Basã, treze cidades", cast: [
        C("anciao", 120, "walk", { dy: 0.54, facing: -1, id: "gersonitas" }),
      ] }),
      // v.7 — aos filhos de Merari, doze cidades.
      b(7, { q: "doze cidades", cast: [
        C("anciao", 120, "walk", { dy: 0.54, facing: -1, id: "meraritas" }),
      ] }),
      // v.8 — assim Israel dá aos levitas estas cidades e os seus arrabaldes.
      b(8, { q: "aos levitas estas cidades", cast: [
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.15 }),
        C("anciao", 120, "bow", { dy: 0.52, facing: -1, id: "levitas" }),
      ] }),
      // v.9 — as cidades de Judá e Simeão, mencionadas por nome.
      b(9, { q: "estas cidades, que por nome foram mencionadas" }),
      // v.10 — aos filhos de Arão, porque a primeira sorte foi sua.
      b(10, { q: "a primeira sorte foi sua", cast: [
        C("servo", -60, "stand", { dy: 0.5, facing: 1, id: "eleazar", glow: 0.1 }),
        C("anciao", 130, "stand", { dy: 0.52, facing: -1, id: "sacerdotes" }),
      ] }),
      // v.11 — a cidade de Arba, no monte de Judá: esta é Hebrom.
      b(11, { q: "esta é Hebrom", env: { glory: 0.54, verdure: 0.3 }, cast: [
        C("anciao", 120, "stand", { dy: 0.52, facing: -1, id: "sacerdotes" }),
      ] }),
      // v.12 — porém o campo e as aldeias, deram a Calebe.
      b(12, { q: "deram a Calebe, filho de Jefoné", cast: [
        C("servo", 120, "stand", { dy: 0.5, facing: -1, id: "calebe", glow: 0.15 }),
        C("servo", -140, "point", { dy: 0.5, facing: 1, id: "eleazar" }),
      ] }),
      // v.13 — aos filhos de Arão, Hebrom, cidade de refúgio, e Libna.
      b(13, { q: "cidade do refúgio do homicida", cast: [
        C("anciao", 120, "stand", { dy: 0.52, facing: -1, id: "sacerdotes" }),
      ] }),
      b(14), b(15),                                                                 // Jatir, Estemoa, Holom, Debir e os seus arrabaldes
      // v.16 — Aim, Jutá, Bete-Semes: nove cidades destas duas tribos.
      b(16, { q: "nove cidades destas duas tribos" }),
      // v.17 — da tribo de Benjamim, Gibeão e Geba.
      b(17, { q: "Gibeão e os seus arrabaldes", cast: [
        C("anciao", 120, "stand", { dy: 0.52, facing: -1, id: "sacerdotes" }),
      ] }),
      b(18),                                                                        // Anatote e Almom: quatro cidades
      // v.19 — todas as cidades dos sacerdotes: treze cidades.
      b(19, { q: "foram treze cidades e os seus arrabaldes", cast: [
        C("anciao", 120, "raise", { dy: 0.52, facing: -1, id: "sacerdotes" }),
      ] }),
      // v.20 — as famílias dos filhos de Coate, da tribo de Efraim.
      b(20, { q: "tiveram as cidades da sua sorte", cast: [
        C("anciao", 120, "walk", { dy: 0.54, facing: -1, id: "coatitas" }),
      ] }),
      // v.21 — Siquém, cidade de refúgio, no monte de Efraim, e Gezer.
      b(21, { q: "Siquém, cidade de refúgio do homicida", cast: [
        C("anciao", 120, "stand", { dy: 0.54, facing: -1, id: "coatitas" }),
      ] }),
      b(22), b(23), b(24), b(25),                                                   // Quibzaim, Bete-Horom, Elteque, Aijalom, Gate-Rimom, Taanaque
      // v.26 — as cidades dos demais filhos de Coate: dez cidades.
      b(26, { q: "foram dez e os seus arrabaldes" }),
      // v.27 — aos gersonitas, Golã em Basã, cidade de refúgio, e Beesterá.
      b(27, { q: "Golã, cidade de refúgio do homicida", cast: [
        C("anciao", 120, "walk", { dy: 0.54, facing: -1, id: "gersonitas" }),
      ] }),
      b(28), b(29), b(30), b(31),                                                   // Quisiom, Daberate, Jarmute, En-Ganim, Misal, Abdom, Helcate, Reobe
      // v.32 — de Naftali, Quedes na Galiléia, cidade de refúgio.
      b(32, { q: "Quedes, cidade de refúgio do homicida", cast: [
        C("anciao", 120, "stand", { dy: 0.54, facing: -1, id: "gersonitas" }),
      ] }),
      // v.33 — todas as cidades dos gersonitas: treze cidades.
      b(33, { q: "foram treze cidades e os seus arrabaldes", cast: [
        C("anciao", 120, "raise", { dy: 0.52, facing: -1, id: "gersonitas" }),
      ] }),
      // v.34 — aos filhos de Merari, de Zebulom, Jocneão e Cartã.
      b(34, { q: "da tribo de Zebulom, Jocneão", cast: [
        C("anciao", 120, "walk", { dy: 0.54, facing: -1, id: "meraritas" }),
      ] }),
      b(35), b(36), b(37),                                                          // Dimna, Naalal, Bezer, Jaza, Quedemote, Mefaate
      // v.38 — da tribo de Gade, Ramote em Gileade, cidade de refúgio.
      b(38, { q: "Ramote, cidade de refúgio do homicida", cast: [
        C("anciao", 120, "stand", { dy: 0.54, facing: -1, id: "meraritas" }),
      ] }),
      b(39),                                                                        // Hesbom e Jazer: ao todo, quatro cidades
      // v.40 — as cidades dos meraritas: a sua sorte, doze cidades.
      b(40, { q: "a sua sorte doze cidades", cast: [
        C("anciao", 120, "raise", { dy: 0.52, facing: -1, id: "meraritas" }),
      ] }),
      // v.41 — QUARENTA E OITO cidades dos levitas, ESPALHADAS no meio da
      // herança de Israel — os levitas em todo o povo, para ensinar a Lei.
      b(41, { q: "quarenta e oito cidades e os seus arrabaldes",
        env: { terrain: "field", glory: 0.66, night: 0.08, verdure: 0.42 }, cast: [
        C("anciao", -150, "stand", { dy: 0.5, facing: 1, id: "levita1", glow: 0.12 }),
        C("anciao", -20, "stand", { dy: 0.54, id: "levita2" }),
        C("anciao", 130, "stand", { dy: 0.5, facing: -1, id: "levita3", glow: 0.12 }),
        C("anciao", 240, "stand", { dy: 0.6, facing: -1, id: "levita4" }),
      ] }),
      // v.42 — cada cidade com os seus arrabaldes (pastagens) ao redor.
      b(42, { q: "cada uma com os seus arrabaldes em redor delas" }),
      // v.43 — O SENHOR deu a Israel TODA a terra que jurara a seus pais.
      b(43, { q: "toda a terra que jurara dar a seus pais", set: "terra", props: TERRA,
        env: { terrain: "field", glory: 0.82, night: 0.06, verdure: 0.5 }, cast: [
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.3 }),
        C("multidao", 150, "stand", { dy: 0.6 }),
      ] }),
      // v.44 — repouso de todos os lados: nenhum inimigo pôde resistir-lhes.
      b(44, { q: "nenhum de todos os seus inimigos pôde resisti-los",
        env: { glory: 0.86, night: 0.05, verdure: 0.5 }, cast: [
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.35 }),
        C("multidao", 150, "raise", { dy: 0.6 }),
      ] }),
      // v.45 — CLÍMAX: NENHUMA palavra falhou de todas as boas coisas; tudo se
      // cumpriu. A fidelidade de Deus — glória alta.
      b(45, { by: "deus", q: "Palavra alguma falhou de todas as boas coisas",
        env: { terrain: "field", glory: 0.96, night: 0.03, storm: 0, fire: 0, verdure: 0.52 }, cast: [
        C("servo", -150, "kneel", { dy: 0.52, facing: 1, id: "josue", glow: 0.4 }),
        C("multidao", 150, "raise", { dy: 0.6 }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Js 22
  22: {
    start: { terrain: "field", night: 0.1, glory: 0.62, storm: 0, fire: 0, verdure: 0.42 },
    beats: [
      // v.1 — Josué chama os rubenitas, os gaditas e a meia tribo de Manassés.
      b(1, { q: "Josué chamou os rubenitas", set: "silo", props: SILO,
        env: { terrain: "field", glory: 0.6, night: 0.1, verdure: 0.42 }, cast: [
        C("servo", -155, "point", { dy: 0.5, facing: 1, id: "josue", glow: 0.15 }),
        C("multidao", 140, "stand", { dy: 0.6 }),
      ] }),
      // v.2 — "à minha voz obedecestes em tudo quanto vos ordenei".
      jv(2, "à minha voz obedecestes em tudo quanto vos ordenei"),
      // v.3 — "até ao dia de hoje, não desamparastes" a vossos irmãos.
      jv(3, "até ao dia de hoje, não desamparastes"),
      // v.4 — agora ide-vos às vossas tendas, à terra da vossa possessão.
      jv(4, "ide-vos às vossas tendas"),
      // v.5 — "que ameis ao Senhor vosso Deus" e guardeis os mandamentos.
      jv(5, "que ameis ao Senhor vosso Deus"),
      // v.6 — Josué os abençoa e despede; vão-se às suas tendas.
      b(6, { q: "Josué os abençoou, e despediu-os", cast: [
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.2 }),
        C("multidao", 150, "walk", { dy: 0.6, facing: -1 }),
      ] }),
      // v.7 — Josué também deu herança à meia Manassés aquém do Jordão.
      b(7, { q: "Josué deu herança entre seus irmãos", cast: [
        C("servo", -150, "point", { dy: 0.5, facing: 1, id: "josue", glow: 0.15 }),
        C("multidao", 150, "stand", { dy: 0.6, facing: -1 }),
      ] }),
      // v.8 — "Voltai-vos às vossas tendas com grandes riquezas": muito gado,
      // prata, ouro, metal, ferro e roupas — reparti o despojo dos inimigos.
      jv(8, "Voltai-vos às vossas tendas com grandes riquezas"),
      // v.9 — as tribos separam-se de Siló para irem à terra de Gileade.
      b(9, { q: "para irem à terra de Gileade", set: "despedida", props: DESPEDIDA,
        env: { terrain: "field", glory: 0.58, night: 0.12, verdure: 0.4 }, cast: [
        C("servo", -160, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.15 }),
        C("multidao", 150, "walk", { dy: 0.6, facing: -1 }),
      ] }),
      // v.10 — junto ao Jordão edificam um ALTAR de grande aparência.
      b(10, { q: "edificaram um altar junto ao Jordão", set: "altar", props: ALTAR_J,
        env: { terrain: "field", glory: 0.55, night: 0.14, verdure: 0.36 }, cast: [
        C("homem", -150, "raise", { dy: 0.52, facing: 1, id: "rubenita" }),
        C("homem", 150, "stand", { dy: 0.52, facing: -1, id: "gadita" }),
      ] }),
      // v.11 — os filhos de Israel ouvem do altar diante da terra de Canaã.
      b(11, { q: "edificaram um altar diante da terra de Canaã", set: "silo", props: SILO,
        env: { terrain: "field", glory: 0.42, night: 0.22, verdure: 0.3 }, cast: [
        C("multidao", 120, "point", { dy: 0.6, facing: -1 }),
      ] }),
      // v.12 — a congregação reúne-se em Siló para sair em GUERRA contra eles.
      b(12, { q: "para saírem em guerra contra eles", env: { glory: 0.34, night: 0.3, storm: 0.12 }, cast: [
        C("multidao", 0, "raise", { dy: 0.58 }),
        C("homem", 170, "stand", { dy: 0.5, facing: -1, id: "guerreiro" }),
      ] }),
      // v.13 — enviam FINÉIAS, filho de Eleazar, o sacerdote, a Gileade.
      b(13, { q: "a Finéias, filho de Eleazar, o sacerdote", env: { glory: 0.44, night: 0.2 }, cast: [
        C("servo", -140, "walk", { dy: 0.5, facing: -1, id: "fineias", glow: 0.15 }),
        C("multidao", 150, "stand", { dy: 0.6 }),
      ] }),
      // v.14 — e dez PRÍNCIPES com ele, cabeças das casas paternas de Israel.
      b(14, { q: "dez príncipes com ele", cast: [
        C("servo", -140, "walk", { dy: 0.5, facing: -1, id: "fineias", glow: 0.15 }),
        C("anciao", 40, "walk", { dy: 0.52, facing: -1, id: "principe1" }),
        C("anciao", 130, "walk", { dy: 0.5, facing: -1, id: "principe2" }),
      ] }),
      // v.15 — indo à terra de Gileade, falam-lhes.
      b(15, { q: "falaram-lhes, dizendo", set: "gileade", props: GILEADE,
        env: { terrain: "field", glory: 0.42, night: 0.2, verdure: 0.34 }, cast: [
        C("servo", -150, "stand", { dy: 0.5, facing: 1, id: "fineias", glow: 0.15 }),
        C("anciao", -50, "stand", { dy: 0.52, facing: 1, id: "principe1" }),
        C("homem", 150, "stand", { dy: 0.52, facing: -1, id: "rubenita" }),
      ] }),
      // v.16 — "Que transgressão é esta, que cometestes contra o Deus de Israel?"
      b(16, { by: "servo", q: "Que transgressão é esta, que cometestes", cast: [
        C("servo", -150, "point", { dy: 0.5, facing: 1, id: "fineias", glow: 0.15 }),
        C("anciao", -50, "stand", { dy: 0.52, facing: 1, id: "principe1" }),
        C("homem", 150, "bow", { dy: 0.54, facing: -1, id: "rubenita" }),
      ] }),
      // v.17 — a iniquidade de Peor, de que ainda não estamos purificados.
      b(17, { by: "servo", q: "a iniqüidade de Peor", env: { glory: 0.4, night: 0.22 }, cast: [
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "fineias", glow: 0.15 }),
        C("anciao", -50, "stand", { dy: 0.52, facing: 1, id: "principe1" }),
      ] }),
      // v.18 — "Para que hoje deixais de seguir o Senhor?"
      b(18, { by: "servo", q: "deixais de seguir o Senhor", cast: [
        C("servo", -150, "point", { dy: 0.5, facing: 1, id: "fineias", glow: 0.15 }),
        C("homem", 150, "bow", { dy: 0.54, facing: -1, id: "rubenita" }),
      ] }),
      // v.19 — passai-vos para a terra do Senhor, mas não vos rebeleis.
      b(19, { by: "servo", q: "não vos rebeleis contra o Senhor", cast: [
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "fineias", glow: 0.15 }),
        C("anciao", -50, "stand", { dy: 0.52, facing: 1, id: "principe1" }),
      ] }),
      // v.20 — o exemplo de Acã: a ira veio sobre toda a congregação.
      b(20, { by: "servo", q: "Não cometeu Acã, filho de Zerá", env: { glory: 0.36, night: 0.26 }, cast: [
        C("servo", -150, "point", { dy: 0.5, facing: 1, id: "fineias", glow: 0.15 }),
        C("homem", 150, "bow", { dy: 0.54, facing: -1, id: "rubenita" }),
      ] }),
      // v.21 — respondem os filhos de Rúben, Gade e a meia Manassés.
      b(21, { q: "responderam os filhos de Rúben", env: { glory: 0.44, night: 0.18 }, cast: [
        C("homem", 130, "raise", { dy: 0.52, facing: -1, id: "rubenita" }),
        C("homem", 210, "stand", { dy: 0.56, facing: -1, id: "gadita" }),
        C("servo", -150, "stand", { dy: 0.5, facing: 1, id: "fineias", glow: 0.15 }),
      ] }),
      // v.22 — "O Senhor Deus dos deuses, ele o sabe": o juramento solene.
      b(22, { by: "homem", q: "O Senhor Deus dos deuses", env: { glory: 0.55, night: 0.14 }, cast: [
        C("homem", 130, "raise", { dy: 0.52, facing: -1, id: "rubenita" }),
        C("homem", 210, "stand", { dy: 0.56, facing: -1, id: "gadita" }),
        C("servo", -150, "stand", { dy: 0.5, facing: 1, id: "fineias", glow: 0.15 }),
      ] }),
      // v.23 — não foi para nos desviarmos do Senhor: que ele o requeira.
      b(23, { by: "homem", q: "para nos desviarmos do Senhor", cast: [
        C("homem", 130, "point", { dy: 0.52, facing: -1, id: "rubenita" }),
        C("servo", -150, "stand", { dy: 0.5, facing: 1, id: "fineias", glow: 0.15 }),
      ] }),
      // v.24 — foi por receio: amanhã vossos filhos dirão aos nossos...
      b(24, { by: "homem", q: "por receio disto", cast: [
        C("homem", 130, "stand", { dy: 0.52, facing: -1, id: "rubenita" }),
        C("homem", 210, "stand", { dy: 0.56, facing: -1, id: "gadita" }),
      ] }),
      // v.25 — "não tendes parte no Senhor" — o temor da divisão do povo.
      b(25, { by: "homem", q: "não tendes parte no Senhor", cast: [
        C("homem", 130, "point", { dy: 0.52, facing: -1, id: "rubenita" }),
        C("servo", -150, "stand", { dy: 0.5, facing: 1, id: "fineias", glow: 0.15 }),
      ] }),
      // v.26 — por isso: edifiquemos um altar, NÃO para holocausto.
      b(26, { by: "homem", q: "edifiquemos um altar, não para holocausto",
        set: "gileade-altar", props: GILEADE, env: { glory: 0.5, night: 0.14, verdure: 0.34 }, cast: [
        C("homem", -60, "point", { dy: 0.52, facing: -1, id: "rubenita" }),
        C("servo", -170, "stand", { dy: 0.5, facing: 1, id: "fineias", glow: 0.15 }),
      ] }),
      // v.27 — mas para que nos seja em TESTEMUNHO entre nós e vós.
      b(27, { by: "homem", q: "nos seja em testemunho", env: { glory: 0.56 }, cast: [
        C("homem", -60, "raise", { dy: 0.52, facing: -1, id: "rubenita" }),
        C("homem", 60, "stand", { dy: 0.56, facing: -1, id: "gadita" }),
      ] }),
      // v.28 — "para ser testemunho entre nós e vós" — o modelo do altar.
      b(28, { by: "homem", q: "para ser testemunho entre nós e vós", env: { glory: 0.58 }, cast: [
        C("homem", -60, "point", { dy: 0.52, facing: -1, id: "rubenita" }),
        C("servo", -180, "stand", { dy: 0.5, facing: 1, id: "fineias", glow: 0.15 }),
      ] }),
      // v.29 — "Nunca tal nos aconteça que nos rebelemos contra o Senhor".
      b(29, { by: "homem", q: "Nunca tal nos aconteça", cast: [
        C("homem", -60, "raise", { dy: 0.52, facing: -1, id: "rubenita" }),
        C("homem", 60, "bow", { dy: 0.56, facing: -1, id: "gadita" }),
      ] }),
      // v.30 — Finéias e os príncipes ouvem; pareceu bem aos seus olhos.
      b(30, { q: "pareceu bem aos seus olhos", env: { glory: 0.62, night: 0.1 }, cast: [
        C("servo", -140, "stand", { dy: 0.5, facing: 1, id: "fineias", glow: 0.2 }),
        C("anciao", -50, "stand", { dy: 0.52, facing: 1, id: "principe1" }),
        C("homem", 140, "stand", { dy: 0.52, facing: -1, id: "rubenita" }),
      ] }),
      // v.31 — FINÉIAS: "Hoje sabemos que o Senhor está no meio de nós".
      b(31, { by: "servo", q: "Hoje sabemos que o Senhor está no meio de nós",
        env: { glory: 0.68, night: 0.08 }, cast: [
        C("servo", -140, "raise", { dy: 0.5, facing: 1, id: "fineias", glow: 0.3 }),
        C("homem", 140, "stand", { dy: 0.52, facing: -1, id: "rubenita" }),
      ] }),
      // v.32 — Finéias e os príncipes voltam de Gileade a Canaã com a resposta.
      b(32, { q: "voltaram da terra de Gileade à terra de Canaã", set: "silo", props: SILO,
        env: { terrain: "field", glory: 0.6, night: 0.1, verdure: 0.42 }, cast: [
        C("servo", -140, "walk", { dy: 0.5, facing: 1, id: "fineias", glow: 0.2 }),
        C("anciao", -30, "walk", { dy: 0.52, facing: 1, id: "principe1" }),
        C("multidao", 150, "stand", { dy: 0.6 }),
      ] }),
      // v.33 — a resposta agrada; Israel LOUVA a Deus; não há guerra.
      b(33, { q: "louvaram a Deus", env: { glory: 0.8, night: 0.05, verdure: 0.46 }, cast: [
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "fineias", glow: 0.28 }),
        C("multidao", 150, "raise", { dy: 0.6 }),
      ] }),
      // v.34 — dão ao altar o nome de EDE: testemunha que o Senhor é Deus.
      b(34, { q: "deram ao altar o nome de Ede", set: "gileade-ede", props: GILEADE,
        env: { terrain: "field", glory: 0.72, night: 0.08, verdure: 0.4 }, cast: [
        C("homem", -60, "raise", { dy: 0.52, facing: -1, id: "rubenita", glow: 0.15 }),
        C("homem", 60, "stand", { dy: 0.56, facing: -1, id: "gadita" }),
      ] }),
    ],
  },
};
