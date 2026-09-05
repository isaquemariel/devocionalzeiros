// ============================================================================
// NÚMEROS 21–22 — CENA VIVA. A SERPENTE DE BRONZE; a JUMENTA de Balaão.
//
// Nm 21 — SERPENTES E CURA: o povo murmura de novo, e o Senhor manda entre eles
// SERPENTES ARDENTES que picam e matam. Arrependido o povo, Moisés ora, e Deus
// manda fazer uma SERPENTE DE BRONZE sobre uma HASTE: todo o que, picado,
// OLHAR para ela, VIVE — o juízo mortal das serpentes vivas contra a cura de
// quem levanta os olhos para a haste (figura da cruz). Segue o CÂNTICO DO POÇO
// ("Brota, ó poço!") e as VITÓRIAS sobre SIOM, rei dos amorreus, e OGUE, rei
// de Basã.
//
// Nm 22 — BALAQUE E BALAÃO: Balaque, rei de Moabe, temendo Israel, manda chamar
// o adivinho BALAÃO para amaldiçoar o povo. Deus proíbe, depois permite ir sob
// condição, mas o caminho de Balaão é perverso. No caminho, a JUMENTA de Balaão
// VÊ o ANJO DO SENHOR com a ESPADA DESEMBAINHADA e se desvia três vezes; Deus
// abre a boca da jumenta, que FALA, e enfim abre os olhos de Balaão, que vê o
// anjo e se prostra.
//
// A VOZ DE DEUS (regra do projeto): quando Deus fala a Moisés/Balaão sem
// mediador visível (ordem, oráculo noturno), `by: "deus"` com glória. Quando
// fala pelo ANJO DO SENHOR no caminho, o mediador é VISÍVEL: `by: "anjo"`, a
// figura luminosa com a espada em cena. A jumenta que fala é o mediador do
// prodígio: `by: "rebanho"`, o balão saindo do animal.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const dv = (v: number, extra: Partial<StageBeat> = {}) => b(v, { by: "deus", ...extra });

// Cenário base do deserto a caminho de Edom/Moabe.
const DESERTO: StagePropSpec[] = [
  P("palm", -320, 1.05, undefined, 0.14),
  P("rock", 300, 1.1, undefined, 0.3),
  P("grass", -60, 0.8, undefined, 0.82),
  P("grass", 80, 0.76, undefined, 0.74),
  P("well", 320, 1.0, undefined, 0.5),
];
// AS SERPENTES ARDENTES no chão do arraial — o juízo mordendo o povo.
const SERPENTES: StagePropSpec[] = [
  { ...P("clouds", -20, 1.5, undefined, 0.8), sky: true }, // céu carregado do juízo
  P("serpent", -150, 1.0, undefined, 0.7),
  P("serpent", 60, 1.05, undefined, 0.8),
  P("serpent", 210, 0.95, undefined, 0.64),
  P("rock", 300, 1.1, undefined, 0.3),
  P("grass", -260, 0.7, undefined, 0.5),
];
// A SERPENTE DE BRONZE na haste, central e elevada — a cura ao olhar.
const HASTE: StagePropSpec[] = [
  { ...P("bronzeSerpent", 0, 1.35, undefined, 0.34), tag: "serpente-bronze" },
  P("serpent", -250, 0.85, undefined, 0.8),
  P("serpent", 250, 0.85, undefined, 0.78),
  P("rock", 320, 1.05, undefined, 0.3),
];
// O POÇO — o cântico "Brota, ó poço!".
const POCO: StagePropSpec[] = [
  { ...P("well", 0, 1.3, undefined, 0.42), tag: "poco-de-beer" },
  P("palm", -300, 1.05, undefined, 0.14),
  P("grass", -80, 0.8, undefined, 0.82),
  P("grass", 120, 0.78, undefined, 0.74),
];
// AS GUERRAS — cidades dos amorreus e de Basã, torres tomadas.
const GUERRA: StagePropSpec[] = [
  P("tower", -120, 1.2, undefined, 0.28),
  P("tower", 140, 1.15, undefined, 0.34),
  P("rock", 300, 1.1, undefined, 0.3),
  P("grass", -40, 0.76, undefined, 0.78),
];
// CAMPINAS DE MOABE, além do Jordão — o arraial de Israel na planície (Nm 22).
const MOABE: StagePropSpec[] = [
  P("river", 0, 1.4, undefined, 0.86),
  P("tent", -220, 1.1, undefined, 0.2),
  P("tent", 210, 1.05, undefined, 0.24),
  P("palm", -320, 1.05, undefined, 0.14),
  P("grass", 80, 0.78, undefined, 0.68),
];
// O CAMINHO ENTRE AS VINHAS — onde o Anjo do SENHOR barra a jumenta.
const CAMINHO: StagePropSpec[] = [
  P("grapes", -300, 1.0, undefined, 0.24),
  P("grapes", 300, 1.0, undefined, 0.28),
  P("rock", 250, 1.0, undefined, 0.6),
  // a ESPADA DESEMBAINHADA do Anjo do SENHOR barrando o caminho (Nm 22:23,31)
  P("flamingSword", 185, 0.85, undefined, 0.42),
  P("grass", -80, 0.78, undefined, 0.8),
  P("grass", 90, 0.76, undefined, 0.72),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Nm 21
  21: {
    start: { terrain: "desert", night: 0.12, glory: 0.55, storm: 0, fire: 0, verdure: 0.18 },
    beats: [
      b(1, { props: DESERTO, env: { terrain: "desert", glory: 0.5, night: 0.15, verdure: 0.18 }, cast: [ // o cananeu de Arade peleja contra Israel
        C("rei", 150, "stand", { dy: 0.5, facing: -1, id: "arade" }),
        C("multidao", -140, "walk", { dy: 0.46 }),
      ] }),
      b(2, { q: "destruirei totalmente as suas cidades", cast: [                    // Israel faz voto ao Senhor
        C("multidao", -120, "raise", { dy: 0.48 }),
      ] }),
      b(3, { q: "chamou Hormá", env: { glory: 0.58 } }),                            // o Senhor entrega os cananeus; o lugar se chama Hormá
      b(4, { q: "a alma do povo angustiou-se", env: { glory: 0.42, verdure: 0.12 }, cast: [ // rodeando Edom, a alma do povo angustia-se
        C("multidao", 0, "walk", { dy: 0.5 }),
        C("moises", -170, "walk", { dy: 0.5, facing: 1 }),
      ] }),
      b(5, { q: "deste pão tão vil", cast: [                                        // o povo fala contra Deus e contra Moisés
        C("multidao", 60, "point", { dy: 0.5, facing: -1 }),
        C("moises", -160, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      // v.6 — AS SERPENTES ARDENTES: o juízo mordendo o povo.
      b(6, { q: "serpentes ardentes, que picaram o povo", set: "serpentes", props: SERPENTES,
        env: { terrain: "desert", glory: 0.08, night: 0.6, storm: 0.15, fire: 0.15, verdure: 0.1 }, cast: [
        C("homem", -120, "lie", { dy: 0.54, id: "ferido1" }),
        C("mulherComum", -40, "bow", { dy: 0.5, id: "ferido2" }),
        C("homem", 200, "lie", { dy: 0.52, id: "ferido3" }),
      ] }),
      b(7, { q: "Então Moisés orou pelo povo", env: { glory: 0.2, night: 0.4 }, cast: [ // o povo confessa; Moisés ora ao Senhor
        C("moises", -40, "kneel", { dy: 0.5, facing: 1, glow: 0.15 }),
        C("multidao", 140, "bow", { dy: 0.62 }),
      ] }),
      // v.8 — a ORDEM: faze a serpente e põe-na sobre a haste; quem olhar viverá.
      dv(8, { q: "E disse o Senhor a Moisés:", env: { glory: 0.62, night: 0.4 } }),
      // v.9 — A SERPENTE DE BRONZE: o ícone. Quem, picado, OLHA para a haste, VIVE.
      b(9, { q: "olhava para a serpente de metal, vivia", set: "haste", props: HASTE,
        env: { terrain: "desert", glory: 0.7, night: 0.25, fire: 0.05, verdure: 0.12 }, cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1, glow: 0.3 }),
        C("multidao", 130, "raise", { dy: 0.56, facing: -1 }),
        C("homem", 210, "kneel", { dy: 0.66, facing: -1, id: "curado" }),
      ] }),
      b(10, { props: DESERTO, env: { terrain: "desert", glory: 0.55, night: 0.12, verdure: 0.18 }, cast: [ // partem e alojam-se em Obote
        C("multidao", 0, "walk", { dy: 0.5 }),
      ] }),
      // A MARCHA, ETAPA POR ETAPA (v.11-15). Cada alojamento é outra paisagem:
      // os outeiros ao nascente do sol, o ribeiro de Zerede, o termo de Arnom,
      // o livro das guerras do SENHOR e a corrente que desce para Ar.
      b(11, { q: "nos outeiros de Ije-Abarim", set: "ije-abarim", props: [          // os outeiros defronte de Moabe, AO NASCENTE DO SOL
        { ...P("sun", 240, 1.0, undefined, 0.18), sky: true },
        P("rock", -250, 1.3, undefined, 0.24),
        P("rock", -70, 1.15, undefined, 0.34),
        P("rock", 90, 1.0, undefined, 0.44),
        P("grass", 300, 0.78, undefined, 0.78),
      ], env: { terrain: "desert", glory: 0.6, night: 0.3, verdure: 0.14 }, cast: [
        C("multidao", -30, "walk", { dy: 0.56 }),
      ] }),
      b(12, { q: "junto ao ribeiro de Zerede", set: "zerede", props: [              // o RIBEIRO de Zerede, e a verdura das suas margens
        P("river", -20, 1.35, undefined, 0.82),
        P("palm", -300, 1.1, undefined, 0.16),
        P("tree", 280, 1.1, undefined, 0.22),
        P("grass", 120, 0.82, undefined, 0.6),
        P("rock", -160, 0.85, undefined, 0.46),
      ], env: { terrain: "field", glory: 0.6, night: 0.12, verdure: 0.62 }, cast: [
        C("multidao", 60, "kneel", { dy: 0.5 }),
      ] }),
      b(13, { q: "porque Arnom é o termo de Moabe, entre Moabe e os amorreus", set: "arnom", props: [ // ARNOM: o TERMO entre Moabe e os amorreus
        P("rock", 0, 1.4, undefined, 0.5),
        P("tower", -230, 1.15, undefined, 0.26),
        P("tower", 235, 1.1, undefined, 0.28),
        P("river", 20, 1.2, undefined, 0.88),
        P("grass", -110, 0.78, undefined, 0.7),
      ], env: { terrain: "desert", glory: 0.52, night: 0.18, verdure: 0.24 }, cast: [
        C("homem", -140, "point", { dy: 0.6, facing: -1, id: "guerreiro" }),
      ] }),
      b(14, { q: "O que fiz no Mar Vermelho e nos ribeiros de Arnom", set: "livro-das-guerras", props: [ // o LIVRO DAS GUERRAS DO SENHOR, e o Mar Vermelho lembrado
        P("scroll", -170, 1.2, undefined, 0.58),
        { ...P("river", 100, 1.5, undefined, 0.84), tag: "mar-vermelho" },
        P("rock", 300, 1.0, undefined, 0.36),
        P("grass", -300, 0.78, undefined, 0.76),
      ], env: { terrain: "desert", glory: 0.74, night: 0.14, water: 0.7, verdure: 0.2 }, cast: [
        C("moises", -60, "raise", { dy: 0.56, facing: -1, glow: 0.22 }),
      ] }),
      b(15, { q: "se encosta aos termos de Moabe", set: "corrente-de-ar", props: [   // a corrente que DESCE para Ar e se encosta ao termo de Moabe
        P("river", -60, 1.45, undefined, 0.78),
        P("tent", 210, 1.1, undefined, 0.3),
        P("tent", 300, 0.95, undefined, 0.4),
        P("rock", -280, 1.2, undefined, 0.22),
        P("grass", 60, 0.8, undefined, 0.66),
      ], env: { terrain: "desert", glory: 0.56, night: 0.14, water: 0.5, verdure: 0.34 }, cast: [
        C("multidao", -170, "walk", { scale: 0.9, dy: 0.52 }),
      ] }),
      // v.16-18 — O CÂNTICO DO POÇO.
      b(16, { q: "Ajunta o povo e lhe darei água", set: "poco", props: POCO,
        env: { water: 0, terrain: "desert", glory: 0.62, night: 0.1, verdure: 0.3 }, cast: [
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "stand", { dy: 0.5 }),
      ] }),
      b(17, { q: "Brota, ó poço", env: { glory: 0.66, verdure: 0.34 }, cast: [       // Israel canta: "Brota, ó poço!"
        C("multidao", -40, "raise", { dy: 0.52 }),
        C("multidao", 140, "raise", { dy: 0.46, id: "cantores" }),
      ] }),
      b(18), b(19), b(20),                                                          // do poço à marcha rumo ao campo de Moabe
      b(21, { set: "guerra", props: GUERRA, env: { water: 0, terrain: "desert", glory: 0.5, night: 0.15, verdure: 0.15 }, cast: [ // mensageiros a Siom, rei dos amorreus
        C("multidao", -140, "walk", { dy: 0.5, facing: 1 }),
        C("rei", 160, "stand", { dy: 0.48, facing: -1, id: "siom" }),
      ] }),
      b(22),                                                                        // "deixa-me passar pela tua terra"
      b(23, { q: "pelejou contra Israel", env: { glory: 0.38, night: 0.25, storm: 0.1 }, cast: [ // Siom recusa e peleja contra Israel
        C("rei", 150, "stand", { dy: 0.48, facing: -1, id: "siom" }),
        C("homem", -120, "stand", { dy: 0.5, facing: 1, id: "guerreiro" }),
      ] }),
      b(24, { q: "o feriu ao fio da espada", env: { glory: 0.42, night: 0.2 }, cast: [ // Israel fere Siom ao fio da espada e toma sua terra
        C("rei", 150, "lie", { dy: 0.6, id: "siom" }),
        C("homem", -110, "raise", { dy: 0.5, facing: 1, id: "guerreiro" }),
      ] }),
      // HESBOM (v.25-32): a cidade tomada, a sua história, o provérbio dos
      // poetas e o fogo que dela saíra sobre Moabe — e o fim, com Israel
      // habitando na terra dos amorreus.
      b(25, { q: "habitou em todas elas, em Hesbom e em todas as suas aldeias", set: "hesbom", props: [ // Israel TOMA e HABITA as cidades dos amorreus
        P("tower", -170, 1.3, undefined, 0.24),
        P("tower", 60, 1.2, undefined, 0.3),
        P("church", 235, 1.1, undefined, 0.36),
        P("tent", -300, 1.0, undefined, 0.46),
        P("grass", 150, 0.8, undefined, 0.8),
      ], env: { water: 0, terrain: "city", glory: 0.56, night: 0.14, storm: 0, verdure: 0.34 }, cast: [
        C("multidao", -60, "stand", { dy: 0.56 }),
      ] }),
      b(26, { q: "Hesbom era cidade de Siom, rei dos amorreus", env: { glory: 0.44, night: 0.3, storm: 0.1 }, cast: [ // a história atrás da cidade: Siom a tomara ao rei de Moabe
        C("rei", 90, "stand", { dy: 0.56, facing: -1, id: "siom" }),
        C("rei", -140, "bow", { scale: 0.94, dy: 0.5, facing: 1, id: "rei-de-moabe" }),
      ] }),
      b(27, { by: "homem", q: "Vinde a Hesbom; edifique-se e estabeleça-se a cidade de Siom", set: "proverbio", props: [ // os que falam em PROVÉRBIOS cantam a edificação de Hesbom
        P("column", -230, 1.1, undefined, 0.34),
        P("column", -130, 1.1, undefined, 0.4),
        P("tower", 90, 1.2, undefined, 0.26),
        P("crate", 220, 0.9, undefined, 0.6),
        P("crate", 300, 0.85, undefined, 0.5),
      ], env: { water: 0, terrain: "city", glory: 0.5, night: 0.16, verdure: 0.2 }, cast: [
        C("homem", -30, "raise", { dy: 0.62, facing: -1, id: "o-que-fala-em-proverbios" }),
      ] }),
      b(28, { q: "Porque fogo saiu de Hesbom, e uma chama da cidade de Siom", set: "hesbom-em-chamas", props: [ // o FOGO que saíra de Hesbom e consumira Ar de Moabe
        P("tower", -180, 1.2, undefined, 0.26),
        { ...P("campfire", -20, 1.35, 1, 0.54), tag: "fogo-destruicao" },
        P("campfire", 140, 1.05, 0.9, 0.66),
        P("rock", 275, 0.95, undefined, 0.42),
      ], env: { water: 0, terrain: "city", glory: 0.2, night: 0.62, storm: 0.25, fire: 0.85, verdure: 0.08 } }),
      b(29, { q: "Ai de ti, Moabe! perdido és, povo de Quemos", set: "moabe-cativo", props: [ // os filhos fugindo e as filhas cativas de Moabe
        P("rock", -280, 1.15, undefined, 0.28),
        P("tower", 210, 1.05, undefined, 0.3),
        { ...P("calf", 60, 0.95, undefined, 0.46), tag: "idolo" },
        P("grass", -100, 0.76, undefined, 0.82),
      ], env: { water: 0, terrain: "desert", glory: 0.16, night: 0.72, storm: 0.2, fire: 0.2, verdure: 0.08 }, cast: [
        C("homem", -170, "walk", { dy: 0.66, facing: -1, id: "filho-de-moabe" }),
        C("mulherComum", -60, "bow", { dy: 0.72, facing: -1, id: "cativa-de-moabe" }),
      ] }),
      b(30, { q: "Hesbom perdida é até Dibom", set: "ruinas", props: [               // as ruínas: de Hesbom a Dibom, e assolados até Medeba
        P("rock", -240, 1.25, undefined, 0.34),
        P("rock", -80, 1.0, undefined, 0.52),
        P("rock", 110, 1.15, undefined, 0.44),
        P("tower", 265, 0.9, undefined, 0.28),
        P("grass", 20, 0.72, undefined, 0.84),
      ], env: { water: 0, terrain: "desert", glory: 0.24, night: 0.55, storm: 0.15, fire: 0, verdure: 0.06 } }),
      b(31, { q: "Assim Israel habitou na terra dos amorreus", set: "hesbom", props: [ // e Israel HABITA na terra dos amorreus
        P("tower", -180, 1.25, undefined, 0.26),
        P("tent", -40, 1.15, undefined, 0.44),
        P("tent", 120, 1.05, undefined, 0.54),
        P("well", 300, 1.0, undefined, 0.4),
        P("palm", -320, 1.05, undefined, 0.16),
        P("grass", 220, 0.8, undefined, 0.78),
      ], env: { water: 0, terrain: "city", glory: 0.62, night: 0.12, storm: 0, fire: 0, verdure: 0.45 }, cast: [
        C("multidao", 40, "stand", { dy: 0.6 }),
      ] }),
      b(32, { q: "mandou Moisés espiar a Jazer", set: "jazer", props: [              // Moisés manda espiar JAZER, e as suas aldeias são tomadas
        P("tower", 180, 1.15, undefined, 0.3),
        P("grapes", -250, 1.05, undefined, 0.26),
        P("grapes", 290, 1.0, undefined, 0.36),
        P("rock", 40, 0.9, undefined, 0.5),
        P("grass", -120, 0.78, undefined, 0.8),
      ], env: { water: 0, terrain: "field", glory: 0.54, night: 0.14, verdure: 0.55 }, cast: [
        C("moises", -180, "point", { dy: 0.56, facing: -1 }),
        C("homem", -50, "walk", { dy: 0.62, facing: -1, id: "guerreiro" }),
      ] }),
      b(33, { q: "Ogue, rei de Basã, saiu contra eles", env: { glory: 0.4, night: 0.22, storm: 0.12 }, cast: [ // Ogue, rei de Basã, sai à peleja em Edrei
        C("rei", 150, "stand", { dy: 0.46, facing: -1, id: "ogue", scale: 1.15 }),
        C("multidao", -130, "walk", { dy: 0.5, facing: 1 }),
      ] }),
      b(34, { by: "deus", q: "Não o temas", env: { glory: 0.68, night: 0.15 } }),    // "Não o temas, porque eu o tenho dado na tua mão"
      b(35, { q: "nenhum deles escapou", env: { glory: 0.5, night: 0.18 }, cast: [   // ferem Ogue e todo o seu povo; nenhum escapa
        C("rei", 150, "lie", { dy: 0.62, id: "ogue" }),
        C("homem", -110, "raise", { dy: 0.5, facing: 1, id: "guerreiro" }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Nm 22
  22: {
    start: { terrain: "field", night: 0.12, glory: 0.55, storm: 0, fire: 0, verdure: 0.4 },
    beats: [
      b(1, { props: MOABE, env: { terrain: "field", glory: 0.58, night: 0.1, verdure: 0.45 }, cast: [ // Israel acampa nas campinas de Moabe, além do Jordão
        C("multidao", 60, "stand", { dy: 0.5 }),
      ] }),
      b(2, { cast: [                                                                // Balaque, filho de Zipor, vê o que Israel fizera
        C("rei", 150, "stand", { dy: 0.5, facing: -1, id: "balaque" }),
        C("multidao", -120, "stand", { dy: 0.48 }),
      ] }),
      b(3, { q: "Moabe temeu muito diante deste povo", env: { glory: 0.46, night: 0.2 }, cast: [ // Moabe teme muito diante do povo numeroso
        C("rei", 140, "bow", { dy: 0.5, facing: -1, id: "balaque" }),
      ] }),
      b(4, { cast: [                                                                // Moabe fala aos anciãos dos midianitas
        C("rei", 140, "point", { dy: 0.5, facing: 1, id: "balaque" }),
        C("anciao", -60, "stand", { dy: 0.5, facing: -1, id: "midianitas" }),
      ] }),
      b(5, { q: "enviou mensageiros a Balaão", env: { verdure: 0.35 }, cast: [       // Balaque envia mensageiros a Balaão, em Petor junto ao rio
        C("homem", 120, "stand", { dy: 0.52, facing: -1, id: "balaao" }),
        C("homem", -140, "walk", { dy: 0.5, facing: 1, id: "mensageiro" }),
      ] }),
      b(6, { q: "amaldiçoa-me este povo" }),                                         // "amaldiçoa-me este povo, pois mais poderoso é do que eu"
      b(7, { cast: [                                                                // os anciãos chegam a Balaão com o preço dos encantamentos
        C("homem", 60, "stand", { dy: 0.52, facing: -1, id: "balaao" }),
        C("anciao", -100, "stand", { dy: 0.5, facing: 1, id: "midianitas" }),
      ] }),
      b(8),                                                                         // "passai aqui esta noite, e vos trarei a resposta"
      // v.9 — Deus vem a Balaão de noite: voz sem mediador visível.
      b(9, { by: "deus", q: "Quem são estes homens que estão contigo", env: { glory: 0.5, night: 0.55 }, cast: [
        C("homem", 0, "kneel", { dy: 0.54, facing: 1, id: "balaao" }),
      ] }),
      b(10), b(11),                                                                 // Balaão relata a Deus o recado de Balaque
      b(12, { by: "deus", q: "Não irás com eles", env: { glory: 0.55, night: 0.5 } }), // "Não irás com eles... porquanto é bendito"
      b(13, { env: { night: 0.15, glory: 0.55 }, cast: [                            // Balaão despede os príncipes: o Senhor recusa deixá-lo ir
        C("homem", 40, "point", { dy: 0.52, facing: -1, id: "balaao" }),
        C("anciao", -100, "walk", { dy: 0.5, facing: 1, id: "midianitas" }),
      ] }),
      b(14), b(15), b(16), b(17),                                                   // Balaque insiste e envia príncipes mais honrados
      b(18, { q: "além da ordem do Senhor", cast: [                                 // Balaão: nem por ouro iria além da ordem do Senhor
        C("homem", 40, "raise", { dy: 0.52, facing: -1, id: "balaao" }),
        C("anciao", -100, "stand", { dy: 0.5, facing: 1, id: "principes" }),
      ] }),
      b(19),                                                                        // "ficai esta noite, para que eu saiba o que mais o Senhor me dirá"
      b(20, { by: "deus", q: "levanta-te, vai com eles", env: { glory: 0.5, night: 0.55 }, cast: [ // Deus permite ir, sob condição
        C("homem", 0, "kneel", { dy: 0.54, facing: 1, id: "balaao" }),
      ] }),
      // v.21-35 — A JUMENTA E O ANJO DO SENHOR NO CAMINHO.
      b(21, { q: "albardou a sua jumenta", set: "caminho", props: CAMINHO,
        env: { terrain: "field", glory: 0.5, night: 0.12, verdure: 0.4 }, cast: [
        C("rebanho", 20, "walk", { dy: 0.58, facing: -1, id: "jumenta" }),
        C("homem", -40, "stand", { dy: 0.52, facing: -1, id: "balaao" }),
      ] }),
      // v.22 — O ANJO DO SENHOR se põe no caminho por ADVERSÁRIO, espada na mão. ÍCONE.
      b(22, { q: "o anjo do Senhor pôs-se-lhe no caminho por adversário", env: { glory: 0.4, night: 0.2, fire: 0.05 }, cast: [
        C("anjo", 190, "stand", { dy: 0.4, facing: -1, glow: 0.85 }),
        C("rebanho", 20, "walk", { dy: 0.58, facing: -1, id: "jumenta" }),
        C("homem", -60, "stand", { dy: 0.52, facing: -1, id: "balaao" }),
      ] }),
      // v.23 — a JUMENTA vê o anjo com a ESPADA DESEMBAINHADA e se desvia; Balaão a espanca.
      b(23, { q: "com a sua espada desembainhada na mão", env: { glory: 0.42, fire: 0.08 }, cast: [
        C("anjo", 190, "raise", { dy: 0.42, facing: -1, glow: 0.95 }),
        C("rebanho", 90, "bow", { dy: 0.66, facing: 1, id: "jumenta" }),
        C("homem", -30, "point", { dy: 0.52, facing: -1, id: "balaao" }),
      ] }),
      b(24, { env: { glory: 0.4 }, cast: [                                          // o anjo põe-se numa vereda entre as vinhas, com parede de cada lado
        C("anjo", 190, "stand", { dy: 0.42, facing: -1, glow: 0.85 }),
        C("rebanho", 40, "walk", { dy: 0.6, facing: -1, id: "jumenta" }),
        C("homem", -40, "stand", { dy: 0.52, facing: -1, id: "balaao" }),
      ] }),
      b(25, { cast: [                                                               // a jumenta encosta-se à parede e aperta o pé de Balaão
        C("anjo", 190, "stand", { dy: 0.42, facing: -1, glow: 0.85 }),
        C("rebanho", 120, "stand", { dy: 0.64, facing: 1, id: "jumenta" }),
        C("homem", 40, "stand", { dy: 0.5, facing: -1, id: "balaao" }),
      ] }),
      b(26, { env: { glory: 0.45 }, cast: [                                         // o anjo passa adiante, a um lugar estreito, sem desvio
        C("anjo", 190, "stand", { dy: 0.44, facing: -1, glow: 0.9 }),
        C("rebanho", 20, "walk", { dy: 0.6, facing: -1, id: "jumenta" }),
        C("homem", -60, "stand", { dy: 0.52, facing: -1, id: "balaao" }),
      ] }),
      b(27, { q: "deitou-se debaixo de Balaão", env: { glory: 0.45 }, cast: [        // a jumenta deita-se debaixo dele; Balaão a espanca com o bordão
        C("anjo", 190, "stand", { dy: 0.44, facing: -1, glow: 0.9 }),
        C("rebanho", 30, "lie", { dy: 0.66, facing: -1, id: "jumenta" }),
        C("homem", -30, "raise", { dy: 0.5, facing: -1, id: "balaao" }),
      ] }),
      // v.28 — Deus abre a boca da JUMENTA, que FALA: o balão sai do animal.
      b(28, { by: "rebanho", q: "que me espancaste estas três vezes", env: { glory: 0.5 }, cast: [
        C("rebanho", 40, "stand", { dy: 0.62, facing: -1, id: "jumenta" }),
        C("homem", -50, "stand", { dy: 0.5, facing: 1, id: "balaao" }),
      ] }),
      b(29, { by: "homem", q: "quem dera tivesse eu uma espada na mão", cast: [      // Balaão responde à jumenta com ira
        C("homem", -50, "point", { dy: 0.5, facing: 1, id: "balaao" }),
        C("rebanho", 40, "stand", { dy: 0.62, facing: -1, id: "jumenta" }),
      ] }),
      b(30, { by: "rebanho", q: "não sou a tua jumenta", cast: [                     // a jumenta responde a Balaão
        C("rebanho", 40, "stand", { dy: 0.62, facing: -1, id: "jumenta" }),
        C("homem", -50, "stand", { dy: 0.5, facing: 1, id: "balaao" }),
      ] }),
      // v.31 — Deus abre os OLHOS de Balaão: ele vê o anjo e se PROSTRA. ÍCONE.
      b(31, { q: "prostrou-se sobre a sua face", env: { glory: 0.7, fire: 0.06 }, cast: [
        C("anjo", 190, "raise", { dy: 0.42, facing: -1, glow: 1 }),
        C("rebanho", 60, "stand", { dy: 0.62, facing: -1, id: "jumenta" }),
        C("homem", -40, "kneel", { dy: 0.56, facing: 1, id: "balaao" }),
      ] }),
      b(32, { by: "anjo", q: "para ser teu adversário", env: { glory: 0.72, fire: 0.06 }, cast: [ // o anjo repreende: teu caminho é perverso diante de mim
        C("anjo", 190, "raise", { dy: 0.42, facing: -1, glow: 1 }),
        C("homem", -40, "bow", { dy: 0.56, facing: 1, id: "balaao" }),
        C("rebanho", 60, "stand", { dy: 0.62, facing: -1, id: "jumenta" }),
      ] }),
      b(33, { by: "anjo", env: { glory: 0.7 }, cast: [                               // "a jumenta me viu, e já três vezes se desviou de diante de mim"
        C("anjo", 190, "point", { dy: 0.42, facing: -1, glow: 0.95 }),
        C("rebanho", 60, "stand", { dy: 0.62, facing: -1, id: "jumenta" }),
        C("homem", -40, "bow", { dy: 0.56, facing: 1, id: "balaao" }),
      ] }),
      b(34, { by: "homem", q: "Pequei, porque não sabia", env: { glory: 0.68 }, cast: [ // Balaão confessa ao anjo: "Pequei"
        C("homem", -20, "kneel", { dy: 0.56, facing: 1, id: "balaao" }),
        C("anjo", 190, "stand", { dy: 0.42, facing: -1, glow: 0.9 }),
      ] }),
      b(35, { by: "anjo", q: "somente a palavra que eu falar", env: { glory: 0.72 }, cast: [ // "vai com estes homens, mas só falarás a palavra que eu falar"
        C("anjo", 190, "raise", { dy: 0.42, facing: -1, glow: 0.95 }),
        C("homem", -20, "kneel", { dy: 0.56, facing: 1, id: "balaao" }),
      ] }),
      b(36, { set: "moabe", props: MOABE, env: { terrain: "field", glory: 0.55, night: 0.12, verdure: 0.42 }, cast: [ // Balaque sai ao encontro de Balaão
        C("rei", 150, "walk", { dy: 0.5, facing: -1, id: "balaque" }),
        C("homem", -130, "walk", { dy: 0.5, facing: 1, id: "balaao" }),
      ] }),
      b(37, { cast: [                                                               // Balaque reclama que Balaão demorou a vir
        C("rei", 120, "point", { dy: 0.5, facing: -1, id: "balaque" }),
        C("homem", -60, "stand", { dy: 0.5, facing: 1, id: "balaao" }),
      ] }),
      b(38, { by: "homem", q: "A palavra que Deus puser na minha boca", cast: [      // Balaão: só falarei o que Deus puser na minha boca
        C("homem", -40, "raise", { dy: 0.5, facing: 1, id: "balaao" }),
        C("rei", 120, "stand", { dy: 0.5, facing: -1, id: "balaque" }),
      ] }),
      b(39, { cast: [                                                               // vão juntos a Quiriate-Huzote
        C("rei", 100, "walk", { dy: 0.5, facing: -1, id: "balaque" }),
        C("homem", -60, "walk", { dy: 0.5, facing: -1, id: "balaao" }),
      ] }),
      b(40, { set: "guerra", props: GUERRA, env: { terrain: "field", glory: 0.5, night: 0.14 }, cast: [ // Balaque sacrifica bois e ovelhas
        C("rei", 120, "stand", { dy: 0.5, facing: -1, id: "balaque" }),
        C("homem", -60, "stand", { dy: 0.5, facing: 1, id: "balaao" }),
      ] }),
      b(41, { q: "aos altos de Baal", env: { terrain: "mountain", glory: 0.48, night: 0.15 }, cast: [ // Balaque leva Balaão aos altos de Baal, à vista do povo
        C("homem", -40, "point", { dy: 0.4, facing: -1, id: "balaao" }),
        C("rei", 60, "stand", { dy: 0.42, facing: -1, id: "balaque" }),
        C("multidao", 220, "stand", { dy: 0.7 }),
      ] }),
    ],
  },
};
