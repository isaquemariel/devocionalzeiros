// ============================================================================
// RUTE 1–4 — CENA VIVA. A joia escondida no tempo dos juízes.
//
// Rt 1 — A FOME nos dias em que os juízes julgavam. Elimeleque sai de BELÉM
// ("casa do pão") justamente porque falta pão, e peregrina nos campos de MOABE
// com NOEMI e os dois filhos. Ali morre o marido; ali os filhos tomam mulheres
// moabitas — ORFA e RUTE — e ali, dez anos depois, morrem também os dois.
// Restam três viúvas e nenhuma esperança. Chega então a notícia: o SENHOR
// visitou o seu povo, dando-lhe pão. No caminho de volta, Noemi despede as
// noras: Orfa beija a sogra e volta ao seu povo e aos seus deuses; RUTE SE
// APEGA e faz o voto que atravessa a Escritura — "o teu povo é o meu povo, o
// teu Deus é o meu Deus" (1:16). Belém se comove com a volta delas, mas Noemi
// diz: "não me chameis Noemi; chamai-me Mara". E chegam no princípio da
// colheita das cevadas — a amargura entra na cidade na hora da ceifa.
//
// Rt 2 — O CAMPO. Rute vai respigar "atrás daquele em cujos olhos eu achar
// graça", e cai-lhe em sorte a parte do campo de BOAZ, parente de Elimeleque.
// Boaz chega de Belém saudando os segadores, repara na estrangeira, manda que
// fique com as suas moças, que beba dos vasos, que ninguém a moleste; à hora
// de comer, chama-a para molhar o bocado no vinagre; e ordena aos moços que
// deixem cair punhados de propósito entre as gavelas. E a bênção: "sob cujas
// asas te vieste abrigar" (2:12). Ela volta com quase um efa de cevada — e
// Noemi descobre que o homem é um dos seus REMIDORES.
//
// Rt 3 — A EIRA de noite. Noemi busca descanso para a nora: lava-te, unge-te,
// desce à eira. Boaz dorme ao pé do monte de grãos; Rute descobre-lhe os pés e
// se deita. À meia-noite ele estremece: "Quem és tu?" — "Sou Rute, tua serva;
// estende pois tua capa sobre a tua serva, porque tu és o remidor" (3:9). Cena
// de reverência, não de sombra: ele a chama bendita, promete resolver o caso, e
// a manda embora com SEIS MEDIDAS de cevada — para que não volte vazia.
//
// Rt 4 — A PORTA da cidade, o tribunal de Israel. Boaz senta-se ali com DEZ
// ANCIÃOS e chama o remidor mais chegado. Este quer a terra — até ouvir que com
// ela vem Rute, a moabita, e o nome do falecido; então recusa e DESCALÇA O
// SAPATO, o testemunho antigo da permuta. Boaz resgata campo e viúva, e o povo
// abençoa a casa como a de Raquel e Lia. Nasce OBEDE, e Noemi, que voltara
// vazia, recebe o menino no colo. O livro fecha na genealogia que sobe de Perez
// e desce até DAVI (4:17,22) — a linhagem do Messias, em que a moabita redimida
// entra pelo nome (Mt 1:5).
//
// A VOZ DE DEUS: em Rute o SENHOR nunca fala em cena — Ele age pela providência
// e é louvado pelas bocas humanas ("Bendito seja ele do Senhor"). Por isso NÃO
// há `by: "deus"` neste livro: a glória sobe no ambiente (env.glory), não em
// balão. As falas são todas de gente: Noemi, Rute e as vizinhas como
// `mulherComum` (nunca `mulher`, que ignora pose e é sempre dourada), Boaz, o
// moço e o remidor como `homem`, e os anciãos da porta como `anciao`.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------- CENÁRIOS

// BELÉM NA FOME — a "casa do pão" sem pão: portas fechadas, terra rachada.
const BELEM_FOME: StagePropSpec[] = [
  P("tower", 60, 1.15, undefined, 0.28),
  P("door", -130, 1.05, undefined, 0.34),
  P("church", 255, 0.95, undefined, 0.32),
  P("rock", -285, 1.0, undefined, 0.52),
  P("grass", 165, 0.55, undefined, 0.72),
];
// OS CAMPOS DE MOABE — a peregrinação: tendas de estrangeiros, curral, palmeira.
const MOABE: StagePropSpec[] = [
  P("tent", -195, 1.15, undefined, 0.24),
  P("tent", 205, 1.05, undefined, 0.32),
  P("stall", 85, 0.9, undefined, 0.5),
  P("palm", -320, 1.0, undefined, 0.16),
  P("rock", 300, 0.95, undefined, 0.58),
  P("grass", -55, 0.78, undefined, 0.72),
];
// O LUTO EM MOABE — as três sepulturas de pedra no campo alheio.
const MOABE_LUTO: StagePropSpec[] = [
  P("rock", -145, 1.25, undefined, 0.46),
  P("rock", 25, 1.15, undefined, 0.54),
  P("rock", 190, 1.05, undefined, 0.44),
  P("tent", -300, 1.0, undefined, 0.24),
  P("palm", 320, 0.95, undefined, 0.16),
  P("grass", 110, 0.7, undefined, 0.74),
];
// A ESTRADA DE MOABE A JUDÁ — o caminho da volta, sem casa e sem bagagem.
const ESTRADA: StagePropSpec[] = [
  P("rock", -255, 1.05, undefined, 0.5),
  P("bush", 55, 0.9, undefined, 0.58),
  P("palm", 300, 1.0, undefined, 0.16),
  P("grass", -95, 0.8, undefined, 0.72),
  P("grass", 145, 0.76, undefined, 0.64),
];
// O VOTO DE RUTE — a mesma estrada, mas o céu se abre: aliança sob as estrelas.
const VOTO: StagePropSpec[] = [
  P("rock", -255, 1.05, undefined, 0.5),
  P("bush", 55, 0.9, undefined, 0.58),
  P("palm", 300, 1.0, undefined, 0.16),
  P("grass", -95, 0.8, undefined, 0.72),
  { ...P("star", -25, 1.4, undefined, 0.84), sky: true, tag: "voto-de-rute" },
  { ...P("starfield", 165, 1.0, undefined, 0.78), sky: true },
];
// A PORTA DE BELÉM — a cidade que se comove ao ver Noemi voltar.
const BELEM_PORTA: StagePropSpec[] = [
  P("door", -60, 1.2, undefined, 0.34),
  P("tower", 125, 1.1, undefined, 0.28),
  P("church", -265, 0.95, undefined, 0.3),
  P("amphora", 235, 0.8, undefined, 0.62),
  P("grass", 30, 0.55, undefined, 0.74),
];
// BELÉM NA CEIFA — os feixes de cevada: a "casa do pão" outra vez cheia de pão.
const BELEM_CEIFA: StagePropSpec[] = [
  P("sheaf", -155, 1.15, undefined, 0.56),
  P("sheaf", 20, 1.05, undefined, 0.64),
  P("sheaf", 175, 1.0, undefined, 0.5),
  P("tower", 265, 1.0, undefined, 0.28),
  P("palm", -320, 1.0, undefined, 0.16),
  P("grass", 105, 0.72, undefined, 0.74),
];

// A CASA DE NOEMI EM BELÉM — a porta pobre, o cântaro, o cesto da viúva.
const CASA_NOEMI: StagePropSpec[] = [
  P("door", -35, 1.15, undefined, 0.36),
  P("amphora", 130, 0.85, undefined, 0.62),
  P("crate", -185, 0.85, undefined, 0.58),
  P("stall", 250, 0.9, undefined, 0.4),
  P("grass", 60, 0.55, undefined, 0.76),
];
// O CAMPO DE BOAZ — as gavelas, os feixes da sega e os vasos de água.
const CAMPO_BOAZ: StagePropSpec[] = [
  P("sheaf", -195, 1.15, undefined, 0.5),
  P("sheaf", -45, 1.05, undefined, 0.62),
  P("sheaf", 120, 1.1, undefined, 0.46),
  P("sheaf", 250, 1.0, undefined, 0.58),
  P("well", 315, 0.9, undefined, 0.38),
  P("palm", -330, 1.0, undefined, 0.16),
  P("grass", 45, 0.8, undefined, 0.76),
];
// A HORA DE COMER — o pão, o vinagre e o trigo tostado ao lado dos segadores.
const MESA_SEGADORES: StagePropSpec[] = [
  P("crate", -65, 1.0, undefined, 0.62),
  P("amphora", 60, 0.9, undefined, 0.64),
  P("sheaf", -225, 1.1, undefined, 0.5),
  P("sheaf", 200, 1.05, undefined, 0.48),
  P("palm", 320, 1.0, undefined, 0.16),
  P("grass", 130, 0.7, undefined, 0.76),
];

// A EIRA DE NOITE — o monte de grãos padejado, a lua limpa sobre a cevada.
const EIRA: StagePropSpec[] = [
  P("sheaf", -25, 1.55, undefined, 0.42),
  P("sheaf", -195, 1.15, undefined, 0.52),
  P("sheaf", 175, 1.1, undefined, 0.46),
  P("crate", 265, 0.85, undefined, 0.6),
  P("amphora", -285, 0.85, undefined, 0.58),
  P("grass", 80, 0.7, undefined, 0.78),
  { ...P("moon", 120, 1.5, undefined, 0.76), sky: true },
];

// A PORTA DA CIDADE — o tribunal de Israel: os assentos de pedra e os anciãos.
const PORTA_CIDADE: StagePropSpec[] = [
  P("door", 0, 1.35, undefined, 0.3),
  P("tower", 215, 1.1, undefined, 0.26),
  P("church", -235, 1.0, undefined, 0.3),
  P("rock", -115, 0.95, undefined, 0.62),
  P("rock", 125, 0.9, undefined, 0.64),
  P("grass", 300, 0.55, undefined, 0.74),
];
// A CASA DE BOAZ — o resgate consumado: casa, pão e cevada no eirado.
const CASA_BOAZ: StagePropSpec[] = [
  P("door", -50, 1.2, undefined, 0.34),
  P("amphora", 140, 0.9, undefined, 0.62),
  P("crate", -205, 0.85, undefined, 0.58),
  P("sheaf", 245, 1.05, undefined, 0.5),
  P("palm", -320, 1.0, undefined, 0.16),
  P("grass", 40, 0.6, undefined, 0.76),
];
// A LINHAGEM — Belém sob a estrela: de Perez a Davi, e de Davi ao Cristo.
const LINHAGEM: StagePropSpec[] = [
  P("tower", 255, 1.05, undefined, 0.26),
  P("door", -275, 1.0, undefined, 0.3),
  P("sheaf", -125, 1.1, undefined, 0.54),
  P("sheaf", 90, 1.05, undefined, 0.5),
  P("palm", 320, 1.0, undefined, 0.16),
  P("grass", 0, 0.7, undefined, 0.78),
  { ...P("star", -20, 1.5, undefined, 0.85), sky: true, tag: "estrela-de-belem" },
  { ...P("starfield", 175, 1.0, undefined, 0.8), sky: true },
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Rt 1
  1: {
    start: { terrain: "field", night: 0.22, glory: 0.3, storm: 0, fire: 0, verdure: 0.1 },
    beats: [
      // v.1 — a FOME na casa do pão: um homem de Belém sai a peregrinar em Moabe.
      b(1, { q: "houve uma fome na terra", set: "belem-fome", props: BELEM_FOME,
        env: { terrain: "city", night: 0.24, glory: 0.26, verdure: 0.06 }, cast: [
        C("homem", -150, "walk", { dy: 0.5, facing: 1, id: "elimeleque" }),
        C("mulherComum", -60, "walk", { dy: 0.52, facing: 1, id: "noemi" }),
        C("homem", 30, "walk", { dy: 0.48, facing: 1, id: "malom" }),
        C("homem", 105, "walk", { dy: 0.46, facing: 1, id: "quiliom" }),
      ] }),
      // v.2 — os nomes: Elimeleque, Noemi, Malom e Quiliom; chegam aos campos de Moabe.
      b(2, { q: "e chegaram aos campos de Moabe", set: "moabe", props: MOABE,
        env: { terrain: "field", night: 0.2, glory: 0.34, verdure: 0.3 }, cast: [
        C("homem", -140, "stand", { dy: 0.5, facing: 1, id: "elimeleque" }),
        C("mulherComum", -50, "stand", { dy: 0.52, facing: 1, id: "noemi" }),
        C("homem", 45, "stand", { dy: 0.48, facing: -1, id: "malom" }),
        C("homem", 125, "stand", { dy: 0.46, facing: -1, id: "quiliom" }),
      ] }),
      // v.3 — morre ELIMELEQUE em terra estranha; Noemi fica com os dois filhos.
      b(3, { q: "e ficou ela com os seus dois filhos", set: "moabe-luto", props: MOABE_LUTO,
        env: { terrain: "field", night: 0.5, glory: 0.2, verdure: 0.22 }, cast: [
        C("mulherComum", -60, "kneel", { dy: 0.56, facing: 1, id: "noemi" }),
        C("homem", 60, "bow", { dy: 0.54, facing: -1, id: "malom" }),
        C("homem", 150, "bow", { dy: 0.5, facing: -1, id: "quiliom" }),
      ] }),
      // v.4 — os filhos tomam mulheres moabitas: ORFA e RUTE; quase dez anos ali.
      b(4, { q: "e era o nome de uma Orfa, e o da outra Rute", set: "moabe", props: MOABE,
        env: { terrain: "field", night: 0.24, glory: 0.36, verdure: 0.34 }, cast: [
        C("homem", -175, "stand", { dy: 0.5, facing: 1, id: "malom" }),
        C("mulherComum", -95, "stand", { dy: 0.52, facing: -1, id: "rute" }),
        C("homem", 55, "stand", { dy: 0.48, facing: 1, id: "quiliom" }),
        C("mulherComum", 135, "stand", { dy: 0.5, facing: -1, id: "orfa" }),
        C("mulherComum", 250, "stand", { dy: 0.44, facing: -1, id: "noemi" }),
      ] }),
      // v.5 — morrem MALOM e QUILIOM: a mulher desamparada de filhos e marido.
      b(5, { q: "ficando assim a mulher desamparada dos seus dois filhos", set: "moabe-luto", props: MOABE_LUTO,
        env: { terrain: "field", night: 0.66, glory: 0.14, verdure: 0.16 }, cast: [
        C("mulherComum", -40, "kneel", { dy: 0.58, facing: 1, id: "noemi" }),
        C("mulherComum", -170, "bow", { dy: 0.54, facing: 1, id: "rute" }),
        C("mulherComum", 100, "bow", { dy: 0.52, facing: -1, id: "orfa" }),
      ] }),
      // v.6 — chega a notícia: o SENHOR visitou o seu povo, DANDO-LHE PÃO.
      b(6, { q: "o Senhor tinha visitado o seu povo, dando-lhe pão",
        env: { terrain: "field", night: 0.32, glory: 0.56, verdure: 0.3 }, cast: [
        C("mulherComum", -60, "raise", { dy: 0.54, facing: 1, id: "noemi" }),
        C("mulherComum", 60, "stand", { dy: 0.52, facing: -1, id: "rute" }),
        C("mulherComum", 165, "stand", { dy: 0.5, facing: -1, id: "orfa" }),
      ] }),
      // v.7 — saem do lugar, as duas noras com ela, caminhando para Judá.
      b(7, { q: "E, indo elas caminhando", set: "estrada", props: ESTRADA,
        env: { terrain: "field", night: 0.28, glory: 0.44, verdure: 0.3 }, cast: [
        C("mulherComum", -110, "walk", { dy: 0.54, facing: 1, id: "noemi" }),
        C("mulherComum", -10, "walk", { dy: 0.52, facing: 1, id: "rute" }),
        C("mulherComum", 90, "walk", { dy: 0.5, facing: 1, id: "orfa" }),
      ] }),
      // v.8 — NOEMI despede as noras: voltai cada uma à casa de sua mãe. (Noemi fala)
      b(8, { by: "mulherComum", q: "Disse Noemi às suas noras:", cast: [
        C("mulherComum", -110, "point", { dy: 0.54, facing: 1, id: "noemi" }),
        C("mulherComum", 40, "stand", { dy: 0.52, facing: -1, id: "rute" }),
        C("mulherComum", 155, "stand", { dy: 0.5, facing: -1, id: "orfa" }),
      ] }),
      // v.9 — que acheis descanso em casa de marido; e, beijando-as, choraram. (Noemi fala)
      b(9, { by: "mulherComum", env: { night: 0.34, glory: 0.38 }, cast: [
        C("mulherComum", -80, "raise", { dy: 0.54, facing: 1, id: "noemi" }),
        C("mulherComum", 30, "bow", { dy: 0.54, facing: -1, id: "rute" }),
        C("mulherComum", 140, "bow", { dy: 0.52, facing: -1, id: "orfa" }),
      ] }),
      // v.10 — as noras: certamente voltaremos contigo ao teu povo. (Orfa e Rute falam)
      b(10, { by: "mulherComum", q: "E disseram-lhe:", cast: [
        C("mulherComum", 100, "stand", { dy: 0.54, facing: -1, id: "orfa" }),
        C("mulherComum", 10, "stand", { dy: 0.56, facing: -1, id: "rute" }),
        C("mulherComum", -120, "stand", { dy: 0.52, facing: 1, id: "noemi" }),
      ] }),
      // v.11 — Noemi: tenho eu ainda no meu ventre mais filhos? (Noemi fala)
      b(11, { by: "mulherComum", q: "Porém Noemi disse:", cast: [
        C("mulherComum", -120, "raise", { dy: 0.54, facing: 1, id: "noemi" }),
        C("mulherComum", 20, "stand", { dy: 0.54, facing: -1, id: "rute" }),
        C("mulherComum", 130, "stand", { dy: 0.52, facing: -1, id: "orfa" }),
      ] }),
      // v.12 — já mui velha sou para ter marido: não há esperança nesta casa. (Noemi fala)
      b(12, { by: "mulherComum", env: { night: 0.4, glory: 0.3 }, cast: [
        C("mulherComum", -120, "stand", { dy: 0.54, facing: 1, id: "noemi" }),
        C("mulherComum", 20, "stand", { dy: 0.54, facing: -1, id: "rute" }),
        C("mulherComum", 130, "stand", { dy: 0.52, facing: -1, id: "orfa" }),
      ] }),
      // v.13 — a mão do SENHOR se descarregou contra mim: a amargura de Noemi. (Noemi fala)
      b(13, { by: "mulherComum", env: { night: 0.48, glory: 0.24 }, cast: [
        C("mulherComum", -110, "bow", { dy: 0.56, facing: 1, id: "noemi" }),
        C("mulherComum", 30, "bow", { dy: 0.54, facing: -1, id: "rute" }),
        C("mulherComum", 145, "bow", { dy: 0.52, facing: -1, id: "orfa" }),
      ] }),
      // v.14 — o pranto: ORFA beija a sogra e volta; RUTE SE APEGA a ela.
      b(14, { q: "porém Rute se apegou a ela", env: { night: 0.5, glory: 0.28 }, cast: [
        C("mulherComum", -70, "stand", { dy: 0.54, facing: -1, id: "noemi" }),
        C("mulherComum", -5, "kneel", { dy: 0.6, facing: 1, id: "rute" }),
        C("mulherComum", 205, "walk", { dy: 0.44, facing: -1, id: "orfa" }),
      ] }),
      // v.15 — Noemi: eis que voltou tua cunhada ao seu povo e aos seus deuses. (Noemi fala)
      b(15, { by: "mulherComum", q: "Por isso disse Noemi:", cast: [
        C("mulherComum", -70, "point", { dy: 0.54, facing: -1, id: "noemi" }),
        C("mulherComum", -5, "kneel", { dy: 0.6, facing: 1, id: "rute" }),
        C("mulherComum", 275, "walk", { dy: 0.36, facing: -1, id: "orfa" }),
      ] }),
      // v.16 — ⭐ O VOTO DE RUTE: aonde quer que fores irei; o teu Deus é o meu Deus.
      b(16, { by: "mulherComum", q: "Disse, porém, Rute:", set: "voto", props: VOTO,
        env: { terrain: "field", night: 0.3, glory: 0.92, verdure: 0.36 }, cast: [
        C("mulherComum", -30, "raise", { dy: 0.6, facing: 1, id: "rute" }),
        C("mulherComum", -160, "stand", { dy: 0.54, facing: -1, id: "noemi" }),
      ] }),
      // v.17 — onde morreres morrerei eu: só a morte me separará de ti. (Rute fala)
      b(17, { by: "mulherComum", env: { glory: 0.96, night: 0.26 }, cast: [
        C("mulherComum", -30, "kneel", { dy: 0.62, facing: 1, id: "rute" }),
        C("mulherComum", -160, "bow", { dy: 0.54, facing: -1, id: "noemi" }),
      ] }),
      // v.18 — vendo-a resolvida a ir com ela, Noemi deixou de lhe falar.
      b(18, { q: "que de todo estava resolvida a ir com ela", set: "estrada", props: ESTRADA,
        env: { terrain: "field", night: 0.24, glory: 0.6, verdure: 0.34 }, cast: [
        C("mulherComum", -60, "walk", { dy: 0.54, facing: 1, id: "noemi" }),
        C("mulherComum", 25, "walk", { dy: 0.56, facing: 1, id: "rute" }),
      ] }),
      // v.19 — chegam a BELÉM e toda a cidade se comove: "Não é esta Noemi?"
      b(19, { q: "toda a cidade se comoveu por causa delas", set: "belem-porta", props: BELEM_PORTA,
        env: { terrain: "city", night: 0.22, glory: 0.5, verdure: 0.3 }, cast: [
        C("mulherComum", -130, "walk", { dy: 0.56, facing: 1, id: "noemi" }),
        C("mulherComum", -45, "walk", { dy: 0.54, facing: 1, id: "rute" }),
        C("multidao", 155, "stand", { dy: 0.34 }),
      ] }),
      // v.20 — "não me chameis Noemi; chamai-me MARA": a amargura tem nome. (Noemi fala)
      b(20, { by: "mulherComum", q: "Porém ela lhes dizia:",
        env: { night: 0.4, glory: 0.28 }, cast: [
        C("mulherComum", -110, "raise", { dy: 0.56, facing: -1, id: "noemi" }),
        C("mulherComum", -215, "stand", { dy: 0.52, facing: 1, id: "rute" }),
        C("mulherComum", 100, "stand", { dy: 0.54, facing: 1, id: "vizinha-de-belem" }),
        C("mulherComum", 210, "stand", { dy: 0.5, facing: 1, id: "vizinha-de-belem-2" }),
      ] }),
      // v.21 — cheia parti, porém vazia o SENHOR me fez tornar. (Noemi fala)
      b(21, { by: "mulherComum", env: { night: 0.44, glory: 0.24 }, cast: [
        C("mulherComum", -110, "bow", { dy: 0.58, facing: -1, id: "noemi" }),
        C("mulherComum", -215, "stand", { dy: 0.52, facing: 1, id: "rute" }),
        C("mulherComum", 100, "bow", { dy: 0.54, facing: 1, id: "vizinha-de-belem" }),
        C("mulherComum", 210, "stand", { dy: 0.5, facing: 1, id: "vizinha-de-belem-2" }),
      ] }),
      // v.22 — voltaram no PRINCÍPIO DA COLHEITA DAS CEVADAS: a providência começa.
      b(22, { q: "no princípio da colheita das cevadas", set: "belem-ceifa", props: BELEM_CEIFA,
        env: { terrain: "field", night: 0.14, glory: 0.66, verdure: 0.58 }, cast: [
        C("mulherComum", -100, "stand", { dy: 0.56, facing: 1, id: "noemi" }),
        C("mulherComum", -15, "stand", { dy: 0.58, facing: 1, id: "rute" }),
        C("homem", 130, "bow", { dy: 0.5, facing: -1, id: "segador1" }),
        C("homem", 215, "bow", { dy: 0.46, facing: -1, id: "segador2" }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Rt 2
  2: {
    start: { terrain: "field", night: 0.12, glory: 0.6, storm: 0, fire: 0, verdure: 0.6 },
    beats: [
      // v.1 — BOAZ, parente de Elimeleque, homem valente e poderoso.
      b(1, { q: "e era o seu nome Boaz", set: "campo-boaz", props: CAMPO_BOAZ,
        env: { terrain: "field", night: 0.1, glory: 0.62, verdure: 0.62 }, cast: [
        C("homem", -40, "stand", { dy: 0.52, facing: 1, id: "boaz" }),
        C("homem", 105, "bow", { dy: 0.48, facing: -1, id: "segador1" }),
        C("homem", 200, "bow", { dy: 0.44, facing: -1, id: "segador2" }),
      ] }),
      // v.2 — RUTE pede para ir respigar; Noemi: "Vai, minha filha." (Rute fala)
      b(2, { by: "mulherComum", q: "disse a Noemi:", set: "casa-noemi", props: CASA_NOEMI,
        env: { terrain: "city", night: 0.16, glory: 0.5, verdure: 0.28 }, cast: [
        C("mulherComum", -40, "stand", { dy: 0.58, facing: 1, id: "rute" }),
        C("mulherComum", 95, "stand", { dy: 0.54, facing: -1, id: "noemi" }),
      ] }),
      // v.3 — e CAIU-LHE EM SORTE a parte do campo de Boaz: a providência escondida.
      b(3, { q: "e caiu-lhe em sorte uma parte do campo de Boaz", set: "campo-boaz", props: CAMPO_BOAZ,
        env: { terrain: "field", night: 0.1, glory: 0.64, verdure: 0.64 }, cast: [
        C("mulherComum", -60, "kneel", { dy: 0.66, facing: 1, id: "rute" }),
        C("homem", 90, "bow", { dy: 0.5, facing: -1, id: "segador1" }),
        C("homem", 190, "bow", { dy: 0.46, facing: -1, id: "segador2" }),
      ] }),
      // v.4 — Boaz chega de Belém: "O Senhor seja convosco." (Boaz fala)
      b(4, { by: "homem", q: "e disse aos segadores:", env: { glory: 0.72 }, cast: [
        C("homem", -190, "walk", { dy: 0.5, facing: 1, id: "boaz" }),
        C("homem", 55, "raise", { dy: 0.5, facing: -1, id: "segador1" }),
        C("homem", 160, "raise", { dy: 0.46, facing: -1, id: "segador2" }),
        C("mulherComum", -20, "kneel", { dy: 0.68, facing: 1, id: "rute" }),
      ] }),
      // v.5 — Boaz repara na estrangeira: "De quem é esta moça?" (Boaz fala)
      b(5, { by: "homem", q: "Depois disse Boaz a seu moço, que estava posto sobre os segadores:", cast: [
        C("homem", -140, "point", { dy: 0.52, facing: 1, id: "boaz" }),
        C("homem", -30, "stand", { dy: 0.5, facing: -1, id: "moco" }),
        C("mulherComum", 130, "kneel", { dy: 0.66, facing: -1, id: "rute" }),
      ] }),
      // v.6 — o moço responde: é a moabita que voltou com Noemi. (o moço fala)
      b(6, { by: "homem", q: "e disse:", cast: [
        C("homem", -30, "point", { dy: 0.5, facing: 1, id: "moco" }),
        C("homem", -160, "stand", { dy: 0.52, facing: 1, id: "boaz" }),
        C("mulherComum", 130, "kneel", { dy: 0.66, facing: -1, id: "rute" }),
      ] }),
      // v.7 — desde pela manhã está aqui, colhendo entre as gavelas. (o moço fala)
      b(7, { by: "homem", q: "Disse-me ela:", cast: [
        C("homem", -30, "stand", { dy: 0.5, facing: 1, id: "moco" }),
        C("homem", -160, "stand", { dy: 0.52, facing: 1, id: "boaz" }),
        C("mulherComum", 130, "kneel", { dy: 0.66, facing: -1, id: "rute" }),
      ] }),
      // v.8 — Boaz a Rute: fica aqui com as minhas moças. (Boaz fala)
      b(8, { by: "homem", q: "Então disse Boaz a Rute:", env: { glory: 0.74 }, cast: [
        C("homem", -110, "point", { dy: 0.54, facing: 1, id: "boaz" }),
        C("mulherComum", 25, "stand", { dy: 0.62, facing: -1, id: "rute" }),
        C("mulherComum", 165, "bow", { dy: 0.56, facing: -1, id: "moca1" }),
        C("mulherComum", 250, "bow", { dy: 0.5, facing: -1, id: "moca2" }),
      ] }),
      // v.9 — a ÁGUA: tendo sede, vai aos vasos e bebe do que os moços tirarem. (Boaz fala)
      b(9, { by: "homem", env: { glory: 0.76 }, cast: [
        C("homem", -110, "raise", { dy: 0.54, facing: 1, id: "boaz" }),
        C("mulherComum", 25, "stand", { dy: 0.62, facing: -1, id: "rute" }),
        C("homem", 200, "stand", { dy: 0.48, facing: -1, id: "moco" }),
      ] }),
      // v.10 — Rute cai de rosto em terra: por que faças caso de mim, uma estrangeira? (Rute fala)
      b(10, { by: "mulherComum", q: "e disse-lhe:", cast: [
        C("mulherComum", 25, "bow", { dy: 0.68, facing: -1, id: "rute" }),
        C("homem", -110, "stand", { dy: 0.54, facing: 1, id: "boaz" }),
      ] }),
      // v.11 — Boaz: bem se me contou quanto fizeste à tua sogra. (Boaz fala)
      b(11, { by: "homem", q: "e disse-lhe:", env: { glory: 0.78 }, cast: [
        C("homem", -110, "stand", { dy: 0.54, facing: 1, id: "boaz" }),
        C("mulherComum", 25, "kneel", { dy: 0.68, facing: -1, id: "rute" }),
      ] }),
      // v.12 — ⭐ "sob cujas asas te vieste abrigar": o refúgio do Deus de Israel.
      b(12, { by: "homem", q: "sob cujas asas te vieste abrigar",
        props: [
          ...CAMPO_BOAZ,
          { ...P("birds", -70, 1.15, undefined, 0.56), sky: true },
        ],
        env: { terrain: "field", night: 0.08, glory: 0.9, verdure: 0.66 }, cast: [
        C("homem", -110, "raise", { dy: 0.54, facing: 1, id: "boaz" }),
        C("mulherComum", 25, "kneel", { dy: 0.68, facing: -1, id: "rute" }),
      ] }),
      // v.13 — Rute: falaste ao coração da tua serva. (Rute fala)
      b(13, { by: "mulherComum", q: "E disse ela:", env: { glory: 0.8 }, cast: [
        C("mulherComum", 25, "bow", { dy: 0.68, facing: -1, id: "rute" }),
        C("homem", -110, "stand", { dy: 0.54, facing: 1, id: "boaz" }),
      ] }),
      // v.14 — o PÃO MOLHADO NO VINAGRE e o trigo tostado: comeu, fartou-se e sobejou. (Boaz fala)
      b(14, { by: "homem", q: "disse-lhe Boaz:", set: "mesa-segadores", props: MESA_SEGADORES,
        env: { terrain: "field", night: 0.14, glory: 0.72, verdure: 0.6 }, cast: [
        C("homem", -130, "point", { dy: 0.56, facing: 1, id: "boaz" }),
        C("mulherComum", -15, "kneel", { dy: 0.66, facing: -1, id: "rute" }),
        C("homem", 145, "kneel", { dy: 0.6, facing: -1, id: "segador1" }),
        C("homem", 240, "kneel", { dy: 0.54, facing: -1, id: "segador2" }),
      ] }),
      // v.15 — ordem aos moços: até entre as gavelas deixai-a colher. (Boaz fala)
      b(15, { by: "homem", q: "dizendo:", set: "campo-boaz", props: CAMPO_BOAZ,
        env: { terrain: "field", night: 0.12, glory: 0.72, verdure: 0.64 }, cast: [
        C("homem", -140, "point", { dy: 0.54, facing: 1, id: "boaz" }),
        C("homem", -20, "bow", { dy: 0.5, facing: 1, id: "moco" }),
        C("mulherComum", 155, "kneel", { dy: 0.66, facing: -1, id: "rute" }),
      ] }),
      // v.16 — ⭐ os PUNHADOS deixados DE PROPÓSITO: graça disfarçada de descuido. (Boaz fala)
      b(16, { by: "homem", env: { glory: 0.82 }, cast: [
        C("homem", -140, "raise", { dy: 0.54, facing: 1, id: "boaz" }),
        C("homem", -20, "bow", { dy: 0.52, facing: 1, id: "moco" }),
        C("homem", 60, "bow", { dy: 0.5, facing: 1, id: "segador1" }),
        C("mulherComum", 200, "kneel", { dy: 0.66, facing: -1, id: "rute" }),
      ] }),
      // v.17 — apanhou até à tarde e debulhou quase UM EFA de cevada.
      b(17, { q: "e foi quase um efa de cevada", env: { night: 0.34, glory: 0.5, verdure: 0.6 }, cast: [
        C("mulherComum", -20, "kneel", { dy: 0.68, facing: 1, id: "rute" }),
        C("homem", 175, "walk", { dy: 0.48, facing: -1, id: "segador1" }),
      ] }),
      // v.18 — voltou à cidade e a sogra viu o que ela tinha apanhado.
      b(18, { q: "e viu sua sogra o que tinha apanhado", set: "casa-noemi", props: CASA_NOEMI,
        env: { terrain: "city", night: 0.36, glory: 0.5, verdure: 0.26 }, cast: [
        C("mulherComum", -55, "walk", { dy: 0.62, facing: 1, id: "rute" }),
        C("mulherComum", 95, "raise", { dy: 0.56, facing: -1, id: "noemi" }),
      ] }),
      // v.19 — Noemi: onde colheste hoje? "O nome do homem... é Boaz." (Noemi fala)
      b(19, { by: "mulherComum", q: "Então disse-lhe sua sogra:", env: { glory: 0.58 }, cast: [
        C("mulherComum", 95, "point", { dy: 0.56, facing: -1, id: "noemi" }),
        C("mulherComum", -55, "stand", { dy: 0.62, facing: 1, id: "rute" }),
      ] }),
      // v.20 — ⭐ "este homem é nosso parente chegado, um dentre os nossos REMIDORES". (Noemi fala)
      b(20, { by: "mulherComum", q: "Então Noemi disse à sua nora:",
        env: { night: 0.28, glory: 0.82 }, cast: [
        C("mulherComum", 95, "raise", { dy: 0.56, facing: -1, id: "noemi" }),
        C("mulherComum", -55, "stand", { dy: 0.62, facing: 1, id: "rute" }),
      ] }),
      // v.21 — Rute: ele me disse que me ajunte aos seus moços até acabar a sega. (Rute fala)
      b(21, { by: "mulherComum", q: "E disse Rute, a moabita:", cast: [
        C("mulherComum", -55, "point", { dy: 0.62, facing: 1, id: "rute" }),
        C("mulherComum", 95, "stand", { dy: 0.56, facing: -1, id: "noemi" }),
      ] }),
      // v.22 — Noemi: melhor é que saias com as moças dele. (Noemi fala)
      b(22, { by: "mulherComum", q: "E disse Noemi a sua nora:", cast: [
        C("mulherComum", 95, "point", { dy: 0.56, facing: -1, id: "noemi" }),
        C("mulherComum", -55, "stand", { dy: 0.62, facing: 1, id: "rute" }),
      ] }),
      // v.23 — colheu com as moças de Boaz até acabar a sega das cevadas e dos trigos.
      b(23, { q: "até que a sega das cevadas e dos trigos se acabou", set: "campo-boaz", props: CAMPO_BOAZ,
        env: { terrain: "field", night: 0.1, glory: 0.7, verdure: 0.68 }, cast: [
        C("mulherComum", -60, "kneel", { dy: 0.66, facing: 1, id: "rute" }),
        C("mulherComum", 70, "bow", { dy: 0.58, facing: -1, id: "moca1" }),
        C("mulherComum", 180, "bow", { dy: 0.52, facing: -1, id: "moca2" }),
        C("homem", 265, "walk", { dy: 0.46, facing: -1, id: "segador1" }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Rt 3
  3: {
    start: { terrain: "city", night: 0.2, glory: 0.55, storm: 0, fire: 0, verdure: 0.3 },
    beats: [
      // v.1 — Noemi busca DESCANSO para a nora: "para que fiques bem". (Noemi fala)
      b(1, { by: "mulherComum", q: "E disse-lhe Noemi, sua sogra:", set: "casa-noemi", props: CASA_NOEMI,
        env: { terrain: "city", night: 0.22, glory: 0.56, verdure: 0.28 }, cast: [
        C("mulherComum", 85, "stand", { dy: 0.56, facing: -1, id: "noemi" }),
        C("mulherComum", -55, "stand", { dy: 0.6, facing: 1, id: "rute" }),
      ] }),
      // v.2 — "esta noite padejará a cevada na eira": o plano da sogra. (Noemi fala)
      b(2, { by: "mulherComum", q: "Eis que esta noite padejará a cevada na eira.", cast: [
        C("mulherComum", 85, "point", { dy: 0.56, facing: -1, id: "noemi" }),
        C("mulherComum", -55, "stand", { dy: 0.6, facing: 1, id: "rute" }),
      ] }),
      // v.3 — lava-te, unge-te, veste os teus vestidos e desce à eira. (Noemi fala)
      b(3, { by: "mulherComum", env: { night: 0.3, glory: 0.5 }, cast: [
        C("mulherComum", 85, "raise", { dy: 0.56, facing: -1, id: "noemi" }),
        C("mulherComum", -55, "stand", { dy: 0.6, facing: 1, id: "rute" }),
      ] }),
      // v.4 — descobrir-lhe-ás os pés: o pedido silencioso do resgate. (Noemi fala)
      b(4, { by: "mulherComum", cast: [
        C("mulherComum", 85, "point", { dy: 0.56, facing: -1, id: "noemi" }),
        C("mulherComum", -55, "bow", { dy: 0.62, facing: 1, id: "rute" }),
      ] }),
      // v.5 — Rute: "Tudo quanto me disseres, farei." (Rute fala)
      b(5, { by: "mulherComum", q: "E ela lhe disse:", cast: [
        C("mulherComum", -55, "stand", { dy: 0.62, facing: 1, id: "rute" }),
        C("mulherComum", 85, "stand", { dy: 0.56, facing: -1, id: "noemi" }),
      ] }),
      // v.6 — desceu à EIRA e fez conforme tudo o que a sogra ordenara.
      b(6, { q: "Então foi para a eira", set: "eira", props: EIRA,
        env: { terrain: "field", night: 0.6, glory: 0.42, verdure: 0.4 }, cast: [
        C("mulherComum", -140, "walk", { dy: 0.6, facing: 1, id: "rute" }),
      ] }),
      // v.7 — Boaz deita-se ao pé do monte de grãos; ela vem de mansinho.
      b(7, { q: "veio deitar-se ao pé de um monte de grãos",
        env: { night: 0.72, glory: 0.38 }, cast: [
        C("homem", 55, "lie", { dy: 0.5, facing: -1, id: "boaz" }),
        C("mulherComum", -70, "kneel", { dy: 0.66, facing: 1, id: "rute" }),
      ] }),
      // v.8 — à MEIA-NOITE ele estremece: uma mulher jazia a seus pés.
      b(8, { q: "e eis que uma mulher jazia a seus pés",
        env: { night: 0.8, glory: 0.44 }, cast: [
        C("homem", 55, "stand", { dy: 0.5, facing: -1, id: "boaz" }),
        C("mulherComum", -60, "lie", { dy: 0.66, facing: 1, id: "rute" }),
      ] }),
      // v.9 — ⭐ "estende pois tua capa sobre a tua serva, porque tu és o remidor". (Rute fala)
      b(9, { by: "mulherComum", q: "E ela disse:", env: { night: 0.7, glory: 0.86 }, cast: [
        C("mulherComum", -60, "kneel", { dy: 0.68, facing: 1, id: "rute" }),
        C("homem", 55, "stand", { dy: 0.5, facing: -1, id: "boaz" }),
      ] }),
      // v.10 — Boaz: bendita sejas tu do SENHOR, minha filha. (Boaz fala)
      b(10, { by: "homem", q: "E disse ele:", env: { glory: 0.8 }, cast: [
        C("homem", 55, "raise", { dy: 0.5, facing: -1, id: "boaz" }),
        C("mulherComum", -60, "kneel", { dy: 0.68, facing: 1, id: "rute" }),
      ] }),
      // v.11 — toda a cidade sabe que és MULHER VIRTUOSA. (Boaz fala)
      b(11, { by: "homem", q: "és mulher virtuosa", env: { glory: 0.84 }, cast: [
        C("homem", 55, "stand", { dy: 0.5, facing: -1, id: "boaz" }),
        C("mulherComum", -60, "stand", { dy: 0.66, facing: 1, id: "rute" }),
      ] }),
      // v.12 — mas há um REMIDOR MAIS CHEGADO do que eu: o nó do enredo. (Boaz fala)
      b(12, { by: "homem", q: "mas ainda outro remidor há mais chegado do que eu",
        env: { night: 0.74, glory: 0.6 }, cast: [
        C("homem", 55, "point", { dy: 0.5, facing: -1, id: "boaz" }),
        C("mulherComum", -60, "stand", { dy: 0.66, facing: 1, id: "rute" }),
      ] }),
      // v.13 — "vive o Senhor, que eu te redimirei": o juramento na eira. (Boaz fala)
      b(13, { by: "homem", env: { glory: 0.82 }, cast: [
        C("homem", 55, "raise", { dy: 0.5, facing: -1, id: "boaz" }),
        C("mulherComum", -60, "kneel", { dy: 0.68, facing: 1, id: "rute" }),
      ] }),
      // v.14 — levantou-se antes que um pudesse conhecer o outro: honra guardada.
      b(14, { q: "Não se saiba que alguma mulher veio à eira.",
        env: { night: 0.52, glory: 0.56 }, cast: [
        C("mulherComum", -60, "stand", { dy: 0.64, facing: 1, id: "rute" }),
        C("homem", 55, "stand", { dy: 0.5, facing: -1, id: "boaz" }),
      ] }),
      // v.15 — as SEIS MEDIDAS de cevada na capa: penhor do resgate. (Boaz fala)
      b(15, { by: "homem", q: "Disse mais:", env: { night: 0.36, glory: 0.72 }, cast: [
        C("homem", 55, "point", { dy: 0.5, facing: -1, id: "boaz" }),
        C("mulherComum", -60, "stand", { dy: 0.64, facing: 1, id: "rute" }),
      ] }),
      // v.16 — Noemi: "Como foi, minha filha?" (Noemi fala)
      b(16, { by: "mulherComum", q: "que lhe disse:", set: "casa-noemi", props: CASA_NOEMI,
        env: { terrain: "city", night: 0.24, glory: 0.6, verdure: 0.28 }, cast: [
        C("mulherComum", 85, "point", { dy: 0.56, facing: -1, id: "noemi" }),
        C("mulherComum", -55, "walk", { dy: 0.62, facing: 1, id: "rute" }),
      ] }),
      // v.17 — "não vás vazia à tua sogra": a que voltou vazia recebe cheia. (Rute fala)
      b(17, { by: "mulherComum", q: "Disse mais:", env: { glory: 0.74 }, cast: [
        C("mulherComum", -55, "raise", { dy: 0.62, facing: 1, id: "rute" }),
        C("mulherComum", 85, "stand", { dy: 0.56, facing: -1, id: "noemi" }),
      ] }),
      // v.18 — Noemi: espera, porque aquele homem não descansará até concluir. (Noemi fala)
      b(18, { by: "mulherComum", q: "Então disse ela:", env: { glory: 0.68 }, cast: [
        C("mulherComum", 85, "stand", { dy: 0.56, facing: -1, id: "noemi" }),
        C("mulherComum", -55, "stand", { dy: 0.62, facing: 1, id: "rute" }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Rt 4
  4: {
    start: { terrain: "city", night: 0.12, glory: 0.62, storm: 0, fire: 0, verdure: 0.28 },
    beats: [
      // v.1 — a PORTA DA CIDADE: Boaz chama o remidor que ia passando. (Boaz fala)
      b(1, { by: "homem", q: "e disse-lhe:", set: "porta-cidade", props: PORTA_CIDADE,
        env: { terrain: "city", night: 0.12, glory: 0.62, verdure: 0.26 }, cast: [
        C("homem", -95, "point", { dy: 0.54, facing: 1, id: "boaz" }),
        C("homem", 90, "walk", { dy: 0.52, facing: -1, id: "goel" }),
      ] }),
      // v.2 — DEZ ANCIÃOS da cidade se assentam: o tribunal de Israel formado.
      b(2, { by: "homem", q: "e disse:", env: { glory: 0.66 }, cast: [
        C("homem", -95, "raise", { dy: 0.54, facing: 1, id: "boaz" }),
        C("homem", 75, "stand", { dy: 0.54, facing: -1, id: "goel" }),
        C("anciao", -300, "stand", { dy: 0.36, facing: 1, id: "anciao1" }),
        C("anciao", -225, "stand", { dy: 0.34, facing: 1, id: "anciao2" }),
        C("anciao", -160, "stand", { dy: 0.32, facing: 1, id: "anciao3" }),
        C("anciao", 175, "stand", { dy: 0.32, facing: -1, id: "anciao4" }),
        C("anciao", 245, "stand", { dy: 0.34, facing: -1, id: "anciao5" }),
        C("anciao", 315, "stand", { dy: 0.36, facing: -1, id: "anciao6" }),
      ] }),
      // v.3 — Boaz expõe o caso: a parte da terra de Elimeleque, Noemi está vendendo. (Boaz fala)
      b(3, { by: "homem", q: "Então disse ao remidor:", cast: [
        C("homem", -95, "point", { dy: 0.54, facing: 1, id: "boaz" }),
        C("homem", 75, "stand", { dy: 0.54, facing: -1, id: "goel" }),
        C("anciao", -260, "stand", { dy: 0.34, facing: 1, id: "anciao1" }),
        C("anciao", -180, "stand", { dy: 0.32, facing: 1, id: "anciao2" }),
        C("anciao", 210, "stand", { dy: 0.32, facing: -1, id: "anciao4" }),
        C("anciao", 290, "stand", { dy: 0.34, facing: -1, id: "anciao5" }),
      ] }),
      // v.4 — "redime-a"; e o remidor: "Eu a redimirei." (Boaz fala)
      b(4, { by: "homem", q: "e dizer-te:", cast: [
        C("homem", -95, "raise", { dy: 0.54, facing: 1, id: "boaz" }),
        C("homem", 75, "raise", { dy: 0.54, facing: -1, id: "goel" }),
        C("anciao", -260, "stand", { dy: 0.34, facing: 1, id: "anciao1" }),
        C("anciao", -180, "stand", { dy: 0.32, facing: 1, id: "anciao2" }),
        C("anciao", 210, "stand", { dy: 0.32, facing: -1, id: "anciao4" }),
        C("anciao", 290, "stand", { dy: 0.34, facing: -1, id: "anciao5" }),
      ] }),
      // v.5 — com a terra vem RUTE, a moabita: suscitar o nome do falecido. (Boaz fala)
      b(5, { by: "homem", q: "Disse porém Boaz:", env: { glory: 0.72 }, cast: [
        C("homem", -95, "point", { dy: 0.54, facing: 1, id: "boaz" }),
        C("homem", 75, "stand", { dy: 0.54, facing: -1, id: "goel" }),
        C("mulherComum", 235, "stand", { dy: 0.4, facing: -1, id: "rute" }),
        C("anciao", -270, "stand", { dy: 0.34, facing: 1, id: "anciao1" }),
        C("anciao", -190, "stand", { dy: 0.32, facing: 1, id: "anciao2" }),
      ] }),
      // v.6 — o remidor RECUSA: "para que não prejudique a minha herança". (o remidor fala)
      b(6, { by: "homem", q: "Então disse o remidor:", env: { night: 0.24, glory: 0.5 }, cast: [
        C("homem", 75, "bow", { dy: 0.54, facing: -1, id: "goel" }),
        C("homem", -95, "stand", { dy: 0.54, facing: 1, id: "boaz" }),
        C("anciao", -270, "stand", { dy: 0.34, facing: 1, id: "anciao1" }),
        C("anciao", -190, "stand", { dy: 0.32, facing: 1, id: "anciao2" }),
        C("anciao", 235, "stand", { dy: 0.32, facing: -1, id: "anciao4" }),
        C("anciao", 305, "stand", { dy: 0.34, facing: -1, id: "anciao5" }),
      ] }),
      // v.7 — o costume antigo: descalçar o SAPATO e dá-lo ao próximo, por testemunho.
      b(7, { q: "o homem descalçava o sapato e o dava ao seu próximo",
        env: { night: 0.18, glory: 0.58 }, cast: [
        C("homem", 75, "kneel", { dy: 0.58, facing: -1, id: "goel" }),
        C("homem", -95, "stand", { dy: 0.54, facing: 1, id: "boaz" }),
        C("anciao", -270, "stand", { dy: 0.34, facing: 1, id: "anciao1" }),
        C("anciao", 235, "stand", { dy: 0.32, facing: -1, id: "anciao4" }),
      ] }),
      // v.8 — "Toma-a para ti." E DESCALÇOU O SAPATO. (o remidor fala)
      b(8, { by: "homem", q: "Disse, pois, o remidor a Boaz:", env: { glory: 0.66 }, cast: [
        C("homem", 75, "point", { dy: 0.56, facing: -1, id: "goel" }),
        C("homem", -95, "raise", { dy: 0.54, facing: 1, id: "boaz" }),
        C("anciao", -270, "stand", { dy: 0.34, facing: 1, id: "anciao1" }),
        C("anciao", -190, "stand", { dy: 0.32, facing: 1, id: "anciao2" }),
        C("anciao", 235, "stand", { dy: 0.32, facing: -1, id: "anciao4" }),
        C("anciao", 305, "stand", { dy: 0.34, facing: -1, id: "anciao5" }),
      ] }),
      // v.9 — Boaz aos anciãos e ao povo: sois hoje testemunhas. (Boaz fala)
      b(9, { by: "homem", q: "Então Boaz disse aos anciãos e a todo o povo:",
        env: { glory: 0.78 }, cast: [
        C("homem", -95, "raise", { dy: 0.56, facing: 1, id: "boaz" }),
        C("anciao", -280, "stand", { dy: 0.34, facing: 1, id: "anciao1" }),
        C("anciao", -200, "stand", { dy: 0.32, facing: 1, id: "anciao2" }),
        C("anciao", 210, "stand", { dy: 0.32, facing: -1, id: "anciao4" }),
        C("anciao", 285, "stand", { dy: 0.34, facing: -1, id: "anciao5" }),
        C("multidao", 70, "stand", { dy: 0.26 }),
      ] }),
      // v.10 — ⭐ "tomo por mulher a Rute, a moabita": o RESGATE declarado. (Boaz fala)
      b(10, { by: "homem", q: "disto sois hoje testemunhas", env: { glory: 0.86 }, cast: [
        C("homem", -95, "raise", { dy: 0.56, facing: 1, id: "boaz" }),
        C("mulherComum", 5, "stand", { dy: 0.5, facing: 1, id: "rute" }),
        C("anciao", -280, "stand", { dy: 0.34, facing: 1, id: "anciao1" }),
        C("anciao", -200, "stand", { dy: 0.32, facing: 1, id: "anciao2" }),
        C("anciao", 210, "stand", { dy: 0.32, facing: -1, id: "anciao4" }),
        C("anciao", 285, "stand", { dy: 0.34, facing: -1, id: "anciao5" }),
        C("multidao", 110, "stand", { dy: 0.24 }),
      ] }),
      // v.11 — a bênção da porta: como RAQUEL e LIA; faze-te nome em Belém. (os anciãos falam)
      b(11, { by: "anciao", q: "disseram:", env: { glory: 0.88 }, cast: [
        C("anciao", -230, "raise", { dy: 0.36, facing: 1, id: "anciao1" }),
        C("anciao", -155, "raise", { dy: 0.34, facing: 1, id: "anciao2" }),
        C("anciao", 195, "raise", { dy: 0.34, facing: -1, id: "anciao4" }),
        C("anciao", 270, "raise", { dy: 0.36, facing: -1, id: "anciao5" }),
        C("homem", -60, "stand", { dy: 0.56, facing: 1, id: "boaz" }),
        C("mulherComum", 45, "stand", { dy: 0.54, facing: -1, id: "rute" }),
        C("multidao", 120, "raise", { dy: 0.24 }),
      ] }),
      // v.12 — como a casa de PEREZ, pela descendência que o SENHOR te der. (os anciãos falam)
      b(12, { by: "anciao", q: "pela descendência que o Senhor te der desta moça",
        env: { glory: 0.9 }, cast: [
        C("anciao", -230, "raise", { dy: 0.36, facing: 1, id: "anciao1" }),
        C("anciao", -155, "stand", { dy: 0.34, facing: 1, id: "anciao2" }),
        C("anciao", 195, "stand", { dy: 0.34, facing: -1, id: "anciao4" }),
        C("anciao", 270, "raise", { dy: 0.36, facing: -1, id: "anciao5" }),
        C("homem", -60, "stand", { dy: 0.56, facing: 1, id: "boaz" }),
        C("mulherComum", 45, "stand", { dy: 0.54, facing: -1, id: "rute" }),
        C("multidao", 120, "raise", { dy: 0.24 }),
      ] }),
      // v.13 — Boaz toma Rute por mulher; o SENHOR lhe fez conceber: nasce um filho.
      b(13, { q: "e o Senhor lhe fez conceber, e deu à luz um filho", set: "casa-boaz", props: CASA_BOAZ,
        env: { terrain: "field", night: 0.1, glory: 0.9, verdure: 0.6 }, cast: [
        C("homem", -120, "stand", { dy: 0.54, facing: 1, id: "boaz" }),
        C("mulherComum", 0, "kneel", { dy: 0.62, facing: -1, id: "rute" }),
        C("mulherComum", 160, "stand", { dy: 0.5, facing: -1, id: "noemi" }),
      ] }),
      // v.14 — as mulheres a Noemi: bendito o SENHOR, que não te deixou sem REMIDOR. (as vizinhas falam)
      b(14, { by: "mulherComum", q: "Então as mulheres disseram a Noemi:", cast: [
        C("mulherComum", 130, "raise", { dy: 0.52, facing: -1, id: "vizinha1" }),
        C("mulherComum", 235, "raise", { dy: 0.46, facing: -1, id: "vizinha2" }),
        C("mulherComum", -30, "stand", { dy: 0.6, facing: 1, id: "noemi" }),
        C("mulherComum", -155, "kneel", { dy: 0.58, facing: 1, id: "rute" }),
      ] }),
      // v.15 — a nora que te ama é melhor do que sete filhos. (as vizinhas falam)
      b(15, { by: "mulherComum", q: "e ela te é melhor do que sete filhos", env: { glory: 0.92 }, cast: [
        C("mulherComum", 130, "point", { dy: 0.52, facing: -1, id: "vizinha1" }),
        C("mulherComum", 235, "raise", { dy: 0.46, facing: -1, id: "vizinha2" }),
        C("mulherComum", -30, "stand", { dy: 0.6, facing: 1, id: "noemi" }),
        C("mulherComum", -155, "stand", { dy: 0.58, facing: 1, id: "rute" }),
      ] }),
      // v.16 — ⭐ NOEMI toma o menino no colo: a que voltou vazia está cheia.
      b(16, { q: "e o pôs no seu colo, e foi sua ama", env: { glory: 0.94, night: 0.08 }, cast: [
        C("mulherComum", -30, "kneel", { dy: 0.64, facing: 1, id: "noemi" }),
        C("mulherComum", -160, "stand", { dy: 0.56, facing: 1, id: "rute" }),
        C("homem", 120, "stand", { dy: 0.5, facing: -1, id: "boaz" }),
        C("mulherComum", 245, "stand", { dy: 0.44, facing: -1, id: "vizinha1" }),
      ] }),
      // v.17 — OBEDE, pai de Jessé, PAI DE DAVI: a linhagem do Messias. (as vizinhas falam)
      b(17, { by: "mulherComum", q: "dizendo:", set: "linhagem", props: LINHAGEM,
        env: { terrain: "field", night: 0.2, glory: 0.96, verdure: 0.55 }, cast: [
        C("mulherComum", 150, "raise", { dy: 0.5, facing: -1, id: "vizinha1" }),
        C("mulherComum", 250, "raise", { dy: 0.44, facing: -1, id: "vizinha2" }),
        C("mulherComum", -40, "kneel", { dy: 0.64, facing: 1, id: "noemi" }),
        C("mulherComum", -160, "stand", { dy: 0.56, facing: 1, id: "rute" }),
        C("homem", 40, "stand", { dy: 0.52, facing: -1, id: "boaz" }),
      ] }),
      // v.18 — as gerações de PEREZ: Perez gerou a Hezrom.
      b(18, { q: "Perez gerou a Hezrom", env: { glory: 0.9, night: 0.22 }, cast: [
        C("patriarca", -170, "stand", { dy: 0.5, facing: 1, id: "perez" }),
        C("patriarca", -40, "stand", { dy: 0.48, facing: 1, id: "hezrom" }),
      ] }),
      // v.19 — Hezrom gerou a Rão, e Rão a Aminadabe.
      b(19, { q: "e Rão gerou a Aminadabe", env: { glory: 0.91 }, cast: [
        C("patriarca", -170, "stand", { dy: 0.5, facing: 1, id: "hezrom" }),
        C("patriarca", -40, "stand", { dy: 0.48, facing: 1, id: "rao" }),
        C("patriarca", 90, "stand", { dy: 0.46, facing: 1, id: "aminadabe" }),
      ] }),
      // v.20 — Aminadabe gerou a Naassom, e Naassom a Salmom.
      b(20, { q: "e Naassom gerou a Salmom", env: { glory: 0.92 }, cast: [
        C("patriarca", -170, "stand", { dy: 0.5, facing: 1, id: "aminadabe" }),
        C("patriarca", -40, "stand", { dy: 0.48, facing: 1, id: "naassom" }),
        C("patriarca", 90, "stand", { dy: 0.46, facing: 1, id: "salmom" }),
      ] }),
      // v.21 — Salmom gerou a BOAZ, e Boaz gerou a OBEDE (o filho de Rute).
      b(21, { q: "E Salmom gerou a Boaz, e Boaz gerou a Obede", env: { glory: 0.95 }, cast: [
        C("patriarca", -190, "stand", { dy: 0.5, facing: 1, id: "salmom" }),
        C("homem", -60, "stand", { dy: 0.52, facing: 1, id: "boaz" }),
        C("mulherComum", 40, "stand", { dy: 0.54, facing: 1, id: "rute" }),
        C("homem", 160, "stand", { dy: 0.46, facing: 1, id: "obede" }),
      ] }),
      // v.22 — ⭐ e Jessé gerou a DAVI: a moabita redimida na linhagem do Cristo (Mt 1:5).
      b(22, { q: "e Jessé gerou a Davi", env: { terrain: "field", glory: 1, night: 0.24, verdure: 0.6 }, cast: [
        C("homem", -200, "stand", { dy: 0.48, facing: 1, id: "obede" }),
        C("patriarca", -80, "stand", { dy: 0.5, facing: 1, id: "jesse" }),
        C("rei", 70, "stand", { dy: 0.56, facing: -1, id: "davi", scale: 1.15 }),
        C("multidao", 220, "raise", { dy: 0.26 }),
      ] }),
    ],
  },
};
