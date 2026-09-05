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
  { ...P("church", 0, 1.45, undefined, 0.24), tag: "casa-do-senhor" },
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
  P("campfire", -160, 1.35, 1, 0.4),
  P("campfire", -248, 1.0, 1, 0.48),
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
  P("church", -165, 1.2, undefined, 0.28),
  P("door", -60, 1.0, undefined, 0.42),
  P("well", 120, 0.95, undefined, 0.56),
  P("crate", 200, 1.35, undefined, 0.62),
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

// O ÁTRIO DA PIA DE COBRE — entre a porta do pátio e o altar ficava a bacia de
// bronze onde os filhos de Arão lavavam as mãos e os pés antes de servir (Êx
// 30:18-21): ninguém da linha passava daqui sem se lavar. É o primeiro degrau
// do ofício, e por isso o quadro é de água e de manhã cedo.
const O_ATRIO_DA_PIA_DE_COBRE: StagePropSpec[] = [
  { ...P("pool", -60, 1.1, undefined, 0.52), tag: "pia-cobre" },
  { ...P("door", -250, 1.15, undefined, 0.34), tag: "porta-patio" },
  P("column", -160, 1.1, undefined, 0.4),
  P("column", 165, 1.1, undefined, 0.4),
  { ...P("altar", 60, 1.05, 0.35, 0.6), tag: "altar-holocausto" },
  P("amphora", 235, 0.8, undefined, 0.66),
  P("crate", 290, 0.8, undefined, 0.62),
  P("grass", 0, 0.6, undefined, 0.82),
  { ...P("sun", -300, 1.0, undefined, 0.52), sky: true },
];

// A CÂMARA DOS PÃES DA PROPOSIÇÃO — a mesa de acácia coberta de ouro com os
// doze pães em duas fileiras, renovados de sábado em sábado (Lv 24:5-9): pão
// que só os sacerdotes comiam, dentro do lugar santo. Sala fechada, de
// madeira e de ouro, sem uma janela — a luz aqui é toda de candelabro.
const A_CAMARA_DOS_PAES_DA_PROPOSICAO: StagePropSpec[] = [
  { ...P("crate", -120, 1.15, undefined, 0.5), tag: "mesa-proposicao" },
  { ...P("bowl", -40, 0.9, undefined, 0.64), tag: "paes-da-proposicao" },
  P("menorah", 120, 1.15, undefined, 0.52),
  P("lampstand", 30, 0.9, undefined, 0.58),
  { ...P("censer", 215, 0.9, undefined, 0.6), tag: "incenso-santo" },
  P("amphora", 275, 0.8, undefined, 0.66),
  P("column", -300, 1.2, undefined, 0.3),
  P("column", 300, 1.2, undefined, 0.3),
  { ...P("tent", -215, 1.15, undefined, 0.26), tag: "tenda-da-congregacao" },
];

// A VIGÍLIA DA NOITE NO SANTUÁRIO — "a lâmpada de Deus, antes que se apagasse"
// (1Sm 3:3): o serviço não parava com o sol. Os sacerdotes velavam pelo fogo
// do altar e pelo azeite do candelabro a noite inteira, e é nessa vigília que
// a genealogia atravessa as gerações de que ninguém guardou história nenhuma.
const A_VIGILIA_DA_NOITE_NO_SANTUARIO: StagePropSpec[] = [
  { ...P("tent", 0, 1.3, undefined, 0.24), tag: "tenda-da-congregacao" },
  { ...P("lampstand", -140, 1.05, undefined, 0.54), tag: "lampada-de-deus" },
  P("menorah", 130, 1.1, undefined, 0.52),
  { ...P("censer", -250, 0.9, undefined, 0.62), tag: "incenso-santo" },
  P("crate", 235, 0.85, undefined, 0.66),
  P("column", -320, 1.15, undefined, 0.3),
  P("column", 320, 1.15, undefined, 0.3),
  { ...P("moon", -70, 0.95, undefined, 0.66), sky: true },
  { ...P("starfield", 100, 1.1, undefined, 0.84), sky: true },
];

// O ALTO DE GIBEÃO — nos dias de Davi o TABERNÁCULO DE MOISÉS e o altar do
// holocausto ficaram no alto de Gibeão, e ali Zadoque e seus irmãos serviam,
// enquanto a arca já estava em Jerusalém (1Cr 16:39-40). Um outeiro de pedra
// aberto ao vento, com a tenda velha do deserto armada em cima dele.
const O_ALTO_DE_GIBEAO: StagePropSpec[] = [
  { ...P("tent", -80, 1.35, undefined, 0.28), tag: "tabernaculo-do-deserto" },
  { ...P("altar", 90, 1.15, 0.55, 0.5), tag: "altar-do-alto-de-gibeao" },
  P("rock", -280, 1.25, undefined, 0.44),
  P("rock", 265, 1.15, undefined, 0.5),
  P("column", 10, 1.0, undefined, 0.36),
  P("bush", 190, 0.8, undefined, 0.6),
  P("grass", -170, 0.65, undefined, 0.8),
  { ...P("sun", 210, 1.05, undefined, 0.58), sky: true },
];

// O PÓRTICO DE JAQUIM E BOAZ — a entrada da casa que Salomão edificou, com as
// duas colunas de bronze do vestíbulo que tinham nome próprio: JAQUIM ("ele
// firmará") à direita e BOAZ ("nele há força") à esquerda (1Rs 7:21). Todo
// sacerdote desta linha passou entre as duas para entrar ao serviço.
const O_PORTICO_DE_JAQUIM_E_BOAZ: StagePropSpec[] = [
  { ...P("column", -95, 1.4, undefined, 0.34), tag: "coluna-jaquim" },
  { ...P("column", 95, 1.4, undefined, 0.34), tag: "coluna-boaz" },
  { ...P("church", 0, 1.35, undefined, 0.2), tag: "casa-do-senhor" },
  { ...P("door", -235, 1.1, undefined, 0.4), tag: "portas-de-ouro-do-templo" },
  P("lampstand", 210, 0.9, undefined, 0.58),
  P("crate", 285, 0.8, undefined, 0.64),
  P("grass", -20, 0.6, undefined, 0.82),
  { ...P("clouds", 150, 1.0, undefined, 0.68), sky: true },
];

// A CASA DO SENHOR EM REPARO — o templo nos dias de HILQUIAS, o sumo sacerdote
// que, tirando o dinheiro da obra, achou o LIVRO DA LEI dentro da casa (2Rs
// 22:8). Andaimes de caixotes, o cofre da coleta junto à porta e o rolo posto
// em cima dele: a única boa notícia da segunda metade desta linhagem.
const A_CASA_DO_SENHOR_EM_REPARO: StagePropSpec[] = [
  { ...P("church", -60, 1.35, undefined, 0.22), tag: "casa-do-senhor-em-reparo" },
  { ...P("scroll", 120, 1.0, undefined, 0.56), tag: "livro-da-lei-de-moises" },
  { ...P("crate", 30, 0.9, undefined, 0.66), tag: "cofre-de-joiada" },
  P("column", -230, 1.2, undefined, 0.34),
  P("column", 235, 1.2, undefined, 0.34),
  P("altar", -150, 1.0, 0.3, 0.6),
  P("amphora", 290, 0.8, undefined, 0.62),
  P("grass", 190, 0.6, undefined, 0.8),
  { ...P("sun", 60, 0.95, undefined, 0.5), sky: true },
];

// O TEMPLO NA ÚLTIMA GERAÇÃO — a casa ainda de pé, mas já sem ouro nas portas
// e com o fogo do altar baixo: os dias de SERAÍAS, o sacerdote principal que
// Nabuzaradã levou a Ribla e o rei da Babilônia feriu e matou (2Rs 25:18-21).
// A nuvem entra por cima e a lua nasce antes da hora do ofício acabar.
const O_TEMPLO_NA_ULTIMA_GERACAO: StagePropSpec[] = [
  { ...P("church", 40, 1.3, undefined, 0.24), tag: "casa-do-senhor" },
  { ...P("altar", -140, 1.05, 0.2, 0.54), tag: "altar-da-casa-do-senhor" },
  P("column", -40, 1.15, undefined, 0.36),
  P("column", 210, 1.1, undefined, 0.4),
  P("crate", 275, 0.8, undefined, 0.66),
  P("rock", -290, 1.1, undefined, 0.5),
  P("bush", 130, 0.7, undefined, 0.62),
  { ...P("clouds", -180, 1.15, undefined, 0.72), sky: true },
  { ...P("moon", 260, 0.9, undefined, 0.64), sky: true },
];

// A MUDANÇA DOS GERSONITAS — "deu dois carros e quatro bois aos filhos de
// Gérson, conforme o seu ministério" (Nm 7:7): o único dos três serviços que
// andava sobre rodas, porque lona pesa e não se leva ao ombro. O arraial em
// dia de marcha, com os fardos amarrados e o gado já no cercado.
const A_MUDANCA_DOS_GERSONITAS: StagePropSpec[] = [
  P("crate", 150, 1.6, undefined, 0.5),
  P("crate", -60, 1.0, undefined, 0.6),
  P("crate", 10, 0.95, undefined, 0.66),
  P("crate", 75, 0.9, undefined, 0.7),
  { ...P("tent", -230, 1.2, undefined, 0.3), tag: "tenda-da-congregacao" },
  P("amphora", 250, 0.8, undefined, 0.64),
  P("rock", 300, 1.05, undefined, 0.5),
  P("grass", -140, 0.65, undefined, 0.8),
  P("bush", 210, 0.75, undefined, 0.58),
  { ...P("sun", -280, 1.0, undefined, 0.5), sky: true },
];

// O REPOSTEIRO DA PORTA DO PÁTIO — outra carga dos gersonitas: "o pano da
// porta do pátio, que está junto ao tabernáculo e junto ao altar em redor"
// (Nm 3:26). A cortina bordada que separava o povo do santo, pendurada entre
// duas colunas — a fronteira mais fina e mais séria de Israel.
const O_REPOSTEIRO_DA_PORTA_DO_PATIO: StagePropSpec[] = [
  { ...P("door", -20, 1.35, undefined, 0.36), tag: "porta-patio" },
  { ...P("tent", 190, 1.2, undefined, 0.28), tag: "patio-tabernaculo" },
  P("column", -180, 1.2, undefined, 0.36),
  P("column", 130, 1.15, undefined, 0.4),
  P("crate", -90, 0.85, undefined, 0.66),
  P("amphora", 60, 0.8, undefined, 0.68),
  P("rock", -305, 1.05, undefined, 0.5),
  P("grass", 265, 0.65, undefined, 0.78),
  { ...P("clouds", 40, 1.1, undefined, 0.7), sky: true },
];

// A PORTA DA TENDA DOS CORAITAS — a casa de CORÉ, que levou os seus
// incensários ao SENHOR e viu a terra abrir-se debaixo dos pés (Nm 16:32) —
// "os filhos de Coré, porém, não morreram" (Nm 26:11). É desta raiz poupada
// que o Cronista vai tirar o coro. A fenda na rocha ao fundo continua lá.
const A_PORTA_DA_TENDA_DOS_CORAITAS: StagePropSpec[] = [
  { ...P("tent", -140, 1.25, undefined, 0.32), tag: "tenda-familia" },
  { ...P("censer", 40, 1.0, undefined, 0.58), tag: "incenso-santo" },
  P("censer", 110, 0.9, undefined, 0.66),
  P("rock", 230, 1.3, undefined, 0.42),
  P("rock", -300, 1.15, undefined, 0.5),
  P("crate", -40, 0.85, undefined, 0.7),
  P("bush", 165, 0.75, undefined, 0.6),
  P("grass", 0, 0.6, undefined, 0.82),
  { ...P("clouds", -60, 1.0, undefined, 0.72), sky: true },
];

// A CASA DE LONA DOS COATITAS — o lado humano do arraial: duas tendas de
// família ao sul do tabernáculo, a fogueira do jantar, o poço da manhã e as
// bilhas. Os que carregavam a arca também tinham filhos, panela e sono.
const A_CASA_DE_LONA_DOS_COATITAS: StagePropSpec[] = [
  P("tent", -190, 1.2, undefined, 0.34),
  P("tent", 70, 1.1, undefined, 0.4),
  P("campfire", -60, 0.95, 0.55, 0.6),
  P("well", 200, 0.95, undefined, 0.56),
  P("amphora", 265, 0.8, undefined, 0.66),
  P("crate", 10, 0.85, undefined, 0.7),
  P("bush", -290, 0.85, undefined, 0.52),
  P("grass", 130, 0.65, undefined, 0.8),
  { ...P("sun", 290, 1.0, undefined, 0.46), sky: true },
];

// O CURRAL DOS LEVITAS — Levi não teve herança de terra, mas teve ARRABALDES:
// pasto para o gado em redor das cidades (Nm 35:2-3). O curral, o poço, o
// feixe da eira e as aves da tarde — o mundo de uma família levítica em ano
// nenhum de história, que é a maior parte dos anos.
const O_CURRAL_DOS_LEVITAS: StagePropSpec[] = [
  P("crate", -120, 1.8, undefined, 0.46),
  P("well", 130, 1.0, undefined, 0.54),
  P("sheaf", 30, 0.9, undefined, 0.66),
  P("crate", -30, 0.8, undefined, 0.72),
  P("tree", 250, 1.2, undefined, 0.24),
  P("rock", -300, 1.05, undefined, 0.5),
  P("bush", 200, 0.8, undefined, 0.58),
  P("grass", 70, 0.65, undefined, 0.8),
  { ...P("birds", -60, 1.0, undefined, 0.5), sky: true },
  { ...P("sun", 180, 1.0, undefined, 0.58), sky: true },
];

// A EIRA DE RAMATAIM — a debulha na casa de Elcana, no monte de Efraim: três
// medas encostadas, o cercado do gado e o carvalho da beira. Uma família
// levítica que vivia do campo como qualquer outra, e de onde sairia Samuel.
const A_EIRA_DE_RAMATAIM: StagePropSpec[] = [
  P("sheaf", -110, 1.15, undefined, 0.56),
  P("sheaf", -45, 1.0, undefined, 0.64),
  P("sheaf", 25, 0.9, undefined, 0.7),
  P("crate", 175, 1.5, undefined, 0.48),
  P("crate", 100, 0.85, undefined, 0.68),
  P("tree", -270, 1.25, undefined, 0.22),
  P("rock", 290, 1.05, undefined, 0.52),
  P("grass", 230, 0.6, undefined, 0.8),
  { ...P("sun", 60, 1.05, undefined, 0.44), sky: true },
];

// O CAMINHO DE SILÓ — "e subia este homem da sua cidade de ano em ano a adorar
// e a sacrificar ao Senhor dos Exércitos em Siló" (1Sm 1:3). A estrada de
// terra entre os carvalhos, a casa de Deus aparecendo na curva e a tenda
// velha ao lado dela. A casa de Elcana subia por aqui uma vez por ano.
const O_CAMINHO_DE_SILO: StagePropSpec[] = [
  { ...P("church", 195, 1.25, undefined, 0.24), tag: "casa-de-deus-em-silo" },
  { ...P("tent", 275, 1.05, undefined, 0.32), tag: "tenda-de-silo" },
  P("tree", -250, 1.3, undefined, 0.2),
  P("tree", -120, 1.1, undefined, 0.26),
  P("rock", 60, 1.05, undefined, 0.52),
  P("bush", -30, 0.8, undefined, 0.6),
  P("grass", 120, 0.65, undefined, 0.8),
  P("sheaf", -180, 0.85, undefined, 0.66),
  { ...P("birds", 20, 1.0, undefined, 0.52), sky: true },
  { ...P("sun", -300, 1.0, undefined, 0.5), sky: true },
];

// O ARRAIAL DO NORTE — Merari armava as suas tendas ao NORTE do tabernáculo
// (Nm 3:35), do lado por onde vem o vento frio, e guardava as tábuas, as
// barras, as colunas e as bases. O lado mais duro do acampamento, com a
// fogueira acesa cedo e a lua já no céu antes de a lona ser dobrada.
const O_ARRAIAL_DO_NORTE_DE_MERARI: StagePropSpec[] = [
  P("tent", 120, 1.2, undefined, 0.34),
  P("tent", -95, 1.1, undefined, 0.4),
  P("column", -230, 1.25, undefined, 0.32),
  P("crate", 20, 0.9, undefined, 0.66),
  P("crate", 200, 0.85, undefined, 0.7),
  P("campfire", 265, 0.9, 0.4, 0.54),
  P("rock", -310, 1.1, undefined, 0.5),
  P("grass", 60, 0.6, undefined, 0.82),
  { ...P("clouds", -40, 1.15, undefined, 0.74), sky: true },
  { ...P("moon", 300, 0.9, undefined, 0.6), sky: true },
];

// ================================================================ MOVIMENTO 2
// OS CANTORES (v.31-48) — o coro, os dois lados do coro e a escada das
// gerações por onde as três linhagens sobem até Levi e até Israel.

// A ARCA EM REPOUSO — "depois que a arca teve repouso": a tenda que Davi armou
// para ela em Jerusalém (1Cr 16:1). Enquanto a arca andava, ninguém cantava;
// parada a arca, as harpas já estão encostadas do lado de fora, à espera.
const A_ARCA_EM_REPOUSO_NA_TENDA: StagePropSpec[] = [
  { ...P("tent", -40, 1.4, undefined, 0.24), tag: "tenda-que-davi-armou-para-a-arca" },
  { ...P("ark", 60, 1.2, undefined, 0.44), tag: "arca-da-alianca-em-jerusalem" },
  { ...P("harp", -180, 1.0, undefined, 0.6), tag: "harpa-de-davi" },
  P("harp", -110, 0.9, undefined, 0.68),
  { ...P("trumpet", 190, 0.95, undefined, 0.58), tag: "trombetas" },
  P("lampstand", 255, 0.85, undefined, 0.62),
  P("column", -300, 1.15, undefined, 0.32),
  P("grass", 120, 0.6, undefined, 0.82),
  { ...P("sun", 280, 1.0, undefined, 0.6), sky: true },
];

// O CORO DIANTE DO TABERNÁCULO — "e ministravam diante do tabernáculo da tenda
// da congregação com cantares": o pátio inteiro virado para a lona, o altar
// aceso à esquerda, as harpas à direita e as trombetas no meio. É o quadro
// mais bonito do capítulo, e não tem uma só palavra falada dentro dele.
const O_CORO_DIANTE_DO_TABERNACULO: StagePropSpec[] = [
  { ...P("tent", 0, 1.45, undefined, 0.2), tag: "tabernaculo" },
  { ...P("altar", -170, 1.1, 0.5, 0.5), tag: "altar-do-tabernaculo" },
  { ...P("harp", 120, 1.05, undefined, 0.62), tag: "harpas-da-folia-de-israel" },
  P("harp", 55, 0.95, undefined, 0.7),
  { ...P("trumpet", -60, 1.0, undefined, 0.6), tag: "trombetas-da-subida-da-arca" },
  P("column", -290, 1.2, undefined, 0.32),
  P("column", 290, 1.2, undefined, 0.32),
  P("grass", 205, 0.6, undefined, 0.8),
  { ...P("sun", 190, 1.05, undefined, 0.62), sky: true },
];

// O ESTRADO DE HEMÃ — o lugar do cantor DO MEIO. Uma plataforma baixa diante
// do santuário, a harpa dele bem no eixo do quadro, a trombeta de um lado e o
// incensário do outro, e o pátio abrindo para os dois coros laterais.
const O_ESTRADO_DE_HEMA: StagePropSpec[] = [
  { ...P("harp", 0, 1.25, undefined, 0.56), tag: "harpa-de-davi" },
  P("column", -145, 1.25, undefined, 0.36),
  P("column", 145, 1.25, undefined, 0.36),
  { ...P("trumpet", -230, 1.0, undefined, 0.56), tag: "trombetas" },
  { ...P("censer", 235, 0.95, undefined, 0.58), tag: "incenso-santo" },
  { ...P("tent", 60, 1.2, undefined, 0.22), tag: "tabernaculo" },
  P("lampstand", -70, 0.85, undefined, 0.7),
  P("grass", 100, 0.6, undefined, 0.84),
  { ...P("sun", -40, 1.1, undefined, 0.64), sky: true },
];

// A ESCADA DE BETEL — o último degrau da genealogia de Hemã não é um homem: é
// ISRAEL. E o quadro de Israel é a noite em que ele viu "uma escada posta na
// terra, cujo topo tocava nos céus" (Gn 28:12) e pôs por coluna a pedra em que
// dormira. A linhagem dos cantores acaba de subir exatamente aqui.
const A_ESCADA_DE_BETEL: StagePropSpec[] = [
  P("ladder", 20, 1.5, undefined, 0.32),
  { ...P("rock", -140, 1.15, undefined, 0.56), tag: "coluna-betel" },
  { ...P("altar", 200, 1.0, undefined, 0.52), tag: "altar-betel" },
  P("rock", -290, 1.2, undefined, 0.46),
  P("bush", 120, 0.75, undefined, 0.66),
  P("grass", -60, 0.6, undefined, 0.84),
  { ...P("starfield", -20, 1.2, undefined, 0.84), sky: true },
  { ...P("moon", 280, 0.9, undefined, 0.62), sky: true },
];

// O LADO DIREITO DO CORO — o posto de ASAFE, "à sua direita": as harpas dele
// no degrau da direita, a trombeta no meio e a lona do tabernáculo recuando
// para a esquerda. O mesmo coro, visto do outro ombro.
const ASAFE_A_DIREITA: StagePropSpec[] = [
  { ...P("harp", 175, 1.2, undefined, 0.54), tag: "harpa-do-cantico-de-davi" },
  P("harp", 240, 1.0, undefined, 0.64),
  { ...P("trumpet", 60, 1.0, undefined, 0.6), tag: "trombetas" },
  { ...P("tent", -160, 1.3, undefined, 0.24), tag: "tabernaculo" },
  P("column", -20, 1.2, undefined, 0.38),
  P("column", -290, 1.15, undefined, 0.34),
  P("lampstand", 300, 0.85, undefined, 0.66),
  P("grass", -80, 0.6, undefined, 0.82),
  { ...P("sun", 120, 1.05, undefined, 0.64), sky: true },
];

// O PÁTIO DOS CANTORES AO AMANHECER — a hora do sacrifício da manhã, quando o
// coro entrava antes do sol: o altar aceso baixo, o incensário ainda frio, as
// harpas de pé no chão e as aves cruzando o clarão da madrugada.
const O_PATIO_DOS_CANTORES_AO_AMANHECER: StagePropSpec[] = [
  { ...P("altar", -50, 1.15, 0.45, 0.5), tag: "altar-do-patio-da-arca" },
  P("harp", 105, 1.0, undefined, 0.62),
  P("harp", 170, 0.9, undefined, 0.7),
  { ...P("censer", -190, 0.95, undefined, 0.58), tag: "incenso-santo" },
  P("column", 250, 1.2, undefined, 0.34),
  P("column", -300, 1.2, undefined, 0.34),
  P("lampstand", 30, 0.85, undefined, 0.68),
  P("grass", 210, 0.6, undefined, 0.82),
  { ...P("sun", -120, 1.1, undefined, 0.4), sky: true },
  { ...P("birds", 90, 0.95, undefined, 0.54), sky: true },
];

// O LADO ESQUERDO DO CORO — o posto de ETÃ e dos filhos de Merari, "à
// esquerda". Mesma casa, mesmo dia, mas o quadro é o espelho do de Asafe: as
// harpas encostadas à esquerda e a lona do tabernáculo agora à direita.
const ETA_A_ESQUERDA: StagePropSpec[] = [
  { ...P("harp", -190, 1.2, undefined, 0.54), tag: "harpa-de-davi" },
  P("harp", -255, 1.0, undefined, 0.64),
  { ...P("trumpet", -60, 1.0, undefined, 0.6), tag: "trombetas" },
  { ...P("tent", 165, 1.3, undefined, 0.24), tag: "tabernaculo" },
  P("column", 25, 1.2, undefined, 0.38),
  P("column", 295, 1.15, undefined, 0.34),
  P("lampstand", -305, 0.85, undefined, 0.66),
  P("grass", 90, 0.6, undefined, 0.82),
  { ...P("sun", -140, 1.05, undefined, 0.64), sky: true },
];

// AS BASES DE PRATA — o fundo do tabernáculo: as bases fundidas em que
// entravam os encaixes das tábuas (Êx 26:19), a carga de Merari. Chegar a
// "filho de Merari, filho de Levi" é chegar ao alicerce da casa — o que
// ninguém vê e sem o que nada fica de pé.
const AS_BASES_DE_PRATA: StagePropSpec[] = [
  P("crate", -160, 1.1, undefined, 0.58),
  P("crate", -85, 1.0, undefined, 0.66),
  P("crate", -10, 0.95, undefined, 0.72),
  P("column", 90, 1.3, undefined, 0.34),
  P("column", 205, 1.2, undefined, 0.4),
  { ...P("tent", -260, 1.15, undefined, 0.28), tag: "tabernaculo" },
  P("rock", 300, 1.05, undefined, 0.5),
  P("grass", 45, 0.6, undefined, 0.84),
  { ...P("clouds", 150, 1.05, undefined, 0.7), sky: true },
];

// O MINISTÉRIO DA CASA DE DEUS — "e seus irmãos, os levitas, foram postos para
// todo o ministério do tabernáculo da casa de Deus": o coro no meio e a casa
// inteira em volta servindo — o altar de um lado, a pia do outro, a harpa e a
// trombeta juntas. O único quadro do capítulo em que cabe uma multidão.
const O_MINISTERIO_DA_CASA_DE_DEUS: StagePropSpec[] = [
  { ...P("tent", 0, 1.5, undefined, 0.18), tag: "tenda-da-congregacao" },
  { ...P("altar", -195, 1.15, 0.55, 0.48), tag: "altar-holocausto" },
  { ...P("pool", 190, 1.05, undefined, 0.52), tag: "pia-cobre" },
  { ...P("harp", -85, 1.0, undefined, 0.64), tag: "harpas-da-folia-de-israel" },
  { ...P("trumpet", 85, 1.0, undefined, 0.62), tag: "trombetas" },
  P("column", -300, 1.2, undefined, 0.32),
  P("column", 300, 1.2, undefined, 0.32),
  P("lampstand", -30, 0.85, undefined, 0.74),
  P("grass", 250, 0.6, undefined, 0.8),
  { ...P("sun", 60, 1.1, undefined, 0.66), sky: true },
];

// ================================================================ MOVIMENTO 3
// ARÃO E OS SEUS FILHOS (v.49-53) — os dois altares e a linha que desce outra
// vez, agora sem exílio no fim.

// OS DOIS ALTARES — o serviço inteiro de Arão cabe em dois móveis: o ALTAR DO
// HOLOCAUSTO, de bronze, no pátio de fora, onde corre o sangue; e o ALTAR DO
// INCENSO, de ouro, diante do véu, onde sobe o perfume. Entre um e outro,
// "para fazer expiação por Israel". O véu do santíssimo fecha o fundo.
const OS_DOIS_ALTARES: StagePropSpec[] = [
  { ...P("altar", -175, 1.3, 0.85, 0.5), tag: "altar-holocausto" },
  { ...P("altar", 150, 1.1, 0.35, 0.56), tag: "altar-incenso" },
  // O véu é o vão coberto entre o santo e o santíssimo, não uma tenda: com
  // `tent` o motor desenhava um toldo de acampamento dentro do templo.
  { ...P("door", 0, 1.4, undefined, 0.2), tag: "veu-santissimo" },
  { ...P("censer", 60, 0.95, undefined, 0.66), tag: "incenso-santo" },
  P("menorah", -60, 1.05, undefined, 0.6),
  P("column", -300, 1.2, undefined, 0.32),
  P("column", 300, 1.2, undefined, 0.32),
  P("bowl", -95, 0.8, undefined, 0.74),
  P("grass", 230, 0.6, undefined, 0.82),
];

// O ZELO DE FINÉIAS — "Finéias… desviou a minha ira de sobre os filhos de
// Israel… e ele e a sua descendência depois dele terão o pacto do sacerdócio
// perpétuo" (Nm 25:11-13). O arraial de Sitim ao meio-dia, a porta da tenda,
// a lança encostada e a areia branca de sol: é daqui que vem esta linha.
const O_ZELO_DE_FINEIAS: StagePropSpec[] = [
  { ...P("tent", -120, 1.3, undefined, 0.3), tag: "tenda-familia" },
  P("spear", 30, 1.1, undefined, 0.6),
  P("tent", 175, 1.1, undefined, 0.36),
  P("rock", -290, 1.15, undefined, 0.48),
  P("bush", 250, 0.8, undefined, 0.6),
  P("grass", -30, 0.6, undefined, 0.84),
  P("palm", 315, 0.95, undefined, 0.16),
  { ...P("sun", 90, 1.15, undefined, 0.72), sky: true },
];

// ================================================================ MOVIMENTO 4
// O MAPA DAS CIDADES LEVÍTICAS (v.54-81) — vinte e oito paisagens diferentes,
// porque cada versículo é um lugar diferente onde um levita foi morar.

// A SORTE LANÇADA PELOS TERMOS — antes das cidades vem o sorteio: "porque a
// eles caiu a sorte". A vasilha da sorte no chão, o rol dos levitas aberto ao
// lado, e as tendas dos que esperam o resultado nos dois extremos do campo.
const A_SORTE_LANCADA_PELOS_TERMOS: StagePropSpec[] = [
  P("bowl", -40, 1.05, undefined, 0.58),
  { ...P("scroll", 40, 0.9, undefined, 0.68), tag: "rol-dos-levitas" },
  P("rock", 130, 1.1, undefined, 0.54),
  P("tent", -200, 1.15, undefined, 0.32),
  P("tent", 225, 1.05, undefined, 0.36),
  P("palm", -320, 1.0, undefined, 0.16),
  P("bush", -110, 0.8, undefined, 0.62),
  P("grass", 190, 0.6, undefined, 0.8),
  { ...P("sun", 0, 1.05, undefined, 0.62), sky: true },
];

// HEBROM E OS SEUS ARRABALDES — a cidade dos patriarcas, murada, com a torre
// no espigão e o portão virado para o sul; e em volta dela, colada à muralha,
// a faixa de pasto que a lei mandava dar aos levitas com a cidade.
const HEBROM_E_OS_SEUS_ARRABALDES: StagePropSpec[] = [
  { ...P("church", -150, 1.3, undefined, 0.22), tag: "cidade-levita" },
  { ...P("tower", -55, 1.25, undefined, 0.26), tag: "cidade-forte" },
  { ...P("door", -230, 1.1, undefined, 0.38), tag: "portao-de-hebrom" },
  P("crate", 150, 1.6, undefined, 0.5),
  P("well", 45, 0.95, undefined, 0.58),
  P("tree", 265, 1.2, undefined, 0.24),
  P("bush", 210, 0.8, undefined, 0.6),
  P("grass", 100, 0.65, undefined, 0.8),
  { ...P("sun", -300, 1.05, undefined, 0.58), sky: true },
];

// O CAMPO E AS ALDEIAS DE CALEBE — o levita fica com a cidade e o pasto, mas o
// TERRITÓRIO e as aldeias continuam de Calebe, filho de Jefoné: as vinhas, as
// searas e os casebres espalhados pelo vale que ele tomou aos oitenta anos.
const O_CAMPO_E_AS_ALDEIAS_DE_CALEBE: StagePropSpec[] = [
  P("grapes", -120, 1.15, undefined, 0.56),
  P("grapes", -50, 1.0, undefined, 0.66),
  P("sheaf", 60, 0.95, undefined, 0.7),
  P("church", 195, 1.15, undefined, 0.26),
  P("church", 285, 1.0, undefined, 0.32),
  P("tree", -250, 1.25, undefined, 0.22),
  P("well", 130, 0.9, undefined, 0.56),
  P("grass", 10, 0.6, undefined, 0.84),
  { ...P("sun", -60, 1.05, undefined, 0.56), sky: true },
];

// A PORTA DA CIDADE DE REFÚGIO — o portão que nunca se fechava: quem matasse
// alguém sem querer corria para cá e o vingador do sangue tinha de parar do
// lado de fora. Nenhuma outra cidade do mundo antigo tinha esta porta.
const A_PORTA_DA_CIDADE_DE_REFUGIO: StagePropSpec[] = [
  { ...P("door", -30, 1.45, undefined, 0.36), tag: "cidade-de-refugio" },
  { ...P("tower", 150, 1.3, undefined, 0.24), tag: "cidade-forte" },
  P("church", 255, 1.1, undefined, 0.3),
  P("rock", -270, 1.2, undefined, 0.46),
  P("rock", -160, 1.0, undefined, 0.56),
  P("bush", 65, 0.8, undefined, 0.62),
  P("grass", -100, 0.65, undefined, 0.82),
  P("palm", 320, 0.95, undefined, 0.16),
  { ...P("sun", 40, 1.05, undefined, 0.5), sky: true },
];

// DEBIR, A CIDADE DO LIVRO — Debir chamava-se antes QUIRIATE-SEFER, "cidade do
// livro" (Js 15:15), e foi o dote de Acsa, que pediu ao pai as fontes de água
// porque lhe deram terra seca. Rolo e manancial no mesmo quadro.
const DEBIR_A_CIDADE_DO_LIVRO: StagePropSpec[] = [
  { ...P("scroll", -60, 1.15, undefined, 0.54), tag: "livro-da-demarcacao" },
  { ...P("well", 120, 1.0, undefined, 0.58), tag: "fontes-de-acsa" },
  P("church", -215, 1.2, undefined, 0.26),
  P("tower", 230, 1.15, undefined, 0.28),
  P("rock", 30, 1.05, undefined, 0.68),
  P("rock", -305, 1.15, undefined, 0.48),
  P("bush", 175, 0.75, undefined, 0.66),
  P("grass", -140, 0.6, undefined, 0.82),
  { ...P("clouds", 60, 1.0, undefined, 0.7), sky: true },
];

// BETE-SEMES NO VALE DO TRIGO — "a casa do sol", na baixada de Sorec por onde
// as vacas subiram sozinhas trazendo a arca de volta dos filisteus (1Sm 6:12).
// Aqui a sega é a paisagem: três medas na frente e a cidade pequena atrás.
const BETE_SEMES_NO_VALE_DO_TRIGO: StagePropSpec[] = [
  P("sheaf", -150, 1.2, undefined, 0.58),
  P("sheaf", -80, 1.05, undefined, 0.66),
  P("sheaf", -10, 0.95, undefined, 0.72),
  { ...P("church", 175, 1.2, undefined, 0.26), tag: "cidade-levita" },
  P("crate", 75, 1.5, undefined, 0.5),
  P("tree", 280, 1.15, undefined, 0.22),
  P("bush", -250, 0.8, undefined, 0.58),
  P("grass", 120, 0.6, undefined, 0.82),
  { ...P("sun", -60, 1.25, undefined, 0.66), sky: true },
];

// O ESPIGÃO DE BENJAMIM — Geba, Alemete e ANATOTE, alinhadas na crista de
// pedra ao norte de Jerusalém. Anatote é a casa de sacerdotes para onde
// Salomão desterrou Abiatar e onde nasceria Jeremias: três torres na mesma
// linha de horizonte, e a estrada de Jerusalém passando debaixo delas.
const O_ESPIGAO_DE_BENJAMIM: StagePropSpec[] = [
  { ...P("tower", -190, 1.3, undefined, 0.22), tag: "cidade-forte" },
  P("tower", -20, 1.15, undefined, 0.3),
  P("tower", 165, 1.05, undefined, 0.36),
  { ...P("church", 275, 1.05, undefined, 0.28), tag: "casa-de-abiatar-em-anatote" },
  P("rock", -300, 1.2, undefined, 0.46),
  P("bush", 60, 0.8, undefined, 0.62),
  P("grass", -110, 0.6, undefined, 0.82),
  P("tree", 90, 1.1, undefined, 0.24),
  { ...P("clouds", 210, 1.0, undefined, 0.72), sky: true },
];

// O PLANALTO DA MEIA TRIBO — as dez cidades que sobraram para os coatitas
// ficam do lado ocidental de Manassés, no planalto largo: curral, duas tendas
// de pastores e pedra à flor da terra até onde a vista alcança.
const O_PLANALTO_DA_MEIA_TRIBO: StagePropSpec[] = [
  P("crate", -140, 1.7, undefined, 0.48),
  P("tent", 90, 1.15, undefined, 0.34),
  P("tent", 215, 1.0, undefined, 0.4),
  P("bowl", -30, 0.95, undefined, 0.62),
  P("rock", 300, 1.1, undefined, 0.5),
  P("rock", -280, 1.05, undefined, 0.56),
  P("bush", 160, 0.75, undefined, 0.62),
  P("grass", 30, 0.6, undefined, 0.82),
  { ...P("sun", 250, 1.05, undefined, 0.54), sky: true },
];

// OS PASTOS DE BASÃ — a terra mais gorda de Israel, dos carvalhos e das vacas
// que Amós chamou "vacas de Basã" (Am 4:1). Treze cidades dos gersonitas
// caíram aqui: três árvores grandes, o curral cheio e o poço sempre com água.
const OS_PASTOS_DE_BASA: StagePropSpec[] = [
  P("tree", -220, 1.35, undefined, 0.2),
  P("tree", -80, 1.2, undefined, 0.26),
  P("tree", 210, 1.25, undefined, 0.24),
  P("crate", 60, 1.65, undefined, 0.5),
  P("well", 150, 0.95, undefined, 0.58),
  P("sheaf", -140, 0.85, undefined, 0.7),
  P("grass", 0, 0.7, undefined, 0.84),
  P("bush", 290, 0.8, undefined, 0.6),
  { ...P("birds", 120, 1.0, undefined, 0.52), sky: true },
  { ...P("sun", -30, 1.05, undefined, 0.6), sky: true },
];

// DE UM LADO E DO OUTRO DO JORDÃO — as doze cidades de Merari saem de RÚBEN e
// GADE, do lado de lá do rio, e de ZEBULOM, do lado do mar. Uma família só,
// repartida entre o vau do Jordão e a beira-mar: o rio no meio do quadro.
const DE_UM_LADO_E_DO_OUTRO_DO_JORDAO: StagePropSpec[] = [
  { ...P("river", -30, 1.4, undefined, 0.5), tag: "vau-do-jordao" },
  P("boat", 175, 1.05, undefined, 0.62),
  P("tent", -240, 1.15, undefined, 0.3),
  P("tent", 240, 1.1, undefined, 0.32),
  P("rock", -140, 1.1, undefined, 0.68),
  P("palm", 310, 0.95, undefined, 0.16),
  P("bush", 90, 0.75, undefined, 0.66),
  P("grass", 30, 0.6, undefined, 0.84),
  { ...P("sun", 120, 1.05, undefined, 0.56), sky: true },
];

// A ENTREGA DAS CIDADES — "assim os filhos de Israel deram aos levitas estas
// cidades": a única tribo que não conquistou nada recebe quarenta e oito
// cidades das mãos das outras onze. O portão aberto, o rol na mão do levita e
// o povo em volta — é a cena de alegria do mapa.
const A_ENTREGA_DAS_CIDADES: StagePropSpec[] = [
  P("door", 10, 1.4, undefined, 0.38),
  { ...P("tower", -175, 1.25, undefined, 0.24), tag: "cidade-levita" },
  P("church", 165, 1.15, undefined, 0.28),
  { ...P("scroll", -70, 0.95, undefined, 0.66), tag: "rol-dos-levitas" },
  P("crate", 250, 0.85, undefined, 0.64),
  P("palm", -320, 1.0, undefined, 0.16),
  P("bush", 100, 0.75, undefined, 0.62),
  P("grass", -110, 0.6, undefined, 0.82),
  { ...P("sun", 60, 1.1, undefined, 0.62), sky: true },
];

// OS NOMES DADOS ÀS CIDADES — "às quais deram os seus nomes": as três tribos
// do sul — Judá, Simeão e Benjamim — plantam as suas tendas em volta e o
// escrivão risca na pedra do marco o nome de cada cidade sorteada.
const OS_NOMES_DADOS_AS_CIDADES: StagePropSpec[] = [
  { ...P("rock", -20, 1.2, undefined, 0.56), tag: "pedra-testemunho" },
  P("scroll", 90, 1.0, undefined, 0.64),
  P("tent", -210, 1.15, undefined, 0.32),
  P("tent", -110, 1.05, undefined, 0.38),
  P("tent", 200, 1.1, undefined, 0.34),
  P("tree", 300, 1.15, undefined, 0.22),
  P("bush", 40, 0.75, undefined, 0.72),
  P("grass", 150, 0.6, undefined, 0.82),
  { ...P("sun", -280, 1.05, undefined, 0.44), sky: true },
];

// OS TERMOS DE EFRAIM — o resto da família de Coate recebe cidades dentro dos
// TERMOS de Efraim: a marca de pedra no meio da lavoura, os dois carvalhos
// que servem de referência e o poço que divide o gado de dois donos.
const OS_TERMOS_DE_EFRAIM: StagePropSpec[] = [
  P("tree", -230, 1.35, undefined, 0.2),
  P("tree", 130, 1.2, undefined, 0.26),
  { ...P("rock", -60, 1.15, undefined, 0.58), tag: "marco-dos-termos-de-israel" },
  P("sheaf", 40, 0.95, undefined, 0.7),
  P("church", 245, 1.1, undefined, 0.3),
  P("well", -150, 0.9, undefined, 0.62),
  P("bush", 300, 0.8, undefined, 0.6),
  P("grass", 190, 0.6, undefined, 0.82),
  { ...P("clouds", 20, 1.05, undefined, 0.72), sky: true },
];

// SIQUÉM NO MONTE DE EFRAIM — encravada entre o Ebal e o Gerizim, ao pé do
// CARVALHO onde Jacó enterrou os deuses estranhos (Gn 35:4) e onde Josué pôs a
// pedra do concerto (Js 24:26). Cidade de refúgio no alto da montanha.
const SIQUEM_NO_MONTE_DE_EFRAIM: StagePropSpec[] = [
  { ...P("tree", -110, 1.4, undefined, 0.28), tag: "carvalho-de-siquem" },
  { ...P("door", 40, 1.3, undefined, 0.4), tag: "cidade-refugio" },
  { ...P("tower", 215, 1.2, undefined, 0.3), tag: "cidade-forte" },
  P("rock", -290, 1.3, undefined, 0.44),
  P("rock", 120, 1.05, undefined, 0.62),
  P("bush", -30, 0.75, undefined, 0.7),
  P("grass", 290, 0.6, undefined, 0.8),
  { ...P("clouds", -180, 1.1, undefined, 0.66), sky: true },
];

// A DESCIDA DE BETE-HOROM — a ladeira de pedra por onde se despenca do planalto
// para a planície, a mesma em que o SENHOR fez cair pedras do céu sobre os
// amorreus (Js 10:11). Quatro degraus de rocha e a cidade lá em cima.
const A_DESCIDA_DE_BETE_HOROM: StagePropSpec[] = [
  P("rock", -240, 1.35, undefined, 0.34),
  P("rock", -110, 1.2, undefined, 0.48),
  P("rock", 20, 1.05, undefined, 0.62),
  P("rock", 145, 0.95, undefined, 0.74),
  { ...P("tower", 240, 1.15, undefined, 0.26), tag: "cidade-forte" },
  P("bush", 90, 0.7, undefined, 0.68),
  P("grass", -180, 0.6, undefined, 0.8),
  P("palm", 320, 0.9, undefined, 0.18),
  { ...P("sun", -60, 1.0, undefined, 0.42), sky: true },
];

// O VALE DE AIJALOM — "sol, detém-te em Gibeom, e tu, lua, no vale de Aijalom"
// (Js 10:12). O vale mais famoso do céu de Israel entregue a uma família de
// levitas: a lua sobe cedo entre os dois espigões e o gado já recolhe.
const O_VALE_DE_AIJALOM: StagePropSpec[] = [
  P("rock", -215, 1.3, undefined, 0.4),
  P("rock", 195, 1.25, undefined, 0.44),
  P("church", -70, 1.1, undefined, 0.3),
  P("crate", 95, 1.5, undefined, 0.54),
  P("sheaf", -140, 0.9, undefined, 0.68),
  P("tree", 285, 1.1, undefined, 0.24),
  P("bush", 20, 0.75, undefined, 0.66),
  P("grass", 150, 0.6, undefined, 0.82),
  { ...P("moon", -20, 1.15, undefined, 0.66), sky: true },
];

// ANER E BILEÃ — as duas últimas cidades dos coatitas, na meia tribo de
// Manassés: duas aldeias pequenas de pedra solta, o curral entre elas, a eira
// do fim de tarde e o poço da estrada. O mapa aqui respira devagar.
const ANER_E_BILEA: StagePropSpec[] = [
  P("church", -160, 1.2, undefined, 0.26),
  P("church", 100, 1.05, undefined, 0.32),
  P("crate", -30, 1.5, undefined, 0.52),
  P("sheaf", 175, 0.95, undefined, 0.64),
  P("well", 245, 0.9, undefined, 0.56),
  P("tree", -290, 1.2, undefined, 0.22),
  P("bush", 55, 0.75, undefined, 0.7),
  P("grass", -100, 0.6, undefined, 0.82),
  { ...P("sun", 200, 1.05, undefined, 0.4), sky: true },
];

// GOLÃ E ASTAROTE — do outro lado, em Basã, a cidade de refúgio de Golã e
// ASTAROTE, a capital de Ogue, o último dos gigantes (Dt 1:4). Colunas velhas
// caídas de uma cidade que já era antiga quando Israel chegou.
const GOLA_E_ASTAROTE: StagePropSpec[] = [
  { ...P("tower", 130, 1.3, undefined, 0.24), tag: "cidade-forte" },
  P("column", -80, 1.25, undefined, 0.36),
  P("column", -10, 1.15, undefined, 0.42),
  P("rock", -260, 1.35, undefined, 0.4),
  P("rock", 240, 1.5, undefined, 0.52),
  P("tree", 40, 1.15, undefined, 0.24),
  P("bush", -150, 0.8, undefined, 0.62),
  P("grass", 90, 0.6, undefined, 0.82),
  { ...P("clouds", 300, 1.05, undefined, 0.7), sky: true },
];

// QUEDES E DABERATE — a planície de Issacar, o celeiro do norte, ao pé do
// Tabor: medas na frente, curral e poço no meio, a aldeia atrás e as aves da
// colheita cortando o céu. A tribo que "conhecia os tempos" morava aqui.
const QUEDES_E_DABERATE: StagePropSpec[] = [
  P("sheaf", -190, 1.15, undefined, 0.6),
  P("sheaf", -120, 1.05, undefined, 0.68),
  P("crate", 30, 1.6, undefined, 0.5),
  P("church", 175, 1.15, undefined, 0.28),
  P("tree", 285, 1.2, undefined, 0.22),
  P("well", 105, 0.9, undefined, 0.6),
  P("bush", -260, 0.8, undefined, 0.58),
  P("grass", 240, 0.6, undefined, 0.8),
  { ...P("birds", -40, 1.0, undefined, 0.5), sky: true },
  { ...P("sun", 220, 1.05, undefined, 0.58), sky: true },
];

// OS MANANCIAIS DE ANÉM — Aném quer dizer "duas fontes", e é isso que se vê:
// dois poços um atrás do outro, o ribeiro correndo à direita e as bilhas
// enchendo. Numa terra de sede, uma cidade com nome de água é um presente.
const OS_MANANCIAIS_DE_ANEM: StagePropSpec[] = [
  P("well", -130, 1.1, undefined, 0.54),
  P("well", -20, 1.0, undefined, 0.64),
  P("river", 175, 1.25, undefined, 0.48),
  P("tree", -260, 1.25, undefined, 0.22),
  P("tree", 75, 1.05, undefined, 0.28),
  P("amphora", 40, 0.8, undefined, 0.74),
  P("bush", 290, 0.8, undefined, 0.6),
  P("grass", 230, 0.6, undefined, 0.8),
  { ...P("sun", -60, 1.05, undefined, 0.5), sky: true },
];

// A COSTA DE ASER — a única tribo com pé no mar: Masal e Abdom ficam na faixa
// de praia ao norte do Carmelo, onde Jacó disse que "de Aser, o seu pão será
// gordo" (Gn 49:20). Barcos varados, azeite em bilhas e gaivotas.
const A_COSTA_DE_ASER: StagePropSpec[] = [
  P("boat", -60, 1.25, undefined, 0.56),
  P("boat", 90, 1.0, undefined, 0.66),
  { ...P("church", 215, 1.15, undefined, 0.26), tag: "cidade-levita" },
  P("tree", -240, 1.2, undefined, 0.24),
  P("amphora", -150, 0.85, undefined, 0.7),
  P("crate", 160, 0.8, undefined, 0.72),
  P("rock", 300, 1.05, undefined, 0.5),
  P("grass", 20, 0.6, undefined, 0.84),
  { ...P("birds", -120, 1.0, undefined, 0.54), sky: true },
  { ...P("sun", 130, 1.1, undefined, 0.4), sky: true },
];

// OS LAGARES DE ASER — subindo da praia, o interior de Aser é oliveira e
// lagar: as bilhas do azeite alinhadas à sombra, o caixote da prensa e o poço
// da aldeia. É a riqueza mansa que o Cronista não precisa nomear.
const OS_LAGARES_DE_ASER: StagePropSpec[] = [
  P("tree", -215, 1.3, undefined, 0.22),
  P("tree", -95, 1.15, undefined, 0.28),
  P("amphora", -30, 1.0, undefined, 0.62),
  P("amphora", 35, 0.9, undefined, 0.7),
  P("crate", 110, 0.85, undefined, 0.74),
  P("well", 195, 1.0, undefined, 0.54),
  P("church", 285, 1.05, undefined, 0.3),
  P("grass", 150, 0.6, undefined, 0.82),
  { ...P("clouds", 60, 1.05, undefined, 0.7), sky: true },
];

// QUEDES NA GALILÉIA — a terceira cidade de refúgio do lado ocidental, no alto
// verde de Naftali, com o ribeiro descendo ao lado do portão. É o quadro mais
// verde do capítulo, e o mais fresco: água, folha e porta aberta.
const QUEDES_NA_GALILEIA: StagePropSpec[] = [
  { ...P("door", -50, 1.4, undefined, 0.38), tag: "cidade-de-refugio" },
  P("tree", -220, 1.35, undefined, 0.2),
  P("tree", 120, 1.2, undefined, 0.26),
  P("river", 245, 1.2, undefined, 0.5),
  P("well", 40, 0.9, undefined, 0.62),
  P("bush", -130, 0.8, undefined, 0.68),
  P("grass", 190, 0.65, undefined, 0.84),
  P("rock", -310, 1.1, undefined, 0.48),
  { ...P("birds", 60, 1.0, undefined, 0.52), sky: true },
  { ...P("sun", -90, 1.05, undefined, 0.6), sky: true },
];

// O MONTE TABOR — o cone perfeito que se levanta sozinho no meio da planície
// de Jezreel, o monte de Débora e de Baraque (Jz 4:6) e o carvalho de Tabor do
// caminho de Samuel (1Sm 10:3). Zebulom cedeu a montanha a um levita.
const O_MONTE_TABOR: StagePropSpec[] = [
  P("rock", -40, 1.5, undefined, 0.3),
  { ...P("tree", 30, 1.2, undefined, 0.2), tag: "carvalho-de-tabor" },
  P("church", -230, 1.1, undefined, 0.28),
  P("rock", 220, 1.25, undefined, 0.44),
  P("rock", 130, 1.5, undefined, 0.56),
  P("bush", -140, 0.8, undefined, 0.62),
  P("grass", 80, 0.6, undefined, 0.82),
  P("sheaf", -190, 0.85, undefined, 0.72),
  { ...P("clouds", 260, 1.1, undefined, 0.68), sky: true },
];

// BEZER NO DESERTO — "dalém do Jordão, na altura de Jericó, ao oriente": a
// cidade de refúgio de Rúben plantada no planalto seco, onde não há árvore que
// esconda ninguém. Quem corre para cá é visto de longe — e chega.
const BEZER_NO_DESERTO: StagePropSpec[] = [
  { ...P("door", 20, 1.35, undefined, 0.4), tag: "cidade-refugio" },
  P("tower", 175, 1.15, undefined, 0.28),
  P("rock", -210, 1.3, undefined, 0.44),
  P("rock", -60, 1.1, undefined, 0.62),
  P("palm", -320, 1.0, undefined, 0.16),
  P("palm", 315, 0.95, undefined, 0.18),
  P("bush", 95, 0.7, undefined, 0.7),
  P("grass", 255, 0.55, undefined, 0.8),
  { ...P("sun", -120, 1.2, undefined, 0.72), sky: true },
];

// A CAMPINA DE QUEDEMOTE — o descampado de onde Moisés mandou mensageiros de
// paz a Seom (Dt 2:26), agora arraial de levitas: duas tendas, a fogueira da
// noite, o curral e o silêncio da estepe debaixo das estrelas.
const A_CAMPINA_DE_QUEDEMOTE: StagePropSpec[] = [
  P("tent", -170, 1.2, undefined, 0.34),
  P("tent", -60, 1.05, undefined, 0.42),
  P("campfire", 60, 1.0, 0.6, 0.58),
  P("crate", 200, 1.5, undefined, 0.5),
  P("rock", 300, 1.15, undefined, 0.48),
  P("bush", -260, 0.75, undefined, 0.6),
  P("grass", 130, 0.55, undefined, 0.82),
  P("palm", 320, 0.9, undefined, 0.18),
  { ...P("moon", -20, 1.0, undefined, 0.62), sky: true },
  { ...P("starfield", 180, 1.05, undefined, 0.84), sky: true },
];

// RAMOTE EM GILEADE — a cidade de refúgio de Gade, no alto da serra por onde
// corre o Jaboque, e MAANAIM, "dois arraiais", o lugar onde os anjos de Deus
// saíram ao encontro de Jacó (Gn 32:2). Rio à esquerda, duas tendas à direita.
const RAMOTE_EM_GILEADE: StagePropSpec[] = [
  P("river", -110, 1.35, undefined, 0.52),
  { ...P("tower", 90, 1.25, undefined, 0.26), tag: "cidade-de-refugio" },
  P("tent", 215, 1.1, undefined, 0.34),
  P("tent", 290, 1.0, undefined, 0.4),
  P("tree", -270, 1.25, undefined, 0.22),
  P("rock", 10, 1.5, undefined, 0.62),
  P("bush", 160, 0.75, undefined, 0.66),
  P("grass", -40, 0.6, undefined, 0.84),
  { ...P("sun", 250, 1.05, undefined, 0.56), sky: true },
];

// AS PISCINAS DE HESBOM — "os teus olhos são como as piscinas de Hesbom"
// (Ct 7:4), e JAZER é terra de vinha, que Isaías chorou junto com Sibma (Is
// 16:8-9). A última cidade da lista é água e uva: o mapa acaba em fartura.
const AS_PISCINAS_DE_HESBOM: StagePropSpec[] = [
  P("pool", -120, 1.25, undefined, 0.54),
  P("grapes", 90, 1.15, undefined, 0.6),
  P("grapes", 160, 1.0, undefined, 0.68),
  P("church", 235, 1.15, undefined, 0.26),
  P("tower", -250, 1.2, undefined, 0.24),
  P("amphora", -30, 0.85, undefined, 0.72),
  P("tree", 20, 1.1, undefined, 0.24),
  P("grass", 290, 0.6, undefined, 0.8),
  { ...P("sun", -60, 1.1, undefined, 0.5), sky: true },
];

// ============================================================================
// ROTEIRO — 81 beats, v.1 a v.81. Nenhum `by`: em 1 Crônicas 6 ninguém abre a
// boca, e o que Deus faz aqui Ele faz pelo fogo dos dois altares e pela mão
// que leva Judá cativo. Tudo é contado pelo lugar, pelo ofício e pela luz.
// ============================================================================

export const CHAPTERS: Record<number, StageScript> = {
  6: {
    start: { terrain: "desert", night: 0.14, glory: 0.32, storm: 0.08, fire: 0.08, water: 0.05, verdure: 0.14 },
    beats: [
      // ------------------------------------------- MOVIMENTO 1 · v.1-30
      // v.1 — a raiz. Levi, de pé no descampado do arraial, apontando os três
      // filhos que vão virar três serviços: lona, arca e tábuas.
      b(1, { q: "Os filhos de Levi foram",
        set: "tenda-dos-filhos-de-levi", props: TENDA_DOS_FILHOS_DE_LEVI,
        env: { terrain: "desert", night: 0.14, glory: 0.34, storm: 0.08, fire: 0.06, water: 0.05, verdure: 0.14 }, cast: [
        C("patriarca", -45, "point", { dy: 0.52, facing: 1, id: "levi-pai-das-tres-casas" }),
        C("homem", 85, "stand", { dy: 0.44, facing: -1, id: "gerson-filho-de-levi" }),
        C("homem", 170, "stand", { dy: 0.52, facing: -1, id: "coate-filho-de-levi" }),
        C("homem", 250, "stand", { dy: 0.42, facing: -1, id: "merari-filho-de-levi" }),
      ] }),
      // v.2 — a casa do meio é a que leva a ARCA e os vasos santos, ao ombro e
      // nunca em carro (Nm 4:15). Os quatro filhos de Coate em volta dela.
      b(2, { q: "Anrão, e Izar, e Hebrom, e Uziel",
        set: "a-arca-dos-coatitas", props: A_ARCA_DOS_COATITAS,
        env: { terrain: "field", night: 0.16, glory: 0.5, storm: 0.06, fire: 0.05, water: 0.06, verdure: 0.2 }, cast: [
        C("patriarca", -200, "point", { dy: 0.5, facing: 1, id: "coate-filho-de-levi" }),
        C("homem", -95, "bow", { dy: 0.56, facing: 1, id: "anrao-pai-de-arao" }),
        C("homem", 80, "stand", { dy: 0.6, facing: -1, id: "izar-filho-de-coate" }),
        C("homem", 175, "stand", { dy: 0.52, facing: -1, id: "hebrom-filho-de-coate" }),
        C("homem", 255, "stand", { dy: 0.46, facing: -1, id: "uziel-filho-de-coate" }),
      ] }),
      // v.3 — o versículo mais povoado da primeira parte: de uma casa só saem
      // o libertador, o sumo sacerdote e a profetisa — e logo os quatro filhos
      // de Arão, dois dos quais morreriam com fogo estranho nas mãos.
      b(3, { q: "Arão, Moisés, e Miriã",
        set: "patio-do-altar-do-holocausto", props: PATIO_DO_ALTAR_DO_HOLOCAUSTO,
        env: { terrain: "field", night: 0.12, glory: 0.62, storm: 0.05, fire: 0.4, water: 0.05, verdure: 0.16 }, cast: [
        C("moises", -235, "stand", { dy: 0.44, facing: 1, id: "moises" }),
        C("arao", -140, "raise", { dy: 0.5, facing: 1, id: "arao", glow: 0.3 }),
        C("mulherComum", -40, "stand", { dy: 0.6, facing: 1, id: "mirian-irma-de-arao" }),
        C("homem", 70, "stand", { dy: 0.66, facing: -1, id: "nadabe-filho-de-arao" }),
        C("homem", 145, "stand", { dy: 0.62, facing: -1, id: "abiu-filho-de-arao" }),
        C("homem", 220, "bow", { dy: 0.56, facing: -1, id: "eleazar-filho-de-arao" }),
        C("homem", 290, "stand", { dy: 0.5, facing: -1, id: "itamar-filho-de-arao" }),
      ] }),
      // v.4 — começa a corrente do sacerdócio. O primeiro degrau é a água: mãos
      // e pés lavados na pia de cobre antes de tocar em coisa nenhuma.
      b(4, { q: "E Eleazar gerou a Finéias",
        set: "atrio-da-pia-de-cobre", props: O_ATRIO_DA_PIA_DE_COBRE,
        env: { terrain: "field", night: 0.2, glory: 0.44, storm: 0.06, fire: 0.2, water: 0.09, verdure: 0.14 }, cast: [
        C("anciao", -145, "bow", { dy: 0.58, facing: 1, id: "eleazar-filho-de-arao" }),
        C("homem", 15, "kneel", { dy: 0.64, facing: -1, id: "fineias-filho-de-eleazar" }),
        C("homem", 145, "stand", { dy: 0.52, facing: -1, id: "abisua-filho-de-fineias" }),
      ] }),
      // v.5 — dentro do lugar santo, a corrente segue à luz das lâmpadas: aqui
      // não entra sol, e quem serve não vê o povo nem é visto por ele.
      b(5, { q: "E Abisua gerou a Buqui",
        set: "o-lugar-santo", props: O_LUGAR_SANTO,
        env: { terrain: "city", night: 0.5, glory: 0.5, storm: 0.03, fire: 0.34, water: 0.04, verdure: 0.03 }, cast: [
        C("anciao", -105, "stand", { dy: 0.6, facing: 1, id: "abisua-filho-de-fineias" }),
        C("homem", 20, "raise", { dy: 0.66, facing: 1, id: "buqui-filho-de-abisua" }),
        C("homem", 120, "stand", { dy: 0.56, facing: -1, id: "uzi-filho-de-buqui" }),
      ] }),
      // v.6 — a sala dos doze pães, renovados de sábado em sábado: o ofício que
      // não tem plateia nenhuma e que ninguém pode faltar.
      b(6, { q: "E Uzi gerou a Zeraías",
        set: "camara-dos-paes-da-proposicao", props: A_CAMARA_DOS_PAES_DA_PROPOSICAO,
        env: { terrain: "city", night: 0.46, glory: 0.46, storm: 0.03, fire: 0.28, water: 0.03, verdure: 0.03 }, cast: [
        C("anciao", -175, "point", { dy: 0.62, facing: 1, id: "uzi-filho-de-buqui" }),
        C("homem", -60, "bow", { dy: 0.7, facing: 1, id: "zeraias-filho-de-uzi" }),
        C("homem", 65, "stand", { dy: 0.64, facing: -1, id: "meraiote-filho-de-zeraias" }),
      ] }),
      // v.7 — a vigília: os nomes desta faixa não deixaram uma linha de
      // história, e é justamente isso que a cena diz — gerações inteiras de
      // homens acordados de noite para que a lâmpada não se apagasse.
      b(7, { q: "E Meraiote gerou a Amarias",
        set: "vigilia-da-noite-no-santuario", props: A_VIGILIA_DA_NOITE_NO_SANTUARIO,
        env: { terrain: "city", night: 0.74, glory: 0.4, storm: 0.05, fire: 0.3, water: 0.03, verdure: 0.04 }, cast: [
        C("anciao", -200, "stand", { dy: 0.56, facing: 1, id: "meraiote-filho-de-zeraias" }),
        C("homem", -75, "kneel", { dy: 0.66, facing: 1, id: "amarias-filho-de-meraiote" }),
        C("homem", 60, "walk", { dy: 0.6, facing: -1, id: "aitube-filho-de-amarias" }),
      ] }),
      // v.8 — ZADOQUE. A corrente chega ao sacerdote dos dias de Davi, que
      // ficou servindo no alto de Gibeão, onde o tabernáculo de Moisés estava,
      // enquanto a arca já morava em Jerusalém.
      b(8, { q: "E Aitube gerou a Zadoque",
        set: "alto-de-gibeao", props: O_ALTO_DE_GIBEAO,
        env: { terrain: "mountain", night: 0.34, glory: 0.5, storm: 0.22, fire: 0.4, water: 0.05, verdure: 0.12 }, cast: [
        C("anciao", -190, "stand", { dy: 0.54, facing: 1, id: "aitube-filho-de-amarias" }),
        C("anciao", -20, "raise", { dy: 0.62, facing: 1, id: "zadoque-filho-de-aitube", glow: 0.25 }),
        C("homem", 190, "stand", { dy: 0.58, facing: -1, id: "aimaas-filho-de-zadoque" }),
      ] }),
      // v.9 — de volta ao pátio de fora, em dia comum de sacrifício: o pai
      // ensina o filho a pôr a lenha, e o neto observa da soleira.
      b(9, { q: "E Aimaás gerou a Azarias",
        set: "patio-do-altar-do-holocausto", props: PATIO_DO_ALTAR_DO_HOLOCAUSTO,
        env: { terrain: "field", night: 0.14, glory: 0.5, storm: 0.05, fire: 0.46, water: 0.05, verdure: 0.16 }, cast: [
        C("anciao", -155, "point", { dy: 0.56, facing: 1, id: "aimaas-filho-de-zadoque" }),
        C("homem", -20, "raise", { dy: 0.64, facing: 1, id: "azarias-filho-de-aimaas" }),
        C("homem", 175, "stand", { dy: 0.5, facing: -1, id: "joana-filho-de-azarias" }),
      ] }),
      // v.10 — ⭐ o ponto mais alto da primeira parte: a genealogia para de
      // enfileirar nomes e diz para que serviu a linha inteira — "este é o que
      // exerceu o sacerdócio NA CASA QUE SALOMÃO TINHA EDIFICADO EM JERUSALÉM".
      // Mar de fundição à esquerda, altar aceso à direita, glória no auge.
      b(10, { q: "este é o que exerceu o sacerdócio na casa que Salomão tinha edificado em Jerusalém",
        set: "a-casa-que-salomao-edificou", props: A_CASA_QUE_SALOMAO_EDIFICOU,
        env: { terrain: "city", night: 0.1, glory: 0.86, storm: 0.03, fire: 0.5, water: 0.07, verdure: 0.1 }, cast: [
        C("anciao", -25, "raise", { dy: 0.6, facing: 1, id: "azarias-do-templo-de-salomao", glow: 0.45 }),
        C("rei", -165, "stand", { dy: 0.54, facing: 1, id: "salomao" }),
        C("servo", 170, "kneel", { dy: 0.66, facing: -1, id: "servo-do-patio-do-templo" }),
      ] }),
      // v.11 — a mesma casa, agora vista da porta: entre JAQUIM e BOAZ passava
      // todo sacerdote desta linha para entrar ao serviço.
      b(11, { q: "E Azarias gerou a Amarias",
        set: "portico-de-jaquim-e-boaz", props: O_PORTICO_DE_JAQUIM_E_BOAZ,
        env: { terrain: "city", night: 0.2, glory: 0.66, storm: 0.08, fire: 0.2, water: 0.08, verdure: 0.08 }, cast: [
        C("anciao", -185, "walk", { dy: 0.52, facing: 1, id: "azarias-do-templo-de-salomao" }),
        C("homem", 0, "stand", { dy: 0.64, facing: 1, id: "amarias-filho-de-azarias" }),
        C("homem", 165, "stand", { dy: 0.56, facing: -1, id: "aitube-filho-de-amarias-ii" }),
      ] }),
      // v.12 — dentro outra vez, e a luz já não é a mesma: os reinados vão
      // piorando lá fora, e a genealogia atravessa isso sem comentar.
      b(12, { q: "E Aitube gerou a Zadoque, e Zadoque gerou a Salum",
        set: "o-lugar-santo", props: O_LUGAR_SANTO,
        env: { terrain: "city", night: 0.6, glory: 0.34, storm: 0.08, fire: 0.24, water: 0.03, verdure: 0.03 }, cast: [
        C("anciao", -130, "stand", { dy: 0.58, facing: 1, id: "aitube-filho-de-amarias-ii" }),
        C("homem", -15, "bow", { dy: 0.68, facing: 1, id: "zadoque-filho-de-aitube-ii" }),
        C("homem", 135, "stand", { dy: 0.6, facing: -1, id: "salum-filho-de-zadoque" }),
      ] }),
      // v.13 — HILQUIAS. É este o sumo sacerdote que, tirando o dinheiro da
      // obra da casa, achou o LIVRO DA LEI (2Rs 22:8): a última boa notícia da
      // linhagem, e ela vem no meio de um andaime.
      b(13, { q: "E Salum gerou a Hilquias",
        set: "casa-do-senhor-em-reparo", props: A_CASA_DO_SENHOR_EM_REPARO,
        env: { terrain: "city", night: 0.32, glory: 0.6, storm: 0.1, fire: 0.2, water: 0.06, verdure: 0.08 }, cast: [
        C("anciao", 55, "raise", { dy: 0.62, facing: -1, id: "hilquias-o-sumo-sacerdote", glow: 0.35 }),
        C("homem", -60, "stand", { dy: 0.7, facing: 1, id: "salum-filho-de-zadoque" }),
        C("homem", 215, "stand", { dy: 0.54, facing: -1, id: "azarias-filho-de-hilquias" }),
      ] }),
      // v.14 — SERAÍAS, o sacerdote principal que Nabuzaradã levaria a Ribla, e
      // JEOZADAQUE, o filho dele. A casa ainda de pé e o fogo do altar baixo:
      // é o penúltimo quadro antes de a conta acabar em cativeiro.
      b(14, { q: "e Seraías gerou a Jeozadaque",
        set: "templo-na-ultima-geracao", props: O_TEMPLO_NA_ULTIMA_GERACAO,
        env: { terrain: "city", night: 0.56, glory: 0.24, storm: 0.3, fire: 0.14, water: 0.05, verdure: 0.05 }, cast: [
        C("anciao", -200, "stand", { dy: 0.56, facing: 1, id: "azarias-filho-de-hilquias" }),
        C("anciao", -60, "bow", { dy: 0.66, facing: 1, id: "seraias-o-sacerdote-principal" }),
        C("homem", 130, "stand", { dy: 0.6, facing: -1, id: "jeozadaque-filho-de-seraias" }),
      ] }),
      // v.15 — ⭐ o único quadro escuro desta primeira parte, e o Cronista o põe
      // no meio da conta: "E JEOZADAQUE FOI LEVADO CATIVO QUANDO O SENHOR LEVOU
      // PRESOS A JUDÁ E A JERUSALÉM PELA MÃO DE NABUCODONOSOR". A cidade arde
      // atrás; à frente vai gente, uma a uma, para fora da própria casa. Sem
      // multidão: ninguém comemora aqui.
      b(15, { q: "foi levado cativo quando o Senhor levou presos a Judá e a Jerusalém pela mão de Nabucodonosor",
        set: "o-caminho-do-cativeiro", props: O_CAMINHO_DO_CATIVEIRO,
        env: { terrain: "city", night: 0.84, glory: 0.04, storm: 0.5, fire: 0.4, water: 0.03, verdure: 0.03 }, cast: [
        C("anciao", -55, "bow", { dy: 0.66, facing: 1, id: "jeozadaque-levado-cativo" }),
        C("homem", 55, "walk", { dy: 0.72, facing: 1, id: "cativo-de-juda" }),
        C("mulherComum", 140, "walk", { dy: 0.62, facing: 1, id: "cativa-de-jerusalem" }),
        C("homem", 245, "point", { dy: 0.54, facing: -1, id: "guarda-de-nabucodonosor" }),
      ] }),
      // v.16 — o Cronista recomeça do zero, como quem vira a página: "Os filhos
      // de Levi foram, POIS…". De volta ao arraial, com as três lonas armadas.
      b(16, { q: "Gérson, Coate, e Merari",
        set: "o-acampamento-das-tres-casas", props: O_ACAMPAMENTO_DAS_TRES_CASAS,
        env: { terrain: "desert", night: 0.16, glory: 0.42, storm: 0.06, fire: 0.06, water: 0.06, verdure: 0.14 }, cast: [
        C("patriarca", 15, "raise", { dy: 0.6, facing: 1, id: "levi-pai-das-tres-casas" }),
        C("homem", -175, "stand", { dy: 0.52, facing: -1, id: "gerson-filho-de-levi" }),
        C("homem", -85, "stand", { dy: 0.66, facing: 1, id: "coate-filho-de-levi" }),
        C("homem", 190, "stand", { dy: 0.54, facing: -1, id: "merari-filho-de-levi" }),
      ] }),
      // v.17 — a casa de Gérson pelo seu serviço: cortinas, coberturas e
      // reposteiros. Libni e Simei entre os fardos de lona.
      b(17, { q: "os nomes dos filhos de Gérson: Libni e Simei",
        set: "as-cortinas-de-gerson", props: AS_CORTINAS_DE_GERSON,
        env: { terrain: "field", night: 0.2, glory: 0.34, storm: 0.16, fire: 0.05, water: 0.06, verdure: 0.22 }, cast: [
        C("homem", -95, "point", { dy: 0.56, facing: -1, id: "libni-filho-de-gerson" }),
        C("homem", 130, "stand", { dy: 0.62, facing: 1, id: "simei-filho-de-gerson" }),
        C("patriarca", -260, "stand", { dy: 0.48, facing: 1, id: "gerson-filho-de-levi" }),
      ] }),
      // v.18 — a casa de Coate outra vez, agora só pelos nomes: os quatro em
      // volta da arca, cada um no seu posto de carregar.
      b(18, { q: "Anrão, Izar, Hebrom, e Uziel",
        set: "a-arca-dos-coatitas", props: A_ARCA_DOS_COATITAS,
        env: { terrain: "field", night: 0.18, glory: 0.56, storm: 0.05, fire: 0.06, water: 0.05, verdure: 0.18 }, cast: [
        C("homem", -175, "raise", { dy: 0.6, facing: 1, id: "anrao-pai-de-arao" }),
        C("homem", -80, "stand", { dy: 0.68, facing: 1, id: "izar-filho-de-coate" }),
        C("homem", 105, "stand", { dy: 0.68, facing: -1, id: "hebrom-filho-de-coate" }),
        C("homem", 205, "bow", { dy: 0.6, facing: -1, id: "uziel-filho-de-coate" }),
      ] }),
      // v.19 — e a casa de Merari, a das tábuas, das barras e das bases. O
      // versículo fecha a lista: "estas são as famílias dos levitas".
      b(19, { q: "estas são as famílias dos levitas, segundo seus pais",
        set: "as-tabuas-de-merari", props: AS_TABUAS_DE_MERARI,
        env: { terrain: "desert", night: 0.26, glory: 0.3, storm: 0.2, fire: 0.05, water: 0.04, verdure: 0.1 }, cast: [
        C("homem", -55, "stand", { dy: 0.58, facing: 1, id: "mali-filho-de-merari" }),
        C("homem", 130, "bow", { dy: 0.64, facing: -1, id: "musi-filho-de-merari" }),
        C("patriarca", 245, "point", { dy: 0.5, facing: -1, id: "merari-filho-de-levi" }),
      ] }),
      // v.20 — a linha de Gérson desce em dia de marcha: os gersonitas eram os
      // únicos que levavam a carga em carros e bois, porque lona pesa demais
      // para o ombro (Nm 7:7).
      b(20, { q: "De Gérson: Libni, seu filho",
        set: "mudanca-dos-gersonitas", props: A_MUDANCA_DOS_GERSONITAS,
        env: { terrain: "desert", night: 0.18, glory: 0.36, storm: 0.12, fire: 0.05, water: 0.05, verdure: 0.14 }, cast: [
        C("homem", -150, "walk", { dy: 0.58, facing: 1, id: "libni-filho-de-gerson" }),
        C("homem", -20, "stand", { dy: 0.7, facing: 1, id: "jaate-filho-de-libni" }),
        C("homem", 115, "stand", { dy: 0.62, facing: -1, id: "zima-filho-de-jaate" }),
        C("rebanho", 215, "stand", { dy: 0.56, facing: -1, id: "bois-dos-carros-dos-gersonitas" }),
      ] }),
      // v.21 — a outra carga dos gersonitas: o REPOSTEIRO da porta do pátio, o
      // pano bordado que separava o povo do santo. Quatro gerações no mesmo
      // umbral, esticando a mesma cortina.
      b(21, { q: "Zerá, seu filho; Jeatarai, seu filho",
        set: "reposteiro-da-porta-do-patio", props: O_REPOSTEIRO_DA_PORTA_DO_PATIO,
        env: { terrain: "field", night: 0.22, glory: 0.42, storm: 0.14, fire: 0.06, water: 0.06, verdure: 0.16 }, cast: [
        C("homem", -125, "raise", { dy: 0.6, facing: 1, id: "joa-filho-de-zima" }),
        C("homem", 30, "stand", { dy: 0.7, facing: 1, id: "ido-filho-de-joa" }),
        C("homem", 100, "stand", { dy: 0.62, facing: -1, id: "zera-filho-de-ido" }),
        C("homem", 235, "walk", { dy: 0.54, facing: -1, id: "jeatarai-filho-de-zera" }),
      ] }),
      // v.22 — a linha de Coate passa por CORÉ, o que levou incensário ao
      // SENHOR e viu a terra abrir-se. "Os filhos de Coré, porém, não
      // morreram" (Nm 26:11) — e é dessa raiz poupada que sairá o coro.
      b(22, { q: "Os filhos de Coate foram: Aminadabe, seu filho; Coré, seu filho",
        set: "porta-da-tenda-dos-coraitas", props: A_PORTA_DA_TENDA_DOS_CORAITAS,
        env: { terrain: "desert", night: 0.36, glory: 0.26, storm: 0.34, fire: 0.14, water: 0.04, verdure: 0.08 }, cast: [
        C("patriarca", -215, "stand", { dy: 0.54, facing: 1, id: "aminadabe-coatita" }),
        C("homem", -55, "point", { dy: 0.66, facing: -1, id: "core-filho-de-aminadabe" }),
        C("homem", 175, "kneel", { dy: 0.6, facing: -1, id: "assir-filho-de-core" }),
      ] }),
      // v.23 — a mesma casa em ano de paz: duas tendas de família, a fogueira
      // do jantar e o poço da manhã. Quem carregava a arca também tinha filhos.
      b(23, { q: "Elcana, seu filho; Ebiasafe, seu filho",
        set: "casa-de-lona-dos-coatitas", props: A_CASA_DE_LONA_DOS_COATITAS,
        env: { terrain: "desert", night: 0.4, glory: 0.28, storm: 0.08, fire: 0.4, water: 0.06, verdure: 0.12 }, cast: [
        C("homem", -135, "stand", { dy: 0.62, facing: 1, id: "elcana-filho-de-assir" }),
        C("mulherComum", 55, "stand", { dy: 0.7, facing: -1, id: "mulher-da-tenda-dos-coatitas" }),
        C("homem", 150, "kneel", { dy: 0.64, facing: -1, id: "ebiasafe-filho-de-elcana" }),
        C("servo", 250, "walk", { dy: 0.56, facing: -1, id: "assir-filho-de-ebiasafe" }),
      ] }),
      // v.24 — Levi não teve herança de terra, mas teve ARRABALDES: pasto em
      // redor das cidades (Nm 35:2-3). Quatro gerações de gente que tirava
      // água, tocava gado e servia — e de que a Escritura não conta mais nada.
      b(24, { q: "Uriel, seu filho; Uzias, seu filho; e Saul, seu filho",
        set: "curral-dos-levitas", props: O_CURRAL_DOS_LEVITAS,
        env: { terrain: "field", night: 0.16, glory: 0.34, storm: 0.06, fire: 0.05, water: 0.08, verdure: 0.46 }, cast: [
        C("homem", -195, "stand", { dy: 0.6, facing: 1, id: "taate-filho-de-assir" }),
        C("pastor", -55, "walk", { dy: 0.7, facing: 1, id: "uriel-filho-de-taate" }),
        C("homem", 175, "kneel", { dy: 0.64, facing: -1, id: "uzias-filho-de-uriel" }),
        C("rebanho", 265, "stand", { dy: 0.56, facing: -1, id: "saul-filho-de-uzias" }),
      ] }),
      // v.25 — a genealogia sai do arraial e entra numa casa de pedra no monte
      // de Efraim. A partir daqui, a casa de Elcana.
      b(25, { q: "Amasai e Aimote",
        set: "casa-de-elcana-em-efraim", props: A_CASA_DE_ELCANA_EM_EFRAIM,
        env: { terrain: "field", night: 0.18, glory: 0.4, storm: 0.06, fire: 0.06, water: 0.07, verdure: 0.4 }, cast: [
        C("patriarca", -105, "stand", { dy: 0.6, facing: 1, id: "elcana-pai-de-amasai" }),
        C("homem", 45, "stand", { dy: 0.68, facing: -1, id: "amasai-filho-de-elcana" }),
        C("homem", 160, "point", { dy: 0.6, facing: -1, id: "aimote-filho-de-elcana" }),
      ] }),
      // v.26 — a eira da mesma casa: três medas debulhadas, o cercado do gado e
      // o carvalho da beira. Uma família levítica que vivia do campo.
      b(26, { q: "os filhos de Elcana foram Zofai, seu filho; e seu filho Naate",
        set: "eira-de-ramataim", props: A_EIRA_DE_RAMATAIM,
        env: { terrain: "field", night: 0.24, glory: 0.44, storm: 0.05, fire: 0.06, water: 0.06, verdure: 0.42 }, cast: [
        C("homem", -215, "stand", { dy: 0.56, facing: 1, id: "elcana-pai-de-zofai" }),
        C("homem", -70, "raise", { dy: 0.7, facing: 1, id: "zofai-filho-de-elcana" }),
        C("homem", 120, "bow", { dy: 0.64, facing: -1, id: "naate-filho-de-zofai" }),
      ] }),
      // v.27 — e a casa inteira na estrada: "e subia este homem da sua cidade
      // de ano em ano a adorar e a sacrificar ao Senhor dos Exércitos em Siló"
      // (1Sm 1:3). É por esta curva que Ana ainda vai passar.
      b(27, { q: "Seu filho Eliabe, seu filho Jeroão, seu filho Elcana",
        set: "caminho-de-silo", props: O_CAMINHO_DE_SILO,
        env: { terrain: "field", night: 0.14, glory: 0.52, storm: 0.04, fire: 0.05, water: 0.06, verdure: 0.5 }, cast: [
        C("patriarca", -230, "walk", { dy: 0.58, facing: -1, id: "eliabe-filho-de-naate" }),
        C("homem", -120, "walk", { dy: 0.66, facing: -1, id: "jeroao-filho-de-eliabe" }),
        C("homem", -10, "walk", { dy: 0.72, facing: -1, id: "elcana" }),
        C("mulherComum", 85, "walk", { dy: 0.66, facing: -1, id: "mulher-da-casa-de-elcana" }),
      ] }),
      // v.28 — e a genealogia para um instante na porta de SAMUEL, que era
      // coatita. O Cronista guarda os dois filhos sem esconder nada: Joel e
      // Abias, os que "não andaram nos caminhos dele" (1Sm 8:3).
      b(28, { q: "Joel, seu primogênito, e o segundo Abias",
        set: "casa-de-samuel-em-rama", props: A_CASA_DE_SAMUEL_EM_RAMA,
        env: { terrain: "field", night: 0.2, glory: 0.56, storm: 0.06, fire: 0.08, water: 0.08, verdure: 0.36 }, cast: [
        C("patriarca", -120, "stand", { dy: 0.58, facing: 1, id: "samuel", glow: 0.3 }),
        C("homem", 40, "walk", { dy: 0.68, facing: -1, id: "joel-primogenito-de-samuel" }),
        C("homem", 135, "walk", { dy: 0.62, facing: -1, id: "abias-segundo-filho-de-samuel" }),
      ] }),
      // v.29 — e a terceira casa: Merari acampava ao NORTE do tabernáculo (Nm
      // 3:35), do lado por onde vem o vento frio. Quatro gerações à volta de
      // uma fogueira acesa cedo.
      b(29, { q: "Mali, seu filho Libni, seu filho Simei, seu filho Uzá",
        set: "arraial-do-norte-de-merari", props: O_ARRAIAL_DO_NORTE_DE_MERARI,
        env: { terrain: "field", night: 0.56, glory: 0.24, storm: 0.3, fire: 0.34, water: 0.05, verdure: 0.14 }, cast: [
        C("patriarca", -160, "stand", { dy: 0.58, facing: 1, id: "mali-filho-de-merari" }),
        C("homem", -40, "kneel", { dy: 0.68, facing: 1, id: "libni-filho-de-mali" }),
        C("homem", 65, "stand", { dy: 0.64, facing: -1, id: "simei-filho-de-libni" }),
        C("homem", 175, "walk", { dy: 0.56, facing: -1, id: "uza-filho-de-simei" }),
      ] }),
      // v.30 — e a primeira parte fecha onde ninguém olha: as tábuas, as barras
      // e as colunas de Merari, empilhadas no descampado, com três nomes que a
      // história não repetiu nunca mais.
      b(30, { q: "Seu filho Siméia, seu filho Hagias, seu filho Asaías",
        set: "as-tabuas-de-merari", props: AS_TABUAS_DE_MERARI,
        env: { terrain: "desert", night: 0.3, glory: 0.3, storm: 0.24, fire: 0.05, water: 0.04, verdure: 0.08 }, cast: [
        C("homem", -160, "stand", { dy: 0.6, facing: 1, id: "simeia-filho-de-uza" }),
        C("homem", 20, "bow", { dy: 0.7, facing: 1, id: "hagias-filho-de-simeia" }),
        C("homem", 165, "stand", { dy: 0.62, facing: -1, id: "asaias-filho-de-hagias" }),
      ] }),

      // ------------------------------------------- MOVIMENTO 2 · v.31-48
      // v.31 — ⭐ o capítulo troca de mundo numa oração subordinada: "DEPOIS QUE
      // A ARCA TEVE REPOUSO". Enquanto a arca andava, ninguém cantava; parada a
      // arca em Jerusalém, Davi constitui homens só para o ofício do canto.
      b(31, { q: "os que Davi constituiu para o ofício do canto na casa do Senhor, depois que a arca teve repouso",
        set: "arca-em-repouso-na-tenda", props: A_ARCA_EM_REPOUSO_NA_TENDA,
        env: { terrain: "city", night: 0.16, glory: 0.7, storm: 0.03, fire: 0.14, water: 0.06, verdure: 0.14 }, cast: [
        C("rei", -215, "point", { dy: 0.56, facing: 1, id: "davi" }),
        C("homem", -60, "bow", { dy: 0.68, facing: 1, id: "hema-cantor" }),
        C("homem", 160, "stand", { dy: 0.62, facing: -1, id: "asafe-cantor" }),
        C("anciao", 265, "stand", { dy: 0.54, facing: -1, id: "levita-da-tenda-da-arca" }),
      ] }),
      // v.32 — e o ofício tem endereço e prazo: "MINISTRAVAM DIANTE DO
      // TABERNÁCULO DA TENDA DA CONGREGAÇÃO COM CANTARES, até que Salomão
      // edificou a casa do Senhor". Três homens de pé, e o pátio virado para a
      // lona: é o quadro mais bonito do capítulo.
      b(32, { q: "E ministravam diante do tabernáculo da tenda da congregação com cantares",
        set: "coro-diante-do-tabernaculo", props: O_CORO_DIANTE_DO_TABERNACULO,
        env: { terrain: "field", night: 0.12, glory: 0.78, storm: 0.03, fire: 0.34, water: 0.06, verdure: 0.2 }, cast: [
        C("homem", -30, "raise", { dy: 0.66, facing: 1, id: "hema-cantor", glow: 0.3 }),
        C("homem", 110, "raise", { dy: 0.62, facing: -1, id: "asafe-cantor", glow: 0.24 }),
        C("homem", -170, "raise", { dy: 0.6, facing: 1, id: "eta-cantor", glow: 0.24 }),
        C("anciao", 240, "stand", { dy: 0.56, facing: -1, id: "levita-do-tabernaculo-de-gibeao" }),
      ] }),
      // v.33 — HEMÃ, O CANTOR, no meio do estrado, e a primeira volta do
      // relógio para trás: filho de Joel, filho de SAMUEL. O coro de Israel é
      // neto do profeta de Ramá.
      b(33, { q: "dos filhos dos coatitas, Hemã, o cantor, filho de Joel, filho de Samuel",
        set: "estrado-de-hema", props: O_ESTRADO_DE_HEMA,
        env: { terrain: "field", night: 0.1, glory: 0.8, storm: 0.03, fire: 0.16, water: 0.05, verdure: 0.2 }, cast: [
        C("homem", 0, "raise", { dy: 0.62, facing: 1, id: "hema-cantor", glow: 0.4 }),
        C("homem", -145, "stand", { dy: 0.56, facing: 1, id: "joel-pai-de-hema" }),
        C("patriarca", 175, "stand", { dy: 0.52, facing: -1, id: "samuel", glow: 0.25 }),
      ] }),
      // v.34 — e a escada continua a subir: por Elcana e por Jeroão a linhagem
      // do cantor volta à casa de pedra do monte de Efraim.
      b(34, { q: "Filho de Elcana, filho de Jeroão, filho de Eliel, filho de Toá",
        set: "casa-de-elcana-em-efraim", props: A_CASA_DE_ELCANA_EM_EFRAIM,
        env: { terrain: "field", night: 0.2, glory: 0.56, storm: 0.05, fire: 0.06, water: 0.06, verdure: 0.44 }, cast: [
        C("homem", -110, "stand", { dy: 0.62, facing: 1, id: "elcana" }),
        C("homem", 20, "stand", { dy: 0.7, facing: 1, id: "jeroao-filho-de-eliabe" }),
        C("homem", 130, "point", { dy: 0.62, facing: -1, id: "eliel-filho-de-toa" }),
        C("patriarca", 240, "stand", { dy: 0.54, facing: -1, id: "toa-o-coatita" }),
      ] }),
      // v.35 — mais um degrau para trás, e o quadro é a eira: os avós do cantor
      // debulhavam trigo. A música de Israel vem de gente que trabalhou.
      b(35, { q: "Filho de Zufe, filho de Elcana, filho de Maate, filho de Amasai",
        set: "eira-de-ramataim", props: A_EIRA_DE_RAMATAIM,
        env: { terrain: "field", night: 0.22, glory: 0.5, storm: 0.05, fire: 0.05, water: 0.06, verdure: 0.44 }, cast: [
        C("patriarca", -235, "stand", { dy: 0.54, facing: 1, id: "zufe-o-coatita" }),
        C("homem", -100, "bow", { dy: 0.68, facing: 1, id: "elcana-pai-de-zufe" }),
        C("homem", 60, "raise", { dy: 0.72, facing: -1, id: "maate-filho-de-amasai" }),
        C("homem", 190, "stand", { dy: 0.6, facing: -1, id: "amasai-filho-de-maate" }),
      ] }),
      // v.36 — e outra vez a estrada de Siló, agora subida por nomes de que
      // ninguém guardou história: eram esses que iam de ano em ano.
      b(36, { q: "Filho de Elcana, filho de Joel, filho de Azarias, filho de Sofonias",
        set: "caminho-de-silo", props: O_CAMINHO_DE_SILO,
        env: { terrain: "field", night: 0.18, glory: 0.58, storm: 0.04, fire: 0.05, water: 0.06, verdure: 0.5 }, cast: [
        C("homem", -190, "walk", { dy: 0.6, facing: -1, id: "elcana-filho-de-joel" }),
        C("homem", -75, "walk", { dy: 0.68, facing: -1, id: "joel-filho-de-azarias" }),
        C("homem", 35, "walk", { dy: 0.72, facing: -1, id: "azarias-filho-de-sofonias" }),
        C("patriarca", 145, "stand", { dy: 0.62, facing: -1, id: "sofonias-o-coatita" }),
      ] }),
      // v.37 — e a escada chega a CORÉ. O coro do templo desce em linha reta do
      // homem que a terra tragou: a misericórdia guardou a raiz para cantar.
      b(37, { q: "Filho de Taate, filho de Assir, filho de Ebiasafe, filho de Coré",
        set: "porta-da-tenda-dos-coraitas", props: A_PORTA_DA_TENDA_DOS_CORAITAS,
        env: { terrain: "desert", night: 0.34, glory: 0.4, storm: 0.28, fire: 0.16, water: 0.04, verdure: 0.08 }, cast: [
        C("homem", -215, "stand", { dy: 0.56, facing: 1, id: "taate-filho-de-assir" }),
        C("homem", -80, "kneel", { dy: 0.68, facing: 1, id: "assir-filho-de-ebiasafe" }),
        C("homem", 150, "stand", { dy: 0.64, facing: -1, id: "ebiasafe-filho-de-elcana" }),
        C("patriarca", 265, "point", { dy: 0.54, facing: -1, id: "core-filho-de-aminadabe" }),
      ] }),
      // v.38 — ⭐ o último degrau não é um homem: é ISRAEL. E o quadro de Israel
      // é a noite da ESCADA de Betel, "posta na terra, cujo topo tocava nos
      // céus" (Gn 28:12). A linhagem do cantor acaba de subir exatamente aqui.
      b(38, { q: "filho de Coate, filho de Levi, filho de Israel",
        set: "escada-de-betel", props: A_ESCADA_DE_BETEL,
        env: { terrain: "mountain", night: 0.62, glory: 0.82, storm: 0.1, fire: 0.06, water: 0.04, verdure: 0.12 }, cast: [
        C("homem", -215, "stand", { dy: 0.58, facing: 1, id: "izar-filho-de-coate" }),
        C("homem", -85, "stand", { dy: 0.66, facing: 1, id: "coate-filho-de-levi" }),
        C("patriarca", 95, "raise", { dy: 0.64, facing: -1, id: "levi-pai-das-tres-casas", glow: 0.3 }),
        C("patriarca", 245, "bow", { dy: 0.56, facing: -1, id: "israel-o-patriarca", glow: 0.45 }),
      ] }),
      // v.39 — o segundo posto do coro: "E SEU IRMÃO ASAFE ESTAVA À SUA
      // DIREITA". O mesmo pátio visto do outro ombro, com as harpas dele no
      // degrau da direita.
      b(39, { q: "E seu irmão Asafe estava à sua direita",
        set: "asafe-a-direita", props: ASAFE_A_DIREITA,
        env: { terrain: "field", night: 0.12, glory: 0.76, storm: 0.03, fire: 0.18, water: 0.05, verdure: 0.22 }, cast: [
        C("homem", 155, "raise", { dy: 0.62, facing: -1, id: "asafe-cantor", glow: 0.4 }),
        C("homem", 30, "stand", { dy: 0.7, facing: -1, id: "berequias-pai-de-asafe" }),
        C("homem", -105, "stand", { dy: 0.6, facing: 1, id: "simeia-pai-de-berequias" }),
      ] }),
      // v.40 — a linhagem de Asafe começa a subir na hora do sacrifício da
      // manhã, quando o coro entrava antes do sol.
      b(40, { q: "Filho de Micael, filho de Baaséias, filho de Malquias",
        set: "patio-dos-cantores-ao-amanhecer", props: O_PATIO_DOS_CANTORES_AO_AMANHECER,
        env: { terrain: "field", night: 0.36, glory: 0.6, storm: 0.05, fire: 0.34, water: 0.06, verdure: 0.2 }, cast: [
        C("homem", -125, "raise", { dy: 0.64, facing: 1, id: "micael-pai-de-simeia" }),
        C("homem", 20, "stand", { dy: 0.72, facing: 1, id: "baaseias-filho-de-malquias" }),
        C("anciao", 200, "bow", { dy: 0.6, facing: -1, id: "malquias-o-gersonita" }),
      ] }),
      // v.41 — e a escada de Asafe entra no mundo de Gérson: o arraial em dia
      // de marcha, com os fardos de lona amarrados e os bois no cercado.
      b(41, { q: "Filho de Etni, filho de Zerá, filho de Adaías",
        set: "mudanca-dos-gersonitas", props: A_MUDANCA_DOS_GERSONITAS,
        env: { terrain: "desert", night: 0.2, glory: 0.42, storm: 0.12, fire: 0.05, water: 0.05, verdure: 0.14 }, cast: [
        C("homem", -175, "walk", { dy: 0.56, facing: 1, id: "etni-filho-de-zera" }),
        C("homem", -35, "stand", { dy: 0.7, facing: 1, id: "zera-filho-de-adaias" }),
        C("patriarca", 105, "point", { dy: 0.64, facing: -1, id: "adaias-o-gersonita" }),
        C("rebanho", 230, "stand", { dy: 0.56, facing: -1, id: "bois-do-arraial-de-gerson" }),
      ] }),
      // v.42 — mais um degrau: o reposteiro da porta do pátio, o pano bordado
      // que era a fronteira mais fina de Israel, esticado por três gerações.
      b(42, { q: "Filho de Etã, filho de Zima, filho de Simei",
        set: "reposteiro-da-porta-do-patio", props: O_REPOSTEIRO_DA_PORTA_DO_PATIO,
        env: { terrain: "field", night: 0.24, glory: 0.5, storm: 0.12, fire: 0.06, water: 0.06, verdure: 0.18 }, cast: [
        C("homem", -150, "raise", { dy: 0.58, facing: 1, id: "eta-filho-de-zima" }),
        C("homem", 45, "stand", { dy: 0.7, facing: 1, id: "zima-filho-de-simei" }),
        C("homem", 205, "stand", { dy: 0.6, facing: -1, id: "simei-filho-de-jaate" }),
      ] }),
      // v.43 — e a linhagem de Asafe fecha em GÉRSON, filho de LEVI, entre as
      // cortinas e as coberturas que a casa dele carregou pelo deserto.
      b(43, { q: "Filho de Jaate, filho de Gérson, filho de Levi",
        set: "as-cortinas-de-gerson", props: AS_CORTINAS_DE_GERSON,
        env: { terrain: "field", night: 0.18, glory: 0.6, storm: 0.12, fire: 0.05, water: 0.06, verdure: 0.22 }, cast: [
        C("homem", -60, "stand", { dy: 0.64, facing: 1, id: "jaate-filho-de-gerson" }),
        C("patriarca", 105, "raise", { dy: 0.6, facing: -1, id: "gerson-filho-de-levi", glow: 0.25 }),
        C("patriarca", 250, "stand", { dy: 0.52, facing: -1, id: "levi-pai-das-tres-casas" }),
      ] }),
      // v.44 — o terceiro posto: "E SEUS IRMÃOS, OS FILHOS DE MERARI, ESTAVAM À
      // ESQUERDA". O espelho exato do quadro de Asafe, com as harpas do outro
      // lado e a lona do tabernáculo agora à direita.
      b(44, { q: "E seus irmãos, os filhos de Merari, estavam à esquerda",
        set: "eta-a-esquerda", props: ETA_A_ESQUERDA,
        env: { terrain: "field", night: 0.12, glory: 0.76, storm: 0.04, fire: 0.18, water: 0.05, verdure: 0.22 }, cast: [
        C("homem", -170, "raise", { dy: 0.62, facing: 1, id: "eta-cantor", glow: 0.4 }),
        C("homem", -50, "stand", { dy: 0.7, facing: 1, id: "quisi-pai-de-eta" }),
        C("homem", 95, "stand", { dy: 0.64, facing: -1, id: "abdi-filho-de-maluque" }),
        C("anciao", 235, "stand", { dy: 0.56, facing: -1, id: "maluque-o-merarita" }),
      ] }),
      // v.45 — a escada de Etã desce ao lado frio do arraial, onde Merari
      // armava as suas tendas: vento norte, fogueira cedo e lua alta.
      b(45, { q: "Filho de Hasabias, filho de Amazias, filho de Hilquias",
        set: "arraial-do-norte-de-merari", props: O_ARRAIAL_DO_NORTE_DE_MERARI,
        env: { terrain: "field", night: 0.58, glory: 0.32, storm: 0.3, fire: 0.34, water: 0.05, verdure: 0.14 }, cast: [
        C("homem", -135, "stand", { dy: 0.6, facing: 1, id: "hasabias-filho-de-amazias" }),
        C("homem", 25, "kneel", { dy: 0.7, facing: 1, id: "amazias-filho-de-hilquias" }),
        C("anciao", 190, "stand", { dy: 0.62, facing: -1, id: "hilquias-o-merarita" }),
      ] }),
      // v.46 — e a carga da casa: as tábuas e as barras, o serviço mais pesado
      // e o mais calado dos três.
      b(46, { q: "Filho de Anzi, filho de Bani, filho de Semer",
        set: "as-tabuas-de-merari", props: AS_TABUAS_DE_MERARI,
        env: { terrain: "desert", night: 0.3, glory: 0.44, storm: 0.2, fire: 0.05, water: 0.04, verdure: 0.1 }, cast: [
        C("homem", -190, "stand", { dy: 0.58, facing: 1, id: "anzi-filho-de-bani" }),
        C("homem", -20, "bow", { dy: 0.72, facing: 1, id: "bani-filho-de-semer" }),
        C("homem", 155, "stand", { dy: 0.62, facing: -1, id: "semer-o-merarita" }),
      ] }),
      // v.47 — e o fim da escada de Etã é o alicerce: as BASES de prata em que
      // entravam os encaixes das tábuas. Chegar a "filho de Levi" é chegar ao
      // que ninguém vê e sem o que a casa inteira cai.
      b(47, { q: "Filho de Mali, filho de Musi, filho de Merari, filho de Levi",
        set: "bases-de-prata", props: AS_BASES_DE_PRATA,
        env: { terrain: "field", night: 0.26, glory: 0.6, storm: 0.14, fire: 0.06, water: 0.05, verdure: 0.16 }, cast: [
        C("homem", -215, "kneel", { dy: 0.68, facing: 1, id: "mali-filho-de-merari" }),
        C("homem", -70, "stand", { dy: 0.74, facing: 1, id: "musi-filho-de-merari" }),
        C("patriarca", 140, "raise", { dy: 0.62, facing: -1, id: "merari-filho-de-levi", glow: 0.25 }),
        C("patriarca", 270, "stand", { dy: 0.54, facing: -1, id: "levi-pai-das-tres-casas" }),
      ] }),
      // v.48 — e em volta dos três, a casa inteira: "E SEUS IRMÃOS, OS LEVITAS,
      // FORAM POSTOS PARA TODO O MINISTÉRIO DO TABERNÁCULO DA CASA DE DEUS".
      // O coro no meio e o serviço em roda — o único quadro do capítulo em que
      // cabe uma multidão, e ela cabe porque aqui é alegria.
      b(48, { q: "foram postos para todo o ministério do tabernáculo da casa de Deus",
        set: "ministerio-da-casa-de-deus", props: O_MINISTERIO_DA_CASA_DE_DEUS,
        env: { terrain: "field", night: 0.08, glory: 0.9, storm: 0.02, fire: 0.42, water: 0.07, verdure: 0.24 }, cast: [
        C("multidao", 20, "raise", { dy: 0.66, facing: 1, id: "levitas-do-ministerio-da-casa-de-deus" }),
        C("anciao", -215, "raise", { dy: 0.6, facing: 1, id: "chefe-dos-levitas-do-ministerio", glow: 0.3 }),
        C("homem", 235, "stand", { dy: 0.6, facing: -1, id: "levita-porteiro-da-casa-de-deus" }),
      ] }),

      // ------------------------------------------- MOVIMENTO 3 · v.49-53
      // v.49 — ⭐ o Cronista volta ao serviço que sustenta tudo, e o resume em
      // dois móveis: o ALTAR DO HOLOCAUSTO, de bronze, onde corre o sangue, e o
      // ALTAR DO INCENSO, de ouro, diante do véu, onde sobe o perfume. Entre um
      // e outro está a razão de o capítulo inteiro existir: PARA FAZER
      // EXPIAÇÃO POR ISRAEL. É o beat de mais fogo e mais glória do roteiro.
      b(49, { q: "para fazer expiação por Israel",
        set: "os-dois-altares", props: OS_DOIS_ALTARES,
        env: { terrain: "field", night: 0.1, glory: 0.94, storm: 0.02, fire: 0.8, water: 0.06, verdure: 0.12 }, cast: [
        C("arao", -35, "raise", { dy: 0.62, facing: 1, id: "arao", glow: 0.55 }),
        C("homem", -230, "bow", { dy: 0.66, facing: 1, id: "eleazar-filho-de-arao" }),
        C("homem", 215, "kneel", { dy: 0.64, facing: -1, id: "itamar-filho-de-arao" }),
        C("moises", 100, "point", { dy: 0.56, facing: -1, id: "moises" }),
      ] }),
      // v.50 — e a linha de Arão desce outra vez, começando por FINÉIAS, o do
      // pacto do sacerdócio perpétuo (Nm 25:13): o arraial de Sitim ao
      // meio-dia, a lança encostada e a areia branca de sol.
      b(50, { q: "seu filho Eleazar, seu filho Finéias, seu filho Abisua",
        set: "zelo-de-fineias", props: O_ZELO_DE_FINEIAS,
        env: { terrain: "desert", night: 0.06, glory: 0.6, storm: 0.05, fire: 0.16, water: 0.03, verdure: 0.06 }, cast: [
        C("anciao", -215, "stand", { dy: 0.56, facing: 1, id: "eleazar-filho-de-arao" }),
        C("homem", -55, "raise", { dy: 0.66, facing: 1, id: "fineias-filho-de-eleazar", glow: 0.3 }),
        C("homem", 145, "stand", { dy: 0.6, facing: -1, id: "abisua-filho-de-fineias" }),
      ] }),
      // v.51 — e a mesma corrente passa outra vez pela pia de cobre, onde
      // começou. Só que desta vez não há exílio esperando no fim da conta.
      b(51, { q: "Seu filho Buqui, seu filho Uzi, seu filho Seraías",
        set: "atrio-da-pia-de-cobre", props: O_ATRIO_DA_PIA_DE_COBRE,
        env: { terrain: "field", night: 0.14, glory: 0.62, storm: 0.04, fire: 0.24, water: 0.09, verdure: 0.16 }, cast: [
        C("homem", -150, "kneel", { dy: 0.62, facing: 1, id: "buqui-filho-de-abisua" }),
        C("homem", 10, "stand", { dy: 0.7, facing: 1, id: "uzi-filho-de-buqui" }),
        C("anciao", 175, "stand", { dy: 0.56, facing: -1, id: "seraias-filho-de-uzi" }),
      ] }),
      // v.52 — e pela câmara dos doze pães, com o candelabro aceso do outro
      // lado: o mesmo trabalho, a mesma sala, gerações depois.
      b(52, { q: "Seu filho Meraiote, seu filho Amarias, seu filho Aitube",
        set: "camara-dos-paes-da-proposicao", props: A_CAMARA_DOS_PAES_DA_PROPOSICAO,
        env: { terrain: "city", night: 0.4, glory: 0.62, storm: 0.03, fire: 0.3, water: 0.03, verdure: 0.03 }, cast: [
        C("homem", -190, "stand", { dy: 0.6, facing: 1, id: "meraiote-filho-de-zeraias" }),
        C("homem", -50, "bow", { dy: 0.72, facing: 1, id: "amarias-filho-de-meraiote" }),
        C("anciao", 80, "stand", { dy: 0.66, facing: -1, id: "aitube-filho-de-amarias" }),
      ] }),
      // v.53 — e acaba em paz, no alto de Gibeão, com ZADOQUE e AIMAÁS diante
      // do tabernáculo do deserto. A mesma linha do v.15, e desta vez o último
      // nome não é levado cativo: fica de pé, ao sol da tarde.
      b(53, { q: "Seu filho Zadoque, seu filho Aimaás",
        set: "alto-de-gibeao", props: O_ALTO_DE_GIBEAO,
        env: { terrain: "field", night: 0.16, glory: 0.82, storm: 0.05, fire: 0.44, water: 0.05, verdure: 0.18 }, cast: [
        C("anciao", -55, "raise", { dy: 0.6, facing: 1, id: "zadoque-filho-de-aitube", glow: 0.4 }),
        C("homem", 175, "stand", { dy: 0.62, facing: -1, id: "aimaas-filho-de-zadoque" }),
      ] }),

      // ------------------------------------------- MOVIMENTO 4 · v.54-81
      // v.54 — o mapa começa por um sorteio: "porque a eles caiu a sorte". A
      // tribo que não conquistou terra nenhuma recebe as suas cidades tiradas
      // de uma vasilha, diante do rol dos levitas.
      b(54, { q: "dos filhos de Arão, da família dos coatitas, porque a eles caiu a sorte",
        set: "sorte-lancada-pelos-termos", props: A_SORTE_LANCADA_PELOS_TERMOS,
        env: { terrain: "field", night: 0.14, glory: 0.5, storm: 0.06, fire: 0.05, water: 0.08, verdure: 0.26 }, cast: [
        C("anciao", -130, "point", { dy: 0.6, facing: 1, id: "chefe-dos-filhos-de-arao" }),
        C("homem", -10, "kneel", { dy: 0.72, facing: 1, id: "levita-que-lanca-a-sorte" }),
        C("homem", 150, "write", { dy: 0.64, facing: -1, id: "escriba-dos-termos-dos-levitas" }),
      ] }),
      // v.55 — HEBROM, na terra de Judá, a cidade dos patriarcas: muralha,
      // torre e portão — e colada à muralha a faixa de pasto que a lei mandava
      // dar junto com a cidade. Cidade e arrabalde no mesmo quadro.
      b(55, { q: "Deram-lhes, pois, a Hebrom, na terra de Judá, e os arrabaldes que a rodeiam",
        set: "hebrom-e-os-seus-arrabaldes", props: HEBROM_E_OS_SEUS_ARRABALDES,
        env: { terrain: "city", night: 0.16, glory: 0.52, storm: 0.06, fire: 0.06, water: 0.1, verdure: 0.28 }, cast: [
        C("anciao", -110, "stand", { dy: 0.56, facing: -1, id: "sacerdote-de-hebrom" }),
        C("pastor", 95, "walk", { dy: 0.68, facing: -1, id: "pastor-dos-arrabaldes-de-hebrom" }),
        C("rebanho", 225, "stand", { dy: 0.6, facing: -1, id: "rebanho-dos-arrabaldes-de-hebrom" }),
      ] }),
      // v.56 — mas o campo não é do levita: "PORÉM O TERRITÓRIO DA CIDADE E AS
      // SUAS ALDEIAS DERAM A CALEBE, FILHO DE JEFONÉ". As vinhas e as searas do
      // vale ficam com o velho que aos oitenta anos pediu a montanha.
      b(56, { q: "Porém o território da cidade e as suas aldeias deram a Calebe, filho de Jefoné",
        set: "campo-e-aldeias-de-calebe", props: O_CAMPO_E_AS_ALDEIAS_DE_CALEBE,
        env: { terrain: "field", night: 0.12, glory: 0.56, storm: 0.04, fire: 0.05, water: 0.08, verdure: 0.56 }, cast: [
        C("patriarca", -175, "point", { dy: 0.62, facing: -1, id: "calebe-filho-de-jefone" }),
        C("homem", 20, "kneel", { dy: 0.74, facing: 1, id: "vinhateiro-das-aldeias-de-calebe" }),
        C("mulherComum", 155, "stand", { dy: 0.66, facing: -1, id: "moradora-das-aldeias-de-calebe" }),
      ] }),
      // v.57 — e o mapa abre a porta que nenhuma outra nação tinha: as CIDADES
      // DE REFÚGIO. Quem matasse alguém sem querer corria para cá, e o vingador
      // do sangue tinha de parar do lado de fora do portão.
      b(57, { q: "E aos filhos de Arão deram as cidades de refúgio",
        set: "porta-da-cidade-de-refugio", props: A_PORTA_DA_CIDADE_DE_REFUGIO,
        env: { terrain: "field", night: 0.24, glory: 0.6, storm: 0.16, fire: 0.06, water: 0.06, verdure: 0.24 }, cast: [
        C("homem", -95, "walk", { dy: 0.72, facing: -1, id: "homicida-que-foge-para-o-refugio" }),
        C("anciao", 55, "raise", { dy: 0.62, facing: 1, id: "sacerdote-a-porta-do-refugio", glow: 0.3 }),
        C("homem", -250, "point", { dy: 0.66, facing: -1, id: "vingador-do-sangue-detido-a-porta" }),
      ] }),
      // v.58 — DEBIR chamava-se antes QUIRIATE-SEFER, "cidade do livro" (Js
      // 15:15), e foi o dote de Acsa, que pediu ao pai as fontes de água porque
      // lhe tinham dado terra seca. Rolo e manancial no mesmo quadro.
      b(58, { q: "E Hilém, e os seus arrabaldes, Debir e os seus arrabaldes",
        set: "debir-a-cidade-do-livro", props: DEBIR_A_CIDADE_DO_LIVRO,
        env: { terrain: "desert", night: 0.24, glory: 0.44, storm: 0.14, fire: 0.05, water: 0.08, verdure: 0.14 }, cast: [
        C("anciao", -140, "stand", { dy: 0.62, facing: 1, id: "sacerdote-de-debir" }),
        C("homem", -35, "write", { dy: 0.72, facing: 1, id: "escriba-de-quiriate-sefer" }),
        C("mulherComum", 175, "stand", { dy: 0.66, facing: -1, id: "aguadeira-das-fontes-de-debir" }),
      ] }),
      // v.59 — BETE-SEMES, "a casa do sol", na baixada do trigo por onde as
      // vacas subiram sozinhas trazendo a arca de volta dos filisteus (1Sm
      // 6:12). Aqui a paisagem é a sega, e o sol está no alto do quadro.
      b(59, { q: "E Asã e os seus arrabaldes, e Bete-Semes e os seus arrabaldes",
        set: "bete-semes-no-vale-do-trigo", props: BETE_SEMES_NO_VALE_DO_TRIGO,
        env: { terrain: "field", night: 0.06, glory: 0.66, storm: 0.03, fire: 0.06, water: 0.1, verdure: 0.58 }, cast: [
        C("homem", -195, "kneel", { dy: 0.74, facing: 1, id: "segador-de-bete-semes" }),
        C("mulherComum", -55, "bow", { dy: 0.7, facing: 1, id: "respigadeira-de-bete-semes" }),
        C("anciao", 130, "stand", { dy: 0.62, facing: -1, id: "levita-de-asa" }),
      ] }),
      // v.60 — GEBA, ALEMETE e ANATOTE, alinhadas na crista de pedra ao norte
      // de Jerusalém: Anatote é a casa de sacerdotes para onde Salomão
      // desterrou Abiatar e onde nasceria Jeremias. "Todas as suas cidades,
      // pelas suas famílias, foram treze."
      b(60, { q: "todas as suas cidades, pelas suas famílias, foram treze",
        set: "espigao-de-benjamim", props: O_ESPIGAO_DE_BENJAMIM,
        env: { terrain: "city", night: 0.3, glory: 0.4, storm: 0.24, fire: 0.06, water: 0.05, verdure: 0.18 }, cast: [
        C("homem", -120, "point", { dy: 0.6, facing: -1, id: "atalaia-de-geba" }),
        C("servo", 25, "walk", { dy: 0.72, facing: -1, id: "morador-de-alemete" }),
        C("anciao", 215, "stand", { dy: 0.62, facing: -1, id: "sacerdote-de-anatote" }),
      ] }),
      // v.61 — os coatitas que sobraram tiram por sorte dez cidades da meia
      // tribo de Manassés: planalto largo, curral, duas tendas e pedra à flor
      // da terra até onde a vista alcança.
      b(61, { q: "tiveram, por sorte, dez cidades da meia tribo de Manassés",
        set: "planalto-da-meia-tribo", props: O_PLANALTO_DA_MEIA_TRIBO,
        env: { terrain: "field", night: 0.18, glory: 0.44, storm: 0.14, fire: 0.05, water: 0.06, verdure: 0.3 }, cast: [
        C("anciao", -215, "point", { dy: 0.58, facing: -1, id: "chefe-dos-coatitas-que-restaram" }),
        C("homem", -60, "kneel", { dy: 0.7, facing: 1, id: "levita-de-manasses" }),
        C("rebanho", 145, "stand", { dy: 0.62, facing: -1, id: "gado-do-planalto-de-manasses" }),
      ] }),
      // v.62 — as treze cidades de Gérson caem na terra mais gorda de Israel:
      // BASÃ, dos carvalhos e das vacas que Amós chamaria "vacas de Basã".
      // Verdura no máximo, poço cheio e as aves cruzando por cima.
      b(62, { q: "tiveram treze cidades da tribo de Issacar, e da tribo de Aser, e da tribo de Naftali e da tribo de Manassés, em Basã",
        set: "pastos-de-basa", props: OS_PASTOS_DE_BASA,
        env: { terrain: "field", night: 0.1, glory: 0.56, storm: 0.04, fire: 0.04, water: 0.16, verdure: 0.78 }, cast: [
        C("pastor", -160, "walk", { dy: 0.68, facing: -1, id: "pastor-gersonita-de-basa" }),
        C("rebanho", 15, "stand", { dy: 0.74, facing: -1, id: "rebanho-de-basa" }),
        C("homem", 245, "stand", { dy: 0.62, facing: -1, id: "levita-de-issacar" }),
      ] }),
      // v.63 — as doze de Merari saem de RÚBEN e GADE, do lado de lá do rio, e
      // de ZEBULOM, do lado do mar: uma família só, repartida entre o vau do
      // Jordão e a beira-mar. O rio corta o quadro no meio.
      b(63, { q: "tiveram, por sorte, doze cidades da tribo de Rúben, e da tribo de Gade, e da tribo de Zebulom",
        set: "de-um-lado-e-do-outro-do-jordao", props: DE_UM_LADO_E_DO_OUTRO_DO_JORDAO,
        env: { terrain: "field", night: 0.16, glory: 0.5, storm: 0.08, fire: 0.05, water: 0.62, verdure: 0.34 }, cast: [
        C("homem", -195, "stand", { dy: 0.62, facing: -1, id: "levita-merarita-de-ruben" }),
        C("servo", -70, "walk", { dy: 0.74, facing: -1, id: "morador-de-gade-junto-ao-jordao" }),
        C("homem", 120, "raise", { dy: 0.7, facing: -1, id: "barqueiro-de-zebulom" }),
      ] }),
      // v.64 — e o resumo do mapa: "ASSIM OS FILHOS DE ISRAEL DERAM AOS LEVITAS
      // ESTAS CIDADES E OS SEUS ARRABALDES". A tribo que não conquistou nada
      // recebe quarenta e oito cidades da mão das outras onze — e aqui, sim,
      // cabe a multidão, porque isto é festa e não juízo.
      b(64, { q: "Assim os filhos de Israel deram aos levitas estas cidades e os seus arrabaldes",
        set: "entrega-das-cidades", props: A_ENTREGA_DAS_CIDADES,
        env: { terrain: "city", night: 0.1, glory: 0.72, storm: 0.03, fire: 0.06, water: 0.08, verdure: 0.26 }, cast: [
        C("multidao", -20, "raise", { dy: 0.7, facing: 1, id: "povo-de-israel-que-deu-as-cidades" }),
        C("anciao", 175, "raise", { dy: 0.64, facing: -1, id: "levita-que-recebe-a-cidade", glow: 0.3 }),
        C("homem", 265, "stand", { dy: 0.58, facing: -1, id: "chefe-de-tribo-que-entrega-a-cidade" }),
      ] }),
      // v.65 — e o mapa ganha nome: "ÀS QUAIS DERAM OS SEUS NOMES". As três
      // tribos do sul plantam as suas tendas em volta e o escrivão risca na
      // pedra do marco o nome de cada cidade sorteada.
      b(65, { q: "às quais deram os seus nomes",
        set: "nomes-dados-as-cidades", props: OS_NOMES_DADOS_AS_CIDADES,
        env: { terrain: "field", night: 0.28, glory: 0.5, storm: 0.06, fire: 0.06, water: 0.06, verdure: 0.3 }, cast: [
        C("homem", 60, "write", { dy: 0.72, facing: 1, id: "escriba-que-nomeia-as-cidades" }),
        C("anciao", -165, "stand", { dy: 0.6, facing: -1, id: "anciao-de-juda-na-reparticao" }),
        C("homem", -60, "stand", { dy: 0.66, facing: -1, id: "homem-de-simeao-na-reparticao" }),
        C("homem", 235, "stand", { dy: 0.62, facing: -1, id: "homem-de-benjamim-na-reparticao" }),
      ] }),
      // v.66 — o resto da família de Coate recebe cidades dentro dos TERMOS de
      // Efraim: a marca de pedra no meio da lavoura, dois carvalhos de
      // referência e o poço que divide o gado de dois donos.
      b(66, { q: "da tribo de Efraim as cidades dos seus termos",
        set: "termos-de-efraim", props: OS_TERMOS_DE_EFRAIM,
        env: { terrain: "field", night: 0.2, glory: 0.46, storm: 0.14, fire: 0.05, water: 0.1, verdure: 0.54 }, cast: [
        C("anciao", -110, "point", { dy: 0.64, facing: -1, id: "levita-dos-termos-de-efraim" }),
        C("homem", 45, "kneel", { dy: 0.76, facing: 1, id: "lavrador-dos-termos-de-efraim" }),
        C("mulherComum", 195, "stand", { dy: 0.66, facing: -1, id: "mulher-dos-termos-de-efraim" }),
      ] }),
      // v.67 — SIQUÉM, encravada entre o Ebal e o Gerizim, ao pé do CARVALHO
      // onde Jacó enterrou os deuses estranhos e onde Josué pôs a pedra do
      // concerto. Cidade de refúgio no alto da montanha de Efraim.
      b(67, { q: "Siquém e os seus arrabaldes, nas montanhas de Efraim",
        set: "siquem-no-monte-de-efraim", props: SIQUEM_NO_MONTE_DE_EFRAIM,
        env: { terrain: "mountain", night: 0.16, glory: 0.66, storm: 0.24, fire: 0.05, water: 0.1, verdure: 0.38 }, cast: [
        C("anciao", -180, "stand", { dy: 0.58, facing: -1, id: "sacerdote-de-siquem" }),
        C("homem", -25, "bow", { dy: 0.72, facing: 1, id: "homicida-acolhido-em-siquem" }),
        C("homem", 280, "point", { dy: 0.62, facing: -1, id: "atalaia-de-gezer" }),
      ] }),
      // v.68 — a DESCIDA DE BETE-HOROM: a ladeira de pedra por onde se despenca
      // do planalto para a planície, a mesma em que o SENHOR fez cair pedras do
      // céu sobre os amorreus (Js 10:11). Quatro degraus e a cidade lá em cima.
      b(68, { q: "E Jocmeão e os seus arrabaldes, Bete-Horom e os seus arrabaldes",
        set: "descida-de-bete-horom", props: A_DESCIDA_DE_BETE_HOROM,
        env: { terrain: "field", night: 0.12, glory: 0.6, storm: 0.36, fire: 0.05, water: 0.06, verdure: 0.2 }, cast: [
        C("homem", -170, "walk", { dy: 0.6, facing: -1, id: "levita-de-bete-horom" }),
        C("servo", -45, "walk", { dy: 0.7, facing: -1, id: "carregador-de-jocmeao" }),
        C("homem", 85, "stand", { dy: 0.8, facing: 1, id: "caminhante-da-descida-de-bete-horom" }),
      ] }),
      // v.69 — o VALE DE AIJALOM: "sol, detém-te em Gibeom, e tu, lua, no vale
      // de Aijalom" (Js 10:12). O vale mais famoso do céu de Israel entregue a
      // uma família de levitas, com a lua subindo cedo entre os dois espigões.
      b(69, { q: "E Aijalom e os seus arrabaldes, Gate-Rimom e os seus arrabaldes",
        set: "vale-de-aijalom", props: O_VALE_DE_AIJALOM,
        env: { terrain: "field", night: 0.5, glory: 0.5, storm: 0.1, fire: 0.05, water: 0.08, verdure: 0.3 }, cast: [
        C("pastor", -105, "walk", { dy: 0.7, facing: -1, id: "pastor-do-vale-de-aijalom" }),
        C("rebanho", 45, "stand", { dy: 0.76, facing: -1, id: "rebanho-do-vale-de-aijalom" }),
        C("homem", 245, "stand", { dy: 0.62, facing: -1, id: "levita-de-gate-rimom" }),
      ] }),
      // v.70 — ANER e BILEÃ, as duas últimas cidades dos coatitas: aldeias
      // pequenas de pedra solta, o curral entre elas e a eira do fim de tarde.
      // O mapa aqui respira devagar.
      b(70, { q: "estas cidades tiveram os que ficaram da família dos filhos de Coate",
        set: "aner-e-bilea", props: ANER_E_BILEA,
        env: { terrain: "field", night: 0.36, glory: 0.44, storm: 0.06, fire: 0.06, water: 0.1, verdure: 0.36 }, cast: [
        C("anciao", -215, "stand", { dy: 0.6, facing: -1, id: "levita-de-aner" }),
        C("homem", -70, "kneel", { dy: 0.74, facing: 1, id: "lavrador-de-bilea" }),
        C("mulherComum", 130, "walk", { dy: 0.68, facing: -1, id: "moradora-de-bilea" }),
      ] }),
      // v.71 — do outro lado, em Basã: GOLÃ, cidade de refúgio, e ASTAROTE, a
      // capital de Ogue, o último dos gigantes (Dt 1:4). Colunas velhas de uma
      // cidade que já era antiga quando Israel chegou.
      b(71, { q: "Golã, em Basã, e os seus arrabaldes, e Astarote e os seus arrabaldes",
        set: "gola-e-astarote", props: GOLA_E_ASTAROTE,
        env: { terrain: "field", night: 0.24, glory: 0.42, storm: 0.28, fire: 0.05, water: 0.08, verdure: 0.5 }, cast: [
        C("homem", -195, "stand", { dy: 0.62, facing: -1, id: "levita-gersonita-de-gola" }),
        C("servo", -45, "walk", { dy: 0.74, facing: -1, id: "morador-de-astarote" }),
        C("rebanho", 195, "stand", { dy: 0.66, facing: -1, id: "gado-de-astarote" }),
      ] }),
      // v.72 — QUEDES e DABERATE, na planície de Issacar, o celeiro do norte ao
      // pé do Tabor: medas na frente, curral e poço no meio, e as aves da
      // colheita cortando o céu. A tribo que "conhecia os tempos" morava aqui.
      b(72, { q: "E da tribo de Issacar, Quedes e os seus arrabaldes, e Daberate e os seus arrabaldes",
        set: "quedes-e-daberate", props: QUEDES_E_DABERATE,
        env: { terrain: "field", night: 0.1, glory: 0.6, storm: 0.03, fire: 0.05, water: 0.1, verdure: 0.66 }, cast: [
        C("homem", -145, "kneel", { dy: 0.76, facing: 1, id: "segador-de-daberate" }),
        C("mulherComum", -30, "bow", { dy: 0.72, facing: 1, id: "mulher-de-daberate" }),
        C("homem", 215, "stand", { dy: 0.62, facing: -1, id: "levita-de-quedes-de-issacar" }),
      ] }),
      // v.73 — ANÉM quer dizer "duas fontes", e é isso que se vê: dois poços um
      // atrás do outro, o ribeiro à direita e as bilhas enchendo. Numa terra de
      // sede, uma cidade com nome de água é um presente.
      b(73, { q: "E Ramote e os seus arrabaldes, e Aném e os seus arrabaldes",
        set: "mananciais-de-anem", props: OS_MANANCIAIS_DE_ANEM,
        env: { terrain: "field", night: 0.16, glory: 0.52, storm: 0.04, fire: 0.04, water: 0.05, verdure: 0.58 }, cast: [
        C("mulherComum", -75, "kneel", { dy: 0.72, facing: 1, id: "aguadeira-dos-mananciais-de-anem" }),
        C("homem", 105, "stand", { dy: 0.66, facing: -1, id: "levita-de-ramote-de-issacar" }),
        C("pastor", 240, "walk", { dy: 0.6, facing: -1, id: "pastor-que-abebera-em-anem" }),
      ] }),
      // v.74 — a COSTA DE ASER, a única tribo com pé no mar: barcos varados,
      // azeite em bilhas e gaivotas, ao norte do Carmelo, onde Jacó disse que
      // "de Aser, o seu pão será gordo" (Gn 49:20).
      b(74, { q: "E da tribo de Aser, Masal e os seus arrabaldes, e Abdom e os seus arrabaldes",
        set: "costa-de-aser", props: A_COSTA_DE_ASER,
        env: { terrain: "field", night: 0.3, glory: 0.54, storm: 0.16, fire: 0.05, water: 0.82, verdure: 0.34 }, cast: [
        C("homem", -140, "kneel", { dy: 0.74, facing: 1, id: "pescador-da-costa-de-aser" }),
        C("homem", 45, "stand", { dy: 0.7, facing: -1, id: "levita-de-masal" }),
        C("servo", 235, "walk", { dy: 0.62, facing: -1, id: "carregador-de-abdom" }),
      ] }),
      // v.75 — subindo da praia, o interior de Aser é oliveira e LAGAR: as
      // bilhas do azeite à sombra, o caixote da prensa e o poço da aldeia. É a
      // riqueza mansa que o Cronista não precisa nomear.
      b(75, { q: "E Hucoque e os seus arrabaldes, e Reobe e os seus arrabaldes",
        set: "lagares-de-aser", props: OS_LAGARES_DE_ASER,
        env: { terrain: "field", night: 0.24, glory: 0.46, storm: 0.08, fire: 0.05, water: 0.12, verdure: 0.62 }, cast: [
        C("homem", -160, "kneel", { dy: 0.76, facing: 1, id: "lagareiro-de-hucoque" }),
        C("mulherComum", 70, "stand", { dy: 0.68, facing: -1, id: "mulher-dos-lagares-de-aser" }),
        C("anciao", 240, "stand", { dy: 0.6, facing: -1, id: "levita-de-reobe" }),
      ] }),
      // v.76 — QUEDES NA GALILÉIA, a terceira cidade de refúgio do lado
      // ocidental, no alto verde de Naftali, com o ribeiro descendo ao lado do
      // portão. É o quadro mais verde e mais fresco do capítulo.
      b(76, { q: "E da tribo de Naftali, Quedes, em Galiléia, e os seus arrabaldes",
        set: "quedes-na-galileia", props: QUEDES_NA_GALILEIA,
        env: { terrain: "field", night: 0.08, glory: 0.68, storm: 0.03, fire: 0.04, water: 0.05, verdure: 0.86 }, cast: [
        C("homem", -145, "walk", { dy: 0.72, facing: -1, id: "homicida-acolhido-em-quedes" }),
        C("anciao", 15, "raise", { dy: 0.66, facing: 1, id: "sacerdote-de-quedes-na-galileia", glow: 0.3 }),
        C("mulherComum", -255, "stand", { dy: 0.66, facing: 1, id: "moradora-de-quiriataim" }),
      ] }),
      // v.77 — o MONTE TABOR, o cone perfeito que se levanta sozinho no meio da
      // planície de Jezreel: o monte de Débora e de Baraque, e o carvalho de
      // Tabor do caminho de Samuel. Zebulom cedeu a montanha a um levita.
      b(77, { q: "a Rimom e os seus arrabaldes, a Tabor e os seus arrabaldes",
        set: "monte-tabor", props: O_MONTE_TABOR,
        env: { terrain: "mountain", night: 0.18, glory: 0.62, storm: 0.3, fire: 0.05, water: 0.1, verdure: 0.42 }, cast: [
        C("homem", -160, "stand", { dy: 0.62, facing: -1, id: "levita-de-rimom" }),
        C("pastor", 75, "walk", { dy: 0.7, facing: -1, id: "pastor-do-monte-tabor" }),
        C("rebanho", 210, "stand", { dy: 0.66, facing: -1, id: "rebanho-do-tabor" }),
      ] }),
      // v.78 — e o mapa atravessa o rio: "DALÉM DO JORDÃO, NA ALTURA DE JERICÓ,
      // AO ORIENTE". BEZER é a cidade de refúgio de Rúben, plantada no planalto
      // seco onde não há árvore que esconda ninguém: quem corre para cá é visto
      // de longe — e chega.
      b(78, { q: "a Bezer, no deserto, e os seus arrabaldes",
        set: "bezer-no-deserto", props: BEZER_NO_DESERTO,
        env: { terrain: "desert", night: 0.06, glory: 0.58, storm: 0.06, fire: 0.1, water: 0.03, verdure: 0.06 }, cast: [
        C("homem", -120, "walk", { dy: 0.74, facing: -1, id: "homicida-que-alcanca-bezer" }),
        C("anciao", 95, "raise", { dy: 0.64, facing: -1, id: "sacerdote-de-bezer-no-deserto", glow: 0.28 }),
        C("servo", 240, "stand", { dy: 0.6, facing: -1, id: "morador-de-jaza" }),
      ] }),
      // v.79 — QUEDEMOTE, o descampado de onde Moisés mandou mensageiros de paz
      // a Seom (Dt 2:26), virado arraial de levitas: duas tendas, a fogueira da
      // noite, o curral e o silêncio da estepe debaixo das estrelas.
      b(79, { q: "E a Quedemote e os seus arrabaldes, e a Mefaate e os seus arrabaldes",
        set: "campina-de-quedemote", props: A_CAMPINA_DE_QUEDEMOTE,
        env: { terrain: "desert", night: 0.76, glory: 0.28, storm: 0.1, fire: 0.4, water: 0.03, verdure: 0.08 }, cast: [
        C("homem", -115, "stand", { dy: 0.66, facing: -1, id: "levita-de-quedemote" }),
        C("mulherComum", 15, "kneel", { dy: 0.74, facing: 1, id: "mulher-do-arraial-de-mefaate" }),
        C("servo", 255, "walk", { dy: 0.6, facing: -1, id: "guarda-da-campina-de-quedemote" }),
      ] }),
      // v.80 — RAMOTE EM GILEADE, a cidade de refúgio de Gade, no alto da serra
      // por onde corre o Jaboque; e MAANAIM, "dois arraiais", o lugar onde os
      // anjos de Deus saíram ao encontro de Jacó (Gn 32:2).
      b(80, { q: "E da tribo de Gade, a Ramote, em Gileade, e os seus arrabaldes",
        set: "ramote-em-gileade", props: RAMOTE_EM_GILEADE,
        env: { terrain: "field", night: 0.16, glory: 0.6, storm: 0.06, fire: 0.05, water: 0.05, verdure: 0.56 }, cast: [
        C("anciao", -180, "stand", { dy: 0.62, facing: -1, id: "sacerdote-de-ramote-em-gileade" }),
        C("homem", 145, "raise", { dy: 0.7, facing: -1, id: "homem-de-gade-em-maanaim" }),
        C("rebanho", 255, "stand", { dy: 0.58, facing: -1, id: "gado-de-maanaim" }),
      ] }),
      // v.81 — e o mapa acaba em fartura: HESBOM das piscinas — "os teus olhos
      // são como as piscinas de Hesbom" (Ct 7:4) — e JAZER das vinhas, que
      // Isaías chorou junto com Sibma (Is 16:8-9). Água e uva no último quadro
      // do capítulo mais longo do livro: a tribo sem herança acabou morando na
      // terra inteira.
      b(81, { q: "E a Hesbom e os seus arrabaldes, e a Jazer e os seus arrabaldes",
        set: "piscinas-de-hesbom", props: AS_PISCINAS_DE_HESBOM,
        env: { terrain: "field", night: 0.14, glory: 0.7, storm: 0.03, fire: 0.05, water: 0.05, verdure: 0.72 }, cast: [
        C("homem", -195, "stand", { dy: 0.62, facing: -1, id: "levita-de-hesbom" }),
        C("mulherComum", 60, "kneel", { dy: 0.76, facing: 1, id: "vindimadeira-de-jazer" }),
        C("homem", 175, "raise", { dy: 0.7, facing: -1, id: "vinhateiro-de-jazer" }),
      ] }),
    ],
  },
};
