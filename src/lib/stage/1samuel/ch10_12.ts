// ============================================================================
// 1 SAMUEL 10–12 — CENA VIVA. A UNÇÃO SECRETA, a sorte de Mizpá, a espada de
// Jabes-Gileade e a DESPEDIDA de Samuel debaixo dos trovões da sega.
//
// 1Sm 10 — Ao romper do dia, no fim da cidade, SAMUEL toma o VASO DE AZEITE, o
// derrama sobre a cabeça de Saul, o BEIJA e pergunta: "porventura não te ungiu o
// SENHOR por capitão sobre a sua herança?". Não há assembleia, não há trombeta:
// o primeiro rei de Israel é feito rei num caminho vazio, entre dois homens. E
// Samuel lhe dá TRÊS SINAIS para que ele creia: dois homens junto ao SEPULCRO DE
// RAQUEL, em Zelza, dirão que as jumentas já se acharam e que o pai agora se
// aflige por ele; três homens no CARVALHO DE TABOR, subindo a Deus a Betel com
// três cabritos, três bolos de pão e um odre de vinho, lhe darão DOIS PÃES; e no
// OUTEIRO DE DEUS, onde está a guarnição dos filisteus, um grupo de PROFETAS
// descerá do alto com saltérios, tambores, flautas e harpas, e o Espírito se
// apoderará dele, e ele será OUTRO HOMEM. Virando as costas para partir, "Deus
// lhe mudou o coração em outro" — e tudo acontece naquele mesmo dia. Saul
// profetiza no meio dos profetas, e os que o conheciam se espantam: "está também
// Saul entre os profetas?" — o provérbio nasce ali. Em casa, o TIO pergunta o que
// Samuel disse, e Saul conta das jumentas e ESCONDE o negócio do reino. Depois,
// em MIZPÁ, Samuel convoca o povo ao SENHOR, acusa a rejeição ("Põe um rei sobre
// nós") e faz chegar as tribos por sorte: Benjamim, Matri, Saul filho de Quis — e
// não se acha. Perguntam ao SENHOR, e a resposta vem do alto: "eis que se
// escondeu entre a bagagem". Tiram-no dali; é mais alto do que todo o povo do
// ombro para cima; "vedes já a quem o Senhor escolheu?" — e o povo jubila: VIVA O
// REI! Samuel escreve o DIREITO DO REINO num livro e o põe perante o SENHOR. Saul
// volta a Gibeá com os valentes cujos corações Deus tocara; mas os FILHOS DE
// BELIAL o desprezam, não lhe trazem presentes — e ele se faz como surdo.
//
// 1Sm 11 — NAÁS, o amonita, sobe e sitia JABES-GILEADE. Os homens da cidade
// pedem aliança, e ele responde com a condição infame: arrancar A TODOS O OLHO
// DIREITO, para pôr afronta sobre TODO O ISRAEL. Os anciãos pedem SETE DIAS para
// mandar mensageiros por todos os termos. Em GIBEÁ, os mensageiros falam, e todo
// o povo levanta a voz e chora. Saul vem do campo ATRÁS DOS BOIS, pergunta por
// que choram — e então o ESPÍRITO DE DEUS se apodera dele e a sua ira se acende
// em grande maneira: toma uma JUNTA DE BOIS, corta-a em pedaços e a manda por
// todos os termos de Israel. Cai o temor do SENHOR sobre o povo, e saem COMO UM
// SÓ HOMEM: trezentos mil de Israel e trinta mil de Judá, contados em BEZEQUE. A
// promessa aos sitiados: "amanhã, em aquecendo o sol, vos virá livramento". Na
// VIGÍLIA DA MANHÃ, em três companhias, ferem os amonitas até o dia aquecer, e os
// restantes se espalham sem ficarem dois deles juntos. O povo quer matar os que
// desprezaram Saul; ele recusa: "hoje não morrerá nenhum". E em GILGAL o reino é
// RENOVADO, com ofertas pacíficas e grande alegria.
//
// 1Sm 12 — A DESPEDIDA. Samuel, velho e encanecido, põe o rei adiante do povo e
// se põe a si mesmo em julgamento: "EIS-ME AQUI; testificai contra mim... a quem
// o boi tomei? a quem defraudei?". O povo o absolve: em nada nos defraudaste. Daí
// ele pleiteia com Israel sobre os ATOS DE JUSTIÇA DO SENHOR: Jacó no Egito, o
// clamor, Moisés e Arão; o esquecimento e a venda à mão de SÍSERA, dos
// FILISTEUS e do REI DOS MOABITAS; o novo clamor, e JERUBAAL, BEDÃ, JEFTÉ e o
// próprio Samuel enviados para livrar. E então: quando Naás veio, "não, mas
// reinará sobre nós um rei" — sendo o SENHOR o vosso rei. Eis o rei que pedistes.
// A condição é posta: temer e servir, ou a mão do SENHOR contra vós. E vem o
// SINAL: é a SEGA DO TRIGO, tempo sem chuva — Samuel clama, e o SENHOR dá
// TROVÕES E CHUVA naquele dia, sobre os feixes em pé. Todo o povo teme
// sobremaneira e pede oração para não morrer. A resposta é a mais mansa do livro:
// "longe de mim que eu peque contra o Senhor, DEIXANDO DE ORAR POR VÓS" — com a
// promessa ("não desamparará o seu povo") e o aviso final ("perecereis, assim vós
// como o vosso rei").
//
// A VOZ DE DEUS (regra do projeto): neste trecho o SENHOR só fala DIRETO uma
// única vez — 10:22, em Mizpá, quando tornam a perguntar-lhe e a resposta vem sem
// boca humana nenhuma: "eis que se escondeu entre a bagagem". Ali, e só ali, é
// `by:"deus"`, com `env.glory` alto e NENHUMA figura dourada em cena. Todo o
// resto da palavra divina passa por MEDIADOR VISÍVEL: em 10:1,18-19 e em todo o
// capítulo 12 quem fala é SAMUEL (`by:"patriarca"`) — inclusive o "assim disse o
// Senhor Deus de Israel" de 10:18, que é fórmula de profeta, não voz do céu; e em
// 10:6,9-10 e 11:6 Deus não fala, AGE — o Espírito se apodera, e isso é glória no
// ambiente e Saul em `raise`, nunca balão.
// FOGO: só o `altar` com `fire` em Gilgal (11:15) e a fogueira do arraial amonita
// desenham chama de verdade — `env.fire` é só ambiência.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
// voz do céu — em 1Sm 10–12 usada UMA vez só (10:22, a resposta em Mizpá).
const dv = (v: number, q?: string, extra: Partial<StageBeat> = {}) =>
  b(v, { by: "deus", ...(q ? { q } : {}), ...extra });

// --------------------------------------------------------------- SETS 1Sm 10

// A SAÍDA DE RAMÁ, ao romper do dia (9:26–10:1) — o fim da cidade, onde Samuel
// manda o moço passar adiante para ficar a sós com Saul: o portão, as casas, o
// poço da manhã e, na mão do profeta, o VASO DE AZEITE.
const RAMA: StagePropSpec[] = [
  P("church", -210, 1.1, undefined, 0.3),
  P("door", -70, 0.95, undefined, 0.36),
  P("well", 110, 0.95, undefined, 0.5),
  { ...P("amphora", 30, 0.62, undefined, 0.62), tag: "frasco-de-azeite" },
  P("palm", 250, 1.05, undefined, 0.16),
  P("rock", 310, 1.0, undefined, 0.5),
  P("grass", 170, 0.76, undefined, 0.74),
];

// ZELZA, no termo de Benjamim — o SEPULCRO DE RAQUEL à beira do caminho: a
// pedra-marco solitária, o descampado seco, a estrada que segue para o norte.
const ZELZA: StagePropSpec[] = [
  { ...P("rock", 0, 1.35, undefined, 0.5), tag: "sepulcro-de-raquel" },
  P("rock", -270, 1.0, undefined, 0.42),
  P("bush", 230, 0.9, undefined, 0.4),
  P("tree", 320, 1.1, undefined, 0.18),
  P("palm", -330, 1.0, undefined, 0.16),
  P("grass", -120, 0.78, undefined, 0.76),
];

// O CARVALHO DE TABOR — a grande árvore no caminho de quem SOBE A DEUS A BETEL:
// à sombra dela passam os três romeiros com os cabritos, os bolos e o odre.
const TABOR: StagePropSpec[] = [
  { ...P("tree", 0, 1.7, undefined, 0.14), tag: "carvalho-de-tabor" },
  P("crate", -150, 0.85, undefined, 0.6),
  P("amphora", 150, 0.72, undefined, 0.64),
  P("bush", -260, 0.9, undefined, 0.42),
  P("rock", 260, 0.95, undefined, 0.58),
  P("grass", 60, 0.78, undefined, 0.76),
];

// O OUTEIRO DE DEUS (Gibeá-Elohim) — o alto do sacrifício de um lado e a
// GUARNIÇÃO DOS FILISTEUS do outro: o altar do lugar alto, a torre do posto
// estrangeiro e os instrumentos do bando de profetas que desce.
const OUTEIRO: StagePropSpec[] = [
  P("altar", -190, 1.0, undefined, 0.32),
  P("trumpet", 120, 0.85, undefined, 0.58),
  P("tower", 250, 1.3, undefined, 0.26),
  P("rock", -310, 1.0, undefined, 0.48),
  P("bush", 40, 0.9, undefined, 0.44),
  P("grass", -60, 0.76, undefined, 0.76),
];

// GIBEÁ — o PÁTIO da casa: o curral, as talhas, o poço da família. É aqui que o
// tio intercepta Saul e o moço na volta, e aqui que o reino fica em segredo.
const GIBEA_PATIO: StagePropSpec[] = [
  P("well", -310, 0.95, undefined, 0.44),
  P("church", -160, 1.1, undefined, 0.3),
  P("door", -20, 0.95, undefined, 0.36),
  P("stall", 180, 1.0, undefined, 0.32),
  P("amphora", 80, 0.7, undefined, 0.62),
  P("tree", 310, 1.1, undefined, 0.18),
  P("grass", 260, 0.74, undefined, 0.74),
];

// MIZPÁ — o descampado da assembleia diante do SENHOR: o altar do lugar de
// congregação, o carvalho do sítio, a pedra grande — e, encostada no canto, a
// BAGAGEM onde um homem cabe inteiro se quiser sumir.
const MIZPA: StagePropSpec[] = [
  P("tree", -330, 1.2, undefined, 0.16),
  P("altar", -210, 1.05, undefined, 0.3),
  { ...P("crate", 150, 0.9, undefined, 0.56), tag: "bagagem-de-mizpa" },
  P("rock", 300, 1.15, undefined, 0.42),
  P("bush", 60, 0.9, undefined, 0.44),
  P("grass", -90, 0.76, undefined, 0.76),
];

// MIZPÁ, o mesmo descampado com o LIVRO — o direito do reino escrito e posto
// perante o SENHOR, ao pé do altar, antes de o povo ser despedido.
const MIZPA_LIVRO: StagePropSpec[] = [
  P("tree", -330, 1.2, undefined, 0.16),
  P("altar", -210, 1.05, undefined, 0.3),
  { ...P("scroll", 20, 0.95, undefined, 0.6), tag: "livro-do-direito-do-reino" },
  { ...P("crate", 150, 0.9, undefined, 0.56), tag: "bagagem-de-mizpa" },
  P("rock", 300, 1.15, undefined, 0.42),
  P("grass", -90, 0.76, undefined, 0.76),
];

// GIBEÁ — a FRENTE da casa de Saul, virada para o caminho: a porta larga, a
// torre da aldeia, a palmeira do portão. É aqui que chegam os valentes cujos
// corações Deus tocara — e é aqui que os filhos de Belial passam sem presente.
const GIBEA_CASA: StagePropSpec[] = [
  P("church", -190, 1.15, undefined, 0.28),
  P("door", 0, 1.05, undefined, 0.34),
  P("tower", 200, 1.1, undefined, 0.26),
  P("rock", -320, 1.0, undefined, 0.5),
  P("palm", 300, 1.05, undefined, 0.16),
  P("grass", 90, 0.74, undefined, 0.74),
];

// --------------------------------------------------------------- SETS 1Sm 11

// JABES-GILEADE SITIADA — a cidade além do Jordão de portas fechadas, e, do
// outro lado do campo, o ARRAIAL AMONITA acampado à vontade, com a fogueira
// acesa de quem sabe que tem sete dias de sobra.
const JABES: StagePropSpec[] = [
  P("church", -270, 1.05, undefined, 0.32),
  P("tower", -150, 1.35, undefined, 0.26),
  P("door", -30, 0.95, undefined, 0.36),
  P("tent", 170, 1.15, undefined, 0.3),
  P("campfire", 220, 1.0, undefined, 0.52),
  P("tent", 280, 1.0, undefined, 0.24),
  P("rock", 320, 1.0, undefined, 0.6),
  P("grass", 50, 0.74, undefined, 0.74),
];

// O CAMPO ATRÁS DOS BOIS — a lavoura de Saul nos arredores de Gibeá: os feixes
// já cortados, o curral no fim da leira, a árvore do lindeiro. Um rei arando.
const CAMPO_BOIS: StagePropSpec[] = [
  P("stall", -320, 1.0, undefined, 0.3),
  P("sheaf", -240, 1.0, undefined, 0.58),
  P("sheaf", 230, 0.95, undefined, 0.54),
  P("tree", 300, 1.15, undefined, 0.18),
  P("bush", 120, 0.9, undefined, 0.44),
  P("grass", -60, 0.76, undefined, 0.76),
];

// A IRA — o mesmo campo depois do machado: o curral vazio, os feixes pisados e,
// no meio da cena, a JUNTA DE BOIS despedaçada, embalada em pedaços para correr
// todos os termos de Israel. Céu carregado, luz de tempestade.
const IRA: StagePropSpec[] = [
  P("stall", -330, 1.0, undefined, 0.3),
  P("sheaf", -260, 0.95, undefined, 0.56),
  { ...P("crate", 0, 1.1, undefined, 0.58), tag: "junta-de-bois-despedacada" },
  P("rock", 250, 1.0, undefined, 0.6),
  P("tree", 320, 1.1, undefined, 0.2),
  P("grass", 90, 0.76, undefined, 0.76),
];

// BEZEQUE — o lugar da contagem: o arraial de Israel armado em campo aberto,
// as tendas dos milhares, a trombeta do ajuntamento e o sol já alto.
const BEZEQUE: StagePropSpec[] = [
  P("tent", -230, 1.1, undefined, 0.22),
  P("tent", -120, 1.0, undefined, 0.26),
  P("trumpet", 190, 0.9, undefined, 0.56),
  P("rock", 300, 1.1, undefined, 0.46),
  P("palm", -320, 1.0, undefined, 0.14),
  P("grass", 40, 0.76, undefined, 0.76),
  { ...P("sun", 60, 1.1, undefined, 0.6), sky: true },
];

// O ARRAIAL AMONITA NA VIGÍLIA DA MANHÃ — as tendas do cerco tomadas por dentro
// ao amanhecer, a fogueira da noite ainda fumegando, o sol nascendo baixo por
// cima do estrago. É a cena do golpe, não a da festa.
const ARRAIAL: StagePropSpec[] = [
  P("tent", -190, 1.15, undefined, 0.3),
  P("campfire", -30, 0.95, undefined, 0.5),
  P("tent", 130, 1.05, undefined, 0.26),
  P("bush", -310, 0.9, undefined, 0.4),
  P("rock", 280, 1.0, undefined, 0.56),
  P("grass", 200, 0.74, undefined, 0.74),
  { ...P("sun", -100, 1.0, undefined, 0.22), sky: true },
];

// GILGAL, a renovação do reino — o círculo das pedras antigas, o altar com o
// fogo das ofertas pacíficas aceso, a tenda do arraial e a palmeira do vale.
const GILGAL: StagePropSpec[] = [
  P("tent", -330, 1.0, undefined, 0.22),
  P("rock", -250, 1.1, undefined, 0.46),
  P("rock", -170, 0.95, undefined, 0.52),
  P("altar", 0, 1.15, 1, 0.4),
  P("rock", 240, 1.05, undefined, 0.44),
  P("palm", 310, 1.05, undefined, 0.16),
  P("grass", 100, 0.76, undefined, 0.76),
];

// --------------------------------------------------------------- SETS 1Sm 12

// GILGAL — a ASSEMBLEIA da despedida: as pedras da memória de um lado, o altar
// recuado ao fundo, e, à direita, os feixes da SEGA DO TRIGO já em pé — porque
// esta é a estação sem chuva, e é dela que vai sair o sinal.
const GILGAL_ASSEMBLEIA: StagePropSpec[] = [
  P("rock", -290, 1.1, undefined, 0.42),
  P("rock", -200, 0.95, undefined, 0.5),
  P("altar", -100, 0.95, undefined, 0.28),
  P("palm", 190, 1.05, undefined, 0.16),
  P("sheaf", 250, 1.0, undefined, 0.56),
  P("sheaf", 315, 0.9, undefined, 0.5),
  P("grass", 30, 0.76, undefined, 0.76),
];

// O EGITO relembrado (12:8) — o rio, a torre da cidade de tijolo, o depósito
// das cargas: a terra de onde os pais clamaram e de onde foram tirados.
const EGITO: StagePropSpec[] = [
  P("river", 0, 1.4, undefined, 0.86),
  P("tower", -180, 1.25, undefined, 0.26),
  P("church", 60, 1.05, undefined, 0.32),
  P("crate", 200, 0.9, undefined, 0.6),
  P("palm", -320, 1.0, undefined, 0.14),
  P("grass", 280, 0.74, undefined, 0.74),
];

// OS OPRESSORES relembrados (12:9) — Hazor de Sísera, as cidades dos filisteus
// e o acampamento de Moabe: três potências de uma vez sobre uma terra sem juiz.
const OPRESSORES: StagePropSpec[] = [
  P("tower", -160, 1.3, undefined, 0.26),
  P("church", 110, 1.05, undefined, 0.32),
  P("tent", 260, 1.0, undefined, 0.26),
  P("rock", -310, 1.0, undefined, 0.5),
  P("bush", 30, 0.9, undefined, 0.46),
  P("grass", 190, 0.74, undefined, 0.74),
];

// OS LIBERTADORES relembrados (12:11) — Jerubaal, Bedã, Jefté: o campo livre
// outra vez, a trombeta do juiz, o altar da terra em paz, o sol de meio-dia.
const LIBERTADORES: StagePropSpec[] = [
  P("tree", -300, 1.2, undefined, 0.18),
  P("trumpet", -60, 0.95, undefined, 0.58),
  P("altar", 150, 1.0, undefined, 0.3),
  P("rock", 280, 1.05, undefined, 0.5),
  P("bush", 60, 0.9, undefined, 0.44),
  P("grass", -160, 0.76, undefined, 0.76),
  { ...P("sun", 0, 1.1, undefined, 0.62), sky: true },
];

// A SEGA DEBAIXO DA TROVOADA (12:17-18) — o trigal em pé, os feixes prontos, e
// o céu que não devia chover carregado de nuvem. A imagem do capítulo: a colheita
// de Israel encharcada pela mão que ele mesmo desafiou.
const SEGA: StagePropSpec[] = [
  { ...P("sheaf", -230, 1.1, undefined, 0.56), tag: "sega-do-trigo" },
  P("sheaf", -110, 1.0, undefined, 0.62),
  P("sheaf", 120, 1.05, undefined, 0.58),
  P("sheaf", 240, 0.95, undefined, 0.52),
  P("rock", 320, 1.0, undefined, 0.46),
  P("grass", 0, 0.78, undefined, 0.78),
  { ...P("clouds", -40, 1.3, undefined, 0.55), sky: true },
  { ...P("clouds", 180, 1.1, undefined, 0.7), sky: true },
];

export const CHAPTERS: Record<number, StageScript> = {
  // ---------------------------------------------------------------- 1Sm 10
  10: {
    start: { terrain: "field", night: 0.34, glory: 0.5, storm: 0, fire: 0, water: 0, verdure: 0.24 },
    beats: [
      // v.1 — A UNÇÃO SECRETA no fim da cidade: o vaso de azeite derramado sobre
      // a cabeça, o BEIJO do profeta e a pergunta que faz o primeiro rei. Samuel
      // com glow (é ele que carrega a glória aqui), Saul de joelhos.
      b(1, { by: "patriarca", q: "e disse:", set: "rama", props: RAMA,
        env: { terrain: "field", night: 0.28, glory: 0.74, storm: 0, verdure: 0.26 }, cast: [
        C("patriarca", -90, "raise", { dy: 0.5, facing: 1, id: "samuel", glow: 0.62 }),
        C("rei", 80, "kneel", { dy: 0.58, facing: -1, id: "saul" }),
      ] }),
      // v.2 — PRIMEIRO SINAL: em Zelza, junto ao sepulcro de Raquel, dois homens
      // dirão que as jumentas se acharam — e que o pai já se aflige pelo FILHO,
      // não pelas jumentas. Samuel anuncia da beira do quadro; o sinal se vê.
      b(2, { by: "patriarca", q: "acharás dois homens junto ao sepulcro de Raquel",
        set: "zelza", props: ZELZA,
        env: { terrain: "desert", night: 0.24, glory: 0.56, verdure: 0.12 }, cast: [
        C("patriarca", -300, "point", { dy: 0.44, facing: 1, id: "samuel", glow: 0.4 }),
        C("homem", 60, "stand", { dy: 0.56, facing: -1, id: "homem-do-sepulcro1" }),
        C("homem", 160, "point", { dy: 0.52, facing: -1, id: "homem-do-sepulcro2" }),
        C("rei", -110, "walk", { dy: 0.6, facing: 1, id: "saul" }),
      ] }),
      // v.3 — SEGUNDO SINAL: o carvalho de Tabor e os três romeiros que sobem a
      // Deus a Betel — um com três cabritos, um com três bolos, um com o odre.
      b(3, { by: "patriarca", q: "ali te encontrarão três homens",
        set: "tabor", props: TABOR,
        env: { terrain: "field", night: 0.22, glory: 0.58, verdure: 0.34 }, cast: [
        C("patriarca", -305, "point", { dy: 0.42, facing: 1, id: "samuel", glow: 0.4 }),
        C("homem", 40, "walk", { dy: 0.54, facing: -1, id: "homem-dos-cabritos" }),
        C("homem", 140, "walk", { dy: 0.5, facing: -1, id: "homem-dos-paes" }),
        C("homem", 230, "walk", { dy: 0.46, facing: -1, id: "homem-do-odre" }),
        C("rei", -130, "walk", { dy: 0.62, facing: 1, id: "saul" }),
      ] }),
      // v.4 — o detalhe exato do sinal: eles perguntarão como estás e te darão
      // DOIS PÃES, que tomarás das suas mãos. A oferta muda de mão em cena.
      b(4, { by: "patriarca", q: "e te darão dois pães",
        env: { glory: 0.62, night: 0.2 }, cast: [
        C("patriarca", -305, "stand", { dy: 0.42, facing: 1, id: "samuel", glow: 0.36 }),
        C("homem", 60, "point", { dy: 0.56, facing: -1, id: "homem-dos-paes" }),
        C("homem", 170, "stand", { dy: 0.5, facing: -1, id: "homem-dos-cabritos" }),
        C("homem", 250, "stand", { dy: 0.46, facing: -1, id: "homem-do-odre" }),
        C("rei", -80, "bow", { dy: 0.62, facing: 1, id: "saul" }),
      ] }),
      // v.5 — TERCEIRO SINAL: o outeiro de Deus, com a GUARNIÇÃO DOS FILISTEUS
      // encostada de um lado e, do outro, o bando de profetas DESCENDO do alto
      // com saltérios, tambores, flautas e harpas — profetizando pelo caminho.
      b(5, { by: "patriarca", q: "encontrarás um grupo de profetas que descem do alto",
        set: "outeiro", props: OUTEIRO,
        env: { terrain: "field", night: 0.24, glory: 0.66, verdure: 0.26 }, cast: [
        C("patriarca", -300, "point", { dy: 0.42, facing: 1, id: "samuel", glow: 0.44 }),
        C("homem", -40, "raise", { dy: 0.5, facing: 1, id: "profeta-do-alto1" }),
        C("homem", 60, "walk", { dy: 0.56, facing: 1, id: "profeta-do-alto2" }),
        C("homem", 150, "raise", { dy: 0.46, facing: 1, id: "profeta-do-alto3" }),
        C("homem", 270, "stand", { dy: 0.34, facing: -1, id: "filisteu-da-guarnicao" }),
        C("rei", -160, "stand", { dy: 0.6, facing: 1, id: "saul" }),
      ] }),
      // v.6 — a promessa que muda tudo: o Espírito se apoderará DE TI, e tornar-
      // te-ás UM OUTRO HOMEM. Deus não fala aqui — Ele AGE: glória alta, Saul em
      // `raise`, sem balão do céu.
      b(6, { by: "patriarca", q: "e tornar-te-ás um outro homem",
        env: { glory: 0.86, night: 0.16 }, cast: [
        C("patriarca", -290, "raise", { dy: 0.42, facing: 1, id: "samuel", glow: 0.5 }),
        C("rei", -60, "raise", { dy: 0.6, facing: 1, id: "saul", glow: 0.3 }),
        C("homem", 90, "raise", { dy: 0.5, facing: 1, id: "profeta-do-alto1" }),
        C("homem", 200, "raise", { dy: 0.44, facing: 1, id: "profeta-do-alto2" }),
      ] }),
      // v.7 — a licença larga do profeta: quando os sinais vierem, FAZE O QUE
      // ACHAR A TUA MÃO, porque Deus é contigo. Voltamos à estrada de Ramá, os
      // dois frente a frente outra vez.
      b(7, { by: "patriarca", q: "faze o que achar a tua mão, porque Deus é contigo",
        set: "rama", props: RAMA,
        env: { terrain: "field", night: 0.26, glory: 0.7, verdure: 0.26 }, cast: [
        C("patriarca", -80, "point", { dy: 0.5, facing: 1, id: "samuel", glow: 0.5 }),
        C("rei", 90, "stand", { dy: 0.56, facing: -1, id: "saul" }),
      ] }),
      // v.8 — e a marcação que um dia o condenará (13:8): DESCERÁS A GILGAL e
      // ali SETE DIAS ESPERARÁS até que eu venha. Samuel aponta o sul; o relógio
      // do reino começa a correr neste versículo.
      b(8, { by: "patriarca", q: "ali sete dias esperarás",
        env: { glory: 0.6, night: 0.3 }, cast: [
        C("patriarca", -80, "raise", { dy: 0.5, facing: 1, id: "samuel", glow: 0.46 }),
        C("rei", 110, "bow", { dy: 0.58, facing: -1, id: "saul" }),
      ] }),
      // v.9 — o milagre mais silencioso do capítulo: virando as costas para
      // partir, DEUS LHE MUDOU O CORAÇÃO EM OUTRO. Saul de costas, indo embora,
      // com a glória já sobre ele; Samuel fica para trás.
      b(9, { q: "Deus lhe mudou o coração em outro",
        env: { glory: 0.8, night: 0.2 }, cast: [
        C("rei", 60, "walk", { dy: 0.58, facing: 1, id: "saul", glow: 0.4 }),
        C("patriarca", -190, "stand", { dy: 0.48, facing: 1, id: "samuel", glow: 0.3 }),
      ] }),
      // v.10 — cumprimento do terceiro sinal: chegando ao outeiro, o bando lhe
      // sai ao encontro e o Espírito de Deus se apodera dele — e ele PROFETIZA
      // NO MEIO DELES. Saul ao centro, todos em `raise`.
      b(10, { q: "e o Espírito de Deus se apoderou dele",
        set: "outeiro", props: OUTEIRO,
        env: { terrain: "field", night: 0.18, glory: 0.9, verdure: 0.28 }, cast: [
        C("rei", 0, "raise", { dy: 0.58, facing: 1, id: "saul", glow: 0.55 }),
        C("homem", -140, "raise", { dy: 0.52, facing: 1, id: "profeta-do-alto1" }),
        C("homem", 120, "raise", { dy: 0.5, facing: -1, id: "profeta-do-alto2" }),
        C("homem", 215, "raise", { dy: 0.44, facing: -1, id: "profeta-do-alto3" }),
      ] }),
      // v.11 — o espanto da vizinhança: quem o conhecia de antes não reconhece
      // o filho de Quis ali. A fala é do POVO, um ao seu companheiro — o
      // primeiro `homem` do elenco é o vizinho que comenta.
      b(11, { by: "homem", q: "então disse o povo, cada um ao seu companheiro:",
        env: { glory: 0.72, night: 0.24 }, cast: [
        C("homem", -190, "point", { dy: 0.6, facing: 1, id: "conhecido-de-gibea" }),
        C("homem", -280, "stand", { dy: 0.54, facing: 1, id: "homem-do-outeiro" }),
        C("rei", 20, "raise", { dy: 0.56, facing: -1, id: "saul", glow: 0.5 }),
        C("homem", 150, "raise", { dy: 0.5, facing: -1, id: "profeta-do-alto1" }),
        C("homem", 240, "raise", { dy: 0.44, facing: -1, id: "profeta-do-alto2" }),
      ] }),
      // v.12 — a réplica de um homem dali ("pois quem é o pai deles?") vira
      // PROVÉRBIO em Israel. Agora o falante é o homem do outeiro: ele vem para
      // a frente e passa a ser o PRIMEIRO `homem` do elenco.
      b(12, { by: "homem", q: "e disse:",
        env: { glory: 0.66, night: 0.28 }, cast: [
        C("homem", -230, "raise", { dy: 0.62, facing: 1, id: "homem-do-outeiro" }),
        C("homem", -120, "stand", { dy: 0.56, facing: 1, id: "conhecido-de-gibea" }),
        C("rei", 60, "stand", { dy: 0.54, facing: -1, id: "saul", glow: 0.4 }),
        C("homem", 200, "raise", { dy: 0.46, facing: -1, id: "profeta-do-alto1" }),
      ] }),
      // v.13 — acabando de profetizar, FOI AO ALTO: Saul sobe sozinho para o
      // lugar do sacrifício, no fundo do quadro, e a cena se esvazia atrás dele.
      b(13, { q: "foi ao alto",
        env: { glory: 0.6, night: 0.32 }, cast: [
        C("rei", -160, "walk", { dy: 0.34, facing: -1, id: "saul", glow: 0.32 }),
        C("homem", 130, "stand", { dy: 0.52, facing: -1, id: "profeta-do-alto1" }),
        C("homem", 230, "stand", { dy: 0.46, facing: -1, id: "homem-do-outeiro" }),
      ] }),
      // v.14 — de volta a Gibeá: o TIO intercepta Saul e o moço no pátio.
      // "Aonde fostes?" — pergunta de família, feita a quem acabou de ser ungido.
      b(14, { by: "anciao", q: "E disse-lhe o tio de Saul, a ele e ao seu moço",
        set: "gibea-patio", props: GIBEA_PATIO,
        env: { terrain: "city", night: 0.36, glory: 0.3, verdure: 0.22 }, cast: [
        C("anciao", 120, "point", { dy: 0.5, facing: -1, id: "tio-de-saul" }),
        C("rei", -80, "stand", { dy: 0.56, facing: 1, id: "saul" }),
        C("servo", -210, "stand", { dy: 0.5, facing: 1, id: "moco-de-saul" }),
      ] }),
      // v.15 — o tio insiste, e a pergunta afunila: DECLARA-ME o que vos disse
      // Samuel. Ele se aproxima; Saul recua meio passo.
      b(15, { by: "anciao", q: "Então disse o tio de Saul:",
        env: { night: 0.4, glory: 0.26 }, cast: [
        C("anciao", 40, "point", { dy: 0.56, facing: -1, id: "tio-de-saul" }),
        C("rei", -130, "stand", { dy: 0.58, facing: 1, id: "saul" }),
        C("servo", -250, "bow", { dy: 0.5, facing: 1, id: "moco-de-saul" }),
      ] }),
      // v.16 — a meia-verdade: conta das jumentas e CALA o negócio do reino. O
      // segredo é o coração do beat — Saul de lado, sem encarar o tio.
      b(16, { by: "rei", q: "Porém o negócio do reino, de que Samuel falara, não lhe declarou",
        env: { night: 0.44, glory: 0.22 }, cast: [
        C("rei", -110, "stand", { dy: 0.58, facing: -1, id: "saul" }),
        C("anciao", 90, "stand", { dy: 0.54, facing: -1, id: "tio-de-saul" }),
        C("servo", -260, "stand", { dy: 0.48, facing: 1, id: "moco-de-saul" }),
      ] }),
      // v.17 — MIZPÁ: Samuel convoca o povo AO SENHOR. É convocação solene, não
      // festa — por isso figuras individuais, e não a multidão que comemora.
      b(17, { q: "Convocou, pois, Samuel o povo ao Senhor, em Mizpá",
        set: "mizpa", props: MIZPA,
        env: { terrain: "field", night: 0.28, glory: 0.52, verdure: 0.24 }, cast: [
        C("patriarca", -120, "raise", { dy: 0.44, facing: 1, id: "samuel", glow: 0.45 }),
        C("anciao", 90, "stand", { dy: 0.5, facing: -1, id: "anciao-de-mizpa" }),
        C("homem", 190, "stand", { dy: 0.56, facing: -1, id: "israelita-de-mizpa1" }),
        C("homem", 270, "stand", { dy: 0.48, facing: -1, id: "israelita-de-mizpa2" }),
        C("mulherComum", 20, "stand", { dy: 0.62, facing: -1, id: "mulher-de-mizpa" }),
      ] }),
      // v.18 — Samuel abre com a FÓRMULA DE PROFETA ("assim disse o Senhor Deus
      // de Israel") e recita o Êxodo. É mediador visível: `by:"patriarca"`,
      // NUNCA voz do céu — a palavra é de Deus, a boca é de Samuel.
      b(18, { by: "patriarca", q: "Assim disse o Senhor Deus de Israel:",
        env: { glory: 0.66, night: 0.24 }, cast: [
        C("patriarca", -140, "raise", { dy: 0.46, facing: 1, id: "samuel", glow: 0.55 }),
        C("anciao", 70, "bow", { dy: 0.5, facing: -1, id: "anciao-de-mizpa" }),
        C("homem", 180, "stand", { dy: 0.56, facing: -1, id: "israelita-de-mizpa1" }),
        C("homem", 265, "stand", { dy: 0.48, facing: -1, id: "israelita-de-mizpa2" }),
        C("mulherComum", 10, "stand", { dy: 0.64, facing: -1, id: "mulher-de-mizpa" }),
      ] }),
      // v.19 — a acusação: MAS VÓS TENDES REJEITADO HOJE A VOSSO DEUS. E a
      // ordem de formação: ponde-vos perante o Senhor, pelas tribos e milhares.
      // A glória cai um pouco, e o povo se enfileira.
      b(19, { by: "patriarca", q: "Mas vós tendes rejeitado hoje a vosso Deus",
        env: { glory: 0.44, night: 0.36, storm: 0.14 }, cast: [
        C("patriarca", -170, "point", { dy: 0.46, facing: 1, id: "samuel", glow: 0.5 }),
        C("anciao", 40, "bow", { dy: 0.52, facing: -1, id: "anciao-de-mizpa" }),
        C("homem", 140, "bow", { dy: 0.58, facing: -1, id: "israelita-de-mizpa1" }),
        C("homem", 240, "stand", { dy: 0.5, facing: -1, id: "israelita-de-mizpa2" }),
        C("mulherComum", 310, "bow", { dy: 0.44, facing: -1, id: "mulher-de-mizpa" }),
      ] }),
      // v.20 — a SORTE começa a apertar: fazendo chegar todas as tribos,
      // TOMOU-SE A TRIBO DE BENJAMIM. O povo se abre e os benjamitas avançam.
      b(20, { q: "tomou-se a tribo de Benjamim",
        env: { glory: 0.5, night: 0.32, storm: 0.1 }, cast: [
        C("patriarca", -180, "raise", { dy: 0.44, facing: 1, id: "samuel", glow: 0.5 }),
        C("homem", 20, "walk", { dy: 0.6, facing: 1, id: "israelita-de-mizpa1" }),
        C("anciao", 150, "stand", { dy: 0.5, facing: -1, id: "anciao-de-mizpa" }),
        C("homem", 260, "stand", { dy: 0.44, facing: -1, id: "israelita-de-mizpa2" }),
      ] }),
      // v.21 — a sorte cai na família de Matri e em SAUL, FILHO DE QUIS — e o
      // eleito NÃO ESTÁ. Saul sai do elenco: só o povo procurando, e a bagagem
      // ali no canto, calada, com o rei de Israel dentro.
      b(21, { q: "e o buscaram, porém não se achou",
        env: { glory: 0.4, night: 0.4, storm: 0.16 }, cast: [
        C("patriarca", -200, "stand", { dy: 0.44, facing: 1, id: "samuel", glow: 0.42 }),
        C("homem", -40, "point", { dy: 0.62, facing: 1, id: "israelita-de-mizpa1" }),
        C("homem", 70, "walk", { dy: 0.56, facing: 1, id: "israelita-de-mizpa2" }),
        C("anciao", 230, "stand", { dy: 0.48, facing: -1, id: "anciao-de-mizpa" }),
      ] }),
      // v.22 — A ÚNICA VOZ DO CÉU deste trecho: tornam a perguntar ao SENHOR, e
      // Ele responde SEM MEDIADOR — "eis que se escondeu entre a bagagem".
      // `by:"deus"`, glória alta, nenhuma figura dourada ao centro.
      dv(22, "E disse o Senhor:", {
        env: { glory: 0.82, night: 0.28, storm: 0.08 }, cast: [
        C("patriarca", -200, "kneel", { dy: 0.46, facing: 1, id: "samuel", glow: 0.4 }),
        C("anciao", -80, "bow", { dy: 0.54, facing: 1, id: "anciao-de-mizpa" }),
        C("homem", 40, "stand", { dy: 0.6, facing: 1, id: "israelita-de-mizpa1" }),
        C("homem", 250, "point", { dy: 0.5, facing: -1, id: "israelita-de-mizpa2" }),
      ] }),
      // v.23 — correm, tiram-no dali, e ele se põe NO MEIO DO POVO: mais alto do
      // que todos DO OMBRO PARA CIMA. Saul ao centro com escala maior; os outros
      // mais baixos e ao redor.
      b(23, { q: "era mais alto do que todo o povo desde o ombro para cima",
        env: { glory: 0.62, night: 0.24 }, cast: [
        C("rei", 20, "stand", { dy: 0.6, facing: 1, id: "saul", scale: 1.26 }),
        C("homem", -130, "stand", { dy: 0.58, facing: -1, id: "israelita-de-mizpa1", scale: 0.94 }),
        C("homem", 170, "stand", { dy: 0.56, facing: 1, id: "israelita-de-mizpa2", scale: 0.94 }),
        C("patriarca", -250, "point", { dy: 0.46, facing: 1, id: "samuel", glow: 0.45 }),
        C("anciao", 270, "stand", { dy: 0.48, facing: 1, id: "anciao-de-mizpa" }),
      ] }),
      // v.24 — "VEDES JÁ A QUEM O SENHOR ESCOLHEU?" — e o povo jubila: VIVA O
      // REI! Aqui, e só aqui em Mizpá, cabe a `multidao` (que o motor sempre
      // desenha comemorando): o júbilo é real e está no texto.
      b(24, { by: "patriarca", q: "Vedes já a quem o Senhor escolheu?",
        env: { glory: 0.9, night: 0.12, storm: 0, verdure: 0.3 }, cast: [
        C("patriarca", -230, "raise", { dy: 0.46, facing: 1, id: "samuel", glow: 0.6 }),
        C("rei", -20, "stand", { dy: 0.58, facing: 1, id: "saul", scale: 1.26, glow: 0.35 }),
        C("multidao", 190, "raise", { dy: 0.5, facing: -1, id: "povo-de-mizpa" }),
      ] }),
      // v.25 — o DIREITO DO REINO declarado, ESCRITO NUM LIVRO e posto perante o
      // SENHOR: o rolo entra em cena e Samuel escreve. Depois despede o povo,
      // cada um para sua casa.
      b(25, { by: "patriarca", q: "escreveu-o num livro, e pô-lo perante o Senhor",
        set: "mizpa-livro", props: MIZPA_LIVRO,
        env: { terrain: "field", glory: 0.76, night: 0.2, verdure: 0.28 }, cast: [
        C("patriarca", -60, "write", { dy: 0.56, facing: 1, id: "samuel", glow: 0.55 }),
        C("rei", 130, "stand", { dy: 0.5, facing: -1, id: "saul" }),
        C("anciao", 250, "bow", { dy: 0.46, facing: -1, id: "anciao-de-mizpa" }),
        C("homem", -230, "walk", { dy: 0.6, facing: -1, id: "israelita-de-mizpa1" }),
      ] }),
      // v.26 — Saul volta À SUA CASA, EM GIBEÁ, e com ele vão do exército
      // AQUELES CUJOS CORAÇÕES DEUS TOCARA: uma escolta de graça, não de posto.
      b(26, { q: "aqueles cujos corações Deus tocara",
        set: "gibea-casa", props: GIBEA_CASA,
        env: { terrain: "city", night: 0.3, glory: 0.6, verdure: 0.2 }, cast: [
        C("rei", -60, "walk", { dy: 0.56, facing: 1, id: "saul", glow: 0.28 }),
        C("homem", -190, "walk", { dy: 0.5, facing: 1, id: "valente-de-gibea1" }),
        C("homem", -280, "walk", { dy: 0.44, facing: 1, id: "valente-de-gibea2" }),
      ] }),
      // v.27 — e o contra-coro: os FILHOS DE BELIAL, "é este o que nos há de
      // livrar?", que o desprezam e não lhe trazem presente. Noite subindo,
      // glória caindo, Saul de costas — ele SE FEZ COMO SURDO.
      b(27, { by: "homem", q: "É este o que nos há de livrar?",
        env: { terrain: "city", night: 0.52, glory: 0.2, storm: 0.18, verdure: 0.16 }, cast: [
        C("homem", 130, "point", { dy: 0.58, facing: -1, id: "filho-de-belial1" }),
        C("homem", 240, "stand", { dy: 0.52, facing: -1, id: "filho-de-belial2" }),
        C("rei", -110, "stand", { dy: 0.54, facing: 1, id: "saul" }),
        C("homem", -250, "stand", { dy: 0.48, facing: -1, id: "valente-de-gibea1" }),
      ] }),
    ],
  },

  // ---------------------------------------------------------------- 1Sm 11
  11: {
    start: { terrain: "city", night: 0.48, glory: 0.14, storm: 0.2, fire: 0.16, water: 0, verdure: 0.18 },
    beats: [
      // v.1 — NAÁS sobe e SITIA Jabes-Gileade. Os homens da cidade, do lado de
      // dentro do portão fechado, pedem aliança: e te serviremos. Sem glow em
      // ninguém — não há glória neste cerco.
      b(1, { by: "homem", q: "e disseram todos os homens de Jabes a Naás:",
        set: "jabes", props: JABES,
        env: { terrain: "city", night: 0.5, glory: 0.12, storm: 0.22, fire: 0.18, verdure: 0.16 }, cast: [
        C("homem", -110, "stand", { dy: 0.56, facing: 1, id: "homem-de-jabes1" }),
        C("homem", -200, "stand", { dy: 0.5, facing: 1, id: "homem-de-jabes2" }),
        C("rei", 110, "stand", { dy: 0.5, facing: -1, id: "naas" }),
        C("homem", 230, "stand", { dy: 0.44, facing: -1, id: "amonita-do-cerco1" }),
      ] }),
      // v.2 — A CONDIÇÃO INFAME: arrancar a todos o OLHO DIREITO, "e assim ponha
      // esta afronta sobre TODO O ISRAEL". Não é crueldade avulsa: é humilhação
      // pública calculada. Naás avança, Jabes se curva.
      b(2, { by: "rei", q: "Porém Naás, amonita, lhes disse:",
        env: { night: 0.58, glory: 0.08, storm: 0.3, fire: 0.2 }, cast: [
        C("rei", 60, "point", { dy: 0.54, facing: -1, id: "naas" }),
        C("homem", 200, "stand", { dy: 0.46, facing: -1, id: "amonita-do-cerco1" }),
        C("homem", 290, "stand", { dy: 0.4, facing: -1, id: "amonita-do-cerco2" }),
        C("homem", -130, "bow", { dy: 0.6, facing: 1, id: "homem-de-jabes1" }),
        C("homem", -230, "bow", { dy: 0.52, facing: 1, id: "homem-de-jabes2" }),
      ] }),
      // v.3 — os ANCIÃOS pedem SETE DIAS para enviar mensageiros por todos os
      // termos de Israel — e se ninguém nos livrar, então viremos a ti. O
      // mensageiro já está de pé, pronto para sair correndo.
      b(3, { by: "anciao", q: "Então os anciãos de Jabes lhe disseram:",
        env: { night: 0.54, glory: 0.14, storm: 0.24 }, cast: [
        C("anciao", -90, "point", { dy: 0.56, facing: 1, id: "anciao-de-jabes" }),
        C("servo", -230, "walk", { dy: 0.62, facing: -1, id: "mensageiro-de-jabes" }),
        C("homem", -160, "stand", { dy: 0.5, facing: 1, id: "homem-de-jabes1" }),
        C("rei", 130, "stand", { dy: 0.48, facing: -1, id: "naas" }),
      ] }),
      // v.4 — os mensageiros chegam a GIBEÁ DE SAUL e falam aos ouvidos do povo:
      // todo o povo LEVANTOU A SUA VOZ E CHOROU. Cena de luto — figuras
      // individuais em `bow`/`kneel`, jamais a multidão que comemora.
      b(4, { q: "Então todo o povo levantou a sua voz, e chorou",
        set: "gibea-casa", props: GIBEA_CASA,
        env: { terrain: "city", night: 0.56, glory: 0.1, storm: 0.2, verdure: 0.16 }, cast: [
        C("servo", 40, "point", { dy: 0.5, facing: -1, id: "mensageiro-de-jabes" }),
        C("homem", -100, "bow", { dy: 0.6, facing: 1, id: "gibeonita-de-saul" }),
        C("mulherComum", -210, "kneel", { dy: 0.56, facing: 1, id: "mulher-de-gibea" }),
        C("anciao", 190, "bow", { dy: 0.48, facing: -1, id: "anciao-de-gibea" }),
      ] }),
      // v.5 — e eis que SAUL VINHA DO CAMPO, ATRÁS DOS BOIS. O rei ungido de
      // Israel ainda é lavrador: a junta na frente, o arado atrás, e a pergunta
      // que ele faz sem saber o que vai desencadear.
      b(5, { by: "rei", q: "E eis que Saul vinha do campo, atrás dos bois",
        set: "campo-bois", props: CAMPO_BOIS,
        env: { terrain: "field", night: 0.42, glory: 0.2, storm: 0.16, verdure: 0.4 }, cast: [
        C("rei", -80, "walk", { dy: 0.6, facing: 1, id: "saul" }),
        C("rebanho", 60, "stand", { dy: 0.52, facing: 1, id: "junta-de-bois" }),
        C("servo", 200, "point", { dy: 0.5, facing: -1, id: "mensageiro-de-jabes" }),
      ] }),
      // v.6 — o ESPÍRITO DE DEUS se apodera de Saul ouvindo aquelas palavras, e
      // a sua IRA se acende em grande maneira. Deus não fala: age. Tempestade
      // alta, noite média, glória do Espírito por cima da fúria.
      b(6, { q: "acendeu-se em grande maneira a sua ira",
        env: { terrain: "field", night: 0.5, glory: 0.52, storm: 0.72, fire: 0.24, verdure: 0.3 }, cast: [
        C("rei", -30, "raise", { dy: 0.62, facing: 1, id: "saul", scale: 1.16, glow: 0.42 }),
        C("rebanho", 130, "stand", { dy: 0.5, facing: -1, id: "junta-de-bois" }),
        C("servo", 250, "bow", { dy: 0.48, facing: -1, id: "mensageiro-de-jabes" }),
      ] }),
      // v.7 — a JUNTA DE BOIS cortada em pedaços e mandada por todos os termos
      // pelas mãos dos mensageiros: quem não sair, assim se fará aos seus bois.
      // Cai o TEMOR DO SENHOR e o povo sai COMO UM SÓ HOMEM.
      b(7, { by: "rei", q: "E tomou uma junta de bois, e cortou-os em pedaços",
        set: "ira", props: IRA,
        env: { terrain: "field", night: 0.56, glory: 0.46, storm: 0.82, fire: 0.3, verdure: 0.24 }, cast: [
        C("rei", -110, "raise", { dy: 0.62, facing: 1, id: "saul", scale: 1.16, glow: 0.4 }),
        C("rebanho", 170, "stand", { dy: 0.46, facing: -1, id: "junta-de-bois" }),
        C("servo", 260, "walk", { dy: 0.56, facing: -1, id: "mensageiro-de-jabes" }),
        C("servo", -280, "walk", { dy: 0.5, facing: 1, id: "mensageiro-de-israel" }),
      ] }),
      // v.8 — a CONTAGEM em BEZEQUE: trezentos mil de Israel e trinta mil de
      // Judá. Aqui a `multidao` cabe — é o povo saindo como um só homem, sem
      // morte no quadro; e leva `id` para não cair em ficha genérica.
      b(8, { q: "trezentos mil, e dos homens de Judá trinta mil",
        set: "bezeque", props: BEZEQUE,
        env: { terrain: "field", night: 0.24, glory: 0.5, storm: 0.12, fire: 0, verdure: 0.32 }, cast: [
        C("rei", -170, "raise", { dy: 0.56, facing: 1, id: "saul", scale: 1.14 }),
        C("multidao", 80, "raise", { dy: 0.5, facing: -1, id: "exercito-de-bezeque" }),
        C("homem", -290, "stand", { dy: 0.6, facing: 1, id: "homem-de-juda-de-bezeque" }),
      ] }),
      // v.9 — a resposta que sobe a Jabes: AMANHÃ, EM AQUECENDO O SOL, VOS VIRÁ
      // LIVRAMENTO. Os mensageiros partem e os sitiados se alegram. Sol no céu,
      // glória subindo — a hora marcada é parte da promessa.
      b(9, { by: "rei", q: "Amanhã, em aquecendo o sol, vos virá livramento",
        env: { glory: 0.68, night: 0.18, storm: 0.06, verdure: 0.34 }, cast: [
        C("rei", -140, "point", { dy: 0.54, facing: 1, id: "saul", scale: 1.14 }),
        C("servo", 60, "walk", { dy: 0.62, facing: -1, id: "mensageiro-de-jabes" }),
        C("multidao", 220, "raise", { dy: 0.46, facing: -1, id: "exercito-de-bezeque" }),
      ] }),
      // v.10 — e Jabes responde a Naás com a frase de duplo fundo: AMANHÃ
      // SAIREMOS A VÓS, e nos fareis o que parecer bem aos vossos olhos. O
      // amonita ouve rendição; o que vem é a vigília da manhã.
      b(10, { by: "homem", q: "E os homens de Jabes disseram aos amonitas:",
        set: "jabes", props: JABES,
        env: { terrain: "city", night: 0.52, glory: 0.2, storm: 0.16, fire: 0.18, verdure: 0.16 }, cast: [
        C("homem", -120, "stand", { dy: 0.56, facing: 1, id: "homem-de-jabes1" }),
        C("anciao", -230, "stand", { dy: 0.5, facing: 1, id: "anciao-de-jabes" }),
        C("rei", 120, "stand", { dy: 0.5, facing: -1, id: "naas" }),
        C("homem", 250, "stand", { dy: 0.42, facing: -1, id: "amonita-do-cerco1" }),
      ] }),
      // v.11 — TRÊS COMPANHIAS no meio do arraial PELA VIGÍLIA DA MANHÃ: ferem
      // os amonitas até o dia aquecer, e os restantes se espalham de modo que
      // NÃO FICARAM DOIS DELES JUNTOS. Cena de morte: `lie` individuais, nunca
      // multidão. O sol nasce baixo por cima do arraial desfeito.
      b(11, { q: "não ficaram dois deles juntos",
        set: "arraial", props: ARRAIAL,
        env: { terrain: "field", night: 0.4, glory: 0.55, storm: 0.3, fire: 0.22, verdure: 0.24 }, cast: [
        C("rei", -120, "raise", { dy: 0.6, facing: 1, id: "saul", scale: 1.18, glow: 0.35 }),
        C("homem", 60, "lie", { dy: 0.64, id: "amonita-do-cerco1" }),
        C("homem", 180, "lie", { dy: 0.54, id: "amonita-do-cerco2" }),
        C("rei", 290, "walk", { dy: 0.44, facing: -1, id: "naas" }),
        C("homem", -250, "point", { dy: 0.56, facing: 1, id: "israelita-de-bezeque" }),
      ] }),
      // v.12 — no calor da vitória o povo cobra o acerto de contas: QUEM É
      // AQUELE que dizia que Saul não reinaria? Dai-nos aqueles homens. Samuel
      // entra em cena; o povo aponta para trás, para Gibeá.
      b(12, { by: "homem", q: "Então disse o povo a Samuel:",
        env: { terrain: "field", night: 0.34, glory: 0.5, storm: 0.2, verdure: 0.26 }, cast: [
        C("homem", -60, "point", { dy: 0.62, facing: 1, id: "israelita-de-bezeque" }),
        C("patriarca", 130, "stand", { dy: 0.5, facing: -1, id: "samuel", glow: 0.4 }),
        C("rei", -200, "stand", { dy: 0.56, facing: 1, id: "saul", scale: 1.14 }),
      ] }),
      // v.13 — e vem o melhor dia de Saul: HOJE NÃO MORRERÁ NENHUM, pois HOJE
      // TEM FEITO O SENHOR UM LIVRAMENTO EM ISRAEL. A vitória é de Deus, e por
      // isso a anistia é do rei. Glória alta, tempestade baixando.
      b(13, { by: "rei", q: "Porém Saul disse:",
        env: { night: 0.22, glory: 0.76, storm: 0.08, verdure: 0.3 }, cast: [
        C("rei", -110, "raise", { dy: 0.58, facing: 1, id: "saul", scale: 1.14, glow: 0.3 }),
        C("patriarca", 120, "stand", { dy: 0.48, facing: -1, id: "samuel", glow: 0.45 }),
        C("homem", 250, "bow", { dy: 0.56, facing: -1, id: "israelita-de-bezeque" }),
      ] }),
      // v.14 — Samuel toma a palavra e dá o destino: VINDE, VAMOS NÓS A GILGAL,
      // E RENOVEMOS ALI O REINO. O que foi feito em segredo e por sorte agora
      // será público e diante do SENHOR.
      b(14, { by: "patriarca", q: "E disse Samuel ao povo:",
        env: { night: 0.2, glory: 0.7, storm: 0.05, verdure: 0.32 }, cast: [
        C("patriarca", -100, "raise", { dy: 0.5, facing: 1, id: "samuel", glow: 0.55 }),
        C("rei", 100, "stand", { dy: 0.56, facing: -1, id: "saul", scale: 1.14 }),
        C("homem", 240, "stand", { dy: 0.5, facing: -1, id: "israelita-de-bezeque" }),
      ] }),
      // v.15 — GILGAL: proclamam Saul por rei PERANTE O SENHOR, oferecem OFERTAS
      // PACÍFICAS e SAUL SE ALEGROU MUITO com todos os homens de Israel. Aqui a
      // multidão é legítima — é alegria de verdade; e o altar arde de fato.
      b(15, { q: "Saul se alegrou muito ali com todos os homens de Israel",
        set: "gilgal", props: GILGAL,
        env: { terrain: "field", night: 0.14, glory: 0.92, storm: 0, fire: 0.4, verdure: 0.38 }, cast: [
        C("rei", -110, "raise", { dy: 0.58, facing: 1, id: "saul", scale: 1.16, glow: 0.35 }),
        C("patriarca", -250, "raise", { dy: 0.46, facing: 1, id: "samuel", glow: 0.6 }),
        C("multidao", 170, "raise", { dy: 0.52, facing: -1, id: "povo-de-gilgal" }),
      ] }),
    ],
  },

  // ---------------------------------------------------------------- 1Sm 12
  12: {
    start: { terrain: "field", night: 0.2, glory: 0.5, storm: 0.04, fire: 0, water: 0, verdure: 0.34 },
    beats: [
      // v.1 — a DESPEDIDA começa com uma confissão: OUVI A VOSSA VOZ em tudo
      // quanto me dissestes, e CONSTITUÍ SOBRE VÓS UM REI. Samuel de pé diante
      // da assembleia de Gilgal, com os feixes da sega já em pé ao fundo.
      b(1, { by: "patriarca", q: "Então disse Samuel a todo o Israel:",
        set: "gilgal-assembleia", props: GILGAL_ASSEMBLEIA,
        env: { terrain: "field", night: 0.2, glory: 0.56, storm: 0.04, verdure: 0.36 }, cast: [
        C("patriarca", -120, "raise", { dy: 0.5, facing: 1, id: "samuel", glow: 0.55 }),
        C("rei", 70, "stand", { dy: 0.54, facing: -1, id: "saul" }),
        C("anciao", 200, "stand", { dy: 0.48, facing: -1, id: "anciao-de-gilgal" }),
        C("homem", 290, "stand", { dy: 0.58, facing: -1, id: "israelita-de-gilgal1" }),
      ] }),
      // v.2 — EU JÁ ENVELHECI E ENCANECI: o rei vai adiante de vós, e os meus
      // filhos ficam CONVOSCO. Saul dá um passo à frente; Joel e Abias, os
      // filhos que torceram o direito (8:3), aparecem atrás do pai.
      b(2, { by: "patriarca", q: "Eu já envelheci e encaneci",
        env: { glory: 0.5, night: 0.24 }, cast: [
        C("patriarca", -180, "stand", { dy: 0.5, facing: 1, id: "samuel", glow: 0.45 }),
        C("homem", -290, "stand", { dy: 0.44, facing: 1, id: "joel-filho-samuel" }),
        C("homem", -240, "stand", { dy: 0.38, facing: 1, id: "abias-filho-samuel" }),
        C("rei", 30, "walk", { dy: 0.56, facing: -1, id: "saul" }),
        C("anciao", 200, "stand", { dy: 0.48, facing: -1, id: "anciao-de-gilgal" }),
      ] }),
      // v.3 — EIS-ME AQUI: o juiz se põe em julgamento perante o SENHOR E
      // PERANTE O SEU UNGIDO — a quem o boi tomei? a quem defraudei? de quem
      // recebi suborno? Samuel de braços abertos, o rei como testemunha.
      b(3, { by: "patriarca", q: "Eis-me aqui; testificai contra mim perante o Senhor",
        env: { glory: 0.68, night: 0.2 }, cast: [
        C("patriarca", -140, "raise", { dy: 0.52, facing: 1, id: "samuel", glow: 0.6 }),
        C("rei", 110, "stand", { dy: 0.5, facing: -1, id: "saul" }),
        C("homem", -20, "stand", { dy: 0.6, facing: -1, id: "israelita-de-gilgal1" }),
        C("anciao", 230, "stand", { dy: 0.46, facing: -1, id: "anciao-de-gilgal" }),
        C("mulherComum", 300, "stand", { dy: 0.56, facing: -1, id: "mulher-de-gilgal" }),
      ] }),
      // v.4 — a ABSOLVIÇÃO pública: em nada nos defraudaste, nem nos oprimiste,
      // nem recebeste coisa alguma da mão de ninguém. Fala o povo — o primeiro
      // `homem` do elenco é quem responde.
      b(4, { by: "homem", q: "Então disseram:",
        env: { glory: 0.6, night: 0.22 }, cast: [
        C("homem", 40, "raise", { dy: 0.62, facing: -1, id: "israelita-de-gilgal1" }),
        C("homem", 150, "stand", { dy: 0.54, facing: -1, id: "israelita-de-gilgal2" }),
        C("patriarca", -160, "stand", { dy: 0.5, facing: 1, id: "samuel", glow: 0.5 }),
        C("rei", -40, "stand", { dy: 0.46, facing: -1, id: "saul" }),
      ] }),
      // v.5 — Samuel lacra o testemunho: O SENHOR SEJA TESTEMUNHA CONTRA VÓS, e
      // o seu ungido seja hoje testemunha. E o povo confirma: "Ele é
      // testemunha". Glória subindo sobre o juramento.
      b(5, { by: "patriarca", q: "O Senhor seja testemunha contra vós",
        env: { glory: 0.74, night: 0.18 }, cast: [
        C("patriarca", -150, "raise", { dy: 0.5, facing: 1, id: "samuel", glow: 0.6 }),
        C("rei", 60, "raise", { dy: 0.5, facing: -1, id: "saul" }),
        C("homem", 190, "bow", { dy: 0.6, facing: -1, id: "israelita-de-gilgal1" }),
        C("anciao", 280, "bow", { dy: 0.46, facing: -1, id: "anciao-de-gilgal" }),
      ] }),
      // v.6 — vira a chave do discurso: agora não é mais sobre Samuel, é sobre O
      // SENHOR — o que ESCOLHEU A MOISÉS E A ARÃO e tirou vossos pais do Egito.
      b(6, { by: "patriarca", q: "Então disse Samuel ao povo:",
        env: { glory: 0.66, night: 0.22 }, cast: [
        C("patriarca", -110, "point", { dy: 0.52, facing: 1, id: "samuel", glow: 0.55 }),
        C("homem", 80, "stand", { dy: 0.6, facing: -1, id: "israelita-de-gilgal1" }),
        C("anciao", 210, "stand", { dy: 0.48, facing: -1, id: "anciao-de-gilgal" }),
        C("rei", -250, "stand", { dy: 0.44, facing: 1, id: "saul" }),
      ] }),
      // v.7 — PONDE-VOS AQUI EM PÉ: o profeta abre o processo e vai PLEITEAR com
      // Israel sobre TODOS OS ATOS DE JUSTIÇA DO SENHOR. Todo mundo de pé.
      b(7, { by: "patriarca", q: "ponde-vos aqui em pé, e pleitearei convosco perante o Senhor",
        env: { glory: 0.7, night: 0.2 }, cast: [
        C("patriarca", -170, "raise", { dy: 0.5, facing: 1, id: "samuel", glow: 0.58 }),
        C("homem", -10, "stand", { dy: 0.62, facing: 1, id: "israelita-de-gilgal1" }),
        C("homem", 110, "stand", { dy: 0.56, facing: -1, id: "israelita-de-gilgal2" }),
        C("mulherComum", 230, "stand", { dy: 0.5, facing: -1, id: "mulher-de-gilgal" }),
        C("anciao", 300, "stand", { dy: 0.44, facing: -1, id: "anciao-de-gilgal" }),
      ] }),
      // v.8 — PRIMEIRA MEMÓRIA: Jacó entrou no Egito, os pais clamaram, e o
      // SENHOR enviou Moisés e Arão. O quadro vira o Egito e Samuel narra de
      // dentro da lembrança (é assim que os flashbacks funcionam neste motor).
      b(8, { by: "patriarca", q: "Havendo entrado Jacó no Egito",
        set: "egito", props: EGITO,
        env: { terrain: "desert", night: 0.36, glory: 0.4, storm: 0.06, water: 0.2, verdure: 0.16 }, cast: [
        C("patriarca", -300, "point", { dy: 0.42, facing: 1, id: "samuel", glow: 0.45 }),
        C("servo", -40, "bow", { dy: 0.6, facing: 1, id: "israelita-no-egito1" }),
        C("servo", 90, "kneel", { dy: 0.54, facing: 1, id: "israelita-no-egito2" }),
      ] }),
      // v.9 — SEGUNDA MEMÓRIA: esqueceram-se do SENHOR, e Ele os VENDEU à mão de
      // SÍSERA (o capitão de Hazor, com o seu carro), à dos FILISTEUS e à do REI
      // DOS MOABITAS. Três opressores num quadro só; noite alta, sem glória.
      b(9, { by: "patriarca", q: "então os vendeu à mão de Sísera",
        set: "opressores", props: OPRESSORES,
        env: { water: 0, terrain: "city", night: 0.6, glory: 0.14, storm: 0.3, verdure: 0.14 }, cast: [
        C("patriarca", -305, "stand", { dy: 0.4, facing: 1, id: "samuel", glow: 0.3 }),
        C("cavaleiro", 90, "stand", { dy: 0.44, facing: -1, id: "sisera" }),
        C("homem", 210, "stand", { dy: 0.48, facing: -1, id: "filisteu-opressor" }),
        C("rei", 290, "stand", { dy: 0.36, facing: -1, id: "rei-de-moabe" }),
        C("homem", -130, "bow", { dy: 0.62, facing: 1, id: "israelita-que-clama" }),
      ] }),
      // v.10 — o CLAMOR dos pais, citado palavra por palavra: PECAMOS, servimos
      // aos baalins e astarotes; livra-nos, e te serviremos. Quem fala é o
      // israelita ajoelhado — o primeiro `homem` do elenco.
      b(10, { by: "homem", q: "e disseram:",
        env: { night: 0.56, glory: 0.34, storm: 0.22 }, cast: [
        C("homem", -120, "kneel", { dy: 0.64, facing: 1, id: "israelita-que-clama" }),
        C("homem", 200, "stand", { dy: 0.46, facing: -1, id: "filisteu-opressor" }),
        C("patriarca", -300, "stand", { dy: 0.4, facing: 1, id: "samuel", glow: 0.34 }),
        C("cavaleiro", 100, "stand", { dy: 0.42, facing: -1, id: "sisera" }),
      ] }),
      // v.11 — TERCEIRA MEMÓRIA: o SENHOR enviou JERUBAAL (Gideão), BEDÃ, JEFTÉ
      // — e SAMUEL, que se inclui na lista sem se gabar. E habitastes seguros:
      // campo livre, trombeta do juiz, sol de meio-dia.
      b(11, { by: "patriarca", q: "E o Senhor enviou a Jerubaal, e a Bedã, e a Jefté",
        set: "libertadores", props: LIBERTADORES,
        env: { water: 0, terrain: "field", night: 0.14, glory: 0.8, storm: 0, verdure: 0.44 }, cast: [
        C("patriarca", -290, "raise", { dy: 0.44, facing: 1, id: "samuel", glow: 0.6 }),
        C("homem", -30, "raise", { dy: 0.6, facing: 1, id: "jerubaal" }),
        C("homem", 110, "stand", { dy: 0.54, facing: 1, id: "beda" }),
        C("homem", 220, "raise", { dy: 0.48, facing: -1, id: "jefte" }),
      ] }),
      // v.12 — e então a acusação central: vendo que NAÁS vinha contra vós,
      // dissestes "NÃO, MAS REINARÁ SOBRE NÓS UM REI" — sendo o SENHOR o vosso
      // rei. Voltamos a Gilgal; Naás fica lá no fundo, a ameaça que serviu de
      // desculpa.
      b(12, { by: "patriarca", q: "me dissestes:",
        set: "gilgal-assembleia", props: GILGAL_ASSEMBLEIA,
        env: { water: 0, terrain: "field", night: 0.36, glory: 0.42, storm: 0.14, verdure: 0.32 }, cast: [
        C("patriarca", -150, "point", { dy: 0.52, facing: 1, id: "samuel", glow: 0.5 }),
        C("homem", 40, "bow", { dy: 0.62, facing: 1, id: "israelita-de-gilgal1" }),
        C("rei", 150, "stand", { dy: 0.5, facing: -1, id: "saul" }),
        C("rei", 300, "stand", { dy: 0.3, facing: -1, id: "naas", scale: 0.9 }),
      ] }),
      // v.13 — VEDES AÍ O REI QUE ELEGESTES E QUE PEDISTES: Samuel aponta, e
      // Saul fica sozinho no meio do quadro, com o povo em volta. O SENHOR o
      // pôs sobre vós — o pedido foi atendido, e isso é parte do juízo.
      b(13, { by: "patriarca", q: "vedes aí o rei que elegestes e que pedistes",
        env: { glory: 0.6, night: 0.28, storm: 0.1 }, cast: [
        C("patriarca", -200, "point", { dy: 0.5, facing: 1, id: "samuel", glow: 0.55 }),
        C("rei", 20, "stand", { dy: 0.58, facing: 1, id: "saul", scale: 1.2 }),
        C("homem", 170, "stand", { dy: 0.54, facing: -1, id: "israelita-de-gilgal1" }),
        C("anciao", 270, "bow", { dy: 0.46, facing: -1, id: "anciao-de-gilgal" }),
      ] }),
      // v.14 — a CONDIÇÃO na sua face boa: SE TEMERDES ao SENHOR e o servirdes,
      // e não fordes rebeldes, então VÓS E O REI seguireis o SENHOR vosso Deus.
      // Glória alta, povo e rei voltados para o mesmo lado.
      b(14, { by: "patriarca", q: "Se temerdes ao Senhor, e o servirdes",
        env: { glory: 0.82, night: 0.16, storm: 0.04, verdure: 0.38 }, cast: [
        C("patriarca", -190, "raise", { dy: 0.5, facing: 1, id: "samuel", glow: 0.65 }),
        C("rei", -20, "stand", { dy: 0.56, facing: 1, id: "saul", scale: 1.2 }),
        C("homem", 130, "stand", { dy: 0.6, facing: 1, id: "israelita-de-gilgal1" }),
        C("mulherComum", 250, "stand", { dy: 0.52, facing: 1, id: "mulher-de-gilgal" }),
      ] }),
      // v.15 — e a face dura da mesma condição: MAS SE NÃO DERDES OUVIDOS, A MÃO
      // DO SENHOR SERÁ CONTRA VÓS, como o era contra vossos pais. O céu começa a
      // fechar — a trovoada do sinal já está se armando.
      b(15, { by: "patriarca", q: "a mão do Senhor será contra vós",
        env: { glory: 0.44, night: 0.42, storm: 0.34, verdure: 0.32 }, cast: [
        C("patriarca", -190, "point", { dy: 0.5, facing: 1, id: "samuel", glow: 0.5 }),
        C("rei", 10, "stand", { dy: 0.54, facing: -1, id: "saul", scale: 1.2 }),
        C("homem", 150, "bow", { dy: 0.62, facing: 1, id: "israelita-de-gilgal1" }),
        C("anciao", 265, "bow", { dy: 0.46, facing: 1, id: "anciao-de-gilgal" }),
      ] }),
      // v.16 — PONDE-VOS TAMBÉM AGORA AQUI E VEDE ESTA GRANDE COISA: o palco vira
      // o trigal em pé, as nuvens entram no céu (com `sky`, senão cairiam no
      // chão) e a assembleia é levada para dentro da própria colheita.
      b(16, { by: "patriarca", q: "vede esta grande coisa que o Senhor vai fazer diante dos vossos olhos",
        set: "sega", props: SEGA,
        env: { terrain: "field", night: 0.44, glory: 0.4, storm: 0.5, water: 0.1, verdure: 0.42 }, cast: [
        C("patriarca", -170, "raise", { dy: 0.5, facing: 1, id: "samuel", glow: 0.55 }),
        C("homem", 30, "stand", { dy: 0.64, facing: 1, id: "segador-de-gilgal" }),
        C("homem", 160, "stand", { dy: 0.56, facing: 1, id: "israelita-de-gilgal1" }),
        C("rei", 280, "stand", { dy: 0.44, facing: -1, id: "saul" }),
      ] }),
      // v.17 — NÃO É HOJE A SEGA DO TRIGO? — a estação em que não chove em
      // Israel. CLAMAREI, e Ele DARÁ TROVÕES E CHUVA, e sabereis quão grande é a
      // vossa maldade em pedir um rei. O céu escurece sobre os feixes.
      b(17, { by: "patriarca", q: "Não é hoje a sega do trigo?",
        env: { night: 0.52, glory: 0.44, storm: 0.68, water: 0.16 }, cast: [
        C("patriarca", -150, "point", { dy: 0.5, facing: 1, id: "samuel", glow: 0.6 }),
        C("homem", 40, "stand", { dy: 0.64, facing: 1, id: "segador-de-gilgal" }),
        C("homem", 175, "bow", { dy: 0.56, facing: 1, id: "israelita-de-gilgal1" }),
        C("rei", 285, "stand", { dy: 0.42, facing: -1, id: "saul" }),
      ] }),
      // v.18 — O SINAL: Samuel invoca, e o SENHOR DÁ TROVÕES E CHUVA NAQUELE DIA
      // — em plena sega. Todo o povo TEMEU SOBREMANEIRA. Temor, não festa: por
      // isso figuras individuais em `bow`/`kneel`, jamais a multidão que aplaude.
      b(18, { q: "o Senhor deu trovões e chuva naquele dia",
        env: { night: 0.62, glory: 0.56, storm: 0.96, water: 0.38, verdure: 0.44 }, cast: [
        C("patriarca", -160, "raise", { dy: 0.48, facing: 1, id: "samuel", glow: 0.75 }),
        C("homem", 20, "kneel", { dy: 0.66, facing: 1, id: "segador-de-gilgal" }),
        C("homem", 150, "bow", { dy: 0.58, facing: 1, id: "israelita-de-gilgal1" }),
        C("mulherComum", 250, "kneel", { dy: 0.5, facing: 1, id: "mulher-de-gilgal" }),
        C("rei", -280, "bow", { dy: 0.42, facing: 1, id: "saul" }),
      ] }),
      // v.19 — o povo pede socorro ao próprio profeta que o acusou: ROGA PELOS
      // TEUS SERVOS, para que NÃO VENHAMOS A MORRER — porque a todos os nossos
      // pecados acrescentamos ESTE MAL de pedir para nós um rei.
      b(19, { by: "homem", q: "E todo o povo disse a Samuel:",
        env: { night: 0.6, glory: 0.5, storm: 0.86, water: 0.34 }, cast: [
        C("homem", -40, "kneel", { dy: 0.66, facing: 1, id: "israelita-de-gilgal1" }),
        C("homem", 90, "bow", { dy: 0.6, facing: 1, id: "segador-de-gilgal" }),
        C("mulherComum", 210, "kneel", { dy: 0.52, facing: 1, id: "mulher-de-gilgal" }),
        C("patriarca", -220, "stand", { dy: 0.46, facing: 1, id: "samuel", glow: 0.68 }),
      ] }),
      // v.20 — a resposta é mansa: NÃO TEMAIS. Sim, cometestes todo este mal —
      // mas não vos desvieis; SERVI AO SENHOR COM TODO O VOSSO CORAÇÃO. A chuva
      // começa a afrouxar enquanto ele fala.
      b(20, { by: "patriarca", q: "Então disse Samuel ao povo:",
        env: { night: 0.5, glory: 0.6, storm: 0.66, water: 0.26 }, cast: [
        C("patriarca", -180, "raise", { dy: 0.48, facing: 1, id: "samuel", glow: 0.66 }),
        C("homem", 10, "kneel", { dy: 0.64, facing: 1, id: "israelita-de-gilgal1" }),
        C("homem", 140, "bow", { dy: 0.58, facing: 1, id: "segador-de-gilgal" }),
        C("mulherComum", 250, "bow", { dy: 0.5, facing: 1, id: "mulher-de-gilgal" }),
      ] }),
      // v.21 — o aviso contra as VAIDADES que nada aproveitam e nada livram —
      // porque VAIDADES SÃO. Samuel aponta para o vazio do horizonte; não há
      // ídolo em cena, e é esse o ponto.
      b(21, { by: "patriarca", q: "pois seguiríeis as vaidades, que nada aproveitam",
        env: { night: 0.44, glory: 0.58, storm: 0.5, water: 0.2 }, cast: [
        C("patriarca", -150, "point", { dy: 0.5, facing: 1, id: "samuel", glow: 0.6 }),
        C("homem", 60, "stand", { dy: 0.62, facing: 1, id: "israelita-de-gilgal1" }),
        C("homem", 190, "stand", { dy: 0.56, facing: 1, id: "segador-de-gilgal" }),
        C("rei", 300, "stand", { dy: 0.42, facing: -1, id: "saul" }),
      ] }),
      // v.22 — a rocha de tudo: POR CAUSA DO SEU GRANDE NOME, o SENHOR NÃO
      // DESAMPARARÁ O SEU POVO — porque LHE APROUVE fazer-vos o seu povo. A
      // tempestade cede e a glória volta a subir.
      b(22, { by: "patriarca", q: "não desamparará o seu povo",
        env: { night: 0.32, glory: 0.78, storm: 0.3, water: 0.14, verdure: 0.44 }, cast: [
        C("patriarca", -140, "raise", { dy: 0.5, facing: 1, id: "samuel", glow: 0.7 }),
        C("homem", 50, "raise", { dy: 0.62, facing: 1, id: "israelita-de-gilgal1" }),
        C("mulherComum", 180, "stand", { dy: 0.54, facing: 1, id: "mulher-de-gilgal" }),
        C("rei", 290, "stand", { dy: 0.42, facing: -1, id: "saul" }),
      ] }),
      // v.23 — a frase que define o resto da vida de Samuel: LONGE DE MIM QUE EU
      // PEQUE CONTRA O SENHOR, DEIXANDO DE ORAR POR VÓS — e ainda vos ENSINAREI
      // o caminho bom e direito. Voltamos à assembleia, com o céu já limpo.
      b(23, { by: "patriarca", q: "longe de mim que eu peque contra o Senhor, deixando de orar por vós",
        set: "gilgal-assembleia", props: GILGAL_ASSEMBLEIA,
        env: { terrain: "field", night: 0.2, glory: 0.86, storm: 0.1, water: 0.06, verdure: 0.46 }, cast: [
        C("patriarca", -110, "raise", { dy: 0.52, facing: 1, id: "samuel", glow: 0.8 }),
        C("homem", 90, "kneel", { dy: 0.62, facing: 1, id: "israelita-de-gilgal1" }),
        C("anciao", 220, "bow", { dy: 0.48, facing: 1, id: "anciao-de-gilgal" }),
        C("rei", -260, "stand", { dy: 0.44, facing: 1, id: "saul" }),
      ] }),
      // v.24 — TÃO-SOMENTE TEMEI AO SENHOR e servi-o fielmente com todo o
      // coração: VEDE QUÃO GRANDIOSAS COISAS VOS FEZ. O sol volta ao céu (com
      // `sky`, na altura de sol) e a glória chega ao ponto alto do capítulo.
      b(24, { by: "patriarca", q: "Tão-somente temei ao Senhor, e servi-o fielmente",
        props: [
          P("rock", -290, 1.1, undefined, 0.42),
          P("rock", -200, 0.95, undefined, 0.5),
          P("altar", -100, 0.95, undefined, 0.28),
          P("palm", 190, 1.05, undefined, 0.16),
          P("sheaf", 250, 1.0, undefined, 0.56),
          P("sheaf", 315, 0.9, undefined, 0.5),
          P("grass", 30, 0.76, undefined, 0.76),
          { ...P("sun", 40, 1.15, undefined, 0.62), sky: true },
        ],
        env: { glory: 0.94, night: 0.1, storm: 0, water: 0, verdure: 0.5 }, cast: [
        C("patriarca", -140, "raise", { dy: 0.5, facing: 1, id: "samuel", glow: 0.85 }),
        C("homem", 60, "raise", { dy: 0.62, facing: 1, id: "israelita-de-gilgal1" }),
        C("mulherComum", 175, "stand", { dy: 0.54, facing: 1, id: "mulher-de-gilgal" }),
        C("anciao", 275, "stand", { dy: 0.46, facing: 1, id: "anciao-de-gilgal" }),
      ] }),
      // v.25 — e o fecho, que fica pairando sobre todo o reinado que começa: SE
      // PERSEVERARDES EM FAZER MAL, PERECEREIS, ASSIM VÓS COMO O VOSSO REI. A
      // luz cai, o rei fica sozinho no lado escuro do quadro.
      b(25, { by: "patriarca", q: "perecereis, assim vós como o vosso rei",
        props: [
          P("rock", -290, 1.1, undefined, 0.42),
          P("rock", -200, 0.95, undefined, 0.5),
          P("altar", -100, 0.95, undefined, 0.28),
          P("palm", 190, 1.05, undefined, 0.16),
          P("sheaf", 250, 1.0, undefined, 0.56),
          P("sheaf", 315, 0.9, undefined, 0.5),
          P("grass", 30, 0.76, undefined, 0.76),
        ],
        env: { terrain: "field", night: 0.52, glory: 0.32, storm: 0.26, verdure: 0.34 }, cast: [
        C("patriarca", -170, "point", { dy: 0.5, facing: 1, id: "samuel", glow: 0.55 }),
        C("rei", 160, "stand", { dy: 0.52, facing: -1, id: "saul", scale: 1.2 }),
        C("homem", -20, "bow", { dy: 0.64, facing: 1, id: "israelita-de-gilgal1" }),
        C("anciao", 280, "bow", { dy: 0.46, facing: 1, id: "anciao-de-gilgal" }),
      ] }),
    ],
  },
};
