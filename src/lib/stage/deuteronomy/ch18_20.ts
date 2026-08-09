// ============================================================================
// DEUTERONÔMIO 18–20 — CENA VIVA. Nas campinas de Moabe, MOISÉS discursa a todo
// o Israel e repete a Lei antes de morrer. O FALANTE é MOISÉS (`by: "moises"`).
//
// Dt 18 — A PORÇÃO DOS LEVITAS e o PROFETA prometido: os sacerdotes levitas não
// têm herança na terra — "o Senhor é a sua herança"; vivem das ofertas. Entrando
// na terra, Israel NÃO aprenderá as ABOMINAÇÕES das nações — quem passa o filho
// pelo fogo, o adivinho, o feiticeiro, o necromante que consulta os mortos: tudo
// abominação. E o grande ÍCONE MESSIÂNICO: "o Senhor teu Deus te levantará um
// PROFETA do meio de ti, de teus irmãos, como eu; a ele ouvireis" (18:15,18) —
// Moisés aponta à promessa, com glória. Flashback de HOREBE: o grande fogo no
// monte, de onde o povo pediu um mediador.
//
// Dt 19 — AS CIDADES DE REFÚGIO: três cidades (e mais três) separadas para que o
// HOMICIDA involuntário — o que fere o próximo por engano, o ferro saltando do
// cabo do machado — fuja do VINGADOR DO SANGUE e viva. A corrida à cidade-torre,
// com tensão. Não remover o MARCO/limite do próximo. E a testemunha: por duas ou
// três testemunhas se firma o fato; a FALSA sofre o que tramou — "olho por olho".
//
// Dt 20 — AS LEIS DA GUERRA: ao sair à peleja contra cavalos e carros, "não
// temais"; o SACERDOTE anima o exército — "o Senhor vosso Deus é o que vai
// convosco". Voltam para casa: o da casa nova, o da vinha, o do noivado, o
// medroso. Oferecer PAZ à cidade antes de sitiá-la; e no cerco, POUPAR as árvores
// frutíferas — "pois o arvoredo do campo é mantimento para o homem". A batalha e
// o cerco: torres, baluartes, guerreiros. Guerra = glória baixa, noite, tensão.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const mv = (v: number, q?: string, extra: Partial<StageBeat> = {}) =>
  b(v, { by: "moises", ...(q ? { q } : {}), ...extra }); // Moisés fala

// Cena-base: campinas de Moabe, além do Jordão — o rio ao fundo, tendas do arraial.
const MOABE: StagePropSpec[] = [
  P("river", 300, 1.3, undefined, 0.86),
  P("tent", -260, 1.05, undefined, 0.2),
  P("tent", 230, 1.0, undefined, 0.24),
  P("palm", -320, 1.05, undefined, 0.14),
  P("grass", -60, 0.8, undefined, 0.8),
  P("grass", 80, 0.78, undefined, 0.72),
];
// O SACERDÓCIO — o altar e as ofertas de que vivem os levitas sem herança.
const SACERDOCIO: StagePropSpec[] = [
  P("altar", 70, 1.2, undefined, 0.42),
  P("tent", -260, 1.05, undefined, 0.2),
  P("palm", 300, 1.05, undefined, 0.14),
  P("grass", -60, 0.8, undefined, 0.8),
  P("grass", 150, 0.76, undefined, 0.72),
];
// HOREBE relembrado — o GRANDE FOGO no monte, de onde saiu a voz (Dt 18:16).
const HOREBE: StagePropSpec[] = [
  P("campfire", 0, 1.5, 1, 0.5),
  P("pillar", 0, 1.35, 1, 0.28),
  P("rock", 280, 1.15, undefined, 0.34),
  P("rock", -280, 1.1, undefined, 0.4),
];
// A CIDADE DE REFÚGIO — a torre-abrigo ao fim do caminho, para o homicida se acolher.
const REFUGIO: StagePropSpec[] = [
  P("tower", 250, 1.35, undefined, 0.26),
  P("church", 250, 1.0, undefined, 0.5),
  P("tree", -280, 1.05, undefined, 0.32),
  P("rock", 60, 0.95, undefined, 0.5),
  P("grass", -60, 0.8, undefined, 0.8),
  P("grass", 120, 0.76, undefined, 0.72),
];
// O TRIBUNAL — perante o Senhor, diante dos sacerdotes e juízes (Dt 19:17).
const TRIBUNAL: StagePropSpec[] = [
  P("altar", 0, 1.15, undefined, 0.44),
  P("church", 240, 1.0, undefined, 0.42),
  P("palm", -300, 1.05, undefined, 0.14),
  P("grass", -80, 0.78, undefined, 0.78),
];
// A GUERRA — a peleja contra as cidades inimigas: torres e o campo de batalha.
const GUERRA: StagePropSpec[] = [
  P("tower", -140, 1.2, undefined, 0.28),
  P("tower", 150, 1.15, undefined, 0.34),
  P("rock", 300, 1.1, undefined, 0.3),
  P("grass", -40, 0.76, undefined, 0.78),
];
// O CERCO — a cidade sitiada com baluartes; as árvores frutíferas POUPADAS.
const CERCO: StagePropSpec[] = [
  P("tower", 150, 1.3, undefined, 0.3),
  P("tree", -260, 1.15, undefined, 0.34),
  P("tree", -110, 1.0, undefined, 0.44),
  P("rock", 300, 1.05, undefined, 0.32),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Dt 18
  18: {
    start: { terrain: "field", night: 0.1, glory: 0.58, storm: 0, fire: 0, verdure: 0.42 },
    beats: [
      // v.1-8 — A PORÇÃO DOS LEVITAS: sem herança, vivem das ofertas do altar.
      mv(1, "não terão parte nem herança com Israel", { set: "sacerdocio", props: SACERDOCIO,
        env: { terrain: "field", glory: 0.6, night: 0.1, verdure: 0.4 }, cast: [
        C("moises", -180, "raise", { dy: 0.5, facing: 1 }),
        C("arao", 30, "stand", { dy: 0.5, facing: -1, id: "levita", glow: 0.2 }),
        C("servo", 150, "stand", { dy: 0.5, facing: -1, id: "levita2" }),
      ] }),
      mv(2, "o Senhor é a sua herança", { env: { glory: 0.66 }, cast: [                 // "o Senhor é a sua herança"
        C("moises", -170, "point", { dy: 0.5, facing: 1 }),
        C("arao", 40, "stand", { dy: 0.5, facing: -1, id: "levita", glow: 0.25 }),
      ] }),
      mv(3, undefined, { cast: [                                                        // o direito dos sacerdotes: a espádua, as queixadas, o bucho
        C("moises", -160, "stand", { dy: 0.5, facing: 1 }),
        C("servo", 60, "bow", { dy: 0.5, facing: -1, id: "ofertante" }),
        C("arao", 160, "stand", { dy: 0.5, facing: -1, id: "levita" }),
      ] }),
      mv(4),                                                                            // as primícias do grão, do mosto, do azeite, da tosquia
      mv(5, "o Senhor teu Deus o escolheu", { env: { glory: 0.64 }, cast: [             // o Senhor escolheu Levi para servir no seu nome
        C("moises", -160, "raise", { dy: 0.5, facing: 1 }),
        C("arao", 60, "stand", { dy: 0.5, facing: -1, id: "levita", glow: 0.3 }),
      ] }),
      mv(6),                                                                            // o levita que vem de qualquer porta ao lugar escolhido
      mv(7),                                                                            // servirá no nome do Senhor com seus irmãos levitas
      mv(8),                                                                            // igual porção comerão
      // v.9-14 — CONTRA AS ABOMINAÇÕES das nações: fogo, adivinhação, necromancia.
      mv(9, "as abominações daquelas nações", { env: { glory: 0.4, night: 0.25 }, cast: [ // não aprender as abominações das nações
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 140, "stand", { dy: 0.5 }),
      ] }),
      mv(10, "quem faça passar pelo fogo a seu filho", { env: { glory: 0.12, night: 0.55, fire: 0.18, storm: 0.1 }, cast: [ // passar o filho pelo fogo; o adivinho
        C("moises", -180, "raise", { dy: 0.5, facing: 1 }),
        C("homem", 60, "bow", { dy: 0.52, facing: -1, id: "idolatra" }),
        C("homem", 190, "stand", { dy: 0.5, facing: -1, id: "agoureiro" }),
      ] }),
      mv(11, "nem quem consulte os mortos", { env: { glory: 0.1, night: 0.6 }, cast: [   // encantador, mágico, necromante que consulta os mortos
        C("moises", -180, "point", { dy: 0.5, facing: 1 }),
        C("homem", 80, "kneel", { dy: 0.56, facing: -1, id: "necromante" }),
      ] }),
      mv(12, "é abominação ao Senhor", { env: { glory: 0.16, night: 0.5 } }),           // tudo isso é abominação ao Senhor
      mv(13, "Perfeito serás", { env: { glory: 0.55, night: 0.15 }, cast: [             // "Perfeito serás, como o Senhor teu Deus"
        C("moises", -120, "raise", { dy: 0.5, facing: 1, glow: 0.2 }),
      ] }),
      mv(14),                                                                           // as nações ouvem adivinhos; a ti não permitiu tal coisa
      // v.15 — ÍCONE MESSIÂNICO: o PROFETA prometido, como Moisés. "a ele ouvireis".
      mv(15, "te levantará um profeta do meio de ti", { env: { terrain: "field", glory: 0.85, night: 0.05, verdure: 0.45 }, cast: [
        C("moises", -80, "point", { dy: 0.5, facing: -1, glow: 0.5 }),
        C("multidao", 170, "raise", { dy: 0.56, facing: -1 }),
      ] }),
      // v.16 — flashback de HOREBE: o GRANDE FOGO no monte que o povo temeu.
      mv(16, "nem mais verei este grande fogo", { set: "horebe", props: HOREBE,
        env: { terrain: "mountain", glory: 0.2, night: 0.45, fire: 0.9, storm: 0.1, verdure: 0 }, cast: [
        C("multidao", 160, "bow", { dy: 0.66, facing: -1 }),
        C("moises", -170, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      mv(17, undefined, { set: "moabe", props: MOABE, env: { terrain: "field", glory: 0.6, night: 0.1, verdure: 0.42 }, cast: [ // o Senhor aprovou o pedido do povo
        C("moises", -120, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      // v.18 — a PROMESSA: "porei as minhas palavras na sua boca" — o Profeta como Moisés.
      mv(18, "porei as minhas palavras na sua boca", { env: { glory: 0.82, night: 0.05 }, cast: [
        C("moises", -80, "point", { dy: 0.5, facing: -1, glow: 0.45 }),
        C("multidao", 170, "raise", { dy: 0.56, facing: -1 }),
      ] }),
      mv(19, undefined, { env: { glory: 0.66 } }),                                      // quem não ouvir as palavras do Profeta será requerido
      mv(20, "esse profeta morrerá", { env: { glory: 0.3, night: 0.35 }, cast: [        // o falso profeta presunçoso morrerá
        C("moises", -120, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      mv(21),                                                                           // "como conhecerei a palavra que o Senhor não falou?"
      mv(22, "não tenhas temor dele", { cast: [                                         // a palavra que não se cumpre não veio do Senhor
        C("moises", -120, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.5 }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Dt 19
  19: {
    start: { terrain: "field", night: 0.12, glory: 0.55, storm: 0, fire: 0, verdure: 0.4 },
    beats: [
      mv(1, undefined, { props: MOABE, env: { terrain: "field", glory: 0.56, night: 0.1, verdure: 0.42 }, cast: [ // ao possuir as nações e morar nas suas cidades
        C("moises", -160, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.5 }),
      ] }),
      // v.2 — AS CIDADES DE REFÚGIO: três cidades separadas na terra.
      mv(2, "Três cidades separarás", { set: "refugio", props: REFUGIO,
        env: { terrain: "field", glory: 0.58, night: 0.12, verdure: 0.38 }, cast: [
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
      ] }),
      mv(3, "todo o homicida se acolha ali", { cast: [                                  // o caminho preparado para o homicida se acolher
        C("moises", -180, "point", { dy: 0.5, facing: 1 }),
        C("homem", 40, "walk", { dy: 0.52, facing: -1, id: "homicida" }),
      ] }),
      mv(4, "aquele que por engano ferir o seu próximo", { cast: [                      // o homicida por engano, que não odiava o próximo
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      // v.5 — o exemplo: o ferro salta do cabo do machado e mata o próximo. Ele foge.
      mv(5, "o ferro saltar do cabo", { env: { glory: 0.42, night: 0.2 }, cast: [
        C("homem", -40, "raise", { dy: 0.52, facing: -1, id: "lenhador" }),
        C("homem", 90, "lie", { dy: 0.62, id: "morto" }),
      ] }),
      // v.6 — A CORRIDA: o VINGADOR DO SANGUE atrás; o homicida corre à cidade-refúgio.
      mv(6, "o vingador do sangue não vá após o homicida", { env: { glory: 0.36, night: 0.28, storm: 0.08 }, cast: [
        C("homem", 90, "walk", { dy: 0.54, facing: -1, id: "homicida" }),
        C("homem", -130, "walk", { dy: 0.5, facing: 1, id: "vingador" }),
      ] }),
      mv(7, undefined, { env: { glory: 0.5, night: 0.15 }, cast: [                       // "Três cidades separarás"
        C("moises", -140, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      mv(8),                                                                            // se o Senhor dilatar os teus termos, como jurou aos pais
      mv(9, "outras três cidades", { env: { glory: 0.56 }, cast: [                      // acrescentar outras três cidades de refúgio
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
      ] }),
      mv(10),                                                                           // para que o sangue inocente não se derrame na terra
      // v.11-13 — o assassino de propósito: os anciãos o entregam ao vingador.
      mv(11, undefined, { env: { glory: 0.3, night: 0.35 }, cast: [                      // quem odeia, arma ciladas e fere mortalmente
        C("homem", 60, "point", { dy: 0.52, facing: -1, id: "assassino" }),
        C("homem", 170, "lie", { dy: 0.62, id: "vitima" }),
      ] }),
      mv(12, "os anciãos da sua cidade mandarão buscá-lo", { env: { glory: 0.34, night: 0.3 }, cast: [ // os anciãos o tiram da cidade e o entregam
        C("anciao", -140, "point", { dy: 0.5, facing: 1, id: "anciaos" }),
        C("homem", 60, "bow", { dy: 0.56, facing: -1, id: "assassino" }),
      ] }),
      mv(13),                                                                           // o teu olho não o perdoará; tira o sangue inocente
      // v.14 — o MARCO: não remover o limite antigo do próximo.
      mv(14, "Não mudes o limite do teu próximo", { env: { glory: 0.55, night: 0.12 }, cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("homem", 130, "stand", { dy: 0.5, facing: -1, id: "vizinho" }),
      ] }),
      // v.15-21 — AS TESTEMUNHAS: por duas ou três se firma; a falsa é punida.
      mv(15, "pela boca de duas testemunhas", { set: "tribunal", props: TRIBUNAL,
        env: { terrain: "field", glory: 0.55, night: 0.12, verdure: 0.35 }, cast: [
        C("moises", -170, "raise", { dy: 0.5, facing: 1 }),
        C("homem", 80, "stand", { dy: 0.5, facing: -1, id: "testemunha1" }),
        C("homem", 180, "stand", { dy: 0.5, facing: -1, id: "testemunha2" }),
      ] }),
      mv(16, "se levantar testemunha falsa", { env: { glory: 0.4, night: 0.22 }, cast: [ // a testemunha falsa se levanta contra alguém
        C("homem", 120, "point", { dy: 0.5, facing: -1, id: "falsa" }),
        C("homem", -40, "stand", { dy: 0.5, facing: 1, id: "acusado" }),
      ] }),
      mv(17, undefined, { cast: [                                                       // os dois se apresentam perante o Senhor, diante dos juízes
        C("servo", -120, "stand", { dy: 0.5, facing: 1, id: "juiz" }),
        C("homem", 40, "stand", { dy: 0.5, facing: -1, id: "acusado" }),
        C("homem", 150, "stand", { dy: 0.5, facing: -1, id: "falsa" }),
      ] }),
      mv(18, undefined, { cast: [                                                       // os juízes inquirem e descobrem a falsidade
        C("servo", -120, "point", { dy: 0.5, facing: 1, id: "juiz" }),
        C("homem", 100, "bow", { dy: 0.54, facing: -1, id: "falsa" }),
      ] }),
      mv(19, undefined, { env: { glory: 0.35, night: 0.25 } }),                          // far-lhe-eis como cuidou fazer a seu irmão
      mv(20),                                                                           // para que os outros ouçam e temam
      mv(21, "olho por olho, dente por dente", { env: { glory: 0.32, night: 0.28 }, cast: [ // "vida por vida, olho por olho"
        C("moises", -120, "raise", { dy: 0.5, facing: 1 }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Dt 20
  20: {
    start: { terrain: "field", night: 0.2, glory: 0.4, storm: 0.05, fire: 0, verdure: 0.32 },
    beats: [
      // v.1-4 — À PELEJA: não temer os cavalos e carros; o SACERDOTE anima o exército.
      mv(1, "deles não terás temor", { set: "guerra", props: GUERRA,
        env: { terrain: "field", glory: 0.32, night: 0.3, storm: 0.1, verdure: 0.25 }, cast: [
        C("cavaleiro", 140, "stand", { dy: 0.46, facing: -1, id: "inimigo" }),
        C("cavaleiro", -150, "stand", { dy: 0.5, facing: 1, id: "israel" }),
        C("moises", -260, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      mv(2, "o sacerdote se adiantará", { env: { glory: 0.42, night: 0.25 }, cast: [     // o sacerdote se adianta e fala ao povo
        C("arao", -60, "raise", { dy: 0.5, facing: -1, id: "sacerdote", glow: 0.35 }),
        C("cavaleiro", 130, "stand", { dy: 0.48, facing: -1, id: "exercito" }),
      ] }),
      mv(3, "não temais nem tremais", { env: { glory: 0.46, night: 0.22 }, cast: [       // "não temais nem tremais diante deles"
        C("arao", -60, "raise", { dy: 0.5, facing: -1, id: "sacerdote", glow: 0.4 }),
        C("cavaleiro", 120, "stand", { dy: 0.48, facing: -1, id: "exercito" }),
      ] }),
      // v.4 — a PROMESSA de fôlego: "o Senhor vosso Deus é o que vai convosco".
      mv(4, "é o que vai convosco", { env: { glory: 0.7, night: 0.15, storm: 0 }, cast: [
        C("arao", -50, "raise", { dy: 0.5, facing: -1, id: "sacerdote", glow: 0.6 }),
        C("cavaleiro", 130, "raise", { dy: 0.48, facing: -1, id: "exercito" }),
      ] }),
      // v.5-8 — OS QUE VOLTAM: casa nova, vinha, noiva, medroso.
      mv(5, "edificou casa nova", { env: { glory: 0.48, night: 0.2 }, cast: [            // o que edificou casa nova volta para consagrá-la
        C("arao", -120, "point", { dy: 0.5, facing: 1, id: "oficial" }),
        C("homem", 80, "walk", { dy: 0.52, facing: 1, id: "casa-nova" }),
      ] }),
      mv(6, "plantou uma vinha", { cast: [                                              // o que plantou vinha e não a desfrutou volta
        C("arao", -120, "point", { dy: 0.5, facing: 1, id: "oficial" }),
        C("homem", 80, "walk", { dy: 0.52, facing: 1, id: "vinha" }),
      ] }),
      mv(7, "está desposado com alguma mulher", { cast: [                               // o desposado que não recebeu a mulher volta
        C("arao", -120, "point", { dy: 0.5, facing: 1, id: "oficial" }),
        C("homem", 80, "walk", { dy: 0.52, facing: 1, id: "noivo" }),
      ] }),
      mv(8, "o homem medroso e de coração tímido", { env: { glory: 0.34, night: 0.3 }, cast: [ // o medroso volta para não derreter o coração dos irmãos
        C("arao", -120, "point", { dy: 0.5, facing: 1, id: "oficial" }),
        C("homem", 80, "bow", { dy: 0.54, facing: 1, id: "medroso" }),
      ] }),
      mv(9, undefined, { env: { glory: 0.42, night: 0.22 }, cast: [                       // designam os capitães dos exércitos à dianteira
        C("cavaleiro", -100, "stand", { dy: 0.5, facing: 1, id: "capitao" }),
        C("cavaleiro", 100, "stand", { dy: 0.48, facing: 1, id: "exercito" }),
      ] }),
      // v.10-12 — OFERECER PAZ à cidade antes de sitiá-la.
      mv(10, "apregoar-lhe-ás a paz", { set: "cerco", props: CERCO,
        env: { terrain: "field", glory: 0.5, night: 0.18, verdure: 0.3 }, cast: [
        C("cavaleiro", -140, "stand", { dy: 0.5, facing: 1, id: "arauto" }),
        C("rei", 140, "stand", { dy: 0.46, facing: -1, id: "cidade" }),
      ] }),
      mv(11, undefined, { env: { glory: 0.55, night: 0.15 }, cast: [                      // se aceita a paz, o povo fica tributário
        C("rei", 130, "bow", { dy: 0.48, facing: -1, id: "cidade" }),
        C("cavaleiro", -120, "stand", { dy: 0.5, facing: 1, id: "arauto" }),
      ] }),
      // v.12 — recusada a paz: o CERCO. Guerra = glória baixa, noite, tensão.
      mv(12, "então a sitiarás", { env: { glory: 0.24, night: 0.42, storm: 0.15, fire: 0.1 }, cast: [
        C("cavaleiro", -150, "raise", { dy: 0.5, facing: 1, id: "sitiante" }),
        C("cavaleiro", -60, "stand", { dy: 0.52, facing: 1, id: "sitiante2" }),
        C("rei", 150, "stand", { dy: 0.46, facing: -1, id: "cidade" }),
      ] }),
      mv(13, "passarás ao fio da espada", { env: { glory: 0.18, night: 0.5, fire: 0.15, storm: 0.12 }, cast: [ // o Senhor a dá na mão; os homens caem à espada
        C("cavaleiro", -140, "raise", { dy: 0.5, facing: 1, id: "sitiante" }),
        C("homem", 120, "lie", { dy: 0.62, id: "caido" }),
      ] }),
      mv(14, undefined, { props: [...GUERRA, P("crate", 40, 0.9, undefined, 0.6), P("amphora", 200, 0.85, undefined, 0.66)],
        env: { terrain: "field", glory: 0.3, night: 0.35 }, cast: [                       // as mulheres, crianças e o despojo tomados
        C("cavaleiro", -120, "stand", { dy: 0.5, facing: 1, id: "sitiante" }),
        C("mulherComum", 90, "stand", { dy: 0.52, facing: -1, id: "cativa" }),
      ] }),
      mv(15),                                                                           // assim se faz às cidades bem distantes
      // v.16-18 — as cidades das nações: nada com fôlego; para não aprender abominações.
      mv(16, undefined, { env: { glory: 0.14, night: 0.55, fire: 0.12 }, cast: [          // das cidades destas nações, nada com fôlego fica vivo
        C("cavaleiro", -130, "raise", { dy: 0.5, facing: 1, id: "sitiante" }),
        C("homem", 120, "lie", { dy: 0.62, id: "caido" }),
      ] }),
      mv(17, undefined, { env: { glory: 0.16, night: 0.5 } }),                            // destruir totalmente heteus, amorreus, cananeus...
      mv(18, undefined, { env: { glory: 0.4, night: 0.22 } }),                            // para que não vos ensinem as suas abominações
      // v.19 — POUPAR AS ÁRVORES frutíferas do cerco: "é mantimento para o homem".
      mv(19, "não destruirás o seu arvoredo", { env: { terrain: "field", glory: 0.55, night: 0.16, verdure: 0.4, fire: 0, storm: 0 }, cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("homem", 60, "stand", { dy: 0.52, facing: -1, id: "sitiante" }),
      ] }),
      // v.20 — só as árvores estéreis viram BALUARTES contra a cidade.
      mv(20, "edificarás baluartes", { env: { glory: 0.34, night: 0.32, storm: 0.1 }, cast: [
        C("cavaleiro", -140, "raise", { dy: 0.5, facing: 1, id: "sitiante" }),
        C("rei", 150, "stand", { dy: 0.46, facing: -1, id: "cidade" }),
      ] }),
    ],
  },
};
