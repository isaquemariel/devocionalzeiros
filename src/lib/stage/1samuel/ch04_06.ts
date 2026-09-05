// ============================================================================
// 1 SAMUEL 4–6 — CENA VIVA. A ARCA TOMADA, a mão do SENHOR sobre os filisteus e
// a arca que volta sozinha num carro novo.
//
// 1Sm 4 — A palavra de Samuel chega a todo o Israel, e Israel sai à peleja:
// acampa-se junto a EBENÉZER, e os filisteus junto a AFEQUE. A primeira derrota
// custa QUATRO MIL homens no campo. De volta ao arraial, os ANCIÃOS não
// perguntam pelo pecado — perguntam pelo método: "Tragamos de Siló a arca da
// aliança do Senhor, e venha no meio de nós, para que nos livre". A arca do
// SENHOR DOS EXÉRCITOS, que habita entre os querubins, é arrancada do
// tabernáculo e trazida ao arraial como AMULETO, e com ela vêm HOFNI e FINÉIAS,
// os dois filhos de Eli. O júbilo é tão grande que A TERRA ESTREMECE — e o medo
// dos filisteus ("Deus veio ao arraial… ai de nós!") vira coragem desesperada
// ("esforçai-vos, e sede homens, ó filisteus"). A segunda derrota é o desastre:
// TRINTA MIL homens de pé caem, a ARCA É TOMADA e Hofni e Finéias morrem. Um
// homem de BENJAMIM corre a Siló com as vestes rotas e terra sobre a cabeça;
// ELI, de noventa e oito anos e cego, está assentado na cadeira ao pé do
// caminho, o coração TREMENDO PELA ARCA — e ao ouvir "a arca de Deus foi
// tomada" cai para trás, ao lado da porta, e quebra-se-lhe o pescoço. Na mesma
// hora a mulher de Finéias dá à luz e morre, e ao menino põe o nome de
// ICABODE: "de Israel se foi a glória".
//
// 1Sm 5 — A arca é levada de Ebenézer a ASDODE e posta na CASA DE DAGOM, junto
// ao ídolo — troféu ao lado do deus vencedor. De madrugada, DAGOM está caído com
// o rosto em terra diante da arca; tornam a pô-lo no lugar, e no dia seguinte
// está caído outra vez, com a CABEÇA e as PALMAS DAS MÃOS cortadas sobre o
// LIMIAR: somente o tronco lhe ficou. Por isso, até ao dia de hoje, ninguém pisa
// aquele limiar. Então a MÃO DO SENHOR se agrava sobre os de Asdode e os fere de
// hemorróidas; os príncipes remetem a arca a GATE, e Gate é ferida desde o
// pequeno até ao grande; remetem-na a ECROM, e Ecrom grita antes mesmo de a arca
// entrar. O capítulo fecha com o CLAMOR DA CIDADE SUBINDO ATÉ O CÉU.
//
// 1Sm 6 — SETE MESES depois, os sacerdotes e ADIVINHADORES dão o conselho: não a
// envieis vazia — mandai OFERTA PELA EXPIAÇÃO DA CULPA, CINCO HEMORRÓIDAS DE
// OURO e CINCO RATOS DE OURO, segundo o número dos príncipes; e não endureçais o
// coração como os egípcios e Faraó. Fazem um CARRO NOVO, atam-lhe DUAS VACAS DE
// LEITE sobre as quais nunca subiu jugo, encerram em casa os bezerros e põem a
// arca e o COFRE do ouro em cima: se as vacas subirem pelo caminho de
// BETE-SEMES, foi o SENHOR; se não, foi acaso. As vacas vão DIRETO, andando e
// BERRANDO, sem se desviarem nem para a direita nem para a esquerda, e os
// príncipes vão atrás até ao termo. Bete-Semes está na SEGA DO TRIGO no vale;
// levantam os olhos, veem a arca e se alegram. O carro para no campo de Josué,
// junto a uma GRANDE PEDRA: fendem a madeira do carro, oferecem as vacas em
// holocausto, e os levitas põem a arca e o cofre sobre a pedra. Mas o SENHOR
// fere os que OLHARAM PARA DENTRO da arca, e a alegria vira luto e pergunta:
// "quem poderia subsistir perante este santo Senhor Deus?" — e mandam recado a
// QUIRIATE-JEARIM que venham buscá-la.
//
// A VOZ DE DEUS (regra do projeto): nestes três capítulos DEUS NÃO FALA — nem do
// céu, nem por mediador. Não há um único `by:"deus"` aqui, e é de propósito: a
// ação divina é INTEIRAMENTE ambiente e consequência. A presença aparece como
// GLÓRIA em torno da arca (`env.glory` subindo onde ela está, sem figura alguma
// desenhada), como TEMPESTADE onde a mão pesa (`env.storm` em Asdode, Gate e
// Ecrom) e como NOITE onde a glória se foi (Icabode, 4:21-22). O único fogo
// desenhado é o do `altar` em Bete-Semes (6:14-15) e o da forja do ouro (6:5) —
// `env.fire` sozinho é só ambiência. Nas cenas de morte (4:2,10-11,18-22 e
// 6:19) o primeiro plano é sempre de FIGURAS INDIVIDUAIS em `lie`/`bow`/`kneel`:
// `multidao` só entra onde o texto realmente festeja (4:5 e 6:13).
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
// (sem `dv` aqui: em 1Sm 4–6 Deus não fala — nenhum beat leva `by:"deus"`.)

// ------------------------------------------------------------- SETS 1Sm 4

// EBENÉZER — o arraial de Israel: tendas de campanha armadas às pressas, a
// pedra do lugar que dá nome ao acampamento, a palmeira do caminho e as caixas
// do mantimento. É campo aberto, não cidade.
const EBEN_EZER: StagePropSpec[] = [
  P("tent", -230, 1.2, undefined, 0.24),
  P("tent", -120, 1.0, undefined, 0.34),
  { ...P("rock", 60, 1.15, undefined, 0.5), tag: "eben-ezer" },
  P("palm", 250, 1.1, undefined, 0.18),
  P("crate", 170, 0.8, undefined, 0.6),
  P("grass", -30, 0.8, undefined, 0.74),
];

// AFEQUE — o arraial filisteu do outro lado do vale: a torre de vigia da
// guarnição, a tenda dos príncipes, a fogueira do arraial e o entulho de guerra.
const AFEQUE: StagePropSpec[] = [
  P("tower", 210, 1.3, undefined, 0.26),
  P("tent", 60, 1.1, undefined, 0.32),
  P("campfire", -110, 1.0, undefined, 0.52),
  P("crate", -230, 0.85, undefined, 0.58),
  P("rock", 320, 1.0, undefined, 0.46),
  P("grass", -20, 0.74, undefined, 0.76),
];

// O CAMPO DA PELEJA — a terra batida entre Ebenézer e Afeque, onde "feriram na
// batalha, no campo". Nenhuma tenda: só pedra, mato pisado e chão sem viço.
const BATALHA: StagePropSpec[] = [
  P("rock", -290, 1.15, undefined, 0.42),
  P("rock", 300, 1.05, undefined, 0.5),
  P("bush", 150, 0.9, undefined, 0.36),
  P("tree", -170, 1.1, undefined, 0.2),
  P("grass", 40, 0.72, undefined, 0.78),
];

// SILÓ — o santuário onde a arca habitava desde Josué: o templo, a tenda do
// átrio, o candelabro aceso e a ARCA no seu lugar, antes de ser levada.
const SILO: StagePropSpec[] = [
  { ...P("church", -60, 1.35, undefined, 0.24), tag: "templo-de-silo" },
  P("tent", 140, 1.05, undefined, 0.3),
  P("lampstand", -180, 0.85, undefined, 0.5),
  { ...P("ark", 30, 1.0, undefined, 0.54), tag: "arca-do-concerto" },
  P("palm", 300, 1.1, undefined, 0.16),
  P("grass", 230, 0.76, undefined, 0.74),
];

// O CAMINHO DE SILÓ — a beira da estrada, junto à porta, onde Eli está
// assentado na sua cadeira olhando para o caminho por onde a notícia há de vir.
const PORTA_DE_SILO: StagePropSpec[] = [
  { ...P("throne", -40, 0.95, undefined, 0.5), tag: "estante-de-eli" },
  P("door", 70, 1.0, undefined, 0.34),
  { ...P("church", -210, 1.25, undefined, 0.22), tag: "templo-de-silo" },
  P("palm", 280, 1.05, undefined, 0.18),
  P("rock", 200, 0.9, undefined, 0.62),
  P("grass", 120, 0.74, undefined, 0.76),
];

// A CASA DE FINÉIAS em Siló — o quarto da nora de Eli: a tenda-morada, a porta
// fechada, a lâmpada acesa e as talhas. Aqui nasce Icabode e morre a mãe.
const CASA_DE_FINEIAS: StagePropSpec[] = [
  P("tent", -150, 1.25, undefined, 0.26),
  P("door", -20, 0.95, undefined, 0.36),
  P("lampstand", 120, 0.85, undefined, 0.48),
  P("amphora", 210, 0.7, undefined, 0.62),
  P("crate", -260, 0.8, undefined, 0.56),
  P("grass", 300, 0.7, undefined, 0.76),
];

// ------------------------------------------------------------- SETS 1Sm 5

// O CAMINHO DE ASDODE — a estrada da planície por onde os filisteus sobem com a
// arca tomada: pedra do marco, palmeiras e a torre de Asdode já à vista.
const CAMINHO_DE_ASDODE: StagePropSpec[] = [
  P("rock", -300, 1.1, undefined, 0.42),
  P("bush", -120, 0.9, undefined, 0.38),
  { ...P("ark", -20, 1.0, undefined, 0.5), tag: "arca-do-concerto" },
  P("palm", 190, 1.15, undefined, 0.16),
  P("tower", 300, 1.1, undefined, 0.24),
  P("grass", 90, 0.72, undefined, 0.76),
];

// A CASA DE DAGOM em Asdode — o templo do peixe-deus: nave alta, os dois
// candelabros do santuário, DAGOM em pé sobre o seu pedestal, a arca posta ao
// lado dele como troféu, e a porta com o limiar que ninguém mais pisará.
const CASA_DE_DAGOM: StagePropSpec[] = [
  P("church", -40, 1.5, undefined, 0.18),
  { ...P("calf", -40, 1.2, undefined, 0.4), tag: "dagom-caido" },
  { ...P("ark", 120, 1.0, undefined, 0.56), tag: "arca-do-concerto" },
  P("lampstand", -210, 0.9, undefined, 0.48),
  P("lampstand", 250, 0.9, undefined, 0.48),
  P("door", 300, 1.0, undefined, 0.3),
];

// ASDODE — a cidade lá fora: a muralha com a torre, o templo ao fundo, o poço da
// praça e as talhas. É aqui que a mão do SENHOR assola os moradores.
const ASDODE: StagePropSpec[] = [
  P("tower", -170, 1.3, undefined, 0.24),
  P("church", 90, 1.15, undefined, 0.3),
  P("well", 250, 0.9, undefined, 0.52),
  P("palm", -320, 1.05, undefined, 0.16),
  P("amphora", -40, 0.7, undefined, 0.64),
  P("grass", 170, 0.72, undefined, 0.76),
];

// GATE — a segunda cidade a receber a arca: praça estreita entre a torre e o
// templo, caixas de tributo e a rocha da encosta. Cidade de guerreiros, ferida
// "desde o pequeno até ao grande".
const GATE: StagePropSpec[] = [
  P("tower", 140, 1.25, undefined, 0.26),
  P("church", -120, 1.1, undefined, 0.32),
  P("crate", 260, 0.85, undefined, 0.58),
  P("rock", -290, 1.0, undefined, 0.5),
  P("bush", 40, 0.85, undefined, 0.44),
  P("grass", -30, 0.72, undefined, 0.78),
];

// ECROM — a última cidade filisteia, a mais ao norte: a arca chega e a cidade
// grita ANTES de ser ferida. Porta de rua, poço, torre da muralha.
const ECROM: StagePropSpec[] = [
  P("tower", 260, 1.2, undefined, 0.24),
  P("church", 20, 1.1, undefined, 0.32),
  { ...P("ark", -140, 1.0, undefined, 0.5), tag: "arca-do-concerto" },
  P("well", -290, 0.9, undefined, 0.56),
  P("amphora", 150, 0.7, undefined, 0.64),
  P("grass", -20, 0.72, undefined, 0.78),
];

// ------------------------------------------------------------- SETS 1Sm 6

// A TERRA DOS FILISTEUS — sete meses: a arca guardada em campo aberto entre as
// torres de duas cidades, porque nenhuma a quer dentro dos muros.
const TERRA_FILISTEIA: StagePropSpec[] = [
  P("tower", -250, 1.15, undefined, 0.22),
  P("tower", 230, 1.1, undefined, 0.24),
  { ...P("ark", 0, 1.0, undefined, 0.5), tag: "arca-do-concerto" },
  P("palm", 320, 1.05, undefined, 0.16),
  P("rock", -120, 0.95, undefined, 0.6),
  P("grass", 120, 0.72, undefined, 0.76),
];

// O CONSELHO DOS FILISTEUS — a tenda onde se juntam sacerdotes e adivinhadores:
// o incensário da consulta, o rolo dos agouros e a lâmpada do conclave.
const CONSELHO: StagePropSpec[] = [
  P("tent", -190, 1.25, undefined, 0.24),
  P("lampstand", -60, 0.9, undefined, 0.44),
  P("censer", 20, 0.85, undefined, 0.5),
  P("scroll", 130, 0.8, undefined, 0.56),
  P("tower", 280, 1.1, undefined, 0.22),
  P("grass", -280, 0.7, undefined, 0.76),
];

// A OFICINA DO OURO — onde se batem as cinco hemorróidas e os cinco ratos de
// ouro: a forja acesa, a bacia do metal e o cofre que os levará.
const OFICINA_DE_OURO: StagePropSpec[] = [
  P("campfire", -120, 1.05, undefined, 0.5),
  P("bowl", 30, 0.85, undefined, 0.6),
  { ...P("crate", 150, 0.9, undefined, 0.58), tag: "cofre-de-ouro-dos-filisteus" },
  P("tent", -270, 1.15, undefined, 0.26),
  P("tower", 290, 1.05, undefined, 0.22),
  P("grass", 230, 0.7, undefined, 0.76),
];

// O PÁTIO DO CARRO NOVO — a jangada de madeira nova em que nunca se carregou
// nada, as duas vacas de leite que nunca levaram jugo e o cofre do ouro.
const CARRO_NOVO: StagePropSpec[] = [
  { ...P("chariot", -40, 1.25, undefined, 0.46), tag: "carro-novo-dos-filisteus" },
  P("tent", -270, 1.15, undefined, 0.26),
  { ...P("crate", 110, 0.85, undefined, 0.6), tag: "cofre-de-ouro-dos-filisteus" },
  P("bush", 250, 0.9, undefined, 0.4),
  P("rock", 310, 0.95, undefined, 0.56),
  P("grass", 180, 0.72, undefined, 0.76),
];

// A ESTRADA DE BETE-SEMES — o caminho que sobe do termo filisteu para Judá: o
// carro com a arca em cima seguindo sozinho, a árvore do marco e o mato da
// beira. Nenhum boieiro guia: as vacas vão direto.
const ESTRADA: StagePropSpec[] = [
  { ...P("chariot", -60, 1.2, undefined, 0.52), tag: "carro-novo-dos-filisteus" },
  { ...P("ark", 0, 1.0, undefined, 0.36), tag: "arca-do-concerto" },
  P("rock", -280, 1.0, undefined, 0.46),
  P("bush", 130, 0.9, undefined, 0.4),
  P("tree", 240, 1.15, undefined, 0.2),
  P("grass", 300, 0.72, undefined, 0.76),
];

// O VALE DE BETE-SEMES — a sega do trigo: os feixes ceifados no vale, o sol de
// meio-dia e a árvore da divisa. É o único lugar destes três capítulos com
// alegria de verdade.
const CAMPO_DE_TRIGO: StagePropSpec[] = [
  P("sheaf", -240, 1.0, undefined, 0.56),
  P("sheaf", -110, 0.95, undefined, 0.64),
  P("sheaf", 210, 0.95, undefined, 0.5),
  P("bush", 60, 0.85, undefined, 0.36),
  P("tree", 310, 1.1, undefined, 0.18),
  P("grass", -20, 0.8, undefined, 0.78),
  { ...P("sun", 40, 1.1, undefined, 0.6), sky: true },
];

// A GRANDE PEDRA no campo de Josué, o bete-semita — onde o carro parou: a pedra
// que virou altar-mesa, a madeira do carro fendida e ardendo em holocausto.
const PEDRA_GRANDE: StagePropSpec[] = [
  { ...P("rock", -20, 1.6, undefined, 0.5), tag: "pedra-de-abel" },
  { ...P("chariot", -230, 1.1, undefined, 0.42), tag: "carro-novo-dos-filisteus" },
  P("altar", 170, 1.05, 1, 0.46),
  P("sheaf", 280, 0.95, undefined, 0.6),
  P("tree", 320, 1.05, undefined, 0.18),
  P("grass", 90, 0.74, undefined, 0.76),
];

// O CAMINHO DE QUIRIATE-JEARIM — a subida por onde partem os mensageiros de
// Bete-Semes: a arca esperando na beira do caminho e o monte de Judá adiante.
const CAMINHO_DE_QUIRIATE: StagePropSpec[] = [
  P("tree", -280, 1.15, undefined, 0.18),
  { ...P("ark", -30, 1.0, undefined, 0.4), tag: "arca-do-concerto" },
  P("rock", 150, 1.05, undefined, 0.5),
  P("bush", 250, 0.9, undefined, 0.38),
  P("palm", 320, 1.05, undefined, 0.16),
  P("grass", 40, 0.76, undefined, 0.78),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ 1Sm 4
  4: {
    start: { terrain: "field", night: 0.3, glory: 0.26, storm: 0.12, fire: 0, verdure: 0.3 },
    beats: [
      // v.1 — a palavra de Samuel chega a todo o Israel e Israel sai à peleja:
      // o arraial se arma junto a EBENÉZER. Samuel em cena com brilho leve (é a
      // palavra que abre o capítulo), os homens marchando para o vale.
      b(1, { q: "Israel saiu à peleja contra os filisteus e acampou-se junto a Ebenézer",
        set: "ebenezer", props: EBEN_EZER,
        env: { terrain: "field", night: 0.3, glory: 0.28, storm: 0.12, verdure: 0.3 }, cast: [
        C("patriarca", -240, "raise", { dy: 0.42, facing: 1, id: "samuel", glow: 0.5 }),
        C("anciao", -110, "stand", { dy: 0.48, facing: 1, id: "anciao-de-israel" }),
        C("homem", 40, "walk", { dy: 0.56, facing: 1, id: "soldado-de-israel" }),
        C("homem", 160, "walk", { dy: 0.5, facing: 1, id: "soldado-de-israel-2" }),
      ] }),
      // v.2 — a primeira derrota: quatro mil homens ficam NO CAMPO. Sem
      // multidão festiva — mortos individuais no 1º plano, o filisteu de pé.
      b(2, { q: "no campo, uns quatro mil homens", set: "batalha", props: BATALHA,
        env: { terrain: "field", night: 0.44, glory: 0.12, storm: 0.32, verdure: 0.18 }, cast: [
        C("homem", 180, "point", { dy: 0.44, facing: -1, id: "filisteu-de-afeque" }),
        C("homem", -40, "lie", { dy: 0.64, id: "soldado-de-israel" }),
        C("homem", -190, "lie", { dy: 0.54, id: "soldado-de-israel-2" }),
        C("servo", -290, "bow", { dy: 0.48, facing: 1, id: "escudeiro-de-israel" }),
      ] }),
      // v.3 — de volta ao arraial, os ANCIÃOS decidem buscar a arca de Siló
      // "para que nos livre": a arca tratada como amuleto. Fala o ancião.
      b(3, { by: "anciao", q: "disseram os anciãos de Israel:", set: "ebenezer", props: EBEN_EZER,
        env: { terrain: "field", night: 0.42, glory: 0.16, storm: 0.2, verdure: 0.26 }, cast: [
        C("anciao", -100, "point", { dy: 0.5, facing: 1, id: "anciao-de-israel" }),
        C("anciao", -220, "stand", { dy: 0.44, facing: 1, id: "anciao-de-israel-2" }),
        C("homem", 90, "bow", { dy: 0.6, facing: -1, id: "soldado-de-israel" }),
        C("servo", 220, "kneel", { dy: 0.52, facing: -1, id: "escudeiro-de-israel" }),
      ] }),
      // v.4 — SILÓ: a arca do SENHOR DOS EXÉRCITOS, que habita entre os
      // querubins, é tirada do santuário. Hofni e Finéias vêm com ela — os dois
      // filhos de Eli escoltando o que não lhes pertence. Glória alta na arca.
      b(4, { q: "a arca da aliança do Senhor dos Exércitos, que habita entre os querubins",
        set: "silo", props: SILO,
        env: { terrain: "city", night: 0.28, glory: 0.6, storm: 0.08, verdure: 0.2 }, cast: [
        C("servo", -160, "walk", { dy: 0.6, facing: 1, id: "carregador-da-arca" }),
        C("servo", -60, "walk", { dy: 0.66, facing: 1, id: "carregador-da-arca-2" }),
        C("homem", 130, "stand", { dy: 0.5, facing: -1, id: "hofni" }),
        C("homem", 220, "stand", { dy: 0.46, facing: -1, id: "fineias-silo" }),
      ] }),
      // v.5 — a arca entra no arraial e TODO O ISRAEL grita com grande júbilo
      // "até que a terra estremeceu": aqui a multidão é legítima (é festa), e o
      // estremecer entra como `storm`, não como morte.
      b(5, { q: "todo o Israel gritou com grande júbilo, até que a terra estremeceu",
        props: [
          P("tent", -250, 1.2, undefined, 0.22),
          P("tent", -140, 1.0, undefined, 0.32),
          { ...P("ark", 30, 1.05, undefined, 0.44), tag: "arca-do-concerto" },
          { ...P("rock", 150, 1.0, undefined, 0.62), tag: "eben-ezer" },
          P("palm", 280, 1.1, undefined, 0.18),
          P("grass", -40, 0.8, undefined, 0.76),
        ],
        set: "ebenezer",
        env: { terrain: "field", night: 0.26, glory: 0.55, storm: 0.28, verdure: 0.24 }, cast: [
        C("multidao", -190, "raise", { dy: 0.66, scale: 1.05, id: "arraial-de-israel" }),
        C("multidao", 200, "raise", { dy: 0.58, id: "arraial-de-israel-2" }),
        C("homem", -60, "raise", { dy: 0.52, facing: 1, id: "hofni" }),
        C("homem", 100, "stand", { dy: 0.5, facing: -1, id: "fineias-silo" }),
      ] }),
      // v.6 — do outro lado do vale, AFEQUE ouve o júbilo e entende: a arca do
      // SENHOR veio ao arraial. Fala o filisteu (primeiro `homem` do elenco).
      b(6, { by: "homem", q: "Que voz de grande júbilo é esta no arraial dos hebreus",
        set: "afeque", props: AFEQUE,
        env: { terrain: "city", night: 0.44, glory: 0.18, storm: 0.16, verdure: 0.12 }, cast: [
        C("homem", -60, "point", { dy: 0.5, facing: 1, id: "filisteu-de-afeque" }),
        C("homem", 60, "stand", { dy: 0.54, facing: 1, id: "filisteu-de-afeque-2" }),
        C("rei", 210, "stand", { dy: 0.42, facing: -1, id: "principe-filisteu-de-afeque" }),
      ] }),
      // v.7 — o terror: "Deus veio ao arraial… tal nunca jamais sucedeu antes".
      // Os filisteus se encurvam; a glória sobe um pouco (é ela que os apavora).
      b(7, { by: "homem", q: "Deus veio ao arraial",
        env: { night: 0.5, glory: 0.26, storm: 0.3 }, cast: [
        C("homem", -110, "bow", { dy: 0.56, facing: 1, id: "filisteu-de-afeque" }),
        C("homem", 20, "kneel", { dy: 0.62, facing: 1, id: "filisteu-de-afeque-2" }),
        C("rei", 200, "stand", { dy: 0.44, facing: -1, id: "principe-filisteu-de-afeque" }),
      ] }),
      // v.8 — a memória do ÊXODO na boca do inimigo: "estes são os deuses que
      // feriram aos egípcios com todas as pragas". O arraial inteiro se abaixa.
      b(8, { by: "homem", q: "Estes são os deuses que feriram aos egípcios com todas as pragas junto ao deserto",
        env: { night: 0.54, glory: 0.32, storm: 0.36, fire: 0.2 }, cast: [
        C("homem", -140, "point", { dy: 0.52, facing: 1, id: "filisteu-de-afeque" }),
        C("homem", -20, "bow", { dy: 0.62, facing: 1, id: "filisteu-de-afeque-2" }),
        C("homem", 120, "kneel", { dy: 0.56, facing: -1, id: "filisteu-de-afeque-3" }),
        C("rei", 250, "stand", { dy: 0.4, facing: -1, id: "principe-filisteu-de-afeque" }),
      ] }),
      // v.9 — o medo vira coragem desesperada: o príncipe ergue a voz — "sede
      // homens, e pelejai". Ele é o ÚNICO `rei` do elenco, então o balão é dele.
      b(9, { by: "rei", q: "Esforçai-vos, e sede homens, ó filisteus",
        env: { night: 0.5, glory: 0.14, storm: 0.4, fire: 0.3 }, cast: [
        C("rei", 40, "raise", { dy: 0.44, facing: 1, scale: 1.1, id: "principe-filisteu-de-afeque" }),
        C("homem", -130, "stand", { dy: 0.52, facing: 1, id: "filisteu-de-afeque" }),
        C("homem", -250, "stand", { dy: 0.48, facing: 1, id: "filisteu-de-afeque-2" }),
        C("homem", 210, "point", { dy: 0.56, facing: -1, id: "capitao-filisteu" }),
      ] }),
      // v.10 — o desastre: TRINTA MIL homens de pé caem e cada um foge para a
      // sua tenda. Noite alta, glória quase apagada, mortos individuais.
      b(10, { q: "caíram de Israel trinta mil homens de pé", set: "batalha", props: BATALHA,
        env: { terrain: "field", night: 0.62, glory: 0.08, storm: 0.5, fire: 0.2, verdure: 0.1 }, cast: [
        C("homem", -70, "lie", { dy: 0.66, id: "soldado-de-israel" }),
        C("homem", -210, "lie", { dy: 0.56, id: "soldado-de-israel-2" }),
        C("servo", 60, "lie", { dy: 0.6, id: "escudeiro-de-israel" }),
        C("homem", 210, "point", { dy: 0.46, facing: -1, id: "filisteu-de-afeque" }),
        C("homem", 300, "stand", { dy: 0.4, facing: -1, id: "capitao-filisteu" }),
      ] }),
      // v.11 — o clímax do capítulo: a ARCA É TOMADA e os dois filhos de Eli
      // morrem. Props próprios (rule: não herdar): a arca já está sendo levada
      // para a direita, longe dos corpos de Hofni e Finéias.
      b(11, { q: "E foi tomada a arca de Deus",
        props: [
          { ...P("ark", 210, 1.0, undefined, 0.34), tag: "arca-do-concerto" },
          P("rock", -290, 1.15, undefined, 0.44),
          P("tree", -170, 1.1, undefined, 0.2),
          P("bush", 60, 0.9, undefined, 0.36),
          P("grass", -40, 0.72, undefined, 0.78),
        ],
        env: { night: 0.68, glory: 0.1, storm: 0.55, fire: 0.18, verdure: 0.08 }, cast: [
        C("homem", -120, "lie", { dy: 0.66, id: "hofni" }),
        C("homem", -20, "lie", { dy: 0.6, id: "fineias-silo" }),
        C("homem", 150, "walk", { dy: 0.5, facing: -1, id: "filisteu-de-afeque" }),
        C("homem", 290, "walk", { dy: 0.44, facing: -1, id: "capitao-filisteu" }),
      ] }),
      // v.12 — o BENJAMITA corre da batalha a Siló no mesmo dia, com as vestes
      // rotas e terra sobre a cabeça: o luto vestido antes de ser dito.
      b(12, { q: "trazia as vestes rotas, e terra sobre a cabeça",
        set: "silo-caminho", props: PORTA_DE_SILO,
        env: { terrain: "city", night: 0.55, glory: 0.12, storm: 0.3, fire: 0, verdure: 0.16 }, cast: [
        C("homem", -260, "walk", { dy: 0.64, facing: 1, id: "benjamita-mensageiro" }),
        C("anciao", -20, "stand", { dy: 0.52, facing: -1, id: "eli" }),
        C("mulherComum", 150, "stand", { dy: 0.58, facing: -1, id: "mulher-de-silo" }),
        C("homem", 250, "stand", { dy: 0.5, facing: -1, id: "morador-de-silo" }),
      ] }),
      // v.13 — ELI assentado na cadeira, olhando para o caminho: o coração
      // tremendo PELA ARCA (não pelos filhos). A cidade inteira grita ao saber.
      b(13, { q: "Eli estava assentado numa cadeira, olhando para o caminho",
        env: { night: 0.58, glory: 0.1, storm: 0.34 }, cast: [
        C("anciao", -20, "stand", { dy: 0.52, facing: -1, scale: 1.05, id: "eli" }),
        C("homem", -180, "walk", { dy: 0.62, facing: 1, id: "benjamita-mensageiro" }),
        C("homem", 160, "point", { dy: 0.56, facing: 1, id: "morador-de-silo" }),
        C("mulherComum", 260, "bow", { dy: 0.6, facing: 1, id: "mulher-de-silo" }),
      ] }),
      // v.14 — Eli, cego, só ouve o alvoroço e pergunta o que é. É o único
      // `anciao` do elenco: o balão é dele.
      b(14, { by: "anciao", q: "Que alvoroço é esse",
        env: { night: 0.6, glory: 0.1, storm: 0.38 }, cast: [
        C("anciao", -20, "point", { dy: 0.52, facing: -1, id: "eli" }),
        C("homem", -140, "walk", { dy: 0.6, facing: 1, id: "benjamita-mensageiro" }),
        C("mulherComum", 180, "bow", { dy: 0.58, facing: 1, id: "mulher-de-silo" }),
      ] }),
      // v.15 — noventa e oito anos e os olhos tão escurecidos que já não podia
      // ver: o palco se esvazia até sobrarem só os dois, e a noite pesa.
      b(15, { q: "estavam os seus olhos tão escurecidos, que já não podia ver",
        env: { night: 0.64, glory: 0.09, storm: 0.3 }, cast: [
        C("anciao", -40, "stand", { dy: 0.54, facing: 1, scale: 1.08, id: "eli" }),
        C("homem", 110, "stand", { dy: 0.58, facing: -1, id: "benjamita-mensageiro" }),
      ] }),
      // v.16 — o homem se identifica: "eu fugi hoje da batalha" — e Eli chama-o
      // de FILHO MEU. Fala o benjamita (primeiro `homem` do elenco).
      b(16, { by: "homem", q: "Eu sou o que venho da batalha",
        env: { night: 0.64, glory: 0.1, storm: 0.34 }, cast: [
        C("homem", 90, "point", { dy: 0.58, facing: -1, id: "benjamita-mensageiro" }),
        C("anciao", -60, "stand", { dy: 0.54, facing: 1, id: "eli" }),
      ] }),
      // v.17 — as quatro notícias em ordem crescente: Israel fugiu, grande
      // matança, teus dois filhos morreram — e a ARCA FOI TOMADA. (deixa)
      b(17, { by: "homem", q: "Então respondeu o que trazia as notícias, e disse:",
        env: { night: 0.66, glory: 0.08, storm: 0.42 }, cast: [
        C("homem", 60, "raise", { dy: 0.6, facing: -1, id: "benjamita-mensageiro" }),
        C("anciao", -80, "stand", { dy: 0.52, facing: 1, id: "eli" }),
      ] }),
      // v.18 — foi ao FAZER MENÇÃO DA ARCA que Eli caiu: para trás, ao lado da
      // porta, e quebrou-se-lhe o pescoço. A cadeira fica vazia em cena.
      b(18, { q: "Eli caiu da cadeira para trás, ao lado da porta", props: PORTA_DE_SILO,
        env: { night: 0.72, glory: 0.06, storm: 0.5, verdure: 0.12 }, cast: [
        C("anciao", -10, "lie", { dy: 0.62, id: "eli" }),
        C("homem", 130, "bow", { dy: 0.56, facing: -1, id: "benjamita-mensageiro" }),
        C("mulherComum", 240, "kneel", { dy: 0.6, facing: -1, id: "mulher-de-silo" }),
      ] }),
      // v.19 — a nora, mulher de Finéias, ouve tudo de uma vez (arca, sogro,
      // marido), encurva-se e dá à luz. Cena de mulheres, dentro de casa.
      b(19, { q: "encurvou-se e deu à luz; porquanto as dores lhe sobrevieram",
        set: "casa-de-fineias", props: CASA_DE_FINEIAS,
        env: { terrain: "city", night: 0.68, glory: 0.1, storm: 0.3, verdure: 0.1 }, cast: [
        C("mulherComum", -40, "kneel", { dy: 0.64, facing: 1, id: "mulher-fineias" }),
        C("mulherComum", 120, "bow", { dy: 0.58, facing: -1, id: "mulher-de-silo" }),
        C("mulherComum", 220, "kneel", { dy: 0.62, facing: -1, id: "parteira-de-silo" }),
      ] }),
      // v.20 — as mulheres tentam consolá-la ("não temas, deste à luz um
      // filho") e ela NÃO RESPONDE. A que fala vem PRIMEIRA no elenco.
      b(20, { by: "mulherComum", q: "disseram as mulheres que estavam com ela:",
        env: { night: 0.7, glory: 0.09, storm: 0.28 }, cast: [
        C("mulherComum", 110, "point", { dy: 0.58, facing: -1, id: "mulher-de-silo" }),
        C("mulherComum", 210, "stand", { dy: 0.54, facing: -1, id: "parteira-de-silo" }),
        C("mulherComum", -60, "lie", { dy: 0.66, id: "mulher-fineias" }),
      ] }),
      // v.21 — ICABODE: "de Israel se foi a glória". Agora quem fala é ela, e
      // por isso vem PRIMEIRA. A glória do ambiente cai quase a zero.
      b(21, { by: "mulherComum", q: "E chamou ao menino Icabode, dizendo:",
        env: { night: 0.74, glory: 0.05, storm: 0.32 }, cast: [
        C("mulherComum", -60, "lie", { dy: 0.66, id: "mulher-fineias" }),
        C("mulherComum", 120, "kneel", { dy: 0.6, facing: -1, id: "mulher-de-silo" }),
        C("mulherComum", 230, "bow", { dy: 0.56, facing: -1, id: "parteira-de-silo" }),
      ] }),
      // v.22 — a última palavra do capítulo, e é dela: "a glória é levada
      // presa". A LÂMPADA SAI DE CENA nos props — a casa fica sem luz.
      b(22, { by: "mulherComum", q: "E disse:",
        props: [
          P("tent", -150, 1.25, undefined, 0.26),
          P("door", -20, 0.95, undefined, 0.36),
          P("amphora", 210, 0.7, undefined, 0.62),
          P("crate", -260, 0.8, undefined, 0.56),
          P("grass", 300, 0.7, undefined, 0.76),
        ],
        env: { night: 0.8, glory: 0.03, storm: 0.34, verdure: 0.08 }, cast: [
        C("mulherComum", -70, "lie", { dy: 0.68, id: "mulher-fineias" }),
        C("mulherComum", 100, "bow", { dy: 0.62, facing: -1, id: "mulher-de-silo" }),
        C("mulherComum", 230, "kneel", { dy: 0.56, facing: -1, id: "parteira-de-silo" }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ 1Sm 5
  5: {
    start: { terrain: "desert", night: 0.44, glory: 0.28, storm: 0.2, fire: 0, verdure: 0.08 },
    beats: [
      // v.1 — os filisteus sobem com a arca de Ebenézer a ASDODE: troféu de
      // guerra na estrada da planície. A glória vai junto — e eles não sabem.
      b(1, { q: "tomaram a arca de Deus e a trouxeram de Ebenézer a Asdode",
        set: "caminho-de-asdode", props: CAMINHO_DE_ASDODE,
        env: { terrain: "desert", night: 0.42, glory: 0.32, storm: 0.2, verdure: 0.08 }, cast: [
        C("servo", -110, "walk", { dy: 0.56, facing: 1, id: "carregador-filisteu" }),
        C("servo", 70, "walk", { dy: 0.62, facing: 1, id: "carregador-filisteu-2" }),
        C("homem", -240, "walk", { dy: 0.5, facing: 1, id: "guarda-filisteu" }),
        C("rei", 210, "walk", { dy: 0.44, facing: 1, id: "principe-de-asdode" }),
      ] }),
      // v.2 — dentro da CASA DE DAGOM: põem a arca JUNTO A DAGOM, o cativo ao
      // lado do vencedor. Dagom ainda está de pé, grande, no seu pedestal.
      b(2, { q: "a colocaram na casa de Dagom, e a puseram junto a Dagom",
        set: "casa-de-dagom", props: CASA_DE_DAGOM,
        env: { terrain: "city", night: 0.55, glory: 0.35, storm: 0.12, verdure: 0.05 }, cast: [
        C("anciao", -150, "bow", { dy: 0.56, facing: 1, id: "sacerdote-de-dagom" }),
        C("servo", 60, "stand", { dy: 0.6, facing: -1, id: "carregador-filisteu" }),
        C("rei", 230, "stand", { dy: 0.5, facing: -1, id: "principe-de-asdode" }),
      ] }),
      // v.3 — de madrugada, DAGOM CAÍDO com o rosto em terra diante da arca. O
      // prop do ídolo desce e encolhe (dy 0.66 / scale 0.8): ele está no chão.
      b(3, { q: "Dagom estava caído com o rosto em terra, diante da arca do Senhor",
        props: [
          P("church", -40, 1.5, undefined, 0.18),
          { ...P("calf", 40, 0.8, undefined, 0.66), tag: "dagom-caido" },
          { ...P("ark", 120, 1.05, undefined, 0.5), tag: "arca-do-concerto" },
          P("lampstand", -210, 0.9, undefined, 0.48),
          P("lampstand", 250, 0.9, undefined, 0.48),
          P("door", 300, 1.0, undefined, 0.3),
        ],
        env: { night: 0.5, glory: 0.6, storm: 0.16 }, cast: [
        C("anciao", -130, "bow", { dy: 0.6, facing: 1, id: "sacerdote-de-dagom" }),
        C("servo", -20, "kneel", { dy: 0.7, facing: 1, id: "servo-de-dagom" }),
        C("homem", 230, "stand", { dy: 0.54, facing: -1, id: "homem-de-asdode" }),
      ] }),
      // v.4 — no dia seguinte, outra vez caído — e desta vez a CABEÇA e as
      // PALMAS DAS MÃOS cortadas SOBRE O LIMIAR: só o tronco ficou. O prop
      // encolhe a 0.5 e vai para junto da porta; a arca cresce e brilha.
      b(4, { q: "somente o tronco ficou a Dagom",
        props: [
          P("church", -40, 1.5, undefined, 0.18),
          { ...P("ark", 0, 1.15, undefined, 0.46), tag: "arca-do-concerto" },
          { ...P("calf", 200, 0.5, undefined, 0.7), tag: "dagom-caido" },
          P("lampstand", -230, 0.9, undefined, 0.5),
          P("rock", 120, 0.7, undefined, 0.72),
          P("door", 300, 1.0, undefined, 0.3),
        ],
        env: { night: 0.44, glory: 0.82, storm: 0.25 }, cast: [
        C("anciao", -160, "kneel", { dy: 0.62, facing: 1, id: "sacerdote-de-dagom" }),
        C("servo", -60, "lie", { dy: 0.7, id: "servo-de-dagom" }),
        C("homem", 250, "bow", { dy: 0.6, facing: -1, id: "homem-de-asdode" }),
      ] }),
      // v.5 — o costume que ficou: nem os sacerdotes nem ninguém PISA O LIMIAR
      // de Dagom, até ao dia de hoje. Os dois sacerdotes passam por cima dele.
      b(5, { q: "pisam o limiar de Dagom em Asdode, até ao dia de hoje",
        env: { night: 0.5, glory: 0.55, storm: 0.18 }, cast: [
        C("anciao", 240, "walk", { dy: 0.62, facing: 1, id: "sacerdote-de-dagom" }),
        C("anciao", 315, "stand", { dy: 0.58, facing: 1, id: "sacerdote-de-dagom-2" }),
        C("homem", 60, "stand", { dy: 0.5, facing: -1, id: "homem-de-asdode" }),
      ] }),
      // v.6 — a MÃO DO SENHOR se agrava sobre Asdode e os assola com
      // hemorróidas. Fora do templo, na cidade: figuras individuais abatidas,
      // nunca multidão (que o motor desenharia comemorando).
      b(6, { q: "a mão do Senhor se agravou sobre os de Asdode", set: "asdode", props: ASDODE,
        env: { terrain: "city", night: 0.6, glory: 0.4, storm: 0.35, verdure: 0.06 }, cast: [
        C("homem", -90, "bow", { dy: 0.62, facing: 1, id: "homem-de-asdode" }),
        C("mulherComum", 70, "kneel", { dy: 0.66, facing: -1, id: "mulher-de-asdode" }),
        C("homem", 210, "lie", { dy: 0.58, id: "homem-de-asdode-2" }),
        C("servo", -240, "kneel", { dy: 0.54, facing: 1, id: "servo-de-dagom" }),
      ] }),
      // v.7 — o veredito dos homens de Asdode: "não fique conosco a arca do Deus
      // de Israel; pois a sua mão é dura sobre nós, E SOBRE DAGOM, NOSSO DEUS".
      b(7, { by: "homem", q: "Vendo então os homens de Asdode que assim foi, disseram:",
        env: { night: 0.58, glory: 0.42, storm: 0.36 }, cast: [
        C("homem", -60, "point", { dy: 0.58, facing: 1, id: "homem-de-asdode" }),
        C("homem", 90, "bow", { dy: 0.62, facing: -1, id: "homem-de-asdode-2" }),
        C("mulherComum", 230, "kneel", { dy: 0.6, facing: -1, id: "mulher-de-asdode" }),
        C("rei", -230, "stand", { dy: 0.5, facing: 1, id: "principe-de-asdode" }),
      ] }),
      // v.8 — os CINCO PRÍNCIPES se congregam e a decisão é passar o problema
      // adiante: "será levada até Gate". Fala o príncipe de Asdode, que os
      // convocou (primeiro `rei` do elenco).
      b(8, { by: "rei", q: "a arca do Deus de Israel será levada até Gate",
        props: [
          P("tower", -200, 1.3, undefined, 0.24),
          P("church", 80, 1.15, undefined, 0.3),
          { ...P("ark", 240, 1.0, undefined, 0.52), tag: "arca-do-concerto" },
          P("palm", -320, 1.05, undefined, 0.16),
          P("amphora", -60, 0.7, undefined, 0.64),
          P("grass", 160, 0.72, undefined, 0.78),
        ],
        env: { night: 0.54, glory: 0.44, storm: 0.3 }, cast: [
        C("rei", -140, "point", { dy: 0.5, facing: 1, id: "principe-de-asdode" }),
        C("rei", -30, "stand", { dy: 0.46, facing: -1, id: "principe-de-gaza" }),
        C("rei", 70, "stand", { dy: 0.44, facing: -1, id: "principe-de-ascalom" }),
        C("rei", 175, "stand", { dy: 0.48, facing: -1, id: "principe-de-gate" }),
        C("rei", 290, "stand", { dy: 0.42, facing: -1, id: "principe-de-ecrom" }),
      ] }),
      // v.9 — GATE, cidade de guerreiros, é ferida "desde o pequeno até ao
      // grande": mui grande vexame. Cenário novo, gente nova, mesma mão.
      b(9, { q: "a mão do Senhor veio contra aquela cidade, com mui grande vexame",
        set: "gate", props: GATE,
        env: { terrain: "city", night: 0.62, glory: 0.45, storm: 0.4, verdure: 0.08 }, cast: [
        C("homem", -80, "bow", { dy: 0.62, facing: 1, id: "homem-de-gate" }),
        C("mulherComum", 60, "kneel", { dy: 0.66, facing: -1, id: "mulher-de-gate" }),
        C("homem", 200, "lie", { dy: 0.56, id: "homem-de-gate-2" }),
        C("servo", -220, "kneel", { dy: 0.5, facing: 1, id: "menino-de-gate" }),
      ] }),
      // v.10 — ECROM grita ANTES de ser ferida: "transportaram para nós a arca
      // do Deus de Israel, PARA NOS MATAREM". A arca entra pela esquerda.
      b(10, { by: "homem", q: "os de Ecrom exclamaram, dizendo:", set: "ecrom", props: ECROM,
        env: { terrain: "city", night: 0.6, glory: 0.4, storm: 0.42, verdure: 0.06 }, cast: [
        C("homem", -70, "point", { dy: 0.58, facing: 1, id: "homem-de-ecrom" }),
        C("homem", 70, "bow", { dy: 0.62, facing: -1, id: "homem-de-ecrom-2" }),
        C("mulherComum", 200, "kneel", { dy: 0.6, facing: -1, id: "mulher-de-ecrom" }),
        C("servo", -240, "walk", { dy: 0.52, facing: 1, id: "carregador-filisteu" }),
      ] }),
      // v.11 — segunda assembleia, decisão contrária à primeira: "ENVIAI a arca
      // do Deus de Israel, e torne para o seu lugar". Fala o príncipe de Ecrom,
      // que é quem está com o problema na mão (primeiro `rei` do elenco).
      b(11, { by: "rei", q: "e congregaram a todos os príncipes dos filisteus, e disseram:",
        env: { night: 0.64, glory: 0.42, storm: 0.48 }, cast: [
        C("rei", -40, "point", { dy: 0.48, facing: 1, id: "principe-de-ecrom" }),
        C("rei", 80, "stand", { dy: 0.44, facing: -1, id: "principe-de-gate" }),
        C("rei", 195, "stand", { dy: 0.42, facing: -1, id: "principe-de-asdode" }),
        C("homem", -200, "bow", { dy: 0.6, facing: 1, id: "homem-de-ecrom" }),
        C("mulherComum", 290, "kneel", { dy: 0.58, facing: -1, id: "mulher-de-ecrom" }),
      ] }),
      // v.12 — o fecho do capítulo: os que não morriam eram tão atacados que o
      // CLAMOR DA CIDADE SUBIA ATÉ O CÉU. Ruas vazias (a torre e a porta), luto
      // em figuras individuais, tempestade no auge.
      b(12, { q: "o clamor da cidade subia até o céu",
        props: [
          P("tower", 260, 1.2, undefined, 0.24),
          P("church", 20, 1.1, undefined, 0.32),
          { ...P("ark", -150, 1.05, undefined, 0.46), tag: "arca-do-concerto" },
          P("door", -290, 0.95, undefined, 0.36),
          P("amphora", 130, 0.7, undefined, 0.66),
          P("grass", -30, 0.7, undefined, 0.78),
        ],
        env: { night: 0.7, glory: 0.5, storm: 0.55, verdure: 0.04 }, cast: [
        C("homem", -60, "lie", { dy: 0.68, id: "homem-de-ecrom" }),
        C("mulherComum", 90, "kneel", { dy: 0.64, facing: -1, id: "mulher-de-ecrom" }),
        C("homem", 210, "bow", { dy: 0.6, facing: -1, id: "homem-de-ecrom-2" }),
        C("servo", -230, "kneel", { dy: 0.56, facing: 1, id: "menino-de-ecrom" }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ 1Sm 6
  6: {
    start: { terrain: "desert", night: 0.42, glory: 0.34, storm: 0.2, fire: 0, verdure: 0.08 },
    beats: [
      // v.1 — SETE MESES: a arca guardada em campo aberto entre duas cidades,
      // porque nenhuma a quer dentro dos muros. Só dois guardas de longe.
      b(1, { q: "estado a arca do SENHOR na terra dos filisteus sete meses",
        set: "terra-filisteia", props: TERRA_FILISTEIA,
        env: { terrain: "desert", night: 0.42, glory: 0.36, storm: 0.22, verdure: 0.08 }, cast: [
        C("servo", -150, "stand", { dy: 0.56, facing: 1, id: "guarda-da-arca-filisteu" }),
        C("servo", 140, "stand", { dy: 0.56, facing: -1, id: "guarda-da-arca-filisteu-2" }),
        C("homem", 270, "bow", { dy: 0.6, facing: -1, id: "homem-de-asdode" }),
      ] }),
      // v.2 — os filisteus chamam os SACERDOTES e os ADIVINHADORES: "fazei-nos
      // saber COMO a tornaremos a enviar ao seu lugar". Quem pergunta é o
      // príncipe (primeiro `rei`); os consultados ficam à direita.
      b(2, { by: "rei", q: "Os filisteus chamaram os sacerdotes e os adivinhadores, dizendo:",
        set: "conselho", props: CONSELHO,
        env: { terrain: "city", night: 0.5, glory: 0.28, storm: 0.14, verdure: 0.06 }, cast: [
        C("rei", -120, "point", { dy: 0.48, facing: 1, id: "principe-de-asdode" }),
        C("rei", -245, "stand", { dy: 0.44, facing: 1, id: "principe-de-ecrom" }),
        C("anciao", 60, "stand", { dy: 0.54, facing: -1, id: "adivinho-filisteu" }),
        C("anciao", 175, "stand", { dy: 0.5, facing: -1, id: "sacerdote-de-dagom" }),
      ] }),
      // v.3 — a resposta dos adivinhadores: NÃO A ENVIEIS VAZIA — mandai OFERTA
      // PELA EXPIAÇÃO DA CULPA. Fala o adivinho: vem PRIMEIRO entre os anciãos.
      b(3, { by: "anciao", q: "Os quais disseram:",
        env: { night: 0.48, glory: 0.34, storm: 0.14 }, cast: [
        C("anciao", 100, "point", { dy: 0.52, facing: -1, id: "adivinho-filisteu" }),
        C("anciao", 215, "stand", { dy: 0.48, facing: -1, id: "sacerdote-de-dagom" }),
        C("rei", -110, "stand", { dy: 0.5, facing: 1, id: "principe-de-asdode" }),
        C("rei", -235, "stand", { dy: 0.46, facing: 1, id: "principe-de-ecrom" }),
      ] }),
      // v.4 — o preço: CINCO hemorróidas de ouro e CINCO ratos de ouro, segundo
      // o número dos príncipes. Os cinco príncipes entram em cena, um por ouro.
      b(4, { by: "anciao", q: "cinco hemorróidas de ouro e cinco ratos de ouro",
        env: { night: 0.46, glory: 0.4, storm: 0.12 }, cast: [
        C("anciao", 80, "raise", { dy: 0.54, facing: -1, id: "adivinho-filisteu" }),
        C("anciao", 200, "point", { dy: 0.5, facing: -1, id: "sacerdote-de-dagom" }),
        C("rei", -80, "stand", { dy: 0.5, facing: 1, id: "principe-de-asdode" }),
        C("rei", -190, "stand", { dy: 0.46, facing: 1, id: "principe-de-gaza" }),
        C("rei", -295, "stand", { dy: 0.42, facing: 1, id: "principe-de-ascalom" }),
      ] }),
      // v.5 — a OFICINA: batem as imagens das hemorróidas e dos ratos "que andam
      // destruindo a terra" — e o conselho mais estranho de todos, na boca de um
      // pagão: DAI GLÓRIA AO DEUS DE ISRAEL. A forja é o único fogo desenhado.
      b(5, { by: "anciao", q: "dai glória ao Deus de Israel",
        set: "oficina-de-ouro", props: OFICINA_DE_OURO,
        env: { terrain: "city", night: 0.48, glory: 0.5, storm: 0.1, fire: 0.3, verdure: 0.05 }, cast: [
        C("anciao", -40, "point", { dy: 0.52, facing: 1, id: "adivinho-filisteu" }),
        C("homem", 110, "kneel", { dy: 0.62, facing: -1, id: "ourives-filisteu" }),
        C("homem", 225, "stand", { dy: 0.56, facing: -1, id: "ourives-filisteu-2" }),
        C("servo", -195, "kneel", { dy: 0.58, facing: 1, id: "aprendiz-de-ourives" }),
      ] }),
      // v.6 — o aviso que atravessa a história: NÃO ENDUREÇAIS O CORAÇÃO como os
      // egípcios e Faraó. Os filisteus lembram o Êxodo melhor que Israel.
      b(6, { by: "anciao", q: "como os egípcios e Faraó endureceram os seus corações",
        env: { night: 0.5, glory: 0.45, storm: 0.3, fire: 0.28 }, cast: [
        C("anciao", -60, "raise", { dy: 0.5, facing: 1, id: "adivinho-filisteu" }),
        C("homem", 100, "bow", { dy: 0.6, facing: -1, id: "ourives-filisteu" }),
        C("rei", 240, "stand", { dy: 0.5, facing: -1, id: "principe-de-asdode" }),
      ] }),
      // v.7 — o TESTE começa a ser montado: um CARRO NOVO, DUAS VACAS DE LEITE
      // sobre as quais nunca subiu jugo, e os BEZERROS encerrados em casa (à
      // direita, longe). Tudo contra o instinto das vacas — de propósito.
      b(7, { by: "anciao", q: "tomai e fazei-vos um carro novo",
        set: "carro-novo", props: CARRO_NOVO,
        env: { terrain: "field", night: 0.42, glory: 0.45, storm: 0.1, fire: 0, verdure: 0.18 }, cast: [
        C("anciao", -190, "point", { dy: 0.5, facing: 1, id: "adivinho-filisteu" }),
        C("servo", 60, "kneel", { dy: 0.62, facing: -1, id: "boieiro-filisteu" }),
        C("rebanho", 160, "stand", { dy: 0.56, facing: -1, id: "vacas-do-carro" }),
        C("rebanho", 310, "stand", { dy: 0.42, facing: -1, id: "bezerros-presos" }),
      ] }),
      // v.8 — a arca sobe ao carro e o COFRE do ouro vai ao seu lado: "e assim a
      // enviareis, PARA QUE SE VÁ". Props próprios — a arca agora está em cima.
      b(8, { by: "anciao", q: "Então tomai a arca do Senhor, e ponde-a sobre o carro",
        props: [
          { ...P("chariot", -40, 1.25, undefined, 0.5), tag: "carro-novo-dos-filisteus" },
          { ...P("ark", 20, 1.0, undefined, 0.32), tag: "arca-do-concerto" },
          { ...P("crate", 120, 0.85, undefined, 0.62), tag: "cofre-de-ouro-dos-filisteus" },
          P("tent", -270, 1.15, undefined, 0.26),
          P("bush", 250, 0.9, undefined, 0.4),
          P("grass", 190, 0.72, undefined, 0.76),
        ],
        env: { night: 0.4, glory: 0.55, verdure: 0.2 }, cast: [
        C("anciao", -195, "point", { dy: 0.5, facing: 1, id: "adivinho-filisteu" }),
        C("servo", 90, "stand", { dy: 0.6, facing: -1, id: "boieiro-filisteu" }),
        C("rei", 275, "stand", { dy: 0.46, facing: -1, id: "principe-de-asdode" }),
      ] }),
      // v.9 — a regra do teste dita em voz alta: SE SUBIR pelo caminho do seu
      // termo a Bete-Semes, foi Ele; SE NÃO, foi acaso. (deixa: o balão traz a
      // condição inteira.)
      b(9, { by: "anciao", q: "Vede então:",
        env: { night: 0.38, glory: 0.6, storm: 0.15, verdure: 0.22 }, cast: [
        C("anciao", -160, "raise", { dy: 0.48, facing: 1, id: "adivinho-filisteu" }),
        C("servo", 60, "bow", { dy: 0.62, facing: 1, id: "boieiro-filisteu" }),
        C("rei", 200, "stand", { dy: 0.5, facing: -1, id: "principe-de-asdode" }),
        C("rei", 295, "stand", { dy: 0.44, facing: -1, id: "principe-de-gate" }),
      ] }),
      // v.10 — e assim fizeram: ataram as duas vacas ao carro e ENCERRARAM EM
      // CASA os bezerros. O rebanho dos bezerros vai para o canto oposto.
      b(10, { q: "tomaram duas vacas que criavam, e as ataram ao carro",
        env: { night: 0.4, glory: 0.5, verdure: 0.22 }, cast: [
        C("servo", -60, "kneel", { dy: 0.62, facing: 1, id: "boieiro-filisteu" }),
        C("rebanho", 80, "stand", { dy: 0.56, facing: 1, id: "vacas-do-carro" }),
        C("rebanho", -290, "stand", { dy: 0.42, facing: -1, id: "bezerros-presos" }),
        C("homem", 230, "stand", { dy: 0.5, facing: -1, id: "ourives-filisteu" }),
      ] }),
      // v.11 — a arca do SENHOR e o cofre com os ratos de ouro e as imagens das
      // hemorróidas, tudo em cima do carro. A glória sobe: ela vai embora.
      b(11, { q: "puseram a arca do Senhor sobre o carro",
        env: { night: 0.34, glory: 0.68, verdure: 0.24 }, cast: [
        C("servo", -110, "raise", { dy: 0.58, facing: 1, id: "boieiro-filisteu" }),
        C("servo", 30, "stand", { dy: 0.64, facing: 1, id: "carregador-filisteu" }),
        C("rebanho", 170, "stand", { dy: 0.54, facing: 1, id: "vacas-do-carro" }),
        C("rei", 285, "stand", { dy: 0.46, facing: -1, id: "principe-de-asdode" }),
      ] }),
      // v.12 — o milagre discreto do livro: as vacas vão DIRETO pelo caminho de
      // Bete-Semes, andando e BERRANDO (os bezerros ficaram para trás), SEM SE
      // DESVIAREM nem para a direita nem para a esquerda — e os príncipes vão
      // atrás, só até ao termo. Glória no auge, tempestade quase zerada.
      b(12, { q: "sem se desviarem, nem para a direita nem para a esquerda",
        set: "estrada-de-bete-semes", props: ESTRADA,
        env: { terrain: "field", night: 0.26, glory: 0.8, storm: 0.08, verdure: 0.3 }, cast: [
        C("rebanho", -30, "walk", { dy: 0.56, facing: 1, id: "vacas-do-carro" }),
        C("servo", -160, "walk", { dy: 0.52, facing: 1, id: "boieiro-filisteu" }),
        C("rei", -250, "walk", { dy: 0.48, facing: 1, id: "principe-de-asdode" }),
        C("rei", -330, "walk", { dy: 0.44, facing: 1, id: "principe-de-gate" }),
      ] }),
      // v.13 — o VALE DE BETE-SEMES na sega do trigo: levantam os olhos, veem a
      // arca e SE ALEGRAM. É o único beat destes três capítulos com multidão em
      // festa — e aqui ela é exatamente o que o texto diz.
      b(13, { q: "levantando os seus olhos, viram a arca, e, vendo-a, se alegraram",
        set: "campo-de-trigo", props: CAMPO_DE_TRIGO,
        env: { terrain: "field", night: 0.16, glory: 0.72, storm: 0, verdure: 0.5 }, cast: [
        C("homem", -120, "raise", { dy: 0.6, facing: 1, id: "segador-de-bete-semes" }),
        C("mulherComum", 40, "raise", { dy: 0.64, facing: 1, id: "mulher-de-bete-semes" }),
        C("multidao", 230, "raise", { dy: 0.56, id: "povo-de-bete-semes" }),
        C("servo", -265, "point", { dy: 0.52, facing: 1, id: "menino-de-bete-semes" }),
      ] }),
      // v.14 — o carro entra no campo de Josué, o bete-semita, e PARA junto a
      // uma GRANDE PEDRA. Fendem a madeira do próprio carro e oferecem as vacas
      // em holocausto: o altar acende (único fogo real da cena).
      b(14, { q: "e parou ali onde havia uma grande pedra",
        set: "pedra-grande", props: PEDRA_GRANDE,
        env: { terrain: "field", night: 0.2, glory: 0.8, fire: 0.35, verdure: 0.4 }, cast: [
        C("homem", -120, "stand", { dy: 0.6, facing: 1, id: "segador-de-bete-semes" }),
        C("servo", 60, "kneel", { dy: 0.64, facing: -1, id: "levita-de-bete-semes" }),
        C("rebanho", 200, "stand", { dy: 0.54, facing: -1, id: "vacas-do-carro" }),
        C("homem", -255, "walk", { dy: 0.56, facing: 1, id: "segador-de-bete-semes-2" }),
      ] }),
      // v.15 — os LEVITAS descem a arca e o cofre e os põem SOBRE A GRANDE
      // PEDRA. A arca sobe aos props em cima da rocha e a glória chega ao topo:
      // é a única vez em três capítulos que Israel a trata como devia.
      b(15, { q: "e puseram-nos sobre aquela grande pedra",
        props: [
          { ...P("rock", -20, 1.6, undefined, 0.52), tag: "pedra-de-abel" },
          { ...P("ark", -20, 1.0, undefined, 0.34), tag: "arca-do-concerto" },
          { ...P("crate", 110, 0.85, undefined, 0.62), tag: "cofre-de-ouro-dos-filisteus" },
          P("altar", 200, 1.05, 1, 0.46),
          { ...P("chariot", -250, 1.05, undefined, 0.42), tag: "carro-novo-dos-filisteus" },
          P("sheaf", 300, 0.95, undefined, 0.62),
          P("grass", 90, 0.74, undefined, 0.78),
        ],
        env: { night: 0.14, glory: 0.9, fire: 0.4, verdure: 0.42 }, cast: [
        C("servo", -110, "raise", { dy: 0.58, facing: 1, id: "levita-de-bete-semes" }),
        C("servo", 60, "kneel", { dy: 0.64, facing: -1, id: "levita-de-bete-semes-2" }),
        C("homem", 235, "bow", { dy: 0.56, facing: -1, id: "segador-de-bete-semes" }),
        C("mulherComum", -275, "stand", { dy: 0.5, facing: 1, id: "mulher-de-bete-semes" }),
      ] }),
      // v.16 — os CINCO PRÍNCIPES viram tudo do termo e voltaram para Ecrom no
      // mesmo dia: nenhum se aproxima da pedra. Saem de cena pela direita.
      b(16, { q: "vendo aquilo os cinco príncipes dos filisteus, voltaram para Ecrom no mesmo dia",
        env: { night: 0.22, glory: 0.7, fire: 0.28, verdure: 0.4 }, cast: [
        C("rei", 60, "stand", { dy: 0.58, facing: 1, id: "principe-de-ecrom" }),
        C("rei", 140, "walk", { dy: 0.54, facing: -1, id: "principe-de-gate" }),
        C("rei", 215, "walk", { dy: 0.5, facing: -1, id: "principe-de-asdode" }),
        C("rei", 280, "walk", { dy: 0.46, facing: -1, id: "principe-de-gaza" }),
        C("rei", 335, "walk", { dy: 0.42, facing: -1, id: "principe-de-ascalom" }),
        C("servo", -150, "stand", { dy: 0.6, facing: -1, id: "levita-de-bete-semes" }),
      ] }),
      // v.17 — o inventário do ouro, cidade por cidade: Asdode, Gaza, Ascalom,
      // Gate, Ecrom — cinco hemorróidas, uma por senhorio. O cofre é aberto
      // sobre a pedra e conferido.
      b(17, { q: "Por Asdode uma, por Gaza outra, por Ascalom outra, por Gate outra, por Ecrom outra",
        env: { night: 0.2, glory: 0.75, fire: 0.24, verdure: 0.4 }, cast: [
        C("servo", -80, "kneel", { dy: 0.62, facing: 1, id: "levita-de-bete-semes" }),
        C("homem", 90, "point", { dy: 0.58, facing: -1, id: "segador-de-bete-semes" }),
        C("homem", 215, "stand", { dy: 0.54, facing: -1, id: "segador-de-bete-semes-2" }),
      ] }),
      // v.18 — os ratos de ouro, um por cidade, "desde as cidades fortificadas
      // até às aldeias, e até Abel"; e o versículo termina no monumento: A
      // GRANDE PEDRA AINDA ESTÁ ALI. O carro já virou lenha: some dos props.
      b(18, { q: "A grande pedra, sobre a qual puseram a arca do Senhor, ainda está até ao dia de hoje",
        props: [
          { ...P("rock", 0, 1.7, undefined, 0.54), tag: "pedra-de-abel" },
          { ...P("ark", 0, 1.0, undefined, 0.32), tag: "arca-do-concerto" },
          { ...P("crate", 140, 0.85, undefined, 0.62), tag: "cofre-de-ouro-dos-filisteus" },
          P("altar", 220, 1.0, 0.6, 0.44),
          P("sheaf", -230, 0.95, undefined, 0.6),
          P("tree", -320, 1.1, undefined, 0.18),
          P("grass", 90, 0.74, undefined, 0.78),
        ],
        env: { night: 0.22, glory: 0.72, fire: 0.18, verdure: 0.38 }, cast: [
        C("homem", -120, "point", { dy: 0.58, facing: 1, id: "segador-de-bete-semes" }),
        C("servo", 110, "stand", { dy: 0.6, facing: -1, id: "levita-de-bete-semes" }),
        C("mulherComum", 250, "stand", { dy: 0.54, facing: -1, id: "mulher-de-bete-semes" }),
      ] }),
      // v.19 — a alegria vira luto: o SENHOR fere os que OLHARAM PARA DENTRO da
      // arca. A glória NÃO baixa (é ela que fere: santidade, não ira cega) —
      // sobem a noite e a tempestade, e o 1º plano é de mortos individuais.
      // Nada de `multidao` aqui, ainda que o povo inteiro esteja de luto.
      b(19, { q: "porquanto olharam para dentro da arca do Senhor",
        env: { night: 0.55, glory: 0.72, storm: 0.4, fire: 0.12, verdure: 0.24 }, cast: [
        C("homem", -90, "lie", { dy: 0.68, id: "segador-de-bete-semes" }),
        C("homem", 60, "lie", { dy: 0.62, id: "segador-de-bete-semes-2" }),
        C("mulherComum", 200, "kneel", { dy: 0.64, facing: 1, id: "mulher-de-bete-semes" }),
        C("servo", -245, "bow", { dy: 0.56, facing: 1, id: "levita-de-bete-semes" }),
      ] }),
      // v.20 — a pergunta que o capítulo estava construindo desde Asdode: "QUEM
      // PODERIA SUBSISTIR PERANTE ESTE SANTO SENHOR DEUS?". Fala um sobrevivente
      // de Bete-Semes — vem PRIMEIRO entre os `homem` do elenco.
      b(20, { by: "homem", q: "Então disseram os homens de Bete-Semes:",
        env: { night: 0.5, glory: 0.8, storm: 0.3, verdure: 0.26 }, cast: [
        C("homem", -70, "point", { dy: 0.6, facing: 1, id: "homem-de-bete-semes" }),
        C("homem", 90, "bow", { dy: 0.62, facing: -1, id: "segador-de-bete-semes-2" }),
        C("mulherComum", 230, "kneel", { dy: 0.58, facing: -1, id: "mulher-de-bete-semes" }),
        C("servo", -250, "bow", { dy: 0.54, facing: 1, id: "levita-de-bete-semes" }),
      ] }),
      // v.21 — o recado a QUIRIATE-JEARIM: "descei, pois, e fazei-a subir para
      // vós". A arca fica esperando na beira do caminho e os mensageiros sobem
      // o monte de Judá — o capítulo acaba com ela ainda sem casa.
      b(21, { by: "servo", q: "Enviaram, pois, mensageiros aos habitantes de Quiriate-Jearim, dizendo:",
        set: "caminho-de-quiriate", props: CAMINHO_DE_QUIRIATE,
        env: { terrain: "field", night: 0.36, glory: 0.7, storm: 0.12, fire: 0, verdure: 0.34 }, cast: [
        C("servo", -150, "walk", { dy: 0.58, facing: 1, id: "mensageiro-de-bete-semes" }),
        C("servo", -250, "walk", { dy: 0.54, facing: 1, id: "mensageiro-de-bete-semes-2" }),
        C("servo", 30, "stand", { dy: 0.64, facing: 1, id: "levita-de-bete-semes" }),
        C("homem", 130, "point", { dy: 0.6, facing: 1, id: "homem-de-bete-semes" }),
      ] }),
    ],
  },
};
