// ============================================================================
// JUÍZES 1–3 — CENA VIVA. A CONQUISTA INACABADA, BOQUIM e os PRIMEIROS JUÍZES.
//
// Jz 1 — MORREU JOSUÉ e não há mais um capitão sobre todo o Israel: cada tribo
// sobe por si. JUDÁ sobe primeiro (o SENHOR entrega a terra na sua mão), leva
// SIMEÃO consigo, fere em Bezeque, corta os polegares de ADONI-BEZEQUE ("assim
// como eu fiz, assim Deus me pagou"), toma Jerusalém e põe fogo na cidade.
// CALEBE promete a filha ACSA a quem tomar Quiriate-Sefer — e OTNIEL a toma; e
// Acsa desce do jumento para pedir as FONTES DE ÁGUAS. Mas então o capítulo
// vira uma LADAINHA DO QUE NÃO SE FEZ: "porquanto tinham carros de ferro";
// "não expulsaram"; "tampouco expulsou"; "ficaram habitando com ele";
// "resolveram os cananeus habitar na mesma terra". A conquista fica pela
// metade — e o que ficou dentro da terra vai virar o laço do livro inteiro.
//
// Jz 2 — BOQUIM ("os que choram"): o ANJO DO SENHOR sobe de Gilgal e fala em
// pessoa — mediador VISÍVEL, logo `by: "anjo"` com a figura luminosa em cena
// (regra do projeto: voz do céu só quando NÃO há mediador). "Nunca invalidarei
// a minha aliança convosco… mas vós não obedecestes à minha voz". O povo chora
// e sacrifica. Morre Josué; e "outra geração após ela se levantou, que não
// conhecia ao SENHOR". Daí o CICLO que é a espinha do livro, enunciado em
// 2:11-19: APOSTASIA (servem aos baalins — noite alta, glória baixa, ídolos)
// → OPRESSÃO (entregues na mão dos espoliadores) → CLAMOR/GEMIDO (figuras de
// joelhos) → JUIZ LIBERTADOR (glória subindo) → e, morto o juiz, tudo recomeça
// pior. No fecho, o SENHOR fala SEM mediador (`by: "deus"`): as nações ficam,
// para provar a Israel.
//
// Jz 3 — As nações que ficaram (os cinco príncipes dos filisteus, cananeus,
// sidônios, heveus do Líbano); casamentos misturados e os deuses deles dentro
// de casa. Primeiro giro do ciclo: CUSÃ-RISATAIM, oito anos — e OTNIEL, sobre
// quem vem o Espírito do SENHOR: a terra sossega quarenta anos. Segundo giro:
// EGLOM, rei de Moabe, homem muito gordo, toma a cidade das palmeiras e domina
// dezoito anos — e EÚDE, o canhoto, forja uma ESPADA DE DOIS FIOS de um côvado,
// cinge-a à COXA DIREITA (onde ninguém revista um canhoto), entrega o presente,
// volta das imagens de escultura de Gilgal e, na SALA DE VERÃO só do rei, crava
// a lâmina no ventre, tranca as portas e foge por Seirá; toca a buzina em
// Efraim, toma os VAUS DO JORDÃO — e a terra sossega oitenta anos. Fecho:
// SANGAR, filho de Anate, e a AGUILHADA DE BOIS contra seiscentos filisteus.
//
// DIREÇÃO DE JUÍZO (Eglom): noite ALTA, glória BAIXA, sem multidão festiva, sem
// `glow` no inimigo — o rei morto é uma figura INDIVIDUAL em `lie`, no chão da
// sua própria sala trancada.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const dv = (v: number, q?: string, extra: Partial<StageBeat> = {}) => b(v, { by: "deus", ...(q ? { q } : {}), ...extra });

// ---------------------------------------------------------------- SETS Jz 1
// O ARRAIAL EM LUTO — depois da morte de Josué; o altar onde se consulta o SENHOR.
const LUTO: StagePropSpec[] = [
  P("tent", -230, 1.1, undefined, 0.22),
  P("tent", 200, 1.05, undefined, 0.26),
  P("altar", 60, 0.95, undefined, 0.46),
  P("rock", -320, 1.1, undefined, 0.42),
  P("palm", -140, 1.0, undefined, 0.14),
  P("grass", 120, 0.78, undefined, 0.7),
];
// BEZEQUE — o campo aberto da primeira peleja de Judá e Simeão.
const BEZEQUE: StagePropSpec[] = [
  P("rock", -260, 1.2, undefined, 0.42),
  P("rock", 250, 1.05, undefined, 0.5),
  P("tower", 300, 0.95, undefined, 0.26),
  P("bush", 140, 0.9, undefined, 0.6),
  P("palm", -330, 0.95, undefined, 0.14),
  P("grass", -60, 0.78, undefined, 0.72),
];
// JERUSALÉM EM CHAMAS — a cidade ferida ao fio da espada e posta a fogo.
const JERUSALEM: StagePropSpec[] = [
  P("tower", 40, 1.4, undefined, 0.3),
  P("church", -190, 1.05, undefined, 0.36),
  P("campfire", 210, 1.2, 0.9, 0.52),
  P("rock", 310, 1.05, undefined, 0.58),
  P("grass", -80, 0.76, undefined, 0.72),
];
// AS MONTANHAS DE JUDÁ — o sul e as planícies vistos do alto.
const MONTES_JUDA: StagePropSpec[] = [
  P("rock", -250, 1.3, undefined, 0.38),
  P("rock", 230, 1.15, undefined, 0.5),
  P("tree", 300, 1.0, undefined, 0.26),
  P("bush", -80, 0.9, undefined, 0.66),
  P("grass", 90, 0.78, undefined, 0.72),
];
// HEBROM (Quiriate-Arba) — a terra dos filhos de Anaque, os gigantes.
const HEBROM: StagePropSpec[] = [
  P("tree", -260, 1.15, undefined, 0.24),
  P("well", 240, 1.0, undefined, 0.46),
  P("stall", -60, 0.95, undefined, 0.62),
  P("rock", 320, 1.1, undefined, 0.36),
  P("grass", 110, 0.76, undefined, 0.72),
];
// DEBIR (Quiriate-Sefer) — a cidade prometida a quem a tomasse.
const DEBIR: StagePropSpec[] = [
  P("tower", 60, 1.2, undefined, 0.3),
  P("rock", -240, 1.15, undefined, 0.44),
  P("tree", -320, 1.0, undefined, 0.22),
  P("bush", 230, 0.9, undefined, 0.58),
  P("grass", 150, 0.78, undefined, 0.7),
];
// AS FONTES DE ACSA — as fontes superiores e as inferiores no lugar da terra seca.
const FONTES: StagePropSpec[] = [
  P("well", -140, 1.1, undefined, 0.42),
  P("well", 160, 1.0, undefined, 0.62),
  P("river", 0, 1.3, undefined, 0.86),
  P("grapes", 300, 0.95, undefined, 0.3),
  P("palm", -300, 1.05, undefined, 0.14),
  P("grass", 250, 0.8, undefined, 0.7),
];
// A CIDADE DAS PALMEIRAS e o deserto ao sul de Arade — a subida dos queneus.
const PALMEIRAS: StagePropSpec[] = [
  P("palm", -220, 1.2, undefined, 0.16),
  P("palm", -110, 1.05, undefined, 0.22),
  P("palm", 210, 1.1, undefined, 0.18),
  P("tent", 90, 1.0, undefined, 0.42),
  P("rock", 300, 1.05, undefined, 0.5),
  P("grass", -20, 0.72, undefined, 0.74),
];
// HORMÁ — Zefate totalmente destruída: o entulho e o fogo do anátema.
const HORMA: StagePropSpec[] = [
  P("campfire", 90, 1.25, 1, 0.48),
  P("tower", -220, 1.0, undefined, 0.3),
  P("rock", -60, 1.15, undefined, 0.62),
  P("rock", 260, 1.1, undefined, 0.42),
  P("grass", 180, 0.74, undefined, 0.72),
];
// A COSTA FILISTEIA — Gaza, Ascalom e Ecrom com os seus termos.
const FILISTEIA: StagePropSpec[] = [
  P("tower", -180, 1.2, undefined, 0.3),
  P("church", 120, 1.05, undefined, 0.34),
  P("tower", 290, 1.0, undefined, 0.24),
  P("rock", -300, 1.05, undefined, 0.5),
  P("grass", 20, 0.76, undefined, 0.7),
];
// O VALE DOS CARROS DE FERRO — onde a mão de Judá parou.
const VALE_FERRO: StagePropSpec[] = [
  P("rock", -280, 1.3, undefined, 0.36),
  P("rock", 60, 1.15, undefined, 0.64),
  P("tower", 220, 1.1, undefined, 0.28),
  P("crate", 150, 0.95, undefined, 0.56),
  P("crate", -120, 0.9, undefined, 0.66),
  P("grass", -30, 0.72, undefined, 0.74),
];
// BETEL (a antiga Luz) — a porta da cidade que o homem mostrou aos espias.
const BETEL: StagePropSpec[] = [
  P("door", -60, 1.15, undefined, 0.46),
  P("tower", 150, 1.2, undefined, 0.28),
  P("church", -230, 1.0, undefined, 0.34),
  P("rock", 300, 1.05, undefined, 0.52),
  P("grass", 60, 0.76, undefined, 0.72),
];
// A NOVA LUZ na terra dos heteus — a cidade que o poupado edificou.
const LUZ_HETEUS: StagePropSpec[] = [
  P("tower", 120, 1.15, undefined, 0.3),
  P("church", -140, 1.05, undefined, 0.36),
  P("crate", 20, 0.9, undefined, 0.6),
  P("tree", 300, 1.0, undefined, 0.24),
  P("grass", -40, 0.76, undefined, 0.72),
];
// OS CANANEUS QUE FICARAM — os altares que não se derrubaram, dentro da terra.
const CANANEUS: StagePropSpec[] = [
  P("altar", -170, 1.0, undefined, 0.46),
  P("tower", 170, 1.15, undefined, 0.3),
  P("stall", 40, 0.95, undefined, 0.64),
  P("tent", -300, 1.0, undefined, 0.24),
  P("bush", 300, 0.85, undefined, 0.56),
  P("grass", 250, 0.76, undefined, 0.72),
];
// ACO e SIDOM — a costa que Aser não tomou: os barcos dos sidônios.
const COSTA: StagePropSpec[] = [
  P("boat", -160, 1.1, undefined, 0.5),
  P("river", 0, 1.4, undefined, 0.88),
  P("tower", 190, 1.1, undefined, 0.28),
  P("palm", -320, 1.0, undefined, 0.14),
  P("grass", 90, 0.76, undefined, 0.68),
];
// AS MONTANHAS DE DÃ — para onde os amorreus impeliram a tribo, sem descer ao vale.
const MONTES_DA: StagePropSpec[] = [
  P("rock", -230, 1.35, undefined, 0.34),
  P("rock", 210, 1.2, undefined, 0.46),
  P("rock", 30, 1.05, undefined, 0.66),
  P("tree", 320, 1.0, undefined, 0.22),
  P("grass", -80, 0.72, undefined, 0.74),
];

// ---------------------------------------------------------------- SETS Jz 2
// BOQUIM — a subida do anjo do SENHOR de Gilgal; o lugar dos que choram.
const BOQUIM: StagePropSpec[] = [
  P("palm", -250, 1.1, undefined, 0.16),
  P("tree", 240, 1.1, undefined, 0.26),
  P("rock", -300, 1.1, undefined, 0.46),
  P("bush", 150, 0.9, undefined, 0.6),
  P("grass", 60, 0.78, undefined, 0.72),
];
// BOQUIM — o altar do sacrifício depois do pranto.
const BOQUIM_ALTAR: StagePropSpec[] = [
  { ...P("altar", 0, 1.1, 0.7, 0.48), tag: "altar-de-boquim" },
  P("tree", 240, 1.1, undefined, 0.26),
  P("palm", -250, 1.1, undefined, 0.16),
  P("rock", -300, 1.05, undefined, 0.52),
  P("grass", 130, 0.76, undefined, 0.72),
];
// A HERANÇA — cada um à sua herança: searas, vinhas e tendas na terra repartida.
const HERANCA: StagePropSpec[] = [
  P("sheaf", -140, 1.0, undefined, 0.58),
  P("tent", 180, 1.05, undefined, 0.26),
  P("grapes", -280, 1.0, undefined, 0.3),
  P("palm", 300, 1.0, undefined, 0.14),
  P("grass", 40, 0.78, undefined, 0.7),
];
// TIMNATE-HERES — o sepulcro de Josué no monte de Efraim, ao norte de Gaás.
const TIMNATE: StagePropSpec[] = [
  P("rock", 0, 1.35, undefined, 0.48),
  P("rock", -250, 1.15, undefined, 0.34),
  P("tree", 230, 1.05, undefined, 0.24),
  P("bush", -120, 0.85, undefined, 0.62),
  P("grass", 120, 0.74, undefined, 0.72),
];
// O ALTO DOS BAALINS — o ídolo, o altar estranho e a coluna de Astarote.
const BAALINS: StagePropSpec[] = [
  P("calf", 0, 1.25, undefined, 0.46),
  P("altar", -180, 1.05, 0.8, 0.5),
  P("pillar", 190, 1.05, undefined, 0.3),
  P("bush", 280, 0.9, undefined, 0.58),
  P("rock", -300, 1.05, undefined, 0.54),
  P("grass", 90, 0.72, undefined, 0.74),
];
// A MÃO DOS ESPOLIADORES — o arraial saqueado, a fogueira do inimigo no meio.
const OPRESSAO: StagePropSpec[] = [
  P("tent", -190, 1.05, undefined, 0.26),
  P("campfire", 150, 1.2, 0.9, 0.52),
  P("rock", 260, 1.1, undefined, 0.4),
  P("crate", -60, 0.9, undefined, 0.66),
  P("grass", 40, 0.72, undefined, 0.74),
];

// ---------------------------------------------------------------- SETS Jz 3
// AS NAÇÕES QUE FICARAM — a torre cananeia e os barcos sidônios na mesma terra.
const NACOES: StagePropSpec[] = [
  P("tower", -180, 1.15, undefined, 0.28),
  P("boat", 200, 1.05, undefined, 0.52),
  P("tree", 60, 1.05, undefined, 0.24),
  P("rock", -320, 1.2, undefined, 0.42),
  P("grass", 120, 0.76, undefined, 0.7),
];
// AS MONTANHAS DO LÍBANO — de Baal-Hermom até à entrada de Hamate.
const LIBANO: StagePropSpec[] = [
  P("rock", -240, 1.35, undefined, 0.34),
  P("rock", 190, 1.2, undefined, 0.46),
  P("tree", 300, 1.05, undefined, 0.2),
  P("tree", -40, 1.0, undefined, 0.3),
  P("grass", 90, 0.72, undefined, 0.74),
];
// A MISTURA — as filhas dadas e tomadas, e os deuses deles dentro da casa.
const MISTURA: StagePropSpec[] = [
  P("altar", -160, 1.0, 0.5, 0.48),
  P("calf", 150, 1.1, undefined, 0.44),
  P("tent", -300, 1.0, undefined, 0.24),
  P("stall", 40, 0.9, undefined, 0.66),
  P("grass", 240, 0.76, undefined, 0.7),
];
// OS BAALINS E ASTAROTE — a apostasia que abre o ciclo de Jz 3.
const IDOLOS3: StagePropSpec[] = [
  P("calf", -40, 1.25, undefined, 0.46),
  P("altar", 170, 1.05, 0.85, 0.5),
  P("pillar", -220, 1.05, undefined, 0.3),
  P("rock", 300, 1.05, undefined, 0.54),
  P("grass", 90, 0.72, undefined, 0.74),
];
// O JUGO DE CUSÃ-RISATAIM — a mão da Mesopotâmia sobre Israel, oito anos.
const MESOPOTAMIA: StagePropSpec[] = [
  P("tower", 170, 1.2, undefined, 0.28),
  P("tent", -200, 1.0, undefined, 0.26),
  P("crate", 60, 0.9, undefined, 0.64),
  P("rock", -320, 1.1, undefined, 0.44),
  P("grass", 260, 0.74, undefined, 0.7),
];
// A TERRA QUE SOSSEGA — searas, poço e vinha: o descanso dado pelo juiz.
const SOSSEGO: StagePropSpec[] = [
  P("sheaf", -120, 1.05, undefined, 0.58),
  P("well", 120, 1.0, undefined, 0.46),
  P("grapes", 200, 1.0, undefined, 0.32),
  P("tent", 300, 0.95, undefined, 0.24),
  P("palm", -300, 1.05, undefined, 0.14),
  P("grass", 30, 0.78, undefined, 0.72),
];
// O JUGO DE MOABE — o SENHOR fortalece Eglom contra Israel: a tenda saqueada,
// o despojo empilhado e a torre do opressor sobre a terra (nada de searas: o
// sossego de Otniel acabou).
const JUGO_MOABE: StagePropSpec[] = [
  P("tower", 170, 1.2, undefined, 0.28),
  P("tent", -210, 1.0, undefined, 0.26),
  P("crate", 40, 0.95, undefined, 0.62),
  P("crate", -80, 0.85, undefined, 0.7),
  P("rock", -320, 1.1, undefined, 0.44),
  P("bush", 270, 0.85, undefined, 0.58),
  P("grass", 120, 0.74, undefined, 0.72),
];
// A CIDADE DAS PALMEIRAS tomada por Moabe, Amom e Amaleque.
const CID_PALMEIRAS: StagePropSpec[] = [
  P("palm", -230, 1.2, undefined, 0.16),
  P("palm", -110, 1.05, undefined, 0.22),
  P("palm", 200, 1.1, undefined, 0.18),
  P("tower", 60, 1.15, undefined, 0.3),
  P("rock", 300, 1.05, undefined, 0.48),
  P("grass", -30, 0.72, undefined, 0.74),
];
// A CORTE DE EGLOM — o trono de Moabe e o presente de Israel entregue.
const CORTE_MOABE: StagePropSpec[] = [
  P("throne", 120, 1.15, undefined, 0.34),
  P("door", -300, 1.05, undefined, 0.3),
  P("lampstand", -160, 1.0, undefined, 0.42),
  P("crate", -30, 0.95, undefined, 0.62),
  P("amphora", 250, 0.9, undefined, 0.54),
];
// A CASA DE EÚDE — a tenda israelita onde a ESPADA DE DOIS FIOS é forjada em
// segredo, longe do trono de Eglom (a arma escondida não se faz na sala do rei).
const CASA_EUDE: StagePropSpec[] = [
  P("tent", -50, 1.35, undefined, 0.4),
  P("campfire", 130, 1.0, 0.85, 0.54),
  P("crate", -210, 0.9, undefined, 0.62),
  P("amphora", 230, 0.85, undefined, 0.6),
  P("stall", 310, 0.95, undefined, 0.36),
  P("grass", 40, 0.74, undefined, 0.72),
];
// A VOLTA DAS IMAGENS — Eúde torna do marco de Gilgal à corte de Moabe: as
// imagens de escultura ficam à porta, e o trono adiante.
const CORTE_IMAGENS: StagePropSpec[] = [
  P("throne", 120, 1.15, undefined, 0.34),
  P("door", -300, 1.05, undefined, 0.3),
  { ...P("calf", -215, 1.0, undefined, 0.4), tag: "imagens-de-gilgal" },
  P("lampstand", 250, 1.0, undefined, 0.44),
  P("crate", -30, 0.95, undefined, 0.62),
  P("amphora", 40, 0.85, undefined, 0.7),
];
// A SALA DE VERÃO — a câmara que o rei tinha só para si; as portas se trancam.
const SALA_VERAO: StagePropSpec[] = [
  P("throne", 60, 1.15, undefined, 0.36),
  P("door", -230, 1.15, undefined, 0.34),
  P("lampstand", 210, 1.0, undefined, 0.44),
  P("amphora", -60, 0.9, undefined, 0.62),
  P("crate", 290, 0.9, undefined, 0.54),
];
// AS IMAGENS DE ESCULTURA ao pé de Gilgal — o marco por onde Eúde volta e escapa.
const IMAGENS: StagePropSpec[] = [
  { ...P("calf", -60, 1.15, undefined, 0.46), tag: "imagens-de-gilgal" },
  P("pillar", 140, 1.05, undefined, 0.32),
  P("rock", -280, 1.15, undefined, 0.48),
  P("palm", 280, 1.0, undefined, 0.16),
  P("grass", 40, 0.74, undefined, 0.72),
];
// AS MONTANHAS DE EFRAIM — a buzina que desce chamando Israel à peleja.
const EFRAIM: StagePropSpec[] = [
  P("trumpet", 0, 0.95, undefined, 0.52),
  P("rock", -240, 1.3, undefined, 0.36),
  P("rock", 220, 1.15, undefined, 0.44),
  P("tree", 310, 1.0, undefined, 0.2),
  P("grass", 100, 0.74, undefined, 0.72),
];
// OS VAUS DO JORDÃO contra Moabe — a passagem tomada, ninguém deixa passar.
const VAUS: StagePropSpec[] = [
  { ...P("river", 0, 1.45, undefined, 0.86), tag: "vaus-do-jordao" },
  P("rock", -250, 1.15, undefined, 0.44),
  P("rock", 230, 1.1, undefined, 0.52),
  P("palm", -330, 1.0, undefined, 0.14),
  P("grass", 100, 0.76, undefined, 0.68),
];
// A SEARA DE SANGAR — a junta de bois e a aguilhada que virou arma.
const SEARA: StagePropSpec[] = [
  { ...P("rod", 20, 0.95, undefined, 0.62), tag: "aguilhada-de-sangar" },
  P("sheaf", -120, 1.05, undefined, 0.58),
  P("stall", 150, 1.0, undefined, 0.5),
  P("sheaf", 40, 0.95, undefined, 0.68),
  P("rock", 300, 1.0, undefined, 0.46),
  P("palm", -300, 1.0, undefined, 0.14),
  P("grass", 240, 0.78, undefined, 0.7),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Jz 1
  1: {
    start: { terrain: "field", night: 0.24, glory: 0.42, storm: 0, fire: 0, verdure: 0.36 },
    beats: [
      // v.1 — morto Josué, Israel consulta o SENHOR: quem subirá primeiro? (os chefes falam)
      b(1, { by: "patriarca", q: "perguntaram ao SENHOR, dizendo:", set: "luto", props: LUTO,
        env: { terrain: "field", night: 0.3, glory: 0.34, verdure: 0.34 }, cast: [
        C("patriarca", -60, "kneel", { dy: 0.52, facing: 1, id: "chefe-israel" }),
        C("homem", 90, "bow", { dy: 0.5, facing: -1, id: "juda" }),
        C("homem", 190, "bow", { dy: 0.48, facing: -1, id: "simeao" }),
      ] }),
      // v.2 — o SENHOR responde SEM mediador: Judá subirá. Voz do céu, glória alta.
      dv(2, "E disse o Senhor:", { env: { glory: 0.7, night: 0.16 }, cast: [
        C("patriarca", -60, "kneel", { dy: 0.52, facing: 1, id: "chefe-israel" }),
        C("homem", 90, "raise", { dy: 0.5, facing: 1, id: "juda" }),
        C("homem", 190, "stand", { dy: 0.48, facing: -1, id: "simeao" }),
      ] }),
      // v.3 — Judá chama Simeão, seu irmão, para subir com ele. (Judá fala)
      b(3, { by: "homem", q: "Então disse Judá a Simeão, seu irmão:", env: { glory: 0.6, night: 0.18 }, cast: [
        C("homem", -80, "point", { dy: 0.52, facing: 1, id: "juda" }),
        C("homem", 80, "stand", { dy: 0.5, facing: -1, id: "simeao" }),
        C("patriarca", -230, "stand", { dy: 0.46, facing: 1, id: "chefe-israel" }),
      ] }),
      // v.4 — a primeira peleja: dez mil homens feridos em Bezeque.
      b(4, { q: "o Senhor lhe entregou na sua mão os cananeus e os perizeus;", set: "bezeque", props: BEZEQUE,
        env: { terrain: "field", glory: 0.44, night: 0.28, storm: 0.2, verdure: 0.3 }, cast: [
        C("homem", -140, "raise", { dy: 0.5, facing: 1, id: "juda" }),
        C("homem", -50, "walk", { dy: 0.52, facing: 1, id: "simeao" }),
        C("homem", 130, "lie", { dy: 0.6, id: "cananeu-caido" }),
        C("homem", 230, "bow", { dy: 0.54, facing: -1, id: "perizeu" }),
      ] }),
      // v.5 — acham ADONI-BEZEQUE e pelejam contra ele.
      b(5, { q: "Adoni-Bezeque em Bezeque,", cast: [
        C("rei", 150, "stand", { dy: 0.5, facing: -1, id: "adoni-bezeque" }),
        C("homem", -120, "walk", { dy: 0.52, facing: 1, id: "juda" }),
        C("homem", -30, "walk", { dy: 0.5, facing: 1, id: "simeao" }),
      ] }),
      // v.6 — fugiu, foi preso: cortam-lhe os polegares das mãos e dos pés.
      b(6, { q: "mas o seguiram,", env: { glory: 0.32, night: 0.36, storm: 0.16 }, cast: [
        C("rei", 120, "kneel", { dy: 0.56, facing: -1, id: "adoni-bezeque" }),
        C("homem", -60, "point", { dy: 0.52, facing: 1, id: "juda" }),
        C("homem", 20, "stand", { dy: 0.5, facing: 1, id: "simeao" }),
      ] }),
      // v.7 — o rei confessa a sua própria medida: setenta reis debaixo da sua mesa. (o rei fala)
      b(7, { by: "rei", q: "Então disse Adoni-Bezeque:", env: { glory: 0.28, night: 0.42 }, cast: [
        C("rei", 60, "bow", { dy: 0.56, facing: -1, id: "adoni-bezeque" }),
        C("homem", -130, "stand", { dy: 0.5, facing: 1, id: "juda" }),
        C("homem", 220, "kneel", { dy: 0.52, facing: -1, id: "rei-mutilado" }),
      ] }),
      // v.8 — Jerusalém ferida ao fio da espada e posta a fogo (juízo: sem festa).
      b(8, { q: "e tomando-a,", set: "jerusalem", props: JERUSALEM,
        env: { terrain: "city", glory: 0.26, night: 0.48, fire: 0.5, storm: 0.14, verdure: 0.12 }, cast: [
        C("homem", -150, "raise", { dy: 0.5, facing: 1, id: "juda" }),
        C("homem", 40, "lie", { dy: 0.62, id: "jebuseu-caido" }),
        C("mulherComum", 140, "bow", { dy: 0.56, facing: -1, id: "moradora" }),
      ] }),
      // v.9 — Judá desce às montanhas, ao sul e às planícies.
      b(9, { q: "desceram a pelejar contra os cananeus,", set: "montes", props: MONTES_JUDA,
        env: { terrain: "mountain", glory: 0.4, night: 0.3, fire: 0, storm: 0.1, verdure: 0.3 }, cast: [
        C("homem", -110, "walk", { dy: 0.5, facing: 1, id: "juda" }),
        C("homem", -20, "walk", { dy: 0.52, facing: 1, id: "simeao" }),
        C("multidao", 160, "walk", { dy: 0.48, facing: 1 }),
      ] }),
      // v.10 — HEBROM (Quiriate-Arba): Sesai, Aimã e Talmai, os filhos de Anaque (gigantes).
      b(10, { q: "Quiriate-Arba),", set: "hebrom", props: HEBROM,
        env: { terrain: "field", glory: 0.42, night: 0.28, storm: 0.18, verdure: 0.34 }, cast: [
        C("homem", 130, "stand", { dy: 0.56, scale: 2.1, facing: -1, id: "sesai" }),
        C("homem", 250, "stand", { dy: 0.5, scale: 2.0, facing: -1, id: "aima" }),
        C("homem", -180, "point", { dy: 0.52, facing: 1, id: "juda" }),
        C("homem", -60, "stand", { dy: 0.5, facing: 1, id: "talmai-cai" }),
      ] }),
      // v.11 — dali contra Debir, que se chamava Quiriate-Sefer ("cidade do livro").
      b(11, { q: "E dali partiu contra os moradores de Debir;", set: "debir", props: DEBIR,
        env: { terrain: "field", glory: 0.44, night: 0.26, storm: 0.1, verdure: 0.32 }, cast: [
        C("homem", -140, "walk", { dy: 0.5, facing: 1, id: "juda" }),
        C("multidao", 40, "walk", { dy: 0.48, facing: 1 }),
      ] }),
      // v.12 — CALEBE promete Acsa, sua filha, a quem tomar Quiriate-Sefer. (Calebe fala)
      b(12, { by: "homem", q: "E disse Calebe:", env: { glory: 0.5, night: 0.22 }, cast: [
        C("homem", -120, "raise", { dy: 0.52, facing: 1, id: "calebe" }),
        C("servo", 60, "stand", { dy: 0.5, facing: -1, id: "otniel" }),
        C("mulherComum", 190, "stand", { dy: 0.48, facing: -1, id: "acsa" }),
      ] }),
      // v.13 — OTNIEL, filho de Quenaz, toma a cidade e recebe Acsa por mulher.
      b(13, { q: "E tomou-a Otniel, filho de Quenaz,", env: { glory: 0.58, night: 0.18, verdure: 0.38 }, cast: [
        C("servo", -60, "raise", { dy: 0.52, facing: 1, id: "otniel" }),
        C("mulherComum", 60, "stand", { dy: 0.5, facing: -1, id: "acsa" }),
        C("homem", -200, "stand", { dy: 0.48, facing: 1, id: "calebe" }),
      ] }),
      // v.14 — Acsa desce do jumento; Calebe pergunta: Que é que tens? (Calebe fala)
      b(14, { by: "homem", q: "e Calebe lhe disse:", set: "fontes", props: FONTES,
        env: { terrain: "field", glory: 0.55, night: 0.18, verdure: 0.5 }, cast: [
        C("homem", -110, "stand", { dy: 0.5, facing: 1, id: "calebe" }),
        C("mulherComum", 60, "kneel", { dy: 0.56, facing: -1, id: "acsa" }),
        C("servo", 200, "stand", { dy: 0.48, facing: -1, id: "otniel" }),
      ] }),
      // v.15 — Acsa pede a bênção: deste-me terra seca, dá-me fontes de águas. (Acsa fala)
      b(15, { by: "mulherComum", q: "E ela lhe disse:", env: { glory: 0.64, night: 0.14, verdure: 0.62 }, cast: [
        C("mulherComum", -40, "raise", { dy: 0.54, facing: 1, id: "acsa" }),
        C("homem", 120, "stand", { dy: 0.5, facing: -1, id: "calebe" }),
        C("servo", 230, "stand", { dy: 0.48, facing: -1, id: "otniel" }),
      ] }),
      // v.16 — os queneus, sogros de Moisés, sobem da cidade das palmeiras ao deserto de Judá.
      b(16, { q: "subiram da cidade das palmeiras com os filhos de Judá", set: "palmeiras", props: PALMEIRAS,
        env: { terrain: "desert", glory: 0.5, night: 0.2, verdure: 0.16 }, cast: [
        C("homem", -140, "walk", { dy: 0.52, facing: 1, id: "queneu" }),
        C("mulherComum", -50, "walk", { dy: 0.5, facing: 1, id: "queneia" }),
        C("multidao", 120, "walk", { dy: 0.48, facing: 1 }),
      ] }),
      // v.17 — Zefate destruída de todo; a cidade passa a chamar-se HORMÁ ("destruição").
      b(17, { q: "e totalmente a destruíram,", set: "horma", props: HORMA,
        env: { terrain: "city", glory: 0.28, night: 0.46, fire: 0.5, storm: 0.16, verdure: 0.1 }, cast: [
        C("homem", -160, "stand", { dy: 0.5, facing: 1, id: "juda" }),
        C("homem", -60, "lie", { dy: 0.64, id: "zefate-caido" }),
        C("homem", 230, "bow", { dy: 0.54, facing: -1, id: "zefate-servo" }),
      ] }),
      // v.18 — Judá toma Gaza, Ascalom e Ecrom com os seus termos.
      b(18, { q: "Tomou mais Judá a Gaza com o seu termo,", set: "filisteia", props: FILISTEIA,
        env: { terrain: "city", glory: 0.5, night: 0.24, fire: 0, storm: 0.08, verdure: 0.24 }, cast: [
        C("homem", -60, "raise", { dy: 0.52, facing: 1, id: "juda" }),
        C("multidao", 120, "stand", { dy: 0.48 }),
      ] }),
      // v.19 — ⚑ A CONQUISTA PARA: os carros de ferro do vale. A glória cai.
      b(19, { q: "porém não expulsou aos moradores do vale,", set: "vale", props: VALE_FERRO,
        env: { terrain: "field", glory: 0.24, night: 0.44, storm: 0.32, fire: 0, verdure: 0.2 }, cast: [
        C("homem", -170, "stand", { dy: 0.52, facing: 1, id: "juda" }),
        C("rei", 140, "stand", { dy: 0.44, facing: -1, id: "cananeu-do-vale" }),
        C("homem", 240, "stand", { dy: 0.48, facing: -1, id: "carreiro" }),
      ] }),
      // v.20 — Hebrom dada a Calebe; dali expulsa os três filhos de Anaque.
      b(20, { q: "como Moisés o dissera;", set: "hebrom", props: HEBROM,
        env: { terrain: "field", glory: 0.56, night: 0.2, storm: 0.1, verdure: 0.36 }, cast: [
        C("homem", -120, "raise", { dy: 0.52, facing: 1, id: "calebe" }),
        C("homem", 150, "walk", { dy: 0.5, scale: 2.1, facing: 1, id: "sesai" }),
        C("homem", 270, "walk", { dy: 0.46, scale: 2.0, facing: 1, id: "aima" }),
      ] }),
      // v.21 — Benjamim NÃO expulsa os jebuseus: moram juntos em Jerusalém até hoje.
      b(21, { q: "Porém os filhos de Benjamim não expulsaram os jebuseus", set: "cananeus", props: CANANEUS,
        env: { terrain: "city", glory: 0.26, night: 0.42, storm: 0.06, verdure: 0.2 }, cast: [
        C("homem", -90, "stand", { dy: 0.52, facing: 1, id: "benjamita" }),
        C("homem", 60, "stand", { dy: 0.52, facing: -1, id: "jebuseu" }),
        C("mulherComum", 200, "stand", { dy: 0.48, facing: -1, id: "jebuseia" }),
      ] }),
      // v.22 — a casa de José sobe contra Betel, e o SENHOR vai com eles.
      b(22, { q: "E subiu também a casa de José contra Betel,", set: "betel", props: BETEL,
        env: { terrain: "city", glory: 0.6, night: 0.22, verdure: 0.24 }, cast: [
        C("homem", -140, "walk", { dy: 0.52, facing: 1, id: "jose1" }),
        C("multidao", 20, "walk", { dy: 0.48, facing: 1 }),
      ] }),
      // v.23 — espias mandados a Betel, que outrora se chamava LUZ.
      b(23, { q: "E a casa de José mandou espias a Betel,", env: { glory: 0.44, night: 0.4 }, cast: [
        C("homem", -120, "walk", { dy: 0.54, facing: 1, id: "espia1" }),
        C("homem", -30, "walk", { dy: 0.52, facing: 1, id: "espia2" }),
      ] }),
      // v.24 — os espias param o homem que saía: mostra-nos a entrada da cidade. (os espias falam)
      b(24, { by: "homem", q: "e lhe disseram:", env: { glory: 0.4, night: 0.44 }, cast: [
        C("homem", -100, "point", { dy: 0.54, facing: 1, id: "espia1" }),
        C("homem", -10, "stand", { dy: 0.52, facing: 1, id: "espia2" }),
        C("homem", 120, "stand", { dy: 0.52, facing: -1, id: "morador-luz" }),
      ] }),
      // v.25 — a cidade ferida ao fio da espada; o homem e a sua família, poupados.
      b(25, { q: "feriram-na ao fio da espada;", env: { glory: 0.32, night: 0.5, fire: 0.3, storm: 0.12 }, cast: [
        C("homem", 60, "lie", { dy: 0.64, id: "betelita-caido" }),
        C("homem", -140, "walk", { dy: 0.52, facing: -1, id: "morador-luz" }),
        C("mulherComum", -230, "walk", { dy: 0.5, facing: -1, id: "familia-luz" }),
      ] }),
      // v.26 — o poupado vai à terra dos heteus e edifica outra LUZ.
      b(26, { q: "e edificou uma cidade,", set: "luz", props: LUZ_HETEUS,
        env: { terrain: "city", glory: 0.44, night: 0.3, fire: 0, storm: 0, verdure: 0.28 }, cast: [
        C("homem", -60, "stand", { dy: 0.52, facing: 1, id: "morador-luz" }),
        C("mulherComum", 40, "stand", { dy: 0.5, facing: -1, id: "familia-luz" }),
      ] }),
      // v.27 — MANASSÉS não expulsa: Bete-Seã, Taanaque, Dor, Ibleão, Megido —
      //        "e resolveram os cananeus habitar na mesma terra".
      b(27, { q: "e resolveram os cananeus habitar na mesma terra.", set: "cananeus", props: CANANEUS,
        env: { terrain: "city", glory: 0.24, night: 0.44, verdure: 0.22 }, cast: [
        C("homem", -100, "stand", { dy: 0.52, facing: 1, id: "manassita" }),
        C("homem", 70, "stand", { dy: 0.52, facing: -1, id: "cananeu-bete-sea" }),
        C("mulherComum", 210, "stand", { dy: 0.48, facing: -1, id: "cananeia" }),
      ] }),
      // v.28 — Israel, mais forte, faz dos cananeus tributários — mas não os expulsa.
      b(28, { q: "fez dos cananeus tributários;", env: { glory: 0.3, night: 0.4 }, cast: [
        C("homem", -90, "stand", { dy: 0.52, facing: 1, id: "israelita" }),
        C("homem", 60, "bow", { dy: 0.56, facing: -1, id: "cananeu-tributario" }),
        C("homem", 180, "kneel", { dy: 0.52, facing: -1, id: "cananeu-tributario2" }),
      ] }),
      // v.29 — EFRAIM não expulsa os cananeus de Gezer: ficam habitando com ele.
      b(29, { q: "Tampouco expulsou Efraim os cananeus que habitavam em Gezer;", cast: [
        C("homem", -80, "stand", { dy: 0.52, facing: 1, id: "efraimita" }),
        C("homem", 80, "stand", { dy: 0.52, facing: -1, id: "cananeu-gezer" }),
      ] }),
      // v.30 — ZEBULOM não expulsa Quitrom nem Naalol: ficam, e são tributários.
      b(30, { q: "nem os moradores de Naalol;", cast: [
        C("homem", -80, "stand", { dy: 0.52, facing: 1, id: "zebulonita" }),
        C("homem", 70, "bow", { dy: 0.56, facing: -1, id: "cananeu-quitrom" }),
        C("mulherComum", 190, "stand", { dy: 0.48, facing: -1, id: "cananeia-naalol" }),
      ] }),
      // v.31 — ASER não expulsa Aco, Sidom, Alabe, Aczibe, Helba, Afeque, Reobe.
      b(31, { q: "Tampouco Aser expulsou os moradores de Aco,", set: "costa", props: COSTA,
        env: { terrain: "city", glory: 0.28, night: 0.42, verdure: 0.2 }, cast: [
        C("homem", -110, "stand", { dy: 0.52, facing: 1, id: "aserita" }),
        C("homem", 100, "stand", { dy: 0.5, facing: -1, id: "sidonio" }),
      ] }),
      // v.32 — os aseritas passam a habitar NO MEIO dos cananeus: já não os expulsam.
      b(32, { q: "Porém os aseritas habitaram no meio dos cananeus", env: { glory: 0.24, night: 0.46 }, cast: [
        C("homem", -60, "stand", { dy: 0.54, facing: 1, id: "aserita" }),
        C("homem", 30, "stand", { dy: 0.54, facing: -1, id: "sidonio" }),
        C("mulherComum", 170, "stand", { dy: 0.48, facing: -1, id: "cananeia-aco" }),
      ] }),
      // v.33 — NAFTALI habita no meio dos cananeus de Bete-Semes e Bete-Anate.
      b(33, { q: "mas habitou no meio dos cananeus que habitavam na terra;", set: "cananeus", props: CANANEUS,
        env: { terrain: "city", glory: 0.24, night: 0.46, verdure: 0.22 }, cast: [
        C("homem", -70, "stand", { dy: 0.54, facing: 1, id: "naftalita" }),
        C("homem", 50, "bow", { dy: 0.56, facing: -1, id: "cananeu-bete-semes" }),
        C("homem", 190, "kneel", { dy: 0.52, facing: -1, id: "cananeu-bete-anate" }),
      ] }),
      // v.34 — os amorreus empurram DÃ para as montanhas: nem descer ao vale os deixavam.
      b(34, { q: "E os amorreus impeliram os filhos de Dã até às montanhas;", set: "montes-da", props: MONTES_DA,
        env: { terrain: "mountain", glory: 0.2, night: 0.5, storm: 0.24, verdure: 0.18 }, cast: [
        C("homem", -30, "walk", { dy: 0.5, facing: -1, id: "danita" }),
        C("mulherComum", -140, "walk", { dy: 0.52, facing: -1, id: "danita-mulher" }),
        C("homem", 170, "point", { dy: 0.54, facing: -1, id: "amorreu" }),
      ] }),
      // v.35 — os amorreus teimam em Heres, Aijalom e Saalbim; a casa de José prevalece.
      b(35, { q: "porém prevaleceu a mão da casa de José,", env: { glory: 0.42, night: 0.38, storm: 0.14 }, cast: [
        C("homem", -110, "raise", { dy: 0.52, facing: 1, id: "jose1" }),
        C("homem", 90, "bow", { dy: 0.56, facing: -1, id: "amorreu" }),
        C("homem", 210, "kneel", { dy: 0.52, facing: -1, id: "amorreu2" }),
      ] }),
      // v.36 — o termo dos amorreus, desde a subida de Acrabim e da penha: a
      //        fronteira que sobrou dentro da terra prometida.
      b(36, { q: "E foi o termo dos amorreus desde a subida de Acrabim,",
        env: { terrain: "mountain", glory: 0.22, night: 0.5, storm: 0.12, verdure: 0.16 }, cast: [
        C("homem", 140, "stand", { dy: 0.46, facing: -1, id: "amorreu" }),
        C("homem", -160, "stand", { dy: 0.52, facing: 1, id: "danita" }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Jz 2
  2: {
    start: { terrain: "field", night: 0.18, glory: 0.6, storm: 0, fire: 0, verdure: 0.4 },
    beats: [
      // v.1 — O ANJO DO SENHOR sobe de Gilgal a BOQUIM: mediador VISÍVEL em cena
      //        (`by: "anjo"`, figura luminosa) — "Nunca invalidarei a minha aliança".
      b(1, { by: "anjo", q: "de Gilgal a Boquim, e disse:", set: "boquim", props: BOQUIM,
        env: { terrain: "field", night: 0.16, glory: 0.82, fire: 0.06, verdure: 0.42 }, cast: [
        C("anjo", 30, "raise", { dy: 0.4, facing: -1, glow: 1 }),
        C("patriarca", -170, "bow", { dy: 0.54, facing: 1, id: "chefe-israel" }),
        C("homem", -70, "kneel", { dy: 0.56, facing: 1, id: "israelita1" }),
        C("mulherComum", 210, "kneel", { dy: 0.5, facing: -1, id: "israelita-mulher" }),
      ] }),
      // v.2 — a repreensão: não fareis acordo, derrubareis os altares deles. (anjo)
      b(2, { by: "anjo", q: "E, quanto a vós,", env: { glory: 0.78, night: 0.2 }, cast: [
        C("anjo", 30, "point", { dy: 0.4, facing: -1, glow: 1 }),
        C("patriarca", -170, "bow", { dy: 0.56, facing: 1, id: "chefe-israel" }),
        C("homem", -70, "bow", { dy: 0.58, facing: 1, id: "israelita1" }),
        C("mulherComum", 210, "bow", { dy: 0.5, facing: -1, id: "israelita-mulher" }),
      ] }),
      // v.3 — a sentença: espinhos nas ilhargas e os deuses deles por laço. (anjo)
      b(3, { by: "anjo", q: "Assim também eu disse:", env: { glory: 0.66, night: 0.3, storm: 0.14 }, cast: [
        C("anjo", 30, "raise", { dy: 0.4, facing: -1, glow: 0.9 }),
        C("homem", -100, "kneel", { dy: 0.58, facing: 1, id: "israelita1" }),
        C("homem", -220, "bow", { dy: 0.54, facing: 1, id: "israelita2" }),
        C("mulherComum", 200, "kneel", { dy: 0.52, facing: -1, id: "israelita-mulher" }),
      ] }),
      // v.4 — o povo levanta a voz e chora (luto: individuais, nunca multidão festiva).
      b(4, { q: "o povo levantou a sua voz e chorou.", env: { glory: 0.5, night: 0.4, storm: 0.1 }, cast: [
        C("homem", -160, "bow", { dy: 0.58, facing: 1, id: "israelita1" }),
        C("mulherComum", -40, "kneel", { dy: 0.6, facing: 1, id: "israelita-mulher" }),
        C("servo", 90, "kneel", { dy: 0.56, facing: -1, id: "israelita3" }),
        C("patriarca", 220, "bow", { dy: 0.52, facing: -1, id: "chefe-israel" }),
      ] }),
      // v.5 — o lugar chama-se BOQUIM; e ali sacrificam ao SENHOR.
      b(5, { q: "Por isso chamaram àquele lugar, Boquim;", set: "boquim-altar", props: BOQUIM_ALTAR,
        env: { terrain: "field", glory: 0.6, night: 0.32, fire: 0.3, storm: 0, verdure: 0.4 }, cast: [
        C("patriarca", -130, "kneel", { dy: 0.56, facing: 1, id: "chefe-israel" }),
        C("homem", 130, "bow", { dy: 0.56, facing: -1, id: "israelita1" }),
        C("mulherComum", 230, "kneel", { dy: 0.5, facing: -1, id: "israelita-mulher" }),
      ] }),
      // v.6 — Josué despede o povo: cada um à sua herança, para possuí-la.
      b(6, { q: "E havendo Josué despedido o povo", set: "heranca", props: HERANCA,
        env: { terrain: "field", glory: 0.62, night: 0.16, fire: 0, verdure: 0.6 }, cast: [
        C("servo", -150, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("multidao", 60, "walk", { dy: 0.48, facing: 1 }),
      ] }),
      // v.7 — enquanto viveram Josué e os anciãos que viram a grande obra, o povo serviu ao SENHOR.
      b(7, { q: "E serviu o povo ao Senhor todos os dias de Josué,", env: { glory: 0.72, night: 0.12, verdure: 0.68 }, cast: [
        C("servo", -140, "stand", { dy: 0.5, facing: 1, id: "josue" }),
        C("patriarca", -30, "stand", { dy: 0.52, facing: 1, id: "chefe-israel" }),
        C("multidao", 150, "stand", { dy: 0.48 }),
      ] }),
      // v.8 — morre JOSUÉ, servo do SENHOR, aos cento e dez anos (luto, sem festa).
      b(8, { q: "Faleceu, porém, Josué, filho de Num,", env: { glory: 0.34, night: 0.46, verdure: 0.4 }, cast: [
        C("servo", -20, "lie", { dy: 0.62, id: "josue" }),
        C("patriarca", -180, "bow", { dy: 0.56, facing: 1, id: "chefe-israel" }),
        C("homem", 150, "kneel", { dy: 0.56, facing: -1, id: "israelita1" }),
        C("mulherComum", 250, "bow", { dy: 0.5, facing: -1, id: "israelita-mulher" }),
      ] }),
      // v.9 — sepultado em Timnate-Heres, no monte de Efraim, ao norte de Gaás.
      b(9, { q: "E sepultaram-no no termo da sua herança,", set: "timnate", props: TIMNATE,
        env: { terrain: "mountain", glory: 0.3, night: 0.5, verdure: 0.28 }, cast: [
        C("patriarca", -150, "bow", { dy: 0.56, facing: 1, id: "chefe-israel" }),
        C("homem", 130, "kneel", { dy: 0.56, facing: -1, id: "israelita1" }),
        C("homem", 240, "bow", { dy: 0.52, facing: -1, id: "israelita2" }),
      ] }),
      // v.10 — ⚑ A GERAÇÃO QUE NÃO CONHECEU O SENHOR nem a obra que ele fez.
      b(10, { q: "e outra geração após ela se levantou,",
        env: { terrain: "field", glory: 0.18, night: 0.52, verdure: 0.3 }, cast: [
        C("patriarca", -230, "lie", { dy: 0.62, id: "chefe-israel" }),
        C("homem", -20, "stand", { dy: 0.54, facing: -1, id: "jovem1" }),
        C("homem", 110, "walk", { dy: 0.52, facing: -1, id: "jovem2" }),
        C("mulherComum", 230, "stand", { dy: 0.5, facing: -1, id: "jovem-mulher" }),
      ] }),
      // v.11 — ① APOSTASIA: fazem o que é mau e SERVEM AOS BAALINS (ídolo em cena).
      b(11, { q: "o que era mau aos olhos do Senhor;", set: "baalins", props: BAALINS,
        env: { terrain: "field", glory: 0.12, night: 0.6, fire: 0.3, storm: 0.1, verdure: 0.22 }, cast: [
        C("homem", -110, "bow", { dy: 0.58, facing: 1, id: "jovem1" }),
        C("mulherComum", 120, "kneel", { dy: 0.56, facing: -1, id: "jovem-mulher" }),
        C("homem", 240, "kneel", { dy: 0.52, facing: -1, id: "jovem2" }),
      ] }),
      // v.12 — deixam o SENHOR que os tirou do Egito e vão após os deuses dos povos.
      b(12, { q: "e foram-se após outros deuses,", env: { glory: 0.1, night: 0.62, storm: 0.22, fire: 0.32 }, cast: [
        C("homem", -60, "kneel", { dy: 0.58, facing: 1, id: "jovem1" }),
        C("homem", 60, "bow", { dy: 0.58, facing: -1, id: "jovem2" }),
        C("mulherComum", 200, "kneel", { dy: 0.54, facing: -1, id: "jovem-mulher" }),
      ] }),
      // v.13 — deixam o SENHOR e servem a BAAL e a ASTAROTE.
      b(13, { q: "Porquanto deixaram ao Senhor,", env: { glory: 0.08, night: 0.66, fire: 0.36, storm: 0.24 }, cast: [
        C("homem", -80, "bow", { dy: 0.6, facing: 1, id: "jovem1" }),
        C("mulherComum", 90, "bow", { dy: 0.56, facing: -1, id: "jovem-mulher" }),
      ] }),
      // v.14 — ② OPRESSÃO: a ira se acende; entregues na mão dos espoliadores.
      b(14, { q: "Por isso a ira do Senhor se acendeu contra Israel,", set: "opressao", props: OPRESSAO,
        env: { terrain: "field", glory: 0.14, night: 0.58, storm: 0.36, fire: 0.34, verdure: 0.16 }, cast: [
        C("homem", 110, "point", { dy: 0.5, facing: -1, id: "espoliador" }),
        C("homem", 210, "stand", { dy: 0.46, facing: -1, id: "espoliador2" }),
        C("homem", -140, "lie", { dy: 0.64, id: "israelita1" }),
        C("mulherComum", -30, "bow", { dy: 0.58, facing: 1, id: "israelita-mulher" }),
      ] }),
      // v.15 — a mão do SENHOR contra eles para mal: estavam em grande aflição.
      b(15, { q: "Por onde quer que saíam,", env: { glory: 0.12, night: 0.62, storm: 0.4 }, cast: [
        C("homem", -110, "kneel", { dy: 0.6, facing: 1, id: "israelita1" }),
        C("mulherComum", 20, "kneel", { dy: 0.58, facing: -1, id: "israelita-mulher" }),
        C("servo", 150, "bow", { dy: 0.56, facing: -1, id: "israelita3" }),
      ] }),
      // v.16 — ③④ CLAMOR e LIBERTAÇÃO: o SENHOR LEVANTA JUÍZES que os livram.
      b(16, { q: "E levantou o Senhor juízes,", env: { glory: 0.66, night: 0.3, storm: 0.12, fire: 0.08 }, cast: [
        C("servo", -40, "raise", { dy: 0.52, facing: 1, id: "juiz" }),
        C("homem", 110, "stand", { dy: 0.54, facing: -1, id: "israelita1" }),
        C("mulherComum", 220, "stand", { dy: 0.5, facing: -1, id: "israelita-mulher" }),
      ] }),
      // v.17 — mas nem aos juízes ouviram: prostituíram-se após outros deuses.
      b(17, { q: "Porém tampouco ouviram aos juízes,", set: "baalins", props: BAALINS,
        env: { terrain: "field", glory: 0.14, night: 0.6, fire: 0.32, storm: 0.16, verdure: 0.2 }, cast: [
        C("servo", -220, "stand", { dy: 0.5, facing: 1, id: "juiz" }),
        C("homem", -60, "bow", { dy: 0.58, facing: 1, id: "jovem1" }),
        C("mulherComum", 120, "kneel", { dy: 0.56, facing: -1, id: "jovem-mulher" }),
      ] }),
      // v.18 — ⑤ o SENHOR era com o juiz e os livrava: compadecia-se pelo seu GEMIDO.
      b(18, { q: "e os livrava da mão dos seus inimigos,", env: { glory: 0.7, night: 0.26, fire: 0.06, storm: 0.06 }, cast: [
        C("servo", -60, "raise", { dy: 0.52, facing: 1, id: "juiz" }),
        C("homem", 80, "kneel", { dy: 0.56, facing: -1, id: "israelita1" }),
        C("mulherComum", 200, "kneel", { dy: 0.52, facing: -1, id: "israelita-mulher" }),
      ] }),
      // v.19 — ⑥ MORTO O JUIZ, reincidiam PIOR que seus pais: o ciclo fecha e recomeça.
      b(19, { q: "Porém sucedia que, falecendo o juiz,",
        env: { glory: 0.08, night: 0.68, fire: 0.36, storm: 0.24, verdure: 0.16 }, cast: [
        C("servo", -230, "lie", { dy: 0.62, id: "juiz" }),
        C("homem", -60, "bow", { dy: 0.6, facing: 1, id: "jovem1" }),
        C("homem", 90, "kneel", { dy: 0.58, facing: -1, id: "jovem2" }),
        C("mulherComum", 210, "bow", { dy: 0.54, facing: -1, id: "jovem-mulher" }),
      ] }),
      // v.20 — o SENHOR fala SEM mediador (voz do céu): transgrediram a minha aliança.
      dv(20, "se acendeu contra Israel, e disse:", { env: { glory: 0.5, night: 0.5, storm: 0.4, fire: 0.2 }, cast: [
        C("homem", -80, "bow", { dy: 0.58, facing: 1, id: "jovem1" }),
        C("mulherComum", 90, "kneel", { dy: 0.56, facing: -1, id: "jovem-mulher" }),
      ] }),
      // v.21 — não desapossarei mais nenhuma das nações que Josué deixou. (voz do céu)
      dv(21, "Tampouco desapossarei mais de diante deles", { set: "cananeus", props: CANANEUS,
        env: { terrain: "city", glory: 0.44, night: 0.44, storm: 0.2, fire: 0, verdure: 0.2 }, cast: [
        C("homem", -100, "stand", { dy: 0.52, facing: 1, id: "jovem1" }),
        C("homem", 70, "stand", { dy: 0.52, facing: -1, id: "cananeu" }),
      ] }),
      // v.22 — ficam PARA PROVAR Israel: se guardará ou não o caminho do SENHOR. (voz do céu)
      dv(22, "Para por elas provar a Israel,", { env: { glory: 0.5, night: 0.38, storm: 0.1 }, cast: [
        C("homem", -60, "stand", { dy: 0.54, facing: 1, id: "jovem1" }),
        C("homem", 60, "stand", { dy: 0.54, facing: -1, id: "cananeu" }),
        C("mulherComum", 200, "stand", { dy: 0.48, facing: -1, id: "cananeia" }),
      ] }),
      // v.23 — assim aquelas nações ficaram na terra: a prova está montada.
      b(23, { q: "Assim o Senhor deixou ficar aquelas nações,",
        env: { terrain: "city", glory: 0.34, night: 0.42, storm: 0.08, verdure: 0.22 }, cast: [
        C("homem", -140, "stand", { dy: 0.52, facing: 1, id: "jovem1" }),
        C("homem", 40, "stand", { dy: 0.52, facing: -1, id: "cananeu" }),
        C("mulherComum", 160, "stand", { dy: 0.5, facing: -1, id: "cananeia" }),
        C("homem", 260, "stand", { dy: 0.46, facing: -1, id: "cananeu2" }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Jz 3
  3: {
    start: { terrain: "city", night: 0.34, glory: 0.4, storm: 0.06, fire: 0, verdure: 0.28 },
    beats: [
      // v.1 — as nações que o SENHOR deixou, para provar os que não sabiam das guerras.
      b(1, { q: "que o SENHOR deixou ficar,", set: "nacoes", props: NACOES,
        env: { terrain: "city", glory: 0.4, night: 0.34, verdure: 0.28 }, cast: [
        C("homem", -120, "stand", { dy: 0.52, facing: 1, id: "israelita-novo" }),
        C("homem", 60, "stand", { dy: 0.5, facing: -1, id: "cananeu" }),
        C("homem", 200, "stand", { dy: 0.46, facing: -1, id: "sidonio" }),
      ] }),
      // v.2 — para que as gerações aprendessem a guerra, as que dantes não sabiam.
      b(2, { q: "Tão-somente para que as gerações dos filhos de Israel delas soubessem",
        env: { glory: 0.42, night: 0.32, storm: 0.12 }, cast: [
        C("homem", -60, "stand", { dy: 0.54, facing: 1, id: "israelita-novo" }),
        C("homem", 60, "stand", { dy: 0.52, facing: -1, id: "cananeu" }),
      ] }),
      // v.3 — CINCO PRÍNCIPES dos filisteus, cananeus, sidônios e heveus do Líbano.
      b(3, { q: "Cinco príncipes dos filisteus,", set: "libano", props: LIBANO,
        env: { terrain: "mountain", glory: 0.28, night: 0.44, storm: 0.16, verdure: 0.26 }, cast: [
        C("rei", -150, "stand", { dy: 0.5, facing: 1, id: "principe-filisteu1" }),
        C("rei", -40, "stand", { dy: 0.5, facing: 1, id: "principe-filisteu2" }),
        C("rei", 70, "stand", { dy: 0.48, facing: -1, id: "principe-filisteu3" }),
        C("homem", 190, "stand", { dy: 0.46, facing: -1, id: "heveu-libano" }),
      ] }),
      // v.4 — ficaram para PROVAR se Israel daria ouvidos aos mandamentos por Moisés.
      b(4, { q: "para por eles provar a Israel,", env: { glory: 0.46, night: 0.36, storm: 0.1 }, cast: [
        C("homem", -110, "stand", { dy: 0.54, facing: 1, id: "israelita-novo" }),
        C("rei", 90, "stand", { dy: 0.5, facing: -1, id: "principe-filisteu1" }),
      ] }),
      // v.5 — Israel habitando NO MEIO de cananeus, heteus, amorreus, perizeus, heveus, jebuseus.
      b(5, { q: "Habitando, pois, os filhos de Israel no meio dos cananeus,", set: "mistura", props: MISTURA,
        env: { terrain: "city", glory: 0.3, night: 0.42, verdure: 0.26 }, cast: [
        C("homem", -130, "stand", { dy: 0.54, facing: 1, id: "israelita-novo" }),
        C("homem", -20, "stand", { dy: 0.54, facing: -1, id: "heteu" }),
        C("mulherComum", 100, "stand", { dy: 0.5, facing: -1, id: "cananeia" }),
        C("homem", 230, "stand", { dy: 0.48, facing: -1, id: "jebuseu" }),
      ] }),
      // v.6 — casam-se com as filhas deles e SERVEM AOS DEUSES DELES.
      b(6, { q: "e deram as suas filhas aos filhos deles;",
        env: { glory: 0.2, night: 0.5, fire: 0.2, verdure: 0.24 }, cast: [
        C("homem", -90, "stand", { dy: 0.54, facing: 1, id: "israelita-novo" }),
        C("mulherComum", 10, "stand", { dy: 0.54, facing: -1, id: "cananeia" }),
        C("homem", 150, "bow", { dy: 0.56, facing: -1, id: "heteu" }),
      ] }),
      // v.7 — ① APOSTASIA: esquecem o SENHOR e servem aos baalins e a Astarote.
      b(7, { q: "e se esqueceram do Senhor seu Deus;", set: "idolos", props: IDOLOS3,
        env: { terrain: "field", glory: 0.12, night: 0.6, fire: 0.34, storm: 0.12, verdure: 0.2 }, cast: [
        C("homem", -140, "bow", { dy: 0.58, facing: 1, id: "israelita-novo" }),
        C("mulherComum", 60, "kneel", { dy: 0.56, facing: -1, id: "cananeia" }),
        C("homem", 230, "kneel", { dy: 0.52, facing: -1, id: "heteu" }),
      ] }),
      // v.8 — ② OPRESSÃO: vendidos na mão de CUSÃ-RISATAIM, oito anos de jugo.
      b(8, { q: "e ele os vendeu na mão de Cusã-Risataim,", set: "mesopotamia", props: MESOPOTAMIA,
        env: { terrain: "city", glory: 0.14, night: 0.58, storm: 0.36, fire: 0.16, verdure: 0.16 }, cast: [
        C("rei", 120, "stand", { dy: 0.48, facing: -1, id: "cusa-risataim" }),
        C("homem", -150, "kneel", { dy: 0.6, facing: 1, id: "israelita-novo" }),
        C("mulherComum", -40, "bow", { dy: 0.58, facing: 1, id: "israelita-mulher" }),
        C("homem", 240, "stand", { dy: 0.46, facing: -1, id: "soldado-mesopotamia" }),
      ] }),
      // v.9 — ③④ CLAMOR e LIBERTADOR: OTNIEL, filho de Quenaz, irmão de Calebe.
      b(9, { q: "E os filhos de Israel clamaram ao Senhor,",
        env: { glory: 0.56, night: 0.4, storm: 0.16, fire: 0.06 }, cast: [
        C("servo", -30, "stand", { dy: 0.52, facing: 1, id: "otniel" }),
        C("homem", -170, "kneel", { dy: 0.6, facing: 1, id: "israelita-novo" }),
        C("mulherComum", 110, "kneel", { dy: 0.56, facing: -1, id: "israelita-mulher" }),
      ] }),
      // v.10 — o ESPÍRITO DO SENHOR vem sobre Otniel: julga Israel e vence Cusã-Risataim.
      b(10, { q: "E veio sobre ele o Espírito do Senhor,",
        env: { terrain: "field", glory: 0.85, night: 0.2, storm: 0.14, fire: 0, verdure: 0.34 }, cast: [
        C("servo", -80, "raise", { dy: 0.52, facing: 1, id: "otniel" }),
        C("rei", 130, "bow", { dy: 0.56, facing: -1, id: "cusa-risataim" }),
        C("homem", 240, "lie", { dy: 0.62, id: "soldado-mesopotamia" }),
      ] }),
      // v.11 — ⑤ DESCANSO: a terra sossega quarenta anos; e Otniel morre.
      b(11, { q: "Então a terra sossegou quarenta anos;", set: "sossego", props: SOSSEGO,
        env: { terrain: "field", glory: 0.75, night: 0.1, storm: 0, fire: 0, verdure: 0.85 }, cast: [
        C("servo", -140, "stand", { dy: 0.5, facing: 1, id: "otniel" }),
        C("multidao", 60, "stand", { dy: 0.48 }),
        C("mulherComum", 220, "stand", { dy: 0.5, facing: -1, id: "israelita-mulher" }),
      ] }),
      // v.12 — ⑥ e recomeça: o mal outra vez; o SENHOR fortalece EGLOM, rei de Moabe.
      //        Props PRÓPRIOS: o beat não pode herdar o SOSSEGO de Otniel (searas,
      //        poço e vinha) justamente quando a opressão volta.
      b(12, { q: "então o Senhor fortaleceu a Eglom, rei dos moabitas, contra Israel;",
        set: "jugo-moabe", props: JUGO_MOABE,
        env: { terrain: "field", glory: 0.18, night: 0.52, storm: 0.24, fire: 0.16, verdure: 0.3 }, cast: [
        C("rei", 110, "stand", { dy: 0.5, facing: -1, id: "eglom", scale: 1.2 }),
        C("homem", -130, "bow", { dy: 0.58, facing: 1, id: "israelita-novo" }),
      ] }),
      // v.13 — com Amom e Amaleque, fere Israel e TOMA A CIDADE DAS PALMEIRAS.
      b(13, { q: "e foi, e feriu a Israel,", set: "palmeiras-moabe", props: CID_PALMEIRAS,
        env: { terrain: "city", glory: 0.16, night: 0.55, storm: 0.3, fire: 0.2, verdure: 0.22 }, cast: [
        C("rei", 90, "stand", { dy: 0.48, facing: -1, id: "eglom", scale: 1.2 }),
        C("homem", 220, "stand", { dy: 0.46, facing: -1, id: "amonita" }),
        C("homem", -160, "lie", { dy: 0.64, id: "israelita-caido" }),
        C("mulherComum", -50, "bow", { dy: 0.58, facing: 1, id: "israelita-mulher" }),
      ] }),
      // v.14 — DEZOITO ANOS servindo a Eglom: o trono de Moabe sobre Israel.
      b(14, { q: "E os filhos de Israel serviram a Eglom, rei dos moabitas, dezoito anos.",
        set: "corte", props: CORTE_MOABE,
        env: { terrain: "city", glory: 0.14, night: 0.58, storm: 0.2, fire: 0.1, verdure: 0.14 }, cast: [
        C("rei", 130, "stand", { dy: 0.46, facing: -1, id: "eglom", scale: 1.24 }),
        C("homem", -120, "kneel", { dy: 0.6, facing: 1, id: "israelita-novo" }),
        C("servo", 20, "bow", { dy: 0.58, facing: 1, id: "servo-moabe" }),
      ] }),
      // v.15 — clamam; e vem EÚDE, filho de Gera, HOMEM CANHOTO, com o presente.
      b(15, { q: "e o Senhor lhes levantou um libertador,",
        env: { glory: 0.44, night: 0.46, storm: 0.14, fire: 0.06 }, cast: [
        C("homem", -110, "stand", { dy: 0.54, facing: 1, id: "eude" }),
        C("homem", -230, "kneel", { dy: 0.58, facing: 1, id: "israelita-novo" }),
        C("rei", 150, "stand", { dy: 0.46, facing: -1, id: "eglom", scale: 1.24 }),
      ] }),
      // v.16 — a ESPADA DE DOIS FIOS, de um côvado, cingida sob as vestes à COXA DIREITA.
      //        Props PRÓPRIOS (casa israelita): a arma secreta NÃO se forja dentro
      //        da sala do trono de Eglom, que o beat herdava.
      b(16, { q: "E Eúde fez para si uma espada de dois fios,",
        set: "casa-eude", props: CASA_EUDE,
        env: { terrain: "field", glory: 0.24, night: 0.56, storm: 0.08, fire: 0.14, verdure: 0.2 }, cast: [
        C("homem", -30, "stand", { dy: 0.56, facing: 1, id: "eude" }),
      ] }),
      // v.17 — entrega o presente a Eglom — e Eglom era homem MUITO GORDO.
      //        De volta à CORTE (props próprios, para não herdar a casa de Eúde).
      b(17, { q: "e era Eglom homem muito gordo.", set: "corte", props: CORTE_MOABE,
        env: { terrain: "city", glory: 0.2, night: 0.56, fire: 0.1, verdure: 0.14 }, cast: [
        C("rei", 130, "stand", { dy: 0.46, facing: -1, id: "eglom", scale: 1.34 }),
        C("homem", -80, "bow", { dy: 0.58, facing: 1, id: "eude" }),
        C("servo", 20, "stand", { dy: 0.54, facing: 1, id: "servo-moabe" }),
        C("servo", -200, "walk", { dy: 0.56, facing: 1, id: "portador1" }),
      ] }),
      // v.18 — entregue o presente, despede a gente que o trouxera.
      b(18, { q: "acabando de entregar o presente,", env: { glory: 0.2, night: 0.58 }, cast: [
        C("homem", 20, "stand", { dy: 0.56, facing: -1, id: "eude" }),
        C("servo", -140, "walk", { dy: 0.58, facing: -1, id: "portador1" }),
        C("servo", -250, "walk", { dy: 0.54, facing: -1, id: "portador2" }),
        C("rei", 150, "stand", { dy: 0.46, facing: -1, id: "eglom", scale: 1.34 }),
      ] }),
      // v.19 — volta das IMAGENS DE ESCULTURA de Gilgal: "uma palavra secreta para ti,
      //        ó rei" — e todos saem de diante dele. (Eúde fala)
      b(19, { by: "homem", q: "que estavam ao pé de Gilgal, e disse:",
        set: "corte-imagens", props: CORTE_IMAGENS,
        env: { glory: 0.18, night: 0.6, fire: 0.1 }, cast: [
        C("homem", -60, "point", { dy: 0.56, facing: 1, id: "eude" }),
        C("rei", 120, "stand", { dy: 0.46, facing: -1, id: "eglom", scale: 1.34 }),
        C("servo", 250, "walk", { dy: 0.54, facing: -1, id: "servo-moabe" }),
      ] }),
      // v.20 — a SALA DE VERÃO, só do rei: "uma palavra de Deus" — e Eglom se levanta
      //        da cadeira. Juízo se armando: noite alta, glória baixa. (Eúde fala)
      b(20, { by: "homem", q: "onde estava sentado, e disse:", set: "sala-verao", props: SALA_VERAO,
        env: { terrain: "city", glory: 0.16, night: 0.62, storm: 0.06, fire: 0.12, verdure: 0.06 }, cast: [
        C("homem", -100, "stand", { dy: 0.58, facing: 1, id: "eude" }),
        C("rei", 60, "stand", { dy: 0.5, facing: -1, id: "eglom", scale: 1.34 }),
      ] }),
      // v.21 — a mão ESQUERDA tira a espada da coxa direita e crava-lhe no ventre.
      b(21, { q: "e tirou a espada de sobre sua coxa direita,",
        env: { glory: 0.1, night: 0.7, storm: 0.18, fire: 0.1 }, cast: [
        C("homem", -60, "point", { dy: 0.6, facing: 1, id: "eude" }),
        C("rei", 50, "bow", { dy: 0.56, facing: -1, id: "eglom", scale: 1.34 }),
      ] }),
      // v.22 — a lâmina entra até o cabo e a gordura a encerra: o rei cai (individual em `lie`).
      b(22, { q: "e a gordura encerrou a lâmina",
        env: { glory: 0.08, night: 0.74, storm: 0.22 }, cast: [
        C("rei", 40, "lie", { dy: 0.64, id: "eglom", scale: 1.34 }),
        C("homem", -110, "stand", { dy: 0.58, facing: 1, id: "eude" }),
      ] }),
      // v.23 — Eúde sai ao pátio, fecha as portas da sala e as TRANCA.
      b(23, { q: "Então Eúde saiu ao pátio,", env: { glory: 0.08, night: 0.72 }, cast: [
        C("rei", 40, "lie", { dy: 0.64, id: "eglom", scale: 1.34 }),
        C("homem", -190, "walk", { dy: 0.56, facing: -1, id: "eude" }),
      ] }),
      // v.24 — os servos acham as portas fechadas e supõem: "está cobrindo seus pés". (os servos falam)
      b(24, { by: "servo", q: "e viram, e eis que as portas da sala estavam fechadas; e disseram:",
        env: { glory: 0.12, night: 0.66 }, cast: [
        C("servo", -140, "point", { dy: 0.56, facing: 1, id: "servo-moabe" }),
        C("servo", -50, "stand", { dy: 0.54, facing: 1, id: "servo-moabe2" }),
        C("servo", 210, "stand", { dy: 0.5, facing: -1, id: "servo-moabe3" }),
      ] }),
      // v.25 — esperam até se alarmarem, tomam a chave, abrem — e o seu senhor está
      //        ESTENDIDO MORTO EM TERRA (juízo: sem multidão, sem glória).
      b(25, { q: "então tomaram a chave, e abriram,",
        env: { glory: 0.08, night: 0.72, storm: 0.16 }, cast: [
        C("rei", 40, "lie", { dy: 0.64, id: "eglom", scale: 1.34 }),
        C("servo", -140, "bow", { dy: 0.6, facing: 1, id: "servo-moabe" }),
        C("servo", -30, "kneel", { dy: 0.58, facing: 1, id: "servo-moabe2" }),
      ] }),
      // v.26 — Eúde escapa: passa pelas imagens de escultura e foge para Seirá.
      b(26, { q: "porque ele passou pelas imagens de escultura,", set: "imagens", props: IMAGENS,
        env: { terrain: "field", glory: 0.24, night: 0.6, storm: 0.1, fire: 0, verdure: 0.24 }, cast: [
        C("homem", -20, "walk", { dy: 0.56, facing: 1, id: "eude" }),
      ] }),
      // v.27 — toca a BUZINA nas montanhas de Efraim e desce à frente de Israel.
      b(27, { q: "tocou a buzina nas montanhas de Efraim,", set: "efraim", props: EFRAIM,
        env: { terrain: "mountain", glory: 0.5, night: 0.42, storm: 0.14, verdure: 0.3 }, cast: [
        C("homem", -80, "raise", { dy: 0.54, facing: 1, id: "eude" }),
        C("multidao", 120, "walk", { dy: 0.48, facing: 1 }),
      ] }),
      // v.28 — "Segui-me, porque o SENHOR vos tem entregue os moabitas": tomam os
      //        VAUS DO JORDÃO e a ninguém deixam passar. (Eúde fala)
      b(28, { by: "homem", q: "E disse-lhes:", set: "vaus", props: VAUS,
        env: { terrain: "field", glory: 0.6, night: 0.34, storm: 0.16, verdure: 0.3 }, cast: [
        C("homem", -120, "point", { dy: 0.54, facing: 1, id: "eude" }),
        C("multidao", 60, "walk", { dy: 0.48, facing: 1 }),
      ] }),
      // v.29 — dez mil moabitas feridos, todos corpulentos e valorosos: nenhum escapa.
      b(29, { q: "todos corpulentos, e todos homens valorosos;",
        env: { glory: 0.44, night: 0.44, storm: 0.34, verdure: 0.24 }, cast: [
        C("homem", -140, "raise", { dy: 0.52, facing: 1, id: "eude" }),
        C("homem", 60, "lie", { dy: 0.64, id: "moabita-caido" }),
        C("homem", 180, "lie", { dy: 0.58, id: "moabita-caido2" }),
        C("homem", 270, "bow", { dy: 0.54, facing: -1, id: "moabita3" }),
      ] }),
      // v.30 — ⑤ DESCANSO: Moabe subjugado; a terra sossega OITENTA anos.
      b(30, { q: "Assim foi subjugado Moabe naquele dia debaixo da mão de Israel;",
        set: "sossego", props: SOSSEGO,
        env: { terrain: "field", glory: 0.78, night: 0.1, storm: 0, fire: 0, verdure: 0.88 }, cast: [
        C("homem", -150, "stand", { dy: 0.5, facing: 1, id: "eude" }),
        C("multidao", 40, "raise", { dy: 0.48 }),
        C("mulherComum", 210, "stand", { dy: 0.5, facing: -1, id: "israelita-mulher" }),
      ] }),
      // v.31 — SANGAR, filho de Anate: seiscentos filisteus com uma AGUILHADA DE BOIS.
      b(31, { q: "que feriu a seiscentos homens dos filisteus com uma aguilhada de bois;",
        set: "seara", props: SEARA,
        env: { terrain: "field", glory: 0.6, night: 0.26, storm: 0.18, fire: 0, verdure: 0.6 }, cast: [
        C("homem", -60, "raise", { dy: 0.56, facing: 1, id: "sangar" }),
        C("homem", 110, "lie", { dy: 0.64, id: "filisteu-caido" }),
        C("homem", 230, "bow", { dy: 0.56, facing: -1, id: "filisteu2" }),
      ] }),
    ],
  },
};
