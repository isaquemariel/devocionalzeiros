// ============================================================================
// 1 CRÔNICAS 6 — CENA VIVA. O capítulo mais longo do livro (81 versículos) e o
// único inteiramente dedicado a uma tribo: LEVI. Não é uma lista de nomes — é
// um mapa de OFÍCIOS, de LUGARES e de um exílio anunciado no meio da conta.
//
// v.1-30 — A CASA SACERDOTAL. Levi tem três filhos, e os três viram três
// serviços: GÉRSON leva as cortinas e as coberturas da tenda, COATE leva a arca
// e os vasos santos, MERARI leva as tábuas, as colunas e as bases. De Coate sai
// Anrão, e de Anrão saem Arão, Moisés e Miriã — e de Arão sai a linha que
// queima o incenso: Eleazar, Finéias, Abisua, Buqui, Uzi, Zeraías, Meraiote,
// Amarias, Aitube, Zadoque, Aimaás, Azarias — "este é o que exerceu o sacerdócio
// na casa que Salomão tinha edificado em Jerusalém" (v.10), e a genealogia
// acende ali as lâmpadas do templo. Onze nomes depois, a mesma genealogia
// apaga tudo numa linha só: "E Jeozadaque foi levado cativo quando o Senhor
// levou presos a Judá e a Jerusalém pela mão de Nabucodonosor" (v.15). O
// Cronista escreve a lista já sabendo como ela acaba — e é por isso que o
// quadro do v.15 é o único escuro desta primeira parte. Depois disso ele
// recomeça do zero ("Os filhos de Levi foram, pois…", v.16), desce as três
// casas pelos seus serviços, atravessa a casa de Elcana no monte de Efraim e
// para um momento na porta de SAMUEL, que era coatita, e cujos dois filhos —
// Joel e Abias — a genealogia guarda sem esconder nada.
//
// v.31-48 — OS CANTORES. Aqui o capítulo muda de mundo. "Estes são, pois, os
// que Davi constituiu para o ofício do canto na casa do Senhor, DEPOIS QUE A
// ARCA TEVE REPOUSO" (v.31): enquanto a arca andava, ninguém cantava; parada a
// arca, começa o coro. "E ministravam diante do tabernáculo da tenda da
// congregação com cantares, até que Salomão edificou a casa do Senhor em
// Jerusalém" (v.32). Três homens tomam o palco: HEMÃ, o cantor, no meio — e a
// sua linhagem sobe degrau a degrau até Coate, até Levi, até ISRAEL —, ASAFE à
// sua DIREITA, subindo por Gérson, e ETÃ, dos filhos de Merari, à sua ESQUERDA.
// Três genealogias que não vão dar em terra nenhuma: vão dar num acorde. E os
// irmãos deles, os levitas, "foram postos para todo o ministério do tabernáculo
// da casa de Deus" (v.48) — o coro no meio, e a casa inteira em volta servindo.
//
// v.49-53 — ARÃO E OS DOIS ALTARES. O texto volta ao serviço que sustenta tudo:
// "E Arão e seus filhos ofereceram sobre o altar do holocausto e sobre o altar
// do incenso… PARA FAZER EXPIAÇÃO POR ISRAEL, conforme tudo quanto Moisés,
// servo de Deus, tinha ordenado" (v.49). O sangue no altar de fora, o perfume
// no altar de dentro — e a linha de Arão repetida uma última vez, agora sem
// exílio no fim, terminando em paz em Zadoque e Aimaás.
//
// v.54-81 — O MAPA. Vinte e oito versículos de cidades e ARRABALDES, que é
// justamente o contrário de uma lista: é a tribo sem herança sendo espalhada
// por dentro de todas as outras. Hebrom, na terra de Judá, com os arrabaldes
// que a rodeiam — mas o território e as aldeias ficam com CALEBE. As CIDADES DE
// REFÚGIO abrem as portas no meio da conta. Debir, que era Quiriate-Sefer, a
// cidade do livro; Bete-Semes, a casa do sol, no vale do trigo; Geba, Alemete e
// Anatote no espigão de Benjamim; os pastos gordos de Basã; Siquém no monte de
// Efraim e a descida de Bete-Horom; o vale de AIJALOM, onde a lua um dia parou;
// os dois mananciais de Aném; a costa de Aser com os seus barcos e o seu azeite;
// Quedes, na Galiléia, verde; Rimom e o monte TABOR; e, dalém do Jordão, Bezer
// no deserto, Ramote em Gileade à beira do rio, e por fim Hesbom das piscinas e
// Jazer das vinhas. Cada versículo é uma paisagem diferente, porque cada
// versículo é um lugar diferente onde um levita foi morar.
//
// A VOZ DE DEUS — em 1 Crônicas 6 NINGUÉM FALA: não há uma só fala direta em
// oitenta e um versículos, nem de homem, nem de anjo, nem do céu. Por isso este
// roteiro não tem UM ÚNICO `by`, e nenhum `by:"deus"`. Pôr voz do céu num
// capítulo que não abre a boca seria inventar oráculo onde o Cronista pôs
// cadastro. O que Deus faz aqui, Ele faz pelo FOGO e pelo INCENSO dos dois
// altares (v.49), e pela mão que leva Judá cativo (v.15) — e as duas coisas são
// contadas pelo ambiente: o `altar` com `fire` no auge e a glória alta na casa,
// e a noite quase fechada, sem glória nenhuma, na estrada do cativeiro. O único
// lugar do capítulo onde o quadro grita é o coro do v.31-48, e ali o grito é de
// harpa e trombeta, não de balão.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ================================================================ MOVIMENTO 1
// A CASA SACERDOTAL (v.1-30) — o átrio, o altar e o acampamento das três casas.

// O ACAMPAMENTO DE LEVI — as tendas dos levitas armadas em roda do santuário,
// no descampado do deserto: três lonas, o altar de terra batida no meio e o
// sol alto de um dia comum. É daqui que saem as três casas do capítulo.
const TENDA_DOS_FILHOS_DE_LEVI: StagePropSpec[] = [
  { ...P("tent", -150, 1.25, undefined, 0.28), tag: "tenda-da-congregacao" },
  P("tent", 60, 1.05, undefined, 0.34),
  P("tent", 230, 0.95, undefined, 0.3),
  P("altar", -30, 1.0, undefined, 0.5),
  P("rock", -300, 1.05, undefined, 0.52),
  P("bush", 150, 0.85, undefined, 0.5),
  P("grass", -90, 0.7, undefined, 0.78),
  P("palm", 315, 0.95, undefined, 0.16),
  { ...P("sun", 120, 1.05, undefined, 0.6), sky: true },
];

// O PÁTIO DO ALTAR DO HOLOCAUSTO — o serviço de fora: o altar grande ardendo à
// esquerda, o altar do incenso menor à direita, a bacia dos sacrifícios, o
// castiçal do pórtico e as colunas do pátio. É o lugar de trabalho da linha de
// Arão, e é aqui que a genealogia dos sacerdotes desce degrau por degrau.
const PATIO_DO_ALTAR_DO_HOLOCAUSTO: StagePropSpec[] = [
  { ...P("altar", -70, 1.3, 0.6, 0.48), tag: "altar-holocausto" },
  { ...P("altar", 120, 1.0, undefined, 0.62), tag: "altar-incenso" },
  { ...P("tent", 210, 1.2, undefined, 0.28), tag: "tenda-da-congregacao" },
  P("lampstand", -190, 0.9, undefined, 0.56),
  P("bowl", 30, 0.8, undefined, 0.68),
  P("column", -300, 1.15, undefined, 0.34),
  P("column", 300, 1.15, undefined, 0.34),
  P("crate", 255, 0.8, undefined, 0.66),
  { ...P("sun", 60, 1.0, undefined, 0.62), sky: true },
];

// O LUGAR SANTO — dentro da tenda: o candelabro de ouro à esquerda, as lâmpadas
// dos dois lados, o incensário fumegando e os vasos do serviço sobre o estrado.
// Sem céu e sem chão de campo: aqui a luz é toda de lâmpada.
const O_LUGAR_SANTO: StagePropSpec[] = [
  { ...P("tent", 0, 1.3, undefined, 0.24), tag: "tenda-da-congregacao" },
  P("menorah", -150, 1.2, undefined, 0.5),
  P("lampstand", -60, 1.0, undefined, 0.56),
  P("lampstand", 60, 1.0, undefined, 0.56),
  { ...P("censer", -235, 0.95, undefined, 0.6), tag: "incenso-santo" },
  P("bowl", 160, 0.9, undefined, 0.62),
  P("amphora", 215, 0.8, undefined, 0.66),
  P("crate", 265, 0.85, undefined, 0.68),
  P("column", -320, 1.15, undefined, 0.32),
  P("column", 320, 1.15, undefined, 0.32),
];

// A CASA QUE SALOMÃO EDIFICOU — o templo de Jerusalém: o pórtico ao fundo, as
// duas colunas de bronze do vestíbulo, o MAR DE FUNDIÇÃO à esquerda e o altar
// do holocausto no pátio. O v.10 é o ponto mais alto da primeira parte, e o
// cenário tem de dizer isso antes de qualquer palavra.
const A_CASA_QUE_SALOMAO_EDIFICOU: StagePropSpec[] = [
  { ...P("church", 0, 1.45, undefined, 0.24), tag: "casa-do-senhor-em-jerusalem" },
  P("column", -120, 1.25, undefined, 0.36),
  P("column", 120, 1.25, undefined, 0.36),
  { ...P("pool", -215, 1.0, undefined, 0.58), tag: "mar-de-fundicao" },
  { ...P("altar", 70, 1.1, 0.5, 0.6), tag: "altar-holocausto" },
  P("lampstand", -40, 0.85, undefined, 0.66),
  P("menorah", 215, 0.95, undefined, 0.5),
  P("crate", 285, 0.8, undefined, 0.66),
  { ...P("sun", 150, 1.0, undefined, 0.62), sky: true },
];

// O CAMINHO DO CATIVEIRO — a única cena escura da primeira parte: Jerusalém
// atrás, com a torre quebrada e o fogo ainda comendo o casario, e a estrada da
// Babilônia saindo pela direita do quadro. Não há multidão aqui: há gente, uma
// a uma, andando para fora da própria cidade.
const O_CAMINHO_DO_CATIVEIRO: StagePropSpec[] = [
  P("tower", -300, 1.2, undefined, 0.22),
  P("church", -230, 1.2, undefined, 0.26),
  P("campfire", -160, 1.15, 1, 0.34),
  P("rock", 210, 1.1, undefined, 0.5),
  P("bush", 120, 0.8, undefined, 0.48),
  P("grass", -40, 0.6, undefined, 0.8),
  { ...P("moon", 180, 0.95, undefined, 0.6), sky: true },
  { ...P("starfield", -60, 1.1, undefined, 0.82), sky: true },
];

// O ACAMPAMENTO DAS TRÊS CASAS — o recomeço do v.16: a tenda da congregação no
// centro, e à direita e à esquerda dela as duas outras lonas das casas de
// Gérson e de Merari, com o altar, o poço e as palmeiras dos dois extremos.
const O_ACAMPAMENTO_DAS_TRES_CASAS: StagePropSpec[] = [
  P("tent", -235, 1.15, undefined, 0.3),
  { ...P("tent", 0, 1.3, undefined, 0.26), tag: "tabernaculo" },
  P("tent", 235, 1.15, undefined, 0.3),
  P("altar", -105, 0.95, undefined, 0.56),
  P("well", 120, 0.9, undefined, 0.6),
  P("palm", -320, 0.95, undefined, 0.16),
  P("palm", 320, 0.95, undefined, 0.16),
  P("grass", 60, 0.7, undefined, 0.78),
  P("bush", -160, 0.8, undefined, 0.5),
  { ...P("sun", -60, 1.0, undefined, 0.6), sky: true },
];

// AS CORTINAS DE GÉRSON — o ofício dos gersonitas (Nm 4:24-26): as cortinas, as
// coberturas e os reposteiros do pátio. Um depósito de lona ao ar livre, com os
// fardos amarrados e a coluna do pátio deitada à espera de ser vestida.
const AS_CORTINAS_DE_GERSON: StagePropSpec[] = [
  { ...P("tent", -180, 1.35, undefined, 0.3), tag: "tenda-da-congregacao" },
  P("tent", 90, 1.15, undefined, 0.36),
  P("column", 230, 1.1, undefined, 0.4),
  P("crate", -40, 0.9, undefined, 0.6),
  P("crate", 25, 0.85, undefined, 0.66),
  P("amphora", 285, 0.8, undefined, 0.62),
  P("grass", -100, 0.65, undefined, 0.8),
  P("bush", 160, 0.8, undefined, 0.5),
  P("rock", -310, 1.0, undefined, 0.52),
  { ...P("clouds", 40, 1.0, undefined, 0.7), sky: true },
];

// A ARCA DOS COATITAS — o ofício de Coate (Nm 4:4-15): a arca e os vasos do
// santuário, que se levavam ao ombro e não em carro. No meio do quadro a ARCA,
// e em volta o candelabro, o incensário e a bacia, cada coisa no seu lugar.
const A_ARCA_DOS_COATITAS: StagePropSpec[] = [
  { ...P("ark", 0, 1.25, undefined, 0.46), tag: "arca-do-senhor" },
  P("lampstand", -135, 1.0, undefined, 0.54),
  P("menorah", 150, 1.0, undefined, 0.54),
  { ...P("censer", -235, 0.9, undefined, 0.6), tag: "incenso-santo" },
  P("bowl", 215, 0.85, undefined, 0.62),
  { ...P("tent", -280, 1.15, undefined, 0.28), tag: "tabernaculo" },
  P("crate", 90, 0.8, undefined, 0.68),
  P("grass", -60, 0.6, undefined, 0.8),
  { ...P("clouds", -120, 0.95, undefined, 0.72), sky: true },
];

// A CASA DE ELCANA NO MONTE DE EFRAIM — Ramataim-Zofim: a casa de pedra da
// família coatita que morava fora do santuário, com a porta baixa, o poço do
// quintal, o curral e os feixes da eira. É a casa de onde sai Samuel.
const A_CASA_DE_ELCANA_EM_EFRAIM: StagePropSpec[] = [
  { ...P("church", -165, 1.2, undefined, 0.28), tag: "casa-de-elcana-em-ramataim" },
  P("door", -60, 1.0, undefined, 0.42),
  P("well", 120, 0.95, undefined, 0.56),
  P("stall", 200, 0.9, undefined, 0.62),
  P("tree", 250, 1.15, undefined, 0.24),
  P("tree", -290, 1.0, undefined, 0.22),
  P("sheaf", 40, 0.85, undefined, 0.66),
  P("grass", -10, 0.65, undefined, 0.8),
  P("bush", 305, 0.8, undefined, 0.5),
  { ...P("sun", 70, 1.0, undefined, 0.58), sky: true },
];

// A CASA DE SAMUEL EM RAMÁ — o circuito do juiz: a casa dele na colina, o altar
// que ele levantou ao SENHOR, o rolo do direito posto no chão e o poço da
// entrada. Daqui saíam os dois filhos para julgar em Berseba.
const A_CASA_DE_SAMUEL_EM_RAMA: StagePropSpec[] = [
  P("church", 150, 1.2, undefined, 0.28),
  { ...P("altar", -190, 1.05, undefined, 0.5), tag: "altar-do-senhor" },
  P("scroll", -40, 0.85, undefined, 0.62),
  P("tree", -300, 1.1, undefined, 0.22),
  P("well", 255, 0.9, undefined, 0.58),
  P("grass", -120, 0.6, undefined, 0.8),
  P("bush", 90, 0.8, undefined, 0.5),
  P("rock", 305, 1.0, undefined, 0.52),
  { ...P("sun", -80, 1.0, undefined, 0.6), sky: true },
];

// AS TÁBUAS DE MERARI — o ofício dos meraritas (Nm 4:29-33): as tábuas, as
// barras, as COLUNAS e as bases do tabernáculo. Três colunas de pé no
// descampado, os caixotes das bases e a lona dobrada — a carga mais pesada de
// todas, e a casa mais silenciosa das três.
const AS_TABUAS_DE_MERARI: StagePropSpec[] = [
  P("column", -215, 1.25, undefined, 0.34),
  P("column", -120, 1.2, undefined, 0.38),
  P("column", 200, 1.15, undefined, 0.36),
  P("tent", 90, 1.05, undefined, 0.3),
  P("crate", -30, 0.95, undefined, 0.62),
  P("crate", 45, 0.9, undefined, 0.66),
  P("rock", 285, 1.0, undefined, 0.52),
  P("grass", -70, 0.6, undefined, 0.8),
  P("bush", 150, 0.8, undefined, 0.48),
  { ...P("clouds", -160, 0.95, undefined, 0.7), sky: true },
];
